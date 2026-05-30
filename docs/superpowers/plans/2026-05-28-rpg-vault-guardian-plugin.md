# rpg-vault-guardian Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the RPG vault integrity system (v1, currently at `.claude/rpg/` of the Obsidian vault) into an installable Claude Code plugin at `~/projects/rpg-marketplace`.

**Architecture:** Marketplace monorepo with one plugin (`rpg-vault-guardian`). The already-tested Node ESM code is copied wholesale into `scripts/` — no logic changes. Only the skill/agent/command markdown files are adapted: absolute vault paths are replaced with `${CLAUDE_PLUGIN_ROOT}/scripts/` and `--vault .` (cwd). Validation uses cwd as the content root (user launches Claude from the vault content folder).

**Tech Stack:** Node.js ≥ 20.11, ESM (.mjs), native node:test, zero npm runtime dependencies.

---

## Mapa de arquivos

### Criar

```
~/projects/rpg-marketplace/
├─ .claude-plugin/marketplace.json
├─ .gitignore
├─ LICENSE
├─ README.md
├─ docs/superpowers/plans/         ← este arquivo
└─ plugins/rpg-vault-guardian/
   ├─ .claude-plugin/plugin.json
   ├─ package.json
   ├─ README.md
   ├─ agents/rpg-guardian.md       ← adapted (removes absolute paths)
   ├─ commands/rpg-init.md         ← NEW
   ├─ skills/rpg-preserve/SKILL.md ← adapted (${CLAUDE_PLUGIN_ROOT})
   ├─ skills/rpg-audit/SKILL.md    ← adapted (${CLAUDE_PLUGIN_ROOT})
   └─ scripts/
      ├─ schema.mjs                ← exact copy (no changes)
      ├─ validate.mjs              ← exact copy
      ├─ gen-mocs.mjs              ← exact copy
      ├─ init.mjs                  ← NEW
      ├─ lib/
      │  ├─ yaml.mjs               ← exact copy
      │  ├─ frontmatter.mjs        ← exact copy
      │  ├─ schema.mjs             ← exact copy
      │  ├─ vault.mjs              ← exact copy
      │  ├─ checks.mjs             ← exact copy
      │  ├─ report.mjs             ← exact copy
      │  ├─ autofix.mjs            ← exact copy
      │  ├─ mocs.mjs               ← exact copy
      │  └─ preserve.mjs           ← exact copy
      └─ test/
         ├─ *.test.mjs             ← 12 files, exact copy (relative imports OK)
         ├─ init.test.mjs          ← NEW
         └─ fixtures/vault/        ← 14 notes, exact copy
```

> **Layout note:** Tests live in `scripts/test/` (not at the plugin root) so all existing relative imports (`../lib/...`) remain correct without changes. Minor deviation from the spec diagram; consistent with "faithful repackage".

### Source of copies (Obsidian vault — DO NOT modify)

```
/Users/vags/Documents/obsidian/main/.claude/rpg/
├─ schema.mjs, validate.mjs, gen-mocs.mjs
├─ lib/*.mjs (9 modules)
└─ test/ (12 files + fixtures/vault/)
```

---

## Task 1: Scaffolding + manifests

**Files:**
- Create: `~/projects/rpg-marketplace/.claude-plugin/marketplace.json`
- Create: `~/projects/rpg-marketplace/plugins/rpg-vault-guardian/.claude-plugin/plugin.json`
- Create: `~/projects/rpg-marketplace/plugins/rpg-vault-guardian/package.json`
- Create: `~/projects/rpg-marketplace/.gitignore`
- Create: `~/projects/rpg-marketplace/LICENSE`
- Create: `~/projects/rpg-marketplace/README.md`
- Create: `~/projects/rpg-marketplace/plugins/rpg-vault-guardian/README.md`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p ~/projects/rpg-marketplace/.claude-plugin
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/.claude-plugin
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/lib
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/skills/rpg-preserve
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/skills/rpg-audit
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/agents
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/commands
```

- [ ] **Step 2: Create `.gitignore` and `LICENSE`**

`~/projects/rpg-marketplace/.gitignore`:
```
node_modules/
.DS_Store
```

`~/projects/rpg-marketplace/LICENSE` (MIT):
```
MIT License

