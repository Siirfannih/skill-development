// KineticVO · v21 · tipografi kinetik VO (mengganti tampilan CaptionTrack satu baris datar).
// Feedback Irfan 2 Nov 22.25: «kinetic typography terutama bagian VO malah terlihat seperti subtitle … flat 1 baris tanpa variasi,
// tidak ada perpindahan kata, tidak menyesuaikan objek (tempelan), animasi muncul/hilang diulang-ulang, kontras & balance → layering baru».
//
// Prinsip (AUDIT-2NOV-B + canvas-skill-library kartu presenter/workflow):
//   · frasa VO tetap dari CaptionTrack.buildPhrases (sinkron kata ceil(onset×30), mask penekanan sama) — hanya TAMPILAN yang baru
//   · tiap frasa punya KOMPOSISI sendiri (SPEC di bawah): posisi di ruang kosong adegan / menempel objek, susunan 1–3 baris
//     (line | stair | column | drop), rata kiri/tengah/kanan menurut objek di sebelahnya
//   · PERPINDAHAN KATA: kata lama bergeser (pegas) saat kata baru masuk — baris di-tengahkan ulang dan blok naik saat baris baru lahir
//   · kata kunci: kata lain diredupkan / kotak sorot elektrik / baris besar (drop) — hierarki tanpa scrim
//   · enter (mask, rise, blur, type) dan exit (rise, blur, wipe, sink) dirotasi per frasa: teknik sama ≤ 2× berturut-turut
//   · kontras lewat LAYERING: tinta per latar + chip padat (bukan gradien/pita bayangan) di latar foto/UI ramai
//   · organik: tiap kata punya sudut & jarak masuk sendiri (seed), pegas dengan redaman berbeda per frasa
//   · tanpa bunyi (aturan running text); penanda probe OBJ … caption:<kata> tetap untuk gerbang Segmen 2
import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, Easing, getInputProps, interpolate, spring, useCurrentFrame } from "remotion";
import { FPS } from "./time";
import { textWidth } from "./SpeakerWords";
import { CAPTION_PHRASES, HIDE, type Phrase } from "./CaptionTrack";

type Lay = "line" | "stair" | "column" | "drop";
type Enter = "mask" | "rise" | "blur" | "type";
type Exit = "rise" | "blur" | "wipe" | "sink";
type Spec = {
  /** teks frasa (untuk validasi — bila tidak cocok, frasa memakai komposisi bawaan) */
  t: string;
  x: number; y: number; // titik jangkar blok (y = pusat vertikal blok)
  align: "left" | "center" | "right";
  lay: Lay;
  ink: "light" | "dark";
  size?: number;
  /** indeks kata kunci di frasa (default: kata terpanjang) */
  key?: number;
  /** kotak sorot elektrik di belakang kata kunci */
  mark?: boolean;
  /** chip padat di belakang blok (layering kontras di foto/UI ramai) */
  plate?: "dark" | "light";
  /** stair/column: indeks kata pertama tiap baris berikutnya */
  br?: number[];
  /** ikut gerak kamera/objek (px per detik) */
  drift?: [number, number];
  /** lama drift (detik) — sesudahnya blok diam (mis. ikut pan kamera yang berhenti) */
  driftFor?: number;
  enter?: Enter; exit?: Exit;
  /** jangan redupkan kata non-kunci (latar bergaris/berpola: abu-di-atas-garis terbaca seperti coretan) */
  nodim?: boolean;
};

