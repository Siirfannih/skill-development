// B6b · komentar penonton (REVISI-1 B10): kartu komentar gaya kolom komentar media sosial (avatar bulat polos, nama akun generik, teks komentar).
// Teks diberikan Irfan ("Lumayan nih", "masih AI slop"); instruksi Irfan menang atas Lantai A5. Muncul satu per satu di kiri/kanan wajah, bertahan sampai akhir.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {move} from '../lib/curves';
import {Fonts} from './bersama/Fonts';
import {FONT, INK} from './bersama/tema';
import {BoilDefs, PanahGoresan, TulisTangan, type PanahProps, type TulisProps} from './bersama/Coretan';

export type KomentarProps = {nama: string; teks: string; sisi: 'kiri' | 'kanan'; warna: string; durasi: number; w: number; h: number; size: number};

export const Komentar: React.FC<KomentarProps> = (p) => {
  const f = useCurrentFrame();
  const kiri = p.sisi === 'kiri';
  const enter = move(f, 0, 12, 'land');
  const rebound = move(f, 5, 7, 'heavy') - move(f, 12, 11, 'heavy');
  const av = Math.round(p.size * 1.15);
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <div style={{position: 'absolute', left: 40, top: 40, opacity: enter > 0.02 ? 1 : 0, transformOrigin: kiri ? '0 100%' : '100% 100%',
      transform: `translateY(${50 * (1 - enter)}px) rotate(${(kiri ? -1 : 1) * 4 * (1 - enter)}deg) scale(${0.84 + 0.16 * enter + 0.02 * rebound})`}}>
      <div style={{display: 'flex', gap: 22, alignItems: 'flex-start', padding: '22px 36px 24px 24px', borderRadius: 34, background: '#FFFFFF', color: INK,
        boxShadow: '0 30px 60px rgba(0,0,0,.30), 0 8px 16px rgba(0,0,0,.16)', whiteSpace: 'nowrap'}}>
        <svg width={av} height={av} viewBox="0 0 100 100" style={{flexShrink: 0}}>
          <circle cx="50" cy="50" r="50" fill={p.warna}/>
          <circle cx="50" cy="38" r="17" fill="#FFFFFF" opacity=".92"/>
          <path d="M18 88C18 66 32 58 50 58C68 58 82 66 82 88C72 96 28 96 18 88Z" fill="#FFFFFF" opacity=".92"/>
        </svg>
        <div>
          <div style={{fontFamily: FONT.inter, fontWeight: 600, fontSize: Math.round(p.size * 0.5), color: '#6B7280', marginBottom: 4}}>{p.nama}</div>
          <div style={{fontFamily: FONT.poppins, fontWeight: 700, fontSize: p.size, lineHeight: 1.12, letterSpacing: -1.2}}>{p.teks}</div>
        </div>
      </div>
    </div>
  </AbsoluteFill>;
};

// ---------- B6b REVISI-1 B10 (diganti): postingan Instagram desktop; frame video mengecil ke dalamnya, footage terus berjalan, komentar acak pop-up ----------
import {CameraMotionBlur} from '@remotion/motion-blur';
import {OffthreadVideo, staticFile, useVideoConfig} from 'remotion';
import {siInstagram} from 'simple-icons';
import {CURVE} from '../lib/curves';

/** coretan di dalam dunia IG (ikut kamera): tulisan tangan + panah ke kolom komentar; tampil [awal, akhir) detik relatif lapisan, keluar = potongan */
export type CoretanIG = {awal: number; akhir: number; tulis: TulisProps; panah: PanahProps};
export type IGProps = {durasi: number; t0: number; z0: number; kunci: {k1: number; k2: number; field: number}; coret?: CoretanIG; rev?: number;
  /** kunci kamera [detik, skala, pusat x, pusat y, kurva menuju kunci berikut]; sumber tunggal (bangun.py + cek_tumpuk) */
  kamera?: [number, number, number, number, 'heavy' | 'drift'][]};

