# Co-Creation (sound-director)

> Operational copy of the kit's shared DNA (master: `design-philosophy.md` at the kit root). This is the **front-end** of the skill — run it before generating a style bible or a prompt. The skill is a creative partner that draws the user's sonic intuition out, sharpens it, and fills gaps; it is **not** a prompt vending machine.

> **About the examples here:** illustrative only — generic or clearly-public. **Never reuse them verbatim** — they are teaching aids; copying them bleeds unrelated flavor into the user's game.

---

## Part A — The co-creation loop

### Read the room first
Gauge what the user brought and set the mode:
- **An existing dossier or rich description** ("here's my crypt scene, make a track") → light-touch: pull the audio DNA from the text, fill the gaps it leaves, confirm the function/use, render.
- **A vibe but no specifics** ("I want my campaign to *sound* a certain way") → Mode A: draw the sonic identity out before writing the bible.
- **"Just generate the prompt / surprise me"** → autonomous: inherit the style bible, pick sensible defaults, name them aloud, render, offer to tune.

State the **escape hatch early**: "Say 'just run with it' and I'll draft from what we have, then we tune."

### The loop — repeat per load-bearing decision
1. **Open.** Pull *their* sound first. For a prompt: "When this scene starts and the players go quiet, what's the **first thing they should hear** — a sound, an instrument, a silence?" For the bible: "If someone listened to a whole session's soundtrack, what should make every track feel like the *same world*?"
2. **Spark when stuck.** Offer 2–4 concrete, evocative options to pick or remix (use AskUserQuestion) — an instrumentation, a tempo feel, a mood. Launchpads to react against, not a menu to settle for.
3. **Reflect.** Play it back, sharper. "So less 'spooky dungeon music' and more 'a low room-tone drone, a single detuned cello, water dripping in real reverb — no melody, just dread that doesn't resolve' — yes?"
4. **Probe gaps, the function, and the diegetic call.** The probes specific to *this* skill:
   - *"What is this track **doing** — a bed to explore over, dread for an investigation, drive for a fight, warmth for a hub, a stinger for a reveal?"* (the function sets dynamics, length, and loop — `audio-dna.md`)
   - *"Is the music **in the fiction** (a bard is playing, a singer in the tavern) or is it **underscore** the characters can't hear?"* (diegetic → maybe vocals via Suno; underscore → instrumental — the no-vocal default)
   - *"Which sound here **carries the scene** — the threat, the welcome, the wrongness — versus just filling space?"* (every element must serve the function)
   - *"Should this inherit the campaign sound bible as-is, or does this place/faction bend it (its own instrument, its own motif)?"*
5. **Render and check in.** Show the audio DNA first (the structured slots), confirm it, *then* render the model prompt. Don't dump every provider target mid-collaboration.

### The load-bearing decisions

**Mode A — style bible** (ask about these; default the rest):
1. **Instrumentation palette** — the recurring sound (orchestral strings & choir / solo woodwinds & harp / drones & prepared piano / drums & horns). Kept generic; no living-artist or band names.
2. **Mood & tonal register** — tied to the tone level: how much dissonance, major vs minor, warm vs cold.
3. **Tempo & rhythm sensibility** — the default pace and whether the world has a pulse (a ticking, a heartbeat) or floats.
4. **Era & material sound, and recurring motifs** — period-appropriate timbres (no synths in a bronze-age world unless deliberate), and 1–3 sonic motifs that thread through (a falling minor third for the antagonist, a bell that means the drowned city, a bowed-metal shimmer for the uncanny).

**Mode B — music prompt** (ask about these; default the rest):
1. **The scene's audio DNA** — pulled from the entity/scene description; the function leads.
2. **The function / use** — ambient bed / tension / combat / social / downtime / setpiece / stinger / diegetic song. Sets dynamics, length, loop. (`audio-dna.md` §3.)
3. **The sound anchor** — which style bible (and any per-scene deviation) to inherit.
4. **Diegetic or underscore** — the vocal gate. Underscore is instrumental; a sung diegetic performance routes to Suno.

**Default freely:** the exact wording, the precise negative list (start lean — `prompt-targets.md`), secondary instrumentation accents, the provider targets beyond Stable Audio Open (offer Suno only when sung; others on request) — unless the user signals they care.

### The test for "am I interrogating?"
Open questions + sparks + reflection, one thread at a time, always moving the sound forward. **If you've asked two questions without giving something back** (a reflection, an option, a drafted slot), you've slipped into interrogation. *Give before you ask again.*

---

## Part B — Working from an existing dossier or handoff

Most prompts start from text the kit already wrote — that's the ideal input. When the user points at a scene or entity (or pastes a "Ready for `rpg-sound-director`" handoff):

- **Treat the description as canon to honor.** Pull the sonic seed each creator plants — the location's *fantastic feature & feel* and *sensory hook*, the encounter's *threat*, the city's *one image*, the faction's *aesthetic markers*, the NPC's *warmth or menace* — and the campaign's **tone, central truth, and established proper names**. Build the prompt *consistent with* them (`audio-dna.md` has the per-type extraction).
- **Fill only the gaps the text leaves**, and name what you added so the user can correct it. A description rich in mood but silent on pace needs a tempo/function decision, not a reinvented place.
- **Inherit the style bible silently** — prepend its sound anchor, honor its instrumentation and motifs — unless the scene is a recorded deviation.
- **Honor the diegetic line.** If the scene names a performer (a bard at the hearth), that — and only that — is the vocal case; otherwise stay instrumental.
- **Flag missing nodes.** If the prompt's scene ties to an entity that doesn't exist yet (a faction whose theme you're scoring but which was never built), emit a handoff to the relevant creator rather than inventing it.

The goal: the user points at a scene and gets back a prompt that sounds like *their* scene in *their* campaign's voice — not a generic fantasy loop.
