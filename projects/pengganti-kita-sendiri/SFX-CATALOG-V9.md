# SFX Catalog V9 - Pengganti Kita Sendiri

Sumber: Epidemic Sound (WAV via MCP, tanpa sintesis). File: `/home/claude/pks/sfx_v9/<role>/<judul>__<id8>.wav` (belum di-commit ke repo, terlalu besar). Metrik diukur dengan numpy FFT pada mono mix: `<120 Hz` dan `2-6 kHz` = fraksi energi (bukan dB). Aturan: tolak jika 2-6 kHz > 0.35 (glass_ping/ui_tap boleh <= 0.5).


## riser_coldopen

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| long-rise-braam__fae91ea3.wav | fae91ea3 | Designed, Riser, Long Rise, Braam, Epic Build Up, Reversed | 6.93 | -13.3 | 609 | 0.03 | 0.05 | reversed braam: naik lalu cut |
| reversed-distorted-riser__fcce71b9.wav | fcce71b9 | Designed, Riser, Cinematic Hit, Reversed, Distorted | 6.54 | -2.2 | 120 | 0.75 | 0.00 | lolos |
| tension-glitch-riser__1b894efa.wav | 1b894efa | Designed, Riser, Horror, Abstract, Glitches, Tension Build Up, Clicky | 9.08 | -6.2 | 262 | 0.61 | 0.02 | 9.1 s (trim ke 6-8 s) |

**Pilihan 1: reversed-distorted-riser** - Reversed cinematic riser 6.5 s, 75% energi <120 Hz dan 0.00 di 2-6 kHz; naik lalu berhenti keras tanpa ekor, cocok hard-stop di 0:08. Alternatif lebih terang: long-rise-braam (centroid 609 Hz).

## sub_impact

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| deep-boom-impact__2f0a40ab.wav | 2f0a40ab | Designed, Boom, Cinematic, Deep, Boom, Impact | 2.80 | -1.2 | 71 | 0.98 | 0.00 | lolos |
| low-boom__240e5b47.wav | 240e5b47 | Designed, Boom, Cinematic Hit, Low Boom | 3.50 | -7.0 | 23 | 1.00 | 0.00 | lolos |
| low-hit__6d82b75c.wav | 6d82b75c | Designed, Boom, Low Hit | 3.55 | -11.6 | 58 | 0.96 | 0.00 | lolos |

**Pilihan 1: deep-boom-impact** - 98% <120 Hz, centroid 71 Hz, nol energi 2-6 kHz, durasi pendek 2.8 s; paling padat untuk kata raksasa. Peak -1.2 dB: turunkan ke sekitar -12 dB di mix. low-boom (23 Hz) lebih sub tapi hampir tak terdengar di speaker HP.

## low_whoosh

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| deep-low-cinematic__689b1489.wav | 689b1489 | Swooshes, Whoosh, Deep, Low, Cinematic | 2.44 | -0.4 | 89 | 0.85 | 0.00 | lolos |
| low-short-02__890e3d48.wav | 890e3d48 | Swooshes, Whoosh, Low, Short 02 | 1.55 | -6.5 | 59 | 0.94 | 0.00 | lolos |
| sub-cinematic-01__a9946ddf.wav | a9946ddf | Swooshes, Whoosh, Low, Sub, Cinematic 01 | 3.24 | -2.4 | 50 | 0.96 | 0.00 | lolos |

**Pilihan 1: sub-cinematic-01** - Centroid 50 Hz, 96% <120 Hz, 3.2 s, peak -2.4 dB; paling pas rentang 40-80 Hz. deep-low-cinematic lebih pendek (2.4 s) dan sedikit lebih tinggi (89 Hz).

## scifi_whoosh

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| tech-data-transition-02__27384f5f.wav | 27384f5f | Swooshes, Whoosh, Tech, Data Transition 02 | 1.56 | -16.6 | 6550 | 0.00 | 0.22 | lolos |
| tech-data-transition-09__cf9f1bcc.wav | cf9f1bcc | Swooshes, Whoosh, Tech, Data Transition 09 | 5.41 | -16.9 | 3797 | 0.00 | 0.65 | REJECT 2-6k>0.35 |
| tech-data-transition-10__33907101.wav | 33907101 | Swooshes, Whoosh, Tech, Data Transition 10 | 4.01 | -16.5 | 2019 | 0.30 | 0.20 | lolos |

**Pilihan 1: tech-data-transition-10** - Tekstur data/elektrik, centroid 2.0 kHz, 2-6 kHz hanya 0.20, 30% <120 Hz memberi bobot; paling halus. transition-02 (1.6 s) cepat tapi centroid 6.5 kHz, tipis.

