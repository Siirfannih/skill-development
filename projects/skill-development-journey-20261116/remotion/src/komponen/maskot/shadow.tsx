import React, {useEffect, useMemo} from 'react';
import {Euler, Matrix4, PerspectiveCamera, Quaternion, Vector3} from 'three';
import {armGeometry, bodyGeometry, footGeometry, inflatedGeometry} from './geometry';
import {poseMaskot, type ModelAI} from './motion';

type Pose = ReturnType<typeof poseMaskot>;
type Point = {x: number; y: number};

const hull = (points: Point[]) => {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (a: Point, b: Point, c: Point) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const half = (ps: Point[]) => {
    const out: Point[] = [];
    for (const p of ps) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    return out.slice(0, -1);
  };
  return [...half(sorted), ...half(sorted.reverse())];
};

export const shadowGeometry = (model: ModelAI) => model === 'claude'
  ? [bodyGeometry(), armGeometry(), footGeometry()]
  : [inflatedGeometry(model)];

export const projectSilhouette = (model: ModelAI, pose: Pose, depth: number,
  width: number, height: number, cameraDistance: number, geometry: ReturnType<typeof shadowGeometry>) => {
  const camera = new PerspectiveCamera(35, width / height, 0.1, 150);
  camera.position.set(0, 4, cameraDistance);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  const world = new Matrix4().compose(new Vector3(0, 0, -depth * 4),
    new Quaternion().setFromEuler(new Euler(pose.rx, pose.ry, pose.rz)),
    new Vector3(pose.pop * pose.stretch, pose.pop * pose.breath * pose.squash, pose.pop));
  const contours: Point[][] = [];
  const allPoints: Point[] = [];
  const instances: {index: number; x: number; y: number; rx?: number; rz?: number}[] = model === 'claude'
    ? [{index: 0, x: 0, y: 0}, ...[-7.9, 7.9].map((x, i) => ({index: 1, x, y: 1, rz: pose.feet[i] * 0.4})),
      ...[-5.5, -2.5, 2.5, 5.5].map((x, i) => ({index: 2, x, y: -2.5, rx: pose.feet[i], rz: pose.feet[i] * 0.35}))]
    : [{index: 0, x: 0, y: 0}];
  for (const instance of instances) {
    const local = new Matrix4().compose(new Vector3(instance.x, instance.y, 0),
      new Quaternion().setFromEuler(new Euler(instance.rx ?? 0, 0, instance.rz ?? 0)), new Vector3(1, 1, 1));
    const matrix = world.clone().multiply(local);
    const vertices = geometry[instance.index].getAttribute('position');
    const points: Point[] = [];
    for (let i = 0; i < vertices.count; i++) {
      const p = new Vector3().fromBufferAttribute(vertices, i).applyMatrix4(matrix).project(camera);
      points.push({x: width * (1 + p.x) / 2, y: height * (1 - p.y) / 2});
    }
    allPoints.push(...points);
    if (model === 'claude') contours.push(hull(points));
    else if (model === 'gemini') {
      for (let i = 0; i < points.length; i += 3) {
        const triangle = points.slice(i, i + 3);
        const [a, b, c] = triangle;
        if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0) triangle.reverse();
        contours.push(triangle);
      }
    } else {
      // Cross-sections preserve the concave petals and star; a convex hull would erase them.
      for (let ring = 4; ring < 64; ring += 4) contours.push(points.slice(ring * 161, (ring + 1) * 161));
    }
  }
  const path = contours.map(ps => `M${ps.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join('L')}Z`).join('');
  return {path, bounds: allPoints.reduce((b, p) => ({left: Math.min(b.left, p.x), right: Math.max(b.right, p.x),
    top: Math.min(b.top, p.y), bottom: Math.max(b.bottom, p.y)}),
  {left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity})};
};

export const BayanganMaskot = ({model, pose, depth, width, height, cameraDistance}: {
  model: ModelAI; pose: Pose; depth: number; width: number; height: number; cameraDistance: number;
}) => {
  const geometry = useMemo(() => shadowGeometry(model), [model]);
  useEffect(() => () => geometry.forEach(g => g.dispose()), [geometry]);
  const {path} = projectSilhouette(model, pose, depth, width, height, cameraDistance, geometry);
  const id = `k12-shadow-${model}`;
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
    style={{position: 'absolute', inset: 0, overflow: 'visible'}} aria-hidden>
    <defs>
      <filter id={`${id}-wall`} x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation={20 + (1 - depth) * 6} />
      </filter>
      <filter id={`${id}-ao`} x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation={4} />
      </filter>
    </defs>
    <path d={path} fill="#101316" opacity={model === 'claude' ? 0.30 : 0.28}
      transform={model === 'claude' ? 'translate(60 36)' : 'translate(44 42)'} filter={`url(#${id}-wall)`} />
    <path d={path} fill="#101316" opacity={0.10} transform="translate(5 7)" filter={`url(#${id}-ao)`} />
  </svg>;
};
