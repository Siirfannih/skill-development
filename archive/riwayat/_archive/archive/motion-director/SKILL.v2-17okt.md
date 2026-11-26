---
name: motion-director
description: Satu pegangan utuh untuk membuat video motion Irfan (launch Jadisatu, Tuntunly, konten siirfan) setara Holy Freak — gerbang kerja, family visual, tipografi kinetik, kamera, transisi, SFX per gerak, engine render, QA. Menggantikan motion-graphic-playbook, irfan-motion-director, MOTION-SYSTEM, TYPE-STYLES. Pakai di setiap video/motion untuk Irfan.
---

# Motion Director v2 (Irfan)

Skill ini menyatukan semua pegangan video Irfan yang sebelumnya terpecah (motion-graphic-playbook, irfan-motion-director, MOTION-SYSTEM.md, TYPE-STYLES.md, STANDAR-KUALITAS Tuntunly, RETRO.md) ditambah hasil bedah 4 referensi (17 Okt 2026): **Holy Freak** (inspirasi utama), **Baikov/ssspin** (gerak kamera + penempatan SFX), **Emotion/Sol** dan **Klickpin/AURA** (gerak kamera). Bukti per aturan (timestamp) ada di `refs/<nama>/DISSECTION.md` proyek Jadisatu.

Prinsip inti (dari SKILL.md Holy Freak yang terlihat di videonya, diterapkan ke selera Irfan):
1. **Cerita dulu, baru gaya.** Setiap shot menjawab: tokoh sedang melakukan apa, dan apa subjeknya.
2. **Setiap potongan jatuh di ketukan** (frasa VO, beat musik, atau puncak kecepatan gerak).
3. **Teks bergerak di ruang, bukan tempelan datar.** Teks adalah objek: ikut kamera, menempel benda, hancur bersama transisi.
4. **Satu bunyi untuk setiap gerak yang bermakna.** Bukan untuk setiap kata.
5. **Cek setiap frame dua kali.** Contact sheet + preview bergerak + telinga.
6. **Taste: no slop.** Satu fokus per frame, ruang kosong itu mewah, tidak ada efek tanpa alasan.

---

## 1. Gerbang kerja (urutan dikunci)

0. **Muat konteks**: skill ini + `working-with-irfan` + `irfan-creative-workflow` + skill VO proyek (mis. `jadisatu-narrator-vo`). Baca RETRO terbaru (§14).
1. **Brief**: tujuan, penonton, durasi, CTA, format master (default **16:9 1920×1080 ditonton di HP**, 30 fps native).
2. **Script final** disetujui Irfan dan disimpan sebagai file. Teks layar hanya boleh bersumber dari `voiceover.full_text` (terjemahan/ringkasan frasa VO). Tidak ada kalimat atau angka tambahan.
3. **Storyboard 100 %** = referensi komposisi, bukan aset. Untuk setiap beat isi **tabel spec §11** (termasuk kolom SFX).
4. **Audio VO** baru dibuat setelah script final (credit discipline). Musik/SFX setelah storyboard disetujui.
5. **Validasi satu adegan bergerak** (preview MP4 + daftar elemen per jenis: model 3D / sprite / plate / teks-UI). Pendekatan baru tidak boleh diterapkan ke seluruh video sebelum satu adegan lolos.
6. **Build semua adegan** dengan komponen yang sama.
7. **QA** (§12) → kirim video + daftar penyimpangan dari storyboard + alasannya.
8. **Revisi** = perintah konkret ("Fix this transition / Lower that whoosh -6 dB / Hold the ending one beat longer"). Ubah kode yang ada, jangan bangun ulang dari nol. Setiap revisi → entri RETRO.

---

## 2. Format & keterbacaan HP
- Master 1920×1080, 30 fps native (jangan upconvert 24→30, terjadi judder).
- Margin aman 5 % tiap sisi. Teks kunci tidak di 8 % bawah (zona UI IG/YouTube).
- Ukuran minimum di master: kata sambung ≥ **56 px**, kata utama 110–170 px, kata kunci 200–320 px (boleh bleed). Rasio kunci : sambung ≥ 3 : 1 dalam satu frase.
- Satu frase di layar 2–6 kata, bertahan 1–3 dtk.

