import { ENTITIES } from '../schema.mjs';

const COMMON_ORDER = ['type', 'status', 'created', 'updated', 'aliases', 'tags'];

export function inferType(note) {
  if (note.frontmatter.type === note.type) return null;
  return note.type;
}

export function normalizeWikilinkValue(val) {
  if (typeof val !== 'string') return val;
  const s = val.trim();
  if (s === '' || (s.startsWith('[[') && s.endsWith(']]'))) return s;
  return `[[${s}]]`;
}

export function stampUpdated(fm) {
  const today = new Date().toISOString().slice(0, 10);
  return { ...fm, updated: today };
}

export function normalizeFrontmatter(fm, type) {
  const def = ENTITIES[type] ?? {};
  const typeFields = Object.keys(def.fields ?? {});
  const typeRelations = Object.keys(def.relations ?? {});
  const order = [...COMMON_ORDER, ...typeFields, ...typeRelations];
  const sorted = {};
  for (const k of order) {
    if (k in fm) sorted[k] = fm[k];
  }
  for (const k of Object.keys(fm)) {
    if (!(k in sorted)) sorted[k] = fm[k];
  }
  return sorted;
}
