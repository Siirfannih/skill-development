import {BufferAttribute, CatmullRomCurve3, Color, ExtrudeGeometry, Shape, TubeGeometry, Vector3} from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type {ModelAI} from './motion';

export type XYZ = [number, number, number];

export const voxelGeometry = (size: XYZ, center: XYZ, model: ModelAI) => {
  const geometry = new RoundedBoxGeometry(...size, 3, 0.035);
  if (model !== 'gemini') return geometry;
  const positions = geometry.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);
  const blue = new Color('#4285F4');
  const purple = new Color('#9B72CB');
  const color = new Color();
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i) + center[0];
    const y = positions.getY(i) + center[1];
    const t = Math.max(0, Math.min(1, 0.5 + x * 0.2 - (y - 1.2) * 0.27));
    color.copy(blue).lerp(purple, t).toArray(colors, i * 3);
  }
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  return geometry;
};

export const knotGeometry = (petal: number) => {
  const angle = petal * Math.PI / 3;
  const points = [
    [-0.09, 0.12], [-0.22, 0.20], [-0.22, 0.37],
    [-0.07, 0.46], [0.10, 0.37], [0.10, 0.18], [-0.06, 0.09],
  ].map(([x, y], i) => new Vector3(
    x * Math.cos(angle) - y * Math.sin(angle),
    x * Math.sin(angle) + y * Math.cos(angle),
    i === 0 || i === 6 ? 0.018 : 0,
  ));
  return new TubeGeometry(new CatmullRomCurve3(points), 36, 0.018, 6, false);
};

export const sparkleGeometry = () => {
  const shape = new Shape();
  shape.moveTo(0, 0.27);
  shape.quadraticCurveTo(0.045, 0.045, 0.23, 0);
  shape.quadraticCurveTo(0.045, -0.045, 0, -0.27);
  shape.quadraticCurveTo(-0.045, -0.045, -0.23, 0);
  shape.quadraticCurveTo(-0.045, 0.045, 0, 0.27);
  return new ExtrudeGeometry(shape, {
    depth: 0.065, bevelEnabled: true, bevelSegments: 3,
    steps: 1, bevelSize: 0.012, bevelThickness: 0.012, curveSegments: 12,
  });
};
