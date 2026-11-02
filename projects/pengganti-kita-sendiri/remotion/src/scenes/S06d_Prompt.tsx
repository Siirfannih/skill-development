// 06d · «bahkan untuk hal yang sebenarnya bisa kita kerjakan sendiri»: over-the-shoulder (C13).
// Bidang cahaya sudah jadi composer; prompt sepele diketik pelan per huruf. Masuk lewat bloom match dari 06c.
// Keluar: di «Tapi» (awal 06e, ostinato berhenti) lampu bidang padam dengan klik relay → potong dalam gelap ke 06e.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, Grain, prog, Scene, sfxMark, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { AIGlyph, Ball, C6, Plane, Torso, wa } from "./_b6_shared";

const P = panel("06d");
export const T_OFF = word("Tapi", "s6", 1).s; // = awal 06e
export const OFF_HOLD = 0.24; // gelap sesaat sebelum potong ke wide 06e
const PROMPT = "tolong balas “oke, siap” ke pesan ini";
const TYPE_A = P.start + 0.12;
const TYPE_B = word("sendiri", "s6", 1).s + 0.1;
const W_BISA = word("bisa", "s6", 1).s; // C20 cut zoom ke composer
const W_SENDIRI = word("sendiri", "s6", 1).s; // C01

// frame pertama huruf ke-i (1-based) muncul, persis rumus n di bawah; spasi tidak ditandai
const KEY_MARKS: { at: number; id: string }[] = (() => {
  const out: { at: number; id: string }[] = [];
  let w = 0;
  let wi = 0;
  const words = PROMPT.split(" ");
  for (let i = 1; i <= PROMPT.length; i++) {
    const ch = PROMPT[i - 1];
    if (ch === " ") { w++; wi = 0; continue; }
    const at = Math.ceil((TYPE_A + (i / PROMPT.length) * (TYPE_B - TYPE_A)) * FPS - 1e-6) / FPS;
    out.push({ at, id: `06d:key:${words[w]}:${wi++}` });
  }
  return out;
})();

