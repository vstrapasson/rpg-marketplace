# Vault Entity Contract (gamemaster kit — embate-builder)

> **Rule:** Every gamemaster skill **never writes files directly**. It assembles a typed entity candidate and hands it to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate. Reads are direct — use Glob/Read on the vault's typed folders (`npcs/`, `faccoes/`, `locais/`, `relogios/`, `sessoes/`) and loose files (`campaign-bible-*.md`, `clue-map-*.md`) at the vault root.

> **Sync obligation:** this table mirrors a subset of the vault guardian's `scripts/schema.mjs`. It documents only the entity types this skill reads or emits. If `schema.mjs` changes (fields added, enum values extended, relation targets changed), this file **must be updated to match** — drift here causes silent breakage when rpg-preserve validates a candidate against the current schema.

---

## Entity types this skill uses

| type | folder | required fields | key own fields | key relations |
|---|---|---|---|---|
| desafio | desafios/ | type | subsystem (influence/chase/research/infiltration/generic), vp_format (accumulating/diminishing/multiple), scale (single-check/quick/long/session/background/forefront), vp_target (int), party_level (int) | location→local, npcs→npc[], faction→faccao, session→sessao, act→ato, items→item[], clock→relogio |
| relogio | relogios/ | type, segments | segments (int), filled (int), status (ticking/filled/paused) | front→frente, faction→faccao, quest→quest |
| npc | npcs/ | type, role | role (ally/neutral/antagonist/patron) | location→local, faction→faccao, statblock→inimigo |
| item | itens/ | type | — | owner→npc/jogador, location→local |

*`desafio` is the entity this skill produces. `relogio` is optional (the VP track as a clock). `npc`/`item` are emitted only when the challenge names entities that do not yet exist.*

---

## The single-check vs. VP-challenge discriminator

The `scale` field distinguishes the two shapes:

- **Single dramatic check** → `scale: single-check`; omit `vp_format` and `vp_target`; do not emit a `relogio`.
- **Structured VP challenge** → `scale` is one of `quick / long / session / background / forefront`; set `vp_format` and `vp_target`; optionally emit a `relogio` (segments = `vp_target`) and link it via `clock`.

Thresholds, the per-roll award table, and the DC table are **not frontmatter** — they live in the note body. The vault's frontmatter is flat YAML (single-level; no nested maps), so a thresholds list belongs in prose, not a nested field.

---

## Wikilink rule

All relation fields are written as wikilinks: `"[[Exact Vault Name]]"`. The name inside the brackets must exactly match the vault note's filename (without extension). If it doesn't, rpg-preserve will flag a broken link and refuse to write.

For list relations (`npcs`, `items`), use YAML block syntax:

```yaml
npcs:
  - "[[Councillor Vault Name]]"
  - "[[Archivist Vault Name]]"
```

---

## The VP track as a clock (the update path)

If the challenge's VP track is persisted as a `relogio`, advancing it follows the standard clock update path: re-emit the **same-named** `relogio` candidate with `filled` set to the current VP. rpg-preserve overwrites the note and re-validates.

```
type: relogio
segments: 7
filled: 3
status: ticking
```

Hand this to rpg-preserve with the clock's name; it overwrites `relogios/<name>.md`. This is what lets `rpg-front-tracker` advance a challenge between sessions and `rpg-embate-forge` render the live VP as a Foundry clock page.

---

## Reading vault state

Before building, read current state directly:

```
Glob npcs/            → list NPCs (influence targets, opponents)
Read npcs/<name>.md   → an NPC's role, faction, statblock
Glob faccoes/         → list factions
Read faccoes/<name>.md → the opposing faction's drive
Glob locais/          → list locations
Read locais/<name>.md  → the challenge's place (if any)
Glob desafios/        → existing challenges (avoid duplicates; reuse names)
```

Do not parse YAML manually — read the frontmatter fields as plain text and extract the values you need. The vault's frontmatter is flat YAML (single-level only; no nested maps).
