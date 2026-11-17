import React from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
import {siClaude} from 'simple-icons';
import {drift, move} from '../lib/curves';

export type K08Props = {
  /** frame awal komponen; semua k* dihitung relatif ke sini */
  mulai: number;
  /** kata "balik modal" */
  kBalik: number;
  /** kata "ChatGPT Pro Max ... 20 kali" */
  kChatgpt: number;
  /** kata "Claude Pro ... 5 kali" */
  kClaude: number;
};

const INK = '#1F2328';
const INK2 = '#6B6F76';
const LINE = '#E4E2DA';
const HERO = '#FAF8EC';
const CLAUDE = '#D97757';

// Posisi kartu di sisi kiri (wajah di x 45-75 % = 864-1440 px).
const CG = {x: 150, y: 135, w: 440, h: 430, rot: -2.2};
const CL = {x: 330, y: 530, w: 440, h: 430, rot: 1.8};
const CAM_ORIGIN = '450px 560px';

let fontHandle: number | null = null;
const useFonts = () => {
  React.useState(() => {
    if (typeof document === 'undefined' || fontHandle !== null) return 0;
    fontHandle = delayRender('K08 fonts');
    const specs = ['400 100px Anton', '500 20px Inter', '600 20px Inter', '700 20px Inter', '800 20px Inter'];
    Promise.all(specs.map((s) => document.fonts.load(s))).then(() => continueRender(fontHandle as number), () => continueRender(fontHandle as number));
    return 0;
  });
};

const FontCss: React.FC = () => (
  <style>{`
@font-face{font-family:'Anton';font-weight:400;src:url('${staticFile('fonts-K08/anton-latin-400-normal.woff2')}') format('woff2');}
${[500, 600, 700, 800].map((w) => `@font-face{font-family:'Inter';font-weight:${w};src:url('${staticFile(`fonts-K08/inter-latin-${w}-normal.woff2`)}') format('woff2');}`).join('\n')}
`}</style>
);

/** Blur arah dari kecepatan (px/frame), maksimum kecil agar tidak ada ghost. */
const Blur: React.FC<{id: string; sx: number; sy: number}> = ({id, sx, sy}) => (
  <svg width={0} height={0} style={{position: 'absolute'}}>
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation={`${Math.min(3, sx).toFixed(2)} ${Math.min(3, sy).toFixed(2)}`} />
    </filter>
  </svg>
);

/** Simpul OpenAI: geometri sendiri (enam lingkar pil saling kunci). */
const OpenAIKnot: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" fill="none" stroke="#0D0D0D" strokeWidth={6.4} strokeLinejoin="round">
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <g key={k} transform={`rotate(${k * 60})`}>
        <rect x={-12.5} y={-45} width={25} height={52} rx={12.5} transform="rotate(0)" />
      </g>
    ))}
  </svg>
);

const ClaudeMark: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d={siClaude.path} fill={CLAUDE} /></svg>
);

