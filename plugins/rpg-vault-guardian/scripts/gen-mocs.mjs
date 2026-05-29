#!/usr/bin/env node
import { loadVault } from './lib/vault.mjs';
import { generateMocs } from './lib/mocs.mjs';

function parseArgs(argv) {
  const args = { vault: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--vault') args.vault = argv[++i];
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const { notes } = await loadVault(args.vault);
await generateMocs(args.vault, notes);
console.log('MOCs regenerados em _indices/');
