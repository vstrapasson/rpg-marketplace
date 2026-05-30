# Output Template

The exact markdown skeleton for region dossiers. Both **Compact** and **Completo (Full)** use the same headings in the same order — they only differ in depth per section.

Filename: `region-<slug>.md` (e.g., `region-hollow-coast.md`).

## Skeleton (both versions)

```markdown
# [Region Name]

> [One-sentence essence — what someone says about this region in three seconds.]

**Tone level:** [N] of 5 — [label]
**Biome:** [biome / climate]
**Generated:** [date]

---

## Identity & Atmosphere

[Compact: 1 paragraph.]
[Full: 1 paragraph + sensory atmosphere mini-section — smells, sounds, light, characteristic season.]

**Iconic image:** [the first image that flashes when someone hears the name]

> **Read-aloud / Para ler à mesa:** *[~40–70 words — the establishing shot when the PCs first reach or crest into the region. Turn the iconic image into table-ready narration: sensory, no PC actions narrated, ending open. Include in both Compact and Full.]*

## Geography

[Compact: 4–5 bullets covering biome, climate, barriers, resource, landmark.]
[Full: paragraphs covering biome with weather patterns, seasonal variations, named landmarks, barriers as borders, characteristic resource(s) and what's scarce.]

## People

[Compact: 2 short paragraphs — dominant ancestries with one cultural twist, minority ancestries with tension.]
[Full: each dominant ancestry gets a paragraph (values, contradictions, daily life). Each minority gets a paragraph (origin, status, conflict). Use AoN ancestry category links.]

## Religion

The faith of the region in three pieces. Mix per `tone-spectrum.md`.

- **Dominant:** [Deity name — [AoN Deities](https://2e.aonprd.com/Deities.aspx)] — [Compact: 1 line on how worshipped locally. Full: paragraph on local rites, how the faith bends in this region.]
- **Popular secondary:** [Deity] — [1 line / paragraph]
- **Shadow / heretical:** [Deity or cult] — [1 line / paragraph — at level 3+, ALWAYS present]

## Politics

[Compact: 3 lines — de jure ruler, de facto power, active crisis.]
[Full: full paragraph on power structure + paragraph on the active crisis with no clean answer.]

## Factions

[Compact: 2–3 factions, 2 lines each — Name / Want / Have / Hate.]
[Full: 3–4 factions, full Want/Have/Hate + leader name + one secret per faction. Factions must be orthogonal — see coherence-rules.md.]

### [Faction Name]
- **Identity:** [3-word description]
- **Want:** [concrete goal]
- **Have:** [concrete resource]
- **Hate:** [who they oppose + why]
- *(Full only)* **Leader:** [name + 1 line]
- *(Full only)* **Secret:** [the thing only the GM knows]

## Fauna & Threats

Link each to a relevant [AoN Creatures](https://2e.aonprd.com/Creatures.aspx) or [AoN Monster Families](https://2e.aonprd.com/MonsterFamilies.aspx) category page (never an ID).

- **Apex threat:** [1 creature, high level] — [Compact: 1 line. Full: paragraph on how this threat shapes the region.]
- **Regular threats (3–5):** bullet list with creature + 1 line each
- **Ambient creatures / hazards (3–5):** bullet list with creature/hazard + 1 line each

## Points of Interest

### Settlements (3–5)
- **[Name]** — [Compact: one-line essence. Full: 2–3 lines including population scale, dominant feature, hook seed.]

### Minor locations (5–10)
- **[Name]** — [Compact: one-line. Full: 1–2 lines.]

> **Read-aloud / Para ler à mesa:** *[For 2–3 of the most evocative or dark-leaning standout locations only (not every entry), add a short ~40–70-word block the GM can read when the PCs arrive there. Sensory; no PC actions narrated.]*

## Adventure Hooks (5–7)

Each hook: **concrete trigger** + **connection** to a region element + **stakes**.

At level 3+, mark with *italics* on the dilemma line for hooks that involve moral cost. **At least 2 of 5–7 hooks at level 3+ should be morally costly.**

1. **[Hook title]** — [hook body, 1–2 sentences Compact / fully fleshed with trigger/stakes/complication/directions Full]
2. ...

## Beyond the Border (NATION / KINGDOM SCALE ONLY — omit for a plain region)

Include this section only when the dossier is a nation/kingdom (see SKILL.md Step 3j). It is the thin layer a plain region lacks.

**National identity:**
- **Core values (3):** [what the nation is proud of]
- **Shames (2–3):** [what it hides or denies]
- **Taboo (1):** [the line nobody crosses]

**Neighbors & balance of power (2–3):**
- **[Neighbor name]** — [one-line identity] · *relationship:* [ally / rival / vassal / old enemy / uneasy trade] · *wants:* [its geopolitical Want + the point of friction]

**Legitimacy & succession:**
- [What makes the current ruler legitimate, who contests it, what happens when the crown changes hands.]

*(At nation scale, "Points of Interest" lists constituent **regions & key cities** — each a downstream handoff to a region or city run — rather than individual settlements.)*

## Off-Stage Notes

What was mentioned but not detailed — ready for follow-up skills:

- [The capital city — ready for city-creator]
- [The bandit lord — ready for npc-creator]
- [The heretical cult — ready for faction-creator]
- [Any contradictions justified explicitly, or any tone-level deviations noted]
```

