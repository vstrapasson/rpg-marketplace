import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReport, formatHuman } from '../lib/report.mjs';

const issues = [
  { file: 'npcs/A.md', family: 'schema', severity: 'error', code: 'missing-required', message: 'falta x', field: 'x' },
  { file: 'npcs/B.md', family: 'links', severity: 'warning', code: 'orphan', message: 'órfã', field: null },
];

test('buildReport agrupa e conta', () => {
  const r = buildReport(issues);
  assert.equal(r.summary.total, 2);
  assert.equal(r.summary.errors, 1);
  assert.equal(r.summary.warnings, 1);
  assert.equal(r.byFamily.schema.length, 1);
  assert.equal(r.byFamily.links.length, 1);
});

test('formatHuman inclui contagem e cada problema', () => {
  const text = formatHuman(buildReport(issues));
  assert.match(text, /1 erro\(s\)/);
  assert.match(text, /npcs\/A\.md/);
  assert.match(text, /\[ERRO/);
});
