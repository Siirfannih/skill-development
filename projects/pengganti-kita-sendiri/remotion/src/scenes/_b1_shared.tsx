// Komponen bersama kelompok B1 (01a–02a). Motif "piktogram + wireframe di kerucut cahaya" (01c/01d)
// dipakai ulang di 03c/03d/06a–06g: impor dari sini supaya bentuk, warna, dan cahaya identik.
// Satuan = px layar 1920×1080 pada skala 1 (panel Wonder ×2). Semua deterministik.
import React from "react";

export const C = {
  charcoal: "#101216",
  raised: "#1c1f25",
  white: "#ffffff",
  line: "rgb(210, 210, 215)",
  ink: "#1d1d1f",
  paper: "#f5f5f7",
};

/** Ukuran dasar piktogram (panel 01d ×2): kepala Ø208, badan 384×460, jarak kepala–badan 20. */
export const FIG = { head: 208, bodyW: 384, bodyH: 460, gap: 20 };

/**
 * Kerucut cahaya dari atas (panel 01c). `cx` = pusat horizontal, `open` 0..1 membuka dari garis tipis
 * (garis finis) menjadi kerucut penuh. `floorY` = posisi lantai (genangan cahaya).
 */
export const LightCone: React.FC<{ cx: number; floorY: number; open?: number; w?: number; intensity?: number }> = ({
  cx, floorY, open = 1, w = 1000, intensity = 1,
}) => {
  const topHalf = (0.06 * w) * Math.max(0.004, open); // 44%..56% di panel
  const botHalf = Math.max(2, (0.32 * w) * open); // 18%..82%
  const H = 1400;
  const y0 = -160;
  // kerucut digambar sampai lantai, lalu memudar
  const k = (floorY - y0) / H;
  const bx = botHalf / k; // lebar di bawah frame (proporsional)
  return (
    <>
      <div
        style={{
          position: "absolute", left: cx - bx, top: y0, width: bx * 2, height: H,
          clipPath: `polygon(${50 - (topHalf / (bx * 2)) * 100}% 0%, ${50 + (topHalf / (bx * 2)) * 100}% 0%, 100% 100%, 0% 100%)`,
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,${0.22 * intensity}) 0%, rgba(255,255,255,${0.06 * intensity}) ${k * 100}%, rgba(255,255,255,0) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute", left: cx - botHalf * 0.95, top: floorY - 56, width: botHalf * 1.9, height: 112, borderRadius: "50%",
          backgroundImage: `radial-gradient(closest-side, rgba(255,255,255,${0.3 * intensity * Math.min(1, open * 1.4)}) 0%, rgba(255,255,255,0) 100%)`,
        }}
      />
    </>
  );
};

/** Piktogram "kita": matte charcoal dengan rim light dari arah cahaya (`rim` = "right" | "left"). */
export const Pictogram: React.FC<{ cx: number; headTop: number; s?: number; rim?: "right" | "left"; lean?: number; opacity?: number }> = ({
  cx, headTop, s = 1, rim = "right", lean = 0, opacity = 1,
}) => {
  const h = FIG.head * s, bw = FIG.bodyW * s, bh = FIG.bodyH * s;
  const dir = rim === "right" ? 1 : -1;
  const ang = rim === "right" ? 100 : 260;
  const bodyTop = headTop + h + FIG.gap * s;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, opacity, transform: `rotate(${lean}deg)`, transformOrigin: `${cx}px ${bodyTop + bh}px` }}>
      <div style={{
        position: "absolute", left: cx - h / 2, top: headTop, width: h, height: h, borderRadius: "50%",
        backgroundImage: `linear-gradient(${ang}deg, ${C.charcoal} 40%, ${C.raised} 100%)`,
        boxShadow: `inset ${-10 * dir * s}px 0px ${6 * s}px ${-4 * s}px rgba(255,255,255,0.9)`,
      }} />
      <div style={{
        position: "absolute", left: cx - bw / 2, top: bodyTop, width: bw, height: bh,
        borderTopLeftRadius: bw / 2, borderTopRightRadius: bw / 2,
        backgroundImage: `linear-gradient(${ang}deg, ${C.charcoal} 35%, ${C.raised} 100%)`,
        boxShadow: `inset ${-10 * dir * s}px ${6 * s}px ${8 * s}px ${-4 * s}px rgba(255,255,255,0.7)`,
      }} />
    </div>
  );
};

