import React from "react";
import { WordBeat } from "./WordBeat";

const HURUF = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const BOBOT = 700;

const tokensA = {
  fond: "#F6F1E7",
  tinta: "#1D1B19",
  huruf: HURUF,
  bobot: BOBOT,
  warnaKata: ["#2B50E8", "#D8392B", "#1E6B4A", "#C96A00", "#2B50E8"],
  warnaBentuk: ["#D8392B", "#2B50E8", "#1E6B4A"],
  blok: "#1D1B19",
  teksBlok: "#F6F1E7",
  aksenBlok: "#FFD23F",
};

const tokensB = {
  fond: "#0C1530",
  tinta: "#EAF0FF",
  huruf: HURUF,
  bobot: BOBOT,
  warnaKata: ["#7FB2FF", "#FF7A6B", "#5ED6A0", "#FFB454", "#7FB2FF"],
  warnaBentuk: ["#FF7A6B", "#7FB2FF", "#5ED6A0"],
  blok: "#EAF0FF",
  teksBlok: "#0C1530",
  aksenBlok: "#C2362B",
};

const bersama = {
  kata: ["Kerja", "kecil", "bikin", "hasil", "besar"],
  sela: [
    { setelah: 0, bentuk: "lingkaran" as const, sisi: 0.17, warna: 0 },
    { setelah: 2, bentuk: "persegi" as const, sisi: 0.15, warna: 1 },
    { setelah: 3, bentuk: "seperempat" as const, sisi: 0.17, warna: 2 },
  ],
  aksenTetap: [3, 4],
  seed: 7,
  jitterBeat: 0,
};

export const DemoA: React.FC = () => <WordBeat {...bersama} tokens={tokensA} />;
export const DemoB: React.FC = () => <WordBeat {...bersama} tokens={tokensB} />;
