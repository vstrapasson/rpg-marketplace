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