// Komposisi per BLOK (v22: dicari lewat teks blok, bukan indeks — pengelompokan per klausa/kalimat di CaptionTrack.buildPhrases).
// Koordinat 1920×1080; posisi diwarisi dari komposisi v21 per frasa (audit21/ph_a.jpg, ph_b.jpg: ruang kosong adegan, sisi objek yang
// dirujuk kata, tinta menurut latar), susunan baris disesuaikan dengan blok yang lebih panjang. Rotasi lay/enter/exit ≤ 2× berturut-turut.
const SPEC: Spec[] = [
  { t: "membangun", x: 790, y: 560, align: "right", lay: "line", ink: "light", size: 84, enter: "mask", exit: "wipe" },
  { t: "Dan anehnya", x: 960, y: 500, align: "center", lay: "drop", ink: "light", key: 1, enter: "blur", exit: "rise" },
  { t: "kita justru menginginkan hal tersebut terjadi", x: 960, y: 520, align: "center", lay: "stair", ink: "light", br: [2, 4], key: 2, enter: "rise", exit: "sink" },
  { t: "AI akan mengambil pekerjaan", x: 1060, y: 420, align: "left", lay: "column", ink: "dark", br: [2, 3], key: 3, mark: true, enter: "mask", exit: "rise" },
  { t: "yang membosankan dan berulang", x: 1030, y: 420, align: "left", lay: "column", ink: "dark", br: [2], key: 1, enter: "rise", exit: "wipe" },
  { t: "kita bisa fokus jadi lebih", x: 780, y: 470, align: "right", lay: "stair", ink: "light", br: [3], key: 2, enter: "blur", exit: "sink" },
  { t: "Sebagian janji itu memang ditepati", x: 960, y: 760, align: "center", lay: "stair", ink: "dark", br: [2], key: 4, mark: true, enter: "mask", exit: "rise" },
  { t: "Kita bekerja jauh lebih cepat", x: 1120, y: 520, align: "left", lay: "column", ink: "dark", br: [2, 4], key: 4, plate: "light", enter: "type", exit: "wipe" },
  // «kita juga tidak» tidak ditampilkan (CaptionTrack.MANUAL_SKIP): kamera mundur cepat ke grid 3×3 → «Tapi di satu sisi» diam sampai kartu menyapu
  { t: "Tapi di satu sisi", x: 960, y: 790, align: "center", lay: "line", ink: "dark", size: 72, key: 3, enter: "blur", exit: "rise" },
  { t: "Dan perlahan yang kita bangun menjadi cukup besar", x: 960, y: 560, align: "center", lay: "column", ink: "light", br: [2, 5], key: 7, enter: "mask", exit: "rise" },
  { t: "untuk mengambil", x: 960, y: 470, align: "center", lay: "line", ink: "light", size: 76, key: 1, enter: "rise", exit: "sink" },
  { t: "Ia terus berkembang", x: 300, y: 320, align: "left", lay: "stair", ink: "dark", br: [2], key: 2, drift: [14, 0], enter: "mask", exit: "wipe" },
  { t: "Pertanyaannya adalah apakah", x: 1000, y: 740, align: "left", lay: "drop", ink: "light", key: 2, enter: "blur", exit: "rise" },
  { t: "It is a legitimate", x: 300, y: 330, align: "left", lay: "drop", ink: "light", key: 3, plate: "dark", enter: "mask", exit: "sink" },
  { t: "Apa yang dikatakan Sam Altman adalah", x: 1030, y: 470, align: "right", lay: "column", ink: "dark", br: [3, 5], key: 4, enter: "type", exit: "rise" },
  { t: "di antara ribuan cerita gagal", x: 1010, y: 520, align: "left", lay: "stair", ink: "dark", br: [3], key: 4, plate: "light", enter: "rise", exit: "blur" },
  { t: "yang gak pernah kita dengar", x: 910, y: 540, align: "right", lay: "stair", ink: "dark", br: [3], key: 4, plate: "light", enter: "mask", exit: "sink" },
  { t: "AI yang", x: 960, y: 700, align: "center", lay: "line", ink: "light", key: 0, enter: "rise", exit: "wipe" },
  // figur 05h berjalan dari tengah ke kanan → kolom kiri (x 290–620), figur menjauh dari teks (QC v21)
  { t: "tapi membangun sesuatu yang", x: 300, y: 560, align: "left", lay: "column", ink: "light", size: 58, br: [1, 2, 3], key: 1, enter: "blur", exit: "rise" },
  { t: "dibutuhkan orang justru semakin", x: 300, y: 560, align: "left", lay: "column", ink: "light", size: 58, br: [1, 2], key: 0, mark: true, enter: "rise", exit: "sink" },
  { t: "Terkadang kita terlalu sibuk", x: 980, y: 330, align: "left", lay: "stair", ink: "light", br: [2], key: 3, enter: "mask", exit: "wipe" },
  { t: "hal yang sama dengan yang semua orang lakukan", x: 960, y: 545, align: "center", lay: "stair", ink: "light", br: [4], key: 2, enter: "type", exit: "rise" },
  { t: "kalau tidak memakai AI kita merasa", x: 600, y: 660, align: "left", lay: "column", ink: "light", br: [2, 4], key: 3, mark: true, enter: "rise", exit: "sink" },
  { t: "karena semua orang di sekitar kita memakainya", x: 960, y: 600, align: "center", lay: "stair", ink: "light", br: [3], key: 1, nodim: true, enter: "blur", exit: "rise" },
  { t: "dengan tools yang sama persis", x: 960, y: 650, align: "center", lay: "line", ink: "light", key: 1, mark: true, nodim: true, enter: "mask", exit: "sink" },
  { t: "Jadi di tengah semua ini", x: 860, y: 600, align: "right", lay: "stair", ink: "light", br: [3], key: 2, enter: "type", exit: "blur" },
];
// Blok yang sengaja TIDAK ditampilkan (visual sudah membawa makna / setiap posisi menimpa objek):
//   03a–03b composer + kartu laporan + kursor agen mengisi seluruh safe zone dan kamera bergerak (QC v21)
//   05c «Dan hari» — jendela ucapan hanya 11 f sebelum foto berganti (busy) → kedip 0,4 dtk (v21: DIP 10 f di sini)
const HIDDEN = new Set(["bekerja", "persis seperti apa yang kita lakukan dalam", "Dan hari"].map((t) => t.toLowerCase()));

