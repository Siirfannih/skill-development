// GenerativeBG.tsx — latar generatif ringan (zona | mesh; mode noise dihapus). OPT-IN: pasang hanya bila REF-SPEC/brief memintanya.
// Tanpa warna bawaan: `colors` wajib dari tema.ts. Frame-driven (useCurrentFrame), berbiji, deterministik.
// Logika di generative-bg.js (satu sumber dengan storyboard HTML). Untuk cahaya mengalir berkualitas shader: LightWaveBg.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { bgCSS, type BGOptions } from "./generative-bg.js";

export type GenerativeBGProps = BGOptions & { style?: React.CSSProperties };

export const GenerativeBG: React.FC<GenerativeBGProps> = ({ style, ...o }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig();
  return <div style={{ position: "absolute", inset: 0, background: bgCSS(o, frame, fps), ...style }} />;
};
