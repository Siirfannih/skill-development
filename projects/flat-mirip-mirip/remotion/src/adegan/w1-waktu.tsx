import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {useFrameKomposisi} from '../bersama/useFrameKomposisi';
import {frameDariDetik, type Kata} from '../bersama/waktu';
import {kataRelatif, NASKAH, type KataNaskah} from '../data/naskah';
import {move} from '../lib/curves';

export const durasiW1 = (id: string, fps: number) =>
  Math.round((NASKAH[id].selesai - NASKAH[id].mulai) * fps);

export const useAdeganW1 = (id: string) => {
  const frame = useCurrentFrame();
  const frameKomposisi = useFrameKomposisi();
  const {fps, width, height} = useVideoConfig();
  const kata = kataRelatif(id);
  const durasi = durasiW1(id, fps);
  const offset = frameKomposisi - frame;
  const diucapkan = kata.filter((k) => frame >= frameDariDetik(k.mulai, fps));
  const kelompok = diucapkan.length ? diucapkan[diucapkan.length - 1].kelompok : -1;
  const aktif = kata.filter((k) => k.kelompok === kelompok);
  const berikut = kata.find((k) => k.kelompok > kelompok);
  const akhirKelompok = berikut?.mulai ?? durasi / fps;

  // BarisKata dan Invert membaca waktu komposisi; onset naskah tetap relatif adegan.
  const keKomposisi = (daftar: readonly Kata[], tahanSampai = akhirKelompok): Kata[] =>
    daftar.map((k) => ({...k, mulai: k.mulai + offset / fps,
      selesai: Math.max(k.selesai, tahanSampai) + offset / fps}));

  const cari = (teks: string): KataNaskah => {
    const hasil = kata.find((k) => k.t === teks);
    if (!hasil) throw new Error(`${id}: kata ${teks} tidak ditemukan.`);
    return hasil;
  };

  return {frame, fps, width, height, kata, durasi, offset, kelompok, aktif,
    akhirKelompok, cari, keKomposisi};
};

export const KanvasW1: React.FC<{durasi: number; push?: number; children: React.ReactNode}> = ({durasi, push = 0.012, children}) => {
  const frame = useCurrentFrame();
  const skala = 1 + push * move(frame, 0, Math.max(1, durasi - 1), 'drift');
  return <Kanvas><AbsoluteFill style={{transform: `scale(${skala})`}}>{children}</AbsoluteFill></Kanvas>;
};
