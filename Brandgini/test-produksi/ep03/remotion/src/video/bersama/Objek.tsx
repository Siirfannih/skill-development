// Objek vektor dengan bentuk dan warna mirip aslinya (keputusan Irfan 25 Nov 2026 23:17: visual merek tidak memakai palet merek).
// Komponen bersama: literal warna boleh (dilaporkan tema_cek).
import React from 'react';

export const C = {
  garis: '#3A332E', garisEs: '#7FA6BA', es: '#E1F0F7', esTerang: '#F5FBFE', esGelembung: '#BFDCEA',
  putih: '#FFFFFF', garamGaris: '#9A9A96',
  santan: '#F6EBD2', santanBeku: '#FBF7EA', santanTepi: '#E9DCBC',
  kayu: '#B27845', kayuGelap: '#8F5E33', kayuTerang: '#CC9A63', kayuGaris: '#6B4423', besi: '#8A9199', baja: '#CFD6DC', bajaGelap: '#A9B2BA', bajaTerang: '#EAEEF1',
  label: '#F3E6C4', merah: '#C8402F', hijau: '#4E8A3C', cokelat: '#7A4B2A',
  merkuri: '#D63A2F', kaca: '#F7FAFC', kacaGaris: '#8F9AA3',
  panas: '#E2552B', beton: '#ABABA5', betonGaris: '#5B5B57', kertas: '#F3EFE6', kertasGaris: '#8C857A',
  dinding: '#EFE8DC', dindingGaris: '#E3DACB', cahaya: '#F8F3E9', lantai: '#D9CFC0', lantaiTepi: '#B8AD9C', lantaiGaris: '#C8BEAE',
  rotiKulit: '#C48A4A', rotiIsi: '#F4E2B8', waffle: '#D8A15A', waffleGaris: '#B7803C', es_krim: '#F6ECD2', ban: '#3A3735',
};
const SW = 5;
export const BAYANGAN = 'drop-shadow(0 22px 22px rgba(58,51,46,.28))';
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const rnd = hash;

export const Es: React.FC<{s?: number; rot?: number; melt?: number}> = ({s = 120, rot = 0, melt = 0}) => {
  const r = 14 + melt * 34; const k = 1 - melt * 0.22;
  return (
    <svg width={s} height={s} viewBox="0 0 120 120" style={{overflow: 'visible', transform: `rotate(${rot}deg)`}}>
      <rect x={60 - 48 * k} y={60 - 48 * k} width={96 * k} height={96 * k} rx={r} fill={C.es} stroke={C.garisEs} strokeWidth={SW} />
      <rect x={60 - 48 * k + 9} y={60 - 48 * k + 9} width={96 * k - 18} height={96 * k - 18} rx={Math.max(6, r - 8)} fill={C.esTerang} opacity={0.75} />
      <path d={`M${60 - 30 * k} ${60 + 24 * k} L${60 + 12 * k} ${60 - 16 * k}`} stroke={C.putih} strokeWidth={7} strokeLinecap="round" />
      <circle cx={60 + 18 * k} cy={60 + 14 * k} r={5} fill={C.esGelembung} /><circle cx={60 - 20 * k} cy={60 - 22 * k} r={3.5} fill={C.esGelembung} />
      {melt > 0.3 && <path d="M30 108 q-4 14 0 20 q4 -6 0 -20" fill={C.esGelembung} stroke={C.garisEs} strokeWidth={2} />}
    </svg>
  );
};

export const Kaleng: React.FC<{w?: number; h?: number; beku?: number; label?: boolean}> = ({w = 150, h = 190, beku = 0, label = true}) => (
  <svg width={w} height={h + 30} viewBox="0 0 150 220" style={{overflow: 'visible'}}>
    <ellipse cx={75} cy={204} rx={61} ry={16} fill={C.bajaGelap} stroke={C.garis} strokeWidth={SW} />
    <rect x={14} y={28} width={122} height={176} fill={C.baja} />
    <rect x={14} y={80} width={122} height={74} fill={C.label} />
    <rect x={14} y={80} width={122} height={14} fill={C.merah} /><rect x={14} y={140} width={122} height={14} fill={C.merah} />
    {label && <><circle cx={75} cy={117} r={15} fill={C.cokelat} /><path d="M75 102 q18 -10 26 4 q-14 4 -26 -4" fill={C.hijau} /></>}
    <rect x={22} y={34} width={10} height={164} fill={C.bajaTerang} opacity={0.8} />
    <line x1={14} y1={28} x2={14} y2={204} stroke={C.garis} strokeWidth={SW} /><line x1={136} y1={28} x2={136} y2={204} stroke={C.garis} strokeWidth={SW} />
    <path d="M14 204 a61 16 0 0 0 122 0" fill="none" stroke={C.garis} strokeWidth={SW} />
    <ellipse cx={75} cy={28} rx={61} ry={16} fill={C.bajaTerang} stroke={C.garis} strokeWidth={SW} />
    <ellipse cx={75} cy={28} rx={44} ry={10} fill={beku > 0.5 ? C.santanBeku : C.baja} stroke={C.bajaGelap} strokeWidth={3} />
    <ellipse cx={100} cy={26} rx={9} ry={5} fill="none" stroke={C.besi} strokeWidth={4} />
  </svg>
);

