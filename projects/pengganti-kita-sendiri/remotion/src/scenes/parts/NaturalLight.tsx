// OBJ «Cahaya natural» (v11, Irfan gambar 3 · 0:30): pengganti pendar radial bulat («balon putih») di adegan piktogram.
// Prinsip cahaya nyata:
//  - berkas = trapesium dari SUMBER (sempit) ke arah jatuhnya (melebar); intensitas turun di sepanjang sumbu (≈ 1/(1+k·s)),
//    ujung jauh memudar habis — tidak ada ujung membulat;
//  - tepi = penumbra (blur lebar) + lapis hamburan yang lebih lebar dan redup, bukan elips;
//  - pendar di sekitar sumber bercahaya (layar/bidang) = BENTUK sumber itu sendiri yang di-blur (falloff mengikuti tepi sumber),
//    bukan elips besar;
//  - genangan di lantai = elips pipih dengan falloff gaussian (banyak stop), puncak rendah;
//  - grain halus statis memecah banding gradien panjang.
// Semua deterministik (tanpa random per frame). Koordinat = koordinat induk (ikut kamera).
import React from "react";

type Pt = { x: number; y: number };
const f1 = (v: number) => v.toFixed(1);

/** Kurva falloff sepanjang sumbu berkas: 1 di sumber → 0 di ujung, turun cepat dulu lalu ekor panjang. */
const axisStops = (a: number, k = 2.2, n = 10) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const s = i / n;
    return { o: s, a: (a * Math.pow(1 - s, 1.5)) / (1 + k * s) };
  });

/**
 * Berkas cahaya dari `from` (sumber, boleh di luar frame) ke `to` (ujung, memudar habis).
 * `w0` lebar di sumber, `w1` lebar di ujung, `a` intensitas puncak (0..1, putih), `soft` = penumbra px.
 */
export const LightShaft: React.FC<{
  id: string; from: Pt; to: Pt; w0: number; w1: number; a: number; soft?: number; scatter?: number; grain?: number; falloff?: number;
}> = ({ id, from, to, w0, w1, a, soft = 22, scatter = 0.32, grain = 0.22, falloff = 2.2 }) => {
  if (a <= 0.002) return null;
  const dx = to.x - from.x, dy = to.y - from.y;
  const L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L, ny = dx / L;
  const quad = (k: number) => {
    const h0 = (w0 * k) / 2, h1 = (w1 * k) / 2;
    return [[from.x + nx * h0, from.y + ny * h0], [to.x + nx * h1, to.y + ny * h1], [to.x - nx * h1, to.y - ny * h1], [from.x - nx * h0, from.y - ny * h0]];
  };
  const wide = quad(1.7);
  const pad = soft * 4;
  const xs = wide.map((p) => p[0]), ys = wide.map((p) => p[1]);
  const box = { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, w: Math.max(...xs) - Math.min(...xs) + 2 * pad, h: Math.max(...ys) - Math.min(...ys) + 2 * pad };
  const pts = (q: number[][]) => q.map((p) => `${f1(p[0])},${f1(p[1])}`).join(" ");
  const grad = (gid: string, peak: number) => (
    <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={from.x} y1={from.y} x2={to.x} y2={to.y}>
      {axisStops(peak, falloff).map((s) => <stop key={s.o} offset={s.o} stopColor="#fff" stopOpacity={Math.max(0, Math.min(1, s.a))} />)}
    </linearGradient>
  );
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, overflow: "visible", pointerEvents: "none" }}>
      <defs>
        {grad(`${id}-gc`, a)}
        {grad(`${id}-gs`, a * 0.32)}
        <filter id={`${id}-fs`} filterUnits="userSpaceOnUse" x={box.x} y={box.y} width={box.w} height={box.h}>
          <feGaussianBlur stdDeviation={soft * 2.6} />
        </filter>
        <filter id={`${id}-fc`} filterUnits="userSpaceOnUse" x={box.x} y={box.y} width={box.w} height={box.h} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={soft} result="b" />
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves={2} seed={11} result="n" />
          {/* grain statis: alpha × (1 − g + 2g·noise) → rata-rata intensitas tetap, banding pecah */}
          <feComposite in="b" in2="n" operator="arithmetic" k1={2 * grain} k2={1 - grain} k3={0} k4={0} />
        </filter>
      </defs>
      {scatter > 0 && <polygon points={pts(quad(1 + scatter * 2))} fill={`url(#${id}-gs)`} filter={`url(#${id}-fs)`} />}
      <polygon points={pts(quad(1))} fill={`url(#${id}-gc)`} filter={`url(#${id}-fc)`} />
    </svg>
  );
};

