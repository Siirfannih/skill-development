import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Accent, ArrowHead, C, CameraLayer, ease, GEO, MACRO_INLET, MACRO_PUMP, TextCard} from './visuals';

const WorldLabel: React.FC<{x: number; y: number; text: string; color?: string; fontSize?: number}> = ({x, y, text, color = C.ink, fontSize = 38}) => (
  <g>
    <rect x={x - 12} y={y - fontSize - 4} width={text.length * fontSize * 0.55 + 28} height={fontSize + 20} rx={18} fill="#FBFAF7" opacity={0.96} />
    <text x={x} y={y} fill={color} fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize={fontSize} fontWeight="750">
      {text}
    </text>
  </g>
);

export const B1: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = ease(frame, [62, 126], [0, 1]);
  const transitionShade = interpolate(frame, [56, 61, 66], [0, 0.88, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill>
      {frame < 62 ? (
        <CameraLayer src="img/macro-pump-pipe.png" camera={{scale: 1.25, cx: MACRO_PUMP.impeller.x, cy: MACRO_PUMP.impeller.y, targetY: 350}} />
      ) : (
        <CameraLayer src="img/well-full.png" camera={{
          scale: interpolate(tilt, [0, 1], [1.45, 1.08]),
          cx: interpolate(tilt, [0, 1], [GEO.pump.x, GEO.pipeX]),
          cy: interpolate(tilt, [0, 1], [GEO.pump.y, 1180]),
          targetY: interpolate(tilt, [0, 1], [475, 1110]),
        }} />
      )}
      <AbsoluteFill style={{backgroundColor: `rgba(31,20,13,${transitionShade})`, pointerEvents: 'none'}} />
      <TextCard showAt={0} hideAt={62} size={94} top={680} width={840} pill>
        Pompa airmu<br />nggak rusak.
      </TextCard>
      <TextCard showAt={62} size={86} top={135} pill>
        Air sumurmu yang<br /><Accent>terlalu dalam.</Accent>
      </TextCard>
    </AbsoluteFill>
  );
};

export const B2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const settle = spring({frame, fps, config: {damping: 24, stiffness: 90}, durationInFrames: 65});
  const pulse = interpolate(frame % 48, [0, 24, 47], [0.22, 0.48, 0.22], {
    easing: Easing.inOut(Easing.cubic),
  });
  const labelIn = spring({frame: frame - 144, fps, config: {damping: 18, stiffness: 150}});
  const xIn = spring({frame: frame - 79, fps, config: {damping: 14, stiffness: 190}, durationInFrames: 14});
  return (
    <AbsoluteFill>
      <CameraLayer src="img/macro-pump-pipe.png" camera={{
        scale: interpolate(settle, [0, 1], [1.25, 1.62]),
        cx: interpolate(settle, [0, 1], [MACRO_PUMP.impeller.x, MACRO_PUMP.pipeX]),
        cy: interpolate(settle, [0, 1], [MACRO_PUMP.impeller.y, 850]),
        targetY: interpolate(settle, [0, 1], [350, 1080]),
      }}>
        <defs>
          <linearGradient id="vacuum" x1="0" x2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity={pulse} />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x={MACRO_PUMP.pipeX - 50} y={MACRO_PUMP.emptyTop} width="100" height={MACRO_PUMP.waterY - MACRO_PUMP.emptyTop} rx="30" fill="url(#vacuum)" stroke="#FFFFFF" strokeOpacity={pulse} strokeWidth="4" />
        <g opacity={labelIn} transform={`translate(${interpolate(labelIn, [0, 1], [35, 0])} 0)`}>
          <path d="M 310 760 C 390 760, 455 720, 515 680" fill="none" stroke={C.warm} strokeWidth="9" strokeLinecap="round" />
          <circle cx="515" cy="680" r="10" fill={C.warm} />
          <WorldLabel x={105} y={770} text="ruang hampa" color={C.warm} fontSize={42} />
        </g>
      </CameraLayer>
      <TextCard showAt={2} hideAt={144} size={90} top={610} width={820} pill>
        Pompa nggak<br />
        <span style={{position: 'relative', display: 'inline-block'}}>
          nyedot
          <span style={{position: 'absolute', left: -12, top: '47%', width: '118%', height: 12, borderRadius: 8, backgroundColor: '#F03E3E', transform: `translateY(-50%) rotate(13deg) scaleX(${xIn})`, transformOrigin: 'center'}} />
          <span style={{position: 'absolute', left: -12, top: '47%', width: '118%', height: 12, borderRadius: 8, backgroundColor: '#F03E3E', transform: `translateY(-50%) rotate(-13deg) scaleX(${xIn})`, transformOrigin: 'center'}} />
        </span>{' '}air.
      </TextCard>
    </AbsoluteFill>
  );
};