## Section-by-section guidance

### Identity & Atmosphere
The single most important section — sets the hook for everything below. The "iconic image" is the difference between a memorable region and a generic one. Spend a moment on it.

**Compact example:**
> *The Hollow Coast is a chain of fjords where the sea pulled back two hundred years ago and never returned, leaving a horizon of dry seabed and stranded skeletons of whales.*
> **Iconic image:** A fishing village built halfway down a cliff that used to be a shoreline, its docks now stairways into nothing.

### Geography
Don't list every climate detail. Pick the **one weather pattern** that defines daily life ("the fog rolls in every morning and burns off by noon") and one **named landmark** maps would label. Resource section drives economy and conflict — name what they have AND what they need from elsewhere.

### People
Avoid single-trait cultures. For each ancestry, add **one contradiction** — "the dwarves here are renowned smiths *and* the most prolific poets in three kingdoms." Contradictions make cultures feel real.

For minorities, the *tension* is mandatory — not "the elves live in the northern woods", but "the elves live in the northern woods and the humans believe they're hiding something about the river's source."

### Religion
At level 3, the **shadow/heretical third is non-negotiable**. It's what earns the tone. The dominant + popular can be heroic and luminous; the third must be ambiguous-or-darker.

Don't make all three deities active in the same way. One is the public faith (temples in every village), one is the folk-faith (hearth shrines, harvest songs), one is whispered about.

### Politics
**De jure vs. de facto matters.** A duke who's technically in charge while the merchant guild actually runs the duchy is more interesting than a duke who actually rules. Name the gap.

**The active crisis** is not "war might happen someday" — it's specific and current. "The duke's heir died last winter and three rivals are positioning. The funeral was last month." Players should be able to step into this on session one.

### Factions
**Orthogonality is the rule.** If your two factions are "good guys" and "bad guys", you've already failed. Find a third axis. The merchants want trade, the druids want the woods left alone, the church wants tithes — each pair has a different conflict, and no single player decision resolves them all.

**Want/Have/Hate** is the minimal anatomy. "Hate" with the reason is critical — it tells you what happens when factions collide.

### Fauna & Threats
**Be specific.** "Wolves and bandits" is a placeholder; "a pack of wolves the village calls the Grey Court, led by an old alpha named Stoneface, who avoids humans but kills any sheep that wanders past the boundary stones" is a location, a faction, and a moral dilemma all at once.

**Apex doesn't need to fight PCs.** An ancient dragon under a mountain who hasn't woken in two centuries shapes a region by its presence — it's not an encounter, it's a reason every other thing here is what it is.

### Points of Interest
**Don't detail settlements** — that's the city skill's job. One line each. The temptation to write a full town description is strong; resist it. Hand off to city-creator later.

**Minor locations are where dark-leaning lives.** A shrine. A ruined tower. A bog with the wrong color water. A stone with names carved into it. One-liners that are *evocative* — let the GM expand on the fly.

### Adventure Hooks
**The test of the whole dossier.** If your hooks could be transplanted to any generic fantasy region, you haven't done the work. Each hook should reference at least one specific element from your dossier — a deity, a faction, a location, a creature.

**Moral cost hooks at level 3+:** the structure is "to get X, you have to give up Y" where both X and Y are things the PCs care about. Not "save the village or fight the dragon" (one is obvious). Try "save the village by handing over the priest who's been stealing from the harvest tithe — the village will live, but the church will use his execution as cover to install a new bishop loyal to the old duke."

### Off-Stage Notes
This is the **handoff section** — tells the user what the next skills can pick up. Be specific about what's ready to expand. Also note any **deliberate contradictions** ("the Asmodean temple in a Sarenrae region is justified by the exiled noble — kept it because the tension is good") and any **tone-level deviations from the base** ("religion section dialed up to level 4 per user request").

## Length targets

These are guidance, not hard limits. Adjust by user need.

| Section | Compact target | Full target |
|---|---|---|
| Identity | 60–80 words | 120–180 words |
| Geography | 80–120 words (bullets) | 200–300 words |
| People | 120–180 words | 300–500 words |
| Religion | 80–120 words | 250–400 words |
| Politics | 60–100 words | 180–300 words |
| Factions | 150–250 words | 400–700 words |
| Fauna | 100–150 words | 250–400 words |
| Points of Interest | 200–300 words | 400–600 words |
| Hooks | 200–350 words | 500–900 words |
| Off-stage | 40–80 words | 60–120 words |
| **Total Compact** | **~1100–1700 words** | — |
| **Total Full** | — | **~2500–4000 words** |
