import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {DURASI, PANELS, Papan} from '../papan/Papan';
import {LembarKarakter} from '../papan/karakter2d/LembarKarakter';

const Root: React.FC = () => <>
  {PANELS.map(panel => <Composition key={panel} id={`Papan-${panel}`} component={Papan}
    width={1920} height={1080} fps={30000/1001} durationInFrames={DURASI[panel] ?? 150} defaultProps={{panel}}/>)}
  <Composition id="Karakter2D-sheet" component={LembarKarakter} width={1920} height={1350} fps={30000/1001} durationInFrames={1}/>
</>;
registerRoot(Root);
