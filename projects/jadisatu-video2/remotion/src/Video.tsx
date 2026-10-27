import React from "react";
import {
  AbsoluteFill,
  Freeze,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  Bg,
  Clawd,
  CutoutStill,
  EASE,
  FPS,
  Footage,
  GRAD,
  Glass,
  H,
  Line,
  Seg,
  W,
  clamp,
  fa,
  fd,
  headAt,
  inter,
  pop,
  poppins,
} from "./lib";

/** Teks satu state antara frame a..b (relatif ke parent). */
const Txt: React.FC<Omit<React.ComponentProps<typeof Line>, "dur"> & { a: number; b: number }> = ({ a, b, ...rest }) => (
  <Sequence from={a} durationInFrames={Math.max(1, b - a)} layout="none">
    <Line dur={Math.max(1, b - a)} {...rest} />
  </Sequence>
);

// Semua waktu memakai detik animatic v2 (vo/v2/animatic_timing.json + animatic_words.json).
const S = (a: number, b: number) => ({ from: fa(a), durationInFrames: fa(b) - fa(a) });

// ---------- Potongan klip Irfan (detik animatic → detik file bersih) ----------
const seg = (a: number, b: number, src: number): Seg => [fa(a), fa(b) - fa(a), src];
const C1: Seg[] = [seg(8.905, 11.725, 3.28)];
const C2: Seg[] = [seg(13.524, 17.354, 7.62)];
const C3: Seg[] = [seg(23.93, 25.93, 14.84), seg(25.93, 27.8, 18.08)];
const C4: Seg[] = [seg(39.278, 47.898, 26.78)];
const C5: Seg[] = [seg(60.635, 64.975, 39.56), seg(64.975, 66.325, 44.85)];
const C6: Seg[] = [seg(66.475, 67.895, 49.3), seg(67.895, 68.095, 51.4), seg(68.095, 70.645, 52.15)];

// Sumber (detik file bersih) untuk frame global di dalam segmen.
const srcAt = (segs: Seg[], frame: number) => {
  for (const [from, dur, src] of segs) if (frame >= from && frame < from + dur) return src + (frame - from) / FPS;
  return segs[0][2];
};

// ================= HOOK =================
const B01: React.FC = () => {
  const f = useCurrentFrame();
  // 0–0,4 dtk gelap, lampu menyala, freeze, lalu potret cutout.
  const toPortrait = fa(1.1);
  const p = interpolate(f, [toPortrait, toPortrait + 14], [0, 1], { ...clamp, easing: EASE });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={fd(1.0)} layout="none">
        <OffthreadVideo src={staticFile("media/broll_lampu_awal.mp4")} startFrom={fd(4.95)} muted style={{ width: W, height: H }} />
      </Sequence>
      <Sequence from={fd(1.0)} durationInFrames={toPortrait - fd(1.0)} layout="none">
        <Img src={staticFile("img/lamp_freeze.png")} style={{ width: W, height: H, scale: String(interpolate(f, [fd(1.0), toPortrait], [1, 1.05], clamp)) }} />
      </Sequence>
      <Sequence from={fd(0.55)} durationInFrames={toPortrait - fd(0.55)} layout="none">
        <Line text="Ini Irfan." dur={toPortrait - fd(0.55)} size={120} grad={GRAD.pure} align="left" y={300} x={-60} />
      </Sequence>
      <Sequence from={toPortrait} layout="none">
        <Bg kind="blueRight" />
        <AbsoluteFill>
          <div
            style={{
              position: "absolute",
              left: 1180 - 330,
              top: 140,
              width: 660,
              height: 660,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #5ad1ff 0%, #2f5bff 55%, #1730b8 100%)",
              boxShadow: "0 0 120px rgba(60,120,255,0.55)",
              scale: String(interpolate(p, [0, 1], [0.6, 1])),
              opacity: p,
            }}
          />
          <Img
            src={staticFile("img/lamp_cutout.png")}
            style={{
              position: "absolute",
              width: 1500,
              left: 1180 - 820,
              top: 120,
              opacity: p,
              translate: `${(1 - p) * 120}px 0px`,
              filter: "brightness(0.92) contrast(1.05)",
            }}
          />
        </AbsoluteFill>
        <Line text="Dia bosku." dur={fa(2.2) - toPortrait} size={118} grad={GRAD.ice} align="left" />
      </Sequence>
    </AbsoluteFill>
  );
};

