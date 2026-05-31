# Output Template

The markdown skeleton for a front sheet. Both versions share the structure; **Compact** is the runnable skeleton with enough to prep and advance, **Full** adds the complete portents with segment labels, the advance log, discovery read-aloud for doom arrivals, stakes questions, the cast roster, and handoff notes.

Filename convention: save the front sheet as `front-<slug>.md` (e.g., `front-consortium-grip.md`) in the user's working folder. Tell the user the path. The vault entities (`frente`, `relogio`) are persisted separately via rpg-preserve — the front sheet is the GM-facing human document; the vault entities are the machine-readable state.

---

## Skeleton (both versions)

```markdown
# Front — [Front Name]
*Living-world engine — Pathfinder 2e kit · Tone inherited: [level N] · Campaign front / Adventure front · Act: [act this front belongs to]*

> **Impulse:** [verb phrase — what the danger wants when left alone]
> **Impending doom:** [the specific named consequence if all portents fire]

---

## Dangers & Clocks

| Danger | Clock | Segments | Filled | Status | Next portent |
|---|---|---|---|---|---|
| [Danger name] | [[Clock vault name]] | [4/6/8] | [n] | ticking / filled / paused | [the portent that fires next] |
| [...] | [...] | [...] | [...] | [...] | [...] |

---

## What the world did since last session

[The "world's next move" beat — concrete, diegetic, 2–4 sentences. This is what rpg-session-prep turns into a strong start. State which portent(s) fired and what it looked like in the fiction. If this is a bootstrap run, state the front's opening position instead.]

---

[FULL ONLY from here ↓]

## Grim Portents (ordered)

For each danger, the complete ordered list of portents — what happens, in sequence, if no one intervenes. Mark fired portents with ✓.

### [Danger name] — [n]-segment clock

| Segment | Portent | Fired? |
|---|---|---|
| 1 | [concrete event — what happens, not how] | ☐ / ✓ |
| 2 | [...] | ☐ / ✓ |
| 3 | [...] | ☐ / ✓ |
| [...] | [...] | ☐ / ✓ |

**If the clock fills:** [specific named doom — not "bad things happen"; a named consequence]

### [Danger name 2] — [n]-segment clock
[same table]

---

## Stakes Questions

1. [Open question — grounded in a named character or place; genuinely could go either way]
2. [...]
3. [...]

---

## Cast (vault-linked)

| Role | Vault name | Note |
|---|---|---|
| Antagonist | [[Name]] | [one-line role in this front] |
| Key member | [[Name]] | [...] |
| At-risk NPC | [[Name]] | [what they stand to lose] |

---

## Advance Log

| Session | Portents fired | Portents disrupted | Notes |
|---|---|---|---|
| [[Session name]] | [portent #s] | [portent #s — and why] | [...] |

---

## Handoffs

- → `rpg-session-prep`: [the "world's next move" beat to use as strong start input]
- → `rpg-faction-creator` (loremaster): [if the plan-in-motion needs to be authored or deepened]
- → `rpg-npc-creator` (loremaster): [any named cast members who need a full dossier]
- → `rpg-location-creator` (loremaster): [locations named in portents that don't exist yet]
- → `rpg-clue-mapper` (loremaster): [portents that should be discoverable as clue-map revelations]
```

---

## Persist

Hand these candidates to **rpg-preserve** (never write files directly):

### `frente` candidate — [Front Name]

```
type: frente
status: active / dormant / resolved
faction: "[[Faction Vault Name]]"
antagonist: "[[Antagonist NPC Vault Name]]"
clocks:
  - "[[Clock Vault Name 1]]"
  - "[[Clock Vault Name 2]]"
act: "[[Act Vault Name]]"
```

*Note: the `clocks` field is a curated list — wikilink names must match exactly.*

### `relogio` candidate — [Clock Name]

```
type: relogio
segments: [4/6/8]
filled: [n]
status: ticking / filled / paused
front: "[[Front Vault Name]]"
faction: "[[Faction Vault Name]]"
quest: "[[Quest Vault Name]]"   ← optional; omit if not quest-linked
```

*To advance a clock: re-emit this candidate with `filled` incremented. rpg-preserve will overwrite the existing note and re-validate. This is the intended update path.*

---

## Section-by-section guidance

### Dangers & Clocks (both versions)
The operational dashboard — what the GM glances at to see where every clock stands. **One row per danger.** The "next portent" column is the world's next move; keep it concrete (a named event, not a category). If the clock is paused (players disrupted the danger), note it in Status.

### What the world did since last session (both versions)
The handoff beat. 2–4 sentences: what happened off-screen, which portent fired, what it looked like in the world's fiction. Concrete and diegetic — not "the clock advanced" but "the last independent dock-master signed the Consortium's contract, under pressure she couldn't name." This is the text `rpg-session-prep` lifts directly into its strong start.

For a **bootstrap run**, replace this section with: "Front opened. Current state: [impulse, clock at 0/n, first portent not yet fired]."

### Grim Portents — Full only
The full ordered portent list with segment mapping and fired/unfired state. **Obstacle-framed, not method-framed** (see `fronts-and-clocks.md` §3). The advance log tracks which portents fired each session and what disrupted others — this is what makes a multi-session front legible when you return to it a month later.

### Stakes Questions — Full only
1–3 open questions the front raises. These are the live tensions the campaign doesn't resolve until the players (or the doom) decide them. Revisit after each advance — a question answered (one way or another) is a campaign beat.

### Persist — both versions
Always include this block. The front sheet is the human document; the vault entities are the machine-readable state. Without the Persist block, the front exists only in chat and cannot be advanced next session.

---

## Length targets

Guidance, not limits.

| Section | Compact | Full |
|---|---|---|
| Dangers & Clocks table | included | included |
| What the world did | included | included |
| Grim Portents | — | full ordered list + advance log |
| Stakes Questions | — | 1–3 open questions |
| Cast | — | vault-linked roster |
| Handoffs | — | included |
| Persist | included | included |
