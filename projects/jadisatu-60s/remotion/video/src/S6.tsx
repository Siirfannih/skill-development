import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Abs, C, Cam, MB, MONO, Rise, eIn, eIO, eOut, k, kk, wf, Vignette, TOTAL } from "./lib";
import { LENS_END } from "./S5";
import { AIBisa, Finale, Studio } from "./S6Art";

// S6 — navy → putih. Rick Rubin di dalam lensa → Johnny Cash / Adele. → bagus. → AI bisa (slot) → seleramu. → wordmark.
export const S6_START = () => wf("c08", "Rick");

export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const fRick = wf("c08", "Rick");
  const fTidak = wf("c08", "tidak");
  const fTapi = wf("c08", "Tapi");
  const fMemp = wf("c08", "memproduseri");
  const fJohnny = wf("c08", "Johnny");
  const fAdele = wf("c08", "Adele");
  const fYang = wf("c08", "Yang");
  const fHanya = wf("c08", "hanya");
  const fBagus = wf("c08", "bagus");
  const fAI = wf("c09", "AI");
  const fMembuat = wf("c09", "membuat");
  const fBisnis = wf("c09", "bisnis");
  const fMeniru = wf("c09", "meniru");
  const fTapi2 = wf("c09", "tapi");
  const fSel = wf("c09", "seleramu");

  // iris inside the lens
  const iris = k(f, [fRick, fRick + 8], [0, 1], eOut);
  const lensOut = k(f, [fTapi + 4, fMemp + 4], [0, 1], eIn);
  // Irfan 14:41: read left → right. Photo pops where the lens was (right), slides left, text appears in its place.
  const slide = k(f, [fRick + 6, fRick + 18], [0, 1], eIO);
  const PHOTO_X = 600;
  const lensX = LENS_END.x - (LENS_END.x - PHOTO_X) * slide - lensOut * 1300;

  // world change navy → white (rises from below)
  const toWhite = k(f, [fYang + 2, fYang + 14], [0, 1], eIO);
  const whiteTop = 1080 * (1 - toWhite);
  const whiteV = -1080 * (toWhite - k(f - 1, [fYang + 2, fYang + 14], [0, 1], eIO));

  // names
  const nOut = k(f, [fYang, fYang + 10], [0, 1], eIn);
  const orbit = kk(f, [
    [fTapi, 0],
    [fYang, 1],
  ], eIO);

  // slot pill
  const slots = [
    { a: "membuat sesuatu", chip: "landing", b: "dengan cepat,", at: fMembuat + 6 }, // v15: lets "AI bisa" read centred, then dock
    { a: "menciptakan bisnis", chip: "store", b: "dalam satu malam,", at: wf("c09", "menciptakan") },
    { a: "meniru", chip: "doc", b: "cara kerjamu…", at: fMeniru },
  ];
  void fBisnis;
  const whip = k(f, [fTapi2, fTapi2 + 10], [0, 1], eIn);
  const whipV = -1500 * (whip - k(f - 1, [fTapi2, fTapi2 + 10], [0, 1], eIn));

  // Irfan 14:41: no decorative line. "seleramu." holds, clears, then the wordmark signs off alone.


  return (
    <Cam bg={C.g4}>
      <Vignette />
      {/* PART A — light world (D-030: no blue on dark) */}
      {toWhite < 1 && (
        <div style={{ position: "absolute", inset: 0, scale: String(1 + 0.04 * orbit) }}>
          {lensOut < 1 && (
            <MB id="rlens" vx={f > fTapi + 4 && f < fMemp + 4 ? -40 : -(LENS_END.x - PHOTO_X) * (slide - k(f - 1, [fRick + 6, fRick + 18], [0, 1], eIO))} max={10}>
              <div style={{ position: "absolute", inset: 0 }}>
                <Abs
                  dataSubject
                  style={{
                    left: lensX - LENS_END.r * iris,
                    top: LENS_END.y - LENS_END.r * iris,
                    width: 2 * LENS_END.r * iris,
                    height: 2 * LENS_END.r * iris,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: C.white,
                  }}
                >
                  <Img
                    src={staticFile("assets/rick.png")}
                    style={{
                      position: "absolute",
                      left: LENS_END.r * iris - LENS_END.r + 40,
                      top: LENS_END.r * iris - LENS_END.r + 60,
                      width: LENS_END.r * 2 - 80,
                      height: (LENS_END.r * 2 - 80) * 1.27,
                      objectFit: "cover",
                      scale: String(k(f, [fRick, fTapi], [1.1, 1.0], eOut)),
                    }}
                  />
                </Abs>
                <Abs
                  style={{
                    left: lensX - LENS_END.r,
                    top: LENS_END.y - LENS_END.r,
                    width: LENS_END.r * 2,
                    height: LENS_END.r * 2,
                    borderRadius: "50%",
                    border: `10px solid ${C.ink}`,
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </MB>
          )}
          {f < fTapi + 6 && (
            <>
              <Abs style={{ left: 1110, top: 340 }}>
                <Rise text="Rick Rubin" at={fRick + 14} out={fTapi - 2} size={150} weight={600} color={C.ink} letterSpacing="-0.04em" />
              </Abs>
              <Abs style={{ left: 1116, top: 540 }}>
                <Rise text="tidak bisa memainkan" at={fTidak} out={fTapi - 4} size={72} weight={400} color={C.ink} letterSpacing="-0.02em" />
              </Abs>
              <Abs style={{ left: 1116, top: 630 }}>
                <Rise text="alat musik." at={fTidak + 12} out={fTapi - 3} size={72} weight={400} color={C.ink} letterSpacing="-0.02em" />
              </Abs>
              <Abs style={{ left: PHOTO_X - 200, top: 1000, fontFamily: MONO, fontSize: 18, color: C.ink, opacity: slide }}>Photo: jasontheexploder, CC BY 3.0</Abs>
            </>
          )}
          {f >= fMemp - 1 && f < fYang && (
            <Abs style={{ left: 0, width: 1920, top: 110, display: "flex", justifyContent: "center", gap: 20 }}>
              <Rise text="Tapi ia" at={fTapi + 2} out={fYang - 12} size={72} weight={400} color={C.ink} letterSpacing="-0.02em" />
              <Rise text="memproduseri" at={fMemp} out={fYang - 10} size={72} weight={600} color={C.ink} letterSpacing="-0.02em" />
            </Abs>
          )}
          {/* album covers: one focus, then a clean pair */}
          {f >= fMemp - 2 && (
            <Album src="assets/cash.jpg" label="JOHNNY CASH" f={f} at={fMemp + 4} x={400 + 300 * (1 - k(f, [fAdele - 2, fAdele + 10], [0, 1], eIO)) - nOut * 1400} />
          )}
          {f >= fAdele - 2 && <Album src="assets/adele.jpg" label="ADELE" f={f} at={fAdele} x={1000 + nOut * 1400} />}
          {f >= fJohnny && (
            <Abs style={{ left: 0, width: 1920, top: 940, textAlign: "center", fontFamily: MONO, fontSize: 18, color: C.ink }}>
              Cover art: Johnny Cash — American Recordings (1994) · Adele — 21 (2011)
            </Abs>
          )}
        </div>
      )}

      {/* PART B — white world */}
      <MB id="s6white" vy={whiteV}>
        <Abs style={{ left: -300, top: whiteTop, width: 2520, height: 1400, background: C.white }} />
      </MB>
      {toWhite > 0.98 && (
        <>
          <MB id="s6whip" vx={whipV} max={30}>
            <div style={{ position: "absolute", inset: 0, translate: `${-1500 * whip}px 0` }}>
              {f >= fYang + 10 && f < fAI + 2 && <Studio f={f} from={fYang + 10} hanya={fHanya} bagus={fBagus} out={fAI + 2} />}
              {f >= fAI - 1 && f < fTapi2 + 12 && <AIBisa f={f} fAI={fAI} slots={slots} end={fTapi2} />}
            </div>
          </MB>

          {f >= fTapi2 - 1 && <Abs style={{ left: 0, top: 0, width: 1920, height: 1080 }}><Finale f={f} fTapi={fTapi2} fTidak={wf("c09", "tidak")} fDengan={wf("c09", "dengan", 2)} fSel={fSel} total={TOTAL} /></Abs>}
        </>
      )}
    </Cam>
  );
};

export const _s6 = [TOTAL];

const Album: React.FC<{ src: string; label: string; f: number; at: number; x: number }> = ({ src, label, f, at, x }) => {
  const p = k(f, [at - 2, at + 12], [0, 1], eOut);
  return (
    <Abs dataSubject style={{ left: x, top: 260, width: 520, translate: `0 ${(1 - p) * 120}px`, opacity: p > 0 ? 1 : 0 }}>
      <Img src={staticFile(src)} style={{ width: 520, height: 520, borderRadius: 18, boxShadow: "0 40px 80px rgba(15,23,42,0.18)", scale: String(0.92 + 0.08 * p) }} />
      <div style={{ marginTop: 30 }}>
        <Rise text={label} at={at + 4} size={44} weight={500} font={MONO} color={C.ink} letterSpacing="0.08em" />
      </div>
    </Abs>
  );
};
