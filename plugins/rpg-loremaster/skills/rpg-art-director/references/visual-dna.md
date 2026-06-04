# Visual DNA — the design engine

The toolkit for turning an entity's *description* into an image prompt. Load this for every prompt. It has three parts: the **slot anatomy** (what a prompt is made of), the **per-entity extraction** (where the visual seed already lives), and the **use/framing taxonomy** (what the image is *for*). The golden rule throughout: **every visual element serves the node — provenance, cost, or identity — never idle decoration** (inherited from `rpg-artifact-creator` §9).

## 1. The slot anatomy

A prompt is assembled from eight slots. This is the **source of truth**; `prompt-targets.md` renders these slots into each model's dialect. Build them in this order, leading with the subject and the one telling detail:

1. **Subject + the telling detail** — what it is, plus the single feature that *shows the story* (*"a wolf-blooded beastkin scout, one ear notched, eyes that catch light like an animal's"* — the notch and the eyes carry the wound and the heritage).
2. **Key attributes** — 2–4 supporting specifics (build, costume, materials, age, bearing) — concrete, not exhaustive.
3. **Composition / framing** — how it sits in frame (bust / full figure / centered object / wide vista), set by the **use** (§3).
4. **Lighting** — mood-carrying, from the style bible's lighting language (*"low-key, cold light from below, deep shadow"*).
5. **Palette** — 2–3 colors from the style bible (campaign core, or a faction/region sub-palette).
6. **Style anchor** — the medium/rendering string prepended from the style bible (*"dark-fantasy concept art, painterly, high detail"*) — generic, no living-artist names.
7. **Negative / keep-out** — what to exclude. Start **lean** (SDXL rewards restraint — `prompt-targets.md`); add only what intrudes.
8. **Aspect ratio** — from the use (§3).

If you can't name the telling detail (slot 1's second half), the prompt isn't ready — that's the difference between *this* character and a generic figure.

## 2. Per-entity extraction — where the seed already lives

Each creator already plants visual material. Pull it; don't reinvent it.

| Entity | Where the seed lives in the dossier | What to pull into the subject slot |
|---|---|---|
| **npc** | the *Appearance* line (one or two telling details), the voice/mannerism, the contradiction | the telling detail + demeanor that shows the wound/belief; make the contradiction *visible* (the gentle face, the scarred hands) |
| **local / regiao** | the *fantastic feature & the feel*, the sensory hook | the defining image + the atmosphere — the one thing the PCs notice first |
| **city** | *the feature* — "the one image a visitor mentions first" | that image, concrete and specific ("a cathedral grown in a dead titan's ribcage") |
| **faccao** | the *aesthetic / trait markers* — symbol, color, a brand, a coin | the recurring mark rendered as heraldry, or a member's silhouette wearing it |
| **item** (non-relic) | material + the detail that shows its use/history | the object + the wear/mark that tells where it's been |
| **artifact / relic** | already has an art prompt in its dossier | re-render multi-target or for a new framing; don't redesign — defer to `rpg-artifact-creator` |
| **scene** (free brief) | the read-aloud / the situation's key beat | the single dramatic moment — who/what, the terrain feature, the light |

When the seed is thin (a description heavy on personality but light on looks), **fill the gap from the node, not from genre defaults**: a belief and a wound imply a bearing and a tell; let those drive the visual, then name what you inferred so the user can correct it.

## 3. The use / framing taxonomy

The **use** decides composition and aspect ratio. Confirm it in intake (`co-creation.md`).

| Use | Subject | Framing | Aspect ratio | Notes |
|---|---|---|---|---|
| **Token** | npc / creature | bust or full figure, **plain/neutral background**, centered | **1:1** | Background must cut out cleanly (rembg) → transparent PNG. Keep it isolated. |
| **Portrait** | npc | head-and-shoulders or 3/4, evocative background | **2:3** (vertical) | The character study; mood background allowed. |
| **Establishing shot** | local / regiao / city | wide, the fantastic feature dominant, atmosphere-heavy | **16:9** (or 21:9) | The place as a vista; the feel carries it. |
| **Emblem / heraldry** | faccao | the symbol centered, flat or crest-like, plain field | **1:1** | Iconographic, not a scene; readable at small size. |
| **Object study** | item | single object centered, museum-plate, plain dark ground | **1:1** | Material and the telling detail in focus. |
| **Scene handout** | a moment | the situation's key beat, cinematic | **3:2** | For a `journal-forge` handout; a dramatic still, not a battlemap. |

Tokens and emblems demand **isolation** (plain background) because they get cut out or placed small; establishing shots and scenes want **atmosphere**. Match the framing to where the image will end up (`output-template.md` → Realizing the art).

## 4. The two coherence tests (run before rendering)

- **The identity test** — would this read as *this* campaign? Style anchor + palette + ≥1 motif from the style bible must be present. If it would fit any generic fantasy setting, anchor it.
- **The story test** — does the subject slot carry a detail that shows the node (the wound, the provenance, the allegiance)? If the frame is pretty but storyless, bake the tell into slot 1.

Pass both, and the prompt is ready to render into model dialects (`prompt-targets.md`).
