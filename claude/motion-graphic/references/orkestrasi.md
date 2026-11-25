# Orkestrasi: kamu memimpin, model lain yang mengulang

Baca file ini sampai habis sebelum mengerjakan build, render, atau QC video. Kalau sesimu sudah berjalan, terapkan mulai langkah kerja berikutnya. Jangan mengulang proyek dari awal, dan ubah kode serta alat yang sudah ada, jangan menulis ulang.

## 0. Kenapa aku menulis ini
- Selama ini satu sesi mengerjakan semuanya sendiri: build, render, audit 30 frame per detik, revisi. Akibatnya kuota 5 jam habis dalam ±3 jam, dan sekitar 75% kuota mingguan habis dalam beberapa hari.
- Aku sering menjalankan beberapa sesi video bersamaan. Kalau pola kerjanya tidak berubah, kuota habis sebelum videonya selesai.
- Revisi kecil saja bisa menunggu render 1–2 jam.
- Disk sempit membuat render crash. Pembersihan cache bisa membebaskan lebih dari 8 GB, tapi sesi sebelumnya tidak melakukannya.

Audit semua frame per detik sebelum render final, tanpa sampling, tetap wajib. **Penilainya satu, yaitu kamu**, dan caranya melihat: frame tahan (satu per detik) di semua potongan, lembar 30 frame hanya di detik bertanda otomatis. Token dihemat dengan tidak memakai penilai kedua, bukan dengan tidak melihat.

## 1. Peran
Kamu adalah **sutradara, prompt engineer, dan QC**. Kamu merancang, menulis perintah yang tepat dan lengkap untuk model pekerja, lalu menilai hasilnya. Semua pekerjaan yang berulang dikerjakan model lain atau script.

| Pekerjaan | Utama | Cadangan | Bagianmu |
|---|---|---|---|
| Menulis/ubah kode adegan Remotion, typecheck | **Codex (ChatGPT Pro 5x)** lewat `tools/codex-pc.sh` di PC, atau `gpt-bridge` di Mac | Subagen `model: sonnet` | Jangan menulis kode adegan sendiri, kecuali perbaikan ≤ 10 baris |
| Render still/draft/frames/final, `frame_audit.py`, mix, cek mekanis | Script (`render.sh`, runner) | — | Jalankan perintahnya saja, baca ≤ 20 baris log terakhir |
| Cari file, ringkas log, eksplorasi kode, cek diff baris per baris | Subagen `model: haiku` / `sonnet` | Codex | Tidak |
| Riset aset/referensi | Maximus (Grok) | Codex | Tidak |
| Juri still vs referensi (R6), **menilai semua frame tahan** terhadap kiblat dan contoh gagal + solusi desain dari kartu (§4), devil's advocate, putusan konflik, `DECISIONS.md`, Delivery Gate, bicara denganku | — | — | **Ya, ini inti kerjamu** |

**Codex minta pendapat visual Claude** (sesi yang sudah dipegang Codex tidak dipindah): `tools/tanya-claude.sh <proyek> <pertanyaan.md> [still …]`. Syaratnya arah video sudah tertulis dan disetujui (RESEP.md + kiblat; alat menolak bila belum). Claude tidak membaca kode; ia menerima dosir yang dirakit otomatis dari dokumen arah yang sudah ada (`LANTAI.md`, kartu kiblat, `RESEP.md`, baris Aktif `DECISIONS.md`, `STATUS.md`, opsional `handoff/KONSUL.md` dari `templates/roles/konsul.md` untuk "sudah dicoba dan gagal"), ±14 ribu token, ditambah `LANTAI`, cara menilai (`templates/roles/pemeriksa-frame.md`), dan panduan urusan yang ditanya (`KONSUL_PANDUAN=teks,visual` bawaan; gerak/sfx/audio sesuai pertanyaan). Lampirannya **frame yang sudah dibedah secara visual dan bernomor**, bukan kode: folder potongan `qc/frame_audit/cNN_…` (30 frame bernomor per detik + strip audio + INFO.md; gerak dinilai dari urutannya), `qc/sanding.jpg` (kita vs kiblat), lembar A/B asli vs kandidat, atau still (≤ 960 px). Claude menjawab dalam tabel `dtk | frame | jenis | yang terlihat | perbaikan konkret | dasar` (dasar = kode LANTAI, R-/D-, atau bagian kartu; tanpa dasar = "selera", opsional) + `PUTUSAN`, lalu Codex merevisi frame yang disebut. Urutan menang: catatan Irfan aktif > resep + kiblat > LANTAI > pendapat Claude. Satu sesi Claude dilanjutkan hanya selama cache hangat (< 270 dtk) dan konteks < 120 ribu token; di luar itu sesi baru dari dosir, karena sesi panjang mengirim ulang seluruh riwayatnya di setiap panggilan. Kumpulkan pertanyaan satu ronde lalu tanyakan berurutan. Jawaban yang diterapkan dicatat sebagai baris baru di `DECISIONS.md` (sumber: konsul NN), supaya konsultasi berikutnya ikut membacanya. Pemakaian token: `handoff/konsul/konsul.jsonl`.

