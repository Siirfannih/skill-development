// GenerativeBG.tsx — latar generatif ringan (zona | mesh | noise). OPT-IN: pasang hanya bila REF-SPEC/brief memintanya.
// Tanpa warna bawaan: `colors` wajib dari tema.ts. Frame-driven (useCurrentFrame), berbiji, deterministik.
// Logika di generative-bg.js (satu sumber dengan storyboard HTML). Untuk cahaya mengalir berkualitas shader: LightWaveBg.
import React, { useLayoutEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { bgCSS, drawNoise, type BGOptions } from "./generative-bg.js";

export type GenerativeBGProps = BGOptions & { style?: React.CSSProperties };

export const GenerativeBG: React.FC<GenerativeBGProps> = ({ style, ...o }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  const noise = (o.mode ?? "zona") === "noise";
  useLayoutEffect(() => { if (noise && ref.current) drawNoise(ref.current, o, frame, fps); });
  if (noise) return <canvas ref={ref} width={96} height={54} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }} />;
  return <div style={{ position: "absolute", inset: 0, background: bgCSS(o, frame, fps), ...style }} />;
};
