# Analysis & QA — bedah referensi dan gerbang kirim

Baca saat membedah referensi (gerbang 3) dan sebelum mengirim render (gerbang 9). Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## Isi

- 2. Bedah referensi per frame (wajib, dikerjakan sendiri)
- 16. QA — gerbang kirim
- 16.0 Gerbang Karpathy (cara kerja)
- 16.1 Bahan dari render (bukan dari kode/ingatan)
- 16.2 Checklist anti-monoton & kerapian
- 16.3 Tabel kritik sutradara
- 16.4 Rubrik R1–R7 + Kompas premium
- 16.5 Loop kritik (minimal 3 putaran, sampai semua ≥ 8/10)
- 16.6 Metrik terhadap referensi

## 2. Bedah referensi per frame (wajib, dikerjakan sendiri)

Kesalahan termahal di Jadisatu adalah menunggu Irfan menunjuk masalah yang bisa diukur sendiri.

**Visual**
- Bahan yang diekstrak:
  - contact sheet 2 fps (gambaran umum)
  - 8–10 fps atau setiap frame di rentang 2–3 dtk untuk tiap transisi dan animasi teks
  - scene detection: `select='gt(scene,0.3)',showinfo`
- Yang diukur dan dicatat dengan timestamp:
  - cut per menit, panjang shot (median dan p90), porsi frame diam terkunci vs bergerak, kecepatan kamera, ramp-in dan settle (frame)
  - push-in per frame, panjang jejak motion blur (p90 smear), parallax dan depth of field
  - tinggi teks (median dan p90), lama blok teks bertahan, onset teks dari frame bersih per menit, teks di layar (% frame)
  - sumbu dan sudut rotasi teks, stagger, kurva easing (lacak posisi per frame)
- Alat: `measure.py` + `compare.py` (toolkit metrik proyek Jadisatu: rentang target dari referensi, PASS/WARN/FAIL dengan timestamp).
- Mata tetap hakim: lihat sheet-nya.

**Audio (alat sendiri; Gemini hanya data tambahan)**
- Pemisahan stem: **Demucs** (htdemucs) memisahkan VO / musik / sisa. Cadangan: `librosa.decompose.hpss`.
- **librosa** sebagai inti analisis:
  - `onset_strength`/`onset_detect` (dengan backtrack) untuk SFX
  - `beat_track`/`plp` untuk grid musik
  - fitur spektral (centroid, rolloff, flatness, contrast) untuk kelas bunyi: whoosh, riser, impact, sub-drop, click, pop, tick, glitch, chime, swell
  - `librosa.segment` untuk struktur musik
- Sejajarkan event SFX dengan event visual dari metrik (cut, onset teks, whip, push, count-up). Hasilnya "peta audio":
  - % cut ber-SFX dan offset frame-nya
  - % onset teks ber-SFX
  - kepadatan SFX per menit per babak, layering, level relatif VO/musik
  - kedalaman duck, kantong senyap sebelum hit
  - jumlah dan titik ganti musik
- `compare_audio.py`: peta yang sama untuk render kita, ditambah **daftar event visual yang tidak bersuara**. Kalibrasi detektor memakai `cues.json` kita sebagai ground truth.

**Aturan meniru:** referensi diambil tata bahasanya (ritme, hierarki, cara transisi menyambung, cara bunyi mendukung gerak), tidak pernah palet, logo, karakter, atau isinya. Peran referensi Jadisatu:
- **Holy Freak** = struktur cerita dan hierarki teks
- **Baikov/Shapes** = editing, gerak teks, transisi lewat objek/skala, penempatan SFX
- **Camera_movement + Klickpin/AURA** = transisi halus, sebab-akibat UI, pindah dunia

---

## 16. QA — gerbang kirim