Pembuat tidak menilai hasilnya sendiri: yang membangun adegan adalah pekerja, yang menilai adalah kamu.

## 2. Cek akses dulu, jangan menebak
Lakukan sekali di awal sesi dan catat hasilnya di `STATUS.md`:
1. Di PC: `which codex && codex login status`. Bila tidak ada, pakai `gpt-bridge` di Mac (`~/AI-OPS/gpt-bridge/gpt`, lihat `autopilot-video/tools/gpt-bridge/README.md`) lewat koneksi PC→Mac yang sudah dipakai sesi sebelumnya. Cari caranya di riwayat atau skrip yang ada, jangan mengarang host.
3a. Di PC, Codex dijalankan penuh di terminal lewat `tools/codex-pc.sh <folder proyek> handoff/TASK-xx.md [-i lampiran…]` (isinya `codex exec --sandbox danger-full-access -C <folder>`). Alasannya: sandbox bubblewrap tidak jalan di PC ("bwrap: Operation not permitted"), sehingga Codex ber-sandbox tidak bisa membuka folder kerja. Batasnya: TASK wajib memuat FILE BOLEH / FILE JANGAN (skrip menolak TASK tanpa itu), dan pembuat tidak memeriksa hasilnya sendiri. Lampiran gambar lewat `-i` ditaruh SESUDAH file TASK. `agy -p` di PC kosong/timeout untuk lampiran 10 lembar → jalur Gemini lewat subagen `model: sonnet`.
3. Bila sebuah jalur gagal 2× berturut-turut, tandai jalur itu mati di `STATUS.md` dan pakai cadangannya. **Jangan diam-diam kembali menulis kode adegan sendiri.**

- **Satu sistem desain, banyak pekerja.** Konsistensi datang dari file yang dipakai bersama, bukan dari satu pekerja yang mengingat semuanya. Urutannya: (1) **Sutradara sendiri** menulis `remotion/src/<…>/bersama/tema.ts` dari `BRAND.md`, `EDITING.md`, `RESEP.md`, dan preview Storyboard/block out yang disetujui: semua warna, skala huruf, jarak, bayangan, dan kurva gerak sebagai token bernama berkategori (`templates/sistem-desain/README.md`); (2) **satu pekerja** membangun komponen bersama untuk tiap jenis elemen (teks kinetik, kartu, jendela UI, bubble) dari token itu, lalu Sutradara menyetujui papan acuan (still komponen di atas footage asli); (3) **satu pekerja baru per TASK adegan** hanya menyusun dari token dan komponen itu: tidak menulis warna, huruf, atau ukuran baru. Adegan yang butuh komponen atau token baru → pekerja bertanya ke Sutradara, Sutradara menambahkannya ke sistem bersama. Setelah tiap pekerja, satu subagen sekali pakai menyandingkan still semua adegan dalam satu lembar dan hanya mencari bagian yang tidak sekeluarga. Referensi yang Irfan beri sebagai contoh gaya dipakai gayanya saja, bukan isinya.

- **RESEP dulu, baru builder.** TASK komponen visual baru dikirim setelah `RESEP.md` tertulis dan lulus `resep_check.py`. Gerbang still (G2) hanya menerima lembar sanding: still di atas footage/kanvas final berdampingan dengan keyframe kiblat, bukan still di latar uji polos.

