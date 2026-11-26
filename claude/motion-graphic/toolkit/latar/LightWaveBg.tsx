// LightWaveBg.tsx — latar shader GLSL v3 (port patokan Irfan): AMBIENT WASH lebar + CORE di luar frame, falloff Gaussian exp(-dot(d,d)*k),
// grain hash <= 0.02, tanpa noise pembentuk warna. OPT-IN; colors wajib atau preset. u_time = frame / fps dari useCurrentFrame. Logika dan shader: light-wave-bg.js.
// Contoh: <LightWaveBg preset="researchly-glow" mode="dark" core={{ x: 1.1, y: 0.2 }} ambient={{ intensity: 0.5 }} />
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
