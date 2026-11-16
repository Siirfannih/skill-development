// LightSweep.tsx — gaya G8 "kilat cahaya" (typography.md §7.5; Irfan 16 Nov, ref siirfannih_DfRh4w0SfAk "Golden rule").
// Isi huruf = gradien warna (atas terang -> bawah lebih dalam); satu pita cahaya miring menyapu huruf sekali;
// glow lembut mengikuti pita. Semua dari frame (deterministik), tanpa footage di dalam huruf.
// Gagal yang membentuk komponen ini: jensen-pain-suffering T26 memasukkan klip percikan grayscale ke huruf
// (multiply) -> terbaca seperti bayangan daun, bukan kilat.
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CURVE, CurveName } from "./curves";

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
  curve?: CurveName;     // land = masuk cepat; drift = pita terlihat melintas rata (kartu pendek)
};

export const LightSweep: React.FC<Props> = ({
  text, fontFamily, fontSize, fontWeight = 700, top = "#FFD678", bottom = "#D68028",
  sweepStart = 6, sweepFrames = 24, angleDeg = 115, glow = 0.55, curve = "land",
}) => {
  const f = useCurrentFrame();
  // posisi pita dalam % lebar latar gradien (latar dibuat 300 % supaya pita bisa masuk dan keluar penuh)
  const p = interpolate(f, [sweepStart, sweepStart + sweepFrames], [0, 1], {
    easing: CURVE[curve], extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // Garis gradien CSS bersudut 0–90° berawal di pojok kiri bawah dan berakhir di pojok kanan atas kotak teks,
  // jadi pusat pita c (-10 % -> 110 %) menyapu huruf dari kiri bawah ke kanan atas; pita tegak lurus arah gerak.
  const c = -10 + p * 120;
  const fill = `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
  const band = `linear-gradient(${angleDeg}deg, transparent ${c - 7}%, rgba(255,250,235,0) ${c - 5}%, rgba(255,250,235,0.95) ${c}%, rgba(255,250,235,0) ${c + 5}%, transparent ${c + 7}%)`;
  const base: React.CSSProperties = {
    fontFamily, fontSize, fontWeight, lineHeight: 1, letterSpacing: "-0.03em", whiteSpace: "nowrap",
    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  };
  const bandStyle = { backgroundImage: `${band}, ${fill}`, backgroundSize: "100% 100%, 100% 100%",
    backgroundPosition: "0 0, 0 0", backgroundRepeat: "no-repeat" };
  const glowNow = glow * Math.sin(Math.PI * p); // glow paling kuat saat pita di tengah
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* glow: salinan teks yang sama, diblur, di belakang */}
      <div aria-hidden style={{ ...base, ...bandStyle, backgroundImage: band, position: "absolute", inset: 0, filter: `blur(${fontSize * 0.09}px)`, opacity: glowNow }}>{text}</div>
      <div style={{ ...base, ...bandStyle, position: "relative" }}>{text}</div>
    </div>
  );
};
