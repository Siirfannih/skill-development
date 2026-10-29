import React from 'react';
import {Img, staticFile} from 'remotion';
import {ICONS} from '../lib/iconData';
import {F} from '../lib/theme';

export const Icon: React.FC<{name: string; size: number; color?: string; style?: React.CSSProperties}> = ({name, size, color, style}) => {
  const d = ICONS[name];
  if (!d) throw new Error('ikon tidak ada: ' + name);
  return (
    <svg
      viewBox={d.vb}
      width={size}
      height={size}
      style={{display: 'block', color: color ?? 'currentColor', fill: name.includes('-color') ? undefined : color ?? 'currentColor', ...style}}
      dangerouslySetInnerHTML={{__html: d.inner}}
    />
  );
};

/** Tile aplikasi AI seperti ikon app iOS (bentuk squircle, bayangan lembut). */
export const AppTile: React.FC<{app: 'chatgpt' | 'chatgptLight' | 'claude' | 'gemini' | 'whatsapp' | 'notion' | 'figma' | 'sheets' | 'gmail'; size: number; style?: React.CSSProperties}> = ({
  app,
  size,
  style,
}) => {
  const cfg: Record<string, {bg: string; icon: string; color?: string; scale: number}> = {
    chatgpt: {bg: '#000000', icon: 'openai', color: '#FFFFFF', scale: 0.62},
    chatgptLight: {bg: '#FFFFFF', icon: 'openai', color: '#0D0D0D', scale: 0.62},
    claude: {bg: '#F4EFE6', icon: 'claude-color', scale: 0.56},
    gemini: {bg: '#FFFFFF', icon: 'gemini-color', scale: 0.6},
    whatsapp: {bg: '#25D366', icon: 'si-whatsapp', color: '#FFFFFF', scale: 0.6},
    notion: {bg: '#FFFFFF', icon: 'si-notion', color: '#000000', scale: 0.58},
    figma: {bg: '#1E1E1E', icon: 'si-figma', color: '#FFFFFF', scale: 0.5},
    sheets: {bg: '#FFFFFF', icon: 'si-googlesheets', color: '#0F9D58', scale: 0.56},
    gmail: {bg: '#FFFFFF', icon: 'si-gmail', color: '#EA4335', scale: 0.56},
  };
  const c = cfg[app];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.225,
        background: c.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 ${size * 0.06}px ${size * 0.22}px rgba(0,0,0,0.16), inset 0 0 0 1px rgba(0,0,0,0.06)`,
        ...style,
      }}
    >
      <Icon name={c.icon} size={size * c.scale} color={c.color} />
    </div>
  );
};

export const Photo: React.FC<{src: string; w: number; h: number; radius?: number; pos?: string; style?: React.CSSProperties; dim?: number}> = ({
  src,
  w,
  h,
  radius = 0,
  pos = 'center',
  style,
  dim = 0,
}) => (
  <div style={{width: w, height: h, borderRadius: radius, overflow: 'hidden', position: 'relative', background: '#111', ...style}}>
    <Img src={staticFile(`photo/${src}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos}} />
    {dim > 0 ? <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${dim})`}} /> : null}
  </div>
);

/** Jendela macOS (Sequoia): sudut 12, traffic lights, judul tengah. */
export const MacWindow: React.FC<{
  w: number;
  h: number;
  title?: string;
  url?: string;
  dark?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({w, h, title, url, dark, children, style}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 14,
      overflow: 'hidden',
      background: dark ? '#1C1C1E' : '#FFFFFF',
      boxShadow: '0 40px 90px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    <div
      style={{
        height: 46,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 8,
        background: dark ? '#2A2A2C' : '#F3F3F3',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        position: 'relative',
      }}
    >
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <div key={c} style={{width: 13, height: 13, borderRadius: 7, background: c}} />
      ))}
      {url ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: Math.min(560, w * 0.5),
            height: 30,
            borderRadius: 8,
            background: dark ? '#3A3A3C' : '#E6E6E6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: F.sans,
            fontSize: 15,
            color: dark ? '#C7C7CC' : '#555',
          }}
        >
          {url}
        </div>
      ) : title ? (
        <div style={{position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: F.sans, fontSize: 15, fontWeight: 600, color: dark ? '#E5E5EA' : '#3C3C43'}}>
          {title}
        </div>
      ) : null}
    </div>
    <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}>{children}</div>
  </div>
);

export const Label: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = 'rgba(255,255,255,0.6)', size = 22, style}) => (
  <div style={{fontFamily: F.mono, fontSize: size, letterSpacing: '0.08em', textTransform: 'uppercase', color, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
