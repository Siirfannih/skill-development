# TAHAP · skill-development-journey-20261116

Disalin dari `claude/motion-graphic/templates/TAHAP.md` (main 3795b31) saat proyek sudah di putaran revisi 5. Langkah yang dikerjakan sebelum aturan ini diberi bukti dari putaran sebelumnya; langkah yang harus diulang untuk putaran 5 dibiarkan terbuka. Lihat langkah berikutnya: `python3 claude/motion-graphic/scripts/juri/tahap.py projects/skill-development-journey-20261116`.

## Tahap 1 · Profil merek
- [ ] Profil merek ada dan lulus · baca: `templates/merek/README.md` §Tahap 1 · bukti: keluaran `profil_cek.py` LULUS (D-429, folder `~/work/data-video/merek/siirfan`) →

## Tahap 2 · Editing guideline + preview
- [x] Brief user disalin verbatim ke `RESEP.md`; kiblat dipilih · baca: `pustaka/PETA.md` baris kartu terkait, `pustaka/RESEP-TEMPLATE.md` · bukti: `resep_check.py RESEP.md` → "LULUS resep: kiblat = kartu 07 …" (18 Nov sore)
- [x] Suara dipotong dan dikunci · baca: `references/audio.md` §14.0C–14.0D · bukti: `audio/order-A/ORDER.json` tahap suara; kunci ulang Revisi-1 c23e53d9, 83,817 dtk (DECISIONS 17 Nov "Revisi-1 A1") →
- [x] Preview dikirim di percakapan · baca: `references/storyboard.md` §1 · bukti: `handoff/MENU.md` + lembar sanding storyboard 16 Nov →
- [x] Masukan user atas preview dicatat dan disetujui · baca: `references/revision-log.md` §21.1 · bukti: DECISIONS "16 Nov ±22:20 · persetujuan Irfan (gerbang 2 + 4)" →

## Tahap 3 · Produksi penuh (tanpa minta revisi)
- [ ] Sistem desain video: Sutradara menulis `tema.ts` (token berkategori), satu pekerja membangun komponen bersama, papan acuan disetujui · baca: `templates/sistem-desain/README.md`, `references/orkestrasi.md` §1 · bukti: `tema_cek.py` LULUS + path papan acuan (D-428: b1–b7 ke token, A/B/C/G identik piksel) →
- [ ] Visual dibangun per TASK adegan, satu Editor baru per TASK, hanya dari token + komponen bersama; lembar sanding semua adegan dicek sekeluarga · baca: `references/roles.md` §5–6, `references/orkestrasi.md` §3 · bukti: REPORT tiap TASK (D, E, F, narasi B) →
- [ ] Audit visual semua frame LULUS · baca: `templates/roles/pemeriksa-frame.md` · bukti: `VERDICT.md` tiap potongan →
- [ ] SFX lalu musik dikunci · baca: `guide/sfx/GUIDE.md`, `references/audio.md` §14.3–14.9 · bukti: `audio_order.py lock sfx` + `lock musik` PASS →
- [ ] Devil's Advocate dari luar, usulnya diputus · baca: `templates/roles/devils-advocate.md` · bukti: `qc/da/USUL.md` + putusan di `qc/JURI.md` →

## Tahap 4 · Render 1
- [x] Render 1 utuh dikirim ke user · baca: `pustaka/README.md` §Juri 7, `references/delivery-gate.md` · bukti: `out/varian-A_r4-final-1.mp4` (Drive, STATUS §2) →
- [x] Semua masukan user dikumpulkan jadi satu ronde · baca: `references/revision-log.md` §0 · bukti: DECISIONS D-414…D-427 (putaran 5) →

## Tahap 5 · Render 2 (finishing)
- [ ] Masukan dikerjakan, hanya atribut yang diminta · baca: `references/revision-log.md` §0 butir 5–6 · bukti: `revisi_cek.py cek` LULUS →
- [ ] Render 2 dikirim · bukti: path MP4 (`out/varian-A_r4-final-2.mp4`) →
