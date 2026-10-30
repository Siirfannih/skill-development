---
status: rule
scope: global
how_to_use: "Pintu masuk agen. Lanjutkan ke INDEX.md, lalu muat sesuai urutannya."
---

# Bekerja di Skill Development

Repo ini menyimpan cara kerja AI bersama Irfan. Mulai dari [INDEX.md](INDEX.md): aturan inti di `claude/STYLE-CORE.md`, lalu berkas standar proyek bila ada, lalu hanya kartu prinsip yang tugasnya butuh. Bukti di `evidence/` dan arsip tidak dimuat kecuali diminta. Urutan otoritas mengikuti katalog; instruksi langsung Irfan tetap menang.

Saat menulis atau mengubah kode di repo ini, pakai `rtk` (https://github.com/rtk-ai/rtk) untuk perintah shell agar keluaran yang masuk ke konteks lebih kecil.

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

Penyiapan lokal repo tidak mengharuskan menjalankan `tools/sync.sh`, memasang seluruh dependensi media, atau mengubah konfigurasi skill global. Sinkronisasi lintas aplikasi mengikuti cakupan instruksi Irfan.
