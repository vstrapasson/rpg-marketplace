---
name: rpg-embate-builder
description: Builds Pathfinder 2e non-combat challenges from the GM Core math — social influence, chases, research, infiltration, and any skill-driven test the combat layer skips. Scalable: it handles a single dramatic check (DC + degrees of success + fail-forward consequences) and a full structured Victory Points challenge alike. Ships the four official PF2e subsystem presets — Influence, Chase, Research, Infiltration — plus a generic VP model, sizing the VP target and thresholds against the official scale (quick 3–5, long 7–10, most-of-a-session 15–25, adventure 25–50). Anchors every DC to Level-Based and Simple DCs from Archives of Nethys category pages, shows the VP arithmetic, and wraps each challenge as a situation — a world-state to change, not a puzzle to solve — with fail-forward consequences so no roll is a dead end. Persists the challenge through the rpg-preserve write gate as a desafio entity. Use for building a non-combat challenge, a social encounter, a chase, an infiltration, a research montage, montar um desafio, desafio social, perseguição, infiltração, pesquisa, prova de perícia, prova de acrobacia/intuição/intimidação, when a scene needs skill checks and not a fight. Tone inherited from the campaign, default dark-leaning.
---

# RPG Embate Builder (Pathfinder 2e kit — the non-combat mechanical layer)

## What this skill is for

Turn a non-combat confrontation into **structured PF2e numbers, wrapped as a situation**. This is the mechanical layer the loremaster skills deliberately skip and the sibling of `rpg-encounter-builder` — where that skill converts a threat into a creature roster with an XP budget, this one converts a social, exploration, or skill-driven scene into a **Victory Points challenge** (or a single dramatic check) with the DC math shown.

