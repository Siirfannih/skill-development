import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Easing,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FPS = 24;
export const sec = (s: number) => Math.round(s * FPS);
/** 12 fps "on twos": gerak tokoh/tekstur hanya berubah tiap 2 frame. */
export const twos = (f: number) => f - (f % 2);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ease = Easing.bezier(0.45, 0, 0.2, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const a = (p: string) => staticFile(`assets/${p}`);

/* ---------- Kamera 2.5D: kamera bergerak, layer ikut sesuai kedalaman ---------- */
type CamState = { s: number; x: number; y: number; r: number };
const CamCtx = createContext<CamState>({ s: 1, x: 0, y: 0, r: 0 });

export type Key = [number, Partial<CamState>]; // [frame lokal, nilai]
export const camAt = (frame: number, keys: Key[], easing = ease): CamState => {
  const base: CamState = { s: 1, x: 0, y: 0, r: 0 };
  const out = { ...base };
  (Object.keys(base) as (keyof CamState)[]).forEach((k) => {
    const ks = keys.filter((kk) => kk[1][k] !== undefined);
    if (ks.length === 0) return;
    if (ks.length === 1) {
      out[k] = ks[0][1][k] as number;
      return;
    }
    out[k] = interpolate(
      frame,
      ks.map((kk) => kk[0]),
      ks.map((kk) => kk[1][k] as number),
      { ...clamp, easing },
    );
  });
  return out;
};

export const Cam: React.FC<{ keys: Key[]; easing?: (t: number) => number; children: React.ReactNode }> = ({
  keys,
  easing,
  children,
}) => {
  const frame = useCurrentFrame();
  const c0 = camAt(frame, keys, easing);
  // jangan pernah memperlihatkan tepi layer latar: geser maksimal sebesar kelebihan zoom
  const mx = Math.max(0, 960 * (c0.s - 1) * 0.97);
  const my = Math.max(0, 540 * (c0.s - 1) * 0.97);
  const c = { ...c0, x: Math.max(-mx, Math.min(mx, c0.x)), y: Math.max(-my, Math.min(my, c0.y)) };
  return (
    <CamCtx.Provider value={c}>
      <AbsoluteFill style={{ overflow: "hidden" }}>{children}</AbsoluteFill>
    </CamCtx.Provider>
  );
};

/** Layer gambar; depth 0 = jauh (bergerak sedikit), 1 = dekat kamera (bergerak penuh). */
export const Layer: React.FC<{
  src: string;
  depth?: number;
  style?: React.CSSProperties;
  boil?: number; // jitter tekstur 12 fps (px)
  fit?: "cover" | "contain";
}> = ({ src, depth = 0.5, style, boil = 0, fit = "cover" }) => {
  const c = useContext(CamCtx);
  const frame = useCurrentFrame();
  const f = 0.35 + depth * 0.9;
  const s = 1 + (c.s - 1) * f;
  const bx = boil ? (random(`bx${twos(frame)}${src}`) - 0.5) * boil : 0;
  const by = boil ? (random(`by${twos(frame)}${src}`) - 0.5) * boil : 0;
  return (
    <AbsoluteFill
      style={{
        scale: String(s),
        translate: `${c.x * f + bx}px ${c.y * f + by}px`,
        rotate: `${c.r * f}deg`,
        ...style,
      }}
    >
      <Img src={src} style={{ width: "100%", height: "100%", objectFit: fit }} />
    </AbsoluteFill>
  );
};

/** Sprite (tokoh/siluet) di posisi tertentu, ikut kamera di kedalaman tertentu. */
export const Sprite: React.FC<{
  src: string;
  x: number; // pusat bawah, px di frame 1920
  y: number;
  h: number; // tinggi px
  depth?: number;
  opacity?: number;
  flip?: boolean;
  boil?: number;
  style?: React.CSSProperties;
}> = ({ src, x, y, h, depth = 0.6, opacity = 1, flip, boil = 1.2, style }) => {
  const c = useContext(CamCtx);
  const frame = useCurrentFrame();
  const f = 0.35 + depth * 0.9;
  const s = 1 + (c.s - 1) * f;
  // posisi relatif pusat frame mengikuti zoom kamera
  const cx = 960 + (x - 960) * s + c.x * f;
  const cy = 540 + (y - 540) * s + c.y * f;
  const bx = (random(`sx${twos(frame)}${src}${x}`) - 0.5) * boil;
  const by = (random(`sy${twos(frame)}${src}${x}`) - 0.5) * boil;
  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        height: h * s,
        left: cx + bx,
        top: cy + by,
        translate: "-50% -100%",
        scale: flip ? "-1 1" : undefined,
        opacity,
        ...style,
      }}
    />
  );
};

