---
name: rpg-map-architect
description: Designs top-down battlemap image-generation prompts that are spatially assertive — system-agnostic, prompt-only, for strong instruction-following image models (nano banana / Gemini 2.5 Flash Image first; works for any). The intelligence is a functional program per location archetype: it names the zones a place needs to actually work (a tavern needs a serving bar with kegs behind it, a kitchen, a cellar, tables with circulation, stairs; a bandit den needs a watched entrance, bunks, a contraband store, a stash, a bolt-hole) and places them where they make sense, then renders that floorplan as one narrative prompt the model honors. Emits prompts only — image generation stays a documented manual step (paste into nano banana, refine the layout conversationally, import the PNG into Foundry). Inherits the campaign visual style bible from rpg-art-director so maps match the campaign look. Use to create a battlemap/map prompt, gerar o prompt do mapa de uma taverna/covil/masmorra, montar a planta funcional de um local, map prompt for my tavern/dungeon/shop, "make the layout make sense". Default tone dark-leaning (level 3 of 5).
---

# RPG Map Architect (system-agnostic, dark-leaning by default)

## What this skill is for

Turn a location into a **top-down battlemap prompt that is spatially assertive** — one that names the **functional zones a place needs to actually work** and **places them where they make sense**, so the generated map reads as a real working space, not a random scatter of furniture.

The worldbuilding skills describe what a place *is* and how it *feels*; the art-director renders *illustration* (portraits, establishing shots, emblems). This skill does the thing neither does: it designs the **floorplan logic** of a tactical map. A tavern isn't "tavern, wooden floor, barrels" — it's a serving **bar** (kegs and casks behind it), a **common room** of tables with room to walk, a **kitchen** behind the bar, a **cellar**, **stairs** to the rooms above, a **hearth** on an outside wall, an **entrance**. This skill knows that, and arranges it.

This skill is **system-agnostic** — it deals in function, zones, objects, and arrangement, never stat blocks or Archives of Nethys links. Like `rpg-npc-creator`, `rpg-artifact-creator`, `rpg-art-director`, and `rpg-sound-director`, it works for any system.

The default tone is **dark-leaning (level 3 of 5)** — the map's materials and lighting inherit the campaign's visual style; this skill does not reset it. It inherits the **`campaign-visual-style-<slug>.md`** bible authored by `rpg-art-director`, so maps share the campaign's palette, materials, and lighting.

## The honest boundary — this skill writes prompts, not maps

Image *generation* is not callable from here. **This skill emits one prompt and documents the path to realize it.** It works for **any strong instruction-following image model**; the recommended default is **nano banana (Gemini 2.5 Flash Image)** — it follows explicit spatial instructions far better than SDXL, and it **edits conversationally**, so a misplaced zone is a one-line fix ("move the bar to the north wall", "remove the round pits", "add a storeroom in the SE corner"). The GM pastes the prompt, refines the layout in follow-ups, exports the PNG, and imports it into Foundry as a scene background. The skill never generates and never places the file — it says so plainly and hands off. See `references/output-template.md` → "Realizing the map."

> **Why prompt-only, and why no blockout.** Weak instruction-followers (SDXL) ignore "bar along the north wall" — you had to *draw* a blockout and force it with ControlNet. Strong instruction-followers (nano banana) honor explicit spatial language directly, so the floorplan can live **in the prompt** and drift is corrected by conversation. That removes the blockout step entirely. This is the same prompt-only contract as `rpg-art-director`.

## The core idea — function first, then arrangement, then coherence

Three layers, in order:

1. **The functional program (what the place needs to work).** Derived from the location's *function*: who uses it, for what, so what zones and objects must be present. A jail needs cells, a guard desk, a key store, a cell-block corridor; a smithy needs a forge, an anvil, a quench trough, a tool wall, a fuel store. Drop this and you get a pretty room that no one could actually *use*. See `references/spatial-program.md`.
2. **The spatial arrangement (where each zone goes so it makes sense).** Services and fixed features anchor to walls; circulation runs through the centre; objects cluster by function into legible zones; there are at least two ways in; nothing blocks a doorway or an aisle. Drop this and you get the right objects in nonsense places — a hearth in the middle of the floor, the kitchen across the building from the bar.
3. **The campaign look (so the map belongs to this world).** Materials, palette, and lighting inherited from the visual style bible, so the tavern in this campaign reads like *this* campaign. Drop this and you get a generic stock battlemap.

## When to use this skill

