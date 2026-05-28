# rpg-vault-guardian Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o sistema de integridade de vault RPG (v1, atualmente em `.claude/rpg/` do vault Obsidian) em um plugin Claude Code instalável em `~/projects/rpg-marketplace`.

**Architecture:** Monorepo marketplace com um plugin (`rpg-vault-guardian`). O código Node ESM já testado é copiado integralmente para `scripts/` — sem alterações de lógica. Apenas os arquivos markdown de skills/agente/command são adaptados: caminhos absolutos do vault são substituídos por `${CLAUDE_PLUGIN_ROOT}/scripts/` e `--vault .` (cwd). A validação usa cwd como raiz de conteúdo (usuário lança Claude da pasta de conteúdo do vault).

**Tech Stack:** Node.js ≥ 20.11, ESM (.mjs), node:test nativo, zero dependências npm em runtime.

---

## Mapa de arquivos

### Criar

```
~/projects/rpg-marketplace/
├─ .claude-plugin/marketplace.json
├─ .gitignore
├─ LICENSE
├─ README.md
├─ docs/superpowers/plans/         ← este arquivo
└─ plugins/rpg-vault-guardian/
   ├─ .claude-plugin/plugin.json
   ├─ package.json
   ├─ README.md
   ├─ agents/rpg-guardian.md       ← adaptado (remove paths absolutos)
   ├─ commands/rpg-init.md         ← NOVO
   ├─ skills/rpg-preserve/SKILL.md ← adaptado (${CLAUDE_PLUGIN_ROOT})
   ├─ skills/rpg-audit/SKILL.md    ← adaptado (${CLAUDE_PLUGIN_ROOT})
   └─ scripts/
      ├─ schema.mjs                ← cópia exata (sem alterações)
      ├─ validate.mjs              ← cópia exata
      ├─ gen-mocs.mjs              ← cópia exata
      ├─ init.mjs                  ← NOVO
      ├─ lib/
      │  ├─ yaml.mjs               ← cópia exata
      │  ├─ frontmatter.mjs        ← cópia exata
      │  ├─ schema.mjs             ← cópia exata
      │  ├─ vault.mjs              ← cópia exata
      │  ├─ checks.mjs             ← cópia exata
      │  ├─ report.mjs             ← cópia exata
      │  ├─ autofix.mjs            ← cópia exata
      │  ├─ mocs.mjs               ← cópia exata
      │  └─ preserve.mjs           ← cópia exata
      └─ test/
         ├─ *.test.mjs             ← 12 arquivos, cópia exata (imports relativos OK)
         ├─ init.test.mjs          ← NOVO
         └─ fixtures/vault/        ← 14 notas, cópia exata
```

> **Nota de layout:** Os testes ficam em `scripts/test/` (não na raiz do plugin) para que todos os imports relativos existentes (`../lib/...`) continuem corretos sem alteração. Desvio menor do diagrama do spec; consistente com "repackage fiel".

### Fonte das cópias (vault Obsidian — NÃO modificar)

```
/Users/vags/Documents/obsidian/main/.claude/rpg/
├─ schema.mjs, validate.mjs, gen-mocs.mjs
├─ lib/*.mjs (9 módulos)
└─ test/ (12 arquivos + fixtures/vault/)
```

---

## Task 1: Scaffolding + manifestos

**Files:**
- Create: `~/projects/rpg-marketplace/.claude-plugin/marketplace.json`
- Create: `~/projects/rpg-marketplace/plugins/rpg-vault-guardian/.claude-plugin/plugin.json`
- Create: `~/projects/rpg-marketplace/plugins/rpg-vault-guardian/package.json`
- Create: `~/projects/rpg-marketplace/.gitignore`
- Create: `~/projects/rpg-marketplace/LICENSE`
- Create: `~/projects/rpg-marketplace/README.md`
- Create: `~/projects/rpg-marketplace/plugins/rpg-vault-guardian/README.md`

- [ ] **Step 1: Criar a estrutura de diretórios**

```bash
mkdir -p ~/projects/rpg-marketplace/.claude-plugin
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/.claude-plugin
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/lib
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/skills/rpg-preserve
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/skills/rpg-audit
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/agents
mkdir -p ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/commands
```

- [ ] **Step 2: Criar `.gitignore` e `LICENSE`**

`~/projects/rpg-marketplace/.gitignore`:
```
node_modules/
.DS_Store
```

