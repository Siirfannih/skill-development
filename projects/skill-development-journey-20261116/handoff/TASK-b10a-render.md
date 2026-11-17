AWAL SESI: Sutradara sudah menjalankan doctor --fix dan regenerasi PETA (izin Irfan 16 Nov). Bila doctor GAGAL karena "skill Codex … salinan" ATAU "PETA.md basi", jalankan `python3 tools/peta.py` dan `./tools/doctor.sh --fix` sekali lalu langsung kerjakan TASK; jangan bertanya.

# TASK-b10a-render · Codex (Sol 6.1 High) · pemberi: Sutradara claude2
G2 Sutradara: ronde 2 (qc/still/revisi1/b10a-sanding.jpg) LULUS — komposisi, siluet crab Claude, material, rack focus. Render penuh shot.
TUJUAN       /mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov (1920×1080, 30000/1001, 77 frame sesuai waktu terbaru di edit/words.json; ProRes 4444 atau PNG sequence + ProRes 422 HQ), siap dirakit ke slot lego `b10a_meja3d`.
CARA         Satu perubahan kecil sebelum render: kamera 8–12 % lebih dekat ke Claude (tetap utuh, margin ≥ 5 %), rack focus tetap. Render Cycles CPU dengan sample diturunkan + denoise OpenImageDenoise, target ≤ 70 dtk/frame (uji 3 frame dulu: bandingkan dengan still ronde 2, perbedaan noise/detail tidak kentara); bila Cycles GPU HIP atau Eevee Next bisa memberi gambar setara lebih cepat, boleh dipakai (catat). Render di latar (tools/tunggu.sh jalan …) dan tunggu sekali. Lalu finish.py (glare, grain, vignette) ke tiap frame.
FILE BOLEH   lego/blender/**, /mnt/storage-projects/skill-dev-journey/b10a/**, qc/still/revisi1/b10a-*.jpg, handoff/REPORT-b10a-blender.md
FILE JANGAN  lego/lego.json, remotion/**, edit/**, audio/**.
LULUS BILA   77 frame lengkap tanpa frame hitam/gagal, durasi = jendela shot, kontak sheet 12 frame qc/still/revisi1/b10a-render-sheet.jpg (960 px), waktu render tercatat.
JANGAN       commit/push, merakit ke lego (Sutradara/builder yang merakit).
LAPORAN      "Render penuh" ≤ 6 baris di REPORT-b10a-blender.md.
