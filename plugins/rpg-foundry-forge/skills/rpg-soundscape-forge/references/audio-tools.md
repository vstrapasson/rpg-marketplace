# Audio tools — the foundry-mcp audio surface (foundry-mcp 0.9.0+)

The MCP audio tools this skill drives, their friendly args, and how each maps to Foundry internals. Added in foundry-mcp **0.9.0** (Foundry module + MCP server). These are a LOCAL extension to the cloned foundry-vtt-mcp repo — a `git pull`/reinstall can revert them, so the conductor preflight re-checks every run.

## Preflight probe (optional dependency — degrade, don't block)

Audio binding is optional. Probe whether the tools exist before building; if absent, **skip the soundtrack — scenes still build**, and tell the user exactly what's skipped (the same shape as the geometry / `imagePath` / ComfyUI checks in `rpg-forge-conductor/references/preflight-checks.md`). A cheap probe: call `list-playlists` — if the tool is unavailable (unknown tool / error), the audio surface isn't installed.

## `create-playlist` — a Playlist (world document) + tracks

`create-playlist({ name, mode?, fade?, sounds: [{ path, name?, volume?, loop?, fade?, channel? }] })`

| Friendly field | Foundry internal |
|---|---|
| `name` | `Playlist.name` |
| `mode` (`sequential`\|`shuffle`\|`simultaneous`\|`soundboard`) | `Playlist.mode` → `CONST.PLAYLIST_MODES` (0 / 1 / 2 / -1) |
| `fade` (ms) | `Playlist.fade` |
| `sounds[].path` | `PlaylistSound.path` (Data-relative) |
| `sounds[].volume` (0–1) | `PlaylistSound.volume` |
| `sounds[].loop` | `PlaylistSound.repeat` |
| `sounds[].name` | `PlaylistSound.name` (default: filename without extension) |
| `sounds[].channel` (`music`\|`environment`\|`interface`) | `PlaylistSound.channel` → `CONST.AUDIO_CHANNELS` (default `music`) |

Returns `{ success, playlistId, name, soundIds: [...] }`. Use `soundId` from this when pinning a single track on a scene.

**Channels = independent live faders.** Each `PlaylistSound.channel` routes the track to one of Foundry's three mixer channels, each with its own master slider in the Playlists sidebar. Split a layered `simultaneous` bed across channels so the GM can drop the ambience without touching the music. Take the manifest's **Channel** column verbatim; when it's blank, **auto by role** — a path under `music/` or `motifs/` → `music`; under `ambience/` (or any drone/texture loop) → `environment`; a soundboard/`sfx/` click → `interface`; otherwise `music`. Omitting `channel` keeps the prior behavior (everything on `music`).

## `set-scene-playlist` — bind a playlist to a scene's Ambience

`set-scene-playlist({ playlistId, sceneId?, soundId? })`

| Friendly field | Foundry internal |
|---|---|
| `playlistId` | `Scene.playlist` |
| `soundId` (optional) | `Scene.playlistSound` (pin one track) |
| `sceneId` (optional) | target scene; default the active scene (`game.scenes.current`) |

Returns `{ success, sceneId, sceneName, playlistId, soundId }`. The bound playlist auto-plays when the scene is activated (the scene's *Ambience* tab).

## `create-ambient-sound` — positional/triggered cues on the active scene

`create-ambient-sound({ sounds: [{ path, x, y, radius?, volume?, walls?, easing?, repeat? }] })`

| Friendly field | Foundry internal (`AmbientSound`) |
|---|---|
| `path` | `path` (Data-relative) |
| `x`, `y` | scene-pixel position |
| `radius` | audible radius in scene distance units (default 20) |
| `volume` (0–1) | `volume` (default 0.5) |
| `walls` | sound blocked by walls (default true) |
| `easing` | ease volume by distance (default true) |
| `repeat` | loop (default true; **false for one-shot stingers/songs**) |

Pass the whole `sounds` array in ONE call (parallel scene writes race — the serialize rule). Returns `{ success, createdCount, soundIds: [...] }`.

## `list-playlists` — read (idempotency)

`list-playlists()` → `{ success, playlists: [{ id, name, mode, soundCount, sounds: [{ id, name, path }] }] }`. Match by name before `create-playlist` so re-runs don't duplicate.

## Constraints

- **GM-only.** Every write goes through the module's GM-access + `modifyScene` write-permission gate (the same gate as walls/lights/tokens). A non-GM client is denied.
- **Data-relative paths only** — no remote URLs; the file must be in the Foundry data dir (`soundscape-policy.md`).
- **Serialize per scene** — one audio write at a time on a given scene.
