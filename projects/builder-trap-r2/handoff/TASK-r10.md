# TASK r10 · Aktifkan timeline v5 dan buktikan sinkronisasi

## Tujuan

Aktifkan kandidat audio 91,3 detik dari r9 pada komposisi Remotion tanpa drift: audio, video wajah, kata, peta waktu, durasi, caption, dan end fade harus memakai versi v5 yang sama. Tiga filler `tuh` dipertahankan sesuai R-026; jangan membuat cut baru.

## Sumber kebenaran

- `edit/v5/map.json`: 9 cut eksak, tanpa overlap.
- `edit/v5/words_actual.json`: 228 kata aktual, termasuk tiga `tuh`.
- `remotion/src/data/words_v5.json`: 225 kata caption tanpa filler.
- `remotion/src/data/knots_v5.json`: peta animasi.
- Durasi: 91,300 detik / 2739 frame @30 fps.

## File boleh diubah

- `projects/builder-trap-r2/edit/make_v5.py`
- `projects/builder-trap-r2/edit/v5/**`
- `projects/builder-trap-r2/audio/{voice_clean,cues,mix}_v5.py`
- `projects/builder-trap-r2/remotion/src/{Main,Root}.tsx`
- `projects/builder-trap-r2/remotion/src/engine/Face.tsx`
- `projects/builder-trap-r2/remotion/src/engine/{words,timewarp}.ts`
- `projects/builder-trap-r2/remotion/src/scenes/Act4.tsx` hanya untuk end fade/hold yang terikat durasi v4
- `projects/builder-trap-r2/remotion/public/{mix_v5.wav,face_edit_v5.mp4}` hanya symlink/copy keluaran, tidak ditrack
- `projects/builder-trap-r2/handoff/REPORT-r10.md`
- `projects/builder-trap-r2/STATUS.md`

## Kriteria

1. `Root` = 2739 frame; `Main` memakai `mix_v5.wav`; timewarp/words memakai data v5.
2. `Face` memakai `face_edit_v5.mp4`, tidak menjepit frame ke 2500. `FACE_JUMPS` dihitung dari sembilan join v5 atau dibuktikan tidak perlu pada scene terkait. Hold/end fade v4 dipetakan atau dihapus dengan alasan.
3. `edit/v5/voice_clean.wav`, `mix.wav`, video wajah penuh, dan komposisi berbeda durasi <=1 frame.
4. Transkrip large-v3 tanpa prompt dibandingkan terhadap 228 kata aktual. Perbedaan ejaan/angka boleh dinormalisasi; kata isi yang hilang atau terpotong = FAIL.
5. Spot lip-sync awal, tengah, akhir + seluruh sembilan join dicatat. Typecheck dan `cekkata.mjs` PASS.
6. Still before/after yang benar untuk B17 dan B25 dibuat. Proxy komposisi 0,5 boleh dibuat setelah resource gate aman; final dilarang pada tugas ini.
7. Maksimal 2 thread/concurrency 1. Jangan mengganggu `edge10f.py` atau sesi lain; tunggu sampai job berat eksternal selesai sebelum Whisper/ffmpeg/Remotion.

## Catatan

- Jangan mengubah sembilan cut r9 atau mencoba menghapus tiga `tuh`.
- Jangan menulis ke checkout bersama selain branch/sparse clone terisolasi.
- Laporan harus membedakan gate berbasis data, gate dengar, dan artefak render.
