// Satu lapisan teks kinetik (Lantai A1–A9, PLAN aturan_teks). Kata naik dari balik garis dasar tepat di onset ucapannya
// (T01/T19), kata kunci = amber dengan ukuran sama (kartu 55). Token: *kata* = kunci amber; %kata% = putih lalu amber
// saat kata kunci di barisnya tiba. Posisi diberi dalam px LAYAR pada frame jangkar, lalu dikunci ke dunia kamera.
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT, prog } from './theme';
import { Pose } from './camera';
import { toWorld } from './Cam';
import { match, wordIn, WORDS } from './words';

type Tok = { text: string; key: boolean; flip: boolean; i: number };
const parse = (line: string) =>
  line.split(/\s+/).filter(Boolean).map((raw) => {
    const key = /^\*.*\*$/.test(raw), flip = /^%.*%$/.test(raw);
    return { text: key || flip ? raw.slice(1, -1) : raw, key, flip, i: -1 } as Tok;
  });

export const SHADOW = '0 0 26px rgba(14,13,12,0.55), 0 2px 6px rgba(14,13,12,0.45)';

export type ChunkSpec = {
  lines: string[];
  after: number; // detik: cari kata mulai dari sini
  sx: number; sy: number; // anchor layar (atas-kiri / atas-kanan / atas-tengah)
  align?: 'left' | 'right' | 'center';
  size?: number | number[]; // px layar per baris
  weight?: number[]; // bobot per baris (default 600, kunci 700)
  gap?: number; // jarak antar-baris tambahan (px layar)
  exit?: number; // frame mulai keluar (mask ke atas, 6 f)
  anchor?: number; // frame pose untuk konversi layar->dunia (default: kata pertama)
  tracking?: number;
};

export const Chunk: React.FC<{ spec: ChunkSpec; pose: (f: number) => Pose }> = ({ spec, pose }) => {
  const f = useCurrentFrame();
  const lines = spec.lines.map(parse);
  // tiap baris dicocokkan berurutan (baris boleh melompati kata yang tidak ditampilkan PLAN)
  let after = spec.after;
  const idx: number[] = [];
  for (const toks of lines) {
    const m = match(toks.map((t) => t.text), after);
    toks.forEach((t, k) => (t.i = m[k]));
    idx.push(...m);
    after = WORDS[m[m.length - 1]].e - 0.001;
  }
  const first = wordIn(idx[0]);
  if (f < first - 1) return null;
  if (spec.exit !== undefined && f >= spec.exit + 7) return null;
  const p = pose(spec.anchor ?? first);
  const wpt = toWorld(p, spec.sx, spec.sy);
  const sizes = lines.map((_, li) => (Array.isArray(spec.size) ? spec.size[li] : spec.size ?? 90) / p.zoom);
  const ex = spec.exit !== undefined ? prog(f, spec.exit, spec.exit + 6, 'in') : 0;
  const tr = spec.tracking ?? -0.015;
  const tx = spec.align === 'right' ? '-100%' : spec.align === 'center' ? '-50%' : '0';
  return (
    <div style={{ position: 'absolute', left: wpt.x, top: wpt.y, transform: `translateX(${tx})`, textAlign: spec.align ?? 'left', whiteSpace: 'nowrap' }}>
      {lines.map((toks, li) => {
        const sz = sizes[li];
        const keyIn = Math.max(...toks.filter((t) => t.key).map((t) => wordIn(t.i)), -1);
        return (
          <div key={li} style={{ height: sz * 1.24, overflow: 'hidden', padding: `0 ${sz * 0.12}px`, margin: `${li ? (spec.gap ?? 0) / p.zoom : 0}px ${-sz * 0.12}px 0` }}>
            {toks.map((t, k) => {
              const a = prog(f, wordIn(t.i), wordIn(t.i) + 10, 'out');
              const y = (1 - a) * 115 - ex * 115;
              const amber = t.key || (t.flip && keyIn >= 0 && f >= keyIn);
              return (
                <span
                  key={k}
                  style={{
                    display: 'inline-block', fontFamily: FONT, fontSize: sz, lineHeight: 1.24, letterSpacing: `${tr}em`,
                    fontWeight: spec.weight?.[li] ?? (t.key ? 700 : 600), color: amber ? C.amber : C.putih,
                    transform: `translateY(${y}%)`, textShadow: SHADOW, marginRight: k < toks.length - 1 ? sz * 0.26 : 0,
                    opacity: f < wordIn(t.i) ? 0 : 1,
                  }}
                >
                  {t.text}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
