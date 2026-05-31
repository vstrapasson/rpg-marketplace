---
description: How to use rpg-vault-guardian — scaffold, safely write, and audit an Obsidian RPG-campaign vault.
---

Present this guide to the user conversationally — walk them through what the plugin is for and the workflows below — then offer to start the workflow that best fits where they are (a brand-new vault, a single edit, or a full audit).

# What it is for

You keep your campaign notes in an Obsidian (or plain Markdown) vault, and you want every region, NPC, quest, and lore note to follow a consistent schema with valid frontmatter and unbroken wikilinks. This plugin gives you a single validated write path so bad entities never hit disk, an on-demand audit that finds and fixes schema, link, and coherence problems and rebuilds your indexes, and a one-command scaffolder to lay down the expected folder structure for a brand-new campaign.

# Quick start

Launch Claude Code from your campaign vault root — the folder that contains (or will contain) the entity subfolders like `regioes/` and `npcs/`:

```bash
cd ~/Documents/obsidian/main && claude
```

- **Brand-new vault?** Run `/rpg-init` first to scaffold the 17 folders.
- **Existing vault?** Just ask Claude to create or edit an entity (e.g. "create an NPC named Sister Avelina") — the write gate engages automatically.

# What you can do

| How to invoke | What it does | Reach for it when |
| --- | --- | --- |
| `/rpg-init` | Scaffolds the campaign's initial 17-folder structure in the current directory, then reports which folders were newly created vs. already existed. | Once, at the very start of a new campaign vault, before you create any entities. |
| `create an NPC named ...` (rpg-preserve) | The single write point: picks the correct folder for the entity type, builds frontmatter and content, validates in memory, and writes the `.md` only when there are zero errors — otherwise it lists the offending fields and asks you to fix them. | Every time you create or edit any of the 15 entity types. The only sanctioned way to write entities to disk. |
| `audit my campaign` (rpg-audit) | Runs a 7-step audit: snapshot, deterministic validation, safe auto-fixes, LLM health check, confirmed destructive fixes, MOC/index regeneration, final report. | Periodically or after bulk edits, to repair missing frontmatter, broken links, orphans, and wrong-target references and rebuild your maps-of-content. |
| `have the rpg-guardian audit the vault` (agent) | Runs the full 7-step audit in an isolated subagent context, then returns a structured summary of initial errors, fixes applied, MOC regeneration, and errors remaining. | When you want the complete audit without cluttering your main conversation, or just a clean consistency report. |

# Workflows

### Bootstrap a brand-new campaign vault — from an empty folder to a structured vault with your first validated entities

1. Create or choose an empty folder and launch Claude Code from inside it: `cd ~/Documents/obsidian/my-campaign && claude`.
2. Run `/rpg-init` to scaffold the 17 folders, then review the output showing which folders were created.
3. Ask Claude to create your first entities (e.g. a region, then NPCs and quests inside it). Each request routes through the rpg-preserve write gate, which validates frontmatter and links and writes the `.md` only when there are zero errors.
4. If the gate reports validation errors, supply the missing or corrected fields when asked and let it retry until the file is written.

### Safely add or edit an entity in an existing vault — create or update one note without breaking the schema

1. Launch Claude Code from the existing vault root (the folder containing `regioes/`, `npcs/`, etc.).
2. Ask Claude to create or edit the entity in natural language (e.g. "add a faction called The Ashen Choir linked to the region Greymoor") — this triggers rpg-preserve.
3. The gate picks the correct folder for the type and builds the frontmatter (wikilinks quoted as `"[[Name]]"`, status defaulting to `stub`, `updated` stamped to today), then validates the candidate.
4. On zero errors it writes the file and confirms the path; on errors it shows each offending field and asks you to fix and retry.

### Audit and repair an existing campaign — find and fix schema, link, coherence, and orphan problems, then rebuild indexes

1. Launch Claude Code from the vault root and ask Claude to audit the campaign — this triggers rpg-audit. (For a legacy vault with many untyped notes, it enters migration mode first.)
2. Step 1: accept or decline the optional pre-audit snapshot commit (requires Git).
3. Step 2: review the deterministic validation summary of errors and warnings grouped into schema, links, and coherence.
4. Steps 3-5: let the safe auto-fixes apply (infer missing type from folder, stamp missing `updated`), then review the LLM health check and approve any proposed destructive fixes.
5. Steps 6-7: let it regenerate the MOCs and read the final report ending in the remaining-errors count.

### Hands-off integrity report via the isolated agent — a complete audit and clean report without cluttering your main conversation

1. From the vault root, ask Claude to run the rpg-guardian agent against the campaign.
2. The agent executes the full 7-step rpg-audit flow in its own isolated context — snapshot, validation, auto-fixes, health check, confirmed destructive fixes, and MOC regeneration.
3. Read the structured summary it returns: initial error and warning counts, fixes applied, whether MOCs were regenerated, and the final "X error(s) remaining".
4. Act on any remaining errors it flags — for example, follow up with targeted rpg-preserve edits.

# Good to know

- **Always launch from the vault root.** Everything is path-relative to the current working directory, so starting Claude Code anywhere else makes commands operate on the wrong location.
- **Prerequisites:** an Obsidian or plain-Markdown vault to act as the campaign (the plugin is not bundled with one), and **Node.js** on your PATH. **Git** is only needed for the optional pre-audit snapshot commit, which you can decline.
- **Entity folders use Portuguese names:** `regiao→regioes/`, `local→locais/`, `npc→npcs/`, `jogador→jogadores/`, `inimigo→inimigos/`, `faccao→faccoes/`, `quest→quests/`, `sessao→sessoes/`, `evento→eventos/`, `ato→atos/`, `item→itens/`, `lore→lore/`, `frente→frentes/`, `relogio→relogios/`, `encontro→encontros/` — 15 entity types (the last three are the `rpg-gamemaster` prep/run layer); `/rpg-init` scaffolds 17 folders.
- **rpg-preserve is a hard write gate** — it will not write a note while any validation error remains; it lists each offending field and asks you to fix and retry.
- **Frontmatter is enforced:** single wikilinks are quoted-and-bracketed (`"[[Entity Name]]"`), lists of links are one quoted item per YAML line, status defaults to `stub`, and `updated` is auto-stamped with today's date.
- **Auto-fix vs. confirm:** in rpg-audit, Step 3 auto-fixes (type inferred from folder, missing `updated` stamped) apply without confirmation, while Step 5 destructive fixes require your explicit confirmation.
- **Legacy vaults:** if many notes in entity folders lack a `type` field, the audit or guardian switches into migration mode before the normal flow — this is the path for first-time cleanup.
- **Agent vs. skill:** the rpg-guardian agent is an isolated-context wrapper around the same rpg-audit flow — use it for a clean report; use the rpg-audit skill directly for an interactive, in-conversation walkthrough.
