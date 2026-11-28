// Dunia "kepala potong" (hero beat 3–11, 14): profil kepala menghadap kanan dengan potongan yang memperlihatkan telinga dalam
// (daun telinga, saluran, gendang, tulang pendengaran, rumah siput, saluran setengah lingkaran berisi cairan), otak, bola mata, saraf.
import React from 'react';
import {C} from './Benda';

export const SIL = 'M-230 -40 C-260 -250 -110 -330 30 -325 C170 -320 245 -240 250 -140 C252 -110 258 -90 270 -70 C285 -45 315 -15 330 30 C335 50 322 62 300 66 C305 85 298 100 302 118 C298 135 303 150 296 168 C288 200 260 225 232 245 C205 290 150 310 105 305 L105 460 L-170 460 L-180 330 C-250 250 -260 120 -230 -40 Z';
const RAMBUT = 'M-235 -30 C-265 -260 -110 -345 35 -338 C175 -332 255 -250 255 -150 C220 -190 160 -215 80 -210 C10 -205 -60 -170 -80 -110 C-100 -60 -110 -10 -130 40 C-170 40 -205 20 -235 -30 Z';

// jalur saraf (koordinat kepala)
export const SARAF_TELINGA = 'M42 118 C30 60 -10 20 -52 -4 C-62 -10 -62 -22 -58 -34';
export const SARAF_MATA = 'M178 -52 C80 -62 -70 -92 -178 -112';
/** Denyut sinyal di sepanjang saraf: garis putus-putus kuning terang bergerak. t = frame, on = 0..1. */
export const Denyut: React.FC<{d: string; t: number; on: number; arah?: 1 | -1}> = ({d, t, on, arah = 1}) => (
  <path d={d} fill="none" stroke="#FFF3B0" strokeWidth={9} strokeLinecap="round" strokeDasharray="22 78" strokeDashoffset={-arah * t * 5} opacity={on} />
);

/** Telinga bagian dalam. Koordinat lokal: saluran masuk dari kiri (x=0) ke gendang (x≈84), tulang pendengaran, rumah siput, tiga saluran setengah lingkaran. */
export const TelingaDalam: React.FC<{aliran?: number; miring?: number}> = ({aliran = 0, miring = 0}) => {
  const tube = (rx: number, ry: number, cx: number, cy: number, rot: number, key: string) => (
    <g key={key} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <ellipse rx={rx} ry={ry} fill="none" stroke={C.tulangGaris} strokeWidth={17} />
      <ellipse rx={rx} ry={ry} fill="none" stroke={C.tulang} strokeWidth={13} />
      <ellipse rx={rx} ry={ry} fill="none" stroke={C.cairan} strokeWidth={8} />
      <ellipse rx={rx} ry={ry} fill="none" stroke="#E8F5FD" strokeWidth={3} strokeDasharray="10 34" strokeDashoffset={-aliran} />
    </g>
  );
  return (
    <g>
      {/* saluran telinga */}
      <path d="M0 80 L84 84 L84 112 L0 118 Z" fill={C.kulitGelap} stroke={C.tulangGaris} strokeWidth={3} />
      <path d="M0 99 H84" stroke="#B47E5E" strokeWidth={2} />
      {/* gendang telinga */}
      <ellipse cx={86} cy={98} rx={6} ry={22} fill="#F4DED2" stroke="#B98A78" strokeWidth={2.5} />
      {/* tulang pendengaran: martil, landasan, sanggurdi */}
      <path d="M92 98 L122 84 Q130 82 132 90 L124 100 Q116 106 98 100 Z" fill={C.tulang} stroke={C.tulangGaris} strokeWidth={2.5} />
      <path d="M126 86 L148 96 Q152 104 146 108 L138 104 Z" fill={C.tulang} stroke={C.tulangGaris} strokeWidth={2.5} />
      <path d="M146 106 L158 122 M158 122 q10 -4 14 4 q-6 8 -16 2" fill="none" stroke={C.tulangGaris} strokeWidth={4} strokeLinecap="round" />
      {/* saluran setengah lingkaran berisi cairan (tiga bidang) */}
      <g transform={`rotate(${miring} 190 70)`}>
        {tube(40, 30, 196, 38, 0, 'a')}{tube(34, 44, 214, 52, 62, 'b')}{tube(32, 24, 178, 56, -48, 'c')}
      </g>
      {/* vestibulum */}
      <ellipse cx={186} cy={106} rx={30} ry={22} fill={C.tulang} stroke={C.tulangGaris} strokeWidth={4} />
      <ellipse cx={186} cy={106} rx={22} ry={15} fill={C.cairan} />
      {/* rumah siput */}
      <path d="M212 118 C262 98 296 140 266 170 C240 192 200 170 212 144 C222 126 250 128 252 148 C254 160 238 164 234 152" fill="none" stroke={C.tulangGaris} strokeWidth={22} strokeLinecap="round" />
      <path d="M212 118 C262 98 296 140 266 170 C240 192 200 170 212 144 C222 126 250 128 252 148 C254 160 238 164 234 152" fill="none" stroke={C.tulang} strokeWidth={17} strokeLinecap="round" />
      <path d="M212 118 C262 98 296 140 266 170 C240 192 200 170 212 144 C222 126 250 128 252 148 C254 160 238 164 234 152" fill="none" stroke={C.cairan} strokeWidth={9} strokeLinecap="round" />
      {/* saraf keseimbangan + pendengaran */}
      <path d="M186 84 C170 60 150 40 128 20" fill="none" stroke={C.saraf} strokeWidth={8} strokeLinecap="round" />
    </g>
  );
};

