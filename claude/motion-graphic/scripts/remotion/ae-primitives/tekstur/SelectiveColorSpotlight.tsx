// SelectiveColorSpotlight.tsx — satu bagian aset tetap berwarna, sisanya pudar ke abu, redup, dan sedikit buram.
// Warna menjadi penunjuk (kartu 19.T1, 39.T1). Isi dirender dua kali: salinan bawah di-grade, salinan atas di-mask
// elips ke titik sorot. Untuk video, dua salinan berarti dua decoder: pakai pada foto/kanvas bila bisa.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CURVE, DURASI, fr } from "../presets";

export type SelectiveColorSpotlightProps = {
  /** pusat dan jari-jari elips sorot, pecahan frame 0..1 */
  focus: { x: number; y: number; rx: number; ry: number };
  /** frame lokal mulai sorot menyala */
  start?: number;
  durationInFrames?: number;
  /** timpa kemajuan 0..1 secara manual (mis. dari aeValue) */
  progress?: number;
  /** kecerahan sisa saat sorot penuh (0,55 = redup) */
  dim?: number;
  /** blur sisa (px) saat sorot penuh */
  blur?: number;
  /** tepi lembut mask, porsi jari-jari 0..1 */
  feather?: number;
  /** pendar di sekitar sorot (warna dari token proyek); kosong = tanpa pendar */
  haloColor?: string;
  haloOpacity?: number;
  children: React.ReactNode;
};

export const SelectiveColorSpotlight: React.FC<SelectiveColorSpotlightProps> = ({
  focus, start = 0, durationInFrames, progress, dim = 0.55, blur = 2, feather = 0.35, haloColor, haloOpacity = 0.5, children,
}) => {
  const frame = useCurrentFrame();
  const { fps, width: W, height: H } = useVideoConfig();
  const dur = durationInFrames ?? fr(DURASI.sorotSpot, fps);
  const p = progress ?? CURVE.reveal(Math.min(1, Math.max(0, (frame - start) / Math.max(1, dur))));
  const full: React.CSSProperties = { position: "absolute", inset: 0 };
  const rx = focus.rx * W, ry = focus.ry * H;
  const mask = `radial-gradient(ellipse ${rx}px ${ry}px at ${focus.x * 100}% ${focus.y * 100}%, #000 ${(1 - feather) * 100}%, transparent 100%)`;
  const grade = p > 0.001 ? `grayscale(${p}) brightness(${1 - (1 - dim) * p}) blur(${blur * p}px)` : undefined;
  return (
    <div style={{ ...full, overflow: "hidden" }}>
      <div style={{ ...full, filter: grade }}>{children}</div>
      <div style={{ ...full, WebkitMaskImage: mask, maskImage: mask }}>{children}</div>
      {haloColor && p > 0.001 ? (
        <div style={{ ...full, mixBlendMode: "screen", opacity: haloOpacity * p,
          background: `radial-gradient(ellipse ${rx * 1.5}px ${ry * 1.5}px at ${focus.x * 100}% ${focus.y * 100}%, ${haloColor} 0%, transparent 100%)` }} />
      ) : null}
    </div>
  );
};