Copyright (c) 2026 Vagner Strapasson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Create `.claude-plugin/marketplace.json`**

`~/projects/rpg-marketplace/.claude-plugin/marketplace.json`:
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

- [ ] **Step 4: Create `plugins/rpg-vault-guardian/.claude-plugin/plugin.json`**

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

- [ ] **Step 5: Create `plugins/rpg-vault-guardian/package.json`**

```json
{
  "name": "rpg-vault-guardian",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "test": "node --test scripts/test/*.test.mjs"
  }
}
```

- [ ] **Step 6: Create READMEs**

`~/projects/rpg-marketplace/README.md` (content):

    # rpg-marketplace
    
    Claude Code plugin marketplace for RPG campaigns.
    
    ## Plugins
    
    - **rpg-vault-guardian** — Obsidian vault integrity guardian for RPG campaigns.
    
    ## Installation
    
        /plugin marketplace add ~/projects/rpg-marketplace
        /plugin install rpg-vault-guardian@rpg-marketplace

`~/projects/rpg-marketplace/plugins/rpg-vault-guardian/README.md` (content):

    # rpg-vault-guardian
    
    Claude Code plugin for ensuring the structural integrity of Obsidian vaults used in RPG campaigns.
    
    ## What it does
    
    - **/rpg-init** — Scaffolds the initial folder structure (14 folders derived from the schema)
    - **rpg-preserve** — Write gate: validates every entity in memory before writing to disk
    - **rpg-audit** — 7-step audit: validation, auto-fix, LLM health check, MOCs
    - **rpg-guardian** — Isolated-context audit agent
    
    ## Usage
    
    Launch Claude Code from the campaign vault root (folder containing regioes/, npcs/, etc.):
    
        cd ~/Documents/obsidian/main
        claude
    
    ## Tests
    
        cd plugins/rpg-vault-guardian && npm test

- [ ] **Step 7: Commit**

```bash
cd ~/projects/rpg-marketplace
git add .
git commit -m "feat: scaffold marketplace + plugin manifests"
```

Expected output:
```
[main ...] feat: scaffold marketplace + plugin manifests
 N files changed, ...
```

---

## Task 2: Copy scripts and tests (verify 47/47)

**Files:**
- Create: `plugins/rpg-vault-guardian/scripts/schema.mjs` (copy)
- Create: `plugins/rpg-vault-guardian/scripts/validate.mjs` (copy)
- Create: `plugins/rpg-vault-guardian/scripts/gen-mocs.mjs` (copy)
- Create: `plugins/rpg-vault-guardian/scripts/lib/*.mjs` (9 modules, copies)
- Create: `plugins/rpg-vault-guardian/scripts/test/*.test.mjs` (12 files, copies)
- Create: `plugins/rpg-vault-guardian/scripts/test/fixtures/vault/` (14 notes, copies)

- [ ] **Step 1: Copy scripts**

```bash
VAULT_SRC="/Users/vags/Documents/obsidian/main/.claude/rpg"
PLUGIN_DST="/Users/vags/projects/rpg-marketplace/plugins/rpg-vault-guardian"

cp "$VAULT_SRC/schema.mjs"    "$PLUGIN_DST/scripts/schema.mjs"
cp "$VAULT_SRC/validate.mjs"  "$PLUGIN_DST/scripts/validate.mjs"
cp "$VAULT_SRC/gen-mocs.mjs"  "$PLUGIN_DST/scripts/gen-mocs.mjs"
cp -r "$VAULT_SRC/lib/"       "$PLUGIN_DST/scripts/lib/"
```

- [ ] **Step 2: Verify copied scripts**

```bash
ls ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/
ls ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/lib/
```