### 16.0 Gerbang Karpathy (cara kerja, dicek sebelum 16.1)
Empat aturan dari [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT), diterjemahkan untuk editing video di `working-with-irfan` §2b. Satu jawaban "tidak" berarti belum boleh kirim.
- [ ] **Pikir dulu**:
  - asumsi atas masukan Irfan tertulis di laporan;
  - tafsir ganda dan bentrokan aturan (skill vs instruksi baru) sudah ditandai, bukan dipilih diam-diam.
- [ ] **Sederhana dulu**:
  - setiap elemen, efek, layer, dan SFX menjawab "membantu penonton memahami apa?";
  - yang tidak punya jawaban dihapus;
  - elemen wajib (SFX per event, teks dari VO) tetap ada.
- [ ] **Perubahan bedah**:
  - `git diff` hanya menyentuh adegan/cue yang diminta;
  - bagian yang dipuji atau tidak dikomentari Irfan tidak berubah;
  - sisa yatim dari perubahan ini (cue, import, aset) sudah dibersihkan;
  - masalah lain dilaporkan, tidak diubah.
- [ ] **Berbasis tujuan**: setiap poin revisi punya kriteria terukur dan bukti angka di laporan. Contoh:
  - cakupan SFX ≥ 85 %;
  - tidak ada jendela 100 ms < −45 dBFS di perpindahan pembicara;
  - teks kalimat ≥ 48 px @1080;
  - teks diam ≥ 0,8 dtk saat dibaca.


### 16.1 Bahan dari render (bukan dari kode/ingatan)
- contact sheet 1–4 fps
- strip 12 frame berurutan di dua momen tercepat
- uji HP 360 px
- strip ±0,5 dtk di setiap batas shot
- `compare.py` (visual) dan `compare_audio.py` (audio)
- ukur loudness

### 16.2 Checklist anti-monoton & kerapian
- [ ] ≥ 3 treatment teks berbeda per 15 dtk; 4–6 teknik T per 15 dtk; lompatan skala ≥ 2 level tiap 5 dtk (rasio ≥ 3 : 1).
- [ ] Satu fokus per frame; tidak ada teks kiri + UI kanan; teks tidak menutupi wajah/subjek.
- [ ] **Tidak ada teks yang tumpang tindih dengan teks lain atau objek**; tidak ada teks terpotong tepi atau keluar area aman (kecuali bleed XL yang disengaja).
- [ ] Elemen yang diperbesar keluar frame dengan wajar, tidak terpotong kontainer.
- [ ] Tidak ada blok warna di belakang kata, scrim, outline/glow, atau glitch pengacak huruf.
- [ ] Teks 2.5D benar-benar berotasi/berlapis di momen yang tepat; ekstrusi hanya bila lolos TYPE-TEST.
- [ ] Layout sama maksimal 2 beat berturut; tidak ada fade sebagai pengganti gerak.
- [ ] Kamera global ±10 %; adegan informasional diam; gerak besar di setiap pergantian makna; 1 cut zoom per 6–10 dtk.
- [ ] ≥ 4 tipe transisi per 30 dtk, tidak berturut sama; nol crossfade; transisi di akhir frase VO.
- [ ] Motion blur di semua gerak cepat; jejak blur pendek; tanpa ghost.
- [ ] Sprite tidak pernah diputar; subjek = yang dikerjakan tokoh.
- [ ] Teks layar semua dari VO; latensi kata +1…+4 f; 1 warna aksen per frase.
- [ ] Tidak ada frame kosong/blank di tengah serah-terima; end card tidak statis > 1,5 dtk.
- [ ] SFX di ≥ 85 % event diskret (termasuk onset teks, counter, transisi); offset sesuai §14.3; kantong senyap sebelum hit; tidak ada bunyi tajam 2–6 kHz (energi > 5 kHz bus SFX < 5 %); beberapa cue musik sesuai babak; VO selalu paling jelas.
- [ ] Mix −14 LUFS / ≤ −1 dBTP.

### 16.3 Tabel kritik sutradara
Dipindah ke `storyboard.md` §16.3 (diisi saat storyboard, dicek ulang di render).

