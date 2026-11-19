import React from 'react';
import {KT83} from '../tema';
import {aktif} from './common';
import {GelombangKata} from './GelombangKata';
import type {Blok, Kepala} from './types';

export const KataDada: React.FC<{blok: Blok; kepala: Kepala; f: number}> = ({blok, kepala: k, f}) => {
  const kata = blok.kata.find((w) => aktif(w, f));
  if (!kata) return null;
  const y = (blok.bawahDecision ? 902 : k.atas + k.tinggi + 100 * k.z) + (blok.tata?.dy ?? 0) * k.z;
  const posisi = blok.posisi?.[f];
  const size = (blok.tata?.ukuran ?? KT83.ukuran) * k.z;
  return <div style={{position: 'absolute', left: posisi?.x ?? k.cx + (blok.tata?.dx ?? 0) * k.z, top: posisi?.y ?? y, transform: 'translate(-50%, -50%)'}}>
    <div style={{fontFamily: KT83.huruf, fontWeight: kata.bobot ?? 700, fontSize: size, lineHeight: kata.tag ? 1.2 : 1.05,
      letterSpacing: '-0.02em', whiteSpace: 'nowrap', color: KT83.teks, textShadow: KT83.bayang,
      ...(kata.tag ? {background: KT83.verre, border: `1px solid ${KT83.garis}`, borderRadius: KT83.radius,
        padding: `${KT83.paddingY}px ${KT83.paddingX}px`, backdropFilter: `blur(${KT83.blur}px)`, boxShadow: KT83.bayangTag} : {}),
      }}><GelombangKata teks={kata.teks} size={size} weight={kata.bobot ?? 700} age={f - kata.masuk}
        available={kata.akhir - kata.masuk} id={`dada-${blok.id}-${kata.masuk}`} lineHeight={kata.tag ? 1.2 : 1.05} clip/></div>
  </div>;
};