---

## 3. Tiga family visual (pilih per babak, jangan dicampur dalam satu shot)

| Family | Dunia | Aset | Kamera | Dipakai untuk |
|---|---|---|---|---|
| **A. Kolase + karakter** | Ruang pixel/voxel hangat (contoh Jadisatu: ruang kerja malam Irfan) | **Plate latar** (dinding tanpa objek utama) + **model 3D low-poly** untuk objek utama (meja, monitor, laptop, properti, lampu sebagai cahaya nyata) + **sprite pixel-art karakter** (billboard, beberapa pose) + UI/teks | Kamera 3D sungguhan (three.js), depth of field/parallax nyata | Masalah, tokoh, cerita personal |
| **B. Tipografi gelap** | Latar navy/hitam, gradient lembut, percikan halus | Teks 2D dengan depth ringan, kursor ketik | 2D CAM rig, zoom mikro, slam | Klaim, pertanyaan, titik balik ("{ Builder / Trap }") |
| **C. Kanvas putih UI** | Putih/off-white | UI datar: avatar outline berwarna, kursor, kartu, konektor — tiap elemen bergerak independen | 2D CAM, reflow layout, reveal-out | Solusi, workflow, produk, CTA |

Aturan family A (dari revisi Irfan 17 Okt):
- Storyboard **tidak boleh** dipakai sebagai background lalu ditumpuk teks. Teks tercetak di gambar tidak boleh terbawa.
- Objek utama tidak menyatu dengan plate; harus elemen terpisah dengan volume dan perspektif konsisten.
- **Sprite tidak boleh diputar seperti kartu.** Saat sudut kamera berubah ke belakang/samping, ganti ke **aset tampak belakang/samping** (generate sprite baru).
- **Subjek = yang sedang dilihat/dikerjakan tokoh.** Laptop terbuka di depan tokoh → cut ke over-the-shoulder dari belakang tokoh, bukan zoom ke monitor latar. Objek latar tidak boleh jadi fokus aksi.
- Gerak harus memperlihatkan hubungan spasial (depan/belakang beda kedalaman; tokoh bereaksi terpisah dari meja; layar berganti tanpa mengubah seluruh gambar).
- Render 3D di ½ resolusi lalu diperbesar *pixelated* supaya menyatu dengan gaya pixel; teks/UI tetap tajam di 1080p.

Perpindahan family = momen cerita (mis. masalah → solusi), memakai transisi bab (§7) + aturan audio engsel senyap (§8.4).

---

## 4. Tipografi (berlaku semua family)

**Huruf** (tanpa serif untuk teks utama; tidak menjiplak condensed-caps Holy Freak):
| Peran | Font | Ukuran @1080 | Warna |
|---|---|---|---|
| Kata kunci | Inter Black (900), boleh kapital | 200–320 px | aksen: coral `#F97066` (gelap) / biru `#2563EB` (terang) — **hanya 1 kata per frase** |
| Kata utama | Inter ExtraBold (800) | 110–170 px | putih hangat `#FAF8EC` (gelap) / navy `#0F172A` (terang) |
| Kata sambung | Inter Medium (500) | 56–80 px | sama dengan kata utama, opacity 75–85 % |
| Data/angka | Silkscreen (dunia pixel) atau JetBrains Mono (UI) | 60–140 px | biru `#2563EB` untuk data/AI |
| Label diegetik | JetBrains Mono uppercase, tracking +100 | 36–48 px | sesuai objek |

