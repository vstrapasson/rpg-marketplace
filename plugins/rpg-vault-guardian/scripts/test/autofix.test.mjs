import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  inferType, normalizeWikilinkValue, stampUpdated, normalizeFrontmatter,
} from '../lib/autofix.mjs';

test('inferType returns folder type when frontmatter.type is absent', () => {
  const note = { type: 'npc', frontmatter: { role: 'ally' } };
  assert.equal(inferType(note), 'npc');
});

test('inferType returns null when type is already correct', () => {
  const note = { type: 'npc', frontmatter: { type: 'npc', role: 'ally' } };
  assert.equal(inferType(note), null);
});

test('normalizeWikilinkValue does not change what is already correct', () => {
  assert.equal(normalizeWikilinkValue('[[Norte Gelado]]'), '[[Norte Gelado]]');
});

test('normalizeWikilinkValue wraps bare name in [[...]]', () => {
  assert.equal(normalizeWikilinkValue('Norte Gelado'), '[[Norte Gelado]]');
});

test('normalizeWikilinkValue passes non-strings unchanged', () => {
  assert.equal(normalizeWikilinkValue(42), 42);
  assert.equal(normalizeWikilinkValue(undefined), undefined);
});

test("stampUpdated adds today's date and does not remove other fields", () => {
  const today = new Date().toISOString().slice(0, 10);
  const result = stampUpdated({ type: 'npc', role: 'ally' });
  assert.equal(result.updated, today);
  assert.equal(result.type, 'npc');
  assert.equal(result.role, 'ally');
});

test('normalizeFrontmatter puts type and status before type-specific fields', () => {
  const fm = { role: 'ally', type: 'npc', status: 'active', updated: '2026-01-01' };
  const result = normalizeFrontmatter(fm, 'npc');
  const keys = Object.keys(result);
  assert.equal(keys[0], 'type');
  assert.equal(keys[1], 'status');
  assert.ok(keys.includes('role'));
});
