# Output Template

The markdown skeleton for faction dossiers. Both **Compact** and **Completo (Full)** use the same headings in the same order. They differ in depth *and* in how the **dynamic dimension** is rendered: Compact keeps the plan/doom/reaction **narrative** (prose); Full adds the **explicit structure** (a grim-portents progress clock and an "if X → Y" reaction table), presented as optional GM tools since PF2e isn't clock-based.

Filename: `faction-<slug>.md` (e.g., `faction-drowned-mercy.md`).

## Skeleton (both versions)

```markdown
# [Faction Name]

> [One-sentence essence — what they're known or whispered for.]

**Drive:** [Faction] wants [goal] because [impulse], believing [ideology].
**Type / Reach:** [guild / cult / house / syndicate / order / cell / cabal / company] · [single cell / city power / regional force / continental]
**Tone level:** [N] of 5 — [label]
**Generated:** [date]

---

## Identity & Calling Card

[1 paragraph: essence + symbol/aesthetic/tell.]

> **Calling card — Read-aloud / Para ler à mesa:** *[~40–70 words: how the PCs first encounter evidence of the faction. Sensory; no PC actions narrated; end open.]*

## The Drive

- **Goal:** [concrete, nearly achievable, with deadline pressure]
- **Impulse:** [fear / faith / grievance / greed / love / duty / pride — the why beneath]
- **Ideology / who benefits:** [what they believe + the case a sympathizer would make]

## The Plan in Motion

- **What they're doing now:** [the concrete operation underway]
- **Impending doom:** [where it ends if the PCs never intervene — concrete, not world-ending]
- **The signs (grim portents):** [Compact: prose — "first X, then Y, then Z." Full: see clock below.]

[Full only — optional GM tool:]
**Progress clock — [N segments]** (tick one or two between sessions to keep them moving):
1. ◑ [portent — visible] 
2. ○ [portent — hidden]
3. ○ [portent]
4. ○ [portent → fills into the impending doom]

## The Machine

- **Leader:** [Name] — wants [personal goal, distinct from the faction's]. [Reusable PF2e NPC block.] *Flag for `rpg-npc-creator`.*
  > **[Name]** (voice): *"[one quoted line in their voice]"*
- **Inner circle:** [Compact 1–2 / Full 3 lieutenants — name + one line; each is a *lever* (PC influence) or a *fracture* (coming split)]
- **The base / rank-and-file:** [who joins, why, and the **cost of membership**]
- **Resources & leverage:** [the "Have": coin / muscle / a relic / blackmail / a chokepoint / a patron — concrete, exploitable]
- **Seat of power:** [where they operate — one line; hand off to a location-creator]

## The Fracture

- **Internal tension:** [the faction-within-the-faction / the coming schism]
- **The secret / the leverage:** [what the PCs can discover and use]
- **(Tone 3) the rot:** [the gap between ideal and practice — ONE part, rest sincere]

## How They Respond to the PCs

Escalation ladder (specific to this faction's impulse):
1. **Recruit / court:** [what an offer looks like]
2. **Tolerate / watch:** [how they keep tabs]
3. **Pressure / warn:** [the shot across the bow]
4. **Retaliate:** [proportionate harm]
5. **Open war:** [the committed move — reserve it]

[Full only — optional GM tool:]
**Reaction table** — *if the PCs… → the faction…*
| If the PCs… | The faction… |
|---|---|
| [investigate them] | [response, tied to impulse] |
| [rob/sabotage them] | [response] |
| [expose them publicly] | [response] |
| [kill a lieutenant] | [response] |
| [offer alliance] | [response] |

## Hooks (4–6)

How the PCs collide with the faction — join, oppose, exploit, get caught between, be hunted. Each anchors to the drive / a lieutenant / the secret / the doom. At tone 3+, mark ≥1–2 **moral-cost** hooks (*italics on the dilemma line*).

1. **[Hook title]** — [body]
2. ...

## Off-Stage Notes

→ Ready for `rpg-npc-creator`: [the leader; the richest lieutenant]
→ Ready for a location-creator: [the seat of power; a site from the plan-in-motion]
→ Ready for `rpg-city-creator` / `rpg-region-creator`: [if the faction implies new settlements or spread]
→ Region / city context honored: [facts inherited from a handoff, kept consistent]
→ Tone / canon notes: [deviations from base tone; deliberate contradictions; the planar backer if hidden]
```

## Section-by-section guidance

### The Drive
The engine — spend the most care here. The **one-line drive** at the top is the whole faction in a sentence; if you can't write it, the faction isn't ready. The **impulse** (not the goal) is what makes them act *now*. The **ideology** must pass the sympathizer test: state the case a believer would make. See `faction-frameworks.md` §1.

### The Plan in Motion
This is the skill's signature and the thing region/city dossiers don't have. **Lead with what they're doing right now** — a concrete operation, not a standing condition. The **impending doom** is a *state of the world* if the PCs never act; keep it sinister but not apocalyptic (the players should feel they could walk away — and shouldn't). The **grim portents** are the ordered, droppable signs; mark which are visible vs. hidden. Full renders them as a clock the GM ticks between sessions. See `faction-frameworks.md` §2.

### The Machine
The leader's **personal want should differ from the faction's** — that gap is a lever and a future betrayal. Every lieutenant must be a **lever or a fracture**; a lieutenant who's neither is decoration. The **cost of membership** is where dark-leaning lives quietly (what you owe, what you give up). Resources are the "Have" — concrete and *exploitable*, since the PCs will try.

### The Fracture
At tone 3, **one** rotted part, the rest sincere — contrast makes it land (see `tone-spectrum.md`). The **secret** is the PCs' main lever; make it discoverable and usable. Don't make the whole faction the rot; a paladin should almost be able to join before the truth surfaces.

### How They Respond to the PCs
The ladder must be **specific to this faction's impulse** — a fear-driven cult over-reacts; a duty-bound order responds by the book; a proud house can be goaded into a mistake. The Full reaction table is the between-sessions tool that keeps the faction acting believably even when the PCs aren't looking.

### Hooks
Every hook is a *way in* (join / oppose / exploit / caught-between / hunted) anchored to a specific element. Moral-cost hooks at tone 3: the faction is right about the wrong thing, or stopping them helps someone worse. See `faction-frameworks.md` for the sympathizer logic that makes these bite.

## Length targets

Guidance, not limits. The drive, plan-in-motion, and fracture carry the weight.

| Section | Compact | Full |
|---|---|---|
| Drive | 60–100 words | 140–220 words |
| Identity & calling card | 70–110 words | 130–200 words |
| **Plan in motion** | **90–150 words** | **250–400 words (incl. clock)** |
| The machine | 120–200 words | 350–550 words |
| The fracture | 70–120 words | 180–300 words |
| Reaction ladder | 60–100 words | 200–320 words (incl. table) |
| Hooks | 150–280 words | 400–700 words |
| Off-stage | 50–90 words | 70–130 words |
| **Total** | **~900–1500 words** | **~2200–3400 words** |
