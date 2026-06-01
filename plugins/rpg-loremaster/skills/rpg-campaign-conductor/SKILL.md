---
name: rpg-campaign-conductor
description: Orchestrates the RPG master skillkit — the interactive "showrunner" that runs a whole campaign build across the kit's skills (rpg-campaign-foundation, rpg-region-creator, rpg-city-creator, rpg-faction-creator, rpg-location-creator, rpg-npc-creator, rpg-artifact-creator, rpg-clue-mapper) in the right order, passes handoffs between them, and keeps one campaign consistent — its central truth, tone, and proper names — via a running "campaign bible". Use whenever the user wants to build or continue a whole campaign end-to-end, asks "where do I start / what should I build next", wants the skills tied together, or wants to run the kit as a system instead of one skill at a time. Phrasings like "conduzir minha campanha", "rodar o kit", "montar a campanha do zero", "amarrar as skills", "orchestrate my campaign", "tie the skills together", "what next". It is interactive and co-creation-first — it defers each layer's interview to that layer's skill and maintains continuity between them. Default tone dark-leaning (level 3 of 5).
---

# RPG Campaign Conductor — the kit's showrunner

## What this skill is for

This is the **orchestrator** of the RPG master skillkit — the layer that ties the individual creator skills into one coherent campaign build. The creator skills each make *one thing* (a campaign spine, a region, a city, a faction, a location, an NPC, a clue map). This skill is the **conductor**: it decides what to build and when, runs each creator skill in the right order, carries the handoffs and the campaign's identity between them, and keeps the whole thing consistent — so the user experiences building a *campaign*, not operating seven separate tools.

It is **interactive and co-creation-first.** It does not replace the creator skills' interviews — it *sequences* them and holds the through-line. Think of it as the GM's planning partner who remembers everything and always knows the sensible next move.

## The core idea — the conductor is the memory between skills

Each creator skill is stateless: it makes its thing and ends. The risk in running them one by one is **drift** — the city forgets the campaign's central truth; the faction's tone slips; a location names a deity the foundation never chose. The conductor exists to prevent that. Its bedrock is **continuity**:

1. **A single campaign bible** (one Markdown file) is the persistent memory — the central truth, tone, established proper names, the layer-by-layer status, and the open handoffs. Every creator skill reads from it and writes back to it. This is what lets a *clean context* pick up a campaign without losing the thread.
2. **Handoffs are carried, not dropped.** When a creator skill ends with off-stage notes ("→ ready for rpg-city-creator: [the capital]"), the conductor records them in the bible and feeds the right one as input to the next skill.
3. **Identity is injected downward.** Every time the conductor invokes a creator skill, it passes the campaign's truth, tone, and relevant established names, so the new artifact coheres with everything before it.

