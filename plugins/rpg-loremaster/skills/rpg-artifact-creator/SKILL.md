---
name: rpg-artifact-creator
description: Creates deep, ready-to-play artifacts, relics, and cursed items for tabletop RPGs — a saint's reliquary, a corrupting crown, a god-killing blade, a McGuffin the whole campaign turns on. Unlike a region/city/faction sketch, this deepens ONE legendary object into a narrative node — where it came from, what it wants now, who is already hunting it, what its arrival unlocks, an evocative gift, and a staged price (corruption with a sensory tell) that escalates toward the object's will. System-agnostic (story, will, and cost, not item levels or runes), so it works for any system. Use whenever the user wants to create, design, build, flesh out, or detail an artifact, relic, cursed item, legendary weapon, or campaign McGuffin for tabletop play, or pastes a "Ready for rpg-artifact-creator" handoff from a campaign, faction, or location dossier. Also trigger on "criar um artefato", "preciso de uma relíquia", "fazer um item amaldiçoado", "design an artifact". Default tone dark-leaning (level 3 of 5).
---

# RPG Artifact Creator (system-agnostic, dark-leaning by default)

## What this skill is for

Generate an **artifact dossier** — a deep, playable profile of a single legendary object: a relic, a cursed item, a regalia of office, a god-killing blade, the McGuffin the campaign turns on. This is the skill you reach for when an object that was *named* in a campaign, faction, or location dossier needs to become a thing the PCs hunt, wield, fear, dread carrying, or have to unmake.

This skill is **system-agnostic** — it focuses on provenance, will, and cost, not item levels, rarity, or runes, so it works for any system. (When mechanics are needed, point at the system's own relic/artifact rules rather than writing them — see `references/artifact-frameworks.md` §8.)

The default tone is **dark-leaning (level 3 of 5)**: a gift good enough to keep, and a price steep enough to dread. See `references/tone-spectrum.md`.

## The core idea — an artifact is a narrative node, not a powerful object

This is the bedrock that makes this skill different from the rest of the kit. A **region** coheres around geography, a **city** around its central question, a **faction** around its drive, a **location** around premise + ecology, an **NPC** around contradiction. An **artifact** coheres as a **narrative node** — a thing with edges running out to people, places, and the campaign's central truth, designed by its *potential to move the plot* (the Alexandrian) rather than by the moment it's found.

So this skill's job is not to *describe a powerful object* — it is to build a node that answers four questions: **where did it come from, what does it want now, who is already reaching for it, and what changes when it enters play** (`references/artifact-frameworks.md` §1). On top of that node sits the dark-leaning layer — an evocative **gift** and a **staged price** that escalates toward what the object wants. If your dossier reads like a powerful thing nobody is moving for that changes nothing when it appears, you wrote treasure, not a node — start over from the will and the desire-lines.

## When to use this skill

Trigger when the user wants to create, deepen, or detail a single legendary object for play — "create an artifact", "design a relic", "make a cursed sword", "build the McGuffin", "flesh out the crown the cult is after", "criar um artefato", "preciso de uma relíquia" — or when they paste a "Ready for `rpg-artifact-creator`" line from a campaign, faction, or location dossier. Also trigger when the campaign's central truth obviously turns on an object the PCs will chase or carry.

Do **not** trigger for: mundane gear, shop inventory, or minor magic items the party simply buys (out of scope — this skill builds the top tier only); a person (use `rpg-npc-creator`); an organization (use `rpg-faction-creator`); or the vault/site that *holds* the artifact (use `rpg-location-creator`). An artifact is a *single legendary object*; if the user wants a stat block, point them at their system's rules. This skill **receives** named objects from faction/location/foundation handoffs, and **hands off** in turn to `rpg-npc-creator` (its maker/guardian/hunter), `rpg-faction-creator` (who hunts it), a location-creator (where it's kept), and `rpg-clue-mapper` (clues that lead to it).

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — draw the user's vision out, sharpen it, fill gaps; see `references/co-creation.md`. Capture the node (provenance + will) + object kind + tone + density, and any handoff.
2. **Build the node** — provenance, the will, desire-lines, what it unlocks. Lead the elicitation here; everything hangs off it.
3. **Set the gift and the price** — the evocative boon (the bait) and the staged, told cost that escalates toward the will.
4. **Make it playable** — its look and tell, how it enters play, how it can leave; hooks that grow from the node.
5. **Present and hand off** — save the file, offer the next move, leave off-stage notes for downstream skills.

