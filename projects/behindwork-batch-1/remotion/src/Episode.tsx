import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SatuLapisan } from './komponen/Visual';
import { CURVE } from './lib/curves';
import { Subtitle, TeksKT } from './komponen/Teks';
import type { Adegan, Episode, KT } from './tipe';

const f = (s: number, fps: number) => Math.round(s * fps);

// Tata potong (D-27): whip-pan (masuk menyapu + blur gerak, adegan lama ikut terlempar), grid-reveal (petak membuka
// diagonal), kilat putih 3 f, atau potong keras. Durasi tumpang: whip 8 f, grid 14 f.
export const TUMPANG: Record<string, number> = { whip: 8, grid: 14 };

const maskGrid = (p: number) => {
  const C = 12, R = 7, w = 1920 / C, h = 1080 / R;
  let r = '';
  for (let i = 0; i < C; i++) for (let j = 0; j < R; j++) {
    const mulai = ((i + j) / (C + R - 2)) * 0.7; // diagonal kiri-atas -> kanan-bawah
    const q = Math.min(1, Math.max(0, (p - mulai) / 0.3));
    if (q > 0) r += `<rect x='${i * w + (w * (1 - q)) / 2}' y='${j * h + (h * (1 - q)) / 2}' width='${w * q + 1}' height='${h * q + 1}' fill='white'/>`;
  }
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'>${r}</svg>")`;
};

