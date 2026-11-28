import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {NETRAL, HURUF, TURUNAN} from './tema';
import {CURVE} from '../../lib/curves';

export type Kata = {w: string; t: number; k?: boolean};
export type KtItem = {peran: string; kode: string; dari: number; sampai: number; x: number; y: number; ukuran: number; teks: string; kata: Kata[]; jangkar: string};

// Teks kinetik (v3, keputusan Irfan 26 Nov 01:18: subtitle pelat K-05 dihapus). Satu lapisan teks:
// - hero (cap pembuka dan "Soalnya gini"): distempel T04 scale-down settle 300%->100%;
// - narasi: tiap kata masuk di onset suaranya (T19 word-pop: naik + skala .86->1), kata yang sedang diucapkan #1F4FCC,
//   satu kata kunci per beat masuk dengan hentakan (T03 slam) dan lebih besar;
// - tanpa pelat: terbaca lewat isian tinta + garis luar putih tebal + bayangan jatuh lembut (tanpa glow).
const GARIS = {WebkitTextStroke: `16px ${NETRAL.putih}`, paintOrder: 'stroke fill' as const, strokeLinejoin: 'round' as const};
const BAYANGAN_TEKS = 'drop-shadow(0 6px 8px rgba(58,51,46,.30))';

export const Caption: React.FC<{kt: KtItem[]}> = ({kt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const k = kt.find((e) => t >= e.dari && t < e.sampai);
  if (!k) return null;
  const lf = (t - k.dari) * fps;
  const sisa = (k.sampai - t) * fps;
  if (k.peran === 'r6') {
    const p = Math.min(1, lf / 9);
    const e = CURVE.reveal(p);
    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: k.y, textAlign: 'center', whiteSpace: 'pre-line', fontFamily: HURUF.keluarga.judul, fontWeight: HURUF.bobot.kunci, fontSize: HURUF.ukuran.hero, lineHeight: 0.95, letterSpacing: '-0.04em', color: NETRAL.tinta, ...GARIS, filter: BAYANGAN_TEKS, transform: `scale(${3 - 2 * e})`, transformOrigin: '50% 50%', opacity: p > 0 ? 1 : 0}}>
        {k.teks}
      </div>
    );
  }
  const aktif = k.kata.reduce((a, w, i) => (t >= w.t ? i : a), 0);
  const keluar = sisa < 3 ? CURVE.leave(1 - Math.max(0, sisa) / 3) : 0;   // keluar cepat 3 f: turun dan mengecil, tanpa fade
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: k.y, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.26em', fontSize: k.ukuran, whiteSpace: 'nowrap', transform: `translateY(${keluar * 22}px) scale(${1 - 0.06 * keluar})`, filter: BAYANGAN_TEKS}}>
      {k.kata.map((w, i) => {
        const wl = (t - w.t) * fps;                       // frame sejak onset kata
        const p = Math.min(1, Math.max(0, (wl + 1) / (w.k ? 6 : 4)));
        const e = w.k ? CURVE.reveal(p) : CURVE.land(p);
        const skala = w.k ? 1.6 - 0.6 * e : 0.86 + 0.14 * e;
        const naik = (1 - e) * (w.k ? 0 : 26);
        const rot = w.k ? (1 - e) * -5 : 0;
        const warna = w.k || i === aktif ? TURUNAN.primer.tekan : NETRAL.tinta;
        return (
          <span key={i} style={{display: 'inline-block', opacity: wl >= -1 ? 1 : 0, fontFamily: HURUF.keluarga.judul, fontWeight: HURUF.bobot.kunci, fontSize: w.k ? k.ukuran * 1.35 : k.ukuran, letterSpacing: '-0.022em', lineHeight: 1, color: warna, transform: `translateY(${naik}px) rotate(${rot}deg) scale(${skala})`, transformOrigin: '50% 80%', ...GARIS}}>
            {w.w}
          </span>
        );
      })}
    </div>
  );
};