export const B3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = spring({frame: frame - 9, fps, config: {damping: 22, stiffness: 80}, durationInFrames: 80});
  const pressure = spring({frame: frame - 56, fps, config: {damping: 18, stiffness: 140}, durationInFrames: 22});
  const cameraMove = spring({frame, fps, config: {damping: 22, stiffness: 82}, durationInFrames: 35});
  const columnTop = interpolate(rise, [0, 1], [MACRO_INLET.waterY, 330]);
  const arrowOffset = interpolate(pressure, [0, 1], [-70, 0]);
  return (
    <AbsoluteFill>
      <CameraLayer src="img/macro-water-inlet.png" camera={{
        scale: interpolate(cameraMove, [0, 1], [1.12, 1.34]),
        cx: MACRO_INLET.pipeX,
        cy: interpolate(cameraMove, [0, 1], [MACRO_INLET.inletY, 900]),
        targetY: interpolate(cameraMove, [0, 1], [1270, 1040]),
      }}>
        <rect x={MACRO_INLET.pipeLeft + 5} y="80" width={MACRO_INLET.pipeRight - MACRO_INLET.pipeLeft - 10} height={Math.max(0, columnTop - 80)} rx="12" fill="#28333B" opacity="0.94" />
        <rect x={MACRO_INLET.pipeLeft + 5} y={columnTop} width={MACRO_INLET.pipeRight - MACRO_INLET.pipeLeft - 10} height={MACRO_INLET.waterY - columnTop + 18} rx="12" fill="#11B8F1" opacity="0.48" />
        {[0, 1, 2, 3, 4].map((i) => {
          const bubbleCycle = (frame * (1 + i * 0.08) + i * 13) % 52;
          const bubbleY = interpolate(bubbleCycle, [0, 51], [MACRO_INLET.waterY - 20, columnTop + 25]);
          return <circle key={i} cx={MACRO_INLET.pipeX + (i % 2 === 0 ? -18 : 17)} cy={bubbleY} r={7 + (i % 3) * 2} fill="#FFFFFF" opacity={interpolate(bubbleCycle, [0, 8, 44, 51], [0, 0.85, 0.7, 0])} />;
        })}
        {[535, 580, 625].map((x) => (
          <g key={x} opacity={pressure} transform={`translate(0 ${arrowOffset})`}>
            <line x1={x} y1="850" x2={x} y2="984" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
            <ArrowHead x={x} y={1010} color="#FFFFFF" />
          </g>
        ))}
        <g opacity={pressure}>
          <rect x="650" y="850" width="332" height="72" rx="25" fill="rgba(0,0,0,.62)" />
          <text x="816" y="900" textAnchor="middle" fill="#FFFFFF" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="42" fontWeight="800">tekanan udara</text>
        </g>
      </CameraLayer>
    </AbsoluteFill>
  );
};

export const B4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 22, stiffness: 85}, durationInFrames: 35});
  const cameraMove = spring({frame, fps, config: {damping: 22, stiffness: 82}, durationInFrames: 28});
  const headline = Math.round((20.22 - 16.25) * 30);
  const y7 = GEO.groundY + GEO.pxPerMeter * 7;
  const y9 = GEO.groundY + GEO.pxPerMeter * 9;
  const y11 = GEO.waterY;
  return (
    <AbsoluteFill>
      <CameraLayer camera={{
        scale: interpolate(cameraMove, [0, 1], [1.08, 1]),
        cx: interpolate(cameraMove, [0, 1], [GEO.pipeX, 540]),
        cy: interpolate(cameraMove, [0, 1], [1060, 960]),
        targetY: 960,
      }}>
        <g opacity={reveal}>
          <rect x="720" y={GEO.groundY} width="58" height={y7 - GEO.groundY} fill={C.green} opacity="0.2" />
          <rect x="720" y={y7} width="58" height={y9 - y7} fill={C.warm} opacity="0.32" />
          <line x1="749" y1={GEO.groundY} x2="749" y2={y11} stroke="#FFFFFF" strokeWidth="6" />
          {[0, 3, 7, 9, 11].map((meter) => {
            const y = GEO.groundY + GEO.pxPerMeter * meter;
            return (
              <g key={meter}>
                <line x1={meter === 9 ? 695 : 723} y1={y} x2="779" y2={y} stroke={meter === 9 ? C.warm : '#FFFFFF'} strokeWidth={meter === 9 ? 9 : 5} />
                <rect x="790" y={y - 27} width={meter === 11 ? 112 : 98} height="54" rx="15" fill="#FFFFFF" opacity="0.96" />
                <text x="798" y={y + 13} fontFamily="-apple-system, sans-serif" fontSize="36" fontWeight="850" fill={C.ink}>{meter} m</text>
              </g>
            );
          })}
          <rect x={GEO.pipeX - 9} y={y9} width="18" height={GEO.waterY - y9 + 12} rx="9" fill={C.blue} opacity="0.9" />
          <g>
            <rect x="800" y={(y7 + y9) / 2 - 43} width="224" height="78" rx="25" fill={C.warm} stroke="#FFFFFF" strokeWidth="3" />
            <path d={`M 826 ${(y7 + y9) / 2 + 15} L 846 ${(y7 + y9) / 2 - 22} L 866 ${(y7 + y9) / 2 + 15} Z`} fill="#FFFFFF" />
            <text x="846" y={(y7 + y9) / 2 + 7} textAnchor="middle" fill={C.warm} fontFamily="-apple-system, sans-serif" fontSize="27" fontWeight="900">!</text>
            <text x="878" y={(y7 + y9) / 2 + 15} fill="#FFFFFF" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="48" fontWeight="850">7–9 m</text>
          </g>
        </g>
      </CameraLayer>
      <TextCard showAt={headline} size={104} pill><Accent>7–9 meter</Accent></TextCard>
    </AbsoluteFill>
  );
};

