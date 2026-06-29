# Foundry journals — Paizo theme (templates + procedure)

Optional house style for campaign journals: Paizo-style boxes (the *Abomination Vaults* look) + native PF2e roll buttons. Use it when the campaign opts into the theme; if it doesn't, write plain journals and skip the box classes. The `rpg-journal-verifier` agent checks for the classes below when the theme is in use.

## How the theme is applied (no manual step)

- The visual "skin" comes from the CSS of the **`pf2e-abomination-vaults`** module, scoped to `.journal-sheet.pf2e-av`. It only appears when the journal window carries the `pf2e-av` class.
- The world module **`rpg-journal-theme`** adds that class automatically to **every journal inside the theme folder** (default `Campanha`, plus subfolders). So: **create the journal in the theme folder and you're done** — no `isAV` flag, no macro, no click.
- Requires `pf2e-abomination-vaults` active (the CSS, fonts, and icons come from it).
- The themed folder is configurable in *Configure Settings → Module Settings → RPG Journal Theme*.

Both modules are **optional dependencies**: the theme is a nicety, not a requirement for the forge to write journals. When they're absent, write the same content without the box classes.

## Write procedure (foundry MCP)

1. **Folder:** create/ensure the theme folder (and a subfolder if you want, e.g. `Campanha/Locations`).
2. **Write the HTML VERBATIM** via one of these paths — they store raw HTML (sections, classes, `<img>`, enrichers all survive):
   - `create-quest-journal` with the real content in **`additionalPages[].content`**.
   - or `update-quest-journal` with `newContent` (on an existing page, via `pageId`).
3. **NEVER trust the AI-generated main page** of `create-quest-journal`: it gets rewritten, dropped into the `.mcp-journal` theme, and **translated into generic English**. Use it only as a throwaway shell; the real content goes in `additionalPages`.
4. **Verify by re-reading** with `list-journals journalId+pageId` (or spawn `rpg-journal-verifier`): confirm the `box-text` classes, the `<img>`s, and the enrichers are still literal in the HTML.

## HTML skeletons (copy and fill)

> Icon paths are relative to the Foundry public root and resolve to the AV module.
> Available icons: `encounter/{skull,skull-glow,haunt,mold,trap,ward}.webp`,
> `exploration/{lens,compass,map,spyglass}.webp`,
> `treasure/{coin-pouch,coin-stack,chest,books}.webp`, and `icon-{lore,monster,rules,treasure}.webp`.

### Read-aloud / boxed text
```html
<p class="cdt-block box-text narrative-block">Text read aloud to the players.</p>
```

### GM prose (outside a box)
```html
<p>Normal GM text, between the boxes.</p>
```

### Encounter box (blue, skull icon)
```html
<section class="box-text encounter">
  <header>
    <img src="modules/pf2e-abomination-vaults/assets/journal-images/icons/encounter/skull.webp" width="100">
    <section><h2>Encounter</h2><h2>Low 1</h2></section>
    <section>
      <div><p>@UUID[Actor.<id>]{Creature Name (3)}</p></div>
      <p>60 XP</p>
    </section>
  </header>
  <article>
    <p>Tactics and triggers for the encounter. Initiative: [[/r 1d20+9 #Initiative]].</p>
  </article>
</section>
```
- The 2nd `<h2>` is the tier ("Trivial/Low/Moderate/Severe/Extreme" + level). Free text is fine.
- If the actor doesn't exist yet, use plain text in place of `@UUID[Actor...]`.

