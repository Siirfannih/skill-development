# TASK-R6-profesional · kata "profesional" di adegan IG bergaya kartu 85 (D-451)

## AWAL SESI SUDAH DIKERJAKAN SUTRADARA
`git pull` + `tools/doctor.sh` sudah dijalankan; satu-satunya GAGAL adalah "PETA.md basi" karena file lokal yang belum di-commit. Bukan penghalang. JANGAN jalankan `doctor.sh --fix`, jangan sentuh PETA.md.

TUJUAN: saat Irfan mengucapkan "profesional" (78,659–79,262 dtk absolut), video di dalam postingan IG menampilkan Irfan tanpa latar kamar: latar diganti hijau polos, dan kata "PROFESIONAL" besar berwarna hitam berdiri DI BELAKANG badan Irfan (badan/kepala menutupi sebagian huruf). Kata kecil putih "profesional" yang sekarang ada dihapus dari layar.

## KONTEKS
- Komposisi `DuniaIG` di `remotion/src/video/b6.tsx` (props di `lego/lapisan_opaque.json` id `D_IG`: t0 = 76,40966666666667, z0, kunci, kamera, ring). Video wajah di bidang media hitam dibangun di sekitar baris 148–155 (`rx, ry, rw, rh`, skala `vs`) dari `staticFile('video/wajah-proxy.mp4')` mulai `t0*fps`. Waktu lokal lapisan t = f/fps; "profesional" = t 2,249–2,852 (frame lokal 67–85).
- Matte pembicara (RVM, ffv1 gray, 1920×1080, 2512 frame, sama waktu dengan `wajah-proxy.mp4`/timeline keluaran): `qc/matte/wajah-matte-r6.mkv`. Remotion butuh versi yang bisa dibaca peramban: buat `remotion/public/video/matte-ig-r6.webm` (atau mp4 gray) HANYA untuk rentang yang dipakai (± 78,5–79,4 dtk) supaya kecil, dan pakai sebagai masker luminans (`mask-image` dari elemen video tidak didukung; cara yang aman: render matte sebagai `<OffthreadVideo>` dalam `<canvas>`/`useCurrentFrame` lalu gabung, atau pakai CSS `mix-blend-mode`/SVG `<mask>` dengan `<foreignObject>` — pilih cara yang terbukti benar di still).
- Referensi bentuk: kartu 85 Sam John "CONTENT" (gambar Irfan: kata raksasa hitam di atas latar kuning polos). Yang ditiru hanya bentuk (kata raksasa satu baris, latar satu warna, subjek di depan), warna dari arahan Irfan: latar hijau, huruf hitam.
- Pengikat merek (D-446): putih minimalis Apple-style. Hijau dipilih: `#34C759` (hijau sistem Apple). Hitam huruf: `#080608` (MEREK.latar). Huruf: Poppins 800 kapital (HURUF.keluarga.hero), tracking −2 %, lebar kata ±92 % lebar bidang video, titik tengah vertikal kata ±42 % tinggi bidang video (di belakang leher/dada atas, sehingga kepala menutupi bagian tengah kata).
- Gerak (kartu 83/85, LANTAI B13/B13a): masuk = potongan pada onset (latar langsung hijau, tanpa fade), kata masuk skala 1,10 → 1,00 dengan kurva `land` 6 frame (`lib/curves.ts`); kamera IG yang sudah ada tetap jalan (kata ada di dalam bidang video, ikut kamera); keluar = potongan tepat frame lokal 86 (79,28 dtk, saat "gak? Atau" mulai).

## FILE BOLEH
- `remotion/src/video/b6.tsx` (hanya rentang "profesional"; komponen baru boleh di file baru `remotion/src/video/bersama/KataBelakang.tsx`)
- `remotion/src/video/bersama/tema.ts`: TAMBAH satu token `PENGECUALIAN.hijauProfesional = {warna: '#34C759', adegan: 'IG profesional', alasan: 'arahan Irfan D-451'}` (warna lain tidak boleh ditulis langsung di b6/KataBelakang)
- BARU: `remotion/public/video/matte-ig-r6.*`, `qc/r6/profesional/**` (still, log)
- Render keluaran: `lego/cache/D_IG_r6.mp4` (opak, seperti lapisan D_IG sekarang: `npx remotion render src/video/index.ts DuniaIG ../lego/cache/D_IG_r6.mp4 --props=<props D_IG dari lapisan_opaque.json> --codec=h264 --crf=12` dari folder `remotion/`, tanpa audio)
## FILE JANGAN
Semua file lain: `lego/*.json`, `lego/*.py`, `teks.json`, `audio/`, `edit/`, b1–b5, b7, `bersama/chat/`, `bersama/ui-asli/`, folder proyek lain. Jangan render video penuh.

## TEMUAN
F-P1 · 78,7 dtk (frame absolut 2359): "profesional" kecil putih di bidang video, terlihat tempelan dan tidak proporsional (gambar Irfan). Perbaikan: seperti TUJUAN.

## LARANGAN
- Teks hanya dari ucapan: kata yang tampil "PROFESIONAL" saja; tidak menambah garis titik, logo, atau teks lain.
- Kata tidak tampil dua kali (lapisan teks putih T086 akan dibuang Sutradara di lego; jangan menambahkan versi kecil di b6).
- Tepi matte bersih: tidak ada halo kamar di sekitar rambut/bahu; bila tepi kasar, haluskan matte (blur 1–2 px + sedikit erode), jangan menambah glow.
- Tidak ada fade masuk/keluar; tidak ada efek tambahan (glow, bayangan besar, gradien).
- UI IG di luar bidang video tidak berubah.

## LULUS BILA
1. `npx tsc --noEmit -p .` di `remotion/` lulus.
2. Still frame lokal 66, 68, 72, 80, 85, 86 di `qc/r6/profesional/` (1920×1080) + lembar `qc/r6/profesional/lembar.jpg`: f66 masih adegan lama; f68–85 latar hijau, kata hitam besar di belakang badan, kepala menutupi sebagian huruf, tepi rambut bersih; f86 kembali normal.
3. `lego/cache/D_IG_r6.mp4` 1920×1080, jumlah frame sama dengan `lego/cache/78a68954a56d0122-an.mp4`, dan di luar frame lokal 67–85 identik (PSNR ≥ 50 dB terhadap file lama, cek dan tulis angkanya).

## JANGAN
Render final, ubah lego/teks/audio, sentuh adegan lain, ubah atribut lain di IG (posisi kamera, warna UI, waktu).

## LAPORAN
`handoff/REPORT-R6-profesional.md`: file diubah, cara masker dibuat, hasil tsc, PSNR di luar rentang, path still.
