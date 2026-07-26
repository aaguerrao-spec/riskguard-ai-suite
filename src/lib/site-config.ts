/**
 * URL pública del sitio (Vercel o GitHub Pages).
 * Configura NEXT_PUBLIC_SITE_URL en Vercel, ej. https://riskguard-ai-suite.vercel.app
 */
export function getPublicSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export function getGitHubRepo(): string {
  return process.env.GITHUB_REPO || "aaguerrao-spec/riskguard-ai-suite";
}

export function getGitHubBranch(): string {
  return process.env.GITHUB_BRANCH || "main";
}
