---
name: rpg-faction-creator
description: Creates deep, ready-to-play factions for tabletop RPGs using the Pathfinder 2e toolkit — guilds, cults, noble houses, criminal syndicates, knightly orders, rebel cells, cabals, mercenary companies, secret societies. Unlike a region or city sketch, this deepens ONE faction into a dynamic agent that already has a drive and ideology, a plan it is pursuing right now, a doom if the PCs never intervene, a leader with a voice, internal structure and fractures, secrets the PCs can exploit, and an escalation ladder for how it fights or recruits the party. Use whenever the user asks to create, design, generate, flesh out, or detail a faction, guild, cult, order, syndicate, cabal, conspiracy, gang, crew, noble house, cell, or organization for tabletop play — especially Pathfinder 2e — or pastes a "Ready for rpg-faction-creator" handoff from a region or city dossier. Also trigger on "preciso de uma facção", "criar uma facção", "design a faction". Default tone is dark-leaning (level 3 of 5), NOT grimdark, NOT noblebright.
---

# RPG Faction Creator (Pathfinder 2e, dark-leaning by default)

## What this skill is for

Generate a **faction dossier** — a deep, playable profile of a single organization: a guild, cult, noble house, syndicate, knightly order, rebel cell, cabal, mercenary company. This is the skill you reach for when a faction that was *named* in a region or city dossier needs to become a force the PCs can join, oppose, exploit, or get crushed by.

