# Audio — VO, SFX, musik

Baca hanya di gerbang audio (setelah script dan storyboard final) dan saat QA audio. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 14. Audio

### 14.A Memilih suara: logika (Irfan 6 Nov)
Bagian ini menentukan **suara apa dan kapan**; §14.0–14.10 memeriksa **sumber dan kualitas mix**. Pilihan diturunkan dari dua kolom tabel beat yang sudah ada: mekanik (`motion-mechanics.md`) dan nada (`pacing-map.md`). Suara lahir dari gerak, bukan dari kata.

**Mekanik visual → SFX**

| Mekanik | SFX (stok §14.8) | Waktu |
|---|---|---|
| Punch-in serius | dentum pendek (`v17_thud_1`), **hanya di punch-in terkuat** | onset kata kunci |
| Whip | whoosh tipis (`v17_whip_1/2`) | puncak di frame blur tengah |
| Push-through | riser pendek → impact | riser mengikuti dorongan, impact di cut |
| Pull-back reveal | whoosh mundur / udara (whoosh gelombang) | selama mengecil |
| Orbit gather, kartu masuk | pop lembut per kartu, dijarangkan (`soft-subtle-ui-pop`) | saat kartu mendarat |
| Flash montage | klik shutter 1:1 per foto | per foto |
| Teks diegetik di UI | tap UI (`ipad_click`) | saat teks muncul |
| Ganti topik | swoosh transisi (whoosh gelombang) | di cut |

**Nada → musik dan kepadatan SFX**

| Nada | Musik | SFX |
|---|---|---|
| Serius / klaim | turun ke drone, **turun bukan hilang** | jarang, beri ruang |
| Penjelasan / data | bed stabil | tick UI pada data |
| Analogi / ringan | elemen ringan masuk | lebih rapat, main-main |
| Emosional | tipis, satu instrumen | hampir tidak ada |
| Puncak | **drop jatuh tepat di kata puncak** | hit terbesar video |
| Penutup / CTA | resolve, melambat | satu aksen di CTA |

Satu event satu suara; tidak ada suara yang tidak terikat ke sesuatu di layar. Setiap cue di lembar cue menyebut mekanik atau nada yang melahirkannya.


### 14.0 Gerbang sumber SFX (WAJIB sebelum menyusun cue apa pun; Irfan 31 Okt 23:38)
Kesalahan terbesar di proyek *Pengganti Kita Sendiri*:
- Agent memakai bank bunyi **sintetis** (earshot `pool/bank`) dan bunyi Mixkit yang tidak sesuai gaya.
- Sumber milik Irfan tidak dicek lebih dulu.
- Akibatnya 2 jam kerja audio terbuang.

Aturan:
1. **Inventaris dulu, dalam urutan ini**, dan tulis hasilnya di `STATUS.md` proyek:
   - (a) folder SFX yang Irfan siapkan di mesin kerja (PC server); jalurnya diberikan Irfan di sesi, tanyakan bila belum disebut;
   - (b) folder `sfx/` proyek yang sudah disetujui, misalnya `projects/jadisatu-60s/remotion/sfx-el` di repo ini;
   - (c) sumber internet berlisensi (Mixkit, Pixabay, Freesound CC0);
   - (d) ElevenLabs SFX, hanya untuk peran yang tidak ada di (a)–(c).
2. **Akses dipastikan di awal.** Folder belum terhubung, kredensial belum ada, atau situs memblokir: minta izin atau lapor ke Irfan **sebelum** bekerja. Jangan lanjut dengan pengganti karangan.
3. **Dilarang memakai bunyi sintetis/karangan sebagai SFX final.** Termasuk bank earshot `sfx_render`, sinus, dan noise generator. Bank earshot hanya untuk analisis/QA.
4. **Gaya Apple motion** = rekaman UI nyata:
   - klik app/iPad/mouse;
   - **keyboard digital (iPhone/Magic Keyboard), bukan tick/thock mekanik**;
   - **whoosh "wave" halus** (swoosh udara lembut), bukan angin badai atau terowongan;
   - pop/notif iOS yang lembut.
