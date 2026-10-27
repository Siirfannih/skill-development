import React from "react";
import { AbsoluteFill, Img, interpolate, random, Sequence, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import { a, Cam, clamp, ease, easeOut, Layer, sec, Sprite, twos, World } from "./lib/core";
import { DreamBubble, Handwrite, IGStory, Strike, WAChat, HAND } from "./lib/ui";

/* Waktu shot (detik video, diselaraskan ke onset baris lagu) */
export const T = {
  S01: [0, 2.34], S02: [2.34, 4.6], S03: [4.6, 5.6], S04: [5.6, 15.0], S05: [15.0, 22.0],
  S06: [22.0, 24.38], S07: [24.38, 26.9], S08: [26.9, 33.06], S09: [33.06, 39.56], S10: [39.56, 45.0],
  S11: [45.0, 48.0], S12: [48.0, 50.98], S13: [50.98, 54.0], S14: [54.0, 57.22], S15: [57.22, 62.3],
  S16: [62.3, 63.46], S17: [63.46, 65.0], S18: [65.0, 66.44], S19: [66.44, 68.2], S20: [68.2, 70.0],
  S21: [70.0, 72.6], S22: [72.6, 74.58],
} as const;
export const TOTAL = sec(74.58);
type K = keyof typeof T;
const Shot: React.FC<{ id: K; children: React.ReactNode; pre?: number }> = ({ id, children }) => {
  const [s, e] = T[id];
  return (
    <Sequence from={sec(s)} durationInFrames={sec(e) - sec(s)} name={id}>
      {children}
    </Sequence>
  );
};
const dur = (id: K) => sec(T[id][1]) - sec(T[id][0]);

/* ---------- siluet takut ---------- */
const Sils: React.FC<{
  items: { src: string; x: number; y: number; h: number; d?: number; inF?: number }[];
  approach?: number; // 0..1 merapat ke pusat
  opacity?: number;
}> = ({ items, approach = 0, opacity = 0.9 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {items.map((it, i) => {
        const o = interpolate(frame, [it.inF ?? 0, (it.inF ?? 0) + 12], [0, opacity], clamp) * (0.85 + 0.15 * random(`so${twos(frame)}${i}`));
        const x = it.x + (960 - it.x) * approach * 0.35;
        return <Sprite key={i} src={a(it.src)} x={x} y={it.y} h={it.h * (1 + approach * 0.15)} depth={it.d ?? 0.5} opacity={o} boil={2.5} style={{ filter: "blur(1.5px)" }} />;
      })}
    </>
  );
};

/* ================= SHOTS ================= */
const S01: React.FC = () => (
  <World kind="N" bloom={0.15}>
    <AbsoluteFill style={{ filter: "blur(14px) brightness(0.45)" }}>
      <Img src={a("N_corner_ots.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
    <Cam keys={[[0, { s: 1.02, y: 6 }], [dur("S01"), { s: 1.0, y: 0 }]]}>
      <IGStory
        per={Math.round(dur("S01") / 3)}
        stories={[
          { src: a("story_1.png"), user: "rara.anindya", ago: "2j" },
          { src: a("story_2.png"), user: "dimaspratama", ago: "5j" },
          { src: a("story_3.png"), user: "sinta.ayu", ago: "8j" },
        ]}
      />
    </Cam>
  </World>
);

const S02: React.FC = () => (
  <World kind="N">
    <Cam keys={[[0, { s: 1.0 }], [dur("S02"), { s: 1.09, x: -30, y: 10 }]]}>
      <Layer src={a("L/N_corner_ots/far.png")} depth={0} />
      <Layer src={a("L/N_corner_ots/mid.png")} depth={0.5} />
      <Layer src={a("L/N_corner_ots/near.png")} depth={1} />
    </Cam>
  </World>
);

const S03: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S03");
  const r = interpolate(frame, [0, d], [26, 1300], { ...clamp, easing: Easing2 });
  const flash = interpolate(frame, [d - 6, d - 2, d], [0, 0.85, 0.3], clamp);
  return (
    <AbsoluteFill>
      <World kind="N">
        <Cam keys={[[0, { s: 1.0 }], [d, { s: 1.35 }]]}>
          <Layer src={a("N_cup_ecu.png")} depth={0.6} />
        </Cam>
      </World>
      <DreamBubble cx={520} cy={590} r={r} inner={<World kind="P"><Layer src={a("P_kos_clean.png")} depth={0.3} /></World>} />
      <AbsoluteFill style={{ background: "#fffaf0", opacity: flash }} />
    </AbsoluteFill>
  );
};
const Easing2 = (t: number) => t * t * t; // ease-in kubik: gelembung membesar makin cepat

const S04: React.FC = () => {
  const frame = useCurrentFrame();
  const f = twos(frame);
  const d = dur("S04");
  const pose = f < sec(3.6) ? "ch_kos_1.png" : f < sec(6.6) ? "ch_kos_2.png" : "ch_kos_3.png";
  const curtain = interpolate(frame, [sec(0.4), sec(2.0)], [0, 1], { ...clamp, easing: easeOut });
  return (
    <World kind="P">
      <Cam keys={[[0, { s: 1.04, x: 30 }], [d, { s: 1.0, x: -20 }]]}>
        <Layer src={a("P_kos_clean.png")} depth={0.2} />
        {/* cahaya pagi masuk saat tirai dibuka */}
        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse 45% 70% at 18% 35%, rgba(255,250,232,0.85) 0%, rgba(255,250,232,0) 70%)",
            opacity: 0.25 + curtain * 0.6,
            mixBlendMode: "screen",
          }}
        />
        <Sprite src={a(pose)} x={pose === "ch_kos_2.png" ? 1270 : pose === "ch_kos_1.png" ? 400 : 1120} y={930} h={pose === "ch_kos_2.png" ? 520 : 600} depth={0.5} flip={pose === "ch_kos_1.png"} />
      </Cam>
    </World>
  );
};

