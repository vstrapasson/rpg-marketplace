# Output Template

Skeletons for the three artifacts this skill writes — the **style bible file** (Mode A), the **music-prompt file** (Mode B), and the **soundtrack manifest** (the per-campaign handoff to `rpg-soundscape-forge`) — plus the **Realizing the soundtrack** section that documents the manual generation/bind pipeline. All are loose GM-facing Markdown in the working folder; nothing here is a vault entity and nothing routes through `rpg-preserve`.

**Match the user's language** in prose and headings; keep provider parameter syntax (`--seconds`, `[Chorus]`) and file paths as-is.

---

## A. The style bible file — `campaign-audio-style-<slug>.md`

```markdown
# Audio Style — <Campaign Name>

**Tone level:** [N] of 5 — [label] (inherited from the campaign bible)
**One-line sound:** [the campaign in a sonic phrase — "a drowned city of slow bells and grief no one names"]

## Sound anchor (prepend to every prompt)
`[lead instrumentation + tonal register — e.g. "dark-fantasy orchestral, low strings and choir, prepared piano, minor/modal, period-acoustic"]`

## Instrumentation palette
- **Core:** [the recurring voices, with what each *means*]
- **Sub-palettes:** [faction/region → its bent instrumentation], …

## Mood & tonal register
[the default tonal color — one sentence]

## Tempo & rhythm
[pace, and whether the world has a pulse or floats]

## Era & material sound
[period, acoustic-vs-synth line, recurring timbres]

## Recurring sonic motifs
[1–3 musical signatures that thread through — what each means]

## Default negatives
[short campaign-wide keep-out list — includes `no vocals, no spoken word` by default]

## Loudness & loop conventions
[underscore-not-foreground; beds loop, stingers are one-shots; provider/length habits]

## Deviations (recorded)
[any section/faction whose tone/sound bends the default — so prompts aren't "corrected"]
```

Keep it to a page. The **sound anchor** and the **motifs** are the load-bearing lines — they're what every prompt inherits.

---

## B. The music-prompt file — `audio-<type>-<slug>.md`

The audio DNA is shown first (the reasoning), then the rendered prompt(s). **Compact** renders the Stable Audio Open target only; **Full** adds Suno (if sung) or other requested providers.

```markdown
# Audio — [Scene / Entity Name] ([function: ambient bed / tension / combat / social / downtime / setpiece / stinger / diegetic song])

> **Tool, not canon** — paste into a music generator and customize freely.

**Inherits:** `campaign-audio-style-<slug>.md` (sound anchor + instrumentation + motifs)
**Diegetic?** [no → instrumental] / [yes → a performer in-fiction; vocals allowed via Suno]

## Audio DNA
- **Genre/mood + defining sound:** [the one timbre/gesture that carries the scene]
- **Instrumentation:** [2–4 voices]
- **Tempo & key/modal feel:** [pace + tonal color]
- **Texture & space:** [sparse/dense, dry/cavernous]
- **Dynamics / intensity:** [from the function]
- **Length & loop:** [from the function — seamless loop or one-shot]

## Stable Audio Open (primary — local ComfyUI)
**Prompt:** *[slots 1→6 as flowing prose, with an approximate BPM and named instruments]*
**Negative:** *[lean — `no vocals, no spoken word` + only what intrudes]*
**Seconds:** [e.g. 45] · **Loop:** [yes/no]

<!-- Full adds, on request: -->
## Suno (only if diegetic / sung)
**Style:** *[genre + instrumentation + mood, compact]*
**Lyrics:**
*[Verse] … / [Chorus] …*  (one-shot — bind as a triggered cue, not a loop)

## Other provider (on request)
*[neutral prompt bent to that provider's dialect — see `prompt-targets.md` registry]*

## Realize it
[the one-line pointer to the pipeline below + the manifest row written]
```

---

## C. The soundtrack manifest — `soundtrack-manifest-<slug>.md`

**The contract `rpg-soundscape-forge` consumes.** One per campaign; append a row each time you render a Mode B prompt. The columns are exactly what the forge skill needs to create the Playlist, bind the scene's Ambience, or place an `AmbientSound` — it never re-derives anything from the prose files.

