// Layar macOS dibangun sebagai kode (r7 Revisi Irfan #2, TASK-r7 M2; acuan handoff/ref_mac_desktop_irfan.webp 1200×750).
// Posisi dari acuan: x × 1,6, y × 1,44 (16:10 → 16:9). Semua koordinat = px dunia 1920×1080 (layar Mac = frame pada
// kamera normal). Ikon: simple-icons (CC0) + lucide; ikon lain digambar SVG/CSS.
import React from 'react';
import { siApple, siAppstore, siNotion, siSpotify } from 'simple-icons';
import { Wifi, Search, BatteryMedium, Settings, SlidersHorizontal, Sunrise, Sunset, CircleDot } from 'lucide-react';
import { FONT } from '../engine/theme';
import { Logo } from '../engine/Logo';

export const MENU_H = 30; // 2,8 % tinggi
/** tanggal/jam layar (TASK-r7 M2); 15 Nov 2026 = Minggu (putusan Sutradara Q1 r7) */
export const MAC_DAY = 'Sun';
const INK = '#1D1D1F';

const Si: React.FC<{ icon: { path: string }; size: number; color: string }> = ({ icon, size, color }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}><path d={icon.path} fill={color} /></svg>
);

// ---------------- menu bar ----------------
export const MenuBar: React.FC<{ app: 'Finder' | 'ChatGPT'; time: string }> = ({ app, time }) => {
  const items = app === 'Finder' ? ['File', 'Edit', 'View', 'Go', 'Window', 'Help'] : ['File', 'Edit', 'View', 'Window', 'Help'];
  const ic = { size: 19, strokeWidth: 1.9, color: INK };
  return (
    <div
      style={{
        position: 'absolute', left: 0, top: 0, width: 1920, height: MENU_H, background: 'rgba(244,244,246,0.74)',
        borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', padding: '0 20px', boxSizing: 'border-box',
        fontFamily: FONT.sf, fontSize: 15, color: INK, gap: 24, whiteSpace: 'nowrap',
      }}
    >
      <Si icon={siApple} size={17} color={INK} />
      <span style={{ fontWeight: 700 }}>{app}</span>
      {items.map((t) => <span key={t} style={{ fontWeight: 500 }}>{t}</span>)}
      <div style={{ flex: 1 }} />
      <CircleDot {...ic} />
      <span style={{ fontWeight: 500, fontSize: 14 }}>47%</span>
      <BatteryMedium size={24} strokeWidth={1.7} color={INK} style={{ marginLeft: -16 }} />
      <Wifi {...ic} />
      <Search {...ic} />
      <SlidersHorizontal {...ic} />
      <span style={{ fontWeight: 500 }}>{`${MAC_DAY} Nov 15 ${time}`}</span>
    </div>
  );
};

