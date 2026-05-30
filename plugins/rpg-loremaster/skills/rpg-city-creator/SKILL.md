---
name: rpg-city-creator
description: Creates ready-to-play RPG cities, towns, and settlements for Pathfinder 2e — the worldbuilding unit between a region and a single location. Produces a city dossier built around a central dramatic question, a web of orthogonal factions, a named cast of NPCs you can talk to today, the situation that greets the PCs on arrival, a light district spine, urban threats, and 5–7 adventure hooks. Use whenever the user asks to create, design, generate, flesh out, or detail a city, town, village, settlement, capital, port, free city, citadel, or trade hub for tabletop RPG use — especially Pathfinder 2e. Also trigger on "preciso de uma cidade", "criar uma cidade", "design a city", "detail this town", "build a settlement", or when the user pastes a "Ready for rpg-city-creator" handoff from a region dossier. Default tone is "dark-leaning" (level 3 of 5) — heroic fantasy core with consistent shadowy inflections; NOT grimdark, NOT noblebright.
---

# RPG City Creator (Pathfinder 2e, dark-leaning by default)

## What this skill is for

Generate a **city dossier** — the worldbuilding unit between the *region* (a hex-map of settlements and wilds) and the *single location* (one dungeon, building, or block). A city is the playable canvas for an arc, a downtime hub, or a whole urban campaign: think a settlement with a defining feature, a handful of factions pulling against each other, a named cast you can roleplay immediately, and live trouble the moment the PCs walk in.

