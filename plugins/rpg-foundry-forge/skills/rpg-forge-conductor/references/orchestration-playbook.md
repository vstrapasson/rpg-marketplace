# Orchestration playbook — vault → Foundry

The build contract. cwd = the user's vault root. `PLUGIN="${CLAUDE_PLUGIN_ROOT}"`.

## 0. Preflight (every run) — block on critical fails

Run `references/preflight-checks.md`. Two halves:
- **Script-side** (vault loads, unit resolves with no `missing`, ComfyUI reachable):
```bash
node --input-type=module <<EOF
import { runLocalPreflight } from "${PLUGIN}/scripts/lib/preflight.mjs";
console.log(JSON.stringify(await runLocalPreflight(process.cwd(), "<unit name>"), null, 2));
EOF
```
- **MCP-side** (you call the tools): `get-world-info` (errors with "Foundry VTT module not connected" → STOP; tell the user to reload the world in Foundry (F5) or toggle *Game Settings → Foundry MCP Bridge → Enable*, then `/mcp` reconnect). `list-compendium-packs` (the canonical creature pack present, e.g. `pf2e.pathfinder-monster-core` → critical for actors). Inspect `update-token` for the `imagePath` field and presence of `get-scene-geometry`/`set-scene-lighting` → optional (degrade: skip token art / lighting+walls, warn). Probe the **audio tools** (`list-playlists` / `create-playlist`) → optional (degrade: skip soundtrack binding, warn).

If any **critical** check fails, do not build. If optional features are unavailable, announce exactly what will be skipped.

Then load the manifest and resume in-flight map jobs FIRST:
```bash
node --input-type=module <<EOF
import { loadManifest, pendingMapJobs } from "${PLUGIN}/scripts/lib/manifest.mjs";
const m = await loadManifest(process.cwd(), "<world>");
console.log(JSON.stringify(pendingMapJobs(m)));
EOF
```
For each pending job → `check-map-status(jobId)`; if complete, record the scene; if still pending, wait/poll.

## 1. Read → Resolve

