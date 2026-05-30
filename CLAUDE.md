# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Claude Code plugin marketplace** (`.claude-plugin/marketplace.json`), not an application. It ships two plugins that are *fundamentally different in kind* — don't assume one's conventions apply to the other:

- **`plugins/rpg-vault-guardian`** — real Node.js code (ESM `.mjs`) + a test suite. Validates/repairs Obsidian RPG vaults.
- **`plugins/rpg-loremaster`** — pure prompt engineering. No code, no tests: just `SKILL.md` files, `references/*.md`, and agent markdown. Nothing here "runs"; it's instructions for the model.

Each plugin has its own `.claude-plugin/plugin.json`; the root `marketplace.json` registers both.

## Commands

All runnable code lives in `rpg-vault-guardian`. There is no build step and no linter.

```bash
cd plugins/rpg-vault-guardian
npm test                                      # all tests (node --test scripts/test/*.test.mjs)
node --test scripts/test/checks-schema.test.mjs   # a single test file

# Run the tools directly (CWD must be a vault root, not this repo):
node scripts/validate.mjs --vault <dir> [--json] [--file <path>]   # exit 1 = errors, 2 = broken schema registry
node scripts/init.mjs                          # scaffold the 14 folders in CWD
node scripts/gen-mocs.mjs --vault <dir>        # regenerate _indices/ MOCs
```

## rpg-vault-guardian architecture

**`scripts/schema.mjs` is the single source of truth.** It declares `ENTITIES` (the 12 entity types), `COMMON_FIELDS`, `NON_ENTITY`, and `IGNORED_TOP`. Folder names, required fields, enum values, and which relations may point where all derive from this one object. To add/change an entity type, field, or relation, **edit only `schema.mjs`** — folder scaffolding (`init`), validation, coherence checks, and MOCs all follow automatically. `checkSchemaIntegrity()` self-validates the registry (relation targets must reference known types; enums must have `values`), and `validate.mjs` aborts with exit code 2 if the registry is malformed.

**Two layers under `scripts/`:**
- `scripts/lib/*.mjs` — pure, side-effect-light functions. `vault.mjs` walks/classifies/indexes notes; `frontmatter.mjs` + `yaml.mjs` parse frontmatter; `checks.mjs` holds the four validators (`checkSchema`, `checkLinks`, `checkCoherence`, `checkOrphans`); `report.mjs` aggregates issues by family/severity; `autofix.mjs` normalizes/stamps; `preserve.mjs` is the write gate; `mocs.mjs` builds index files.
- `scripts/*.mjs` (`validate`, `init`, `gen-mocs`, `schema`) — thin CLI entry points over the lib.

**The lib API is a contract consumed by Markdown, not just by the CLI.** The `SKILL.md` files import lib functions inline via `node --input-type=module << EOF` heredocs (e.g. `rpg-preserve` calls `buildFrontmatter` / `validateCandidate` / `writeEntityFile` from `lib/preserve.mjs`). **Changing a lib export's signature can silently break a skill** — grep the `skills/` markdown when you touch a lib export.

**The deterministic/LLM split is the whole design.** Scripts decide structural facts (schema validity, broken/orphan links, wrong-target-type coherence); the *skills* layer judgment on top (staleness, duplicates, what to fix). `rpg-preserve` is the **single write gate** — its contract is `validate in memory → 0 errors? write : ask`; nothing should write an entity file by any other path.

**Constraints to respect:** zero runtime dependencies (only `node:*` built-ins). `lib/yaml.mjs` is a deliberately minimal *flat*-YAML parser — frontmatter is single-level only (no nested maps); don't introduce nested YAML expecting it to parse.

**Tests:** `node:test` + `node:assert`, with a fixture vault under `scripts/test/fixtures/vault/`. Tests load that fixture and assert on issue `code`s.

## rpg-loremaster architecture

Seven stateless creator skills (`skills/rpg-*/SKILL.md` + `references/`) plus one orchestrator and one reviewer:

- **The conductor (`rpg-campaign-conductor`) is the memory between skills.** Each creator skill makes one artifact and ends; the conductor sequences them, injects the campaign's identity downward, carries handoffs forward, and prevents drift. **All campaign state lives in a `campaign-bible-<slug>.md` file, never in chat** — that's what lets a fresh session resume. The orchestration contract is in `references/orchestration-playbook.md`.
- **`agents/rpg-campaign-reviewer.md`** is a non-interactive subagent (`tools: Read, Glob, Grep`, `model: sonnet`) — it audits a campaign folder against its bible and reports; it never edits.
- Shared reference files (`co-creation.md`, `output-template.md`, `tone-spectrum.md`) are **duplicated per skill** by design (skills must be self-contained) — edit the copy in each skill, not a shared one.

## Conventions

- **Domain vocabulary is Portuguese; code and docs are English.** The vault's on-disk folders and `type` values are Portuguese (`regioes`, `npcs`, `faccoes`, `local`, `inimigo`, `faccao`…). This is the vault schema, not a translation candidate — keep it. Code identifiers, comments, and prose are English.
- **Skills reach scripts via `${CLAUDE_PLUGIN_ROOT}`**, and assume the working directory is the *user's vault root* (the folder containing `regioes/`, `npcs/`, …), not this repository.
- **loremaster PF2e links must be category-level** Archives of Nethys URLs (`/Deities.aspx`), never `?ID=` deep links — the reviewer flags `?ID=`.
- `local/` is gitignored (working handbooks/design notes). `docs/` holds the design spec and build plan for the guardian plugin.
