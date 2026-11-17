import React from 'react';
import {AbsoluteFill, Img, staticFile, useVideoConfig} from 'remotion';
import {MaskotAI} from '../komponen/MaskotAI';

export type UjiMaskotProps = {latar: 'cgpt' | 'claude' | 'gemini'};

// Local frame zero corresponds to source time 9.30 s; these are word onsets.
export const UjiMaskot: React.FC<UjiMaskotProps> = ({latar}) => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill>
    <Img src={staticFile(`uji/${latar}.jpg`)} style={{width: '100%', height: '100%'}} />
    <MaskotAI model="chatgpt" masukFrame={0}
      x={1325} y={281} tinggiPx={255} kedalaman={0.78} lihatKe="irfan"
      menolehFrame={[Math.round(0.75 * fps), Math.round(1.25 * fps)]} />
    <MaskotAI model="gemini" masukFrame={Math.round(1.25 * fps)}
      x={1536} y={691} tinggiPx={240} kedalaman={0.38} lihatKe="irfan" />
    <MaskotAI model="claude" masukFrame={Math.round(0.75 * fps)}
      x={422} y={594} tinggiPx={190} kedalaman={0.06} lihatKe="irfan"
      menolehFrame={[Math.round(1.25 * fps)]} />
  </AbsoluteFill>;
};
