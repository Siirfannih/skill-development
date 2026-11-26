import React from "react";
import { UIActionScript, UIActionScriptProps } from "./UIActionScript";

const A = {
  latar: "#F6F5FC",
  permukaan: "#F1F1FA",
  tinta: "#0E1426",
  redup: "#5B6280",
  aksen: "#6F86FF",
  aksen2: "#1B2748",
  gelap: "#0E1426",
  terang: "#F6F5FC",
  huruf: "Inter, Helvetica, Arial, sans-serif",
};

const B = {
  latar: "#110D0B",
  permukaan: "#2A201B",
  tinta: "#FBF8F3",
  redup: "#A39384",
  aksen: "#EE9440",
  aksen2: "#8A6246",
  gelap: "#110D0B",
  terang: "#FBF8F3",
  huruf: "Inter, Helvetica, Arial, sans-serif",
};

const base: Omit<UIActionScriptProps, "tokens"> = {
  seed: 7,
  isi: {
    prompt: "Rapikan semua klip, lalu tambah musik dan sfx",
    model: "Nova 5",
    mode: "Sedang",
    jendelaJudul: "Studio Suntingan",
    media: ["Media", "klip-01", "klip-02"],
    preview: "Cerita Awal",
    properti: [
      ["Skala", "100%"],
      ["Posisi", "0, 0"],
      ["Opasitas", "80%"],
    ],
    trek: [
      { label: "Video", klip: [{ teks: "Wawancara", dari: 0, sampai: 0.46 }, { teks: "Adegan dua", dari: 0.48, sampai: 1 }] },
      { label: "Suara", klip: [{ teks: "Narasi", dari: 0, sampai: 0.3 }, { teks: "Suara latar", dari: 0.32, sampai: 1 }] },
      { label: "Musik", klip: [{ teks: "Irama pagi", dari: 0.3, sampai: 1 }] },
    ],
    dock: ["B", "K", "M", "F", "S", "P", "T"],
    kartuAkhir: { judul: "Studio Suntingan", sub: "Cukup tulis perintahnya" },
  },
  waktu: { ketikMulai: 8, lajuKetik: 48, punchAt: 40, punchFrames: 1, sweepMulai: 62, sweepFrames: 18, potongAt: 86, umurSel: 8 },
  kamera: { zoom: 1.6, zoomHold: 1.65, kotakY: 0.41, kotakKanan: 0.84, drift: 0.006 },
  bobot: { biasa: 500, tebal: 700 },
  radius: 0.2,
  border: { lebar: 0.002, opasitas: 0.15 },
  blur: 0.012,
  bayangan: { offset_x: 0, offset_y: 0.012, blur: 0.035, opasitas: 0.35 },
};

export const DemoA: React.FC = () => <UIActionScript {...base} tokens={A} />;
export const DemoB: React.FC = () => <UIActionScript {...base} tokens={B} />;
