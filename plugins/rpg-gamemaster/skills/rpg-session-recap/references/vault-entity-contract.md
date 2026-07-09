# Vault Entity Contract (session-recap)

> **Rule:** This skill **never writes files directly**. It assembles typed entity candidates and hands them to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate. Reads are direct — use Glob/Read on the vault's typed folders (`sessoes/`, `eventos/`, `quests/`, `npcs/`, `faccoes/`, `frentes/`, `relogios/`) and loose files (`campaign-bible-*.md`, `clue-map-*.md`) at the vault root.

> **Sync obligation:** this table mirrors a subset of the vault guardian's `scripts/schema.mjs`. It documents only the entity types this skill reads or writes. If `schema.mjs` changes (fields added, enum values extended, relation targets changed), this file **must be updated to match** — drift here causes silent breakage when `rpg-preserve` validates a candidate against the current schema.

---

## Entity types this skill uses

| type | folder | required fields | key own fields | key relations | this skill's role |
|---|---|---|---|---|---|
| sessao | sessoes/ | type, date (YYYY-MM-DD) | date | act→ato, players_present→jogador[], quests→quest[], events→evento[], transcript→transcricao (linkOnly) | **updates** (body-preserving) — adds outcomes, links resolved quests/events |
| evento | eventos/ | type, act | — | act→ato, location→local, participants→[npc, jogador][], session→sessao | **creates** — one per discrete session beat worth its own entity |
| quest | quests/ | type, act, status | status (available/active/completed/failed/abandoned) | act→ato, giver→npc, npcs→npc[], locations→local[], items→item[], factions→faccao[] | **updates** (body-preserving) — flips `status` only |
| npc | npcs/ | type, role | role (ally/neutral/antagonist/patron) | location→local, faction→faccao, statblock→inimigo | **updates** (body-preserving) — `status` shifts + a body note when the beats warrant it |
| faccao | faccoes/ | type | key_members→npc[] (curated), headquarters→local, rivals→faccao[] | **updates** (body-preserving) — `status` shifts + a body note |
| frente | frentes/ | type | status (active/dormant/resolved) | faction→faccao, antagonist→npc, clocks→relogio[], act→ato | **reads only** — context for the front-tracker handoff; this skill does not advance clocks |
| relogio | relogios/ | type, segments | segments (int), filled (int), status (ticking/filled/paused) | front→frente, faction→faccao, quest→quest | **reads only** — same; `rpg-front-tracker` owns advancement |
| transcricao | sessoes/transcricoes/ (NON_ENTITY — no folder-level type check, no orphan check) | — | — | — | **reads only** — optional enrichment source, never written |

*`frente`/`relogio` are included for completeness — this skill reads them to give `rpg-front-tracker` accurate handoff context (which fronts this session's beats likely feed) but never advances a clock itself. That's `rpg-front-tracker`'s job, by design — see its `SKILL.md` "Do not trigger for" list.*

---

## Wikilink rule

All relation fields are written as wikilinks: `"[[Exact Vault Name]]"`. The name inside the brackets must exactly match the vault note's filename (without extension). If it doesn't, `rpg-preserve` will flag a broken link and refuse to write — which is also why entity matching (`reconciliation-model.md` §3) happens *before* any candidate is drafted, not after.

For list relations, use YAML block syntax:

```yaml
events:
  - "[[Event Name One]]"
  - "[[Event Name Two]]"
```

---

## Creating a new entity (the normal path)

Used for **new `evento`s** — the only type this skill creates outright. Hand `rpg-preserve` the type, name, and fields; it runs the standard create flow (`buildFrontmatter` → `buildNoteContent` → `validateCandidate` → write on 0 errors) in its own context. Example candidate:

```
type: evento
act: "[[Ato 1]]"
location: "[[Cidade de Pedra]]"
participants:
  - "[[Elara]]"
  - "[[Toma]]"
session: "[[Sessão 3]]"
```

Hand this to `rpg-preserve` with the name `A Confissao da Harbormaster`. This skill does not import guardian code directly — see `SKILL.md`'s Persistence section.

---

## Updating an existing entity (the body-preserving path — required for sessao/quest/npc/faccao)

**This is the path this skill uses for every update.** A `quest` flipped to `completed`, an `npc` whose status shifted, a `sessao` gaining its outcomes — all of these are edits to a note that already has a hand-authored body (dossier prose, session context, the quest's description). The normal create flow (`buildFrontmatter` + `buildNoteContent`) **rebuilds the note from scratch and would discard that body.** Never use it for an update.

Instead, this skill hands `rpg-preserve` a **field patch against an existing note**, not a from-scratch candidate: the type, the name, and only the frontmatter fields that changed. `rpg-preserve` runs the **body-preserving update recipe** documented in its own `SKILL.md` — read the existing file, split frontmatter from body, patch only the given fields, re-stamp `updated`, re-serialize, keep the body verbatim, then validate and write exactly like any other candidate.

Example patch handed to `rpg-preserve`:

```
type: quest
name: "O Resgate"
patch:
  status: completed
```

`rpg-preserve` reads `quests/O Resgate.md`, keeps everything below the frontmatter untouched, changes only `status` (and `updated`), validates the result, and writes on 0 errors — same contract as every `rpg-preserve` write (`errors === 0` → write; `errors > 0` → surface and ask).

**This skill's `${CLAUDE_PLUGIN_ROOT}` resolves to the gamemaster plugin and cannot reach guardian's `scripts/lib/*.mjs` directly** — the update recipe's actual code lives only in `rpg-preserve`'s own `SKILL.md`, which runs in the guardian's plugin context. See `SKILL.md`'s Persistence section for why that boundary is load-bearing.

**A body note vs. a frontmatter-only patch.** Some updates are pure frontmatter (`quest.status`, `npc.status`). Others warrant a short addition to the body — e.g. one line under an NPC's existing dossier noting the session's turn ("Session 3: betrayed the party, killed in the harbor fight"). When a body note is warranted, say so explicitly in the patch handed to `rpg-preserve` (an `append` field alongside `patch`) rather than trying to edit existing prose in place.

---

## Reading vault state

Before drafting any change, read current state directly:

```
Glob sessoes/              → list sessions (sort by date field for latest)
Read sessoes/<name>.md     → the session being recapped: planned shape, current outcomes if any
Glob quests/                → list quests
Read quests/<name>.md       → current status
Glob npcs/, faccoes/        → list NPCs/factions
Read npcs/<name>.md, faccoes/<name>.md → current status, role, body
Glob eventos/                → existing events, to avoid duplicating one the account also describes
Glob frentes/, relogios/     → active fronts and clocks, for front-tracker handoff context
```

Do not parse YAML manually — read the frontmatter fields as plain text and extract the values you need. The vault's frontmatter is flat YAML (single-level only; no nested maps).

---

## Clue-map ticks (not a vault entity)

`clue-map-*.md` is a **loose file**, not a schema-governed entity — it is not read or written through `rpg-preserve`. With the GM's approval (per the recap's adjudication), tick revealed R-IDs directly in the file: mark the revelation as revealed (e.g. append "— *revealed, Session 3*" to the row), leaving unrevealed R-IDs untouched so `rpg-session-prep`'s carry-forward still finds them.
