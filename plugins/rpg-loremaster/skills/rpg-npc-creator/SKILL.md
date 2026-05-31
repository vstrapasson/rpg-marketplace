---
name: rpg-npc-creator
description: Creates deep, memorable, system-agnostic NPCs for tabletop RPGs — villains, quest-givers, patrons, merchants, rivals, allies, mentors, contacts, BBEGs, faction leaders. Unlike a region/city/faction sketch, this deepens ONE character into a *person*: a core belief and an active wound, a genuine contradiction (surface vs. beneath), a want pulling against an unadmitted need, a performable voice, and hooks that grow from who they are — personality and narrative depth, not stat blocks, so it works for any system. Use whenever the user wants to create, build, flesh out, or detail an NPC, character, villain, merchant, rival, ally, or mentor for tabletop play, or pastes a "Ready for rpg-npc-creator" handoff from a campaign/region/city/faction/location dossier. Also trigger on "criar um NPC", "preciso de um vilão", "criar um personagem", "build a villain". Default tone dark-leaning (level 3 of 5).
---

# RPG NPC Creator (system-agnostic, dark-leaning by default)

## What this skill is for

Generate a **character sheet** — a deep, playable profile of a single person: a villain, a quest-giver, a patron, a merchant, a rival, a mentor, a contact, a faction leader. This is the skill you reach for when a character who was *named* in a campaign, region, city, faction, or location dossier needs to become someone the PCs can talk to, trust, fear, or be betrayed by.

This skill is **system-agnostic** — it focuses on personality, backstory, and narrative depth, not stat blocks or mechanics, so it works for any system. (When mechanics are needed, point at a reusable stat block — e.g. a PF2e NPC block — rather than writing one.)

The default tone is **dark-leaning (level 3 of 5)**: a person sincere enough to root for and rotted enough to distrust. See `references/tone-spectrum.md`.

## The core idea — an NPC is a person, not a role

This is the bedrock that makes this skill different from the rest of the kit. A **region** coheres around geography, a **city** around its central question, a **faction** around its drive, a **location** around premise + ecology. An **NPC** coheres around **specificity and contradiction** — a *core belief and the wound that created it*, and the gap between how they present and who they really are.

Real people contain tensions; generic NPCs fail because they're *coherent* in a way real people never are (the kind person with a cruel streak, the coward who once did something brave, the villain who genuinely loves their family). So this skill's job is not to *describe a function* (the gruff guard, the wise mentor) — it is to build a **person** whose behavior traces back to what they believe and what it cost them. If your NPC reads like an archetype with a coat of paint, you've written a role, not a person — start over from the belief and the wound (`references/npc-frameworks.md` §1).

## When to use this skill

Trigger when the user wants to create, deepen, or detail a single character for play — "create an NPC", "build a villain", "make an interesting shopkeeper", "flesh out the harbormaster", "criar um NPC", "preciso de um vilão" — or when they paste a "Ready for `rpg-npc-creator`" line from a campaign, region, city, faction, or location dossier. Also trigger when a scene obviously needs a person the PCs will deal with.

Do **not** trigger for: a whole region/nation (use `rpg-region-creator`), a settlement (use `rpg-city-creator`), an organization (use `rpg-faction-creator`), a bounded site/dungeon (use `rpg-location-creator`), or the campaign spine (use `rpg-campaign-foundation`). An NPC is a *single person*; if the user wants a place, a town, a group, or a campaign, point them to the right tool. This skill is the kit's **NPC receiver** — every other skill hands its named characters *to* it — and it hands off in turn to `rpg-faction-creator` (an org behind the person), a location-creator (their lair/sanctum), and `rpg-clue-mapper` (what they know).

## The workflow at a glance

1. **Co-create the brief** (interview, not a form) — draw the user's vision out, sharpen it, fill gaps; see `references/co-creation.md`. Capture core (belief + wound) + role + tone, and any handoff. *(In a hurry / mid-session? Use Quick mode below.)*
2. **Build the core** — the belief and the active wound. Lead the elicitation here; everything hangs off it.
3. **Add the contradiction and the want-vs-need** — the surface/beneath gap; the conscious goal pulling against the unadmitted need.
4. **Make them playable** — a performable voice/mannerism, one telling appearance detail, how they react to the PCs; relationships that predate the party; hooks that grow from who they are.
5. **Present and hand off** — save the file, offer the next move, leave off-stage notes for downstream skills.

