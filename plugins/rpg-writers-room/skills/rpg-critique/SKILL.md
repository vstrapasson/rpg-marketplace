---
name: rpg-critique
description: Convenes a writers' room of five expert critics to review a campaign that already exists — judging the quality of the writing (lore, NPCs, factions, cities) from the vault, and the quality of the conducting (pacing, agency, whether the reveals landed) from the session transcripts, each with its own rubric. A librarian subagent builds a citable evaluation packet, five rubric-grounded critics run in parallel, every quote is verified against the packet, and the room's agreements and splits become a self-contained HTML report with prioritized fixes. Critique only — it never generates content, never edits vault notes, and never claims to be an objective score. Use when the user wants feedback on a campaign, a critique of the writing, or a read on how a session went. Phrasings like avalie minha campanha, o que dá para melhorar, como foi minha condução, critique meus NPCs, review my campaign, how was my GMing, is my lore any good. Not consistency auditing (rpg-campaign-reviewer) or vault integrity (rpg-audit).
---

# RPG Critique (the writers' room)

## What this skill is for

You have built a campaign and run some of it. This skill convenes **a panel of expert critics** to tell you how to make it better — five deliberately different lenses reading your vault and your session transcripts, each rating against an explicit rubric, each grounding every claim in a quote you can go check.

It is a **critique layer**, and it is the only skill in the kit whose product is judgment rather than content. It generates nothing, writes no lore, and edits no vault note. The deliverable is a self-contained **HTML report** — synthesis on top, the full room underneath.

## The core idea — two evaluations, two sources, two rubrics

The thing most reviews get wrong is treating a campaign as one object. It is two:

1. **The artifacts** — the *writing*. Judged from the vault notes. Is this faction interesting? Does this city give a GM something to point at?
2. **The conducting** — the *running*. Judged **only** from the session transcripts. Pacing, spotlight, railroading, whether the clues actually reached the players, whether the NPCs came alive at the table.

They are different questions with different evidence and different failure modes, and they come apart constantly: a beautiful dossier that never surfaced in play, a thin note run brilliantly. **Prep quality is not conducting quality.** Never review one by reading the other — if the transcripts are missing, conducting is *not judged*, and the report says so.

Both are first-class. A review that only reads the vault is half a review.

*If you find yourself concluding that a session went well because the prep was good, stop — you have reviewed the wrong object.*

## It is a room, not an oracle

Five personas on similar models are **not** five independent judges. Measured panels of LLM evaluators lose roughly three-quarters of their nominal independence to correlated error. So this skill is built to deliver **coverage, not consensus**: five angles catch more than one, and the disagreements are kept rather than averaged away. Agreement raises *salience*, never *confidence* — confidence comes from independent evidence, not from a vote. The methodology footer says this plainly in the report, and it is not optional.

## When to use this skill

Trigger when the user wants to:
- Get feedback on a campaign, an arc, or a set of artifacts ("avalie minha campanha", "critique my lore")
- Know how their conducting is going ("como foi minha condução", "how was my GMing last session")
- Find out what to improve before the next arc ("o que dá para melhorar")
- Test a suspicion they already have ("acho que meus NPCs são esquecíveis")

Do **not** trigger for:
- **Consistency auditing** — names that drifted, dangling references, tone drift against the bible. That is `rpg-campaign-reviewer` in the loremaster kit. It checks *coherence*; this checks *quality*. Run them as separate passes; if the user wants both, say so.
- **Vault integrity** — broken links, schema errors, orphans. That is `rpg-audit` in the guardian kit.
- **Generating or fixing content** — a weak NPC gets a critique here and a rebuild in `rpg-npc-creator`. This skill never writes the replacement.
- **Reconciling what happened into the vault** — that is `rpg-session-recap` in the gamemaster kit. Run it *before* this skill so the vault reflects the sessions being judged.
- **A single quick question** ("is this name any good?"). A five-critic panel is expensive. Answer it in conversation.

## The panel

| Persona | Lens | Judges |
|---|---|---|
| **O Arquiteto** | the Alexandrian — node structure, the Three Clue Rule, situations not plots | artifacts + conducting |
| **O Lazy GM** | Sly Flourish — did the prep serve the play, and was it usable at the table | conducting + usability |
| **O Showrunner** | Colville — factions orthogonal, villains arguable, NPCs with wants and contradictions | NPCs, factions, cities |
| **O Jogador** | the player advocate — agency, spotlight, pacing, memorability, would I come back | conducting + whether artifacts landed |
| **O Dramaturgo** | theme and tone — pillars recurring, escalation, tone held, setup paid | lore/arc + conducting |

Each persona's full rubric — criteria, what strong looks like, the explicit failure tells, and what is *not* its lane — is in `references/personas/`. All five always run; a panel with seats removed stops being a panel.

## The workflow at a glance

1. **Scope** — interview the GM on what to review, how wide, and what they already suspect. `references/co-creation.md`.
2. **Librarian** — one `rpg-lore-librarian` spawn builds the citable evaluation packet; write it to `_criticas/`.
3. **Critics** — five `rpg-critic` spawns **in parallel**, one message, each with its persona file, the packet path, and its model.
4. **Verify** — grep each cited quote against the packet. Unverifiable citations are struck, not repaired.
5. **Synthesize** — corroborated / convergent / single-lens findings, genuine trade-offs, prioritized actions. `references/synthesis-model.md`.
6. **Render** — fill `references/report-template.html`, write it to `_criticas/`.
7. **Hand off** — the doorway message, then stop. `references/output-template.md`.

## Step 1 — Scope the review (interview first)

