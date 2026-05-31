# Vault Entity Contract (front-tracker)

> **Rule:** `rpg-front-tracker` (and every gamemaster skill) **never writes files directly**. It assembles a typed entity candidate and hands it to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate. Reads are direct — use Glob/Read on the vault's typed folders (`frentes/`, `relogios/`, `sessoes/`, `faccoes/`) and loose files (`campaign-bible-*.md`, `clue-map-*.md`) at the vault root.

> **Sync obligation:** this table mirrors a subset of the vault guardian's `scripts/schema.mjs`. It documents only the entity types this skill reads or emits. If `schema.mjs` changes (fields added, enum values extended, relation targets changed), this file **must be updated to match** — drift here causes silent breakage when rpg-preserve validates a candidate against the current schema.

---

## Entity types this skill uses

| type | folder | required fields | key own fields | key relations |
|---|---|---|---|---|
| sessao | sessoes/ | type, date (YYYY-MM-DD) | date | act→ato, quests→quest[], events→evento[] |
| frente | frentes/ | type | status (active/dormant/resolved) | faction→faccao, antagonist→npc, clocks→relogio[], act→ato |
| relogio | relogios/ | type, segments | segments (int), filled (int), status (ticking/filled/paused) | front→frente, faction→faccao, quest→quest |
| encontro | encontros/ | type | threat (trivial/low/moderate/severe/extreme), party_level (int), party_size (int) | creatures→inimigo[], location→local, session→sessao, treasure→item[] |

*`encontro` is included here for completeness — it is produced by `rpg-encounter-builder`, not by this skill. This skill reads `encontro` notes only as context.*

---

## Wikilink rule

All relation fields are written as wikilinks: `"[[Exact Vault Name]]"`. The name inside the brackets must exactly match the vault note's filename (without extension). If it doesn't, rpg-preserve will flag a broken link and refuse to write.

For list relations (marked `[]` above), use YAML block syntax:

```yaml
clocks:
  - "[[Clock Name One]]"
  - "[[Clock Name Two]]"
```

---

## Advancing a clock (the update path)

To advance a `relogio`, re-emit the **same-named** candidate with `filled` incremented by the number of portents that fired. rpg-preserve will overwrite the existing note and re-validate. This is the intended update path — overwrite is safe because the schema validator re-checks the whole note on write.

Example: a clock named `Consortium Grip` at `filled: 2` advances to `filled: 3` after a session where one portent fired. Re-emit:

```
type: relogio
segments: 6
filled: 3
status: ticking
front: "[[Consortium Grip Front]]"
faction: "[[The Consortium]]"
```

Hand this to rpg-preserve with the name `Consortium Grip`. It will overwrite `relogios/Consortium Grip.md`.

---

## Reading vault state

Before advancing, read current state directly:

```
Glob frentes/         → list active fronts
Read frentes/<name>.md → front's current fields (status, relations)
Glob relogios/        → list clocks
Read relogios/<name>.md → clock's segments, filled, status
Glob sessoes/         → list sessions (sort by date field for latest)
Read sessoes/<name>.md  → last session's events and quests
```

Do not parse YAML manually — read the frontmatter fields as plain text and extract the values you need. The vault's frontmatter is flat YAML (single-level only; no nested maps).
