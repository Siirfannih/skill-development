import React, {useEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {ACESFilmicToneMapping, MeshStandardMaterial, PCFSoftShadowMap, SRGBColorSpace} from 'three';
import type {Material} from 'three';
import {knotGeometry, sparkleGeometry, voxelGeometry} from './geometry';
import type {XYZ} from './geometry';
import {getMaskotPose} from './motion';
import type {ModelAI, SisiTatap} from './motion';

export type MaskotAIProps = {
  model: ModelAI;
  masuk: number;
  /** Center in composition pixels; apply the footage's camera transform to its parent. */
  posisi: {x: number; y: number};
  /** 1 = approximately 120px body height at 1080p. */
  skala?: number;
  tatap?: SisiTatap;
  seed?: number;
  permukaan?: 'bahu' | 'dinding';
};

const TILE = {width: 360, height: 300};
const COLORS = {claude: '#D97757', chatgpt: '#F7F7F5', gemini: '#FFFFFF'};

const useMaterials = (model: ModelAI, frame: number, seed: number) => {
  const grainFrame = useMemo(() => ({value: 0}), []);
  grainFrame.value = frame + seed * 19;
  const materials = useMemo(() => {
    const make = (color: string, vertexColors = false) => {
      const material = new MeshStandardMaterial({color, roughness: 0.74, metalness: 0, vertexColors});
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uGrainFrame = grainFrame;
        shader.fragmentShader = 'uniform float uGrainFrame;\n' + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
          #include <dithering_fragment>
          float grain = fract(sin(dot(gl_FragCoord.xy + uGrainFrame, vec2(12.9898, 78.233))) * 43758.5453);
          gl_FragColor.rgb += (grain - 0.5) * 0.012;
        `);
      };
      material.customProgramCacheKey = () => 'maskot-film-grain-v1';
      return material;
    };
    const front = make(COLORS[model], model === 'gemini');
    const side = make('#0D0D0D');
    const eyes = make(model === 'gemini' ? '#1F1F3A' : '#141413');
    return {
      body: model === 'chatgpt' ? [side, side, front, side, front, side] : front,
      eyes, accent: model === 'gemini' ? make('#97B6F6') : side,
      dispose: () => {front.dispose(); side.dispose(); eyes.dispose();},
    };
  }, [model, grainFrame]);
  useEffect(() => () => {materials.dispose(); materials.accent.dispose();}, [materials]);
  return materials;
};

const Voxel: React.FC<{
  model: ModelAI; size: XYZ; center: XYZ; material: Material | Material[];
}> = ({model, size: [w, h, d], center: [x, y, z], material}) => {
  const geometry = useMemo(() => voxelGeometry([w, h, d], [x, y, z], model), [w, h, d, x, y, z, model]);
  return <mesh position={[x, y, z]} geometry={geometry} material={material} castShadow receiveShadow />;
};

const BrandAccent: React.FC<{model: ModelAI; material: Material; sparkle: number}> = ({model, material, sparkle}) => {
  const knots = useMemo(() => model === 'chatgpt' ? Array.from({length: 6}, (_, i) => knotGeometry(i)) : [], [model]);
  const star = useMemo(() => model === 'gemini' ? sparkleGeometry() : null, [model]);
  useEffect(() => () => {knots.forEach((g) => g.dispose()); star?.dispose();}, [knots, star]);
  if (model === 'chatgpt') return (
    <group position={[0, 1.12, 0.429]} scale={0.78}>
      {knots.map((geometry, i) => <mesh key={i} geometry={geometry} material={material} castShadow />)}
    </group>
  );
  if (model === 'gemini') return (
    <mesh position={[0.08, 2.78 + sparkle, 0]} rotation={[0.08, -0.12, sparkle]} geometry={star} material={material} castShadow />
  );
  return null;
};

const ContactShadow: React.FC<{surface: 'bahu' | 'dinding'; opacity: number}> = ({surface, opacity}) => (
  <>
    <mesh
      position={surface === 'bahu' ? [0.15, -0.035, 0.02] : [0.22, 1.12, -0.72]}
      rotation={surface === 'bahu' ? [-Math.PI / 2, 0, 0] : [0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[5.8, surface === 'bahu' ? 3.2 : 4.2]} />
      <shadowMaterial transparent opacity={opacity * 0.24} depthWrite={false} />
    </mesh>
    <mesh
      position={surface === 'bahu' ? [0.12, -0.026, 0.05] : [0.24, 1.1, -0.71]}
      rotation={surface === 'bahu' ? [-Math.PI / 2, 0, 0] : [0, 0, 0]}
    >
      <planeGeometry args={surface === 'bahu' ? [3.6, 1.9] : [3.6, 3]} />
      <shaderMaterial
        transparent depthWrite={false}
        uniforms={{uOpacity: {value: opacity * (surface === 'bahu' ? 0.25 : 0.10)}}}
        vertexShader="varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}"
        fragmentShader="varying vec2 vUv; uniform float uOpacity; void main(){vec2 p=(vUv-0.5)*5.0;float a=exp(-dot(p,p)*1.6)*uOpacity;gl_FragColor=vec4(0.12,0.15,0.18,a);}"
      />
    </mesh>
  </>
);

const Character: React.FC<Required<Pick<MaskotAIProps, 'model' | 'masuk' | 'tatap' | 'seed' | 'permukaan'>>> = (props) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pose = getMaskotPose({...props, frame, fps});
  const materials = useMaterials(props.model, frame, props.seed);
  if (!pose.visible) return null;
  const {model} = props;
  const entry = pose.entry;
  return (
    <>
      <ContactShadow surface={props.permukaan} opacity={Math.min(1, entry) * (0.95 - pose.bob * 2)} />
      <group position={[0, pose.bob + pose.rise, 0]} scale={entry}>
        <group position={[0, 1.2, 0]} rotation={[0.018, pose.yaw, pose.roll]} scale={[1, pose.breath, 1]}>
          <group position={[0, -1.2, 0]}>
            <Voxel model={model} size={[2.6, 1.78, 0.84]} center={[0, 1.51, 0]} material={materials.body} />
            {([-1, 1] as const).map((side, i) => (
              <group key={side} position={[side * 1.23, 1.46, 0]} rotation={[0, 0, pose.arms[i]]}>
                <Voxel model={model} size={[0.68, 0.61, 0.74]} center={[side * 0.28, 0, 0]} material={materials.body} />
              </group>
            ))}
            {[-1.08, -0.57, 0.57, 1.08].map((x, i) => (
              <group key={x} position={[x, 0.7, 0]} rotation={[pose.legs[i], 0, pose.legs[i] * 0.35]}>
                <Voxel model={model} size={[0.32, 0.73, 0.68]} center={[0, -0.335, 0]} material={materials.body} />
              </group>
            ))}
            {[-0.76, 0.76].map((x) => (
              <group key={x} position={[x + pose.eyeOffset, 1.99, 0.429]} scale={[1, pose.blink, 1]}>
                <Voxel model={model} size={[0.31, 0.31, 0.028]} center={[0, 0, 0]} material={materials.eyes} />
              </group>
            ))}
            <BrandAccent model={model} material={materials.accent} sparkle={pose.sparkle} />
          </group>
        </group>
      </group>
    </>
  );
};

export const MaskotAI: React.FC<MaskotAIProps> = ({model, masuk, posisi, skala = 1, tatap = 'kamera', seed = 0, permukaan = 'dinding'}) => {
  const frame = useCurrentFrame();
  if (frame <= masuk || skala <= 0) return null;
  return (
    <div style={{
      position: 'absolute', left: posisi.x - TILE.width * skala / 2,
      top: posisi.y - TILE.height * skala / 2, width: TILE.width, height: TILE.height,
      transform: `scale(${skala})`, transformOrigin: 'top left',
      filter: 'blur(0.24px)', pointerEvents: 'none',
    }}>
      <ThreeCanvas
        width={TILE.width} height={TILE.height} dpr={2} orthographic
        camera={{position: [0, 4.6, 14], zoom: 51, near: 0.1, far: 50}}
        shadows={{type: PCFSoftShadowMap}}
        gl={{alpha: true, antialias: true, preserveDrawingBuffer: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1, outputColorSpace: SRGBColorSpace}}
        onCreated={({camera, gl}) => {camera.lookAt(0, 1.2, 0); camera.updateProjectionMatrix(); gl.setClearColor(0x000000, 0);}}
      >
        <ambientLight color="#B8BFBD" intensity={0.55} />
        <hemisphereLight args={['#DAE5ED', '#484A4A', 0.85]} />
        <directionalLight
          position={[-3.8, 7, 7]} color="#E0EDFF" intensity={2.1} castShadow
          shadow-mapSize={[1024, 1024]} shadow-camera-left={-4} shadow-camera-right={4}
          shadow-camera-top={5} shadow-camera-bottom={-2} shadow-camera-near={0.5}
          shadow-camera-far={25} shadow-bias={-0.0004} shadow-normalBias={0.018}
        />
        <directionalLight position={[4, 3, 6]} color="#D1D6D8" intensity={0.4} />
        <Character model={model} masuk={masuk} tatap={tatap} seed={seed} permukaan={permukaan} />
      </ThreeCanvas>
    </div>
  );
};
