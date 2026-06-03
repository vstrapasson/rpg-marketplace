---
name: rpg-ownership-forge
description: Assigns Foundry VTT actor ownership to players from vault `jogador` entities, driving the foundry-vtt-mcp server. Maps each player to a Foundry user and grants OWNER on their PC (and OBSERVER on shared NPCs if modeled). Runs LAST in a compile and is always approval-gated (it changes who sees and controls what). Invoked by rpg-forge-conductor; also use directly for "dá ownership dos personagens aos jogadores", "assign the PCs to the players".
---

# RPG Ownership Forge — players → Foundry ownership

## What this skill is for
The final compile step: connect `jogador` (vault players) to Foundry user permissions so each player controls their character. This is the one step that changes WHO can see/do what, so it is **always confirmed with the user** before applying.

## Workflow
1. **Read current.** `list-characters` (the world's PCs/NPCs) and `list-actor-ownership` to see what exists.
2. **Resolve player → Foundry user** (judgment). `jogador.player` is a person's name; match it to a Foundry user (or character) by name. If ambiguous, **ask** — don't guess.
3. **Confirm, then assign.** `assign-actor-ownership(actorIdentifier, playerIdentifier, permissionLevel, confirmBulkOperation)`. Default: the player's PC → `OWNER`. Shared/party NPCs → `OBSERVER` only if the vault models it. Set `confirmBulkOperation:true` only after the user OKs a bulk change. See `references/ownership-mapping.md`.
4. Return `{ userId, ownedActorIds, permission }` per player to the conductor.

This step depends on actors already existing (it runs after rpg-actor-forge). If a PC actor doesn't exist in the world yet, report it as a gap (PCs are usually created by players, not by this plugin).

Load `references/ownership-mapping.md`.
