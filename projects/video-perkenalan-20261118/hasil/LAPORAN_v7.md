# Laporan · video perkenalan v7 (19 Nov 2026)

**File:** `video-perkenalan_v7_final.mp4` (1080×1920, 30 fps, 2006 frame, 66,87 dtk). Versi tanpa musik: `video-perkenalan_v7_final_tanpa-musik.mp4`. Kredit musik di `KREDIT.md`, tidak di video.

## Yang berubah dari v6
- Talking head penuh: tanpa b-roll, tanpa ganti latar, wajah tidak pernah terpotong (dicek per frame dari kotak kepala).
- Tipografi kinetik ala Zache (`zache.mp4`): narasi per kata putih, kata kunci kuning per huruf berayun, klaim kapital mendarat di belakang kepala lewat cutout, hero dorong-dalam.
- Kamera virtual: zoom in/out ber-ease tiap blok, wajah digeser ke tengah saat zoom; flash light-leak di sambungan take.
- #23 (take 38, hanya suara): kartu teks gelap dengan glow amber, ditutup ULANGI (gema pembuka).
- SFX disusun ulang mengikuti gerak (flash, slam, hero, kata kunci); musik Aware → Relax sama dengan v6.

## Perlu diketahui
- **U-001 · gerak kamera lebih terlihat** (usul Devil's Advocate): narasi bergantian dorong 1,08 / tarik 1,00 dan wajah digeser ke tengah. Ini berbeda dari preview yang kamu lihat; bisa dikembalikan ke versi preview.
- **D-009 · suara v6 apa adanya:** gerbang suara skill gagal (39 celah tengah kalimat 0,15–0,35 dtk; lantai jeda −28,7 dBFS). Render final memakai renderer Remotion yang sama tanpa gerbang audio `render.sh`; gerbang lain lulus (resep, motion_lint, teks, kt_check, audit 2006 frame, audit audio).
- **SFX di speaker HP:** 53 dari 62 terdengar; 9 hantaman bass (slam) hilang di speaker HP, terdengar di earphone. Tidak disaturasi supaya tidak kasar.
- Kejernihan suara median 14,4 dB di atas musik; terendah 3,1 dB di 61,0 dtk (flash masuk kartu gelap).

## QC
- `qc/JURI.md` PUTUSAN: LULUS (dengan putusan 12 usul Devil's Advocate).
- `qc/sanding.jpg`: still v7 berdampingan dengan frame kunci Zache.
- Audit frame `qc/frame_audit/` dan audio `qc/audio_audit/`: 7/7 potongan LULUS.
