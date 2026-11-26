import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { move, lerp, clamp01 } from "../../../toolkit/gerak/curves";
import { z } from "zod";

const KUNCI_WARNA = z.enum(["tinta", "redup", "aksen", "aksen2", "permukaan"]);

export const WordBeatPropsSchema = z.object({
  tokens: z.object({
    latar: z.string(),
    permukaan: z.string(),
    tinta: z.string(),
    redup: z.string(),
    aksen: z.string(),
    aksen2: z.string(),
    huruf: z.string(),
  }),
  /** kalimat, satu kata per ketukan (maks 6) */
  kata: z.array(z.string()).min(1).max(6),
  /** kunci token warna saat tiap kata "dipukul" (panjang = jumlah kata) */
  warnaKata: z.array(KUNCI_WARNA),
  /** indeks kata yang tetap berwarna aksen di baris akhir (satu atau dua) */
  tetapAksen: z.array(z.number().int().min(0)),
  /** bentuk kecil sebagai tanda baca: disisipkan setelah kata ke-`setelah` */
  sisip: z
    .array(
      z.object({
        setelah: z.number().int().min(0),
        bentuk: z.enum(["kotak", "lingkaran", "seperempat"]),
        warna: KUNCI_WARNA,
        warna2: KUNCI_WARNA.optional(),
        /** pengali sisi bentuk */
        skala: z.number().default(1),
        /** rotasi (derajat) */
        rot: z.number().default(0),
        /** geser vertikal, kali sisi bentuk (positif = ke bawah) */
        geser: z.number().default(0),
      })
    )
    .optional(),
  /** kata tunggal berikutnya (skala kecil) dengan bentuk buram tersebar */
  kataAkhir: z.string().optional(),
  tebar: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
        /** sisi sebagai fraksi lebar frame */
        sisi: z.number(),
        bentuk: z.enum(["kotak", "lingkaran", "seperempat"]),
        warna: KUNCI_WARNA,
        rot: z.number().default(0),
        /** kekuatan bentuk (0-1) */
        alfa: z.number().optional(),
      })
    )
    .optional(),
  /** tinggi kapital kata tunggal berikutnya (fraksi tinggi frame) */
  kapitalTunggal: z.number().default(0.07),
  /** blur sisa pada bentuk tersebar (fraksi tinggi frame) */
  blurFoto: z.number().default(0.008),
  /** jeda baris kecil ditahan sebelum diganti (frame) */
  tahanBaris: z.number().default(10),
  /** frame mulai bentuk tersebar masuk (kosong = saat kata ke-3 dipukul) */
  mulaiTebarAt: z.number().optional(),
  /** lama bentuk tersebar masuk (frame) */
  durTebar: z.number().default(18),
  bobot: z.number(),
  mulai: z.number().default(0),
  /** jarak ketukan (frame) */
  jarakKetukan: z.number().default(8),
  /** kata sependek ini (huruf) diberi jeda lebih singkat */
  panjangPendek: z.number().default(3),
  faktorPendek: z.number().default(0.75),
  /** durasi masuk (frame) */
  masukFrames: z.number().default(9),
  /** tinggi kapital kata raksasa (fraksi tinggi frame) */
  kapitalRaksasa: z.number().default(0.2),
  /** tinggi kapital baris akhir (fraksi tinggi frame) */
  kapitalAkhir: z.number().default(0.045),
  /** tinggi kapital / ukuran huruf (em) */
  rasioKapital: z.number().default(0.7),
  /** pusat vertikal saat dibangun (fraksi tinggi frame) */
  pusatY: z.number().default(0.52),
  /** celah antar kata, kali tinggi kapital */
  celahKapital: z.number().default(0.25),
  trackingEm: z.number().default(0),
  /** blur gerak horizontal awal (fraksi tinggi frame) */
  blurMaks: z.number().default(0.045),
  /** naik dari bawah saat masuk, kali tinggi kapital */
  naikKapital: z.number().default(0.1),
  /** sisi bentuk sisipan (fraksi tinggi frame, ukuran raksasa) */
  sisiBentuk: z.number().default(0.18),
  /** tepi kanan kata terbaru ditahan di fraksi lebar ini */
  jangkarX: z.number().default(0.88),
  /** margin kiri awal (fraksi lebar) */
  margin: z.number().default(0.06),
  /** durasi gerak kamera mengikuti kata (frame) */
  durKamera: z.number().default(9),
  /** jeda setelah kata terakhir sebelum ditarik (frame) */
  tahanSebelumTarik: z.number().default(3),
  /** durasi penarikan akhir (frame) */
  durTarik: z.number().default(30),
});
export type WordBeatProps = z.infer<typeof WordBeatPropsSchema>;

/**
 * Membangun kalimat pendek satu kata per ketukan pada skala raksasa (masuk dengan blur gerak, warna sendiri, bentuk kecil sebagai tanda baca), lalu menarik seluruh grup mengecil menjadi satu baris judul.
 * Pakai bila: kalimat ≤ 6 kata perlu dipukul kata demi kata lalu berakhir sebagai judul kecil di tengah.
 * Jangan bila: teks panjang yang harus dibaca utuh sejak awal, atau kata tunggal tanpa kalimat yang dibangun.
 */