const Badge: React.FC<{value: number; bg: string; fg: string; scale: number; w: number}> = ({value, bg, fg, scale, w}) => (
  <div style={{width: w, height: 240, borderRadius: 20, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${scale})`, transformOrigin: '50% 50%'}}>
    <span style={{fontFamily: 'Inter', fontWeight: 800, fontSize: 190, letterSpacing: -6, fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>{value}</span>
    <span style={{fontFamily: 'Inter', fontWeight: 800, fontSize: 124, lineHeight: 1, paddingTop: 16}}>x</span>
  </div>
);

const CardShell: React.FC<{box: typeof CG; children: React.ReactNode; style: React.CSSProperties; filterId: string}> = ({box, children, style, filterId}) => (
  <div style={{position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, ...style, filter: `url(#${filterId})`}}>
    <div style={{width: '100%', height: '100%', boxSizing: 'border-box', borderRadius: 20, background: '#FFFFFF', border: `2px solid ${LINE}`, padding: '40px 40px', boxShadow: '0 28px 60px rgba(31,35,40,0.22), 0 6px 16px rgba(31,35,40,0.12)'}}>
      {children}
    </div>
  </div>
);

const LAND = 16;

export const K08KartuPaket: React.FC<K08Props> = ({mulai, kBalik, kChatgpt, kClaude}) => {
  useFonts();
  const frame = useCurrentFrame();
  const f = frame - mulai;
  if (f < 0) return null;

  // ---- hero "BALIK MODAL"
  const hf = f - kBalik;
  const heroOutStart = Math.max(kBalik + 24, kChatgpt - 12);
  const heroOutF = f - heroOutStart;
  const slam = hf < 0 ? 0 : hf < 9 ? 1.4 + (0.97 - 1.4) * move(hf, 0, 9, 'land') : 0.97 + 0.03 * move(hf, 9, 10, 'drift');
  const heroOut = move(heroOutF, 0, 10, 'leave');
  const heroOp = hf < 0 ? 0 : Math.min(1, move(hf, 0, 4, 'reveal')) * (1 - heroOut);
  const heroY = (hf < 0 ? 24 : 24 * (1 - move(hf, 0, 9, 'land'))) + 70 * heroOut;
  const heroX = -160 * heroOut;
  const heroPush = 1 + 0.025 * (Math.max(0, hf) / 30);
  const hd = drift(f, 30, 4, 2);
  const heroVel = hf < 9 ? Math.abs(slam - (1.4 + (0.97 - 1.4) * move(Math.max(0, hf - 1), 0, 9, 'land'))) * 40 : 0;
  const heroBlurS = hf >= 0 && hf < 9 ? Math.min(3, heroVel) : 0;
  const heroBlurOut = heroOutF > 0 && heroOutF < 11 ? 3 * move(heroOutF, 0, 10, 'leave') : 0;

  // ---- kartu
  const cardIn = (k: number, fromX: number, fromY: number, rotFrom: number, rotTo: number) => {
    const g = f - k;
    const p = move(g, 0, LAND, 'land');
    const pPrev = move(g - 1, 0, LAND, 'land');
    return {
      op: g < 0 ? 0 : Math.min(1, move(g, 0, 3, 'reveal')),
      x: fromX * (1 - p),
      y: fromY * (1 - p),
      s: 0.92 + 0.08 * p,
      rot: rotFrom + (rotTo - rotFrom) * p,
      vx: g < 0 ? 0 : Math.abs(p - pPrev) * Math.abs(fromX) * 0.1,
      vy: g < 0 ? 0 : Math.abs(p - pPrev) * Math.abs(fromY) * 0.1,
    };
  };
  const a = cardIn(kChatgpt, -(CG.x + CG.w + 80), 90, 5, CG.rot);
  const b = cardIn(kClaude, -(CL.x + CL.w + 80), 220, -4, CL.rot);

  // ChatGPT bergeser sedikit saat Claude mendarat (reaksi tidak serentak)
  const dip = move(f - kClaude - 4, 0, 14, 'land') * 1;
  const aDipS = 1 - 0.018 * dip;
  const aDipX = -16 * dip;

  // kamera kartu: dorong pelan + hentak 11 % di tiap kartu
  const camT = Math.max(0, f - kChatgpt) / 30;
  const camBase = 1 + Math.min(0.03, 0.006 * camT);
  const hit = (k: number) => (f < k ? 0 : 0.05 * (1 - move(f - k, 0, 22, 'land')) * move(f - k, 0, 2, 'reveal'));
  const cam = camBase + hit(kChatgpt) + hit(kClaude);

  // angka
  const cgStart = kChatgpt + 6;
  const cgEnd = cgStart + 16;
  const cgVal = f < cgStart ? 1 : Math.round(1 + 19 * move(f, cgStart, 16, 'reveal'));
  const cgPulse = 0.07 * (move(f, cgEnd, 5, 'land') - move(f, cgEnd + 5, 14, 'drift'));
  const clStart = kClaude + 6;
  const clEnd = clStart + 16;
  const clVal = f < clStart ? 1 : Math.round(1 + 4 * move(f, clStart, 16, 'reveal'));
  const clPulse = 0.08 * (move(f, clEnd, 5, 'land') - move(f, clEnd + 5, 14, 'drift'));

  const dA = drift(f, 30, 3, 3);
  const dB = drift(f, 30, 3, 5);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <FontCss />
      <Blur id="k08-h" sx={heroBlurS + heroBlurOut} sy={heroBlurS * 0.5} />
      <Blur id="k08-a" sx={a.vx} sy={a.vy} />
      <Blur id="k08-b" sx={b.vx} sy={b.vy} />

      {hf >= 0 && heroOut < 1 && (
        <div style={{position: 'absolute', left: 90, bottom: 80, transformOrigin: '0 100%', transform: `translate(${heroX + hd.x}px, ${heroY + hd.y}px) scale(${slam * heroPush}) rotate(-3deg)`, opacity: heroOp, filter: 'url(#k08-h)'}}>
          <div style={{fontFamily: 'Anton', fontSize: 224, lineHeight: 0.94, color: HERO, letterSpacing: 2, WebkitTextStroke: `10px ${INK}`, paintOrder: 'stroke fill', textShadow: `0 10px 0 rgba(31,35,40,0.55)`, textTransform: 'uppercase'}}>
            <div>BALIK</div>
            <div>MODAL</div>
          </div>
        </div>
      )}

      <div style={{position: 'absolute', inset: 0, transformOrigin: CAM_ORIGIN, transform: `scale(${cam})`}}>
        {f >= kChatgpt && (
          <CardShell box={CG} filterId="k08-a" style={{opacity: a.op, transform: `translate(${a.x + aDipX + dA.x}px, ${a.y + dA.y}px) scale(${a.s * aDipS}) rotate(${a.rot}deg)`, zIndex: 1}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22, height: 80}}>
              <OpenAIKnot size={80} />
              <div style={{fontFamily: 'Inter', fontWeight: 800, fontSize: 72, color: INK, letterSpacing: -1.5}}>Pro</div>
            </div>
            <div style={{marginTop: 30}}>
              <Badge value={cgVal} bg="#0D0D0D" fg="#FFFFFF" scale={1 + cgPulse} w={360} />
            </div>
          </CardShell>
        )}
        {f >= kClaude && (
          <CardShell box={CL} filterId="k08-b" style={{opacity: b.op, transform: `translate(${b.x + dB.x}px, ${b.y + dB.y}px) scale(${b.s}) rotate(${b.rot}deg)`, zIndex: 2}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22, height: 80}}>
              <ClaudeMark size={80} />
              <div style={{fontFamily: 'Inter', fontWeight: 800, fontSize: 72, color: INK, letterSpacing: -1.5}}>Max</div>
            </div>
            <div style={{marginTop: 30}}>
              <Badge value={clVal} bg={CLAUDE} fg={INK} scale={1 + clPulse} w={360} />
            </div>
          </CardShell>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const objekK08 = (p: K08Props): {nama: string; frame: number; peran: string}[] => [
  {nama: 'BALIK MODAL', frame: p.mulai + p.kBalik, peran: 'kata-hero'},
  {nama: 'kartu paket ChatGPT Pro', frame: p.mulai + p.kChatgpt + 6, peran: 'objek-mendarat'},
  {nama: 'kartu paket Claude Max', frame: p.mulai + p.kClaude + 6, peran: 'objek-mendarat'},
];
