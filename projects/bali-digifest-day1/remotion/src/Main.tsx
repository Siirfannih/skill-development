import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import edl from './edl.json';

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);

// Titik fokus push kamera per shot (persen frame); default tengah.
const FOCUS: Record<number, [number, number]> = {
  5: [40, 30], 9: [40, 30], 12: [72, 32], 20: [36, 35], 24: [30, 40], 25: [50, 32], 11: [62, 50], 19: [35, 50], 29: [70, 45], 33: [60, 40],
};

const Shot: React.FC<{ id: number; dur: number }> = ({ id, dur }) => {
  const fr = useCurrentFrame();
  const t = fr / (dur * FPS);
  // push pelan 0 -> 5 %, arah bergantian (Lantai B10), easing sinus
  const zoomIn = id % 2 === 1;
  const s = interpolate(t, [0, 1], zoomIn ? [1.0, 1.05] : [1.05, 1.0], { easing: Easing.inOut(Easing.sin) });
  const [fx, fy] = FOCUS[id] ?? [50, 50];
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <OffthreadVideo muted src={staticFile(`media/shot_${String(id).padStart(2, '0')}.mp4`)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s})`, transformOrigin: `${fx}% ${fy}%` }} />
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ at: number }> = ({ at }) => {
  const fr = useCurrentFrame();
  const o = interpolate(fr, [f(at) - 1, f(at) + 1, f(at) + 6], [0, 0.85, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ background: '#FFF6EA', opacity: o, mixBlendMode: 'screen' }} />;
};

const LogoCard: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const bgIn = interpolate(t, [0, 0.5], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const lg = interpolate(t, [0.15, 1.0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const drift = interpolate(t, [0, 3.7], [1.0, 1.04]);
  return (
    <AbsoluteFill>
      <Img src={staticFile('media/bg_logo.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover',
        filter: `blur(${14 * bgIn}px) brightness(${1 - 0.62 * bgIn})`, transform: `scale(${1.06 * drift})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,14,46,0.55), rgba(8,14,46,0.82))', opacity: bgIn }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Img src={staticFile('media/logo.png')} style={{ width: 980, opacity: lg, filter: `blur(${(1 - lg) * 12}px)`,
          transform: `scale(${(0.92 + 0.08 * lg) * drift})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const shots = (edl as any).shots as any[];
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {shots.map((s) => (
        <Sequence key={s.id} from={f(s.v0)} durationInFrames={f(s.v1) - f(s.v0)}>
          {s.clip === 'logo' ? <LogoCard /> : <Shot id={s.id} dur={s.v1 - s.v0} />}
        </Sequence>
      ))}
      <Flash at={47.78} />
      <Audio src={staticFile('media/mix.wav')} />
    </AbsoluteFill>
  );
};
