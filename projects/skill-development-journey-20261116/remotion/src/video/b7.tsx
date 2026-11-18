import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../lib/curves';
import {Fonts} from './bersama/Fonts';
import {MEREK} from './bersama/tema';
import {WajahDorong} from './bersama/WajahDorong';
import {ChatRow, type ChatItem} from './bersama/chat/Conversation';
import {CHAT_VIEW, CHAT_WINDOW, SessionWindow, TOMBOL_KIRIM} from './bersama/chat/Chrome';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {GelombangGrid, type Gelombang} from './bersama/ui-asli/claude/GelombangGrid';

type KunciChat = {
  updateA: number; laporanA: number; perintahA: number; kirimA: number;
  terminalA: number; terkirimA: number; mintaB: number; kirimB: number;
  updateB: number; masukanB: number; edit: number; diff: number;
  cek: number; pass: number; ringkas: number; lega: number; keluar: number;
};

// Root.tsx masih menyimpan props pratinjau lama; lego memakai KunciChat.
type KunciAwal = {
  ketik1: number; kirim1: number; tiba1: number; ketik2: number; kirim2: number;
  tiba2: number; masukB: number; ketikN: number; kirimN: number; tibaN: number;
  loop: number; ok: number; keluar: number;
};

export type DesktopProps = {
  durasi: number;
  pre: number; post: number; preT0: number; postT0: number; zPre: number;
  kunci: KunciChat | KunciAwal;
};

const kunciChat = (k: DesktopProps['kunci']): KunciChat => 'updateA' in k ? k : ({
  updateA: k.ketik1, laporanA: k.ketik1 + 0.12, perintahA: k.ketik2 - 0.2,
  kirimA: k.kirim2, terminalA: k.kirim2 + 0.1, terkirimA: k.kirim2 + 0.65,
  mintaB: k.masukB, kirimB: k.ketikN, updateB: k.ketikN + 1.15,
  masukanB: k.ketikN + 1.3, edit: k.loop, diff: k.loop + 0.45,
  cek: k.loop + 0.9, pass: k.ok, ringkas: k.ok + 0.12, lega: k.ok, keluar: k.keluar,
});

// D-449: jendela mendarat (zoom 1,25 → 1, blur gerak), kursor mengklik kirim di frame KLIK dunia, dan klik itu
// memicu gelombang grid dari tombol kirim. Prompt pindah dari kolom input ke percakapan saat diklik.
const KLIK = 12;
const PROMPT = 'Revisi potongan ronde 3, cek semua gerbang.';
const GELOMBANG: Gelombang = {asal: {x: CHAT_WINDOW.x + TOMBOL_KIRIM.x, y: CHAT_WINDOW.y + TOMBOL_KIRIM.y}, frames: 26};

const messages = (k: KunciChat, duration: number): ChatItem[] => [
  {id: 'irfan', type: 'prompt', at: KLIK / 30, height: 90,
    teks: PROMPT},
  {id: 'update-a', type: 'event', at: k.updateA, height: 32,
    teks: 'Update dari ChatGPT · session A · 12:20'},
  {id: 'laporan-a', type: 'claude', at: k.laporanA, until: k.perintahA - 0.08, height: 88,
    teks: 'ChatGPT selesai memotong ronde 3. Satu gerbang masih gagal: jeda di batas kalimat 68,7 dtk.'},
  {id: 'perintah-a', type: 'claude', at: k.perintahA, until: k.kirimA - 0.1, height: 88,
    teks: 'Saya sudah memerintahkan ChatGPT session A memperbaiki batas kalimat itu.'},
  {id: 'kirim-a', type: 'action', at: k.kirimA, resultAt: k.terkirimA, height: 32,
    teks: 'Messaged ChatGPT · session A'},
  {id: 'bus-a', type: 'terminal', at: k.terminalA, until: k.terkirimA - 0.08, resultAt: k.terkirimA, height: 100,
    teks: 'bus send chatgpt-a "perbaiki jeda 68,7 dtk"', result: 'terkirim'},
  {id: 'minta-b', type: 'claude', at: k.mintaB, until: k.kirimB - 0.1, height: 50,
    teks: 'Saya minta ChatGPT session B memeriksa hasilnya.'},
  {id: 'kirim-b', type: 'action', at: k.kirimB, resultAt: k.updateB, height: 32,
    teks: 'Messaged ChatGPT · session B'},
  {id: 'update-b', type: 'event', at: k.updateB, height: 32,
    teks: 'Update dari ChatGPT · session B'},
  {id: 'masukan-b', type: 'claude', at: k.masukanB, until: k.edit - 0.12, height: 124,
    teks: 'ChatGPT session B memberi masukan: kesalahan ini pernah terjadi di video lain. Saya catat supaya tidak terulang.'},
  {id: 'edit', type: 'action', at: k.edit, resultAt: k.diff, height: 32,
    teks: 'Edit guide/teks/GUIDE.md'},
  {id: 'diff', type: 'diff', at: k.diff, height: 64,
    teks: '+ Potong di jeda, bukan di dalam kata.'},
  {id: 'cek', type: 'action', at: k.cek, resultAt: k.pass, height: 32,
    teks: 'Ran cut_check.py'},
  {id: 'pass', type: 'terminal', at: k.cek + 0.1, until: k.pass - 0.06, resultAt: k.pass, height: 100,
    teks: 'python3 cut_check.py', result: 'PASS'},
  {id: 'pelajaran', type: 'claude', at: k.ringkas, until: duration - 0.55, height: 124,
    teks: 'Pelajaran tersimpan di skill-development. Session A dan B memakai aturan yang sama mulai sekarang.'},
];

