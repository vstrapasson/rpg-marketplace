---
name: rpg-gm-run-sheet
description: Produces a compact tool-agnostic GM run sheet for during play — the narrative and discovery overlay a VTT does not give you. It stitches the session-prep one-pager, the clue map, and the active fronts and clocks into a single page the GM glances at mid-session — the strong start, the scene beats, a secrets-and-clues checklist keyed to revelation IDs to tick as they surface, NPC quick-refs with a voice line and a want, the clocks to advance, and the if-they-stall backstops that push a grim portent. No initiative, dice, or tokens — the table or VTT owns runtime mechanics. Printable markdown usable next to any VTT or at a physical table. Use for a run sheet, a play aid, a cheat sheet for the session, rodar a sessao, folha de mesa, o que acompanhar durante o jogo. Tone inherited from the campaign, default dark-leaning.
---

# RPG GM Run Sheet (Pathfinder 2e kit — the table overlay)

## What this skill is for

Produce a **compact, printable GM run sheet** for use *during* play — the narrative and discovery overlay that a VTT does not give you. This is the skill you reach for when you are sitting down to run, not when you are still preparing.

This is the **read-out** of the other three gamemaster skills. It stitches the session-prep one-pager, the clue map (revelation IDs), and the active fronts and clocks into one page: the strong start, the scene beats, a secrets-and-clues checklist you tick as revelations surface, NPC quick-refs (voice line + want), the clocks to advance, and the "if they stall" backstops that push a grim portent.

The run sheet handles **narrative and discovery state only**. It does not own initiative, dice, tokens, or encounter mechanics — the table or your VTT handles all of that. The run sheet is the overlay you keep open beside your VTT, or print and set on the table.

## The core idea — assembly, not generation

Every other skill in the gamemaster kit *builds* something: a session plan, an advancing world, a balanced encounter. **This one does not generate new fiction or invent world content.** It *reads* what already exists and compresses it into the GM's live table reference.

If the session-prep one-pager is the planning document, the run sheet is the **field notes** — the stripped-down version you actually glance at in the middle of a scene.

**This skill also does not write to the vault.** The run sheet is an ephemeral table aid, not canonical campaign state. It is saved as a loose `run-sheet-<slug>.md` in the working folder — not routed through `rpg-preserve`, not committed as a vault entity. When the session ends and the dust settles, the *sessao* note (written by `rpg-session-prep`) is the canonical record. The run sheet is disposable.

## When to use this skill — and when not

**Use for:**
- Sitting down to run a session and wanting one page to glance at during play
- Compressing a full session-prep one-pager to a mid-session reference ("folha de mesa", "o que acompanhar durante o jogo", "rodar a sessao")
- Needing a checklist to tick as clues and revelations surface at the table
- Any VTT or physical table — the run sheet is tool-agnostic

**Do not use for:**
- **Preparing a session** — that is `rpg-session-prep`, which produces the planning artifact this skill reads
- **Advancing the fronts or clocks** — that is `rpg-front-tracker`; run it before or after the session, not during
- **Building or balancing an encounter** — that is `rpg-encounter-builder`; the run sheet names threats, it does not balance them
- **Generating new world content** — if a needed NPC, location, or front does not exist in the vault, stop and hand off to the relevant creator skill; do not invent

## Inputs — what to read

Read these in order. The skill cannot assemble a run sheet without the first two; the rest are enrichment.

| Source | What you need | How to find it |
|---|---|---|
| Session-prep one-pager or `sessao` note body | Strong start, scene beats, NPCs in play, rewards — the session's shape | Glob `sessoes/` → sort by date → Read the latest; or read a `session-prep-*.md` if one exists in the working folder |
| `clue-map-*.md` | Revelation IDs (R1, R2…) and their short labels — especially the ones live this session | Glob `clue-map-*.md` at the vault root |
| Active `frente` notes | Impulse, impending doom, status — the world's pressure | Glob `frentes/` → Read by exact name |
| Active `relogio` notes | Segments, filled count, next portent — which clocks are close to doom | Glob `relogios/` → Read by exact name |
| `npc` notes (the ones in play) | Voice line and want — one sentence each | Glob `npcs/` → Read by exact name for each NPC named in the session plan |

**Read by exact canonical name.** A mismatched name is a broken vault link — if you can not match an NPC or location to an exact note, flag it instead of inventing.

## The run-sheet contents

The output has six sections. Each section is lean — the run sheet fits one printed page (Compact) or two pages (Full).

