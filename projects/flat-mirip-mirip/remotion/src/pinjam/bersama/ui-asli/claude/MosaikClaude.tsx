import React from 'react';
import {MEREK, NETRAL} from '../../tema';

// Warna sel transisi UI Claude, diukur dari sumber/ref-r5c/g4-mosaik-transisi.webp.
const PIKSEL = '#A96654';

export const MosaikClaude: React.FC<{frame: number}> = ({frame}) => frame >= 18 ? null : <>
  {Array.from({length: 30 * 27}, (_, cell) => {
    const column = cell % 30, row = Math.floor(cell / 30);
    const hash = ((column * 7919 + row * 104729 + 13) % 97) / 97;
    const off = 3 + Math.floor(hash * 13);
    if (frame >= off) return null;
    const edge = column < 6 || column > 23 || row < 4 || row > 22;
    return <div key={cell} style={{position: 'absolute', left: column * 64, top: row * 40, width: 64, height: 40,
      boxSizing: 'border-box', background: edge && hash > 0.45 ? PIKSEL : hash > 0.8 ? NETRAL.panel : MEREK.latar,
      border: edge && hash > 0.65 ? `1px solid ${PIKSEL}` : undefined}}/>;
  })}
</>;
