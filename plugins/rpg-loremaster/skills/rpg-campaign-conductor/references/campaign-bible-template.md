# Campaign Bible — Template

The conductor's persistent memory for one campaign. Copy this into `campaign-bible-<slug>.md` in the campaign folder and **keep it current after every creator-skill run.** A clean session reopens this file and is immediately oriented — all state lives here, not in the chat.

Match the user's language in the filled-in content (headings may stay as-is or be translated).

```markdown
# Campaign Bible — [Campaign Name]
*Conductor memory · Pathfinder 2e · Tone level [N]/5 · Last updated: [date]*

> This file is the single source of truth for the campaign. Every creator skill reads from it and writes back to it. If anything generated contradicts this file, this file wins (or the contradiction is recorded below as a deliberate exception).

## 1. The Spine (from rpg-campaign-foundation)
- **Central truth (GM-facing):** [the one-line engine]
- **Antagonist + plan:** [who, and what's advancing]
- **Thematic pillars:** [3–4, short]
- **Tone level:** [N] of 5 — [label] · [any per-section deviations]
- **PF2e stance:** deity/deities [..] · plane(s) [..] · threat family [..]
- **Act turns:** I → [..] · II → [..] · III → [..]
- **Foundation file:** [path]

## 2. Names Registry (reuse verbatim — never rename)
| Name | What/who | First appeared in | Notes |
|---|---|---|---|
| [Karsthaven] | port city | region dossier | smuggling hub |
| [Rendara Mosswick] | NPC, harbormistress | city dossier | Tidewardens leader |
| ... | | | |

## 3. Layer Status (what's built)
| Layer / piece | Skill | Status | File |
|---|---|---|---|
| Campaign spine | rpg-campaign-foundation | ✓ | [path] |
| Starting region | rpg-region-creator | ✓ / pending | [path] |
| Starting city | rpg-city-creator | pending | — |
| Antagonist (NPC) | rpg-npc-creator | pending | — |
| Antagonist's faction | rpg-faction-creator | pending | — |
| First key location | rpg-location-creator | pending | — |
| Central artifact/relic | rpg-artifact-creator | pending (if the truth turns on an object) | — |
| Clue map | rpg-clue-mapper | pending (needs nodes) | — |

## 4. Handoff Queue (future moves, from off-stage notes)
> Each entry = a named off-stage note from a built artifact, ready to feed into the named skill.
- [ ] → `rpg-city-creator`: [the capital, named in the region dossier]
- [ ] → `rpg-npc-creator`: [the antagonist's agent, named in the foundation]
- [ ] → `rpg-faction-creator`: [the order named in the city dossier]
- [x] (done) → ...

## 5. Open / Locked Decisions (from the foundation roadmap)
- **Locked (don't improvise):** [the plan's internal logic; what the deity can/can't do; macguffin count; act turns]
- **Open (resolve in play):** [mid-boss backstory; secondary NPCs; finale staging]

## 6. Deliberate Exceptions (recorded drift)
> Anything that contradicts the defaults on purpose — so no skill "corrects" it later.
- [e.g., the undercity section was dialed to tone 4 per user request]

## 7. The "GM knows, players discover" truths → clue-map input
> Carried from the foundation; fed to rpg-clue-mapper when nodes exist.
1. [revelation]
2. [revelation]
...
```

## How the conductor uses this

- **On a cold start:** read the whole bible first — it replaces conversation memory.
- **Before invoking a creator skill:** pull the relevant handoff (§4), the identity (§1), and the names it must respect (§2).
- **After a creator skill runs:** update §2 (new names), §3 (status + file), §4 (new off-stage notes as queue items), and §6 if a deviation was chosen. Run the consistency check (§1 truth/tone vs. the new artifact).
- **Before a review:** hand the reviewer this bible + the campaign folder so it can audit against the source of truth.
