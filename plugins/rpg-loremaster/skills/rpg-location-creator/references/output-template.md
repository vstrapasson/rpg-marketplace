# Output Template

The markdown skeleton for location dossiers. Both **Compact** and **Completo (Full)** use the same headings in the same order. They differ in depth *and* in how the **space** is rendered: Compact lays it out as a **five-room beat sequence** (lean, pacing-first); Full lays it out as a **xandered keyed map** (numbered non-linear areas with loops, multiple entrances, verticality), presented as the GM's tool (PF2e play doesn't require a grid).

Filename: `location-<slug>.md` (e.g., `location-drowned-vault.md`).

## Skeleton (both versions)

```markdown
# [Location Name]

> [One-sentence essence — what it is and the one thing wrong with it.]

**Type / Size:** [dungeon / lair / ruin / crypt / temple / tower / cave / manor / landmark] · [single site / small complex / multi-level]
**Why it hasn't been cleared:** [the one-line reason — the spine]
**Tone level:** [N] of 5 — [label]
**Suggested party level:** [X] (scale threats to taste)
**Generated:** [date]

---

## Premise & Ecology

- **What it was:** [original function]
- **What happened:** [the turn]
- **What it is now:** [current state + who occupies it]
- **Ecology:** [how the inhabitants live — eat, patrol, rule, feud; a normal day with no PCs]
- **Why it hasn't been cleared:** [expanded — the guardian / curse / taboo / returner / price / hidden / owner / recent]

## The Fantastic Feature

[1–2 lines: the one striking image that defines the place.]

> **Approach — Read-aloud / Para ler à mesa:** *[~40–70 words: the establishing block as the PCs reach the location from outside. Sensory, includes visible features/exits, ends open.]*

## The Space

[COMPACT → five-room beats. Each beat = one area; lean.]
1. **Entrance & guardian** — [the threshold + its challenge]
2. **Puzzle / roleplay** — [the change of pace]
3. **Trick / setback** — [the cost or twist]
4. **Climax** — [the confrontation + the truth]
5. **Reward / revelation** — [treasure / secret / hook to next]

[FULL → xandered keyed map. 8+ numbered areas, non-linear.]
**Entrances:** [≥2 — e.g., the main gate (A1); the collapsed cellar (A6); the sea-cave (A9)]
**Area-connection list:** [e.g., A1 ↔ A2 ↔ A3; A2 ↘ A5 (shaft, vertical); A5 ↔ A4 ↔ A1 (loop); A8 secret, from A4]

- **A1 — [name]:** [what's here + its role in the ecology]
  > **Read-aloud / Para ler à mesa:** *[for memorable areas only — ~40–70 words]*
- **A2 — [name]:** [...]
- *(continue; every area earns its place in the ecology — not "monster + treasure")*

## Inhabitants & Threats

- **Dominant:** [faction/creature holding the place — [AoN Creatures](https://2e.aonprd.com/Creatures.aspx); scale to party level]
- **Secondary / rival:** [what else lives here and conflicts — the PCs' wedge]
- **Scavengers / ambient:** [the small things in the margins]
- **Hazards & haunts:** [environmental + magical + ≥1 haunt/"wrong" area at tone 3 — [AoN Hazards](https://2e.aonprd.com/Hazards.aspx)]

## Treasure, Secrets & the Choice

- **Treasure:** [what's worth coming for + where — tied to the premise; ≥1 prize costs/means something]
- **The secret:** [what rewards investigation and reframes the place]
- **The choice (tone 3+):** [the dilemma the place forces]

## The Dynamic Element

[What changes if the PCs linger — a timer (ritual/tide/collapse), a reaction (inhabitants regroup/hunt), or a shifting space. Lighter than a faction clock.]
[FULL optional: explicit timer — "4 ticks: [event] → [event] → [event] → [the turn]"]

## Hooks (3–5)

Why the PCs come *now*, anchored to premise / treasure / inhabitants / a handed-off faction, with stakes. At tone 3+, mark ≥1 **moral-cost** hook (*italics on the dilemma*).

1. **[Hook title]** — [body]
2. ...

## Off-Stage Notes

→ Ready for `rpg-npc-creator`: [a named inhabitant — the guardian, the survivor, the bound thing]
→ Ready for `rpg-faction-creator`: [if the site reveals a wider organization]
→ Ready for `rpg-city-creator` / `rpg-region-creator`: [if it implies or ties to a settlement/region]
→ Region / city / faction context honored: [facts inherited from a handoff]
→ Tone / canon notes: [deviations from base tone; the planar source if hidden]
```

## Section-by-section guidance

### Premise & Ecology
The spine — spend the most care here. The **"why hasn't it been cleared?"** line is mandatory and load-bearing; put it in the header *and* expand it. The ecology must pass the "normal day with no PCs" test (Sly Flourish's living dungeon). See `location-frameworks.md` §1–2.

### The Fantastic Feature
One striking image (Sly Flourish). The approach read-aloud turns it into table-ready narration — the PCs' first sight of the place. Sensory, includes the obvious exits/features, ends open.

### The Space
**Compact = five-room beats** (Johnn Four): functional roles, not literally five rooms; guarantees pacing without a map. **Full = xandered map** (Justin Alexander, after Jennell Jaquays): ≥2 entrances, at least one loop, at least one vertical link, so navigation is a *choice*. The area-connection list lets the GM sketch it. **Every area earns its place in the ecology** — a reason to exist beyond "monster + treasure." See `location-frameworks.md` §3–4.

### Inhabitants & Threats
Build a **relationship**, not a roster: dominant + a rival/wedge + scavengers (see `location-canon-quickref.md` §2). Hazards and haunts carry danger and tone without combat; at tone 3+, include at least one haunt or "wrong" area. Scale to party level or give stat-block anchors.

### Treasure, Secrets & the Choice
Treasure ties to the premise; at least one prize **costs or means something** (cursed, contested, sacred, evidence). The secret reframes the location. The choice is the tone-3 dilemma the place forces. See `tone-spectrum.md`.

### The Dynamic Element
Keep the place alive — one or two moving parts (timer/reaction/shift). It's why the PCs can't dawdle forever. Lighter than a faction's clock; in Full you may render a short explicit timer.

### Hooks
Every hook gives a *why now* and anchors to a specific element. Moral-cost hook at tone 3: clearing the place harms someone, or the thing inside is sympathetic. See `location-frameworks.md` for the archetypes' dark angles.

## Length targets

Guidance, not limits. Premise/ecology and the space carry the weight.

| Section | Compact | Full |
|---|---|---|
| Premise & ecology | 90–150 words | 220–360 words |
| Fantastic feature + approach | 60–100 words | 100–160 words |
| **The space** | **120–220 words (5 beats)** | **400–700 words (keyed map)** |
| Inhabitants & threats | 80–140 words | 250–400 words |
| Treasure, secrets & choice | 70–120 words | 180–300 words |
| Dynamic element | 40–80 words | 120–200 words |
| Hooks | 120–220 words | 300–500 words |
| Off-stage | 50–90 words | 70–130 words |
| **Total** | **~900–1500 words** | **~2200–3400 words** |
