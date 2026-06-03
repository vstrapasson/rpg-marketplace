# Encounter assembly recipe

Build an `encontro` into a runnable combat. Order matters; serialize all scene writes.

## 1. Scene + lighting
`encontro.location` → the `local` → its scene. Prefer existing (`list-scenes` by name); else generate under confirmation (`generate-map` → poll). Light for combat mood — crypts/dungeons → `dark` (`set-scene-lighting(darkness:0.6, globalLight:false, tokenVision:true)`). One sequential batch of writes to this scene.

## 2. Creatures by budget
The encounter's `party_level`, `party_size`, and `threat` (trivial/low/moderate/severe/extreme) define the combat budget. For each `inimigo` in `creatures`:
- Match a compendium creature: name first; else `list-creatures-by-criteria(level: party_level adjusted by threat)` → pick by the inimigo's body lore. (See `rpg-actor-forge/references/enemy-matching.md`.) Higher threat → higher-level / more creatures.
- `create-actor-from-compendium(packId, itemId, names, quantity, addToScene:true, placement)` — `placement` from `foundry-args.placementGrid(sceneDims, count)` using `get-scene-geometry` dims (absolute canvas coords incl. `sceneX/sceneY` offset). Group the ambush sensibly (cluster vs spread).
- `update-token(tokenId, { disposition: -1 })` for each — hostile. **Serialize** these per scene.

## 3. Treasure
For each `item` in `treasure`: `manage-world-items(action:"create", items:[{name, type:<judgment: weapon/armor/equipment/treasure>}])`. Optionally `manage-world-items(action:"add-to-actor", actorIdentifier:<a creature>, items:[…])` to seed loot on a body. Record `itemId`s.

## 4. Hard rules (lessons)
- **Serialize scene writes** — parallel writes to one scene drop the 2nd silently.
- **Coords include the padding offset** — use `placementGrid` / `get-scene-geometry` dims, never raw 0..width.
- **No auto walls** on painted maps — combat runs without dynamic LoS unless the GM draws walls; that's expected (see scene-forge's verdict).
- Record everything in the manifest under the `encontro` row so a re-run is idempotent; unmatched creatures go to `openDecisions`.
