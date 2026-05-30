---
name: rpg-campaign-foundation
description: Designs the dramatic foundation of a tabletop RPG campaign — the spine built before any map — using the Pathfinder 2e toolkit. This is the top of the kit and replaces a generic world/cosmology builder. Instead of inventing metaphysics, it builds THIS campaign's engine — a central antagonist or tension and its true motivation, 3-4 thematic pillars, an act structure with turns, the central secret and open questions, escalating signs that foreshadow the threat, a stance on which existing PF2e gods/planes/creatures the campaign leans on, session-zero questions, and a planning roadmap that hands off to the region, city, faction, location, and NPC skills. Use whenever the user wants to start, brainstorm, pitch, or plan a campaign, an arc, a central villain or BBEG, or a campaign premise/theme — phrasings like "começar uma campanha", "brainstorm de campanha", "I have a campaign idea", "design a central villain", "help me plan my campaign". Default tone dark-leaning (level 3 of 5), NOT grimdark.
---

# RPG Campaign Foundation (Pathfinder 2e, dark-leaning by default)

## What this skill is for

Build the **foundation of a campaign** — the dramatic spine a GM creates *before* any region, city, or dungeon: the central antagonist (or tension) and its true motivation, the thematic pillars, the act structure, the central secret, the escalating signs, and the planning roadmap that routes everything downstream. This is the **top of the kit**: it produces the document the rest of the skills feed off.

