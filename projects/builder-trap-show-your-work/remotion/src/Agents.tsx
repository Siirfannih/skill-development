import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { Stage, Layer } from './Stage';

// OpenBot plush agents — real assets from the OpenBot app (body + eye pills).
// Eye pads (w,h), split and gaze follow the app's AgentAvatar definitions.
type Pad = [number, number, number]; // w, h, tilt
export type AgentId = 'fred' | 'malu' | 'cloe' | 'vita' | 'nexo' | 'yoshi';
const DEF: Record<AgentId, { split: number; pads: [Pad, Pad]; gaze: [number, number]; d: [[number, number], [number, number]]; ink: string }> = {
  nexo: { split: 16, pads: [[0.205, 0.43, -28], [0.205, 0.43, 35]], gaze: [1, -7], d: [[0.035, -0.065], [-0.015, -0.058]], ink: '#e45206' },
  vita: { split: 17, pads: [[0.27, 0.51, 3], [0.49, 0.13, -4]], gaze: [-4, 5], d: [[0.034, -0.053], [-0.026, -0.055]], ink: '#22c377' },
  cloe: { split: 20, pads: [[0.33, 0.12, 28], [0.34, 0.11, -26]], gaze: [3, 16], d: [[0.025, -0.038], [-0.042, -0.04]], ink: '#df2986' },
  malu: { split: 15, pads: [[0.23, 0.42, -3], [0.19, 0.18, 0]], gaze: [9, 4], d: [[0.009, -0.004], [-0.026, 0]], ink: '#9a55ef' },
  yoshi: { split: 18, pads: [[0.3, 0.16, 17], [0.31, 0.15, -18]], gaze: [11, 20], d: [[0.039, 0.008], [-0.028, 0.013]], ink: '#e94741' },
  fred: { split: 21, pads: [[0.46, 0.5, 0], [0.48, 0.5, 0]], gaze: [7, -3], d: [[0.039, -0.036], [-0.055, -0.038]], ink: '#efb428' },
};
export const AGENT_INK = (id: AgentId) => DEF[id].ink;

const wob = (t: number, p: number, ph: number) => Math.sin((t / p) * Math.PI * 2 + ph);

export const Agent: React.FC<{ id: AgentId; size: number; t: number; seed?: number; talk?: number; look?: [number, number] }> = ({ id, size, t, seed = 0, talk = 0, look = [0, 0] }) => {
  const D = DEF[id];
  const B = size;
  // idle life: float, breath, tiny roll; blink every ~3.3 s
  const fy = wob(t, 2.6, seed) * B * 0.012;
  const roll = wob(t, 4.1, seed * 2) * 2.2;
  const breath = 1 + wob(t, 3.4, seed) * 0.012 + talk * Math.abs(Math.sin(t * 11)) * 0.025;
  const bt = (t + seed * 0.7) % 3.3;
  const lid = bt < 0.12 ? 0.12 : bt < 0.2 ? interpolate(bt, [0.12, 0.2], [0.12, 1]) : 1;
  const k = B * 0.62 * 0.36 * (id === 'fred' ? 1 : 1.75);
  const gx = (D.gaze[0] + look[0]) * B * 0.0035, gy = (D.gaze[1] + look[1]) * B * 0.0025;
  return (
    <div style={{ position: 'relative', width: B, height: B, transform: `translateY(${fy}px) rotate(${roll}deg) scale(${breath})` }}>
      <div style={{ position: 'absolute', left: B * 0.2, right: B * 0.2, bottom: B * 0.13, height: B * 0.06, borderRadius: '50%', background: 'rgba(0,0,0,0.28)', filter: `blur(${B * 0.03}px)` }} />
      <Img src={staticFile(`agents/${id}-corps.webp`)} style={{ position: 'absolute', inset: 0, width: B, height: B }} />
      {D.pads.map(([w, h, tilt], i) => {
        const horiz = w > h;
        const ew = w * k, eh = h * k;
        const cx = B / 2 + (i === 0 ? -1 : 1) * D.split * B * 0.0058 + D.d[i][0] * B + gx;
        const cy = B * 0.49 + D.d[i][1] * B + gy;
        return (
          <Img key={i} src={staticFile(`agents/${id}-oeil${i}-${horiz ? 'x' : 'y'}.c.png`)} style={{
            position: 'absolute', left: cx - ew / 2, top: cy - eh / 2, width: ew, height: eh, objectFit: 'fill',
            transform: `rotate(${tilt * 0.35}deg) scaleY(${lid})`,
          }} />
        );
      })}
    </div>
  );
};

