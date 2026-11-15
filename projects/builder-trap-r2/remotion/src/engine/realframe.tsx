// r5: frame NYATA (timeline baru) untuk teks dan wajah, sementara adegan dirender di <Freeze frame={W(f)}>.
import React, { createContext, useContext } from 'react';
import { useCurrentFrame } from 'remotion';

export const RealFrame = createContext<number | null>(null);
/** frame nyata; di luar Main (mis. pratinjau satu adegan) jatuh ke useCurrentFrame() */
export const useRealFrame = (): number => {
  const r = useContext(RealFrame);
  const f = useCurrentFrame();
  return r ?? f;
};
export const RealFrameProvider: React.FC<{ frame: number; children: React.ReactNode }> = ({ frame, children }) => (
  <RealFrame.Provider value={frame}>{children}</RealFrame.Provider>
);
