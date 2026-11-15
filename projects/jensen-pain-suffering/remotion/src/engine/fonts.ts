// Poppins dimuat dari file repo (Lantai A7); gagal muat = galat render, bukan fallback.
import { cancelRender, continueRender, delayRender, staticFile } from 'remotion';

const FACES = [
  { file: 'fonts/poppins-latin-600-normal.woff2', weight: '600' },
  { file: 'fonts/poppins-latin-700-normal.woff2', weight: '700' },
];
let started = false;
export function loadFonts() {
  if (started || typeof document === 'undefined') return;
  started = true;
  const h = delayRender('fonts');
  Promise.all(
    FACES.map(async (f) => {
      const face = new FontFace('Poppins', `url(${staticFile(f.file)})`, { weight: f.weight, style: 'normal' });
      await face.load();
      (document.fonts as unknown as { add: (f: FontFace) => void }).add(face);
    }),
  )
    .then(() => continueRender(h))
    .catch((e) => cancelRender(new Error('Font Poppins gagal dimuat (Lantai A7): ' + e)));
}
