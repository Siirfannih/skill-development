import React from "react";
import { WorldStage, type WorldStageInput } from "./WorldStage";

const huruf = "Inter, sans-serif";

const isi = {
  judulJendela: "Studio Klip",
  pratinjau: "Pratinjau",
  inspektur: [
    ["Skala", "100%"],
    ["Posisi", "12, 40"],
    ["Opasitas", "80%"],
  ] as [string, string][],
  klip: ["Pembuka", "Wawancara", "Musik"],
  judulPanel: "Asisten",
  pesanPengguna: "Tambah subjudul di awal",
  balasan: "Siap, saya susun dulu.",
  prompt: "Buat latar lebih hangat",
  ikonDock: ["K", "P", "T", "M", "S", "A"],
};

const base = { bobot: 600, seed: 7, teks: isi, mulai: 8, durasiDetik: 3.5, kurva: "land" as const };

const A: WorldStageInput = {
  ...base,
  tokens: {
    latar: "#F6F5FC",
    permukaan: "#F1F1FA",
    tinta: "#0E1426",
    redup: "#5B6280",
    aksen: "#6F86FF",
    aksen2: "#1B2748",
    jendela: "#0E1426",
    teksJendela: "#F6F5FC",
    huruf,
  },
};

const B: WorldStageInput = {
  ...base,
  tokens: {
    latar: "#110D0B",
    permukaan: "#2A201B",
    tinta: "#FBF8F3",
    redup: "#A39384",
    aksen: "#EE9440",
    aksen2: "#8A6246",
    jendela: "#110D0B",
    teksJendela: "#FBF8F3",
    huruf,
  },
};

export const DemoA: React.FC = () => <WorldStage {...A} />;
export const DemoB: React.FC = () => <WorldStage {...B} />;
