# Scene policy — link vs generate, and prompt craft

## Prefer existing (default)
Always `list-scenes` first and match the `local` by name + aliases (case-insensitive, ignore punctuation). A match → **link** it: record `{ sceneId, source: "linked" }`. Never regenerate a scene that already exists — generation is slow and discards the GM's prior setup.

## Generate only if missing — and confirm
`generate-map` queues an async job on the LOCAL ComfyUI (a real compute cost, minutes). So:
- Only generate when no scene matches.
- **Ask the user before each generation** (the conductor's scene policy is "generate under confirmation").
- `generate-map(prompt, scene_name, size, grid_size)` returns a `jobId`; record it in the manifest (`recordMapJob`), then poll `check-map-status(jobId)` until `complete`. If interrupted, a later run resumes from the recorded `jobId`.
- The patched module sets the scene background (`background.src`) automatically on v14 — you don't set it.

## Map-prompt craft (judgment)
Build the prompt from the `local` note's **body** (its description) + the campaign tone (from `campaign-bible-*` if present). Keep it a top-down battlemap prompt: name the place, key features, materials, mood. Example for "Cripta dos Ossos" (body: flooded crypt under the chapel, narrow corridors, bone niches): `"flooded stone crypt under a chapel, narrow flagstone corridors, bone-filled wall niches, dark and damp, top-down battlemap"`. `scene_name` = the local's name. `size`: small/medium/large by the location's scale (default medium). `grid_size` default 70.

## ComfyUI absent
If preflight found no ComfyUI, you cannot generate — link-existing only; report locations left without a scene as pending for the user to create/import.
