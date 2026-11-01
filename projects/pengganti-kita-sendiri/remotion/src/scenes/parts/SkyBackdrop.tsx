// OBJ «Langit premium» · latar gradien langit pagi (pengganti hitam polos, Irfan 2 Nov 07.03): biru dalam di atas → biru muda →
// cakrawala hangat, awan lembut (gradien radial, tanpa tepi), pendar matahari kanan atas, vinyet halus. Parallax: geser lebih
// lambat dari kamera (k ≈ 0,15) supaya terasa 2.5D. Semua gradien (tanpa gambar), jadi tajam di skala render mana pun.
import React from "react";
import { AbsoluteFill } from "remotion";

const CLOUDS = [
  { x: 260, y: 300, rx: 520, ry: 150, a: 0.55 },
  { x: 1500, y: 240, rx: 600, ry: 170, a: 0.6 },
  { x: 980, y: 760, rx: 900, ry: 200, a: 0.5 },
  { x: 120, y: 860, rx: 600, ry: 180, a: 0.45 },
  { x: 1820, y: 820, rx: 560, ry: 190, a: 0.5 },
];

export const SkyBackdrop: React.FC<{ px?: number; py?: number }> = ({ px = 0, py = 0 }) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) scale(1.12)`, transformOrigin: "50% 50%" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #2f7fd6 0%, #5ea3e8 34%, #a9d2f4 62%, #f3e6d6 86%, #f8dcc0 100%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 38% 34% at 84% 14%, rgba(255,247,226,0.85), rgba(255,247,226,0) 70%)" }} />
      {CLOUDS.map((c, i) => (
        <AbsoluteFill key={i} style={{ background: `radial-gradient(ellipse ${c.rx}px ${c.ry}px at ${c.x}px ${c.y}px, rgba(255,255,255,${c.a}), rgba(255,255,255,0) 72%)` }} />
      ))}
    </AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,0) 60%, rgba(10,30,70,0.22) 100%)" }} />
  </AbsoluteFill>
);
