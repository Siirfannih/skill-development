// v2 — mengikuti referensi "This is my boss": tanpa jeda, caption per kata, 3 lapis + kamera tembus teks,
// grade teal/hangat + grain, whip blur antar shot. Waktu = detik dialog v3 (vo/v3/timing.json).
import React from "react";
import { AbsoluteFill, Freeze, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { Clawd, EASE, FPS, Glass, H, OFF, W, clamp, fd, headAt, inter, pop, poppins } from "./lib";
import captions from "../public/data/captions.json";
import timing from "../public/data/timing.json";

const serif = loadSerif("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const fa = (s: number) => Math.round((s + OFF) * FPS);
type Mark = { item: string; start: number; end: number; type: string };
const marks = (timing as { marks: Mark[] }).marks;
const M = (item: string, n = 1) => marks.filter((m) => m.item === item)[n - 1];
type Wd = { w: string; s: number; e: number };
const words: Wd[] = (captions as { words: Wd[] }[]).flatMap((c) => c.words);
const at = (w: string, n = 1) => words.filter((x) => x.w.toLowerCase().replace(/[^a-z0-9-]/g, "") === w)[n - 1]?.s ?? 0;
export const TOTAL2 = fa(78.95) + fd(2.2);

// ---------- lapisan dasar ----------
type Seg = [number, number, number];
const clipSegs = (item: string, parts: [number, number][]): Seg[] => {
  const m = M(item);
  let t = m.start;
  return parts.map(([a, b]) => {
    const s: Seg = [fa(t), Math.round((b - a) * FPS), a];
    t += b - a;
    return s;
  });
};
const C1 = clipSegs("C1", [[3.28, 6.1]]);
const C2 = clipSegs("C2", [[7.62, 11.45]]);
const C3 = clipSegs("C3", [[14.84, 16.84], [18.08, 19.95]]);
const C4 = clipSegs("C4", [[26.78, 35.4]]);
const C5 = clipSegs("C5", [[39.56, 43.9], [44.85, 46.2]]);
const C6 = clipSegs("C6", [[49.3, 50.72], [51.4, 51.6], [52.15, 54.7]]);
const srcAt = (segs: Seg[], f: number) => {
  for (const [a, d, s] of segs) if (f >= a && f < a + d) return s + (f - a) / FPS;
  return segs[0][2];
};
const Vid: React.FC<{ segs: Seg[]; cut?: boolean; base: number; style?: React.CSSProperties }> = ({ segs, cut, base, style }) => (
  <>
    {segs.map(([a, d, s], i) => (
      <Sequence key={i} from={a - base} durationInFrames={d} layout="none">
        <OffthreadVideo src={staticFile(cut ? "media/irfan_cutout.webm" : "media/talkinghead.mp4")} transparent={cut} muted startFrom={Math.round(s * FPS)} style={{ position: "absolute", width: W, height: H, ...style }} />
      </Sequence>
    ))}
  </>
);
/** Cutout Irfan beku (PNG RGBA, diekstrak dari video cutout). */
const CutoutStill: React.FC<{ src: number }> = ({ src }) => <Img src={staticFile(`img/cut/c_${src.toFixed(1)}.png`)} style={{ position: "absolute", width: W, height: H }} />;
const Still: React.FC<{ src: number; style?: React.CSSProperties }> = ({ src, style }) => (
  <Freeze frame={Math.round(src * FPS)}>
    <OffthreadVideo src={staticFile("media/talkinghead.mp4")} muted style={{ position: "absolute", width: W, height: H, ...style }} />
  </Freeze>
);

/** Kamera 3 lapis: latar (lambat), tengah (sedang), depan (cepat). p = 0..1 progres dorong kamera. */
const Depth: React.FC<{ dur: number; push?: number; bg: React.ReactNode; mid?: React.ReactNode; front?: React.ReactNode; origin?: string }> = ({ dur, push = 1, bg, mid, front, origin = "50% 45%" }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, dur], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(1.04 + 0.05 * p * push), transformOrigin: origin }}>{bg}</AbsoluteFill>
      {mid ? <AbsoluteFill style={{ scale: String(1 + 0.12 * p * push), transformOrigin: origin }}>{mid}</AbsoluteFill> : null}
      {front ? <AbsoluteFill style={{ scale: String(1 + 0.35 * p * push), transformOrigin: origin }}>{front}</AbsoluteFill> : null}
    </AbsoluteFill>
  );
};

/** Kata raksasa yang dilewati kamera: membesar ke arah penonton + blur + hilang. */
const FlyThrough: React.FC<{ text: string; hold: number; size?: number; font?: string; color?: string; italic?: boolean }> = ({ text, hold, size = 260, font = serif, color = "#f4f1ea" }) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [0, 6], [0, 1], { ...clamp, easing: EASE });
  const fly = interpolate(f, [hold, hold + 9], [0, 1], { ...clamp, easing: (t) => t * t });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: font, fontSize: size, color, letterSpacing: font === serif ? "-0.01em" : "-0.04em", fontWeight: font === serif ? 400 : 900, scale: String((0.92 + 0.08 * inP) * (1 + fly * 5)), filter: `blur(${fly * 26}px)`, opacity: inP * (1 - fly), whiteSpace: "nowrap" }}>{text}</div>
    </AbsoluteFill>
  );
};

