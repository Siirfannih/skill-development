import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import edl from './edl.json';
import { Kinetic6 } from './Kinetic6';

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);

// Titik fokus push kamera per shot (persen frame); default tengah.
const FOCUS: Record<number, [number, number]> = {};

const Shot: React.FC<{ id: number; dur: number; punch?: number; porigin?: number }> = ({ id, dur, punch, porigin }) => {
  const fr = useCurrentFrame();
  const t = fr / (dur * FPS);
  // push pelan 0 -> 5 %, arah bergantian (Lantai B10), easing sinus
  const zoomIn = id % 2 === 1;
  // v5: wajah pembicara = punch-in bergantian (1,0 / 1,1) menutup jump cut, dorong kecil 2 %; b-roll tetap push 0 <-> 5 %
  const s = punch !== undefined
    ? punch * interpolate(t, [0, 1], [1.0, 1.02], { easing: Easing.inOut(Easing.sin) })
    : interpolate(t, [0, 1], zoomIn ? [1.0, 1.05] : [1.05, 1.0], { easing: Easing.inOut(Easing.sin) });
  const [fx, fy] = FOCUS[id] ?? [50, 50];
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <OffthreadVideo muted src={staticFile(`media/shot_${String(id).padStart(2, '0')}.mp4`)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s})`,
          // punch-in dari tepi kanan: wajah bergeser ke kiri saat diperbesar, sisi kanan tetap lega untuk teks
          transformOrigin: punch !== undefined ? `${(porigin ?? 1) * 100}% 45%` : `${fx}% ${fy}%` }} />
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ at: number }> = ({ at }) => {
  const fr = useCurrentFrame();
  const o = interpolate(fr, [f(at) - 1, f(at) + 1, f(at) + 6], [0, 0.25, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
          {s.clip === 'logo' ? <LogoCard /> : <Shot id={s.id} dur={s.v1 - s.v0} punch={s.talk ? s.punch : undefined} porigin={s.porigin} />}
        </Sequence>
      ))}
      <Flash at={(edl as any).chorus} />
      <Kinetic6 />
      <Audio src={staticFile('media/mix.wav')} />
    </AbsoluteFill>
  );
};