**Tata letak**
- **Posisi teks berotasi per frase** — dua frase berurutan tidak boleh di zona yang sama. Zona yang dipakai (pilih sesuai komposisi shot, rancang shot-nya bersama teks):
  1. **Di belakang tokoh** (gaya sampul majalah): teks setinggi kepala di antara tokoh dan latar, tokoh menutupi bagian bawah huruf tengah; bagian atas huruf tetap terbaca. Untuk perkenalan/kata hero.
  2. **Tengah melebar** (bleed hampir tepi ke tepi) + latar diredupkan 40–50 %: untuk momen puncak/titik balik.
  3. **Tengah bawah satu baris besar** di atas pita gradien navy: untuk frase emosi (tidak menutupi wajah).
  4. **Tengah atas kecil**: kalimat pengantar/konteks.
  5. **Menempel objek / melayang dari objek** (diegetik, world-locked).
  6. **Ruang negatif samping subjek** (rata kiri/kanan, blok bertumpuk) — hanya salah satu opsi, bukan default.
- Tidak menutupi wajah; di area terang/ramai pakai pita gradien atau redupkan latar, bukan bayangan teks.
- **Tidak ada subtitle statis di bawah layar.** Teks layar kinetik itulah caption-nya: VO Inggris → teks Indonesia per frase, kata-katanya pop mengikuti onset kata VO.
- Saat kamera bergerak besar, teks **world-locked** (ikut ruang 3D: skala, parallax, motion blur).
- Label/callout boleh menempel di objek 3D dengan garis tipis (diegetik).
- Teks tidak punya animasi keluar sendiri: **keluar bersama transisi shot** (2–6 f) atau naik keluar lewat mask 4–6 f.

---

## 5. Library teks kinetik (frame @30 fps)

| Kode | Nama | Cara kerja | Angka | Sumber |
|---|---|---|---|---|
| K01 | **Word-pop ikut VO** | Kata muncul **setelah** onset kata VO (bukan sebelum) | +1…+4 f (target +2 f); masuk 3–4 f: scale 0.85→1 + naik ½ cap-height, ease-out | HF T1, Klickpin TXT-01 |
| K02 | **Slam overshoot** (kata kunci saja) | f1 2.0× + rotasi Y ±15° + flash putih 1 f → f2 1.3× → f3 1.0×; low impact di f0–f1 | 3 f; maks 1 per frase | HF T4 |
| K03 | Flash/color-settle masuk | Kata masuk dalam warna aksen + motion blur arah gerak (travel ±110 px), settle ke warna akhirnya | flash 2–4 f; color-settle ±8 f | HF T3, Baikov TXT-01 |
| K04 | Blur-to-focus (aksen) | Kata pertama frase reflektif masuk dari blur 12 px → 0 | 3 f, maks 1 per 15 dtk | HF T6 |
| K05 | **Decode data** | Kata teknis/angka: digit mono/pixel biru ("1011") → glitch 1–2 f → kata | ±5 f | HF T8 |
| K06 | Counter dengan overshoot | Angka roll ease-out expo, boleh lewat target +15–20 % lalu settle | 12–27 f | HF T9 |
| K07 | Slot swap | Kata di posisi tetap berganti naik (lama keluar ke atas, baru dari bawah) | 4 f transisi, hold 10–15 f | HF T11, playbook T08 |
| K08 | Typewriter (UI saja) | Per karakter + kursor blok; dilarang untuk headline naratif | 1 karakter/f | HF T10 |
| K09 | Teks world-locked | Teks sebagai objek di ruang kamera (push/pull/fly-through) | 100 % gerak kamera besar | HF T5 |
| K10 | Teks diegetik | Label/callout/neon menempel objek | mono 36–48 px | HF T15 |
| K11 | Ikon inline shuffle | Ikon 1.0–1.3× cap-height di antara kata, berganti objek tiap 2 f selama 8–12 f lalu settle | muncul +3…+9 f setelah katanya | Klickpin TXT-02 |
| K12 | Tracking converge | 2 kata berjarak ±40 % lebar merapat | 15 f ease-out | Klickpin TXT-05 |
| K13 | Anchor word | Satu kata besar tetap di tengah, latar berganti tiap 14–22 f | 3–5 latar | Emotion CUT-ANCHOR-WORD |
| K14 | Teks chaotic (frustrasi) | Frase bergetar tipis (wiggle 2–4 px, 8 Hz) dan bertumpuk 2–3 lapis offset | maks 1,5 dtk | JSON Irfan "the trap" |
| K16 | Huruf naik dari objek | huruf naik dari bar/objek dengan tinggi acak lalu terkunci bersamaan, ±20 f, 3 pop rendah tiap 5 f | Baikov TXT-03 |
| K15 | Teks terdistorsi bersama transisi | Mosaik/pixelate pada teks menyatu dengan transisi blok | 5–6 f | JSON Irfan "the break", HF X01 |

