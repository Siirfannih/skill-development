# Jadisatu Canvas · keputusan dari pengguna

## 28 Oktober 2026 — visual canvas bersama

Sumber: Irfan meminta, “tambahin snapshot canvas otomatis lewat MCP supaya Claude dan model lain bisa melihat keseluruhan canvas seperti aku, termasuk coretan dan susunannya. Gabungkan dengan data tadi, langsung kerjakan dan tes sampai jalan.”

Status: **diterapkan sesuai permintaan langsung**, dengan gerbang audit integrasi sebelum publikasi. `read_board` menyertakan PNG overview dan data pada revisi/generasi yang sama; `read_canvas_snapshot` memperoleh ulang gambar dan `read_image` tetap untuk referensi asli. Metadata tanpa piksel tidak membuktikan pengamatan visual. Batas reset/izin sebelumnya tetap berlaku.

Bukti: `evals/results/2026-10-28-visual/grade.md`; baseline11/12 dan current12/12 pada dua kasus offline. Perbedaan hanya kelengkapan pilihan tool snapshot, bukan bukti peningkatan keselamatan atau akurasi visual. Uji terpisah Claude nyata dengan fixture sintetis berhasil membaca bentuk/warna yang tidak ada dalam teks board. Audit integrasi dicatat pada laporan penutupan.

## 29 Oktober2026 — Mode Storyboard

Sumber langsung Irfan: “Iya, langsung develop Mode Storyboard seperti referensi tadi: frame, narasi, durasi, gerak, transisi, urutan adegan, dan akses AI per adegan. Kerjakan sampai online dan tes sampai benar-benar siap dipakai.”

Status: diterapkan sesuai permintaan langsung. Cabang references/storyboard.md menjelaskan data adegan + PNG, tiga target visual, scene revision vs boardRevision, reset, scope, dan pratinjau frame diam. Tidak memberi grant atau membuat konektor baru.

Evaluasi offline: baseline10/12, kandidat pertama11/12 dengan satu regresi penjelasan generasi visual, kandidat kedua12/12 (kasus lama8/8). Transkrip/grade asli dipertahankan di evals/results/2026-10-29-storyboard. Ini bukti pengetahuan kontrak, bukan pengukuran akurasi visual atau peningkatan keselamatan; uji MCP/model nyata dan audit dicatat terpisah pada bukti integrasi.
