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
