# Bekerja di Skill Development

Repo ini menyimpan cara kerja AI bersama Irfan. **Pintu masuknya satu: file ini → [PETA.md](PETA.md) → [PENDING.md](PENDING.md).** Tabel Rute di PETA menunjuk file yang dibuka untuk pekerjaanmu, jadi buka hanya itu, bukan seluruh repo. [README.md](README.md) dan [INDEX.md](INDEX.md) adalah katalog, bukan pintu. Urutan otoritas mengikuti katalog; instruksi langsung Irfan tetap menang.

## Cara membaca repo ini

Berlaku untuk pekerja, subagen, dan auditor. Tujuannya: setiap keputusan diambil dari aturan yang benar-benar dibaca, bukan dari ingatan atau pencarian kata.

1. **Satu pintu.** Mulai dari file ini → Rute di PETA → PENDING. Saat mendelegasikan, sebut rutenya di brief, supaya subagen tahu bobot tiap aturan yang ia baca.
2. **Tiga bobot aturan.** `LANTAI.md` berlaku di semua video. `guide/` dan kartu `pustaka/kartu/` adalah cara memutuskan bersyarat dan kiblat gaya, berlaku bagi video yang memakainya. `projects/<proyek>/DECISIONS.md` berlaku untuk satu video. Baris bertanggal di `references/` dibaca bersama kondisi yang melahirkannya.
3. **Setiap pesan baru memilih rute.** Cocokkan dengan satu baris Rute sebelum edit pertama, juga di tengah sesi panjang. Keluhan atas video yang sudah dirender selalu masuk rute revisi, sekecil apa pun.
4. **Baca file rute sampai habis.** `grep` hanya untuk menemukan lokasi.
5. **Cari jawabannya di repo sebelum bertanya.** Bila tetap harus bertanya, sebut file yang sudah dibaca dan apa yang tidak terjawab.

| Sebelum menulis | Butuh | Tidak cukup |
|---|---|---|
| "aturannya tidak ada" | `LANTAI.md`, kartu yang dipakai proyek (di `RESEP.md`), dan docstring skrip juri yang mengukurnya, dibaca utuh | pencarian kata |
| "sudah beres / lulus" | keluaran alat atau ukuran (frame, detik) dari hasil terbaru | still acak, verdict dari render sebelumnya |
| perubahan pada video yang sudah dikirim | tiap lapisan yang berubah menunjuk satu butir ledger `DECISIONS.md` | "sekalian dirapikan" |

## Awal sesi (wajib, sebelum bekerja)

1. Ambil `main` terbaru. Skill di `main` adalah satu-satunya sumber aturan.
   - Jalankan `./tools/doctor.sh` (hanya mengecek). Bila GAGAL, jangan mulai pekerjaan: laporkan hasilnya ke Irfan dan minta persetujuan untuk `./tools/doctor.sh --fix` (memasang skill `claude/*` sebagai symlink ke akun Claude Code dan Codex yang dipakai; skill Remotion resmi ke Claude). Setelah disetujui, jalankan lalu cek ulang (Irfan 8, 16 Nov).
   - Skill yang baru dipasang mungkin belum masuk daftar skill sesi ini: baca SKILL.md-nya langsung dari repo. Jangan bekerja dari ingatan atau dari skill lain yang namanya mirip.
   - Skill di `archive/` (`motion-director`, `motion-graphic-playbook`, `irfan-motion-director`) sudah digabung ke `claude/motion-graphic`; bila masih muncul di daftar skill (misalnya dari pustaka akun claude.ai), abaikan dan laporkan ke Irfan.
2. Baca [PENDING.md](PENDING.md). Barisnya bukan aturan. Baris yang menyangkut tugas ini ditanyakan di chat sesi ini, satu pesan: ya / tidak. Jangan menunggu filenya dibuka.
3. Cek branch yang belum masuk `main` dan mengubah `claude/` (`git log origin/main..origin/<branch> -- claude/`). Bila ada, laporkan ke Irfan sebelum mulai.

## Akhir sesi (wajib, sebelum menutup)