`loadVault(cwd)` → `resolveUnit(index, unitName)`. The unit must be a `sessao`, `encontro`, or `desafio` (else tell the user it's unsupported). If `graph.missing[]` is non-empty, **stop and report** the broken links — they are a vault problem; route the user back to the loremaster/gamemaster + guardian. Never invent the target.

## 2. Plan (dry-run) — approval gate

`planBuild(graph, manifest)` → `{steps, skipped, blocked, missing}`. Present to the user, grouped by concern, marking `create`/`skip` and the `judgment:[]` each step needs (compendium match, map prompt, lighting mood, content). **Get explicit approval before any write.** This is the gate; do not skip it.

## 3. Build per concern (in `orderSteps` order)

Execute steps **one MCP call at a time** (never parallel — serialize-writes rule). Delegate by concern:
1. **scene** → `rpg-scene-forge`: prefer an existing scene by name (`list-scenes`); else, **with the user's confirmation**, `generate-map` → record `jobId` → poll `check-map-status`. Then `set-scene-lighting`. All writes to one scene in a single sequential batch.
   1.5. **soundtrack** (optional) → `rpg-soundscape-forge`: right after the scene is built/lit, if a `soundtrack-manifest-<slug>.md` exists AND the audio tools passed preflight. Reads the manifest row for this scene, `create-playlist` (looping bed) → `set-scene-playlist(sceneId from step 1)`, or `create-ambient-sound` for one-shots. Serialize on the same scene. Degrade silently (skip, warn) if the audio tools are absent — never blocks the build.
2. **actor** → `rpg-actor-forge`: match the creature (judgment), `create-actor-from-compendium` (with `placement` on the scene from step 1), then `update-token` (disposition; optional `imagePath`) — serialized on that scene.
3. **journal / dashboard** → `rpg-journal-forge`: quest journals + `link-quest-to-npc` (after the NPC exists), generic lore/faction/front journals, one campaign dashboard from acts. **Per-artifact QA gates** (journal-forge runs these): **pre-write**, spawn `agents/rpg-scene-stress-tester.md` on any narrative content (quest read-aloud, lore/faction/front bodies, narrative handouts) — a 🔴 Blocker **stops the write** and routes back to loremaster/gamemaster; **post-write**, spawn `agents/rpg-journal-verifier.md` after each create/update to confirm the stored HTML (theme classes, enrichers, language, verbatim snippets, folder), applying its suggested fix on a FAILED check.
4. **encounter** (when the unit is an `encontro`, or for the session's encounters) → `rpg-encounter-forge`: ensures scene+lighting, places creatures by `party_level`/`threat`, stages treasure via `manage-world-items`. Serialize token placement on the encounter scene.
5. **challenge** (when the unit is a `desafio`, or for the session's challenges) → `rpg-embate-forge`: writes the challenge journal (structure, DCs, degrees/fail-forward, read-aloud) in folder `Challenges`, ensures the scene only if it has a `local`, renders the VP track as a clock page, and fires the skill checks via `request-player-rolls` (visibility-confirmed). Orders with the journal concern.
6. **ownership** → `rpg-ownership-forge`: LAST, **approval-gated** (`assign-actor-ownership` with `confirmBulkOperation`).

After **each** successful step, commit the returned ids:
```bash
node --input-type=module <<EOF
import { loadManifest, recordBuilt, writeManifest } from "${PLUGIN}/scripts/lib/manifest.mjs";
const m = await loadManifest(process.cwd(), "<world>");
recordBuilt(m, "local", "Cripta dos Ossos", { sceneId: "Scene.abc", source: "generated", lit: true });
await writeManifest(process.cwd(), "<world>", m);
EOF
```
A failure leaves the manifest accurate up to the last success → a re-run resumes from the first unbuilt step.

## 4. Verify

Re-read Foundry (`list-scenes`, `list-journals`, `list-characters`, `get-current-scene`, `get-scene-geometry`, `get-token-details`) and diff against the manifest + the resolved graph. Capture this snapshot to hand to the reviewer.

## 5. Review

Spawn `agents/rpg-foundry-reviewer.md` with the vault graph + the manifest + the verify snapshot. Relay its findings; offered fixes re-enter at step 2 as `update` steps.

## Idempotency / resume contract

Every `create` is guarded by a manifest lookup; an existing live id → update or skip, never duplicate. Async maps resume from `jobId`. The manifest is the single source of "what's built." Re-running `/forge-compile` on the same unit is always safe.

## Per-concern handoff (what flows between compilers)

- scene ids (from scene-forge) → actor-forge + encounter-forge (placement target) **and soundscape-forge** (the scene to bind the playlist to).
- playlist/sound ids (from soundscape-forge) → the conductor records them in the manifest's `soundtrack` array.
- actor ids (from actor-forge) → ownership-forge (which actor a player owns) and reviewer (disposition check).
- NPC names (vault) → journal-forge's `link-quest-to-npc`.
- The conductor owns the manifest writes; compilers return data, they don't write the manifest.

## Lessons baked in
- Serialize scene writes (steps 3.1/3.2/3.4) — parallel writes to one scene drop the 2nd silently.
- generate-map is async + local ComfyUI → poll `check-map-status`, record `jobId` for resume.
- Prefer existing scenes/journals by name before creating (steps 3.1/3.3).
- Gate narrative journals **before** writing (`rpg-scene-stress-tester`) and verify them **after** (`rpg-journal-verifier`) — step 3.3. A scene that ships with an incoherent timeline, a leaked tell, or a spoilered revelation is far cheaper to catch pre-write than to unwind at the table; the verifier catches the silent failures of the journal write path (AI-rewritten main page, wrong theme, append-instead-of-replace).
- "Module not connected" precheck is critical (step 0).
- Degrade gracefully when imagePath/geometry tools/ComfyUI/audio tools are absent (step 0) — soundtrack (step 1.5) is optional and never blocks the build.
