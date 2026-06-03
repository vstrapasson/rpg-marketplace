// Build manifest: the on-disk state file mapping vault-entity -> Foundry-doc-id,
// for idempotent, resumable builds. One per Foundry world (Foundry ids are
// world-scoped). The machine-read part is a fenced ```json block (JSON.parse is
// zero-dep and handles the nested shape the flat-YAML reader cannot); the rest is
// human-readable status regenerated on every write. The CONDUCTOR is the only
// writer.

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export function slugify(s) {
  return String(s || 'world').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'world';
}

export function manifestPath(vaultDir, world) {
  return join(vaultDir, `build-manifest-${slugify(world)}.md`);
}

function freshManifest(world, vaultDir) {
  return { world, vault: vaultDir, updated: null, entities: {}, mapJobs: [], openDecisions: [] };
}

const JSON_BLOCK_RE = /```json\s*\r?\n([\s\S]*?)\r?\n```/;

export async function loadManifest(vaultDir, world) {
  const path = manifestPath(vaultDir, world);
  let text;
  try {
    text = await readFile(path, 'utf8');
  } catch {
    return freshManifest(world, vaultDir);
  }
  const m = text.match(JSON_BLOCK_RE);
  if (!m) return freshManifest(world, vaultDir);
  try {
    const data = JSON.parse(m[1]);
    return { ...freshManifest(world, vaultDir), ...data };
  } catch {
    return freshManifest(world, vaultDir);
  }
}

export function getBuilt(manifest, type, name) {
  return manifest.entities?.[type]?.[name] ?? null;
}

// Pure update (mutates + returns manifest). Merges into any existing row.
export function recordBuilt(manifest, type, name, refs) {
  manifest.entities ||= {};
  manifest.entities[type] ||= {};
  manifest.entities[type][name] = { ...(manifest.entities[type][name] || {}), ...refs };
  return manifest;
}

export function recordMapJob(manifest, local, jobId, status) {
  manifest.mapJobs ||= [];
  const existing = manifest.mapJobs.find((j) => j.local === local);
  if (existing) { existing.jobId = jobId; existing.status = status; }
  else manifest.mapJobs.push({ local, jobId, status });
  return manifest;
}

export function pendingMapJobs(manifest) {
  return (manifest.mapJobs || []).filter((j) => j.status !== 'complete' && j.status !== 'cancelled');
}

function statusTables(manifest) {
  const lines = [];
  lines.push('## Build status (derived — do not hand-edit; regenerated on write)\n');
  lines.push('| Concern (type) | Built |');
  lines.push('|---|---|');
  const counts = {};
  for (const [type, rows] of Object.entries(manifest.entities || {})) counts[type] = Object.keys(rows).length;
  for (const [type, n] of Object.entries(counts)) lines.push(`| ${type} | ${n} |`);
  if (!Object.keys(counts).length) lines.push('| (nothing built yet) | 0 |');
  const pend = pendingMapJobs(manifest);
  lines.push('\n## Async map jobs in flight');
  lines.push(pend.length ? pend.map((j) => `- ${j.local}: ${j.jobId} (${j.status})`).join('\n') : '- (none)');
  if ((manifest.openDecisions || []).length) {
    lines.push('\n## Open decisions / unmatched');
    lines.push(manifest.openDecisions.map((d) => `- [ ] ${d}`).join('\n'));
  }
  return lines.join('\n');
}

export async function writeManifest(vaultDir, world, manifest, today) {
  manifest.world = world;
  manifest.vault = vaultDir;
  manifest.updated = today || new Date().toISOString().slice(0, 10);
  const path = manifestPath(vaultDir, world);
  const body = [
    `# Build Manifest — ${world}`,
    `*rpg-foundry-forge · World: ${world} · Vault: ${vaultDir} · Last build: ${manifest.updated}*`,
    '',
    '> Vault-entity → Foundry-document-id map for idempotent, resumable builds.',
    '> The conductor writes this after every compiler run. A live id means the',
    '> entity is already built — update or skip, never duplicate.',
    '',
    '## Mapping (machine-read)',
    '```json',
    JSON.stringify(
      { world: manifest.world, vault: manifest.vault, updated: manifest.updated, entities: manifest.entities || {}, mapJobs: manifest.mapJobs || [], openDecisions: manifest.openDecisions || [] },
      null,
      2,
    ),
    '```',
    '',
    statusTables(manifest),
    '',
  ].join('\n');
  await writeFile(path, body, 'utf8');
  return path;
}
