// LayerAtas.tsx · LAYER 3 (paling atas): cap pembuka, KT (1 kata kunci per beat), kartu, panah/label, maskot KLIK yang bereaksi, caption pelat K-05.
import React from 'react';
import { MEREK, NETRAL, TURUNAN, HURUF, BAYANGAN, RADIUS } from './bersama/tema';
import { Klik } from './bersama/Klik';
import { ASLI } from './bersama/warnaAsli';
import { Caption } from './Caption';
import { Kartu } from './Kartu';
import { kam, keLayar, BY_PANTAI, px } from './kamera';
import { kf, mv, FPS } from './waktu';
import { drift } from '../lib/curves';
import cap from './data/captions.json';
import sl from './data/shotlist.json';

type W = { w: string; s: number; e: number };
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const words = (cap as { words: W[] }).words;
const chunks = (cap as { chunks: { t0: number }[] }).chunks;

// KT: satu kata kunci per beat (ADDENDUM-2 butir 3); mulai di kata pertamanya, tampil <= 1,9 dtk. Beat 1 memakai cap pembuka.
const KT = (sl as { beats: { beat_id: number; start_sec: number; end_sec: number; kt: { teks: string }[] }[] }).beats
  .filter((b) => ![1, 4, 12].includes(b.beat_id))  // b1 = cap, b4 = panah ¼ ¾, b12 = kartu: maks 2 tingkat teks per beat
  .map((b) => {
    const teks = b.kt[0].teks;
    const first = norm(teks.split(' ')[0]);
    const w = words.find((x) => x.s >= b.start_sec - 0.15 && norm(x.w).startsWith(first));
    const t0 = w ? w.s : b.start_sec + 0.2;
    return { teks, t0, t1: Math.min(b.end_sec - 0.05, t0 + 1.9) };
  });

