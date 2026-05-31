# RPG Gamemaster Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `rpg-gamemaster` — the session prep & run layer for the RPG marketplace — as four prompt-engineering skills backed by three new vault entity types in the guardian.

**Architecture:** Ports-and-adapters. `rpg-gamemaster` (core) reasons about the game in Markdown; it reads vault entities + loose loremaster files and persists output **only** by handing entity candidates to the `rpg-preserve` skill (the guardian adapter). It imports no adapter code. Three new entity types (`frente`, `relogio`, `encontro`) are added to the guardian's `schema.mjs`, from which folders/validation/MOCs derive automatically.

**Tech Stack:** Node ESM (`node:test`/`node:assert`) for the guardian schema change; pure Markdown (`SKILL.md` + `references/`) for the four skills; Claude Code plugin manifest + marketplace JSON.

**Spec:** `docs/specs/2026-05-30-rpg-gamemaster-plugin-design.md` (approved). This plan is the HOW; the spec is the WHAT/WHY — consult it for rationale.

---

## Scope & phasing

One plan, three independently-shippable phases (per the approved spec, decision #4):

- **Phase 1 — Core campaign loop:** guardian schema extension (+ cascade) → `rpg-front-tracker` → `rpg-session-prep` → minimal installable scaffold. Delivers "plan a campaign" end-to-end.
- **Phase 2 — Encounters:** verified PF2e math reference → `rpg-encounter-builder`.
- **Phase 3 — Table overlay + assembly:** `rpg-gm-run-sheet` → `/rpg-gamemaster-help` → README → final safety grep + install smoke test.

Two kinds of task appear below. **Code tasks** (the guardian schema change) use full TDD with real code and `npm test`. **Authoring tasks** (the four skills) are prose; for them "the content an engineer needs" is the exact frontmatter, the exact section list, the reference files to create, the source files to copy the pattern from, and concrete validation commands — not 400 lines of generated prose, which is the implementation itself.

---

## Background the engineer must know

Read these before starting; they are the conventions this plan assumes.

1. **The kit's shared DNA:** `local/design-philosophy.md`. Every skill bundles a co-creation front-end, weaves short read-aloud beats, inherits tone from the campaign (default dark-leaning level 3), matches the user's language, links Archives of Nethys (AoN) **category pages only** (`/Creatures.aspx`, never `?ID=`), ends with structured off-stage handoffs, and offers a Compact/Full density option.
2. **The closest pattern to copy:** `plugins/rpg-loremaster/skills/rpg-clue-mapper/` — same shape we want (tone **inherited**, so **no `tone-spectrum.md`**). Its `SKILL.md`, `references/co-creation.md`, and `references/output-template.md` are the templates to adapt.
3. **The vault schema is the single source of truth:** `plugins/rpg-vault-guardian/scripts/schema.mjs`. Editing it makes folder scaffolding (`init.mjs`), validation (`lib/checks.mjs`), and MOCs (`lib/mocs.mjs`) follow automatically. `lib/schema.mjs` holds the helpers + `checkSchemaIntegrity()`.
4. **The write gate:** `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md`. Its contract is *validate in memory → 0 errors? write : ask*. `lib/preserve.mjs` exposes `buildFrontmatter(type, fields)`, `buildNoteContent(fm, name)`, `validateCandidate(name, content, type, vaultDir)`, `writeEntityFile(type, name, content, vaultDir)`. `writeEntityFile` **overwrites** the target path — so an entity edit (e.g. advancing a clock) is a re-build + re-validate + re-write.
5. **The decoupling rule (load-bearing, from the user):** gamemaster skills must NEVER `import` from `lib/preserve.mjs` or shell into the guardian. To persist, a skill emits a structured entity candidate and **routes it to the `rpg-preserve` skill** (the model invokes that skill). `${CLAUDE_PLUGIN_ROOT}` inside a gamemaster skill points at the *gamemaster* plugin, so importing guardian code is both wrong and broken. Reads are fine: gamemaster Glob/Reads the vault's typed folders and the loose `campaign-bible-*.md` / `clue-map-*.md`.
6. **Safety (mandatory):** the shipped plugin must contain **zero** private campaign tokens. Examples must be generic or clearly-public (Critical Role's *Vox Machina*). Every reference file carries a "examples are illustrative — never reuse verbatim" note.
7. **Plugin/skill rules:** `name` lowercase-hyphen, never starting with `claude-`; each `SKILL.md` `name` matches its folder; YAML `description` ≤ 1024 chars and **contains no `": "` (colon-space)** — it breaks the parser. Names unique system-wide. `version` semantic. Valid JSON manifests.
8. **Domain vocabulary is Portuguese; code/docs are English.** New entity `type` values and folders are Portuguese (`frente`/`frentes`, `relogio`/`relogios`, `encontro`/`encontros`). Skill prose matches the user's language at runtime; PF2e proper names stay English.

---

## File structure

**Modified (guardian + marketplace):**
- `plugins/rpg-vault-guardian/scripts/schema.mjs` — add 3 entity entries
- `plugins/rpg-vault-guardian/scripts/test/schema.test.mjs` — assert new folder maps + integrity
- `plugins/rpg-vault-guardian/scripts/test/init.test.mjs` — folder count 14 → 17
- `plugins/rpg-vault-guardian/scripts/test/gamemaster-types.test.mjs` — **new** test file: validateCandidate + edit/overwrite coverage for the 3 types
- `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md` — +3 rows in both quick-ref tables
- `plugins/rpg-vault-guardian/README.md` + `commands/rpg-vault-guardian-help.md` — mention new types
- `.claude-plugin/marketplace.json` — add `rpg-gamemaster` entry

**Created (gamemaster plugin):**
```
plugins/rpg-gamemaster/
├─ .claude-plugin/plugin.json
├─ commands/rpg-gamemaster-help.md
├─ README.md
└─ skills/
   ├─ rpg-front-tracker/    SKILL.md + references/{co-creation, fronts-and-clocks, output-template, vault-entity-contract}.md
   ├─ rpg-session-prep/     SKILL.md + references/{co-creation, lazy-dm-eight-steps, output-template, vault-entity-contract}.md
   ├─ rpg-encounter-builder/ SKILL.md + references/{co-creation, pf2e-encounter-math, encounter-as-situation, output-template, vault-entity-contract}.md
   └─ rpg-gm-run-sheet/     SKILL.md + references/{co-creation, output-template, vault-entity-contract}.md
```
`vault-entity-contract.md` is duplicated into each *writing* skill (session-prep, front-tracker, encounter-builder) per the kit's self-contained-skill convention; run-sheet doesn't write, so it omits it.

---

# PHASE 1 — Core campaign loop

## Task 1: Extend the vault schema with `frente`, `relogio`, `encontro`

**Files:**
- Modify: `plugins/rpg-vault-guardian/scripts/schema.mjs`
- Modify: `plugins/rpg-vault-guardian/scripts/test/schema.test.mjs`
- Modify: `plugins/rpg-vault-guardian/scripts/test/init.test.mjs`

- [ ] **Step 1: Write the failing assertions in `schema.test.mjs`**

Add this test after the existing `'maps type <-> folder'` test:

```js
test('gamemaster types map to folders and keep the registry valid', () => {
  assert.equal(folderForType('frente'), 'frentes');
  assert.equal(folderForType('relogio'), 'relogios');
  assert.equal(folderForType('encontro'), 'encontros');
  assert.equal(requiredFields('relogio').includes('segments'), true);
  assert.equal(relationsFor('frente').clocks.target, 'relogio');
  assert.equal(relationsFor('encontro').creatures.target, 'inimigo');
  assert.deepEqual(checkSchemaIntegrity(), []); // targets known, enums have values
});
```

- [ ] **Step 2: Update the folder-count assertion in `init.test.mjs`**

In `init.test.mjs`, change the count in the `'foldersFromSchema covers all schema types'` test from 14 to 17:

```js
  assert.strictEqual(folders.length, 17, `expected 17 folders, found ${folders.length}`);
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `cd plugins/rpg-vault-guardian && node --test scripts/test/schema.test.mjs scripts/test/init.test.mjs`
Expected: FAIL — `folderForType('frente')` returns `null`; folder count is 14, not 17.

- [ ] **Step 4: Add the three entity entries to `schema.mjs`**

In `plugins/rpg-vault-guardian/scripts/schema.mjs`, inside `ENTITIES`, immediately after the `lore: { ... }` entry, add:

```js
  frente: { folder: 'frentes', required: ['type'],
    fields: { status: { type: 'enum', values: ['active', 'dormant', 'resolved'] } },
    relations: { faction: { target: 'faccao' }, antagonist: { target: 'npc' },
      clocks: { target: 'relogio', many: true, curated: true }, act: { target: 'ato' } } },
  relogio: { folder: 'relogios', required: ['type', 'segments'],
    fields: { segments: { type: 'number', required: true },
      filled: { type: 'number' },
      status: { type: 'enum', values: ['ticking', 'filled', 'paused'] } },
    relations: { front: { target: 'frente' }, faction: { target: 'faccao' },
      quest: { target: 'quest' } } },
  encontro: { folder: 'encontros', required: ['type'],
    fields: { threat: { type: 'enum', values: ['trivial', 'low', 'moderate', 'severe', 'extreme'] },
      party_level: { type: 'number' }, party_size: { type: 'number' } },
    relations: { creatures: { target: 'inimigo', many: true }, location: { target: 'local' },
      session: { target: 'sessao' }, treasure: { target: 'item', many: true }, act: { target: 'ato' } } },
```

- [ ] **Step 5: Run the full guardian test suite to verify green**

Run: `cd plugins/rpg-vault-guardian && npm test`
Expected: PASS — all existing tests plus the new assertions. `checkSchemaIntegrity()` returns `[]`; `init` now reports 17 folders.

- [ ] **Step 6: Commit**

```bash
git add plugins/rpg-vault-guardian/scripts/schema.mjs plugins/rpg-vault-guardian/scripts/test/schema.test.mjs plugins/rpg-vault-guardian/scripts/test/init.test.mjs
git commit -m "feat(guardian): add frente, relogio, encontro entity types"
```

## Task 2: Prove the write gate handles the new types (and edits)

**Files:**
- Create: `plugins/rpg-vault-guardian/scripts/test/gamemaster-types.test.mjs`

This validates the new types through the *exact path gamemaster uses* (`validateCandidate`) against the existing fixture vault — adding **no fixture files**, so global-count tests are untouched. It also proves the overwrite/edit path that clock-advance depends on.

- [ ] **Step 1: Write the new test file**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { rm, readFile } from 'node:fs/promises';
import {
  buildFrontmatter, buildNoteContent, validateCandidate, writeEntityFile,
} from '../lib/preserve.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('valid relogio candidate passes the write gate', async () => {
  const fm = buildFrontmatter('relogio', { segments: 6, filled: 2, status: 'ticking' });
  const content = buildNoteContent(fm, 'Ritual do Inverno');
  const report = await validateCandidate('Ritual do Inverno', content, 'relogio', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('relogio without segments is rejected (required field)', async () => {
  const fm = buildFrontmatter('relogio', { status: 'ticking' });
  const content = buildNoteContent(fm, 'Sem Segmentos');
  const report = await validateCandidate('Sem Segmentos', content, 'relogio', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'missing-required' && i.field === 'segments'));
});

test('frente with a faccao relation to an existing faction is coherent', async () => {
  // "Culto do Inverno" is an existing faccao fixture
  const fm = buildFrontmatter('frente', { status: 'active', faction: '[[Culto do Inverno]]' });
  const content = buildNoteContent(fm, 'Maquinacao do Culto');
  const report = await validateCandidate('Maquinacao do Culto', content, 'frente', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('frente pointing its faction relation at a non-faccao is incoherent', async () => {
  // "Lich" is an inimigo, not a faccao -> wrong-target coherence error
  const fm = buildFrontmatter('frente', { status: 'active', faction: '[[Lich]]' });
  const content = buildNoteContent(fm, 'Frente Errada');
  const report = await validateCandidate('Frente Errada', content, 'frente', VAULT);
  assert.ok(report.summary.errors > 0);
});

test('encontro with a bad threat enum is rejected', async () => {
  const fm = buildFrontmatter('encontro', { threat: 'apocalyptic', party_level: 3 });
  const content = buildNoteContent(fm, 'Ameaca Invalida');
  const report = await validateCandidate('Ameaca Invalida', content, 'encontro', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'bad-enum'));
});

test('advancing a clock overwrites the relogio note (edit path)', async () => {
  const tmpVault = join(tmpdir(), 'rpg-gm-clock-' + Date.now());
  try {
    const c1 = buildNoteContent(buildFrontmatter('relogio', { segments: 6, filled: 2 }), 'Doom');
    const p = await writeEntityFile('relogio', 'Doom', c1, tmpVault);
    const c2 = buildNoteContent(buildFrontmatter('relogio', { segments: 6, filled: 3 }), 'Doom');
    await writeEntityFile('relogio', 'Doom', c2, tmpVault);
    const written = await readFile(p, 'utf8');
    assert.match(written, /filled: 3/);
  } finally {
    await rm(tmpVault, { recursive: true });
  }
});
```

- [ ] **Step 2: Run it to verify it passes**

Run: `cd plugins/rpg-vault-guardian && node --test scripts/test/gamemaster-types.test.mjs`
Expected: PASS (6 tests). If the coherence error-code assertion fails, inspect `report.issues` and align the code string with `lib/checks.mjs` (`checkCoherence`) — adjust the assertion to the actual code, do not weaken it to `errors > 0` unless the code is genuinely unstable.

- [ ] **Step 3: Run the full suite**

Run: `cd plugins/rpg-vault-guardian && npm test`
Expected: PASS — everything green.

- [ ] **Step 4: Commit**

```bash
git add plugins/rpg-vault-guardian/scripts/test/gamemaster-types.test.mjs
git commit -m "test(guardian): cover frente/relogio/encontro via the write gate"
```

## Task 3: Update the `rpg-preserve` quick-reference tables

**Files:**
- Modify: `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md`

- [ ] **Step 1: Add rows to the folder map table**

In the "Determine target folder and path" table, add after the `lore | lore/` row:

```markdown
| frente | frentes/ |
| relogio | relogios/ |
| encontro | encontros/ |
```

- [ ] **Step 2: Add rows to the "Required fields per type" table**

After the `lore | type` row, add:

```markdown
| frente | type |
| relogio | type, segments (integer) |
| encontro | type |
```

- [ ] **Step 3: Verify the tables list every entity type**

Run: `cd plugins/rpg-vault-guardian && node -e "import('./scripts/schema.mjs').then(m=>{const t=Object.keys(m.ENTITIES);const md=require('fs').readFileSync('skills/rpg-preserve/SKILL.md','utf8');const miss=t.filter(x=>!md.includes('| '+x+' '));console.log(miss.length?'MISSING: '+miss:'OK - all types documented')})"`
Expected: `OK - all types documented`

- [ ] **Step 4: Commit**

```bash
git add plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md
git commit -m "docs(guardian): document frente/relogio/encontro in rpg-preserve"
```

## Task 4: Mention the new types in the guardian README and help

**Files:**
- Modify: `plugins/rpg-vault-guardian/README.md`
- Modify: `plugins/rpg-vault-guardian/commands/rpg-vault-guardian-help.md`

- [ ] **Step 1: Read both files** to find where the entity types are listed.

Run: `grep -rn "lore\|inimigo\|sessao" plugins/rpg-vault-guardian/README.md plugins/rpg-vault-guardian/commands/rpg-vault-guardian-help.md`

- [ ] **Step 2: Add `frente`, `relogio`, `encontro`** to each enumeration of entity types, with a one-clause gloss (front / progress clock / encounter — the gamemaster layer). Keep the existing prose style.

- [ ] **Step 3: Commit**

```bash
git add plugins/rpg-vault-guardian/README.md plugins/rpg-vault-guardian/commands/rpg-vault-guardian-help.md
git commit -m "docs(guardian): list the three gamemaster entity types"
```

## Task 5: Scaffold the installable gamemaster plugin

**Files:**
- Create: `plugins/rpg-gamemaster/.claude-plugin/plugin.json`
- Modify: `.claude-plugin/marketplace.json`

- [ ] **Step 1: Write `plugin.json`**

```json
{
  "name": "rpg-gamemaster",
  "description": "Session prep and run layer for dark-leaning Pathfinder 2e campaigns — turns built worlds into runnable sessions, advances the world between sessions with fronts and progress clocks, builds balanced PF2e encounters, and produces a tool-agnostic GM run sheet. Reads the campaign vault and clue map; persists sessions, fronts, clocks, and encounters through the rpg-preserve write gate.",
  "version": "0.1.0",
  "author": { "name": "Vagner Strapasson", "email": "vagnerstrapasson@gmail.com" },
  "license": "MIT",
  "keywords": ["rpg", "ttrpg", "pathfinder", "pf2e", "gm-tools", "session-prep", "encounters", "fronts"]
}
```

- [ ] **Step 2: Add the marketplace entry**

In `.claude-plugin/marketplace.json`, add to the `plugins` array after the `rpg-loremaster` object:

```json
    {
      "name": "rpg-gamemaster",
      "description": "Session prep and run layer for PF2e campaigns — runnable sessions, fronts and clocks, balanced encounters, and a GM run sheet.",
      "version": "0.1.0",
      "source": "./plugins/rpg-gamemaster",
      "category": "creativity"
    }
```

- [ ] **Step 3: Validate both JSON files**

Run: `node -e "JSON.parse(require('fs').readFileSync('plugins/rpg-gamemaster/.claude-plugin/plugin.json'));JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json'));console.log('valid JSON')"`
Expected: `valid JSON`

- [ ] **Step 4: Commit**

```bash
git add plugins/rpg-gamemaster/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git commit -m "feat(gamemaster): scaffold plugin manifest and marketplace entry"
```

## Task 6: Author `rpg-front-tracker` (the living-world engine)

**Files:**
- Create: `plugins/rpg-gamemaster/skills/rpg-front-tracker/SKILL.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-front-tracker/references/co-creation.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-front-tracker/references/fronts-and-clocks.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-front-tracker/references/output-template.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-front-tracker/references/vault-entity-contract.md`

Pattern source to copy and adapt: `plugins/rpg-loremaster/skills/rpg-clue-mapper/`. See spec §4.2.

- [ ] **Step 1: Write `SKILL.md` frontmatter exactly**

```yaml
---
name: rpg-front-tracker
description: Maintains the living world of a Pathfinder 2e campaign between sessions using Dungeon World fronts and Blades-style progress clocks. Bootstraps a front from a faction's plan-in-motion (its grim portents and impending doom), tracks each danger as a progress clock, and advances those clocks based on what happened last session — producing the world's next move that the session-prep skill turns into a strong start. Reads the faction dossiers, the campaign bible, and the last session from the vault; persists fronts and clocks through the rpg-preserve write gate, never writing files directly. Use whenever the user wants to track a faction clock, advance the doom, ask what the villains did since last session, set up a front, or run grim portents. Phrasings like avancar o clock, o que o vilao fez, montar uma frente, rastrear a ameaca, advance the front, tick the clock. Tone inherited from the campaign, default dark-leaning.
---
```

Verify the description: ≤1024 chars and **no `": "`** (the example above uses em-dashes and commas only).

- [ ] **Step 2: Write the `SKILL.md` body** with these sections (adapt clue-mapper's structure and prose density):
  - **What this skill is for** — the between-session engine; loremaster *authors* a faction plan, this skill *runs* it as live vault state.
  - **The core idea — it tracks information about the world's momentum**, not new fiction. Bedrock: fronts (dangers + impulse + grim portents + impending doom) made into trackable clocks.
  - **When to use / when not** — not for authoring the faction (that's `rpg-faction-creator`); this advances an existing plan.
  - **Inputs (read from the vault + loose files):** the relevant `faccao` note and its plan; the `campaign-bible-*.md` (antagonist's plan-in-motion, tone, names); the most recent `sessao`. Read by exact canonical name.
  - **The workflow:** (1) co-create / confirm which front; (2) bootstrap or load the `frente` + its `relogio`(s) — segments sized 4/6/8 by how daunting; (3) determine advancement from last session (descriptive vs. prescriptive — DW); (4) advance the clock(s); (5) emit "the world's next move" for session-prep; (6) persist via rpg-preserve.
  - **Persistence (CRITICAL):** never import `lib/preserve.mjs`; emit a `frente` / `relogio` candidate and route it to the **rpg-preserve** skill. Advancing = re-emit the same `relogio` name with `filled` incremented (overwrite is intended). See `references/vault-entity-contract.md`.
  - **Read-aloud** is light here (a one-line "the world shifts" beat is optional). Mostly GM-facing.
  - **Off-stage handoffs** — to `rpg-session-prep` (the next move), to loremaster creators if the front needs a node that doesn't exist.
  - **Compact vs. Full.**

- [ ] **Step 3: Write `references/fronts-and-clocks.md`** — the engine: what a front is (dangers, impulse, grim portents, impending doom, stakes questions, cast); campaign vs. adventure fronts; clock sizing (4/6/8) and the "make the clock about the obstacle, not the method" rule; descriptive vs. prescriptive advancement; tying the "if they stall" push to advancing a grim portent (diegetic). Ground in the spec's Sources. Add the "examples illustrative — never reuse verbatim" note.

- [ ] **Step 4: Write `references/co-creation.md`** — copy from `rpg-clue-mapper/references/co-creation.md`; adapt the load-bearing-decisions list to: which front, which faction's plan, how aggressive the advancement.

- [ ] **Step 5: Write `references/output-template.md`** — the front-sheet skeleton (Compact/Full): front name + impulse + impending doom; the danger/clock table (segments, filled, what each segment-tick means); "what the world did since last session"; stakes questions; the persist block (the `frente`/`relogio` candidates).

- [ ] **Step 6: Write `references/vault-entity-contract.md`** — the gamemaster→vault contract this plugin emits (see Task 6a content below; identical copy in each writing skill).

- [ ] **Step 7: Validate the skill file**

Run the frontmatter check (reused across all skills):
```bash
node --input-type=module -e "
import {readFileSync} from 'node:fs';
const f=process.argv[1];
const m=readFileSync(f,'utf8').match(/^---\n([\s\S]*?)\n---/);
const d=(m[1].match(/description:\s*([\s\S]*?)(?:\n[a-z_]+:|$)/)||[])[1].trim();
console.log('len',d.length,'<=1024',d.length<=1024,'no-colon-space',!d.includes(': '));
" plugins/rpg-gamemaster/skills/rpg-front-tracker/SKILL.md
```
Expected: `len <N> <=1024 true no-colon-space true`. Also confirm the `name:` value equals the folder name `rpg-front-tracker`.

- [ ] **Step 8: Commit**

```bash
git add plugins/rpg-gamemaster/skills/rpg-front-tracker
git commit -m "feat(gamemaster): add rpg-front-tracker skill"
```

### Task 6a: the shared `vault-entity-contract.md` content

This exact file is created in `rpg-front-tracker`, `rpg-session-prep`, and `rpg-encounter-builder` (Tasks 6, 7, 11). Content:

- A one-paragraph rule: **gamemaster never writes files; it hands candidates to the `rpg-preserve` skill.** Reads are direct (Glob/Read the vault folders + loose `campaign-bible-*.md` / `clue-map-*.md`).
- A table of the entity types this plugin emits, kept in sync with `schema.mjs` (state the sync obligation):

| type | folder | required | key fields | key relations |
|---|---|---|---|---|
| sessao | sessoes/ | type, date (YYYY-MM-DD) | — | act→ato, quests→quest[], events→evento[] |
| frente | frentes/ | type | status (active/dormant/resolved) | faction→faccao, antagonist→npc, clocks→relogio[], act→ato |
| relogio | relogios/ | type, segments | segments (int), filled (int), status (ticking/filled/paused) | front→frente, faction→faccao, quest→quest |
| encontro | encontros/ | type | threat (trivial/low/moderate/severe/extreme), party_level, party_size | creatures→inimigo[], location→local, session→sessao, treasure→item[] |

- A note: wikilink fields are written `"[[Exact Vault Name]]"`; names MUST match the vault's names registry or `rpg-preserve` will flag a broken link.

## Task 7: Author `rpg-session-prep` (flagship)

**Files:**
- Create: `plugins/rpg-gamemaster/skills/rpg-session-prep/SKILL.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-session-prep/references/co-creation.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-session-prep/references/lazy-dm-eight-steps.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-session-prep/references/output-template.md`
- Create: `plugins/rpg-gamemaster/skills/rpg-session-prep/references/vault-entity-contract.md`

Pattern source: `rpg-clue-mapper/`. See spec §4.1.

- [ ] **Step 1: Write `SKILL.md` frontmatter exactly**

```yaml
---
name: rpg-session-prep
description: Turns a built Pathfinder 2e campaign into a one-page runnable session using the Return of the Lazy Dungeon Master eight steps, weighted on secrets and clues as the spine. Builds a strong start from what the world did since last session (the active fronts and clocks), outlines three to five likely scenes, pulls the secrets and clues to potentially reveal this session from the clue map (carrying forward the ones still unrevealed), names the NPCs and threats in play from existing vault entities, and sets the rewards. Prep the situation, not a script — it is a launchpad you abandon when the table diverges. Reads the campaign bible, clue map, vault entities, and active fronts; persists the planned session through the rpg-preserve write gate. Use for preparing a session, planning the next game, what should happen next session, montar a sessao, preparar o jogo, qual o gancho. Tone inherited from the campaign, default dark-leaning.
---
```

Verify ≤1024 chars and no `": "`.

- [ ] **Step 2: Write the `SKILL.md` body** with these sections:
  - **What this skill is for** — the one-pager; arranges what exists, does not invent world content.
  - **The core idea** — prep situations not plots; "prepare to improvise"; **Secrets & Clues is the spine** (Shea's keep-only-one step), wired to the clue map's revelation IDs and carry-forward of *unrevealed* secrets.
  - **When to use / when not** (not world-building — hand off missing nodes to loremaster creators).
  - **Inputs (read):** `campaign-bible-*.md`; `clue-map-*.md` (revelations + which are still unrevealed); vault `npc`/`local`/`quest`/`ato` by exact name; **active `frente`/`relogio`** (feeds the strong start).
  - **The eight steps, weighted** — see `references/lazy-dm-eight-steps.md`; treat as modular, lead with secrets/clues; the strong start derives from the advanced world-state.
  - **Read-aloud** — the strong-start scene (short, sensory, never narrates the PCs).
  - **Persistence** — emit a `sessao` candidate (the one-pager in the note body; `date` = planned date) and route to **rpg-preserve**. Missing nodes → loremaster handoffs. Never import preserve code.
  - **Compact (one-pager) vs. Full (expanded).**

- [ ] **Step 3: Write `references/lazy-dm-eight-steps.md`** — the eight steps (review characters · strong start · potential scenes · **secrets & clues** · fantastic locations · important NPCs · relevant monsters/threats · rewards), the "secrets is the spine / keep-only-one" and "prep = prepare to improvise" philosophy, the modular "skip/reorder" guidance, and the wiring of step 4 to the clue map + step 2 (strong start) to the fronts. Ground in the spec's Sources. Add the illustrative-examples note.

- [ ] **Step 4: Write `references/co-creation.md`** — copy from clue-mapper; adapt load-bearing decisions to: what the players are likely to do next, which thread this session advances, which revelations are live.

- [ ] **Step 5: Write `references/output-template.md`** — the one-pager skeleton (Compact/Full): strong start (from world-state) · 3–5 scenes · secrets & clues checklist (keyed to revelation IDs) · NPCs/threats in play (by name) · rewards · "if they stall" backstops (advance a clock) · the `sessao` persist block.

- [ ] **Step 6: Write `references/vault-entity-contract.md`** — identical to Task 6a.

- [ ] **Step 7: Validate** — run the frontmatter check from Task 6 Step 7 against this `SKILL.md`; confirm `name` = `rpg-session-prep`.

- [ ] **Step 8: Commit**

```bash
git add plugins/rpg-gamemaster/skills/rpg-session-prep
git commit -m "feat(gamemaster): add rpg-session-prep skill"
```

## Task 8: Phase 1 verification (installable core loop)

**Files:** none (validation only)

- [ ] **Step 1: Safety grep — no private campaign tokens**

Run: `grep -rinE "malareph|dissolv|arquivo vivo|memnorath|corredor frio|a travessia" plugins/rpg-gamemaster && echo "FAIL — private content leaked" || echo "OK — clean"`
Expected: `OK — clean`

- [ ] **Step 2: Skill discovery rules** — confirm both skills' `name` matches their folder and descriptions pass the frontmatter check (Task 6 Step 7) for both `rpg-front-tracker` and `rpg-session-prep`.

- [ ] **Step 3: Guardian tests still green**

Run: `cd plugins/rpg-vault-guardian && npm test`
Expected: PASS.

- [ ] **Step 4: Manual install smoke test** (tell the user to run these — they need a Claude session):

```
/plugin marketplace add ~/projects/rpg-marketplace
/plugin install rpg-gamemaster@rpg-marketplace
/reload-plugins
/skills
```
Expected: `rpg-front-tracker` and `rpg-session-prep` appear.

- [ ] **Step 5: Manual end-to-end** — in a vault that has a `faccao` with a plan: invoke front-tracker ("advance the cult's clock"), confirm it routes a `frente`/`relogio` candidate to `rpg-preserve` and the note is written; then invoke session-prep and confirm its strong start references the advanced clock. Fix any wiring issues and re-commit.

---

# PHASE 2 — Encounters

## Task 9: Verified PF2e encounter-math reference

**Files:**
- Create: `plugins/rpg-gamemaster/skills/rpg-encounter-builder/references/pf2e-encounter-math.md`

- [ ] **Step 1: Verify the exact current numbers from Archives of Nethys** (errata-sensitive — do not trust memory):
  - XP Budget per threat (trivial/low/moderate/severe/extreme) — https://2e.aonprd.com/Rules.aspx?ID=498
  - Per-creature XP by level relative to party (party level = 40 XP) — same page
  - Party-size adjustment (per character above/below 4)
  - Complex hazard XP (= creature 4 levels higher)
  - Treasure by Encounter — https://2e.aonprd.com/Rules.aspx?ID=1944

  Cross-check against a second source (e.g. Pathfinder 2e Nexus) before writing.

- [ ] **Step 2: Write the reference** — the verified tables, the "always show the arithmetic and state the assumed party level/size" honesty rule, and the AoN linking rule (**category pages only** in the shipped skill — `/Monsters.aspx`, never `?ID=`; the `?ID=` links above are for build-time verification only). Add the illustrative-examples note.

- [ ] **Step 3: Sanity-check a worked example** — e.g. a level-3 party of 4, Moderate threat: confirm the budget and a creature line-up sum to budget with the arithmetic shown. Confirm no `?ID=` links remain in the file.

Run: `grep -n "ID=" plugins/rpg-gamemaster/skills/rpg-encounter-builder/references/pf2e-encounter-math.md && echo "FAIL — deep links present" || echo "OK — category links only"`
Expected: `OK — category links only`

- [ ] **Step 4: Commit**

```bash
git add plugins/rpg-gamemaster/skills/rpg-encounter-builder/references/pf2e-encounter-math.md
git commit -m "feat(gamemaster): add verified PF2e encounter-math reference"
```

## Task 10: Author `rpg-encounter-builder`

**Files:**
- Create: `plugins/rpg-gamemaster/skills/rpg-encounter-builder/SKILL.md`
- Create: `.../references/co-creation.md`
- Create: `.../references/encounter-as-situation.md`
- Create: `.../references/output-template.md`
- Create: `.../references/vault-entity-contract.md`
(`pf2e-encounter-math.md` already created in Task 9.)

See spec §4.3.

- [ ] **Step 1: Write `SKILL.md` frontmatter exactly**

```yaml
---
name: rpg-encounter-builder
description: Builds balanced Pathfinder 2e encounters from the GM Core math — the mechanical layer the worldbuilding skills deliberately skip. Given party level and size plus a scene or threat brief, it picks a threat tier, assembles creatures referenced to Archives of Nethys category pages (never the Foundry compendium), shows the XP-budget arithmetic against the total, and suggests hazards and treasure by level. It wraps every fight as a situation — objective, terrain feature, the reason for the fight, and how it escalates or ends — so the encounter points to play, not just a balanced bag of monsters. Persists the encounter through the rpg-preserve write gate as an encontro entity. Use for building an encounter, balancing a fight, montar um combate, balancear o encontro, quantos inimigos, what monsters for my party. Tone inherited from the campaign, default dark-leaning.
---
```

Verify ≤1024 chars and no `": "`.

- [ ] **Step 2: Write the `SKILL.md` body** with sections:
  - **What this skill is for** — the math layer, wrapped as situation. No VTT, no Foundry, AoN only.
  - **Inputs (read):** party level/size; the scene/threat brief; existing `inimigo` statblocks from the vault; `references/pf2e-encounter-math.md`.
  - **The workflow:** choose threat tier → pick creatures (AoN category refs) with level/role → **show the budget arithmetic** and state party assumptions → add hazards → treasure by level → write the **encounter-as-situation** (objective/terrain/why/escalation/escape).
  - **Honest caveat** — the math must be exact; always show it.
  - **Persistence** — emit an `encontro` candidate (creatures→`inimigo`, location→`local`, treasure→`item`, session→`sessao`); new statblocks/items it names are themselves emitted as `inimigo`/`item` candidates; route all to **rpg-preserve**.
  - **Off-stage handoffs**; **Compact vs. Full.**

- [ ] **Step 3: Write `references/encounter-as-situation.md`** — objective beyond "win the fight"; terrain/feature that changes tactics; why this fight exists (tie to a front/clue); escalation and the exit. Illustrative-examples note.

- [ ] **Step 4: Write `references/co-creation.md`** — copy from clue-mapper; load-bearing decisions: party level/size, the desired threat, the fight's purpose.

- [ ] **Step 5: Write `references/output-template.md`** — encounter skeleton: threat tier · creature table (name, AoN category ref, level, role, XP) · **budget arithmetic line** · hazards · treasure by level · the situation block · the `encontro` persist block.

- [ ] **Step 6: Write `references/vault-entity-contract.md`** — identical to Task 6a.

- [ ] **Step 7: Validate** — frontmatter check; `name` = `rpg-encounter-builder`; `grep -n "ID=" .../SKILL.md` returns nothing (category links only).

- [ ] **Step 8: Commit**

```bash
git add plugins/rpg-gamemaster/skills/rpg-encounter-builder
git commit -m "feat(gamemaster): add rpg-encounter-builder skill"
```

## Task 11: Phase 2 verification

- [ ] **Step 1:** Safety grep over `plugins/rpg-gamemaster` (Task 8 Step 1) → `OK — clean`.
- [ ] **Step 2:** Preserve round-trip for an `encontro` candidate (reuse the Task 2 pattern manually, or via the rpg-preserve skill against a fixture vault) → 0 errors.
- [ ] **Step 3:** Confirm a worked encounter shows budget arithmetic and states party level/size.
- [ ] **Step 4:** `/reload-plugins` + `/skills` shows `rpg-encounter-builder`. Commit any fixes.

---

# PHASE 3 — Table overlay + assembly

## Task 12: Author `rpg-gm-run-sheet`

**Files:**
- Create: `plugins/rpg-gamemaster/skills/rpg-gm-run-sheet/SKILL.md`
- Create: `.../references/co-creation.md`
- Create: `.../references/output-template.md`
- Create: `.../references/vault-entity-contract.md`

See spec §4.4. This skill **does not write** — it produces a loose, printable artifact. (It keeps `vault-entity-contract.md` only as a read reference for which entities it pulls from; it emits no candidates.)

- [ ] **Step 1: Write `SKILL.md` frontmatter exactly**

```yaml
---
name: rpg-gm-run-sheet
description: Produces a compact tool-agnostic GM run sheet for during play — the narrative and discovery overlay a VTT does not give you. It stitches the session-prep one-pager, the clue map, and the active fronts and clocks into a single page the GM glances at mid-session — the strong start, the scene beats, a secrets-and-clues checklist keyed to revelation IDs to tick as they surface, NPC quick-refs with a voice line and a want, the clocks to advance, and the if-they-stall backstops that push a grim portent. No initiative, dice, or tokens — the table or VTT owns runtime mechanics. Printable markdown usable next to any VTT or at a physical table. Use for a run sheet, a play aid, a cheat sheet for the session, rodar a sessao, folha de mesa, o que acompanhar durante o jogo. Tone inherited from the campaign, default dark-leaning.
---
```

Verify ≤1024 chars and no `": "`.

- [ ] **Step 2: Write the `SKILL.md` body** with sections: what it is (the read-out, narrative/discovery only); inputs (the session-prep one-pager, `clue-map-*.md`, active `frente`/`relogio`); the run-sheet contents (strong start · scene beats · secrets/clues checklist keyed to revelation IDs · NPC quick-refs name+voice+want · clocks to advance · stall backstops tied to a grim portent); output is a loose `run-sheet-<slug>.md`, no persistence; Compact vs. Full.

- [ ] **Step 3: Write `references/co-creation.md`** (light — copy from clue-mapper) and `references/output-template.md` (the run-sheet skeleton) and `references/vault-entity-contract.md` (Task 6a copy, read-only note).

- [ ] **Step 4: Validate** — frontmatter check; `name` = `rpg-gm-run-sheet`.

- [ ] **Step 5: Commit**

```bash
git add plugins/rpg-gamemaster/skills/rpg-gm-run-sheet
git commit -m "feat(gamemaster): add rpg-gm-run-sheet skill"
```

## Task 13: The help command

**Files:**
- Create: `plugins/rpg-gamemaster/commands/rpg-gamemaster-help.md`

Pattern source: `plugins/rpg-loremaster/commands/rpg-loremaster-help.md` (copy its shape — frontmatter `description`, a conversational guide, a "what you can do" table, workflows, "good to know").

- [ ] **Step 1: Write the command** — frontmatter `description` (≤1024, no `": "`) summarizing the plugin; body covering the four skills (when to invoke each, in the user's natural language), the install steps, the vault/preserve integration note, and the AoN-category-only + dark-leaning conventions. State that the only slash command is `/rpg-gamemaster-help`; the four creators are skills invoked by natural language.

- [ ] **Step 2: Validate** the frontmatter description (Task 6 Step 7 check).

- [ ] **Step 3: Commit**

```bash
git add plugins/rpg-gamemaster/commands/rpg-gamemaster-help.md
git commit -m "docs(gamemaster): add /rpg-gamemaster-help command"
```

## Task 14: The plugin README

**Files:**
- Create: `plugins/rpg-gamemaster/README.md`

Pattern source: `plugins/rpg-loremaster/README.md`.

- [ ] **Step 1: Write the README** — what the plugin is (the prep/run layer); the ports-and-adapters stance (no Foundry/MCP/VTT; AoN only); the four skills; how it integrates via the vault + `rpg-preserve` (and that the guardian plugin must be installed for persistence); the three new entity types; install/reload steps; the dark-leaning default and language matching.

- [ ] **Step 2: Safety grep** over the README (Task 8 Step 1) → `OK — clean`.

- [ ] **Step 3: Commit**

```bash
git add plugins/rpg-gamemaster/README.md
git commit -m "docs(gamemaster): add plugin README"
```

## Task 15: Final assembly verification

**Files:** none (validation only)

- [ ] **Step 1: Full private-token grep** over the entire plugin:

Run: `grep -rinE "malareph|dissolv|arquivo vivo|memnorath|corredor frio|a travessia" plugins/rpg-gamemaster && echo "FAIL" || echo "OK — clean"`
Expected: `OK — clean`

- [ ] **Step 2: Every skill + the help command validates** — run the frontmatter check across all four `SKILL.md` and the command; each `name` matches its folder; no `?ID=` AoN links anywhere:

Run: `grep -rn "aonprd.com/.*ID=" plugins/rpg-gamemaster && echo "FAIL — deep links" || echo "OK — category links only"`
Expected: `OK — category links only`

- [ ] **Step 3: Manifests valid** — `node -e "JSON.parse(require('fs').readFileSync('plugins/rpg-gamemaster/.claude-plugin/plugin.json'));JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json'));console.log('valid')"` → `valid`.

- [ ] **Step 4: Guardian suite green** — `cd plugins/rpg-vault-guardian && npm test` → PASS.

- [ ] **Step 5: Full install smoke test** (user runs): `/plugin install` + `/reload-plugins` + `/skills` lists all four `rpg-*` skills; `/rpg-gamemaster-help` runs.

- [ ] **Step 6: Full end-to-end** (user, in a campaign vault): front-tracker advances a clock → session-prep builds a one-pager whose strong start reflects it → encounter-builder builds a fight for a scene (arithmetic shown, persisted as `encontro`) → run-sheet stitches it into a play aid with the clocks and the secrets checklist. Confirm every persisted entity went through `rpg-preserve`.

- [ ] **Step 7: Final commit** (if any fixes were made during verification).

---

## Self-review (completed during planning)

- **Spec coverage:** all four skills (§4.1–4.4) → Tasks 6,7,10,12; schema extension (§"Schema extension") → Tasks 1–4; decoupling/contract (§"I/O") → Task 6a + each skill's persistence section; assembly (§"Plugin assembly") → Tasks 5,13,14,15; phasing (§"Phasing") → phase headers; testing strategy (§"Testing") → Tasks 1,2,8,11,15.
- **Resolved open questions from the spec:** preserve handles edits (`writeEntityFile` overwrites — Task 2 Step 1 edit test); `init.test.mjs` count 14→17 (Task 1 Step 2); new-type tests avoid fixtures to protect global-count tests (Task 2).
- **Type/name consistency:** entity types `frente`/`relogio`/`encontro` and folders `frentes`/`relogios`/`encontros` are used identically in schema, contract, tests, and preserve tables; skill `name`s match their folders throughout.
- **Known residual risk:** `vault-entity-contract.md` duplicates a schema subset across three skills — the file states the sync obligation; if `schema.mjs` changes, update all copies.
