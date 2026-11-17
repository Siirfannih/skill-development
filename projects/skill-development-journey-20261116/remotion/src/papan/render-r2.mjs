import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill} from '@remotion/renderer';
import path from 'node:path';
import {readFile, writeFile} from 'node:fs/promises';

const project = process.cwd();
const out = path.resolve(project, '../handoff/henti1');
const url = await bundle({entryPoint: path.join(project, 'src/uji/papan-entry.tsx'), outDir: path.join(out, '.bundle-r2')});
const browser = await openBrowser('chrome', {chromiumOptions: {gl: 'swangle'}});
const targets = [
  {id: 'B5', frame: 120},
  {id: 'B3-C', frame: 84},
  {id: 'B4-effort', frame: 96},
  {id: 'B5', frame: 83, suffix: '-typing'},
];
const selected = process.argv.slice(2);
if (selected.some(id => !targets.some(t => t.id === id))) throw new Error('Unknown R2 panel');
try {
  const compositions = await getCompositions(url, {puppeteerInstance: browser});
  const records = selected.length
    ? JSON.parse(await readFile(path.join(out, 'render-manifest-r2.json'), 'utf8')).filter(t => !selected.includes(t.id))
    : [];
  for (const target of targets.filter(t => !selected.length || selected.includes(t.id))) {
    const composition = compositions.find(c => c.id === `Papan-${target.id}`);
    if (!composition) throw new Error(`Missing composition: ${target.id}`);
    const output = path.join(out, `papan-${target.id}${target.suffix ?? ''}.jpg`);
    await renderStill({serveUrl: url, composition, output, frame: target.frame, scale: .5,
      imageFormat: 'jpeg', jpegQuality: 95, puppeteerInstance: browser,
      chromiumOptions: {gl: 'swangle'}, timeoutInMilliseconds: 180000});
    records.push({...target, output, width: 960, height: 540});
    console.log(`${target.id}${target.suffix ?? ''}: f${target.frame}, 960×540`);
  }
  await writeFile(path.join(out, 'render-manifest-r2.json'), JSON.stringify(records, null, 2));
} finally {
  await browser.close({silent: true});
}
