# Orkestrasi: kamu memimpin, model lain yang mengulang

Baca file ini sampai habis sebelum mengerjakan build, render, atau QC video. Kalau sesimu sudah berjalan, terapkan mulai langkah kerja berikutnya. Jangan mengulang proyek dari awal, dan ubah kode serta alat yang sudah ada, jangan menulis ulang.

## 0. Kenapa aku menulis ini
- Selama ini satu sesi mengerjakan semuanya sendiri: build, render, audit 30 frame per detik, revisi. Akibatnya kuota 5 jam habis dalam ±3 jam, dan sekitar 75% kuota mingguan habis dalam beberapa hari.
- Aku sering menjalankan beberapa sesi video bersamaan. Kalau pola kerjanya tidak berubah, kuota habis sebelum videonya selesai.
- Revisi kecil saja bisa menunggu render 1–2 jam.
- Disk sempit membuat render crash. Pembersihan cache bisa membebaskan lebih dari 8 GB, tapi sesi sebelumnya tidak melakukannya.

Audit semua frame per detik sebelum render final, tanpa sampling, tetap wajib. Yang berubah hanya **siapa yang memeriksa**: bukan kamu, tapi dua model lain.

## 1. Peran
Kamu adalah **sutradara, prompt engineer, dan QC**. Kamu merancang, menulis perintah yang tepat dan lengkap untuk model pekerja, lalu menilai hasilnya. Semua pekerjaan yang berulang dikerjakan model lain atau script.

| Pekerjaan | Utama | Cadangan | Bagianmu |
|---|---|---|---|
| Menulis/ubah kode adegan Remotion, typecheck | **Codex (ChatGPT Pro 5x)** lewat `tools/codex-pc.sh` di PC, atau `gpt-bridge` di Mac | Subagen `model: sonnet` | Jangan menulis kode adegan sendiri, kecuali perbaikan ≤ 10 baris |
| Render still/draft/frames/final, `frame_audit.py`, mix, cek mekanis | Script (`render.sh`, runner) | — | Jalankan perintahnya saja, baca ≤ 20 baris log terakhir |
| **Pemeriksaan per detik (30 frame)** | **Gemini (`agy`) DAN ChatGPT, keduanya** | Bila salah satu tidak bisa diakses: subagen `model: sonnet` menggantikannya | Hanya detik yang hasil kedua pemeriksanya berbeda (§4) |
| Cari file, ringkas log, eksplorasi kode, cek diff baris per baris | Subagen `model: haiku` / `sonnet` | Codex | Tidak |
| Riset aset/referensi | Maximus (Grok) | Codex | Tidak |
| Juri still vs referensi (R6), devil's advocate, putusan konflik, `DECISIONS.md`, Delivery Gate, bicara denganku | — | — | **Ya, ini inti kerjamu** |

**Codex minta pendapat visual Claude** (sesi yang sudah dipegang Codex tidak dipindah; Irfan 16 Nov): `tools/tanya-claude.sh <proyek> <pertanyaan.md> [still …]`. Syaratnya arah video sudah tertulis dan disetujui (RESEP.md + kiblat; alat menolak bila belum). Claude tidak membaca kode; ia menerima dosir yang dirakit otomatis dari dokumen arah yang sudah ada (`LANTAI.md`, kartu kiblat, `RESEP.md`, baris Aktif `DECISIONS.md`, `STATUS.md`, opsional `handoff/KONSUL.md` dari `templates/roles/konsul.md` untuk "sudah dicoba dan gagal"), ±10 ribu token, plus pertanyaan dan still (≤ 960 px). Urutan menang: catatan Irfan aktif > resep + kiblat > LANTAI > pendapat Claude. Satu sesi Claude dilanjutkan hanya selama cache hangat (< 270 dtk) dan konteks < 120 ribu token; di luar itu sesi baru dari dosir, karena sesi panjang mengirim ulang seluruh riwayatnya di setiap panggilan. Kumpulkan pertanyaan satu ronde lalu tanyakan berurutan. Jawaban yang diterapkan dicatat sebagai baris baru di `DECISIONS.md` (sumber: konsul NN), supaya konsultasi berikutnya ikut membacanya. Pemakaian token: `handoff/konsul/konsul.jsonl`.

Pembuat dan penilai selalu model yang berbeda. Codex yang membangun adegan tidak boleh memeriksa adegan itu sendiri. Pemeriksa ChatGPT dijalankan di jalur terpisah dari builder (`-l qc-<proyek>`, bukan jalur builder).

