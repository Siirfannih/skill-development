import React from 'react';
import {IG} from './warna';

export type NamaIkonIG = 'beranda' | 'reels' | 'kirim' | 'cari' | 'hati' | 'komentar' | 'repost' | 'simpan' | 'tambah' | 'titik' | 'sinyal' | 'wifi' | 'baterai' | 'bulan';

export const IkonIG: React.FC<{
  nama: NamaIkonIG;
  x?: number;
  y?: number;
  ukuran?: number;
  aktif?: boolean;
  warna?: string;
  stroke?: number;
}> = ({nama, x = 0, y = 0, ukuran = 24, aktif = false, warna = IG.tinta, stroke = 1.9}) => {
  const bentuk: Record<NamaIkonIG, React.ReactNode> = {
    beranda: aktif ? <path fill={warna} stroke="none" d="M10.45 2.25a2.32 2.32 0 0 1 3.1 0l7.83 6.96c.51.45.8 1.1.8 1.79v9.03a1.97 1.97 0 0 1-1.97 1.97h-5.23a.98.98 0 0 1-.98-.98v-6.04a2 2 0 0 0-4 0v6.04a.98.98 0 0 1-.98.98H3.79a1.97 1.97 0 0 1-1.97-1.97V11c0-.69.29-1.34.8-1.79Z"/> : <path d="m2.4 9.5 8.33-7.3a1.93 1.93 0 0 1 2.54 0l8.33 7.3v10.7c0 .78-.63 1.4-1.4 1.4h-5.15v-6.3a3.05 3.05 0 0 0-6.1 0v6.3H3.8c-.77 0-1.4-.62-1.4-1.4Z"/>,
    reels: <><rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.4"/><path strokeLinejoin="round" d="M9 7.3c0-.5.6-.8 1-.5l7 4.5a.8.8 0 0 1 0 1.4l-7 4.5c-.4.3-1 0-1-.5Z"/></>,
    kirim: <><path d="M3.1 3.6h17.7c1.13 0 1.73 1.25 1.08 2.16L11.14 21.03c-.71 1.01-2.28.76-2.63-.42l-2.15-7.1L1.99 6.04C1.35 4.95 1.98 3.6 3.1 3.6Z"/><path d="m6.36 13.51 9.05-5.89"/></>,
    cari: <><circle cx="10.7" cy="10.7" r="8.4"/><path d="m16.9 16.9 5.1 5.1"/></>,
    hati: <path fill={aktif ? warna : 'none'} d="M20.8 4.6a5.45 5.45 0 0 0-7.72 0L12 5.7l-1.08-1.1a5.46 5.46 0 0 0-7.72 7.72L12 21.1l8.8-8.78a5.46 5.46 0 0 0 0-7.72Z"/>,
    komentar: <path d="M21.7 11.7a9.7 9.7 0 1 0-5.4 8.7l5.5 1.4-1.5-5.3a9.6 9.6 0 0 0 1.4-4.8Z"/>,
    repost: <><path d="M4 13V7.7A2.7 2.7 0 0 1 6.7 5h12.5M15.8 1.9 19.2 5l-3.4 3.2M20 11v5.3a2.7 2.7 0 0 1-2.7 2.7H4.8M8.2 22.1 4.8 19l3.4-3.2"/></>,
    simpan: <path d="M4.2 2.3h15.6v19.4L12 15.3l-7.8 6.4Z"/>,
    tambah: <path d="M12 2.7v18.6M2.7 12h18.6"/>,
    titik: <g fill={warna} stroke="none"><circle cx="4" cy="12" r="1.55"/><circle cx="12" cy="12" r="1.55"/><circle cx="20" cy="12" r="1.55"/></g>,
    sinyal: <g fill={IG.statusRedup} stroke="none">{[0, 1, 2, 3].map((i) => <rect key={i} x={1 + i * 6} y="15" width="4" height="4" rx="1.15"/>)}</g>,
    wifi: <g fill={warna} stroke="none"><path d="M.7 7.4a17.8 17.8 0 0 1 22.6 0l-2.4 2.8a14 14 0 0 0-17.8 0ZM4.9 12.2a11.2 11.2 0 0 1 14.2 0l-2.5 2.9a7.3 7.3 0 0 0-9.2 0ZM9.1 17a4.5 4.5 0 0 1 5.8 0L12 20.3Z"/></g>,
    baterai: <><rect stroke={IG.baterai} strokeWidth="1" x="1" y="6.4" width="20" height="11.2" rx="3"/><path fill={IG.baterai} stroke="none" d="M22 10v4a2.1 2.1 0 0 0 0-4Z"/><rect fill={warna} stroke="none" x="2.6" y="8" width="11.2" height="8" rx="2"/></>,
    bulan: <path fill={warna} stroke="none" d="M9.3 1.7a10.4 10.4 0 1 0 13 13A9.2 9.2 0 0 1 9.3 1.7Z"/>,
  };
  return <svg x={x} y={y} width={ukuran} height={ukuran} viewBox="0 0 24 24" fill="none" stroke={warna} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{bentuk[nama]}</svg>;
};
