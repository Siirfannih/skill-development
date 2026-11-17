import React, {useEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame} from 'remotion';
import {Color, ExtrudeGeometry, Shape} from 'three';
import {move} from '../lib/curves';
import {box} from './kit';

type Model = 'claude' | 'chatgpt' | 'gemini';
const CORAL = '#F15B45';
const FLOWER = 'M50 8 C65 1 78 12 80 25 C97 30 99 48 88 59 C94 77 78 93 62 89 C48 102 29 94 24 85 C5 85 0 67 8 55 C-3 40 7 23 22 22 C25 10 38 4 50 8 Z';
const CRAB = 'M18 22H82V37H97V53H82V85H73V68H64V85H55V68H45V85H36V68H27V85H18V53H3V37H18Z';
const STAR = 'M50 4C54 33 67 46 96 50C67 54 54 67 50 96C46 67 33 54 4 50C33 46 46 33 50 4Z';

export const Character2D: React.FC<{model: Model; size: number; id: string}> = ({model, size, id}) => <svg width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
  <defs>
    <linearGradient id={`${id}-codex`} x1=".2" y1="0" x2=".7" y2="1"><stop stopColor="#9AAEFF"/><stop offset=".45" stopColor="#5E71F6"/><stop offset="1" stopColor="#3B47DF"/></linearGradient>
    <radialGradient id={`${id}-light`} cx=".27" cy=".2" r=".42"><stop stopColor="white" stopOpacity=".7"/><stop offset=".6" stopColor="white" stopOpacity=".12"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient>
    <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="white" stopOpacity=".55"/><stop offset=".5" stopColor="white" stopOpacity="0"/></linearGradient>
    <linearGradient id={`${id}-star`}><stop stopColor="#458AFF"/><stop offset="1" stopColor="#A577E8"/></linearGradient>
  </defs>
  {model === 'claude' ? <g shapeRendering="crispEdges"><path d={CRAB} fill={CORAL}/><path d="M27 29H35V37H27Z M65 29H73V37H65Z" fill="#171411"/></g> : model === 'chatgpt' ? <>
    <path d={FLOWER} fill={`url(#${id}-codex)`}/><path d={FLOWER} fill={`url(#${id}-light)`}/>
    <path d={FLOWER} fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.6"/>
    <path d="M30 39L40 51 30 63 M48 63H67" fill="none" stroke="#FFFFFF" strokeWidth="7.4" strokeLinecap="round" strokeLinejoin="round"/>
  </> : <path d={STAR} fill={`url(#${id}-star)`}/>}
</svg>;

const polygon = (points: number[][]) => {
  const s = new Shape();
  points.forEach(([x,y], i) => i ? s.lineTo((x - 50) / 50, (50 - y) / 50) : s.moveTo((x - 50) / 50, (50 - y) / 50));
  s.closePath(); return s;
};
const rect = (x: number, y: number, w: number, h: number) => polygon([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
const makeShape = (model: Model) => {
  if(model === 'claude') return polygon([[18,22],[82,22],[82,37],[97,37],[97,53],[82,53],[82,85],[73,85],[73,68],[64,68],[64,85],[55,85],[55,68],[45,68],[45,85],[36,85],[36,68],[27,68],[27,85],[18,85],[18,53],[3,53],[3,37],[18,37]]);
  const s = new Shape();
  const p = (x: number, y: number) => [(x-50)/50,(50-y)/50] as const;
  if(model === 'gemini') {
    s.moveTo(...p(50,4));
    for (const coords of [[54,33,67,46,96,50],[67,54,54,67,50,96],[46,67,33,54,4,50],[33,46,46,33,50,4]]) s.bezierCurveTo(...p(coords[0],coords[1]),...p(coords[2],coords[3]),...p(coords[4],coords[5]));
  } else {
    s.moveTo(...p(50,8));
    for(const a of [[65,1,78,12,80,25],[97,30,99,48,88,59],[94,77,78,93,62,89],[48,102,29,94,24,85],[5,85,0,67,8,55],[-3,40,7,23,22,22],[25,10,38,4,50,8]]) s.bezierCurveTo(...p(a[0],a[1]),...p(a[2],a[3]),...p(a[4],a[5]));
  }
  return s;
};

const ModelMesh: React.FC<{model: Model; age: number}> = ({model, age}) => {
  const geometries = useMemo(() => {
    const body = new ExtrudeGeometry(makeShape(model), {depth: .25, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: model === 'claude' ? .018 : .07, bevelThickness: .07, curveSegments: 24});
    if(model !== 'claude') {
      const positions = body.getAttribute('position'); const colors: number[] = [];
      const low = new Color(model === 'chatgpt' ? '#3325FF' : '#9978E8');
      const high = new Color(model === 'chatgpt' ? '#9DABFF' : '#489FFF');
      for(let i=0;i<positions.count;i++) { const c=low.clone().lerp(high, Math.max(0,Math.min(1,(positions.getY(i)+1)/2)));colors.push(c.r,c.g,c.b); }
      return {body, colors, marks: model === 'chatgpt' ? [polygon([[26,35],[32,33],[43,50],[32,68],[26,65],[35,50]]),rect(48,61,21,7)] : []};
    }
    return {body, colors: null, marks: [rect(27,29,8,8),rect(65,29,8,8)]};
  }, [model]);
  useEffect(() => () => geometries.body.dispose(), [geometries]);
  const enter = move(age, 0, 19, 'land');
  const rebound = move(age, 9, 10, 'heavy') - move(age, 19, 15, 'drift');
  const turn = move(age, 14, 100, 'drift');
  return <group scale={[enter * (1 + .04 * rebound), enter * (1 - .07 * rebound), enter]}
    position={[0, -.4 * (1-enter), 0]} rotation={[.07, model === 'claude' ? -.22 + .08*turn : .2-.1*turn, model === 'gemini' ? -.13+.2*turn : .07-.05*turn]}>
    <mesh geometry={geometries.body}>
      {geometries.colors && <bufferAttribute attach="geometry-attributes-color" args={[new Float32Array(geometries.colors),3]}/>}
      <meshPhysicalMaterial color={model === 'claude' ? CORAL : '#FFFFFF'} vertexColors={Boolean(geometries.colors)} roughness={.34} metalness={.06} clearcoat={.55}/>
    </mesh>
    {geometries.marks.map((shape,i) => <mesh key={i} position={[0,0,.335]}>
      <shapeGeometry args={[shape]}/><meshBasicMaterial color={model === 'claude' ? '#171411' : '#FFFFFF'}/>
    </mesh>)}
  </group>;
};

export const Character3D: React.FC<{model: Model; x: number; y: number; size: number; start: number}> = ({model,x,y,size,start}) => {
  const frame = useCurrentFrame();
  return <div style={{...box(x,y,size,size), filter: 'drop-shadow(22px 28px 20px rgba(0,0,0,.3))'}}>
    <ThreeCanvas width={size} height={size} dpr={1.5} orthographic camera={{position:[0,0,6],zoom:size/2.7,near:.1,far:20}} gl={{alpha:true,antialias:true,preserveDrawingBuffer:true}}>
      <ambientLight intensity={1.4}/><directionalLight position={[-3,4,5]} intensity={4} color="#EAF4FF"/><directionalLight position={[4,-2,2]} intensity={1.1} color="#FFE9DD"/>
      <ModelMesh model={model} age={frame-start}/>
    </ThreeCanvas>
  </div>;
};