## 2. Cek akses dulu, jangan menebak
Lakukan sekali di awal sesi dan catat hasilnya di `STATUS.md`:
1. Di PC: `which codex && codex login status`. Bila tidak ada, pakai `gpt-bridge` di Mac (`~/AI-OPS/gpt-bridge/gpt`, lihat `autopilot-video/tools/gpt-bridge/README.md`) lewat koneksi PC→Mac yang sudah dipakai sesi sebelumnya. Cari caranya di riwayat atau skrip yang ada, jangan mengarang host.
2. Gemini: `agy` ada di Mac. Cara memanggilnya ada di `experimental/dual-agent-sound/scripts/gemini_audio_director.py`. Cadangannya Gemini API (kunci di `$GEMINI_API_KEY` atau `~/Documents/Skill-Development/.secrets/gemini.key`, tidak pernah di repo).
3a. Di PC, Codex dijalankan penuh di terminal lewat `tools/codex-pc.sh <folder proyek> handoff/TASK-xx.md [-i lampiran…]` (isinya `codex exec --sandbox danger-full-access -C <folder>`). Ini keputusanku (Irfan 16 Nov): sandbox bubblewrap tidak jalan di PC ("bwrap: Operation not permitted"), sehingga Codex ber-sandbox tidak bisa membuka folder kerja. Batasnya: TASK wajib memuat FILE BOLEH / FILE JANGAN (skrip menolak TASK tanpa itu), dan pembuat tidak memeriksa hasilnya sendiri. Lampiran gambar lewat `-i` ditaruh SESUDAH file TASK. `agy -p` di PC kosong/timeout untuk lampiran 10 lembar (2× gagal) → jalur Gemini diganti subagen `model: sonnet` (gagal: bdf26 v10, 15–16 Nov).
3b. Dua pemeriksa saling melengkapi, bukan duplikat: di bdf26 v10 ChatGPT kuat di atribusi b-roll dan sinkron, subagen Sonnet menemukan kata yang tidak pernah tampil dan tepuk tangan yang putus. Banyak temuan ChatGPT positif palsu (penutur di shot wajah = pemilik suara, punch-in disengaja), jadi tiap temuan diverifikasi dengan frame/ukuran sebelum diperbaiki.
3. Bila sebuah jalur gagal 2× berturut-turut, tandai jalur itu mati di `STATUS.md` dan pakai cadangannya. **Jangan diam-diam kembali mengerjakan semuanya sendiri.** Bila kedua jalur pemeriksa mati, laporkan ke aku dalam satu pesan, lalu lanjutkan pekerjaan lain yang tidak bergantung pada jalur itu.

## 3. Perintah untuk pekerja (prompt engineering)
Setiap tugas untuk pekerja kamu tulis sebagai satu file `handoff/TASK-<beat>-<ronde>.md` dengan isi lengkap. Pekerja tidak boleh perlu bertanya atau menebak.

```
TUJUAN       satu kalimat: apa yang harus benar setelah tugas ini
KONTEKS      kutipan beat dari contract.json (jendela VO, teks layar persis, kode G/T/C/X, SFX + waktu) — kutip, jangan rujuk
FILE BOLEH   daftar path persis yang boleh diubah; selain itu dilarang
TEMUAN       ID temuan + detik/frame + yang terlihat + perbaikan yang diminta (dari §4)
LARANGAN     aturanku yang relevan untuk beat ini saja (maks 8 baris, salin dari LANTAI/SKILL/DECISIONS)
LULUS BILA   kriteria terukur: mis. "teks 'build' terlihat penuh f312–f340", "typecheck lulus", "tidak mengubah beat lain (baseline_lock)"
JANGAN       render final, ubah kontrak, sentuh beat lain, merancang komponen baru
LAPORAN      tulis handoff/REPORT-<beat>-<ronde>.md: file yang diubah, alasan per temuan, hasil typecheck
```

Konteks pekerja sengaja ramping. Jangan suruh pekerja membaca `SKILL.md`, `RETRO.md`, atau `LANTAI.md` penuh. Kamu yang memilih baris yang relevan.

Saat menilai hasil pekerja, baca `REPORT` + `git diff --stat` + paling banyak 3 file kunci + hasil gerbang. Jangan membaca transkrip pekerja.

