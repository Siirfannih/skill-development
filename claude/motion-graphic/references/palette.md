# Palet: cara memilih dan memakai warna

Dibaca di gerbang brief (1) saat mengunci palet, dan di QA (9). Data hex ada di `palettes.json` (10 palet, diukur dari referensi yang Irfan setujui + token Jadisatu, 6 Nov).

## Logika

1. **Palet dikunci di brief, sebelum desain apa pun.** Urutan sumber:
   - konten Jadisatu → `jadisatu-gelap` atau `jadisatu-terang` (default; font Outfit + Inter);
   - konten lain → palet di `palettes.json` yang mood-nya cocok;
   - footage klien/orang lain → warna diambil dari footage (satu warna dominan scene + satu aksen).
   Setelah dikunci, model tidak memakai hex di luar palet. Alasan: tanpa palet terkunci, tiap grafik memilih warnanya sendiri dan hasilnya pelangi.
2. **Satu keluarga warna aksen yang dominan.** Keluarga terbesar ≥ 70 % piksel berwarna; maksimal 2 keluarga. Keluarga kedua hanya boleh datang dari footage, lampu, atau logo pihak ketiga. Alasan: semua referensi yang diukur punya keluarga dominan 74–100 %.
3. **Netral membawa frame, aksen hanya menandai.** Hitam, putih, abu mengisi sebagian besar layar; aksen biasanya ≤ 15 % area. Pengecualian: aksen sebagai dunia layar penuh (kartu atau panel warna) yang memang dirancang sebagai jeda.
4. **Turunan mengikuti aksen.** Glow, gradasi, bayangan berwarna, dan tint memakai hue aksen, tidak menambah warna baru.
5. **Teks berwarna aksen di latar gelap harus kontras ≥ 4,5 : 1.** Biru pekat di latar gelap tidak lolos; pakai versi terangnya (Jadisatu: `#6F8DFF`) atau putih.
6. **Aset pihak ketiga** (logo, UI produk asli) boleh di luar palet, asal kecil dan tidak dijadikan aksen.

## Cek
`python3 scripts/palette_check.py render.mp4` gagal bila keluarga > 2 atau keluarga dominan < 70 %. Warna kulit dan lampu footage ikut terhitung (hue 0–60°), jadi untuk talking head baca hasilnya bersama still.

## Memilih palet dari mood

| Palet | Cocok untuk |
|---|---|
| jadisatu-gelap / jadisatu-terang | semua konten Jadisatu |
| studio-merah | talking head tegas, editorial, studio gelap |
| hitam-kuning-hangat | cerita personal, reflektif |
| merah-menyala | edukasi dramatis, "rahasia", misteri |
| merah-kertas-dokumenter | cerita tokoh/perusahaan dengan foto arsip |
| putih-lavender | iklan produk ringan dan ramah |
| biru-gradasi-terang | finansial/produk bersih dan terang |
| hitam-navy | finansial premium, malam |
| deep-space-gradien | premium tech/AI, cerita reflektif: gradient multi-warna kontras jelas #0A2353 · #112C70 · #5B58EB · #BB63FF · #56E1E9 (+ #0133FE); adegan terang lilac #EADDEF → pink #FDCBF2 → #A087FD tanpa vignette gelap; transisi blok piksel bergradient. Hindari coklat + hitam (Irfan 11 Nov, ref Deep Space + koushik ssspin) |
| monokrom | minimal, puitis; penekanan lewat cahaya, bukan warna |
