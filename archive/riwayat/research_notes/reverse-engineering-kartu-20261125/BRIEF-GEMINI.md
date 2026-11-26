# Brief: Reverse-engineering 80+ kartu editing menjadi skill bertema

Di session ini kita bedah semua kartu editing di skill-development dan turunkan jadi beberapa skill bertema. Pakai Orchestrate (neo) untuk membagi kerja, tapi ikuti urutan fase di bawah: jangan lompat fase.

## 1. Masalah yang mau diselesaikan

Model yang memakai skill-development masih menghasilkan video dan storyboard yang terasa AI slop: layout salah, desain kurang bagus, tidak terasa seperti editing manusia di After Effects. Kita punya 44 kartu ringkas dan 97 kartu vault yang sudah diaudit, tapi datanya menunjukkan kartu hampir tidak dipakai: dari 41 sesi video di PC, hanya 2 sesi yang membuka satu kartu pun. Yang memengaruhi model hanya file yang dimuat di awal.

Rencananya: kartu dikelompokkan per tema/gaya, lalu tiap kelompok diturunkan jadi skill bertema (misalnya gaya Apple, documentary storytelling). Model memilih tema dengan bertanya ke user. Isi skill adalah **panduan cara berpikir**, bukan aturan kaku atau template: model tetap berkreasi menyesuaikan konteks, permintaan, referensi (kalau ada), dan ide user. Style frame bisa datang dari user atau dari AI.

## 2. Bahan (repo `~/wonder/repos/skill-development`)

- Kartu ringkas: `claude/motion-graphic/cookbook/0[1-6]-*/*.md` (44)
- Kartu lengkap: `claude/motion-graphic/cookbook/_vault/**/*.md` (97, ±18 KB per kartu)
- Keyframe referensi: `claude/motion-graphic/guide/referensi/sheets/keyframes/` (682 gambar; nama file diawali nomor, tapi belum dipastikan nomor itu sama dengan ID kartu, jadi cocokkan lewat rujukan di kartu dan `guide/referensi/*.md` sebelum dipakai sebagai bukti)
- Contoh gagal: `claude/motion-graphic/cookbook/contoh-gagal/` (20 gambar)
- Katalog slop: `claude/motion-graphic/references/slop-catalog.md`
- Koreksi saya per proyek: `projects/*/DECISIONS.md` (hanya baris koreksi soal visual, layout, gaya)
- Konteks tambahan: `claude/motion-graphic/MOTION-CORE.md`, `LANTAI.md`, dan audit di `~/KhususagentAG/case-study/audit-skill-20261125/` (`D-audit.md`, `E-slop.md`)

## 3. Batasan

- Jangan ubah apa pun di repo. Semua hasil ditulis ke `~/KhususagentAG/reverse-engineering-kartu/` (folder ini).
- Jangan render, install, atau menjalankan ffmpeg di Mac (Mac gampang kehabisan RAM). Kalau benar-benar perlu, jalankan lewat `ssh pc-server`.
- Setiap klaim wajib ada buktinya: ID kartu + path keyframe/contoh gagal yang benar-benar dibuka. Klaim soal gerak dari still atau kartu berlabel `dilihat_bergerak: tidak` ditandai "belum dilihat bergerak".
- Tidak ada generalisasi tanpa minimal 2 kartu pendukung. Yang cuma muncul di 1 kartu masuk catatan, bukan prinsip.
- Jangan menyalin layout satu referensi sebagai template. Yang diturunkan adalah alasan di balik keputusan (kenapa teks di situ, kenapa ukurannya segitu, kapan boleh dilanggar).

## 4. Fase kerja (Orchestrate per fase, cek dulu sebelum fase berikutnya)

**F1 · Inventaris.** Satu agen mendaftar semua kartu, keyframe, contoh gagal, dan baris koreksi DECISIONS ke `F1-inventaris.csv` (id, judul, pack, path ringkas, path vault, jumlah keyframe, sumber referensi). Catat kartu ganda, kartu tanpa keyframe, dan anomali.

**F2 · Pengelompokan.** Kelompokkan kartu berdasarkan kemiripan gaya desain dan jenis konten, dengan melihat keyframe-nya, bukan hanya teks. Target 5–8 tema. Tiap kartu satu tema utama (boleh tema kedua). Tulis `F2-tema.md`: nama tema, 1 kalimat identitasnya, daftar kartu, 3 keyframe paling mewakili, dan alasan pengelompokan. Kartu yang tidak cocok ke mana pun dicatat terpisah.

