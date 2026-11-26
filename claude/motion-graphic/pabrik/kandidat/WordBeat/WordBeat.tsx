import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { move, drift, clamp01, lerp } from "../../../toolkit/gerak/curves";
import { timeline } from "../../../toolkit/gerak/timing";
import { acakIndeks, idAman } from "../../../scripts/remotion/ae-primitives/inti/acak";

export const WordBeatPropsSchema = z.object({
  /** Kalimat, satu kata per ketukan (maks 6). */
  kata: z.array(z.string()).min(1).max(6),
  tokens: z.object({
    fond: z.string(),
    tinta: z.string(),
    huruf: z.string(),
    bobot: z.number(),
    /** Warna "pukulan" per kata (dipakai berulang bila kurang). */
    warnaKata: z.array(z.string()).min(1),
    warnaBentuk: z.array(z.string()).min(1),
    /** Warna jalur tegas di belakang baris akhir, warna kata di atasnya, dan warna aksen di atasnya. */
    blok: z.string(),
    teksBlok: z.string(),
    aksenBlok: z.string(),
  }),
  /** Tanda baca: bentuk di sela setelah kata ke-`setelah`; `sisi` = fraksi tinggi frame; `warna` = indeks warnaBentuk. */
  sela: z.array(
    z.object({
      setelah: z.number().int().min(0),
      bentuk: z.enum(["lingkaran", "persegi", "seperempat", "kapsul"]),
      sisi: z.number(),
      warna: z.number().int().min(0),
    }),
  ),
  /** Indeks kata yang tetap berwarna pada baris akhir. */
  aksenTetap: z.array(z.number().int().min(0)),
  seed: z.number(),
  /** Tinggi huruf kapital saat dibangun (fraksi tinggi frame). */
  kapRaksasa: z.number().default(0.42),
  /** Tinggi huruf kapital baris akhir (fraksi tinggi frame). */
  kapAkhir: z.number().default(0.045),
  pusatY: z.number().default(0.52),
  rasioKapital: z.number().default(0.72),
  /** Celah antar kata, kelipatan tinggi kapital. */
  celahEm: z.number().default(0.25),
  /** Bagian sisi bentuk yang menimpa tepi kata. */
  tumpang: z.number().default(0.08),
  masukFrame: z.number().default(10),
  jedaBeat: z.number().default(10),
  jedaPendek: z.number().default(0.75),
  jitterBeat: z.number().default(1),
  blurEm: z.number().default(0.18),
  naikEm: z.number().default(0.1),
  /** Posisi horizontal tepi kanan kata terbaru (fraksi lebar frame). */
  jangkarX: z.number().default(0.9),
  tahanSebelumTarik: z.number().default(6),
  tarikFrame: z.number().default(30),
  lepasFrame: z.number().default(6),
  /** Seberapa jauh kata baru meluncur dari kanan (kelipatan lebarnya). */
  dorong: z.number().default(0.4),
  /** Lebar zona fade di tepi kiri (fraksi lebar frame). */
  fadeKiri: z.number().default(0.1),
  /** Tinggi minimum jalur baris akhir (fraksi tinggi frame) dan kelipatan tinggi baris teks. */
  blokMin: z.number().default(0.3),
  blokKali: z.number().default(1.5),
  driftRel: z.number().default(0.004),
});
export type WordBeatProps = z.infer<typeof WordBeatPropsSchema>;

const cacheUkur = new Map<string, number>();
/** Lebar teks (px) lewat kanvas; cadangan perkiraan bila kanvas tidak ada. */
const ukur = (teks: string, bobot: number, px: number, huruf: string) => {
  const key = `${bobot}|${px}|${huruf}|${teks}`;
  const hit = cacheUkur.get(key);
  if (hit !== undefined) return hit;
  let w = teks.length * px * 0.56;
  if (typeof document !== "undefined") {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.font = `${bobot} ${px}px ${huruf}`;
      w = ctx.measureText(teks).width;
    }
  }
  cacheUkur.set(key, w);
  return w;
};

