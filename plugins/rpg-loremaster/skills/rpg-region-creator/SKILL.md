---
name: rpg-region-creator
description: Creates coherent, ready-to-play RPG campaign regions — and, scaled up, nations and kingdoms — for Pathfinder 2e. A region is the playable canvas between world and city; at nation scale it adds national identity and relations with neighboring powers via an optional "Beyond the Border" section. Produces dossiers with geography, peoples (PF2e ancestries), religion, politics, factions, fauna/threats (PF2e bestiary linked to AoN), points of interest, and 5–7 adventure hooks. Use whenever the user asks to create, design, generate, or flesh out a region, area, territory, frontier, march, nation, kingdom, realm, duchy, or campaign setting for tabletop RPG use — especially Pathfinder 2e. Also trigger on "preciso de uma região/nação", "criar uma região", "design a region", "build a kingdom", "create a nation", or a described geographical/political area for a TTRPG. Default tone "dark-leaning" (level 3 of 5) — heroic core with shadowy inflections; NOT grimdark, NOT noblebright.
---

# RPG Region Creator (Pathfinder 2e, dark-leaning by default)

## What this skill is for

Generate a **region dossier** — the intermediate worldbuilding unit between the world (continent/cosmology) and the city (single settlement). A region is the playable canvas for an arc or campaign: think a hex-map with 3–5 settlements, 5–10 points of interest, a defining geographic identity, and live political/religious tensions.

