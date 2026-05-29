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
