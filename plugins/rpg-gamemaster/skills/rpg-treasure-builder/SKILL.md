---
name: rpg-treasure-builder
description: Turns a Pathfinder 2e treasure budget into concrete, itemized loot and tracks the party's wealth by level — the by-the-book counterpart to the encounter builder, for everything below the relic tier. Given a gp budget (from an encounter, a whole level, or named directly) plus party level and size, it itemizes the official Treasure-by-Level breakdown into permanent items, consumables, currency, art, and gems — referenced to Archives of Nethys category pages — and shows the arithmetic against the budget. It persists notable items as item entities through the rpg-preserve write gate (bulk currency stays aggregate) and maintains a Wealth section in the party overview (expected vs awarded). Use for itemizing treasure, building a hoard, distributing the level's loot, wealth by level, quanto de tesouro, montar o butim, distribuir o tesouro. Tone inherited from the campaign, default dark-leaning.
---

# RPG Treasure Builder (Pathfinder 2e kit — the loot layer)

## What this skill is for

Turn a **treasure budget into actual loot**, and keep the party's wealth honest across a level. The `rpg-encounter-builder` outputs a gp number for a fight; this skill takes that number (or a whole level's budget) and **itemizes it** — specific permanent items, consumables, currency, gems, and art objects by item level — referenced to Archives of Nethys, with the arithmetic shown. It is the by-the-book counterpart to the encounter builder, for everything *below* the relic tier.

It does **not** invent magic items or write stat blocks — it picks existing PF2e items from AoN category pages and reskins flavor. The math is in `references/pf2e-treasure-math.md`.

## The boundary with the artifact creator

`rpg-artifact-creator` builds **the top tier only** — legendary relics as narrative nodes (provenance, will, staged price). This skill builds **everything below**: the coins, gems, consumables, and permanent magic items the party finds and uses. If a level's *primary permanent item* should be a story relic, this skill **references** it (`[[The Drowned Bell]]`) and hands off to the artifact creator to design it — it never designs the relic itself.

## The two layers — itemized loot AND honest wealth

1. **The hoard** — the budget itemized: named permanent items and consumables (each with value, item level, rarity, category), plus aggregate currency/gems/art. The arithmetic against the budget, always shown.
2. **The wealth tracker** — the running picture of where the party's wealth sits versus the official Treasure-by-Level expectation, kept in the party overview's `## Wealth` section so the GM can see drift (the party richer or poorer than their level expects).

## When to use / when not

**Use this skill when:**
- Itemizing an encounter's treasure (the `rpg-encounter-builder` handed you a gp allotment).
- Planning a whole level's treasure — the permanent/consumable/currency breakdown spread across the level's encounters and rewards.
- Checking or updating the party's wealth-by-level.
- A session-prep or encounter handoff flags "→ rpg-treasure-builder" for loot.

**Do not use this skill for:**
- **Designing a legendary relic** — that's `rpg-artifact-creator` (top tier only).
- **Placing loot in Foundry / syncing player sheets** — that's `rpg-treasure-forge` (foundry-forge), which reads the actual inventories and pushes the awarded loot to the PCs.
- **Inventing new magic items or mechanics** — pick existing PF2e items from AoN and reskin.

## Inputs — what to read

| Source | What you need | How to find it |
|---|---|---|
| Party level + size | REQUIRED — the whole budget is relative to these | Read the **party overview** (`party-*.md`, written by `rpg-party-forge`) and confirm; else ask |
| The budget | A gp value (from an `encontro`), a whole level, or a number named directly | From `encontro.treasure` context, the level table, or the GM |
| `references/pf2e-treasure-math.md` | Treasure-by-Level totals, the permanent/consumable/currency breakdown, party-size adjustment, honesty rules | Load before itemizing |
| Existing `item` notes | Loot already in the vault (avoid double-awarding) | Glob `itens/` → Read by exact name |
| The `## Wealth` section of the party overview | What's already been awarded this level | Read `party-*.md` |

## The workflow