This skill uses **Pathfinder 2e (post-Remaster)** as the lore and mechanical toolkit — it references the [Archives of Nethys](https://2e.aonprd.com/) (AoN) for deities (as patrons), creatures (as muscle and leadership), planes (as backers), and NPC stat blocks. The factions themselves are **original** (not Golarion canon).

The default tone is **dark-leaning (level 3 of 5)**: heroic fantasy with shadowy inflections. A faction can be genuinely noble and still rot at one edge; a villainous faction can have a sympathetic wing. See `references/tone-spectrum.md`.

## The core idea — a faction is an *agent*, not a description

This is the one thing that makes this skill different from every other skill in the kit, and the thing most faction write-ups get wrong.

A **region** coheres around geography. A **city** coheres around its central question. A **faction** is the only worldbuilding unit that has **agency** — it *wants* something and it is *already acting* to get it, whether or not the PCs ever show up. So this skill's job is not to *describe* a faction; it is to set one **in motion**. The great frameworks all say the same thing:

- **Dungeon World — Fronts:** a faction has an *Impulse* (what drives it), *Grim Portents* (the steps it takes if unchecked), and an *Impending Doom* (where it ends if nobody stops it).
- **Blades in the Dark — faction clocks:** factions act between sessions, advancing their goals in the background; the world is dynamic.
- **Colville:** factions are the engine of moral complexity — ideological tensions, grey areas, who benefits from disruption vs. the status quo.

So the **bedrock of a faction is its drive + the plan in motion**. Region- and city-creators already sketch factions statically (Want/Have/Hate). This skill's distinctive value is the **dynamic dimension**: what the faction is *doing right now*, where that *ends* if ignored, and how it *pushes back* against the PCs. If your dossier reads like a static org chart, you've written a region's faction blurb at greater length — you haven't done this skill's job.

## When to use this skill

Trigger when the user wants to design, deepen, or detail a single organization for play — "create a faction", "preciso de uma facção", "flesh out the Wharf Syndicate", "design a doomsday cult", "build a knightly order", "make the thieves' guild real" — or when they paste a "Ready for `rpg-faction-creator`" line from a region or city dossier. Also trigger when a campaign concept obviously needs an organized force the PCs will tangle with.

Do **not** trigger for: whole regions (use `rpg-region-creator`), single cities (use `rpg-city-creator`), a single person in isolation (use `rpg-npc-creator` — though this skill *hands off* its leader to it), or a single dungeon/lair (use a location-creator — though this skill hands off the faction's seat of power to it). A faction is a *people-organized-around-a-goal*; if the user wants a place or one person, point them to the right tool.

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — draw the user's vision out, sharpen it, fill gaps; see `references/co-creation.md`. Capture seed + type + reach + tone + density, and any region/city handoff.
2. **Find the drive** — the goal + impulse + ideology. Lead the elicitation here; everything hangs off it.
3. **Set the plan in motion** — what they're doing now, the doom if ignored (the dynamic core).
4. **Build the machine, the fracture, and the reaction ladder** — leader, structure, resources; the internal rot/secret; how they escalate against the PCs.
5. **Write the hooks** — how the PCs collide with the faction; moral cost at tone 3+.
6. **Present and hand off** — save the file, offer the next move, leave off-stage notes for downstream skills.

Read references by context (Section 2). Don't load all of them.

## Step 1: Co-create the brief — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Its central job is to draw the user's own ideas out, sharpen them, and fill gaps. Interviewing across several rounds is good, *as long as it's elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end before generating.** In short:

- **Match the user's language** in the entire dossier, including translated headings. Keep PF2e canon proper names (deities, creatures, traits, planes) and AoN URLs in English — they're anchors to the Archives of Nethys, which is English-only.
- **Read the room and set the mode.** Rich seed + "build it" → reflect, fill gaps, generate. Sparse seed or "help me think" → draw the vision out. "Just generate it" → autonomous defaults, named aloud. State the escape hatch early: *"Say 'just run with it' anytime and I'll fill the rest."*
- **Run the loop per load-bearing decision:** Open (pull their image first — "what does this faction *want*, and what do they tell themselves they're doing?") → Spark with 2–4 evocative options when they're stuck → Reflect it back sharper → Probe gaps and tensions → generate that section and check in.
- **Lead the elicitation with the drive** — the goal + the *why* beneath it. That's the faction's engine; spend the most collaboration there. Then the plan-in-motion, the leader, and the fracture.
- **Default the boring stuff** (exact lieutenant names, the precise AoN creature for muscle). Ask about what's load-bearing for *their* vision. If you've asked twice without giving something back (a reflection, an option, a generated beat), you've slipped into interrogation — give before you ask again.

You still need these before generating, gathered through the loop: **seed** (what the faction is), **type** (guild / cult / noble house / syndicate / order / rebel cell / cabal / company — sets the archetype; see `references/faction-frameworks.md`), **reach** (a single cell, a city power, a regional force, a continental order — sets scale of structure and doom), **tone** (default **3**; honor overrides, never silently pick another level), and **density** (**Compact** 1–2 pp / **Completo / Full** 3–4 pp). Surface optional constraints only if relevant: a patron deity, a featured PF2e creature, hard exclusions, the parent region/city's established facts.

### Receiving a handoff from rpg-region-creator or rpg-city-creator

If the user pastes a handoff line (e.g., "→ Ready for `rpg-faction-creator`: The Wharf Syndicate — smuggler oligarchy; internal rot named but unexplored"), treat its facts as **canon to honor and deepen**. Pull the faction's existing Want/Have/Hate, its named leader, its turf, and the parent settlement's central question, and grow the dynamic layer (plan, doom, reaction ladder) *consistent with* those facts. Note in off-stage anything you added or bent.

## Step 2: Read references as needed

Five reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end and the read-aloud rules. **Load before intake on every faction.**
- **`references/faction-frameworks.md`** — the design toolkit: the drive (goal/impulse/ideology), the plan-in-motion (grim portents / progress clock), the reaction ladder, faction archetypes, internal-rot patterns, orthogonality. **Load for every faction** — it's the engine of this skill.
- **`references/faction-canon-quickref.md`** — PF2e anchors for factions: deities as patrons (by faction type), creatures as leadership/muscle, planes as backers, cult/order markers, and NPC stat-block anchors. **Load when wiring in PF2e canon.**
- **`references/output-template.md`** — the dossier skeleton (Compact and Full) with section guidance and the hybrid dynamic rendering. **Load when ready to write.**
- **`references/tone-spectrum.md`** — the 1–5 scale and how to apply it to a faction. **Load if generating tone ≠ 3, or unsure how much shadow to add.**

## Step 3: Generate the dossier — drive first, then set it in motion

Order matters. The drive is the engine; the plan-in-motion is the signature; structure and reaction grow from both. Follow this order.

**Weave read-aloud at three beats** — the faction's **calling card** (how the PCs first encounter evidence of them), the **leader's voice** (one quoted line), and one **signature moment** (a ritual, a meeting, a reprisal). Mark each as a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**); keep each ~40–70 words, sensory, and **never narrate what the PCs feel or do**. Rules in `references/co-creation.md` Part B.

### 3a. The drive (do this first — it's the engine)
- **Goal** — what the faction wants, concrete and (almost) achievable. Not "power" — "control every dock lease in the city within a year."
- **Impulse** — the *why* beneath the goal: fear, faith, grievance, greed, love, duty. This is what makes the faction act rather than wait.
- **Ideology / stance** — what they believe and *who benefits if they win* (the Colville tension). A good faction can be argued *for*. State the case a sympathizer would make.

### 3b. Identity & calling card (1 short paragraph)
- **Name** + one-line essence (what they're known or whispered for)
- **Symbol / aesthetic** — the mark, the colors, the tell (a tattoo, a coin, a way of speaking)
- **Calling card** — how the PCs first meet evidence of the faction (read-aloud scene: graffiti over a rival's door, an enforcer collecting, the aftermath of a rite)

### 3c. The plan in motion (the dynamic core — this is the signature)
- **What they're doing now** — the concrete operation underway toward the goal.
- **The impending doom** — where it ends if the PCs never intervene (sinister enough to matter, not world-ending). This is the Dungeon World "impending doom."
- **(Full) Grim portents / progress clock** — the ordered steps from now to the doom, as a 4–6 segment clock. Each segment is a concrete event a GM can drop in. Mark which steps the PCs can see coming. (PF2e isn't clock-based, so present this as an optional GM tool, not a rule.)

### 3d. The machine (structure)
- **Leader** — name + one-line want (their *personal* goal, which may differ from the faction's) + a **read-aloud voice line**. Flag for `rpg-npc-creator`.
- **Inner circle (1–3 lieutenants)** — each is either a *lever* (a way for PCs to influence the faction) or a *fracture* (a coming split). Name them; one line each.
- **The base / rank-and-file** — who joins, *why* they join, and the **cost of membership** (what you give up, what you owe).
- **Resources & leverage** — the faction's "Have": coin, muscle, a relic, blackmail, a chokepoint, a patron. Concrete, exploitable.
- **Seat of power** — where they operate from. One line; hand off to a location-creator for the interior.

### 3e. The fracture (where dark-leaning earns its keep)
- **Internal tension** — the faction-within-the-faction: a hardline wing, an ambitious lieutenant, a coming schism. No faction is a monolith.
- **The secret / the leverage** — the thing the PCs can discover and use (the leader is dying; the holy relic is fake; the "charity" launders coin).
- **(Tone 3) the rot** — the gap between the faction's *ideal* and its *practice*. A noble order that quietly disappears dissenters; a liberation cell that's become the thing it fought. The rot should be *one part*, not the whole — contrast makes it land.

### 3f. How they respond to the PCs (the reaction ladder)
A faction is defined by how it pushes back. Give the escalation as narrative rungs:
**recruit/court → tolerate/watch → pressure/warn → retaliate → open war.** For each rung, one line on what that looks like *for this faction* (a cult recruits differently than a noble house retaliates).
- **(Full) reaction table** — an explicit "if the PCs do X → the faction does Y" table for 3–5 likely PC moves. This is the between-sessions tool a GM uses to keep the faction acting.

### 3g. Hooks — how the PCs collide (4–6)
Each hook is a concrete way the PCs intersect the faction: **join, oppose, exploit, get caught between, or be hunted.** Anchor each to the drive, a lieutenant, the secret, or the doom. At tone 3+, **at least 1–2 hooks carry a moral cost** (the faction is right about the wrong thing; opposing them helps someone worse). Mark moral-cost hooks.

### 3h. Off-stage notes (handoffs)
End with a structured list grouping un-expanded elements by downstream skill. Be specific — name things:
- → `rpg-npc-creator`: the leader, the most interesting lieutenant
- → a location-creator: the seat of power, a site from the plan-in-motion
- → `rpg-city-creator` / `rpg-region-creator`: if the faction implies new settlements or spread
- → Region/city context honored: facts inherited from a handoff
- → Tone / canon notes: deviations from base tone; deliberate contradictions

## Step 4: Present and offer to deepen

Save the dossier as Markdown in the working folder, filename `faction-<slug>.md`. Tell the user the path. For Full dossiers, summarize in chat and link — don't paste the whole thing. Offer the two most interesting next moves: "Want me to build [the leader] as a full NPC, or detail [the seat of power] as a location?"

## Compact vs Completo (Full)

Both cover every section in the same order; they differ in depth, and — per the hybrid decision — in **how the dynamic dimension is rendered**:

- **Compact (1–2 pages):** the plan-in-motion, doom, and reaction ladder are **narrative** (prose, no clocks/tables). Drive · identity + calling card · plan now + doom · leader (+voice) + 1–2 lieutenants + resources · the fracture/secret · reaction ladder as 5 rungs · 4 hooks · short off-stage.
- **Completo / Full (3–4 pages):** adds the **explicit structure** — a grim-portents **progress clock**, and an "if PCs do X → faction does Y" **reaction table** — plus a fuller machine (3 lieutenants, cost of membership, seat of power) and 6 hooks. The clock/table are presented as *optional GM tools* (PF2e isn't clock-based).

See `references/output-template.md` for the exact skeleton.

## Coherence — the thing that matters most

A faction coheres when **every part serves the drive or the fracture.** Pass each element through one test: *does this push the goal, or does it complicate the faction internally?* A lieutenant who does neither is decoration; a resource the faction never uses is set dressing. Two failure modes to avoid:

1. **The static org chart.** Ranks, titles, member counts, a history — with no plan and no motion. You wrote a description, not an agent. Fix: lead with what they're *doing now* and where it *ends*.
2. **The cardboard villain (or saint).** A faction that's purely evil or purely good. Fix: give the villainous faction a sympathetic wing or a true grievance; give the noble faction its rot. Per Colville, a faction you can argue *for* is the goal.

## What to avoid

- **Monolithic factions.** Every faction has internal tension. If yours is unanimous, add a fracture.
- **Goals without a plan.** "They want power" is a mood, not a drive. Name the concrete operation underway and the doom it leads to.
- **A faction that only reacts to PCs.** It should be acting *before* and *whether or not* the PCs engage — that's the whole point of the clock/doom.
- **Good-vs-evil framing.** State the case a sympathizer would make, even for a dark faction.
- **Full stat blocks.** Sketch the leader's personality and point at a reusable PF2e NPC block; hand deep work to `rpg-npc-creator`.
- **Inflating tone past 3 without permission.** Dark-leaning, not grimdark.
- **Inventing PF2e content / made-up AoN IDs.** Pick existing deities/creatures and reskin; link the **category page** (`/Deities.aspx`, `/Creatures.aspx`), never a `?ID=` URL.

## File output

Save the dossier as Markdown in the user's working folder, filename `faction-<slug>.md`. Tell the user the path. For Full dossiers, summarize and link rather than pasting the whole thing.
