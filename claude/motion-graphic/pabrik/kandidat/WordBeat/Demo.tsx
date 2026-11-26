import React from "react";
import { WordBeat } from "./WordBeat";

const HURUF = "Liberation Sans, Arimo, Helvetica, Arial, sans-serif";

const TOKEN_A = {
  latar: "#F6F5FC",
  permukaan: "#F1F1FA",
  tinta: "#0E1426",
  redup: "#5B6280",
  aksen: "#6F86FF",
  aksen2: "#1B2748",
  huruf: HURUF,
};

const TOKEN_B = {
  latar: "#110D0B",
  permukaan: "#2A201B",
  tinta: "#FBF8F3",
  redup: "#A39384",
  aksen: "#EE9440",
  aksen2: "#8A6246",
  huruf: HURUF,
};

const PROPS = {
  kata: ["Satu", "kata", "tiap", "ketuk"],
  warnaKata: ["aksen", "aksen2", "aksen", "aksen2"] as ("aksen" | "aksen2")[],
  tetapAksen: [0, 3],
  mulai: -5,
  bobot: 800,
  trackingEm: -0.03,
  sisiBentuk: 0.13,
  sisip: [
    { setelah: 0, bentuk: "kotak" as const, warna: "aksen" as const, warna2: "aksen2" as const, skala: 1, rot: -6, geser: -0.1 },
    { setelah: 1, bentuk: "lingkaran" as const, warna: "aksen2" as const, skala: 0.7, rot: 0, geser: 0.15 },
    { setelah: 2, bentuk: "seperempat" as const, warna: "redup" as const, skala: 0.9, rot: 8, geser: -0.06 },
  ],
  kataAkhir: "Mission",
  tebar: [
    { x: 0.14, y: 0.76, sisi: 0.17, bentuk: "seperempat" as const, warna: "aksen" as const, rot: 0, alfa: 0.9 },
    { x: 0.84, y: 0.24, sisi: 0.13, bentuk: "kotak" as const, warna: "redup" as const, rot: 8, alfa: 0.7 },
    { x: 0.2, y: 0.22, sisi: 0.09, bentuk: "lingkaran" as const, warna: "aksen2" as const, rot: 0, alfa: 0.8 },
    { x: 0.8, y: 0.74, sisi: 0.1, bentuk: "kotak" as const, warna: "aksen" as const, rot: -12, alfa: 0.6 },
    { x: 0.62, y: 0.14, sisi: 0.07, bentuk: "lingkaran" as const, warna: "aksen" as const, rot: 0, alfa: 0.8 },
    { x: 0.42, y: 0.85, sisi: 0.08, bentuk: "kotak" as const, warna: "redup" as const, rot: 14, alfa: 0.7 },
  ],
};

export const DemoA: React.FC = () => <WordBeat tokens={TOKEN_A} {...PROPS} />;
export const DemoB: React.FC = () => <WordBeat tokens={TOKEN_B} {...PROPS} />;
