---
name: rpg-front-tracker
description: Maintains the living world of a Pathfinder 2e campaign between sessions using Dungeon World fronts and Blades-style progress clocks. Bootstraps a front from a faction's plan-in-motion (its grim portents and impending doom), tracks each danger as a progress clock, and advances those clocks based on what happened last session — producing the world's next move that the session-prep skill turns into a strong start. Reads the faction dossiers, the campaign bible, and the last session from the vault; persists fronts and clocks through the rpg-preserve write gate, never writing files directly. Use whenever the user wants to track a faction clock, advance the doom, ask what the villains did since last session, set up a front, or run grim portents. Phrasings like avancar o clock, o que o vilao fez, montar uma frente, rastrear a ameaca, advance the front, tick the clock. Tone inherited from the campaign, default dark-leaning.
---

# RPG Front Tracker (Pathfinder 2e kit — the living-world engine)

## What this skill is for

Keep the world **moving between sessions**. While the players rest, the antagonists advance their plans, clocks tick, and the world earns its next move. This skill bootstraps and advances **fronts** — the Dungeon World model for how a danger organizes itself into trackable, inevitable doom — and persists them as live vault state via **progress clocks**.

This is the **between-session engine** of the gamemaster kit. Loremaster's `rpg-faction-creator` *authors* a faction's plan as prose (the "plan in motion", grim portents, impending doom). This skill *operationalizes* that plan: it reads the authored fiction and turns it into `frente` and `relogio` vault entities that advance session to session, until the doom arrives or the players stop it.

The deliverable is a **front sheet** — the danger's impulse, its grim portents as clock segments, its impending doom, the stakes questions that make it *feel* like a campaign — and the "what the world did since last session" beat that `rpg-session-prep` consumes as its strong start.

## The core idea — tracking momentum, not authoring fiction

Every other skill in the gamemaster kit prepares or runs a session. This one models **time passing off-screen**.

The framework: a **front** is a bundle of one or more **dangers**, each with an *impulse* (what it wants, stated as a verb phrase), a list of *grim portents* (the steps toward disaster, three to five in sequence), and an *impending doom* (what happens if the players do nothing). The front becomes **a progress clock** — a segment wheel (4, 6, or 8 segments) that fills as the danger's portents occur. When the clock fills, the doom arrives.

This is the model that makes a campaign feel *alive*: clocks tick on their own timeline, not just when the PCs show up. The PCs can push back, stall, redirect — but the world presses forward unless they actively stop it.

**The bedrock of this skill:** the front is not a plot you run — it is a *threat you track*. Grim portents are not scripted events; they are *what happens if the players don't intervene*. See `references/fronts-and-clocks.md` for the full engine.

## When to use this skill

Trigger when the user wants to:
- Set up a front from a faction's existing plan ("montar uma frente", "set up a front")
- Advance a clock after a session ("avancar o clock", "tick the clock", "advance the front")
- Ask what the villains have been doing ("o que o vilao fez", "what did the antagonist do since last session")
- Track a danger's approach toward its doom ("rastrear a ameaca")
- Check where every active front stands before prepping a session

Do **not** trigger for:
- **Authoring a faction's plan** — that is `rpg-faction-creator` (loremaster). This skill *runs* an existing plan; it doesn't invent one. If a faction has no plan-in-motion yet, hand off to `rpg-faction-creator` first.
- **Building an NPC** the front needs — hand off to `rpg-npc-creator`.
- **Planning the upcoming session** — once the front has advanced and produced its "next move", hand off to `rpg-session-prep`, which turns that beat into a strong start and a full session plan.
- **Building a location** a portent involves — hand off to `rpg-location-creator`.

## Inputs — what to read from the vault

Read by exact canonical name. Every wikilink must match the vault's names registry or `rpg-preserve` will flag a broken link.

