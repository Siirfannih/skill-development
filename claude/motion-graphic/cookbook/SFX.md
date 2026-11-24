# Cookbook · SFX per famili

<!-- dibangkitkan oleh tools/cookbook.py index; jangan diedit tangan -->

Kebutuhan bunyi tiap pola ditulis sebagai **famili** (karakter), bukan nama file. Untuk satu famili: lihat pola yang memakainya, coba stok lokal yang terdaftar, lalu cari bila tidak ada yang lolos dengar (`../guide/sfx/GUIDE.md` Cara 3, `../guide/sfx/FAMILI.md`).

## `air` · Air & Whip Motion

- **Karakter:** soft smooth air whoosh swoosh for a camera move, no harsh hiss
- **Pola yang memakainya (96):** 01.T2, 02.T2, 02.T5, 03.T6, 04.T6, 05.T3, 17.T2, 17.T6, 18.T1, 18.T3, 19.T3, 19.T4, 20.T1, 20.T3, 21.T2, 22.T4, 23.T3, 24.T2, 24.T6, 25.T1, 25.T2, 25.T3, 25.T4, 26.T2, 26.T4, 26.T6, 27.T2, 28.T2, 28.T4, 30.T1, 30.T4, 31.T1, 31.T5, 33.T5, 34.T3, 34.T4, 35.T5, 36.T3, 38.T2, 38.T4, 38.T5, 40.T2, 40.T4, 44.T3, 44.T4, 45.T3, 46.T6, 47.T2, 47.T5, 55.T3, 57.T3, 58.T4, 59.T2, 59.T4, 60.T2, 60.T4, 61.T4, 61.T5, 62.T1, 62.T3, 63.T1, 63.T2, 63.T3, 63.T5, 65.T2, 65.T3, 67.T2, 67.T3, 67.T4, 68.T3, 69.T3, 69.T4, 71.T1, 71.T4, 72.T3, 72.T4, 73.T2, 74.T2, 74.T3, 74.T4, 77.T3, 78.T5, 79.T1, 79.T4, 80.T1, 80.T5, 81.T2, 83.T1, 87.T1, 87.T4, 88.T4, 90.T4, 91.T3, 92.T3, 94.T2, 94.T5
- **SFXIrfan:** `Woosh.mp3`, `ES_Swooshes, Whoosh, Big, Cinematic`
- **Epidemic lokal (PAKAI):** `air/designed-whoosh-soft-airy-073cf199.wav`, `air/swoosh-designed-light-c52cf22f.wav`, `air/whoosh-mids-16bb9f7c.wav`, `air/whoosh-soft-short-02-e62847da.wav`; Kenyset: nama file cocok `whoosh|swoosh|swish|woosh|spin`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili air --out projects/<proyek>/sfx/kandidat` (kata kunci: "subtle cloth movement fast", "low pass air whoosh", "soft fabric swish")

## `riser` · Riser & Reverse Swell

- **Karakter:** short reverse cymbal swell rising into a hit
- **Pola yang memakainya (32):** 05.T3, 07.T2, 07.T3, 07.T4, 17.T5, 20.T1, 23.T1, 24.T2, 25.T1, 26.T6, 28.T5, 30.T1, 33.T5, 34.T4, 34.T5, 35.T2, 36.T2, 37.T1, 38.T5, 49.T4, 55.T1, 56.T1, 56.T2, 58.T1, 58.T3, 61.T4, 67.T1, 67.T5, 71.T4, 71.T5, 93.T3, 94.T4
- **SFXIrfan:** `ES_Designed, Riser, Transition, Fast, Short, Clean 01`
- **Epidemic lokal (PAKAI):** `riser/pad-short-warm-low-deep-cc2269a9.wav`, `riser/riser-cinematic-reverse-glass-01-e53d5089.wav`, `riser/riser-cymbal-reverse-crescendo-02-566b642a.wav`, `riser/riser-reversed-pulse-f77f7b3f.wav`; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili riser --out projects/<proyek>/sfx/kandidat` (kata kunci: "warm synth swell short", "reverse cymbal swell")

## `impact` · Low Impact & Drop

