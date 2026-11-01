// 02b · «dia punya janji sederhana» — kertas blueprint (R-BP). Judul dalam bingkai garis putih digores dulu,
// lalu garis janji putus-putus disketsa seperti rencana: ujung pena memimpin, titik tujuan + label JANJI.
// Teks di bawah grafik (judul gambar kerja), bukan di atas visual.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, useSceneFrom, keys, prog, Scene, sfxMark, useT, Grain } from "../lib/anim";
import { AnchorWord, useFrameAt } from "../lib/AnchorWord";
import { panel, word } from "../lib/time";
import { BlueprintGrid, BlueprintPaper, C, makePath } from "./_b2_shared";
import { ezHalf } from "./_b1_shared";

const W_JANJI = word("janji", "s2", 1);
const W_SEDERHANA = word("sederhana", "s2", 1);

// garis janji 02b (bingkai 1920): kiri bawah → kanan atas
const LINE = makePath([[{ x: 230, y: 612 }, { x: 720, y: 584 }, { x: 1150, y: 430 }, { x: 1540, y: 196 }]]);
const GOAL = { x: 1540, y: 196 }; // titik tujuan = ujung kurva

export const S02b_JanjiSederhana: React.FC = () => {
  const t = useT();
  const sceneFrom = useSceneFrom();
  const p = panel("02b");
  const atJanji = useFrameAt(713); // v9: f terukur ANCHORS-V9 #7 (JANJI)
  // v9 (B3): judul + kotak outline dibuang. Kamera C02 push pelan 1,0→1,12 ke arah ujung kurva (titik tujuan), lalu reveal-out di akhir.
  const cam = keys(t, [[p.start, 1.0], [p.end - 0.35, 1.12], [p.end - 0.07, 1.04]], EZ.inOut);
  const camG = 1 + (cam - 1) * 0.8; // grid lapis belakang (parallax)
  // sumbu dan garis janji disketsa setelah judul lengkap
  const axisA = W_SEDERHANA.s + 0.05;
  const axis = prog(t, axisA, W_SEDERHANA.s + 0.4, EZ.out);
  const d0 = W_JANJI.s + 0.06; // pena mulai di «janji» (anchor JANJI menempel di ujung pena)
  const d1 = p.end - 0.3;
  const draw = prog(t, d0, d1, EZ.inOut);
  const tip = LINE.at(draw * LINE.L);
  const dot = prog(t, d1, d1 + 0.12, EZ.out);
  // SFXEV · metronom
  sfxMark(t, "draw", axisA, "02b:axis:draw"); // sumbu waktu
  sfxMark(t, "draw", d0, "02b:line:draw"); // garis janji disketsa, ujung pena memimpin
  sfxMark(t, "pop", ezHalf(d1, d1 + 0.12), "02b:dot:goal"); // titik tujuan (label JANJI = KWord, tercatat otomatis)
  return (
    <Scene code="02b">
      <AbsoluteFill>
        <BlueprintPaper />
        <AbsoluteFill style={{ transform: `scale(${camG})`, transformOrigin: `${GOAL.x}px ${GOAL.y + 300}px` }}>
          <BlueprintGrid />
        </AbsoluteFill>
        <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: `${GOAL.x}px ${GOAL.y + 300}px` }}>
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
          </svg>
          {/* v9 (B3): JANJI = anchor tracking ujung pena → titik tujuan (kotak outline dibuang). Posisi dasar = di kanan-bawah titik tujuan,
              offset trackFn = (ujung pena − titik tujuan) sehingga kata mengikuti kurva; rata kanan supaya tidak keluar frame. Tanpa SFX (pop titik sudah ada). */}
          <AnchorWord text="JANJI" at={atJanji} x={GOAL.x} y={GOAL.y + 150} size={140} color={C.white} align="center" enter="scale"
            trackFn={(fr) => { const tt = (fr + sceneFrom) / 30; const d = prog(tt, d0, d1, EZ.inOut); const q = LINE.at(d * LINE.L);
              // QC 2 Nov: tengah kata dijepit 400..1500 px supaya tidak terpotong tepi frame saat ujung pena di awal/akhir kurva
              return { x: Math.min(1500, Math.max(400, q.x)) - GOAL.x, y: q.y - GOAL.y }; }} />
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02b_JanjiSederhana, covers: ["02b"] };
