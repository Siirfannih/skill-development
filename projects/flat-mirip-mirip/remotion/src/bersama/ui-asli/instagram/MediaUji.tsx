import React from 'react';
import {IG} from './warna';

export const MediaUji: React.FC<{lebar?: number; tinggi?: number; seed?: number}> = ({lebar = 393, tinggi = 491.25, seed = 0}) => {
  const unit = Math.min(lebar, tinggi);
  const cx = lebar * (0.48 + (seed % 3) * 0.035);
  return <svg width="100%" height="100%" viewBox={`0 0 ${lebar} ${tinggi}`} preserveAspectRatio="xMidYMid slice" aria-label="Media uji geometris, akan diganti Sutradara">
    <rect width={lebar} height={tinggi} fill={IG.mediaKrem}/>
    <circle cx={lebar * .72} cy={tinggi * .28} r={unit * .24} fill={IG.mediaLingkaran}/>
    <path d={`M${cx - unit * .2} ${tinggi}v${-tinggi * .26}q0 ${-unit * .14} ${unit * .13} ${-unit * .17}v${-unit * .045}a${unit * .1} ${unit * .12} 0 1 1 ${unit * .14} 0v${unit * .045}q${unit * .14} ${unit * .04} ${unit * .14} ${unit * .17}V${tinggi}Z`} fill={IG.mediaSiluet}/>
  </svg>;
};
