import {useLayoutEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';

/** Ukuran huruf (px) supaya `teks` selebar `lebar` px dengan huruf yang sama; diukur sekali per komposisi di DOM, deterministik. */
export const useFitSize = (teks: string, family: string, weight: number, lebar: number, spasi = 0): number => {
  const [handle] = useState(() => delayRender(`fit ${teks}`));
  const [size, setSize] = useState(100);
  useLayoutEffect(() => {
    document.fonts.load(`${weight} 100px ${family}`).then(() => {
      const c = document.createElement('canvas').getContext('2d');
      if (!c) { cancelRender(new Error('canvas 2d tidak tersedia')); return; }
      c.font = `${weight} 100px ${family}`;
      const natural = c.measureText(teks).width + spasi * 100 * Math.max(0, teks.length - 1);
      setSize((100 * lebar) / natural);
      continueRender(handle);
    }).catch(cancelRender);
  }, [handle, teks, family, weight, lebar, spasi]);
  return size;
};

/** Hash deterministik 0..1 (tanpa Math.random) untuk gerak acak yang bisa di-scrub. */
export const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/** Guncangan ≤ amp px, ganti tiap 2 frame (rasa gambar tangan), meluruh dari frame `mulai` selama `frames`. */
export const getar = (frame: number, mulai: number, frames: number, amp: number, seed = 1) => {
  const k = frame - mulai;
  if (k < 0 || k >= frames) return {x: 0, y: 0};
  const peluruh = 1 - k / frames;
  const n = Math.floor(k / 2);
  return {x: (hash(n * 3 + seed) - 0.5) * 2 * amp * peluruh, y: (hash(n * 5 + seed + 9) - 0.5) * 2 * amp * peluruh};
};
