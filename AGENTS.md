# Bekerja di Skill Development

Repo ini menyimpan cara kerja AI bersama Irfan. Mulai dari [INDEX.md](INDEX.md), lalu baca hanya skill dan dokumen proyek yang relevan. Urutan otoritas mengikuti katalog; instruksi langsung Irfan tetap menang.

## Awal sesi (wajib, sebelum bekerja)

1. Ambil `main` terbaru. Skill di `main` adalah satu-satunya sumber aturan.
   - Jalankan `./tools/doctor.sh` (hanya mengecek). Bila GAGAL, jangan mulai pekerjaan: laporkan hasilnya ke Irfan dan minta persetujuan untuk `./tools/doctor.sh --fix` (memasang skill `claude/*` dan skill Remotion resmi sebagai symlink ke akun Claude Code yang dipakai). Setelah disetujui, jalankan lalu cek ulang (Irfan 8 Nov).
   - Skill yang baru dipasang mungkin belum masuk daftar skill sesi ini: baca SKILL.md-nya langsung dari repo. Jangan bekerja dari ingatan atau dari skill lain yang namanya mirip.
   - Skill di `archive/` (`motion-director`, `motion-graphic-playbook`, `irfan-motion-director`) sudah digabung ke `claude/motion-graphic`; bila masih muncul di daftar skill (misalnya dari pustaka akun claude.ai), abaikan dan laporkan ke Irfan.
2. Baca [PENDING.md](PENDING.md). Barisnya bukan aturan. Bila ada yang menyangkut tugas ini, tanyakan ke Irfan dalam satu pesan: ya / tidak.
3. Cek branch yang belum masuk `main` dan mengubah `claude/` (`git log origin/main..origin/<branch> -- claude/`). Bila ada, laporkan ke Irfan sebelum mulai.

## Akhir sesi (wajib, sebelum menutup)

1. Pelajaran yang Irfan setujui (termasuk jawaban "oke") disimpan di tempat yang cakupannya paling sempit dan masih benar. Untuk video ikuti `claude/motion-graphic/pustaka/README.md` §Tumbuh: koreksi satu video → `projects/<proyek>/DECISIONS.md`; cara memakai satu gaya → "Catatan pakai" di kartu kiblatnya; frame yang ditolak → `pustaka/contoh-gagal/`; hal yang berlaku di semua video → usul ke `PENDING.md`, dan baru masuk `LANTAI.md` setelah muncul di dua video berbeda dan Irfan menyetujui bunyinya. Satu koreksi tidak dijadikan larangan umum (gagal: "tanpa serif" 4 Nov, caption 9 Nov). Skill lain: tulis ke file skill tempat aturannya berlaku; aturan lama yang bertentangan diganti di tempat.
2. Setiap aturan baru diakhiri tanda sumber singkat: `(Irfan 4 Nov)`, `(Irfan oke 4 Nov, dari ref X)`, atau `(gagal: proyek vN)`.
3. Pelajaran yang belum disetujui masuk ke `PENDING.md`, satu baris.
4. Perubahan skill masuk ke `main` di sesi yang sama (merge atau pull request yang disebut ke Irfan). Jangan tinggalkan pelajaran di branch.
5. Pesan commit menyebut agen: `Agent: Claude`, `Agent: Codex`, dsb.
6. Skill tetap ringkas: satu aturan satu baris bila bisa, detail di `references/`.

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