export const Mata: React.FC<{lihat?: number; kedip?: number}> = ({lihat = 0, kedip = 0}) => (
  <g>
    {/* bola mata dari samping: putih mata, kornea, iris, pupil */}
    <circle r={42} fill={C.mataPutih} stroke="#C9B8A6" strokeWidth={3} />
    <path d="M36 -30 Q70 -28 70 0 Q70 28 36 30 Q52 0 36 -30 Z" fill="#E4F1F7" stroke="#B9CEDA" strokeWidth={2.5} />
    <ellipse cx={46 + lihat} cy={0} rx={9} ry={21} fill={C.iris} />
    <ellipse cx={50 + lihat} cy={0} rx={5} ry={11} fill={C.pupil} />
    <circle cx={53 + lihat} cy={-6} r={3} fill="#fff" />
    {/* kelopak */}
    <path d={`M-46 ${-8 - kedip * 0} Q0 ${-62 + kedip * 54} 66 ${-24 + kedip * 22} Q40 ${-30 + kedip * 28} -46 ${-8}`} fill={C.kulitGelap} opacity={0.96} />
  </g>
);

export const Otak: React.FC<{sorot?: number}> = ({sorot = 0}) => (
  <g>
    <path d="M-195 -130 C-200 -230 -100 -285 -10 -272 C85 -290 190 -225 188 -140 C190 -75 120 -42 40 -52 C-20 -30 -120 -30 -170 -70 C-190 -85 -195 -105 -195 -130 Z" fill={C.otak} stroke={C.otakLipatan} strokeWidth={4} />
    {/* lipatan otak */}
    <g fill="none" stroke={C.otakLipatan} strokeWidth={5} strokeLinecap="round">
      <path d="M-150 -170 C-110 -220 -60 -210 -40 -170 C-20 -140 20 -150 30 -190" /><path d="M-170 -110 C-120 -140 -90 -100 -50 -120 C-20 -135 10 -110 40 -125" />
      <path d="M40 -240 C60 -200 100 -210 120 -240" /><path d="M60 -150 C100 -170 130 -150 150 -190" /><path d="M-110 -80 C-70 -95 -40 -75 -10 -85 C30 -95 60 -80 90 -90" />
      <path d="M-10 -265 C-30 -220 0 -200 -20 -170" /><path d="M120 -110 C140 -130 160 -120 170 -140" />
    </g>
    {/* otak kecil + batang otak */}
    <path d="M-150 -42 C-170 -20 -140 4 -100 -4 C-70 -10 -60 -34 -82 -42 Z" fill={C.otakKecil} stroke={C.otakLipatan} strokeWidth={3} />
    <path d="M-60 -50 C-56 0 -60 40 -50 80 L-20 80 C-24 40 -14 0 -10 -52 Z" fill="#DE9AA3" stroke={C.otakLipatan} strokeWidth={3} />
    {sorot > 0 && <path d="M-110 -170 C-60 -240 60 -250 120 -190" fill="none" stroke="#FFF3B0" strokeWidth={7} strokeLinecap="round" strokeDasharray="6 22" opacity={sorot} />}
  </g>
);

