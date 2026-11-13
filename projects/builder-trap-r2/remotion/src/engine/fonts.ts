// Font dimuat dari file (Lantai A7). Render ditahan sampai semua font siap; gagal muat = galat, bukan fallback diam-diam.
import { cancelRender, continueRender, delayRender, staticFile } from 'remotion';

const FACES: { family: string; file: string; weight: string; style?: string }[] = [
  { family: 'SFPro', file: 'fonts/sf-pro-display/SFPRODISPLAYREGULAR.OTF', weight: '400' },
  { family: 'SFPro', file: 'fonts/sf-pro-display/SFPRODISPLAYMEDIUM.OTF', weight: '500' },
  { family: 'SFPro', file: 'fonts/sf-pro-display/SFPRODISPLAYBOLD.OTF', weight: '700' },
  { family: 'PlayfairDisplay', file: 'fonts/playfair/playfair-display-latin-800-normal.woff2', weight: '800' },
  { family: 'Caveat', file: 'fonts/caveat/Caveat.ttf', weight: '400 700' },
  { family: 'InterUI', file: 'fonts/inter/inter-latin-400-normal.woff2', weight: '400' },
  { family: 'InterUI', file: 'fonts/inter/inter-latin-500-normal.woff2', weight: '500' },
  { family: 'InterUI', file: 'fonts/inter/inter-latin-600-normal.woff2', weight: '600' },
  { family: 'InterUI', file: 'fonts/inter/inter-latin-700-normal.woff2', weight: '700' },
];

let started = false;
let ready = false;
/** true setelah semua font file termuat (TextLayer menyimpan ukuran hasil ukur hanya setelah ini). */
export const fontsReady = () => ready;
export function loadFonts() {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('fonts');
  Promise.all(
    FACES.map(async (f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)})`, { weight: f.weight, style: f.style ?? 'normal' });
      await face.load();
      (document.fonts as unknown as { add: (f: FontFace) => void }).add(face);
    }),
  )
    .then(() => { ready = true; continueRender(handle); })
    .catch((e) => cancelRender(new Error('Font gagal dimuat (Lantai A7): ' + e)));
}
