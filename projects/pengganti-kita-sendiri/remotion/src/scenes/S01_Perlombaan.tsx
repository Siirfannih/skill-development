// 01a–01d · Babak 1 «Perlombaan»: horizon fajar → tile logo AI berpacu → zoom-through ke ruang gelap →
// wireframe "pengganti" di kerucut cahaya → piktogram kita menatap wireframe yang terisi makin cepat.
// Satu file karena 01a→01b (tile jatuh masuk), 01b→01c (zoom-through) dan 01c→01d (ruang yang sama) kontinu.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Camera, EZ, Grain, keys, KWord, prog, Scene, shake, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { C, FIG, LightCone, Pictogram, WireFigure } from "./_b1_shared";

const P1a = panel("01a"), P1b = panel("01b"), P1c = panel("01c"), P1d = panel("01d");
const W = (w: string, n = 1) => word(w, "s1", n).s;
const T = {
  tanpa: W("Tanpa"), sadar: W("sadar"),
  kita1: W("kita", 1), lagi: W("lagi"), lomba: W("berlomba-lomba"),
  pengganti: W("pengganti"), kita2: W("kita", 2), sendiri: W("sendiri"),
  dan: W("Dan"), aneh: W("anehnya"), kita3: W("kita", 3), ingin: W("menginginkan"), lebih: W("lebih"), cepat: W("cepat"),
};
const fr = 1 / FPS;

// ── 01a · bintang (posisi panel ×2): [x, y, ukuran, opasitas]
const STARS: [number, number, number, number][] = [
  [42, 18, 2, .6], [118, 64, 1, .45], [171, 22, 2, .35], [236, 97, 1, .5], [290, 40, 2, .3], [352, 130, 1, .4], [401, 12, 1, .55],
  [455, 76, 2, .35], [520, 150, 1, .3], [588, 30, 2, .5], [640, 104, 1, .4], [702, 58, 2, .3], [760, 140, 1, .45], [812, 20, 2, .55],
  [870, 88, 1, .35], [918, 160, 2, .3], [66, 180, 1, .25], [190, 205, 1, .2], [318, 232, 1, .2], [478, 214, 1, .25], [612, 246, 1, .2],
  [744, 222, 1, .2], [884, 252, 1, .2], [30, 120, 1, .4], [938, 40, 1, .45],
];

// ── 01b · tile logo AI asli. Lajur & posisi awal dari panel 01b ×2; x = posisi layar (kamera mengikuti pemimpin, C18).
// Pemimpin berganti: Claude → Gemini (≈+0,32 dtk) → ChatGPT (≈+0,68 dtk), lalu zoom-through ke tile ChatGPT.
type Tile = { icon: string; bg: string; mono?: string; pad: number; lane: number; xs: [number, number][] };
const TILES: Tile[] = [
  { icon: "openai", bg: C.charcoal, mono: "#ffffff", pad: 0.3, lane: 0, xs: [[0, 1150], [0.42, 1270], [0.8, 1490], [1.34, 1440]] },
  { icon: "claude-color", bg: "#ffffff", pad: 0.26, lane: 1, xs: [[0, 1440], [0.3, 1400], [0.8, 1250], [1.34, 1150]] },
  { icon: "gemini-color", bg: "#ffffff", pad: 0.26, lane: 2, xs: [[0, 1290], [0.42, 1460], [0.8, 1370], [1.34, 1260]] },
  { icon: "x", bg: "#ffffff", mono: C.ink, pad: 0.3, lane: 3, xs: [[0, 1060], [0.6, 1120], [1.34, 1010]] },
  { icon: "meta", bg: "#ffffff", mono: "#0866FF", pad: 0.24, lane: 4, xs: [[0, 900], [0.5, 1000], [1.34, 1090]] },
];
const LANE_TOP = 180, LANE_H = 144, TILE = 112;
const laneY = (l: number) => LANE_TOP + LANE_H * l + 76; // pusat tile
const tileX = (tl: Tile, t: number) => keys(t - P1b.start, tl.xs, EZ.inOut);
// frame pertama Gemini mendahului Claude (pemimpin pertama berganti) — dihitung dari keyframe, bukan ditulis tangan
const T_SALIP1 = (() => {
  for (let k = Math.round(P1b.start * FPS); k < P1b.end * FPS; k++) if (tileX(TILES[2], k / FPS) > tileX(TILES[1], k / FPS)) return k / FPS;
  return P1b.start;
})();
const TRACK_V = 9 * FPS; // px/dtk, lintasan (dan cat BERLOMBA-LOMBA) bergeser 9 px/frame (teks tetap terbaca)
const ZOOM_A = P1b.end - 6 * fr; // X04 zoom-through 6 frame terakhir (cat BERLOMBA-LOMBA terbaca lebih lama)
const SNAP_W = W("berlomba-lomba") - 0.6 * fr; // patah ke wide 5 f, mulai ±2 f sebelum kata dicat

