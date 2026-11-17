# REPORT-audio · Fase 4 SFX + Fase 6 musik (Penata suara, 17 Nov 2026)
PUTUSAN SFX `sfx_density.py` pada draft terkunci: LULUS; 46 cue untuk 59 objek, 0,55/dtk, maks 4 cue/2 dtk, jarak minimum 0,21 dtk; 2 objek slop `senyap` + alasan (rentetan >5/2 dtk). `lock sfx --objects`: LULUS (a3ac02e2/edf893c2 setelah gain final).
SFX: 13 peran, satu peran satu file (SFXIrfan: pop up, Move, Woosh, Kinetictypography, Cutcontrastransision, Keyboardtyping, Katapertama, Lasertransision; ES: Message, Confirm, Scifi Glitch 02, Glitch Databend 04, Bass Drop); semua didengar `earshot describe` (`audio/sfx_dengar.json`); tanpa kayu/koin/kartun/8-bit/sintesis; kartu paket memakai pop, bukan koin; gain −5…−10 dB; KT kata-per-kata senyap.
PUTUSAN pace_read: energi, 100–140 bpm. PUTUSAN music_fit: kandidat 5 < 8 (FAIL aturan 34, dilaporkan; peringkat saja): Ticking 97, Back To Black 86, Malice 80, Ecosystem 75, Aware 69; semua menutupi suara pada level uji, jadi musik dipasang −26,9 LUFS (di bawah suara −16,3 LUFS stereo), EQ tengah −3/−3,5 dB di 1/2,8 kHz, HPF 90 Hz, ducking −7 dB (serang 150 ms/lepas 450 ms); suara tidak disentuh.
Varian A: Aware 0–13,75 → With Some Malice (ketukan 1 di B2 13,747) → Aware 0:30 di push-through D_RELAY 58,572, fade 3 dtk di akhir. Varian B: pembuka Ticking Tension (tik 1 dtk di FINALLY 0,83), sisanya sama. Sambungan crossfade 150 ms di ketukan.
PUTUSAN music_check A dan B: LULUS, tanpa jendela 0,5 dtk < −35 dB (tanpa bolong), bed per babak −32,2…−32,8 dB (A), −32,2…−36,7 (B, B1b lebih pelan).
PUTUSAN audio_phone (20/50/100 %, setelah putusan M1-M5): A 38/38/37 dari 46, B 39/39/38 (sisa: 4 thud sub kata-hero tak terbawa speaker HP = diterima; 3 whoosh kini ≥ −6 dB terhadap bed tetapi 22,9–24,5 dB SPL <30 karena batas −4 dB; kinetik 5,94 dtk (A)); musik dipotong lokal 2,5–9 dB di whoosh (500 Hz–2 kHz sebelum dibatasi, musik −13…−1 dB), SFX tajam 0, SFX tajam 2–6 kHz 0; kejernihan suara median 12,2 (A)/12,6 (B) dB, terburuk 6,6 dB pada 79,0 dtk (dari −3,9 dB pada 67,0 dtk; musik dan SFX diturunkan lokal sampai ≥6,6 dB di semua jendela, SFX maks −12,5 dB, musik maks −9,8 dB).
Mix: `audio/mix_A.wav`, `mix_B.wav`, `mix_tanpa-musik.wav` (48 kHz stereo 24-bit): −15,8 / −15,9 / −16,1 LUFS (float 32-bit agar sampel suara tak terkuantisasi), puncak −1,0 dBFS (TANPA limiter/penangkap peak: puncak diturunkan hanya lewat otomasi gain lokal pada stem SFX/musik; suara = stem terkunci × 1,0, selisih float ≤9e-8), suara −16,3 LUFS stereo; stem `stem_suara.wav`, `stem_sfx.wav`, `stem_musik_A/B.wav`; pratinjau `preview_mix_A/B.mp4`, `preview_visual_sfx.mp4` (draft 960×540).
PUTUSAN titik sambung (onset terkuat ±120 ms): A Malice@13,747 −12 ms, strings@58,572 0 ms; B Ticking→Malice@13,747 −1 ms (tik digeser 57 ms), strings 0 ms. PUTUSAN lock musik per varian (diulang setelah stem berubah): LULUS (A 6d447d07, B 69193e69; sfx 2b11a5e5; `audio/order-A|B/ORDER.json`) dan `audio_order.py check` PASS (suara+visual+sfx+musik, termasuk pengecualian guard dan --terima-pelan). KREDIT: `musik/KREDIT.md`.
Tidak diaudit dengan telinga manusia: semua angka dari alat; titik sambung dan pilihan Ticking perlu didengar Opus/Irfan. Sumber lagu di `musik/sumber/*.wav` (±100 MB). Tanpa commit.

