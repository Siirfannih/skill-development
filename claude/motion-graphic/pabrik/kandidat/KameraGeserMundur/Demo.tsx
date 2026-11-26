import React from "react";
import { useVideoConfig } from "remotion";
import { KameraGeserMundur } from "./KameraGeserMundur";
import { ISIAN, IdIsian, PanggungNetral, WadahUji, KataUji } from "../../demo-netral/Netral";

const ONSET = 11;

type Bidang = { x: number; y: number; w: number; h: number };
// [x (fraksi W, koordinat frame), y (fraksi H), tinggi huruf px, indeks kata]
type Unit = [number, number, number, number];

// Bidang awal mengisi frame (dan sedikit lewat atas/bawah agar tepi atas/bawah tetap tertutup setelah mengecil).
const BIDANG_AWAL: Bidang = { x: 0, y: -0.08, w: 1.04, h: 1.16 };
// Bidang kedua di luar frame sebelah kiri (sisi yang dibuka saat isi bergeser ke kanan), dipisah celah dari bidang awal.
// Di akhir gerak (geser 0,192 W, skala 0,88 di tengah frame) bidang ini tampil di ±0,00..0,20 W, celah sampai 0,25 W.
const BIDANG_BARU: Bidang = { x: -0.29, y: 0.06, w: 0.23, h: 0.88 };

// Tata letak acak-tetap, ukuran berbeda-beda (rata-rata ±79 px), tanpa pola kisi berulang.
const UNIT_AWAL: Unit[] = [
  [0.06, 0.1, 79, 0],
  [0.42, 0.06, 58, 1],
  [0.7, 0.16, 96, 2],
  [0.14, 0.38, 104, 3],
  [0.62, 0.44, 66, 1],
  [0.3, 0.68, 84, 2],
  [0.74, 0.74, 72, 0],
  [0.05, 0.8, 62, 3],
];
const UNIT_BARU: Unit[] = [
  [-0.27, 0.14, 72, 1],
  [-0.25, 0.42, 88, 0],
  [-0.28, 0.7, 60, 2],
];

export const Demo: React.FC<{ isian: IdIsian }> = ({ isian }) => {
  const { width, height } = useVideoConfig();
  const kata = ISIAN[isian].kata;
  const kartu = isian === "B";

  const bidang = (b: Bidang, unit: Unit[], key: string) => {
    const left = b.x * width;
    const top = b.y * height;
    const lebar = b.w * width;
    const tinggi = b.h * height;
    const isi = unit.map(([x, y, ukuran, i], n) => (
      <KataUji
        key={n}
        isian={isian}
        ukuran={ukuran}
        style={{ position: "absolute", left: x * width - left, top: y * height - top }}
      >
        {kata[i % kata.length]}
      </KataUji>
    ));
    const letak: React.CSSProperties = { position: "absolute", left, top };
    return kartu ? (
      <WadahUji key={key} isian={isian} lebar={lebar} tinggi={tinggi} style={letak}>
        {isi}
      </WadahUji>
    ) : (
      <div key={key} style={{ ...letak, width: lebar, height: tinggi }}>
        {isi}
      </div>
    );
  };

  return (
    <PanggungNetral isian={isian}>
      <KameraGeserMundur mulai={ONSET}>
        {bidang(BIDANG_AWAL, UNIT_AWAL, "awal")}
        {bidang(BIDANG_BARU, UNIT_BARU, "baru")}
      </KameraGeserMundur>
    </PanggungNetral>
  );
};
