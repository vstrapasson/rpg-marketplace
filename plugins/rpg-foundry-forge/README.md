# rpg-foundry-forge

The **realization layer** of the RPG marketplace. It **compiles a validated Obsidian vault into a playable Foundry VTT session**, orchestrating the [`foundry-vtt-mcp`](https://github.com/) server. Loremaster *authors* the world, gamemaster *preps* the table, vault-guardian *validates and stores* it — and this plugin **builds it in Foundry**.

It compiles; it does not author. It reads the vault as the contract and writes to Foundry only via MCP. If something is missing, it surfaces it — it never invents.

```
 AUTHOR / PREP / VALIDATE            VAULT = contract              REALIZE (this plugin)        FOUNDRY (via MCP)
 ───────────────────────            ────────────────              ─────────────────────        ─────────────────
 loremaster / gamemaster  ─preserve▶ locais, npcs, inimigos, ─read▶ rpg-forge-conductor ─MCP─▶ scenes, lights,
 vault-guardian           ─validate▶ quests, encontros, ...        + compiler skills           actors+tokens,
                                          │                              │                      journals, ownership
                                          └──── build-manifest-<world>.md ┘  (idempotent / resumable)
```

## Philosophy
- **Deterministic plan + LLM judgment.** Zero-dep Node scripts (`scripts/lib/`) read the vault, resolve the graph, order the build, and track the manifest. The skills add judgment: matching creatures to the compendium, wording map prompts, choosing lighting, placing tokens.
- **Idempotent & resumable.** A per-world `build-manifest-<world>.md` in the vault root maps every vault entity → its Foundry document id. Re-running skips what's built; a cold session resumes (incl. in-flight async map jobs).
- **Serialize scene writes.** Parallel writes to one Foundry scene silently drop — the conductor executes one MCP call at a time.
- **Prefer existing.** Scenes and journals are matched by name before anything is created.
- **Organic walls are the human's job.** Pixel-precise wall tracing of painted maps isn't reliable to automate; the plugin lights scenes and places tokens, and leaves wall drawing to Foundry's own tool.

## What's inside
| Kind | Name | Role |
|---|---|---|
| skill | `rpg-forge-conductor` | orchestrator: resolve → preflight → plan → build → verify → review; owns the manifest |
| skill | `rpg-scene-forge` | `local` → scenes + mood lighting (prefer existing; generate under confirmation) |
| skill | `rpg-actor-forge` | `inimigo`/`npc` → compendium actors + token placement + disposition (+ optional AI art) |
| skill | `rpg-journal-forge` | `quest`/`lore`/`faccao`/`frente`/`ato` → quest & lore journals + campaign dashboard |
| skill | `rpg-ownership-forge` | `jogador` → Foundry actor ownership (last, approval-gated) |
| skill | `rpg-encounter-forge` | `encontro` → assembled combat (scene + creatures-by-threat + treasure) |
| agent | `rpg-foundry-reviewer` | non-interactive auditor: diffs vault graph vs built session |
| commands | `/forge-compile`, `/forge-preflight`, `/forge-status`, `/forge-verify`, `/rpg-foundry-forge-help` | the build lifecycle |
| scripts | `scripts/lib/*.mjs` | `vault-read`, `resolve`, `build-plan`, `manifest`, `foundry-args`, `preflight` (zero-dep, `node:*` only) |

## Compile units (v0.1)
- **`sessao`** — a whole game night (its quests, encounters, players, locations).
- **`encontro`** — one combat (scene + creatures + treasure).

Acts and whole-campaign exports are planned but not exposed yet.

## Prerequisites
- The `foundry-vtt-mcp` server registered with Claude Code, and the **Foundry MCP Bridge module connected** in the running world (reload / `/mcp` reconnect after a restart).
- For the full feature set: the local MCP patches (`update-token imagePath`, the scene-geometry tools) and a local **ComfyUI** (`:8000`) for map and token-art generation. Missing optionals degrade gracefully — `/forge-preflight` reports exactly what will be skipped.

## Quick start
```
/forge-preflight "Sessão 1"     # check dependencies
/forge-compile  "Sessão 1"      # plan (you approve) → build → verify → review
/forge-status   "Sessão 1"      # what's built vs pending
```

## Development
```
cd plugins/rpg-foundry-forge
npm test        # node --test scripts/test/*.test.mjs (pure-lib tests over a fixture vault)
```

## Conventions
Domain vocabulary is Portuguese (the vault schema: `regioes`, `npcs`, `inimigos`, `encontros`…); code and docs are English. Skills reach scripts via `${CLAUDE_PLUGIN_ROOT}` and assume the working directory is the **user's vault root**. The vault reader is intentionally duplicated from rpg-vault-guardian (ports-and-adapters: cross-plugin comms via the vault files, never code imports).