const S05: React.FC = () => {
  const frame = useCurrentFrame();
  const per = 19; // 2 ketukan
  const bgs = ["P_office_clean.png", "P_class_clean.png", "P_bus_clean.png", "P_desk_clean.png"];
  const idx = Math.floor(frame / per);
  const bg = bgs[idx % 4];
  const ch = idx >= 6 ? "ch_slump_b.png" : "ch_slump.png";
  const silIn = sec(19.0 - 15.0);
  return (
    <World kind="P">
      <Cam keys={[[0, { s: 1.0 }], [dur("S05"), { s: 1.06 }]]}>
        <Layer src={a(bg)} depth={0.3} />
        <Sprite src={a(ch)} x={960} y={1080} h={720} depth={0.5} boil={1} />
        {frame > silIn && (
          <Sequence from={silIn} layout="none">
            <Sils
              items={[
                { src: "sil_stand_1.png", x: 160, y: 1080, h: 900, d: 0.7 },
                { src: "sil_stand_3.png", x: 1780, y: 1080, h: 940, d: 0.7, inF: 10 },
              ]}
              opacity={0.75}
            />
          </Sequence>
        )}
      </Cam>
    </World>
  );
};

const S06: React.FC = () => (
  <World kind="P" bloom={0.3}>
    <Cam keys={[[0, { s: 1.0, r: 0 }], [dur("S06"), { s: 1.1, r: -3 }]]}>
      <Layer src={a("P_bed_topdown.png")} depth={0.5} />
    </Cam>
  </World>
);

const S07: React.FC = () => {
  const frame = useCurrentFrame();
  const fy = Math.sin(twos(frame) / 9) * 6;
  return (
    <World kind="P" bloom={0.5}>
      <Cam keys={[[0, { s: 1.12 }], [dur("S07"), { s: 1.0, y: -20 }]]}>
        <Layer src={a("P_void.png")} depth={0.1} />
        <Sils
          items={[
            { src: "sil_stand_1.png", x: 260, y: 760, h: 300, d: 0.2 },
            { src: "sil_stand_2.png", x: 540, y: 740, h: 250, d: 0.2, inF: 6 },
            { src: "sil_stand_3.png", x: 1400, y: 740, h: 260, d: 0.2, inF: 12 },
            { src: "sil_stand_4.png", x: 1680, y: 765, h: 310, d: 0.2, inF: 18 },
          ]}
          opacity={0.7}
        />
        <Sprite src={a("ch_bed_float.png")} x={960} y={780 + fy} h={420} depth={0.5} boil={0.8} />
      </Cam>
    </World>
  );
};

