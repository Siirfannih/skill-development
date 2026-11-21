---
id: "23"
pola: Sonic Event Hierarchy
kategori: sfx
kategori_lain: [typography, layout, camera]
trigger: promo produk atau fitur tanpa VO yang ceritanya dibawa bunyi; daftar fitur yang berganti satu per satu; kata atau angka raksasa sebagai puncak bagian
sumber: spot promo produk otomasi (file kiriman Irfan "Audio.mp4"; digabung dengan kartu 53, video yang sama) · 16:9 · 23,4 dtk
dilihat_bergerak: tidak
diukur: ya
alias: ["53"]
---
# 23 · Sonic Event Hierarchy

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `Audio.mp4` (folder asal: Motion; kartu 53 menamainya `26696d42-Audio.mp4`) · 16:9 (1280×720), 24 fps, 23,4 dtk · analisis asal: canvas-skill-library LOC-37e054f734e9 dan GrokAgent `AUDIT-2NOV-C-audio.md` (30 Okt, ulang 2 Nov); data ukur 11 Nov: `ukuran.md` · Frame: `../../guide/referensi/sheets/23-audio-orange-automation.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/23-k1-ketik-glitch.jpg`, `23-k3-kata-raksasa.jpg`, `23-k5-daftar-fitur.jpg`, `23-k6-diagram-hub.jpg` (juga k2, k4, k7, k8)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Motion/Audio.mp4` (file kartu 53 tidak ada di mesin ini)
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran; bedah geraknya sebelum meminjam teknik)
> Duplikat 23 = 53 dikonfirmasi dari isi, bukan hash file: spesifikasi sama (1280×720, 24 fps, ±23 dtk), urutan adegan sama (diketik, glitch "Not any more", blob ke logo, kata raksasa, daftar fitur, "9000+", hub, prompt di lanskap, avatar), mix sama (−17,8 LUFS, LRA 8,7, TP +2,0 dBTP).

**Inti mekanik (1 kalimat):** Spot tanpa narasi yang ceritanya dibawa bunyi: bed musik tidak pernah mati dan dibuka-tutup dengan filter per babak, tiap peristiwa layar punya satu jenis bunyi menurut bobotnya (sub untuk momen kunci, tik berpasangan untuk item daftar, riser menuju pergantian), dan hantaman terkeras disimpan untuk akhir.
**Narrative trigger:**
- Promo atau spot fitur tanpa VO yang harus terbaca dari bunyi dan gerak → T1
- Daftar fitur atau manfaat yang berganti satu per satu → T2
- Kata atau angka raksasa sebagai puncak bagian ("Automate", "9000+") → T3
- Pembalikan masalah ke solusi ("Not any more") → T4
**Jangan dipakai untuk:** talking head atau VO (bed yang tidak pernah di bawah −35 dBFS menimpa suara), prosedur linear rinci, cerita emosional panjang.
**Kata kunci gaya:** krem-oranye, tanpa VO, SFX berlapis, filter sweep, glockenspiel
**Diambil untuk:** **musik dan SFX** (nama file "Audio": bagian 7–8, dibedah paling dalam). Visual dan teks hanya pendukung. Kartu 53: audio / sound design.

## Kondisi footage asli
16:9, tanpa footage kamera dan tanpa pembicara. Semua grafis: tipografi di bidang polos (krem `#FCFAF6`, cokelat-hitam `#1E1014`, oranye `#FC4D00`), satu still lanskap render 3D, satu avatar memoji. Satu subjek per adegan, kalimat di pusat. Kamera virtual bergerak hampir terus; diam hanya di kalimat gelap dan "And many more". Sumber 720p lossy.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Empat latar di atas + krem hangat `#FDF4E7`; aksen tunggal oranye. Pembuka: pendar oranye radial dari bawah (`#FEF7F2` → `#FA7940` → `#ED5310` → `#832B05` di tepi). Kata raksasa gradien abu-putih di cokelat gelap. Flat, tanpa grain.
### Teks
Grotesk netral (mirip Inter Medium), sentence case, **dua skala tanpa perantara**: kalimat ascender 5,4–6,0 % tinggi frame (periksa 5,56 %) dan kata raksasa x-height ±62 % (periksa 61,5 %), rasio ±14–17×. Kalimat satu baris di pusat (periksa cx 50 %, cy 50 %), diketik per huruf dengan kurung `> … <`. Kata raksasa masuk lewat whip-pan.
### Ritme
11 cut = 28,2/menit, shot median 1,2 dtk. Babak: diketik (0–2,2) → glitch (2,25–2,7) → "Not any more" (–4,0) → blob ke logo (–5,7) → "Automate" (–8,3) → kalimat gelap (–9,6) → daftar fitur (–13,8) → "And many more" (–15,1) → "9000+" ke hub (–19,2) → prompt di lanskap (–21,0) → logo diketik (–22,1) → avatar (–23,4).

