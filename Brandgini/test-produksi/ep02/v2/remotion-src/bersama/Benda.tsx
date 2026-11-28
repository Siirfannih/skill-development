// Benda berwarna dan berbentuk mirip aslinya (Addendum 3: tanpa palet merek untuk benda). Digambar dengan kode, tanpa foto.
import React from 'react';

export const C = {
  kulit: '#E7B590', kulitGelap: '#CF9871', kulitPucat: '#C8CFA0', rambut: '#2B1D14', baju: '#2F7F8F', bajuSopir: '#6B7280',
  mobil: '#C8352E', mobilGelap: '#8E241F', kaca: '#BFE0EE', ban: '#1D1E22', velg: '#BCC2C8', aspal: '#4B4E54', garis: '#F3F1E8',
  rumput: '#86B86B', rumputGelap: '#6AA356', langitAtas: '#BFE1F3', langitBawah: '#EAF5F9', bukit: '#A4C795', bukitJauh: '#B9D6B3',
  daun: '#4F8F4A', batang: '#7A5230', awan: '#FFFFFF', netral: '#EFE9DF', netralGelap: '#E3DBCD',
  otak: '#E8A9B4', otakLipatan: '#C47A8B', otakKecil: '#D98F9B', tulang: '#EDE2D0', tulangGaris: '#B9A688', saraf: '#E8C95A', sarafGelap: '#B99A2A',
  cairan: '#A5D4F0', cairanGaris: '#6FAAD0', mataPutih: '#FBFAF6', iris: '#6B4A2B', pupil: '#111114', hp: '#1D1F24', layarHp: '#D8ECFF', layarHpGelap: '#9BC4EE',
  setir: '#26282D', logam: '#9AA1A8', karet: '#3A3C42', merah: '#D6453B', kuning: '#E7B93B', hijau: '#4FA35B', bayangan: 'rgba(30,25,20,0.28)',
  putih: '#FFFFFF', tebakan: '#FFB84D', dashboard: '#2B2D33', dashboardGaris: '#3C3F47',
};

/** Kepala dari samping (kecil), untuk penumpang dalam mobil. mood: pucat (mual) | tenang | oh. Menghadap kanan. */
export const KepalaMini: React.FC<{x: number; y: number; r: number; mood: 'pucat' | 'tenang' | 'oh'}> = ({x, y, r, mood}) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={mood === 'pucat' ? C.kulitPucat : C.kulit} />
    <path d={`M${-r} ${-r * 0.1} Q${-r} ${-r * 1.15} ${r * 0.15} ${-r * 1.05} Q${r * 0.95} ${-r * 0.95} ${r * 0.85} ${-r * 0.35} Q${r * 0.2} ${-r * 0.55} ${-r * 0.35} ${-r * 0.2} Z`} fill={C.rambut} />
    <path d={`M${r * 0.95} ${-r * 0.05} l${r * 0.28} ${r * 0.22} l${-r * 0.28} ${r * 0.08}`} fill={mood === 'pucat' ? C.kulitPucat : C.kulit} />
    {mood === 'pucat' ? <path d={`M${r * 0.35} ${-r * 0.1} h${r * 0.28}`} stroke={C.rambut} strokeWidth={r * 0.09} strokeLinecap="round" /> : <circle cx={r * 0.5} cy={-r * 0.1} r={r * 0.08} fill={C.rambut} />}
    <path d={`M${r * 0.45} ${r * 0.5} q${r * 0.2} ${mood === 'tenang' ? r * 0.12 : mood === 'oh' ? r * 0.2 : -r * 0.06} ${r * 0.4} 0`} fill="none" stroke={C.mobilGelap} strokeWidth={r * 0.07} strokeLinecap="round" />
    <ellipse cx={-r * 0.1} cy={r * 0.1} rx={r * 0.13} ry={r * 0.2} fill={C.kulitGelap} />
  </g>
);