/* ---------- Dunia: grade, bloom, debu, vignette, grain ---------- */
export const Grain: React.FC<{ amount?: number }> = ({ amount = 0.22 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 97;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: amount }}>
      <svg width="1920" height="1080">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="1920" height="1080" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Dust: React.FC<{ n?: number; color?: string; opacity?: number }> = ({
  n = 26,
  color = "255,250,235",
  opacity = 0.55,
}) => {
  const frame = twos(useCurrentFrame());
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(n).fill(0).map((_, i) => {
        const x = random(`dx${i}`) * 1920;
        const y = random(`dy${i}`) * 1080;
        const r = 2 + random(`dr${i}`) * 5;
        const sp = 0.15 + random(`ds${i}`) * 0.35;
        const px = (x + frame * sp * 0.6 + Math.sin((frame + i * 40) / 45) * 14) % 1960;
        const py = (y - frame * sp + 1100) % 1100;
        const o = (0.4 + 0.6 * Math.abs(Math.sin((frame + i * 17) / 30))) * opacity;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${color},${o}) 0%, rgba(${color},0) 70%)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** P = bayangan (pudar, bloom, tepi memutih, debu). N = kenyataan (low-key hangat, vignette gelap). */
export const World: React.FC<{ kind: "P" | "N"; children: React.ReactNode; dust?: boolean; bloom?: number }> = ({
  kind,
  children,
  dust = true,
  bloom,
}) => {
  const isP = kind === "P";
  const b = bloom ?? (isP ? 0.24 : 0.2);
  return (
    <AbsoluteFill style={{ backgroundColor: isP ? "#cfd6d2" : "#120d0b" }}>
      <AbsoluteFill style={{ filter: isP ? "contrast(0.97) saturate(0.9)" : "contrast(0.96) saturate(0.94)" }}>
        {children}
      </AbsoluteFill>
      {/* bloom: salinan terang diburamkan */}
      <AbsoluteFill
        style={{
          mixBlendMode: "screen",
          opacity: b,
          filter: `blur(${isP ? 26 : 18}px) brightness(${isP ? 0.9 : 0.75}) contrast(1.6)`,
        }}
      >
        {children}
      </AbsoluteFill>
      {isP ? (
        <>
          <AbsoluteFill
            style={{
              background:
                "radial-gradient(ellipse 75% 70% at 50% 50%, rgba(255,255,255,0) 60%, rgba(246,248,244,0.38) 100%)",
            }}
          />
          {dust && <Dust />}
        </>
      ) : (
        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse 80% 75% at 50% 48%, rgba(0,0,0,0) 50%, rgba(18,10,8,0.6) 100%)",
          }}
        />
      )}
      <Grain amount={isP ? 0.2 : 0.3} />
    </AbsoluteFill>
  );
};

export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, t: frame / fps };
};

export const fade = (frame: number, inF: number, outStart?: number, outF = 0) =>
  outStart === undefined
    ? interpolate(frame, [0, inF], [0, 1], clamp)
    : interpolate(frame, [0, inF, outStart, outStart + outF], [0, 1, 1, 0], clamp);
