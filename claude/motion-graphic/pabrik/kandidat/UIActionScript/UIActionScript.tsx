import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Camera25D, Layer25D } from "../../../toolkit/kamera/Camera25D";
import { move } from "../../../toolkit/gerak/curves";
import { stagger } from "../../../toolkit/gerak/timing";

const Tokens = z.object({
  latar: z.string(),
  permukaan: z.string(),
  tinta: z.string(),
  redup: z.string(),
  aksen: z.string(),
  aksen2: z.string(),
  /** warna UI gelap (jendela, kaca prompt) */
  gelap: z.string(),
  /** warna teks/ikon di atas UI gelap */
  terang: z.string(),
  huruf: z.string(),
});

export const UIActionScriptPropsSchema = z.object({
  tokens: Tokens,
  seed: z.number(),
  isi: z.object({
    prompt: z.string(),
    model: z.string(),
    mode: z.string(),
    jendelaJudul: z.string(),
    media: z.array(z.string()),
    preview: z.string(),
    properti: z.array(z.tuple([z.string(), z.string()])),
    trek: z.array(z.object({ label: z.string(), klip: z.array(z.object({ teks: z.string(), dari: z.number(), sampai: z.number() })) })),
    dock: z.array(z.string()),
    kartuAkhir: z.object({ judul: z.string(), sub: z.string() }),
  }),
  waktu: z.object({
    ketikMulai: z.number(),
    /** huruf per detik */
    lajuKetik: z.number(),
    punchAt: z.number(),
    /** 1 = potongan keras, 4-6 = whip */
    punchFrames: z.number(),
    sweepMulai: z.number(),
    sweepFrames: z.number(),
    potongAt: z.number(),
    umurSel: z.number(),
  }),
  kamera: z.object({
    zoom: z.number(),
    zoomHold: z.number(),
    /** posisi tengah kotak prompt setelah punch, fraksi tinggi frame */
    kotakY: z.number(),
    /** tepi kanan kotak setelah punch, fraksi lebar frame */
    kotakKanan: z.number(),
    /** amplitudo napas kamera, fraksi tinggi */
    drift: z.number(),
  }),
  bobot: z.object({ biasa: z.number(), tebal: z.number() }),
  radius: z.number().default(0.2),
  border: z.object({ lebar: z.number(), opasitas: z.number() }).default({ lebar: 0.002, opasitas: 0.15 }),
  blur: z.number().default(0.012),
  bayangan: z
    .object({ offset_x: z.number(), offset_y: z.number(), blur: z.number(), opasitas: z.number() })
    .default({ offset_x: 0, offset_y: 0.012, blur: 0.035, opasitas: 0.35 }),
});
export type UIActionScriptProps = z.infer<typeof UIActionScriptPropsSchema>;

