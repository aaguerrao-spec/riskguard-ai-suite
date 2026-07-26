import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

const INDEX_FALLBACK = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="refresh" content="0; url=./general.html" />
  <title>RiskGuard AI Suite</title>
  <link rel="icon" href="./favicon.ico" />
  <script>location.replace("./general.html");</script>
</head>
<body>
  <p>Redirigiendo al dashboard... <a href="./general.html">Continuar</a></p>
</body>
</html>
`;

const NOT_FOUND_FALLBACK = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RiskGuard AI Suite</title>
  <script>
    (function () {
      var path = window.location.pathname || "/";
      var search = window.location.search || "";
      var hash = window.location.hash || "";
      if (path !== "/" && !path.endsWith(".html") && path.indexOf("/_next/") !== 0) {
        window.location.replace(path + ".html" + search + hash);
        return;
      }
      window.location.replace("./general.html" + search + hash);
    })();
  </script>
</head>
<body>
  <p>Página no encontrada. <a href="./general.html">Ir al dashboard</a></p>
</body>
</html>
`;

if (!existsSync(OUT_DIR)) {
  console.error("patch-github-pages: out/ no existe. Ejecuta npm run build primero.");
  process.exit(1);
}

writeFileSync(path.join(OUT_DIR, "index.html"), INDEX_FALLBACK, "utf8");
writeFileSync(path.join(OUT_DIR, "404.html"), NOT_FOUND_FALLBACK, "utf8");
writeFileSync(path.join(OUT_DIR, ".nojekyll"), "", "utf8");

console.log("Patched index.html, 404.html and .nojekyll for GitHub Pages.");
