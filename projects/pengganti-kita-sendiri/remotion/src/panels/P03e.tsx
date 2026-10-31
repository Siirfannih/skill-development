// AUTO dari export/Panel 03e Jensen Clip.tsx (storyboard Wonder 31 Okt, 960×540). Referensi komposisi statis — JANGAN diedit; adegan animasi ada di src/scenes.
import React from "react";
import {staticFile} from "remotion";
// Keterangan storyboard: 03e | B3 MENIRU DIRI · CHARCOAL · KLIP | 45,4–50,7 dtk (est.) | [Jensen] “You’re not going to lose your job to an AI, but you’re going to lose your job to somebody who uses AI.” | Frame 03d menyusut jadi kartu klip (X13). Terjemahan 2 baris di atas zona 8 % bawah. Klip = placeholder. | Kamera | C19 drift 1,03 | Keluar | X17 hard cut ke putih | SFX | musik −6 dB di bawah klip
export const P03e: React.FC = () => (
  <div className="block relative w-[960px] min-w-0 h-[540px] min-h-0 [background-color:var(--sb-charcoal)] overflow-clip">
          <div className="block absolute w-[560px] min-w-0 h-[315px] min-h-0 left-[200px] top-12 [background-color:var(--sb-placeholder)] rounded-[14px] overflow-clip">
            <div className="block w-[560px] h-[315px] aspect-[1.77778] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${staticFile("wonder/df2053369f22b7632db11658eb80e914c4d8cd101100037eb2d949c4eff25a70.jpg")})` }}></div>
          </div>
          <span className="absolute w-[960px] left-0 top-[378px] text-[color-mix(in_srgb,_var(--sb-white)_60%,_transparent)] font-['Inter'] text-[13px] font-semibold leading-normal tracking-[2.08px] text-center block [overflow-wrap:normal]">JENSEN HUANG · CEO NVIDIA · MILKEN INSTITUTE 2025</span>
          <span className="absolute w-[960px] left-0 top-[418px] [color:var(--sb-white)] font-['Inter'] text-[26px] font-semibold leading-normal text-center block [overflow-wrap:normal]">Kamu tidak akan kehilangan pekerjaan karena AI,</span>
          <span className="absolute w-[960px] left-0 top-[454px] [color:var(--sb-white)] font-['Inter'] text-[26px] font-semibold leading-normal text-center block [overflow-wrap:normal]">tapi karena orang yang memakai AI.</span>
        </div>
);
