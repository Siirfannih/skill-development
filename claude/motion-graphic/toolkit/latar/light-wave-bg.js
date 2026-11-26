// light-wave-bg.js — latar shader GLSL (WebGL mentah): cahaya mengalir dari gelombang sinus + simplex noise, dengan ARAH cahaya,
// zona glow lembut yang posisinya prop (mengikuti komposisi), 2-3 warna dari satu keluarga hue, dan grain 2-3 % dihitung
// di shader untuk menghancurkan banding. OPT-IN (dipakai bila REF-SPEC/brief meminta); tanpa warna bawaan.
//
// Deterministik: u_time = frame / fps, selalu dari parameter `frame` (di Remotion: useCurrentFrame). Dilarang
// requestAnimationFrame/Date.now untuk waktu. Grain berbiji: hash(posisi piksel, seed, frame).
// Dipakai: renderLightWave(canvas, { colors, mode, glow, ... }, frame, fps) lalu screenshot. Headless Chromium (SwiftShader) jalan;
// butuh preserveDrawingBuffer (sudah). Ringan: opts.quality (0.25-1) memperkecil resolusi render kanvas.
// Ukur: `python3 scripts/banding.py <frame.png>` (tanpa ref) harus lolos F1 gradien ragu-ragu; naikkan kontras warna / glow
// bila menyala. Saturasi dan luma tetap dalam REF-SPEC (`banding.py <frame.png> <REF-SPEC.json>`).
import { parseColor } from "./warna.js";
import { resolveOptions } from "./preset.js";

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;
const FRAG = `precision highp float;
uniform vec2 u_res; uniform float u_time, u_int, u_light, u_speed, u_grain, u_seed, u_amp, u_gstr, u_frame;
uniform vec3 u_c0, u_c1, u_c2, u_glow; uniform vec2 u_dir;
// simplex noise 2D (Ashima Arts / Ian McEwan, MIT)
vec3 perm(vec3 x){ return mod(((x*34.)+1.)*x, 289.); }
float snoise(vec2 v){
  const vec4 C = vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)), x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.);
  vec3 p = perm(perm(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.); m = m*m; m = m*m;
  vec3 x = 2.*fract(p*C.www) - 1., h = abs(x) - .5, ox = floor(x + .5), a0 = x - ox;
  m *= 1.79284291400159 - .85373472095314*(a0*a0 + h*h);
  vec3 g; g.x = a0.x*x0.x + h.x*x0.y; g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.*dot(m, g);
}
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y;
  vec2 p = (uv - .5) * vec2(asp, 1.);
  vec2 d = normalize(u_dir), q = vec2(-d.y, d.x);
  float t = u_time * u_speed;
  float l = dot(p, d), s = dot(p, q);                        // l = sepanjang arah cahaya, s = melintang
  float warp = snoise(vec2(l*1.4 + t*.35, s*1.4 - t*.25 + u_seed)) * .55 * u_amp;
  float w = .50*sin((s + warp)*5.0 + l*1.8 - t*1.1)
          + .30*sin((s - warp)*9.0 - l*2.6 + t*1.7 + u_seed)
          + .20*snoise(vec2(s*3.2 + t*.5, l*3.2 + u_seed*1.7));
  float f = .5 + .5*w*u_amp;                                  // 0..1 medan gelombang
  float ribbon = pow(smoothstep(.15, .95, f), 1.6);           // pita cahaya
  float lit = smoothstep(-.7, .7, l);                         // sisi sumber cahaya lebih terang
  float amount = clamp(ribbon * (.35 + .65*lit) * u_int, 0., 1.);
  vec2 gp = (uv - u_glow.xy) * vec2(asp, 1.);
  float g = exp(-pow(length(gp) / max(u_glow.z, .02), 2.) * 2.2) * u_gstr * u_int;
  vec3 col = mix(u_c0, u_c1, smoothstep(.0, .75, amount + g*.5));
  float hi = clamp(smoothstep(.45, 1., amount) * .55 + g, 0., 1.);
  col = mix(col + u_c2*hi*.55*(1.-u_light), mix(col, u_c2, hi), u_light);   // gelap: aditif; terang: campur
  float n = hash(gl_FragCoord.xy + u_seed*17.31 + u_frame*1.618) + hash(gl_FragCoord.xy*1.37 + u_seed*3.7 + u_frame*2.399);
  col += (n - 1.) * u_grain;                                  // grain segitiga +/-grain (dither anti-banding)
  gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
}`;

