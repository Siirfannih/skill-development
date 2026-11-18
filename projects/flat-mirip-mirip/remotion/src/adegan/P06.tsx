import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {BAYANGAN, JARAK, NETRAL, RADIUS} from '../bersama/tema';
import {move, react, dur} from '../lib/curves';
import {KanvasW2 as Kanvas, TeksW2, useW2} from './w2-kata';

const FOTO = ['k1-01', 'k1-05', 'k1-02'];
type Potongan = {gambar: string; x: number; y: number; lebar: number};
const LATAR: Potongan[] = [
  {gambar: 'k1-01', x: 60, y: 235, lebar: 190},
  {gambar: 'k1-04', x: 170, y: 230, lebar: 190},
  {gambar: 'k2-01', x: 10, y: 700, lebar: 170},
  {gambar: 'k1-06', x: 100, y: 180, lebar: 190},
  {gambar: 'k3-01', x: 70, y: 40, lebar: 350},
  {gambar: 'k3-02', x: 910, y: 0, lebar: 100},
  {gambar: 'k3-01', x: 650, y: 70, lebar: 300},
  {gambar: 'k3-02', x: 655, y: 0, lebar: 80},
];
const SILUET: Potongan[] = [
  {gambar: 'k1-01', x: 350, y: 615, lebar: 300},
  {gambar: 'k2-01', x: 350, y: 715, lebar: 300},
  {gambar: 'k1-05', x: 245, y: 545, lebar: 390},
  {gambar: 'k1-02', x: 300, y: 540, lebar: 310},
];
const SEMUA = ['k1-01', 'k3-01', 'k2-01', 'k5-01', 'k1-04', 'k3-02', 'k1-05', 'k4-01',
  'k1-02', 'k2-02', 'k4-02', 'k5-02', 'k1-03', 'k3-03', 'k2-03', 'k1-06'];

// Koordinat crop dari raster 1024×1280; rasio gambar tetap, tanpa membuat aset pengganti.
const PotongSlop: React.FC<{crop: Potongan; width: number; height: number}> = ({crop, width, height}) => {
  const skala = width / crop.lebar;
  return <div style={{position: 'relative', width, height, overflow: 'hidden', borderRadius: RADIUS.ubin / 2}}>
    <Img src={staticFile(`media/aset-slop/${crop.gambar}.png`)} style={{position: 'absolute', left: -crop.x * skala, top: -crop.y * skala,
      width: 1024 * skala, height: 1280 * skala, maxWidth: 'none'}}/>
  </div>;
};

