# Output Template

The markdown skeleton for a clue map (revelation list). Both versions share the structure; **Compact** is the robust runnable skeleton, **Full** adds the node-web sanity pass, optional revelations, gating, discovery read-aloud, the opt-in red-herring layer, and handoff notes.

Filename: `clue-map-<slug>.md` (e.g., `clue-map-dockside-disappearances.md`).

## Skeleton (both versions)

```markdown
# Clue Map — [Mystery / Campaign Name]
*Investigation layer — Pathfinder 2e kit · Tone inherited: [level N] · Gates: [arc/acts this serves]*

> Built on the Three Clue Rule: every CORE revelation has ≥3 independent clues + a proactive backstop, so the investigation can't dead-end.

---

## Revelations

| # | Revelation (the truth the players reach) | Core / Optional | Gates |
|---|---|---|---|
| R1 | [one plain line] | Core | [act/beat it unlocks] |
| R2 | [...] | Core | [...] |
| R3 | [...] | Optional | — |

---

## Clues by Revelation

For each CORE revelation: ≥3 independent clues (different nodes, different methods). Type each as **[E]** evidence (points to the revelation) or **[L]** lead (points to another node).

### R1 — [revelation]
| # | Clue (concrete content) | Type | Node (where it lives) | Form (how found) |
|---|---|---|---|---|
| 1 | [what it tells the players] | [E]/[L] | [existing location/NPC/faction/doc] | [found / overheard / confessed / deduced] |
| 2 | [...] | | | |
| 3 | [...] | | | |

**Proactive backstop (if they miss all of R1's clues):** [a clue that comes to them — tied to the antagonist's plan].

### R2 — [revelation]
[same table + backstop]

[... repeat for each core revelation. Optional revelations: 1–2 clues, no mandatory backstop.]

---

[FULL ONLY from here ↓]

## Node Web & Sanity Check

| Node | Clues inside | Leads pointing to it | ≥3 in / ≥3 to? |
|---|---|---|---|
| [Location/NPC/faction] | [clue #s] | [from which nodes] | ✅ / ⚠️ fix |

**Single-point-of-failure flags:** [any core revelation with <3 surviving clues, or any key node reachable only one way — and the fix applied].

## Gating & Pacing
[Which revelation unlocks which act; core vs. bonus clues; confirmation that nothing core is gated behind an optional clue.]

## Red Herrings (only if requested)
| False lead | Where it appears | Recognition trigger (how players realize it's a dead end) |
|---|---|---|
| [...] | [...] | [the concrete out] |

## Handoffs — nodes this map needs that don't exist yet
- → `rpg-location-creator` / `rpg-city-creator` / `rpg-region-creator`: [a place a clue needs]
- → `rpg-npc-creator`: [a witness / informant / backstop-deliverer]
- → `rpg-faction-creator`: [an organization sitting on knowledge]
- → back to `rpg-campaign-foundation`: [if a revelation is missing or a truth needs sharpening]

---

## GM Run-Sheet (use live at the table)

| Revelation | Clues — ✓ when found | Node(s) | Backstop ready? | Gates |
|---|---|---|---|---|
| R1 [short] | ☐ c1 ☐ c2 ☐ c3 | [nodes] | ☐ | [act] |
| R2 [short] | ☐ c1 ☐ c2 ☐ c3 | [nodes] | ☐ | [act] |

*Glance here mid-session: what's been found, what paths remain, whether the backstop is still in reserve.*
```

## Section-by-section guidance

### Revelations
Conclusions first, clues second (the structural pass). State each truth in one plain line. **Mark core vs. optional honestly** — core revelations are the ones the Three Clue Rule protects and the only ones allowed to gate progress. Order by the investigation's natural logic.

### Clues by Revelation
The heart of the map. **≥3 independent clues per core revelation** — independence is the whole point: different nodes, different discovery methods, so one failure can't remove all three (see `clue-frameworks.md` §2). Make clue **content concrete** ("a ledger line showing payments to the harbormaster"), label **evidence vs. lead**, anchor each to a **real existing node**, and note the **form** of discovery. If you find yourself putting all three clues in one place or behind one check, spread them out.

### Proactive backstop
Per core revelation: what comes to the PCs if they miss everything (§5 of frameworks). **Tie it to the antagonist's plan-in-motion** so it's the world acting, not a rescue. This is the guarantee against the dead-end.

### Node Web & Sanity Check (Full)
The robustness audit. List nodes, what's in them, what points to them, and apply the **inversion check** (≥3 in, ≥3 to). Flag and fix single points of failure. This is what proves the map is grind-proof rather than just hoping it is.

### Red Herrings (Full, opt-in only)
Off unless the user asks. Each false lead **must have a recognition trigger** — a concrete way to realize it's a dead end — or it grinds the game (§7). Never obscure a core clue with one.

### GM Run-Sheet
The practical payoff — a live checklist for the table. The GM ticks clues as the players find them and sees at a glance which revelations are still open and whether the backstop is still in reserve. Keep it to one screen.

## Length targets

Guidance, not limits. The clue tables carry the weight.

| Section | Compact | Full |
|---|---|---|
| Revelations | the core list | + optional revelations |
| Clues by revelation | ≥3 per **core** revelation + backstops | + clues for optional revelations + discovery read-aloud for keystones |
| Node web & sanity check | — | full audit with SPOF flags |
| Gating / red herrings / handoffs | — | included (red herrings opt-in) |
| GM run-sheet | included | included |
