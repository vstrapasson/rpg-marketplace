---
name: rpg-session-recap
description: Closes the loop after a Pathfinder 2e session — takes the GM's post-session account (plus an optional linked transcript) and reconciles it against the vault. Extracts the session's key beats, matches every named entity to its canonical vault note, updates the sessao note with outcomes, creates evento entities, flips quest.status (available/active/completed/failed/abandoned), marks clue-map revelation IDs revealed, and records NPC/faction story-state shifts. When the account contradicts vault or campaign-bible state — a name that doesn't resolve, a quest whose outcome is ambiguous, an NPC the account kills but the story still needs, a fact that breaks canon — it stops and asks the GM which path to take, then records the decision so nothing gets silently overwritten or silently dropped. Ends by handing off to rpg-front-tracker (advance the clocks from what happened) and rpg-session-prep (plan next session from the reconciled state). Reads the campaign bible, the clue map, the most recent sessao, and vault entities; persists everything through the rpg-preserve write gate, never writing files directly. Use after a session ends, or whenever the user wants to: recap what happened, close the session, update the vault after playing, reconcile the story, log the session, or check what changed. Phrasings like recapitular a sessão, o que aconteceu na sessão, atualizar o vault depois do jogo, fechar a sessão, registrar o que rolou, run the recap, log what happened, after the session, what changed, close out the session. Tone inherited from the campaign, default dark-leaning.
---

# RPG Session Recap (Pathfinder 2e kit — the return edge)

## What this skill is for

Turn the GM's account of a just-played session into **reconciled vault state** — the one move the gamemaster kit has never had. Every other skill in the kit prepares or runs a session; this one closes it out. It reads what the GM says happened, connects every name to the vault's canon, proposes the concrete state changes that follow, and — where the account and the vault disagree — **stops and asks the GM which path to take** instead of guessing.

This is the **return edge** of the session cycle: `party-forge → front-tracker → session-prep → encounter/embate-builder → run-sheet → [play] → rpg-session-recap → front-tracker → session-prep → …`. Without it the loop is one-directional — the GM re-feeds `front-tracker` from memory, `quest.status` never flips, and `evento`/clue reveals are never captured. This skill makes the vault a living record instead of a forward-only pipeline.

