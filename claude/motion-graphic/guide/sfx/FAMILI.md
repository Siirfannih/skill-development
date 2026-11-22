# Famili bunyi: kebutuhan SFX ditulis sebagai karakter, sumbernya dicari

**Tujuan.** Kebutuhan bunyi tiap objek ditulis sebagai **famili** (karakter bunyi), bukan nama file. File lokal (`SFXIrfan`, Kenyset) hanya sumber pertama. Bila famili yang dibutuhkan tidak punya file lokal yang lolos dengar, cari di sumber gratis berlisensi sampai ada yang lolos, bukan memakai file terdekat yang karakternya salah dan bukan membuat objek penting menjadi senyap.

Famili diturunkan dari event bunyi di video referensi (earshot `timeline` pada stem musik+SFX hasil demucs, dicek 21 Nov 2026). Angka di bawah adalah pengamatan, dilebarkan untuk variasi; bukan target. Rentang mesin untuk `sfx_vet.py` dan kata kunci untuk `sfx_cari.py` ada di `FAMILI.json`.

## 0. Lima pilar sound design (Lantai E24)

Setiap video memakai kelima pilar; tiap cue di `cues.json` membawa `pilar`. Kata kunci di bawah adalah **Master Keyword Matrix**: kata kunci pencarian yang menggambarkan karakter bunyi (bukan kata harfiah seperti "whoosh" atau "typing loop"), dipakai di `sfx_cari.py --kata`, Epidemic, atau ElevenLabs.

| Pilar | `pilar` | Famili | Pemicu | Master Keyword Matrix |
|---|---|---|---|---|
| 1. Ambient Bed | `bed` | `ruang` | sepanjang timeline, dari frame 0 sampai akhir, ±−36 LUFS di mix | "subtle vinyl crackle loop", "8mm projector hum soft", "warm analog tape hiss" |
| 2. Camera & Split Transition | `transisi` | `air`, `impact` | gerak kamera, whip, zoom, split-frame | "subtle cloth movement fast", "low pass air whoosh", "soft fabric swish", "muffled bass thud transition" |
| 3. Kinetic Text & UI Tick | `tick` | `mekanik` | tiap kata KT yang muncul, tanggal kalender, tombol, elemen UI yang berubah | "typewriter single key press", "mechanical switch single click", "35mm camera shutter single", "analog dial tick", "soft plastic tap single" |
| 4. Tactile Paper & Card Foley | `taktil` | `taktil` | polaroid, kartu checklist, kertas, stiker, dokumen | "polaroid photo slide", "cardboard card flick", "crisp paper slide short", "magazine page turn fast" |
| 5. Accent & Risers | `aksen` | `riser`, `impact` | menuju jawaban/twist, kata slam, puncak, logo | "warm synth swell short", "soft bass drop sub" |

Aturan pakai:
- **Bed**: rekaman nyata, lolos `sfx_vet.py --famili ruang` (tanpa clipping/distorsi), di-loop tanpa sambungan terdengar.
- **Tick**: 2–4 varian berputar dan/atau `rate` 0,95–1,05, gain −14…−20 dB, satu klik impuls per kata, bukan rentetan ketikan.
- **Selubung**: ease-in 3–5 frame hanya di pra-rol (berakhir tepat di onset, serangan utuh); ease-out kosinus 8–12 frame (±270–400 ms).
- Kayu, thock, dan felt tetap palet terlarang; pengganti tick yang lembut adalah plastik atau kertas.

## 1. Sembilan famili

| ID | Famili | Karakter (pengamatan di referensi) | Pemicu visual | Kata kunci cari (EN) |
|---|---|---|---|---|
| `air` | Air & Whip Motion | udara yang mengembang; centroid median 340–2.700 Hz; gerak kamera memakai serangan ≥ 150 ms; ada whoosh gelap (sebagian besar) dan swish terang pendek | whip pan, push/zoom cepat, transisi geser | soft air whoosh, smooth swoosh transition, cloth whoosh |
| `riser` | Riser & Reverse Swell | reverse cymbal atau uplifter 0,3–2 dtk yang memuncak di aksen | menuju jawaban/twist, zoom-through, build | reverse cymbal swell, short riser transition |
| `impact` | Low Impact & Drop | sub drop, boom, kick, punchy hit; centroid 70–850 Hz; ekor ≤ 0,9 dtk; untuk HP butuh isi 300 Hz–3 kHz | kata slam, punchline, logo, pendaratan besar | deep cinematic boom, punchy impact hit, sub drop |
| `stab` | Tonal Stab & Accent Note | stab orkestra, pluck, celesta, ting; bernada; 0,1–1 dtk | kartu judul atau angka mendarat di video bermusik orkestra/korporat; aksen beat | orchestral stab hit, pluck accent note |
| `ui` | Digital UI Pop & Tap | pop, notifikasi, chime, tap digital; pendek; terdengar bersih | kartu/UI/notifikasi/popup AI muncul | soft ui pop, interface tap soft |
| `mekanik` | Click, Key & Shutter | shutter, saklar, tuts, dial, klik pena; transien < 0,2 dtk | pilar 3: kata KT muncul, kalender berganti, tombol, shutter | typewriter single key press, mechanical switch single click, 35mm camera shutter single, analog dial tick |
| `glitch` | Digital Glitch & Data Stutter | glitch digital, stutter data | cut tegas antarbabak, kata pembuka, garis scan | short digital glitch, data glitch transition |
| `taktil` | Tactile Paper & Object Foley | kertas, foto atau benda mendarat di meja, gelas; 0,15–0,6 dtk | polaroid/kartu fisik, stiker, dokumen | paper slide short, photo drop on table, page turn single |
| `ruang` | Room Tone & Analog Bed | room tone, dengung proyektor, vinyl atau tape yang sangat pelan dan rekaman nyata | pilar 1: bed konstan sepanjang video (§0) | subtle vinyl crackle loop, 8mm projector hum soft, warm analog tape hiss |

