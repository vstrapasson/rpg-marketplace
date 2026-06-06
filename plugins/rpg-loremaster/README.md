# RPG Loremaster

A game master's toolkit for building **dark-leaning Pathfinder 2e campaigns** end to end — from the first spark of an idea down to the room the players walk into, the clues that let them solve the mystery, the art that shows it, and the music that scores it. Ten creator skills that hand off to each other, plus an interactive **conductor** that ties them into one consistent campaign, and a **reviewer** subagent that audits it for consistency.

Default tone is **"dark-leaning" (level 3 of 5)** — heroic fantasy with a shadowy edge; not grimdark, not noblebright. Every skill honors an explicit tone override.

## Philosophy

These skills are a **creative partner, not a vending machine.** Their job is to draw *your* ideas out, sharpen them, fill the gaps — they interview you (co-creation), then build. They can also just generate when you're in a hurry ("just run with it"), but elicitation is the point. Everything is grounded in working TTRPG design (Sly Flourish's spiral prep, the Alexandrian's node-based design and Three Clue Rule, Dungeon World fronts), and everything is built to be used **just-in-time** — start in the middle, expand only what the next session needs.

## What's inside

| Skill | What it makes | When to reach for it |
|---|---|---|
| **rpg-campaign-foundation** | the campaign spine — central truth, antagonist, themes, acts, signs | starting or pitching a campaign |
| **rpg-region-creator** | a region (or a nation/kingdom at scale) | the area an arc happens in |
| **rpg-city-creator** | a city/settlement built around a dramatic question | a town the party will spend time in |
| **rpg-faction-creator** | an organization as a *dynamic agent* with a plan in motion | a guild/cult/house/syndicate |
| **rpg-location-creator** | a dungeon/lair/site (always answers "why hasn't it been cleared?") | the place the party enters |
| **rpg-npc-creator** | a deep, *system-agnostic* NPC — contradiction, motivation, a performable voice, hooks | a named character needs depth (villain, patron, ally) |
| **rpg-artifact-creator** | a deep, *system-agnostic* artifact as a narrative node — provenance, will, who wants it, an evocative gift + a staged price, and a visual description + art prompt | a relic/cursed item/McGuffin the plot turns on |
| **rpg-art-director** | *system-agnostic* image-gen prompts (multi-target, SDXL-first) + a campaign visual style bible so every portrait, scene, and token shares a look | art for an NPC/place/faction/scene, or a campaign visual identity |
| **rpg-map-architect** | *system-agnostic* spatially-assertive top-down **battlemap** prompts — a functional program per archetype (a tavern needs a bar/kitchen/cellar/stairs; a den needs a watched entrance/bunks/contraband store) placed where it makes sense; nano-banana-first, prompt-only | a battlemap/floorplan that should actually make sense |
| **rpg-sound-director** | *system-agnostic* music-gen prompts (Stable Audio Open–first, Suno for sung scenes) + a campaign audio style bible so every scene shares a sound; instrumental by default | a soundtrack for a scene/place/encounter, or a campaign audio identity |
| **rpg-clue-mapper** | the clue map (Three Clue Rule) so the mystery can't dead-end | wiring an investigation |
| **rpg-campaign-conductor** | the **orchestrator** — runs the whole chain, keeps a campaign bible | building/continuing a campaign as a system |

Plus the **rpg-campaign-reviewer** subagent — a non-interactive consistency auditor you (or the conductor) can run over a campaign folder to catch tone drift, renamed NPCs, broken canon links, dangling handoffs, and single-points-of-failure in the clue map.

## The system-agnostic creators (npc · artifact · art-director · map-architect · sound-director)

Five skills in the kit are **system-agnostic** — they deal in story, image, space, and sound, not PF2e stat blocks, so they work for any system while the rest of the kit speaks Pathfinder 2e:

- **`rpg-npc-creator`** — deep, layered NPCs (personality, backstory, contradiction, voice, hooks). Named characters route here.
- **`rpg-artifact-creator`** — legendary objects as narrative nodes (provenance, will, gift + staged price). Named objects route here.
- **`rpg-art-director`** — image-generation prompts and the campaign's visual style bible. Any node's visual seed routes here when it needs art.
- **`rpg-map-architect`** — spatially-assertive top-down battlemap prompts (a functional program per archetype, placed so the layout makes sense). A `local` that needs a tactical map routes here; it inherits the same visual style bible and hands the PNG to `rpg-scene-forge`.
- **`rpg-sound-director`** — music-generation prompts and the campaign's audio style bible. Any scene's sonic seed routes here when it needs a soundtrack (instrumental by default; sung scenes go to Suno).

All five are bundled (no separate install) and use no Archives of Nethys links. The conductor and several skills route their named-character / named-object / art / map / audio handoffs to them.

## Install (local)

```
/plugin marketplace add ~/projects/rpg-marketplace
/plugin install rpg-loremaster@rpg-marketplace
/reload-plugins
```

Confirm with `/skills` (you should see the eleven `rpg-*` skills).

New here? Run `/rpg-loremaster-help` for a guided tour of the kit's workflows.

## How to use it

**The easy path — let the conductor drive:**
> "Vamos montar minha campanha" / "Let's build my campaign."

The conductor starts the campaign **bible** (one file that holds the central truth, tone, names, and what's built), runs the campaign foundation first, then proposes the smallest next thing your campaign needs — interviewing you at each step and keeping everything consistent. To resume later (even in a brand-new session, or for a co-GM), just point the conductor at the bible file.

**The à la carte path — call a single skill:**
> "Create a region for my campaign: a drowned coast where the towns toll bells underwater."
> "Detail this town as a city." · "Build the cult behind the disappearances." · "Map a crypt." · "Map the clues so my mystery doesn't dead-end."

Each skill runs its own interview and ends with **off-stage notes** — a list of what it created that's ready to hand to the next skill. Paste those into the next skill, or let the conductor route them.

**The consistency check:**
At any checkpoint, ask for a review — the `rpg-campaign-reviewer` subagent reads your campaign folder and reports inconsistencies (it audits; it doesn't edit).

## A note on tone and safety

The default tone explores dark themes (institutional rot, moral cost, dread). The campaign-foundation skill includes a **session-zero** prompt with **Lines & Veils** and a pause signal — use it. Dark-leaning play is better with explicit buy-in.

## Conventions

- **Original worlds, PF2e toolkit.** Settings are your own; mechanics/lore (deities, planes, bestiary) are Pathfinder 2e (post-Remaster). Links point to the [Archives of Nethys](https://2e.aonprd.com/) category pages.
- **Your language.** Skills generate in the language you write in (PT-BR in, PT-BR out), keeping PF2e proper names in English as canon anchors.
- **Handoffs are the glue.** Every output ends with structured notes for the next skill — that's what makes this a kit, not eight separate tools.

---

*Built as a coherent system: each skill has its own bedrock (region = geography, city = a dramatic question, faction = a drive in motion, location = premise + ecology, campaign = a central truth, clue map = information flow). See the kit's design notes for the full philosophy.*
