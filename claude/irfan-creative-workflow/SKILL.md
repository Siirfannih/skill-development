---
name: "irfan-creative-workflow"
description: "Workflow and hard-won lessons for any creative project with Irfan (launch videos, motion graphics, scripts, campaigns): gate order, script quality bar, credit discipline, and what experience to carry vs leave behind. Use at the start of every new video/creative project or session, even if he only says 'bikin video' or sends a reference."
---

# Cara Kerja Proyek Kreatif Irfan (Pengalaman, bukan Template)

Skill ini berisi **pengalaman** dari proyek-proyek sebelumnya: urutan kerja, standar keberhasilan, alat, dan kesalahan yang tidak boleh terulang. Isinya bukan aset atau gaya dari proyek lama.

Bayangkan creative director senior yang masuk ke proyek baru. Ia tidak membawa 10 template dari klien sebelumnya. Yang ia bawa adalah cara berpikir, urutan kerja, dan insting tentang apa yang biasanya salah. Hasilnya: prosesnya lebih cepat, dan karyanya lebih bagus.

Pakai skill ini bersama `working-with-irfan` (cara berkomunikasi) dan `motion-graphic` (teknik dan prinsip sutradara untuk video). Sumber kebenaran semua skill adalah repo `Siirfannih/skill-development`; katalognya di `INDEX.md`.

---

## 1. Setiap proyek mulai dari kanvas kosong

**Yang DIBAWA dari proyek lama (pengalaman):**
- Urutan gerbang kerja (§2) dan alasan di baliknya.
- Cara mengukur referensi: contact sheet, scene detection, transkrip, angka timing (lihat `working-with-irfan` §4).
- Cara QA: render, contact sheet, cek audio, cek dengan rubrik.
- Alat yang sudah terbukti jalan dan cara memakainya (§5).
- Log kesalahan (§6), supaya tidak terulang.

**Yang TIDAK dibawa kecuali Irfan memintanya secara eksplisit:**
- Palet, font, gaya teks (G1–G7, dsb.), karakter, maskot, standar SFX, gaya musik, struktur babak, dan storyboard dari proyek lain.
- Aturan brand milik produk lain (contoh: aturan hitam/putih Tuntunly tidak berlaku untuk Jadisatu).

Alasannya: setiap proyek punya pesan, audiens, dan brand sendiri. Template lama membuat karya baru terasa seperti salinan dan mengunci keputusan sebelum briefnya dipahami. Jika satu aturan lama memang terasa relevan, **usulkan** sebagai pilihan dengan alasannya. Jangan menerapkannya diam-diam.

Ketika Irfan berkata "pastikan kamu bawa skill workflow-nya", artinya: bawa cara kerjanya, bukan isi proyeknya.

**Kanvas kosong = satu konteks baru, bukan nol aset.** Video talking head disusun sebagai talking head, bukan di atas template motion graphic. Tapi potongan yang sudah jadi dan terbukti bagus dari editan sebelumnya (gerak kamera zoom in/out, b-roll, animasi, kursor, counter, transisi, beserta SFX pasangannya) **dipakai ulang seperti Lego**: disalin dari hasil editing yang tersimpan, tidak dibangun ulang tiap sesi. Tes pembedanya: cabut potongan itu dari video lamanya; bila masih masuk akal tanpa brand dan cerita lamanya, itu **blok** (boleh dipakai, warna/font/tempo diambil dari proyek baru, alasannya ditulis di resep); bila tidak, itu **template** (tidak dibawa). Blok kode ada di `motion-graphic/scripts/remotion/` (`curves.ts`, `Kursor.tsx`, `Penghitung.tsx`, `TeksBlok.tsx`, `LightSweep.tsx`); router Domain Packs di `motion-graphic/cookbook/INDEX.md` + pencarian `motion-graphic/scripts/cookbook/pilih_kartu.py` (mekanik yang di-remix, bukan gaya yang disalin) dan ringkasan lintas kartu di `motion-graphic/cookbook/POLA.md`.

