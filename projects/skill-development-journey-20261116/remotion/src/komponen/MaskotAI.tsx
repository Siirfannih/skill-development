import React, {useEffect, useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useThree} from '@react-three/fiber';
import {ACESFilmicToneMapping, PCFSoftShadowMap, PMREMGenerator, SRGBColorSpace} from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {armGeometry, blockGeometry, bodyGeometry, footGeometry, inflatedGeometry,
  sparkleGeometry, terminalStrokeGeometry} from './maskot/geometry';
import {filmMaterial} from './maskot/material';
import {geminiMaterial} from './maskot/gemini';
import {BayanganMaskot} from './maskot/shadow';
import {KARAKTER, poseMaskot, type ModelAI, type LihatKe} from './maskot/motion';

export type MaskotAIProps = {
  model: ModelAI;
  masukFrame: number;
  x: number;
  y: number;
  tinggiPx: number;
  /** 0 = foreground; 1 = farther toward the wall. */
  kedalaman: number;
  lihatKe: LihatKe;
  /** Absolute host frames: the other model names prompt a glance toward Irfan. */
  menolehFrame?: readonly number[];
};

type Pose = ReturnType<typeof poseMaskot>;

// Procedural studio room (no raster): soft reflections so the vinyl reads as a finished product, not flat paint.
const Studio: React.FC<{intensity: number}> = ({intensity}) => {
  const {gl, scene} = useThree();
  useLayoutEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = generator.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = intensity;
    return () => { scene.environment = null; env.dispose(); generator.dispose(); room.dispose(); };
  }, [gl, scene, intensity]);
  return null;
};

const Karakter = ({model, pose, frame, blurPx, depth}: {
  model: ModelAI; pose: Pose; frame: number; blurPx: number; depth: number;
}) => {
  const grainGain = Math.sqrt(1 + 4 * Math.PI * blurPx * blurPx);
  const assets = useMemo(() => ({
    body: model === 'claude' ? bodyGeometry() : inflatedGeometry(model),
    arm: armGeometry(), foot: footGeometry(),
    eye: blockGeometry(1.62, 1.62, 0.28),
    stroke: terminalStrokeGeometry(), sparkle: sparkleGeometry(),
    paint: model === 'gemini' ? geminiMaterial(KARAKTER[model].seed, grainGain) : filmMaterial(KARAKTER[model].seed, model !== 'claude',
      model === 'claude' ? '#F15B45' : '#FFFFFF', grainGain,
      model === 'claude' ? 0.5 : 0.34, model !== 'claude', model === 'chatgpt' ? 0.16 : 0),
    dark: filmMaterial(KARAKTER[model].seed, false, '#0E1012', grainGain, 0.22),
    white: filmMaterial(KARAKTER[model].seed, false, '#FFFFFF', grainGain, 0.3, false, 0.62),
  }), [model, grainGain]);
  useEffect(() => () => {
    for (const g of [assets.body, assets.arm, assets.foot, assets.eye, assets.stroke, assets.sparkle]) g.dispose();
    for (const m of [assets.paint, assets.dark, assets.white]) m.material.dispose();
  }, [assets]);
  for (const m of [assets.paint, assets.dark, assets.white]) m.frame.value = frame;
  assets.paint.scan.value = pose.sweep;
  return <group position={[0, 0, -depth * 4]} rotation={[pose.rx, pose.ry, pose.rz]}
    scale={[pose.pop * pose.stretch, pose.pop * pose.breath * pose.squash, pose.pop]}>
    <mesh geometry={assets.body} material={assets.paint.material} castShadow receiveShadow />
    {model === 'claude' && <>
      {[-7.9, 7.9].map((x, i) => <mesh key={x} geometry={assets.arm} material={assets.paint.material}
        position={[x, 1, 0]} rotation={[0, 0, pose.feet[i] * 0.4]} castShadow receiveShadow />)}
      {[-5.5, -2.5, 2.5, 5.5].map((x, i) => <group key={x} position={[x, -2.5, 0]}
        rotation={[pose.feet[i], 0, pose.feet[i] * 0.35]}>
        <mesh geometry={assets.foot} material={assets.paint.material} castShadow receiveShadow />
      </group>)}
      {[-3.8, 3.8].map(x => <mesh key={x} geometry={assets.eye} material={assets.dark.material}
        position={[x + pose.eyesX, 2.55, 3.88]} scale={[1, pose.blink, 1]} castShadow />)}
      <mesh position={[0, -2.5, 3.78]}>
        <planeGeometry args={[12.4, 0.8]} />
        <shaderMaterial transparent depthWrite={false}
          vertexShader={'varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}'}
          fragmentShader={'varying vec2 vUv; void main(){float a=0.11*exp(-10.0*pow(vUv.y-0.1,2.0))*smoothstep(0.0,0.15,vUv.x)*smoothstep(0.0,0.15,1.0-vUv.x); gl_FragColor=vec4(0.03,0.025,0.02,a);}'} />
      </mesh>
    </>}
    {model === 'chatgpt' && <group position={[0, -0.3, 2.6]}>
      {[-1, 1].map(side => <mesh key={side} geometry={assets.stroke} material={assets.white.material}
        position={[-1.55, side * 0.74, -0.04]} rotation={[0, 0, -side * Math.PI / 4]} castShadow />)}
      <mesh geometry={assets.stroke} material={assets.white.material} position={[1.05, -1.3, -0.02]}
        scale={[0.9, 1, 1]} castShadow />
    </group>}
    {model === 'gemini' && <mesh geometry={assets.sparkle} position={[3.5, 3.3, 0.6]}
      rotation={[0, 0, -pose.rz]} scale={0.26 + pose.sparkle * 0.12}>
      <meshBasicMaterial color="#EEF3FF" transparent opacity={pose.sparkle * 0.85} />
    </mesh>}
  </group>;
};

