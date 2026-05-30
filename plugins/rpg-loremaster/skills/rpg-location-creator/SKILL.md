---
name: rpg-location-creator
description: Creates ready-to-play locations for tabletop RPGs using the Pathfinder 2e toolkit — dungeons, lairs, ruins, crypts, tombs, temples, towers, caves, shrines, manors, forts, vaults, and landmarks. Unlike a region or city, this builds the bounded space the PCs physically enter and explore, grounded in why it exists and who lives there now — it always answers "why hasn't anyone cleared it?". Produces a premise and ecology, a fantastic feature, a non-linear keyed space with loops and multiple entrances, inhabitants and hazards from the PF2e bestiary, treasure and secrets, a dynamic element, and adventure hooks. Use whenever the user asks to create, design, generate, flesh out, map, key, or detail a dungeon, lair, ruin, crypt, tomb, temple, tower, cave, shrine, manor, fort, vault, or landmark for tabletop play — especially Pathfinder 2e — or pastes a "Ready for a location-creator" handoff from a region, city, or faction dossier. Default tone dark-leaning (level 3 of 5), NOT grimdark.
---

# RPG Location Creator (Pathfinder 2e, dark-leaning by default)

## What this skill is for

Generate a **location dossier** — the bottom of the worldbuilding stack: the bounded, explorable space the PCs physically *enter*. A dungeon, a lair, a ruin, a crypt, a temple, a tower, a cave system, a haunted manor, a roadside landmark. This is the skill that turns "the Drowned Vault" or "the seat of power" named in a region/city/faction dossier into a place the party can walk into, fight through, and loot.