| Source | What you need | How to find it |
|---|---|---|
| `faccao` note | The faction's plan-in-motion, grim portents, impending doom, key members | Glob `faccoes/` → Read the relevant faction note |
| `campaign-bible-*.md` | The antagonist's arc, the campaign's tone + thematic pillars, the act structure | Glob `campaign-bible-*.md` at the vault root |
| Most recent `sessao` | What changed last session — quests resolved, events, what the PCs did and didn't do | Glob `sessoes/` → sort by date → Read the latest |
| Active `frente` note | The front's current state (impulse, doom, status) | Glob `frentes/` → Read by exact name |
| Active `relogio` notes | Each clock's segments, filled count, status | Glob `relogios/` → Read by exact name |

If the vault has no `frente`/`relogio` yet for this faction, this is a **bootstrap run** — you're creating the entities for the first time. If they exist, this is an **advance run** — you're reading current state and updating it.

## The workflow at a glance

1. **Co-create / confirm the front** — run the intake in `references/co-creation.md`; confirm which faction, whether to bootstrap or advance, and how aggressive the world should be.
2. **Bootstrap or load the front** — if bootstrapping, synthesize a `frente` entity from the faction's plan; size each clock at 4, 6, or 8 segments based on how daunting the danger is; emit the candidates for rpg-preserve. If advancing, Read the existing `frente` + `relogio` notes.
3. **Determine advancement** — based on what happened last session, decide which grim portents have occurred. Apply descriptive vs. prescriptive advancement (the world moved forward because the portents *fit what happened*, not because a rule demanded it). See `references/fronts-and-clocks.md`.
4. **Advance the clocks** — increment `filled` on each `relogio` whose portents fired. Re-emit the updated candidates to rpg-preserve (overwrite is intended — the write gate re-validates before writing).
5. **Emit the world's next move** — state which portent fires next, at what cost, what the impending doom looks like from here. This is the beat `rpg-session-prep` turns into a strong start.
6. **Persist** — route every `frente` and `relogio` candidate to the `rpg-preserve` skill. Never write directly. See `references/vault-entity-contract.md`.

Read references by context (Step 1, Step 2).

## Step 1: Co-create the front — interview, don't take an order

**This skill is a thinking partner, not a clock-ticking machine.** Run the elicitation front-end in `references/co-creation.md` before touching the vault.

- **Match the user's language** in the whole output, including headings. Keep PF2e canon names and AoN category-level URLs in English.
- **Tone is inherited** — pull it from the campaign (default dark-leaning level 3). You match the campaign's register; you do not re-set tone.
- The key intake distinction: *is this a bootstrap run (no `frente` exists yet) or an advance run (one does)?* If bootstrap, you also need the faction's full plan. If advance, you need the last session's outcome.
- Lead the elicitation on **which front** and **how aggressive to advance**. Default the rest. If you've asked twice without giving something back, you've slipped into interrogation — give before you ask again.

## Step 2: Read references as needed

Three reference files plus the entity contract (no tone-spectrum — tone is inherited from the campaign):

- **`references/co-creation.md`** — the interview front-end (eliciting which front, bootstrap vs. advance, aggression level) and the read-aloud rule. **Load before intake.**
- **`references/fronts-and-clocks.md`** — the engine: what a front is, clock sizing (4/6/8), descriptive vs. prescriptive advancement, campaign vs. adventure fronts, the "if they stall" push. **Load for every front.**
- **`references/output-template.md`** — the front-sheet skeleton (Compact / Full) including the clock table and the "world's next move" beat. **Load when ready to write.**
- **`references/vault-entity-contract.md`** — the entity shapes (`frente`, `relogio`) and the persistence rules. **Load before emitting candidates.**

## Step 3: Build and advance the front

**Read-aloud is light here** — this skill is almost entirely GM-facing. The one natural table beat is an optional **"the world shifts"** line for when a doom stage arrives or a major portent fires: a single evocative sentence the GM can read when something significant changes in the world. Mark it **Read-aloud** (PT-BR: **Para ler à mesa**), ~20–40 words, sensory, no PC actions narrated. Not every clock tick — only when the fiction meaningfully shifts.

### 3a. Bootstrap the front (first-time setup)

