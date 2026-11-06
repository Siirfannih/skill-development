# 07 Baikov / Shapes: format product film & onboarding

Disalin dari `Siirfannih/jadisatu-skills` `skills/jadisatu-motion/references/BAIKOV.md` (bedah seluruh 2010 frame, Okt 2026); bagian IHSG di sana khusus proyek lain. Irfan 7 Nov: format ini "lebih matang, lebih menarik dari segi visual", dipakai untuk iklan & onboarding Workspace.

Ukur 7 Nov (`pace_read.py`): 67 dtk, 16:9 736×414, 13 cut/menit, event visual 49/menit, kategori `energi`; informasi dibawa teks + UI (bisa ditonton tanpa suara).

Pembuka (dicek frame 0–3 dtk, 7 Nov): **"What makes your company unique?"** dibangun kata per kata (What → makes → your → company → unique?), foto/shape disisipkan sebagai tanda baca, lalu kalimat ditarik kecil. Hook ini **pertanyaan yang dibalikkan ke penonton**, bukan kata acak: penonton dipancing berpikir, lalu jawabannya (Mission, Rituals, Feedback, Onboarding) muncul sebagai kata kunci di antara shape (Irfan 7 Nov).

Alur: pertanyaan ke penonton → kata kunci jawaban di antara shape → roda fitur (satu aktif) → UI lahir bertahap → fokus satu bagian UI → panel asisten/chat → workflow & formulir → kartu angka → rekomendasi → Done → logo, objek pembuka kembali.

## Katalog eksekusi

### BK01 · Kalimat besar menjadi objek kecil

Sumberf1–60. Kata pertama sangat besar, lalu keseluruhan grup mengecil dan berpindah saat kata/foto bertambah. Jangan hanya mengubah font-size kata baru. Replikasi: susun grup akhir dengan transformOrigin yang konsisten; pada setiap kata, scale/translate induk menuju komposisi berikutnya dengan ease-out6–12 frame. Kata baru naik dari bawah selama8–12 frame, aksen warna settle ke tinta setelah7–9 frame. Rasio ukuran sumber sekitar8× dari pembuka ke kalimat selesai; untuk video edukasi gunakan rasio yang tetap terbaca di ponsel. Rasio itu pilihan kamera, bukan jumlah font.

### BK02 · Teks sebagai pusat, visual sebagai struktur

Mission3.13–4.0; Feedback5.1–6.6. Bentuk/foto mengisi40–70%tinggi dan terpotong tepi; kata pusat jauh lebih kecil. Gunakan satu lubang negatif yang sengaja dijaga. Tiga bidang bukan tiga pesan: seluruh shape merupakan satu visual yang menunjuk konsep sama. Pada IHSG, gunakan kelompok tokoh/koneksi, bukti kepemilikan atau struktur paket indeks; jangan menempelkan shape acak di bawah judul.

### BK03 · Shape mempunyai fungsi

Rituals menggunakan ring; Onboarding menggunakan tangga; kartu statistik berubah menjadi daftar aksi. Bentuk harus bisa dijelaskan dalam satu kata kerja: mengelompokkan, membatasi, menghubungkan, memilih, mengeluarkan. Warna berubah bersama dunia/aksi. Pindah hue setiap adegan bukan kewajiban jika objek sedang menjalankan kesinambungan.

### BK04 · Huruf mengendarai bentuk

Sumber6.7–7.47: suku kata menempel pada bar naik, lalu menyatu ketika bar sejajar. Replikasi: posisi huruf adalah turunan posisi bar, bukan animasi terpisah yang kebetulan lewat. Susunan selesai harus dibaca sebelum keluar. Pecah kata hanya bila bunyinya tetap jelas; jangan membagi singkatan MSCI/OJK menjadi suku kata palsu.

### BK05 · Wipe dari benda di dalam cerita

Sumber12–13;41.5–42.7;57.6–58.4. Pakai shape/token yang sudah ada sebagai masker yang membesar melewati tepi, buka adegan berikutnya setelah tepi terlewati.8–20 frame untuk aksen cepat, lebih panjang bila perubahan skala adalah isi cerita. Tidak memerlukan pemodelan3D: nested SVG/CSS path, mask dan transform induk cukup.

### BK06 · Pemilihan terlihat melalui keadaan

Roda18.7–22.3: pilihan aktif putih, lainnya tinta; satu squash sekitar0.8× sebagai tekanan singkat. Replikasi: kurva posisi2D/rotasi tiap baris berdasarkan jarak dari pusat. Satu item aktif saja. Untuk mandat investor, gunakan pilihan kelompok pasar sebagai konsep; jangan mengarang layar aplikasi resmi.

### BK07 · UI lahir bertahap

24.2–25.0: kerangka→sidebar→widget→isi. Pilih urutan berdasarkan tugas pengguna, bukan semua item stagger seragam. UI yang ditampilkan harus punya tindakan, kondisi awal, hasil dan objek fokus. Ketika UI menjadi subjek, tidak ada overlay paragraf kedua.

### BK08 · Perhatian pada satu bagian UI

27–36;42–49: highlight satu elemen, kamera mendekat, baru tampil isi; sisanya tetap konteks. Gunakan12 frame settle, hold membaca, lalu push ke hasil. Jangan menambahkan blur besar pada teks target. Blur hanya untuk periferal/kecepatan/kedalaman yang berguna.

### BK09 · Counter mempunyai benda dan aksi

53.2–57.5: angka di kartu, titik/grafik mendukung makna, kartu tengah membuka rekomendasi. Angka tanpa pembanding/penjelasan mudah menjadi dekorasi. Untuk data pasar, counter tidak boleh menciptakan lintasan harga historis fiktif; tampilkan angka faktual sebagai reveal atau beri diagram skematis tanpa angka rekaan.

### BK10 · Kembali ke objek lama

60.3–64.6: motif/avatar/foto pembuka kembali menjadi penutup. Replikasi: pakai assetID yang sama, bukan ikon baru yang mirip. Tutup satu persoalan yang sudah ditunjukkan; video IHSG berakhir pada bukti dan tenggat, bukan klaim masalah selesai.

## Tipografi, warna, dan batas pemindahan

- Terlihat satu keluarga grotesk dominan dengan hierarki skala, serta serif italic kecil pada eyebrow dashboard. Font asli tidak teridentifikasi pasti dari raster. Produksi memakai substitusi berizin; jangan menyebut font substitusi identik dengan sumber.
- Bidang awal hangat putih; ring kuning, shape primer biru/merah/hijau; roda fitur biru penuh; workflow kuning/putih; akhir putih. Sampling16-bin mencatat mode sekitar(56,88,248)pada20s dan(248,200,88)pada40s. Itu ringkasan piksel terkompresi, bukan token warna asli.
- Dashboard memang memperlihatkan gradient/cahaya, sehingga larangan “semua gradient dilarang karena Baikov” salah. Bedakan bidang shape flat dari cahaya pada UI.
- Bukan alasan menambah banyak font atau kartu web. Copy yang harus dipahami tetap sedikit; kekayaan datang dari gambar, framing, bentuk yang bermakna dan aksi.
- Mix terukur−14.61LUFS,TP−0.84dBTP,LRA4.8LU; ini konteks referensi, bukan target wajib untuk video bernarasi lain.
