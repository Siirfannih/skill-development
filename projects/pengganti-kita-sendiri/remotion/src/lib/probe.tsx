// Probe pra-render (Segmen 2): tiap objek bernama melaporkan kotak layarnya per frame saat props `layoutlog` aktif.
// Baris log: `OBJ <frameAbs> <kind> <x> <y> <w> <h> <color> <name>` (koordinat 1920×1080, setelah transform kamera).
// tools/seg2_layout_check.py membaca log ini + frame kecil untuk cek safe zone, tabrakan teks, dan kontras.
import { useLayoutEffect, useRef } from "react";
import { getInputProps, useCurrentFrame } from "remotion";

const ON = () => !!(getInputProps() as { layoutlog?: boolean }).layoutlog;

export type ObjKind = "text" | "speaker" | "image" | "video" | "ui" | "icon";

export const useProbe = <T extends HTMLElement = HTMLDivElement>(name: string, kind: ObjKind, absFrame: number, color = "-") => {
  const ref = useRef<T>(null);
  const frame = useCurrentFrame();
  useLayoutEffect(() => {
    if (!ON() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    // getBoundingClientRect memakai px CSS komposisi (skala render tidak memengaruhi)
    console.log(`OBJ ${absFrame} ${kind} ${r.x.toFixed(0)} ${r.y.toFixed(0)} ${r.width.toFixed(0)} ${r.height.toFixed(0)} ${color.replace(/\s/g, "")} ${name.replace(/\s+/g, "_")}`);
  }, [frame, absFrame, kind, color, name]);
  return ref;
};