## 3. Perintah untuk pekerja (prompt engineering)
Setiap tugas untuk pekerja kamu tulis sebagai satu file `handoff/TASK-<beat>-<ronde>.md` dengan isi lengkap. Pekerja tidak boleh perlu bertanya atau menebak.

```
TUJUAN       satu kalimat: apa yang harus benar setelah tugas ini
KONTEKS      kutipan beat dari contract.json (jendela VO, teks layar persis, kode G/T/C/X, SFX + waktu) — kutip, jangan rujuk
FILE BOLEH   daftar path persis yang boleh diubah; selain itu dilarang
TEMUAN       ID temuan + detik/frame + yang terlihat + perbaikan yang diminta (dari §4)
BRIEF GAMBAR frame footage beat ini + frame kunci atau klip kartu (bukan tabel angka) + still spine gaya untuk peran teks yang dipakai (R1–R6) + maksud adegan satu kalimat + teknik yang dipinjam dengan "Pakai bila" dan "Bila kondisinya beda, sesuaikan"-nya, dicocokkan dengan lembar kondisi footage + pelajaran guide yang cocok + contoh gagal yang mirip
LARANGAN     aturanku yang relevan untuk beat ini saja (maks 8 baris, salin dari LANTAI/SKILL/DECISIONS)
LULUS BILA   tugas visual: still sanding (still kita di samping frame kunci kartu dan still spine) yang dinilai Sutradara dengan pertanyaan "Yang harus terasa sama" dari kartu; ditambah syarat yang memang terukur: "typecheck lulus", "teks 'build' terlihat penuh f312–f340", "tidak mengubah beat lain (baseline_lock)". Ronde revisi: klip rentang yang berubah + lembar still sebelum/sesudah, bukan master penuh (`revision-log.md` §0 butir 6)
JANGAN       render final, ubah kontrak, sentuh beat lain, merancang komponen baru; ubah atribut terlihat yang tidak disebut di sini (warna, huruf, ukuran, posisi, waktu, gerak); menafsir kata kabur sendiri (tanya Sutradara saat itu juga)
LAPORAN      tulis handoff/REPORT-<beat>-<ronde>.md: file yang diubah, alasan per temuan, hasil typecheck
```

Konteks pekerja sengaja ramping. Jangan suruh pekerja membaca `SKILL.md`, `RETRO.md`, atau `LANTAI.md` penuh. Kamu yang memilih baris yang relevan. **Untuk pekerja visual kamu menulis brief bergambar**: frame footage beat itu, frame kunci atau klip kartu yang dipinjam, still spine gaya (`qc/spine/`), maksud adegan, dan per teknik blok teknik kartu yang relevan (Yang terlihat, Kenapa bekerja, Pakai bila/Jangan pakai bila, Bila kondisinya beda sesuaikan) yang sudah kamu cocokkan dengan lembar kondisi footage (`qc/kondisi/KONDISI.md`). Ditambah pelajaran `guide/<urusan>/GUIDE.md` §Cara memutuskan yang kondisinya cocok dan entri `cookbook/contoh-gagal/` yang mirip. Format: `templates/handoff-fase.md`. Angka dari kartu tidak masuk brief sebagai target; bila perlu, sebutkan sebagai pengamatan. Tanpa gambar dan syarat teknik, pekerja membangun dari ringkasan satu baris dan syaratnya tertinggal.

Masalah yang melintasi adegan (keluarga gaya, skala teks antarperan, ritme, kata ganda antara teks layar dan isi UI) dimiliki Sutradara, bukan pekerja adegan: Sutradara memperbaikinya di spine atau sistem bersama lalu menurunkannya ke TASK.

Saat menilai hasil pekerja, baca `REPORT` + `git diff --stat` + paling banyak 3 file kunci + hasil gerbang. Jangan membaca transkrip pekerja.

