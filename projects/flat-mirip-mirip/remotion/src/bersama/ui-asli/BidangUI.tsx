import React from 'react';

/** Koordinat asli tetap utuh ketika komponen ditempatkan dalam kotak berukuran lain. */
export const BidangUI: React.FC<{lebar: number; tinggi: number; nama: string; children: React.ReactNode}> = ({lebar, tinggi, nama, children}) => (
  <svg width="100%" height="100%" viewBox={`0 0 ${lebar} ${tinggi}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={nama} style={{display: 'block'}}>
    <foreignObject width={lebar} height={tinggi}>
      <div style={{position: 'relative', width: lebar, height: tinggi, overflow: 'hidden'}}>{children}</div>
    </foreignObject>
  </svg>
);