## Pola

### T1 · Filter-Swept Never-Dead Bed · sfx
- **Trigger:** spot tanpa VO yang tidak boleh kosong; pergantian babak ditandai warna bunyi, bukan senyap.
- **Yang terlihat (termasuk gerak):** (audio) bed glockenspiel/music box + pluck tanpa drum tegas berjalan terus; kecerahannya berubah per babak: pembuka rolloff 5,9 kHz, blob dan "Automate" 1,8, daftar 2,7, "And many more"/"9000+" 1,3, hub dan lanskap 5,1, logo 1,2 kHz. Audit 53: lantai bed turun (−23,5 → −28 dBFS) saat glitch pembalik; tekanan dibuat dengan filter, bukan senyap.
- **Kenapa bekerja:** tanpa VO, bed adalah satu-satunya benang; sapuan filter memberi tahu "babak baru" tanpa kata. RMS median −27,2 dBFS, min −35 (audit 53: 0 dead air, min −38).
- **Mekanik Remotion (titik awal):**
  - Lapisan: satu track musik → track SFX per peran (sub, tik, whoosh, riser).
  - Gerak: low-pass per babak disiapkan di file audio (ffmpeg `lowpass` per segmen), crossfade 6–12 f di batas babak; `<Audio volume={(f) => …}>` untuk lantai bed. Visual pendamping: `CURVE.drift` di babak yang bed-nya digelapkan.
  - Ruang: datar. Blur & blend: tidak berlaku.
- **SFX:** famili `riser` · musik, bukan dari `SFXIRFAN.md`. Riser pembuka bila perlu: `ES_Designed, Riser, Transition, Fast, Short, Clean 01` (referensi: reverse-cymbal swell di frame 0, +38 dB dari hening).
- **Pakai bila:** promo tanpa VO. · **Jangan pakai bila:** ada VO; true peak +2,0 dBTP referensi over, jangan ditiru.
- **Remix (anti-jiplak):**
  1. Reel produk UMKM tanpa VO → pertahankan sweep per babak, ganti bed jadi akustik hangat; batas babak mengikuti potongan foto.
  2. SaaS dengan VO pendek → bed hidup tapi duck −10…−14 dB saat VO; sweep hanya antarbab.
  3. 9:16 → dua sweep (terang → gelap → terang) cukup.
- *Pengamatan di video asli, bukan target:* −17,8 LUFS, LRA 8,7 LU; babak 0–3,75 −14 LUFS, 3,75–17,1 −19, 17,1–23,3 −18.

### T2 · Paired Tick List Cadence · sfx
- **Trigger:** daftar fitur atau manfaat yang berganti satu per satu di slot yang sama.
- **Yang terlihat (termasuk gerak):** label "Automate" tetap di kiri; item aktif dalam pil oranye di tengah, item lama naik dan memudar abu di atasnya (geser naik). Item berganti tiap ±0,7 dtk (10,04 · 10,87 · 11,58 · 12,50 · 13,16 dtk). (k5; 9,6–13,8 dtk)
- **Kenapa bekerja:** satu pasang bunyi per item membuat daftar terdengar sebagai satu mesin; hanya satu item aktif, jadi mata tahu mana yang dibunyikan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: krem → item lama (abu `#A8A6A3`, makin atas makin pudar) → pil oranye + item aktif → titik oranye berpendar.
  - Gerak: geser naik 1 slot per item `CURVE.land` ±10 f; item lama opacity turun + warna ke abu; pil ganti isi di tempat; jeda antar item tidak persis rata (`react(i, 30)` dari `curves.ts`).
  - Ruang: datar. Blur & blend: titik oranye `filter: blur(8px)`; motion blur geser belum dibedah.
