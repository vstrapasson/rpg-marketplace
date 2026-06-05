# Preflight — dependency matrix (run before any build)

Gate the workflow. **Block on any CRITICAL fail.** For missing OPTIONAL deps, disable that feature and tell the user exactly what will be skipped. Two halves: script-side (cheap, local) + MCP-side (you call the tools).

| # | Dependency | How to check | Criticality | On failure |
|---|---|---|---|---|
| 1 | Foundry MCP Bridge connected | call `get-world-info` | **CRITICAL** | "module not connected" → STOP; user reloads world (F5) or toggles *Game Settings → Foundry MCP Bridge → Enable*, then `/mcp` reconnect |
| 2 | Vault readable + unit resolves (no `missing`) | `runLocalPreflight(cwd, unit)` | **CRITICAL** | report broken links/unknown unit; fix in vault first (loremaster/gamemaster + guardian) |
| 3 | Canonical creature pack present | call `list-compendium-packs` (look for `pf2e.pathfinder-monster-core` or the world's bestiary) | **CRITICAL for actors** | if absent, skip actor/encounter creature creation, warn |
| 4 | Geometry tools (lighting) | is `set-scene-lighting` / `get-scene-geometry` available? | optional | skip lighting (+walls), scenes still build |
| 5 | `update-token imagePath` (token art) | does `update-token`'s schema include `imagePath`? | optional | skip AI token art; tokens use compendium default |
| 6 | ComfyUI reachable | `runLocalPreflight` probes `:8000/system_stats` | optional | skip map generation (link-existing only) + token art |
| 7 | Audio tools (soundtrack) | is `create-playlist` / `set-scene-playlist` available? (probe with `list-playlists`) | optional | skip soundtrack binding (`rpg-soundscape-forge`), scenes still build |

Script-side call:
```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module <<EOF
import { runLocalPreflight } from "${PLUGIN}/scripts/lib/preflight.mjs";
const r = await runLocalPreflight(process.cwd(), "<unit name>");
console.log(JSON.stringify(r, null, 2));   // { checks[], ok, criticalFails[] }
EOF
```

Present the full matrix as a go/no-go report (this is what `/forge-preflight` shows). Only proceed to the build when all CRITICAL checks pass. The local MCP patches (geometry tools, `imagePath`, audio tools) are LOCAL patches to the cloned foundry-vtt-mcp repo — a `git pull`/reinstall can revert them; that's why #4/#5/#7 are checked every run rather than assumed.
