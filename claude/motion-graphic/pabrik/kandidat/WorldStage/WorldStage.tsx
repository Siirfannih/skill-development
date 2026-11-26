import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp01, drift, lerp, move } from "../../../toolkit/gerak/curves";
import { stagger } from "../../../toolkit/gerak/timing";

const curveNames = ["land", "heavy", "whip", "reveal", "leave", "wind", "drift"] as const;

const KeySchema = z.object({
  t: z.number(), // 0..1 sepanjang durasiDetik
  cx: z.number(), // titik dunia di pusat layar, fraksi lebar frame
  cy: z.number(), // fraksi tinggi frame
  skala: z.number(),
  kurva: z.enum(curveNames).optional(), // kurva menuju kunci ini
});

export const WorldStagePropsSchema = z.object({
  tokens: z.object({
    latar: z.string(),
    permukaan: z.string(),
    tinta: z.string(),
    redup: z.string(),
    aksen: z.string(),
    aksen2: z.string(),
    jendela: z.string(), // permukaan gelap UI (jendela dan panel)
    teksJendela: z.string(), // teks di atas jendela
    huruf: z.string(),
  }),
  bobot: z.number(),
  seed: z.number(),
  teks: z.object({
    judulJendela: z.string(),
    pratinjau: z.string(),
    inspektur: z.array(z.tuple([z.string(), z.string()])),
    klip: z.array(z.string()),
    judulPanel: z.string(),
    pesanPengguna: z.string(),
    balasan: z.string(),
    prompt: z.string(),
    ikonDock: z.array(z.string()),
  }),
  mulai: z.number().default(12), // frame saat t = 0 (setelah transisi grid)
  durasiDetik: z.number().default(2.5),
  kurva: z.enum(curveNames).default("reveal"),
  kunci: z
    .array(KeySchema)
    .default([
      { t: 0, cx: 0.5, cy: 0.5, skala: 1 },
      { t: 0.26, cx: 0.5, cy: 0.5, skala: 1 },
      { t: 0.5, cx: 0.302, cy: 0.5, skala: 0.91 },
      { t: 0.7, cx: 0.302, cy: 0.5, skala: 0.91 },
      { t: 0.8, cx: 0.07, cy: 0.75, skala: 2.1 },
      { t: 1.0, cx: 0.07, cy: 0.75, skala: 2.15, kurva: "drift" },
    ]),
  kisi: z.object({ kolom: z.number(), baris: z.number() }).default({ kolom: 16, baris: 9 }),
  kisiMulai: z.number().default(1),
  kisiJeda: z.number().default(0.4),
  driftAmp: z.number().default(0.004), // fraksi tinggi
  ketikOffset: z.number().default(2),
  ketikDurasi: z.number().default(14),
  teksMuncul: z.number().default(7),
});

export type WorldStageProps = z.infer<typeof WorldStagePropsSchema>;
export type WorldStageInput = z.input<typeof WorldStagePropsSchema>;

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Satu dunia datar (latar, jendela, dock, panel) digerakkan sebagai satu grup oleh kamera 2D virtual: geser memberi ruang bagi panel baru, lalu punch ke sudut; masuk lewat wipe grid blok.
 * Pakai bila: ingin menunjukkan detail UI dari ruang kerja utuh tanpa potongan, dan nada UI berbeda dari latar.
 * Jangan bila: butuh paralaks kedalaman (pakai Camera25D) atau UI dan latar bernada sama.
 */
