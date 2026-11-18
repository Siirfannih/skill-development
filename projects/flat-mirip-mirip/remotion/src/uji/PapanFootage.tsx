import React from 'react';
import {AbsoluteFill, Img, interpolateColors, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Kanvas} from '../bersama/Kanvas';
import {KataKecil} from '../bersama/KataKecil';
import {BAYANGAN, HURUF, JARAK, NETRAL, RADIUS, TEKS} from '../bersama/tema';
import type {Kata} from '../bersama/waktu';
import {move} from '../lib/curves';

// Waktu kata mengikuti frame komposisi, termasuk saat dirender di dalam Sequence.
const kata = (t: string, mulai: number, selesai: number): Kata => ({t, mulai: mulai / 30, selesai: selesai / 30});

const TekanFootage: React.FC<{kata: Kata}> = ({kata}) => (
  <AbsoluteFill data-tekan-footage><KataKecil diFootage kata={[kata]} /></AbsoluteFill>
);

const LatarVideo: React.FC<{src: string; gelap: number; durasi: number; saturasi?: number;
  skalaAwal?: number; geserX?: number; asalSkala?: string}> =
  ({src, gelap, durasi, saturasi = 1, skalaAwal = 1, geserX = 0, asalSkala = '50% 50%'}) => {
    const frame = useCurrentFrame();
    const {width} = useVideoConfig();
    const skala = skalaAwal + 0.04 * move(frame, 0, durasi - 1, 'drift');
    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <OffthreadVideo muted src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover',
          transform: `translateX(${width * geserX}px) scale(${skala})`, transformOrigin: asalSkala,
          filter: `saturate(${saturasi})`}} />
        <AbsoluteFill style={{background: `rgba(0,0,0,${gelap})`}} />
      </AbsoluteFill>
    );
  };

const P11: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill data-adegan="P11">
      <LatarVideo src="media/footage/F1/F1-a-mixkit-teh-pelanggan.mp4" gelap={0.52} saturasi={0.6} durasi={48} />
      {frame < 18 ? <KataKecil diFootage kata={[kata('Founder', 0, 18), kata('itu', 8, 18)]} /> : <>
        <AbsoluteFill style={{transform: `translateY(-${HURUF.ukuran.tekan / 2 + JARAK.m}px)`}}>
          <KataKecil diFootage kata={[kata('jualan', 18, 48)]} />
        </AbsoluteFill>
        <TekanFootage kata={kata('kepercayaan,', 28, 48)} />
      </>}
    </AbsoluteFill>
  );
};

const P12: React.FC = () => {
  const frame = useCurrentFrame();
  const lupa = move(frame, 87, 20, 'leave');
  return (
    <AbsoluteFill data-adegan="P12">
      <LatarVideo src="media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4" gelap={0.45} durasi={108}
        skalaAwal={1.38} geserX={0.18 + 0.01 * move(frame, 52, 25, 'drift')} asalSkala="50% 10%" />
      {frame < 51 ? <KataKecil diFootage kata={[
        kata('dan', 48, 75), kata('kita', 54, 75), kata('seringkali', 62, 75),
        kata('lebih', 75, 99), kata('mudah', 82, 99), kata('ingat', 90, 99),
      ]} /> : frame < 78 ? <TekanFootage kata={kata('orangnya,', 99, 126)} /> : <>
        <AbsoluteFill data-lupa-footage style={{
          '--warna-lupa': interpolateColors(lupa, [0, 1], [NETRAL.putih, NETRAL.redup]),
        } as React.CSSProperties}>
          <KataKecil diFootage kata={[kata('bukan', 126, 156), kata('videonya.', 135, 156)]} />
        </AbsoluteFill>
      </>}
    </AbsoluteFill>
  );
};

const P14: React.FC = () => {
  const {width, height} = useVideoConfig();
  const src = staticFile('media/footage/F3/F3-a-wikimedia-keluarga-brown-1910.jpg');
  const lebarFoto = width * 0.46;
  const tinggiFoto = (lebarFoto - RADIUS.kartu * 2) * 1025 / 1280 + RADIUS.kartu * 2;
  const atasFoto = JARAK.aman + RADIUS.kartu;
  const garisKata = atasFoto + tinggiFoto + JARAK.l;
  return (
    <AbsoluteFill data-adegan="P14">
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover',
        filter: `blur(${RADIUS.kartu}px)`, transform: `scale(${1 + RADIUS.kartu * 6 / height})`}} />
      <AbsoluteFill style={{backgroundColor: 'rgba(0,0,0,0.5)'}} />
      <div data-kartu-foto style={{position: 'absolute', left: (width - lebarFoto) / 2,
        top: atasFoto, width: lebarFoto, padding: RADIUS.kartu, boxSizing: 'border-box',
        backgroundColor: NETRAL.putih, transform: 'rotate(-3deg)', boxShadow: BAYANGAN.kartu}}>
        <Img src={src} style={{display: 'block', width: '100%'}} />
      </div>
      <AbsoluteFill style={{transform: `translateY(${garisKata - height * TEKS.garisY}px)`}}>
        <KataKecil diFootage kata={[kata('ceritamu,', 156, 210)]} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const PapanFootage: React.FC = () => (
  <Kanvas>
    <AbsoluteFill data-papan-footage>
      <style>{`
        [data-papan-footage] [data-tekan-footage] [data-baris-kata] {
          font-size: ${HURUF.ukuran.tekan}px !important;
          font-weight: ${HURUF.bobot.tekan} !important;
        }
        [data-papan-footage] [data-tekan-footage] [data-kata] { width: auto !important; }
        [data-papan-footage] [data-tekan-footage] [data-baris-kata] > span { transform: none !important; }
        [data-papan-footage] [data-lupa-footage] [data-baris-kata] { color: var(--warna-lupa) !important; }
        [data-papan-footage] [data-adegan="P12"] [data-baris-kata] { left: 28% !important; column-gap: ${JARAK.l}px !important; }
      `}</style>
      <Sequence from={0} durationInFrames={48}><P11 /></Sequence>
      <Sequence from={48} durationInFrames={108}><P12 /></Sequence>
      <Sequence from={156} durationInFrames={54}><P14 /></Sequence>
    </AbsoluteFill>
  </Kanvas>
);
