import { Board, Wall } from "./Designs";
import { Composition } from "remotion";
import { Main } from "./Main";
import { TOTAL } from "./lib";

export const MyComposition = () => (
  <>
  <Composition id="TheGap" component={Main} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
      <Composition id="Wall" component={Wall} durationInFrames={1} fps={30} width={1920} height={1080} />
      <Composition id="Board" component={Board} durationInFrames={1} fps={30} width={1920} height={1080} />
  </>
);
