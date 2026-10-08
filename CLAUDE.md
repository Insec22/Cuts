# Classic Cuts

Site institucional de barbearia (pt-BR). Next.js 14 (App Router) + React 18 + Tailwind v4 + shadcn/ui. Gerenciador: pnpm.

## Estrutura
- `app/` — `layout.tsx`, `page.tsx` (monta as seções), `globals.css` (único CSS)
- `components/` — seções: `header`, `hero-section`, `services-section`, `gallery-section`, `contact-section`, `booking-flow` (modal de agendamento)
- `components/ui/` — shadcn: button, calendar, card, dialog, input, label, textarea
- `lib/utils.ts` — `cn()`
- `public/` — imagens usadas pela galeria e pelo hero

## Comandos
- `pnpm dev` / `pnpm build` / `npx tsc --noEmit`
- `next.config.mjs` ignora erros de lint e TS no build: rode `tsc` para validar.

## Regras para economizar contexto
- Não leia `pnpm-lock.yaml` nem imagens de `public/`; use esta estrutura em vez de explorar o repo.
- Leia só os arquivos que a tarefa toca. Prefira `grep` a abrir arquivos inteiros.
- Respostas curtas e diretas, em português.
- Ao adicionar componentes shadcn, instale apenas as dependências necessárias.