/** Whip: blur arah horizontal + geser di 5 frame pertama scene. */
const Whip: React.FC<{ children: React.ReactNode; dir?: 1 | -1 }> = ({ children, dir = 1 }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 5], [1, 0], { ...clamp, easing: EASE });
  return <AbsoluteFill style={{ translate: `${dir * k * 260}px 0px`, filter: k > 0.02 ? `blur(${k * 18}px)` : undefined }}>{children}</AbsoluteFill>;
};

// ---------- grade global ----------
const Grade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ background: "#0f5560", mixBlendMode: "soft-light", opacity: 0.22 }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,170,110,0.10), transparent 70%)", mixBlendMode: "screen" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 60%, rgba(0,0,0,0.32) 100%)" }} />
      <AbsoluteFill style={{ opacity: 0.09, mixBlendMode: "overlay" }}>
        <svg width={W} height={H}>
          <filter id="g">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 12} />
          </filter>
          <rect width={W} height={H} filter="url(#g)" />
        </svg>
      </AbsoluteFill>
    </>
  );
};

// ---------- caption per kata ----------
const ACCENT = new Set(["irfan.", "bosku.", "taruhan", "ngaku", "parah…", "aneh", "menjijikan", "sepanjang", "takutin.", "proper.", "estetik.", "serahin.", "aku.", "storyboard,", "bottleneck.", "kejelasan.", "nyebelin.", "menit,", "layak", "taruhannya.", "challenge", "20", "effort", "waktu.", "mikir.", "ngedit.", "pertama.", "resign,", "project-nya.", "nggak?", "males", "video", "kali,"]);
type Layout = { kind: "row" | "swap" | "box"; y: number; x?: number; size?: number };
// Pola dari referensi: baris menyebar kiri→kanan, slot kata berganti, label kotak navy. Posisi berpindah tiap frasa.
const LAYOUT: Record<string, Layout[]> = {
  s1: [{ kind: "row", y: 0.12 }, { kind: "row", y: 0.82 }],
  s2: [{ kind: "swap", y: 0.5, x: 0.3 }],
  C1: [{ kind: "swap", y: 0.62, x: 0.28, size: 72 }, { kind: "swap", y: 0.62, x: 0.28, size: 72 }],
  s3: [{ kind: "swap", y: 0.78, x: 0.5 }],
  C2: [{ kind: "box", y: 0.7, x: 0.08 }, { kind: "swap", y: 0.72, x: 0.3, size: 80 }],
  s4: [{ kind: "row", y: 0.86 }, { kind: "swap", y: 0.18, x: 0.5 }],
  C3: [{ kind: "box", y: 0.7, x: 0.08 }, { kind: "box", y: 0.7, x: 0.08 }],
  s5: [{ kind: "row", y: 0.12 }, { kind: "swap", y: 0.5, x: 0.22 }, { kind: "row", y: 0.86 }, { kind: "row", y: 0.12 }],
  C4: [{ kind: "swap", y: 0.84, x: 0.5, size: 70 }, { kind: "swap", y: 0.84, x: 0.5, size: 70 }],
  s6: [{ kind: "swap", y: 0.78, x: 0.5 }, { kind: "row", y: 0.86 }, { kind: "row", y: 0.14 }, { kind: "swap", y: 0.5, x: 0.25 }, { kind: "swap", y: 0.5, x: 0.5 }],
  C5: [{ kind: "box", y: 0.72, x: 0.08 }],
  C6: [{ kind: "swap", y: 0.72, x: 0.3, size: 76 }, { kind: "box", y: 0.72, x: 0.08 }],
  s7: [{ kind: "row", y: 0.12 }, { kind: "row", y: 0.12 }, { kind: "row", y: 0.86 }, { kind: "swap", y: 0.2, x: 0.5 }, { kind: "row", y: 0.12 }, { kind: "row", y: 0.12 }, { kind: "row", y: 0.1 }, { kind: "row", y: 0.82 }],
};
// Rentang (detik dialog) tanpa caption karena ada teks pahlawan / kartu.
const HIDE: [number, number][] = [[51.45, 52.55]];
type Phrase = { item: string; words: Wd[]; layout: Layout; end: number };
const phrases: Phrase[] = (() => {
  const out: Phrase[] = [];
  for (const c of captions as { item: string; end: number; words: Wd[] }[]) {
    const itemEnd = c.end;
    const ls = LAYOUT[c.item] ?? [{ kind: "row", y: 0.85 }];
    let cur: Wd[] = [];
    let k = 0;
    c.words.forEach((w, i) => {
      cur.push(w);
      const endP = /[.,…?]$/.test(w.w) || i === c.words.length - 1 || cur.length >= 7;
      if (endP) {
        out.push({ item: c.item, words: cur, layout: ls[Math.min(k, ls.length - 1)], end: itemEnd + 0.05 });
        cur = [];
        k++;
      }
    });
  }
  out.forEach((p, i) => (p.end = Math.min(p.end, i + 1 < out.length ? Math.min(out[i + 1].words[0].s, p.words[p.words.length - 1].e + 1.2) : p.words[p.words.length - 1].e + 1.5)));
  out[out.length - 1].end = 999;
  return out;
})();