## 4. Menilai frame: satu penilai
Caranya ada di `templates/roles/pemeriksa-frame.md`; alatnya `scripts/juri/frame_audit.py`. Dijalankan setelah visual selesai dan sebelum SFX/musik disusun; audio dinilai terpisah sesudah SFX dikunci (`frame_audit.py --fase audio`, `templates/roles/pemeriksa-audio.md`).
1. `render.sh <proyek> frames` → `frame_audit.py`. Hasilnya per potongan ≤ 10 dtk: `tahan/t<detik>_f<frame>.jpg` (satu frame tenang per detik, ukuran besar), `s<detik>.jpg` (30 frame kecil), plus `INFO.md`.
2. Buka frame kunci kiblat dan `cookbook/contoh-gagal/`, lalu semua frame tahan. Lihat, katakan apa yang salah, dan beri solusi desain dari kartu untuk frame yang lemah.
3. Lembar 30 frame dibuka hanya di detik bertanda otomatis (LOMPAT/KEDIP/BEKU) atau yang geraknya kamu ragukan.
4. Tulis `VERDICT.md` tiap potongan, baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL` (format yang dibaca `render.sh final`). Baris GAGAL menjadi TASK pekerja.
5. Tidak ada pemeriksa lain di depan atau di belakangmu. Bila kuotamu sempit, serahkan penilaian satu video utuh ke **satu** subagen dengan brief yang sama, dan pakai hasilnya langsung.
6. Potongan yang isinya tidak berubah sejak putusan terakhir **tidak dinilai ulang** selama ronde kerja. Pengecualian: (a) bila Irfan berkomentar tentang video itu, proteksi frame identik gugur untuk semua potongan yang terkena komentarnya (komentar Irfan tentang hal lintas adegan berarti seluruh video); (b) putaran akhir sebelum `final` memakai `frame_audit.py --akhir`, yang menandai semua potongan `perlu periksa` walau HASH sama dan menyimpan putusan lama di `VERDICT.prev.md`. `frame_audit.py` mengikat setiap VERDICT ke `HASH:` isi potongan dan menandai di `INDEX.md` mana yang `dipakai ulang` dan mana yang `perlu periksa`; `VERDICT.prev.md` memuat temuan ronde sebelumnya. `render.sh final` menolak LULUS yang HASH-nya tidak cocok dengan isi sekarang.

## 5. Anggaran token (wajib)
- Yang kamu buka: still juri R6, semua frame tahan (satu per detik), dan lembar 30 frame hanya di detik bertanda otomatis (§4.3). Lembar 30 frame lainnya tidak dibuka.
- Gambar maks 960 px. Untuk hal yang terlihat (gaya, posisi, keterbacaan, keseimbangan), gambar dulu; angka skrip hanya untuk yang tidak terlihat di gambar (sinkron frame, level audio).
- Baca skill hanya cabang yang relevan. `RETRO.md` jangan dibaca utuh: pakai `grep` untuk topik beat yang sedang dikerjakan.
- Render dan ffmpeg dijalankan di latar belakang. Baca ≤ 20 baris log terakhir.
- Menunggu job panjang tanpa polling: `tools/tunggu.sh jalan <nama> -- <perintah>`, kerjakan hal lain, lalu **satu** panggilan `tools/tunggu.sh tunggu <nama> 1500` (timeout alat ≥ 1500 dtk). Jangan mengecek status berulang: tiap cek membangunkan model dengan seluruh konteksnya.
- Subagen dan pekerja menerima brief ramping (§3), bukan disuruh "baca repo".
- Setiap pemanggilan `Agent()` mengisi `model: "sonnet"` atau `"haiku"` secara eksplisit. Satu pekerja maksimal 60 turns dan 10 pembacaan gambar; still digabung dulu ke satu contact sheet sebelum dibaca.
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
- Jumlah ronde per beat dan jumlah frame yang kamu gagalkan per ronde.
- Waktu revisi kecil: dari perintah perbaikan sampai potongan baru lulus audit.
- Waktu render per menit video, sebelum dan sesudah §6.
- Sumber angka waktu: `qc/jobs.jsonl` (ditulis `render.sh` tiap pemanggilan: `antre_dtk` di kunci render, `kerja_dtk`, `rc`, commit). Ringkas: `jq -s 'group_by(.mode)|map({mode:.[0].mode,n:length,antre:(map(.antre_dtk)|add),kerja:(map(.kerja_dtk)|add)})' qc/jobs.jsonl`.
