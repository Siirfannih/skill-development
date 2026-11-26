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

export const C = {
  ink: '#111111',
  warm: '#E8590C',
  green: '#2F9E44',
  blue: '#169BD5',
  paper: '#FBFAF7',
};

export const GEO = {
  pump: {x: 746, y: 344},
  pipeX: 566,
  groundY: 432,
  wellLeft: 448,
  wellRight: 666,
  waterY: 1403,
  waterBottomY: 1920,
  pxPerMeter: (1403 - 432) / 11,
};

export const MACRO_PUMP = {
  impeller: {x: 537, y: 310},
  pipeX: 540,
  emptyTop: 544,
  waterY: 1217,
};

export const MACRO_INLET = {
  pipeX: 580,
  pipeLeft: 545,
  pipeRight: 614,
  waterY: 1034,
  inletY: 1390,
};

export type Camera = {
  scale: number;
  cx: number;
  cy: number;
  targetX?: number;
  targetY?: number;
};

export const CameraLayer: React.FC<
  React.PropsWithChildren<{
    camera: Camera;
    src?: string;
    blur?: number;
    saturate?: number;
    darken?: number;
  }>
> = ({camera, src = 'img/well-full.png', blur = 0, saturate = 1, darken = 0, children}) => {
  const targetX = camera.targetX ?? 540;
  const targetY = camera.targetY ?? 1060;
  const x = targetX - camera.cx * camera.scale;
  const y = targetY - camera.cy * camera.scale;

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          width: 1080,
          height: 1920,
          transformOrigin: '0 0',
          transform: `translate3d(${x}px, ${y}px, 0) scale(${camera.scale})`,
          filter: `blur(${blur}px) saturate(${saturate})`,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{position: 'absolute', inset: 0, width: 1080, height: 1920, objectFit: 'cover'}}
        />
        {darken > 0 ? <div style={{position: 'absolute', inset: 0, backgroundColor: `rgba(0,0,0,${darken})`}} /> : null}
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0, overflow: 'visible'}}
        >
          {children}
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const popStyle = (frame: number, delay: number, fps: number) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 18, stiffness: 170, mass: 0.8},
    durationInFrames: 18,
  });
  return {
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [34, 0])}px) scale(${interpolate(progress, [0, 1], [0.97, 1])})`,
  };
};

export const TextCard: React.FC<{
  children: React.ReactNode;
  showAt: number;
  hideAt?: number;
  size?: number;
  top?: number;
  width?: number;
  align?: 'center' | 'left';
  color?: string;
  pill?: boolean;
}> = ({children, showAt, hideAt, size = 92, top = 190, width = 900, align = 'center', color = '#FFFFFF', pill = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < showAt || (hideAt !== undefined && frame >= hideAt)) return null;
  return (
    <div
      data-text
      style={{
        position: 'absolute',
        zIndex: 20,
        top,
        left: (1080 - width) / 2,
        width,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
        fontSize: size,
        lineHeight: 1.04,
        letterSpacing: -3.2,
        fontWeight: 760,
        color,
        textAlign: align,
        textWrap: 'balance',
        textShadow: color === '#FFFFFF' ? '0 5px 22px rgba(0,0,0,.95), 0 2px 5px rgba(0,0,0,.95)' : undefined,
        boxSizing: 'border-box',
        padding: pill ? '26px 34px' : undefined,
        borderRadius: pill ? 28 : undefined,
        backgroundColor: pill ? 'rgba(0,0,0,.55)' : undefined,
        ...popStyle(frame, showAt, fps),
      }}
    >
      {children}
    </div>
  );
};

export const Accent: React.FC<React.PropsWithChildren<{green?: boolean}>> = ({children, green}) => (
  <span style={{color: green ? C.green : C.warm}}>{children}</span>
);

export const ease = (frame: number, input: [number, number], output: [number, number]) =>
  interpolate(frame, input, output, {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const ArrowHead: React.FC<{x: number; y: number; rotate?: number; color?: string}> = ({
  x,
  y,
  rotate = 0,
  color = C.warm,
}) => (
  <path d={`M ${x - 12} ${y - 18} L ${x} ${y} L ${x + 12} ${y - 18}`} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${rotate} ${x} ${y})`} />
);
