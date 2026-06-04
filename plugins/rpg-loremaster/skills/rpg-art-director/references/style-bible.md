# The Visual Style Bible

The campaign's **visual identity** — the consistency layer every prompt inherits. It is the visual analogue of `tone-spectrum.md`: the tone spectrum dials *how much shadow* the fiction carries; the style bible dials *how that shadow looks*. Load this for Mode A (building it) and to anchor any Mode B prompt.

## Where it lives

A standalone companion file at the campaign root: **`campaign-visual-style-<slug>.md`** — sibling to `campaign-bible-<slug>.md` and `clue-map-<slug>.md`. Add a one-line pointer in the campaign bible's spine (`Visual style file: [path]`) so the conductor loads it on a cold start and injects it downward, the same way tone is inherited. One source of truth; never maintain two.

## What it holds

1. **Medium & rendering** — the look, kept generic (no living-artist names): *"dark-fantasy concept art, painterly, high detail"* / ink-and-wash / oil / etched. This becomes the **style anchor** prepended to every prompt.
2. **Core palette** — 3–5 colors that recur campaign-wide, tied to the central truth (*verdigris, bone-white, drowned-blue, lantern-amber*). Plus **sub-palettes** per major faction/region that deliberately bend the core so groups read distinct while still belonging to one world.
3. **Lighting language** — the mood-carrying default (*low-key chiaroscuro, cold rim light, light from below*). One sentence the eye can feel.
4. **Era & material sensibility** — period, architecture, costume, technology level, the textures that recur (wet stone, salt crust, tarnished bronze). Keeps anachronism out.
5. **Recurring motifs** — 1–3 symbols that thread through the art (drowned imagery, the open hand, names cut in stone) — the visual echo of the campaign's themes.
6. **Default negatives** — the campaign-wide keep-outs (*no modern elements, no bright cheerful palette, no clean heroic gloss*) — a short list, lean by default.
7. **Consistency conventions** — the seed/`--sref`/`--cref` habits the campaign uses (`prompt-targets.md`), and the rule against living-artist names.

## How tone feeds the visual treatment

The style bible **inherits the campaign's tone level** (default 3) and translates it into palette weight and lighting. The same subject rendered at different tones reads differently:

| Tone | Palette & light | Treatment |
|---|---|---|
| **1–2** | saturated, warm, high-key | clean heroic fantasy; clear forms, hopeful light |
| **3 ⭐ default** | muted with one cold accent; low-key with a warm rescue light | **dark-leaning**: grounded, shadowed, but legible and human — not bleak |
| **4** | desaturated, cold-dominant, harsh contrast | dark fantasy; oppressive, the shadow runs the frame |
| **5** | near-monochrome, sickly accents, crushed blacks | grimdark; render a content note in the file |

If the campaign bible records a per-section tone deviation, the style bible should note the matching visual deviation so prompts for that section don't get "corrected" back to the default.

## How prompts inherit it

Every Mode B prompt **prepends the style anchor** (medium + core palette + lighting language) and **honors the motifs and default negatives** — automatically, silently — unless the subject is a recorded deviation (a faction with its own palette). That single inherited string is what makes a portrait, a city shot, and an emblem read as the same campaign (`prompt-targets.md` → consistency levers). The visual DNA (`visual-dna.md`) supplies what's *different* about each image; the style bible supplies what's *the same*.

## Building it (Mode A)

Run the `co-creation.md` Part A loop on the four load-bearing decisions (medium, palette, lighting, era+motifs). Inherit tone and central truth from the campaign bible — the palette should *mean* something (the drowned-blue is the buried city; the verdigris is the rot under the gilt). Default the rest, name your defaults, and write the file (`output-template.md` has the skeleton). Keep it to a page: a style bible nobody reads is dead weight; the style anchor and the palette are the load-bearing lines.
