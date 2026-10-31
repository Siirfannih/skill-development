// 03a-1 → 03a-2 → 03b · Babak 3 «Meniru Diri»: composer (prompt CEO diketik per kata) → klik kirim → empat agent
// melompat dari tombol → terbang ke ruang kerja bersama (kursor bernama) → zoom-through ke kursor CEO (→ 03c).
// Satu dunia kontinu (ruang 1920×1080, skala kamera 1 = framing panel 03a-2 ×2; ruang kerja 03b di atasnya, Y0 = −1080).
import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera, EZ, Grain, keys, prog, Scene, useT } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { AgentFace, AGENTS, Arrow, cue, Icon, I_FOLDER, I_KEY, I_MIC, I_MORE, I_PLUS, I_UP, I_X, NamedCursor } from "./_b3_shared";

const P1 = panel("03a-1");
const P3 = panel("03b");
const W = (w: string, n = 1) => word(w, "s3", n).s;
const F2 = 2 / FPS;

// ── cue mix
const T_MENGAJARI = cue("tick_z2_42.38");
const T_BERPIKIR = cue("tick_z2_43.65");
const T_MENULIS = cue("tick_z2_44.68");
const T_KIRIM = cue("tick_z2_45.44"); // = onset «bekerja»
const T_AG = [T_KIRIM, cue("tick_agent2"), cue("tick_agent3"), cue("tick_agent4")];

// ── pesan di composer: muncul per kata mengikuti VO; kata kunci jatuh tepat di tick ketik
const MSG: { w: string; at: number; bold?: boolean; line: 0 | 1 }[] = [
  { w: "Kamu", at: W("kita") + F2, line: 0 },
  { w: "bertindak", at: W("mulai") + F2, line: 0 },
  { w: "sebagai", at: (W("mulai") + T_MENGAJARI) / 2, line: 0 },
  { w: "CEO", at: T_MENGAJARI, bold: true, line: 0 },
  { w: "untuk", at: W("AI") + F2, line: 0 },
  { w: "menjalankan", at: W("untuk") + F2, line: 1 },
  { w: "bisnis", at: T_BERPIKIR, line: 1 },
  { w: "yang", at: T_BERPIKIR + 0.3, line: 1 },
  { w: "aku", at: (T_BERPIKIR + 0.3 + T_MENULIS) / 2, line: 1 },
  { w: "jalankan.", at: T_MENULIS, line: 1 },
];

// ── geometri dunia
const BTN = { x: 1700, y: 852 }; // tombol kirim
const SPAWN = [
  { x: 1532, y: 392, s: 184 }, // CEO, terbesar & paling dekat tombol
  { x: 1192, y: 192, s: 144 }, // CS
  { x: 860, y: 320, s: 120 }, // Ops
  { x: 552, y: 132, s: 104 }, // Editor
];
const Y0 = -1080; // ruang kerja
const LAUNCH = [W("persis"), W("persis") + 0.06, W("persis") + 0.12, T_AG[3] + 0.09];
const FLY = 0.55;
const T_LAND = W("persis") + 0.73; // kamera tiba di ruang kerja

// ── ruang kerja (03b): waktu
const T_SEND_CEO = W("apa"); // CEO mulai menulis laporan
const T_STREAM = [W("yang"), W("dalam") - 0.05];
const T_REPLY = W("dalam");
const T_WORK = [W("kehidupan"), W("kehidupan") + 0.22, W("sehari-hari")];
const T_FOLLOW = W("dalam") + 0.8; // balasan CEO terbaca ≥ 0,8 dtk dalam wide sebelum kamera mendorong
const T_ZOOM = P3.end - 0.55;

