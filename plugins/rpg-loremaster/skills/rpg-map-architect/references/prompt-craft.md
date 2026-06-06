# Prompt Craft — rendering the floorplan for nano banana

The engine that turns a zone-placement list (`spatial-program.md` §3) into one prompt the image model honours. **Primary target: nano banana (Gemini 2.5 Flash Image).** It rewards narrative prose with explicit spatial relationships, has genuine spatial understanding, and — its superpower — **edits conversationally**, so a misplaced zone is a one-line correction, not a re-roll. Load when rendering.

## Why nano banana, and how it differs from SDXL

| | SDXL / ComfyUI | nano banana (Gemini 2.5 Flash Image) |
|---|---|---|
| Prompt form | weighted tag soup, lean negatives | **narrative prose**, full sentences |
| Spatial instructions | largely ignored (needed a ControlNet blockout) | **followed well** for a handful of anchored zones; dense 6+-zone layouts still drift — that's what the refine loop is for |
| Fixing a mistake | re-roll / redraw the blockout | **say it**: "move the bar to the north wall" |
| Aspect ratio | generation size | named in the prompt (1:1, 3:2, 16:9, …) |

This is why the skill is prompt-only with **no blockout**: the floorplan lives in the words, and drift is fixed by conversation. Write for an attentive reader, not a keyword matcher.

## The structured framework (write the prompt in this order)

Walk the floorplan top-down, perimeter then centre. Six beats:

1. **View + format** — declare the camera so it can't go wrong:
   *"A top-down orthographic battle map, bird's-eye flat-lay view, looking straight down, no perspective, single floor, consistent scale, grid-ready."*
2. **Footprint + bounding structure** — the shape, the walls, the entrances:
   *"A rectangular stone-walled tavern, thick exterior walls, a double door on the south wall."*
3. **Zones by position** — walk each zone with an **explicit position** and its objects, clustered, **and place any vertical connectors (stairs, ladders, trapdoors, shafts) against a wall or in a corner here too**. This is the spatial spine — one clause per zone, in a deliberate order (anchor features first):
   *"Along the north wall runs a long oak bar with stools, casks and kegs stacked on the wall behind it. Behind the bar in the northeast corner is a small kitchen with a cooking hearth and a prep table. A stone fireplace with a lit hearth sits against the west wall, with armchairs before it. A staircase rises against the east wall. In the centre, wooden dining tables with benches, set apart with clear walking space between them. A cellar trapdoor in the floor near the bar."*
4. **Circulation + access** — name the clear space and the ways in:
   *"Open walkable floor and clear aisles between the tables; two ways in."*
5. **Materials + lighting + palette** — inherit the campaign visual style bible (medium is irrelevant for a map, but materials/era/light/palette carry):
   *"Worn wooden plank floor, stone walls, warm candlelight and firelight, muted earthy palette, detailed and readable."*
6. **Constraints + aspect ratio** — for nano banana, fold the keep-outs into the positive as **semantic positives** and keep a short literal negative only as backup (see "Negatives" below); set the ratio on the API param (Gemini defaults to **16:9** — a tile must request **1:1**):
   *"…strictly flat orthographic top-down, every object lying in the floor plane, aisles clear, an unpopulated map. (Backup negative: no people, no tokens, no grid lines, no perspective.) Aspect 1:1."*

### Spatial vocabulary that lands
- **Walls & corners** (rectilinear footprints): "along the north wall", "against the east wall", "in the northwest corner", "centred", "in the lower third".
- **Organic & vessel footprints** (caves, ships, hulls — `spatial-program.md` §1 *Compound locations*): anchor to **named landmarks**, not cardinal walls — caves: "near the mouth / deep at the back / in a side recess / along the cavern's edge"; ships/hulls: "bow / stern / port / starboard / amidships / fore / aft / down the keel-line".
- **Relations:** "behind the bar", "beside the forge", "off the corridor", "flanking the altar", "next to", "set apart from".
- **Camera (kill perspective):** "top-down", "orthographic", "bird's-eye", "flat-lay", "looking straight down", "no perspective", "blueprint-like overhead". Reinforce in the negatives ("no perspective, no isometric, no angled view").
- **Scale/readability:** "consistent scale", "clean readable layout", "clear walking space", "uncluttered floor".