## Revisi audit (17 Nov, master 29,97 fps / 2496 f)
Cue baru (peran dan file SAMA): 34,268 dtk f1027 transisi-dunia (Woosh), 49,950 dtk f1497 objek-mendarat (pop up), 71,605 dtk f2146 transisi-dunia; total 49 cue untuk 59 objek, `objects.json` baru (frame 29,97) dipakai ulang.
PUTUSAN sfx_density terhadap `qc/master_gambar.mp4` (lock visual fa08ce68): LULUS (maks 5 cue/2 dtk, jarak minimum 0,18 dtk, whoosh ≥1 dtk). `lock sfx`: LULUS (cd85161b).
PUTUSAN lock musik A (88605732) dan B (39f5d5f9) diulang terhadap master baru dan `audio_order.py check` PASS di `audio/order-A|B`; pratinjau `preview_visual_sfx.mp4` = master + suara + SFX (98 MB; pratinjau A/B dihapus demi disk 4,0 GB).
Mix tiga varian dibangun ulang tanpa limiter, suara ×1,0 (selisih float ≤9e-8): A/B/tanpa-musik −15,80 / −15,83 / −16,06 LUFS, puncak −1,0 dBFS, kejernihan suara ≥6,6 dB (A) dan 6,6 (B) di semua jendela.
PUTUSAN audio_phone: A dan B 41/41/39 dari 49 SFX (100/50/20 %), SFX tajam 0; sisa tak terdengar sama dengan sebelumnya (thud sub kata-hero diterima, whoosh <30 dB SPL karena batas −4 dB) plus dua cue baru yang tertutup; kejernihan median 11,9 (A)/12,5 (B) dB. Tanpa commit.

## Revisi audit 2 (17 Nov, master lock visual 86e41e8d)
Cue baru: 53,153 dtk (f1593 kartu keluar, whoosh transisi-dunia gain −9 dB) dan 62,763 dtk (f1881 pergantian adegan kartu Claude → dua kartu, whoosh gain −7 dB di frame puncak; cue pesan 62,271 dipertahankan karena objek "amplop Clawd ke Codex" ada di sana). Total 51 cue untuk 59 objek (`objects.json` baru), file peran sama, whoosh ≥1 dtk.
PUTUSAN sfx_density terhadap master baru: LULUS (maks 5 cue/2 dtk, jarak minimum 0,18 dtk); `lock sfx` LULUS (bd774e6c).
PUTUSAN lock musik A (b64567f8) dan B (27e0f27f) diulang; `audio_order.py check` PASS di `audio/order-A|B`.
Mix tiga varian dibangun ulang, tanpa limiter, suara ×1,0 (selisih float ≤9e-8): A/B/tanpa-musik −15,79 / −15,83 / −16,05 LUFS, puncak −1,0 dBFS, kejernihan suara ≥6,6 dB; PUTUSAN audio_phone 100/50/20 %: 41/41/39 dari 51 SFX (A dan B), SFX tajam 0. Tanpa commit.

## Revisi audit 3 (17 Nov, master lock visual ba0fdd9e)
Cue baru: 66,066 dtk (f1980 pergantian adegan, whoosh transisi-dunia gain −8 dB, file sama); total 52 cue untuk 59 objek (`objects.json` baru). PUTUSAN sfx_density terhadap master baru: LULUS; `lock sfx` LULUS (7074eb5a).
PUTUSAN lock musik A (59f69e9a) dan B (15646f62) diulang; `audio_order.py check` PASS di `audio/order-A|B`.
Mix tiga varian dibangun ulang, tanpa limiter, suara ×1,0 (selisih float ≤9e-8): A/B/tanpa-musik −15,79 / −15,83 / −16,05 LUFS, puncak −1,0 dBFS, kejernihan suara ≥6,6 dB; PUTUSAN audio_phone 100/50/20 %: 41/41/39 dari 52 SFX (A dan B), SFX tajam 0. Tanpa commit.

## Penutup (17 Nov, lock visual cf91c782)
PUTUSAN lock sfx (7074eb5a, cue dan `objects.json` tidak berubah; objek identik, hanya penanda `senyap` pada salinan audio) dan lock musik A (59f69e9a) / B (15646f62) diulang tanpa mengubah cue/mix; `audio_order.py check` PASS di `audio/order-A|B`.
PUTUSAN verifikasi `out/`: ketiganya 2496 f, 30000/1001, audio 83,264 dtk, stream video identik byte (md5 f0cfe90a) dengan `qc/master_gambar.mp4` terbaru, audio berkorelasi 0,9998–0,9999 dengan `audio/mix_*.wav` (offset 0); diganti nama menjadi `out/varian-A.mp4`, `varian-B.mp4`, `tanpa-musik.mp4`.
PUTUSAN unggah: `rclone copy` ke "gdrive:Claude edit/2026-11-16 — Siirfan — Di Balik Skill Development/" selesai; `rclone ls` ukuran sama dengan lokal (varian-A 102.599.875, varian-B 102.608.656, tanpa-musik 101.923.332 byte); tanpa `rclone link`. Tanpa commit.

