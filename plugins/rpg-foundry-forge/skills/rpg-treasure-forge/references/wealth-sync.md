# Wealth Sync — read, reconcile, push

The details behind the four-step workflow. This skill is the kit's **first vault sync-back**: it reads live Foundry state and writes one narrow thing back to the vault. Hold that boundary tightly.

## 1. Resolve the player characters

- `list-characters` returns the Foundry player actors. Map each to a vault `jogador` by name (the mapping `rpg-ownership-forge` already used to assign ownership).
- Cross-check against the party overview roster (`party-<slug>.md`). If a PC is in the vault but not in Foundry (or vice-versa), flag it — don't silently skip.

## 2. Read each PC's wealth

- `get-character(actor)` → top-level sheet data (currency, level).
- `search-character-items(actor, …)` → the inventory items and their values.
- **Actual wealth** = Σ(item value) + coin. Convert coin to gp-equivalent (10 sp = 1 gp, 10 cp = 1 sp) before summing.
- Show the work: a per-PC line and the party total. Never report a total without the breakdown.

## 3. Reconcile into the Wealth section

Write only the **Actual** and **Drift** rows of the `## Wealth` section in `party-<slug>.md` (the `rpg-treasure-builder` owns Expected/Awarded; you own Actual/Drift). This is a **direct loose-file edit** — the party overview is a campaign file, not a typed entity, so it does not go through `rpg-preserve`. Touch nothing else in the file, and no vault entity.

```
| Actual (on the PCs in Foundry) | <party total> gp | read <date> via get-character/search-character-items |
| Drift (Actual − Expected)      | <±gp>            | over/under the level's expectation |
```

Then **report the drift in plain language**: "The party holds 1,420 gp of value at level 5 — the Treasure-by-Level expectation is 1,350 gp, so they're ~70 gp ahead, healthy." Over-wealth and under-wealth both matter (under starves item progression; over trivializes encounters).

## 4. Push awarded loot (approval-gated)

Only on the GM's explicit assignment of *which PC gets which item*:

```
for each (PC, item) in the GM's assignment:
  manage-world-items(action: "add-to-actor",
                     actorIdentifier: <PC's Foundry actor>,
                     items: [{ name: item.name, type: foundryItemType(item) }])
  record itemId in the manifest
```

- `foundryItemType(item.category)` (in `foundry-args.mjs`) gives the deterministic Foundry type floor (consumable → `consumable`, currency/art → `treasure`, gear/permanent → `equipment`); refine a `permanent` to `weapon`/`armor` by judgment when the item clearly is one.
- **Serialize**: one `add-to-actor` at a time — concurrent embedded-document writes on one actor clobber each other (the same race documented for token updates).
- **Idempotency**: check the manifest; skip an item already pushed to that actor. Re-running the sync must not double-grant.
- **Currency**: if the Foundry system exposes a currency setter, apply coin; otherwise leave coin to the GM and say so — coins aren't always inventory items.

## Honesty rules

- **Never fabricate Actual.** If the reads fail or Foundry is unreachable, write `Actual: — (unsynced)` and report only expected/awarded.
- **Never push without confirmation.** The assignment of permanent items is a GM decision; present the plan and wait.
- **Don't re-itemize here.** Designing/valuing loot is `rpg-treasure-builder`'s job; this skill only moves and measures it.
- **Scope the write.** The only vault write this skill makes is the Wealth section's Actual/Drift rows. Everything else is read-only against the vault and write-only against Foundry.