const Word: React.FC<{ w: Wd; size: number; f: number; accent: boolean; box?: boolean }> = ({ w, size, f, accent, box }) => {
  const t = (f / FPS) - OFF;
  const p = interpolate(t, [w.s + 0.02, w.s + 0.15], [0, 1], { ...clamp, easing: EASE });
  const txt = w.w.replace(/…$/, "…");
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: accent ? serif : inter,
        fontStyle: accent ? "italic" : "normal",
        fontWeight: accent ? 400 : 700,
        fontSize: accent ? size * 1.18 : size,
        letterSpacing: accent ? "0" : "-0.025em",
        color: "#ffffff",
        opacity: p,
        translate: `0 ${(1 - p) * size * 0.4}px`,
        scale: String(0.85 + 0.15 * p),
        filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
        textShadow: box ? undefined : "0 2px 18px rgba(0,0,0,0.35)",
        background: box ? "#1b2cc4" : undefined,
        padding: box ? "4px 16px 8px" : undefined,
        borderRadius: box ? 6 : undefined,
        whiteSpace: "nowrap",
      }}
    >
      {txt}
    </span>
  );
};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS - OFF;
  if (HIDE.some(([a, b]) => t >= a && t < b)) return null;
  const ph = phrases.find((p) => t >= p.words[0].s - 0.02 && t < p.end);
  if (!ph) return null;
  const L = ph.layout;
  const size = L.size ?? (L.kind === "row" ? 62 : 92);
  const exit = interpolate(t, [ph.end - 0.12, ph.end], [0, 1], clamp);
  const wrap: React.CSSProperties = { position: "absolute", top: L.y * H, translate: `0 -50%`, opacity: 1 - exit, filter: exit > 0 ? `blur(${exit * 8}px)` : undefined };
  if (L.kind === "row") {
    const two = ph.words.length > 5;
    const rows = two ? [ph.words.slice(0, Math.ceil(ph.words.length / 2)), ph.words.slice(Math.ceil(ph.words.length / 2))] : [ph.words];
    return (
      <div style={{ ...wrap, left: 110, right: 110 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: i ? 8 : 0 }}>
            {r.map((w, j) => (
              <Word key={j} w={w} size={size} f={f} accent={ACCENT.has(w.w.toLowerCase())} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  // swap / box: hanya 1–2 kata terakhir yang sudah diucapkan
  const said = ph.words.filter((w) => t >= w.s - 0.02);
  const shown = said.slice(-2);
  return (
    <div style={{ ...wrap, left: (L.x ?? 0.5) * W, translate: L.kind === "box" ? "0 -50%" : "-50% -50%", display: "flex", gap: 18, alignItems: "baseline" }}>
      {shown.map((w, j) => (
        <Word key={w.s + j} w={w} size={size} f={f} accent={L.kind !== "box" && ACCENT.has(w.w.toLowerCase())} box={L.kind === "box"} />
      ))}
    </div>
  );
};

// ---------- latar / plate ----------
const Plate: React.FC<{ kind: "face" | "dark" | "lamp"; src?: number; blur?: number; dim?: number }> = ({ kind, src = 4, blur = 10, dim: dim0 = 0.55 }) => (
  <AbsoluteFill style={{ filter: `blur(${blur}px) brightness(${Math.min(0.85, dim0 + 0.18)})`, background: "#000" }}>
    {kind === "face" ? <Still src={src} /> : null}
    {kind === "dark" ? (
      <Freeze frame={fd(5)}>
        <OffthreadVideo src={staticFile("media/broll_akhir_gelap.mp4")} muted style={{ width: W, height: H }} />
      </Freeze>
    ) : null}
    {kind === "lamp" ? <Img src={staticFile("img/lamp_freeze.png")} style={{ width: W, height: H }} /> : null}
  </AbsoluteFill>
);

// ================= adegan =================
const b = (s: number) => fa(s);

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const toPortrait = b(at("dia")) - 2;
  const clockIn = b(at("jam"));
  const p = interpolate(f, [toPortrait, toPortrait + 10], [0, 1], { ...clamp, easing: EASE });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={fd(1.0)} layout="none">
        <OffthreadVideo src={staticFile("media/broll_lampu_awal.mp4")} startFrom={fd(4.95)} muted style={{ width: W, height: H }} />
      </Sequence>
      <Sequence from={fd(1.0)} durationInFrames={toPortrait - fd(1.0)} layout="none">
        <Img src={staticFile("img/lamp_freeze.png")} style={{ width: W, height: H, scale: String(interpolate(f, [fd(1.0), toPortrait], [1, 1.06], clamp)) }} />
      </Sequence>
      <Sequence from={toPortrait} durationInFrames={clockIn - toPortrait} layout="none">
        <Whip>
          <Depth
            dur={clockIn - toPortrait}
            bg={<AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 70% at 62% 45%, #2f5bff 0%, #10206e 40%, #04050a 80%)" }} />}
            mid={
              <>
                <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", fontFamily: inter, fontWeight: 800, fontSize: 420, letterSpacing: "-0.06em", color: "#f4f1ea", opacity: p }}>Bosku.</div>
                <Img src={staticFile("img/lamp_cutout.png")} style={{ position: "absolute", width: 1560, left: 360, top: 200, opacity: p, translate: `${(1 - p) * 140}px 0px` }} />
              </>
            }
          />
        </Whip>
      </Sequence>
      <Sequence from={clockIn} durationInFrames={b(M("taruhan").start) - clockIn} layout="none">
        <Whip dir={-1}>
          <Depth
            dur={b(M("taruhan").start) - clockIn}
            bg={<Plate kind="dark" blur={4} dim={0.8} />}
            mid={<Img src={staticFile("img/clock_cut.png")} style={{ position: "absolute", width: 1100, left: 410, top: 90, rotate: `${Math.sin(f / 2) * (f - clockIn < 12 ? 3 : 0.4)}deg` }} />}
          />
        </Whip>
      </Sequence>
    </AbsoluteFill>
  );
};

const FaceShot: React.FC<{ segs: Seg[]; base: number; dur: number; zoom?: [number, number]; origin?: string; dir?: 1 | -1 }> = ({ segs, base, dur, zoom = [1.04, 1.12], origin = "55% 30%", dir = 1 }) => {
  const f = useCurrentFrame();
  return (
    <Whip dir={dir}>
      <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
        <AbsoluteFill style={{ scale: String(interpolate(f, [0, dur], zoom, clamp)), transformOrigin: origin }}>
          <Vid segs={segs} base={base} />
        </AbsoluteFill>
      </AbsoluteFill>
    </Whip>
  );
};

/** Irfan cutout di depan, latar = frame yang sama di-blur; teks pahlawan di BELAKANG kepala (gaya sampul majalah). */
const Cover: React.FC<{ src: number; dur: number; word: string; color?: string }> = ({ src, dur, word, color = "#f4f1ea" }) => {
  const f = useCurrentFrame();
  const p = pop(f, 0, 10);
  return (
    <Depth
      dur={dur}
      bg={<Plate kind="face" src={src} blur={14} dim={0.45} />}
      mid={
        <>
          <div style={{ position: "absolute", left: 90, top: 330, fontFamily: serif, fontStyle: "italic", fontSize: 340, lineHeight: 1, color, opacity: p, scale: String(0.9 + 0.1 * p), transformOrigin: "0 50%" }}>{word}</div>
          <div style={{ position: "absolute", width: W, height: H, translate: "380px 0px" }}>
            <CutoutStill src={src} />
          </div>
        </>
      }
    />
  );
};

const Faces: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const list = [4.2, 12.3, 31.9, 45.5, 22.0];
  return (
    <Depth
      dur={dur}
      bg={<Plate kind="face" src={10.8} blur={16} dim={0.35} />}
      mid={
        <>
          {list.map((src, i) => {
            const p = pop(f, i * 5, 10);
            const h = headAt(src);
            const sc = 0.5;
            return (
              <div key={i} style={{ position: "absolute", width: W, height: H, left: 40 + i * 360 - h.cx * sc + 200, top: 250 + (i % 2) * 90, scale: String(sc * (0.8 + 0.2 * p)), transformOrigin: "0 0", opacity: p, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 8%, #000 60%, transparent 85%)" }}>
                <CutoutStill src={src} />
              </div>
            );
          })}
        </>
      }
    />
  );
};

const Bottleneck: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = f + base;
  const h = headAt(srcAt(C4, g));
  const rot = f * 0.55;
  const rx = Math.max(560, h.w * 1.05);
  const ry = rx * 0.3;
  const cy = h.cy + 70;
  const label = "bottleneck · ".repeat(5);
  const ring = (front: boolean) => (
    <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, filter: front ? "blur(1.2px)" : "blur(2.5px) brightness(0.75)" }}>
      <defs>
        <path id={`bn${front ? "f" : "b"}`} d={`M ${h.cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`} />
        <clipPath id={`bc${front ? "f" : "b"}`}>
          <rect x={0} y={front ? cy : 0} width={W} height={front ? H : cy} />
        </clipPath>
      </defs>
      <g clipPath={`url(#bc${front ? "f" : "b"})`}>
        <text fontFamily={inter} fontWeight={800} fontSize={front ? 132 : 104} fill="#f4f1ea" letterSpacing={-2}>
          <textPath href={`#bn${front ? "f" : "b"}`} startOffset={`${-(rot % 50)}%`}>
            {label}
            {label}
          </textPath>
        </text>
      </g>
    </svg>
  );
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ filter: "blur(12px) brightness(0.4)", scale: "1.08" }}>
        <Vid segs={C4} base={base} />
      </AbsoluteFill>
      {ring(false)}
      <Vid segs={C4} base={base} cut />
      {ring(true)}
    </AbsoluteFill>
  );
};

