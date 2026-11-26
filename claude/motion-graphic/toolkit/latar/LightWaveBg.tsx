// LightWaveBg.tsx — latar shader GLSL (WebGL mentah): cahaya mengalir (sinus + simplex), arah cahaya, zona glow berposisi prop,
// 2-3 warna dari satu keluarga hue, grain 2-3 % di shader anti-banding. OPT-IN; tanpa warna bawaan (colors wajib).
// u_time = frame / fps dari useCurrentFrame: deterministik, aman dirender paralel. Logika dan shader: light-wave-bg.js.
// Contoh: <LightWaveBg colors={[TEMA.gelap, TEMA.primer, TEMA.terang]} mode="dark" glow={{ x: 0.7, y: 0.8, r: 0.5 }} waveSpeed={0.4} grain={0.025} seed={3} />
import React, { useLayoutEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { renderLightWave, type LightWaveOptions } from "./light-wave-bg.js";

export type LightWaveBgProps = Omit<LightWaveOptions, "width" | "height"> & { style?: React.CSSProperties };

export const LightWaveBg: React.FC<LightWaveBgProps> = ({ style, ...o }) => {
  const frame = useCurrentFrame(), { fps, width, height } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => { if (ref.current) renderLightWave(ref.current, { ...o, width, height }, frame, fps); });
  return <canvas ref={ref} width={width} height={height} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }} />;
};
