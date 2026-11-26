// Video.tsx — kerangka: SceneChain + Camera25D + latar/grain opsional. Ganti isi adegan; tulis hanya yang belum ada di toolkit.
// Latar dan grain mati bawaan (tema.ts LATAR.mode = "off", GRAIN.opacity = 0). Props boleh menimpa untuk still uji:
//   npx remotion still src/index.ts Utama out.png --frame=40 --props='{"latar":"cahaya","grain":0.08,"orbit":6}'
// Gerbang warna keluar (scripts/warna/cek-warna.mjs keluar): still kedua dengan --props='{"sembunyikanTeks":true}' (semua teks transparan,
// kotak dan latar tetap) dipakai sebagai --tanpa-teks. Tiap elemen teks baru wajib ikut prop ini (color: sembunyikanTeks ? "transparent" : ...).
import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneChain, type ChainScene } from "./toolkit/transisi";
import { Camera25D, Layer25D } from "./toolkit/kamera/Camera25D";
import { GenerativeBG } from "./toolkit/latar/GenerativeBG";
import { LightWaveBg } from "./toolkit/latar/LightWaveBg";
import { Grain } from "./toolkit/latar/Grain";
import { HURUF, LATAR, MEREK, NETRAL, GRAIN } from "./tema";

export type VideoProps = {
  judul: string; sembunyikanTeks?: boolean; latar?: typeof LATAR.mode; grain?: number; orbit?: number;
  /** override uji (props eksplisit menimpa preset): */
  preset?: string; gelapTerang?: "dark" | "light"; saturation?: number; intensity?: number; glow?: { x: number; y: number; r: number; strength?: number };
};
type LatarProps = Pick<VideoProps, "preset" | "gelapTerang" | "saturation" | "intensity" | "glow"> & { mode: typeof LATAR.mode };

const Latar: React.FC<LatarProps> = ({ mode, preset = LATAR.preset, glow, gelapTerang, ...o }) => {
  const warna = LATAR.warna.length >= 2 ? LATAR.warna : undefined;
  if (mode === "off" || (!warna && !preset)) return null;
  // nilai tema yang kosong tidak dikirim, supaya nilai preset tetap berlaku; yang diisi menimpa preset
  const ov = { colors: warna, mode: gelapTerang ?? (LATAR.gelapTerang || undefined), glow: glow ?? LATAR.glow ?? undefined, seed: LATAR.seed ?? undefined, ...o };
  if (mode === "cahaya") return <LightWaveBg preset={preset || undefined} {...ov} />;
  return <GenerativeBG preset={preset || undefined} {...ov} mode={mode} zones={ov.glow ? [{ ...ov.glow }] : undefined} />;
};

const Adegan: React.FC<{ judul: string; orbit: number; lp: LatarProps; sembunyi?: boolean }> = ({ judul, orbit, lp, sembunyi }) => (
  <Camera25D
    background={MEREK.latar || undefined}
    keys={[{ at: 0, push: 0, orbit: 0 }, { at: 80, push: 120, orbit, curve: "heavy" }]}
    drift={{ amp: 4, seed: 2 }}
  >
    <Layer25D z={-400} fill><Latar {...lp} /></Layer25D>
    <Layer25D z={0}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", color: sembunyi ? "transparent" : NETRAL.tinta || undefined,
        fontFamily: HURUF.keluarga.judul || undefined, fontSize: HURUF.ukuran.judul || undefined }}>{judul}</AbsoluteFill>
    </Layer25D>
  </Camera25D>
);

export const Video: React.FC<VideoProps> = ({ judul, sembunyikanTeks = false, latar = LATAR.mode, grain = GRAIN.opacity, orbit = 0, ...o }) => {
  const lp: LatarProps = { mode: latar, ...o };
  const scenes: ChainScene[] = [
    { id: "a1", durationInFrames: 90, content: <Adegan judul={judul} orbit={orbit} lp={lp} sembunyi={sembunyikanTeks} /> },
    { id: "a2", durationInFrames: 90, enter: { type: "cut" }, content: <Adegan judul={judul} orbit={-orbit} lp={lp} sembunyi={sembunyikanTeks} /> },
  ];
  return (
    <AbsoluteFill>
      <SceneChain scenes={scenes} background={MEREK.latar || undefined} />
      <Grain opacity={grain} seed={GRAIN.seed} />
    </AbsoluteFill>
  );
};
