// node render.mjs <out.mp4> [scale] [frameAwal-frameAkhir] : render video bisu (H.264 CRF 16) komposisi Perkenalan.
// Audio dicampur terpisah (alat/mix.py) lalu di-mux dengan ffmpeg.
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const [out, scale = '1', range] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const composition = await selectComposition({serveUrl, id: 'Perkenalan'});
const frameRange = range ? range.split('-').map(Number) : null;
let last = -1;
const t0 = Date.now();
await renderMedia({
  serveUrl, composition, outputLocation: out, codec: 'h264', crf: 16, pixelFormat: 'yuv420p', muted: true,
  imageFormat: 'jpeg', jpegQuality: 92, scale: Number(scale), concurrency: Number(process.env.CONC ?? 2),
  timeoutInMilliseconds: 180000, chromiumOptions: {gl: 'swangle'}, frameRange,
  onProgress: ({renderedFrames, progress}) => {
    const p = Math.floor(progress * 100);
    if (p !== last && p % 5 === 0) { last = p; console.log(`${p}% frame ${renderedFrames} ${Math.round((Date.now() - t0) / 1000)} dtk`); }
  },
});
console.log('selesai', out, Math.round((Date.now() - t0) / 1000), 'dtk');