**Never convene the room before you know what it is reviewing.** Run `references/co-creation.md`.

- **Match the user's language** in the whole report, including headings. Keep PF2e canon names in English; any Archives of Nethys link is category-level, never a `?ID=` deep link.
- **Tone is inherited, not set.** The critics judge against the campaign's *declared* tone from the bible (default dark-leaning level 3). A campaign that declines to be grimdark is not failing.
- Ask early what the GM already suspects — it aims the librarian's sampling, not the verdict.
- Check the vault for transcripts **before** spending anything. No transcripts means conducting cannot be judged, and the GM should hear that first.
- If you have asked two questions without giving something back — a proposed scope, a count of what exists, a named assumption — you have slipped into interrogation.

## Step 2 — Read references as needed

- **`references/co-creation.md`** — the scoping interview, plus the rules for handing critique to a person. **Load before anything else.**
- **`references/panel-protocol.md`** — spawn shapes, the model spread and why it matters, citation verification, what to do when a critic misbehaves. **Load before dispatching.**
- **`references/personas/*.md`** — the five rubrics. You do not need to read these; the critics do. Read one only when the GM asks what a lens covers.
- **`references/synthesis-model.md`** — the confidence ladder, the tension taxonomy, prioritization. **Load after the critics return.**
- **`references/output-template.md`** + **`references/report-template.html`** — filling and writing the report. **Load when rendering.**

## Step 3 — Dispatch the librarian

One spawn of `rpg-lore-librarian` (blocking), given the vault path, the scope, and the GM's stated worry. It returns a self-contained evaluation packet — campaign intent, party, artifacts, curated transcript excerpts with timecodes, and an explicit list of what could not be covered. **You** then write it verbatim to `_criticas/packet-<slug>-<date>.md`; the librarian is read-only and the critics read the file.

Read §1 and §5 of the packet yourself before going further. A thin packet produces a thin review, and saying so beats shipping five confident reports about four pages of material.

## Step 4 — Fan out the critics

**Five `rpg-critic` spawns in a single message.** Each gets: its persona file's absolute path (expand `${CLAUDE_PLUGIN_ROOT}` — a subagent cannot), the packet path, the scope in one line, the report language, and a **model** from the spread in `panel-protocol.md`.

Varying the model across seats is the one lever that buys real independence rather than its appearance. Record which model each critic ran on — it goes in the report header and the footer.

## Step 5 — Verify the citations

For every finding rated **concerning**, and every quote that will appear in the synthesis, `grep -F` a distinctive fragment of the quote against the packet file. **Found** means grounded. **Not found** means struck — do not repair it, and do not go find a real quote that would have supported the claim. Count the strikes in the footer.

One fabricated citation discredits the whole document. This step is cheap and it is not optional.

## Step 6 — Synthesize (do not concatenate)

Per `references/synthesis-model.md`:
- **Corroborated** (same finding, different evidence — best when one cites an artifact and another a transcript) outranks **convergent** (same finding, same quote), which is salience rather than proof. A well-evidenced **single-lens** finding keeps its full weight; that seat exists precisely to see what the others cannot.
- **Tensions are kept.** Genuine trade-offs go to the GM as choices with both sides argued. Never average, never side with the more confident voice.
- **Prioritize by leverage × evidence**, never by vote count. Five to seven actions, each concrete enough to start today.
- **Per-aspect verdicts** against the campaign's own intent — and an honest "not judged" where the evidence was not there.

## Step 7 — Render and hand off

Fill `references/report-template.html`, replace every placeholder, delete every comment, write to `_criticas/critica-<slug>-<date>.html`. The **methodology footer is mandatory and never softened**. Then give the short conversational handoff from `references/output-template.md` — where the report is, the sharpest finding with its quote, the sharpest disagreement as a choice, what was not judged, and an offer of what is next. Do not paste the synthesis into chat.

## Persistence — the load-bearing rule

**This skill never writes a vault entity and never imports guardian code.** The report and the packet are loose files in `_criticas/`, which the guardian's validator does not walk — no write gate needed. If (and only if) the GM asks for a summary note in the vault, route it through the **`rpg-preserve` skill** as a `lore` entity. Never write an entity file by any other path.

## What makes a review worth reading

1. **Every claim is checkable.** A quote and a path or timecode, or it is not a finding.
2. **The two evaluations stay separate.** Prep judged as prep, conducting judged from transcripts.
3. **Strengths are cited too.** Knowing what works lets the GM do it on purpose; an uncited strength is flattery.
4. **The disagreements survived.** If the report resolved every tension, it threw away its best material.
5. **The fixes are small enough to do.** "Add moral complexity" is not a fix. A named change to a named note is.

Two failure modes:

1. **The horoscope.** Confident, well-written findings that cite nothing and would apply to any campaign. Fix — the verification pass, and rating criteria as *insufficient evidence* rather than guessing.
2. **The verdict.** A report that reads as a grade rather than as a room, usually via vote-counting or a score. Fix — the confidence ladder, no numbers anywhere, and the footer.

## What to avoid

- **Reviewing conducting from prep.** No transcripts means not judged.
- **Emitting a score, grade, or percentage.** Anywhere, in any form.
- **Vote-counting as confidence.** Three critics agreeing is salience, not proof.
- **Repairing a bad citation.** Strike it and say so.
- **Rewriting the campaign.** Fixes are suggestions; generating content is another kit's job.
- **Flattery or performed severity.** Both waste the GM's time. Rigorous and kind is the standard.
- **Skipping the interview.** The most expensive mistake here is five critics pointed at the wrong scope.
- **Private campaign content in examples.** Reference files use generic or clearly-public media only.
