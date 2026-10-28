/**
 * Fore "Kalah Lagi" v6 — klip AI (Google Flow) per shot, dirakit di atas timing lagu v5.
 * Satu tone: amber-madu + umber; bayangan dibedakan oleh cahaya (kabut emas, bloom, debu), bukan warna.
 * Teks (story IG, planner, kalender, WA, coretan, tagline) tetap dari kode supaya tajam.
 */
import React from "react";
import { AbsoluteFill, Img, interpolate, random, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio, Video } from "@remotion/media";
import { a, clamp, Dust, ease, Grain, sec, twos } from "./lib/core";
import { Handwrite, HAND, IGStory, Strike, WAChat } from "./lib/ui";
import { T, TOTAL } from "./Fore";
import { CLIPS, OV } from "./clips6";

type K = keyof typeof T;
const dur = (id: K) => sec(T[id][1]) - sec(T[id][0]);
const Shot: React.FC<{ id: K; children: React.ReactNode }> = ({ id, children }) => (
  <Sequence from={sec(T[id][0])} durationInFrames={dur(id)} name={id}>
    {children}
  </Sequence>
);

/* ---------- satu look untuk semua shot ---------- */
const Look: React.FC<{ dream?: boolean; children: React.ReactNode }> = ({ dream, children }) => (
  <AbsoluteFill style={{ background: "#1a110c" }}>
    <AbsoluteFill style={{ filter: dream ? "contrast(0.9) brightness(1.04)" : "contrast(0.94)" }}>{children}</AbsoluteFill>
    {dream && (
      <>
        <AbsoluteFill style={{ mixBlendMode: "screen", opacity: 0.22, filter: "blur(24px) brightness(0.9) contrast(1.6)" }}>{children}</AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 78% 72% at 50% 50%, rgba(255,232,196,0) 58%, rgba(255,228,188,0.34) 100%)" }} />
        <Dust color="255,226,180" opacity={0.5} />
      </>
    )}
    {!dream && <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 75% at 50% 48%, rgba(0,0,0,0) 55%, rgba(20,10,6,0.5) 100%)" }} />}
    <Grain amount={dream ? 0.24 : 0.34} />
  </AbsoluteFill>
);

/** Satu klip AI: dipotong mulai `from` detik, kecepatan `rate`, dorongan kamera halus `push` (skala akhir). */
const Clip: React.FC<{ id: string; from?: number; rate?: number; push?: number; len: number; style?: React.CSSProperties }> = ({
  id,
  from = 0,
  rate = 1,
  push = 1,
  len,
  style,
}) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, len], [1, push], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ scale: String(s), ...style }}>
      <Video src={staticFile(`ai/${CLIPS[id] ?? id}.mp4`)} trimBefore={Math.round(from * 24)} playbackRate={rate} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};
const Still: React.FC<{ id: string; style?: React.CSSProperties }> = ({ id, style }) => (
  <Img src={staticFile(`ai/${id}.jpg`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }} />
);

