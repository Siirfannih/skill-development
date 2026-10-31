// Bantu bersama Babak 4 + awal Babak 5 (04a–05b): geometri transisi antar-adegan supaya potongan nyambung.
import { EZ, keys, prog } from "../lib/anim";
import { panel, word } from "../lib/time";

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ── 04b → 04c: kartu rilis jadi titik grafik (X01)
export const RELEASES = [
  { name: "GPT-3", year: "2020", x: 80 },
  { name: "ChatGPT", year: "2022", x: 500 },
  { name: "GPT-4", year: "2023", x: 860 },
  { name: "GPT-4o", year: "2024", x: 1160 },
  { name: "o1", year: "2024", x: 1400 },
  { name: "GPT-5", year: "2025", x: 1600 },
];
export const CARD_W = 320;
export const CARD_H = 224;
export const LINE_Y = 540; // garis waktu 04b (layar)
/** Titik akhir 04b (pusat kartu, kamera sudah diam di x=0). */
export const DOT04B = RELEASES.map((r) => ({ x: r.x + CARD_W / 2, y: LINE_Y }));

// ── grafik janji 04c (koordinat panel 960×540; kotak SVG di (60,120))
export type P2 = { x: number; y: number };
const cubic = (p0: P2, p1: P2, p2: P2, p3: P2, u: number): P2 => {
  const v = 1 - u;
  return {
    x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x,
    y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y,
  };
};
export const SEG_SHARED: [P2, P2, P2, P2] = [{ x: 0, y: 360 }, { x: 140, y: 340 }, { x: 260, y: 290 }, { x: 380, y: 230 }];
export const SEG_BEND: [P2, P2, P2, P2] = [{ x: 380, y: 230 }, { x: 520, y: 260 }, { x: 700, y: 300 }, { x: 820, y: 330 }];
export const onShared = (u: number) => cubic(...SEG_SHARED, u);
export const onBend = (u: number) => cubic(...SEG_BEND, u);
/** kotak grafik → layar 1920×1080 tanpa kamera */
export const graphToScreen = (p: P2): P2 => ({ x: (60 + p.x) * 2, y: (120 + p.y) * 2 });
/** posisi titik rilis di garis solid (u di segmen bersama) */
export const DOT_U = [0.14, 0.36, 0.55, 0.7, 0.82, 0.93];

// ── 04c → 04d → 05a: kartu klip Altman (frame-in-frame lalu jadi kartu biru)
export const CLIP_CARD = { x: 580, y: 150, w: 760, h: 620, r: 28 };
export const BLUE_CARD = { x: 1280, y: 250, w: 192, h: 200, r: 4 }; // posisi 05a (panel 640,140 ×2, sedikit naik agar tidak menyentuh teks)
export const ALTMAN_STILL = "wonder/43cca1a394c8a5a50d96edbb22a2cddeef9b45d7e3a99ac323829deb292db7ca.jpg";
/** Mulai menyusut bersamaan dengan whoosh 04d→05a (fade-in bunyi 0,2 dtk sebelum puncak 75,195). */
export const T_SHRINK = 75.0;
export const T_SHRINK_END = 75.5;
export const T_STILL = 75.19; // = awal 05a: isi kartu berganti ke foto diam di tengah gerak (cut on motion)
export const altCard = (t: number) => {
  const p = prog(t, T_SHRINK, T_SHRINK_END, EZ.inOut);
  return {
    x: lerp(CLIP_CARD.x, BLUE_CARD.x, p),
    y: lerp(CLIP_CARD.y, BLUE_CARD.y, p),
    w: lerp(CLIP_CARD.w, BLUE_CARD.w, p),
    h: lerp(CLIP_CARD.h, BLUE_CARD.h, p),
    r: lerp(CLIP_CARD.r, BLUE_CARD.r, p),
    border: lerp(0, 6, prog(t, T_SHRINK, T_SHRINK + 0.3, EZ.out)),
    p,
  };
};

// ── 05a → 05b: reveal-out ke kartu biru di tengah
export const T_REVEAL05 = 78.42;
export const reveal05a = (t: number) => prog(t, T_REVEAL05, panel("05a").end, EZ.acc);
export const S05A_END = 0.7; // skala kamera 05a di akhir (zoom-out di pusat kartu biru)
export const DRIFT05A = 0.035; // dorong C19 05a (lapis tengah)
export const DRIFTX05A = -50; // geser C19 05a (lapis tengah)
/** posisi layar pusat kartu biru di akhir 05a (05b mulai dari sini lalu pan ke tengah) */
export const CARD05A_END = {
  x: 960 + (BLUE_CARD.x + BLUE_CARD.w / 2 - 960) * (1 + DRIFT05A) + DRIFTX05A,
  y: 540 + (BLUE_CARD.y + BLUE_CARD.h / 2 - 540) * (1 + DRIFT05A),
};

// ── 05b: grid kartu abu (koordinat dunia, kartu biru di (0,0))
export const G_W = 68;
export const G_H = 44;
export const G_PX = 86;
export const G_PY = 62;
export const cam05b = (t: number) => {
  const a = panel("05b").start;
  // lanjut dari akselerasi akhir 05a: langsung cepat lalu deselerasi panjang, mendarat di «gagal», lalu tahan + drift
  const g = word("gagal", "s5").s + 0.3;
  if (t <= g) return Math.exp(keys(t, [[a, Math.log(1.5)], [g, Math.log(0.42)]], EZ.out));
  return keys(t, [[g, 0.42], [panel("05b").end, 0.4]], (x) => x);
};
