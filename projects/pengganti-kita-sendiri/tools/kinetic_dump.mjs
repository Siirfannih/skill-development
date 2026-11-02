// Tabel blok teks VO (KineticVO.KINETIC_BUILT) → JSON untuk tools/text_flicker_check.py.
// node tools/kinetic_dump.mjs [remotionDir] [--phrases] > blocks.json   (--phrases: semua frasa CaptionTrack, sebelum saring SPEC)
// Kolom: idx, words [{t,f,endF}], start (frame kata pertama), exA/exB (jendela keluar), lastEnd (akhir ucapan kata terakhir, frame)
import { build } from "../remotion/node_modules/esbuild/lib/main.js";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const PHR = argv.includes("--phrases");
const rdir = path.resolve(argv.find((a) => !a.startsWith("--")) ?? path.join(here, "../remotion"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "kdump-"));
const entry = path.join(tmp, "entry.ts");
fs.writeFileSync(entry, `import { KINETIC_BUILT } from ${JSON.stringify(path.join(rdir, "src/lib/KineticVO"))};\nimport { CAPTION_PHRASES } from ${JSON.stringify(path.join(rdir, "src/lib/CaptionTrack"))};\nexport default ${PHR ? 'CAPTION_PHRASES.map((p, idx) => ({ p, idx, exA: p.end, exB: p.end }))' : 'KINETIC_BUILT'};\n`);
const out = path.join(tmp, "out.mjs");
await build({
  entryPoints: [entry], bundle: true, platform: "node", format: "esm", outfile: out, jsx: "automatic", logLevel: "error",
  loader: { ".json": "json" }, nodePaths: [path.join(rdir, "node_modules")],
  external: ["react", "react-dom", "remotion", "@remotion/*"],
});
// paket eksternal di-resolve dari remotion/node_modules
fs.symlinkSync(path.join(rdir, "node_modules"), path.join(tmp, "node_modules"));
const mod = await import(pathToFileURL(out).href);
const rows = mod.default.map((b) => ({
  idx: b.idx, box: b.box, lines: b.lines, start: b.p.start, end: b.p.end, exA: b.exA, exB: b.exB, swap: !!b.swap,
  words: b.p.words.map((w) => ({ t: w.text, f: w.f, endF: w.endF })),
}));
fs.rmSync(tmp, { recursive: true, force: true });
process.stdout.write(JSON.stringify(rows));
