---
description: Check all rpg-foundry-forge dependencies (go/no-go) before compiling — no build.
---

# /forge-preflight [unit note name]

Run the dependency matrix and present a go/no-go report. Do NOT build.

**Script-side checks** (vault loads, the unit resolves with no broken links, ComfyUI reachable). cwd = the user's vault root:
```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module <<EOF
import { runLocalPreflight } from "${PLUGIN}/scripts/lib/preflight.mjs";
const r = await runLocalPreflight(process.cwd(), process.argv[1] || "");
console.log(JSON.stringify(r, null, 2));
EOF
```
(Pass the unit name as the argument when the user named one.)

**MCP-side checks** (do these by calling the tools):
1. `get-world-info` — if it errors "Foundry VTT module not connected", that's a 🔴 blocker; tell the user to reload the Foundry world (F5) or toggle *Game Settings → Foundry MCP Bridge → Enable*, then `/mcp` reconnect.
2. `list-compendium-packs` — confirm the canonical creature pack (e.g. `pf2e.pathfinder-monster-core`) exists (🔴 for actors if absent).
3. Inspect `update-token` for an `imagePath` field, and whether `get-scene-geometry`/`set-scene-lighting` exist — optional; if absent, note that token art / lighting will be skipped.

Present the combined matrix (✅ ok / ⚠️ warn / 🔴 fail) and a clear verdict: **GO** only if all critical checks pass; otherwise list exactly what to fix. See `skills/rpg-forge-conductor/references/preflight-checks.md`.