5. **VO tidak diberi reverb/ekor ruang buatan.** Narator TTS harus kering dan dekat; ekor ruang membuatnya terdengar menggema.

### 14.1 Hierarki mix
1. **VO pemilik panggung**: kompresi ringan, +2 dB di 3 kHz.
2. **SFX penekan**:
   - median −13…−21 dB di bawah VO; 1–2 hit puncak per video ≈ 0 dB
   - SFX besar di sela kata
   - UI kecil −12 dB relatif SFX utama
3. **Musik pembangun emosi**:
   - duck 6–12 dB saat VO (attack 20 ms, release 250 ms), naik di jeda
   - −4 dB di 3 kHz; dynamic EQ 200–500 Hz pada SFX saat VO
   - HPF 40 Hz bus SFX
4. Master −14,0…−14,5 LUFS integrated, true peak ≤ −1 dBTP.
5. **Level per lapisan di master (Modul 5, sejak 31 Okt 2026)**:
   - VO −14 LUFS (±1, konsisten antarbabak);
   - klip narasumber/berita −15,0…−15,5 LUFS;
   - musik (termasuk sub-pad) saat VO aktif −22…−25 LUFS;
   - puncak SFX UI −16…−20 dBFS dan ketikan −22…−25 dBFS (tidak boleh mengalahkan VO).

   Lihat §14.10.

### 14.2 Musik: beberapa cue sesuai babak (tidak pernah satu bed dari awal sampai akhir)
- Dua babak energi (Holy Freak):
  - hook/masalah: bed musik/sub + SFX padat (±2,5/dtk)
  - penjelasan/solusi: musik tipis, SFX ±1/dtk, jeda boleh nyaris senyap (room tone −50 dB, jangan digital silence mutlak)
  - engsel: satu riser panjang (±50 f) + hit tepat di kata pivot
- Contoh: tegang/repetitif (masalah) → tape-stop/kill tepat di engsel → jernih/rasional → bertenaga (demo) → hangat lega (CTA).
- Grid beat diukur dengan librosa. Cut besar di downbeat, kamera mulai/mendarat di beat (±2 f).
- Bass putus ±1 dtk sebelum atau tepat di cut ke end card.

### 14.3 Penempatan SFX (acuan Baikov: "SFX mendukung semua visual")
- **Setiap event visual diskret bersuara (target ≥ 85 %, diukur `scripts/audio/visual_coverage.py`)**:
  - muncul, mendarat, klik, perubahan state UI
  - **onset teks**
  - **angka berjalan**
  - **setiap transisi**
  - kata kunci

  Yang boleh senyap hanya gerak pelan/kontinu.
- **Peran bunyi**: setiap cue ditulis `{t, kelas, terikat_ke_visual, offset, dB}`. Tidak ada bunyi yang "sekadar ada".
- **Layering** satu event penting: transien tinggi + body tengah + bobot rendah. Maksimal 2 lapis di satu frame untuk event kecil.
- **Offset @30 fps**:
  - pop muncul −1…+1 f
  - sub-thud di frame mendarat
  - hard cut: whoosh rendah −3 f, thud +2 f
  - burst: whoosh naik −11 f, thud −2 f
  - slam: impact −1…−2 f, didahului kantong senyap 3–7 f
  - rangkaian zoom-through: satu riser kontinu, hit di pendaratan terakhir
  - whoosh/riser memuncak di landing atau cut
- **Cluster**: elemen yang muncul bersamaan diberi satu rangkaian pop bernada naik (staggered), bukan senapan mesin.
  - Ketikan tetap terdengar sebagai keyboard, jangan ikut di-cluster jadi pop.
  - Seri blip untuk item daftar: bunyi sama, interval tetap.
- **UI micro-pop**: setiap perubahan state UI (pill, ikon, checkbox, hover, klik) pop pendek 400–1.200 Hz, 30–80 ms, −9…−15 dB.
- **Level relatif VO**: sub-thud ≈ −3,5 dB, pop/thock ≈ −9 dB, blip/whoosh −15…−18 dB.
  - Transien kecil di konsonan VO digeser ±2 f atau diturunkan ≥ 18 dB.
