# F6 · Penilaian uji transfer F3b (editorial-metaphor-canvas + sound + KT)

Penilai: Claude (Opus), bukan penulis F3–F5. Yang dinilai: `scratch/F6-uji-transfer-audio-kt-output.md` (agen Sonnet, hanya membaca F4, F5, F3-editorial, F3b-editorial, LANTAI). Pembanding yang dibuka langsung: keyframe `88-k6-lingkaran-satu-dial.jpg`, `80-k1-kinetik-gelap.jpg`.

## Yang terlihat di referensi
- `88-k6`: kanvas putih-lavender, satu lingkaran biru solid (±19 % W) di dalam halo biru muda lembut (±60 % W), teks hanya 2 kata ("one dial,") serif, kata aktif hitam, kata berikut abu. Total 3 elemen. Halo lembut ini glow yang bermakna (radius pengaruh "dial"), bukan dekorasi.
- `80-k1`: kanvas hitam, "Ada ——— jarak" sans bold putih, garis ukur tipis dengan tick ujung, "antara" kecil abu di bawah garis. Relasi gagasan = geometri. 4 elemen, semuanya bagian kalimat.

## Putusan per frame

**Frame 1 (hook, bel kasir): LULUS DENGAN CATATAN.**
- Ikut alasan: satu objek metafora harfiah (bel tak berbunyi = toko sepi) dengan ruang kosong ±75 %, teks menempel di atas objek, aksen satu titik di tombol bel (fungsi cerita, bukan hiasan), penekanan lewat nilai terang redup→putih (mekanisme yang sama dengan `88-k6`), skala dua kutub 104 px vs 250 px (2,4×). Alasan ditulis dengan kata sendiri, bukan sekadar kode.
- Catatan: 5 kelompok elemen (bel, garis meja, titik, 3 kotak posting, teks) vs 2–4 di referensi. Garis meja dan 3 kotak bisa jadi satu kesatuan atau dibuang; uji "editor senior": tumpukan kotak + garis meja mulai terasa ilustrasi penjelas berlebih.
- Benar menggeser jendela waktu (VO 10 kata = 4,3 dtk) daripada mempercepat VO (E23).
- Sound: keputusan "bel tidak berbunyi" adalah pikiran creator yang tepat (bunyi menjawab pertanyaan yang harus menggantung). Satu cue foley untuk tumpukan (satu objek satu cue). Tidak ada spam.

**Frame 2 (titik balik, gelembung kabur→tajam): LULUS.**
- Potong polaritas gelap→krem sebagai tanda pergantian pikiran, tanpa whoosh (sesuai S-A12). Blur→tajam dipakai sebagai makna ("jelas"), bukan gaya masuk. Satu hero motion (gelembung menajam) dengan satu hantaman Tingkat A, didahului vakum musik. "sering." memudar di tempat = penekanan tanpa memindah posisi.
- Catatan kecil: gema kontur 3 lapis saat "sering" adalah gerak kedua di adegan yang sama; masih sah karena berurutan, bukan bersamaan.

## Perbandingan dengan uji F6B (apple-saas-ui, talking-head)
Uji F3b lebih berhasil (2 lulus vs 1 gagal + 3 catatan di F6B). Dua kemungkinan penyebab, belum bisa dipisahkan: (1) tema editorial memang lebih mudah ditransfer lewat teks karena elemennya sedikit; (2) agen uji berbeda (Sonnet vs Gemini). Bukan bukti bahwa draf F3b lebih baik.

## Hambatan yang valid dan harus diselesaikan di F7 (dari 15 butir agen)
1. Jendela waktu vs jumlah kata: aturan eksplisit "VO tidak dipercepat; jendela beat yang menyesuaikan".
2. Rumus durasi baca dilabeli A8 padahal tidak ada di LANTAI A8 → di F7 tulis sebagai pedoman dengan jalan keluar: bila tuturan > 2,5 kata/dtk, gabung jadi frasa 2–3 kata, bukan memaksa 0,8 dtk per kata.
3. "% H" dari video 16:9 ambigu di 9:16 → F7 menulis ukuran dalam px @1080 lebar (9:16) atau tinggi (16:9) plus rasio antar-tingkat, bukan % H kartu.
4. Aksen per video vs per babak → satu keluarga aksen per video, satu kemunculan aktif per babak.
5. Vakum dBFS vs S-A3 vs bed LUFS → vakum hanya stem musik; bed ambien tetap; tulis acuannya.
6. Tick wajib/opsional → bentrok LANTAI E24 vs kartu bergerak (93, 97, 98 senyap). Dicatat sebagai keputusan Irfan; default ikut E24 (mode dipilih per proyek, `accent-only` untuk editorial/dokumenter).
7. Blur-in vs blur bermakna → "blur sebagai makna (kabur→jelas, fokus berpindah) boleh; blur sebagai cara masuk bawaan tidak".
8. Hero motion vs drift kamera → drift kamera lambat tidak dihitung hero motion.
9. Kode S-*/TKS-* tidak terbaca tanpa file → F7 menulis isinya dalam satu frasa, bukan kode saja.
