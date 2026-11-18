import React from 'react';
import {Composition} from 'remotion';
import {Papan} from './bersama/Papan';
import {PinjamRoot} from './pinjam/Root';
import {PapanFootage} from './uji/PapanFootage';

export const Root: React.FC = () => <>
  <PinjamRoot />
  <Composition id="PapanA" component={Papan} width={1920} height={1080} fps={30} durationInFrames={150}
    defaultProps={{tampilan: 'urutan' as const}} />
  <Composition id="PapanFootage" component={PapanFootage} width={1920} height={1080} fps={30} durationInFrames={210} />
</>;
