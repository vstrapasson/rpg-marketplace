# Enemy matching — name → criteria → ask

Map a vault `inimigo` (or `npc.statblock`) to a compendium creature. This is LLM judgment; the result (`packId`/`itemId`) goes in the manifest so re-builds are stable.

## 1. Name match (first)
`search-compendium(query: <inimigo name>, packType: "Actor")`. If a single clear match exists in the canonical pack (e.g. `pf2e.pathfinder-monster-core`), take it. Strip honorifics/qualifiers from the vault name first ("Esqueleto Guardião" → search "skeleton guard" / "esqueleto"; the vault is Portuguese, the compendium may be English — translate the creature noun for the query).

## 2. Criteria fallback
If no name match, use the encounter's budget: `list-creatures-by-criteria(level: <encontro.party_level ± by threat>, ...)` to get level-appropriate candidates, then pick the closest by the `inimigo` body lore (its description). The `encontro.threat` (trivial..extreme) nudges the level up/down relative to `party_level`.

## 3. Ask (last)
If still ambiguous or nothing fits, present 2–3 candidates (name, level, pack) and **ask the user**. Record the unresolved one in the manifest `openDecisions` until chosen. Never guess silently.

## Notes
- Confirm the pack exists (preflight #3). If the canonical creature pack is absent, you can't create actors — report and skip.
- Use `get-compendium-item`/`get-compendium-entry-full` to confirm a candidate before committing.
- `quantity`/`names`: an `encontro` may want N copies of one creature — pass `names: ["Esqueleto Guardião 1","Esqueleto Guardião 2"]` or `quantity`. Keep names traceable to the vault entity.
