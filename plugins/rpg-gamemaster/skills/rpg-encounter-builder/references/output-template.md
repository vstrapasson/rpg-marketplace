# Output Template

The markdown skeleton for an encounter. Both versions share the structure; **Compact** is the runnable encounter with the budget math and the situation block ready to drop into a session, **Full** adds creature descriptions, location detail, expanded situation reasoning, alternative configurations, and the complete handoff list.

Filename convention: save the encounter as `encounter-<slug>.md` (e.g., `encounter-warehouse-enforcer.md`) in the user's working folder. Tell the user the path. The vault `encontro` entity is persisted separately via rpg-preserve — the encounter document is the GM-facing human artifact; the vault entity is the machine-readable state.

> **Code-fence rule for this file:** the Persist section uses YAML blocks. Those blocks are NOT nested inside the skeleton fence below. The skeleton fence closes before any YAML example appears. Count the fences — the count must be even.

---

## Skeleton (both versions)

```markdown
# Encounter — [Encounter Name]
*Mechanical layer — Pathfinder 2e kit · Tone inherited: [level N] · Party: level [N], [N] characters · Threat: [trivial/low/moderate/severe/extreme]*

---

## Budget Arithmetic

Party level: [N] | Party size: [N] | Threat: [tier] | Budget (party of 4): [XP] | Size adjustment: [±XP per extra/missing PC × N] | **Adjusted budget: [XP]**

| Creature / Hazard | AoN ref | Level | Relative level | XP each | Count | Subtotal |
|---|---|---|---|---|---|---|
| [description or vault name] | [category URL] | [N] | PL[+/-N] | [XP] | [N] | [XP] |
| [description or vault name] | [category URL] | [N] | PL[+/-N] | [XP] | [N] | [XP] |
| **Total** | | | | | | **[XP]** |

**[XP total] vs. [XP budget] — [on budget / N XP over / N XP under] → [tier confirmed or note]**

*AoN Monsters category: https://2e.aonprd.com/Monsters.aspx · Hazards category: https://2e.aonprd.com/Hazards.aspx*

---

## Hazards (if any)

| Hazard description | AoN ref | Level | Type | XP |
|---|---|---|---|---|
| [description] | [category URL] | [N] | Simple / Complex | [XP] |

*Add hazard XP to the running total above.*

---

## Treasure

Party level [N], [tier] encounter → **[gp from Table 4]** (per `pf2e-encounter-math.md` Table 4).

Named items (if any):
- [[Item Vault Name]] — [one-line description; new items flagged for rpg-preserve below]

---

## Situation

**Objective:** [what the players are trying to accomplish beyond "kill everything"]

**Terrain:** [one or two features that change the fight — what they do tactically, not just what they look like]

**Reason:** [why this fight exists in the campaign — the faction/front/quest/revelation it is tied to]

**Escalation:** [what changes mid-fight and the trigger — reinforcements/clock/morale turn/new objective]

**Exit:** [how the fight ends — morale threshold, objective achieved, negotiation point, escape route]

---

> **Read-aloud / Para ler à mesa:**
> *[~40–70 words. The opening image — what the players perceive right now. Sensory, concrete, present-tense. Never narrate the PCs. End open on something the players will want to act on — the terrain feature, the enemy's position, the ticking clock.]*

---

## Off-stage / Handoffs

- → `rpg-session-prep` (gamemaster): [this encounter as a scene in the session plan]
- → `rpg-front-tracker` (gamemaster): [if the encounter is tied to a portent that should advance a clock]
- → `rpg-npc-creator` (loremaster): [any named adversary who needs a full NPC dossier]
- → `rpg-location-creator` (loremaster): [if the encounter location does not yet exist in the vault]
- → `rpg-faction-creator` (loremaster): [if the creatures serve a faction whose plan needs deepening]
- → `rpg-clue-mapper` (loremaster): [if the encounter should expose a revelation from the clue map]
```

---

## Persist

This section is **not** part of the encounter document above — it is a separate instruction to route the candidates to rpg-preserve after the GM has reviewed the encounter.

Hand these candidates to **rpg-preserve** (never write files directly):

### `encontro` candidate — [Encounter Name]