- **Karakter:** deep cinematic boom impact with a short tail
- **Pola yang memakainya (81):** 02.T4, 02.T6, 03.T2, 03.T6, 04.T6, 05.T1, 05.T5, 07.T2, 14.T4, 16.T1, 17.T5, 19.T1, 19.T3, 20.T4, 20.T5, 22.T1, 22.T2, 22.T4, 23.T3, 24.T2, 25.T5, 27.T1, 27.T3, 27.T5, 28.T3, 29.T3, 29.T5, 30.T1, 30.T2, 31.T2, 32.T3, 33.T2, 35.T2, 37.T1, 37.T4, 38.T1, 39.T3, 39.T4, 40.T3, 41.T1, 43.T3, 46.T1, 47.T5, 48.T5, 49.T2, 49.T4, 55.T1, 55.T4, 55.T5, 56.T1, 56.T2, 57.T2, 59.T1, 60.T2, 60.T4, 61.T2, 61.T4, 65.T2, 65.T4, 67.T1, 68.T6, 69.T1, 72.T3, 72.T4, 75.T1, 75.T5, 76.T3, 77.T1, 77.T5, 78.T1, 79.T1, 79.T5, 79.T6, 81.T1, 83.T3, 86.T3, 87.T3, 93.T1, 94.T1, 94.T4, 94.T5
- **SFXIrfan:** `basmenyebar.mp3`, `Move.mp3`, `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz`
- **Epidemic lokal (PAKAI):** `impact/impact-cinematic-hit-stab-filter-tail-69deff59.wav`, `impact/impact-cinematic-hit-thud-thin-reverb-866b9c73.wav`, `impact/impact-sudden-heavy-percussive-hit-13b7690c.wav`, `impact/synthetic-mid-rumble-hit-a9c39cec.wav`, `impact/trailer-sub-fall-down-short-clean-01-d3a07da9.wav`; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili impact --out projects/<proyek>/sfx/kandidat` (kata kunci: "muffled bass thud transition", "soft bass drop sub", "deep cinematic boom")

## `stab` · Tonal Stab & Accent Note

- **Karakter:** short orchestral stab or plucked accent note
- **Pola yang memakainya (32):** 02.T6, 04.T3, 05.T4, 05.T6, 06.T1, 07.T5, 16.T1, 19.T6, 20.T5, 21.T1, 23.T3, 26.T6, 27.T4, 33.T4, 34.T5, 41.T5, 55.T1, 55.T4, 56.T1, 67.T1, 68.T3, 68.T6, 71.T1, 73.T3, 74.T4, 74.T5, 77.T5, 80.T5, 88.T2, 92.T5, 94.T3, 94.T6
- **SFXIrfan:** `Lasertransision.mp3`
- **Epidemic lokal (PAKAI):** tidak ada; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili stab --out projects/<proyek>/sfx/kandidat` (kata kunci: "orchestral stab hit", "pluck accent note")

## `ui` · Digital UI Pop & Tap

