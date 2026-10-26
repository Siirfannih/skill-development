import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Abs, C, Cam, MONO, Statement, eIn, eIO, eOut, k, kk, wf, Vignette } from "./lib";
import { CH, Dot, Tag, X, Y, areaOf, kemampuan, pathOf, selera } from "./Chart";

// S4 — hitam, grafik lagi: banyak karya → kurva kemampuan naik menutup jarak → reveal-out: ribuan titik
//      identik → lensa mencari satu yang dikecewai, kosong → tiga titik tersisa → banjir putih.
export const S4_START = () => wf("c06", "Ira") - 1;
export const S4_END = () => wf("c07", "Karena") + 8;
export const TRI_X = [610, 960, 1310];
export const TRI_Y = 540;
export const CARD_W = 300;
export const CARD_H = 400;

export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const fIra = wf("c06", "Ira");
  const fGlass = wf("c06", "Glass");
  const fBilang = wf("c06", "bilang");
  const fJarak = wf("c06", "jarak");
  const fBanyak = wf("c06", "banyak");
  const fKarya = wf("c06", "karya");
  const fAI = wf("c06", "AI");
  const fMemberi = wf("c06", "memberimu");
  const fRibuan = wf("c06", "ribuan");
  const fTapi = wf("c06", "Tapi");
  const fTidak = wf("c06", "tidak");
  const fPun = wf("c06", "pun");
  const fKamu = wf("c06", "kamu");
  const fKecewa = wf("c06", "kecewa");
  const fKarena = wf("c07", "Karena");
  const fEnd = S4_END();

  // many works close the gap
  const prog = k(f, [fJarak - 4, fKarya + 8], [0, 1], (t) => Math.pow(t, 1.8));
  const NW = 64;
  const n = Math.floor(prog * NW);
  const close = k(f, [fJarak, fKarya + 14], [0, 1], eIO);
  const kem2 = (t: number) => kemampuan(t) + (selera(t) - kemampuan(t)) * close * Math.min(1, t * 1.15);

  // variation vs S1/S2 charts: ride along the newest work dot (close, low), release at "karya"
  const tn = 0.05 + 0.95 * Math.min(1, prog);
  const rel = k(f, [fKarya - 2, fKarya + 14], [0, 1], eIO);
  const fs = 1 + 0.9 * (1 - rel);
  const follow = { s: fs, x: (960 - X(tn)) * (1 - rel) * fs, y: (640 - Y(kem2(tn))) * (1 - rel) * fs };

  // reveal-out (C06): chart becomes one tiny patch in a field of identical dots
  const zo = k(f, [fAI - 2, fRibuan + 8], [0, 1], eIO);
  const camS = 1 - 0.88 * zo;
  const spacing = Math.max(22, 140 * (1 - zo));
  const fieldOn = k(f, [fAI, fAI + 12], [0, 1]);

  // lens search
  const lensT = k(f, [fTidak - 4, fKecewa + 4], [0, 1], eIO);
  const lx = kk(f, [[fTidak - 4, 420], [fPun, 1480], [fKamu, 700], [fKecewa - 2, 960]], eIO);
  const ly = kk(f, [[fTidak - 4, 700], [fPun, 380], [fKamu, 760], [fKecewa - 2, 540]], eIO);
  void lensT;
  const lensR = kk(f, [
    [fTidak - 6, 0],
    [fTidak + 2, 160],
    [fKecewa + 4, 160],
    [fKecewa + 14, 0],
  ], eOut);

  // exit: field drops, three dots remain and grow into cards, white floods
  const drop = k(f, [fKarena - 26, fKarena - 10], [0, 1400], eIn);
  const grow = k(f, [fKarena - 14, fEnd], [0, 1], eIO);
  const flood = k(f, [fKarena - 6, fEnd - 1], [0, 1], eIn);

  return (
    <Cam bg={C.black}>
      <Vignette dark />
      {fieldOn > 0 && (
        <div
          style={{
            position: "absolute",
            left: -100,
            top: -100 + drop,
            width: 2120,
            height: 1280,
            opacity: fieldOn * (f >= fAI && f < fTapi ? 0.6 : 1),
            // "ribuan" = tanpa batas: a field of dots that never ends (Irfan 15:15: no literal wall, no hole)
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.55) 2.6px, transparent 3.2px)`,
            backgroundSize: `${spacing}px ${spacing}px`,
            backgroundPosition: `${960 % spacing}px ${540 % spacing}px`,
          }}
        />
      )}

      {/* chart (world) shrinking into the field */}
      {zo < 1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "960px 640px",
            transform: `scale(${camS}) translate(${follow.x}px, ${follow.y}px) scale(${follow.s})`,
            opacity: 1 - k(f, [fAI - 4, fAI + 4], [0, 1]),
          }}
        >
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <defs>
              <pattern id="hatch4" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="14" stroke="#FFFFFF" strokeWidth="2" opacity="0.18" />
              </pattern>
            </defs>
            <line x1={CH.x0} y1={CH.yb} x2={CH.x1 + 80} y2={CH.yb} stroke={C.faint} strokeWidth={2} />
            <line x1={CH.x0} y1={CH.yb} x2={CH.x0} y2={CH.yt - 60} stroke={C.faint} strokeWidth={2} />
            <path d={areaOf(selera, kem2, 0.04, 1)} fill="url(#hatch4)" />
            <path d={pathOf(selera, 0, 1)} fill="none" stroke={C.white} strokeWidth={4} strokeLinecap="round" />
            <path d={pathOf(kem2, 0, 1)} fill="none" stroke={close > 0.95 ? C.white : C.dim} strokeWidth={4} strokeDasharray={close > 0.95 ? undefined : "2 12"} strokeLinecap="round" />
            {Array.from({ length: Math.min(n, NW) }, (_, i) => {
              const t = 0.05 + (0.95 * i) / (NW - 1);
              return <circle key={i} cx={X(t)} cy={Y(kem2(t))} r={6} fill={C.white} />;
            })}
            <Dot x={X(1)} y={Y(selera(1))} />
          </svg>
          <Tag x={X(1) + 6} y={Y(selera(1))} text="SELERA" at={-20} align="r" />
          {f >= fBanyak - 1 && <Tag x={X(0.55)} y={Y(kem2(0.55))} text="BANYAK KARYA" at={fBanyak} dy={30} />}
        </div>
      )}

      {/* text-led beats, centred */}
      {f < fJarak - 1 && (
        <div style={{ position: "absolute", inset: 0, background: C.black }}>
          <Statement size={150} lines={[[{ t: "Ira", at: fIra + 1 }, { t: "Glass", at: fGlass }, { t: "bilang,", at: fBilang, weight: 400, color: C.dim }]]} />
        </div>
      )}
      {f >= fAI - 1 && f < fTapi && (
        <Statement
          y={640}
          out={fTapi - 8}
          lines={[[{ t: "AI", at: fAI, size: 84, weight: 400, color: C.dim }, { t: "memberimu", at: fMemberi, size: 84, weight: 400, color: C.dim }], [{ t: "ribuan.", at: fRibuan, size: 230 }]]}
        />
      )}
      {f >= fKecewa - 2 && f < fKarena - 12 && (
        <Abs style={{ left: 960, top: 760, translate: "-50% 0", padding: "16px 30px", borderRadius: 999, background: "rgba(10,10,10,0.88)", fontFamily: MONO, fontSize: 40, color: C.white, letterSpacing: "0.06em", opacity: k(f, [fKecewa, fKecewa + 6], [0, 1]), scale: String(k(f, [fKecewa, fKecewa + 8], [0.9, 1], eOut)) }}>
          0 YANG MENGECEWAKAN
        </Abs>
      )}

      {lensR > 1 && (
        <Abs style={{ left: 0, top: 0, width: 1920, height: 1080, background: `radial-gradient(circle ${lensR}px at ${lx}px ${ly + drop}px, rgba(10,10,10,0) 98%, rgba(10,10,10,0.62) 100%)` }} />
      )}
      {lensR > 1 && (
        <Abs
          style={{
            left: lx - lensR,
            top: ly - lensR + drop,
            width: lensR * 2,
            height: lensR * 2,
            borderRadius: "50%",
            border: "6px solid #FFFFFF", boxShadow: "0 0 40px rgba(0,0,0,0.5)",
          }}
        />
      )}

      {flood > 0 && (
        <Abs style={{ left: 960 - 1300 * flood, top: 540 - 1300 * flood, width: 2600 * flood, height: 2600 * flood, borderRadius: "50%", background: C.white }} />
      )}

      {f >= fKarena - 26 &&
        TRI_X.map((x, i) => {
          const w = 10 + (CARD_W - 10) * grow;
          const h = 10 + (CARD_H - 10) * grow;
          return (
            <Abs
              key={i}
              dataSubject
              style={{
                left: x - w / 2,
                top: TRI_Y - h / 2,
                width: w,
                height: h,
                borderRadius: Math.min(w / 2, 5 + 23 * grow),
                overflow: "hidden",
                background: C.white,
                boxSizing: "border-box",
              }}
            >
              <Img src={staticFile(`assets/${["p_sketchbook.jpg", "p_sketch.jpg", "p_laptop.jpg"][i]}`)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: grow }} />
            </Abs>
          );
        })}
    </Cam>
  );
};

export const _s4 = [eIn];