- **SFX:** famili `ui` · pasangan nada tinggi + pop, selisih ±0,13–0,15 dtk, +13…+17 dB di atas bed (audit 53: tik hangat 1,5–2,3 kHz, +9…+15 dB). Katalog: `ES_User Interface, Click, Pops, Glass, UI, Pops` + `pop up.mp3`; satu pasangan yang sama sepanjang daftar. Per item (objek), bukan per kata (`../../guide/sfx/GUIDE.md`).
- **Pakai bila:** 3–6 item pendek (1–3 kata). · **Jangan pakai bila:** item panjang; daftar > 8 item (bunyi jadi lapisan klik terus-menerus).
- **Remix (anti-jiplak):**
  1. Harga paket → pertahankan pasangan bunyi per item, ganti pil jadi kartu harga yang ditukar di tempat.
  2. Bahan resep UMKM → item naik seperti kartu di papan, bunyi `documenter.mp3` pendek.
  3. Latar gelap, 9:16 → kolom item di tengah, nada lebih rendah.
- *Pengamatan di video asli, bukan target:* periksa: lebar pil aktif **44,4 % lebar frame** (kartu lama 31 %: dikoreksi); pil duduk di cy ±51 %.

### T3 · Giant-Word Sub Hit · typography
- **Trigger:** kata atau angka raksasa sebagai puncak bagian; penegasan skala ("9000+").
- **Yang terlihat (termasuk gerak):** "Automate" disapu whip-pan horizontal ±1 lebar frame dalam 2,5 dtk (4–7 % per frame, melambat), motion blur, warna oranye ke putih; kata melebihi frame. "9000+": pan cepat 7–20 % per frame, "+" menjadi hub bergaris putus-putus (81 % × 65 % frame, periksa cocok; sublabel "Supported apps" kecil rata kiri) lalu pull-out ±4 %. (k3, k6; 5,7–8,3 dan 15,1–19,2 dtk)
- **Kenapa bekerja:** satu kata mengisi frame sehingga bunyi rendahnya punya sasaran; sapuan memberi arah tanpa kata lain.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar gelap/oranye → kata raksasa lebih lebar dari frame.
  - Gerak: `translateX` +60 % → −40 % lebar frame `CURVE.land` ±75 f (sapuan penuh) atau ±24 f (pendek); warna oranye ke putih lewat `interpolateColors`. Hub: `strokeDashoffset` ke 0 `CURVE.reveal` ±20 f per cabang.
  - Ruang: datar. Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` (`../../references/smooth-motion.md`).
- **SFX:** famili `air`, `glitch`, `impact`, `stab` · hit rendah di frame kata mendarat: stab 123 Hz ("Automate", 5,69 dtk), sub 47 Hz ("9000", 15,24), 111 Hz ("+", 16,61). Padanan: `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` atau `Move.mp3`; whoosh sapuan `ES_Swooshes, Whoosh, Big, Cinematic`; garis hub tergambar `Scanning dan gerak kurva.mp3` (referensi: rattle tiap ±70 ms, 17,2–19,2 dtk). Stab orkestra tidak ada di SFXIrfan.
- **Pakai bila:** satu kata atau angka pendek (≤ 8 huruf). · **Jangan pakai bila:** kata yang harus terbaca utuh di satu frame statis.
- **Remix (anti-jiplak):**
  1. Angka hasil klien ("3×") → pertahankan sapuan + hit, ganti arah ke vertikal naik.
  2. Kata merek di latar putih → huruf gelap, bunyi whoosh udara tanpa sub bila ringan.
  3. 9:16 → kata dua baris, sapuan vertikal; satu hit per kata.
- *Pengamatan di video asli, bukan target:* audit 53: sub/impact −18,8 dBFS RMS, +17,7 dB di atas bed, 11 kejadian; 78 % impact dalam ±83 ms dari visual, median +20 ms.

### T4 · Negative Glitch Flip · camera
- **Trigger:** pembalikan masalah ke solusi ("Not any more").
- **Yang terlihat (termasuk gerak):** kalimat masalah diketik di krem; selang-seling krem/hitam tiap 2 frame ±0,45 dtk (2,25–2,7); "Not any more" diketik per kata; bar oranye menjadi blob gelap organik 49×68 % → penuh dalam ±1 dtk, menjadi logo; cut keras ke oranye. (k1, k2; 2,25–5,7 dtk)
- **Kenapa bekerja:** glitch negatif adalah "kegagalan" yang terdengar dan terlihat; blob organik memberi bentuk jawaban yang lunak setelah tepi tajam.
- **Mekanik Remotion (titik awal):**
  - Lapisan: krem → teks → overlay inversi (`mixBlendMode: "difference"`) → blob (SVG path ber-noise, `clipPath` ke logo).
  - Gerak: overlay on/off tiap 2 f selama 13 f; blob `scale` 0,7 → 1,45 `CURVE.heavy` ±30 f.
  - Ruang: datar. Blur & blend: difference; tanpa motion blur.
- **SFX:** famili `glitch`, `ui`, `mekanik` · klik toggle per flicker (2,26–2,58 dtk); blob = rentetan tombol. Padanan: `ES_User Interface, Glitch, Glitch Databend 04` atau `Cut.mp3`. Maks 5 cue dalam 2 dtk: gabungkan flicker jadi satu bunyi.
- **Pakai bila:** kalimat negasi yang diikuti jawaban. · **Jangan pakai bila:** audiens sensitif kilat; naskah tanpa titik balik.
- **Remix (anti-jiplak):**
  1. Latar gelap → flicker memutih; blob terang.
  2. Edukasi → "mitos" ditulis lalu glitch dan dicoret; jawaban dari blob warna aksen.
  3. Talking head → flicker di footage dengan teks "bukan begini", cut ke footage bersih.
- *Pengamatan di video asli, bukan target:* cut tanpa bunyi: 6,0 · 13,0 · 20,0 · 22,08 dtk.

## Audio (bila dibedah)
- earshot: 118 event (5,1/dtk); 60 % cut punya onset dalam 1 frame (median 22 ms). Hierarki RMS 300 ms (audit 53): sub −18,8 dBFS (+17,7 dB); badan whoosh −21,3 (+14,7); riser/swish −25,1 (+9,1); tik −21…−23,5 berpasangan. Riser mulai ±400 ms sebelum visual, memuncak di frame transisi.
- Puncak terkeras di akhir. (diperdebatkan: kartu 23 mencatat swell avatar −8,6 dBFS RMS pada 22,3 dtk, bukan transien; kartu 53 mencatat thud logo −11,6 dBFS RMS, puncak −1 dBFS; jendela ukur berbeda, belum dicocokkan.)
- Musik: glockenspiel/music box + pluck, pulse clarity 0,11, bpm tidak tegas (librosa 89 vs 123). True peak kita ≤ −1 dBTP.
- Referensi memberi ding per kata saat kalimat diketik (0,86–1,66 dtk); di video kita kata KT tetap senyap (`../../guide/sfx/GUIDE.md`).

## Yang harus terasa sama saat disandingkan
- Bed terdengar tidak pernah mati, tetapi warnanya berganti di tiap babak?
- Bunyi paling berat jatuh di kata atau angka raksasa dan di akhir, bukan di kalimat biasa?
- Tiap item daftar terdengar sebagai pasangan nada + pop yang sama, jeda yang sama?
- Hanya dua skala teks, satu subjek per adegan?
- Pembalikan masalah ke solusi terdengar dan terlihat sebagai satu peristiwa, bukan deretan klik?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