Aturan pemakaian: 4–6 teknik berbeda per 15 dtk; teknik sama maks 2 kali berturut; kata terpenting masuk terakhir dan berbeda.

---

## 6. Kamera

**Hemat dan tegas**: gerak kamera global hanya ±10 % durasi (Holy Freak 9 %); shot lain diam atau drift ≤1.06×. Diam untuk dibaca (0,8–3 dtk; setelah reveal UI ≥4 dtk), lalu bergerak besar.

| Kode | Gerak | Angka | Kapan | Sumber |
|---|---|---|---|---|
| C01 | **Zoom mikro di kata kunci** | 1.04–1.16× dalam 13–25 f, ease-in-out, mulai tepat di kata kunci | hampir setiap shot | HF C02 |
| C02 | **Push-through layar** | 2.9–3× dalam 16–26 f, ease-in kuat + motion blur, menembus layar ke dunia berikut | pembuka / masuk UI | HF C03, Emotion PUSH-LAND |
| C03 | **Seam di puncak kecepatan** | keluar ease-in 12–16 f sampai 180–260 px/f → ganti adegan di frame puncak → mendarat expo-out 18–22 f tanpa overshoot | sambung adegan 2D | Klickpin CAM-01, Emotion THROW-CUT |
| C04 | Zoom-through ke objek | ±2× dalam 9–13 f ease-in expo; warna latar shot baru = warna objek | masuk ke "dalam" ikon/kartu | Emotion ZOOM-THROUGH |
| C05 | Reveal-out | 3–4× dalam 60 f (akselerasi 9 f, deselerasi 50 f), lalu diam ≥4 dtk | dari detail ke konteks | Emotion REVEAL-OUT |
| C06 | Truck lateral daftar | linear, 1 item per kata VO (±1,9 dtk/item), kamera ikut tokoh/ikon | daftar ≥4 item | HF C04 |
| C07 | Snap punch-in "kamu" | 1.8× dalam 4 f ease-out keras, kembali 4 f | menyapa penonton | HF C05 |
| C08 | Drop-settle | masuk vertikal 18→1.5 px/f meluruh 40 f + roll ≤6° meluruh | adegan baru jatuh ke tempat | Emotion DROP-SETTLE |
| C09 | Glyph anchor | kamera mundur 10× dalam 88 f, satu huruf/ikon counter-scale tetap ukurannya | logo lahir dari huruf | Emotion GLYPH-ANCHOR |
| C10 | Dolly rangkuman | dolly 3D linear ±8 dtk melewati artefak, berhenti di objek hero | rangkuman perjalanan | Emotion MUSEUM-DOLLY |
| C11 | Reverse / over-the-shoulder | cut ke belakang bahu tokoh saat aksi ada di layar/objek yang ia hadapi | family A | revisi Irfan S5 |
| C12 | Cut zoom | potong ke subjek yang sama 2–5× lebih dekat di garis pandang yang sama, momentum push 6 f lalu melambat | 1 per 6–10 dtk | playbook §5 |

