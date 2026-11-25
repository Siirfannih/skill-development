# Cookbook · SFX per famili

<!-- dibangkitkan oleh tools/cookbook.py index; jangan diedit tangan -->

Kebutuhan bunyi tiap pola ditulis sebagai **famili** (karakter), bukan nama file. Rujuk `05-audio-sfx-pacing/A01-five-pillars-and-natural-level.md` dan `../guide/sfx/FAMILI.md`.

## `air` · Air & Whip Motion

- **Karakter:** soft smooth air whoosh swoosh for a camera move, no harsh hiss
- **SFXIrfan:** `Woosh.mp3`, `ES_Swooshes, Whoosh, Big, Cinematic`
- **Epidemic lokal (PAKAI):** `air/designed-whoosh-soft-airy-073cf199.wav`, `air/swoosh-designed-light-c52cf22f.wav`, `air/whoosh-mids-16bb9f7c.wav`, `air/whoosh-soft-short-02-e62847da.wav`; Kenyset: nama file cocok `whoosh|swoosh|swish|woosh|spin`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili air --out projects/<proyek>/sfx/kandidat` (kata kunci: "subtle cloth movement fast", "low pass air whoosh", "soft fabric swish")

## `riser` · Riser & Reverse Swell

- **Karakter:** short reverse cymbal swell rising into a hit
- **SFXIrfan:** `ES_Designed, Riser, Transition, Fast, Short, Clean 01`
- **Epidemic lokal (PAKAI):** `riser/pad-short-warm-low-deep-cc2269a9.wav`, `riser/riser-cinematic-reverse-glass-01-e53d5089.wav`, `riser/riser-cymbal-reverse-crescendo-02-566b642a.wav`, `riser/riser-reversed-pulse-f77f7b3f.wav`; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili riser --out projects/<proyek>/sfx/kandidat` (kata kunci: "warm synth swell short", "reverse cymbal swell")

## `impact` · Low Impact & Drop

- **Karakter:** deep cinematic boom impact with a short tail
- **SFXIrfan:** `basmenyebar.mp3`, `Move.mp3`, `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz`
- **Epidemic lokal (PAKAI):** `impact/impact-cinematic-hit-stab-filter-tail-69deff59.wav`, `impact/impact-cinematic-hit-thud-thin-reverb-866b9c73.wav`, `impact/impact-sudden-heavy-percussive-hit-13b7690c.wav`, `impact/synthetic-mid-rumble-hit-a9c39cec.wav`, `impact/trailer-sub-fall-down-short-clean-01-d3a07da9.wav`; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili impact --out projects/<proyek>/sfx/kandidat` (kata kunci: "muffled bass thud transition", "soft bass drop sub", "deep cinematic boom")

## `stab` · Tonal Stab & Accent Note

- **Karakter:** short orchestral stab or plucked accent note
- **SFXIrfan:** `Lasertransision.mp3`
- **Epidemic lokal (PAKAI):** tidak ada; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili stab --out projects/<proyek>/sfx/kandidat` (kata kunci: "orchestral stab hit", "pluck accent note")

## `ui` · Digital UI Pop & Tap

