// Minimal, standalone reader for the RPG Obsidian vault.
//
// Duplicated-by-design from rpg-vault-guardian's lib/{yaml,frontmatter,vault}.mjs
// (ports-and-adapters: this plugin talks to the guardian's output through the
// vault FILES, never by importing its code). Two intentional differences from
// the guardian's loadVault: (1) we KEEP the note `body` (scene/journal text comes
// from it), and (2) the folder->type map is a local literal, not imported from
// schema.mjs. Flat single-level YAML only — same limitation as the guardian.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, basename, sep } from 'node:path';

// The 15 gameable entity folders (Portuguese, the vault schema) + transcripts.
export const FOLDER_TYPES = {
  regioes: 'regiao',
  locais: 'local',
  npcs: 'npc',
  jogadores: 'jogador',
  inimigos: 'inimigo',
  faccoes: 'faccao',
  quests: 'quest',
  sessoes: 'sessao',
  eventos: 'evento',
  atos: 'ato',
  itens: 'item',
  lore: 'lore',
  frentes: 'frente',
  relogios: 'relogio',
  encontros: 'encontro',
};

const IGNORED_TOP = ['_indices', '.obsidian', '.claude', '.git'];
const TRANSCRIPTS = join('sessoes', 'transcricoes');

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;
const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;

function stripComment(line) {
  let inSingle = false;
  let inDouble = false;
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === '#' && !inSingle && !inDouble && (j === 0 || /\s/.test(line[j - 1]))) {
      return line.slice(0, j);
    }
  }
  return line;
}

function parseScalar(s) {
  if (s === '') return '';
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null' || s === '~') return null;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  return s;
}

export function parseFlatYaml(text) {
  const out = {};
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = stripComment(lines[i]);
    i++;
    if (line.trim() === '') continue;
    if (/^\s/.test(line) || line.startsWith('-')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const rest = line.slice(idx + 1).trim();
    if (rest === '') {
      const items = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(parseScalar(stripComment(lines[i]).trim().replace(/^-\s+/, '')));
        i++;
      }
      out[key] = items;
    } else if (rest.startsWith('[') && rest.endsWith(']')) {
      out[key] = rest.slice(1, -1).split(',').map((s) => parseScalar(s.trim())).filter((s) => s !== '');
    } else {
      out[key] = parseScalar(rest);
    }
  }
  return out;
}

export function extractFrontmatter(content) {
  const m = content.match(FM_RE);
  if (!m) return { frontmatter: {}, body: content, hasFrontmatter: false };
  return { frontmatter: parseFlatYaml(m[1]), body: content.slice(m[0].length), hasFrontmatter: true };
}

export function normalizeLinkTarget(raw) {
  let t = raw.split('|')[0].split('#')[0].trim();
  const slash = t.lastIndexOf('/');
  if (slash !== -1) t = t.slice(slash + 1);
  return t;
}

export function extractWikilinks(value) {
  const links = [];
  const scan = (s) => {
    if (typeof s !== 'string') return;
    WIKILINK_RE.lastIndex = 0;
    let m;
    while ((m = WIKILINK_RE.exec(s)) !== null) links.push(normalizeLinkTarget(m[1]));
  };
  if (Array.isArray(value)) value.forEach(scan);
  else scan(value);
  return links;
}

export function classify(vaultDir, file) {
  const rel = relative(vaultDir, file);
  if (rel.startsWith(TRANSCRIPTS + sep)) {
    return { kind: 'non-entity', type: 'transcricao', folder: TRANSCRIPTS };
  }
  const top = rel.split(sep)[0];
  const type = FOLDER_TYPES[top];
  if (type) return { kind: 'entity', type, folder: top };
  return { kind: 'ignore', type: null, folder: top };
}

export async function listMarkdownFiles(vaultDir) {
  const files = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = join(dir, e.name);
      const rel = relative(vaultDir, full);
      const top = rel.split(sep)[0];
      if (IGNORED_TOP.includes(top)) continue;
      if (e.isDirectory()) await walk(full);
      else if (e.name.endsWith('.md')) files.push(full);
    }
  }
  await walk(vaultDir);
  return files;
}

// Returns { notes, index } where each note keeps frontmatter AND body.
// index maps bare note name -> note (first occurrence wins, like the guardian).
export async function loadVault(vaultDir) {
  const files = await listMarkdownFiles(vaultDir);
  const notes = [];
  const index = new Map();
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const { frontmatter, body } = extractFrontmatter(content);
    const name = basename(file, '.md');
    const note = {
      file,
      rel: relative(vaultDir, file),
      name,
      frontmatter,
      body: body.trim(),
      ...classify(vaultDir, file),
    };
    notes.push(note);
    if (!index.has(name)) index.set(name, note);
  }
  return { notes, index };
}
