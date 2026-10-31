import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

// Panel 07 v3 "Tiba akhir tahun menanti" — uji 2.5D: bidang datar di kedalaman berbeda + kamera perspektif.
// Tidak ada mesh 3D atau pencahayaan; warna = token loris/* (ditulis hex karena dipakai di SVG).
const C = {
	cobalt: '#1E56D6',
	navy: '#141B4D',
	navyDeep: '#0E1338',
	cream: '#F1EAD8',
	red: '#D9332B',
	sky: '#7FA4E8',
	lime: '#B6E52C',
	ink: '#0B0E24',
	hood: '#1A2560',
};

const P = 1600; // jarak perspektif kamera (px)
const appleOut = Easing.bezier(0.22, 1, 0.36, 1);
const drift = Easing.inOut(Easing.sin);

// Bidang datar di kedalaman z; skala dikompensasi supaya frame 0 sama dengan storyboard.
const Plane: React.FC<{z: number; children: React.ReactNode}> = ({z, children}) => (
	<AbsoluteFill style={{transformStyle: 'preserve-3d', transform: `translateZ(${z}px) scale(${(P - z) / P})`}}>
		{children}
	</AbsoluteFill>
);

const Page: React.FC<{
	x: number;
	y: number;
	s: number;
	rot: number;
	flipX?: number;
	flipY?: number;
	month?: string;
	day: string;
	blur?: number;
}> = ({x, y, s, rot, flipX = 0, flipY = 0, month, day, blur = 0}) => (
	<div
		style={{
			position: 'absolute',
			left: x - 90,
			top: y - 110,
			width: 180,
			height: 220,
			borderRadius: 8,
			background: C.cream,
			overflow: 'hidden',
			transform: `scale(${s}) rotateZ(${rot}deg) rotateX(${flipX}deg) rotateY(${flipY}deg)`,
			filter: blur ? `blur(${blur}px)` : undefined,
			fontFamily: 'Arial, Helvetica, sans-serif',
			fontWeight: 700,
			boxShadow: '0 10px 30px rgba(11,14,36,0.18)',
		}}
	>
		<div style={{height: 50, background: C.red, color: '#fff', fontSize: 28, textAlign: 'center', lineHeight: '50px'}}>
			{month}
		</div>
		<div style={{fontSize: 96, color: C.navy, textAlign: 'center', lineHeight: '150px'}}>{day}</div>
	</div>
);

const Grain: React.FC = () => (
	<AbsoluteFill style={{mixBlendMode: 'overlay', opacity: 0.08, pointerEvents: 'none'}}>
		<svg width="1920" height="1080">
			<filter id="grain">
				<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
				<feColorMatrix type="saturate" values="0" />
			</filter>
			<rect width="1920" height="1080" filter="url(#grain)" />
		</svg>
	</AbsoluteFill>
);

