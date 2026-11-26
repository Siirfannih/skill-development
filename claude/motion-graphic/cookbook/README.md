# Cookbook: perpustakaan mekanik gerak untuk brainstorming dan Remotion

Cookbook ini lapisan penaik mutu (*quality adjustment layer*), bukan pembajak konsep. Isinya mekanik gerak, ritme kamera, hierarki tipografi, dan standar audio yang dibedah dari video referensi yang Irfan setujui. Isinya **bukan** template visual untuk disalin.

**Rumusnya: konsep user + mekanik cookbook = output baru.**

## 1. Prinsip (berlaku sebelum aturan lain di folder ini)

1. **Konsep user dulu.** Tema, palet, aset, huruf, dan arahan kreatif dari user adalah fondasi. Kartu tidak pernah memaksakan estetikanya bila bertentangan dengan visi user. Urutan otoritas: kalimat kanonik `AGENTS.md` (Urutan otoritas).
2. **Pindahkan mekanik, bukan gaya.** Dari kartu hanya diambil prinsip fisika gerak (kurva, berat, arah), ritme kamera, hierarki tipografi, susunan lapisan, dan peran SFX. Lalu semuanya dikenakan ke gaya visual milik user. Bila user tidak membawa gaya sama sekali, satu kartu boleh dipinjam utuh sebagai **pengikat** (warna, teks, ritme), dan pilihan itu disebut ke user.
3. **Draf user = mode penaik mutu.** Bila user membawa draf desain, storyboard, atau kode Remotion, cookbook dipakai sebagai standar audit. Yang dilakukan: menghaluskan kurva, menambah kedalaman kamera, memperbaiki pacing, dan melapisi SFX. Konsep dasarnya tidak dirombak. Masalah di konsep atau naskah diusulkan, tidak diubah diam-diam (§3).
4. **Tiap kartu punya Remix.** Mekaniknya selalu dicoba di konteks lain dulu (benda, warna, arah, rasio berbeda). Hasil yang bisa ditebak "ini kartu 87" berarti menjiplak.

## 2. Alur video baru: dua langkah

**Tanya sebelum meracik.** Brief yang belum mengunci porsi mode visual, platform dan ritme potong, atau referensi gaya: ajukan maks 3 pertanyaan berpilihan + rekomendasi bersama naskah atau keyframe pertama; sambil menunggu, kerjakan yang tidak bergantung.

**Langkah 1 · Brainstorm dan racik pola (sebelum kode).**
1. Bedah bahan user sendiri: naskah/transkrip per beat, footage, aset, brand. Dikerjakan sebelum membuka kartu (`../../irfan-creative-workflow/SKILL.md` §2, tahap Brief sampai Storyboard/block out).
2. Untuk tiap beat, tulis **fungsi ceritanya**: emosi, struktur kalimat, posisi di naskah. Contoh: "kalimat koreksi: bukan X tapi Y", "lompatan waktu", "angka yang harus mendarat".
3. Cocokkan fungsi cerita itu dengan kolom **Narrative trigger** `CATALOG.md` (dipandu router `INDEX.md`) lewat `python3 ../scripts/cookbook/pilih_kartu.py --cari "<kata kunci fungsi cerita>" [--pack 01..06] [--kategori …] [--bergerak]` (tabel ID, nama, status, path kartu, frame kunci); `CATALOG.md` tidak perlu dibaca utuh. Untuk mencari satu teknik lintas kartu, pakai `POLA.md`. Naskah baru dimulai dari kategori `script` (`03-documentary-story-narrative/`).
4. Buka **hanya 2–4 kartu**, ditambah frame kuncinya (`../guide/referensi/sheets/keyframes/<id>-k*.jpg`). Jumlah itu untuk seluruh video: **1 kartu pengikat** (hanya bila user tidak punya gaya) + kartu mekanik; tiap beat meminjam dari himpunan kartu itu.
5. Tulis racikannya sebagai tabel beat, lalu **minta persetujuan user** sebelum kode:

   | Beat | Fungsi cerita | Pola (ID.Tn) | Remix: yang dipertahankan → yang diganti | SFX |
   |---|---|---|---|---|

   Tabel yang disetujui disalin ke `projects/<proyek>/RESEP.md` (`RESEP-TEMPLATE.md`) dan storyboard (`../references/storyboard.md`).

