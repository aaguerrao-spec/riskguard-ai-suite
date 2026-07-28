import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INBOX = path.join(ROOT, "uploads");
const MENU_SRC = path.join(INBOX, "menu.json");
const PUBLIC_MENU = path.join(ROOT, "public", "data", "menu.json");
const PUBLIC_TOOLS = path.join(ROOT, "public", "tools");

if (!existsSync(MENU_SRC)) {
  console.error("Coloca menu.json en uploads/ junto con tus archivos .html");
  process.exit(1);
}

mkdirSync(path.join(ROOT, "public", "data"), { recursive: true });
mkdirSync(PUBLIC_TOOLS, { recursive: true });

cpSync(MENU_SRC, PUBLIC_MENU);
console.log("Actualizado public/data/menu.json");

for (const file of readdirSync(INBOX)) {
  if (!file.toLowerCase().endsWith(".html")) continue;
  cpSync(path.join(INBOX, file), path.join(PUBLIC_TOOLS, file));
  console.log(`Copiado uploads/${file} -> public/tools/${file}`);
}

console.log("\nListo. Ejecuta: npm run deploy");
