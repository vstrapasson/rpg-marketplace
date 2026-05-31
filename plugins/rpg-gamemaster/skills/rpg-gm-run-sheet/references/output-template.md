# Output Template (gm-run-sheet)

The markdown skeleton for a GM run sheet. Both versions share the six-section structure; **Compact** is the one-page table reference; **Full** adds context notes, a discovery read-aloud for the keystone revelation, expanded NPC notes, and a post-session reminder.

Filename: `run-sheet-<slug>.md` (e.g., `run-sheet-session-07.md` or `run-sheet-the-harbor-job.md`).

**No Persist block.** This skill writes no vault entities and does not call `rpg-preserve`. The run sheet is an ephemeral table aid — not canonical campaign state. When the session ends, use `rpg-session-prep` and `rpg-front-tracker` to record what happened and advance the clocks.

---

## Skeleton (both versions)

```markdown
# GM Run Sheet — [Session Name / Slug]
*Run overlay — Pathfinder 2e kit · Tone: [inherited level N] · Session date: [YYYY-MM-DD]*

> Tool-agnostic table aid — no initiative, dice, or tokens. Keep this open next to your VTT or on the table.

---

## Strong Start

> **Read-aloud / Para ler à mesa:**
> *[~40–70 words. Sensory, concrete. The opening image derived from the session-prep one-pager or the world's next move. End open — trail off on something the players will want to act on immediately. Never narrate what the PCs do or feel.]*

---

## Scene Beats

*Situations that might arise this session — not a sequence, not a script. Tick when resolved; the rest stay live.*

- ☐ [Scene beat 1 — one line: the situation and what triggers it]
- ☐ [Scene beat 2]
- ☐ [Scene beat 3]
- ☐ [Scene beat 4 — optional]
- ☐ [Scene beat 5 — optional]

---

## Secrets and Clues — Tick as They Surface

*Keyed to the clue map's revelation IDs. Tick each clue when the players find it. Tick ★ when the revelation is reached (all clues found, or backstop fired).*

| ★ | R-ID | The truth (one line) | ☐ Clue 1 | ☐ Clue 2 | ☐ Clue 3 | Backstop |
|---|---|---|---|---|---|---|
| ☐ | R1 | [one-line label of what the players learn] | ☐ [clue short label] | ☐ [clue short label] | ☐ [clue short label] | [backstop trigger — one phrase] |
| ☐ | R2 | [...] | ☐ [...] | ☐ [...] | ☐ [...] | [...] |
| ☐ | R3 | [...] | ☐ [...] | ☐ [...] | ☐ [...] | [...] |

*Carry-forward: any revelation from a prior session that went unrevealed appears here too. The clue map is the ledger; this is the live view.*

---

## NPC Quick-Refs

*Exact vault names only. One line per NPC — reach for this when they open their mouth.*

| Name | Want (right now) | Voice line |
|---|---|---|
| [Exact Vault Name] | [what they want in this session, one phrase] | *"[one quoted sentence in their register]"* |
| [...] | [...] | *"[...]"* |

---

## Clocks Dashboard

*Active progress clocks. The filled bar shows where the danger stands; the next portent is what fires if the players do nothing before next session.*

| Clock (relogio) | Filled | Next portent — fires if unchecked |
|---|---|---|
| [Clock Name] | ●●●○○○ (3/6) | [one-line portent: what happens next, stated diegetically] |
| [Clock Name] | ●●○○ (2/4) | [...] |

*Full the clock = impending doom arrives. See the active `frente` note for the doom text.*

---

## If They Stall — Backstops

*Each backstop is tied to a grim portent on an active clock. If the table loses momentum, fire one. The world acts; this is not a rescue.*

1. **[Clock name] portent [N]:** [What happens — one concrete sentence. The antagonist makes a move, a person walks in, an event arrives. Diegetic, not deus ex machina.]
2. **[Clock name] portent [N]:** [...]
3. **[Clock name] portent [N]:** [...] *(optional third)*

---
```

