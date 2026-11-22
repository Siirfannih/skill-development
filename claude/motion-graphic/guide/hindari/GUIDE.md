# Hindari (cek akhir)

Ini daftar pindai, bukan larangan teknik. Satu tanda dengan alasan tertulis boleh; beberapa tanda bersamaan = video terasa murah/AI.

| Tanda | Kenapa jelek | Cek | Arah perbaikan |
|---|---|---|---|
| Warna kebanyakan | mata tidak tahu fokus | hitung keluarga hue di still | satu aksen + netral, atau maksimalis satu sistem (`../visual/`) |
| Teks tidak beraturan / bertumpuk | dua hal berebut dibaca | still per frasa | dua lapis maks, caption mundur saat penekanan (`../teks/`) |
| Caption > 2 baris / terpotong / dihapus | terbaca seperti artikel, atau ucapan tanpa teks | `caption_lines.py` | pecah klausa; setiap ucapan bercaption |
| Gerak kaku / linear / fade polos | terasa template | putar 0,5× | easing ekspresif, blur, mask (`../gerak/`) |
| Cutout tidak rapi | terasa tempelan | still 100 % di tepi | matte bersih, feather, cahaya disamakan |
| Kurang smooth / patah | perhatian putus | cut tidak di ketukan | cut di kata/beat/puncak gerak |
| Musik melawan suasana | merusak mood | `pace_read.py` vs musik | kategori dari tempo video (`../audio/`) |
| Suara sumber yang bersih jadi mendem | kualitas turun | `voice_fidelity.py` | sumber bersih cukup gain linear (§14.6) |
| Objek, teks, atau gerak tanpa bunyi | layar terasa mati | `gate/sfx_density.py` | 1 bunyi per frame/pesan/objek/gerakan (Lantai E24) |
| Grafik vivid melayang di footage blur | tempelan | still | menyatu atau dunia sendiri |

Daftar lengkap riwayat penolakan Irfan: `../../references/slop-catalog.md`.

## Cara memutuskan
- **[QC-01] Gerbang mengukur kegagalan seperti dialami penonton** · kelas P · cek: sebelum menyatakan lulus/selesai
  - Pemicu: menulis, memilih, atau menjalankan gerbang QC; atau menyatakan sebuah keluhan sudah beres.
  - Anti-pola: angka agregat atau proksi yang lulus sementara kegagalan yang dirasakan tetap ada: loudness terintegrasi lulus tetapi musik hilang di beberapa detik; onset tertutup tetapi bunyi habis di tengah gerak; teks tidak bertabrakan tetapi urutan bacanya datar; ukuran di file antara (WAV, render bisu) lulus tetapi file kiriman tidak.
  - Invarian: tiap gerbang mengukur atribut yang dinamai keluhan atau brief, secara lokal (per frame, atau jendela ≤ 1 dtk), di file kiriman sesudah encode; tiap keluhan punya gerbang yang menyebutnya. Encode AAC menaikkan true peak ±0,8 dB, jadi plafon limiter master diberi jarak itu dari target.
  - Karena: proksi yang lulus menghentikan pencarian tepat sebelum kesalahan yang akan dilihat pemilik.
  - Boleh: angka agregat tetap dilaporkan sebagai tambahan, bukan pengganti.
  - Gerbang: daftar gerbang proyek punya kolom "keluhan yang ditangkap", "lokal?", "diukur di file kiriman?"; ada baris yang kosong = belum lulus.
