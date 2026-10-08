#!/bin/bash
# Instala dependências em sessões na nuvem, sem gerar saída no contexto.
[ "$CLAUDE_CODE_REMOTE" = "true" ] || exit 0
cd "$CLAUDE_PROJECT_DIR" && pnpm install --frozen-lockfile --silent >/dev/null 2>&1
exit 0
