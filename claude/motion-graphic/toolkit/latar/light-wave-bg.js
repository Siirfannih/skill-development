// light-wave-bg.js — latar shader GLSL (WebGL mentah): 1-2 elips cahaya raksasa yang pusatnya DI LUAR kanvas, sehingga hanya
// ekor cahaya yang lebar dan lembut masuk ke frame. Ruang negatif (>= 50-60 %) tetap warna dasar murni lewat smoothstep.
// Arah sapuan tegas (dir). Tidak ada noise untuk membentuk pola warna: bentuk hanya dari elips + sinus. Satu-satunya acak:
// hash per piksel frekuensi tinggi untuk grain film (<= 0,02) agar tidak banding. OPT-IN; tanpa warna bawaan (colors wajib).
//
// Deterministik: u_time = frame / fps, selalu dari parameter `frame` (di Remotion: useCurrentFrame). Dilarang
// requestAnimationFrame/Date.now untuk waktu. Grain berbiji: hash(posisi piksel, seed, frame).
// Dipakai: renderLightWave(canvas, { colors, mode, glow, ... }, frame, fps) lalu screenshot. Headless Chromium (SwiftShader) jalan;
// butuh preserveDrawingBuffer (sudah). Ringan: opts.quality (0.25-1) memperkecil resolusi render kanvas.
// Ukur: `python3 scripts/banding.py <frame.png>` (tanpa ref) harus lolos F1; luma dan saturasi dalam REF-SPEC
// (`banding.py <frame.png> <REF-SPEC.json>`).
import { parseColor } from "./warna.js";
import { resolveOptions } from "./preset.js";

