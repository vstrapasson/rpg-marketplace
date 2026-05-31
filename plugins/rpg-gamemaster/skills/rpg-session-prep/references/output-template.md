# Output Template

The markdown skeleton for a session one-pager. Both versions share the structure; **Compact** is the runnable table artifact, **Full** adds the complete eight-step output, discovery read-aloud for keystone secrets, and handoff notes for missing nodes.

Filename convention: save the session plan as `session-prep-<slug>.md` (e.g., `session-prep-the-harbormaster-gambit.md`) in the user's working folder. Tell the user the path. The vault `sessao` entity is persisted separately via rpg-preserve — the session plan is the GM-facing human document; the vault entity is the machine-readable state.

---

## Skeleton (both versions)

```markdown
# Session Prep — [Session Title or Arc Name]
*Session layer — Pathfinder 2e kit · Tone inherited: [level N] · Act: [current act] · Planned date: [YYYY-MM-DD]*

> **Thread:** [which front/quest/investigation this session advances]
> **Carry-forward secrets:** [R-IDs still unrevealed from prior sessions]

---

## 1 — Strong Start

> **Read-aloud / Para ler à mesa:**
> *[~40–70 words. Sensory, concrete, present-tense. Never narrate the PCs. End open on something the players want to act on. Derived from the world-state — what the fronts/clocks produced since last session.]*

**What happened off-screen:** [1–3 sentences — the world move that sets up the opening; which portent fired, which clock ticked, which NPC made their move. GM context, not read-aloud.]

---

## 2 — Secrets & Clues (the spine)

Live secrets this session — keyed to the clue map's revelation IDs. Carry forward any unrevealed R-IDs from prior sessions.

| R-ID | Secret (what the players can discover) | Delivery path (scene/NPC/location) | Backstop (if missed) |
|---|---|---|---|
| R[n] | [one plain line — the truth, not the delivery] | [which scene or NPC holds it] | [what comes to the players if they miss it — tied to a clock/portent] |
| R[n] | [...] | [...] | [...] |
| R[n] (carry-forward) | [...] | [...] | [...] |

*Tick each R-ID in the clue map after the session if revealed. If missed, carry forward to the next session's prep.*

---

## 3 — Potential Scenes

Three to five situations that might arise — **not a timeline**. The players may hit all of them, some of them, or create one you didn't anticipate.

### [Scene Name — e.g. "The New Harbormaster"]
- **Situation:** [one sentence — the unstable configuration: what's at stake, who's in play]
- **Location:** [[Vault Name]] — [one or two sensory details]
- **NPCs:** [[Name]] — [what they want right now]
- **Secret live here:** R[n] — [how it can surface in this scene]
- **If combat:** flag → `rpg-encounter-builder` ([threat level, creature type])

### [Scene Name]
[same structure]

### [Scene Name]
[same structure]

[+ 1–2 more optional scenes for Full]

---

## 4 — NPCs in Play

The three most important NPCs this session.

| Vault name | What they want right now | Voice line / mannerism |
|---|---|---|
| [[Name]] | [verb phrase — immediate goal] | *"[one quoted sentence]"* or [one physical tic] |
| [[Name]] | [...] | [...] |
| [[Name]] | [...] | [...] |

---

## 5 — Threats

| Name / type | Level | Role | Notes |
|---|---|---|---|
| [[Vault name]] or [type] | [level] | [lurker/brute/controller/etc.] | [flag for rpg-encounter-builder if needed] |

---

## 6 — Rewards

- **XP:** [milestone / flat award] — if the players [specific achievement]
- **Items:** [[Vault name]] — [context; or flag for a new `item` candidate via rpg-preserve]
- **Quest resolution:** [[Quest vault name]] — [completes / advances to next stage]
- **Revelation as reward:** R[n] — finding this out is the payoff for [scene/investigation thread]

---

## If They Stall — Backstops

These advance the world when the players pause; each is diegetic (tied to a clock tick or a grim portent), not a rescue.

1. [Clock X ticks: portent Y fires — describe what the players witness or learn about. Tie to an R-ID backstop above.]
2. [NPC Z arrives / makes a move — the world presses forward regardless.]
3. [An event the players can't ignore — not a forced scene, a new pressure.]
```

---

## Persist

This section is **not** part of the session-plan document above — it is a separate instruction to route the candidate to rpg-preserve after the GM has reviewed the plan.

