// SubjectMatte · cutout narasumber beralfa (WebM VP9 transparan) yang SAMA resolusi/fps/durasi dengan klip sumbernya.
// File diletakkan di public/mattes/<key>.webm (di Mac). Kunci: news_gates, news_teen, news_billion, news_fast, altman, jensen.
// Dipakai sebagai lapis `fg` di <AnchorStage>: urutan z = bg (klip) → teks → fg (matte), sehingga teks tampak di BELAKANG kepala.
// Matte harus dirender dengan transform/grade/trim IDENTIK dengan klip bg (pakai <MatteClip> dengan props yang sama persis seperti <Clip>).
import React from "react";
import { AbsoluteFill, getInputProps, OffthreadVideo, Sequence, staticFile } from "remotion";
import { f, FPS } from "./time";
import { useSceneFrom } from "./anim";

export type SubjectMatteKey = "news_gates" | "news_teen" | "news_billion" | "news_fast" | "altman" | "jensen";

/**
 * Path (relatif ke public/) matte untuk sebuah klip. Selalu mengembalikan `mattes/<key>.webm`.
 * Render tanpa file matte (mis. cek tsc/studio di mesin tanpa media): jalankan dengan input props `{"noMatte": true}` → null,
 * adegan jatuh kembali ke teks DI DEPAN klip.
 */
export const useSubjectMatte = (key: SubjectMatteKey): string | null =>
  (getInputProps() as { noMatte?: boolean }).noMatte ? null : `mattes/${key}.webm`;

/**
 * Padanan <Clip> untuk matte beralfa: argumen (src, at, inS, outS, style, grade) sama persis dengan Clip dari ./media,
 * sehingga transform, objectFit (cover), trim, dan grade jatuh pada piksel yang sama dengan klip latar.
 * Dirender lewat OffthreadVideo `transparent` (frame PNG beralfa) — bukan <Video> dari @remotion/media.
 */
export const MatteClip: React.FC<{
  src: string; at: number; inS: number; outS: number; style?: React.CSSProperties; grade?: string;
}> = ({ src, at, inS, outS, style, grade }) => {
  const sceneFrom = useSceneFrom();
  return (
    <Sequence from={f(at) - sceneFrom} durationInFrames={Math.max(1, Math.round((outS - inS) * FPS))} layout="none">
      <AbsoluteFill style={style}>
        <OffthreadVideo
          src={staticFile(src)} transparent muted trimBefore={Math.round(inS * FPS)}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: grade }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};
