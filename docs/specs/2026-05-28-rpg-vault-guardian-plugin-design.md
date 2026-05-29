# RPG Vault Guardian — Plugin & Marketplace Design

**Date:** 2026-05-28  
**Status:** Approved  
**Target repo:** `~/projects/rpg-marketplace`

---

## Context

The RPG vault integrity system (v1) was built as local code in the Obsidian vault at `.claude/rpg/` + skills at `.claude/skills/` + agent at `.claude/agents/`. It consists of:

- 9 Node ESM modules (`lib/*.mjs`) — YAML parser, schema validator, link/coherence/orphan checker, autofix, MOC generator, write gate
- 2 CLIs (`validate.mjs`, `gen-mocs.mjs`)
- 2 skills (`rpg-preserve`, `rpg-audit`)
- 1 agent (`rpg-guardian`)
- 47 tests with fixtures

The goal is to transform this system into a **Claude Code plugin** published in a **local marketplace**, so it can be installed in any vault as project scope — without relying on manual file copies.

---

## Design decisions

| # | Decision | Choice |
|---|---------|---------|
| 1 | Marketplace layout | Monorepo (pattern `claude-plugins-official`): `plugins/<name>/` |
| 2 | Plugin name | `rpg-vault-guardian` v1.0.0 |
| 3 | Transformation approach | Faithful repackage (A): copies tested code, adapts only the paths |
| 4 | Validated content root | Direct cwd — user launches Claude from inside the content folder; validator uses `--vault .` |
| 5 | Initial scaffold | Slash command `/rpg-init` + `scripts/init.mjs` derived from schema |
| 6 | Active hook (automatic write gate) | Out of scope v1.0 (YAGNI); can be added in v1.1 |
| 7 | Obsidian vault | **Untouched** during plugin creation. Project-scope installation is phase 2. |

---

## Repository structure

```
rpg-marketplace/
├─ .claude-plugin/
│  └─ marketplace.json          ← marketplace manifest
├─ plugins/
│  └─ rpg-vault-guardian/
│     ├─ .claude-plugin/
│     │  └─ plugin.json         ← plugin manifest
│     ├─ commands/
│     │  └─ rpg-init.md         ← slash command /rpg-init
│     ├─ skills/
│     │  ├─ rpg-preserve/
│     │  │  └─ SKILL.md         ← write gate
│     │  └─ rpg-audit/
│     │     └─ SKILL.md         ← 7-step audit
│     ├─ agents/
│     │  └─ rpg-guardian.md     ← isolated audit agent
│     ├─ scripts/
│     │  ├─ schema.mjs          ← TRUTH SOURCE (registry)
│     │  ├─ validate.mjs        ← validator CLI
│     │  ├─ gen-mocs.mjs        ← MOC generator CLI
│     │  ├─ init.mjs            ← scaffolding CLI (NEW)
│     │  └─ lib/
│     │     ├─ yaml.mjs
│     │     ├─ frontmatter.mjs
│     │     ├─ schema.mjs
│     │     ├─ vault.mjs
│     │     ├─ checks.mjs
│     │     ├─ report.mjs
│     │     ├─ autofix.mjs
│     │     ├─ mocs.mjs
│     │     └─ preserve.mjs
│     ├─ test/
│     │  ├─ *.test.mjs          ← 47 existing tests
│     │  ├─ init.test.mjs       ← NEW: ensures init↔schema
│     │  └─ fixtures/vault/     ← 14 fixture notes
│     └─ README.md
├─ docs/
│  └─ specs/
│     └─ 2026-05-28-rpg-vault-guardian-plugin-design.md
├─ README.md
└─ LICENSE
```

---

## Plugin: rpg-vault-guardian

### Manifest (`plugin.json`)

```json
{
  "name": "rpg-vault-guardian",
  "description": "Obsidian vault integrity guardian for RPG campaigns. Validates schema, links, coherence, and orphans; creates validated entities (write gate); audits the campaign; and scaffolds the initial folder structure.",
  "version": "1.0.0",
  "author": {
    "name": "Vagner Strapasson",
    "email": "vagnerstrapasson@gmail.com"
  },
  "license": "MIT",
  "keywords": ["rpg", "ttrpg", "obsidian", "vault", "validation", "gm", "campaign"]
}
```

### Skill: `rpg-preserve` (write gate)

Invoked whenever the GM creates or edits a campaign entity. Flow:
1. Determines the target path via `targetPath(type, name, '.')`.
2. Builds the frontmatter with `buildFrontmatter` + `buildNoteContent`.
3. Validates in memory via `validateCandidate` — **required before writing**.
4. Zero errors → writes via `writeEntityFile`; errors → does not write, reports to user.

Scripts referenced via `${CLAUDE_PLUGIN_ROOT}/scripts/lib/preserve.mjs`.

