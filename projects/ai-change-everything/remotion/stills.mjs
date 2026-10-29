// node stills.mjs out_dir scale f1 f2 ...   (bundle sekali, render banyak still)
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const [,, out, scale, ...frames] = process.argv;
const BE = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const serveUrl = await bundle({entryPoint: path.resolve('src/Root.tsx')});
const comp = await selectComposition({serveUrl, id: 'Main', browserExecutable: BE, inputProps: {withVo: false}});
for (const f of frames) {
  await renderStill({serveUrl, composition: comp, frame: Number(f), output: `${out}/f${String(f).padStart(4,'0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 85, scale: Number(scale), browserExecutable: BE, inputProps: {withVo: false}});
  process.stdout.write(f + ' ');
}
console.log('done');
