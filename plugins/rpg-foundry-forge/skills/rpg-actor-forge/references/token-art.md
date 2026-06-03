# Token art (optional, off by default)

AI token art is OPTIONAL and only available when preflight confirmed: the `update-token imagePath` patch is present, ComfyUI is reachable, and a character checkpoint is installed. If any is missing, skip art — tokens use the compendium's default image.

## Pipeline
1. **Generate** a character image with ComfyUI (a general/character SDXL checkpoint, NOT the battlemap one). The local helper `comfyui-gen-token.py` drives ComfyUI's HTTP API on `:8000`.
2. **Cut out the background** → transparent PNG (the local `cutout-token.py`, rembg).
3. **Place the file** inside the Foundry Data dir so the file picker resolves it: `Data/worlds/<world>/tokens/<name>.png`. The path you pass must be **Data-relative** (e.g. `worlds/<world>/tokens/skel.png`), NOT an http URL.
4. **Assign** via `update-token(tokenId, { imagePath: "worlds/<world>/tokens/<name>.png" })`. Serialize these per scene (the race).

## Notes / limits
- These Python helpers live in the user's `local/` tooling (via a `.rembg-venv`); they are NOT plugin runtime deps. The plugin only calls `update-token imagePath` (the MCP patch). If the helpers/checkpoint aren't set up, art is simply skipped.
- `update-token imagePath` sets the TOKEN texture only. There is NO MCP way to set the actor PORTRAIT (`actor.img`) — it stays the compendium default. Surface this as a known limitation, not a bug.
- Local module/Data paths are not `http`, so they survive the module's remote-URL stripping (which only nulls `http(s)` token textures at actor creation).
