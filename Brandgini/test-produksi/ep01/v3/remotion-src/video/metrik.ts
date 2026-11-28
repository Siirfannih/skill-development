// metrik.ts · ukur v2: zoom per beat dan lebar objek fokus (kamera layer aksi). Dijalankan lewat esbuild -> node.
import { kam } from './kamera';
import sl from './data/shotlist.json';

// objek fokus per beat: nama + lebar di dunia (px) atau lebar layar tetap (px)
const F: Record<number, [string, number, 'dunia' | 'layar']> = {
  1: ['gerobak A (payung 220 px)', 230, 'dunia'], 2: ['maskot KLIK (besar)', 540, 'layar'], 3: ['panorama pantai 1 km', 2000, 'dunia'], 4: ['panorama pantai 1 km', 2000, 'dunia'],
  5: ['panorama + pembeli berjalan', 2000, 'dunia'], 6: ['gerobak A + antrean', 450, 'dunia'], 7: ['wilayah rebutan di tengah', 450, 'dunia'], 8: ['gerobak B', 230, 'dunia'],
  9: ['dua gerobak menempel', 460, 'dunia'], 10: ['A ... B mundur (975 px)', 975, 'dunia'], 11: ['dua gerobak menempel', 460, 'dunia'], 12: ['kartu Hotelling', 680 * 0.82, 'layar'],
  13: ['dua minimarket (590 px)', 590, 'dunia'], 14: ['sekolah/rumah', 260, 'dunia'], 15: ['dua minimarket menempel', 340, 'dunia'], 16: ['pembeli + garis jarak', 400, 'dunia'], 17: ['gerobak A (loop)', 230, 'dunia'],
};
const B = (sl as { beats: { beat_id: number; start_sec: number; end_sec: number }[] }).beats;
console.log('beat | detik | zoom awal -> akhir (maks/min) | s tengah | objek fokus | lebar fokus % frame (tengah) | % di zoom maks');
for (const b of B) {
  const ts: number[] = []; for (let t = b.start_sec + 0.05; t < b.end_sec - 0.05; t += 0.05) ts.push(t);
  const s = ts.map((t) => kam(t).s); const mn = Math.min(...s), mx = Math.max(...s);
  const mid = kam((b.start_sec + b.end_sec) / 2).s; const [nama, w, jenis] = F[b.beat_id];
  const frac = jenis === 'layar' ? w / 1080 : (w * mid) / 1080;
  console.log(`b${String(b.beat_id).padStart(2, '0')} | ${b.start_sec}-${b.end_sec} | ${s[0].toFixed(2)} -> ${s[s.length - 1].toFixed(2)} (x${(mx / mn).toFixed(2)}) | ${mid.toFixed(2)} | ${nama} | ${frac > 1 ? 'penuh (>100%)' : Math.round(frac * 100) + '%'} | ${Math.round((jenis === 'layar' ? w / 1080 : (w * mx) / 1080) * 100)}%`);
}
