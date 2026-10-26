import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const ROOT = process.cwd();
const AI_CONTEXT = join(ROOT, '.ai-context');
const CONTRACT_EXTS = ['.ts', '.tsx', '.graphql', '.prisma', '.json'];

function sh(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe', ...opts }).trim();
}

function gitDiffFiles() {
  const staged = sh('git diff --cached --name-only --diff-filter=ACM');
  const unstaged = sh('git diff --name-only --diff-filter=ACM');
  const all = new Set([...staged.split('\n').filter(Boolean), ...unstaged.split('\n').filter(Boolean)]);
  return [...all];
}

function isContractFile(file) {
  const ext = extname(file);
  const base = basename(file);
  if (CONTRACT_EXTS.includes(ext)) return true;
  if (base === 'project.json') return true;
  if (base === 'nx.json' || base === 'tsconfig.base.json') return true;
  if (ext === '.gql' || ext === '.graphql') return true;
  return false;
}

function hasContractChanges(files) {
  return files.some(
    (f) =>
      f.startsWith('apps/') ||
      f.startsWith('libs/') ||
      f === 'repomix.config.json' ||
      f === '.dependency-cruiser.js' ||
      f === 'nx.json' ||
      f === 'tsconfig.base.json' ||
      isContractFile(f)
  );
}

function runCmd(cmd) {
  try {
    sh(cmd);
    return { ok: true, out: '' };
  } catch (e) {
    return { ok: false, out: e.stdout || e.stderr || String(e) };
  }
}

function main() {
  const changed = gitDiffFiles();

  if (changed.length === 0 || !hasContractChanges(changed)) {
    process.stdout.write('[ai:sync] No contract-relevant files changed. Skipping regeneration.\n');
    process.exit(0);
  }

  process.stdout.write(`[ai:sync] ${changed.length} changed file(s). Regenerating AI context...\n`);

  mkdirSync(AI_CONTEXT, { recursive: true });

  const repomix = runCmd(`npx repomix --config repomix.config.json --output .ai-context/repo-skeleton.xml`);
  if (!repomix.ok) {
    process.stderr.write(`[ai:sync] repomix failed:\n${repomix.out}\n`);
    process.exit(1);
  }

  const depcruise = runCmd(
    `npx depcruise -I "\\.(tsx?)$" --output-type mermaid --output-to .ai-context/dependency-graph.md apps/kickzone-api/src libs/server libs/shared libs/client`
  );
  if (!depcruise.ok) {
    process.stderr.write(`[ai:sync] depcruise failed:\n${depcruise.out}\n`);
    process.exit(1);
  }

  const nxGraph = runCmd(`npx nx graph --file=.ai-context/nx-project-graph.json`);
  if (!nxGraph.ok) {
    process.stderr.write(`[ai:sync] nx graph best-effort failed (non-fatal):\n${nxGraph.out}\n`);
  }

  const stage = runCmd('git add .ai-context/');
  if (!stage.ok) {
    process.stderr.write(`[ai:sync] git add failed:\n${stage.out}\n`);
    process.exit(1);
  }

  process.stdout.write('[ai:sync] AI context regenerated and staged.\n');
}

main();
