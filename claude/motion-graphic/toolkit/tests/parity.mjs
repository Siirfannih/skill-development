// parity.mjs — uji paritas curves.ts (kanonik, Easing.bezier Remotion) vs curves.js (ESM storyboard), plus kamera dan registri.
// Jalankan dari folder proyek yang punya node_modules (remotion + esbuild): node <toolkit>/tests/parity.mjs
import assert from "node:assert/strict";
import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

const T = resolve(dirname(new URL(import.meta.url).pathname), "..");
const out = join(mkdtempSync(join(tmpdir(), "parity-")), "curves-ts.mjs");
await build({ entryPoints: [join(T, "gerak/curves.ts")], bundle: true, format: "esm", platform: "node", outfile: out, external: [] , logLevel: "error" });
const ts = await import(pathToFileURL(out));
const js = await import(pathToFileURL(join(T, "gerak/curves.js")));

let n = 0;
const ok = (nama) => console.log("ok", ++n, nama);
const near = (a, b, m) => assert.ok(Math.abs(a - b) < 1e-6, `${m}: ${a} vs ${b}`);

for (const k of Object.keys(ts.CURVE)) {
  assert.ok(k in js.CURVE, `kurva ${k} hilang di curves.js`);
  for (let i = 0; i <= 1000; i++) near(ts.CURVE[k](i / 1000), js.CURVE[k](i / 1000), `${k}(${i / 1000})`);
}
assert.deepEqual(Object.keys(ts.CURVE).sort(), Object.keys(js.CURVE).sort());
ok("7 kurva sama di 1001 titik");

for (const d of [0, 1, 10, 100, 500, 1920, 5000]) for (const fps of [24, 30, 60]) for (const w of [0.7, 1, 1.35]) assert.equal(ts.dur(d, fps, w), js.dur(d, fps, w));
for (const e of [1, 2, 9, 30]) assert.equal(ts.exitDur(e), js.exitDur(e));
for (let i = 0; i < 14; i++) for (const fps of [24, 30, 60]) for (const s of [1, 0.5]) assert.equal(ts.react(i, fps, s), js.react(i, fps, s));
ok("dur, exitDur, react identik");

for (const c of Object.keys(ts.CURVE)) for (let f = -5; f <= 120; f += 3) {
  near(ts.move(f, 10, 40, c), js.move(f, 10, 40, c), `move ${c} f${f}`);
  const a = ts.arc(f, 10, 40, { x: 0, y: 0 }, { x: 300, y: 200 }), b = js.arc(f, 10, 40, { x: 0, y: 0 }, { x: 300, y: 200 });
  near(a.x, b.x, "arc.x"); near(a.y, b.y, "arc.y");
}
for (let f = 0; f < 300; f += 7) { const a = ts.drift(f, 30, 6, 2), b = js.drift(f, 30, 6, 2); near(a.x, b.x, "drift.x"); near(a.y, b.y, "drift.y"); }
for (const [a, b, p] of [[0, 10, 0.3], [-5, 5, 1]]) near(ts.lerp(a, b, p), js.lerp(a, b, p), "lerp");
ok("move, arc, drift, lerp identik");

const cam = await import(pathToFileURL(join(T, "kamera/camera25d.js")));
const keys = [{ at: 0, push: 0, orbit: 0 }, { at: 60, push: 200, x: 40, orbit: 20, curve: "land" }, { at: 120, focusZ: -100 }];
const s0 = cam.cameraAt(keys, 0), s1 = cam.cameraAt(keys, 60), sm = cam.cameraAt(keys, 30), s9 = cam.cameraAt(keys, 999);
assert.equal(s0.push, 0); assert.equal(s1.push, 200); assert.ok(sm.push > 0 && sm.push < 200);
assert.equal(s1.orbit, 8, "orbit dijepit ±8"); assert.equal(s9.focusZ, -100);
assert.deepEqual(cam.cameraAt(keys, 33, { drift: { amp: 4, seed: 2 }, fps: 30 }), cam.cameraAt(keys, 33, { drift: { amp: 4, seed: 2 }, fps: 30 }));
const dekat = cam.layerParams(300, sm), jauh = cam.layerParams(-300, sm);
assert.ok(Math.abs(dekat.tx) >= Math.abs(jauh.tx), "lapis dekat bergeser lebih banyak");
const fb = { perUnit: 0.012, max: 14 };
assert.equal(cam.layerParams(100, { ...s0, focusZ: 0 }, { focusBlur: fb }).blur, 0, "di depan fokus tajam");
assert.ok(cam.layerParams(-300, { ...s0, focusZ: 0 }, { focusBlur: fb }).blur > 0, "di belakang fokus buram");
ok("camera25d: keyframe, jepit orbit, parallax, blur hanya di belakang fokus");

const P = await import(pathToFileURL(join(T, "latar/preset.js")));
const b = P.resolveOptions("lightwave", { preset: "researchly-glow" });
assert.equal(b.mode, "dark"); assert.equal(b.core.x, 1.05); assert.ok(b.core.x > 1, "pusat core di luar frame"); assert.equal(b.colors.length, 3);
const l = P.resolveOptions("lightwave", { preset: "researchly-glow", mode: "light" });
assert.equal(l.colors[0], "#F8FAFC");
const o = P.resolveOptions("lightwave", { preset: "researchly-glow", saturation: 1.3, core: { x: 0.2 } });
assert.equal(o.core.x, 0.2); assert.equal(o.core.radius, b.core.radius, "core digabung per kunci"); assert.notEqual(o.colors[1], b.colors[1]);
assert.throws(() => P.resolveOptions("lightwave", { preset: "zona-lembut" }));
assert.throws(() => P.resolveOptions("lightwave", { colors: "brand" }));
P.setMerek(["#112233", "#445566"]); assert.deepEqual(P.resolveOptions("lightwave", { colors: "brand" }).colors, ["#112233", "#445566"]);
ok("preset: varian, override menang, saturation, brand, salah-komponen");
console.log(`PASS ${n} kelompok`);