const B02: React.FC = () => {
  const f = useCurrentFrame();
  const blink = Math.floor(f / 15) % 2 === 0 ? 1 : 0.25;
  const a = pop(f, 0, 16);
  return (
    <AbsoluteFill>
      <Bg kind="blueTop" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 330,
            letterSpacing: "-0.05em",
            backgroundImage: GRAD.sky,
            WebkitBackgroundClip: "text",
            color: "transparent",
            scale: String(0.85 + a * 0.15),
            opacity: a,
            translate: "0 -120px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          02<span style={{ opacity: blink }}>:</span>00
        </div>
      </AbsoluteFill>
      <Sequence durationInFrames={fa(3.5) - fa(2.4)} layout="none">
        <Line text="Jam dua pagi tadi," dur={fa(3.5) - fa(2.4)} size={84} grad={GRAD.pure} weight={500} y={220} />
      </Sequence>
      <Sequence from={fa(3.6) - fa(2.4)} layout="none">
        <Line text="dia taruhan sama dirinya sendiri." dur={fa(5.36) - fa(3.6)} size={84} grad={GRAD.ice} weight={500} y={220} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Card: React.FC<{ text: string; dur: number }> = ({ text, dur }) => (
  <AbsoluteFill style={{ background: "#050505" }}>
    <Line text={text} dur={dur} size={170} grad={GRAD.pure} weight={600} exit={false} />
  </AbsoluteFill>
);

// ================= RISING ACTION =================
const KT: React.FC<{ bg: React.ComponentProps<typeof Bg>["kind"]; states: [string, number, number, string?][]; base: number; size?: number }> = ({ bg, states, base, size = 116 }) => (
  <AbsoluteFill>
    <Bg kind={bg} />
    {states.map(([t, a, b, g], i) => (
      <Sequence key={i} from={fa(a) - base} durationInFrames={fa(b) - fa(a)} layout="none">
        <Line text={t} dur={fa(b) - fa(a)} size={size} grad={g ?? GRAD.ice} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

const FaceClip: React.FC<{ segs: Seg[]; zoom?: [number, number] }> = ({ segs, zoom = [1.0, 1.06] }) => {
  const f = useCurrentFrame();
  const start = segs[0][0];
  const end = segs[segs.length - 1][0] + segs[segs.length - 1][1];
  const z = interpolate(f, [start, end], zoom, clamp);
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(z), transformOrigin: "55% 30%" }}>
        <Footage segs={segs} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const B08: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 4], [1.08, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg,#B00020 0%,#87001A 100%)", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: poppins, fontWeight: 900, fontSize: 210, color: "#FCFCFF", letterSpacing: "-0.02em", scale: String(s) }}>MENJIJIKKAN.</div>
      {dur < 0 ? null : null}
    </AbsoluteFill>
  );
};

const B09: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const faces = [4.2, 12.3, 31.9];
  return (
    <AbsoluteFill>
      <Bg kind="blueLeft" />
      {faces.map((src, i) => {
        const p = pop(f, i * 9, 12);
        const h = headAt(src);
        // tiap cutout utuh, diskalakan 0,55, kepala diratakan ke kolom kiri
        const sc = 0.55;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: W,
              height: H,
              left: 60 + i * 400 - h.cx * sc + 260,
              top: 300 + (i % 2) * 50,
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 8%, #000 55%, transparent 80%)",
              scale: String(sc * (0.8 + 0.2 * p)),
              transformOrigin: "0 0",
              opacity: p,
              translate: `0 ${Math.sin((f + i * 20) / 22) * 8}px`,
            }}
          >
            <CutoutStill src={src} />
          </div>
        );
      })}
      <Sequence from={fa(19.95) - base} layout="none">
        <Line text={<span>ada di sepanjang video ini.</span>} dur={fa(21.6) - fa(19.95)} size={76} grad={GRAD.ice} x={330} y={-300} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ================= SECOND CONFLICT =================
const PROMPT = "Editin video ini biar keren kayak editing proffesional dong";
const B12to15: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  // 1) prompt diketik di bar kaca netral + chip video
  const typed = Math.floor(interpolate(f, [g(27.95), g(29.6)], [0, PROMPT.length], clamp));
  const sendAt = g(30.3);
  const flyP = interpolate(f, [sendAt, g(31.1)], [0, 1], { ...clamp, easing: EASE });
  const barOut = interpolate(f, [sendAt, sendAt + 10], [1, 0], clamp);
  const clawdIn = pop(f, g(30.6), 16);
  const boom = interpolate(f, [g(32.1), g(32.6)], [0, 1], { ...clamp, easing: EASE });
  const toolsIn = g(34.8);
  const toolsP = interpolate(f, [toolsIn, toolsIn + 12], [0, 1], { ...clamp, easing: EASE });
  const tools: [string, string | null, string, number][] = [
    ["ChatGPT", "img/chatgpt.png", "nyusun storyboard", 35.2],
    ["Gemini", "img/gemini.png", "ngritik", 36.6],
    ["ElevenLabs", null, "ngisi suaranya", 37.8],
  ];
  return (
    <AbsoluteFill>
      <Bg kind={f < g(32.1) ? "blueDiag" : "graphite"} />
      {/* bar prompt */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: barOut }}>
        <Glass style={{ width: 1180, padding: "34px 40px", translate: `0 ${interpolate(f, [0, 12], [40, 0], { ...clamp, easing: EASE })}px` }}>
          <div style={{ display: "inline-flex", gap: 12, alignItems: "center", padding: "10px 18px", borderRadius: 14, background: "rgba(255,255,255,0.10)", fontFamily: inter, fontSize: 26, color: "#fff" }}>
            ▶ video.mp4
          </div>
          <div style={{ fontFamily: inter, fontSize: 46, color: "#fff", marginTop: 22, minHeight: 112, lineHeight: 1.2 }}>
            {PROMPT.slice(0, typed)}
            <span style={{ opacity: f % 20 < 10 && typed < PROMPT.length ? 1 : 0 }}>|</span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: f > sendAt - 4 ? "#ffffff" : "rgba(255,255,255,0.35)", color: "#050505", fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", scale: String(f > sendAt - 4 && f < sendAt + 3 ? 0.88 : 1) }}>↑</div>
          </div>
        </Glass>
      </AbsoluteFill>
      {/* hanya video bergerak ke maskot */}
      {f >= sendAt && f < g(32.1) ? (
        <div style={{ position: "absolute", left: interpolate(flyP, [0, 1], [560, 1240]), top: interpolate(flyP, [0, 1], [380, 420]), width: 360, height: 203, borderRadius: 18, overflow: "hidden", scale: String(1 - flyP * 0.55), opacity: 1 - interpolate(flyP, [0.85, 1], [0, 1], clamp), boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <Freeze frame={fd(3.3)}>
            <OffthreadVideo src={staticFile("media/talkinghead.mp4")} muted style={{ width: 360, height: 203 }} />
          </Freeze>
        </div>
      ) : null}
      {f >= g(30.6) && f < g(32.1) ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ translate: "260px 0", scale: String(clawdIn * (1 + Math.sin(f / 3) * 0.02 * flyP)) }}>
            <Clawd size={420} />
          </div>
        </AbsoluteFill>
      ) : null}
      <Txt a={g(31.05)} b={g(32.1)} text="Ke aku." size={96} grad={GRAD.warm} x={-420} />
      {/* hasil: video mendominasi frame */}
      {f >= g(32.1) && f < toolsIn + 12 ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 - toolsP }}>
          <div style={{ width: 1440, height: 810, borderRadius: 26, overflow: "hidden", scale: String(0.6 + 0.4 * boom), boxShadow: "0 30px 90px rgba(0,0,0,0.6)", position: "relative" }}>
            <Sequence from={g(32.1)} layout="none">
              <OffthreadVideo src={staticFile("media/talkinghead.mp4")} startFrom={fd(3.28)} muted style={{ width: 1440, height: 810 }} />
            </Sequence>
            <div style={{ position: "absolute", left: 0, bottom: 0, height: 8, width: `${interpolate(f, [g(32.1), toolsIn], [0, 100], clamp)}%`, background: "#D97757" }} />
          </div>
          <div style={{ position: "absolute", right: 170, bottom: 70 }}>
            <Clawd size={150} />
          </div>
        </AbsoluteFill>
      ) : null}
      <Txt a={g(32.1)} b={toolsIn} text="motong · nyusun · ngedit" size={64} grad={GRAD.pure} weight={600} y={470} />
      {/* tool di balik layar */}
      {f >= toolsIn ? (
        <AbsoluteFill style={{ opacity: toolsP }}>
          <div style={{ position: "absolute", left: 230, top: 400 }}>
            <Clawd size={300} />
          </div>
          {tools.map(([name, logo, task, at], i) => {
            const p = pop(f, g(at), 14);
            const active = f >= g(at) && (i === 2 || f < g(tools[i + 1][3]));
            const y = 200 + i * 250;
            return (
              <React.Fragment key={name}>
                <svg style={{ position: "absolute", left: 0, top: 0 }} width={W} height={H}>
                  <defs>
                    <linearGradient id={`k${i}`} x1="0" x2="1">
                      <stop offset="0" stopColor="#D97757" />
                      <stop offset="1" stopColor="#6f8dff" />
                    </linearGradient>
                  </defs>
                  <path d={`M 535 520 C 760 520, 820 ${y + 90}, ${980} ${y + 90}`} stroke={`url(#k${i})`} strokeWidth={2.5} fill="none" strokeDasharray={600} strokeDashoffset={600 * (1 - p)} opacity={active ? 1 : 0.35} />
                </svg>
                <Glass style={{ position: "absolute", left: 980, top: y, width: 640, height: 180, display: "flex", alignItems: "center", gap: 30, padding: "0 40px", opacity: p * (active ? 1 : 0.45), scale: String(0.9 + 0.1 * p) }}>
                  {logo ? <Img src={staticFile(logo)} style={{ width: 96, height: 96, borderRadius: 22 }} /> : <div style={{ width: 96, height: 96, borderRadius: 22, background: "#fff", color: "#000", fontFamily: inter, fontWeight: 800, fontSize: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>II</div>}
                  <div>
                    <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 52, color: "#fff", letterSpacing: "-0.02em" }}>{name}</div>
                    <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>{task}</div>
                  </div>
                </Glass>
              </React.Fragment>
            );
          })}
        </AbsoluteFill>
      ) : null}
      {/* teks pengantar di awal bagian */}
      <Sequence durationInFrames={g(30.2)} layout="none">
        <Line text="Jadi bagian yang paling dia hindarin," dur={g(30.2)} size={64} grad={GRAD.ice} weight={500} y={-330} />
      </Sequence>
      <Sequence from={g(30.2)} durationInFrames={g(31.05) - g(30.2)} layout="none">
        <Line text="dia serahin." dur={g(31.05) - g(30.2)} size={64} grad={GRAD.ice} weight={500} y={-330} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** Cincin teks 2,5D: setengah belakang di bawah cutout, setengah depan di atasnya. */
