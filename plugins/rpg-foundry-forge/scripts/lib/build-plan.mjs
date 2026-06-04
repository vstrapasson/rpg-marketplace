// Turn a resolved entity graph + the build manifest into an ORDERED, IDEMPOTENT
// list of build steps. Deterministic: it decides WHAT to build and in WHAT order
// (and what to skip because it's already in the manifest), tagging steps that
// must run sequentially on the same scene (serializeGroup) and marking the args
// that need LLM judgment (compendium match, map prompt, lighting mood, content).
// It does NOT call MCP or fill judgment args.

import { extractWikilinks } from './vault-read.mjs';
import { dispositionFor, questFieldsFromVault, dashboardTemplateForActs, journalFolder } from './foundry-args.mjs';
import { getBuilt } from './manifest.mjs';

const CONCERN_RANK = { scene: 0, actor: 1, item: 2, journal: 3, dashboard: 3, ownership: 5 };

// inimigo -> the location (local) name of the encontro that lists it as a creature.
function sceneForCreature(graph, inimigoName) {
  for (const enc of graph.byType?.encontro || []) {
    if (extractWikilinks(enc.frontmatter?.creatures).includes(inimigoName)) {
      return extractWikilinks(enc.frontmatter?.location)[0] || null;
    }
  }
  return null;
}

export function planBuild(graph, manifest) {
  const steps = [];
  const skipped = [];
  const blocked = [];
  const push = (s) => {
    const built = isBuilt(manifest, s);
    if (built) { skipped.push({ ...s, op: 'skip', reason: 'already in manifest' }); }
    else steps.push(s);
  };

  // 1. TACTICAL scenes (locais that are an encontro location) → battlemap + lighting.
  const tacticalLocals = graph.tacticalLocals || graph.concerns?.scenes || [];
  for (const local of tacticalLocals) {
    push({
      id: `scene:${local.name}`,
      concern: 'scene',
      op: 'create',
      entity: { type: 'local', name: local.name },
      tool: 'list-scenes|generate-map+set-scene-lighting',
      args: { sceneName: local.name, body: local.body, mood: null, prompt: null },
      judgment: ['prefer-existing match', 'map prompt', 'lighting mood'],
      dependsOn: [],
      serializeGroup: `scene:${local.name}`,
    });
  }

  // 1b. NARRATIVE locations (no encounter) → a journal HANDOUT (image shown to
  //     players), NOT a generated battlemap. A gridless backdrop scene, if any,
  //     is linked by the skill (prefer-existing); the plugin never auto-generates it.
  for (const local of graph.narrativeLocals || []) {
    push({
      id: `journal:local:${local.name}`,
      concern: 'journal',
      op: 'create',
      entity: { type: 'local', name: local.name },
      tool: 'create-quest-journal (handout) [+ link-existing gridless scene]',
      args: { title: local.name, body: local.body, image: null, folderName: journalFolder(local) },
      judgment: ['read-aloud from body', 'attach user-provided image', 'GM: Show to Players'],
      dependsOn: [],
      serializeGroup: null,
    });
  }

  // 2. Actors (inimigo + npc with statblock), placed on their scene if any.
  for (const actorNote of graph.concerns?.actors || []) {
    const sceneName = actorNote.type === 'inimigo'
      ? sceneForCreature(graph, actorNote.name)
      : (extractWikilinks(actorNote.frontmatter?.location)[0] || null);
    const disp = dispositionFor(actorNote);
    push({
      id: `actor:${actorNote.name}`,
      concern: 'actor',
      op: 'create',
      entity: { type: actorNote.type, name: actorNote.name },
      tool: 'search-compendium+create-actor-from-compendium+update-token',
      args: { names: [actorNote.name], scene: sceneName, disposition: disp, packId: null, itemId: null, art: false },
      judgment: ['packId/itemId (name→criteria→ask)', 'optional token art'],
      dependsOn: sceneName ? [`scene:${sceneName}`] : [],
      serializeGroup: sceneName ? `scene:${sceneName}` : null,
    });
  }

  // 3. Items / treasure (world items)
  for (const item of graph.concerns?.items || []) {
    push({
      id: `item:${item.name}`,
      concern: 'item',
      op: 'create',
      entity: { type: 'item', name: item.name },
      tool: 'manage-world-items',
      args: { action: 'create', items: [{ name: item.name, type: null }] },
      judgment: ['item system type'],
      dependsOn: [],
      serializeGroup: null,
    });
  }

  // 4a. Quest journals
  for (const quest of (graph.byType?.quest || [])) {
    const q = questFieldsFromVault(quest, null);
    push({
      id: `journal:quest:${quest.name}`,
      concern: 'journal',
      op: 'create',
      entity: { type: 'quest', name: quest.name },
      tool: 'create-quest-journal+link-quest-to-npc',
      args: { ...q },
      judgment: ['description enrichment', 'questType/difficulty', 'links'],
      dependsOn: [],
      serializeGroup: null,
    });
  }
  // 4b. Generic lore-ish journals (faccao, lore, frente) via create-quest-journal
  //     (no plain-journal MCP tool exists — see journal-mapping.md).
  for (const type of ['faccao', 'lore', 'frente']) {
    for (const note of (graph.byType?.[type] || [])) {
      push({
        id: `journal:${type}:${note.name}`,
        concern: 'journal',
        op: 'create',
        entity: { type, name: note.name },
        tool: 'create-quest-journal (generic)',
        args: { title: note.name, body: note.body, folderName: journalFolder(note) },
        judgment: ['content from body + relations'],
        dependsOn: [],
        serializeGroup: null,
      });
    }
  }
  // 4b-bis. Challenge (desafio) journals — challenge structure + DC table +
  //         degrees/fail-forward + read-aloud, plus a VP progress-clock page
  //         (segments = vp_target). Realized via create-quest-journal (generic).
  for (const note of (graph.byType?.desafio || [])) {
    const vpTarget = Number(note.frontmatter?.vp_target) || null;
    const singleCheck = note.frontmatter?.scale === 'single-check';
    push({
      id: `journal:desafio:${note.name}`,
      concern: 'journal',
      op: 'create',
      entity: { type: 'desafio', name: note.name },
      tool: 'create-quest-journal (challenge: structure + DCs + VP clock page) [+ request-player-rolls live]',
      args: { title: note.name, body: note.body, folderName: journalFolder(note), vpTarget, singleCheck },
      judgment: ['DC table + degrees of success', 'VP target→clock segments', 'read-aloud', 'skill→rollType map'],
      dependsOn: [],
      serializeGroup: null,
    });
  }
  // 4c. Campaign dashboard from acts (one)
  const atos = graph.byType?.ato || [];
  if (atos.length) {
    push({
      id: 'dashboard',
      concern: 'dashboard',
      op: 'create',
      entity: { type: 'ato', name: '(campaign dashboard)' },
      tool: 'create-campaign-dashboard',
      args: dashboardTemplateForActs(atos),
      judgment: ['campaign title/description'],
      dependsOn: [],
      serializeGroup: null,
    });
  }

  // 5. Ownership (last; approval-gated)
  for (const player of graph.concerns?.ownership || []) {
    push({
      id: `ownership:${player.name}`,
      concern: 'ownership',
      op: 'create',
      entity: { type: 'jogador', name: player.name },
      tool: 'assign-actor-ownership',
      args: { playerIdentifier: player.frontmatter?.player || player.name, actorIdentifier: null, permissionLevel: 'OWNER', confirmBulkOperation: false },
      judgment: ['resolve player→Foundry user', 'which actor is their PC'],
      dependsOn: [],
      serializeGroup: null,
      confirm: true,
    });
  }

  // Block steps whose declared scene dependency is itself missing from the graph.
  const sceneNames = new Set((graph.concerns?.scenes || []).map((l) => l.name));
  for (let k = steps.length - 1; k >= 0; k--) {
    const s = steps[k];
    const needsScene = (s.dependsOn || []).filter((d) => d.startsWith('scene:')).map((d) => d.slice('scene:'.length));
    const missingScene = needsScene.find((n) => !sceneNames.has(n));
    if (missingScene) {
      blocked.push({ ...s, reason: `scene "${missingScene}" not in graph` });
      steps.splice(k, 1);
    }
  }

  return { steps: orderSteps(steps), skipped, blocked, missing: graph.missing || [] };
}

