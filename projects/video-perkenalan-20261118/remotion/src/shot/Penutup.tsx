// Penutup.tsx · #23 kanvas scrapbook "hai!" → polaroid jadi avatar → profil IG siirfannih (mobile, dibangun ulang) → Follow → ULANGI → menyelam ke tile.
import React from 'react';
import {Img, Sequence, staticFile} from 'remotion';
import {ease, lerp, track} from '../anim';
import {Blok, Hero, kata, useG, Narasi} from '../kt/KT';
import {TILE} from '../ui/UI';
import {C, F} from '../tema';

// Tata letak profil (px layar akhir, s = 1). Pita KT kosong y 200–420.
const AV = {cx: 175, cy: 600, d: 220};
const FOLLOW = {x: 50, y: 1060, w: 440, h: 84};
const GRID = {y: 1460, gap: 4};
const TW = (1080 - 2 * GRID.gap) / 3, TH_ = TW * (834 / 623);
const tileXY = (i: number) => ({x: (i % 3) * (TW + GRID.gap), y: GRID.y + Math.floor(i / 3) * (TH_ + GRID.gap)});
const URUT = [TILE.iniIrfan, TILE.post02, TILE.lebihBaik, TILE.putih, TILE.bikinProduk, TILE.jualMimpi];
const HL = ['A Wisdom 👑', 'Journey', 'Random', 'Pengabdian', '🎧', 'LAB CHALL...'];

const teks = (size: number, w = 400, warna = '#0F0F10'): React.CSSProperties => ({fontFamily: F.inter, fontSize: size, fontWeight: w, color: warna, whiteSpace: 'nowrap', position: 'absolute'});

const Kursor: React.FC<{x: number; y: number; tekan: number}> = ({x, y, tekan}) => (
  <svg width={64} height={88} viewBox="0 0 16 22" style={{position: 'absolute', left: x, top: y, transform: `scale(${1 - 0.08 * tekan})`, transformOrigin: '0 0', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.35))'}}>
    <path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z" fill="#0F0F10" stroke="#FFFFFF" strokeWidth={1.4} strokeLinejoin="round"/>
  </svg>
);

