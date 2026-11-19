import {PerspectiveCamera, Vector3} from 'three';

const W = 1920, H = 1080;
const angle = -16 * Math.PI / 180;
const aim = new Vector3(.075 - .12 * Math.cos(angle) + .0064 * Math.sin(angle),
  .135 - .12 * Math.sin(angle) - .0064 * Math.cos(angle), .115);
const direction = new Vector3(-.22, -.92, .30).normalize();

const camera = (u: number) => {
  const c = new PerspectiveCamera(2 * Math.atan(36 * H / W / (2 * 46)) * 180 / Math.PI, W / H, .01, 10);
  c.up.set(0, 0, 1);
  c.position.copy(aim).addScaledVector(direction, 1.05 * ((1 - u) / 1.15 + u / 1.30));
  c.lookAt(aim); c.updateMatrixWorld();
  return c;
};

const project = (p: Vector3, c: PerspectiveCamera) => {
  const v = p.clone().project(c);
  return [(v.x + 1) * W / 2, (1 - v.y) * H / 2];
};

// Same horizontal desk plane and camera as scene.py; the scene and its render stay untouched.
const reference = camera(0);
const ray = new Vector3(1360 / W * 2 - 1, 1 - 620 / H * 2, .5).unproject(reference).sub(reference.position).normalize();
const anchor = reference.position.clone().addScaledVector(ray, (.006 - reference.position.z) / ray.z);
const right = direction.clone().negate().cross(new Vector3(0, 0, 1)).normalize();
const down = new Vector3(direction.x, direction.y, 0).normalize();
const a0 = project(anchor, reference);
const dx = project(anchor.clone().addScaledVector(right, .001), reference)[0] - a0[0];
const dy = project(anchor.clone().addScaledVector(down, .001), reference)[1] - a0[1];
right.multiplyScalar(.001 / dx);
down.multiplyScalar(.001 / dy);

export const deskTransform = (u: number) => {
  const c = camera(u), width = 400, height = 100;
  const uv = [[0, 0], [width, 0], [width, height], [0, height]];
  const rows: number[][] = [];
  for (const [x, y] of uv) {
    const [px, py] = project(anchor.clone().addScaledVector(right, x).addScaledVector(down, y), c);
    rows.push([x, y, 1, 0, 0, 0, -px*x, -px*y, px]);
    rows.push([0, 0, 0, x, y, 1, -py*x, -py*y, py]);
  }
  for (let i = 0; i < 8; i++) {
    let pivot = i;
    for (let j = i + 1; j < 8; j++) if (Math.abs(rows[j][i]) > Math.abs(rows[pivot][i])) pivot = j;
    [rows[pivot], rows[i]] = [rows[i], rows[pivot]];
    const divisor = rows[i][i];
    for (let k = i; k < 9; k++) rows[i][k] /= divisor;
    for (let j = 0; j < 8; j++) if (j !== i) {
      const factor = rows[j][i];
      for (let k = i; k < 9; k++) rows[j][k] -= factor * rows[i][k];
    }
  }
  const h = rows.map(r => r[8]);
  return `matrix3d(${[h[0],h[3],0,h[6], h[1],h[4],0,h[7], 0,0,1,0, h[2],h[5],0,1].join(',')})`;
};