const KataKunci: React.FC<{ t: number }> = ({ t }) => {
  const k = KT.find((x) => t >= x.t0 && t < x.t1);
  if (!k) return null;
  const n = Math.min(k.teks.length, Math.floor((t - k.t0) * FPS * 1.2) + 1);
  const keluar = t > k.t1 - 0.2 ? mv(t, k.t1 - 0.2, 0.2, 'leave') : 0;
  const lebar = Math.min(960, k.teks.length * 54 + 40);
  return (
    <div style={{ position: 'absolute', left: 0, top: 300 - keluar * 160, width: 1080, textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', padding: '0 24px' }}>
        <div style={{ position: 'absolute', left: 0, bottom: 10, height: 42, width: lebar * mv(t, k.t0, 0.3, 'reveal'), background: ASLI.kuning, opacity: 0.75, borderRadius: 8 }} />
        <span style={{ position: 'relative', fontFamily: HURUF.keluarga.judul, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.kunci, color: NETRAL.tinta }}>{k.teks.slice(0, n)}</span>
      </div>
    </div>
  );
};

const Cap: React.FC<{ t: number }> = ({ t }) => {
  if (t > 2.7) return null;
  const masuk = 0.88 + 0.12 * mv(t, 0, 0.2, 'land');
  const keluar = t > 2.4 ? mv(t, 2.4, 0.3, 'leave') : 0;
  return (
    <div style={{ position: 'absolute', left: 0, top: 290 - keluar * 400, width: 1080, textAlign: 'center', transform: `scale(${masuk}) rotate(${-2 + 2 * mv(t, 0, 0.25, 'land')}deg)`,
      fontFamily: HURUF.keluarga.judul, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.hero, color: TURUNAN.primer.tekan }}>
      Kalau…
    </div>
  );
};

/** Panah + label yang menempel pada benda dunia (posisi dari kamera layer aksi). */
const PanahLabel: React.FC<{ t: number; p: number; teks: string; t0: number; t1: number }> = ({ t, p, teks, t0, t1 }) => {
  if (t < t0 || t >= t1) return null;
  const c = kam(t);
  const a = keLayar(c, 1, px(p), BY_PANTAI - 8 - 190);
  const masuk = mv(t, t0, 0.3, 'land'), keluar = t > t1 - 0.25 ? mv(t, t1 - 0.25, 0.25, 'leave') : 0;
  const y = a.y - 150 - (1 - masuk) * 40 - keluar * 80;
  return (
    <g transform={`translate(${a.x} ${y})`}>
      <text x={0} y={0} textAnchor="middle" fontFamily={HURUF.keluarga.judul} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.hero} fill={TURUNAN.primer.tekan}>{teks}</text>
      <path d="M0 22 L0 84 M-22 62 L0 90 L22 62" fill="none" stroke={TURUNAN.primer.tekan} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

const Maskot: React.FC<{ t: number }> = ({ t }) => {
  const ada = (t >= 4.7 && t < 35.7) || t >= 53.0;
  if (!ada) return null;
  let left = kf(t, [[4.7, 270], [5.9, 270], [6.6, 50, 'land']]);
  let top = kf(t, [[4.7, 560], [5.9, 560], [6.6, 1455, 'heavy']]);
  let w = kf(t, [[4.7, 540], [5.9, 540], [6.6, 190, 'heavy']]) * (0.9 + 0.1 * mv(t, 4.7, 0.2, 'land'));
  if (t >= 35.4 && t < 35.7) top += 260 * mv(t, 35.4, 0.3, 'leave');
  if (t >= 53.0) { left = 50; top = 1455; w = 190; }
  let eyes: 'dot' | 'wide' | 'happy' | 'line' = 'dot';
  let arms: [number, number] = [20, 20];
  let tilt = 0;
  let look: [number, number] = [14, -6];
  let sq: [number, number] = [1, 1];
  if (t < 6.6) { eyes = 'wide'; arms = [150, 150]; look = [0, 0]; }
  else if (t >= 15.7 && t < 18.9) { arms = [10, 130]; tilt = 5; look = [18, -14]; }
  else if (t >= 22.8 && t < 25.4) { arms = [10, 112]; tilt = 7; look = [22, -12]; }
  else if (t >= 25.4 && t < 29.6) { eyes = 'wide'; arms = [35, 35]; }
  else if (t >= 29.6 && t < 31.6) { eyes = 'happy'; arms = [165, 165]; look = [0, 0]; const h = mv(t, 29.6, 0.5, 'land'); top -= Math.sin(h * Math.PI) * 46; sq = [1 - 0.05 * Math.sin(h * Math.PI), 1 + 0.06 * Math.sin(h * Math.PI)]; }
  else if (t >= 53.0) { eyes = t >= 54.1 ? 'line' : 'dot'; const a = kf(t, [[53.0, 90], [54.1, 0, 'heavy']]); arms = [a, a]; look = [0, 0]; }
  // bicara: setiap chunk caption baru memberi loncatan kecil (aksi = berbicara)
  const c = [...chunks].reverse().find((x) => x.t0 <= t);
  if (c && t - c.t0 < 0.2 && t > 6.6) { const k = mv(t, c.t0, 0.08, 'reveal') * (1 - mv(t, c.t0 + 0.08, 0.12, 'leave')); top -= k * 9; sq = [sq[0] * (1 - 0.03 * k), sq[1] * (1 + 0.04 * k)]; } // motion-ok: loncatan bicara 9 px terikat awal tiap chunk caption (kurva curves.ts), bukan stagger
  const d = drift(Math.round(t * FPS), FPS, 2, 3);
  return (
    <div style={{ position: 'absolute', left: left + d.x, top: top + d.y }}>
      <Klik lebar={w} eyes={eyes} arms={arms} tilt={tilt} look={look} squash={sq} />
    </div>
  );
};

export const LayerAtas: React.FC<{ t: number }> = ({ t }) => (
  <>
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
      <Kartu t={t} />
      <PanahLabel t={t} p={0.25} teks="¼" t0={11.5} t1={15.5} />
      <PanahLabel t={t} p={0.75} teks="¾" t0={12.9} t1={15.5} />
    </svg>
    <Cap t={t} />
    <KataKunci t={t} />
    <Maskot t={t} />
    <Caption t={t} />
  </>
);
export const _ref = { MEREK, BAYANGAN, RADIUS };
