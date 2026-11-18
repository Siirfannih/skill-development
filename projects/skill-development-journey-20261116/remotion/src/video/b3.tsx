// B3 · aplikasi Claude (Claude Code) asli, TEMA TERANG (acuan sumber/ref/claude-code-slash-irfan.png) sebagai SATU jendela macOS 56–60 % lebar
// di atas latar terang tajam (MG63-ADENDUM §3). Sidebar sesi, chat dengan satu jawaban teks biasa, kolom ketik, status "Opus".
// "/" diketik → daftar tumbuh dari kolom ketik ke atas; item muncul saat diucapkan; punch kamera 1,55× ke daftar+kolom: item 46 px × 1,55 = 71 px
// (6,6 % tinggi frame); pusat punch (870, 600): kolom ketik (dan tombol kirim) berakhir di x ≤ 1436 layar, di kiri lingkaran wajah; tepi kiri jendela + latar terlihat, daftar+kolom ketik di tengah, narasi R1 tetap di latar di bawah jendela;
// di "ngebalik" item leave bergiliran (4–5 f), daftar menyusut kosong, caret "/" berkedip. Aksen tunggal oranye Claude.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {CURVE, arc, drift, move, react} from '../lib/curves';
import {Fonts} from './bersama/Fonts';
import {Jendela} from './bersama/Jendela';
import {FONT} from './bersama/tema';

export type AppProps = {
  durasi: number;
  /** detik relatif dunia: kursor klik kolom ketik, "/" diketik, "apple" mulai diketik, klik saran 1, backspace mulai, "cinematic" mulai diketik, klik saran 2, hapus semua (ngebalik), keluar */
  kunci: {klik: number; slash: number; apple: number; aKlik: number; bs: number; cine: number; cKlik: number; hapus: number; keluar: number};
};

const AKSEN = '#D97757';
const T = {ink: '#1F1F1E', muted: '#8B8A86', soft: '#F4F3EF', line: '#E6E4DE', sel: '#EDECE8'};
const ink = (s: number, w = 400, c = T.ink): React.CSSProperties => ({fontFamily: FONT.inter, fontSize: s, fontWeight: w, color: c});
const SESI = ['Skill development journey', 'Potong ulang v3', 'Revisi kamera dan still', 'Analisis animasi premium', 'Strategi konten bulan ini', 'Ops-report resources', 'Proposal bisnis toko kue', 'Login Gemini PC server'];
const WIN = {x: 275, y: 190, w: 1140, h: 640};

