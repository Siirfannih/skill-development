import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { move } from "../../../toolkit/gerak/curves";
import { stagger } from "../../../toolkit/gerak/timing";
import { Camera25D, Layer25D } from "../../../toolkit/kamera/Camera25D";
import { KAMERA } from "../../../toolkit/kamera/camera25d.js";
import { acakBerbiji, acakIndeks } from "../../../scripts/remotion/ae-primitives/inti/acak";

const warna = z.string();

export const UIActionScriptPropsSchema = z.object({
  tokens: z.object({
    langit: warna, horizon: warna, matahari: warna, bukit1: warna, bukit2: warna, bukit3: warna,
    jendela: warna, panel: warna, tinta: warna, tinta2: warna, aksen: warna, aksen2: warna, kaca: warna,
    huruf: z.string(),
  }),
  teks: z.string(),
  labelModel: z.string(),
  labelTingkat: z.string(),
  kartuAkhir: z.string(),
  seed: z.number().int(),
  // mekanik waktu (frame @ fps komposisi)
  cps: z.number().positive().default(46),            // huruf per detik; dinaikkan otomatis bila tidak selesai sebelum punch
  mulaiKetik: z.number().int().default(12),
  punchAt: z.number().int().default(46),
  punchFrames: z.number().int().min(1).default(4),   // 1 = potongan keras; 4-6 = whip
  sapuAt: z.number().int().default(78),
  sapuDur: z.number().int().default(18),
  sapuUmurSel: z.number().int().default(8),
  potongAt: z.number().int().default(100),           // potong ke end card
  // kamera
  skala: z.number().default(1.65),
  driftSkala: z.number().default(0.03),
  driftGeser: z.number().default(0.008),             // fraksi lebar frame, geser pelan selama hold
  driftAmp: z.number().default(0.008),               // napas kamera (fraksi tinggi)
  layarYPrompt: z.number().default(0.41),            // pusat kotak prompt setelah punch (fraksi tinggi)
  tepiKananPrompt: z.number().default(0.6),          // tepi kanan kotak setelah punch (fraksi lebar)
  // tata letak (fraksi frame)
  jendelaLebar: z.number().default(0.64),
  jendelaTinggi: z.number().default(0.67),
  jendelaPusatY: z.number().default(0.46),
  promptLebar: z.number().default(0.8),              // fraksi lebar jendela
  promptTinggi: z.number().default(0.18),
  promptPusatY: z.number().default(0.52),
  dockPusatY: z.number().default(0.9),
  ukuranTeks: z.number().default(0.034),
  ukuranSel: z.number().default(0.1),                // sel mosaik di layar setelah punch
  // kulit kotak kaca (spec.parameter)
  radius: z.number().default(0.2),                   // fraksi sisi pendek kotak
  border: z.object({ lebar: z.number(), opasitas: z.number() }).default({ lebar: 0.002, opasitas: 0.15 }),
  blur: z.number().default(0.012),
  bayangan: z
    .object({ offset_x: z.number(), offset_y: z.number(), blur: z.number(), opasitas: z.number() })
    .default({ offset_x: 0, offset_y: 0.012, blur: 0.035, opasitas: 0.35 }),
});
export type UIActionScriptProps = z.infer<typeof UIActionScriptPropsSchema>;

type Tokens = UIActionScriptProps["tokens"];
const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

/** Pemandangan mini (langit, matahari, punggung bukit) untuk foto wallpaper, pratinjau, dan mini-thumbnail. */
const Pemandangan: React.FC<{ t: Tokens; w: number; h: number; seed: number; variasi?: number }> = ({ t, w, h, seed, variasi = 0 }) => {
  const r = acakBerbiji(seed);
  const ph = [r() * 6, r() * 6, r() * 6, r() * 6];
  const garis = (base: number, amp: number, o: number) => {
    const n = 28;
    const pts: string[] = [`0,${h}`];
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * w;
      const v = Math.sin(i * 0.35 + ph[o]) * 0.55 + Math.sin(i * 0.9 + ph[o + 1]) * 0.3 + Math.sin(i * 0.17 + ph[o]) * 0.4;
      pts.push(`${x.toFixed(2)},${(base * h - amp * h * v).toFixed(2)}`);
    }
    pts.push(`${w},${h}`);
    return pts.join(" ");
  };
  const gid = `g${seed}x${variasi}${Math.round(w)}`;
  const sunX = (0.2 + variasi * 0.17) * w;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", left: 0, top: 0, display: "block" }}>
      <defs>
        <linearGradient id={`${gid}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: t.langit }} />
          <stop offset="0.6" style={{ stopColor: t.horizon }} />
        </linearGradient>
        <radialGradient id={`${gid}c`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: t.matahari, stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: t.matahari, stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <rect width={w} height={h} style={{ fill: `url(#${gid}s)` }} />
      <ellipse cx={sunX} cy={0.58 * h} rx={0.5 * w} ry={0.3 * h} style={{ fill: `url(#${gid}c)` }} />
      <circle cx={sunX} cy={0.56 * h} r={0.1 * h} style={{ fill: t.matahari }} />
      <polygon points={garis(0.6, 0.07, 0)} style={{ fill: t.bukit1 }} />
      <polygon points={garis(0.72, 0.08, 1)} style={{ fill: t.bukit2 }} />
      <polygon points={garis(0.86, 0.06, 2)} style={{ fill: t.bukit3 }} />
    </svg>
  );
};