const LIST = ["Olahraga rutin", "Nabung", "Lebih sering ketemu teman", "Kenalan sama orang baru", "Belajar gitar"];
const S08: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S08");
  const faded = interpolate(frame, [sec(3.4), sec(5.6)], [1, 0.45], clamp);
  return (
    <World kind="P">
      <Cam keys={[[0, { s: 1.1, y: 60 }], [sec(3.0), { s: 1.16, y: -30 }], [d, { s: 1.3, y: -120, x: 40 }]]}>
        <Layer src={a("P_planner.png")} depth={0.5} />
        <AbsoluteFill style={{ left: PL.x, top: PL.y, width: 700, rotate: `${PL.rot}deg`, opacity: faded }}>
          <Handwrite text="Resolusi 2026" start={4} cps={16} size={56} color="#3b3532" />
          {LIST.map((t, i) => (
            <div key={i} style={{ marginTop: 12, filter: i === 3 ? undefined : `blur(${interpolate(frame, [sec(3.4), sec(4.4)], [0, 1.6], clamp)}px)` }}>
              <Handwrite text={`☐  ${t}`} start={16 + i * 9} cps={18} size={40} color="#3b3532" />
            </div>
          ))}
        </AbsoluteFill>
      </Cam>
    </World>
  );
};
const PL = { x: 250, y: 260, rot: -3 }; // posisi halaman planner (disetel ke gambar)

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGS", "SEP", "OKT", "NOV", "DES"];
const S09: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S09");
  const per = Math.floor((d - sec(1.0)) / 12);
  return (
    <World kind="P">
      <Cam keys={[[0, { s: 1.0 }], [d, { s: 1.08 }]]}>
        <Layer src={a("P_desk_clean.png")} depth={0.1} style={{ filter: "blur(10px)" }} />
        {MONTHS.map((m, i) => {
          const st = i * per;
          const p = interpolate(frame, [st, st + sec(0.75)], [0, 1], { ...clamp, easing: Easing2 });
          if (frame < st - 2) {
            return null;
          }
          const z = 0.9 + p * 1.6;
          const x = 960 + (random(`mx${i}`) < 0.5 ? -1 : 1) * (300 + random(`mx2${i}`) * 700) * p;
          const y = 560 + (random(`my${i}`) - 0.5) * 700 * p;
          const rot = (random(`mr${i}`) - 0.5) * 70 * p;
          const top = i === Math.min(11, Math.floor(frame / per));
          return (
            <div key={m} style={{ position: "absolute", left: x - 230 * z, top: y - 230 * z, width: 460 * z, height: 460 * z, rotate: `${rot}deg`, opacity: p > 0.92 ? 1 - (p - 0.92) / 0.08 : 1, zIndex: 20 - i }}>
              <Img src={a("paper.png")} style={{ width: "100%", height: "100%", filter: "sepia(0.25) brightness(0.98)", boxShadow: "0 18px 40px rgba(40,50,55,0.25)" }} />
              <div style={{ position: "absolute", top: "5%", left: "12%", right: "12%", display: "flex", justifyContent: "space-between" }}>{new Array(9).fill(0).map((_, h) => <div key={h} style={{ width: 16 * z, height: 16 * z, borderRadius: "50%", background: "rgba(90,95,100,0.55)" }} />)}</div>
              <div style={{ position: "absolute", top: "13%", left: 0, right: 0, height: 3 * z, background: "rgba(150,70,60,0.35)" }} />
              <div style={{ position: "absolute", top: "30%", width: "100%", textAlign: "center", fontFamily: HAND, fontWeight: 700, fontSize: 120 * z, color: top ? "#5b4a42" : "#7c6d65" }}>{m}</div>
            </div>
          );
        })}
      </Cam>
    </World>
  );
};

