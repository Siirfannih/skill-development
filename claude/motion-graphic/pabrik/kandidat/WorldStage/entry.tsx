// dibuat otomatis oleh pabrik/uji.py dari meta.json; jangan disunting.
import React, { useLayoutEffect } from 'react';
import { Composition, registerRoot, useCurrentFrame } from 'remotion';
import { DemoA, DemoB } from './Demo';
import meta from './meta.json';

const probe = (frame: number) => {
  const out: any[] = [];
  const eff = (e: Element | null) => { let o = 1; while (e) { const cs = getComputedStyle(e); o *= parseFloat(cs.opacity || '1'); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; e = e.parentElement; } return o; };
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    Array.from(el.childNodes).filter((n) => n.nodeType === 3 && (n.textContent || '').trim()).forEach((n) => {
      const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
      out.push({ tag, teks: (n.textContent || '').trim().slice(0, 60), x: q.x, y: q.y, w: q.width, h: q.height, fs: parseFloat(cs.fontSize) * ((el as HTMLElement).offsetWidth > 0 ? r.width / (el as HTMLElement).offsetWidth : 1), op: eff(el), vis: (() => { const t = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2); return !!t && (t === el || el.contains(t) || t.contains(el)); })() });
    });
    if (tag === 'svg' || tag === 'img' || tag === 'canvas') out.push({ tag, teks: '', x: r.x, y: r.y, w: r.width, h: r.height, fs: 0, op: eff(el), isi_teks: tag === 'svg' && !!el.querySelector('text') });
  });
  console.log('PROBE:' + JSON.stringify({ frame, items: out }));
};

const Probe: React.FC<{ c: React.FC }> = ({ c: C }) => {
  const frame = useCurrentFrame();
  useLayoutEffect(() => { if ((meta.stills as number[]).includes(frame)) probe(frame); }, [frame]);
  return <C />;
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
