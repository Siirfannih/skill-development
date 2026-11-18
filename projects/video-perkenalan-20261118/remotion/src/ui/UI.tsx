// UI.tsx · UI asli dibangun ulang: kartu postingan IG, jendela macOS berisi tangkapan situs asli, ikon IG.
import React from 'react';
import {Img, staticFile} from 'remotion';
import {F} from '../tema';

export const TILE = {
  iniIrfan: 'ig/tile_01_ini-irfan.png', post02: 'ig/tile_02_post02.png', lebihBaik: 'ig/tile_03_semua-bisa-lebih-baik.png', putih: 'ig/tile_04_post04-putih.png',
  bikinProduk: 'ig/tile_05_semua-bikin-produk.png', jualMimpi: 'ig/tile_06_jual-mimpi-ai.png', agencyOs: 'ig/tile_07_ai-agency-os.png', chatgpt: 'ig/tile_08_chatgpt-realita.png',
  habit: 'ig/tile_09_habit-jelek.png', lifeStudent: 'ig/tile_10_life-student-2024.png', kecak: 'ig/tile_11_reel-kecak.png',
};

const Ikon: React.FC<{d: string; size?: number; fill?: string; stroke?: string; sw?: number}> = ({d, size = 44, fill = 'none', stroke = '#0F0F10', sw = 2}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
export const IK = {
  hati: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  komentar: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
  kirim: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z',
  simpan: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z',
  titik: 'M5 12h.01M12 12h.01M19 12h.01',
};

/** Kartu postingan IG (tampilan feed asli): avatar, siirfannih, gambar 4:5, baris ikon. */
export const IGPost: React.FC<{src: string; w: number; style?: React.CSSProperties; namaOpacity?: number}> = ({src, w, style, namaOpacity = 1}) => {
  const k = w / 520;
  return (
    <div style={{width: w, background: '#FFFFFF', borderRadius: 18 * k, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.45), 0 6px 16px rgba(0,0,0,.3)', ...style}}>
      <div style={{height: 76 * k, display: 'flex', alignItems: 'center', gap: 14 * k, padding: `0 ${18 * k}px`}}>
        <div style={{width: 46 * k, height: 46 * k, borderRadius: '50%', padding: 2.5 * k, background: 'linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF)'}}>
          <Img src={staticFile('ig/avatar_raw.png')} style={{width: '100%', height: '100%', borderRadius: '50%', border: `${2.5 * k}px solid #fff`, objectFit: 'cover'}}/>
        </div>
        <div style={{fontFamily: F.inter, fontWeight: 600, fontSize: 25 * k, color: '#0F0F10', flex: 1, opacity: namaOpacity}}>siirfannih</div>
        <Ikon d={IK.titik} size={34 * k} sw={3}/>
      </div>
      <Img src={staticFile(src)} style={{width: w, height: w * (834 / 623), objectFit: 'cover', display: 'block'}}/>
      <div style={{height: 78 * k, display: 'flex', alignItems: 'center', gap: 20 * k, padding: `0 ${18 * k}px`}}>
        <Ikon d={IK.hati} size={40 * k}/><Ikon d={IK.komentar} size={40 * k}/><Ikon d={IK.kirim} size={40 * k}/>
        <div style={{flex: 1}}/><Ikon d={IK.simpan} size={40 * k}/>
      </div>
    </div>
  );
};

export const Titik: React.FC<{d?: number; gap?: number}> = ({d = 13, gap = 9}) => (
  <div style={{display: 'flex', gap}}>{['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{width: d, height: d, borderRadius: d / 2, background: c}}/>)}</div>
);

export const BAYANG_JENDELA = '0 3px 8px rgba(0,0,0,.25), 0 18px 40px rgba(0,0,0,.35), 0 50px 90px rgba(0,0,0,.45)';

/** Jendela macOS berisi tangkapan layar situs asli. url = teks bilah alamat (UI asli). crop = bagian gambar (px sumber). */
export const Jendela: React.FC<{
  src: string; w: number; h: number; url?: string; crop?: {x: number; y: number; w: number; h: number}; srcW?: number; srcH?: number;
  style?: React.CSSProperties; glow?: number; tahap?: number; gelap?: boolean;
}> = ({src, w, h, url, crop, srcW = 2880, srcH = 1800, style, glow = 0, tahap = 1, gelap}) => {
  const bar = Math.round(h * 0.075);
  const cw = crop ?? {x: 0, y: 0, w: srcW, h: srcH};
  const sc = w / cw.w;
  const isi = h - bar;
  const tampilIsi = Math.min(1, Math.max(0, (tahap - 0.33) / 0.67));
  return (
    <div style={{width: w, height: h, borderRadius: 16, overflow: 'hidden', background: gelap ? '#1B1C1F' : '#FFFFFF', position: 'relative',
      boxShadow: `${BAYANG_JENDELA}${glow ? `, 0 0 ${70 * glow}px ${16 * glow}px rgba(56,189,248,${0.35 * glow})` : ''}`, ...style}}>
      <div style={{height: bar, display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px', background: gelap ? '#2A2B2F' : '#F2F2F0', borderBottom: '1px solid rgba(0,0,0,.08)'}}>
        <Titik d={Math.max(8, bar * 0.28)} gap={Math.max(5, bar * 0.18)}/>
        {url ? <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <div style={{background: gelap ? '#1B1C1F' : '#FFFFFF', borderRadius: 8, padding: `${bar * 0.08}px ${bar * 0.5}px`, fontFamily: F.inter, fontWeight: 500,
            fontSize: Math.max(11, bar * 0.36), color: gelap ? '#C9CDD3' : '#3C4043', minWidth: w * 0.36, textAlign: 'center'}}>{url}</div>
        </div> : null}
      </div>
      <div style={{position: 'absolute', left: 0, top: bar, width: w, height: isi, overflow: 'hidden'}}>
        {/* tahap bertahap: bingkai → sidebar → isi */}
        <div style={{position: 'absolute', left: 0, top: 0, width: w * 0.18, height: isi, background: '#F7F7F5', opacity: tahap > 0.33 ? 1 : 0}}/>
        <Img src={staticFile(src)} style={{position: 'absolute', left: -cw.x * sc, top: -cw.y * sc, width: srcW * sc, height: srcH * sc,
          clipPath: `inset(0 ${(1 - tampilIsi) * 100}% 0 0)`}}/>
      </div>
    </div>
  );
};