/** Bunga kecil di bukit terdekat: titik berbiji pada wallpaper. */
const Bunga: React.FC<{ t: Tokens; w: number; h: number; seed: number }> = ({ t, w, h, seed }) => {
  const dots = Array.from({ length: 70 }, (_, i) => ({
    x: acakIndeks(seed + 3, i) * w,
    y: (0.88 + acakIndeks(seed + 5, i) * 0.12) * h,
    c: acakIndeks(seed + 9, i) < 0.5 ? t.aksen : t.matahari,
    r: (0.003 + acakIndeks(seed + 11, i) * 0.004) * h,
  }));
  return (
    <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0 }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} style={{ fill: d.c }} />
      ))}
    </svg>
  );
};

const Dock: React.FC<{ t: Tokens; W: number; H: number; cy: number }> = ({ t, W, H, cy }) => {
  const n = 7, ic = 0.05 * H, gap = 0.014 * H, pad = 0.014 * H;
  const dw = n * ic + (n - 1) * gap + pad * 2, dh = ic + pad * 2;
  const warnaIkon = [t.aksen, t.aksen2, t.matahari, t.tinta2, t.aksen, t.aksen2, t.matahari];
  const glif = (i: number) => {
    const s = ic, c = s / 2, st = { fill: t.jendela } as React.CSSProperties;
    if (i % 7 === 0) return <circle cx={c} cy={c} r={s * 0.22} style={st} />;
    if (i % 7 === 1) return <circle cx={c} cy={c} r={s * 0.2} style={{ fill: "none", stroke: t.jendela, strokeWidth: s * 0.08 }} />;
    if (i % 7 === 2) return <polygon points={`${c},${s * 0.25} ${s * 0.75},${s * 0.72} ${s * 0.25},${s * 0.72}`} style={st} />;
    if (i % 7 === 3) return <polygon points={`${c},${s * 0.22} ${s * 0.78},${c} ${c},${s * 0.78} ${s * 0.22},${c}`} style={st} />;
    if (i % 7 === 4) return <path d={`M${c} ${s * 0.25}V${s * 0.75}M${s * 0.25} ${c}H${s * 0.75}`} style={{ stroke: t.jendela, strokeWidth: s * 0.1, fill: "none" }} />;
    if (i % 7 === 5) return <path d={`M${s * 0.28} ${s * 0.7}V${s * 0.45}M${c} ${s * 0.7}V${s * 0.3}M${s * 0.72} ${s * 0.7}V${s * 0.55}`} style={{ stroke: t.jendela, strokeWidth: s * 0.1, fill: "none" }} />;
    return <rect x={s * 0.3} y={s * 0.3} width={s * 0.4} height={s * 0.4} rx={s * 0.08} style={st} />;
  };
  return (
    <div
      style={{
        position: "absolute", left: (W - dw) / 2, top: cy * H - dh / 2, width: dw, height: dh,
        borderRadius: dh * 0.3, background: mix(t.kaca, 55), backdropFilter: `blur(${0.012 * H}px)`,
        border: `${0.002 * H}px solid ${mix(t.tinta, 20)}`, boxShadow: `0 ${0.01 * H}px ${0.03 * H}px ${mix(t.jendela, 40)}`,
        display: "flex", alignItems: "center", gap, padding: pad, boxSizing: "border-box",
      }}
    >
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} width={ic} height={ic} style={{ flex: "none" }}>
          <rect width={ic} height={ic} rx={ic * 0.24} style={{ fill: warnaIkon[i] }} />
          {glif(i)}
        </svg>
      ))}
    </div>
  );
};

