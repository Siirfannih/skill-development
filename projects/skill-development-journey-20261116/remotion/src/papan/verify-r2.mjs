import ts from 'typescript';
import {createHash} from 'node:crypto';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const project = path.resolve(process.cwd(), '..');
const out = path.join(project, 'handoff/henti1');
const hash = value => createHash('sha256').update(value).digest('hex');
const before = JSON.parse(await readFile(path.join(out, 'baseline-r2.json'), 'utf8'));
const protectedFiles = Object.entries(before).filter(([file]) => !file.endsWith('Papan.tsx'));
for (const [file, expected] of protectedFiles) {
  assert.equal(hash(await readFile(path.join(project, file))), expected, `Protected file changed: ${file}`);
}

const definitions = source => {
  const ast = ts.createSourceFile('Papan.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return new Map(ast.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations.map(d => [d.name.getText(ast), d.getText(ast)])));
};
const original = definitions(await readFile(path.join(out, 'Papan-r1.tsx'), 'utf8'));
const current = definitions(await readFile(path.join(project, 'remotion/src/papan/Papan.tsx'), 'utf8'));
const allowed = new Set(['PANELS', 'B3C', 'AgentWindow', 'B5', 'SCENES']);
const unchanged = [];
for (const [name, definition] of original) {
  if (allowed.has(name)) continue;
  assert.equal(current.get(name), definition, `Protected definition changed: ${name}`);
  unchanged.push(name);
}

const source = await readFile(path.join(project, 'remotion/public/papan/B4-effort-footage.jpg'));
const avatars = {};
for (const name of ['chatgpt-codex-ikon-asli.png', 'maskot-acuan-pixel-crab.png']) {
  const reference = hash(await readFile(path.join(project, 'sumber/ref', name)));
  const asset = hash(await readFile(path.join(project, 'remotion/public/papan', name)));
  assert.equal(asset, reference, `Avatar differs from supplied original: ${name}`);
  avatars[name] = asset;
}

const luminance = hex => {
  const rgb = hex.match(/[a-f0-9]{2}/gi).map(c => parseInt(c, 16) / 255);
  const linear = rgb.map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
};
const textPairs = [['FFFFFF', '2E5BFF'], ['202D4D', 'FFE0D6'], ['202D4D', 'FFFFFF'],
  ['536581', 'DFEDFF'], ['354665', 'FFFFFF'], ['ADA8B3', '222124'], ['BAB3C4', '222124']];
const contrast = textPairs.map(([fg, bg]) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  const ratio = (hi + .05) / (lo + .05);
  assert(ratio >= 4.5, `Contrast below 4.5: ${fg}/${bg}`);
  return {fg, bg, ratio: +ratio.toFixed(2)};
});
const result = {
  approved_jpeg_hashes: 'PASS: B1b, B2, B3-A, B4, B6 unchanged',
  protected_definitions: unchanged, kit_hash_unchanged: true, avatar_sha256: avatars,
  effort_source: {seconds: 109.0, extraction: 'ffmpeg -ss 109.0, scale=1920:1080, JPEG q2', sha256: hash(source)},
  contrast,
  scope: 'R2 panels only; no MP4; no commit/push; no G2 verdict from builder',
};
await writeFile(path.join(out, 'checks-source-r2.json'), JSON.stringify(result, null, 2));
console.log(`PASS: 5 approved JPEGs + kit unchanged; ${unchanged.length} protected definitions exact; avatars exact source bytes; ${contrast.length} contrast pairs ≥4.5.`);
