import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {KataKecil} from '../bersama/KataKecil';
import {KataTekan} from '../bersama/KataTekan';
import {HURUF, NETRAL} from '../bersama/tema';
import {useFrameKomposisi} from '../bersama/useFrameKomposisi';
import {frameDariDetik} from '../bersama/waktu';
import {kataRelatif, NASKAH} from '../data/naskah';

export type AdeganW3 = 'P08' | 'P09' | 'P10';

export const useWaktuW3 = (id: AdeganW3) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const kata = kataRelatif(id);
  const durasi = Math.round((NASKAH[id].selesai - NASKAH[id].mulai) * fps);
  const pada = (teks: string) => {
    const item = kata.find((k) => k.t === teks);
    if (!item) throw new Error(`${id}: kata jangkar "${teks}" tidak ditemukan.`);
    return frameDariDetik(item.mulai, fps);
  };
  const akhir = (teks: string) => {
    const item = kata.find((k) => k.t === teks);
    if (!item) throw new Error(`${id}: kata jangkar "${teks}" tidak ditemukan.`);
    return frameDariDetik(item.selesai, fps);
  };
  return {frame, fps, kata, durasi, pada, akhir};
};

export const TeksW3: React.FC<{
  id: AdeganW3;
  tekanKelompok?: number;
  putih?: boolean;
  tekanPerKata?: boolean;
}> = ({id, tekanKelompok, putih = false, tekanPerKata = false}) => {
  const {frame, fps, kata, durasi} = useWaktuW3(id);
  const frameGlobal = useFrameKomposisi();
  const aktif = kata.filter((k) => frame >= frameDariDetik(k.mulai, fps)).slice(-1)[0];
  if (!aktif) return null;
  const kelompok = kata.filter((k) => k.kelompok === aktif.kelompok);
  const berikut = kata.find((k) => k.kelompok > aktif.kelompok);
  const batas = berikut?.mulai ?? durasi / fps;
  const tekan = aktif.kelompok === tekanKelompok;
  const tampil = tekan && tekanPerKata ? [aktif] : kelompok;
  // BarisKata membaca frame global; data adegan tetap lokal dan dikelompokkan menurut naskah.
  const offset = (frameGlobal - frame) / fps;
  const rebased = tampil.map((k, i) => ({
    ...k,
    mulai: k.mulai + offset,
    selesai: (tekan || i === tampil.length - 1 ? batas : k.selesai) + offset,
  }));
  if (!tekan) return <KataKecil kata={rebased} diFootage={putih}/>;

  if (!tekanPerKata) return <AbsoluteFill data-w3-tekan-blok>
    <style>{`
      [data-w3-tekan-blok] [data-baris-kata] { font-size: ${HURUF.ukuran.tekan}px !important; font-weight: ${HURUF.bobot.tekan} !important; }
      [data-w3-tekan-blok] [data-kata] { width: auto !important; }
      [data-w3-tekan-blok] [data-baris-kata] > span { transform: none !important; }
    `}</style>
    <KataKecil kata={rebased} diFootage={putih}/>
  </AbsoluteFill>;
  return <AbsoluteFill data-w3-tekan>
    {putih && <style>{`[data-w3-tekan] [data-baris-kata] { color: ${NETRAL.putih} !important; }`}</style>}
    <KataTekan kata={rebased[0]} warna="tinta"/>
  </AbsoluteFill>;
};