/**
 * Wireframe "pengganti": kepala + badan garis putus-putus, kosong lalu terisi dari kaki (`fill` 0..1 tinggi badan;
 * `headFill` 0..1 untuk kepala). Garis scan putih menyala di batas isi. `draw` 0..1 = muncul dari kaki ke kepala.
 */
export const WireFigure: React.FC<{
  cx: number; headTop: number; s?: number; fill?: number; headFill?: number; draw?: number; scan?: number; id?: string; bodyH?: number;
}> = ({ cx, headTop, s = 1, fill = 0, headFill = 0, draw = 1, scan = 1, id = "wf", bodyH = FIG.bodyH }) => {
  const h = FIG.head * s, bw = FIG.bodyW * s, bh = bodyH * s;
  const bodyTop = headTop + h + FIG.gap * s;
  const total = bodyTop + bh - headTop;
  // garis wireframe muncul dari bawah ke atas (clip)
  const clipTop = (1 - Math.min(1, Math.max(0, draw))) * total;
  const r = 188 / 2; // busur bahu pada koordinat 192-lebar
  const vb = { w: 192, h: (bodyH / 2) }; // koordinat panel (×2 = px)
  const arch = `M2 ${vb.h} V${r + 2} A${r} ${r} 0 0 1 190 ${r + 2} V${vb.h}`;
  const fillY = vb.h * (1 - Math.min(1, Math.max(0, fill)));
  // lebar busur pada tinggi y (untuk garis scan)
  const half = (y: number) => (y >= r + 2 ? 94 : Math.sqrt(Math.max(0, r * r - (r + 2 - y) ** 2)));
  const sw = half(fillY);
  const lineOp = fill > 0.002 && fill < 0.999 ? scan : 0;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, clipPath: `inset(${headTop + clipTop - 4}px -2000px -2000px -2000px)` }}>
      {/* kepala */}
      <svg style={{ position: "absolute", left: cx - h / 2, top: headTop, width: h, height: h, overflow: "visible" }} viewBox="0 0 104 104">
        <defs>
          <clipPath id={`${id}-hc`}><circle cx="52" cy="52" r="51" /></clipPath>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0.18">
            <stop offset="0.2" stopColor={C.raised} /><stop offset="1" stopColor={C.charcoal} />
          </linearGradient>
        </defs>
        {headFill > 0 && <rect x="0" y={104 * (1 - headFill)} width="104" height="104" fill={`url(#${id}-g)`} clipPath={`url(#${id}-hc)`} />}
        <circle cx="52" cy="52" r="51" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeDasharray="7 6" />
      </svg>
      {/* badan */}
      <svg style={{ position: "absolute", left: cx - bw / 2, top: bodyTop, width: bw, height: bh, overflow: "visible" }} viewBox={`0 0 192 ${vb.h}`}>
        <defs>
          <clipPath id={`${id}-bc`}><path d={`${arch} Z`} /></clipPath>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="0.18">
            <stop offset="0.2" stopColor={C.raised} /><stop offset="1" stopColor={C.charcoal} />
          </linearGradient>
          <filter id={`${id}-glow`} x="-50%" y="-400%" width="200%" height="900%"><feGaussianBlur stdDeviation="3.5" /></filter>
        </defs>
        {fill > 0 && <rect x="0" y={fillY} width="192" height={vb.h - fillY + 1} fill={`url(#${id}-bg)`} clipPath={`url(#${id}-bc)`} />}
        <path d={arch} stroke={C.line} strokeOpacity={0.8} strokeWidth={2} strokeDasharray="7 6" fill="none" />
        {lineOp > 0 && (
          <>
            <rect x={96 - sw} y={fillY - 2.5} width={sw * 2} height={5} fill="white" opacity={0.45 * lineOp} filter={`url(#${id}-glow)`} />
            <rect x={96 - sw} y={fillY - 0.5} width={sw * 2} height={1} fill="white" opacity={lineOp} />
          </>
        )}
      </svg>
    </div>
  );
};