Tambahan dari Baikov:
| Kode | Gerak | Angka | Sumber |
|---|---|---|---|
| C13 | **Pelan di dalam shot, cepat antar shot** | gerak dalam shot 3–8 dtk ease-in-out; transisi 2–9 f; frame diam total ≤25 % | Baikov CAM-01 |
| C14 | Zoom-through berlapis ke shape | 3–5 lapis, ≥3× per lapis, 3–9 f per lapis, total 20–25 f; warna shape = latar berikut; satu riser + thud di landing | Baikov CAM-02 |
| C15 | Snap reflow zoom-out | saat komposisi bertambah: mundur seketika ×0,45 lalu ×0,6, masing-masing 2 f, pop −2…0 f | Baikov CAM-03 |
| C16 | Rotate-settle setelah cut | objek masuk −15° → 0° dalam ±6 f ease-out | Baikov CAM-06 |
| C17 | Rack focus pop-forward | kartu maju 1,0→1,25 sementara latar blur 12–20 px, 8–10 f | Baikov CAM-07 |
| C18 | Blur-in landing UI | layer UI masuk blur penuh → tajam 12 f di ujung zoom-through | Baikov CAM-08 |
| C19 | Teks di silinder 3D | daftar pada roda melengkung, step-rotate 15–25 f, item aktif ganti warna, keluar meledak 3–4 f + sub-thud −1 f | Baikov CAM-09 |

Aturan arah: di dunia 2D konten bergeser ke kiri (maju); gerak **vertikal khusus untuk pindah dunia/family**. Dunia 3D boleh terus bernapas (push ±0.5 %/f); dunia 2D diam penuh di antara transisi cepat.
Motion blur wajib pada gerak cepat (render subframe, shutter 180°).

---

## 7. Transisi (nol crossfade)

| Kode | Transisi | Angka | Kapan | Sumber |
|---|---|---|---|---|
| X01 | **Mosaik blok piksel** warna brand | blok ±60 px @1080, bangun acak 3 f → penuh → pecah jadi shot baru 2–3 f; 5–6 f (12 f untuk ganti bab) | pemisah bab; cocok untuk dunia pixel | HF X01 |
| X02 | Flash exposure | naik 1 f, turun 3–4 f; warna navy/biru, putih penuh maks 1× per video | ritme "Every X / Every Y" | HF X02 |
| X03 | Whip (pan/zoom) + motion blur | 3–4 f | energi | HF |
| X04 | Frame-in-frame | frame menyusut jadi kartu di ruang gelap 8 f | momen meta ("video ini") | HF X03 |
| X05 | Bloom match | objek menyala memenuhi frame 8 f, objek sama di posisi layar sama di shot berikut | logo/brand | Emotion BLOOM-MATCH |
| X06 | Wipe berlapis | 2 lapis bentuk (warna A lalu B, jeda 3 f), total 9–10 f, bentuknya lanjut jadi layout | masuk kanvas putih | Klickpin CAM-09 |
| X07 | Foreground wipe | objek buram dekat lensa melintas 9 f, cut disembunyikan | family A | Klickpin CAM-08 |
| X08 | Mask shrink ke logo | adegan menyusut ke bentuk brand 8 f → jadi logo | penutup | Klickpin CAM-07 |
| X09 | Object carry / match shape | benda adegan A menjadi elemen adegan B | kelas tertinggi, prioritaskan | playbook X03/X06 |
| X11 | Shape wipe | shape warna brand masuk dari tepi menutup 100 % frame, scene baru di belakangnya, 5–9 f ease-out, pop −1 f | ganti topik cepat | Baikov CAM-04 |
| X10 | Cut on motion vertikal | ease-in 7–12 f → cut → expo-out 13–14 f arah sama, objek sama di kedua sisi | pindah dunia | Klickpin CAM-03 |

Pemicu transisi: di **akhir frase VO** (2–6 f setelah suku kata terakhir); adegan baru mendarat di kata pertama frase berikut (−3…+3 f).

---

## 8. Audio

### 8.1 Hierarki mix
1. **VO pemilik panggung** (kompresi ringan, +2 dB di 3 kHz). VO ±5–6 dB di atas musik saat bicara.
2. **SFX penekan**, median −13…−21 dB di bawah VO; 1–2 hit puncak per video boleh ≈0 dB. SFX besar ditaruh **di sela kata**, bukan di atas kata.
3. **Musik suasana**: duck 9–12 dB saat VO, naik di jeda; potong −4 dB di 3 kHz.
Target master −14 LUFS.