`~/projects/rpg-marketplace/LICENSE` (MIT):
```
MIT License

Copyright (c) 2026 Vagner Strapasson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Criar `.claude-plugin/marketplace.json`**

`~/projects/rpg-marketplace/.claude-plugin/marketplace.json`:
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

- [ ] **Step 4: Criar `plugins/rpg-vault-guardian/.claude-plugin/plugin.json`**

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

- [ ] **Step 5: Criar `plugins/rpg-vault-guardian/package.json`**

```json
{
  "name": "rpg-vault-guardian",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "test": "node --test scripts/test/*.test.mjs"
  }
}
```

- [ ] **Step 6: Criar READMEs**

`~/projects/rpg-marketplace/README.md` (conteúdo):

    # rpg-marketplace
    
    Marketplace de plugins Claude Code para campanhas de RPG.
    
    ## Plugins
    
    - **rpg-vault-guardian** — Guardião da integridade de vaults Obsidian para campanhas de RPG.
    
    ## Instalação
    
        /plugin marketplace add ~/projects/rpg-marketplace
        /plugin install rpg-vault-guardian@rpg-marketplace

`~/projects/rpg-marketplace/plugins/rpg-vault-guardian/README.md` (conteúdo):

    # rpg-vault-guardian
    
    Plugin Claude Code para garantir a integridade estrutural de vaults Obsidian usados em campanhas de RPG.
    
    ## O que faz
    
    - **/rpg-init** — Scaffolda a estrutura de pastas inicial (14 pastas derivadas do schema)
    - **rpg-preserve** — Write gate: valida toda entidade em memória antes de gravar
    - **rpg-audit** — Auditoria em 7 passos: validação, auto-fix, saúde LLM, MOCs
    - **rpg-guardian** — Agente de auditoria em contexto isolado
    
    ## Uso
    
    Lance o Claude Code a partir da raiz do vault de campanha (pasta com regioes/, npcs/, etc.):
    
        cd ~/Documents/obsidian/main
        claude
    
    ## Testes
    
        cd plugins/rpg-vault-guardian && npm test

- [ ] **Step 7: Commit**

```bash
cd ~/projects/rpg-marketplace
git add .
git commit -m "feat: scaffold marketplace + plugin manifests"
```

Saída esperada:
```
[main ...] feat: scaffold marketplace + plugin manifests
 N files changed, ...