Hand this candidate to **rpg-preserve** (never write the file directly):

### `sessao` candidate — [Session Title]

```
type: sessao
date: YYYY-MM-DD
act: "[[Act Vault Name]]"
quests:
  - "[[Quest Vault Name 1]]"
  - "[[Quest Vault Name 2]]"
events:
  - "[[Event Vault Name]]"    ← optional; omit if no evento entity exists yet
players_present:
  - "[[Jogador Vault Name]]"    ← optional; jogador entity in jogadores/; omit if none yet
```

*The one-pager content lives as the note body (after the frontmatter) in the vault `sessao` entity. Paste the session-plan markdown as the body when routing to rpg-preserve.*

*The `date` field is the planned session date (YYYY-MM-DD). Update after the session if the date changes.*

---

## Full additions

The **Full** version adds these sections after the Stall Backstops and before Persist:

### Character Review Notes (Full)
One bullet per PC — what they want right now, any personal thread from last session worth touching.

### Location Details (Full)
For each location named in the scenes: one paragraph — sensory qualities, what's changed since the PCs last visited, one interactive detail.

### Secrets Reasoning (Full)
For each live R-ID: why it's reachable this session, which scene or NPC carries it, what the delivery looks like if the players engage. This is GM-facing reasoning, not read-aloud.

### Advance-Log Cross-Reference (Full)
Which front drove the strong start, which portent fired, what the clock state was when prep began. Lets the GM know which `frente`/`relogio` needs to be updated via rpg-preserve after the session.

### Keystone Secret — Discovery Read-Aloud (Full, opt-in)
For the single most evocative secret on this session's list: a ~30–50 word sensory block describing how it reads when the PCs find it. The clue itself — not its meaning. Mark it **Read-aloud** (PT-BR: **Para ler à mesa**).

### Handoffs (Full)
Missing nodes that blocked session prep — route to the appropriate skill before the next session:

- → `rpg-npc-creator` (loremaster): [any NPC named in scenes that has no vault note]
- → `rpg-location-creator` (loremaster): [any location named in scenes that has no vault note]
- → `rpg-faction-creator` (loremaster): [any faction plan needed that hasn't been authored]
- → `rpg-front-tracker` (gamemaster): [any front not yet bootstrapped or advanced for this session]
- → `rpg-encounter-builder` (gamemaster): [any scene flagged for encounter math]
- → `rpg-clue-mapper` (loremaster): [if a new revelation should be added to the clue map]

---

## Section-by-section guidance

### Strong Start (both versions)
Derive from the vault state — the "what the world did since last session" beat from `rpg-front-tracker`. Do not invent fresh. The read-aloud lands the sensory image; the "what happened off-screen" line gives the GM context. Keep them distinct — the read-aloud is for the players; the off-screen note is for the GM.

### Secrets & Clues (both versions)
The heart of the plan. **Carry forward unrevealed R-IDs.** Mark carry-forwards clearly. For each live secret: name the delivery path (which scene, which NPC) and the backstop (what comes to the players if they miss it this session). The backstop is the Alexandrian's guarantee — the investigation never dead-ends.

### Potential Scenes (both versions)
Situations, not events. Label them by the situation's core tension ("The New Harbormaster"), not by a presumed outcome ("The Players Confront the Harbormaster"). Each scene should be enterable from multiple angles and should not depend on the previous scene having resolved a certain way.

### NPCs in Play (both versions)
Three is the right number for a Compact plan. More than five and the GM can't hold them live at the table. Each entry is a *prep prompt*, not a biography — vault name, immediate goal, one voice anchor. The full dossier is in the vault note; this is the reference the GM glances at mid-session.

### Persist (both versions)
Always include this block. The session plan is the human document; the vault `sessao` entity is the machine-readable state. Without the Persist block, the session exists only in the working folder and can't be cross-referenced by future skills (run-sheet, advance log, next session's carry-forward).

---

## Length targets

| Section | Compact | Full |
|---|---|---|
| Strong Start | read-aloud + off-screen note | + character review notes |
| Secrets & Clues | live R-IDs + backstops | + secrets reasoning per R-ID |
| Potential Scenes | 3–5 situations | + location details |
| NPCs, Threats, Rewards | compact rows | + discovery read-aloud (opt-in) |
| Stall Backstops | 2–3 bullets | + advance-log cross-reference |
| Handoffs | — | included |
| Persist | included | included |
