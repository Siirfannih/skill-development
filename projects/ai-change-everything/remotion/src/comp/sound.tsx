// Sound design di dalam Remotion: setiap SFX ditaruh pada frame lokal adegan yang sama dengan visualnya,
// jadi timing ikut otomatis bila VO final mengganti timeline (rule 37: SFX lahir bersama objeknya).
import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';
import vo from '../lib/vo.json';
import {FPS} from '../lib/theme';

export const db = (d: number) => Math.pow(10, d / 20);

export type Cue = {at: number; s: string; db?: number; len?: number};

/** Satu bunyi. `s` = nama file di public/sfx2 (sudah dinormalisasi −16 LUFS, LPF untuk yang tajam). */
export const Sfx: React.FC<Cue> = ({at, s, db: d = -12, len = 75}) =>
  at < 0 ? null : (
    <Sequence from={Math.round(at)} durationInFrames={len} layout="none">
      <Audio src={staticFile(`sfx2/${s}.wav`)} volume={db(d)} />
    </Sequence>
  );

export const Cues: React.FC<{list: (Cue | false | undefined)[]}> = ({list}) => (
  <>
    {list.filter(Boolean).map((c, i) => (
      <Sfx key={i} {...(c as Cue)} />
    ))}
  </>
);

/** Rangkaian pop bernada naik untuk elemen yang muncul bersamaan (bukan senapan mesin). */
export const cluster = (at: number, n: number, step = 3, d = -16, s = 'pop'): Cue[] =>
  Array.from({length: n}, (_, i) => ({at: at + i * step, s, db: d - (i % 2) * 2}));

// ── ducking musik: turun ±9 dB saat VO berbicara (attack 2 f, release 8 f) ──
const words = (vo as any).words as {s: number; e: number}[];
const segs = (vo as any).segments as {id: string; s: number; e: number}[];
const total = Math.ceil((vo as any).duration * FPS);
const speech = new Float32Array(total + 1);
for (const w of words) for (let f = Math.floor(w.s * FPS) - 2; f <= Math.ceil(w.e * FPS) + 8; f++) if (f >= 0 && f <= total) speech[f] = 1;
for (const s of segs.filter((x) => x.id === 'jensen' || x.id === 'altman'))
  for (let f = Math.floor(s.s * FPS) - 2; f <= Math.ceil(s.e * FPS) + 6; f++) if (f >= 0 && f <= total) speech[f] = 1;
const smooth = (() => {
  const out = new Float32Array(total + 1);
  let v = 0;
  for (let f = 0; f <= total; f++) {
    const t = speech[f];
    v += (t - v) * (t > v ? 0.5 : 0.12);
    out[f] = v;
  }
  return out;
})();
export const duck = (globalFrame: number) => 1 - 0.55 * smooth[Math.max(0, Math.min(total, globalFrame))];

/** Satu cue musik per babak; fade masuk 3 f (tidak ada fade pelan), keluar 8 f atau dipotong keras. */
export const MusicCue: React.FC<{src: string; from: number; to: number; base?: number; hardIn?: boolean; tailOut?: number; skip?: number}> = ({src, from, to, base = -13, hardIn = true, tailOut = 8, skip = 0}) => (
  <Sequence from={from} durationInFrames={to - from + tailOut} layout="none">
    <Audio
      src={staticFile(`music/${src}.mp3`)}
      startFrom={Math.round(skip * FPS)}
      volume={(f) =>
        db(base) *
        duck(from + f) *
        interpolate(f, [0, hardIn ? 2 : 10, to - from, to - from + Math.max(1, tailOut)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      }
    />
  </Sequence>
);
