# Audio · Video Perkenalan (18 Nov 2026, v6, 66,86 dtk)

Semua musik dan SFX untuk video perkenalanku (vertikal 9:16). Worker di PC server tidak terhubung ke Epidemic, jadi file di sini adalah satu-satunya sumber audio. Peran dan frame cue ada di `EDITING-GUIDELINE-FINAL.md` §5 (Drive `Claude edit/Siap edit/2026-11-18 — Video Perkenalan Irfan/`). Kalau sebuah peran belum ada filenya, catat di laporan dan tanya aku; jangan cari bunyi lain.

Sumber: Epidemic Sound (akun Irfan) kecuali Otis (file dari Irfan). File disimpan untuk produksi, bukan untuk dibagikan ulang.

## Musik
Konvensi level: LUFS stereo; suara v6 diputar dual-mono = −16,6 LUFS.

| File | Dipakai | Catatan |
|---|---|---|
| `musik/potongan_bed_v6_RainInLA_0-25.60.wav` | f0–768 (0–25,60 dtk) | Auxjack – Rain in L.A. (90 BPM, ±C mayor). Intro dinaikkan +6 dB di 0–19,5 dtk, normal lagi di 21 dtk saat drum masuk. 0–20 dtk ±−27,7 LUFS. Pakai apa adanya, duck −3 dB saat bicara (ramp 60 ms) |
| `musik/potongan_otis_v6_25.725-66.86.wav` | f772–2006 (25,725–66,86 dtk) | Otis 0,07–20,94 dtk (8 bar sebelum energi naik), sisanya loop bar 5–8, crossfade 20 ms, fade out 0,4 dtk. ±−26,7 LUFS. Pakai apa adanya, duck −6 dB + EQ dip −4 dB di 1–4 kHz saat bicara (vokal sampel bersaing dengan ucapan) |
| `mix_referensi_v6d_suara+musik.mp3` | Acuan dengar | Suara v6 + kedua potongan dengan duck/EQ di atas. −16,6 LUFS, puncak −0,73 dBFS. Ini kebenaran mix musik; SFX belum ada |
| `musik/Auxjack - Rain in L.A.mp3` | Sumber bed | Epidemic id `4cd02e2c-61fb-483b-8f21-d84a420d8e06` |
| `musik/Auxjack - Another Christmas Alone.mp3` | Cadangan bed | 90 BPM, G mayor. Id `b780c380-825a-4bba-9d67-4889ea6c3541` |
| `musik/JAY-Z & Kanye West - Otis.mp3` | Sumber Otis | 92,3 BPM |

Pocket: bed berhenti 25,60 dtk, Otis masuk 25,725 dtk.

## SFX (48 kHz, 24-bit, stereo, semua dinormalisasi ke puncak −6 dBFS)

Satu peran = satu file. Taruh **puncak** file di frame objeknya. Klik kamera, mouse (dua kali, 5,5 kHz), kertas sudah low-pass. Gain −4…−10 dB relatif suara.

| File | Peran | Onset / puncak (ms) | Epidemic id |
|---|---|---|---|
| `sfx/kamera-klik_negative.wav` | Negative 1 f di cut/penekanan | 22 / 76 | a34c1033-3997-4d96-a5db-e3c36e4f8c3c |
| `sfx/whoosh-kamera.wav` | Gerak kamera: push-through, whip, pull-back, dive, carry | 99 / 327 | c406a00b-d4b3-42e9-ba76-707ba5174543 |
| `sfx/film-burn.wav` | Transisi film burn | 115 / 398 | 073cf199-3d1b-4a67-9128-a5abd13870ff |
| `sfx/hantam-sub.wav` | Hero slam (5×) | 76 / 223 | 4969f8ba-0853-49d3-8d5f-9787371deb54 |
| `sfx/ui-pop.wav` | Objek UI/kartu/tile/jendela muncul | 8 / 34 | 7cce069c-4a3a-4746-b5c8-94a653fab587 |
| `sfx/ui-tutup.wav` | Ikon batal dibuka | 22 / 97 | 8b38b9c4-7b02-44f0-aaf6-9be960f8f175 |
| `sfx/mouse-klik.wav` | Klik tombol Follow | 10 / 98 | 78e23a2d-c645-491d-b826-c5ca15d1efdd |
| `sfx/kertas-polaroid.wav` | Polaroid mendarat | 68 / 163 | cda39aae-673d-4bae-a99c-d47d84d646fe |
| `sfx/kertas-sobek.wav` | PALSU sobek, cincin BUILDER TRAP sobek | 41 / 102 | 37811ec6-786d-45e6-9fd0-3a6f35809394 |
| `sfx/kardus-mendarat.wav` | Kardus tertutup dan mendarat | 87 / 231 | 2081473a-a044-4ffc-8067-c0a12c97a882 |
| `sfx/kardus-buka.wav` | Kardus dibuka (titik balik) | 52 / 414 | fbfe4978-15d7-4925-bfae-8086e9c671e2 |

Angka: `sfx_meta.json`.
