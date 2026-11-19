// node stills.mjs <outdir> <scale> f1 f2 ... : bundle sekali, render banyak still (jpeg).
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const [out, scale, ...frames] = process.argv.slice(2);
fs.mkdirSync(out, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const composition = await selectComposition({serveUrl, id: process.env.COMP ?? 'Perkenalan'});
for (const f of frames) {
  const t = Date.now();
  await renderStill({serveUrl, composition, frame: Number(f), output: `${out}/f${String(f).padStart(4, '0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 88,
    scale: Number(scale), timeoutInMilliseconds: 180000, chromiumOptions: {gl: 'swangle'}});
  console.log('still', f, `${Date.now() - t} ms`);
}