Expected output:
```
gen-mocs.mjs  lib  schema.mjs  validate.mjs
autofix.mjs  checks.mjs  frontmatter.mjs  mocs.mjs  preserve.mjs  report.mjs  schema.mjs  vault.mjs  yaml.mjs
```

- [ ] **Step 3: Copy tests and fixtures**

```bash
VAULT_SRC="/Users/vags/Documents/obsidian/main/.claude/rpg"
PLUGIN_DST="/Users/vags/projects/rpg-marketplace/plugins/rpg-vault-guardian"

mkdir -p "$PLUGIN_DST/scripts/test"
cp "$VAULT_SRC/test/"*.test.mjs "$PLUGIN_DST/scripts/test/"
cp -r "$VAULT_SRC/test/fixtures" "$PLUGIN_DST/scripts/test/"
```

- [ ] **Step 4: Verify copied tests**

```bash
ls ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/test/
```

Expected output (12 .test.mjs files + fixtures folder):
```
autofix.test.mjs  checks-coherence.test.mjs  checks-links.test.mjs
checks-schema.test.mjs  frontmatter.test.mjs  mocs.test.mjs
preserve.test.mjs  report.test.mjs  schema.test.mjs
validate.test.mjs  vault.test.mjs  yaml.test.mjs
fixtures/
```

- [ ] **Step 5: Run all tests**

```bash
cd ~/projects/rpg-marketplace/plugins/rpg-vault-guardian
node --test scripts/test/*.test.mjs
```

Expected output (last lines):
```
ℹ tests 47
ℹ pass 47
ℹ fail 0
```

If any test fails, check that files were copied correctly and relative imports are intact. Do not proceed until all pass.

- [ ] **Step 6: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/scripts/
git commit -m "feat: copy validated scripts and tests (47/47 passing)"
```



---

## Task 3: init.mjs (TDD)

**Files:**
- Test: `plugins/rpg-vault-guardian/scripts/test/init.test.mjs`
- Create: `plugins/rpg-vault-guardian/scripts/init.mjs`

- [ ] **Step 1: Write the test (should fail — init.mjs does not exist yet)**

`plugins/rpg-vault-guardian/scripts/test/init.test.mjs`:
```js
import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from '../schema.mjs';
import { foldersFromSchema, initVault } from '../init.mjs';

test('foldersFromSchema covers all schema types', () => {
  const folders = foldersFromSchema();

  for (const def of Object.values(ENTITIES)) {
    assert.ok(folders.includes(def.folder), `missing entity folder: ${def.folder}`);
  }
  for (const def of Object.values(NON_ENTITY)) {
    assert.ok(folders.includes(def.folder), `missing NON_ENTITY folder: ${def.folder}`);
  }
  assert.ok(folders.includes('_indices'), 'missing _indices');
  assert.strictEqual(folders.length, 14, `expected 14 folders, found ${folders.length}`);
});

test('initVault creates the 14 folders with .gitkeep', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    const results = await initVault(dir);
    assert.ok(results.every(r => r.created), 'all should be created in empty dir');
    for (const { folder } of results) {
      const entries = await readdir(join(dir, folder));
      assert.ok(entries.includes('.gitkeep'), `missing .gitkeep in ${folder}`);
    }
  } finally {
    await rm(dir, { recursive: true });
  }
});

test('initVault is idempotent', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    await initVault(dir);
    const results2 = await initVault(dir);
    assert.ok(results2.every(r => !r.created), 'second run must not create anything');
  } finally {
    await rm(dir, { recursive: true });
  }
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
cd ~/projects/rpg-marketplace/plugins/rpg-vault-guardian
node --test scripts/test/init.test.mjs
```

Expected output: error `Cannot find module '../init.mjs'` or similar. Confirm it fails before continuing.

- [ ] **Step 3: Implement `scripts/init.mjs`**

`plugins/rpg-vault-guardian/scripts/init.mjs`:
```js
#!/usr/bin/env node
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from './schema.mjs';

export function foldersFromSchema() {
  const folders = [];
  for (const def of Object.values(ENTITIES)) {
    folders.push(def.folder);
  }
  for (const def of Object.values(NON_ENTITY)) {
    folders.push(def.folder);
  }
  folders.push('_indices');
  return folders;
}

