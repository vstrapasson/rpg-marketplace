# RPG Gamemaster — Plugin Design

**Date:** 2026-05-30
**Status:** Draft
**Target repo:** `~/projects/rpg-marketplace`

---

## Context

The marketplace ships two plugins today: `rpg-loremaster` (a pure prompt-engineering kit that *builds* dark-leaning PF2e campaign content) and `rpg-vault-guardian` (real Node code that *persists and validates* an Obsidian vault). There is a gap between "the world is built" and "I'm at the table": nothing turns the built world into a **runnable session**, builds **balanced PF2e encounters**, or keeps the campaign **alive between sessions**.

`rpg-gamemaster` fills that gap — the **session prep & run layer**. It is the third *core* (tool-agnostic) plugin in a ports-and-adapters ecosystem: `rpg-loremaster` (create) + `rpg-gamemaster` (prep/run) reason about the game in plain Markdown; `rpg-vault-guardian` is the persistence *adapter*. The core never imports an adapter. No Foundry, no MCP, no VTT — creature/spell data comes from the Archives of Nethys (AoN) + PF2e rules, never the Foundry compendium.

### Why this design departs from the original handbook

The build was scoped from `local/GAMEMASTER-BUILD-HANDBOOK.md`, but the user asked for the handbook's **methodology to be critiqued**, not accepted on faith. Web research into how respected GMs and designers prep (Sly Flourish's *Return of the Lazy Dungeon Master*, The Alexandrian's "Don't Prep Plots", Dungeon World *Fronts*, Blades in the Dark *progress clocks*, Matt Colville, the Angry GM) produced this verdict:

- **The handbook bet on the right schools.** "Lazy DM 8 steps" + "prep situations, not plots" *is* the modern consensus for **session** prep. Validated, kept.
- **One structural gap.** The handbook's three skills are all *single-session* (a one-pager, one encounter, one run-sheet). What makes a *campaign* (the user's actual question) feel alive is **the world acting on its own between sessions** — best modeled by Dungeon World **Fronts** (dangers + impulse + grim portents + impending doom) plus **progress clocks**. The kit already speaks this language (campaign-foundation's "escalating signs", faction-creator's "plan in motion / grim portents / progress clock toward an impending doom", the run-sheet's "advance the clocks") but **nothing operationalizes or persists it**. The loremaster *authors* the plan as static text; nothing *advances* it as live world-state.
- **Two weightings to fix.** (1) *Secrets & Clues* is the spine of session prep, not one item of eight — Mike Shea himself says it is the single step to keep if you keep only one; it must wire to the existing clue map's revelation IDs and carry forward *unrevealed* secrets from last session. (2) An encounter is a **situation** (objective, terrain, the "why", escalation), not a bare XP bag — keep the exact PF2e math but wrap it in play.

The correction is a **fourth skill** (`rpg-front-tracker`) that maintains world-state between sessions, persisted as **new vault entity types** (`frente`, `relogio`), plus an `encontro` type for encounters. This is the strongest justification for the user's "extend the schema" decision: the vault becomes the persistent, queryable state of the world's plans.

### The load-bearing constraint (user-stated)

> Communication between plugins happens **via the Obsidian vault/schema**, never plugin-to-plugin code calls. **Writes go through `/rpg-preserve`.**

This shapes every I/O decision below: `rpg-gamemaster` reads vault entities + loose loremaster artifacts, and persists its output exclusively by handing entity candidates to the `rpg-preserve` skill (the guardian adapter). It imports no adapter code.

---

## Design decisions

| # | Decision | Choice |
|---|---------|---------|
| 1 | Input source (read side) | **Mixed**: canonical entities (npc, local, faccao, quest, inimigo, ato) from the **vault**; campaign bible + clue map (revelation IDs R1/R2…) from **loose files**. |
| 2 | Output persistence (write side) | **Extend the guardian schema** with new entity types; write **only** via the `rpg-preserve` skill. |
| 3 | Methodology gap | **Add a 4th skill** `rpg-front-tracker` + new `frente`/`relogio` entities (the between-session "living world" engine). Re-center prep on secrets/clues; encounter-as-situation; "prep = prepare to improvise". |
| 4 | Build scope | **One spec for the whole plugin; phased implementation** (Phase 1 core loop → Phase 2 encounters → Phase 3 run-sheet + assembly). |
| 5 | Decoupling mechanism | Core reads vault + loose files; **never imports** loremaster/guardian code. Writes via the `rpg-preserve` *skill* handoff (not `lib/preserve.mjs` directly). |
| 6 | Conductor integration | **Do not edit** the loremaster conductor (keeps plugins independently installable). At most an *optional additive note*; not a dependency. |
| 7 | New entity type names | Portuguese, per vault convention: `frente`, `relogio`, `encontro`. "Progress clock" stays English in prose. |
| 8 | Encounter math | Curated, **build-time-verified** tables in a reference file; always show the arithmetic + state party assumptions; AoN **category-level** links only. |

---

## What it is — and is not

**Is:** the bridge from built content to a runnable session. It *arranges* what exists (dossiers, the bible, the clue map, vault entities) into session prep, balanced encounters, an advancing world, and a GM-facing run overlay.

**Is not:** a world builder (loremaster), a persistence engine (guardian), a VTT runtime, or a creature database. It does not generate regions/cities/NPCs from scratch — if a needed node doesn't exist, it emits a handoff to the relevant loremaster skill. No Foundry/MCP/VTT anywhere.

---

## Architecture — ports & adapters, communication via the vault

```
  LOREMASTER (author)          VAULT = shared contract                GAMEMASTER (runtime)
  ───────────────────          ──────────────────────────────         ────────────────────
  campaign-foundation ───────▶ campaign-bible (loose) ──read────────▶ session-prep
  faction-creator (plan) ────▶ faccao + frente/relogio (ENTITY) ◀──advance── front-tracker
  clue-mapper ───────────────▶ clue-map (loose, IDs R1/R2) ─read────▶ session-prep + run-sheet
  region/city/loc/npc ───────▶ regiao/local/npc/faccao (ENTITY) ─read─▶ all skills
                               sessao/evento/encontro/item (ENTITY) ◀─write via /rpg-preserve─ prep + encounter
                               run-sheet (loose / printable) ◀──────────────────────────────── gm-run-sheet
```

**Decoupling rules (enforced in every SKILL.md):**

1. **Read** — gamemaster reads *vault entities* (Glob/Read of the typed folders) and *loose files* (bible, clue map). It imports no loremaster/guardian code.
2. **Write** — gamemaster **never** calls `lib/preserve.mjs` directly (its own `${CLAUDE_PLUGIN_ROOT}` points at the gamemaster plugin, and importing the guardian would couple core→adapter). It produces a structured **entity candidate** and routes it to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate. This *is* the user's "write via /rpg-preserve".
3. **Contract, not implementation** — gamemaster knows the *contract* (type names + required fields, documented in its own `references/vault-entity-contract.md`), never the adapter's code. Maintenance cost: that reference file must be kept in sync if `schema.mjs` changes — called out as a known risk below.

---

## The four skills

All four inherit the kit's shared DNA (copy the shape from `rpg-clue-mapper`, the closest pattern — tone inherited, **no** `tone-spectrum.md`): a co-creation front-end (`references/co-creation.md`), read-aloud beats where they help the table, tone inherited from the campaign (default dark-leaning level 3), match the user's language, AoN category-level links, structured off-stage handoffs, and a Compact/Full density option. Examples must be generic or clearly-public (Vox Machina); never the user's campaign.

### 4.1 `rpg-session-prep` (flagship)

- **Bedrock:** a session is *prepared, not scripted* — prep the situation and a few high-impact elements ("prep situations, not plots"; "prepare to improvise"). The spine is **Secrets & Clues**, wired to the clue map.
- **Framework:** the Lazy DM 8 steps (strong start · potential scenes · **secrets & clues** · fantastic locations · important NPCs · relevant monsters/threats · rewards · review the characters), treated as **modular**, weighted toward secrets/clues — not a uniform checklist.
- **Reads:** the campaign bible (truth/tone/names); the clue map's revelations, pulling the **unrevealed** ones forward; vault entities (`npc`, `local`, `quest`, `ato`) by exact canonical name; **active `frente`/`relogio` state** (what the world did since last session → feeds the *strong start*).
- **Writes (via preserve):** a `sessao` entity (the planned session; the one-pager lives in the note body). Does **not** invent world content — missing nodes become loremaster handoffs.
- **Output:** a one-page session plan (Compact) or expanded (Full): strong start (derived from the advanced world-state), 3–5 likely scenes, the secrets/clues to potentially reveal *this session*, NPCs/threats in play (by name), rewards, and the "if they stall" backstops (which advance a clock / push a grim portent — diegetic, per the Alexandrian).
- **References:** `co-creation.md`, `lazy-dm-eight-steps.md` (the framework + the "secrets is the spine / prepare to improvise" philosophy), `output-template.md`, `vault-entity-contract.md`.

### 4.2 `rpg-front-tracker` (NEW — the living-world engine)

- **Bedrock:** the world acting between sessions — Dungeon World **Fronts** (dangers + impulse + grim portents + impending doom) made into trackable, persistent **progress clocks**.
- **Distinct from loremaster:** loremaster *authors* a faction's plan as prose; this skill *bootstraps* a `frente` + `relogio`(s) from that plan and *advances* them as live vault state, session to session.
- **Reads:** the relevant `faccao` (its plan/grim portents), the campaign bible (the antagonist's plan-in-motion), and the last `sessao` (what changed).
- **Writes (via preserve):** `frente` (the front: impulse, impending doom, status) and `relogio` (progress clocks: segments + filled). Advancing a clock = re-writing the `relogio` with an incremented `filled` (through preserve, so it re-validates).
- **Output:** a front sheet — dangers, grim portents as clock segments, impending doom, stakes questions, and the "what the world did since last session" beat that `session-prep` consumes for its strong start.
- **References:** `co-creation.md`, `fronts-and-clocks.md` (the Fronts method + clock sizing 4/6/8 + "make the clock about the obstacle, not the method"), `output-template.md`, `vault-entity-contract.md`.

### 4.3 `rpg-encounter-builder`

- **Bedrock:** the mechanical layer loremaster deliberately skips — turn a fight into balanced PF2e numbers, **wrapped as a situation**.
- **Grounding (verify at build time):** PF2e GM Core encounter building — XP budget by threat (trivial/low/moderate/severe/extreme), per-creature XP by level relative to the party (party-level creature = 40 XP), party-size adjustment, complex-hazard XP (= creature +4 levels), and **treasure by level**. **Verify exact current numbers from AoN before hardcoding**; they are errata-sensitive.
- **Reads:** party level/size + a scene/threat brief; vault `inimigo` (existing statblocks); the curated math reference.
- **Writes (via preserve):** an `encontro` entity (threat tier, party level/size, creature refs → `inimigo`, location → `local`, treasure → `item`, session → `sessao`). New statblocks/items it names are themselves written as `inimigo`/`item` via preserve.
- **Output:** the threat tier chosen, creatures (AoN category refs, never `?ID=`, never Foundry) with level/role/XP, **total vs. budget arithmetic shown**, the assumed party level/size stated, suggested hazards, treasure by level, **plus the encounter-as-situation** (objective, terrain feature, why the fight, escalation/escape).
- **References:** `co-creation.md`, `pf2e-encounter-math.md` (the verified tables + the honesty rules), `encounter-as-situation.md`, `output-template.md`, `vault-entity-contract.md`.

### 4.4 `rpg-gm-run-sheet`

- **Bedrock:** the GM-facing overlay for *during* play that a VTT doesn't give you — narrative + discovery state only (no initiative/dice/tokens). It is the **read-out** of the other three.
- **Reads:** the session-prep one-pager, the clue map (revelation IDs), and **active `frente`/`relogio`** state.
- **Writes:** nothing — it is a loose, printable artifact (`run-sheet-<slug>.md`), usable next to any VTT or at a physical table.
- **Output:** strong start, scene beats, the **secrets & clues checklist** (tick as revealed, keyed to revelation IDs), NPC quick-refs (name + voice line + want), the active **clocks** to advance, and "if they stall" proactive backstops tied to a grim portent.
- **References:** `co-creation.md` (light), `output-template.md`, `vault-entity-contract.md`.

---

## Schema extension (in `rpg-vault-guardian`)

`scripts/schema.mjs` is the single source of truth. Add three entries to `ENTITIES` (proposed shape — final fields settle in implementation):

```js
frente: { folder: 'frentes', required: ['type'],
  fields: { status: { type: 'enum', values: ['active', 'dormant', 'resolved'] } },
  relations: { faction: { target: 'faccao' }, antagonist: { target: 'npc' },
    clocks: { target: 'relogio', many: true, curated: true },
    act: { target: 'ato' } } },

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

All relation targets reference known types and all enums carry `values`, so `checkSchemaIntegrity()` passes and `validate.mjs` will not abort with exit 2.

**Cascade — what follows automatically vs. needs manual update:**

| Touchpoint | Automatic? | Action |
|---|---|---|
| `init.mjs` (folder scaffold) | ✅ derived from schema | `frentes/`, `relogios/`, `encontros/` appear; `init.test.mjs` enforces parity (the existing test catches a missed update) |
| `gen-mocs.mjs` / `lib/mocs.mjs` | ✅ derived from schema | new types get MOCs in `_indices/` |
| `validate.mjs` / `lib/checks.mjs` | ✅ derived from schema | schema/link/coherence checks cover new types |
| `rpg-preserve/SKILL.md` | ❌ manual | add 3 rows to **both** quick-ref tables (folder map + required fields) |
| Guardian tests + fixtures | ❌ manual | add fixture notes for the new types; assert on their issue codes |
| Guardian `README.md` / help command | ❌ manual | mention the new types |

**Open schema question:** whether `encontro.party_level`/`threat` should be *required* (data integrity) or optional-but-skill-enforced (consistent with the kit's "minimal schema, judgment in the skill" split). Default: optional in schema, enforced by `rpg-encounter-builder`.

---

## Plugin assembly

```
plugins/rpg-gamemaster/
├─ .claude-plugin/plugin.json
├─ commands/rpg-gamemaster-help.md        ← /rpg-gamemaster-help (matches the other two plugins)
├─ skills/
│  ├─ rpg-session-prep/   (SKILL.md + references/)
│  ├─ rpg-front-tracker/  (SKILL.md + references/)
│  ├─ rpg-encounter-builder/ (SKILL.md + references/)
│  └─ rpg-gm-run-sheet/   (SKILL.md + references/)
└─ README.md
```

- **`plugin.json`:** `name: "rpg-gamemaster"` (lowercase, hyphens, not starting with `claude-`), semantic version, author, license, keywords. Valid JSON.
- **Skill rules:** each `name` matches its folder; description ≤ 1024 chars and **no `": "` (colon-space)** inside the YAML description value; names unique system-wide.
- **Marketplace:** add a `rpg-gamemaster` entry to `.claude-plugin/marketplace.json` (`source: "./plugins/rpg-gamemaster"`, `category: "creativity"`).
- **Safety (mandatory):** grep the plugin for `malareph` (and any private campaign tokens) — must be clean. Generic/Vox-Machina examples only; "do not reuse verbatim" note in each reference file.
- **Conductor:** no edit to the loremaster conductor (keeps plugins independent). Optional future additive note only.

---

## Phasing (one spec, incremental build)

**Phase 1 — Core campaign loop** (delivers "plan a campaign" end-to-end):
1. **Guardian schema extension** — add `frente`/`relogio`/`encontro` to `schema.mjs`; update the `rpg-preserve` quick-ref tables; add fixtures + tests; run `npm test` (expect green + `checkSchemaIntegrity` passing). *Independently testable first deliverable.*
2. **`rpg-front-tracker`** skill + references.
3. **`rpg-session-prep`** skill + references.
4. Minimal plugin scaffold (`plugin.json`, marketplace entry) so it installs.

**Phase 2 — Encounters:**
5. **`rpg-encounter-builder`** skill + `pf2e-encounter-math.md` (build-time-verified tables) — writes `encontro`.

**Phase 3 — Table overlay + polish:**
6. **`rpg-gm-run-sheet`** skill + references.
7. `/rpg-gamemaster-help`, `README.md`, final safety grep, install/reload smoke test.

(`encontro` ships in Phase 1's schema; its producer arrives in Phase 2 — fine, since `rpg-preserve` writes any schema type generically.)

---

## Testing strategy

- **Guardian schema change** has real tests: `node --test scripts/test/*.test.mjs` must stay green; `init.test.mjs` enforces schema↔init parity; add coherence/link fixtures for the 3 new types; confirm `validate.mjs` does not exit 2 (registry integrity).
- **Skills are prompt engineering** — no unit tests. Validate by: (a) `malareph` grep clean; (b) YAML description rules (≤1024 chars, no colon-space); (c) `name` matches folder; (d) a **preserve round-trip smoke test** — hand a hand-built `frente`/`relogio`/`encontro`/`sessao` candidate to `rpg-preserve` against a fixture vault and confirm it validates + writes; (e) install + `/reload-plugins` + `/skills` shows the four `rpg-*` skills; (f) a manual end-to-end: front-tracker advances a clock → session-prep reads it into a strong start → run-sheet reflects the clock.

---

## Open questions / risks

- **Contract drift:** `references/vault-entity-contract.md` duplicates a subset of `schema.mjs`. If the guardian schema changes, this can silently drift. Mitigation: keep the contract minimal (just the types gamemaster emits) and note the sync obligation in both places.
- **Exact PF2e numbers:** must be re-verified against AoN at build time (errata-sensitive); the spec intentionally does not hardcode them.
- **`relogio` naming:** Portuguese to honor the vault convention; "progress clock" kept in prose. Reconsider if it reads awkwardly.
- **Clock-advance via preserve:** advancing a clock rewrites the `relogio` note through the write gate. Confirm `rpg-preserve` cleanly handles *edits* (not just creates) of an existing entity, or define the update path.

---

## Out of scope

- Any Foundry / VTT / MCP integration — that is a separate future adapter (`rpg-foundry-bridge`) which would *read* gamemaster's vault output; gamemaster never knows it exists.
- Re-implementing a creature/compendium database — reference AoN only.
- A live initiative/dice/token tracker — the table/VTT owns runtime mechanics.
- Editing the loremaster conductor — plugins stay independent (comms via vault).
- A `revelacao` entity type — revelations stay in the loose clue map (the "mixed" read decision); revisit only if reads move fully into the vault.

---

## Sources (methodology grounding)

- Sly Flourish — [The Eight Steps of the Lazy DM (2023 review)](https://slyflourish.com/eight_steps_2023.html), [The Secret of the Eight Steps](https://slyflourish.com/secret_of_the_eight_steps.html)
- The Alexandrian — [Don't Prep Plots](https://thealexandrian.net/wordpress/4147/roleplaying-games/dont-prep-plots), node-based scenario design (the Three Clue Rule, already in `rpg-clue-mapper`)
- Dungeon World SRD — [Fronts](https://www.dungeonworldsrd.com/gamemastering/fronts/) (dangers, impulse, grim portents, impending doom, stakes)
- Blades in the Dark — [Progress Clocks](https://bladesinthedark.com/progress-clocks)
- Matt Colville — *Running the Game* (strong start; prep situations; NPCs as name/goal/quirk)
- The Angry GM — prep what you need, then the toolbox; time-boxed prep
- Pathfinder 2e GM Core (Archives of Nethys) — [XP Budget](https://2e.aonprd.com/Rules.aspx?ID=498), [Treasure by Encounter](https://2e.aonprd.com/Rules.aspx?ID=1944) — *category-level links only in shipped skills; verify exact numbers at build time*
