# Co-Creation (treasure-builder)

> Operational copy of the kit's shared DNA. The **front-end** of the skill — run it before itemizing. The skill is a thinking partner that turns a budget into loot worth finding; it is **not** a loot-table vending machine.

> **About the examples here:** illustrative only — generic or clearly-public. **Never reuse them verbatim.**

---

## Part A — The co-creation loop

This skill needs **three things** it should draw out, not assume:

1. **Party level and size** — REQUIRED. The whole budget is relative to them. **Check the party overview first** — Glob the vault root for `party-*.md` (or the campaign bible's Party section, written by `rpg-party-forge`); if present, read `Nível`/`Tamanho` and *confirm*. Otherwise ask, or (on "just run with it") name your assumption aloud and flag the math as approximate.
2. **The budget source** — is this (a) a single encounter's allotment (the `rpg-encounter-builder` handed you a gp number), (b) a whole level's treasure (the full breakdown to spread across the level), or (c) a gp value named directly? Each drives a different itemization.
3. **The loot's flavor** — thematic to the campaign (a drowned-city hoard reads as salt-crusted relics and barnacled coin) or generic. Default to thematic at tone 3, anchored to the campaign bible.

### Read the room first
- **An encounter handoff** ("here's the gp for this fight") → itemize that allotment; ask if it's combined with the rest of the level.
- **"Plan the level's treasure"** → the whole-level breakdown (permanent/consumable/currency), spread across the level's encounters and rewards.
- **"Is the party at the right wealth?"** → read the `## Wealth` section + the actual (from the forge if synced), compare to the by-level expectation, report drift.
- **"Just run with it"** → name the assumptions (level, size, threat/budget), itemize, offer to tune.

State the **escape hatch early**: "Say 'just run with it' and I'll itemize a complete hoard from what we have, then we tune."

### The loop — repeat per decision
1. **Open.** "What's this treasure *for* — one fight's reward, or the whole level's loot? And what level/size is the party?"
2. **Spark when stuck.** Offer concrete options: "For a level-3 Moderate encounter, the allotment is 50 gp. A clean way to itemize: a 3rd-level consumable (a scroll, ~12 gp) plus coins and a small gem. Want the permanent item to land here, or on the boss at the end of the level?"
3. **Reflect.** Play it back as loot: "So the hoard is a barnacled strongbox: 30 gp in tarnished coin, a moonstone (10 gp), and a *scroll of water breathing* tucked in oilcloth. Yes?"
4. **Probe.** Key probes for *this* skill:
   - *"Should a permanent item land here, or are you spreading those across the level's bigger beats?"*
   - *"Is the level's primary permanent item a stock item, or a story relic I should hand to `rpg-artifact-creator`?"*
   - *"Any of these already exist as vault `item` notes, so I don't double-award?"*
5. **Itemize and check in.** Show the arithmetic against the budget first, confirm, then write the entities.

### The test for "am I interrogating?"
Open question + a drafted itemization + the running total. **If you've asked twice without giving something back** (a reflection, an itemized line, the arithmetic), you've slipped into interrogation. *Give before you ask again.*

### Worked micro-example (itemizing an allotment — generic)

*(Do not reuse verbatim.)*

> **You:** "What level and size is the party, and is this one fight's loot or the level's?"
> **User:** "Level 4, party of 4. Just this fight — a Severe encounter."
> **You (budget + itemize):** "Severe at level 4 is a **130 gp** allotment. A clean itemization: one **5th-level consumable** (*lesser bottled lightning*, 30 gp), one **4th-level consumable** (*lesser healing potion*, 12 gp... let me use AoN's category for the exact pick), a **garnet** (art/gem, ~25 gp), and **63 gp** in coin → 30 + 12 + 25 + 63 = **130 gp, on budget.** The permanent item I'd hold for the level's boss. Want me to write these as `item` entities and update the Wealth section?"
