// Studio.tsx · dunia MG pengganti plate Omni: Blue Void (lingkaran cyan / bar cahaya) dan White Studio.
// Subjek = cutout RVM footage TH, diletakkan di dunia ini (keputusan Irfan 19 Nov: wajahku di dunia MG).
import React from 'react';
import {Cutout} from '../Plate';
import {useG} from '../kt/KT';
import {C} from '../tema';

/** Latar Blue Void: gelap biru-hitam, kabut, lingkaran cahaya cyan atau bar horizontal. */
export const BlueVoid: React.FC<{lingkaran?: {cx: number; cy: number; r: number; terang?: number; putih?: boolean}; bar?: {y: number; w: number; terang: number}; lantai?: boolean}> = ({lingkaran, bar, lantai}) => {
  const g = useG();
  const haze = 0.5 + 0.08 * Math.sin(g / 23);
  return (
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 90% 70% at 50% 42%, #0B2236 0%, ${C.voidBiru} 45%, ${C.void} 100%)`}}>
      {lingkaran ? (() => {
        const t = lingkaran.terang ?? 1;
        const inti = lingkaran.putih ? 'rgba(225,240,255,1)' : 'rgba(56,189,248,1)';
        return (
          <>
            <div style={{position: 'absolute', left: lingkaran.cx - lingkaran.r * 1.6, top: lingkaran.cy - lingkaran.r * 1.6, width: lingkaran.r * 3.2, height: lingkaran.r * 3.2, borderRadius: '50%',
              background: `radial-gradient(circle, rgba(56,189,248,${0.35 * t}) 0%, rgba(56,189,248,${0.12 * t}) 40%, rgba(56,189,248,0) 70%)`}}/>
            <div style={{position: 'absolute', left: lingkaran.cx - lingkaran.r, top: lingkaran.cy - lingkaran.r, width: lingkaran.r * 2, height: lingkaran.r * 2, borderRadius: '50%', opacity: t,
              background: lingkaran.putih
                ? `radial-gradient(circle, ${inti} 0%, rgba(190,225,255,.96) 55%, rgba(120,190,255,.9) 82%, rgba(56,189,248,.6) 100%)`
                : `radial-gradient(circle, rgba(140,220,255,1) 0%, ${inti} 60%, rgba(14,140,220,1) 100%)`,
              boxShadow: `0 0 80px 20px rgba(56,189,248,${0.45 * t})`}}/>
          </>
        );
      })() : null}
      {bar ? (
        <>
          <div style={{position: 'absolute', left: 540 - bar.w / 2 - 120, top: bar.y - 160, width: bar.w + 240, height: 320, borderRadius: 200,
            background: `radial-gradient(ellipse at center, rgba(120,200,255,${0.4 * bar.terang}) 0%, rgba(56,189,248,0) 70%)`}}/>
          <div style={{position: 'absolute', left: 540 - bar.w / 2, top: bar.y - 22, width: bar.w, height: 44, borderRadius: 8,
            background: `rgba(225,242,255,${0.15 + 0.85 * bar.terang})`, boxShadow: `0 0 60px 18px rgba(120,200,255,${0.6 * bar.terang})`}}/>
        </>
      ) : null}
      {lantai ? <div style={{position: 'absolute', left: 0, right: 0, top: 1480, bottom: 0, background: 'linear-gradient(180deg, rgba(56,189,248,.10) 0%, rgba(5,6,10,0) 60%)'}}/> : null}
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 120% 60% at 50% 70%, rgba(80,140,200,${0.05 * haze}) 0%, rgba(0,0,0,0) 70%)`}}/>
    </div>
  );
};

/** Latar White Studio: seamless abu terang, lantai melengkung lembut. */
export const WhiteStudio: React.FC<{horizon?: number}> = ({horizon = 1380}) => (
  <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, #EEEDEA 0%, ${C.studio} ${(horizon / 1920) * 100 - 8}%, #DDDCD7 ${(horizon / 1920) * 100}%, #E6E5E1 100%)`}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 70%)'}}/>
  </div>
);

/** Subjek cutout di dunia studio. x,y = geser, s = skala (origin pusat kepala footage), siluet = gaya Blue Void dengan rim cyan. */
export const Orang: React.FC<{dari: number; x?: number; y?: number; s?: number; ox?: number; oy?: number; siluet?: number; rim?: string; bayangLantai?: boolean}> =
  ({dari, x = 0, y = 0, s = 1, ox = 600, oy = 900, siluet = 0, rim = '56,189,248', bayangLantai}) => {
    const k = siluet;
    const f = k > 0
      ? `brightness(${1 - 0.62 * k}) saturate(${1 - 0.45 * k}) contrast(${1 + 0.15 * k}) drop-shadow(0 0 2px rgba(${rim},${0.95 * k})) drop-shadow(0 0 10px rgba(${rim},${0.6 * k})) drop-shadow(0 0 34px rgba(${rim},${0.35 * k}))`
      : 'contrast(1.05) saturate(1.03) drop-shadow(0 18px 40px rgba(40,40,50,.22))';
    return (
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${ox}px ${oy}px`, transform: `translate(${x}px, ${y}px) scale(${s})`}}>
        {bayangLantai ? <div style={{position: 'absolute', left: ox - 420, top: 1840, width: 840, height: 140, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(60,60,70,.28) 0%, rgba(60,60,70,0) 70%)'}}/> : null}
        {/* tepi frame footage (kiri, kanan, bawah) memudar agar tidak terlihat potongan lurus di dunia studio */}
        <Cutout dari={dari} style={{filter: f,
          maskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%), linear-gradient(to bottom, #000 72%, transparent 96%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%), linear-gradient(to bottom, #000 72%, transparent 96%)',
          maskComposite: 'intersect', WebkitMaskComposite: 'source-in'} as React.CSSProperties}/>
      </div>
    );
  };
