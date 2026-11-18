// Kardus.tsx · kardus gaya cut-out (tile_05 "Ketika semua orang bikin produk"): 2D bersih, tutup belakang & depan berengsel,
// selotip di sambungan tutup (terbelah ikut tutup saat dibuka), stempel BELUM / DI-LAUNCHING di sisi depan.
import React from 'react';
import {C, F} from '../tema';

type P = [number, number];
const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const poly = (ps: P[]) => ps.map((p) => p.join(',')).join(' ');

/** tutup: 0 = terbuka, 1 = tertutup. selotip: 0..1 (ditempel). stempel/stempel2: 0..1 (slam). sobek: 0..1 (diabaikan; selotip terbelah oleh tutup). */
export const Kardus: React.FC<{x: number; y: number; w: number; tutup: number; selotip?: number; stempel?: number; stempel2?: number; sobek?: number; children?: React.ReactNode; rot?: number}> =
  ({x, y, w, tutup, selotip = 0, stempel = 0, stempel2 = 0, children, rot = 0}) => {
    const h = w * 0.62, th = w * 0.34, i = w * 0.07;
    const o = 1 - tutup;
    const kayu = '#C89A62', gelap = '#A97C47', terang = '#DDB47E', dalam = '#7A5530';
    const BL: P = [i, 0], BR: P = [w - i, 0], FL: P = [0, th], FR: P = [w, th];
    const ML: P = [i / 2, th / 2], MR: P = [w - i / 2, th / 2];
    // tepi bebas tutup: tertutup → garis tengah; terbuka → belakang berdiri, depan terlipat turun ke depan
    const bE: [P, P] = [lp(ML, [i - w * 0.05, -th * 1.15], o), lp(MR, [w - i + w * 0.05, -th * 1.15], o)];
    const fE: [P, P] = [lp(ML, [-w * 0.05, th + th * 0.55], o), lp(MR, [w + w * 0.05, th + th * 0.55], o)];
    const back: P[] = [BL, BR, bE[1], bE[0]];
    const front: P[] = [FL, FR, fE[1], fE[0]];
    // selotip: strip tengah selebar tw di tiap tutup (terbelah saat tutup terbuka) + turun ke sisi depan
    const tw = 0.11, u0 = 0.5 - tw / 2, u1 = 0.5 + tw / 2;
    const strip = (a: P, b: P, c: P, d: P, k: number): P[] => {
      const s0 = lp(a, b, u0), s1 = lp(a, b, u1), e1 = lp(d, c, u1), e0 = lp(d, c, u0);
      return [s0, s1, lp(s1, e1, k), lp(s0, e0, k)];
    };
    const kAtas = Math.min(1, selotip * 2), kDepan = Math.max(0, selotip * 2 - 1);
    const selotipWarna = 'rgba(238,224,190,.93)';
    const flapBack = (
      <polygon points={poly(back)} fill={o > 0.5 ? 'url(#kd-dalam)' : terang} stroke="rgba(90,60,30,.25)" strokeWidth={1.5}/>
    );
    return (
      <div style={{position: 'absolute', left: x - w / 2, top: y - th - h / 2, width: w, height: h + th, transform: `rotate(${rot}deg)`}}>
        <div style={{position: 'absolute', left: -w * 0.12, top: th + h - 34, width: w * 1.24, height: 90, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(60,45,30,.32) 0%, rgba(60,45,30,0) 70%)'}}/>
        <svg width={w} height={h + th} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <defs>
            <linearGradient id="kd-dalam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9C7244"/><stop offset="1" stopColor={dalam}/></linearGradient>
            <linearGradient id="kd-lubang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A321B"/><stop offset="1" stopColor="#6B4A28"/></linearGradient>
          </defs>
          {o > 0.5 ? flapBack : null}
          <polygon points={poly([BL, BR, FR, FL])} fill="url(#kd-lubang)"/>
        </svg>
        {/* isi kardus: dipotong di tepi depan atas */}
        <div style={{position: 'absolute', left: 0, top: -h * 2.5, width: w, height: h * 2.5 + th + 4, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, bottom: 0, width: w, height: h * 3}}>{children}</div>
        </div>
        <svg width={w} height={h + th} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <defs>
            <linearGradient id="kd-depan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={kayu}/><stop offset="1" stopColor={gelap}/></linearGradient>
            <pattern id="kd-serat" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="2" height="9" fill="rgba(90,60,30,.10)"/></pattern>
          </defs>
          <rect x={0} y={th} width={w} height={h} fill="url(#kd-depan)"/>
          <rect x={0} y={th} width={w} height={h} fill="url(#kd-serat)"/>
          <rect x={0} y={th} width={w} height={6} fill="rgba(255,255,255,.14)"/>
          {o <= 0.5 ? flapBack : null}
          <polygon points={poly(front)} fill={o > 0.5 ? '#B98A55' : terang} stroke="rgba(90,60,30,.25)" strokeWidth={1.5}/>
          {selotip > 0 ? (
            <>
              <polygon points={poly(strip(BL, BR, bE[1], bE[0], kAtas))} fill={selotipWarna}/>
              <polygon points={poly(strip(FL, FR, fE[1], fE[0], kAtas))} fill={selotipWarna}/>
              {kDepan > 0 ? <rect x={w * u0} y={th} width={w * tw} height={h * 0.28 * kDepan} fill={selotipWarna}/> : null}
            </>
          ) : null}
        </svg>
        {stempel > 0 ? (
          <div style={{position: 'absolute', left: w / 2, top: th + h / 2 + 8, transform: `translate(-50%,-50%) rotate(-7deg) scale(${1.6 - 0.6 * Math.min(1, stempel)})`, opacity: Math.min(1, stempel * 3),
            border: `${Math.max(5, w * 0.014)}px solid ${C.merah}`, borderRadius: 12, padding: `${w * 0.018}px ${w * 0.045}px ${w * 0.01}px`, color: C.merah, fontFamily: F.anton, textAlign: 'center', lineHeight: 0.98,
            mixBlendMode: 'multiply', whiteSpace: 'nowrap'}}>
            <div style={{fontSize: w * 0.15}}>BELUM</div>
            <div style={{fontSize: w * 0.085, opacity: stempel2 > 0 ? 1 : 0, transform: `scale(${1.4 - 0.4 * Math.min(1, stempel2)})`}}>DI-LAUNCHING</div>
          </div>
        ) : null}
      </div>
    );
  };
