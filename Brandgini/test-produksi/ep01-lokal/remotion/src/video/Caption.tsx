// Caption.tsx · v4: teks kinetik (tanpa pelat). Keputusan Irfan 26 Nov 01:18: subtitle pelat statis dihapus; teks layar = teks kinetik yang tetap terbaca.
// Kata muncul satu per satu (naik 18 px, kurva reveal), kata aktif berwarna biru #1F4FCC, kontur putih menjaga keterbacaan di pasir dan rumput.
// Tanda baca dari naskah (termasuk "?") ikut tampil; blok y 1230-1450.
import React from 'react';
import { NETRAL, HURUF, TURUNAN } from './bersama/tema';
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
  const aktif = c.words.reduce((a, w, i) => (w.s <= t + 0.02 ? i : a), 0);
  return (
    <div style={{ position: 'absolute', left: 0, top: 1230, width: 1080, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 960, textAlign: 'center', fontFamily: HURUF.keluarga.isi, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.kunci, lineHeight: 1.12, color: NETRAL.tinta,
        WebkitTextStroke: `14px ${NETRAL.putih}`, paintOrder: 'stroke fill' }}>
        {c.words.map((w, i) => {
          const k = mv(t, w.s - 0.03, 0.16, 'reveal');
          const tampil = t >= w.s - 0.03;
          return (
            <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: i < c.words.length - 1 ? 22 : 0, visibility: tampil ? 'visible' : 'hidden', color: i === aktif ? TURUNAN.primer.tekan : NETRAL.tinta, transform: `translateY(${(1 - k) * 18}px)`, position: 'relative', isolation: 'isolate' }}>
              {w.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