/** Jendela editor gelap: bin media, pratinjau, inspektur geser, lini masa berlapis. */
const Jendela: React.FC<{ t: Tokens; W: number; H: number; p: UIActionScriptProps }> = ({ t, W, H, p }) => {
  const ww = p.jendelaLebar * W, wh = p.jendelaTinggi * H;
  const wx = (W - ww) / 2, wy = p.jendelaPusatY * H - wh / 2;
  const th = 0.045 * H;
  const trackY = (i: number) => 0.505 * H + i * 0.036 * H;
  const warnaTrack = [t.aksen, t.matahari, t.aksen2, t.tinta2];
  const prevW = 0.14 * H, prevH = 0.25 * H;
  return (
    <div
      style={{
        position: "absolute", left: wx, top: wy, width: ww, height: wh, overflow: "hidden", borderRadius: 0.014 * H,
        background: t.jendela, border: `${0.002 * H}px solid ${mix(t.tinta, 15)}`,
        boxShadow: `0 ${0.02 * H}px ${0.06 * H}px ${mix(t.jendela, 45)}`,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: th, background: t.panel }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0.018 * H + i * 0.02 * H, top: th / 2 - 0.006 * H, width: 0.012 * H, height: 0.012 * H, borderRadius: "50%", background: mix(t.tinta, 35) }} />
      ))}
      {/* bin media: 4 thumbnail pemandangan */}
      {[0, 1, 2, 3].map((i) => {
        const tw = 0.14 * H, tt = 0.1 * H;
        const x = 0.03 * ww + (i % 2) * (tw + 0.012 * H), y = th + 0.02 * H + Math.floor(i / 2) * (tt + 0.012 * H);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: tw, height: tt, borderRadius: 0.008 * H, overflow: "hidden", background: t.panel }}>
            <Pemandangan t={t} w={tw} h={tt} seed={p.seed + 31 * (i + 1)} variasi={i} />
          </div>
        );
      })}
      {/* pratinjau */}
      <div style={{ position: "absolute", left: (ww - prevW) / 2, top: th + 0.02 * H, width: prevW, height: prevH, borderRadius: 0.008 * H, overflow: "hidden", border: `${0.002 * H}px solid ${mix(t.tinta, 20)}` }}>
        <Pemandangan t={t} w={prevW} h={prevH} seed={p.seed + 7} variasi={1} />
      </div>
      {/* inspektur */}
      {[0.72, 0.4, 0.58, 0.3, 0.85].map((v, i) => {
        const x0 = 0.74 * ww, x1 = 0.96 * ww, y = th + 0.04 * H + i * 0.045 * H;
        return (
          <div key={i}>
            <div style={{ position: "absolute", left: x0, top: y - 0.002 * H, width: x1 - x0, height: 0.004 * H, borderRadius: 0.002 * H, background: mix(t.tinta, 18) }} />
            <div style={{ position: "absolute", left: x0, top: y - 0.002 * H, width: (x1 - x0) * v, height: 0.004 * H, borderRadius: 0.002 * H, background: t.aksen }} />
            <div style={{ position: "absolute", left: x0 + (x1 - x0) * v - 0.008 * H, top: y - 0.008 * H, width: 0.016 * H, height: 0.016 * H, borderRadius: "50%", background: t.tinta2 }} />
          </div>
        );
      })}
      {/* lini masa */}
      <div style={{ position: "absolute", left: 0, top: 0.49 * H, width: ww, height: wh - 0.49 * H, background: t.panel }} />
      {warnaTrack.map((c, i) => {
        const r = acakBerbiji(p.seed + 100 + i);
        const klip: React.ReactNode[] = [];
        let x = 0.1 * ww;
        let k = 0;
        while (x < 0.94 * ww) {
          const w = (0.1 + r() * 0.16) * ww;
          const ww2 = Math.min(w, 0.94 * ww - x);
          klip.push(<div key={k++} style={{ position: "absolute", left: x, top: trackY(i), width: ww2 - 0.004 * H, height: 0.028 * H, borderRadius: 0.005 * H, background: c, opacity: 0.55 + r() * 0.45 }} />);
          x += w;
        }
        return (
          <div key={i}>
            <div style={{ position: "absolute", left: 0.03 * ww, top: trackY(i) + 0.007 * H, width: 0.014 * H, height: 0.014 * H, borderRadius: "50%", background: c }} />
            {klip}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0.47 * ww, top: 0.495 * H, width: 0.003 * H, height: 0.165 * H, background: t.tinta }} />
    </div>
  );
};

