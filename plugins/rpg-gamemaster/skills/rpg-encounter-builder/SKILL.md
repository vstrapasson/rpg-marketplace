---
name: rpg-encounter-builder
description: Builds balanced Pathfinder 2e encounters from the GM Core math — the mechanical layer the worldbuilding skills deliberately skip. Given party level and size plus a scene or threat brief, it picks a threat tier, assembles creatures referenced to Archives of Nethys category pages (never a VTT compendium), shows the XP-budget arithmetic against the total, and suggests hazards and treasure by level. It wraps every fight as a situation — objective, terrain feature, the reason for the fight, and how it escalates or ends — so the encounter points to play, not just a balanced bag of monsters. Persists the encounter through the rpg-preserve write gate as an encontro entity. Use for building an encounter, balancing a fight, montar um combate, balancear o encontro, quantos inimigos, what monsters for my party. Tone inherited from the campaign, default dark-leaning.
---

# RPG Encounter Builder (Pathfinder 2e kit — the mechanical layer)

## What this skill is for

Turn a fight into **balanced PF2e numbers, wrapped as a situation**. This is the mechanical layer the loremaster skills deliberately skip — worldbuilding produces factions, threats, and tension; this skill converts that material into a creature roster you can actually run, with the budget math shown.

No VTT, no MCP. Creatures are referenced to **Archives of Nethys category pages** only (e.g., https://2e.aonprd.com/Monsters.aspx) — never a `?ID=` deep link, never a VTT compendium import. The math comes from `references/pf2e-encounter-math.md`.

## The core idea — balanced numbers AND a situation

A fight that is only a bag of HP is a waste of a scene. This skill produces **two things at once**:

1. **The math layer** — the XP budget, the creature roster with levels and roles, the arithmetic shown, the party level and size stated, hazards, and treasure by level.
2. **The situation layer** — an objective beyond "kill everything", a terrain feature that changes how the fight plays out, the reason this fight exists (tied to a front, a quest, a clue), and how it escalates or ends (reinforcements, a clock, a morale threshold, an escape route).

The two layers are inseparable. "Everything points to play" — the encounter must hand the GM a starting position and open questions, not a scripted outcome.

The framework for the situation layer is in `references/encounter-as-situation.md`.

## When to use / when not

**Use this skill when:**
- Building a specific encounter — creature selection, budget math, hazards, treasure.
- Balancing a fight the GM has in mind ("is this too hard for a level-3 party of 5?").
- Wrapping a threat from `rpg-session-prep` or `rpg-front-tracker` in playable numbers.
- A session-prep handoff flags "→ rpg-encounter-builder" for a specific scene.

**Do not use this skill for:**
- **Building the world** — factions, NPCs, locations, the campaign spine. That is the loremaster kit.
- **Running the encounter live** — initiative, dice, tokens. The table or VTT owns that.
- **Advancing the front between sessions** — that is `rpg-front-tracker`.

## Inputs — what to read

| Source | What you need | How to find it |
|---|---|---|
| Party level + size | REQUIRED — refuse to balance without both. The math is meaningless without them. | Ask the GM; never assume. |
| Scene or threat brief | What the fight is about, who the enemies are, what the location is | Told directly or read from a `sessao` / `frente` handoff |
| Vault `inimigo` notes | Existing statblocks, exact vault names | Glob `inimigos/` → Read by exact name |
| `references/pf2e-encounter-math.md` | XP budget tables, per-creature XP, hazard XP, treasure by level, honesty rules | Load before computing any budget |
| `local` note | The encounter location (terrain, features) | Glob `locais/` → Read by exact name if the location exists in the vault |

## The workflow

1. **Co-create the brief** — run the intake in `references/co-creation.md`. Two inputs are non-negotiable: party level and party size. Without them, the math is a guess and the budget is meaningless. Elicit the scene brief and the desired threat tier (or pick and name your assumption).
2. **Choose the threat tier** — trivial / low / moderate / severe / extreme. Name the choice and the reason. Derive the XP budget (party-of-4 base plus size adjustment).
3. **Select creatures** — AoN category refs, not `?ID=` links. For each creature: description or vault name, creature level relative to party, XP from the table, role (lackey / standard / boss). Mix roles for texture; a bag of identical creatures is always less interesting than a combination.
4. **Show the budget arithmetic** — always. Every creature listed, its XP, the running total, and the comparison against the budget. State the assumed party level and size on the same line. If the budget is over or under, say so and show the adjustment options. Never silently round.
5. **Add hazards (if any)** — AoN category ref (https://2e.aonprd.com/Hazards.aspx), hazard level relative to party, simple vs. complex XP from the table. Add to the running total.
6. **Treasure by level** — from the treasure table in the reference: the per-encounter allotment for this threat at this party level. Name any specific items as vault names (`[[Item Name]]`) if they exist; flag new items for `rpg-preserve` if they don't.
7. **Write the encounter-as-situation** — the wrap that makes it a scene, not a statblock. Objective, terrain, reason, escalation, exit. See `references/encounter-as-situation.md`.
8. **Persist** — emit the `encontro` candidate (plus `inimigo`/`item` candidates for anything new) and route to `rpg-preserve`. See Persistence below.

## The math must be exact

Always show the arithmetic. Always state the assumed party level and size. If a number is uncertain or a discrepancy is suspected, say so and point to Archives of Nethys — Rules (https://2e.aonprd.com/Rules.aspx) for verification. The PF2e Remaster is errata-sensitive; flag pre-Remaster community sources if they appear.

The tables and the honesty rules are in `references/pf2e-encounter-math.md`. Load it before computing any budget.

## Read references as needed

Four reference files (no tone-spectrum — tone is inherited from the campaign):

- **`references/co-creation.md`** — the intake front-end (eliciting party level/size, threat tier, fight purpose). **Load before intake.**
- **`references/pf2e-encounter-math.md`** — the verified math tables (XP by threat, per-creature XP, hazard XP, treasure by level) and the honesty rules. **Load before computing any budget.**
- **`references/encounter-as-situation.md`** — the situation framework (objective, terrain, reason, escalation, exit). **Load when writing the encounter-as-situation block.**
- **`references/output-template.md`** — the encounter skeleton (Compact / Full). **Load when ready to write.**

Also consult `references/vault-entity-contract.md` before emitting any candidate to rpg-preserve.

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core to adapter. That coupling is the anti-pattern this kit is designed to prevent.

To persist:

1. Assemble an `encontro` candidate (required field: `type`; key fields: `threat`, `party_level`, `party_size`; relations: `creatures→inimigo[]`, `location→local`, `treasure→item[]`, `session→sessao`).
2. If the encounter references creatures or items that **do not yet exist in the vault**, emit `inimigo` or `item` candidates for them as well.
3. Route all candidates to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate.

The entity shapes (required fields, allowed values, relation targets) are in `references/vault-entity-contract.md`. Consult it before emitting candidates.

## Off-stage handoffs

Every encounter surfaces nodes that may need attention. End with a structured handoff list:

- → `rpg-session-prep` (gamemaster): the completed encounter as a scene in the session plan
- → `rpg-front-tracker` (gamemaster): if the encounter is tied to a grim portent that should advance the clock
- → `rpg-npc-creator` (loremaster): for any named NPC who appears in the encounter as a named adversary
- → `rpg-location-creator` (loremaster): if the encounter location does not yet exist in the vault
- → `rpg-faction-creator` (loremaster): if the creatures are serving a faction whose plan-in-motion needs deepening
- → `rpg-clue-mapper` (loremaster): if the encounter should expose a revelation from the clue map

## Compact vs. Full

- **Compact:** threat tier · creature table (name, AoN category ref, level, role, XP) · budget arithmetic line (sum vs. budget; party level and size stated) · hazards · treasure by level · the situation block (objective / terrain / reason / escalation / exit) · Persist block with the `encontro` candidate (plus `inimigo`/`item` candidates for anything new). The runnable encounter, ready to drop into a session.
- **Full:** adds creature descriptions (one-line flavor per creature, AoN category ref, what makes them tactically interesting), the location description (sensory hook, interactive terrain detail), the full situation reasoning (why this fight exists in the campaign, how it ties to a front or revelation), alternative encounter configurations (swap one creature for another to change the threat tier), and the complete handoff list.

See `references/output-template.md` for the skeleton.

## Coherence — the thing that matters most

An encounter coheres when:

1. **The math is exact** and shown — budget, adjustment, running total, final vs. target.
2. **Party level and size are stated** — every recommendation is meaningless without them.
3. **The situation has an objective** beyond "kill everything" — the players must be able to choose a different path (escort and run, grab the item and flee, hold the line for N rounds).
4. **The terrain changes the fight** — a flat room with no features is a missed opportunity.
5. **The encounter connects to the campaign** — the reason the fight exists ties it to a front, a quest, or a revelation.

Two failure modes:

1. **The math-only encounter.** A correct budget with no situation — balanced but pointing nowhere. Fix: always write the encounter-as-situation block.
2. **The situation-only encounter.** A vivid scene with no math shown — exciting but unrunnable. Fix: always show the arithmetic.

## What to avoid

- **`?ID=` links to Archives of Nethys.** Category pages only. IDs change; broken links are worse than none.
- **Writing files directly.** Always route through `rpg-preserve`. No exceptions.
- **Inventing PF2e content.** Pick existing creatures/hazards/items from AoN and reskin; don't invent new mechanics.
- **Silent rounding.** If the math doesn't land cleanly, say so.
- **Re-setting tone.** Tone is inherited from the campaign (default dark-leaning level 3). The encounter follows the campaign's register; it does not introduce new tone.
- **Private campaign content in examples.** Examples in reference files use generic situations or clearly-public media only.
