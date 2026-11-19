import React from 'react';
import {move} from '../../../../lib/curves';
import {MEREK} from '../../tema';

// Transisi gelombang grid (D-439): cincin kotak memancar dari satu titik, adegan baru terbuka di dalam
// cincin, adegan lama (footage di bawah lapisan) tetap tampil di luarnya. Diukur dari
// sumber/ref-r6/ref-grid.mp4 4,2–4,9 dtk (kartu 63): kotak ±5,5 % tinggi frame, sel redup → terang,
// sela gelap, tepi depan lembut. Gelombang selalu punya pemicu (klik) dan warnanya dari pemicu itu, diredupkan
// sekeluarga dengan latar hitam (D-449): oranye tombol kirim → bara gelap, tanpa putih/biru.
const SEL = 60;                 // px pada 1080p (18 baris)
const KOLOM = 32, BARIS = 18;
const SEL_TERANG = [228, 85, 15]; // MEREK.primer #E4550F, tombol kirim (pemicu)
const SEL_GELAP = MEREK.latar;

const acak = (c: number, r: number, s: number) => {
  const x = Math.sin(c * 127.1 + r * 311.7 + s * 74.7) * 43758.5453;
  return x - Math.floor(x);
};

export type Gelombang = {asal: {x: number; y: number}; frames: number};

// Jari-jari depan dan belakang cincin pada frame f.
const cincin = (f: number, g: Gelombang) => {
  const jauh = Math.max(...[[0, 0], [1920, 0], [0, 1080], [1920, 1080]]
    .map(([x, y]) => Math.hypot(x - g.asal.x, y - g.asal.y)));
  const depan = (jauh + SEL * 5) * move(f, 0, g.frames, 'land');
  const tebal = SEL * 1.6 + depan * 0.16;   // cincin tipis, pusat kosong (D-473 #7)
  return {depan, belakang: depan - tebal, tebal};
};

const jarak = (c: number, r: number, g: Gelombang) =>
  Math.hypot(c * SEL + SEL / 2 - g.asal.x, r * SEL + SEL / 2 - g.asal.y);

// Masker SVG: sel yang sudah terbuka (adegan baru tampil), lainnya transparan.
export const maskGelombang = (f: number, g: Gelombang): string => {
  const {belakang, tebal} = cincin(f, g);
  const rects: string[] = [];
  for (let r = 0; r < BARIS; r++) for (let c = 0; c < KOLOM; c++) {
    const d = jarak(c, r, g);
    const u = (d - belakang) / tebal;
    if (d < belakang || (u < 0.55 && acak(c, r, 3) < 0.75 - u)) rects.push(`<rect x='${c * SEL}' y='${r * SEL}' width='${SEL}' height='${SEL}'/>`);
  }
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'>${rects.join('')}</svg>`)}")`;
};

export const GelombangGrid: React.FC<{frame: number; g: Gelombang}> = ({frame, g}) => {
  if (frame >= g.frames) return null;
  const {depan, belakang, tebal} = cincin(frame, g);
  const sel: React.ReactNode[] = [];
  for (let r = 0; r < BARIS; r++) for (let c = 0; c < KOLOM; c++) {
    const d = jarak(c, r, g);
    if (d > depan || d < belakang - SEL) continue;
    const u = (d - belakang) / tebal;               // 0 = sisi dalam, 1 = tepi depan
    const h = acak(c, r, Math.floor(frame / 2));    // kedip per 2 frame seperti referensi
    if (u < 0 && h > 0.12) continue;                // sisa jarang di belakang cincin
    const nyala = Math.max(0, Math.min(1, 0.25 + 0.75 * h * (1 - Math.abs(u - 0.6))));
    const gelap = acak(c, r, 9) < 0.28;
    const dekat = Math.max(0, 1 - d / 520);           // dekat pemicu sedikit lebih terang
    const [rr, gg, bb] = SEL_TERANG.map((v) => Math.round(v * (0.1 + 0.4 * nyala * (0.5 + u) + 0.08 * dekat)));
    const tepi = u > 0.82;
    sel.push(<div key={`${c}-${r}`} style={{
      position: 'absolute', left: c * SEL, top: r * SEL, width: SEL, height: SEL,
      background: gelap ? SEL_GELAP : `rgb(${rr},${gg},${bb})`,
      opacity: tepi ? 0.55 : u < 0 ? 0.45 : 1,
      boxShadow: `inset 0 0 0 1px rgba(8,6,8,.55)`,
      filter: tepi ? 'blur(3px)' : 'blur(0.8px)',
    }}/>);
  }
  return <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>{sel}</div>;
};
