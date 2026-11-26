// Adegan uji yang mewakili beban video Irfan (Hybrid Motion): latar gradien + gambar besar ber-blur, teks besar
// bergerak dengan glow, blur gerak, lapisan grain SVG feTurbulence per frame, dan banyak elemen bertumpuk.
// Tujuannya membandingkan opsi --gl dan konkurensi di mesin yang sama, bukan menilai desain.
import React from "react";
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from "remotion";

const Berat: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 89], [-200, 1400]);
  const s = 1 + 0.08 * Math.sin(f / 9);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 30% 40%, #3a2a6b, #0b0b14 70%)", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${1.1 + f / 900})`, filter: `blur(${18 + 6 * Math.sin(f / 7)}px)` }}>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: (i * 173 + f * 3) % 2100 - 100, top: (i * 97) % 1100,
            width: 260, height: 260, borderRadius: "50%", background: `hsl(${(i * 37 + f) % 360} 80% 60%)`, opacity: 0.55 }} />
        ))}
      </AbsoluteFill>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: x - i * 140, top: 220 + i * 120, fontSize: 150, fontWeight: 800,
          color: "#fff", fontFamily: "sans-serif", transform: `scale(${s}) rotate(${i * 2 - 5}deg)`,
          filter: `blur(${Math.abs(Math.sin((f + i * 5) / 6)) * 6}px)`,
          textShadow: "0 0 40px #ff3b30, 0 0 90px #ff9500" }}>KECEPATAN</div>
      ))}
      <svg width="1920" height="1080" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.35 }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} seed={f} /></filter>
        <rect width="1920" height="1080" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

export const BeratComp = () => (
  <Composition id="Berat" component={Berat} fps={30} width={1920} height={1080} durationInFrames={90} />
);
