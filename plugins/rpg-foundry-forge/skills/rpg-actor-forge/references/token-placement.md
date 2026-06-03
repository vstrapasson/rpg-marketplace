# Token placement & disposition

## Disposition (from role)
`foundry-args.dispositionFor(note)` → `{value, label}`: `inimigo` → -1 (hostile); `npc` by `role` (antagonist → -1, ally/patron → 1, neutral → 0); `jogador` → 1 (friendly). Set it via `update-token(tokenId, { disposition: value })` after placement (`create-actor-from-compendium` doesn't set disposition).

## Placement coordinates
Coords are ABSOLUTE canvas coords including the scene padding offset. Read the target scene's dims with `get-scene-geometry` → `dimensions {sceneX, sceneY, sceneWidth, sceneHeight, size}`, then `foundry-args.placementGrid(dims, count)` → `{type:"coordinates", coordinates:[{x,y}]}` (a centered grid). Pass that as `create-actor-from-compendium`'s `placement` with `addToScene:true`. Do NOT use raw map-image coords (0..width) — they ignore the offset and land in the padding margin.

For an ambush vs a patrol, you may hand-pick coordinates instead of the centered grid — still in absolute canvas space (read dims, add `sceneX/sceneY`).

## Serialize (the race)
Two writes to the SAME scene in parallel → the second silently no-ops (no error). So:
- Place a whole group in ONE `create-actor-from-compendium` call (it batches placement).
- Then issue `update-token` disposition/image calls ONE AT A TIME for that scene's tokens — never in parallel.
The conductor executes plan steps sequentially; keep it that way for scene writes.

## Verify
After placing, `get-token-details(tokenId)` confirms position/disposition/image. Record `tokenIds` + `scene` + `disposition` in the manifest.