### Skill: `rpg-audit` (7-step audit)

1. Git snapshot (prompt to user).
2. Deterministic validation: `node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault . --json`.
3. Safe auto-fix: infer type, normalize, stamp `updated`.
4. LLM health check: stale/incomplete/duplicate notes.
5. Propose + confirm destructive fixes.
6. Regenerate MOCs: `node "${CLAUDE_PLUGIN_ROOT}/scripts/gen-mocs.mjs" --vault .`.
7. Final report with re-run of the validator.

Includes migration mode (first use with many notes missing `type`).

### Agent: `rpg-guardian`

Entry point for isolated-context audit. Executes all 7 steps of `rpg-audit` and returns a structured summary:
- initial errors/warnings
- auto-fixes applied
- destructive fixes confirmed
- MOCs regenerated
- final state (`X error(s) remaining`)

### Command: `/rpg-init` (NEW)

**File:** `commands/rpg-init.md`  
**Script:** `scripts/init.mjs`

Behavior:
- Reads all `ENTITIES` from `schema.mjs` and extracts the `folder` for each type.
- Reads `NON_ENTITY` (transcricoes).
- Adds `_indices` (for MOCs).
- Creates all missing folders in cwd (idempotent: does not overwrite).
- Writes `.gitkeep` in each created folder.
- Prints what was created vs. what already existed.

```
# folders created (14 total):
regioes/  locais/  npcs/  jogadores/  inimigos/  faccoes/
quests/   sessoes/ sessoes/transcricoes/  eventos/  atos/
itens/    lore/    _indices/
```

---

## Marketplace (`marketplace.json`)

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "rpg-marketplace",
  "description": "Claude Code plugin marketplace for RPG campaigns.",
  "owner": {
    "name": "Vagner Strapasson",
    "email": "vagnerstrapasson@gmail.com"
  },
  "plugins": [
    {
      "name": "rpg-vault-guardian",
      "description": "Obsidian vault integrity guardian for RPG campaigns.",
      "version": "1.0.0",
      "source": "./plugins/rpg-vault-guardian",
      "category": "productivity"
    }
  ]
}
```

---

## Path adaptations (Vault → Plugin)

All `.mjs` modules use relative imports among themselves — they move as a unit, **without changes**. Only the references in skills/agent need to change:

| Context | Before (vault) | After (plugin) |
|---|---|---|
| Skills call CLIs | `node "…/.claude/rpg/validate.mjs"` | `node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs"` |
| Skills import lib | `import … from "…/.claude/rpg/lib/preserve.mjs"` | `import … from "${CLAUDE_PLUGIN_ROOT}/scripts/lib/preserve.mjs"` |
| Content root | `--vault rpg` / absolute path | `--vault .` (cwd — validator default) |
| Skill file names | `rpg-preserve.md`, `rpg-audit.md` | `SKILL.md` (Anthropic standard) |

`${CLAUDE_PLUGIN_ROOT}` is automatically injected by Claude Code for each installed plugin.

---

## Tests

All 47 existing tests are copied and run in the new location. Expected pass rate: 47/47 with no logic changes.

**New test `init.test.mjs`:**
- Verifies that the set of folders generated by `init.mjs` is identical to the set derived from the schema (`folderForType` for all types + `NON_ENTITY.transcricao.folder` + `_indices`).
- Ensures that adding a type to the schema without updating init would be detected immediately.

---

## Phase 2 — Project-scope installation in the vault (after plugin is ready)

This phase touches the Obsidian vault. Steps:

1. **Register local marketplace:**  
   `/plugin marketplace add ~/projects/rpg-marketplace`

2. **Install the plugin:**  
   `/plugin install rpg-vault-guardian@rpg-marketplace`

3. **Pin as project scope:**  
   Add to the vault's `.claude/settings.json` (creating it if it doesn't exist):
   ```json
   {
     "extraKnownMarketplaces": {
       "rpg-marketplace": {
         "source": {
           "source": "directory",
           "path": "/Users/vags/projects/rpg-marketplace"
         }
       }
     },
     "enabledPlugins": ["rpg-vault-guardian@rpg-marketplace"]
   }
   ```

4. **Remove old copies** (to avoid name collisions):
   - `.claude/rpg/` (scripts and lib)
   - `.claude/skills/rpg-preserve/`
   - `.claude/skills/rpg-audit/`
   - `.claude/agents/rpg-guardian.md`

> **Note — vault restructuring:** After installation, the `rpg/` folder should be removed and its content moved to the vault root so that direct-cwd works when launching Claude from the root. This work is separate and out of scope for this plugin.

---

## Out of scope (v1.0)

- `PreToolUse` hook for automatic write gate — planned for v1.1.
- Second plugin in the marketplace (e.g., content-creation skillkit) — future.
- Publishing to a remote marketplace (GitHub) — future.
