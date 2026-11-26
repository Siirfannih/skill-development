import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AnchoredCaption } from "./AnchoredCaption";

const HURUF = "Inter, 'Helvetica Neue', Arial, sans-serif";

// Peran warna: gelap/terang dipetakan per set agar tingkat kecerahan struktur sama di A dan B.
const A = {
  latar: "#F6F5FC", permukaan: "#F1F1FA", tinta: "#0E1426", redup: "#5B6280", aksen: "#6F86FF", aksen2: "#1B2748",
  gelap: "#1B2748", terang: "#F6F5FC", teks: "#FFFFFF", bayang: "#0E1426", huruf: HURUF,
};
const B = {
  latar: "#110D0B", permukaan: "#2A201B", tinta: "#FBF8F3", redup: "#A39384", aksen: "#EE9440", aksen2: "#8A6246",
  gelap: "#110D0B", terang: "#FBF8F3", teks: "#FBF8F3", bayang: "#110D0B", huruf: HURUF,
};
type T = typeof A;

const KATA = [
  { teks: "Kata baru", mulai: 0 },
  { teks: "menimpa", mulai: 9 },
  { teks: "yang lama,", mulai: 17 },
  { teks: "tanpa", mulai: 28 },
  { teks: "fade", mulai: 35 },
  { teks: "dan", mulai: 43 },
  { teks: "tanpa", mulai: 49 },
  { teks: "geser.", mulai: 57 },
  { teks: "Gambar", mulai: 68 },
  { teks: "pindah", mulai: 78 },
  { teks: "sendiri.", mulai: 87 },
  { teks: "terpisah.", mulai: 100 },
];

// Potongan shot tidak serempak dengan kata; ritme tak seragam (6-15 frame).
const MULAI = [0, 11, 19, 31, 38, 47, 55, 62, 74, 80, 92, 98, 106, 113];
const URUT = [0, 1, 2, 3, 4, 5, 6, 7, 2, 0, 5, 3, 7, 1];
// scrim kuat untuk shot terang (4, 1, 5 sebagian), sedang untuk lainnya
const SCRIM_SHOT = [0.55, 0.9, 0.5, 0.55, 0.95, 0.85, 0.6, 0.55];
const SHOT = MULAI.map((mulai, i) => ({ mulai, scrim: SCRIM_SHOT[URUT[i]] }));

const Scene: React.FC<{ t: T; id: string; start: number; children: (f: number) => React.ReactNode }> = ({ t, id, start, children }) => {
  const f = Math.max(0, useCurrentFrame() - start);
  return (
    <svg width="100%" height="100%" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor={t.terang} stopOpacity="0.38" />
          <stop offset="1" stopColor={t.terang} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.bayang} stopOpacity="0" />
          <stop offset="1" stopColor={t.bayang} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {children(f)}
    </svg>
  );
};

// Sumber cahaya dari luar layar kiri-atas: ekor sinar diagonal.
const Sinar: React.FC<{ id: string; k?: number }> = ({ id, k = 1 }) => (
  <polygon points={`-120,-40 ${380 * k},-40 ${900},1100 ${420},1320 -120,1320`} fill={`url(#b${id})`} />
);

