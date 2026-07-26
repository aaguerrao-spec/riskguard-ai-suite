import { execSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "out");
const DEPLOY_DIR = path.join(ROOT, ".gh-pages");
const API_DIR = path.join(ROOT, "src/app/api");
const API_BACKUP = path.join(ROOT, ".api-backup-build");
const REMOTE_URL = "https://github.com/aaguerrao-spec/aaguerrao-spec.github.io.git";
const BRANCH = "main";

function run(command, options = {}) {
  execSync(command, {
    cwd: options.cwd ?? ROOT,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...(options.env ?? {}), STATIC_EXPORT: "true" },
  });
}

function runCapture(command, cwd) {
  return execSync(command, { cwd, encoding: "utf8", shell: true }).trim();
}

function hideApiRoutesForStaticBuild() {
  if (!existsSync(API_DIR)) return;
  if (existsSync(API_BACKUP)) rmSync(API_BACKUP, { recursive: true, force: true });
  renameSync(API_DIR, API_BACKUP);
  console.log("API routes temporarily excluded for static export.");
}

function restoreApiRoutesAfterStaticBuild() {
  if (!existsSync(API_BACKUP)) return;
  if (existsSync(API_DIR)) rmSync(API_DIR, { recursive: true, force: true });
  renameSync(API_BACKUP, API_DIR);
  console.log("API routes restored.");
}

function prepareDeployRepo() {
  if (!existsSync(DEPLOY_DIR)) {
    console.log("Cloning GitHub Pages repo into .gh-pages/...");
    run(`git clone --branch ${BRANCH} ${REMOTE_URL} "${DEPLOY_DIR}"`);
    return;
  }

  if (!existsSync(path.join(DEPLOY_DIR, ".git"))) {
    rmSync(DEPLOY_DIR, { recursive: true, force: true });
    prepareDeployRepo();
    return;
  }

  console.log("Updating .gh-pages/ from remote...");
  run("git fetch origin", { cwd: DEPLOY_DIR });
  run(`git checkout ${BRANCH}`, { cwd: DEPLOY_DIR });
  run(`git pull origin ${BRANCH}`, { cwd: DEPLOY_DIR });
}

function syncBuildToDeployDir() {
  for (const entry of readdirSync(DEPLOY_DIR)) {
    if (entry === ".git") continue;
    rmSync(path.join(DEPLOY_DIR, entry), { recursive: true, force: true });
  }

  cpSync(OUT_DIR, DEPLOY_DIR, { recursive: true, force: true });
  writeFileSync(path.join(DEPLOY_DIR, ".nojekyll"), "");
}

console.log("Building static export for GitHub Pages...");
hideApiRoutesForStaticBuild();

try {
  run("npm run build");
} finally {
  restoreApiRoutesAfterStaticBuild();
}

if (!existsSync(OUT_DIR)) {
  throw new Error("Build failed: out/ directory was not created.");
}

writeFileSync(path.join(OUT_DIR, ".nojekyll"), "");
console.log("Created out/.nojekyll");

run("node scripts/patch-github-pages.mjs");

prepareDeployRepo();
syncBuildToDeployDir();

run("git add .", { cwd: DEPLOY_DIR });

const status = runCapture("git status --porcelain", DEPLOY_DIR);
if (!status) {
  console.log("No changes to deploy.");
  process.exit(0);
}

const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
run(`git commit -m "deploy: GitHub Pages sync ${timestamp}"`, {
  cwd: DEPLOY_DIR,
});

console.log("Pushing to GitHub Pages...");
run(`git push origin ${BRANCH}`, { cwd: DEPLOY_DIR });

console.log("\nDeploy complete: https://aaguerrao-spec.github.io/");