const S10: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S10");
  const run = (i: number) => interpolate(frame, [sec(0.2 + i * 0.5), sec(3.6 + i * 0.5)], [-300, 2300], clamp);
  return (
    <World kind="P">
      <Cam keys={[[0, { s: 1.25, x: 380 }], [sec(3.4), { s: 1.25, x: -260 }], [sec(3.5), { s: 1.0, x: 0 }], [d, { s: 0.97 }]]} easing={ease}>
        <Layer src={a("P_track_clean.png")} depth={0.1} />
        <Sprite src={a("sil_run_toga.png")} x={run(0)} y={1000} h={480} depth={0.6} boil={2} />
        <Sprite src={a("sil_run_lanyard.png")} x={run(1) - 200} y={1010} h={490} depth={0.6} boil={2} />
        <Sprite src={a("sil_run_couple.png")} x={run(2) - 400} y={1000} h={470} depth={0.6} boil={2} />
        <Sprite src={a("ch_stand.png")} x={960} y={985} h={560} depth={0.5} />
      </Cam>
    </World>
  );
};

const S11: React.FC = () => {
  const frame = useCurrentFrame();
  const f = twos(frame);
  const word = "aku...";
  const typeStart = sec(0.9);
  const delStart = sec(1.9);
  let n = Math.max(0, Math.min(word.length, Math.floor((f - typeStart) / 3)));
  if (f > delStart) n = Math.max(0, word.length - Math.floor((f - delStart) / 2));
  const flip = interpolate(frame, [sec(2.45), sec(2.85)], [0, 1], { ...clamp, easing: ease });
  const dim = interpolate(frame, [sec(2.6), sec(2.9)], [0, 1], clamp);
  return (
    <World kind="P" bloom={0.25}>
      <AbsoluteFill style={{ background: "#c7cec9" }} />
      <AbsoluteFill
        style={{
          scale: String(interpolate(frame, [0, dur("S11")], [1.62, 1.7], clamp)),
          translate: `-70px ${interpolate(frame, [0, dur("S11")], [215, 225], clamp)}px`,
        }}
      >
        <AbsoluteFill style={{ translate: `0px ${flip * 900}px`, rotate: `${flip * 8}deg` }}>
          <Img src={a("P_hand_phone.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", left: PH.x, top: PH.y, width: PH.w, height: PH.h, borderRadius: 26, overflow: "hidden" }}>
            <WAChat typed={word.slice(0, n)} caretOn={Math.floor(f / 8) % 2 === 0} dim={dim} w={PH.w} h={PH.h} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </World>
  );
};
const PH = { x: 836, y: 120, w: 328, h: 668 }; // layar HP (disetel ke gambar)

const S12: React.FC = () => {
  const frame = useCurrentFrame();
  const f = twos(frame);
  const step = f > sec(1.2);
  const walk = interpolate(frame, [sec(1.2), dur("S12")], [0, 1], clamp);
  return (
    <World kind="P">
      <Cam keys={[[0, { s: 1.0 }], [dur("S12"), { s: 1.12, y: -10 }]]}>
        <Layer src={a("P_alley_clean.png")} depth={0.2} />
        <Sils items={[{ src: "sil_stand_2.png", x: 1060, y: 640, h: 170, d: 0.2 }, { src: "sil_stand_4.png", x: 1150, y: 645, h: 180, d: 0.2, inF: 8 }]} opacity={0.65} />
        <Sprite src={a(step ? "ch_back_2.png" : "ch_back_1.png")} x={step ? 1000 + walk * 30 : 1000} y={1120 - walk * 120} h={940 - walk * 300} depth={0.7} />
      </Cam>
    </World>
  );
};

const S13: React.FC = () => (
  <World kind="P">
    <Cam keys={[[0, { s: 1.04, x: 20 }], [dur("S13"), { s: 1.0, x: -20 }]]}>
      <Layer src={a("P_counter.png")} depth={0.5} boil={0.6} />
    </Cam>
  </World>
);

const S14: React.FC = () => (
  <World kind="P">
    <Cam keys={[[0, { s: 1.0 }], [dur("S14"), { s: 1.08, x: -30, y: 10 }]]}>
      <Layer src={a("P_corner_ots.png")} depth={0.5} />
    </Cam>
  </World>
);

