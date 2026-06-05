# Output Template (treasure-builder)

Two artifacts: the **hoard** (the itemization shown to the GM, plus the `item` candidates persisted) and the **`## Wealth` section** of the party overview (the running tracker). **Match the user's language**; keep PF2e item names and AoN URLs in English.

---

## A. The hoard (shown in chat, then persisted)

```markdown
## Hoard — [where it's found] · [budget context: e.g. "level 3, party of 4, Moderate encounter — 50 gp"]

| Item | Cat. | Lvl | Rarity | Value | AoN category |
|---|---|---|---|---|---|
| [[Scroll of Water Breathing]] | consumable | 3 | common | 12 gp | /Equipment.aspx |
| Moonstone | art | — | — | 10 gp | — |
| Tarnished coin | currency | — | — | 28 gp | — |
| **Total** | | | | **50 gp** | **vs 50 gp budget ✓** |

**Arithmetic:** 12 + 10 + 28 = 50 gp — on budget (level 3 Moderate, party of 4).
**Distribution note:** [where each piece lands across the level's beats, if planning a level]
```

- **Notable items** (named permanent items, notable consumables) become `item` entities (next section). **Bulk currency, gems, and art** are *aggregate lines* here and in the Wealth section — not entities.
- Always show the arithmetic line and the budget comparison.

## B. The `item` candidate (persisted via rpg-preserve)

For each notable item, assemble the frontmatter (`vault-entity-contract.md` has the full contract):

```yaml
---
type: item
status: draft
value: 12            # gp (number)
item_level: 3        # number
rarity: common       # common | uncommon | rare | unique
category: consumable # permanent | consumable | currency | art | gear
owner: "[[Kael]]"    # optional → npc|jogador (who ends up with it)
location: "[[Cripta dos Ossos]]"  # optional → local (where found)
---
# Scroll of Water Breathing

[Reskinned flavor + the AoN category link: https://2e.aonprd.com/Equipment.aspx]
[Why it's here; what it does in one line — never a full stat block.]
```

`currency`-category items are only for a *named* notable cache; ordinary coins/gems are aggregate, not entities.

## C. The `## Wealth` section of the party overview

Appended to `party-<slug>.md` (the loose file `rpg-party-forge` owns). Written **directly** — not via rpg-preserve.

```markdown
## Wealth (by level)

**Level:** [N] · **Party size:** [M] · **Updated:** [date]

| | Value | Source |
|---|---|---|
| **Expected** (this level's total) | [gp] | Treasure-by-Level table |
| **Awarded** (handed out this level) | [gp] | sum of `item.value` + aggregate currency below |
| **Actual** (on the PCs in Foundry) | [— / gp] | filled by `rpg-treasure-forge` (sync-back) |
| **Drift** (Actual − Expected) | [—] | over/under the level's expectation |

**Aggregate currency / gems / art awarded this level:** [gp breakdown — not entities]

**Permanent items awarded this level:** [[Item A]] (L+1), [[Item B]] (L) …
**Consumables awarded this level:** [[Scroll …]] …

> *Awarded* is what the campaign handed out (vault side). *Actual* is what the players really hold,
> read from their Foundry sheets by `rpg-treasure-forge`. Drift tells the GM if the party is rich or poor for their level.
```

Keep the Wealth section current as loot is awarded and as the party levels up (reset *Awarded* at each new level; carry *Actual* forward). The **Actual** and **Drift** rows are placeholders until the forge syncs.

## D. Off-stage handoffs

End with the structured list:

- → `rpg-treasure-forge` (foundry-forge): sync **Actual** from the PCs' Foundry inventories; push the awarded loot onto their sheets.
- → `rpg-artifact-creator` (loremaster): if a permanent item should be a story relic.
- → `rpg-encounter-builder` (gamemaster): link the loot to its `encontro.treasure`.
- → `rpg-journal-forge` (foundry-forge): if the loot is a quest reward.
