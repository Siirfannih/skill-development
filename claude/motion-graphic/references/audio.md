# Audio — VO, SFX, musik

Baca hanya di gerbang audio (setelah script dan storyboard final) dan saat QA audio. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 14. Audio

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
- **Setiap event visual diskret bersuara (target ≥ 85 %, diukur `compare_audio.py`)**:
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

### 14.5 Standar "Warm, Thock, No Ear-Fatigue"
- Hindari energi tajam 2–6 kHz: piezo beep, tick digital, klik kaca, whoosh tipis, sparkle.
- Pilih thock/sub/muted latch/felt/wood/paper glide 100–1.200 Hz. Low-pass 5–6 kHz bus SFX; **whoosh/riser LPF 1,8–3,5 kHz** (§14.8).
- **Deep bubble pop dilarang di grafik/data**: terdengar «blup» sonar (audit 31 Okt). Grafik memakai haptic micro-tick + felt pulse (§14.8).
- Glitch diterjemahkan ke versi hangat: sub stutter / tape-stop < 1,5 kHz.
- Dilarang: koin, logam, bunyi game, kartun berlebihan, salinan bunyi sistem Apple.
- Pustaka: **Kenyset FREE SFX PACK** (Pixabay license; katalog dengan kelas, durasi, centroid, energi rendah, label HANGAT/PAKAI+LPF/TAJAM). Rakit "kit gaya transisi" yang konsisten dari pack ini:
  - WHIP (swoosh + thump rendah)
  - TEXT_SLAM (pop + sub)
  - TEXT_SOFT
  - COUNTUP (tick roll + lock)
  - UI_CLICK, NOTIF
  - RISER → reveal
- Pemetaan cepat dari pack:
  - pendaratan kamera / whip: `whoosh-end`, `swoosh-2`, `swoosh-010`, `universfield-swoosh-023`, `simple-whoosh-02`, `whoosh-velocity`
  - pop kata kunci / objek muncul: `soft-subtle-ui-pop`, `simple-pop-noise`, `pop-2`, `pop-402324`, `bubble_pop_1`, `multi-pop-2`, `creatorshome-plop`
  - UI/klik: `soft-ui-pop-light-minimal-click`, `tiktok_drop_sample_click3`, `confirm-tap` (+LPF), `ui-sounds-pack-2-sound-*`
  - notifikasi/positif: `pop-up-notify-smooth-modern`, `marimba-bloop-2/3`, `notification-pluck-off`, `new-notification-012`
  - riser/appear: `freesound_community-appearance-effect`
- Impact rendah disintesis (sine 55–150 Hz) bila pack tidak punya.
- QA telinga: Gemini berguna untuk mendeteksi bunyi tajam atau yang menutupi VO, tetapi **tidak andal untuk level dan timestamp** (bisa bergeser puluhan detik). Ukur dengan alat sendiri; telinga Irfan hakim terakhir.
- Sumber dan lisensi tiap file dicatat di `CREDITS.md`.

---

## 14.6–14.10 Aturan audit audio 31 Okt 2026 (Modul 1–5)

Sumber: audit DSP Gemini atas `PenggantiKitaSendiri_v2`, diminta dan diadopsi Irfan sebagai masukannya sendiri. Angka diverifikasi ulang dengan `scripts/audio_qa.py`. Hasil ukur v2 dibandingkan referensi:

| Video | Sub | Low-mid | Penurunan mendadak |
|---|---|---|---|
| v2 | 5,8 % | 67,9 % | 100 |
| Ref Krea 2 | 55,4 % | 33,6 % | 3 |
| Ref Renaissance | 39,3 % | 35,2 % | 17 |

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

Semua whoosh/riser LPF 1,8–3,5 kHz.

| Visual | Dilarang | Wajib | Spektrum/durasi |
|---|---|---|---|
| Pan/zoom/whip cepat | desis noise tajam | whoosh udara/kain hangat **+ sub thump** | puncak 120–600 Hz, LPF 2,5 kHz, 180–350 ms |
| Kartu UI / urutan item | pop datar satu nada | felt-pop / wood-tick naik +1 st (atau +50 cent) per kartu | transien 8–20 ms, body 250–800 Hz, −16 dBFS |
| Grafik / kurva / dial / data | sonar «blup» | haptic micro-tick 2–4 ms + felt pulse naik 60–180 Hz | klik ultra-pendek + sub-swell halus |
| Ketikan prompt | ketik mekanik keras di 2 kHz | thock lembut LPF 1,5 kHz, variasi nada ±3 % | −22…−25 dBFS |
| Metafora dokumenter (siluet, kloning, buku) | laser buzz, langkah kartun | foley material diegetik: kertas/flutter untuk data masif, klik tombol fisik, ketukan kayu/felt, vinyl stop | organik, sesuai materi objek |
| Montase foto cepat | shutter keras berulang | flutter karton/kertas LPF 2,2 kHz sinkron 1:1 per foto (shutter tunggal tetap boleh) | pendek, lembut |
| Klimaks/pertanyaan penutup | dengung low-mid 150–300 Hz | **300 ms pre-drop silence → sub drop 45–80 Hz + ekor piano/synth hangat 3 dtk** | ekor fade eksponensial ke −60 dB |

### 14.9 Modul 4 — sinkron kurva kamera ↔ audio (velocity-peak)
- Kamera Apple-style tidak linear: spring (stiffness 160–220, damping 22–28) atau `cubic-bezier(0.22, 1, 0.36, 1)`. Kecepatan maksimum ada di 25–35 % durasi gerak.
- **Whoosh/swell**:
  - puncak transien jatuh tepat di frame v_max kamera;
  - file dimulai 3–4 f sebelumnya;
  - ekornya mereda mengikuti settle;
  - rumus: `sfxStart = camStart + round(0.28 × moveDur) − whooshPeakOffset`;
  - di cue, pakai `align:"peak"` + `peak` = detik puncak di file.
- **Pop/klik kemunculan**: transien di +1…+2 f setelah skala melewati 0,6 (objek pertama kali terlihat jelas), bukan di frame 0.
- **Stagger banyak item** (grid, barisan): maksimal 4–6 micro-tick terpisah di awal, lalu satu tekstur organik kontinu (flutter kertas/shimmer LPF) yang mengikuti kurva jumlah objek. Dilarang memicu ratusan SFX bersamaan.

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
| Sub 20–150 Hz | 25–55 % daya spektral |
| Low-mid 150–500 Hz | < 42 % |
| Abrupt cutoff (>18 dB/50 ms) di ujung klip narasumber | 0, kecuali tape-stop/silence drop yang tertulis di naskah |
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
