// KarakterLayer — satu tokoh 2D (Clawd / Codex / Gemini) sebagai lapisan lego seukuran kotaknya.
// Pose, emosi, lompat, take, putar semua dihitung murni dari waktu (gerak.ts, ClaudeAnimationBase MIT).
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {type Model} from '../../papan/karakter2d/Karakter2D';
import {KarakterX} from './KarakterPixel';
import {type Key, EASE, jump, kf, seg, take} from '../../papan/karakter2d/gerak';
import {Fonts} from './Fonts';

export type KarakterProps = {
  model: Model; u: number; durasi: number; seed: number;
  emosi: Key[];
  /** putar tokoh: [detik, heading putaran] (0 depan, .125 menghadap kanan, -.125 kiri) */
  sudut: [number, number][];
  /** lompat [t0, t1, tinggi u] dan kaget [t, besar] */
  lompat?: [number, number, number][];
  kaget?: [number, number][];
  /** pembesaran sesaat [t0, puncak, t1, skala] */
  denyut?: [number, number, number, number][];
  /** masuk: tokoh mendarat dari bawah/samping dalam kotak sendiri (detik) */
  masukAt?: number;
  kamar?: boolean; lantai?: boolean;
  /** kilau Gemini / lambai Codex */
  lambai?: [number, number][];
};

export const kotak = (u: number) => ({w: Math.ceil(22 * u) + 80, h: Math.ceil(20 * u) + 80});

export const KarakterLayer: React.FC<KarakterProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const {w, h} = kotak(p.u);
  const sq0 = (p.lompat ?? []).reduce((a, j) => { const r = jump(t, j[0], j[1], j[2]); return {sq: a.sq + r.sq, dy: a.dy + r.dy}; }, {sq: 0, dy: 0});
  const tk = (p.kaget ?? []).reduce((a, k) => { const r = take(t, k[0], k[1]); return {sq: a.sq + r.sq, dy: a.dy + r.dy}; }, {sq: 0, dy: 0});
  let sc = 1;
  for (const [a, pk, b, s] of p.denyut ?? []) {
    if (t >= a && t <= b) sc *= 1 + (s - 1) * (t < pk ? EASE.out(seg(t, a, pk)) : 1 - EASE.soft(seg(t, pk, b)));
  }
  const heading = kf(t, p.sudut.map(([a, v]) => [a, v] as [number, number]), EASE.soft) as number;
  const moving = p.sudut.some(([a], i) => i > 0 && t > p.sudut[i - 1][0] && t < a);
  const smear = moving ? 0.35 * Math.abs(Math.sin(Math.PI * ((t % 0.4) / 0.4))) : 0;
  // masuk: tokoh jatuh dari atas kotak lalu mendarat dengan jongkok
  const masuk = p.masukAt ?? -1;
  const land = masuk >= 0 ? jump(t, masuk, masuk + 0.01, 0) : {sq: 0, dy: 0};
  // lambai: lengan naik turun lewat dx kecil + rot
  let rot = 0;
  for (const [a, b] of p.lambai ?? []) if (t >= a && t <= b) rot += 0.07 * Math.sin((t - a) * 22) * (1 - seg(t, b - 0.2, b));
  const dyU = sq0.dy + tk.dy + land.dy;
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <KarakterX model={p.model} id={`k-${p.model}-${p.seed}`} x={w / 2} y={17 * p.u + 40} u={p.u} t={t} seed={p.seed} kamar={p.kamar} lantai={p.lantai ?? true}
      sudut={heading} smear={smear} emosi={p.emosi}
      ekstra={{sq: sq0.sq + tk.sq + land.sq, dy: dyU, rot, scale: sc}}/>
  </AbsoluteFill>;
};
