---
name: rpg-sound-director
description: Designs music-generation prompts for a tabletop campaign and gives the whole campaign one coherent sonic identity — system-agnostic, for any music model. Two modes. (A) It establishes a campaign audio style bible (instrumentation, mood, tempo, era/material sound, recurring sonic motifs) — the sonic analogue of the tone spectrum, inherited by every prompt so the tavern, the dungeon, and the boss theme sound like one world. (B) It extracts the audio DNA already latent in a scene or vault entity (a location's feel and sensory hook, an encounter's threat, a faction's aesthetic, an NPC-driven social beat) and renders ready-to-paste, provider-neutral music prompts, primary-target Stable Audio Open (local ComfyUI), with Suno for the rare sung scene. Instrumental by default; vocals only when a bard or singer is performing in-fiction. It emits prompts and a soundtrack manifest only — audio generation and Foundry binding stay separate steps. Use to create an audio/music prompt, gerar a trilha de uma cena/local, montar a identidade sonora da campanha, soundtrack for my dungeon/tavern/boss fight, a music cue for this scene, or to set up a campaign audio style bible. Default tone dark-leaning (level 3 of 5).
---

# RPG Sound Director (system-agnostic, dark-leaning by default)

## What this skill is for

Turn the fiction the kit already wrote into **music-generation prompts**, and keep every scene **sounding like the same campaign**. The worldbuilding skills describe how a place *feels*, how an encounter's threat *reads*, how a tavern *welcomes*; this skill converts that latent sonic material into prompts you can paste into a music generator — and anchors all of them to one campaign **audio style bible** so the soundtrack coheres instead of drifting scene-to-scene, model-to-model.

This skill is **system-agnostic** — it deals in mood, instrumentation, tempo, and texture, never stat blocks, item levels, or Archives of Nethys links. Like `rpg-npc-creator`, `rpg-artifact-creator`, and `rpg-art-director`, it works for any system. It is the **sonic analogue of `rpg-art-director`**: same shape, different sense.

The default tone is **dark-leaning (level 3 of 5)** — the sonic register inherits the campaign's tone; it does not reset it. See `references/style-bible.md`.

## The honest boundary — this skill writes prompts, not music

Music *generation* is not callable from here. The project's local pipeline (`local/gen-music.py` → ComfyUI on `:8000`, running **Stable Audio Open** for instrumental tracks) is a manual step the GM runs, and there is **no MCP tool that generates audio**. Sung scenes go to **Suno** (best vocals; web UI only — no public API — so the skill emits a paste-ready prompt). **So this skill emits the prompt + a soundtrack manifest and documents the path to realize it** — exactly the *narrative-handout pattern* (`rpg-art-director`, `rpg-journal-forge`): you generate the track, drop it into the Foundry data dir, and an existing forge skill (`rpg-soundscape-forge`) binds it to the scene. The skill never calls ComfyUI, Suno, or Foundry itself; it says so plainly and hands off. See `references/output-template.md` → "Realizing the soundtrack."

## The core idea — sonic coherence AND every track serving the scene

Two layers, inseparable, mirroring how the rest of the kit works:

1. **The campaign's sonic identity (the style bible).** A signature instrumentation palette, a mood/tonal default, a tempo and rhythm sensibility, an era and material sound, recurring sonic motifs — the sonic analogue of the campaign's tone level. Every prompt inherits it, so a dungeon bed, a market hub, and the antagonist's theme read as one world. This is the **consistency layer**.
2. **The scene's audio DNA (the prompt).** The creators already plant the seed: a location's *fantastic feature & the feel* and *sensory hook*, an encounter's *threat level*, a faction's *aesthetic markers*, an NPC's *warmth or menace*. This skill extracts that DNA and renders it as a prompt where **every sonic element serves the scene's function** — explore, tension, combat, social, downtime, reveal — never idle wallpaper.

Drop the style bible and your soundtrack drifts; drop the audio DNA and you get a generic fantasy loop that could belong to any campaign.

## The no-vocal default — the audio-specific judgment

**Instrumental by default.** A soundtrack is underscore: it sets mood under the table's voices, so vocals fight the players and the GM for the same channel. **Generate vocals only when the music is *diegetic*** — a bard performing, a tavern singer, a ritual chant, a choir heard through a door — i.e. when a character in the fiction is actually making the sound. Those, and only those, route to **Suno** (the one provider whose vocals are worth the manual paste). Everything else is instrumental, and the style bible's default negatives carry `no vocals, no spoken word`. State this rule when intake reveals a musical scene; don't silently add a singer to a dungeon.

## The two modes

- **Mode A — Audio style bible.** Establish or update the campaign's sonic identity. Run it once early (after the foundation exists, so it inherits tone and central truth), then update as the world grows. Output: `campaign-audio-style-<slug>.md` + a one-line pointer in the campaign bible. See `references/style-bible.md`.
- **Mode B — Music prompt.** Render prompt(s) for one scene, `local`, encounter, or beat. Pull its audio DNA, pick the function/use, inherit the style bible, render provider-neutral (primary Stable Audio Open; Suno only if sung). Output: `audio-<type>-<slug>.md`, and append a row to the campaign's `soundtrack-manifest-<slug>.md`. See `references/audio-dna.md` and `references/prompt-targets.md`.

If no style bible exists when the user asks for a prompt, offer to sketch a quick one first (5 lines) — coherence is cheap up front and expensive to retrofit.

## When to use this skill

Trigger when the user wants a music prompt or a campaign sound — "music/soundtrack prompt for this scene", "gerar a trilha da cripta / da taverna", "a cue for the boss fight", "ambience for this region", "set up my campaign's audio style", "montar a identidade sonora da campanha" — or when they paste a "Ready for `rpg-sound-director`" handoff from another dossier.

Do **not** trigger for:
- **Actually generating the audio** — that's the manual `local/gen-music.py` / Suno step (see the honest boundary above).
- **Binding audio in Foundry** — playlists, scene Ambience, and ambient-sound placeables are `rpg-soundscape-forge`. This skill feeds it; it doesn't place files or call MCP.
- **Image art** — that's `rpg-art-director`. (This skill is its audio sibling; they share structure, not scope.)

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — see `references/co-creation.md`. Decide the mode; for a prompt, gather the scene (or its dossier), the **function/use**, the diegetic-or-underscore call, and confirm the style bible to inherit.
2. **Mode A → build the style bible** — instrumentation, mood, tempo/rhythm, era/material sound, sonic motifs, the default negatives (incl. no-vocal). See `references/style-bible.md`.
3. **Mode B → extract the audio DNA** — pull the seed from the scene/entity's existing description; fill gaps it leaves; keep every element serving the function. See `references/audio-dna.md`.
4. **Render the prompt(s)** — from the DNA + the style bible, render the provider-neutral prompt and the Stable Audio Open target (primary); Suno only for a sung scene; note length/loop/intensity. See `references/prompt-targets.md`.
5. **Present, log the manifest, document realization, and hand off** — save the file, append the manifest row, show how to generate-and-bind (manual pipeline → `rpg-soundscape-forge`), and leave off-stage notes. See `references/output-template.md`.

Read references by context. Don't load all of them.

## Step 2: Read references as needed

Five reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end for both modes. **Load before intake.**
- **`references/audio-dna.md`** — the design engine: extracting audio DNA per scene/entity type, the function/use taxonomy, the slot anatomy, the "every element serves the scene" rule. **Load for every prompt.**
- **`references/prompt-targets.md`** — the provider seam: the provider registry (Stable Audio Open primary, Suno for vocals, others documented), the length/loop/intensity table, and how to add a new provider. **Load when rendering.**
- **`references/style-bible.md`** — the campaign audio style bible: what it holds, how it inherits tone, where it lives, how prompts inherit it. **Load for Mode A, and to anchor any prompt.**
- **`references/output-template.md`** — the skeletons (style bible file, music-prompt block, the soundtrack manifest) and the "Realizing the soundtrack" manual pipeline + `rpg-soundscape-forge` handoff. **Load when ready to write.**

## Coherence — the thing that matters most

A soundtrack coheres when **every prompt serves the scene's function and inherits the campaign sound.** Two tests:

- **The identity test:** does this prompt visibly belong to *this* campaign — its instrumentation, its tonal register, its sonic motif from the style bible? A prompt that would fit any generic fantasy setting failed it; prepend the sound anchor and a motif.
- **The function test:** does every sonic element serve what the scene is *doing* — a dread drone for investigation, a driving pulse for combat, a warm hearth-tone for the tavern? A texture that ties to nothing is wallpaper — cut it or connect it (the rule inherited from `artifact-creator` §9, via `art-director`).

Two failure modes:
1. **The stock fantasy loop.** Technically fine, campaign-blind — no style bible inheritance, no motif. Fix: anchor to the bible.
2. **The pretty but functionless cue.** Lovely, but it doesn't do the scene's job (a soaring theme under a tense stealth scene). Fix: match the dynamics/intensity to the function.

## What to avoid

- **Generating or promising to generate audio.** Emit the prompt; document the manual pipeline; never claim to have made music.
- **Vocals by default.** Instrumental unless the scene is diegetically musical (see the no-vocal default); a sung track is a recorded, deliberate choice routed to Suno.
- **Living-artist / band names in style strings.** Use genre/era/instrumentation descriptors ("dark-fantasy orchestral, low strings and choir") — not "in the style of [living artist/band]." (Inherited house rule from `art-director`.)
- **Idle texture.** Every sonic element earns its place by serving the scene's function or carrying a motif.
- **Re-setting tone.** The sonic register inherits the campaign's tone level (default dark-leaning 3); a brighter or darker treatment is a recorded deviation, not a default.
- **Binding audio in Foundry.** Defer playlists / scene Ambience / ambient-sound to `rpg-soundscape-forge`; this skill only feeds it.
- **Private campaign content in examples.** Reference-file examples use generic or clearly-public material only.
- **PF2e links / stat blocks.** System-agnostic: no Archives of Nethys URLs, no mechanics — pure mood and sound.

## File output

Save loose Markdown in the user's working folder: `campaign-audio-style-<slug>.md` (Mode A), `audio-<type>-<slug>.md` (Mode B, e.g. `audio-local-cripta-dos-ossos.md`), and append to `soundtrack-manifest-<slug>.md` (the per-campaign manifest `rpg-soundscape-forge` consumes). Tell the user the paths. Do **not** persist a vault entity and do **not** route through `rpg-preserve` — like the other system-agnostic creators, this skill produces GM-facing working material and hands off. For Full outputs, summarize in chat and link rather than pasting the whole thing.