export const GRAIN_MAKS = 0.02;

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;
const FRAG = `precision highp float;
uniform vec2 u_res; uniform float u_time, u_int, u_light, u_speed, u_grain, u_seed, u_amp, u_frame;
uniform vec3 u_c0, u_c1, u_c2; uniform vec2 u_dir;
uniform vec4 u_g0, u_g1;   // elips cahaya: x, y (pusat, 0..1 layar, boleh di luar), sumbu panjang, sumbu pendek (relatif sisi terpendek)
uniform vec2 u_s;          // kekuatan elips 0 dan 1
// grain film: satu-satunya acak. Hash per piksel, tanpa pola warna.
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float grain(vec2 fc, float seed, float frame){
  return hash(fc + seed*17.31 + frame*1.618) + hash(fc*1.37 + seed*3.7 + frame*2.399) - 1.;   // segitiga -1..1
}
// ekor cahaya satu elips. Pusat bergeser pelan sepanjang arah sapuan (sinus), tepi sedikit beriak (sinus). 0 di luar elips.
float tail(vec2 p, vec4 g, vec2 d, float t, float ph){
  vec2 c = g.xy + d * sin(t*.8 + ph) * .16 * u_amp;
  vec2 e = p - c;
  vec2 q = vec2(dot(e, d), dot(e, vec2(-d.y, d.x)));            // q.x sepanjang sapuan, q.y melintang
  float k = length(q / vec2(max(g.z, .05), max(g.w, .05)));
  k *= 1. + .05*sin(q.y*4.2 + t*1.1 + ph*2.);                    // riak lembut sinus
  float f = 1. - smoothstep(.0, 1., k);
  return f;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y, m = min(asp, 1.);
  vec2 p = uv * vec2(asp, 1.) / m;                               // sisi terpendek = 0..1; pusat elips memakai skala yang sama
  vec2 d = normalize(u_dir);
  float t = u_time * u_speed;
  float a0 = tail(p, vec4(u_g0.xy * vec2(asp, 1.) / m, u_g0.zw), d, t, u_seed) * u_s.x;
  float a1 = tail(p, vec4(u_g1.xy * vec2(asp, 1.) / m, u_g1.zw), d, t*.8, u_seed + 2.1) * u_s.y;
  float a = 1. - (1. - a0) * (1. - a1);
  a = smoothstep(.012, 1., clamp(a * u_int, 0., 1.));            // ruang negatif: di bawah ambang = warna dasar murni
  vec3 col = mix(u_c0, u_c1, smoothstep(.0, .8, a));
  float hi = smoothstep(.45, 1., a);
  col = mix(col + u_c2*hi*.5*(1.-u_light), mix(col, u_c2, hi*.65), u_light);   // gelap: aditif; terang: campur
  col += grain(gl_FragCoord.xy, u_seed, u_frame) * min(u_grain, ${GRAIN_MAKS});
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

/** Elips cahaya dari prop glow: pusat (x, y) boleh di luar 0..1; r = sumbu panjang relatif sisi terpendek; ratio = pendek/panjang (bawaan 0.55). */
const elips = (g, ratio) => g ? [g.x, 1 - g.y, Math.max(0.05, g.r), Math.max(0.05, g.r * (g.ratio ?? ratio)), g.strength ?? 0.8] : [0, 0, 0.05, 0.05, 0];

/**
 * Gambar satu frame. o = {
 *   colors: [dasar, tengah, terang?]  2-3 warna satu keluarga hue (wajib, dari tema/REF-SPEC); `base` menimpa colors[0] (warna dasar = token)
 *   mode: "dark" | "light"            cara cahaya bercampur (dark: aditif; light: campur ke warna terang)
 *   glow: { x, y, r, strength?, ratio? }  elips cahaya #1; x/y 0..1 seperti layar (y=0 atas), SEBAIKNYA di luar 0..1 (mis. x 1.2 atau y -0.2)
 *                                     supaya hanya ekor lebar yang masuk frame; r = sumbu panjang relatif sisi terpendek; strength bawaan 0.8
 *   glow2: sama, elips cahaya #2 (opsional)
 *   dir: derajat arah datang cahaya = arah sapuan (0 = dari kanan, 90 = dari atas), bawaan 35; elips memanjang searah dir
 *   preset: nama dari presets/*.json (nilai bawaan; props eksplisit menang) · saturation, intensity: pengali (1 = tetap)
 *   waveSpeed: 0..1+ (0 = beku), amp: jarak sapuan (bawaan 1), grain: <= 0.02 (dibatasi), seed }
 */
export const renderLightWave = (canvas, o, frame = 0, fps = 30) => {
  o = resolveOptions("lightwave", o);
  if (!o || !Array.isArray(o.colors) || o.colors.length < 2) throw new Error("LightWaveBg: `colors` wajib, 2-3 warna dari satu keluarga hue");
  let st = cache.get(canvas); if (!st) { st = build(canvas); cache.set(canvas, st); }
  const { gl, pr, u } = st, q = o.quality ?? 1;
  const W = Math.max(2, Math.round((o.width ?? canvas.clientWidth ?? canvas.width) * q)), H = Math.max(2, Math.round((o.height ?? canvas.clientHeight ?? canvas.height) * q));
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
  gl.viewport(0, 0, W, H); gl.useProgram(pr);
  const c = o.colors.map(rgb01); if (o.base) c[0] = rgb01(o.base);
  const e0 = elips(o.glow ?? { x: 1.2, y: -0.2, r: 0.9, strength: 0 }, 0.55), e1 = elips(o.glow2, 0.55);
  const a = ((o.dir ?? 35) * Math.PI) / 180;
  gl.uniform2f(u("u_res"), W, H);
  gl.uniform1f(u("u_time"), frame / fps); // determinisme: waktu HANYA dari frame
  gl.uniform1f(u("u_frame"), frame);
  gl.uniform1f(u("u_int"), o.intensity ?? 1);
  gl.uniform1f(u("u_light"), o.mode === "light" ? 1 : 0);
  gl.uniform1f(u("u_speed"), o.waveSpeed ?? 0.4); gl.uniform1f(u("u_amp"), o.amp ?? 1);
  gl.uniform1f(u("u_grain"), Math.min(o.grain ?? GRAIN_MAKS, GRAIN_MAKS)); gl.uniform1f(u("u_seed"), o.seed ?? 1);
  gl.uniform3f(u("u_c0"), ...c[0]); gl.uniform3f(u("u_c1"), ...c[1]); gl.uniform3f(u("u_c2"), ...(c[2] ?? c[1]));
  gl.uniform4f(u("u_g0"), e0[0], e0[1], e0[2], e0[3]); gl.uniform4f(u("u_g1"), e1[0], e1[1], e1[2], e1[3]);
  gl.uniform2f(u("u_s"), e0[4], e1[4]);
  gl.uniform2f(u("u_dir"), Math.cos(a), Math.sin(a));
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

/** Pola preset: lightWaveBg(canvas, frame, { preset: "researchly-glow", saturation: 1.3, glow: {...} }, fps). Props eksplisit menimpa preset. */
export const lightWaveBg = (canvas, frame, o, fps = 30) => renderLightWave(canvas, o, frame, fps);