export const WorldStage: React.FC<WorldStageInput> = (input) => {
  const p = WorldStagePropsSchema.parse(input);
  const frame = useCurrentFrame();
  const { width: W, height: H, fps } = useVideoConfig();
  const { tokens: tk, teks } = p;
  const u = (v: number) => v * H; // fraksi tinggi -> px
  const fr = (t: number) => p.mulai + t * p.durasiDetik * fps;

  // kamera: satu keadaan untuk seluruh dunia
  let cam = { cx: p.kunci[0].cx, cy: p.kunci[0].cy, s: p.kunci[0].skala };
  for (let i = 1; i < p.kunci.length; i++) {
    const a = p.kunci[i - 1], b = p.kunci[i];
    const start = fr(a.t);
    if (frame < start) break;
    const k = move(frame, start, fr(b.t) - start, b.kurva ?? p.kurva);
    cam = { cx: lerp(a.cx, b.cx, k), cy: lerp(a.cy, b.cy, k), s: lerp(a.skala, b.skala, k) };
  }
  const dr = drift(frame, fps, u(p.driftAmp), p.seed);
  const tx = W / 2 - cam.cx * W * cam.s + dr.x;
  const ty = H / 2 - cam.cy * H * cam.s + dr.y;

  // panel masuk dari kiri bersama gerak kamera
  const pStart = fr(p.kunci[1]?.t ?? 0.26), pLen = fr(p.kunci[2]?.t ?? 0.5) - pStart;
  const panelK = move(frame, pStart, pLen, p.kurva);
  const panelX = -0.43 * W * (1 - panelK);
  const cop = clamp01((panelK - 0.8) / 0.2); // isi panel tampil setelah panel tiba (tidak terpotong tepi saat meluncur)

  const teksOp = move(frame, p.teksMuncul, 4, "reveal");
  const font: React.CSSProperties = { fontFamily: tk.huruf, fontWeight: p.bobot, lineHeight: 1, whiteSpace: "nowrap", position: "absolute" };
  const Tx: React.FC<{ x: number; y: number; size: number; color: string; op?: number; children: React.ReactNode }> = ({ x, y, size, color, op = 1, children }) => (
    <div style={{ ...font, left: u(x), top: u(y), fontSize: u(size), color, opacity: op }}>{children}</div>
  );

  // jendela (koordinat lokal dalam fraksi tinggi)
  const winL = 0.21 * W, winT = u(0.1), winW = 0.58 * W, winH = u(0.68);
  const panelL = -0.247 * W, panelW = 0.423 * W;
  const cL = -0.15 * W, cW = 0.3 * W; // kolom isi panel
  const boxT = u(0.8), boxH = u(0.12);
  const ketikMulai = fr(p.kunci[2]?.t ?? 0.5) + p.ketikOffset;
  const rw = rng(p.seed + 3);
  const wave = Array.from({ length: 40 }, (_, i) => 0.012 + 0.04 * Math.abs(Math.sin(i * 0.45)) * (0.4 + rw() * 0.6));
  const typed = Math.floor(
    interpolate(frame, [ketikMulai, ketikMulai + p.ketikDurasi], [0, teks.prompt.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const cursorOn = Math.floor(frame / 8) % 2 === 0 || typed < teks.prompt.length;

  // dock (rata kiri di bawah jendela)
  const ic = u(0.07), icGap = u(0.02), icPad = u(0.014);
  const icRowW = teks.ikonDock.length * ic + (teks.ikonDock.length - 1) * icGap;
  const dockL = winL, dockW = icRowW + 2 * icPad, dockT = u(0.87), dockH = u(0.095);
  const icColors = [tk.aksen, tk.tinta, tk.aksen2, tk.aksen, tk.tinta, tk.aksen2];

  // wallpaper: faset segitiga tajam berbiji (opak, tanpa noise)
  const facets = (() => {
    const r = rng(p.seed + 11);
    const cols = 14, rows = 10, x0 = -0.6 * W, y0 = -0.6 * H, cw0 = (2.2 * W) / cols, ch0 = (2.2 * H) / rows;
    const pts = Array.from({ length: (rows + 1) * (cols + 1) }, (_, k) => {
      const gx = k % (cols + 1), gy = Math.floor(k / (cols + 1));
      const edge = gx === 0 || gy === 0 || gx === cols || gy === rows;
      return [x0 + gx * cw0 + (edge ? 0 : (r() - 0.5) * 0.7 * cw0), y0 + gy * ch0 + (edge ? 0 : (r() - 0.5) * 0.7 * ch0)];
    });
    const out: { d: string; fill: string }[] = [];
    const tone = (gx: number, gy: number) => {
      const pos = (gx + gy) / (cols + rows);
      const q = r();
      const m = Math.round(100 * clamp01(1 - pos * 1.3 + (q - 0.5) * 0.5));
      const base = `color-mix(in srgb, ${tk.aksen2} ${m}%, ${tk.aksen})`;
      return q > 0.78 ? `color-mix(in srgb, ${tk.permukaan} ${Math.round(14 + q * 30)}%, ${base})` : base;
    };
    for (let gy = 0; gy < rows; gy++)
      for (let gx = 0; gx < cols; gx++) {
        const a = pts[gy * (cols + 1) + gx], b = pts[gy * (cols + 1) + gx + 1], c = pts[(gy + 1) * (cols + 1) + gx], d = pts[(gy + 1) * (cols + 1) + gx + 1];
        out.push({ d: `M${a[0]},${a[1]}L${b[0]},${b[1]}L${c[0]},${c[1]}Z`, fill: tone(gx, gy) });
        out.push({ d: `M${b[0]},${b[1]}L${d[0]},${d[1]}L${c[0]},${c[1]}Z`, fill: tone(gx + 1, gy) });
      }
    return out;
  })();

  // grid transisi masuk
  const nCell = p.kisi.kolom * p.kisi.baris;
  const rand = rng(p.seed);
  const cells = Array.from({ length: nCell }, (_, i) => {
    const delay = stagger(i, nCell, { grid: [p.kisi.kolom, p.kisi.baris], axis: "x", gap: p.kisiJeda, jitter: 0.6, seed: p.seed, start: p.kisiMulai });
    const pick = rand();
    return { i, delay, color: pick < 0.5 ? tk.aksen : pick < 0.8 ? tk.jendela : tk.aksen2 };
  });
  const cw = W / p.kisi.kolom, ch = H / p.kisi.baris;

  const clipRows = [
    { r: 0, x: 0.18, w: 0.3, c: tk.aksen, t: tk.jendela, i: 0 },
    { r: 0, x: 0.5, w: 0.46, c: tk.aksen, t: tk.jendela, i: 1 },
    { r: 1, x: 0.3, w: 0.5, c: tk.aksen2, t: tk.teksJendela, i: 2 },
  ];
  const rowY = (r: number) => 0.43 + r * 0.075;
  const shapes = (fg: string) => [
    <circle key="a" cx="50" cy="50" r="32" fill={fg} />,
    <polygon key="b" points="30,20 82,50 30,80" fill={fg} />,
    <rect key="c" x="20" y="20" width="60" height="60" rx="10" fill="none" stroke={fg} strokeWidth="11" />,
    <path key="d" d="M14 76 L38 30 L54 56 L66 40 L88 76 Z" fill={fg} />,
    <circle key="e" cx="50" cy="50" r="28" fill="none" stroke={fg} strokeWidth="12" />,
    <path key="f" d="M24 52 L44 72 L78 28" fill="none" stroke={fg} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />,
  ];
  const tilePos = (i: number) => dockL + icPad + i * (ic + icGap);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: tk.latar }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${cam.s})` }}>
        {/* wallpaper: faset tajam, melampaui frame */}
        <svg style={{ position: "absolute", left: -2 * W, top: -2 * H }} width={5 * W} height={5 * H} viewBox={`${-2 * W} ${-2 * H} ${5 * W} ${5 * H}`} shapeRendering="crispEdges">
          <rect x={-2 * W} y={-2 * H} width={5 * W} height={5 * H} fill={tk.aksen} />
          {facets.map((f, i) => (
            <path key={i} d={f.d} fill={f.fill} />
          ))}
        </svg>

        {/* jendela UI */}
        <div style={{ position: "absolute", left: winL, top: winT + u(0.03), width: winW, height: winH, borderRadius: u(0.018), background: tk.jendela, opacity: 0.35, filter: `blur(${u(0.03)}px)` }} />
        <div style={{ position: "absolute", left: winL, top: winT, width: winW, height: winH, borderRadius: u(0.018), background: tk.jendela, overflow: "hidden" }}>
          {[0, 1, 2].map((d) => (
            <div key={d} style={{ position: "absolute", left: u(0.03 + d * 0.026), top: u(0.022), width: u(0.016), height: u(0.016), borderRadius: "50%", background: tk.teksJendela, opacity: 0.45 }} />
          ))}
          <Tx x={0.16} y={0.012} size={0.036} color={tk.teksJendela} op={teksOp * 0.7}>{teks.judulJendela}</Tx>
          {/* pratinjau: kurva easing dengan kunci */}
          <div style={{ position: "absolute", left: u(0.04), top: u(0.09), width: u(0.5), height: u(0.3), borderRadius: u(0.012), background: tk.teksJendela, opacity: 0.08 }} />
          <Tx x={0.07} y={0.105} size={0.036} color={tk.teksJendela} op={teksOp}>{teks.pratinjau}</Tx>
          <svg style={{ position: "absolute", left: u(0.08), top: u(0.18), overflow: "visible" }} width={u(0.42)} height={u(0.19)} viewBox="0 0 100 45">
            <path d="M0,45 C16,0 30,0 100,0" fill="none" stroke={tk.aksen} strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="0" cy="45" r="3.2" fill={tk.aksen2} />
            <circle cx="100" cy="0" r="3.2" fill={tk.aksen2} />
          </svg>
          {/* inspektur */}
          {teks.inspektur.map(([k, v], i) => (
            <React.Fragment key={k}>
              <Tx x={0.58} y={0.1 + i * 0.085} size={0.036} color={tk.teksJendela} op={teksOp * 0.7}>{k}</Tx>
              <Tx x={0.84} y={0.1 + i * 0.085} size={0.036} color={tk.teksJendela} op={teksOp}>{v}</Tx>
            </React.Fragment>
          ))}
          {/* timeline */}
          {["V1", "V2", "A1"].map((l, r) => (
            <Tx key={l} x={0.1} y={rowY(r) + 0.012} size={0.034} color={tk.teksJendela} op={teksOp * 0.7}>{l}</Tx>
          ))}
          {clipRows.map((c) => (
            <React.Fragment key={c.i}>
              <div style={{ position: "absolute", left: u(c.x), top: u(rowY(c.r)), width: u(c.w), height: u(0.06), borderRadius: u(0.01), background: c.c }} />
              <Tx x={c.x + 0.015} y={rowY(c.r) + 0.013} size={0.034} color={c.t} op={teksOp}>{teks.klip[c.i] ?? ""}</Tx>
            </React.Fragment>
          ))}
          {wave.map((h, i) => (
            <div key={i} style={{ position: "absolute", left: u(0.18 + i * 0.0195), top: u(rowY(2) + 0.03 - h / 2), width: u(0.0095), height: u(h), borderRadius: u(0.0045), background: i % 6 === 0 ? tk.aksen2 : tk.aksen }} />
          ))}
        </div>

        {/* dock */}
        <div style={{ position: "absolute", left: dockL, top: dockT, width: dockW, height: dockH, borderRadius: u(0.025), background: tk.permukaan, boxShadow: `0 ${u(0.008)}px ${u(0.02)}px ${tk.aksen2}` }} />
        {teks.ikonDock.map((g, i) => {
          const bg = icColors[i % icColors.length];
          const fg = bg === tk.aksen ? tk.jendela : tk.permukaan;
          return (
            <div key={i} aria-label={g} style={{ position: "absolute", left: tilePos(i), top: dockT + (dockH - ic) / 2, width: ic, height: ic, borderRadius: u(0.016), background: bg, boxShadow: `0 ${u(0.004)}px ${u(0.008)}px ${tk.aksen2}` }}>
              <svg width={ic} height={ic} viewBox="0 0 100 100">{shapes(fg)[i % 6]}</svg>
            </div>
          );
        })}

        {/* panel chat: masuk dari kiri */}
        <div style={{ position: "absolute", left: panelL + panelX, top: -2 * H, width: panelW, height: 5 * H }}>
          <div style={{ position: "absolute", inset: 0, background: tk.jendela }} />
          <div style={{ position: "absolute", left: panelW, top: -2 * H, width: u(0.02), height: 5 * H, background: tk.jendela, opacity: 0.3 }} />
        </div>
        <div style={{ position: "absolute", left: panelX, top: 0, opacity: cop }}>
          <div style={{ ...font, left: cL, top: u(0.05), fontSize: u(0.04), color: tk.teksJendela }}>{teks.judulPanel}</div>
          <div style={{ position: "absolute", left: cL, top: u(0.56), width: cW, height: u(0.08), borderRadius: u(0.016), background: tk.teksJendela, opacity: 0.12 }} />
          <div style={{ ...font, left: cL + u(0.022), top: u(0.56 + 0.024), fontSize: u(0.032), color: tk.teksJendela }}>{teks.pesanPengguna}</div>
          <div style={{ ...font, left: cL, top: u(0.675), fontSize: u(0.032), color: tk.teksJendela, opacity: 0.8 }}>{teks.balasan}</div>
          <div style={{ position: "absolute", left: cL, top: boxT, width: cW, height: boxH, borderRadius: u(0.025), background: tk.teksJendela, opacity: 0.12 }} />
          <div style={{ ...font, left: cL + u(0.022), top: boxT + (boxH - u(0.03)) / 2, fontSize: u(0.03), color: tk.teksJendela }}>
            {teks.prompt.slice(0, typed)}
            {cursorOn && <span style={{ display: "inline-block", width: u(0.004), height: u(0.03), marginLeft: u(0.004), background: tk.aksen, verticalAlign: "top" }} />}
          </div>
          <div style={{ position: "absolute", left: cL + cW - u(0.065), top: boxT + (boxH - u(0.05)) / 2, width: u(0.05), height: u(0.05), borderRadius: u(0.014), background: tk.aksen, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: tk.huruf, fontWeight: p.bobot, fontSize: u(0.032), lineHeight: 1, color: tk.jendela }}>↑</div>
          </div>
        </div>
      </div>

      {/* transisi masuk: wipe kisi blok dari kiri ke kanan */}
      {cells.map((c) =>
        frame < c.delay ? (
          <div
            key={c.i}
            style={{ position: "absolute", left: (c.i % p.kisi.kolom) * cw, top: Math.floor(c.i / p.kisi.kolom) * ch, width: cw + 1, height: ch + 1, background: c.color }}
          />
        ) : null,
      )}
    </div>
  );
};
