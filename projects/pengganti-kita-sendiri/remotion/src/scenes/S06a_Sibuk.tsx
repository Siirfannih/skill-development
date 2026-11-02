// 06a–06b · «Cermin»: gema komposisi 02d (bidang cahaya + piktogram), kata di bidang berganti
// MEMBANGUN → MERENCANAKAN (T32), lalu reveal-out C06: kita ternyata satu dari grid piktogram identik (06b),
// dan keluar dengan push-through ke satu unit (dilanjutkan close-up 06c).
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, keys, prog, Scene, sfxMark, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { AnchorWord, useFrameAt } from "../lib/AnchorWord";
import { Ball, C6, lerp, Plane, SideUnit, Torso, wa } from "./_b6_shared";

const A = panel("06a");
const B = panel("06b");
const W_MEMBANGUN = word("membangun", "s6", 1).s;
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
const HeroUnit: React.FC<{ k: number; on: number; lit: number; t?: number }> = ({ k, on, lit }) => {
  const plane = { x: lerp(89.1, 74, k), y: lerp(65.2, 66, k), w: lerp(142, 86, k), h: lerp(36.1, 30, k) };
  const glow = { b: { x: lerp(98.8, 78, k), y: lerp(69, 70, k), w: lerp(122.6, 76, k), h: lerp(28.4, 24, k) }, blur: lerp(38.7, 40, k), spread: lerp(12.9, 12, k), a: lerp(0.2, 0.15, k), radius: 12.5 };
  const rimR = lerp(1.6, 3, k);
  // v9 (#28): parallelogram bidang dipertahankan; MEMBANGUN → MERENCANAKAN (T32 swap) lewat AnchorWord di suku tekan (f terukur 3169 / 3217), slot yang sama.
  const atMembangun = useFrameAt(3169), atMerencanakan = useFrameAt(3217), outTxt = useFrameAt(Math.round((B.start + 0.05) * FPS));
  const cx = plane.x + plane.w / 2;
  const cy = plane.y + plane.h / 2;
  const fsOld = 11.8; // v11 (SAFE): 15,6 → 12,6 supaya MEMBANGUN utuh di x ≤ 1632 saat reveal-out
  const fsNew = 10.8; // v11 (SAFE): 12,2 → 10,8 (MERENCANAKAN utuh di safe zone)
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 164, height: 200 }}>
      {/* berkas cahaya dari bidang (06a), hilang saat unit menyusut ke proporsi grid */}
      {/* alas berkas = tepi atas bidang (tak ada ujung lancip di kiri bidang); sisi di-feather blur, ujung atas memudar lewat mask */}
      {/* v10 (Irfan 1): berkas cahaya tanpa tepi keras — poligon di-blur lebar, di-mask feather vertikal DAN horizontal (tidak ada garis kotak/diagonal tajam) */}
      {(() => {
        const bh = plane.y + 2 + 36.8;
        const xl = 0.1 * plane.w + 1;
        const xr = plane.w - 1;
        const pad = 26;
        const bw = xr + 0.6 * bh + 4 + pad * 2;
        const m1 = "linear-gradient(180deg, transparent 0%, #000 55%)";
        const m2 = "linear-gradient(90deg, transparent 0%, #000 22%, #000 70%, transparent 100%)";
        return (
          <div style={{ position: "absolute", left: plane.x - pad, top: -36.8, width: bw, height: bh, filter: "blur(5.5px)", WebkitMaskImage: `${m1}, ${m2}`, maskImage: `${m1}, ${m2}`, WebkitMaskComposite: "source-in", maskComposite: "intersect", opacity: (1 - k) * lit * 0.8 }}>
            <div style={{ position: "absolute", inset: 0, clipPath: `polygon(${xl + pad}px ${bh}px, ${xr + pad}px ${bh}px, ${xr + pad + 0.6 * bh}px 0px, ${xl + pad + 0.826 * bh}px 0px)`, backgroundImage: `linear-gradient(215deg, ${wa(0.04)} 0%, ${wa(0.26)} 85%)` }} />
          </div>
        );
      })()}
      <Plane b={plane} on={lit} glow={glow} softGlow grad={`linear-gradient(90deg, ${C6.white} 55%, ${C6.paper} 100%)`} />
      {/* teks di bidang (koordinat unit sel). v10: tinta gelap #101216 di bidang putih (kontras ≈ 18:1), miring seperti PLANE_TEXT v8. */}
      <AnchorWord text="MEMBANGUN" at={atMembangun} until={atMerencanakan} x={cx} y={cy} size={fsOld} color="#101216" italic grain={0} enter="letters" />
      <AnchorWord text="MERENCANAKAN" at={atMerencanakan} until={outTxt} x={cx} y={cy} size={fsNew} color="#101216" italic grain={0} enter="type"
        sfx={{ kind: "scifi_whoosh", id: "06a:anchor:merencanakan" }} />
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
  // v10 (#38): tidak ada bidang putih kosong 2 dtk — layar mati (sambungan lampu padam 05h), menyala bersama MEMBANGUN (frame 3169)
  const tLit = 3165 / FPS;
  const heroLit = Math.max(0.07 * boot * (1 - prog(t, tLit, tLit + 4 / FPS, EZ.out)), prog(t, tLit, tLit + 4 / FPS, EZ.out));

  // ── SFXEV (waktu = konstanta yang sama dengan animasi di atas / HeroUnit)
  sfxMark(t, "cut", A.start, "06a:cut:in"); // B5 → B6
  sfxMark(t, "cut", W_TERLALU2, "06a:cutzoom:1"); // C20 cut zoom ×1,32 ke bidang
  sfxMark(t, "whoosh", B.start + 1 / FPS, "06b:reveal:1"); // rev: patah ke wide 72 % dalam 6 f (EZ.out)
  sfxMark(t, "toggle", W_HAL + F2, "06b:row:hero"); // rowOn baris hero (4 bidang)
  sfxMark(t, "toggle", W_SAMA + F2, "06b:row:top"); // rowOn baris atas (5 bidang)
  // push-through (riser) berakhir di B.end = frame pertama 06c → ditandai di S06c (frame B.end tidak dirender di sini)

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
              <HeroUnit k={k} on={heroOn} lit={heroLit} t={t} />
            </div>
          </div>
        </AbsoluteFill>
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06a_Sibuk, covers: ["06a", "06b"] };
