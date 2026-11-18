import React, {useEffect, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, Img, staticFile, useCurrentFrame} from 'remotion';
import {move} from '../lib/curves';

export const C = {blue: '#2E5BFF', pale: '#C9D6FF', paper: '#F6F5F0', coral: '#F97066', yellow: '#FFD54A', ink: '#1F2328', green: '#21854A'};
export const box = (x: number, y: number, w?: number, h?: number): React.CSSProperties => ({position: 'absolute', left: x, top: y, width: w, height: h});
export const shadow = '0 32px 65px rgba(15,25,65,.25), 0 8px 12px rgba(15,25,65,.12)';

export const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('Papan: local Poppins, Anton and Inter'));
  useEffect(() => {
    Promise.all(['700 48px PapanPoppins', '800 48px PapanPoppins', '400 100px PapanAnton', '400 24px PapanInter', '500 24px PapanInter', '600 24px PapanInter', '700 24px PapanInter', '400 24px PapanMono', '700 24px PapanMono'].map(s => document.fonts.load(s)))
      .then(() => continueRender(handle)).catch(cancelRender);
  }, [handle]);
  return <style>{`
    @font-face{font-family:PapanAnton;src:url('${staticFile('fonts/anton-latin-400-normal.woff2')}');font-weight:400}
    ${[700,800].map(w => `@font-face{font-family:PapanPoppins;src:url('${staticFile(`fonts/poppins-latin-${w}-normal.woff2`)}');font-weight:${w}}`).join('')}
    ${[400,500,600,700].map(w => `@font-face{font-family:PapanInter;src:url('${staticFile(`fonts/inter-latin-${w}-normal.woff2`)}');font-weight:${w}}`).join('')}
    ${[400,700].map(w => `@font-face{font-family:PapanMono;src:url('${staticFile(`fonts/jetbrains-mono-latin-${w}-normal.woff2`)}');font-weight:${w}}`).join('')}
  `}</style>;
};

export const Plate: React.FC<{name: string; matte?: boolean; dim?: number; zoom?: number; shift?: number}> = ({name, matte = false, dim = 1, zoom = 1, shift = 0}) => <Img
  src={staticFile(`papan/${name}-${matte ? 'matte.png' : 'footage.jpg'}`)}
  style={{...box(0, 0, 1920, 1080), transform: `translateX(${shift}px) scale(${zoom})`, filter: matte ? undefined : `brightness(${dim})`}} />;

export const Slab: React.FC<{text: string; x: number; y: number; width: number; size: number; color?: string; angle?: number}> = ({text, x, y, width, size, color = C.paper, angle = 0}) => {
  const f = useCurrentFrame();
  const enter = move(f, 2, 19, 'heavy');
  const settle = 1 - move(f, 18, 72, 'drift');
  return <svg style={{...box(x, y, width, size * 1.55), overflow: 'visible', transform: `translateY(${170 * (1 - enter)}px) rotate(${angle}deg) scaleY(${.9 + .1 * enter})`, opacity: enter}}
    viewBox={`0 0 ${width} ${size * 1.55}`}>
    <text x="0" y={size * 1.1} textLength={width} lengthAdjust="spacingAndGlyphs" fill={color}
      style={{fontFamily: 'PapanAnton', fontSize: size, textShadow: '0 12px 18px rgba(0,0,0,.2)'}}>
      {Array.from(text).map((letter, i) => <tspan key={i} dy={Math.sin(i * .84 + f * .09) * 17 * settle}>{letter}</tspan>)}
    </text>
  </svg>;
};

export const Check: React.FC<{size?: number}> = ({size = 80}) => <svg width={size} height={size} viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill={C.green}/><path d="M27 51L44 68 75 33" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
</svg>;

export const Canvas07: React.FC<{children: React.ReactNode; warm?: boolean}> = ({children, warm = false}) => {
  const f = useCurrentFrame();
  const cam = 1.035 + .035 * move(f, 24, 100, 'drift');
  return <AbsoluteFill style={{background: warm ? C.paper : C.blue, overflow: 'hidden'}}>
    <AbsoluteFill style={{transform: `scale(${cam})`}}>
      <svg width="1920" height="1080" style={box(0, 0)}>
        <defs><linearGradient id="papan-shape" x1="0" y1="0" x2="1" y2="1"><stop stopColor={C.pale}/><stop offset="1" stopColor="#8CA8FF"/></linearGradient></defs>
        <rect x="900" y="-345" width="1050" height="1300" rx="295" transform="rotate(24 1425 300)" fill={warm ? C.pale : '#4772FF'}/>
        <rect x="-450" y="290" width="1100" height="1100" rx="275" transform="rotate(-27 100 840)" fill={warm ? C.blue : 'url(#papan-shape)'}/>
        <rect x="-230" y="520" width="660" height="660" rx="170" transform="rotate(-27 100 840)" fill={warm ? C.yellow : '#7092FF'}/>
        <circle cx="1750" cy="1060" r="400" fill={C.yellow}/>
      </svg>
      {children}
    </AbsoluteFill>
  </AbsoluteFill>;
};
