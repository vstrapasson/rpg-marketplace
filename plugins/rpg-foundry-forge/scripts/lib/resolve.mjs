// Resolve a compile unit (a `sessao` or `encontro`) into a bounded entity graph,
// grouped by Foundry concern. Pure traversal over the vault index built by
// vault-read.mjs. Records unresolved wikilinks in `missing[]` (a vault problem to
// surface — never invent the target).

import { extractWikilinks } from './vault-read.mjs';

// Relations duplicated from the vault schema (folder/type contract).
export const RELATIONS = {
  regiao: { parent_region: { target: 'regiao' } },
  local: { region: { target: 'regiao' }, faction_control: { target: 'faccao' } },
  npc: { location: { target: 'local' }, faction: { target: 'faccao' }, statblock: { target: 'inimigo' } },
  jogador: { faction: { target: 'faccao' }, location: { target: 'local' } },
  inimigo: {},
  faccao: { key_members: { target: 'npc', many: true }, headquarters: { target: 'local' }, rivals: { target: 'faccao', many: true } },
  quest: { act: { target: 'ato' }, giver: { target: 'npc' }, npcs: { target: 'npc', many: true }, locations: { target: 'local', many: true }, items: { target: 'item', many: true }, factions: { target: 'faccao', many: true } },
  sessao: { act: { target: 'ato' }, players_present: { target: 'jogador', many: true }, events: { target: 'evento', many: true }, quests: { target: 'quest', many: true }, transcript: { target: 'transcricao', linkOnly: true } },
  evento: { act: { target: 'ato' }, location: { target: 'local' }, participants: { target: ['npc', 'jogador'], many: true }, session: { target: 'sessao' } },
  ato: {},
  item: { owner: { target: ['npc', 'jogador'] }, location: { target: 'local' } },
  lore: { related: { target: '*', many: true } },
  frente: { faction: { target: 'faccao' }, antagonist: { target: 'npc' }, clocks: { target: 'relogio', many: true }, act: { target: 'ato' } },
  relogio: { front: { target: 'frente' }, faction: { target: 'faccao' }, quest: { target: 'quest' } },
  encontro: { creatures: { target: 'inimigo', many: true }, location: { target: 'local' }, session: { target: 'sessao' }, treasure: { target: 'item', many: true }, act: { target: 'ato' } },
  desafio: { location: { target: 'local' }, npcs: { target: 'npc', many: true }, session: { target: 'sessao' }, act: { target: 'ato' }, faction: { target: 'faccao' }, items: { target: 'item', many: true }, clock: { target: 'relogio' } },
};

// Which relation fields to FOLLOW when compiling downward (toward play).
// Deliberately omits back-edges (evento/encontro.session) and fan-out edges
// (faccao.key_members/rivals) so a unit pulls only what it needs.
const FOLLOW = {
  sessao: ['act', 'players_present', 'events', 'quests'],
  evento: ['location', 'participants', 'act'],
  quest: ['act', 'giver', 'npcs', 'locations', 'items', 'factions'],
  encontro: ['location', 'creatures', 'treasure', 'act'],
  desafio: ['location', 'npcs', 'faction', 'items', 'act'],
  npc: ['location', 'faction', 'statblock'],
  jogador: ['faction', 'location'],
  faccao: ['headquarters'],
  local: ['region'],
  frente: ['antagonist', 'clocks', 'faction'],
  item: [],
  relogio: [],
  ato: [],
  inimigo: [],
  lore: [],
  regiao: [],
};

// type -> Foundry concern buckets it belongs to.
const CONCERNS = {
  local: ['scenes'],
  inimigo: ['actors'],
  npc: ['journals'], // + actors only if it has a statblock (added below)
  jogador: ['ownership'],
  quest: ['journals'],
  faccao: ['journals'],
  lore: ['journals'],
  frente: ['journals'],
  relogio: ['journals'],
  ato: ['journals'],
  evento: ['journals'],
  item: ['items'],
  encontro: ['encounters'],
  desafio: ['journals'], // a challenge is realized as a journal (structure + DCs + VP clock page)
  regiao: [],
};

