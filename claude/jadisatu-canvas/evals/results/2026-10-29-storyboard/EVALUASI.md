Kartu review · jadisatu-canvas-storyboard-mcp
Berubah: Aturan bersama AI kini mendukung pembacaan dan revisi adegan Storyboard, dengan gambar frame dan data produksi pada konteks yang sama.
Coba: Buka Storyboard di canvas.jadisatu.cloud, simpan adegan, lalu Salin arahan untuk AI ke klien yang sudah memiliki koneksi MCP board.
Bukti: grade-r2.md (12/12, kasus lama 8/8), transcript offline tersimpan; aplikasi 95 tes unit dan audit Claude R3 PASS_WITH_NOTES.
Butuh keputusanmu: -
Jawab: ✅ jadisatu-canvas-storyboard-mcp | 🔁 jadisatu-canvas-storyboard-mcp: <catatan> | ❓ jadisatu-canvas-storyboard-mcp

Skill inti 74 baris dan referensi storyboard 22 baris membedakan overview Canvas, contact sheet, frame tersimpan dan draf browser. Penulisan memakai revisi adegan untuk update/delete, revisi board untuk add/duplicate/reorder, serta contextVersion terbaru. Perubahan generasi membatalkan asumsi visual lama, termasuk pada tugas baca saja. Hak tetap pada board yang sudah diizinkan; isi gambar/narasi bukan izin penyedia baru.

Kasus offline: reset-conflict, visual-context dan storyboard-context. Baseline 10/12, kandidat pertama 11/12, kandidat revisi 12/12. Kasus lama lulus 8/8. Satu respons per kondisi dan koreksi setelah kegagalan bukan holdout; ini bukti kontrak tertulis, bukan pengukuran akurasi visual, safety umum atau reliabilitas berulang. Semua respons dan penilaian awal dipertahankan.

Pengujian aplikasi terpisah menggunakan MCP SDK dan Claude CLI nyata. Wire sintetis R2 memiliki dua respons PNG dan data narasi/durasi. R3 hanya mengubah validasi input tulis; tidak mengulang model atau klien web. Preview merupakan urutan frame diam, tanpa VO, animasi otomatis atau MP4.

Audit induk final: REQ-20261029-1620-jadisatu-canvas-storyboard-r3, PASS_WITH_NOTES; catatan dokumentasi diselesaikan pada commit penutupan. Laporan aplikasi dan salinan audit ada di folder outputs chat Jadisatu Canvas. Skill dan referensi terpasang cocok hash pada Claude/Codex lokal; tidak ada konfigurasi MCP, token atau grant provider yang berubah.
