# Panel Protocol — dispatching the room

> How the orchestrator runs the panel. Load this before spawning anything.

## The fan-out rule

**The skill owns all fan-out.** Subagents cannot spawn subagents, so neither the librarian nor the critics ever spawn anything. The sequence is fixed:

```
scope (interview)  →  librarian (1 spawn, blocking)  →  write packet to disk
                   →  critics (5 spawns, one message, parallel)
                   →  verify citations  →  synthesize  →  render HTML
```

Nothing runs in the background here — every step feeds the next.

## Step 1 — Spawn the librarian

One spawn, `subagent_type: rpg-lore-librarian`, run synchronously. Give it exactly two things:

```
Vault path: <absolute path to the vault root>
Scope: <one paragraph — which aspects, which arc or sessions, and the GM's stated worry if they named one>

Produce the evaluation packet per your instructions and return it as your report.
```

The GM's stated worry belongs in the scope so the librarian samples *toward* it — "the GM suspects the NPCs are forgettable, so weight the transcript sample toward moments where an NPC is named or quoted." That aims the evidence-gathering, not the verdict.

**Then you write the packet to disk yourself** — `<vault>/_criticas/packet-<slug>-<YYYY-MM-DD>.md`, verbatim, no edits, no trimming. The librarian is read-only by design; writing is the orchestrator's job.

**Why a file, not context-passing:** the packet goes to five critics. Passing a path costs a line each; pasting the packet five times costs it five times over, and the packet is the largest object in the run. The file is also the audit trail — every citation in the report gets checked against it in Step 4.

## Step 2 — Read the packet yourself

Before dispatching, read §1 and §5 of the packet — campaign intent, and what cannot be judged. Two decisions come out of it:

- **If §5 says conducting cannot be judged** (no transcripts in scope), tell the GM before spending the critics. Run the panel anyway if they want, but every conducting criterion will come back as insufficient evidence, and O Jogador will have almost nothing to work with.
- **If the packet is thin** (a handful of artifacts, no pull-quotes, everything summarized), the review will be thin. Say so rather than producing five confident reports about four pages of material.

## Step 3 — Spawn the five critics in parallel

**One message, five Agent calls**, all `subagent_type: rpg-critic`. Serial spawning wastes minutes for nothing — the critics are fully independent.

Each spawn gets the same shape, varying only the persona and the model:

```
You are O <Persona>.

Persona file (read this first, in full): <plugin root>/skills/rpg-critique/references/personas/<file>.md
Evaluation packet (read this in full): <vault>/_criticas/packet-<slug>-<date>.md
Scope under review: <one line>
Report language: <the user's language>

Judge only through your persona's lens, rate every criterion in your rubric, and follow the
evidence discipline exactly — a claim without a verbatim quote from the packet is not a finding,
and a criterion the packet cannot support is rated "insufficient evidence", never guessed.
Return only the report in your specified format.
```

Resolve `<plugin root>` to a real absolute path (expand `${CLAUDE_PLUGIN_ROOT}`) — a subagent cannot expand the variable.

### Model spread (do this by default)

| Persona | File | Suggested model |
|---|---|---|
| O Arquiteto | `o-arquiteto.md` | opus |
| O Lazy GM | `o-lazy-gm.md` | sonnet |
| O Showrunner | `o-showrunner.md` | opus |
| O Jogador | `o-jogador.md` | sonnet |
| O Dramaturgo | `o-dramaturgo.md` | opus |

Pass the model via the Agent call's `model` parameter, and **record which model each critic ran on** — it goes in the report header and in the methodology footer.

**Why spread at all.** The published failure mode of judge panels is *correlated error*: nine judges on similar models were measured to carry roughly two independent votes' worth of information, because they make the same mistakes on the same items. Personas on a single model share that ceiling. Varying the model is the one lever that buys real independence rather than the appearance of it. The spread above is a default, not a rule — if the run must be cheap, put every critic on the same model and **say so in the footer**, because the panel's claim to breadth weakens with it.

Adjust the spread toward the GM's stated worry: if they are worried about conducting, give O Jogador the stronger model.

## Step 4 — Verify citations before synthesizing

The single most valuable check in the whole pipeline, and it is nearly free.

For each critic report, take the distinctive fragment of each quoted passage and `grep -F` it against the packet file:

```bash
grep -c -F "a fragment of the quoted text" <vault>/_criticas/packet-<slug>-<date>.md
```

- **Found** → the citation is grounded. Nothing to do.
- **Not found** → the quote is not in the packet. Do **not** silently repair it and do not go find a real quote that would support the claim. Strike that finding from the report, and note the strike in the methodology footer ("N findings were dropped for unverifiable citations").

Spot-check at minimum every finding rated **concerning**, plus every quote that appears in the executive synthesis. Check all of them when the report is short enough to allow it. A fabricated citation is the one failure that discredits everything else in the document, so this check is not optional.

Also check for **lane bleed**: a critic rating criteria that are not in its rubric, or repeating another critic's observation verbatim. Fold those into Deferred rather than counting them as an independent voice — the whole point of five lenses is that they are looking at different things.

## Step 5 — Handling a critic that comes back wrong

- **No citations anywhere** → re-spawn that persona once, naming the violation explicitly ("your previous report contained ratings with no verbatim quotes; every rating needs one or the rating is 'insufficient evidence'"). Once. If the second attempt is no better, include what is salvageable and say in the footer that this seat is under-evidenced.
- **Wrote replacement lore instead of fixes** → keep the diagnosis, drop the generated fiction. This plugin does not write campaign content.
- **Rated everything strong** with thin evidence → treat as sycophancy, re-spawn once with the failure tells emphasized. If it comes back the same and the evidence genuinely supports it, report it as it stands — a good campaign is allowed to review well.
- **A seat fails entirely** → run with four and name the missing seat in the header. Do not silently ship a four-critic panel as a five-critic panel.

## Cost and time expectations

A full panel is one librarian pass over the vault plus five independent reads of the packet. On a scope of two sessions plus their artifacts, expect a few minutes and a real token cost. This is why the interview narrows the scope first — and why the panel is not the tool for "is this one NPC any good?", which is a question you can answer in the main conversation without convening anyone.
