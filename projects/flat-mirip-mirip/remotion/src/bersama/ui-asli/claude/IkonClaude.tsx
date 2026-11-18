import React from 'react';

export type NamaIkonClaude = 'sidebar' | 'kiri' | 'kanan' | 'bawah' | 'chat' | 'code' | 'list' | 'terminal' | 'tugas' | 'baru' | 'globe' | 'folder' | 'more' | 'share' | 'monitor' | 'image' | 'file' | 'diamond' | 'plus' | 'enter' | 'mic' | 'gear' | 'play';
const PATH: Record<NamaIkonClaude, React.ReactNode> = {
  sidebar: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16"/></>,
  kiri: <path d="m15 5-7 7 7 7"/>, kanan: <path d="m9 5 7 7-7 7"/>, bawah: <path d="m6 9 6 6 6-6"/>,
  chat: <><path d="M12 20H4l2-4a8 8 0 1 1 13 1"/><circle cx="16" cy="16" r="5"/><path d="m19 20 2 1-1-3"/></>,
  code: <><path d="m7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18"/></>,
  list: <><path d="M9 5h12M9 12h12M9 19h12M3 5h.1M3 12h.1M3 19h.1"/></>,
  terminal: <><path d="m3 5 6 6-6 6m9 2h8"/></>,
  tugas: <><rect x="3" y="2" width="18" height="20" rx="3"/><path d="m7 8 3 3-3 3m6 1h4"/></>,
  baru: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 9h8m-4-4v8"/></>,
  globe: <><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></>,
  folder: <path d="M2 7V5h7l3 3h10v13H2Z"/>,
  more: <><circle cx="5" cy="12" r=".7"/><circle cx="12" cy="12" r=".7"/><circle cx="19" cy="12" r=".7"/></>,
  share: <><path d="M12 16V2m-6 6 6-6 6 6M4 14v7h16v-7"/></>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M9 21h6m-3-4v4"/></>,
  image: <><rect x="3" y="2" width="18" height="20" rx="3"/><circle cx="16" cy="8" r="2"/><path d="m3 15 5-4 7 10"/></>,
  file: <><path d="M6 3h12a3 3 0 0 1 3 3v7l-8 8H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/><path d="M21 12h-6a3 3 0 0 0-3 3v6"/></>,
  diamond: <><path d="m8 4 8 8-8 8-8-8ZM14 4l8 8-8 8"/></>,
  plus: <path d="M12 4v16M4 12h16"/>,
  enter: <path d="M21 5v5a4 4 0 0 1-4 4H4m5-5-5 5 5 5"/>,
  mic: <><rect x="8" y="2" width="8" height="14" rx="4"/><path d="M4 10v2a8 8 0 0 0 16 0v-2M12 20v3"/></>,
  gear: <><path d="m9 3 1-2h4l1 2 3 1 2 2-1 3 2 2v3l-2 1-1 3-3 1-1 2h-4l-1-2-3-1-2-3-2-1v-3l2-2 1-3 2-2Z"/><circle cx="12" cy="11" r="4"/></>,
  play: <path d="m9 5 10 7-10 7Z"/>,
};

export const IkonClaude: React.FC<{nama: NamaIkonClaude; size?: number; warna?: string}> = ({nama, size = 24, warna = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={warna} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" style={{display: 'block', flexShrink: 0}}>{PATH[nama]}</svg>
);