---

[FULL ONLY from here ↓]

```markdown
## Scene Notes (Full)

*Extra context per beat — what makes each scene interesting, what the NPC wants in it. Compress to one-liners for Compact.*

**[Scene beat 1]:**
[2–3 sentences: the situation's tension, who is in play, what the stakes are for the players if they engage or disengage.]

**[Scene beat 2]:**
[...]

---

## Discovery Read-Aloud (Full — keystone revelation only)

*One optional block for the most evocative revelation of the session — how the clue reads when the PCs find it. ~30–50 words. The thing itself, not its meaning. Never narrate the PCs' deduction.*

> **Read-aloud / Para ler à mesa:**
> *[The clue — the ledger entry, the body's detail, the overheard sentence. Sensory and specific. End on the clue, open.]*

*(Only one per run sheet. Only for the most pivotal revelation. Most sessions: omit.)*

---

## NPC Notes (Full)

*Expanded quick-refs. Compress to voice line + want for Compact.*

| Name | Want | Voice line | Mannerism / pressure point |
|---|---|---|---|
| [Exact Vault Name] | [...] | *"[...]"* | [one tell or pressure point — what shifts their behavior] |

---

## Post-Session Reminder (Full)

*After the session ends — do not use during play.*

- Advance clocks: which `relogio` notes to update via `rpg-front-tracker` (portents fired this session)
- Record the session: update the `sessao` note body via `rpg-session-prep` (what happened, revelations reached, quests resolved)
- Carry forward: which R-IDs went unrevealed — add to the next run sheet's checklist

*(This reminder is for the GM only — it does not appear in Compact output.)*
```

---

## Section-by-section guidance

### Strong Start
Inherit directly from the session-prep one-pager's read-aloud block. If none exists, derive a ~50-word sensory block from the "world's next move" beat on the most-advanced active front. Never write a fresh one from scratch — the strong start must be grounded in the world state, not invented.

### Scene Beats
Compress the session-prep's "potential scenes" to one-line situations. Each beat should be stateable as: *if [trigger], then [situation unfolds]*. Not a sequence — the players can reach them in any order or skip some entirely.

### Secrets and Clues Checklist
Pull R-IDs and clue labels directly from the clue map. Include only the revelations the session-prep identified as live this session, plus any unrevealed ones carried forward from prior sessions. Keep labels short (three to six words) so the table is readable mid-session. The backstop column holds the one-phrase trigger for the proactive push if all placed clues are missed.

### NPC Quick-Refs
Derive the voice line from the NPC's vault note (a direct quote if one exists, or a line in their register if not). The "want" is what they want *in this session* — it may differ from their long-term motivation. Keep the table to three to five NPCs max for Compact; more crowds the page.

### Clocks Dashboard
The filled bar: use filled circles (●) and empty circles (○) to show progress visually, followed by (n/segments) in parentheses. Derive the "next portent" text from the `relogio` note's grim portents list — the next unfired one. State it diegetically: what happens in the world, not "clock advances."

### If They Stall — Backstops
Tie each backstop to a specific portent on a specific clock. One concrete image of what the world does. Three backstops is usually enough for one session; two is fine; one is the minimum. These are not GM fiat — they are the world pressing forward on its own timeline.

## Length targets

| Section | Compact | Full |
|---|---|---|
| Strong start | one read-aloud block | same |
| Scene beats | 3–5 one-liners | + 2–3 sentences each |
| Secrets/clues checklist | all live R-IDs + tick boxes | same |
| NPC quick-refs | name/want/voice table | + mannerism/pressure point |
| Clocks dashboard | filled bar + next portent | same |
| Stall backstops | 2–3 one-liners | same |
| Discovery read-aloud | — | one block, keystone only |
| Post-session reminder | — | included |

Target: Compact fits one printed page. Full fits two pages.
