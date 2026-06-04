# Output Template

Two artifacts: the **`jogador` entity** (GM-facing, the canonical character note) and the optional **player handout** (player-facing, secret stripped). Both use the same section order; the handout drops the GM-only sections.

**Match the table's language.** The skeleton below uses the **Portuguese headings established in the vault** (the convention the existing `jogadores/` notes already follow); keep them when the campaign is in Portuguese, and translate the headings — never the structure — for a campaign in another language. PF2e proper names stay in English as canon anchors.

The `jogador` note is written by **rpg-preserve** to `jogadores/<Character Name>.md` — `<Character Name>` is the note name; the real person goes in the `player` frontmatter field. The handout is written directly to `materiais-do-jogador/<slug>.md`.

---

## Frontmatter (assembled for the rpg-preserve candidate)

```yaml
---
type: jogador
status: stub        # stub → draft → active as the character firms up
player: <Real Person's Name>     # REQUIRED — the human, not the character
location: "[[Exact Local Name]]"  # the character's home/base site (→ local)
region: "[[Exact Region Name]]"   # the character's home region (→ regiao)
faction: "[[Exact Faction Name]]" # optional — a faction they belong to (→ faccao)
updated: <stamped by rpg-preserve>
---
```

Only `type` and `player` are required. `location`/`region`/`faction` are wikilinks to existing vault nodes — if a target doesn't exist, emit a stub candidate for it or a loremaster handoff (don't write a broken link; rpg-preserve will refuse it). See `vault-entity-contract.md`.

## Skeleton — the `jogador` note body (GM-facing)

```markdown
> [One-line concept — the character in a phrase, + their core contradiction.]

**Player:** [real name] · **Ancestral/Classe:** [ancestry / class] · **Antecedente:** [background]
**Tom:** [N]/5 — [label, inherited from the campaign] · **Função na mesa:** [scout / face / striker / …]
**Build:** [Pathbuilder ID or "feita à mão" — a pointer, captured not optimized]

## Num Relance
- **Quem é:** [one or two lines — who this person is]
- **O que faz:** [their function / role in the party and world]
- **Como age:** [the surface attitude an improvising player/GM can grab]
- **Querer, em uma linha:** [the conscious want]

## A Ficha (PF2e)
[The build the player made — captured, not designed here. Ancestry/heritage, class/subclass,
key feats and signature abilities, the table role. Validate against the Archives of Nethys
category pages if asked; do not invent or re-spec. Light for a narrative-first table, detailed
for a crunch-first one — follow the player.]

## A História   <!-- or ## De Onde Veio -->
[The formative beats — specifics, not a biography. 2–3 events, each tied to a present behavior
(the wound is *active*). This is the shared layer: built with the player.]

## A Ferida (o motor)
[The wound, called out as the engine. What happened, and how it still drives the character now —
the belief it created, the behavior it produces at the table.]

## Como Ele Joga na Mesa
[How they act under pressure and with the rest of the party — the table voice, the tells,
the contradiction in play. 3–5 short traits.]

## Como Entra na Sessão 1
[How this character walks into the opening — the clean on-ramp for session one. An offering,
not a script; the player drives. Mark a read-aloud beat if useful.]

## Ganchos Pessoais
[2–4 (Compact) or 4–5 (Full) ways the campaign pulls this character in — each grown from the
core, anchored to a real vault node by exact name. At tone 3+, mark ≥1–2 **moral-cost** hooks.]
1. **[Hook title]** — [body, naming the [[vault node]] it ties into]
2. ...

## ⚠️ Verdade do GM (não revelar ao jogador)
[GM-ONLY. Never read aloud, never in the handout. Three parts (see pc-frameworks.md §3):]
- **A semente:** [what's planted on/around them that they don't understand yet]
- **O elo oculto:** [how their wound ties, unknown to them, to the campaign's central truth/antagonist]
- **A convergência:** [how their thread crosses another PC's — paired seed, shared enemy, common wound]
- **Ritmo de revelação:** [what to withhold, what surfaces when — keep it discoverable through play]

## Notas de Continuidade
[Follow-ups, open threads, build validation, sources. What to firm up as the character moves
stub → draft → active.]
```

## Skeleton — the player handout (player-facing, optional)

Offered, not generated unasked. The **same body with the GM-only sections removed**: drop `## ⚠️ Verdade do GM` entirely, and trim `## Ganchos Pessoais` to the hooks the player is meant to know. Written to `materiais-do-jogador/<slug>.md`. This is the narrative-handout pattern — the file the player can read without spoiling their own slow burn.

```markdown
# [Character Name]

> [One-line concept — player-safe.]

[Num Relance · A Ficha · A História · A Ferida · Como Joga na Mesa · the player-known hooks.]
[No Verdade do GM. No secret seeds. No convergence notes.]
```

## Section-by-section guidance

- **Num Relance** — the grab-bag for the first session. *Como age* and *Querer em uma linha* are the two most useful lines; give the player/GM something to play instantly.
- **A Ficha** — capture, don't optimize. The player built this; record it. The skill's job is the person and the anchor, not the feat list.
- **A História / A Ferida** — the heart of the shared layer. Every beat connects to a present behavior (cause → effect). Avoid the "sad backstory = depth" trap: a tragedy that changes nothing today is set dressing.
- **Ganchos Pessoais** — every hook is a *way in*, grown from the core and anchored to a real vault node by exact name. Moral-cost hooks bite hardest at tone 3.
- **Verdade do GM** — the layer that makes the party converge. Always author ≥1 convergence with another PC. Keep it discoverable, never leaked.

## Length targets

Guidance, not limits. *A História*, *A Ferida*, and *Ganchos Pessoais* carry the weight.

| Section | Compact | Full |
|---|---|---|
| Concept + stat line | 30–60 words | 40–80 words |
| Num Relance | 40–70 words | 60–110 words |
| A Ficha | a pointer + role | 80–160 words |
| **A História + A Ferida** | **90–150 words** | **220–360 words** |
| Como Joga na Mesa | 40–80 words | 110–200 words |
| Como Entra na Sessão 1 | 40–70 words | 70–130 words |
| **Ganchos Pessoais** | **80–160 words** | **260–460 words** |
| **⚠️ Verdade do GM** | **80–150 words** | **200–360 words** |
| Notas de Continuidade | 30–70 words | 60–120 words |
| **Total** | **~550–900 words** | **~1200–2000 words** |
