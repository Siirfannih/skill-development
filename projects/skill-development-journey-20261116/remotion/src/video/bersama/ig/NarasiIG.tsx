import React from 'react';
import {move} from '../../../lib/curves';
import {IG_R7} from '../tema';
import {IG_EVENT} from './waktu';

type Kata = {id: string; a: number; b: number; teks: string; x: number; y: number; komentar?: boolean; panel?: boolean; label?: boolean};

// Koordinat footage 1920×1080, atau panel putih bila panel=true; keduanya ikut kamera IG.
const KATA: Kata[] = [
  {id: 'T084', a: 4, b: 17, teks: 'Udah', x: 1020, y: 842},
  {id: 'T084', a: 17, b: 33, teks: 'kerasa', x: 1020, y: 842},
  {id: 'T085', a: 37, b: 56, teks: 'video', x: 1000, y: 842},
  {id: 'T085', a: 56, b: 67, teks: 'editing', x: 1000, y: 842},
  {id: 'T087', a: 86, b: 90, teks: 'gak?', x: 420, y: 680},
  {id: 'T087', a: 90, b: 97, teks: 'Atau', x: 1400, y: 680},
  {id: 'T088', a: IG_EVENT.ketik[0], b: 142, teks: 'Comment', x: 300, y: 631, komentar: true, panel: true},
  {id: 'T089', a: 142, b: 158, teks: 'di bawah.', x: 300, y: 631, komentar: true, panel: true},
  {id: 'T090', a: 158, b: 165, teks: 'Nanti', x: 300, y: 631, komentar: true, panel: true},
  {id: 'T091', a: 165, b: 169, teks: 'aku', x: 300, y: 631, komentar: true, panel: true},
  {id: 'T091', a: 169, b: 180, teks: 'kasih', x: 1700, y: 794, komentar: true},
  {id: 'T092', a: IG_EVENT.skill, b: IG_EVENT.gratis, teks: 'SKILL', x: 120, y: 244, label: true},
  {id: 'T094', a: IG_EVENT.gratisAkhir, b: 206, teks: 'bagi', x: 1000, y: 842},
  {id: 'T095', a: 206, b: 209, teks: 'yang', x: 1000, y: 842},
  {id: 'T095', a: 209, b: 223, teks: 'beruntung.', x: 1000, y: 842},
];

export const NarasiIG: React.FC<{f: number; panel?: boolean}> = ({f, panel = false}) => {
  const kata = KATA.find((k) => f >= k.a && f < k.b);
  if (!kata || Boolean(kata.panel) !== panel) return null;
  const e = move(f, kata.a, 3, 'reveal');
  const gaya = panel ? IG_R7.narasi.panel : IG_R7.narasi;
  return <div data-ig-narasi={kata.id} style={{position: 'absolute', left: kata.x, top: kata.y,
    color: gaya.warna, fontFamily: gaya.keluarga, fontWeight: gaya.bobot,
    fontSize: panel ? gaya.ukuran : kata.label ? IG_R7.gratis.label : kata.komentar ? IG_R7.narasi.dekatKomentar : IG_R7.narasi.ukuran,
    letterSpacing: '-0.025em', lineHeight: 1.1, whiteSpace: 'nowrap', textShadow: gaya.bayangan,
    transform: `translate(${kata.label ? '0' : '-50%'}, -50%)`, overflow: 'hidden'}}>
    <div style={{transform: `translateY(${(1 - e) * 110}%)`}}>{kata.teks}</div>
  </div>;
};
