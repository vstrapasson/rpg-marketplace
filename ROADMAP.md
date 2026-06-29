# ROADMAP — RPG Marketplace

Ideas for new skills and functionality, with where they fit, what they persist/feed, and a viability note. This is an idea backlog, not a commitment — items are roughly ordered by leverage within each section.

The kit today is strong on the **forward** flow — author (loremaster) → prep (gamemaster) → realize in Foundry (foundry-forge) — backed by the guardian's schema + write gate. The two biggest structural gaps are **the return edge of the loop** (nothing systematically captures what happened after a session) and **the players' side** (`jogador`/PCs are consumed but never authored).

## Legend

- **Home** — which plugin the skill would live in.
- **Persists / feeds** — vault entities it writes, and what downstream consumes them.
- **Status** — 💡 idea · 🔬 viability-checked · 🚧 blocked on a dependency.
- **Size** — rough effort (S / M / L), mirroring how the embate-builder pair was scoped.

---

## A. Core lifecycle gaps (highest leverage)

### A1. `rpg-session-recap` — close the loop 🔬 · ⭐ top pick · ⏸ parked (revisit later)
- **Home:** gamemaster · **Size:** M
- **Status note:** deferred by decision — the concept and input architecture (A1a) are settled, but the build waits until the transcript format and Discord pipeline are pinned down. Highest conceptual leverage; not the next thing to build.
- The missing return edge. Today the cycle is `front-tracker → session-prep → encounter/embate-builder → run-sheet → ???`. Nothing ingests "what happened" and updates downstream state — the GM re-feeds `front-tracker` by hand, and `evento`/`quest.status`/clue reveals are never captured.
- **Does:** takes the GM's post-session account and (1) updates the `sessao` note with outcomes, (2) creates `evento` entities, (3) flips `quest.status` (available→active→completed/failed), (4) marks clue-map revelation IDs as revealed, (5) records NPC/faction status shifts, (6) hands off to `rpg-front-tracker` to advance clocks.
- **Persists / feeds:** `sessao` (update), `evento`, `quest` (status); feeds next `front-tracker` + `session-prep`.
- **Why first:** turns the vault from a forward pipeline into a living, self-updating system. Closes the one loop the kit is missing.

#### A1a. Recap input — the transcript pipeline (architecture, exploration / undecided)
The schema **already anticipates this**: `transcricao` is a NON_ENTITY (folder `sessoes/transcricoes/`) and `sessao.transcript` is a `linkOnly` relation. So a transcript can already be linked to a session; the recap consumes `sessao.transcript`.

**Key boundary:** audio→attributed-text is an **external pipeline**, not a Claude Code job. The Discord→transcript path is solved by existing OSS, so the kit *consumes* text — it never transcribes. Recommended default pipeline:

```
Discord voice ──Craig (multi-track, per-speaker FLAC, free, 6h)──▶ per-speaker tracks
   └─ TASMAS / craig-whisper (faster-whisper per track, word-level, braided) ─▶ attributed transcript
        └─ lands in vault: sessoes/transcricoes/<session>.md  (linked via sessao.transcript)
             └─ rpg-session-recap reads it (and/or GM notes) ─▶ sessao/evento/quest/clue updates
```

