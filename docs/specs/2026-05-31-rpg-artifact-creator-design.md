# RPG Artifact Creator — Skill Design

**Date:** 2026-05-31
**Status:** Draft
**Target repo:** `~/projects/rpg-marketplace`
**Target plugin:** `plugins/rpg-loremaster`

---

## Context

`rpg-loremaster` is a pure prompt-engineering kit of creator skills that build dark-leaning PF2e campaign content (a spine, regions, cities, factions, locations, NPCs, a clue map) plus an interactive **conductor** that sequences them and a **reviewer** subagent that audits consistency. Every creator deepens **one** thing into a playable artifact and ends; the conductor is the memory between them.

There is a gap: the kit has no skill for the **objects** the campaign turns on — the cursed crown, the relic the cult is digging for, the McGuffin that *is* the central truth. Today an artifact gets *named* in a faction or location dossier and then goes undeepened, the same way factions used to be named-but-static before `rpg-faction-creator`.

`rpg-artifact-creator` fills that gap. It is the **sister of `rpg-npc-creator`**: the kit's second **system-agnostic** creator. Like the NPC creator builds a person from belief/wound/voice (not a PF2e stat block), this builds an artifact from provenance/will/cost/voice (not item level, rarity, or runes). It uses no Archives of Nethys links, so the kit's `?ID=` rule does not apply to it.

### Why this design (researched, not assumed)

Per the kit's philosophy, the spine was chosen by researching how respected GMs design items (Sly Flourish, The Alexandrian, Matt Colville, Dungeon World, plus PF2e's relic/artifact framing). The verdict that shaped the spine:

- **The item's life is ahead of it, not behind it (Alexandrian).** *"The place where you picked up your +2 sword is only the tiniest fraction of the tales you'll forge with it."* Treasure commands the players' undivided attention — *"if the only thing you're offering... is generic numbers, you are wasting a golden opportunity."* So an artifact is designed as a **narrative node**, by its potential to move the plot, not by the moment of discovery.
- **The dividing question is "why does this exist, and what does it want?"** Across the corpus, *intent* separates a relic from loot. The artifact has a maker, an unfinished purpose, and a pull it exerts on its bearer.
- **Function / story / cost triad.** A pure-function item is a stat block; function + story is memorable; function + story + **cost** is the engine of a dark campaign. Magic-demands-a-price is the genre's spine.
- **Dark-tone failure modes are specific.** A curse that's just a debuff tempts no one; corruption works only if the power is genuinely good. The cost needs **stages** and a **tell** (Dungeon World), so the bearer *chooses* each step deeper — and the price should escalate toward the thing the item *wants*.
- **At this tier the exit matters as much as the entrance.** An artifact's *destruction* (how it leaves play) is part of the design — often a quest in itself.

### Decisions locked during brainstorming

| # | Decision | Choice |
|---|---------|---------|
| 1 | Axis | **System-agnostic / narrative**, sister to `rpg-npc-creator`. No PF2e mechanical layer, no AoN links. |
| 2 | Scope/tier | **Artifacts & relics only** — the top tier (unique, legendary, theme-bearing). Mundane and minor magic items are out of scope. |
| 3 | Spine | **The artifact is a narrative node** (Alexandrian). Cost/corruption is a dark-leaning *layer in service of* the hook, not the spine itself. |
| 4 | Integration | Receives handoffs, emits handoffs, enters the conductor + reviewer, updates README/help. |
| 5 | PF2e bridge | **Cut from core.** At most a single optional pointer line in `artifact-frameworks.md` ("if you play PF2e, map the gift to a relic/artifact"). Keeps it as clean as the NPC creator. |

### Naming

`rpg-artifact-creator`, following the kit's `rpg-<noun>-creator` convention.

---

## The spine — an artifact is a narrative node

This is the one test that separates a memorable artifact from "a +2 with a pretty name." Every dossier must answer, of the object:

1. **Where did it come from?** (provenance — and what price was paid to make it)
2. **What does it want now?** (its unfinished purpose; the pull on the bearer)
3. **Who wants it, and why?** (the node's edges into the rest of the campaign)
4. **What changes when it enters play?** (the plot it moves)

If the dossier doesn't answer those four, it has described an object, not designed a node. (Mirrors the faction skill's "if it reads like a static org chart, you haven't done the job.")

---

## The output skeleton

Three layers plus hooks and handoffs. Order matters — the node comes first; power and price grow from it.

**Core — the narrative node (do this first):**
1. **Provenance** — who forged it, why, and what was paid in its making (the sinister origin where dark-leaning earns its keep).
2. **The will / what it wants** — the unfulfilled purpose and the agenda it pulls the bearer toward.
3. **Desire-lines** — who hunts it *now* and why (the edges connecting it to factions/NPCs/places).
4. **What it unlocks** — what its entry *changes* in the story.

**Power + Price (the dark-leaning layer):**
5. **The gift** — what it does, rendered evocatively (never a "+X"); this is the bait.
6. **The price** — the cost/corruption, with **stages** and a sensory **tell**; the price escalates toward the will (the item slowly getting what it wants).

**Table layer:**
7. **Look & tell** — what it looks like; the sensory cue when it wakes or acts.
8. **Entrance** — read-aloud beat of how it reaches the PCs' hands.
9. **Exit / destruction** — how it leaves play (at this tier, possibly a quest).

**Collision + handoffs:**
10. **Hooks (4–6)** — claim it, resist its pull, destroy it, deliver it, be hunted for it. At tone 3+, ≥1–2 carry a moral cost; mark them.
11. **Off-stage notes** — structured handoffs (below).

**Read-aloud beats** woven at three points (per kit convention): the **entrance**, the artifact's **tell** when it stirs, and one **signature moment** of the price taking hold. Each a blockquote labelled **Read-aloud** / **Para ler à mesa**, ~40–70 words, sensory, never narrating what the PCs feel or do.