const Backlog: React.FC = () => {
  const f = useCurrentFrame();
  const takes = [3.3, 8.0, 15.0, 24.0, 33.0, 52.0];
  return (
    <Depth
      dur={70}
      bg={<Plate kind="face" src={30} blur={18} dim={0.5} />}
      mid={
        <>
          <Glass dark={false} style={{ position: "absolute", left: 260, top: 130, width: 1400, height: 520, padding: 40 }}>
            <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 36, color: "#111" }}>Video · belum diedit</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36, marginTop: 30 }}>
              {takes.map((t, i) => {
                const p = pop(f, i * 3, 10);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, opacity: p, scale: String(0.8 + 0.2 * p) }}>
                    <div style={{ width: 210, height: 118, borderRadius: 12, overflow: "hidden" }}>
                      <Freeze frame={fd(t)}>
                        <OffthreadVideo src={staticFile("media/talkinghead.mp4")} muted style={{ width: 210, height: 118 }} />
                      </Freeze>
                    </div>
                    <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 28, color: "#222" }}>Take 0{i + 1}.mp4</div>
                  </div>
                );
              })}
            </div>
          </Glass>
          <Glass dark={false} style={{ position: "absolute", left: 260, top: 700, width: 1400, height: 190, padding: 28 }}>
            <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 26, color: "#333" }}>Timeline · kosong</div>
            <div style={{ marginTop: 18, height: 86, borderRadius: 14, border: "2px dashed rgba(0,0,0,0.2)" }} />
          </Glass>
        </>
      }
    />
  );
};

