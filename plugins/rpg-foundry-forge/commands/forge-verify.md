---
description: Re-audit a compiled Foundry session against the vault (verify + reviewer only, no build).
---

# /forge-verify <unit note name>

Run the verify + review pass only — no building. Useful after manual edits in Foundry, or to confirm a prior compile.

1. **Preflight-lite:** `get-world-info` (module connected?). Stop if not.
2. **Capture a live snapshot:** call `list-scenes`, `list-journals`, `list-characters`, and for the unit's scene(s) `get-scene-geometry` + `get-token-details`.
3. **Resolve** the unit's vault graph and **load the manifest** (via the conductor's heredocs).
4. **Spawn `rpg-foundry-reviewer`** with: the vault root, the `build-manifest-<world>.md` path, and the captured snapshot. Relay its report.

Offered fixes re-enter through `/forge-compile` as `update` steps. This command never writes to Foundry or the vault.
