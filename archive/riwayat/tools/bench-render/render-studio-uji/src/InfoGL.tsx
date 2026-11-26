import React, { useState } from "react";
import { AbsoluteFill } from "remotion";
export const InfoGL: React.FC = () => {
  const [t] = useState(() => {
    const c = document.createElement("canvas"); const g = c.getContext("webgl2") || c.getContext("webgl");
    if (!g) return "WEBGL TIDAK ADA";
    const e = g.getExtension("WEBGL_debug_renderer_info");
    return e ? `${g.getParameter(e.UNMASKED_VENDOR_WEBGL)} | ${g.getParameter(e.UNMASKED_RENDERER_WEBGL)}` : String(g.getParameter(g.RENDERER));
  });
  console.log("GLINFO " + t);
  return <AbsoluteFill style={{ background: "#fff", fontSize: 28, padding: 40, fontFamily: "monospace" }}>{t}</AbsoluteFill>;
};