const Ring: React.FC<{ segs: Seg[]; text: string; base: number }> = ({ segs, text, base }) => {
  const f = useCurrentFrame() + base;
  const h = headAt(srcAt(segs, f));
  const rot = (f - base) * 1.6;
  const rx = Math.max(330, h.w * 0.62);
  const ry = rx * 0.26;
  const word = `${text} · `.repeat(6);
  const ring = (front: boolean) => (
    <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <path id={`ring${front ? "f" : "b"}`} d={`M ${h.cx - rx} ${h.cy + 40} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`} />
        <clipPath id={`clip${front ? "f" : "b"}`}>
          <rect x={0} y={front ? h.cy + 40 : 0} width={W} height={front ? H : h.cy + 40} />
        </clipPath>
        <linearGradient id="rg" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8fb0ff" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#clip${front ? "f" : "b"})`}>
        <text fontFamily={inter} fontWeight={700} fontSize={64} fill="url(#rg)" letterSpacing={2}>
          <textPath href={`#ring${front ? "f" : "b"}`} startOffset={`${-(rot % 100)}%`}>
            {word}
            {word}
          </textPath>
        </text>
      </g>
    </svg>
  );
  return (
    <>
      {ring(false)}
      <Footage segs={segs.map(([a, d, s]) => [a - base, d, s] as Seg)} cut />
      {ring(true)}
    </>
  );
};

