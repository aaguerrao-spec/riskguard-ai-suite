# Despliegue en Vercel — RiskGuard AI Suite

Este proyecto es **Next.js 15** con assets estaticos en `public/` (incluye `dashboard.html` legacy y motores JS). Vercel es el entorno recomendado; GitHub Pages queda como fallback via `npm run deploy:pages`.

## Que funciona mejor en Vercel

| Funcionalidad | GitHub Pages | Vercel |
|---------------|--------------|--------|
| Rutas limpias (`/general`, `/admin`) | Requiere `.html` y parches | Nativo |
| API serverless (`/api/publish-menu`) | No | Si |
| Publicar menu sin PAT en el navegador | No (token en cliente) | Si (`GITHUB_TOKEN`) |
| Redeploy automatico al publicar menu | Manual | Si (webhook GitHub) |
| CDN global y headers | Limitado | Si |
| Dashboard legacy (`/dashboard.html`) | Si | Si (desde `public/`) |
| Motores JS (proceso, procedimiento, VSM) | Si | Si |
| PDF.js en cliente | Si | Si |

## URL final esperada

Tras conectar el repo:

**https://riskguard-ai-suite.vercel.app**

(o el dominio que asigne Vercel a tu proyecto, p. ej. `riskguard-ai-suite-<team>.vercel.app`)

Rutas principales:

- `/` → redirige a `/general`
- `/general` — dashboard Next.js
- `/admin` — panel de administracion
- `/riskguard` — modulo RiskGuard
- `/dashboard.html` — dashboard legacy completo (diagramador, VSM, procedimientos)

---

## Paso a paso: desplegar en Vercel

### 1. Subir el codigo a GitHub

Asegurate de que el repo **`aaguerrao-spec/riskguard-ai-suite`** tenga la rama `main` actualizada.

### 2. Crear proyecto en Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesion.
2. **Add New → Project**.
3. Importa el repo `riskguard-ai-suite`.
4. Vercel detecta **Next.js** automaticamente.

### 3. Configuracion de build (por defecto)

| Campo | Valor |
|-------|--------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | *(dejar vacio — Vercel gestiona `.next`)* |
| Install Command | `npm install` |

No uses `STATIC_EXPORT=true` en Vercel.

### 4. Variables de entorno

En **Project → Settings → Environment Variables**:

| Variable | Valor | Entorno |
|----------|--------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://riskguard-ai-suite.vercel.app` | Production |
| `GITHUB_TOKEN` | Token fine-grained o classic con scope `repo` | Production |
| `GITHUB_REPO` | `aaguerrao-spec/riskguard-ai-suite` | Production |
| `GITHUB_BRANCH` | `main` | Production |

`GITHUB_TOKEN` permite que `/admin` publique el menu via `/api/publish-menu` sin exponer el token al navegador.

### 5. Deploy

Pulsa **Deploy**. En 1–2 minutos tendras la URL `*.vercel.app`.

### 6. Verificar

- [ ] `https://<tu-proyecto>.vercel.app/general`
- [ ] `https://<tu-proyecto>.vercel.app/dashboard.html`
- [ ] Subir TXT/PDF en Diagramador → generar diagrama
- [ ] Generar procedimiento y VSM en el dashboard legacy
- [ ] `/admin` → publicar menu (con `GITHUB_TOKEN` configurado)

### 7. Dominio personalizado (opcional)

**Settings → Domains** → anade tu dominio y sigue las instrucciones DNS.

Actualiza `NEXT_PUBLIC_SITE_URL` al dominio final.

---

## GitHub Pages (legacy)

Si aun necesitas GitHub Pages:

```bash
npm run deploy:pages
```

Eso ejecuta build estatico (`STATIC_EXPORT=true`), excluye temporalmente las API routes y publica en `aaguerrao-spec.github.io`.

---

## Solucion de problemas

**Build falla en Vercel**
- No definas `STATIC_EXPORT` en Vercel.
- Revisa que Node.js sea 20.x (Settings → General).

**`/api/publish-menu` devuelve 501**
- Falta `GITHUB_TOKEN` en variables de entorno.

**Enlaces `.html` antiguos**
- Redirecciones automaticas: `/general.html` → `/general`, etc. (ver `next.config.ts`).

**Menu no se actualiza tras publicar**
- Vercel redeploya si el commit es en el repo conectado; espera ~1 min o redeploy manual.
