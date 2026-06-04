---
name: rpg-art-director
description: Designs image-generation prompts for a tabletop campaign and gives the whole campaign one coherent visual identity — system-agnostic, for any image model. Two modes. (A) It establishes a campaign visual style bible (medium, palette, lighting, era, recurring motifs) — the visual analogue of the tone spectrum, inherited by every prompt so portraits, scenes, and tokens share a look. (B) It extracts the visual DNA already latent in a vault entity's description (an NPC's tell, a location's fantastic feature, a faction's aesthetic markers, an item's material) and renders ready-to-paste prompts, multi-target and SDXL-first (Stable Diffusion / ComfyUI primary, plus Midjourney and Flux / DALL·E on request). It emits prompts only — image generation stays a documented manual step. Use to create an art prompt, gerar a arte de um NPC/local/cena, montar a identidade visual da campanha, prompt para token/retrato/mapa, art prompt for my NPC, scene, faction emblem, or to set up a campaign style bible. Default tone dark-leaning (level 3 of 5).
---

# RPG Art Director (system-agnostic, dark-leaning by default)

## What this skill is for

Turn the fiction the kit already wrote into **image-generation prompts**, and keep every image **looking like the same campaign**. The worldbuilding skills describe how a place *feels* and how an NPC's tell *reads*; this skill converts that latent visual material into prompts you can paste into an image generator — and anchors all of them to one campaign **visual style bible** so the art coheres instead of drifting model-to-model, session-to-session.

This skill is **system-agnostic** — it deals in subject, mood, composition, and palette, never stat blocks, item levels, or Archives of Nethys links. Like `rpg-npc-creator` and `rpg-artifact-creator`, it works for any system.

The default tone is **dark-leaning (level 3 of 5)** — the visual register inherits the campaign's tone; it does not reset it. See `references/style-bible.md`.

## The honest boundary — this skill writes prompts, not images

Image *generation* is not callable from here. The project's local pipeline (`local/comfyui-gen-token.py` → ComfyUI on `:8000`, then `local/cutout-token.py`) is a manual step the GM runs, and the `generate-map` MCP tool only makes top-down battlemaps. **So this skill emits the prompt and documents the path to realize it** — exactly the *narrative-handout pattern* (`rpg-journal-forge`): you generate the PNG, drop it into the Foundry data dir, and an existing forge skill assigns it. The skill never calls ComfyUI itself; it says so plainly and hands off. See `references/output-template.md` → "Realizing the art."

## The core idea — visual coherence AND every image serving the story

Two layers, inseparable, mirroring how the rest of the kit works:

1. **The campaign's visual identity (the style bible).** Medium and rendering, a core palette, a lighting language, an era and material sensibility, recurring motifs — the visual analogue of the campaign's tone level. Every prompt inherits it, so a portrait, a city establishing shot, and a faction emblem read as one world. This is the **consistency layer**.
2. **The entity's visual DNA (the prompt).** The creators already plant the seed: an NPC's *one or two telling details*, a location's *fantastic feature & the feel*, a city's *one image a visitor mentions*, a faction's *aesthetic markers*, an item's *material and the detail that shows its story*. This skill extracts that DNA and renders it as a prompt where **every visual element serves the node** — provenance, cost, or identity — never idle decoration.

Drop the style bible and your art drifts; drop the visual DNA and you get a generic fantasy stock image that could belong to any campaign.

## The two modes

- **Mode A — Style bible.** Establish or update the campaign's visual identity. Run it once early (after the foundation exists, so it inherits tone and central truth), then update as the world grows. Output: `campaign-visual-style-<slug>.md` + a one-line pointer in the campaign bible. See `references/style-bible.md`.
- **Mode B — Art prompt.** Render prompt(s) for one entity or a scene. Pull its visual DNA, pick the use/framing, inherit the style bible, render multi-target. Output: `art-<type>-<slug>.md`. See `references/visual-dna.md` and `references/prompt-targets.md`.

If no style bible exists when the user asks for a prompt, offer to sketch a quick one first (5 lines) — coherence is cheap up front and expensive to retrofit.

## When to use this skill

Trigger when the user wants an image prompt or a campaign look — "art prompt for this NPC", "gerar a arte do vilão / do local", "a prompt for a token", "an establishing shot of the city", "the faction's emblem", "set up my campaign's visual style", "montar a identidade visual da campanha" — or when they paste a "Ready for `rpg-art-director`" handoff from another dossier.