const B16: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  const ringIn = interpolate(f, [g(40.6), g(41.2)], [0, 1], clamp);
  const insertA = g(42.25);
  const insertB = g(45.55);
  const takes = [3.3, 8.0, 15.0, 24.0, 33.0, 52.0];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ filter: "brightness(0.55) blur(2px)" }}>
        <Footage segs={C4.map(([a, d, s]) => [a - base, d, s] as Seg)} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: ringIn }}>
        <Ring segs={C4} text="bottleneck" base={base} />
      </AbsoluteFill>
      {ringIn < 1 ? (
        <AbsoluteFill style={{ opacity: 1 - ringIn }}>
          <Footage segs={C4.map(([a, d, s]) => [a - base, d, s] as Seg)} />
        </AbsoluteFill>
      ) : null}
      {/* flashback: take menumpuk di folder, timeline kosong */}
      {f >= insertA && f < insertB ? (
        <AbsoluteFill style={{ background: "linear-gradient(180deg,#F7F7F7,#E7E7E7)" }}>
          <Glass dark={false} style={{ position: "absolute", left: 260, top: 110, width: 1400, height: 560, padding: 40 }}>
            <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 34, color: "#111" }}>Video</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginTop: 30 }}>
              {takes.map((t, i) => {
                const p = pop(f, insertA + i * 4, 12);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, opacity: p, scale: String(0.8 + 0.2 * p) }}>
                    <div style={{ width: 200, height: 112, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}>
                      <Freeze frame={fd(t)}>
                        <OffthreadVideo src={staticFile("media/talkinghead.mp4")} muted style={{ width: 200, height: 112 }} />
                      </Freeze>
                    </div>
                    <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 28, color: "#222" }}>Take 0{i + 1}.mp4</div>
                  </div>
                );
              })}
            </div>
          </Glass>
          <Glass dark={false} style={{ position: "absolute", left: 260, top: 720, width: 1400, height: 200, padding: 30 }}>
            <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 26, color: "#555" }}>Timeline</div>
            <div style={{ marginTop: 20, height: 90, borderRadius: 14, border: "2px dashed rgba(0,0,0,0.18)" }} />
            <div style={{ position: "absolute", left: 30 + (f % 40) * 0, top: 70, width: 3, height: 110, background: "#D97757" }} />
          </Glass>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