This skill targets **Pathfinder 2e (post-Remaster)** as the mechanical and lore toolkit. It references the [Archives of Nethys](https://2e.aonprd.com/) (AoN) for deities, ancestries, NPC stat blocks, creatures, and hazards — but the cities themselves are **original** (not Golarion canon).

The default tone is **"dark-leaning" (level 3 of 5)**: heroic fantasy with shadowy inflections. Heroes can exist, but the city charges a price; victories are possible but cost something; luminous quarters coexist with rotted ones. This is **not** grimdark and **not** noblebright. See `references/tone-spectrum.md` for the full scale.

## The core idea — a city is people, not buildings

This is the single most important thing about this skill, and it's where most city generators fail. **A city is not an inventory of districts, shops, and services. It is a social pressure-cooker.** The great GMs are unanimous on this:

- **Sly Flourish (Mike Shea):** a settlement needs one *fantastic feature*, a *situation the PCs walk into*, and locations *built around the specific characters* — not the whole town offered as a menu. "You enter the city. What do you do?" is a game-killer.
- **Matt Colville:** cities are defined by their *factions*. He built the city of Capital entirely around its faction web, not its geography.
- **The Alexandrian:** run a city as a *network of nodes* — who knows whom, who works for whom, who wants what, where — connected by leads, not as a list of addresses.

So this skill is built **situation-first and faction-first**. The spine of every city is **one central dramatic question** (the tension the whole city is organized around) plus the **faction web** positioned around it. Districts are a light spatial skeleton, generated late and kept thin. Economy appears only as *what is scarce or contested* — because scarcity drives conflict and a trade ledger does not.

If you catch yourself writing a gazetteer — population statistics, a list of every shop, the price of bread — stop. That is not what a GM runs at the table. Generate the things a GM points at: a question, factions, faces, and trouble.

## When to use this skill

Trigger when the user wants to design, generate, detail, or rough out a settlement of any size for play — "create a city", "preciso de uma cidade", "detail this port town", "build a free city", "make the capital", "flesh out [settlement name] from my region", or a description of an urban place they want to run. **Especially** trigger when the user pastes a "Ready for `rpg-city-creator`" line from a region dossier (see "Receiving a handoff" below).

Do **not** trigger for: whole regions or hex-maps (use `rpg-region-creator`), a single building/dungeon/lair inside a city (use a location-creator), a single NPC in isolation (use `rpg-npc-creator`), or world/cosmology setup (use a world-foundation skill). If the user wants something bigger or smaller than a settlement, point them to the right tool.

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — draw the user's vision out, sharpen it, fill gaps; see `references/co-creation.md`. Capture seed + scale + tone + density and any region handoff along the way.
2. **Find the central question** — the one tension the city is organized around; everything hangs off it. Lead the elicitation here.
3. **Build the faction web** — 2–4 orthogonal factions positioned around the question
4. **Cast the faces** — 4–6 named NPCs the PCs can talk to immediately
5. **Stage the arrival, shape the city, name the trouble** — the situation that greets the PCs, a light district spine, urban threats
6. **Write the hooks** — 5–7, anchored to the question/factions/cast, with moral cost at level 3+
7. **Present and hand off** — save the file, offer the next move, leave off-stage notes for downstream skills

Read the references you need by context (Section 2). Don't load all of them.

## Step 1: Capture intent

### Match the user's language

**Before anything else:** detect the language of the user's request and generate the entire dossier in that language — Portuguese in, Portuguese out, including **section headings** (Identidade & A Pergunta, A Teia de Facções, O Elenco, etc.). The template in `references/output-template.md` uses English skeleton labels; translate them.

**What stays in English regardless:** proper names from PF2e canon — deities (Abadar, Norgorber, Asmodeus), ancestries (Dwarf, Tiefling/Nephilim), creature and NPC stat-block names (Doppelganger, Wererat, Cutpurse), trait names (`undead`, `humanoid`), plane names (Hell, Boneyard) — and the AoN URLs. These are anchors to the AoN, which is English-only. So in Portuguese you'd write "O templo de **Abadar** domina a praça do mercado" — Abadar in English, the rest in Portuguese.

### Co-create the brief — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Its central job is to draw the user's own ideas out, sharpen them, and fill gaps — generating the whole thing unprompted is the fallback, not the default. Interviewing across several rounds is good and expected, *as long as it's elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end before generating.** In short:

- **Read the room and set the mode.** Rich seed + "build it" → reflect, fill gaps, generate. Sparse seed or "help me think" → draw the vision out first. "Just generate it / surprise me" → autonomous defaults, named aloud. Always state the escape hatch early: *"Say 'just run with it' anytime and I'll fill the rest."*
- **Run the loop per load-bearing decision:** Open (pull their image first) → Spark with 2–4 evocative options when they're stuck (use AskUserQuestion) → Reflect it back sharper → Probe gaps and tensions → generate that section and check in.
- **Lead the elicitation with the central dramatic question** — it's the city's spine, so spend the most collaboration there — then the feel/feature, the faction stances, and the cast the user already has in mind.
- **Default the boring stuff** (exact population, filler names, ambient creature picks). Ask about what's load-bearing for *their* vision. The failure mode is blank questions in a row: if you've asked twice without giving something back, you've slipped into interrogation — give before you ask again.

You still need these four things before generating, but **gather them through the loop**, not as a form: **seed concept**, **scale** (thorp/village/town/**city** default/metropolis — sets faction, district, and cast counts; see `references/urban-coherence-rules.md`), **tone** (default **3**; honor explicit overrides, never silently pick another level), and **density** (**Compact** 1–2 pp / **Completo / Full** 3–5 pp). Surface optional constraints only if relevant or volunteered: required/forbidden ancestries or deities, the parent region's established facts, hard exclusions, a creature to feature, whether the PCs are fresh arrivals or already based here.

### Receiving a handoff from rpg-region-creator

If the user pastes a region's off-stage note (e.g., "→ Ready for `rpg-city-creator`: **Karsthaven** — the smuggling port from the Tidewardens' profile"), treat it as **canon you must honor**. Pull every constraint the region already fixed — biome, dominant ancestries, regional deities, the faction that was mentioned, the political situation — and make the city *consistent with and downstream of* those facts. The city's central question often grows directly from the regional crisis. Note in the off-stage section anything you deliberately added or bent.

## Step 2: Read references as needed

Five reference files. Load by context, not all at once:

- **`references/co-creation.md`** — the interview/elicitation front-end and the read-aloud rules. **Load before intake on every city** — it governs how you gather the brief and how you weave table-ready narration.
- **`references/city-canon-quickref.md`** — PF2e elements curated *for urban play*: deities by what they DO in a city, ancestry mixing in settlements, the "enemy within" urban bestiary, NPC stat-block anchors, and NPC archetype roles for casting. **Load for every city.**
- **`references/output-template.md`** — The dossier skeleton (Compact and Full) with section-by-section guidance and length targets. **Load when you're ready to write.**
- **`references/urban-coherence-rules.md`** — Settlement scale table, district archetypes, faction orthogonality for cities, the central-question test, and sanity checks. **Load when sizing the city or if elements feel like they don't cohere.**
- **`references/tone-spectrum.md`** — The 1–5 scale and how to apply each level. **Load if generating tone ≠ 3, or if unsure how much shadow to add.**

## Step 3: Generate the dossier — question and factions first

The order matters. Region-building starts from geography because everything cascades from the land. City-building starts from the **central question** because in a dense settlement, the *social tension* is the bedrock — it's what every faction, face, and hook hangs off. Follow this order:

**Weave read-aloud as you go.** At four beats — the arrival, each district, each named NPC (one quoted line in their voice), and the opening of key locations/hooks — include a short block of narration the GM can read or paraphrase to players, marked as a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**). Keep each ~40–70 words, purely sensory, and **never narrate what the PCs feel, do, or will do** — that's the players' agency. Full rules and examples in `references/co-creation.md` Part B. This narration is the part of the dossier that helps *at the table*, not just in prep.

### 3a. The central question (do this first — it's the spine)
Before anything else, decide **the one dramatic question the city is organized around**. It must be a live tension with no obvious answer, that different factions answer differently. Examples:
- "Who controls the only clean well in a city of forty thousand?"
- "The old duke is dying without an heir — who takes the throne, and what do they owe to get it?"
- "The plague is in the slums. Do we wall them in or open the gates?"

Everything downstream positions itself relative to this question. If you can't state the question in one sentence, the city has no spine yet — keep working.

### 3b. Identity & the fantastic feature (1 short paragraph)
- **Name** (evocative — "Saltmire" or "the Ribcage" beats "Eastport")
- **One-line essence** (what a traveler says about it in three seconds)
- **Fantastic feature** (Shea's rule — the one striking image that defines the skyline: a cathedral grown from a petrified tree, a district that floods every dusk, a giant chained statue that the city was built around). Distinct from the question, but they should resonate.

### 3c. The faction web (2–4 factions — this is the meat)
This is the largest and most important section. Each faction is a **stance on the central question** plus the means to push it. Give for each:
- **Name** + 3-word identity ("The Wharf Syndicate — smuggler oligarchy")
- **Want** (concrete goal tied to the central question)
- **Have** (concrete leverage — coin, muscle, a relic, a secret, control of a chokepoint)
- **Hate** (who they oppose AND why — this is what generates play)
- *(Full only)* a **lever** — the specific thing PCs could do to help or wreck them

Factions must be **orthogonal**, not good-vs-evil. Every pair should clash for a *different* reason. See `urban-coherence-rules.md` on orthogonality and the pairwise-conflict test. At tone 3, exactly **one** faction has an internal rot (a corrupt lieutenant, a hidden patron) — the others stay clean so the rot lands by contrast.

### 3d. The cast (4–6 named NPCs)
The faces the PCs can talk to *today*. This is what makes a city feel alive rather than abstract — and it's the city-creator's signature move. For each NPC give a compact sketch (one tight paragraph): **name, role, faction tie, what they want, one vivid trait, and a voice hook** (a verbal tic, a belief, a contradiction). Do **not** write full backstories or stat blocks here — that's `rpg-npc-creator`'s job; flag the juiciest ones for handoff. Anchor each to the central question or a faction so nobody is decoration. Pull archetype roles from `city-canon-quickref.md` (the power broker, the fixer, the desperate petitioner, the zealot, the rival, the informant) and subvert at least one.

Give each cast member **one quoted line in their voice** as a small read-aloud block — it doubles as the voice hook and lets the GM hear them instantly (e.g., > *"You're not wrong. Ha. You're just early."*).

For PF2e stats, point the GM at reusable NPC stat blocks rather than inventing numbers — see the NPC anchors in `city-canon-quickref.md`.

### 3e. Powers that be (governance + the active crisis)
- Who governs **de jure** (the official authority — council, lord, guild charter)
- Who governs **de facto** (often different — the gap is cheap dark-leaning texture)
- The **active crisis**: usually the central question *intensifying right now*. Something the PCs can step into on session one. Not "tension might rise someday" — "the vote is in three days and both sides are buying knives."

### 3f. Faith in the city (urban religion — lighter than a region's)
Cities concentrate and politicize faith. Keep this tighter than the region skill's religion section — focus on what the faiths **do** in the city, not cosmology:
- 1 **civic faith** (the temple with political weight — link [AoN Deities](https://2e.aonprd.com/Deities.aspx))
- 1 **street faith** (the everyday folk devotion — shrines, festivals, the working poor)
- 1 **shadow presence** (a cult, a banned rite, a "we don't go to that chapel" — at tone 3+, always present)
Pick from `city-canon-quickref.md`, which lists deities by their *urban* function (Abadar runs the banks, Norgorber runs the underworld, Asmodeus runs the contracts).

### 3g. The shape of the city (light district spine — keep it thin)
A spatial skeleton so the GM can place things — **not** a gazetteer. For the chosen scale, give **3–5 districts** (fewer for towns, more for metropolises), one line each, and for each note **which faction or piece of the central question lives there**, plus a short **Read-aloud** block evoking the quarter as the PCs enter it. Pull district archetypes from `urban-coherence-rules.md`. Then one or two lines on **what's scarce or contested** here (the only economy detail that matters — it feeds conflict). Resist writing more. Districts are where you *place* the drama, not where the drama *is*.

### 3h. Trouble & threats (urban dangers)
What can go wrong here — Shea's "situations" plus a roster of urban menace. Three light layers:
- **The situation on arrival (1):** something the PCs walk straight into as they enter (a riot starting, a body in the canal, a press-gang, a public execution). This is what replaces "what do you do?" with a scene. **Write it as a Read-aloud block** — the user singled this beat out as the most useful at the table, so make it land: short, sensory, ending open.
- **Urban threats (2–4):** the city's predators — pull from the "enemy within" list in `city-canon-quickref.md` (doppelgangers, wererats, a vampire patron, an infiltrating devil, a thieves' ring, a haunt in the old quarter). Link each to an [AoN Creatures](https://2e.aonprd.com/Creatures.aspx) category page.
- **Ambient menace / hazards (1–3):** the texture — what the night sounds like, a cursed bridge, a fog that comes off the river wrong. At tone 3+, at least one threat carries a horror trait (`undead`, `fiend`, `aberration`) but doesn't lead.

### 3i. Adventure hooks (5–7) — and build around the PCs
The test of the whole dossier. Each hook: a **concrete trigger** (something a PC could choose to act on today), a **connection** to the central question/a faction/a cast member/a threat, and **stakes**. Mix types: a job, a mystery, a political opening, a debt, a disappearance, a moral trap.

At tone 3+, **at least 2 hooks carry a moral cost** — you can't help A without hurting B, and the obvious move is the wrong one. Mark these (e.g., italics on the dilemma line).

Apply **Shea's "build around the characters"** rule: if you know anything about the PCs (class, background, the party's goals from the region handoff), bend at least one hook and one location toward *them* — the rogue hears about the Syndicate's vault, the cleric is summoned by the civic temple. If you don't know the party, add a short "tailor these to your PCs" note pointing at which hooks to personalize.

### 3j. Off-stage notes (handoffs — what makes this part of a kit)
End with a structured list grouping unexpanded elements by **which downstream skill handles them**. Be specific — name things. Example:

```
**Ready for follow-up — keep consistency when expanding:**

→ Ready for `rpg-npc-creator`:
- Magistra Veil — the de facto ruler from Powers, needs a full backstory
- "Little Knife" — the Syndicate fixer from the Cast

→ Ready for `rpg-faction-creator`:
- The Wharf Syndicate — smuggler oligarchy, the internal rot is unexplored
- The Ashen Chapel — the shadow cult from Faith

→ Ready for a location-creator:
- The Drowned Vault — the Syndicate's flooded treasury under the docks
- The Ribcage Cathedral — the fantastic feature, interior undetailed

→ Region context honored:
- Karsthaven sits in the Tidewardens' region; smuggling tie kept consistent

→ Tone / canon notes:
- One faction dialed to level 4 per user request; rest at base level 3
```

## Step 4: Present and offer to deepen

After generating:
- Save the dossier as Markdown in the working folder. Filename: `city-<slug>.md` (e.g., `city-saltmire.md`).
- Tell the user the path. Don't paste a Full dossier back into chat — summarize and link.
- Offer the **two most interesting next moves** from what you generated: "Want me to flesh out [Magistra Veil] as a full NPC, or build [the Drowned Vault] as a location?" Don't list everything.

## Compact vs Completo (Full)

Both cover every section in the same order; they differ in depth. The **faction web** and **cast** stay rich in both modes — they're the point of the skill. **Districts and economy stay thin in both modes** — that's the design, not a Compact compromise.

**Compact (1–2 pages):** central question (1 line) · identity + feature (1 paragraph) · 2–3 factions (Want/Have/Hate, 2 lines each) · 4 cast sketches (2 lines each) · powers (3 lines) · faith (name + 1 line each) · 3 districts (1 line each) · arrival situation + 2–3 threats · 5 hooks · short off-stage list.

**Completo / Full (3–5 pages):** central question with stakes spelled out · identity + feature + a sensory "first impression" mini-section · 3–4 factions with Want/Have/Hate + lever + the one with internal rot detailed · 5–6 cast sketches (full paragraph each, with voice hook) · powers as a paragraph + the crisis described · faith with each thread's local rite and political weight · 4–5 districts (1–2 lines each) + what's contested · arrival situation + 3–4 threats framed in the city's ecology · 7 hooks fully fleshed (trigger, stakes, complication, directions) · off-stage list.

See `references/output-template.md` for the exact skeleton and length targets.

## Coherence — the thing that matters most

A region coheres around **geography**. A city coheres around its **central question and faction web**. Pass every element through one test: *does this connect to the question or to a faction?* If a district, a temple, an NPC, or a threat connects to nothing, it's decoration — cut it or wire it in.

Two specific failure modes to avoid:

1. **The gazetteer trap.** If the dossier reads like a tourist guide — every shop, every street, prices, populations — you've built reference material, not a playable city. The fix: lead with people and tension; keep districts and economy thin.
2. **The region-rerun trap.** If the city is just a smaller region (geography, ancestries-by-biome, a full cosmological religion section), it's redundant filler. The city's distinct value is the **zoom into the social network** — named faces, faction friction, the one question. Make that the bulk.

`references/urban-coherence-rules.md` has the scale table, district archetypes, the orthogonality test, and a finalizing checklist. Consult it when in doubt.

## What to avoid

- **The menu city.** "You can visit the inn, the smith, the temple, the docks..." Replace the menu with a *situation* and PC-tailored leads.
- **Single-trait factions or NPCs.** "The merchants are greedy." Add a contradiction — the merchant prince who funds the orphanage to launder guilt.
- **Good-vs-evil factions.** If two factions are just heroes and villains, merge them and build a third orthogonal one.
- **Districts as content.** Districts are where drama is *placed*, not what it *is*. Keep them to a line each.
- **Economy as a ledger.** Only "what's scarce / what's contested" earns a place — it drives conflict.
- **Full stat blocks for NPCs.** Sketch personality and point at a reusable PF2e NPC stat block; hand deep work to `rpg-npc-creator`.
- **Inflating tone past 3 without permission.** Default is dark-leaning, not grimdark. A paladin of Iomedae should still be able to live here.
- **Inventing PF2e content.** Don't make up deities, traits, or creatures — pick existing ones and reskin. If nothing fits, tell the user and point at the relevant AoN page.
- **Made-up AoN IDs.** Never link `...aspx?ID=42`. Always link the **category page** (`/Deities.aspx`, `/Creatures.aspx`) and let the user search.

## File output

Save the dossier as Markdown in the user's working folder, filename `city-<slug>.md`. Tell the user the path. For Full dossiers, summarize in chat and link the file rather than pasting the whole thing.
