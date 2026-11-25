# Rencana Uji A/B Buta · Skill Lama vs Draf Baru (`motion-theme-director`)

Dokumen ini menetapkan protokol uji empiris sebelum draf skill baru di [`draf-skill/`](./) dipasang ke repositori produksi [`skill-development`](./../motion-graphic/). Prinsip utamanya: **(1) bukan** model yang memberi skor `0–10` pada karyanya sendiri (`ADDENDUM-SUMBER.md` #2, [`F0-riset-re-dan-preset.md`](./../../research_notes/reverse-engineering-kartu-20261125/F0-riset-re-dan-preset.md) §1), dan **(2) jangan pernah** memakai video produksi internal lama kita (*Behindwork*, *Jadisatu 60s*, *The Gap*, *Jensen Huang* [`contoh-gagal/18`]) sebagai pembanding positif atau percontohan uji. Pembanding emas murni hanya berasal dari keyframe kartu eksternal di `tema/<tema>.md`, sementara keluaran uji dinilai lewat **perbandingan buta antara hasil Skill Lama vs Draf Baru oleh Irfan + hitung pelanggaran deterministik `slop-catalog.md` + jejak efisiensi token dan preset**.

---

## 1. Dua Kandidat yang Dibandingkan

| Kondisi Uji | Skill Lama *(Kontrol)* | Draf Baru *(Eksperimen)* |
|---|---|---|
| **Berkas Muatan Awal** | [`SKILL.md`](./../motion-graphic/SKILL.md) + [`MOTION-CORE.md`](./../motion-graphic/MOTION-CORE.md) + [`LANTAI.md`](./../motion-graphic/LANTAI.md) + alur buku masak lama (`~21,6k–24,5k` token terukur di `D-audit.md`) | [`draf-skill/SKILL.md`](./SKILL.md) + [`LANTAI.md`](./../motion-graphic/LANTAI.md) (lazy-load **1** file [`tema/<tema>.md`](./tema/) setelah router memilih tema + [`PRESET-INDEX.md`](./PRESET-INDEX.md) saat build) |
| **Agen Pelaksana** | Sesi model baru yang bersih (tidak tahu mana versi uji) | Sesi model baru yang bersih, dengan bobot model identik (mis. model eksekusi harian yang sama) |
| **Aturan Buka Keyframe** | Bebas sesuai kebiasaan skill lama | Wajib membuka `2–3` keyframe emas tema yang ditunjuk di `tema/<tema>.md` saat menyusun storyboard & still |

---

## 2. Tiga Brief Uji Identik (Mencakup Konten Nyata Ekosistem Irfan)

Setiap versi mengerjakan **2–3 beat storyboard kunci + rancangan cue audio & kinetic typography (`T*` / preset)** untuk 3 brief persis sama berikut:

> **Revisi F7 (Claude, 25 Nov 2026):** Brief 1 dan 2 versi Gemini identik dengan brief uji transfer F6B. Setelah uji itu, draf F4/F5 ditambal khusus untuk brief tersebut, sehingga uji A/B dengan brief yang sama akan berat sebelah ke draf baru. Keduanya diganti dengan brief segar yang belum pernah dipakai di F6. Brief lama tetap boleh dipakai sebagai uji regresi, tetapi tidak dihitung untuk syarat lolos.

1. **Brief 1 · Launch fitur tanpa wajah (`16:9`, 30 dtk, VO ±135 WPM):**  
   *Jadisatu "Kalender Konten": satu ide jadi jadwal posting 7 hari.* Hook masalah (`0–3 dtk`): "Ide ada, tapi minggu depan mau posting apa?" → demo (`10–18 dtk`): ketik satu ide → sistem menyusun 7 slot hari dengan format berbeda → user menyeret satu slot ke hari lain → payoff (`24–30 dtk`). Belum ada style frame. UI asli tersedia sebagai screenshot.
2. **Brief 2 · Reel opini talking head dengan footage sulit (`9:16`, 45 dtk):**  
   *Reel `@siirfannih` "Kenapa aku berhenti pakai template":* rekaman di kamar, **kemeja kotak-kotak** (motif), **dinding putih terang di belakang kepala**, headroom ±15 %. Ada 2 screenshot bukti (desain template vs desain jadi) di detik 20–28, lalu kembali ke wajah. Brief ini sengaja menguji apakah model memeriksa kondisi footage sebelum menaruh teks.
3. **Brief 3 · Studi Kasus Klien / Profil Tokoh Dokumenter (Brief Baru `9:16`, 40 dtk, Dokumenter + Bukti):**  
   *Studi kasus proses klien nyata (brief baru):* VO narator (`±140 WPM`) + `8–10` dtk wajah pembuka/penutup + foto arsip proses + kliping chat brief & kutipan artikel yang harus terbaca tajam di HP *(dilarang menjadikan video lama Behindwork atau Jensen Huang sebagai tolok ukur positif; hanya keyframe eksternal `89, 92, 48, 32` yang menjadi pembanding)*.

**Keluaran wajib per brief & versi:**
1. Maksimal 3 pertanyaan klarifikasi awal (jika diperlukan router — untuk uji tetap, dijawab seragam dengan paket jawaban standar yang sama persis untuk Kontrol dan Eksperimen).
2. `2–3` beat storyboard lengkap: framing & posisi `% frame`/`px @1080`, palet warna & rasio kontras, rantai keputusan visual + **gerak teks kinetik (`R*`, `T*`, kurva, durasi `f`)**, serta **tabel cue audio lengkap (`t`, `pilar`, `famili`, `peran`, `alasan`, level relatif VO)**.
3. Bila diuji sampai tahap build kode Remotion di `pc-server`: `2` still uji zoom `25% & 100%` + daftar preset mekanikal yang dipanggil vs kode kustom yang ditulis dari nol.

---

## 3. Protokol Penilaian Buta (Tanpa Tahu Mana Lama vs Baru)

1. **Pengacakan & Penghapusan Jejak:** Pihak pengelola uji menghapus komentar header, nama file skill, dan penamaan kode internal (`F4`, `I1–I8`, `MOTION-CORE`), lalu menyusun paket keluaran berpasangan per brief dengan label acak **`Keluaran A`** vs **`Keluaran B`** (mis. Brief 1: A = Baru / B = Lama; Brief 2: A = Lama / B = Baru; Brief 3: A = Baru / B = Lama). Kunci pemetaan disimpan terpisah sampai penilaian selesai.
2. **Penilaian Kualitatif oleh Irfan (`Blind Review`):** Untuk tiap pasangan A vs B pada 3 brief, Irfan menilai langsung:
   - *Keterbacaan & tata letak:* Apakah fokus tunggal jelas di HP (`25%`), teks tidak menabrak subjek/UI, dan terasa dibuat di After Effects oleh manusia?
   - *Rasa suara & gerak teks:* Apakah SFX terikat ke perubahan bermakna (bukan spam klik per kata), dan gerak teks sesuai makna kalimat alih-alih seragam generik?
   - *Keputusan buta:* Pilih **Menang A / Menang B / Seri** + 1–2 kalimat alasan spesifik.
3. **Penghitungan Pelanggaran Deterministik (`slop-catalog.md`):** Pemeriksa independen (atau skrip gate di `pc-server`) menghitung jumlah temuan eksplisit pada 49 indikator di [`slop-catalog.md`](./../motion-graphic/references/slop-catalog.md):
   - **`S-A1…S-A12`** (audio: pop di tiap kata VO, whoosh di cut statis, sub tanpa bodi HP, palet kayu/8-bit, lubang senyap, clipping);
   - **`S-T1…S-T13`** (teks: 2 lapisan subtitle, font campur 1 baris, kata hero < 56 px/kontras `< 4,5:1`, teks melompat saat montase cepat, kotak di latar polos);
   - **`S-V1…S-V24`** (visual: crossfade polos, Apple Glass/glow biru-ungu generik, spam grid simetris `> 4` kartu, screenshot kecil melayang `contoh-gagal/20`, dokumen diburamkan `contoh-gagal/21`, narasi VO masuk prompt UI `contoh-gagal/13`).
4. **Pengukuran Efisiensi & Preset:**
   - **Total token konteks dimuat** sampai storyboard + build awal selesai (target draf baru `< 35%` beban konteks lama `21,6k–24,5k` token).
   - **Rasio Pemakaian Preset vs Kode dari Nol:** persentase transisi/kamera/teks yang memakai komponen `PRESET-INDEX.md` (disesuaikan ke VO & rasio) dibanding menulis ulang logika easing/layout mentah.

---

## 4. Kriteria Lolos Wajib Sebelum Pemasangan (*Install Gate*)

Draf skill baru **HANYA** diizinkan menggantikan alur produksi di `./../../` apabila **seluruh 4 syarat berikut terpenuhi bersamaan**:

1. **Menang Penilaian Buta Irfan (`≥ 2 dari 3` brief):** Draf baru dipilih Irfan lebih unggul sebagai `buatan manusia / siap produksi`, dengan `0` kekalahan telak di brief mana pun.
2. **Penurunan Pelanggaran `slop-catalog.md` (`≤ 50%` dari skor pelanggaran Skill Lama & `0` pelanggaran fatal `contoh-gagal/13, 14, 16, 18, 20, 21`):** Secara khusus `0` kasus VO ditulis ke input UI, `0` kasus teks menutupi wajah/mata, dan `0` spam pop kata biasa di atas VO.
3. **Penghematan Token Terukur:** Beban bacaan sampai storyboard (`SKILL.md` + `LANTAI.md` + 1 file tema) ≤ **60 % muatan lama** (lama 21.600–24.500 token menurut `D-audit.md`). Estimasi kasar 25 Nov (karakter ÷ 3,4, belum tokenizer): ≈ 11.200 token storyboard, ≈ 13.400 dengan `PRESET-INDEX.md` saat build. *(Revisi F7: target lama "< 8.500 token" tidak realistis karena LANTAI sendiri ±5.300 token.)* Ukur ulang dengan tokenizer saat uji. `≥ 60%` kebutuhan gerak dasar terjawab lewat preset mekanikal yang disesuaikan kondisi video.
4. **Kepatuhan Epistemik:** Draf baru tidak menghasilkan klaim palsu atau halusinasi data; pada tema `minimalist-dataviz-kinetic` dan `documentary-archive`, draf tetap menghormati batasan bukti non-gerak dengan memverifikasi still secara visual saat build.
