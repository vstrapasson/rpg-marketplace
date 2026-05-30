import { requiredFields, relationsFor, fieldDef } from './schema.mjs';
import { extractWikilinks } from './frontmatter.mjs';

function issue(note, family, severity, code, message, field) {
  return { file: note.rel, family, severity, code, message, field: field ?? null };
}

export function checkSchema(note) {
  const issues = [];
  const fm = note.frontmatter;
  if (!fm.type) {
    issues.push(issue(note, 'schema', 'error', 'missing-type', 'Frontmatter missing `type` field'));
  } else if (fm.type !== note.type) {
    issues.push(issue(note, 'schema', 'error', 'type-folder-mismatch',
      `type '${fm.type}' does not match folder (expected '${note.type}')`, 'type'));
  }
  for (const f of requiredFields(note.type)) {
    const v = fm[f];
    if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
      issues.push(issue(note, 'schema', 'error', 'missing-required', `Missing required field: \`${f}\``, f));
    }
  }
  for (const [key, val] of Object.entries(fm)) {
    if (val === undefined || val === null) continue;
    const fd = fieldDef(note.type, key);
    if (!fd) continue;
    if (fd.type === 'enum' && Array.isArray(fd.values) && !fd.values.includes(val)) {
      issues.push(issue(note, 'schema', 'error', 'bad-enum',
        `Invalid value for \`${key}\`: '${val}' (allowed: ${fd.values.join(', ')})`, key));
    } else if (fd.type === 'number' && typeof val !== 'number') {
      issues.push(issue(note, 'schema', 'error', 'bad-field-type', `\`${key}\` must be a number`, key));
    } else if (fd.type === 'date' && !(typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val))) {
      issues.push(issue(note, 'schema', 'error', 'bad-field-type', `\`${key}\` must be a date (YYYY-MM-DD)`, key));
    }
  }
  return issues;
}

export function checkLinks(note, index) {
  const issues = [];
  for (const field of Object.keys(relationsFor(note.type))) {
    for (const target of extractWikilinks(note.frontmatter[field])) {
      if (!index.has(target)) {
        issues.push(issue(note, 'links', 'error', 'broken-link',
          `Broken link in \`${field}\`: [[${target}]] does not exist`, field));
      }
    }
  }
  return issues;
}

export function checkOrphans(notes, index) {
  const inbound = new Set();
  for (const note of notes) {
    if (note.kind !== 'entity') continue;
    for (const field of Object.keys(relationsFor(note.type))) {
      for (const t of extractWikilinks(note.frontmatter[field])) inbound.add(t);
    }
  }
  const issues = [];
  for (const note of notes) {
    if (note.kind !== 'entity') continue;
    if (!inbound.has(note.name)) {
      issues.push(issue(note, 'links', 'warning', 'orphan', 'Orphan entity (no other note references it)'));
    }
  }
  return issues;
}

export function checkCoherence(note, index) {
  const issues = [];
  for (const [field, rel] of Object.entries(relationsFor(note.type))) {
    if (rel.linkOnly || rel.target === '*') continue;
    const allowed = Array.isArray(rel.target) ? rel.target : [rel.target];
    for (const target of extractWikilinks(note.frontmatter[field])) {
      const found = index.get(target);
      if (!found) continue; // broken link already reported by checkLinks
      if (found.kind !== 'entity' || !allowed.includes(found.type)) {
        issues.push(issue(note, 'coherence', 'error', 'wrong-target-type',
          `\`${field}\` points to [[${target}]] (type '${found.type ?? '—'}'), expected: ${allowed.join('/')}`, field));
      }
    }
  }
  return issues;
}
