// light-wave-bg.js — latar shader GLSL (WebGL mentah), v3: port shader patokan Irfan (patokan-irfan.glsl) dengan perubahan sesedikit
// mungkin. Dua lapis cahaya Gaussian: AMBIENT WASH (sapuan lebar, melintasi area teks) + CORE (sumber utama, pusat di luar frame, ekor lebar).
// Falloff intensitas = exp(-dot(d,d)*k), d = (posisi - pusat) / radius: tanpa titik henti, tanpa smoothstep/step/clamp pada cahaya.
// Satu-satunya acak: hash per piksel (grain film <= 0,02). Tanpa noise pembentuk warna. Pusat core dan ambient melayang pelan.
// OPT-IN; tanpa warna bawaan (colors wajib atau preset). Warna: colors = [dasar, ambient, core] (core bawaan = ambient bila hanya 2).
//
// Deterministik: u_time = frame / fps, selalu dari parameter `frame` (di Remotion: useCurrentFrame). Dilarang
// requestAnimationFrame/Date.now untuk waktu. Grain: hash(posisi piksel + fract(u_time)).
// Dipakai: renderLightWave(canvas, { preset, mode, core, ambient, ... }, frame, fps) lalu screenshot. Headless Chromium (SwiftShader) jalan;
// butuh preserveDrawingBuffer (sudah). Ringan: opts.quality (0.25-1) memperkecil resolusi render kanvas.
// Ukur: scripts/tests/test_latar_v3.py (area kalem, tepi, APCA, grain).
import { parseColor } from "./warna.js";
import { resolveOptions } from "./preset.js";

export const GRAIN_MAKS = 0.02;

