# Prompt Targets — the provider seam

The audio DNA (the eight slots in `audio-dna.md`) is the source of truth. This file is the **provider seam**: it renders the slots into each music model's dialect and records each provider's constraints, so the canonical artifact stays **provider-neutral** and adding a new provider (cloud or local) is a one-row change, not a rewrite. **Stable Audio Open is primary** (it's the local ComfyUI pipeline the GM actually runs, via `local/gen-music.py`); **Suno** is the vocal target (sung scenes only); everything else is documented and slots in when wanted.

> Examples below are generic teaching aids — **do not reuse verbatim.**

## The canonical artifact is provider-neutral

Always write the prompt **once, neutrally** (genre/mood + defining sound, instrumentation, tempo/key, texture/space, dynamics, sound anchor, negatives, length/loop — `audio-dna.md` §1). That neutral prompt is what lands in `audio-<type>-<slug>.md` and the manifest. Each provider below is an **adapter**: it takes the neutral prompt and bends it to that provider's dialect and limits. The realization side (`rpg-soundscape-forge`) never sees a provider — it consumes the resulting audio file + bind metadata. Swap Stable Audio Open for Mubert and nothing downstream changes (this is the kit's ports-and-adapters habit).

## Provider registry

| Provider | Role | Prompt dialect | Max length | Loop? | Vocals? | License (commercial) | Cost | Automation |
|---|---|---|---|---|---|---|---|---|
| **Stable Audio Open** | **primary, instrumental** | natural-language prose; describe genre, instruments, BPM, mood; lean negative | ~47s/gen (loop or extend) | yes (designed for loops) | weak — treat as instrumental-only | ✅ Stability Community License (free < $1M rev) | $0 (local GPU) | ✅ `local/gen-music.py --provider stable-audio-open` (ComfyUI :8000) |
| **Suno** | **vocal / diegetic song** | a short **style** line + **lyrics** block; structured `[Verse]/[Chorus]` tags | full song (mins) | one-shot (not seamless) | ✅ best-in-class | ✅ on paid tiers (Pro ~$8/mo) | ~$8–10/mo | ✋ web UI only (no public API) → emit paste-ready prompt |
| **ACE-Step** | local, instrumental **or** vocal | prose + optional lyrics | mins | yes | ✅ decent, automatable | ✅ MIT (fully free) | $0 (local GPU) | ✅ (add adapter) — the local vocal option if you'd rather not paste into Suno |
| **Mubert** | cloud ambient/loops | tag/keyword + duration via REST | configurable | yes (royalty-free loops) | no | ✅ royalty-free, all tiers | ~$14/mo | ✅ REST API (add adapter) |
| **Stability AI (hosted)** | cloud, instrumental | same prose as Stable Audio Open | ~3min | yes | weak | ✅ paid tiers | ~$0.20/track | ✅ REST API (add adapter) |
| **Replicate / fal (MusicGen)** | cloud, instrumental | prose | ~30s | partial | no | ⚠️ **MusicGen weights are CC-BY-NC — non-commercial; output rights murky** | ~$0.06/track | ✅ REST API (add adapter) — **avoid for shared/monetized campaigns** |
| **ElevenLabs Music** | cloud, instrumental+some vocal | prose | short clips | partial | some | ✅ paid tiers | ~$22+/mo | ✅ REST API (add adapter) |

**The licensing gotcha:** MusicGen's open weights are **CC-BY-NC (non-commercial)** and the licensing of third-party hosted MusicGen output is unclear. Don't default to it for a campaign you might share or monetize. The commercial-safe paths are **Stable Audio Open** (local), **ACE-Step** (local, MIT), and the explicit paid tiers of Mubert / Stability / Suno.

## Stable Audio Open (primary — the local ComfyUI pipeline)

The default target: `local/gen-music.py "<prompt>" --neg "<negative>" --seconds <N>` drives ComfyUI's HTTP API on `:8000` running Stable Audio Open. It wants **descriptive natural-language prose** naming genre, **instruments**, an approximate **BPM**, mood, and space — and a **lean negative**.

