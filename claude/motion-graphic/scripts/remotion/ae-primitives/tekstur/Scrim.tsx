// Scrim.tsx — gradien gelap dari satu sisi supaya teks di atas foto lolos kontras. Masuk dan keluar dengan gerak
// (meluncur dari sisinya, CURVE.heavy), tidak nongol mendadak. Kotak di belakang teks hanya bila kontras gagal;
// scrim adalah alternatif yang tidak menambah bentuk.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, NETRAL, fr } from "../presets";

export type ScrimProps = {
  side: "left" | "right" | "top" | "bottom" | "flat";
  /** kepekatan di tepi, 0..1 */
  strength?: number;
  /** warna scrim; bawaan hitam netral */
  color?: string;
  /** frame lokal mulai masuk; undefined = sudah penuh sejak awal */
  enterAt?: number;
  enterFrames?: number;
  /** frame lokal mulai keluar (opsional) */
  exitAt?: number;
  exitFrames?: number;
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const Scrim: React.FC<ScrimProps> = ({ side, strength = 0.62, color = NETRAL.gelap, enterAt, enterFrames, exitAt, exitFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inF = enterFrames ?? fr(12, fps);
  const outF = exitFrames ?? Math.max(2, Math.round(inF * 0.65));
  const masuk = enterAt === undefined ? 1 : CURVE.heavy(clamp01((frame - enterAt) / inF));
  const keluar = exitAt === undefined ? 0 : CURVE.leave(clamp01((frame - exitAt) / outF));
  const hadir = masuk * (1 - keluar);
  if (hadir <= 0.001) return null;
  const c = (a: number) => `color-mix(in srgb, ${color} ${Math.round(a * 100)}%, transparent)`;
  const geser = (1 - hadir) * 100;
  const arah = { left: "to right", right: "to left", top: "to bottom", bottom: "to top", flat: "to top" }[side];
  const transform = { left: `translateX(${-geser}%)`, right: `translateX(${geser}%)`, top: `translateY(${-geser}%)`, bottom: `translateY(${geser}%)`, flat: `translateY(${geser}%)` }[side];
  const background = side === "flat" ? c(strength * 0.55)
    : `linear-gradient(${arah}, ${c(strength)} 0%, ${c(strength * 0.55)} 38%, ${c(0)} 72%)`;
  return <div style={{ position: "absolute", inset: 0, background, transform }} />;
};
