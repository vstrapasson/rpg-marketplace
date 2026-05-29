import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  inferType, normalizeWikilinkValue, stampUpdated, normalizeFrontmatter,
} from '../lib/autofix.mjs';

test('inferType retorna tipo da pasta quando frontmatter.type está ausente', () => {
  const note = { type: 'npc', frontmatter: { role: 'ally' } };
  assert.equal(inferType(note), 'npc');
});

test('inferType retorna null quando type já está correto', () => {
  const note = { type: 'npc', frontmatter: { type: 'npc', role: 'ally' } };
  assert.equal(inferType(note), null);
});

test('normalizeWikilinkValue não toca no que já está correto', () => {
  assert.equal(normalizeWikilinkValue('[[Norte Gelado]]'), '[[Norte Gelado]]');
});

test('normalizeWikilinkValue envolve nome avulso em [[...]]', () => {
  assert.equal(normalizeWikilinkValue('Norte Gelado'), '[[Norte Gelado]]');
});

test('normalizeWikilinkValue passa não-strings sem alterar', () => {
  assert.equal(normalizeWikilinkValue(42), 42);
  assert.equal(normalizeWikilinkValue(undefined), undefined);
});

test('stampUpdated adiciona data de hoje e não remove outros campos', () => {
  const today = new Date().toISOString().slice(0, 10);
  const result = stampUpdated({ type: 'npc', role: 'ally' });
  assert.equal(result.updated, today);
  assert.equal(result.type, 'npc');
  assert.equal(result.role, 'ally');
});

test('normalizeFrontmatter coloca type e status antes dos campos específicos', () => {
  const fm = { role: 'ally', type: 'npc', status: 'active', updated: '2026-01-01' };
  const result = normalizeFrontmatter(fm, 'npc');
  const keys = Object.keys(result);
  assert.equal(keys[0], 'type');
  assert.equal(keys[1], 'status');
  assert.ok(keys.includes('role'));
});