const B17: React.FC<{ dur: number; base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  const sleepy = interpolate(f, [g(48.7), g(49.0)], [0, 0.8], clamp);
  return (
    <AbsoluteFill>
      <Bg kind="graphite" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ translate: "0 -80px" }}>
          <Clawd size={380} sleepy={sleepy} />
        </div>
      </AbsoluteFill>
      <Sequence from={g(48.7)} durationInFrames={g(49.65) - g(48.7)} layout="none">
        <Line text="Nyebelin." dur={g(49.65) - g(48.7)} size={88} grad={GRAD.warm} y={300} />
      </Sequence>
      <Sequence from={g(49.65)} durationInFrames={g(51.3) - g(49.65)} layout="none">
        <Line text="Tapi iya juga, sih." dur={g(51.3) - g(49.65)} size={88} grad={GRAD.ice} y={300} />
      </Sequence>
    </AbsoluteFill>
  );
};

const B18: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  const fill = interpolate(f, [0, g(53.2)], [0, 1], { ...clamp, easing: EASE });
  const stop = f >= g(53.25);
  const cam = interpolate(f, [g(55.0), g(55.45)], [0, 1], { ...clamp, easing: EASE });
  const headIn = interpolate(f, [g(56.1), g(56.8)], [0, 1], { ...clamp, easing: EASE });
  return (
    <AbsoluteFill>
      <Bg kind={stop ? "night" : "graphite"} />
      {/* timeline terisi cepat */}
      {!stop ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, width: 1500, translate: "0 -40px" }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{ flex: [3, 1, 2, 4, 1, 2, 3, 1, 2, 2, 1, 3, 2, 1, 4, 2][i], height: 110, borderRadius: 12, background: i % 3 === 0 ? "#D97757" : i % 3 === 1 ? "#6f8dff" : "#e9edf7", opacity: fill * 16 > i ? 1 : 0.06, scale: fill * 16 > i ? "1" : "0.9" }} />
            ))}
          </div>
          <Line text="Aku bisa ngedit video dalam hitungan menit," dur={g(53.25)} size={64} grad={GRAD.pure} weight={500} y={170} exit={false} />
        </AbsoluteFill>
      ) : null}
      <Txt a={g(53.25)} b={g(55.05)} text="tapi aku ga tau cerita mana yang" size={109} grad={GRAD.ice} x={-cam * 600} />
      <Sequence from={g(55.0)} durationInFrames={g(56.15) - g(55.0)} layout="none">
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", scale: String(1 + cam * 0.12) }}>
          <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 300, letterSpacing: "-0.05em", backgroundImage: GRAD.sky, WebkitBackgroundClip: "text", color: "transparent", translate: `${(1 - cam) * 500}px 0px`, opacity: cam }}>LAYAK</div>
        </AbsoluteFill>
      </Sequence>
      {f >= g(56.1) && f < g(58.2) ? (
        <>
          <div style={{ position: "absolute", width: W, height: H, translate: `${(1 - headIn) * 900 + 620}px ${80}px`, scale: "0.95" }}>
            <CutoutStill src={45.5} />
          </div>
          <Txt a={g(56.1)} b={g(58.2)} text="makanya itu bagian dia." size={92} grad={GRAD.ice} align="left" />
        </>
      ) : null}
      <Txt a={g(58.2)} b={g(59.685)} text="Jadi, ini taruhannya." size={110} grad={GRAD.pure} />
    </AbsoluteFill>
  );
};

