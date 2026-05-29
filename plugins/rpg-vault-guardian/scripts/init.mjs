#!/usr/bin/env node
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from './schema.mjs';

export function foldersFromSchema() {
  const folders = [];
  for (const def of Object.values(ENTITIES)) {
    folders.push(def.folder);
  }
  for (const def of Object.values(NON_ENTITY)) {
    folders.push(def.folder);
  }
  folders.push('_indices');
  return folders;
}

export async function initVault(vaultDir) {
  const folders = foldersFromSchema();
  const results = [];
  for (const folder of folders) {
    const fullPath = join(vaultDir, folder);
    let exists = false;
    try { await access(fullPath); exists = true; } catch {}
    if (!exists) {
      await mkdir(fullPath, { recursive: true });
      await writeFile(join(fullPath, '.gitkeep'), '');
      results.push({ folder, created: true });
    } else {
      results.push({ folder, created: false });
    }
  }
  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = await initVault(process.cwd());
  for (const { folder, created } of results) {
    console.log(`${created ? '✅ criado' : '⏭  existe'}: ${folder}`);
  }
}
