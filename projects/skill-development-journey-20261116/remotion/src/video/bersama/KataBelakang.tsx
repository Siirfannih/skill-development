import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {move} from '../../lib/curves';
import {FONT, MEREK, NETRAL} from './tema';
import {IG_PUNCHLINE} from './ig/waktu';

export const KataBelakang: React.FC<{gratis?: boolean}> = ({gratis = false}) => {
  const f = useCurrentFrame();
  const {awal, akhir} = gratis ? IG_PUNCHLINE.skillGratis : IG_PUNCHLINE.profesional;
  const skala = 1 + 0.035 * move(f, awal, akhir - awal - 1, 'drift');
  const tinta = gratis ? NETRAL.hangat : NETRAL.hitam;

  return <AbsoluteFill data-ig-punchline={gratis ? 'skill-gratis' : 'profesional'}
    style={{background: gratis ? MEREK.sekunder : MEREK.hijauMerek, overflow: 'hidden'}}>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <path d="M32 296H1888M32 784H1888" fill="none" stroke={tinta}
        strokeWidth={3} strokeDasharray="1 24" strokeLinecap="round"/>
      <g transform={`translate(960 540) scale(${skala})`}>
        <text x={0} y={142} textAnchor="middle" textLength={1660} lengthAdjust="spacingAndGlyphs"
          fill={tinta} fontFamily={FONT.anton} fontWeight={400} fontSize={330}>
          {gratis ? 'SKILL GRATIS' : 'PROFESIONAL'}
        </text>
      </g>
    </svg>
  </AbsoluteFill>;
};
