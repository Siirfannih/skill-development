---
status: evidence
scope: ai-change-everything
how_to_use: "Kasus mentah. Bukan aturan."
---

# Kasus mentah: narator kehilangan fungsi cerita setelah dua revisi

ID: mg-script-20261029-narrator.
Status: tercatat; belum direproduksi oleh agent baru; belum ada hasil GREEN atau patch skill.
Proyek: [AI change everything](../../../../projects/ai-change-everything/NARRATOR-REVIEW.md).

## Konteks dan bukti

Pengguna meminta menguatkan kandidat pertama untuk personal branding dengan fokus keresahan audiens, bukti yang valid, narator, dan insert tokoh. Bahan sumber serta dua draf ditolak dan kutipan koreksi disimpan di catatan proyek.

- A1, block 73194: narator membuka “Dia takut pekerjaannya diganti AI”, lalu mengenalkan Irfan. Ditolak karena persoalan global bergeser ke pembuat.
- A2, block 49218: insert Sam Altman diikuti laporan angka Klarna. Ditolak karena fungsi narator bergeser menjadi reportase.
- Koreksi verbatim: “Kita nggak nge-report apa yang terjadi di dunia, tapi kita menceritakan permasalahan yang terjadi.”

Skill yang telah dibaca sebelum A2: `claude/script-workshop/SKILL.md`, `claude/motion-graphic/references/copywriting.md`, dan `claude/working-with-irfan/SKILL.md`. Baseline repo saat dibaca: `3857e18ea71eb8209e1d77629675be182a0c0017`. Tidak ada bukti masalah akses pada pembacaan tersebut.

Diagnosis sementara: penerapan konteks dan fungsi referensi gagal. Instruksi mempertahankan ide, revisi sebagai penguatan, serta satu benang merah sudah ada. Dua kegagalan dalam satu konteks belum membuktikan cacat skill lintas konteks.

## Kriteria untuk reproduksi berikutnya, belum dijalankan

1. Ketika brief memberi keterbatasan otoritas penulis, draf tidak otomatis mengubahnya menjadi pengenalan atau biografi pembuat.
2. Setelah kutipan sumber, narator mengembangkan kontradiksi atau konsekuensi yang relevan bagi audiens. Statistik tidak disisipkan sebagai pengganti perkembangan persoalan.
3. Penguatan mempertahankan pusat cerita kandidat pertama dan menyebut perubahan yang substantif; tidak beralih ke kritik vibe coder atau reportase perusahaan tanpa permintaan.
4. Klaim faktual tetap bisa diperiksa; data tidak dihapus hanya karena akun bersifat personal. Bahasa retoris tidak dijadikan perilaku universal yang telah terbukti.
5. Agent tidak menyimpulkan “semua video harus dibuka tokoh terkenal”, “akun personal tidak boleh memakai data”, atau “versi baru pasti viral”.

## Bukti yang masih kurang

Belum ada keluaran revisi berikutnya yang disetujui, reproduksi terkontrol, perbandingan skill lama dengan patch, atau pengukuran penonton. Catatan ini tidak mengubah aturan aktif dan tidak menyatakan perbaikan berhasil.

Ikuti [EVALS-DESIGN.md](../../../../EVALS-DESIGN.md) sebelum mempromosikan temuan menjadi patch skill.
