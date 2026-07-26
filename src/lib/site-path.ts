/**
 * Resuelve rutas relativas al origen del sitio en GitHub Pages (usuario.github.io).
 */
export function sitePath(relativePath: string): string {
  const clean = relativePath.replace(/^\//, "");
  if (typeof window === "undefined") {
    return `/${clean}`;
  }
  return new URL(clean, `${window.location.origin}/`).pathname;
}

export function siteUrl(relativePath: string): string {
  const clean = relativePath.replace(/^\//, "");
  if (typeof window === "undefined") {
    return `/${clean}`;
  }
  return new URL(clean, `${window.location.origin}/`).href;
}
