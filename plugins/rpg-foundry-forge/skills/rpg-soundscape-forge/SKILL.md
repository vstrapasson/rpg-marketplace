---
name: rpg-soundscape-forge
description: Realizes a campaign's soundtrack manifest (authored by rpg-sound-director) into Foundry VTT — creates Playlists from generated audio files, binds a playlist to a scene's Ambience (auto-plays on activation), and places AmbientSound cues — by driving the foundry-vtt-mcp audio tools. Does NOT author or generate audio (that's rpg-sound-director + the manual generation step); it binds existing files. Invoked by rpg-forge-conductor after rpg-scene-forge; also use directly for "monta a trilha da cena no Foundry", "set up the soundtrack for this scene", "bind the campaign playlists in Foundry".
---

# RPG Soundscape Forge — soundtrack manifest → Foundry playlists + scene ambience

## What this skill is for
Turn the campaign's **soundtrack manifest** (`soundtrack-manifest-<slug>.md`, authored by `rpg-sound-director`) into live Foundry audio. You do **not** choose the music or generate it — the manifest names the track, mood/function, file path, and how to bind it. You realize it: create the `Playlist`, bind it to the right scene's Ambience, place `AmbientSound` cues, record the ids. If audio files or the MCP audio tools are missing, you **degrade and report** — you never invent a track. This is the audio analogue of `rpg-scene-forge`.

## Workflow
1. **Read the manifest** — `soundtrack-manifest-<slug>.md` (vault/working root). Each row gives: scene/local, function, provider, expected filename, **Data-relative path**, loop, volume, **bind-as** (`scene playlist` | `AmbientSound (one-shot)`). This is the contract; you don't re-derive moods from prose.
2. **Confirm files are placed.** The audio files must already be in the Foundry data dir at their Data-relative path (`worlds/<world>/audio/<name>.ogg`). There is **no MCP file-stat tool** — ask the GM to confirm the generated files are dropped in, or proceed and flag that a wrong/absent path yields a silent track. Never bind a remote URL.
3. **Resolve the scene.** Match the manifest's scene/local name to a Foundry scene via `list-scenes` (when run standalone), or take the `sceneId` handed down by `rpg-scene-forge` (when run by the conductor, right after the scene is built). Surface any unmatched scene as a blocker — don't guess.
4. **Prefer existing.** `list-playlists` and match by name before creating, so re-runs don't duplicate (idempotency — mirror scene-forge's link-existing rule).
5. **Create the playlist** (for `bind-as: scene playlist`) — `create-playlist({ name, mode, fade, sounds:[{ path, volume, loop, fade }] })`. One playlist per scene, or one campaign-ambience playlist with per-scene tracks (judgment — `references/soundscape-policy.md`).
6. **Bind to the scene** — `set-scene-playlist({ sceneId, playlistId, soundId? })`. The scene's Ambience auto-plays the playlist on activation.
7. **Place one-shots** (for `bind-as: AmbientSound (one-shot)`) — `create-ambient-sound({ sounds:[{ path, x, y, radius, volume, repeat:false }] })` for a localized/triggered cue (a bard's song, a fountain, a reveal stinger). Placement coords are judgment.
8. **Serialize.** All audio writes to ONE scene happen as a single sequential batch — never parallel (the 2nd write silently no-ops; the load-bearing forge rule).
9. **Approval-gate + record.** Confirm the bind plan with the GM before writing (which playlist → which scene). Return `{ playlistId, soundIds, sceneBound }` to the conductor for the build manifest.

## Judgment vs script
- **The manifest** gives the track, file path, loop, volume, and bind-as — the deterministic part.
- **You** choose: playlist-per-scene vs campaign-wide, the `AmbientSound` placement coords, the existing-playlist match.

## Preflight (degradable, never critical)
Audio binding is **optional**: if the foundry-mcp **audio tools** (`create-playlist` / `set-scene-playlist` / `create-ambient-sound`) are absent, **skip the soundtrack — scenes still build**. The conductor's preflight probes this (same degrade-don't-block shape as the geometry/`imagePath`/ComfyUI checks). The audio tools are a LOCAL extension to the cloned foundry-vtt-mcp repo (foundry-mcp 0.9.0+) — a `git pull`/reinstall can revert them, so re-check every run. See `references/audio-tools.md`.

Load `references/soundscape-policy.md` (playlist-per-scene vs campaign-ambience, AmbientSound vs playlist, volume/loop/fade, the Data-relative path rule) and `references/audio-tools.md` (exact tool signatures, friendly→Foundry mapping, the preflight probe) before acting.
