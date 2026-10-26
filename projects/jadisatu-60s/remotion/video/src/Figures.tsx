import React from "react";

// Human-behaviour visuals (Irfan 16:40, refs: neuronvisuals): white pictogram people, glowing orbs, glyph icons,
// small caps labels on black. Used where the script talks about us as people (expectation, fear), not outputs.

/** Standing person pictogram, ~ 60×140 at s=1. pose: "stand" | "look" (arm up, looking far) | "fear" (arms in). */
export const Person: React.FC<{ s?: number; pose?: "stand" | "look" | "fear"; color?: string; dashed?: boolean; glow?: number }> = ({ s = 1, pose = "stand", color = "#FFFFFF", dashed, glow = 0 }) => {
  const st = dashed ? { fill: "none", stroke: color, strokeWidth: 2.4, strokeDasharray: "3 4" } : { fill: color };
  return (
    <svg width={60 * s} height={140 * s} viewBox="0 0 60 140" style={{ overflow: "visible", filter: glow ? `drop-shadow(0 0 ${glow}px rgba(255,255,255,0.8))` : undefined }} aria-hidden="true">
      <circle cx="30" cy="14" r="11" {...st} />
      {/* torso */}
      <path d="M18 30 Q30 26 42 30 L40 78 L20 78 Z" {...st} />
      {/* legs */}
      <path d="M21 78 L19 136 L28 136 L30 92 L32 136 L41 136 L39 78 Z" {...st} />
      {/* arms */}
      {pose === "look" && (
        <>
          <path d="M40 32 L56 6 L61 10 L46 40 Z" {...st} />
          <path d="M20 32 L12 70 L18 71 L25 40 Z" {...st} />
        </>
      )}
      {pose === "stand" && (
        <>
          <path d="M40 32 L48 72 L42 73 L36 42 Z" {...st} />
          <path d="M20 32 L12 72 L18 73 L24 42 Z" {...st} />
        </>
      )}
      {pose === "fear" && (
        <>
          <path d="M40 32 L46 52 L32 30 Z" {...st} />
          <path d="M20 32 L14 52 L28 30 Z" {...st} />
          <path d="M44 50 L36 24 L40 22 L48 48 Z" {...st} />
          <path d="M16 50 L24 24 L20 22 L12 48 Z" {...st} />
        </>
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
