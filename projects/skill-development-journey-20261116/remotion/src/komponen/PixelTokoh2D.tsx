import React from 'react';

export const SimpulOpenAI: React.FC<{size?: number; color?: string}> = ({size = 26, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="-32 -32 64 64" fill="none" aria-hidden>
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <path key={angle} transform={`rotate(${angle})`} d="M0 -9 L10 -15 C20 -21 30 -5 20 1 L10 7 L0 1 Z"
        stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
    ))}
  </svg>
);

export type PixelTokoh2DProps = {
  model: 'claude' | 'chatgpt';
  tinggi?: number;
  angkatLengan?: number;
};

/** Siluet sumber crab: badan, dua mata, lengan, empat kaki pada satu grid. */
export const PixelTokoh2D: React.FC<PixelTokoh2DProps> = ({model, tinggi = 150, angkatLengan = 0}) => {
  const claude = model === 'claude';
  const body = claude ? '#D97757' : '#0D0D0D';
  return <svg width={tinggi * 1.35} height={tinggi} viewBox="0 0 108 80" shapeRendering="crispEdges" aria-hidden>
    <path fill={body} d="M18 8H90V60H18Z M18 58H28V78H18Z M36 58H46V78H36Z M62 58H72V78H62Z M80 58H90V78H80Z" />
    <rect x="1" y={26 - angkatLengan * 10} width="20" height="18" fill={body} />
    <rect x="87" y={26 - angkatLengan * 10} width="20" height="18" fill={body} />
    <rect x="28" y="16" width="9" height="10" fill={claude ? '#0D0D0D' : '#FFFFFF'} />
    <rect x="71" y="16" width="9" height="10" fill={claude ? '#0D0D0D' : '#FFFFFF'} />
    {!claude && <g transform="translate(44 34) scale(.78)"><SimpulOpenAI size={27} color="#FFFFFF" /></g>}
  </svg>;
};
