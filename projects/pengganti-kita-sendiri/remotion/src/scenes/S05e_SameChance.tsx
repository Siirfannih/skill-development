// 05e · «Dan kesempatan yang sama untuk membuat sesuatu.» (v9 F1)
// Latar hitam. Logo ChatGPT/OpenAI (path vektor, putih monokrom) di tengah pada cakram gelap; 10 pratinjau landing page BERBEDA mengorbit
// di elips miring 2.5D: kedalaman z → skala, blur selektif (DOF), kecerahan, dan urutan z (kartu di belakang logo tertutup cakram).
// Kamera push-in pelan; SAMA (anchor) di tengah depan di f2677. Keluar: whip kanan 6 f ke 05f. Fungsi murni terhadap frame absolut.
import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { EZ, Grain, panOf, prog, Scene, sfxMark, useT } from "../lib/anim";
import { FPS, panel } from "../lib/time";
import { AnchorWord } from "../lib/AnchorWord";
import { moveFrame } from "./_b5_shared";
import { LANDING_CARDS, LH, LW } from "./parts/LandingCards";
import { OPENAI_KNOT_PATH, OPENAI_KNOT_VIEWBOX } from "../assets/openaiKnot";

const P = panel("05e");
const F0 = Math.round(P.start * FPS); // 2652
const F1 = Math.round(P.end * FPS); // 2740
const F_SAMA = 2677; // «sama» 89.24 s (onset)
const N = LANDING_CARDS.length;
const RX = 780, RZ = 500, FOC = 2300, TILT = 0.55;
const CY = 450; // pusat orbit di layar
const LOGO = { x: 960, y: 400, r: 120 };
const SWEEP = 125; // derajat total putaran selama adegan
const spin = Easing.bezier(0.22, 0.55, 0.3, 1);

const orbit = (i: number, fa: number) => {
  const u = Math.min(1, Math.max(0, (fa - F0) / (F1 - F0)));
  const bloom = EZ.out(Math.min(1, Math.max(0, (fa - F0) / 12)));
  const th = ((-20 + i * (360 / N) + SWEEP * spin(u)) * Math.PI) / 180;
  const rr = 0.25 + 0.75 * bloom;
  const x = RX * rr * Math.cos(th), z = RZ * rr * Math.sin(th);
  const s = FOC / (FOC - z);
  const push = 1 + 0.1 * EZ.inOut(u);
  return { x: 960 + x * s * push, y: CY + (z * TILT * s) * push - (push - 1) * 0, z, s: s * push, zn: z / RZ, th, rawX: x };
};

// glass_ping: kartu yang pertama kali mendekati kamera (zn > 0,85), maksimum 4, pan sesuai x layar
const PINGS: { f: number; x: number; i: number }[] = (() => {
  const out: { f: number; x: number; i: number }[] = [];
  for (let i = 0; i < N; i++) {
    for (let fa = F0 + 8; fa < F1 - 6; fa++) {
      const a = orbit(i, fa - 1), b = orbit(i, fa);
      if (a.zn <= 0.85 && b.zn > 0.85 && b.x > 120 && b.x < 1800) { out.push({ f: fa, x: b.x, i }); break; }
    }
  }
  return out.sort((p, q) => p.f - q.f).slice(0, 4);
})();

export const S05e_SameChance: React.FC = () => {
  const t = useT();
  const fa = Math.round(t * FPS);
  const u = Math.min(1, Math.max(0, (fa - F0) / (F1 - F0)));
  const push = 1 + 0.1 * EZ.inOut(u);
  // whip keluar ke kanan (6 f)
  const whip = prog(t, P.end - 6 / FPS, P.end, EZ.acc);
  const whipX = -whip * 1800, whipBlur = whip * 36;

  sfxMark(t, "cut", P.start, "05e:in:cut");
  sfxMark(t, "whoosh", moveFrame(P.start), "05e:orbit:bloom"); // kartu mekar keluar dari logo
  PINGS.forEach((p, k) => sfxMark(t, "glass_ping", p.f / FPS, `05e:orbit:ping:${k}`, panOf(p.x)));
  sfxMark(t, "whoosh", P.end - 1 / FPS, "05e:cam:whip");

  const cards = LANDING_CARDS.map((C, i) => ({ C, i, o: orbit(i, fa) })).sort((a, b) => a.o.z - b.o.z);
  const logoS = 1 + (push - 1) * 0.6;
  const card = (c: (typeof cards)[number]) => {
    const { C, i, o } = c;
    const blur = o.zn < 0 ? -o.zn * 3.4 : o.zn > 0.7 ? ((o.zn - 0.7) / 0.3) * 3.5 : 0;
    const bright = 0.5 + 0.5 * ((o.zn + 1) / 2);
    const yaw = (o.rawX / RX) * 16;
    return (
      <div key={i} style={{ position: "absolute", left: o.x - LW / 2, top: o.y - LH / 2, zIndex: o.zn > 0 ? 20 + Math.round(o.zn * 10) : 1, transform: `perspective(1600px) rotateY(${yaw}deg) scale(${o.s})`, filter: `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(2)})` }}>
        <C />
      </div>
    );
  };
  return (
    <Scene code="05e">
      <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
        <svg width="0" height="0" style={{ position: "absolute" }}><filter id="whip05e" x="-20%" y="0" width="140%" height="100%"><feGaussianBlur stdDeviation={`${whipBlur} 0`} /></filter></svg>
        <AbsoluteFill style={{ transform: `translateX(${whipX}px)`, filter: whipBlur > 0.1 ? "url(#whip05e)" : undefined }}>
          <AbsoluteFill style={{ background: "radial-gradient(ellipse 50% 45% at 50% 40%, rgba(255,255,255,0.07), rgba(0,0,0,0) 70%)" }} />
          {/* cincin orbit tipis (belakang semuanya) */}
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
            <ellipse cx={960} cy={CY} rx={RX * push} ry={RZ * TILT * push * 0.95} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={1.5} />
          </svg>
          {cards.filter((c) => c.o.zn <= 0).map(card)}
          {/* logo AI (vektor) pada cakram gelap: menutup kartu di belakangnya */}
          <div style={{ position: "absolute", left: LOGO.x - LOGO.r, top: LOGO.y - LOGO.r, width: LOGO.r * 2, height: LOGO.r * 2, borderRadius: LOGO.r, zIndex: 10, transform: `scale(${logoS})`, background: "radial-gradient(circle at 50% 35%, #1b1b20, #070709)", boxShadow: "0 0 0 1.5px rgba(255,255,255,0.2), 0 0 90px rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={LOGO.r * 1.15} height={LOGO.r * 1.15} viewBox={OPENAI_KNOT_VIEWBOX} style={{ filter: "drop-shadow(0 0 14px rgba(255,255,255,0.35))" }}>
              <path d={OPENAI_KNOT_PATH} fill="#fff" fillRule="evenodd" />
            </svg>
          </div>
          {cards.filter((c) => c.o.zn > 0).map(card)}
        </AbsoluteFill>
        {/* anchor di tengah depan, di bawah logo (ruang layar, tidak ikut whip supaya tetap terbaca) */}
        <AnchorWord text="SAMA" at={F_SAMA} x={960} y={625} size={170} color="#ffffff" align="center" enter="scale" shadow="0 6px 40px rgba(0,0,0,0.9)" />
        <Grain opacity={0.035} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05e_SameChance, covers: ["05e"] };