**F3 · Belajar lalu bedah per tema (paralel, satu agen per tema).** Belajar dulu sebelum menulis aturan: buka keyframe dan kartu vault tiap kartu di tema itu, lalu catat jejak belajarnya di `F3-<tema>-belajar.md` per kartu dengan format **kasus (ID + keyframe) → yang terlihat → kenapa ini bekerja → prinsip yang bisa dipindah ke konten lain → cara menerapkannya di konteks baru**. Ingat, session lain tidak akan mewarisi pemahamanmu, hanya tulisanmu: tulis alasan yang bisa dieksekusi (angka, posisi, kondisi), bukan kesan ("terasa elegan"). Setelah itu tulis `F3-<tema>.md`:
- Identitas visual: tipografi (keluarga, skala, ketebalan, kapitalisasi), warna, layout dan komposisi (letak teks terhadap subjek, ruang kosong, grid, kedalaman), gerak (tempo, easing, transisi), ritme cut, audio bila ada di kartu.
- Keputusan inti dalam format: **keputusan · kapan dipakai · kenapa · kapan dilanggar · bukti (ID kartu + keyframe)**.
- Anti-contoh: tanda slop yang paling mungkin muncul saat model meniru tema ini (rujuk `slop-catalog.md` dan `contoh-gagal/`).
- Pertanyaan pembeda: 2–3 pertanyaan ke user yang menentukan tema ini cocok atau tidak.

**F4 · Inti lintas tema.** Prinsip yang muncul di 3 tema atau lebih (keterbacaan, kedekatan teks ke subjek, hierarki, ruang kosong, anti-slop) dipindah ke satu inti bersama `F4-inti.md`, tidak diulang di tiap tema. Bandingkan dengan `LANTAI.md`; jangan menulis ulang yang sudah ada di sana, cukup rujuk ID-nya.

**F5 · Router tema dan protokol bertanya.** Tulis `F5-router.md`:
- Cara model memilih tema dari brief, naskah, referensi user, atau tanpa referensi.
- Protokol bertanya: maksimal 3 pertanyaan, tiap pertanyaan dengan pilihan + rekomendasi. Saat user tanpa referensi, tawarkan 2–3 tema dengan keyframe contoh (tunjukkan, jangan bertanya abstrak).
- Kapan tema boleh dicampur dan kapan tidak.
- Satu bagian prompt engineering: pola pertanyaan yang baik vs buruk, dengan contoh untuk konten saya (Jadisatu, siirfan).

**F6 · Cek silang.** Agen terpisah (bukan penulis F3–F5) membuka ulang setiap bukti yang dikutip dan menandai: cocok / tidak cocok / tidak ditemukan. Prinsip yang buktinya gagal dihapus atau diturunkan jadi catatan. Lalu **uji transfer**: agen baru yang hanya membaca draf F3–F5 (tanpa melihat kartu) menjelaskan rancangan 2 frame untuk brief baru di luar kartu; agen pemeriksa menilai apakah rancangan itu mengikuti alasan yang ditulis atau kembali ke pola slop. Prinsip yang tidak bisa dipakai tanpa melihat kartunya ditulis ulang. Hasil: `F6-cek-silang.md` dengan jumlah prinsip lulus/gagal per tema dan hasil uji transfer.

**F7 · Draf skill + rencana uji.** Di `draf-skill/`:
- Satu skill router + inti (`SKILL.md` ±2.000 token) yang memuat F4, F5, dan lingkaran kerja storyboard **render still → banding dengan keyframe tema → perbaiki**.
- Satu file per tema (±1.500–2.500 token), dibuka hanya setelah tema dipilih. Tiap file memuat 2 contoh kerja (sebelum → sesudah, dengan alasan) dan menunjuk 2–3 keyframe yang wajib dibuka saat mendesain storyboard tema itu.
- Frontmatter: `name` kebab-case, `description` satu kalimat apa + kapan.
- `RENCANA-UJI.md`: uji A/B dengan brief yang sama, 2–3 beat storyboard, skill lama vs draf baru; saya menilai tanpa tahu mana yang mana; ditambah skor `slop-catalog`. Draf hanya dipasang kalau menang.

## 5. Selesai bila

- F1–F7 ada di folder ini, F6 menunjukkan setiap prinsip yang tersisa punya bukti yang cocok.
- Ringkasan akhir untuk saya (maks 1 halaman): daftar tema + jumlah kartu, 5 prinsip inti terpenting, prinsip yang dibuang di cek silang beserta alasannya, dan apa yang belum bisa dibuktikan.
- Pertanyaan ke saya hanya bila keputusan itu mengubah hasil besar; sertakan pilihan dan rekomendasi.