It uses **Pathfinder 2e (post-Remaster)** as the toolkit, referencing the [Archives of Nethys](https://2e.aonprd.com/) (AoN) for deities, planes, and creatures. Crucially, this skill does **not build cosmology** — it **adopts** PF2e's existing Great Beyond, pantheon, and bestiary and decides this campaign's *stance and spin* on them (see Step 3g). Original metaphysics is a rare, explicit override, not the default.

Default tone is **dark-leaning (level 3 of 5)**: heroic fantasy with shadowy inflections. See `references/tone-spectrum.md`.

## The core idea — start with the antagonist and the truth, not the world

This is the thing this skill exists to get right, and the reason it *replaced* a generic world-foundation skill.

Strong campaigns don't start from cosmology — they start from a **central dramatic engine**: an antagonist (or a central tension) and the *true motivation/secret* beneath it. Everything else — theme, acts, signs, the world itself — grows to *serve* that engine. The frameworks agree, and so does real practice:

- **Dungeon World — Fronts:** the campaign is driven by an antagonist's *plan in motion* and the *impending doom* if the heroes fail.
- **The Alexandrian — "don't prep plots, prep situations":** prep the situation and the trail of clues (the revelation list), not a script.
- **Sly Flourish — lazy campaign building:** start with a *hook* and a handful of *campaign truths*, capture them on a *one-pager*, then **spiral outward** from the characters rather than building everything first.

So the bedrock of a campaign foundation is **the central truth + the antagonist's plan.** If you can state "here's what's really going on, here's who's pushing it, and here's the doom if no one stops them," the campaign has a spine; theme, acts, and signs cascade from it. A foundation that opens with cosmology and geography but has no antagonist and no truth is a *setting*, not a campaign — start over from "what's really going on, and who wants it?"

This skill **hands off downward** — it does not build the world. When the foundation calls for a place, a city, an organization, a dungeon, or a person, it routes to `rpg-region-creator`, `rpg-city-creator`, `rpg-faction-creator`, `rpg-location-creator`, and `rpg-npc-creator`. It is the head of the chain, not a replacement for it.

## When to use this skill

Trigger when the user wants to start, brainstorm, pitch, or plan a campaign or arc at the top level — "começar uma campanha", "brainstorm de campanha", "I have an idea for a campaign", "help me design my BBEG / central villain", "what's the premise / theme", "I want to plan a new campaign", "let's figure out the big bad and the arc". Also trigger when the user is clearly at the *very start* of a new campaign and needs the spine before details.

Do **not** trigger for: a single region/nation (use `rpg-region-creator`), a city (use `rpg-city-creator`), an organization (use `rpg-faction-creator`), a dungeon/site (use `rpg-location-creator`), or a single NPC (use `rpg-npc-creator`). Those are *downstream* of this skill — when the foundation names one, hand it off. If the user already has a campaign spine and wants to build a piece of the world, point them to the right lower-layer skill.

## The workflow at a glance

1. **Co-create the brief** (interview, not a form — this skill *is* the brainstorm) — see `references/co-creation.md`. Draw out the seed; this is the most elicitation-heavy skill in the kit.
2. **Find the central truth + the antagonist's plan** — the dramatic engine. Lead here; everything hangs off it.
3. **Derive theme, acts, and signs** — pillars from the truth, act turns, the escalating foreshadowing.
4. **Set the open questions, the PF2e stance, and the session-zero layer** — what stays ambiguous, which canon the campaign leans on, what to bring to players.
5. **Emit the planning roadmap & handoffs** — route the rest downstream; mark what stays open vs. must be locked.
6. **Present and offer the first handoff** — save the file, point at the obvious next skill.

Read references by context (Section 2). Don't load all of them.

## Step 1: Co-create the brief — this skill IS the brainstorm

**This skill is a creative partner, not a vending machine — and here that matters most of all,** because a campaign foundation is the GM's most personal creative act. Your job is to draw the user's vision out, sharpen it, and fill gaps. Expect **several rounds** of interview; that's the feature, not a failure — as long as it's *elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end.** In short:

- **Match the user's language** in the entire document, including translated headings. Keep PF2e canon proper names (deities, planes, creatures, traits) and AoN URLs in English — they're anchors to the Archives of Nethys.
- **Read the room and set the mode.** A user with a vivid villain already → reflect, sharpen, fill gaps. A user with "I want to run something dark with Pharasma" → draw the engine out. "Just pitch me something" → generate a spine, named aloud, then refine. State the escape hatch early: *"Say 'just run with it' anytime and I'll draft the spine."*
- **Run the loop:** Open (pull their image first — "who or what is the threat, and what does it actually *want* underneath?") → Spark with 2–4 evocative options when stuck → Reflect it back sharper → Probe gaps and tensions → draft that piece and check in.
- **Lead with the central truth.** The single most generative question is *"what's really going on that the players don't know yet?"* Spend the most collaboration there. Theme, acts, and signs flow from it almost on their own.
- **Default the boring stuff** (exact NPC names, artifact counts). Ask about what's load-bearing for *their* vision. If you've asked twice without giving something back (a reflection, an option, a drafted beat), you've slipped into interrogation — give before you ask again.

You still need these, gathered through the loop: the **seed** (the spark — a villain, an image, a theme, a "what if"), the **scope** (one arc / full campaign / level range), **tone** (default **3**; honor overrides), **density** (**Compact** one-pager / **Completo / Full**), and whether they're using **ready-made canon** (PF2e/Golarion) or an original world (this sets how much the PF2e stance does in Step 3g).

## Step 2: Read references as needed

Five reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end (central to this skill) and the light read-aloud rule. **Load before intake, always.**
- **`references/campaign-frameworks.md`** — the design engine: the central truth, the antagonist's plan (Fronts), thematic pillars, act structure, escalating signs, open questions, session zero, and the planning roadmap. **Load for every campaign.**
- **`references/pf2e-cosmology-stance.md`** — how to *adopt and spin* PF2e's pantheon/planes/cosmology for a campaign's truth (not build new ones), with the deities/planes most useful as campaign engines. **Load when setting the PF2e stance (Step 3g).**
- **`references/output-template.md`** — the foundation skeleton (Compact one-pager / Full) with section guidance. **Load when ready to write.**
- **`references/tone-spectrum.md`** — the 1–5 scale applied to a campaign. **Load if tone ≠ 3 or unsure how dark to go.**

## Step 3: Build the foundation — truth and antagonist first

Order matters: the engine first, then everything that serves it.

**Read-aloud is light in this skill** (a foundation is GM-facing, not table-facing). The one natural beat: an optional **opening hook** block the GM can read to players in session one — the situation that starts the campaign. Mark it **Read-aloud** (PT-BR: **Para ler à mesa**), ~40–70 words, sensory, no PC actions narrated. Everything else is GM-facing prose.

### 3a. The central truth (do this first — it's the engine)
- **What's really going on** — the hidden situation that shapes everything. The truth the players don't know yet.
- **The antagonist's true motivation** — *why*, beneath the surface. The best dark-leaning villains are *arguable* (the "is the villain actually right?" test — leave it open). Not "wants power" — e.g. "believes seizing the throne is the only way to stop a catastrophe she alone foresees, and she may be right."
- **The cost/secret that makes it dangerous to know** — why the truth is buried, who buried it, what knowing it costs.

### 3b. The pitch (1 short paragraph + the hook)
- **The premise the players experience** — the mundane-looking entry point (a theft, a missing person, a job) that hides the truth.
- **The session-one hook** — what pulls the PCs in. Keep it small and concrete (Sly Flourish: start small, spiral out). Optional read-aloud block here.

### 3c. Thematic pillars (3–4)
Derived from the truth. Each pillar is a short phrase + a sentence on **how it recurs** across the campaign and **touches each PC personally.** (Invent them from the truth — e.g. "Power always sends the bill"; "Mercy and justice are not the same thing." Don't reuse stock examples.) These are the campaign's emotional throughline and the GM's compass for improvisation.

### 3d. The antagonist & the plan in motion
- **The antagonist** — who/what embodies the truth (and whether they're present, sealed, returning, or working through agents).
- **The plan in motion** — what's advancing *right now*, independent of the PCs (e.g. a cult's ritual nearing completion; a usurper's coup weeks away). Borrow `rpg-faction-creator`'s logic: a plan with steps and an **impending doom** if the PCs never intervene.
- **The visible agent / mid-boss** — the antagonist's hand the PCs actually meet first (the thief, the necromancer), since the true antagonist is often hidden or absent early.

### 3e. Act structure
3 acts (or arc beats for a single arc). For each: a **tone/feel**, the **turn** ("Act I ends when ___"), and a **level range**. The turns are the load-bearing part — they're where the truth surfaces in stages. Keep it a skeleton; sessions are built later (downstream).

### 3f. Escalating signs
The world showing the threat **before the PCs understand it** — foreshadowing by act, low-frequency to overt (e.g. early: livestock found bloodless → middle: more graves than deaths → late: shadows lagging behind their casters). Invent signs themed to *this* campaign's truth rather than copying stock ones. These let the GM seed dread from session one. At tone 3+, the signs should unsettle without explaining.

### 3g. The PF2e cosmological stance (adopt, don't invent)
This answers the "ready-made materials" question. **Do not build a cosmology.** Pick which existing PF2e elements this campaign's truth *leans on*, and decide the spin:
- Which **deity/deities** the campaign hinges on (e.g. a campaign about a hidden ascension might hinge on Norgorber; one about a plague on Urgathoa).
- Which **plane(s)** matter (the Boneyard, the Shadow Plane).
- Which **creature family** anchors the threat (undead, a fiend, a dragon, an aberration).
- The **spin**: your campaign's specific take on that canon (e.g. the temple's founding miracle was actually a massacre the faithful never learned about).
Link AoN category pages. Only if the user explicitly wants an original world do you generate new cosmology — and even then, lean on PF2e structures. See `references/pf2e-cosmology-stance.md`.

### 3h. Open questions
Three buckets:
- **GM knows, players discover** — the truths to reveal in stages (these feed the clue-map, Camada 4).
- **Deliberately ambiguous** — the big question left open on purpose (was the villain right?).
- **Feeds the next arc** — threads intentionally left dangling.

### 3i. Session zero & the players (collaborative layer)
The piece a pure GM-brainstorm forgets, and a best practice (Sly Flourish):
- **Worldbuilding questions to bring to players** — 3–5 specific questions whose answers you actually want from the table (their starting bonds, a faction they belong to, a local detail).
- **PC bonds to the theme** — a prompt per pillar tying each character to the campaign's heart, so the theme lands personally.
- **A safety-tools note** — for dark-leaning play, prompt Lines & Veils / an off-ramp. (Brief, non-preachy; dark themes need buy-in.)

### 3j. The planning roadmap & handoffs
The thing that makes this the *head of the kit*. Emit a layered to-do that routes downstream, in the user's own working order:
- **What's locked vs. open** — what the GM must decide before play (the ritual's internal logic, what the deity can/can't do) vs. what can stay open and be resolved in play (the mid-boss's full backstory, exact NPCs).
- **Handoffs**, naming specific items:
  - → `rpg-region-creator` / `rpg-city-creator`: the places the campaign needs
  - → `rpg-faction-creator`: the antagonist's organization, rival powers
  - → `rpg-location-creator`: the ritual site, key dungeons
  - → `rpg-npc-creator`: the antagonist, the mid-boss, the key allies
  - → (clue-map / revelation list — currently manual GM work): the 8–10 truths and where they're discovered

## Step 4: Present and offer the first handoff

Save as Markdown in the working folder, filename `campaign-<slug>.md`. Tell the user the path. For Full, summarize and link. Then offer the **single most useful first downstream move** — usually the region or the antagonist: "Want me to build [the region the campaign starts in] next, or flesh out [the antagonist] as an NPC?"

## Compact vs Completo (Full)

- **Compact (the one-pager):** central truth · pitch + hook · 3–4 pillars · antagonist + plan + impending doom · act turns (one line each) · the PF2e stance (which canon it leans on) · a short roadmap. The lean version Sly Flourish would put on one page.
- **Completo / Full:** adds escalating signs by act · open questions in three buckets · the full session-zero layer (player questions + PC-bond prompts + safety note) · the detailed PF2e stance with spin · the full layered roadmap with locked-vs-open. See `references/output-template.md`.

## Coherence — the thing that matters most

A campaign foundation coheres when **everything serves the central truth.** Test each element: *does this express, foreshadow, or complicate the truth?* A pillar that doesn't echo the truth, a sign that points nowhere, an act turn that doesn't surface the secret — cut or rewire. Two failure modes:

1. **The setting, not the campaign.** Cosmology, geography, history — but no antagonist, no truth, no doom. Fix: lead with "what's really going on and who wants it?"; route the world-building downstream.
2. **The railroad.** A fixed plot the players must follow. Fix (the Alexandrian): prep the *situation* (the plan in motion + the signs + the clues) and let the players act; keep the act "turns" as triggers, not scripted scenes.

## What to avoid

- **Building cosmology from scratch.** Adopt PF2e's and spin it; original metaphysics only on explicit request.
- **A villain who just "wants power".** Give a true motivation that's arguable from the inside (dark-leaning gold).
- **Theme as decoration.** Pillars must recur and touch the PCs, or they're a tagline.
- **Over-building.** This is a one-pager spine that *spirals out*, not a finished world. Hand the rest downstream.
- **A fixed plot.** Prep situations and clues, not scripted scenes.
- **Forgetting the table.** Include the session-zero/player layer and a safety note for dark tone.
- **Inflating tone past 3 without permission.** Dark-leaning, not grimdark.
- **Made-up AoN IDs.** Link the category page (`/Deities.aspx`, `/Planes.aspx`), never a `?ID=` URL.

## File output

Save as `campaign-<slug>.md` in the user's working folder. Tell the user the path. For Full, summarize and link rather than pasting the whole thing.
