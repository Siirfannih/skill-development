# Bedah Referensi · reverse engineering jadi REF-SPEC

Wajib dijalankan setiap kali user membawa referensi (video, gambar, link), **sebelum** storyboard dibuat atau di-upgrade. Referensi adalah desain yang sudah dipilih user: sumber kebenaran seleranya. Tujuan bedah: mengubahnya jadi spesifikasi **terukur dan bisa diterapkan ulang** (`REF-SPEC.md`), dengan **alasan** untuk setiap pilihan. Yang dipindahkan adalah alasan dan sistemnya; bentuknya dipakai bila alasan itu berlaku di proyek ini.

Alat: `python3 ../motion-graphic/scripts/ref_spec.py <video|folder still>` mengekstrak still per adegan, palet, rentang luma, saturasi, anatomi gradien kasar, luas objek, ke `REF-SPEC.json` + kerangka `REF-SPEC.md`. Angka dari skrip adalah bahan; **alasannya diisi dengan mata**. Bukti tetap wajib: contact sheet + timestamp untuk setiap klaim (lihat sendiri, jangan menebak dari nama file).

Sebelum mulai, petakan **peran tiap referensi**: apa yang dipelajari dari masing-masing. Referensi yang digabung tanpa peran saling bertabrakan (*style bleeding*).

**Kulit vs mekanik, versi 2.** Kulit dari referensi pilihan user (huruf kedua, gradien, kilau, bayangan) **tidak dilarang**. Ia diadopsi bila alasannya berlaku di proyek ini, dan alasannya ditulis di REF-SPEC. Ia ditolak bila hanya disalin karena cantik (tak ada alasan yang bisa diucapkan) atau bila alasannya tidak berlaku (mis. gelap = babak masalah, tetapi proyek ini tidak punya babak masalah). Kata gaya di brief ("Apple", "premium", "kedalaman") diterjemahkan dari REF-SPEC bila ada referensi; tanpa referensi, dari tabel `../motion-graphic/references/dunia-visual.md`.

## Lima lapis bedah

### Lapis 1 · State machine naratif (alasan di balik warna dan latar)
Jangan hanya mencatat "latar biru / putih / gelap". Petakan **kapan dan kenapa** suasana visual berubah, dan ukur tiap state: hex + peran (latar, tinta, aksen), anatomi gradien (warna awal → akhir, arah, letak zona pekat, % luas), rentang luma, saturasi median dan p95.
- Pemicu babak: mis. gelap pekat hanya di babak masalah; masuk babak solusi, latar flip ke terang dengan satu zona warna tegas.
- Aturan untuk video baru: latar berganti saat argumen berpindah (Masalah → Titik balik → Solusi → Bukti), bukan selang-seling tiap slide.

### Lapis 2 · Audit fungsi objek dan material
Untuk setiap objek menonjol (bola, garis vektor, pil, kartu, kursor, tekstur), catat jenis material (bayangan: offset, blur, opasitas; arah cahaya; kilau; satu atau banyak sistem) **dan** jawab uji: "kalau objek ini dihapus, apakah alur atau transisinya putus?"
- **Mekanisme**: cara objek bekerja (garis yang menuntun kamera, toggle sebelum-sesudah, split aksi-reaksi). Diekstrak.
- **Makna objek**: apa yang diwakilinya (pil = entitas di jaringan). Bila alasannya berlaku, bentuknya sah dipakai.
- **Objek tanpa makna** (bola, gelombang, ikon generik yang bila dihapus pesan tidak berkurang) tidak dibawa.

### Lapis 3 · Kontrak dominasi per frame
Klasifikasikan setiap shot ke **satu** mode fokus dan satu ukuran shot (macro/close/medium/wide); ukur luas objek fokus (% frame), apakah bleed keluar tepi, margin, grid, ruang kosong, ukuran teks UI di 1080:
- **TYPO_HERO**: tipografi kinetik 100 % visualnya. Catat keluarga, bobot, rasio ukuran terhadap tinggi frame, kapital/tracking; huruf kedua bila ada: perannya dan seberapa sering.
- **UI_PROOF**: antarmuka/produk/data nyata jadi fokus penuh, dipandu kursor atau macro zoom.
- **SYSTEM_FLOW**: hubungan antar-elemen jadi panggung utama.

### Lapis 4 · Rantai sebab-akibat kamera dan transisi
Bagaimana akhir shot A secara fisik melahirkan shot B: elemen jangkar yang bertahan melintasi potongan; rasio hold vs motion burst (6-12 frame); tipe transisi dan cara masuk teks, dengan timestamp.

