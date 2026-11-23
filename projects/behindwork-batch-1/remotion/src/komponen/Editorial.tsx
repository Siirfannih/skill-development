import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CURVE } from '../lib/curves';
import { grade, huruf, warna, W, H } from '../tema';
import type { Lapisan, Titik } from '../tipe';

// Spatial anchor (D-24): satu aset, kamera virtual berpindah antar titik fokus dengan pegas ketat (cepat masuk,
// sedikit mengendap), lalu drift pelan sampai titik berikutnya. Bukan interpolasi linear / ease standar (D-27).
const PEGAS = { damping: 26, stiffness: 150, mass: 1 };

export const posKamera = (jalur: Titik[], t: number, fps: number) => {
  let i = 0;
  for (let k = 0; k < jalur.length; k++) if (jalur[k].t <= t) i = k;
  const cur = jalur[i];
  const prev = i > 0 ? jalur[i - 1] : cur;
  const p = i === 0 || t < cur.t ? 1 : spring({ frame: Math.round((t - cur.t) * fps), fps, config: PEGAS });
  const L = (a: number, b: number) => a + (b - a) * p;
  const drift = 1 + (cur.drift ?? 0.012) * Math.max(0, t - Math.max(cur.t, 0));
  return { fx: L(prev.fx, cur.fx), fy: L(prev.fy, cur.fy), s: L(prev.s, cur.s) * drift, ax: L(prev.ax ?? 0.5, cur.ax ?? 0.5), ay: L(prev.ay ?? 0.5, cur.ay ?? 0.5) };
};

// Geometri cover + titik fokus -> kotak gambar di layar (dipakai juga oleh cek_komposisi.py dengan rumus yang sama).
export const kotakJangkar = (iw: number, ih: number, k: { fx: number; fy: number; s: number; ax: number; ay: number }) => {
  const c = Math.max(W / iw, H / ih) * Math.max(1, k.s);
  const dw = iw * c, dh = ih * c;
  const left = Math.min(0, Math.max(W - dw, k.ax * W - k.fx * dw));
  const top = Math.min(0, Math.max(H - dh, k.ay * H - k.fy * dh));
  return { left, top, dw, dh };
};

export const Jangkar: React.FC<{ l: Extract<Lapisan, { k: 'jangkar' }>; tGlobal: number }> = ({ l, tGlobal }) => {
  const { fps } = useVideoConfig();
  const b = kotakJangkar(l.iw, l.ih, posKamera(l.jalur, tGlobal, fps));
  let f = grade[l.grade ?? 'nat'];
  if (l.luntur !== undefined && tGlobal >= l.luntur) {
    const p = CURVE.land(Math.min(1, (tGlobal - l.luntur) / 0.35));
    f = `${f} saturate(${interpolate(p, [0, 1], [1, 0])}) brightness(${interpolate(p, [0, 1], [1, 0.62])})`;
  }
  if (l.padam !== undefined && tGlobal >= l.padam) {
    const p = CURVE.land(Math.min(1, (tGlobal - l.padam) / 0.4)); // menggelap ke kanvas hitam pekat
    f = `${f} brightness(${interpolate(p, [0, 1], [1, 0.04])})`;
  }
  const st: React.CSSProperties = { position: 'absolute', left: b.left, top: b.top, width: b.dw, height: b.dh, filter: f, objectFit: 'fill' };
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {l.video
        ? <OffthreadVideo src={staticFile(l.src)} startFrom={Math.round((l.mulaiSumber ?? 0) * fps)} playbackRate={l.laju ?? 1} muted style={st} />
        : <Img src={staticFile(l.src)} style={st} />}
    </AbsoluteFill>
  );
};

export const Kanvas: React.FC<{ warnaK: 'terang' | 'gelap' }> = ({ warnaK }) => (
  <AbsoluteFill style={{ background: warnaK === 'terang' ? warna.terang : warna.gelap }} />
);

export const Scrim: React.FC<{ sisi: 'kiri' | 'kanan' | 'atas' | 'bawah' | 'rata'; kuat?: number }> = ({ sisi, kuat = 0.62 }) => {
  if (sisi === 'rata') return <AbsoluteFill style={{ background: `rgba(0,0,0,${kuat * 0.55})` }} />;
  const arah = { kiri: 'to right', kanan: 'to left', atas: 'to bottom', bawah: 'to top' }[sisi];
  return <AbsoluteFill style={{ background: `linear-gradient(${arah}, rgba(0,0,0,${kuat}) 0%, rgba(0,0,0,${kuat * 0.55}) 38%, rgba(0,0,0,0) 72%)` }} />;
};

