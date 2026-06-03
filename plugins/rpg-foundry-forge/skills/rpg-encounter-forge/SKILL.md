---
name: rpg-encounter-forge
description: Assembles a vault `encontro` into a ready-to-run Foundry VTT combat — ensures its location scene exists and is lit, places its creatures (matched by PF2e party_level/threat) as hostile tokens, and stages its treasure as world items — driving the foundry-vtt-mcp server. The fusion unit that combines scene + creatures + treasure. Invoked by rpg-forge-conductor (and is itself a compile unit); also use directly for "monta o encontro X no Foundry", "set up this fight", "prepara a Emboscada na Cripta".
---

# RPG Encounter Forge — assemble a runnable combat

## What this skill is for
An `encontro` is the one entity that fuses a scene + creatures-by-threat + treasure into a single combat. This skill assembles it end-to-end, reusing the scene and actor compilers but driven by the encounter's combat budget.

## Workflow
1. **Scene.** Resolve `encontro.location` → ensure its scene (delegate to `rpg-scene-forge`: prefer existing, else generate-under-confirmation) and apply combat-appropriate lighting (usually `dark` for a crypt). Record `sceneId`.
2. **Creatures.** For each `inimigo` in `creatures`, match a compendium creature WEIGHTED by `encontro.party_level` + `threat` (trivial..extreme nudges level): `list-creatures-by-criteria(level: …)` then pick (reuse `rpg-actor-forge`'s `references/enemy-matching.md`). `create-actor-from-compendium` with `addToScene:true` + `placement` (coords from `placementGrid` on the scene dims), then `update-token` disposition **-1 hostile**. Honor `party_size` for scaling counts/quantity if the encounter implies it.
3. **Treasure.** For each `item` in `treasure`, `manage-world-items(action:"create", items:[{name, type}])` (type is judgment); optionally `add-to-actor` to a creature. Record `itemId`s.
4. **Serialize** all token placement/updates on the encounter scene — one at a time (the parallel-write race).
5. Return `{ sceneId, actorIds, tokenIds, itemIds, status:"built" }`. Flag any unmatched creature in the manifest `openDecisions`.

See `references/encounter-assembly.md`. (Disposition/placement rules are duplicated from rpg-actor-forge by design — this skill is self-contained.)
