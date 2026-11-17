import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {K06TabelKeputusan} from '../komponen/K06-TabelKeputusan';

const Uji: React.FC = () => <K06TabelKeputusan mulai={6} kPilih={120} />;

const Root: React.FC = () => (
  <Composition id="UjiK06" component={Uji} width={1920} height={1080} fps={30000 / 1001} durationInFrames={240} />
);

registerRoot(Root);