Read references by context (Step 2). Don't load all of them.

## Step 1: Co-create the brief — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Its central job is to draw the user's own ideas out, sharpen them, and fill gaps. Interviewing across several rounds is good, *as long as it's elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end before generating.** In short:

- **Match the user's language** in the entire dossier, including translated headings.
- **Read the room and set the mode.** Rich seed + "build it" → reflect, fill gaps, generate. Sparse seed or "help me think" → draw the vision out. "Just generate it" → autonomous defaults, named aloud. State the escape hatch early: *"Say 'just run with it' anytime and I'll fill the rest."*
- **Run the loop per load-bearing decision:** Open (pull their image first — "where did this thing come from, and what did making it *cost*?") → Spark with 2–4 evocative options when they're stuck → Reflect it back sharper → Probe gaps and tensions → generate that section and check in.
- **Lead the elicitation with the node** — provenance and the will beneath it. That's the engine; spend the most collaboration there. Then the gift, the price, and the desire-lines.
- **Default the boring stuff** (the exact name, fine appearance detail, the precise exit rite). Ask about what's load-bearing for *their* vision. If you've asked twice without giving something back (a reflection, an option, a generated beat), you've slipped into interrogation — give before you ask again.

You still need these before generating, gathered through the loop: **the node** (provenance + will), **object kind** (weapon / regalia / reliquary / instrument / vessel — sets the shape; see `references/artifact-frameworks.md`), **tone** (default **3**; honor overrides, never silently pick another level), and **density** (**Compact** ~1–2 pp / **Completo / Full** 3–4 pp).

### Receiving a handoff
If the user pastes a handoff line (e.g., "→ Ready for `rpg-artifact-creator`: the Bell of the Drowned — the relic the cult is dredging for; from `faction-drowned-mercy`"), treat its facts as **canon to honor and deepen**. Pull the object's named role, its tie to the faction/place/truth, and the campaign's **central truth, tone, and established proper names**, and build the node *consistent with* them — the handoff's one-line purpose becomes the seed for the will. Note in off-stage anything you added or bent.

## Step 2: Read references as needed

Four reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end and the read-aloud rules. **Load before intake on every artifact.**
- **`references/artifact-frameworks.md`** — the design engine: the narrative-node model, the "what does it want?" probe, the function/story/cost triad, corruption stages + tell, the tier/exit note, failure modes, and the node/price coherence tests. **Load for every artifact** — it's the heart of this skill.
- **`references/output-template.md`** — the dossier skeleton (Compact and Full) plus the Full-only structures (corruption clock, desire-lines table, destruction quest). **Load when ready to write.**
- **`references/tone-spectrum.md`** — the 1–5 scale applied to an object. **Load if generating tone ≠ 3, or unsure how much shadow to add.**

## Step 3: Generate the dossier — node first, then gift, then price

Order matters. The node is the engine; the gift is the bait; the price grows from the will. Follow this order.

**Weave read-aloud at three beats** — the artifact's **entrance** (how it reaches the PCs' hands), its **tell** (the sensory cue when it stirs and the price climbs), and one **signature moment** (the price taking hold, the will getting its way). Mark each as a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**); keep each ~40–70 words, sensory, and **never narrate what the PCs feel or do**. Rules in `references/co-creation.md` Part B.

### 3a. The node (do this first — it's the engine)
- **Provenance** — who forged it, why, and (for dark-leaning) the price paid in the making. The origin is the root of the will and the cost.
- **The will** — maker + original purpose + current unfulfilled goal → the pull it exerts on the bearer (`references/artifact-frameworks.md` §2).
- **Desire-lines** — who is already reaching for it and why; each is an edge to a faction/NPC/place. Anchor at least one to the campaign's central truth.
- **What it unlocks** — what its arrival changes or breaks in the story.

### 3b. The gift (the bait)
What it does, rendered as fiction, **never a "+X"** — one strange, evocative effect. It must be **genuinely good**, or the price tempts no one (`references/artifact-frameworks.md` §3).

