# Despliegue en Vercel — RiskGuard AI Suite

Repositorio: **aaguerrao-spec/riskguard-ai-suite**  
Framework: **Next.js 15** (App Router)  
Node.js: **20.x** (definido en `package.json` → `engines.node`)

---

## Resumen de auditoria

| Item | Estado |
|------|--------|
| Estructura Next.js (`src/app/`, `public/`) | OK |
| Scripts `dev`, `build`, `start` en package.json | OK |
| `next.config.ts` | OK — redirects + export estatico solo con `STATIC_EXPORT` |
| `vercel.json` | OK — solo headers de cache (Vercel detecta Next.js solo) |
| API serverless `/api/publish-menu` | OK |
| Build local `npm run build` | OK |
| Variables de entorno documentadas | OK — `.env.example` + `src/lib/site-config.ts` |
| `.gitignore` (.env, .next, node_modules) | OK |

### Posibles riesgos de build (documentados)

1. **`STATIC_EXPORT=true` en Vercel** — rompe API routes. No configurar en Vercel.
2. **`--turbopack` en build** — si falla en Vercel, cambiar Build Command a `npm run build:vercel`.
3. **`GITHUB_TOKEN` ausente** — el sitio despliega, pero `/admin` → publicar devuelve 501.
4. **`.gh-pages/` local** — ignorado en git; no afecta Vercel.

---

## URL esperada despues del deploy

**Produccion:** `https://riskguard-ai-suite.vercel.app`  
(o la URL que asigne Vercel al importar el proyecto)

| Ruta | Descripcion |
|------|-------------|
| `/` | Redirige a `/general` |
| `/general` | Dashboard Next.js |
| `/admin` | Panel de administracion del menu |
| `/riskguard` | Modulo RiskGuard |
| `/dashboard.html` | Dashboard legacy (diagramador, VSM, procedimientos) |
| `/api/publish-menu` | API POST — publicar menu (serverless) |

---

## Paso a paso: conectar repo a Vercel

### 1. Importar proyecto

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Conectar cuenta GitHub si no esta vinculada
3. Importar **`aaguerrao-spec/riskguard-ai-suite`**
4. Vercel detecta **Next.js** automaticamente

### 2. Configuracion de build

| Campo | Valor |
|-------|--------|
| Framework Preset | Next.js |
| Root Directory | `./` (raiz) |
| Build Command | `npm run build` |
| Output Directory | *(vacío — Vercel usa `.next` internamente)* |
| Install Command | `npm install` |
| Node.js Version | 20.x (Settings → General, si hace falta) |

### 3. Variables de entorno (obligatorias)

En **Project → Settings → Environment Variables**, agregar para **Production** (y Preview si quieres):

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | URL publica del sitio (sin `/` final). Usada en `/admin`. | `https://riskguard-ai-suite.vercel.app` |
| `GITHUB_TOKEN` | Token GitHub con scope `repo`. Solo servidor. | `ghp_xxxx...` |
| `GITHUB_REPO` | Repo donde se commitea el menu | `aaguerrao-spec/riskguard-ai-suite` |
| `GITHUB_BRANCH` | Rama destino | `main` |

Referencia en codigo: `src/lib/site-config.ts`, `src/app/api/publish-menu/route.ts`, `src/lib/github/publish-server.ts`

### 4. Deploy

Pulsar **Deploy**. El primer build tarda ~2 minutos.

### 5. Verificacion post-deploy

- [ ] `https://<proyecto>.vercel.app/general` carga el dashboard
- [ ] `https://<proyecto>.vercel.app/dashboard.html` carga el dashboard legacy
- [ ] Diagramador: subir `.txt` → Generar diagrama
- [ ] VSM: Generar VSM con tabla precargada
- [ ] Procedimientos: Generar procedimiento
- [ ] `/admin` → Publicar menu (con `GITHUB_TOKEN` configurado)

---

## Comandos de build esperados

```bash
# Desarrollo local
npm install
npm run dev

# Build identico a Vercel (produccion)
npm run build
npm run start

# Si turbopack falla en Vercel
npm run build:vercel
```

---

## Que hacer si el build falla

| Error | Solucion |
|-------|----------|
| `output: export` / API routes conflict | Eliminar `STATIC_EXPORT` de variables Vercel |
| Turbopack / build error | Cambiar Build Command a `npm run build:vercel` |
| TypeScript / ESLint error | Reproducir localmente con `npm run build` y corregir |
| Node version mismatch | Settings → General → Node.js 20.x |
| Module not found | Ejecutar `npm install` y verificar `package-lock.json` en repo |
| 501 en `/api/publish-menu` | Agregar `GITHUB_TOKEN` en Vercel y redeploy |

---

## Desarrollo local con variables

```bash
cp .env.example .env.local
# Editar .env.local con tus valores
npm run dev
```

---

## GitHub Pages (legacy, opcional)

```bash
npm run deploy:pages
```

Publica en `https://aaguerrao-spec.github.io/` usando export estatico. No usar en Vercel.

---

## Archivos de configuracion relevantes

| Archivo | Proposito |
|---------|-----------|
| `next.config.ts` | Redirects, export estatico condicional |
| `vercel.json` | Headers cache para `/data/` y `/js/` |
| `.env.example` | Plantilla de variables |
| `package.json` | Scripts y `engines.node` |
| `DEPLOY-VERCEL.md` | Esta guia |