## glass_ping

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| glass-pops__9da883ac.wav | 9da883ac | UI, Click, Pops, Glass, UI, Pops | 0.66 | -13.9 | 1233 | 0.03 | 0.11 | lolos |
| ui-confirm-menu__998fe887.wav | 998fe887 | UI, Click, UI Buttons, Confirm, Menu | 0.64 | -19.2 | 828 | 0.19 | 0.00 | lolos |
| ui-ping-select__3297dd2d.wav | 3297dd2d | UI, Click, UI Buttons, Ping, Select | 1.06 | -21.0 | 10048 | 0.00 | 0.31 | lolos (<=0.5), catatan: 0.31, centroid 10 kHz |

**Pilihan 1: ui-confirm-menu** - Hampir nol energi 2-6 kHz (0.00), centroid 828 Hz, 0.64 s, lembut dan tidak nusuk. ui-ping-select lebih "glassy" tapi 0.31 di 2-6 kHz dan centroid 10 kHz.

## ui_tap

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| menu-select-notif-24__19f645e5.wav | 19f645e5 | Games, Video, Menu UI, Select, Notification 24 | 0.63 | -15.0 | 786 | 0.00 | 0.00 | lolos |
| notification-tap-hollow__62416f3d.wav | 62416f3d | UI, Alert, Notifications, Notification, Tap, Hollow | 0.48 | -14.1 | 2226 | 0.00 | 0.25 | lolos (<=0.5) |
| ui-type-zap__326f0f67.wav | 326f0f67 | UI, Click, UI Buttons, Type, Zap | 0.23 | -15.2 | 1538 | 0.00 | 0.14 | lolos (<=0.5) |

**Pilihan 1: menu-select-notif-24** - 0.00 di 2-6 kHz, centroid 786 Hz, 0.63 s, tap bulat tidak tajam. notification-tap-hollow (0.25) lebih "tap" tapi lebih terang; bisa dipakai sebagai variasi pitch untuk agen berbeda.

## telemetry_blip

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| data-bleeps-01__e3f1540f.wav | e3f1540f | UI, Data, Bleeps 01 | 2.84 | -21.4 | 10332 | 0.00 | 0.21 | lolos |
| data-bleeps-02__a040a03e.wav | a040a03e | UI, Data, Bleeps 02 | 3.42 | -18.0 | 2460 | 0.00 | 0.58 | REJECT 2-6k>0.35 |
| data-processing-loading-11__ee87ec2b.wav | ee87ec2b | UI, Data, Computer, Futuristic, Data Processing, Loading 11 | 6.36 | -10.8 | 16643 | 0.00 | 0.01 | lolos |
| data-processing-loading-31__53aee1a4.wav | 53aee1a4 | UI, Data, Computer, Futuristic, Data Processing, Loading 31 | 5.21 | -10.5 | 7870 | 0.00 | 0.66 | REJECT 2-6k>0.35 |
| glitch-data-processing-02__9bd7d039.wav | 9bd7d039 | UI, Glitch, Glitch Data Processing 02 | 2.60 | -7.3 | 4416 | 0.04 | 0.37 | REJECT 2-6k>0.35 |
| telemetry-data-readout-01__6bf8bd1d.wav | 6bf8bd1d | UI, Data, Processing, Straight Telemetry, Garble, Data Readout 01 | 7.75 | -12.3 | 1631 | 0.00 | 0.13 | lolos |

**Pilihan 1: telemetry-data-readout-01** - Hanya 0.13 di 2-6 kHz, centroid 1.6 kHz, 7.8 s data readout yang bisa dipotong jadi blip tunggal. Dua kandidat lain ditolak (>0.35).

## heartbeat_pulse

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| cinematic-45bpm__978058fa.wav | 978058fa | Human, Heartbeat, Cinematic, 45 BPM | 59.85 | -6.8 | 62 | 0.99 | 0.00 | lolos |
| cinematic-54bpm__c805d6d8.wav | c805d6d8 | Human, Heartbeat, Cinematic, 54 BPM | 64.00 | -6.7 | 62 | 0.99 | 0.00 | lolos |
| cinematic-58bpm__39b81e29.wav | 39b81e29 | Human, Heartbeat, Cinematic, 58 BPM | 63.50 | -6.9 | 62 | 0.99 | 0.00 | lolos |

**Pilihan 1: cinematic-54bpm** - 99% <120 Hz (centroid 62 Hz), 64 s loopable, 54 BPM pelan sesuai "Ruang Hampa". 45 BPM lebih lambat/dramatis, 58 BPM lebih netral.

## graph_riser

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| scifi-buildup-eerie-01__aa2f842f.wav | aa2f842f | Designed, Riser, Transition, Build Up, Eerie, Futuristic, Scifi 01 | 8.00 | -11.0 | 862 | 0.63 | 0.16 | lolos |
| shepard-illusion-continuous-up__20fb9abc.wav | 20fb9abc | Designed, Misc, Shepard Tone, Illusion, Continuous, Up | 111.63 | -12.9 | 126 | 0.52 | 0.00 | perlu trim ke 4-6 s (112 s) |
| shepard-tone-up-09__25747e8d.wav | 25747e8d | Designed, Drone, Shepard Tone Up 09 | 27.36 | -10.9 | 135 | 0.58 | 0.00 | perlu trim ke 4-6 s (27 s) |
| synth-braam-riser__c7e4508b.wav | c7e4508b | Designed, Riser, Synth Braam Riser | 6.25 | -16.4 | 365 | 0.61 | 0.01 | lolos |

