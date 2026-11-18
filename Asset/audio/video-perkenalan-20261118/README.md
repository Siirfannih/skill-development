# Audio · Video Perkenalan (18 Nov 2026)

Semua musik dan SFX untuk video perkenalanku (vertikal 9:16, 57,52 dtk). Worker di PC server tidak terhubung ke Epidemic, jadi file di sini adalah satu-satunya sumber audio. Jangan cari bunyi lain sebelum membaca tabel ini; kalau sebuah peran memang belum ada filenya, catat di laporan.

Sumber: Epidemic Sound (akun Irfan) kecuali Otis (file dari Irfan). Lisensi Epidemic berlaku untuk karya yang dipublikasikan dari akun berlangganan; file ini disimpan untuk produksi, bukan untuk dibagikan ulang.

## Musik

| File | Dipakai | Catatan |
|---|---|---|
| `musik/Auxjack - Rain in L.A.mp3` | Bed tipis 0,00–25,60 dtk | Lo-fi hip hop, 90 BPM, ±C mayor. Intro tipis 0–20 dtk, drum masuk ±20 dtk (jatuh di "katanya…", membangun ke titik balik). Epidemic id `4cd02e2c-61fb-483b-8f21-d84a420d8e06` |
| `musik/Auxjack - Another Christmas Alone.mp3` | Cadangan bed | 90 BPM, G mayor, sentimental. Id `b780c380-825a-4bba-9d67-4889ea6c3541` |
| `musik/JAY-Z & Kanye West - Otis.mp3` | 25,725 dtk → akhir | 92,3 BPM. Pakai detik 0,07–20,94 lagu (8 bar, sebelum energi naik ±21 dtk), sisanya loop bar 5–8, crossfade 20 ms, fade out 0,4 dtk |
| `musik/potongan_bed_RainInLA_0-25.60.wav` | Siap pakai | Sudah dipotong 0–25,60 dtk, fade in 20 ms, fade out 120 ms, level = VO −10 LU (belum di-duck) |
| `musik/potongan_otis_25.725-57.52.wav` | Siap pakai | Sudah dirangkai (8 bar + loop), level = VO −7 LU (belum di-duck). Mulai tepat di timeline 25,725 dtk |
| `mix_referensi_v6_suara+musik.mp3` | Acuan dengar | Suara v5 + kedua potongan, duck −3 dB (bed) / −4 dB (Otis) saat bicara, ramp 60 ms. −16,7 LUFS, puncak −0,87 dBFS. Ini target mix musik; SFX belum ada |

Pocket senyap: bed berakhir 25,60 dtk, Otis masuk 25,725 dtk (4 f hening sebelum "Tapi").

## SFX (48 kHz, 24-bit, stereo)

Satu peran = satu file di seluruh video (Lantai E24). Taruh **puncak** file (kolom puncak) tepat di frame objeknya, bukan awal file.

| File | Peran | Onset / puncak (ms) | Epidemic id |
|---|---|---|---|
| `sfx/kamera-klik_negative.wav` | Negative 1 f (invert) di cut/penekanan | 25 / 76 | a34c1033-3997-4d96-a5db-e3c36e4f8c3c |
| `sfx/whoosh-kamera.wav` | Gerak kamera: push-through, whip, dive, punch besar | 99 / 327 | c406a00b-d4b3-42e9-ba76-707ba5174543 |
| `sfx/film-burn.wav` | Transisi film burn | 115 / 398 | 073cf199-3d1b-4a67-9128-a5abd13870ff |
| `sfx/hantam-sub.wav` | Kata hero slam (builder trap) + flash | 76 / 223 | 4969f8ba-0853-49d3-8d5f-9787371deb54 |
| `sfx/ui-pop.wav` | Objek UI/kartu/tile/chip/ikon muncul | 8 / 34 | 7cce069c-4a3a-4746-b5c8-94a653fab587 |
| `sfx/ui-tutup.wav` | Ikon/jendela tertutup (#16) | 22 / 97 | 8b38b9c4-7b02-44f0-aaf6-9be960f8f175 |
| `sfx/mouse-klik.wav` | Kursor klik tombol Follow (#20) | 10 / 97 | 78e23a2d-c645-491d-b826-c5ca15d1efdd |
| `sfx/kertas-polaroid.wav` | Polaroid/sticky note mendarat di kolase hello! (#20) | 68 / 163 | cda39aae-673d-4bae-a99c-d47d84d646fe |
| `sfx/kardus-mendarat.wav` | Kardus produk mendarat (#8 gaya Vox) | 87 / 231 | 2081473a-a044-4ffc-8067-c0a12c97a882 |

Spektrum (diukur dari preview): whoosh-kamera, film-burn, ui-pop, ui-tutup dominan 250 Hz–2 kHz; hantam-sub < 250 Hz; klik kamera, mouse, kertas punya 2–6 kHz 40–55 % → beri low-pass 6 kHz dan gain −8…−10 dB supaya tidak menusuk (aturan No Ear-Fatigue). Kata KT per kata tidak diberi bunyi.

Metadata angka: `sfx_meta.json`.
