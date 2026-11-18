import React, {useId} from 'react';
import {IG} from './warna';

export const AvatarIG: React.FC<{seed: number; ukuran?: number; x?: number; y?: number; story?: boolean}> = ({seed, ukuran = 32, x = 0, y = 0, story = false}) => {
  const id = `avatar-${useId().replace(/:/g, '')}`;
  const n = Math.abs(Math.trunc(seed));
  return <svg x={x} y={y} width={ukuran} height={ukuran} viewBox="0 0 80 80" aria-hidden>
    <defs>
      <linearGradient id={`${id}-ring`} x1="0" y1="1" x2="1" y2="0">{IG.story.map((c, i) => <stop key={c} offset={i / (IG.story.length - 1)} stopColor={c}/>)}</linearGradient>
      <clipPath id={id}><circle cx="40" cy="40" r={story ? 32.4 : 39.5}/></clipPath>
    </defs>
    {story && <circle cx="40" cy="40" r="37.6" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="2.9"/>}
    <g clipPath={`url(#${id})`}>
      <circle cx="40" cy="40" r="40" fill={IG.avatar[n % IG.avatar.length]}/>
      <path d="M5 84c1-23 10-34 35-34S74 61 75 84Z" fill={IG.baju[n % IG.baju.length]}/>
      <path d="M33 43h14v16c-5 4-9 4-14 0Z" fill={IG.kulit[n % IG.kulit.length]}/>
      <ellipse cx="40" cy="33" rx="15.5" ry="19.5" fill={IG.kulit[n % IG.kulit.length]}/>
      <path d={n % 2 === 0 ? 'M24 36V25c0-22 32-22 32 0v13l-5-14c-9 7-15 1-23 7Z' : 'M23 42V26c0-23 34-23 34 1v19l-7-16c-9 0-15-4-18-8l-2 21Z'} fill={IG.rambut}/>
    </g>
  </svg>;
};