export const Baskom: React.FC<{w?: number; kaleng?: boolean; termo?: number}> = ({w = 640, kaleng = true, termo}) => {
  const cubes = Array.from({length: 18}, (_, n) => ({x: 40 + (n % 9) * (w - 170) / 8 + (rnd(n) - 0.5) * 18, y: 14 + Math.floor(n / 9) * 34 + rnd(n + 9) * 14, r: (rnd(n + 3) - 0.5) * 60, s: 66 + rnd(n + 5) * 16}));
  return (
    <svg width={w} height={w * 0.5} viewBox={`0 0 ${w} ${w * 0.5}`} style={{overflow: 'visible'}}>
      <ellipse cx={w / 2} cy={84} rx={w / 2 - 6} ry={34} fill={C.bajaGelap} stroke={C.garis} strokeWidth={SW} />
      <ellipse cx={w / 2} cy={90} rx={w / 2 - 40} ry={24} fill={C.esGelembung} />
      {cubes.map((c, n) => <g key={n} transform={`translate(${c.x} ${c.y}) rotate(${c.r} ${c.s / 2} ${c.s / 2})`}><foreignObject width={c.s} height={c.s} style={{overflow: 'visible'}}><Es s={c.s} /></foreignObject></g>)}
      {kaleng && <foreignObject x={w / 2 - 75} y={-95} width={150} height={240} style={{overflow: 'visible'}}><Kaleng w={150} h={190} /></foreignObject>}
      {termo !== undefined && <g transform={`translate(${w / 2 + 150} ${-190}) rotate(10 45 165)`}><foreignObject width={90} height={330} style={{overflow: 'visible'}}><Termometer h={330} level={termo} /></foreignObject></g>}
      <path d={`M6 84 H${w - 6} Q${w - 40} ${w * 0.46} ${w / 2} ${w * 0.46} Q40 ${w * 0.46} 6 84 Z`} fill={C.baja} stroke={C.garis} strokeWidth={SW} strokeLinejoin="round" />
      <path d={`M${w * 0.16} ${w * 0.2} Q${w * 0.3} ${w * 0.36} ${w * 0.5} ${w * 0.38}`} stroke={C.bajaTerang} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={`M6 84 Q${w / 2} 138 ${w - 6} 84`} fill="none" stroke={C.bajaTerang} strokeWidth={5} />
    </svg>
  );
};

export const Meja: React.FC<{w?: number}> = ({w = 1400}) => (
  <svg width={w} height={420} viewBox={`0 0 ${w} 420`} style={{overflow: 'visible'}}>
    <rect x={60} y={46} width={50} height={380} fill={C.kayuGelap} stroke={C.kayuGaris} strokeWidth={6} />
    <rect x={w - 110} y={46} width={50} height={380} fill={C.kayuGelap} stroke={C.kayuGaris} strokeWidth={6} />
    <rect x={0} y={0} width={w} height={46} rx={8} fill={C.kayu} stroke={C.kayuGaris} strokeWidth={7} />
    <rect x={0} y={0} width={w} height={14} rx={6} fill={C.kayuTerang} />
  </svg>
);