**Langkah 2 · Eksekusi Remotion dari nol.** Kode ditulis baru dari tabel itu: bagian **Mekanik Remotion** kartu (kurva `../scripts/remotion/curves.ts`, lapisan, ruang, blur), lalu dikenakan gaya user. Tidak ada kode yang disalin dari proyek lain, kecuali blok netral (`../scripts/remotion/`). Angka di Mekanik Remotion adalah titik awal yang disetel lewat sanding. Angka berlabel *pengamatan* bukan target. Waktu dan durasi selalu diambil dari audio video ini.

## 3. Mode penaik mutu (user membawa draf)

1. Jalankan atau render draf apa adanya, lalu lihat still per beat. Jangan mengubah apa pun dulu.
2. Untuk tiap beat, tulis fungsi ceritanya dan cari pola yang cocok di `INDEX.md` + `pilih_kartu.py` (`CATALOG.md`) / `POLA.md`. Bandingkan dengan draf di tiga sumbu, masing-masing dengan rujukannya:
   - **Gerak**: kurva dan berat (`../references/smooth-motion.md`, `curves.ts`)
   - **Kamera dan kedalaman**: `../references/camera-transition.md`
   - **Pacing**: potong dan tahan dari audio (`../references/pacing-map.md`)
   - **SFX**: satu bunyi per objek penting (`../guide/sfx/GUIDE.md`)
3. Usulkan perubahan sebagai daftar bedah: beat, apa yang diubah, pola rujukannya, dan apa yang tetap. Warna, huruf, aset, komposisi, dan urutan user tidak diubah. Setelah disetujui, ubah kode yang ada (revisi bedah, bukan bangun ulang).

## 4. Isi folder (Arsitektur Two-Tier Domain Packs)

| Path | Isi | Kapan dibaca |
|---|---|---|
| `INDEX.md` | daftar pack + filter `--pack` per tipe konten (< 600 tok) | saat memilih filter `pilih_kartu.py` |
| `00-core-invariants.md` | 7 invarian universal Kelas H lintas semua format (< 1.000 tok) | wajib sekali per sesi produksi |
| `01-motion-camera-transitions/` · `02-typography-talking-head/` · `03-documentary-story-narrative/` · `04-ui-cutout-dataviz-visuals/` · `05-audio-sfx-pacing/` · `06-qc-and-verification/` | Invariant Cards ringkas (10–15 baris) per Domain Pack | per kartu, hanya 2–4 kartu hasil `pilih_kartu.py`; pack utuh tidak dimuat |
| `CATALOG.md` · `POLA.md` · `SFX.md` | daftar lengkap 44 kartu + alias lama (dibangkitkan `tools/cookbook.py index`) | dibaca oleh CLI `pilih_kartu.py` / pencarian SFX |
| `_vault/` | arsip utuh 97 kartu bedahan penuh (Tier 2 on-demand) | dibuka hanya sesudah racikan 2–4 kartu disetujui untuk sanding visual |
| `KARTU-TEMPLATE.md` · `NASKAH-TEMPLATE.md` · `RESEP-TEMPLATE.md` | format kartu dan resep per video | saat membedah referensi baru atau membuat `RESEP.md` |
| `contoh-gagal/` | frame yang pernah ditolak + sebabnya | sebelum merancang dan setiap kali menilai still |
| `../guide/sfx/SFXIRFAN.md` | katalog bunyi `SFXIrfan` (nama file = fungsi) yang dirujuk kolom SFX | saat mengisi SFX |
| `../../_bersama/NEGATIF.md` | mutu yang berlaku di semua video (salinan di `../SKILL.md`) | selalu |

Alat (dari root repo): `python3 tools/cookbook.py index` (bangkitkan `CATALOG.md`, `POLA.md`, `SFX.md` dari frontmatter kartu), `cari <id>` (path kartu dari nomor/alias termasuk `_vault/` dan arsip), `baca <id>` (isi kartu vault tanpa kulit Pengikat, untuk sanding), `cek` (validasi frontmatter, format Invariant Card, batas token `INDEX.md`/`00-core-invariants.md`, vault path, kesegaran katalog; dijalankan `tools/doctor.sh`).

## 5. Kartu itu apa

