# The Lazy DM Eight Steps (session-prep framework)

> **About the examples here:** illustrative only — generic, or from public media (e.g. Critical Role's *Vox Machina*). **Never reuse them verbatim** — they are teaching aids; copying them would bleed unrelated flavor into the user's game.

---

## The framework at a glance

The *Return of the Lazy Dungeon Master* (Sly Flourish / Mike Shea) names eight prep steps for a session. They are **modular** — skip what doesn't apply, reorder, spend most time where the payoff is highest. Each step is a *question to answer before the session*, not a mandatory deliverable.

| Step | The question | Weight |
|---|---|---|
| 1 | Review the characters | Light — 5 minutes |
| 2 | Strong start | High — sets the session's energy |
| 3 | Potential scenes | Medium — situations, not a sequence |
| 4 | **Secrets and clues** | **The spine — the single must-have** |
| 5 | Fantastic locations | Medium — one or two sensory anchors |
| 6 | Important NPCs | High — the three that matter most |
| 7 | Relevant monsters / threats | Medium — names and levels, not full statblocks |
| 8 | Rewards | Medium — tie to clue-map revelations |

---

## The secret of the eight steps — "prepare to improvise"

Mike Shea's own framing: the eight steps are not a checklist to complete uniformly. They are a **toolbox for preparing to improvise**. The goal is not to pre-plan every scene — it is to have the *right five things loaded* so that when the table surprises you (and it will), you can improvise confidently.

> **"Prep situations, not plots."** — The Alexandrian (Justin Alexander)
>
> A *situation* is an unstable configuration: a faction about to move, an NPC with a secret and a reason to hide it, a location with history that the players can disturb. Situations generate their own momentum. A *plot* is a sequence the GM has pre-resolved — it collapses the moment the players do something unexpected.

The practical implication: every item on the one-pager is a *readiness state*, not a script. The strong start gets the session moving. The scenes are options, not a timeline. The secrets are placed, not delivered. The one-pager is the launchpad you abandon when the table diverges — and that is exactly right.

---

## Step 1 — Review the characters

**Time: 5 minutes.** The fastest step, often skipped, always worth it.

Ask:
- What does each PC *want* right now — the thing driving them at this moment in the campaign?
- What level and resources do they have (any abilities / items / contacts just gained)?
- Is there an unresolved personal beat from last session that could surface today?

One note per PC, not a biography. This step shapes what scenes feel *personal* — a session where no PC gets a moment that touches their specific goal is a missed opportunity.

---

## Step 2 — Strong start (derived from the world-state)

**The opening image that drops the players immediately into action.**

The strong start is not invented fresh. It is **derived from the advanced fronts** — from what `rpg-front-tracker` produced as "what the world did since last session." The world has been moving while the PCs rested; the session opens *in the middle* of that movement.

**Sources for the strong start:**
- A grim portent that fired since last session — an event in the fiction with visible consequences
- A clock that crossed a threshold — the doom is visibly closer
- An NPC making their next move — a consequence of what the players did or didn't do

**What makes a strong start work:**
- It places the players *inside a situation already in motion*, not outside one about to start
- It creates immediate pressure — something to respond to, right now
- It does not explain itself — the players should feel the world and investigate the context

**Read-aloud for the strong start:** write one sensory block (~40–70 words, never narrating the PCs, ending open). This is the GM's table-opening line. See `output-template.md` for the format.

*(Generic example — do not reuse. A campaign front about a city's grain supply: the session opens with the PCs finding the last independent grain broker's stall shuttered, a crowd murmuring, and a new sign bearing an unfamiliar merchant's crest. No explanation. The world already moved.)*

---

## Step 3 — Potential scenes

**Three to five situations that might arise — not a timeline.**

Each scene is a *situation*, not an event:
- An NPC with a goal that may conflict with the PCs
- A location with something to discover or contest
- A pressure that the world or an enemy faction is applying

**What a scene is not:** a required stop on a route. The players may engage all five, two of them, or none — and create a sixth you didn't anticipate. That is the design.

**Ordering:** list by rough likelihood or by natural investigation geography, but do not mark them "Scene 1, Scene 2" as if they must happen in sequence. They are options in play.

**Each scene gets:** one sentence describing the situation's core tension, the vault names of the NPCs and location involved, and which secret or clue might be revealed here (its R-ID from the clue map).

---

## Step 4 — Secrets and clues (the spine)

**This is the single step to keep if you keep only one** (Mike Shea's own pick).

Secrets and clues are the information the players can potentially discover this session. They are not scripted revelations — they are *placed* in the scenes so the players can find them through investigation, roleplay, or combat. The delivery is diegetic; the placement is intentional.

### Wiring to the clue map

This skill's contract with the clue map (`clue-map-*.md`):

1. **Read the revelation IDs** (R1, R2, R3…) and their current state (revealed or unrevealed — tracked in the clue map or in the last `sessao` note).
2. **Carry forward unrevealed secrets.** If R3 was live last session and the players didn't reach it, R3 is on this session's checklist. Do not start fresh. The clue map is a running ledger.
3. **Select three to five live secrets** — the ones reachable this session given the scenes in play. Not every unrevealed secret belongs on every session's prep; only the ones where a delivery path exists.
4. **Key each secret to an R-ID.** The one-pager's secrets checklist uses the same IDs as the clue map, so the GM can tick them off and update the clue map after the session.

**The carry-forward is the design.** The players won't find everything every session. That's fine — the unrevealed secrets build to the moment when they finally do. A revelation deferred is not a failure; a revelation dropped is.

*(Generic example — do not reuse. In a city investigation: R2 (the harbormaster's complicity) was live last two sessions; the players kept chasing R1 (the missing shipments). R2 stays on the checklist, now with a new delivery path — the NPC who knows is about to leave the city. The approaching deadline makes the revelation feel urgent without forcing it.)*

### The "if they stall" backstop

For each live secret, name one proactive backstop: what happens if the session ends without the players finding it. Per the Alexandrian's principle, a clue can come to the players — a new incident drops the lead in their lap, the antagonist's next move exposes something. Tie the backstop to a clock tick or a grim portent so it feels diegetic, not rescue.

---

## Step 5 — Fantastic locations

**One or two distinct places with a sensory anchor.**

Not a full location write-up — one sentence naming the place (vault name) and two to three sensory details. Enough to improvise around. What makes it *fantastic*: an unusual physical quality, a history that shows through the present, or a mechanic that changes how the scene plays (height, concealment, a clock in the environment).

If the vault has no `local` note for a location needed in a scene, do not invent one. Hand off to `rpg-location-creator`.

---

## Step 6 — Important NPCs

**The three that matter most this session. Not the full cast.**

Each NPC gets three things:
- **Vault name** — exact, for wikilink validation
- **What they want right now** — their immediate goal, stated as a verb phrase
- **Voice / mannerism** — one quoted sentence in their voice, or a single physical tic

That is all. The NPC's history, backstory, and faction allegiance are in the vault note — the prep page is not the dossier. The GM reads the vault note separately.

**Match NPCs to secrets.** The most important NPCs are usually the ones who *hold or can deliver* the session's live secrets. Let the secrets list and the NPC list talk to each other.

---

## Step 7 — Relevant monsters / threats

**Names, levels, and roles — not full statblocks.**

For each threat expected in play:
- Name (vault name if the creature is an `inimigo` entity, or a type name)
- Level (relative to the party)
- Role (lurker, brute, controller, etc.)
- Whether it needs a full encounter build → flag for `rpg-encounter-builder`

If the vault has no `inimigo` note for a new creature type, name the threat and hand off to preserve for a new statblock, or reference the Archives of Nethys **category page** (never a `?ID=` URL) for the creature category.

---

## Step 8 — Rewards

**What the players might gain this session.**

- XP milestone (if using milestone advancement)
- Named item: vault name of an `item` entity, or flag for a new `item` candidate
- Quest resolution: vault name of the `quest` that completes or advances
- **A clue-map revelation as a reward.** Finding out is a reward. Tie a revelation (R-ID) explicitly to a reward moment — "if they find R4 this session, that's the act gate."

Keep rewards honest: list what the situation *could* produce, not what the GM intends to force. The players earn the reward by engaging with the situation; the GM's job is to make the situation engaging.

---

## Modular guidance — what to skip

**Bootstrap session (first session of a campaign):** skip Steps 2 (derive from the opening situation, not a front) and the carry-forward part of Step 4 (no previous session). Run the character review and the strong start as the opening scene.

**Pure investigation session:** Steps 4 (secrets) and 6 (NPCs) carry the whole session. Steps 3, 5, 7 are light. Step 2 is a clue-pressure open (something happened that makes an investigation urgent).

**Dungeon / combat-heavy session:** Step 7 expands, Step 4 stays (even fights have secrets — something the players can learn from the battle's context). Step 2 is the ambush or the approach.

**Between-arc session (travel, downtime):** Step 1 (character moments) and Step 8 (rewards for the arc just closed) lead. Secrets from the next arc's clue map go on the checklist as seeds.

---

## Sources

- Sly Flourish — [The Eight Steps of the Lazy DM (2023)](https://slyflourish.com/eight_steps_2023.html) and [The Secret of the Eight Steps](https://slyflourish.com/secret_of_the_eight_steps.html)
- The Alexandrian — [Don't Prep Plots](https://thealexandrian.net/wordpress/4147/roleplaying-games/dont-prep-plots), node-based scenario design
- Matt Colville — *Running the Game* (strong start; NPCs as name/goal/quirk)