## 4. Pemeriksaan per detik oleh dua model
Alur kerjanya mengikuti `templates/roles/pemeriksa-frame.md` dan `scripts/juri/frame_audit.py`. Yang berubah hanya pelaksananya.
1. `render.sh <proyek> frames` → `frame_audit.py` (sudah ada). Hasilnya per potongan ≤ 10 dtk, `s<detik>.jpg` = 30 frame + strip audio, plus `INFO.md`.
2. Kirim **setiap potongan** ke **Gemini dan ChatGPT secara paralel**, masing-masing tanpa konteks pembuatan (blind):
   - prompt = isi prompt di `pemeriksa-frame.md`;
   - lampiran = semua `s*.jpg` + `INFO.md` potongan itu;
   - minta keluaran JSON: `[{detik, frame, jenis, terlihat, usul}]` + `putusan: LULUS|GAGAL`;
   - simpan ke `VERDICT_gemini.md` dan `VERDICT_gpt.md` di folder potongan.
3. Gabungkan per detik:
   - **Keduanya LULUS** → detik itu lulus. Kamu tidak membuka gambarnya.
   - **Keduanya GAGAL di frame dan jenis yang sama** → langsung jadi temuan di TASK. Cukup jalankan devil's advocate dari teksnya.
   - **Berbeda** → hanya di sini kamu membuka lembar detik itu (maks 960 px), memutus, lalu menulis alasannya.
   - Temuan tanpa nomor frame dibuang (tidak bisa diverifikasi).
4. Tulis `VERDICT.md` gabungan, dengan baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Formatnya tetap seperti yang dibaca `render.sh final`.
5. Catat di `STATUS.md` tingkat kesepakatan kedua model dan berapa kali kamu harus memutus.
6. Potongan yang isinya tidak berubah sejak putusan terakhir **tidak diaudit ulang**. `frame_audit.py` mengikat setiap VERDICT ke `HASH:` isi potongan (frame + kata + cue + energi audio) dan menandai di `INDEX.md` mana yang `dipakai ulang` dan mana yang `perlu periksa`; kirim ke pemeriksa hanya yang `perlu periksa`, bersama `VERDICT.prev.md` bila ada supaya temuan yang sudah diputuskan tidak diangkat lagi. `render.sh final` menolak LULUS yang HASH-nya tidak cocok dengan isi sekarang (laporan investigasi 24 jam, 16 Nov: bdf26 9 gelombang × 12 potongan diperiksa ulang semua).

Klaim angka dari pemeriksa (waktu, level, jarak) selalu kamu verifikasi dengan alat ukur sebelum dikerjakan. Gemini pernah salah dengar angka (`experimental/dual-agent-sound/README.md`).

## 5. Anggaran token (wajib)
- Jangan membuka lembar frame kecuali detik yang hasilnya berbeda (§4.3) atau still juri R6.
- Gambar maks 960 px. Angka dari script dulu, gambar hanya bila ada masalah.
- Baca skill hanya cabang yang relevan. `RETRO.md` jangan dibaca utuh: pakai `grep` untuk topik beat yang sedang dikerjakan.
- Render dan ffmpeg dijalankan di latar belakang. Baca ≤ 20 baris log terakhir.
- Menunggu job panjang tanpa polling: `tools/tunggu.sh jalan <nama> -- <perintah>`, kerjakan hal lain, lalu **satu** panggilan `tools/tunggu.sh tunggu <nama> 1500` (timeout alat ≥ 1500 dtk). Jangan mengecek status berulang: tiap cek membangunkan model dengan seluruh konteksnya (sfx_builder_v6: 42 % token hanya polling, 16 Nov).
- Subagen dan pekerja menerima brief ramping (§3), bukan disuruh "baca repo".
- Video sumber panjang jangan ditonton. Transkrip Whisper di PC (`words.json`) → pilih segmen dari teks → `yt-dlp --download-sections` hanya untuk segmen itu.
- `STATUS.md` selalu diperbarui, supaya sesi yang terputus bisa lanjut tanpa membaca ulang semuanya.

