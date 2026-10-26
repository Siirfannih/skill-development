import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

// Effect family on top of the cut (Irfan 26 Okt 13:56): negative flashes for tension, RGB split on whips/impacts,
// exposure flash, film grain. Events are frame-exact so SFX (clicks/hits) can be bound to them in audio_build.
export type FxEvent = { at: number; kind: "neg" | "rgb" | "flash" | "shake"; dur?: number; amt?: number };

export const FX: React.FC<{ events: FxEvent[]; children: React.ReactNode; grain?: number }> = ({ events, children, grain = 0.05 }) => {
  const f = useCurrentFrame();
  let neg = false;
  let rgb = 0;
  let flash = 0;
  for (const e of events) {
    const d = e.dur ?? 2;
    const t = f - e.at;
    if (t < 0 || t >= d) continue;
    if (e.kind === "neg") neg = !neg; // overlapping negatives toggle (strobe pattern)
    if (e.kind === "rgb") rgb = Math.max(rgb, (e.amt ?? 14) * (1 - t / d));
    if (e.kind === "flash") flash = Math.max(flash, 1 - t / d);
  }
  const id = `rgb${f}`;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {rgb > 0.5 && (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" dx={rgb} dy="0" result="ro" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feOffset in="b" dx={-rgb} dy="0" result="bo" />
            <feBlend in="ro" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bo" mode="screen" />
          </filter>
        </svg>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: [neg ? "invert(1)" : "", rgb > 0.5 ? `url(#${id})` : ""].join(" ").trim() || undefined,
        }}
      >
        {children}
      </div>
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash * 0.85 }} />}
      {grain > 0 && (
        <>
          <Img src={staticFile("assets/grain.png")} style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${staticFile("assets/grain.png")})`,
              backgroundRepeat: "repeat",
              backgroundPosition: `${(f * 137) % 512}px ${(f * 251) % 512}px`,
              mixBlendMode: "overlay",
              opacity: grain,
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </div>
  );
};
