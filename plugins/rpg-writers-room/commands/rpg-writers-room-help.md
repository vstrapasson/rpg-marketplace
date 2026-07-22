---
description: How to use rpg-writers-room — a panel of five expert critics that reads your campaign vault and your session transcripts, then returns an HTML report judging both the writing and the conducting, with prioritized constructive fixes.
---

Present this guide to the user conversationally — explain what the panel is for, what it needs, and what it will and will not do — then offer to scope a review (whole campaign, one arc, the last few sessions, or one aspect they are already worried about).

# What it is for

You have built a campaign and run some of it. This kit convenes a **writers' room** — five expert critics, five deliberately different lenses — to tell you how to make it better. It reads two things and judges them separately: the **artifacts** in your Obsidian vault (is the writing good?) and the **session transcripts** (did you run it well?). Those are different questions with different evidence, and they come apart all the time — a beautiful dossier that never surfaced at the table, a thin note run brilliantly.

It is a critique layer. It never writes lore, never edits a vault note, and never gives you a score.

# Quick start

1. Install: `/plugin marketplace add ~/projects/rpg-marketplace`, then `/plugin install rpg-writers-room@rpg-marketplace`, then `/reload-plugins`.
2. Run Claude Code from your **vault root** (the folder with `regioes/`, `npcs/`, `sessoes/`, …).
3. Say `"avalie minha campanha"` or `"review my campaign"`. The scoping interview runs first — it will ask what to review, how wide, and what you already suspect is not working.
4. The report lands in `_criticas/critica-<campanha>-<data>.html`. Open it in a browser.

# What it needs

| Needed | Why |
|---|---|
| A campaign vault (guardian schema) | the artifacts under review |
| `campaign-bible-<slug>.md` | the **yardstick** — critics judge against the campaign's own declared truth, tone, and pillars, not a generic ideal |
| `sessoes/transcricoes/*.srt` or `*.txt` | the **only** evidence for conducting. `.srt` is better — timecodes make every citation checkable |
| `clue-map-<slug>.md` (optional) | lets the structural critic check the Three Clue Rule |
| `jogadores/` (optional) | lets the player advocate judge spotlight balance per PC |

**No transcripts?** The panel still runs, on the artifacts only — and it says plainly that conducting was not judged rather than guessing at it from the prep.

# The five seats

| Persona | Lens | What it judges |
| --- | --- | --- |
| **O Arquiteto** | the Alexandrian | node connectivity (dead ends?), the Three Clue Rule (three independent paths to each revelation?), situations vs. plots, and — from the transcripts — whether outcomes followed player choices or bent back to a plan |
| **O Lazy GM** | Sly Flourish | did the prep serve the play? strong starts, secrets and clues actually deployed, fantastic locations, prep-to-play ratio, and whether a GM could run your notes mid-session under pressure |
| **O Showrunner** | Matt Colville | are the factions in genuinely different conflicts (not good-vs-evil)? could someone argue *for* your villain? do NPCs want concrete things and carry contradictions? does the world act when the party is not looking? |
| **O Jogador** | the player advocate | the seat GM-side critics forget — did our choices matter, did everyone get a moment, did it drag, which NPCs did we still name three sessions later, would I come back next week |
| **O Dramaturgo** | theme and tone | do the pillars recur or just get declared? do the acts escalate? does the tone hold the level you chose (dark-leaning 3 by default, not grimdark, not noblebright)? does what gets planted get paid? |

All five always run, even on a narrow scope — if you suspect your NPCs are flat, the structural critic may find that the real problem is they never got scenes where they could matter.

# What you get

An HTML report in `_criticas/`, built in four layers:

1. **Executive synthesis** — what the room agreed on, where it split, and 5–7 prioritized actions.
2. **Per-aspect verdicts** — lore/arc, NPCs/factions, cities/places, conducting, each with a rubric-at-a-glance.
3. **The room** — every critique in full, in collapsible cards, with its quotes and citations.
4. **A methodology footer** that tells you honestly what this method can and cannot claim.

Alongside it, `packet-<slug>-<date>.md` — the evidence packet the critics read, kept so you can check any citation yourself.

# How it stays honest

- **Every claim carries a verbatim quote** plus a vault path or a transcript timecode. Then the orchestrator greps each quote against the packet — anything that cannot be verified is **struck from the report**, not quietly repaired.
- **"Insufficient evidence" is a valid rating.** A criterion the vault cannot support gets marked as such instead of guessed. That also tells you what to record next time.
- **No scores, grades, or percentages.** Ratings are ordinal (strong / adequate / weak / concerning / insufficient evidence) and never averaged.
- **Agreement is not proof.** Personas built on similar models make similar mistakes — measured panels of nine LLM judges carry only about two independent votes. So critics run on **mixed models**, and three critics agreeing is reported as *"the room kept returning to this"*, never as *"high confidence"*.
- **Disagreements are kept.** When the Lazy GM wants half your Act II prep cut and the Dramaturg says that prep is where the theme lives, you get both arguments and the choice — not an averaged non-answer.

# Workflows

## The full review

1. From the vault root, say `"avalie minha campanha"`. Answer the scoping questions — especially *"what do you already suspect is not working?"*, which aims the evidence-gathering.
2. The librarian reads the vault and curates the packet (artifacts plus 8–15 quoted moments per session).
3. Five critics run in parallel on mixed models. This is the slow, expensive part; narrow scopes produce sharper reports.
4. You get the doorway message — where the report is, the sharpest finding, the sharpest disagreement — and the file.
5. Offer next steps: work through the fixes, run a narrower panel on one aspect, or persist a summary note to the vault via `rpg-preserve`.

## The conducting check after a rough session

Say `"como foi minha condução na sessão 3?"`. Scope to that session's transcript plus the artifacts it touched. O Jogador and O Lazy GM will carry most of the weight; O Arquiteto will tell you whether a stall was an information-flow problem rather than a pacing one.

## Before starting a new act

Scope to the act that just ended. The Dramaturg's setup-and-payoff criterion is the one to read first — dangling promises are cheapest to fix before the next act commits to something else.

# What it is not

- **Not a consistency check.** Drifted names, dangling references, contradictions against the bible → `rpg-campaign-reviewer` (loremaster). That one checks *coherence*; this one checks *quality*. Run both if you want both.
- **Not a vault audit.** Broken links, schema errors, orphans → `rpg-audit` (vault-guardian).
- **Not a generator.** The critics tell you the guild-master needs a reason to obstruct the party; building him is `rpg-npc-creator`, invoked separately, by you.
- **Not a session logger.** Run `rpg-session-recap` first so the vault reflects the sessions being judged.
- **Not for one small question.** "Is this name any good?" does not need five critics. Just ask.
