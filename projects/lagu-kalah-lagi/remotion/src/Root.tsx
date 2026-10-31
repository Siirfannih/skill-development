import {Composition} from 'remotion';
import {Scene07} from './scenes/Scene07';

export const Root: React.FC = () => (
  <Composition id="Scene07" component={Scene07} durationInFrames={180} fps={30} width={1920} height={1080} />
);