Read the faction's `faccao` note and the campaign bible. From them, synthesize:
- **Name** — the front's name (usually the danger's name or its shape: "The Syndicate's Long Harvest", "The Second Siege of Duskwall")
- **Impulse** — what the danger *wants*, as a verb phrase ("to replace the city's council with its own agents before the solstice")
- **Dangers** — the distinct threats within this front (a major faction may have 2–3 sub-dangers, each with its own clock)
- **Grim portents** — the 3–5 ordered steps toward doom; each becomes a clock segment-tick label
- **Impending doom** — what happens if all portents fire and the players never stop it
- **Stakes questions** — 1–3 open questions the front raises for the campaign ("Will the Harbormaster realize he's been compromised before the shipment lands?")
- **Clock sizing** — 4 for a contained danger; 6 for a campaign-level threat; 8 for an existential arc

Make the clock about the **obstacle, not the method** — "The City Guard Is Compromised" not "The Syndicate Bribes the Guard." The players should be able to disrupt it sideways.

### 3b. Advance the front (between sessions)

Read the most recent `sessao` note. Ask:
- Which grim portents *fit* what happened? (descriptive: the world moves because the portents match reality)
- Which portents did the players *prevent* by their actions?
- Did any danger stall (e.g., the players disrupted a key step)?

Increment `filled` by the number of portents that fired. If a clock fills, the impending doom arrives — narrate its consequences and set the front's status to `resolved` (the doom came) or keep it `active` if the players are fighting back.

### 3c. The world's next move

State the portent that fires next. Frame it diegetically: not "the clock advances" but "the Syndicate moves its first shipment before dawn, undetected." Give the GM a concrete image of what the world is doing right now. This is the beat `rpg-session-prep` converts into a strong start.

### 3d. Off-stage handoffs

Every front surfaces nodes that may not exist yet. End with a structured handoff list:

- → `rpg-session-prep`: hand the "world's next move" beat as input to the strong start
- → `rpg-faction-creator` (loremaster): if the front's plan-in-motion needs to be authored or deepened first
- → `rpg-npc-creator` (loremaster): for the antagonist or key members named in the front
- → `rpg-location-creator` (loremaster): for locations named in the grim portents that don't exist yet
- → `rpg-clue-mapper` (loremaster): if a portent should be discoverable by the players (a portent can be a revelation the clue map should expose)

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core → adapter. That coupling is the anti-pattern this kit is designed to prevent.

To persist:
1. Assemble a `frente` or `relogio` candidate (a set of typed fields) from what you've built
2. Route it to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate
3. For advancing a clock: re-emit the same-named `relogio` with `filled` incremented — preserve overwrites the existing note and re-validates; this is the intended update path

The entity shapes (required fields, allowed values, relation targets) are documented in `references/vault-entity-contract.md`. Consult it before emitting any candidate.

## Compact vs. Full

- **Compact:** front name + impulse + impending doom + the clock table (segments, filled, next portent) + "what the world did since last session" beat + the Persist block listing candidates for rpg-preserve.
- **Full:** adds the complete grim portents with segment labels, stakes questions, the cast (keyed to vault names), the full advance log (which portents fired this session and why), a discovery read-aloud for major doom arrivals, and handoff notes for missing nodes.

See `references/output-template.md`.

## Coherence — the thing that matters most

A front coheres when the **impulse is a genuine threat** that advances without player intervention, the **grim portents are causally ordered** (each one makes the next more likely), and the **impending doom is specific** (not "bad things happen" — a named consequence tied to the campaign's thematic core).

Two failure modes to avoid:

1. **The clock that never ticks.** If portents only fire when the players trigger them, it's a plot, not a front. The world must move independently.
2. **The doom that doesn't matter.** If the impending doom has no consequence the players care about, the clock has no tension. Tie the doom to something in the campaign bible — a named NPC, a faction's survival, an act gate.

## What to avoid

- **Writing files directly.** Always route through `rpg-preserve`. No exceptions.
- **Inventing a faction's plan.** If no plan exists, hand off to `rpg-faction-creator` first.
- **Re-setting tone.** Tone is inherited; clock flavor follows the campaign's register.
- **Prescriptive-only advancement.** Don't tick clocks on a mechanical schedule — read the fiction and let portents fire when they fit.
- **Private campaign content in examples.** See `references/fronts-and-clocks.md` for generic illustrative examples only.
