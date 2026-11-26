import React from "react";
import { WorldStage, type WorldStageProps } from "./WorldStage";

type Tokens = WorldStageProps["tokens"] & {
  jendelaBar: string;
  jendelaTinta: string;
  jendelaRedup: string;
};

const TOKENS_A: Tokens = {
  latar: "#f4ecdc",
  tinta: "#2a2421",
  tintaRedup: "#7a6c5f",
  panelTinta: "#f4ecdc",
  panelRedup: "#d6cabb",
  aksen: "#c8442b",
  sorot: "#f2b632",
  langit: "#e0603a",
  cakrawala: "#f7b04a",
  matahari: "#fde7a8",
  bukit: ["#9c3a4c", "#6d2a48", "#3f1d3a"],
  jendela: "#231f2b",
  panel: "#2b2535",
  panelKotak: "#3d3549",
  dock: "#efe4cf",
  ikon: ["#c8442b", "#2f6f73", "#f2b632", "#6d2a48", "#3d5a80", "#8a9a3a", "#2a2421"],
  ikonTinta: "#fffaf0",
  huruf: "Georgia, 'Times New Roman', serif",
  jendelaBar: "#322c3b",
  jendelaTinta: "#f4ecdc",
  jendelaRedup: "#d6cabb",
};

const TOKENS_B: Tokens = {
  latar: "#0b1424",
  tinta: "#e8f0ff",
  tintaRedup: "#8fa3c4",
  panelTinta: "#e8f0ff",
  panelRedup: "#a9bbd8",
  aksen: "#4cc2ff",
  sorot: "#ffd24a",
  langit: "#1f4fa8",
  cakrawala: "#5fb3e8",
  matahari: "#e9f6ff",
  bukit: ["#2d6a8a", "#1c4766", "#0f2c45"],
  jendela: "#10161f",
  panel: "#0e1b30",
  panelKotak: "#16283f",
  dock: "#1b2f4d",
  ikon: ["#4cc2ff", "#ff7a59", "#ffd24a", "#7be0a4", "#b79bff", "#ff6f91", "#e8f0ff"],
  ikonTinta: "#0b1424",
  huruf: "'Helvetica Neue', Arial, sans-serif",
  jendelaBar: "#17223a",
  jendelaTinta: "#e8f0ff",
  jendelaRedup: "#a9bbd8",
};

const Kartu: React.FC<{ t: Tokens }> = ({ t }) => (
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${t.jendelaBar} 0%, ${t.jendela} 60%)`, fontFamily: t.huruf, color: t.jendelaTinta }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, background: t.jendelaBar, display: "flex", alignItems: "center", gap: 28, padding: "0 48px", fontSize: 26 }}>
      <span style={{ fontWeight: 700, borderBottom: `4px solid ${t.aksen}`, paddingBottom: 6 }}>Naskah</span>
      <span style={{ color: t.jendelaRedup }}>Klip</span>
      <span style={{ color: t.jendelaRedup }}>Suara</span>
    </div>
    <div style={{ position: "absolute", left: 72, top: 150, fontSize: 120, fontWeight: 700, lineHeight: 1 }}>Rencana</div>
    <div style={{ position: "absolute", left: 72, top: 270, fontSize: 120, fontWeight: 700, lineHeight: 1, color: t.aksen }}>produksi</div>
    <div style={{ position: "absolute", left: 72, top: 440, width: 520, background: t.jendelaBar, borderRadius: 14, padding: "22px 28px", fontSize: 30, lineHeight: 1.5 }}>
      Tulis naskah, susun klip, pasang di timeline
      <span style={{ display: "inline-block", width: 4, height: 32, background: t.aksen, marginLeft: 8, verticalAlign: "middle" }} />
    </div>
  </div>
);

const Jendela: React.FC<{ t: Tokens }> = ({ t }) => {
  const klip = [
    { n: "Intro", w: 15, c: t.ikon[0] },
    { n: "Wawancara", w: 46, c: t.ikon[1] },
    { n: "Penutup", w: 22, c: t.ikon[2] },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: t.huruf, color: t.jendelaTinta, display: "flex", flexDirection: "column" }}>
      <div style={{ height: "10%", background: t.jendelaBar, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3%", fontSize: 22, fontWeight: 700 }}>
        <span>Editor Video</span>
        <span style={{ background: t.aksen, color: t.ikonTinta, padding: "4px 14px", borderRadius: 6, fontSize: 20 }}>Ekspor</span>
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ width: "24%", padding: "3% 3%", fontSize: 20, lineHeight: 1.9 }}>
          <div style={{ color: t.jendelaRedup, fontSize: 18, fontWeight: 700 }}>ASET</div>
          <div>Klip 1</div>
          <div>Klip 2</div>
          <div>Suara</div>
          <div>Judul</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "62%", height: "88%", background: t.jendelaBar, borderRadius: 8, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, background: `linear-gradient(180deg, ${t.ikon[1]} 0%, ${t.ikon[3]} 100%)`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: "30%", bottom: 0, width: "18%", height: "58%", background: t.jendela, borderRadius: "50% 50% 0 0" }} />
              <div style={{ position: "absolute", left: "34%", bottom: "50%", width: "10%", aspectRatio: "1", background: t.matahari, borderRadius: "50%" }} />
              <div style={{ position: "absolute", left: "58%", bottom: 0, width: "16%", height: "46%", background: t.jendelaBar, borderRadius: "50% 50% 0 0" }} />
              <div style={{ position: "absolute", left: 14, bottom: 12, fontSize: 30, fontWeight: 700, color: t.ikonTinta, background: t.aksen, padding: "2px 12px", borderRadius: 6 }}>Obrolan Pagi</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "34%", background: t.jendelaBar, padding: "1.6% 3%", display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          <div style={{ width: "10%", fontSize: 18, color: t.jendelaRedup, display: "flex", alignItems: "center" }}>Video</div>
          {klip.map((k) => (
            <div key={k.n} style={{ width: `${k.w}%`, background: k.c, color: t.ikonTinta, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>
              {k.n}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          <div style={{ width: "10%", fontSize: 18, color: t.jendelaRedup, display: "flex", alignItems: "center" }}>Suara</div>
          <div style={{ width: "72%", background: t.jendela, borderRadius: 6, color: t.jendelaRedup, fontSize: 18, display: "flex", alignItems: "center", padding: "0 12px" }}><div style={{ display: "flex", alignItems: "center", gap: 3, height: "70%", width: "100%" }}>{Array.from({ length: 46 }, (_, i) => <div key={i} style={{ flex: 1, height: `${25 + ((i * 37) % 60)}%`, background: t.jendelaRedup, borderRadius: 2 }} />)}</div></div>
        </div>
        <div style={{ position: "absolute", left: "34%", top: 0, bottom: 0, width: 3, background: t.sorot }} />
      </div>
    </div>
  );
};

const props = (t: Tokens): WorldStageProps => ({
  tokens: t,
  seed: 7,
  kartu: <Kartu t={t} />,
  isiJendela: <Jendela t={t} />,
  dockItems: ["1", "2", "3", "4", "5", "6", "7"],
  panelJudul: "Asisten",
  panelPesan: "Klip sudah di timeline. Bagian mana yang mau diubah?",
  panelBalas: "Rapikan intro dan perbesar judulnya",
  promptTeks: "Judul lebih besar",
  pilihanModel: "Model utama",
});

export const DemoA: React.FC = () => <WorldStage {...props(TOKENS_A)} />;
export const DemoB: React.FC = () => <WorldStage {...props(TOKENS_B)} />;
