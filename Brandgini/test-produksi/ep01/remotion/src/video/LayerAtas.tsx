// LayerAtas.tsx · LAYER 3 (paling atas): cap pembuka, KT (1 kata kunci per beat), kartu, panah/label, maskot KLIK yang bereaksi, caption pelat K-05.
import React from 'react';
import { MEREK, NETRAL, TURUNAN, HURUF, BAYANGAN, RADIUS } from './bersama/tema';
import { ASLI } from './bersama/warnaAsli';
import { Caption } from './Caption';
import { Kartu } from './Kartu';
import { kam, keLayar, G, px, adaGang } from './kamera';
import { kf, mv, FPS } from './waktu';
import { drift } from '../lib/curves';
import cap from './data/captions.json';
import sl from './data/shotlist.json';

type W = { w: string; s: number; e: number };
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const words = (cap as { words: W[] }).words;
const chunks = (cap as { chunks: { t0: number }[] }).chunks;

const Cap: React.FC<{ t: number }> = ({ t }) => {
  if (t > 2.7) return null;
  const masuk = 0.88 + 0.12 * mv(t, 0, 0.2, 'land');
  const keluar = t > 2.4 ? mv(t, 2.4, 0.3, 'leave') : 0;
  return (
    <div style={{ position: 'absolute', left: 0, top: 1110 - keluar * 120, width: 1080, textAlign: 'center', transform: `scale(${masuk}) rotate(${-2 + 2 * mv(t, 0, 0.25, 'land')}deg)`,
      fontFamily: HURUF.keluarga.judul, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.hero, color: TURUNAN.primer.tekan }}>
      Kalau…
    </div>
  );
};

/** Panah + label yang menempel pada benda dunia (posisi dari kamera layer aksi). */
const PanahLabel: React.FC<{ t: number; p: number; teks: string; t0: number; t1: number }> = ({ t, p, teks, t0, t1 }) => {
  if (t < t0 || t >= t1) return null;
  const c = kam(t);
  const a = keLayar(c, 1, px(p), G - 310);
  const masuk = mv(t, t0, 0.3, 'land'), keluar = t > t1 - 0.25 ? mv(t, t1 - 0.25, 0.25, 'leave') : 0;
  const y = a.y - 150 - (1 - masuk) * 40 - keluar * 80;
  return (
    <g transform={`translate(${a.x} ${y})`}>
      <text x={0} y={0} textAnchor="middle" fontFamily={HURUF.keluarga.judul} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.hero} fill={TURUNAN.primer.tekan}>{teks}</text>
      <path d="M0 22 L0 84 M-22 62 L0 90 L22 62" fill="none" stroke={TURUNAN.primer.tekan} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </g>
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
    <Caption t={t} />
  </>
);
export const _ref = { MEREK, BAYANGAN, RADIUS };
