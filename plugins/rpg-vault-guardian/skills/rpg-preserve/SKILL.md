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
| frente | frentes/ |
| relogio | relogios/ |
| encontro | encontros/ |

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

## Updating an existing entity (preserve body)

The workflow above **always rebuilds the note from scratch** via `buildFrontmatter`/`buildNoteContent` — correct for a brand-new entity, but it silently discards any hand-authored body (dossier prose, a quest's description, a session's context) if used on a note that already exists. Use this recipe instead whenever the caller wants to **change a few fields on an existing entity** — e.g. flipping `quest.status`, updating an `npc`'s `status`, adding a `sessao`'s outcomes.

The caller (e.g. `rpg-session-recap`) hands you a `type`, a `name`, a `patch` (fields to merge into the existing frontmatter), and optionally an `append` (text to add to the end of the body). You run:

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { readFile } from 'node:fs/promises';
import { extractFrontmatter } from "${PLUGIN}/scripts/lib/frontmatter.mjs";
import { serializeFrontmatter, validateCandidate, writeEntityFile, targetPath }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
import { stampUpdated, normalizeFrontmatter } from "${PLUGIN}/scripts/lib/autofix.mjs";

const vaultDir = process.cwd();
const type = 'TYPE';
const name = 'NAME';
const patch = { /* only the fields that changed, e.g. status: 'completed' */ };
const append = null; // or a string to add to the end of the body

const path = targetPath(type, name, vaultDir);
const existing = await readFile(path, 'utf8');
const { frontmatter, body } = extractFrontmatter(existing);

const fm = normalizeFrontmatter(stampUpdated({ ...frontmatter, ...patch }), type);
const newBody = append ? body.replace(/\n*$/, '') + '\n\n' + append.trim() + '\n' : body;
const content = serializeFrontmatter(fm) + newBody;

const report = await validateCandidate(name, content, type, vaultDir);
if (report.summary.errors === 0) {
  const written = await writeEntityFile(type, name, content, vaultDir);
  console.log('✅ Updated at: ' + written);
} else {
  console.log(JSON.stringify(report.issues, null, 2));
}
EOF
```

Same contract as a create: **0 errors → write, otherwise show the errors and ask.** The differences from the create flow:
- `readFile` + `extractFrontmatter` split the existing note instead of building one from nothing.
- `patch` fields are merged **on top of** the existing frontmatter (`{ ...frontmatter, ...patch }`) — untouched fields survive untouched.
- The body is carried through verbatim (`newBody = body` when there's no `append`), so existing prose is never lost.
- `targetPath` (already exported from `preserve.mjs`) resolves the file to read — throws if the type is unknown, same as the create path.

If the entity doesn't exist yet at that path, `readFile` throws — that means the caller wanted a create, not an update; fall back to the standard workflow above instead.

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
| frente | type |
| relogio | type, segments (integer) |
| encontro | type |

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
