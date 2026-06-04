# Output Template

Skeletons for the two artifacts this skill writes — the **style bible file** (Mode A) and the **art-prompt file** (Mode B) — plus the **Realizing the art** section that documents the manual generation/import pipeline. Both files are loose GM-facing Markdown in the working folder; nothing here is a vault entity and nothing routes through `rpg-preserve`.

**Match the user's language** in prose and headings; keep model parameter syntax (`--ar`, `--cref`) and file paths as-is.

---

## A. The style bible file — `campaign-visual-style-<slug>.md`

```markdown
# Visual Style — <Campaign Name>

**Tone level:** [N] of 5 — [label] (inherited from the campaign bible)
**One-line look:** [the campaign in a visual phrase — "a drowned city lit only from below"]

## Style anchor (prepend to every prompt)
`[medium + rendering, generic — e.g. "dark-fantasy concept art, painterly, high detail"]`

## Palette
- **Core:** [3–5 colors, with what each *means*]
- **Sub-palettes:** [faction/region → its bent palette], …

## Lighting language
[the mood-carrying default — one sentence]

## Era & material sensibility
[period, architecture, costume, recurring textures]

## Recurring motifs
[1–3 symbols that thread through the art]

## Default negatives
[short campaign-wide keep-out list]

## Consistency conventions
[seed / --sref / --cref habits; no living-artist names]

## Deviations (recorded)
[any section whose tone/look bends the default — so prompts aren't "corrected"]
```

Keep it to a page. The **style anchor** and the **palette** are the load-bearing lines — they're what every prompt inherits.

---

## B. The art-prompt file — `art-<type>-<slug>.md`

The visual DNA is shown first (the reasoning), then the rendered prompt(s). **Compact** renders the SDXL target only; **Full** renders all requested targets plus an optional variant look.

```markdown
# Art — [Entity Name] ([use: token / portrait / establishing / emblem / object / scene])

> **Tool, not canon** — paste into an image generator and customize freely.

**Inherits:** `campaign-visual-style-<slug>.md` (style anchor + palette + motifs)

## Visual DNA
- **Subject + telling detail:** [the one thing that shows the story]
- **Attributes:** [2–4 concrete specifics]
- **Composition / framing:** [from the use]
- **Lighting:** [from the style bible]
- **Palette:** [core, or a sub-palette]
- **Aspect ratio:** [from the use]

## SDXL (primary — local ComfyUI)
**Positive:** *[slots 1→6 as flowing prose]*
**Negative:** *[lean — only what intrudes]*
**Size:** [e.g. 832×1216 for 2:3]

<!-- Full adds, on request: -->
## Midjourney
*[comma phrases] --ar [W:H] --style raw [--cref/--sref if a recurring subject/look]*

## Flux / DALL·E
*[detailed prose paragraph; ratio in words]*

## Variant look (Full, optional)
[a second framing or a "later state" — e.g. the same NPC wounded, the same place at night —
 same style anchor + subject so it reads as the same thing, further along]

## Realize it
[the one-line pointer to the pipeline below + where the PNG lands]
```

---

## C. Realizing the art — the manual pipeline (document, don't automate)

This skill emits prompts; it does **not** generate or place images. Hand the user the path honestly:

1. **Generate** — run the prompt through any generator. Local default: `python3 local/comfyui-gen-token.py "<SDXL positive>" --neg "<negative>" [--size 1024]` drives ComfyUI on `:8000` and prints the PNG path(s). (Midjourney/Flux/DALL·E externally if preferred.)
2. **For a token only** — cut out the background (rembg runs in its own venv): `./.rembg-venv/bin/python local/cutout-token.py IN.png OUT.png` → transparent PNG.
3. **Place the file** in the Foundry data dir (Data-relative path), by use:
   - token → `worlds/<world>/tokens/<name>.png`
   - narrative handout / portrait / scene → `worlds/<world>/handouts/<name>.png`
4. **Assign it** via the existing forge skills — this skill hands off, it doesn't place:
   - **Token** → `rpg-actor-forge`: `update-token(tokenId, { imagePath: "worlds/<world>/tokens/<name>.png" })`. *Serialize per scene — parallel token updates on one scene clobber each other.*
   - **Narrative handout** → `rpg-journal-forge`: a journal entry with `<img src="worlds/<world>/handouts/<name>.png">`; the GM clicks **Show Players** (a one-click GM action — there's no MCP tool for it).

State plainly that steps 1–3 are the GM's to run, and that token art/handout assignment requires ComfyUI live + the `update-token imagePath` patch (the forge preflight reports if either is missing).

---

## D. Off-stage handoffs

End every output with a structured list:

- → `rpg-actor-forge`: this token image, once generated and cut out, for `update-token imagePath`
- → `rpg-journal-forge`: this portrait/scene as a narrative handout `<img>`
- → a creator (`rpg-npc-creator` / `rpg-faction-creator` / a location-creator): if the prompt's subject names a node that doesn't exist yet
- → `rpg-campaign-conductor`: register/refresh `campaign-visual-style-<slug>.md` as the campaign's injected visual identity
- → Style notes: any deviation from the style bible (a faction's own palette), so the look stays intentional
