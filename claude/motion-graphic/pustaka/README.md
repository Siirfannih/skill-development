# Pustaka: cara memakai referensi

Tujuan repo ini menaikkan mutu hasil dari prompt Irfan, bukan menyediakan template. Caranya: tiap video punya **satu kiblat** yang dipilih sadar, dan hasilnya dibandingkan dengan kiblat itu sebelum dikirim.

| File | Isi | Kapan dibaca |
|---|---|---|
| `../LANTAI.md` | mutu yang berlaku di semua video | selalu, sebelum apa pun |
| `PETA.md` | satu baris per referensi | selalu, untuk memilih kiblat |
| `kartu/<ref>.md` | anatomi 8 bagian satu referensi | hanya kartu yang dipilih |
| `RESEP-TEMPLATE.md` | resep 8 baris per video | disalin ke `projects/<proyek>/RESEP.md` |
| `teknik/` | pola lintas referensi yang boleh dipinjam (kinetic typography, resep editing, peluncuran produk/UI `launch-motion.md`) | saat merancang bagian itu |
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
2. `python3 ../scripts/juri/balance_check.py qc/stills/` : keseimbangan global tiap frame (Lantai C17): teks dibobot ×8, objek/subjek disetarakan dengan massa teks; FAIL bila satu sisi membawa > 70 %. Still diambil di frame **frasa utuh** (kata terakhir tampilan sudah muncul), bukan tengah frasa (builder-trap-r2 r5: 19 FAIL palsu dari frame yang baru menampilkan 1 kata). Buka `qc/stills/balance_sheet.jpg` (25 % dan 50 %) dan nilai urutan baca dengan mata (Irfan 15 Nov; kalibrasi: builder-trap-r2 r4 B01/B03 FAIL, wajah + teks berseberangan ok).
3. `python3 ../scripts/juri/sandingkan.py qc/stills/ <sheet kiblat> qc/sanding.jpg` : lembar sanding still kita vs frame kiblat.
4. Lihat lembar sanding itu, lalu isi `qc/JURI.md`: tiap butir "Cek kemiripan" di kartu kiblat dan tiap butir `LANTAI.md` A–D diberi LULUS/GAGAL + nama still buktinya. Bandingkan juga dengan `contoh-gagal/`.
   Beat yang meminjam **teknik** dari kartu lain (baris teknik di `RESEP.md`) disandingkan juga dengan sheet kartu itu, dan butir "Cek kemiripan" kartu itu yang menyangkut teknik pinjaman (skala subjek, lapisan, latar, kamera, transisi) masuk `qc/JURI.md` dengan angka terukur. Kiblat lulus tidak menutupi teknik pinjaman yang meleset (Irfan 15 Nov; gagal: builder-trap-r2 v3 B12, kartu 63 tidak disandingkan: gradien polos menggantikan foto, jendela terpotong, UI terang).
5. Ada GAGAL = perbaiki adegan itu dan ulangi still-nya saja. Semua LULUS = baris terakhir `qc/JURI.md` ditulis `PUTUSAN: LULUS`, baru `render.sh final`.
6. **Audit frame per frame, tanpa sampling (sebelum MP4)**: `render.sh <proyek> frames <Comp>` (semua frame, jpeg skala 0,5) → `python3 ../scripts/juri/frame_audit.py qc/frames --src remotion/src --cuts <beats> --cues <cues> --words <words> --stems audio --out qc/frame_audit`. Satu agen pemeriksa per potongan ≤ 10 dtk (subagen/model lain, paralel; bukan agen yang membangun) membuka SEMUA lembar per detik (30 frame + strip audio) dan menulis `VERDICT.md` (masalah per baris + `PUTUSAN: LULUS/GAGAL`). Yang dinilai: visual, audio/SFX (momen jatuh/mendarat/klik/ganti adegan punya bunyi), transisi (tanpa kedip/frame kosong), jarak antar-frame (tanpa patahan di luar potong disengaja). GAGAL = perbaiki, render ulang SEMUA frame (bukan rentang: sambungan frame lama-baru terlihat seperti patahan palsu, gagal builder-trap-r2 r8d), audit ulang potongan yang berubah (Irfan 15 Nov).
7. **Sebelum final, pastikan semuanya**: draft seluruh video (`render.sh draft`, skala 0,5) dilihat geraknya per beat, dan setiap catatan Irfan yang aktif di `DECISIONS.md` diberi baris di `qc/JURI.md` (catatan → LULUS + still/frame draft buktinya). Masih ada yang belum pasti (tafsiran belum dicocokkan dengan kartu, gerak belum dilihat, pertanyaan Editor terbuka) = jangan render final (Irfan 15 Nov; gagal: builder-trap-r2 render v3 dua kali dimulai sebelum B12 pasti benar).

Yang belum dicek otomatis (dinilai mata dari lembar sanding): urutan baca/hierarki, tabrakan objek, ada tidaknya gerak kamera, kecocokan visual dengan ucapan.

## Referensi baru
Saat Irfan mengirim video referensi:
1. Ambil contact sheet (1 frame per 2 detik) ke `../guide/referensi/sheets/<no>-<nama>.jpg`, transkrip, dan ukuran ritme (`../scripts/audio/pace_read.py`).
2. Tulis kartu dari `KARTU-TEMPLATE.md`. Hanya yang terlihat atau terukur; bagian tanpa data ditulis "Tidak terbedah".
3. Kartu dipakai sebagai kiblat sesi itu. Setelah videonya lulus dari Irfan, tambahkan satu baris ke `PETA.md`.

## Tumbuh: ke mana pelajaran disimpan
Skill ini mengajarkan **cara memutuskan** (kapan A, kapan B, dan kenapa), bukan template yang harus dipatuhi (Irfan 15 Nov). Setiap koreksi Irfan diproses dua kali, tanpa bertanya ke Irfan apakah koreksinya berlaku untuk video lain (jawabannya selalu tidak):
1. **Koreksinya** (apa yang diubah) hanya berlaku untuk video itu → `projects/<proyek>/DECISIONS.md`.
2. **Alasannya** (kenapa Irfan memilih begitu: peran footage, arah mata, ritme perhatian, keseimbangan) diturunkan menjadi learning keputusan berbentuk "bila <kondisi>, pilih <X>, karena <alasan>" di bagian **Cara memutuskan** pada `../guide/<urusan>/GUIDE.md`, dengan tanda sumber. Learning adalah rujukan menimbang, bukan aturan; kondisi video berikutnya bisa membawa keputusan lain.

Koreksi itu sendiri disimpan di tempat yang cakupannya paling sempit dan masih benar:
| Koreksi tentang | Simpan di |
|---|---|
| video ini saja | `projects/<proyek>/DECISIONS.md` |
| cara memakai satu gaya | "Catatan pakai" di kartu kiblatnya |
| frame yang ditolak | `contoh-gagal/` : gambar + satu kalimat sebab + konteksnya |
| semua video, apa pun gayanya | usul ke `../../../PENDING.md`; masuk `../LANTAI.md` hanya setelah muncul di 2 video berbeda dan Irfan menyetujui bunyinya |

Yang tidak dilakukan: mengubah satu koreksi menjadi larangan umum (contoh: "serif pucat raksasa tidak menyatu dengan frame ini" bukan "serif dilarang").
