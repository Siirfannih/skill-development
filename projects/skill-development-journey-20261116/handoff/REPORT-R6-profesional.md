# REPORT-R6-profesional · D-451

Kartu review · TASK-R6-profesional
Berubah: pada frame lokal 67–85, kamar diganti hijau polos dan kata hitam besar PROFESIONAL berada di belakang Irfan.
Coba: buka `lego/cache/D_IG_r6.mp4`; bandingkan `qc/r6/profesional/lembar.jpg`.
Bukti: tsc exit 0; 223 frame 1920×1080; seluruh 204 frame di luar rentang identik dengan cache lama (MSE 0, PSNR ∞).
Butuh keputusanmu: -
Jawab: ✅ TASK-R6-profesional | 🔁 TASK-R6-profesional: <catatan> | ❓ TASK-R6-profesional

Status: **siap ditinjau; QA teknis lolos**. Tidak ada render video penuh.

## File

- `remotion/src/video/b6.tsx`: satu import dan pergantian komponen media hanya untuk `67 <= f < 86`.
- `remotion/src/video/bersama/KataBelakang.tsx`: hijau → kata hitam → canvas pembicara ber-alpha; semuanya bersarang dalam bidang video dan mengikuti kamera IG yang ada.
- `remotion/src/video/bersama/tema.ts`: hanya menambah token `PENGECUALIAN.hijauProfesional` persis dari TASK.
- `remotion/public/video/matte-ig-r6.webm`: VP9 lossless, 1920×1080, 28 frame pada 30 fps, 0,933 detik, 762.839 byte.
- `qc/r6/profesional/`: still, lembar, log, props salinan baca-saja, provenance, hasil ukur, dan render perantara.
- `lego/cache/D_IG_r6.mp4`: lapisan opak H.264, 223 frame, 30 fps, 7,433333 detik, 1920×1080, tanpa audio; 45.479.993 byte.
- Laporan ini.

## Masker dan gerak

`ffprobe -count_frames` menemukan matte R6 sebenarnya **2.496 frame**, bukan 2.512; proxy berisi 2.512 frame. Pada waktu yang sama tangan tidak cocok. Perbandingan offset 0, −8, −16, −24, dan −32 frame menunjukkan offset **−16 frame sumber** cocok; bukti awal `input-check.jpg`, `align-sheet.jpg`, dan `align-composite.jpg`.

Matte lama dipetakan maju 16 × 1001/30000 detik agar cocok dengan proxy, disampling menjadi 30 fps, lalu dipangkas ke waktu sumber 78,500–79,433333 detik. Setelah erode 2 px dan Gaussian blur sigma 1 px, luminans dipetakan ulang dari 3–252 ke 0–255. Perintah lengkap ada di `qc/r6/profesional/provenance.json`. Sumber matte dan proxy tidak diubah.

Dua `OffthreadVideo` mengirim frame ke canvas tersembunyi. Setiap callback menyalin gambar dan mencatat frame lokal; pembicara digambar hanya ketika wajah dan matte sudah menyelesaikan frame yang sama. Luminans matte menjadi kanal alpha. `Sequence from={63}` mengikat awal klip matte 78,5 detik ke waktu lapisan IG. Cara memakai callback mengikuti [dokumentasi Remotion](https://www.remotion.dev/docs/videos/video-manipulation), dan urutan callback sebelum `continueRender` diperiksa pada implementasi lokal versi 4.0.380.

Hijau berasal dari token `#34C759`, hitam dari `MEREK.latar`, font dari `HURUF.keluarga.hero`, bobot 800, tracking −2 %. Kata satu baris selebar 92 % bidang video, pusat vertikal 42 %, masuk skala 1,10 → 1,00 melalui `land` selama 6 frame. Masuk f67 dan keluar f86 berupa potongan. Tidak ada teks kecil, glow, bayangan, atau gradien baru.

## Pemeriksaan

| Pemeriksaan | Hasil | Bukti |
|---|---|---|
| `npx tsc --noEmit -p .` dari `remotion/` | exit 0 | `qc/r6/profesional/tsc.log` |
| Still terbaru f66, f68, f72, f80, f85, f86 | semua 1920×1080; diekstrak dari MP4 keluaran | `qc/r6/profesional/f{frame}.png` |
| Batas waktu dan urutan lapis | f66 normal; f68–85 hijau, kepala menutupi huruf; f86 normal | `qc/r6/profesional/lembar.jpg` + seluruh PNG f66–86 di `frames/` |
| Dimensi, jumlah frame, audio | 1920×1080, 223 frame, satu stream video | `qc/r6/profesional/output-probe.json` |
| PSNR seluruh frame di luar 67–85 | **∞ dB**, minimum per frame **∞ dB**, MSE **0**, 204/204 frame | `qc/r6/profesional/psnr-preserved.log`, `psnr-preserved-frames.log` |
| Review kode baca-saja, konteks terpisah | tidak ada temuan Required/Critical | `qc/r6/profesional/review-code.md` |
| Hash sumber, matte, keluaran, dan cache pembanding | tersimpan | `qc/r6/profesional/verification.json` |

Render Remotion awal mengikuti perintah TASK dengan `--crf=12 --muted`, ditambah `--jpeg-quality=95` mengikuti pembuat cache lama. Render itu disimpan di `qc/r6/profesional/render-crf12.mp4`; log di `render.log`. Pengukuran luar rentang awal mencapai PSNR gabungan **50,324440 dB**, tetapi minimum per frame **45,168143 dB** akibat enkode ulang (`psnr-outside.log`). Render kontrol kode semula pada kualitas JPEG 92 bahkan hanya 48,179117 dB (`psnr-basis.log`).

Untuk memenuhi kesamaan setiap frame, MP4 yang diserahkan mempertahankan frame 0–66 dan 86–222 dari cache lama, mengambil hanya f67–85 dari render CRF 12, lalu menyimpannya sebagai H.264 **lossless CRF 0**. Ini penyimpangan setelan enkode yang disengaja demi syarat PSNR, tanpa mengubah piksel lain; codec tetap H.264 dan format piksel yuvj420p. Profil hasilnya High 4:4:4 Predictive. Log perakitan: `preserve-outside.log`.

Integrasi T086 tetap dilakukan Sutradara sesuai TASK. File lego JSON, teks/audio, adegan lain, dan PETA.md tidak diubah oleh tugas ini.
