// 06a–06b · «Cermin»: gema komposisi 02d (bidang cahaya + piktogram), kata di bidang berganti
// MEMBANGUN → MERENCANAKAN (T32), lalu reveal-out C06: kita ternyata satu dari grid piktogram identik (06b),
// dan keluar dengan push-through ke satu unit (dilanjutkan close-up 06c).
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, keys, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { Ball, C6, lerp, Plane, PLANE_TEXT, SideUnit, Torso, wa } from "./_b6_shared";

const A = panel("06a");
const B = panel("06b");
const W_MEMBANGUN = word("membangun", "s6", 1).s;
const W_MERENCANAKAN = word("merencanakan", "s6", 1).s;
const W_HAL = word("hal", "s6", 1).s;
const W_SAMA = word("sama", "s6", 1).s;
const W_LAKUKAN = word("lakukan", "s6", 1).s;
const W_TERLALU2 = word("terlalu", "s6", 2).s; // C20 cut zoom ke bidang
export const REV_SNAP = B.start; // patah ke wide (C15) di «Membangun»
const F2 = 2 / FPS;

// grid 06b ×2 (ruang dunia 1920×1080): 5 kolom × 2 baris, sel 164×200 unit → 328×400 px
const COLS = 5;
const ROWS = 2;
const GX = 60;
const GY = 100;
const SX = 368;
const SY = 460;
const HERO = { r: 1, c: 2 };
const cellO = (r: number, c: number) => ({ x: GX + c * SX, y: GY + r * SY });
const HO = cellO(HERO.r, HERO.c);
const HEAD_W = { x: HO.x + 84, y: HO.y + 120 }; // pusat kepala hero (dunia)
const HEAD_06A = { x: 648, y: 480 }; // pusat kepala di panel 06a ×2
const S_06A = 248 / 80; // diameter kepala 06a (248) / dunia (80)

/** Unit hero: geometri bergeser dari proporsi 06a (k=0) ke proporsi sel 06b (k=1). Koordinat unit sel. */
const HeroUnit: React.FC<{ k: number; on: number; t: number }> = ({ k, on, t }) => {
  const plane = { x: lerp(89.1, 74, k), y: lerp(65.2, 66, k), w: lerp(142, 86, k), h: lerp(36.1, 30, k) };
  const glow = { b: { x: lerp(98.8, 78, k), y: lerp(69, 70, k), w: lerp(122.6, 76, k), h: lerp(28.4, 24, k) }, blur: lerp(38.7, 40, k), spread: lerp(12.9, 12, k), a: lerp(0.24, 0.18, k), radius: 12.5 };
  const rimR = lerp(1.6, 3, k);
  // kata di bidang: MEMBANGUN mendarat +2 f; T32 swap ke MERENCANAKAN (kubus 3D: lama terangkat jadi bayangan, baru berputar masuk)
  const a1 = W_MEMBANGUN + F2;
  const a2 = W_MERENCANAKAN + F2;
  const pIn = prog(t, a1, a1 + 10 / FPS, EZ.out);
  const sw = prog(t, a2, a2 + 9 / FPS, EZ.out);
  const textOut = prog(t, B.start + 0.05, B.start + 0.4, EZ.acc); // teks lepas saat reveal-out
  const cx = plane.x + plane.w / 2;
  const cy = plane.y + plane.h / 2;
  const fsOld = 15.6;
  const fsNew = 12.2;
  const ghostDY = -31; // posisi bayangan MEMBANGUN di panel 06a (di atas bidang)
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 164, height: 200 }}>
      {/* berkas cahaya dari bidang (06a), hilang saat unit menyusut ke proporsi grid */}
      <div style={{ position: "absolute", left: 89.1, top: -36.8, width: 167.7, height: 109.7, clipPath: "polygon(4% 100%, 100% 96%, 100% 0%, 58% 0%)", backgroundImage: `linear-gradient(215deg, ${wa(0.06)} 0%, ${wa(0.3)} 85%)`, opacity: (1 - k) * on }} />
      <Plane b={plane} on={on} glow={glow} grad={`linear-gradient(90deg, ${C6.white} 55%, ${C6.paper} 100%)`} />
      {/* MEMBANGUN: masuk naik di bidang, lalu terangkat jadi bayangan 25 % */}
      {t >= a1 && (
        <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%, -50%) translateY(${(1 - pIn) * 6 + sw * ghostDY}px) scale(${1 - sw * 0.26})`, opacity: Math.min(1, pIn * 2) * (1 - textOut), perspective: 300 }}>
          <div style={{ transform: `rotateX(${sw * 70 - sw * sw * 70}deg)`, transformOrigin: "50% 100%" }}>
            <span style={{ ...PLANE_TEXT, fontSize: fsOld, letterSpacing: -0.17, display: "block", opacity: 1 - sw }}>MEMBANGUN</span>
            <span style={{ fontFamily: "Inter", fontWeight: 900, fontStyle: "italic", fontSize: fsOld, letterSpacing: -0.17, lineHeight: 1, whiteSpace: "nowrap", color: wa(0.25), position: "absolute", left: 0, top: 0, opacity: 0 }}>MEMBANGUN</span>
          </div>
        </div>
      )}
      {/* MERENCANAKAN: berputar masuk dari bawah (sisi kubus berikutnya) */}
      {t >= a2 && (
        <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%, -50%)`, perspective: 300, opacity: (1 - textOut) * Math.min(1, sw * 2.5) }}>
          <span style={{ ...PLANE_TEXT, fontSize: fsNew, letterSpacing: -0.16, display: "block", transform: `translateY(${(1 - sw) * 8}px) rotateX(${(1 - sw) * -90}deg)`, transformOrigin: "50% 0%" }}>MERENCANAKAN</span>
        </div>
      )}
      <Ball b={{ x: 22, y: 40, w: 40, h: 40 }} rim={0.9 * on} r={rimR} />
      <Torso b={{ x: lerp(4.6, 6, k), y: lerp(85.2, 86, k), w: lerp(74.8, 72, k), h: lerp(83.9, 90, k) }} rim={0.7 * on} r={rimR} />
    </div>
  );
};