Satu kartu = satu video referensi. Isinya:
- **Frontmatter**: `pola`, `kategori`, `trigger`. Inilah yang dibaca `CATALOG.md` dan `pilih_kartu.py`.
- **Inti mekanik** dan **Narrative trigger**.
- **Kondisi footage asli**: syarat yang membuat polanya berhasil.
- **Pengikat**: warna, teks, ritme. Dipakai utuh hanya bila kartu ini jadi pengikat.
- **T-blok** per pola. Tiap T-blok berisi: trigger, yang terlihat, kenapa bekerja, Mekanik Remotion, SFX, pakai/jangan, Remix 2–3, dan pengamatan.
- **Pertanyaan sanding** dan **Catatan pakai**.

Memakai kartu berarti membaca kondisi footage sendiri dulu, memilih pola yang syaratnya cocok, lalu me-remix-nya. Menyalin angkanya bukan memakai kartu. Kartu dengan `dilihat_bergerak: tidak` atau `diukur: tidak` dipakai setelah video sumbernya dilihat bergerak (§Referensi baru butir 1).

Bentuk visual yang tidak dijawab brief (tampilan Instagram, chat, dashboard, peta, tokoh) dicari di kartu dulu, tidak dikarang:
1. Cari lewat `INDEX.md` / `pilih_kartu.py` / `POLA.md`. `grep -il <benda> 0*/*.md` hanya untuk menemukan kartunya.
2. Buka frame kuncinya.
3. Pinjam mekaniknya dengan gaya user atau pengikat.
4. Tidak ada di kartu dan tidak dijawab brief: tanya user sebelum membangun.

## 6. Sebelum build (video berfootage)

1. **Lembar kondisi footage.** Untuk tiap jenis shot, siapkan satu still asli + catatan rasio, skala subjek, terang-gelap, pakaian, ruang kosong, dan kamera diam/bergerak. Simpan di `projects/<proyek>/qc/kondisi/KONDISI.md`. Tiap pola yang dipilih dicocokkan dengan "Kenapa bekerja" dan "Pakai bila"-nya. Bila kondisinya beda, penyesuaian ditulis di `RESEP.md`.
2. **Lembar spine gaya.** Satu still per peran teks (`../references/typography.md` §8a) di atas footage tersulit, ditambah satu still per pola pinjaman. Lembar ini dikunci di `qc/spine/SPINE.md` sebelum pekerja paralel mulai.
3. Build. Render hanya lewat `../scripts/juri/render.sh` (still → draft → final).
4. Juri sebelum kirim (di bawah).

## 7. Juri
Juri visual adalah mata, dan penilainya satu: Sutradara melihat gambarnya, dengan frame kunci kiblat sebagai contoh yang bagus dan `contoh-gagal/` sebagai contoh yang jelek. Skrip hanya dipakai untuk hal yang tidak terlihat di gambar (sinkron frame, audio) atau sebagai penunjuk frame yang perlu dilihat; tidak ada skrip yang memutus gaya, posisi, keseimbangan, atau estetika. `qc/JURI.md` ditulis dari yang terlihat di gambar (apa, di mana, mirip frame kunci atau contoh gagal yang mana), bukan dari koordinat atau angka skrip, dan menyebut **setiap** still di `qc/stills/`; satu still per beat adalah jumlah paling sedikit.

Dijalankan pada still per beat, sebelum render penuh:
1. `python3 ../scripts/juri/teks_cek.py qc/stills/` (alat bantu, bukan putusan): menunjuk still yang mungkin punya teks di pita bawah berturut-turut, kata tampil dua kali, atau teks menyentuh tepi. Tiap still yang ditunjuk dibuka dan diputus dengan mata. Kata ganda antara teks kinetik dan teks UI = GAGAL, diperbaiki, tidak diberi alasan.
   Proyek lego: `python3 ../scripts/juri/kt_ocr.py <proyek>/lego` membaca tiap kata KT pada onsetnya + 4 f dari render lapisannya; kata yang belum utuh/terbaca = GAGAL di `render.sh final`. OCR yang salah baca huruf bergaya ditulis ke `qc/kt_ocr_terima.json` dengan frame yang dicek mata.
