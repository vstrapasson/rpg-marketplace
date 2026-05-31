---
name: rpg-session-prep
description: Turns a built Pathfinder 2e campaign into a one-page runnable session using the Return of the Lazy Dungeon Master eight steps, weighted on secrets and clues as the spine. Builds a strong start from what the world did since last session (the active fronts and clocks), outlines three to five likely scenes, pulls the secrets and clues to potentially reveal this session from the clue map (carrying forward the ones still unrevealed), names the NPCs and threats in play from existing vault entities, and sets the rewards. Prep the situation, not a script — it is a launchpad you abandon when the table diverges. Reads the campaign bible, clue map, vault entities, and active fronts; persists the planned session through the rpg-preserve write gate. Use for preparing a session, planning the next game, what should happen next session, montar a sessao, preparar o jogo, qual o gancho. Tone inherited from the campaign, default dark-leaning.
---

# RPG Session Prep (Pathfinder 2e kit — the session launchpad)

## What this skill is for

Build a **one-page runnable session plan** — the minimal structure that gets you to the table ready to improvise. This skill *arranges what already exists* (the built world, the clue map, the living fronts) into a concrete starting position and a handful of high-impact elements. It does not invent world content.

This is the **session layer** of the gamemaster kit. The loremaster plugin *builds* the world; `rpg-front-tracker` *advances* it between sessions; this skill *reads both* and produces the launchpad the GM sits down with. The deliverable is a one-pager: a strong start derived from what the world did since last session, three to five likely scenes, the secrets and clues live this session (keyed to the clue map's revelation IDs), the NPCs and threats in play by vault name, rewards, and backstops for when the table stalls.

## The core idea — prep situations, not plots

Two principles drive every decision here:

**1. Prep situations, not plots.** A situation is an unstable configuration of forces that the players will immediately make more interesting. A plot is a sequence of events the GM has pre-resolved. The plan on the page is not a script — it is a *launchpad you abandon the moment the table diverges*. The goal is to have the five most useful things ready, then trust the preparation.

**2. Secrets and clues is the spine.** Of the eight Lazy DM steps, Mike Shea's own pick for "the single step to keep if you keep only one" is Secrets and Clues — not the strong start, not the scenes. Every other element on the page serves as delivery infrastructure for the secrets the players might discover this session. The **clue map** (`clue-map-*.md`) is the source of truth for what gets revealed; this skill reads the revelation IDs (R1, R2…) and *carries forward* the ones that went unrevealed last session rather than starting fresh each time.

The modular eight-step framework and the "prepare to improvise" philosophy are in `references/lazy-dm-eight-steps.md`.

## When to use this skill

Trigger when the user wants to:
- Prepare an upcoming session ("preparar o jogo", "montar a sessão", "what should happen next session")
- Build the one-pager from what exists in the vault and the clue map
- Ask what the strong start should be after advancing the fronts
- Plan which secrets might be revealed this session ("qual o gancho", "quais as revelações desta sessão")
- Produce the GM artifact that `rpg-gm-run-sheet` will later overlay for live play

Do **not** trigger for:
- **Building world content** — regions, cities, NPCs, factions. If a node is missing, hand off to the relevant loremaster skill and come back.
- **Advancing the fronts** — that is `rpg-front-tracker`. Run front-tracker first, then bring its "what the world did since last session" beat here as the strong-start seed.
- **Balancing an encounter** — that is `rpg-encounter-builder`. Name the threat in the scene; build the math separately.
- **The live run overlay** — that is `rpg-gm-run-sheet`, which takes this one-pager and adds the checklist-at-the-table layer.

## Inputs — what to read from the vault

Read by exact canonical name. Every wikilink must match the vault's names registry or `rpg-preserve` will flag a broken link when the `sessao` candidate is written.

| Source | What you need | How to find it |
|---|---|---|
| `campaign-bible-*.md` | Tone, thematic pillars, antagonist arc, act structure, canon names | Glob `campaign-bible-*.md` at the vault root |
| `clue-map-*.md` | Revelation IDs (R1/R2…), which are unrevealed, which are live | Glob `clue-map-*.md` at the vault root |
| Most recent `sessao` | What happened last session — quests resolved, events, what was revealed | Glob `sessoes/` → sort by date → Read the latest |
| Active `frente` notes | The world's next move — which portent fires next, the strong-start seed | Glob `frentes/` → Read by exact name |
| Active `relogio` notes | Each clock's filled/segments — how close to doom | Glob `relogios/` → Read by exact name |
| `npc` notes | NPCs in play this session by exact vault name | Glob `npcs/` → Read by exact name |
| `local` notes | Locations for scenes by exact vault name | Glob `locais/` → Read by exact name |
| `quest` notes | Active quests by exact vault name | Glob `quests/` → Read by exact name |
| `ato` notes | The current act — which act gate this session might cross | Glob `atos/` → Read by exact name |

## The eight steps, weighted

Full framework details are in `references/lazy-dm-eight-steps.md` (which keeps the canonical Lazy DM numbering). The order here is **modular, not fixed** — secrets lead as the spine, and `references/output-template.md` groups related steps rather than numbering all eight. The session one-pager runs them in this weighted order:

1. **Review the characters** — a 30-second check: what do the PCs want right now, what level/resources do they have, any unresolved personal thread? This shapes everything else.
2. **Strong start** — the opening image that drops the players immediately into action. **Derived from the world-state**: what did the active fronts/clocks produce since last session? Read `rpg-front-tracker`'s "what the world did since last session" beat and turn it into a concrete scene.
3. **Secrets and clues** (the spine) — pull the unrevealed revelations from the clue map. Select three to five that are *reachable* this session. Key them to the clue map's R-IDs. These are not scripted reveals — they are *placed* in the scenes so the players can discover them.
4. **Potential scenes** — three to five situations that might arise, not a sequence. Each is a situation with a clear point of entry for the players. Not "then they fight X" — "if they investigate the harbormaster, or if the Syndicate's agent finds them first."
5. **Fantastic locations** — one or two distinct places with a sensory hook. Enough to improvise around.
6. **Important NPCs** — name the three most important NPCs in play. Each gets one line: vault name, what they want right now, one voice line or mannerism. No more.
7. **Relevant monsters / threats** — name the threats, not a full statblock. A level range and a role. Flag anything that needs `rpg-encounter-builder`.
8. **Rewards** — what the players might gain: XP milestone, named item (vault name), a quest resolution, a revelation. Tie the clue-map revelation to the reward where possible — *finding out* is a reward.

## Read-aloud — the strong start

The strong start deserves a **read-aloud** block: a short sensory scene the GM reads or paraphrases to open the session. Rules from the kit's shared DNA:

- **~40–70 words.** Long enough to land the image; short enough to hold attention.
- **Sensory and concrete.** What the players perceive *right now* — the smell, the sound, the one wrong detail.
- **Never narrate the PCs.** Don't state what the characters feel, decide, or are about to do. That belongs to the players.
- **End open.** Trail off on something the players will immediately want to act on.
- **Mark it clearly:** a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**).
- **Match the user's language** in all output. Keep PF2e canon names and AoN category-level URLs in English.