export async function initVault(vaultDir) {
  const folders = foldersFromSchema();
  const results = [];
  for (const folder of folders) {
    const fullPath = join(vaultDir, folder);
    let exists = false;
    try { await access(fullPath); exists = true; } catch {}
    if (!exists) {
      await mkdir(fullPath, { recursive: true });
      await writeFile(join(fullPath, '.gitkeep'), '');
      results.push({ folder, created: true });
    } else {
      results.push({ folder, created: false });
    }
  }
  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = await initVault(process.cwd());
  for (const { folder, created } of results) {
    console.log(`${created ? '✅ created' : '⏭  exists'}: ${folder}`);
  }
}
```

- [ ] **Step 4: Run only the init test**

```bash
node --test scripts/test/init.test.mjs
```

Expected output:
```
ℹ tests 3
ℹ pass 3
ℹ fail 0
```

- [ ] **Step 5: Run full test suite (should be 50/50)**

```bash
node --test scripts/test/*.test.mjs
```

Expected output:
```
ℹ tests 50
ℹ pass 50
ℹ fail 0
```

- [ ] **Step 6: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/scripts/init.mjs \
        plugins/rpg-vault-guardian/scripts/test/init.test.mjs
git commit -m "feat: add init.mjs scaffold command (TDD, 50/50 tests)"
```

---

## Task 4: Skills (adapted paths)

**Files:**
- Create: `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md`
- Create: `plugins/rpg-vault-guardian/skills/rpg-audit/SKILL.md`

Key changes from the vault version:
- `${PLUGIN}="${CLAUDE_PLUGIN_ROOT}"` at the start of each bash heredoc
- Imports: `/absolute/path/lib/*.mjs` → `${PLUGIN}/scripts/lib/*.mjs`
- vaultDir: `/absolute/path/rpg` → `process.cwd()`
- CLIs: `node /absolute/validate.mjs --vault /absolute/rpg` → `node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault .`
- Type→folder table: remove `rpg/` prefix (folders now at vault root)
- Folder extraction in audit 3a: use `relative(process.cwd(), filePath)` instead of `replace(vaultPath)`

- [ ] **Step 1: Create `skills/rpg-preserve/SKILL.md`**

```markdown
---
description: Write gate for RPG Obsidian vaults. Every entity creation or edit MUST go through here — validates in memory before writing to disk.
---

# rpg-preserve — Write Gate

You are the single write point of the RPG vault. No entity is written to disk without passing validation. Contract: **validate → pass? write : ask**.

## Mandatory workflow

### 1. Determine target folder and path

Use `targetPath` from `lib/preserve.mjs`. The folder is defined by the schema:

| Type | Folder |
|---|---|
| regiao | regioes/ |
| local | locais/ |
| npc | npcs/ |
| jogador | jogadores/ |
| inimigo | inimigos/ |
| faccao | faccoes/ |
| quest | quests/ |
| sessao | sessoes/ |
| evento | eventos/ |
| ato | atos/ |
| item | itens/ |
| lore | lore/ |

### 2. Build frontmatter and content

Use `buildFrontmatter(type, fields)` and `buildNoteContent(fm, name)` from `lib/preserve.mjs`.

Mandatory formatting rules:
- Fields with wikilink: always `"[[Entity Name]]"` (quotes + brackets)
- List of wikilinks: YAML block with one item per line (`  - "[[Name]]"`)
- Default `status` when not specified: `stub`
- `updated` is automatically stamped with today's date

### 3. Validate the candidate (REQUIRED before writing)

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { buildFrontmatter, buildNoteContent, validateCandidate }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
const vaultDir = process.cwd();
const fm = buildFrontmatter('TYPE', { /* fields */ });
const content = buildNoteContent(fm, 'NAME');
const report = await validateCandidate('NAME', content, 'TYPE', vaultDir);
console.log(JSON.stringify(report, null, 2));
EOF
```

### 4. Decision based on the report

**If `report.summary.errors === 0` → write:**

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { buildFrontmatter, buildNoteContent, writeEntityFile }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
const vaultDir = process.cwd();
const fm = buildFrontmatter('TYPE', { /* fields */ });
const content = buildNoteContent(fm, 'NAME');
const path = await writeEntityFile('TYPE', 'NAME', content, vaultDir);
console.log('Created at: ' + path);
EOF
```

