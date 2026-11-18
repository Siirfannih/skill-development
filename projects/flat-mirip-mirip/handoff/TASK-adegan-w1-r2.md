TUJUAN
Perbaiki P02 supaya Clawd terlihat jelas menjalankan timeline dan kata "Claude" tidak bertabrakan dengan isi video preview. P01, P03, P13, P15 sudah LULUS dan tidak diubah.

KONTEKS
Baca BRIEF-ADEGAN.md (catatan doctor/PETA + kontrak) dan REPORT-adegan-w1-r1.md. Brief Irfan P02: "claude digambarkan sebagai karakter clawd yang muncul diframe sedang menjalankan timeline editor". Durasi P02 sangat pendek (±0,4 dtk sementara), jadi satu gambar harus langsung terbaca.
TEMUAN (still P02-f005 r1)
- W1-1 "Claude" (KataTekan) diletakkan di atas video Jensen di preview Studio, yang punya caption sendiri ("it to you") → dua teks bertabrakan dan "Claude" terbaca seperti caption video. Pindahkan "Claude" ke ruang kosong DI LUAR preview video (mis. area panel kanan Props yang kosong, atau di atas timeline), tetap di dalam komposisi yang di-punch-in, kontras ≥ 4,5:1 (putih di panel gelap atau tinta di bidang terang).
- W1-2 Clawd hanya ±1 % frame di track timeline → tidak terlihat. Kamera punch-in ke area timeline + preview (skala ±1,6–2,0, fokus ke playhead), Clawd diperbesar sampai tinggi badan ±16–20 % tinggi frame, berdiri di atas track sambil memegang/menarik playhead (pose 'samping' atau 'depan', pegangPlayhead), playhead bergeser sedikit selama adegan. Clawd tidak menutup kata "Claude".
- Preview tetap memutar video jadi Jensen (D-17).

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/P02.tsx, remotion/src/adegan/w1-*.tsx (bagian yang dipakai P02 saja)
- projects/flat-mirip-mirip/media/acuan/adegan/P02-r2-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w1-r2.md

FILE JANGAN
P01/P03/P13/P15, file pekerja lain, komponen bersama (Clawd, StudioRemotion), tema.ts, naskah.ts, Root/index.

LULUS BILA
tsc + motion_lint PASS; still P02-r2 di awal, tengah, akhir adegan; still P01/P03/P13/P15 r1 tidak berubah (tidak ada perubahan file mereka).
Catatan: `tema_cek.py` membutuhkan folder yang berisi `bersama/tema.ts`; jalankan pada `projects/flat-mirip-mirip/remotion/src` dan laporkan hanya baris untuk file adeganmu (temuan di `pinjam/` diketahui dan diabaikan).

LAPORAN
REPORT-adegan-w1-r2.md.