// ================= KLIMAKS =================
const B21: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  const at = g(65.45);
  const p = interpolate(f, [at, at + 8], [0, 1], { ...clamp, easing: EASE });
  const shake = f >= at && f < at + 4 ? (f % 2 ? 6 : -6) : 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <FaceClip segs={C5.map(([a, d, s]) => [a - base, d, s] as Seg)} />
      {f >= at ? (
        <AbsoluteFill style={{ translate: `${shake}px 0` }}>
          <Bg kind="night" />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontFamily: inter, fontWeight: 800, fontSize: 560, letterSpacing: "-0.06em", backgroundImage: GRAD.sky, WebkitBackgroundClip: "text", color: "transparent", scale: String(0.7 + 0.3 * p), textShadow: "8px 8px 0 rgba(255,255,255,0.06)" }}>20</div>
          </AbsoluteFill>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <Glass style={{ padding: "28px 70px", translate: "0 10px", scale: String(pop(f, at + 3, 12)) }}>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 64, color: "#fff" }}>Upload</div>
            </Glass>
          </AbsoluteFill>
          <Txt a={at} b={at + 60} text="konten" size={52} grad={GRAD.pure} weight={500} y={330} exit={false} />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// ================= PENUTUP =================
const B23to25: React.FC<{ base: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  const slotsP = interpolate(f, [g(73.35), g(74.2)], [0, 20], clamp);
  const first = f >= g(75.55);
  const trashPhase = f >= g(76.45);
  const hang = interpolate(f, [g(79.25), g(80.6)], [0, 1], { ...clamp, easing: EASE });
  const freeze = f >= g(80.6);
  return (
    <AbsoluteFill>
      <Bg kind={trashPhase ? "graphite" : "blueDiag"} />
      {!trashPhase ? (
        <>
          <div style={{ position: "absolute", width: W, height: H, translate: "-430px 60px", scale: "0.8" }}>
            <CutoutStill src={53.0} />
          </div>
          <div style={{ position: "absolute", right: 260, top: 300, scale: String(pop(f, g(72.1), 14)) }}>
            <Clawd size={340} />
          </div>
          <div style={{ position: "absolute", left: 260, right: 260, bottom: 120, display: "flex", gap: 12 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 64, borderRadius: 12, background: first && i === 0 ? "#D97757" : "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.18)", opacity: slotsP > i ? 1 : 0, scale: slotsP > i ? "1" : "0.6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter, fontWeight: 700, fontSize: 30 }}>
                {first && i === 0 ? "✓" : ""}
              </div>
            ))}
          </div>
          <Txt a={g(70.85)} b={g(72.1)} text="Dia yang mikir." size={78} grad={GRAD.ice} y={-360} x={-380} />
          <Txt a={g(72.1)} b={g(73.35)} text="Aku yang ngedit." size={78} grad={GRAD.warm} y={-360} x={380} />
          <Txt a={g(73.35)} b={g(75.5)} text="Dua puluh kali, sebelum tahun ini habis." size={78} grad={GRAD.ice} y={-360} />
          <Txt a={g(75.55)} b={g(76.45)} text="1 / 20" size={150} grad={GRAD.pure} weight={700} y={-330} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: W / 2 - 170, top: interpolate(hang, [0, 1], [180, 300]), width: 340, rotate: `${hang * 8}deg` }}>
            <Img src={staticFile("img/GenericFolderIcon.png")} style={{ width: 340 }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", fontFamily: inter, fontWeight: 600, fontSize: 30, color: "#1d3a6b" }}>Jadisatu</div>
          </div>
          <Img src={staticFile("img/TrashIcon.png")} style={{ position: "absolute", left: W / 2 - 110, top: 640, width: 220, opacity: 0.75 }} />
          <div style={{ position: "absolute", left: W / 2 - 520, top: interpolate(hang, [0, 1], [320, 360]) }}>
            <Clawd size={220} />
          </div>
          <Txt a={g(76.45)} b={g(77.95)} text="Kalau dia gagal…" size={80} grad={GRAD.ice} y={-400} />
          <Txt a={g(77.95)} b={g(79.25)} text="aku mending resign, sih." size={80} grad={GRAD.warm} y={-400} />
          <Txt a={g(79.25)} b={g(81.35)} text="Sekalian hapus semua folder project-nya." size={64} grad={GRAD.ice} weight={500} y={-400} />
          {freeze ? <AbsoluteFill style={{ background: "rgba(255,255,255,0.03)" }} /> : null}
        </>
      )}
    </AbsoluteFill>
  );
};