This skill uses **Pathfinder 2e (post-Remaster)** as the toolkit — it references the [Archives of Nethys](https://2e.aonprd.com/) (AoN) for creatures, hazards, traps, and planar sources. The locations are **original** (not Golarion canon).

Default tone is **dark-leaning (level 3 of 5)**: heroic fantasy with shadowy inflections. A location can hold real treasure and real horror; victory is possible but the place has teeth and a history. See `references/tone-spectrum.md`.

## The core idea — a location is a *place that makes sense*, not a level

This is the thing that separates a memorable location from a video-game corridor, and it's the bedrock that makes this skill different from the rest of the kit.

A **region** coheres around geography, a **city** around its central question, a **faction** around its drive. A **location** coheres around **premise + ecology** — *what it was, what it is now, who lives here, and why it still stands unclaimed.* The skill's signature mandate, every time: **answer "why hasn't anyone cleared it yet?"** A nearby town that's known about a treasure-filled ruin for fifty years and never looted it needs a reason — a curse, a guardian, a taboo, a thing that comes back, a price too high. That reason *is* the location's spine. The great frameworks all point here:

- **Gygaxian naturalism / "living dungeons" (Sly Flourish):** a location should operate *outside the context of the PCs* — it has a function, an ecology, inhabitants who eat, patrol, and feud whether or not the party arrives.
- **Xandering the dungeon (Justin Alexander, after Jennell Jaquays):** lay it out *non-linearly* — loops, multiple entrances, vertical connections — so exploration is a series of meaningful choices, not a railroad corridor.
- **The Five Room Dungeon (Johnn Four):** a lean pacing skeleton — entrance/guardian → puzzle/roleplay → trick/setback → climax → reward/revelation — so even a small site is a complete, playable beat sequence.

So this skill builds **premise + ecology first**, then renders the space (non-linear) and the pacing (five-room beats). If your output reads like a numbered list of rooms with a monster in each and no reason to exist, you've built a level, not a place — start over from "why is it here and why is it still here?"

## When to use this skill

Trigger when the user wants to design, map, key, or detail a single bounded site for play — "create a dungeon", "design a crypt", "make a lair for the cult", "flesh out the Drowned Vault", "map a haunted manor", "build a wizard's tower" — or when they paste a "Ready for a location-creator" line from a region, city, or faction dossier (the seat of power, a named ruin, a vault).

Do **not** trigger for: whole regions (use `rpg-region-creator`), whole settlements (use `rpg-city-creator`), an organization (use `rpg-faction-creator`), or a single person (use `rpg-npc-creator`). A location is a *place*; if the user wants a territory, a town, a group, or a character, point them to the right tool. (This skill *receives* handoffs from all of those and *hands off* its inhabitants to `rpg-npc-creator`.)

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — draw the user's vision out, sharpen it, fill gaps; see `references/co-creation.md`. Capture seed + type + size + tone + density, and any region/city/faction handoff.
2. **Establish premise & ecology** — what it was, what it is, who's here, and **why it hasn't been cleared**. Lead the elicitation here; it's the spine.
3. **Render the space and the pacing** — the non-linear keyed map (or five-room beats) + inhabitants, hazards, treasure, secrets.
4. **Add the dynamic element and the hooks** — what changes if the PCs linger; why they come and what's at stake.
5. **Present and hand off** — save the file, offer the next move, leave off-stage notes.

Read references by context (Section 2). Don't load all of them.

## Step 1: Co-create the brief — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Its central job is to draw the user's own ideas out, sharpen them, and fill gaps. Interviewing across several rounds is good, *as long as it's elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end before generating.** In short:

- **Match the user's language** in the entire dossier, including translated headings. Keep PF2e canon proper names (creatures, hazards, traits, planes, deities) and AoN URLs in English — they're anchors to the Archives of Nethys, which is English-only.
- **Read the room and set the mode.** Rich seed + "build it" → reflect, fill gaps, generate. Sparse seed or "help me think" → draw the vision out. "Just generate it" → autonomous defaults, named aloud. State the escape hatch early: *"Say 'just run with it' anytime and I'll fill the rest."*
- **Run the loop per load-bearing decision:** Open (pull their image first — "what does this place *feel* like when the PCs first see it, and what's the one thing wrong with it?") → Spark with 2–4 evocative options when they're stuck → Reflect it back sharper → Probe gaps and tensions → generate that section and check in.
- **Lead the elicitation with premise & ecology** — especially *why it hasn't been cleared.* That's the spine; spend the most collaboration there. Then the fantastic feature, the inhabitants, and the layout.
- **Default the boring stuff** (exact room dimensions, the precise ambient creature, trap DCs). Ask about what's load-bearing for *their* vision. If you've asked twice without giving something back (a reflection, an option, a generated beat), you've slipped into interrogation — give before you ask again.

You still need these before generating, gathered through the loop: **seed** (what the place is), **type** (dungeon / lair / ruin / crypt / temple / tower / cave / manor / landmark — sets ecology and hazard palette; see `references/location-frameworks.md`), **size** (a single site of 1–3 areas / a small complex of 5–8 / a multi-level dungeon of 10+ — sets the map scope), **tone** (default **3**; honor overrides, never silently pick another level), and **density** (**Compact** 1–2 pp / **Completo / Full** 3–4 pp). Surface optional constraints only if relevant: a featured PF2e creature, a patron/planar source, hard exclusions, the parent region/city/faction's established facts, the party level (to scale threats).

### Receiving a handoff from region / city / faction

If the user pastes a handoff (e.g., "→ Ready for a location-creator: The Drowned Vault — the Syndicate's flooded treasury under the docks"), treat its facts as **canon to honor and expand**. Pull the owning faction, the parent settlement/region, the implied contents, and the dark-leaning hooks already named, and build the space *consistent with* them. The faction that owns the site becomes its dominant inhabitants; the city's central question often explains *why it hasn't been cleared.* Note in off-stage anything you added or bent.

## Step 2: Read references as needed

Five reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end and the read-aloud rules. **Load before intake on every location.**
- **`references/location-frameworks.md`** — the design engine: premise & ecology, the "why not cleared?" patterns, the five-room pacing skeleton, xandering techniques (loops, multiple entrances, verticality), the dynamic element, and hazard/treasure/secret design. **Load for every location.**
- **`references/location-canon-quickref.md`** — PF2e anchors: creature families by location type/environment, hazards and haunts, traps, planar leakage sources, and NPC stat-block anchors. **Load when wiring in PF2e canon.**
- **`references/output-template.md`** — the dossier skeleton (Compact five-room / Full keyed xandered map) with section guidance. **Load when ready to write.**
- **`references/tone-spectrum.md`** — the 1–5 scale applied to a location. **Load if generating tone ≠ 3, or unsure how much shadow to add.**

## Step 3: Generate the dossier — premise & ecology first

Order matters. The premise is the spine; the space and pacing render it; everything is filtered by "would this actually be here, and why is it still here?"

**Weave read-aloud at key beats** — the **approach / first sight** of the location, and the **entrance to each major area** the PCs reach. Dungeon "boxed text" shines here. Mark each as a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**); keep each ~40–70 words, sensory, and **never narrate what the PCs feel or do**. Rules in `references/co-creation.md` Part B.