const adegan = (t: T, start: number, i: number) => {
  const id = `${i}-${start}`;
  const S = (fn: (f: number) => React.ReactNode) => (
    <Scene t={t} id={id} start={start}>
      {fn}
    </Scene>
  );
  switch (i) {
    case 0: // kartu bertumpuk menimpa kartu lama
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.gelap} />
          <g transform={`translate(${-f * 1.2} 0) rotate(-8 360 640)`}>
            <rect x="-60" y="140" width="640" height="560" fill={t.permukaan} />
            <rect x="60" y="360" width="640" height="600" fill={t.aksen} />
            <rect x="180" y="640" width="620" height="560" fill={t.redup} />
          </g>
          <Sinar id={id} />
          <rect width="720" height="1280" fill={`url(#s${id})`} />
        </>
      ));
    case 1: // belahan keras terang | gelap
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.gelap} />
          <polygon points="0,0 470,0 250,1280 0,1280" fill={t.terang} />
          <polygon points={`470,0 520,0 300,1280 250,1280`} fill={t.aksen} />
          <rect x={560 - f * 2} y="200" width="260" height="120" fill={t.redup} />
          <rect x={620 - f * 2} y="940" width="260" height="170" fill={t.permukaan} />
        </>
      ));
    case 2: // bidang besar saling menimpa, bidang bawah naik
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.redup} />
          <rect x="-40" y="0" width="520" height="900" fill={t.gelap} />
          <rect x={260 + f} y={120 - f} width="520" height="760" fill={t.aksen} />
          <rect x="0" y={1000 - f * 2} width="720" height="400" fill={t.permukaan} />
          <Sinar id={id} />
        </>
      ));
    case 3: // roll film bergulir vertikal
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.gelap} />
          <rect x="90" y="-100" width="540" height="1480" fill={t.permukaan} />
          {[0, 1, 2, 3, 4, 5, 6].map((n) => {
            const y = ((n * 230 - f * 6) % 1610) - 230;
            return (
              <g key={n}>
                <rect x="150" y={y} width="420" height="190" fill={n % 3 === 0 ? t.aksen : n % 3 === 1 ? t.redup : t.terang} />
                <rect x="104" y={y + 20} width="30" height="40" fill={t.gelap} />
                <rect x="104" y={y + 130} width="30" height="40" fill={t.gelap} />
                <rect x="586" y={y + 20} width="30" height="40" fill={t.gelap} />
                <rect x="586" y={y + 130} width="30" height="40" fill={t.gelap} />
              </g>
            );
          })}
        </>
      ));
    case 4: // shot cerah: bidang terang penuh, pita diagonal
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.terang} />
          <polygon points={`-100,${1000 - f * 3} 820,${600 - f * 3} 820,${1000 - f * 3} -100,${1400 - f * 3}`} fill={t.aksen} />
          <polygon points="-100,0 340,0 -100,520" fill={t.aksen2} />
          <rect x="520" y="60" width="70" height="320" fill={t.redup} opacity="0.6" />
        </>
      ));
    case 5: // klaper miring dengan detail
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.gelap} />
          <Sinar id={id} />
          <g transform={`rotate(-12 360 640) translate(0 ${-f})`}>
            <rect x="60" y="760" width="600" height="420" fill={t.permukaan} />
            <rect x="60" y="760" width="600" height="14" fill={t.redup} />
            {[0, 1, 2].map((n) => (
              <rect key={n} x="100" y={830 + n * 100} width={[320, 240, 400][n]} height="14" fill={t.redup} />
            ))}
            <g transform="rotate(-14 60 740)">
              <rect x="60" y="640" width="600" height="100" fill={t.terang} />
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <polygon key={n} points={`${90 + n * 100},640 ${150 + n * 100},640 ${110 + n * 100},740 ${50 + n * 100},740`} fill={t.aksen2} />
              ))}
            </g>
          </g>
        </>
      ));
    case 6: // tiga kolom penuh tinggi, tiap kolom shot sendiri
      return S((f) => (
        <>
          <rect x="0" width="250" height="1280" fill={t.aksen} />
          <rect x="250" width="230" height="1280" fill={t.gelap} />
          <rect x="480" width="240" height="1280" fill={t.redup} />
          <rect x={30} y={100 + f * 2} width="190" height="300" fill={t.terang} />
          <rect x={270} y={900 - f * 2} width="190" height="260" fill={t.aksen} />
          <rect x={510} y={200 + f} width="180" height="520" fill={t.permukaan} />
          <rect x={510} y={980 - f} width="180" height="160" fill={t.gelap} />
        </>
      ));
    default: // batang ritme dari atas dan bawah
      return S((f) => (
        <>
          <rect width="720" height="1280" fill={t.gelap} />
          {[0, 1, 2, 3, 4, 5].map((n) => {
            const h = [380, 520, 300, 600, 420, 480][n] + ((f * (n % 2 ? 3 : -3)) % 120);
            return (
              <g key={n}>
                <rect x={30 + n * 112} y="0" width="88" height={h * 0.45} fill={n % 2 ? t.aksen : t.permukaan} />
                <rect x={30 + n * 112} y={1280 - h * 0.6} width="88" height={h * 0.6} fill={n % 2 ? t.permukaan : t.aksen} />
              </g>
            );
          })}
          <Sinar id={id} />
        </>
      ));
  }
};

const Isi: React.FC<{ t: T }> = ({ t }) => (
  <AbsoluteFill style={{ backgroundColor: t.gelap }}>
    <AnchoredCaption
      tokens={{ teks: t.teks, bayang: t.bayang, huruf: t.huruf }}
      kata={KATA}
      shot={SHOT}
      ukuran={0.07}
      trackingEm={-0.02}
      bobot={800}
      scrimTinggi={0.34}
    >
      {URUT.map((s, n) => adegan(t, MULAI[n], s))}
    </AnchoredCaption>
  </AbsoluteFill>
);

export const DemoA: React.FC = () => <Isi t={A} />;
export const DemoB: React.FC = () => <Isi t={B} />;
