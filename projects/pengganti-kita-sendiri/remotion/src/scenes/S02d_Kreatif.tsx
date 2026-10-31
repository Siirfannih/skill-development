// 02d · «supaya kita bisa fokus jadi lebih KREATIF» — ruang charcoal. Piktogram menghadap bidang cahaya.
// Cahaya dibangun mengikuti kalimat: rim redup → berkas menyala di «fokus» → KREATIF muncul di bidang di «kreatif».
// Kamera C02 push-in lambat ke arah bidang. Keluar X14: bidang cahaya mekar (bloom) sampai layar putih penuh,
// lalu 02e mengerut dari putih ke titik ujung grafik di BLOOM_PT.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, KWord, keys, prog, Scene, useT, Grain } from "../lib/anim";
import { panel, word } from "../lib/time";
import { BLOOM_PT, C, LightPlane, Pictogram } from "./_b2_shared";

const W_KITA = word("kita", "s2", 1);
const W_FOKUS = word("fokus", "s2", 1);
const W_KREATIF = word("kreatif", "s2", 1);

export const S02d_Kreatif: React.FC = () => {
  const t = useT();
  const p = panel("02d");
  const bloomA = p.end - 0.42;
  // C02 push-in lambat, berpusat di bidang cahaya (titik bloom tetap di tempat)
  const z = keys(t, [[p.start, 1.0], [bloomA, 1.08], [p.end, 1.16]], EZ.inOut);
  const rim = 0.35 + 0.25 * prog(t, W_KITA.s, W_KITA.s + 0.5) + 0.4 * prog(t, W_FOKUS.s, W_FOKUS.s + 0.4);
  const beam = 0.15 + 0.85 * prog(t, W_FOKUS.s, W_FOKUS.s + 0.45);
  const plane = 0.18 + 0.5 * prog(t, W_KITA.s, W_FOKUS.s, EZ.inOut) + 0.32 * prog(t, W_FOKUS.s, W_FOKUS.s + 0.35);
  const glow = 0.3 + 0.7 * prog(t, W_KREATIF.s, W_KREATIF.s + 0.5) + 2 * prog(t, bloomA, p.end, EZ.acc);
  // bloom: lingkaran putih mekar dari bidang, eksposur naik
  const b = prog(t, bloomA, p.end - 1 / 30, EZ.acc);
  return (
    <Scene code="02d">
      <AbsoluteFill style={{ background: C.charcoal, filter: b > 0 ? `brightness(${1 + 0.8 * b})` : undefined }}>
        <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: `${BLOOM_PT.x}px ${BLOOM_PT.y}px` }}>
          <LightPlane beam={beam} plane={plane} glow={glow}>
            <span style={{ fontFamily: "Inter", fontWeight: 900, fontStyle: "italic", fontSize: 136, lineHeight: 1, letterSpacing: -1.4, color: C.ink, whiteSpace: "nowrap" }}>
              <KWord at={W_KREATIF.s} kind="blurIn">KREATIF</KWord>
            </span>
          </LightPlane>
          <Pictogram rim={rim} />
          {/* lantai gelap memudar */}
          <div style={{ position: "absolute", left: -200, top: 800, width: 2320, height: 480, background: `linear-gradient(180deg, rgba(16,18,22,0) 0%, ${C.charcoal} 58%)` }} />
        </AbsoluteFill>
        {b > 0 && (
          <AbsoluteFill
            style={{
              background: `radial-gradient(circle at ${BLOOM_PT.x}px ${BLOOM_PT.y}px, rgba(255,255,255,1) ${b * 120}%, rgba(255,255,255,${b}) ${b * 160 + 10}%, rgba(255,255,255,${b * b}) 100%)`,
            }}
          />
        )}
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02d_Kreatif, covers: ["02d"] };