### Lapis 5 · Peta upgrade ke storyboard asal
Petakan setiap beat ke satu strategi konkret: beat abstrak → tipografi kinetik dan state shift; beat sistem → UI nyata, progressive staging, atau node flow, bukan kartu dummy.

## Templat `REF-SPEC.md` (wajib terisi sebelum storyboard)

Tiap bidang: **nilai terukur**, **Alasan** (makna yang dibawa; satu kalimat), **Toleransi** (dipakai `banding.py`).

```markdown
# REF-SPEC · <proyek>

## 0. Peran tiap referensi
- [referensi]: dipelajari untuk ... · tidak dipakai untuk ...
- Aturan resolusi konflik: ...

## 1. Warna per jenis frame (hero teks / UI / sistem; gelap / terang)
| Jenis | latar | tinta | aksen | gradien (awal→akhir, arah, zona pekat, % luas) | luma min-maks | saturasi median / p95 |
- Alasan: ...
- Toleransi: luma ±..., saturasi p95 ±..., ΔE palet ≤ ...

## 2. Huruf
- Utama: keluarga, bobot, rasio tinggi huruf/tinggi frame, kapital, tracking. Alasan: ... Toleransi: ...
- Kedua (bila ada): keluarga, **peran**, **frekuensi** (kemunculan per frame / per video). Alasan: ...

## 2a. Porsi teks (diisi dengan mata; skrip tidak menebak)
- % frame berteks: ... · kapan teks muncul (timestamp: teks itu subjeknya / penanda babak / angka / CTA) · peran dan ukuran tiap kemunculan (px @1080) · sisanya dibawa VO + visual. Alasan: ... Toleransi: % frame berteks ±... Build memberi tiap beat mode TEKS | VISUAL | MENYATU sesuai ini (NEGATIF 6).

## 3. Layout, ukuran shot & bleed
- Margin, grid, ruang kosong. Alasan: ... Toleransi: ...
- **Ukuran shot & bleed**: distribusi macro / close / medium / wide (% durasi atau jumlah shot); luas objek fokus per jenis shot (% lebar dan tinggi frame); apakah objek bleed keluar tepi (bubble raksasa terpotong, panel terpotong, close-up produk ekstrem) dan seberapa sering; ukuran teks UI di 1080 (px). Alasan: ... Toleransi: distribusi ±... , luas fokus ±... Build wajib mencocokkan distribusi ini (storyboard memberi tiap beat jenis shot); semua frame medium di tengah dengan skala seragam = presentasi slide.

- **Fokus raksasa per beat**: objek apa yang raksasa di tiap beat/jenis frame (% tinggi frame) dan apa yang mengecil di sekitarnya. Satu per beat; beberapa elemen sama berat = menyimpang. Alasan: ...
- **Dinamika kejenuhan**: di beat mana latar penuh jenuh (kunci cerita) dan mana pastel/netral, dan kenapa (klimaks, pergantian babak). Model cenderung hanya pastel. Alasan: ...

## 4. Material
- Bayangan (offset, blur, opasitas), arah cahaya, kilau, kaca/blur; jumlah sistem (harus 1 per jenis benda). Alasan: ... Toleransi: ...

## 5. Gerak
- Tipe transisi, kamera, cara masuk teks, hold vs burst, dengan timestamp. Alasan: ...

## 6. State machine babak
- State A (masalah) / B (solusi) / C (bukti): palet, material, pemicu naratif. Aturan flip: ...

## 7. Dominance contract & upgrade mapping (storyboard lama → baru)
- Scene / VO: ... · Mode fokus (SATU): ... · Strategi upgrade: ... · Causality link ke scene berikutnya: ...

## 8. Diadopsi / ditolak
- Bentuk referensi yang diadopsi: alasan berlaku di proyek ini karena ...
- Ditolak: tidak ada alasan yang bisa diucapkan / alasan tidak berlaku karena ...
```

Tanpa referensi: isi REF-SPEC dari profil merek + tema, dengan alasan yang sama.

## Style frame dan 5 uji biner

Gerbang 3 style frame (per lapis L0-L3, bandingkan berdampingan, `banding.py`) dan 5 uji biner per frame ditulis satu kali, di `../motion-graphic/references/dunia-visual.md` §7-8. REF-SPEC di atas adalah patokan yang dipakai gerbang itu; hasil ujinya dicatat di `REF-SPEC.md` atau `STORYBOARD.md`.
