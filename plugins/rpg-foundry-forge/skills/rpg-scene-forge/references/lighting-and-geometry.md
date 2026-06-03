# Lighting & geometry — the hard-won rules

## Lighting (set-scene-lighting)
`set-scene-lighting(darkness 0..1, globalLight bool, tokenVision bool)`. `globalLight: true` lights the whole scene regardless of darkness — so turn it **OFF** for dark scenes or your lights won't matter. Presets (`foundry-args.lightingForMood`):
- bright `{darkness:0, globalLight:true, tokenVision:true}` — daylit/town.
- dim `{darkness:0.3, globalLight:false, tokenVision:true}` — torchlit hall.
- dark `{darkness:0.6, globalLight:false, tokenVision:true}` — crypt/dungeon.
- pitch `{darkness:0.9, globalLight:false, tokenVision:true}` — lightless depths.

`suggestMood(toneLevel, placeKind)` gives a default (crypts/dungeons → dark/pitch; outdoors/town → bright/dim); you may override.

**v14 fields:** lighting moved into `scene.environment` (`darknessLevel`, `globalLight.enabled`); `tokenVision` stays top-level. `set-scene-lighting` handles the v12+/legacy split for you — just call it. (If a raw `scene.update` is ever needed, nested fields require FLATTENED dot-notation: `{'environment.globalLight.enabled': false}`; a deep object silently no-ops the nested leaf.)

## Walls — the verdict: leave organic maps to the human
Precise wall tracing on a hand-painted/organic battlemap via a render→read loop is unreliable — walls float ~20–30px off the stone and fragment. So this plugin, by default, **does NOT auto-trace walls**. Set lighting + place tokens; tell the user to draw walls in Foundry's own wall tool (real-time mouse snap) where they want dynamic line-of-sight. Record `walls: "skipped"`.

Only use `create-walls` for **simple, known, grid-aligned geometry** the user explicitly specifies (e.g. "wall off this rectangular room at these grid coords").

### If you DO create walls — the enum trap
Wall fields use Foundry `WALL_*` enum VALUES, not 0/1: `move` ∈ {0,20}, `sight`/`sound` ∈ {0,10,20,30,40}, `dir`/`door`/`ds` ∈ {0,1,2}. An invalid value (e.g. `1` for move) makes `createEmbeddedDocuments` **silently drop the wall** (`createdCount: 0`, no error). Use `foundry-args.wallEnumDefaults()` → `{move:20, sight:20, sound:20, dir:0, door:0, ds:0}` (a normal blocking wall). A door is a wall with `door:1` (secret `2`), `ds` = state.

## Coordinates
Wall/light/token coords are ABSOLUTE CANVAS coords that INCLUDE the scene's padding offset. `get-scene-geometry` returns `dimensions.sceneX/sceneY` (the offset) + `sceneWidth/sceneHeight/size`. To place inside the map, add the offset (`foundry-args.placementGrid` does this). Raw map-image coords (0..width) are WRONG — they land in the padding margin.

## Serialize
One scene, one sequential batch of writes. Two parallel writes to the same scene → the second silently no-ops (hard-won). The conductor executes steps one at a time; never fire scene writes in parallel.
