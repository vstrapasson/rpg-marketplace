# Ownership mapping

## Player → Foundry user
`jogador.player` is the real person's name. Match it to a Foundry **user** (preferred) or the character actor by name (case-insensitive). The vault `jogador` note name is usually the CHARACTER (PC) name; `player` is the person. So: the PC actor = the `jogador` note name; the user = `jogador.player`. If either doesn't resolve cleanly, list candidates and **ask** — ownership is sensitive.

## Permission levels
`assign-actor-ownership(actorIdentifier, playerIdentifier, permissionLevel ∈ {NONE, LIMITED, OBSERVER, OWNER}, confirmBulkOperation)`.
- A player's own PC → **OWNER**.
- Party-shared NPC (an `ally`/`patron` the party runs) → **OBSERVER**, only if the vault models that relationship; otherwise leave NPCs GM-owned.
- Never grant players OWNER/OBSERVER on `inimigo`/antagonist actors.

## Gating
- This step is **always approval-gated** — present the exact assignments (who gets what on which actor) and get a yes before calling.
- `confirmBulkOperation:true` ONLY after the user approves a bulk grant (e.g. "give the whole party OBSERVER on the faction NPCs"). Bulk identifiers like "party characters" are powerful — confirm first.
- Use `list-actor-ownership` to avoid redundant changes; `remove-actor-ownership` to correct.

Record `{ userId, ownedActorIds, permission }` in the manifest (`jogador` rows) so re-runs skip already-assigned ownership.