The deliverable is two things: a GM-facing **recap document** (the session's beats, in prose) and a **change set** — the concrete, reviewable list of vault mutations this session produces, with any divergence flagged and adjudicated before anything is written.

## The core idea — reconcile, don't just record

A recap that only transcribes what happened is a diary entry. The value here is **reconciliation**: checking the account against what the vault already believes to be true, and treating every mismatch as a decision point, not an error to paper over.

Three things drive every decision here:

1. **The account is the session's truth; the vault is prior state; the bible is canon.** When they agree, reconciliation is mechanical — update and move on. When they don't, that's the interesting case, and it belongs to the GM, not to a silent overwrite.
2. **Every entity must resolve by exact name.** A name in the account that doesn't match a vault note isn't a typo to guess past — it's either an existing entity under a different name, a new node that needs a handoff, or a fact worth pausing on.
3. **Nothing gets written until the GM has seen the batch.** Unambiguous updates are proposed together for one approval; genuine conflicts are adjudicated one at a time, with 2–4 concrete paths offered — never a bare "this doesn't match, what do I do?"

*If you find yourself flipping a quest to `completed` because the account used the word "finished" without checking what the vault currently believes, you've slipped into transcription — stop and check state first.*

The full method — beat extraction, entity matching, the conflict taxonomy, and the adjudication protocol — is in `references/reconciliation-model.md`.

## When to use this skill

Trigger when the user wants to:
- Recap or log what happened at the table ("o que aconteceu na sessão", "recapitular a sessão", "log what happened")
- Update the vault after a session ("atualizar o vault depois do jogo", "fechar a sessão")
- Reconcile the story so far — check whether quests resolved, NPCs changed, secrets came out
- Prepare the ground for the next `rpg-front-tracker` / `rpg-session-prep` run

Do **not** trigger for:
- **Preparing an upcoming session** — that is `rpg-session-prep`. This skill closes the session that already happened; session-prep opens the next one. Run this skill first if a session just ended.
- **Advancing fronts and clocks** — that is `rpg-front-tracker`. This skill produces the reconciled `sessao`/`evento`/`quest` state; front-tracker consumes it to decide which grim portents fired. Hand off to it, don't duplicate its judgment here.
- **Building world content** — a missing NPC, location, or faction plan is a handoff to the relevant loremaster skill, not something this skill invents.
- **The live table overlay during play** — that is `rpg-gm-run-sheet`, which runs *before* the session ends, not after.
- **Balancing an encounter or challenge retroactively** — `rpg-encounter-builder`/`rpg-embate-builder` build the math prospectively; this skill just records that an `encontro`/`desafio` happened, if one already exists.

## Inputs — what to read from the vault

Read by exact canonical name. Every wikilink must match the vault's names registry or `rpg-preserve` will flag a broken link when a candidate is written.

| Source | What you need | How to find it |
|---|---|---|
| The GM's account | The primary input — pasted notes, dictated summary, or bullet points of what happened | Elicited in Step 1; never assumed |
| Linked `transcricao` (optional) | Raw or attributed session transcript, to enrich or verify the account | `sessao.transcript` on the session being recapped, if set → `sessoes/transcricoes/` |
| The `sessao` being recapped | The planned shape of the session — what was expected, its `date`, `act`, `quests`, `players_present` | Glob `sessoes/` → sort by `date` → usually the most recent; confirm with the GM if ambiguous |
| `campaign-bible-*.md` | Central truth, tone, canon names, the Deliberate Exceptions log | Glob `campaign-bible-*.md` at the vault root |
| `clue-map-*.md` | Revelation IDs (R1, R2…) and which are still unrevealed | Glob `clue-map-*.md` at the vault root |
| `quest` notes | Current status of quests the account touches | Glob `quests/` → Read by exact name |
| `npc` / `faccao` notes | Current status/role of characters and factions the account touches | Glob `npcs/`, `faccoes/` → Read by exact name |
| `frente` / `relogio` notes | Active fronts and clocks, for context on what the session might have fed | Glob `frentes/`, `relogios/` → Read by exact name |
| `evento` notes for this arc | Existing events, to avoid duplicating one the account also describes | Glob `eventos/` → filter by `act`/`session` |

## The workflow at a glance

1. **Intake** — elicit the GM's account (and locate a transcript if one exists); confirm which `sessao` this recaps. See `references/co-creation.md`.
2. **Extract the beats** — pull the key events, resolutions, revelations, deaths, deals, and discoveries out of the account.
3. **Match to the vault** — resolve every named entity against the vault's canonical names (using the bible's names registry as the tiebreaker).
4. **Build the change set** — draft the concrete mutations: `sessao` update, new `evento`s, `quest.status` flips, revealed R-IDs, NPC/faction state notes.
5. **Adjudicate divergences** — where the account conflicts with vault or bible state, stop and ask the GM which path to take (`references/reconciliation-model.md` §Conflict taxonomy). Record the decision.
6. **Persist** — route the approved change set through `rpg-preserve`. Never write vault files directly.
7. **Hand off** — to `rpg-front-tracker` (advance the clocks from this session) and `rpg-session-prep` (plan the next one); to loremaster creators for any node the session introduced but the vault lacks.

Read references by context (Steps 1, 3–5, 6).

## Step 1: Co-create the intake — interview, don't transcribe blind

**This skill is a reconciliation partner, not a stenographer.** Run the elicitation front-end in `references/co-creation.md` before touching the vault.