/** Mobil dari samping, menghadap kanan. Titik (x,y) = tengah alas, y = permukaan jalan (roda menapak). L = panjang px (mobil 4,5 m). */
export const MobilSamping: React.FC<{x: number; y: number; L?: number; roda?: number; tilt?: number; penumpang?: 'pucat' | 'tenang' | 'oh' | null; sopir?: boolean; geserKepala?: number}> =
({x, y, L = 800, roda = 0, tilt = 0, penumpang = 'pucat', sopir = true, geserKepala = 0}) => {
  const k = L / 800;
  const Roda = ({cx}: {cx: number}) => (
    <g transform={`translate(${cx} -58)`}>
      <circle r={58} fill={C.ban} /><circle r={36} fill={C.velg} />
      <g transform={`rotate(${roda})`}>{[0, 72, 144, 216, 288].map((a) => <path key={a} d="M0 0 L-6 -34 L6 -34 Z" fill={C.ban} opacity={0.55} transform={`rotate(${a})`} />)}</g>
      <circle r={9} fill={C.logam} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${k}) rotate(${tilt})`}>
      <ellipse cx={0} cy={3} rx={420} ry={16} fill={C.bayangan} />
      {/* badan */}
      <path d="M-395 -62 L-395 -128 Q-395 -150 -368 -158 L-262 -172 L-196 -258 Q-188 -268 -172 -268 L50 -268 Q70 -268 82 -256 L205 -176 L338 -152 Q392 -138 396 -100 L396 -62 Z" fill={C.mobil} />
      <path d="M-395 -100 L396 -100 L396 -62 L-395 -62 Z" fill={C.mobilGelap} opacity={0.55} />
      {/* penumpang di balik kaca */}
      {penumpang && <KepalaMini x={-105 + geserKepala} y={-212} r={27} mood={penumpang} />}
      {sopir && <KepalaMini x={62} y={-212} r={27} mood="tenang" />}
      {/* kaca */}
      <path d="M-228 -178 L-182 -250 L-26 -250 L-26 -178 Z" fill={C.kaca} opacity={0.3} stroke={C.mobilGelap} strokeWidth={5} strokeLinejoin="round" />
      <path d="M-8 -178 L-8 -250 L48 -250 Q60 -250 68 -242 L168 -178 Z" fill={C.kaca} opacity={0.3} stroke={C.mobilGelap} strokeWidth={5} strokeLinejoin="round" />
      <path d="M-17 -250 V-80" stroke={C.mobilGelap} strokeWidth={5} />
      <rect x={-40} y={-148} width={34} height={8} rx={4} fill={C.mobilGelap} /><rect x={10} y={-148} width={34} height={8} rx={4} fill={C.mobilGelap} />
      <path d="M185 -176 L205 -176 L198 -160 L178 -160 Z" fill={C.mobilGelap} />
      <path d="M385 -118 Q396 -124 396 -104 L378 -100 Z" fill={C.kuning} /><rect x={-396} y={-124} width={12} height={28} rx={4} fill={C.merah} />
      <path d="M-395 -62 H396" stroke={C.ban} strokeWidth={10} />
      <Roda cx={-255} /><Roda cx={255} />
    </g>
  );
};

/** Pohon sederhana: batang + tajuk bundar. */
export const Pohon: React.FC<{x: number; y: number; h: number}> = ({x, y, h}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-h * 0.04} y={-h * 0.45} width={h * 0.08} height={h * 0.45} fill={C.batang} />
    <circle cx={0} cy={-h * 0.62} r={h * 0.3} fill={C.daun} /><circle cx={-h * 0.18} cy={-h * 0.5} r={h * 0.2} fill={C.daun} /><circle cx={h * 0.19} cy={-h * 0.52} r={h * 0.2} fill={C.rumputGelap} opacity={0.9} />
  </g>
);

const mod = (a: number, n: number) => ((a % n) + n) % n;
/** Latar jalan dari samping (mata manusia): langit, bukit jauh, pohon, jalan. Menggulung ke kiri mengikuti laju mobil (dunia statis, mobil yang melaju). */
export const LatarJalanSamping: React.FC<{scroll: number; jalanY: number}> = ({scroll, jalanY}) => {
  const tile = (period: number, speed: number, draw: (i: number, x: number) => React.ReactNode, n: number) => {
    const off = mod(scroll * speed, period);
    return Array.from({length: n}).map((_, i) => draw(i, i * period - off - period));
  };
  return (
    <g>
      <defs><linearGradient id="langit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.langitAtas} /><stop offset="1" stopColor={C.langitBawah} /></linearGradient></defs>
      <rect x={-400} y={-400} width={1880} height={jalanY + 400} fill="url(#langit)" />
      {tile(520, 0.08, (i, x) => <ellipse key={'aw' + i} cx={x + 200} cy={260 + (i % 2) * 70} rx={150} ry={38} fill={C.awan} opacity={0.9} />, 5)}
      {tile(640, 0.18, (i, x) => <path key={'bj' + i} d={`M${x} ${jalanY - 120} Q${x + 220} ${jalanY - 420} ${x + 440} ${jalanY - 120} Z`} fill={C.bukitJauh} />, 5)}
      {tile(480, 0.4, (i, x) => <path key={'bk' + i} d={`M${x} ${jalanY - 60} Q${x + 200} ${jalanY - 260} ${x + 420} ${jalanY - 60} Z`} fill={C.bukit} />, 6)}
      <rect x={-400} y={jalanY - 70} width={1880} height={120} fill={C.rumput} />
      {tile(360, 0.7, (i, x) => <Pohon key={'p' + i} x={x} y={jalanY - 30} h={i % 3 === 0 ? 300 : 230} />, 6)}
      <rect x={-400} y={jalanY} width={1880} height={1200} fill={C.aspal} />
      <rect x={-400} y={jalanY} width={1880} height={10} fill={C.garis} opacity={0.6} />
      {tile(200, 1, (i, x) => <rect key={'g' + i} x={x} y={jalanY + 150} width={110} height={12} rx={3} fill={C.garis} />, 9)}
    </g>
  );
};

/** Latar netral lembut untuk adegan anatomi (benda berwarna asli yang menonjol). */
export const LatarNetral: React.FC<{geser?: number}> = ({geser = 0}) => (
  <g>
    <rect x={-400} y={-400} width={1880} height={2720} fill={C.netral} />
    <circle cx={200 - geser * 0.3} cy={300} r={420} fill={C.netralGelap} opacity={0.55} /><circle cx={900 - geser * 0.2} cy={1500} r={520} fill={C.netralGelap} opacity={0.5} />
  </g>
);

/** Penumpang duduk dari samping (dada ke atas) menghadap kanan; condong = derajat badan ke depan, hp = memegang HP. */
export const PenumpangDuduk: React.FC<{x: number; y: number; s?: number; mood: 'pucat' | 'tenang' | 'oh'; condong?: number; kepalaMiring?: number; hp?: boolean; tangan?: 'mulut' | 'pangku' | 'hp'}> =
({x, y, s = 1, mood, condong = 0, kepalaMiring = 0, tangan = 'pangku'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* jok */}
    <path d="M-120 330 L-150 -40 Q-150 -90 -100 -90 L-60 -90 L-40 330 Z" fill={C.karet} />
    <g transform={`rotate(${condong} -40 300)`}>
      <path d="M-100 330 L-90 40 Q-90 -10 -40 -10 L70 -10 Q110 -10 110 40 L120 330 Z" fill={C.baju} />
      <rect x={-18} y={-50} width={50} height={50} rx={14} fill={mood === 'pucat' ? C.kulitPucat : C.kulit} />
      <g transform={`rotate(${kepalaMiring} 0 -40)`}>
        <KepalaMini x={20} y={-120} r={84} mood={mood} />
      </g>
      {tangan === 'mulut' && <g><path d="M70 120 Q150 70 110 -70" stroke={C.baju} strokeWidth={46} strokeLinecap="round" fill="none" /><ellipse cx={108} cy={-88} rx={30} ry={24} fill={mood === 'pucat' ? C.kulitPucat : C.kulit} /></g>}
      {tangan === 'hp' && <g><path d="M70 130 Q170 120 190 50" stroke={C.baju} strokeWidth={46} strokeLinecap="round" fill="none" /><rect x={165} y={-30} width={46} height={92} rx={8} fill={C.hp} transform="rotate(16 188 16)" /><rect x={172} y={-22} width={32} height={74} rx={4} fill={C.layarHp} transform="rotate(16 188 16)" /><ellipse cx={186} cy={62} rx={24} ry={18} fill={C.kulit} /></g>}
    </g>
  </g>
);
