// Uji timing.ts. Jalankan: npx tsx claude/motion-graphic/scripts/tests/test_timing.ts
import assert from "node:assert/strict";
import { stagger, dampTrack, vanWijk, timeline } from "../remotion/timing";

let n = 0;
const t = (nama: string, fn: () => void) => { fn(); n++; console.log("ok", n, nama); };
const near = (a: number, b: number, eps: number, m = "") => assert.ok(Math.abs(a - b) <= eps, `${m} ${a} vs ${b}`);

t("stagger deterministik + jitter berbiji", () => {
  const o = { from: "random" as const, gap: 3, jitter: 2, seed: 5 };
  for (let i = 0; i < 10; i++) assert.equal(stagger(i, 10, o), stagger(i, 10, o));
  const a = Array.from({ length: 10 }, (_, i) => stagger(i, 10, o)), b = Array.from({ length: 10 }, (_, i) => stagger(i, 10, { ...o, seed: 6 }));
  assert.notDeepEqual(a, b);
});
t("stagger batas first: 0 dan (n-1)*gap + start", () => {
  assert.equal(stagger(0, 6, { gap: 3 }), 0);
  assert.equal(stagger(5, 6, { gap: 3 }), 15);
  assert.equal(stagger(0, 6, { gap: 3, start: 10 }), 10);
  assert.equal(stagger(0, 1, { gap: 3 }), 0);
});
t("stagger last dan index", () => {
  assert.equal(stagger(5, 6, { gap: 2, from: "last" }), 0);
  assert.equal(stagger(0, 6, { gap: 2, from: "last" }), 10);
  assert.equal(stagger(2, 6, { gap: 2, from: 2 }), 0);
});
t("stagger center simetris (1D dan grid)", () => {
  for (let i = 0; i < 7; i++) assert.equal(stagger(i, 7, { from: "center", gap: 3 }), stagger(6 - i, 7, { from: "center", gap: 3 }));
  const g = { from: "center" as const, grid: [4, 3] as [number, number], gap: 3 };
  for (let i = 0; i < 12; i++) assert.equal(stagger(i, 12, g), stagger(11 - i, 12, g));
  assert.ok(stagger(5, 12, g) < stagger(0, 12, g));
});
t("stagger grid axis x = per kolom", () => {
  const o = { grid: [4, 3] as [number, number], axis: "x" as const, gap: 2 };
  assert.equal(stagger(0, 12, o), stagger(8, 12, o));
  assert.equal(stagger(3, 12, o), 6);
});
t("stagger ease: ujung tetap, tengah bergeser", () => {
  const ease = (x: number) => x * x;
  assert.equal(stagger(0, 5, { gap: 4, ease }), 0);
  assert.equal(stagger(4, 5, { gap: 4, ease }), 16);
  assert.equal(stagger(2, 5, { gap: 4, ease }), 4); // 0.25*16
});

const keys = [{ at: 0, v: 0 }, { at: 30, v: 100 }, { at: 60, v: 40 }];
for (const zeta of [1, 0.6, 1.8]) {
  t(`dampTrack zeta=${zeta}: deterministik, awal, kontinu posisi+kecepatan di kunci`, () => {
    const fps = 30, f = (fr: number) => dampTrack(keys, fr, fps, 0.5, zeta);
    assert.equal(f(17), f(17));
    assert.equal(f(0), 0);
    for (const k of [30, 60]) {
      const e = 1e-6; // frame pecahan kecil di kedua sisi kunci
      near(f(k - e), f(k + e), 1e-3, "posisi");
      const vL = (f(k - e) - f(k - 2 * e)) / (e / fps), vR = (f(k + 2 * e) - f(k + e)) / (e / fps);
      near(vL, vR, Math.max(1, Math.abs(vL) * 1e-3), "kecepatan");
    }
    near(f(300), 40, 1e-3, "settle");
  });
}
t("dampTrack kecepatan terbawa (bukan reset 0)", () => {
  const k2 = [{ at: 0, v: 0 }, { at: 6, v: 100 }, { at: 12, v: 0 }]; // retarget saat pegas masih bergerak
  const f = (fr: number) => dampTrack(k2, fr, 30, 0.5, 1);
  const v = (f(12.001) - f(12)) / (0.001 / 30);
  assert.ok(Math.abs(v) > 50, `v=${v}`);
});

t("vanWijk ujung tepat + deterministik", () => {
  const a = [0, 0, 1], b = [500, 300, 0.2];
  const p0 = vanWijk(a, b, 0), p1 = vanWijk(a, b, 1);
  a.forEach((x, i) => near(p0[i], x, 1e-6, "t0"));
  b.forEach((x, i) => near(p1[i], x, 1e-6, "t1"));
  assert.deepEqual(vanWijk(a, b, 0.37), vanWijk(a, b, 0.37));
});
t("vanWijk jarak jauh zoom-out dulu; pusat sama = zoom geometris", () => {
  const mid = vanWijk([0, 0, 1], [5000, 0, 1], 0.5);
  assert.ok(mid[2] > 1.5, `w=${mid[2]}`);
  const z = vanWijk([3, 4, 2], [3, 4, 8], 0.5);
  near(z[2], 4, 1e-9); near(z[0], 3, 1e-9);
});
t("vanWijk cocok nilai keluaran d3-interpolate 3.x (interpolateZoom)", () => {
  const ref: [number, number[]][] = [[0.25, [0.9565049122975203, 0.5739029473785122, 50.9677786470043]],
    [0.5, [416.66666669484914, 250.0000000169095, 434.61372381664614]], [0.8, [499.99206254137647, 299.9952375248259, 4.6507709405372]]];
  for (const [tt, e] of ref) vanWijk([0, 0, 1], [500, 300, 0.2], tt).forEach((x, i) => near(x, e[i], 1e-6 * Math.max(1, e[i]), `t=${tt}`));
});

t("timeline posisi relatif", () => {
  const T = timeline();
  assert.equal(T.add("a", 18), 0);
  assert.equal(T.add("b", 14, "<+=4"), 22);   // akhir a (18) + 4
  assert.equal(T.add("c", 10, "<<+=2"), 24);   // awal b (22) + 2
  assert.equal(T.add("d", 6, "b-=3"), 19);     // label b (22) - 3
});
t("timeline: default akhir, absolut, label, -=N, total", () => {
  const T = timeline();
  T.add("a", 20);
  assert.equal(T.add("b", 10), 20);
  assert.equal(T.add("c", 5, 100), 100);
  assert.equal(T.add("d", 5, "-=3"), 102);     // akhir (105) - 3
  assert.equal(T.add("e", 5, "b"), 20);
  assert.equal(T.add("f", 5, "b+=7"), 27);
  assert.equal(T.total, 107);
  assert.throws(() => T.add("g", 1, "nope"));
  assert.throws(() => T.add("a", 1));
});
t("timeline revisi satu durasi menggeser turunan", () => {
  const build = (heroDur: number) => {
    const T = timeline();
    T.add("hero", heroDur);
    T.add("sub", 14, "<+=4");
    T.add("cta", 20);
    return T;
  };
  const a = build(18), b = build(24);
  assert.equal(b.at("sub") - a.at("sub"), 6);
  assert.equal(b.at("cta") - a.at("cta"), 6);
  assert.equal(b.at("hero"), a.at("hero"));
});
console.log(`LULUS ${n}/${n}`);