const S15: React.FC = () => {
  const frame = useCurrentFrame();
  const ap = interpolate(frame, [0, dur("S15")], [0, 1], { ...clamp, easing: ease });
  return (
    <World kind="P" bloom={0.35}>
      <Cam keys={[[0, { s: 1.0 }], [dur("S15"), { s: 1.18, y: 30 }]]}>
        <Layer src={a("P_table_front.png")} depth={0.4} />
        <Sils
          approach={ap}
          items={[
            { src: "sil_stand_1.png", x: 200, y: 1100, h: 980, d: 0.7 },
            { src: "sil_stand_2.png", x: 470, y: 960, h: 700, d: 0.6, inF: 8 },
            { src: "sil_stand_3.png", x: 1450, y: 960, h: 720, d: 0.6, inF: 16 },
            { src: "sil_stand_4.png", x: 1730, y: 1100, h: 1000, d: 0.7, inF: 24 },
          ]}
          opacity={0.88}
        />
      </Cam>
    </World>
  );
};

/** Gelembung pecah: gelas terkunci, berkedip P/N 2–7 frame, mendarat di N. */
const S16: React.FC = () => {
  const frame = useCurrentFrame();
  const bumpEnd = sec(0.45);
  const pattern = [3, 2, 4, 2, 5, 3, 7]; // panjang tiap kedip
  let acc = bumpEnd;
  let world: "P" | "N" = "P";
  if (frame >= bumpEnd) {
    world = "N";
    for (let i = 0; i < pattern.length; i++) {
      if (frame < acc + pattern[i]) {
        world = i % 2 === 0 ? "N" : "P";
        break;
      }
      acc += pattern[i];
    }
  }
  const showBump = frame < bumpEnd;
  const shake = frame >= bumpEnd && frame < bumpEnd + 6 ? (random(`sh${frame}`) - 0.5) * 16 : 0;
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.6}px` }}>
      {showBump ? (
        <World kind="P">
          <Cam keys={[[0, { s: 1.05 }], [bumpEnd, { s: 1.0 }]]}>
            <Layer src={a("P_bump.png")} depth={0.5} />
          </Cam>
        </World>
      ) : (
        <World kind={world}>
          <Layer src={a(world === "P" ? "P_cup_tip.png" : "N_cup_tip.png")} depth={0.5} />
        </World>
      )}
      {/* cincin gelembung pecah di frame pertama kedipan */}
      <Sequence from={bumpEnd} durationInFrames={10} layout="none">
        <PopRing />
      </Sequence>
      {/* flash negatif 1 frame (satu-satunya di video) */}
      {frame === bumpEnd && <AbsoluteFill style={{ backdropFilter: "invert(1)", background: "rgba(255,255,255,0.05)" }} />}
    </AbsoluteFill>
  );
};
const PopRing: React.FC = () => {
  const frame = useCurrentFrame();
  const r = interpolate(frame, [0, 10], [200, 1400], { ...clamp, easing: easeOut });
  const o = interpolate(frame, [0, 10], [0.8, 0], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `${10 - frame}px solid rgba(255,250,240,${o})`, boxShadow: `0 0 60px rgba(255,240,220,${o})` }} />
      {new Array(14).fill(0).map((_, i) => {
        const ang = (i / 14) * Math.PI * 2;
        const rr = r * (0.8 + random(`pr${i}`) * 0.3);
        return <div key={i} style={{ position: "absolute", left: 960 + Math.cos(ang) * rr, top: 540 + Math.sin(ang) * rr, width: 14, height: 14, borderRadius: "50%", background: `rgba(255,250,240,${o})` }} />;
      })}
    </AbsoluteFill>
  );
};

const S17: React.FC = () => (
  <World kind="N">
    <Cam keys={[[0, { s: 1.06 }], [dur("S17"), { s: 1.0 }]]}>
      <Layer src={a("N_spill.png")} depth={0.5} boil={0.8} />
    </Cam>
  </World>
);
const S18: React.FC = () => (
  <World kind="N">
    <Cam keys={[[0, { s: 1.0 }], [dur("S18"), { s: 1.04 }]]}>
      <Layer src={a("N_two_laugh.png")} depth={0.5} boil={0.8} />
    </Cam>
  </World>
);
const S19: React.FC = () => (
  <World kind="N">
    <Cam keys={[[0, { s: 1.0 }], [dur("S19"), { s: 1.06, x: 20 }]]}>
      <Layer src={a("N_ots_her.png")} depth={0.5} boil={0.8} />
    </Cam>
  </World>
);

/** Dua planner, baris yang sama dicoret bersama. */
const PP = { lx: 215, rx: 1375, y: 292, w: 320 }; // area halaman (disetel ke gambar)
const PlannerPages: React.FC<{ strike?: number; tagline?: number }> = ({ strike, tagline }) => (
  <>
    {[PP.lx, PP.rx].map((x, k) => (
      <div key={k} style={{ position: "absolute", left: x, top: PP.y, width: PP.w, rotate: k ? "2deg" : "-2deg" }}>
        {(k === 0 ? LIST : ["Baca 12 buku", "Kenalan sama orang baru", "Belajar masak", "Tidur sebelum jam 12"]).map((t, i) => {
          const hit = t === "Kenalan sama orang baru";
          return (
            <div key={i} style={{ position: "relative", fontFamily: HAND, fontSize: 31, color: k ? "#2f3a33" : "#3a2a22", lineHeight: "44px", opacity: k === 0 && !hit ? 0.7 : 1 }}>
              {t}
              {hit && strike !== undefined && (
                <div style={{ position: "absolute", left: -6, top: 16 }}>
                  <Strike w={t.length * 13} start={strike + k * 3} dur={10} seed={`k${k}`} thick={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    ))}
    {tagline !== undefined && (
      <div style={{ position: "absolute", left: 1035, top: 360, width: 300, rotate: "-3deg" }}>
        <Handwrite text={"Setiap Fore\nPunya Cerita"} start={tagline} cps={15} size={56} color="#2a2421" />
      </div>
    )}
  </>
);
const S20: React.FC = () => (
  <World kind="N" bloom={0.18}>
    <Cam keys={[[0, { s: 1.05 }], [dur("S20"), { s: 1.0 }]]}>
      <Layer src={a("N_two_planners.png")} depth={0.5} />
      <PlannerPages strike={sec(0.5)} />
    </Cam>
  </World>
);

const S21: React.FC = () => {
  const frame = useCurrentFrame();
  const silO = interpolate(frame, [sec(0.2), sec(0.6), sec(1.3)], [0, 0.75, 0], clamp);
  return (
    <World kind="N">
      <Cam keys={[[0, { s: 1.12 }], [dur("S21"), { s: 1.0, y: 10 }]]}>
        <Layer src={a("N_bench_crowd.png")} depth={0.5} boil={0.8} />
        <Sils
          items={[
            { src: "sil_stand_1.png", x: 300, y: 1080, h: 820, d: 0.5 },
            { src: "sil_stand_2.png", x: 620, y: 1000, h: 640, d: 0.5 },
            { src: "sil_stand_3.png", x: 1320, y: 1000, h: 660, d: 0.5 },
            { src: "sil_stand_4.png", x: 1640, y: 1080, h: 840, d: 0.5 },
          ]}
          opacity={silO}
        />
      </Cam>
    </World>
  );
};
const S22: React.FC = () => (
  <World kind="N" bloom={0.18}>
    <Cam keys={[[0, { s: 1.0 }], [dur("S22"), { s: 1.04 }]]}>
      <Layer src={a("N_two_planners.png")} depth={0.5} />
      <PlannerPages strike={-30} tagline={2} />
    </Cam>
  </World>
);

export const Fore: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Shot id="S01"><S01 /></Shot>
    <Shot id="S02"><S02 /></Shot>
    <Shot id="S03"><S03 /></Shot>
    <Shot id="S04"><S04 /></Shot>
    <Shot id="S05"><S05 /></Shot>
    <Shot id="S06"><S06 /></Shot>
    <Shot id="S07"><S07 /></Shot>
    <Shot id="S08"><S08 /></Shot>
    <Shot id="S09"><S09 /></Shot>
    <Shot id="S10"><S10 /></Shot>
    <Shot id="S11"><S11 /></Shot>
    <Shot id="S12"><S12 /></Shot>
    <Shot id="S13"><S13 /></Shot>
    <Shot id="S14"><S14 /></Shot>
    <Shot id="S15"><S15 /></Shot>
    <Shot id="S16"><S16 /></Shot>
    <Shot id="S17"><S17 /></Shot>
    <Shot id="S18"><S18 /></Shot>
    <Shot id="S19"><S19 /></Shot>
    <Shot id="S20"><S20 /></Shot>
    <Shot id="S21"><S21 /></Shot>
    <Shot id="S22"><S22 /></Shot>
    <Audio src={staticFile("audio/mix.wav")} />
  </AbsoluteFill>
);
