import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  folderForType, typeForFolder, requiredFields, relationsFor,
  fieldDef, isEntityType, checkSchemaIntegrity,
} from '../lib/schema.mjs';

test('maps type <-> folder', () => {
  assert.equal(folderForType('npc'), 'npcs');
  assert.equal(typeForFolder('faccoes'), 'faccao');
  assert.equal(typeForFolder('inexistente'), null);
});

test('required fields and relations', () => {
  assert.deepEqual(requiredFields('quest'), ['type', 'act', 'status']);
  assert.equal(relationsFor('npc').statblock.target, 'inimigo');
  assert.equal(relationsFor('faccao').key_members.curated, true);
  assert.equal(relationsFor('sessao').transcript.linkOnly, true);
});

test('fieldDef covers entity field and common field', () => {
  assert.deepEqual(fieldDef('npc', 'role').values, ['ally', 'neutral', 'antagonist', 'patron']);
  assert.equal(fieldDef('npc', 'status').type, 'enum');
});

test('isEntityType', () => {
  assert.equal(isEntityType('lore'), true);
  assert.equal(isEntityType('transcricao'), false);
});

test('the registry itself is valid (no unknown relation targets)', () => {
  assert.deepEqual(checkSchemaIntegrity(), []);
});

test('gamemaster types map to folders and keep the registry valid', () => {
  assert.equal(folderForType('frente'), 'frentes');
  assert.equal(folderForType('relogio'), 'relogios');
  assert.equal(folderForType('encontro'), 'encontros');
  assert.equal(requiredFields('relogio').includes('segments'), true);
  assert.equal(relationsFor('frente').clocks.target, 'relogio');
  assert.equal(relationsFor('encontro').creatures.target, 'inimigo');
  assert.deepEqual(checkSchemaIntegrity(), []); // targets known, enums have values
});

test('desafio (non-combat challenge) maps to its folder, fields, and relations', () => {
  assert.equal(folderForType('desafio'), 'desafios');
  assert.equal(typeForFolder('desafios'), 'desafio');
  assert.deepEqual(requiredFields('desafio'), ['type']);
  assert.deepEqual(fieldDef('desafio', 'subsystem').values,
    ['influence', 'chase', 'research', 'infiltration', 'generic']);
  assert.deepEqual(fieldDef('desafio', 'vp_format').values,
    ['accumulating', 'diminishing', 'multiple']);
  assert.equal(relationsFor('desafio').location.target, 'local');
  assert.equal(relationsFor('desafio').npcs.many, true);
  assert.equal(relationsFor('desafio').clock.target, 'relogio');
  assert.deepEqual(checkSchemaIntegrity(), []); // still valid after adding desafio
});
