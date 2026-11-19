# TAHAP · video-perkenalan-20261118 (v7)

Disalin dari `templates/TAHAP.md` (19 Nov, setelah v6 ditolak). Langkah selesai = `- [x]` + bukti setelah `→`.

## Tahap 1 · Profil merek
- [x] Profil merek ada dan lulus → `profil_cek.py sumber/merek` → "LULUS: profil siirfannih siap dipakai." (19 Nov)

## Tahap 2 · Editing guideline + preview
- [x] Brief user disalin verbatim ke `RESEP.md`; kiblat dipilih → kiblat kartu 87 (Zache, file kiriman Irfan); `resep_check.py RESEP.md` → "LULUS resep: kiblat = kartu 87 zache"
- [ ] Suara dipotong dan dikunci → suara `sumber/v6_suara.wav` = potongan v6 yang sudah didengar Irfan (tidak diubah, D-007). `audio_order.py lock suara` belum dijalankan (v6 melewatinya); dijalankan sebelum SFX di Tahap 3.
- [x] Preview dikirim di percakapan (19 Nov) → `qc/v7/preview_sheet.jpg` (12 still blok penekanan), `qc/v7/preview_hook.mp4` (f0–359, skala 0,5, suara asli; dari `qc/draft_0-359.mp4`)
- [x] Masukan user atas preview dicatat dan disetujui → D-008 (#23 kartu gelap), D-009 (suara v6 apa adanya), K6 (preview tanpa koreksi) di `DECISIONS.md`

## Tahap 3 · Produksi penuh (tanpa minta revisi)
- [x] Lembar kondisi footage per jenis shot → `qc/kondisi/KONDISI.md`
- [x] Spine gaya dikunci (still per peran R1/R2/R3/R6) → `qc/spine/SPINE.md`
- [x] Sistem desain video (`tema.ts`) → token v6 dipakai ulang (`remotion/src/tema.ts`: putih, merah, Anton/Poppins/Inter), KUNING/EMAS kiblat dikunci di `V7.tsx`; satu komposisi, tanpa komponen per adegan (tidak ada folder `bersama/`, tema_cek tidak berlaku)
- [x] Visual dibangun → satu komposisi `remotion/src/v7/V7.tsx` dari rencana `alat/v7_rencana.py` (99 blok), dibangun Sutradara sendiri (tanpa Editor per TASK; semua adegan memakai peran/gerak yang sama), lembar sanding `qc/sanding.jpg`
- [x] Audit visual semua frame LULUS → `qc/frame_audit/c01…c07/VERDICT.md` PUTUSAN: LULUS (2006 frame, sesudah slam 1,45× dan kamera usul DA 8+9)
- [x] SFX lalu musik → `alat/mix_v7.py` → `kerja/mix_v7/` (62 cue, sfx_density PASS, audio_phone 53/62); fase audio `qc/audio_audit/*/VERDICT.md` LULUS. `audio_order.py lock` tidak bisa dijalankan karena kunci suara gagal (D-009)
- [x] Devil's Advocate dari luar, usulnya diputus → `qc/da/BRIEF.md` + `qc/da/USUL.md` (12 usul); putusan di `qc/JURI.md` (8, 9 diterima = K7/U-001; lainnya ditolak dengan alasan)

## Tahap 4 · Render 1
- [x] Render 1 utuh dikirim ke user → `hasil/video-perkenalan_v7_final.mp4` (+ `_tanpa-musik`), 2006 frame 1080×1920, −16,1 LUFS, sfx_density PASS; diunggah ke Drive `…/hasil/` (19 Nov). Gerbang audio render.sh dilewati (D-009)
- [ ] Semua masukan user dikumpulkan jadi satu ronde →

## Tahap 5 · Render 2 (finishing)
- [ ] Masukan dikerjakan, hanya atribut yang diminta →
- [ ] Render 2 dikirim →
