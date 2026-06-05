# PF2e Treasure Math (treasure-builder)

The verified tables and the itemization recipe. **Load before itemizing any budget.** Source: Pathfinder 2e GM Core — Treasure (Remaster). Anchor exact item picks to **Archives of Nethys category pages** (`/Equipment.aspx`, `/Weapons.aspx`, `/Armor.aspx`, `/Wondrous-Items.aspx`) — never `?ID=` deep links. See [Treasure by Level](https://2e.aonprd.com/Rules.aspx?ID=2656) · [Treasure by Encounter](https://2e.aonprd.com/Rules.aspx?ID=2738) for the current text.

## 1. Party Treasure by Level (totals + per-encounter, party of 4)

Identical to the table the encounter builder uses (`rpg-encounter-builder/references/pf2e-encounter-math.md` §4) — reproduced so this skill is self-contained.

| Level | Total per Level | Low | Moderate | Severe | Extreme |
|---|---|---|---|---|---|
| 1 | 175 gp | 13 | 18 | 26 | 35 |
| 2 | 300 gp | 23 | 30 | 45 | 60 |
| 3 | 500 gp | 38 | 50 | 75 | 100 |
| 4 | 850 gp | 65 | 85 | 130 | 170 |
| 5 | 1,350 gp | 100 | 135 | 200 | 270 |
| 6 | 2,000 gp | 150 | 200 | 300 | 400 |
| 7 | 2,900 gp | 220 | 290 | 440 | 580 |
| 8 | 4,000 gp | 300 | 400 | 600 | 800 |
| 9 | 5,700 gp | 430 | 570 | 860 | 1,140 |
| 10 | 8,000 gp | 600 | 800 | 1,200 | 1,600 |
| 11 | 11,500 gp | 865 | 1,150 | 1,725 | 2,300 |
| 12 | 16,500 gp | 1,250 | 1,650 | 2,475 | 3,300 |
| 13 | 25,000 gp | 1,875 | 2,500 | 3,750 | 5,000 |
| 14 | 36,500 gp | 2,750 | 3,650 | 5,500 | 7,300 |
| 15 | 54,500 gp | 4,100 | 5,450 | 8,200 | 10,900 |
| 16 | 82,500 gp | 6,200 | 8,250 | 12,400 | 16,500 |
| 17 | 128,000 gp | 9,600 | 12,800 | 19,200 | 25,600 |
| 18 | 208,000 gp | 15,600 | 20,800 | 31,200 | 41,600 |
| 19 | 355,000 gp | 26,600 | 35,500 | 53,250 | 71,000 |
| 20 | 490,000 gp | 36,800 | 49,000 | 73,500 | 98,000 |

The **Total per Level** is a budget across *all* of a level's encounters and rewards, not per-fight. The per-encounter columns distribute that total by threat; Trivial encounters award no meaningful treasure.

## 2. The breakdown — permanent / consumable / currency

The GM Core gives the level's total as a **mix of item types**, not just gp. For a party of four, the canonical Remaster pattern per character level **L** (levels 2–20):

- **Permanent items:** 2 at item level **L+1**, 2 at item level **L** (4 total).
- **Consumables:** 2 at item level **L+1**, 2 at item level **L**, 2 at item level **L−1** (6 total; fewer at the lowest levels).
- **Currency:** the remaining value as coins/gems/art (the "currency" column in the source table).

**Worked example (level 3, official):** two 4th-level permanent items, two 3rd-level permanent items, two 4th-level consumables, two 3rd-level consumables, two 2nd-level consumables, and **120 gp** of currency — together ≈ the 500 gp total.

**Level 1 is the exception** — lower and front-loaded with consumables and currency rather than higher-level permanents.

**Exact per-level item-level counts** beyond this pattern: read them off the AoN [Treasure by Level](https://2e.aonprd.com/Rules.aspx?ID=2656) table rather than guessing — the pattern above is the shape; the table is the authority. When uncertain, say so and point there.

## 3. Party-size adjustment

The table assumes **four** PCs. Adjust:

| Party size | Currency / permanents |
|---|---|
| 3 PCs | ≈ **75%** currency; **3** permanent items per level |
| 4 PCs | 100% (baseline) |
| 5 PCs | ≈ **125%** currency; **5** permanent items per level |

Add roughly one item's worth (and the listed per-PC currency) for each PC beyond four; subtract for fewer.

## 4. Distribution — don't dump one chest

Spread a level's treasure across its **4–6 encounters and rewards**: a consumable in the locked chest at encounter one, currency in encounter two, a permanent item on the boss at the end, some held as a quest reward or an exploration find. Front-loading the whole budget is the common mistake. The per-encounter columns (§1) are the guide for *how much* lands at each beat.

## 5. The honesty rules

- **Always show the arithmetic** — every item's value, the running total, vs. the budget. State the assumed party level and size on the same line.
- **Never invent items or values** — pick existing PF2e items from AoN category pages; use the item's listed Price. If you don't know a price, say so and point to AoN, don't guess.
- **Never silently round.** If the itemization is over/under budget, say so and show the adjustment.
- **Flag pre-Remaster sources** if they surface (prices and items shifted in the Remaster).
- **Relics are out of scope** — a legendary item is `rpg-artifact-creator`'s; reference it, don't price it as stock.
