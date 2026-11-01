// 04c · «Pertanyaannya adalah, apakah arahnya masih sama dengan janjinya dulu?» — payoff grafik janji (framing ke-3, wide).
// Gaya sama dengan 02e/02f: janji = garis putus-putus, kenyataan = garis solid. Titik rilis dari 04b mendarat di garis solid,
// garis berjalan di atas janji lalu di «arahnya» berbelok menjauh; area jarak berarsir; label menempel di ujung garis.
// Kamera C06 reveal-out (dekat → wide). Keluar X13 frame-in-frame: seluruh grafik menyusut jadi kartu klip Altman (04d).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, prog, Scene, sfxMark, useT, Panel2x } from "../lib/anim";
import { panel, word } from "../lib/time";
import { AnchorWord, useFrameAt } from "../lib/AnchorWord";
import { ezAt } from "./_b3_shared";
import { DOT04B, DOT_U, graphToScreen, lerp, onBend, onShared, P2, SEG_BEND, SEG_SHARED } from "./_b4_shared";

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
  const atArah = useFrameAt(2037), atJanjinya = useFrameAt(2079), outAnchor = useFrameAt(Math.round(70.22 * 30)); // v9: f terukur ANCHORS-V9 #18
  const tSama = word("sama", "s4", 2).s;
  const X0 = 70.22; // frame-in-frame mulai sesudah «dulu» selesai (jeda sebelum Altman)

  // progres gambar garis
  const drawA0 = P.start + 0.03;
  const drawB0 = tArah + 2 / 30;
  const drawA = prog(t, drawA0, tArah, EZ.inOut); // segmen bersama (di atas janji)
  const drawB = prog(t, drawB0, tArah + 0.95, EZ.inOut); // belokan menjauh
  const tipA = onShared(uShared(drawA));
  const tipB = onBend(uBend(drawB));

  // kamera: dekat mengikuti ujung garis → reveal-out wide (grafik naik, ruang teks di bawah)
  const wideA = tArah - 0.35;
  const wideB = tMasih + 0.25;
  const wide = prog(t, wideA, wideB, EZ.inOut);
  // C20 cut zoom di «adalah»: potong 1,5× lebih dekat ke ujung garis, momentum 6 f; lalu C18 follow ujung
  const tCut = word("adalah", "s4").s;
  const cut = t >= tCut;
  const sA = cut ? 2.3 * (1 + 0.04 * (1 - prog(t, tCut, tCut + 6 / 30, EZ.out))) : 1.55;
  const sB = 0.98; // v9 (B9): wide 0,88× → 0,98× supaya grafik mengisi frame (v8: grafik kecil di dalam kotak)
  // C01 zoom mikro di «sama» (grafik saja; teks pertanyaan tetap diam)
  const c01 = 1 + 0.05 * prog(t, tSama, tSama + 0.6, EZ.out);
  const s = Math.exp(lerp(Math.log(sA), Math.log(sB), wide)) * c01;
  const mid = graphToScreen(onShared(0.5));
  const follow = graphToScreen(tipA);
  const fk = cut ? 0.9 : 0.55;
  const Fclose = { x: lerp(mid.x, follow.x, fk), y: lerp(mid.y, follow.y, fk) };
  const Fwide = { x: 960, y: 648 };
  const F = { x: lerp(Fclose.x, Fwide.x, wide), y: lerp(Fclose.y, Fwide.y, wide) };
  const T = { x: -(F.x - O.x) * s, y: -(F.y - O.y) * s };
  const proj = (p: P2) => ({ x: O.x + (p.x - O.x) * s + T.x, y: O.y + (p.y - O.y) * s + T.y });

  // keluar (v10 #25, Irfan 9): tanpa kartu berbingkai. Grafik ditarik masuk (zoom-through + blur + gelap) lalu hard cut ke Altman full frame.
  const exB = P.end - 0.02;
  const ex = prog(t, X0, exB, EZ.acc);
  const exS = 1 + 0.55 * ex;

  // titik rilis: dari posisi 04b (layar) mendarat di garis solid
  const landB = P.start + 0.42;
  const land = prog(t, P.start, landB, EZ.out);
  const dotR = lerp(10, 6 * 2 * s, land);

  const hatchW = drawB * 440;
  const stopDown = 1 - 0.35 * ex;

  // ── SFXEV (metronom SFX)
  sfxMark(t, "cut", P.start, "04c:cut:in"); // timeline langit 04b → grafik blueprint
  sfxMark(t, "whoosh", P.start, "04c:dots:fly"); // titik rilis melesat dari posisi 04b (EZ.out → awal)
  sfxMark(t, "land", ezAt(P.start, landB, EZ.out, 0.95), "04c:dots:land"); // titik mendarat di garis solid (95 %)
  sfxMark(t, "draw", drawA0, "04c:line:solid"); // garis solid mulai tergambar di atas janji
  sfxMark(t, "cut", tCut, "04c:cutzoom"); // C20 cut zoom ×1,5 di «adalah»
  sfxMark(t, "draw", drawB0, "04c:line:bend"); // garis berbelok menjauh dari janji
  sfxMark(t, "whoosh", (wideA + wideB) / 2, "04c:cam:revealout"); // C06 reveal-out ke wide (EZ.inOut → tengah)
  sfxMark(t, "whoosh", (X0 + exB) / 2, "04c:x13:shrink"); // grafik menyusut jadi kartu klip (EZ.inOut → tengah)

  return (
    <Scene code="04c">
      <AbsoluteFill style={{ background: "var(--sb-charcoal)" }}>
        <AbsoluteFill style={{ background: "var(--bp-900)" }}>
          <AbsoluteFill style={{ transform: `scale(${exS})`, transformOrigin: "960px 540px", filter: `brightness(${stopDown}) blur(${ex * 7}px)` }}>
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
                </div>
              </Panel2x>
            </Camera>
            {/* v10 (#29): label di lapisan LAYAR di ruang kosong (grid biru dipertahankan). ARAHNYA di bawah ujung garis solid (kanan-bawah, di safe zone x≤1632 / y≤864, ukuran seragam 72);
                JANJINYA di kiri ujung garis putus-putus, di atas jalurnya dengan jarak ≥ 40 px (tidak menempel tepi atas, tidak menimpa garis). */}
            <AnchorWord text="ARAHNYA" at={atArah} until={outAnchor} x={1632} y={835} size={72} color="#fff" align="right" enter="left" grain={0.35}
              sfx={{ kind: "scifi_whoosh", id: "04c:anchor:arahnya" }} />
            <AnchorWord text="JANJINYA" at={atJanjinya} until={outAnchor} x={1560} y={245} size={72} color="#fff" align="right" enter="right" grain={0.35} />
            {/* titik rilis 04b → titik di garis solid */}
            {DOT_U.map((u, i) => {
              const target = proj(graphToScreen(onShared(u)));
              const d = { x: lerp(DOT04B[i].x, target.x, land), y: lerp(DOT04B[i].y, target.y, land) };
              return <div key={i} style={{ position: "absolute", left: d.x - dotR, top: d.y - dotR, width: dotR * 2, height: dotR * 2, borderRadius: 999, background: "#fff", boxShadow: "0 0 0 3px color-mix(in srgb, var(--bp-900) 60%, transparent)" }} />;
            })}
          </AbsoluteFill>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04c_ArahJanji, covers: ["04c"] };