export const MaskotAI: React.FC<MaskotAIProps> = ({
  model, masukFrame, x, y, tinggiPx, kedalaman, lihatKe, menolehFrame = [],
}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const age = frame - masukFrame;
  const depth = Math.min(1, Math.max(0, kedalaman));
  const blurPx = 0.24 + Math.abs(depth - 0.45) * 0.9;
  const widthCanvas = Math.ceil(tinggiPx * 2.8);
  const heightCanvas = Math.ceil(tinggiPx * 2.4);
  const arahIrfan = x < width / 2 ? 1 : -1;
  const pose = poseMaskot(age, fps, model, tinggiPx, lihatKe, arahIrfan,
    menolehFrame.map(at => at - masukFrame));
  const span = {claude: 12, chatgpt: 10.2, gemini: 9}[model];
  const cameraDistance = heightCanvas * span / (2 * Math.tan(35 * Math.PI / 360) * tinggiPx);
  if (age < 0) return null;
  return <div data-maskot={model} style={{position: 'absolute', pointerEvents: 'none',
    left: x + pose.x - widthCanvas / 2, top: y + pose.y - heightCanvas / 2,
    width: widthCanvas, height: heightCanvas,
  }}>
    <BayanganMaskot model={model} pose={pose} depth={depth} width={widthCanvas}
      height={heightCanvas} cameraDistance={cameraDistance} />
    <div style={{width: widthCanvas, height: heightCanvas, filter: `blur(${blurPx}px)`}}>
      <ThreeCanvas width={widthCanvas} height={heightCanvas} orthographic={false} dpr={2}
        camera={{fov: 35, position: [0, 4, cameraDistance], near: 0.1, far: 150}}
        gl={{antialias: true, alpha: true, preserveDrawingBuffer: true,
          toneMapping: ACESFilmicToneMapping, toneMappingExposure: 0.78, outputColorSpace: SRGBColorSpace}}
        shadows={{type: PCFSoftShadowMap}}>
        <Studio intensity={model === 'claude' ? 0.55 : 0.7} />
        <hemisphereLight args={['#B3C0C3', '#454A47', 0.55]} />
        <ambientLight color="#8A979A" intensity={0.16} />
        <directionalLight position={[-18, 22, 30]} color="#F6F1E7" intensity={3} castShadow
          shadow-mapSize={[1024, 1024]} shadow-camera-left={-14} shadow-camera-right={14}
          shadow-camera-top={12} shadow-camera-bottom={-12} shadow-camera-near={1}
          shadow-camera-far={90} shadow-bias={-0.0004} shadow-normalBias={0.035} shadow-radius={3} />
        <directionalLight position={[16, 8, -12]} color="#FFD7AA" intensity={1.6} />
        <directionalLight position={[-14, 10, -24]} color="#DCE8FF" intensity={2.2} />
        <Karakter model={model} pose={pose} frame={age} blurPx={blurPx} depth={depth} />
      </ThreeCanvas>
    </div>
  </div>;
};
