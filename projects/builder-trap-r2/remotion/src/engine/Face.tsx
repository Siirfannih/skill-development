// Sisipan wajah (BRIEF §Wajah). r5: face_edit_v5.mp4 diputar di frame NYATA timeline baru (useRealFrame), bukan frame
// adegan yang di-warp, jadi lip-sync dengan mix_v5.wav. Jangan taruh <Face> di dalam <Sequence from=...>.
import React from 'react';
import EDIT from '../../../edit/v5/map.json';
import { DUR_V5 } from './timewarp';
import { OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { useRealFrame } from './realframe';

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
// Exact joins from the audio/video edit map; animation knots deliberately use eased ramps.
export const FACE_JUMPS = EDIT.removed.map(([start], i, cuts) =>
  Math.round((start - cuts.slice(0, i).reduce((sum, [a, b]) => sum + b - a, 0)) * EDIT.fps)
);
/** punch-in di titik lompatan: +10 % skala crop per tingkat. Lompatan berganti masuk/keluar (1,0 ↔ 1,1); lompatan yang
 *  berdekatan (< FACE_JUMP_NEAR frame dari lompatan sebelumnya dalam sisipan yang sama) LANJUT MASUK (1,1 → 1,2), tidak
 *  keluar-masuk (putusan Sutradara r8 Q2, mis. f2406 → f2414). */
export const FACE_JUMP_PUNCH = 0.1;
export const FACE_JUMP_NEAR = 15; // < 0,5 dtk
/** tingkat punch pada frame nyata `real` untuk sisipan yang mulai di `from` */
export const faceJumpLevel = (from: number, real: number) => {
  let level = 0, prev = -Infinity;
  for (const j of FACE_JUMPS) {
    if (j <= from || j > real) continue;
    level = j - prev < FACE_JUMP_NEAR ? level + 1 : level > 0 ? 0 : 1;
    prev = j;
  }
  return level;
};
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
  /** r8: frame NYATA awal sisipan wajah ini. Bila diisi, tiap lompatan FACE_JUMPS sesudahnya mengganti ukuran crop
   *  (punch-in/out 10 %) supaya terbaca sebagai potongan editor, bukan kepala meloncat. */
  jumpFrom?: number;
  /** r8: [a, v] = mulai frame nyata a tampilkan frame video v (beku), mis. menahan frame terakhir sebelum lompatan
   *  video yang jatuh 2 f sebelum cut adegan */
  hold?: [number, number];
}> = ({ preset = 'F4', crop, w = 1920, h = 1080, grade = 'terang', style, jumpFrom, hold }) => {
  const real = useRealFrame();
  const cur = useCurrentFrame();
  const c = { ...FACE_PRESETS[preset], ...crop };
  if (jumpFrom !== undefined) c.s *= 1 + FACE_JUMP_PUNCH * faceJumpLevel(jumpFrom, real);
  const vf = hold && real >= hold[0] ? hold[1] : real;
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
      {/* r5: face_edit_v5.mp4 di frame NYATA (dipotong di rentang yang sama dengan suara v5 → bibir sinkron) */}
      {/* Sequence menggeser frame adegan (lama) ke frame nyata: di dalamnya useCurrentFrame() = real */}
      <Sequence from={cur - Math.max(0, Math.min(vf, DUR_V5 - 1))} layout="none">
        <OffthreadVideo
          src={staticFile('face_edit_v5.mp4')}
          muted
          style={{ position: 'absolute', left, top, width: vw, height: vh, filter: FACE_GRADE[grade], maxWidth: 'none' }}
        />
      </Sequence>
    </div>
  );
};
