# Output Template

The markdown skeleton for a non-combat challenge. There are two shapes — a **single dramatic check** and a **structured VP challenge** — and two depths (**Compact** runnable, **Full** with approach notes, per-degree branches, alternatives, and the complete handoff list).

Filename convention: save the challenge as `desafio-<slug>.md` (e.g., `desafio-conselho-do-porto.md`) in the user's working folder. Tell the user the path. The vault `desafio` entity is persisted separately via rpg-preserve — the document is the GM-facing human artifact; the vault entity is the machine-readable state.

> **Code-fence rule for this file:** the Persist section uses YAML blocks. Those blocks are NOT nested inside the skeleton fences below. Each skeleton fence closes before any YAML example appears. Count the fences — the count must be even.

---

## Skeleton A — single dramatic check

```markdown
# Desafio — [Challenge Name]
*Non-combat layer — Pathfinder 2e kit · Tone inherited: [level N] · Party: level [N], [N] characters · Single check*

---

## The Check

**Skill(s) the situation invites:** [the obvious approaches — e.g. Acrobatics; note others the GM should allow]
**DC:** [Level-Based DC for level N] [± adjustment, named] = **[final DC]**

| Degree | Result |
|---|---|
| Critical success (DC+10) | [a bonus beyond success] |
| Success | [they accomplish it] |
| Failure | [fail-forward — a cost or a new path, not a dead end] |
| Critical failure (DC−10) | [fail-forward — a steep cost, still not a dead end] |

---

## Situation

**Objective:** [the world-state being changed]
**Approaches:** [what's there / the obstacle — not a fixed skill list; the prep that lowers the DC]
**Reason:** [why this exists in the campaign]
**Escalation:** [the clock or complication, if any]
**Fail-forward:** [what failure costs — restated for emphasis]

---

> **Read-aloud / Para ler à mesa:**
> *[~40–70 words. The opening image — what the players perceive right now. Sensory, present-tense. Never narrate the PCs. End open.]*

---

## Off-stage / Handoffs
- → `rpg-session-prep` (gamemaster): [this check as a beat in the session plan]
- → `rpg-embate-forge` (foundry-forge): [to fire the roll live in Foundry]
- → [other loremaster handoffs as needed]
```

---

## Skeleton B — structured VP challenge

```markdown
# Desafio — [Challenge Name]
*Non-combat layer — Pathfinder 2e kit · Tone inherited: [level N] · Party: level [N], [N] characters · [Influence/Chase/Research/Infiltration/generic] · [accumulating/diminishing/multiple]*

---

## VP Structure

Party level: [N] | Party size: [N] | Subsystem: [preset] | Format: [format] | Scale: [scale]
**VP target: [N]** | Thresholds: [N / N / N — and what each does]

**Per-roll awards:** crit success [+2] · success [+1] · failure [0 / −1] · crit failure [−1 / −2]

| Threshold | VP | What it does in the fiction |
|---|---|---|
| [partial] | [N] | [the partial benefit/drawback unlocked here] |
| **Target** | **[N]** | **[the challenge resolved]** |

---

## DCs

| Beat / obstacle | Suggested skills (not exclusive) | Level-Based / Simple DC | Adjustment | Final DC |
|---|---|---|---|---|
| [the obstacle, described] | [e.g. Diplomacy, Society, relevant Lore] | [DC] | [named ± or —] | [DC] |
| [discovery that lowers a DC] | [e.g. Perception, Society] | [DC] | — | [DC] |

*Base DC anchored to Level-Based DCs (level [N] = DC [N]); reward prep by lowering DCs (Table 4). AoN — Rules: https://2e.aonprd.com/Rules.aspx*

---

## Situation

**Objective:** [the world-state the VP track IS]
**Approaches:** [what's there / the obstacle — not a fixed skill list; the prep that lowers DCs]
**Reason:** [why this challenge exists — front/quest/revelation/relationship]
**Escalation:** [the clock/complication/turn and its trigger]
**Fail-forward:** [what failure costs at each degree and each threshold — price or new path, never a dead end]

---

> **Read-aloud / Para ler à mesa:**
> *[~40–70 words. The opening image. Sensory, present-tense. Never narrate the PCs. End open on something the players want to act on.]*

---

## Off-stage / Handoffs
- → `rpg-session-prep` (gamemaster): [this challenge as a scene in the session plan]
- → `rpg-front-tracker` (gamemaster): [if the VP track should be a front clock the world advances]
- → `rpg-embate-forge` (foundry-forge): [the challenge journal, live rolls, VP clock]
- → `rpg-npc-creator` (loremaster): [any named influence target/opponent needing a dossier]
- → `rpg-location-creator` (loremaster): [if the location does not yet exist in the vault]
- → `rpg-faction-creator` (loremaster): [if it opposes a faction whose plan needs deepening]
- → `rpg-clue-mapper` (loremaster): [for a Research challenge that exposes a revelation]
```