const AdeganView: React.FC<{ a: Adegan; ktBelakang: KT[]; keluar?: { jenis: string; arah: number } }> = ({ a, ktBelakang, keluar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = f(a.sampai - a.dari, fps);
  const t = a.dari + frame / fps;
  const inv = a.invert && t >= a.invert[0] && t < a.invert[1];
  const dasar = a.lapisan.filter((l) => l.k !== 'potong');
  const depan = a.lapisan.filter((l) => l.k === 'potong');
  const dir = a.arah === 'kiri' ? -1 : 1;
  let tr: string | undefined; let flt = inv ? 'invert(1) grayscale(0.4)' : '';
  let mask: string | undefined;
  if (a.masuk === 'whip' && frame < TUMPANG.whip) {
    const p = CURVE.land(frame / TUMPANG.whip);
    tr = `translateX(${interpolate(p, [0, 1], [100 * dir, 0])}%)`; flt += ` blur(${interpolate(p, [0, 1], [26, 0])}px)`;
  }
  if (a.masuk === 'grid' && frame < TUMPANG.grid) mask = maskGrid(frame / TUMPANG.grid);
  if (keluar && frame >= total) {
    const p = CURVE.land(Math.min(1, (frame - total) / (TUMPANG[keluar.jenis] ?? 8)));
    if (keluar.jenis === 'whip') { tr = `translateX(${interpolate(p, [0, 1], [0, -45 * keluar.arah])}%)`; flt += ` blur(${interpolate(p, [0, 1], [0, 22])}px)`; }
  }
  const putih = a.masuk === 'putih' && frame < 3 ? [1, 0.85, 0.4][frame] : 0;
  return (
    <AbsoluteFill style={{ filter: flt || undefined, background: '#000', transform: tr, WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}>
      {dasar.map((l, i) => <SatuLapisan key={i} l={l} total={total} detikAdegan={a.sampai - a.dari} tGlobal={t} />)}
      {ktBelakang.map((k, i) => (
        <Sequence key={`b${i}`} from={f(k.dari - a.dari, fps)} durationInFrames={Math.max(1, f(k.sampai - k.dari, fps))} layout="none">
          <TeksKT k={k} />
        </Sequence>
      ))}
      {depan.map((l, i) => <SatuLapisan key={`d${i}`} l={l} total={total} detikAdegan={a.sampai - a.dari} tGlobal={t} />)}
      {putih ? <AbsoluteFill style={{ background: '#FFFFFF', opacity: putih }} /> : null}
    </AbsoluteFill>
  );
};

// Musik di-duck dengan automation (Lantai E25): turun saat ucapan, naik halus di jeda >= 0,3 dtk, ramp >= 250 ms.
const musikGain = (t: number, ucapan: [number, number][], base: number) => {
  const duck = 0.42; // ±-7,5 dB di bawah level jeda
  let g = 1;
  for (const [a, b] of ucapan) {
    if (t >= a - 0.25 && t <= b + 0.3) {
      const masuk = interpolate(t, [a - 0.25, a], [1, duck], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      const keluar = interpolate(t, [b, b + 0.3], [duck, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      g = Math.min(g, t < a ? masuk : t > b ? keluar : duck);
    }
  }
  return base * g;
};

export const EpisodeView: React.FC<{ ep: Episode }> = ({ ep }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {ep.adegan.map((a, i) => {
        const kb = ep.kt.filter((k) => k.belakang && k.dari >= a.dari - 0.01 && k.dari < a.sampai);
        const nx = ep.adegan[i + 1];
        const ov = nx && nx.masuk && TUMPANG[nx.masuk] ? TUMPANG[nx.masuk] : 0; // adegan lama tetap tampil di bawah selama transisi
        const keluar = ov ? { jenis: nx.masuk as string, arah: nx.arah === 'kiri' ? -1 : 1 } : undefined;
        return (
          <Sequence key={a.id} from={f(a.dari, fps)} durationInFrames={Math.max(1, f(a.sampai - a.dari, fps) + ov)}>
            <AdeganView a={a} ktBelakang={kb} keluar={keluar} />
          </Sequence>
        );
      })}
      {ep.kt.filter((k) => !k.belakang).map((k, i) => (
        <Sequence key={`kt${i}`} from={f(k.dari, fps)} durationInFrames={Math.max(1, f(k.sampai - k.dari, fps))}>
          <TeksKT k={k} />
        </Sequence>
      ))}
      {ep.sub.map((s, i) => (
        <Sequence key={`s${i}`} from={f(s.dari, fps)} durationInFrames={Math.max(1, f(s.sampai - s.dari, fps))}>
          <Subtitle teks={s.teks} />
        </Sequence>
      ))}
      <Audio src={staticFile(ep.vo)} />
      {ep.sfx.map((c, i) => {
        const panjang = c.sampai ? Math.max(1, f(c.sampai - c.t, fps)) : undefined;
        return (
          <Sequence key={`x${i}`} from={Math.max(0, f(c.t, fps))} durationInFrames={panjang} layout="none">
            <Audio src={staticFile(c.file)} volume={(fr) => {
              const g = Math.pow(10, (c.gain ?? -12) / 20);
              if (!panjang) return g;
              const sisa = panjang - fr; // fade kosinus 6 f di ujung potongan (aturan cakupan SFX)
              return sisa < 6 ? g * (0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, sisa) / 6)) : g;
            }} playbackRate={c.laju ?? 1} startFrom={c.mulaiFile ? f(c.mulaiFile, fps) : undefined} />
          </Sequence>
        );
      })}
      {ep.musik.map((m, i) => (
        <Sequence key={`m${i}`} from={f(m.dari, fps)} durationInFrames={Math.max(1, f(m.sampai - m.dari, fps))} layout="none">
          <Audio src={staticFile(m.file)} startFrom={m.mulaiFile ? f(m.mulaiFile, fps) : undefined} volume={(fr) => {
            const t = m.dari + fr / fps;
            const base = Math.pow(10, m.gain / 20);
            const fi = m.fadeIn ?? 0.6, fo = m.fadeOut ?? 0.8;
            const env = Math.min(1, (t - m.dari) / fi, (m.sampai - t) / fo);
            const hening = (ep.sunyi ?? []).reduce((g, [a, b]) => Math.min(g, t < a - 0.15 || t > b + 0.25 ? 1 : t < a ? (a - t) / 0.15 : t > b ? (t - b) / 0.25 : 0), 1);
            return Math.max(0, env) * musikGain(t, ep.ucapan, base) * hening;
          }} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