const cache = new WeakMap();
const build = (canvas) => {
  const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: false, premultipliedAlpha: false });
  if (!gl) throw new Error("LightWaveBg: WebGL tidak tersedia (headless: --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader)");
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  return { gl, pr, u: (n) => gl.getUniformLocation(pr, n) };
};

const rgb01 = (c) => parseColor(c).map((v) => v / 255);

/**
 * Gambar satu frame. o = {
 *   colors: [dasar, tengah, terang?]  2-3 warna satu keluarga hue (wajib, dari tema/REF-SPEC)
 *   mode: "dark" | "light"            cara cahaya bercampur (dark: aditif; light: campur ke warna terang)
 *   glow: { x, y, r, strength? }      zona glow lembut, x/y 0..1 seperti layar (y=0 atas, y=1 bawah), r relatif tinggi; strength bawaan 0.8
 *   dir: derajat arah datang cahaya (0 = dari kanan, 90 = dari atas), bawaan 35
 *   preset: nama dari presets/*.json (nilai bawaan; props eksplisit menang) · saturation, intensity: pengali (1 = tetap)
 *   waveSpeed: 0..1+ (0 = beku), amp: kekuatan gelombang (bawaan 1), grain: 0.02-0.03 (bawaan 0.025), seed }
 */
export const renderLightWave = (canvas, o, frame = 0, fps = 30) => {
  o = resolveOptions("lightwave", o);
  if (!o || !Array.isArray(o.colors) || o.colors.length < 2) throw new Error("LightWaveBg: `colors` wajib, 2-3 warna dari satu keluarga hue");
  let st = cache.get(canvas); if (!st) { st = build(canvas); cache.set(canvas, st); }
  const { gl, pr, u } = st, q = o.quality ?? 1;
  const W = Math.max(2, Math.round((o.width ?? canvas.clientWidth ?? canvas.width) * q)), H = Math.max(2, Math.round((o.height ?? canvas.clientHeight ?? canvas.height) * q));
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
  gl.viewport(0, 0, W, H); gl.useProgram(pr);
  const c = o.colors.map(rgb01), g = o.glow ?? { x: 0.5, y: 0.5, r: 0.5, strength: 0 };
  const a = ((o.dir ?? 35) * Math.PI) / 180;
  gl.uniform2f(u("u_res"), W, H);
  gl.uniform1f(u("u_time"), frame / fps); // determinisme: waktu HANYA dari frame
  gl.uniform1f(u("u_frame"), frame);
  gl.uniform1f(u("u_int"), o.intensity ?? 1);
  gl.uniform1f(u("u_light"), o.mode === "light" ? 1 : 0);
  gl.uniform1f(u("u_speed"), o.waveSpeed ?? 0.4); gl.uniform1f(u("u_amp"), o.amp ?? 1);
  gl.uniform1f(u("u_grain"), o.grain ?? 0.025); gl.uniform1f(u("u_seed"), o.seed ?? 1);
  gl.uniform3f(u("u_c0"), ...c[0]); gl.uniform3f(u("u_c1"), ...c[1]); gl.uniform3f(u("u_c2"), ...(c[2] ?? c[1]));
  gl.uniform3f(u("u_glow"), g.x, 1 - g.y, g.r); gl.uniform1f(u("u_gstr"), g.strength ?? 0.8);
  gl.uniform2f(u("u_dir"), Math.cos(a), Math.sin(a));
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

/** Pola preset: lightWaveBg(canvas, frame, { preset: "researchly-glow", saturation: 1.3, glow: {...} }, fps). Props eksplisit menimpa preset. */
export const lightWaveBg = (canvas, frame, o, fps = 30) => renderLightWave(canvas, o, frame, fps);