const STREAM = "312 pesanan · omzet Rp48,6 jt · naik 18% dari minggu lalu";
const STREAM_X = 444;
const STREAM_Y = Y0 + 300;
const CW = 0.535 * 32; // lebar rata-rata karakter Inter 32 px (perkiraan untuk posisi kursor)

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// posisi ujung kursor tiap agent di ruang kerja (fungsi waktu; gerak sendiri = lintasan halus deterministik)
const CEO_DOCK = { x: 1470, y: Y0 + 520 };
const BAR_X = [440, 800, 1160];
const BAR_W = 320;
const BAR_Y = Y0 + 600 + 40 + 80 + 20 + 106 + 20; // padding + header + gap + 2 baris teks + gap
const fillOf = (i: number, t: number) => prog(t, T_WORK[i] + 0.36, P3.end + 0.2, EZ.inOut);
const cursorPos = (k: number, t: number): { x: number; y: number } => {
  const wob = (ax: number, ay: number, fx: number, ph: number) => ({ x: Math.sin(t * fx + ph) * ax, y: Math.cos(t * fx * 0.8 + ph) * ay });
  if (k === 0) {
    const land = { x: 1500, y: Y0 + 360 };
    const s0 = { x: STREAM_X + 8, y: STREAM_Y + 40 };
    const n = Math.floor(STREAM.length * prog(t, T_STREAM[0], T_STREAM[1], (x) => x));
    const sEnd = { x: STREAM_X + n * CW + 8, y: STREAM_Y + 40 };
    if (t < T_SEND_CEO) return { x: land.x + wob(10, 6, 2.1, 0).x, y: land.y + wob(10, 6, 2.1, 0).y };
    if (t < T_STREAM[0]) { const k2 = prog(t, T_SEND_CEO, T_STREAM[0], EZ.inOut); return { x: lerp(land.x, s0.x, k2), y: lerp(land.y, s0.y, k2) }; }
    if (t < T_STREAM[1] + 0.05) return sEnd;
    const k3 = prog(t, T_STREAM[1] + 0.05, T_STREAM[1] + 0.5, EZ.inOut);
    return { x: lerp(sEnd.x, CEO_DOCK.x, k3), y: lerp(sEnd.y, CEO_DOCK.y, k3) };
  }
  const home = [null, { x: 560, y: Y0 + 880 }, { x: 430, y: Y0 + 60 }, { x: 1250, y: Y0 + 50 }][k]!;
  const w = wob(26, 18, 1.7 + k * 0.35, k * 1.9);
  const idle = { x: home.x + w.x, y: home.y + w.y };
  const i = k - 1;
  const go = prog(t, T_WORK[i], T_WORK[i] + 0.36, EZ.inOut);
  const target = { x: BAR_X[i] + 10 + BAR_W * fillOf(i, t), y: BAR_Y + 14 };
  return { x: lerp(idle.x, target.x, go), y: lerp(idle.y, target.y, go) };
};
// pusat wajah kecil di pil nama relatif ke ujung kursor (lihat NamedCursor)
const FACE_OFF = { x: 58, y: 68 };