// ---------------- ikon desktop (2×2, kiri-atas) ----------------
const Folder: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 64 52" width={size} height={size * 52 / 64}>
    <defs>
      <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FD0FB" /><stop offset="1" stopColor="#3BA5F2" /></linearGradient>
      <linearGradient id="ff" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9ADBFD" /><stop offset="1" stopColor="#56B6F6" /></linearGradient>
    </defs>
    <path d="M3 8 Q3 4 7 4 L22 4 Q25 4 27 7 L29 9 L57 9 Q61 9 61 13 L61 46 Q61 49 58 49 L6 49 Q3 49 3 46 Z" fill="url(#fb)" />
    <path d="M2 17 Q2 14 5 14 L59 14 Q62 14 62 17 L61 46 Q61 50 57 50 L7 50 Q3 50 3 46 Z" fill="url(#ff)" />
  </svg>
);
export const DESK_ICONS = [
  { x: 493, y: 187, label: 'personal !' }, { x: 656, y: 187, label: 'uni !' },
  { x: 493, y: 310, label: 'random !' }, { x: 656, y: 310, label: 'important !' },
];
export const DesktopIcons: React.FC = () => (
  <>
    {DESK_ICONS.map((d) => (
      <div key={d.label} style={{ position: 'absolute', left: d.x - 60, top: d.y - 30, width: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.18))' }}><Folder size={62} /></div>
        <div style={{ marginTop: 6, fontFamily: FONT.sf, fontWeight: 600, fontSize: 14, color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.85), 0 0 6px rgba(0,0,0,0.45)' }}>{d.label}</div>
      </div>
    ))}
  </>
);

// ---------------- widget jam flip (tengah-atas) ----------------
const FLIP = { x: [739, 893, 1046], y: 252, w: 135, h: 118 };
export const FlipClock: React.FC<{ hh: string; mm: string; ss: string }> = ({ hh, mm, ss }) => {
  const pale = '#F6EDB8';
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, fontFamily: FONT.sf }}>
      <div style={{ position: 'absolute', left: FLIP.x[0], top: FLIP.y - 34, fontSize: 21, fontWeight: 500, color: pale, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>Nov 15 2026</div>
      <div style={{ position: 'absolute', left: FLIP.x[2] + FLIP.w - 60, width: 60, textAlign: 'right', top: FLIP.y - 34, fontSize: 21, fontWeight: 500, color: pale, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>{MAC_DAY}</div>
      {[hh, mm, ss].map((v, k) => (
        <div key={k} style={{ position: 'absolute', left: FLIP.x[k], top: FLIP.y, width: FLIP.w, height: FLIP.h, borderRadius: 14, background: 'linear-gradient(180deg, #353535 0%, #2A2A2A 50%, #232323 50%, #2C2C2C 100%)', boxShadow: '0 8px 18px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={{ fontSize: 84, fontWeight: 700, color: '#F7F2DE', letterSpacing: '0.02em', lineHeight: 1 }}>{v}</span>
          <div style={{ position: 'absolute', left: 0, right: 0, top: FLIP.h / 2 - 1, height: 2, background: 'rgba(0,0,0,0.55)' }} />
          {k === 0 ? <div style={{ position: 'absolute', left: 12, top: 9, fontSize: 14, fontWeight: 600, color: '#F7F2DE' }}>PM</div> : null}
        </div>
      ))}
      <div style={{ position: 'absolute', left: FLIP.x[0], width: FLIP.x[2] + FLIP.w - FLIP.x[0], top: FLIP.y + FLIP.h + 14, textAlign: 'center', fontSize: 21, fontWeight: 500, color: pale, opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>Week 46, Day 15</div>
    </div>
  );
};

// ---------------- widget kalender November 2026 (kanan-atas) ----------------
export const CalendarWidget: React.FC = () => {
  const navy = '#1C3F73';
  const days: (number | null)[] = [];
  // 1 Nov 2026 = Minggu → kolom Su
  for (let d = 1; d <= 30; d++) days.push(d);
  const rows: { v: number; dim: boolean }[][] = [];
  const all = [...days.map((v) => ({ v: v as number, dim: false })), ...[1, 2, 3, 4, 5].map((v) => ({ v, dim: true }))];
  for (let r = 0; r < 5; r++) rows.push(all.slice(r * 7, r * 7 + 7));
  const cw = 26, x0 = 1211;
  return (
    <div style={{ position: 'absolute', left: x0, top: 170, width: 7 * cw, fontFamily: FONT.sf, color: navy }}>
      <div style={{ fontSize: 17, fontWeight: 700, marginLeft: 2, marginBottom: 4 }}>Nov 2026</div>
      <div style={{ display: 'flex', fontSize: 12, fontWeight: 700 }}>{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => <div key={d} style={{ width: cw, textAlign: 'center' }}>{d}</div>)}</div>
      {rows.map((r, k) => (
        <div key={k} style={{ display: 'flex', fontSize: 13, fontWeight: 500, height: 21, alignItems: 'center' }}>
          {r.map((c, j) => (
            <div key={j} style={{ width: cw, textAlign: 'center', opacity: c.dim ? 0.35 : 1 }}>
              <span style={c.v === 15 && !c.dim ? { background: 'rgba(28,63,115,0.16)', borderRadius: 4, padding: '1px 3px' } : undefined}>{c.v}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, fontWeight: 500, alignItems: 'center' }}>
        <Sunrise size={15} strokeWidth={2} color={navy} /> <span style={{ marginLeft: -8 }}>6:01 AM</span>
        <Sunset size={15} strokeWidth={2} color={navy} /> <span style={{ marginLeft: -8 }}>5:31 PM</span>
      </div>
    </div>
  );
};

// ---------------- dock ----------------
export const DOCK = { h: 94, icon: 78, gap: 9, pad: 10, sep: 22, bottom: 8 };
export type DockApp = 'finder' | 'launchpad' | 'calendar' | 'notes' | 'appstore' | 'settings' | 'chatgpt' | 'chrome' | 'notion' | 'spotify' | 'trash';
export const DOCK_APPS: DockApp[] = ['finder', 'launchpad', 'calendar', 'notes', 'appstore', 'settings', 'chatgpt', 'chrome', 'notion', 'spotify', 'trash'];
const N_ICON = DOCK_APPS.length;
export const DOCK_W = N_ICON * DOCK.icon + (N_ICON - 2) * DOCK.gap + DOCK.sep + 2 * DOCK.pad;
export const DOCK_Y = 1080 - DOCK.bottom - DOCK.h;
/** pusat ikon ke-k (dunia) */
export const dockIconAt = (k: number) => {
  const sep = k >= N_ICON - 1 ? DOCK.sep - DOCK.gap : 0;
  return { x: 960 - DOCK_W / 2 + DOCK.pad + DOCK.icon / 2 + k * (DOCK.icon + DOCK.gap) + sep, y: DOCK_Y + 6 + DOCK.icon / 2 };
};

const Squircle: React.FC<{ bg: string; children?: React.ReactNode; s: number }> = ({ bg, children, s }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.225, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', boxShadow: '0 3px 8px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.05)' }}>{children}</div>
);

export const DockIcon: React.FC<{ app: DockApp; s: number }> = ({ app, s }) => {
  switch (app) {
    case 'finder':
      return (
        <Squircle s={s} bg="linear-gradient(90deg, #2A8BF0 0 50%, #DCEFFC 50% 100%)">
          <svg viewBox="0 0 78 78" width={s} height={s} style={{ position: 'absolute', left: 0, top: 0 }}>
            <path d="M44 6 C36 24 33 40 37 50 L43 50 C41 60 42 68 44 74" fill="none" stroke="#1B2A44" strokeWidth={3} strokeLinecap="round" />
            <path d="M24 24 L24 33 M55 24 L55 33" stroke="#1B2A44" strokeWidth={4} strokeLinecap="round" />
            <path d="M20 54 Q39 66 58 54" fill="none" stroke="#1B2A44" strokeWidth={3} strokeLinecap="round" />
          </svg>
        </Squircle>
      );
    case 'launchpad':
      return (
        <Squircle s={s} bg="linear-gradient(180deg, #5E6670, #2E333A)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: s * 0.07, width: s * 0.62 }}>
            {['#FF5F57', '#FEBC2E', '#28C840', '#2AA7FF', '#AF52DE', '#FF9F0A', '#5AC8FA', '#FF375F', '#30D158'].map((c) => <div key={c} style={{ width: s * 0.16, height: s * 0.16, borderRadius: s * 0.045, background: c }} />)}
          </div>
        </Squircle>
      );
    case 'calendar':
      return (
        <Squircle s={s} bg="#FFFFFF">
          <div style={{ position: 'absolute', top: s * 0.08, width: '100%', textAlign: 'center', fontFamily: FONT.sf, fontWeight: 700, fontSize: s * 0.17, color: '#FF3B30', letterSpacing: '0.02em' }}>NOV</div>
          <div style={{ position: 'absolute', top: s * 0.26, width: '100%', textAlign: 'center', fontFamily: FONT.sf, fontWeight: 400, fontSize: s * 0.55, color: '#1D1D1F', lineHeight: 1 }}>15</div>
        </Squircle>
      );
    case 'notes':
      return (
        <Squircle s={s} bg="linear-gradient(180deg, #FFD52E 0 30%, #FFFFFF 30% 100%)">
          <div style={{ position: 'absolute', left: s * 0.14, right: s * 0.14, top: s * 0.42, display: 'flex', flexDirection: 'column', gap: s * 0.11 }}>
            {[0, 1, 2].map((k) => <div key={k} style={{ height: 2, background: '#D6D6D6' }} />)}
          </div>
        </Squircle>
      );
    case 'appstore':
      return <Squircle s={s} bg="linear-gradient(180deg, #1BC8FB, #1A6CF0)"><Si icon={siAppstore} size={s * 0.6} color="#FFFFFF" /></Squircle>;
    case 'settings':
      return <Squircle s={s} bg="linear-gradient(180deg, #D6D6DB, #8E8E93)"><Settings size={s * 0.7} strokeWidth={1.5} color="#3A3A3C" /></Squircle>;
    case 'chatgpt':
      return <Squircle s={s} bg="#FFFFFF"><Logo name="openai" size={s * 0.6} color="#0D0D0D" /></Squircle>;
    case 'chrome':
      return (
        <div style={{ width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: s * 0.86, height: s * 0.86, borderRadius: '50%', background: 'conic-gradient(from -60deg, #EA4335 0deg 120deg, #FBBC04 120deg 240deg, #34A853 240deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(0,0,0,0.20)' }}>
            <div style={{ width: s * 0.4, height: s * 0.4, borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: s * 0.3, height: s * 0.3, borderRadius: '50%', background: '#4285F4' }} />
            </div>
          </div>
        </div>
      );
    case 'notion':
      return <Squircle s={s} bg="#FFFFFF"><Si icon={siNotion} size={s * 0.62} color="#000000" /></Squircle>;
    case 'spotify':
      return (
        <div style={{ width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: s * 0.8, height: s * 0.8, borderRadius: '50%', background: '#000' }} />
          <div style={{ position: 'relative', display: 'flex', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}><Si icon={siSpotify} size={s * 0.86} color="#1ED760" /></div>
        </div>
      );
    case 'trash':
      return (
        <svg viewBox="0 0 78 78" width={s} height={s}>
          <defs><linearGradient id="tr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#E9EAEE" /><stop offset="0.5" stopColor="#FBFBFD" /><stop offset="1" stopColor="#D6D8DE" /></linearGradient></defs>
          <path d="M17 14 L61 14 L56 72 Q55 75 52 75 L26 75 Q23 75 22 72 Z" fill="url(#tr)" stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
          <ellipse cx={39} cy={14} rx={22} ry={4} fill="#F3F4F7" stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
          {[28, 39, 50].map((x) => <path key={x} d={`M${x} 22 L${x + (x - 39) * 0.08} 68`} stroke="rgba(0,0,0,0.10)" strokeWidth={1.5} />)}
        </svg>
      );
  }
  return null;
};

/** dock kaca terang. press/bounce/running berlaku untuk ikon ChatGPT; dot = app yang sedang berjalan */
export const Dock: React.FC<{ press?: number; bounce?: number; chatgptRunning?: number }> = ({ press = 0, bounce = 0, chatgptRunning = 0 }) => {
  const running: Partial<Record<DockApp, number>> = { finder: 1, chrome: 1, spotify: 1, chatgpt: chatgptRunning };
  return (
    <div
      style={{
        position: 'absolute', left: 960 - DOCK_W / 2, top: DOCK_Y, width: DOCK_W, height: DOCK.h, borderRadius: 24,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.52), rgba(255,255,255,0.36))',
        boxShadow: '0 14px 34px rgba(0,0,0,0.22), inset 0 0 0 1.5px rgba(255,255,255,0.6)',
      }}
    >
      {DOCK_APPS.map((a, k) => {
        const c = dockIconAt(k);
        const isGpt = a === 'chatgpt';
        const sc = isGpt ? 1 - 0.12 * Math.sin(Math.PI * Math.min(1, Math.max(0, press))) : 1;
        return (
          <React.Fragment key={a}>
            {a === 'trash' ? <div style={{ position: 'absolute', left: c.x - (960 - DOCK_W / 2) - DOCK.icon / 2 - DOCK.sep / 2 - 0.5, top: 12, width: 1, height: DOCK.h - 24, background: 'rgba(0,0,0,0.18)' }} /> : null}
            <div
              style={{
                position: 'absolute', left: c.x - (960 - DOCK_W / 2) - DOCK.icon / 2, top: 6, width: DOCK.icon, height: DOCK.icon,
                transform: `translateY(${isGpt ? -bounce * DOCK.icon : 0}px) scale(${sc})`, transformOrigin: '50% 100%',
                filter: isGpt && press > 0 && press < 1 ? 'brightness(0.8)' : undefined,
              }}
            >
              <DockIcon app={a} s={DOCK.icon} />
            </div>
            {running[a] ? <div style={{ position: 'absolute', left: c.x - (960 - DOCK_W / 2) - 2.5, top: DOCK.h - 8, width: 5, height: 5, borderRadius: 3, background: 'rgba(20,20,20,0.75)', opacity: running[a] }} /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
