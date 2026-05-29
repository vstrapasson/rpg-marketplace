export const COMMON_FIELDS = {
  type: { type: 'enum', required: true },
  status: { type: 'enum', values: ['stub', 'draft', 'active', 'archived'] },
  created: { type: 'date' },
  updated: { type: 'date' },
  aliases: { type: 'string[]' },
  tags: { type: 'string[]' },
};

export const ENTITIES = {
  regiao: { folder: 'regioes', required: ['type'],
    relations: { parent_region: { target: 'regiao' } } },
  local: { folder: 'locais', required: ['type', 'region'],
    relations: { region: { target: 'regiao' }, faction_control: { target: 'faccao' } } },
  npc: { folder: 'npcs', required: ['type', 'role'],
    fields: { role: { type: 'enum', values: ['ally', 'neutral', 'antagonist', 'patron'], required: true } },
    relations: { location: { target: 'local' }, faction: { target: 'faccao' }, statblock: { target: 'inimigo' } } },
  jogador: { folder: 'jogadores', required: ['type', 'player'],
    relations: { faction: { target: 'faccao' }, location: { target: 'local' } } },
  inimigo: { folder: 'inimigos', required: ['type'], relations: {} },
  faccao: { folder: 'faccoes', required: ['type'],
    relations: { key_members: { target: 'npc', many: true, curated: true },
      headquarters: { target: 'local' }, rivals: { target: 'faccao', many: true } } },
  quest: { folder: 'quests', required: ['type', 'act', 'status'],
    fields: { status: { type: 'enum', values: ['available', 'active', 'completed', 'failed', 'abandoned'], required: true } },
    relations: { act: { target: 'ato' }, giver: { target: 'npc' }, npcs: { target: 'npc', many: true },
      locations: { target: 'local', many: true }, items: { target: 'item', many: true },
      factions: { target: 'faccao', many: true } } },
  sessao: { folder: 'sessoes', required: ['type', 'date'],
    fields: { date: { type: 'date' } },
    relations: { act: { target: 'ato' }, players_present: { target: 'jogador', many: true },
      events: { target: 'evento', many: true }, quests: { target: 'quest', many: true },
      transcript: { target: 'transcricao', linkOnly: true } } },
  evento: { folder: 'eventos', required: ['type', 'act'],
    relations: { act: { target: 'ato' }, location: { target: 'local' },
      participants: { target: ['npc', 'jogador'], many: true }, session: { target: 'sessao' } } },
  ato: { folder: 'atos', required: ['type', 'number'],
    fields: { number: { type: 'number', required: true },
      status: { type: 'enum', values: ['upcoming', 'active', 'completed'] } },
    relations: {} },
  item: { folder: 'itens', required: ['type'],
    relations: { owner: { target: ['npc', 'jogador'] }, location: { target: 'local' } } },
  lore: { folder: 'lore', required: ['type'],
    relations: { related: { target: '*', many: true } } },
};

export const NON_ENTITY = {
  transcricao: { folder: 'sessoes/transcricoes' },
};

export const IGNORED_TOP = ['_indices', '.obsidian', '.claude', '.git'];
