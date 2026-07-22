# Output Template — the deliverable

> Load this when the synthesis is done and it is time to write. Two outputs: the **HTML report** (the artifact) and the **conversational handoff** (what you say when you hand it over).

## Where things get written

All of it goes in `_criticas/` at the vault root — a loose working folder, not a vault entity folder. The guardian's validator walks only known entity folders, so nothing here is ever flagged as a schema violation, and no `rpg-preserve` call is needed for loose files.

| File | What it is |
|---|---|
| `_criticas/packet-<slug>-<YYYY-MM-DD>.md` | the librarian's evaluation packet — kept, because it is what every citation can be checked against |
| `_criticas/critica-<slug>-<YYYY-MM-DD>.html` | **the deliverable** |
| `_criticas/critica-<slug>-<YYYY-MM-DD>-sala.md` | optional — the five raw critiques, if the GM wants the unsynthesized room |

`<slug>` is the campaign slug used elsewhere in the vault (the one in `campaign-bible-<slug>.md`). If a report for the same campaign and date already exists, append `-2`; never overwrite a previous review — the point of keeping them is seeing whether the next one improves.

## Filling the HTML template

Copy `references/report-template.html`, then:

1. **Replace every `{{PLACEHOLDER}}`.** A placeholder left in the shipped file is a bug.
2. **Clone the blocks marked `REPEAT`** as many times as needed; delete the ones you did not use.
3. **Delete every HTML comment**, including the header comment, before writing the final file.
4. **All visible text is in the user's language** — headings, labels, ratings, the methodology paragraph. Class names and placeholders stay in English. Keep PF2e canon names in English; any Archives of Nethys link must be category-level, never a `?ID=` deep link.
5. **Rating classes** map to the ordinal scale: `r-strong`, `r-adequate`, `r-weak`, `r-concerning`, `r-none` (insufficient evidence). The *label* text is translated; the class is not.
6. **Quotes stay verbatim** in `<blockquote>`, with their citation in the `<span class="cite">`. Never edit a quote to read better.
7. **Never emit a number, grade, percentage, or star rating** anywhere in the document.
8. **Self-contained:** inline CSS only. No external fonts, scripts, images, or trackers — the file must open correctly from a vault folder with no network.

### Suggested label set (translate as needed)

| Placeholder | English | Portuguese |
|---|---|---|
| `{{LABEL_SYNTHESIS}}` | Executive synthesis | Síntese |
| `{{LABEL_AGREED}}` | What the room agreed on | O que a sala concordou |
| `{{LABEL_TENSIONS}}` | Where the room split | Onde a sala divergiu |
| `{{LABEL_ACTIONS}}` | Prioritized actions | Ações priorizadas |
| `{{LABEL_ASPECTS}}` | Per-aspect verdicts | Veredito por aspecto |
| `{{LABEL_THE_ROOM}}` | The room | A sala |
| `{{LABEL_NOT_JUDGED}}` | not judged | não avaliado |
| `{{LABEL_METHOD}}` | About this report | Sobre este relatório |
| rating labels | strong / adequate / weak / concerning / insufficient evidence | forte / adequado / frágil / preocupante / sem evidência |
| tier labels | corroborated / convergent / single-lens | corroborado / convergente / lente única |

## The methodology footer (mandatory)

Never ship without it, never soften it, never move it above the report. Write it in the user's language; this is the model:

> **About this report.** This is a room of expert perspectives, not a score. Five personas read the same evidence through deliberately different lenses and rated it against explicit rubrics, and every claim here is anchored to a quote you can go check. What that buys is *coverage* — five angles catch more than one does. What it does not buy is statistical independence: personas built on similar models tend to make similar mistakes, so agreement between critics means an issue was visible from several angles, not that it is certainly true. Read it as a well-argued writers' room whose disagreements are the most interesting part, and keep the parts you find persuasive.

Then the run details, in a second paragraph:

> Panel: [persona — model, ×5]. Scope: [...]. Evidence: [N artifacts, N sessions, N transcript excerpts] — packet at `_criticas/packet-….md`. [N findings were dropped because their citations could not be verified against the packet.] [Conducting was not judged: no transcripts in scope.]

Both bracketed sentences are included only when true — and when they are true, they are not optional.

## The conversational handoff

After writing the file, say roughly this — short, in the user's language:

1. **Where the report is**, one line.
2. **The single most important thing the room found**, with its quote. Not a summary of all five critics.
3. **The sharpest disagreement**, framed as the GM's choice.
4. **What was not judged**, if anything was not.
5. **What next** — offer to work through the prioritized fixes, run a narrower panel on one aspect, or persist a summary to the vault. Then stop.

Do not paste the whole synthesis into chat. The report is the artifact; the message is the doorway.

## Optional vault persistence

Only if the GM asks. A short summary can be persisted as a `lore` entity through the **`rpg-preserve` skill** — never by writing the entity file directly, and never by importing guardian code.

```
type: lore
status: active
tags: [critica, revisao]
```

Body: the one-line verdict per aspect, the prioritized actions, and a link to the HTML report. Keep it short — the report is the record; the note is a pointer so future sessions can find it.

**The HTML report and the packet are loose files and never go through `rpg-preserve`.** Only the optional `lore` note does.
