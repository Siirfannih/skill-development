// 05e · «Dan kesempatan yang sama untuk membuat sesuatu.»
// Ray burst (R-RAY, sekali pakai) memancar dari tengah di «dan»; barisan landing page identik mendarat bergelombang dari tengah
// ke luar tepat di micro-tick «kesempatan» (88.69). Kamera C08 truck kiri→kanan, keluar X06 whip ke kanan (6 f) ke 05f.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, keys, prog, Scene, useT } from "../lib/anim";
import { FPS, panel } from "../lib/time";
import { C, z3tick } from "./_b5_shared";

const P = panel("05e");
const T_TICK = z3tick("05e kesempatan"); // 88.69
const WHIP = P.end - 6 / FPS;
const CW = 640, CH = 600, GAP = 64;
const DOMAINS = ["cofounder.ai", "mycofounder.app", "aicofounder.io", "cofoundr.ai", "getcofounder.com", "cofounder.so", "launchmate.ai", "cofounderly.app", "buildbuddy.ai"];

const Landing: React.FC<{ domain: string }> = ({ domain }) => (
  <div style={{ width: CW, height: CH, borderRadius: 26, background: "#fff", overflow: "hidden", boxShadow: "0 30px 70px rgba(29,54,235,0.22)", fontFamily: "Inter", color: C.ink, display: "flex", flexDirection: "column" }}>
    {/* chrome peramban */}
    <div style={{ height: 46, background: "#f2f2f5", display: "flex", alignItems: "center", gap: 8, padding: "0 18px", borderBottom: "1px solid #e6e6ea" }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
      <div style={{ marginLeft: 18, flex: 1, height: 26, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.muted, gap: 6 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        {domain}
      </div>
    </div>
    {/* nav */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>
        <div style={{ width: 22, height: 22, borderRadius: 7, background: `linear-gradient(135deg, ${C.violet400}, ${C.electric})` }} />Cofounder
      </div>
      <div style={{ display: "flex", gap: 20, fontSize: 13, color: C.muted, alignItems: "center" }}>
        <span>Product</span><span>Pricing</span><span>Log in</span>
        <span style={{ background: C.ink, color: "#fff", borderRadius: 999, padding: "6px 13px", fontWeight: 600 }}>Get started</span>
      </div>
    </div>
    {/* hero */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "14px 40px 0" }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.electric, background: "#eef0ff", borderRadius: 999, padding: "5px 12px" }}>✦ Powered by GPT</span>
      <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: -1.8, lineHeight: 1.02, marginTop: 16 }}>Your AI co-founder.</span>
      <span style={{ fontSize: 16, color: C.muted, marginTop: 12, lineHeight: 1.4 }}>Launch your startup this weekend. No code needed.</span>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <span style={{ background: C.ink, color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: 999, padding: "10px 20px" }}>Join waitlist</span>
        <span style={{ border: `1px solid ${C.line}`, fontSize: 14, fontWeight: 600, borderRadius: 999, padding: "9px 20px" }}>Watch demo</span>
      </div>
    </div>
    {/* cuplikan produk */}
    <div style={{ margin: "26px 40px 0", flex: 1, borderRadius: "16px 16px 0 0", background: `linear-gradient(160deg, ${C.violet50}, ${C.violet200})`, padding: "18px 22px 0", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ alignSelf: "flex-end", background: C.ink, color: "#fff", fontSize: 12, borderRadius: 14, padding: "7px 12px" }}>Find me a startup idea</div>
      <div style={{ alignSelf: "flex-start", background: "#fff", fontSize: 12, borderRadius: 14, padding: "8px 12px", maxWidth: 300, lineHeight: 1.4, textAlign: "left", boxShadow: "0 4px 12px rgba(29,54,235,0.10)" }}>Here are 3 AI startups you can launch this weekend…</div>
      <div style={{ display: "flex", gap: 8 }}>
        {["Habit AI", "Resume AI", "Caption AI"].map((n, i) => (
          <div key={n} style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, boxShadow: "0 4px 12px rgba(29,54,235,0.08)" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: ["linear-gradient(145deg,#34d399,#059669)", "linear-gradient(145deg,#60a5fa,#2563eb)", "linear-gradient(145deg,#f472b6,#db2777)"][i] }} />{n}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const S05e_SameChance: React.FC = () => {
  const t = useT();
  // sinar memancar dari tengah di «dan», kilat kecil di tick
  const ray = prog(t, P.start, P.start + 0.35, EZ.out);
  const flash = t >= T_TICK ? Math.exp(-(t - T_TICK) * 6) : 0;
  const rot = (t - P.start) * 2.2;
  // truck kiri→kanan (≤ 22 px/f puncak), lalu whip
  const truck = keys(t, [[P.start, 0], [WHIP, 1100]], EZ.inOut);
  const whip = prog(t, WHIP, P.end, EZ.acc);
  const camX = -(truck + whip * 2200);
  const whipBlur = whip * 40;
  const rowLeft = 960 - CW * 1.5 - GAP - 700; // kartu tengah layar awal ≈ indeks 2–3
  return (
    <Scene code="05e">
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${C.violet50} 0%, ${C.violet200} 30%, ${C.violet400} 55%, ${C.electric} 100%)`, overflow: "hidden" }}>
        {/* R-RAY: diam di ruang layar (latar jauh), rotasi pelan */}
        <svg width="2400" height="2400" viewBox="-1200 -1200 2400 2400" style={{ position: "absolute", left: -240, top: -660, transform: `rotate(${rot}deg) scale(${0.35 + 0.65 * ray})`, opacity: ray }}>
          {Array.from({ length: 14 }).map((_, i) => {
            const a0 = (i / 14) * Math.PI * 2;
            const a1 = a0 + 0.13;
            const R = 1700;
            return <polygon key={i} points={`0,0 ${Math.cos(a0) * R},${Math.sin(a0) * R} ${Math.cos(a1) * R},${Math.sin(a1) * R}`} fill="#ffffff" fillOpacity={0.2 + 0.25 * flash} />;
          })}
        </svg>
        <svg width="0" height="0" style={{ position: "absolute" }}><filter id="whip05e" x="-20%" y="0" width="140%" height="100%"><feGaussianBlur stdDeviation={`${whipBlur} 0`} /></filter></svg>
        <AbsoluteFill style={{ transform: `translateX(${camX}px)`, filter: whipBlur > 0.1 ? "url(#whip05e)" : undefined }}>
          {DOMAINS.map((d, i) => {
            const x = rowLeft + i * (CW + GAP);
            // gelombang dari tengah layar ke luar, 1 f per langkah jarak
            const dist = Math.abs(x + CW / 2 - 960) / (CW + GAP);
            const a = T_TICK + (dist * 1.4) / FPS;
            const p = prog(t, a, a + 6 / FPS, EZ.out);
            return (
              <div key={i} style={{ position: "absolute", left: x, top: 540 - CH / 2 + 10, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + 0.1 * p})` }}>
                <Landing domain={d} />
              </div>
            );
          })}
        </AbsoluteFill>
        <Grain opacity={0.035} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S05e_SameChance, covers: ["05e"] };