const rng = (seed: number) => {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const ridge = (seed: number, base: number, amp: number) => {
  const r = rng(seed);
  const pts: string[] = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * 100;
    const y = base - amp * (0.5 + 0.5 * Math.sin(i * 0.9 + seed)) - amp * r();
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M0,100 L${pts.join(" L")} L100,100 Z`;
};

/**
 * Jendela UI gelap mengambang di atas wallpaper: kalimat prompt diketik cepat, kamera melompat ±1,65× ke kotak prompt, hold berdrift, sapuan sel grid, potong ke end card.
 * Pakai bila: satu kalimat perintah/prompt harus terbaca besar di dalam konteks antarmuka tanpa teks kinetik terpisah.
 * Jangan bila: tidak ada permukaan UI yang perlu ditunjukkan, kalimatnya panjang lebih dari satu baris, atau butuh gerak kamera yang mulus lambat.
 */
export const UIActionScript: React.FC<UIActionScriptProps> = (p) => {
  const frame = useCurrentFrame();
  const { width: W, height: H, fps } = useVideoConfig();
  const { tokens: t, isi, waktu: w, kamera: k, bobot, radius, border, blur, bayangan } = p;

  const s = Math.min(H, (W * 9) / 16);
  const sw = (s * 16) / 9;
  const ox = (W - sw) / 2, oy = (H - s) / 2;
  const D = s * 1.389;

  // geometri (stage 16:9, satuan s)
  const ww = 0.64 * sw, wh = 0.67 * s, wx = (sw - ww) / 2, wy = 0.15 * s;
  const bw = 0.8 * ww, bh = 0.18 * s, bx = (sw - bw) / 2, by = 0.52 * s - bh / 2;
  const pad = 0.032 * s;
  const rr = radius * s * 0.26;
  const punched = frame >= w.punchAt + w.punchFrames;
  const fTeks = 0.03 * s, fKecil = 0.026 * s;
  const bayanganCss = (_a?: number) => `${bayangan.offset_x * s}px ${bayangan.offset_y * s}px ${bayangan.blur * s}px ${t.gelap}`;

  // kamera: dari target penempatan kotak prompt
  const camFor = (z: number) => ({
    push: D * (1 - 1 / z),
    x: bw / 2 - (k.kotakKanan * sw - sw / 2) / z,
    y: 0.02 * s - (k.kotakY * s - s / 2) / z,
  });
  const c1 = camFor(k.zoom), c2 = camFor(k.zoomHold);
  const keys = [
    { at: 0, push: 0, x: 0, y: 0 },
    { at: w.punchAt, push: 0, x: 0, y: 0 },
    { at: w.punchAt + w.punchFrames, push: c1.push, x: c1.x, y: c1.y, curve: "whip" as const },
    { at: w.potongAt, push: c2.push, x: c2.x, y: c2.y, curve: "drift" as const },
  ];

  // ketikan
  const huruf = Array.from(isi.prompt);
  const n = Math.min(huruf.length, Math.max(0, Math.floor(((frame - w.ketikMulai) * w.lajuKetik) / fps)));
  const ketik = huruf.slice(0, n).join("");
  const caretOn = Math.floor(frame / (fps * 0.25)) % 2 === 0;

  // sel mosaik
  const cols = Math.max(2, Math.round(bw / (0.1 * s)));
  const rows = Math.max(1, Math.round(bh / (0.1 * s)));
  const cw = bw / cols, ch = bh / rows;
  const rc = rng(p.seed + 5);
  const sel = Array.from({ length: cols * rows }, (_, i) => {
    const baris = Math.floor(i / cols);
    // baris teks memakai warna gelap agar kontras teks terjaga; baris bawah boleh cerah
    // sel hangat dari tone wallpaper (aksen), cukup pekat tetapi di bawah teks agar kontras teks terjaga
    const jenis = rc() < 0.78 ? t.aksen : t.aksen2;
    const amp = 0.4 + 0.25 * rc();
    const inset = 0.12 * rc();
    const st = stagger(i, cols * rows, {
      grid: [cols, rows],
      axis: "x",
      from: "first",
      gap: (w.sweepFrames - w.umurSel) / Math.max(1, cols - 1),
      jitter: 1.2,
      seed: p.seed,
      start: w.sweepMulai,
    });
    const a = move(frame, st, 2, "reveal") * (1 - move(frame, st + w.umurSel - 4, 4, "leave")) * amp;
    return { i, jenis, a, inset, x: (i % cols) * cw, y: baris * ch };
  });

  const ft = { fontFamily: t.huruf, color: t.terang, whiteSpace: "nowrap" as const, lineHeight: 1 };
  const garis = border.lebar * s;

  const kartuAkhir = frame >= w.potongAt;
  const ra = rng(p.seed + 9);
  const strip = Array.from({ length: 18 }, (_, i) => ({ x: (i % 6) * 17 - 4, y: Math.floor(i / 6) * 34 + 2, c: ra() < 0.5 ? t.aksen2 : t.aksen, o: 0.3 + 0.4 * ra() }));

  if (kartuAkhir) {
    const a = move(frame, w.potongAt, 6, "reveal");
    return (
      <div style={{ position: "absolute", inset: 0, background: t.gelap, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: -0.05 * s, filter: `blur(${0.025 * s}px)` }}>
          {strip.map((c, i) => (
            <div key={i} style={{ position: "absolute", left: `${c.x}%`, top: `${c.y}%`, width: "15%", height: "30%", borderRadius: 0.02 * s, background: c.c, opacity: c.o }} />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: t.gelap, opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.02 * s, opacity: a }}>
          <div style={{ ...ft, fontSize: 0.09 * s, fontWeight: bobot.tebal }}>{isi.kartuAkhir.judul}</div>
          <div style={{ ...ft, fontSize: 0.034 * s, fontWeight: bobot.biasa, opacity: 0.75 }}>{isi.kartuAkhir.sub}</div>
        </div>
      </div>
    );
  }

  const ridgeA = ridge(p.seed + 1, 66, 8), ridgeB = ridge(p.seed + 2, 84, 7);
  const dockIkon = [
    [t.aksen, t.gelap],
    [t.terang, t.gelap],
    [t.aksen2, t.terang],
  ];
  const iDock = 0.06 * s, gDock = 0.014 * s, pDock = 0.012 * s;
  const dockW = isi.dock.length * iDock + (isi.dock.length - 1) * gDock + 2 * pDock;
  const trX0 = 0.2 * ww, trW = 0.78 * ww;
  const klipWarna = [
    [t.aksen, t.gelap],
    [t.aksen2, t.terang],
    [t.terang, t.gelap],
  ];

  return (
    <Camera25D
      keys={keys}
      drift={{ amp: k.drift * s, seed: p.seed }}
      background={t.latar}
      distance={D}
    >
      <Layer25D z={0}>
        {/* wallpaper */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${t.aksen} 0%, ${t.aksen} 60%, ${t.aksen2} 100%)` }} />
        {/* cahaya berarah dari kiri atas: pita tegas, bukan noda bulat */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, ${t.terang} 0%, ${t.terang} 14%, transparent 46%)`, opacity: 0.42 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, transparent 0%, transparent 30%, ${t.terang} 34%, transparent 40%, transparent 58%, ${t.terang} 60%, transparent 63%)`, opacity: 0.12 }} />
        {/* kabut di antara punggung bukit */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d={ridge(p.seed + 3, 58, 6)} fill={t.aksen2} fillOpacity={0.3} />
          <path d={ridgeA} fill={t.aksen2} fillOpacity={0.55} />
          <rect x="0" y="58" width="100" height="22" fill={t.terang} fillOpacity={0.26} />
          <rect x="0" y="68" width="100" height="10" fill={t.terang} fillOpacity={0.18} />
          <path d={ridgeB} fill={t.aksen2} fillOpacity={0.9} />
          {Array.from({ length: 9 }, (_, i) => {
            const rb = rng(p.seed + 20 + i);
            const x = 6 + i * 11 + rb() * 5, h = 5 + rb() * 5;
            return <path key={i} d={`M${x},100 L${x},${100 - h}`} stroke={t.terang} strokeOpacity={0.35} strokeWidth={0.25} fill="none" />;
          })}
        </svg>

        <div style={{ position: "absolute", left: ox, top: oy, width: sw, height: s }}>
          {/* jendela */}
          <div style={{ position: "absolute", left: wx, top: wy, width: ww, height: wh, borderRadius: 0.014 * s, boxShadow: bayanganCss(0), opacity: bayangan.opasitas + 0.4 }} />
          <div style={{ position: "absolute", left: wx, top: wy, width: ww, height: wh, borderRadius: 0.014 * s, background: t.gelap, overflow: "hidden" }}>
            {/* bar judul */}
            <div style={{ position: "absolute", left: 0.016 * s, top: 0.019 * s, display: "flex", gap: 0.008 * s }}>
              {[t.aksen, t.aksen2, t.terang].map((c, i) => (
                <div key={i} style={{ width: 0.014 * s, height: 0.014 * s, borderRadius: "50%", background: c, opacity: i === 2 ? 0.5 : 1 }} />
              ))}
            </div>
            {!punched && <div style={{ ...ft, position: "absolute", left: 0, right: 0, top: 0.013 * s, textAlign: "center", fontSize: fKecil, fontWeight: bobot.biasa, opacity: 0.7 }}>{isi.jendelaJudul}</div>}

            {/* panel atas (media, preview, inspektur) hanya pra-punch: setelah punch berada di luar frame */}
            {!punched && (
              <>
                <div style={{ position: "absolute", left: 0.012 * s, top: 0.06 * s, width: 0.26 * ww, height: 0.17 * s, borderRadius: 0.01 * s, background: t.terang, opacity: 0.07 }} />
                {isi.media.slice(0, 3).map((m, i) => (
                  <React.Fragment key={i}>
                    <div style={{ position: "absolute", left: 0.022 * s, top: 0.07 * s + i * 0.05 * s, width: 0.05 * s, height: 0.035 * s, borderRadius: 0.005 * s, overflow: "hidden", background: `linear-gradient(180deg, ${t.aksen} 0%, ${t.aksen2} 100%)` }}>
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                        <path d={ridge(p.seed + 30 + i, 80 - i * 6, 25)} fill={t.gelap} fillOpacity={0.6} />
                        {i === 1 && <circle cx="30" cy="35" r="12" fill={t.terang} fillOpacity={0.7} />}
                        {i === 2 && <path d="M60,100 L60,40 L85,100 Z" fill={t.aksen2} fillOpacity={0.9} />}
                        {i === 0 && <rect x="15" y="20" width="30" height="30" fill={t.terang} fillOpacity={0.5} />}
                      </svg>
                    </div>
                    <div style={{ ...ft, position: "absolute", left: 0.08 * s, top: 0.0795 * s + i * 0.05 * s, fontSize: fKecil, fontWeight: bobot.biasa }}>{m}</div>
                  </React.Fragment>
                ))}
              </>
            )}

            {/* preview: adegan bermakna (siluet orang + lanskap), judul di strip bawah */}
            {!punched && <div style={{ position: "absolute", left: 0.3 * ww, top: 0.065 * s, width: 0.44 * ww, height: 0.17 * s, borderRadius: 0.01 * s, overflow: "hidden", background: `linear-gradient(180deg, ${t.aksen} 0%, ${t.aksen} 45%, ${t.aksen2} 100%)` }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${t.terang} 0%, transparent 45%)`, opacity: 0.3 }} />
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <path d={ridge(p.seed + 40, 40, 10)} fill={t.aksen2} fillOpacity={0.55} />
                <path d={ridge(p.seed + 41, 52, 8)} fill={t.aksen2} fillOpacity={0.85} />
                {/* pondok kecil + pohon: adegan bermakna */}
                <rect x="58" y="38" width="16" height="12" fill={t.gelap} fillOpacity={0.92} />
                <path d="M55,38 L66,28 L77,38 Z" fill={t.gelap} fillOpacity={0.92} />
                <rect x="64" y="43" width="4" height="7" fill={t.terang} fillOpacity={0.8} />
                {[18, 28, 38].map((x, i) => (
                  <path key={i} d={`M${x},52 L${x - 5},52 L${x},${36 - i * 3} L${x + 5},52 Z`} fill={t.gelap} fillOpacity={0.85} />
                ))}
                <rect x="0" y="50" width="100" height="10" fill={t.gelap} fillOpacity={0.75} />
              </svg>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 0.045 * s, background: t.gelap, opacity: 0.7 }} />
              <div style={{ ...ft, position: "absolute", left: 0.012 * s, bottom: 0.0095 * s, fontSize: fKecil, fontWeight: bobot.tebal }}>{isi.preview}</div>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", right: 0.01 * s, bottom: 0.0095 * s, width: 0.026 * s, height: 0.026 * s }}>
                <path d="M7 4 L20 12 L7 20 Z" fill={t.terang} />
              </svg>
            </div>}

            {/* inspektur */}
            {!punched && isi.properti.slice(0, 3).map(([a, b], i) => (
              <div key={i} style={{ position: "absolute", left: 0.76 * ww, width: 0.21 * ww, top: 0.09 * s + i * 0.04 * s, display: "flex", justifyContent: "space-between", ...ft, fontSize: fKecil, fontWeight: bobot.biasa }}>
                <span style={{ opacity: 0.65 }}>{a}</span>
                <span>{b}</span>
              </div>
            ))}

            {/* timeline */}
            {isi.trek.slice(0, 3).map((tr, ti) => (
              <React.Fragment key={ti}>
                {!punched && <div style={{ ...ft, position: "absolute", left: 0.02 * ww, top: 0.47 * s + ti * 0.058 * s + 0.0095 * s, fontSize: fKecil, fontWeight: bobot.biasa, opacity: 0.7 }}>{tr.label}</div>}
                {tr.klip.map((kl, ki) => {
                  const [bg, fg] = klipWarna[(ti + ki) % klipWarna.length];
                  const lebar = (kl.sampai - kl.dari) * trW;
                  const rb = rng(p.seed + 60 + ti * 7 + ki);
                  const jum = Math.max(3, Math.floor(lebar / (0.012 * s)));
                  return (
                    <div key={ki} style={{ position: "absolute", left: trX0 + kl.dari * trW, width: lebar, top: 0.47 * s + ti * 0.058 * s, height: 0.05 * s, borderRadius: 0.008 * s, background: bg, overflow: "hidden" }}>
                      <div style={{ ...ft, color: fg, position: "absolute", left: 0.01 * s, top: 0.005 * s, fontSize: fKecil, fontWeight: bobot.tebal }}>{kl.teks}</div>
                      {/* gelombang suara / ubin thumbnail di strip bawah */}
                      {Array.from({ length: jum }, (_, bi) => {
                        const v = 0.3 + 0.7 * rb();
                        return ti === 0 ? (
                          bi % 4 === 0 ? (
                            <svg key={bi} viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: "absolute", left: bi * 0.012 * s, bottom: 0.004 * s, width: 0.046 * s, height: 0.02 * s, opacity: 0.7 }}>
                              <rect width="100" height="60" fill={fg} fillOpacity={0.25} />
                              <path d={ridge(p.seed + 80 + bi + ki * 9, 70, 30)} fill={fg} fillOpacity={0.6} />
                              {v > 0.6 && <circle cx="70" cy="22" r="10" fill={fg} fillOpacity={0.8} />}
                            </svg>
                          ) : null
                        ) : (
                          <div key={bi} style={{ position: "absolute", left: bi * 0.012 * s + 0.003 * s, bottom: 0.004 * s, width: 0.005 * s, height: 0.012 * s * v, borderRadius: 0.002 * s, background: fg, opacity: 0.55 }} />
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div style={{ position: "absolute", left: wx, top: wy, width: ww, height: wh, borderRadius: 0.014 * s, border: `${garis}px solid ${t.terang}`, opacity: border.opasitas, boxSizing: "border-box" }} />

          {/* dock */}
          <div style={{ position: "absolute", left: (sw - dockW) / 2, top: 0.885 * s - iDock / 2 - pDock, width: dockW, height: iDock + 2 * pDock }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 0.025 * s, background: t.gelap, opacity: 0.6, backdropFilter: `blur(${blur * s}px)`, boxShadow: bayanganCss(0) }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 0.025 * s, border: `${garis}px solid ${t.terang}`, opacity: border.opasitas * 1.6, boxSizing: "border-box" }} />
            {isi.dock.map((d, i) => {
              const [bg, fg] = dockIkon[i % dockIkon.length];
              return (
                <div key={i} style={{ position: "absolute", left: pDock + i * (iDock + gDock), top: pDock, width: iDock, height: iDock, borderRadius: 0.016 * s, background: bg, overflow: "hidden" }}>
                  <svg viewBox="0 0 24 24" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-label={d}>
                    {i % 3 === 0 && <circle cx="12" cy="12" r="5" fill={fg} />}
                    {i % 3 === 1 && <rect x="7" y="7" width="10" height="10" rx="2" fill={fg} />}
                    {i % 3 === 2 && <path d="M7 17 L12 6 L17 17 Z" fill={fg} />}
                  </svg>
                </div>
              );
            })}
          </div>

          {/* kotak prompt kaca */}
          <div style={{ position: "absolute", left: bx, top: by, width: bw, height: bh }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: rr, boxShadow: bayanganCss(0), opacity: bayangan.opasitas }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: rr, background: t.gelap, opacity: 0.7, backdropFilter: `blur(${blur * s}px)` }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: rr, background: `linear-gradient(170deg, ${t.terang} 0%, transparent 70%)`, opacity: 0.16 }} />
            {/* sel mosaik: di atas kaca, di bawah teks */}
            <div style={{ position: "absolute", inset: 0, borderRadius: rr, overflow: "hidden" }}>
              {sel.map((c) =>
                c.a > 0.01 ? (
                  <div
                    key={c.i}
                    style={{ position: "absolute", left: c.x + c.inset * cw * 0.5, top: c.y + c.inset * ch * 0.5, width: cw * (1 - c.inset), height: ch * (1 - c.inset), borderRadius: 0.006 * s, background: c.jenis, opacity: c.a }}
                  />
                ) : null,
              )}
            </div>
            <div style={{ position: "absolute", inset: 0, borderRadius: rr, border: `${garis * 1.5}px solid ${t.terang}`, opacity: border.opasitas * 1.6, boxSizing: "border-box" }} />

            <div style={{ position: "absolute", left: pad, top: pad, width: bw - 2 * pad, height: fTeks * 1.25, overflow: "hidden", ...ft, fontSize: fTeks, fontWeight: bobot.biasa }}>
              <span>{ketik}</span>
              <span style={{ display: "inline-block", width: 0.004 * s, height: fTeks * 1.05, marginLeft: 0.004 * s, verticalAlign: "bottom", background: t.aksen, opacity: caretOn ? 1 : 0 }} />
            </div>

            <svg viewBox="0 0 24 24" style={{ position: "absolute", left: pad, bottom: pad * 0.6 + 0.01 * s, width: 0.03 * s, height: 0.03 * s }}>
              <path d="M12 4 V20 M4 12 H20" stroke={t.terang} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.8} />
            </svg>
            <div style={{ position: "absolute", right: pad + 0.05 * s + 0.02 * s, bottom: pad * 0.6 + 0.0125 * s, display: "flex", gap: 0.012 * s, ...ft, fontSize: fKecil }}>
              <span style={{ fontWeight: bobot.tebal }}>{isi.model}</span>
              <span style={{ opacity: 0.55, fontWeight: bobot.biasa }}>{isi.mode}</span>
            </div>
            <div style={{ position: "absolute", right: pad, bottom: pad * 0.6, width: 0.05 * s, height: 0.05 * s, borderRadius: "50%", background: t.aksen }}>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", inset: 0.011 * s, width: 0.028 * s, height: 0.028 * s }}>
                <path d="M12 19 V6 M6 11 L12 5 L18 11" stroke={t.gelap} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </Layer25D>
    </Camera25D>
  );
};
