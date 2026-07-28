# RiskGuard AI Suite

Dashboard SaaS dark enterprise — hub de herramientas de procesos, riesgo y documentación.

## Stack

- Next.js 15 (App Router)
- TypeScript + Tailwind CSS
- Dashboard legacy HTML en `public/dashboard.html` (diagramador, VSM, procedimientos)

## Arranque local

```bash
npm install
cp .env.example .env.local   # editar variables
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) → redirige a `/general`.

## Despliegue en Vercel

Ver guía completa: **[DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)**

### Variables de entorno en Vercel

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Pública | URL del sitio, ej. `https://riskguard-ai-suite.vercel.app` |
| `GITHUB_TOKEN` | Secreta | Token GitHub (scope `repo`) para `/api/publish-menu` |
| `GITHUB_REPO` | Secreta | Repo destino, ej. `aaguerrao-spec/riskguard-ai-suite` |
| `GITHUB_BRANCH` | Secreta | Rama, ej. `main` |

**No configurar `STATIC_EXPORT` en Vercel** (solo para GitHub Pages legacy).

### URLs tras deploy

- `/general` — menú de herramientas Next.js
- `/admin` — administración del menú
- `/dashboard.html` — dashboard legacy interactivo

## Probar funcionalidades

| Sección | URL | Qué probar |
|---------|-----|------------|
| Leads | `/dashboard.html` → LinkedIn360 | Agregar prospecto, ver tabla |
| Procedimientos | `/dashboard.html` → Generador | Completar formulario → Generar |
| VSM | `/dashboard.html` → Mapeo de Flujo | Agregar etapas → Generar VSM |
| Diagramador | `/dashboard.html` → Diagramador | Subir `.txt` → Generar diagrama |

## Scripts

```bash
npm run dev          # desarrollo
npm run build        # build producción (Vercel)
npm run build:vercel # build sin turbopack (fallback)
npm run deploy:pages # GitHub Pages legacy
```
