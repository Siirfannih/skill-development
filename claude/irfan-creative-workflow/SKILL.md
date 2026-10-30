---
status: principle
scope: proyek-kreatif
how_to_use: "Muat di awal proyek kreatif. Yang ikut adalah cara kerja, bukan palet atau pustaka proyek lama."
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

---

## 2. Urutan gerbang (dikunci)

| # | Gerbang | Output | Lolos jika |
|---|---|---|---|
| 0 | Muat pengalaman | Skill ini + skill pendamping dibaca | Bagian workflow sudah dipahami; tidak ada aset proyek lama yang ikut terbawa |
| 1 | Brief + bedah referensi | Tujuan, audiens, durasi, format, kondisi bisnis, batas waktu; breakdown referensi dengan angka dan timestamp | Setiap klaim tentang referensi bisa ditunjuk buktinya (file + detik) |
| 2 | **Script** | Draft di chat (bukan file), diulang sampai Irfan bilang final | Lolos uji storyteller (§3) **dan** Irfan menyatakan final |
| 3 | Storyboard 100% durasi | Per beat: waktu, aksi tokoh/subjek, teks, kamera, transisi | Lolos tabel kritik `motion-graphic/references/storyboard.md` §16.3, lalu disetujui Irfan |
| 4 | **Audio** | VO → SFX → musik | Hanya dimulai setelah gerbang 2 dan 3 lolos |
| 5 | Build | Kode/proyek per beat | Satu fungsi per beat; revisi mengubah kode yang ada, bukan membangun ulang |
| 6 | QA | Contact sheet, cek audio, checklist playbook | Bagian gagal diperbaiki sebelum dikirim |
| 7 | Kirim + posting | Video, caption, catatan penyimpangan | — |

**Kenapa urutannya begini:** setiap gerbang lebih murah diperbaiki daripada gerbang sesudahnya. Satu kalimat script yang salah bisa diperbaiki dalam 10 detik. Kalau kalimat yang sama sudah jadi VO, memperbaikinya berarti kredit terbuang. Kalau sudah jadi render, memperbaikinya butuh berjam-jam.

**Aturan biaya:** jangan generate apa pun yang memakai kredit (VO, SFX, musik, gambar, video AI) sebelum gerbangnya terbuka. Sebelum generate, sebutkan perkiraan biayanya. Generate secukupnya: 1–2 variasi, bukan 4, kecuali Irfan meminta lebih. VO "sementara untuk timing" bukan pengecualian. Timing di storyboard bisa diperkirakan dari jumlah kata (sekitar 2,5–3 kata per detik untuk VO santai Indonesia).

**Batas waktu:** jika Irfan memberi batas (misalnya "3 jam"), bagi waktunya per gerbang di awal dan laporkan jika satu gerbang memakan jatah gerbang lain. Batas waktu tidak boleh dipakai sebagai alasan untuk melompati gerbang 2 dan 3.

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

Butir di bawah adalah pengalaman tentang kualitas, bukan daftar syarat yang ikut sendiri ke proyek baru. Syarat satu proyek ada di `BRIEF-STANDARD.md` proyek itu.

- Output bisa langsung dipakai: video jadi, caption, dan file yang bisa Irfan buka atau edit sendiri.
- Kualitas visual minimal setara referensi yang ia bawa, diukur dari contact sheet berdampingan, bukan dari kesan.
- Barrier to entry menengah ke atas. Karyanya tidak terlihat seperti "AI motion" generik.
- Setiap revisi Irfan diubah menjadi aturan yang bisa dicek (catat di RETRO skill yang relevan, statusnya menunggu persetujuan Irfan).

---

## 5. Alat yang sudah terbukti (pengalaman teknis)

- **Bedah video:** ffmpeg contact sheet (1–2 fps untuk gambaran umum, 6–10 fps untuk transisi), scene detection `select='gt(scene,0.3)'`, faster-whisper untuk transkrip dan timestamp per kata (berikan audio sebagai numpy array jika `av.open` error).
- **Build motion:** After Effects 2026 di Mac lewat ExtendScript (osascript/Desktop Commander), satu fungsi per beat. Remotion/HTML+Three.js hanya jika Irfan memilihnya untuk proyek itu.
- **Audio:** ElevenLabs (VO/SFX) hanya setelah gerbang 3. Timestamp kata dari Whisper dipakai untuk sinkron teks.
- **QA audio:** Gemini multimodal untuk menilai sinkron, emosi, dan kelelahan telinga.
- **Akses Mac:** minta akses folder `~/Proyek` saat butuh skill atau proyek lama. Baca bagian workflow-nya saja.

---

## 6. Log kesalahan (tambahkan setiap ada yang baru)

| Tanggal | Proyek | Kesalahan | Aturan yang lahir |
|---|---|---|---|
| 2026-10-17 | Jadisatu launch | VO di-generate 3 kali (±7.300 kredit) sebelum script final dan storyboard ada | §2: audio hanya setelah gerbang 2 dan 3; tidak ada "VO sementara" |
| 2026-10-17 | Jadisatu launch | Script dinyatakan siap padahal masih terasa AI slop ("ada yang jadi", "rasanya produktif"); saat merapikan draft Irfan, urutan diubah dan beberapa ide hilang | §3: uji storyteller, mempertajam tanpa menulis ulang, cocokkan ide per ide |
| 2026-10-17 | Jadisatu launch | Membawa seluruh konteks Tuntunly (SFX, gaya teks G1–G7, musik per babak) ke proyek Jadisatu | §1: bawa pengalaman, bukan template |
| 2026-10-17 | Jadisatu launch | Mulai build sebelum memuat skill workflow terbaru dari Mac | §2 gerbang 0 |
| 2026-10-17 | Jadisatu launch | Membedah video yang salah tanpa memastikan dulu bahwa itu referensi yang dimaksud | §2 gerbang 1: sebutkan dalam satu kalimat "yang aku tangkap dari referensi ini adalah…" sebelum lanjut ke script |

---

## 7. Checklist sebelum setiap langkah besar

- [ ] Gerbang sebelumnya sudah dinyatakan final oleh Irfan?
- [ ] Langkah ini memakai kredit? Jika ya, apakah gerbangnya sudah terbuka, dan sudah aku sebutkan biayanya?
- [ ] Apakah aku membawa aset/gaya proyek lain tanpa diminta?
- [ ] Untuk script: apakah setiap kalimat lolos uji storyteller, dan semua ide draft Irfan masih ada?
- [ ] Apakah klaimku tentang referensi atau produk punya bukti?