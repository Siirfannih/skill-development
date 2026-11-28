// Dunia.tsx · v3. Pantai dari POV SAMPING (mata manusia): gerobak es, penjual, pembeli dengan proporsi nyata (1 m = 120 px: orang 1,7 m = 204 px,
// badan gerobak 1,4 m x 0,9 m). Semua benda menapak di pasir (G); bayangan kontak tepat di bawah roda/kaki. Yang bergerak hanya benda yang wajar bergerak:
// gerobak didorong (roda berputar), pembeli berjalan. Panjang 1 km dimampatkan (konvensi diagram, papan "0" dan "1 km" di ujung).
import React from 'react';
import { HURUF } from './bersama/tema';
import { ASLI, TENDA_A, TENDA_B, KAOS } from './bersama/warnaAsli';
import { kf, mv } from './waktu';
import { Orang } from './Orang';
import { G, px } from './kamera';

export const posA = (t: number) =>
  kf(t, [[0, 480], [9.1, 480], [10.6, 900, 'heavy'], [15.7, 900], [18.2, 1080, 'land'], [25.4, 1080], [29.3, 1285, 'heavy'], [52.99, 1285], [53.0, 480]]);
export const posB = (t: number) =>
  kf(t, [[0, 1000], [3.0, 1000], [4.6, 715, 'land'], [9.1, 715], [12.2, 1900, 'heavy'], [22.8, 1900], [24.9, 1720, 'land'], [27.0, 1720], [29.3, 1515, 'heavy'],
    [30.9, 1515], [32.1, 2260, 'heavy'], [33.4, 2260], [34.6, 1515, 'heavy'], [52.99, 1515], [53.0, 1000]]);

const SKALA_ORANG = 1.7;   // 119 px (gambar dasar) x 1,7 = 202 px = 1,7 m

/** Gerobak es tampak samping, kaki roda di y=0 (pasir). `putar` = sudut roda (derajat). */
export const Gerobak: React.FC<{ x: number; tenda: [string, string]; putar: number }> = ({ x, tenda, putar }) => (
  <g transform={`translate(${x} ${G})`}>
    {/* bayangan kontak: tepat di bawah roda, pipih di tanah */}
    <ellipse cx={0} cy={3} rx={118} ry={9} fill={ASLI.tinta} fillOpacity={0.28} />
    <ellipse cx={0} cy={2} rx={84} ry={5} fill={ASLI.tinta} fillOpacity={0.25} />
    {/* tiang dan payung (puncak 2,3 m) */}
    <line x1={0} y1={-140} x2={0} y2={-236} stroke={ASLI.kayuTua} strokeWidth={6} strokeLinecap="round" />
    <path d="M-110 -226 Q0 -304 110 -226 Z" fill={tenda[0]} />
    <path d="M-72 -243 Q-37 -276 -37 -226 L-72 -226 Z M0 -272 Q37 -262 37 -226 L-37 -226 Q-37 -262 0 -272 Z M37 -226 Q37 -262 72 -243 L72 -226 Z" fill={tenda[1]} />
    <path d="M-110 -226 q18 14 36 0 q18 14 36 0 q18 14 36 0 q18 14 36 0 q18 14 36 0 q18 14 36 0 Z" fill={tenda[0]} />
    {/* kotak es kayu + kaca etalase */}
    <rect x={-85} y={-118} width={170} height={58} rx={5} fill={ASLI.kayu} stroke={ASLI.kayuTua} strokeWidth={4} />
    <rect x={-74} y={-110} width={148} height={30} rx={3} fill={ASLI.krem} />
    <path d="M-30 -104 L-18 -84 L-42 -84 Z" fill={ASLI.kuning} /><circle cx={-30} cy={-108} r={9} fill={ASLI.putih} stroke={ASLI.kayuTua} strokeWidth={2} />
    <rect x={-85} y={-146} width={170} height={28} rx={4} fill={ASLI.kaca} fillOpacity={0.75} stroke={ASLI.kayuTua} strokeWidth={3} />
    {[[-52, ASLI.merah], [-16, ASLI.putih], [20, ASLI.kuning], [56, ASLI.teal]].map(([cx, c]) => <g key={String(cx)}><rect x={Number(cx) - 12} y={-130} width={24} height={12} rx={2} fill={ASLI.putih} stroke={ASLI.kayuTua} strokeWidth={2} /><ellipse cx={Number(cx)} cy={-133} rx={12} ry={8} fill={String(c)} /></g>)}
    <line x1={85} y1={-100} x2={140} y2={-86} stroke={ASLI.kayuTua} strokeWidth={7} strokeLinecap="round" />
    {/* rangka dan roda berputar */}
    <rect x={-80} y={-62} width={160} height={10} fill={ASLI.kayuTua} />
    {[-54, 54].map((cx) => (
      <g key={cx} transform={`translate(${cx} -30)`}>
        <circle r={30} fill={ASLI.roda} /><circle r={19} fill={ASLI.rodaTepi} /><circle r={4} fill={ASLI.roda} />
        <g transform={`rotate(${putar})`} stroke={ASLI.roda} strokeWidth={3}><line x1={-19} y1={0} x2={19} y2={0} /><line x1={0} y1={-19} x2={0} y2={19} /></g>
      </g>
    ))}
  </g>
);