const INK = { light: "#FAF8EC", dark: "#14161A", dimLight: "rgba(250,248,236,0.62)", dimDark: "rgba(20,22,26,0.66)", mark: "#1d36eb" };
const SHADOW_LIGHT = "0 1px 2px rgba(0,0,0,.38)"; // hanya tepi glyph (tanpa halo)
const BASE = 68;
const GAP = 0.27; // jarak antar kata (em)
const LH = 1.14;
const EXIT_F = 6; // keluar ≤ 6 f, mulai paling cepat setelah kata terakhir selesai diucapkan (v22)
const clampO = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const OUT = Easing.bezier(0.16, 1, 0.3, 1);
const ACC = Easing.bezier(0.6, 0, 0.84, 0.2);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

type Built = { p: Phrase; s: Spec; lines: number[][]; key: number; sizes: number[]; idx: number; exA: number; exB: number; swap: boolean; box: [number, number, number, number] };

const ROT_EN: Enter[] = ["mask", "rise", "blur", "type"];
const ROT_EX: Exit[] = ["rise", "blur", "wipe", "sink"];

const defaultSpec = (p: Phrase, k: number): Spec => ({
  t: p.words.map((w) => w.text).join(" "), x: 960, y: 560, align: "center", lay: p.words.length > 3 ? "stair" : "line",
  ink: p.dark ? "dark" : "light", enter: ROT_EN[k % 4], exit: ROT_EX[k % 4],
});

