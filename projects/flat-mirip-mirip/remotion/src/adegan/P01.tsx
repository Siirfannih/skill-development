import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {KataKecil} from '../bersama/KataKecil';
import {KataTekan} from '../bersama/KataTekan';
import {BAYANGAN, JARAK, NETRAL, RADIUS} from '../bersama/tema';
import {frameDariDetik} from '../bersama/waktu';
import {dur, move, react} from '../lib/curves';
import {KanvasW1, useAdeganW1} from './w1-waktu';

// Jejak P13 memakai geometri yang sama, termasuk pusat dan kemiringan sumbunya.
export const SUMBU_ORBIT = {x: 0.5, y: 0.5, rx: 0.355, ry: 0.285, sudut: -9};

export const JejakOrbit: React.FC<{durasi: number}> = ({durasi}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const sudut = SUMBU_ORBIT.sudut + 0.8 * move(frame, 0, Math.max(1, durasi - 1), 'drift');
  return <svg data-jejak-orbit width={width} height={height} style={{position: 'absolute', inset: 0}}>
    <ellipse cx={width * SUMBU_ORBIT.x} cy={height * SUMBU_ORBIT.y}
      rx={width * SUMBU_ORBIT.rx} ry={height * SUMBU_ORBIT.ry}
      transform={`rotate(${sudut} ${width * SUMBU_ORBIT.x} ${height * SUMBU_ORBIT.y})`}
      fill="none" stroke={NETRAL.garis} strokeWidth={JARAK.s / 10}/>
  </svg>;
};

const GAMBAR = ['k1-01', 'k1-02', 'k1-03', 'k1-04', 'k1-05', 'k1-06', 'k2-01', 'k2-02'];

