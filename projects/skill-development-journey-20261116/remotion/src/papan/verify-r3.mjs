import ts from 'typescript';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const project = path.resolve(process.cwd(), '..');
const out = path.join(project, 'handoff/henti1');
const hash = file => createHash('sha256').update(readFileSync(path.join(project, file))).digest('hex');
const baseline = JSON.parse(readFileSync(path.join(out, 'baseline-r3.json'), 'utf8'));
const changed = new Set(['remotion/src/papan/Papan.tsx', 'remotion/src/papan/ChatScene.tsx',
  'handoff/henti1/papan-B1b.jpg', 'handoff/henti1/papan-B5.jpg', 'handoff/henti1/papan-B5-typing.jpg']);
const protectedFiles = Object.keys(baseline).filter(file => !changed.has(file));
for (const file of protectedFiles) assert.equal(hash(file), baseline[file], `Protected file changed: ${file}`);
for (const file of changed) assert.notEqual(hash(file), baseline[file], `Requested change missing: ${file}`);

const require = createRequire(import.meta.url);
const load = (file, resolve = require) => {
  const module = {exports: {}};
  const code = ts.transpileModule(readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
  new Function('require', 'exports', 'module', code)(resolve, module.exports, module);
  return module.exports;
};
const curves = load('src/lib/curves.ts');
const {poseMaskot} = load('src/komponen/maskot/motion.ts', () => curves);
const source = readFileSync('src/papan/Papan.tsx', 'utf8');
const ast = ts.createSourceFile('Papan.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let codex;
const visit = node => {
  if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === 'MaskotAI') {
    const attrs = Object.fromEntries(node.attributes.properties.filter(ts.isJsxAttribute).map(a => [a.name.getText(ast), a.initializer]));
    if (attrs.model.text === 'chatgpt') codex = attrs;
  }
  ts.forEachChild(node, visit);
};
visit(ast);
assert(codex, 'B1b must import the final MaskotAI');
const number = name => Number(codex[name].expression.getText(ast));
const frame = JSON.parse(readFileSync(path.join(out, 'render-manifest-r3.json'), 'utf8')).find(t => t.id === 'B1b').frame;
const age = frame - number('masukFrame');
const pose = poseMaskot(age, 30000 / 1001, 'chatgpt', number('tinggiPx'), codex.lihatKe.text, number('x') < 960 ? 1 : -1);
const yaw = Math.abs(pose.ry * 180 / Math.PI);
const facing = Math.cos(pose.ry) * Math.cos(pose.rx);
assert(yaw <= 25, `Codex yaw: ${yaw}`);
assert(facing >= .7, `Codex facing: ${facing}`);
assert(!source.includes('Character3D'), 'B1b still uses the old mascot');
const rasterLines = readdirSync('src/papan').filter(f => f.endsWith('.tsx')).flatMap(file =>
  readFileSync(path.join('src/papan', file), 'utf8').split('\n').map((line, i) => ({file, line: i + 1, text: line.trim()}))
    .filter(r => /\.(png|jpe?g|webp)/i.test(r.text)));
assert(rasterLines.length > 0);
for (const row of rasterLines) assert(/matte|footage/.test(row.text), `Unexpected raster: ${JSON.stringify(row)}`);
const result = {protected_files_unchanged: protectedFiles.length,
  approved_panels_unchanged: ['B2', 'B3-A', 'B3-C', 'B4', 'B4-effort', 'B6'],
  maskot_component_unchanged: true, codex_pose: {frame, age, yaw_degrees: yaw, front_facing_fraction: facing},
  runtime_raster_references: rasterLines, no_video_rendered: true,
  boundary: 'Mechanical verification only; G2 visual verdict belongs to Sutradara.'};
writeFileSync(path.join(out, 'checks-source-r3.json'), JSON.stringify(result, null, 2));
console.log(`PASS: ${protectedFiles.length} protected files unchanged; Codex yaw ${yaw.toFixed(2)}°, facing ${(facing * 100).toFixed(1)}%; runtime rasters only footage/matte.`);