## Revisi-2 (17 Nov, suara c23e53d9, visual 55b0e625)
Cue disinkron ke `objects.json` baru (72 objek, 61 cue): peran baru "klik" (Enter.mp3) untuk klik saran perintah, saran/papan lahir/kartu Dicatat/komentar-kolom = objek-mendarat atau pesan (komentar pop-up = pesan), "diketik dihapus" = ketik, lingkaran wajah 74,44 dtk = whoosh masuk meja Blender, slot meja 75,645 = pop lembut, postingan IG 76,41 = whoosh keluar (whoosh ≥1 dtk menahan whoosh ke-2 di slot; audit lama f1881/f1980 dilepas karena adegan itu diganti papan lahir; audit lain digeser mengikuti suara baru). PUTUSAN sfx_density terhadap master baru: LULUS; `lock sfx` LULUS (a9c549d7).
PUTUSAN titik sambung: A dan B Malice@13,747 −12/−1 ms, strings Aware di push-through D_RELAY 58,972 dtk −11 ms. PUTUSAN lock musik A (5b30ea69) dan B (e13d5510) LULUS; `audio_order.py check` PASS di `audio/order-A|B`.
Mix tiga varian tanpa limiter, suara ×1,0 (selisih float ≤9e-8): A/B/tanpa-musik −15,78 / −15,81 / −16,02 LUFS, puncak −1,0 dBFS, kejernihan suara ≥6,6 dB; `stem_suara.wav` diperbarui ke suara R7.
PUTUSAN audio_phone (100/50/20 %): A 45/45/43 dan B 46/46/44 dari 61 SFX, SFX tajam 0; tak terdengar: thud sub kata-hero dan runtuh (sub-bass di bawah 320 Hz), whoosh <30 dB SPL (batas −4 dB), dua klik. Tanpa commit.

## Audit 6 (17 Nov, visual 810b491a)
Cue baru: ketik "/apple" 28,929 dtk (f867, 0,40 dtk) dan "cinematic" 30,554 dtk (0,66 dtk), file Keyboardtyping yang sama, gain −10 dB; runtuh kedua 21,55 dtk (bingkai neon jatuh f646, bass-drop sama, gain −10 dB; jendela spam longgar: tidak ada cue lain ±1 dtk); cue objek "kartu Dicatat terbang ke rak" digeser 68,165 → 68,80 dtk (frame puncak tooltip mendarat; salinan `audio/objects.json` mencatat t builder 68,165 sebagai awal terbang). 64 cue untuk 72 objek.
PUTUSAN sfx_density terhadap master baru: LULUS (maks 4 cue/2 dtk, jarak minimum 0,30 dtk); `lock sfx` LULUS (03f2b287). PUTUSAN lock musik A (a0bf3b9b) dan B (734b8cb3) LULUS; `audio_order.py check` PASS di `audio/order-A|B`.
Mix tiga varian dibangun ulang tanpa limiter, suara ×1,0 (selisih float ≤9e-8): A/B/tanpa-musik −15,75 / −15,78 / −15,99 LUFS, puncak −1,0 dBFS, kejernihan suara ≥6,6 dB; PUTUSAN audio_phone: A 45/45/43 dan B 46/46/44 dari 64 SFX, SFX tajam 0. Tanpa commit.

## Kunci ulang terhadap visual b208562a (17 Nov)
PUTUSAN lock sfx (03f2b287) dan lock musik A (a0bf3b9b) / B (734b8cb3) diulang terhadap visual b208562a tanpa mengubah cue atau mix (`sfx_density` LULUS; hash lock sfx dan musik identik dengan sebelumnya); `audio_order.py check` PASS di `audio/order-A|B`.
Verifikasi mix tetap: `cues.json`, `mix_A.wav`, `mix_B.wav`, `mix_tanpa-musik.wav` md5 identik sebelum dan sesudah; master 2512 f, 30000/1001. Tanpa commit.

## Ronde 8 (17 Nov, lock visual 76105389)
PUTUSAN lock sfx (03f2b287) dan lock musik A (a0bf3b9b) / B (734b8cb3) diulang terhadap visual 76105389 tanpa mengubah cue atau mix; `audio_order.py check` PASS di `audio/order-A|B`.
Verifikasi mix tetap: md5 `cues.json`, `mix_A.wav`, `mix_B.wav`, `mix_tanpa-musik.wav` identik sebelum dan sesudah; master 2512 f. Tanpa commit.

## Ronde 9 (17 Nov, lock visual c273a676)
PUTUSAN lock sfx (03f2b287) dan lock musik A (a0bf3b9b) / B (734b8cb3) diulang terhadap visual c273a676 tanpa mengubah cue atau mix; `audio_order.py check` PASS di `audio/order-A|B`.
Verifikasi mix tetap: md5 `cues.json`, `mix_A.wav`, `mix_B.wav`, `mix_tanpa-musik.wav` identik sebelum dan sesudah; master 2512 f. Tanpa commit.