const Orbit: React.FC = () => {
  const {frame, fps, width, height, durasi, cari} = useAdeganW1('P01');
  const flat = cari('flat');
  const pertanyaan = cari('mirip-mirip?');
  const mulai = frameDariDetik(flat.mulai, fps);
  const rapatPada = frameDariDetik(pertanyaan.mulai, fps);
  const akhir = durasi - 1;
  const sapuPada = Math.round(rapatPada + (akhir - rapatPada) * 0.64);
  const lebar = width * 0.086;
  const tinggi = lebar * 5 / 4;
  const masuk = Math.min(dur(height * 0.5, fps, 0.35), Math.max(2, rapatPada - mulai));
  const jedaReaksi = Math.min(0.2, Math.max(0.05, (rapatPada - mulai - masuk) / react(GAMBAR.length - 1, fps)));

  const posisiOrbit = (waktu: number, urutan: number) => {
    const merapat = move(waktu, rapatPada, Math.max(1, sapuPada - rapatPada), 'heavy');
    const pusaran = Math.max(0, waktu - rapatPada) / Math.max(1, sapuPada - rapatPada);
    const sudut = urutan / GAMBAR.length * Math.PI * 2 - 0.3
      + Math.max(0, waktu - mulai) / fps * 0.3 + pusaran * pusaran * Math.PI * 1.45;
    const sumbu = (SUMBU_ORBIT.sudut + 0.8 * move(waktu, 0, akhir, 'drift')) * Math.PI / 180;
    const x = width * SUMBU_ORBIT.rx * Math.cos(sudut) * (1 - 0.24 * merapat);
    const y = height * SUMBU_ORBIT.ry * Math.sin(sudut) * (1 - 0.24 * merapat);
    const datang = move(waktu, mulai + react(urutan, fps, jedaReaksi), masuk, 'land');
    return {
      x: width * SUMBU_ORBIT.x + (x * Math.cos(sumbu) - y * Math.sin(sumbu)) * (1.55 - 0.55 * datang),
      y: height * SUMBU_ORBIT.y + (x * Math.sin(sumbu) + y * Math.cos(sumbu)) * (1.55 - 0.55 * datang),
      skala: 0.9 + 0.18 * Math.sin(sudut), putar: SUMBU_ORBIT.sudut + 7 * Math.cos(sudut),
      dekat: Math.sin(sudut),
    };
  };
  const terdekat = GAMBAR.map((_, urutan) => ({urutan, z: posisiOrbit(sapuPada, urutan).dekat}))
    .sort((a, b) => b.z - a.z)[0].urutan;

  const posisi = (waktu: number, urutan: number) => {
    const dasar = posisiOrbit(waktu, urutan);
    if (urutan !== terdekat || waktu <= sapuPada) return dasar;
    const sapu = move(waktu, sapuPada, Math.max(1, akhir - sapuPada), 'heavy');
    const asal = posisiOrbit(sapuPada, urutan);
    const tutupLayar = Math.max(width / lebar, height / tinggi) * 1.18;
    return {...dasar,
      x: asal.x + (width / 2 - asal.x) * sapu,
      y: asal.y + (height / 2 - asal.y) * sapu,
      skala: asal.skala + (tutupLayar - asal.skala) * sapu,
      putar: asal.putar * (1 - sapu),
    };
  };

  if (frame < mulai) return null;
  return <AbsoluteFill data-orbit-kartu>
    {GAMBAR.map((gambar, urutan) => {
      if (frame < mulai + react(urutan, fps, jedaReaksi)) return null;
      const kini = posisi(frame, urutan);
      const lalu = posisi(frame - 0.5, urutan);
      const dx = kini.x - lalu.x;
      const dy = kini.y - lalu.y;
      const arah = Math.atan2(dy, dx) * 180 / Math.PI;
      const laju = Math.hypot(dx, dy) + Math.abs(kini.skala - lalu.skala) * lebar;
      const blur = Math.min(JARAK.m, Math.max(0, laju - 3) * 0.4) / kini.skala;
      const filterId = `w1-laju-${gambar}`;
      const menyapu = urutan === terdekat && frame > sapuPada;
      return <React.Fragment key={gambar}>
        <svg width={0} height={0} style={{position: 'absolute'}}><defs>
          <filter id={filterId} x="-70%" y="-70%" width="240%" height="240%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${blur} 0`}/>
          </filter>
        </defs></svg>
        <div data-kartu-orbit={gambar} data-sapu={menyapu || undefined}
        style={{position: 'absolute', left: kini.x, top: kini.y,
          width: lebar, height: tinggi, zIndex: menyapu ? 100 : Math.round(20 + kini.dekat * 10),
          transform: `translate(-50%, -50%) rotate(${arah}deg) scale(${kini.skala})`,
          filter: `url(#${filterId})`}}>
          <div style={{width: '100%', height: '100%', padding: JARAK.s / 2, boxSizing: 'border-box',
            backgroundColor: NETRAL.putih, borderRadius: RADIUS.kartu / 2,
            boxShadow: BAYANGAN.kartu, transform: `rotate(${kini.putar - arah}deg)`}}>
            <Img src={staticFile(`media/aset-slop/${gambar}.png`)}
              style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover',
                borderRadius: RADIUS.kartu / 4}}/>
          </div>
        </div>
      </React.Fragment>;
    })}
  </AbsoluteFill>;
};

export const P01: React.FC = () => {
  const {frame, fps, durasi, aktif, cari, keKomposisi} = useAdeganW1('P01');
  const flat = cari('flat');
  const dan = cari('dan');
  const sedangFlat = frame >= frameDariDetik(flat.mulai, fps) && frame < frameDariDetik(dan.mulai, fps);
  return <KanvasW1 durasi={durasi}>
    <JejakOrbit durasi={durasi}/>
    <AbsoluteFill data-w1-teks>
      {sedangFlat ? <KataTekan kata={keKomposisi([flat], dan.mulai)[0]}/>
        : <KataKecil kata={keKomposisi(aktif.filter((k) => k.t !== 'flat'))}/>}
    </AbsoluteFill>
    <Orbit/>
  </KanvasW1>;
};
