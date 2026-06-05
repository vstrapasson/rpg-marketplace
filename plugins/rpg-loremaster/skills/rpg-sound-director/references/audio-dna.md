# Audio DNA — the design engine

The toolkit for turning a scene's *description* into a music prompt. Load this for every prompt. It has three parts: the **slot anatomy** (what a prompt is made of), the **per-entity extraction** (where the sonic seed already lives), and the **function/use taxonomy** (what the track is *for*). The golden rule throughout: **every sonic element serves the scene's function — mood, threat, welcome, dread — never idle wallpaper** (inherited from `rpg-artifact-creator` §9, via `rpg-art-director`).

## 1. The slot anatomy

A prompt is assembled from eight slots. This is the **source of truth**; `prompt-targets.md` renders these slots into each provider's dialect. Build them in this order, leading with the genre/mood and the one defining sound:

1. **Genre / mood + the defining sound** — the overall feel, plus the single timbre or gesture that *carries the scene* (*"dark fantasy ambient, dread that won't resolve; a lone detuned cello over a sub-bass room-tone, water dripping in cavernous reverb"* — the detuned cello and the drip carry the wrongness and the place).
2. **Instrumentation** — 2–4 supporting voices (which instruments, acoustic or synth, solo or section) — concrete, not a whole orchestra dumped in.
3. **Tempo & key/modal feel** — pace (BPM or "slow/floating/driving") and tonal color (minor, modal, dissonant, drone-on-one-note), set by the **function** (§3).
4. **Texture & space** — sparse vs dense, dry vs cavernous reverb, near vs far, the room it lives in.
5. **Dynamics / intensity arc** — steady bed vs building swell vs sudden hit; how loud and how active, from the function.
6. **Sound anchor** — the instrumentation/era string prepended from the style bible (*"dark-fantasy orchestral, low strings and choir, period-acoustic"*) — generic, no living-artist/band names.
7. **Negative / keep-out** — what to exclude. Start **lean**; `no vocals, no spoken word` rides by default (the no-vocal rule) unless the scene is diegetically sung. Add only what intrudes (e.g. `no modern drum kit, no electric guitar` in an acoustic world).
8. **Length & loop** — duration and whether it must **loop seamlessly** (a bed) or is a **one-shot** (a stinger, a through-composed setpiece), from the use (§3).

If you can't name the defining sound (slot 1's second half), the prompt isn't ready — that's the difference between *this* scene and a generic fantasy loop.

## 2. Per-entity extraction — where the seed already lives

Each creator already plants sonic material. Pull it; don't reinvent it.

| Entity | Where the seed lives in the dossier | What to pull into the mood / instrumentation |
|---|---|---|
| **local / regiao** | the *fantastic feature & the feel*, the *sensory hook* | the ambience timbre + the atmosphere — what the place *sounds* like (dripping, wind, distant bells), rendered as instrumentation + texture |
| **city** | *the feature* — "the one image a visitor mentions first" | a soundscape signature as underscore (a market's hum, a cathedral's resonance), kept musical not literal SFX |
| **encontro** (combat) | the *threat level*, the enemy type & tactics | intensity + tempo + the antagonist's motif; danger you can feel before the dice |
| **desafio** (challenge / subsystem) | the *subsystem pressure*, the clock, the stakes | rhythmic urgency — a pulse, a ticking, a tightening — that mirrors the clock |
| **npc**-driven social scene | the NPC's *warmth or menace*, mannerism, contradiction | instrumentation warmth or chill; make the contradiction *audible* (a sweet melody over a cold drone) |
| **faccao** | the *aesthetic / trait markers* — symbol, theme, ritual | a faction **sonic motif** — an instrument or interval that means "them" whenever they're near |
| **sessao / scene** (free brief) | the *read-aloud* / the situation's key beat | the single dramatic mood — the one feeling the moment needs to land |

When the seed is thin (a description heavy on plot but silent on atmosphere), **fill the gap from the node, not from genre defaults**: a threat and a place imply a tempo and a timbre; let those drive the sound, then name what you inferred so the user can correct it.

## 3. The function / use taxonomy

The **function** decides dynamics, length, and loop. Confirm it in intake (`co-creation.md`). This is the audio analogue of `art-director`'s use/framing table.

| Function | Use | Length | Loop | Intensity | Notes |
|---|---|---|---|---|---|
| **Ambient bed** | explore / wander a place | long (60–180s) | seamless loop | low, steady | sparse; the floor under play — must not fatigue on repeat |
| **Tension / dread** | investigation, lurking threat | medium (45–120s) | loop | low→mid, simmering | dissonance that doesn't resolve; no melody to latch onto |
| **Combat / action** | a fight | medium (60–120s) | loop | high, driving | propulsive pulse; period percussion, **no modern kit** unless the world allows it |
| **Social / hub** | tavern, court, market | long | loop | low–mid, warm | melodic, near-diegetic; sits under conversation |
| **Downtime / rest** | safe haven, recovery, montage | long | loop | low, consonant | gentle, restorative; the rare place the tension lifts |
| **Setpiece / boss theme** | a climactic scene | medium (90–150s) | loop or through-composed | high, motif-forward | the antagonist's motif front and center; the one track allowed to be a *theme* |
| **Stinger / reveal** | a beat — a door, a twist, a death | short (3–10s) | one-shot | spike | punctuation, not a bed; bind as an ambient-sound one-shot, not a playlist loop |
| **Diegetic song** | a character performs in-fiction | song-length | one-shot | varies | **VOCAL** — the only vocal case; route to **Suno** (`prompt-targets.md`) |

Beds and hubs demand **seamless looping** (they play for minutes under exploration); stingers and setpieces are **one-shots**. Match the length/loop to where the track will end up — `rpg-soundscape-forge` binds a looping bed to the scene's Ambience playlist and a one-shot to an `AmbientSound` placeable or a `soundboard` slot (`output-template.md` → the manifest).

## 4. The two coherence tests (run before rendering)

- **The identity test** — would this read as *this* campaign? Sound anchor + instrumentation + ≥1 motif from the style bible must be present. If it would fit any generic fantasy setting, anchor it.
- **The function test** — do the dynamics/intensity match what the scene is *doing* (dread = unresolved and low; combat = driving and high)? A track that's pretty but fights the scene's function failed it; re-shape slot 5 to the function.

Pass both, and the prompt is ready to render into provider dialects (`prompt-targets.md`).
