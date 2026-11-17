# REPORT-R4-audio (versi A)
1. lock visual: LULUS, sha fceca09029a77cf2 (qc/master_gambar.mp4; 29,97 fps, 2512 frame, 83,817 dtk).
2. sfx_build: 68 cue pada objects.json; 70 cue pada audio/cues.json. min gap 0,172 dtk; maks 5 per 2 dtk. sapa 3, coretan 2, tulisan-tangan senyap.
3. Cue sheet: (a) kunci-slam tersisa hanya template./loop pembelajaran/skill (bukan nama dihapus); (b) sapa 8,575/9,495/9,81 vs bubble 8,575/9,443/9,81 (selisih 0/1,6/0 f); (c) coretan 58,559 dan 81,153 = awal objek; (d) 7 cue audit diukur dari selisih frame: 34,731 (puncak transisi 34,667), 50,384 (onset 50,40), 53,558 (gerak keluar kartu 53,50-53,77), 72,139 (potongan 72,13), 28,929 (puncak 28,90), 30,554 (ketikan sangat halus), 21,55 (benturan 21,53). Tidak ada yang meleset > 2 f: TIDAK ADA cue digeser, sfx_build.py tidak diubah.
4. sfx_density: PASS (0,83 cue/dtk). lock sfx LULUS 510fb3abbcfa12f2.
5. music_build (A, B, tanpa-musik dijalankan apa adanya): mix_A LUFS -15,78; puncak -1,002 dBFS; clarity_min 6,6 dB; musik -28,02 LUFS; selisih suara mix vs edit/suara.wav = 8,9e-08 (x1,0); limiter False.
6. lock musik LULUS 22b77637cded336b; audio_order check order-A: PASS (suara✓ visual✓ sfx✓ musik✓).
7. audio_phone (phone_A/cues.json diperbarui): 52/70 cue terdengar di 100% dan 50%, 51/70 di 20%; --list hanya memuat 18 cue tak terdengar, tak satu pun sapa (8,575/9,495/9,81) atau coretan (58,559/81,153); harsh SFX 0; VO clarity median 12,4 dB, terburuk 6,6 dB di 81,0 dtk.
8. Pratinjau out/kandidat-A-r4.mp4: 2512 frame, video 83,817067 vs audio 83,817000 (selisih 0,07 ms). Catatan: pakai -shortest membuang 2 frame, jadi tanpa -shortest.
Keluaran: audio/mix_A.wav, audio/cues.json, audio/objects.json, audio/stem_*_A.wav, audio/mix_report.json, audio/order-A/ORDER.json, audio/phone_A/. mix_B.wav dan mix_tanpa-musik.wav ikut terbarui (efek samping music_build, tidak dipakai).

## Ronde 2 (master gambar ronde 3 visual)
- lock visual LULUS ff379d40106a4487 (2512 f, 83,817 dtk).
- sfx_build.py (satu-satunya perubahan): cue "Claude mengetik di meja 3D" tidak lagi membaca b10a/timing.json['start'] (72,2111 + 0,1 = 72,311); sekarang t lapisan `b10a_meja3d` di lego/lego.json (72,072) + 0,0056 (selisih lama timing.start − slot lama 72,2055) + 0,1 = 72,178, lalu dipaksa ≥ transisi 72,139 + 0,102 = 72,241 karena sfx_density gagal (dua bunyi 72,14 dan 72,18 < 100 ms, Lantai E24). Cue ketik final 72,241.
- Ukuran frame: potongan B11→meja di f2162 (selisih frame 30,8; = 72,139 dtk), cue transisi 72,139 tepat f2162 (0 f). Gerak mengetik mulai f2163 (72,172); cue 72,241 = f2165,1, +2,1 f (tepat di batas ≤ 2 f, geser ke belakang dipaksa gerbang 100 ms).
- Selisih cue lama vs baru: hanya ketik 72,311 → 72,241 dan objek-mendarat 75,644 → 75,645; semua kata-hero (termasuk hero keluar/masuk 72,608) tidak berubah.
- sfx_density PASS (0,83/dtk, min gap 0,102 dtk). lock sfx 201476910319ad2b. music_build: mix_A -15,78 LUFS, puncak -1,002 dBFS, suara selisih 8,9e-08 (x1,0), clarity_min 6,6 dB. lock musik 69e1181ee1170546. audio_order check order-A PASS.
- HP: 53/70 terdengar di 100% dan 50%, 51/70 di 20%; sapa dan coretan tetap terdengar; harsh 0. Cue 72,14 dan 72,24 tercatat di daftar tak terdengar (tertutup bed/suara, bukan di bawah ambang SPL 27-28 dB), sama seperti ronde 1.
- Pratinjau out/kandidat-A-r4.mp4 dibuat ulang tanpa -shortest: 2512 frame, video 83,817067 vs audio 83,817000.

## Ronde 3 (master gambar ronde 4/4b/4c)
- lock visual LULUS c715f0d518634386 (2512 f).
- Slot meja 3D: lego.json b10a_meja3d t = 72,07534; potongan B11->meja terukur di f2160 (selisih frame 30,8; 72,072 dtk), gerak mengetik mulai f2161.
- sfx_build.py: (1) cue transisi audit 72,139 (f2162, kini 2 f terlambat) digeser ke 72,075 (f2160,1, 0,1 f dari cut), supaya cue ketik tidak bertabrakan < 100 ms; SLOT_WHOOSH ikut 72,075. (2) Cue ketik tetap mengikuti t lapisan slot + 0,0056 + 0,1 = 72,181 (f2163,3; +2,3 f dari onset f2161, tepat di batas karena jarak 100 ms dari whoosh; max(...,whoosh+0,102) = 72,177 tidak mengikat).
- Cue lain tidak berubah terhadap ronde 2 (objects.json akar diperbarui builder 05:19, frame sapa 257/283/294, coretan 1755/2432 sama). Ukuran: sapa 8,575 / 9,495 / 9,81 vs objek 0 / +1,6 / 0 f; coretan 58,559 dan 81,153 vs objek 0 f; semua kata-hero 0 f vs objek (hero 72,608 +0 f). Selisih frame lokal pada bubble/coretan berisik karena gerak latar, jadi acuannya objects.json.
- sfx_density PASS (0,83/dtk, min gap 0,106). lock sfx 791a4018b2600cdf. Mix A -15,78 LUFS, puncak -1,002 dBFS, suara x1,0 (selisih 8,9e-08), clarity_min 6,6 dB. lock musik 90c340567440c744. check order-A PASS.
- HP 53/70 (100% dan 50%), 51/70 (20%); sapa dan coretan terdengar; harsh 0.
- Pratinjau out/kandidat-A-r4.mp4: 2512 f, video 83,817067 vs audio 83,817000.

## Ronde 4 (master ronde 5)
- lock visual LULUS 2fbaa86557754b5c. sfx_build: cues.json identik dengan ronde 3 pada t, peran, dan jumlah (70); satu-satunya beda adalah nomor lapisan teks bergeser (T088->T089, T091->T092, T095->T096, T100->T101, T104->T105) karena blok "Bahkan ChatGPT" disisipkan.
- sfx_density PASS (0,83/dtk). lock sfx 1966f67ba4095d4e. Mix A -15,78 LUFS, puncak -1,002 dBFS, suara x1,0 (8,9e-08). lock musik 17f8ae712583a15d. check order-A PASS.
- Pratinjau out/kandidat-A-r4.mp4: 2512 f, video 83,817067 vs audio 83,817000.
