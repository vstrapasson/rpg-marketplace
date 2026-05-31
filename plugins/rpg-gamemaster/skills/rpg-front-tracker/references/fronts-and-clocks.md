# Fronts and Clocks — The Engine

> The operational theory behind `rpg-front-tracker`. Read before building or advancing any front.

> **About the examples here:** illustrative only — generic, or from public media (e.g. Critical Role's *Vox Machina* — the Chroma Conclave's advance as a multi-front campaign threat). **Never reuse them verbatim** — they are teaching aids.

> **Sources:** Dungeon World SRD — [Fronts](https://www.dungeonworldsrd.com/gamemastering/fronts/) · Blades in the Dark — [Progress Clocks](https://bladesinthedark.com/progress-clocks)

---

## 1. What a front is

A **front** is the Dungeon World model for an organized threat in motion — a danger with a will, a trajectory, and an endpoint.

A front is **not** a plot you run. It is a *threat you track*. The distinction is load-bearing: a plot requires the players to follow it; a front advances whether or not the players engage with it. When the players do engage, they push back against the clock — but the world doesn't wait for them.

### The anatomy of a front

| Component | What it is |
|---|---|
| **Name** | The front's identifying label — usually the danger's shape or scope ("The Syndicate's Long Harvest", "The Siege of the Outer Ring") |
| **Dangers** | The distinct threats within this front; a major faction may have 2–3 sub-dangers, each with its own clock |
| **Impulse** | What the danger *wants*, stated as a **verb phrase** — what it does when left alone ("to replace the city's grain supply with its own controlled network") |
| **Grim portents** | The 3–5 ordered steps toward doom — what happens, in sequence, if no one intervenes. Each portent is a concrete event, not a vague worsening. |
| **Impending doom** | The final state if all portents fire — specific, named, irreversible (or very costly to reverse) |
| **Stakes questions** | 1–3 open questions the front raises: things the *campaign* doesn't know yet, that the players' choices will resolve |
| **Cast** | The key named actors in this front — linked to vault `npc` and `faccao` entities |

### Example front (generic — do not reuse)

> **Front:** The Consortium's Grip on the Western Ports
> **Impulse:** to monopolize all cargo inspection and tax it beyond the reach of independent merchants
> **Grim portents:**
> 1. The Consortium places inspectors at the three largest docks
> 2. Independent dock-workers are fired and replaced with Consortium employees
> 3. Tariff rates triple for non-Consortium ships; a rival merchant goes bankrupt
> 4. The Harbor Council votes to formalize Consortium authority
> 5. The last independent shipping family sells out or flees
> **Impending doom:** The western ports are a Consortium-owned tollgate; nothing moves without their say
> **Stakes:** Will the PCs expose the vote-rigging before the Harbor Council meets? Can the shipping family be protected, or will they become the last sacrifice?

---

## 2. Campaign fronts vs. adventure fronts

**Campaign fronts** are the long-arc threats — the antagonist's master plan, the faction war that will define the campaign's outcome, the creeping doom tied to the campaign bible's thematic pillars. These are 6- or 8-segment clocks. They advance slowly, across many sessions.

**Adventure fronts** are session- or arc-scoped dangers — the baron's hired killers, the plague in the lower ward, the deadline before the trial. These are 4- or 6-segment clocks. They resolve quickly, often within an act.

A faction may have **both**: an adventure front (their immediate move this arc) nested inside a campaign front (their long-term plan). Track them separately. When the adventure front resolves, the campaign front may advance — the faction completed one step toward the larger doom.

---

## 3. Progress clocks — the tracking mechanism

A **progress clock** is a segment wheel that fills as a danger's portents occur. When the clock fills, the doom arrives (or the obstacle is overcome, if the clock tracks player progress rather than a threat).

### Clock sizing

| Segments | Use when |
|---|---|
| **4** | A contained, fast-moving danger or a single-session obstacle; one mistake and it's done |
| **6** | A campaign-level threat with room for one or two player interventions to matter |
| **8** | A slow-burn existential arc; the players have multiple windows to disrupt it |

**The sizing rule:** default to 6 for most campaign fronts. Go to 4 if the danger must be stopped *this arc* or the consequence is immediate. Go to 8 if this is the campaign's spine — the threat that frames the whole story.

### Make the clock about the obstacle, not the method

This is the single most important design rule for a well-structured clock.

**Wrong:** "The Syndicate Bribes the City Guard" — this is the method; if the players disrupt the bribe, the clock becomes incoherent.
**Right:** "The City Guard Is Compromised" — this is the obstacle; the players can disrupt it many ways (expose the briber, flip a guard, bribe them first), and the clock still tracks what matters.

Frame grim portents the same way: "The Watch Commander changes sides" is better than "The Syndicate delivers the agreed payment to the Commander." The second breaks if the money is intercepted; the first can still happen via coercion, blackmail, or a new recruiter.

---

## 4. Descriptive vs. prescriptive advancement

**Prescriptive advancement:** the clock advances on a fixed schedule (every two sessions, one tick). Mechanical and predictable — avoid it.

**Descriptive advancement:** the clock advances when the fiction says it should. After a session, ask: *which grim portents fit what happened?* If the Syndicate's portent was "the harbor inspector is replaced," and the players spent last session on a completely different arc, the inspector may have been quietly replaced off-screen. If the players directly confronted the Syndicate, maybe they slowed or reversed a portent.

This is the heart of the Dungeon World Fronts philosophy: **portents happen because they're true to the world, not because a timer expired.**

### The "if they stall" push

When the players stall or avoid a front entirely, don't force them down a track — **let the clock advance and push the consequence toward them**. The next portent fires, and the world changes in a way they can't ignore. The Alexandrian calls this "a guy with a gun walks through the door" — the antagonist's plan makes itself felt.

Tie the stall-push to a portent, not a deus ex machina: "The Consortium locks the second-largest dock, effective immediately. A merchant the players know can't unload his ship." The world moved because the front was ticking — and now the players care.

This push should feel **diegetic** (earned by the fiction) not punitive. The world isn't punishing them for not engaging; it's *being itself*.

---

## 5. Stakes questions

Stakes questions are the front's open questions — things the campaign doesn't yet know, that the players' choices will resolve. They're the *live* part of the front: not what happens if the players do nothing (that's the impending doom), but what could happen if they act.

Good stakes questions are:
- **Grounded in named characters and places** ("Will the harbourmaster realize he's been compromised before the vote?")
- **Genuinely open** — the answer could go either way
- **Tied to something the players care about** — a faction, a named NPC, a location

Avoid stakes questions that are just "will the players win?" — that's not a question; it's a goal. Ask about *how*, *who at what cost*, and *what the world loses even if they succeed*.

---

## 6. What happens when a clock fills

When all segments fill, the **impending doom arrives**. This is a significant narrative event, not just a GM note:

- Name the consequence specifically: not "the city falls under the Consortium's control" but "The Harbor Council formally transfers dock authority to the Consortium, signed by the Lord Steward, recorded in the city ledger."
- Mark the `frente` status as `resolved` (the doom came — or, if the players stopped it, `resolved` with a note that it was prevented).
- Describe the lasting change this creates in the world — what does the campaign look like now?
- If a campaign front fills and the players didn't stop it: that's not a game-over, it's a new situation. The world has changed; the players now operate in a darker context.

---

## 7. Anti-patterns

- **The clock that only ticks when the players look at it.** If portents never fire off-screen, the front isn't a living threat — it's a scripted event. Advance clocks between sessions.
- **The doom that doesn't matter.** If the impending doom has no consequence tied to something the players care about (a named NPC, a faction they've worked with, the campaign's thematic core), the clock has no tension.
- **Too many clocks at once.** More than 4–5 active clocks at a time is tracking overhead, not drama. Prioritize the fronts the players are currently brushing against. Dormant fronts need only a note, not active tracking.
- **Clocks that never resolve.** A front that advances to 7/8 segments and stays there loses its menace. Move it to resolution (doom or prevention) and start the next front.
- **Method-framed portents.** See §3: make the clock about the obstacle. Method-framed portents break when the players disrupt the method sideways.