const Desktop: React.FC<{ p: UIActionScriptProps; W: number; H: number; frame: number; fps: number }> = ({ p, W, H, frame, fps }) => {
  const t = p.tokens;
  const ww = p.jendelaLebar * W;
  const bw = p.promptLebar * ww, bh = p.promptTinggi * H;
  const bx = (W - bw) / 2, by = p.promptPusatY * H - bh / 2;
  const pad = 0.028 * H;
  const fs = p.ukuranTeks * H;

  // ketikan: selesai paling lambat 1 frame sebelum punch
  const n = p.teks.length;
  const cpsEfektif = Math.max(p.cps, n / Math.max(1, (p.punchAt - 1 - p.mulaiKetik) / fps));
  const diketik = Math.max(0, Math.min(n, Math.floor(((frame - p.mulaiKetik) / fps) * cpsEfektif)));
  const selesai = diketik >= n;
  const kedip = selesai ? Math.floor((frame - p.mulaiKetik) / (fps * 0.5)) % 2 === 0 : true;

  // sapuan sel grid dari kiri, hanya di area kotak prompt
  const sel = (p.ukuranSel * H) / p.skala;
  const cols = Math.ceil(bw / sel), rows = Math.ceil(bh / sel), total = cols * rows;
  const gap = (p.sapuDur - p.sapuUmurSel) / Math.max(1, cols - 1);
  const sapuAktif = frame >= p.sapuAt - 1 && frame <= p.sapuAt + p.sapuDur + 2;
  const sels: React.ReactNode[] = [];
  if (sapuAktif) {
    for (let i = 0; i < total; i++) {
      const d = stagger(i, total, { grid: [cols, rows], axis: "x", from: "first", gap, jitter: 2, seed: p.seed, start: p.sapuAt });
      const masuk = move(frame, d, 2, "reveal");
      const keluar = move(frame, d + 3, p.sapuUmurSel - 3, "leave");
      const a = masuk * (1 - keluar);
      if (a < 0.01) continue;
      const rr = acakIndeks(p.seed, i);
      const c = rr < 0.45 ? t.aksen : rr < 0.7 ? t.matahari : rr < 0.9 ? t.aksen2 : t.jendela;
      sels.push(
        <div
          key={i}
          style={{
            position: "absolute", left: (i % cols) * sel, top: Math.floor(i / cols) * sel, width: sel * 0.94, height: sel * 0.94,
            background: c, opacity: a * (0.6 + 0.4 * acakIndeks(p.seed + 2, i)),
          }}
        />,
      );
    }
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", fontFamily: t.huruf }}>
      <Pemandangan t={t} w={W} h={H} seed={p.seed} />
      <Bunga t={t} w={W} h={H} seed={p.seed} />
      <Jendela t={t} W={W} H={H} p={p} />
      <Dock t={t} W={W} H={H} cy={p.dockPusatY} />
      <div
        style={{
          position: "absolute", left: bx, top: by, width: bw, height: bh, boxSizing: "border-box", overflow: "hidden",
          borderRadius: p.radius * bh, background: mix(t.kaca, 62), backdropFilter: `blur(${p.blur * H}px)`,
          border: `${p.border.lebar * H}px solid ${mix(t.tinta, p.border.opasitas * 100)}`,
          boxShadow: `${p.bayangan.offset_x * H}px ${p.bayangan.offset_y * H}px ${p.bayangan.blur * H}px ${mix(t.jendela, p.bayangan.opasitas * 100)}`,
        }}
      >
        <div style={{ position: "absolute", left: pad, top: pad, right: pad, fontSize: fs, lineHeight: 1.2, color: t.tinta, whiteSpace: "pre", overflow: "hidden" }}>
          {p.teks.slice(0, diketik)}
          <span style={{ display: "inline-block", width: 0.003 * H, height: fs * 0.95, marginLeft: 0.004 * H, verticalAlign: "text-bottom", background: t.tinta, opacity: kedip ? 0.9 : 0 }} />
        </div>
        <svg width={0.03 * H} height={0.03 * H} style={{ position: "absolute", left: pad, bottom: pad + 0.011 * H }}>
          <path d={`M${0.015 * H} ${0.005 * H}V${0.025 * H}M${0.005 * H} ${0.015 * H}H${0.025 * H}`} style={{ stroke: t.tinta2, strokeWidth: 0.003 * H, fill: "none", strokeLinecap: "round" }} />
        </svg>
        <div style={{ position: "absolute", right: pad + 0.052 * H + 0.02 * H, bottom: pad + 0.013 * H, fontSize: 0.025 * H, lineHeight: 1, color: t.tinta2, whiteSpace: "pre" }}>
          <span style={{ color: t.tinta }}>{p.labelModel}</span>
          {"  "}
          {p.labelTingkat}
        </div>
        <div style={{ position: "absolute", right: pad, bottom: pad, width: 0.052 * H, height: 0.052 * H, borderRadius: "50%", background: t.aksen }}>
          <svg width={0.052 * H} height={0.052 * H}>
            <path d={`M${0.026 * H} ${0.036 * H}V${0.016 * H}M${0.017 * H} ${0.025 * H}L${0.026 * H} ${0.016 * H}L${0.035 * H} ${0.025 * H}`} style={{ stroke: t.jendela, strokeWidth: 0.004 * H, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }} />
          </svg>
        </div>
        {sels}
      </div>
    </div>
  );
};