const Kursor: React.FC<{x: number; y: number; klik: number}> = ({x, y, klik}) => (
  <svg width="34" height="44" viewBox="0 0 46 60" style={{position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 5px 6px rgba(0,0,0,.28))', transform: `scale(${1 - 0.15 * klik})`, transformOrigin: '0 0'}}>
    <path d="M4 3L4 46L15 36L22 53L30 49L23 33L38 33Z" fill="#FFFFFF" stroke="#1F1F1E" strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

const kamera = (t: number, K: AppProps['kunci']) => {
  const keys: [number, number, number, number][] = [[0, 1.0, 960, 540], [K.slash - 0.2, 1.04, 900, 580], [K.apple - 0.3, 1.12, 885, 600], [K.apple + 0.15, 1.55, 870, 600],
    [K.aKlik + 0.3, 1.58, 868, 603], [K.cKlik + 0.2, 1.6, 866, 606], [K.hapus - 0.1, 1.4, 880, 600], [K.hapus + 0.6, 1.12, 900, 600], [K.hapus + 2.0, 1.15, 905, 600], [K.keluar, 1.15, 905, 600]];
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  if (i + 1 >= keys.length) return {s: keys[i][1], x: keys[i][2], y: keys[i][3]};
  const [a, s0, x0, y0] = keys[i], [b, s1, x1, y1] = keys[i + 1];
  const k = ([2, 6].includes(i) ? CURVE.heavy : CURVE.drift)(Math.min(1, Math.max(0, (t - a) / (b - a))));
  return {s: s0 + (s1 - s0) * k, x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k};
};

/** isi kolom ketik pada waktu t: "/" -> "/apple" (diketik) -> klik saran -> "/apple-style" -> backspace per huruf -> "/cinematic" -> klik -> "/cinematic-storytelling" -> backspace semua -> "/" */
const teksKetik = (t: number, K: AppProps['kunci']) => {
  const A = '/apple-style', C = '/cinematic-storytelling';
  if (t < K.slash) return '';
  if (t < K.apple) return '/';
  if (t < K.aKlik + 0.1) return '/' + 'apple'.slice(0, Math.min(5, Math.floor((t - K.apple) * 14) + 1));
  if (t < K.bs) return A;
  if (t < K.cine) return A.slice(0, Math.max(1, A.length - Math.floor((t - K.bs) * 28)));
  if (t < K.cKlik + 0.1) return '/' + 'cinematic'.slice(0, Math.min(9, Math.floor((t - K.cine) * 14) + 1));
  if (t < K.hapus) return C;
  if (t < K.hapus + 0.3) return C.slice(0, Math.max(0, C.length - Math.floor((t - K.hapus) * 90)));
  if (t < K.hapus + 1.5) return PROMPT.slice(0, Math.floor((t - K.hapus - 0.3) / 1.2 * PROMPT.length));
  return '';
};
const PROMPT = 'Bikin video talking head perjalanan bikin skill-development. Gaya premium, penonton ngerasa: oh, begini di baliknya.';

const Isi: React.FC<AppProps & {f: number}> = ({kunci: K, f, durasi}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const F = (s: number) => Math.round(s * fps);
  const masuk = move(f, 0, 16, 'heavy');
  const keluar = move(f, F(K.keluar), F(durasi - K.keluar), 'heavy');
  const cam = kamera(t, K);
  const sc = cam.s * (1 + 0.55 * (1 - masuk) + 0.5 * keluar);
  const dd = drift(f, fps, 3, 4);
  const ketik = f >= F(K.slash);
  const caret = (t >= K.slash && t < K.hapus + 0.6) || Math.floor(f / 15) % 2 === 0;      // kursor menyala tetap hanya saat mengetik/memilih saran (K.slash..hapus+0,6); selain itu berkedip idle (sebelum mengetik dan setelah hapus)
  const isi = teksKetik(t, K);
  // satu saran yang cocok dengan ketikan; tumbuh dari kolom ketik, hilang saat diklik
  const saran = [{teks: '/apple-style', on: K.apple + 0.42, off: K.aKlik + 0.1}, {teks: '/cinematic-storytelling', on: K.cine + 0.64, off: K.cKlik + 0.1}];
  const aktif = saran.findIndex((x) => t >= x.on && t < x.off + 0.1);
  const tumbuh = aktif >= 0 ? move(f, F(saran[aktif].on), 6, 'reveal') * (1 - move(f, F(saran[aktif].off), 5, 'leave')) : 0;
  const baris = 78;
  const kartuH = tumbuh > 0.02 ? 98 : 0;
  // kursor: dari titik tepi ke baris saran, klik, lalu menepi
  const target = {x: WIN.x + 282 + 300, y: WIN.y + 28 + 462 - 10 - 78 / 2 - 6};
  const rest = {x: WIN.x + 900, y: WIN.y + 410};
  const nKlik = [K.aKlik, K.cKlik];
  let kx = rest.x, ky = rest.y, klik = 0;
  const klikCur = nKlik.findIndex((c) => t > c - 0.5 && t < c + 0.7);
  if (klikCur >= 0) {
    const c = nKlik[klikCur];
    const ke = move(f, F(c - 0.45), 12, 'heavy') * (1 - move(f, F(c + 0.2), 12, 'heavy'));
    kx = rest.x + (target.x - rest.x) * ke; ky = rest.y + (target.y - rest.y) * ke;
    klik = move(f, F(c), 4, 'land') - move(f, F(c) + 4, 6, 'heavy');
  } else if (t < K.slash) {
    const kur0 = arc(f, 0, F(K.klik), {x: WIN.x + 860, y: WIN.y + 560}, {x: WIN.x + 520, y: WIN.y + 560});
    kx = kur0.x; ky = kur0.y; klik = move(f, F(K.klik), 4, 'land') - move(f, F(K.klik) + 4, 6, 'heavy');
  }
  // koordinat isi jendela (di bawah bar 28 px)
  const CX = WIN.x, CY = WIN.y + 28;
  const bal = t >= K.hapus;
  const lf0 = f;
  return <AbsoluteFill style={{background: '#05060A', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 22% 108%, rgba(228,85,15,.7), rgba(228,85,15,0) 55%), radial-gradient(circle at 92% -6%, rgba(228,85,15,.25), rgba(228,85,15,0) 48%)'}}/>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${960 - cam.x * sc + dd.x}px, ${540 - cam.y * sc + dd.y}px) scale(${sc})`}}>
      <div style={{filter: 'invert(0.93) hue-rotate(180deg)'}}><Jendela x={WIN.x} y={WIN.y} w={WIN.w} h={WIN.h} bar="#F2F1ED" judul={<span style={{...ink(15, 500, '#55544F'), margin: '0 auto', paddingRight: 70}}>Claude Code</span>}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 230, height: WIN.h - 28, background: T.soft, borderRight: `1px solid ${T.line}`, paddingTop: 16}}>
          {SESI.map((s, i) => <div key={s} style={{margin: '0 8px', padding: '8px 10px', borderRadius: 8, background: i === 0 ? T.sel : 'transparent', ...ink(15, i === 0 ? 500 : 400)}}>{s}</div>)}
        </div>
        {bal && <div style={{position: 'absolute', left: 270, top: 20, width: 640, ...ink(20), lineHeight: 1.5}}>
          {(() => { const g = (d: number) => move(f, F(K.hapus + d), 3, 'land'); const sh = (d: number): React.CSSProperties => ({opacity: t >= K.hapus + d ? 1 : 0, transform: `translateY(${(1 - g(d)) * 10}px)`});
            const BR = [['Tujuan', 'video perjalanan skill-development'], ['Gaya', 'premium, gelap'], ['Kiblat', 'kartu 07, 49, 63'], ['Durasi', '60 detik']];
            return <>
            <div style={{...sh(1.7), background: T.sel, borderRadius: 14, padding: '10px 16px', marginBottom: 12, fontSize: 17}}>{PROMPT}</div>
            <div style={{...sh(2.0), color: AKSEN, marginBottom: 8, fontSize: 18}}>● Memuat skill-development …</div>
            <div style={{...sh(2.35), marginBottom: 10}}>Untuk siapa, dan durasinya berapa?</div>
            <div style={{border: `1px solid ${T.line}`, borderRadius: 10, fontSize: 17, overflow: 'hidden', opacity: t >= K.hapus + 2.6 ? 1 : 0}}>
              {BR.map(([x, y], i) => { const d = 2.6 + i * 0.14; return <div key={x} style={{...sh(d), display: 'flex', padding: '7px 14px', borderBottom: i < 3 ? `1px solid ${T.line}` : 'none'}}><span style={{width: 110, color: T.muted}}>{x}</span><span>{y}</span></div>; })}</div>
            <div style={{...sh(3.3), color: T.muted, marginTop: 10, fontSize: 17}}>Mengambil referensi: kartu 07, 49, 63 ›</div></>; })()}
        </div>}
        <div style={{position: 'absolute', left: 270, top: 26, width: 620, ...ink(20), lineHeight: 1.55, display: bal ? 'none' : 'block'}}>
          <div style={{color: T.muted, marginBottom: 14}}>Read cutting round 3 result ›</div>
          <div style={{marginBottom: 18}}>Potongan pertama sudah lolos pemeriksaan durasi dan sinkronisasi. Satu gerbang masih gagal, jadi saya kirim putaran berikutnya khusus untuk batas kalimat.</div>
          <div style={{color: T.muted, marginBottom: 14}}>Checking the next pass ›</div>
          <div>Hasil terbaru hampir selesai: tidak ada kata sampah, tanpa jeda berlebih, wajah dan suara sejajar.</div>
        </div>
        <div style={{position: 'absolute', left: 262, top: 462, width: 620, height: 92, borderRadius: 22, border: `1.5px solid ${T.line}`, background: '#FFFFFF', boxShadow: '0 4px 16px rgba(0,0,0,.05)'}}>
          <span style={{position: 'absolute', left: 22, bottom: 24, ...ink(32, 300, '#4A4944')}}>+</span>
          <span style={{position: 'absolute', left: 66, bottom: 26, ...ink(24, 400, ketik ? T.ink : T.muted), display: 'flex', alignItems: 'center'}}>
            {ketik && isi === '' && t >= K.hapus + 1.5 ? null : ketik ? <><span style={{fontSize: isi.length > 30 ? 17 : 24, maxWidth: 520, whiteSpace: 'normal', lineHeight: 1.2}}>{isi}</span><span style={{width: 2, height: 28, background: AKSEN, opacity: caret ? 1 : 0, marginLeft: 1}}/>{isi.length <= 1 && <span style={{color: T.muted, marginLeft: 4}}>Type to filter</span>}</> : <span>Reply to Claude…</span>}
          </span>
          <span style={{position: 'absolute', right: 16, bottom: 20, width: 44, height: 44, borderRadius: 22, transform: `scale(${1 - 0.04 * (move(f, F(K.hapus + 1.5), 3, 'land') - move(f, F(K.hapus + 1.62), 4, 'heavy'))})`, background: ketik ? AKSEN : '#E6E4DE', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
        </div>
        <div style={{position: 'absolute', left: 470, top: 574, ...ink(14, 400, T.muted)}}>Opus 5.5 <span style={{marginLeft: 8}}>High</span><span style={{marginLeft: 12}}>Auto</span></div>
        {/* daftar perintah: tumbuh dari kolom ketik ke atas */}
        {kartuH > 0 && <div style={{position: 'absolute', left: 282, top: 462 - 10 - kartuH, width: 650, height: kartuH, borderRadius: 16, background: '#FFFFFF', opacity: tumbuh, transform: `translateY(${(1 - tumbuh) * 12}px)`,
          boxShadow: '0 12px 36px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.08)', padding: 10, overflow: 'hidden', boxSizing: 'border-box'}}>
          <div style={{height: baris - 6, margin: '3px 0', borderRadius: 10, background: T.sel, display: 'flex', alignItems: 'center', padding: '0 18px', ...ink(46, 400)}}>{saran[Math.max(0, aktif)].teks}</div>
        </div>}
        <div style={{position: 'absolute', left: 930, top: 0, width: 210, height: WIN.h - 28, borderLeft: `1px solid ${T.line}`, padding: '20px 18px', ...ink(15, 500)}}>
          <div style={{color: T.muted, fontWeight: 400, marginBottom: 8}}>Environment</div><div style={{marginBottom: 18}}>work · node-c-pc</div>
          <div style={{display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${T.line}`, paddingTop: 14, marginBottom: 18}}><span>Context</span><span style={{color: T.muted}}>41%</span></div>
          <div style={{color: T.muted, fontWeight: 400, borderTop: `1px solid ${T.line}`, paddingTop: 14, marginBottom: 8}}>Outputs</div>
          {['sanding.jpg', 'RESEP.md', 'DESAIN.md'].map((x) => <div key={x} style={{padding: '5px 0', fontWeight: 400}}>{x}</div>)}
        </div>
      </Jendela></div>
      {/* UI muncul dengan glitch mosaik piksel (kartu 63 k3): sel 40 px gelap/oranye hilang acak dalam 14 f */}
      {f < 18 && Array.from({length: 18 * 17}, (_, n) => { const cx = n % 18, cy = Math.floor(n / 18); const hh = ((cx * 7919 + cy * 104729 + 13) % 97) / 97; const off = 3 + Math.floor(hh * 13);
        return f < off ? <div key={n} style={{position: 'absolute', left: WIN.x - 10 + cx * 64, top: WIN.y - 10 + cy * 40, width: 64, height: 40, background: hh > 0.8 ? '#E4550F' : hh > 0.55 ? '#1A1D26' : '#0B0D12'}}/> : null; })}
      <Kursor x={kx} y={ky} klik={klik}/>
    </div>
    <div style={{display: 'none'}}>{CX}{CY}</div>
  </AbsoluteFill>;
};

export const AppClaude: React.FC<AppProps> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const blur = f < 18 || f >= Math.round(p.kunci.keluar * fps) - 2 || (f >= Math.round((p.kunci.apple - 0.3) * fps) && f < Math.round((p.kunci.apple + 0.15) * fps) + 1) /* blur hanya selama punch (MG63 §2) */;
  return <AbsoluteFill><Fonts/>{blur ? <CameraMotionBlur shutterAngle={180} samples={8}><Isi {...p} f={f}/></CameraMotionBlur> : <Isi {...p} f={f}/>}</AbsoluteFill>;
};