```

---

## Task 2: Copiar scripts e testes (verificar 47/47)

**Files:**
- Create: `plugins/rpg-vault-guardian/scripts/schema.mjs` (cópia)
- Create: `plugins/rpg-vault-guardian/scripts/validate.mjs` (cópia)
- Create: `plugins/rpg-vault-guardian/scripts/gen-mocs.mjs` (cópia)
- Create: `plugins/rpg-vault-guardian/scripts/lib/*.mjs` (9 módulos, cópias)
- Create: `plugins/rpg-vault-guardian/scripts/test/*.test.mjs` (12 arquivos, cópias)
- Create: `plugins/rpg-vault-guardian/scripts/test/fixtures/vault/` (14 notas, cópias)

- [ ] **Step 1: Copiar scripts**

```bash
VAULT_SRC="/Users/vags/Documents/obsidian/main/.claude/rpg"
PLUGIN_DST="/Users/vags/projects/rpg-marketplace/plugins/rpg-vault-guardian"

cp "$VAULT_SRC/schema.mjs"    "$PLUGIN_DST/scripts/schema.mjs"
cp "$VAULT_SRC/validate.mjs"  "$PLUGIN_DST/scripts/validate.mjs"
cp "$VAULT_SRC/gen-mocs.mjs"  "$PLUGIN_DST/scripts/gen-mocs.mjs"
cp -r "$VAULT_SRC/lib/"       "$PLUGIN_DST/scripts/lib/"
```

- [ ] **Step 2: Verificar os scripts copiados**

```bash
ls ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/
ls ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/lib/
```

Saída esperada:
```
gen-mocs.mjs  lib  schema.mjs  validate.mjs
autofix.mjs  checks.mjs  frontmatter.mjs  mocs.mjs  preserve.mjs  report.mjs  schema.mjs  vault.mjs  yaml.mjs
```

- [ ] **Step 3: Copiar testes e fixtures**

```bash
VAULT_SRC="/Users/vags/Documents/obsidian/main/.claude/rpg"
PLUGIN_DST="/Users/vags/projects/rpg-marketplace/plugins/rpg-vault-guardian"

mkdir -p "$PLUGIN_DST/scripts/test"
cp "$VAULT_SRC/test/"*.test.mjs "$PLUGIN_DST/scripts/test/"
cp -r "$VAULT_SRC/test/fixtures" "$PLUGIN_DST/scripts/test/"
```

- [ ] **Step 4: Verificar testes copiados**

```bash
ls ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/scripts/test/
```

Saída esperada (12 arquivos .test.mjs + pasta fixtures):
```
autofix.test.mjs  checks-coherence.test.mjs  checks-links.test.mjs
checks-schema.test.mjs  frontmatter.test.mjs  mocs.test.mjs
preserve.test.mjs  report.test.mjs  schema.test.mjs
validate.test.mjs  vault.test.mjs  yaml.test.mjs
fixtures/
```

- [ ] **Step 5: Executar todos os testes**

```bash
cd ~/projects/rpg-marketplace/plugins/rpg-vault-guardian
node --test scripts/test/*.test.mjs
```

Saída esperada (última linha):
```
ℹ tests 47
ℹ pass 47
ℹ fail 0
```

Se algum teste falhar, verifique se os arquivos foram copiados corretamente e se os imports relativos estão intactos. Não prossiga até todos passarem.

- [ ] **Step 6: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/scripts/
git commit -m "feat: copy validated scripts and tests (47/47 passing)"
```

---

## Task 3: init.mjs (TDD)

**Files:**
- Test: `plugins/rpg-vault-guardian/scripts/test/init.test.mjs`
- Create: `plugins/rpg-vault-guardian/scripts/init.mjs`

- [ ] **Step 1: Escrever o teste (deve falhar — init.mjs não existe ainda)**

`plugins/rpg-vault-guardian/scripts/test/init.test.mjs`:
```js
import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from '../schema.mjs';
import { foldersFromSchema, initVault } from '../init.mjs';

test('foldersFromSchema cobre todos os tipos do schema', () => {
  const folders = foldersFromSchema();

  for (const def of Object.values(ENTITIES)) {
    assert.ok(folders.includes(def.folder), `falta pasta de entidade: ${def.folder}`);
  }
  for (const def of Object.values(NON_ENTITY)) {
    assert.ok(folders.includes(def.folder), `falta pasta NON_ENTITY: ${def.folder}`);
  }
  assert.ok(folders.includes('_indices'), 'falta _indices');
  assert.strictEqual(folders.length, 14, `esperado 14 pastas, encontrado ${folders.length}`);
});

test('initVault cria as 14 pastas com .gitkeep', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    const results = await initVault(dir);
    assert.ok(results.every(r => r.created), 'todas devem ser criadas no dir vazio');
    for (const { folder } of results) {
      const entries = await readdir(join(dir, folder));
      assert.ok(entries.includes('.gitkeep'), `falta .gitkeep em ${folder}`);
    }
  } finally {
    await rm(dir, { recursive: true });
  }
});

test('initVault é idempotente', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    await initVault(dir);
    const results2 = await initVault(dir);
    assert.ok(results2.every(r => !r.created), 'segunda execução não deve criar nada');
  } finally {
    await rm(dir, { recursive: true });
  }
});
```

- [ ] **Step 2: Executar o teste para confirmar que falha**

```bash
cd ~/projects/rpg-marketplace/plugins/rpg-vault-guardian
node --test scripts/test/init.test.mjs
```

Saída esperada: erro `Cannot find module '../init.mjs'` ou similar. Confirme que falha antes de prosseguir.

- [ ] **Step 3: Implementar `scripts/init.mjs`**

`plugins/rpg-vault-guardian/scripts/init.mjs`:
```js
#!/usr/bin/env node
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from './schema.mjs';

export function foldersFromSchema() {
  const folders = [];
  for (const def of Object.values(ENTITIES)) {
    folders.push(def.folder);
  }
  for (const def of Object.values(NON_ENTITY)) {
    folders.push(def.folder);
  }
  folders.push('_indices');
  return folders;
}

export async function initVault(vaultDir) {
  const folders = foldersFromSchema();
  const results = [];
  for (const folder of folders) {
    const fullPath = join(vaultDir, folder);
    let exists = false;
    try { await access(fullPath); exists = true; } catch {}
    if (!exists) {
      await mkdir(fullPath, { recursive: true });
      await writeFile(join(fullPath, '.gitkeep'), '');
      results.push({ folder, created: true });
    } else {
      results.push({ folder, created: false });
    }
  }
  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = await initVault(process.cwd());
  for (const { folder, created } of results) {
    console.log(`${created ? '✅ criado' : '⏭  existe'}: ${folder}`);
  }
}
```

- [ ] **Step 4: Executar apenas o teste de init**

```bash
node --test scripts/test/init.test.mjs
```

Saída esperada:
```
ℹ tests 3
ℹ pass 3
ℹ fail 0
```

- [ ] **Step 5: Executar a suite completa (deve ser 50/50)**

```bash
node --test scripts/test/*.test.mjs
```

Saída esperada:
```
ℹ tests 50
ℹ pass 50
ℹ fail 0
```

- [ ] **Step 6: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/scripts/init.mjs \
        plugins/rpg-vault-guardian/scripts/test/init.test.mjs
git commit -m "feat: add init.mjs scaffold command (TDD, 50/50 tests)"
```

---

## Task 4: Skills (caminhos adaptados)

**Files:**
- Create: `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md`
- Create: `plugins/rpg-vault-guardian/skills/rpg-audit/SKILL.md`

As principais mudanças em relação à versão do vault:
- `${PLUGIN}="${CLAUDE_PLUGIN_ROOT}"` no início de cada heredoc bash
- Imports: `/absolute/path/lib/*.mjs` → `${PLUGIN}/scripts/lib/*.mjs`
- vaultDir: `/absolute/path/rpg` → `process.cwd()`
- CLIs: `node /absolute/validate.mjs --vault /absolute/rpg` → `node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault .`
- Tabela tipo→pasta: remover prefixo `rpg/` (pastas agora na raiz do vault)
- folder extraction no audit 3a: usar `relative(process.cwd(), filePath)` em vez de `replace(vaultPath)`

- [ ] **Step 1: Criar `skills/rpg-preserve/SKILL.md`**

```markdown
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
```

- [ ] **Step 2: Criar `skills/rpg-audit/SKILL.md`**

```markdown
---
description: Auditoria completa do vault de RPG — validação determinística, julgamento LLM, auto-fix seguro, proposta de correções destrutivas e regeneração de MOCs.
---

# rpg-audit — Vault Audit

Execute uma auditoria completa do vault. Siga os 7 passos abaixo **em ordem**.

Execute todos os comandos a partir da **raiz do vault** (diretório onde estão as pastas `regioes/`, `npcs/`, etc.).

---

## Passo 1 — Snapshot (antes de qualquer modificação)

Pergunte ao usuário:
> "Deseja fazer um commit de snapshot antes de continuar?"

Se sim:
```bash
git add . && git commit -m "snapshot: antes da auditoria $(date +%Y-%m-%d)"
```

---

## Passo 2 — Validação determinística

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault . --json
```

Parse o JSON retornado. Categorize os problemas por família:
- **schema**: `type` ausente, campo obrigatório faltando, enum inválido
- **links**: link quebrado (`broken-link`), entidade órfã (`orphan`)
- **coherence**: tipo de alvo errado (`wrong-target-type`)

Mostre um resumo: `"X erro(s), Y aviso(s) encontrados."`

---

## Passo 3 — Auto-fix seguro (aplicar sem confirmação)

Aplique automaticamente e liste cada arquivo alterado.

### 3a — `type` ausente ou errado → inferir da pasta

Para cada nota com `missing-type` ou `type-folder-mismatch` no relatório do Passo 2:

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { readFile, writeFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { extractFrontmatter } from "${PLUGIN}/scripts/lib/frontmatter.mjs";
import { inferType, normalizeFrontmatter, stampUpdated } from "${PLUGIN}/scripts/lib/autofix.mjs";
import { serializeFrontmatter } from "${PLUGIN}/scripts/lib/preserve.mjs";
import { typeForFolder } from "${PLUGIN}/scripts/lib/schema.mjs";

const filePath = 'CAMINHO_ABSOLUTO_DA_NOTA';
const raw = await readFile(filePath, 'utf8');
const { frontmatter: fm, body } = extractFrontmatter(raw);
const folder = relative(process.cwd(), filePath).split('/')[0];
const type = typeForFolder(folder);
const note = { type, frontmatter: fm };
const correctedType = inferType(note);
if (correctedType) {
  const newFm = normalizeFrontmatter(stampUpdated({ ...fm, type: correctedType }), correctedType);
  await writeFile(filePath, serializeFrontmatter(newFm) + body, 'utf8');
  console.log('✅ auto-fix type:', filePath);
}
EOF
```

### 3b — `updated` ausente → carimbar com data de hoje

Para cada entidade sem campo `updated`:

```bash
PLUGIN="${CLAUDE_PLUGIN_ROOT}"
node --input-type=module << EOF
import { readFile, writeFile } from 'node:fs/promises';
import { extractFrontmatter } from "${PLUGIN}/scripts/lib/frontmatter.mjs";
import { stampUpdated } from "${PLUGIN}/scripts/lib/autofix.mjs";
import { serializeFrontmatter } from "${PLUGIN}/scripts/lib/preserve.mjs";

const filePath = 'CAMINHO_ABSOLUTO_DA_NOTA';
const raw = await readFile(filePath, 'utf8');
const { frontmatter: fm, body } = extractFrontmatter(raw);
if (!fm.updated) {
  const newFm = stampUpdated(fm);
  await writeFile(filePath, serializeFrontmatter(newFm) + body, 'utf8');
  console.log('✅ auto-fix updated:', filePath);
}
EOF
```

---

## Passo 4 — Checagem de saúde (julgamento LLM)

Leia cada entidade e avalie:

**Stale:** `status: active` + `updated` com mais de 30 dias → aviso  
**Incompleto:** `status: stub` OU corpo da nota contém "TODO" → aviso  
**Duplicata:** nomes muito similares (ex: "Malareph" e "Malareph o Necromante") → propõe merge

Agrupe os avisos por tipo e apresente ao usuário.

---

## Passo 5 — Propor + confirmar correções destrutivas

Liste **todas** as correções propostas antes de aplicar qualquer uma:

| # | Problema | Nota | Proposta |
|---|---|---|---|
| 1 | Link quebrado `[[X]]` em `campo` | npcs/Foo.md | Criar `[[X]]` via rpg-preserve ou remover o campo? |
| 2 | Tipo de alvo errado (`faction` → regiao) | npcs/Bar.md | Corrigir campo `faction`? |
| 3 | Entidade órfã | faccoes/Baz.md | Manter, mover para lore/, ou apagar? |
| 4 | Duplicata provável | npcs/A.md + npcs/B.md | Mesclar? Qual é a nota principal? |

Pergunte: `"Deseja resolver esses itens? Responda s/n para cada número."`

Para cada item confirmado (s), aplique a correção usando as ferramentas disponíveis (Edit, Write, Bash). Para criação de entidades faltantes, use rpg-preserve.

---

## Passo 6 — Regenerar MOCs

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/gen-mocs.mjs" --vault .
```

---

## Passo 7 — Relatório final

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/validate.mjs" --vault .
```

Mostre o relatório final e um resumo do que foi alterado nesta auditoria.

---

## Modo migração (primeiro uso)

Se você detectar muitas notas em pastas de entidade sem campo `type`, você está em **modo migração**. Anuncie:

> "Encontrei X notas sem campo `type` nas pastas de entidade. Posso inferir o tipo pela pasta e adicionar o frontmatter mínimo a todas. Deseja continuar? [s/n]"

Se confirmado, aplique o auto-fix 3a a todas as notas afetadas em lote, reportando cada arquivo alterado.
```

- [ ] **Step 3: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/skills/
git commit -m "feat: add adapted skills (rpg-preserve, rpg-audit) with CLAUDE_PLUGIN_ROOT paths"
```

---

## Task 5: Agente + command

**Files:**
- Create: `plugins/rpg-vault-guardian/agents/rpg-guardian.md`
- Create: `plugins/rpg-vault-guardian/commands/rpg-init.md`

- [ ] **Step 1: Criar `agents/rpg-guardian.md`**

(Remove a seção "Contexto do vault" com paths absolutos — o agente invoca a skill, que tem todos os paths)

```markdown
---
name: rpg-guardian
description: Guardião do vault de RPG. Use quando quiser auditar a integridade da campanha — executa a auditoria completa em contexto isolado, sem poluir a conversa principal.
---

Você é o **guardião do vault de RPG**. Sua única responsabilidade é executar a auditoria de integridade e retornar um relatório estruturado ao usuário.

## O que você faz

Ao ser invocado, execute a skill **rpg-audit** do início ao fim, na ordem dos 7 passos:

1. Pergunte sobre snapshot (Passo 1)
2. Rode o validador determinístico (Passo 2)
3. Aplique auto-fixes seguros (Passo 3)
4. Faça a checagem de saúde LLM (Passo 4)
5. Proponha e confirme correções destrutivas (Passo 5)
6. Regenere os MOCs (Passo 6)
7. Mostre o relatório final (Passo 7)

Se for o **primeiro uso** (muitas notas sem campo `type` nas pastas de entidade), ative o **modo migração** conforme descrito na skill rpg-audit antes de seguir o fluxo normal.

## Ao finalizar

Retorne ao usuário um resumo claro com:
- Quantos erros/avisos foram encontrados inicialmente
- Quais auto-fixes foram aplicados automaticamente
- Quais correções destrutivas foram confirmadas e aplicadas
- Se os MOCs foram regenerados
- Estado final: `"X erro(s) remanescentes"`
```

- [ ] **Step 2: Criar `commands/rpg-init.md`**

```markdown
---
description: Scaffolda a estrutura inicial de pastas para um vault de campanha RPG.
---

# rpg-init — Estrutura inicial do vault

Execute o script de scaffolding no diretório atual (raiz do vault):

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/init.mjs"
```

Mostre o resultado ao usuário, indicando quais pastas foram criadas (✅) e quais já existiam (⏭).
```

- [ ] **Step 3: Commit**

```bash
cd ~/projects/rpg-marketplace
git add plugins/rpg-vault-guardian/agents/ \
        plugins/rpg-vault-guardian/commands/
git commit -m "feat: add rpg-guardian agent and rpg-init command"
```

---

## Task 6: Verificação final

**Files:** nenhum novo arquivo — apenas validação.

- [ ] **Step 1: Executar a suite completa**

```bash
cd ~/projects/rpg-marketplace/plugins/rpg-vault-guardian
node --test scripts/test/*.test.mjs
```

Saída esperada:
```
ℹ tests 50
ℹ pass 50
ℹ fail 0
```

- [ ] **Step 2: Verificar estrutura contra o spec**

```bash
find ~/projects/rpg-marketplace -not -path '*/.git/*' -type f | sort
```

Confirme a presença de:
- `.claude-plugin/marketplace.json`
- `plugins/rpg-vault-guardian/.claude-plugin/plugin.json`
- `plugins/rpg-vault-guardian/package.json`
- `plugins/rpg-vault-guardian/scripts/schema.mjs`
- `plugins/rpg-vault-guardian/scripts/validate.mjs`
- `plugins/rpg-vault-guardian/scripts/gen-mocs.mjs`
- `plugins/rpg-vault-guardian/scripts/init.mjs`
- `plugins/rpg-vault-guardian/scripts/lib/` (9 módulos)
- `plugins/rpg-vault-guardian/scripts/test/` (13 arquivos + fixtures/)
- `plugins/rpg-vault-guardian/skills/rpg-preserve/SKILL.md`
- `plugins/rpg-vault-guardian/skills/rpg-audit/SKILL.md`
- `plugins/rpg-vault-guardian/agents/rpg-guardian.md`
- `plugins/rpg-vault-guardian/commands/rpg-init.md`

- [ ] **Step 3: Verificar que não há paths absolutos nas skills/agente**

```bash
grep -r "/Users/vags" ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/skills/ \
                      ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/agents/
```

Saída esperada: nenhum resultado. Se encontrar algum, substitua pelo padrão `${CLAUDE_PLUGIN_ROOT}/scripts/...`.

- [ ] **Step 4: Verificar que o marketplace.json e plugin.json são JSON válidos**

```bash
python3 -m json.tool ~/projects/rpg-marketplace/.claude-plugin/marketplace.json > /dev/null \
  && echo "marketplace.json: válido"
python3 -m json.tool ~/projects/rpg-marketplace/plugins/rpg-vault-guardian/.claude-plugin/plugin.json > /dev/null \
  && echo "plugin.json: válido"
```

Saída esperada:
```
marketplace.json: válido
plugin.json: válido
```

- [ ] **Step 5: Commit final**

```bash
cd ~/projects/rpg-marketplace
git add -A
git status  # confirmar que não há nada inesperado
git commit -m "chore: verify plugin structure complete — 50/50 tests passing"
```

---

## Resumo das tarefas

| Task | Entregável | Testes |
|---|---|---|
| 1 | Scaffolding + manifestos JSON | — |
| 2 | Scripts copiados | 47/47 ✓ |
| 3 | init.mjs (TDD) | 50/50 ✓ |
| 4 | Skills adaptadas (CLAUDE_PLUGIN_ROOT) | — |
| 5 | Agente + command | — |
| 6 | Verificação final | 50/50 ✓ |