/* ================= SHOTS ================= */
/** Story IG di layar HP pada keyframe k01 (homografi 4 titik layar), handheld halus. */
const S01: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 560, H = 995.5;
  const hx = Math.sin(twos(frame) / 11) * 3, hy = Math.cos(twos(frame) / 13) * 2;
  return (
    <Look>
      <AbsoluteFill style={{ translate: `${hx}px ${hy}px`, scale: String(interpolate(frame, [0, dur("S01")], [1.02, 1.06], clamp)) }}>
        <Still id="k01" />
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", transform: OV.screen01, overflow: "hidden", borderRadius: 30, opacity: 0.96 }}>
          <div style={{ position: "absolute", left: -(960 - W / 2), top: -(540 - H / 2), width: 1920, height: 1080 }}>
            <IGStory
              w={W}
              per={Math.round(dur("S01") / 3)}
              stories={[
                { src: a("story_1.png"), user: "rara.anindya", ago: "2j" },
                { src: a("story_2.png"), user: "dimaspratama", ago: "5j" },
                { src: a("story_3.png"), user: "sinta.ayu", ago: "8j" },
              ]}
            />
          </div>
        </div>
      </AbsoluteFill>
    </Look>
  );
};
const S02: React.FC = () => <Look><Clip id="v02" len={dur("S02")} push={1.04} /></Look>;
/** Masuk: tetes embun = lensa; kamera menyelam ke tetes, kamar pagi memenuhi frame. */
const S03: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S03");
  const warm = interpolate(frame, [d - 8, d], [0, 1], clamp);
  return (
    <Look dream={frame > d / 2}>
      <Clip id="v03" len={d} rate={OV.v03rate} />
      <AbsoluteFill style={{ background: "#ffe6bf", opacity: warm * 0.25, mixBlendMode: "screen" }} />
    </Look>
  );
};
const S04: React.FC = () => {
  const frame = useCurrentFrame();
  const a1 = sec(2.4), a2 = sec(4.8);
  return (
    <Look dream>
      {frame < a1 ? <Clip id="v04a" len={a1} /> : frame < a2 ? (
        <Sequence from={a1} layout="none"><Clip id="v04b" len={a2 - a1} /></Sequence>
      ) : (
        <Sequence from={a2} layout="none"><Clip id="v04c" len={dur("S04") - a2} push={1.12} /></Sequence>
      )}
    </Look>
  );
};
/** Rutinitas: framing identik, ganti tempat tiap 2 ketukan (19 frame); siluet muncul 19,0 dtk. */
const S05: React.FC = () => {
  const frame = useCurrentFrame();
  const per = 19;
  const idx = Math.floor(frame / per);
  const silIn = sec(19.0 - 13.0);
  const ids = ["v05a", "v05b", "v05c", "v05d"];
  const id = frame >= silIn ? "v05e" : ids[idx % 4];
  const local = frame >= silIn ? silIn : idx * per;
  const from = frame >= silIn ? 0 : ((Math.floor(idx / 4) * per) / 24) % 3; // lanjutkan gerak klip di putaran berikutnya
  return (
    <Look dream>
      <Sequence from={local} layout="none" key={`${id}${local}`}>
        <Clip id={id} from={from} len={per} />
      </Sequence>
    </Look>
  );
};
const S06: React.FC = () => <Look dream><Clip id="v06" len={dur("S06")} /></Look>;
const S07: React.FC = () => <Look dream><Clip id="v07" len={dur("S07")} /></Look>;

