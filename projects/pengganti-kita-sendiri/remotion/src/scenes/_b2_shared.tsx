// Komponen bersama Babak 2 «Janji» (02b–02f): dunia blueprint, grafik janji, piktogram + bidang cahaya.
// Geometri grafik dipakai juga sebagai acuan gaya untuk 04c (agen lain): garis janji = jalur putus-putus lebar
// putih 40 %, garis kenyataan = garis solid putih tipis di atasnya, label = teks spasi lebar tanpa kotak.
import React from "react";
import { AbsoluteFill } from "remotion";

export const C = {
  bp900: "#042b79",
  bp700: "#06368a",
  white: "#ffffff",
  ink: "#1d1d1f",
  charcoal: "#101216",
  charcoalRaised: "#1c1f25",
  paper: "#f5f5f7",
  sky300: "#c4dafd",
  sky100: "#e1f5fd",
  sky50: "#f4f9fd",
  electric: "#1d36eb",
  line: "#d2d2d7",
};

/** Latar kertas blueprint (R-BP): gradasi biru tua (ruang layar). */
export const BlueprintPaper: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.bp700} 0%, ${C.bp900} 100%)` }} />
);

/** Grid blueprint 96 px (ruang dunia: ikut kamera). */
export const BlueprintGrid: React.FC<{ x?: number; y?: number; w?: number; h?: number }> = ({ x = -1920, y = -1080, w = 5760, h = 3240 }) => (
  <div
    style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      backgroundImage:
        "linear-gradient(180deg, rgba(255,255,255,0.16) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px)",
      backgroundSize: "96px 96px",
      backgroundPosition: `${-x % 96}px ${-y % 96}px`,
    }}
  />
);

// ── jalur kurva (kubik) dengan parameter panjang busur, untuk titik ujung yang mengikuti garis
type Pt = { x: number; y: number };
export type Cubic = [Pt, Pt, Pt, Pt];
const bez = (c: Cubic, u: number): Pt => {
  const v = 1 - u;
  return {
    x: v * v * v * c[0].x + 3 * v * v * u * c[1].x + 3 * v * u * u * c[2].x + u * u * u * c[3].x,
    y: v * v * v * c[0].y + 3 * v * v * u * c[1].y + 3 * v * u * u * c[2].y + u * u * u * c[3].y,
  };
};
export const makePath = (segs: Cubic[]) => {
  const pts: Pt[] = [];
  const cum: number[] = [];
  const segEnd: number[] = [];
  let L = 0;
  segs.forEach((s, si) => {
    for (let i = si === 0 ? 0 : 1; i <= 240; i++) {
      const p = bez(s, i / 240);
      if (pts.length) L += Math.hypot(p.x - pts[pts.length - 1].x, p.y - pts[pts.length - 1].y);
      pts.push(p);
      cum.push(L);
    }
    segEnd.push(L);
  });
  const d = segs.map((s, i) => `${i === 0 ? `M${s[0].x} ${s[0].y} ` : ""}C ${s[1].x} ${s[1].y}, ${s[2].x} ${s[2].y}, ${s[3].x} ${s[3].y}`).join(" ");
  /** titik pada panjang busur s (0..L) + arah (rad) */
  const at = (s: number) => {
    const q = Math.max(0, Math.min(L, s));
    let lo = 0, hi = cum.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (cum[m] < q) lo = m; else hi = m; }
    const k = (q - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo]);
    const p = { x: pts[lo].x + (pts[hi].x - pts[lo].x) * k, y: pts[lo].y + (pts[hi].y - pts[lo].y) * k };
    return { ...p, a: Math.atan2(pts[hi].y - pts[lo].y, pts[hi].x - pts[lo].x) };
  };
  return { d, L, segEnd, at };
};

// ── grafik janji (02e–02f). Koordinat dunia = bingkai wide 02f (1920×1080, panel Wonder 02f ×2).
export const CHART = {
  origin: { x: 160, y: 920 },
  stage: { x: 1100, y: 620 }, // ujung janji = penanda TAHAP INI
  axisY: 940,
  markerTop: 250,
  trackW: 18, // jalur janji putus-putus (putih 40 %)
  trackDash: "30 24",
  solidW: 7, // garis kenyataan
};
const SEG_PROMISE: Cubic = [{ x: 160, y: 920 }, { x: 480, y: 890 }, { x: 800, y: 780 }, { x: 1100, y: 620 }];
const SEG_BEYOND: Cubic = [{ x: 1100, y: 620 }, { x: 1360, y: 480 }, { x: 1640, y: 230 }, { x: 1990, y: -90 }];
export const PROMISE = makePath([SEG_PROMISE]);
export const REALITY = makePath([SEG_PROMISE, SEG_BEYOND]);

/** Titik layar tempat bloom 02d → 02e bertemu (pusat bidang cahaya 02d = titik ujung awal 02e). */
export const BLOOM_PT = { x: 1380, y: 624 };

// ── piktogram + bidang cahaya (desain panel 02d ×2)
/** Piktogram gelap dengan rim light dari kanan. `rim` 0..1 = kekuatan rim. Koordinat 1920. */
export const Pictogram: React.FC<{ rim?: number; x?: number; y?: number }> = ({ rim = 1, x = 0, y = 0 }) => {
  const r = Math.max(0, Math.min(1, rim));
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div
        style={{
          position: "absolute", left: 524, top: 356, width: 248, height: 248, borderRadius: "50%",
          background: `linear-gradient(100deg, ${C.charcoal} 40%, ${C.charcoalRaised} 100%)`,
          boxShadow: `inset -10px 0px 6px -4px rgba(255,255,255,${0.9 * r})`,
        }}
      />
      <div
        style={{
          position: "absolute", left: 416, top: 636, width: 464, height: 520, borderRadius: "232px 232px 0 0",
          background: `linear-gradient(100deg, ${C.charcoal} 35%, ${C.charcoalRaised} 100%)`,
          boxShadow: `inset -10px 6px 8px -4px rgba(255,255,255,${0.7 * r})`,
        }}
      />
    </div>
  );
};

/** Berkas cahaya dari kanan atas + bidang cahaya miring (tempat kata). `beam`, `plane`, `glow` 0..1.
 *  v10 (Irfan 1, #16) TEKNIK TANPA TEPI KOTAK: semua cahaya = elemen yang ISINYA gradien radial elips `closest-side`
 *  (nilai 0 tepat di tepi kotak elemen, jadi tepi elemen tidak pernah terlihat) — TANPA clip-path, TANPA box-shadow,
 *  TANPA filter blur pada kotak yang dipotong. Elemen digeser/diputar saja (rotate) agar jadi berkas miring.
 *  Gradien memakai beberapa stop (ease, bukan linear) supaya falloff halus tanpa pita. Teks di bidang: tinta #111 di putih. */
const soft = (a: number) =>
  `radial-gradient(ellipse closest-side at 50% 50%, rgba(255,255,255,${a}) 0%, rgba(255,255,255,${(a * 0.72).toFixed(3)}) 22%, rgba(255,255,255,${(a * 0.4).toFixed(3)}) 45%, rgba(255,255,255,${(a * 0.16).toFixed(3)}) 68%, rgba(255,255,255,${(a * 0.04).toFixed(3)}) 86%, rgba(255,255,255,0) 100%)`;
export const LightPlane: React.FC<{ beam: number; plane: number; glow: number; children?: React.ReactNode }> = ({ beam, plane, glow, children }) => (
  <>
    {/* berkas: dua elips panjang berputar (sumbu ±24° dari tegak, atas ke kanan) yang berpusat antara sumber (kanan atas) dan bidang */}
    <div style={{ position: "absolute", left: 1540 - 380, top: 250 - 760, width: 760, height: 1520, transform: "rotate(24deg)", transformOrigin: "50% 50%", background: soft(0.34), opacity: beam }} />
    <div style={{ position: "absolute", left: 1500 - 220, top: 230 - 700, width: 440, height: 1400, transform: "rotate(24deg)", transformOrigin: "50% 50%", background: soft(0.22), opacity: beam }} />
    {/* pendar di sekitar bidang: elips besar, memudar penuh sebelum tepi */}
    <div style={{ position: "absolute", left: 1380 - 900, top: 624 - 420, width: 1800, height: 840, background: soft(0.5 * glow * plane), }} />
    <div
      style={{
        position: "absolute", left: 940, top: 512, width: 880, height: 224,
        clipPath: "polygon(9% 0%, 100% 0%, 91% 100%, 0% 100%)",
        background: C.white,
        display: "flex", justifyContent: "center", alignItems: "center",
        opacity: plane,
      }}
    >
      {children}
    </div>
  </>
);
