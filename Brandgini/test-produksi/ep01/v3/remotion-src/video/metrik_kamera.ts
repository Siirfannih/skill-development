// metrik_kamera.ts · uji gerak kamera mulus (ADDENDUM-4 butir 1a): cari balik arah (ekstrem lokal) pada zoom dan pusat x di tiap dunia.
import { kamPantai, kamGang } from './kamera';
const uji = (nama: string, f: (t: number) => number, a: number, b: number, eps: number) => {
  let prev = f(a), dir = 0, last = a; const ev: string[] = [];
  for (let t = a + 0.05; t <= b; t += 0.05) {
    const v = f(t), d = v - prev;
    if (Math.abs(d) > eps) { const nd = d > 0 ? 1 : -1; if (dir !== 0 && nd !== dir) ev.push(`balik arah di ${(t - 0.05).toFixed(2)} dtk (${dir > 0 ? 'naik' : 'turun'} -> ${nd > 0 ? 'naik' : 'turun'}, nilai ${prev.toFixed(2)})`); dir = nd; last = t; }
    prev = v;
  }
  console.log(`${nama} ${a}-${b}: ${ev.length} balik arah${ev.length ? ': ' + ev.join('; ') : ''}`); void last;
};
uji('pantai zoom', (t) => kamPantai(t).s, 0, 40.1, 0.0015);
uji('pantai pusat-x', (t) => kamPantai(t).fx, 0, 40.1, 0.4);
uji('loop zoom', (t) => kamPantai(t).s, 53.0, 55.3, 0.0015);
uji('gang zoom', (t) => kamGang(t).s, 40.1, 53.0, 0.0015);
uji('gang pusat-x', (t) => kamGang(t).fx, 40.1, 53.0, 0.4);
uji('gang pusat-y', (t) => kamGang(t).fy, 40.1, 53.0, 0.4);
// kecepatan maks zoom (per dtk, log) dan pusat (px/dtk)
let mz = 0, mx = 0; for (let t = 0.1; t < 40; t += 0.05) { mz = Math.max(mz, Math.abs(Math.log(kamPantai(t + 0.05).s / kamPantai(t).s)) / 0.05); mx = Math.max(mx, Math.abs(kamPantai(t + 0.05).fx - kamPantai(t).fx) / 0.05); }
console.log(`pantai kecepatan maks: zoom ${mz.toFixed(2)} ln/dtk, pusat ${mx.toFixed(0)} px dunia/dtk`);