### Aspect ratio
**Match the ratio to the footprint's proportions:** a roughly square space → **1:1**; a clearly elongated interior (corridor, hull, long hall) → **3:2 / 2:1** along its long axis; a broad open exterior or full ship deck → **16:9**. **Set it on the API `imageConfig.aspectRatio` param, not just in prose** — Gemini 2.5 Flash Image **defaults to 16:9**, so a square grid tile *must* request `1:1` there or it silently renders wide and breaks the grid. Name the ratio in the prose too as reinforcement, and record it in the file. (Front-ends like AI Studio / the Gemini app expose the ratio as a control.)

## The realization loop — refine the layout conversationally

Nano banana's edit mode is the whole reason placement drift is cheap. After the first image, the GM corrects **in follow-up turns**, one change at a time:

- *"Move the fireplace to the west wall."*  *"Pull the bar fully against the north wall."*
- *"Remove the two round pits in the lower floor; make it open planking."*
- *"Add a small storeroom in the southeast corner with crates and barrels."*
- *"Clear the tables out of the central aisle so there's a walking path."*

Tell the GM to expect 1–3 of these. This is the direct fix for the failure these maps used to have (a hearth drifting off its wall, invented clutter) — you don't re-roll, you *direct*.

## Negatives — a solid battlemap default

Start from this and trim/add per map:

> *no people, no characters, no creatures, no tokens, no text, no labels, no watermark, no grid lines drawn on the map, no perspective, no isometric, no angled or 3/4 view, no floating objects, no duplicated objects, no clutter in the walkways, no walls cut off, no blurry or distorted geometry.*

**For nano banana, lead with *semantic positives*, not a long "no…" list.** Gemini can latch onto a literal negative and render the very thing ("no perspective" can invoke perspective). Bake the intent into the **positive** prose — *"strictly flat orthographic top-down, every object lying in the floor plane, aisles clear, an unpopulated map"* — and keep only a short literal negative as backup, placed last. The full "no…" block above is most reliable for **SDXL / Midjourney / Flux**.

## A worked example (tavern)

Zone-placement list → one nano-banana prompt:

> **Positive —** A top-down orthographic battle map of a fantasy tavern interior, bird's-eye flat-lay view looking straight down, no perspective, single floor, consistent scale, grid-ready. A rectangular building with thick stone exterior walls and a double entrance door on the south wall. Along the north wall runs a long wooden bar with stools, and casks and kegs stacked against the wall behind it. Tucked behind the bar in the northeast corner is a small kitchen with a stone cooking hearth and a prep table. Against the west wall stands a stone fireplace with a lit hearth, two armchairs before it. A wooden staircase rises against the east wall toward an upper floor. In the centre of the common room, wooden dining tables with benches are set apart with clear walking space between them, a worn rug underfoot. A cellar trapdoor is set into the floor near the bar. The floor is worn wooden planks, the walls grey stone, lit by warm candlelight and the fire's glow, muted earthy palette, detailed and readable. Square 1:1.
>
> **Negative —** no people, no creatures, no tokens, no text or labels, no grid lines, no perspective or isometric, no floating objects, no clutter in the walkways.

Every clause is a zone in its place; the model has a floorplan to build, not a vibe to guess.

## Other strong instruction-followers (on request)

The same prose works, lightly adjusted, for **Midjourney** (append `--ar 1:1 --style raw`, move negatives to `--no people, tokens, text, grid`), **Flux / Ideogram** (keep the prose, ratio in words), and **DALL·E / GPT-Image** (prose, name the ratio). SDXL is **not** recommended for this skill — it won't honour the placements; that's what the local ControlNet/blockout pipeline (`local/comfyui-map-workflow.md`) is for if the GM ever wants the offline route.
