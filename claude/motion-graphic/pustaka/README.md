# Pustaka: cara memakai referensi

Tujuan repo ini menaikkan mutu hasil dari prompt Irfan, bukan menyediakan template. Caranya: tiap video punya **satu kiblat** yang dipilih sadar, dan hasilnya dibandingkan dengan kiblat itu sebelum dikirim.

| File | Isi | Kapan dibaca |
|---|---|---|
| `../LANTAI.md` | mutu yang berlaku di semua video | selalu, sebelum apa pun |
| `PETA.md` | satu baris per referensi | selalu, untuk memilih kiblat |
| `kartu/<ref>.md` | anatomi 8 bagian satu referensi | hanya kartu yang dipilih |
| `RESEP-TEMPLATE.md` | resep 8 baris per video | disalin ke `projects/<proyek>/RESEP.md` |
| `teknik/` | pola lintas referensi yang boleh dipinjam (kinetic typography, resep editing) | saat merancang bagian itu |
| `../fonts/README.md` | file font, pengganti, dan peran tiap jenis huruf | saat mengisi baris Teks di resep |
| `contoh-gagal/` | frame yang pernah Irfan tolak + sebabnya | sebelum menilai still sendiri |

## Pengikat dan teknik
Delapan bagian anatomi dibagi dua:
- **Pengikat**: warna & tekstur, teks, ritme. Ketiganya diambil utuh dari **satu** sumber (kiblat). Inilah yang membuat video terasa satu keluarga.
- **Teknik**: b-roll/footage, motion graphic, kamera & transisi, SFX, musik. Boleh dipinjam dari kartu lain bila kiblat tidak punya atau lemah di bagian itu. Teknik pinjaman selalu dikenakan pengikat kiblat (warna, huruf, tekstur, dan tempo kiblat), dan pinjamannya ditulis di resep.

Yang dicatat kartu adalah hal yang tidak bergantung pada audio: proporsi (kata kunci berapa kali kata sambung, subjek mengisi berapa bagian frame), kedalaman (lapisan, buram, tekstur), dan watak gerak. **Kapan dan berapa lama** teks atau adegan tampil selalu diambil dari audio video yang sedang dikerjakan (timestamp kata), tidak dari kartu (Irfan 11 Nov).

## Urutan sumber
1. **Prompt Irfan**: apa yang dibuat dan syaratnya.
2. **Video referensi yang Irfan kirim di sesi**: kiblat dan pemilik pengikat. Selalu menang atas pustaka.
3. **Pustaka**: mengisi teknik yang tidak ada di kiblat; bila tidak ada referensi baru, satu kartu dipilih dari `PETA.md`.
4. **Lantai**: mengecek hasil, apa pun gayanya.

## Alur satu video
1. Baca `../LANTAI.md` dan `PETA.md`.
2. Tentukan kiblat (`PETA.md` §Cara memilih). Buka kartunya.
3. Salin `RESEP-TEMPLATE.md` ke `projects/<proyek>/RESEP.md`, isi 8 baris. Jalankan `python3 ../scripts/juri/resep_check.py projects/<proyek>/RESEP.md`.
4. Prompt menyebut gaya atau membawa referensi: langsung jalan dan kirim resep bersama hasil. Prompt tidak menyebut arah gaya: pilih 3 calon kiblat yang cocok dengan jenis videonya, buat satu still pembuka dari video itu untuk tiap calon (`render.sh still`, bukan render video), kirim ketiganya ke Irfan dalam satu pesan dan tunggu ia memilih (Irfan 12 Nov).
5. Build. Render hanya lewat `../scripts/juri/render.sh` (still → draft → final).
6. **Juri** sebelum kirim (di bawah).

## Juri
Dijalankan pada still per beat, sebelum render penuh:
1. `python3 ../scripts/juri/teks_cek.py qc/stills/` : teks di pita bawah berturut-turut, kata tampil dua kali, teks menyentuh tepi.
2. `python3 ../scripts/juri/sandingkan.py qc/stills/ <sheet kiblat> qc/sanding.jpg` : lembar sanding still kita vs frame kiblat.
3. Lihat lembar sanding itu, lalu isi `qc/JURI.md`: tiap butir "Cek kemiripan" di kartu kiblat dan tiap butir `LANTAI.md` A–D diberi LULUS/GAGAL + nama still buktinya. Bandingkan juga dengan `contoh-gagal/`.
4. Ada GAGAL = perbaiki adegan itu dan ulangi still-nya saja. Semua LULUS = baris terakhir `qc/JURI.md` ditulis `PUTUSAN: LULUS`, baru `render.sh final`.

Yang belum dicek otomatis (dinilai mata dari lembar sanding): keseimbangan komposisi, tabrakan objek, ada tidaknya gerak kamera, kecocokan visual dengan ucapan.

## Referensi baru
Saat Irfan mengirim video referensi:
1. Ambil contact sheet (1 frame per 2 detik) ke `../guide/referensi/sheets/<no>-<nama>.jpg`, transkrip, dan ukuran ritme (`../scripts/audio/pace_read.py`).
2. Tulis kartu dari `KARTU-TEMPLATE.md`. Hanya yang terlihat atau terukur; bagian tanpa data ditulis "Tidak terbedah".
3. Kartu dipakai sebagai kiblat sesi itu. Setelah videonya lulus dari Irfan, tambahkan satu baris ke `PETA.md`.

## Tumbuh: ke mana pelajaran disimpan
Koreksi Irfan disimpan di tempat yang cakupannya paling sempit dan masih benar:
| Koreksi tentang | Simpan di |
|---|---|
| video ini saja | `projects/<proyek>/DECISIONS.md` |
| cara memakai satu gaya | "Catatan pakai" di kartu kiblatnya |
| frame yang ditolak | `contoh-gagal/` : gambar + satu kalimat sebab + konteksnya |
| semua video, apa pun gayanya | usul ke `../../../PENDING.md`; masuk `../LANTAI.md` hanya setelah muncul di 2 video berbeda dan Irfan menyetujui bunyinya |

Yang tidak dilakukan: mengubah satu koreksi menjadi larangan umum (contoh: "serif pucat raksasa tidak menyatu dengan frame ini" bukan "serif dilarang").