const build = (): Built[] => {
  const out: Built[] = [];
  const BY = new Map(SPEC.map((q) => [norm(q.t), q]));
  CAPTION_PHRASES.forEach((p, k) => {
    const txt = p.words.map((w) => w.text).join(" ");
    if (HIDDEN.has(txt.toLowerCase())) return;
    // jendela tampil < 18 f (terjepit penekanan/cut) → tidak dimunculkan sama sekali (lebih baik dari kedip singkat)
    if (p.end - p.start < HIDE.minWindow) return;
    const s = BY.get(norm(txt)) ?? defaultSpec(p, k);
    const n = p.words.length;
    const key = s.key ?? p.words.reduce((bi, w, i, a) => (w.text.length > a[bi].text.length ? i : bi), 0);
    let lines: number[][];
    if (s.lay === "drop") {
      lines = key > 0 ? [Array.from({ length: key }, (_, i) => i), Array.from({ length: n - key }, (_, i) => key + i)] : [[0], Array.from({ length: n - 1 }, (_, i) => i + 1)];
      if (lines[1].length === 0) lines = [lines[0]];
    } else if ((s.lay === "stair" || s.lay === "column") && n > 1) {
      const br = s.br ?? (s.lay === "column" ? Array.from({ length: n - 1 }, (_, i) => i + 1).slice(0, 2) : [Math.ceil(n / 2)]);
      const cuts = [0, ...br.filter((b) => b > 0 && b < n), n];
      lines = [];
      for (let i = 0; i < cuts.length - 1; i++) lines.push(Array.from({ length: cuts[i + 1] - cuts[i] }, (_, j) => cuts[i] + j));
    } else lines = [Array.from({ length: n }, (_, i) => i)];
    const base = s.size ?? BASE;
    const sizes = p.words.map((_, i) => {
      if (s.lay !== "drop") return base;
      const big = key === 0 ? i === 0 : i >= key;
      return big ? Math.round(base * 1.42) : Math.round(base * 0.66);
    });
    out.push({ p, s, lines, key, sizes, idx: k, exA: p.end, exB: p.end, swap: false, box: [0, 0, 0, 0] });
  });
  return out;
};

/** posisi x relatif tiap kata (dari tepi kiri baris) + lebar baris, untuk kata yang terlihat */
const lineGeom = (b: Built, li: number, visible: (i: number) => boolean) => {
  const ids = b.lines[li].filter(visible);
  const xs: Record<number, number> = {};
  let x = 0;
  ids.forEach((i, j) => {
    const sz = b.sizes[i];
    xs[i] = x;
    x += textWidth(b.p.words[i].text, sz, i === b.key ? 600 : 500, -0.015) + (j < ids.length - 1 ? GAP * sz : 0);
  });
  return { xs, w: x, h: Math.max(...b.lines[li].map((i) => b.sizes[i])) * LH };
};

const layout = (b: Built, visible: (i: number) => boolean) => {
  const shown = b.lines.map((_, li) => b.lines[li].some(visible));
  const geo = b.lines.map((_, li) => lineGeom(b, li, visible));
  const H = geo.reduce((a, g, li) => a + (shown[li] ? g.h : 0), 0);
  const pos: Record<number, { x: number; y: number }> = {};
  let y = b.s.y - H / 2;
  const indent = b.s.lay === "stair" ? 0.9 * (b.s.size ?? BASE) : 0;
  geo.forEach((g, li) => {
    if (!shown[li]) return;
    const step = b.s.lay === "stair" ? li * indent : 0;
    let x0: number;
    if (b.s.align === "left") x0 = b.s.x + step;
    else if (b.s.align === "right") x0 = b.s.x - g.w - step;
    else x0 = b.s.x - g.w / 2 + (b.s.lay === "stair" ? (li - (b.lines.length - 1) / 2) * indent : 0);
    for (const k of Object.keys(g.xs)) pos[+k] = { x: x0 + g.xs[+k], y };
    y += g.h;
  });
  return { pos, H };
};

