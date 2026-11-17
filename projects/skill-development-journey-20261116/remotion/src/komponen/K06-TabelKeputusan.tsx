import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {arc, dur, move, react} from '../lib/curves';
import {FONTS_K06, useFontsReady} from './K06/fonts';

export type K06Props = {
  /** frame masuk tabel */
  mulai: number;
  /** frame onset "memutuskan sebuah pilihan": satu baris menyala biru */
  kPilih: number;
};

const C = {kanvas: '#F6F5F0', panel: '#FFFFFF', garis: '#E4E2DA', tinta: '#1F2328', tinta2: '#6B6F76', biru: '#2E5BFF', biruMuda: '#DCE5FF'};

// Isi asli: claude/motion-graphic/references/typography.md, "### 8a. Cara memilih gerak teks", tabel pertama.
export const KEPALA = ['Situasi kalimat', 'Peran', 'Pilih A bila…', 'Pilih B bila…', 'Pilih C bila…'];
export const BARIS: string[][] = [
  ['Narasi berjalan', 'R1', 'T19 word-pop: tempo cepat, banyak kata', 'T01 word rise dari mask: kalimat tenang/serius', 'T28 flip-up X: kiblat 2.5D/3D, kata pendek'],
  ['Kata yang membawa emosi (kata hero)', 'R6', 'T02 blur-to-focus + G8 kilat: emosi naik, harapan, "Excitement"', 'T04 scale-down settle: kata berdiri sendiri di layar penuh', 'T03 slam: kejutan, kontras keras'],
  ['Kata kunci di tengah narasi', 'R2', 'G4/T20 color flash: kiblat memakai warna sebagai penekanan', 'T03 slam kecil: klaim tegas', 'T13 tracking converge: dua hal yang bertemu/menyatu'],
  ['Klaim keras / peringatan', 'R3', 'T03 + shake', 'T25 chaotic: frustrasi, kacau', 'T14 letter scatter: sesuatu runtuh/hilang'],
];
const PILIH = 1; // baris yang menyala

const COLS = [250, 90, 400, 420, 424];
const CARD = {w: 1640, pad: 28, head: 64, row: 148};
const CARD_H = CARD.pad * 2 + CARD.head + CARD.row * BARIS.length;
const CARD_X = (1920 - CARD.w) / 2;
const CARD_Y = (1080 - CARD_H) / 2;
const rowCenterY = (i: number) => CARD_Y + CARD.pad + CARD.head + CARD.row * i + CARD.row / 2;