const PROMPT = "Editin video ini biar keren kayak editing proffesional dong";
const Handoff: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (s: number) => fa(s) - base;
  const typed = Math.floor(interpolate(f, [g(at("jadi")), g(at("serahin"))], [0, PROMPT.length], clamp));
  const send = g(at("serahin")) + 4;
  const fly = interpolate(f, [send, g(at("ke"))], [0, 1], { ...clamp, easing: EASE });
  const keAku = g(at("ke"));
  const out = g(at("aku", 5));
  const tools = g(at("nyuruh"));
  const toolList: [string, string | null, string, number][] = [
    ["ChatGPT", "img/chatgpt.png", "nyusun storyboard", at("chatgpt")],
    ["Gemini", "img/gemini.png", "ngritik", at("gemini")],
    ["ElevenLabs", null, "ngisi suaranya", at("elevenlabs")],
  ];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ filter: "blur(14px) brightness(0.4)", scale: "1.08" }}>
        <Plate kind="lamp" blur={0} dim={1} />
      </AbsoluteFill>
      {f < keAku ? (
        <Depth
          dur={keAku}
          bg={<AbsoluteFill />}
          mid={
            <>
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: interpolate(f, [send, send + 8], [1, 0], clamp) }}>
                <Glass style={{ width: 1180, padding: "34px 40px" }}>
                  <div style={{ display: "inline-flex", padding: "10px 18px", borderRadius: 14, background: "rgba(255,255,255,0.14)", fontFamily: inter, fontSize: 26, color: "#fff" }}>▶ video.mp4</div>
                  <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 48, color: "#fff", marginTop: 22, minHeight: 116, lineHeight: 1.2 }}>
                    {PROMPT.slice(0, typed)}
                    <span style={{ opacity: f % 16 < 8 ? 1 : 0 }}>|</span>
                  </div>
                </Glass>
              </AbsoluteFill>
              {f >= send ? (
                <div style={{ position: "absolute", left: interpolate(fly, [0, 1], [560, 1150]), top: interpolate(fly, [0, 1], [380, 430]), width: 400, height: 225, borderRadius: 18, overflow: "hidden", scale: String(1 - fly * 0.6), boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                  <Freeze frame={fd(3.3)}>
                    <OffthreadVideo src={staticFile("media/talkinghead.mp4")} muted style={{ width: 400, height: 225 }} />
                  </Freeze>
                </div>
              ) : null}
            </>
          }
        />
      ) : null}
      {f >= keAku && f < out ? (
        <Whip>
          <Depth
            dur={out - keAku}
            bg={<AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 60% at 50% 55%, rgba(217,119,87,0.35), transparent 70%)" }} />}
            mid={
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{ scale: String(pop(f, keAku, 10)) }}>
                  <Clawd size={640} />
                </div>
              </AbsoluteFill>
            }
          />
        </Whip>
      ) : null}
      {f >= out && f < tools ? (
        <Whip>
          <Depth
            dur={tools - out}
            bg={<AbsoluteFill />}
            mid={
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: 1500, height: 844, borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,0.6)", position: "relative" }}>
                  <Sequence from={out} layout="none">
                    <OffthreadVideo src={staticFile("media/talkinghead.mp4")} startFrom={fd(3.28)} muted style={{ width: 1500, height: 844 }} />
                  </Sequence>
                  <div style={{ position: "absolute", left: 0, bottom: 0, height: 10, width: `${interpolate(f, [out, tools], [0, 100], clamp)}%`, background: "#D97757" }} />
                </div>
                <div style={{ position: "absolute", right: 120, bottom: 60 }}>
                  <Clawd size={170} />
                </div>
              </AbsoluteFill>
            }
          />
        </Whip>
      ) : null}
      {f >= tools ? (
        <Whip dir={-1}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg,#101010,#050505)" }} />
          <div style={{ position: "absolute", left: 200, top: 380 }}>
            <Clawd size={340} />
          </div>
          {toolList.map(([name, logo, task, t], i) => {
            const p = pop(f, g(t) - 2, 10);
            const active = f >= g(t) - 2;
            const y = 170 + i * 260;
            return (
              <React.Fragment key={name}>
                <svg style={{ position: "absolute", left: 0, top: 0 }} width={W} height={H}>
                  <path d={`M 545 520 C 760 520, 820 ${y + 95}, 1000 ${y + 95}`} stroke="#D97757" strokeWidth={3} fill="none" strokeDasharray={700} strokeDashoffset={700 * (1 - p)} />
                </svg>
                <Glass style={{ position: "absolute", left: 1000, top: y, width: 700, height: 190, display: "flex", alignItems: "center", gap: 30, padding: "0 40px", opacity: active ? 1 : 0, scale: String(0.85 + 0.15 * p), translate: `${(1 - p) * 80}px 0px` }}>
                  {logo ? <Img src={staticFile(logo)} style={{ width: 104, height: 104, borderRadius: 24 }} /> : <div style={{ width: 104, height: 104, borderRadius: 24, background: "#fff", color: "#000", fontFamily: inter, fontWeight: 800, fontSize: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>II</div>}
                  <div>
                    <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 58, color: "#fff", letterSpacing: "-0.02em" }}>{name}</div>
                    <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 32, color: "rgba(255,255,255,0.75)" }}>{task}</div>
                  </div>
                </Glass>
              </React.Fragment>
            );
          })}
        </Whip>
      ) : null}
    </AbsoluteFill>
  );
};

