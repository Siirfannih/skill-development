import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SatuLapisan } from './komponen/Visual';
import { Subtitle, TeksKT } from './komponen/Teks';
import type { Adegan, Episode, KT } from './tipe';

const f = (s: number, fps: number) => Math.round(s * fps);

const AdeganView: React.FC<{ a: Adegan; ktBelakang: KT[] }> = ({ a, ktBelakang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = f(a.sampai - a.dari, fps);
  const t = a.dari + frame / fps;
  const inv = a.invert && t >= a.invert[0] && t < a.invert[1];
  const dasar = a.lapisan.filter((l) => l.k !== 'potong');
  const depan = a.lapisan.filter((l) => l.k === 'potong');
  return (
    <AbsoluteFill style={{ filter: inv ? 'invert(1) grayscale(0.4)' : undefined, background: '#000' }}>
      {dasar.map((l, i) => <SatuLapisan key={i} l={l} total={total} detikAdegan={a.sampai - a.dari} />)}
      {ktBelakang.map((k, i) => (
        <Sequence key={`b${i}`} from={f(k.dari - a.dari, fps)} durationInFrames={Math.max(1, f(k.sampai - k.dari, fps))} layout="none">
          <TeksKT k={k} />
        </Sequence>
      ))}
      {depan.map((l, i) => <SatuLapisan key={`d${i}`} l={l} total={total} detikAdegan={a.sampai - a.dari} />)}
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
      {ep.adegan.map((a) => {
        const kb = ep.kt.filter((k) => k.belakang && k.dari >= a.dari - 0.01 && k.dari < a.sampai);
        return (
          <Sequence key={a.id} from={f(a.dari, fps)} durationInFrames={Math.max(1, f(a.sampai - a.dari, fps))}>
            <AdeganView a={a} ktBelakang={kb} />
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
            return Math.max(0, env) * musikGain(t, ep.ucapan, base);
          }} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