function resolveField(index, note, field) {
  const links = extractWikilinks(note.frontmatter?.[field]);
  const notes = [];
  const missing = [];
  for (const name of links) {
    const target = index.get(name);
    if (target) notes.push(target);
    else missing.push({ from: note.name, field, name });
  }
  return { notes, missing };
}

// BFS over FOLLOW edges from a root note. For `sessao`, also pulls encounters
// and desafios whose `session` points back to it (reverse edge).
function collect(index, rootName, opts = {}) {
  const root = index.get(rootName);
  if (!root) return { root: null, byName: new Map(), missing: [{ from: '(input)', field: 'unit', name: rootName }] };

  const byName = new Map([[root.name, root]]);
  const missing = [];
  const queue = [root];

  if (root.type === 'sessao') {
    for (const n of index.values()) {
      if ((n.type === 'encontro' || n.type === 'desafio') && extractWikilinks(n.frontmatter?.session).includes(root.name)) {
        if (!byName.has(n.name)) { byName.set(n.name, n); queue.push(n); }
      }
    }
  }

  while (queue.length) {
    const note = queue.shift();
    const fields = FOLLOW[note.type] || [];
    for (const field of fields) {
      const { notes, missing: miss } = resolveField(index, note, field);
      missing.push(...miss);
      for (const t of notes) {
        if (!byName.has(t.name)) { byName.set(t.name, t); queue.push(t); }
      }
    }
  }
  return { root, byName, missing };
}

function bucketize(byName) {
  const byType = {};
  const concerns = { scenes: [], actors: [], journals: [], ownership: [], encounters: [], items: [] };
  // A `local` is TACTICAL if some encontro lists it as its location (needs a
  // battlemap + grid + placed tokens); otherwise it's NARRATIVE (a story beat —
  // realized as a journal handout / a linked gridless backdrop, never a generated battlemap).
  const tacticalNames = new Set();
  for (const note of byName.values()) {
    if (note.type === 'encontro') {
      for (const loc of extractWikilinks(note.frontmatter?.location)) tacticalNames.add(loc);
    }
  }
  for (const note of byName.values()) {
    (byType[note.type] ||= []).push(note);
    const buckets = [...(CONCERNS[note.type] || [])];
    if (note.type === 'npc' && extractWikilinks(note.frontmatter?.statblock).length) buckets.push('actors');
    for (const b of buckets) concerns[b].push(note);
  }
  const tacticalLocals = concerns.scenes.filter((l) => tacticalNames.has(l.name));
  const narrativeLocals = concerns.scenes.filter((l) => !tacticalNames.has(l.name));
  return { byType, concerns, tacticalLocals, narrativeLocals };
}

export function resolveEncontro(index, name) {
  const { root, byName, missing } = collect(index, name);
  return { unit: { type: 'encontro', name }, root, ...bucketize(byName), missing };
}

export function resolveDesafio(index, name) {
  const { root, byName, missing } = collect(index, name);
  return { unit: { type: 'desafio', name }, root, ...bucketize(byName), missing };
}

export function resolveSessao(index, name) {
  const { root, byName, missing } = collect(index, name);
  return { unit: { type: 'sessao', name }, root, ...bucketize(byName), missing };
}

// Dispatch by the unit note's type (sessao | encontro | desafio). Other types are future.
export function resolveUnit(index, name) {
  const note = index.get(name);
  if (!note) return { unit: { type: null, name }, root: null, byType: {}, concerns: {}, missing: [{ from: '(input)', field: 'unit', name }] };
  if (note.type === 'sessao') return resolveSessao(index, name);
  if (note.type === 'encontro') return resolveEncontro(index, name);
  if (note.type === 'desafio') return resolveDesafio(index, name);
  return { unit: { type: note.type, name }, root: note, byType: {}, concerns: {}, missing: [], unsupported: true };
}