const Chip: React.FC<{ children: React.ReactNode; pad?: string }> = ({ children, pad = "0 18px 0 28px" }) => (
  <div style={{ height: 88, display: "flex", alignItems: "center", gap: 16, padding: pad, background: "#fff", borderRadius: 999, fontFamily: "Inter", fontWeight: 500, fontSize: 34, color: "var(--sb-ink)", whiteSpace: "nowrap" }}>
    {children}
    <div style={{ width: 40, height: 40, borderRadius: 999, background: "var(--violet-200)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}>
      <Icon d={I_X} size={22} color="#fff" sw={2.4} />
    </div>
  </div>
);

export const S03a_AgentKerja: React.FC = () => {
  const t = useT();

  // ── kamera: close di composer (C18 ikut caret, crop kanan) → mundur ke tombol kirim (C06) → C01 di klik
  //    → X01 naik ke ruang kerja → C19 drift → C18 ikut kursor CEO → X04 zoom-through
  const lastIdx = MSG.reduce((a, m, i) => (t >= m.at ? i : a), -1);
  const follow = {
    cx: keys(t, [[41.6, 715], [MSG[4].at, 770], [MSG[5].at, 745], [MSG[9].at + 0.1, 785]], EZ.inOut),
    cy: keys(t, [[MSG[4].at, 690], [MSG[5].at + 0.2, 718]], EZ.inOut),
    s: keys(t, [[P1.start, 1.6], [P1.start + 0.6, 1.5], [P1.end, 1.53]], EZ.out),
  };
  // C01 di «CEO» (kata inti prompt), lalu C15 patah ke wide ≤ 6 f di «dan» (sebelum klik), C01 di klik kirim
  const c01 = 1 + 0.04 * prog(t, T_MENGAJARI, T_MENGAJARI + 18 / FPS, EZ.out);
  const pb = prog(t, W("dan") - 0.07, W("dan") + 0.1, EZ.inOut);
  const click = prog(t, T_KIRIM, T_KIRIM + 0.6, EZ.out);
  const up = prog(t, LAUNCH[0], T_LAND, EZ.inOut);
  const ceo = cursorPos(0, t);
  const zt = { x: ceo.x + 11, y: ceo.y + 15 };
  let cx = lerp(follow.cx, lerp(960, 1000, click), pb);
  let cy = lerp(follow.cy, lerp(540, 500, click), pb);
  let s = lerp(follow.s * c01, 1 + 0.06 * click, pb);
  // X01 tilt ke ruang kerja
  cx = lerp(cx, 960, up);
  cy = lerp(cy, Y0 + 540, up);
  s = lerp(s, 1, up);
  // C20 cut zoom ke dokumen saat CEO mulai menulis (momentum 6 f) → C15 patah ke wide saat balasan CEO muncul
  const mom = prog(t, T_STREAM[0], T_STREAM[0] + 6 / FPS, EZ.out);
  const wide = prog(t, T_REPLY - 0.03, T_REPLY + 0.14, EZ.inOut);
  const closeK = (t >= T_STREAM[0] ? 1 : 0) * (1 - wide);
  cx = lerp(cx, 960, closeK);
  cy = lerp(cy, Y0 + 330, closeK);
  s = lerp(s, 1.55 + 0.06 * mom, closeK);
  s *= 1 + 0.02 * prog(t, T_REPLY + 0.14, T_FOLLOW, EZ.inOut);
  // C02 dorong ke kursor CEO → X04 zoom-through
  const fol = prog(t, T_FOLLOW, T_ZOOM, EZ.inOut);
  cx = lerp(cx, 1150, fol);
  cy = lerp(cy, Y0 + 480, fol);
  s *= 1 + 0.08 * fol;
  const zoom = prog(t, T_ZOOM, P3.end, EZ.acc);
  const zc = prog(t, T_ZOOM, T_ZOOM + 0.3, EZ.inOut); // pusatkan ke kursor CEO dulu, skala menyusul (acc)
  cx = lerp(cx, zt.x, zc);
  cy = lerp(cy, zt.y, zc);
  s = s * Math.pow(36, zoom);
  const vUp = up > 0 && up < 1 ? Math.sin(up * Math.PI) : 0;
  const camBlur = vUp * 3 + zoom * 10 + Math.sin(pb * Math.PI) * 2.5 + Math.sin(wide * Math.PI) * 2.5;

  // ── klik tombol kirim
  const press = t >= T_KIRIM ? 1 - 0.1 * (1 - prog(t, T_KIRIM, T_KIRIM + 0.2, EZ.out)) : 1;
  const ring = prog(t, T_KIRIM, T_KIRIM + 0.5, EZ.out);
  // panah mouse pengguna: meluncur ke tombol kirim selama kamera mundur, mendarat sebelum klik
  const mouseK = prog(t, T_MENULIS + 0.35, T_KIRIM - 0.04, EZ.inOut);
  const mouse = { x: lerp(1840, BTN.x + 8, mouseK), y: lerp(1010, BTN.y + 6, mouseK) };

  // caret: berkedip saat diam, padat saat mengetik
  const typing = MSG.some((m) => t >= m.at && t < m.at + 0.35);
  const caretOn = typing || Math.floor((t - P1.start) / 0.5) % 2 === 0;

  const renderLine = (line: 0 | 1) => {
    const items = MSG.map((m, i) => ({ ...m, i })).filter((m) => m.line === line && t >= m.at);
    return (
      <div style={{ height: 70, whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
        {items.map((m, j) => {
          const n = Math.max(1, Math.ceil(m.w.length * Math.min(1, ((t - m.at) * FPS + 1) / 3)));
          return (
            <span key={m.i} style={{ fontWeight: m.bold ? 600 : 400 }}>
              {j > 0 ? " " : ""}{m.w.slice(0, n)}
            </span>
          );
        })}
        {((lastIdx < 0 && line === 0) || (lastIdx >= 0 && MSG[lastIdx].line === line)) && (
          <span style={{ display: "inline-block", width: 4, height: 64, marginLeft: 4, background: "var(--electric)", opacity: caretOn ? 1 : 0, borderRadius: 2 }} />
        )}
      </div>
    );
  };

  return (
    <Scene start={P1.start} end={P3.end} name="03a-1–03b Agent kerja">
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(180deg, var(--sky-300) 0%, var(--sky-100) 38%, var(--sky-50) 70%, var(--sb-white) 100%)" }}>
        <Camera scale={s} ox={cx} oy={cy} x={960 - cx} y={540 - cy} blur={camBlur}>
          {/* ─────────── ruang kerja bersama (03b) ─────────── */}
          {t >= LAUNCH[0] && <Workspace t={t} />}

          {/* ─────────── composer (03a-1 / 03a-2) ─────────── */}
          {t < T_LAND + 0.1 && (
            <div style={{ position: "absolute", left: 120, top: 500, width: 1680, height: 460, padding: 16, display: "flex", flexDirection: "column", gap: 20,
              background: "color-mix(in srgb, #fff 55%, transparent)", border: "2px solid color-mix(in srgb, #fff 85%, transparent)", borderRadius: 72,
              boxShadow: "0 60px 140px color-mix(in srgb, var(--electric) 12%, transparent)" }}>
              <div style={{ height: 272, background: "#fff", borderRadius: 60, padding: "50px 64px", fontFamily: "Inter", fontSize: 52, letterSpacing: -0.5, color: "var(--sb-ink)" }}>
                {renderLine(0)}
                {renderLine(1)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "0 32px" }}>
                <div style={{ width: 88, height: 88, borderRadius: 999, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sb-ink)" }}>
                  <Icon d={I_PLUS} size={40} />
                </div>
                <Chip pad="0 18px 0 16px">
                  <AgentFace agent={AGENTS[0]} size={56} shadow={false} />
                  Agent
                </Chip>
                <Chip>
                  <span style={{ color: "var(--sb-ink-muted)" }}><Icon d={I_FOLDER} size={32} sw={1.8} /></span>
                  Bisnis-ku
                </Chip>
                <Chip>
                  <span style={{ color: "var(--sb-ink-muted)" }}><Icon d={I_KEY} size={32} sw={1.8} /></span>
                  Akses penuh
                </Chip>
                <div style={{ marginLeft: "auto", width: 88, height: 88, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sb-ink-muted)" }}>
                  <Icon d={I_MIC} size={40} sw={1.8} />
                </div>
                <div style={{ position: "relative", width: 104, height: 104 }}>
                  <div style={{ position: "absolute", inset: -20 - 26 * ring, borderRadius: 999, background: `color-mix(in srgb, var(--electric) ${Math.round(14 * (1 - ring))}%, transparent)` }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--sb-ink)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${press})`,
                    boxShadow: "0 0 0 20px color-mix(in srgb, var(--electric) 14%, transparent)" }}>
                    <Icon d={I_UP} size={48} color="#fff" sw={2.4} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* jejak titik dari tombol ke tiap agent */}
          {t >= T_KIRIM && t < T_LAND && (
            <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1920} height={1080}>
              {SPAWN.map((sp, i) => {
                const p = prog(t, T_AG[i], T_AG[i] + 0.32, EZ.out);
                const fade = 1 - prog(t, T_AG[i] + 0.35, T_AG[i] + 0.8, EZ.inOut);
                if (p <= 0 || fade <= 0) return null;
                const dots = [];
                for (let d = 0.06; d <= p - 0.12; d += 0.045) {
                  const q = bez(BTN, sp, d);
                  dots.push(<circle key={d} cx={q.x} cy={q.y} r={3.2} fill="#fff" opacity={0.9 * fade} />);
                }
                return <g key={i}>{dots}</g>;
              })}
            </svg>
          )}

          {/* agent: lompat dari tombol (03a-2) → terbang ke ruang kerja jadi kursor bernama (X01) */}
          {AGENTS.map((ag, i) => {
            if (t < T_AG[i]) return null;
            const sp = SPAWN[i];
            const p = prog(t, T_AG[i], T_AG[i] + 0.32, EZ.out);
            const pos0 = bez(BTN, sp, p);
            const bob = Math.sin((t - T_AG[i]) * 2 * Math.PI * 0.7 + i) * 6 * prog(t, T_AG[i] + 0.25, T_AG[i] + 0.6);
            const popS = 0.15 + 0.85 * p + 0.05 * Math.sin(p * Math.PI);
            const fp = prog(t, LAUNCH[i], LAUNCH[i] + FLY, EZ.inOut);
            const arrive = LAUNCH[i] + FLY;
            const tip = cursorPos(i, Math.max(t, arrive));
            const dest = { x: tip.x + FACE_OFF.x, y: tip.y + FACE_OFF.y };
            const x = lerp(pos0.x, dest.x, fp);
            const y = lerp(pos0.y + bob, dest.y, fp);
            const size = sp.s * popS * lerp(1, 40 / sp.s, fp);
            const blinkT = (t - T_AG[i] - 0.9 - i * 0.2) % 2.6;
            const blink = blinkT > 0 && blinkT < 0.12 ? Math.sin((blinkT / 0.12) * Math.PI) : 0;
            if (t >= arrive) {
              const pk = prog(t, arrive, arrive + 0.2, EZ.out);
              const cur = cursorPos(i, t);
              return <NamedCursor key={ag.key} agent={ag} x={cur.x} y={cur.y} scale={0.85 + 0.15 * pk} pill={0.7 + 0.3 * pk} />;
            }
            return (
              <div key={ag.key} style={{ position: "absolute", left: x - size / 2, top: y - size / 2, zIndex: 5 - i }}>
                <AgentFace agent={ag} size={size} blink={blink} />
              </div>
            );
          })}

          {/* panah mouse pengguna di tombol kirim */}
          {t >= T_MENULIS + 0.35 && t < T_LAND && (
            <div style={{ position: "absolute", left: mouse.x - 6, top: mouse.y - 4, transform: `scale(${t >= T_KIRIM && t < T_KIRIM + 0.12 ? 0.9 : 1})`, transformOrigin: "6px 4px" }}>
              <Arrow size={60} color="var(--sb-ink)" />
            </div>
          )}
        </Camera>
        <Grain opacity={0.035} />
      </AbsoluteFill>
    </Scene>
  );
};

/** Kurva lompatan (bezier kuadrat) dari tombol ke titik agent, melengkung ke atas. */
const bez = (a: { x: number; y: number }, b: { x: number; y: number }, k: number) => {
  const c = { x: (a.x + b.x) / 2 + 60, y: Math.min(a.y, b.y) - 160 };
  const u = 1 - k;
  return { x: u * u * a.x + 2 * u * k * c.x + k * k * b.x, y: u * u * a.y + 2 * u * k * c.y + k * k * b.y };
};

/** Ruang kerja bersama 03b (ruang dunia, Y0 = −1080): dokumen Bisnis-ku + balasan CEO Agent yang membagi kerja. */
const Workspace: React.FC<{ t: number }> = ({ t }) => {
  const n = Math.floor(STREAM.length * prog(t, T_STREAM[0], T_STREAM[1], (x) => x));
  const writing = t >= T_STREAM[0] && t < T_STREAM[1] + 0.3;
  const sel = prog(t, T_STREAM[0], T_STREAM[1], (x) => x);
  const rp = prog(t, T_REPLY, T_REPLY + 0.4, EZ.out);
  const sent = prog(t, T_SEND_CEO - 0.25, T_SEND_CEO, EZ.out);
  const card: React.CSSProperties = { position: "absolute", left: 400, width: 1120, background: "#fff", border: "2px solid var(--sky-300)", borderRadius: 44 };
  const mention = (k: number, txt: string) => <span style={{ color: AGENTS[k].label, fontWeight: 600 }}>{txt}</span>;
  return (
    <>
      {/* jendela dokumen bersama */}
      <div style={{ ...card, top: Y0 + 140, height: 420, background: "color-mix(in srgb, #fff 72%, transparent)", padding: 44 }}>
        <div style={{ display: "flex", gap: 16 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 20, height: 20, borderRadius: 99, background: "var(--sky-300)" }} />)}
        </div>
        <div style={{ position: "absolute", left: 44, top: 96, fontFamily: "Inter", fontWeight: 600, fontSize: 38, letterSpacing: -0.6, color: "var(--sb-ink)" }}>
          Laporan penjualan minggu ini
        </div>
        <div style={{ position: "absolute", left: 44, top: 160, height: 44, display: "flex", alignItems: "center", fontFamily: "Inter", fontSize: 32, color: "var(--sb-ink)", whiteSpace: "nowrap" }}>
          <span style={{ backgroundImage: "linear-gradient(90deg, color-mix(in srgb, var(--agent-ceo-a) 35%, transparent), color-mix(in srgb, var(--agent-ceo-b) 22%, transparent))",
            backgroundSize: `${writing ? 100 : 0}% 100%`, backgroundRepeat: "no-repeat", borderRadius: 6 }}>{STREAM.slice(0, n)}</span>
          {writing && <span style={{ display: "inline-block", width: 3, height: 38, marginLeft: 2, background: "var(--agent-ceo-b)", opacity: sel < 1 || Math.floor(t * 4) % 2 === 0 ? 1 : 0 }} />}
        </div>
        {/* permintaan pengguna ke CEO Agent */}
        <div style={{ position: "absolute", left: 124, top: 252, width: 960, height: 112, display: "flex", alignItems: "center", gap: 24, padding: "0 16px 0 32px",
          background: "#fff", border: "2px solid var(--sky-300)", borderRadius: 32, opacity: 1 - 0.35 * sent }}>
          <div style={{ flex: 1, fontFamily: "Inter", fontSize: 34, color: "var(--sb-ink)", whiteSpace: "nowrap" }}>
            Rangkum penjualan minggu ini <span style={{ color: "var(--agent-ceo-b)", fontWeight: 600 }}>@CEO Agent</span>
          </div>
          <div style={{ width: 76, height: 76, borderRadius: 20, background: "var(--sb-ink)", display: "flex", alignItems: "center", justifyContent: "center",
            transform: `scale(${t >= T_SEND_CEO - 0.25 && t < T_SEND_CEO - 0.1 ? 0.9 : 1})` }}>
            <Icon d={I_UP} size={32} color="#fff" sw={2.4} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 800, top: Y0 + 112, padding: "8px 28px", background: "#fff", border: "2px solid var(--sky-300)", borderRadius: 999,
        fontFamily: "Inter", fontWeight: 500, fontSize: 30, color: "var(--sb-ink)" }}>
        Bisnis-ku · Oktober
      </div>

      {/* balasan CEO Agent: membagi kerja ke agent lain (notif lembut) */}
      {t >= T_REPLY && (
        <div style={{ ...card, top: Y0 + 600, padding: 40, display: "flex", flexDirection: "column", gap: 20, opacity: Math.min(1, rp * 1.6), transform: `translateY(${(1 - rp) * 50}px)`,
          boxShadow: "0 48px 100px color-mix(in srgb, var(--electric) 12%, transparent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <AgentFace agent={AGENTS[0]} size={80} shadow={false} />
            <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 34, color: "var(--sb-ink)" }}>CEO Agent</span>
            <span style={{ fontFamily: "Inter", fontSize: 30, color: "var(--sb-ink-muted)" }}>baru saja</span>
            <span style={{ marginLeft: "auto", color: "var(--sb-ink)" }}><Icon d={I_MORE} size={40} /></span>
          </div>
          <div style={{ fontFamily: "Inter", fontSize: 38, lineHeight: 1.4, color: "var(--sb-ink)", letterSpacing: -0.3 }}>
            Laporan siap. {mention(1, "CS Agent")} balas pelanggan, {mention(2, "Ops Agent")} cek stok, {mention(3, "Editor Agent")} siapkan konten.
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            {[1, 2, 3].map((k) => (
              <div key={k} style={{ width: BAR_W, height: 24, borderRadius: 99, background: "var(--sky-100)", overflow: "hidden" }}>
                <div style={{ width: `${Math.max(6, fillOf(k - 1, t) * 100)}%`, height: "100%", borderRadius: 99, backgroundImage: `linear-gradient(90deg, ${AGENTS[k].a}, ${AGENTS[k].b})` }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export const SCENE = { Component: S03a_AgentKerja, covers: ["03a-1", "03a-2", "03b"] };
