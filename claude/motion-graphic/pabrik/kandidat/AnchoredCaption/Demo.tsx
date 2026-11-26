import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnchoredCaption } from "./AnchoredCaption";
import { clamp01, drift, lerp } from "../../../toolkit/gerak/curves";

type Warna = { latar: string; panel: string; aksen: string; tinta: string; huruf: string; scrim: string };

const HURUF = "Inter, 'Helvetica Neue', Arial, sans-serif";

const TOKENS_A: Warna = { latar: "#F2E8D0", panel: "#E3D2AC", aksen: "#D9822B", tinta: "#1C1A16", huruf: HURUF, scrim: "#F2E8D0" };
const TOKENS_B: Warna = { latar: "#0E1A33", panel: "#1D3566", aksen: "#4C7DF0", tinta: "#F5F7FF", huruf: HURUF, scrim: "#0E1A33" };

const KATA = [
  { teks: "Your video", detik: 0.5 },
  { teks: "never", detik: 0.5 },
  { teks: "sit", detik: 0.25 },
  { teks: "still.", detik: 0.5 },
  { teks: "Change", detik: 0.25 },
  { teks: "angles,", detik: 0.75 },
  { teks: "add", detik: 0.25 },
  { teks: "small", detik: 0.25 },
  { teks: "motions", detik: 0.75 },
];

// Shot berganti dengan ritme sendiri, tidak selaras dengan pergantian kata.
const SHOT: { dari: number; jenis: "video" | "sofa" | "kolase" | "lorong" | "garis" }[] = [
  { dari: 0, jenis: "video" },
  { dari: 28, jenis: "sofa" },
  { dari: 54, jenis: "kolase" },
  { dari: 84, jenis: "lorong" },
  { dari: 92, jenis: "garis" },
  { dari: 100, jenis: "kolase" },
];

const Kotak: React.FC<{ l: number; t: number; w: number; h: number; c: string; r?: number; rot?: number }> = ({ l, t, w, h, c, r = 0, rot = 0 }) => (
  <div style={{ position: "absolute", left: l, top: t, width: w, height: h, background: c, borderRadius: r, transform: `rotate(${rot}deg)` }} />
);

/** Bingkai potret: kepala bulat dan bahu di dalam bingkai. */
const Wajah: React.FC<{ l: number; t: number; w: number; h: number; rot: number; bg: string; kulit: string; baju: string }> = ({ l, t, w, h, rot, bg, kulit, baju }) => (
  <div style={{ position: "absolute", left: l, top: t, width: w, height: h, background: bg, transform: `rotate(${rot}deg)`, overflow: "hidden", borderRadius: w * 0.04 }}>
    <div style={{ position: "absolute", left: w * 0.12, top: h * 0.62, width: w * 0.76, height: h * 0.7, background: baju, borderRadius: "50%" }} />
    <div style={{ position: "absolute", left: w * 0.32, top: h * 0.14, width: w * 0.36, height: w * 0.36, background: kulit, borderRadius: "50%" }} />
  </div>
);

