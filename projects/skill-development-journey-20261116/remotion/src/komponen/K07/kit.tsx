import React from "react";
import { continueRender, delayRender, staticFile } from "remotion";

const FONTS: [string, number, string][] = [
  ["Poppins", 600, "fonts/poppins-latin-600-normal.woff2"],
  ["Poppins", 800, "fonts/poppins-latin-800-normal.woff2"],
];
let janji: Promise<void> | null = null;
/** Muat huruf lokal sekali; render menunggu sampai siap. */
export const useHuruf = () => {
  const [h] = React.useState(() => delayRender("huruf K07"));
  React.useEffect(() => {
    janji ??= Promise.all(
      FONTS.map(async ([fam, w, url]) => {
        const ff = new FontFace(fam, `url(${staticFile(url)})`, { weight: String(w) });
        (document.fonts as unknown as { add: (f: FontFace) => void }).add(await ff.load());
      }),
    ).then(() => undefined);
    janji.then(() => continueRender(h), () => continueRender(h));
  }, [h]);
};

/** Blur arah (SVG): dx,dy = simpangan baku piksel. Mati bila gerak kecil. */
export const BlurArah: React.FC<{ id: string; dx: number; dy: number; children: React.ReactNode }> = ({ id, dx, dy, children }) => {
  const aktif = dx > 0.4 || dy > 0.4;
  return (
    <>
      {aktif && (
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <filter id={id} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${dx.toFixed(2)} ${dy.toFixed(2)}`} />
          </filter>
        </svg>
      )}
      <div style={{ filter: aktif ? `url(#${id})` : undefined }}>{children}</div>
    </>
  );
};

/** Kecepatan (px/frame) -> simpangan baku blur gerak, dibatasi. */
export const sb = (v: number) => Math.min(24, Math.abs(v) * 0.22);
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
