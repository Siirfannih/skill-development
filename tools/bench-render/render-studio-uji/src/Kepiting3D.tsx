// Uji WebGL: tiruan shot B10a (maskot voxel "Claude" di meja, cahaya hangat, push kamera, angguk kepala).
// Bukan replika visual Blender; tujuannya beban 3D yang sebanding untuk membandingkan opsi --gl.
import React, { useMemo, useRef } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import * as THREE from "three";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

const vox = (w: number, h: number, d: number, ox: number, oy: number, oz: number) => {
  const out: [number, number, number][] = [];
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) for (let z = 0; z < d; z++) out.push([ox + x, oy + y, oz + z]);
  return out;
};

const Voxels: React.FC<{ cells: [number, number, number][]; color: string; rough?: number }> = ({ cells, color, rough = 0.6 }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const m = useMemo(() => new THREE.Matrix4(), []);
  React.useLayoutEffect(() => {
    cells.forEach((c, i) => { m.makeTranslation(c[0] * 0.1, c[1] * 0.1, c[2] * 0.1); ref.current!.setMatrixAt(i, m); });
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [cells, m]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, cells.length]} castShadow receiveShadow>
      <boxGeometry args={[0.098, 0.098, 0.098]} />
      <meshPhysicalMaterial color={color} roughness={rough} sheen={0.3} clearcoat={0.1} />
    </instancedMesh>
  );
};

const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  // gsap dipakai deterministik: timeline dijeda lalu di-seek ke waktu frame (aturan Remotion: animasi harus dari frame).
  const tl = useMemo(() => {
    const st = { yaw: 0.2, nod: 0, cam: 3.2 };
    const t = gsap.timeline({ paused: true });
    t.to(st, { cam: 2.9, duration: 77 / 29.97, ease: "power1.inOut" }, 0)
     .to(st, { yaw: 0.49, duration: 1.0, ease: "power2.out" }, 0.5)
     .to(st, { nod: 0.18, duration: 0.25, ease: "power2.inOut", yoyo: true, repeat: 1 }, 1.6);
    return { t, st };
  }, []);
  tl.t.seek(f / fps);
  const { yaw, nod, cam } = tl.st;
  const body = useMemo(() => vox(19, 10, 6, -9.5, 2, -3), []);
  const arms = useMemo(() => [...vox(3, 3, 3, -12.5, 4, -1.5), ...vox(3, 3, 3, 9.5, 4, -1.5)], []);
  const feet = useMemo(() => [-8, -4, 2, 6].flatMap((x) => vox(2, 3, 3, x, -1, -1.5)), []);
  const eyes = useMemo(() => [...vox(2, 2, 1, -5, 8, 3), ...vox(2, 2, 1, 3, 8, 3)], []);
  return (
    <>
      <color attach="background" args={["#1a120d"]} />
      <fog attach="fog" args={["#1a120d", 4, 9]} />
      <ambientLight intensity={0.25} color="#ffd9b0" />
      <directionalLight position={[-2, 3.5, -2.5]} intensity={3.2} color="#ffb060" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.0004} />
      <pointLight position={[1.6, 1.2, 1.8]} intensity={6} color="#ffd2a1" distance={6} castShadow />
      <CameraRig dist={cam} />
      <group rotation={[nod, yaw, 0]} position={[0, 0.1, 0]}>
        <Voxels cells={body} color="#C9653F" />
        <Voxels cells={arms} color="#B4532F" />
        <Voxels cells={feet} color="#B4532F" />
        <Voxels cells={eyes} color="#1b1411" rough={0.3} />
      </group>
      {/* meja + monitor bercahaya di belakang */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#5b3b26" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 1.0, -1.6]}>
        <boxGeometry args={[2.2, 1.3, 0.06]} />
        <meshStandardMaterial color="#222" emissive="#9ec3ff" emissiveIntensity={0.6} />
      </mesh>
    </>
  );
};

const CameraRig: React.FC<{ dist: number }> = ({ dist }) => {
  const { camera } = useThree();
  camera.position.set(0.35 * dist, 0.9, dist);
  camera.lookAt(0, 0.6, 0);
  return null;
};

export const Kepiting3D: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#1a120d" }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 30 }} shadows
        gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Scene />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
