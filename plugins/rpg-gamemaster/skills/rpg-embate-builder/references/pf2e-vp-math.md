# PF2e Non-Combat Challenge Math (Victory Points) — Verified Reference

> Numbers verified against Archives of Nethys on build; PF2e is errata-sensitive — re-verify if a discrepancy appears at the table.

> **Source:** Pathfinder 2e GM Core — Victory Points subsystem and the named subsystems (Influence, Chase, Research, Infiltration); Difficulty Classes. See Archives of Nethys (https://2e.aonprd.com/Rules.aspx) for the authoritative current text.

> **Examples are illustrative — never reuse verbatim.** All worked examples use generic parties and generic situations. No private campaign content appears anywhere in this file.

---

## 1. Victory Points — the three formats

A Victory Point (VP) challenge tracks the party's progress **beyond a single check** — it measures a real thing in the fiction (a council's favor, a pursuer's distance, a heist's awareness level) and resolves over several rolls. Pick one format:

| Format | How it works | Use for |
|---|---|---|
| **Accumulating** | Start at 0; gain VP toward a target. | Influence, research — building toward a goal. |
| **Diminishing** | Start at the target (full); lose VP; failure at 0 is the bad outcome. | "Hold out / don't get caught" — endurance, evasion. |
| **Multiple tracks** | Two or more independent counters running at once. | Infiltration (progress **and** awareness); a chase with two escape routes. |

**Default per-roll awards (accumulating):**

| Result | VP |
|---|---|
| Critical success | +2 |
| Success | +1 |
| Failure | 0 |
| Critical failure | −1 |

**Diminishing track:** Failure −1, Critical failure −2; Critical success +1 (if regaining ground is possible, else treat as Success); Success no loss.

Adjust the awards if the fiction calls for it, but state the table you used.

---

## 2. The scale table — sizing the target and thresholds

This is the analogue of the encounter XP budget: it tells you **how many VP** the challenge is worth and where the **thresholds** (partial benefits, or partial drawbacks in a diminishing track) sit.

**Table 1: VP scale by duration**

| Scale | VP target | Thresholds | What it is |
|---|---|---|---|
| `single-check` | — | — | One dramatic check; no VP track (see §6). |
| `quick` | 3–5 | — | A brief skill scene resolved in a few rolls. |
| `long` | 7–10 | 4 | A full set-piece (one audience, one chase). |
| `session` | 15–25 | 5 / 10 / 15 | A challenge that spans most of a game night. |
| `background` | 15–20 | — | A slow-burn arc tracked in the background. |
| `forefront` | 25–50 | 10 / 20 / 30 / 40 | The campaign's central non-combat challenge. |

**Thresholds** are where the party earns a partial benefit before the final goal — a faction starts to cooperate, a rumor confirms, a guard patrol is bypassed. In a diminishing track they are partial drawbacks (an alarm tier rises). Name what each threshold *does* in the fiction.

---

## 3. Level-Based DCs

When the challenge's difficulty is tied to a level (the party's, an opponent's, a task's), use the Level-Based DC. Anchor: **Level 0 = DC 14**, then **+1 per level** (with a few +2 steps at higher levels), reaching **DC 50 at level 25**.

**Table 2: Level-Based DCs (common band)**

| Level | DC | Level | DC | Level | DC |
|---|---|---|---|---|---|
| −1 | 13 | 6 | 22 | 13 | 31 |
| 0 | 14 | 7 | 23 | 14 | 32 |
| 1 | 15 | 8 | 24 | 15 | 34 |
| 2 | 16 | 9 | 26 | 16 | 35 |
| 3 | 18 | 10 | 27 | 17 | 36 |
| 4 | 19 | 11 | 28 | 18 | 38 |
| 5 | 20 | 12 | 30 | 19 | 39 |

*(The full table runs to level 25 = DC 50; verify higher levels on AoN — Rules.)*

---

## 4. Simple DCs by proficiency

When the task has **no level** but corresponds to a rank of training, use the Simple DC. Best for on-the-fly checks.

**Table 3: Simple DCs**

| Proficiency | DC |
|---|---|
| Untrained | 10 |
| Trained | 15 |
| Expert | 20 |
| Master | 25 |
| Legendary | 30 |

---

## 5. DC adjustments

Nudge a Level-Based or Simple DC to match the specific task. Reward preparation and clever approaches by lowering the DC; punish reckless or under-prepared ones by raising it.

**Table 4: DC adjustments**

| Adjustment | Δ | When |
|---|---|---|
| Incredibly easy | −10 | The PCs have made it trivial. |
| Very easy | −5 | Significant advantage. |
| Easy | −2 | A small edge (good leverage, the right tool). |
| Hard | +2 | A small obstacle. |
| Very hard | +5 | A serious obstacle; the wrong approach. |
| Incredibly hard | +10 | Nearly impossible without a plan. |

A challenge where research and clever strategy visibly lower the DCs is working as intended — that is the reward for engaging the situation rather than rolling blindly.

---

## 6. The single dramatic check

For a one-beat test, skip the VP track entirely:

