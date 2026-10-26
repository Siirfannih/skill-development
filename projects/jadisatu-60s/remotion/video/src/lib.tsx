import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import vo from "./vo.json";

export const FPS = 30;
export const SANS = "Geist";
export const MONO = "Geist Mono";
export const SERIF = "Instrument Serif";
for (const w of ["300", "400", "500", "600", "700"]) {
  loadFont({ family: SANS, url: staticFile(`fonts/geist-${w}.woff2`), weight: w, format: "woff2" });
}
for (const w of ["400", "500"]) {
  loadFont({ family: MONO, url: staticFile(`fonts/geistmono-${w}.woff2`), weight: w, format: "woff2" });
}
loadFont({ family: SERIF, url: staticFile("fonts/instrumentserif-italic.woff2"), weight: "400", style: "italic", format: "woff2" });

// D-024: no grey. On white, hierarchy = weight/size + one blue accent; on black, white vs dimmed white.
export const C = {
  white: "#FFFFFF",
  ink: "#0A0A0A",
  g1: "#0A0A0A",
  g2: "#0A0A0A",
  g3: "#C9D8FA",
  g4: "#EEF3FE",
  dim: "rgba(255,255,255,0.46)",
  faint: "rgba(255,255,255,0.18)",
  black: "#0A0A0A",
  blue: "#2563EB",
  blueSoft: "#DBEAFE",
  coral: "#F97066",
  navy: "#0F172A",
};

export const TOTAL = Math.round((vo.total + 1.0) * FPS); // v13: +1 s so the wordmark holds ~2.5 s like the Apple ref

/** Global frame of the n-th occurrence of a word (prefix match, case-insensitive) inside a VO chunk. */
export const wf = (chunk: string, prefix: string, nth = 1): number => {
  let k = 0;
  for (const w of vo.words) {
    if (w.c !== chunk) continue;
    if (w.w.toLowerCase().startsWith(prefix.toLowerCase())) {
      k++;
      if (k === nth) return Math.round(w.s * FPS);
    }
  }
  throw new Error(`word not found ${chunk} ${prefix} ${nth}`);
};
export const we = (chunk: string, prefix: string, nth = 1): number => {
  let k = 0;
  for (const w of vo.words) {
    if (w.c !== chunk) continue;
    if (w.w.toLowerCase().startsWith(prefix.toLowerCase())) {
      k++;
      if (k === nth) return Math.round(w.e * FPS);
    }
  }
  throw new Error(`word not found ${chunk} ${prefix} ${nth}`);
};
export const chunkStart = (id: string) =>
  Math.round(vo.chunks.find((c) => c.id === id)!.start * FPS);

export const eOut = Easing.bezier(0.16, 1, 0.3, 1);
export const eIn = Easing.bezier(0.7, 0, 0.84, 0);
export const eIO = Easing.bezier(0.65, 0, 0.35, 1);
export const eSoft = Easing.bezier(0.33, 0, 0.2, 1);

/** clamp interpolate with easing */
export const k = (
  f: number,
  input: number[],
  output: number[],
  easing: (t: number) => number = eOut,
) =>
  interpolate(f, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** multi-key piecewise interpolation, each segment eased with ease */
export const kk = (
  f: number,
  keys: [number, number][],
  ease: (t: number) => number = eIO,
) => {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [a, va] = keys[i];
    const [b, vb] = keys[i + 1];
    if (f <= b) return k(f, [a, b], [va, vb], ease);
  }
  return keys[keys.length - 1][1];
};

/** seeded random */
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** directional motion blur via SVG filter. vx, vy = px/frame velocity. */
export const MB: React.FC<{
  id: string;
  vx?: number;
  vy?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  max?: number;
}> = ({ id, vx = 0, vy = 0, children, style, max = 60 }) => {
  const sx = Math.min(max, Math.abs(vx) * 0.45);
  const sy = Math.min(max, Math.abs(vy) * 0.45);
  const on = sx > 0.4 || sy > 0.4;
  return (
    <div style={{ ...style, filter: on ? `url(#${id})` : undefined }}>
      {on ? (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={`${sx.toFixed(2)} ${sy.toFixed(2)}`} />
          </filter>
        </svg>
      ) : null}
      {children}
    </div>
  );
};

/** velocity helper */
export const vel = (fn: (f: number) => number, f: number) => fn(f) - fn(f - 1);

