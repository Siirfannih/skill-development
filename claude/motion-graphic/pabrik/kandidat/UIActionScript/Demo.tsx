import React from "react";
import { UIActionScript } from "./UIActionScript";

const TOKENS_A = {
  langit: "#7a2a4a", horizon: "#f2742c", matahari: "#ffc46b", bukit1: "#b5472f", bukit2: "#7e3a2c", bukit3: "#3f2a24",
  jendela: "#14161c", panel: "#1d2029", tinta: "#f1ece2", tinta2: "#9a9aa6", aksen: "#ef6a3a", aksen2: "#4fb3a7", kaca: "#262a35",
  huruf: "Inter, Helvetica, Arial, sans-serif",
};

const TOKENS_B = {
  langit: "#0f3b6e", horizon: "#3fb8c9", matahari: "#e8f6ff", bukit1: "#2a6f9a", bukit2: "#1f4c7a", bukit3: "#142a4f",
  jendela: "#0a1020", panel: "#122036", tinta: "#e6f4ff", tinta2: "#8aa3bd", aksen: "#ffb347", aksen2: "#7ee0c3", kaca: "#16233d",
  huruf: '"DejaVu Sans Mono", Menlo, monospace',
};

const base = {
  teks: "Rapikan potongan, tambah sfx dan musik",
  labelModel: "Model A",
  labelTingkat: "Sedang",
  kartuAkhir: "Selesai dalam satu kalimat",
  seed: 7,
};

export const DemoA: React.FC = () => <UIActionScript {...base} tokens={TOKENS_A} />;
export const DemoB: React.FC = () => <UIActionScript {...base} tokens={TOKENS_B} />;