// ---------- editorial world (ref 01): light studio, red type, live chat canvas ----------
const inkRed = '#1A3AD0';
type Line = { id: AgentId; name: string; text: string; at: number; x: number; y: number; side: 'l' | 'r' };
export const AgentsWorld: React.FC<{ t: number; t0: number; font: { inter: string; tight: string; mono: string }; out: number }> = ({ t, t0, font, out }) => {
  const f = useCurrentFrame();
  const L: Line[] = [
    { id: 'fred', name: 'Creative Pro', text: 'Status: done. Laporan audit siap.', at: t0 + 0.35, x: 960, y: 300, side: 'r' },
    { id: 'cloe', name: 'Developer', text: 'Status: done. Result: audit.', at: t0 + 1.0, x: 660, y: 470, side: 'l' },
    { id: 'malu', name: 'Sales Ops', text: 'Status: done. Result: audit.', at: t0 + 1.55, x: 1260, y: 470, side: 'r' },
    { id: 'vita', name: 'Content Research', text: 'Audit selesai dan dikirim.', at: t0 + 2.1, x: 680, y: 760, side: 'l' },
    { id: 'nexo', name: 'Content Strategy', text: 'The audit report is ready.', at: t0 + 2.6, x: 1240, y: 760, side: 'r' },
    { id: 'yoshi', name: 'Writing Partner', text: 'Laporan audit saya sudah selesai.', at: t0 + 3.05, x: 960, y: 640, side: 'r' },
  ];
  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const k = interpolate(t, [t0, t0 + 4.55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cam = { z: interpolate(k, [0, 1], [-140, 90], { easing: ease }), ry: interpolate(k, [0, 1], [7, -6]), rx: 5, x: interpolate(k, [0, 1], [-60, 60]) };
  const sp = (at: number) => spring({ frame: Math.round((t - at) * 30), fps: 30, config: { damping: 12, stiffness: 160, mass: 0.6 } });
  const links = (
    <svg width="1920" height="1080" style={{ position: 'absolute' }}>
      {L.slice(1).map((l, i) => {
        const p = interpolate(t, [l.at - 0.25, l.at + 0.35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const x0 = L[0].x, y0 = L[0].y + 40;
        const len = Math.hypot(l.x - x0, l.y - y0);
        return <line key={i} x1={x0} y1={y0} x2={l.x} y2={l.y} stroke={inkRed} strokeOpacity={0.4} strokeWidth={2} strokeDasharray={`${len}`} strokeDashoffset={len * (1 - p)} />;
      })}
      {L.slice(1).map((l, i) => {
        if (t < l.at + 0.3) return null;
        const u = ((t - l.at) * 0.9 + i * 0.17) % 1;
        const x0 = L[0].x, y0 = L[0].y + 40;
        return <circle key={'p' + i} cx={x0 + (l.x - x0) * u} cy={y0 + (l.y - y0) * u} r={6} fill={inkRed} />;
      })}
    </svg>
  );
  return (
    <AbsoluteFill style={{ opacity: out, background: '#F6F5F1' }}>
      <Stage cam={cam}>
        {/* L1 light gradient world (oversized) */}
        <Layer z={-800}>
          <div style={{ position: 'absolute', left: -1500, top: -1000, width: 4920, height: 3080, background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F5F1 60%, #DCE4FF 100%)' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(40,39,35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(40,39,35,0.05) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          </div>
        </Layer>
        {/* L2 the system: links + live packets */}
        <Layer z={-140}>{links}</Layer>
        {/* L3 live chat canvas */}
        <Layer z={50}>
          {L.map((l, i) => {
            if (t < l.at) return null;
            const size = i === 0 ? 230 : 190;
            const typing = t >= l.at && t < l.at + 0.45;
            const nChars = Math.floor(interpolate(t, [l.at + 0.45, l.at + 0.45 + l.text.length * 0.022], [0, l.text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
            const bub = sp(l.at);
            const bx = l.side === 'r' ? l.x + size * 0.38 : l.x - size * 0.38 - 360;
            return (
              <div key={l.id} style={{ position: 'absolute', left: bx, top: l.y - size * 0.42, width: 360, transform: `scale(${0.85 + bub * 0.15})`, opacity: Math.min(1, bub * 1.6), transformOrigin: l.side === 'r' ? '0% 100%' : '100% 100%' }}>
                <div style={{ fontFamily: font.inter, fontWeight: 700, fontSize: 15, color: '#282723', marginBottom: 6, letterSpacing: '0.01em' }}>{l.name}<span style={{ color: '#6B6A64', fontWeight: 500, marginLeft: 8 }}>now</span></div>
                <div style={{ display: 'inline-block', background: '#fff', borderRadius: 14, padding: '11px 16px', fontFamily: font.inter, fontSize: 19, color: '#282723', boxShadow: '0 10px 28px rgba(40,39,35,0.10)', border: '1px solid rgba(40,39,35,0.08)', minHeight: 24 }}>
                  {typing ? (
                    <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', height: 22 }}>
                      {[0, 1, 2].map((d) => <span key={d} style={{ width: 7, height: 7, borderRadius: 4, background: '#1A3AD0', opacity: 0.35 + 0.65 * Math.max(0, Math.sin((f / 30) * 12 - d * 0.9)) }} />)}
                    </span>
                  ) : l.text.slice(0, nChars)}
                </div>
              </div>
            );
          })}
        </Layer>
        {/* L4 the agents themselves, nearest to camera */}
        <Layer z={150}>
          {L.map((l, i) => {
            const a = sp(l.at - 0.3);
            if (a <= 0.001) return null;
            const size = i === 0 ? 230 : 190;
            const nChars = Math.floor(interpolate(t, [l.at + 0.45, l.at + 0.45 + l.text.length * 0.022], [0, l.text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
            const talk = t > l.at + 0.45 && nChars < l.text.length ? 1 : 0;
            return (
              <div key={l.id} style={{ position: 'absolute', left: l.x - size / 2, top: l.y - size / 2, transform: `scale(${a}) translateY(${(1 - a) * 40}px)`, transformOrigin: '50% 80%' }}>
                <Agent id={l.id} size={size} t={t} seed={i * 1.7} talk={talk} look={[l.side === 'r' ? 6 : -6, 0]} />
              </div>
            );
          })}
          {[[260, 220, 0.2], [1640, 240, 0.5], [1560, 850, 0.9], [300, 840, 1.3], [1660, 560, 1.7]].map(([x, y, d], i) => {
            const a = interpolate(t, [t0 + d, t0 + d + 0.25, t0 + d + 0.9, t0 + d + 1.2], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return <div key={'px' + i} style={{ position: 'absolute', left: x, top: y, opacity: a }}>
              <div style={{ width: 22, height: 22, background: inkRed, position: 'absolute' }} />
              <div style={{ width: 12, height: 12, background: '#1A3AD0', position: 'absolute', left: 30, top: -14 }} />
              <div style={{ width: 8, height: 8, background: '#0A1A4A', position: 'absolute', left: -16, top: 26 }} />
            </div>;
          })}
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
