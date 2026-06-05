# The Audio Style Bible

The campaign's **sonic identity** — the consistency layer every prompt inherits. It is the audio analogue of `tone-spectrum.md` and the sibling of `campaign-visual-style-<slug>.md`: the tone spectrum dials *how much shadow* the fiction carries; the audio style bible dials *how that shadow sounds*. Load this for Mode A (building it) and to anchor any Mode B prompt.

## Where it lives

A standalone companion file at the campaign root: **`campaign-audio-style-<slug>.md`** — sibling to `campaign-bible-<slug>.md`, `clue-map-<slug>.md`, and `campaign-visual-style-<slug>.md`. Add a one-line pointer in the campaign bible's spine (`Audio style file: [path]`) so the conductor loads it on a cold start and injects it downward, the same way tone and visual style are inherited. One source of truth; never maintain two.

## What it holds

1. **Instrumentation palette** — the recurring voices, kept generic (no living-artist/band names): *"low strings, choir, prepared piano, bowed metal"* / *"solo woodwinds and harp"* / *"drones and hand percussion"*. The lead instruments become the **sound anchor** prepended to every prompt.
2. **Mood & tonal register** — the default tonal color (minor, modal, dissonant, consonant) and how warm or cold the world sounds, tied to the central truth. Plus **per-faction/region sub-palettes** that deliberately bend the core so groups read distinct while still belonging to one world.
3. **Tempo & rhythm sensibility** — the default pace, and whether the world has a **pulse** (a heartbeat, a ticking clock, a tolling) or **floats** (ametric drones, rubato). One sentence the ear can feel.
4. **Era & material sound** — period, the acoustic vs synthetic line, the timbres that recur (gut strings, animal-skin drums, bronze bells, wet-stone reverb). Keeps anachronism out — no synth pads in a bronze-age world unless deliberate.
5. **Recurring sonic motifs** — 1–3 musical signatures that thread through (a falling minor third for the antagonist, a single bell that means the drowned city, a bowed-metal shimmer for the uncanny) — the sonic echo of the campaign's themes.
6. **Default negatives** — the campaign-wide keep-outs, lean by default. **`no vocals, no spoken word` lives here** (the no-vocal default — diegetic sung scenes override it per-prompt), plus anachronisms to bar (*no modern drum kit, no electric guitar, no EDM build-ups*).
7. **Loudness & loop conventions** — beds loop seamlessly and sit low under play; stingers are one-shots; the target loudness is "underscore, not foreground." The provider/length habits the campaign uses (`prompt-targets.md`).

## How tone feeds the sonic treatment

The style bible **inherits the campaign's tone level** (default 3) and translates it into tonal register and density. The same scene scored at different tones sounds different:

| Tone | Tonal register & density | Treatment |
|---|---|---|
| **1–2** | major/modal, consonant, full and warm | clean heroic fantasy; singable themes, bright brass and strings |
| **3 ⭐ default** | minor with a warm thread, mostly consonant with bite | **dark-leaning**: grounded and shadowed but still human and melodic — not bleak |
| **4** | dissonant-leaning, cold, sparse | dark fantasy; drones and clusters run the frame, melody is rationed |
| **5** | atonal, harsh, near-silence and sudden noise | grimdark; render a content note in the file (sudden loud hits, unsettling textures) |

If the campaign bible records a per-section tone deviation, the style bible should note the matching sonic deviation so prompts for that section don't get "corrected" back to the default.

## How prompts inherit it

Every Mode B prompt **prepends the sound anchor** (lead instrumentation + tonal register) and **honors the motifs and default negatives** — automatically, silently — unless the scene is a recorded deviation (a faction with its own instrument, a diegetic sung scene that lifts the no-vocal rule). That single inherited string is what makes a dungeon bed, a market hub, and the antagonist's theme sound like the same campaign (`prompt-targets.md` → consistency). The audio DNA (`audio-dna.md`) supplies what's *different* about each track; the style bible supplies what's *the same*.

## Building it (Mode A)

Run the `co-creation.md` Part A loop on the four load-bearing decisions (instrumentation, mood/register, tempo/rhythm, era+motifs). Inherit tone and central truth from the campaign bible — the instrumentation should *mean* something (the bowed metal is the uncanny under the surface; the lone cello is the grief no one names). Default the rest, name your defaults, and write the file (`output-template.md` has the skeleton). Keep it to a page: a style bible nobody reads is dead weight; the sound anchor and the motifs are the load-bearing lines.