const finalBox = (b: Built): [number, number, number, number] => {
  const { pos } = layout(b, () => true);
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  b.p.words.forEach((w, i) => {
    const q = pos[i]; if (!q) return;
    x0 = Math.min(x0, q.x); x1 = Math.max(x1, q.x + textWidth(w.text, b.sizes[i], i === b.key ? 600 : 500, -0.015));
    y0 = Math.min(y0, q.y); y1 = Math.max(y1, q.y + b.sizes[i] * LH);
  });
  return [x0, y0, x1, y1];
};
const hit = (a: number[], c: number[], m = 50) => !(a[2] + m < c[0] || c[2] + m < a[0] || a[3] + m < c[1] || c[3] + m < a[1]);
const BUILT = build();
BUILT.forEach((b) => { b.box = finalBox(b); });
// v22 · jendela keluar (blok diam sampai VO selesai; animasi keluar tidak memakan waktu baca):
//   p.end (CaptionTrack) = blok berikut mulai / VO selesai + jeda / penekanan / cut — tidak pernah sebelum kata terakhir selesai bila bisa.
//   (1) blok berikut mulai ≤ 8 f sesudah VO blok ini selesai DAN di tempat yang sama → TUKAR di tempat (cut, tanpa animasi keluar+masuk)
//   (2) blok berikut di tempat yang sama, jeda > 8 f → keluar ≤ 6 f yang selesai tepat saat blok berikut mulai
//   (3) blok berikut di tempat lain → keluar ≤ 6 f mulai ≤ 3 f sebelum blok berikut (bertumpang sebentar, tidak bertabrakan)
//   (4) diikuti penekanan/cut/diam → keluar ≤ 6 f yang selesai di p.end
//   Semua: animasi keluar mulai ≥ akhir ucapan kata terakhir (lastEnd).
BUILT.forEach((b, j) => {
  const nx = BUILT[j + 1];
  const end = b.p.end;
  const le = b.p.lastEnd;
  const handover = !!nx && nx.p.run === b.p.run && nx.p.start <= end;
  let a = Math.max(le, end - EXIT_F), z = end;
  b.swap = false;
  if (handover && hit(b.box, nx.box)) {
    if (nx.p.start - le <= 8) { a = z = end; b.swap = true; }
  } else if (handover) {
    a = Math.max(le, end - 3); z = Math.min(a + EXIT_F, nx.p.end);
  }
  if (z - a < 2) a = z; // terlalu singkat untuk animasi → potong bersih
  b.exA = a; b.exB = z;
});
export const KINETIC_BUILT = BUILT;

