// Pure builders that translate vault values into MCP tool args, encoding the
// hard-won rules so a skill can't get them wrong: token disposition by role,
// WALL_* enum-safe defaults (invalid values make createEmbeddedDocuments drop
// docs silently), placement coords in ABSOLUTE canvas space (include the scene
// padding offset sceneX/sceneY), and scene-lighting buckets. No I/O.

import { extractWikilinks } from './vault-read.mjs';

// Foundry token disposition: -1 hostile, 0 neutral, 1 friendly.
export function dispositionFor(note) {
  if (!note) return { value: 0, label: 'neutral' };
  if (note.type === 'inimigo') return { value: -1, label: 'hostile' };
  if (note.type === 'jogador') return { value: 1, label: 'friendly' };
  if (note.type === 'npc') {
    const role = note.frontmatter?.role;
    if (role === 'antagonist') return { value: -1, label: 'hostile' };
    if (role === 'ally' || role === 'patron') return { value: 1, label: 'friendly' };
    return { value: 0, label: 'neutral' }; // neutral or unknown
  }
  return { value: 0, label: 'neutral' };
}

// Scene-lighting presets. The skill picks the mood; this turns it into numbers.
// globalLight true = scene fully lit regardless of darkness (so OFF for dark scenes).
const LIGHTING = {
  bright: { darkness: 0, globalLight: true, tokenVision: true },
  dim: { darkness: 0.3, globalLight: false, tokenVision: true },
  dark: { darkness: 0.6, globalLight: false, tokenVision: true },
  pitch: { darkness: 0.9, globalLight: false, tokenVision: true },
};

export function lightingForMood(mood) {
  return { ...(LIGHTING[mood] || LIGHTING.dim) };
}

// Heuristic default mood from a loremaster tone level (1 light .. 5 grim) and a
// place kind; the skill may override. Crypts/dungeons trend dark.
export function suggestMood(toneLevel = 3, placeKind = 'interior') {
  const dark = /crypt|cripta|dungeon|masmorra|cave|caverna|tomb|tumba|catacomb/i.test(placeKind);
  const open = /outdoor|exterior|town|cidade|vila|market|mercado|field|campo/i.test(placeKind);
  if (open) return toneLevel >= 4 ? 'dim' : 'bright';
  if (dark) return toneLevel >= 4 ? 'pitch' : 'dark';
  return toneLevel >= 4 ? 'dark' : 'dim';
}

// WALL_* safe defaults — normal blocking wall. Invalid values (e.g. 1) get
// silently dropped by Foundry v12+ batch create. Doors are walls with door>=1.
export function wallEnumDefaults() {
  return { move: 20, sight: 20, sound: 20, dir: 0, door: 0, ds: 0 };
}

// Arrange `count` token coordinates in a centered grid, in ABSOLUTE canvas
// coords. sceneDims comes from get-scene-geometry: {sceneX, sceneY, sceneWidth,
// sceneHeight, size}. Falls back to a 1536/70 scene with no offset.
export function placementGrid(sceneDims = {}, count = 1) {
  const size = sceneDims.size || 70;
  const sceneW = sceneDims.sceneWidth || 1536;
  const sceneH = sceneDims.sceneHeight || 1536;
  const ox = sceneDims.sceneX || 0;
  const oy = sceneDims.sceneY || 0;
  const cx = ox + sceneW / 2;
  const cy = oy + sceneH / 2;
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const coords = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const x = Math.round(cx + (c - (cols - 1) / 2) * size);
    const y = Math.round(cy + (r - (rows - 1) / 2) * size);
    coords.push({ x, y });
  }
  return { type: 'coordinates', coordinates: coords };
}

// Journal folder for a note, per the HYBRID convention (one flat level, the
// only thing the MCP's create-quest-journal `folderName` supports): quests group
// by their act (runtime/chapter view); everything else groups by type (codex).
// Returns undefined for the dashboard (lives at the root).
export function journalFolder(note) {
  switch (note?.type) {
    case 'quest': return extractWikilinks(note.frontmatter?.act)[0] || 'Quests';
    case 'evento': return extractWikilinks(note.frontmatter?.act)[0] || 'Events';
    case 'sessao': return 'Sessions';
    case 'faccao': return 'Factions';
    case 'lore': return 'Lore';
    case 'frente': return 'Fronts';
    case 'npc': return 'NPCs';
    case 'local': return 'Locations'; // narrative-location handout
    case 'desafio': return 'Challenges'; // non-combat challenge (skill/social/chase/etc.)
    default: return undefined; // dashboard → root
  }
}

// Build the deterministic shell of a quest journal from a `quest` note + graph.
// Description/type/difficulty are enrichable by the skill (judgment).
export function questFieldsFromVault(quest, index) {
  const fm = quest.frontmatter || {};
  const giver = extractWikilinks(fm.giver)[0] || null;
  const npcs = extractWikilinks(fm.npcs);
  const locations = extractWikilinks(fm.locations);
  const factions = extractWikilinks(fm.factions);
  const items = extractWikilinks(fm.items);
  return {
    questTitle: quest.name,
    questDescription: quest.body || `Quest "${quest.name}".`,
    questType: 'side', // judgment: skill may upgrade to 'main'/'mystery'/etc.
    difficulty: 'medium', // judgment
    questGiver: giver,
    npcName: npcs[0] || giver || undefined,
    rewards: items.length ? items.join(', ') : undefined,
    folderName: journalFolder(quest),
    _refs: { giver, npcs, locations, factions, items },
  };
}

// Map a vault `item.category` (permanent/consumable/currency/art/gear, added in
// guardian 1.3.0) to a default Foundry item `type` for manage-world-items, so a
// skill pushing loot to a sheet has a deterministic floor. The skill may refine a
// `permanent` to a more specific type (weapon/armor) by judgment.
export function foundryItemType(item) {
  const category = typeof item === 'string' ? item : item?.frontmatter?.category;
  switch (category) {
    case 'consumable': return 'consumable';
    case 'currency': return 'treasure';
    case 'art': return 'treasure';
    case 'gear': return 'equipment';
    case 'permanent': return 'equipment'; // judgment: skill may pick weapon/armor
    default: return 'equipment';
  }
}

// Choose a campaign-dashboard template from the acts present.
export function dashboardTemplateForActs(atos = []) {
  if (!atos.length) return { template: 'five-part-adventure', customParts: undefined };
  const sorted = [...atos].sort((a, b) => (a.frontmatter?.number || 0) - (b.frontmatter?.number || 0));
  const customParts = sorted.map((a) => ({
    title: a.name,
    description: (a.body || '').slice(0, 280),
    type: 'chapter',
  }));
  return { template: 'custom', customParts };
}