- Kepadatan:
  - hook/masalah ±2,5/dtk
  - penjelasan ±1/dtk
  - saat VO diam boleh sampai ±5/dtk
  - logo hold ±0
- Sinkron: hit bunyi vs onset visual ±1–2 f (±45 ms), dicek per cue dari render.

### 14.4 Engsel senyap (titik balik)
Senyap hanya boleh **disengaja dan pendek** (≤ 300 ms, sebelum hantaman/sub drop). Musik/bed **tidak pernah mati ke 0** di bawah klip narasumber (§14.7). Senyap 9 f tepat di cut → VO kalimat balik → senyap 15 f → musik bagian baru masuk ≤ 2 f sebelum gerak kamera pertama. Punchline terbesar: semua audio senyap 0,4 dtk → hantaman + bass.

### 14.5 Standar "Nyaman, jelas, tanpa ear-fatigue" (direvisi 1 Nov 2026)
Versi lama bagian ini mewajibkan bunyi thock/felt/wood dengan LPF 1,5–2,5 kHz. Bersama tabel Gemini §14.8, aturan itu menghasilkan palet gelap seperti ketukan kayu di Pengganti Kita Sendiri v3, yang ditolak Irfan pada 31 Okt pukul 23.34. **Acuan sekarang adalah palet yang terbukti lulus**, yaitu The Gap v17/v18 dan Jadisatu #2 (`projects/jadisatu-60s/remotion/tools/audio_build.py`):

- **Sumber**: hanya stok nyata (§14.0), yaitu Kenyset, SFX proyek Irfan, dan ElevenLabs dengan prompt "dry, clean". Tidak ada SFX yang disintesis di kode.
- **Apple-style** berarti:
  - tap/klik digital, contohnya `ipad_click`, `mouse-click`, `pop-up-notify-smooth-modern`;
  - keyboard digital iPhone (`iphone-keyboard-typing`);
  - whoosh gelombang halus (`whoosh-gelombang`, `swoosh-014`, `simple-whoosh-382724`).
- **Disiplin pita per keluarga** (The Gap v17, tanpa saturasi):
  - UI: HPF 300 Hz / LPF 8 kHz, cekungan −4 dB di 2,8–4,5 kHz;
  - gerak: 400 Hz–2,5 kHz;
  - tekstur: 400 Hz–2,6 kHz;
  - low: di bawah 2 kHz + body 150–450 Hz.
- **Jangan menggelapkan klik dengan LPF 1,5–2,5 kHz.** Referensi Audio.mp4 terukur: klik/tick ber-centroid 8–10 kHz, whoosh berpusat di 1,4–1,9 kHz tanpa energi di atas 6 kHz. Yang dibuang adalah desis di atas 6 kHz, bukan kecerahan klik.
- **Dilarang**: ketukan kayu/woodblock, felt knock, koin, logam, kartun, langkah kaki kartun, salinan bunyi sistem Apple, potongan SFX yang "dipahat" dari video referensi orang lain.
- **QA telinga**: Gemini tidak andal untuk level dan timestamp, dan tabel aturannya tidak boleh menggantikan data proyek yang sudah lulus. Ukur dengan alat sendiri; telinga Irfan adalah hakim terakhir.
- Sumber dan lisensi tiap file dicatat di `CREDITS.md`.

---

## 14.6–14.10 Aturan audit audio 31 Okt 2026 (Modul 1–5)

Sumber: audit DSP Gemini atas `PenggantiKitaSendiri_v2`, diminta dan diadopsi Irfan sebagai masukannya sendiri. Angka diverifikasi ulang dengan `scripts/audio_qa.py`. Hasil ukur v2 dibandingkan referensi:

| Video | Sub | Low-mid | Penurunan mendadak |
|---|---|---|---|
| v2 | 5,8 % | 67,9 % | 100 |
| Ref Krea 2 | 55,4 % | 33,6 % | 3 |
| Ref Renaissance | 39,3 % | 35,2 % | 17 |

