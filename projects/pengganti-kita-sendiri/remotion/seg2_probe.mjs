// SEGMEN 2 · pra-render: still kecil per N frame + log OBJ (kotak teks/objek dari DOM Remotion) + log SFXEV.
// node seg2_probe.mjs <outDir> [fromSec] [toSec] [everyN=8] [scale=0.25]
// Hasil: <outDir>/f<frame>.jpg, <outDir>/obj.log, <outDir>/sfx.log → dibaca tools/seg2_layout_check.py
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind-v4";
import fs from "node:fs";
import path from "node:path";

const [outDir, a = "0", b = "999", n = "8", sc = "0.25"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), webpackOverride: enableTailwind, publicDir: path.resolve("public") });
const inputProps = { layoutlog: true, sfxlog: true };
const browser = await openBrowser("chrome");
const comp = await selectComposition({ serveUrl, id: "PenggantiKitaSendiri", inputProps, puppeteerInstance: browser });
const f0 = Math.max(0, Math.round(+a * 30)), f1 = Math.min(comp.durationInFrames - 1, Math.round(+b * 30));
const frames = [];
for (let f = f0; f <= f1; f += +n) frames.push(f);
const obj = fs.createWriteStream(path.join(outDir, "obj.log"));
const sfx = fs.createWriteStream(path.join(outDir, "sfx.log"));
let done = 0;
const worker = async () => {
  while (frames.length) {
    const frame = frames.shift();
    await renderStill({
      serveUrl, composition: comp, frame, inputProps, puppeteerInstance: browser, scale: +sc, imageFormat: "jpeg", jpegQuality: 88,
      output: path.join(outDir, `f${String(frame).padStart(5, "0")}.jpg`), timeoutInMilliseconds: 120000,
      onBrowserLog: (l) => {
        const t = l.text;
        if (t.startsWith("OBJ ")) obj.write(t + "\n");
        else if (t.startsWith("SFXEV ")) sfx.write(t + "\n");
      },
    });
    if (++done % 25 === 0) console.log(`seg2 ${done} still`);
  }
};
await Promise.all([worker(), worker(), worker()]);
obj.end(); sfx.end();
await browser.close({ silent: true });
console.log("SEG2_DONE", done);