If you ever generate a piece that contradicts the bible (wrong tone, a renamed NPC, a deity the campaign doesn't use), that's the one bug this skill exists to catch — reconcile against the bible before continuing.

## When to use this skill

Trigger when the user wants to operate the kit **as a system**: "let's build my campaign", "conduzir/montar minha campanha", "rodar o kit", "amarrar as skills", "where do I start?", "what should I build next?", "continue my campaign", or when they have several skills installed and want them tied together. Also trigger when a clean session needs to resume an existing campaign (point it at the campaign bible).

Do **not** trigger when the user clearly wants just *one* artifact and names it ("create a city", "make an NPC") — route them straight to that creator skill. The conductor is for the *whole build* or for "what next / tie it together", not for single-artifact requests.

## Required: the creator skills

The conductor invokes these (install them if missing): `rpg-campaign-foundation`, `rpg-region-creator`, `rpg-city-creator`, `rpg-faction-creator`, `rpg-location-creator`, `rpg-npc-creator`, `rpg-artifact-creator`, `rpg-clue-mapper`. It never duplicates their work — it calls them. The full sequencing logic, handoff protocol, and consistency rules are in **`references/orchestration-playbook.md`** — read it before conducting.

## The workflow at a glance

1. **Locate the user in the build** — new campaign, continuing one, or expanding a piece? Load or create the campaign bible.
2. **Establish or load the spine** — if there's no campaign foundation yet, run `rpg-campaign-foundation` first; otherwise load the bible's truth/tone/names.
3. **Propose the next move (JIT / spiral)** — recommend the smallest next thing the campaign actually needs, and why.
4. **Invoke the right creator skill** — feed it the upstream handoff + the campaign's identity; let *it* run its own co-creation interview.
5. **Integrate** — record the new artifact, its off-stage notes, and any new names into the bible; flag inconsistencies.
6. **Loop or hand off** — propose the next move, or stop and (optionally) spawn the reviewer subagent for a consistency pass.

## Step 1: Locate the user and load the bible

Open by finding out where they are (one quick question, not a form):
- **New campaign** → there's no bible yet. You'll create one after the foundation exists.
- **Continuing** → ask for (or locate) the **campaign bible** file. Read it fully — it is your memory. Everything you do must cohere with it.
- **Expanding one piece** → load the bible, then jump to the relevant creator skill with the right handoff.

The **campaign bible** is the heart of the conductor. Its template is in `references/campaign-bible-template.md`. It holds: the central truth, tone level, the cast/place/faction names established so far, the layer-by-layer status (what's built, what's pending), and the live handoff queue. **Update it after every creator-skill run.** Save it as `campaign-bible-<slug>.md` in the working folder.

## Step 2: Establish or load the spine

A campaign needs its spine before its world. If the bible has no central truth yet:
- Run **`rpg-campaign-foundation`** (it has its own co-creation interview). When it finishes, **populate the bible** from its output: the central truth, tone, antagonist, pillars, act turns, the PF2e stance, and — crucially — its planning roadmap and off-stage handoffs become the conductor's **work queue**.

If the spine already exists, load it from the bible and skip to Step 3.

**Never build world before spine.** A region or city with no campaign truth behind it is the drift this skill prevents.

## Step 3: Propose the next move (Just-in-Time / spiral)

This is the conductor's signature judgment. Following Sly Flourish's spiral principle (build out from the next point of play, not everything up front), **recommend the smallest next thing the campaign actually needs** — and say why. The default spiral after the foundation:

1. The **starting region** (where session one happens) → `rpg-region-creator`.
2. The **starting settlement** within it → `rpg-city-creator`.
3. The **antagonist and the visible agent** as NPCs → `rpg-npc-creator`.
4. The **antagonist's organization** if it drives the plot → `rpg-faction-creator`.
5. The **first key site** (where an early scene happens) → `rpg-location-creator`.
6. Once enough nodes exist, the **clue map** → `rpg-clue-mapper`.

But this is a *default*, not a script — read the bible's roadmap and the user's immediate need. If session one is a dungeon, build the location next. **Don't over-build**: propose one or two moves, generate, and re-evaluate. Always name the recommendation and let the user redirect.

## Step 4: Invoke the right creator skill (with handoff + identity)

When you invoke a creator skill, hand it everything it needs to cohere:
- **The upstream handoff** — the specific off-stage note that spawned this (e.g., the region's "→ ready for rpg-city-creator: Karsthaven, the smuggling port").
- **The campaign identity** — the central truth (or the part relevant to this piece), the tone level, and any established names/facts it must respect.
- Then **let the creator skill run its own co-creation interview.** The conductor does not interview on the skill's behalf — it provides context and continuity, and the skill drives its own elicitation. (You're the producer; the creator skill is the department head.)

See `references/orchestration-playbook.md` for the per-skill handoff details (what each skill consumes and emits).

## Step 5: Integrate into the bible

After each creator-skill run, **update the campaign bible**:
- Add the new artifact to the layer-status table (built ✓, file path).
- Record its **off-stage notes** into the handoff queue (these are future moves).
- Add any **new proper names** (NPCs, places, factions, deities used) to the names registry, so nothing gets renamed later.
- **Consistency check:** does the new piece honor the central truth, tone, and established names? If not, flag it and reconcile (regenerate or note a justified deviation) before moving on.

## Step 6: Loop, or hand off to review

Then either propose the next move (back to Step 3) or, at a natural checkpoint (a chunk of the campaign is built), offer a **consistency review**: spawn the **reviewer subagent** (`agents/rpg-campaign-reviewer.md`) — a non-interactive agent that reads the campaign folder and reports cross-artifact inconsistencies. Use the Agent tool, pointing it at the campaign folder + the bible. (The reviewer is fire-and-forget by design — it audits, it doesn't interview.) Relay its findings and offer to fix them.

Know when to **stop**: when the user has what the next session or two needs, say so. The kit is Just-in-Time — a complete campaign is built across many sessions of use, not in one sitting.

## Working in a clean context

This skill is designed so a **fresh session** (or the user's player, later) can run the kit without your accumulated conversation memory. The trick: **all state lives in the campaign bible**, not in the chat. On a cold start, the conductor reads the bible and is immediately oriented. Keep the bible current and self-sufficient — it is the externalized "understanding of the process plus the state of this campaign."

## What to avoid

- **Duplicating the creator skills.** The conductor calls them; it never re-implements a region or an NPC itself.
- **Interviewing on a skill's behalf.** Provide context and let each creator skill run its own co-creation.
- **Building world before spine.** Foundation first, always.
- **Over-building.** Propose the smallest next thing; spiral out from play.
- **Letting the bible go stale.** Update it after every run — it's the whole point.
- **Silent drift.** If a piece contradicts the bible (tone, names, truth), catch and reconcile it.

## File output

The conductor maintains `campaign-bible-<slug>.md` (the running memory) and lets each creator skill write its own artifact (`region-*.md`, `city-*.md`, etc.) into the campaign folder. Tell the user where the bible lives — it's the file they (or a clean session) reopen to resume.
