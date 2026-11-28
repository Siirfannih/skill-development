// Caption.tsx · caption kata per kata di pelat putih membulat, pita bawah y 1250-1450 (pengecualian merek K-05, Irfan 25 Nov 2026).
// Kata aktif memakai TURUNAN.primer.tekan (#1F4FCC): kontras di putih diukur di LOG.
import React from 'react';
import { NETRAL, TURUNAN, HURUF, BAYANGAN, RADIUS } from './bersama/tema';
import { mv } from './waktu';
import cap from './data/captions.json';

type W = { w: string; s: number; e: number };
type C = { words: W[]; t0: number; t1: number };

export const Caption: React.FC<{ t: number }> = ({ t }) => {
  const chunks = (cap as { chunks: C[] }).chunks;
  let idx = -1;
  for (let i = 0; i < chunks.length; i++) if (chunks[i].t0 - 0.03 <= t) idx = i;
  if (idx < 0) return null;
  const c = chunks[idx];
  const habis = idx + 1 < chunks.length ? chunks[idx + 1].t0 - 0.03 : c.t1 + 0.6;
  if (t > Math.min(habis, c.t1 + 0.45)) return null;
  const masuk = mv(t, c.t0 - 0.03, 0.17, 'reveal');
  const aktif = c.words.reduce((a, w, i) => (w.s <= t + 0.02 ? i : a), 0);
  return (
    <div style={{ position: 'absolute', left: 0, top: 1250, width: 1080, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          maxWidth: 940, minHeight: 120, padding: '24px 44px', background: NETRAL.putih, borderRadius: RADIUS.pelat,
          boxShadow: BAYANGAN.kertas, textAlign: 'center', transform: `translateY(${(1 - masuk) * 16}px) scale(${0.94 + 0.06 * masuk})`,
          fontFamily: HURUF.keluarga.isi, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.narasi, lineHeight: 1.12,
          color: NETRAL.tinta,
        }}
      >
        {c.words.map((w, i) => (
          <span key={i} style={{ whiteSpace: 'nowrap', color: i === aktif ? TURUNAN.primer.tekan : NETRAL.tinta }}>{w.w}{i < c.words.length - 1 ? ' ' : ''}</span>
        ))}
      </div>
    </div>
  );
};
