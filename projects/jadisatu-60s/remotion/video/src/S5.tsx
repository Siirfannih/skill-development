import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Direction as DirArt, Draft } from "./S5Art";
import { Fit, KopiLanding } from "./Designs";
import { Abs, C, Cam, MB, Rise, SANS, eIn, eIO, eOut, k, kk, rnd, wf, Vignette } from "./lib";
import { CARD_H, CARD_W, TRI_X, TRI_Y } from "./S4";

// S5 — putih → navy. Tiga kartu (01 biru: warna pertama) → Pengalaman (percobaan dicoret) → Direction (pilih satu, buang sisanya) → Cara melihat (lensa menemukan yang miring).
export const S5_START = () => wf("c07", "Karena") + 7;
export const S5_END = () => wf("c08", "Rick") + 1;
export const LENS_END = { x: 1400, y: 540, r: 430 };

export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const fKarena = wf("c07", "Karena");
  const fTiga = wf("c07", "tiga");
  const fHal = wf("c07", "hal");
  const fTidak = wf("c07", "tidak");
  const fPeng = wf("c07", "Pengalaman");
  const fSemua = wf("c07", "semua");
  const fGagal = wf("c07", "gagal");
  const fDir = wf("c07", "Direction");
  const fMemilih = wf("c07", "memilih");
  const fSatu = wf("c07", "satu");
  const fMembuang = wf("c07", "membuang");
  const fCara = wf("c07", "Cara");
  const fTahu = wf("c07", "tahu");
  const fSalah = wf("c07", "salah");
  const fRick = wf("c08", "Rick");

  // phases
  const P1 = f < fPeng; // three cards
  const P2 = f >= fPeng && f < fDir; // attempts
  const P3 = f >= fDir && f < fCara; // direction
  const P4 = f >= fCara; // cara melihat (navy)

  // --- P1 camera: dive into card 01
  const dive1 = k(f, [fPeng - 14, fPeng], [0, 1], eIn);
  const s1 = 1 + dive1 * dive1 * 7;
  const c1x = (960 - TRI_X[0]) * (s1 - 1);
  const c1y = (540 - TRI_Y) * (s1 - 1);

  // --- P2 camera: pull out of the blue square (last attempt)
  const SQ = 150;
  const GAPX = 180;
  const ROWX = 960 - (8 * GAPX - (GAPX - SQ)) / 2;
  const ROWY = 250;
  const blueCx = ROWX + 7 * GAPX + SQ / 2;
  const blueCy = ROWY + SQ / 2;
  const land2 = k(f, [fPeng, fPeng + 20], [1, 0], eOut);
  const s2 = 1 + 9 * land2;
  const c2x = (960 - blueCx) * (s2 - 1);
  const c2y = (540 - blueCy) * (s2 - 1);
  const whip = k(f, [fDir - 8, fDir], [0, 1], eIn);
  const whipIn = k(f, [fDir, fDir + 10], [1, 0], eOut);

  // --- P3 → P4 flood from centre card
  const flood = k(f, [fCara - 14, fCara], [0, 1], eIn);

  // --- P4 lens
  const LAND = { x: 960 - 720 * 0.72, y: 70, s: 0.72 };
  const ZOOM = 2.2;
  const toRick = k(f, [fRick - 12, fRick], [0, 1], eIO); // v15: shorter empty-lens hold
  const BTN = { x: LAND.x + 330 * LAND.s, y: LAND.y + 742 * LAND.s }; // "Arah ke kedai" (faulty)
  const lpx = kk(f, [[fCara + 2, LAND.x + 1000 * LAND.s], [fTahu - 4, LAND.x + 300 * LAND.s], [fSalah - 2, BTN.x]], eIO);
  const lpy = kk(f, [[fCara + 2, LAND.y + 450 * LAND.s], [fTahu - 4, LAND.y + 380 * LAND.s], [fSalah - 2, BTN.y]], eIO);
  const lx = lpx * (1 - toRick) + LENS_END.x * toRick;
  const ly = lpy * (1 - toRick) + LENS_END.y * toRick;
  const lr = 150 * (1 - toRick) + LENS_END.r * toRick;

  let camX = 0;
  let camY = 0;
  let camS = 1;
  if (P1) {
    camX = c1x;
    camY = c1y;
    camS = s1;
  } else if (P2) {
    // v10: after landing, ride along the drafts as each gets crossed out, ending on the good one
    const zT = k(f, [fSemua - 6, fSemua + 4], [0, 1], eIO);
    const ti = k(f, [fSemua + 4, fGagal + 10], [0, 7], eIO);
    const tfx = ROWX + ti * GAPX + SQ / 2;
    const sT = 2.4;
    camS = s2 * (1 + (sT - 1) * zT);
    camX = c2x * (1 - zT) + (960 - tfx) * camS * zT - whip * 1900;
    camY = c2y * (1 - zT) + (540 - 300) * camS * zT;
  } else if (P3) {
    const zD = k(f, [fMemilih - 4, fSatu + 8], [0, 1], eIO);
    camS = 1 + 0.45 * zD;
    camX = whipIn * 1900;
    camY = (540 - 300) * camS * zD;
  } else if (P4) {
    const zC = k(f, [fTahu - 6, fSalah + 6], [0, 1], eIO) * (1 - toRick);
    camS = 1 + 0.4 * zC;
    camX = (960 - lx) * camS * zC;
    camY = (540 - ly) * camS * zC;
  }
  const camV = P2 ? -1900 * (whip - k(f - 1, [fDir - 8, fDir], [0, 1], eIn)) : P3 ? 1900 * (whipIn - k(f - 1, [fDir, fDir + 10], [1, 0], eOut)) : 0;

  return (
    <Cam bg={P4 ? C.g4 : C.white} x={camX} y={camY} s={camS}>
      <Vignette />
      <MB id="s5whip" vx={camV} max={30}>
        <div style={{ position: "absolute", inset: 0 }}>
          {P1 && (
            <>
              {TRI_X.map((x, i) => {
                const fill = i === 0 ? k(f, [fHal, fHal + 8], [0, 1], eOut) : 0;
                const lift = k(f, [fKarena + 4 + i * 5, fKarena + 16 + i * 5], [0, 1], eOut);
                return (
                  <Abs
                    key={i}
                    dataSubject
                    style={{
                      left: x - CARD_W / 2,
                      top: TRI_Y - CARD_H / 2 - 20 * lift,
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: 28,
                      boxSizing: "border-box",
                      overflow: "hidden",
                      outline: fill > 0.5 ? `6px solid ${C.blue}` : "none",
                      outlineOffset: 6,
                      boxShadow: lift > 0 ? `0 ${30 * lift}px ${60 * lift}px rgba(15,23,42,${0.06 * lift})` : "none",
                    }}
                  >
                    <Img src={staticFile(`assets/${["p_sketchbook.jpg", "p_sketch.jpg", "p_laptop.jpg"][i]}`)} style={{ position: "absolute", inset: 0, width: CARD_W, height: CARD_H, objectFit: "cover", filter: `grayscale(${1 - fill}) contrast(1.05)`, opacity: 0.4 + 0.6 * lift }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55))" }} />
                    <div
                      data-text={`0${i + 1}`}
                      style={{
                        position: "absolute",
                        left: 28,
                        bottom: 22,
                        fontFamily: SANS,
                        fontSize: 56,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        color: C.white,
                        opacity: lift,
                      }}
                    >
                      0{i + 1}
                    </div>
                  </Abs>
                );
              })}
              {f < fTidak + 2 && (
                <Abs style={{ left: 0, width: 1920, top: 120, display: "flex", justifyContent: "center", gap: 26 }}>
                  <Rise text="tiga" at={fTiga} out={fTidak - 6} size={96} weight={600} color={C.ink} />
                  <Rise text="hal" at={fHal} out={fTidak - 5} size={96} weight={600} color={C.blue} />
                </Abs>
              )}
              {f >= fTidak - 1 && (
                <Abs style={{ left: 0, width: 1920, top: 800, display: "flex", justifyContent: "center", gap: 22 }}>
                  <Rise text="tidak bisa di-generate." at={fTidak} out={fPeng - 16} size={80} weight={400} color={C.g1} letterSpacing="-0.01em" />
                </Abs>
              )}
            </>
          )}

          {P2 && (
            <>
              {Array.from({ length: 8 }, (_, i) => {
                const x = ROWX + i * GAPX;
                const last = i === 7;
                const crossAt = fSemua + 4 + i * Math.round((fGagal - fSemua) / 7);
                const cr = k(f, [crossAt, crossAt + 6], [0, 1], eOut);
                const pop = last ? 1 : k(f, [fPeng + 6 + i * 2, fPeng + 14 + i * 2], [0, 1], eOut);
                return (
                  <Abs
                    key={i}
                    dataSubject
                    style={{
                      left: x,
                      top: ROWY,
                      width: SQ,
                      height: SQ,
                      borderRadius: 22,
                      overflow: "hidden",
                      boxShadow: last ? `0 0 0 5px ${C.blue}, 0 20px 40px rgba(15,23,42,0.12)` : "0 12px 30px rgba(15,23,42,0.08)",
                      scale: String(pop),
                      rotate: `${last ? 0 : (rnd(i) - 0.5) * 8}deg`,
                    }}
                  >
                    <div style={{ width: 300, height: 300, scale: String(SQ / 300), transformOrigin: "0 0" }}>
                      <Draft v={i + 1} />
                    </div>
                    {!last && cr > 0 && (
                      <svg width={SQ} height={SQ} viewBox="0 0 150 150" style={{ position: "absolute", left: 0, top: 0, background: `rgba(255,255,255,${0.35 * Math.min(1, cr * 2)})` }}>
                        <path d="M45 45 L105 105" stroke={C.coral} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - Math.min(1, cr * 2)} />
                        <path d="M105 45 L45 105" stroke={C.coral} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - Math.max(0, cr * 2 - 1)} />
                      </svg>
                    )}
                  </Abs>
                );
              })}
              <Abs style={{ left: 0, width: 1920, top: 530, display: "flex", justifyContent: "center" }}>
                <Rise text="Pengalaman." at={fPeng + 14} size={200} weight={600} color={C.ink} letterSpacing="-0.04em" />
              </Abs>
            </>
          )}

          {(P3 || (P4 && flood < 1)) && (
            <Direction f={f} fMemilih={fMemilih} fSatu={fSatu} fMembuang={fMembuang} fDir={fDir} flood={flood} />
          )}

          {P3 && (
            <Abs style={{ left: 0, width: 1920, top: 760, display: "flex", justifyContent: "center" }}>
              <Rise text="Direction." at={fDir + 4} out={fCara - 18} size={160} weight={600} color={C.ink} letterSpacing="-0.04em" />
            </Abs>
          )}

          {P4 && (
            <>
              {/* the landing page from S2, one detail is off: the second button sits 9 px low with the wrong radius */}
              <Abs dataSubject style={{ left: LAND.x, top: LAND.y, opacity: 1 - toRick, scale: String(k(f, [fCara - 2, fCara + 10], [0.94, 1], eOut)), filter: `blur(${3.5 * k(f, [fTahu - 6, fSalah + 6], [0, 1], eIO)}px) brightness(${1 - 0.12 * k(f, [fTahu - 6, fSalah + 6], [0, 1], eIO)})` }}>
                <Fit w={1440 * LAND.s} h={900 * LAND.s} nw={1440} nh={900} radius={18} shadow>
                  <KopiLanding err />
                </Fit>
              </Abs>
              {/* loupe: a real magnified view of what's under it */}
              <Abs
                style={{
                  left: lx - lr,
                  top: ly - lr,
                  width: lr * 2,
                  height: lr * 2,
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: `0 0 0 ${4 + 6 * toRick}px ${C.ink}, 0 30px 60px rgba(15,23,42,0.25)`,
                  background: C.white,
                  scale: String(k(f, [fCara, fCara + 10], [0, 1], eOut)),
                }}
              >
                {toRick < 0.7 && (
                  <div style={{ position: "absolute", left: lr - (lx - LAND.x) * ZOOM, top: lr - (ly - LAND.y) * ZOOM, width: 1440, height: 900, scale: String(LAND.s * ZOOM), transformOrigin: "0 0", opacity: 1 - toRick / 0.7 }}>
                    <KopiLanding err />
                  </div>
                )}
                {f >= fSalah && toRick < 0.7 && (
                  <div style={{ position: "absolute", left: lr - 70, top: lr - 40, width: 140, height: 52, borderRadius: 26, border: `4px solid ${C.coral}`, scale: String(k(f, [fSalah, fSalah + 6], [1.4, 1], eOut)), opacity: 1 - toRick / 0.7 }} />
                )}
              </Abs>
              <Abs style={{ left: 0, width: 1920, top: 860, display: "flex", justifyContent: "center", gap: 30 }}>
                <Rise text="Cara" at={fCara} out={fTahu - 4} size={120} weight={600} color={C.ink} letterSpacing="-0.04em" />
                <Rise text="melihat." at={fCara + 6} out={fTahu - 2} size={120} weight={600} color={C.ink} letterSpacing="-0.04em" />
              </Abs>
            </>
          )}

          {/* flood into navy from the chosen card */}
          {flood > 0 && flood < 1 && (
            <Abs
              style={{
                left: 960 - (190 + 1900 * flood) / 2,
                top: 300 - (260 + 1800 * flood) / 2,
                width: 190 + 1900 * flood,
                height: 260 + 1800 * flood,
                borderRadius: 28 * (1 - flood),
                background: C.g4,
              }}
            />
          )}
        </div>
      </MB>
    </Cam>
  );
};

