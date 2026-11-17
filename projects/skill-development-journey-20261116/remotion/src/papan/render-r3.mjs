import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill} from '@remotion/renderer';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';

const project = process.cwd();
const out = path.resolve(project, '../handoff/henti1');
const serveUrl = await bundle({entryPoint: path.join(project, 'src/uji/papan-entry.tsx'), outDir: path.join(out, '.bundle-r3')});
const browser = await openBrowser('chrome', {chromiumOptions: {gl: 'swangle'}});
const targets = [{id: 'B1b', frame: 84}, {id: 'B5', frame: 120}, {id: 'B5', frame: 83, suffix: '-typing'}];
try {
  const compositions = await getCompositions(serveUrl, {puppeteerInstance: browser});
  for (const target of targets) {
    const composition = compositions.find(c => c.id === `Papan-${target.id}`);
    if (!composition) throw new Error(`Missing composition: ${target.id}`);
    await renderStill({serveUrl, composition, output: path.join(out, `papan-${target.id}${target.suffix ?? ''}.jpg`),
      frame: target.frame, scale: .5, imageFormat: 'jpeg', jpegQuality: 95, puppeteerInstance: browser,
      chromiumOptions: {gl: 'swangle'}, timeoutInMilliseconds: 180000});
    console.log(`${target.id}${target.suffix ?? ''}: f${target.frame}, 960×540`);
  }
  await writeFile(path.join(out, 'render-manifest-r3.json'), JSON.stringify(targets, null, 2));
} finally {
  await browser.close({silent: true});
}