export const Termometer: React.FC<{h?: number; level: number; nolY?: number}> = ({h = 520, level}) => {
  const top = 30; const bulb = h - 40; const tube = bulb - top - 30;
  const y = top + tube * (1 - level);
  return (
    <svg width={90} height={h} viewBox={`0 0 90 ${h}`} style={{overflow: 'visible'}}>
      <rect x={25} y={top} width={40} height={tube + 40} rx={20} fill={C.kaca} stroke={C.kacaGaris} strokeWidth={SW} />
      <circle cx={45} cy={bulb} r={30} fill={C.kaca} stroke={C.kacaGaris} strokeWidth={SW} />
      <rect x={37} y={y} width={16} height={bulb - y} fill={C.merkuri} />
      <circle cx={45} cy={bulb} r={20} fill={C.merkuri} />
      <rect x={31} y={top + 10} width={6} height={tube - 10} rx={3} fill={C.putih} opacity={0.9} />
      {Array.from({length: 7}, (_, n) => <line key={n} x1={66} x2={n === 3 ? 90 : 80} y1={top + 20 + n * (tube - 20) / 6} y2={top + 20 + n * (tube - 20) / 6} stroke={C.garis} strokeWidth={4} />)}
      <line x1={-10} x2={90} y1={top + 20 + 3 * (tube - 20) / 6} y2={top + 20 + 3 * (tube - 20) / 6} stroke={C.besi} strokeWidth={4} strokeDasharray="10 8" />
    </svg>
  );
};

export const tongChunk = (n: number) => { const a = (n / 18) * Math.PI * 2 + rnd(n) * 0.2; const rad = 255 + (rnd(n + 4) - 0.5) * 40; return {x: 400 + Math.cos(a) * rad, y: 400 + Math.sin(a) * rad}; };
// Potongan melintang tong es puter: kayu berpita besi, campuran es-garam, kaleng baja berisi santan krem.
export const TongPotong: React.FC<{size?: number; putar?: number; garam?: number; melt?: number; beku?: number; kristal?: 'tak' | 'besar' | 'kecil'; kS?: number}> = ({size = 760, putar = 0, garam = 0, melt = 0, beku = 0, kristal = 'tak', kS = 1}) => {
  const cx = 400; const cy = 400;
  const chunks = Array.from({length: 18}, (_, n) => { const c = tongChunk(n); return {x: c.x, y: c.y, rot: rnd(n + 8) * 80, s: 70 + rnd(n + 2) * 20}; });
  const grains = Array.from({length: 46}, (_, n) => { const a = rnd(n + 20) * Math.PI * 2; const rad = 190 + rnd(n + 30) * 120; return {x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad}; });
  const spikes = Array.from({length: 22}, (_, n) => (n / 22) * Math.PI * 2);
  const rIn = 118 - beku * 78; const tebalKerak = Math.max(0, 132 - rIn);
  return (
    <svg width={size} height={size} viewBox="0 0 800 800" style={{overflow: 'visible'}}>
      <circle cx={cx} cy={cy} r={355} fill={C.kayu} stroke={C.kayuGaris} strokeWidth={8} />
      {Array.from({length: 24}, (_, n) => { const a = (n / 24) * Math.PI * 2; return <line key={n} x1={cx + Math.cos(a) * 320} y1={cy + Math.sin(a) * 320} x2={cx + Math.cos(a) * 354} y2={cy + Math.sin(a) * 354} stroke={C.kayuGaris} strokeWidth={4} />; })}
      <circle cx={cx} cy={cy} r={338} fill="none" stroke={C.besi} strokeWidth={10} />
      <circle cx={cx} cy={cy} r={318} fill={C.kayuGelap} />
      <circle cx={cx} cy={cy} r={298} fill={C.es} stroke={C.garisEs} strokeWidth={SW} />
      <g transform={`rotate(${putar} ${cx} ${cy})`}>
        {chunks.map((c, n) => <g key={n} transform={`translate(${c.x - c.s / 2} ${c.y - c.s / 2})`}><foreignObject width={c.s} height={c.s} style={{overflow: 'visible'}}><Es s={c.s} rot={c.rot} melt={melt} /></foreignObject></g>)}
        {garam > 0 && grains.slice(0, Math.round(garam * grains.length)).map((g, n) => <rect key={n} x={g.x} y={g.y} width={15} height={15} fill={C.putih} stroke={C.garamGaris} strokeWidth={2.5} transform={`rotate(${n * 31} ${g.x} ${g.y})`} />)}
        <circle cx={cx} cy={cy} r={152} fill={C.baja} stroke={C.garis} strokeWidth={SW + 2} />
        <circle cx={cx} cy={cy} r={140} fill={C.bajaTerang} />
        <circle cx={cx} cy={cy} r={132} fill={C.santan} stroke={C.santanTepi} strokeWidth={4} />
        {beku > 0 && <circle cx={cx} cy={cy} r={(132 + rIn) / 2} fill="none" stroke={C.santanBeku} strokeWidth={tebalKerak} />}
        {beku > 0 && <circle cx={cx} cy={cy} r={(132 + rIn) / 2 + tebalKerak * 0.28} fill="none" stroke={C.esTerang} strokeWidth={tebalKerak * 0.34} opacity={0.9} />}
        {beku > 0 && <circle cx={cx} cy={cy} r={rIn} fill={C.santan} />}
      </g>
      {kristal !== 'tak' && spikes.map((a, n) => {
        const L = (kristal === 'besar' ? 44 + rnd(n) * 36 : 10 + rnd(n) * 8) * kS;
        const x0 = cx + Math.cos(a) * 132; const y0 = cy + Math.sin(a) * 132;
        const x1 = cx + Math.cos(a) * (132 - L); const y1 = cy + Math.sin(a) * (132 - L);
        const nx = -Math.sin(a) * (kristal === 'besar' ? 15 : 6); const ny = Math.cos(a) * (kristal === 'besar' ? 15 : 6);
        return kristal === 'besar'
          ? <polygon key={n} points={`${x0 + nx},${y0 + ny} ${x1},${y1} ${x0 - nx},${y0 - ny}`} fill={C.es} stroke={C.garisEs} strokeWidth={4} strokeLinejoin="round" />
          : <circle key={n} cx={(x0 + x1) / 2} cy={(y0 + y1) / 2} r={L / 2} fill={C.esTerang} stroke={C.garisEs} strokeWidth={2.5} />;
      })}
    </svg>
  );
};

