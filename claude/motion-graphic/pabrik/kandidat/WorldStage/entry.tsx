// dibuat otomatis oleh pabrik/uji.py dari meta.json; jangan disunting.
import React, { useLayoutEffect } from 'react';
import { Composition, getInputProps, registerRoot, useCurrentFrame } from 'remotion';
import { DemoA, DemoB } from './Demo';
import meta from './meta.json';

const probeOklusi = (frame: number) => {
  const st = document.createElement('style'); st.textContent = '*{pointer-events:auto !important}'; document.head.appendChild(st);
  const out: any[] = [];
  const eff = (e: Element | null) => { let o = 1; while (e) { const cs = getComputedStyle(e); o *= parseFloat(cs.opacity || '1'); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; e = e.parentElement; } return o; };
  const rel = (a: Element, b: Element) => a === b || a.contains(b) || b.contains(a);
  const punyaTeks = (e: Element) => Array.from(e.childNodes).some((n) => n.nodeType === 3 && (n.textContent || '').trim());
  const dicat = (e: Element) => {
    const cs = getComputedStyle(e); if (parseFloat(cs.opacity) < 0.05 || cs.visibility === 'hidden') return false;
    const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/); const al = m ? (m[1].split(',').length > 3 ? parseFloat(m[1].split(',')[3]) : 1) : 0;
    return al > 0.05 || cs.backgroundImage !== 'none' || ['svg', 'img', 'canvas', 'video'].includes(e.tagName.toLowerCase()) || punyaTeks(e) || parseFloat(cs.borderTopWidth) > 0;
  };
  const W = window.innerWidth, H = window.innerHeight;
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    Array.from(el.childNodes).filter((n) => n.nodeType === 3 && (n.textContent || '').trim()).forEach((n) => {
      const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect(); if (q.width < 1 || q.height < 1) return;
      let nS = 0, nT = 0, nO = 0;
      for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) {
        const x = q.x + q.width * (0.1 + 0.8 * i / 7), y = q.y + q.height * (0.2 + 0.6 * j / 2);
        if (x < 0 || y < 0 || x >= W || y >= H) continue; nS++;
        for (const e of document.elementsFromPoint(x, y)) { if (rel(e, el)) break; if (dicat(e)) { nT++; if (!punyaTeks(e)) nO++; break; } }
      }
      const pad = 0.15 * q.height;
      out.push({ teks: (n.textContent || '').trim().slice(0, 60), x: q.x, y: q.y, w: q.width, h: q.height,
        fs: parseFloat(cs.fontSize) * ((el as HTMLElement).offsetWidth > 0 ? r.width / (el as HTMLElement).offsetWidth : 1), op: eff(el),
        tutup: nS ? nT / nS : 0, tutup_objek: nS ? nO / nS : 0,
        wadah_keluar: q.x < r.x - pad || q.y < r.y - pad || q.right > r.right + pad || q.bottom > r.bottom + pad });
    });
  });
  document.head.removeChild(st);
  console.log('PROBE:' + JSON.stringify({ frame, items: out }));
};

const FRAME_PROBE: number[] = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 52, 54, 57, 60, 63, 66, 69, 72, 75, 76, 78, 81, 84, 87, 90, 93, 96, 99, 102, 104, 105, 108, 111, 114, 117];
const SEMBUNYI = '*{color:transparent !important;-webkit-text-fill-color:transparent !important;text-shadow:none !important}text,tspan{fill:transparent !important}';
const Probe: React.FC<{ c: React.FC }> = ({ c: C }) => {
  const frame = useCurrentFrame(); const sembunyi = !!(getInputProps() as any).sembunyikanTeks;
  useLayoutEffect(() => { if (!sembunyi && FRAME_PROBE.includes(frame)) probeOklusi(frame); }, [frame]);
  return <>{sembunyi ? <style>{SEMBUNYI}</style> : null}<C /></>;
};
const A: React.FC = () => <Probe c={DemoA} />;
const B: React.FC = () => <Probe c={DemoB} />;
const Root: React.FC = () => (
  <>
    <Composition id="A" component={A} width={meta.width} height={meta.height} fps={meta.fps} durationInFrames={meta.durasi} />
    <Composition id="B" component={B} width={meta.width} height={meta.height} fps={meta.fps} durationInFrames={meta.durasi} />
  </>
);
registerRoot(Root);
