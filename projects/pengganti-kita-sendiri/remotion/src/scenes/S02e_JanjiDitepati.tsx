// 02e–02f · grafik janji (editorial chart, R-BP). Satu dunia, satu kamera kontinu:
// 02e  bloom dari 02d mengerut ke titik ujung garis kenyataan. Close-up C18 mengikuti titik yang berjalan tepat di atas
//      jalur janji putus-putus; label DITEPATI menempel di titik pada «ditepati»; «jauh lebih cepat» = titik melaju.
// 02f  «Tapi di satu sisi, kita juga…» titik melambat mendekati ujung jalur janji (ketegangan). «tidak» = C15 kamera
//      patah ke wide: garis solid melewati ujung janji dan terus naik keluar frame. «di tahap ini» = penanda vertikal +
//      label TAHAP INI di bawah sumbu. Keluar X17 hard cut di batas babak (akhir 02f).
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, KWord, keys, prog, Scene, useT, Grain } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { BLOOM_PT, BlueprintGrid, BlueprintPaper, C, CHART, PROMISE, REALITY } from "./_b2_shared";

const W_DITEPATI = word("ditepati", "s2", 1);
const W_KITA = word("kita", "s2", 2);
const W_CEPAT = word("cepat", "s2", 1);
const W_TAPI = word("tapi", "s2", 1);
const W_JAUH = word("jauh", "s2", 1);
const W_TIDAK = word("tidak", "s2", 1);
const W_DI = word("di", "s2", 2);
const W_TAHAP = word("tahap", "s2", 1);

const L1 = PROMISE.L; // panjang jalur janji (sampai TAHAP INI)
const LT = REALITY.L;
const ZC = 1.9; // zoom close-up
const TIP_SCREEN = { x: 1060, y: 560 }; // posisi titik di layar saat close-up