**Why per-speaker tracks matter:** Craig records each speaker to a separate track, so speaker labels are clean **for free** — no diarization (the expensive, error-prone step). [Craig](https://craig.chat/) · [TASMAS (Craig→attributed transcript+summary)](https://github.com/KaddaOK/TASMAS) · [WhisperX (word timestamps + diarization)](https://github.com/m-bain/whisperX) · [faster-whisper backend](https://modal.com/blog/choosing-whisper-variants). Local Whisper = free compute; OpenAI Whisper API ≈ $0.006/min (~$1.40 for a 4h session); managed (Deepgram/AssemblyAI) bundle diarization but it's unneeded with per-track audio.

**Open decisions (mine to make):**
1. **Transcript handling (token crux).** A 3–4h session ≈ 40–80k tokens. Options: raw single-pass (fine on the 1M-context model up to a point) · map-reduce by scene/time (robust for huge logs, mirrors the workflow pattern) · pre-condensed in the pipeline (TASMAS already summarizes; cheapest, lossy). Likely: accept raw, chunk internally past ~100k tokens.
2. **Input model.** Transcript-only vs. transcript **OR** GM bullet notes **OR** both (notes = spine, transcript = enrich/verify). Lean: both — the transcript is the richest input, never the *required* one (many sessions won't be recorded).
3. **Speaker → `jogador` mapping.** Craig gives Discord usernames; map once to PCs + GM, stored in the campaign bible/config. Ties to **A2** (party-forge supplies the roster).
4. **Retention + consent.** Recording requires consent. Keep the raw transcript in the vault (gitignored, like `local/`?) or only the distilled recap + an audio link.

### A2. `rpg-party-forge` / session-zero — the players' side ✅ SHIPPED (gamemaster 0.3.0)
- **Shipped:** `rpg-party-forge` in `rpg-gamemaster` — runs a session zero, builds each PC (belief + active wound, want/need, contradiction, table voice) **anchored to the world** by a hook, with a GM-secret convergence layer, and persists `jogador` via `rpg-preserve`. The `jogador` schema gained a `region` relation (guardian 1.2.0). Party **level/size** are captured in a loose `party-<slug>.md` overview the encounter/embate builders now read instead of re-asking. See the `rpg-gamemaster` README. *(Built; chose gamemaster home, no new party entity — composition lives in the loose overview. The player-handout is offered, secrets stripped.)*

### A3. `rpg-creature-builder` — custom statblocks 🔬
- **Home:** gamemaster · **Size:** M–L
- `inimigo` is referenced by `encounter-builder` and placed by `actor-forge`, but **nothing authors a homebrew statblock**. `encounter-builder` only picks Archives of Nethys creatures.
- **Does:** builds a custom `inimigo` from the PF2e GM Core *Building Creatures* level-based tables (AC / HP / saves / attack & spell bonuses / damage / DCs by level + role), wrapped with behavior and signature abilities.
- **Persists / feeds:** `inimigo` (with stats in the body); feeds `encounter-builder` and `actor-forge`.
- **Caveat:** `actor-forge` matches the Foundry **compendium** — a homebrew creature has no compendium entry, so realizing it needs either manual Foundry creation or an MCP "create actor from statblock" extension. Flag at design time.

### A4. treasure — itemized loot + wealth-by-level ✅ SHIPPED (gamemaster 0.4.0 · foundry-forge 0.3.0)
- **Shipped as a builder/forge pair** (the user wanted vault + Foundry sides):
  - **`rpg-treasure-builder`** (gamemaster) — itemizes the official Treasure-by-Level budget into concrete loot (permanent/consumable/currency/art by item level, AoN category refs), scalable hoard↔level, party-size adjusted. Notable items → `item` entities; bulk currency aggregate. Maintains a `## Wealth` section (expected vs awarded) in the party overview.
  - **`rpg-treasure-forge`** (foundry-forge) — the kit's **first vault sync-back**: reads the PCs' live Foundry inventories (`get-character`/`search-character-items`), reconciles Actual vs Expected/Awarded in the Wealth section, and pushes awarded loot onto sheets (`add-to-actor`, approval-gated).
  - **Schema:** `item` gained structured loot fields (`value`/`item_level`/`rarity`/`category`) in guardian 1.3.0. Foundry realization of `item` was already covered by the existing `manage-world-items` pipeline. New-character wealth (Character Wealth table) deferred. *(Built; chose structured schema, significant-items-as-entities + aggregate currency, Wealth-in-party-overview, read-back + push.)*

---

## B. Media & atmosphere (your two ideas)

### B1. `rpg-sound-director` + `rpg-soundscape-forge` — scene soundtrack ✅ SHIPPED (loremaster 0.4.0 · foundry-forge 0.4.0 · foundry-mcp 0.9.0)
- **Shipped as a director/forge split** (mirroring the art-director/forge precedent — **B2**; both phases built):
  - **`rpg-sound-director`** (loremaster) — the **fourth system-agnostic creator**. Two modes: (A) a campaign **audio style bible** (`campaign-audio-style-<slug>.md`, the sonic analogue of the tone spectrum, injected downward like tone/visual); (B) extracts a scene/`local`/`encontro`'s **audio DNA** and renders a **provider-neutral** music prompt, primary-target **Stable Audio Open** (local ComfyUI) with **Suno** for the rare sung scene. Instrumental by default; vocals only for a diegetic bard/singer. Emits prompts + a **soundtrack manifest**; **prompt-only** — generation stays a documented manual step (`local/gen-music.py`, a provider dispatcher) and binding is the forge's job. The provider seam (registry + `PROVIDERS` adapters) makes adding a cloud provider — Mubert/Stability/Replicate — a one-row change.
  - **`rpg-soundscape-forge`** (foundry-forge) — realizes the manifest: `create-playlist` → `set-scene-playlist` (scene Ambience) → optional `create-ambient-sound` one-shots. Slots into `rpg-forge-conductor` right after `scene-forge` (serialize per scene; approval-gated; **optional/degradable** — scenes still build if the audio tools are absent). Records `{playlistId, soundIds}` in the build manifest's `soundtrack` array.
  - **foundry-mcp 0.9.0** — new audio tools (`create-playlist`, `set-scene-playlist`, `create-ambient-sound`, `list-playlists`) in a new `tools/audio.ts` (`AudioTools`) + Foundry-module handlers (`Playlist.create`, `scene.update({playlist})`, `scene.createEmbeddedDocuments('AmbientSound')`). GM-gated; Data-relative paths only. *(Built; chose the 2-skill split, Stable Audio Open default + Suno-paste vocals, provider-pluggable generation, both phases, loose manifest — no guardian schema change.)*
  - **Follow-up — per-track mixer channels ✅ SHIPPED (foundry-forge 0.6.0 · loremaster 0.6.0):** each `PlaylistSound` routes to one of Foundry's three mixer channels (Music / Environment / Interface), each with its own master fader in the Playlists sidebar — so a layered `simultaneous` bed lets the GM drop the ambience without touching the music mid-scene. `create-playlist` gains an optional `channel` field; the soundtrack manifest gains a **Channel** column (auto-by-role from the path when blank); backward-compatible (omit → everything on Music; no migration of existing playlists).

### B2. `rpg-art-director` — art prompts + campaign visual style bible ✅ SHIPPED (loremaster 0.3.0)
- **Shipped:** `rpg-art-director` in `rpg-loremaster` — the third system-agnostic creator. Two modes: (A) a campaign **visual style bible** (`campaign-visual-style-<slug>.md`, the visual analogue of the tone spectrum, injected downward like tone); (B) extracts an entity's **visual DNA** from its existing description and renders **multi-target, SDXL-first** prompts (Stable Diffusion/ComfyUI primary + Midjourney `--ar/--style/--cref` + Flux/DALL·E on request), with framing/aspect ratio per use. Covers npc/local/regiao/city/faccao/item/scene; defers relics to `artifact-creator`. **Prompt-only** — image generation stays a documented manual step (reuses `local/comfyui-gen-token.py` + the `journal-forge` handout pattern + `actor-forge` `update-token imagePath`); the skill never calls ComfyUI. See the `rpg-loremaster` README. *(Built; chose loremaster prompt-only, companion style-bible file, multi-target SDXL-first, full coverage.)*

### B3. `rpg-dungeondraft-battlemap` — executable battlemap files ✅ SHIPPED (loremaster 0.5.0)
- **Shipped:** the **executable counterpart** to `rpg-map-architect`. Where map-architect emits a top-down *image prompt* (painted PNG), this skill generates an **editable `.dungeondraft_map` file** via a stdlib-only Python toolkit (`scripts/ddmap.py`) validated by reverse-engineering the format — designs the functional layout (rooms, circulation, doors/windows, water, terrain, light), composes from a real-DD scaffold (silent-fail-proof header), validates every texture against the pck index. The GM opens it in Dungeondraft, hand-tunes, and exports **Universal VTT (`.dd2vtt`)** carrying vision walls + lights into Foundry. Prompt/file siblings cross-linked; like map-architect it emits the artifact and hands off (no MCP, no scene build — `rpg-scene-forge` lights it by name). **Deps:** Python 3 + the user's Dungeondraft license; third-party asset packs optional. Promoted from the vault lab where it was format-decoded and eval-tested. *(Built; chose loremaster sibling home, file-not-prompt, default-assets + optional-pack.)*

---

## C. Smaller enhancements (not full skills)

- **Foundry → vault sync-back** 🔬 — read live Foundry state (defeated tokens, completed quests, journal edits) back into a recap. Pairs with **A1**; uses existing MCP read tools (`get-character`, `list-journals`, `list-characters`). Closes the bidirectional gap (forge is one-way today).
- **`rpg-downtime`** 💡 — PF2e downtime activities between sessions (Craft, Earn Income, Retraining, Treat Wounds montages). Could persist `evento`s and adjust wealth (ties to **A4**).
- **`rpg-travel` / exploration** 💡 — overland travel / journey / hexcrawl (PF2e exploration mode), with encounter + embate hooks along the route.
- **Marketplace onboarding** 💡 — a top-level tour of the 4 plugins + a "new campaign from zero" wizard chaining loremaster → guardian → gamemaster.
- **`rpg-quest-creator`?** 💡 — verify whether any skill actually *authors* a `quest` (it's consumed by session-prep / journal-forge but may have no dedicated creator). If not, a quest designer (objective, stakes, clue-map links, reward) is a real gap.

---

## D. Quality & reliability gates

### D1. Per-artifact Foundry QA — pre-write + post-write ✅ SHIPPED (foundry-forge 0.5.0)
- **Shipped:** two agents that close the per-artifact QA gap (the kit had only the whole-build `rpg-foundry-reviewer`). Promoted from the vault lab, where they paid for themselves on the table.
  - **`rpg-scene-stress-tester`** (pre-write gate) — adversarial read-only audit of ONE scene/journal before it's written: causal chain, timeline, who-knows-what per NPC and per PC (against `clue-map-*.md` + the PCs' `## ⚠️ Verdade do GM` layer), space physics, prose. A 🔴 Blocker stops the write. Wired into `rpg-journal-forge` (narrative content) + the conductor playbook (step 3.3).
  - **`rpg-journal-verifier`** (post-write check) — fetches a journal back via read-only MCP and verifies theme classes, well-formed enrichers (+ mojibake), expected language (catches the AI-rewritten generic-English main page), verbatim snippets, and folder; declares it can't confirm the visual render.
  - **Also shipped:** `rpg-journal-forge/references/paizo-theme.md` — the Paizo (Abomination Vaults) box + enricher cheat-sheet, an optional theme the verifier checks for. *(Built; chose foundry-forge home, journal-forge wiring, genericized from the campaign vault.)*

### D2. Foundry → vault sync-back 🔬 — (see C, pairs with A1)

---

## Dependencies worth tracking

| Need | Unblocks | Status |
|---|---|---|
| MCP audio tools (`create-playlist`, `set-scene-playlist`, `create-ambient-sound`) | B1 Phase 2 | ✅ delivered (foundry-mcp 0.9.0) |
| MCP "create actor from custom statblock" | A3 realization in Foundry | not in current foundry-mcp |
| Local music model server (Stable Audio Open), à la ComfyUI | B1 generation | ✅ delivered (`local/gen-music.py`, provider-pluggable) |

---

*Maintained alongside the marketplace. When an item ships, move it out of the roadmap and into the relevant plugin's README + the marketplace versions.*
