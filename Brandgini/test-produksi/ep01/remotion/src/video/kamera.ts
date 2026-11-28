// kamera.ts · v3. Satu kamera per dunia. Lintasan = interpolasi PCHIP (monoton, kecepatan kontinu): tanpa overshoot, tanpa berhenti-mulai
// di tiap waypoint. Pantai = POV SAMPING (mata manusia); gang = peta dari ATAS. Titik tanah dunia (G) selalu jatuh di y layar 880.
export type Kam = { s: number; fx: number; fy: number };

/** PCHIP Fritsch-Carlson, kemiringan ujung 0 (mulai dan berhenti halus). */
export const pchip = (pts: [number, number][]) => {
  const n = pts.length;
  const h = pts.slice(1).map((p, i) => p[0] - pts[i][0]);
  const d = pts.slice(1).map((p, i) => (p[1] - pts[i][1]) / h[i]);
  const m: number[] = new Array(n).fill(0);
  for (let k = 1; k < n - 1; k++) {
    if (d[k - 1] * d[k] <= 0) m[k] = 0;
    else {
      const w1 = 2 * h[k] + h[k - 1], w2 = h[k] + 2 * h[k - 1];
      m[k] = (w1 + w2) / (w1 / d[k - 1] + w2 / d[k]);
    }
  }
  return (x: number) => {
    if (x <= pts[0][0]) return pts[0][1];
    if (x >= pts[n - 1][0]) return pts[n - 1][1];
    let k = 0;
    while (x > pts[k + 1][0]) k++;
    const t = (x - pts[k][0]) / h[k], t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * pts[k][1] + (t3 - 2 * t2 + t) * h[k] * m[k] + (-2 * t3 + 3 * t2) * pts[k + 1][1] + (t3 - t2) * h[k] * m[k + 1];
  };
};

export const G = 1010;            // tanah (pasir) tempat gerobak dan orang menapak, koordinat dunia pantai
export const XC_PANTAI = 1300;    // pusat panorama pantai (parallax)
export const px = (p: number) => 400 + 2000 * p;   // 0..1 km (dimampatkan: konvensi diagram, tanda "1 km" di papan ujung)

const SZ_PANTAI: [number, number][] = [[0, 2.0], [3.0, 2.15], [4.7, 2.3], [6.3, 2.45], [8.3, 0.6], [9.1, 0.6], [13.5, 0.92], [15.7, 1.05], [18.9, 1.5],
  [22.8, 1.62], [25.4, 1.75], [27.5, 1.95], [29.3, 2.35], [30.3, 2.35], [31.5, 1.0], [34.0, 1.0], [35.7, 1.7], [37.2, 2.2], [39.2, 2.45], [40.1, 2.9]];
const CX_PANTAI: [number, number][] = [[0, 500], [3.0, 520], [4.7, 598], [6.3, 598], [8.3, 1300], [9.1, 1300], [13.5, 1330], [15.7, 1330], [18.9, 1330],
  [22.8, 1420], [25.4, 1425], [27.5, 1425], [29.3, 1425], [30.3, 1425], [31.5, 1740], [34.0, 1740], [35.7, 1500], [37.2, 1425], [39.2, 1425], [40.1, 1425]];
const SZ_LOOP: [number, number][] = [[53.0, 2.0], [55.3, 2.25]];
const CX_LOOP: [number, number][] = [[53.0, 500], [55.3, 515]];
const sz = pchip(SZ_PANTAI), cx = pchip(CX_PANTAI), szL = pchip(SZ_LOOP), cxL = pchip(CX_LOOP);

export const kamPantai = (t: number): Kam => (t >= 53.0 ? { s: szL(t), fx: cxL(t), fy: G } : { s: sz(t), fx: cx(t), fy: G });

const SZ_GANG = pchip([[40.1, 1.9], [43.8, 1.6], [44.8, 1.6], [46.6, 1.75], [48.0, 2.0], [49.6, 2.05], [51.0, 2.15], [53.0, 2.3]]);
const FX_GANG = pchip([[40.1, 540], [43.8, 540], [44.8, 250], [45.5, 250], [46.4, 770], [47.0, 540], [49.6, 540], [51.2, 800], [53.0, 880]]);
const FY_GANG = pchip([[40.1, 960], [43.8, 900], [44.8, 570], [46.4, 570], [47.0, 960], [49.6, 960], [51.2, 1090], [53.0, 1090]]);
export const kamGang = (t: number): Kam => ({ s: SZ_GANG(t), fx: FX_GANG(t), fy: FY_GANG(t) });

export const adaGang = (t: number) => t >= 40.1 && t < 53.0;
export const kam = (t: number): Kam => (adaGang(t) ? kamGang(t) : kamPantai(t));

/** transform SVG layer dengan faktor parallax k (0 = diam, 1 = dunia). Titik fy selalu di y layar 880 untuk semua layer. */
export const tfLayer = (c: Kam, k: number, gang = false) => {
  const sc = 1 + (c.s - 1) * k;
  const xc = gang ? 540 : XC_PANTAI;
  const Fx = xc + (c.fx - xc) * k;
  return { sc, Fx, Fy: c.fy, str: `translate(540 880) scale(${sc}) translate(${-Fx} ${-c.fy})` };
};
/** titik dunia -> layar untuk layer k. */
export const keLayar = (c: Kam, k: number, x: number, y: number, gang = false) => {
  const { sc, Fx, Fy } = tfLayer(c, k, gang);
  return { x: 540 + (x - Fx) * sc, y: 880 + (y - Fy) * sc };
};
