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
  // r3a (REVIEW-v1-self F-v1-03, RESEP: mata / mulut + tangan / profil berganti). Kepala di sumber ±x 700–1200, y 280–700.
  M: { s: 2.7, cx: 1045, cy: 527 }, // mata di sepertiga atas, wajah kiri-tengah, dinding kanan untuk teks
  T: { s: 2.2, cx: 1180, cy: 720 }, // mulut + tangan; mata di luar frame, dinding kanan atas untuk teks
  P: { s: 1.9, cx: 1077, cy: 500 }, // sisi: wajah di sepertiga kiri, ruang dinding kanan ±700 px
} as const;
export type FacePreset = keyof typeof FACE_PRESETS;
export type FaceCrop = { s: number; cx: number; cy: number };

/** Grade per babak: terang (babak 1–2), gelap (belokan), bersih (babak 4, paling hangat). */
export const FACE_GRADE = {
  // r3a: kontras naik, hangat, hitam tidak abu (kontras berporos 50 % menekan hitam; brightness tidak mengangkatnya)
  terang: 'contrast(1.16) saturate(0.9) sepia(0.13) brightness(1.01)',
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
  // crop besar (skala layar ≥ 2) dipertajam ringan (unsharp 3×3) supaya tidak lembek
  const sharp = sc >= 2 ? Math.min(0.5, 0.22 * (sc - 1.2)) : 0;
  const fid = `sharp-${Math.round(sharp * 100)}`;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, overflow: 'hidden', filter: sharp ? `url(#${fid})` : undefined, ...style }}>
      {sharp ? (
        <svg width={0} height={0} style={{ position: 'absolute' }}>
          <filter id={fid} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feConvolveMatrix order="3" preserveAlpha="true" edgeMode="duplicate"
              kernelMatrix={`0 ${-sharp} 0 ${-sharp} ${1 + 4 * sharp} ${-sharp} 0 ${-sharp} 0`} />
          </filter>
        </svg>
      ) : null}
      <OffthreadVideo
        src={staticFile('face_edit.mp4')}
        muted
        style={{ position: 'absolute', left, top, width: vw, height: vh, filter: FACE_GRADE[grade], maxWidth: 'none' }}
      />
    </div>
  );
};
