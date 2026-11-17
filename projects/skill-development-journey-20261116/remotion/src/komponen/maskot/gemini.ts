import {ExtrudeGeometry, Shape} from 'three';
import {filmMaterial} from './material';

// r4-ref-gemini-2024.svg: four circular A commands, with the short tip segments intact.
export const geminiShape = () => {
  const shape = new Shape();
  const arc = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
    const dx = x2 - x1, dy = y2 - y1;
    const distance = Math.hypot(dx, dy);
    const offset = Math.sqrt(radius * radius - distance * distance / 4);
    const centers = [-1, 1].map(sign => ({
      x: (x1 + x2) / 2 - sign * dy * offset / distance,
      y: (y1 + y2) / 2 + sign * dx * offset / distance,
    }));
    const center = centers.sort((a, b) => Math.hypot(b.x - 8, b.y - 8) - Math.hypot(a.x - 8, a.y - 8))[0];
    shape.absarc(center.x - 8, 8 - center.y, radius,
      Math.atan2(center.y - y1, x1 - center.x),
      Math.atan2(center.y - y2, x2 - center.x), false);
  };
  shape.moveTo(8, -0.016);
  arc(16, 8.016, 8.016, 16, 8.522);
  shape.lineTo(-0.016, -8);
  arc(7.984, 16, 0, 8.016, 8.521);
  shape.lineTo(-8, 0.016);
  arc(0, 7.984, 7.984, 0, 8.521);
  shape.lineTo(0.016, 8);
  arc(8.016, 0, 16, 7.984, 8.522);
  shape.closePath();
  return shape;
};

export const GEMINI_WIDTH = 9.116;

export const geminiGeometry = () => {
  const geometry = new ExtrudeGeometry(geminiShape(), {
    depth: 1.1, bevelEnabled: true, bevelThickness: 0.95,
    bevelSize: 0.32, bevelSegments: 12, curveSegments: 72,
  });
  geometry.translate(0, 0, -1.1 / 2);
  geometry.scale(GEMINI_WIDTH / 16, GEMINI_WIDTH / 16, GEMINI_WIDTH / 16);
  return geometry;
};

export const geminiMaterial = (seed: number, grainGain: number) => {
  const paint = filmMaterial(seed, false, '#FFFFFF', grainGain, 0.38, true, 0.18);
  const compile = paint.material.onBeforeCompile;
  paint.material.onBeforeCompile = (shader, renderer) => {
    compile.call(paint.material, shader, renderer);
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      vec2 svg = vec2(8.0 + k12Position.x * ${16 / GEMINI_WIDTH}, 8.0 - k12Position.y * ${16 / GEMINI_WIDTH});
      vec2 delta = svg - vec2(1.588, 6.503);
      float determinant = 16.1326 * 129.2322 + 43.70045 * 5.4553;
      vec2 radial = vec2(129.2322 * delta.x + 43.70045 * delta.y,
        -5.4553 * delta.x + 16.1326 * delta.y) / determinant;
      float t = length(radial);
      vec3 purple = vec3(145.0, 104.0, 192.0) / 255.0;
      vec3 blue = vec3(86.0, 132.0, 209.0) / 255.0;
      vec3 cyan = vec3(27.0, 161.0, 227.0) / 255.0;
      vec3 gradient = t < 0.343 ? mix(purple, blue, clamp((t - 0.067) / 0.276, 0.0, 1.0))
        : mix(blue, cyan, clamp((t - 0.343) / 0.329, 0.0, 1.0));
      diffuseColor.rgb *= sRGBTransferEOTF(vec4(gradient, 1.0)).rgb;
    `);
  };
  paint.material.customProgramCacheKey = () => `k12-gemini-svg-${seed}-${grainGain}`;
  return paint;
};
