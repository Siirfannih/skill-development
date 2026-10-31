// AUTO dari export/Panel 05f Founders Overnight.tsx (storyboard Wonder 31 Okt, 960×540). Referensi komposisi statis — JANGAN diedit; adegan animasi ada di src/scenes.
import React from "react";
import {staticFile} from "remotion";
// Keterangan storyboard: 05f | B5 KENYATAAN · CHARCOAL · MONTASE | 81,3–85,8 dtk (est.) | “Makanya ada banyak | founder | , ada banyak | CEO | , yang lahir dalam | semalam | .” | Callback cold open: slot swap FOUNDER → CEO → SEMALAM. di posisi sama, tipe sama dengan 00a. Montase tercepat di video. | Kamera | C01 per cut | Keluar | X17 hard cut | SFX | shutter rapat, hantaman di SEMALAM
export const P05f: React.FC = () => (
  <div className="block relative w-[960px] min-w-0 h-[540px] min-h-0 [background-color:var(--sb-placeholder)] overflow-clip">
          <div className="block absolute w-[960px] h-[540px] aspect-[1.5] left-0 top-0 bg-cover bg-no-repeat opacity-[0.42] [contain:layout] bg-center" style={{ backgroundImage: `url(${staticFile("wonder/cf62d8467f160bc4293f098cb9a24564fe12fca16dc033f1060380dc5e43b663.jpg")})` }}></div>
          <span className="absolute w-[960px] left-0 top-[78px] text-[color-mix(in_srgb,_var(--sb-white)_22%,_transparent)] font-['Inter'] text-[64px] font-extrabold leading-none tracking-[-1.92px] text-center block [overflow-wrap:normal]">FOUNDER</span>
          <span className="absolute w-[960px] left-0 top-[170px] [color:var(--sb-white)] font-['Inter'] text-[150px] font-extrabold leading-none tracking-[-6px] text-center block [overflow-wrap:normal]">CEO</span>
        </div>
);