const Direction: React.FC<{ f: number; fDir: number; fMemilih: number; fSatu: number; fMembuang: number; flood: number }> = ({
  f,
  fDir,
  fMemilih,
  fSatu,
  fMembuang,
}) => {
  const cards = [-2, -1, 1, 2];
  const close = k(f, [fMemilih, fSatu + 6], [0, 1], eOut);
  const brk = 60 - 46 * close;
  return (
    <>
      {cards.map((c, i) => {
        const at = fDir + 2 + i * 2;
        const pop = k(f, [at, at + 12], [0, 1], eOut);
        const out = k(f, [fMembuang + i * 2, fMembuang + 12 + i * 2], [0, 1], eIn);
        const ox = Math.sign(c) * out * 1400;
        const x = 960 + c * 190 + (c < 0 ? -95 : 95) - 85 + ox;
        return (
          <Abs
            key={i}
            style={{
              left: x,
              top: 120 + Math.abs(c) * 20 + out * 300,
              width: 170,
              height: 230,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(15,23,42,0.14)",
              transform: `perspective(1000px) rotateY(${-c * 14}deg) rotate(${c * 6 + out * c * 30}deg)`,
              scale: String(pop),
              opacity: 1 - out * 0.3,
            }}
          >
            <div style={{ width: 380, height: 520, scale: String(170 / 380), transformOrigin: "0 0" }}>
              <DirArt d={i + 1} />
            </div>
          </Abs>
        );
      })}
      <Abs
        dataSubject
        style={{
          left: 960 - 95,
          top: 170,
          width: 190,
          height: 260,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 70px rgba(15,23,42,0.18)",
          scale: String(k(f, [fDir, fDir + 12], [0, 1], eOut) * (1 + 0.06 * k(f, [fSatu, fSatu + 8], [0, 1], eOut))),
        }}
      >
        <div style={{ width: 380, height: 520, scale: String(190 / 380), transformOrigin: "0 0" }}>
          <DirArt d={0} />
        </div>
      </Abs>
      {f >= fMemilih - 2 &&
        [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ].map(([sx, sy], i) => (
          <Abs
            key={i}
            style={{
              left: 960 + (sx ? 95 + brk - 30 : -95 - brk),
              top: 300 + (sy ? 130 + brk - 30 : -130 - brk),
              width: 30,
              height: 30,
              borderLeft: sx ? "none" : `4px solid ${C.ink}`,
              borderRight: sx ? `4px solid ${C.ink}` : "none",
              borderTop: sy ? "none" : `4px solid ${C.ink}`,
              borderBottom: sy ? `4px solid ${C.ink}` : "none",
              opacity: k(f, [fMemilih - 2, fMemilih + 4], [0, 1]),
            }}
          />
        ))}
    </>
  );
};

export const _s5 = [kk, eIn];
