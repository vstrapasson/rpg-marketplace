# Output Template

The markdown skeleton for a campaign foundation. Both versions share headings and order; they differ in depth. **Compact** is the Sly-Flourish one-pager (the spine that spirals out). **Full** adds signs, open-question buckets, the session-zero layer, and the full roadmap. Modeled on a real validated GM document.

Filename: `campaign-<slug>.md` (e.g., `campaign-the-ashen-crown.md`).

## Skeleton (both versions)

```markdown
# Campaign — [Title]
*GM working document — Pathfinder 2e · Tone level [N]/5 · [scope: one arc / full campaign, levels X–Y]*

---

## The Pitch (what the players experience)

[1 paragraph: the mundane-looking entry point that hides the truth — the theft, the job, the missing person.]

**Session-one hook:** [the concrete thing that pulls the PCs in — keep it small]

> **Opening hook — Read-aloud / Para ler à mesa:** *[optional, ~40–70 words: the session-one situation, sensory, no PC actions narrated, ends open]*

---

## The Central Truth (GM-facing — the engine)

> Revealed to players gradually, or never completely.

- **What's really going on:** [the buried situation that shapes everything]
- **The antagonist's true motivation:** [the arguable why — pass the "is the villain right?" test; at tone 3 leave it open]
- **The cost of the truth:** [why it's buried, who buried it, what knowing it costs]

---

## Thematic Pillars (3–4)

- **"[Evocative phrase]"** — [how it recurs across the campaign + how it touches each PC personally]
- ...

---

## The Antagonist & the Plan in Motion

- **The antagonist:** [who/what + presence: present / sealed / returning / through-agents]
- **The plan in motion:** [what's advancing now, independent of the PCs]
- **The impending doom:** [where it ends if the PCs never intervene — concrete, not world-ending]
- **The visible agent / mid-boss:** [the hand the PCs meet first]

---

## Act Structure

### Act I — *[name]* | Levels X–Y
**Tone:** [the feel]
**Turn:** Act I ends when [the truth surfaces a layer].

### Act II — *[name]* | Levels X–Y
**Tone:** [...] · **Turn:** [...]

### Act III — *[name]* | Levels X–Y
**Tone:** [...] · **Turn / Finale:** [... — incomplete-victory option for dark-leaning]

---

## The PF2e Cosmological Stance (adopt, don't invent)

- **Hinges on:** [Deity — [AoN Deities](https://2e.aonprd.com/Deities.aspx)] — [the canon used]
- **Plane(s):** [the plane the truth comes from/leads to — [AoN Planes](https://2e.aonprd.com/Planes.aspx)]
- **Threat's nature:** [creature family — [AoN Creatures](https://2e.aonprd.com/Creatures.aspx)] — [why it fits]
- **The spin:** [your campaign's specific take — the sentence that makes it yours]

---

[FULL ONLY from here ↓ — Compact ends after a short roadmap.]

## Escalating Signs

- **Act I — low-frequency wrongness:** [ambient signs no one connects]
- **Act II — the pattern emerges:** [signs that start to cohere]
- **Act III — the veil thins:** [overt signs; the threat near]

## Open Questions

**GM knows, players discover (→ clue-map):**
- [truth to reveal in stages]

**Deliberately ambiguous (never resolved):**
- [the big question — was the villain right?]

**Feeds the next arc:**
- [thread left dangling on purpose]

## Session Zero & the Players

**Worldbuilding questions to bring to players (3–5):** [specific questions you'll actually use]
**PC bonds to the theme:** [one prompt per pillar tying each character to the campaign's heart]
**Safety note:** [Lines & Veils + a pause signal — brief, for dark-leaning buy-in]

## Planning Roadmap & Handoffs

**Lock before play:** [the things that break the game if improvised — plan logic, divine limits, artifact count, act turns]
**Can stay open:** [resolved in play — mid-boss backstory, secondary NPCs, level breaks, finale staging]

**Handoffs:**
- → `rpg-region-creator` / `rpg-city-creator`: [the places]
- → `rpg-faction-creator`: [the antagonist's org; rival/complicit powers]
- → `rpg-location-creator`: [ritual site, key dungeons]
- → `rpg-npc-creator`: [antagonist, mid-boss, key allies]
- → clue-map / revelation list (manual GM work for now): [the 8–10 truths + where each is discoverable]
```

## Section-by-section guidance

### The Pitch
The players' entry point should look *mundane* and hide the truth (a theft that's really the first step of a resurrection). The session-one hook stays small and concrete — Sly Flourish's "start small, spiral out." The opening read-aloud is the only table-facing text in the document.

### The Central Truth
The engine — spend the most care here. State it in 1–2 sentences. The antagonist's motivation must be **arguable** (see `campaign-frameworks.md` §1); at tone 3, the "is the villain right?" question stays open. This section is GM-facing and revealed in stages — that gradual revelation is the campaign's spine.

### Thematic Pillars
Derived from the truth. Each must **recur** and be **personal to the PCs**, or it's a tagline. A pillar is a tension or a cost the campaign keeps asking — not a setting fact. They're the GM's improvisation compass.

### The Antagonist & the Plan
Decide **presence** (sealed/returning antagonists are strong for dark-leaning — the dread precedes the monster). The plan advances **without the PCs**; the **impending doom** is concrete and ideally an *incomplete victory* hook. The **visible agent** gives the PCs someone to chase while the truth stays buried. (Reuse `rpg-faction-creator` logic.)

### Act Structure
A skeleton, not a script. The **turns** are the load-bearing part — one sentence each, every turn surfacing the truth a layer deeper. Scenes are built downstream, in play (the Alexandrian: situations, not plots).

### The PF2e Cosmological Stance
**Adopt and spin — never build.** Four lines: hinges-on / plane / threat-nature / the spin. See `pf2e-cosmology-stance.md`. This is the answer to "do I build a world with ready-made materials?" — no; you take a stance on the canon.

### Escalating Signs
Foreshadow the threat *before* the PCs understand it, by act, low-frequency to overt. At tone 3+, signs **unsettle without explaining**. They double as clue-seeds.

### Open Questions
Three buckets, kept explicit: discover (→ the clue-map), deliberately-ambiguous (never resolved), feeds-next-arc. The ambiguous bucket is the campaign's lingering resonance.

### Session Zero & the Players
The collaborative layer a GM-only brainstorm forgets (Sly Flourish). Player questions you'll *actually use*; a PC-bond prompt per pillar so theme lands personally; a brief, non-preachy safety note for dark play.

### Planning Roadmap & Handoffs
The head-of-the-kit section. **Lock vs. open** prevents both over-prep and game-breaking improvisation. Name specific handoff items for every relevant downstream skill, plus the (currently manual) clue-map.

## Length targets

Guidance, not limits. The truth, pillars, and antagonist carry the weight.

| Section | Compact (one-pager) | Full |
|---|---|---|
| Pitch + hook | 70–120 words | 120–200 words |
| **Central truth** | **80–140 words** | **180–300 words** |
| Pillars (3–4) | 80–140 words | 180–300 words |
| Antagonist & plan | 90–150 words | 220–360 words |
| Act structure | 90–150 words | 220–360 words |
| PF2e stance | 50–90 words | 100–160 words |
| Escalating signs | — | 180–300 words |
| Open questions | — | 120–220 words |
| Session zero | — | 150–280 words |
| Roadmap & handoffs | 60–110 words (short) | 200–340 words (full) |
| **Total** | **~700–1200 words (one page)** | **~2200–3400 words** |
