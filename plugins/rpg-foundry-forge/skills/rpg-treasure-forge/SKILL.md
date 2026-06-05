---
name: rpg-treasure-forge
description: Syncs the campaign's treasure with Foundry VTT — reads each player character's actual inventory and currency from their Foundry sheet, reconciles it against the expected/awarded wealth in the party overview, and pushes awarded loot onto the PCs' sheets — driving the foundry-vtt-mcp server. The counterpart to rpg-treasure-builder (which itemizes loot in the vault): this is the Foundry side, and the kit's first vault sync-back (it reads Foundry state and writes the Wealth section's Actual row). Use for "sync the party's wealth", "are my players at the right wealth", "push the loot to the sheets", "dar o loot pros jogadores no Foundry", "sincronizar o tesouro".
---

# RPG Treasure Forge — sync wealth with Foundry

## What this skill is for
`rpg-treasure-builder` itemizes loot and tracks **expected vs awarded** wealth in the vault's `party-<slug>.md` `## Wealth` section. This skill closes the loop on the Foundry side: it reads the PCs' **actual** inventories from Foundry, reconciles the three numbers, and pushes the awarded loot onto the sheets. It is the **first sync-back in the kit** — the forge has always written only *to* Foundry; this reads Foundry state and writes one narrow thing back to the vault (the Wealth section's Actual row, a loose file — never an entity, never via rpg-preserve).

## Workflow
1. **Resolve PCs.** `list-characters` → the player characters (the `jogador` ↔ Foundry actor mapping `rpg-ownership-forge` established). Confirm the roster against the party overview.
2. **Read inventory.** For each PC: `get-character` + `search-character-items` → their items and currency → compute **actual wealth** (sum of item values + coin). Show the per-PC and party totals.
3. **Reconcile.** Write the **Actual** and **Drift** rows of the `## Wealth` section in `party-<slug>.md` (a direct loose-file write — the sync-back is scoped to wealth only). Report drift: the party above/below the Treasure-by-Level expectation for their level. Do **not** touch any vault entity.
4. **Push loot (approval-gated).** Given the GM's "who gets what" assignment, for each awarded `item`: `manage-world-items(action:"add-to-actor", actorIdentifier:<PC>, items:[{ name, type }])` — `type` from `foundryItemType(item.category)` (see `foundry-args.mjs`). This is the same `add-to-actor` mechanism `rpg-encounter-forge` uses to seed loot on a creature, aimed at PC sheets. **Always confirm the assignment before writing** — who receives a permanent item is a GM call.
5. **Serialize** all sheet writes one at a time (the parallel-write race); record `itemId`s in the manifest for idempotency.

See `references/wealth-sync.md` for the read/reconcile/push details and the honesty rules.

## Honest boundaries
- **Read-back is new.** If `get-character`/`search-character-items` aren't available or Foundry isn't reachable, report the Wealth section's expected/awarded only and say the Actual is unsynced — never fabricate a number.
- **The push is opt-in and confirmed.** Don't add items to a sheet without the GM's explicit per-item assignment.
- **Currency:** push coin via the system's currency handling if exposed; otherwise leave coin to the GM and say so (it's not always an "item").
