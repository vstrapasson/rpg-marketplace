---
name: rpg-clue-mapper
description: Builds the clue map / revelation list for a tabletop RPG mystery or investigation — the information architecture that makes a campaign's secrets discoverable without the investigation grinding to a halt. Grounded in the Three Clue Rule and node-based design (Justin Alexander) — for every revelation the players must reach, it places at least three independent clues across the locations, NPCs, factions, and events already in the world, connects them with leads, and adds proactive backstops for when the party gets stuck. Use whenever the user wants to map clues, build a mystery, plan an investigation, lay out revelations, apply the three clue rule, or answer "how do the players find this out?" — or pastes the "GM knows, players discover" truths from a campaign-foundation handoff. Phrasings like "mapa de pistas", "lista de revelação", "como eles descobrem", "design a mystery", "plan the investigation", "clue map". Tone is inherited from the campaign, default dark-leaning.
---

# RPG Clue Mapper (Pathfinder 2e kit — the investigation layer)

## What this skill is for

Build a **clue map** (revelation list) — the connective web that turns a campaign's *secrets* into a *playable investigation*. For every truth the players are meant to uncover, this skill lays down at least three independent clues across the world you've already built, connects the pieces with leads, and guarantees the mystery can't dead-end on a single missed roll.

This is the **investigation layer** of the kit (the "clue map" / revelation list a campaign needs after its foundation and world exist). It **consumes the outputs of the other skills**: the *revelations* come from `rpg-campaign-foundation`'s "GM knows, players discover" bucket; the *nodes* where clues live are the regions, cities, locations, factions, and NPCs from the other creators. It is the capstone that makes a mystery runnable.

## The core idea — this skill maps *information*, not fiction

Every other skill in the kit generates a fictional thing (a region, a city, a faction, a location, a campaign spine). **This one is different: it designs the flow of *knowledge*.** Its bedrock is not geography or drama — it's the **architecture of discovery**. The frameworks are unanimous (Justin Alexander, *The Alexandrian*):

- **The Three Clue Rule:** for each conclusion you want the PCs to reach, include **at least three clues** — because they will miss the first, ignore the second, and misinterpret the third. A mystery with one clue per conclusion is a trap that grinds to a halt.
- **Node-based design:** the world is a set of **nodes** (places, people, things, events); **clues** point from node to node (*leads*) or to a conclusion (*evidence*). A robust scenario gives each key node ≥3 clues *inside* it and ≥3 leads *pointing to* it.
- **Proactive backstops:** when the PCs stall, **push a clue to them** — a person walks in, a new incident happens, the antagonist moves. The investigation never depends on the players being Sherlock Holmes.

So the deliverable is a **revelation map**: revelations → ≥3 clues each → distributed across reachable nodes → connected by leads → with proactive backstops and a run-sheet the GM checks at the table. If your output is a single linear trail of "find clue A → unlocks B → unlocks C," you've built the trap the Three Clue Rule exists to prevent — restructure so every revelation has redundant, independent paths.

## When to use this skill

Trigger when the user wants to design the *discovery* side of play — "map the clues", "build a mystery", "plan the investigation", "lista de revelação", "mapa de pistas", "how do the players find out X?", "apply the three clue rule", "make sure my mystery doesn't dead-end" — or when they paste a campaign-foundation handoff's "GM knows, players discover" truths (the explicit input this skill is built to consume).

Do **not** trigger for: building the fiction itself — a region (`rpg-region-creator`), city (`rpg-city-creator`), faction (`rpg-faction-creator`), location (`rpg-location-creator`), NPC (`rpg-npc-creator`), or the campaign spine (`rpg-campaign-foundation`). This skill *uses* those as nodes; it doesn't create them. If the user needs a node that doesn't exist yet (a location to hide a clue in), point them to the right creator, then map the clue.

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — gather the revelations and the available nodes; see `references/co-creation.md`.
2. **List the revelations** — the conclusions the PCs must/can reach; mark core vs. optional; tie each to the act it gates.
3. **Place ≥3 clues per revelation** — across real nodes, typed as evidence or lead.
4. **Map the node web & sanity-check** — leads in/out; the Three-Clue inversion pass; flag single points of failure.
5. **Add proactive backstops & gating** — the anti-stall safety nets; what unlocks which act.
6. **Emit the GM run-sheet & hand off gaps** — the checkable table; route any missing nodes to the right creator skill.

