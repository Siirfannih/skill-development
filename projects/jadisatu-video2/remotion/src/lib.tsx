import React from "react";
import {
  AbsoluteFill,
  Easing,
  Freeze,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import heads from "../public/data/head.json";

export const FPS = 30;
// Pre-roll sebelum dialog mulai (lampu menyala dulu).
export const OFF = 0.6;
export const W = 1920;
export const H = 1080;

export const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
}).fontFamily;
export const poppins = loadPoppins("normal", {
  weights: ["800", "900"],
  subsets: ["latin"],
}).fontFamily;

/** Detik di animatic (dialog.wav) → frame video. */
export const fa = (sec: number) => Math.round((sec + OFF) * FPS);
/** Durasi detik → frame. */
export const fd = (sec: number) => Math.round(sec * FPS);

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Enam gradient tipografi (arah divariasikan per beat).
export const GRAD = {
  ice: "linear-gradient(100deg,#ffffff 10%,#a9c1ff 95%)",
  cyan: "linear-gradient(80deg,#e9f6ff 0%,#6fd3ff 100%)",
  violet: "linear-gradient(120deg,#ffffff 0%,#b9a6ff 100%)",
  sky: "linear-gradient(180deg,#ffffff 30%,#8fb4ff 100%)",
  warm: "linear-gradient(90deg,#fff3e6 0%,#ffb27a 100%)",
  pure: "linear-gradient(90deg,#ffffff,#ffffff)",
};

type BgKind = "night" | "blueTop" | "blueLeft" | "blueRight" | "blueDiag" | "graphite" | "black";
export const Bg: React.FC<{ kind?: BgKind; drift?: boolean }> = ({ kind = "night", drift = true }) => {
  const frame = useCurrentFrame();
  const d = drift ? Math.sin(frame / 90) * 4 : 0;
  const bg: Record<BgKind, string> = {
    night: `radial-gradient(ellipse 70% 60% at ${50 + d}% 110%, #2a3fd6 0%, #0d1658 35%, #050608 72%)`,
    blueTop: `radial-gradient(ellipse 80% 55% at ${50 + d}% -10%, #3352f0 0%, #101d6e 38%, #050608 78%)`,
    blueLeft: `radial-gradient(ellipse 60% 80% at ${-8 + d}% 50%, #2f4be6 0%, #0e1a62 40%, #050608 80%)`,
    blueRight: `radial-gradient(ellipse 60% 80% at ${108 - d}% 40%, #3a56f2 0%, #111d6a 40%, #050608 80%)`,
    blueDiag: `radial-gradient(ellipse 70% 70% at ${85 - d}% 100%, #2b44e0 0%, #0c1555 42%, #050608 82%)`,
    graphite: "linear-gradient(180deg,#101010 0%,#050505 100%)",
    black: "#000",
  };
  return (
    <AbsoluteFill style={{ background: bg[kind] }}>
      <AbsoluteFill
        style={{
          opacity: 0.07,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
    </AbsoluteFill>
  );
};

/** Satu baris teks per state. Masuk: naik + blur → tajam. Keluar: memudar. */
export const Line: React.FC<{
  text: React.ReactNode;
  dur: number;
  size?: number;
  grad?: string;
  weight?: number;
  y?: number;
  x?: number;
  align?: "center" | "left";
  font?: string;
  tracking?: number;
  exit?: boolean;
}> = ({ text, dur, size = 104, grad = GRAD.ice, weight = 600, y = 0, x = 0, align = "center", font, tracking = -0.035, exit = true }) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: EASE });
  const outP = exit ? interpolate(frame, [dur - 6, dur], [1, 0], clamp) : 1;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: align === "center" ? "center" : "flex-start",
        paddingLeft: align === "left" ? 160 : 0,
      }}
    >
      <div
        style={{
          fontFamily: font ?? inter,
          fontWeight: weight,
          fontSize: size,
          letterSpacing: `${tracking}em`,
          lineHeight: 1.05,
          whiteSpace: "nowrap",
          backgroundImage: grad,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          opacity: inP * outP,
          filter: `blur(${(1 - inP) * 14}px)`,
          translate: `${x}px ${y + (1 - inP) * 36}px`,
          paddingBottom: size * 0.12,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export type Seg = [number, number, number]; // [mulai global (frame), durasi (frame), sumber (detik)]

/** Potongan footage bersih. `cut` = video cutout transparan. */
export const Footage: React.FC<{
  segs: Seg[];
  cut?: boolean;
  style?: React.CSSProperties;
}> = ({ segs, cut, style }) => (
  <>
    {segs.map(([from, dur, src], i) => (
      <Sequence key={i} from={from} durationInFrames={dur} layout="none">
        <OffthreadVideo
          src={staticFile(cut ? "media/irfan_cutout.webm" : "media/talkinghead.mp4")}
          transparent={cut}
          muted
          startFrom={Math.round(src * FPS)}
          style={{ position: "absolute", width: W, height: H, ...style }}
        />
      </Sequence>
    ))}
  </>
);

/** Cutout Irfan dibekukan pada detik sumber tertentu. */
export const CutoutStill: React.FC<{ src: number; style?: React.CSSProperties }> = ({ src, style }) => (
  <Freeze frame={Math.round(src * FPS)}>
    <OffthreadVideo
      src={staticFile("media/irfan_cutout.webm")}
      transparent
      muted
      style={{ position: "absolute", width: W, height: H, ...style }}
    />
  </Freeze>
);

/** Posisi kepala (px, kanvas 1920×1080) pada detik sumber. */
export const headAt = (srcSec: number) => {
  const arr = heads as number[][];
  const i = Math.max(0, Math.min(arr.length - 1, Math.round(srcSec * FPS)));
  const [cx, cy, w] = arr[i];
  return { cx, cy, w };
};

export const Clawd: React.FC<{ size?: number; sleepy?: number; style?: React.CSSProperties }> = ({ size = 300, sleepy = 0, style }) => {
  const eyeH = 58 * (1 - sleepy * 0.75);
  return (
    <svg viewBox="0 0 693 527" width={size} height={(size * 527) / 693} style={style}>
      <path d="M114 68H580V184H693V301H580V527H521V418H464V527H405V418H290V527H231V418H173V527H114V301H0V184H114Z" fill="#D97757" />
      <rect x="173" y={126 + (58 - eyeH)} width="58" height={eyeH} fill="#141413" />
      <rect x="464" y={126 + (58 - eyeH)} width="58" height={eyeH} fill="#141413" />
    </svg>
  );
};

export const Glass: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; dark?: boolean }> = ({ style, children, dark = true }) => (
  <div
    style={{
      background: dark
        ? "linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))"
        : "linear-gradient(180deg,rgba(255,255,255,0.64),rgba(255,255,255,0.24))",
      border: `1.5px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.7)"}`,
      borderRadius: 28,
      boxShadow: "0 12px 34px rgba(0,0,0,0.25)",
      backdropFilter: "blur(18px)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const pop = (frame: number, at: number, len = 14) =>
  interpolate(frame, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
