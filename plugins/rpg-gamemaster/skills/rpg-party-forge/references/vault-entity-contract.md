# Vault Entity Contract (party-forge)

> **Rule:** This skill **never writes entity files directly.** It assembles a typed entity candidate and hands it to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate. Reads are direct — use Glob/Read on the vault's typed folders (`jogadores/`, `faccoes/`, `regioes/`, `locais/`) and loose files (`campaign-bible-*.md`, `clue-map-*.md`) at the vault root.

> **The one exception:** the **party overview** (`party-<slug>.md`) is a *loose* campaign file, not a typed entity — write it directly, like `rpg-gm-run-sheet` writes its run sheet. See `party-composition.md`.

> **Sync obligation:** this table mirrors a subset of the vault guardian's `scripts/schema.mjs`. It documents only the entity types this skill reads or emits. If `schema.mjs` changes (fields added, enum values extended, relation targets changed), this file **must be updated to match** — drift here causes silent breakage when rpg-preserve validates a candidate against the current schema.

---

## Entity types this skill uses

| type | folder | required fields | key own fields | key relations |
|---|---|---|---|---|
| **jogador** | jogadores/ | type, player | status (stub/draft/active/archived) | **faction→faccao, location→local, region→regiao** |
| faccao | faccoes/ | type | — | (read for hooks; emit a stub only if a hook needs a new one) |
| regiao | regioes/ | type | — | (read for hooks; stub on demand) |
| local | locais/ | type, region | — | region→regiao (read for hooks; stub on demand) |

- **`jogador` is the entity this skill authors** — the first kit skill to do so. `player` is the **real person's name** (required); the note name is the **character's name**.
- `region` is a relation as of guardian 1.2.0 — a PC's home region is now a validated, coherence-checked link (previously an unguarded passthrough). Always write it as `"[[Exact Region Name]]"`.
- `faccao`/`regiao`/`local` are read to anchor a PC's hook. If the hook points at a node that **doesn't exist**, prefer a **handoff** to the loremaster creator (`rpg-faction-creator`/`rpg-region-creator`/`rpg-location-creator`); emit a *stub* candidate only when you just need the link to resolve now.

## Wikilink rule

All relation fields are written as wikilinks: `"[[Exact Vault Name]]"`. The name inside the brackets must exactly match the vault note's filename (without extension). If it doesn't, rpg-preserve will flag a broken link (`broken-link`) and refuse to write — and now that `region` is a declared relation, a region pointing at the wrong type is caught as `wrong-target-type` too.

## The persistence heredoc (how rpg-preserve is invoked)

rpg-preserve owns this; the contract you hand it is: build a `jogador` frontmatter object, build the note content, validate in memory, and only write on zero errors. Shape of the candidate:

```js
// inside rpg-preserve's context — buildFrontmatter stamps `updated` and normalizes
const fm = buildFrontmatter('jogador', {
  status: 'draft',
  player: 'Lucas',                       // REQUIRED — the human
  location: '[[Caldévora]]',             // → local
  region: '[[O Vale dos Alicerces]]',    // → regiao  (now validated)
  faction: '[[A Mão Funda]]',            // → faccao (optional)
});
const content = buildNoteContent(fm, 'Uro — o goblin que sobrou'); // note name = character
const report = await validateCandidate('Uro — o goblin que sobrou', content, 'jogador', vaultDir);
// report.summary.errors === 0  ?  writeEntityFile(...)  :  show issues and ask
```

The full GM-facing body (everything below the frontmatter) is composed from `output-template.md` and passed as the note content. The `## ⚠️ Verdade do GM` section lives **inside the `jogador` note body** — it is GM-only by convention, not a separate file; never surface it to the player.

## Reading vault state

Before building, read current state directly:

```
Glob jogadores/         → the existing party (convergence + composition)
Read jogadores/<name>.md → another PC's fields and threads to cross
Glob faccoes/ regioes/ locais/ → candidate hook targets
Read faccoes/<name>.md   → a faction the PC could anchor to (exact name)
Read campaign-bible-*.md → tone, central truth, antagonist (the secret well)
Read clue-map-*.md       → revelations a PC's secret could feed
```

Do not parse YAML manually — read the frontmatter fields as plain text and extract the values you need. The vault's frontmatter is flat YAML (single-level only; no nested maps).
