import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {RepoGitHub} from '../komponen/K01-RepoGitHub';

const K01Root: React.FC = () => <Composition id="UjiK01" component={RepoGitHub} width={1920} height={1080} fps={30000 / 1001} durationInFrames={120} defaultProps={{mulai: 0, kSelesai: 75}}/>;

registerRoot(K01Root);
