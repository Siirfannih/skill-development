// 04c · «Pertanyaannya adalah, apakah arahnya masih sama dengan janjinya dulu?» — payoff grafik janji (framing ke-3, wide).
// Gaya sama dengan 02e/02f: janji = garis putus-putus, kenyataan = garis solid. Titik rilis dari 04b mendarat di garis solid,
// garis berjalan di atas janji lalu di «arahnya» berbelok menjauh; area jarak berarsir; label menempel di ujung garis.
// Kamera C06 reveal-out (dekat → wide). Keluar X13 frame-in-frame: seluruh grafik menyusut jadi kartu klip Altman (04d).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, KWord, prog, Scene, useT, Panel2x } from "../lib/anim";
import { panel, word } from "../lib/time";
import { CLIP_CARD, DOT04B, DOT_U, graphToScreen, lerp, onBend, onShared, P2, SEG_BEND, SEG_SHARED } from "./_b4_shared";

const O = { x: 960, y: 540 };
const pathD = (s: [P2, P2, P2, P2]) => `M${s[0].x} ${s[0].y} C ${s[1].x} ${s[1].y}, ${s[2].x} ${s[2].y}, ${s[3].x} ${s[3].y}`;
// konversi fraksi panjang busur → parameter u (supaya label/kamera tepat di ujung garis yang tergambar)
const arcTable = (fn: (u: number) => P2) => {
  const N = 120;
  const L = [0];
  let prev = fn(0);
  for (let i = 1; i <= N; i++) {
    const p = fn(i / N);
    L.push(L[i - 1] + Math.hypot(p.x - prev.x, p.y - prev.y));
    prev = p;
  }
  return (frac: number) => {
    const target = frac * L[N];
    let i = 1;
    while (i < N && L[i] < target) i++;
    const a = L[i - 1];
    const b = L[i];
    return (i - 1 + (b > a ? (target - a) / (b - a) : 0)) / N;
  };
};
const uShared = arcTable(onShared);
const uBend = arcTable(onBend);