Read references by context (Step 2). Don't load all of them.

## Step 1: Co-create the character — interview, don't take an order

**This skill is a creative partner, not a vending machine.** Its central job is to draw the user's own ideas out, sharpen them, and fill gaps. Interviewing across several rounds is good, *as long as it's elicitation, not interrogation.* The full method is in **`references/co-creation.md` — read it and run it as the front-end before generating.** In short:

- **Match the user's language** in the entire sheet, including translated headings. Keep any PF2e canon proper names (deities, ancestries, places) and AoN URLs in English if they appear — they're anchors to the Archives of Nethys, which is English-only.
- **Read the room and set the mode.** Rich seed + "build it" → reflect, fill gaps, generate. Sparse seed or "help me think" → draw the vision out. "Just generate it" → autonomous defaults, named aloud. State the escape hatch early: *"Say 'just run with it' anytime and I'll fill the rest."*
- **Run the loop per load-bearing decision:** Open (pull their image first — "what does this person *believe*, and what happened to make them believe it?") → Spark with 2–4 evocative options when they're stuck → Reflect it back sharper → Probe gaps and tensions → generate that section and check in.
- **Lead the elicitation with the core** — the belief and the wound beneath it. That's the engine; spend the most collaboration there. Then the contradiction, the want/need, and the voice.
- **Default the boring stuff** (the exact name, fine appearance detail, the precise reusable stat block). Ask about what's load-bearing for *their* vision. If you've asked twice without giving something back (a reflection, an option, a generated beat), you've slipped into interrogation — give before you ask again.

You still need these before generating, gathered through the loop: **the core** (belief + wound), **role** (quest-giver / villain / merchant / rival / mentor / patron / contact — sets the minimum; see `references/npc-frameworks.md` §3), **the contradiction**, and **tone** (default **3**; honor overrides, never silently pick another level).

### Quick mode (mid-session improv)
When urgency cues fire — "quick", "fast", "on the fly", "right now", "just need a", or an improv scenario ("the players just walked into…") — **skip the interview and the file.** Reply directly in chat, ~10–15 lines, using the conversational format in `references/output-template.md` (Quick). One sharp detail beats ten paragraphs. Offer to write it up fully later. (This differs from the escape hatch *"just run with it"*, which skips only the **interview** — you still write the requested Compact/Full **file**; Quick mode skips the file too.)

### Receiving a handoff
If the user pastes a handoff line (e.g., "→ Ready for `rpg-npc-creator`: Mother Cholva — the cult's leader; mercy-that-kills; from `faction-drowned-mercy`"), treat its facts as **canon to honor and deepen**. Pull the character's role, faction/place ties, what they want, and the campaign's **central truth, tone, and established proper names**, and build the person *consistent with* them — the handoff's one-line want becomes the seed for the core. Note in off-stage anything you added or bent.

## Step 2: Read references as needed

Four reference files. Load by context:

- **`references/co-creation.md`** — the interview/elicitation front-end and the read-aloud rules. **Load before intake on every substantial NPC.**
- **`references/npc-frameworks.md`** — the design engine: the inside-out build (belief → wound → want/need → contradiction), making-them-playable, role-specific patterns, the archetype table, failure modes, and the logic/sympathizer tests. **Load for every NPC** — it's the heart of this skill.
- **`references/output-template.md`** — the sheet skeleton (Compact and Full) plus the Quick conversational format. **Load when ready to write.**
- **`references/tone-spectrum.md`** — the 1–5 scale applied to a character. **Load if generating tone ≠ 3, or unsure how much shadow to add.**

## Step 3: Generate the character — inside-out, belief & wound first

Order matters. The core is the engine; the contradiction and motives grow from it; the playable layer renders it. Follow this order.

**Weave read-aloud at two beats** — the character's **first appearance** (how the GM introduces them) and a **voice line** (one quoted line in their voice); optionally a **signature moment**. Mark each as a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**); keep each ~40–70 words, sensory, and **never narrate what the PCs feel or do**. Rules in `references/co-creation.md` Part B.

### 3a. Core belief & wound (do this first — it's the engine)
- **Core belief** — what they believe about the world that drives them; understandable, but possibly wrong.
- **Wound** — the specific, formative experience that created the belief, and which **still shapes how they act now** (not just their résumé).

### 3b. The contradiction (surface vs. beneath)
The gap between how they present and who they really are, or two parts in genuine tension. This gap is what makes players lean in — keep it *discoverable*, not stated up front.

