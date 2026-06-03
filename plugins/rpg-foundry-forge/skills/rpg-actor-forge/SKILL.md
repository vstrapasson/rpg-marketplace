---
name: rpg-actor-forge
description: Turns vault `inimigo` (enemy statblocks) and statblock-backed `npc` into Foundry VTT actors from a compendium, places their tokens on the right scene with correct disposition, and optionally sets AI-generated token art — driving the foundry-vtt-mcp server. Matches creatures by name → criteria (PF2e level/threat) → ask. Invoked by rpg-forge-conductor / rpg-encounter-forge; also use directly for "coloca os inimigos no Foundry", "place these creatures on the scene", "cria os atores dos esqueletos".
---

# RPG Actor Forge — enemies/NPCs → Foundry actors + tokens

## What this skill is for
Realize creatures as Foundry actors and place them as tokens. An `inimigo` → a compendium creature actor (hostile). An `npc` with a `statblock` → an actor too (disposition by `role`); an `npc` without one stays a journal (handled by rpg-journal-forge). `jogador` PCs are owned by rpg-ownership-forge, not created here.

## Workflow
1. **Match the creature** (judgment) — name → criteria → ask. See `references/enemy-matching.md`. Record the chosen `packId`/`itemId` in the manifest so re-builds are stable.
2. **Create the actor** — `create-actor-from-compendium(packId, itemId, names, quantity, addToScene, placement)`. If the creature belongs to an encounter with a scene, set `addToScene:true` + `placement` (coordinates from `foundry-args.placementGrid` using `get-scene-geometry` dims). Otherwise create the actor without a token.
3. **Disposition + art** — after placement, `update-token(tokenId, updates)`: set `disposition` (from `foundry-args.dispositionFor`: inimigo/antagonist → -1 hostile, ally/patron → 1 friendly, neutral → 0), and optionally `imagePath` for AI token art (see `references/token-art.md`, optional/off unless preflight enabled it). See `references/token-placement.md`.
4. **Serialize** — all token writes on ONE scene happen one at a time (parallel writes to a scene silently drop). Place a whole group, then update tokens sequentially.
5. Return `{ actorId, packId, itemId, tokenIds, scene, disposition, art }` to the conductor.

## Judgment vs script
- **Script**: disposition value, placement coordinates (with offset), names array.
- **You**: the compendium match (name→criteria→ask), whether to generate token art.

Load `references/enemy-matching.md`, `references/token-placement.md`, and (if art is enabled) `references/token-art.md`.