export const S23: React.FC = () => {
  const g = useG();
  if (g < 1843) return null;
  // grid kanvas menggambar diri f1843–1853
  const garis = ease(g, 1843, 1853, 'heavy');
  const ui = ease(g, 1879, 1890, 'heavy');
  // polaroid jatuh f1865 di (540,1150) lebar foto 400
  const jatuh = ease(g, 1862, 1868, 'land');
  const POL = {x: 540, y: 1180, d: 400};
  // kamera mundur f1876–1906: avatar dari posisi polaroid ke posisi profil
  const S0 = POL.d / AV.d;
  const mundur = ease(g, 1876, 1906, 'heavy');
  let s = lerp(S0, 1, mundur), tx = lerp(POL.x - AV.cx, 0, mundur), ty = lerp(POL.y - AV.cy, 0, mundur);
  let ox = AV.cx, oy = AV.cy;
  // menyelam ke tile "Ini Irfan" f1992–2006
  const t0 = tileXY(0);
  const selam = ease(g, 1992, 2006, 'heavy');
  if (g >= 1992) { ox = t0.x + TW / 2; oy = t0.y + TH_ / 2; s = lerp(1, 5.5, selam); tx = lerp(0, 540 - ox, selam); ty = lerp(0, 960 - oy, selam); }
  const rot = lerp(-7, 0, mundur);
  const radius = lerp(4, 50, ease(g, 1876, 1888, 'heavy'));
  const bingkai = 1 - ease(g, 1876, 1884, 'leave');
  // kursor
  const kMasuk = ease(g, 1938, 1962, 'land');
  const tujuan = {x: FOLLOW.x + FOLLOW.w * 0.6, y: FOLLOW.y + FOLLOW.h * 0.5};
  const kx = lerp(1150, tujuan.x, kMasuk) + Math.sin(g / 9) * 2 * (1 - kMasuk), ky = lerp(1900, tujuan.y, kMasuk);
  const hover = g >= 1975 && g < 1981 ? 1 : 0;
  const tekan = g >= 1981 && g < 1985 ? 1 - ease(g, 1981, 1985, 'land') * 0 : 0;
  const tekanS = g >= 1981 && g < 1985 ? lerp(0.96, 1, ease(g, 1982, 1985, 'land')) : 1;
  const following = g >= 1981;
  const bloom = ease(g, 1999, 2006, 'reveal');
  return (
    <Sequence from={1843} durationInFrames={163} layout="none">
      <div style={{position: 'absolute', inset: 0, background: C.kanvas}}/>
      {/* garis grid kanvas (3 kolom) */}
      <div style={{position: 'absolute', inset: 0, opacity: 1 - ui}}>
        {[TW + 2, 2 * TW + 6].map((x, i) => <div key={i} style={{position: 'absolute', left: x, top: 0, width: 2, height: 1920 * garis, background: C.grid}}/>)}
        {[640, 1280].map((y, i) => <div key={i} style={{position: 'absolute', left: 0, top: y, height: 2, width: 1080 * garis, background: C.grid}}/>)}
      </div>
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${ox}px ${oy}px`, transform: `translate(${tx}px, ${ty}px) scale(${s})`}}>
        {/* ---- profil IG mobile (tampilan pengunjung) ---- */}
        <div style={{position: 'absolute', inset: 0, opacity: ui}}>
          <div style={{position: 'absolute', left: 0, top: 430, width: 1080, height: 1490, background: '#FFFFFF'}}/>
          <svg width={40} height={40} viewBox="0 0 24 24" style={{position: 'absolute', left: 36, top: 448}}><path d="M15 4 7 12l8 8" fill="none" stroke="#0F0F10" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{...teks(40, 700), left: 100, top: 444}}>siirfannih</div>
          <svg width={44} height={44} viewBox="0 0 24 24" style={{position: 'absolute', left: 900, top: 446}}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" fill="none" stroke="#0F0F10" strokeWidth={2} strokeLinecap="round"/></svg>
          <svg width={44} height={44} viewBox="0 0 24 24" style={{position: 'absolute', left: 990, top: 446}}><path d="M5 12h.01M12 12h.01M19 12h.01" fill="none" stroke="#0F0F10" strokeWidth={3.2} strokeLinecap="round"/></svg>
          {[['11', 'posts'], ['2,842', 'followers'], ['1,098', 'following']].map(([n, l], i) => (
            <div key={l} style={{position: 'absolute', left: 360 + i * 230, top: 548, width: 220, textAlign: 'center', fontFamily: F.inter}}>
              <div style={{fontSize: 42, fontWeight: 700, color: '#0F0F10'}}>{n}</div>
              <div style={{fontSize: 32, fontWeight: 400, color: '#0F0F10', marginTop: 2}}>{l}</div>
            </div>
          ))}
          <div style={{...teks(34, 700), left: 50, top: 750}}>I Gede Irfan - Life Student</div>
          <div style={{...teks(32), left: 50, top: 800, whiteSpace: 'normal', width: 980, lineHeight: 1.3}}>Nothing special, just someone who happens to love learning<br/>Take the good, leave the bad ✨</div>
          <div style={{position: 'absolute', left: 50, top: 935, display: 'flex', alignItems: 'center', gap: 10, background: '#EFEFEF', borderRadius: 40, padding: '8px 22px'}}>
            <span style={{fontFamily: F.inter, fontWeight: 700, fontSize: 30}}>@</span><span style={{fontFamily: F.inter, fontWeight: 600, fontSize: 28}}>siirfannih</span>
          </div>
          {/* tombol */}
          <div style={{position: 'absolute', left: FOLLOW.x, top: FOLLOW.y, width: FOLLOW.w, height: FOLLOW.h, borderRadius: 18, transform: `scale(${tekanS})`,
            background: following ? C.igAbu : C.igBiru, filter: hover ? 'brightness(.88)' : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: F.inter, fontWeight: 600, fontSize: 34, color: following ? '#0F0F10' : '#FFFFFF'}}>{following ? 'Following ⌄' : 'Follow'}</div>
          <div style={{position: 'absolute', left: FOLLOW.x + FOLLOW.w + 14, top: FOLLOW.y, width: 440, height: FOLLOW.h, borderRadius: 18, background: C.igAbu, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: F.inter, fontWeight: 600, fontSize: 34, color: '#0F0F10'}}>Message</div>
          <div style={{position: 'absolute', left: FOLLOW.x + 2 * FOLLOW.w + 28, top: FOLLOW.y, width: 980 - 2 * FOLLOW.w - 28, height: FOLLOW.h, borderRadius: 18, background: C.igAbu, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width={40} height={40} viewBox="0 0 24 24"><path d="M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6" fill="none" stroke="#0F0F10" strokeWidth={2} strokeLinecap="round"/></svg>
          </div>
          {/* highlight */}
          {HL.map((l, i) => (
            <div key={l} style={{position: 'absolute', left: 40 + i * 172, top: 1185, width: 150, textAlign: 'center'}}>
              <div style={{width: 140, height: 140, margin: '0 auto', borderRadius: '50%', border: '2px solid #DBDBDB', padding: 6}}>
                <Img src={staticFile(`ig/hl_${i}.png`)} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}}/>
              </div>
              <div style={{fontFamily: F.inter, fontSize: 25, color: '#0F0F10', marginTop: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{l}</div>
            </div>
          ))}
          {/* tab */}
          <div style={{position: 'absolute', left: 0, top: GRID.y - 84, width: 1080, height: 80, borderBottom: '1px solid #DBDBDB'}}>
            <div style={{position: 'absolute', left: 0, bottom: -1, width: 360, height: 3, background: '#0F0F10'}}/>
            {[0, 1, 2].map((i) => (
              <svg key={i} width={44} height={44} viewBox="0 0 24 24" style={{position: 'absolute', left: 158 + i * 360, top: 18, opacity: i ? 0.45 : 1}}>
                {i === 0 ? <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" fill="none" stroke="#0F0F10" strokeWidth={1.8}/> : i === 1 ? <path d="M3 3h18v18H3zM3 8h18M8 3l3 5M14 3l3 5M10 12l5 3-5 3z" fill="none" stroke="#0F0F10" strokeWidth={1.8}/> : <path d="M3 3h18v15h-6l-3 3-3-3H3zM12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M7 16a5 5 0 0 1 10 0" fill="none" stroke="#0F0F10" strokeWidth={1.8}/>}
              </svg>
            ))}
          </div>
          {/* grid tile terisi satu per satu */}
          {URUT.map((src, i) => {
            const f = 1888 + i * 3;
            if (g < f) return null;
            const p = ease(g, f, f + 5, 'land');
            const {x, y} = tileXY(i);
            return <Img key={i} src={staticFile(src)} style={{position: 'absolute', left: x, top: y, width: TW, height: TH_, objectFit: 'cover', transform: `scale(${0.9 + 0.1 * p})`, opacity: p}}/>;
          })}
        </div>
        {/* avatar = foto polaroid (satu objek, bentuk berubah) */}
        {g >= 1862 ? (
          <div style={{position: 'absolute', left: AV.cx, top: AV.cy - (1 - jatuh) * 260 / s, transform: `translate(-50%,-50%) rotate(${rot}deg)`}}>
            <div style={{position: 'absolute', left: -AV.d / 2 - 18, top: -AV.d / 2 - 18, width: AV.d + 36, height: AV.d + 90, background: '#FFFFFF', opacity: bingkai,
              boxShadow: `0 ${10 / s}px ${26 / s}px rgba(0,0,0,${0.22 * bingkai})`}}/>
            {ui > 0 ? <div style={{position: 'absolute', left: -AV.d / 2 - 9, top: -AV.d / 2 - 9, width: AV.d + 18, height: AV.d + 18, borderRadius: '50%', border: '2px solid #DBDBDB', opacity: ui}}/> : null}
            <Img src={staticFile('ig/avatar_raw.png')} style={{position: 'absolute', left: -AV.d / 2, top: -AV.d / 2, width: AV.d, height: AV.d, borderRadius: `${radius}%`, objectFit: 'cover'}}/>
            <div style={{position: 'absolute', left: -9, top: -AV.d / 2 - 30, width: 18, height: 18, borderRadius: 9, background: C.merah, opacity: bingkai, boxShadow: '0 2px 3px rgba(0,0,0,.3)'}}/>
          </div>
        ) : null}
        {following || kMasuk > 0 ? <Kursor x={kx} y={ky} tekan={tekan}/> : null}
      </div>
      {/* hai! + aku irfan (keluar sebelum kamera mundur) */}
      <Hero t="hai!" x={540} y={560} size={330} mulai={1845} darat={1850} font={F.inter} bobot={900} italic glow={false} tema="terang" keluar={1874} spasi={-0.03}>
        <span style={{background: `linear-gradient(100deg, ${C.biru} 10%, ${C.biruMuda} 90%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', padding: '0 0.12em'}}>hai!</span>
      </Hero>
      <Blok k={kata([212, 213], 'R2')} x={540} y={770} al="c" tema="terang" keluar={1876}/>
      {/* narasi ikut transform menyelam (f1992+) supaya terbawa keluar bersama header, tidak menimpanya */}
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${t0.x + TW / 2}px ${t0.y + TH_ / 2}px`,
        transform: g >= 1992 ? `translate(${lerp(0, 540 - t0.x - TW / 2, selam)}px, ${lerp(0, 960 - t0.y - TH_ / 2, selam)}px) scale(${lerp(1, 5.5, selam)})` : undefined}}>
        <Narasi tema="terang" items={[{k: kata([214, 215])}, {k: kata([216, 217])}, {k: kata([218, 219])}, {k: kata([220], 'R2')}, {k: kata([221, 222, 223])}, {k: kata([224, 225])}, {k: kata([226, 227, 228])}]}
          slots={[{x: 60, y: 200}, {x: 60, y: 300}]} akhir={1990}/>
      </div>
      <Hero t="ULANGI" x={540} y={1000} size={330} mulai={1987} darat={1992} mode="slam" tema="terang" warna={C.hitam} glow={false}/>
      <Blok k={kata([230])} x={540} y={1200} al="c" tema="terang"/>
      <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', opacity: bloom}}/>
    </Sequence>
  );
};

export {track};
