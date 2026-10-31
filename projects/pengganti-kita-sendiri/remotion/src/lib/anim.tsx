// Framework animasi «Pengganti Kita Sendiri» — semua waktu dalam DETIK ABSOLUT video (bukan frame lokal),
// supaya setiap adegan terkunci ke timestamp kata VO di timeline.json.
import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { f, FPS, panel } from "./time";

// ── easing satu keluarga (motion-director §11)
export const EZ = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // snappy out: masuk, mendarat
  inOut: Easing.bezier(0.45, 0, 0.55, 1), // drift, push pelan
  acc: Easing.bezier(0.7, 0, 0.84, 0), // exit, zoom-through
};
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ── waktu absolut
const SceneStart = createContext(0);
/** Frame awal <Scene> yang membungkus (untuk Sequence anak yang memakai waktu absolut). */
export const useSceneFrom = () => useContext(SceneStart);
/** Detik absolut video untuk frame saat ini (bisa dipakai di dalam <Scene>). */
export const useT = () => {
  const fr = useCurrentFrame();
  const s = useContext(SceneStart);
  return (fr + s) / FPS;
};
/** Progres 0..1 dari detik a ke b dengan easing. */
export const prog = (t: number, a: number, b: number, ez = EZ.out) =>
  interpolate(t, [a, b], [0, 1], { ...clamp, easing: ez });
/** Interpolasi keyframe [t, nilai] dengan easing per segmen. */
export const keys = (t: number, kf: [number, number][], ez = EZ.inOut) => {
  if (t <= kf[0][0]) return kf[0][1];
  for (let i = 0; i < kf.length - 1; i++) {
    const [a, va] = kf[i];
    const [b, vb] = kf[i + 1];
    if (t <= b) return va + (vb - va) * ez(Math.min(1, Math.max(0, (t - a) / Math.max(1e-6, b - a))));
  }
  return kf[kf.length - 1][1];
};

/** Adegan = satu panel storyboard. Dirender dari start−pre sampai end+post (detik absolut). */
export const Scene: React.FC<{ code?: string; start?: number; end?: number; pre?: number; post?: number; children: React.ReactNode; name?: string }> = ({
  code, start, end, pre = 0, post = 0, children, name,
}) => {
  const r = code ? panel(code) : { start: start!, end: end! };
  const s0 = (start ?? r.start) - pre;
  const s1 = (end ?? r.end) + post;
  const from = f(s0);
  return (
    <Sequence from={from} durationInFrames={Math.max(1, f(s1) - from)} name={name ?? code}>
      <SceneStart.Provider value={from}>{children}</SceneStart.Provider>
    </Sequence>
  );
};

/** Panel Wonder 960×540 diskalakan ×2 → 1920×1080 (desain storyboard dipakai utuh). */
export const Panel2x: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ overflow: "hidden", ...style }}>
    <div style={{ width: 960, height: 540, transform: "scale(2)", transformOrigin: "0 0", position: "absolute", left: 0, top: 0 }}>{children}</div>
  </AbsoluteFill>
);

/** Kamera 2D: scale + geser (px di ruang 1920×1080) di titik pusat (ox, oy). Rotasi opsional. */
export const Camera: React.FC<{
  scale?: number; x?: number; y?: number; rot?: number; ox?: number; oy?: number; blur?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({ scale = 1, x = 0, y = 0, rot = 0, ox = 960, oy = 540, blur = 0, children, style }) => (
  <AbsoluteFill
    style={{
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rot}deg)`,
      transformOrigin: `${ox}px ${oy}px`,
      filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Getar impact (C14): ≤12 px, ≤8 Hz, meluruh. */
export const shake = (t: number, t0: number, amp = 10, dur = 0.25) => {
  const d = t - t0;
  if (d < 0 || d > dur) return { x: 0, y: 0 };
  const k = Math.exp(-d * 14) * amp;
  return { x: Math.sin(d * 2 * Math.PI * 8) * k, y: Math.cos(d * 2 * Math.PI * 7) * k * 0.6 };
};

export type KStyle = "rise" | "slam" | "pop" | "flipX" | "swingY" | "blurIn" | "fade";
/**
 * Kata kinetik. `at` = onset kata VO (detik absolut); kata muncul +2 f (T19).
 * rise=T01, slam=T03, pop=T19, flipX=T28, swingY=T29, blurIn=T02. `out` = detik keluar (blok, 5 f accelerate).
 */
export const KWord: React.FC<{
  at: number; out?: number; kind?: KStyle; children: React.ReactNode; style?: React.CSSProperties; className?: string; dist?: number;
}> = ({ at, out, kind = "rise", children, style, className, dist = 36 }) => {
  const t = useT();
  const a = at + 2 / FPS;
  const dur = kind === "slam" ? 3 / FPS : kind === "pop" ? 4 / FPS : 11 / FPS;
  const p = prog(t, a, a + dur, kind === "slam" ? Easing.linear : EZ.out);
  const q = out !== undefined ? prog(t, out, out + 5 / FPS, EZ.acc) : 0;
  if (t < a - 0.001) return <span className={className} style={{ ...style, opacity: 0, display: "inline-block" }}>{children}</span>;
  let tr = "";
  let op = 1;
  let filt = "";
  switch (kind) {
    case "rise":
      tr = `translateY(${(1 - p) * dist}px)`; op = Math.min(1, p * 2.2); break;
    case "slam": {
      const fr = Math.round((t - a) * FPS);
      const sc = fr <= 0 ? 2.0 : fr === 1 ? 1.3 : 1.0;
      const ry = fr <= 0 ? 15 : fr === 1 ? 5 : 0;
      tr = `perspective(1200px) rotateY(${ry}deg) scale(${sc})`;
      filt = fr <= 1 ? `blur(${fr <= 0 ? 6 : 2}px)` : ""; break;
    }
    case "pop":
      tr = `translateY(${(1 - p) * dist * 0.5}px) scale(${0.85 + 0.15 * p})`; op = Math.min(1, p * 2); break;
    case "flipX":
      tr = `perspective(900px) rotateX(${(1 - p) * 90}deg)`; op = Math.min(1, p * 3); break;
    case "swingY":
      tr = `perspective(900px) rotateY(${(1 - p) * -70}deg)`; op = Math.min(1, p * 2.5); break;
    case "blurIn":
      filt = `blur(${(1 - prog(t, a, a + 3 / FPS)) * 12}px)`; op = Math.min(1, p * 2); break;
    case "fade":
      op = p; break;
  }
  if (q > 0) { tr += ` translateY(${-q * 30}px) scale(${1 + q * 0.04})`; op *= 1 - q; filt = `blur(${q * 8}px)`; }
  return (
    <span className={className} style={{ display: "inline-block", transform: tr, opacity: op, filter: filt || undefined, transformOrigin: kind === "flipX" ? "50% 100%" : kind === "swingY" ? "0% 50%" : "50% 50%", willChange: "transform", ...style }}>
      {children}
    </span>
  );
};

/** Grain halus 3–5 % (tekstur analog), deterministik per frame. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const fr = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity }}>
      <svg width="1920" height="1080">
        <filter id={`g${fr % 8}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={fr % 8} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${fr % 8})`} />
      </svg>
    </AbsoluteFill>
  );
};
