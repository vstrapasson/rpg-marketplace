import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { run } from '../validate.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('run com --json retorna exit code 1 (há erros) e relatório válido', async () => {
  const logs = [];
  const origLog = console.log;
  console.log = (s) => logs.push(s);
  let code;
  try {
    code = await run(['--vault', VAULT, '--json']);
  } finally {
    console.log = origLog;
  }
  assert.equal(code, 1); // fixtures contêm erros propositais
  const report = JSON.parse(logs.join('\n'));
  const codes = report.issues.map((i) => i.code);
  assert.ok(codes.includes('missing-required'));
  assert.ok(codes.includes('broken-link'));
  assert.ok(codes.includes('wrong-target-type'));
  assert.ok(codes.includes('bad-enum'));
});

test('run com --file valida só uma nota', async () => {
  const logs = [];
  const origLog = console.log;
  console.log = (s) => logs.push(s);
  let code;
  try {
    code = await run(['--vault', VAULT, '--file', join(VAULT, 'npcs', 'Malareph.md'), '--json']);
  } finally {
    console.log = origLog;
  }
  assert.equal(code, 0); // Malareph é válida
  const report = JSON.parse(logs.join('\n'));
  assert.equal(report.summary.errors, 0);
});