/** Word that rises from behind its own baseline mask (T01). Exits upward behind mask. */
export const Rise: React.FC<{
  text: string;
  at: number;
  out?: number;
  size: number;
  weight?: number;
  color?: string;
  font?: string;
  dur?: number;
  letterSpacing?: string;
  style?: React.CSSProperties;
  dataText?: boolean;
}> = ({
  text,
  at,
  out,
  size,
  weight = 500,
  color = C.ink,
  font,
  dur = 12,
  letterSpacing = "-0.02em",
  style,
  dataText = true,
}) => {
  const f = useCurrentFrame();
  const inY = k(f, [at, at + dur], [112, 0], eOut);
  const outY = out !== undefined ? k(f, [out, out + 7], [0, -112], eIn) : 0;
  const v = (inY - k(f - 1, [at, at + dur], [112, 0], eOut)) * size * 0.01;
  if (f < at - 1) return null;
  if (out !== undefined && f > out + 8) return null;
  return (
    <div
      data-text={dataText ? text : undefined}
      style={{
        display: "inline-block",
        overflow: "hidden",
        lineHeight: 1.18,
        paddingBottom: size * 0.26,
        marginBottom: -size * 0.2,
        paddingTop: size * 0.06,
        marginTop: -size * 0.04,
        // italic overhang (serif g, f, e) must not be clipped by the mask sides
        paddingLeft: size * 0.14,
        paddingRight: size * 0.14,
        marginLeft: -size * 0.14,
        marginRight: -size * 0.14,
        verticalAlign: "bottom",
        ...style,
      }}
    >
      <MB id={`r${at}${text.length}${size}`} vy={v * 0.5} max={5}>
        <div
          style={{
            fontFamily: font ?? SANS,
            fontStyle: font === SERIF ? "italic" : "normal",
            fontSize: size,
            fontWeight: weight,
            color,
            letterSpacing,
            whiteSpace: "nowrap",
            translate: `0 ${inY + outY}%`,
          }}
        >
          {text}
        </div>
      </MB>
    </div>
  );
};

/** Sequence of words, each rising at its own frame. */
export const RiseLine: React.FC<{
  words: { t: string; at: number; color?: string; weight?: number; font?: string; size?: number }[];
  size: number;
  out?: number;
  gap?: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ words, size, out, gap = 0.28, weight, color, style }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: size * gap, ...style }}>
    {words.map((w, i) => (
      <Rise
        key={i}
        text={w.t}
        at={w.at}
        out={out !== undefined ? out + i * 2 : undefined}
        size={w.size ?? size}
        weight={w.weight ?? weight}
        color={w.color ?? color}
        font={w.font}
      />
    ))}
  </div>
);

/** Camera wrapper: translate+scale+rotate around frame centre. */
export const Cam: React.FC<{
  x?: number;
  y?: number;
  s?: number;
  r?: number;
  children: React.ReactNode;
  bg?: string;
}> = ({ x = 0, y = 0, s = 1, r = 0, children, bg }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: bg }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        transformOrigin: "960px 540px",
        transform: `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`,
      }}
    >
      {children}
    </div>
  </div>
);

/** decaying shake offset */
export const shake = (f: number, at: number, amp = 10, hz = 7, decay = 9) => {
  const d = (f - at) / FPS;
  if (d < 0 || d > 0.5) return [0, 0];
  const a = amp * Math.exp(-decay * d);
  return [a * Math.sin(d * hz * 2 * Math.PI), a * Math.cos(d * hz * 2 * Math.PI * 1.3) * 0.6];
};

export const Abs: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; dataSubject?: boolean }> = ({
  style,
  children,
  dataSubject,
}) => (
  <div data-subject={dataSubject ? "1" : undefined} style={{ position: "absolute", ...style }}>
    {children}
  </div>
);

/** film grain-free subtle vignette for depth */
export const Vignette: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    style={{
      position: "absolute",
      inset: -320,
      pointerEvents: "none",
      background: dark
        ? "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.035) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)"
        : "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.045) 100%)",
    }}
  />
);

/** Centered statement beat (text leads, visual absent). bg black = focus, white = transformation. */
export const Statement: React.FC<{
  lines: { t: string; at: number; color?: string; font?: string; weight?: number; size?: number }[][];
  out?: number;
  size?: number;
  dark?: boolean;
  y?: number;
  gap?: number;
}> = ({ lines, out, size = 128, dark = true, y = 540, gap = 0.1 }) => {
  const base = dark ? C.white : C.ink;
  let n = 0;
  return (
    <div style={{ position: "absolute", left: 0, width: 1920, top: y, translate: "0 -50%", display: "flex", flexDirection: "column", alignItems: "center", gap: size * gap }}>
      {lines.map((ws, li) => (
        <div key={li} style={{ display: "flex", gap: (ws[0]?.size ?? size) * 0.26, alignItems: "flex-end", justifyContent: "center" }}>
          {ws.map((w, i) => {
            const k2 = n++;
            return (
              <Rise
                key={i}
                text={w.t}
                at={w.at}
                out={out !== undefined ? out + k2 : undefined}
                size={w.size ?? size}
                weight={w.weight ?? 600}
                font={w.font}
                color={w.color ?? base}
                letterSpacing="-0.035em"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