### 8.2 Dua babak energi (Holy Freak)
- **Hook/masalah**: bed musik/sub + SFX padat (±2,5/dtk, Baikov rata-rata 2,4/dtk).
- **Penjelasan/solusi**: musik tipis atau mati, SFX ±1/dtk, jeda boleh nyaris senyap (room tone −50 dB, jangan digital silence mutlak).
- **Engsel**: satu riser panjang (±50 f) + hit tepat di kata pivot.

### 8.3 Penempatan SFX (acuan utama: Baikov — "SFX mendukung semua visual"; dalam standar hangat Irfan)
- **Setiap event visual DISKRET diberi SFX** (muncul, mendarat, klik, ledakan, perubahan state UI, transisi, kata kunci): target **±85 %** event. Yang sengaja kosong hanya gerak pelan/kontinu (pull-out panjang, putaran, drift). Kata sambung yang sekadar pop kecil boleh tanpa bunyi bila berimpitan dengan konsonan VO.
- **Offset** (frame @30 fps):
  - pop "muncul": −1…+1 f dari frame pertama elemen terlihat;
  - sub-thud: di **frame mendarat/settle**, bukan frame mulai gerak;
  - hard cut: whoosh rendah mulai −3 f, thud +2 f;
  - burst/ledakan: whoosh naik −11 f, thud −2 f;
  - slam kata kunci: impact −1…−2 f, didahului silence pocket 3–7 f (≤ −55 dB);
  - rangkaian zoom-through/flash-cut: **satu riser kontinu**, hit hanya di pendaratan terakhir.
- **Level relatif VO** (MIX-01 Baikov): sub-thud ≈ −3,5 dB · pop/thock ≈ −9 dB · blip/whoosh −15…−18 dB · musik −8…−20 dB. Transien kecil yang jatuh di konsonan VO digeser ±2 f ke celah VO atau diturunkan ≥18 dB.
- **UI micro-pop**: setiap perubahan state UI (pill, ikon, checkbox, hover, klik) pop pendek 400–1.200 Hz, 30–80 ms, −9…−15 dB.
- **Isi kekosongan VO**: saat VO diam, kepadatan SFX boleh naik (hover, count-up) sampai ±5/dtk; rata-rata video 1,5–2,5/dtk.
- **Seri blip** untuk item daftar: bunyi yang sama, interval tetap.
- Musik: buka tipis (pad), riser ke reveal, bass masuk setelah hook; gerak kamera mulai/mendarat di beat (±2 f); transisi besar di kick; bass/musik putus ±1 dtk sebelum atau tepat di cut ke end card.

### 8.4 Engsel senyap (titik balik cerita, Emotion)
Senyap 9 f tepat di cut → VO kalimat balik → senyap 15 f → musik bagian baru masuk ≤2 f sebelum gerak kamera pertama.

### 8.5 Standar bunyi "Warm, Thock, No Ear-Fatigue"
- Hindari energi tajam 2–6 kHz (piezo beep, tick digital, klik kaca, whoosh tipis, sparkle, kicau). Pilih thock/sub/muted latch/deep bubble pop/paper glide 100–1.200 Hz; low-pass 5–6 kHz bus SFX.
- Glitch/"distorsi digital" dari JSON diterjemahkan ke versi hangat: sub stutter / tape-stop rendah (<1,5 kHz), bukan noise tajam.
- Pustaka: **Kenyset FREE SFX PACK** (~/Downloads, katalog `sfxlib/CATALOG.md`): pakai yang berlabel HANGAT langsung, PAKAI+LPF dengan low-pass 5 kHz, hindari TAJAM. Pemetaan cepat:
  - pendaratan kamera / whip: `whoosh-end`, `swoosh-2`, `swoosh-010`, `universfield-swoosh-023`, `simple-whoosh-02`, `whoosh-velocity`
  - pop kata kunci / objek muncul: `soft-subtle-ui-pop`, `simple-pop-noise`, `pop-2`, `pop-402324`, `bubble_pop_1`, `multi-pop-2`, `creatorshome-plop`
  - UI/klik: `soft-ui-pop-light-minimal-click`, `tiktok_drop_sample_click3`, `confirm-tap` (+LPF), `ui-sounds-pack-2-sound-*`
  - notifikasi/positif: `pop-up-notify-smooth-modern`, `marimba-bloop-2/3`, `notification-pluck-off`, `new-notification-012`
  - riser/appear: `freesound_community-appearance-effect`
  - impact/thud rendah: sintesis (sine 55–150 Hz) bila pack tidak punya
