// Breath · v21 · «napas kamera» untuk jendela statis (feedback Irfan 2 Nov 22.25: «beberapa bagian masih punya jeda dan kurang smooth
// sehingga penonton rawan skip»). Jendela dari ears/motion_curve.py pada render v11/v20 (rata-rata beda frame 0,5 dtk < 0,8 selama ≥ 0,8 dtk).
// Tiap jendela: push-in pelan 1→1+A (ease in-out sepanjang jendela) + geser kecil arah berbeda per jendela, lalu lepas pelan 0,9 dtk.
// Hanya lapisan adegan; tipografi VO di atasnya tidak ikut → paralaks halus. Klip footage narasumber (Altman 71–73 dtk) tidak disentuh.
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FPS } from "./time";

const W: [number, number][] = [
  [13.55, 14.85], [15.45, 16.65], [28.9, 30.0], [39.25, 40.75], [41.15, 42.25], [43.5, 45.05], [53.15, 54.05], [54.6, 55.55],
  [62.25, 63.75], [68.9, 70.45], [101.15, 102.6], [103.75, 105.3], [106.4, 107.7], [108.8, 110.5], [113.75, 115.1], [117.5, 119.3],
  [126.55, 132.82],
];
const A = 0.028;
const REL = 0.9;
const IO = Easing.bezier(0.45, 0, 0.55, 1);
const hash = (n: number) => { const x = Math.sin(n * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); };

export const breathAt = (t: number) => {
  let z = 0, tx = 0, ty = 0;
  W.forEach(([a, b], i) => {
    if (t < a || t > b + REL) return;
    const up = interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: IO });
    const rel = t > b ? 1 - interpolate(t, [b, b + REL], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: IO }) : 1;
    const e = up * rel;
    const amp = Math.min(1, (b - a) / 1.2); // jendela pendek → napas lebih kecil
    z += A * amp * e;
    tx += (hash(i) - 0.5) * 36 * amp * e;
    ty += (hash(i + 7) - 0.5) * 20 * amp * e;
  });
  return { z: 1 + Math.min(z, A * 1.2), tx, ty };
};

export const Breath: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useCurrentFrame() / FPS;
  const { z, tx, ty } = breathAt(t);
  const still = z < 1.0002 && Math.abs(tx) < 0.05 && Math.abs(ty) < 0.05;
  return <AbsoluteFill style={{ transform: still ? undefined : `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${z.toFixed(5)})`, transformOrigin: "50% 48%" }}>{children}</AbsoluteFill>;
};
