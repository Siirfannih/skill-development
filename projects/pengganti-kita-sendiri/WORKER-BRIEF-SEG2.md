# Brief worker · Segmen 2 putaran 1 (perbaiki temuan SEG2-REPORT-R1.md)

Baca: `LOCKED.md` (bagian dikunci Irfan — JANGAN diubah), `claude/motion-graphic/references/three-segment-gate.md` (aturan terkunci), `SEG2-REPORT-R1.md` (temuan), `FEEDBACK-2NOV-0605.md`.

## Aturan
- Diff bedah pada kode yang ada; hanya file milikmu. Bagian yang sudah dipuji Irfan jangan didesain ulang.
- **SAFE**: teks utuh di dalam x 288–1632, y 216–864 (koordinat layar 1920×1080, SETELAH transform kamera) sepanjang hidupnya kecuali 1–3 frame masuk/keluar animasi. Kalau teks di dalam lapisan kamera/zoom, hitung posisi layar akhirnya (atau pindahkan teks ke ruang layar).
- **CONTR**: kontras teks vs latar ≥ 4,5:1 (target 7:1). Caranya: pilih warna teks yang kontras (tidak hanya hitam/putih; aksen boleh, ingat makna warna: merah negatif, biru solusi, dilarang biru di latar gelap), atau pindah ke ruang yang tenang (DILARANG scrim/pita gradien hitam). Bukan memperbesar huruf.
- **CLASH**: tidak ada teks bertumpuk.
- Ukuran font seragam dalam satu kalimat; pembeda = huruf kapital di awal / warna aksen.
- Teks = prioritas 2. Bila visual sudah kuat dan teks tidak bisa ditempatkan rapi → hapus teksnya (tulis alasannya).
- Hindari pola blok di kiri + teks di kanan di atas latar hitam kosong.
- Jangan mengubah timing kata (terkunci ke ucapan) atau penanda SFX id kecuali objeknya dihapus.

## Alat (wajib)
```
cd remotion
npx tsc --noEmit
node seg2_probe.mjs /home/claude/pks/seg2/<nama> <a_s> <b_s> 4 0.25     # still kecil + log OBJ
python3 ../tools/seg2_layout_check.py /home/claude/pks/seg2/<nama>      # harus LOLOS untuk rentangmu
```
Lihat sendiri still (contact sheet ≤ 960 px) untuk estetika. Target waktu ≤ 25 menit.

## Hasil
`REVIEW-SEG2-<A|B>.md`: temuan → perubahan → status (laporan checker rentangmu ditempel). Commit hanya file milikmu + review, `git pull --rebase --autostash origin main && git push origin HEAD:main`. Pesan commit diakhiri:
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QPNycWQtoYsG5NpceQZXbF

## Hierarki (Irfan 07.33)
Mekanis (koordinat, timing, aturan terkunci) → langsung. Desain (elemen baru, warna, latar, hapus/tambah teks, tata letak) → mini proposal dulu (masalah · usulan · still 480 px · prinsip · urutan mata penonton), Claude utama memutuskan. Lihat `claude/motion-graphic/references/three-segment-gate.md` § Hierarki.
