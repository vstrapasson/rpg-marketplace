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

test('item carries structured loot fields (value, level, rarity, category)', () => {
  assert.equal(fieldDef('item', 'value').type, 'number');
  assert.equal(fieldDef('item', 'item_level').type, 'number');
  assert.deepEqual(fieldDef('item', 'rarity').values, ['common', 'uncommon', 'rare', 'unique']);
  assert.deepEqual(fieldDef('item', 'category').values,
    ['permanent', 'consumable', 'currency', 'art', 'gear']);
  assert.equal(relationsFor('item').owner.target.includes('jogador'), true);
  assert.deepEqual(checkSchemaIntegrity(), []); // still valid after adding item fields
});

test('jogador relations include region (PC home region is a validated link)', () => {
  assert.deepEqual(requiredFields('jogador'), ['type', 'player']);
  assert.equal(relationsFor('jogador').faction.target, 'faccao');
  assert.equal(relationsFor('jogador').location.target, 'local');
  assert.equal(relationsFor('jogador').region.target, 'regiao');
  assert.deepEqual(checkSchemaIntegrity(), []); // still valid after adding region
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
