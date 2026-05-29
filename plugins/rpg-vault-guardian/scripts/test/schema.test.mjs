import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  folderForType, typeForFolder, requiredFields, relationsFor,
  fieldDef, isEntityType, checkSchemaIntegrity,
} from '../lib/schema.mjs';

test('mapeia tipo <-> pasta', () => {
  assert.equal(folderForType('npc'), 'npcs');
  assert.equal(typeForFolder('faccoes'), 'faccao');
  assert.equal(typeForFolder('inexistente'), null);
});

test('campos obrigatórios e relações', () => {
  assert.deepEqual(requiredFields('quest'), ['type', 'act', 'status']);
  assert.equal(relationsFor('npc').statblock.target, 'inimigo');
  assert.equal(relationsFor('faccao').key_members.curated, true);
  assert.equal(relationsFor('sessao').transcript.linkOnly, true);
});

test('fieldDef cobre campo de entidade e campo comum', () => {
  assert.deepEqual(fieldDef('npc', 'role').values, ['ally', 'neutral', 'antagonist', 'patron']);
  assert.equal(fieldDef('npc', 'status').type, 'enum');
});

test('isEntityType', () => {
  assert.equal(isEntityType('lore'), true);
  assert.equal(isEntityType('transcricao'), false);
});

test('o próprio registro é íntegro (sem alvos de relação desconhecidos)', () => {
  assert.deepEqual(checkSchemaIntegrity(), []);
});