## 6. Render lebih cepat
Urutannya: ukur dulu, baru ubah.
1–2. **GPU dan konkurensi: sudah otomatis.** Bila `doctor.sh` melaporkan "mesin ini belum dibenchmark", sesi video pertama di mesin itu menjalankan `tools/bench-render/bench.sh` sekali (±10–15 menit, memakai kunci render global, jadi aman bila sesi lain sedang render): adegan uji berat (blur, glow, grain) dirender dengan `--gl` default, angle-egl, vulkan, swangle, angle; opsi yang gagal atau gambarnya beda (PSNR < 35 dB) dibuang, opsi non-default dipilih hanya bila ≥ 10 % lebih cepat; lalu konkurensi 2, 4, … sampai jumlah thread diuji. Hasilnya `~/work/render-profile.json`, dibaca otomatis oleh `render.sh` dan `lego/lapisan.py` (hanya di mesin yang sama; env `GL`/`KONKURENSI` tetap menang) dan dicatat di `qc/jobs.jsonl`. Ulangi benchmark hanya bila hardware/driver/versi Remotion berubah. PC server: Ryzen 5 5600, Radeon RX 6600, RAM 32 GB.
3. **Render ulang hanya yang berubah.** Revisi satu adegan = still adegan itu → `frames` hanya untuk rentang beat itu → audit potongan itu → `final` dengan rentang itu → sambung dengan ffmpeg. Jangan merender ulang seluruh video.
4. **Efek mahal.** Bila GPU tidak bisa dipakai, `blur`/`filter` pada lapisan yang diam diganti gambar yang sudah di-blur (pre-render sekali). Blur yang ikut gerak kamera tetap dibiarkan.
5. **Render di mesin lain (Manda di cloud Grok, atau VPS)** hanya bila langkah 1 gagal **dan** mesin itu terbukti punya GPU:
   - cari hook Manda di PC server (path dan cara memanggilnya; jangan mengarang);
   - minta Manda menjalankan `nvidia-smi` / `npx remotion gpu` dan melaporkan hasilnya;
   - bila ada GPU: kirim `qc/.bundle` + `public/` + perintah render rentang yang persis (format §3), terima MP4, cek durasi dan checksum, lalu sambung;
   - bila tidak ada GPU atau tidak bisa diverifikasi: jangan dipakai, catat di `STATUS.md`.
6. **Beberapa sesi bersamaan.** `heavy_lock` (frames/final) tetap satu per waktu di PC. Still dan draft tidak memakai kunci, jadi kerjakan itu sambil menunggu giliran.

## 7. Disk (gerbang sebelum `frames` dan `final`, juga di awal sesi)
1. Jalankan `df -BG` pada disk proyek dan `/tmp`. Target: **≥ 15 GB kosong** sebelum `frames`/`final`.
2. Bila kurang, hapus dengan path literal, lalu catat ukuran dan path-nya di `STATUS.md`:
   - milik proyekmu sendiri: `qc/frames/`, `qc/frame_audit/` versi lama yang sudah digantikan, `qc/.bundle` lama, `out/chunks/` setelah sambung berhasil;
   - `/tmp/remotion-*` dan sisa Chrome yang **lebih tua dari 2 jam dan tidak dipakai proses yang sedang jalan** (cek `pgrep -af "remotion render"` dan `lsof +D` sebelum menghapus, karena beberapa sesi memakai PC yang sama);
   - cache yang bisa diunduh ulang: `~/.npm/_cacache`, cache model Whisper yang tidak dipakai proyek ini, cache pip.
3. Jangan pernah menghapus: hasil final yang sudah dikirim, aset sumber, stem audio final, file proyek lain yang berumur kurang dari 2 jam, atau apa pun di luar daftar di atas tanpa izinku.
4. Bila setelah dibersihkan masih < 8 GB, render final per rentang lalu disambung. Jangan memaksa render penuh.

## 8. Batas dan eskalasi
- Maksimal 3 ronde per beat. Gagal 2× di butir yang sama = ganti pendekatan: rancang ulang perintahnya, jangan mengulang perintah yang sama.
- Pekerja yang gagal 2× di tugas yang sama naik satu tingkat: Codex → subagen `sonnet` → kamu.
- Perubahan pada alat bersama (`render.sh`, `frame_audit.py`, file ini) dikerjakan **satu sesi saja**, lalu di-push. Sesi lain cukup `git pull`. Jangan sampai beberapa sesi mengedit file yang sama.

## 9. Ukuran berhasil (catat per video di `STATUS.md`)
- Porsi kuota yang terpakai (persentase 5 jam dan mingguan, dari `/status` atau `/usage`) di awal dan akhir video.
- Jumlah ronde per beat, tingkat kesepakatan Gemini–ChatGPT, dan berapa kali kamu harus memutus.
- Waktu revisi kecil: dari perintah perbaikan sampai potongan baru lulus audit.
- Waktu render per menit video, sebelum dan sesudah §6.
- Sumber angka waktu: `qc/jobs.jsonl` (ditulis `render.sh` tiap pemanggilan: `antre_dtk` di kunci render, `kerja_dtk`, `rc`, commit). Ringkas: `jq -s 'group_by(.mode)|map({mode:.[0].mode,n:length,antre:(map(.antre_dtk)|add),kerja:(map(.kerja_dtk)|add)})' qc/jobs.jsonl`.