/**
 * Pendar sebuah sumber bercahaya berbentuk poligon (mis. bidang jajar genjang): bentuk sumber di-blur dua lapis
 * (inti rapat + hamburan lebar). Tepi pendar mengikuti tepi sumber → tidak pernah tampak sebagai balon bulat.
 * `poly` = titik poligon di koordinat induk.
 */
export const SourceBloom: React.FC<{ id: string; poly: Pt[]; a: number; near?: number; far?: number }> = ({ id, poly, a, near = 14, far = 60 }) => {
  if (a <= 0.002) return null;
  const xs = poly.map((p) => p.x), ys = poly.map((p) => p.y);
  const pad = far * 5;
  const box = { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, w: Math.max(...xs) - Math.min(...xs) + 2 * pad, h: Math.max(...ys) - Math.min(...ys) + 2 * pad };
  const pts = poly.map((p) => `${f1(p.x)},${f1(p.y)}`).join(" ");
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, overflow: "visible", pointerEvents: "none" }}>
      <defs>
        <filter id={`${id}-n`} filterUnits="userSpaceOnUse" x={box.x} y={box.y} width={box.w} height={box.h}><feGaussianBlur stdDeviation={near} /></filter>
        <filter id={`${id}-m`} filterUnits="userSpaceOnUse" x={box.x} y={box.y} width={box.w} height={box.h}><feGaussianBlur stdDeviation={far * 0.45} /></filter>
        <filter id={`${id}-f`} filterUnits="userSpaceOnUse" x={box.x} y={box.y} width={box.w} height={box.h}><feGaussianBlur stdDeviation={far * 1.3} /></filter>
      </defs>
      {/* tiga lapis (ekor panjang → inti rapat): mendekati falloff bloom lensa yang nyata */}
      <polygon points={pts} fill="#fff" fillOpacity={Math.min(1, a * 0.6)} filter={`url(#${id}-f)`} />
      <polygon points={pts} fill="#fff" fillOpacity={Math.min(1, a * 0.4)} filter={`url(#${id}-m)`} />
      <polygon points={pts} fill="#fff" fillOpacity={Math.min(1, a * 0.3)} filter={`url(#${id}-n)`} />
    </svg>
  );
};

/** Genangan cahaya di lantai: elips pipih, falloff gaussian 12 stop (tanpa tepi oval tegas), puncak rendah. */
export const FloorPool: React.FC<{ cx: number; y: number; rx: number; ry: number; a: number }> = ({ cx, y, rx, ry, a }) => {
  if (a <= 0.002) return null;
  const stops = Array.from({ length: 13 }, (_, i) => {
    const u = i / 12;
    return `rgba(255,255,255,${(a * Math.exp(-4.5 * u * u) * (1 - u)).toFixed(4)}) ${(u * 100).toFixed(1)}%`;
  }).join(", ");
  return <div style={{ position: "absolute", left: cx - rx, top: y - ry, width: rx * 2, height: ry * 2, pointerEvents: "none", background: `radial-gradient(closest-side, ${stops})` }} />;
};

/** Titik poligon jajar genjang (gaya bidang `clipPath polygon(s% 0, 100% 0, 100−s% 100%, 0 100%)`). */
export const parallelogram = (b: { x: number; y: number; w: number; h: number }, slant: number): Pt[] => [
  { x: b.x + slant * b.w, y: b.y }, { x: b.x + b.w, y: b.y }, { x: b.x + (1 - slant) * b.w, y: b.y + b.h }, { x: b.x, y: b.y + b.h },
];