const Honest: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (s: number) => fa(s) - base;
  const tl = g(at("aku", 1 + words.filter((w) => w.s < M("s6").start && w.w.toLowerCase().startsWith("aku")).length));
  const cerita = g(at("tapi", 1 + words.filter((w) => w.s < M("s6").start + 4.5 && w.w.toLowerCase() === "tapi").length));
  const layak = g(M("s6").start) + Math.round((words.find((w) => w.w === "layak" && w.s > M("s6").start)!.s - M("s6").start) * FPS);
  const makanya = g(words.find((w) => w.w === "makanya")!.s);
  const jadi = g(words.find((w) => w.w === "Jadi," && w.s > M("s6").start)!.s);
  const end = g(M("taruhan", 2).start);
  return (
    <AbsoluteFill>
      {f < tl ? (
        <Depth
          dur={tl}
          bg={<Plate kind="face" src={33} blur={16} dim={0.35} />}
          mid={
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{ translate: "0 -60px" }}>
                <Clawd size={520} sleepy={interpolate(f, [4, 10], [0, 0.8], clamp)} />
              </div>
            </AbsoluteFill>
          }
        />
      ) : null}
      {f >= tl && f < cerita ? (
        <Whip>
          <Depth
            dur={cerita - tl}
            bg={<AbsoluteFill style={{ background: "linear-gradient(180deg,#101010,#050505)" }} />}
            mid={
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, width: 1600 }}>
                  {Array.from({ length: 18 }).map((_, i) => {
                    const on = interpolate(f, [tl, cerita - 6], [0, 18], clamp) > i;
                    return <div key={i} style={{ flex: [3, 1, 2, 4, 1, 2, 3, 1, 2, 2, 1, 3, 2, 1, 4, 2, 1, 3][i], height: 150, borderRadius: 14, background: i % 3 === 0 ? "#D97757" : i % 3 === 1 ? "#f4f1ea" : "#7f93ff", opacity: on ? 1 : 0.06, scale: on ? "1" : "0.85" }} />;
                  })}
                </div>
              </AbsoluteFill>
            }
          />
        </Whip>
      ) : null}
      {f >= cerita && f < layak ? <Depth dur={layak - cerita} bg={<Plate kind="face" src={44} blur={18} dim={0.3} />} /> : null}
      {f >= layak && f < makanya ? (
        <AbsoluteFill style={{ background: "#050505" }}>
          <Sequence from={layak} layout="none">
            <FlyThrough text="LAYAK" hold={makanya - layak - 9} size={340} font={inter} />
          </Sequence>
        </AbsoluteFill>
      ) : null}
      {f >= makanya && f < jadi ? (
        <Depth
          dur={jadi - makanya}
          bg={<Plate kind="face" src={45.5} blur={16} dim={0.4} />}
          mid={<div style={{ position: "absolute", width: W, height: H, translate: `${interpolate(f, [makanya, makanya + 12], [700, 380], { ...clamp, easing: EASE })}px 40px` }}><CutoutStill src={45.5} /></div>}
        />
      ) : null}
      {f >= jadi && f < end ? <Depth dur={end - jadi} bg={<Plate kind="face" src={52} blur={20} dim={0.35} />} /> : null}
    </AbsoluteFill>
  );
};