1. Skill adalah cara memutuskan, bukan template (Irfan 15 Nov): koreksi spesifik Irfan hanya mengubah video itu, sedangkan alasannya ditulis sebagai learning "bila…, pilih…, karena…" di `guide/<urusan>/GUIDE.md` §Cara memutuskan, tanpa menanyakan cakupannya ke Irfan (`pustaka/README.md` §Tumbuh). Pelajaran yang Irfan setujui (termasuk jawaban "oke") disimpan di tempat yang cakupannya paling sempit dan masih benar. Untuk video ikuti `claude/motion-graphic/pustaka/README.md` §Tumbuh: koreksi satu video → `projects/<proyek>/DECISIONS.md`; cara memakai satu gaya → "Catatan pakai" di kartu kiblatnya; frame yang ditolak → `pustaka/contoh-gagal/`; hal yang berlaku di semua video → usul ke `PENDING.md`, dan baru masuk `LANTAI.md` setelah muncul di dua video berbeda dan Irfan menyetujui bunyinya. Satu koreksi tidak dijadikan larangan umum (gagal: "tanpa serif" 4 Nov, caption 9 Nov). Skill lain: tulis ke file skill tempat aturannya berlaku; aturan lama yang bertentangan diganti di tempat. Instruksi untuk satu sesi atau satu proyek (pembagian model, urutan kerja, cara QC) mengikuti jalur yang sama dengan koreksi video: masuk `projects/<proyek>/DECISIONS.md` dulu, dan baru ditulis ke `references/` sebagai panduan bersyarat yang menyebut kondisinya.
2. Setiap aturan baru diakhiri tanda sumber singkat: `(Irfan 4 Nov)`, `(Irfan oke 4 Nov, dari ref X)`, atau `(gagal: proyek vN)`.
3. Pelajaran yang belum disetujui masuk ke `PENDING.md`, satu baris, **dan ditanyakan di chat sesi yang sama** (ya / tidak) sebelum sesi ditutup. File itu hanya catatan bila belum dijawab, bukan tempat menunggu.
4. Perubahan skill masuk ke `main` di sesi yang sama (merge atau pull request yang disebut ke Irfan). Jangan tinggalkan pelajaran di branch.
5. Pesan commit menyebut agen: `Agent: Claude`, `Agent: Codex`, dsb.
6. Skill tetap ringkas: satu aturan satu baris bila bisa, detail di `references/`.
7. File ditambah/diubah/dihapus → `python3 tools/peta.py` sebelum commit (doctor menandai PETA.md basi).

## Jadisatu Canvas · semua klien MCP

Untuk membaca, mengubah, atau menghubungkan ruang Jadisatu Canvas, muat [claude/jadisatu-canvas/SKILL.md](claude/jadisatu-canvas/SKILL.md). Nama folder `claude/` adalah konvensi penyimpanan repo; aturan skill ini berlaku juga bagi Codex dan klien MCP lain. Baca referensi konfigurasi hanya untuk klien yang sedang dipakai. Klien tanpa akses repo dapat menerima berkas skill sebagai instruksi dari pemilik.

Pemuatan skill dan pemberian akses MCP adalah dua langkah terpisah. Jangan memasang pengaturan global, menyalin token, memberi akses penyedia baru, atau menganggap room yang direset masih membawa konteks lama hanya karena skill tersedia.

## Sesi scriptwriter

Untuk pengembangan ide, naskah, dan storyboard, baca [scriptwriter/README.md](scriptwriter/README.md). Folder itu menyimpan mandat peran dan pengembangan cara kerja. Skill aktif tetap berada di `claude/`; hindari membuat skill kedua untuk konsep yang sudah ada.

Gunakan `claude/working-with-irfan/SKILL.md` untuk cara berkolaborasi, `claude/script-workshop/SKILL.md` untuk pengembangan naskah, dan cabang `claude/motion-graphic/references/storyboard.md` saat naskah sudah final. Muat cabang tambahan sesuai kebutuhan, bukan semua referensi sekaligus. Untuk proyek yang punya rencana tertulis, gunakan `claude/autopilot-prd/SKILL.md` dalam cakupan permintaan aktif.

## Menyimpan kemajuan

- Pisahkan keputusan khusus satu konten di `projects/<proyek>/` dari cara kerja yang dapat dipakai lintas konten.
- Simpan alasan keputusan, bukti yang dilihat, dan dampak revisi. Satu hasil bagus belum membuktikan sebuah aturan berlaku umum.
- Perubahan skill mengikuti [EVALS-DESIGN.md](EVALS-DESIGN.md): simpan kasus, bandingkan perilaku lama dan baru, lalu terapkan sesuai gerbangnya. Status awal atau dugaan tidak boleh dilaporkan sebagai hasil teruji.
- Irfan mengizinkan kemajuan dalam tugas ini diperbarui ke GitHub. Setelah pemeriksaan dan audit yang diwajibkan lingkungan kerja, commit dan push perubahan dalam cakupan tugas dengan pesan yang menjelaskan kemajuannya. Periksa perubahan remote sebelum push; jangan menimpa pekerjaan agent lain.
- Catat titik lanjut di `scriptwriter/DAILY.md` dan kirim laporan ke `ops-report` bila tersedia. Dokumen sesi ini bukan izin mengambil seluruh antrean proyek lain di repo.

Mesin atau akun baru wajib lolos `tools/doctor.sh` sebelum bekerja; pemasangan lewat `--fix` dengan persetujuan Irfan (gagal: PC server 8 Nov, akun claude2 tanpa skill video). Dependensi media lain (demucs, model besar) dipasang hanya bila tugasnya butuh.
