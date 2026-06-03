---
name: rpg-journal-forge
description: Writes the narrative documents of a session into Foundry VTT — quest journals (with NPC links), generic lore/faction/front journals, and a campaign dashboard built from the acts — driving the foundry-vtt-mcp server. Consumes vault `quest`, `lore`, `faccao`, `frente`, `relogio`, `ato`, `evento`. Prefers updating an existing journal over creating a duplicate. Invoked by rpg-forge-conductor; also use directly for "cria os diários das quests no Foundry", "monta o dashboard da campanha", "write the quest journals".
---

# RPG Journal Forge — quests, lore, dashboard

## What this skill is for
Realize the vault's narrative entities as Foundry journals. Content comes from the vault notes' bodies + relations — you format and enrich, you don't invent plot.

## Workflow
1. **Prefer existing.** `search-journals`/`list-journals` by title before creating; if it exists, `update-quest-journal` instead of duplicating. (`references/prefer-existing-journals.md`.)
2. **Quests** → `create-quest-journal(...)` from `foundry-args.questFieldsFromVault` (title, description from body, giver, rewards from items; enrich description/type/difficulty as judgment). Then `link-quest-to-npc(journalId, npcName, relationship)` — `giver` → `quest_giver`, listed `npcs` → `target`/`contact`/`enemy` as the lore implies. Link only after the NPC exists (the conductor orders NPC actors/journals first when possible).
3. **Lore / faction / front** → there is NO plain "create journal" MCP tool, so use `create-quest-journal` as a GENERIC journal (a titled HTML entry); see `references/journal-mapping.md`. A `frente` becomes a threat-tracker journal; its `relogio` clocks become pages/sections (segments/filled/status).
4. **Dashboard** → one `create-campaign-dashboard` from the acts (`foundry-args.dashboardTemplateForActs`): `template: "custom"` with a chapter part per `ato`, or `five-part-adventure` if no acts. Supply campaign title/description (judgment, from the campaign-bible if present).
5. **Narrative locations** → for a `narrativeLocals` `local` (a story place with no encounter), make a journal **handout** (folder `Locations`): the location body as read-aloud + an `<img>` for an image the user generated separately; remind the GM to **Show Players**. (See `references/journal-mapping.md`.)
6. **Folders** → set `folderName` on every create per the hybrid convention (`foundry-args.journalFolder`): quests by act, the rest by type. Record the folder in the manifest.
7. Return `{ journalId | dashboardId, folder, linkedNpcs }` per entity to the conductor.

No scene-write race here (journals aren't scene-embedded) — but still idempotent via the manifest.

Load `references/journal-mapping.md` and `references/prefer-existing-journals.md`.