const Cursor: React.FC<{scale: number}> = ({scale}) => (
  <svg width="44" height="52" viewBox="0 0 22 26" style={{transform: `scale(${scale})`, transformOrigin: '3px 2px', filter: 'drop-shadow(0 4px 6px rgba(31,35,40,0.3))'}}>
    <path d="M3 2 L3 20 L8 15.5 L11.5 23.5 L15 22 L11.6 14.2 L18.5 14 Z" fill="#1F2328" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const K06TabelKeputusan: React.FC<K06Props> = ({mulai, kPilih}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ready = useFontsReady(FONTS_K06);
  if (!ready) return <AbsoluteFill style={{background: C.kanvas}} />;

  // kartu masuk
  const pin = move(frame, mulai, 16, 'land');

  // kamera: push pelan 1,0→1,08 sebelum kPilih; setelah itu push heavy ke baris menyala (→1,7), lalu drift (→1,78)
  const FOKUS_X = 630;
  const hit = move(frame, kPilih - 2, 28, 'heavy');
  const cam = 1 + 0.08 * move(frame, mulai, Math.max(30, kPilih - mulai), 'drift') + 0.62 * hit + 0.08 * move(frame, kPilih + 26, 130, 'drift');
  const camX = (960 - FOKUS_X) * hit;
  const camY = (540 - rowCenterY(PILIH)) * hit;

  // baris menyala
  const lit = move(frame, kPilih, 7, 'whip');

  // kursor menuju baris, klik di kPilih
  const travel = dur(900, fps, 1);
  const cur = arc(frame, kPilih - travel, travel, {x: 1560, y: 960}, {x: 1130, y: rowCenterY(PILIH) + 6});
  const curOp = move(frame, kPilih - travel, 6, 'reveal') * (1 - move(frame, kPilih + 36, 8, 'leave'));
  const clickK = frame < kPilih ? 0 : Math.min(1, (frame - kPilih) / 4);
  const curScale = 1 - 0.15 * Math.sin(Math.PI * clickK);
  const ripple = move(frame, kPilih, 10, 'reveal');

  // penanda pilihan di kiri baris
  const mk = move(frame, kPilih + 4, 10, 'land');

  return (
    <AbsoluteFill style={{background: C.kanvas, overflow: 'hidden'}}>
      <AbsoluteFill style={{transformOrigin: `${FOKUS_X}px ${rowCenterY(PILIH)}px`, transform: `translate(${camX}px, ${camY}px) scale(${cam})`}}>
        <div style={{
          position: 'absolute', left: CARD_X, top: CARD_Y, width: CARD.w, height: CARD_H, boxSizing: 'border-box',
          background: C.panel, border: `2px solid ${C.garis}`, borderRadius: 24, padding: CARD.pad,
          boxShadow: '0 18px 48px rgba(31,35,40,0.08)', fontFamily: 'Inter', color: C.tinta,
          opacity: move(frame, mulai, 8, 'reveal'), transform: `translateY(${24 * (1 - pin)}px) scale(${0.92 + 0.08 * pin})`,
        }}>
          {/* kepala tabel */}
          <div style={{display: 'flex', height: CARD.head, alignItems: 'center', borderBottom: `2px solid ${C.garis}`, fontSize: 22, fontWeight: 700, color: C.tinta2}}>
            {KEPALA.map((h, c) => <div key={c} style={{width: COLS[c], padding: '0 16px', boxSizing: 'border-box'}}>{h}</div>)}
          </div>
          {BARIS.map((r, i) => {
            const pe = move(frame, mulai + 10 + react(i + 1, fps, 1.7), 14, 'land');
            const isP = i === PILIH;
            const dim = isP ? 1 : 1 - 0.55 * lit;
            return (
              <div key={i} style={{
                display: 'flex', height: CARD.row, alignItems: 'center', boxSizing: 'border-box', position: 'relative',
                borderBottom: i === BARIS.length - 1 ? 'none' : `2px solid ${C.garis}`,
                background: isP ? `rgba(220,229,255,${lit})` : 'transparent', borderRadius: isP ? 14 : 0,
                boxShadow: isP ? `inset 0 0 0 ${3 * lit}px ${C.biru}` : 'none',
                opacity: pe * dim, transform: `translateY(${24 * (1 - pe)}px)`,
              }}>
                {isP && <div style={{position: 'absolute', left: 0, top: 10, bottom: 10, width: 8, borderRadius: 4, background: C.biru, opacity: lit}} />}
                {r.map((cell, c) => (
                  <div key={c} style={{
                    width: COLS[c], padding: '0 16px', boxSizing: 'border-box', fontSize: 24, lineHeight: 1.4,
                    fontWeight: c === 0 ? 600 : c === 1 ? 500 : 400, color: C.tinta,
                  }}>{cell}</div>
                ))}
              </div>
            );
          })}
        </div>

        {/* penanda pilihan */}
        <div style={{
          position: 'absolute', left: CARD_X - 8, top: rowCenterY(PILIH) - 26, width: 52, height: 52, borderRadius: 26,
          background: C.biru, boxShadow: '0 8px 20px rgba(46,91,255,0.35)', opacity: mk,
          transform: `scale(${0.92 + 0.08 * mk}) translateY(${24 * (1 - mk)}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 36 36"><path d="M8 19 L15 26 L28 11" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>

        {/* riak klik + kursor */}
        <div style={{position: 'absolute', left: 1130 - 40, top: rowCenterY(PILIH) + 6 - 40, width: 80, height: 80, borderRadius: 40,
          border: `4px solid ${C.biru}`, opacity: frame >= kPilih ? 0.7 * (1 - ripple) : 0, transform: `scale(${0.3 + 1.7 * ripple})`}} />
        <div style={{position: 'absolute', left: cur.x - 3, top: cur.y - 2, opacity: curOp}}><Cursor scale={curScale} /></div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const objekK06 = (p: K06Props): {nama: string; frame: number; peran: string}[] => [
  {nama: 'tabel keputusan', frame: p.mulai, peran: 'objek-mendarat'},
  {nama: BARIS[PILIH][0], frame: p.kPilih, peran: 'sinyal'},
];
