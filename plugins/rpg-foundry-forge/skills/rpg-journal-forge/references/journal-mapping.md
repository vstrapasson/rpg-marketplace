# Journal mapping — vault type → Foundry journal

The MCP exposes `create-quest-journal`, `update-quest-journal`, `link-quest-to-npc`, `create-campaign-dashboard`, `list/search-journals`. There is **no plain "create journal entry" tool** — so `create-quest-journal` doubles as the generic journal-maker (it produces a titled HTML JournalEntry with pages; the "quest" label is cosmetic).

| Vault type | Foundry | How |
|---|---|---|
| `quest` | quest journal | `create-quest-journal(questTitle, questDescription, questType, difficulty, location, questGiver, npcName, rewards, additionalPages)`; then `link-quest-to-npc` for giver (`quest_giver`) and key npcs. `questType`/`difficulty` are judgment (default side/medium; upgrade to main/mystery/hard from the body + tags). `rewards` from `items`. |
| `faccao` | faction journal | generic `create-quest-journal` titled with the faction; body from the note; list key members/HQ/rivals as `additionalPages` or inline. |
| `lore` | lore journal | generic; body from the note. |
| `frente` | threat-tracker journal | generic; body = the front's pressure; add a page per linked `relogio` clock: name, `filled`/`segments`, `status` (ticking/filled/paused). |
| `relogio` | (page under its front) | usually folded into the `frente` journal as a clock page, not its own entry. |
| `ato` | campaign dashboard | NOT per-act journals — feed ALL acts into ONE `create-campaign-dashboard` (`dashboardTemplateForActs`: `custom` template, one `chapter` part per act ordered by `number`). |
| `evento` | journal page | a beat under its session/act (or its own short entry); only make a scene if it has a distinct `location` (that's rpg-scene-forge's job, not here). |

## Linking
`link-quest-to-npc(journalId, npcName, relationship)` with `relationship ∈ {quest_giver, target, ally, enemy, contact}`. Map `quest.giver` → `quest_giver`; `quest.npcs` → `target`/`enemy`/`contact`/`ally` per the npc's `role` and the quest's lore. The NPC must exist in Foundry first (as actor or via the journal); the conductor orders accordingly — if an NPC isn't built yet, record the link as pending and apply it after.

## PF2e links
If you cite Archives of Nethys, use category-level URLs (e.g. `/Monsters.aspx`), never `?ID=` deep links (the marketplace convention).
