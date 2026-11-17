// Kilat cahaya pada kata hero (ide LightSweep.tsx di skill motion-graphic): isi huruf gradien terang,
// satu pita putih miring menyapu, glow mengikuti; garis tepi gelap + bayangan supaya terbaca di atas footage.
import React from "react";
import { CURVE } from "../../lib/curves";
import { interpolate, useCurrentFrame } from "remotion";

type Props = { text: string; fontSize: number; sapuan: number[]; sapuanFrames?: number; angleDeg?: number; rata?: "left" | "center" };

export const KilatTeks: React.FC<Props> = ({ text, fontSize, sapuan, sapuanFrames = 26, angleDeg = 115, rata = "left" }) => {
  const f = useCurrentFrame();
  // sapuan aktif = yang terakhir sudah mulai
  const mulai = [...sapuan].reverse().find((s) => f >= s) ?? sapuan[0];
  const p = interpolate(f, [mulai, mulai + sapuanFrames], [0, 1], { easing: CURVE.land, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pos = 100 - p * 100;
  const band = `linear-gradient(${angleDeg}deg, transparent 40%, rgba(255,255,255,0) 44%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 56%, transparent 60%)`;
  const fill = "linear-gradient(180deg, #FAF8EC 0%, #FAF8EC 100%)"; // isian krem #FAF8EC
  const aktif = p > 0 && p < 1;
  const glow = aktif ? 0.25 + 0.75 * Math.sin(Math.PI * p) : 0;
  const dasar: React.CSSProperties = { fontFamily: "Anton", fontSize, lineHeight: 0.98, letterSpacing: "0em", whiteSpace: "pre", fontWeight: 400, textAlign: rata };
  const isi: React.CSSProperties = {
    ...dasar, color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text",
    backgroundImage: `${band}, ${fill}`, backgroundSize: "300% 100%, 100% 100%", backgroundPosition: `${pos}% 0, 0 0`, backgroundRepeat: "no-repeat",
  };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* garis tepi gelap + bayangan jatuh */}
      <div aria-hidden style={{ ...dasar, position: "absolute", inset: 0, color: "#1F2328", WebkitTextStroke: `18px #1F2328`, filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.35))" }}>{text}</div>
      {/* glow pita */}
      <div aria-hidden style={{ ...isi, position: "absolute", inset: 0, filter: `blur(${fontSize * 0.08}px)`, opacity: glow }}>{text}</div>
      <div style={{ ...isi, position: "relative" }}>{text}</div>
    </div>
  );
};
