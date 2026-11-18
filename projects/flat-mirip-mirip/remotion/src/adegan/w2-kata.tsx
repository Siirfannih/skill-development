import React, {useEffect, useLayoutEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {kataRelatif, NASKAH} from '../data/naskah';
import {KataKecil} from '../bersama/KataKecil';
import {KataTekan} from '../bersama/KataTekan';
import {ukurTeks} from '../bersama/BarisKata';
import {HURUF, JARAK, TEKS} from '../bersama/tema';
import {useFrameKomposisi} from '../bersama/useFrameKomposisi';
import {frameDariDetik} from '../bersama/waktu';

export type W2Id = 'P04' | 'P05' | 'P06';

const DOMSiap: React.FC<{handle: number}> = ({handle}) => {
  useLayoutEffect(() => continueRender(handle), [handle]);
  return null;
};

// Fonts melepas delayRender setelah setState. Gerbang ini menunggu commit DOM
// di dalam Kanvas agar still dengan font cache hangat tidak kehilangan teks.
export const KanvasW2: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [handle] = useState(() => delayRender('W2: DOM setelah font termuat'));
  useEffect(() => () => continueRender(handle), [handle]);
  return <Kanvas><DOMSiap handle={handle}/>{children}</Kanvas>;
};

export const useW2 = (id: W2Id) => {
  const frame = useCurrentFrame();
  const frameKomposisi = useFrameKomposisi();
  const {fps, width, height} = useVideoConfig();
  const kata = kataRelatif(id);
  const durasi = Math.round((NASKAH[id].selesai - NASKAH[id].mulai) * fps);
  const f = (detik: number) => frameDariDetik(detik, fps);
  const kelompok = kata.reduce((aktif, k) => frame >= f(k.mulai) ? k.kelompok : aktif, 0);
  return {frame, fps, width, height, kata, durasi, f, kelompok, offset: (frameKomposisi - frame) / fps};
};

type TeksW2Props = {
  id: W2Id;
  x?: number;
  y?: number;
  putih?: boolean;
  tekan?: readonly string[];
  warna?: 'tinta' | 'primer';
};

// Komponen bersama membaca frame komposisi dan mengelompokkan tiga kata.
// Wrapper memilih kelompok naskah dahulu, lalu menggeser waktunya ke komposisi.
export const TeksW2: React.FC<TeksW2Props> = ({id, x, y, putih = false, tekan, warna = 'tinta'}) => {
  const {frame, fps, width, height, kata, durasi, kelompok, offset} = useW2(id);
  const grup = kata.filter((k) => k.kelompok === kelompok);
  const berikut = kata.find((k) => k.kelompok > kelompok)?.mulai ?? durasi / fps;
  const adaPenekanan = tekan && grup.some((k) => tekan.includes(k.t) && frame >= frameDariDetik(k.mulai, fps));
  const tampil = adaPenekanan ? grup.filter((k) => tekan!.includes(k.t)) : grup.filter((k) => !tekan?.includes(k.t));
  if (!tampil.length) return null;
  const waktu = tampil.map((k) => ({...k, mulai: k.mulai + offset, selesai: berikut + offset}));
  const posisi = {transform: `translate(${(x ?? width / 2) - width / 2}px, ${(y ?? height * TEKS.garisY) - height * TEKS.garisY}px)`};
  if (!adaPenekanan) return <AbsoluteFill style={posisi}><KataKecil kata={waktu} diFootage={putih}/></AbsoluteFill>;

  const lebar = waktu.map((k) => ukurTeks(k.t, HURUF.ukuran.tekan, HURUF.bobot.tekan).width);
  const celah = JARAK.m;
  const total = lebar.reduce((a, b) => a + b, 0) + celah * (lebar.length - 1);
  return <AbsoluteFill style={posisi}>{waktu.map((k, i) => {
    const kiri = lebar.slice(0, i).reduce((a, b) => a + b, 0) + celah * i;
    return <AbsoluteFill key={k.t} style={{transform: `translateX(${-total / 2 + kiri + lebar[i] / 2}px)`}}>
      <KataTekan kata={k} warna={warna}/>
    </AbsoluteFill>;
  })}</AbsoluteFill>;
};