export const B5: React.FC = () => {
  const frame = useCurrentFrame();
  const textAt = Math.round(24.31 * 30) - 674;
  const cycle = frame % 60;
  const top = interpolate(cycle, [0, 24, 34, 59], [GEO.waterY, 980, 980, GEO.waterY], {
    easing: Easing.inOut(Easing.cubic),
  });
  const shake = interpolate(frame % 12, [0, 3, 6, 9, 11], [0, -4, 4, -3, 0], {
    easing: Easing.inOut(Easing.quad),
  });
  const cutSettle = ease(frame, [0, 7], [0.93, 1]);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${cutSettle})`, transformOrigin: '50% 58%'}}>
        <CameraLayer camera={{scale: 1, cx: 540, cy: 960, targetY: 960, targetX: 540 + shake * 0.4}} saturate={0.55} darken={0.08}>
          <rect x={GEO.pipeX - 9} y={top} width="18" height={GEO.waterY - top + 12} rx="9" fill={C.blue} opacity="0.9" />
          <g transform={`translate(${shake} 0)`}>
            <ellipse cx={GEO.pump.x} cy={GEO.pump.y} rx="150" ry="84" fill="none" stroke={C.warm} strokeWidth="10" opacity="0.9" />
          </g>
          <line x1={GEO.pipeX + 45} y1={GEO.groundY + 70} x2={GEO.pipeX + 45} y2={GEO.waterY - 20} stroke={C.warm} strokeWidth="8" strokeDasharray="18 18" opacity="0.9" />
          <path d={`M ${GEO.pipeX + 29} ${GEO.waterY - 45} L ${GEO.pipeX + 45} ${GEO.waterY - 20} L ${GEO.pipeX + 61} ${GEO.waterY - 45}`} fill="none" stroke={C.warm} strokeWidth="8" strokeLinecap="round" />
        </CameraLayer>
      </div>
      <TextCard showAt={textAt} size={86} pill>Pompa baru pun<br /><Accent>mancing terus.</Accent></TextCard>
    </AbsoluteFill>
  );
};

const MeasureStage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame: frame - 3, fps, config: {damping: 20, stiffness: 90}, durationInFrames: 35});
  const cameraMove = spring({frame, fps, config: {damping: 22, stiffness: 100}, durationInFrames: 16});
  return (
    <CameraLayer camera={{
      scale: interpolate(cameraMove, [0, 1], [1, 1.06]),
      cx: interpolate(cameraMove, [0, 1], [540, GEO.pipeX]),
      cy: interpolate(cameraMove, [0, 1], [960, 980]),
      targetY: 960,
    }}>
      <g opacity={reveal}>
        <line x1="825" y1={GEO.groundY} x2="825" y2={GEO.waterY} stroke={C.warm} strokeWidth="9" strokeDasharray="17 14" />
        <ArrowHead x={825} y={GEO.groundY} rotate={180} color={C.warm} />
        <ArrowHead x={825} y={GEO.waterY} color={C.warm} />
        <g>
          <rect x="624" y={(GEO.groundY + GEO.waterY) / 2 - 40} width="402" height="80" rx="26" fill="#FFFFFF" stroke={C.warm} strokeWidth="4" />
          <text x="825" y={(GEO.groundY + GEO.waterY) / 2 + 15} textAnchor="middle" fill={C.warm} fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="44" fontWeight="850">ukur jaraknya</text>
        </g>
      </g>
    </CameraLayer>
  );
};

const ProductStage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const highlight = spring({
    frame: frame - (Math.round(32.38 * 30) - 801),
    fps,
    config: {damping: 18, stiffness: 150},
    durationInFrames: 18,
  });
  return (
    <AbsoluteFill style={{backgroundColor: '#111111'}}>
      <Img src={staticFile('img/compare-shallow.png')} style={{position: 'absolute', inset: '0 0 auto 0', width: 1080, height: 960, objectFit: 'cover'}} />
      <Img src={staticFile('img/compare-deep.png')} style={{position: 'absolute', inset: '960px 0 auto 0', width: 1080, height: 960, objectFit: 'cover'}} />
      <div style={{position: 'absolute', inset: '0 0 auto 0', width: 1080, height: 960, backgroundColor: `rgba(0,0,0,${interpolate(highlight, [0, 1], [0, 0.48])})`}} />
      <div style={{position: 'absolute', left: 0, top: 960, width: 1080, height: 960, boxSizing: 'border-box', border: `${interpolate(highlight, [0, 1], [0, 14])}px solid ${C.warm}`, boxShadow: `inset 0 0 ${interpolate(highlight, [0, 1], [0, 42])}px rgba(232,89,12,.55)`}} />
      <div style={{position: 'absolute', left: 90, top: 760, width: 900, padding: '20px 30px', boxSizing: 'border-box', borderRadius: 24, backgroundColor: 'rgba(0,0,0,.67)', color: '#FFFFFF', textAlign: 'center', fontFamily: '-apple-system, sans-serif', fontSize: 44, lineHeight: 1.08, fontWeight: 850}}>Sampai 9 m: <span style={{fontSize: 36}}>pompa sumur dangkal</span></div>
      <div style={{position: 'absolute', left: 90, top: 1680, width: 900, padding: '20px 30px', boxSizing: 'border-box', borderRadius: 24, backgroundColor: 'rgba(0,0,0,.72)', color: '#FFFFFF', textAlign: 'center', fontFamily: '-apple-system, sans-serif', fontSize: 44, lineHeight: 1.08, fontWeight: 850}}>Lebih dari 9 m: <span style={{fontSize: 36, color: '#FFB07A'}}>pompa jet sumur dalam</span></div>
    </AbsoluteFill>
  );
};

export const B6: React.FC = () => {
  const frame = useCurrentFrame();
  const switchAt = Math.round((30.45 - 26.7) * 30);
  const qAt = Math.round((30.56 - 26.7) * 30);
  const answerAt = Math.round((32.38 - 26.7) * 30);
  return (
    <AbsoluteFill>
      {frame < switchAt ? <MeasureStage /> : <ProductStage />}
      <TextCard showAt={3} hideAt={switchAt} size={78} pill>Ukur: pompa ke<br />permukaan air</TextCard>
      <TextCard showAt={qAt} hideAt={answerAt} size={98} pill>Lebih dari <Accent>9 m?</Accent></TextCard>
      <TextCard showAt={answerAt} size={76} pill>Pakai pompa jet<br />sumur dalam</TextCard>
      {frame >= switchAt - 3 && frame <= switchAt + 4 ? (
        <AbsoluteFill style={{zIndex: 40, backgroundColor: '#FFFFFF', opacity: interpolate(frame, [switchAt - 3, switchAt, switchAt + 4], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />
      ) : null}
    </AbsoluteFill>
  );
};

export const B7: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const qAt = Math.round((34.61 - 34.5) * 30);
  const ctaAt = Math.round((37.09 - 34.5) * 30);
  const ctaIn = spring({frame: frame - ctaAt, fps, config: {damping: 20, stiffness: 150}, durationInFrames: 18});
  return (
    <AbsoluteFill>
      <CameraLayer camera={{scale: 1.04, cx: GEO.pipeX, cy: 970, targetY: 960}} blur={7} saturate={0.7} darken={0.46} />
      <TextCard showAt={qAt} hideAt={ctaAt} size={94} top={330} pill>Sumur di rumahmu<br />sedalam apa?</TextCard>
      {frame >= ctaAt ? (
        <div
          data-text
          style={{
            position: 'absolute',
            zIndex: 20,
            top: 780,
            left: 100,
            width: 880,
            boxSizing: 'border-box',
            padding: 48,
            borderRadius: 32,
            backgroundColor: 'rgba(255,255,255,0.85)',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            textAlign: 'center',
            opacity: ctaIn,
            transform: `translateY(${interpolate(ctaIn, [0, 1], [28, 0])}px)`,
          }}
        >
          <div style={{fontSize: 88, lineHeight: 1, letterSpacing: -3, fontWeight: 800, color: C.ink}}>Sumur di rumahmu<br />sedalam apa?</div>
          <div style={{marginTop: 28, fontSize: 52, lineHeight: 1.08, fontWeight: 800, color: C.warm}}>Tulis di komentar</div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