**This skill also scales up to a nation or kingdom.** A nation is just a region viewed at higher altitude *plus* its relations with neighbors — the same geography→peoples→religion→politics→factions chain, generated for a broader territory, with one extra layer: national identity and the balance of power with 2–3 neighboring states. At nation scale, generate the optional **"Beyond the Border"** section (Step 3j) and expect the dossier to hand off *several* regions and cities downstream. (There is deliberately no separate nation-creator skill: ~75% of a nation's content is already this skill's work, so folding the thin distinct layer in here avoids a near-duplicate. See the kit's `design-philosophy.md`.)

This skill targets **Pathfinder 2e (post-Remaster)** as the mechanical and lore toolkit. It references the [Archives of Nethys](https://2e.aonprd.com/) (AoN) for canonical creatures, deities, planes, ancestries, and hazards — but the regions themselves are **original** (not Golarion canon).

The default tone is **"dark-leaning" (level 3 of 5)**: heroic fantasy with shadowy inflections. Real heroes can exist, but the world charges a price; victories are possible but cost something; luminous places coexist with rotted ones. This is **not** pure grimdark and **not** pure noblebright. See `references/tone-spectrum.md` for the full scale and how to apply each level.

## When to use this skill

Trigger when the user wants to design, generate, flesh out, or rough out a campaign region **or a nation/kingdom** — phrasings include "create a region", "preciso de uma região", "design an area", "build a frontier", "I need a campaign zone", "criar uma nação", "design a kingdom", "build a realm/duchy", "let's make the [biome/concept] region", or descriptions of a geographic/political area for tabletop play. Also trigger when the user describes a campaign concept that obviously needs a region or a nation (e.g., "my players are heading north into uncharted lands", "I need the kingdom they start in").

Do **not** trigger for: single cities (use `rpg-city-creator`), single NPCs (use `rpg-npc-creator`), single dungeons or specific locations (use `rpg-location-creator`), a single organization (use `rpg-faction-creator`), or worldwide/cosmological setup (use a world-foundation skill). If the user wants something smaller than a region, point them to the right tool. **Bigger than a region — a nation or kingdom — stays here:** generate at nation scale with the "Beyond the Border" section rather than forcing a separate skill. Only a whole *world/continent with cosmology* is out of scope (world-foundation).

## The workflow at a glance

Region creation is a structured creative act with a fixed order — geography first because everything else cascades from it, hooks last because they are the test of whether anything you generated matters at the table. The flow is:

1. **Co-create the brief** (interview, not a form) — draw the user's vision out, sharpen it, fill gaps; see `references/co-creation.md`. Capture seed + biome + tone + density along the way.
2. **Read the references you'll need** (don't load all of them — pick by context)
3. **Generate the dossier** in causal order (geography → people → religion → politics → factions → fauna → places → hooks)
4. **Present and offer to deepen** — the user may want to expand one section after seeing the whole

## Step 1: Capture intent

### Match the user's language

**Before anything else:** detect the language of the user's request and generate the entire dossier in that same language. If they wrote in Portuguese, the dossier is in Portuguese. If they wrote in English, English. If they switch mid-conversation, follow the most recent message.

**This includes section headings** — translate them. The template in `references/output-template.md` has headings in English (Identity & Atmosphere, Geography, People, Religion, Politics, Factions, Fauna & Threats, Points of Interest, Adventure Hooks, Off-Stage Notes), but those are skeleton labels. Translate them. Portuguese example: Identidade & Atmosfera, Geografia, Povos, Religião, Política, Facções, Fauna & Ameaças, Pontos de Interesse, Ganchos de Aventura, Notas de Bastidores. Same for sub-labels inside sections (Want/Have/Hate → Quer/Tem/Odeia, Iconic image → Imagem icônica, etc.).

**What stays in English regardless:**
- Proper names from PF2e canon — deity names (Pharasma, Asmodeus, Iomedae), ancestry names (Dwarf, Leshy, Nephilim), bestiary creature names (Sahuagin, Wendigo), trait names (`undead`, `unholy`), and plane names (Boneyard, Abyss). These are anchors to the AoN; translating them would break the reference.
- The AoN URLs themselves.

So in Portuguese output you'd write "A deusa dominante é **Pharasma**, senhora da morte" — Pharasma in English (anchor), the rest in Portuguese. This pattern is mandatory because the user needs to find these names in the AoN, and AoN is English-only.

### Co-create the brief — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Its central job is to draw the user's own ideas out, sharpen them, and fill gaps — generating the whole region unprompted is the fallback, not the default. Interviewing across several rounds is good and expected, *as long as it's elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end before generating.** In short:

- **Read the room and set the mode.** Rich seed + "build it" → reflect, fill gaps, generate. Sparse seed or "help me think" → draw the vision out first. "Just generate it / surprise me" → autonomous defaults, named aloud. State the escape hatch early: *"Say 'just run with it' anytime and I'll fill the rest."*
- **Run the loop per load-bearing decision:** Open (pull their image first — "what's the one image you see when you picture this place?") → Spark with 2–4 evocative options when they're stuck (use AskUserQuestion) → Reflect it back sharper → Probe gaps and tensions → generate that section and check in.
- **Lead the elicitation with the region's identity and geography** — geography is the bedrock everything cascades from, so anchor the vision there first — then the peoples and their frictions, the active crisis, and any deity/creature the user already wants.
- **Default the boring stuff** (exact landmark names, the precise ambient creature). Ask about what's load-bearing for *their* vision. The failure mode is blank questions in a row: if you've asked twice without giving something back (a reflection, an option, a generated beat), you've slipped into interrogation — give before you ask again.

You still need these before generating, but **gather them through the loop**, not as a form: **seed concept**, **scale** (a **region** by default, or a **nation/kingdom** — detect it from the seed; "the duchy of X and its rival the kingdom of Y" is nation scale; confirm rather than ask if the seed implies it), **biome / climate** (confirm if the seed implies it), **tone** (default **3**; honor explicit overrides, never silently pick another level; see `references/tone-spectrum.md`), and **density** (**Compact** 1–2 pp / **Completo / Full** 4–6 pp). Surface optional constraints only if relevant or volunteered: required/forbidden ancestries or deities, connection to other regions in the user's world, hard exclusions ("no drow", "no demons"), a PF2e creature to feature.

**At nation/kingdom scale**, the dossier covers a broader territory (the biome becomes "dominant biomes", points of interest become "regions & key cities" rather than settlements), and you add the **"Beyond the Border"** section (Step 3j). Everything else is the same causal chain at higher altitude — don't re-architect, just zoom out. Lead the elicitation here on the **national identity** and **the neighbors**, since those are the parts a plain region wouldn't have.

## Step 2: Read references as needed

You have five reference files. Don't load all of them by default — load by context. Each one tells you when it's useful:

- **`references/co-creation.md`** — the interview/elicitation front-end and the read-aloud rules. **Load before intake on every region** — it governs how you gather the brief and how you weave table-ready narration.
- **`references/pf2e-canon-quickref.md`** — Curated lists of PF2e deities (by tone/role), ancestries (by biome fit), bestiary families (by environment/role), and planar elements. **Load this for every region** — it's the source of canonical elements.
- **`references/tone-spectrum.md`** — The 1–5 dark-leaning scale with concrete examples of what each level looks like in output. **Load if you're generating tone level ≠ 3, or if you're unsure how to dial intensity.**
- **`references/output-template.md`** — The structure of the dossier (compact and full versions) with section-by-section guidance. **Load when you're ready to write the output.**
- **`references/coherence-rules.md`** — How to keep elements causally consistent (biome → ancestries → religion → fauna). **Load if the seed has unusual combinations or if you catch yourself generating things that don't fit together.**

## Step 3: Generate the dossier in causal order

**Weave read-aloud at two beats.** Turn the **iconic image** into a short establishing-shot block the GM can read when the PCs first reach the region, and add a block to **2–3 standout points of interest** (the wrong shrine, the ruined tower). Mark each as a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**); keep each ~40–70 words, sensory, and **never narrate what the PCs feel or do**. Regions are overview-scale, so don't block every settlement — set the mood and the standouts; the city-creator handles scene-level narration on zoom-in. Full rules in `references/co-creation.md` Part B.

