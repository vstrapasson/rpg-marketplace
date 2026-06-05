---
name: rpg-forge-conductor
description: Orchestrates compiling a validated RPG vault (built by rpg-vault-guardian / rpg-gamemaster) into a playable Foundry VTT session by driving the foundry-vtt-mcp server. Resolves a compile unit — a `sessao`, an `encontro`, or a `desafio` — into an entity graph, runs a dependency preflight, shows a dry-run plan for approval, then sequences the compiler skills (scenes+lighting, actors+tokens, journals, encounters, challenges, ownership) idempotently, holding state in an on-disk build manifest. Reads the vault as the contract; writes to Foundry only via MCP; never invents missing data. Use whenever the user wants to build, assemble, set up, compile, realize, or "montar/compilar/preparar/levar pro Foundry" a session, encounter, or challenge from the vault. Triggers: "compila a sessão no Foundry", "monta o encontro no Foundry", "monta o desafio no Foundry", "prepara a Sessão 1 no Foundry", "build/forge this session", "set up this encounter in Foundry", or the `/forge-compile` command.
---

# RPG Forge Conductor — compile the vault into a Foundry session

## What this skill is for

You are the **showrunner** that turns a *validated* vault into a *runnable* Foundry session. The vault already holds the campaign (regions, locais, npcs, inimigos, quests, sessoes, encontros…); the loremaster authored it and the guardian validated it. Your job is **realization, not authoring**: read what's there and build it in Foundry. If something is missing, you surface it — you never invent it.

## The core idea

Compilation is a **deterministic plan + LLM judgment**, executed **idempotently** with **state on disk**:
- **Scripts** (`scripts/lib/*.mjs`) do the deterministic work: read the vault, resolve the graph, order the build, track the manifest. You call them via `node --input-type=module` heredocs (cwd = the user's vault root).
- **You (and the compiler skills)** supply judgment: matching an `inimigo` to a compendium creature, wording a map prompt, choosing a lighting mood, placing tokens.
- The **build manifest** (`build-manifest-<world>.md` in the vault root) maps every vault entity → its Foundry document id, so re-running is safe (skip built) and a cold session resumes.

Two rules are load-bearing (hard-won — see references):
1. **Serialize writes to the same scene.** Never fire parallel MCP calls that touch one scene — the second silently no-ops. Execute the plan one tool call at a time.
2. **Preflight before building.** Check every dependency first; block on critical failures, degrade optional features with a clear warning.

## When to use this skill

Trigger on requests to build/compile/assemble a **session, encounter, or challenge** into Foundry ("compila a Sessão 1", "monta a Emboscada na Cripta no Foundry", "monta o desafio do conselho no Foundry", "forge this session"). Compile units are **`sessao`**, **`encontro`**, and **`desafio`** (ato/campaign are future — tell the user if they ask). Do **not** use this to author vault content (that's loremaster/gamemaster) or to validate the vault (that's the guardian).

## The workflow at a glance

0. **Preflight** — `references/preflight-checks.md`. Block on critical fails.
1. **Read → Resolve** the unit into a graph (script). Surface `missing[]` as blockers.
2. **Plan (dry-run)** — show the ordered plan; **get approval before any write**.
3. **Build per concern**, in order, delegating to the compiler skills; serialize scene writes; update the manifest after each success.
4. **Verify** against live Foundry + the manifest.
5. **Review** — spawn `rpg-foundry-reviewer`; relay findings.

The full contract is in `references/orchestration-playbook.md` — load it. State-file format: `references/build-manifest-template.md`. Unit semantics: `references/compile-units.md`.

## Driving the scripts

All scripts are pure and run via a heredoc with the cwd = the user's vault root, e.g.:
```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module <<EOF
import { loadVault } from "${PLUGIN}/scripts/lib/vault-read.mjs";
import { resolveUnit } from "${PLUGIN}/scripts/lib/resolve.mjs";
import { planBuild } from "${PLUGIN}/scripts/lib/build-plan.mjs";
import { loadManifest } from "${PLUGIN}/scripts/lib/manifest.mjs";
const vaultDir = process.cwd();
const { index } = await loadVault(vaultDir);
const graph = resolveUnit(index, "Sessão 1");          // the compile unit
const manifest = await loadManifest(vaultDir, "<world>");
console.log(JSON.stringify(planBuild(graph, manifest), null, 2));
EOF
```
See `references/orchestration-playbook.md` for every exact heredoc — resolve, preflight, plan, and `recordBuilt`/`writeManifest` after each build step.

## Handing off to compiler skills

Build order and the skill for each concern:
1. **Scenes + lighting** → `rpg-scene-forge`
2. **Soundtrack** → `rpg-soundscape-forge` (right after scenes — audio binds to a scene's Ambience; **optional/degradable**: skip if the foundry-mcp audio tools are absent). Consumes a `soundtrack-manifest-<slug>.md` authored by `rpg-sound-director`.
3. **Actors + tokens** → `rpg-actor-forge`
4. **Journals (quests/lore/dashboard)** → `rpg-journal-forge`
5. **Encounters** → `rpg-encounter-forge` (fuses a scene + creatures + treasure)
6. **Challenges** → `rpg-embate-forge` (a `desafio` → challenge journal + optional scene + live rolls + VP clock)
7. **Ownership** → `rpg-ownership-forge` (last; approval-gated)
8. **Wealth sync** → `rpg-treasure-forge` (**on demand, not a unit compile**): reads the PCs' Foundry inventories, reconciles the party overview's `## Wealth` section (the kit's only vault sync-back), and pushes awarded loot to sheets (approval-gated). Invoke when the GM asks to sync wealth or grant treasure — outside the normal session/encounter/challenge build.

Challenges order alongside the other journals (concern rank `journal`), after scenes/actors/items and before ownership.

Each compiler consumes its sub-graph + the manifest, returns the Foundry ids it created; **you** commit them to the manifest (single-writer).

## File output

The only file you write is the **build manifest** in the vault root (via `manifest.mjs`). You never write entity files (that's the guardian's `rpg-preserve`) and you never edit the vault. Everything else is Foundry state via MCP.
