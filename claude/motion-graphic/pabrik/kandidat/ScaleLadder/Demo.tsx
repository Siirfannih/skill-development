import React from "react";
import { useCurrentFrame } from "remotion";
import { ScaleLadder } from "./ScaleLadder";

const HURUF = "Helvetica Neue, Arial, sans-serif";

const WARNA_A = {
  latar: "#F1EADB",
  tinta: "#14110F",
  kecil: "#4A4036",
  zona: "#C8552B",
  kotak: "#E3B04B",
  gelap: "#2B2118",
};
const WARNA_B = {
  latar: "#0E1A33",
  tinta: "#EAF0FB",
  kecil: "#A8BCE3",
  zona: "#2F6BEA",
  kotak: "#7FB2FF",
  gelap: "#070D1C",
};
type Warna = typeof WARNA_A;

const CUT = 70;
const ZONA_ATAS = 36; // % tinggi: zona warna di belakang seluruh kata

// Gedung berurutan: [lebar %, tinggi % frame]; periode 130% agar pembungkusan di luar layar.
const GEDUNG: [number, number][] = [
  [14, 24], [10, 32], [16, 20], [12, 36], [15, 27], [13, 22], [18, 33], [12, 26], [20, 30],
];
const PERIODE = 130;

const Footage: React.FC<{ w: Warna }> = ({ w }) => {
  const f = useCurrentFrame();
  const adegan2 = f >= CUT;
  const lokal = adegan2 ? f - CUT : f;
  const arah = adegan2 ? 1 : -1;
  let kum = adegan2 ? 40 : 0;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: `${ZONA_ATAS}%`, bottom: 0, background: w.zona }} />
      {GEDUNG.map(([lb, tg], b) => {
        const awal = kum;
        kum += lb;
        const x = ((((awal + arah * lokal * 0.28) % PERIODE) + PERIODE) % PERIODE) - 24;
        const tinggi = adegan2 ? tg * 0.8 : tg;
        return (
          <div
            key={b}
            style={{ position: "absolute", left: `${x}%`, width: `${lb}%`, bottom: 0, height: `${tinggi}%`, background: w.gelap }}
          >
            {Array.from({ length: 12 }).map((_, k) => {
              const c = k % 3;
              const r = Math.floor(k / 3);
              if ((c + r + b) % 3 === 0) return null;
              return (
                <div
                  key={k}
                  style={{
                    position: "absolute",
                    left: `${14 + c * 28}%`,
                    top: `${10 + r * 21}%`,
                    width: "18%",
                    height: "10%",
                    background: w.kotak,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const IsiKotak: React.FC<{ w: Warna }> = ({ w }) => {
  const f = useCurrentFrame();
  const adegan2 = f >= CUT;
  const lokal = adegan2 ? f - CUT : f;
  const p = Math.min(1, lokal / 60);
  const naik = adegan2 ? 1 - p : p;
  const matahari = 66 - 40 * naik; // % dari atas kotak
  const geser = -lokal * 0.25;
  return (
    <div style={{ position: "absolute", inset: 0, background: adegan2 ? w.zona : w.kotak }}>
      <div
        style={{
          position: "absolute",
          left: "56%",
          top: `${matahari}%`,
          height: "34%",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          background: w.latar,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${geser - 5}%`,
          width: "140%",
          top: "42%",
          bottom: 0,
          background: adegan2 ? w.kotak : w.zona,
          clipPath: "polygon(0 55%, 22% 20%, 48% 50%, 72% 12%, 100% 45%, 100% 100%, 0 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${geser * 2 - 5}%`,
          width: "140%",
          top: "62%",
          bottom: 0,
          background: w.gelap,
          clipPath: "polygon(0 40%, 30% 10%, 58% 45%, 80% 5%, 100% 35%, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
};

// Semua kata kecil satu baris, baseline sama, jauh di atas ascender kata raksasa.
const KECIL = [
  { teks: "yang", x: 0.12, y: 0.2 },
  { teks: "kamu", x: 0.32, y: 0.2 },
  { teks: "kerjakan", x: 0.58, y: 0.2 },
  { teks: "hari ini", x: 0.85, y: 0.2 },
];

const Pasang: React.FC<{ w: Warna }> = ({ w }) => (
  <ScaleLadder
    kata="Berubah"
    kecil={KECIL}
    tokens={{ latar: w.latar, tinta: w.tinta, tintaKecil: w.kecil, bingkai: w.tinta, huruf: HURUF }}
    kotak={{ tampil: true, cx: 0.46, top: 0.69, lebar: 0.27, tinggi: 0.29 }}
    lebarRel={0.8}
    footage={<Footage w={w} />}
    isiKotak={<IsiKotak w={w} />}
  />
);

export const DemoA: React.FC = () => <Pasang w={WARNA_A} />;
export const DemoB: React.FC = () => <Pasang w={WARNA_B} />;
