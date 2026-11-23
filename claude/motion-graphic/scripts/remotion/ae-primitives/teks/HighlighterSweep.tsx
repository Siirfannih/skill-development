// HighlighterSweep.tsx — sorotan stabilo yang menyapu di belakang kutipan, dari kiri (atau kanan) dengan CURVE.reveal.
// Inline: dibungkus di sekitar frasa di dalam paragraf. Huruf tidak diatur di sini (ikut induk: tanpa font cadangan),
// warna sorot wajib dari props/token proyek. Frasa yang terlipat ke beberapa baris: tiap baris menyapu bersamaan
// (box-decoration-break: clone), kotak tidak melebar di antara baris.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, DURASI, fr } from "../presets";

export type HighlighterSweepProps = {
  /** warna stabilo (dari token proyek) */
  color: string;
  /** frame lokal mulai menyapu */
  start?: number;
  durationInFrames?: number;
  direction?: "ltr" | "rtl";
  /** tinggi pita dari bawah baris, 0..1 (1 = setinggi baris; 0,55 = gaya spidol setengah bawah) */
  coverage?: number;
  /** lebih ke kiri-kanan frasa, em */
  padX?: number;
  radius?: number;
  /** "multiply" bila disorot di atas kertas/foto supaya tulisan di bawahnya tetap terbaca (kartu 48.T1) */
  blend?: React.CSSProperties["mixBlendMode"];
  /** warna huruf frasa saat tersorot (kosong = ikut induk) */
  textColor?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Kemajuan sapuan 0..1 pada frame lokal. */
export const sweepProgress = (frame: number, start: number, dur: number) =>
  CURVE.reveal(Math.min(1, Math.max(0, (frame - start) / Math.max(1, dur))));

export const HighlighterSweep: React.FC<HighlighterSweepProps> = ({
  color, start = 0, durationInFrames, direction = "ltr", coverage = 0.9, padX = 0.12, radius = 3, blend, textColor, style, children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = sweepProgress(frame, start, durationInFrames ?? fr(DURASI.sorot, fps));
  return (
    <span style={{
      backgroundImage: `linear-gradient(${color}, ${color})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${(p * 100).toFixed(2)}% ${coverage * 100}%`,
      backgroundPosition: direction === "ltr" ? "left bottom" : "right bottom",
      WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone",
      padding: `0 ${padX}em`, margin: `0 ${-padX}em`, borderRadius: radius,
      mixBlendMode: blend, color: p > 0 && textColor ? textColor : undefined, ...style,
    }}>
      {children}
    </span>
  );
};
