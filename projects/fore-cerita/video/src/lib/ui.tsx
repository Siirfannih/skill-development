import React from "react";
import { AbsoluteFill, Img, interpolate, random, useCurrentFrame } from "remotion";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import { clamp, easeOut, twos } from "./core";

const INTER = "Inter, system-ui, sans-serif";
export const HAND = "Caveat, cursive";

/* ---------- Instagram story (UI menyerupai aslinya, akun fiktif) ---------- */
export const IGStory: React.FC<{
  stories: { src: string; user: string; ago: string }[];
  per: number; // frame per story
  w?: number;
}> = ({ stories, per, w = 560 }) => {
  const frame = useCurrentFrame();
  const i = Math.min(stories.length - 1, Math.floor(frame / per));
  const local = frame - i * per;
  const h = w * (16 / 9);
  const st = stories[i];
  return (
    <div
      style={{
        position: "absolute",
        left: 960 - w / 2,
        top: 540 - h / 2,
        width: w,
        height: h,
        borderRadius: 34,
        overflow: "hidden",
        background: "#000",
        boxShadow: "0 0 0 14px #0c0c0e, 0 30px 80px rgba(0,0,0,0.6)",
      }}
    >
      <Img src={st.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%)" }} />
      {/* progress bar */}
      <div style={{ position: "absolute", top: 14, left: 12, right: 12, display: "flex", gap: 5 }}>
        {stories.map((_, k) => (
          <div key={k} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.35)", overflow: "hidden" }}>
            <div
              style={{
                width: `${k < i ? 100 : k > i ? 0 : interpolate(local, [0, per], [0, 100], clamp)}%`,
                height: "100%",
                background: "#fff",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 30, left: 14, display: "flex", alignItems: "center", gap: 10, fontFamily: INTER, color: "#fff" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: `hsl(${(i * 70 + 20) % 360} 30% 55%)`,
            border: "2px solid rgba(255,255,255,0.9)",
          }}
        />
        <span style={{ fontWeight: 600, fontSize: 17 }}>{st.user}</span>
        <span style={{ opacity: 0.75, fontSize: 16 }}>{st.ago}</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 14,
          right: 70,
          height: 46,
          borderRadius: 23,
          border: "1.5px solid rgba(255,255,255,0.7)",
          fontFamily: INTER,
          color: "rgba(255,255,255,0.85)",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          paddingLeft: 18,
        }}
      >
        Kirim pesan
      </div>
      <div style={{ position: "absolute", bottom: 26, right: 22, fontSize: 28, color: "#fff" }}>♡</div>
    </div>
  );
};