- QA telinga: Gemini 2.5 Flash berguna untuk mendeteksi bunyi tajam/menutupi VO, **tidak andal untuk level & timestamp** (bisa bergeser puluhan detik) — telinga Irfan hakim terakhir.

---

## 9. Warna
- Jadisatu: biru `#2563EB` (data/AI, aksen di kanvas terang), coral `#F97066` (kata kunci di gelap), navy `#0F172A` (latar gelap), off-white `#FBFAF7`, putih hangat `#FAF8EC` untuk teks di gelap.
- Proyek lain memakai palet brand-nya sendiri; yang dibawa adalah **sistemnya** (putih + 1 kata aksen per frase + warna data), bukan warnanya.

---

## 10. Engine & produksi (yang terbukti jalan)
- **Render deterministik**: halaman HTML 1920×1080 dengan `window.seek(t)`; dunia 3D pakai three.js (WebGL SwiftShader di headless_shell: `--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader`, `preserveDrawingBuffer:true`). Timing digerakkan timestamp kata VO (`words.js`). Render frame JPEG via Playwright → ffmpeg.
- **Motion blur**: render 5–6 subframe dalam shutter 180° untuk frame bergerak cepat, rata-rata di linear light.
- **Aset gambar**: generate lewat Codex/ChatGPT di Mac Irfan (`/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec --skip-git-repo-check -s workspace-write -i ref.png - < prompt.txt`), tanpa kredit invideo/Gemini. Sprite: minta sheet beberapa pose di latar hijau #00FF00, key hijau, potong per kolom; pose tampak belakang dibuat terpisah. Plate: "dinding saja, tanpa objek utama, tanpa teks".
- **Teks di belakang tokoh**: gambar teks di kanvas 2D, lalu potong dengan siluet sprite (`globalCompositeOperation='destination-out'`, gambar tekstur sprite di rect hasil proyeksi) — teks tetap tajam 1080p, tokoh 3D tetap di depan.
- **Teks di dunia 3D**: hitung posisi target dari titik layar yang dipilih (unproject di kamera tengah-shot) agar teks pasti terlihat dan tidak saling tumpuk; saat dolly-in, batasi pertumbuhan skala teks (≤1,06×) supaya blok tidak membesar menabrak kepala tokoh. Skala slam diputar di pusat kata, bukan di ujung kiri.
- **Font** harus dimuat eksplisit (`document.fonts.load`) sebelum render, kalau tidak teks hilang di frame pertama worker.
- **Perakitan/edit akhir** boleh di invideo (MCP) atau ekspor ke Premiere/DaVinci; kredit AI invideo hanya untuk generate.
- Simpan proyek di `~/Documents/<Proyek>` di Mac + PROJECT_STATE.md untuk serah terima sesi.

---

## 11. Spec beat (wajib sebelum build)

```
PROJECT | FAMILY per babak | 1920×1080 · 30 fps | VO: <file> | Musik: <file/–>
| # | Waktu VO | Kata VO pemicu | Teks layar (ID, ≤6 kata, **kunci**) | Teknik teks (K) | Subjek & aksi tokoh | Kamera (C) | Transisi keluar (X) | SFX (waktu, jenis, terikat ke, offset, dB vs VO) |
```
Cek sebelum build: setiap gerak punya alasan + bunyi (atau alasan kenapa senyap); setiap teks punya sumber VO; satu fokus per frame.

