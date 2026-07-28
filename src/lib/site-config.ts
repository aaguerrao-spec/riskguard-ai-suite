/**
 * Configuracion centralizada de variables de entorno para Vercel.
 *
 * Variables requeridas en Vercel (Project → Settings → Environment Variables):
 *
 * | Variable               | Donde se usa                                      | Requerida |
 * |------------------------|---------------------------------------------------|-----------|
 * | NEXT_PUBLIC_SITE_URL   | Admin UI, enlaces publicos (cliente + build)        | Si        |
 * | GITHUB_TOKEN           | /api/publish-menu (solo servidor, publish-server)   | Si*       |
 * | GITHUB_REPO            | publish-server.ts — repo destino del menu         | Si        |
 * | GITHUB_BRANCH          | publish-server.ts — rama destino (default: main)    | Si        |
 *
 * * GITHUB_TOKEN: obligatoria para publicar desde /admin via API.
 *   Sin ella, /admin puede usar token manual en el navegador (fallback).
 *
 * NO configurar STATIC_EXPORT en Vercel (solo para npm run deploy:pages).
 */

/** URL publica del sitio desplegado. Usada en /admin y metadatos. */
export function getPublicSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

/** Repo GitHub donde se publica public/data/menu.json (formato: owner/repo). */
export function getGitHubRepo(): string {
  return process.env.GITHUB_REPO || "aaguerrao-spec/riskguard-ai-suite";
}

/** Rama GitHub para commits del menu (default: main). */
export function getGitHubBranch(): string {
  return process.env.GITHUB_BRANCH || "main";
}

/** Token GitHub — solo disponible en servidor (API routes). Nunca usar en cliente. */
export function getGitHubToken(): string | undefined {
  return process.env.GITHUB_TOKEN;
}
