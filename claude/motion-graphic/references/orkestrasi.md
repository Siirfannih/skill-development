# Orkestrasi: kamu memimpin, model lain yang mengulang

**Satu model sudah cukup:** kamu yang membangun dan menilai, dalam putaran terpisah (bangun dulu; menilai dari gambar sebelum membaca catatan buildmu sendiri). Satu model membaca §4 (satu penilai), §5 (anggaran token), §6 butir 3 (render ulang hanya yang berubah) dan §7 (disk); §1–§3 dan §8 hanya bila kamu mendelegasikan ke subagen atau model lain. Jangan mengulang proyek dari awal, dan ubah kode serta alat yang sudah ada, jangan menulis ulang.

## 0. Kenapa aku menulis ini
- Selama ini satu sesi mengerjakan semuanya sendiri: build, render, audit 30 frame per detik, revisi. Akibatnya kuota 5 jam habis dalam ±3 jam, dan sekitar 75% kuota mingguan habis dalam beberapa hari.
- Aku sering menjalankan beberapa sesi video bersamaan. Kalau pola kerjanya tidak berubah, kuota habis sebelum videonya selesai.
- Revisi kecil saja bisa menunggu render 1–2 jam.
- Disk sempit membuat render crash. Pembersihan cache bisa membebaskan lebih dari 8 GB, tapi sesi sebelumnya tidak melakukannya.

Audit semua frame per detik sebelum render final, tanpa sampling, tetap wajib. **Penilainya satu, yaitu kamu**, dan caranya melihat: frame tahan (satu per detik) di semua potongan, lembar 30 frame hanya di detik bertanda otomatis. Token dihemat dengan tidak memakai penilai kedua, bukan dengan tidak melihat.

## 1. Peran (bila mendelegasikan)
Bawaan satu model: kamu sutradara, pembangun, dan QC; pekerjaan yang berulang dikerjakan script. Bila ada pekerja lain (subagen) dan itu mempercepat: kamu merancang, menulis perintah yang tepat dan lengkap, lalu menilai hasilnya; tabel ini membagi pekerjaannya. Pekerja yang tidak ada = kolom Bagianmu menjadi bagianmu juga.

| Pekerjaan | Utama | Cadangan | Bagianmu |
|---|---|---|---|
| Menulis/ubah kode adegan Remotion, typecheck | Subagen `model: sonnet` atau `claude -p` | Kamu sendiri | Bila pekerja ada: perbaikan ≤ 10 baris boleh kamu tulis sendiri; tanpa pekerja, kamu yang membangun |
| Render still/draft/frames/final, `frame_audit.py`, mix, cek mekanis | Script (`render.sh`, runner) | — | Jalankan perintahnya saja, baca ≤ 20 baris log terakhir |
| Cari file, ringkas log, eksplorasi kode, cek diff baris per baris | Subagen `model: haiku` / `sonnet` | — | Tidak |
| Riset aset/referensi | Model riset lain bila tersedia | — | Tidak |
| Juri still vs referensi (R6), **menilai semua frame tahan** terhadap kiblat dan contoh gagal + solusi desain dari kartu (§4), devil's advocate, putusan konflik, `DECISIONS.md`, Delivery Gate, bicara denganku | — | — | **Ya, ini inti kerjamu** |


Pembuat menilai hasilnya lewat putaran terpisah: bila ada pekerja, ia yang membangun dan kamu yang menilai; bila tidak, kamu membangun, lalu menilai dari gambar sebelum membaca catatan buildmu.

## 2. Cek akses dulu, jangan menebak (hanya bila mendelegasikan)
Lakukan sekali di awal sesi dan catat hasilnya di `STATUS.md`; tidak ada jalur sama sekali = kamu membangun sendiri (§0):
1. Cek apa yang ada: subagen (tool Agent), `claude -p`. Jangan mengarang host atau jalur; yang tidak terbukti ada dianggap tidak ada.
2. Bila sebuah jalur gagal 2× berturut-turut, tandai jalur itu mati di `STATUS.md` dan pakai cadangannya; bila cadangan juga tidak ada, tulis di `STATUS.md` bahwa kamu membangun sendiri.

