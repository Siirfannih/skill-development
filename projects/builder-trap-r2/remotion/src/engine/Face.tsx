// Sisipan wajah dari face_edit.mp4 (BRIEF §Wajah). Video TIDAK dibungkus Sequence: waktu video = frame timeline,
// jadi lip-sync otomatis. Jangan taruh <Face> di dalam <Sequence from=...>.
import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';

/** Pusat dalam px sumber 1920×1080 dan skala relatif terhadap frame penuh. */
export const FACE_PRESETS = {
  F1: { s: 2.1, cx: 905, cy: 560 }, // close-up mata+mulut
  F2: { s: 1.7, cx: 960, cy: 760 }, // mulut + tangan
  F3: { s: 1.45, cx: 1150, cy: 600 }, // wajah sepertiga kiri, dinding kosong kanan
  F4: { s: 1.22, cx: 960, cy: 600 }, // medium bersih
} as const;
export type FacePreset = keyof typeof FACE_PRESETS;
export type FaceCrop = { s: number; cx: number; cy: number };

/** Grade per babak: terang (babak 1–2), gelap (belokan), bersih (babak 4, paling hangat). */
export const FACE_GRADE = {
  terang: 'contrast(1.08) saturate(0.86) sepia(0.07) brightness(1.04)',
  gelap: 'contrast(1.14) saturate(0.55) brightness(0.7) hue-rotate(-6deg)',
  gelapHangat: 'contrast(1.12) saturate(0.7) sepia(0.12) brightness(0.74)',
  bersih: 'contrast(1.06) saturate(0.95) sepia(0.1) brightness(1.08)',
} as const;
export type FaceGrade = keyof typeof FACE_GRADE;

export const Face: React.FC<{
  preset?: FacePreset;
  crop?: Partial<FaceCrop>; // menimpa preset (mis. geser pusat bila kepala bergerak)
  w?: number;
  h?: number;
  grade?: FaceGrade;
  style?: React.CSSProperties;
}> = ({ preset = 'F4', crop, w = 1920, h = 1080, grade = 'terang', style }) => {
  const c = { ...FACE_PRESETS[preset], ...crop };
  const base = Math.max(w / 1920, h / 1080);
  const sc = base * c.s;
  const vw = 1920 * sc, vh = 1080 * sc;
  // pusat sumber ke tengah wadah, lalu dijepit supaya tidak ada tepi kosong
  const left = Math.min(0, Math.max(w - vw, w / 2 - c.cx * sc));
  const top = Math.min(0, Math.max(h - vh, h / 2 - c.cy * sc));
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, overflow: 'hidden', ...style }}>
      <OffthreadVideo
        src={staticFile('face_edit.mp4')}
        muted
        style={{ position: 'absolute', left, top, width: vw, height: vh, filter: FACE_GRADE[grade], maxWidth: 'none' }}
      />
    </div>
  );
};
