import React from "react";
import { C, MONO, SANS, Abs, Rise } from "./lib";

// Editorial chart system (refs: Cielo "field vs firework", habits curves). Black ground, white solid = selera,
// dotted dim = kemampuan, hatched area = jarak. Labels in Geist Mono caps, attached to their curve ends.
export const CH = { x0: 300, x1: 1620, yb: 800, yt: 300 };
export const X = (t: number) => CH.x0 + (CH.x1 - CH.x0) * t;
export const Y = (v: number) => CH.yb - (CH.yb - CH.yt) * v;
export const selera = (t: number) => 0.1 + 0.78 * (1 - Math.exp(-t * 4.2));
export const kemampuan = (t: number) => 0.04 + 0.56 * Math.pow(Math.max(0, t), 2.1);

export const pathOf = (fn: (t: number) => number, t0: number, t1: number, n = 80) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    d += `${i === 0 ? "M" : "L"}${X(t).toFixed(1)} ${Y(fn(t)).toFixed(1)} `;
  }
  return d;
};

export const areaOf = (top: (t: number) => number, bot: (t: number) => number, t0: number, t1: number, n = 60) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    d += `${i === 0 ? "M" : "L"}${X(t).toFixed(1)} ${Y(top(t)).toFixed(1)} `;
  }
  for (let i = n; i >= 0; i--) {
    const t = t0 + ((t1 - t0) * i) / n;
    d += `L${X(t).toFixed(1)} ${Y(bot(t)).toFixed(1)} `;
  }
  return d + "Z";
};

/** Label in mono caps, attached to a point. */
export const Tag: React.FC<{ x: number; y: number; text: string; at: number; align?: "l" | "r" | "c"; color?: string; size?: number; dy?: number }> = ({
  x,
  y,
  text,
  at,
  align = "l",
  color = C.white,
  size = 44,
  dy = -70,
}) => (
  <Abs
    style={{
      left: x,
      top: y + dy,
      translate: align === "r" ? "-100% 0" : align === "c" ? "-50% 0" : "0 0",
    }}
  >
    <Rise text={text} at={at} size={size} weight={500} font={MONO} color={color} letterSpacing="0.08em" dur={10} />
  </Abs>
);

/** Glowing end dot */
export const Dot: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = C.white }) => (
  <>
    <circle cx={x} cy={y} r={26 * s} fill={color} opacity={0.12 * s} />
    <circle cx={x} cy={y} r={11 * s} fill={color} />
  </>
);

/** Two-line editorial headline, words rise on VO. line2 is dimmed. */
export const Headline: React.FC<{
  l1: { t: string; at: number }[];
  l2?: { t: string; at: number }[];
  out?: number;
  size?: number;
  dark?: boolean;
  left?: number;
  top?: number;
}> = ({ l1, l2 = [], out, size = 84, dark = true, left = 160, top = 110 }) => {
  const c1 = dark ? C.white : C.ink;
  const c2 = dark ? C.dim : C.blue;
  const row = (ws: { t: string; at: number }[], col: string, base: number) => (
    <div style={{ display: "flex", gap: size * 0.26, alignItems: "flex-end" }}>
      {ws.map((w, i) => (
        <Rise key={i} text={w.t} at={w.at} out={out !== undefined ? out + base + i : undefined} size={size} weight={500} color={col} letterSpacing="-0.03em" />
      ))}
    </div>
  );
  return (
    <Abs style={{ left, top, display: "flex", flexDirection: "column", gap: 0, fontFamily: SANS }}>
      {row(l1, c1, 0)}
      {l2.length > 0 && <div style={{ marginTop: -size * 0.14 }}>{row(l2, c2, 2)}</div>}
    </Abs>
  );
};
