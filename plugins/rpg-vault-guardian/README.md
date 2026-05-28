# rpg-vault-guardian

Plugin Claude Code para garantir a integridade estrutural de vaults Obsidian usados em campanhas de RPG.

## O que faz

- **/rpg-init** — Scaffolda a estrutura de pastas inicial (14 pastas derivadas do schema)
- **rpg-preserve** — Write gate: valida toda entidade em memória antes de gravar
- **rpg-audit** — Auditoria em 7 passos: validação, auto-fix, saúde LLM, MOCs
- **rpg-guardian** — Agente de auditoria em contexto isolado

## Uso

Lance o Claude Code a partir da raiz do vault de campanha (pasta com `regioes/`, `npcs/`, etc.):

    cd ~/Documents/obsidian/main
    claude

## Testes

    cd plugins/rpg-vault-guardian && npm test