function isBuilt(manifest, step) {
  const { type, name } = step.entity;
  const row = getBuilt(manifest, type, name);
  if (!row) return false;
  if (step.concern === 'scene') return !!row.sceneId;
  if (step.concern === 'actor') return !!row.actorId;
  if (step.concern === 'journal') return !!row.journalId;
  if (step.concern === 'dashboard') return !!row.dashboardId;
  if (step.concern === 'item') return !!row.itemId;
  if (step.concern === 'ownership') return !!row.userId;
  return false;
}

export function orderSteps(steps) {
  return [...steps].sort((a, b) => {
    const ra = CONCERN_RANK[a.concern] ?? 9;
    const rb = CONCERN_RANK[b.concern] ?? 9;
    if (ra !== rb) return ra - rb;
    const ga = a.serializeGroup || '';
    const gb = b.serializeGroup || '';
    if (ga !== gb) return ga < gb ? -1 : 1;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
}

// For /forge-status: classify every graph entity as built / to-build.
export function diffManifest(graph, manifest) {
  const alreadyBuilt = [];
  const toBuild = [];
  const buckets = { scene: graph.tacticalLocals || graph.concerns?.scenes, actor: graph.concerns?.actors, item: graph.concerns?.items, ownership: graph.concerns?.ownership };
  for (const [concern, notes] of Object.entries(buckets)) {
    for (const n of notes || []) {
      const target = isBuilt(manifest, { concern, entity: { type: n.type, name: n.name } });
      (target ? alreadyBuilt : toBuild).push({ concern, type: n.type, name: n.name });
    }
  }
  const journaled = [...(graph.byType?.quest || []), ...(graph.byType?.desafio || []), ...(graph.narrativeLocals || [])];
  for (const n of journaled) {
    const target = isBuilt(manifest, { concern: 'journal', entity: { type: n.type, name: n.name } });
    (target ? alreadyBuilt : toBuild).push({ concern: 'journal', type: n.type, name: n.name });
  }
  return { alreadyBuilt, toBuild, missing: graph.missing || [] };
}
