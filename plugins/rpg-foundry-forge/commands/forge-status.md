---
description: Show what rpg-foundry-forge has built vs pending for the current world (reads the manifest).
---

# /forge-status [unit note name] [--world <world>]

Read-only. Show what's built, pending, and unmatched, plus any in-flight map jobs. Creates nothing.

Determine the world (ask, or `get-world-info` via MCP). Then, cwd = the user's vault root:
```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module <<EOF
import { loadVault } from "${PLUGIN}/scripts/lib/vault-read.mjs";
import { resolveUnit } from "${PLUGIN}/scripts/lib/resolve.mjs";
import { loadManifest, pendingMapJobs } from "${PLUGIN}/scripts/lib/manifest.mjs";
import { diffManifest } from "${PLUGIN}/scripts/lib/build-plan.mjs";
const vaultDir = process.cwd();
const world = "<world>";          // fill in
const unit = process.argv[1] || ""; // optional: scope to one sessao/encontro
const manifest = await loadManifest(vaultDir, world);
let diff = null;
if (unit) {
  const { index } = await loadVault(vaultDir);
  diff = diffManifest(resolveUnit(index, unit), manifest);
}
console.log(JSON.stringify({ world, pendingMapJobs: pendingMapJobs(manifest), diff,
  builtCounts: Object.fromEntries(Object.entries(manifest.entities||{}).map(([t,r])=>[t,Object.keys(r).length])) }, null, 2));
EOF
```
Present it as a per-concern table (built / to-build / unmatched) + map jobs in flight. If the manifest doesn't exist yet, say "nothing built yet for world <X>."
