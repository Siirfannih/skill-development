import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {move, react} from '../lib/curves';
import {FONTS_K05, useFontsReady} from './K05/fonts';

export type K05Props = {
  /** frame masuk panel timeline */
  mulai: number;
  /** frame onset "AI slop": klip lepas + celah merah + guncangan */
  kSlop: number;
  /** frame onset "putus-putus": kata terpotong di klip */
  kPutus: number;
  /** frame mulai keluar (opsional, bawaan kPutus + 80) */
  keluar?: number;
};

const C = {panel: '#FFFFFF', garis: '#E4E2DA', tinta: '#1F2328', tinta2: '#6B6F76', merah: '#D93A3F', lajur: '#F1F0EB'};

// Tata letak panel (px @1920x1080)
const PANEL = {x: 160, y: 590, w: 1600, h: 440, pad: 32};
const LANE_X = PANEL.x + PANEL.pad;
const LANE_W = PANEL.w - PANEL.pad * 2; // 1536
const RULER_Y = PANEL.y + PANEL.pad;
const LANE1 = {y: RULER_Y + 52, h: 126};
const LANE2 = {y: LANE1.y + LANE1.h + 22, h: 168};

// Klip lajur 1: [kiri, lebar] relatif LANE_X, total 1440 supaya celah 64 px masih muat
const CLIPS: {x: number; w: number; c1: string; c2: string}[] = [
  {x: 0, w: 300, c1: '#8AB4F8', c2: '#5E8FE0'},
  {x: 304, w: 316, c1: '#F6C26B', c2: '#E0A23A'},
  {x: 624, w: 256, c1: '#9FD8B5', c2: '#6DB98A'},
  {x: 884, w: 370, c1: '#C3A6F2', c2: '#9C78E0'},
  {x: 1258, w: 182, c1: '#F49E8C', c2: '#E0735E'},
];
const SHIFT = [0, 0, 0, 38, 68];
const DY = [0, 0, 0, 16, 18];
const ROT = [0, 0, 0, 2.6, -2.4];

// Kata "putus-putus": suku kata per klip
const WORD = 'putus-putus';
const SYL = ['pu', 'tus-', 'pu', 'tus'];
const WORD_FS = 128;
const WSHIFT = [-44, -10, 16, 48];
const WDY = [-12, 11, -14, 9];
const WFILL = ['#8AB4F8', '#F6C26B', '#9FD8B5', '#F49E8C'];
const WDELAY = [0, 4, 7, 11];

const blurPx = (cur: number, prev: number, dist: number) => Math.min(2.5, Math.abs(cur - prev) * dist * 0.12);

/** Guncangan meluruh: amp px, panjang n frame, deterministik. */
const shake = (frame: number, start: number, n: number, amp: number, seed: number) => {
  const a = frame - start;
  if (a < 0 || a >= n) return {x: 0, y: 0};
  const decay = 1 - move(frame, start, n, 'reveal');
  return {x: amp * decay * Math.sin(a * 2.7 + seed), y: amp * 0.55 * decay * Math.sin(a * 3.3 + seed * 1.7)};
};

