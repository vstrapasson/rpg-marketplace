# Vault Entity Contract (treasure-builder)

> **Rule:** This skill **never writes entity files directly.** It assembles a typed `item` candidate and hands it to the **`rpg-preserve` skill** — the single write gate. Reads are direct (Glob/Read `itens/`, `party-*.md`).

> **The one exception:** the `## Wealth` section of `party-<slug>.md` is a *loose* campaign file — write it directly, like `rpg-party-forge` writes the overview and `rpg-gm-run-sheet` writes its sheet.

> **Sync obligation:** this table mirrors a subset of `scripts/schema.mjs`. The `item` fields below were added in guardian **1.3.0**. If `schema.mjs` changes, update this file to match — drift causes silent breakage when rpg-preserve validates.

---

## The `item` entity

| type | folder | required | key own fields | key relations |
|---|---|---|---|---|
| **item** | itens/ | type | **value** (number, gp) · **item_level** (number) · **rarity** (common/uncommon/rare/unique) · **category** (permanent/consumable/currency/art/gear) · status | **owner→npc\|jogador** · **location→local** |

- All four loot fields are **optional** — only `type` is required — but fill them for anything you want the wealth tracker to count (`value`/`item_level`) and the forge to type correctly in Foundry (`category`).
- `category` maps to a Foundry item type on the forge side (`permanent`/`gear` → weapon/armor/equipment; `consumable` → consumable; `currency`/`art` → treasure). Set it so `rpg-treasure-forge` can push the item to a PC sheet without guessing.
- `rarity` uses the PF2e rarities (`common`/`uncommon`/`rare`/`unique`) — **not** item categories; a wrong value is flagged `bad-enum`.

## What is and isn't an entity

- **Entity:** a *named, notable* permanent item or consumable (a wand, a scroll, a suit of armor). One note per item.
- **Not an entity:** bulk coins, gems, and art objects — recorded in **aggregate** in the party overview's `## Wealth` section. Don't write `Coin.md` × 200.

## Wikilink rule

Relation fields are wikilinks: `owner: "[[Kael]]"`, `location: "[[Cripta dos Ossos]]"`. The bracketed name must exactly match the vault note's filename, or rpg-preserve flags a broken link and refuses to write.

## The persistence handoff (what rpg-preserve does)

Build the frontmatter, build the content, validate in memory, write only on zero errors:

```js
const fm = buildFrontmatter('item', {
  status: 'draft', value: 12, item_level: 3, rarity: 'common', category: 'consumable',
  owner: '[[Kael]]', location: '[[Cripta dos Ossos]]',
});
const content = buildNoteContent(fm, 'Scroll of Water Breathing');
const report = await validateCandidate('Scroll of Water Breathing', content, 'item', vaultDir);
// report.summary.errors === 0 ? writeEntityFile(...) : show issues and ask
```

## Reading vault state

```
Glob itens/            → loot already awarded (avoid double-awarding)
Read party-*.md        → the current ## Wealth section + party level/size
Read encontros/<n>.md  → an encounter whose `treasure` this loot fills
```

Do not parse YAML manually — read the frontmatter fields as plain text. The vault's frontmatter is flat YAML (single-level only).
