# rpg-vault-guardian

Claude Code plugin for ensuring the structural integrity of Obsidian vaults used in RPG campaigns.

## What it does

- **/rpg-vault-guardian-help** — Guided tour of the plugin's workflows (start here)
- **/rpg-init** — Scaffolds the initial folder structure (17 folders derived from the schema)
- **rpg-preserve** — Write gate: validates every entity in memory before writing to disk
- **rpg-audit** — 7-step audit: validation, auto-fix, LLM health check, MOCs
- **rpg-guardian** — Isolated-context audit agent

## Usage

Launch Claude Code from the campaign vault root (folder containing `regioes/`, `npcs/`, etc.):

    cd ~/Documents/obsidian/main
    claude

## Tests

    cd plugins/rpg-vault-guardian && npm test