```markdown
# Soundtrack Manifest — <Campaign Name>

> Authored by `rpg-sound-director`; realized by `rpg-soundscape-forge`. Paths are **Foundry Data-relative** (no remote URLs). Files are dropped into `worlds/<world>/audio/` by the GM after generation.

| Scene / local | Function | Prompt file | Provider | Expected filename | Data-relative path | Loop | Volume | Channel | Bind-as |
|---|---|---|---|---|---|---|---|---|---|
| Cripta dos Ossos | tension / dread | audio-local-cripta-dos-ossos.md | stable-audio-open | cripta-bed.ogg | worlds/<world>/audio/cripta-bed.ogg | yes | 0.5 | environment | scene playlist |
| Taverna do Caldeirão | social / hub | audio-local-taverna.md | stable-audio-open | taverna-bed.ogg | worlds/<world>/audio/taverna-bed.ogg | yes | 0.4 | music | scene playlist |
| Bardo canta (Taverna) | diegetic song | audio-scene-bardo.md | suno | bardo-lament.ogg | worlds/<world>/audio/bardo-lament.ogg | no | 0.7 | — | AmbientSound (one-shot) |
| Porta se abre (revelação) | stinger / reveal | audio-scene-porta.md | stable-audio-open | porta-stinger.ogg | worlds/<world>/audio/porta-stinger.ogg | no | 0.8 | — | AmbientSound (one-shot) |
```

**Column notes for the forge skill:**
- **Bind-as `scene playlist`** → `create-playlist` (a looping bed) + `set-scene-playlist` (the scene's Ambience auto-plays on activation).
- **Bind-as `AmbientSound (one-shot)`** → `create-ambient-sound` (a placeable / triggered cue), `loop: no`.
- **Loop** → the PlaylistSound `repeat` flag. **Volume** → 0–1.
- **Channel** → the Foundry mixer channel each track routes to, so it gets an **independent live master fader** in the Playlists sidebar. Values: `music` (melodic bed/theme), `environment` (ambience/drone you fade on its own), `interface` (soundboard/UI clicks). Blank → `music`. **Auto by role** when you don't override: a path under `music/` or `motifs/` → `music`; under `ambience/` (or any drone/texture loop) → `environment`; a soundboard/`sfx/` click → `interface`. For a **layered `simultaneous` bed** (music + ambience as separate tracks in one playlist — list them as sibling rows sharing the Scene/local), split the tracks across `music`/`environment` so the GM can pull the ambience down without touching the music. AmbientSound one-shots aren't channel-routed — leave `—`.
- The **Scene / local** name is matched to the Foundry scene `rpg-scene-forge` created (the forge resolves it to a `sceneId`).
- The **Prompt file** column is **provenance only** — the GM's trace back to the `audio-<type>-<slug>.md` that produced the track. `rpg-soundscape-forge` ignores it; it binds the generated file, not the prompt.

---

## D. Realizing the soundtrack — the manual pipeline (document, don't automate)

This skill emits prompts; it does **not** generate audio or bind it in Foundry. Hand the user the path honestly:

1. **Generate** —
   - *Instrumental (the majority):* `python3 local/gen-music.py "<Stable Audio Open prompt>" --neg "<negative>" --seconds <N>` drives ComfyUI on `:8000` and prints the audio path. (Other providers via their adapter / web UI — `prompt-targets.md`.)
   - *Diegetic / sung:* paste the **Suno** style + lyrics at suno.com, generate, download.
2. **Convert if needed** — Foundry streams `.ogg`/`.m4a`/`.flac` best; if your generator emits `.wav`, convert (`ffmpeg -i in.wav out.ogg`). (Kept a manual step so the generator stays dependency-free.)
3. **Place the file** in the Foundry data dir (Data-relative path): `worlds/<world>/audio/<name>.ogg` — matching the manifest's **Data-relative path** column.
4. **Bind it** via `rpg-soundscape-forge` — this skill hands off, it doesn't place or bind:
   - It reads `soundtrack-manifest-<slug>.md`, creates the `Playlist`, sets the scene's Ambience (`set-scene-playlist`), and places one-shot `AmbientSound` cues. *Serialize per scene — parallel audio writes on one scene clobber each other.*
   - **Pre-Phase-2 fallback (no MCP audio tools yet):** import by hand — Foundry → Playlists → create → add the file → drag onto the scene's Ambience tab.

State plainly that steps 1–3 are the GM's to run, and that automated binding requires the foundry-mcp **audio tools** (the forge preflight reports if they're missing, and degrades to "scenes still build, soundtrack skipped").

---

## E. Off-stage handoffs

End every output with a structured list:

- → `rpg-soundscape-forge`: this track (once generated and dropped in `worlds/<world>/audio/`) + its manifest row, for the Playlist / scene Ambience / `AmbientSound` bind
- → a creator (`rpg-faction-creator` / a location-creator / `rpg-npc-creator`): if the prompt's scene names a node that doesn't exist yet
- → `rpg-campaign-conductor`: register/refresh `campaign-audio-style-<slug>.md` as the campaign's injected sonic identity
- → Sound notes: any deviation from the style bible (a faction's own instrument, a scene that lifts the no-vocal rule), so the sound stays intentional