export const Gerobak: React.FC<{w?: number}> = ({w = 760}) => (
  <svg width={w} height={w * 0.72} viewBox="0 0 760 546" style={{overflow: 'visible'}}>
    <line x1={620} y1={300} x2={740} y2={200} stroke={C.kayuGaris} strokeWidth={16} strokeLinecap="round" />
    <rect x={120} y={250} width={500} height={150} rx={12} fill={C.kayu} stroke={C.kayuGaris} strokeWidth={8} />
    {[290, 330, 370].map((y) => <line key={y} x1={124} x2={616} y1={y} y2={y} stroke={C.kayuGaris} strokeWidth={4} />)}
    <rect x={120} y={250} width={500} height={22} fill={C.kayuTerang} stroke={C.kayuGaris} strokeWidth={6} />
    <rect x={190} y={116} width={260} height={144} rx={22} fill={C.kayuGelap} stroke={C.kayuGaris} strokeWidth={8} />
    {[0, 1, 2, 3].map((n) => <line key={n} x1={250 + n * 55} x2={250 + n * 55} y1={120} y2={256} stroke={C.kayuGaris} strokeWidth={4} />)}
    <rect x={188} y={150} width={264} height={12} fill={C.besi} /><rect x={188} y={214} width={264} height={12} fill={C.besi} />
    <ellipse cx={320} cy={116} rx={130} ry={24} fill={C.baja} stroke={C.garis} strokeWidth={6} />
    <rect x={420} y={92} width={130} height={20} rx={10} fill={C.kayuGaris} />
    <circle cx={210} cy={430} r={70} fill={C.ban} stroke={C.garis} strokeWidth={6} /><circle cx={210} cy={430} r={46} fill={C.kayuTerang} stroke={C.kayuGaris} strokeWidth={5} /><circle cx={210} cy={430} r={10} fill={C.besi} />
    <circle cx={520} cy={430} r={70} fill={C.ban} stroke={C.garis} strokeWidth={6} /><circle cx={520} cy={430} r={46} fill={C.kayuTerang} stroke={C.kayuGaris} strokeWidth={5} /><circle cx={520} cy={430} r={10} fill={C.besi} />
  </svg>
);

export const Tiang: React.FC<{h?: number}> = ({h = 700}) => (
  <svg width={260} height={h} viewBox="0 0 260 700" style={{overflow: 'visible'}}>
    <rect x={118} y={40} width={24} height={660} fill={C.beton} stroke={C.betonGaris} strokeWidth={5} />
    <rect x={30} y={90} width={200} height={20} fill={C.beton} stroke={C.betonGaris} strokeWidth={5} />
    {[40, 120, 200].map((x) => <rect key={x} x={x - 6} y={72} width={12} height={18} fill={C.putih} stroke={C.betonGaris} strokeWidth={3} />)}
    <path d="M30 100 Q-40 160 -140 140" stroke={C.garis} strokeWidth={5} fill="none" />
    <path d="M230 100 Q300 160 400 140" stroke={C.garis} strokeWidth={5} fill="none" />
  </svg>
);