### 3c. Want, need, and fear
- **Want** — the conscious goal they're working toward.
- **Need** — the thing they actually need but won't admit; the tension with the want is the drama.
- **Fear** — what they protect against, often the raw edge of the wound.

### 3d. First impression, appearance & voice (read-aloud)
- **Voice / mannerism** — performable in 2 seconds (a speech pattern, a verbal tic, a physical habit). The most valuable line for the GM.
- **Appearance** — one or two specific details that tell a story, not a full description.
- **How they react to the PCs** — default attitude, and what shifts it.

### 3e. Relationships & connections
2–4 ties to other people/factions — each a potential story, anchoring the character to the world so they feel like they existed before the PCs arrived. Leave one gap or mystery unexplained.

### 3f. Hooks — how the PCs collide
2–4 ways the character pulls the PCs into narrative, emerging from who they are (not bolted on). At tone 3+, **at least 1–2 hooks carry a moral cost** — helping them harms someone, or opposing them harms someone sympathetic. Mark moral-cost hooks.

### 3g. Off-stage notes (handoffs)
End with a structured list grouping un-expanded elements by downstream skill. Be specific — name things:
- → `rpg-faction-creator`: the organization this person leads or serves
- → a location-creator: a site tied to them (workshop, lair, sanctum)
- → `rpg-clue-mapper`: what they *know* that's worth wiring as a clue
- → `rpg-city-creator` / `rpg-region-creator`: if they imply a settlement or spread
- → Context honored: facts inherited from a handoff (truth/tone/names)
- → Tone / canon notes: deviations from base tone; secrets held back for reveal

## Step 4: Present and offer to deepen

Save the sheet as Markdown in the working folder, filename `npc-<slug>.md`. Tell the user the path. For Full sheets, summarize in chat and link — don't paste the whole thing. Offer the two most interesting next moves: "Want me to build [the order they lead] as a faction, or detail [their sanctum] as a location?"

## Compact vs Completo (Full)

Both cover every section in the same order; they differ in depth (see `references/output-template.md`):

- **Compact (~1 page):** lean prose. First impression + voice · surface/beneath/core belief · 2–3 backstory beats · want/need/fear · 2–3 relationships · 2–4 hooks · short off-stage.
- **Completo / Full (~2–3 pages):** the fuller sheet — deeper backstory, more relationships, GM Notes (how to roleplay them, reaction triggers, secrets to reveal over time), and richer hooks.

A third mode — **Quick (conversational)** — is the mid-session improv format (Step 1): not a file, ~10–15 lines of chat.

## Coherence — what makes this person real

An NPC coheres when **every trait serves the core or the contradiction.** Pass each element through two tests (`references/npc-frameworks.md` §6):

- **The logic test:** could someone explain *why* this person acts as they do, even if they disagree? "Greedy" fails; "overcharges because the guild holds her daughter against a debt" passes. A trait that doesn't trace to the belief or the wound is decoration — cut it or connect it.
- **The sympathizer test:** state the case *for* this person as they would — even a villain. If the only case is "they're evil/nice," they're cardboard.

Two failure modes to avoid:
1. **The role with a coat of paint.** A function (the gruff guard, the wise mentor) with no belief, no wound, no gap. Fix: lead with what they believe and what it cost them.
2. **The cardboard villain (or saint).** Pure evil or pure good. Fix: give the villain an understandable motive and something likable; give the saint a selfish streak or a blind spot.

## What to avoid

- **The "sad backstory = depth" trap.** Tragedy alone isn't character — connect every wound to a *present* behavior (a coping mechanism, a blind spot, a defense).
- **Binary morality.** Even the cruelest villain needs a motive the players can follow; even the kindest ally needs a flaw.
- **Explaining everything.** Leave gaps — a scar they won't discuss, a name they react to. Mystery invites engagement.
- **Tropes without subversion.** Start from an archetype, then break it with one thing (`references/npc-frameworks.md` §4).
- **Full stat blocks.** This skill is system-agnostic — sketch personality and point at a reusable stat block (e.g. a PF2e NPC block) if mechanics are needed.
- **Inflating tone past 3 without permission.** Dark-leaning, not grimdark.

## File output

Save the sheet as Markdown in the user's working folder, filename `npc-<slug>.md`. Tell the user the path. For Full sheets, summarize and link rather than pasting the whole thing.