const TileIcon: React.FC<{ tl: Tile; cx: number; cy: number; sy?: number; sx?: number; trail?: number }> = ({ tl, cx, cy, sy = 1, sx = 1, trail = 0 }) => {
  const s = TILE;
  const icon = s * (1 - tl.pad * 2);
  const url = staticFile(`icons/${tl.icon}.svg`);
  return (
    <>
      {trail > 0 && [0, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: cx - s / 2 - 150 - k * 40, top: cy - 18 + k * 36, width: 130, height: 3, borderRadius: 2,
          background: "linear-gradient(90deg, rgba(29,29,31,0), rgba(29,29,31,0.16))", opacity: trail }} />
      ))}
      <div style={{
        position: "absolute", left: cx - s / 2, top: cy - s / 2, width: s, height: s, borderRadius: 28, background: tl.bg,
        boxShadow: tl.bg === "#ffffff" ? "0 16px 48px rgba(29,29,31,0.14)" : "0 16px 48px rgba(29,29,31,0.22)",
        display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sx}, ${sy})`, transformOrigin: "50% 100%",
      }}>
        {tl.mono ? (
          <div style={{ width: icon, height: icon, backgroundColor: tl.mono, WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
            WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
        ) : (
          <Img src={url} style={{ width: icon, height: icon }} />
        )}
      </div>
    </>
  );
};

// ── 01c/01d · ruang gelap. Koordinat dunia = layar pada kamera netral.
const WX = 960; // wireframe
const OURX = WX - 1270; // piktogram kita (di luar frame di 01c, masuk lewat pan di 01d)
const S = 0.8;
const HEAD_TOP = 230;
const FLOOR = HEAD_TOP + (FIG.head + FIG.gap + FIG.bodyH) * S;

const CLOSE_A = word("anehnya", "s1").s + 1.25; // close-up mulai setelah «anehnya» terbaca
const CLOSE_B = word("lebih", "s1").s - 3 / FPS; // tiba 2× tepat sebelum LEBIH
const BIG: React.CSSProperties = { fontFamily: "Inter", color: C.white, lineHeight: 1, whiteSpace: "nowrap" };

export const S01_Perlombaan: React.FC = () => {
  const t = useT();
  return (
    <Scene start={P1a.start} end={P1d.end} name="01a–01d Perlombaan">
      {t < P1b.start && <HorizonA t={t} />}
      {t >= P1b.start && t < P1c.start && <RaceB t={t} />}
      {t >= P1c.start && <RoomCD t={t} />}
    </Scene>
  );
};

// ═══ 01a · horizon malam → fajar, «Tanpa sadar»; keluar: tile logo jatuh masuk (C10)
const HorizonA: React.FC<{ t: number }> = ({ t }) => {
  const p = prog(t, P1a.start, P1b.start, EZ.inOut); // fajar naik selama panel
  const drift = 1 + 0.03 * ((t - P1a.start) / (P1b.end - P1a.start)); // C19 drift (linear)
  const fallA = P1b.start - 10 * fr;
  const tilt = keys(t, [[fallA, 0], [P1b.start, 90]], EZ.acc); // kamera ikut turun sedikit bersama tile
  const c01 = prog(t, W("sadar"), W("sadar") + 15 * fr, EZ.out); // C01 zoom mikro di kata inti «sadar»
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Camera scale={drift * (1 + 0.06 * c01)} y={-tilt}>
        {/* langit 1620 px; cakrawala naik 190 px = malam → fajar */}
        <div style={{
          position: "absolute", left: 0, top: 190 * (1 - p), width: 1920, height: 1620,
          backgroundImage: "linear-gradient(180deg, #000000 0%, #020221 30%, #010c4c 36.7%, #022a87 41.3%, #165fc6 45.3%, #72b3f3 50%, #c5e3fb 56%, #7dbdfa 66.7%, #7dbdfa 100%)",
        }} />
        <AbsoluteFill style={{ background: "#000", opacity: 0.35 * (1 - p) }} />
        {STARS.map(([x, y, s, o], i) => (
          <div key={i} style={{ position: "absolute", left: x * 2, top: y * 2, width: s * 2, height: s * 2, borderRadius: "50%", background: "#fff", opacity: o * (1 - 0.4 * p) }} />
        ))}
      </Camera>
      {/* teks di zona gelap atas, tengah */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 220, transform: `scale(${1 + 0.035 * c01})` }}>
        <div style={{ ...BIG, fontWeight: 800, fontSize: 152, letterSpacing: -4.5, display: "flex", gap: 40 }}>
          <KWord at={T.tanpa} out={fallA}>Tanpa</KWord>
          <KWord at={T.sadar} out={fallA}>sadar</KWord>
        </div>
      </AbsoluteFill>
      {/* C10: tile jatuh dari atas ke lajurnya (akselerasi), mendarat di cut 01b */}
      {t >= fallA && TILES.map((tl, i) => {
        const d = i * 0.6 * fr;
        const q = prog(t, fallA + d, P1b.start, EZ.acc);
        const y = -140 + (laneY(tl.lane) + 140) * q;
        return <TileIcon key={tl.icon} tl={tl} cx={tileX(tl, P1b.start)} cy={y} sy={1 + 0.18 * q} sx={1 - 0.06 * q} />;
      })}
    </AbsoluteFill>
  );
};

// ═══ 01b · lintasan, pemimpin berganti, BERLOMBA-LOMBA dicat di lintasan; keluar X04 zoom-through ke tile ChatGPT
const RaceB: React.FC<{ t: number }> = ({ t }) => {
  const tau = t - P1b.start;
  const trackX = -tau * TRACK_V;
  const paintA = T.lomba + 2 * fr;
  const paintLeft0 = 170 + (paintA - P1b.start) * TRACK_V; // posisi dunia: kiri kata di x=70 saat dicat
  const paint = prog(t, paintA, paintA + 8 * fr, EZ.out);
  const z = prog(t, ZOOM_A, P1b.end, EZ.acc);
  const lead = TILES[0];
  const ox = tileX(lead, t), oy = laneY(lead.lane) + 42; // titik zoom: badan gelap tile di bawah logo
  const scale = 1 + 34 * z;
  const land = (k: number) => 1 - 0.1 * Math.max(0, 1 - (tau - k * 0.6 * fr) / (4 * fr)); // squash mendarat
  const sh = shake(t, P1b.start, 6, 0.18);
  // C20 cut zoom di pendaratan (1,8× pada pemimpin) → C18 follow pemimpin (Claude → Gemini) → patah ke wide
  // di «berlomba-lomba» (5 f) supaya seluruh perlombaan + cat terbaca → X04 zoom-through ke ChatGPT.
  const swap = prog(t, T_SALIP1 - 3 * fr, T_SALIP1 + 5 * fr, EZ.inOut);
  const fx = tileX(TILES[1], t) * (1 - swap) + tileX(TILES[2], t) * swap;
  const fy = laneY(1) * (1 - swap) + laneY(2) * swap;
  const wide = prog(t, SNAP_W, SNAP_W + 5 * fr, EZ.out);
  const sC = 1.8 + 0.06 * prog(t, P1b.start, P1b.start + 6 * fr, EZ.out); // momentum cut zoom
  const s1 = sC + (1 - sC) * wide;
  const tx = (1 - wide) * (860 - ((fx - 960) * sC + 960));
  const ty = (1 - wide) * (560 - ((fy - 540) * sC + 540));
  return (
    <AbsoluteFill style={{ background: C.charcoal, overflow: "hidden" }}>
      <Camera scale={scale} ox={ox} oy={oy} x={sh.x} y={sh.y} blur={z * 5}>
      <Camera scale={s1} x={tx} y={ty} blur={wide > 0 && wide < 0.9 ? 2.5 * (1 - wide) : 0}>
        <div style={{ position: "absolute", left: -1500, top: -600, width: 5000, height: 2400, backgroundImage: "linear-gradient(180deg, #c4dafd 0%, #c4dafd 25%, #e1f5fd 41%, #f4f9fd 54%, #ffffff 66%, #ffffff 100%)" }} />
        {/* cat lintasan: BERLOMBA-LOMBA (truck kiri→kanan bersama lintasan) */}
        <div style={{
          position: "absolute", left: paintLeft0 + trackX, top: 440, fontFamily: "Inter", fontWeight: 900, fontSize: 180, letterSpacing: -6,
          lineHeight: 1, whiteSpace: "nowrap", color: "rgba(29,29,31,0.88)", clipPath: `inset(0 ${(1 - paint) * 100}% 0 0)`,
          transform: "skewX(-6deg)",
        }}>
          BERLOMBA-LOMBA
        </div>
        {/* garis lajur putus-putus (bergeser = kecepatan) */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{
            position: "absolute", left: -1512, top: LANE_TOP + LANE_H * i, width: 5000, height: 3,
            backgroundImage: "linear-gradient(90deg, #d2d2d7 0 64px, transparent 64px 112px)", backgroundSize: "112px 3px",
            backgroundPositionX: trackX,
          }} />
        ))}
        {/* garis finis di kanan, masuk saat ChatGPT memimpin */}
        <div style={{ position: "absolute", left: keys(t, [[SNAP_W, 2000], [P1b.end, 1640]], EZ.out), top: LANE_TOP, width: 6, height: LANE_H * 5,
          backgroundImage: "repeating-linear-gradient(180deg, #1d1d1f 0 18px, #ffffff 18px 36px)" }} />
        {TILES.map((tl, k) => (
          <TileIcon key={tl.icon} tl={tl} cx={tileX(tl, t)} cy={laneY(tl.lane)} sy={land(k)} sx={2 - land(k)} trail={0.9} />
        ))}
      </Camera>
      </Camera>
      {/* akhir zoom-through: masuk ke badan gelap tile → ruang gelap 01c */}
      <AbsoluteFill style={{ background: C.charcoal, opacity: prog(t, P1b.end - 2 * fr, P1b.end, EZ.inOut) }} />
    </AbsoluteFill>
  );
};

// ═══ 01c–01d · ruang gelap: kerucut cahaya, wireframe pengganti, piktogram kita
const RoomCD: React.FC<{ t: number }> = ({ t }) => {
  // kamera dalam bentuk (Q = titik dunia di tengah layar, sc = skala); layar = (p − Q)·sc + (960, 540)
  // 01c: C02 push-in 1→1,1 + C01 di «pengganti». 01d: pan di «Dan» (kita masuk) → tahan → C02 push close-up
  // mengikuti garis scan wireframe (objek aktif, 2×) → patah ke wide di LEBIH (5 f) → C01 di CEPAT.
  const u0 = Math.min(1, Math.max(0, (t - T.kita3) / (P1d.end - T.kita3)));
  const scanY = HEAD_TOP + (FIG.head + FIG.gap + FIG.bodyH) * S - 0.46 * Math.pow(u0, 2.2) * FIG.bodyH * S;
  const push = keys(t, [[P1c.start, 1], [P1c.end, 1.1]], EZ.inOut);
  const c01c = 1 + 0.05 * prog(t, T.pengganti, T.pengganti + 18 * fr, EZ.out);
  const pan = prog(t, T.dan, T.dan + 0.6, EZ.inOut);
  const hold = 1 + 0.02 * Math.min(1, Math.max(0, (t - (T.dan + 0.6)) / (CLOSE_A - T.dan - 0.6))); // drift
  const close = prog(t, CLOSE_A, CLOSE_B, EZ.inOut);
  const snap = prog(t, T.lebih + 2 * fr, T.lebih + 7 * fr, EZ.out);
  const cl = close * (1 - snap);
  const c01d = 1 + 0.05 * prog(t, T.cepat + 2 * fr, T.cepat + 17 * fr, EZ.out);
  const sWide = (push * c01c) * (1 - pan) + hold * pan;
  const sc = (sWide + (2.0 - sWide) * cl) * c01d;
  const qx = (960 * (1 - pan) + 320 * pan) * (1 - cl) + WX * cl;
  const qy = 530 * (1 - pan) + 540 * pan;
  const qy2 = qy * (1 - cl) + (scanY - 40) * cl;
  const camX = 960 - qx * sc, camY = 540 - qy2 * sc;
  const txtScale = 1 + 0.6 * (c01d - 1);
  // garis finis → kerucut membuka
  const open = prog(t, P1c.start, P1c.start + 0.42, EZ.out);
  const draw = prog(t, P1c.start + 0.2, T.pengganti, EZ.out);
  // isi naik makin cepat (mulai di «kita» 01d, ±46 % di batas babak)
  const fill = 0.46 * Math.pow(u0, 2.2);
  const scan = 0.8 + 0.2 * Math.sin(t * 38);
  const lean = 3 * prog(t, T.ingin, T.ingin + 0.7, EZ.inOut);
  const textOut1 = T.dan - 6 * fr;
  const anehOut = CLOSE_A - 6 * fr; // «anehnya» terbaca 1,1 dtk, keluar sebelum kamera mendekat
  return (
    <AbsoluteFill style={{ background: C.charcoal, overflow: "hidden" }}>
      <Camera scale={sc} x={camX} y={camY} ox={0} oy={0} blur={snap > 0 && snap < 0.85 ? 2.5 * (1 - snap) : 0}>
        <LightCone cx={WX} floorY={FLOOR} open={open} />
        {/* garis finis putih yang membuka jadi kerucut */}
        <div style={{ position: "absolute", left: WX - 2, top: 0, width: 4, height: 1080, background: "#fff", opacity: 1 - prog(t, P1c.start + 2 * fr, P1c.start + 0.3) }} />
        <WireFigure id="wf01" cx={WX} headTop={HEAD_TOP} s={S} draw={draw} fill={fill} scan={scan} />
        <Pictogram cx={OURX} headTop={HEAD_TOP} s={S} rim="right" lean={lean} />
      </Camera>
      {/* 01c · teks di bawah lantai */}
      {t < T.dan && (
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 108 }}>
          <div style={{ ...BIG, fontSize: 112, letterSpacing: -3.4, display: "flex", gap: 30, alignItems: "baseline" }}>
            <KWord at={T.pengganti} out={textOut1} style={{ fontWeight: 900 }}>PENGGANTI</KWord>
            <KWord at={T.kita2} out={textOut1} style={{ fontWeight: 500 }}>kita</KWord>
            <KWord at={T.sendiri} out={textOut1} style={{ fontWeight: 500 }}>sendiri</KWord>
          </div>
        </AbsoluteFill>
      )}
      {/* 01d · «anehnya» masuk dulu (T02), lalu LEBIH CEPAT di antara kedua piktogram */}
      {t >= T.dan && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 30, transform: `scale(${txtScale})` }}>
          {t < T.lebih && (
            <div style={{ ...BIG, fontSize: 120, fontWeight: 800, letterSpacing: -3.6 }}>
              <KWord at={T.aneh} out={anehOut} kind="blurIn">anehnya</KWord>
            </div>
          )}
          {t >= T.lebih && (
            <div style={{ ...BIG, fontSize: 132, fontWeight: 900, letterSpacing: -4, display: "flex", gap: 36 }}>
              <KWord at={T.lebih} kind="slam">LEBIH</KWord>
              <KWord at={T.cepat} kind="slam">CEPAT</KWord>
            </div>
          )}
        </AbsoluteFill>
      )}
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

export const SCENE = { Component: S01_Perlombaan, covers: ["01a", "01b", "01c", "01d"] };