- **Karakter:** soft clean digital user interface pop or tap
- **Pola yang memakainya (156):** 01.T1, 01.T2, 02.T1, 02.T3, 02.T4, 02.T5, 03.T1, 03.T3, 03.T5, 04.T1, 05.T2, 05.T6, 06.T3, 06.T4, 07.T1, 07.T2, 07.T3, 07.T4, 07.T5, 10-13.T1, 10-13.T3, 10-13.T4, 16.T2, 17.T1, 17.T2, 17.T3, 17.T6, 18.T1, 18.T5, 19.T1, 19.T2, 22.T1, 22.T2, 22.T5, 23.T2, 23.T4, 24.T1, 24.T3, 24.T4, 24.T5, 25.T4, 25.T6, 26.T1, 26.T3, 26.T5, 27.T1, 27.T3, 27.T4, 28.T1, 29.T1, 29.T2, 29.T4, 29.T6, 30.T1, 30.T2, 30.T3, 30.T5, 31.T1, 31.T2, 31.T3, 31.T4, 32.T1, 33.T1, 33.T2, 33.T3, 33.T4, 33.T5, 34.T2, 35.T1, 35.T3, 35.T4, 35.T5, 36.T1, 36.T2, 36.T3, 36.T4, 36.T5, 37.T3, 38.T1, 38.T2, 39.T6, 40.T5, 40.T6, 41.T1, 41.T3, 41.T6, 43.T1, 43.T4, 44.T2, 44.T3, 45.T3, 45.T4, 45.T5, 48.T1, 48.T4, 49.T1, 49.T5, 55.T1, 55.T2, 55.T3, 56.T1, 57.T1, 58.T2, 58.T3, 59.T3, 60.T1, 60.T3, 61.T1, 61.T3, 62.T2, 63.T4, 65.T1, 65.T3, 68.T1, 68.T3, 68.T4, 68.T5, 69.T2, 71.T1, 71.T2, 71.T3, 71.T5, 72.T1, 72.T2, 72.T3, 73.T1, 74.T2, 74.T3, 75.T1, 75.T3, 75.T4, 77.T4, 77.T5, 79.T3, 79.T4, 79.T6, 80.T4, 80.T5, 81.T2, 81.T5, 83.T2, 84.T1, 84.T2, 84.T3, 84.T4, 85.T4, 88.T2, 89.T3, 90.T2, 90.T3, 92.T2, 92.T3, 94.T2, 94.T6, 95.T1, 95.T2
- **SFXIrfan:** `Kinetictypography(gunakansecaraacak).mp3`, `Variasitransisiataucut.mp3`, `pop up.mp3`, `Notif.mp3`, `Popup user interface : AI.mp3`, `ResponAI:AIpopup.mp3`, `ES_User Interface, Click, Pops, Glass, UI, Pops`, `ES_User Interface, Click, UI Buttons, Confirm, Menu`, `ES_User Interface, Alert, Notification, Message, Text`, `ES_User Interface, Click, Button, Double Click, Fast, Phone Tap`
- **Epidemic lokal (PAKAI):** tidak ada; Kenyset: nama file cocok `pop|bubble|plop|notif|message|mensaje|ping|bloop|button|confirm|tap|success|acceptation|erreur|game-start|shine|appearance|bright|ui-sound|ui_sci|ui-pop|ui-interface|text-sound|interface-digital|handy|tiktok|marimba`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili ui --out projects/<proyek>/sfx/kandidat` (kata kunci: "soft ui pop", "interface tap soft")

## `mekanik` · Click, Key & Shutter

- **Karakter:** single crisp click: camera shutter, switch, key press or pen click
- **Pola yang memakainya (111):** 02.T4, 03.T1, 03.T3, 03.T4, 04.T5, 05.T2, 05.T6, 10-13.T1, 10-13.T3, 10-13.T4, 14.T1, 14.T5, 17.T5, 17.T6, 18.T1, 19.T2, 19.T3, 19.T5, 20.T3, 21.T3, 22.T6, 23.T4, 24.T3, 24.T5, 25.T5, 25.T6, 26.T5, 27.T6, 28.T3, 30.T1, 30.T3, 33.T1, 33.T2, 33.T5, 34.T1, 34.T3, 35.T3, 35.T5, 36.T1, 36.T4, 37.T2, 37.T3, 37.T5, 38.T3, 39.T1, 39.T5, 39.T6, 40.T1, 41.T2, 43.T5, 43.T6, 44.T4, 44.T6, 46.T4, 46.T5, 47.T3, 49.T2, 49.T3, 49.T5, 55.T1, 55.T3, 55.T4, 56.T3, 59.T3, 60.T3, 62.T4, 63.T1, 63.T3, 63.T5, 65.T3, 66.T1, 66.T2, 66.T3, 68.T1, 71.T1, 71.T2, 71.T3, 72.T1, 73.T1, 74.T2, 75.T1, 75.T4, 75.T5, 76.T1, 77.T2, 77.T3, 78.T4, 81.T1, 81.T3, 81.T4, 81.T6, 85.T1, 86.T2, 86.T4, 86.T5, 86.T6, 88.T5, 89.T2, 90.T1, 90.T3, 92.T6, 93.T1, 93.T2, 93.T3, 93.T4, 93.T5, 93.T6, 94.T2, 94.T3, 94.T4, 95.T2
- **SFXIrfan:** `Pergantianfoto.mp3`, `Cutcontrastransision.mp3`, `Enter.mp3`, `Keyboardtyping.mp3`
- **Epidemic lokal (PAKAI):** `mekanik/camera-shutter-release-nikon-f4-03-2c51b8ea.wav`, `mekanik/camera-sony-alpha-shutter-click-d8dd8d3d.wav`, `mekanik/heater-fan-dial-turn-one-click-bc15fff9.wav`, `mekanik/keyboard-apple-key-press-single-d58cda3c.wav`, `mekanik/led-plastic-button-press-single-ab33e364.wav`, `mekanik/light-switch-off-single-8fad2b2d.wav`, `mekanik/keyboard-laptop-key-press-single-f94a21b7.wav`; Kenyset: nama file cocok `mouse-click|ipad_click|app click|computer-mouse|keyboard|typing`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili mekanik --out projects/<proyek>/sfx/kandidat` (kata kunci: "typewriter single key press", "mechanical switch single click", "35mm camera shutter single", "analog dial tick", "soft plastic tap single")

