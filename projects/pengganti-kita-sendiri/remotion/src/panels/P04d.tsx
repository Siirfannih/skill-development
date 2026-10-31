// AUTO dari export/Panel 04d Altman Orbit.tsx (storyboard Wonder 31 Okt, 960×540). Referensi komposisi statis — JANGAN diedit; adegan animasi ada di src/scenes.
import React from "react";
import {staticFile} from "remotion";
// Keterangan storyboard: 04d | B4 EVOLUSI · CHARCOAL · KLIP · MOMEN 3 | 59,8–64,0 dtk (est.) | [Altman] “It is a legitimate single-person billion-dollar company…” | Kata kutipan mengorbit foto Altman dalam cincin 3D; kata di depan terang dan tajam, di belakang redup dan tertutup kepala. Kata ikut audio klip. | Kamera | C19 drift + orbit pelan | Keluar | X01 foto jadi kartu biru | SFX | hum orbit tipis
export const P04d: React.FC = () => (
  <div className="block relative w-[960px] min-w-0 h-[540px] min-h-0 [background-color:var(--sb-charcoal)] overflow-clip">
          <div className="block absolute w-[660px] h-[150px] left-[150px] top-[250px] rounded-[75px] border-t-2 border-t-[color-mix(in_srgb,_var(--sb-white)_22%,_transparent)]"></div>
          <span className="absolute left-[120px] top-[236px] text-[color-mix(in_srgb,_var(--sb-white)_35%,_transparent)] font-['Inter'] text-[22px] font-bold leading-normal tracking-[1.32px] text-left block [overflow-wrap:normal]">SINGLE-PERSON</span>
          <span className="absolute left-[690px] top-[236px] text-[color-mix(in_srgb,_var(--sb-white)_35%,_transparent)] font-['Inter'] text-[22px] font-bold leading-normal tracking-[1.32px] text-left block [overflow-wrap:normal]">COMPANY</span>
          <div className="block absolute w-[360px] h-[390px] aspect-[0.958125] left-[300px] top-[150px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${staticFile("wonder/30689e261e3416956fff05059f3d306833628c679f09430864705ade85f640b3.png")})` }}></div>
          <div className="block absolute w-[660px] h-[150px] left-[150px] top-[250px] rounded-[75px] border-b-2 border-b-[color-mix(in_srgb,_var(--sb-white)_70%,_transparent)]"></div>
          <span className="absolute w-[960px] left-0 top-[412px] [color:var(--sb-white)] font-['Inter'] text-[54px] font-extrabold leading-none tracking-[-1.08px] text-center block [overflow-wrap:normal]">BILLION-DOLLAR</span>
          <span className="absolute w-[960px] left-0 top-10 text-[color-mix(in_srgb,_var(--sb-white)_60%,_transparent)] font-['Inter'] text-[13px] font-semibold leading-normal tracking-[2.08px] text-center block [overflow-wrap:normal]">SAM ALTMAN · CEO OPENAI · MOSTLY HUMAN</span>
        </div>
);
