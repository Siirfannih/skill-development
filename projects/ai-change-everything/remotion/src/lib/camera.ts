import {useMemo} from 'react';
import {Easing} from 'remotion';
import {EASE_INOUT} from './theme';

/** Pose kamera: titik fokus dunia (x,y) relatif pusat, zoom s, roll r (derajat). */
export type Pose = {x: number; y: number; s: number; r?: number};
export type Key = Pose & {f: number; ease?: readonly [number, number, number, number]; cut?: boolean};

/**
 * Pose per frame dari kunci: interpolasi zoom di ruang log (dive terasa konstan),
 * lalu dihaluskan gaussian σ = 0,12 dtk per segmen (tidak melewati `cut`).
 * Resep smooth-motion.md §4.
 */
export const useCamTrack = (keys: Key[], len: number, sigmaF = 3.6): Pose[] =>
  useMemo(() => {
    const raw: Pose[] = [];
    for (let f = 0; f < len; f++) {
      let i = 0;
      while (i < keys.length - 1 && keys[i + 1].f <= f) i++;
      const a = keys[i];
      const b = keys[Math.min(i + 1, keys.length - 1)];
      const t = f <= a.f ? 0 : f >= b.f ? 1 : (f - a.f) / (b.f - a.f);
      const e = b.ease ?? EASE_INOUT;
      const k = b.cut ? (t >= 1 ? 1 : 0) : Easing.bezier(e[0], e[1], e[2], e[3])(t);
      raw.push({
        x: a.x + (b.x - a.x) * k,
        y: a.y + (b.y - a.y) * k,
        s: Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * k),
        r: (a.r ?? 0) + ((b.r ?? 0) - (a.r ?? 0)) * k,
      });
    }
    // batas segmen untuk filter: setiap kunci `cut`
    const cuts = new Set(keys.filter((k) => k.cut).map((k) => k.f));
    const out: Pose[] = [];
    const rad = Math.ceil(sigmaF * 3);
    for (let f = 0; f < len; f++) {
      // cari batas segmen
      let lo = 0, hi = len - 1;
      cuts.forEach((c) => {
        if (c <= f && c > lo) lo = c;
        if (c > f && c - 1 < hi) hi = c - 1;
      });
      let wsum = 0, x = 0, y = 0, ls = 0, r = 0;
      for (let d = -rad; d <= rad; d++) {
        const g = Math.min(hi, Math.max(lo, f + d));
        const w = Math.exp(-(d * d) / (2 * sigmaF * sigmaF));
        const p = raw[g];
        wsum += w; x += p.x * w; y += p.y * w; ls += Math.log(p.s) * w; r += (p.r ?? 0) * w;
      }
      out.push({x: x / wsum, y: y / wsum, s: Math.exp(ls / wsum), r: r / wsum});
    }
    return out;
  }, [keys, len, sigmaF]);