export const S04c_ArahJanji: React.FC = () => {
  const t = useT();
  const P = panel("04c");
  const tArah = word("arahnya", "s4").s;
  const tMasih = word("masih", "s4").s;
  const tSama = word("sama", "s4", 2).s;
  const tJanji = word("janjinya", "s4").s;
  const X0 = 70.22; // frame-in-frame mulai sesudah «dulu» selesai (jeda sebelum Altman)

  // progres gambar garis
  const drawA = prog(t, P.start + 0.03, tArah, EZ.inOut); // segmen bersama (di atas janji)
  const drawB = prog(t, tArah + 2 / 30, tArah + 0.95, EZ.inOut); // belokan menjauh
  const tipA = onShared(uShared(drawA));
  const tipB = onBend(uBend(drawB));

  // kamera: dekat mengikuti ujung garis → reveal-out wide (grafik naik, ruang teks di bawah)
  const wide = prog(t, tArah - 0.35, tMasih + 0.25, EZ.inOut);
  // C20 cut zoom di «adalah»: potong 1,5× lebih dekat ke ujung garis, momentum 6 f; lalu C18 follow ujung
  const tCut = word("adalah", "s4").s;
  const cut = t >= tCut;
  const sA = cut ? 2.3 * (1 + 0.04 * (1 - prog(t, tCut, tCut + 6 / 30, EZ.out))) : 1.55;
  const sB = 0.88;
  // C01 zoom mikro di «sama» (grafik saja; teks pertanyaan tetap diam)
  const c01 = 1 + 0.05 * prog(t, tSama, tSama + 0.6, EZ.out);
  const s = Math.exp(lerp(Math.log(sA), Math.log(sB), wide)) * c01;
  const mid = graphToScreen(onShared(0.5));
  const follow = graphToScreen(tipA);
  const fk = cut ? 0.9 : 0.55;
  const Fclose = { x: lerp(mid.x, follow.x, fk), y: lerp(mid.y, follow.y, fk) };
  const Fwide = { x: 960, y: 683 };
  const F = { x: lerp(Fclose.x, Fwide.x, wide), y: lerp(Fclose.y, Fwide.y, wide) };
  const T = { x: -(F.x - O.x) * s, y: -(F.y - O.y) * s };
  const proj = (p: P2) => ({ x: O.x + (p.x - O.x) * s + T.x, y: O.y + (p.y - O.y) * s + T.y });

  // keluar: frame-in-frame
  const ex = prog(t, X0, P.end - 0.02, EZ.inOut);
  const k = lerp(1, Math.max(CLIP_CARD.w / 1920, CLIP_CARD.h / 1080), ex);
  const ccx = CLIP_CARD.x + CLIP_CARD.w / 2;
  const ccy = CLIP_CARD.y + CLIP_CARD.h / 2;
  const inset = `inset(${CLIP_CARD.y * ex}px ${(1920 - CLIP_CARD.x - CLIP_CARD.w) * ex}px ${(1080 - CLIP_CARD.y - CLIP_CARD.h) * ex}px ${CLIP_CARD.x * ex}px round ${CLIP_CARD.r * ex}px)`;

  // titik rilis: dari posisi 04b (layar) mendarat di garis solid
  const land = prog(t, P.start, P.start + 0.42, EZ.out);
  const dotR = lerp(10, 6 * 2 * s, land);

  const hatchW = drawB * 440;
  const lblOut = 1 - prog(t, X0, X0 + 0.15, EZ.acc);
  const lblArah = prog(t, tArah + 2 / 30, tArah + 0.3, EZ.out) * lblOut;
  const lblJanji = prog(t, tJanji + 2 / 30, tJanji + 0.35, EZ.out) * lblOut;
  const stopDown = 1 - 0.25 * ex;

  return (
    <Scene code="04c">
      <AbsoluteFill style={{ background: "var(--sb-charcoal)" }}>
        <AbsoluteFill style={{ clipPath: inset, background: "var(--bp-900)" }}>
          <AbsoluteFill style={{ transform: `translate(${(ccx - 960) * ex}px, ${(ccy - 540) * ex}px) scale(${k})`, transformOrigin: "960px 540px", filter: `brightness(${stopDown})` }}>
            <AbsoluteFill style={{ background: "linear-gradient(160deg, var(--bp-700) 0%, var(--bp-900) 100%)" }} />
            <Camera scale={s} x={T.x} y={T.y}>
              <div style={{ position: "absolute", left: -1600, top: -1200, width: 5120, height: 3480, backgroundImage: "linear-gradient(180deg, color-mix(in srgb, #fff 16%, transparent) 2px, transparent 2px), linear-gradient(90deg, color-mix(in srgb, #fff 16%, transparent) 2px, transparent 2px)", backgroundSize: "96px 96px", backgroundPosition: "-64px -48px" }} />
              <Panel2x style={{ overflow: "visible" }}>
                <div style={{ position: "absolute", left: 60, top: 120, width: 860, height: 380 }}>
                  <svg viewBox="0 0 860 380" width={860} height={380} style={{ overflow: "visible" }}>
                    <defs>
                      <pattern id="hatch04c" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="12" stroke="#fff" strokeOpacity="0.3" strokeWidth="3" />
                      </pattern>
                      <clipPath id="hatchClip04c"><rect x={380} y={-20} width={hatchW} height={420} /></clipPath>
                    </defs>
                    {/* jarak janji ↔ arah */}
                    <path d="M380 230 L 820 40 L 820 330 C 700 300, 520 260, 380 230 Z" fill="url(#hatch04c)" clipPath="url(#hatchClip04c)" />
                    {/* janji (putus-putus) */}
                    <path d={`${pathD(SEG_SHARED)} L 820 40`} stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeDasharray="14 12" strokeLinecap="round" fill="none" />
                    <circle cx="820" cy="40" r="8" fill="#fff" fillOpacity="0.55" />
                    {/* kenyataan (solid) */}
                    <path d={pathD(SEG_SHARED)} pathLength={1} stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" strokeDasharray="1 1" strokeDashoffset={1 - drawA} opacity={drawA > 0 ? 1 : 0} />
                    <path d={pathD(SEG_BEND)} pathLength={1} stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" strokeDasharray="1 1" strokeDashoffset={1 - drawB} opacity={drawB > 0 ? 1 : 0} />
                    {drawB > 0 && <circle cx={tipB.x} cy={tipB.y} r={10} fill="#fff" />}
                  </svg>
                  {/* label menempel di ujung garis */}
                  <span style={{ position: "absolute", left: tipB.x + 14, top: tipB.y + 14, fontFamily: "Inter", fontWeight: 600, fontSize: 26, letterSpacing: 3, color: "#fff", opacity: lblArah, transform: `translateY(${(1 - lblArah) * 6}px)`, whiteSpace: "nowrap" }}>ARAH</span>
                  <span style={{ position: "absolute", left: 820 + 14, top: 40 - 26, fontFamily: "Inter", fontWeight: 600, fontSize: 26, letterSpacing: 3, color: "rgba(255,255,255,0.75)", opacity: lblJanji, transform: `translateY(${(1 - lblJanji) * 6}px)`, whiteSpace: "nowrap" }}>JANJI</span>
                </div>
              </Panel2x>
            </Camera>
            {/* titik rilis 04b → titik di garis solid */}
            {DOT_U.map((u, i) => {
              const target = proj(graphToScreen(onShared(u)));
              const d = { x: lerp(DOT04B[i].x, target.x, land), y: lerp(DOT04B[i].y, target.y, land) };
              return <div key={i} style={{ position: "absolute", left: d.x - dotR, top: d.y - dotR, width: dotR * 2, height: dotR * 2, borderRadius: 999, background: "#fff", boxShadow: "0 0 0 3px color-mix(in srgb, var(--bp-900) 60%, transparent)" }} />;
            })}
            {/* pertanyaan di bawah grafik */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 860, textAlign: "center", fontFamily: "Inter", fontWeight: 800, fontSize: 120, letterSpacing: -4, lineHeight: 1, color: "#fff", whiteSpace: "nowrap" }}>
              <KWord at={tMasih} out={X0 - 0.05}>masih</KWord>{" "}
              <KWord at={tSama} out={X0 - 0.05}>sama</KWord>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04c_ArahJanji, covers: ["04c"] };