---

## Persist

This section is **not** part of the challenge document above — it is a separate instruction to route the candidates to rpg-preserve after the GM has reviewed the challenge.

Hand these candidates to **rpg-preserve** (never write files directly):

### `desafio` candidate — [Challenge Name]

```
type: desafio
subsystem: influence / chase / research / infiltration / generic
vp_format: accumulating / diminishing / multiple     ← omit for a single check
scale: single-check / quick / long / session / background / forefront
vp_target: [N]                                        ← omit for a single check
party_level: [N]
location: "[[Local Vault Name]]"      ← optional; omit if no location
npcs:
  - "[[NPC Vault Name]]"              ← influence targets / opponents
faction: "[[Faccao Vault Name]]"      ← optional
session: "[[Sessao Vault Name]]"      ← optional; omit if not yet planned
act: "[[Ato Vault Name]]"             ← optional
items:
  - "[[Item Vault Name]]"             ← optional (research yields, rewards)
clock: "[[Relogio Vault Name]]"       ← optional; the VP track as a clock (see below)
```

*Thresholds, the per-roll award table, and the DC table live in the **note body**, not the frontmatter — the vault's YAML is flat (single-level; no nested maps).*

### `relogio` candidate (optional — the VP track as a clock)

If the VP track should be a progress clock the world can advance (and `rpg-embate-forge` can render), emit a `relogio` candidate and link it via `desafio.clock`:

```
type: relogio
segments: [vp_target]
filled: 0
status: ticking
```

### `npc` / `item` candidates (new entities only)

If the challenge names NPCs or items that do **not yet exist** in the vault, emit a candidate for each. Existing entities need no candidate — reference them by exact `[[Vault Name]]`.

```
type: npc
role: ally / neutral / antagonist / patron
```

```
type: item
```

*Add descriptive detail (the NPC's influence weakness, the item's nature) as the note body — the schemas require only the fields shown.*

---

## Full additions

The **Full** output adds these sections after Situation and before Handoffs/Persist:

### Approach Notes (Full)
For each beat: the obvious skills, the circumstance modifiers that reward preparation (which discovery lowers which DC), and at least one non-obvious approach the GM should reward. Never a closed list — the point is to widen participation, not narrow it.

### Per-degree fail-forward branches (Full)
For each threshold and the final target: what a critical success, success, failure, and critical failure each do to the world-state and the fiction. This is where "failure is a complication" gets concrete.

### Alternative framings (Full)
Run the same scene under a different subsystem or format — e.g. the standoff as a single Intimidation check vs. a diminishing "composure" VP track — with the revised numbers. Helps the GM right-size on the fly.

### Location Detail (Full)
One paragraph — the sensory qualities of the space and the two or three interactive details the players can use. Derived from the vault `local` note if it exists; drafted from the brief if not.

---

## Section-by-section guidance

### VP Structure / The Check (both shapes)
This is the non-negotiable section. State party level and size. Show the target, thresholds, and per-roll awards (or the single DC and its degrees). **Never silently round.** If the numbers don't land cleanly, say so and offer to adjust.

### DCs (VP challenge)
Anchor to Level-Based DCs for the party level, or Simple DCs by proficiency. Reward preparation by *lowering* DCs (Table 4), never by adding a required skill. Show the derivation.

### Situation (both shapes)
Five fields: objective, approaches, reason, escalation, fail-forward. Keep each to two to four sentences. This is a GM prompt — enough to run the scene, not enough to script it. The challenge is a starting position, not a story.

### Persist (both shapes)
Always include this block. The document is the human artifact; the `desafio` vault entity is the machine-readable state. Include `npc`/`item`/`relogio` candidates for any new entities. Without the Persist block, the challenge exists only in chat and cannot be cross-referenced by session-prep, the run-sheet, or rpg-embate-forge.

---

## Length targets

| Section | Compact | Full |
|---|---|---|
| VP Structure / The Check | full table + awards | included |
| DCs | DC table | + discovery DCs |
| Situation | five-field block | + per-degree branches |
| Read-aloud | opening image | + escalation read-aloud (opt-in) |
| Approach Notes | — | full notes + non-obvious approaches |
| Alternative framings | — | one alternative with revised numbers |
| Location Detail | — | paragraph + interactive details |
| Handoffs | brief list | full list |
| Persist | `desafio` + new `npc`/`item`/`relogio` candidates | included |