Trigger when the user wants a **map / battlemap prompt** or a **floorplan that makes sense** — "battlemap prompt for this tavern", "gerar o prompt do mapa do covil", "a map prompt for my dungeon room", "montar a planta da taverna", "make the layout make sense", "a top-down map of the shop" — or when they paste a "Ready for `rpg-map-architect`" handoff from a `local` dossier.

Do **not** trigger for:
- **Illustration / handouts / portraits / establishing shots** — that's `rpg-art-director` (an establishing shot of a city skyline is illustration, not a tactical floorplan).
- **Actually generating the image** — that's the manual nano-banana step (see the honest boundary).
- **Building the Foundry scene** — `rpg-scene-forge` links an existing scene by name or generates its own; it does **not** ingest this prompt or a loose PNG. This skill produces the map *artifact* the GM realizes (and never places files or calls MCP tools); the GM creates the scene from the PNG, then scene-forge lights and populates it by name.
- **Designing the location's fiction** (ecology, why-not-cleared, secrets) — that's `rpg-location-creator`. This skill consumes that dossier and lays out the tactical space.

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — see `references/co-creation.md`. Get the location's **function**, scale, any fixed features the fiction already fixed, and confirm the style bible to inherit.
2. **Derive the functional program** — archetype → required zones → typical objects. Add the location's specific features from its dossier. See `references/spatial-program.md` §1–2.
3. **Arrange the space** — anchor fixed features to walls, cluster by function, route circulation, place ≥2 entrances. See `references/spatial-program.md` §3.
4. **Render the prompt** — walk the floorplan as one narrative, spatially-explicit prompt for nano banana (view → footprint → zones by position → circulation → materials/lighting → negatives → aspect ratio). See `references/prompt-craft.md`.
5. **Present, document realization, hand off** — save the file, show how to generate-and-refine in nano banana and import into Foundry. See `references/output-template.md`.

Read references by context. Don't load all of them.

## Step 2: Read references as needed

Four reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end. **Load before intake.**
- **`references/spatial-program.md`** — the engine: the function→zones→objects→arrangement method, the archetype program table, and the placement grammar. **Load for every map.**
- **`references/prompt-craft.md`** — the nano-banana rendering engine: the structured framework, the spatial language, the kill-perspective terms, and the conversational-refine loop. **Load when rendering.**
- **`references/output-template.md`** — the map-prompt file skeleton + "Realizing the map" (generate in nano banana → refine → import to Foundry) + handoffs. **Load when ready to write.**

## Coherence — the two tests that matter

A map coheres when someone could **use** it and every object has a **reason to be where it is**:

- **The function test:** could a person actually *run* this place? Can the barkeep reach the kegs and the cellar; can the smith swing a hammer at the anvil by the forge; do the cells lock from the guard side? If a required zone is missing or an object can't serve its purpose, the program is incomplete — go back to §1.
- **The spatial-sense test:** is every object in a zone that makes sense, is there clear circulation, are the **entrances right for the archetype** (a second exit/bolt-hole where escape matters; exactly **one** controlled door for a jail/vault/throne hall/shop), and is nothing blocking a walkway? A hearth in the middle of the floor, a kitchen nowhere near the bar, or a *choked* entrance fails it — re-arrange (§3).

Plus the **identity test** (inherited from `rpg-art-director`): does the map's material and light read as *this* campaign's look, not generic fantasy? Anchor to the style bible.

## What to avoid

- **Keyword-soup prompts.** Nano banana wants **narrative prose with explicit positions**, not comma-tag lists — "a long oak bar runs along the north wall, casks stacked on the wall behind it" beats "bar, oak, casks, north."
- **Objects with no functional home, and clutter in the walkways.** Every object belongs to a zone; aisles and doorways stay clear (the user's negatives say so, and so should the layout).
- **Perspective / isometric / angled views.** A battlemap is **top-down orthographic, flat-lay, no perspective** — say it, and negate the alternatives.
- **Generating or promising to generate the map.** Emit the prompt; document the manual nano-banana step; never claim to have made the image.
- **Re-designing the location's fiction.** Defer ecology/secrets/why-not-cleared to `rpg-location-creator`; lay out the tactical space from its dossier.
- **PF2e links / stat blocks.** System-agnostic: no Archives of Nethys URLs, no mechanics — pure function, space, and material.

## File output

Save loose Markdown in the user's working folder: `map-<type>-<slug>.md` (e.g. `map-tavern-the-drowned-oar.md`). Tell the user the path. Do **not** persist a vault entity and do **not** route through `rpg-preserve` — like the other system-agnostic creators, this skill produces GM-facing working material and hands off. Summarize Full outputs in chat and link rather than pasting the whole thing.