```
type: encontro
threat: trivial / low / moderate / severe / extreme
party_level: [N]
party_size: [N]
creatures:
  - "[[Inimigo Vault Name 1]]"
  - "[[Inimigo Vault Name 2]]"
location: "[[Local Vault Name]]"
treasure:
  - "[[Item Vault Name]]"
session: "[[Sessao Vault Name]]"    ← optional; omit if session not yet planned
act: "[[Ato Vault Name]]"           ← optional; omit if not act-linked
```

### `inimigo` candidates (new statblocks only)

If the encounter names creatures that do **not yet exist** in the vault, emit an `inimigo` candidate for each. Creatures already in the vault need no candidate — reference them by exact `[[Vault Name]]` in the `encontro.creatures` relation.

```
type: inimigo
```

*Add any descriptive fields (name, level, role, AoN category ref) as the note body, not as frontmatter fields — the `inimigo` schema requires only `type`. The note body is where the statblock summary lives.*

### `item` candidates (new items only)

If the encounter names treasure items that do **not yet exist** in the vault, emit an `item` candidate for each.

```
type: item
```

*Add item name, level, and value as the note body.*

---

## Full additions

The **Full** output adds these sections after Situation and before Handoffs/Persist:

### Creature Descriptions (Full)

For each creature in the encounter:

| Creature | AoN category | Level | Role | Tactical note |
|---|---|---|---|---|
| [description] | [category URL] | [N] | lackey / standard / boss | [one line — what makes this creature tactically interesting; its signature ability or behavior] |

### Location Detail (Full)

One paragraph — the sensory qualities of the encounter space, what's changed recently, the two or three interactive details the players can use. Derived from the vault `local` note if it exists; drafted from the scene brief if not.

**Interactive terrain list:**
- [Feature 1] — [what a player can do with it; DC or effect if relevant]
- [Feature 2] — [same]

### Situation Reasoning (Full)

A paragraph for the GM: why this encounter exists in the campaign, how it connects to the front or quest, what changes in the fiction depending on whether the players win cleanly, win messily, or escape. This is GM-facing reasoning, not read-aloud.

### Alternative Configurations (Full)

Two alternative creature mixes for adjusting difficulty without rebuilding the encounter from scratch:

**Easier (one tier down):** [swap or remove a creature; show the revised total XP and the new tier]

**Harder (one tier up):** [add a creature or upgrade the boss; show the revised total XP and the new tier]

### Escalation Read-aloud (Full, opt-in)

For the escalation trigger: a ~30–40 word sensory block the GM reads when reinforcements arrive or the clock fires. Concrete, present-tense, never narrates the PCs.

> **Read-aloud / Para ler à mesa:**
> *[The moment the escalation triggers — what the players perceive. End on the new threat.]*

---

## Section-by-section guidance

### Budget Arithmetic (both versions)
This is the non-negotiable section. State party level and size on the header line. Show every creature and hazard with its XP contribution and AoN category ref. Show the adjusted budget (party of 4 base ± size adjustment). Compare total to budget and state whether it hits the target tier. **Never silently round.** If the numbers don't land cleanly, say so and offer to adjust.

### Treasure (both versions)
Use Table 4 from `pf2e-encounter-math.md` for the per-encounter allotment at the stated party level and threat tier. Name specific items if the GM has requested them or if they tie to the campaign; otherwise state the gp value and leave selection to the GM. New items that need vault entries go in the Persist block below.

### Situation (both versions)
Five fields: objective, terrain, reason, escalation, exit. Keep each to two to four sentences. This is a GM prompt — enough to run the scene, not enough to script it. The encounter is a starting position, not a story.

### Persist (both versions)
Always include this block. The encounter document is the human artifact; the `encontro` vault entity is the machine-readable state. Include `inimigo` and `item` candidates for any new entities. Without the Persist block, the encounter exists only in chat and cannot be cross-referenced by session-prep or the run-sheet.

---

## Length targets

| Section | Compact | Full |
|---|---|---|
| Budget Arithmetic | full table + adjusted budget | included |
| Hazards | table if present | included |
| Treasure | gp value + named items | included |
| Situation | five-field block | + situation reasoning |
| Read-aloud | opening image | + escalation read-aloud (opt-in) |
| Creature Descriptions | — | full table + tactical notes |
| Location Detail | — | paragraph + interactive terrain list |
| Alternative Configurations | — | two alternatives with revised XP |
| Handoffs | brief list | full list |
| Persist | `encontro` + new `inimigo`/`item` candidates | included |
