import React, {createContext, useContext} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ukurTeks} from '../bersama/BarisKata';
import {KataKecil} from '../bersama/KataKecil';
import {HURUF, JARAK, NETRAL, TEKS} from '../bersama/tema';
import {useFrameKomposisi} from '../bersama/useFrameKomposisi';
import {frameDariDetik} from '../bersama/waktu';
import {kataRelatif, type KataNaskah} from '../data/naskah';
import {durasiW4, type AdeganW4} from './w4-shots';

export const QcW4 = createContext(false);

export const useWaktuW4 = (id: AdeganW4) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const kata = kataRelatif(id);
  const durasi = durasiW4(id, fps);
  const pada = (indeks: number) => frameDariDetik(kata[indeks].mulai, fps);
  const kelompok = (nomor: number) => {
    const batas = kata.find((k) => k.kelompok > nomor)?.mulai ?? durasi / fps;
    return kata.filter((k) => k.kelompok === nomor).map((k) => ({...k, selesai: batas}));
  };
  const aktif = kata.filter((k) => frame >= frameDariDetik(k.mulai, fps)).slice(-1)[0]?.kelompok ?? 0;
  return {frame, fps, kata, durasi, pada, kelompok, aktif};
};

// BarisKata membaca frame komposisi. Rebase menjaga onset lokal di dalam Sequence master.
export const KataW4: React.FC<{
  kata: KataNaskah[];
  putih?: boolean;
  ukuran?: 'narasi' | 'tekan' | 'raksasa';
  x?: number;
  y?: number;
  lebar?: number;
}> = ({kata, putih = false, ukuran = 'narasi', x = 0.5, y = TEKS.garisY, lebar = 0.8}) => {
  const frame = useCurrentFrame();
  const global = useFrameKomposisi();
  const {fps, width, height} = useVideoConfig();
  const tanpaTeks = useContext(QcW4);
  if (tanpaTeks) return null;
  const offset = (global - frame) / fps;
  const tinggi = HURUF.ukuran[ukuran];
  const bobot = ukuran === 'narasi' ? HURUF.bobot.narasi : HURUF.bobot.tekan;
  const fit = ukuran === 'raksasa'
    ? Math.min(1, width * lebar / ukurTeks(kata.map((k) => k.t).join(' '), tinggi, bobot).width) : 1;
  return <AbsoluteFill data-w4-kata data-w4-penekanan={ukuran !== 'narasi' ? '' : undefined}
    style={{'--w4-x': `${width * x}px`, '--w4-y': `${height * y}px`,
      '--w4-ukuran': `${tinggi * fit}px`, '--w4-bobot': bobot,
      '--w4-warna': putih ? NETRAL.putih : NETRAL.tinta,
      '--w4-celah': `${ukuran === 'narasi' ? (putih ? TEKS.celahFootage : TEKS.celahKanvas) * width : JARAK.m}px`,
    } as React.CSSProperties}>
    <style>{`
      [data-w4-kata] [data-baris-kata] {
        left: var(--w4-x) !important; top: var(--w4-y) !important;
        font-size: var(--w4-ukuran) !important; font-weight: var(--w4-bobot) !important;
        color: var(--w4-warna) !important; column-gap: var(--w4-celah) !important;
      }
      [data-w4-penekanan] [data-kata] {width: auto !important;}
      [data-w4-penekanan] [data-baris-kata] > span {transform: none !important;}
    `}</style>
    <KataKecil diFootage={putih} kata={kata.map((k) => ({...k, mulai: k.mulai + offset, selesai: k.selesai + offset}))}/>
  </AbsoluteFill>;
};