Confirm to the user: `✅ Entity created at <folder>/NAME.md`

**If `report.summary.errors > 0` → do NOT write:**

Show the errors and ask:
> "There are X validation error(s). Would you like to fix the fields and try again?"

List each error with the affected field. Do not write until validation passes with 0 errors.

## Required fields per type (quick reference)

| Type | Required |
|---|---|
| regiao | type |
| local | type, region (→ [[Region]]) |
| npc | type, role (ally/neutral/antagonist/patron) |
| jogador | type, player |
| inimigo | type |
| faccao | type |
| quest | type, act (→ [[Act]]), status (available/active/completed/failed/abandoned) |
| sessao | type, date (YYYY-MM-DD) |
| evento | type, act (→ [[Act]]) |
| ato | type, number (integer) |
| item | type |
| lore | type |

## Full example — Create NPC "Elara"

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { buildFrontmatter, buildNoteContent, validateCandidate, writeEntityFile }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
const vaultDir = process.cwd();
const fm = buildFrontmatter('npc', {
  role: 'ally',
  status: 'stub',
  faction: '[[Culto do Inverno]]',
  location: '[[Cidade de Pedra]]',
});
const content = buildNoteContent(fm, 'Elara');
const report = await validateCandidate('Elara', content, 'npc', vaultDir);
if (report.summary.errors === 0) {
  const path = await writeEntityFile('npc', 'Elara', content, vaultDir);
  console.log('✅ Created at: ' + path);
} else {
  console.log(JSON.stringify(report.issues, null, 2));
}
EOF
```
```

- [ ] **Step 2: Create `skills/rpg-audit/SKILL.md`**

```markdown
---
description: Complete RPG vault audit — deterministic validation, LLM judgment, safe auto-fix, destructive fix proposals, and MOC regeneration.
---

# rpg-audit — Vault Audit

Run a complete vault audit. Follow the 7 steps below **in order**.

Run all commands from the **vault root** (directory containing the `regioes/`, `npcs/`, etc. folders).

---

## Step 1 — Snapshot (before any modifications)

Ask the user:
> "Would you like to make a snapshot commit before continuing?"

If yes:
```bash
git add . && git commit -m "snapshot: before audit $(date +%Y-%m-%d)"
```

---

## Step 2 — Deterministic validation

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault . --json
```

Parse the returned JSON. Categorize issues by family:
- **schema**: missing `type`, missing required field, invalid enum
- **links**: broken link (`broken-link`), orphan entity (`orphan`)
- **coherence**: wrong target type (`wrong-target-type`)

Show a summary: `"X error(s), Y warning(s) found."`

---

## Step 3 — Safe auto-fix (apply without confirmation)

Apply automatically and list each modified file.

### 3a — Missing or wrong `type` → infer from folder

