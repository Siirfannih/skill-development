# Fase 3.3: media proyek selesai keluar dari git (Q1)
Masalah: 688 berkas media dari sembilan proyek selesai (284.406.175 byte, kira-kira 284 MB) membesarkan repo yang akan dijual dan dipasang orang lain.
Perubahan:
- `git rm` tepat 688 path di `reports/drive-verified-Q1.txt` (sudah di Drive, cocok byte demi byte). Per proyek: ai-change-everything 122, builder-trap-r2 10, flat-mirip-mirip 13, jadisatu-60s 116, jadisatu-trojan-v4 120, pengganti-kita-sendiri 6, skill-development-journey 172, vibedesign-meta-carousel 6, video-perkenalan 123. Jenis: jpg 219, png 215, mp3 120, woff2 64, wav 43, mp4 16, webp 8, otf 2, webm 1 (font di dalam proyek selesai ikut, sesuai keputusan).
- `projects/LOKASI.md`: lokasi Drive, manifest, pemulihan dari tag `pra-bersih`.
Diperiksa sebelum menghapus: 0 path di bawah `claude/`; 0 di `projects/behindwork-*` (tidak ada; juga tak ada rujukan dari sana); 0 kutipan path penuh di pohon aktif (`claude/`, `tools/`, tes, `AGENTS.md`, PETA, steward). 59 berkas punya nama dasar yang sama dengan sebuah teks aktif, semuanya kebetulan nama, bukan pembacaan: `fonts.css` dan `frame.css` memuat font dari folder font mereka sendiri (`claude/motion-graphic/fonts/*`, `claude/vibedesign/engine/fonts`), tes audio membuat `click.wav`/`pop.wav` sendiri, `sanding.jpg`, `sheet.jpg`, `contact-sheet.png` adalah nama keluaran skrip, `87-k8-...jpg` di kartu 87 menunjuk salinan di `claude/.../sheets/keyframes/` (ada). Keyframe kartu dan `contoh-gagal` tidak disentuh.
Dampak: proyek selesai tidak bisa dirender ulang dari git tanpa memulihkan media dari Drive; teks, kode dan keputusan proyek tetap. Berkas masih ada di riwayat git; menghapusnya dari riwayat adalah keputusan terpisah.
Juga: `tools/peta.py` melewati berkas (bukan folder) di `projects/` agar `LOKASI.md` tidak terdaftar sebagai proyek.
Level: Behavior
Persetujuan: ya, jawaban Q1
Cara membatalkan: `git revert` commit ini, atau `git checkout pra-bersih -- projects/<proyek>`.