---

## 2. Urutan gerbang (dikunci)

Nama tahap mengikuti judul `## Tahap N` di `motion-graphic/templates/TAHAP.md` (Brief → Naskah → Storyboard/block out → Animate → Effects & grade → Mix → Deliver); file lain menyebut tahap dengan nama, bukan nomor. Untuk video, butir dan buktinya di `motion-graphic/templates/TAHAP.md`.

| Tahap | Gerbang | Output | Lolos jika |
|---|---|---|---|
| Persiapan | Muat pengalaman | Skill ini + skill pendamping dibaca | Bagian workflow sudah dipahami; tidak ada aset proyek lama yang ikut terbawa |
| Brief | Brief + bedah referensi | Tujuan, audiens, durasi, format, kondisi bisnis, batas waktu; breakdown referensi dengan angka dan timestamp; bila user membawa referensi, `REFERENCE-BRIEF.md` lewat Phase 0 `../motion-theme-director/BEDAH-REFERENSI.md` (5 lapis) | Setiap klaim tentang referensi bisa ditunjuk buktinya (file + detik); brief referensi terisi sebelum storyboard |
| Naskah | **Script** | Draft di chat (bukan file), diulang sampai Irfan bilang final | Lolos uji storyteller (§3) **dan** Irfan menyatakan final |
| Storyboard/block out | Storyboard 100% durasi | Per beat: waktu, aksi tokoh/subjek, teks, kamera, transisi | Pola per beat diracik dari `motion-graphic/cookbook/INDEX.md` + `pilih_kartu.py` (tabel racikan, `cookbook/README.md` §2); lolos tabel kritik `motion-graphic/references/storyboard.md` §5, lalu disetujui Irfan |
| Storyboard/block out | **VO** (bila ada) | VO final | Hanya dimulai setelah naskah dan storyboard disetujui |
| Animate → Effects & grade → Mix | Build, lalu SFX → musik | Kode/proyek per beat; SFX dan musik disusun setelah visual lulus (`motion-graphic` Lantai F26) | Satu fungsi per beat; revisi mengubah kode yang ada, bukan membangun ulang |
| Mix → Deliver | QA | Contact sheet, cek audio (`audio_qa.py`, `voice_fidelity.py`), checklist playbook; rakitan klip ditranskrip ulang (`selects/rakitan_cek.py`) | Bagian gagal diperbaiki sebelum dikirim |
| Deliver | Kirim + posting | Video, caption, catatan penyimpangan; setiap video/audio hasil render dikirim lewat saluran yang ada (Google Drive folder "Claude edit/<proyek>" bila remote `gdrive:` tersedia; selain itu path atau link yang bisa dibuka) dan lokasinya diberikan | Irfan bisa membuka hasilnya tanpa membuka file lokal |

**Rekaman talking head mentah** (Irfan merekam dulu, lalu klip dipilih): tahap Naskah adalah *paper edit*, yaitu klip per beat dipilih dari transkrip per kata (satu take utuh per kalimat) dan diuji storyteller seperti script; tahap Storyboard/block out berisi storyboard per klip; tahap Animate memakai rough cut, dan keluaran untuk editor manusia mengikuti `motion-graphic/references/selects-editor.md`. Instruksi Irfan untuk mengerjakan beberapa tahap sekaligus berlaku untuk tahap yang ia sebut; catat urutan yang dilompati di catatan penyimpangan.

**Kirim lewat Drive (bila remote `gdrive:` ada):** unggah dengan `rclone copy <file> "gdrive:Claude edit/<proyek>/"` satu per satu (unggah paralel ke folder baru membuat folder kembar), ambil ID dengan `rclone lsjson` lalu beri link `https://drive.google.com/file/d/<ID>/view`. Jangan `rclone link`: perintah itu mengubah izin file menjadi "siapa pun yang punya link".