const IGC = {ink: '#262626', abu: '#737373', garis: '#DBDBDB', biru: '#0095F6'};
const ig = (s: number, w = 400, c = IGC.ink): React.CSSProperties => ({fontFamily: FONT.inter, fontSize: s, fontWeight: w, color: c});
const Ikon: React.FC<{d: string; s?: number; c?: string; isi?: boolean}> = ({d, s = 36, c = IGC.ink, isi = false}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={isi ? c : 'none'} stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const HATI = 'M12 21C5 15.5 3 12 3 8.8A4.8 4.8 0 0 1 12 6.3 4.8 4.8 0 0 1 21 8.8C21 12 19 15.5 12 21Z';
const KOMEN = 'M12 3C7 3 3 6.6 3 11c0 2 .9 3.9 2.4 5.3L4 21l4.4-1.9c1.1.3 2.3.5 3.6.5 5 0 9-3.6 9-8s-4-8.6-9-8.6Z';
const KIRIM = 'M21 3L3 10l7 3 3 7 8-17ZM10 13L21 3';
const SIMPAN = 'M6 3h12v18l-6-4.5L6 21V3Z';

const Avatar: React.FC<{s: number; w: string; huruf?: string}> = ({s, w, huruf}) => (
  <div style={{width: s, height: s, borderRadius: s / 2, background: w, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', ...ig(s * 0.42, 600, '#fff'), flexShrink: 0}}>{huruf}</div>
);

const Komen: React.FC<{f: number; mulai: number; y: number; nama: string; teks: string; w: string; huruf: string}> = ({f, mulai, y, nama, teks, w, huruf}) => {
  if (f < mulai - 1) return null;
  const e = move(f, mulai, 9, 'reveal'), pop = move(f, mulai + 3, 6, 'heavy') - move(f, mulai + 9, 8, 'heavy');
  return <div style={{position: 'absolute', left: 24, right: 24, top: y, display: 'flex', gap: 16, alignItems: 'flex-start', opacity: e > 0.02 ? 1 : 0, filter: `blur(${(1 - e) * 6}px)`, // motion-ok: MG63 §2 masuk blur→tajam (reveal)
    transform: `translateY(${18 * (1 - e)}px) scale(${0.96 + 0.04 * e + 0.015 * pop})`, transformOrigin: '0 50%'}}>
    <Avatar s={52} w={w} huruf={huruf}/>
    <div style={{flex: 1, paddingTop: 2}}>
      <div style={{...ig(27), lineHeight: 1.3}}><span style={{fontWeight: 600}}>{nama}</span> {teks}</div>
      <div style={{display: 'flex', gap: 22, marginTop: 6, ...ig(21, 500, IGC.abu)}}><span>1m</span><span>Reply</span></div>
    </div>
    <div style={{paddingTop: 10}}><Ikon d={HATI} s={24} c={IGC.abu}/></div>
  </div>;
};

/** tata letak postingan (koordinat layar pada kamera 1,0): modal 1560x824, media hitam 960 (video 16:9 utuh), panel putih 600 */
const MODAL = {x: 180, y: 56, w: 1560, h: 824}, MEDIA_W = 960;
const VID = {x: MODAL.x, y: MODAL.y + (MODAL.h - 540) / 2, w: 960, h: 540};

const kameraIG = (t: number, keys: NonNullable<IGProps['kamera']>) => {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  if (i + 1 >= keys.length) return {s: keys[i][1], x: keys[i][2], y: keys[i][3]};
  const [a, s0, x0, y0, kv] = keys[i], [b, s1, x1, y1] = keys[i + 1];
  const k = CURVE[kv](Math.min(1, Math.max(0, (t - a) / Math.max(0.01, b - a))));
  return {s: s0 + (s1 - s0) * k, x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k};
};

const IsiIG: React.FC<IGProps & {f: number}> = ({t0, z0, kunci: K, f, coret, kamera}) => {
  const {fps} = useVideoConfig();
  const t = f / fps;
  const F = (s: number) => Math.round(s * fps);
  const p = move(f, 0, 18, 'heavy');                                      // frame video mengecil ke kotak video postingan
  const cam = kameraIG(t, kamera ?? [[0, 1, 960, 540, 'drift']]);
  const zz = z0 + (1 - z0) * p;
  const rx = VID.x * p, ry = VID.y * p, rw = 1920 + (VID.w - 1920) * p, rh = 1080 + (VID.h - 1080) * p;
  const modal = move(f, 6, 14, 'land');
  const panel = move(f, 10, 14, 'land');
  const caret = Math.floor((f - F(K.field)) / 15) % 2 === 0;
  const aktif = t >= K.field;
  const vs = (rw / 1920) * zz;
  return <AbsoluteFill style={{background: '#FFFFFF', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${960 - cam.x * cam.s}px, ${540 - cam.y * cam.s}px) scale(${cam.s})`}}>
      {/* navigasi kiri Instagram desktop */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 110, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46, paddingTop: 60, opacity: modal}}>
        <svg width="36" height="36" viewBox="0 0 24 24"><path d={siInstagram.path} fill={IGC.ink}/></svg>
        <Ikon d="M3 11l9-8 9 8v10h-6v-6H9v6H3V11Z" s={34}/><Ikon d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4" s={34}/><Ikon d={KOMEN} s={34}/><Ikon d={HATI} s={34}/>
      </div>
      {/* modal postingan */}
      <div style={{position: 'absolute', left: MODAL.x, top: MODAL.y, width: MODAL.w, height: MODAL.h, borderRadius: 12, background: '#FFFFFF', overflow: 'hidden', opacity: modal > 0.02 ? 1 : 0,
        boxShadow: '0 0 0 1px #E3E3E3, 0 10px 24px rgba(0,0,0,.08), 0 30px 70px rgba(0,0,0,.12)'}}>
        <div style={{position: 'absolute', left: MEDIA_W, top: 0, width: MODAL.w - MEDIA_W, height: MODAL.h, background: '#FFFFFF', transform: `translateX(${40 * (1 - panel)}px)`, opacity: panel}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderBottom: `1px solid ${IGC.garis}`}}>
            <div style={{width: 52, height: 52, borderRadius: 26, overflow: 'hidden', position: 'relative', flexShrink: 0, background: '#222'}}>
              <div style={{position: 'absolute', left: 26 - 960 * 0.125, top: 26 - 380 * 0.125, width: 1920, height: 1080, transformOrigin: '0 0', transform: 'scale(0.125)'}}>
                <OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={Math.round(t0 * fps)} muted style={{width: 1920, height: 1080}}/></div></div>
            <div style={{flex: 1}}><div style={ig(26, 600)}>siirfannih</div><div style={ig(21, 400)}>Original audio</div></div>
            <svg width="30" height="8" viewBox="0 0 34 10"><circle cx="5" cy="5" r="3" fill={IGC.ink}/><circle cx="17" cy="5" r="3" fill={IGC.ink}/><circle cx="29" cy="5" r="3" fill={IGC.ink}/></svg>
          </div>
          <div style={{display: 'flex', gap: 16, padding: '22px 24px', alignItems: 'flex-start'}}>
            <Avatar s={52} w="#262626" huruf="s"/>
            <div style={{...ig(27), lineHeight: 1.3}}><span style={{fontWeight: 600}}>siirfannih</span> 100% full pakai AI<div style={{...ig(21, 400, IGC.abu), marginTop: 6}}>2w</div></div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 210}}>
            <Komen f={f} mulai={F(K.k1)} y={0} nama="andi_prasetyo" teks="masih kerasa AI slop" w="#8E7CC3" huruf="a"/>
            <Komen f={f} mulai={F(K.k2)} y={118} nama="salsa.kirana" teks="Keren editan profesional" w="#E58E5B" huruf="s"/>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, borderTop: `1px solid ${IGC.garis}`}}>
            <div style={{display: 'flex', gap: 22, padding: '16px 24px 6px', alignItems: 'center'}}><Ikon d={HATI} s={34}/><Ikon d={KOMEN} s={32}/><Ikon d={KIRIM} s={32}/><span style={{marginLeft: 'auto'}}><Ikon d={SIMPAN} s={32}/></span></div>
            <div style={{padding: '4px 24px 14px', ...ig(19, 400, IGC.abu)}}>November 17</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px 18px', borderTop: `1px solid ${IGC.garis}`}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={IGC.ink} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M8 14c1.2 2 6.8 2 8 0M9 9.5v.5M15 9.5v.5"/></svg>
              <span style={{...ig(25, 400, IGC.abu), display: 'flex', alignItems: 'center'}}>
                {aktif && <span style={{width: 2, height: 28, background: IGC.ink, marginRight: 2, opacity: caret ? 1 : 0}}/>}Add a comment…</span>
              <span style={{marginLeft: 'auto', ...ig(24, 600, '#B2DFFC')}}>Post</span>
            </div>
          </div>
        </div>
      </div>
      {/* kotak hitam latar video: SATU gerak dengan video (p yang sama, bersarang di dalamnya) dari layar penuh ke kotak media; tidak ada tepi hitam tertinggal (audit ronde 7 W2) */}
      <div style={{position: 'absolute', left: MODAL.x * p, top: MODAL.y * p, width: 1920 + (MEDIA_W - 1920) * p, height: 1080 + (MODAL.h - 1080) * p, background: '#000', borderRadius: `${12 * p}px 0 0 ${12 * p}px`}}/>
      {/* video: mengecil dari layar penuh ke kotak media 16:9; footage terus berjalan (proxy wajah) */}
      <div style={{position: 'absolute', left: rx, top: ry, width: rw, height: rh, overflow: 'hidden', background: '#000'}}>
        <div style={{position: 'absolute', left: (rw - 1920 * vs) / 2, top: (rh - 1080 * vs) * 0.45, width: 1920, height: 1080, transformOrigin: '0 0', transform: `scale(${vs})`}}>
          <OffthreadVideo src={staticFile('video/wajah-proxy.mp4')} startFrom={Math.round(t0 * fps)} muted style={{width: 1920, height: 1080}}/></div>
      </div>
      {coret && f >= F(coret.awal) && f < F(coret.akhir) && <>
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}><BoilDefs id="boil-ig" f={f}/><PanahGoresan id="boil-ig" {...coret.panah}/></svg>
        <TulisTangan id="boil-ig-t" {...coret.tulis}/>
      </>}
    </div>
  </AbsoluteFill>;
};

export const DuniaIG: React.FC<IGProps> = (p) => {
  const f = useCurrentFrame();
  return <AbsoluteFill><Fonts/>{f <= 20 ? <CameraMotionBlur shutterAngle={200} samples={8}><IsiIG {...p} f={f}/></CameraMotionBlur> : <IsiIG {...p} f={f}/>}</AbsoluteFill>;
};

// ---------- tanda tanya kecil yang memantul di dekat kepala ("menurut kalian videonya kayak gimana?") ----------
export const Tanda: React.FC<{durasi: number; w: number; h: number}> = ({durasi}) => {
  const f = useCurrentFrame();
  const e = move(f, 0, 10, 'land');
  const k = move(f, Math.round(durasi * 30) - 8, 8, 'leave');
  const wig = Math.sin(f * 0.5) * 6 * (1 - move(f, 14, 20, 'drift'));
  return <AbsoluteFill style={{background: 'transparent'}}><Fonts/>
    <div style={{position: 'absolute', left: 40, top: 40, width: 150, height: 150, borderRadius: 75, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 20px 40px rgba(0,0,0,.3)', transform: `translateY(${40 * (1 - e) + 60 * k}px) scale(${0.5 + 0.5 * e}) rotate(${wig}deg)`, opacity: e > 0.02 ? 1 : 0, fontFamily: FONT.poppins, fontWeight: 800, fontSize: 110, color: '#1F2328'}}>?</div>
  </AbsoluteFill>;
};