const PhraseBlock: React.FC<{ b: Built; F: number }> = ({ b, F }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { p, s } = b;
  const W = p.words;
  const visible = (i: number) => W[i].f <= F;
  const vis = W.map((_, i) => i).filter(visible);
  const newest = vis.length ? vis[vis.length - 1] : 0;
  const cur = layout(b, visible);
  // perpindahan kata: tata letak sebelum kata terbaru → sekarang, dengan pegas (redaman per frasa → tidak seragam)
  const prev = layout(b, (i) => visible(i) && i !== newest);
  const damping = 15 + 5 * hash(b.idx);
  const mv = spring({ frame: F - W[newest].f, fps: FPS, config: { damping, stiffness: 170, mass: 0.9 } });
  const exitK = b.exB > b.exA ? interpolate(F, [b.exA, b.exB], [0, 1], { ...clampO, easing: ACC }) : 0;
  const t0 = Math.min((F - p.start) / FPS, s.driftFor ?? Infinity);
  const dx = (s.drift?.[0] ?? 0) * t0;
  const dy = (s.drift?.[1] ?? 0) * t0;
  const keyIn = F >= W[b.key].f;
  const dark = s.ink === "dark";
  const color = dark ? INK.dark : INK.light;
  const dim = dark ? INK.dimDark : INK.dimLight;
  const enter: Enter = s.enter ?? "rise";
  const exit: Exit = s.exit ?? "rise";
  const name = vis.map((i) => W[i].text).join("_");

  useLayoutEffect(() => {
    if (!(getInputProps() as { layoutlog?: boolean }).layoutlog || !ref.current) return;
    if (getComputedStyle(ref.current).visibility === "hidden") return;
    // v22: kotak = gabungan glyph kata (span), bukan wadah 1920×1080 → SAFE/CLASH seg2_layout_check bermakna untuk teks VO
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    ref.current.querySelectorAll("span").forEach((el) => {
      const q = el.getBoundingClientRect();
      if (q.width < 1 || q.height < 1) return;
      x0 = Math.min(x0, q.left); y0 = Math.min(y0, q.top); x1 = Math.max(x1, q.right); y1 = Math.max(y1, q.bottom);
    });
    if (!(x1 - x0 >= 1)) return;
    console.log(`OBJ ${F} text ${x0.toFixed(0)} ${y0.toFixed(0)} ${(x1 - x0).toFixed(0)} ${(y1 - y0).toFixed(0)} ${color} caption:${name} blk=${b.idx} ex=${exitK.toFixed(2)}`);
  }, [F, name, color, exitK, b.idx]);

  // kotak blok (untuk chip)
  const xsAll = vis.map((i) => cur.pos[i]?.x ?? 0);
  const xeAll = vis.map((i) => (cur.pos[i]?.x ?? 0) + textWidth(W[i].text, b.sizes[i], i === b.key ? 600 : 500, -0.015));
  const bx0 = Math.min(...xsAll), bx1 = Math.max(...xeAll);
  const by0 = b.s.y - cur.H / 2;
  const plateIn = spring({ frame: F - W[0].f, fps: FPS, config: { damping: 18, stiffness: 200 } });

  // transform exit untuk seluruh blok
  let exT = "", exO = 1, exBlur = 0, exClip: string | undefined;
  if (exitK > 0) {
    if (exit === "rise") { exT = `translateY(${-46 * exitK}px)`; exO = 1 - exitK; }
    else if (exit === "sink") { exT = `translateY(${34 * exitK}px)`; exO = 1 - exitK; }
    else if (exit === "blur") { exBlur = 12 * exitK; exO = 1 - exitK; }
    else exClip = `inset(-40px -40px -40px ${(bx1 - bx0 + 80) * exitK - 40}px)`;
  }

  return (
    <div data-caption ref={ref} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${dx}px, ${dy}px) ${exT}`, opacity: exO, filter: exBlur > 0.05 ? `blur(${exBlur}px)` : undefined, clipPath: exClip }}>
      {s.plate && vis.length > 0 && (() => {
        const padX = 30, padY = 18;
        const w = (bx1 - bx0) + 2 * padX, h = cur.H + 2 * padY - 0.14 * BASE;
        return (
          <div style={{
            position: "absolute", left: bx0 - padX, top: by0 - padY + 2, width: w, height: h, borderRadius: 18,
            background: s.plate === "dark" ? "#15171c" : "#ffffff",
            border: s.plate === "dark" ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(20,22,26,0.08)",
            boxShadow: s.plate === "light" ? "0 6px 18px rgba(20,22,26,0.10)" : undefined,
            transform: `scale(${0.86 + 0.14 * plateIn}, ${0.7 + 0.3 * plateIn})`, transformOrigin: s.align === "right" ? "100% 50%" : s.align === "left" ? "0% 50%" : "50% 50%",
            opacity: Math.min(1, plateIn * 1.4),
          }} />
        );
      })()}
      {vis.map((i) => {
        const w = W[i];
        const sz = b.sizes[i];
        const isKey = i === b.key;
        const to = cur.pos[i];
        const from = prev.pos[i] ?? to;
        // kata terbaru lahir menempel di ujung kata sebelumnya (posisi tata letak lama), lalu seluruh baris bergeser bersama
        let fx = from.x, fy = from.y;
        if (i === newest) {
          const li = b.lines.findIndex((L) => L.includes(i));
          const before = b.lines[li].filter((q) => q < i && visible(q));
          const pq = before.length ? before[before.length - 1] : -1;
          if (pq >= 0 && prev.pos[pq]) {
            fx = prev.pos[pq].x + textWidth(W[pq].text, b.sizes[pq], pq === b.key ? 600 : 500, -0.015) + GAP * b.sizes[pq];
            fy = prev.pos[pq].y;
          } else {
            // kata pertama baris baru: lahir di bawah baris terakhir dalam kerangka blok LAMA, lalu naik bersama blok
            // (QC v21: tanpa ini kata baru langsung di posisi akhir sementara baris di atasnya masih turun → tumpuk 4–6 f)
            fx = to.x; fy = to.y + (cur.H - prev.H) / 2;
          }
        }
        const x = fx + (to.x - fx) * mv;
        const y = fy + (to.y - fy) * mv;
        const age = F - w.f;
        const seed = hash(b.idx * 31 + i);
        // masuk per kata
        let tr = "", op = 1, bl = 0, clipY = 0, chars = Infinity;
        if (enter === "mask") { const q = interpolate(age, [0, 5], [0, 1], { ...clampO, easing: OUT }); clipY = 1 - q; }
        else if (enter === "rise") {
          const q = spring({ frame: age, fps: FPS, config: { damping: 11 + 4 * seed, stiffness: 190, mass: 0.7 } });
          tr = `translateY(${(1 - q) * (26 + 14 * seed)}px) rotate(${(1 - q) * (seed - 0.5) * 7}deg)`; op = Math.min(1, age / 3);
        } else if (enter === "blur") { const q = interpolate(age, [0, 4], [0, 1], { ...clampO, easing: OUT }); bl = (1 - q) * 10; op = 0.3 + 0.7 * q; }
        else { chars = Math.max(1, Math.floor(age / 1.3) + 1); }
        const dimmed = !s.nodim && keyIn && !isKey && (s.mark || s.lay !== "line" || W.length > 2);
        const fg = isKey && s.mark ? "#FFFFFF" : dimmed ? dim : color;
        const markK = isKey && s.mark ? interpolate(F - w.f, [1, 7], [0, 1], { ...clampO, easing: OUT }) : 0;
        const text = chars < w.text.length ? w.text.slice(0, chars) : w.text;
        const tw = textWidth(w.text, sz, isKey ? 600 : 500, -0.015);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, height: sz * LH, overflow: enter === "mask" ? "hidden" : undefined, paddingTop: 0 }}>
            {markK > 0 && (
              <div style={{ position: "absolute", left: -0.16 * sz, top: 0.06 * sz, height: sz * 1.04, width: (tw + 0.32 * sz) * markK, background: INK.mark, borderRadius: 0.12 * sz, transform: `rotate(${(seed - 0.5) * 1.6}deg)` }} />
            )}
            <span style={{
              position: "relative", display: "inline-block", fontFamily: "Geist Sans", fontWeight: isKey ? 600 : 500, fontSize: sz, lineHeight: LH,
              letterSpacing: "-0.015em", whiteSpace: "nowrap", color: markK > 0.35 || !(isKey && s.mark) ? fg : color,
              textShadow: dark || s.plate || (isKey && s.mark) ? undefined : SHADOW_LIGHT,
              transform: `${tr} translateY(${clipY * 105}%)`, opacity: op, filter: bl > 0.05 ? `blur(${bl}px)` : undefined,
              transition: "none",
            }}>
              {text}
              {chars < w.text.length && <span style={{ display: "inline-block", width: 3, height: sz * 0.82, marginLeft: 4, background: fg, verticalAlign: "-0.08em" }} />}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const KineticVO: React.FC = () => {
  const F = useCurrentFrame();
  // v22: tanpa CSS `:has([data-emph])` — penyembunyian per frame itu membuat teks VO berkedip di frame masuk/keluar penekanan.
  // Jendela tiap blok sudah dihitung dari interval sembunyi yang di-debounce (CaptionTrack.HIDE_IV) — tidak ada penyembunyian per frame.
  const live = BUILT.filter((b) => F >= b.p.start && F < b.exB);
  if (!live.length) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {live.map((b) => <PhraseBlock key={b.idx} b={b} F={F} />)}
    </AbsoluteFill>
  );
};
