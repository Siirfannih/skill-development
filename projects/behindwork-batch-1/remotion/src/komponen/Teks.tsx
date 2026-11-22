import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CURVE } from '../lib/curves';
import { huruf, ukuran, warna } from '../tema';
import type { KT } from '../tipe';

// Kinetic typography. Satu peran = satu gerak di seluruh video (Lantai A9a):
// r1/lead  = kata muncul per kata di detiknya, naik 8 px dalam 4 f (CURVE.reveal), ditumpuk per baris (kartu 92 T1)
// r2/r6    = hantam: skala 1,14 -> 1 + blur gerak 6 -> 0 px dalam 7 f (CURVE.land)
// kotak    = kotak sorot merah melebar dari kiri 6 f, teks menyusul (kartu 48 T1)
// giant    = tahun raksasa, digit berputar dari angka asal ke angka tujuan lalu mendarat (kartu 92 T2)
// Keluar: potong di detik `sampai` (tanpa fade), seperti kiblat.
const warnaDari = (w?: KT['warna']) => (w ? (warna as Record<string, string>)[w] : warna.putih);

export const TeksKT: React.FC<{ k: KT }> = ({ k }) => {
  const frame = useCurrentFrame(); // lokal: 0 = k.dari
  const { fps } = useVideoConfig();
  const t = frame / fps + k.dari;
  const size = k.ukuran ?? (ukuran as Record<string, number>)[k.peran === 'kotak' ? 'r1' : k.peran];
  const anchorX = k.jangkar === 'tengah' ? '-50%' : k.jangkar === 'kanan' ? '-100%' : '0%';
  const base: React.CSSProperties = {
    position: 'absolute', left: k.x, top: k.y, transform: `translateX(${anchorX})`, fontFamily: huruf, color: warnaDari(k.warna),
    whiteSpace: 'nowrap', lineHeight: 1.02, textShadow: k.bayang ? '0 2px 22px rgba(0,0,0,0.42)' : undefined,
    textAlign: k.jangkar === 'tengah' ? 'center' : k.jangkar === 'kanan' ? 'right' : 'left',
  };

  if (k.peran === 'r1' || k.peran === 'lead') {
    const baris: { w: string; t: number; redup?: boolean }[][] = [];
    (k.kata ?? []).forEach((x) => { const b = x.baris ?? 0; (baris[b] ||= []).push(x); });
    return (
      <div style={{ ...base, fontSize: size, fontWeight: k.peran === 'lead' ? 500 : 700, letterSpacing: k.peran === 'lead' ? '-0.015em' : '-0.022em' }}>
        {baris.map((b, i) => (
          <div key={i}>
            {b.map((x, j) => {
              const lf = (t - x.t) * fps;
              const p = CURVE.reveal(Math.min(1, Math.max(0, lf / 4)));
              return (
                <span key={j} style={{ display: 'inline-block', opacity: lf < 0 ? 0 : p, transform: `translateY(${interpolate(p, [0, 1], [8, 0])}px)`, color: x.redup ? warna.redup : undefined, marginRight: '0.24em' }}>
                  {x.w}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (k.peran === 'kotak') {
    const pb = CURVE.reveal(Math.min(1, frame / 6));
    const pt = Math.min(1, Math.max(0, (frame - 3) / 3));
    return (
      <div style={{ ...base, fontSize: size, fontWeight: 700, letterSpacing: '-0.022em' }}>
        <div style={{ position: 'absolute', inset: 0, background: warna.aksen, transform: `scaleX(${pb})`, transformOrigin: 'left center' }} />
        <div style={{ position: 'relative', padding: '0.12em 0.3em 0.16em', opacity: pt, color: warna.putih }}>{k.teks}</div>
      </div>
    );
  }

  if (k.peran === 'giant' && k.angka) {
    const a = k.angka;
    const p = Math.min(1, frame / Math.max(1, a.durasi * fps));
    const v = Math.round(interpolate(CURVE.heavy(p), [0, 1], [a.dari, a.ke]));
    const land = frame >= a.durasi * fps ? CURVE.land(Math.min(1, (frame - a.durasi * fps) / 8)) : 0;
    const sc = p < 1 ? 1 : interpolate(land, [0, 1], [1.0, 1.1]);
    const blur = p < 1 ? 2.5 : 0;
    return (
      <div style={{ ...base, fontSize: size, fontWeight: 700, letterSpacing: '-0.06em', lineHeight: 0.8, transform: `translateX(${anchorX}) scale(${sc})`, transformOrigin: k.jangkar === 'tengah' ? '50% 50%' : '0% 50%', filter: `blur(${blur}px)`, fontVariantNumeric: 'tabular-nums' }}>
        {a.format === 'jam' ? `${String(((v % 24) + 24) % 24).padStart(2, '0')}:00` : a.format === 'detik' ? `0:${String(v).padStart(2, '0')}` : a.format === 'usd' ? '$' + v.toLocaleString('en-US') : v}
      </div>
    );
  }

  // r2 / r6 / giant statis: hantam
  const p = CURVE.land(Math.min(1, frame / 7));
  const sc = interpolate(p, [0, 1], [1.14, 1]);
  const bl = interpolate(p, [0, 1], [6, 0]);
  const txt = k.teks ?? '';
  const parts = k.aksen && txt.includes(k.aksen) ? txt.split(k.aksen) : null;
  return (
    <div style={{ ...base, fontSize: size, fontWeight: 700, letterSpacing: k.peran === 'r6' || k.peran === 'giant' ? '-0.04em' : '-0.03em', lineHeight: 0.92, opacity: Math.min(1, frame / 2), transform: `translateX(${anchorX}) scale(${sc})`, transformOrigin: k.jangkar === 'tengah' ? '50% 50%' : k.jangkar === 'kanan' ? '100% 50%' : '0% 50%', filter: `blur(${bl}px)` }}>
      {parts ? (<>{parts[0]}<span style={{ color: warna.aksen }}>{k.aksen}</span>{parts[1]}</>) : txt}
    </div>
  );
};

export const Subtitle: React.FC<{ teks: string }> = ({ teks }) => (
  // Subtitle Indonesia statis (D-15, D-21): perannya beda dengan KT, jadi gayanya tenang dan selalu di tempat yang sama.
  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 44, display: 'flex', justifyContent: 'center' }}>
    <div style={{ background: warna.pitaSub, color: warna.putih, fontFamily: huruf, fontWeight: 500, fontSize: ukuran.sub, lineHeight: 1.28, padding: '10px 22px 12px', borderRadius: 6, textAlign: 'center', maxWidth: 1400 }}
      dangerouslySetInnerHTML={{ __html: teks }} />
  </div>
);