> Catatan 1 Nov 2026: Krea 2 dan Renaissance adalah referensi musik/motion **tanpa VO**, jadi tidak bisa dipakai sebagai target pita untuk video ber-narasi. Referensi ber-VO terukur: The Gap sub 14 % / low-mid 63 %, Emotion 18 % / 64 %. Lihat §14.10.

Implementasi rujukan ada di `experimental/dual-agent-sound/examples/pengganti-kita-sendiri/v13/`: `assemble12.py`, `mix13.py`, `sfx_rules.py`, `roomtone.py`.

Akar masalah di v2:
- **Low-mid 68 % bukan hanya dari klip berita.** Narator sendiri 72–78 % low-mid karena EQ +1,5 dB @160 Hz.
- **Musik tanpa lapisan sub.** Echoes di-LPF 1,2 kHz, ostinato berupa pluck.
- **Klip Jensen/Altman masuk mentah.** Dimuat tanpa EQ dan level-nya 5–7 dB di bawah narator.
- **Ujung potongan memakai fade 12–30 ms.** Ducking juga pumping saat release.
- **Musik dimatikan ke 0 di bawah Jensen** (aturan lama "hening total", sekarang dicabut).

### 14.6 Modul 1 — pre-processing wajib setiap klip narasumber/berita
Klip eksternal (berita, wawancara, podcast, konferensi) tidak pernah masuk mix mentah:
```
ffmpeg -y -i klip_mentah.mp4 -vn -af "pan=mono|c0=0.5*c0+0.5*c1,highpass=f=120:poles=2,equalizer=f=320:t=q:w=1.8:g=-5.0,equalizer=f=3200:t=q:w=1.4:g=2.5,lowpass=f=9000:poles=2,afftdn=nf=-25,acompressor=threshold=-20dB:ratio=3.5:attack=5:release=80:makeup=4dB,loudnorm=I=-15.5:TP=-2.0:LRA=5.0" -ar 48000 -ac 2 klip_bersih.wav
```
- **mono**: side/mid = 0, menghapus gema fase ruangan;
- **HPF 120 + mud cut −5 dB @320 Hz**: anti-boxy;
- **+2,5 dB @3,2 kHz**: kejelasan;
- **afftdn + kompresor + loudnorm −15,5**: setara narator.
- **loudnorm dijalankan sebagai penyamaan level LINEAR** (gain terukur, atau `loudnorm` dua-pass `linear=true`), bukan mode dinamis.
  - Pada klip pendek, mode dinamis bekerja seperti AGC dan mengangkat ekor ruangan. Hasil uji Altman: low-mid 61 → 70 %.
  - Tambahkan **mud cut kedua −3 dB @220 Hz** untuk suara pria/ruang konferensi. Hasil uji: low-mid Altman 56 → 41 %, Gates 51 → 33 %.
  - **Jangan pakai gate/expander**: tidak mengurangi gema, dan menambah potongan mendadak di dalam ucapan.
- **Cara mengukur gema**: ekor energi 40–150 ms setelah akhir kata, relatif ke level kata (pakai timestamp STT).
  - Autokorelasi lag 15–23 ms **tidak valid** untuk ucapan, karena terdominasi periodisitas F0 (2 periode suara pria ±15–20 ms) dan ikut naik oleh sub-pad 41 Hz.
- **EQ narator juga dicek.** Tanpa boost 150–300 Hz; mulai dari HPF 90, −4,5 dB @300 Hz Q1, +1,5 dB @3 kHz. Ukur low-mid hasil akhirnya.

### 14.7 Modul 2 — tanpa potong mendadak (guillotine), J-cut / L-cut, bed kontinu
- **Larangan keras**: audio klip berhenti tepat di frame terakhir potongan tanpa handle/fade.
- **Handle dari audio sumber**:
  - pre-roll ≤ 4 f (133 ms), fade-in ease-out quad;
  - post-roll ≤ 8 f (266 ms), fade-out ease-in cubic sepanjang handle;
  - handle ditumpuk di atas celah **tanpa menggeser timeline**;
  - handle dibatasi supaya tidak memasukkan kata tetangga dari sumber (pakai timestamp kata STT). Bila kata berikutnya menempel, beri minimal 35 ms fade, tetap setelah konsonan terakhir.
