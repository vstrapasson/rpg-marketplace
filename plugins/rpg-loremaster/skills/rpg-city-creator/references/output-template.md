# Output Template

The exact markdown skeleton for city dossiers. Both **Compact** and **Completo (Full)** use the same headings in the same order — they differ only in depth per section. The **faction web** and **cast** stay rich in both modes; **districts and economy stay thin in both modes** (that's the design, not a Compact compromise).

Filename: `city-<slug>.md` (e.g., `city-saltmire.md`).

## Skeleton (both versions)

```markdown
# [City Name]

> [One-sentence essence — what a traveler says about this place in three seconds.]

**The central question:** [the one tension the whole city is organized around]
**Scale:** [thorp / village / town / city / metropolis] — approx. [population band]
**Tone level:** [N] of 5 — [label]
**Generated:** [date]

---

## Identity & the Fantastic Feature

[Compact: 1 paragraph — essence + the one striking image that defines the skyline.]
[Full: 1 paragraph, expanded.]

**Fantastic feature:** [the single defining image — the thing every visitor mentions]

> **First impression — Read-aloud / Para ler à mesa:** *[~40–70 words: what the PCs see, smell, and hear in the first sixty seconds. Include in BOTH Compact and Full — the user singled this beat out as the most useful. Sensory; no PC actions narrated; end open.]*

## The Faction Web

[The meat of the dossier. Each faction is a STANCE on the central question plus the means to push it. Orthogonal — every pair clashes for a different reason. At tone 3, exactly one faction has an internal rot.]

### [Faction Name] — [3-word identity]
- **Want:** [concrete goal, tied to the central question]
- **Have:** [concrete leverage — coin, muscle, a relic, a secret, a chokepoint]
- **Hate:** [who they oppose + why — this generates play]
- *(Full only)* **Lever:** [the specific thing PCs could do to help or wreck them]

[Repeat: Compact 2–3 factions, Full 3–4 factions.]

## The Cast

[4–6 named NPCs the PCs can talk to TODAY. The signature section. Each: name, role, faction tie, want, one vivid trait, a voice hook. NO full backstories or stat blocks — flag the best for npc-creator.]

- **[Name]**, [role] — [Compact: 2 lines: faction tie + want + one vivid trait. Full: a full paragraph including a voice hook — a tic, a belief, a contradiction.]
  > **[Name]** (voice): *"[one quoted line in their voice — the read-aloud voice hook]"*

## Powers That Be

[Compact: 3 lines — de jure authority, de facto power, the active crisis.]
[Full: a paragraph on the power structure + a paragraph on the crisis (usually the central question intensifying right now, steppable on session one).]

## Faith in the City

Tighter than a region's religion section — focus on what the faiths DO in the city, not cosmology.

- **Civic faith:** [Deity — [AoN Deities](https://2e.aonprd.com/Deities.aspx)] — [the temple with political weight; Compact 1 line / Full paragraph with local rite + political role]
- **Street faith:** [Deity] — [everyday folk devotion; 1 line / paragraph]
- **Shadow presence:** [Deity or cult] — [the banned rite / whispered chapel; at tone 3+ ALWAYS present]

## The Shape of the City

A light spatial spine — NOT a gazetteer. Each district: one line + which faction or piece of the central question lives there.

- **[District name]** — [one line] · *holds:* [faction / question element]
  > **Read-aloud / Para ler à mesa:** *[~40–70 words evoking the quarter as the PCs enter — sensory, no PC actions narrated.]*

[Compact 3 districts, Full 4–5. Scale sets the count — see urban-coherence-rules.md.]

**Contested / scarce:** [1–2 lines — the only economy detail that earns space: what everyone needs and can't easily get, or what's fought over. Feeds conflict.]

## Trouble & Threats

- **On arrival:** [the situation the PCs walk straight into as they enter — a scene, not a menu]
  > **Read-aloud / Para ler à mesa:** *[~40–70 words, sensory, ending open — the single most useful at-the-table beat.]*
- **Urban threats (2–4):** bullet list — pull from the "enemy within" roster; link each to an [AoN Creatures](https://2e.aonprd.com/Creatures.aspx) category page
- **Ambient menace / hazards (1–3):** the texture — sounds, a cursed bridge, a wrong fog. At tone 3+, at least one threat carries a horror trait but doesn't lead.

## Adventure Hooks (5–7)

Each hook: **concrete trigger** + **connection** (to the question / a faction / a cast member / a threat) + **stakes**.

At tone 3+, at least 2 hooks carry a **moral cost** — mark with *italics* on the dilemma line. Bend at least one hook toward the PCs (Shea's "build around the characters"); if the party is unknown, add a "tailor these" note.

1. **[Hook title]** — [body: 1–2 sentences Compact / fully fleshed with trigger, stakes, complication, directions Full]
2. ...

## Off-Stage Notes

What was named but not detailed — ready for follow-up skills. Be specific; name things.

→ Ready for `rpg-npc-creator`: [cast members worth a full backstory]
→ Ready for `rpg-faction-creator`: [factions with unexplored depth / internal rot]
→ Ready for a location-creator: [specific buildings, vaults, the fantastic feature's interior]
→ Region context honored: [facts inherited from a region handoff, kept consistent]
→ Tone / canon notes: [any section dialed off the base tone; any deliberate contradictions]
```

## Section-by-section guidance

### The central question
The spine. State it as **one sentence with no obvious answer**, that different factions answer differently. Test it: can you name three factions who'd each resolve it differently and to their own benefit? If not, sharpen the question. Weak: "the city has problems." Strong: "the river is drying and only the upstream guild controls the locks — do they sell water, ration it, or hoard it?"

### Identity & the fantastic feature
The feature is Shea's rule made concrete: the one image a visitor mentions first. Keep it *specific and visual* — "a cathedral grown inside the ribcage of a dead titan", not "an impressive temple." The feature and the question should resonate, but they're different things: the feature is what you *see*, the question is what's *at stake*.

### The faction web (the meat)
Spend the most words here. **Orthogonality is the rule** — for any pair of factions A and B, their conflict must differ from any pair (A, C) or (B, C). If A clashes with B for the same reason A clashes with C, you have one protagonist and two enemies — flat. See `urban-coherence-rules.md` for the pairwise test.

**Want/Have/Hate** is the minimal anatomy; **Have** is what makes a faction matter (a faction with a goal but no leverage is just an opinion). At tone 3, exactly one faction carries an internal rot — a corrupt lieutenant, a secret patron, a compromised ideal — while the others stay clean, so the rot lands by contrast.

### The cast (the signature)
This is what separates a living city from an abstract one, and it's the city-creator's distinctive move versus the region skill. Each NPC is a **face with a want**, not a quest-dispenser. The voice hook is the most valuable line — give them a way of speaking or a belief that an improvising GM can grab instantly ("ends every sentence with 'understand?'"; "genuinely believes the drowned are luckier than the living"). Anchor everyone to the question or a faction; subvert at least one archetype (the kindly innkeeper who informs for the watch; the crime boss who's the only one feeding the slums). Don't write stat blocks — point at a reusable PF2e NPC block (see `city-canon-quickref.md`) and flag the richest faces for `rpg-npc-creator`.

### Powers that be
**De jure vs. de facto** — name the gap. A council that officially rules while a single banker holds everyone's debts is more interesting than a council that simply rules. **The active crisis** is usually the central question reaching a flashpoint *now* — concrete enough that PCs can act on it in session one.

### Faith in the city
Keep it **tighter than a region's religion**. Cities politicize faith — focus on what each thread *does*: which temple the council listens to, which shrine the dockworkers pray at, which chapel people cross the street to avoid. At tone 3+, the shadow presence is non-negotiable. Pick by *urban function* from `city-canon-quickref.md`.

### The shape of the city (keep it thin)
A skeleton to hang things on, generated late and deliberately lean. Each district is **one line plus what lives there** — a faction seat, a piece of the question, a cast member's turf. The "contested/scarce" line is the *only* economy you write, because scarcity is the one economic fact that drives play. Resist the urge to detail shops, prices, or populations beyond the scale band. If you're writing a third sentence about a district, stop.

### Trouble & threats
**The arrival situation is the antidote to "what do you do?"** — drop the PCs into a scene. Urban threats favor the *enemy within*: things that hide among people (doppelgangers, wererats, a vampire patron, an infiltrating devil, a cult) rather than wilderness megafauna. Make threats *connect* — the doppelganger is impersonating a cast member; the haunt is in the district the question is about.

### Adventure hooks
**The test of the whole dossier.** Every hook must reference at least one specific element you generated — the question, a faction, a named NPC, a threat. A hook that could be transplanted to any city means you haven't done the work. Moral-cost hooks (tone 3+): the structure is "to get X you must give up Y", both things the PCs care about, and the obvious move is wrong. Bend one hook toward the actual PCs.

### Off-stage notes
The handoff that makes this part of a kit. Name specific things ready for `rpg-npc-creator`, `rpg-faction-creator`, and a location-creator. If the city came from a region handoff, restate which regional facts you honored. Note any tone deviations or deliberate contradictions so the next skill keeps consistency.

## Length targets

Guidance, not hard limits. Note the deliberate imbalance: factions and cast dominate; districts and economy are kept small **on purpose**.

| Section | Compact target | Full target |
|---|---|---|
| Central question | 1 line | 40–80 words |
| Identity & feature | 60–90 words | 150–220 words |
| **Faction web** | **180–300 words** | **500–800 words** |
| **The cast** | **120–200 words** | **400–650 words** |
| Powers that be | 50–90 words | 180–280 words |
| Faith | 60–100 words | 180–280 words |
| Shape of the city | 70–110 words | 150–230 words |
| Trouble & threats | 90–140 words | 220–340 words |
| Hooks | 200–350 words | 500–900 words |
| Off-stage | 50–90 words | 70–130 words |
| **Total Compact** | **~1100–1700 words** | — |
| **Total Full** | — | **~2600–4000 words** |
