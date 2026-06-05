---
description: How rpg-foundry-forge works — compile a validated vault into a playable Foundry session.
---

# rpg-foundry-forge — help

Present this conversationally.

**What it is.** The realization layer of the RPG marketplace: it **compiles** a validated Obsidian vault (built by loremaster/gamemaster, validated by the guardian) into a **playable Foundry VTT session**, driving the `foundry-vtt-mcp` server. It compiles — it does not author. Missing data is surfaced, never invented.

**Compile units:** a **`sessao`** (a whole game night), an **`encontro`** (one combat), or a **`desafio`** (one non-combat challenge — social/chase/research/infiltration). Acts/whole-campaign are future.

**What it builds:** scenes + mood lighting · creature actors placed as tokens with correct disposition (+ optional AI token art) · quest/lore journals + a campaign dashboard · player ownership · assembled encounters · non-combat challenges (challenge journal + DCs + live `request-player-rolls` + a VP progress clock).

**Also (on demand, not a compile unit):** `rpg-treasure-forge` **syncs party wealth** — it reads each PC's actual Foundry inventory + currency (`get-character`/`search-character-items`), reconciles the **`## Wealth`** section of the party overview (the kit's **first vault sync-back**), and pushes awarded loot onto the PCs' sheets (`add-to-actor`, approval-gated). Ask for it with "sync the party's wealth" / "push the loot to the sheets".

**Prerequisites:**
- `foundry-vtt-mcp` registered, and the **Foundry MCP Bridge module connected** (reload the world / `/mcp` reconnect after a restart).
- For full features: the local MCP patches (`update-token imagePath`, the scene-geometry tools) and ComfyUI (`:8000`) for map/token-art generation. Missing optionals degrade gracefully — preflight tells you what will be skipped.

**Commands:**
- `/forge-preflight` — check all dependencies (go/no-go) before building.
- `/forge-compile <note>` — compile a `sessao`, `encontro`, or `desafio`: preflight → resolve → **dry-run plan (you approve)** → build → verify → review.
- `/forge-status` — what's built vs pending for the current world.
- `/forge-verify` — re-audit the built session against the vault (after manual Foundry edits).

**Good to know:**
- Builds are **idempotent and resumable** via `build-manifest-<world>.md` in the vault root — re-running skips what's done.
- It **serializes scene writes** (a Foundry quirk) and **prefers existing** scenes/journals by name.
- **Organic-map walls are left to you** in Foundry's wall tool — pixel-precise tracing of painted maps isn't reliable to automate. The plugin lights scenes and places tokens; you draw walls where you want dynamic line-of-sight.
