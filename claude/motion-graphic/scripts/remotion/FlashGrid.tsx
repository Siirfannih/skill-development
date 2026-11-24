// FlashGrid.tsx — Transisi Flash Grid cepat (kartu 14): kilatan petak acak berurutan dalam 5-6 frame,
// bukan wipe diagonal lambat 14 frame. Dipasang tepat di batas potong antar adegan bersama SFX snap/glitch.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = {
  durationFrames?: number; // bawaan 6 frame (0,2 dtk @ 30 fps)
  cols?: number;
  rows?: number;
  flashColor?: string;
  accentColor?: string;
  seed?: number;
};

const hashCell = (i: number, seed: number) => {
  const x = Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const FlashGrid: React.FC<Props> = ({
  durationFrames = 6,
  cols = 5,
  rows = 3,
  flashColor = "#FFFFFF",
  accentColor = "#0A0A0A",
  seed = 14,
}) => {
  const frame = useCurrentFrame();
  if (frame < 0 || frame >= durationFrames) return null;

  const total = cols * rows;
  const p = frame / Math.max(1, durationFrames - 1);
  // Puncak kilatan di frame tengah (sekitar frame 2-3 dari 6 frame)
  const flashPeak = interpolate(p, [0, 0.45, 1], [0.25, 0.92, 0.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cells = [];
  for (let i = 0; i < total; i++) {
    const r = hashCell(i, seed);
    const delay = r * 0.4;
    const localP = Math.max(0, Math.min(1, (p - delay) / 0.5));
    const visible = localP > 0.05 && localP < 0.95;
    const isFlash = r > 0.28;
    cells.push(
      <div
        key={i}
        style={{
          backgroundColor: isFlash ? flashColor : accentColor,
          opacity: visible ? flashPeak : 0,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 2,
        pointerEvents: "none",
      }}
    >
      {cells}
    </AbsoluteFill>
  );
};