- **Satu sistem desain, banyak pekerja.** Konsistensi datang dari file yang dipakai bersama, bukan dari satu pekerja yang mengingat semuanya. Urutannya: (1) **Sutradara sendiri** menulis `remotion/src/<…>/bersama/tema.ts` dari `BRAND.md`, `EDITING.md`, `RESEP.md`, dan preview storyboard yang disetujui: semua warna, skala huruf, jarak, bayangan, dan kurva gerak sebagai token bernama berkategori (`templates/sistem-desain/README.md`); (2) **satu pekerja** membangun komponen bersama untuk tiap jenis elemen (teks kinetik, kartu, jendela UI, bubble) dari token itu, lalu Sutradara menyetujui papan acuan (still komponen di atas footage asli); (3) **satu pekerja baru per TASK adegan** hanya menyusun dari token dan komponen itu: tidak menulis warna, huruf, atau ukuran baru. Adegan yang butuh komponen atau token baru → pekerja bertanya ke Sutradara, Sutradara menambahkannya ke sistem bersama. Setelah tiap pekerja, satu subagen sekali pakai menyandingkan still semua adegan dalam satu lembar dan hanya mencari bagian yang tidak sekeluarga. Referensi yang user beri sebagai contoh gaya dipakai gayanya saja, bukan isinya.

- **RESEP dulu, baru builder.** TASK komponen visual baru dikirim setelah `RESEP.md` tertulis dan lulus `resep_check.py`. Gerbang still (G2) hanya menerima lembar sanding: still di atas footage/kanvas final berdampingan dengan keyframe kiblat, bukan still di latar uji polos.

## 3. Perintah untuk pekerja (hanya bila mendelegasikan)
Setiap tugas untuk pekerja kamu tulis sebagai satu file `handoff/TASK-<beat>-<ronde>.md` dengan isi lengkap. Pekerja tidak boleh perlu bertanya atau menebak.

```
TUJUAN       satu kalimat: apa yang harus benar setelah tugas ini
KONTEKS      kutipan beat dari contract.json (jendela VO, teks layar persis, kode G/T/C/X, SFX + waktu) — kutip, jangan rujuk
FILE BOLEH   daftar path persis yang boleh diubah; selain itu dilarang
TEMUAN       ID temuan + detik/frame + yang terlihat + perbaikan yang diminta (dari §4)
BRIEF GAMBAR frame footage beat ini + frame kunci atau klip kartu (bukan tabel angka) + still spine gaya untuk peran teks yang dipakai (R1–R6) + maksud adegan satu kalimat + teknik yang dipinjam dengan "Pakai bila" dan "Bila kondisinya beda, sesuaikan"-nya, dicocokkan dengan lembar kondisi footage + pelajaran guide yang cocok + contoh gagal yang mirip
LARANGAN     aturanku yang relevan untuk beat ini saja (maks 8 baris, salin dari NEGATIF/SKILL/DECISIONS)
LULUS BILA   tugas visual: still sanding (still kita di samping frame kunci kartu dan still spine) yang dinilai Sutradara dengan pertanyaan "Yang harus terasa sama" dari kartu; ditambah syarat yang memang terukur: "typecheck lulus", "teks 'build' terlihat penuh f312–f340", "tidak mengubah beat lain (baseline_lock)". Ronde revisi: klip rentang yang berubah + lembar still sebelum/sesudah, bukan master penuh (`revisi.md` §Order before the first edit butir 6)
JANGAN       render final, ubah kontrak, sentuh beat lain, merancang komponen baru; ubah atribut terlihat yang tidak disebut di sini (warna, huruf, ukuran, posisi, waktu, gerak); menafsir kata kabur sendiri (tanya Sutradara saat itu juga)
LAPORAN      tulis handoff/REPORT-<beat>-<ronde>.md: file yang diubah, alasan per temuan, hasil typecheck
```

Konteks pekerja sengaja ramping. Jangan suruh pekerja membaca `SKILL.md`, `RETRO.md`, atau `NEGATIF.md` penuh. Kamu yang memilih baris yang relevan. **Untuk pekerja visual kamu menulis brief bergambar**: frame footage beat itu, frame kunci atau klip kartu yang dipinjam, still spine gaya (`qc/spine/`), maksud adegan, dan per teknik blok teknik kartu yang relevan (Yang terlihat, Kenapa bekerja, Pakai bila/Jangan pakai bila, Bila kondisinya beda sesuaikan) yang sudah kamu cocokkan dengan lembar kondisi footage (`qc/kondisi/KONDISI.md`). Ditambah pelajaran `guide/<urusan>/GUIDE.md` §Cara memutuskan yang kondisinya cocok dan entri `cookbook/contoh-gagal/` yang mirip. Format: `templates/handoff-fase.md`. Angka dari kartu tidak masuk brief sebagai target; bila perlu, sebutkan sebagai pengamatan. Tanpa gambar dan syarat teknik, pekerja membangun dari ringkasan satu baris dan syaratnya tertinggal.