### 16.4 Rubrik R1–R7 + Kompas premium
Rubrik (skor 1–5, lulus bila semua ≥ 4):
- R1 timing di ketukan
- R2 satu fokus
- R3 konsistensi karakter
- R4 keterbacaan HP
- R5 kebenaran produk
- R6 setara referensi
- R7 audio

Kompas premium:
1. 1 frame = 1 pesan
2. ruang kosong mewah
3. teks kinetik mengikuti suara
4. transisi termotivasi + SFX
5. gerak halus berbobot
6. kedalaman dan tekstur halus
7. UI besar didemokan seperti dipakai
8. elemen kecil yang hidup
9. konsistensi palet
10. akhir yang mulus

Gagal salah satu = R6 tidak lulus.

**Gerbang R6**: subagen baru tanpa konteks pembuatan, diberi hanya frame kita + frame referensi sepadan + kompas. Ia wajib menjawab:
- (a) tiga hal paling amatir
- (b) kalau diselipkan di showreel bersama referensi, apakah langsung ketahuan beda kelas
- (c) skor per aturan

Lulus bila rata-rata ≥ 4,5 dan tidak ada aturan < 4. Dua putaran gagal di butir sama berarti ganti pendekatan, bukan memoles.

### 16.5 Loop kritik (minimal 3 putaran, sampai semua ≥ 8/10)
Kritikus segar menilai 8 kriteria dengan bukti timestamp:
- hook 2 dtk
- keterbacaan HP
- kualitas gerak
- variasi/pacing
- akurasi brand
- sinkron bunyi
- komposisi
- polish

Ia mengecek mode gagal yang umum:
- frame 0 kosong
- bunyi mendahului visual
- end card statis
- CTA kecil
- pre-roll memotong wipe
- kedalaman datar
- teks ganda saat swap
- caret tertinggal
- huruf mengintip dari mask
- teks bocor dari adegan lain
- teks melintas UI ramai saat kamera bergerak
- hold > 1 bar tanpa hal baru

Perbaiki 3 masalah terburuk, verifikasi dengan still/klip, catat di `review_log.md`, ulangi. Jangan tunjukkan video ke Irfan sebelum verdict SHIP.

### 16.6 Metrik terhadap referensi
Jalankan `compare.py`. Setiap FAIL harus diperbaiki atau diberi alasan tertulis kenapa disengaja (misalnya brief Irfan meminta hold statis). Laporan ke Irfan memuat hasil gerbang dengan jujur, termasuk yang masih menyimpang.

### 16.7 Checker layout per frame (wajib di proyek berbasis HTML/Remotion)

Penyebab utama kegagalan Jadisatu v7 adalah teks terpotong, teks bertabrakan, dan dobel exposure. QA lama tidak pernah mengeceknya karena hanya mengukur jumlah gerak. Di Remotion setiap frame adalah DOM, jadi posisi teks bisa dibaca langsung (`getBoundingClientRect`) per frame:

| Cek | Aturan |
|---|---|
| Area aman | Kotak teks di dalam margin 5 % dan tidak di 8 % bawah, kecuali elemen bertanda `data-bleed` |
| Teks vs teks | Dua kotak teks dengan opacity > 0,15 tidak beririsan |
| Teks vs subjek | Kotak teks tidak menutup elemen `data-subject` lebih dari 10 % |
| Ukuran minimum | Teks wajib ≥ 56 px di master 1080p |
| Teks melebihi kotak | Pakai `fitText` / `fillTextBox` dari `@remotion/layout-utils` saat membangun, bukan setelah render |

Status: spesifikasi. Checker ini belum dibuat; bangun di repo proyek video berikutnya bersama komponen pertama, lalu salin skripnya ke `scripts/` setelah terbukti menangkap kasus v7 (0:10, 0:17, 0:48–0:59, 1:03).

Metrik "jumlah gerak" dan "% diam" hanya informasi. Jangan dijadikan syarat lolos, karena mendorong drift tanpa tujuan.
