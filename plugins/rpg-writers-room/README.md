# rpg-writers-room

The **critique layer** of the RPG marketplace. Loremaster *authors* the world, gamemaster *preps and runs* it, vault-guardian *validates and stores* it, foundry-forge *realizes* it — and this plugin **judges how good it is**, and tells you what to do about it.

It convenes a **panel of five expert critics** over a campaign you have already built and partly played, and returns a self-contained **HTML report**: what the room agreed on, where it split, and a prioritized list of constructive fixes — every claim anchored to a quote you can go check.

```
  VAULT (the contract)                THIS PLUGIN                          OUTPUT
  ────────────────────                ───────────                          ──────
  lore, npcs, faccoes,  ──read──▶ rpg-lore-librarian ──packet──▶ 5 × rpg-critic ──▶ synthesis ──▶ _criticas/
  locais, atos, bible                (one citable brief)         (parallel, mixed     (tiers +      critica-<slug>.html
  sessoes/transcricoes/ ──read──▶                                 models, per-lens     tensions)
       (the conducting evidence)                                  rubrics)
```

## Two evaluations, two sources, two rubrics

The idea the whole plugin turns on: a campaign is **two objects**, and most reviews only look at one.

| | Judged from | Question |
|---|---|---|
| **The artifacts** | the vault notes | is the *writing* good? |
| **The conducting** | the **session transcripts** | did the GM *run it* well? |

They come apart constantly — a beautiful dossier that never surfaced in play, a thin note run brilliantly. **Prep quality is not conducting quality.** If there are no transcripts in scope, conducting is reported as *not judged*, never inferred from the prep.

## The panel

| Persona | Lens | Judges |
|---|---|---|
| **O Arquiteto** | the Alexandrian — node connectivity, the Three Clue Rule, situations not plots | artifacts + conducting |
| **O Lazy GM** | Sly Flourish — did the prep serve the play, was it usable at the table | conducting + usability |
| **O Showrunner** | Colville — factions orthogonal, villains arguable, NPCs with wants and contradictions | NPCs, factions, cities |
| **O Jogador** | the player advocate — agency, spotlight, pacing, memorability | conducting + what landed |
| **O Dramaturgo** | theme and tone — pillars recurring, escalation, tone held, setup paid | lore/arc + conducting |

The critics are the same design authorities the rest of the kit is built on, so the review is aligned with how the content was made. Each rubric names **what strong looks like, the explicit failure tells, and what is not its lane** — lane separation is what keeps five reports from collapsing into one.

## Philosophy

- **A room, not an oracle.** Panels of LLM judges look like juries but lose most of their nominal independence to *correlated error* — nine judges have been measured as carrying about two independent votes. Five personas on similar models share that ceiling. So this plugin sells **coverage, not consensus**: agreement raises *salience*, never *confidence*, and the report's methodology footer says so in plain language. Critics run on **mixed models** by default, because varying the reasoning is the only lever that buys real independence.
- **Evidence or it did not happen.** Every rating carries a verbatim quote plus a vault path or a transcript timecode. The orchestrator then **greps each quote against the packet** — anything unverifiable is *struck*, not repaired. A criterion the evidence cannot support is rated **insufficient evidence**, which is a correct answer, not a failure.
- **Negative criteria, on purpose.** Rubrics with only positive criteria get rubber-stamped; each criterion here names its failure tells so "weak" has a definition.
- **Disagreement is the product.** Genuine trade-offs are handed to the GM as choices with both sides argued, never averaged, never silently resolved.
- **No scores. Ever.** No numbers, grades, or percentages anywhere in the report — they imply a precision this method does not have.
- **Constructive by contract.** Cited strengths, concrete fixes, rigorous *and* kind. No vague praise, no dunking, no performed severity.
- **Critique only.** It never generates campaign content, never edits a vault note, and never touches Foundry or MCP. Vault in, report out.

## What is inside

| Kind | Name | Role |
|---|---|---|
| skill | `rpg-critique` | orchestrator — scopes the review, dispatches the librarian, fans out the critics, verifies citations, synthesizes, renders the HTML |
| agent | `rpg-lore-librarian` | reads the vault and the transcripts, produces one self-contained, fully citable evaluation packet |
| agent | `rpg-critic` | one seat, parameterized by persona — spawned five times in parallel |
| references | `personas/*.md` | the five rubrics (add a lens by adding a file, not an agent) |
| references | `panel-protocol.md`, `synthesis-model.md`, `co-creation.md`, `output-template.md`, `report-template.html` | dispatch, synthesis, the scoping interview, and the report |
| command | `/rpg-writers-room-help` | the guide |

## Prerequisites

- An Obsidian vault following the `rpg-vault-guardian` schema (`regioes/`, `npcs/`, `faccoes/`, `locais/`, `sessoes/`, …). Run Claude Code from the **vault root**.
- A `campaign-bible-<slug>.md` — the campaign's declared intent is the yardstick every critic judges against. Without it the panel falls back to inferring intent, and says so.
- **Session transcripts** in `sessoes/transcricoes/` for the conducting half. `.srt` is preferred over `.txt` — timecodes make citations checkable. Without transcripts the plugin runs artifacts-only.
- `rpg-vault-guardian` only if you want the optional summary note persisted (it goes through the `rpg-preserve` write gate). The report itself is a loose file and needs nothing.

## Install

```
/plugin marketplace add ~/projects/rpg-marketplace
/plugin install rpg-writers-room@rpg-marketplace
/reload-plugins
```

## Use

From the vault root:

```
"avalie minha campanha"          → the full panel, scope negotiated first
"como foi minha condução?"       → conducting-weighted, from the transcripts
"critique meus NPCs do Ato II"   → narrow scope, all five lenses still run
/rpg-writers-room-help           → the guide
```

The scoping interview runs first, always — the most expensive mistake here is five critics pointed at the wrong scope. Expect a few minutes and a real token cost for a full panel; that is why narrow scopes produce better reports.

## Output

Everything lands in `_criticas/` at the vault root (a loose folder the guardian's validator does not walk):

- `critica-<slug>-<date>.html` — the deliverable. Self-contained, printable, dark-parchment styling, collapsible per-critic cards.
- `packet-<slug>-<date>.md` — the evaluation packet, kept as the audit trail every citation can be checked against.

Reports are never overwritten. Keeping them is how you see whether the next one improves.

## Not this plugin

- **Consistency auditing** — names that drifted, dangling references, tone drift against the bible → `rpg-campaign-reviewer` (loremaster). It checks *coherence*; this checks *quality*. Siblings, not substitutes.
- **Vault integrity** — broken links, schema errors, orphans → `rpg-audit` (vault-guardian).
- **Fixing what it finds** — a weak NPC gets a critique here and a rebuild in `rpg-npc-creator`. The critics suggest; they never write replacement lore.
- **Recording what happened** — `rpg-session-recap` (gamemaster). Run it *before* a review so the vault reflects the sessions being judged.

## Sources

- Panel of LLM evaluators — [Replacing Judges with Juries](https://arxiv.org/abs/2404.18796) (PoLL); the correlated-judges caveat, [Nine Judges, Two Effective Votes](https://arxiv.org/abs/2605.29800); rubric-grounded, evidence-anchored evaluation ([From Rubrics to Reliable Scores](https://arxiv.org/abs/2601.08654)).
- GM-craft rubrics — The Alexandrian (node-based design, the Three Clue Rule, "don't prep plots"), Sly Flourish (the Lazy DM's eight steps), Matt Colville (factions and villains), and the kit's own dark-leaning tone discipline.
