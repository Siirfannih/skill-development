import React from 'react';
import {PP} from './warna';

type NamaIkon = 'bin' | 'file' | 'lock' | 'eye' | 'play' | 'stop' | 'next' | 'prev' | 'in' | 'out' | 'wrench' | 'razor' | 'magnet' | 'link' | 'plus' | 'search' | 'list' | 'grid' | 'trash' | 'home' | 'export' | 'cursor' | 'snap' | 'audio' | 'loop';

export const IkonPremiere: React.FC<{nama: NamaIkon; x?: number; y?: number; ukuran?: number; warna?: string}> = ({nama, x = 0, y = 0, ukuran = 16, warna = PP.redup}) => {
  const bentuk: Record<NamaIkon, React.ReactNode> = {
    bin: <path d="M1.5 4V2.5h5l1.5 2h6.5v9h-13Z"/>,
    file: <><path d="M3 1.5h6.5l3.5 3.6v9.4H3Z"/><path d="M9.5 1.5v4H13M5.3 9h5.2M5.3 11.5h4"/></>,
    lock: <><rect x="4.2" y="7" width="7.6" height="7" rx=".7"/><path d="M5.5 7V4.6a2.5 2.5 0 0 1 5 0V7"/></>,
    eye: <><path d="M1.2 8s2.4-4 6.8-4 6.8 4 6.8 4-2.4 4-6.8 4-6.8-4-6.8-4Z"/><circle cx="8" cy="8" r="2"/></>,
    play: <path fill={warna} stroke="none" d="m4.5 2 9 6-9 6Z"/>,
    stop: <rect x="4" y="4" width="8" height="8" fill={warna} stroke="none"/>,
    next: <><path d="m4 4 6 4-6 4ZM12 3v10"/></>,
    prev: <><path d="m12 4-6 4 6 4ZM4 3v10"/></>,
    in: <path d="M9 2H5v12h4M2 8h11m-3-3 3 3-3 3"/>,
    out: <path d="M7 2h4v12H7M3 8h11M6 5 3 8l3 3"/>,
    wrench: <path d="M10 1.5a4 4 0 0 0-4.3 5.4L1.7 11a2.2 2.2 0 0 0 3.1 3.1L9 10a4 4 0 0 0 5.5-4.2L12 8l-3-3Z"/>,
    razor: <><path d="m4 1 10 10-3 3L1 4Z"/><path d="m5 5 5 5M4 7l3-3M9 12l3-3"/></>,
    magnet: <><path d="M3 2v7a5 5 0 0 0 10 0V2h-3v7a2 2 0 0 1-4 0V2Z"/><path d="M3 5h3m4 0h3"/></>,
    link: <><path d="m7 4 1.7-1.7a3.5 3.5 0 0 1 5 5L12 9M4 7 2.3 8.7a3.5 3.5 0 0 0 5 5L9 12M5.5 10.5l5-5"/></>,
    plus: <path d="M8 2v12M2 8h12"/>,
    search: <><circle cx="6.5" cy="6.5" r="4.5"/><path d="m10 10 4 4"/></>,
    list: <path d="M2 3h1m3 0h8M2 8h1m3 0h8M2 13h1m3 0h8"/>,
    grid: <>{[2, 9].flatMap((xx) => [2, 9].map((yy) => <rect key={`${xx}-${yy}`} x={xx} y={yy} width="5" height="5"/>))}</>,
    trash: <><path d="M2 4h12M6 2h4M4 4l1 10h6l1-10M7 6v5m2-5v5"/></>,
    home: <path d="m1 7 7-6 7 6M3 6v8h4V9h3v5h3V6"/>,
    export: <><path d="M3 8v6h10V8M8 11V1M5 4l3-3 3 3"/></>,
    cursor: <path d="m3 1 9 8-4 .5 2.5 4-2 1L6 10l-3 3Z"/>,
    snap: <><path d="M1 3h5v10H1m14-10h-5v10h5M8 1v14"/></>,
    audio: <><path d="M2 6h3l4-4v12l-4-4H2ZM12 5a5 5 0 0 1 0 6m2-8a8 8 0 0 1 0 10"/></>,
    loop: <><path d="M3 6a5 5 0 0 1 9-2l2 2M14 2v4h-4M13 10a5 5 0 0 1-9 2l-2-2M2 14v-4h4"/></>,
  };
  return <svg x={x} y={y} width={ukuran} height={ukuran} viewBox="0 0 16 16" fill="none" stroke={warna} strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{bentuk[nama]}</svg>;
};
