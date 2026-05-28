# RPG Vault Guardian — Plugin & Marketplace Design

**Data:** 2026-05-28  
**Status:** Aprovado  
**Repo alvo:** `~/projects/rpg-marketplace`

---

## Contexto

O sistema de integridade de vault RPG (v1) foi construído como código local no vault Obsidian em `.claude/rpg/` + skills em `.claude/skills/` + agente em `.claude/agents/`. Consiste em:

- 9 módulos Node ESM (`lib/*.mjs`) — parser YAML, validador de schema, checker de links/coerência/órfãos, autofix, gerador de MOCs, write gate
- 2 CLIs (`validate.mjs`, `gen-mocs.mjs`)
- 2 skills (`rpg-preserve`, `rpg-audit`)
- 1 agente (`rpg-guardian`)
- 47 testes com fixtures

O objetivo é transformar esse sistema em um **plugin Claude Code** publicado em um **marketplace local**, para que possa ser instalado em qualquer vault como project scope — sem depender de cópias manuais de arquivos.

---

## Decisões de design

| # | Decisão | Escolha |
|---|---------|---------|
| 1 | Layout do marketplace | Monorepo (padrão `claude-plugins-official`): `plugins/<nome>/` |
| 2 | Nome do plugin | `rpg-vault-guardian` v1.0.0 |
| 3 | Abordagem de transformação | Repackage fiel (A): copia o código testado, adapta só os caminhos |
| 4 | Raiz do conteúdo validado | `cwd` direto — o usuário lança o Claude de dentro da pasta de conteúdo; validator usa `--vault .` |
| 5 | Scaffold inicial | Slash command `/rpg-init` + `scripts/init.mjs` derivado do schema |
| 6 | Hook ativo (write gate automático) | Fora do escopo v1.0 (YAGNI); pode ser adicionado em v1.1 |
| 7 | Vault Obsidian | **Não tocado** durante a criação do plugin. Instalação project-scope é fase 2. |

---

## Estrutura do repositório

```
rpg-marketplace/
├─ .claude-plugin/
│  └─ marketplace.json          ← manifesto do marketplace
├─ plugins/
│  └─ rpg-vault-guardian/
│     ├─ .claude-plugin/
│     │  └─ plugin.json         ← manifesto do plugin
│     ├─ commands/
│     │  └─ rpg-init.md         ← slash command /rpg-init
│     ├─ skills/
│     │  ├─ rpg-preserve/
│     │  │  └─ SKILL.md         ← write gate
│     │  └─ rpg-audit/
│     │     └─ SKILL.md         ← auditoria em 7 passos
│     ├─ agents/
│     │  └─ rpg-guardian.md     ← agente de auditoria isolada
│     ├─ scripts/
│     │  ├─ schema.mjs          ← FONTE DA VERDADE (registry)
│     │  ├─ validate.mjs        ← CLI validador
│     │  ├─ gen-mocs.mjs        ← CLI gerador de MOCs
│     │  ├─ init.mjs            ← CLI scaffolding (NOVO)
│     │  └─ lib/
│     │     ├─ yaml.mjs
│     │     ├─ frontmatter.mjs
│     │     ├─ schema.mjs
│     │     ├─ vault.mjs
│     │     ├─ checks.mjs
│     │     ├─ report.mjs
│     │     ├─ autofix.mjs
│     │     ├─ mocs.mjs
│     │     └─ preserve.mjs
│     ├─ test/
│     │  ├─ *.test.mjs          ← 47 testes existentes
│     │  ├─ init.test.mjs       ← NOVO: garante init↔schema
│     │  └─ fixtures/vault/     ← 14 notas de fixture
│     └─ README.md
├─ docs/
│  └─ specs/
│     └─ 2026-05-28-rpg-vault-guardian-plugin-design.md
├─ README.md
└─ LICENSE
```

---

## Plugin: rpg-vault-guardian

### Manifesto (`plugin.json`)

```json
{
  "name": "rpg-vault-guardian",
  "description": "Guardião da integridade de vaults Obsidian para campanhas de RPG. Valida schema, links, coerência e órfãos; cria entidades validadas (write gate); audita a campanha; e scaffolda a estrutura inicial de pastas.",
  "version": "1.0.0",
  "author": {
    "name": "Vagner Strapasson",
    "email": "vagnerstrapasson@gmail.com"
  },
  "license": "MIT",
  "keywords": ["rpg", "ttrpg", "obsidian", "vault", "validation", "gm", "campaign"]
}
```

### Skill: `rpg-preserve` (write gate)

Invocada sempre que o GM criar ou editar uma entidade da campanha. Fluxo:
1. Determina o caminho alvo via `targetPath(type, name, '.')`.
2. Constrói o frontmatter com `buildFrontmatter` + `buildNoteContent`.
3. Valida em memória via `validateCandidate` — **obrigatório antes de gravar**.
4. Zero erros → grava via `writeEntityFile`; erros → não grava, reporta ao usuário.

Scripts referenciados via `${CLAUDE_PLUGIN_ROOT}/scripts/lib/preserve.mjs`.

### Skill: `rpg-audit` (auditoria em 7 passos)

