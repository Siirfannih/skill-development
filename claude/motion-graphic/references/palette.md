# Palet: cara memilih dan memakai warna

Dibaca di gerbang brief (1) saat mengunci palet, dan di QA (9). Data hex ada di `palettes.json` (10 palet, diukur dari referensi yang user setujui + token Jadisatu).

## Logika

1. **Palet dikunci di brief, sebelum desain apa pun.** Urutan sumber:
   - referensi user (REF-SPEC) dan brief → warna diambil dari sana;
   - profil merek bila ada (contoh: Jadisatu → `jadisatu-gelap`/`jadisatu-terang`);
   - footage klien/orang lain → warna dari footage (satu warna dominan scene + satu aksen);
   - tidak ada semua itu → `palettes.json` sebagai contoh yang mood-nya cocok.
   Alasan: tanpa palet terkunci, tiap grafik memilih warnanya sendiri dan hasilnya pelangi.
2. **Satu keluarga warna aksen yang dominan.** Keluarga terbesar ≥ 70 % piksel berwarna; maksimal 2 keluarga. Keluarga kedua hanya boleh datang dari footage, lampu, atau logo pihak ketiga. Alasan: semua referensi yang diukur punya keluarga dominan 74–100 %.
3. **Netral membawa frame, aksen hanya menandai.** Hitam, putih, abu mengisi sebagian besar layar; aksen biasanya ≤ 15 % area. Pengecualian: aksen sebagai dunia layar penuh (kartu atau panel warna) yang memang dirancang sebagai jeda.
4. **Turunan mengikuti aksen.** Tint dan bayangan kontak memakai hue aksen, tidak menambah warna baru. Gradasi dan glow sah bila satu keluarga hue dan beralasan (NEGATIF 2); halo yang menurunkan kontras teks tidak.
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
| hitam-navy | finansial serius, malam |
| (semua palet) | Putih sebagai latar utama; gradient biru atau hitam yang berkomitmen (zona pekat tegas, satu keluarga hue, mengikuti babak cerita; atau sesuai REF-SPEC), bukan noda radial/blob blur acak atau satu nada ragu-ragu; tanpa vignette gelap di latar terang; tanpa coklat + hitam |
| monokrom | minimal, puitis; penekanan lewat cahaya, bukan warna |