export const P06: React.FC = () => {
  const {frame, fps, kata, f, durasi, kelompok} = useW2('P06');
  const awal = (grup: number) => f(kata.find((k) => k.kelompok === grup)!.mulai);
  const batas = (grup: number) => grup < 9 ? awal(grup + 1) : durasi;
  const kamera = 1 + 0.025 * move(frame, awal(kelompok), Math.max(1, batas(kelompok) - awal(kelompok)), 'drift');
  const geser = (pada: number) => 872 * move(pada, awal(7), Math.min(dur(872, fps, 0.45), batas(7) - awal(7)), 'whip');
  const kataAkhir = kata[kata.length - 1];
  const puncakKolase = f(kataAkhir.mulai) + Math.round((f(kataAkhir.selesai) - f(kataAkhir.mulai)) / 2);
  const lamaKolase = Math.min(dur(520, fps, 0.6), Math.max(1, Math.round((puncakKolase - awal(9)) * 0.55)));
  const jedaKolase = Math.max(0, puncakKolase - awal(9) - lamaKolase) / react(SEMUA.length - 1, fps);

  return <Kanvas>
    {kelompok < 3 ? <AbsoluteFill style={{transform: `scale(${kamera})`}}>
      <Img src={staticFile(`media/aset-slop/${FOTO[kelompok]}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%'}}/>
      <AbsoluteFill style={{background: NETRAL.tinta, opacity: 0.64}}/>
    </AbsoluteFill> : <AbsoluteFill style={{transform: `scale(${kamera})`}}>
      {kelompok === 3 && ['k3-01', 'k3-02', 'k3-03'].map((gambar, urutan) => {
        const mulai = awal(3) + react(urutan, fps);
        const masuk = (pada: number) => move(pada, mulai, Math.min(dur(550, fps, 0.7), batas(3) - mulai), 'land');
        const p = masuk(frame);
        const blur = Math.abs(masuk(frame) - masuk(frame - 1)) * 18;
        if (frame < mulai) return null;
        return <div key={gambar} style={{position: 'absolute', left: 1110 + [-55, 45, 0][urutan], top: 196 + [-24, 24, 0][urutan], width: 540, height: 675,
          border: `${JARAK.s / 2}px solid ${NETRAL.putih}`, borderRadius: RADIUS.ubin, boxShadow: BAYANGAN.kartu,
          transform: `translate(${(1 - p) * 600}px, ${(1 - p) * 130}px) rotate(${[-12, 9, -3][urutan] + (1 - p) * 10}deg)`, filter: `blur(${blur}px)`}}>
          <Img src={staticFile(`media/aset-slop/${gambar}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: RADIUS.ubin / 2}}/>
        </div>;
      })}
      {(kelompok === 4 || kelompok === 5) && Array.from({length: 9}, (_, urutan) => {
        const baris = Math.floor(urutan / 3);
        const mulai = awal(4) + react(baris, fps);
        const masuk = (pada: number) => move(pada, mulai, Math.min(dur(350, fps, 0.7), awal(5) - mulai), 'land');
        const p = masuk(frame);
        const blur = Math.abs(masuk(frame) - masuk(frame - 1)) * 18;
        if (frame < mulai) return null;
        return <div key={urutan} style={{position: 'absolute', left: 1034 + (urutan % 3) * 258, top: 76 + baris * 310, width: 240, height: 300,
          overflow: 'hidden', borderRadius: RADIUS.ubin, transform: `translateX(${(1 - p) * 600}px)`, filter: `blur(${blur}px)`, boxShadow: BAYANGAN.ubin}}>
          <Img src={staticFile(`media/aset-slop/${['k1-01', 'k1-05', 'k1-01'][urutan % 3]}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        </div>;
      })}
      {(kelompok === 6 || kelompok === 7) && <div style={{position: 'absolute', left: 924, top: 240, width: 876, height: 620, overflow: 'hidden'}}>
        {LATAR.map((crop, urutan) => {
          const mulai = awal(6) + react(urutan % 4, fps, 0.5);
          const masuk = (pada: number) => move(pada, mulai, Math.max(1, Math.min(dur(320, fps, 0.6), awal(7) - mulai)), 'land');
          const posisi = (pada: number) => 16 + urutan * 218 - geser(pada) + (1 - masuk(pada)) * 320;
          const blur = Math.min(14, Math.abs(posisi(frame) - posisi(frame - 1)) * 0.08);
          if (frame < mulai) return null;
          return <div key={urutan} style={{position: 'absolute', left: 0, top: 36 + [0, 18, -10, 12][urutan % 4],
            border: `${JARAK.s / 2}px solid ${NETRAL.putih}`, borderRadius: RADIUS.ubin, boxShadow: BAYANGAN.ubin,
            transform: `translateX(${posisi(frame)}px)`, filter: `blur(${blur}px)`}}>
            <PotongSlop crop={crop} width={184} height={524}/>
          </div>;
        })}
      </div>}
      {kelompok === 8 && SILUET.map((crop, urutan) => {
        const mulai = awal(8) + react(urutan, fps);
        const masuk = (pada: number) => move(pada, mulai, Math.max(1, Math.min(dur(460, fps, 0.65), batas(8) - mulai)), 'land');
        const p = masuk(frame);
        const blur = Math.abs(masuk(frame) - masuk(frame - 1)) * 22;
        if (frame < mulai) return null;
        return <div key={crop.gambar} style={{position: 'absolute', left: 940 + urutan * 218, top: 330 + [0, -20, 16, -8][urutan],
          border: `${JARAK.s / 2}px solid ${NETRAL.putih}`, borderRadius: RADIUS.ubin, boxShadow: BAYANGAN.kartu,
          transform: `translate(${(1 - p) * 460}px, ${(1 - p) * 70}px)`, filter: `blur(${blur}px)`}}>
          <PotongSlop crop={crop} width={184} height={344}/>
        </div>;
      })}
      {kelompok === 9 && <AbsoluteFill style={{clipPath: 'inset(0 0 0 880px)'}}>
        {SEMUA.map((gambar, urutan) => {
          const mulai = awal(9) + react(urutan, fps, jedaKolase);
          const masuk = (pada: number) => move(pada, mulai, lamaKolase, 'land');
          const p = masuk(frame);
          const blur = Math.abs(masuk(frame) - masuk(frame - 1)) * 22;
          if (frame < mulai) return null;
          return <div key={gambar} style={{position: 'absolute', left: 920 + (urutan % 4) * 198, top: 110 + Math.floor(urutan / 4) * 184,
            width: 252, height: 315, border: `${JARAK.s / 2}px solid ${NETRAL.putih}`, borderRadius: RADIUS.ubin, boxShadow: BAYANGAN.kartu,
            transform: `translate(${(1 - p) * 520}px, ${(1 - p) * [90, -80, 60, -100][urutan % 4]}px) rotate(${[-6, 4, -3, 7, 3, -5, 6, -4][urutan % 8] + (1 - p) * 8}deg)`,
            filter: `blur(${blur}px)`}}>
            <Img src={staticFile(`media/aset-slop/${gambar}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: RADIUS.ubin / 2}}/>
          </div>;
        })}
      </AbsoluteFill>}
    </AbsoluteFill>}
    <TeksW2 id="P06" x={kelompok < 3 ? 960 : 510} putih={kelompok < 3}
      tekan={kelompok === 9 ? ['AI', 'Slop.'] : undefined} warna="primer"/>
  </Kanvas>;
};
