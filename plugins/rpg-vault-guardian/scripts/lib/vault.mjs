import { readdir, readFile } from 'node:fs/promises';
import { join, relative, basename, sep } from 'node:path';
import { ENTITIES, IGNORED_TOP } from '../schema.mjs';
import { extractFrontmatter } from './frontmatter.mjs';

const FOLDER_TO_TYPE = Object.fromEntries(Object.entries(ENTITIES).map(([t, d]) => [d.folder, t]));
const TRANSCRIPTS = join('sessoes', 'transcricoes');

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

export function classify(vaultDir, file) {
  const rel = relative(vaultDir, file);
  if (rel.startsWith(TRANSCRIPTS + sep)) {
    return { kind: 'non-entity', type: 'transcricao', folder: TRANSCRIPTS };
  }
  const top = rel.split(sep)[0];
  const type = FOLDER_TO_TYPE[top];
  if (type) return { kind: 'entity', type, folder: top };
  return { kind: 'ignore', type: null, folder: top };
}

export async function loadVault(vaultDir) {
  const files = await listMarkdownFiles(vaultDir);
  const notes = [];
  const index = new Map();
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const { frontmatter } = extractFrontmatter(content);
    const name = basename(file, '.md');
    const note = { file, rel: relative(vaultDir, file), name, frontmatter, ...classify(vaultDir, file) };
    notes.push(note);
    if (!index.has(name)) index.set(name, note);
  }
  return { notes, index };
}