## `glitch` · Digital Glitch & Data Stutter

- **Karakter:** short digital glitch stutter or data blip for a hard cut
- **Pola yang memakainya (68):** 01.T4, 02.T1, 02.T4, 03.T1, 03.T6, 07.T1, 10-13.T2, 17.T4, 17.T5, 18.T2, 18.T4, 19.T1, 21.T1, 22.T2, 22.T3, 23.T3, 23.T4, 24.T6, 27.T1, 27.T2, 31.T1, 31.T5, 32.T1, 32.T2, 34.T1, 34.T3, 35.T1, 37.T4, 38.T2, 39.T1, 41.T4, 44.T1, 44.T6, 45.T1, 45.T6, 47.T1, 47.T4, 48.T2, 49.T1, 49.T2, 55.T4, 62.T1, 62.T3, 63.T3, 64.T1, 64.T2, 66.T2, 68.T2, 69.T3, 74.T1, 77.T1, 77.T2, 78.T2, 78.T3, 78.T5, 79.T2, 80.T2, 80.T3, 85.T1, 85.T2, 85.T3, 86.T3, 87.T2, 88.T3, 90.T2, 91.T2, 92.T2, 92.T6
- **SFXIrfan:** `Pergantianfoto:gambarpertama.mp3`, `Katapertama.mp3`, `Cut.mp3`, `Scanning dan gerak kurva.mp3`, `ES_User Interface, Glitch, Glitch Databend 04`, `ES_Scifi, Computer, Short Beeps, Glitch 02`
- **Epidemic lokal (PAKAI):** tidak ada; Kenyset: nama file cocok `glitch|sci-fi|processing`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili glitch --out projects/<proyek>/sfx/kandidat` (kata kunci: "short digital glitch", "data glitch transition")

## `taktil` · Tactile Paper & Object Foley

- **Karakter:** dry short paper or photo sliding or landing on a table
- **Pola yang memakainya (19):** 02.T5, 05.T1, 18.T3, 18.T6, 19.T5, 20.T1, 20.T2, 25.T1, 25.T4, 25.T6, 31.T3, 32.T4, 35.T4, 48.T3, 55.T3, 75.T2, 80.T6, 88.T5, 95.T1
- **SFXIrfan:** `documenter.mp3`
- **Epidemic lokal (PAKAI):** `taktil/notepad-page-turn-single-ffd6737b.wav`, `taktil/paper-sheet-laminated-slide-01-91b5b50b.wav`, `taktil/sticky-tape-peel-off-surface-1705b78e.wav`, `taktil/credit-card-slide-on-table-604c921e.wav`, `taktil/magazine-glossy-page-turn-02-e72d46c1.wav`, `taktil/paper-friction-envelope-slide-a5da9fbb.wav`, `taktil/paper-letter-drop-on-table-02-cda39aae.wav`, `taktil/playing-card-slide-on-table-02-5d709714.wav`; Kenyset: nama file cocok `flipcard|paper`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili taktil --out projects/<proyek>/sfx/kandidat` (kata kunci: "polaroid photo slide", "cardboard card flick", "crisp paper slide short", "magazine page turn fast")

## `ruang` · Room Tone & Analog Bed

- **Karakter:** quiet warm room tone, projector hum or soft vinyl crackle bed, no harsh hiss
- **Pola yang memakainya (1):** 94.T6
- **SFXIrfan:** `ES_Ambience, Office, Designed, Busy Office`
- **Epidemic lokal (PAKAI):** `ruang/phonograph-vinyl-crackle-02-92e46112.wav`, `ruang/phonograph-vinyl-noise-crackle-turntable-01-408c4ead.wav`; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili ruang --out projects/<proyek>/sfx/kandidat` (kata kunci: "subtle vinyl crackle loop", "8mm projector hum soft", "warm analog tape hiss")
