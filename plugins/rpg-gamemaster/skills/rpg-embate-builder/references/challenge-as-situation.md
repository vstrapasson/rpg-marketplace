# Challenge as Situation

> **Examples are illustrative — never reuse verbatim.** All examples in this file use generic parties and generic settings, or clearly-public published media (e.g. Critical Role's *Vox Machina*). No private campaign content appears here. Copying an example into a real campaign produces unrelated flavor.

---

## Why a skill challenge is a situation, not a counter

A VP target tells the GM when the challenge is "done." It does not tell the players what to *do* — other than roll the same skill until the number is reached. That is the failure the whole subsystem exists to avoid.

The classic broken skill challenge is **"X successes before Y failures"**: a bare counter with one intended solution. It turns the scene into a **puzzle** (find the skill the GM is thinking of) instead of a **problem** (a situation with many possible approaches). It punishes the players whose characters aren't built for the GM's pre-planned skill, so only the best-modifier PC participates and everyone else waits. And because failure just increments a counter, a bad roll feels like nothing happened — the dreaded *whiff*.

A **situation** fixes this. It measures a **real thing in the fiction** — a world-state the players are trying to change — and every roll moves that thing or costs something. The math layer makes it runnable. The situation layer makes it worth running.

---

## The five elements of a challenge-as-situation

### 1. An objective that changes a world-state

The VP track must *be* something: a council's favor, a pursuer's distance, an archive's secrets surrendered, a stronghold's awareness of the intruders. The players should be able to answer "what are we trying to do here?" with a change in the world, not "hit 7."

**Useful world-states to track:**
- **Favor / trust** — an NPC or faction moves from hostile to cooperative (Influence).
- **Distance / lead** — the gap between the party and what they chase or flee (Chase).
- **Knowledge surrendered** — how much the source has given up (Research).
- **Progress vs. awareness** — two tracks: how far the heist has gotten, and how close the opposition is to noticing (Infiltration).
- **Resolve / composure** — whose nerve breaks first in a standoff or negotiation.

Name what the track is. "Council favor, 0→7" is a situation; "7 successes" is a counter.

### 2. Approaches, not an allowed-skill list

This is the "problem, not puzzle" rule. **Describe the situation in the third person — what is *there*, what the obstacle *is* — not the list of skills that solve it.** Let the players bring the approach; you adjudicate which skill fits and at what DC.

- Don't write: "Players make 3 Diplomacy checks and 2 Society checks."
- Do write: "The council is proud, mercantile, and afraid of the harbor closing. A councillor holds a private grudge against the speaker." Now a player can flatter (Diplomacy), threaten (Intimidation), out-argue with trade law (Society/Mercantile Lore), or expose the grudge (a discovery check first) — and each is a legitimate path you price with a DC.

Reward preparation and clever angles by **lowering the DC** (Easy −2, Very easy −5) rather than by adding a required skill. A scene where research and creativity visibly make the rolls easier is working as intended.

### 3. The reason the challenge exists

A challenge with no in-world reason is a dice exercise. Tie it to the campaign: a faction's plan, a front's portent, a quest stage, a clue-map revelation, a relationship under strain.

- *Why is this happening here, now?* One sentence tying to an existing campaign element.
- *What changes in the world if they win cleanly, scrape through, or fail?* Not just a reward — a shift in the campaign state.
- *What does the opposition want?* The council wants the harbor safe; the pursuer wants the package; the archivist wants to protect a secret. Opposition with goals behaves differently from a wall of DCs.

### 4. Escalation — what changes mid-challenge

The opening configuration is not the only one. Something shifts so the scene doesn't play out flat.

- **A clock / time limit** — the challenge has a number of rounds or beats; the tide closes the harbor, the patrol returns, the ritual completes. Pressure without a new obstacle. (Influence and Chase are usually time-bounded by default.)
- **A complication** — a critical failure or a threshold spawns a development: a councillor walks out, an alarm tier rises, a rival informant arrives.
- **A turn** — at a threshold the situation flips: a hostile NPC becomes persuadable, a shortcut opens, a new track appears.
- **Rising stakes** — later beats cost more or are worth more VP.

Quick and single-check challenges can stay flat. `long` and larger benefit from at least one escalation trigger.

### 5. Fail-forward exits — failure is a complication, never a dead end

This is the load-bearing rule for non-combat challenges. **A failed roll must cost something or open a new path — it must never simply stop the scene.** Name the consequence for failure and critical failure at each beat (and at each threshold for a VP challenge).

**Fail-forward consequences that work:**
- **A price** — they still progress, but at a cost: a favor owed, a resource spent, a reputation ding, a clue dropped to the enemy.
- **A new path** — the front door fails, so the scene becomes a chase, a bluff, or a hunt for another way in. (Capture leads to a prison break; a botched negotiation leads to a duel.)
- **A harder continuation** — the next check is Hard +2; a complication track advances; awareness rises.
- **A partial outcome** — they get *some* of what they wanted, plus a string attached.

The bad outcome of the *whole* challenge (running out of beats, awareness maxing, the diminishing track hitting 0) should itself fail forward at the campaign level: the harbor closes *for now*, the quarry escapes *with* a trail left behind, the heist is blown *but* the party learns what they came to learn. A skill challenge should rarely be the place a campaign hits a wall.

---

## The two traps to call out by name

When you build or critique a challenge, watch for these:

1. **The "X successes before Y failures" trap.** A bare success/failure counter with one intended skill. Fix: measure a world-state (§1), open the approaches (§2), and make failure cost something specific (§5).
2. **The whiff / non-participation problem.** Only the best-modifier PC can contribute, so the rest wait. Fix: invite multiple skills (§2), let preparation lower DCs, and give different beats different obstacles so different characters shine.

---

## The situation block in the output

Every challenge this skill produces ends with a situation block before the Persist section. The block answers five questions in plain sentences:

```
Objective:   [the world-state the players are changing — what the VP track IS]
Approaches:  [what's there and what the obstacle is — NOT a fixed skill list; note the prep that lowers DCs]
Reason:      [why this challenge exists in the campaign — tied to a front/quest/revelation/relationship]
Escalation:  [the clock/complication/turn, and the trigger]
Fail-forward: [what failure costs at each degree/threshold — the price or new path, never a dead end]
```

Keep it short. The situation block is a GM prompt, not a scene description. Two to four sentences per field is enough; more belongs in the Full output's expanded reasoning.
