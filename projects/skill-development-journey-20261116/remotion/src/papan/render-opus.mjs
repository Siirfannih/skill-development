// Opus finishing stills: node src/papan/render-opus.mjs [panel ...]  (from remotion/)
import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill} from '@remotion/renderer';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';

const project = process.cwd();
const out = path.resolve(project, '../handoff/henti1/opus');
const all = [
  {id: 'B1b', frame: 84}, {id: 'B2', frame: 84}, {id: 'B3-A', frame: 44, suffix: '1'}, {id: 'B3-A', frame: 100, suffix: '2'},
  {id: 'B3-C', frame: 104, suffix: '1'}, {id: 'B3-C', frame: 160, suffix: '2'}, {id: 'B3-C', frame: 288, suffix: '3'},
  {id: 'B4', frame: 84}, {id: 'B5', frame: 120}, {id: 'B6', frame: 84}, {id: 'sheet', frame: 0, comp: 'Karakter2D-sheet', file: 'karakter2d-raw.jpg'},
];
const want = process.argv.slice(2);
const targets = want.length ? all.filter(t => want.includes(t.id) || want.includes(`${t.id}${t.suffix ?? ''}`)) : all;
const serveUrl = await bundle({entryPoint: path.join(project, 'src/uji/papan-entry.tsx'), outDir: path.join(out, '.bundle')});
const browser = await openBrowser('chrome', {chromiumOptions: {gl: 'swangle'}});
try {
  const compositions = await getCompositions(serveUrl, {puppeteerInstance: browser});
  for (const t of targets) {
    const composition = compositions.find(c => c.id === (t.comp ?? `Papan-${t.id}`));
    if (!composition) throw new Error(`Missing composition: ${t.id}`);
    const file = t.file ?? `papan-${t.id}${t.suffix ?? ''}.jpg`;
    await renderStill({serveUrl, composition, output: path.join(out, file), frame: t.frame, scale: t.comp ? 1 : .5,
      imageFormat: 'jpeg', jpegQuality: 95, puppeteerInstance: browser, chromiumOptions: {gl: 'swangle'}, timeoutInMilliseconds: 180000});
    console.log(`${file}: f${t.frame}`);
  }
  if (!want.length) await writeFile(path.join(out, 'render-manifest.json'), JSON.stringify(targets, null, 2));
} finally {
  await browser.close({silent: true});
}