- **Prompt** = slots 1→6 woven into flowing description: genre/mood + defining sound, instrumentation, tempo/key, texture/space, dynamics, sound anchor. Write like a composer describing a finished cue. Including an explicit BPM and named instruments helps the model lock the feel.
- **Negative** = only what intrudes. `no vocals, no spoken word` rides by default (the no-vocal rule); add `no modern drum kit, no electric guitar` etc. per-world.
- **Length / loop** = set via `--seconds` (Stable Audio Open generates up to ~47s per pass; for a longer bed, generate a clean loopable section and let Foundry's playlist repeat it). Note the intended loop in the manifest so `rpg-soundscape-forge` sets `repeat: true`.

**Example (a dungeon ambient bed, generic):**
> **Prompt:** *Dark-fantasy ambient underscore, slow and unresolved, ~60 BPM. A sub-bass room-tone drone under a lone detuned cello and distant bowed metal; sparse, cavernous reverb, water dripping far off. Low dynamics, no melody to latch onto — dread that doesn't resolve. Low strings and choir pads at the edge of hearing. Seamless loop.*
> **Negative:** *vocals, spoken word, modern drum kit, electric guitar, upbeat, major key, bright*
> **Seconds:** 45 (loopable bed) · **Loop:** yes

## Suno (vocal — diegetic sung scenes only)

When the scene is **diegetically musical** (a bard performs, a tavern singer, a ritual chant — the no-vocal default lifts), render for Suno and tell the user to paste it at suno.com (no public API). Suno wants a short **style descriptor** and a **lyrics block** with structure tags.

- **Style line** = genre + instrumentation + mood, compact (*"medieval folk ballad, solo voice and lute, mournful, modal"*).
- **Lyrics** = `[Verse]` / `[Chorus]` blocks; write in the campaign's voice, honoring proper names and the scene's emotional beat. Keep it short — a performance, not an album.
- **Note:** Suno tracks are one-shots, not seamless loops; bind as a one-shot (a `soundboard`/`AmbientSound` cue the GM triggers when the bard plays), not a looping bed.

**Example (a tavern singer's lament, generic):**
> **Style:** *medieval folk ballad, lone female voice with lute and low drone, mournful, modal, period-acoustic*
> **Lyrics:**
> *[Verse] Down where the green water swallowed the bell, / they cut the names that no one could spell …*
> *[Chorus] And the tide came in, and the tide came in …*

## How to add a provider (the recipe)

The seam is built to extend. To add, say, Mubert:

1. **Add a registry row** above with its role, dialect, limits, license, cost, and automation path.
2. **If it's paste-only** (like Suno), that's it — render the neutral prompt into its dialect in `audio-<type>-<slug>.md` and tell the user where to paste.
3. **If it has an API and you want automation**, add an **adapter function** to `local/gen-music.py`'s `PROVIDERS` registry (the script is a provider dispatcher: each adapter takes the neutral prompt + params and returns the output file path). No change is needed anywhere downstream — the manifest carries a `provider` column and `rpg-soundscape-forge` is provider-agnostic.
4. **Record the license** in the row. If outputs aren't clearly commercial-safe, flag it like the MusicGen gotcha above.

Keep the neutral prompt the source of truth; a provider is only ever a rendering of it.

## Length / loop / intensity (quick reference)

Cross-references `audio-dna.md` §3 — set these from the function:

| Function | Length | Loop | Intensity |
|---|---|---|---|
| Ambient bed | long (loop a ~45s section) | seamless | low, steady |
| Tension / dread | medium | seamless | low→mid, simmering |
| Combat / action | medium | seamless | high, driving |
| Social / hub | long | seamless | low–mid, warm |
| Downtime / rest | long | seamless | low, consonant |
| Setpiece / boss | medium | loop or one-shot | high, motif-forward |
| Stinger / reveal | short (3–10s) | one-shot | spike |
| Diegetic song | song-length | one-shot | varies (Suno) |
