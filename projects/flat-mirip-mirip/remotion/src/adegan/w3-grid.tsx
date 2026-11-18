import React from 'react';
import {AbsoluteFill, Img, staticFile, useVideoConfig} from 'remotion';
import {BAYANGAN, RADIUS} from '../bersama/tema';
import {HURUF_IG, useHurufIG} from '../bersama/ui-asli/instagram/huruf';
import {UnggahanIG} from '../bersama/ui-asli/instagram/UnggahanIG';
import {IG} from '../bersama/ui-asli/instagram/warna';
import {drift, dur, move, react} from '../lib/curves';

const AKUN = ['ruang.rona', 'nara.studio', 'bentuk.kita', 'titik.temu', 'lini.karya', 'sora.visual', 'arah.baru', 'rakit.cerita'];
const SLOT = [1, 2, 0, 3, 4, 5, 6, 7];
const MEDIA = 'media/aset-slop/k1-01.png';
const TINGGI = 44 + 491.25;

const UnggahanW3: React.FC<{akun: string; seed: number; lebar: number}> = ({akun, seed, lebar}) => (
  <svg width={lebar} height={lebar * TINGGI / 393} viewBox={`0 0 393 ${TINGGI}`}
    fill={IG.tinta} fontFamily={HURUF_IG} style={{display: 'block', overflow: 'hidden', borderRadius: RADIUS.ubin, boxShadow: BAYANGAN.ubin}}
    aria-label={`Unggahan akun fiktif ${akun}, gambar yang sama`}>
    <UnggahanIG data={{akun, avatarSeed: seed, suka: '', caption: '', media:
      <Img src={staticFile(MEDIA)} style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover'}}/>,
    }}/>
  </svg>
);

export const DuniaGridW3: React.FC<{
  frame: number;
  bukaPada?: number;
  opasitasBaris?: readonly [number, number];
  children?: React.ReactNode;
}> = ({frame, bukaPada, opasitasBaris = [1, 1], children}) => {
  useHurufIG();
  const {fps, width, height} = useVideoConfig();
  const lebar = width * 7 / 48;
  const celah = width * 5 / 96;
  const tepi = (width - (lebar * 4 + celah * 3)) / 2;
  const yBaris = [height * 11 / 180, height * 211 / 360];
  const masuk = dur(height * .6, fps, .85);
  const rapat = dur(width * .22, fps, 1.25);
  const pull = bukaPada === undefined ? 1 : move(frame, bukaPada, rapat, 'heavy');
  const gerak = drift(frame, fps, 2.5, 3);
  const skala = 1 + .004 * Math.sin(frame / fps * .23) + (1 - pull) * .025;
  const posisi = (n: number, f: number) => {
    const slot = SLOT[n];
    const baris = Math.floor(slot / 4);
    const x = tepi + (slot % 4) * (lebar + celah);
    const y = yBaris[baris];
    if (bukaPada === undefined) return {x, y, w: lebar, mulai: -Infinity};
    if (n < 2) {
      const naik = move(f, bukaPada, rapat, 'land');
      const geser = move(f, bukaPada, rapat, 'heavy');
      const wAwal = lebar * 1.55;
      const xAwal = n === 0 ? width * .09 : width * .91 - wAwal;
      return {x: xAwal + (x - xAwal) * geser, y: height * .2 + (y - height * .2) * naik,
        w: wAwal + (lebar - wAwal) * naik, mulai: -Infinity};
    }
    const mulai = bukaPada + react(n - 2, fps);
    const p = move(f, mulai, masuk, 'land');
    const asalY = baris === 0 ? -lebar * TINGGI / 393 : height;
    return {x, y: asalY + (y - asalY) * p, w: lebar, mulai};
  };
  return <AbsoluteFill data-w3-grid style={{transform: `translate(${gerak.x}px, ${gerak.y}px) scale(${skala})`}}>
    {AKUN.map((akun, n) => {
      const p = posisi(n, frame);
      if (frame < p.mulai) return null;
      const sebelum = posisi(n, frame - 1);
      const blur = Math.min(16, Math.hypot(p.x - sebelum.x, p.y - sebelum.y) * .1);
      const baris = Math.floor(SLOT[n] / 4);
      return <div key={akun} data-w3-akun={akun} data-w3-baris={baris}
        style={{position: 'absolute', left: p.x, top: p.y, opacity: opasitasBaris[baris], filter: `blur(${blur}px)`}}>
        <UnggahanW3 akun={akun} seed={n} lebar={p.w}/>
      </div>;
    })}
    {children}
  </AbsoluteFill>;
};