---

## 12. QA (gerbang kirim)
1. Contact sheet 4 fps + preview bergerak ditonton penuh.
2. Checklist:
   - [ ] Satu fokus per frame; teks tidak menutupi wajah/subjek.
   - [ ] Posisi teks berotasi: tidak ada dua frase berurutan di zona yang sama (§4).
   - [ ] Teks layar semua bersumber dari VO; tidak ada subtitle statis.
   - [ ] Latensi kata +1…+4 f dari VO; kata kunci 1 warna aksen per frase.
   - [ ] 4–6 teknik teks per 15 dtk; lompatan skala ≥3:1.
   - [ ] Kamera global ±10 % durasi; zoom mikro di kata kunci; 1 cut zoom per 6–10 dtk; logika subjek benar (kamera ke yang dikerjakan tokoh).
   - [ ] Sprite tidak pernah diputar; sudut berubah = aset sudut itu.
   - [ ] Nol crossfade; transisi di akhir frase VO.
   - [ ] Motion blur di semua gerak cepat.
   - [ ] SFX di ±85 % event visual diskret, offset sesuai §8.3, silence pocket sebelum hit; tidak ada bunyi tajam 2–6 kHz; VO selalu paling jelas.
3. QA audio Gemini (bunyi tajam / menutupi VO) + ukur spektrum (energi >5 kHz pada bus SFX < 5 %).
4. Penilai "setara referensi" independen (subagen tanpa konteks): bandingkan frame kita dengan frame Holy Freak sepadan; jawab "3 hal paling amatir" dan "apakah ketahuan beda kelas". Lulus bila rata-rata ≥4,5/5.

---

## 13. Jangan ditiru (dari referensi)
- Tick digital 3,5–6 kHz, ding/sparkle, kicau, strobo invert warna-warni, smear pelangi, frame putih penuh berulang.
- Palet dan identitas referensi (merah/teal Holy Freak, condensed-caps merahnya, maskot fedora; pink-cyan Sol; merah AURA).
- Frame padat (sprite + 5 stiker + teks + cincin sekaligus), grid 4 fokus, label 2 % H, caption statis kuning.
- Klaim "dibuat dengan Claude Opus 5.5" (layar Holy Freak menampilkan Opus 4.1).

---

## 14. Log revisi Irfan (memori gaya) — tambah baris setiap revisi
| Tanggal | Revisi | Aturan |
|---|---|---|
| 13–14 Okt | Neon stroke salah tafsir; transisi putus; tokoh hilang; PDF jadi kertas | Efek harus punya video acuan; peta transisi; karakter hadir sampai akhir |
| 17 Okt | Audio dibuat sebelum script/storyboard final | Gerbang §1 dikunci |
| 17 Okt | Animatic vertikal, gaya slide | Format default 16:9; validasi 1 adegan dulu |
| 17 Okt | Storyboard dipakai sebagai background + teks ditumpuk | Family A dari elemen terpisah §3 |
| 17 Okt | Rp47.000.000 & "belum cukup bagus" di luar VO | Teks layar hanya dari VO |
| 17 Okt | Kamera menyorot monitor latar, bukan laptop yang dikerjakan | Subjek = yang dikerjakan tokoh; reverse/OTS dengan aset tampak belakang |
| 17 Okt | Skill terpecah → losing context | Satu skill ini sebagai sumber kebenaran |
| 17 Okt | S5 v4: blok teks world-locked membesar menabrak kepala; kata OTS terproyeksi di luar layar | Anchor teks dari titik layar + batas skala (§10) |
| 17 Okt | Teks selalu di pojok kanan/kiri atas (aturan "ruang negatif samping subjek" dipakai sebagai default) | Rotasi zona teks per frase §4 + teknik teks di belakang tokoh §10 |
