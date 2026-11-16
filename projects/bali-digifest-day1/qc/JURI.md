# JURI · Recap Day 1–3 · v11

Snapshot 2026-11-16T11:16:07+00:00 00: 32+00: 00. **Film v11 belum siap dikirim.** Ini adjudikasi progres/bukti terhadap semua ID aktif pada DECISIONS, bukan menyalin putusan Day 1/v2/v10. Status LULUS terbatas tidak berarti seluruh video lulus.

## Bukti dan batas

[Metadata E00–E10](v11/EVIDENCE.json) mencatat hash aset dan path PC. E00 baseline; E01 dialog; E02 display; E03 mapping; E04 non-P1; E05 P1 R5; E06 harness; E07 sound; E08 audit frame; E09 color; E10 delivery/render. Media/transkrip/testimoni tidak ikut Git. Timecode Revisi.md adalah v10; peta lokal v11 mengikat sumber aktual.

- Geometrik: 226 kata non-P1+25 kata P1 memiliki ≥6 frame reveal penuh; ini tidak menjamin pengenalan huruf/kontras 4,5: 1 sepanjang gerak. P1 R5 bridge gelap dekat pilar masih belum lulus.
- Audio: −15,8 LUFS adalah **VO saja**. Raw voice_level/cut_check/sourceguard tetap FAIL; R-014 menjelaskan pengecualian leveling statis. Tidak ada sound lock/master final. Nasal pada native K2 masih konflik.
- Audit final seluruh 3708 frame: 0 potongan/0 diperiksa ulang; render recap penuh 0. Pilot 135 frame/carry 88 frame/alpha 120 layout adalah scope berbeda.
- Color: 3 pasang A-B dievaluasi, 0 filter diterapkan; kontinuitas seluruh film belum dijuri. SFX/musik/master 0, jadi masking/logo sting/phone belum lulus.

## Setiap ID aktif dan buktinya