- **Jangan memotong di tengah kata/fonem**: post-roll ≥ 150–250 ms setelah konsonan terakhir bila sumber memungkinkan.
- **Bridge SFX di setiap perpindahan** berita→berita, berita→VO, VO→klip, dan klip→VO:
  - jenis bunyi: tape switch, camera shutter, atau sub-whoosh LPF ± 250 ms;
  - puncaknya tepat di frame pergantian visual.
- **Room tone sumber** mengisi celah antarpembicara (jendela paling hening klip itu sendiri, di-loop dan di-crossfade; `roomtone.py`).
- **Bed musik/sub-pad tidak pernah 0** saat klip bicara:
  - turun 6 dB dengan ramp 12 f sebelum klip dan naik lagi 15 f sesudah klip;
  - beat drop ke hening total tidak dipakai lagi.
- **Proyek yang menaruh audio di Remotion** (bukan pre-mix) wajib memakai `scripts/remotion/SmoothAudioClip.tsx` (pre-roll, post-roll, envelope fade).
  - Hati-hati: `<Sequence>` yang durasinya sama dengan potongan visual meng-unmount audio seketika.

### 14.8 Modul 3 — taksonomi & palet SFX
Dilarang:
- whoosh dari white/pink noise mentah;
- beep/blup sinus 8-bit;
- laser sci-fi;
- langkah kaki kartun.

**Direvisi 1 Nov 2026.** Kolom "Wajib" versi Gemini dicabut: wood/felt, thock LPF 1,5 kHz, lapisan sub thump di bawah whoosh, dan micro-tick + felt pulse. Penyebabnya:
- dua bunyi untuk satu event melanggar aturan "1 adegan 1 pesan 1 SFX";
- palet gelap bertentangan dengan referensi dan dengan palet The Gap.

Satu peran memakai **satu bunyi yang sama sepanjang video**, sama seperti aturan tipografi. Satu event hanya mendapat **satu bunyi**.

