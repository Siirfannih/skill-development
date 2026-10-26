import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Abs, C, Cam, MB, shake, MONO, Rise, SANS, SERIF, eIn, eIO, eOut, k, kk, wf, Vignette } from "./lib";
import { CH, Dot, Tag, X, Y, areaOf, kemampuan, pathOf, selera } from "./Chart";

// S1 — hitam: grafik editorial selera (solid) vs kemampuan (putus-putus), area = jarak.
//      → kamera menyelam ke dalam jarak → putih: Ira Glass, "the gap." → whip ke S2.
export const S1_END = () => wf("c02", "Bertahun") + 3;

export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const fAda = wf("c01", "Ada");
  const fJarak = wf("c01", "jarak");
  const fAntara = wf("c01", "antara");
  const fSel = wf("c01", "seleramu");
  const fKem = wf("c01", "kemampuan");
  const fIra = wf("c01", "Ira");
  const fGlass = wf("c01", "Glass");
  const fThe = wf("c01", "the");
  const fGap = wf("c01", "gap");
  const fEnd = S1_END();

  // ---- chart part
  const axes = k(f, [0, 16], [0, 1], eOut);
  const drawSel = k(f, [fSel, fSel + 22], [0, 1], eIO);
  const drawKem = k(f, [fKem, fKem + 18], [0, 1], eIO); // v14: VO 5% faster + tighter pause → beats compressed
  const area = k(f, [fKem + 10, fKem + 22], [0, 1], eIO);
  const tGap = 0.62;
  const dive = k(f, [fIra - 10, fIra + 6], [0, 1], eIn);
  const gapCx = X(tGap);
  const gapCy = (Y(selera(tGap)) + Y(kemampuan(tGap))) / 2;
  // Irfan 15:49 / v10: the camera rides the line being drawn (close), whips to the second line, then pulls back.
  const cam1 = (ff: number) => {
    const dS = k(ff, [fSel, fSel + 22], [0, 1], eIO);
    const dK = k(ff, [fKem, fKem + 18], [0, 1], eIO);
    const sx = X(Math.max(0.04, dS)), sy = Y(selera(Math.max(0.04, dS)));
    const kx = X(Math.max(0.04, dK)), ky = Y(kemampuan(Math.max(0.04, dK)));
    const a = k(ff, [fKem - 3, fKem + 4], [0, 1], eIO);
    const b = k(ff, [fKem + 14, fKem + 25], [0, 1], eIO);
    const zx = sx + (kx - sx) * a;
    const zy = sy + (ky - sy) * a;
    return { fx: zx + (960 - zx) * b, fy: zy + (560 - zy) * b, s: 2.2 - 1.2 * b };
  };
  const c1 = cam1(f);
  const c1p = cam1(f - 1);
  const s0 = c1.s;
  const camS = s0 * (1 + dive * dive * 16);
  const fx = c1.fx;
  const fy = c1.fy;
  const camX = dive > 0 ? (960 - gapCx) * (camS - 1) * Math.min(1, 0.4 + dive) : (960 - fx) * camS;
  const camY = dive > 0 ? (540 - gapCy) * (camS - 1) * Math.min(1, 0.4 + dive) : (540 - fy) * camS;
  const camVX = dive > 0 ? 0 : ((960 - fx) * camS - (960 - c1p.fx) * c1p.s) / camS;
  const camVY = dive > 0 ? 0 : ((540 - fy) * camS - (540 - c1p.fy) * c1p.s) / camS;
  const chartOn = f < fIra + 7;
  const whiteFlood = k(f, [fIra - 2, fIra + 6], [0, 1], eIn);

  // ---- Ira part (white)
  const land = k(f, [fIra + 6, fIra + 22], [1.12, 1], eOut);
  const truck = kk(f, [
    [fIra + 6, 40],
    [fThe - 4, 40],
    [fThe + 10, -60],
  ], eIO);
  const whip = k(f, [fEnd - 9, fEnd], [0, 1], eIn);
  const whipV = -1700 * (whip - k(f - 1, [fEnd - 9, fEnd], [0, 1], eIn));

  if (f < fSel) {
    // v10 hook: the two words are pushed apart by the gap itself, a measuring line draws between them.
    const open = k(f, [fJarak + 3, fJarak + 14], [0, 1], (t) => 1 - Math.pow(1 - t, 4));
    const gapHalf = 40 + 360 * open;
    const lineIn = k(f, [fJarak + 6, fJarak + 16], [0, 1], eOut);
    const [sx, sy] = shake(f, fJarak + 4, 10, 6);
    return (
      <Cam bg={C.black} x={sx} y={sy} s={1 + 0.06 * k(f, [0, fSel], [0, 1])}>
        <Vignette dark />
        {f < fAda + 4 && (
          <div style={{ position: "absolute", left: 960 - 360 * k(f, [0, 10], [0.05, 1], eOut) * (1 - k(f, [fAda - 2, fAda + 4], [0, 1], eIn)), top: 539, height: 3, background: C.white, width: 720 * k(f, [0, 10], [0.05, 1], eOut) * (1 - k(f, [fAda - 2, fAda + 4], [0, 1], eIn)) }} />
        )}
        <Abs style={{ right: 1920 - (960 - gapHalf), top: 540, translate: "0 -50%" }}>
          <Rise text="Ada" at={fAda} size={210} weight={600} color={C.white} letterSpacing="-0.045em" />
        </Abs>
        <Abs style={{ left: 960 + gapHalf, top: 540, translate: "0 -50%" }}>
          <Rise text="jarak" at={fJarak} size={210} weight={600} color={C.white} letterSpacing="-0.045em" />
        </Abs>
        {lineIn > 0 && (
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <line x1={960 - (gapHalf - 34) * lineIn} x2={960 + (gapHalf - 34) * lineIn} y1={560} y2={560} stroke={C.white} strokeWidth={3} />
            <line x1={960 - (gapHalf - 34) * lineIn} x2={960 - (gapHalf - 34) * lineIn} y1={540} y2={580} stroke={C.white} strokeWidth={3} />
            <line x1={960 + (gapHalf - 34) * lineIn} x2={960 + (gapHalf - 34) * lineIn} y1={540} y2={580} stroke={C.white} strokeWidth={3} />
          </svg>
        )}
        <Abs style={{ left: 0, width: 1920, top: 610, display: "flex", justifyContent: "center" }}>
          <Rise text="antara" at={fAntara} size={64} weight={400} color={C.dim} letterSpacing="-0.01em" />
        </Abs>
      </Cam>
    );
  }

  if (chartOn) {
    return (
      <Cam bg={C.black} x={camX} y={camY} s={camS}>
        <Vignette dark />
        <MB id="s1cam" vx={camVX} vy={camVY} max={2.5}>
        <div style={{ position: "absolute", inset: 0 }}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="14" stroke="#FFFFFF" strokeWidth="2" opacity="0.22" />
            </pattern>
          </defs>
          <line x1={CH.x0} y1={CH.yb} x2={CH.x0 + (CH.x1 + 80 - CH.x0) * axes} y2={CH.yb} stroke={C.faint} strokeWidth={2} />
          <line x1={CH.x0} y1={CH.yb} x2={CH.x0} y2={CH.yb - (CH.yb - CH.yt + 60) * axes} stroke={C.faint} strokeWidth={2} />
          {area > 0 && <path d={areaOf(selera, kemampuan, 0.04, 0.04 + 0.96 * area)} fill="url(#hatch)" opacity={1 - whiteFlood} />}
          {whiteFlood > 0 && <path d={areaOf(selera, kemampuan, 0.04, 1)} fill={C.white} opacity={whiteFlood} />}
          {f >= fSel && (
            <path d={pathOf(selera, 0, 1)} fill="none" stroke={C.white} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - drawSel} />
          )}
          {f >= fKem && (
            <path d={pathOf(kemampuan, 0, Math.max(0.001, drawKem))} fill="none" stroke={C.dim} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
          )}
          {drawSel > 0.98 && <Dot x={X(1)} y={Y(selera(1))} />}
          {drawKem > 0.98 && <Dot x={X(1)} y={Y(kemampuan(1))} s={0.7} color="rgba(255,255,255,0.6)" />}
          {area > 0.6 && (
            <g opacity={k(f, [fKem + 16, fKem + 22], [0, 1])}>
              <line x1={gapCx} x2={gapCx} y1={Y(selera(tGap)) + 14} y2={Y(kemampuan(tGap)) - 14} stroke={C.white} strokeWidth={2} />
              <line x1={gapCx - 14} x2={gapCx + 14} y1={Y(selera(tGap)) + 14} y2={Y(selera(tGap)) + 14} stroke={C.white} strokeWidth={2} />
              <line x1={gapCx - 14} x2={gapCx + 14} y1={Y(kemampuan(tGap)) - 14} y2={Y(kemampuan(tGap)) - 14} stroke={C.white} strokeWidth={2} />
            </g>
          )}
        </svg>
        {drawSel > 0.9 && <Tag x={X(1) + 6} y={Y(selera(1))} text="SELERA" at={fSel + 18} align="r" />}
        {drawKem > 0.9 && <Tag x={X(1) + 6} y={Y(kemampuan(1))} text="KEMAMPUAN" at={fKem + 14} align="r" color={C.dim} />}
        {area > 0.6 && <Tag x={gapCx + 34} y={gapCy} text="JARAK" at={fKem + 17} dy={-26} />}
        </div>
        </MB>
      </Cam>
    );
  }

  return (
    <Cam bg={C.white} x={truck - whip * 1700} s={land}>
      <MB id="s1whip" vx={whipV} max={14}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Abs dataSubject style={{ left: 40, bottom: 0, width: 900, height: 1010, overflow: "visible" }}>
            <Img
              src={staticFile("assets/ira.png")}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: 900,
                height: 1006,
                objectFit: "contain",
                objectPosition: "50% 100%",
                scale: String(k(f, [fIra + 6, fGap + 24], [1.06, 1.0], eOut)),
                transformOrigin: "50% 100%",
              }}
            />
          </Abs>
          <Abs style={{ left: 990, top: 270, display: "flex", gap: 54, alignItems: "flex-end" }}>
            <Rise text="the" at={fThe} size={330} weight={400} font={SERIF} color={C.ink} />
            <Rise text="gap" at={fGap} size={330} weight={400} font={SERIF} color={C.ink} />
          </Abs>
          <Abs style={{ right: 1920 - 1810, top: 690 }}>
            <Rise text="Ira Glass" at={fGlass} size={64} weight={500} font={SANS} color={C.ink} letterSpacing="-0.01em" />
          </Abs>
          <Abs style={{ right: 1920 - 1810, top: 980, fontFamily: MONO, fontSize: 18, color: C.ink }}>Photo: Peabody Awards, CC BY 2.0</Abs>
        </div>
      </MB>
    </Cam>
  );
};