const Twenty: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const t20 = fa(at("20")) - base;
  const p = interpolate(f, [t20, t20 + 8], [0, 1], { ...clamp, easing: EASE });
  const shake = f >= t20 && f < t20 + 5 ? (f % 2 ? 8 : -8) : 0;
  const end = fa(M("C5").end) - base;
  return (
    <AbsoluteFill>
      <FaceShot segs={C5} base={base} dur={end} />
      {f >= t20 ? (
        <AbsoluteFill style={{ translate: `${shake}px 0` }}>
          <Depth
            dur={end - t20}
            bg={<Plate kind="face" src={45} blur={18} dim={0.35} />}
            mid={
              <>
                <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                  <div style={{ fontFamily: inter, fontWeight: 900, fontSize: 640, letterSpacing: "-0.07em", color: "#f4f1ea", scale: String(0.6 + 0.4 * p), textShadow: "10px 10px 0 rgba(255,255,255,0.08)" }}>20</div>
                </AbsoluteFill>
                <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                  <Glass style={{ padding: "30px 80px", scale: String(pop(f, t20 + 3, 10)) }}>
                    <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 72, color: "#fff" }}>Upload</div>
                  </Glass>
                </AbsoluteFill>
              </>
            }
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

const Ending: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (s: number) => fa(s) - base;
  const w7 = (captions as { item: string; words: Wd[] }[]).find((c) => c.item === "s7")!.words;
  const W7 = (k: string, n = 1) => g(w7.filter((w) => w.w.toLowerCase().startsWith(k))[n - 1].s);
  const pertama = W7("ini", 2);
  const kalau = W7("kalau");
  const tanya = W7("menurutmu");
  const slots = interpolate(f, [W7("dua"), W7("habis")], [0, 20], clamp);
  const hang = interpolate(f, [W7("sekalian"), W7("project")], [0, 1], { ...clamp, easing: EASE });
  return (
    <AbsoluteFill>
      {f < kalau ? (
        <Depth
          dur={kalau}
          bg={<Plate kind="face" src={53} blur={18} dim={0.35} />}
          mid={
            <>
              <div style={{ position: "absolute", width: W, height: H, translate: "-440px 90px", scale: "0.82" }}>
                <CutoutStill src={53} />
              </div>
              <div style={{ position: "absolute", right: 230, top: 330, scale: String(pop(f, W7("aku"), 10)) }}>
                <Clawd size={380} />
              </div>
              <div style={{ position: "absolute", left: 200, right: 200, bottom: 230, display: "flex", gap: 12 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 70, borderRadius: 12, background: f >= pertama && i === 0 ? "#D97757" : "rgba(255,255,255,0.14)", border: "1.5px solid rgba(255,255,255,0.22)", opacity: slots > i ? 1 : 0, scale: slots > i ? "1" : "0.6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter, fontWeight: 800, fontSize: 34 }}>
                    {f >= pertama && i === 0 ? "✓" : ""}
                  </div>
                ))}
              </div>
            </>
          }
        />
      ) : null}
      {f >= kalau && f < tanya ? (
        <Whip>
          <Depth
            dur={tanya - kalau}
            bg={<AbsoluteFill style={{ background: "linear-gradient(180deg,#121212,#050505)" }} />}
            mid={
              <>
                <div style={{ position: "absolute", left: W / 2 - 200, top: interpolate(hang, [0, 1], [170, 300]), width: 400, rotate: `${hang * 9}deg` }}>
                  <Img src={staticFile("img/GenericFolderIcon.png")} style={{ width: 400 }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center", fontFamily: inter, fontWeight: 700, fontSize: 34, color: "#1d3a6b" }}>Jadisatu</div>
                </div>
                <Img src={staticFile("img/TrashIcon.png")} style={{ position: "absolute", left: W / 2 - 120, top: 680, width: 240, opacity: 0.8 }} />
                <div style={{ position: "absolute", left: W / 2 - 600, top: interpolate(hang, [0, 1], [330, 380]) }}>
                  <Clawd size={260} />
                </div>
              </>
            }
          />
        </Whip>
      ) : null}
      {f >= tanya ? (
        <Depth
          dur={200}
          bg={<AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 60% at 50% 110%, #2a3fd6 0%, #0d1658 35%, #050608 72%)" }} />}
          mid={
            f >= g(78.6) ? (
              <>
                <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", translate: "0 -40px" }}>
                  <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 52, color: "#f4f1ea", opacity: pop(f, g(78.6), 10) }}>
                    Not AI company. Only <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 64, fontWeight: 400 }}>human</span> with AI.
                  </div>
                </AbsoluteFill>
                <div style={{ position: "absolute", left: 120, bottom: 90, fontFamily: inter, fontWeight: 800, fontSize: 42, color: "#fff" }}>1 / 20</div>
                <div style={{ position: "absolute", right: 120, bottom: 90, fontFamily: inter, fontWeight: 800, fontSize: 42, color: "#fff" }}>Jadisatu</div>
              </>
            ) : undefined
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};

const Card: React.FC<{ text: string; dur: number; red?: boolean }> = ({ text, dur, red }) => (
  <AbsoluteFill style={{ background: red ? "linear-gradient(135deg,#B00020 0%,#87001A 100%)" : "#050505" }}>
    <FlyThrough text={text} hold={dur - 5} size={red ? 230 : 300} font={red ? poppins : serif} color={red ? "#FCFCFF" : "#f4f1ea"} />
  </AbsoluteFill>
);

// ================= komposisi =================
const Sq: React.FC<{ a: number; b: number; name: string; children: React.ReactNode }> = ({ a, b: bb, name, children }) => (
  <Sequence from={a} durationInFrames={Math.max(1, bb - a)} name={name}>
    {children}
  </Sequence>
);
const st = (item: string, n = 1) => b(M(item, n).start);
const en = (item: string, n = 1) => b(M(item, n).end);
const shift = (segs: Seg[], base: number) => segs.map(([a, d, s]) => [a, d, s] as Seg).map((x) => x) && { segs, base };

export const Main2: React.FC = () => {
  const s4b = b(at("terus"));
  const c4back = b(at("tapi", 1 + words.filter((w) => w.s < M("C4").start && w.w.toLowerCase() === "tapi").length)) + 6;
  const c4kej = b(at("gimana"));
  void shift;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sq a={0} b={st("taruhan")} name="Hook">
        <Hook />
      </Sq>
      <Sq a={st("taruhan")} b={st("s2")} name="kartu taruhan">
        <Card text="taruhan." dur={st("s2") - st("taruhan")} />
      </Sq>
      <Sq a={st("s2")} b={st("C1")} name="ngaku dulu">
        <Whip>
          <Cover src={16.7} dur={st("C1") - st("s2")} word="ngaku" />
        </Whip>
      </Sq>
      <Sq a={st("C1")} b={st("s3")} name="C1">
        <FaceShot segs={C1} base={st("C1")} dur={st("s3") - st("C1")} />
      </Sq>
      <Sq a={st("s3")} b={st("C2")} name="lebih parah">
        <Whip dir={-1}>
          <Depth dur={st("C2") - st("s3")} push={2} origin="58% 30%" bg={<AbsoluteFill style={{ scale: "2.4", transformOrigin: "58% 26%" }}><Still src={7.62} /></AbsoluteFill>} />
        </Whip>
      </Sq>
      <Sq a={st("C2")} b={st("MENJIJIKKAN")} name="C2">
        <FaceShot segs={C2} base={st("C2")} dur={st("MENJIJIKKAN") - st("C2")} zoom={[1.0, 1.4]} />
      </Sq>
      <Sq a={st("MENJIJIKKAN")} b={st("s4")} name="MENJIJIKKAN">
        <Card text="MENJIJIKKAN." red dur={st("s4") - st("MENJIJIKKAN")} />
      </Sq>
      <Sq a={st("s4")} b={s4b} name="sepanjang video">
        <Whip>
          <Faces dur={s4b - st("s4")} />
        </Whip>
      </Sq>
      <Sq a={s4b} b={st("C3")} name="takutin">
        <Whip dir={-1}>
          <Cover src={19.8} dur={st("C3") - s4b} word="takut." />
        </Whip>
      </Sq>
      <Sq a={st("C3")} b={st("s5")} name="C3">
        <FaceShot segs={C3} base={st("C3")} dur={st("s5") - st("C3")} />
      </Sq>
      <Sq a={st("s5")} b={st("C4")} name="serahin ke aku">
        <Handoff base={st("s5")} />
      </Sq>
      <Sq a={st("C4")} b={c4back} name="bottleneck 2,5D">
        <Whip>
          <Bottleneck base={st("C4")} />
        </Whip>
      </Sq>
      <Sq a={c4back} b={c4kej} name="backlog">
        <Whip dir={-1}>
          <Backlog />
        </Whip>
      </Sq>
      <Sq a={c4kej} b={st("s6")} name="kejelasan">
        <FaceShot segs={C4} base={st("C4")} dur={st("s6") - st("C4")} zoom={[1.1, 1.18]} />
      </Sq>
      <Sq a={st("s6")} b={st("taruhan", 2)} name="nyebelin → layak">
        <Honest base={st("s6")} />
      </Sq>
      <Sq a={st("taruhan", 2)} b={st("C5")} name="kartu taruhan 2">
        <Card text="taruhan." dur={st("C5") - st("taruhan", 2)} />
      </Sq>
      <Sq a={st("C5")} b={st("C6")} name="20 konten">
        <Twenty base={st("C5")} />
      </Sq>
      <Sq a={st("C6")} b={st("s7")} name="C6">
        <FaceShot segs={C6} base={st("C6")} dur={st("s7") - st("C6")} dir={-1} />
      </Sq>
      <Sq a={st("s7")} b={TOTAL2} name="penutup">
        <Ending base={st("s7")} />
      </Sq>
      <Grade />
      <Captions />
      {en("s7") < 0 ? null : null}
    </AbsoluteFill>
  );
};
