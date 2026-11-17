AWAL SESI: Sutradara sudah menjalankan doctor --fix dan regenerasi PETA (izin Irfan 16 Nov). Bila doctor GAGAL karena "skill Codex … salinan" ATAU "PETA.md basi", jalankan `python3 tools/peta.py` dan `./tools/doctor.sh --fix` sekali lalu langsung kerjakan TASK; jangan bertanya.

# TASK-b10a-r2 · Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca handoff/REPORT-b10a-blender.md (ronde 1). G2 Sutradara atas qc/still/revisi1/b10a-sanding.jpg: suasana meja hangat, DOF, monitor timeline + blok "kayak gimana?" di onset, wajah Irfan di monitor = BENAR, pertahankan. Revisi:
TEMUAN       T1 Komposisi terbalik dari acuan: kamera terlalu lebar, Claude kecil dan terpotong tepi kiri (onset/akhir). Ubah ke kamera MAKRO pada Claude: Claude tinggi ±45–60 % frame, berdiri di keyboard sepertiga kiri-tengah, monitor di belakang-kanan buram bokeh (f/1.8–2.2). Rack focus ke monitor HANYA di jendela onset "kayak gimana?" (±0,5 dtk sebelum s.d. ±0,7 dtk sesudah, `ease`) supaya blok teks terbaca, lalu fokus kembali ke Claude saat mengangguk. Push makro pelan sepanjang shot; tidak ada objek penting terpotong tepi.
             T2 Bentuk belum terbaca sebagai crab Claude: bangun ulang siluet dari sumber/ref/maskot-acuan-pixel-crab.png: badan kotak LEBAR (lebar ≈ 1,9× tinggi), DUA lengan kotak pendek kiri-kanan setinggi tengah badan, EMPAT kaki kotak pendek di bawah, DUA mata kotak gelap di sisi depan; menghadap kamera tiga-perempat (yaw 20–35°) lalu menoleh ke monitor di onset dan kembali/mengangguk. Tetap tersusun dari kubus kecil ber-bevel (gaya acuan).
             T3 Material: terakota lebih dalam (#B4532F–#C9653F), roughness 0,55–0,7, sedikit subsurface; rim light hangat dari belakang-atas yang memisahkan siluet dari latar gelap; eksposur sedikit lebih gelap/sinematik seperti acuan; grain halus tetap.
FILE BOLEH   sama seperti TASK-b10a-blender.md (skrip lego/blender/**, file kerja di /mnt/storage-projects/skill-dev-journey/b10a/, qc/still/revisi1/b10a-*.jpg, handoff/REPORT-b10a-blender.md)
FILE JANGAN  sama seperti ronde 1.
LULUS BILA   3 still baru (awal, onset, akhir) + b10a-sanding.jpg diperbarui; Claude utuh di ketiga still; siluet crab terbaca; blok "kayak gimana?" terbaca di still onset.
JANGAN       render penuh, commit/push.
LAPORAN      tambahkan "Ronde 2" ≤ 6 baris di REPORT-b10a-blender.md.
