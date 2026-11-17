import {BufferGeometry, Color, ExtrudeGeometry, Float32BufferAttribute, Shape} from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type {ModelAI} from './motion';
import {geminiGeometry} from './gemini';

export const blockGeometry = (width: number, height: number, depth: number) =>
  new RoundedBoxGeometry(width, height, depth, 6, Math.min(width, height, depth) * 0.13);

export const bodyGeometry = () => blockGeometry(13, 7, 7.5).translate(0, 1, 0);
export const armGeometry = () => blockGeometry(3.2, 3, 7.2);
export const footGeometry = () => blockGeometry(2, 3, 6.9).translate(0, -1.5, 0);

// A closed inflated surface, including the back; the lobes are geometry, not a decal.
export const inflatedGeometry = (model: Exclude<ModelAI, 'claude'>) => {
  if (model === 'gemini') return geminiGeometry();
  const geometry = new BufferGeometry();
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const segments = 160;
  const rings = 64;
  const blue = new Color(model === 'chatgpt' ? '#3A5BF5' : '#4285F4');
  const upper = new Color(model === 'chatgpt' ? '#7C9BFF' : '#9B72CB');
  const pink = new Color('#D88BAF');
  const white = new Color('#FFFFFF');
  for (let i = 0; i <= rings; i++) {
    const phi = i * Math.PI / rings;
    const radial = Math.sin(phi);
    for (let j = 0; j <= segments; j++) {
      const theta = j * 2 * Math.PI / segments;
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      const radius = model === 'chatgpt' ? 5.05 + 0.57 * Math.cos(7 * theta + 0.25) * radial ** 3
        : 6.35 / Math.pow(Math.pow(c * c + 0.012, 1 / 3) + Math.pow(s * s + 0.012, 1 / 3), 1.5);
      const x = radius * radial * c;
      const y = radius * radial * s;
      const z = (model === 'chatgpt' ? 2.5 : 2.1) * Math.cos(phi);
      positions.push(x, y, z);
      const t = Math.min(1, Math.max(0, model === 'chatgpt' ? (y + 5.4) / 10.8 : (x + y + 5.6) / 11.2));
      const color = blue.clone().lerp(upper, model === 'chatgpt' ? t : Math.min(1, t / 0.78));
      if (model === 'chatgpt') {
        const highlight = Math.exp(-((x + 2.9) ** 2 / 4.2 + (y - 3.0) ** 2 / 3.4));
        color.lerp(white, highlight * 0.78 * Math.sqrt(Math.max(0, z / 2.5)));
      } else {
        color.lerp(pink, Math.max(0, (t - 0.80) / 0.20) * 0.65);
      }
      color.toArray(colors, colors.length);
      if (i < rings && j < segments) {
        const a = i * (segments + 1) + j;
        const b = a + segments + 1;
        indices.push(a, b, b + 1, a, b + 1, a + 1);
      }
    }
  }
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
};

export const terminalStrokeGeometry = () => new RoundedBoxGeometry(2.25, 0.8, 0.42, 6, 0.2);

export const sparkleGeometry = () => {
  const s = new Shape();
  s.moveTo(0, 1.65);
  s.bezierCurveTo(0.24, 0.45, 0.45, 0.24, 1.65, 0);
  s.bezierCurveTo(0.45, -0.24, 0.24, -0.45, 0, -1.65);
  s.bezierCurveTo(-0.24, -0.45, -0.45, -0.24, -1.65, 0);
  s.bezierCurveTo(-0.45, 0.24, -0.24, 0.45, 0, 1.65);
  return new ExtrudeGeometry(s, {depth: 0.11, bevelEnabled: true, bevelThickness: 0.025,
    bevelSize: 0.025, bevelSegments: 3, curveSegments: 16});
};