const bentukStyle = (b: "lingkaran" | "persegi" | "seperempat" | "kapsul", s: number): React.CSSProperties => {
  if (b === "lingkaran") return { width: s, height: s, borderRadius: "50%" };
  if (b === "persegi") return { width: s, height: s, borderRadius: s * 0.04 };
  if (b === "seperempat") return { width: s, height: s, borderRadius: `${s}px 0 0 0` };
  return { width: s, height: s * 0.55, borderRadius: s };
};

const campur = (a: string, pct: number, b: string) => `color-mix(in srgb, ${a} ${Math.round(clamp01(pct) * 100)}%, ${b})`;

/**
 * Kalimat pendek dibangun satu kata per ketukan pada skala raksasa (masuk dengan blur gerak, warna pukulan per kata, bentuk kecil di sela), lalu seluruh grup ditarik mengecil menjadi satu baris judul di atas jalur tegas.
 * Pakai bila: ada kalimat ≤ 6 kata yang ingin dipukul kata demi kata lalu mendarat sebagai judul kecil.
 * Jangan bila: teks panjang/paragraf, kata harus tetap terbaca besar sampai akhir, atau latar harus bergerak/berlapis.
 */
export const WordBeat: React.FC<z.input<typeof WordBeatPropsSchema>> = (raw) => {
  const p = WordBeatPropsSchema.parse(raw);
  const frame = useCurrentFrame();
  const { width: W, height: H, fps } = useVideoConfig();
  const { tokens } = p;
  const n = p.kata.length;

  const cap = p.kapRaksasa * H;
  const fs = cap / p.rasioKapital;
  const g = p.celahEm * cap;

  // Ketukan: timeline berjarak tidak rata (kata pendek lebih singkat) + jitter berbiji.
  const tl = timeline();
  p.kata.forEach((w, i) => {
    const faktor = w.length <= 3 ? p.jedaPendek : 1;
    const jit = Math.round((acakIndeks(p.seed, i) - 0.5) * 2 * p.jitterBeat);
    const gap = Math.max(3, Math.round(p.jedaBeat * faktor) + jit);
    tl.add(`w${i}`, p.masukFrame, i === 0 ? 0 : `<<+=${gap}`);
  });
  const beat = p.kata.map((_, i) => tl.at(`w${i}`));
  const tarikMulai = tl.total + p.tahanSebelumTarik;

  const q = move(frame, tarikMulai, p.tarikFrame, "heavy");
  const skalaAkhir = p.kapAkhir / p.kapRaksasa;
  const skala = Math.pow(skalaAkhir, q);

  const selaDi = (i: number) => p.sela.find((s) => s.setelah === i - 1);

  // Tata letak mutlak (x relatif ke awal baris, px tak berskala).
  const lebar = p.kata.map((w) => ukur(w, tokens.bobot, fs, tokens.huruf));
  const kataX: number[] = [];
  const kanan: number[] = [];
  const bentukX: (number | undefined)[] = [];
  const sisiPx: number[] = [];
  let cur = 0;
  for (let i = 0; i < n; i++) {
    const sela = i > 0 ? selaDi(i) : undefined;
    if (i === 0) {
      kataX[i] = 0;
    } else if (sela) {
      const s = sela.sisi * H;
      const ov = p.tumpang * s;
      bentukX[i] = cur - ov;
      sisiPx[i] = s;
      kataX[i] = cur - ov + s - ov;
    } else {
      kataX[i] = cur + g;
    }
    cur = kataX[i] + lebar[i];
    kanan[i] = cur;
  }
  const total = cur;

  // Kamera: kata terbaru berlabuh di jangkarX; kata baru meluncur dari kanan sedikit.
  let k = -1;
  for (let i = 0; i < n; i++) if (frame >= beat[i]) k = i;
  let X = 0;
  if (k >= 0) {
    const prK = move(frame, beat[k], p.masukFrame, "land");
    const prev = k === 0 ? 0 : kanan[k - 1];
    const Rcur = kanan[k] - (kanan[k] - prev) * (1 - prK) * p.dorong;
    X = p.jangkarX * W - Rcur;
  }
  const Xakhir = W / 2 - total / 2;
  const Xrow = lerp(X, Xakhir, q);

  const layar = (x: number) => W / 2 + (Xrow + x - W / 2) * skala;
  const pudar = (xKiri: number) => clamp01(layar(xKiri) / (p.fadeKiri * W));

  const filters: React.ReactNode[] = [];
  const bentuk: React.ReactNode[] = [];
  const kataEl: React.ReactNode[] = [];
  const uid = `wb${idAman(String(p.seed))}`;
  const bandP = clamp01((q - 0.15) / 0.15);
  const wipe = clamp01((q - 0.02) / 0.15);

  for (let i = 0; i < n; i++) {
    if (frame < beat[i]) continue;
    const pr = move(frame, beat[i], p.masukFrame, "land");
    const sisaBlur = (1 - pr) * (1 - pr);
    const sigma = p.blurEm * cap * sisaBlur;

    if (bentukX[i] !== undefined) {
      const sela = selaDi(i)!;
      const s = sisiPx[i];
      const warna = tokens.warnaBentuk[sela.warna % tokens.warnaBentuk.length];
      bentuk.push(
        <div
          key={`s${i}`}
          style={{
            position: "absolute",
            left: Xrow + (bentukX[i] as number),
            top: p.pusatY * H - (bentukStyle(sela.bentuk, s).height as number) / 2,
            background: warna,
            opacity: clamp01(pr * 4) * pudar(bentukX[i] as number),
            transform: `scale(${lerp(0.85, 1, pr)})`,
            filter: sigma > 0.3 ? `blur(${sigma}px)` : "none",
            ...bentukStyle(sela.bentuk, s),
          }}
        />,
      );
    }

    const fid = `${uid}-${i}`;
    if (sigma > 0.3) {
      filters.push(
        <filter key={fid} id={fid} x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur stdDeviation={`${sigma} 0`} />
        </filter>,
      );
    }
    const relMulai = i < n - 1 ? beat[i + 1] : tarikMulai;
    const tetap = p.aksenTetap.includes(i);
    const pAks = tetap ? 1 : 1 - move(frame, relMulai, p.lepasFrame, "reveal");
    const warnaPukul = tokens.warnaKata[i % tokens.warnaKata.length];
    const dasar = campur(warnaPukul, pAks, tokens.tinta);
    const warna = campur(tetap ? tokens.aksenBlok : tokens.teksBlok, bandP, dasar);

    kataEl.push(
      <span
        key={`k${i}`}
        style={{
          position: "absolute",
          left: Xrow + kataX[i],
          top: p.pusatY * H,
          display: "inline-block",
          whiteSpace: "nowrap",
          lineHeight: 1,
          fontFamily: tokens.huruf,
          fontWeight: tokens.bobot,
          fontSize: fs,
          letterSpacing: 0,
          color: warna,
          opacity: clamp01(pr * 4) * pudar(kataX[i]),
          transform: `translateY(-50%) translateY(${(1 - pr) * p.naikEm * cap}px)`,
          filter: sigma > 0.3 ? `url(#${fid})` : "none",
        }}
      >
        {p.kata[i]}
      </span>,
    );
  }

  const dr = drift(frame, fps, p.driftRel * H, p.seed);
  const blokH = Math.max(p.blokMin * H, fs * skala * p.blokKali);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: tokens.fond }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>{filters}</defs>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          top: p.pusatY * H - blokH / 2,
          height: blokH,
          background: tokens.blok,
          clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`,
          opacity: wipe > 0 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: `50% ${p.pusatY * 100}%`,
          transform: `translate(${dr.x}px, ${dr.y}px) scale(${skala})`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>{bentuk}</div>
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>{kataEl}</div>
      </div>
    </div>
  );
};