For each note with `missing-type` or `type-folder-mismatch` in the Step 2 report:

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { readFile, writeFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { extractFrontmatter } from "${PLUGIN}/scripts/lib/frontmatter.mjs";
import { inferType, normalizeFrontmatter, stampUpdated } from "${PLUGIN}/scripts/lib/autofix.mjs";
import { serializeFrontmatter } from "${PLUGIN}/scripts/lib/preserve.mjs";
import { typeForFolder } from "${PLUGIN}/scripts/lib/schema.mjs";

const filePath = 'ABSOLUTE_NOTE_PATH';
const raw = await readFile(filePath, 'utf8');
const { frontmatter: fm, body } = extractFrontmatter(raw);
const folder = relative(process.cwd(), filePath).split('/')[0];
const type = typeForFolder(folder);
const note = { type, frontmatter: fm };
const correctedType = inferType(note);
if (correctedType) {
  const newFm = normalizeFrontmatter(stampUpdated({ ...fm, type: correctedType }), correctedType);
  await writeFile(filePath, serializeFrontmatter(newFm) + body, 'utf8');
  console.log('✅ auto-fix type:', filePath);
}
EOF
```

### 3b — Missing `updated` → stamp with today's date

For each entity missing the `updated` field:

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { readFile, writeFile } from 'node:fs/promises';
import { extractFrontmatter } from "${PLUGIN}/scripts/lib/frontmatter.mjs";
import { stampUpdated } from "${PLUGIN}/scripts/lib/autofix.mjs";
import { serializeFrontmatter } from "${PLUGIN}/scripts/lib/preserve.mjs";

const filePath = 'ABSOLUTE_NOTE_PATH';
const raw = await readFile(filePath, 'utf8');
const { frontmatter: fm, body } = extractFrontmatter(raw);
if (!fm.updated) {
  const newFm = stampUpdated(fm);
  await writeFile(filePath, serializeFrontmatter(newFm) + body, 'utf8');
  console.log('✅ auto-fix updated:', filePath);
}
EOF
```

---

## Step 4 — Health check (LLM judgment)

Read each entity and evaluate:

**Stale:** `status: active` + `updated` more than 30 days ago → warning  
**Incomplete:** `status: stub` OR note body contains "TODO" → warning  
**Duplicate:** very similar names (e.g., "Malareph" and "Malareph the Necromancer") → propose merge

Group warnings by type and present to the user.

---

## Step 5 — Propose + confirm destructive fixes

List **all** proposed fixes before applying any:

| # | Issue | Note | Proposal |
|---|---|---|---|
| 1 | Broken link `[[X]]` in `field` | npcs/Foo.md | Create `[[X]]` via rpg-preserve or remove the field? |
| 2 | Wrong target type (`faction` → regiao) | npcs/Bar.md | Fix `faction` field? |
| 3 | Orphan entity | faccoes/Baz.md | Keep, move to lore/, or delete? |
| 4 | Likely duplicate | npcs/A.md + npcs/B.md | Merge? Which is the primary note? |

Ask: `"Would you like to resolve these items? Answer y/n for each number."`

For each confirmed item (y), apply the fix using the available tools (Edit, Write, Bash). For creating missing entities, use rpg-preserve.

---

## Step 6 — Regenerate MOCs

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/gen-mocs.mjs" --vault .
```

---

## Step 7 — Final report

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault .
```

Show the final report and a summary of what was changed in this audit.

---

## Migration mode (first use)

If you detect many notes in entity folders without a `type` field, you are in **migration mode**. Announce:

> "Found X notes without a `type` field in entity folders. I can infer the type from the folder and add the minimum frontmatter to all of them. Would you like to continue? [y/n]"

If confirmed, apply auto-fix 3a to all affected notes in batch, reporting each modified file.
```

- [ ] **Step 3: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/skills/
git commit -m "feat: add adapted skills (rpg-preserve, rpg-audit) with CLAUDE_PLUGIN_ROOT paths"
```

---

## Task 5: Agent + command

**Files:**
- Create: `plugins/rpg-vault-guardian/agents/rpg-guardian.md`
- Create: `plugins/rpg-vault-guardian/commands/rpg-init.md`

- [ ] **Step 1: Create `agents/rpg-guardian.md`**

(Remove the "Vault context" section with absolute paths — the agent invokes the skill, which has all paths)

```markdown
---
name: rpg-guardian
description: RPG vault guardian. Use when you want to audit campaign integrity — runs the full audit in an isolated context, without polluting the main conversation.
---

You are the **RPG vault guardian**. Your sole responsibility is to run the integrity audit and return a structured report to the user.

## What you do

When invoked, run the **rpg-audit** skill from start to finish, in the order of the 7 steps:

1. Ask about snapshot (Step 1)
2. Run the deterministic validator (Step 2)
3. Apply safe auto-fixes (Step 3)
4. Run the LLM health check (Step 4)
5. Propose and confirm destructive fixes (Step 5)
6. Regenerate MOCs (Step 6)
7. Show the final report (Step 7)

If this is the **first use** (many notes without a `type` field in entity folders), activate **migration mode** as described in the rpg-audit skill before following the normal flow.

## When finishing

Return a clear summary to the user with:
- How many errors/warnings were found initially
- Which auto-fixes were applied automatically
- Which destructive fixes were confirmed and applied
- Whether MOCs were regenerated
- Final state: `"X error(s) remaining"`
```

- [ ] **Step 2: Create `commands/rpg-init.md`**

```markdown
---
description: Scaffolds the initial folder structure for an RPG campaign vault.
---

# rpg-init — Initial vault structure

Run the scaffolding script in the current directory (vault root):

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/init.mjs"
```

Show the result to the user, indicating which folders were created (✅) and which already existed (⏭).
```

- [ ] **Step 3: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/agents/ \
        plugins/rpg-vault-guardian/commands/
git commit -m "feat: add rpg-guardian agent and rpg-init command"
```

---

## Task 6: Final verification

**Files:** no new files — validation only.

- [ ] **Step 1: Run the full test suite**

```bash
cd ~/projects/rpg-marketplace/plugins/rpg-vault-guardian
node --test scripts/test/*.test.mjs
```

Expected output:
```
ℹ tests 50
ℹ pass 50
ℹ fail 0
```

- [ ] **Step 2: Verify structure against the spec**

```bash
find ~/projects/rpg-marketplace -not -path '*/.git/*' -type f | sort
```

Confirm the presence of:
- `.claude-plugin/marketplace.json`
- `plugins/rpg-vault-guardian/.claude-plugin/plugin.json`
- `plugins/rpg-vault-guardian/package.json`
- `plugins/rpg-vault-guardian/scripts/schema.mjs`
- `plugins/rpg-vault-guardian/scripts/validate.mjs`
- `plugins/rpg-vault-guardian/scripts/gen-mocs.mjs`
- `plugins/rpg-vault-guardian/scripts/init.mjs`
- `plugins/rpg-vault-guardian/scripts/lib/` (9 modules)
- `plugins/rpg-vault-guardian/scripts/test/` (13 files + fixtures/)
- `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md`
- `plugins/rpg-vault-guardian/skills/rpg-audit/SKILL.md`
- `plugins/rpg-vault-guardian/agents/rpg-guardian.md`
- `plugins/rpg-vault-guardian/commands/rpg-init.md`

- [ ] **Step 3: Verify no absolute paths in skills/agent**

```bash
grep -r "/Users/vags" ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/skills/ \
                      ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/agents/
```

Expected output: no results. If any are found, replace with the pattern `${CLAUDE_PLUGIN_ROOT}/scripts/...`.

- [ ] **Step 4: Verify marketplace.json and plugin.json are valid JSON**

```bash
python3 -m json.tool ~/projects/rpg-marketplace/.claude-plugin/marketplace.json > /dev/null \
  && echo "marketplace.json: valid"
python3 -m json.tool ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/.claude-plugin/plugin.json > /dev/null \
  && echo "plugin.json: valid"
```

Expected output:
```
marketplace.json: valid
plugin.json: valid
```

- [ ] **Step 5: Commit final**

```bash
cd ~/projects/rpg-marketplace
git add -A
git status  # confirm nothing unexpected
git commit -m "chore: verify plugin structure complete — 50/50 tests passing"
```

---

## Task summary

| Task | Deliverable | Tests |
|---|---|---|
| 1 | Scaffolding + JSON manifests | — |
| 2 | Scripts copied | 47/47 ✓ |
| 3 | init.mjs (TDD) | 50/50 ✓ |
| 4 | Adapted skills (CLAUDE_PLUGIN_ROOT) | — |
| 5 | Agent + command | — |
| 6 | Final verification | 50/50 ✓ |