export const Scene07: React.FC = () => {
	const f = useCurrentFrame();

	// Kamera: dolly mundur pelan + roll kecil, drift tanpa henti (aturan: linear hanya untuk drift).
	const dolly = interpolate(f, [0, 180], [0, -340], {easing: drift});
	const roll = interpolate(f, [0, 180], [0, -2.5], {easing: drift});
	const ringPulse = 1 + 0.02 * Math.sin(f / 18);

	// Lembar tengah (30 Nov, 31 Des): jatuh + berkibar.
	const midFall = interpolate(f, [0, 180], [-180, 90]);
	const flutter = (phase: number) => 28 * Math.sin(f / 9 + phase);

	// Lembar jauh (15, 24): hampir diam.
	const farFall = interpolate(f, [0, 180], [-40, 60]);

	// Lembar dekat lensa: melintas cepat dengan blur (DOF).
	const nearT = interpolate(f, [36, 108], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: appleOut});
	const nearX = interpolate(nearT, [0, 1], [2150, 700]);
	const nearY = interpolate(nearT, [0, 1], [-260, 2300]);

	// Tokoh: menengadah 4° di "menanti" (±f 90), napas idle 1 %.
	const look = interpolate(f, [84, 112], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: appleOut});
	const breathe = 1 + 0.01 * Math.sin(f / 20);

	return (
		<AbsoluteFill style={{background: C.cobalt, perspective: P, overflow: 'hidden'}}>
			<AbsoluteFill style={{transformStyle: 'preserve-3d', transform: `translateZ(${dolly}px) rotateZ(${roll}deg)`}}>
				{/* Langit + bulan + lingkar */}
				<Plane z={-2600}>
					<svg width="1920" height="1080" style={{overflow: 'visible'}}>
						<rect x="-900" y="-600" width="3720" height="2280" fill={C.cobalt} />
						<g fill="none" stroke={C.sky} strokeWidth="3" opacity="0.6" transform={`translate(960 300) scale(${ringPulse}) translate(-960 -300)`}>
							<circle cx="960" cy="300" r="280" />
							<circle cx="960" cy="300" r="480" />
							<circle cx="960" cy="300" r="700" />
						</g>
						<circle cx="960" cy="300" r="130" fill={C.cream} />
					</svg>
				</Plane>

				{/* Lembar jauh */}
				<Plane z={-1500}>
					<Page x={800} y={250 + farFall} s={0.32} rot={24} flipX={flutter(1) / 2} day="15" />
					<Page x={1130} y={220 + farFall * 0.8} s={0.28} rot={-26} flipY={flutter(2) / 2} day="24" />
				</Plane>

				{/* Gedung */}
				<Plane z={-900}>
					<svg width="1920" height="1080" style={{overflow: 'visible'}}>
						<polygon points="-1400,-200 420,230 640,1600 -1400,1600" fill={C.navy} />
						<polygon points="420,230 470,240 680,1600 640,1600" fill={C.cream} />
						<polygon points="3300,-200 1480,220 1260,1600 3300,1600" fill={C.navy} />
						<polygon points="1480,220 1430,235 1220,1600 1260,1600" fill={C.cream} />
						<polygon points="-1400,500 260,560 380,1600 -1400,1600" fill={C.navyDeep} />
						<polygon points="3300,540 1680,590 1560,1600 3300,1600" fill={C.navyDeep} />
					</svg>
				</Plane>

				{/* Lembar tengah */}
				<Plane z={-380}>
					<Page x={760} y={520 + midFall * 0.9} s={0.62} rot={-16 + f * 0.05} flipX={flutter(0)} month="NOV" day="30" />
					<Page x={1180} y={470 + midFall} s={0.66} rot={14 - f * 0.04} flipY={flutter(1.5)} month="DES" day="31" />
				</Plane>

				{/* Tokoh: siluet punggung, cahaya tepi lime */}
				<Plane z={0}>
					<svg width="1920" height="1080" style={{overflow: 'visible'}}>
						<g transform={`translate(960 1080) scale(${breathe}) translate(-960 -1080)`}>
							<path d="M520,1180 C540,950 680,890 800,878 L1120,878 C1240,890 1380,950 1400,1180Z" fill={C.ink} />
							<path d="M790,880 C840,968 1080,968 1130,880" fill="none" stroke={C.hood} strokeWidth="12" />
							<rect x="895" y="840" width="130" height="60" fill={C.ink} />
							<path d="M1120,878 C1240,890 1380,950 1400,1180" fill="none" stroke={C.lime} strokeWidth="8" strokeLinecap="round" />
							<g transform={`rotate(${-4 * look} 960 880) translate(0 ${-8 * look})`}>
								<ellipse cx="832" cy="770" rx="22" ry="34" fill={C.ink} />
								<ellipse cx="1088" cy="770" rx="22" ry="34" fill={C.ink} />
								<ellipse cx="960" cy="740" rx="128" ry="146" fill={C.ink} />
								<path d="M880,618 C900,540 1010,520 1060,590 C1090,560 1130,560 1150,590 C1110,590 1080,610 1060,640 C1010,600 940,600 880,618Z" fill={C.ink} />
								<path d="M990,596 A128,146 0 0 1 1086,700" fill="none" stroke={C.lime} strokeWidth="8" strokeLinecap="round" />
								<path d="M1060,590 C1090,560 1130,560 1150,590" fill="none" stroke={C.lime} strokeWidth="6" strokeLinecap="round" />
								<path d="M1106,752 C1110,770 1106,790 1098,800" fill="none" stroke={C.lime} strokeWidth="6" strokeLinecap="round" />
								<path d="M1088,760 L1120,754" fill="none" stroke={C.lime} strokeWidth="4" strokeLinecap="round" />
							</g>
						</g>
					</svg>
				</Plane>

				{/* Lembar dekat lensa (DOF blur) */}
				<Plane z={620}>
					<Page x={nearX} y={nearY} s={1.9} rot={28 - nearT * 60} flipX={flutter(0.5)} month="DES" day="2" blur={10} />
				</Plane>
			</AbsoluteFill>
			<Grain />
		</AbsoluteFill>
	);
};
