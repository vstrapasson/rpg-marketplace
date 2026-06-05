# Soundscape policy — how to bind a soundtrack in Foundry

Decisions for realizing the manifest. The manifest (`soundtrack-manifest-<slug>.md`, authored by `rpg-sound-director`) tells you *what* and *where*; this file is *how*.

## Playlist-per-scene vs one campaign-ambience playlist

Two valid shapes — pick from the manifest's structure and the campaign's size:

- **Playlist-per-scene (default for session/encounter compiles).** One `Playlist` per scene that has a bed (named for the scene), bound to that scene's Ambience. Cleanest mapping; activating the scene plays exactly its bed. Use when each scene has its own track.
- **One campaign-ambience playlist (a curated bank).** A single `Playlist` holding many tracks; bind the right `soundId` per scene via `set-scene-playlist({ sceneId, playlistId, soundId })`. Use when many scenes share a small pool of moods, or the GM wants one place to manage volume. Heavier to wire per scene; lighter to browse.

When unsure, default to **playlist-per-scene** — it's the direct analogue of one scene = one lit map, and re-runs stay idempotent (match the per-scene playlist by name with `list-playlists`).

## Scene playlist vs AmbientSound — which binding

The manifest's **bind-as** column decides; honor it:

- **`scene playlist`** → a **looping bed** for the whole scene (explore/tension/combat/social/downtime). `create-playlist` + `set-scene-playlist`. Auto-plays on scene activation; no position. This is the common case.
- **`AmbientSound (one-shot)`** → a **localized or triggered cue** (a bard performing at the hearth, a fountain, a forge, a reveal stinger). `create-ambient-sound` with `repeat:false` for one-shots, `repeat:true` for a positional loop (a waterfall). It lives at an (x, y) on the canvas with a radius, and (by default) respects walls — so it's only audible near its source.

A diegetic sung track (Suno, from a bard) is almost always an **AmbientSound one-shot** the GM triggers when the performance happens — not a looping scene bed.

## Volume / loop / fade conventions

- **Volume** is 0–1 and is **underscore, not foreground** — beds sit low (0.3–0.5) so they don't fight table voices; a featured diegetic performance can sit higher (0.6–0.8). Take the manifest's volume; nudge toward these defaults if it's silent.
- **Loop** (`PlaylistSound.repeat`) — **true for beds** (they play for minutes under exploration), **false for one-shots** (stingers, songs). The manifest's Loop column maps straight to `loop`.
- **Fade** (ms) — a short crossfade (1000–2000ms) on a bed avoids a jarring cut on scene change; one-shots usually need none. Optional; default 0 unless the manifest asks.

## The Data-relative path rule

Audio paths must be **Foundry Data-relative** — `worlds/<world>/audio/<name>.ogg` — never a remote URL or an absolute filesystem path (same constraint as token `imagePath`). The file must already be in the Foundry data dir; this skill binds it, it does not upload it. There is no MCP file-stat tool, so a wrong path produces a **silent track** (the PlaylistSound/AmbientSound still gets created) — confirm placement with the GM, and verify by activating the scene.

## Idempotency

Before creating, `list-playlists` and match by name; an existing playlist for this scene → reuse/update, don't duplicate. The conductor records `{ playlistId, soundIds, sceneBound }` in the build manifest, so a re-run skips already-bound scenes — the same guard scene-forge uses for `sceneId`.