**Kenapa urutannya begini:** setiap gerbang lebih murah diperbaiki daripada gerbang sesudahnya. Satu kalimat script yang salah bisa diperbaiki dalam 10 detik. Kalau kalimat yang sama sudah jadi VO, memperbaikinya berarti kredit terbuang. Kalau sudah jadi render, memperbaikinya butuh berjam-jam.

**Aturan biaya:** jangan generate apa pun yang memakai kredit (VO, SFX, musik, gambar, video AI) sebelum gerbangnya terbuka. Sebelum generate, sebutkan perkiraan biayanya. Generate secukupnya: 1–2 variasi, bukan 4, kecuali Irfan meminta lebih. VO "sementara untuk timing" bukan pengecualian. Timing di storyboard bisa diperkirakan dari jumlah kata (sekitar 2,5–3 kata per detik untuk VO santai Indonesia).

**Batas waktu:** jika Irfan memberi batas (misalnya "3 jam"), bagi waktunya per gerbang di awal dan laporkan jika satu gerbang memakan jatah gerbang lain. Batas waktu tidak boleh dipakai sebagai alasan untuk melompati persetujuan naskah dan storyboard.

Preferensi Irfan "jangan berhenti untuk minta persetujuan" berlaku untuk pekerjaan yang **sudah** tertulis di rencana yang ia setujui. Script dan storyboard justru adalah gerbang persetujuan itu, jadi di dua titik ini kita memang menunggu kata "final".

---

## 3. Standar script: uji storyteller

Script adalah fondasi. Script yang lemah tidak bisa diselamatkan oleh animasi sebagus apa pun. Bayangkan penulisnya seorang storyteller berpengalaman 10+ tahun (penulis naskah Apple, storyteller McKinsey). Setiap kalimat harus lolos pertanyaan: **"Apakah orang itu akan menulis kalimat ini?"**

### 3.1 Saat merapikan draft Irfan
Irfan sering membawa draft kasar yang strukturnya sudah benar. Tugasmu adalah **mempertajam kata**, bukan menulis ulang.
- Pertahankan urutan, ide, dan frasa terkuatnya. Jangan hilangkan satu ide pun tanpa menyebutkannya.
- Setelah merapikan, cocokkan ide per ide dengan draft aslinya. Contoh kegagalan: "kami tidak membangun AI agent/model/sesuatu yang inspiratif" dan "aman dan terencana" hilang saat dirapikan.
- Sertakan catatan singkat: apa yang diubah dan kenapa. Juga apa yang masih terbuka.

### 3.2 Uji per kalimat
- **Gambar, bukan label.** Kalimat yang menyuruh penonton percaya ("rasanya produktif", "ada yang jadi", "sangat membantu") diganti dengan sesuatu yang bisa dibayangkan ("kamu kasih arahan, dan dalam hitungan detik sesuatu berdiri di depanmu").
- **Ritme yang membawa makna.** Siklus berulang terdengar berulang ("Membangun. Membongkarnya. Membangun lagi."). Penekanan terdengar dari kalimat pendek yang berdiri sendiri.
- **Uji dibaca keras.** Kalimat harus nyaman diucapkan dalam satu napas dan terdengar seperti orang bicara, bukan tulisan. Ragam bahasanya konsisten (jangan mencampur "tidak" dan "nggak" tanpa alasan).
- **Rasakan dulu, baru beri nama.** Penonton merasakan masalahnya sebelum diberi istilah (contoh: "AI builder trap" muncul setelah lingkarannya terasa).
- **Pola AI dilarang:** "Bukan A, tapi B" yang berulang, "Tidak hanya X, tapi juga Y", "Di sisi lain", "Pada akhirnya", penutup yang merangkum ulang, kata kosong (krusial, optimal, fenomena, mengidentifikasi). Jika pola kontras memang inti pesan, pakai paling banyak satu kali dan tandai.
- **Jujur.** Setiap klaim tentang produk atau cerita Irfan harus benar hari ini. Jika belum pasti, tanyakan atau beri versi aman.