// Nilai bawaan = patokan Irfan. Posisi dalam koordinat layar 0..1 (y=0 atas); radius dalam satuan tinggi layar.
export const DEFAULT_CORE = { x: 1.05, y: 0.15, radius: 0.95, ratio: 0.6 / 0.95, intensity: 0.75, falloff: 2.2 };
export const DEFAULT_AMBIENT = { x: 0.75, y: 0.4, width: 1.35, ratio: 0.95 / 1.35, angle: 0, intensity: 0.55, falloff: 1.4 };

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;
const FRAG = `precision highp float;
uniform float u_time;          // frame / fps
uniform vec2 u_resolution;
uniform vec3 u_baseColor, u_ambientColor, u_coreColor;
uniform float u_grainAmount;   // <= 0.02
uniform vec4 u_core, u_amb;    // x, y (posisi layar 0..1, y atas = 0), sumbu-x radius, sumbu-y radius (satuan tinggi layar)
uniform vec3 u_coreI, u_ambI;  // intensitas, falloff k, sudut putar (radian)
uniform float u_speed, u_drift;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float gaussianGlow(vec2 uv, vec2 center, vec2 scale, float falloff, float ang) {
  vec2 e = uv - center;
  float c = cos(ang), s = sin(ang);
  vec2 d = vec2(c * e.x + s * e.y, -s * e.x + c * e.y) / scale;
  return exp(-dot(d, d) * falloff);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * 0.35 * u_speed;
  vec2 ambientPos = vec2((u_amb.x - 0.5) * aspect + sin(t) * 0.15 * u_drift, (0.5 - u_amb.y) + cos(t * 0.8) * 0.12 * u_drift);
  float ambient = gaussianGlow(p, ambientPos, u_amb.zw, u_ambI.y, u_ambI.z);
  vec2 corePos = vec2((u_core.x - 0.5) * aspect + cos(t * 0.7) * 0.12 * u_drift, (0.5 - u_core.y) + sin(t * 0.6) * 0.10 * u_drift);
  float core = gaussianGlow(p, corePos, u_core.zw, u_coreI.y, u_coreI.z);
  vec3 color = u_baseColor;
  color = mix(color, u_ambientColor, ambient * u_ambI.x);
  color = mix(color, u_coreColor, core * u_coreI.x);
  float grain = (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * u_grainAmount;
  color += grain;
  gl_FragColor = vec4(color, 1.0);
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
const rad = (d) => (d * Math.PI) / 180;

/**
 * Gambar satu frame. o = {
 *   preset: nama dari presets/*.json (nilai bawaan; props eksplisit menang; core/ambient digabung per kunci) · saturation, intensity: pengali (1 = tetap)
 *   colors: [dasar, ambient, core?] atau "brand" (setMerek([...]) dari tema.ts); `base` menimpa colors[0] (warna dasar = token)
 *   mode: "dark" | "light"            memilih varian preset (warna dan nilai bawaan)
 *   core: { x, y, radius, ratio, intensity, falloff? }  sumber utama; x/y 0..1 seperti layar (y=0 atas), SEBAIKNYA di luar 0..1 supaya hanya ekor lebar masuk;
 *         radius = sumbu-x (satuan tinggi layar), ratio = sumbu-y / sumbu-x, intensity 0..1 (bobot warna core), bawaan = patokan
 *   ambient: { angle, width, intensity, x?, y?, ratio?, falloff? }  sapuan lebar; width = sumbu panjang (satuan tinggi layar), angle = putar elips (derajat, 0 = mendatar)
 *   waveSpeed: pengali kecepatan drift (1 = patokan, 0 = beku) · drift: pengali jarak drift (1 = patokan) · grain: <= 0.02 (dibatasi) }
 */
export const renderLightWave = (canvas, o, frame = 0, fps = 30) => {
  o = resolveOptions("lightwave", o);
  if (!o || !Array.isArray(o.colors) || o.colors.length < 2) throw new Error("LightWaveBg: `colors` wajib: [dasar, ambient, core?] atau preset");
  let st = cache.get(canvas); if (!st) { st = build(canvas); cache.set(canvas, st); }
  const { gl, pr, u } = st, q = o.quality ?? 1;
  const W = Math.max(2, Math.round((o.width ?? canvas.clientWidth ?? canvas.width) * q)), H = Math.max(2, Math.round((o.height ?? canvas.clientHeight ?? canvas.height) * q));
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
  gl.viewport(0, 0, W, H); gl.useProgram(pr);
  const c = o.colors.map(rgb01); if (o.base) c[0] = rgb01(o.base);
  const core = { ...DEFAULT_CORE, ...(o.core || {}) }, amb = { ...DEFAULT_AMBIENT, ...(o.ambient || {}) };
  const k = o.intensity ?? 1, w01 = (v) => Math.min(1, Math.max(0, v));   // bobot warna 0..1 (bukan bentuk cahaya)
  gl.uniform2f(u("u_resolution"), W, H);
  gl.uniform1f(u("u_time"), frame / fps); // determinisme: waktu HANYA dari frame
  gl.uniform1f(u("u_grainAmount"), Math.min(o.grain ?? GRAIN_MAKS, GRAIN_MAKS));
  gl.uniform3f(u("u_baseColor"), ...c[0]); gl.uniform3f(u("u_ambientColor"), ...c[1]); gl.uniform3f(u("u_coreColor"), ...(c[2] ?? c[1]));
  gl.uniform4f(u("u_core"), core.x, core.y, Math.max(0.05, core.radius), Math.max(0.05, core.radius * core.ratio));
  gl.uniform3f(u("u_coreI"), w01(core.intensity * k), core.falloff, 0);
  gl.uniform4f(u("u_amb"), amb.x, amb.y, Math.max(0.05, amb.width), Math.max(0.05, amb.width * amb.ratio));
  gl.uniform3f(u("u_ambI"), w01(amb.intensity * k), amb.falloff, rad(amb.angle));
  gl.uniform1f(u("u_speed"), o.waveSpeed ?? 1); gl.uniform1f(u("u_drift"), o.drift ?? 1);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

/** Pola preset: lightWaveBg(canvas, frame, { preset: "researchly-glow", saturation: 1.3, core: { x: 1.2 } }, fps). Props eksplisit menimpa preset. */
export const lightWaveBg = (canvas, frame, o, fps = 30) => renderLightWave(canvas, o, frame, fps);