Do **not** trigger for:
- **Relics / artifacts** — `rpg-artifact-creator` already renders an art prompt for the object as part of its dossier. This skill can *re-render* that prompt multi-target or for a new framing, but it doesn't design the relic.
- **Actually generating the image** — that's the manual ComfyUI/external step (see the honest boundary above).
- **Assigning art in Foundry** — token art is `rpg-actor-forge`, narrative handouts are `rpg-journal-forge`. This skill feeds them; it doesn't place files.

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — see `references/co-creation.md`. Decide the mode; for a prompt, gather the entity (or its dossier), the **use/framing**, and confirm the style bible to inherit.
2. **Mode A → build the style bible** — medium, palette, lighting, era/material, motifs, per-region/faction sub-keys, the negatives to avoid. See `references/style-bible.md`.
3. **Mode B → extract the visual DNA** — pull the seed from the entity's existing description; fill gaps the description leaves; keep every element serving the node. See `references/visual-dna.md`.
4. **Render the prompt(s)** — from the DNA + the style bible, render SDXL (primary) plus Midjourney / Flux / DALL·E on request, with the right aspect ratio for the use. See `references/prompt-targets.md`.
5. **Present, document realization, and hand off** — save the file, show how to generate-and-import (manual pipeline), and leave off-stage notes. See `references/output-template.md`.

Read references by context. Don't load all of them.

## Step 2: Read references as needed

Five reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end for both modes. **Load before intake.**
- **`references/visual-dna.md`** — the design engine: extracting visual DNA per entity type, the use/framing taxonomy, the slot anatomy, the "every element serves the story" rule. **Load for every prompt.**
- **`references/prompt-targets.md`** — the multi-target rendering engine (SDXL-first, Midjourney, Flux/DALL·E), the aspect-ratio table, and the cross-image consistency levers. **Load when rendering.**
- **`references/style-bible.md`** — the campaign visual style bible: what it holds, how it inherits tone, where it lives, how prompts inherit it. **Load for Mode A, and to anchor any prompt.**
- **`references/output-template.md`** — the skeletons (style bible file, art-prompt block, loose file naming) and the "Realizing the art" manual pipeline + Foundry handoff. **Load when ready to write.**

## Coherence — the thing that matters most

Art coheres when **every prompt serves the node and inherits the campaign look.** Two tests:

- **The identity test:** does this prompt visibly belong to *this* campaign — its palette, its medium, its motifs from the style bible? A prompt that would fit any generic fantasy setting failed it; prepend the style anchor and a motif.
- **The story test:** does every visual element trace to the entity's node — a tell that shows a wound, a feature that shows provenance, a marker that shows allegiance? A detail that ties to nothing is decoration — cut it or connect it (the rule inherited from `artifact-creator` §9).

Two failure modes:
1. **The stock fantasy image.** Technically fine, campaign-blind — no style bible inheritance, no motif. Fix: anchor to the bible.
2. **The pretty but storyless render.** Gorgeous, but the tell/feature/marker isn't in the frame. Fix: bake the story detail into the subject slot.

## What to avoid

- **Generating or promising to generate the image.** Emit the prompt; document the manual pipeline; never claim to have made art.
- **Living-artist names in style strings.** Use medium/movement/era descriptors ("dark-fantasy concept art, painterly") — not "in the style of [living artist]." (Inherited house rule from the artifact recipe.)
- **Idle description.** Every slot earns its place by showing provenance, cost, or identity.
- **Re-setting tone.** The visual register inherits the campaign's tone level (default dark-leaning 3); a brighter or darker treatment is a recorded deviation, not a default.
- **Re-designing relics.** Defer artifacts to `rpg-artifact-creator`; only re-render its prompt here.
- **Private campaign content in examples.** Reference-file examples use generic or clearly-public material only.
- **PF2e links / stat blocks.** System-agnostic: no Archives of Nethys URLs, no mechanics — pure subject and mood.

## File output

Save loose Markdown in the user's working folder: `campaign-visual-style-<slug>.md` (Mode A) and `art-<type>-<slug>.md` (Mode B, e.g. `art-npc-mother-cholva.md`). Tell the user the path. Do **not** persist a vault entity and do **not** route through `rpg-preserve` — like the other system-agnostic creators, this skill produces GM-facing working material and hands off. For Full outputs, summarize in chat and link rather than pasting the whole thing.