export const K05TimelinePutus: React.FC<K05Props> = ({mulai, kSlop, kPutus, keluar}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ready = useFontsReady(FONTS_K05);
  const out = keluar ?? kPutus + 80;

  const wordGeo = useMemo(() => {
    if (!ready || typeof document === 'undefined') return null;
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return null;
    ctx.font = `800 ${WORD_FS}px Poppins`;
    const pre: number[] = [0];
    let acc = '';
    for (const s of SYL) { acc += s; pre.push(ctx.measureText(acc).width); }
    return {pre, total: pre[pre.length - 1]};
  }, [ready]);

  if (!ready || !wordGeo) return <AbsoluteFill />;

  // --- panel masuk / keluar
  const pin = move(frame, mulai, 16, 'land');
  const pout = move(frame, out, 10, 'leave');
  const panelOpacity = move(frame, mulai, 8, 'reveal') * (1 - pout);
  const panelScale = 0.92 + 0.08 * pin;
  const panelY = 24 * (1 - pin) + 46 * pout;

  // --- kamera: push pelan + hentak di kSlop dan kPutus
  const push = 0.04 * move(frame, mulai, Math.max(60, out - mulai), 'drift');
  const hit = (k: number, amt: number) =>
    amt * move(frame, k - 1, 5, 'heavy') * (1 - move(frame, k + 4, 20, 'drift'));
  const cam = 1 + push + hit(kSlop, 0.09) + hit(kPutus, 0.06);

  // --- guncangan
  const sh1 = shake(frame, kSlop, 8, 11, 0.4);
  const sh2 = shake(frame, kPutus, 7, 8, 2.1);
  const shx = sh1.x + sh2.x;
  const shy = sh1.y + sh2.y;

  // --- patahan lajur 1
  const b = move(frame, kSlop, 14, 'land');
  const bPrev = move(frame - 1, kSlop, 14, 'land');

  // --- playhead
  const phS = LANE_X + 620 + 2;
  const wordX0 = LANE_X + (LANE_W - wordGeo.total) / 2;
  const phX =
    LANE_X + (phS - LANE_X) * move(frame, mulai + 16, Math.max(8, kSlop - mulai - 16), 'drift') +
    (wordX0 - phS) * move(frame, kSlop + 8, Math.max(8, kPutus - kSlop - 12), 'drift') +
    (wordGeo.total - 60) * move(frame, kPutus + 6, Math.max(8, out - kPutus - 16), 'drift');

  // --- kata hero "AI slop"
  const slopIn = move(frame, kSlop + 2, 9, 'land');
  const slopOut = move(frame, Math.min(kPutus - 6, kSlop + 72), 10, 'leave');
  const slopScale = (1.4 - 0.4 * slopIn) * (1 - 0.1 * slopOut);
  const slopBlur = 7 * (1 - move(frame, kSlop + 2, 4, 'reveal'));
  const slopOp = move(frame, kSlop + 2, 3, 'reveal') * (1 - slopOut);
  const slopDrift = Math.sin(frame / 30 * 0.9) * 4;

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transformOrigin: '50% 100%', transform: `translate(${shx}px, ${shy}px) scale(${cam})`}}>
        {/* kata hero negatif: di sisi kanan atas panel, wajah tetap bebas */}
        <div style={{
          position: 'absolute', right: 150, top: 255, opacity: slopOp,
          transform: `translateY(${24 * (1 - slopIn) + slopDrift}px) rotate(-3deg) scale(${slopScale})`,
          transformOrigin: '100% 100%', filter: `blur(${slopBlur}px) drop-shadow(0 10px 18px rgba(0,0,0,0.45))`,
          fontFamily: 'Anton', fontSize: 300, lineHeight: 1, letterSpacing: 2, color: C.merah,
          WebkitTextStroke: '16px #FFFFFF', paintOrder: 'stroke fill', whiteSpace: 'nowrap',
        }}>AI slop</div>

        {/* panel timeline */}
        <div style={{
          position: 'absolute', left: PANEL.x, top: PANEL.y, width: PANEL.w, height: PANEL.h,
          background: C.panel, borderRadius: 28, border: `2px solid ${C.garis}`,
          boxShadow: '0 22px 60px rgba(31,35,40,0.28)', opacity: panelOpacity,
          transform: `translateY(${panelY}px) scale(${panelScale})`, transformOrigin: '50% 100%',
        }} />
        <div style={{position: 'absolute', inset: 0, opacity: panelOpacity,
          transform: `translateY(${panelY}px) scale(${panelScale})`, transformOrigin: '50% 100%'}}>
          {/* penggaris waktu: hanya garis tick */}
          {Array.from({length: 33}).map((_, i) => (
            <div key={i} style={{position: 'absolute', left: LANE_X + i * (LANE_W / 32), top: RULER_Y + (i % 4 === 0 ? 8 : 18),
              width: 2, height: i % 4 === 0 ? 24 : 14, background: C.garis}} />
          ))}
          {/* lajur */}
          <div style={{position: 'absolute', left: LANE_X, top: LANE1.y, width: LANE_W, height: LANE1.h, borderRadius: 14, background: C.lajur}} />
          <div style={{position: 'absolute', left: LANE_X, top: LANE2.y, width: LANE_W, height: LANE2.h, borderRadius: 14, background: C.lajur}} />

          {/* celah merah lajur 1 */}
          {[{from: 2, to: 3}, {from: 3, to: 4}].map(({from, to}) => {
            const left = LANE_X + CLIPS[from].x + CLIPS[from].w + SHIFT[from] * b;
            const w = (CLIPS[to].x + SHIFT[to] * b) - (CLIPS[from].x + CLIPS[from].w + SHIFT[from] * b);
            return <div key={to} style={{position: 'absolute', left, top: LANE1.y - 6, width: Math.max(0, w), height: LANE1.h + 12,
              background: C.merah, borderRadius: 6, opacity: Math.min(1, b * 4)}} />;
          })}

          {/* klip lajur 1: warna pastel + strip thumbnail gradien */}
          {CLIPS.map((c, i) => {
            const pe = move(frame, mulai + 8 + react(i, fps, 1.6), 14, 'land');
            const dx = SHIFT[i] * b;
            const cells = Math.max(2, Math.round(c.w / 62));
            return (
              <div key={i} style={{
                position: 'absolute', left: LANE_X + c.x + dx, top: LANE1.y + 12, width: c.w, height: LANE1.h - 36,
                background: c.c1, borderRadius: 12, overflow: 'hidden', opacity: pe,
                transform: `translateY(${24 * (1 - pe) + DY[i] * b}px) rotate(${ROT[i] * b}deg)`,
                filter: `blur(${blurPx(b, bPrev, SHIFT[i] || 1)}px)`,
                boxShadow: 'inset 0 0 0 2px rgba(31,35,40,0.14), 0 6px 14px rgba(31,35,40,0.12)',
              }}>
                <div style={{height: 14, background: c.c2}} />
                <div style={{position: 'absolute', left: 8, right: 8, bottom: 8, height: 46, display: 'flex', gap: 4}}>
                  {Array.from({length: cells}).map((_, k) => (
                    <div key={k} style={{flex: 1, borderRadius: 6,
                      background: `linear-gradient(${90 + k * 25}deg, ${c.c2}, rgba(255,255,255,0.75))`}} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* lajur 2: "putus-putus" terpotong, tiap suku kata satu klip */}
          {SYL.map((s, i) => {
            const pe = move(frame, kPutus + WDELAY[i], 14, 'land');
            const sp = 0.4 + 0.6 * move(frame, kPutus, 12, 'land');
            const spPrev = 0.4 + 0.6 * move(frame - 1, kPutus, 12, 'land');
            const pre = wordGeo.pre;
            const last = i === SYL.length - 1;
            const left = pre[i] + (i === 0 ? -16 : 24);
            const right = pre[i + 1] - (last ? -16 : 24);
            const cw = right - left;
            const dx = WSHIFT[i] * sp;
            return (
              <div key={s + i} style={{
                position: 'absolute', left: wordX0 + left + dx, top: LANE2.y + 10, width: cw, height: LANE2.h - 20,
                background: WFILL[i], borderRadius: 12, overflow: 'hidden', opacity: pe,
                transform: `translateY(${24 * (1 - pe) + WDY[i] * sp}px)`,
                filter: `blur(${blurPx(sp, spPrev, Math.abs(WSHIFT[i]) + 24)}px)`,
                boxShadow: 'inset 0 0 0 2px rgba(31,35,40,0.14), 0 6px 14px rgba(31,35,40,0.12)',
              }}>
                <div style={{position: 'absolute', left: -left, top: 0, height: '100%', display: 'flex', alignItems: 'center',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: WORD_FS, lineHeight: 1, color: C.tinta, whiteSpace: 'nowrap',
                  paddingTop: 6}}>{WORD}</div>
              </div>
            );
          })}

          {/* playhead */}
          <div style={{position: 'absolute', left: phX - 2, top: RULER_Y - 2, width: 4, height: LANE2.y + LANE2.h - RULER_Y + 14,
            background: C.tinta, borderRadius: 2, opacity: move(frame, mulai + 14, 8, 'reveal')}} />
          <div style={{position: 'absolute', left: phX - 12, top: RULER_Y - 6, width: 24, height: 20, background: C.tinta,
            clipPath: 'polygon(0 0, 100% 0, 100% 55%, 50% 100%, 0 55%)', opacity: move(frame, mulai + 14, 8, 'reveal')}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const objekK05 = (p: K05Props): {nama: string; frame: number; peran: string}[] => [
  {nama: 'panel timeline', frame: p.mulai, peran: 'objek-mendarat'},
  {nama: 'klip putus', frame: p.kSlop, peran: 'putus'},
  {nama: 'AI slop', frame: p.kSlop + 2, peran: 'kata-hero'},
  {nama: 'putus-putus', frame: p.kPutus, peran: 'putus'},
];