- **Match the user's language** in the whole output, including headings. Keep PF2e canon names and AoN category-level URLs in English.
- **Tone is inherited** — pull it from the campaign bible (default dark-leaning level 3). This skill reports what happened; it does not re-set tone.
- The key intake distinction: *is there a transcript to cross-check, or is the GM's account the only record?* Either is sufficient — a transcript enriches and verifies, it is never required.
- Confirm **which session** this recaps before extracting anything. Default to the most recent `sessao` by date, but ask if more than one is a plausible candidate (e.g. two unplayed sessions queued).
- If you've asked two questions without giving something back (a reflected beat, a matched name, a draft change-set row), you've slipped into interrogation — give before you ask again.

## Step 2: Read references as needed

Four reference files plus the entity contract (no tone-spectrum — tone is inherited from the campaign):

- **`references/co-creation.md`** — the intake front-end (eliciting the account, locating a transcript, confirming which session) and the light "Previously on…" read-aloud rule. **Load before intake.**
- **`references/reconciliation-model.md`** — the bedrock: beat extraction, entity matching by exact canonical name, the conflict taxonomy, and the adjudication protocol. **Load before building the change set.**
- **`references/output-template.md`** — the recap-document and change-set skeleton (Compact / Full). **Load when ready to write.**
- **`references/vault-entity-contract.md`** — the entity shapes this skill reads and writes, the wikilink rule, and the body-preserving update path. **Load before emitting any candidate.**

## Step 3: Extract, match, and build the change set

### 3a. Extract the beats

Read the account (and the transcript, if present) for: what the party did, what resolved, what was revealed, who lived/died/turned, what was found, what was said that matters. A transcript is read for *enrichment and verification* — quote or timestamp only what sharpens a beat the account already raised, don't mine it for a second, parallel recap.

### 3b. Match every named entity

For each NPC, faction, location, quest, or item the beats mention, resolve it against the vault by exact canonical name (cross-check the campaign bible's names registry if one exists). A name that doesn't resolve is a **match failure**, not a beat to drop — route it through the conflict taxonomy (`reconciliation-model.md`).

### 3c. Draft the change set

For each beat with a resolved entity, draft the concrete mutation:
- **`sessao` update** — the outcomes section of the note that was recapped (always at least one row).
- **New `evento`** — for each discrete event worth its own entity (a fight, a revelation, a turning point), not every minor beat.
- **`quest.status` flip** — only when the account makes the new status unambiguous; otherwise this is a conflict (§3d/ambiguous outcome).
- **Revealed R-IDs** — cross-reference the clue map; mark revealed only what the account confirms landed.
- **NPC/faction state notes** — a status change (`stub/draft/active/archived`) or a body note on what shifted, when the beats warrant it.

Group the change set into **clean** (no contradiction found — batch these for one approval) and **conflict** (adjudicate individually, per `reconciliation-model.md`).

### 3d. Adjudicate divergences

For every conflict, stop and present it with 2–4 candidate paths (never a bare "this doesn't match"). Take the GM's decision, fold it into the change set, and — if the decision affects campaign canon (a retcon, an accepted deviation from the bible) — note it for the campaign bible's Deliberate Exceptions section rather than silently proceeding. See `references/reconciliation-model.md` for the taxonomy and worked examples.

## Read-aloud — "Previously on…" (light in this skill)

This skill is almost entirely GM-facing — the one table-facing beat is optional: a short **"Previously on… / Nos episódios anteriores…"** recap the GM can read to open the *next* session. Rules from the kit's shared DNA:

- **~40–70 words.** A montage, not a full recap — the highlights that matter for what's coming.
- **Sensory and concrete**, not a bullet list read aloud.
- **Never narrate the PCs' feelings or decisions** — state what happened, let the players own how they felt about it.
- **Mark it clearly:** a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**).

Write this only when the recap is Full, or when the GM asks for it directly — it's a gift to next session's `rpg-session-prep`, not mandatory output here.

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core to adapter. That coupling is the anti-pattern this kit is designed to prevent.

