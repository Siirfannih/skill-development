// LightWaveBg.tsx — latar shader GLSL (WebGL mentah): 1-2 elips cahaya raksasa berpusat DI LUAR frame, hanya ekor lebar yang masuk;
// ruang negatif >= 50 % tetap warna dasar; tanpa noise pembentuk warna; grain hash <= 0.02 anti-banding. OPT-IN; tanpa warna bawaan (colors wajib).
// u_time = frame / fps dari useCurrentFrame: deterministik, aman dirender paralel. Logika dan shader: light-wave-bg.js.
// Contoh: <LightWaveBg colors={[TEMA.gelap, TEMA.primer, TEMA.terang]} mode="dark" glow={{ x: 1.2, y: -0.1, r: 1.9 }} dir={40} waveSpeed={0.4} seed={3} />
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
