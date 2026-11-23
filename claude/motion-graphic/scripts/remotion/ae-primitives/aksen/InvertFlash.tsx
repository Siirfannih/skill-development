// InvertFlash.tsx — inversi warna (negatif) 2–4 frame untuk aksen ketukan atau punchline. Intensitas penuh selama
// jendelanya, tanpa naik/turun. Tiga bentuk:
//   - membungkus isi: filter invert pada isi (bisa ditambah grayscale)
//   - tanpa isi: lapisan "difference" putih di atas saudara-saudaranya (membalik apa pun di bawahnya)
//   - region: hanya satu kotak yang dibalik (panel logo, kartu 86.T5)
// mode "flicker" = selang-seling tiap `every` frame (glitch negatif, kartu 23.T4).
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { DURASI, NETRAL, fr } from "../presets";

export type InvertFlashProps = {
  /** frame lokal mulai */
  at?: number;
  /** bawaan 2 f @30 fps, diskalakan ke fps komposisi */
  durationInFrames?: number;
  mode?: "solid" | "flicker";
  /** panjang tiap ketukan flicker (frame) */
  every?: number;
  /** 0..1 desaturasi saat terbalik */
  grayscale?: number;
  /** kotak yang dibalik, pecahan frame 0..1 */
  region?: { x: number; y: number; w: number; h: number };
  children?: React.ReactNode;
};

/** true bila frame lokal berada dalam jendela inversi aktif. */
export const invertActive = (frame: number, at = 0, dur: number = DURASI.invert, mode: "solid" | "flicker" = "solid", every = 2) => {
  const i = Math.round(frame - at);
  if (i < 0 || i >= dur) return false;
  return mode === "solid" || Math.floor(i / Math.max(1, every)) % 2 === 0;
};

export const InvertFlash: React.FC<InvertFlashProps> = ({
  at = 0, durationInFrames, mode = "solid", every = 2, grayscale = 0, region, children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = invertActive(frame, at, durationInFrames ?? fr(DURASI.invert, fps), mode, every);
  const full: React.CSSProperties = { position: "absolute", inset: 0 };
  if (children !== undefined && !region) {
    return <div style={{ ...full, filter: on ? `invert(1)${grayscale > 0 ? ` grayscale(${grayscale})` : ""}` : undefined }}>{children}</div>;
  }
  const box: React.CSSProperties = region
    ? { position: "absolute", left: `${region.x * 100}%`, top: `${region.y * 100}%`, width: `${region.w * 100}%`, height: `${region.h * 100}%` }
    : full;
  const lapis = on ? <div style={{ ...box, background: NETRAL.terang, mixBlendMode: "difference" }} /> : null;
  if (children === undefined) return lapis;
  return <div style={{ ...full, isolation: "isolate" }}>{children}{lapis}</div>;
};
