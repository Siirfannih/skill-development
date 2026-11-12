// Registri adegan + waktu beat dari PLAN.json (disalin ke src/data/plan.json).
import type React from 'react';
import plan from '../data/plan.json';

const FPS = 30;
type Beat = { id: string; t: [number, number] };
const BEATS = (plan as unknown as { beats: Beat[] }).beats;

/** [t0, t1] detik beat di PLAN */
export const beatT = (id: string): [number, number] => {
  const b = BEATS.find((x) => x.id === id);
  if (!b) throw new Error(`beat ${id} tidak ada di PLAN`);
  return b.t;
};
/** [f0, f1) frame beat di PLAN */
export const beatF = (id: string): [number, number] => beatT(id).map((t) => Math.round(t * FPS)) as [number, number];

/**
 * Satu adegan di timeline. from/to = frame absolut [from, to). Adegan hanya dirender saat aktif
 * (tanpa <Sequence>, jadi useCurrentFrame() = frame absolut di dalamnya).
 * over = dirender di atas adegan lain (transisi layar penuh).
 */
export type SceneEntry = { id: string; beats: string; from: number; to: number; Comp: React.FC; over?: boolean };
