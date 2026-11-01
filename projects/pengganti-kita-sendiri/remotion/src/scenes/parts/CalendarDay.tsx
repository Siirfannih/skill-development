// Tampilan hari ala macOS Calendar (mode terang) untuk 02e «8 jam → 45 menit».
// Tiga blok kerja mengisi 09.00–17.00; `k` 0..1 memampatkan semuanya ke 09.00–09.45, sisa jam tampil kosong.
import React from "react";

export const CAL = { w: 940, h: 796, headH: 96, rowH: 80, gutter: 104, hours0: 9, hours1: 17 };
const INK = "#1d1d1f";
const MUTED = "#8e8e93";
const SEP = "#e5e5ea";
const BLUE = "#007aff";

type Ev = { name: string; s: number; d: number };
const EVENTS: Ev[] = [
  { name: "Input data pesanan", s: 9, d: 3 },
  { name: "Invoice Oktober", s: 12, d: 2.5 },
  { name: "Rekap penjualan", s: 14.5, d: 2.5 },
];
/** posisi tiap blok setelah dimampatkan: 3 × 15 menit berurutan dari 09.00 */
const SQ = (i: number) => ({ s: 9 + i * 0.25, d: 0.25 });

export const CalendarDay: React.FC<{ k: number; blurY?: number; style?: React.CSSProperties }> = ({ k, blurY = 0, style }) => {
  const gridTop = CAL.headH + 28; // jam 09.00 sejajar dengan y ini
  const yOf = (h: number) => gridTop + (h - CAL.hours0) * CAL.rowH;
  const hours: number[] = [];
  for (let h = CAL.hours0; h <= CAL.hours1; h++) hours.push(h);
  return (
    <div style={{ position: "absolute", width: CAL.w, height: CAL.h, borderRadius: 28, background: "#fff", overflow: "hidden", fontFamily: "Inter", color: INK,
      boxShadow: "0 40px 120px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.12)", ...style }}>
      {/* header: bulan + tanggal */}
      <div style={{ position: "absolute", left: 36, top: 22, display: "flex", alignItems: "baseline", gap: 12, fontSize: 40, letterSpacing: -0.8 }}>
        <span style={{ fontWeight: 700 }}>Oktober</span><span style={{ fontWeight: 400, color: MUTED }}>2026</span>
      </div>
      <div style={{ position: "absolute", right: 36, top: 24, display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 500 }}>
        <span style={{ color: MUTED }}>Senin</span>
        <span style={{ width: 52, height: 52, borderRadius: 26, background: "#ff3b30", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>26</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: CAL.headH, height: 2, background: SEP }} />
      {/* garis jam + label gutter */}
      {hours.map((h) => (
        <React.Fragment key={h}>
          <div style={{ position: "absolute", left: CAL.gutter, right: 0, top: yOf(h), height: 2, background: SEP }} />
          <div style={{ position: "absolute", left: 0, width: CAL.gutter - 20, top: yOf(h) - 18, textAlign: "right", fontSize: 26, fontWeight: 500, color: MUTED }}>
            {String(h).padStart(2, "0")}.00
          </div>
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: CAL.gutter - 2, top: gridTop, width: 2, height: (CAL.hours1 - CAL.hours0) * CAL.rowH, background: SEP }} />
      {/* blok acara */}
      <div style={{ position: "absolute", inset: 0, filter: blurY > 0.3 ? "url(#cal02e)" : undefined }}>
        {EVENTS.map((ev, i) => {
          const q = SQ(i);
          const s = ev.s + (q.s - ev.s) * k, d = ev.d + (q.d - ev.d) * k;
          const top = yOf(s) + 3, h = d * CAL.rowH - 6;
          const showText = h > 44;
          return (
            <div key={i} style={{ position: "absolute", left: CAL.gutter + 14, right: 24, top, height: h, borderRadius: 12, background: "rgba(0,122,255,0.16)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: BLUE }} />
              {showText && (
                <div style={{ position: "absolute", left: 28, top: Math.min(14, h / 2 - 20), fontSize: 32, fontWeight: 600, color: "#0a4fb3", whiteSpace: "nowrap", opacity: Math.min(1, (h - 44) / 30) }}>
                  {ev.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
