# Output Template

Skeleton for the one artifact this skill writes — the **map-prompt file** — plus the **Realizing the map** section that documents the manual generate-and-import pipeline. The file is loose GM-facing Markdown in the working folder; nothing here is a vault entity and nothing routes through `rpg-preserve`.

**Match the user's language** in prose and headings; keep model parameter syntax and file paths as-is.

---

## A. The map-prompt file — `map-<type>-<slug>.md`

The functional program and the floorplan are shown first (the reasoning), then the rendered prompt. **Compact** renders the nano-banana target only; **Full** adds another model target and/or a variant (a "ruined" or "night" version of the same layout).

```markdown
# Map — [Location Name] ([archetype: tavern / den / shop / temple / …])

> **Tool, not canon** — paste into nano banana, refine the layout in follow-ups, customize freely.

**Inherits:** `campaign-visual-style-<slug>.md` (materials, palette, lighting)
**Footprint:** [shape + scale] · **Aspect:** [1:1 / 3:2 / 16:9]

## Functional program
- **Function:** [what the place does, who runs it]
- **Required zones:** [zone — its objects] · [zone — its objects] · …
- **Fixed feature:** [the one thing the fiction fixes — the fantastic feature]

## Floorplan (zone-placement list)
[bar: N wall, casks behind · kitchen: NE behind bar · cellar trapdoor: by bar ·
 tables: centre with aisles · hearth: W wall · stair: SE corner · entry: S, 2nd exit: —]

## nano banana (primary)
**Positive:** *[the floorplan walked as narrative prose — view → footprint → zones by position → circulation → materials/light → ratio]*
**Negative:** *[the keep-out list]*
**Aspect:** [1:1]

<!-- Full adds, on request: -->
## Other target (Midjourney / Flux / DALL·E)
*[same prose, adjusted — e.g. Midjourney: append `--ar 1:1 --style raw --no people, tokens, text, grid`]*

## Variant (Full, optional)
[the same floorplan in a later/other state — "after the fire", "at night, lit only by the hearth" —
 same footprint + zones so it reads as the same place, changed]

## Realize it
[one-line pointer to the pipeline below + where the PNG lands in Foundry]
```

---

## B. Realizing the map — the manual pipeline (document, don't automate)

This skill emits a prompt; it does **not** generate the image or build the scene. Hand the user the path honestly:

1. **Generate** — paste the **Positive** (and Negative) into **nano banana (Gemini 2.5 Flash Image)** — the AI Studio / Gemini app, or any front-end. It honours the spatial placements directly.
2. **Refine the layout conversationally** — this is the step that replaces a blockout. Correct placement in follow-up turns, one change each: *"move the fireplace to the west wall"*, *"remove the round pits, open planking"*, *"add a storeroom in the SE corner"*. Expect 1–3 passes. (See `prompt-craft.md` → the realization loop.)
3. **Export the PNG**, and place it in the Foundry data dir (Data-relative path): `worlds/<world>/maps/<slug>.png`.
4. **Make it a scene** — this skill hands off; it doesn't place files or call MCP tools. **`rpg-scene-forge` can't ingest a loose PNG** (it links an existing scene by name, or runs its own `generate-map`), so:
   - In Foundry, **create the scene yourself and set its background** to `worlds/<world>/maps/<slug>.png` (set the grid to match the map's scale). **Then** hand the **scene name** to `rpg-scene-forge` to light it and place tokens (it links by name).

State plainly that steps 1–3 are the GM's to run in nano banana. For a hand-built, layout-controlled map, **prefer nano banana over the forge's text2img `generate-map`** (which ignores spatial instructions) — then create the scene and let `rpg-scene-forge` link it. (This is a manual-workflow preference, not a forge-layer change: the conductor/forge still call `generate-map` by default.) If you keep a local ControlNet/blockout workflow for an offline route, drive that from a blockout instead.

---

## C. Off-stage handoffs

End every output with a structured list:

- → `rpg-scene-forge`: **after you've created the Foundry scene from the PNG**, hand it the **scene name** so it links the scene by name and wires lighting + tokens (it does not ingest a loose file).
- → `rpg-location-creator`: if the map needs a location whose fiction (ecology, fantastic feature, secrets) doesn't exist yet — build the dossier first, then come back.
- → `rpg-art-director`: if the GM also wants an *establishing illustration* of the place (not a tactical floorplan) — that's its job, inheriting the same style bible.
- → `rpg-campaign-conductor`: note the map alongside its `local` so the campaign bible tracks which scenes are realized.
- → Style notes: any deviation from the visual style bible (a place that bends the campaign palette/materials), so the look stays intentional.