The challenge can be anything the dice resolve without a sword: swaying a council, losing a pursuer, researching a forbidden truth, breaching a keep unseen, a single white-knuckle Acrobatics test across a rotting bridge. The mechanical spine is the official **Victory Points subsystem** from `references/pf2e-vp-math.md`. DCs are referenced to **Archives of Nethys category pages** only (e.g., https://2e.aonprd.com/Rules.aspx) — never a `?ID=` deep link.

## Scalable — single check vs. VP challenge

This is the load-bearing decision, made first:

- **A single dramatic check** — one moment, one (or a few) rolls: a Diplomacy plea, an Intimidation stare-down, an Acrobatics leap. You set the DC (Level-Based or Simple, with an adjustment), name the four degrees of success, and write a **fail-forward** consequence. No VP track. The `desafio` records `scale: single-check` and omits `vp_target`/`vp_format`.
- **A structured VP challenge** — a scene or set-piece resolved over many rolls toward a goal: an influence audience, a chase, a heist. You pick a **VP format** (accumulating / diminishing / multiple tracks), size the **target and thresholds** against the scale table, set the **per-roll awards**, and assign DCs. The `desafio` records the format, target, scale, and (optionally) a `relogio` clock for the track.

When the GM is unsure which, ask — or read it from the stakes (a single beat → single check; a whole scene with momentum → VP challenge). Default the rest.

## The core idea — VP math AND a situation

A skill challenge that is only "roll until you hit 7" is the trap this skill exists to avoid. It produces **two things at once**:

1. **The math layer** — the VP format, target, and thresholds (or the single DC); the per-roll awards; every DC and how it was derived; the party level stated.
2. **The situation layer** — a **world-state to change** (not "succeed"), the approaches the scene invites (described, never a fixed allowed-skill list), the reason the challenge exists, how it escalates, and the **fail-forward** exits so failure is a complication, never a dead end.

The two layers are inseparable. The framework for the situation layer is in `references/challenge-as-situation.md`.

## When to use / when not

**Use this skill when:**
- Building a specific non-combat challenge — a social influence scene, a chase, a research montage, an infiltration, a single dramatic skill test.
- Setting an honest DC for a check the GM has in mind ("how hard should this Acrobatics leap be for a level-3 party?").
- Wrapping a non-combat threat from `rpg-session-prep` or `rpg-front-tracker` in runnable numbers.
- A session-prep handoff flags "→ rpg-embate-builder" for a scene that is resolved by skills, not swords.

**Do not use this skill for:**
- **A fight** — creature rosters and XP budgets. That is `rpg-encounter-builder`.
- **Building the world** — factions, NPCs, locations, the campaign spine. That is the loremaster kit.
- **Running the challenge live** — calling for the rolls, narrating outcomes at the table or in Foundry. The table owns that (and `rpg-embate-forge` realizes it in Foundry VTT).
- **Advancing the front between sessions** — that is `rpg-front-tracker`.

## Inputs — what to read

| Source | What you need | How to find it |
|---|---|---|
| Party level + size | REQUIRED for honest DCs — never assume silently; confirm both, or state your assumption aloud and flag the math as approximate. | Ask the GM, or name the assumption. |
| Scene or threat brief | What the challenge is about, who opposes it, what the stakes are | Told directly or read from a `sessao` / `frente` handoff |
| Subsystem + scale | Influence / Chase / Research / Infiltration / generic; and single-check vs. quick/long/session/adventure | Elicit in co-creation, or pick and name the assumption |
| Vault `npc` / `faccao` notes | The influence targets, the opposing faction, exact vault names | Glob `npcs/` / `faccoes/` → Read by exact name |
| `references/pf2e-vp-math.md` | VP formats, scale/threshold table, Level-Based + Simple DCs, adjustments, per-roll awards, honesty rules | Load before sizing any challenge |
| `local` note | The challenge location (if it has one) | Glob `locais/` → Read by exact name if it exists |

## The workflow

1. **Co-create the brief** — run the intake in `references/co-creation.md`. Two inputs are non-negotiable for honest DCs: party level and party size. Elicit the scene brief, then the **subsystem** (influence / chase / research / infiltration / generic) and whether this is a **single check or a VP challenge** (or pick and name your assumption). **Match the user's language** in all output, including headings; keep PF2e canon names and AoN category URLs in English.
2. **Pick the subsystem preset** — load the matching preset in `references/pf2e-vp-math.md` (Influence, Chase, Research, Infiltration, or generic). The preset suggests the structure, the skills the scene typically invites, and a starting threshold shape.
3. **Choose the VP format and size it** — accumulating (gain toward a target), diminishing (start full, lose), or multiple tracks. Pick the **scale** (quick / long / session / background / forefront) and read the VP target and thresholds off the scale table. For a single check, skip this step.
4. **Set the DCs — show the arithmetic** — Level-Based DC for the party level, or a Simple DC by proficiency, with a named adjustment (−2 easy … +5 very hard). State the per-roll VP awards (default: crit +2, success +1, crit-fail −1). Show how the target is reached. **Never silently round.**
5. **Write the challenge-as-situation** — the wrap that makes it a scene, not a DC. Objective (a world-state to change), approaches (described, not a fixed skill list), reason, escalation, and the **fail-forward exits per degree**. See `references/challenge-as-situation.md`.
6. **Write the read-aloud** — the opening image (~40–70 words). See `references/co-creation.md` Part B.
7. **Persist** — emit the `desafio` candidate (plus `npc`/`item` candidates for anything new, and an optional `relogio` for the VP track) and route to `rpg-preserve`. See Persistence below.

## The math must be exact

Always show the VP target and thresholds (or the single DC), the per-roll awards, and how each DC was derived. Always state the assumed party level and size. If a number is uncertain, say so and point to Archives of Nethys — Rules (https://2e.aonprd.com/Rules.aspx) for verification. PF2e is errata-sensitive; flag pre-Remaster community sources if they appear.

The tables, the subsystem presets, and the honesty rules are in `references/pf2e-vp-math.md`. Load it before sizing any challenge.

## Read references as needed

Four reference files (no tone-spectrum — tone is inherited from the campaign):

- **`references/co-creation.md`** — the intake front-end (eliciting party level/size, subsystem, scale, challenge purpose) and the read-aloud guidance. **Load before intake.**
- **`references/pf2e-vp-math.md`** — VP formats, the scale/threshold table, Level-Based + Simple DCs, adjustments, per-roll awards, the four subsystem presets, and the honesty rules. **Load before sizing any challenge.**
- **`references/challenge-as-situation.md`** — the situation framework (objective, approaches, reason, escalation, fail-forward exits) and the two traps to avoid. **Load when writing the situation block.**
- **`references/output-template.md`** — the challenge skeleton, single-check and VP variants (Compact / Full). **Load when ready to write.**

Also consult `references/vault-entity-contract.md` before emitting any candidate to rpg-preserve.

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core to adapter. That coupling is the anti-pattern this kit is designed to prevent.

To persist:

1. Assemble a `desafio` candidate (required field: `type`; key fields: `subsystem`, `vp_format`, `scale`, `vp_target`, `party_level`; relations: `location→local`, `npcs→npc[]`, `faction→faccao`, `session→sessao`, `act→ato`, `items→item[]`, `clock→relogio`). For a single check, set `scale: single-check` and omit `vp_format`/`vp_target`/`clock`.
2. If the challenge references NPCs or items that **do not yet exist in the vault**, emit `npc` or `item` candidates for them as well.
3. If the VP track should live as a clock the world can advance, emit a `relogio` candidate (segments = `vp_target`, filled = 0, status = `ticking`) and link it via `clock`. This lets `rpg-front-tracker` and `rpg-embate-forge` treat the track like any other progress clock.
4. Route all candidates to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate.

The entity shapes (required fields, allowed values, relation targets) are in `references/vault-entity-contract.md`. Consult it before emitting candidates. Thresholds and the per-roll table live in the **note body**, not the frontmatter — the vault's YAML is flat (single-level, no nested maps).

## Off-stage handoffs

Every challenge surfaces nodes that may need attention. End with a structured handoff list:

- → `rpg-session-prep` (gamemaster): the completed challenge as a scene in the session plan
- → `rpg-front-tracker` (gamemaster): if the VP track should be a front clock the world advances between sessions
- → `rpg-embate-forge` (foundry-forge): to realize the challenge in Foundry VTT — a challenge journal, the live rolls, the VP clock
- → `rpg-npc-creator` (loremaster): for any named influence target or opponent who needs a full NPC dossier
- → `rpg-location-creator` (loremaster): if the challenge location does not yet exist in the vault
- → `rpg-faction-creator` (loremaster): if the challenge opposes a faction whose plan-in-motion needs deepening
- → `rpg-clue-mapper` (loremaster): for a Research challenge that should expose a revelation from the clue map

## Compact vs. Full

- **Compact:** subsystem · format/target/thresholds (or the single DC) · per-roll awards · DC table · the situation block (objective / approaches / reason / escalation / fail-forward exits) · read-aloud · Persist block with the `desafio` candidate (plus `npc`/`item`/`relogio` candidates for anything new). The runnable challenge, ready to drop into a session.
- **Full:** adds approach notes (the obvious skills per beat and the circumstance modifiers that reward preparation — without forbidding other approaches), per-degree fail-forward branches at each threshold, alternative subsystem framings (run the same scene as influence vs. chase), the location detail, and the complete handoff list.

See `references/output-template.md` for the skeleton.

## Coherence — the thing that matters most

A challenge coheres when:

1. **The math is exact** and shown — the VP target and thresholds (or the single DC), the per-roll awards, and every DC's derivation.
2. **Party level and size are stated** — every DC is meaningless without them.
3. **It measures a world-state**, not abstract successes — the council's patience, the pursuer's distance, the ritual's progress. The VP track *is* something in the fiction.
4. **Failure is a complication, not a dead end** — every degree of failure has a fail-forward consequence that opens a new path or raises the cost.
5. **Every roll is meaningful** — the scene rewards different skills and different characters; it does not collapse to "the one PC with the best modifier rolls until it's over."

Two failure modes:

1. **The math-only challenge.** A correct VP track with no situation — a counter pointing nowhere. Fix: always write the challenge-as-situation block.
2. **The situation-only challenge.** A vivid scene with no DCs or VP shown — evocative but unrunnable. Fix: always show the arithmetic.

## What to avoid

- **The "X successes before Y failures" trap.** A bare success/failure counter is a puzzle with one solution and it punishes participation. Measure a world-state and let failure cost something instead. See `references/challenge-as-situation.md`.
- **The whiff / non-participation problem.** If only the best-modifier PC can contribute, the scene is broken. Invite multiple skills and reward preparation with circumstance bonuses.
- **`?ID=` links to Archives of Nethys.** Category pages only. IDs change; broken links are worse than none.
- **Writing files directly.** Always route through `rpg-preserve`. No exceptions.
- **Inventing PF2e content.** Use the official subsystems and the DC tables; reskin, don't invent new mechanics.
- **Silent rounding.** If the math doesn't land cleanly, say so.
- **Re-setting tone.** Tone is inherited from the campaign (default dark-leaning level 3). The challenge follows the campaign's register; it does not introduce new tone.
- **Private campaign content in examples.** Examples in reference files use generic situations or clearly-public media only.
