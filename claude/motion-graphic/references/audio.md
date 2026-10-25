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
4. Master −14 LUFS integrated, true peak ≤ −1 dBTP.

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
Senyap 9 f tepat di cut → VO kalimat balik → senyap 15 f → musik bagian baru masuk ≤ 2 f sebelum gerak kamera pertama. Punchline terbesar: semua audio senyap 0,4 dtk → hantaman + bass.

### 14.5 Standar "Warm, Thock, No Ear-Fatigue"
- Hindari energi tajam 2–6 kHz: piezo beep, tick digital, klik kaca, whoosh tipis, sparkle.
- Pilih thock/sub/muted latch/deep bubble pop/paper glide 100–1.200 Hz. Low-pass 5–6 kHz bus SFX.
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