Stok lokal tiap famili, pola cookbook yang memakainya, dan perintah cari per famili: `../../cookbook/SFX.md` (dibangkitkan `tools/cookbook.py index`). Famili file SFXIrfan: kolom Famili di `SFXIRFAN.md`.

## 2. Sumber: tiga tingkat

1. **Lokal.** `~/sfx/SFXIrfan` → `~/sfx/Epidemic` (`EPIDEMIC.md`: file berputusan PAKAI dulu) → `~/sfx/Kenyset` → set SFX proyek lain (alasan tertulis). Dipakai bila lolos §3.
2. **Gratis berlisensi.** `python3 scripts/audio/sfx_cari.py --famili <id> --out projects/<proyek>/sfx/kandidat [--kata "<kata kunci>"]`:
   - Freesound, hanya CC0, durasi dibatasi famili;
   - Mixkit, halaman tag (Mixkit Sound Effects Free License; teks lengkapnya dimuat lewat JavaScript dan belum terbaca otomatis, jadi baca di mixkit.co/license sebelum rilis komersial);
   - semua unduhan dicatat di `SOURCES.md` folder kandidat (file, sumber, halaman, lisensi, kata kunci), diperiksa, dan didengar otomatis.
   Tidak berbayar, jadi dijalankan tanpa menunggu persetujuan.
   - Myinstants (unduh massal hasil pencarian untuk dipilih manual): `python3 scripts/audio/myinstants_unduh.py "<kata>" --keluar ~/sfx/myinstants/<kata>`. Isinya meme/musik/mutu campur dan lisensinya tidak dinyatakan per file, jadi semua hasil WAJIB lolos `sfx_vet.py` dan didengar sebelum dipakai; catat asal-usulnya di `SOURCES.md` proyek.
3. **Berbayar atau berakun.** ElevenLabs SFX (biaya disebut dulu, Lantai F28c). Epidemic Sound hanya bila MCP `Epidemic_Sound` ada di daftar tool sesi atau `~/.config/epidemic/key` tidak kosong.

Tidak dipakai: Freesound CC-BY tanpa kredit, lisensi NC (nonkomersial), BBC Sound Effects (nonkomersial), unduhan YouTube sebagai SFX final.

## 3. Periksa sebelum pasang

1. **Ukur**: `python3 scripts/audio/sfx_vet.py <file…> --famili <id>`.
   - GAGAL bila ada salah satu:
     - desis berkelanjutan ≥ 100 ms (> 50 % energi di atas 10 kHz);
     - clipping terekam ≥ 1 % sampel;
     - file berakhir terpotong (20 ms terakhir > puncak −25 dB);
     - untuk `air`: lonjakan ≥ 20 dB/50 ms dari bunyi yang sudah terdengar.
   - PERIKSA bila ada salah satu:
     - awal sunyi > 50 ms (pasang dengan `align: peak`);
     - < 10 % energi di 300 Hz–3 kHz (hampir tak terdengar di speaker HP);
     - di luar rentang famili.
2. **Dengar**: `earshot rank "<deskripsi famili>" <kandidat…>`; pakai yang strong/plausible. Lolos ukuran belum berarti karakternya cocok: kandidat bisa bersih secara teknis tetapi terdengar seperti benda lain. Tidak ada yang strong/plausible → ganti kata kunci atau famili, jangan memaksa yang terdekat.
3. **Dengar di konteks**: satu peran satu bunyi, puncak di frame objek, level dan jarak (`GUIDE.md` Cara 5–8), lalu gerbang `scripts/gate/sfx_density.py`.
4. **Selubung**:
   - bunyi transien (klik, pop, hit, shutter) tanpa fade-in, karena fade-in lebih dari beberapa milidetik mematikan serangannya;
   - fade-in hanya untuk bed, ambien, dan whoosh yang dipotong di tengah;
   - file yang dipotong diberi fade-out kurva S 150–400 ms di peluruhan alaminya (`GUIDE.md` Cara 9).

## 4. Musik: yang terukur di referensi

