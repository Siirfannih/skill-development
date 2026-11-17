import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MaskotAI} from './MaskotAI';
import type {MaskotAIProps} from './MaskotAI';

export type UjiMaskotProps = {
  karakter: MaskotAIProps[];
  still: '09-5' | '11-0' | '12-5';
};

export const UjiMaskot: React.FC<UjiMaskotProps> = ({karakter, still}) => (
  <AbsoluteFill style={{backgroundColor: '#999F9F'}}>
    <Img src={staticFile(`uji/kamar-${still}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <AbsoluteFill>
      {karakter.map((props) => <MaskotAI key={props.model} {...props} />)}
    </AbsoluteFill>
  </AbsoluteFill>
);
