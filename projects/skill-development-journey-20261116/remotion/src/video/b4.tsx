// B4 · kartu paket (versi papan Opus B4 yang disetujui): kartu ChatGPT (logo, "Pro", 20x) dan kartu Claude ("Max", 5x) — nama paket asli di UI (Lantai D20) —
// mendarat di sisi bahu kosong (kanan) tepat di "20 kali" / "5 kali"; angka naik 1 → target SETELAH mendarat. Tanpa garis tepi, bayangan lembut,
// miring 3D halus. Translasi masuk (dari kiri frame) dikerjakan lego (gerak, kurva land); di sini rotasi, skala, angka, blur arah.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {siClaude} from 'simple-icons';
import {CURVE, drift, move} from '../lib/curves';
import {Fonts} from './bersama/Fonts';
import {FONT, INK} from './bersama/tema';
import {BAYANG_JENDELA, Titik} from './bersama/Jendela';

export type KartuProps = {
  model: 'chatgpt' | 'claude'; label: string; angka: number; durasi: number;
  /** detik: lama terbang (lego.gerak) dan jarak px, untuk blur arah */
  terbang: number; jarak: number;
  /** kartu di sisi kanan frame: miring dicerminkan supaya menghadap pembicara */
  kanan?: boolean;
};
export const KARTU = {w: 460, h: 400, margin: 90};

const Knot: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="-50 -50 100 100" fill="none" stroke="#0D0D0D" strokeWidth={6.4} strokeLinejoin="round">
    {[0, 1, 2, 3, 4, 5].map((k) => <g key={k} transform={`rotate(${k * 60})`}><rect x={-12.5} y={-45} width={25} height={52} rx={12.5}/></g>)}
  </svg>
);

export const Kartu: React.FC<KartuProps> = (p) => {
  const f = useCurrentFrame();
  const fl = Math.round(p.terbang * 30);
  const land = move(f, 0, fl, 'land');
  const kec = Math.abs(CURVE.land(Math.min(1, f / fl)) - CURVE.land(Math.min(1, Math.max(0, (f - 1) / fl)))) * p.jarak;     // px/frame
  const claude = p.model === 'claude';
  const cermin = p.kanan ? -1 : 1;
  const rot = cermin * ((claude ? 4 : -3) * (1 - land) + (claude ? 3 : -3.5) * land);
  const rotY = cermin * ((claude ? -6 : 7) * land + (claude ? 0 : -3) * (1 - land));
  const tekan = move(f, fl, 6, 'land') - move(f, fl + 6, 14, 'heavy');
  const naik = f < fl + 4 ? 1 : Math.round(1 + (p.angka - 1) * move(f, fl + 4, 22, 'reveal'));
  const d = drift(f, 30, 3, claude ? 5 : 3);
  const pulse = 0.07 * (move(f, fl + 26, 5, 'land') - move(f, fl + 31, 14, 'drift'));
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <svg width="0" height="0" style={{position: 'absolute'}}><filter id="arah" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={`${Math.min(14, kec * 0.45)} 0`}/></filter></svg>
    <div style={{position: 'absolute', left: KARTU.margin + d.x, top: KARTU.margin + d.y, width: KARTU.w, height: KARTU.h, filter: kec > 1.5 ? 'url(#arah)' : undefined,
      transform: `perspective(1400px) rotateY(${rotY}deg) rotateZ(${rot}deg) scale(${1 - 0.02 * tekan})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: '#FFFFFF', boxShadow: BAYANG_JENDELA, overflow: 'hidden', color: INK, fontFamily: FONT.inter}}>
        <div style={{height: 28, display: 'flex', alignItems: 'center', padding: '0 14px', background: '#F4F4F1'}}><Titik/></div>
        <div style={{padding: '28px 34px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, height: 57}}>
            {claude ? <svg width="56" height="56" viewBox="0 0 24 24"><path d={siClaude.path} fill="#D97757"/></svg> : <Knot s={56}/>}
            <span style={{fontSize: 33, fontWeight: 700, whiteSpace: 'nowrap'}}>{p.label}</span>
          </div>
          <div style={{fontSize: 172, fontWeight: 700, lineHeight: 1.2, letterSpacing: -9, marginTop: 14, color: INK, transform: `scale(${1 + pulse})`, transformOrigin: '0 60%'}}>
            {naik}<span style={{fontSize: 112, letterSpacing: -4}}>×</span></div>
        </div>
      </div>
    </div>
  </AbsoluteFill>;
};
