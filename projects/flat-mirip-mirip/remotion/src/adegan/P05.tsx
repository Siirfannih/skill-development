import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {BerandaIG} from '../bersama/ui-asli/instagram/BerandaIG';
import {BingkaiIPhone} from '../bersama/ui-asli/instagram/BingkaiIPhone';
import {move} from '../lib/curves';
import {KanvasW2 as Kanvas, TeksW2, useW2} from './w2-kata';

const SLOP = ['k1-01', 'k1-05', 'k2-01', 'k1-02', 'k1-01', 'k3-02', 'k1-01', 'k1-03', 'k1-05', 'k2-02', 'k1-01', 'k1-04'];
const AKUN = ['ruang.visual', 'catatan.senja', 'ide.harian', 'studio.konten', 'ruang.kreasi', 'mood.harian'];

export const P05: React.FC = () => {
  const {frame, kata, f, durasi} = useW2('P05');
  const terakhir = kata[kata.length - 1];
  const punchMulai = Math.min(durasi - 2, f(terakhir.selesai));
  const punch = move(frame, punchMulai, durasi - 1 - punchMulai, 'heavy');
  const skala = 1.04 + 4.46 * punch + 0.006 * move(frame, 0, durasi - 1, 'drift');
  // Media unggahan ketujuh tepat di pusat layar pada akhir scroll, agar push masuk ke gambar.
  const target = 240 + 6 * 694 + 491.25 / 2 - 426;
  const scrollPada = (pada: number) => {
    const t = Math.max(0, Math.min(1, pada / (durasi - 1)));
    return 120 + (target - 120) * (0.18 * t + 0.82 * move(pada, 0, durasi - 1, 'leave'));
  };
  const scrollY = scrollPada(frame);
  const blurY = Math.min(14, Math.abs(scrollY - scrollPada(frame - 1)) * 0.055);
  const unggahan = SLOP.map((gambar, urutan) => ({
    akun: AKUN[urutan % AKUN.length], avatarSeed: urutan + 1,
    suka: ['1,2 rb', '864', '2,1 rb'][urutan % 3],
    caption: 'Satu langkah kecil, banyak kemungkinan. Simpan untuk inspirasi berikutnya.',
    media: <Img src={staticFile(`media/aset-slop/${gambar}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>,
  }));
  return <Kanvas>
    <svg width={0} height={0} aria-hidden><defs>
      <filter id="w2-feed-gerak" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation={`0 ${blurY}`}/></filter>
    </defs></svg>
    <AbsoluteFill data-w2-p05>
      <style>{'[data-w2-p05] svg[aria-label^="Rekonstruksi beranda"] > g[clip-path] > g { filter: url(#w2-feed-gerak); }'}</style>
      <div style={{position: 'absolute', left: 960 - 419 * skala / 2, top: 540 - 878 * skala / 2}}>
        <BingkaiIPhone skala={skala}><BerandaIG skala={1} scrollY={scrollY} unggahan={unggahan}/></BingkaiIPhone>
      </div>
    </AbsoluteFill>
    {frame < f(terakhir.selesai) && <TeksW2 id="P05" x={414} tekan={['AI-slop.']}/>}
  </Kanvas>;
};
