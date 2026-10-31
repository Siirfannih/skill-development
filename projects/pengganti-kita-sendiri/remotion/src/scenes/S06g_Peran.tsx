// 06g · MOMEN 7 «Jadi di tengah semua ini, peran apa yang sedang kamu mainkan?»: wide setelah crane 06f.
// Bidang-bidang kerumunan padam satu per satu (pictogram di belakangnya ikut hilang tanpa cahaya); bidang terakhir
// padam tepat di boom penutup. Tersisa satu piktogram di tengah. Pertanyaan muncul per kata di tengah, «kamu» putih penuh.
// Kamera C02 push-in 100→115 % sepanjang panel. Ekor gelap sampai akhir video. Tanpa tanda tanya di layar.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, KWord, prog, Scene, useT } from "../lib/anim";
import { panel, wordsOf } from "../lib/time";
import { AIGlyph, Ball, C6, Plane, relay, Torso, wa } from "./_b6_shared";
import cues from "../../public/data/cues11.json";

const P = panel("06g");
const T_BOOM = (cues as any[]).find((c) => c.id === "boom3").t as number; // 130.025 penutup setelah «mainkan»
const QW = wordsOf("s6").filter((w) => w.s >= P.start - 0.01);
const at = (txt: string) => QW.find((w) => w.w.toLowerCase().replace(/[^a-z]/g, "") === txt)!.s;
const LINE = ["peran", "apa", "yang", "sedang", "kamu", "mainkan"];
const W_TENGAH = at("tengah");

// 8 bidang kerumunan (panel 06g ×2, dinaikkan supaya kalimat duduk di tengah antara barisan dan piktogram)
const PX = Array.from({ length: 8 }, (_, i) => 80 + i * ((1760 - 140) / 7));
const ORDER = [0, 7, 1, 6, 2, 5, 4]; // padam dari tepi ke dalam; indeks 3 bertahan sampai boom
const offAt = (i: number) => {
  const j = ORDER.indexOf(i);
  return j < 0 ? T_BOOM : W_TENGAH + j * 0.19;
};

export const S06g_Peran: React.FC = () => {
  const t = useT();
  const push = prog(t, P.start, P.end, EZ.inOut);
  // C09 snap punch-in ×1,09 di «kamu» (4 f), patah balik ke wide di boom penutup (5 f).
  // Lebar kalimat ±1500 px × skala maks ±1,2 = ±1800 px < 1920: tidak terpotong.
  const W_KAMU = at("kamu");
  const punch = 0.09 * (prog(t, W_KAMU, W_KAMU + 4 / 30, EZ.out) - prog(t, T_BOOM, T_BOOM + 5 / 30, EZ.out));
  const sc = (1 + 0.15 * push) * (1 + punch);
  const land = prog(t, P.start, P.start + 0.4, EZ.out);
  const ons = PX.map((_, i) => relay(t, offAt(i)));
  const litFrac = ons.reduce((a, b) => a + b, 0) / ons.length;
  const fade = prog(t, P.end - 1.45, P.end - 0.45, EZ.inOut);
  return (
    <Scene code="06g" name="06g Peran apa">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ opacity: 1 - fade }}>
          <AbsoluteFill style={{ transform: `translateY(${(1 - land) * -40}px) scale(${sc})`, transformOrigin: "960px 600px" }}>
            {/* kerumunan jauh: bidang pipih (dilihat dari atas) + piktogram kecil tampak belakang */}
            {PX.map((x, i) => {
              const on = ons[i];
              return (
                <React.Fragment key={i}>
                  <Plane b={{ x, y: 290, w: 140, h: 44 }} on={0.18 + 0.82 * on} grad={C6.white}
                    glow={{ b: { x: x + 8, y: 294, w: 124, h: 36 }, blur: 40, spread: 10, a: 0.18 * on, radius: 10 }}>
                    {on > 0.01 && <AIGlyph size={22} style={{ opacity: on, transform: "scaleY(0.6)" }} />}
                  </Plane>
                  <div style={{ opacity: on }}>
                    <Ball b={{ x: x + 55, y: 352, w: 30, h: 30 }} rim={0.8} r={3} dir="down" />
                    <Torso b={{ x: x + 42, y: 388, w: 56, h: 52 }} rim={0.6} r={3} dir="down" />
                  </div>
                </React.Fragment>
              );
            })}
            {/* pertanyaan: satu baris di tengah, per kata, «kamu» putih penuh */}
            <div style={{ position: "absolute", left: 0, top: 448, width: 1920, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 24 }}>
              {LINE.map((w) => (
                <KWord key={w} at={at(w)} kind="rise" dist={22}
                  style={{ fontFamily: "Inter", fontWeight: w === "kamu" ? 900 : 700, fontSize: w === "kamu" ? 124 : 74, letterSpacing: w === "kamu" ? -4 : -1.6, lineHeight: 1, whiteSpace: "nowrap", color: w === "kamu" ? C6.white : wa(0.6) }}>
                  {w}
                </KWord>
              ))}
            </div>
            {/* yang tersisa: satu piktogram di tengah */}
            <Ball b={{ x: 892, y: 636, w: 136, h: 136 }} rim={0.4 + 0.35 * litFrac} r={8} />
            <Torso b={{ x: 840, y: 784, w: 240, h: 300 }} rim={0.3 + 0.25 * litFrac} r={7} />
          </AbsoluteFill>
        </AbsoluteFill>
        <Grain opacity={0.05 * (1 - fade * 0.6)} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06g_Peran, covers: ["06g"] };
