import React from 'react';
import {KT83} from '../tema';
import {aktif, lebarKata, pop, reaksi} from './common';
import type {Blok, Kepala} from './types';

export const Tangga: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  const current = blok.kata.findIndex((w) => aktif(w, f));
  if (current < 0) return null;
  const kanan = blok.sisi === 'kanan';
  const posisiKanan = (blok.tata?.sisi ?? blok.sisi) === 'kanan';
  const size = (blok.tata?.ukuran ?? (kanan ? KT83.ukuranParodi : KT83.ukuran)) * k.z;
  const row = (blok.tata?.baris ?? 114) * k.z;
  const paddingX = blok.tata?.paddingX ?? KT83.paddingX;
  return <>{blok.kata.map((w, i) => {
    if (i > current || i < current - 1) return null;
    const slot = i;
    const width = lebarKata(w.teks, size) + paddingX * 2;
    let x = posisiKanan ? k.cx + k.lebar * 0.65 + (blok.tata?.jarak ?? 20) * k.z + slot * 22
      : k.cx - k.lebar * 0.65 - width - 20 * k.z + slot * 26;
    x += (blok.tata?.dx ?? 0) * k.z;
    x = Math.max(110, Math.min(1810 - width, x));
    const y = k.atas + k.tinggi * (blok.tata?.kepalaY ?? (blok.bawahBusur ? 1 : 0.66))
      + (blok.tata?.dy ?? 0) * k.z + slot * row;
    const rotation = (slot ? 4 : -5) * (kanan ? -1 : 1);
    if (!posisiKanan && k.rig) {
      const height = size * 1.05 + KT83.paddingY * 2 + 2;
      const angle = rotation * Math.PI / 180;
      const ys = [[0, 0], [width, 0], [0, height], [width, height]].map(([xx, yy]) =>
        y + height / 2 + Math.sin(angle) * (xx - width) + Math.cos(angle) * (yy - height / 2));
      if (Math.max(...ys) > k.rig.y0 && Math.min(...ys) < k.rig.y1
        && x < k.rig.x1 && x + width > k.rig.x0) {
        x = Math.min(x, k.rig.x0 - width - (blok.tata?.jarak ?? KT83.jarakTokoh) * k.z);
      }
    }
    const q = pop(f, w.masuk);
    return <div key={i} style={{position: 'absolute', left: x, top: y, transformOrigin: kanan ? '0 50%' : '100% 50%',
      transform: `translateX(${(1 - q) * (kanan ? 75 : -75) * reaksi(i)}px) rotate(${rotation}deg) scale(${q})`,
      borderRadius: KT83.radius, background: KT83.verreGelap, boxShadow: KT83.bayangTag}}>
      <div style={{fontFamily: KT83.huruf, fontSize: size, fontWeight: 700, lineHeight: 1.05,
        color: KT83.teks, padding: `${KT83.paddingY}px ${paddingX}px`, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
        border: `1px solid ${KT83.garis}`, borderRadius: KT83.radius, background: KT83.verre,
        backdropFilter: `blur(${KT83.blur}px)`}}>{w.teks}</div>
    </div>;
  })}</>;
};
