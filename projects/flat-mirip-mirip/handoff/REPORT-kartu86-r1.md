# Laporan kartu 86 · r1

Kartu Tesla Roadster Lumitris selesai dari file sumber lokal, dengan bukti piksel, ukuran ritme/loudness, dan transkrip ASR. Perbandingan dengan kartu 46 membedakan proporsi dan hasil alat masing-masing referensi.

## File yang dibuat

Semua path di bawah relatif terhadap root repo; total 12 file.

- [Kartu 86](../../../claude/motion-graphic/pustaka/kartu/86-lumitris-tesla-montase.md).
- [Contact sheet](../../../claude/motion-graphic/guide/referensi/sheets/86-lumitris-tesla-montase.jpg): 29 sampel, satu tiap 2 dtk nominal, 1920×1416.
- [Angka ukur, transkrip, dan perintah](../../../claude/motion-graphic/guide/referensi/ukuran/86-lumitris-tesla-montase.md).
- Delapan frame penuh di `claude/motion-graphic/guide/referensi/sheets/keyframes/`:
  - `86-k1-kata-kecil-footage.jpg` — f384, 16,017 dtk.
  - `86-k2-kartu-terang.jpg` — f182, 7,592 dtk.
  - `86-k3-kata-besar-start.jpg` — f606, 25,277 dtk.
  - `86-k4-grid-kolase.jpg` — f539, 22,483 dtk.
  - `86-k5-invert-grid-logo.jpg` — f139, 5,798 dtk.
  - `86-k6-kotak-abu-kata.jpg` — f326, 13,598 dtk.
  - `86-k7-ui-dashboard.jpg` — f1247, 52,015 dtk.
  - `86-k8-penutup.jpg` — f1343, 56,019 dtk.
- Laporan ini: `projects/flat-mirip-mirip/handoff/REPORT-kartu86-r1.md`.

## Angka utama

H = tinggi frame, W = lebar frame. Bbox, sampel warna, dan asal tiap angka ada di file ukuran.

| Ukuran | Hasil | Bukti |
|---|---|---|
| Sumber | 1280×720, 23,974 fps, container 58,046708 dtk | `ffprobe` |
| Ritme penuh | 53 deteksi cut, 54,8/menit, shot median 0,501 dtk; 78 event visual/menit | `pace_read`, denominator termasuk penutup |
| Mix | −14,2 LUFS; true peak −0,3 dBTP; LRA 4,1 LU | `ffmpeg ebur128` |
| Teks kecil | x-height 3,6–3,9 % H; kapital/ascender sekitar 5 % H; y sekitar 49–50 % H | k1, k2, k4–k6 |
| Celah antarkata | footage 6,25–8,28 % W; kolase 9,30–10,63 % W; kartu terang 4,38 % W | k1/k4/k2 |
| “start” | x-height 8,47 % H; ascender 10,42 % H; 2,26× x-height kecil | k3/k1 |
| Panel abu | 53,36 % W × 35,14 % H | k6 |
| Kartu terang | median patch tengah `#ECECEC`, pojok `#BABABA`; bintik/debu terlihat | k2 |
| Lockup penutup | 26,80 % W × 12,64 % H | k8 |

## Temuan yang mengubah perkiraan awal

- Tinggi sekitar 5,1 % H cocok untuk kapital/ascender; x-height kecil sekitar 3,8 % H. Keduanya dipisahkan di kartu.
- Kotak abu yang jelas berada pada “Last week”, 13,598 dtk. Frame 12,514 dtk tidak menunjukkan kotak yang jelas; bidang di belakang “till” pada 25,486 dtk mengikuti bangunan. Frame k6 memakai panel yang terverifikasi.
- Bagian 47–48 dtk menunjukkan pergantian gambar/crop uang dengan sela deteksi sekitar 0,083–0,167 dtk pada rentetan terpadat. Jenis flash cahaya tersendiri Tidak terbedah.
- Penekanan “start” jauh lebih kecil daripada kata raksasa kartu 46: sekitar 2,3× kata kecil, dibanding 4–15× yang dicatat kartu 46. Angka kartu 46 disalin dari kartu tersebut, tidak diukur ulang.

## Hal yang tidak terbedah

Nama font/file font dan bobot numerik; preset grain; kurva easing; konstruksi/jumlah layer asal; pemisahan kamera edit dari kamera klip; asal software/footage dan teknik mobil terbang; keaslian klaim narasi; jenis/jumlah/sinkron SFX; genre/instrumen/BPM musik aktual, level dan perubahan per stem; ketepatan setiap fonem transkrip ASR.

Transkripsi memakai faster-whisper-small yang sudah ada di cache lokal, CPU int8. Decoder PyAV langsung bermasalah; input array PCM dari ffmpeg berhasil tanpa perubahan dependensi. Rentang 100–140 bpm dari `pace_read` adalah saran, sehingga tidak dinyatakan sebagai BPM sumber.

## Verifikasi

- `python3 tools/sumber_cek.py` dari root: **0 tanda sumber, bersih**.
- Semua bagian template, Proporsi terukur, perbandingan 46, dan rujukan kartu diperiksa: **lulus**.
- Delapan JPEG lengkap k1–k8 pada 1280×720; contact sheet 1920×1416, di bawah batas lebar 2400: **lulus**.
- PETA, SKILL, LANTAI, kartu lain, dan dokumen proyek lain tidak diedit oleh tugas ini. Tidak ada commit, push, atau render video. Laporan ini satu-satunya tulisan tugas di folder proyek.
