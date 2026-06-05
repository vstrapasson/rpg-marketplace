# Build manifest — state-file format

One per Foundry world (Foundry ids are world-scoped): `build-manifest-<world-slug>.md` in the **vault root**. The conductor is the **only writer**; it updates after every successful build step. Read it at the start of every run (idempotency + resume). Managed by `scripts/lib/manifest.mjs` — never hand-edit the JSON block casually.

The machine-read part is a fenced ```json block (JSON nests cleanly; the flat-YAML reader cannot). Shape:

```json
{
  "world": "teste-marketplace",
  "vault": "/path/to/vault",
  "updated": "2026-06-02",
  "entities": {
    "local":   { "Cripta dos Ossos": { "sceneId": "Scene.abc", "source": "generated|linked", "lit": true, "walls": "skipped" } },
    "inimigo": { "Esqueleto Guardião": { "actorId": "Actor.def", "packId": "pf2e.pathfinder-monster-core", "itemId": "...", "tokenIds": ["Token.1"], "scene": "Cripta dos Ossos", "disposition": -1, "art": null } },
    "npc":     { "Malareph": { "actorId": "Actor.ghi", "journalId": "JournalEntry.x", "disposition": -1 } },
    "quest":   { "O Porto Sussurrante": { "journalId": "JournalEntry.q1", "linkedNpcs": ["Rendara"] } },
    "faccao":  { "Tidewardens": { "journalId": "JournalEntry.f1" } },
    "ato":     { "(campaign dashboard)": { "dashboardId": "JournalEntry.dash" } },
    "item":    { "Amuleto Sussurrante": { "itemId": "Item.t1" } },
    "jogador": { "Kael": { "userId": "User.u1", "ownedActorIds": ["Actor.pc1"], "permission": "OWNER" } }
  },
  "mapJobs": [ { "local": "Cripta dos Ossos", "jobId": "job_123", "status": "complete|pending|cancelled" } ],
  "soundtrack": [ { "scene": "Cripta dos Ossos", "playlistId": "Playlist.p1", "soundIds": ["PlaylistSound.s1"], "boundToScene": true } ],
  "openDecisions": [ "inimigo \"Aberração\" — no compendium match; awaiting user choice." ]
}
```

**Idempotency keys** (what counts as "built" per concern): scene→`sceneId`, actor→`actorId`, journal→`journalId`, dashboard→`dashboardId`, item→`itemId`, ownership→`userId`, soundtrack→`playlistId` (per scene, in the `soundtrack` array). `build-plan.mjs` checks exactly these.

`writeManifest` also regenerates human-readable status tables below the JSON block (build counts, in-flight map jobs, open decisions) — those are derived; the JSON block is the source of truth.