<!-- MUSIK:mulai -->
Diukur 21 Nov 2026 pada 11 video referensi (stem demucs: suara vs musik+SFX; earshot `timeline`). Label musik earshot adalah hipotesis (§14.0B `audio.md`); level dari RMS 50 ms, saat bicara vs di jeda ≥ 0,3 dtk; stem demucs bocor sedikit, jadi angka adalah pengamatan kasar.

| Referensi | Musik terbaca (earshot, hipotesis) | Tempo | Musik di bawah suara saat bicara | Musik di jeda vs saat bicara | Event per famili (dari 20–96 event terpenting) |
|---|---|---|---|---|---|
| 88 arthurcrockbooks | epic trailer music, inspirational corporate background music, glitch hop music | 84.5 (none) | -13.2 dB | -0.9 dB | stab 41, riser 16, air 13, impact 13, taktil 6, ui 5, mekanik 2 |
| 89 filmmnostalgia | inspirational corporate background music | 89.9 (clear) | -7.2 dB | +0.5 dB | stab 17, impact 2, ui 1 |
| 90 imzache | glitch hop music, trap beat | 132.9 (weak) | -11.5 dB | — | air 29, riser 21, stab 20, impact 10, ui 8, taktil 4, mekanik 3 |
| 91 industry-riset | acoustic guitar music, inspirational corporate background music, drum and bass music | 137.7 (clear) | -19.5 dB | +0.1 dB | taktil 13, impact 5, stab 2 |
| 92 theacademy.sf | techno music, lo-fi hip hop beat, glitch hop music | 136.6 (clear) | -6.2 dB | +2.4 dB | impact 8, taktil 3, mekanik 3, air 2, riser 2, ui 1 |
| 87 Zache (perkenalan) | glitch hop music | 79.8 (none) | -8.0 dB | +0.5 dB | riser 5, mekanik 4, taktil 4, ui 3, air 3, impact 1 |
| 55 storytelling footage | classical string quartet, inspirational corporate background music, glitch hop music | 143.6 (none) | -12.0 dB | +6.0 dB | stab 14, ui 2, mekanik 1, air 1, impact 1 |
| 24 sound efex | house music | 101.9 (clear) | -9.9 dB | +0.7 dB | air 7, stab 4, impact 4, riser 3, mekanik 1 |
| 07 Baikov shapes | minimal electronic music, techno music, glitch hop music | 119.9 (none) | -10.6 dB | +2.1 dB | riser 10, impact 4, air 3, ui 1, stab 1 |
| 65 camera dive UI | funk music, lo-fi hip hop beat, solo piano music | 102.0 (clear) | -6.7 dB | -8.9 dB | air 7, stab 5, impact 5, riser 3 |
| 63 desktop stage | glitch hop music, house music | 113.1 (none) | -16.5 dB | +1.8 dB | air 6, taktil 5, impact 4, stab 2, mekanik 1, ui 1 |

Yang bisa dipakai dari tabel ini:
1. **Musik tidak dipompa di tiap jeda.** Median perubahan di jeda +0,6 dB (jangkauan −8,9…+6,0; hanya satu video sinematik naik +6 dB). Ini sesuai `../../references/audio.md` §14.1 dan §14.9b: musik bergerak ≤ 1,5 dB saat kata diucapkan; kenaikan hanya di jeda panjang atau antarbabak, lewat automation ber-ramp, tidak lewat auto-gain/kompresor.
2. **Musik duduk 6–20 dB di bawah suara** (median ±10,6 dB). Angkanya mengikuti tabel level §14.10; pengamatan ini dipakai untuk menimbang, bukan mengganti tabel.
3. **Genre dan tempo tidak satu resep.** Tempo 80–144 bpm; genre beragam (glitch hop, korporat/orkestra, house, techno, funk). Kategori musik tetap diturunkan dari tempo dan isi video (§14.0A) dan dipilih dengan `music_fit.py`.
4. **Bed ruang tidak terdeteksi di referensi yang diukur** (earshot tidak memisahkan bed ±−36 LUFS dari musik di stem yang sama); pilar 1 tetap wajib (§0).
5. **Famili yang paling sering muncul:** `impact` (11 dari 11 video), `air` dan `stab` (9), `riser` (8), `taktil`, `ui`, `mekanik` (7). Event `stab` di stem musik+SFX sebagian berasal dari aksen musiknya sendiri.

**Sumber musik.** Lokal (`Asset/musik/MUSIK.md` dan folder Irfan), lalu `python3 scripts/audio/musik_cari.py --kategori <k> --out projects/<proyek>/musik/kandidat` (Mixkit per mood, track utuh, lisensi Stock Music Free License dicatat: web, medsos, YouTube, iklan online, dan podcast boleh; TV/radio, CD/DVD, game, remix menjadi track musik saja, dan Content ID tidak boleh), lalu ElevenLabs Music (biaya disebut dulu). Mixkit dihitung satu sumber; `music_fit.py` butuh kandidat dari ≥ 2 sumber.
<!-- MUSIK:selesai -->
