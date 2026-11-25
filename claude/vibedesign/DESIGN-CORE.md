# DESIGN-CORE: pintu sesi produksi desain statis

Urutan menang: instruksiku di sesi → `projects/<proyek>/` (BRIEF, RESEP, DECISIONS) → profil merek (`DESIGN.md` proyek) → kartu cookbook yang dipilih → `guide/` → file ini. `LANTAI.md` tidak dikalahkan kartu atau gaya.

## 1. Alur: tiga gerbang, lalu bangun
1. **Pesan.** Isi `BRIEF.md` (dari `templates/BRIEF.md`): akar pesan carousel (satu kalimat), akar pesan per slide, copy persis, urutan baca 1→n, bukti visual (kenapa visual ini membuktikan pesan), aksi tiap karakter (kata kerja). Belum ada kode. Rujukan: `guide/pesan/GUIDE.md`.
2. **Racik.** Referensi baru dari aku dibedah dulu lewat `cookbook/BEDAH.md` sampai jadi kartu. Lalu per slide, cari 2–4 kartu lewat `cookbook/INDEX.md`; tulis tabel di `RESEP.md`:
   | Slide | Akar pesan | Fokus (urutan baca 1→n) | Kartu (ID.Tn) | Remix: dipertahankan → diganti | Peran huruf |
3. **Sketsa.** Preview kasar tiap slide (`engine/` → `preview_slide`), lalu uji juling: perkecil ke lebar ±300 px atau blur; mata harus jatuh ke elemen urutan 1, lalu 2, lalu 3. Tulis hasilnya di `TAHAP.md`.
4. **Bangun.** Satu file per slide di `projects/<proyek>/slides/` (kontrak di `templates/proyek/README.md`). Subagen boleh paralel, satu slide per subagen, dengan brief yang menyebut rute ini.
5. **Juri, lalu export.** Semua gerbang §3 lulus, lalu export 2× (2160 × 2700 untuk 4:5).

## 2. Pertimbangan yang paling sering menentukan (P; isi lengkap di `guide/`)
- **Satu fokus per slide**, urutan baca render = urutan BRIEF (HRK-01, HRK-02).
- **Maksimal 2 keluarga huruf**, masing-masing punya peran tertulis di RESEP; serif tidak diselipkan di antara sans tebal tanpa peran (TIP-01).
- **Elemen sekunder** (thumbnail, chip, teks blur, stiker) mengisi ruang kosong di tepi dan tidak bersaing dengan teks utama (KMP-01). Blok yang dibaca berurutan berjarak rapat dan seragam (KMP-02).
- **Teks lurus** kecuali lengkungnya mengikuti objek yang memberi alasan (TIP-03).
- **Pesan diperas sampai akar**; visual membuktikan akar itu (PSN-01). Tidak menambah copy di luar BRIEF, apalagi yang membocorkan punchline (PSN-02).
- **Karakter hanya bila berfungsi**: muncul di slide yang butuh, dengan kata kerja yang terbaca; pose yang terbaca aneh diganti (KRK-01).

## 3. Gerbang sebelum kirim
| Urut | Gerbang | Lulus bila |
|---|---|---|
| 1 | `juri/` teks (tabrakan, terpotong, ukuran minimum) | keluar 0 |
| 2 | `juri/` kontras (TKS-01) | keluar 0 |
| 3 | `juri/` hierarki (urutan baca vs BRIEF) | keluar 0; peringatan boleh dengan alasan di RESEP |
| 4 | `juri/` aset (manifest, KRK-02) | keluar 0 |
| 5 | Lembar sanding semua slide berdampingan (≤ 960 px) | dilihat; temuan ditulis di `TAHAP.md` |

Perintah persisnya ada di `juri/README.md`. Gerbang yang gagal diperbaiki di penyebabnya; jangan mengedit `juri/` di sesi produksi. Selama juri untuk satu gerbang belum ada, gerbang itu dicek dengan still + alasan di `TAHAP.md`, dan statusnya ditulis jujur sebagai "dicek mata", bukan "lulus juri".

## 4. Batas mutlak
- Membangun tanpa BRIEF, atau mengirim slide yang belum kamu lihat hasil render-nya.
- Memakai maskot, logo, atau karakter milik pihak lain, termasuk "versi mirip" (KRK-02).
- Font emoji berwarna di render headless (tidak ter-render); ikon emoji digambar sebagai SVG.
- Menulis ulang slide dari nol saat aku hanya merevisi sebagian.