Read references by context (Section 2).

## Step 1: Co-create the brief — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Run the elicitation front-end in **`references/co-creation.md`** before mapping. Two things make this skill's intake distinct:

- **Match the user's language** in the whole map, including headings. Keep PF2e canon names and AoN URLs in English.
- **It needs two inputs, and should pull them out, not assume them:**
  1. **The revelations** — what must the players figure out? If the user pastes a `rpg-campaign-foundation` "GM knows, players discover" list, use it directly. If not, elicit: *"List the things the players need to learn for this mystery to resolve."*
  2. **The nodes** — what's already in the world to hide clues in? Locations, NPCs, factions, events from prior skills. If the world is thin, note which nodes you'll need and offer to hand off to a creator skill.
- **Tone is inherited, not chosen here** — pull it from the campaign (default dark-leaning level 3). You set the *flavor of the clues*, not a new tone.
- Lead the elicitation on **the revelations and which are core** (must-find) vs. optional. Default the rest. If you've asked twice without giving something back, you've slipped into interrogation — give before you ask again.

## Step 2: Read references as needed

Three reference files (no tone-spectrum — tone is inherited from the campaign):

- **`references/co-creation.md`** — the interview front-end (eliciting revelations + nodes) and the light "discovery read-aloud" rule. **Load before intake.**
- **`references/clue-frameworks.md`** — the engine: the Three Clue Rule, evidence vs. leads, the node web and the inversion sanity-check, proactive backstops, permissive clue-finding, optional red herrings, gating, and the anti-patterns (single point of failure, the linear trail). **Load for every map.**
- **`references/output-template.md`** — the revelation-map skeleton (Compact / Full) including the clue table and the GM run-sheet. **Load when ready to write.**

## Step 3: Build the clue map

**Read-aloud is light here** — the one natural beat is the **discovery moment**: an optional short block for how a key clue *reads* when the PCs find it (the body, the ledger entry, the overheard line). Mark it **Read-aloud** (PT-BR: **Para ler à mesa**), ~30–60 words, sensory, no PC actions narrated. Most of the map is GM-facing structure.

### 3a. List the revelations
The conclusions the PCs must or may reach (from the handoff or elicited). For each: a one-line statement of the truth, whether it's **core** (the mystery can't resolve without it — must be findable) or **optional** (enriches but isn't required), and which **act/beat it gates** (ties to `rpg-campaign-foundation`'s act turns). Order them by the investigation's logic.

### 3b. Place ≥3 clues per revelation (the core)
For **every core revelation**, at least **three independent clues** — independent meaning a single failure (a missed roll, a killed NPC, a skipped location) can't remove all three. For each clue give:
- **Content** — what it actually tells the players (be concrete; "a ledger showing payments to the harbormaster" not "a financial clue").
- **Type** — **evidence** (points to the revelation) or **lead** (points to another node to investigate).
- **Node** — the specific existing location / NPC / faction / document / event where it lives.
- **Form** — how it's discovered (found, overheard, confessed, deduced, handed over).
Spread clues across *different node types* so they're not all gated behind the same action. Optional revelations can have fewer clues.

### 3c. Map the node web & sanity-check
List the **nodes** the clues live in; for each, note the clues *inside* it and the leads *pointing to* it. Then run the **inversion sanity-check** (Alexandrian): does each key node have **≥3 ways the PCs could reach it**, and does each core revelation have **≥3 surviving clues**? Flag any **single point of failure** (a revelation with one real clue; a node only reachable one way) and fix it by adding a redundant clue/lead.

