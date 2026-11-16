// Lapisan teks r2: persis handoff/TEKS.json (66 tampil, satu tampil di layar pada satu waktu). Gaya:
//   s = satu baris (Poppins 600, kunci 700 amber, ukuran sama) · t = tumpuk 1 kata/baris rata lebar, kapital 700
//   d = dua baris seimbang kapital 700 · judul = kartu SUFFERING (dibangun di shot B5, bukan di sini).
// Posisi diberi dalam px LAYAR pada frame `muncul` lalu dikunci ke dunia kamera (Lantai B12).
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT, prog, W } from './theme';
import { Pose } from './camera';
import { toWorld } from './Cam';
import RAW from '../data/teks.json';
import HEAD from '../data/head.json';
const HEADX = HEAD as Record<string, number>;
import { WORDS, norm } from './words';

export type Tampil = { id: string; kata: [number, number]; teks: string; kunci: string[]; gaya: 's' | 't' | 'd' | 'judul'; muncul: number; hilang: number };
export const TEKS: Tampil[] = RAW as unknown as Tampil[];
const byId = new Map(TEKS.map((t) => [t.id, t]));

// Pengaman Lantai A5: kata di layar = kata words.json pada indeks `kata`.
for (const t of TEKS) {
  const shown = t.teks.replace('|', ' ').split(/\s+/).map(norm).filter(Boolean);
  // BRIEF: "it's" @33,67 (indeks 129) salah dengar, tidak ditampilkan
  const said = WORDS.slice(t.kata[0], t.kata[1] + 1).map((w, k) => (t.kata[0] + k === 129 ? '' : norm(w.w))).filter(Boolean);
  if (shown.join(' ') !== said.join(' ')) throw new Error(`TEKS ${t.id} "${t.teks}" != ucapan "${said.join(' ')}"`);
}

export const fIn = (t: Tampil) => Math.round(t.muncul * 30);
export const fOut = (t: Tampil) => Math.round(t.hilang * 30);

export const SHADOW = '0 0 28px rgba(14,13,12,0.62), 0 2px 8px rgba(14,13,12,0.5)';
// r5: glow teks lembut warna huruf (halo ±26 px @1080, opasitas ±0,3) di atas bayangan gelap untuk kontras
const glow = (amber: boolean) =>
  `0 0 26px ${amber ? 'rgba(232,163,61,0.34)' : 'rgba(244,241,234,0.30)'}, 0 0 22px rgba(14,13,12,0.55), 0 2px 8px rgba(14,13,12,0.5)`;
const TRACK = -0.015;
const CAPS_TRACK = -0.02;

let ctx: CanvasRenderingContext2D | null = null;
const measure = (text: string, size: number, weight: number, track: number) => {
  if (typeof document === 'undefined') return text.length * size * 0.6;
  if (!ctx) ctx = document.createElement('canvas').getContext('2d');
  ctx!.font = `${weight} ${size}px Poppins`;
  return ctx!.measureText(text).width + track * size * text.length;
};

export type Mode = 'tenang' | 'kata' | 'skala' | '25d' | 'tumpuk' | 'judul';
export type Place = {
  sx?: number; sy?: number; wx?: number; wy?: number; align?: 'left' | 'right' | 'center'; size?: number; width?: number; anchor?: number;
  mode?: Mode; // r2b: modus tipografi (default: tenang untuk gaya s, tumpuk untuk t/d)
  big?: number; // skala: ukuran kata raksasa (px layar)
  giant?: string[];
  head?: boolean; // r6: sx = tepi kanan kepala (data/head.json, maks selama tampil) + 80 px layar (≥ 4 % lebar, ≤ 8 % tinggi)
  br?: number;
  dx?: number; // r8: geser kanan (px layar) di atas jarak kepala
  hold?: number; // r8: frame saat tampil ini selesai memudar (keluar 3 f sebelumnya); menahan tampil lintas cut sampai tampil berikut masuk
  keepLeft?: number; // r7: tepi kiri teks tidak keluar dari x layar ini (B4: teks tidak ikut terseret keluar saat kamera pindah cetakan) // r6: modus kata dua baris, patah sebelum kata ke-br // skala: kata yang dibuat raksasa (default: kata kunci, atau kata terakhir)
  tilt?: [number, number]; // 25d: rotateY, rotateX (derajat)
};

const isKey = (t: Tampil, w: string) => t.kunci.some((k) => norm(k) === norm(w));

