#!/usr/bin/env node
// Pengecek kata (BRIEF §Sistem teks): setiap kata di words_final.json tampil TEPAT SEKALI dan terlihat saat diucapkan.
// Membaca semua src/scenes/*.text.ts (blok teks = satu sumber kebenaran yang juga dipakai renderer).
//   node scripts/cekkata.mjs [awal_dtk] [akhir_dtk]
// Keluaran: HILANG (kata tidak tampil), DOBEL (kata tampil > 1 kali), TELAT/TERTUTUP (tidak terlihat saat diucapkan),
// TAHAN (blok keluar < 0,25 dtk setelah kata terakhirnya; disertai catatan blok bila ada). Exit 1 bila ada HILANG/DOBEL/TELAT.
import { build } from 'esbuild';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const a = parseFloat(process.argv[2] ?? '0'), b = parseFloat(process.argv[3] ?? '1e9');
const files = readdirSync(join(root, 'src/scenes')).filter((f) => f.endsWith('.text.ts')).sort();
const entry = files.map((f, k) => `import * as m${k} from './scenes/${f}';`).join('\n') +
  `\nimport { WORDS } from './engine/words';\nexport const BLOCKS = [${files.map((_, k) => `...Object.values(m${k}).filter(Array.isArray).flat().filter(x => x && x.code)`).join(',')}];\nexport { WORDS };`;
const out = await build({ stdin: { contents: entry, resolveDir: join(root, 'src'), loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'error' });
const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
const { BLOCKS, WORDS } = mod;

const FPS = 30;
const win = (i) => Math.round(WORDS[i].s * FPS) + 1;
const wout = (i) => Math.round(WORDS[i].e * FPS);
const uses = new Map();
const flags = [];
const warn = [];
for (const blk of BLOCKS) {
  // daftar [token, tampilDari, tampilSampai]
  const spans = [];
  const push = (toks, until) => toks.forEach((t, k) => spans.push([t, blk.code === 'UI' && blk.at ? blk.at[k] : win(t.i[0]), until]));
  if (blk.code === 'N') push(blk.lines.flat(), blk.until);
  else if (blk.code === 'K3') {
    push(blk.head, blk.until);
    blk.keys.forEach((key, k) => push(key, k + 1 < blk.keys.length ? win(blk.keys[k + 1][0].i[0]) : blk.until));
    if (blk.tail) push(blk.tail, blk.until);
  } else if (blk.code === 'K4') push([...blk.small, ...blk.big], blk.until);
  else push(blk.toks, blk.until);
  let last = -1;
  for (const [t, from, until] of spans) {
    for (const i of t.i) {
      last = Math.max(last, i);
      if (!uses.has(i)) uses.set(i, []);
      uses.get(i).push(`${blk.id}:"${t.t}"`);
      const say = win(i);
      if (say < from - 2 || say >= until) flags.push(['TELAT', blk.id, `"${WORDS[i].w}" diucapkan f${say}, tampil f${from}–${until}`]);
    }
  }
  if (last >= 0 && blk.until < wout(last) + 8) warn.push(['TAHAN', blk.id, `keluar f${blk.until}, kata terakhir selesai f${wout(last)} (+0,25 dtk = f${wout(last) + 8})${blk.note ? ' · catatan: ' + blk.note : ''}`]);
}
let n = 0;
WORDS.forEach((w, i) => {
  if (w.s < a || w.s >= b) return;
  n++;
  const u = uses.get(i) ?? [];
  if (u.length === 0) flags.push(['HILANG', `#${i}`, `"${w.w}" (${w.s.toFixed(2)} dtk) tidak tampil`]);
  if (u.length > 1) flags.push(['DOBEL', `#${i}`, `"${w.w}" tampil ${u.length}×: ${u.join(', ')}`]);
});
console.log(`kata dicek: ${n} (${a}–${b === 1e9 ? 'akhir' : b} dtk) · blok: ${BLOCKS.length} dari ${files.join(', ')}`);
for (const f of flags) console.log(`  ${f[0].padEnd(7)} ${f[1].padEnd(10)} ${f[2]}`);
for (const f of warn) if (BLOCKS.find((x) => x.id === f[1]) && WORDS[0]) console.log(`  ${f[0].padEnd(7)} ${f[1].padEnd(10)} ${f[2]}`);
console.log(flags.length ? `ADA ${flags.length} MASALAH` : 'SEMUA KATA TAMPIL TEPAT SEKALI DAN TERLIHAT SAAT DIUCAPKAN');
process.exit(flags.length ? 1 : 0);
