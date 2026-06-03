---
name: rpg-scene-forge
description: Realizes vault `local` (locations) as Foundry VTT scenes with mood lighting, driving the foundry-vtt-mcp server. Prefers linking an existing scene by name; only generates a new battlemap (async, local ComfyUI) when none exists AND the user confirms. Sets darkness / global light / token vision to match the place's mood. Leaves organic-map wall tracing to the human (only lays walls for simple known geometry). Invoked by rpg-forge-conductor during a session/encounter compile; also use directly for "cria/prepara a cena de <local> no Foundry", "set up the scene for this location", "gera o mapa da cripta".
---

# RPG Scene Forge — locations → Foundry scenes + lighting

## What this skill is for
Turn each **tactical** `local` — one that is an `encontro.location` (the resolver lists these as `tacticalLocals`) — into a Foundry scene that's lit for play. You do **not** author the place — its description is the vault note's body. You realize it: find or make the scene, light it, record the id. **Narrative** locals (no encounter — `narrativeLocals`) are NOT your job: rpg-journal-forge turns them into image handouts; only link a pre-existing gridless backdrop if the user made one (see `references/scene-policy.md`). Never `generate-map` a narrative local.

## Workflow
1. **Prefer existing.** `list-scenes` and match by the local's name (and aliases). If a scene matches, link it (record `source: linked`) — do not regenerate.
2. **Generate only if missing, with confirmation.** `generate-map` is async and uses local ComfyUI (slow, a real compute job). Ask before spending one. Build the prompt from the local's body + the campaign tone (judgment — see `references/scene-policy.md`). Call `generate-map(prompt, scene_name, size, grid_size)`, record the `jobId` in the manifest, then poll `check-map-status(jobId)` until complete. The module sets the background automatically (patched for v14).
3. **Light it.** Pick a mood (bright/dim/dark/pitch) from tone + place kind; `foundry-args.suggestMood` gives a default, `lightingForMood` gives the numbers; apply with `set-scene-lighting(darkness, globalLight, tokenVision)`. See `references/lighting-and-geometry.md`.
4. **Walls = human's job.** Do NOT auto-trace walls on painted/organic maps (they float and look wrong — hard-won verdict). Only `create-walls` for simple, known, grid-aligned geometry the user explicitly asks for. Record `walls: skipped`.
5. **Serialize.** All writes to ONE scene happen as a single sequential batch — never parallel (the 2nd write silently no-ops).
6. Return `{ sceneId, source, lit }` to the conductor for the manifest.

## Judgment vs script
- **Script** gives lighting numbers (`lightingForMood`), the placement offset dims, wall enum-safe defaults.
- **You** choose: the existing-scene match, the map prompt wording, the lighting mood bucket.

Load `references/scene-policy.md` (link-vs-generate, prompt craft) and `references/lighting-and-geometry.md` (lighting numbers, the wall verdict, coords/offset, v14 fields) before acting.
