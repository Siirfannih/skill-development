// 05g · «Membangun sesuatu jadi gampang.»
// T10: kartu aplikasi AI jatuh dan menumpuk tiap 1/8 grid (terkunci ke micro-tick 97.89 «gampang»), setelah tick ritme jadi 1/16.
// C15 snap reflow: kamera snap mundur (5 f) tiap tumpukan keluar bingkai. Keluar X10 foreground wipe: siluet piktogram
// raksasa lewat dekat kamera kiri→kanan dan membuka 05h (wipe digambar di S05h, yang dirender di atas adegan ini).
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, keys, prog, Scene, sfxMark, useT } from "../lib/anim";
import { FPS, panel } from "../lib/time";
import { AppCard, APPS, firstFrame, GRID, moveFrame, SKY_BG, z3tick } from "./_b5_shared";

const P = panel("05g");
const T_TICK = z3tick("05g kartu"); // 97.89
// waktu mendarat: 1/8 grid mundur dari tick sampai awal panel, lalu 1/16 setelah tick
const LAND: number[] = [];
for (let k = -6; k <= 0; k++) LAND.push(T_TICK + k * GRID);
for (let k = 1; k <= 3; k++) LAND.push(T_TICK + (k * GRID) / 2);
// posisi tumpukan (pusat kartu, ruang dunia relatif ke tengah layar): spiral sudut emas, rotasi kecil
// v10 (#36): kisi rapi (kartu 480×300, jarak ≥ 36 px, rotasi ≤ 2°) → tidak ada kartu yang menutup nama kartu lain
const LATTICE: [number, number][] = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1], [2, 0]];
const POS = LAND.map((_, i) => {
  const [cx, cy] = LATTICE[i % LATTICE.length];
  return { x: cx * 520, y: cy * 340, rot: ((i * 37) % 5) - 2 };
});
// snap kamera: [indeks kartu pemicu, skala]
const SNAPS: [number, number][] = [[0, 1.55], [2, 1.2], [4, 0.98], [6, 0.82], [8, 0.68]];

export const S05g_BuildingEasy: React.FC = () => {
  const t = useT();
  const kf: [number, number][] = [];
  SNAPS.forEach(([i, s], j) => {
    const a = LAND[i];
    if (j === 0) kf.push([P.start - 0.1, s]);
    else { kf.push([a, SNAPS[j - 1][1]]); kf.push([a + 5 / FPS, s]); }
  });
  const cam = keys(t, kf, EZ.out);
  // ── SFXEV penanda metronom
  sfxMark(t, "cut", P.start, "05g:in:cut"); // hard cut X17 dari SEMALAM 05f
  LAND.forEach((a, i) => sfxMark(t, "land", firstFrame(a), `05g:card:${i}:${APPS[i % APPS.length].name.split(" ")[0].toLowerCase()}`)); // kartu jatuh → mendarat (EZ.acc berakhir di a)
  SNAPS.forEach(([i], j) => { if (j > 0) sfxMark(t, "whoosh", moveFrame(LAND[i]), `05g:cam:snap:${j}`); }); // kamera snap mundur 5 f (EZ.out) di frame kartu pemicu mendarat
  return (
    <Scene code="05g">
      <AbsoluteFill style={{ background: SKY_BG, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `scale(${cam})`, transformOrigin: "960px 540px" }}>
          {LAND.map((a, i) => {
            if (t < a - 3 / FPS) return null;
            // jatuh dari arah kamera: besar + transparan → mendarat (tanpa overshoot), bayangan menguat saat mendarat
            const p = prog(t, a - 3 / FPS, a, EZ.acc);
            const s = 1 + 0.2 * (1 - p);
            const settle = prog(t, a, a + 4 / FPS, EZ.out);
            const { x, y, rot } = POS[i];
            return (
              <div key={i} style={{ position: "absolute", left: 960 + x - 240, top: 540 + y - 150, width: 480, height: 300, transform: `rotate(${rot * (0.6 + 0.4 * settle)}deg) scale(${s})`, opacity: 1, zIndex: i }}>
                <AppCard app={APPS[i % APPS.length]} style={{ left: 0, top: 0, boxShadow: `0 ${10 + 24 * p}px ${30 + 40 * p}px rgba(29,29,31,${0.06 + 0.06 * p})` }} />
              </div>
            );
          })}
        </AbsoluteFill>
        <Grain opacity={0.03} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05g_BuildingEasy, covers: ["05g"] };
