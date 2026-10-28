# Integrasi visual MCP · 28 Oktober 2026

Skill inti commit a4637cf sudah dipush ke main. Salinan SKILL.md dan references/clients.md pada skill Claude/Codex lokal cocok byte dan lulus validator; receipt privat tanpa token ada pada output sesi. Tidak mengubah konfigurasi MCP atau membuat grant baru.

Implementasi aplikasi runtime 0de5db0 sudah online di https://canvas.jadisatu.cloud. Audit Claude r1/r2 PASS_WITH_NOTES; semua temuan diperbaiki, termasuk dua warna label terakhir dan commit skill ini. Penutupan independen pada bukti produksi masih berlangsung.

Bukti: 75 pemeriksaan unit/backend (75 diulang auditor r2), 10 moodboard, 7 workspace, 8 browser utama, 4 regresi. Tujuh pemeriksaan HTTPS live tanpa board writes: owner/MCP PNG identik, metadata cocok, preview, 1440/390 dan navigasi. Board referensi enam gambar dirender melalui akses pemilik. Cadangan dipulihkan terisolasi: 3 board, 1 sesi tersimpan, 6 gambar, login pemilik dan sesi sembilan kartu dapat dipulihkan.

Claude CLI sungguhan membaca PNG dan data ruang saat revision 48/contextVersion 2: 0 kartu, 25 coretan aktif milik pengguna. Satu read_board default, tanpa write atau izin baru. Ringkasan bentuk terlihat; rincian hitungan freedraw model meleset satu dan klien menyebut batas teks 25k token. Ini membuktikan pengiriman gambar, bukan akurasi sempurna atau login seluruh UI penyedia. Fixture sintetis terpisah membuktikan bentuk/warna yang tak ada di JSON.

Baseline/current offline 11/12 dan 12/12: perbedaan hanya pilihan tool snapshot. Keduanya sudah menjaga batas piksel, reset, dan izin. Review tambahan fallback tidak menemukan blocker; 401/403 tetap gagal, sementara 409/429/503 dapat mengembalikan data aktif tanpa PNG dengan status eksplisit. Tidak ada klaim watcher idle.
