# Brief worker v10 (perbaikan PKS v9 → v10)

Baca dulu: `FEEDBACK-2NOV-0605.md` (9 poin Irfan, PRIORITAS TERTINGGI), `AUDIT-V9-INDEPENDEN.md` (44 cacat), `claude/motion-graphic/references/hybrid-motion-standard.md`, `AUTORUN-2NOV.md`.

## Aturan keras
- Diff bedah pada kode yang ada; jangan menulis ulang adegan dari nol. Hanya sentuh FILE MILIKMU (lihat pembagian). Jangan sentuh file lain.
- Bagian bertanda "(disukai)" di audit: perbaiki cacat konkretnya saja, jangan desain ulang.
- Devil's advocate: saran audit bukan perintah. Jika saran bertentangan dengan 9 poin Irfan atau aturan Irfan, ikuti Irfan dan tulis alasannya. Grid biru "janji sederhana" DIPERTAHANKAN (Irfan tidak mengeluhkannya; aturan biru = teks biru di latar gelap).
- Aturan Irfan: teks terbaca & kontras tinggi; tidak di kiri-atas; tidak di atas visual; satu kalimat satu baris; tanpa tanda baca; teks di ruang kosong nyata (menutup wajah boleh bila itu ruang kosong yang logis); peran sama = gaya sama; tidak ada teks bertabrakan/terpotong/tertutup objek; visual is king (UI produk asli, tanpa shape placeholder, Apple-elegan); visual kuat tak perlu teks; tidak ada frame mati; tidak ada lapisan dobel/ghost; cahaya lembut (tanpa tepi kotak).
- `AnchorWord` `at`/`until` = frame ABSOLUT.

## Bukti wajib (tanpa ini tugas dianggap gagal)
Media ada di `remotion/public/` (cloud). Untuk SETIAP cacat yang kamu tangani:
1. Render still SEBELUM dan SESUDAH: `cd remotion && npx remotion still src/index.ts PenggantiKitaSendiri /home/claude/pks/v10/<id>_after.png --frame=<f> --scale=0.5` (frame = detik × 30). Lihat gambarnya sendiri. Ulangi sampai benar.
2. Cek juga 2 frame tetangga (±0,5 s) supaya tidak ada kebocoran ke adegan lain.
3. `npx tsc --noEmit` bersih.
Tulis `projects/pengganti-kita-sendiri/REVIEW-W<n>.md`: tabel #cacat → perubahan → path still sesudah → status (BERES / TIDAK BERES + alasan).
Commit hanya file milikmu + REVIEW-W<n>.md, lalu `git pull --rebase --autostash origin main && git push origin HEAD:main`. Pesan commit diakhiri:
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QPNycWQtoYsG5NpceQZXbF