/* ---------- WhatsApp grup (menyerupai aslinya, nama fiktif) ---------- */
export const WAChat: React.FC<{ typed: string; caretOn: boolean; dim?: number; w: number; h: number }> = ({
  typed,
  caretOn,
  dim = 0,
  w,
  h,
}) => {
  const k = w / 390; // skala dari lebar iPhone logis
  return (
    <div style={{ width: w, height: h, background: "#efe7de", fontFamily: INTER, position: "relative", overflow: "hidden" }}>
      <div style={{ height: 92 * k, background: "#f6f6f6", display: "flex", alignItems: "flex-end", padding: `0 ${12 * k}px ${10 * k}px`, gap: 10 * k, borderBottom: "1px solid #ddd" }}>
        <span style={{ color: "#1fa855", fontSize: 26 * k }}>‹</span>
        <div style={{ width: 36 * k, height: 36 * k, borderRadius: "50%", background: "#b9c7bd" }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 * k, color: "#111" }}>Anak Kos 2019 🏠</div>
          <div style={{ fontSize: 12 * k, color: "#777" }}>Dimas, Rara, Tio, Sinta, Kamu</div>
        </div>
      </div>
      <div style={{ padding: 12 * k, display: "flex", flexDirection: "column", gap: 8 * k }}>
        {[
          ["Rara", "Sabtu kumpul yuk, udah lama banget 😭"],
          ["Dimas", "gasss, di tempat biasa"],
          ["Sinta", "pada bisa?"],
        ].map(([n, t], i) => (
          <div key={i} style={{ alignSelf: "flex-start", background: "#fff", borderRadius: 10 * k, padding: `${6 * k}px ${10 * k}px`, maxWidth: "80%", boxShadow: "0 1px 0 rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 12 * k, fontWeight: 600, color: ["#d0587a", "#3a8bd0", "#c88a1d"][i] }}>{n}</div>
            <div style={{ fontSize: 15 * k, color: "#111" }}>{t}</div>
            <div style={{ fontSize: 10 * k, color: "#999", textAlign: "right" }}>20.4{i}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#f6f6f6", padding: `${8 * k}px ${10 * k}px ${22 * k}px`, display: "flex", gap: 8 * k, alignItems: "center" }}>
        <span style={{ fontSize: 22 * k, color: "#777" }}>+</span>
        <div style={{ flex: 1, background: "#fff", borderRadius: 18 * k, padding: `${8 * k}px ${12 * k}px`, fontSize: 16 * k, color: "#111", minHeight: 20 * k, border: "1px solid #e2e2e2" }}>
          {typed}
          <span style={{ opacity: caretOn ? 1 : 0, color: "#1fa855" }}>|</span>
        </div>
        <div style={{ width: 34 * k, height: 34 * k, borderRadius: "50%", background: "#1fa855" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: dim }} />
    </div>
  );
};

/* ---------- Tulisan tangan yang muncul per huruf (12 fps) ---------- */
export const Handwrite: React.FC<{
  text: string;
  start: number;
  cps?: number; // karakter per detik
  size: number;
  color?: string;
  style?: React.CSSProperties;
  rotate?: number;
}> = ({ text, start, cps = 14, size, color = "#2b2522", style, rotate = 0 }) => {
  const frame = twos(useCurrentFrame());
  const n = Math.max(0, Math.floor(((frame - start) / 24) * cps));
  return (
    <div style={{ fontFamily: HAND, fontWeight: 500, fontSize: size, color, whiteSpace: "pre", rotate: `${rotate}deg`, ...style }}>
      {text.slice(0, n)}
    </div>
  );
};

/** Garis coret pena yang sedikit bergelombang. */
export const Strike: React.FC<{ w: number; start: number; dur: number; color?: string; seed?: string; thick?: number }> = ({
  w,
  start,
  dur,
  color = "#1e1a18",
  seed = "s",
  thick = 4,
}) => {
  const frame = twos(useCurrentFrame());
  const p = interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: easeOut });
  const pts = new Array(9).fill(0).map((_, i) => `${(i / 8) * w},${(random(seed + i) - 0.5) * 6}`);
  const d = `M ${pts.join(" L ")}`;
  return (
    <svg width={w + 10} height={30} style={{ overflow: "visible" }}>
      <path d={d} transform="translate(4,15)" stroke={color} strokeWidth={thick} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
    </svg>
  );
};

/* ---------- Gelembung mimpi (masuk ke bayangan) ---------- */
export const DreamBubble: React.FC<{ cx: number; cy: number; r: number; inner: React.ReactNode; rim?: number }> = ({
  cx,
  cy,
  r,
  inner,
  rim = 1,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: "50%", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -(cx - r), top: -(cy - r), width: 1920, height: 1080 }}>{inner}</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: cx - r,
        top: cy - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        opacity: rim,
        boxShadow: `inset 0 0 ${r * 0.18}px rgba(255,255,255,0.75), inset ${r * 0.05}px -${r * 0.06}px ${r * 0.12}px rgba(150,220,230,0.5), 0 0 ${r * 0.25}px rgba(255,245,225,0.55)`,
        background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) ${r * 0.0 + 18}%)`,
      }}
    />
  </AbsoluteFill>
);
