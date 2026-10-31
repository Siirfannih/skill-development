// AUTO dari export/Panel 00a Founder Montage.tsx (storyboard Wonder 31 Okt, 960×540). Referensi komposisi statis — JANGAN diedit; adegan animasi ada di src/scenes.
import React from "react";
import {staticFile} from "remotion";
// Keterangan storyboard: 00a | COLD OPEN · CHARCOAL | 0,0–2,0 dtk | Tanpa VO. FOUNDER → CEO (slam, slot swap). | ±8 foto ganti tiap 6–8 f: founder di panggung, meetup, berita AI, layar ChatGPT, demo day. Foto = placeholder. | Kamera | C01 zoom mikro per foto | Keluar | X07 cut on motion | SFX | shutter per foto, sub-hit di FOUNDER
export const P00a: React.FC = () => (
  <div className="block relative w-[960px] min-w-0 h-[540px] min-h-0 [background-color:var(--sb-charcoal)] overflow-clip">
          <div className="block absolute w-[960px] h-[540px] left-0 top-0 bg-cover bg-no-repeat opacity-20 [contain:layout] bg-center" style={{ backgroundImage: `url(${staticFile("wonder/30f18ba51b261b88d6986105a30b3219733874950edff61f4cf1762dbd412bf5.jpg")})` }}></div>
          <div className="inset-0 flex absolute justify-center items-center">
            <span className="w-fit [color:var(--sb-white)] font-['Inter'] text-[150px] font-extrabold leading-none tracking-[-6px] text-left block [overflow-wrap:normal]">FOUNDER</span>
          </div>
        </div>
);