2. **Keseimbangan dan tata letak dinilai dengan mata** (Lantai C17), bukan skor skrip. Buka tiap still di frame **frasa utuh** pada ukuran normal dan kecil (±25 %), lalu jawab per still di `qc/JURI.md`:
   - **Massa kiri-kanan:** elemen yang ditaruh (teks, kartu, tokoh, wajah/lingkaran) mengimbangi sisi lawannya; satu sisi penuh sementara sisi lain kosong = gagal. Detail latar footage (pintu, perabot) bukan massa yang ditaruh.
   - **Satu fokus:** mata tahu harus melihat ke mana; dua teks sama kuat yang tampil bersamaan = gagal.
   - **Urutan baca:** atas→bawah / kiri→kanan sama dengan urutan ucapan; hero di atas narasi yang diucapkan lebih dulu = gagal kecuali narasi sudah hilang.
   - **Satu permukaan:** teks dan objek duduk utuh di satu bidang; huruf yang terpotong tepi jendela/kartu/lingkaran (setengah di dua bidang) = gagal.
   - **Ruang dekat subjek:** teks menempel subjek/objek yang dirujuk dan memakai ruang kosong terdekat **di dalam bidang gambar**, tidak menyentuh margin 5 %, tidak duduk rendah di dekat batas bawah, dan tidak ditaruh di pita kosong di luar gambar selama ada ruang di dalamnya.
   - **Sekeluarga dengan kiblat:** tidak ada elemen yang terasa tempelan (warna di luar palet, tulisan tangan/panah/stiker di tampilan yang netral).
   Tulis `KESEIMBANGAN <still>: LULUS|GAGAL — <yang terlihat>`. GAGAL diperbaiki posisinya.
3. `python3 ../scripts/juri/sandingkan.py qc/stills/ <sheet kiblat> qc/sanding.jpg` : lembar sanding still kita vs frame kiblat.
4. Lihat lembar sanding itu, lalu isi `qc/JURI.md`: tiap pertanyaan "Yang harus terasa sama saat disandingkan" di kartu kiblat (kartu format lama: "Cek kemiripan"), dijawab untuk hubungan yang ditanyakan; warna, huruf, angka, dan benda yang disebut milik video sumber dan dibandingkan dengan padanannya di proyek kita (`tools/cookbook.py baca <id>`) dan tiap butir NEGATIF 1–10 diberi LULUS/GAGAL + nama still buktinya + apa yang terlihat. Butir yang bertabrakan dengan NEGATIF tidak gugur diam-diam: dicatat di `RESEP.md` §Penyesuaian karena LANTAI (label tetap karena dibaca `resep_check.py`; bunyi butir → versi yang disesuaikan), lalu dinilai terhadap versi itu. Bandingkan juga dengan `contoh-gagal/`.
   Beat yang meminjam **teknik** dari kartu lain (baris teknik di `RESEP.md`) disandingkan juga dengan frame kunci kartu itu, dan pertanyaan kartu itu yang menyangkut teknik pinjaman masuk `qc/JURI.md` dengan jawaban dari yang terlihat: apakah syarat "Kenapa bekerja" teknik itu terpenuhi di footage kita, atau penyesuaian di `RESEP.md` sudah dikerjakan. Angka kartu bukan ukuran lulus. Kiblat lulus tidak menutupi teknik pinjaman yang meleset.
5. Ada GAGAL = perbaiki adegan itu dan ulangi still-nya saja. Semua LULUS = baris terakhir `qc/JURI.md` ditulis `PUTUSAN: LULUS`, baru `render.sh final`.
6. **Audit visual semua frame, tanpa sampling (setelah visual selesai, sebelum SFX dan musik)**: `render.sh <proyek> frames <Comp>` (semua frame, jpeg skala 0,5) → `python3 ../scripts/juri/frame_audit.py qc/frames --src remotion/src --cuts <beats> --words <words>`. Sutradara menilai tiap potongan ≤ 10 dtk sendiri, mengikuti `../templates/roles/pemeriksa-frame.md`: buka frame kunci kiblat dan `contoh-gagal/` dulu, lalu semua frame tahan (`tahan/*.jpg`, satu per detik, ukuran besar) untuk gaya, posisi, keterbacaan, dan estetika; lembar 30 frame per detik hanya di detik bertanda otomatis, untuk transisi dan patahan. Tiap frame yang lemah diberi solusi desain yang diambil dari kartu, lalu `VERDICT.md` ditulis (masalah per baris + `PUTUSAN: LULUS/GAGAL`). Sesudahnya, sekali sebelum render final, satu **Creative Devil's Advocate** dari luar melihat videonya dengan brief steril dan memberi usul, bukan putusan (`../templates/roles/devils-advocate.md`); cek mekanik (frame kosong, kedip, patahan, teks bertumpuk/terpotong) dikerjakan skrip, bukan model. Audio tidak dinilai di sini: setelah SFX dikunci, kecocokan bunyi dengan gerak diperiksa terpisah (`frame_audit.py --fase audio` → `qc/audio_audit/`, prompt `../templates/roles/pemeriksa-audio.md`). GAGAL = perbaiki lalu audit ulang potongan yang berubah. Audit semua frame ini dijalankan saat membangun video dan sekali sebelum render final; **selama revisi Irfan tidak diulang tiap ronde**: tiap ronde revisi cukup rakit rentang yang berubah dan lembar sebelum/sesudah (`../references/revision-log.md` §0 butir 6).
7. **Sebelum final, pastikan semuanya**: draft seluruh video (`render.sh draft`, skala 0,5) dilihat geraknya per beat, dan setiap catatan Irfan yang aktif di `DECISIONS.md` diberi baris di `qc/JURI.md` (catatan → LULUS + still/frame draft buktinya). Masih ada yang belum pasti (tafsiran belum dicocokkan dengan kartu, gerak belum dilihat, pertanyaan Editor terbuka) = jangan render final.