### 1. Strong start
The opening image, read-aloud or paraphrased. Derived directly from the session-prep one-pager or the "world's next move" beat from `rpg-front-tracker`. A single sensory block (~40–70 words) that drops the table into the session immediately. Mark it **Read-aloud** (PT-BR: **Para ler à mesa**).

### 2. Scene beats
A short checklist of the three to five situations that might arise this session — not a script, not a sequence. Each is one line: the situation and who or what triggers it. The GM glances at this when the table pauses. Check a beat when it resolves; the remaining ones are still live.

### 3. Secrets and clues checklist (keyed to R-IDs)
The heart of the run sheet. For each revelation live this session: the R-ID, a one-line label of the truth, and a tick box (☐) for each placed clue — the GM ticks a clue when the players find it. When all three clues on a revelation are ticked (or the backstop fires), the revelation is reached.

This is a **carry-forward ledger**: unrevealed revelations from last session appear here too. The clue map is the source of truth; the run sheet is the live view of it.

### 4. NPC quick-refs
A small table: name, what they want right now, one voice line (a single quoted sentence in their register). Nothing more. This is what the GM reaches for when the NPC opens their mouth. Use exact vault names.

### 5. Clocks dashboard
The active `relogio` notes compressed to a table: clock name, segments/filled (e.g. ●●●○○○ for 3/6), and the next portent — the one concrete thing that fires if the players do nothing before next session. The GM glances at this when deciding how hard the world presses.

### 6. "If they stall" backstops
One to three proactive pushes — each tied to a grim portent on an active clock. If the players lose momentum, one of these fires: a person walks in, an event arrives, the antagonist makes a visible move. Each backstop should feel diegetic (the world acting) rather than a rescue.

## Output — a loose, printable file

Save as `run-sheet-<slug>.md` in the working folder (same folder as the session-prep one-pager or the vault root). Tell the user the path.

**This skill does NOT route anything to `rpg-preserve`.** Unlike the other gamemaster skills, the run sheet emits no vault entities. There is no Persist block. The run sheet is an ephemeral table aid — it is not canonical campaign state, and `rpg-preserve` should not be invoked here. When the session ends, the GM updates the `sessao` note (via `rpg-session-prep`) and advances the clocks (via `rpg-front-tracker`); that is when vault writes happen.

**Match the user's language** in the entire output, including headings. Keep PF2e canon proper names (deities, ancestries, creatures, traits, planes) and AoN category-level URLs in English — they are anchors to the Archives of Nethys, which is English-only. AoN links are category-level only (`/Creatures.aspx`, `/Deities.aspx`) — never `?ID=` deep links.

## Compact vs. Full

- **Compact:** one page — strong start (read-aloud) · scene beats checklist · secrets/clues checklist (R-IDs + tick boxes) · NPC quick-refs table · clocks dashboard · stall backstops. The GM's live table reference. No extra prose.
- **Full:** adds short context notes per scene beat (what makes it interesting, what the NPC wants here), discovery read-aloud for the most evocative revelation of the session, expanded NPC notes (mannerism, pressure point), and a brief post-session reminder of which clocks to advance after the session ends.

See `references/output-template.md` for the skeleton.

## Co-creation intake

This skill is mostly mechanical assembly — the inputs already exist, and the co-creation is light. Run the front-end in `references/co-creation.md`: confirm which session, confirm the inputs exist (session-prep one-pager or latest sessao, clue map, active fronts), and offer to assemble. If an input is missing, surface that early rather than assembling a partial run sheet without saying so.

## Coherence — what matters most

A run sheet coheres when:

1. **Every secret on the checklist is reachable this session** — it has a scene or NPC it could surface through. A secret with no delivery path should be marked as backstop-only.
2. **Every NPC name is exact** — if a name does not match a vault note, flag it rather than guessing.
3. **The strong start is derived**, not invented — it comes from the session-prep one-pager or the world's next move beat, not a fresh idea.
4. **The run sheet fits the table** — one page Compact, two pages Full. If it is longer, trim.

## What to avoid

- **Generating world content.** If a node is missing, say so and hand off. Do not invent an NPC or location.
- **Writing vault entities or routing to rpg-preserve.** This skill writes nothing canonical.
- **Encounter mechanics.** No initiative order, no statblocks, no XP. Name the threat; direct to `rpg-encounter-builder` for math.
- **Re-setting tone.** Tone is inherited from the campaign (default dark-leaning level 3). The run sheet follows the campaign's register.
- **Private campaign content in examples.** Reference files use generic or clearly-public media only.
