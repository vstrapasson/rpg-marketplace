# Party Composition — the party overview

The party's **level** and **size** are needed by `rpg-encounter-builder` and `rpg-embate-builder` every time they run — today both skills ask for them cold. This skill captures them **once**, in a party overview the builders read, so the math has a canonical source instead of a re-asked guess.

## What the overview is

A single **loose campaign file** at the vault root: `party-<slug>.md` (the `<slug>` matches the campaign, like `campaign-bible-<slug>.md` and `clue-map-<slug>.md`). It is **not a typed entity** — there is no `party` type in the schema, and deliberately so: party composition is campaign-level prep state, not a validated node. So party-forge **writes it directly** (the same way `rpg-gm-run-sheet` writes its run sheet), not through rpg-preserve.

> If the campaign already keeps a "Party" section in `campaign-bible-<slug>.md`, update that instead of creating a second source — but a dedicated `party-<slug>.md` is the clean default. Don't maintain two.

## What it holds

```markdown
# Party — <Campaign Name>

**Nível:** <party level>   ·   **Tamanho:** <number of PCs>
**Sistema:** PF2e (Remaster)
**Atualizado:** <date>

## Roster
| Personagem | Player | Ancestral/Classe | Função na mesa | jogador |
|---|---|---|---|---|
| <Character> | <Person> | <ancestry/class> | <scout/face/striker/healer/control…> | [[<Character>]] |
| …          | …        | …                 | …                                   | …            |

## Composição & lacunas
- **Papéis cobertos:** [what the party can do — scouting, talking, fighting, healing]
- **Lacunas:** [what's thin — no healer, no face — useful for the GM and for embate DCs]

## Linhas e véus (da session zero)
- **Linhas (nunca em cena):** […]
- **Véus (acontece, não descrito):** […]

## Convergência (GM)
- [one line per crossing thread between PCs — the spine the players don't see yet]
```

- **Nível / Tamanho** are the two fields the builders consume. Keep them current — when the party levels up, update this one line and every downstream calculation follows.
- **Roster** links each PC to its `jogador` entity by exact name, so the overview stays in sync with the vault.
- **Lacunas** (gaps) are genuinely useful downstream: a party with no face makes an Influence `desafio` harder; a party with no healer changes an encounter's threat math.
- **Linhas e véus** belong here because session zero is where they're agreed — keeping them next to the roster makes them easy to honor at the table.
- The **Convergência** block is GM-only (it mirrors the per-PC `## ⚠️ Verdade do GM` convergence notes); keep the file GM-facing.

## How the builders use it

`rpg-encounter-builder` and `rpg-embate-builder` both treat **party level + size as required**. With the overview in place, the intake changes from "ask cold" to "read and confirm":

1. Before asking, **Glob the vault root for `party-*.md`** (or the campaign bible's Party section).
2. If found, **read `Nível` and `Tamanho`** and confirm with the GM ("Party of 4 at level 3, per the party overview — still right?") instead of asking from scratch.
3. If not found, fall back to asking as they do today, and suggest running `rpg-party-forge` to capture it once.

This is the friction the ROADMAP's party-forge "bonus" removes: the canonical answer lives in one place, the builders read it, and a level-up is a one-line edit rather than a value re-entered every session.
