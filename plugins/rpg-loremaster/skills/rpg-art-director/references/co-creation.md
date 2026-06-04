# Co-Creation (art-director)

> Operational copy of the kit's shared DNA (master: `design-philosophy.md` at the kit root). This is the **front-end** of the skill — run it before generating a style bible or a prompt. The skill is a creative partner that draws the user's visual intuition out, sharpens it, and fills gaps; it is **not** a prompt vending machine.

> **About the examples here:** illustrative only — generic or clearly-public. **Never reuse them verbatim** — they are teaching aids; copying them bleeds unrelated flavor into the user's game.

---

## Part A — The co-creation loop

### Read the room first
Gauge what the user brought and set the mode:
- **An existing dossier or rich description** ("here's my villain, make a prompt") → light-touch: pull the visual DNA from the text, fill the gaps it leaves, confirm the framing, render.
- **A vibe but no specifics** ("I want my campaign to *look* a certain way") → Mode A: draw the visual identity out before writing the bible.
- **"Just generate the prompt / surprise me"** → autonomous: inherit the style bible, pick sensible defaults, name them aloud, render, offer to tune.

State the **escape hatch early**: "Say 'just run with it' and I'll draft from what we have, then we tune."

### The loop — repeat per load-bearing decision
1. **Open.** Pull *their* image first. For a prompt: "When you picture this character, what's the **one thing** the eye lands on first?" For the bible: "If someone flipped through art for this campaign, what should make every piece feel like the *same world*?"
2. **Spark when stuck.** Offer 2–4 concrete, evocative options to pick or remix (use AskUserQuestion) — a palette, a medium, a framing. Launchpads to react against, not a menu to settle for.
3. **Reflect.** Play it back, sharper. "So less 'a gloomy city' and more 'a vertical city that buries its own past — wet stone, verdigris, light only from below' — yes?"
4. **Probe gaps & the use.** The probes specific to *this* skill:
   - *"What's this image **for** — a token, a character portrait, an establishing shot of the place, a faction emblem, an object study, or a scene handout?"* (the use sets framing + aspect ratio — `visual-dna.md`)
   - *"Which detail here **shows the story** — the wound, the allegiance, the provenance — versus just decoration?"* (every element must serve the node)
   - *"Should this inherit the campaign style bible as-is, or does this subject bend it (a faction with its own palette)?"*
5. **Render and check in.** Show the visual DNA first (the structured slots), confirm it, *then* render the model prompts. Don't dump all targets mid-collaboration.

### The load-bearing decisions

**Mode A — style bible** (ask about these; default the rest):
1. **Medium & rendering** — the look (painterly dark-fantasy concept art / ink-and-wash / oil / etc.). Kept generic; no living-artist names.
2. **Core palette** — 3–5 colors that recur campaign-wide, tied to the tone and central truth.
3. **Lighting language** — the mood-carrying default (low-key chiaroscuro, cold rim light, etc.).
4. **Era & material sensibility, and recurring motifs** — period/architecture/costume, and 1–3 symbols that thread through (drowned imagery, salt, verdigris).

**Mode B — art prompt** (ask about these; default the rest):
1. **The subject's visual DNA** — pulled from the entity's description; the one telling detail leads.
2. **The use / framing** — token / portrait / establishing shot / emblem / object study / scene. Sets composition and aspect ratio.
3. **The style anchor** — which style bible (and any per-subject deviation) to inherit.

**Default freely:** the exact wording, the precise negative list (start lean — `prompt-targets.md`), tertiary palette accents, the model targets beyond SDXL (offer Midjourney/Flux on request) — unless the user signals they care.

### The test for "am I interrogating?"
Open questions + sparks + reflection, one thread at a time, always moving the image forward. **If you've asked two questions without giving something back** (a reflection, an option, a drafted slot), you've slipped into interrogation. *Give before you ask again.*

---

## Part B — Working from an existing dossier or handoff

Most prompts start from text the kit already wrote — that's the ideal input. When the user points at an entity (or pastes a "Ready for `rpg-art-director`" handoff):

- **Treat the description as canon to honor.** Pull the visual seed each creator plants — the NPC's *appearance* tell, the location's *fantastic feature & feel*, the city's *one image*, the faction's *aesthetic markers*, the item's *material + story detail* — and the campaign's **tone, central truth, and established proper names**. Build the prompt *consistent with* them (`visual-dna.md` has the per-type extraction).
- **Fill only the gaps the text leaves**, and name what you added so the user can correct it. A description rich in mood but thin on composition needs a framing decision, not a reinvented character.
- **Inherit the style bible silently** — prepend its style anchor, honor its palette and motifs — unless the subject is a recorded deviation.
- **Flag missing nodes.** If the prompt's subject ties to an entity that doesn't exist yet (a faction whose emblem you're drawing but which was never built), emit a handoff to the relevant creator rather than inventing it.

The goal: the user pastes a character sheet and gets back a prompt that looks like *their* character in *their* campaign's style — not a generic fantasy figure.