const LIST = ["Olahraga rutin", "Nabung", "Lebih sering ketemu teman", "Kenalan sama orang baru", "Belajar gitar"];
const S08: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S08");
  const faded = interpolate(frame, [sec(3.4), sec(5.6)], [1, 0.45], clamp);
  const z = interpolate(frame, [0, d], [1.0, 1.45], { ...clamp, easing: ease });
  const P = OV.planner;
  return (
    <Look dream>
      <AbsoluteFill style={{ scale: String(z), transformOrigin: `${P.ox}px ${P.oy}px` }}>
        <Clip id="v08" len={d} />
        <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, rotate: `${P.rot}deg`, opacity: faded, mixBlendMode: "multiply" }}>
          <Handwrite text="Resolusi 2026" start={4} cps={16} size={P.size * 1.3} color="#2a1c14" style={{ fontWeight: 700 }} />
          {LIST.map((t, i) => (
            <div key={i} style={{ marginTop: P.size * 0.25, filter: i === 3 ? undefined : `blur(${interpolate(frame, [sec(3.4), sec(4.4)], [0, 1.6], clamp)}px)` }}>
              <Handwrite text={`☐  ${t}`} start={16 + i * 9} cps={18} size={i === 3 ? P.size * 1.12 : P.size} color={i === 3 ? "#22160f" : "#4a3a30"} style={{ fontWeight: i === 3 ? 700 : 500 }} />
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Look>
  );
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGS", "SEP", "OKT", "NOV", "DES"];
const Easing3 = (t: number) => t * t * t;
const S09: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S09");
  const per = Math.floor((d - sec(0.9)) / 12);
  return (
    <Look dream>
      <AbsoluteFill style={{ scale: String(interpolate(frame, [0, d], [1, 1.08], clamp)), filter: "blur(10px)" }}>
        <Still id="k09" />
      </AbsoluteFill>
      {MONTHS.map((m, i) => {
        const st = i * per;
        const last = i === 11;
        const p = interpolate(frame, [st, last ? d : st + sec(0.95)], [0, 1], { ...clamp, easing: Easing3 });
        if (frame < st - 2) return null;
        const z = last ? 0.55 + p * 6.5 : 0.55 + p * 3.6;
        const x = last ? 960 : 960 + (random(`mx${i}`) < 0.5 ? -1 : 1) * (200 + random(`mx2${i}`) * 900) * p * p;
        const y = last ? 540 : 540 + (random(`my${i}`) - 0.5) * 900 * p * p;
        const rot = last ? -4 * p : (random(`mr${i}`) - 0.5) * 70 * p;
        const top = i === Math.min(11, Math.floor(frame / per));
        return (
          <div key={m} style={{ position: "absolute", left: x - 230 * z, top: y - 230 * z, width: 460 * z, height: 460 * z, rotate: `${rot}deg`, opacity: last ? 1 : p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1, zIndex: last ? 40 : 20 - i, filter: `blur(${last ? Math.max(0, (p - 0.6) * 20) : Math.max(0, (p - 0.3) * 30)}px)` }}>
            <div style={{ position: "absolute", inset: 0, background: "#f1e2c8", borderRadius: 6, boxShadow: "0 18px 40px rgba(60,35,20,0.3)" }} />
            <div style={{ position: "absolute", top: "5%", left: "12%", right: "12%", display: "flex", justifyContent: "space-between" }}>{new Array(9).fill(0).map((_, h) => <div key={h} style={{ width: 16 * z, height: 16 * z, borderRadius: "50%", background: "rgba(110,80,60,0.55)" }} />)}</div>
            <div style={{ position: "absolute", top: "13%", left: 0, right: 0, height: 3 * z, background: "rgba(150,70,50,0.35)" }} />
            <div style={{ position: "absolute", top: "30%", width: "100%", textAlign: "center", fontFamily: HAND, fontWeight: 700, fontSize: 120 * z, color: top ? "#5b3f30" : "#7c6252" }}>{m}</div>
          </div>
        );
      })}
    </Look>
  );
};
const S10: React.FC = () => <Look dream><Clip id="v10" len={dur("S10")} /></Look>;
const S11: React.FC = () => {
  const frame = useCurrentFrame();
  const f = twos(frame);
  const word = "aku...";
  let n = Math.max(0, Math.min(word.length, Math.floor((f - sec(0.9)) / 3)));
  if (f > sec(1.9)) n = Math.max(0, word.length - Math.floor((f - sec(1.9)) / 2));
  const flip = interpolate(frame, [sec(2.45), sec(2.85)], [0, 1], { ...clamp, easing: ease });
  const dim = interpolate(frame, [sec(2.6), sec(2.9)], [0, 1], clamp);
  const H = OV.phone;
  return (
    <Look dream>
      <AbsoluteFill style={{ translate: `0px ${flip * 900}px`, rotate: `${flip * 8}deg` }}>
        <Clip id="v11" len={dur("S11")} />
        <div style={{ position: "absolute", left: H.x, top: H.y, width: H.w, height: H.h, borderRadius: H.r, overflow: "hidden", rotate: `${H.rot}deg` }}>
          <WAChat typed={word.slice(0, n)} caretOn={Math.floor(f / 8) % 2 === 0} dim={dim} w={H.w} h={H.h} />
        </div>
      </AbsoluteFill>
    </Look>
  );
};
const S12: React.FC = () => <Look dream><Clip id="v12" len={dur("S12")} /></Look>;
const S13: React.FC = () => <Look dream><Clip id="v13" len={dur("S13")} push={1.08} /></Look>;
const S14: React.FC = () => <Look dream><Clip id="v14" len={dur("S14")} push={1.04} /></Look>;
const S15: React.FC = () => <Look dream><Clip id="v15" len={dur("S15")} push={1.1} /></Look>;
/** Keluar: tetes yang sama, isinya meja bayangan; senggolan → tetes pecah; 1 frame negatif saat pecah. */
const S16: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = sec(OV.popAt);
  const shake = frame >= pop && frame < pop + 6 ? (random(`sh${frame}`) - 0.5) * 16 : 0;
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.6}px` }}>
      <Look>
        <Clip id="v16" len={dur("S16")} rate={OV.v16rate} />
      </Look>
      {frame === pop && <AbsoluteFill style={{ backdropFilter: "invert(1)" }} />}
    </AbsoluteFill>
  );
};
const S17: React.FC = () => {
  const L = OV.spill;
  return (
    <Look>
      <Clip id="v17" len={dur("S17")} />
      <div style={{ position: "absolute", left: L.x, top: L.y, rotate: `${L.rot}deg`, mixBlendMode: "multiply", opacity: 0.8 }}>
        <div style={{ fontFamily: HAND, fontWeight: 700, fontSize: L.size * 1.3, color: "#2a1d16" }}>Resolusi 2026</div>
        {LIST.map((t, i) => (
          <div key={i} style={{ fontFamily: HAND, fontSize: L.size, lineHeight: `${L.size * 1.45}px`, color: "#2a1d16", opacity: i === 3 ? 1 : 0.8 }}>☐  {t}</div>
        ))}
      </div>
    </Look>
  );
};
const S18: React.FC = () => <Look><Clip id="v18" len={dur("S18")} /></Look>;
const S19: React.FC = () => <Look><Clip id="v19" len={dur("S19")} push={1.04} /></Look>;
const S20: React.FC = () => {
  const frame = useCurrentFrame();
  const d = dur("S20");
  const P = OV.planners;
  const z = interpolate(frame, [0, d], [1.0, 1.35], { ...clamp, easing: ease });
  const right = ["Baca 12 buku", "Kenalan sama orang baru", "Belajar masak", "Tidur sebelum jam 12"];
  return (
    <Look>
      <AbsoluteFill style={{ scale: String(z), transformOrigin: `${P.ox}px ${P.oy}px` }}>
        <Clip id="v20" len={d} />
        {[P.l, P.r].map((pg, k) => (
          <div key={k} style={{ position: "absolute", left: pg.x, top: pg.y, width: pg.w, rotate: `${pg.rot}deg`, mixBlendMode: "multiply" }}>
            {(k === 0 ? LIST : right).map((t, i) => {
              const hit = t === "Kenalan sama orang baru";
              return (
                <div key={i} style={{ position: "relative", fontFamily: HAND, fontSize: P.size, color: "#2e2018", lineHeight: `${P.size * 1.42}px`, opacity: k === 0 && !hit ? 0.75 : 1 }}>
                  {t}
                  {hit && (
                    <div style={{ position: "absolute", left: -6, top: P.size * 0.5 }}>
                      <Strike w={t.length * P.size * 0.42} start={sec(0.5) + k * 3} dur={10} seed={`k${k}`} thick={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </AbsoluteFill>
    </Look>
  );
};
const S21: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Look>
      <Clip id="v21" len={dur("S21")} rate={OV.v21rate} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,6,4,0) 55%, rgba(10,6,4,0.5) 100%)", opacity: interpolate(frame, [sec(1.1), sec(1.8)], [0, 1], clamp) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 735, textAlign: "center", rotate: "-2deg" }}>
        <Handwrite text="Setiap Fore Punya Cerita" start={sec(1.3)} cps={20} size={104} color="#fff3e2" style={{ fontWeight: 700, textShadow: "0 2px 18px rgba(0,0,0,0.5)" }} />
      </div>
    </Look>
  );
};

export const Fore6: React.FC = () => (
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
    <Audio src={staticFile("audio/mix.wav")} />
  </AbsoluteFill>
);
export const TOTAL6 = TOTAL;