// Halaman artikel / ensiklopedia dibangun ulang dengan HTML (D-29): teks asli dari sumber, kutipan disorot stabilo
// yang menyapu dari kiri di detiknya. Kamera (jalur) menyorot bagian halaman; koordinat 0-1 terhadap halaman 1920x1080*2.
const HAL_W = W, HAL_H = H * 2;
export const Artikel: React.FC<{ l: Extract<Lapisan, { k: 'artikel' }>; tGlobal: number }> = ({ l, tGlobal }) => {
  const { fps } = useVideoConfig();
  const k = l.jalur ? posKamera(l.jalur, tGlobal, fps) : { fx: 0.5, fy: 0.25, s: 1, ax: 0.5, ay: 0.5 };
  const sc = k.s; // halaman selebar layar; s = zoom
  const left = Math.min(0, Math.max(W - HAL_W * sc, k.ax * W - k.fx * HAL_W * sc));
  const top = Math.min(0, Math.max(H - HAL_H * sc, k.ay * H - k.fy * HAL_H * sc));
  const wiki = l.gaya === 'wiki';
  const sorot = (pi: number, txt: string) => {
    const s = (l.sorot ?? []).find((x) => x.p === pi && txt.includes(x.teks));
    if (!s) return <>{txt}</>;
    const [a, b] = txt.split(s.teks);
    const p = CURVE.reveal(Math.min(1, Math.max(0, (tGlobal - s.t) / 0.45)));
    return (
      <>
        {a}
        <span style={{ position: 'relative', whiteSpace: 'normal' }}>
          <span style={{ position: 'absolute', left: -6, right: -6, top: '0.08em', bottom: '-0.02em', background: warna.stabilo, transform: `scaleX(${p})`, transformOrigin: 'left center', zIndex: 0, borderRadius: 3 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>{s.teks}</span>
        </span>
        {b}
      </>
    );
  };
  return (
    <AbsoluteFill style={{ background: '#FFFFFF', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left, top, width: HAL_W, height: HAL_H, transform: `scale(${sc})`, transformOrigin: '0 0', background: '#FFFFFF', fontFamily: huruf, color: '#202122' }}>
        <div style={{ height: 96, borderBottom: '1px solid #e4e4e4', display: 'flex', alignItems: 'center', padding: '0 300px', fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em' }}>{l.situs}</div>
        <div style={{ padding: '70px 300px 0' }}>
          <div style={{ fontSize: wiki ? 72 : 84, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, borderBottom: wiki ? '1px solid #a2a9b1' : 'none', paddingBottom: 18 }}>{l.judul}</div>
          {l.meta ? <div style={{ fontSize: 28, color: '#54595d', marginTop: 18 }}>{l.meta}</div> : null}
          {l.paragraf.map((pg, i) => (
            <p key={i} style={{ fontSize: 40, lineHeight: 1.55, fontWeight: 500, margin: '40px 0 0' }}>{sorot(i, pg)}</p>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Jendela obrolan (IRC / aplikasi kerja) gaya Apple: polos, satu bayangan tipis, pesan masuk di detiknya.
export const Chat: React.FC<{ l: Extract<Lapisan, { k: 'chat' }>; tGlobal: number }> = ({ l, tGlobal }) => {
  const irc = l.gaya === 'irc';
  return (
    <AbsoluteFill style={{ background: warna.terang, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 1180, height: 760, background: irc ? '#0E0E10' : '#FFFFFF', borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', fontFamily: huruf }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 26px', borderBottom: irc ? '1px solid #222' : '1px solid #ececec' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
          <div style={{ marginLeft: 18, fontSize: 26, fontWeight: 700, color: irc ? '#d0d0d0' : '#1d1d1f' }}>{l.judul}</div>
        </div>
        <div style={{ padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {l.pesan.map((m, i) => {
            const p = CURVE.reveal(Math.min(1, Math.max(0, (tGlobal - m.t) / 0.2)));
            if (tGlobal < m.t) return null;
            return (
              <div key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)`, fontSize: irc ? 34 : 36, lineHeight: 1.35, color: irc ? '#e8e8e8' : '#1d1d1f', fontFamily: irc ? 'monospace' : huruf }}>
                <span style={{ fontWeight: 700, color: irc ? '#7FD1FF' : '#1d1d1f' }}>{irc ? `<${m.siapa}>` : m.siapa}</span>{irc ? ' ' : <br />}
                <span style={{ fontWeight: 500, color: irc ? '#e8e8e8' : '#3a3a3c' }}>{m.teks}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Iklan baris (gaya papan iklan polos): judul, baris isi muncul satu per satu.
export const Iklan: React.FC<{ l: Extract<Lapisan, { k: 'iklan' }>; tGlobal: number }> = ({ l, tGlobal }) => (
  <AbsoluteFill style={{ background: '#FFFFFF', padding: '150px 300px', fontFamily: huruf, color: '#1d1d1f' }}>
    <div style={{ fontSize: 30, color: '#7a00e6', fontWeight: 700 }}>classifieds · gigs</div>
    <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 24, lineHeight: 1.08 }}>{l.judul}{l.harga ? <span style={{ color: warna.aksen }}> {l.harga}</span> : null}</div>
    {l.baris.map((b, i) => {
      const t0 = l.t + 0.5 + i * 0.45;
      const p = CURVE.reveal(Math.min(1, Math.max(0, (tGlobal - t0) / 0.25)));
      return <div key={i} style={{ fontSize: 44, marginTop: 30, opacity: p, fontWeight: 500, lineHeight: 1.4 }}>{b}</div>;
    })}
  </AbsoluteFill>
);
