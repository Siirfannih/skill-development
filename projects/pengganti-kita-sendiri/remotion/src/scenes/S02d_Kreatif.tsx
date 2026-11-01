// 02d · «supaya kita bisa fokus jadi lebih KREATIF» — ruang charcoal. Piktogram menghadap bidang cahaya.
// Cahaya dibangun mengikuti kalimat: rim redup → berkas menyala di «fokus» → KREATIF muncul di bidang di «kreatif».
// Kamera C02 push-in lambat ke arah bidang. Keluar X14 (v9): snap zoom ke BLOOM_PT + aksen cahaya ≤ 40 %,
// lalu 02e match cut: zoom keluar dari titik ujung grafik di BLOOM_PT. (Bukan layar putih penuh.)
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, KWord, keys, prog, Scene, sfxMark, useT, Grain } from "../lib/anim";
import { panel, word } from "../lib/time";
import { BLOOM_PT, C, LightPlane, Pictogram } from "./_b2_shared";

const W_KITA = word("kita", "s2", 1);
const W_FOKUS = word("fokus", "s2", 1);
const W_KREATIF = word("kreatif", "s2", 1);

export const S02d_Kreatif: React.FC = () => {
  const t = useT();
  const p = panel("02d");
  const bloomA = p.end - 0.42;
  // C18 close di piktogram ×1,5 (push 1,45→1,5) → «fokus»: C06 reveal-out ke bidang cahaya (0,65 dtk, selesai sebelum
  // KREATIF) → C01 di «kreatif» (+7 %, 18 f) → push-in ke bidang saat bloom. Setelah reveal, semua zoom berpusat di BLOOM_PT.
  const rv = prog(t, W_FOKUS.s, W_FOKUS.s + 0.65, EZ.inOut);
  const zClose = keys(t, [[p.start, 1.45], [W_FOKUS.s, 1.5]], EZ.inOut);
  const zWide = (1 + 0.07 * prog(t, W_KREATIF.s, W_KREATIF.s + 18 / 30, EZ.out)) * keys(t, [[bloomA, 1.0], [p.end, 1.14]], EZ.inOut);
  const z = zClose + (zWide - zClose) * rv;
  const look = { x: 650 + (BLOOM_PT.x - 650) * rv, y: 600 + (BLOOM_PT.y - 600) * rv };
  const anch = { x: 960 + (BLOOM_PT.x - 960) * rv, y: 540 + (BLOOM_PT.y - 540) * rv };
  const T = { x: anch.x - look.x * z, y: anch.y - look.y * z };
  const rim = 0.35 + 0.25 * prog(t, W_KITA.s, W_KITA.s + 0.5) + 0.4 * prog(t, W_FOKUS.s, W_FOKUS.s + 0.4);
  const beam = 0.15 + 0.85 * prog(t, W_FOKUS.s, W_FOKUS.s + 0.45);
  const plane = 0.18 + 0.5 * prog(t, W_KITA.s, W_FOKUS.s, EZ.inOut) + 0.32 * prog(t, W_FOKUS.s, W_FOKUS.s + 0.35);
  const glow = 0.3 + 0.7 * prog(t, W_KREATIF.s, W_KREATIF.s + 0.5) + 0.5 * prog(t, bloomA, p.end, EZ.acc);
  // v9 (B14): TANPA blow-out putih. Keluar = snap zoom ke BLOOM_PT (4 f, EZ.acc, motion blur) + aksen cahaya ≤ 40 % di titik itu.
  // 02e mendarat dengan match cut: zoom keluar dari titik yang sama.
  const b = prog(t, bloomA, p.end - 1 / 30, EZ.acc);
  const snapK = prog(t, p.end - 4 / 30, p.end, EZ.acc);
  const snapZ = 1 + 0.6 * snapK;
  // SFXEV · metronom. Hit riser bloom (layar putih penuh di p.end) dicatat di S02e (frame pertama 02e).
  sfxMark(t, "cut", p.start, "02d:cut:x07"); // cut on motion dari 02c
  sfxMark(t, "toggle", W_FOKUS.s, "02d:beam:on"); // berkas cahaya menyala + bidang terang di «fokus»
  sfxMark(t, "whoosh", W_FOKUS.s + 0.65 / 2, "02d:cam:reveal"); // C06 reveal-out ×1,5→×1 (0,65 dtk EZ.inOut → tengah)
  return (
    <Scene code="02d">
      <AbsoluteFill style={{ background: C.charcoal, transform: snapK > 0 ? `scale(${snapZ})` : undefined, transformOrigin: `${BLOOM_PT.x}px ${BLOOM_PT.y}px`, filter: snapK > 0.02 ? `blur(${(10 * snapK).toFixed(2)}px)` : undefined }}>
        <AbsoluteFill style={{ transform: `translate(${T.x}px, ${T.y}px) scale(${z})`, transformOrigin: "0 0" }}>
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
              background: `radial-gradient(circle 560px at ${BLOOM_PT.x}px ${BLOOM_PT.y}px, rgba(255,255,255,${(0.4 * b).toFixed(3)}) 0%, rgba(255,255,255,0) 100%)`,
            }}
          />
        )}
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02d_Kreatif, covers: ["02d"] };
