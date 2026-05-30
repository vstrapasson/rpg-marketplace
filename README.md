# rpg-marketplace

Claude Code plugin marketplace for RPG campaigns.

## Installation

```
/plugin marketplace add https://github.com/vstrapasson/rpg-marketplace
/plugin install rpg-vault-guardian@rpg-marketplace
/plugin install rpg-loremaster@rpg-marketplace
```

---

## Plugins

### rpg-vault-guardian

Obsidian vault integrity guardian for RPG campaigns. Validates schema, links, coherence, and orphans; creates validated entities through a write gate; audits the campaign; and scaffolds the initial folder structure.

**Skills**

| Skill | Description |
|---|---|
| `/rpg-audit` | Full 7-step vault audit: snapshot → validation → safe auto-fix → LLM health check → destructive fixes → MOC regeneration → final report |
| `/rpg-preserve` | Write gate — single entry point for all entity creation and editing, enforcing required frontmatter for 12 entity types before any disk write |

**Commands**

| Command | Description |
|---|---|
| `/rpg-init` | Scaffolds the 14-folder initial structure for a new campaign vault |

**Agents**

| Agent | Description |
|---|---|
| `rpg-guardian` | Isolated-context audit agent that runs the full `rpg-audit` flow and returns a structured consistency report |

**Entity types:** `regiao`, `local`, `npc`, `jogador`, `inimigo`, `faccao`, `quest`, `sessao`, `evento`, `ato`, `item`, `lore`

---

### rpg-loremaster

Complete GM toolkit for building dark-leaning Pathfinder 2e campaigns end to end. Seven specialized creator skills feed into a conductor that maintains a persistent campaign bible and decides what to build next (just-in-time spiral). A dedicated reviewer audits consistency across the full campaign.

**Philosophy:** co-creation-first, handoff-based, just-in-time spiral building, dark-leaning (level 3/5 — heroic fantasy with shadowy inflections), grounded in working TTRPG design (Sly Flourish, the Alexandrian, Dungeon World). Every skill outputs a dossier in the user's language; PF2e canon names (deities, creatures, ancestries) stay in English as Archives of Nethys anchors.

**Skills**

| Skill | Description |
|---|---|
| `/rpg-campaign-foundation` | Campaign spine — central antagonist/truth, 3-4 thematic pillars, act structure, escalating signs, session zero layer |
| `/rpg-region-creator` | Regions/nations — causal build order: geography → peoples → religion → politics → factions → fauna → points of interest → hooks |
| `/rpg-city-creator` | Cities/settlements — situation-first, faction-first; one central dramatic question, faction web (2-4), named cast (4-6 NPCs), troubles & hooks |
| `/rpg-faction-creator` | Factions as dynamic agents — drive + plan-in-motion + grim portents/progress clock + leader + internal fracture + reaction ladder |
| `/rpg-location-creator` | Dungeons/lairs/ruins — premise & ecology, fantastic feature, five-room beats or xandered keyed map, inhabitants, treasure & secrets |
| `/rpg-clue-mapper` | Investigation/mystery layer — Three Clue Rule: ≥3 independent clues per revelation, proactive backstops, node web, GM run-sheet |
| `/rpg-campaign-conductor` | Orchestrator — ties all six creator skills into one coherent build, maintains the campaign bible, decides what to build next |

**Agents**

| Agent | Description |
|---|---|
| `rpg-campaign-reviewer` | Non-interactive consistency auditor — reads the full campaign folder and bible, reports blockers/should-fix/nits with concrete fixes; does not edit |

**Audit dimensions:** central-truth coherence, tone consistency, names registry, PF2e canon palette, dangling handoffs, clue-map robustness