export const Teks: React.FC<{ id: string; place: Place; pose: (f: number) => Pose; until?: number; start?: number }> = ({ id, place, pose, until, start }) => {
  const f = useCurrentFrame();
  const t = byId.get(id);
  if (!t) throw new Error('TEKS tidak ada: ' + id);
  // r6: silang 3–4 f. Tampil masuk mulai 2 f sebelum onset (tidak ada frame kosong), tampil lama keluar 4 f sesudah
  // tampil berikut mulai (opasitas + blur), kecuali dipotong batas shot.
  // r7: masuk di onset kata pertama yang TAMPIL (T49: 'it's' @33,67 tidak tampil → mulai di 'Greatness' 33,79)
  const firstShown = (() => { for (let i = t.kata[0]; i <= t.kata[1]; i++) if (i !== 129) return i; return t.kata[0]; })();
  const a = Math.round(WORDS[firstShown].s * 30), b = fOut(t);
  const lo = Math.max(a - 2, start ?? -1e9), hi = Math.min(place.hold !== undefined ? place.hold : b + 2, until ?? 1e9);
  if (f < lo || f >= hi) return null;
  const p = pose(place.anchor ?? a);
  const hx = place.head ? HEADX[id] : undefined;
  if (place.head && hx === undefined) throw new Error('head.json tidak memuat ' + id);
  const sx = hx !== undefined ? W / 2 + (hx - p.x) * p.zoom + 110 + (place.dx ?? 0) : place.sx!; // r7: +110 px dari tepi kepala terdeteksi (kacamata/telinga ±30 px di luar deteksi)
  const w0 = place.wx !== undefined ? { x: place.wx, y: place.wy! } : toWorld(p, sx, place.sy!);
  const pf = pose(f);
  const w = place.keepLeft !== undefined ? { x: Math.max(w0.x, pf.x + (place.keepLeft - W / 2) / pf.zoom), y: w0.y } : w0;
  const z = p.zoom;
  const xo = place.hold !== undefined ? place.hold - 3 : b - 2;
  const ex = f >= xo ? prog(f, xo, xo + 3, 'linear') : 0; // keluar 3 f, bersamaan dengan masuk tampil berikut // keluar 4 f, mulai bersamaan dengan masuk tampil berikut
  const em = prog(f, a - 2, a + 5, 'out'); // gerak/blur masuk
  const e = prog(f, a - 2, a + 1, 'linear') * (1 - ex); // opasitas: silang linear 3 f
  const tx = place.align === 'right' ? '-100%' : place.align === 'center' ? '-50%' : '0';
  const lines = t.teks.split('|');
  let body: React.ReactNode;
  // indeks kata words.json untuk tiap kata yang tampil (lewati "it's" @129)
  const idxs: number[] = [];
  for (let i = t.kata[0]; i <= t.kata[1]; i++) if (i !== 129) idxs.push(i);
  const wIn = (k: number) => Math.round(WORDS[idxs[k]].s * 30);
  const wordAnim = (k: number) => {
    const q = prog(f, wIn(k) - 2, wIn(k) + 4, 'out');
    return { opacity: prog(f, wIn(k) - 2, wIn(k) + 1, 'linear'), transform: `translateY(${(1 - q) * 0.25}em)`, filter: q < 0.98 ? `blur(${(1 - q) * 6}px)` : undefined, display: 'inline-block' } as React.CSSProperties;
  };
  const mode: Mode = place.mode ?? (t.gaya === 's' ? 'tenang' : 'tumpuk');
  const words = lines.join(' ').split(' ');
  if (mode === 'skala') {
    // segmen: kata raksasa sendiri, kata sambung berkelompok; tiap segmen tampil sendiri dari onset kata pertamanya
    const giant = (w: string) => (place.giant ? place.giant.some((g) => norm(g) === norm(w)) : isKey(t, w));
    const segs: { k0: number; k1: number; g: boolean }[] = [];
    words.forEach((w, k) => {
      const g = giant(w);
      const last = segs[segs.length - 1];
      if (last && g === last.g) last.k1 = k; else segs.push({ k0: k, k1: k, g });
    });
    let cur = 0;
    segs.forEach((sg, i) => { if (f >= wIn(sg.k0)) cur = i; });
    // kata raksasa yang sudah tampil tetap di layar; kata sambung sesudahnya muncul kecil di bawahnya
    let keep = -1;
    for (let i = 0; i < cur; i++) if (segs[i].g) keep = i;
    const show = keep >= 0 ? [keep, cur] : [cur];
    body = show.map((si) => {
      const sg = segs[si];
      const sz = (sg.g ? place.big ?? 260 : place.size ?? 106) / z;
      const q = prog(f, wIn(sg.k0) - 2, wIn(sg.k0) + 5, 'out');
      return (
        <div key={si} style={{ fontSize: sz, lineHeight: 1, letterSpacing: `${sg.g ? -0.03 : TRACK}em`, opacity: q, transform: `scale(${1.12 - 0.12 * q})`, transformOrigin: (place.align ?? 'left') === 'left' ? '0% 50%' : place.align === 'right' ? '100% 50%' : '50% 50%', filter: q < 0.98 ? `blur(${(1 - q) * 8}px)` : undefined }}>
          {words.slice(sg.k0, sg.k1 + 1).map((word, j, arr) => (
            <span key={j} style={{ fontWeight: isKey(t, word) || sg.g ? 700 : 600, color: isKey(t, word) ? C.amber : C.putih, textShadow: glow(isKey(t, word)), marginRight: j < arr.length - 1 ? '0.26em' : 0 }}>{word}</span>
          ))}
        </div>
      );
    });
  } else if (mode === 'tenang' || mode === 'kata' || mode === '25d') {
    const sz = (place.size ?? 92) / z;
    const perWord = mode !== 'tenang';
    const tilt = place.tilt ?? [-16, 7];
    const span = (word: string, k: number, last: boolean) => (
      <span key={k} style={{ fontWeight: isKey(t, word) ? 700 : 600, color: isKey(t, word) ? C.amber : C.putih, textShadow: glow(isKey(t, word)), marginRight: last ? 0 : '0.26em', ...(perWord ? wordAnim(k) : {}) }}>{word}</span>
    );
    const groups = place.br ? [words.slice(0, place.br).map((w, k) => [w, k] as const), words.slice(place.br).map((w, k) => [w, k + place.br!] as const)] : [words.map((w, k) => [w, k] as const)];
    const line = (
      <>
        {groups.map((g, gi) => (
          <div key={gi} style={{ fontSize: sz, lineHeight: 1.05, letterSpacing: `${TRACK}em` }}>
            {g.map(([word, k], j) => span(word, k, j === g.length - 1))}
          </div>
        ))}
      </>
    );
    body = mode === '25d' ? <div style={{ transform: `perspective(${1400 / z}px) rotateY(${tilt[0]}deg) rotateX(${tilt[1]}deg)`, transformOrigin: '50% 50%' }}>{line}</div> : line;
  } else if (t.gaya === 't' || place.width) {
    // tumpuk rata lebar: ukuran tiap baris = lebar target / lebar terukur pada 100 px
    const target = (place.width ?? 720) / z;
    const L = lines.length === 1 ? words : lines; // satu baris di TEKS (mis. T50) → 1 kata per baris
    // r6: tiap baris masuk di onset kata pertamanya (T50 'character.' baru di 34,59)
    let wk = 0;
    const firstIdx = L.map((ln) => { const i0 = wk; wk += ln.split(' ').length; return i0; });
    body = L.map((word, k) => {
      const sz = (target / measure(word, 100, 700, CAPS_TRACK)) * 100;
      return (
        <div key={k} style={{ fontSize: sz, lineHeight: 0.84, fontWeight: 700, letterSpacing: `${CAPS_TRACK}em`, marginTop: k ? 0.06 * sz : 0, ...wordAnim(firstIdx[k]), display: 'block' }}>
          {word.split(' ').map((w, j, arr) => (
            <span key={j} style={{ color: isKey(t, w) ? C.amber : C.putih, textShadow: glow(isKey(t, w)), marginRight: j < arr.length - 1 ? '0.24em' : 0 }}>{w}</span>
          ))}
        </div>
      );
    });
  } else {
    const sz = (place.size ?? 135) / z;
    body = lines.map((line, k) => (
      <div key={k} style={{ fontSize: sz, lineHeight: 1.0, fontWeight: 700, letterSpacing: `${CAPS_TRACK}em` }}>
        {line.split(' ').map((word, j, arr) => (
          <span key={j} style={{ color: isKey(t, word) ? C.amber : C.putih, textShadow: glow(isKey(t, word)), marginRight: j < arr.length - 1 ? '0.24em' : 0 }}>{word}</span>
        ))}
      </div>
    ));
  }
  return (
    <div
      data-teks={id}
      style={{
        position: 'absolute', left: w.x, top: w.y, whiteSpace: 'nowrap', fontFamily: FONT, textAlign: place.align ?? 'left', textShadow: SHADOW,
        transform: `translateX(${tx}) translateY(${(1 - em) * (30 / z)}px)`, opacity: e, filter: em < 0.98 || ex > 0 ? `blur(${(1 - em) * 10 + ex * 14}px)` : undefined,
      }}
    >
      {body}
    </div>
  );
};

/** Render beberapa tampil dengan penempatan masing-masing. */
export const TeksSet: React.FC<{ items: [string, Place][]; pose: (f: number) => Pose; until?: number; start?: number }> = ({ items, pose, until, start }) => (
  <>{items.map(([id, pl]) => <Teks key={id} id={id} place={pl} pose={pose} until={until} start={start} />)}</>
);