To persist the change set:

1. Assemble each candidate — a `sessao` update, `evento` creations, `quest` status flips, NPC/faction state edits.
2. Route every candidate to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate.
3. **Existing entities keep their bodies.** `sessao`, `quest`, `npc`, and `faccao` notes being updated (not created) must go through the **body-preserving update path** — read the note, patch only the frontmatter fields that changed, keep the body. Do not rebuild these notes from scratch; that would silently discard the note's prose. See `references/vault-entity-contract.md`.
4. New `evento` entities use the normal create path (`buildFrontmatter` / `buildNoteContent`).
5. Clue-map ticks are a **loose-file edit** (`clue-map-*.md` is not a vault entity) — apply them directly with the GM's approval, after the vault-entity candidates are settled.

**If a node named in the account does not exist in the vault** (a new NPC, location, or quest the session introduced), do not invent it. Stop and emit a loremaster handoff:
- → `rpg-npc-creator` (loremaster): a new NPC the party met or named
- → `rpg-location-creator` (loremaster): a new location the party reached
- → `rpg-faction-creator` (loremaster): a faction whose plan needs to exist before the account's beats make sense
- → `rpg-clue-mapper` (loremaster): a revelation the session produced that isn't on the clue map yet

Then resume the recap once the node exists, or record it as a deferred item in the change set.

The entity shapes (required fields, allowed values, relation targets) are in `references/vault-entity-contract.md`. Consult it before emitting any candidate.

## Compact vs. Full

- **Compact:** the beats in prose (3–6 sentences) · the change set (clean batch + resolved conflicts) · revealed R-IDs · the Persist block · Handoffs. Enough to close the loop and move to front-tracker.
- **Full:** adds the complete beat-by-beat account, the entity-matching notes (including near-misses that were resolved as aliases), the conflict log (what was asked, what the GM decided, and why), the "Previously on…" read-aloud, and cross-references to which `frente`/`relogio` this session likely feeds.

See `references/output-template.md` for the skeleton.

## Coherence — the thing that matters most

A recap coheres when:

1. **Every state change traces to a beat in the account.** No inferred quest completion, no assumed NPC status shift without a line in the account or transcript that supports it.
2. **No conflict is resolved silently.** If the account and the vault disagree, the GM decided — the recap does not pick the more dramatic or more convenient reading on its own.
3. **Existing note bodies survive.** A `quest` flipped to `completed` still has its original prose; a `sessao` updated with outcomes still has its planned content.
4. **Every wikilink is exact.** A mismatched name is a broken link when `rpg-preserve` validates a candidate. Use canonical vault names throughout, and route unresolved names through the conflict taxonomy rather than guessing.

Two failure modes:

1. **The silent overwrite.** Flipping status or rewriting state without surfacing the divergence to the GM first. Fix: every conflict stops for adjudication — no exceptions, no "probably fine."
2. **The empty recap.** A prose summary with no change set — beats recorded nowhere the vault can use. Fix: every beat with a resolved entity produces a candidate, even a small one (a status note, an `evento` stub).

## What to avoid

- **Writing files directly.** Always route through `rpg-preserve`. No exceptions.
- **Rebuilding an existing note from scratch.** Use the body-preserving update path — never regenerate a `sessao`/`quest`/`npc`/`faccao` note's body when only the frontmatter changed.
- **Guessing past a name mismatch.** An unresolved name is a conflict to adjudicate, not a typo to autocorrect.
- **Flipping `quest.status` on an ambiguous outcome.** "They're getting close" is not "completed." When in doubt, it's a conflict, not a clean update.
- **Re-setting tone.** Tone is inherited from the campaign (default dark-leaning level 3).
- **Mining the transcript for a second recap.** The account is the spine; the transcript enriches and verifies specific beats — it does not replace the GM's framing of what mattered.
- **Private campaign content in examples.** Examples in reference files use generic or clearly-public media only.
