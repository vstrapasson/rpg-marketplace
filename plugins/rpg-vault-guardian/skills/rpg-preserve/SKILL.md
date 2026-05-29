---
description: Write gate para vaults Obsidian de RPG. Toda criação ou edição de entidade DEVE passar por aqui — valida em memória antes de gravar em disco.
---

# rpg-preserve — Write Gate

Você é o ponto único de escrita do vault de RPG. Nenhuma entidade é gravada em disco sem passar pela validação. Contrato: **validar → passar? gravar : perguntar**.

## Workflow obrigatório

### 1. Determinar pasta e caminho alvo

Use `targetPath` de `lib/preserve.mjs`. A pasta é definida pelo schema:

| Tipo | Pasta |
|---|---|
| regiao | regioes/ |
| local | locais/ |
| npc | npcs/ |
| jogador | jogadores/ |
| inimigo | inimigos/ |
| faccao | faccoes/ |
| quest | quests/ |
| sessao | sessoes/ |
| evento | eventos/ |
| ato | atos/ |
| item | itens/ |
| lore | lore/ |

### 2. Construir frontmatter e conteúdo

Use `buildFrontmatter(type, fields)` e `buildNoteContent(fm, name)` de `lib/preserve.mjs`.

Regras de formatação obrigatórias:
- Campos com wikilink: sempre `"[[Nome da Entidade]]"` (aspas + colchetes)
- Lista de wikilinks: bloco YAML com item por linha (`  - "[[Nome]]"`)
- `status` padrão quando não especificado: `stub`
- `updated` é carimbado automaticamente com a data de hoje

### 3. Validar o candidato (OBRIGATÓRIO antes de gravar)

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { buildFrontmatter, buildNoteContent, validateCandidate }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
const vaultDir = process.cwd();
const fm = buildFrontmatter('TIPO', { /* campos */ });
const content = buildNoteContent(fm, 'NOME');
const report = await validateCandidate('NOME', content, 'TIPO', vaultDir);
console.log(JSON.stringify(report, null, 2));
EOF
```

### 4. Decisão baseada no relatório

**Se `report.summary.errors === 0` → gravar:**

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { buildFrontmatter, buildNoteContent, writeEntityFile }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
const vaultDir = process.cwd();
const fm = buildFrontmatter('TIPO', { /* campos */ });
const content = buildNoteContent(fm, 'NOME');
const path = await writeEntityFile('TIPO', 'NOME', content, vaultDir);
console.log('Criado em: ' + path);
EOF
```

Confirme ao usuário: `✅ Entidade criada em <pasta>/NOME.md`

**Se `report.summary.errors > 0` → NÃO gravar:**

Mostre os erros e pergunte:
> "Existem X erro(s) de validação. Deseja corrigir os campos e tentar de novo?"

Liste cada erro com o campo afetado. Não grave até que a validação passe com 0 erros.

## Campos obrigatórios por tipo (referência rápida)

| Tipo | Obrigatórios |
|---|---|
| regiao | type |
| local | type, region (→ [[Região]]) |
| npc | type, role (ally/neutral/antagonist/patron) |
| jogador | type, player |
| inimigo | type |
| faccao | type |
| quest | type, act (→ [[Ato]]), status (available/active/completed/failed/abandoned) |
| sessao | type, date (YYYY-MM-DD) |
| evento | type, act (→ [[Ato]]) |
| ato | type, number (inteiro) |
| item | type |
| lore | type |

## Exemplo completo — Criar NPC "Elara"

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { buildFrontmatter, buildNoteContent, validateCandidate, writeEntityFile }
  from "${PLUGIN}/scripts/lib/preserve.mjs";
const vaultDir = process.cwd();
const fm = buildFrontmatter('npc', {
  role: 'ally',
  status: 'stub',
  faction: '[[Culto do Inverno]]',
  location: '[[Cidade de Pedra]]',
});
const content = buildNoteContent(fm, 'Elara');
const report = await validateCandidate('Elara', content, 'npc', vaultDir);
if (report.summary.errors === 0) {
  const path = await writeEntityFile('npc', 'Elara', content, vaultDir);
  console.log('✅ Criado em: ' + path);
} else {
  console.log(JSON.stringify(report.issues, null, 2));
}
EOF
```