export const Karung: React.FC<{w?: number}> = ({w = 260}) => (
  <svg width={w} height={w * 1.1} viewBox="0 0 260 286" style={{overflow: 'visible'}}>
    <path d="M60 30 H200 L214 70 Q250 160 220 260 Q130 290 40 260 Q10 160 46 70 Z" fill={C.kertas} stroke={C.kertasGaris} strokeWidth={6} strokeLinejoin="round" />
    <path d="M52 100 Q130 118 208 100" stroke={C.kertasGaris} strokeWidth={4} fill="none" /><path d="M40 220 Q130 238 220 220" stroke={C.kertasGaris} strokeWidth={4} fill="none" />
    <rect x={80} y={140} width={100} height={40} rx={6} fill={C.putih} stroke={C.kertasGaris} strokeWidth={3} /><line x1={92} y1={152} x2={168} y2={152} stroke={C.kertasGaris} strokeWidth={4} /><line x1={92} y1={166} x2={150} y2={166} stroke={C.kertasGaris} strokeWidth={4} />
    <path d="M60 30 L70 8 H190 L200 30" fill={C.putih} stroke={C.kertasGaris} strokeWidth={5} />
  </svg>
);

export const Roti: React.FC<{w?: number}> = ({w = 300}) => (
  <svg width={w} height={w} viewBox="0 0 300 300" style={{overflow: 'visible'}}>
    <path d="M60 110 Q40 40 130 50 Q150 20 200 40 Q270 30 250 110 Q260 160 240 250 H70 Q50 160 60 110 Z" fill={C.rotiKulit} stroke={C.kayuGaris} strokeWidth={7} strokeLinejoin="round" />
    <path d="M86 118 Q150 98 214 118 Q222 170 214 232 H86 Q78 170 86 118 Z" fill={C.rotiIsi} />
    {[[120, 150], [170, 170], [140, 200], [188, 140], [112, 190]].map(([x, y], n) => <circle key={n} cx={x} cy={y} r={3.5} fill={C.kayuTerang} />)}
  </svg>
);

export const Cone: React.FC<{w?: number; cangkir?: boolean}> = ({w = 300, cangkir = false}) => (
  <svg width={w} height={w * 1.2} viewBox="0 0 300 360" style={{overflow: 'visible'}}>
    <polygon points="70,150 230,150 150,340" fill={C.waffle} stroke={C.kayuGaris} strokeWidth={7} strokeLinejoin="round" />
    <path d="M100 168 L190 240 M140 158 L206 214 M110 214 L170 158 M200 160 L118 262 M170 160 L136 296" stroke={C.waffleGaris} strokeWidth={4} />
    <circle cx={150} cy={110} r={74} fill={C.es_krim} stroke={C.kertasGaris} strokeWidth={6} />
    <path d="M78 140 Q100 170 120 146 Q150 184 180 146 Q204 172 222 140" fill={C.es_krim} stroke={C.kertasGaris} strokeWidth={5} />
    <path d="M110 80 Q130 62 160 66" stroke={C.putih} strokeWidth={8} strokeLinecap="round" fill="none" />
    {cangkir && <path d="M84 236 H216 L200 352 H100 Z" fill={C.baja} stroke={C.garis} strokeWidth={7} strokeLinejoin="round" />}
  </svg>
);

export const Pengerok: React.FC<{w?: number}> = ({w = 260}) => (
  <svg width={w} height={w * 0.5} viewBox="0 0 260 130" style={{overflow: 'visible'}}>
    <rect x={0} y={50} width={160} height={26} rx={13} fill={C.kayuGelap} stroke={C.kayuGaris} strokeWidth={5} />
    <path d="M150 20 H240 L250 110 H150 Z" fill={C.baja} stroke={C.garis} strokeWidth={5} strokeLinejoin="round" />
    <path d="M162 30 H226 L232 100" stroke={C.bajaTerang} strokeWidth={6} fill="none" />
  </svg>
);

export const Label: React.FC<{teks: string; w?: number}> = ({teks, w = 300}) => (
  <div style={{width: w, padding: '10px 18px', background: C.putih, border: `5px solid ${C.garis}`, borderRadius: 14, boxShadow: '0 10px 22px rgba(58,51,46,.30)', fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 40, color: C.garis, textAlign: 'center', letterSpacing: '0.02em'}}>{teks}</div>
);

export const Kontak: React.FC<{w: number; h?: number}> = ({w, h = 26}) => (
  <div style={{width: w, height: h, borderRadius: '50%', background: 'rgba(58,51,46,.30)', transform: 'translate(-50%,-50%)', position: 'absolute'}} />
);