export const S02e_JanjiDitepati: React.FC = () => {
  const t = useT();
  const pe = panel("02e");
  const pf = panel("02f");
  const snap = W_TIDAK.s; // C15
  // panjang garis kenyataan (dunia) sepanjang waktu
  const sOf = (tt: number) =>
    tt < snap
      ? keys(tt, [
          [pe.start, 0.16 * L1],
          [W_DITEPATI.s, 0.46 * L1],
          [W_KITA.s, 0.53 * L1],
          [W_CEPAT.s + 0.3, 0.88 * L1],
          [W_TAPI.s, 0.92 * L1],
          [snap - 0.02, 0.985 * L1],
        ], EZ.inOut)
      : 0.985 * L1 + (LT - 0.985 * L1) * prog(tt, snap, snap + 0.95, EZ.out);
  const s = sOf(t);
  const tip = REALITY.at(s);
  const tipLag = REALITY.at(sOf(t - 0.1)); // kamera ikut dengan lag

  // kamera: close-up mengikuti titik; awal 02e titik di BLOOM_PT lalu bergeser ke TIP_SCREEN; C15 patah ke wide
  const settle = prog(t, pe.start, pe.start + 1.1, EZ.inOut);
  const anchor = { x: BLOOM_PT.x + (TIP_SCREEN.x - BLOOM_PT.x) * settle, y: BLOOM_PT.y + (TIP_SCREEN.y - BLOOM_PT.y) * settle };
  // pola fokus: C18 close-follow ×1,9 → C01 di «jauh» (+0,12 dalam 20 f) → C02 push tensi di «Tapi… kita juga»
  // (×2,02→×2,3) → C15 patah ke wide di «tidak» (6 f). Titik ujung = jangkar, jadi label di titik tetap diam saat zoom.
  const zc = ZC * (1 + 0.063 * prog(t, W_JAUH.s, W_JAUH.s + 20 / FPS, EZ.out)) * keys(t, [[W_TAPI.s, 1.0], [snap, 1.14]], EZ.inOut);
  const closeT = { x: anchor.x - tipLag.x * zc, y: anchor.y - tipLag.y * zc };
  const w = prog(t, snap, snap + 6 / FPS, EZ.out); // patah cepat
  const drift = keys(t, [[snap + 6 / FPS, 1.0], [pf.end, 1.025]], EZ.inOut); // drift wide ≤1,03
  const Z = (zc + (1 - zc) * w) * (w >= 1 ? drift : 1);
  const wideT = { x: 960 - 960 * Z, y: 540 - 540 * Z };
  const T = { x: closeT.x + (wideT.x - closeT.x) * w, y: closeT.y + (wideT.y - closeT.y) * w };
  const camBlur = w > 0 && w < 1 ? 6 * Math.sin(Math.PI * w) : 0;
  const scr = (p: { x: number; y: number }) => ({ x: p.x * Z + T.x, y: p.y * Z + T.y });
  // 2.5D: grid kertas di lapis belakang, parallax 80 % dari zoom kamera
  const ctr = { x: (960 - T.x) / Z, y: (540 - T.y) / Z };
  const Zg = 1 + (Z - 1) * 0.8;
  const Tg = { x: 960 - ctr.x * Zg, y: 540 - ctr.y * Zg };

  // bloom masuk (X14): putih penuh mengerut ke titik ujung
  const bl = 1 - prog(t, pe.start, pe.start + 0.5, EZ.out);
  const tipS = scr(tip);

  // label DITEPATI menempel di titik, keluar sebelum kamera patah
  const lblOut = snap - 0.35;
  // penanda TAHAP INI
  const mk = prog(t, W_DI.s, W_DI.s + 0.35, EZ.out);
  const endDot = prog(t, W_DI.s - 0.1, W_DI.s + 0.15, EZ.out);
  const sFrac = s / LT;
  return (
    <Scene start={pe.start} end={pf.end} name="02e–02f Grafik janji">
      <AbsoluteFill>
        <BlueprintPaper />
        <AbsoluteFill style={{ transform: `translate(${Tg.x}px, ${Tg.y}px) scale(${Zg})`, transformOrigin: "0 0", filter: camBlur > 0.1 ? `blur(${camBlur}px)` : undefined }}>
          <BlueprintGrid />
        </AbsoluteFill>
        <AbsoluteFill style={{ transform: `translate(${T.x}px, ${T.y}px) scale(${Z})`, transformOrigin: "0 0", filter: camBlur > 0.1 ? `blur(${camBlur}px)` : undefined }}>
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
            {/* sumbu waktu */}
            <line x1={120} y1={CHART.axisY} x2={2400} y2={CHART.axisY} stroke="rgba(255,255,255,0.45)" strokeWidth={3} />
            {/* penanda TAHAP INI (tumbuh dari sumbu) */}
            <line x1={CHART.stage.x} y1={CHART.axisY} x2={CHART.stage.x} y2={CHART.axisY - (CHART.axisY - CHART.markerTop) * mk}
              stroke="rgba(255,255,255,0.5)" strokeWidth={3} />
            {/* jalur janji: putus-putus lebar, putih 40 % */}
            <path d={PROMISE.d} stroke="rgba(255,255,255,0.4)" strokeWidth={CHART.trackW} strokeDasharray={CHART.trackDash} strokeLinecap="round" fill="none" />
            <circle cx={CHART.stage.x} cy={CHART.stage.y} r={CHART.trackW * 0.75} fill="rgba(255,255,255,0.4)" />
            {/* garis kenyataan: solid, tepat di atas jalur janji */}
            <path d={REALITY.d} stroke={C.white} strokeWidth={CHART.solidW} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={`${sFrac} 2`} />
            {/* titik ujung (tujuan bloom) */}
            <circle cx={tip.x} cy={tip.y} r={10 * (1 - 0.3 * w)} fill={C.white} />
            {/* titik janji berhenti, ditegaskan saat penanda tumbuh */}
            <circle cx={CHART.stage.x} cy={CHART.stage.y} r={7 * endDot} fill="rgba(255,255,255,0.85)" />
          </svg>
        </AbsoluteFill>

        {/* label menempel di titik (ruang layar, ukuran tetap) — di bawah kanan titik, di bawah garis */}
        {t < lblOut + 0.2 && (
          <div style={{ position: "absolute", left: tipS.x + 34, top: tipS.y + 30, fontFamily: "Inter", fontWeight: 600, fontSize: 50, letterSpacing: 5, color: C.white, whiteSpace: "nowrap" }}>
            <KWord at={W_DITEPATI.s} out={lblOut} kind="pop">DITEPATI</KWord>
          </div>
        )}
        {/* label penanda: menempel di kanan ujung atas penanda (jauh dari zona UI bawah dan dari garis solid) */}
        {t >= snap && (() => {
          const m = scr({ x: CHART.stage.x, y: CHART.markerTop });
          return (
            <div style={{ position: "absolute", left: m.x + 24, top: m.y - 6, fontFamily: "Inter", fontWeight: 600, fontSize: 50, letterSpacing: 5, color: C.white, whiteSpace: "nowrap" }}>
              <KWord at={W_TAHAP.s} kind="rise" dist={18}>TAHAP INI</KWord>
            </div>
          );
        })()}

        {bl > 0 && (
          <AbsoluteFill
            style={{ background: `radial-gradient(circle at ${tipS.x}px ${tipS.y}px, rgba(255,255,255,1) ${bl * 130}%, rgba(255,255,255,${bl * bl}) ${bl * 170 + 2}%, rgba(255,255,255,0) 100%)` }}
          />
        )}
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02e_JanjiDitepati, covers: ["02e", "02f"] };
