#!/usr/bin/env node
import { loadVault } from './lib/vault.mjs';
import { checkSchema, checkLinks, checkCoherence, checkOrphans } from './lib/checks.mjs';
import { buildReport, formatHuman } from './lib/report.mjs';
import { checkSchemaIntegrity } from './lib/schema.mjs';

function parseArgs(argv) {
  const args = { vault: process.cwd(), file: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--vault') args.vault = argv[++i];
    else if (a === '--file') args.file = argv[++i];
    else if (a === '--json') args.json = true;
  }
  return args;
}

export async function run(argv) {
  const args = parseArgs(argv);
  const schemaIssues = checkSchemaIntegrity();
  if (schemaIssues.length) {
    console.error('Registro de schema inválido:\n' + schemaIssues.map((s) => '  - ' + s).join('\n'));
    return 2;
  }
  const { notes, index } = await loadVault(args.vault);
  const targets = args.file
    ? notes.filter((n) => n.file === args.file || n.rel === args.file)
    : notes;
  const issues = [];
  for (const note of targets) {
    if (note.kind !== 'entity') continue;
    issues.push(...checkSchema(note), ...checkLinks(note, index), ...checkCoherence(note, index));
  }
  if (!args.file) issues.push(...checkOrphans(notes, index));
  const report = buildReport(issues);
  console.log(args.json ? JSON.stringify(report, null, 2) : formatHuman(report));
  return report.summary.errors > 0 ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run(process.argv.slice(2)).then((code) => process.exit(code));
}
