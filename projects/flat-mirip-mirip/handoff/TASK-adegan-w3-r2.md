TUJUAN
Perbaiki P08 supaya narasi tidak bertabrakan dengan caption video di preview dan Clawd terbaca; P09 dan P10 sudah LULUS dan tidak diubah.

KONTEKS
Baca BRIEF-ADEGAN.md (aturan 7 baru) dan REPORT-adegan-w3-r1.md. ADEGAN.md baris P08: "AppClaudeTerang singkat (prompt terkirim) → StudioRemotion: Sequence muncul beruntun cepat (react timing), playhead melesat, Clawd senang; 'jauh lebih cepat.' KataTekan".
TEMUAN (still r1)
- W3-1 P08-f052/f082/f144: narasi ("sampai", "hasil yang", "cepat.") di atas preview video Jensen yang punya caption sendiri ("to you", "And I was fortunate") → bertumpuk. Pindahkan semua narasi di bagian Studio ke panel kanan Props yang kosong (putih di atas abu gelap, kontras ≥ 4,5:1, ukuran tetap token) ATAU ke ruang di atas timeline; tidak ada piksel narasi di dalam kotak preview.
- W3-2 Clawd ±1 % frame. Punch-in kamera ke area timeline (skala ±1,5–1,8) saat Sequence tersusun beruntun; Clawd tinggi ±16–20 % frame, emosi 'senang', mendorong/menarik playhead yang melesat; Sequence baru muncul beruntun dengan react(i) di dekatnya.
- Bagian Claude (awal P08) tetap; narasi di area chat kosong seperti P04 boleh.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/P08.tsx, remotion/src/adegan/w3-*.tsx (bagian P08 saja)
- projects/flat-mirip-mirip/media/acuan/adegan/P08-r2-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w3-r2.md

FILE JANGAN
P09/P10 (dan file bantu yang dipakai P09/P10 tanpa P08), file pekerja lain, komponen bersama, tema.ts, naskah.ts, Root/index, tsconfig.json.

LULUS BILA
tsc (sekarang mencakup seluruh src) + motion_lint PASS; still P08-r2 per kelompok kata; still P09/P10 tidak berubah.

LAPORAN
REPORT-adegan-w3-r2.md.