### 3a. Premise & ecology (do this first — it's the spine)
- **What it was** — its original function (a temple, a mine, a fort, a tomb).
- **What happened** — the event that changed it (a massacre, a flood, a summoning, abandonment).
- **What it is now** — its current state and who/what occupies it.
- **The ecology** — how the inhabitants survive and relate (what they eat, who patrols, who feuds) — the place runs *without* the PCs.
- **Why it hasn't been cleared** — the mandatory question. A curse, a guardian, a taboo, a thing that returns, a price, a hidden entrance, a powerful owner. This reason anchors the whole location.

### 3b. The fantastic feature (1 line)
The one striking image that defines the place (Sly Flourish's rule): a flooded cathedral where the choir-stalls float; a mineshaft that descends into a petrified leviathan's gut; a library where the books whisper. Distinct from the premise, but they should resonate.

### 3c. The space (layout)
Render per density (see `output-template.md`):
- **Compact → five-room beats.** Five functional beats (entrance/guardian → puzzle/roleplay → trick/setback → climax → reward/revelation), each one area, lean and ready to run.
- **Full → xandered keyed map.** 8+ numbered areas with **non-linear** connections — loops, at least two entrances, vertical links — so navigation is a series of choices, not a corridor. Note connections explicitly. Include a simple text/ASCII layout or an area-connection list so the GM can sketch it.
Either way: every area should have a *reason to exist* in the ecology, not just a monster.

### 3d. Inhabitants & threats (the ecology's teeth)
- **The dominant inhabitant(s)** — the faction/creatures that hold the place now (handoff from `rpg-faction-creator` if owned). Link [AoN Creatures](https://2e.aonprd.com/Creatures.aspx) / [AoN Monster Families](https://2e.aonprd.com/MonsterFamilies.aspx) category pages.
- **Secondary / rival presence** — something that *also* lives here and conflicts with the dominant group (the wedge the PCs can exploit). Ecology, not a random encounter list.
- **Hazards & haunts** — environmental and magical dangers that make the place dangerous *without* combat. Link [AoN Hazards](https://2e.aonprd.com/Hazards.aspx). At tone 3+, at least one haunt or "wrong" area.
- Scale threats to the party level if known; otherwise note suggested level and point at reusable stat blocks.

### 3e. Treasure, secrets & the choice
- **Treasure** — what's worth coming for, and where (tie to the premise — a tomb holds grave-goods, a guild vault holds ledgers and coin). Avoid loot-piñata; make it *mean* something.
- **The secret** — what the place hides that rewards investigation (a false wall, a buried truth, a survivor, the real reason it fell).
- **The choice / dilemma** — at tone 3+, a decision the place forces (free the bound thing or leave it; take the cursed relic or leave the treasure; the only way deeper desecrates a grave).

### 3f. The dynamic element (the place isn't static)
What changes if the PCs linger or the situation shifts: a ritual nearing completion, the tide rising to flood lower levels, reinforcements arriving, the structure collapsing, the dominant inhabitants reacting to intrusion. Lighter than a faction's clock — one or two beats — but it keeps the location *alive*. (Optional explicit timer in Full.)

### 3g. Hooks & why now (3–5)
Each hook: why the PCs come *now*, anchored to the premise / treasure / inhabitants / a handed-off faction, with **stakes**. Mix: a job, a rescue, a rumor, a pursuit, an obligation. At tone 3+, **at least 1 hook carries a moral cost** (clearing the place harms someone, or the thing inside is sympathetic).

### 3h. Off-stage notes (handoffs)
End with a structured list grouping un-expanded elements by downstream skill:
- → `rpg-npc-creator`: a named inhabitant worth a full character (the lich, the trapped survivor, the guardian)
- → `rpg-faction-creator`: if the location reveals a wider organization
- → `rpg-city-creator` / `rpg-region-creator`: if it implies a settlement or ties back to one
- → Region / city / faction context honored: facts inherited from a handoff
- → Tone / canon notes: deviations; the planar source if hidden

## Step 4: Present and offer to deepen

Save the dossier as Markdown in the working folder, filename `location-<slug>.md`. Tell the user the path. For Full dossiers, summarize and link — don't paste the whole thing. Offer the two most interesting next moves: "Want me to build [the bound lich] as a full NPC, or detail [the cult that owns this] as a faction?"

## Compact vs Completo (Full)

Both cover every section in the same order; they differ in depth and — per the hybrid decision — in **how the space is rendered**:

- **Compact (1–2 pages):** the space is a **five-room beat sequence** (lean, pacing-first, no keyed map). Premise & ecology (incl. why-not-cleared) · fantastic feature · 5 beats · dominant + secondary inhabitants + 1–2 hazards · treasure + secret · a one-beat dynamic element · 3 hooks · short off-stage.
- **Completo / Full (3–4 pages):** the space is a **xandered keyed map** — 8+ non-linear areas with loops, multiple entrances, verticality, and an area-connection list — plus fuller ecology, more hazards/secrets, the choice/dilemma spelled out, an explicit dynamic timer, and 5 hooks. The keyed map is presented as the GM's tool (PF2e play doesn't require a grid).

See `references/output-template.md` for the exact skeleton.

## Coherence — the thing that matters most

A location coheres when **every area and inhabitant serves the premise and the ecology.** Pass each element through one test: *would this be here, and why is it still here?* Two failure modes to avoid:

1. **The video-game level.** A corridor of rooms, a monster in each, treasure for no reason, no answer to "why hasn't this been looted?" Fix: lead with premise + ecology + the why-not-cleared reason; make each area earn its place.
2. **The linear corridor.** One path, one direction, no choices. Fix: xander it — loops, a second entrance, a vertical shortcut — so the PCs make navigational decisions.

## What to avoid

- **No reason to exist.** Every location answers "what was it, what is it, why is it still unclaimed?" If you can't, the place is set dressing.
- **The monster zoo.** Unrelated creatures in adjacent rooms. Build an ecology — predator/prey, faction/rival, who eats whom.
- **Linear railroad maps.** Give loops, choices, and at least two ways in.
- **Loot piñatas.** Treasure should tie to the premise and sometimes cost something to take.
- **Full stat blocks.** Point at reusable PF2e creature/hazard blocks and scale to party level; hand named inhabitants to `rpg-npc-creator`.
- **Inflating tone past 3 without permission.** Dark-leaning, not grimdark.
- **Inventing PF2e content / made-up AoN IDs.** Pick existing creatures/hazards and reskin; link the **category page** (`/Creatures.aspx`, `/Hazards.aspx`), never a `?ID=` URL.

## File output

Save the dossier as Markdown in the user's working folder, filename `location-<slug>.md`. Tell the user the path. For Full dossiers, summarize and link rather than pasting the whole thing.
