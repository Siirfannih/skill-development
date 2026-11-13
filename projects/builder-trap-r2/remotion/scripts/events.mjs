#!/usr/bin/env node
// Cue teks untuk SFX (Sutradara): baca semua src/scenes/*.text.ts (sama dengan cekkata.mjs) dan tulis ../audio/events_text.json.
//   node scripts/events.mjs
// Satu baris per kemunculan teks: {t, f, beat, kode, kata, jenis}
//   kata_kinetik : tiap kata besar K4, kartu judul J, label tulisan tangan H (f = tulisan selesai, f_mulai = mulai),
//                  dan tiap kata kunci K3 yang berganti
//   frasa        : awal tiap blok N (satu per blok), kepala K3, dan baris kecil K4
//   ketik        : rentang teks UI diketik (f = awal, f_akhir = akhir)
// f = frame saat kata pertama kali jelas terlihat (bukan frame mulai animasi), mengikuti engine/TextLayer.tsx:
//   N/kecil: masuk wordIn, blur+naik 6 f easing out → jelas di +2 · kunci K3: 5 f → +2 · besar K4: 8 f → +3
//   J: huruf naik bertahap 6 f + 6 f → seluruh kata jelas di +8 · H: jelas saat goresan selesai
import { build } from 'esbuild';
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = readdirSync(join(root, 'src/scenes')).filter((f) => f.endsWith('.text.ts')).sort();
const entry = files.map((f, k) => `import * as m${k} from './scenes/${f}';`).join('\n') +
  `\nimport { WORDS } from './engine/words';\nexport const BLOCKS = [${files.map((_, k) => `...Object.values(m${k}).filter(Array.isArray).flat().filter(x => x && x.code)`).join(',')}];\nexport { WORDS };`;
const out = await build({ stdin: { contents: entry, resolveDir: join(root, 'src'), loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'error' });
const { BLOCKS, WORDS } = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));

const FPS = 30;
const win = (i) => Math.round(WORDS[i].s * FPS) + 1; // = engine/words.ts wordIn
const wout = (i) => Math.round(WORDS[i].e * FPS); // = wordOut
const first = (toks) => win(toks[0].i[0]);
const text = (toks) => toks.map((t) => t.t).join(' ');
const ev = [];
const add = (f, b, jenis, kata, extra = {}) => ev.push({ t: +(f / FPS).toFixed(3), f, beat: b.beat, kode: b.code, kata, jenis, id: b.id, ...extra });

for (const b of BLOCKS) {
  switch (b.code) {
    case 'N':
      add(first(b.lines.flat()) + 2, b, 'frasa', b.lines.map(text).join(' / '));
      break;
    case 'K3':
      add(first(b.head) + 2, b, 'frasa', text(b.head));
      for (const k of b.keys) add(first(k) + 2, b, 'kata_kinetik', text(k));
      if (b.tail?.length) add(first(b.tail) + 2, b, 'frasa', text(b.tail));
      break;
    case 'K4':
      if (b.small.length) add(first(b.small) + 2, b, 'frasa', text(b.small));
      for (const t of b.big) add(win(t.i[0]) + 3, b, 'kata_kinetik', t.t);
      break;
    case 'J':
      add(first(b.toks) + 8, b, 'kata_kinetik', text(b.toks), { f_mulai: first(b.toks) });
      break;
    case 'H': {
      const a = first(b.toks), last = Math.max(...b.toks.flatMap((t) => t.i));
      add(Math.max(a + 10, wout(last)), b, 'kata_kinetik', text(b.toks), { f_mulai: a, catatan: 'tulisan tangan tergambar f_mulai → f, lalu panah 8 f bila ada' });
      break;
    }
    case 'UI': {
      const a = b.at?.[0] ?? first(b.toks), last = Math.max(...b.toks.flatMap((t) => t.i));
      const z = Math.max(b.at?.[b.at.length - 1] ?? a, wout(last));
      add(a, b, 'ketik', text(b.toks), { f_akhir: z, t_akhir: +(z / FPS).toFixed(3) });
      break;
    }
  }
}
ev.sort((x, y) => x.f - y.f || x.beat.localeCompare(y.beat));
mkdirSync(join(root, '../audio'), { recursive: true });
const dest = join(root, '../audio/events_text.json');
writeFileSync(dest, '[\n' + ev.map((e) => JSON.stringify(e)).join(',\n') + '\n]\n');
const per = ev.reduce((m, e) => ((m[e.jenis] = (m[e.jenis] ?? 0) + 1), m), {});
console.log(`${ev.length} event → ${dest} · ${Object.entries(per).map(([k, v]) => `${k} ${v}`).join(', ')} · dari ${files.join(', ')}`);