const KartuAkhir: React.FC<{ p: UIActionScriptProps; W: number; H: number; frame: number }> = ({ p, W, H, frame }) => {
  const t = p.tokens;
  const a = move(frame, p.potongAt + 2, 10, "reveal");
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: t.jendela, fontFamily: t.huruf }}>
      <div style={{ position: "absolute", inset: -0.06 * H, filter: `blur(${0.03 * H}px)` }}>
        <div style={{ position: "absolute", left: 0.06 * H, top: 0.06 * H }}>
          <Pemandangan t={t} w={W} h={H} seed={p.seed} />
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: mix(t.jendela, 88) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0.43 * H + (1 - a) * 0.03 * H, textAlign: "center", opacity: a }}>
        <div style={{ fontSize: 0.09 * H, lineHeight: 1.1, color: t.tinta }}>{p.kartuAkhir}</div>
        <div style={{ margin: `${0.03 * H}px auto 0`, width: 0.1 * H, height: 0.006 * H, borderRadius: 0.003 * H, background: t.aksen }} />
      </div>
    </div>
  );
};

/**
 * Jendela UI gelap mengambang di atas foto, kalimat perintah diketik cepat di kotak kaca, lalu kamera melompat ke kotak itu (punch) sehingga teks terbaca besar tanpa teks kinetik, sapuan sel grid, potong ke end card.
 * Pakai bila: sebuah perintah/prompt harus terbaca besar dan terasa "dijalankan" di dalam antarmuka nyata (demo produk, fitur AI, ajakan aksi).
 * Jangan bila: tidak ada permukaan UI untuk ditunjukkan, kalimatnya panjang lebih dari satu baris, atau konteks desktop harus tetap utuh tanpa zoom.
 */
export const UIActionScript: React.FC<z.input<typeof UIActionScriptPropsSchema>> = (raw) => {
  const p = UIActionScriptPropsSchema.parse(raw);
  const frame = useCurrentFrame();
  const { width: W, height: H, fps } = useVideoConfig();

  if (frame >= p.potongAt) return <KartuAkhir p={p} W={W} H={H} frame={frame} />;

  const D = KAMERA.jarak;
  const push = D * (1 - 1 / p.skala);
  const pushHold = D * (1 - 1 / (p.skala * (1 + p.driftSkala)));
  const bw = p.promptLebar * p.jendelaLebar * W;
  const camX = bw / 2 - ((p.tepiKananPrompt - 0.5) * W) / p.skala;
  const camY = (p.promptPusatY - 0.5) * H - ((p.layarYPrompt - 0.5) * H) / p.skala;
  const keys = [
    { at: 0, x: 0, y: 0, push: 0 },
    { at: p.punchAt, x: 0, y: 0, push: 0 },
    { at: p.punchAt + p.punchFrames, x: camX, y: camY, push, curve: "whip" as const },
    { at: p.potongAt - 1, x: camX + p.driftGeser * W, y: camY + p.driftGeser * 0.75 * H, push: pushHold, curve: "drift" as const },
  ];
  // gerak masuk "whip" bukan pembesaran elemen: satu transformasi pada seluruh grup desktop
  return (
    <Camera25D keys={keys} drift={{ amp: p.driftAmp * H, seed: p.seed }} background={p.tokens.jendela}>
      <Layer25D z={0}>
        <Desktop p={p} W={W} H={H} frame={frame} fps={fps} />
      </Layer25D>
    </Camera25D>
  );
};
