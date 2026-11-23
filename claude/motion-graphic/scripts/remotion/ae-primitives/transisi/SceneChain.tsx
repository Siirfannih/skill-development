// SceneChain.tsx — rangkaian adegan dengan transisi bertumpang: adegan lama tetap tampil di bawah selama transisi
// adegan berikutnya, jadi tidak ada frame hitam di sambungan. Panjang total = jumlah durasi adegan (transisi tidak
// menambah atau memotong durasi); adegan lama diperpanjang sebanyak frame transisi berikutnya.
//
// Transisi masuk per adegan: cut (0 f), whip (WhipPan in/out), grid (GridFlashReveal), flash (FlashCut di frame
// pertama adegan baru). Pemicu di akhir frase VO; adegan baru mendarat di kata pertama frase berikutnya.
import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { DURASI, FLASH, fr } from "../presets";
import { WhipPan, type WhipOptions } from "./WhipPanTransition";
import { GridFlashReveal, type GridFlashRevealProps } from "./GridFlashReveal";
import { FlashCut } from "../aksen/FlashCut";

export type ChainTransition =
  | { type: "cut" }
  | ({ type: "whip" } & WhipOptions)
  | ({ type: "grid" } & Omit<GridFlashRevealProps, "children" | "from">)
  | { type: "flash"; hold?: number; decay?: number; color?: string };

export type ChainScene = {
  id: string;
  durationInFrames: number;
  content: React.ReactNode;
  /** transisi masuk ke adegan ini (adegan pertama diabaikan) */
  enter?: ChainTransition;
};

/** Frame tumpang yang dibutuhkan transisi (adegan lama tetap dirender selama itu). */
export const overlapFrames = (t: ChainTransition | undefined, fps: number) => {
  if (!t) return 0;
  if (t.type === "whip") return t.durationInFrames ?? fr(DURASI.whip, fps);
  if (t.type === "grid") return t.durationInFrames ?? fr(DURASI.grid, fps);
  return 0;
};

const Masuk: React.FC<{ t?: ChainTransition; children: React.ReactNode }> = ({ t, children }) => {
  if (!t || t.type === "cut") return <>{children}</>;
  if (t.type === "whip") { const { type: _t, ...o } = t; return <WhipPan phase="in" {...o}>{children}</WhipPan>; }
  if (t.type === "grid") { const { type: _t, ...o } = t; return <GridFlashReveal {...o}>{children}</GridFlashReveal>; }
  return <FlashCut hold={t.hold} decay={t.decay ?? FLASH.potong.decay} color={t.color}>{children}</FlashCut>;
};

const Keluar: React.FC<{ next?: ChainTransition; from: number; children: React.ReactNode }> = ({ next, from, children }) => {
  if (next?.type === "whip") { const { type: _t, ...o } = next; return <WhipPan phase="out" from={from} {...o}>{children}</WhipPan>; }
  return <>{children}</>;
};

export type SceneChainProps = { scenes: ChainScene[]; background?: string };

export const SceneChain: React.FC<SceneChainProps> = ({ scenes, background }) => {
  const { fps } = useVideoConfig();
  let start = 0;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background }}>
      {scenes.map((s, i) => {
        const next = scenes[i + 1]?.enter;
        const ov = overlapFrames(next, fps);
        const from = start;
        start += s.durationInFrames;
        return (
          <Sequence key={s.id} from={from} durationInFrames={Math.max(1, s.durationInFrames + ov)} name={s.id}>
            <Keluar next={next} from={s.durationInFrames}>
              <Masuk t={i === 0 ? undefined : s.enter}>
                <div style={{ position: "absolute", inset: 0 }}>{s.content}</div>
              </Masuk>
            </Keluar>
          </Sequence>
        );
      })}
    </div>
  );
};
