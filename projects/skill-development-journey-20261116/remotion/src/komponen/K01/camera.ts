import {move} from '../../lib/curves';

// Pusat ikon dari layout Inter snapshot K01, sebelum transform kamera.
export const COMMIT_ICON = {x: 1164.6, y: 388.5};
const COMMIT_ROW = {x: 735, y: COMMIT_ICON.y};

export const cameraK01 = (frame: number, mulai: number, kSelesai: number) => {
  const approach = move(frame, mulai, Math.max(1, kSelesai - 20 - mulai), 'drift');
  const push = move(frame, kSelesai - 20, 20, 'heavy');
  const hold = move(frame, kSelesai, 45, 'drift');
  const approachScale = 1 + 0.1 * approach;
  const scale = approachScale + 0.75 * push + 0.07 * hold;
  return {
    scale,
    x: (1 - approachScale) * COMMIT_ROW.x + (approachScale - scale) * COMMIT_ICON.x - 160 * push,
    y: (1 - scale) * COMMIT_ICON.y,
  };
};
