# RPG Gamemaster

The **session prep and run layer** for a Pathfinder 2e campaign — the bridge from a built world to a runnable session. Four skills that advance the living world between sessions, assemble a one-page session plan, balance encounter math, and produce the GM overlay for the table. Tool-agnostic: no specific VTT, no external compendium; creature data comes from the [Archives of Nethys](https://2e.aonprd.com/) category pages only.

Default tone is **dark-leaning (level 3 of 5)** — heroic fantasy with a shadowy edge; not grimdark, not noblebright. All four skills inherit tone from the campaign bible; they do not reset it.

## Philosophy

This kit is a **session organizer, not a world builder.** Its job is to arrange what already exists — vault entities, the campaign bible, the clue map, the active fronts — into a concrete starting position for the table. It does not generate regions, cities, NPCs, or factions; when a needed node is missing, it emits a handoff to the loremaster kit and waits. The prep-and-run layer is deliberately thin: its goal is to get you to the table confident, then trust the improvisation.

The kit is grounded in working TTRPG methodology: Sly Flourish's *Return of the Lazy Dungeon Master* (the eight steps, weighted on Secrets & Clues as the spine), Dungeon World Fronts (dangers + grim portents + impending doom as trackable progress clocks), the Alexandrian's "Don't Prep Plots" and Three Clue Rule (situations, not scripts; revelations carried forward), and PF2e GM Core encounter math. The goal: prep the situation, not the plot. Prepare to improvise.

## What's inside

| Skill | What it makes | When to reach for it |
|---|---|---|
| **rpg-front-tracker** | a front sheet — impulse, grim portents, clocks, impending doom, and the "what the world did since last session" beat | between sessions, before prep |
| **rpg-session-prep** | a one-page runnable session plan (Lazy DM 8 steps, secrets as the spine) | preparing the upcoming game |
| **rpg-encounter-builder** | a balanced PF2e encounter (XP budget shown, wrapped as a situation) | when session-prep flags a fight that needs math |
| **rpg-gm-run-sheet** | a compact printable table overlay — checklist, clocks, NPC quick-refs, backstops | sitting down to run |

## The four skills

### rpg-front-tracker — the living-world engine

Advances the world between sessions using Dungeon World Fronts and Blades-style progress clocks. The loremaster kit authors a faction's plan as prose — the plan-in-motion, grim portents, impending doom. This skill operationalizes that plan: it bootstraps a `frente` entity from the faction dossier, sizes each clock (4 segments for a contained danger, 6 for a campaign-level threat, 8 for an existential arc), and then advances those clocks based on what happened last session. Portents fire when they *fit the fiction*, not on a mechanical schedule. The deliverable is a front sheet — the danger's impulse, the clock table, the impending doom — and the "what the world did since last session" beat that `rpg-session-prep` turns into a strong start. Persists `frente` and `relogio` entities through the `rpg-preserve` write gate.

### rpg-session-prep — the session launchpad

Turns a built world into a one-page runnable session using the Return of the Lazy Dungeon Master eight steps, with Secrets & Clues as the spine. It reads the campaign bible (tone, thematic pillars, antagonist arc), the clue map (pulling revelation IDs and carrying forward unrevealed secrets from last session — never resetting), the active fronts and clocks (deriving the strong start from what the world did, not from fresh invention), and the vault entities in play. The output is a launchpad: a strong start with a read-aloud block, three to five likely scenes, the secrets and clues to potentially reveal this session keyed to R-IDs, the NPCs and threats in play by exact vault name, rewards, and "if they stall" backstops that push a grim portent. This is a plan, not a script — it is abandoned the moment the table diverges. Persists a `sessao` entity through `rpg-preserve`.

### rpg-encounter-builder — the mechanical layer

The encounter math the loremaster skills deliberately skip. Given party level and size plus a scene or threat brief, it selects a threat tier (trivial / low / moderate / severe / extreme), assembles creatures referenced to Archives of Nethys category pages (never a `?ID=` deep link), and shows the XP-budget arithmetic line by line against the total — always stating the assumed party level and size. It adds hazards (if any) and treasure by level, then wraps the whole encounter as a situation: an objective beyond "kill everything", a terrain feature, the reason the fight exists in the campaign, and how it escalates or ends. The math and the situation are inseparable — a correct budget with no situation points nowhere, and a vivid scene with no math is unrunnable. Persists an `encontro` entity through `rpg-preserve`.

### rpg-gm-run-sheet — the table overlay

The read-out of the other three skills. It does not generate new fiction — it reads the session-prep one-pager, the clue map, and the active fronts and clocks, and compresses them into one printable page the GM glances at mid-session. Six sections: the strong start (read-aloud block), the scene beats checklist, the secrets-and-clues checklist keyed to revelation IDs with tick boxes for each placed clue, NPC quick-refs (name, want, one voice line), the active clocks dashboard (segments/filled, next portent), and the "if they stall" backstops tied to grim portents. Tool-agnostic — usable next to any VTT or at a physical table. This is the one skill that writes nothing to the vault; the run sheet is ephemeral, saved as a loose `run-sheet-<slug>.md` in the working folder. The canonical session record is the `sessao` note from `rpg-session-prep`.

## Integration — the vault as shared memory

The gamemaster kit communicates with the rest of the ecosystem **via the Obsidian vault**, never plugin-to-plugin. It reads vault entities (`npc`, `local`, `faccao`, `quest`, `inimigo`, `ato`) and loose files (the campaign bible and the clue map). It writes only through the **`rpg-preserve` skill** — the write gate provided by the `rpg-vault-guardian` plugin. This is the ports-and-adapters design: the gamemaster core never imports the guardian's code; it knows only the contract (entity types and required fields) and routes candidates to `rpg-preserve` to validate and write.

```
  LOREMASTER (author)            VAULT = shared contract              GAMEMASTER (prep/run)
  ──────────────────────         ────────────────────────────         ─────────────────────
  campaign-foundation ─────────▶ campaign-bible (loose) ─────read──▶ session-prep
  faction-creator (plan) ──────▶ faccao entity ◀──────advance──────  front-tracker
  clue-mapper ─────────────────▶ clue-map (loose, R-IDs) ────read──▶ session-prep + run-sheet
  region/city/loc/npc ─────────▶ npc/local/faccao entities ──read──▶ all skills
                                 frente/relogio (ENTITY) ◀──write── front-tracker (via rpg-preserve)
                                 sessao/encontro (ENTITY) ◀──write── prep + encounter (via rpg-preserve)
                                 run-sheet (loose printable) ◀───────────────────── gm-run-sheet
```

## Three new vault entity types

Installing `rpg-gamemaster` and running `rpg-front-tracker` or `rpg-encounter-builder` will write entities of three new types. These are defined in the `rpg-vault-guardian` schema (`scripts/schema.mjs`) and live in their own folders:

| Entity type | Folder | Written by | What it holds |
|---|---|---|---|
| `frente` | `frentes/` | rpg-front-tracker | impulse, impending doom, status (`active`/`dormant`/`resolved`), linked faction and antagonist |
| `relogio` | `relogios/` | rpg-front-tracker | segments (4/6/8), filled count, status (`ticking`/`filled`/`paused`), linked front |
| `encontro` | `encontros/` | rpg-encounter-builder | threat tier, party level/size, creature refs, location, session link |

If your vault was scaffolded before `rpg-gamemaster` was installed, run `/rpg-init` again to add the `frentes/`, `relogios/`, and `encontros/` folders.

## Install

```
/plugin marketplace add ~/projects/rpg-marketplace
/plugin install rpg-gamemaster@rpg-marketplace
/reload-plugins
```

Confirm with `/skills` (you should see the four `rpg-*` skills: `rpg-front-tracker`, `rpg-session-prep`, `rpg-encounter-builder`, `rpg-gm-run-sheet`).

For persistence, also install `rpg-vault-guardian` — the gamemaster skills write all vault entities through its `rpg-preserve` write gate. Without it, the skills produce output but will not persist to disk.

New here? Run `/rpg-gamemaster-help` for a guided tour of the kit's workflows.

## Typical session cycle

1. **Between sessions:** `rpg-front-tracker` — advance the clocks based on last session; update `frente` + `relogio` entities.
2. **Prep day:** `rpg-session-prep` — read the updated world state, assemble the one-pager; write the `sessao` entity.
3. **Encounter math (if needed):** `rpg-encounter-builder` — balance the flagged fights; write `encontro` entities.
4. **Sitting down to run:** `rpg-gm-run-sheet` — compress everything to one printable page.
5. **After the session:** `rpg-front-tracker` again — advance the clocks to reflect what the players did.

## Conventions

- **Tool-agnostic core.** No specific VTT. Creature and rule references point to [Archives of Nethys](https://2e.aonprd.com/) category pages (e.g. `/Monsters.aspx`, `/Deities.aspx`) — never `?ID=` deep links, never an external app's compendium.
- **Original worlds, PF2e toolkit.** Settings are your own; mechanics and lore (deities, planes, bestiary, encounter math) are Pathfinder 2e post-Remaster.
- **Your language.** Skills generate in the language you write in (PT-BR in, PT-BR out), keeping PF2e proper names and AoN URLs in English as canon anchors. Vault folder names and entity type values are Portuguese by convention.
- **Handoffs, not invention.** When a session plan needs a node that doesn't exist in the vault, the skill emits a structured handoff to the relevant loremaster skill and stops. It does not invent world content.

---

*The session prep and run layer of a three-part kit: `rpg-loremaster` builds the world, `rpg-gamemaster` turns it into runnable sessions, and `rpg-vault-guardian` persists and validates the vault they share.*