| ID aktif | Penilaian saat ini | Bukti |
|---|---|---|
| D-001 | TERBUKTI PARSIAL: urutan dialog/EDL baru tersedia; film penuh belum digabung. | E01, E04, E05 |
| D-002 | LULUS identifikasi baseline; tidak memberi putusan v11. | E00, E10 |
| D-003 | TERBUKTI PARSIAL: font/aset native/logo terverifikasi; tema belum masuk master v11. | E04, E05, E07 |
| D-004 | LULUS cakupan kerja lokal; staging Git diperiksa terpisah sebelum push. | E01, E04, E05, E10 |
| D-005 | LULUS urutan sampai visual parsial; SFX/musik masih 0 dan ditahan saat dokumentasi. | E01, E07 |
| D-006 | LULUS pencatatan 16 bite/251 display words; lihat daftar rekaman di RESEP. | E01, E02 |
| D-007 | LULUS metadata/aset parsial; sinkron seluruh film masih menunggu integrasi. | E01, E05 |
| D-008 | LULUS aset native parsial; 120 alpha, 17 chunk, 2 aset non-P1 dan native P1 tersedia. | E04, E05 |
| D-009 | LULUS pemisahan/harness; audit produksi seluruh film belum dimulai. | E06, E08 |
| D-010 | BELUM: audit penuh 0 potongan/0 ulang, render recap penuh 0. 29 tes harness + 5 tes hash lulus hanya infrastruktur. | E06, E08, E10 |
| D-011 | TERBUKTI PARSIAL: gambar/wide/urutan/logo tersedia; NAT/musik v11 belum dirakit. | E04, E07 |
| D-012 | GAGAL kontras bridge yang mendekati pilar gelap; native R5 ada tetapi perlu review/perbaikan sebelum final. | E05 |
| D-013 | TERBUKTI PARSIAL: studio 0353–0357 tidak dipakai dan instruktur clay 0426 termasuk cakupan v11; audit seluruh film masih menunggu. | E04 |
| D-014 | BELUM: pemeriksaan unique-source pada seluruh film belum dilakukan. Callback orang yang sama pada momen berbeda tetap diperbolehkan. | E04 |
| R-001 | TERBUKTI PARSIAL: K1/T1a tersusun; audit final pembuka/HP belum. | E01, E04 |
| R-002 | TERBUKTI PARSIAL: perbaikan boundary/source A-B tersedia; ketidakpastian nasal K2 dan default gate FAIL tetap dicatat. | E01 |
| R-003 | LULUS terbatas non-P1: 60 T01/22 T07/24 T03/1 T04; gerak film penuh belum dijuri. | E04, E05 |
| R-004 | GAGAL final: 226 non-P1+25 P1 lengkap geometrik; kontras 4,5: 1 sepanjang semua glyph belum lulus, bridge P1 masih bermasalah. | E02, E04, E05 |
| R-005 | TERBUKTI PARSIAL: wajah 0723 dipertahankan, K2 cut pulih; aksi 0469 kontinu dan wide 0523 tersedia. | E01, E04 |
| R-006 | TERBUKTI PARSIAL: wajah 0713/0718 dan wide 0619 ada; carry cut/objek yang dipetakan lulus; seluruh film masih belum. | E04 |
| R-007 | LULUS terbatas gambar/alpha: karya tidak tertutup glyph yang dipetakan; encoded clay still/carry tersedia. | E04 |
| R-008 | TERBUKTI PARSIAL: processed T2 native dipilih, gambar 0531 tepat; masking oleh musik belum diuji. | E01, E04, E07 |
| R-009 | TERBUKTI PARSIAL: 0661 VR/Makepung dan wajah 0399; C3 display memiliki provenance, belum audit film. | E02, E04 |
| R-011 | TERBUKTI PARSIAL: 8,5 di pintu gelap dan callback/rating utuh pada sumber; master penuh/HP masih belum. | E01, E04 |
| R-012 | BELUM: 3 trim preflight tersedia, 0 cue ditempatkan. | E07 |
| R-014 | LULUS kesetiaan ≤1 LSB/level VO; gate canonical tetap FAIL karena gain negatif, bukan PASS palsu. | E01 |
| R-015 | LULUS mapping 171 stills+R-023 remap; bukan bukti taste/kontras final. | E03, E05 |
| R-016 | LULUS penggantian: 0661 VR/controller+Makepung 7,5–9,0 detik, slot 2487–2532; tidak ada 0653 di EDL aktif. | E04 |
| R-017 | TERBUKTI PARSIAL: native R5 satu baris 250 px; keutuhan frasa/hierarki perlu review seluruh P1. | E05 |
| R-018 | TERBUKTI PARSIAL: fonem utama pulih; nasal K2 tidak dinyatakan selesai. | E01, E02 |
| R-019 | LULUS terbatas R5: 25 kata/piksel di luar glyph sama sumber yang di-crop; audit alur final belum. | E05 |
| R-021 | LULUS metadata adjudication; 251 word/onset tetap. | E02 |
| R-022 | GAGAL final: desain R5 mengubah komposisi; bridge gelap masih mendekati pilar dan wajib dijuri/diperbaiki. | E05 |
| R-023 | LULUS kecocokan crop terukur NCC 0,98667 dan still terpilih; bukan otomatis berarti seluruh P1 PASS. U tertutup penuh dicatat. | E05 |
| R-024 | Dokumen/evidence disusun pada snapshot ini; keberadaan commit di origin/main dibuktikan Git, tidak meluluskan video. | E10 |
| R-025 | BELUM final: 3 pasang A-B ditinjau, 0 filter diterapkan karena pencahayaan lokal dipertahankan; kontinuitas seluruh film belum dijuri. | E09 |
| R-026 | BELUM: cue/mix belum ada; preflight bukan analisis timeline SFX. | E07 |
| R-027 | BELUM: animasi logo dipertahankan, cue aksen belum ditempatkan. | E04, E07 |
| R-028 | PARSIAL: VO −15,8 LUFS dan fidelity terukur; ducking/master penuh belum. | E01, E07 |
| R-029 | TERBUKTI PARSIAL: DFN+ raw blend/T2 presence statis dipilih native; full mix/HP belum. Tidak mengklaim seluruh hipotesis filter dipasang. | E01, E07 |
| R-030 | LULUS geometrik parsial: 226 non-P1+25 P1 ≥6 frame/onset±2; 7 timing review words memakai cue frasa, bukan presisi fonem palsu. | E02, E04, E05 |
| R-031 | PARSIAL: timestamp kata gap 0,1534 detik≈4,602 frame; gap EDL nominal 1 frame. Onset native utuh, audisi master masih belum. | E01 |
| R-032 | BELUM: recap penuh/master belum ada; proof parsial tidak meluluskan empat jendela final. | E08, E10 |
| R-033 | TERBUKTI PARSIAL: map 39 segmen+16 bite tersedia lokal; paket final/Drive belum ada. DELIVERY mencatat status ini. | E01, E10 |
| R-034 | TERBUKTI PARSIAL: pemulihan fonem dan handle tercatat; keamanan fade in awal 3–5 frame perlu diperiksa per head. Tidak mengklaim preset dipasang pada setiap head. | E01 |

ID Diganti R-010/R-013/R-020 hanya sejarah; otoritas barunya R-022/R-023. Seluruh keputusan aktif harus diperiksa kembali ketika aset/INFO/cue/stem berubah; verdict tanpa hash lama tidak diadopsi. Tidak memanggil Claude QC.

Bukti lama Day 1/v2 disimpan di [arsip](archive/JURI-Day1-v2-legacy.md) dan tidak berlaku untuk v11. Syarat lulus akhir: semua catatan aktif terselesaikan dengan bukti aktual, seluruh frame dijuri, sound/master/HP/sync dan delivery terverifikasi.

PUTUSAN: GAGAL
