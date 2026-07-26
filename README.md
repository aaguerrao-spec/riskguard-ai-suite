# RiskGuard AI Suite

Dashboard SaaS dark enterprise — vista **General** (hub de herramientas).

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- lucide-react
- utilidades estilo shadcn (`cn`, CVA, Radix Slot)

## Arranque

```bash
cd C:\Users\aague\Projects\riskguard-ai-suite
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige a `/general`.

## Estructura

```
src/
  app/
    (dashboard)/general/page.tsx
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/
      app-sidebar.tsx
      app-topbar.tsx
      breadcrumb-header.tsx
      dashboard-shell.tsx
    dashboard/
      tool-card.tsx
  lib/
    mock/tools.ts
    utils.ts
```