### 3d. Proactive backstops (the anti-stall net)
For each **core revelation**, write one **proactive backstop**: what happens if the PCs miss all the placed clues — a clue that *comes to them*. A person seeks them out, a new incident drops the lead in their lap, the antagonist's next move exposes something. (Alexandrian: "a guy with a gun walks through the door.") This guarantees the mystery advances even when the table goes sideways. Tie backstops to the antagonist's plan-in-motion where possible, so the push feels diegetic, not deus ex machina.

### 3e. Leads, permissive finding & (optional) red herrings
- **Leads** connect nodes so investigating anything points somewhere next — no node is a true dead end for *progress*.
- **Permissive clue-finding:** note that clever, unplanned player approaches should be rewarded with information — the map is a floor of guaranteed paths, not a ceiling.
- **Red herrings are OFF by default.** The core map stays 100% robust. Only add false leads if the user explicitly asks — and when you do, give each a **recognition trigger** (a concrete way the PCs can realize it's a dead end) so it adds paranoia without grinding the game. (The Three Clue Rule and red herrings interact badly if the false leads aren't clearly resolvable.)

### 3f. Gating & pacing
Map which revelations **unlock which acts** (a core revelation is usually the act turn from the campaign foundation). Distinguish **core clues** (must be findable to progress) from **bonus clues** (reward investigation, deepen understanding). Keep the gates on core revelations only — don't gate progress behind optional discoveries.

### 3g. The GM run-sheet
End with a **checkable table** the GM uses live at the table — the practical payoff. Columns: **Revelation · Clues (with a ✓ box) · Node(s) · Backstop · Gates**. This is what the GM glances at mid-session to see what's been found and what safety net remains.

### 3h. Off-stage / hand off the gaps
If mapping surfaced a node that doesn't exist yet (a location to hide a clue, an NPC to deliver one), list it as a handoff:
- → `rpg-location-creator` / `rpg-city-creator` / `rpg-region-creator`: places a clue needs
- → `rpg-npc-creator`: a witness, an informant, the backstop-deliverer
- → `rpg-faction-creator`: an organization sitting on knowledge
- → back to `rpg-campaign-foundation`: if a revelation is missing or the truth needs sharpening

## Step 4: Present and offer the next move

Save as Markdown, filename `clue-map-<slug>.md`. Tell the user the path. Offer the most useful next move — usually "build the node where the keystone clue lives" or "flesh out the backstop NPC."

## Compact vs Completo (Full)

- **Compact:** the revelation list (core vs. optional) · the ≥3-clue table for each **core** revelation · one proactive backstop per core revelation · the GM run-sheet. The robust skeleton, ready to run.
- **Completo / Full:** adds the full **node web + inversion sanity-check** (with single-point-of-failure flags), clues for optional revelations, gating/pacing across acts, discovery read-aloud for keystone clues, the (opt-in) red-herring layer, and handoff notes for missing nodes.

See `references/output-template.md`.

## Coherence — the thing that matters most

A clue map coheres when **no core revelation can be cut off by a single failure.** Test the whole map by asking, for each core revelation: *if the players miss the most obvious clue, are there still at least two more, in different places, found in different ways — and a backstop if they miss those too?* If the answer is ever no, it's not done. Two failure modes:

1. **The single point of failure.** One clue, one place, one roll — the classic mystery-killer. Fix: redundancy (the Three Clue Rule).
2. **The linear trail.** A → B → C with no branching, so missing any link stops everything. Fix: node-based design — multiple leads into every key node.

## What to avoid

- **One clue per conclusion.** The cardinal sin. Always three for core revelations.
- **All clues behind the same gate.** If every clue needs the same skill/NPC/room, a single failure removes them all — spread across node types.
- **Gating progress behind optional clues.** Only core revelations gate acts.
- **Red herrings without an exit.** If you add them (opt-in), give each a recognition trigger.
- **Inventing nodes.** This skill places clues in the *existing* world; if a node is missing, hand off to the creator skill.
- **Deus ex machina backstops.** Tie the proactive push to the antagonist's plan so it feels earned.
- **Re-setting tone.** Tone is inherited from the campaign; clue flavor follows it.

## File output

Save as `clue-map-<slug>.md` in the user's working folder. Tell the user the path. For Full maps, summarize and link.
