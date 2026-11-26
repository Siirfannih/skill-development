import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ScaleLadder, ScaleLadderProps } from "./ScaleLadder";

const A = {
  latar: "#F6F5FC",
  permukaan: "#F1F1FA",
  tinta: "#0E1426",
  redup: "#5B6280",
  aksen: "#6F86FF",
  aksen2: "#1B2748",
  huruf: "Helvetica, Arial, sans-serif",
};
const B = {
  latar: "#110D0B",
  permukaan: "#2A201B",
  tinta: "#FBF8F3",
  redup: "#A39384",
  aksen: "#EE9440",
  aksen2: "#8A6246",
  huruf: "Helvetica, Arial, sans-serif",
};

type Tk = typeof A;
const CUT = 58;

const BUILD: Array<[number, number, number]> = [
  [0, 330, 150],
  [150, 250, 130],
  [280, 380, 170],
  [450, 290, 120],
  [570, 420, 160],
  [730, 310, 140],
  [870, 370, 150],
  [1020, 270, 130],
  [1150, 340, 160],
];

/** Footage netral: dua adegan (deretan gedung berjendela, lalu lorong) dengan satu sosok; hanya warna token. */
const Footage: React.FC<{ tk: Tk }> = ({ tk }) => {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const scene2 = frame >= CUT;
  const dx = -frame * 0.5;
  return (
    <div style={{ position: "absolute", inset: 0, background: tk.latar }}>
      <svg width={W} height={H} viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="langit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tk.aksen} stopOpacity="0.55" />
            <stop offset="0.7" stopColor={tk.aksen} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {!scene2 ? (
          <g transform={`translate(${dx} 0)`}>
            <rect x="-100" y="0" width="1500" height="720" fill={tk.latar} />
            <rect x="-100" y="0" width="1500" height="720" fill="url(#langit)" />
            {BUILD.map(([x, h, w], i) => (
              <g key={i}>
                <rect x={x} y={720 - h} width={w} height={h} fill={tk.aksen2} opacity="0.3" />
                {Array.from({ length: Math.floor(h / 44) }).map((_, r) =>
                  Array.from({ length: Math.floor(w / 36) }).map((__, c) => (
                    <rect key={`${r}-${c}`} x={x + 12 + c * 36} y={720 - h + 14 + r * 44} width="16" height="22" fill={tk.latar} opacity={(r * 3 + c + i) % 4 === 0 ? 0.9 : 0.35} />
                  ))
                )}
              </g>
            ))}
            <rect x="-100" y="650" width="1500" height="70" fill={tk.aksen2} opacity="0.4" />
          </g>
        ) : (
          <g transform={`translate(${dx * 0.3} 0)`}>
            <rect x="-100" y="0" width="1500" height="720" fill={tk.permukaan} />
            <polygon points="-100,0 480,260 480,520 -100,720" fill={tk.aksen2} opacity="0.3" />
            <polygon points="1400,0 800,260 800,520 1400,720" fill={tk.aksen2} opacity="0.3" />
            <rect x="480" y="260" width="320" height="260" fill={tk.aksen} opacity="0.4" />
            <polygon points="-100,720 480,520 800,520 1400,720" fill={tk.aksen2} opacity="0.4" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={300 + i * 5} y="0" width="2" height="0" fill={tk.latar} />
            ))}
          </g>
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 0.022 * H,
          height: 0.1 * H,
          top: (scene2 ? 0.66 : 0.78) * H,
          marginLeft: (scene2 ? 0.5 : 0.92) * W,
          background: tk.aksen2,
          borderRadius: `${0.011 * H}px ${0.011 * H}px 0 0`,
        }}
      />
    </div>
  );
};

const base = (tk: Tk): ScaleLadderProps => ({
  tokens: tk,
  kata: "Lompat",
  kecil: [
    { teks: "hanya", x: 0.12, y: 0.3 },
    { teks: "dua", x: 0.31, y: 0.29 },
    { teks: "ukuran", x: 0.56, y: 0.3 },
    { teks: "tak ada", x: 0.86, y: 0.29 },
    { teks: "tanpa", x: 0.17, y: 0.89 },
    { teks: "perantara", x: 0.7, y: 0.9 },
  ],
  beratBesar: 800,
  beratKecil: 300,
  seed: 7,
  lebarRel: 0.84,
  pusatY: 0.58,
  lebarHurufEm: 0.74,
  tracking: -0.04,
  kecilRel: 0.07,
  jedaHuruf: 2,
  geser: 0.08,
  mulai: 6,
  mulaiKecil: 26,
  durMasuk: 12,
});

export const DemoA: React.FC = () => (
  <ScaleLadder {...base(A)}>
    <Footage tk={A} />
  </ScaleLadder>
);

export const DemoB: React.FC = () => (
  <ScaleLadder {...base(B)}>
    <Footage tk={B} />
  </ScaleLadder>
);
