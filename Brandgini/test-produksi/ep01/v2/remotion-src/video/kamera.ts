// kamera.ts · satu kamera per dunia (pantai, gang), dibaca oleh TIGA layer dengan faktor parallax berbeda (ADDENDUM-3).
// Layer: background k=0,25 (paling lambat) · aksi k=1 · depan/dekor k=1,35. Posisi kamera = titik dunia yang ditaruh di (540, 880).
import { kf } from './waktu';

export type Kam = { s: number; fx: number; fy: number };
const BY = 820;
export const px = (p: number) => 110 + 860 * p;

/** Pantai: close-up gerobak -> dua gerobak -> tarik mundur 1 km -> ikuti satu penjual demi satu -> dorong ke pasangan menempel. */
export const kamPantai = (t: number): Kam => ({
  s: kf(t, [[0, 3.1], [3.2, 3.5], [4.2, 2.7, 'heavy'], [6.3, 3.0, 'drift'], [7.7, 1.15, 'heavy'], [11.0, 1.35, 'drift'], [11.7, 3.0, 'heavy'],
    [12.8, 3.0], [13.5, 1.3, 'heavy'], [15.5, 1.45, 'drift'], [16.3, 2.8, 'heavy'], [18.9, 2.9, 'drift'], [19.4, 2.2, 'heavy'], [22.6, 2.3, 'drift'],
    [23.3, 2.8, 'heavy'], [25.2, 2.7, 'drift'], [25.5, 1.6, 'heavy'], [27.9, 2.0, 'heavy'], [29.3, 2.25, 'drift'], [30.9, 2.25], [32.0, 1.35, 'heavy'],
    [33.4, 1.4, 'drift'], [34.2, 2.1, 'heavy'], [35.6, 2.3, 'drift'], [39.8, 2.5, 'drift'], [52.99, 2.45], [53.0, 3.9], [53.95, 3.1, 'land'], [55.3, 3.3, 'drift']]),
  fx: kf(t, [[0, 170], [3.2, 178], [4.2, 228, 'heavy'], [6.3, 228], [7.7, 540, 'heavy'], [11.0, 540], [11.7, px(0.25), 'heavy'], [12.8, px(0.25)],
    [13.4, px(0.75), 'heavy'], [13.5, 540, 'heavy'], [15.5, 540], [16.3, 400, 'heavy'], [18.9, 420], [19.4, 560, 'heavy'], [22.6, 570], [23.3, 690, 'heavy'],
    [25.2, 690], [25.5, 540, 'heavy'], [29.3, 540], [31.0, 540], [32.0, 700, 'heavy'], [33.4, 700], [34.2, 540, 'heavy'], [52.99, 540], [53.0, 190], [53.95, 175]]),
  fy: kf(t, [[0, BY - 30], [55.3, BY - 30]]),
});

/** Gang: peta dari atas; kamera menyusuri jalan, sekolah, rumah, dua minimarket, lalu pembeli di ujung. */
export const kamGang = (t: number): Kam => ({
  s: kf(t, [[40.1, 1.3], [44.3, 1.6, 'drift'], [44.35, 1.5], [45.8, 1.95, 'drift'], [46.6, 1.85], [46.7, 2.0, 'heavy'], [49.5, 2.1, 'drift'], [49.6, 1.7, 'heavy'], [52.99, 2.0, 'drift']]),
  fx: kf(t, [[40.1, 540], [44.3, 540], [44.8, 240, 'heavy'], [45.6, 240], [46.4, 770, 'heavy'], [46.7, 540, 'heavy'], [49.5, 540], [50.2, 760, 'heavy'], [52.99, 880, 'drift']]),
  fy: kf(t, [[40.1, 900], [44.3, 900], [44.8, 560, 'heavy'], [46.4, 580], [46.7, 960, 'heavy'], [49.5, 960], [50.2, 1080, 'heavy'], [52.99, 1090]]),
});

export const adaGang = (t: number) => t >= 40.1 && t < 53.0;
export const kam = (t: number): Kam => (adaGang(t) ? kamGang(t) : kamPantai(t));

/** transform SVG layer dengan faktor parallax k (0 = diam, 1 = dunia). */
export const tfLayer = (c: Kam, k: number) => {
  const sc = 1 + (c.s - 1) * k;
  const Fx = 540 + (c.fx - 540) * k;
  const Fy = BY - (BY - c.fy) * c.s / sc;   // sejajarkan garis pantai (y=BY) di semua layer; hanya x yang berparalaks
  return { sc, Fx, Fy, str: `translate(540 880) scale(${sc}) translate(${-Fx} ${-Fy})` };
};
/** titik dunia -> layar untuk layer k (dipakai layer atas untuk panah/label yang menempel pada benda). */
export const keLayar = (c: Kam, k: number, x: number, y: number) => {
  const { sc, Fx, Fy } = tfLayer(c, k);
  return { x: 540 + (x - Fx) * sc, y: 880 + (y - Fy) * sc };
};
export const BY_PANTAI = BY;
