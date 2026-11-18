import React, {useId} from 'react';
import {IG} from './warna';

export const BingkaiIPhone: React.FC<{children: React.ReactNode; skala?: number}> = ({children, skala = 1}) => {
  const id = `iphone-${useId().replace(/:/g, '')}`;
  return <svg width={419 * skala} height={878 * skala} viewBox="0 0 419 878" style={{display: 'block'}} role="img" aria-label="Bingkai iPhone dengan Dynamic Island">
    <defs><clipPath id={id}><rect x="13" y="13" width="393" height="852" rx="49"/></clipPath></defs>
    <rect x=".5" y="163" width="3" height="32" rx="1.5" fill={IG.tepi}/>
    <rect x=".5" y="211" width="3" height="61" rx="1.5" fill={IG.tepi}/>
    <rect x=".5" y="283" width="3" height="61" rx="1.5" fill={IG.tepi}/>
    <rect x="415.5" y="233" width="3" height="92" rx="1.5" fill={IG.tepi}/>
    <rect x="3.5" y="1" width="412" height="876" rx="62" fill={IG.bingkai} stroke={IG.tepi} strokeWidth="1.4"/>
    <g clipPath={`url(#${id})`}>
      <foreignObject x="13" y="13" width="393" height="852">{children}</foreignObject>
    </g>
    <rect x="153.5" y="24" width="112" height="32" rx="16" fill={IG.bingkai}/>
    <circle cx="250.3" cy="40" r="5.3" fill={IG.kamera}/>
  </svg>;
};