1. Set the DC (Level-Based for the party level, or a Simple DC), with one named adjustment.
2. Name the **four degrees of success** (PF2e: beat the DC by 10 = critical success; meet/beat = success; miss = failure; miss by 10 = critical failure).
3. Write a **fail-forward** consequence for failure and critical failure — failure costs something or opens a new path; it never just stops the scene.

Record `scale: single-check` and omit `vp_format` / `vp_target`.

---

## 7. The subsystem presets

Each preset is a Victory Points structure with a typical shape. Load the one that matches the scene; default to **generic** if none fits.

### Influence (social) — accumulating
A structured social encounter to sway one or more NPCs. Discovery checks (Perception, Society, relevant Lore) reveal an NPC's **influence skills, resistances, and weaknesses**; influence checks (Diplomacy, Deception, Intimidation, Performance, the right Lore) earn VP toward an influence threshold per NPC. Often **time-bounded** (a number of rounds = conversation beats). Thresholds = tiers of cooperation. Reward research: learning a weakness lowers the influence DC.

### Chase — accumulating, time-pressured
Fast obstacles in sequence; each PC tackles the obstacle in front of them with an obstacle-specific skill (Athletics to vault, Acrobatics to weave, Society to know a shortcut). VP = progress along the chase; the quarry or the pursuit has its own target. Built for momentum — short, escalating, every round a new obstacle. A diminishing "distance" track models "don't let them get away."

### Research — accumulating, threshold-gated
Scenes where the PCs dig for information (a library, an archive, an informant network). Research checks earn VP; **thresholds release information** — each tier reveals a fact. Best when ≥3 different skills/sources can contribute (so it doesn't gate on one Library Lore). Pairs with the clue map: each threshold can expose a revelation ID.

### Infiltration — multiple tracks
Heists and break-ins where planning matters. Track **infiltration progress** (objectives reached) and **awareness** (how close the opposition is to noticing) as parallel counters. Preparation activities before the run lower DCs or add VP. Complications raise awareness; reaching max awareness flips the scene to a fight or a flight.

### Generic — pick any format
No preset fits. Choose accumulating / diminishing / multiple, set the scale, name what the VP *is* in the fiction, and assign DCs. Everything else in this file still applies.

---

## 8. The honesty rules

When using this reference to build a challenge or advise a GM:

1. **Always show the VP arithmetic.** State the format chosen, the target and thresholds, the per-roll awards, and how the target is reached.
2. **Always state the assumed party level and size.** Every DC is meaningless without them.
3. **The math must be exact.** If a number is uncertain or a discrepancy is suspected, say so explicitly and point the GM to verify on Archives of Nethys — Rules (https://2e.aonprd.com/Rules.aspx).
4. **Never round silently.** If a calculation produces an awkward number, state it and let the GM decide.
5. **Flag errata sensitivity.** PF2e has been remastered; prefer the current AoN tables over older community sources.

---

## 9. Worked example — full VP sizing (generic)

**Scenario:** A level-3 party of 4. The PCs have one long audience to turn a guild council before it closes a trade route. Influence subsystem, one council as the influence target.

**Step 1 — Format and scale.** Accumulating (build favor). Scale: `long` → target **7 VP**, threshold **4**.

**Step 2 — Thresholds (name what they do).**
- Threshold 4 → the council agrees to *hear* the proposal (the hostile speaker stands down).
- Target 7 → the council *cedes* (the route stays open).

**Step 3 — DCs.** The council leader is the obstacle. Level-Based DC for level 3 = **DC 18** (Table 2). A discovery check that uncovers the leader's grudge applies **Easy −2 → DC 16** to influence checks that play on it (Table 4). The default reward: Diplomacy/Deception/Intimidation/relevant Lore at DC 18 (16 with leverage).

**Step 4 — Per-roll awards.** Crit +2, success +1, crit-fail −1 (Table, §1). So the party reaches 7 in roughly 4–7 influence checks depending on crits — about one round each across a tense conversation.

**Step 5 — Fail-forward.** A critical failure doesn't end the audience; it hardens one councillor (the *next* influence check on them is Hard +2) and burns a conversation beat. Running out of beats before 7 → the route closes **for now**, but the threshold-4 benefit (they listened) opens a later approach.

VP target 7, threshold 4, DCs 18/16, awards +2/+1/−1. Arithmetic shown.

---

## 10. Quick-reference summary

| What you need | Table |
|---|---|
| VP per-roll awards | §1 |
| VP target + thresholds by scale | Table 1 |
| DC by level | Table 2 |
| Simple DC by proficiency | Table 3 |
| DC adjustments | Table 4 |
| Subsystem structure | §7 |

**Key anchors to memorize:**
- Level-Based DC: level 0 = 14, +1/level.
- Simple DCs: 10 / 15 / 20 / 25 / 30 (untrained → legendary).
- A `long` challenge ≈ 7–10 VP with a threshold at 4.
- Default awards: crit +2, success +1, crit-fail −1.

---

*Source: Pathfinder 2e GM Core — Victory Points, Influence, Chases, Research, Infiltration, and Difficulty Classes. Archives of Nethys — Rules: https://2e.aonprd.com/Rules.aspx.*