Worldbuilding fails when elements are sprinkled in random order — you end up with elves in a volcanic desert worshipping a sea god and nothing makes sense. Geography is the bedrock; everything else has to grow from it. Follow this order:

### 3a. Identity (1 short paragraph)
- **Name** (evocative, not generic — "the Hollow Coast" beats "the Eastern Lands")
- **One-line essence** (what someone says about this place in three seconds)
- **Iconic visual** (the first image that flashes when someone hears the name — the dark-leaning hook lives here)

### 3b. Geography
- Dominant biome + climate (with one specific weather pattern that affects daily life)
- Natural barriers (these define political borders — name them)
- Characteristic resource (what's exported / what's scarce — this drives economy and conflict)
- One geographic landmark with a name (a mountain, a river, a forest — something maps would label)

### 3c. People (ancestries)
- 1–2 dominant ancestries (link to AoN ancestry category; pick from `pf2e-canon-quickref.md` and justify against the biome)
- 1–2 minority ancestries (with a *tension* — what's the friction between them and the majority?)
- One specific heritage detail or cultural twist that distinguishes these people from the generic version of their ancestry

### 3d. Religion
Pick from the curated lists in `pf2e-canon-quickref.md`. Mix tones (see Section 3.1 of `tone-spectrum.md` for the 5:3:2 ratio at level 3):
- 1 **dominant deity** (the public faith — link to [AoN Deities](https://2e.aonprd.com/Deities.aspx))
- 1 **popular secondary** deity (everyday folk-faith, complements the dominant)
- 1 **shadow / heretical** presence (a cult, a banned faith, a "we don't speak of it" — this is where dark-leaning earns its keep)

### 3e. Politics
- Who governs **de jure** (the official authority)
- Who governs **de facto** (often different — a regent, a guild, a faction pulling strings)
- One **active crisis** (the situation that's about to change — wars don't start when PCs arrive, they're already brewing)

### 3f. Factions (2–4)
For each faction, give in 2–3 lines:
- **Name** + 3-word identity (e.g., "The Iron Wardens — corrupt city watch")
- **Want** (concrete goal, not abstract)
- **Have** (concrete resource — money, soldiers, knowledge, a relic, a secret)
- **Hate** (who they oppose AND why — this generates play)

Factions should be **orthogonal**, not binary. Don't write good-vs-evil. Write "the merchants want trade routes safe, the druids want the woods untouched, the church wants pilgrims paying tithes, the bandits want the merchants paying off" — every pair clashes differently. See `coherence-rules.md` on faction ortogonality.

### 3g. Fauna and threats
Three layers (link each to a relevant [AoN Creatures](https://2e.aonprd.com/Creatures.aspx) or [AoN Monster Families](https://2e.aonprd.com/MonsterFamilies.aspx) category — never an ID, just the category page):

- **1 apex threat** (high-level creature defining the region's danger ceiling — "an ancient white dragon sleeps under the glacier")
- **3–5 regular threats** (mid-level encounters players will fight)
- **3–5 ambient creatures / hazards** (the texture — what flies overhead, what scurries at night, what hazards the land itself poses)

Use `pf2e-canon-quickref.md` for biome-appropriate creature families. Avoid the temptation to drop generic "bandits and wolves" — be specific.

### 3h. Points of interest
- **3–5 settlements** (name + one-line essence each — do not detail; that's the city skill's job)
- **5–10 minor locations** (ruins, shrines, marker-stones, lairs, hazards — name + one-line each)

### 3i. Adventure hooks (5–7)
This is the heart of the dossier — the test of whether the region matters at the table. Each hook is one or two sentences and must satisfy:
- **Concrete trigger** (something a PC could decide to investigate today)
- **Connects to at least one element above** (deity / faction / threat / location)
- **Has stakes** (something a PC can lose or gain)

Mix hook types: a missing person, a political opportunity, a treasure rumor, a religious mystery, a creature threat, a moral dilemma. At tone level 3, **at least 2 hooks should have a moral cost** (you can't help A without hurting B; the obvious answer is the wrong one).

### 3j. Beyond the Border (nation / kingdom scale ONLY — skip for a plain region)

Generate this section **only when working at nation/kingdom scale.** It is the thin layer that a region doesn't have and the reason there's no separate nation-creator skill. Three parts:

- **National identity** — what binds this people into a nation: **3 core values** (what they're proud of), **2–3 shames** (what they hide or deny), and **1 taboo** (the line nobody crosses). This is the *unified character* a plain region's "Povos" section doesn't provide — it's how a noble from this nation behaves abroad. Avoid single-trait nations ("the warriors"); the values and shames should pull against each other.
- **The neighbors & the balance of power** — **2–3 neighboring states**, each in 2–3 lines: its name, one-line identity, and its **relationship** to this nation (ally / rival / vassal / old enemy / uneasy trade partner) *and why*. Treat each neighbor like a faction at geopolitical scale — give it a Want and a point of friction. The drama is what happens when PCs cross a border. (Reuse faction logic; see `rpg-faction-creator` for depth on any one neighbor.)
- **Legitimacy & succession** — what makes the current ruler's claim legitimate, who contests it, and what happens when the crown changes hands. This is the de jure/de facto gap from Politics, raised to the level of the state — and a renewable engine of dark-leaning intrigue.

At nation scale, keep the rest of the dossier the same causal chain but at altitude: "Geography" covers dominant biomes and natural borders; "Points of Interest" lists **constituent regions and key cities** (each a downstream handoff to a *region* or *city* run) rather than individual settlements.

### 3k. Off-stage notes (consistency handoffs — important)

This section is what makes the skill **part of a larger workflow** instead of a one-shot generator. The user is building a campaign world across multiple skills (city-creator, faction-creator, npc-creator, location-creator), and these notes are the bridge.

End with a structured list grouping unexpanded elements by **which downstream skill would handle them**. Example:

```
**Ready for follow-up — keep consistency when expanding:**

→ Ready for `rpg-city-creator`:
- [Capital name] — the seat of the duke, mentioned in Politics
- [Port town name] — the smuggling hub from Faction X's profile

→ Ready for `rpg-faction-creator`:
- The Whispering Hand — heretical cult mentioned in Religion
- The Iron Wardens — corrupt watch faction needing leadership detail

→ Ready for `rpg-npc-creator`:
- Duchess [name] — the de facto ruler from Politics
- "Stoneface" — the alpha wolf from Fauna

→ Justified contradictions (don't accidentally undo these later):
- The Asmodean shrine exists because of [the exiled noble]
- The dwarves on the coast are here because [trade colony, 80 years old]

→ Tone deviations from base level [N]:
- Religion was dialed to level [X] per user request
```

Be **specific** — name the things, don't just say "the capital" generically. The user's next skill invocation will rely on this list to keep the world consistent.

## Step 4: Present and offer to deepen

After generating the dossier:
- Save it to a file in the working folder (Markdown, easy to copy into Obsidian / World Anvil / wherever)
- Tell the user where the file is
- Offer one or two specific next moves: "Want me to flesh out [the capital] as a city, or expand [the heretical cult] as a faction?"

Don't overwhelm with options — pick the two most interesting threads from what you generated and offer those.

## Compact vs Completo (Full) output

The user picks density in Step 1. Both modes cover all the sections — they differ in depth:

**Compact (1–2 pages):**
- Identity: 1 paragraph
- Geography: 4–5 bullets
- People: 2 short paragraphs
- Religion: name + 1 line per deity
- Politics: 3 lines
- Factions: 2–3 factions, 2 lines each
- Fauna: bullet lists with AoN links
- Points of interest: bullet lists, names + one-line each
- Hooks: 5 hooks, 1–2 sentences each
- Off-stage: short bullet list

**Completo / Full (4–6 pages):**
- Identity: 1 paragraph + an "atmosphere" mini-section (sensory texture — smells, sounds, light, season)
- Geography: full paragraphs, including weather patterns and seasonal variations
- People: each ancestry gets a paragraph covering values, contradictions, daily life
- Religion: each deity gets a paragraph including local rites and how the faith bends in this region (vs. canon)
- Politics: full power-structure paragraph + the crisis described
- Factions: 3–4 factions with full Want/Have/Hate plus a leader name and one secret each
- Fauna: each tier with a short paragraph framing how creatures fit the local ecology
- Points of interest: settlements get 2–3 lines each, minor locations get 1–2 lines each
- Hooks: 7 hooks, each fully fleshed (trigger, stakes, complication, possible directions)
- Off-stage: short bullet list

Both versions use the same headings, in the same order. See `references/output-template.md` for the exact markdown skeleton.

## Coherence — the thing that matters most

The single biggest failure mode for region generators is **incoherence** — dropping a desert town with elven druids, polar bears, and an Asmodean temple because the generator pulled from random lists. Avoid this by passing every element through one question: **"does this fit the bedrock?"**

The bedrock is geography. From geography you get:
- Climate → which ancestries plausibly settled here (humans always work; others need a reason)
- Climate + recursos → which deities are popular (Gozreh by the sea, Torag in mountains, Sarenrae in deserts)
- Climate + ancestries → which fauna belongs (no taiga moose in tropical swamps)
- All of the above → which factions can plausibly exist (a thieves' guild needs a city, a druidic circle needs a forest, a knightly order needs a noble structure)

If you find yourself wanting to add something that doesn't fit, either (a) change it to something that does, or (b) **justify the contradiction explicitly** ("the Asmodean temple is here because an exiled Chelaxian noble fled the empire 80 years ago and the local lord let her stay for the gold she brought"). Contradictions that are justified become *features* — interesting tensions. Contradictions that are silent become *bugs* — broken immersion.

`references/coherence-rules.md` has the full mapping tables (biome → likely ancestries, biome → likely deities, biome → likely fauna families). Consult it when in doubt.

## What to avoid

- **Single-trait cultures.** "The Drakkonians are warriors" is shallow. Real cultures have artists, cowards, dissidents, traders. Add at least one contradiction to any culture you sketch.
- **Bandits and wolves.** If your fauna section reads like generic D&D, use the AoN to find something specific (a sentient wolf pack devoted to Erastil; a band of disgraced dwarven exiles; a swarm of psychopomps marking the dying).
- **Good-vs-evil factions.** If two factions are simply "the good guys" and "the bad guys", merge them into one boring faction and build a third orthogonal one.
- **Hooks without stakes.** "There's a strange ruin to the east" is a *seed*, not a hook. Add a *why now* and a *what's lost if ignored*.
- **Inflating tone past 3 without permission.** Default is dark-leaning, not grimdark. Heroes should still be possible.
- **Inventing PF2e mechanics.** Don't make up new traits, deities, or creatures — pick existing ones and reskin if needed. If something fits and you can't find it, tell the user "I'd put a Bestiary-equivalent of [thing] here but couldn't find an exact match — pick one from [AoN URL]".
- **Made-up AoN IDs.** Never write a link like `https://2e.aonprd.com/Deities.aspx?ID=42`. Always link to the **category page** (`/Deities.aspx`, `/Creatures.aspx`, `/Planes.aspx`, etc.) and let the user search within.

## File output

Save the generated dossier as a Markdown file in the user's working folder. Filename: `region-<slug>.md` where slug is a kebab-case version of the region name (e.g., `region-hollow-coast.md`). Tell the user the path. Don't paste the whole dossier back into chat if it's the Full version — just summarize what was generated and link the file.