### Exploration box (green, lens icon)
```html
<section class="box-text investigation">
  <header>
    <img src="modules/pf2e-abomination-vaults/assets/journal-images/icons/exploration/lens.webp" width="100">
    <h2>Exploration</h2>
    <p>@UUID[Compendium.pf2e.actionspf2e.Item.TiNDYUGlMmxzxBYU]{Search} @UUID[Compendium.pf2e.actionspf2e.Item.EwgTZBWsc8qKaViP]{Investigate}</p>
  </header>
  <article>
    <h3>Subheading</h3>
    <p>A @Check[perception|dc:12|action:search]{Perception (DC 12)} reveals ...; a critical success ...</p>
    <h3>Another subheading</h3>
    <p>A @Check[nature|dc:15|action:recall-knowledge]{Nature (DC 15)} to @UUID[Compendium.pf2e.actionspf2e.Item.1OagaWtBpVXExToo]{Recall Knowledge} identifies ...</p>
  </article>
</section>
```

### Treasure box (blue, coins icon)
```html
<section class="box-text treasure">
  <header>
    <img src="modules/pf2e-abomination-vaults/assets/journal-images/icons/treasure/coin-pouch.webp" width="100">
    <h2>Treasure</h2>
    <p>@UUID[Item.<id>]{Magic Item}</p>
  </header>
  <article>
    <p>Where the treasure is and what it is. A peridot bead (2 gp) in one of the piles.</p>
  </article>
</section>
```

### Highlighted GM note (instruction)
```html
<section class="box-text instruction">
  <article><p>Reminder for the GM only (do not read aloud).</p></article>
</section>
```
- The full-width parchment-callout look of this form (gold left border, dark text) comes from
  the CSS of **`rpg-journal-theme` ≥ 1.1.0** (`styles/gm-callout.css`). The original AV CSS treats
  `.instruction` as a 375px sidebar blob and breaks with a direct `<article>` — don't use it
  without the updated module.
- For the **authentic AV sidebar blob** (narrow ornamented box, white text), nest the content in
  `<div class="box-border"><div class="box-content">…</div></div>` instead of the direct `<article>`.

## Enrichers (roll buttons) — work in any PF2e journal

| For | Syntax |
|---|---|
| Skill/Perception check with DC | `@Check[perception\|dc:12\|action:search]{Perception (DC 12)}` |
| Basic save | `@Check[fortitude\|dc:20\|basic]` |
| Skill with Recall Knowledge | `@Check[nature\|dc:15\|action:recall-knowledge]{Nature (DC 15)}` |
| Secret check | add `\|traits:secret` to the `@Check` |
| Damage | `@Damage[1d6[fire]]{1d6 fire}` · mixed: `@Damage[2d6[slashing],1d6[persistent,bleed]]` |
| Generic roll | `[[/r 1d20+9 #Initiative]]` · GM roll: `[[/gmr 1d4 #Recharge]]` |
| Area template | `@Template[type:burst\|distance:20]` (also `emanation`/`cone`/`line`) |
| Action | `[[/act grapple]]` |
| Link to a document | `@UUID[Compendium.pf2e.actionspf2e.Item.<id>]{Label}` or `@UUID[Actor.<id>]{Name}` |

(In these tables the `\|` is the literal pipe `|` escaped for Markdown — in the journal write `|`.)

### Useful stable UUIDs (pf2e system)
- Search: `Compendium.pf2e.actionspf2e.Item.TiNDYUGlMmxzxBYU`
- Investigate: `Compendium.pf2e.actionspf2e.Item.EwgTZBWsc8qKaViP`
- Recall Knowledge: `Compendium.pf2e.actionspf2e.Item.1OagaWtBpVXExToo`

For other IDs, use `search-compendium` (actions in `pf2e.actionspf2e`; conditions in
`pf2e.conditionitems`). For creatures/items already in the world, use `Actor.<id>` / `Item.<id>`.
Do **not** hardcode world-specific Actor/Item UUIDs in this reference — resolve them per build.

## Reminders
- Content in the **campaign's language** (whatever the user is writing in).
- Player titles and handouts **spoiler-free** (general campaign rule).
- The theme depends on `pf2e-abomination-vaults` staying active (it reuses its CSS/fonts).
- Idempotency: prefer **updating** an existing journal (`search-journals`/`list-journals` first)
  over creating a duplicate.
