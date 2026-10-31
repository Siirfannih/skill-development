import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
const secs = process.argv.slice(2).map(Number);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id: "Jadisatu2Muted", onBrowserLog: (l) => console.log("BROWSER", l.type, l.text), timeoutInMilliseconds: 120000 });
for (const s of secs) {
  const frame = Math.round(s * 30);
  await renderStill({ composition: comp, serveUrl, frame, output: `../qa/s_${String(s).padStart(5, "0")}.jpg`, imageFormat: "jpeg", scale: 0.5 });
  console.log("ok", s);
}