1. **Co-create the brief** — run `references/co-creation.md`. Confirm party level and size (read the party overview first). Establish the budget source: a single encounter's allotment, a whole level, or a named gp value. Ask the loot's flavor (thematic to the campaign vs. generic). **Match the user's language**; keep PF2e item names and AoN category URLs in English.
2. **Derive the budget** — from `references/pf2e-treasure-math.md`: the per-encounter allotment by threat, or the whole-level total, adjusted for party size (75%/100%/125% at 3/4/5 PCs).
3. **Itemize the breakdown** — convert the budget into the official mix: permanent items (by item level), consumables (by item level), and currency, plus gems/art. For each named item: AoN category ref, item level, rarity, category, and gp value. Spread a level's loot across its encounters — never one chest.
4. **Show the arithmetic** — every item's value, the running total, and the comparison against the budget. State the assumed party level and size. Never silently round.
5. **Persist** — emit `item` candidates for the named permanent items and notable consumables; route to `rpg-preserve`. Bulk currency/gems/art stay aggregate in the Wealth section (not one entity per coin). See Persistence below.
6. **Update the Wealth tracker** — refresh the `## Wealth` section of the party overview: **Expected** (the by-level total), **Awarded** (sum of `item.value` awarded this level + aggregate currency), and a placeholder **Actual** the forge fills from Foundry. See `references/output-template.md`.
7. **Hand off** — to `rpg-treasure-forge` (sync to Foundry, push to PC sheets), and to `rpg-artifact-creator` if the primary permanent item should be a relic.

## Read references as needed

Four reference files (no tone-spectrum — tone is inherited):

- **`references/co-creation.md`** — the intake (party level/size, budget source, loot flavor). **Load before intake.**
- **`references/pf2e-treasure-math.md`** — the Treasure-by-Level tables, the permanent/consumable/currency breakdown, party-size adjustment, honesty rules. **Load before itemizing.**
- **`references/output-template.md`** — the hoard skeleton and the `## Wealth` section skeleton. **Load when ready to write.**
- **`references/vault-entity-contract.md`** — the `item` contract (new fields: value/item_level/rarity/category) and the rpg-preserve handoff. **Consult before emitting candidates.**

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes entity files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core to adapter.

To persist:

1. Assemble an `item` candidate for each **notable** item (required field: `type`; key fields: `value`, `item_level`, `rarity`, `category`; relations: `owner→npc|jogador`, `location→local`). Reference its AoN category page in the body.
2. **Bulk currency, gems, and art objects are NOT individual entities** — record them in aggregate in the party overview's `## Wealth` section. One `item` per *named, notable* thing; not one per coin.
3. Route all `item` candidates to the **`rpg-preserve` skill**, the single write gate.

The `## Wealth` section of `party-<slug>.md` is a **loose** campaign file — write it directly, the way `rpg-party-forge` writes the overview and `rpg-gm-run-sheet` writes its sheet. Only typed `item` candidates go through rpg-preserve.

Entity shapes are in `references/vault-entity-contract.md`. Consult it before emitting candidates.

## Off-stage handoffs

- → `rpg-treasure-forge` (foundry-forge): sync the Wealth section against the PCs' actual Foundry inventories, and push the awarded loot onto their sheets.
- → `rpg-artifact-creator` (loremaster): if a level's primary permanent item should be a legendary relic, not a stock item.
- → `rpg-encounter-builder` (gamemaster): the loot belongs to a specific `encontro` (link it via `treasure`).
- → `rpg-journal-forge` (foundry-forge): if the loot is a quest reward (`quest.items`).

## What to avoid

- **Inventing magic items.** Pick existing PF2e items from AoN category pages and reskin the flavor.
- **`?ID=` links.** Category pages only (`/Equipment.aspx`, `/Weapons.aspx`).
- **Front-loading.** Spread a level's treasure across its encounters and rewards; don't dump it in one chest.
- **One entity per coin.** Notable items are entities; bulk currency/gems/art are aggregate in the Wealth section.
- **Writing entity files directly.** Always route `item` candidates through `rpg-preserve`.
- **Designing relics here.** Reference and hand off to `rpg-artifact-creator`.
- **Silent rounding.** Show the arithmetic; if the budget doesn't land cleanly, say so.
