// LightSweep.tsx — gaya G8 "kilat cahaya" (typography.md §7.5).
// Isi huruf = gradien warna (atas terang -> bawah lebih dalam); satu pita cahaya miring menyapu huruf sekali;
// glow lembut mengikuti pita. Semua dari frame (deterministik), tanpa footage di dalam huruf.
// Jangan memasukkan klip footage (mis. percikan grayscale, multiply) ke huruf: terbaca seperti bayangan, bukan kilat.
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CURVE } from "./curves";

type Props = {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
  top?: string;          // warna atas gradien isi
  bottom?: string;       // warna bawah gradien isi
  sweepStart?: number;   // frame pita mulai masuk (relatif ke Sequence)
  sweepFrames?: number;  // lama sapuan; dari jarak: dur(lebar teks, fps, 1)
  angleDeg?: number;     // kemiringan pita
  glow?: number;         // 0..1 kekuatan glow
};

export const LightSweep: React.FC<Props> = ({
  text, fontFamily, fontSize, fontWeight = 700, top = "#FFD678", bottom = "#D68028",
  sweepStart = 6, sweepFrames = 24, angleDeg = 115, glow = 0.55,
}) => {
  const f = useCurrentFrame();
  // posisi pita dalam % lebar latar gradien (latar dibuat 300 % supaya pita bisa masuk dan keluar penuh)
  const p = interpolate(f, [sweepStart, sweepStart + sweepFrames], [0, 1], {
    easing: CURVE.land, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const pos = 100 - p * 100; // background-position-x: 100 % -> 0 %
  const fill = `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
  const band = `linear-gradient(${angleDeg}deg, transparent 42%, rgba(255,250,235,0.0) 45%, rgba(255,250,235,0.95) 50%, rgba(255,250,235,0.0) 55%, transparent 58%)`;
  const base: React.CSSProperties = {
    fontFamily, fontSize, fontWeight, lineHeight: 1, letterSpacing: "-0.02em", whiteSpace: "nowrap",
    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  };
  const bandStyle = { backgroundImage: `${band}, ${fill}`, backgroundSize: "300% 100%, 100% 100%",
    backgroundPosition: `${pos}% 0, 0 0`, backgroundRepeat: "no-repeat" };
  const glowNow = glow * (0.45 + 0.55 * Math.sin(Math.PI * p)); // glow paling kuat saat pita di tengah
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* glow: salinan teks yang sama, diblur, di belakang */}
      <div aria-hidden style={{ ...base, ...bandStyle, position: "absolute", inset: 0, filter: `blur(${fontSize * 0.09}px)`, opacity: glowNow }}>{text}</div>
      <div style={{ ...base, ...bandStyle, position: "relative" }}>{text}</div>
    </div>
  );
};