const Isi: React.FC<DesktopProps & {f: number; durasiDunia: number}> = ({kunci, f, durasiDunia}) => {
  const {fps} = useVideoConfig();
  const k = kunciChat(kunci);
  const t = f / fps;
  const items = messages(k, durasiDunia);
  let top = 0, previousTarget = 0, scroll = 0;
  const rows = items.map((item) => {
    const y = top;
    top += item.height + (item.type === 'action' ? 12 : 24);
    const target = Math.max(0, y + item.height - CHAT_VIEW.height + 18);
    scroll += (target - previousTarget) * move(f, Math.round(item.at * fps) - 4, 8, 'heavy');
    previousTarget = target;
    return {item, y};
  });
  const zoom = (1 + 0.25 * (1 - move(f, 0, 12, 'heavy'))) * (1 + 0.06 * move(f, 0, Math.round(durasiDunia * fps), 'drift'));
  const phase = t >= k.lega ? 'Selesai' : t >= k.cek ? 'Memeriksa…' : t >= k.edit ? 'Mencatat pelajaran…'
    : (t >= k.kirimA && t < k.terkirimA) || (t >= k.kirimB && t < k.updateB) ? 'Mengirim…' : 'Working…';
  return <AbsoluteFill style={{background: MEREK.latar, overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>
      <SessionWindow frame={f} fps={fps} phase={phase} doneAt={k.lega} klik={KLIK} draft={PROMPT}>
        <div data-transcript-scroll style={{position: 'absolute', inset: 0, transform: `translateY(${-scroll}px)`}}>
          {rows.map(({item, y}) => <ChatRow key={item.id} item={item} top={y} scroll={scroll} frame={f} fps={fps}/>)}
        </div>
      </SessionWindow>
      <GelombangGrid frame={f - KLIK} g={GELOMBANG}/>
    </div>
  </AbsoluteFill>;
};

export const DesktopAgen: React.FC<DesktopProps> = (p) => {
  const fAll = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dunia = Math.round(p.durasi * fps) - p.pre - p.post;
  if (fAll < p.pre) return <AbsoluteFill><Fonts/><WajahDorong f={fAll} t0={p.preT0} dari={p.zPre} ke={1.7} frames={p.pre}/></AbsoluteFill>;
  const f = fAll - p.pre;
  if (f >= dunia) return <AbsoluteFill><Fonts/><WajahDorong f={f - dunia} t0={p.postT0} dari={1.7} ke={1.0} frames={p.post}/></AbsoluteFill>;
  const isi = <Isi {...p} durasiDunia={dunia / fps} f={f}/>;
  return <AbsoluteFill><Fonts/>{f < 12 ? <CameraMotionBlur shutterAngle={180} samples={8}>{isi}</CameraMotionBlur> : isi}</AbsoluteFill>;
};