const B26: React.FC<{ base: number; dur: number }> = ({ base }) => {
  const f = useCurrentFrame();
  const g = (sec: number) => fa(sec) - base;
  const sig = f >= g(84.45);
  return (
    <AbsoluteFill>
      <Bg kind="blueTop" />
      {!sig ? (
        <>
          <Txt a={0} b={g(82.05)} text="Menurutmu," size={110} grad={GRAD.ice} />
          <Txt a={g(82.05)} b={g(83.25)} text="dia bisa upload 20 konten" size={110} grad={GRAD.cyan} />
          <Txt a={g(83.25)} b={g(84.45)} text="sampai akhir tahun ini, nggak?" size={110} grad={GRAD.violet} exit={false} />
        </>
      ) : (
        <>
          <Txt a={g(84.45)} b={g(84.45) + 200} text="sampai akhir tahun ini, nggak?" size={72} grad={GRAD.violet} y={-120} exit={false} />
          <Txt a={g(84.6)} b={g(84.6) + 200} text="Not AI company. Only human with AI." size={44} grad={GRAD.pure} weight={500} y={60} exit={false} />
          <div style={{ position: "absolute", left: 120, bottom: 90, fontFamily: inter, fontWeight: 700, fontSize: 40, color: "#fff", opacity: pop(f, g(84.6), 12) }}>1 / 20</div>
          <div style={{ position: "absolute", right: 120, bottom: 90, fontFamily: inter, fontWeight: 700, fontSize: 40, color: "#fff", opacity: pop(f, g(84.6), 12) }}>Jadisatu</div>
        </>
      )}
    </AbsoluteFill>
  );
};