### 3.3 Uji per naskah
- Satu benang merah dari hook sampai penutup.
- Apakah ada bagian yang hanya berfokus pada produk sementara pasar sedang jenuh dengan pola itu (jualan kelas AI, "komen PROMPT", jualan pekerja AI)? Jika ya, cari sudut pandang yang lebih jelas pada topik yang familiar. Lebih baik menjelaskan sesuatu yang sering dibahas dari sudut yang jernih daripada mengulang pola jualan.
- CTA harus menjadi lanjutan cerita, bukan pintu keluar transaksional.

### 3.4 Cara menyerahkan draft
Tampilkan di chat. Jangan buat file sebelum final. Jangan menyatakan script "siap" hanya karena kamu yang menulisnya. Yang menentukan final adalah Irfan.

---

## 4. Standar keberhasilan (lintas proyek)

- Output bisa langsung dipakai: video jadi, caption, dan file yang bisa Irfan buka atau edit sendiri.
- Kualitas visual minimal setara referensi yang ia bawa, diukur dari contact sheet berdampingan, bukan dari kesan.
- Barrier to entry menengah ke atas. Karyanya tidak terlihat seperti "AI motion" generik.

---

## 5. Alat yang sudah terbukti (pengalaman teknis)

- **Bedah video:** ffmpeg contact sheet (1–2 fps untuk gambaran umum, 6–10 fps untuk transisi), scene detection `select='gt(scene,0.3)'`, faster-whisper untuk transkrip dan timestamp per kata (berikan audio sebagai numpy array jika `av.open` error).
- **Build motion:** ikuti `motion-graphic` (`scripts/juri/render.sh`, lego untuk video berfootage, Remotion/HTML). After Effects hanya bila Irfan memintanya (`tools/AFTER-EFFECTS.md`).
- **Aset motion untuk editor:** HTML satu kanvas seukuran frame, tiap aset di posisi akhirnya, dirender Chromium headless sebagai PNG transparan (`--default-background-color=00000000`); dicek di still komposit sebelum dikirim.
- **Paket editor dari rekaman mentah:** `motion-graphic/scripts/selects/` (`timeline.py` timeline + CSV ber-timecode, `cue_sumber.py` pindah cue lewat waktu sumber, `rakitan_cek.py` take dobel + kata terpotong).
- **Color grading footage:** `motion-graphic/references/grade.md` + `scripts/gate/grade_ukur.py`; 2–4 varian diukur dan disandingkan sebelum render penuh.
- **Audio:** ElevenLabs (VO/SFX) hanya setelah storyboard disetujui. Timestamp kata dari Whisper dipakai untuk sinkron teks.
- **QA audio:** `motion-graphic/scripts/audio_qa.py`, `scripts/gate/voice_fidelity.py` (suara mendem dibanding sumber), `external/earshot`; Gemini multimodal bila tersedia untuk menilai sinkron, emosi, dan kelelahan telinga.
- **Akses Mac:** minta akses folder `~/Proyek` saat butuh skill atau proyek lama; tanpa akses Mac, kerja dari repo dan bahan sesi. Baca bagian workflow-nya saja.

---

## 6. Asal-usul aturan

Kejadian yang melahirkan aturan di skill ini dicatat di `SUMBER.md` (bukan instruksi; dibuka hanya saat mengubah skill). Kesalahan baru: aturannya ditulis di bagian yang berlaku di atas, asal-usulnya di `SUMBER.md`.

---

## 7. Checklist sebelum setiap langkah besar

- [ ] Gerbang sebelumnya sudah dinyatakan final oleh Irfan?
- [ ] Langkah ini memakai kredit? Jika ya, apakah gerbangnya sudah terbuka, dan sudah aku sebutkan biayanya?
- [ ] Apakah aku membawa aset/gaya proyek lain tanpa diminta?
- [ ] Untuk script: apakah setiap kalimat lolos uji storyteller, dan semua ide draft Irfan masih ada?
- [ ] Apakah klaimku tentang referensi atau produk punya bukti?