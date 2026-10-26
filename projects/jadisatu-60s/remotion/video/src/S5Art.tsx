import React from "react";
import { Img, staticFile } from "remotion";
import { BG, CV_, DM, FR } from "./Designs";

// S5 visuals: the same coffee brand ("Senja") seen through the three things that can't be generated.
// Pengalaman = eight real logo drafts that slowly get better; Direction = five design directions, pick one.

const ink = "#2A1A10";
const cream = "#F4EEE5";
const clay = "#B4562B";

/** Logo draft v1..v8 for the coffee brand, 300×300 artboard. v8 is the good one. */
export const Draft: React.FC<{ v: number }> = ({ v }) => {
  const box: React.CSSProperties = { width: 300, height: 300, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" };
  switch (v) {
    case 1:
      return (
        <div style={{ ...box, background: "#FFF7C2" }}>
          <div style={{ width: 90, height: 90, borderRadius: 45, background: "#FFB800", boxShadow: "0 0 0 10px #FFDD55" }} />
          <div style={{ fontFamily: CV_, fontSize: 64, color: "#E5322D", textShadow: "3px 3px 0 #1E3A8A", marginTop: 4 }}>Kopi Senja!!</div>
        </div>
      );
    case 2:
      return (
        <div style={{ ...box, background: "#FFFFFF" }}>
          <div style={{ fontFamily: BG, fontWeight: 800, fontSize: 70, color: "#6B3F1D", letterSpacing: "-0.02em", lineHeight: 0.9, textAlign: "center" }}>
            KOPI
            <br />
            SENJA
          </div>
          <div style={{ fontFamily: DM, fontSize: 18, color: "#999", marginTop: 8 }}>coffee · shop · cafe · bali</div>
        </div>
      );
    case 3:
      return (
        <div style={{ ...box, background: "#2B2B2B" }}>
          <div style={{ fontFamily: FR, fontWeight: 700, fontSize: 64, color: "#E8C26A", scale: "1.7 1" }}>Senja</div>
          <div style={{ position: "absolute", inset: 18, border: "3px double #E8C26A" }} />
        </div>
      );
    case 4:
      return (
        <div style={{ ...box, background: "#F5E6D3" }}>
          <svg width="90" height="80" viewBox="0 0 90 80" aria-hidden="true">
            <path d="M15 35 h50 v20 a25 25 0 0 1 -50 0z" fill="#6B3F1D" />
            <path d="M65 40 a10 10 0 0 1 0 18" stroke="#6B3F1D" strokeWidth="6" fill="none" />
            <path d="M30 25 q-6 -10 0 -20 M42 25 q-6 -10 0 -20 M54 25 q-6 -10 0 -20" stroke="#6B3F1D" strokeWidth="4" fill="none" />
          </svg>
          <div style={{ fontFamily: FR, fontWeight: 600, fontSize: 46, color: "#6B3F1D" }}>Kopi Senja</div>
          <div style={{ fontFamily: DM, fontSize: 16, color: "#6B3F1D", letterSpacing: "0.3em" }}>EST. 2026 · DENPASAR</div>
        </div>
      );
    case 5:
      return (
        <div style={{ ...box, background: "#1F1F1F" }}>
          <div style={{ fontFamily: BG, fontWeight: 800, fontSize: 82, color: "#B6FF3B", letterSpacing: "-0.05em" }}>senja</div>
        </div>
      );
    case 6:
      return (
        <div style={{ ...box, background: cream }}>
          <div style={{ fontFamily: FR, fontWeight: 600, fontSize: 70, color: ink, marginLeft: 46 }}>Senja</div>
          <div style={{ fontFamily: DM, fontSize: 18, color: clay, marginLeft: -30, marginTop: 4, letterSpacing: "0.2em" }}>KEDAI KOPI</div>
        </div>
      );
    case 7:
      return (
        <div style={{ ...box, background: cream }}>
          <div style={{ fontFamily: FR, fontWeight: 700, fontSize: 76, color: ink, letterSpacing: "0.12em" }}>
            Senja<span style={{ color: clay }}>.</span>
          </div>
        </div>
      );
    default:
      return (
        <div style={{ ...box, background: cream }}>
          <div style={{ fontFamily: FR, fontWeight: 700, fontSize: 86, color: ink, letterSpacing: "-0.03em" }}>
            Senja<span style={{ color: clay }}>.</span>
          </div>
          <div style={{ fontFamily: DM, fontSize: 15, color: "#7A6553", letterSpacing: "0.32em", marginTop: 2 }}>KEDAI SANGRAI</div>
        </div>
      );
  }
};

/** Five design directions for the same brand, 380×520 poster. d = 0 is the chosen one. */
export const Direction: React.FC<{ d: number }> = ({ d }) => {
  const box: React.CSSProperties = { width: 380, height: 520, position: "relative", overflow: "hidden" };
  if (d === 0)
    return (
      <div style={{ ...box, background: cream, color: ink }}>
        <Img src={staticFile("assets/p_coffee.jpg")} style={{ position: "absolute", left: 30, top: 30, width: 320, height: 300, objectFit: "cover", borderRadius: 18 }} />
        <div style={{ position: "absolute", left: 30, top: 352, fontFamily: FR, fontWeight: 600, fontSize: 46, lineHeight: 0.98, letterSpacing: "-0.03em" }}>
          Kopi <i style={{ fontWeight: 400, color: clay }}>pelan</i>
          <br />
          untuk sore.
        </div>
        <div style={{ position: "absolute", left: 30, bottom: 26, fontFamily: DM, fontSize: 14, letterSpacing: "0.2em" }}>SENJA · DENPASAR</div>
      </div>
    );
  if (d === 1)
    return (
      <div style={{ ...box, background: "#E9F0DC", color: "#24420F" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: BG, fontWeight: 800, fontSize: 64, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
          Coffee
          <br />
          break!
        </div>
        <div style={{ position: "absolute", left: 90, top: 260, width: 200, height: 200, borderRadius: 100, background: "#6AB02E" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, textAlign: "center", fontFamily: CV_, fontSize: 30 }}>fresh every day ✿</div>
      </div>
    );
  if (d === 2)
    return (
      <div style={{ ...box, background: "#0E0C0A", color: "#D8B46A" }}>
        <div style={{ position: "absolute", inset: 24, border: "1px solid #D8B46A" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 190, textAlign: "center", fontFamily: FR, fontSize: 62, letterSpacing: "0.1em" }}>SENJA</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 280, textAlign: "center", fontFamily: DM, fontSize: 14, letterSpacing: "0.5em" }}>RESERVE COFFEE</div>
      </div>
    );
  if (d === 3)
    return (
      <div style={{ ...box, background: "#E86A2C", color: "#3A1606" }}>
        <div style={{ position: "absolute", left: 40, top: 40, width: 300, height: 300, borderRadius: 150, background: "#F6B23C" }} />
        <div style={{ position: "absolute", left: 30, bottom: 40, fontFamily: BG, fontWeight: 800, fontSize: 92, letterSpacing: "-0.05em", lineHeight: 0.85 }}>
          SEN
          <br />
          JA
        </div>
      </div>
    );
  return (
    <div style={{ ...box, background: "#000" }}>
      <Img src={staticFile("assets/p_coffee2.jpg")} style={{ position: "absolute", inset: 0, width: 380, height: 520, objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7))" }} />
      <div style={{ position: "absolute", left: 28, bottom: 30, fontFamily: DM, fontWeight: 700, fontSize: 48, color: "#FFF", letterSpacing: "-0.03em", lineHeight: 1 }}>
        Slow coffee,
        <br />
        fast mornings.
      </div>
    </div>
  );
};
