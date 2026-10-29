import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {At, DEPTH, Layer, Stage} from '../lib/stage';
import {C, EASE_OUT, F} from '../lib/theme';
import {wf} from '../lib/timing';
import {KText, prog} from '../comp/text';
import {AppTile, Icon} from '../comp/ui';

/* Kartu tugas repetitif (bentuk UI nyata, bukan placeholder) */
const TASKS = [
  {icon: 'si-googlesheets', color: '#0F9D58', title: 'Rekap order mingguan', sub: '248 baris · salin manual'},
  {icon: 'si-gmail', color: '#EA4335', title: 'Balas konfirmasi pembayaran', sub: '37 email belum dibalas'},
  {icon: 'si-notion', color: '#111111', title: 'Input data pelanggan', sub: '112 entri baru'},
  {icon: 'si-googlesheets', color: '#0F9D58', title: 'Cocokkan stok gudang', sub: '3 sheet berbeda'},
  {icon: 'si-gmail', color: '#EA4335', title: 'Kirim ulang invoice', sub: '19 pelanggan'},
];
const TaskCard: React.FC<{t: (typeof TASKS)[number]}> = ({t}) => (
  <div
    style={{
      width: 620,
      height: 132,
      borderRadius: 22,
      background: '#FFFFFF',
      boxShadow: '0 18px 50px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      padding: '0 34px',
      fontFamily: F.sans,
    }}
  >
    <div style={{width: 70, height: 70, borderRadius: 16, background: '#F4F4F2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={t.icon} size={38} color={t.color} />
    </div>
    <div>
      <div style={{fontSize: 31, fontWeight: 600, color: C.ink, letterSpacing: '-0.01em'}}>{t.title}</div>
      <div style={{fontSize: 23, color: 'rgba(17,17,17,0.5)', marginTop: 4}}>{t.sub}</div>
    </div>
  </div>
);

/* Piktogram manusia (manusia = piktogram, aturan inti #31) */
const Person: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 100 160">
    <circle cx="50" cy="28" r="24" fill={color} />
    <path d="M10 160 C10 92 26 66 50 66 C74 66 90 92 90 160 Z" fill={color} />
  </svg>
);

export const S2: React.FC<{start: number}> = ({start}) => {
  const fr = useCurrentFrame();
  const g = (x: number) => x - start;
  const len = g(wf('03_kenyataan', 'Tapi'));
  const ai = g(wf('02_janji', 'AI'));
  const ambil = g(wf('02_janji', 'mengambil'));
  const pek = g(wf('02_janji', 'pekerjaan'));
  const supaya = g(wf('02_janji', 'supaya'));
  const manusia = g(wf('02_janji', 'manusia'));
  const kreatif = g(wf('02_janji', 'kreatif'));
  const TILE = {x: 560, y: 60};
  const tilesIn = prog(fr, ai - 2, ai + 10);
  const tasksIn = prog(fr, ai - 6, ai + 6);
  const glow = prog(fr, manusia, manusia + 30, 'inout');
  return (
    <Stage
      len={len}
      bg={C.paper}
      keys={[
        {f: 0, x: 0, y: 0, s: 1},
        {f: ai - 16, x: 0, y: 0, s: 1},
        {f: ai + 6, x: -20, y: 40, s: 1.24, ease: EASE_OUT},
        {f: supaya - 6, x: 40, y: 40, s: 1.3},
        {f: supaya + 10, x: 0, y: 2200, s: 1, ease: EASE_OUT},
        {f: manusia + 6, x: 0, y: 2240, s: 1.35},
        {f: kreatif - 2, x: 0, y: 2240, s: 1.42},
        {f: kreatif + 8, x: 0, y: 2220, s: 0.92, ease: EASE_OUT},
        {f: len, x: 0, y: 2220, s: 0.9},
      ]}
    >
      {/* MID: tugas → AI */}
      <Layer depth={DEPTH.MID}>
        {TASKS.map((t, i) => {
          const sf = ambil + i * 7;
          const p = prog(fr, sf, sf + 11, 'in');
          const tx = interpolate(p, [0, 1], [-330, TILE.x]);
          const ty = interpolate(p, [0, 1], [130 + i * 22 - 44, TILE.y]);
          const sc = interpolate(p, [0, 1], [1, 0.08]);
          return (
            <At
              key={i}
              x={tx}
              y={ty - (1 - tasksIn) * 60}
              style={{
                opacity: tasksIn * (1 - prog(fr, sf + 8, sf + 11)),
                transform: `translate(-50%,-50%) scale(${sc}) rotate(${(i % 2 ? 1 : -1) * 1.5 * (1 - p)}deg)`,
                zIndex: 10 - i,
              }}
            >
              <TaskCard t={t} />
            </At>
          );
        })}
        <At x={TILE.x} y={TILE.y} style={{display: 'flex', gap: 30, opacity: tilesIn, transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * tilesIn})`}}>
          <AppTile app="chatgpt" size={130} style={{transform: `scale(${1 + 0.06 * Math.max(0, Math.sin(Math.max(0, fr - ambil) * 0.6)) * prog(fr, ambil, ambil + 4) * (1 - prog(fr, ambil + 40, ambil + 44))})`}} />
          <AppTile app="claude" size={130} />
          <AppTile app="gemini" size={130} />
        </At>
        {/* manusia + cahaya */}
        <At x={0} y={2240}>
          <div
            style={{
              width: 900,
              height: 900,
              borderRadius: 450,
              background: `radial-gradient(circle, rgba(37,99,235,${0.16 * glow}) 0%, rgba(37,99,235,0) 62%)`,
            }}
          />
        </At>
        <At x={0} y={2270}>
          <Person size={190} color={C.ink} />
        </At>
        {[
          {app: 'figma', a: -58, r: 360},
          {app: 'notion', a: 0, r: 330},
          {app: 'chatgpt', a: 58, r: 360},
        ].map((o, i) => {
          const p = prog(fr, kreatif - 2 + i * 4, kreatif + 10 + i * 4);
          const ang = ((o.a - 90) * Math.PI) / 180;
          return (
            <At key={o.app} x={Math.cos(ang) * o.r * (0.7 + 0.3 * p)} y={2240 + Math.sin(ang) * o.r * (0.7 + 0.3 * p) + 60} style={{opacity: p}}>
              <AppTile app={o.app as any} size={110} />
            </At>
          );
        })}
      </Layer>
      {/* TXT */}
      <Layer depth={DEPTH.TXT}>
        <At x={0} y={0}>
          <KText
            lines={[[{t: 'Janjinya', f: 0}, {t: 'dulu', f: g(wf('02_janji', 'dulu'))}, {t: 'sederhana.', f: g(wf('02_janji', 'sederhana')), k: 'key'}]]}
            size={104}
            color={C.ink}
            keyColor={C.ink}
            weight={650}
            exitF={ai - 14}
          />
        </At>
        <At x={-20 * DEPTH.TXT} y={-300 + 40 * DEPTH.TXT}>
          <KText
            lines={[[{t: 'AI', f: ai}, {t: 'mengambil', f: ambil}, {t: 'pekerjaan', f: pek}, {t: 'yang', f: g(wf('02_janji', 'yang'))}, {t: 'membosankan.', f: g(wf('02_janji', 'membosankan')), k: 'key'}]]}
            size={62}
            color={C.ink}
            keyColor={C.blue}
            exitF={supaya - 6}
          />
        </At>
      </Layer>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 120}}>
          <KText
            lines={[[{t: 'supaya', f: supaya}, {t: 'manusia', f: manusia}, {t: 'bisa', f: g(wf('02_janji', 'bisa'))}, {t: 'fokus', f: g(wf('02_janji', 'fokus'))}], [{t: 'menjadi', f: g(wf('02_janji', 'menjadi'))}, {t: 'lebih', f: g(wf('02_janji', 'lebih'))}, {t: 'kreatif.', f: kreatif, k: 'keyserif'}]]}
            size={76}
            color={C.ink}
            keyColor={C.blue}
          />
        </AbsoluteFill>
    </Stage>
  );
};