Write one read-aloud block for the strong start. For the Compact one-pager, that is the only one. For Full, add a short discovery-moment read-aloud for the most evocative secret reveal of the session.

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core to adapter. That coupling is the anti-pattern this kit is designed to prevent.

To persist the session plan:

1. Assemble a `sessao` candidate (required fields: `type`, `date`; the one-pager lives as the note body after the frontmatter)
2. Route it to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate
3. The `date` field is the **planned session date** (YYYY-MM-DD); update after the session runs if needed

**If a node referenced in the plan does not exist in the vault** (an NPC, a location, a quest), do not invent it. Stop and emit a loremaster handoff:
- → `rpg-npc-creator` (loremaster): named NPC needed for a scene
- → `rpg-location-creator` (loremaster): location for a scene
- → `rpg-faction-creator` (loremaster): faction plan needed for a front
- → `rpg-front-tracker` (gamemaster): fronts not yet bootstrapped or advanced

Then resume session prep once the node exists.

The entity shapes (required fields, allowed values, relation targets) are in `references/vault-entity-contract.md`. Consult it before emitting the `sessao` candidate.

## Compact (one-pager) vs. Full (expanded)

- **Compact:** the one-pager — strong start (with read-aloud) · 3–5 scenes · secrets & clues checklist (R-IDs) · NPCs in play (name + want) · threats flagged · rewards · "if they stall" backstops · Persist block with the `sessao` candidate. Fits one printed page; the GM's table artifact.
- **Full:** adds the complete eight-step output — character review notes, full NPC write-ups (name/want/voice line/stat flag), location descriptions with sensory hooks, the secrets & clues reasoning (which R-IDs are unrevealed and why they're reachable this session), the advance-log cross-reference (which fronts drove the strong start), discovery read-aloud for the keystone secret, and handoff notes for any missing nodes.

See `references/output-template.md` for the skeleton.

## Coherence — the thing that matters most

A session plan coheres when:

1. **The strong start is derived from the world-state**, not invented fresh. If `rpg-front-tracker` has not run recently, the strong start is guesswork. Run front-tracker first.
2. **The secrets are reachable**, not just listed. Each secret in the checklist needs a plausible delivery path this session — a scene, an NPC, a location that is in play.
3. **Every wikilink is exact.** A mismatched name is a broken link when preserve validates the `sessao` candidate. Use canonical vault names throughout.
4. **Unrevealed secrets carry forward.** Never drop a secret from the checklist just because it wasn't revealed last session. The clue map is a running ledger, not a reset.

Two failure modes:

1. **The scripted session.** Scenes that can only happen in one order, where missing a beat breaks everything. Fix: scenes are situations, not events — the players can enter any of them from any direction.
2. **The empty one-pager.** Generic scenes, invented NPCs, no clue-map tie. The one-pager must read from the vault — it is an *arrangement* of existing content, not a fresh generation.

## What to avoid

- **Inventing world content.** If a node is missing, hand off. Do not populate scenes with NPCs or locations that don't exist in the vault.
- **A plot instead of a situation.** If your scenes form a single chain with a preordained outcome, you've built a railroad. Break it into independent situations.
- **Writing files directly.** Always route through `rpg-preserve`. No exceptions.
- **Re-setting tone.** Tone is inherited from the campaign (default dark-leaning level 3). The session prep follows the campaign's register; it does not introduce new tone.
- **Dropping unrevealed secrets.** The carry-forward is the skill's contract with the clue map — don't start fresh each session.
- **Private campaign content in examples.** Examples in reference files use generic or clearly-public media only. See `references/lazy-dm-eight-steps.md`.
