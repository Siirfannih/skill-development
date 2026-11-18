// Orbit.tsx · R6-orbit (gaya Zache, §2.1) dan teks di busur (ANXIETY/OVERTHINKING).
// Huruf per huruf 1–1,5 huruf/f, mengorbit dari belakang badan (200°) berlawanan jarum jam lewat atas ke depan,
// pindah lapis di z = 0, lalu mendarat jadi baris lurus. Dirender dua kali: lapis='belakang' (di bawah cutout) dan 'depan'.
import React, {useLayoutEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import {ease, lerp} from '../anim';
import {C, F, GLOW, GLOW_SETENGAH} from '../tema';
import {useG} from './KT';

const cache = new Map<string, number[]>();
/** Lebar tiap huruf (px) pada font-size `fs`, diukur dari font yang sudah dimuat. */
export const useAdvance = (text: string, family: string, weight: number, fs: number, italic = false): number[] => {
  const key = `${text}|${family}|${weight}|${fs}|${italic}`;
  const [handle] = useState(() => (cache.has(key) ? null : delayRender(`adv ${text}`)));
  const [adv, setAdv] = useState<number[]>(() => cache.get(key) ?? text.split('').map(() => fs * 0.5));
  useLayoutEffect(() => {
    if (handle === null) return;
    const font = `${italic ? 'italic ' : ''}${weight} ${fs}px ${family}`;
    document.fonts.load(font).then(() => {
      const c = document.createElement('canvas').getContext('2d');
      if (!c) throw new Error('canvas');
      c.font = font;
      const a = text.split('').map((ch) => c.measureText(ch).width);
      cache.set(key, a); setAdv(a); continueRender(handle);
    }).catch(cancelRender);
  }, [handle, key, text, family, weight, fs, italic]);
  return adv;
};

const rad = (d: number) => (d * Math.PI) / 180;

export type OrbitProps = {
  t: string; cx: number; cy: number; rx: number; ry: number; tilt?: number; mulai: number; darat: number;
  lineX: number; lineY: number; fs: number; lapis: 'belakang' | 'depan'; warna?: string; a0?: number; sapuan?: number;
  stagger?: number; cincin?: boolean; sobek?: number; spasi?: number;
};

/** Posisi huruf: orbit elips miring (θ dari a0, bertambah = berlawanan jarum jam di layar y-ke-bawah: belakang-kiri → atas → kanan → depan). */
export const Orbit: React.FC<OrbitProps> = ({t, cx, cy, rx, ry, tilt = -6, mulai, darat, lineX, lineY, fs, lapis, warna = C.putih, a0 = 200,
  sapuan = 250, stagger = 0.75, cincin = false, sobek, spasi = 0.02}) => {
  const g = useG();
  const adv = useAdvance(t, F.anton, 400, fs);
  if (g < mulai) return null;
  const total = adv.reduce((a, b) => a + b, 0) + spasi * fs * (t.length - 1);
  let acc = -total / 2;
  const n = t.length;
  const durOrbit = Math.max(6, darat - mulai - (n - 1) * stagger);
  const ct = Math.cos(rad(tilt)), st = Math.sin(rad(tilt));
  return (
    <>
      {t.split('').map((ch, i) => {
        const w = adv[i];
        const slot = acc + w / 2; acc += w + spasi * fs;
        const fi = mulai + i * stagger; // motion-ok: huruf satu kata di lintasan orbit yang sama; jeda tetap menjaga jarak antarhuruf agar kata terbaca selama mengorbit
        if (g < fi || ch === ' ') return null;
        // fase orbit 0..1, lalu mendarat (tanpa linear: heavy)
        const u = ease(g, fi, fi + durOrbit, 'heavy');
        let x: number, y: number, z: number, rot = 0, sc = 1;
        if (cincin) {
          // cincin: huruf tersebar rata di elips dan berputar; tetap di cincin (tidak jadi baris lurus)
          const th = rad(a0 + sapuan * u - (i / n) * 360 * 0.92);
          const ex = rx * Math.cos(th), ey = ry * Math.sin(th);
          x = cx + ex * ct - ey * st; y = cy + ex * st + ey * ct; z = Math.sin(th);
          rot = (Math.cos(th) * -14);
          sc = 0.82 + 0.18 * ((z + 1) / 2);
        } else {
          const th = rad(a0 + sapuan * Math.min(1, u / 0.78));
          const ex = rx * Math.cos(th), ey = ry * Math.sin(th);
          const ox = cx + ex * ct - ey * st, oy = cy + ex * st + ey * ct;
          const k = ease(g, fi + durOrbit * 0.62, fi + durOrbit, 'land');
          x = lerp(ox, lineX + slot, k); y = lerp(oy, lineY, k);
          z = k > 0.15 ? 1 : Math.sin(th);
          sc = lerp(0.78 + 0.22 * ((Math.sin(th) + 1) / 2), 1, k);
        }
        const diBelakang = z < 0;
        if ((lapis === 'belakang') !== diBelakang) return null;
        let dy = 0, drot = 0, op = 1;
        if (sobek !== undefined && g >= sobek) {
          const k = g - sobek; const sgn = i % 2 ? 1 : -1;
          dy = k * k * 2.2 + k * 6; drot = sgn * k * (6 + (i % 3) * 3); x += sgn * k * (3 + (i % 4));
          op = Math.max(0, 1 - k / 7);
        }
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y + dy, transform: `translate(-50%,-50%) rotate(${rot + drot}deg) scale(${sc})`,
            fontFamily: F.anton, fontSize: fs, lineHeight: 1, color: warna, opacity: op,
            textShadow: diBelakang ? GLOW_SETENGAH : GLOW, whiteSpace: 'pre'}}>{ch}</div>
        );
      })}
    </>
  );
};

/** Teks di busur lingkaran (pusat cx,cy, radius r, sudut a0→a1 derajat, 0° = kanan, 90° = bawah). Huruf masuk 1,2 huruf/f. */
export const Busur: React.FC<{
  t: string; cx: number; cy: number; r: number; a0: number; a1: number; fs: number; mulai: number; darat: number; warna?: string;
  blur?: number; belakang?: boolean; luar?: boolean;
}> = ({t, cx, cy, r, a0, a1, fs, mulai, darat, warna = C.putih, blur = 0, belakang, luar = true}) => {
  const g = useG();
  const adv = useAdvance(t, F.anton, 400, fs);
  if (g < mulai) return null;
  const n = t.length;
  const total = adv.reduce((a, b) => a + b, 0) * 1.04;
  const span = (total / r) * (180 / Math.PI);
  const mid = (a0 + a1) / 2;
  const dir = a1 >= a0 ? 1 : -1;
  let acc = 0;
  const per = Math.max(0.7, (darat - mulai) / n);
  return (
    <>
      {t.split('').map((ch, i) => {
        const w = adv[i] * 1.04;
        const ang = mid - dir * span / 2 + dir * ((acc + w / 2) / r) * (180 / Math.PI);
        acc += w;
        const fi = mulai + i * per;
        if (g < fi) return null;
        const p = ease(g, fi, fi + 6, 'land');
        const rr = r + (1 - p) * 60;
        const x = cx + rr * Math.cos(rad(ang)), y = cy + rr * Math.sin(rad(ang));
        const rot = ang + (luar ? 90 : -90);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${0.7 + 0.3 * p})`,
            fontFamily: F.anton, fontSize: fs, lineHeight: 1, color: warna, textShadow: belakang ? GLOW_SETENGAH : GLOW,
            filter: blur ? `blur(${blur}px)` : undefined}}>{ch}</div>
        );
      })}
    </>
  );
};
