import React from "react";

// Human-behaviour visuals (Irfan 16:40, refs: neuronvisuals): white pictogram people, glowing orbs, glyph icons,
// small caps labels on black. Used where the script talks about us as people (expectation, fear), not outputs.

/** Person pictogram, v16: rounded-stroke figure like Irfan's refs (visualhustles / "a bad start isn't a bad finish"),
 * replacing the block "toilet sign" body. Box 60×140 at s=1, feet on y=134.
 * pose: stand | look | fear | crouch (sprint start) | walk | walk2 (other step) | tired (bent, hands on knees) */
type P = [number, number];
const POSES: Record<string, { head: P; r?: number; lines: P[][] }> = {
  stand: { head: [30, 14], lines: [[[30, 30], [30, 76]], [[30, 76], [24, 104], [23, 134]], [[30, 76], [36, 104], [37, 134]], [[30, 36], [20, 58], [17, 80]], [[30, 36], [40, 58], [43, 80]]] },
  look: { head: [30, 14], lines: [[[30, 30], [30, 76]], [[30, 76], [24, 104], [23, 134]], [[30, 76], [36, 104], [37, 134]], [[30, 36], [20, 58], [17, 80]], [[30, 36], [44, 22], [52, 6]]] },
  fear: { head: [30, 18], lines: [[[30, 34], [31, 78]], [[31, 78], [24, 106], [25, 134]], [[31, 78], [37, 106], [36, 134]], [[30, 40], [17, 50], [22, 26]], [[30, 40], [43, 50], [38, 26]]] },
  crouch: { head: [52, 98], r: 9, lines: [[[44, 104], [20, 92]], [[20, 92], [8, 112], [2, 130]], [[20, 92], [32, 116], [27, 134]], [[44, 106], [47, 122], [49, 134]]] },
  walk: { head: [33, 14], lines: [[[32, 30], [29, 76]], [[29, 76], [19, 104], [10, 132]], [[29, 76], [38, 104], [44, 134]], [[32, 36], [22, 56], [18, 74]], [[32, 36], [42, 54], [50, 66]]] },
  walk2: { head: [33, 14], lines: [[[32, 30], [29, 76]], [[29, 76], [36, 104], [31, 134]], [[29, 76], [24, 104], [22, 134]], [[32, 36], [38, 58], [40, 76]], [[32, 36], [26, 58], [24, 76]]] },
  tired: { head: [50, 52], lines: [[[42, 58], [20, 76]], [[20, 76], [20, 104], [20, 134]], [[20, 76], [27, 104], [29, 134]], [[40, 62], [36, 84], [26, 100]]] },
};
export const Person: React.FC<{ s?: number; pose?: keyof typeof POSES; color?: string; dashed?: boolean; glow?: number; sweat?: number }> = ({ s = 1, pose = "stand", color = "#FFFFFF", dashed, glow = 0, sweat = 0 }) => {
  const P = POSES[pose];
  const sw = 11;
  const st = dashed ? { fill: "none", stroke: color, strokeWidth: 2.6, strokeDasharray: "3 4" } : { fill: color };
  return (
    <svg width={60 * s} height={140 * s} viewBox="0 0 60 140" style={{ overflow: "visible", filter: glow ? `drop-shadow(0 0 ${glow}px rgba(255,255,255,0.8))` : undefined }} aria-hidden="true">
      <circle cx={P.head[0]} cy={P.head[1]} r={P.r ?? 11} {...st} />
      {P.lines.map((l, i) => (
        <polyline key={i} points={l.map((p) => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth={dashed ? 2.6 : sw} strokeDasharray={dashed ? "3 4" : undefined} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {sweat > 0 && (
        <g stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={sweat}>
          {[-8, 0, 8].map((dx) => (
            <path key={dx} d={`M${P.head[0] + dx} ${P.head[1] - 18} q3 -4 0 -8 q-3 -4 0 -8`} />
          ))}
        </g>
      )}
    </svg>
  );
};

/** Sparkle glyph (the AI "✳" star, neuronvisuals-style), r = outer radius. */
export const Sparkle: React.FC<{ r: number; color?: string; rot?: number }> = ({ r, color = "#FFFFFF", rot = 0 }) => {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + (rot * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${(r + Math.cos(a) * rr).toFixed(1)},${(r + Math.sin(a) * rr).toFixed(1)}`);
  }
  return (
    <svg width={r * 2} height={r * 2} aria-hidden="true">
      <polygon points={pts.join(" ")} fill={color} />
    </svg>
  );
};

/** Small caps label in the neuronvisuals style. */
export const CapLabel: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 26, color = "#FFFFFF" }) => (
  <div style={{ fontFamily: "Geist", fontWeight: 600, fontSize: size, letterSpacing: "0.08em", color, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</div>
);