| Visual | Bunyi (stok Irfan) | Catatan |
|---|---|---|
| Kata kinetik muncul (setiap kata) | tap digital `ipad_click` | −16 dB dari puncak VO, turun −3 dB saat VO bicara |
| Kata slam/penekanan | `v17_thud_1` (dentum pendek) | satu bunyi, bukan pop + sub |
| Ketikan | `iphone-keyboard-typing`, satu rentang per kalimat yang diketik | keyboard digital, bukan thock mekanik |
| Kursor/tombol ditekan | `mouse-click-290204` | |
| Kartu/UI/agent muncul | `pop-up-notify-smooth-modern` | |
| Kartu/tile mendarat | `soft-subtle-ui-pop` | |
| Kamera patah / transisi / potongan antar pembicara | whoosh gelombang (rotasi 3 sampel mirip), puncak di v_max atau di potongan | tanpa lapisan sub |
| Whip / cut on motion | `v17_whip_1/2` | |
| Zoom-through / build | `riser` (ElevenLabs, video #2), berakhir di cut | |
| Beat drop / pendaratan besar | `v17_impact_1`, ekor ≤ 0,9 dtk | tidak ada hantaman di frame 0 (The Gap D-038) |
| Foto montase berganti / gambar berganti | klik kamera `shutter-modern.wav` / video #2 `shutter.mp3`, 1:1 per gambar | bukan whoosh/swipe (Irfan 2 Nov 12.36) |
| Bidang cahaya menyala/padam | `switch` (klik saklar) | |
| Garis/grafik tergambar | `v17_glide_2` | |
| Penutup | jeda pra-drop −18 dB (bukan hening mati) → bass drop + ekor musik asli | tanpa akor sinus |

### 14.9 Modul 4 — sinkron kurva kamera ↔ audio (velocity-peak)
- Kamera Apple-style tidak linear: spring (stiffness 160–220, damping 22–28) atau `cubic-bezier(0.22, 1, 0.36, 1)`. Kecepatan maksimum ada di 25–35 % durasi gerak.
- **Whoosh/swell**:
  - puncak transien jatuh tepat di frame v_max kamera;
  - file dimulai 3–4 f sebelumnya;
  - ekornya mereda mengikuti settle;
  - rumus: `sfxStart = camStart + round(0.28 × moveDur) − whooshPeakOffset`;
  - di cue, pakai `align:"peak"` + `peak` = detik puncak di file.
- **Pop/klik kemunculan**: transien di +1…+2 f setelah skala melewati 0,6 (objek pertama kali terlihat jelas), bukan di frame 0.
- **Stagger banyak item** (grid, barisan): satu bunyi per item yang terlihat terpisah. Item yang muncul bersamaan dalam ≤ 2 frame dihitung sebagai satu event. Maksimal 2 bunyi per 100 ms, dan dua bunyi berperan sama tidak boleh jatuh dalam 100 ms (The Gap `sync_cues.py`). **Kata kinetik tidak pernah dipangkas**, karena setiap kata yang muncul mendapat bunyinya (revisi 1 Nov). Aturan lama "4–6 tick lalu tekstur kertas" dicabut.

### 14.10 Modul 5 — gerbang QA audio otomatis (wajib sebelum render/kirim final)
```
python3 claude/motion-graphic/scripts/audio_qa.py mix_master.wav --module5 <stem_dir> timeline.json placed.json
python3 claude/motion-graphic/scripts/audio_qa.py mix.mp4 ref1.mp4 ref2.mp4   # bandingkan dengan referensi segenre
```
Lulus bila semua terpenuhi:

| Cek | Ambang |
|---|---|
| Integrated | −14,0…−14,5 LUFS |
| True peak | ≤ −1 dBTP |
| Pita spektral | **dibandingkan dengan referensi segenre (video ber-VO), bukan angka tetap.** The Gap: sub 14 % / low-mid 63 %. Emotion: sub 18 % / low-mid 64 %. Angka lama (sub 25–55 %, low-mid < 42 %) berasal dari referensi musik tanpa VO (Krea 2, Renaissance) dan mendorong penambahan sub-pad sinus; dicabut 1 Nov 2026. |
| Abrupt cutoff (> 18 dB/50 ms) di ujung klip narasumber | tidak ada celah mati: di potongan antar pembicara selalu ada jembatan (whoosh + musik/room tone), jendela 100 ms < −45 dBFS = 0. Penurunan di akhir kata VO kering itu normal (The Gap 46). |
| Kepadatan & level SFX (demucs no_vocals, `refaudit/sfx_profile.py`) | event menonjol ±1,8–2,1/dtk; puncak SFX median ±−9…−10 dB dari puncak VO; bed −13…−15 dB di bawah VO (The Gap: 2,05/dtk, −10 dB, −14,8 dB) |
| Gema VO | energi ekor 40–150 ms setelah kata ≤ −25 dB dari kata (`qa14.py`) |
| VO per blok | −14 LUFS ±1 |
| Klip narasumber per blok | −15,0…−15,5 LUFS (±0,5) |
| Musik di bawah VO | −22…−25 LUFS |
| Median puncak SFX UI per kelas | −16…−20 dBFS |
| Median puncak ketikan | −22…−25 dBFS |

Catatan pengukuran:
- Stem dialog mono harus diukur sebagai stereo (+3 dB), karena diputar di kedua kanal.
- Angka gerbang dilaporkan apa adanya ke Irfan.

**Aturan lama yang digantikan per 31 Okt 2026**:
- gerbang LRA ≥ 7 LU (blueprint 31 Okt pagi);
- "musik mati / hening total saat klip Jensen";
- beat drop ke hening 1 dtk sebelum klip;
- dinamika narator per babak (−2,5 / −4 dB).