export const S06a_Sibuk: React.FC = () => {
  const t = useT();
  // ── kamera: 06a drift C19 (≤1,03) → reveal-out C06 di «Membangun» → tahan wide → push-through ke hero di «lakukan»
  const drift = prog(t, A.start, A.end, EZ.inOut);
  // patah ke wide: 72 % jarak zoom dalam 6 f, sisanya mengendap sampai «sama»
  const rev = keys(t, [[B.start, 0], [B.start + 6 / FPS, 0.72], [W_SAMA + 0.6, 1]], EZ.out);
  const pushStart = W_LAKUKAN + 0.12;
  const push = prog(t, pushStart, B.end, EZ.acc);
  const sClose = S_06A * (1 + 0.025 * drift);
  let S = Math.exp(lerp(Math.log(sClose), Math.log(1), rev));
  let anchor = { x: lerp(HEAD_06A.x, HEAD_W.x, rev), y: lerp(HEAD_06A.y, HEAD_W.y, rev) };
  // C02 tahan wide: dorong pelan ke hero sebelum push-through
  const hold = prog(t, W_SAMA + 0.6, pushStart, EZ.inOut);
  S *= 1 + 0.04 * hold;
  if (push > 0) {
    S = Math.exp(lerp(Math.log(1.04), Math.log(5.2), push));
    anchor = { x: lerp(HEAD_W.x, 960, push), y: lerp(HEAD_W.y, 520, push) };
  }
  const tx = anchor.x - S * HEAD_W.x;
  const ty = anchor.y - S * HEAD_W.y;
  const blur = push > 0.55 ? (push - 0.55) * 14 : 0;
  // kamera layar 06a: C01 di «membangun» lalu C20 cut zoom ×1,32 ke bidang di «terlalu» kedua (momentum 6 f).
  // Titik asal (1830,568) membuat bidang mendarat di x≈1200 sehingga MERENCANAKAN tetap utuh. Lepas saat reveal.
  const c01 = 1 + 0.06 * prog(t, W_MEMBANGUN, W_MEMBANGUN + 20 / FPS, EZ.out);
  const cz = t >= W_TERLALU2 ? 1.32 + 0.04 * (1 - prog(t, W_TERLALU2, W_TERLALU2 + 6 / FPS, EZ.out)) : 1;
  const Z = lerp(c01 * cz, 1, Math.min(1, rev * 1.4));
  // bentuk hero: proporsi 06a → sel 06b selama reveal
  const k = Math.min(1, rev * 1.35);
  // bidang lain menyala per baris (hum bertambah per baris): baris hero di «hal», baris atas di «sama»
  const rowOn = (r: number) => prog(t, (r === HERO.r ? W_HAL : W_SAMA) + F2, (r === HERO.r ? W_HAL : W_SAMA) + F2 + 5 / FPS, EZ.out);
  // nyala awal 06a mendarat di sapuan low-pass (B5 → B6)
  const boot = prog(t, A.start, A.start + 0.5, EZ.out);
  const heroOn = 0.55 + 0.45 * boot;

  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (!(r === HERO.r && c === HERO.c)) cells.push({ r, c });

  return (
    <Scene start={A.start} end={B.end} name="06a–06b Sibuk / sama">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ filter: blur > 0.1 ? `blur(${blur}px)` : undefined, transform: `scale(${Z})`, transformOrigin: "1830px 568px" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${S})` }}>
            {cells.map(({ r, c }) => {
              const on = rowOn(r);
              if (on <= 0.001) return null;
              const o = cellO(r, c);
              return (
                <div key={`${r}-${c}`} style={{ position: "absolute", left: o.x, top: o.y, width: 164, height: 200, transform: "scale(2)", transformOrigin: "0 0", opacity: Math.min(1, on * 1.6) }}>
                  <SideUnit on={on} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: HO.x, top: HO.y, width: 164, height: 200, transform: "scale(2)", transformOrigin: "0 0" }}>
              <HeroUnit k={k} on={heroOn} t={t} />
            </div>
          </div>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06a_Sibuk, covers: ["06a", "06b"] };