### 3c. The price (the dark-leaning core)
The cost/corruption in **3–5 stages**, each with a sensory **tell**, each triggered by using the gift or feeding the will, and **escalating toward the will** (the object getting its way). The bearer chooses each step deeper — that choice is the drama (`references/artifact-frameworks.md` §4). Avoid the curse-that's-just-a-debuff and punishment-without-agency.

### 3d. Look, entrance & exit (read-aloud)
- **Look & tell** — what it looks like at rest, and the cue when it wakes.
- **Entrance** — the dramatic beat of acquisition (read-aloud).
- **Exit / destruction** — how it can leave play, often a quest, and why it resists being unmade (`references/artifact-frameworks.md` §5).

### 3e. Hooks — how the PCs collide (4–6)
Each hook is a concrete way the PCs intersect the artifact: **claim it, resist its pull, destroy it, deliver it, or be hunted for it.** Anchor each to the will, a desire-line, the price, or the exit. At tone 3+, **at least 1–2 hooks carry a moral cost** (claiming it helps someone worse; unmaking it costs someone who needs it). Mark moral-cost hooks.

### 3f. Off-stage notes (handoffs)
End with a structured list grouping un-expanded elements by downstream skill. Be specific — name things:
- → `rpg-npc-creator`: the forger, the guardian, the obsessed hunter
- → `rpg-faction-creator`: the organization hunting or guarding it
- → a location-creator: where it is kept, or where it was made
- → `rpg-clue-mapper`: the clues that lead the PCs to it
- → Context honored: facts inherited from a handoff (truth/tone/names)
- → Tone / canon notes: deviations from base tone; secrets held back for reveal

## Step 4: Present and offer to deepen

Save the dossier as Markdown in the working folder, filename `artifact-<slug>.md`. Tell the user the path. For Full dossiers, summarize in chat and link — don't paste the whole thing. Offer the two most interesting next moves: "Want me to build [its maker] as a full NPC, or detail [the vault that holds it] as a location?"

## Compact vs Completo (Full)

Both cover every section in the same order; they differ in depth, and in how the **price** is rendered (see `references/output-template.md`):

- **Compact (~1–2 pages):** the price, desire-lines, and destruction are **narrative** prose. Provenance + will · desire-lines · what it unlocks · gift · staged price (narrated, with tells) · look & entrance · exit · 4 hooks · short off-stage.
- **Completo / Full (3–4 pages):** adds the explicit structure — a **corruption clock** (the stages as a 4–6 segment clock with per-stage tells), a **desire-lines table** ("who wants it → what they'd do" for 3–5 actors), and an explicit **destruction quest** — plus richer provenance and 6 hooks. Presented as optional GM tools.

## Coherence — the thing that matters most

An artifact coheres when **every element serves the node or the price.** Pass each element through two tests (`references/artifact-frameworks.md` §7):

- **The node test:** does this element connect the object to the campaign — its provenance, its will, a desire-line, or what it unlocks? An element that ties to nothing is decoration — cut it or connect it.
- **The price test:** does this element deepen what the bearer pays — a stage, a tell, a temptation, the will getting its way? A gift with no answering cost fails it.

Two failure modes to avoid:
1. **The static treasure.** Power, history, appearance — but nobody wants it and nothing changes when it appears. Fix: lead with what it *wants* and who is *moving* for it.
2. **The curse that's just a debuff.** A flat penalty with no temptation and no agency. Fix: make the gift genuinely good, give the price stages and a tell, and tie the escalation to the will.

## What to avoid

- **The magic Walmart.** Artifacts aren't shop stock — they're rare, story-granted, and connected to the campaign by their desire-lines.
- **The +X treadmill / the item that's just a number.** A flat bonus is mundane; if it's truly magical it should do something *strange*. Render the gift as fiction.
- **The artifact with no cost.** A world-shaking object with no price is a stat block in a crown.
- **The artifact with no exit.** At this tier, how it leaves play is part of the design.
- **Goals without a will.** "It's powerful" is not a node. Name what it *wants* and who is reaching for it.
- **Full stat blocks / item levels.** This skill is system-agnostic — point at the system's own relic/artifact rules if mechanics are needed.
- **Inflating tone past 3 without permission.** Dark-leaning, not grimdark.

## File output

Save the dossier as Markdown in the user's working folder, filename `artifact-<slug>.md`. Tell the user the path. For Full dossiers, summarize and link rather than pasting the whole thing.
