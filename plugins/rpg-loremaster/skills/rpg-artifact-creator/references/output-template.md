# Output Template

The markdown skeleton for artifact dossiers. Both **Compact** and **Completo (Full)** use the same headings in the same order; they differ in depth and in how the **price** is rendered (Compact = prose; Full = a corruption clock, a desire-lines table, and an explicit destruction quest).

Filename: `artifact-<slug>.md` (e.g., `artifact-bell-of-the-drowned.md`, `artifact-mourning-crown.md`).

## Skeleton (Compact & Full)

```markdown
# [Artifact Name]

> [One-line concept — what it is + its will + who will do what to hold it.]

**What it is:** [object kind — weapon, regalia, reliquary, instrument, vessel…]
**Tone level:** [N] of 5 — [label]
**Generated:** [date]

---

## At a Glance
- **Look:** [one or two telling sensory details — not a full description]
- **The gift, in a line:** [what it does, evocatively — never a "+X"]
- **The price, in a line:** [what it costs the bearer]
- **What it wants:** [the will, in a phrase]

> **Entrance — Read-aloud / Para ler à mesa:** *[~40–70 words: how it reaches the PCs' hands — the dramatic beat of acquisition. Sensory; no PC actions narrated; end open.]*

## Provenance
[Who forged it, why, and — for dark-leaning — what price was paid in the making.
2–3 sentences. The origin is the root of the will and the price.]

## The Will — what it wants
[Maker + original purpose + current unfulfilled goal → the pull it exerts on the bearer.
This is the agenda the price escalates toward.]

## Desire-Lines — who wants it, and why
[The factions/NPCs/powers already reaching for it. Each is an edge from this node into
the campaign. Name them; one line each. (Full: render as the table below.)]

## What It Unlocks
[What its arrival changes or breaks in the story — the plot it moves.]

## The Gift
[What it does, rendered as fiction, not arithmetic. The bait: genuinely good, so the
price tempts. One strange, evocative effect beats a numeric bonus.]

## The Price
[The cost/corruption. **Compact:** narrate 3–5 escalating stages, each with its sensory
tell, and how using the gift (or feeding the will) drives it deeper. **Full:** render as
the corruption clock below. The price escalates toward the will.]

> **The tell — Read-aloud / Para ler à mesa:** *[~40–70 words: the sensory cue when the
> artifact stirs and the price climbs a stage. Sensory; no PC actions narrated.]*

## Look & Tell
[What it looks like at rest, and the sensory cue when it wakes or acts. (May fold into
At a Glance for Compact.)]

## Exit / Destruction
[How it leaves play. At this tier, often a quest: a specific rite, place, or cost — and
why it resists being unmade (the will thwarted). (Full: the destruction quest below.)]

> **Signature moment — Read-aloud / Para ler à mesa:** *[~40–70 words: a small scene of
> the price taking hold — the will getting its way. Sensory; no PC actions narrated.]*

## Hooks & Story Potential
[4–6 ways the artifact pulls the PCs into narrative — claim it, resist its pull, destroy
it, deliver it, be hunted for it. Anchored to the will, a desire-line, the price, or the
exit. At tone 3+, mark ≥1–2 **moral-cost** hooks (*italics on the dilemma line*).]
1. **[Hook title]** — [body]
2. ...

## Off-Stage Notes

→ Ready for `rpg-npc-creator`: [the forger, the guardian, the obsessed hunter]
→ Ready for `rpg-faction-creator`: [the organization hunting or guarding it]
→ Ready for a location-creator: [where it is kept / where it was made]
→ Ready for `rpg-clue-mapper`: [the clues that lead the PCs to it]
→ Context honored: [facts inherited from a handoff — faction/location/foundation truth & tone]
→ Tone / canon notes: [tone deviations; secrets held back for reveal; content advisory if 5]
```

## Section-by-section guidance

### At a Glance
The GM's grab-bag. The **look** and the **tell** are the sensory hooks; the gift/price/will lines orient the GM in two seconds. The entrance read-aloud is an *offering*, not a script.

### Provenance & The Will
The root of the node. Provenance answers *where it came from*; the will answers *what it wants now* (`artifact-frameworks.md` §1–2). For dark-leaning, the price paid **in the making** is where the shadow starts — a maker who fed it something is more sinister than one who simply enchanted it.

### Desire-Lines
This is what makes the artifact feel like it existed and mattered before the PCs touched it. Each line is an edge to a faction/NPC/place — and a future handoff. **At least one** should connect to the campaign's central truth.

### The Gift & The Price
The triad's load-bearing pair (`artifact-frameworks.md` §3–4). The gift must be **genuinely good** or the price tempts no one; the price comes in **stages with tells**, and **escalates toward the will**. A gift with no answering cost fails the price test.

### Exit / Destruction
At this tier the exit is part of the design (`artifact-frameworks.md` §5). Give a concrete, in-fiction way to unmake it — and a reason it resists.

### Hooks
Every hook is a *way in* anchored to the node or the price. Moral-cost hooks at tone 3: claiming it helps the wrong people, or destroying it costs someone who needs it.

## Length targets

Guidance, not limits. Provenance/Will and Gift/Price carry the weight.

| Section | Compact | Full |
|---|---|---|
| At a Glance (+ entrance) | 70–110 words | 120–180 words |
| Provenance | 50–90 words | 140–240 words |
| **The Will** | **40–80 words** | **120–200 words** |
| Desire-Lines | 50–100 words | 160–280 words (+ table) |
| What It Unlocks | 30–60 words | 80–140 words |
| **The Gift** | **40–80 words** | **100–180 words** |
| **The Price** | **80–140 words** | **220–360 words (+ clock)** |
| Look & Tell | 30–60 words | 70–130 words |
| Exit / Destruction | 40–80 words | 140–260 words (+ quest) |
| Hooks | 140–240 words | 360–600 words |
| Off-stage | 40–80 words | 60–120 words |
| **Total** | **~650–950 words** | **~1500–2400 words** |

## Full-only structures (optional GM tools)

These are what **Completo** adds over **Compact**. Present them as optional GM tools.

### Corruption clock (the staged price)
```
The Price — corruption clock  ◆◆◇◇◇  (filled = stages reached)
Stage 1 — [trigger] · Tell: [sensory cue] · Effect: [what changes]
Stage 2 — [trigger] · Tell: [...] · Effect: [...]
Stage 3 — [trigger] · Tell: [...] · Effect: [...]
[…4–5]  Each stage is the will getting more of its way.
```

### Desire-lines table (who wants it → what they'd do)
| Who | Why they want it | What they'd do to get it | Connects to |
|---|---|---|---|
| [actor] | [the gift / the will / spite] | [steal, court, kill, betray] | [faction / truth / place] |

### Destruction quest (the exit)
```
To unmake it: [the rite / place / cost].
Why it resists: [the will thwarted — what the artifact does to stop it].
What it costs the party: [the price of the exit].
```
