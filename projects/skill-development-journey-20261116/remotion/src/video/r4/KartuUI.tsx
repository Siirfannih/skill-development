// B4 · kartu paket (versi papan Opus B4 yang disetujui): kartu ChatGPT (logo, "Pro", 20x) dan kartu Claude ("Max", 5x) — nama paket asli di UI (Lantai D20) —
// mendarat di sisi bahu kosong (kanan) tepat di "20 kali" / "5 kali"; angka naik 1 → target SETELAH mendarat. Tanpa garis tepi, bayangan lembut,
// miring 3D halus. Translasi masuk (dari kiri frame) dikerjakan lego (gerak, kurva land); di sini rotasi, skala, angka, blur arah.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {siClaude} from 'simple-icons';
import {CURVE, drift, move} from '../../lib/curves';
import {Fonts} from '../bersama/Fonts';
import {LogoChatGPT} from '../bersama/LogoChatGPT';
import {FONT} from '../bersama/tema';
import {active, Glass, Phrase, type Cue} from './UIWords';

export type KartuProps = {
  model: 'chatgpt' | 'claude'; label: string; angka: number; durasi: number; t0: number; numberT0: number; cue: Cue; extra?: Cue;
  /** detik: lama terbang (lego.gerak) dan jarak px, untuk blur arah */
  terbang: number; jarak: number;
  /** kartu di sisi kanan frame: miring dicerminkan supaya menghadap pembicara */
  kanan?: boolean;
};
export const KARTU = {w: 460, h: 400, margin: 90};

export const KartuUI: React.FC<KartuProps> = (p) => {
  const f = useCurrentFrame();
  const t = p.t0 + f / 30;
  const fn = (t - p.numberT0) * 30;
  const fl = Math.round(p.terbang * 30);
  const land = move(f, 0, fl, 'land');
  const kec = Math.abs(CURVE.land(Math.min(1, f / fl)) - CURVE.land(Math.min(1, Math.max(0, (f - 1) / fl)))) * p.jarak;     // px/frame
  const claude = p.model === 'claude';
  const cermin = p.kanan ? -1 : 1;
  const rot = cermin * ((claude ? 4 : -3) * (1 - land) + (claude ? 3 : -3.5) * land);
  const rotY = cermin * ((claude ? -6 : 7) * land + (claude ? 0 : -3) * (1 - land));
  const tekan = move(f, fl, 6, 'land') - move(f, fl + 6, 14, 'heavy');
  const naik = fn < fl + 4 ? 1 : Math.round(1 + (p.angka - 1) * move(fn, fl + 4, 22, 'reveal'));
  const d = drift(f, 30, 3, claude ? 5 : 3);
  const pulse = 0.07 * (move(f, fl + 26, 5, 'land') - move(f, fl + 31, 14, 'drift'));
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <svg width="0" height="0" style={{position: 'absolute'}}><filter id="arah" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={`${Math.min(14, kec * 0.45)} 0`}/></filter></svg>
    <div style={{position: 'absolute', left: KARTU.margin + d.x, top: KARTU.margin + d.y, width: KARTU.w, height: KARTU.h, filter: kec > 1.5 ? 'url(#arah)' : undefined,
      transform: `perspective(1400px) rotateY(${rotY}deg) rotateZ(${rot}deg) scale(${1 - 0.02 * tekan})`}}>
      {/* REVISI-2 R2-4b: kartu gaya Apple: radius lembut, putih ke abu sangat muda, tipografi Inter rapi, bayangan lembut berlapis, tanpa bar jendela */}
      <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F6F8 100%)', overflow: 'hidden', color: '#1D1D1F', fontFamily: FONT.inter,
        boxShadow: '0 0 0 1px rgba(0,0,0,.04), 0 2px 4px rgba(0,0,0,.05), 0 10px 20px rgba(0,0,0,.08), 0 34px 64px rgba(0,0,0,.16)'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 120, background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,0))'}}/>
        <div style={{padding: '40px 42px'}}>
          <Glass style={{display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', height: 68, borderRadius: 16}}>
            <div style={{width: 44, height: 44, flexShrink: 0, borderRadius: 20, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,.08), 0 6px 14px rgba(0,0,0,.08)'}}>
              {claude ? <svg width="36" height="36" viewBox="0 0 24 24"><path d={siClaude.path} fill="#D97757"/></svg> : <LogoChatGPT size={36}/>}
            </div>
            <Phrase cue={active(p.extra, t) ? p.extra : p.cue} t={t} size={56}/>
          </Glass>
          <div style={{height: 1, background: 'rgba(0,0,0,.07)', margin: '30px 0 8px'}}/>
          <div style={{fontSize: 182, fontWeight: 600, lineHeight: 1.18, letterSpacing: -9, color: '#1D1D1F', transform: `scale(${1 + pulse})`, transformOrigin: '0 60%'}}>
            <span style={{visibility: t >= p.numberT0 + p.terbang ? 'visible' : 'hidden'}}>{naik}<span style={{fontSize: 112, letterSpacing: -4, color: '#86868B', fontWeight: 500}}>×</span></span></div>
        </div>
      </div>
    </div>
  </AbsoluteFill>;
};