---

## Compact vs Completo (Full)

Both cover every section in the same order; they differ in depth and in how the **price** is rendered:

- **Compact (1–2 pp):** the price, desire-lines, and destruction are **narrative** prose (no clocks/tables).
- **Completo / Full (3–4 pp):** adds the explicit structure — a **corruption clock** (the stages as a 4–6 segment clock with per-stage tells), a **desire-lines table** ("who wants it → what they'd do to get it" for 3–5 actors), and an explicit **destruction quest**. Presented as optional GM tools.

---

## Files & references

Mirrors the `rpg-npc-creator` set (the other system-agnostic skill) — **no `canon-quickref`**.

```
skills/rpg-artifact-creator/
  SKILL.md
  references/
    co-creation.md          # duplicated — interview/elicitation front-end + read-aloud rules
    tone-spectrum.md        # duplicated — the 1–5 tone scale
    output-template.md      # the dossier skeleton (Compact + Full), section guidance
    artifact-frameworks.md  # the design toolkit (the engine of this skill)
```

`artifact-frameworks.md` carries: the **narrative-node model** (the 4 questions), the **"what does it want?" probe** (maker + original purpose + current unfulfilled goal → the pull), the **function/story/cost triad**, **corruption stages + tell** design, a short **tier note** (why artifacts/relics differ — the exit matters), the **anti-patterns** (the magic-Walmart, the +X treadmill, the item that's just a number, the artifact with no cost or no exit, the curse that's just a debuff, punishment without agency), and **one optional pointer line** mapping the gift to a PF2e relic/artifact for groups who want it.

Per kit convention, `co-creation.md`, `tone-spectrum.md`, and `output-template.md` are **duplicated per skill by design** — edit the copy here, not a shared one.

### SKILL.md shape (follows the faction/NPC pattern)

Frontmatter (`name` + a trigger-rich `description` covering "create/design/flesh out an artifact, relic, cursed item, McGuffin", PT-BR triggers like "criar um artefato / uma relíquia", and the "Ready for `rpg-artifact-creator`" handoff line; states default tone 3, system-agnostic) → *What this skill is for* → *The core idea (the node spine)* → *When to use / when not* (not for mundane gear, not for a person → npc-creator, not for the vault that holds it → location-creator) → *Co-create the brief* (read `co-creation.md`; capture seed + artifact kind + reach/significance + tone + density + any handoff) → *Read references as needed* → *Generate (node first, then power, then price)* → *Compact vs Full* → *Coherence* (every part serves the node or the price) → *What to avoid* (the anti-patterns) → *File output* (`artifact-<slug>.md`).

---

## Integration with the kit

**Receives handoffs.** Honors a pasted "Ready for `rpg-artifact-creator`" line and treats its facts as canon to deepen:
- from `rpg-faction-creator` — the relic/holy object a cult or order is built around;
- from a location-creator — the prize at the heart of a dungeon/lair;
- from `rpg-campaign-foundation` — the object that *is* (or embodies) the central truth / the McGuffin.

**Emits handoffs.** Ends with off-stage notes routing:
- → `rpg-npc-creator`: the forger, the guardian, the obsessed hunter;
- → `rpg-faction-creator`: the organization hunting or guarding it;
- → a location-creator: where it is kept / where it was made;
- → `rpg-clue-mapper`: the clues that lead the PCs to it;
- → Region/city/foundation context honored, and tone/deviation notes.

**Conductor.** `rpg-campaign-conductor` learns to sequence the artifact: record it in the `campaign-bible-<slug>.md` (name, will, price, current bearer/location), and propose it when the campaign needs the object its truth turns on. Edits: `SKILL.md` + `references/orchestration-playbook.md` + the bible template if a slot is needed.

**Reviewer.** `agents/rpg-campaign-reviewer.md` extends its audit to artifacts: renamed/relocated artifact, a will with no desire-lines, a gift with no price, a price with no tell or no stages, dangling handoffs.

**Docs.** Add the skill to the README table (and bump the "eight `rpg-*` skills" count to nine, including the help confirmation line) and to `/rpg-loremaster-help`.

---

## Coherence — the thing that matters most

An artifact coheres when **every part serves the node or the price.** Pass each element through one test: *does this connect the object to the campaign (provenance, will, desire-line, what-it-unlocks), or does it deepen the price the bearer pays?* A gift with no price is a stat block; a price the item never collects is set dressing; a will nobody in the world is acting on is an object, not a node.

**Two failure modes to call out explicitly:**
1. **The static treasure.** Power, history, appearance — but nobody wants it, it pulls at no one, and nothing changes when it appears. You described an object. Fix: lead with what it *wants* and who is *moving* for it.
2. **The curse that's just a debuff.** A penalty with no temptation and no agency. Fix: make the gift genuinely good, give the price stages and a tell, and tie the escalation to the will.

---

## What it is — and is not

**Is:** a system-agnostic deepener for a single legendary object as a narrative node — provenance, will, desire-lines, gift, price (staged + told), entrance, exit, hooks, handoffs.

**Is not:** a mundane/loot generator (out of scope by decision), a stat-block writer (no PF2e mechanics), a person (→ `rpg-npc-creator`), or the place that holds it (→ a location-creator). It names those and hands them off; it does not build them.

---

## Out of scope (YAGNI)

- Mundane and minor magic items, shop inventories, treasure hoards / reward packages.
- Any PF2e mechanical layer (item level, rarity, price in gp, runes, activation actions) beyond the single optional pointer line.
- A new reviewer *agent* — the existing reviewer is extended, not replaced.
- Editing the shared reference originals — copies are duplicated per skill by design.
