# Embate assembly recipe

Build a `desafio` into a runnable non-combat challenge. The journal is the spine; the scene is optional; the rolls and the VP clock are the live layer. Serialize any scene writes.

## 1. Journal (the spine)
The challenge journal is what the GM runs the scene from. Use `create-quest-journal` as a generic journal-maker (`folderName: "Challenges/<subsystem>"` — e.g. `Challenges/Influence`; the nested path groups challenges by subsystem, foundry-mcp ≥ 0.12.0), or `update-quest-journal` if one already exists (prefer-existing: `search-journals`/`list-journals` by title first).

Pages to build from the `desafio` note body (content is **HTML** — the MCP strips Markdown):
- **Structure** (`<h2 class="spaced">`): subsystem, `vp_format`, `vp_target`, thresholds and what each does, the per-roll award table. For `scale: single-check`, this is just the single DC and the four degrees.
- **DCs**: the DC table (skills the scene invites — *not* a closed list — and each beat's DC, with the discovery checks that lower it).
- **Degrees & fail-forward** (`<div class="gmnote">`): what each degree does to the world-state; the fail-forward consequence at each threshold. GM-only.
- **Read-aloud** (`<div class="readaloud">`): the opening image, player-facing. The GM clicks **Show Players** to display it — there's no MCP tool for that; say so.

## 2. Scene (conditional — only if it has a `local`)
`desafio.location` → the `local` → its scene, **only when present**. Prefer existing (`list-scenes` by name); else generate under confirmation (`generate-map` → poll) and light for mood via `rpg-scene-forge`. Most influence/research challenges have no `local` and need **no scene** — skip it. A chase/infiltration that wants a tactical map should be co-referenced by an `encontro` (the resolver only marks a `local` tactical from an `encontro.location`; a `desafio`-only location stays a narrative handout) — note this to the GM rather than auto-generating a battlemap.

## 3. VP clock (the track)
Realize the VP track as a clock **page in the challenge journal**, mirroring a `relogio`: name, **segments = `vp_target`**, **filled = current VP**, status (`ticking`/`filled`/`paused`). There is **no Foundry clock primitive in the MCP** — this is a journal page the GM updates by hand as VP accrue (exactly how `frente` clocks are rendered, see `rpg-journal-forge/references/journal-mapping.md`). If the `desafio` links a `relogio` via `clock`, mirror its segments/filled. For `scale: single-check`, there is no track — **skip this step**.

## 4. Live rolls (`request-player-rolls`)
For each beat, request the roll. Arguments:
- `rollType`: `skill` for a named skill; `custom` for a formula or a skill Foundry doesn't expose by that name; `save`/`ability` if the beat is a save or raw ability check.
- `rollTarget`: the skill/ability (`diplomacy`, `deception`, `intimidation`, `society`, `acrobatics`, `athletics`, `perception`, `insight`/`intuition`, `stealth`, …) or a custom formula.
- `targetPlayer`: the player name or character name.
- `flavor`: the beat and its DC, so the player sees the stakes.
- `rollModifier`: a circumstance bonus the preparation earned (e.g. `+2` for leveraging a discovered weakness).
- `isPublic` + `userConfirmedVisibility: true`: **required.** Establish public vs. private before each call — if the GM hasn't specified, ask. This is the tool's hard contract; never pass `userConfirmedVisibility` without a real decision behind it.

After the roll, map the degree (crit success / success / failure / crit failure) to the VP award (default +2 / +1 / 0 / −1), advance the clock page, and narrate the **fail-forward** consequence the `desafio` body defines. Loop until a threshold/target resolves the challenge or the time limit (beats/rounds) runs out — and when it runs out, the bad outcome itself fails forward at the campaign level (the harbor closes *for now*, the quarry escapes *with a trail*).

## 5. Hard rules (lessons)
- **Visibility before every `request-player-rolls`** — it's a required confirmation; ask if unsure.
- **HTML, not Markdown, in journals** — `readaloud` / `gmnote` / `spaced` classes; Markdown is silently stripped.
- **Prefer existing** journals/scenes by name — `update-quest-journal` over a duplicate.
- **Serialize scene writes** — parallel writes to one scene drop the 2nd silently (only relevant when the challenge has a `local`).
- **Skip the scene and the clock for a single check** — `scale: single-check` is one journal + one (or a few) rolls.
- Record everything in the manifest under the `desafio` row so a re-run is idempotent; unmappable skills go to `openDecisions`.
- **Never invent** missing challenge data — if the resolver reports `missing[]`, surface it and route the GM back to `rpg-embate-builder` / the guardian.