1. Snapshot git (prompt ao usuário).
2. Validação determinística: `node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault . --json`.
3. Auto-fix seguro: inferir tipo, normalizar, stampar `updated`.
4. Health check LLM: notas stale/incompletas/duplicatas.
5. Propor + confirmar correções destrutivas.
6. Regenerar MOCs: `node "${CLAUDE_PLUGIN_ROOT}/scripts/gen-mocs.mjs" --vault .`.
7. Relatório final com re-execução do validador.

Inclui modo migração (primeiro uso com muitas notas sem `type`).

### Agente: `rpg-guardian`

Ponto de entrada de auditoria em contexto isolado. Executa todos os 7 passos da `rpg-audit` e retorna sumário estruturado:
- erros/avisos iniciais
- auto-fixes aplicados
- correções destrutivas confirmadas
- MOCs regenerados
- estado final (`X erro(s) remanescente(s)`)

### Command: `/rpg-init` (NOVO)

**Arquivo:** `commands/rpg-init.md`  
**Script:** `scripts/init.mjs`

Comportamento:
- Lê todos os `ENTITIES` do `schema.mjs` e extrai `folder` de cada tipo.
- Lê `NON_ENTITY` (transcricoes).
- Acrescenta `_indices` (para MOCs).
- Cria todas as pastas faltantes no cwd (idempotente: não sobrescreve).
- Grava `.gitkeep` em cada pasta criada.
- Imprime o que foi criado vs o que já existia.

```
# pastas criadas (14 total):
regioes/  locais/  npcs/  jogadores/  inimigos/  faccoes/
quests/   sessoes/ sessoes/transcricoes/  eventos/  atos/
itens/    lore/    _indices/
```

---

## Marketplace (`marketplace.json`)

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "rpg-marketplace",
  "description": "Marketplace de plugins Claude Code para campanhas de RPG.",
  "owner": {
    "name": "Vagner Strapasson",
    "email": "vagnerstrapasson@gmail.com"
  },
  "plugins": [
    {
      "name": "rpg-vault-guardian",
      "description": "Guardião da integridade de vaults Obsidian para campanhas de RPG.",
      "version": "1.0.0",
      "source": "./plugins/rpg-vault-guardian",
      "category": "productivity"
    }
  ]
}
```

---

## Adaptações de caminho (Vault → Plugin)

Todos os módulos `.mjs` usam imports relativos entre si — movem como unidade, **sem alteração**. Apenas as referências nas skills/agente precisam mudar:

| Contexto | Antes (vault) | Depois (plugin) |
|---|---|---|
| Skills chamam CLIs | `node "…/.claude/rpg/validate.mjs"` | `node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs"` |
| Skills importam a lib | `import … from "…/.claude/rpg/lib/preserve.mjs"` | `import … from "${CLAUDE_PLUGIN_ROOT}/scripts/lib/preserve.mjs"` |
| Raiz do conteúdo | `--vault rpg` / path absoluto | `--vault .` (cwd — padrão do validator) |
| Skill file names | `rpg-preserve.md`, `rpg-audit.md` | `SKILL.md` (padrão Anthropic) |

`${CLAUDE_PLUGIN_ROOT}` é injetado automaticamente pelo Claude Code para cada plugin instalado.

---

## Testes

Todos os 47 testes existentes são copiados e executados no novo local. Passagem esperada: 47/47 sem alteração de lógica.

**Novo teste `init.test.mjs`:**
- Verifica que o conjunto de pastas geradas por `init.mjs` é idêntico ao conjunto derivado do schema (`folderForType` de todos os tipos + `NON_ENTITY.transcricao.folder` + `_indices`).
- Garante que adicionar um tipo no schema sem atualizar o init seria detectado imediatamente.

---

## Fase 2 — Instalação project-scope no vault (após plugin pronto)

Esta fase toca o vault Obsidian. Passos:

1. **Registrar marketplace local:**  
   `/plugin marketplace add ~/projects/rpg-marketplace`

2. **Instalar o plugin:**  
   `/plugin install rpg-vault-guardian@rpg-marketplace`

3. **Fixar como project scope:**  
   Adicionar ao `.claude/settings.json` do vault (criando se não existir):
   ```json
   {
     "extraKnownMarketplaces": {
       "rpg-marketplace": {
         "source": {
           "source": "directory",
           "path": "/Users/vags/projects/rpg-marketplace"
         }
       }
     },
     "enabledPlugins": ["rpg-vault-guardian@rpg-marketplace"]
   }
   ```

4. **Remover cópias antigas** (evitar colisão de nomes):
   - `.claude/rpg/` (scripts e lib)
   - `.claude/skills/rpg-preserve/`
   - `.claude/skills/rpg-audit/`
   - `.claude/agents/rpg-guardian.md`

> **Nota — reestruturação do vault:** Após a instalação, a pasta `rpg/` deve ser removida e o conteúdo movido para a raiz do vault, para que o cwd-direto funcione ao lançar o Claude da raiz. Esse trabalho é separado e fora do escopo deste plugin.

---

## Fora do escopo (v1.0)

- Hook `PreToolUse` para write gate automático — planejado para v1.1.
- Segundo plugin no marketplace (ex: content-creation skillkit) — futuro.
- Publicação em marketplace remoto (GitHub) — futuro.
