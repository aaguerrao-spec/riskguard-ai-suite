import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const refs = new Set();
const missing = [];

function walk(file) {
  const content = readFileSync(file, "utf8");
  const patterns = [
    /(?:src|href)=["']([^"']+)["']/g,
    /fetch\(\s*["'`]([^"'`]+)["'`]/g,
    /siteUrl\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content))) {
      refs.add(match[1]);
    }
  }
}

function existsRef(ref) {
  if (!ref || ref.startsWith("http") || ref.startsWith("#") || ref.startsWith("data:")) return true;
  if (ref.startsWith("/_next/")) {
    const local = path.join(OUT, ref.replace(/^\//, "").split("?")[0]);
    return existsSync(local);
  }
  const clean = ref.replace(/^\.\//, "/").split("?")[0];
  const local = path.join(OUT, clean.replace(/^\//, ""));
  return existsSync(local);
}

function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (/\.(html|js|css|json)$/i.test(entry.name)) walk(full);
  }
}

scan(OUT);

for (const ref of refs) {
  if (!existsRef(ref)) missing.push(ref);
}

console.log(`Referencias analizadas: ${refs.size}`);
console.log(`Referencias rotas: ${missing.length}`);
missing.forEach((item) => console.log(`  - ${item}`));
process.exit(missing.length ? 1 : 0);