- **Karakter:** soft clean digital user interface pop or tap
- **SFXIrfan:** `Kinetictypography(gunakansecaraacak).mp3`, `Variasitransisiataucut.mp3`, `pop up.mp3`, `Notif.mp3`, `Popup user interface : AI.mp3`, `ResponAI:AIpopup.mp3`, `ES_User Interface, Click, Pops, Glass, UI, Pops`, `ES_User Interface, Click, UI Buttons, Confirm, Menu`, `ES_User Interface, Alert, Notification, Message, Text`, `ES_User Interface, Click, Button, Double Click, Fast, Phone Tap`
- **Epidemic lokal (PAKAI):** tidak ada; Kenyset: nama file cocok `pop|bubble|plop|notif|message|mensaje|ping|bloop|button|confirm|tap|success|acceptation|erreur|game-start|shine|appearance|bright|ui-sound|ui_sci|ui-pop|ui-interface|text-sound|interface-digital|handy|tiktok|marimba`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili ui --out projects/<proyek>/sfx/kandidat` (kata kunci: "soft ui pop", "interface tap soft")

## `mekanik` · Click, Key & Shutter

- **Karakter:** single crisp click: camera shutter, switch, key press or pen click
- **SFXIrfan:** `Pergantianfoto.mp3`, `Cutcontrastransision.mp3`, `Enter.mp3`, `Keyboardtyping.mp3`
- **Epidemic lokal (PAKAI):** `mekanik/camera-shutter-release-nikon-f4-03-2c51b8ea.wav`, `mekanik/camera-sony-alpha-shutter-click-d8dd8d3d.wav`, `mekanik/heater-fan-dial-turn-one-click-bc15fff9.wav`, `mekanik/keyboard-apple-key-press-single-d58cda3c.wav`, `mekanik/led-plastic-button-press-single-ab33e364.wav`, `mekanik/light-switch-off-single-8fad2b2d.wav`, `mekanik/keyboard-laptop-key-press-single-f94a21b7.wav`; Kenyset: nama file cocok `mouse-click|ipad_click|app click|computer-mouse|keyboard|typing`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili mekanik --out projects/<proyek>/sfx/kandidat` (kata kunci: "typewriter single key press", "mechanical switch single click", "35mm camera shutter single", "analog dial tick", "soft plastic tap single")

## `glitch` · Digital Glitch & Data Stutter

- **Karakter:** short digital glitch stutter or data blip for a hard cut
- **SFXIrfan:** `Pergantianfoto:gambarpertama.mp3`, `Katapertama.mp3`, `Cut.mp3`, `Scanning dan gerak kurva.mp3`, `ES_User Interface, Glitch, Glitch Databend 04`, `ES_Scifi, Computer, Short Beeps, Glitch 02`
- **Epidemic lokal (PAKAI):** tidak ada; Kenyset: nama file cocok `glitch|sci-fi|processing`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili glitch --out projects/<proyek>/sfx/kandidat` (kata kunci: "short digital glitch", "data glitch transition")

## `taktil` · Tactile Paper & Object Foley

- **Karakter:** dry short paper or photo sliding or landing on a table
- **SFXIrfan:** `documenter.mp3`
- **Epidemic lokal (PAKAI):** `taktil/notepad-page-turn-single-ffd6737b.wav`, `taktil/paper-sheet-laminated-slide-01-91b5b50b.wav`, `taktil/sticky-tape-peel-off-surface-1705b78e.wav`, `taktil/credit-card-slide-on-table-604c921e.wav`, `taktil/magazine-glossy-page-turn-02-e72d46c1.wav`, `taktil/paper-friction-envelope-slide-a5da9fbb.wav`, `taktil/paper-letter-drop-on-table-02-cda39aae.wav`, `taktil/playing-card-slide-on-table-02-5d709714.wav`; Kenyset: nama file cocok `flipcard|paper`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili taktil --out projects/<proyek>/sfx/kandidat` (kata kunci: "polaroid photo slide", "cardboard card flick", "crisp paper slide short", "magazine page turn fast")

## `ruang` · Room Tone & Analog Bed

- **Karakter:** quiet warm room tone, projector hum or soft vinyl crackle bed, no harsh hiss
- **SFXIrfan:** `ES_Ambience, Office, Designed, Busy Office`
- **Epidemic lokal (PAKAI):** `ruang/phonograph-vinyl-crackle-02-92e46112.wav`, `ruang/phonograph-vinyl-noise-crackle-turntable-01-408c4ead.wav`; Kenyset: nama file cocok `—`
- **Cari:** `python3 scripts/audio/sfx_cari.py --famili ruang --out projects/<proyek>/sfx/kandidat` (kata kunci: "subtle vinyl crackle loop", "8mm projector hum soft", "warm analog tape hiss")
