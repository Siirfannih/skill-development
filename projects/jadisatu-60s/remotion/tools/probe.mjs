import { bundle } from "@remotion/bundler";
import { renderFrames, selectComposition } from "@remotion/renderer";
import fs from "fs";
const serveUrl = await bundle({ entryPoint: "/home/claude/thegap/video/src/index.ts" });
const inputProps = { probe: true };
const comp = await selectComposition({ serveUrl, id: "TheGap", inputProps });
const logs = [];
await renderFrames({
  composition: comp, serveUrl, inputProps, outputDir: "/tmp/probe_frames", imageFormat: "jpeg", jpegQuality: 30,
  everyNthFrame: Number(process.argv[2] || 3), concurrency: 2, scale: 0.25,
  onBrowserLog: (l) => { if (l.text.startsWith("PROBE ")) logs.push(l.text.slice(6)); },
  onStart: () => {}, onFrameUpdate: () => {},
});
fs.writeFileSync("/home/claude/thegap/qa/probe.jsonl", logs.join("\n"));
console.log("frames", logs.length);
