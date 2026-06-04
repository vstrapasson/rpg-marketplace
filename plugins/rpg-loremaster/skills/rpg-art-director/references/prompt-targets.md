# Prompt Targets — rendering the visual DNA per model

The visual DNA (the eight slots in `visual-dna.md`) is the source of truth; this file renders it into each image model's dialect. **SDXL is primary** (it's the local ComfyUI pipeline the GM actually runs); Midjourney and Flux / DALL·E are offered on request. Different models want different things — render to each model's strengths rather than pasting one generic string everywhere.

> Examples below are generic teaching aids — **do not reuse verbatim.**

## SDXL / Stable Diffusion (primary — the local ComfyUI pipeline)

The default target: `local/comfyui-gen-token.py "<positive>" --neg "<negative>"` drives ComfyUI's HTTP API on `:8000` (character checkpoint for figures/tokens, the battlemap checkpoint only via `generate-map`). SDXL wants **descriptive natural-language prose**, not tag soup, and a **lean negative** (less-is-more — long SD1.5-style negative lists hurt more than help).

- **Positive** = slots 1→6 woven into flowing description: subject + telling detail, attributes, composition, lighting, palette, style anchor. Write like a photographer/painter describing a finished piece.
- **Negative** = only what actually intrudes. Start with a short staple (*"text, watermark, signature, extra limbs, lowres, deformed"*) and add per-generation, not preemptively. If an unwanted element keeps appearing, first try *removing* the word pulling toward it from the positive.
- **Aspect ratio** = set via the generation size (e.g. 832×1216 ≈ 2:3 portrait, 1024×1024 = 1:1 token, 1216×832 ≈ 3:2). Note the intended ratio so the GM sets `--size`/dimensions.

**Example (a portrait, generic):**
> **Positive:** *Dark-fantasy concept art, painterly, high detail. Head-and-shoulders portrait of a weather-worn harbor healer in her fifties, grey hair scraped back, one eyebrow scarred white; she sorts vials with steady hands, her expression closed. Cold rim light off wet stone, deep shadow, low-key. Palette of verdigris, bone-white, and drowned-blue. Vertical 2:3.*
> **Negative:** *text, watermark, extra fingers, lowres, modern clothing, cheerful bright lighting*

## Midjourney

Midjourney wants **comma-separated descriptive phrases** followed by **double-dash parameters**. It's the strongest for stylized consistency across many images.

- **Phrase order:** subject + telling detail, attributes, composition, lighting, palette, style anchor.
- **Parameters:** `--ar <W:H>` (aspect ratio for the use), `--style raw` (less Midjourney "house" beautification — better for grounded dark fantasy), `--v <latest>`. Add `--no <thing>` for hard excludes.
- **Consistency levers (the reason to reach for MJ):** `--cref <image-url> [--cw 0–100]` keeps a **character's** face/features across images; `--sref <image-url>` keeps a **style** consistent across the whole set — the per-campaign visual anchor in practice. Seed with the first approved render, then `--cref`/`--sref` it forward.

**Example (a faction emblem, generic):**
> *Heraldic emblem, a single open hand submerged in dark water, fingers spread, salt crust at the wrist, flat crest on a plain field, stark iconographic, verdigris and drowned-blue on bone-white, dark-fantasy concept art --ar 1:1 --style raw --no text*

## Flux / DALL·E

Both want **detailed natural-language prose** and reward precise, even technical description; Flux has the best prompt adherence and text rendering, DALL·E the most conversational interface. Render the slots as a single rich paragraph (closer to the SDXL positive than to MJ's comma list), naming composition and lighting explicitly. No weights or `--params`. For a ratio, state it in words ("a wide cinematic establishing shot, ~16:9") or use the tool's size control.

**Example (an establishing shot, generic):**
> *A wide cinematic establishing shot of a vertical city built down into a flooded gorge, tier on tier of wet green-black stone, the only light rising from lantern-barges far below so the towers are lit from beneath. Mist, verdigris and drowned-blue palette, oppressive scale, dark-fantasy concept art, painterly, high detail. Roughly 16:9.*

## Aspect ratio by use (quick reference)

| Use | Ratio | SDXL size (approx) |
|---|---|---|
| Token | 1:1 | 1024×1024 |
| Portrait | 2:3 | 832×1216 |
| Establishing shot | 16:9 (or 21:9) | 1344×768 |
| Emblem / heraldry | 1:1 | 1024×1024 |
| Object study | 1:1 | 1024×1024 |
| Scene handout | 3:2 | 1216×832 |

## Cross-image consistency — making a campaign's art cohere

The whole point of the style bible is that the art *matches*. Levers, cheapest first:

1. **Prepend the style anchor** (medium + palette + lighting language) from `campaign-visual-style-<slug>.md` to **every** prompt — same string, every image. This alone gets you 80% of the coherence.
2. **Reuse the seed** (SDXL) for variations of the same subject so the look holds.
3. **`--sref`** (Midjourney) from one approved "look" image to lock style across the set; **`--cref`** to lock a recurring character's face across scenes.
4. **Per-faction / per-region sub-palettes** (from the style bible) deliberately *bend* the core palette so groups read as distinct while still belonging to one world — note the deviation in the prompt.

When the user asks for "the same character again" or "another scene in this style," reach for the consistency levers before re-describing from scratch.
