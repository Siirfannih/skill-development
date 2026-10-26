import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Direction as DirArt } from "./S5Art";
import { Person } from "./Figures";
import { Fit, KopiLanding } from "./Designs";
import { Abs, C, Cam, MB, Rise, SANS, eIn, eIO, eOut, k, kk, wf, Vignette } from "./lib";
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

  // --- P2 runner (v16)
  const fCoba = wf("c07", "coba");
  const TRACK_Y = 640;
  const START_X = 380;
  const FAIL_X = 880;
  const runX = kk(f, [[fSemua, START_X], [fCoba + 4, FAIL_X], [fGagal - 2, FAIL_X], [fDir - 2, 1300]], (t) => t);
  const running = (f >= fSemua && f < fCoba + 4) || f >= fGagal - 2;
  const runPose = f < fSemua ? "crouch" : running ? (Math.floor(f / 4) % 2 ? "walk" : "walk2") : "tired";
  let camX = 0;
  let camY = 0;
  let camS = 1;
  if (P1) {
    camX = c1x;
    camY = c1y;
    camS = s1;
  } else if (P2) {
    // v16 (Irfan): experience is human → a pictogram runner (his visualhustles refs), not logo drafts. Close tracking on
    // the runner, then a hard break to wide on "gagal" that shows the whole red path — and that he keeps walking.
    const wide = f >= fGagal ? 1 : 0;
    const land = k(f, [fPeng, fPeng + 12], [1, 0], eOut);
    const sC = 1.7 * (1 + 2.2 * land);
    camS = wide ? 1 : sC;
    const fx = wide ? 820 : runX;
    camX = (960 - fx) * camS - whip * 1900;
    camY = (540 - 560) * camS;
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
    <>
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
              {/* track: thin ink base, coral where he tried and failed, blue where he keeps going */}
              <Abs style={{ left: 120, top: TRACK_Y - 3, width: 1700, height: 6, borderRadius: 3, background: "rgba(10,10,10,0.12)" }} />
              <Abs style={{ left: START_X, top: TRACK_Y - 5, width: Math.max(0, Math.min(runX, FAIL_X) - START_X), height: 10, borderRadius: 5, background: C.coral }} />
              {f >= fGagal - 2 && <Abs style={{ left: FAIL_X, top: TRACK_Y - 5, width: Math.max(0, runX - FAIL_X), height: 10, borderRadius: 5, background: C.blue }} />}
              {/* start flag */}
              <Abs style={{ left: START_X - 6, top: TRACK_Y - 250, width: 8, height: 250, borderRadius: 4, background: C.coral, scale: `1 ${k(f, [fPeng - 2, fPeng + 8], [0, 1], eOut)}`, transformOrigin: "50% 100%" }} />
              <Abs style={{ left: START_X + 2, top: TRACK_Y - 250, padding: "14px 34px 14px 22px", background: C.coral, clipPath: "polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)", fontFamily: SANS, fontWeight: 700, fontSize: 44, letterSpacing: "0.02em", color: C.white, opacity: k(f, [fPeng + 4, fPeng + 10], [0, 1]), scale: `${k(f, [fPeng + 4, fPeng + 12], [0, 1], eOut)} 1`, transformOrigin: "0 50%" }}>MULAI</Abs>
              {/* the cross where it failed */}
              {f >= fCoba + 4 && (
                <svg width={70} height={70} viewBox="0 0 70 70" style={{ position: "absolute", left: FAIL_X - 35, top: TRACK_Y + 26 }}>
                  <path d="M15 15 L55 55 M55 15 L15 55" stroke={C.coral} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - k(f, [fCoba + 4, fCoba + 12], [0, 1], eOut)} />
                </svg>
              )}
              <Abs style={{ left: runX - 48, top: TRACK_Y - 224 + 6, scale: String(k(f, [fPeng, fPeng + 6], [0.7, 1], eOut)), transformOrigin: "50% 100%" }}>
                <Person s={1.6} pose={runPose as "walk"} color={C.ink} sweat={runPose === "tired" ? k(f, [fCoba + 6, fCoba + 12], [0, 1]) : 0} />
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
    {P2 && (
      /* v16: "Pengalaman." is screen-space (like Direction./Cara melihat.), so the tracking camera never crops it */
      <Abs style={{ left: 0, width: 1920, top: 800, display: "flex", justifyContent: "center", translate: `${-whip * 1900}px 0` }}>
        <Rise text="Pengalaman." at={fPeng + 6} size={150} weight={600} color={C.ink} letterSpacing="-0.04em" />
      </Abs>
    )}
    </>
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