export const S06d_Prompt: React.FC = () => {
  const t = useT();
  // R3-E: padam MONOTONIK 6 f (v10: relay 0 → 0,45 → 0 = kedip gelap→abu→gelap di 117,07–117,13), lalu potong dalam gelap ke 06e
  const on = 1 - prog(t, T_OFF, T_OFF + 0.2, EZ.inOut);
  // ── SFXEV
  sfxMark(t, "pop", P.start, "06d:bloom:1"); // bloom match dari 06c (puncak BLOOM_06C_END) mendarat jadi composer
  KEY_MARKS.forEach((k) => sfxMark(t, "key", k.at, k.id));
  sfxMark(t, "cut", W_BISA, "06d:cutzoom:1"); // C20 cut zoom ×1,35 ke composer
  sfxMark(t, "toggle", T_OFF, "06d:relay:off"); // relay(t, T_OFF): bidang/composer padam
  // bloom masuk dari 06c meluruh
  const bloom = 0.4 * (1 - prog(t, P.start, P.start + 0.35, EZ.out));
  // C13: dorong pelan + parallax (bahu depan bergeser lebih jauh dari bidang)
  const d = prog(t, P.start, T_OFF, EZ.inOut);
  const sc = 1 + 0.035 * d;
  const fgX = -d * 36;
  const bgX = -d * 12;
  // C20 di «bisa»: potong ×1,35 ke composer di garis pandang sama (momentum 6 f), lalu C01 di «sendiri».
  // Titik asal (1949,520) menaruh composer di x≈1100; lebar composer ±1,35 k px tetap di dalam frame.
  const cz = t >= W_BISA ? 1.35 + 0.05 * (1 - prog(t, W_BISA, W_BISA + 6 / FPS, EZ.out)) : 1;
  const Z = cz * (1 + 0.05 * prog(t, W_SENDIRI, W_SENDIRI + 20 / FPS, EZ.out));
  // ketik pelan: per huruf rata dari TYPE_A sampai TYPE_B
  const n = Math.max(0, Math.min(PROMPT.length, Math.floor(((t - TYPE_A) / (TYPE_B - TYPE_A)) * PROMPT.length)));
  const typed = PROMPT.slice(0, n).replace(/[“”",]/g, ""); // v10 (#40): tanpa tanda baca di layar; timing ketikan tetap (cue key)
  const done = n >= PROMPT.length;
  const caretOn = !done || Math.floor((t - TYPE_B) / 0.5) % 2 === 0;
  return (
    <Scene start={P.start} end={T_OFF + OFF_HOLD} name="06d Prompt sepele">
      <AbsoluteFill style={{ background: C6.charcoal, overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `scale(${Z})`, transformOrigin: "1949px 520px" }}>
        <AbsoluteFill style={{ transform: `scale(${sc})`, transformOrigin: "1280px 520px" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 540, transform: `translateX(${bgX}px) scale(2)`, transformOrigin: "0 0" }}>
            {/* v9 (#30): SENDIRI = anchor di kiri composer, setinggi kepala piktogram over-the-shoulder; DOM sebelum bola kepala (fg) → ujung kiri huruf tertutup kepala.
                Putih di charcoal, berhenti di tepi kiri bidang (x 372) supaya tidak menimpa bidang putih. */}
            <Plane b={{ x: 380, y: 120, w: 560, h: 280 }} on={on} slant={0.08} softGlow
              grad={`linear-gradient(90deg, ${C6.white} 60%, ${C6.paper} 100%)`}
              glow={{ b: { x: 420, y: 150, w: 480, h: 220 }, blur: 140, spread: 40, a: 0.22, radius: 40 }}>
              {/* v10 (#40): tampilan ChatGPT asli — logo, sapaan, composer abu muda #f4f4f4 pil besar: tombol +, teks, mikrofon, tombol kirim hitam bulat */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, fontFamily: "Inter" }}>
                <AIGlyph size={34} />
                <span style={{ fontSize: 24, fontWeight: 600, color: C6.ink, letterSpacing: -0.4 }}>Apa yang bisa kubantu</span>
                <div style={{ display: "flex", alignItems: "center", width: 460, background: "#f4f4f4", borderRadius: 30, padding: "12px 12px 12px 14px", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 16, display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 3v12M3 9h12" stroke="#5d5d5d" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </div>
                  <span style={{ fontSize: 19, lineHeight: 1.35, color: n > 0 ? C6.ink : "#8e8e93", whiteSpace: "pre" }}>{n > 0 ? typed : "Tanya apa saja"}</span>
                  <div style={{ width: 2, height: 24, background: C6.ink, marginLeft: -6, opacity: caretOn ? 1 : 0 }} />
                  <div style={{ flex: 1 }} />
                  <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0 }}><rect x="7" y="2" width="6" height="10" rx="3" fill="none" stroke="#5d5d5d" strokeWidth="1.6" /><path d="M4 9a6 6 0 0 0 12 0M10 15v3" stroke="#5d5d5d" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: n > 0 ? C6.ink : "#d0d0d0", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke={C6.white} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </div>
            </Plane>
          </div>
          <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 540, transform: `translateX(${fgX}px) scale(2)`, transformOrigin: "0 0" }}>
            <Ball b={{ x: -30, y: 110, w: 250, h: 250 }} rim={0.85 * on} r={7} style={{ background: `linear-gradient(100deg, ${C6.charcoal} 45%, ${C6.raised} 100%)` }} />
            <Torso b={{ x: -140, y: 380, w: 560, h: 400 }} rim={0.65 * on} r={7} style={{ background: `linear-gradient(100deg, ${C6.charcoal} 45%, ${C6.raised} 100%)` }} />
          </div>
        </AbsoluteFill>
        </AbsoluteFill>
        {/* R2-C: anchor «Sendiri» dihapus (terbaca seperti label UI di kartu ChatGPT). */}
        {bloom > 0.005 && (
          <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 80% at 1300px 520px, ${wa(bloom)} 0%, ${wa(bloom * 0.5)} 45%, ${wa(0)} 100%)` }} />
        )}
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S06d_Prompt, covers: ["06d"] };
