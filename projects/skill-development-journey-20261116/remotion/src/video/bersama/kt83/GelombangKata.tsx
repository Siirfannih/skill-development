import React from 'react';
import {gelombang, hurufKata} from './gelombang';

export const GelombangKata: React.FC<{teks: string; size: number; weight: number; age: number;
  available: number; id: string; lineHeight: number; clip?: boolean}> = ({teks, size, weight, age, available, id, lineHeight, clip}) => {
  const letters = hurufKata(teks, size, weight);
  const width = letters[letters.length - 1].pusat + letters[letters.length - 1].lebar / 2;
  return <div style={{width, height: size * lineHeight, position: 'relative', overflow: clip ? 'hidden' : undefined}}>
    <svg width={0} height={0} style={{position: 'absolute'}}><defs>
      {letters.map((_, i) => <filter key={i} id={`${id}-${i}`} x="-50%" y="-100%" width="200%" height="300%">
        <feGaussianBlur stdDeviation={`0 ${gelombang(age, i, letters.length, available, size * 0.71).blur}`}/>
      </filter>)}
    </defs></svg>
    {letters.map((letter, i) => {
      const wave = gelombang(age, i, letters.length, available, size * 0.71);
      if (!wave.terlihat) return null;
      const left = letter.pusat * wave.renggang - letter.lebar / 2;
      return <span key={i} style={{position: 'absolute', left, top: wave.turun, letterSpacing: 0,
        filter: wave.blur > 0 ? `url(#${id}-${i})` : undefined}}>{letter.huruf}</span>;
    })}
  </div>;
};