Masalah yang melintasi adegan (keluarga gaya, skala teks antarperan, ritme, kata ganda antara teks layar dan isi UI) dimiliki Sutradara, bukan pekerja adegan: Sutradara memperbaikinya di spine atau sistem bersama lalu menurunkannya ke TASK.

Saat menilai hasil pekerja, baca `REPORT` + `git diff --stat` + paling banyak 3 file kunci + hasil gerbang. Jangan membaca transkrip pekerja.

## 4. Menilai frame: satu penilai
Caranya ada di `templates/roles/pemeriksa-frame.md`; alatnya `scripts/juri/frame_audit.py`. Dijalankan setelah visual selesai dan sebelum SFX/musik disusun; audio dinilai terpisah sesudah SFX dikunci (`frame_audit.py --fase audio`, `templates/roles/pemeriksa-audio.md`).
1. `render.sh <proyek> frames` → `frame_audit.py`. Hasilnya per potongan ≤ 10 dtk: `tahan/t<detik>_f<frame>.jpg` (satu frame tenang per detik, ukuran besar), `s<detik>.jpg` (30 frame kecil), plus `INFO.md`.
2. Buka frame kunci kiblat dan `cookbook/contoh-gagal/`, lalu semua frame tahan. Lihat, katakan apa yang salah, dan beri solusi desain dari kartu untuk frame yang lemah.
3. Lembar 30 frame dibuka hanya di detik bertanda otomatis (LOMPAT/KEDIP/BEKU) atau yang geraknya kamu ragukan.
4. Tulis `VERDICT.md` tiap potongan, baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL` (format yang dibaca `render.sh final`). Baris GAGAL menjadi TASK pekerja.
5. Tidak ada pemeriksa lain di depan atau di belakangmu. Bila kuotamu sempit dan ada subagen, serahkan penilaian satu video utuh ke **satu** subagen dengan brief yang sama, dan pakai hasilnya langsung. Tanpa subagen, nilai sendiri dari gambar, sebelum membaca catatan buildmu.
6. Potongan yang isinya tidak berubah sejak putusan terakhir **tidak dinilai ulang** selama ronde kerja. Pengecualian: (a) bila user berkomentar tentang video itu, proteksi frame identik gugur untuk semua potongan yang terkena komentarnya (komentar user tentang hal lintas adegan berarti seluruh video); (b) putaran akhir sebelum `final` memakai `frame_audit.py --akhir`, yang menandai semua potongan `perlu periksa` walau HASH sama dan menyimpan putusan lama di `VERDICT.prev.md`. `frame_audit.py` mengikat setiap VERDICT ke `HASH:` isi potongan dan menandai di `INDEX.md` mana yang `dipakai ulang` dan mana yang `perlu periksa`; `VERDICT.prev.md` memuat temuan ronde sebelumnya. `render.sh final` menolak LULUS yang HASH-nya tidak cocok dengan isi sekarang.

## 5. Anggaran token (wajib)
- Yang kamu buka: still juri R6, semua frame tahan (satu per detik), dan lembar 30 frame hanya di detik bertanda otomatis (§4.3). Lembar 30 frame lainnya tidak dibuka.
- Gambar maks 960 px. Untuk hal yang terlihat (gaya, posisi, keterbacaan, keseimbangan), gambar dulu; angka skrip hanya untuk yang tidak terlihat di gambar (sinkron frame, level audio).
- Baca skill hanya cabang yang relevan. `RETRO.md` jangan dibaca utuh: pakai `grep` untuk topik beat yang sedang dikerjakan.
- Render dan ffmpeg dijalankan di latar belakang. Baca ≤ 20 baris log terakhir.
- Menunggu job panjang tanpa polling: `tools/tunggu.sh jalan <nama> -- <perintah>`, kerjakan hal lain, lalu **satu** panggilan `tools/tunggu.sh tunggu <nama> 1500` (timeout alat ≥ 1500 dtk). Jangan mengecek status berulang: tiap cek membangunkan model dengan seluruh konteksnya.
- Subagen dan pekerja menerima brief ramping (§3), bukan disuruh "baca repo".
- Bila memakai subagen: isi `model` secara eksplisit; satu pekerja maksimal 60 turns dan 10 pembacaan gambar; still digabung dulu ke satu contact sheet sebelum dibaca.
- Video sumber panjang jangan ditonton. Transkrip Whisper (`words.json`; faster-whisper lokal, atau di PC server bila ada) → pilih segmen dari teks → `yt-dlp --download-sections` hanya untuk segmen itu.
- `STATUS.md` selalu diperbarui, supaya sesi yang terputus bisa lanjut tanpa membaca ulang semuanya.

## 6. Render lebih cepat
Urutannya: ukur dulu, baru ubah.
1–2. **GPU dan konkurensi: sudah otomatis.** Bila `doctor.sh` melaporkan "mesin ini belum dibenchmark", sesi video pertama di mesin itu menjalankan `tools/bench-render/bench.sh` sekali (±10–15 menit, memakai kunci render global, jadi aman bila sesi lain sedang render): adegan uji berat (blur, glow, grain) dirender dengan `--gl` default, angle-egl, vulkan, swangle, angle; opsi yang gagal atau gambarnya beda (PSNR < 35 dB) dibuang, opsi non-default dipilih hanya bila ≥ 10 % lebih cepat; lalu konkurensi 2, 4, … sampai jumlah thread diuji. Hasilnya `~/work/render-profile.json`, dibaca otomatis oleh `render.sh` dan `lego/lapisan.py` (hanya di mesin yang sama; env `GL`/`KONKURENSI` tetap menang) dan dicatat di `qc/jobs.jsonl`. Ulangi benchmark hanya bila hardware/driver/versi Remotion berubah. 
3. **Render ulang hanya yang berubah.** Revisi satu adegan = still adegan itu → `frames` hanya untuk rentang beat itu → audit potongan itu → `final` dengan rentang itu → sambung dengan ffmpeg. Jangan merender ulang seluruh video.
4. **Efek mahal.** Bila GPU tidak bisa dipakai, `blur`/`filter` pada lapisan yang diam diganti gambar yang sudah di-blur (pre-render sekali). Blur yang ikut gerak kamera tetap dibiarkan.
5. **Opsional: render di mesin lain (agen cloud atau VPS, bila tersedia)** hanya bila ada, langkah 1 gagal, **dan** mesin itu terbukti punya GPU; tanpa itu, render di mesin sendiri per rentang (butir 3):
   - cari cara memanggil mesin itu (path dan perintahnya; jangan mengarang);
   - minta mesin itu menjalankan `nvidia-smi` / `npx remotion gpu` dan melaporkan hasilnya;
   - bila ada GPU: kirim `qc/.bundle` + `public/` + perintah render rentang yang persis (format §3), terima MP4, cek durasi dan checksum, lalu sambung;
   - bila tidak ada GPU atau tidak bisa diverifikasi: jangan dipakai, catat di `STATUS.md`.
6. **Beberapa sesi bersamaan.** `heavy_lock` (frames/final) tetap satu per waktu di satu mesin. Still dan draft tidak memakai kunci, jadi kerjakan itu sambil menunggu giliran.

## 7. Disk (gerbang sebelum `frames` dan `final`, juga di awal sesi)
Cek ruang disk (`df -BG` pada disk proyek dan `/tmp`) sebelum `frames`/`final`. Bila sempit, hapus hanya cache milik proyekmu sendiri dengan path literal (`qc/frames/`, `qc/frame_audit/` versi lama yang sudah digantikan, `qc/.bundle` lama, `out/chunks/` setelah sambung berhasil) dan catat di `STATUS.md`; jangan menghapus hasil kirim, aset sumber, stem audio final, atau milik proyek lain. Bila masih sempit, render final per rentang lalu sambung; jangan memaksa render penuh.

## 8. Batas dan eskalasi
- Maksimal 3 ronde per beat. Gagal 2× di butir yang sama = ganti pendekatan: rancang ulang perintahnya, jangan mengulang perintah yang sama.
- Pekerja yang gagal 2× di tugas yang sama naik satu tingkat: pekerja lain bila ada, lalu kamu.
- Perubahan pada alat bersama (`render.sh`, `frame_audit.py`, file ini) dikerjakan **satu sesi saja**, lalu di-push. Sesi lain cukup `git pull`. Jangan sampai beberapa sesi mengedit file yang sama.
