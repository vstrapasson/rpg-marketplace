import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { folderForType } from './schema.mjs';
import { normalizeFrontmatter, stampUpdated } from './autofix.mjs';
import { checkSchema, checkLinks, checkCoherence } from './checks.mjs';
import { loadVault } from './vault.mjs';
import { buildReport } from './report.mjs';
import { extractFrontmatter } from './frontmatter.mjs';

export function buildFrontmatter(type, fields) {
  return normalizeFrontmatter(stampUpdated({ type, ...fields }), type);
}

function serializeScalar(v) {
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  if (typeof v === 'string') {
    if (v.includes('[[') || v.includes(':') || v.includes('#') || v.includes('"')) {
      return `"${v.replace(/"/g, '\\"')}"`;
    }
    return v;
  }
  return String(v);
}

export function serializeFrontmatter(fm) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (v === null || v === undefined) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${k}:`);
      } else {
        lines.push(`${k}:`);
        for (const item of v) lines.push(`  - ${serializeScalar(item)}`);
      }
    } else {
      lines.push(`${k}: ${serializeScalar(v)}`);
    }
  }
  lines.push('---');
  return lines.join('\n') + '\n';
}

export function buildNoteContent(fm, name) {
  return serializeFrontmatter(fm) + `# ${name}\n`;
}

export function targetPath(type, name, vaultDir) {
  const folder = folderForType(type);
  if (!folder) throw new Error(`Tipo desconhecido: '${type}'`);
  return join(vaultDir, folder, `${name}.md`);
}

export async function validateCandidate(name, content, type, vaultDir) {
  const { index } = await loadVault(vaultDir);
  const { frontmatter } = extractFrontmatter(content);
  const folder = folderForType(type);
  const note = {
    file: join(vaultDir, folder, `${name}.md`),
    rel: join(folder, `${name}.md`),
    name,
    frontmatter,
    kind: 'entity',
    type,
    folder,
  };
  const issues = [
    ...checkSchema(note),
    ...checkLinks(note, index),
    ...checkCoherence(note, index),
  ];
  return buildReport(issues);
}

export async function writeEntityFile(type, name, content, vaultDir) {
  const filePath = targetPath(type, name, vaultDir);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, 'utf8');
  return filePath;
}