## 8. Referensi baru
Saat Irfan mengirim video referensi:
1. **Lihat bergerak, bukan hanya diam.** Contact sheet (1 frame per 2 detik) ke `../guide/referensi/sheets/<no>-<nama>.jpg` hanya untuk menemukan momen teknik. Di tiap momen teknik, buat **strip semua frame** ±1,2 dtk dan buka gambarnya:
   `ffmpeg -v error -ss <detik> -t 1.2 -i <video> -vf "scale=220:-1,drawtext=text='%{n}':x=2:y=2:fontsize=12:fontcolor=yellow,tile=6x6" -frames:v 1 <kerja>/strip_<detik>.jpg`
   Dari strip itu catat: apa yang bergerak (kamera atau teks), urutan masuk (per huruf, per kata, sekaligus), apa yang tajam dan apa yang lunak, kapan latar berubah, apa yang menutupi apa, dan cara keluar. Satu frame diam tidak memperlihatkan semua itu: kata yang sengaja buram terbaca sebagai cacat, latar yang diredupkan lewat matte terbaca sebagai pencahayaan syuting. Gambar kerja disimpan di luar repo; yang masuk repo hanya frame kunci (`keyframes/<no>-k*.jpg`). Lalu transkrip dan ukuran ritme (`../scripts/audio/pace_read.py`).
2. Tulis kartu visual dari `KARTU-TEMPLATE.md` (frontmatter, kondisi footage, lalu tiap pola dengan trigger, Mekanik Remotion, SFX, Remix) dan, bila video punya struktur naskah, kartu naskah dari `NASKAH-TEMPLATE.md` di `03-documentary-story-narrative/` (transkrip penuh disimpan di luar repo). Hanya yang terlihat atau terukur; bagian yang belum dibedah ditulis "belum dibedah", tidak dikarang. `dilihat_bergerak: ya` hanya bila strip semua frame sudah dibuka.
3. Simpan di folder kategori dominannya, lalu `python3 tools/cookbook.py index` dan `cek` dari root repo. Kartu baru dipakai sebagai pengikat sesi itu bila user tidak membawa gaya sendiri.

## 9. Tumbuh: ke mana pelajaran disimpan
Skill ini mengajarkan **cara memutuskan**, bukan template. Koreksi Irfan dan alasannya tinggal di `projects/<proyek>/DECISIONS.md` (selera dan gaya selalu di sini); hanya kesalahan kerja yang salah di gaya apa pun yang naik, lewat `../../skill-steward/references/placement.md` §6. Satu pengecualian bentuk: frame yang ditolak → `contoh-gagal/` (gambar + satu kalimat sebab + konteksnya). Ragu = proyek.

Yang tidak dilakukan: menyalin bentuk referensi karena cantik. Teknik di kartu (huruf kedua, kaca, glow, gradien, 3D) dipakai bila alasannya berlaku dan ia menjadi bagian satu sistem (NEGATIF v2); koreksi "serif pucat raksasa" adalah pelajaran sistem, kontras, dan skala, bukan larangan serif.
