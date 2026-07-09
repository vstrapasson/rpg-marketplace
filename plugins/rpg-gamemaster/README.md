# RPG Gamemaster

The **session prep and run layer** for a Pathfinder 2e campaign — the bridge from a built world to a runnable session, plus the session zero that brings the players into it and the recap that closes the loop after it. Eight skills: a **session zero** that builds the player characters and captures the party, then the GM-side loop that advances the living world between sessions, assembles a one-page session plan, balances encounter math, structures non-combat challenges, itemizes treasure and tracks wealth, produces the GM overlay for the table, and — after the session ends — reconciles what happened back into the vault. Tool-agnostic: no specific VTT, no external compendium; creature data and rules come from the [Archives of Nethys](https://2e.aonprd.com/) category pages only.

Default tone is **dark-leaning (level 3 of 5)** — heroic fantasy with a shadowy edge; not grimdark, not noblebright. All eight skills inherit tone from the campaign bible; they do not reset it.

## Philosophy

This kit is a **session organizer, not a world builder.** Its job is to arrange what already exists — vault entities, the campaign bible, the clue map, the active fronts — into a concrete starting position for the table. It does not generate regions, cities, NPCs, or factions; when a needed node is missing, it emits a handoff to the loremaster kit and waits. The prep-and-run layer is deliberately thin: its goal is to get you to the table confident, then trust the improvisation.

The kit is grounded in working TTRPG methodology: Sly Flourish's *Return of the Lazy Dungeon Master* (the eight steps, weighted on Secrets & Clues as the spine), Dungeon World Fronts (dangers + grim portents + impending doom as trackable progress clocks), the Alexandrian's "Don't Prep Plots" and Three Clue Rule (situations, not scripts; revelations carried forward), and PF2e GM Core encounter math. The goal: prep the situation, not the plot. Prepare to improvise.

## What's inside

| Skill | What it makes | When to reach for it |
|---|---|---|
| **rpg-party-forge** | the player characters (`jogador` entities) and the party overview — each PC anchored to the world by a hook, with a GM-secret convergence layer | session zero, before the campaign runs |
| **rpg-front-tracker** | a front sheet — impulse, grim portents, clocks, impending doom, and the "what the world did since last session" beat | between sessions, before prep |
| **rpg-session-prep** | a one-page runnable session plan (Lazy DM 8 steps, secrets as the spine) | preparing the upcoming game |
| **rpg-encounter-builder** | a balanced PF2e encounter (XP budget shown, wrapped as a situation) | when session-prep flags a fight that needs math |
| **rpg-embate-builder** | a non-combat challenge — single check or a Victory Points subsystem (social/chase/research/infiltration), DCs shown, wrapped as a situation | when a scene is resolved by skills, not swords |
| **rpg-treasure-builder** | itemized loot from the official Treasure-by-Level budget (`item` entities) + a wealth-by-level tracker in the party overview | distributing a hoard or the level's loot |
| **rpg-gm-run-sheet** | a compact printable table overlay — checklist, clocks, NPC quick-refs, backstops | sitting down to run |
| **rpg-session-recap** | the reconciled `sessao`/`evento`/`quest` state from what actually happened, plus a GM-facing recap document | right after the session ends |

## The eight skills

### rpg-party-forge — session zero / the players' side

The one player-facing skill in an otherwise GM-facing kit. It runs a session zero and builds each player character: concept, a core belief and an active wound, a want pulling against a need, a contradiction, and a performable table voice — the same inside-out engine the loremaster's NPC creator uses, tuned for a character the *player* co-owns. What makes it a party-builder and not just a character-builder is the second layer: every PC is **anchored to the world** by a hook (a faction, region, location, front, or clue named by exact vault name), and carries a **GM-secret layer** — a planted seed, a hidden tie to the antagonist, and a convergence that crosses another PC's thread — so five backstories become one party with a shared spine the players don't see yet. It captures party **level and size** in a loose party overview so `rpg-encounter-builder` and `rpg-embate-builder` stop re-asking. Persists each PC as a `jogador` entity through `rpg-preserve` (the first kit skill to author that type); offers a player-safe handout with the secrets stripped. Hands the roster off to `rpg-ownership-forge` (Foundry actor ownership) and each PC's secret to `rpg-clue-mapper`.

### rpg-front-tracker — the living-world engine

Advances the world between sessions using Dungeon World Fronts and Blades-style progress clocks. The loremaster kit authors a faction's plan as prose — the plan-in-motion, grim portents, impending doom. This skill operationalizes that plan: it bootstraps a `frente` entity from the faction dossier, sizes each clock (4 segments for a contained danger, 6 for a campaign-level threat, 8 for an existential arc), and then advances those clocks based on what happened last session. Portents fire when they *fit the fiction*, not on a mechanical schedule. The deliverable is a front sheet — the danger's impulse, the clock table, the impending doom — and the "what the world did since last session" beat that `rpg-session-prep` turns into a strong start. Persists `frente` and `relogio` entities through the `rpg-preserve` write gate.

### rpg-session-prep — the session launchpad

Turns a built world into a one-page runnable session using the Return of the Lazy Dungeon Master eight steps, with Secrets & Clues as the spine. It reads the campaign bible (tone, thematic pillars, antagonist arc), the clue map (pulling revelation IDs and carrying forward unrevealed secrets from last session — never resetting), the active fronts and clocks (deriving the strong start from what the world did, not from fresh invention), and the vault entities in play. The output is a launchpad: a strong start with a read-aloud block, three to five likely scenes, the secrets and clues to potentially reveal this session keyed to R-IDs, the NPCs and threats in play by exact vault name, rewards, and "if they stall" backstops that push a grim portent. This is a plan, not a script — it is abandoned the moment the table diverges. Persists a `sessao` entity through `rpg-preserve`.

### rpg-encounter-builder — the mechanical layer

The encounter math the loremaster skills deliberately skip. Given party level and size plus a scene or threat brief, it selects a threat tier (trivial / low / moderate / severe / extreme), assembles creatures referenced to Archives of Nethys category pages (never a `?ID=` deep link), and shows the XP-budget arithmetic line by line against the total — always stating the assumed party level and size. It adds hazards (if any) and treasure by level, then wraps the whole encounter as a situation: an objective beyond "kill everything", a terrain feature, the reason the fight exists in the campaign, and how it escalates or ends. The math and the situation are inseparable — a correct budget with no situation points nowhere, and a vivid scene with no math is unrunnable. Persists an `encontro` entity through `rpg-preserve`.

### rpg-embate-builder — the non-combat mechanical layer

The sibling of `rpg-encounter-builder` for everything the dice resolve without a sword: swaying a council, losing a pursuer, researching a forbidden truth, breaching a keep unseen, a single white-knuckle Acrobatics leap. It is **scalable** — it handles a single dramatic check (DC + the four degrees of success + a fail-forward consequence) and a full structured **Victory Points challenge** alike, and it ships the four official PF2e subsystem presets (Influence, Chase, Research, Infiltration) plus a generic VP model. Given party level and size, it sizes the VP target and thresholds against the official scale (quick 3–5, long 7–10, most-of-a-session 15–25, adventure 25–50), anchors every DC to the Level-Based and Simple DC tables, and shows the VP arithmetic. Then it wraps the challenge as a situation grounded in the design lessons of skill challenges: it **measures a world-state** (the council's favor, the pursuer's distance) rather than abstract successes, describes the **situation not a fixed skill list** (problem, not puzzle), and makes every failure **fail forward** — a complication or a new path, never a dead end. Persists a `desafio` entity through `rpg-preserve` (optionally with a `relogio` clock for the VP track).

### rpg-treasure-builder — the loot layer

The by-the-book counterpart to the encounter builder, for everything below the relic tier. The encounter builder outputs a gp *number*; this skill **itemizes** it. Given a budget (one encounter's allotment, a whole level, or a named value) plus party level and size, it converts the official PF2e Treasure-by-Level breakdown into concrete loot — permanent items, consumables, currency, gems, and art objects by item level — referenced to Archives of Nethys category pages, with the arithmetic shown against the budget and the party-size adjustment applied. Notable items become `item` entities (with value, item level, rarity, and category) through `rpg-preserve`; bulk currency stays aggregate. It maintains a `## Wealth` section in the party overview — expected vs. awarded by level — so the GM can see drift, and hands off to `rpg-treasure-forge` to reconcile against the players' actual Foundry sheets. Legendary relics stay with `rpg-artifact-creator`; this skill references them, it doesn't design them.

### rpg-gm-run-sheet — the table overlay

The read-out of the other three skills. It does not generate new fiction — it reads the session-prep one-pager, the clue map, and the active fronts and clocks, and compresses them into one printable page the GM glances at mid-session. Six sections: the strong start (read-aloud block), the scene beats checklist, the secrets-and-clues checklist keyed to revelation IDs with tick boxes for each placed clue, NPC quick-refs (name, want, one voice line), the active clocks dashboard (segments/filled, next portent), and the "if they stall" backstops tied to grim portents. Tool-agnostic — usable next to any VTT or at a physical table. This is the one skill that writes nothing to the vault; the run sheet is ephemeral, saved as a loose `run-sheet-<slug>.md` in the working folder. The canonical session record is the `sessao` note from `rpg-session-recap`.

### rpg-session-recap — the return edge

The skill that closes the loop. Every other skill in the kit prepares or runs a session; this one reconciles what happened after it. Given the GM's post-session account — pasted notes, a dictated summary, or a linked transcript to enrich and verify — it extracts the session's key beats, matches every named entity to the vault by exact canonical name, and drafts a change set: updated `sessao` outcomes, new `evento` entities, `quest.status` flips, revealed clue-map IDs, and NPC/faction state shifts. What makes it more than a recap writer is the **reconciliation**: when the account contradicts what the vault or the campaign bible currently holds — an unresolved name, an ambiguous outcome, a fact that breaks canon — it stops and asks the GM which path to take instead of guessing, batching the unambiguous changes for one approval and adjudicating conflicts one at a time. Persists everything through `rpg-preserve`'s **body-preserving update path**, so an existing quest's description or an NPC's dossier prose survives a status change intact — the ordinary create flow would silently rebuild the note and discard it. Hands off to `rpg-front-tracker` (advance the clocks from this session) and `rpg-session-prep` (plan the next one from the reconciled state).

## Integration — the vault as shared memory

The gamemaster kit communicates with the rest of the ecosystem **via the Obsidian vault**, never plugin-to-plugin. It reads vault entities (`npc`, `local`, `faccao`, `quest`, `inimigo`, `ato`) and loose files (the campaign bible and the clue map). It writes only through the **`rpg-preserve` skill** — the write gate provided by the `rpg-vault-guardian` plugin. This is the ports-and-adapters design: the gamemaster core never imports the guardian's code; it knows only the contract (entity types and required fields) and routes candidates to `rpg-preserve` to validate and write.

```
  LOREMASTER (author)            VAULT = shared contract              GAMEMASTER (prep/run/recap)
  ──────────────────────         ────────────────────────────         ─────────────────────
  campaign-foundation ─────────▶ campaign-bible (loose) ◀────update── session-recap (Deliberate Exceptions)
                                                          ─────read──▶ session-prep
  faction-creator (plan) ──────▶ faccao entity ◀──────advance──────  front-tracker
                                                ◀──────update──────  session-recap (status/body note)
  clue-mapper ─────────────────▶ clue-map (loose, R-IDs) ◀───tick── session-recap
                                                          ────read──▶ session-prep + run-sheet
  region/city/loc/npc ─────────▶ npc/local/faccao entities ──read──▶ all skills
                                                ◀──────update──────  session-recap (status/body note)
                                 frente/relogio (ENTITY) ◀──write── front-tracker (via rpg-preserve)
                                 sessao (ENTITY) ◀────write/update── prep + session-recap (via rpg-preserve)
                                 encontro (ENTITY) ◀─────write────── encounter-builder (via rpg-preserve)
                                 evento (ENTITY) ◀───────write────── session-recap (via rpg-preserve)
                                 quest (ENTITY) ◀────────update───── session-recap (status flip, via rpg-preserve)
                                 desafio (ENTITY) ◀──────write────── embate-builder (via rpg-preserve)
                                 jogador (ENTITY) ◀──────write────── party-forge (via rpg-preserve)
                                 item (ENTITY) ◀─────────write────── treasure-builder (via rpg-preserve)
                                 party-<slug> (loose) ◀───────────── party-forge (composition) + treasure-builder (## Wealth)
                                 run-sheet (loose printable) ◀───────────────────── gm-run-sheet
                                 session-recap-<slug> (loose) ◀────────────────────  session-recap
```

## Four new vault entity types

Installing `rpg-gamemaster` and running `rpg-front-tracker`, `rpg-encounter-builder`, or `rpg-embate-builder` will write entities of four new types. These are defined in the `rpg-vault-guardian` schema (`scripts/schema.mjs`) and live in their own folders:

| Entity type | Folder | Written by | What it holds |
|---|---|---|---|
| `frente` | `frentes/` | rpg-front-tracker | impulse, impending doom, status (`active`/`dormant`/`resolved`), linked faction and antagonist |
| `relogio` | `relogios/` | rpg-front-tracker | segments (4/6/8), filled count, status (`ticking`/`filled`/`paused`), linked front |
| `encontro` | `encontros/` | rpg-encounter-builder | threat tier, party level/size, creature refs, location, session link |
| `desafio` | `desafios/` | rpg-embate-builder | subsystem (influence/chase/research/infiltration/generic), VP format, scale, VP target, party level; linked location/npcs/faction/clock |

If your vault was scaffolded before `rpg-gamemaster` was installed, run `/rpg-init` again to add the `frentes/`, `relogios/`, `encontros/`, and `desafios/` folders.

`rpg-party-forge` also writes entities — `jogador` (player characters) — but that type is **not new**: `jogador` predates the gamemaster kit (it's consumed by the Foundry ownership skill), so its `jogadores/` folder already exists in every scaffolded vault. Party-forge is simply the first skill to *author* it. As of guardian 1.2.0 the `jogador` schema gained a `region` relation (a PC's home region, now a validated link), so re-validate older PC notes if you have them.

`rpg-treasure-builder` likewise authors the pre-existing `item` type (folder `itens/`). As of guardian 1.3.0 the `item` schema gained structured loot fields — `value` (gp), `item_level`, `rarity` (`common`/`uncommon`/`rare`/`unique`), and `category` (`permanent`/`consumable`/`currency`/`art`/`gear`) — so the wealth tracker can sum and the Foundry side can type loot correctly.

`rpg-session-recap` authors the pre-existing `evento` type (folder `eventos/`) — defined in the schema since the guardian's first release, but no skill wrote it until now. It's also the first gamemaster skill to **update** existing entities rather than only create new ones: it flips `quest.status`, adds a `sessao`'s outcomes, and records `npc`/`faccao` state shifts through `rpg-preserve`'s body-preserving update path (added alongside this skill), which patches only the changed frontmatter fields and leaves the note's body untouched.

## Install

```
/plugin marketplace add ~/projects/rpg-marketplace
/plugin install rpg-gamemaster@rpg-marketplace
/reload-plugins
```

Confirm with `/skills` (you should see the eight `rpg-*` skills: `rpg-party-forge`, `rpg-front-tracker`, `rpg-session-prep`, `rpg-encounter-builder`, `rpg-embate-builder`, `rpg-treasure-builder`, `rpg-gm-run-sheet`, `rpg-session-recap`).

For persistence, also install `rpg-vault-guardian` — the gamemaster skills write all vault entities through its `rpg-preserve` write gate. Without it, the skills produce output but will not persist to disk.

New here? Run `/rpg-gamemaster-help` for a guided tour of the kit's workflows.

## Typical session cycle

**Before the campaign (once):** `rpg-party-forge` — run session zero; build the PCs (`jogador` entities) anchored to the world, and capture the party level/size the cycle below reads.

1. **Between sessions:** `rpg-front-tracker` — advance the clocks based on last session; update `frente` + `relogio` entities.
2. **Prep day:** `rpg-session-prep` — read the updated world state, assemble the one-pager; write the `sessao` entity.
3. **Encounter math (if needed):** `rpg-encounter-builder` — balance the flagged fights; write `encontro` entities.
4. **Non-combat challenges (if needed):** `rpg-embate-builder` — structure the social/chase/research/infiltration scenes and dramatic checks; write `desafio` entities.
5. **Sitting down to run:** `rpg-gm-run-sheet` — compress everything to one printable page.
6. **After the session:** `rpg-session-recap` — reconcile the GM's account against the vault, adjudicate any divergence, then update `sessao`, create `evento`s, and flip `quest.status`.
7. **Back to step 1:** `rpg-front-tracker` reads the reconciled `sessao` from step 6 to advance the clocks — and the cycle repeats.

## Conventions

- **Tool-agnostic core.** No specific VTT. Creature and rule references point to [Archives of Nethys](https://2e.aonprd.com/) category pages (e.g. `/Monsters.aspx`, `/Deities.aspx`) — never `?ID=` deep links, never an external app's compendium.
- **Original worlds, PF2e toolkit.** Settings are your own; mechanics and lore (deities, planes, bestiary, encounter math) are Pathfinder 2e post-Remaster.
- **Your language.** Skills generate in the language you write in (PT-BR in, PT-BR out), keeping PF2e proper names and AoN URLs in English as canon anchors. Vault folder names and entity type values are Portuguese by convention.
- **Handoffs, not invention.** When a session plan needs a node that doesn't exist in the vault, the skill emits a structured handoff to the relevant loremaster skill and stops. It does not invent world content.

---

*The session prep and run layer of a three-part kit: `rpg-loremaster` builds the world, `rpg-gamemaster` turns it into runnable sessions, and `rpg-vault-guardian` persists and validates the vault they share.*
