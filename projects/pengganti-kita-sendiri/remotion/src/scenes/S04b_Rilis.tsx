// 04b · «Ia terus berkembang» — kartu kaca rilis model OpenAI muncul makin rapat; rilis terbaru (GPT-5) menyala biru elektrik.
// Kamera C08 truck kiri→kanan (lanjutan truck 04a). Keluar X01: kartu menyusut jadi titik di garis → titik grafik 04c.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, useT } from "../lib/anim";
import { panel, word } from "../lib/time";
import { CARD_H, CARD_W, LINE_Y, RELEASES } from "./_b4_shared";

export const S04b_Rilis: React.FC = () => {
  const t = useT();
  const P = panel("04b");
  const tBk = word("berkembang", "s4").s;
  // jeda antar kartu makin rapat; GPT-5 mendarat di «berkembang» (+2 f)
  const AT = [P.start + 0.02, P.start + 0.27, P.start + 0.45, P.start + 0.58, P.start + 0.67, tBk + 2 / 30];
  // truck: isi bergeser ke kiri, menyambung kecepatan akhir 04a lalu mengerem
  const camX = keys(t, [[P.start, 520], [tBk + 0.25, 0]], EZ.out);
  // X01: kartu jadi titik
  const X0 = P.end - 0.36;
  const col = prog(t, X0, P.end - 0.04, EZ.inOut);
  const glow = prog(t, AT[5], AT[5] + 0.4, EZ.out);

  return (
    <Scene code="04b">
      <AbsoluteFill style={{ background: "linear-gradient(180deg, var(--sky-300) 0%, var(--sky-100) 38%, var(--sky-50) 70%, #fff 100%)", overflow: "hidden" }}>
        <Camera x={camX} blur={Math.max(0, 6 - (t - P.start) * 30)}>
          <div style={{ position: "absolute", left: -600, width: 3200, top: LINE_Y - 2, height: 4, background: "var(--sky-400)", opacity: 1 - col * 0.4 }} />
          {RELEASES.map((r, i) => {
            const a = AT[i];
            if (t < a) return null;
            const p = prog(t, a, a + 0.2, EZ.out);
            const hot = i === RELEASES.length - 1;
            // kolaps ke titik di pusat kartu
            const w = CARD_W + (20 - CARD_W) * col;
            const h = CARD_H + (20 - CARD_H) * col;
            const cx = r.x + CARD_W / 2;
            const cy = LINE_Y;
            const txt = 1 - prog(t, X0, X0 + 0.12, EZ.acc);
            return (
              <div key={r.name} style={{
                position: "absolute", left: cx - w / 2, top: cy - h / 2 + (1 - p) * 34, width: w, height: h, opacity: Math.min(1, p * 2.5),
                transform: `scale(${0.94 + 0.06 * p})`, borderRadius: 18 * (1 - col) + 10 * col,
                background: hot ? "linear-gradient(150deg, var(--electric) 0%, var(--violet-400) 100%)" : `color-mix(in srgb, #fff ${62 + col * 38}%, transparent)`,
                border: `2px solid ${hot ? "color-mix(in srgb, #fff 60%, transparent)" : "#fff"}`,
                boxShadow: hot
                  ? `0 24px 60px color-mix(in srgb, var(--electric) ${20 + 30 * glow}%, transparent), 0 0 ${40 * glow}px color-mix(in srgb, var(--electric) ${45 * glow}%, transparent)`
                  : "0 20px 50px color-mix(in srgb, var(--electric) 12%, transparent)",
                backdropFilter: "blur(14px)", overflow: "hidden", boxSizing: "border-box",
                ...(col > 0 && !hot ? { background: `color-mix(in srgb, var(--sb-ink) ${col * 100}%, color-mix(in srgb, #fff 62%, transparent))` } : {}),
              }}>
                <div style={{ position: "absolute", inset: 0, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: txt }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 10, background: hot ? "#fff" : "var(--sb-ink)" }} />
                    <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 24, letterSpacing: 1, color: hot ? "rgba(255,255,255,0.8)" : "var(--sb-ink-muted)" }}>{r.year}</span>
                  </div>
                  <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 48, letterSpacing: -1, lineHeight: 1, color: hot ? "#fff" : "var(--sb-ink)", whiteSpace: "nowrap" }}>{r.name}</span>
                </div>
              </div>
            );
          })}
        </Camera>
        <Grain opacity={0.035} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S04b_Rilis, covers: ["04b"] };
