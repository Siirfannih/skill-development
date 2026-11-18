# RESEP · video perkenalan v6 (draf tanpa musik)

Semua path relatif ke folder proyek ini. Mesin: CPU saja, `npx` tidak ada di PATH → pakai `remotion/node_modules/.bin/…` dan `node`.

## 1. Sumber
- `sumber/` = paket Drive (guideline final, `words_v6.json`, `edl_v6.json`, `gabungan_v6.mp4`, `v6_suara.wav`, referensi, `merek/`, zip diekstrak ke `sumber/ekstrak/`).
- Audio lama (Rain in L.A. + Otis) dibuang; lihat `kerja/AUDIO-KEPUTUSAN.md`.

## 2. Matte subjek (RVM, CPU)
```bash
python3 alat/matte.py sumber/gabungan_v6.mp4 kerja/matte sumber/edl_v6.json            # → fg.webm (frame 0–1659 terbaca)
python3 alat/matte.py sumber/gabungan_v6.mp4 kerja/matte sumber/edl_v6.json 1640 1800 fg_b   # → fg_b.webm (1640–1799)
python3 alat/kepala.py                                                                  # posisi kepala → kerja/kepala.json, data/kepala.ts
```
- Inferensi setengah resolusi (mesin dipakai bersama); state recurrent di-reset di tiap sambungan EDL.
- `fg.webm` putus di ±1800 karena disk penuh, di-remux `-c copy` (alpha utuh) → sisanya dibuat ulang sebagai `fg_b.webm`. `Plate.tsx › Cutout` menyambung keduanya di frame 1660.
- Media di `remotion/public/` harus **hard link** (`ln`), symlink → 404 di Remotion.

## 3. Komposisi Remotion (`remotion/`)
- `src/Main.tsx` merakit 2006 f; konteks frame global `GF/useG` dipakai semua komponen KT/MG (shot dibungkus `<Sequence from layout="none">`).
- Lapis TH: footage → teks belakang → cutout → teks depan (dalam kamera); narasi di ruang layar.
- KT: `kt/KT.tsx` (R1/R2/Hero, `Narasi` dengan slot: maks 2 blok di layar, `akhir` untuk keluar paksa), `kt/Orbit.tsx` (orbit elips, cincin, sobek, busur).
- Kurva: `curves.ts` (land/heavy/whip/reveal/leave/drift), keyframe `anim.ts › track()`. Tanpa linear, tanpa crossfade.
- Dunia studio: `shot/Studio.tsx` (Blue Void, White Studio, `Orang` = cutout dengan tepi frame dimask agar tidak tampak potongan lurus).
- UI asli: `ui/UI.tsx` (kartu IG, jendela macOS), tangkapan di `public/ui/` (live via `alat/tangkap_ui.py`; Canvas dari bukti repo; profil IG dibangun ulang dari screenshot).

```bash
cd remotion
node_modules/.bin/tsc --noEmit -p .
TO=180000 node stills.mjs ../qc/still 0.5 20 60 125 ...      # audit still
CONC=2 node render.mjs ../kerja/render/video_bisu.mp4 1      # render penuh bisu, H.264 CRF 16
```

## 4. Audio
```bash
python3 alat/mix.py kerja/mix      # stem_vo (v6_suara dual-mono, sampel tidak diubah) + stem_sfx + mix.wav + cues.json
python3 ~/work/skill-development/claude/motion-graphic/scripts/audio/audio_phone.py --root kerja/mix --list
```
- Cue = §5.3 + tambahan (whoosh di zoom/transisi, `tick-hero` di hero R6, `riser-slam` sebelum slam). Puncak file ditaruh di frame cue.
- Peran baru dibuat di `kerja/sfx_extra/` dari library SFXIrfan (Epidemic): `riser-slam.wav` (ES Designed Riser Fast Short Clean 01, 0,87 dtk terakhir), `tick-hero.wav` (ES UI Sci Fi Very Short Open 08, LPF 6,5 kHz), `hantam-sub-hp.wav` (hantam-sub + saturasi/EQ tengah agar terdengar di speaker HP).
- Pelindung puncak −1 dBFS per cue (hanya cue itu yang turun, suara tidak disentuh).

## 5. Mux
```bash
ffmpeg -i kerja/render/video_bisu.mp4 -i kerja/mix/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest hasil/video-perkenalan_v6_draft.mp4
```