**Pilihan 1: shepard-tone-up-09** - Shepard tone sungguhan (naik kontinu), nol energi 2-6 kHz, centroid 135 Hz. Harus di-trim 4-6 s (file 27 s). Bila tidak ingin trim: synth-braam-riser 6.25 s utuh (0.01).

## room_tone

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| aircon-unit-b__51e5bac6.wav | 51e5bac6 | Ambience, Room Tone, Interior, Air Condition, Unit B | 118.96 | -27.5 | 384 | 0.19 | 0.01 | 119 s, loopable; 19% <120 Hz (dengung AC) |
| hospital-air__0d38392e.wav | 0d38392e | Ambience, Room Tone, Hospital, Air | 62.80 | -43.1 | 985 | 0.04 | 0.01 | peak sangat pelan -43 dB, loopable (63 s); butuh crossfade loop |
| hotel-airy-copenhagen-01__2caa0fdb.wav | 2caa0fdb | Ambience, Room Tone, Hotel Room, Airy, Copenhagen 01 | 123.00 | -24.3 | 627 | 0.76 | 0.00 | 123 s; 76% <120 Hz (rumble) -> cek loop |

**Pilihan 1: hospital-air** - Paling lembut (peak -43 dB), netral, 63 s (>30 s) dengan 0.01 di 2-6 kHz. Catatan: judul "hospital", dengarkan dulu; fallback aircon-unit-b.

## snap_click

| File | ES ID (8) | Judul Epidemic | Durasi s | Peak dBFS | Centroid Hz | <120 Hz | 2-6 kHz | Status |
|---|---|---|---|---|---|---|---|---|
| dull-swallow-pop__3ff28fbf.wav | 3ff28fbf | UI, Alert, Pops, Dull, Swallow, Pops | 0.28 | -16.8 | 494 | 0.01 | 0.00 | lolos |
| low-zap-pop__6ef71795.wav | 6ef71795 | UI, Alert, Pops, Low, Zap, Pops | 0.21 | -18.4 | 696 | 0.02 | 0.04 | lolos |
| nikon-d7200-shutter__a34c1033.wav | a34c1033 | Camera, Nikon D7200, Shutter, Without Flash | 0.76 | -7.4 | 4147 | 0.03 | 0.46 | REJECT 2-6k>0.35 |
| shutter-release-01__8e248136.wav | 8e248136 | Camera, Digital, Shutter Release Button, Click, Press 01 | 3.57 | -5.4 | 8655 | 0.00 | 0.41 | REJECT 2-6k>0.35 |
| shutter-release-02__7acda22a.wav | 7acda22a | Camera, Digital, Shutter Release Button, Click, Press 02 | 3.50 | -6.1 | 7354 | 0.00 | 0.41 | REJECT 2-6k>0.35 |
| shutter-release-03__3c1fe72f.wav | 3c1fe72f | Camera, Digital, Shutter Release Button, Click, Press 03 | 9.70 | -6.9 | 8390 | 0.00 | 0.41 | REJECT 2-6k>0.35 |
| sony-alpha-shutter-only__d8dd8d3d.wav | d8dd8d3d | Camera, Digital SLR, Sony Alpha, Shutter Click Only | 0.38 | -1.7 | 5032 | 0.00 | 0.53 | REJECT 2-6k>0.35 |
| zenit-shutter-01__075b129e.wav | 075b129e | Camera, KMZ Zenit 12XP, Shutter 01 | 0.75 | -8.4 | 7627 | 0.00 | 0.37 | REJECT (marginal 0.37) |

**Pilihan 1: low-zap-pop** - SATU-SATUNYA yang lolos aturan 2-6 kHz (0.04), tapi bunyinya tumpul (centroid 696 Hz), bukan "crisp". Semua suara rana kamera asli GAGAL aturan (0.37-0.53, centroid 4-8 kHz). Opsi override jika Irfan mau crisp: zenit-shutter-01 (0.37, tipis di atas batas).

## Catatan
- Semua file tanpa edit; trim/loop dilakukan di tahap mixing.
- Kandidat ditolak tetap disimpan di folder untuk audit, jangan dipakai.
- Pembatas dengar-akhir (listening QC) belum dilakukan; metrik hanya filter awal. Disarankan verifikasi Gemini + ukur ulang di phone volume 20/50/100%.
- ID lengkap UUID dapat dicari di Epidemic via 8 karakter awal.
