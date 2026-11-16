# TASK-MG63 · claude1 (Opus 5.5) · pemberi: Sutradara claude2 · ringkas, satu sesi

TUJUAN  Ubah gaya motion graphic referensi Irfan (kartu 63) menjadi aturan visual konkret untuk adegan motion graphic / B-roll video ini, tanpa meniru isinya.
BACA    1) claude/motion-graphic/pustaka/kartu/63-*.md (kartu bedah yang sudah ada)  2) video referensi projects/skill-development-journey-20261116/sumber/ref/ref-motiongraphic-irfan.mp4 (32 dtk, 736×414): ekstrak keyframe (ffmpeg fps=2, lembar maks 960 px) dan lihat sendiri  3) projects/skill-development-journey-20261116/DESAIN.md (desain Sutradara, OTORITAS) — bagian B1 (dunia repo + timeline + Clawd mengedit), B3a/B3b (UI aplikasi Claude, "/" → daftar → kosong), B4b (kartu paket), B5b (dua jendela + karakter + pesan pop-up + loop).
KONTEKS Video ini tiga dunia: (a) talking head wajah Irfan, (b) karakter 2D interaktif (Clawd/Codex/Gemini, gaya ClaudeAnimationBase), (c) motion graphic Apple-style untuk menjelaskan. Referensi = gaya untuk dunia (c) saja; jangan menyalin konten/teks/produknya.
TULIS   projects/skill-development-journey-20261116/handoff/MG63-ADENDUM.md (≤ 70 baris):
  §1 bahasa visual dunia (c) dari referensi dengan ANGKA terukur: latar/wallpaper, bingkai jendela macOS, kedalaman & bayangan, radius, palet, tipografi UI, kursor, skala UI terhadap frame, kerapatan (berapa elemen per frame).
  §2 gerak: jenis gerak kamera (push/pan/zoom-through), durasi + kurva yang setara di curves.ts (land/heavy/whip/reveal/leave/drift), cara masuk/keluar elemen, transisi antar-layar, motion blur, ritme (event/dtk).
  §3 per adegan kita (B1 dunia repo, B3a/B3b, B4b, B5b): 4–8 butir konkret "lakukan" + 2–3 "jangan" yang membuat adegan itu setara referensi; tetap patuh DESAIN.md (bila bentrok, DESAIN menang — tulis bentroknya).
  §4 cara menyatukan dunia (a)(b)(c): transisi wajah ↔ layar, posisi lingkaran wajah, karakter 2D di dalam dunia (c).
  §5 cek lulus untuk Sutradara (5–8 butir yang bisa dicek dari still).
JANGAN  menulis kode, mengubah file lain, commit/push. Hemat: lembar keyframe maks 2 gambar.
BALAS   ≤ 6 baris.