/** Kepala potong lengkap. Skala 1 ≈ 640 px lebar. cut = 0..1 kemunculan potongan (beat 3). */
export const KepalaPotong: React.FC<{cut?: number; t?: number; telinga?: number; mata?: number; aliran?: number; miring?: number; lihat?: number; mood?: 'pucat' | 'tenang'}> =
({cut = 1, t = 0, telinga = 0, mata = 0, aliran = 0, miring = 0, lihat = 0, mood = 'tenang'}) => (
  <g>
    <path d={SIL} fill={mood === 'pucat' ? C.kulitPucat : C.kulit} stroke={C.kulitGelap} strokeWidth={5} strokeLinejoin="round" />
    <path d={RAMBUT} fill={C.rambut} />
    {/* potongan: jaringan dalam, tengkorak, otak, telinga dalam, bola mata */}
    <clipPath id="klipKepala"><path d={SIL} /></clipPath>
    <g clipPath="url(#klipKepala)" opacity={cut}>
      <path d="M-215 -55 C-240 -235 -105 -308 30 -304 C160 -300 228 -226 232 -134 C234 -105 240 -86 252 -68 C266 -44 290 -14 306 28 C310 44 300 52 282 56 C286 76 280 92 284 108 C280 126 285 142 278 160 C270 190 246 212 222 230 C196 272 142 290 98 286 L98 460 L-160 460 L-168 335 C-232 245 -240 120 -215 -55 Z" fill="#F2E1CC" />
      <path d="M-205 -60 C-225 -222 -100 -292 30 -288 C150 -284 214 -216 218 -130 C190 -80 120 -30 40 -34 C-30 -20 -110 -10 -150 40 C-190 70 -200 10 -205 -60 Z" fill={C.tulang} stroke={C.tulangGaris} strokeWidth={4} />
      <g transform="translate(0 -6)"><Otak sorot={0} /></g>
      <g transform="translate(-110 14)"><TelingaDalam aliran={aliran} miring={miring} /></g>
      <g transform="translate(212 -52)"><Mata lihat={lihat} /></g>
      <path d={SARAF_TELINGA} fill="none" stroke={C.sarafGelap} strokeWidth={9} strokeLinecap="round" />
      <path d={SARAF_TELINGA} fill="none" stroke={C.saraf} strokeWidth={6} strokeLinecap="round" />
      <path d={SARAF_MATA} fill="none" stroke={C.sarafGelap} strokeWidth={9} strokeLinecap="round" />
      <path d={SARAF_MATA} fill="none" stroke={C.saraf} strokeWidth={6} strokeLinecap="round" />
      <Denyut d={SARAF_TELINGA} t={t} on={telinga} /><Denyut d={SARAF_MATA} t={t} on={mata} arah={-1} />
    </g>
    {/* daun telinga di sisi kepala */}
    <path d="M-128 6 C-170 -6 -178 70 -148 108 C-130 130 -104 120 -104 100 C-120 96 -130 70 -122 50 C-116 32 -100 20 -88 28 Z" fill={C.kulitGelap} stroke="#B47E5E" strokeWidth={3} opacity={1 - cut * 0.85} />
    <path d="M-150 30 C-156 60 -146 86 -128 96" fill="none" stroke="#B47E5E" strokeWidth={3} strokeLinecap="round" opacity={1 - cut * 0.85} />
  </g>
);
