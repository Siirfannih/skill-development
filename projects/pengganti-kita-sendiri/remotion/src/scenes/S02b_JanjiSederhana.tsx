// 02b · «dia punya janji sederhana» — kertas blueprint (R-BP). Judul dalam bingkai garis putih digores dulu,
// lalu garis janji putus-putus disketsa seperti rencana: ujung pena memimpin, titik tujuan + label JANJI.
// Teks di bawah grafik (judul gambar kerja), bukan di atas visual.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, KWord, keys, prog, Scene, useT, Grain } from "../lib/anim";
import { panel, word } from "../lib/time";
import { BlueprintGrid, BlueprintPaper, C, makePath } from "./_b2_shared";

const W_JANJI = word("janji", "s2", 1);
const W_SEDERHANA = word("sederhana", "s2", 1);

// garis janji 02b (bingkai 1920): kiri bawah → kanan atas
const LINE = makePath([[{ x: 230, y: 612 }, { x: 720, y: 584 }, { x: 1150, y: 430 }, { x: 1540, y: 196 }]]);
const FRAME = { x: 540, y: 744, w: 840, h: 156 };

export const S02b_JanjiSederhana: React.FC = () => {
  const t = useT();
  const p = panel("02b");
  // close di judul ×1,22→1,25 (C02 tensi) → C06 reveal-out ke grafik saat garis mulai disketsa.
  // Zoom berpusat di judul: judul tidak bergeser, tepinya ≤6 px/f.
  const cam = keys(t, [[p.start, 1.22], [W_SEDERHANA.s + 0.13, 1.25], [p.end - 0.07, 1.02]], EZ.inOut);
  const camG = 1 + (cam - 1) * 0.8; // grid lapis belakang (parallax)
  // bingkai digores mulai «janji» (keliling rect, satu goresan pena)
  const fr = prog(t, W_JANJI.s, W_JANJI.s + 0.42, EZ.inOut);
  // sumbu dan garis janji disketsa setelah judul lengkap
  const axis = prog(t, W_SEDERHANA.s + 0.05, W_SEDERHANA.s + 0.4, EZ.out);
  const d0 = W_SEDERHANA.s + 0.2;
  const d1 = p.end - 0.3;
  const draw = prog(t, d0, d1, EZ.inOut);
  const tip = LINE.at(draw * LINE.L);
  const dot = prog(t, d1, d1 + 0.12, EZ.out);
  const per = 2 * (FRAME.w + FRAME.h);
  return (
    <Scene code="02b">
      <AbsoluteFill>
        <BlueprintPaper />
        <AbsoluteFill style={{ transform: `scale(${camG})`, transformOrigin: `${FRAME.x + FRAME.w / 2}px ${FRAME.y + FRAME.h / 2}px` }}>
          <BlueprintGrid />
        </AbsoluteFill>
        <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: `${FRAME.x + FRAME.w / 2}px ${FRAME.y + FRAME.h / 2}px` }}>
          {/* garis margin kertas */}
          <div style={{ position: "absolute", left: 52, top: 0, width: 2, height: 1080, background: "rgba(255,255,255,0.4)" }} />
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {/* sumbu waktu */}
            <line x1={200} y1={650} x2={200 + 1500 * axis} y2={650} stroke="rgba(255,255,255,0.45)" strokeWidth={3} />
            {/* garis janji: jejak putus-putus terbuka sepanjang goresan */}
            <path d={LINE.d} stroke={C.white} strokeWidth={8} strokeLinecap="round" fill="none"
              strokeDasharray="28 24" mask="url(#reveal02b)" />
            <mask id="reveal02b">
              <path d={LINE.d} stroke="#fff" strokeWidth={30} fill="none" pathLength={1} strokeDasharray={`${draw} 2`} />
            </mask>
            {/* ujung pena (memimpin goresan) */}
            {draw > 0 && draw < 1 && <circle cx={tip.x} cy={tip.y} r={6} fill={C.white} />}
            {/* titik tujuan */}
            <circle cx={1540} cy={196} r={16 * dot} fill={C.white} />
            {/* bingkai judul digores */}
            <rect x={FRAME.x} y={FRAME.y} width={FRAME.w} height={FRAME.h} fill="none" stroke={C.white} strokeWidth={3}
              strokeDasharray={`${per * fr} ${per}`} />
          </svg>
          {/* label menempel di titik tujuan, di kanannya */}
          <div style={{ position: "absolute", left: 1576, top: 176, fontFamily: "Inter", fontWeight: 600, fontSize: 30, letterSpacing: 4.2, color: C.white }}>
            <KWord at={d1 - 2 / 30} kind="pop">JANJI</KWord>
          </div>
          {/* judul */}
          <div style={{ position: "absolute", left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h, display: "flex", justifyContent: "center", alignItems: "center", gap: 28, fontFamily: "Inter", fontWeight: 700, fontSize: 104, letterSpacing: -3.1, lineHeight: 1, color: C.white, whiteSpace: "nowrap" }}>
            <KWord at={W_JANJI.s} kind="rise">janji</KWord>
            <KWord at={W_SEDERHANA.s} kind="rise">sederhana</KWord>
          </div>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02b_JanjiSederhana, covers: ["02b"] };
