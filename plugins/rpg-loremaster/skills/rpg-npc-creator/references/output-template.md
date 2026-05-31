# Output Template

The markdown skeleton for NPC sheets. Both **Compact** and **Completo (Full)** use the same headings in the same order; they differ in depth. A third mode — **Quick (conversational)** — is for mid-session improv and is **not** a file; its shape is at the bottom.

Filename (Compact/Full): `npc-<slug>.md` (e.g., `npc-mother-cholva.md`, `npc-kett-the-broker.md`).

## Skeleton (Compact & Full)

```markdown
# [NPC Name]

> [One-line concept — role + core contradiction.]

**Role:** [their function in the world / for the PCs]
**Tone level:** [N] of 5 — [label]
**Generated:** [date]

---

## At a Glance
- **First impression:** [what the PCs notice immediately — demeanor, the telling detail]
- **Voice / mannerism:** [the 2-second performable detail for the GM]
- **Want, in a line:** [their conscious goal]

> **First appearance — Read-aloud / Para ler à mesa:** *[~40–70 words: how the GM introduces them. Sensory; no PC actions narrated; end open.]*

## Who They Are
### Surface
[How they present to the world — 2–3 sentences.]
### Beneath
[Who they actually are — the internal truth, contradictions, fears — 3–4 sentences.]
### Core belief
[The worldview that drives them — 1–2 sentences.]

> **[Name]** (voice): *"[one quoted line in their voice — the voice hook]"*

## Backstory
[The formative experiences that shaped them — specifics, not a full biography. 2–3 key
events/periods, each connected to a current trait or behavior (the wound is *active*).]

## Motivations
- **Wants:** [the conscious goal]
- **Needs:** [what they actually need but won't admit — in tension with the want]
- **Fears:** [what they're protecting against / avoiding]

## Relationships & Connections
[2–4 ties to other people/factions in the world — each a potential story. Leave one gap
or mystery unexplained.]

## Hooks & Story Potential
[2–4 ways this person pulls the PCs into narrative — emerging from who they are. At tone 3+,
mark ≥1–2 **moral-cost** hooks (*italics on the dilemma line*).]
1. **[Hook title]** — [body]
2. ...

## GM Notes
[How to roleplay them; what triggers warmth/wariness/hostility/fear; secrets to reveal over
time; how they might evolve during the campaign.]

## Off-Stage Notes

→ Ready for `rpg-faction-creator`: [the organization they lead/serve, if any]
→ Ready for a location-creator: [a site tied to them — their workshop, lair, sanctum]
→ Ready for `rpg-city-creator` / `rpg-region-creator`: [if they imply a settlement/spread]
→ Ready for `rpg-clue-mapper`: [what they know — info worth wiring as a clue]
→ Context honored: [facts inherited from a handoff — faction/city/foundation truth & tone]
→ Tone / canon notes: [tone deviations; secrets held back for reveal; content advisory if 5]
```

## Section-by-section guidance

### At a Glance
The GM's grab-bag for the first scene. The **voice/mannerism** is the single most valuable line — give them a way of speaking or a habit an improvising GM can deploy instantly. The first-appearance read-aloud is an *offering*, not a script.

### Who They Are
The heart of the sheet. **Surface and Beneath must pull against each other** — that gap is the contradiction (see `npc-frameworks.md` §1). The **core belief** is the engine; if you can't state it, the NPC isn't ready. Keep the gap *discoverable*: the surface is what the PCs meet, the beneath is what they earn.

### Backstory
Specifics over generalities, and **every event connects to a present behavior** (cause → effect). 2–3 beats, not a biography. Avoid the "sad backstory = depth" trap — a tragedy that changes nothing today is set dressing (`tone-spectrum.md`, Common mistakes).

### Motivations
**Want vs. need** is the drama (`npc-frameworks.md` §1): the conscious goal and the unadmitted need, in tension. Fears name what they protect against — often the wound, still raw.

### Relationships & Connections
This is what makes them feel like they existed before the PCs arrived. Each tie is a potential story; anchor at least one to the campaign's factions or central truth. **Leave one mystery** unexplained — it invites curiosity.

### Hooks
Every hook is a *way in* anchored to the core, a relationship, the secret, or what they know. Moral-cost hooks at tone 3: helping them harms someone, or opposing them harms someone sympathetic. See `npc-frameworks.md` §6 for the logic that makes hooks bite.

## Length targets

Guidance, not limits. Who-They-Are and Motivations carry the weight.

| Section | Compact | Full |
|---|---|---|
| At a Glance (+ first appearance) | 60–100 words | 110–170 words |
| **Who They Are** | **90–140 words** | **220–340 words** |
| Backstory | 60–110 words | 180–300 words |
| Motivations | 50–90 words | 120–200 words |
| Relationships | 60–110 words | 160–280 words |
| Hooks | 120–220 words | 320–560 words |
| GM Notes | 50–100 words | 140–240 words |
| Off-stage | 40–80 words | 60–120 words |
| **Total** | **~600–900 words** | **~1300–2000 words** |

## Quick (conversational) — mid-session improv, NOT a file

When urgency cues fire ("quick", "on the fly", "the players just walked into…"), do **not** write a file or use the skeleton above. Reply directly in chat, ~10–15 lines:

```
**Name:** [Name]
**Role:** [what they are — one phrase]
**Concept:** [one sentence — who they are + their core contradiction]
**Motivation:** [what they want, one sentence]
**Voice/Mannerism:** [the performable detail]
**Appearance:** [one or two vivid details, not a full description]
**Hooks:** [2–3 bullets, one sentence each]
```

One sharp detail beats ten paragraphs: a bartender who "always dries the same glass when he's nervous" is more useful mid-session than a backstory the GM won't have time to read.