const Shot: React.FC<{ jenis: string; k: Warna }> = ({ jenis, k }) => {
  const { width: W, height: H } = useVideoConfig();
  if (jenis === "video") {
    // jendela pratinjau video di atas (segitiga putar), garis waktu dengan klip dan kepala putar di bawah
    return (
      <AbsoluteFill style={{ background: k.latar }}>
        <Kotak l={W * 0.12} t={H * 0.07} w={W * 0.76} h={H * 0.28} c={k.panel} r={H * 0.015} />
        <div style={{ position: "absolute", left: W * 0.46, top: H * 0.16, width: 0, height: 0, borderTop: `${H * 0.05}px solid transparent`, borderBottom: `${H * 0.05}px solid transparent`, borderLeft: `${H * 0.085}px solid ${k.aksen}` }} />
        <Kotak l={0} t={H * 0.66} w={W} h={H * 0.34} c={k.panel} />
        <Kotak l={W * 0.06} t={H * 0.7} w={W * 0.34} h={H * 0.06} c={k.aksen} r={H * 0.008} />
        <Kotak l={W * 0.42} t={H * 0.7} w={W * 0.2} h={H * 0.06} c={k.tinta} r={H * 0.008} />
        <Kotak l={W * 0.64} t={H * 0.7} w={W * 0.3} h={H * 0.06} c={k.aksen} r={H * 0.008} />
        <Kotak l={W * 0.06} t={H * 0.79} w={W * 0.5} h={H * 0.05} c={k.latar} r={H * 0.008} />
        <Kotak l={W * 0.58} t={H * 0.79} w={W * 0.36} h={H * 0.05} c={k.tinta} r={H * 0.008} />
        <Kotak l={W * 0.5} t={H * 0.66} w={W * 0.008} h={H * 0.24} c={k.tinta} />
      </AbsoluteFill>
    );
  }
  if (jenis === "sofa") {
    // ruang tamu: dinding, lampu berdiri, sofa lebar dengan sandaran, bantalan, lengan, kaki, bayangan lantai
    return (
      <AbsoluteFill style={{ background: k.panel }}>
        <Kotak l={0} t={H * 0.84} w={W} h={H * 0.16} c={k.latar} />
        <Kotak l={W * 0.1} t={H * 0.13} w={W * 0.012} h={H * 0.7} c={k.tinta} />
        <div style={{ position: "absolute", left: W * 0.04, top: H * 0.07, width: W * 0.24, height: H * 0.1, background: k.aksen, clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" }} />
        <Kotak l={W * 0.06} t={H * 0.82} w={W * 0.2} h={H * 0.018} c={k.tinta} r={H * 0.01} />
        <Kotak l={W * 0.16} t={H * 0.62} w={W * 0.68} h={H * 0.12} c={k.aksen} r={H * 0.035} />
        <Kotak l={W * 0.1} t={H * 0.7} w={W * 0.8} h={H * 0.12} c={k.aksen} r={H * 0.03} />
        <Kotak l={W * 0.2} t={H * 0.68} w={W * 0.28} h={H * 0.07} c={k.latar} r={H * 0.02} />
        <Kotak l={W * 0.52} t={H * 0.68} w={W * 0.28} h={H * 0.07} c={k.latar} r={H * 0.02} />
        <Kotak l={W * 0.1} t={H * 0.67} w={W * 0.08} h={H * 0.15} c={k.tinta} r={H * 0.03} />
        <Kotak l={W * 0.82} t={H * 0.67} w={W * 0.08} h={H * 0.15} c={k.tinta} r={H * 0.03} />
        <Kotak l={W * 0.14} t={H * 0.82} w={W * 0.025} h={H * 0.04} c={k.tinta} />
        <Kotak l={W * 0.83} t={H * 0.82} w={W * 0.025} h={H * 0.04} c={k.tinta} />
        <Kotak l={W * 0.1} t={H * 0.865} w={W * 0.8} h={H * 0.02} c={k.panel} r={H * 0.01} />
      </AbsoluteFill>
    );
  }
  if (jenis === "kolase") {
    // kolase empat potret wajah dari sudut berbeda, dua di atas dan dua di bawah
    return (
      <AbsoluteFill style={{ background: k.aksen }}>
        <Wajah l={W * 0.04} t={H * 0.05} w={W * 0.42} h={H * 0.28} rot={-5} bg={k.latar} kulit={k.tinta} baju={k.panel} />
        <Wajah l={W * 0.52} t={H * 0.08} w={W * 0.4} h={H * 0.25} rot={4} bg={k.panel} kulit={k.latar} baju={k.tinta} />
        <Wajah l={W * 0.06} t={H * 0.67} w={W * 0.4} h={H * 0.26} rot={4} bg={k.panel} kulit={k.latar} baju={k.tinta} />
        <Wajah l={W * 0.52} t={H * 0.66} w={W * 0.42} h={H * 0.28} rot={-4} bg={k.latar} kulit={k.tinta} baju={k.panel} />
      </AbsoluteFill>
    );
  }
  if (jenis === "lorong") {
    // lorong: langit-langit, lantai, dinding menyempit ke titik hilang, pintu dan lampu
    return (
      <AbsoluteFill style={{ background: k.panel }}>
        <div style={{ position: "absolute", inset: 0, background: k.latar, clipPath: "polygon(0 0, 100% 0, 68% 36%, 32% 36%)" }} />
        <div style={{ position: "absolute", inset: 0, background: k.aksen, clipPath: "polygon(32% 64%, 68% 64%, 100% 100%, 0 100%)" }} />
        <Kotak l={W * 0.4} t={H * 0.08} w={W * 0.2} h={H * 0.03} c={k.aksen} r={H * 0.008} />
        <Kotak l={W * 0.36} t={H * 0.2} w={W * 0.28} h={H * 0.014} c={k.tinta} />
        <Kotak l={W * 0.04} t={H * 0.14} w={W * 0.14} h={H * 0.5} c={k.latar} />
        <Kotak l={W * 0.82} t={H * 0.14} w={W * 0.14} h={H * 0.5} c={k.latar} />
      </AbsoluteFill>
    );
  }
  // gerak kecil: ponsel perekam dengan jejak ghost, rel dolly di bawah
  return (
    <AbsoluteFill style={{ background: k.latar }}>
      <Kotak l={W * 0.1} t={H * 0.07} w={W * 0.24} h={H * 0.2} c={k.panel} r={H * 0.02} />
      <Kotak l={W * 0.3} t={H * 0.07} w={W * 0.24} h={H * 0.2} c={k.panel} r={H * 0.02} />
      <Kotak l={W * 0.5} t={H * 0.07} w={W * 0.24} h={H * 0.2} c={k.aksen} r={H * 0.02} />
      <Kotak l={W * 0.58} t={H * 0.11} w={W * 0.04} h={H * 0.012} c={k.tinta} r={H * 0.006} />
      <Kotak l={0} t={H * 0.7} w={W} h={H * 0.3} c={k.panel} />
      <Kotak l={W * 0.08} t={H * 0.78} w={W * 0.84} h={H * 0.012} c={k.tinta} />
      <Kotak l={W * 0.08} t={H * 0.86} w={W * 0.84} h={H * 0.012} c={k.tinta} />
      <Kotak l={W * 0.4} t={H * 0.74} w={W * 0.2} h={H * 0.16} c={k.aksen} r={H * 0.015} />
    </AbsoluteFill>
  );
};

/** Punch-in pelan per shot + drift berbiji: gambar selalu hidup, caption tidak ikut. */
const Bergerak: React.FC<{ dari: number; frame: number; children: React.ReactNode }> = ({ dari, frame, children }) => {
  const { fps } = useVideoConfig();
  const skala = lerp(1.04, 1.12, clamp01((frame - dari) / 24));
  const d = drift(frame, fps, 14, dari + 1);
  return <AbsoluteFill style={{ transform: `translate(${d.x}px, ${d.y}px) scale(${skala})` }}>{children}</AbsoluteFill>;
};

const Isi: React.FC<{ k: Warna }> = ({ k }) => {
  const frame = useCurrentFrame();
  let jenis = SHOT[0].jenis;
  let dari = 0;
  for (const s of SHOT) if (frame >= s.dari) { jenis = s.jenis; dari = s.dari; }
  return (
    <AnchoredCaption
      tokens={{ tinta: k.tinta, huruf: k.huruf, scrim: k.scrim }}
      kata={KATA}
      bobot={800}
      tinggiRel={0.07}
      trackingEm={-0.02}
      x={0.5}
      y={0.5}
      scrim={0.25}
    >
      <Bergerak dari={dari} frame={frame}><Shot jenis={jenis} k={k} /></Bergerak>
    </AnchoredCaption>
  );
};

export const DemoA: React.FC = () => <Isi k={TOKENS_A} />;
export const DemoB: React.FC = () => <Isi k={TOKENS_B} />;
