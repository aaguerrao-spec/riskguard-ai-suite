import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = path.join(ROOT, "public", "dashboard.html");

const REPLACEMENTS = [
  ["├Ü", "Ú"],
  ["├¡", "í"],
  ["├í", "á"],
  ["├®", "é"],
  ["├│", "ó"],
  ["├ú", "ú"],
  ["├▒", "ñ"],
  ["├º", "ú"],
  ["├║", "ú"],
  ["ÔÇÖ", "'"],
  ["ÔÇ£", '"'],
  ["ÔÇØ", '"'],
  ["ÔÇö", "—"],
];

let content = fs.readFileSync(TARGET, "utf8");
let total = 0;
for (const [from, to] of REPLACEMENTS) {
  const parts = content.split(from);
  if (parts.length > 1) {
    total += parts.length - 1;
    content = parts.join(to);
  }
}
fs.writeFileSync(TARGET, content, "utf8");
console.log(`Fixed ${total} encoding sequences in dashboard.html`);