export const WordBeat: React.FC<z.input<typeof WordBeatPropsSchema>> = (raw) => {
  const p = WordBeatPropsSchema.parse(raw);
  const { tokens } = p;
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const capPx = p.kapitalRaksasa * H;
  const fontPx = capPx / p.rasioKapital;
  const gapPx = p.celahKapital * capPx;
  const sisiPx = p.sisiBentuk * H;
  const warna = (k: z.infer<typeof KUNCI_WARNA>) => tokens[k];

  // Urutan item: kata, lalu bentuk sisipan setelahnya (bila ada)
  type Item = { jenis: "k"; i: number } | { jenis: "s"; j: number };
  const sisip = p.sisip ?? [];
  const items: Item[] = [];
  const idxKata: number[] = [];
  p.kata.forEach((_, i) => {
    idxKata[i] = items.length;
    items.push({ jenis: "k", i });
    sisip.forEach((s, j) => {
      if (s.setelah === i && i < p.kata.length - 1) items.push({ jenis: "s", j });
    });
  });

  // Ketukan: kata pendek memberi jeda lebih singkat
  const hit: number[] = [p.mulai];
  for (let i = 0; i < p.kata.length - 1; i++) {
    const f = p.kata[i].length <= p.panjangPendek ? p.faktorPendek : 1;
    hit.push(hit[i] + Math.round(p.jarakKetukan * f));
  }
  const last = p.kata.length - 1;
  const mulaiTarik = hit[last] + p.masukFrames + p.tahanSebelumTarik;
  const fase2 = mulaiTarik + p.durTarik + p.tahanBaris;

  // Ukur tata letak nyata (px tanpa transform); konvergen dalam satu-dua render
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [pos, setPos] = useState<{ l: number; w: number }[] | null>(null);
  const [, setTick] = useState(0);
  useLayoutEffect(() => {
    const m = items.map((_, n) => {
      const e = refs.current[n];
      return { l: e ? e.offsetLeft : 0, w: e ? e.offsetWidth : 0 };
    });
    if (!pos || JSON.stringify(m) !== JSON.stringify(pos)) setPos(m);
  });
  useEffect(() => {
    const fonts = typeof document !== "undefined" ? (document as Document).fonts : undefined;
    if (fonts && fonts.ready) fonts.ready.then(() => setTick((t) => t + 1));
  }, []);

  // Kamera: geser horizontal mengikuti kata terbaru
  const padX = p.margin * W;
  const shiftKe = (k: number) => {
    if (!pos) return 0;
    const it = pos[idxKata[k]];
    return Math.min(0, p.jangkarX * W - padX - (it.l + it.w));
  };
  let k = 0;
  for (let n = 0; n < hit.length; n++) if (frame >= hit[n]) k = n;
  const minJarak = Math.min(...hit.slice(1).map((h, n) => h - hit[n]), p.durKamera);
  const camF = Math.max(2, Math.min(p.durKamera, minJarak));
  const shiftNow = k === 0 ? shiftKe(0) : lerp(shiftKe(k - 1), shiftKe(k), move(frame, hit[k], camF, "land"));

  // Penarikan akhir: seluruh grup mengecil serentak, kurva berat
  const gw = pos && pos.length ? pos[pos.length - 1].l + pos[pos.length - 1].w : 0;
  const sAkhir = gw > 0 ? Math.min(p.kapitalAkhir / p.kapitalRaksasa, (0.9 * W) / gw) : 1;
  const tarik = move(frame, mulaiTarik, p.durTarik, "heavy");
  const skala = Math.exp(lerp(0, Math.log(sAkhir), tarik));
  const txPra = padX + shiftNow;
  const c0 = W / 2 - txPra;
  const c = gw > 0 ? lerp(c0, gw / 2, tarik) : c0;
  const txRaw = W / 2 - skala * c;
  const tx = lerp(txRaw, Math.max(txRaw, 0.05 * W), clamp01(tarik * 4));
  const yc = lerp(p.pusatY, 0.5, tarik) * H;

  const masuk = (mulai: number) => move(frame, mulai, p.masukFrames, "reveal");

  const renderKata = (i: number) => {
    const e = masuk(hit[i]);
    const blurPx = p.blurMaks * H * (1 - e);
    const naik = p.naikKapital * capPx * (1 - e);
    const kekal = p.tetapAksen.includes(i);
    const lepas = i < last ? hit[i + 1] : mulaiTarik;
    const aksenOp = kekal ? 1 : 1 - move(frame, lepas, 6, "reveal");
    const fid = `wb${uid}k${i}`;
    const gaya: React.CSSProperties = {
      fontFamily: tokens.huruf,
      fontWeight: p.bobot,
      fontSize: fontPx,
      letterSpacing: `${p.trackingEm}em`,
      lineHeight: 1,
      whiteSpace: "nowrap",
      display: "block",
    };
    return (
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: clamp01(e * 4),
          transform: `translateY(${naik}px)`,
          filter: blurPx > 0.4 ? `url(#${fid})` : "none",
        }}
      >
        {blurPx > 0.4 ? (
          <svg width={0} height={0} style={{ position: "absolute" }}>
            <filter id={fid} x="-30%" y="-10%" width="160%" height="120%">
              <feGaussianBlur stdDeviation={`${blurPx} 0`} />
            </filter>
          </svg>
        ) : null}
        <span
          style={{
            ...gaya,
            color: `color-mix(in srgb, ${warna(p.warnaKata[i] ?? "aksen")} ${Math.round(aksenOp * 100)}%, ${tokens.tinta})`,
          }}
        >
          {p.kata[i]}
        </span>
      </div>
    );
  };

  const renderBentuk = (j: number) => {
    const s = sisip[j];
    const e = masuk(hit[s.setelah] + Math.round(p.jarakKetukan * 0.5));
    const blurPx = p.blurMaks * H * (1 - e);
    const sisi = sisiPx * s.skala;
    const radius = s.bentuk === "lingkaran" ? "50%" : s.bentuk === "seperempat" ? "100% 0 0 0" : `${sisi * 0.08}px`;
    return (
      <div
        style={{
          position: "relative",
          zIndex: 0,
          width: sisi,
          height: sisi,
          margin: `0 ${0.1 * capPx}px`,
          opacity: clamp01(e * 4),
          transform: `translateY(${s.geser * sisi + p.naikKapital * capPx * (1 - e)}px) rotate(${s.rot}deg)`,
          filter: blurPx > 0.4 ? `blur(${blurPx}px)` : "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: warna(s.warna), borderRadius: radius }} />
        {s.warna2 ? (
          <div
            style={{
              position: "absolute",
              right: "14%",
              bottom: "14%",
              width: "38%",
              height: "38%",
              borderRadius: "50%",
              background: warna(s.warna2),
            }}
          />
        ) : null}
      </div>
    );
  };

  const tebar = p.tebar ?? [];
  const fontT = (p.kapitalTunggal * H) / p.rasioKapital;
  const mulaiTebar = p.mulaiTebarAt ?? hit[Math.min(2, last)];
  const kataT = move(frame, fase2, p.masukFrames, "reveal");
  const blurT = p.blurMaks * H * (1 - kataT);
  const fidT = `wb${uid}t`;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: tokens.latar }}>
      {tebar.map((b, n) => {
        const e = move(frame, mulaiTebar + n * 2, p.durTebar, "reveal");
        const sisi = b.sisi * W;
        const rad = b.bentuk === "lingkaran" ? "50%" : b.bentuk === "seperempat" ? "100% 0 0 0" : `${sisi * 0.08}px`;
        const arah = n % 3 === 0 ? 1 : n % 3 === 1 ? -1 : 0.5;
        const gerak = lerp(0, 0.014 * H * arah * (1 + (n % 2) * 0.6), clamp01((frame - mulaiTebar) / 60));
        const gerakX = lerp(0, 0.006 * W * -arah, clamp01((frame - mulaiTebar) / 60));
        return (
          <div
            key={n}
            style={{
              position: "absolute",
              zIndex: 0,
              left: b.x * W - sisi / 2 + gerakX,
              top: b.y * H - sisi / 2 + gerak,
              width: sisi,
              height: sisi,
              background: warna(b.warna),
              borderRadius: rad,
              opacity: clamp01(e * 3) * (b.alfa ?? 1),
              transform: `rotate(${b.rot}deg) scale(${lerp(0.85, 1, e)})`,
              filter: `blur(${p.blurFoto * H + p.blurMaks * H * (1 - e)}px)`,
            }}
          />
        );
      })}
      {p.kataAkhir ? (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            left: 0,
            right: 0,
            top: 0.5 * H,
            textAlign: "center",
            transform: `translateY(${-0.45 * fontT + 0.1 * p.kapitalTunggal * H * (1 - kataT)}px)`,
            opacity: clamp01(kataT * 4),
            filter: blurT > 0.4 ? `url(#${fidT})` : "none",
          }}
        >
          {blurT > 0.4 ? (
            <svg width={0} height={0} style={{ position: "absolute" }}>
              <filter id={fidT} x="-30%" y="-10%" width="160%" height="120%">
                <feGaussianBlur stdDeviation={`${blurT} 0`} />
              </filter>
            </svg>
          ) : null}
          <span
            style={{
              fontFamily: tokens.huruf,
              fontWeight: p.bobot,
              fontSize: fontT,
              lineHeight: 1,
              letterSpacing: `${p.trackingEm}em`,
              color: tokens.tinta,
            }}
          >
            {p.kataAkhir}
          </span>
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: gapPx,
          transformOrigin: "0 0",
          opacity: 1 - move(frame, fase2, 6, "reveal"),
          transform: `translate(${tx}px, ${yc}px) scale(${skala}) translateY(-45%)`,
        }}
      >
        {items.map((it, n) => (
          <div
            key={n}
            ref={(el) => {
              refs.current[n] = el;
            }}
            style={{ position: "relative", flex: "none" }}
          >
            {it.jenis === "k" ? renderKata(it.i) : renderBentuk(it.j)}
          </div>
        ))}
      </div>
    </div>
  );
};