const Papan: React.FC<{ x: number; teks: string }> = ({ x, teks }) => (
  <g transform={`translate(${x} ${G})`}>
    <ellipse cx={0} cy={3} rx={46} ry={7} fill={ASLI.tinta} fillOpacity={0.28} />
    <rect x={-8} y={-210} width={16} height={210} fill={ASLI.kayuTua} />
    <rect x={-84} y={-250} width={168} height={92} rx={8} fill={ASLI.kayu} stroke={ASLI.kayuTua} strokeWidth={5} />
    <text x={0} y={-186} textAnchor="middle" fontFamily={HURUF.keluarga.isi} fontWeight={HURUF.bobot.kunci} fontSize={HURUF.ukuran.kunci - 26} fill={ASLI.krem}>{teks}</text>
  </g>
);

const N = 21;
const x0 = (i: number) => px(i / (N - 1));
/** posisi pembeli ke-i: berjalan menuju gerobak terdekat saat "tiap orang jalan ke yang paling dekat" (13,7-15,3), satu orang di tengah pindah ke A (19,5-21,5). */
const xPembeli = (i: number, t: number) => {
  const a = x0(i);
  const tujuan = a < 1400 ? 900 : 1900;
  const jalan = a + (tujuan - a) * 0.24;
  let x = kf(t, [[13.7, a], [15.3, jalan, 'heavy']]);
  if (i < 5) x = kf(t, [[5.4, a - 900], [7.7, a, 'drift'], [13.7, a], [15.3, jalan, 'heavy']]);   // berjalan masuk dari kiri saat kamera menarik mundur
  if (i === 10) x = kf(t, [[13.7, a], [15.3, jalan, 'heavy'], [19.5, jalan], [21.6, 1215, 'heavy']]);
  return x;
};
const bergerak = (f: (t: number) => number, t: number) => Math.abs(f(t + 0.04) - f(t - 0.04)) > 0.35;

export const Dunia: React.FC<{ t: number; f: number }> = ({ t }) => {
  const awal = t >= 53.0;
  const a = posA(t), b = posB(t);
  const rot = (f: (t: number) => number) => (f(t) / 30) * (180 / Math.PI);
  const mid = (a + b) / 2;
  const tampilJalur = t >= 9.2 && !awal;
  const jalurProg = mv(t, 9.2, 0.7, 'reveal');
  const tt = awal ? t - 53 : t;
  const xHook = kf(tt, [[0, 820], [3.4, 590, 'drift']]);
  return (
    <g>
      {/* papan ujung 0 dan 1 km */}
      <Papan x={px(0) - 240} teks="0" />
      <Papan x={px(1) + 140} teks="1 km" />
      {/* jalur wilayah di pasir depan: warna payung gerobak terdekat (anotasi diagram) */}
      {tampilJalur && (
        <g>
          <clipPath id="klipJalur"><rect x={px(0) - 60} y={G + 40} width={(px(1) - px(0) + 120) * jalurProg} height={60} /></clipPath>
          <g clipPath="url(#klipJalur)">
            <rect x={px(0) - 60} y={G + 50} width={mid - px(0) + 60} height={36} rx={12} fill={TENDA_A[0]} />
            <rect x={mid} y={G + 50} width={px(1) + 60 - mid} height={36} rx={12} fill={TENDA_B[0]} />
            {t >= 19.0 && t < 22.8 && <rect x={1400} y={G + 44} width={(1490 - 1400) * mv(t, 19.0, 0.5, 'reveal')} height={48} fill={ASLI.kuning} fillOpacity={0.85} rx={8} />}
          </g>
        </g>
      )}
      {/* pembeli berdiri di belakang gerobak (lebih jauh dari kamera: kaki 18 px di atas tanah gerobak; kepala tetap terlihat di atas etalase) */}
      {!awal && t >= 6.5 && Array.from({ length: N }).map((_, i) => {
        const xi = xPembeli(i, t);
        const jalan = bergerak((tt2) => xPembeli(i, tt2), t);
        return <Orang key={i} x={xi} y={G - 18} langkah={t * 7} skala={SKALA_ORANG} kaos={KAOS[(i * 5) % KAOS.length]} diam={!jalan} arah={i === 10 && t > 19 ? -1 : (x0(i) < 1400 ? 1 : -1)} />;
      })}
      {/* penjual berdiri di belakang gerobak (di bawah payung) */}
      <g><Orang x={a + 6} y={G - 4} langkah={0} skala={SKALA_ORANG} kaos={ASLI.putih} /></g>
      {b > 0 && <g><Orang x={b + 6} y={G - 4} langkah={0} skala={SKALA_ORANG} kaos={ASLI.putih} /></g>}
      <Gerobak x={a} tenda={TENDA_A} putar={rot(posA)} />
      <Gerobak x={b} tenda={TENDA_B} putar={rot(posB)} />
      {(t < 6.3 || awal) && (() => {
        const jalan = tt < 3.4;
        return <Orang x={xHook} y={G + 26} langkah={tt * 7} skala={SKALA_ORANG} kaos={ASLI.kuning} diam={!jalan} arah={-1} />;
      })()}
    </g>
  );
};
