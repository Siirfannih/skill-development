import React from 'react';
import {siClaude} from 'simple-icons';

export const LogoClaude: React.FC<{size?: number}> = ({size = 30}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{display: 'block', flexShrink: 0}} aria-label="Claude">
    <path d={siClaude.path} fill={`#${siClaude.hex}`}/>
  </svg>
);