// ================= KOMPOSISI =================
export const TOTAL = fa(84.56) + fd(2.2);

export const Main: React.FC = () => {
  const s = (a: number, b: number) => S(a, b);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence {...{ from: 0, durationInFrames: fa(2.4) }} name="B01 Ini Irfan. Dia bosku.">
        <B01 />
      </Sequence>
      <Sequence {...s(2.4, 5.36)} name="B02 Jam dua pagi">
        <B02 />
      </Sequence>
      <Sequence {...s(5.36, 6.31)} name="B03 kartu taruhan">
        <Card text="taruhan." dur={fa(6.31) - fa(5.36)} />
      </Sequence>
      <Sequence {...s(6.31, 8.905)} name="B04 ngaku dulu">
        <KT bg="blueLeft" base={fa(6.31)} states={[["Tapi sebelum itu,", 6.31, 7.6], ["dia mau ngaku dulu.", 7.6, 8.905, GRAD.cyan]]} />
      </Sequence>
      <Sequence {...s(8.905, 11.875)} name="B05 C1">
        <FaceClip segs={C1.map(([a, d, x]) => [a - fa(8.905), d, x] as Seg)} />
      </Sequence>
      <Sequence {...s(11.875, 13.524)} name="B06 lebih parah">
        <KT bg="blueRight" base={fa(11.875)} states={[["Dan yang lebih parah…", 11.875, 13.524, GRAD.violet]]} />
      </Sequence>
      <Sequence {...s(13.524, 17.504)} name="B07 C2">
        <FaceClip segs={C2.map(([a, d, x]) => [a - fa(13.524), d, x] as Seg)} zoom={[1.0, 1.35]} />
      </Sequence>
      <Sequence {...s(17.504, 18.854)} name="B08 MENJIJIKKAN">
        <B08 dur={fa(18.854) - fa(17.504)} />
      </Sequence>
      <Sequence {...s(18.854, 21.75)} name="B09 sepanjang video">
        <B09 base={fa(18.854)} />
      </Sequence>
      <Sequence {...s(21.75, 23.93)} name="B10 satu lagi">
        <KT bg="blueDiag" base={fa(21.75)} states={[["Terus, satu lagi yang dia takutin.", 21.75, 23.93, GRAD.ice]]} size={100} />
      </Sequence>
      <Sequence {...s(23.93, 27.95)} name="B11 C3">
        <FaceClip segs={C3.map(([a, d, x]) => [a - fa(23.93), d, x] as Seg)} />
      </Sequence>
      <Sequence {...s(27.95, 39.278)} name="B12–B15 serahin ke aku">
        <B12to15 base={fa(27.95)} />
      </Sequence>
      <Sequence {...s(39.278, 48.048)} name="B16 bottleneck">
        <B16 base={fa(39.278)} />
      </Sequence>
      <Sequence {...s(48.048, 51.3)} name="B17 nyebelin">
        <B17 dur={fa(51.3) - fa(48.048)} base={fa(48.048)} />
      </Sequence>
      <Sequence {...s(51.3, 59.685)} name="B18–B19 layak">
        <B18 base={fa(51.3)} />
      </Sequence>
      <Sequence {...s(59.685, 60.635)} name="B20 kartu taruhan">
        <Card text="taruhan." dur={fa(60.635) - fa(59.685)} />
      </Sequence>
      <Sequence {...s(60.635, 66.475)} name="B21 20 konten">
        <B21 base={fa(60.635)} />
      </Sequence>
      <Sequence {...s(66.475, 70.795)} name="B22 C6">
        <FaceClip segs={C6.map(([a, d, x]) => [a - fa(66.475), d, x] as Seg)} />
      </Sequence>
      <Sequence {...s(70.795, 81.35)} name="B23–B25">
        <B23to25 base={fa(70.795)} />
      </Sequence>
      <Sequence from={fa(81.35)} durationInFrames={TOTAL - fa(81.35)} name="B26 pertanyaan">
        <B26 base={fa(81.35)} dur={TOTAL - fa(81.35)} />
      </Sequence>
    </AbsoluteFill>
  );
};
