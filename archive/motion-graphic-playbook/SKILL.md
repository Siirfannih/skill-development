---
name: motion-graphic-playbook
description: Playbook desain motion graphic untuk After Effects — tipografi, animasi teks, kamera 2D, cut zoom, transisi, ikon, dan style preset. Pakai sebelum membuat storyboard atau membangun komposisi AE.
---

# Motion Graphic Playbook (After Effects)

Playbook ini diturunkan dari 9 video referensi (Higgsfield MCP intro, Cynosure "Every Brand Starts", AURA interior, "agentic AI" glow orb, sticker-word preview, Jackie portfolio scrapbook, Notion Agents, Part&Sum "Return on Experience", dll). Tujuannya: setiap video yang kamu buat punya **variasi tipografi, kamera yang hidup, cut zoom yang tegas, dan transisi yang bercerita**, bukan sekadar teks di tengah layar yang muncul-hilang dengan blur.

**Posisi playbook ini:** ini adalah **standar kerja dan standar kualitas minimum**. Video referensi adalah inspirasinya, dan setiap video yang dibuat minimal harus sehalus dan serapi referensi itu. Standar ini tidak pernah diturunkan.

Skill `irfan-motion-director` bekerja di lapisan lain: menentukan cerita, tokoh, dan titik fokus, yaitu kreativitas yang membuat video lebih hidup. Keduanya wajib dipakai bersamaan. Jika sebuah teknik di playbook tidak cocok dengan cerita di satu beat (misalnya menambah titik fokus kedua), **ganti dengan teknik playbook lain yang cocok**. Jangan turunkan kualitasnya dan jangan lewati standarnya.

Selalu kerjakan urutannya: **Brief → Beat sheet → Spec per beat → Build di AE → Render cek frame → Revisi**. Jangan langsung build.

## 0. Standar kualitas minimum (wajib di setiap frame)

- **Tidak ada gerak linear**, kecuali drift kamera dan rotasi loop. Semua keyframe lain memakai easing dari §7.
- **Tidak ada elemen yang muncul atau hilang dalam 0 frame** tanpa alasan. Kemunculan selalu punya arah, skala, atau bentuk. Hard cut hanya untuk cut zoom atau cut on beat.
- **Fade/opacity saja tidak dihitung sebagai animasi.** Opacity boleh menemani gerak posisi, skala, atau rotasi, bukan menggantikannya.
- **Motion blur aktif** di semua gerak cepat; tidak ada gerak cepat yang terlihat patah-patah.
- **Overshoot halus** pada setiap elemen yang pop-in (ikon, kartu, tokoh, pill).
- **Satu keluarga easing per video**, supaya ritme terasa konsisten.
- **Tokoh dan maskot yang tampil >1 detik tetap hidup** lewat idle kecil (kedip, napas). Kamera dan layout boleh diam total saat penonton membaca.
- **Render dicek berdampingan dengan referensi**: ambil satu transisi dari video hasil dan satu transisi sejenis dari referensi, ekstrak 10 fps, dan bandingkan. Jika hasil terlihat lebih kaku, lebih patah, atau lebih datar, belum lolos.

## 0b. Lingkungan eksekusi

Ada dua jalur ke After Effects, pakai sesuai kebutuhan:
- **ExtendScript live (tersinkron otomatis)**: untuk iterasi cepat per beat. Perubahan langsung terlihat di AE. Kirim perubahan kecil per langkah (satu beat, satu layer, satu animasi), lalu cek hasilnya sebelum lanjut. Jangan kirim satu script raksasa untuk seluruh video.
- **File JSX**: untuk build penuh yang bisa diulang dari nol (rebuild komposisi, template, batch). Simpan satu file JSX per video dengan struktur: `setup()` → `buildBeat1()` … `buildBeatN()` → `finalize()`, supaya revisi satu beat tidak merusak beat lain.
- **Remotion** (opsional): pakai hanya jika video berbasis data/UI yang lebih mudah ditulis sebagai kode React, atau untuk render variasi massal. Aturan desain di playbook ini tetap berlaku.

Font: semua font sistem dan **Adobe Fonts** tersedia. Selain pilihan di §2.1, opsi Adobe Fonts yang cocok: Neue Haas Grotesk Display (Display), Acumin Pro (Body), Ivy Presto / Freight Big (Accent serif), Ivy Mode Italic (Accent), Roc Grotesk (Display lebar), Input Mono (Mono). Sebelum build, cek PostScript name font yang dipakai (di AE 24+ lewat `app.fonts`) dan **gagalkan build jika font tidak ditemukan**; jangan biarkan AE diam-diam memakai font default.

---

## 1. Lima hukum utama (wajib dipatuhi)

1. **Ubah state, bukan shot.** Di referensi, hard cut jarang (rata-rata 1 cut per 2,5–13 detik; 3 dari 9 video tanpa cut sama sekali), tapi selalu ada perubahan visual tiap 0,4–0,8 detik. Perubahan datang dari: kata baru masuk, objek berubah bentuk, kamera bergerak, warna latar berganti lewat shape. Gunakan hard cut hanya sebagai aksen (cut zoom), bukan sebagai penyambung default.
2. **Kontras skala ekstrem.** Dalam setiap 5 detik harus ada minimal 2 level skala teks yang sangat berbeda (contoh: body 28 px vs hero 300–500 px yang sampai terpotong frame). Teks yang selalu berukuran sama = video terasa datar.
3. **Kata kunci boleh diberi treatment berbeda, secukupnya.** Referensi sering mencampur dua treatment dalam satu baris (weight, italic, serif, highlight). Pakai ini hanya pada kata yang benar-benar membawa makna, maksimal 1 kata per frame, dan **tidak di setiap beat**. Treatment yang sama di setiap layar berubah menjadi template yang monoton.
4. **Diam untuk dibaca, lalu bergerak dengan tegas.** Hasil pengukuran: referensi diam total 9–44% dari durasinya (Notion sampai 6,7 detik saat demo UI), lalu bergerak besar dan jelas saat makna berganti. Video yang bergoyang pelan terus-menerus (v11: 42% frame berisi gerak kecil, referensi hanya 13–26%) terasa lemah, bukan hidup. Aturannya: kamera boleh diam total saat penonton membaca (0,8–3 detik); setiap gerak kamera harus punya tujuan dan cukup besar untuk terasa (push-in ≥10%, pan ≥ setengah lebar frame, atau zoom ≥2×).
5. **Blur adalah efek gerak, bukan transisi.** Blur hanya boleh muncul sebagai motion blur dari gerakan cepat (whip, slam, zoom-through) atau sebagai depth-of-field. Dilarang memakai "blur in / blur out di tempat" sebagai transisi di lebih dari 1 beat per video.

---

## 2. Sistem tipografi

### 2.1 Peran font (Font Roles)
Setiap project memilih maksimal 4 peran. Pakai font yang terpasang di mesin AE (gunakan PostScript name, contoh `Inter-Bold`).

| Peran | Fungsi | Pilihan aman (gratis) | Contoh di referensi |
|---|---|---|---|
| **Display** | Kata hero, slam, zoom-through | Inter Display Bold/Black, Plus Jakarta Sans ExtraBold, Poppins Bold | "Now your", "scaling", "BRANDS", "MOVE" |
| **Body** | Kalimat penjelas, kecil, tenang | Inter Medium, Outfit Regular, Satoshi | "Now your agent generates on Higgsfield", "is widespread" |
| **Accent** | Kata emosional / penekanan | Instrument Serif Italic, Fraunces SemiBold, Poppins Bold Italic, Caveat (script) | "Starts", "Space", "hue.", "FORM", "Software should feel fun" |
| **Mono / UI tag** | Label kecil, kategori, data, kode | JetBrains Mono, IBM Plex Mono, Space Mono | tag "CLARITY", "FLOW", "CARA KONVENSIONAL" |

Aturan pairing:
- Display + Accent harus **kontras keluarga** (sans tebal vs serif italic / script), bukan dua sans yang mirip.
- Mono hanya untuk ukuran kecil (≤ 3% tinggi frame), uppercase, tracking +100 s/d +200.
- Satu project maksimal 2 keluarga font + 1 mono.

### 2.2 Skala ukuran (relatif ke tinggi komposisi H)
| Level | Ukuran | Kegunaan |
|---|---|---|
| XS | 1,5–2,5% H | Mono tag, caption, label grafik |
| S (Body) | 3–5% H | Kalimat 4–8 kata |
| M | 7–10% H | Headline normal |
| L | 14–20% H | Kata penekanan |
| XL (Hero) | 35–80% H | Satu kata, boleh terpotong frame (bleed) |

Dalam satu layar, kombinasikan maksimal 2 level yang **lompat minimal 2 tingkat** (S + L, M + XL). Hindari M + M.

### 2.3 Teknik campur dalam satu baris (inline mixing)
Pilih satu per beat, variasikan antar beat:
1. **Weight switch** – "Every Brand **Starts**": kata kunci lebih tebal.
2. **Style swap** – "Blank *Space*": kata kedua italic, ukuran sama, baseline sama.
3. **Family swap** – "new **hue.**" / "a distinct **FORM**": kata kunci serif besar berwarna aksen, sisanya sans kecil.
4. **Highlight box** – latar kuning/lime menyapu di belakang kata ("Real-world **experiences**"). Teks di atasnya tetap warna asli atau berubah hitam.
5. **Pill / tag** – kata dibungkus kotak rounded putih, teks berubah warna merah ("Starts" setelah diklik).
6. **Marquee select** – kotak garis putus-putus muncul mengelilingi kata, lalu terisi warna ("Clarity").
7. **Inline icon** – ikon/objek kecil seukuran cap-height menyelip di antara kata ("Every room [kursi] holds a story").
8. **Sticker label** – setiap kata di kotak berwarna berbeda, sedikit miring ±3–8° ("your next big project starts here").
9. **Color word** – satu kata berganti warna aksen, sisanya netral ("More **Reach**").
10. **Outline vs fill** – kata pertama outline, kata kedua solid (dipakai hemat).

### 2.4 Layout teks
- **Satu frame, satu titik fokus.** Maksimal 1 blok teks + 1 subjek. Layout "teks di kiri + kartu UI di kanan" dilarang karena memaksa mata membaca dua hal sekaligus; tampilkan teks dan UI di beat yang berbeda, atau biarkan kamera masuk ke UI.
- Komposisi tengah boleh dominan selama hanya ada satu titik fokus. Ubah posisi teks hanya jika ada alasan cerita (memberi ruang untuk tokoh, mengikuti arah gerak).
- Ruang kosong = kemewahan. Jangan isi ruang kosong dengan dekorasi.
- Keterbacaan diselesaikan lewat komposisi (pindahkan teks ke area kosong, geser kamera), **bukan** dengan bayangan/blur gelap di belakang teks.
- Teks body maksimal 2 baris; patah baris di jeda makna, bukan di tengah frasa.

---

## 3. Library animasi teks

Timing ditulis dalam frame @30fps (kalikan 0,8 untuk 24fps, 2 untuk 60fps). "Ease out kuat" = kecepatan tinggi di awal, mendarat pelan (lihat §7).

| Kode | Nama | Tampilan | Cara build di AE | Timing |
|---|---|---|---|---|
| **T01** | Word Rise | Kata naik 20–40 px sambil opacity 0→100, per kata | Text Animator: Position Y +30, Opacity 0; Range Selector **Based On: Words**, Shape Ramp Up, Offset animasi -100→100 | 10–14 f per kata, stagger 2–3 f |
| **T02** | Blur Rise (khusus body) | Seperti T01 + blur 15→0 | T01 + properti Blur 15 | Sama; maksimal 1–2 kali per video |
| **T03** | Slam In | Kata XL masuk dari scale 160–250% ke 100% dengan motion blur, lalu tiny overshoot | Animasi Scale layer + Motion Blur on + expression overshoot | 4–6 f masuk, overshoot 6 f |
| **T04** | Scale Down Settle | Kata raksasa yang memenuhi frame mengecil jadi ukuran normal (Blank Space) | Scale 300%→100% | 8–10 f, ease out kuat |
| **T05** | Highlight Sweep | Kotak warna tumbuh dari kiri di belakang kata | Shape rectangle, anchor kiri, Scale X 0→100 | 8–10 f, mulai 4 f setelah kata muncul |
| **T06** | Marquee Select & Fill | Kotak dashed muncul, lalu fill warna, kursor klik | Rectangle stroke dashed (Trim Paths 0→100), lalu fill opacity 0→100, kursor layer | Stroke 8 f, fill 4 f, klik 2 f |
| **T07** | Cursor Activate | Kursor bergerak ke kata, klik → ripple + kata jadi pill + latar flash | Kursor (path animasi), circle ripple scale 0→300 opacity 60→0, pill rect scale 0→100 | Gerak kursor 12–18 f, ripple 10 f |
| **T08** | Slot Swap | Kata/logo di posisi tetap berganti cepat (OpenClaw → HERMES → NemoClaw) | Tiap varian layer sendiri; masuk dari Y +40 dengan mask, keluar ke Y -40 | 3–4 f transisi, hold 10–15 f; percepat tiap ganti |
| **T09** | Inline Icon Push | Kata bergeser memberi ruang, ikon pop-in dengan overshoot | Animasi Position kata sebelahnya + ikon Scale 0→110→100 + rotasi -15→0 | 8 f geser, ikon 10 f |
| **T10** | Sticker Drop | Kata berlabel jatuh dari atas, memantul, miring acak | Position Y dengan bounce expression, Rotation acak ±8° | 12–18 f, stagger 3–5 f |
| **T11** | Typewriter UI | Huruf muncul satu per satu + caret berkedip | Expression di Source Text (lihat §9) | 1–2 huruf/frame; **hanya untuk konteks UI/prompt** |
| **T12** | Big Type Typing | Cut ke close-up raksasa teks yang sedang diketik ("Create |") | Duplikat layer teks UI, scale 600–1000%, kamera geser mengikuti caret | 1–1,5 detik |
| **T13** | Tracking Spread | Huruf merenggang (tracking 0→300+) untuk makna jarak/lambat | Text Animator Tracking Amount | 20–40 f, ease in-out |
| **T14** | Letter Scatter | Huruf terlepas dan jatuh/beterbangan dengan rotasi (bukan blur) | Text Animator per Characters: Position, Rotation, Opacity + Wiggly Selector, atau pecah ke layer per huruf | 12–20 f |
| **T15** | Smear Exit | Teks ditarik horizontal + directional blur saat keluar | Scale X 100→160, Directional Blur 0→80, opacity →0 | 4–6 f |
| **T16** | Counter | Angka menghitung naik "+2500 Followers" | Slider Control + expression `Math.round()` | 15–25 f, ease out |
| **T17** | Card Stack | Kata di kartu rounded jatuh bertumpuk (Unclear Message → Inconsistent visuals → Low engagement) | Tiap kartu layer + drop shadow, masuk Y -60 rotasi ±5° | 8 f per kartu, stagger 8–10 f |
| **T18** | Text on Arc | Kalimat mengikuti busur shape (Part&Sum) | Text Path Options → Path = mask lingkaran | Ikut animasi shape |

Aturan pemakaian:
- **Masuk lebih lambat dari keluar.** Entrance 8–14 f, exit 4–8 f.
- Maksimal 2 kali teknik yang sama berurutan. Rotasi minimal 4 teknik berbeda dalam 15 detik.
- Typewriter (T11) **dilarang** untuk headline naratif. Headline pakai T01/T03/T04/T08.
- Kata yang paling penting dalam kalimat masuk **terakhir dan berbeda** (contoh: "Every Brand" masuk T01, lalu "Starts" masuk dari sisi lain dalam italic + T07).

---

## 4. Kamera 2D

### 4.1 Rig standar (wajib di setiap komposisi)
Buat null bernama `CAM` di tengah komposisi. Semua layer konten di-parent ke `CAM`, **kecuali** latar gradasi (biar terasa parallax) dan UI overlay (logo, subtitle). Animasikan `CAM` Position, Scale, Rotation. Untuk zoom ke titik tertentu: pindahkan anchor point `CAM` ke titik fokus, lalu set position `CAM` ke tengah komposisi pada keyframe yang sama.

Alternatif parallax: aktifkan 3D layer, pasang Camera 2-node, susun Z (latar Z=+800, objek Z=0, teks Z=-200). Pakai ini kalau butuh kedalaman nyata.

### 4.2 Gerakan kamera
| Kode | Gerak | Kapan dipakai | Nilai |
|---|---|---|---|
| **C01** | Drift | Hanya untuk hold panjang (>3 detik) di adegan emosional/sinematik; bukan default | Scale 100→103% selama hold, linear |
| **C02** | Push-in | Membangun fokus/tensi | Scale 100→115% dalam 1–2 detik, ease in-out |
| **C03** | Dolly-out reveal | Mengungkap konteks lebih besar (grid video Higgsfield, galeri agent Notion) | Scale 250→100% dalam 1–1,5 detik, ease out kuat |
| **C04** | Whip pan | Pindah ke sebelah dengan energi | Position ±(1,2× lebar frame) dalam 6–10 f, motion blur on, ease in-out tajam |
| **C05** | Zoom-through | Masuk "ke dalam" kata/objek hingga jadi scene berikutnya ("scaling" diperbesar sampai huruf jadi putih) | Scale 100→1500% dalam 12–18 f, ease in (percepat), motion blur |
| **C06** | Follow | Mengikuti objek yang bergerak (bola di video orb, kursor) | Parent `CAM` ke null yang mengikuti objek dengan lag 3–5 f |
| **C07** | Impact shake | Saat slam / benda jatuh | Wiggle meluruh, amplitudo 12–20 px, 8–10 f |
| **C08** | Tilt roll | Aksen playful | Rotation ±3–6° saat whip/zoom |
| **C09** | Rack focus palsu | Pindah fokus antar lapisan | Blur latar 0→20 sementara objek depan tajam |

Aturan: setiap 3–5 detik minimal ada satu gerak kamera "besar" (C02–C05). Kamera tidak boleh mengulang gerak yang sama di dua beat berurutan.

---

## 5. Cut zoom (zoom in / zoom out lewat potongan)

Cut zoom = **hard cut di mana subjeknya sama, tapi skalanya lompat 2–5×**. Ini yang membuat video terasa "editorial" dan bertenaga.

- **Cut zoom-in**: dari layar UI normal → potong ke close-up raksasa satu kata/elemen (Notion: kotak prompt kecil → "Create |" memenuhi layar). Setelah 0,8–1,5 detik, cut zoom-out kembali.
- **Cut zoom-out**: dari kata XL yang bleed → potong ke kalimat kecil dengan ruang kosong luas (Higgsfield: "Now yo" raksasa → "Now your agent generates on Higgsfield" kecil).
- **Cara build**: duplikat komposisi/pre-comp yang sama, ubah scale `CAM` 300–800%, dan pastikan **posisi elemen fokus tetap di area layar yang sama** antara sebelum dan sesudah cut (eye-trace match).
- **Bawa momentum**: shot sebelum cut sudah bergerak (C02 push-in atau teks sedang masuk); shot sesudah cut melanjutkan arah gerak itu selama 4–8 f lalu melambat.
- **Pasangkan dengan beat**: cut tepat di downbeat musik atau di suku kata yang ditekan.
- Frekuensi: 1 cut zoom per 6–10 detik. Lebih dari itu terasa gelisah.

---

## 6. Library transisi

Pilih transisi yang **membawa makna** dari scene sebelumnya ke berikutnya. Jangan pakai cross-dissolve/blur default.

| Kode | Transisi | Contoh referensi | Cara build | Durasi |
|---|---|---|---|---|
| **X01** | Shape grow wipe | Kotak biru tumbuh dari bawah jadi lengkungan berpanah (Part&Sum) | Shape layer tumbuh (Scale/Path), menutupi frame; scene baru di dalam shape (track matte) | 10–15 f |
| **X02** | Color panel split | Panel oranye/krem/hijau bergeser membuka scene baru (AURA) | 2–4 solid berwarna, slide Position bergantian, scene baru di balik panel | 8–12 f per panel, stagger 3 f |
| **X03** | Object carry | Benda dari scene A terbawa dan menjadi elemen scene B (bola orb → sistem planet; tong sampah tetap, latar berganti) | Satu layer objek tetap hidup melewati batas scene; latar dan teks diganti di belakangnya | 0 f (kontinu) |
| **X04** | Zoom-through | Kamera masuk ke dalam huruf/ikon sampai warnanya memenuhi frame lalu scene baru muncul | C05 + scene baru di-reveal dari warna isi huruf | 12–18 f |
| **X05** | Liquid wave | Gelombang putih menyapu layar (Cynosure statistik) | Shape dengan path bergelombang, animasi Position Y + wave expression | 15–20 f |
| **X06** | Match shape | Lingkaran → cincin → orbit; mata → bola; kotak UI → kartu | Morph path shape A ke B, atau dua layer berbeda di posisi/ukuran sama, potong tepat saat cocok | 8–12 f |
| **X07** | Whip pan | Scene berikutnya tepat di sebelah kanan/kiri | C04 + kedua scene di satu canvas lebar | 6–10 f |
| **X08** | Circle mask reveal | Lingkaran membesar dari titik klik/objek | Mask ellipse expansion 0→diagonal frame | 10–14 f, ease in-out |
| **X09** | Card flip / pop | Kartu UI berputar/terlempar keluar, kartu baru masuk | Rotation Y (3D) atau Scale + Rotation Z | 8–12 f |
| **X10** | Gradient wash | Latar gradasi bergeser warna, teks berganti di atasnya (Cynosure merah, Part&Sum biru→ungu→mint) | Animasi warna Gradient/4-Color Gradient + elemen tetap | 15–25 f |
| **X11** | Hard cut on beat | Ganti total (logo klien bergantian) | Potong di beat, pastikan kontras warna/skala | 0 f |

Aturan:
- Dalam 30 detik gunakan minimal 4 tipe transisi berbeda, tidak ada tipe sama berturut-turut.
- Arah gerak transisi harus konsisten dengan arah cerita (maju = ke kanan/ke dalam; kilas balik = ke kiri/ke luar).
- X03 dan X06 adalah transisi kelas tertinggi: prioritaskan saat ada objek yang bisa "dibawa".

---

## 7. Easing & timing

Pakai Keyframe Velocity (influence). Nilai default:

| Karakter | Keyframe awal (out influence) | Keyframe akhir (in influence) | Dipakai untuk |
|---|---|---|---|
| **Snappy out** (paling sering) | 10–15% | 85–95% | Teks masuk, kamera mendarat, panel slide |
| **Smooth in-out** | 50–66% | 50–66% | Drift panjang, gradasi |
| **Accelerate** | 70–85% | 5–10% | Exit, zoom-through, objek jatuh |
| **Overshoot** | Snappy out + expression inertia | | Ikon pop, slam, sticker |

Prinsip ritme:
- Satu "event" baru tiap 12–24 f (0,4–0,8 detik).
- Hold teks = 0,25 detik + 0,3 detik per kata (minimal 0,8 detik untuk 1 kata, maksimal 2,5 detik).
- Stagger antar elemen sejenis 2–4 f. Stagger yang sama persis untuk semua elemen terasa robotik: variasikan ±1 f.
- Aktifkan Motion Blur di semua layer yang bergerak cepat (shutter angle 180, phase -90).

---

## 8. Ikon, ilustrasi, dan elemen pendukung

- **Gaya ikon satu jenis per video**: flat solid di lingkaran (Cynosure), line doodle (Jackie), karakter wajah minimal (Notion), objek 3D render (AURA). Jangan campur.
- **Ukuran**: inline dengan teks = 90–110% cap height; ikon mandiri = 10–18% H; ikon hero = 30–40% H.
- **Masuk**: scale 0→110→100 + rotation -12→0 dalam 10 f. Grup ikon masuk dengan stagger 3–5 f, posisi orbit/scatter, bukan berbaris kaku.
- **Idle**: tokoh dan maskot yang tampil >1 detik punya idle halus (kedip, napas, bob Y ±3 px). Ikon biasa boleh diam total.
- **Karakter/maskot**: beri reaksi (kedip, tengok, ganti topi/aksesori lewat carousel seperti Notion).
- **Kursor**: kursor adalah "aktor". Gerak dengan kurva (bukan garis lurus), melambat sebelum klik, klik = scale 100→85→100 dalam 4 f + ripple.
- **Latar**: hindari latar polos statis. Pakai salah satu: gradasi bergerak lambat, grid tipis (Part&Sum), noise/grain 3–5%, atau ruang kosong putih yang disengaja.
- **Elemen data**: grafik tumbuh dari baseline, label pill di atas, angka counter (T16).

---

## 9. Style preset (pilih satu per video, boleh dimodifikasi)

| Preset | Latar & palet | Font | Karakter gerak | Transisi khas |
|---|---|---|---|---|
| **A. Clean Tech** (Higgsfield, Notion) | Putih/off-white #F7F7F5, hitam #111, 1 aksen (lime/biru) | Inter Display Bold + Inter Medium | Tenang, presisi, UI mock nyata, kursor | Cut zoom, dolly-out reveal, slot swap |
| **B. Bold Brand** (Cynosure) | Gradasi merah #B00010→hitam, putih | Poppins Bold + Poppins Bold Italic | Energik, cursor-click, pill, kartu jatuh | Gradient wash, liquid wave, hard cut on beat |
| **C. Editorial Color Block** (AURA) | Oranye #FF4500, krem #E8E4D9, hijau tua #0F3B2E, pink pucat | Sans rounded + serif display | Elegan, objek 3D/foto produk, teks kecil + kata serif besar | Color panel split, object carry |
| **D. Cosmic Glow** (agentic AI orb) | Hitam, glow pink-magenta-biru | Outfit/Urbanist Light kecil | Sinematik, partikel, objek terbang, kamera follow | Object carry, match shape, zoom-through |
| **E. Swiss Grid** (Part&Sum) | Charcoal #2B2B2B, garis grid ungu tipis, biru/ungu/mint, highlight kuning | Helvetica/Inter Regular kecil + display rounded untuk logo | Kalem, informatif, shape geometris besar | Shape grow wipe, text on arc, gradient wash |
| **F. Doodle Scrapbook** (Jackie) | Hitam + krem + merah bata, gradasi blur di bingkai | Script tangan (Caveat) + serif | Playful, doodle line yang tergambar (Trim Paths), kartu miring | Card pop, pan antar area, zoom ke detail |
| **G. Sticker Pop** (word preview) | Putih/hitam, label warna-warni pastel | Sans Medium + Mono tag | Ceria, kata jatuh, scatter tag | Circle reveal, card flip, sticker drop |

---

## 10. Format spec beat (wajib sebelum build)

Tulis tabel ini dulu, cek dengan checklist §11, baru build.

```
PROJECT: <judul> | PRESET: <A–G> | FPS: 30 | Resolusi: <1920x1080 / 1080x1920>
FONT ROLES: Display=<…> Body=<…> Accent=<…> Mono=<…>
PALET: <hex>

| # | Waktu | Teks (tandai **kata kunci**) | Treatment teks (§2.3) | Ukuran (§2.2) | Animasi masuk/keluar (§3) | Kamera (§4) | Ikon/visual | Transisi ke beat berikut (§6) |
|---|-------|------------------------------|------------------------|---------------|---------------------------|-------------|-------------|-------------------------------|
| 1 | 0.0–1.2 | ... | Style swap | S + XL | T01 / T15 | C01→C02 | ... | X04 |
```

---

## 11. Checklist anti-monoton (gerbang wajib: spec dan render tidak boleh dikirim sebelum semua lolos)

- [ ] Ada ≥3 treatment teks berbeda dari §2.3 dalam 15 detik.
- [ ] Ada lompatan skala ≥2 level minimal tiap 5 detik.
- [ ] Setiap frame hanya punya 1 titik fokus (1 blok teks + 1 subjek).
- [ ] Layout/template yang sama tidak dipakai >2 beat berturut-turut (kecuali disengaja untuk rutinitas).
- [ ] Tidak ada fade/opacity sebagai pengganti gerak; pergantian pilihan = gerak posisi.
- [ ] Tidak ada scrim/blur gelap di belakang teks.
- [ ] Benda yang masuk wadah ter-mask oleh wadah (tidak menembus).
- [ ] UI yang tampil adalah UI asli produk.
- [ ] Tidak ada goyang kecil terus-menerus; setiap gerak kamera punya tujuan dan cukup besar untuk terasa. Ada gerak besar (C02–C05) di setiap pergantian makna.
- [ ] Ada minimal 1 cut zoom per 6–10 detik.
- [ ] ≥4 tipe transisi per 30 detik, tidak ada tipe sama berturut-turut.
- [ ] Blur-di-tempat dipakai ≤1 kali.
- [ ] Typewriter hanya di konteks UI.
- [ ] Tokoh/maskot yang tampil >1 detik punya idle halus.
- [ ] Motion blur aktif di semua gerakan cepat.
- [ ] Kata terpenting di setiap kalimat diperlakukan berbeda dari kata lain.

**Cek render**: render draft, lalu ekstrak frame tiap 0,25 detik menjadi contact sheet (contoh: `ffmpeg -i draft.mp4 -vf "fps=4,scale=320:-1,tile=8x6" sheet.png`). Lihat sheet: jika 3 frame berturut-turut terlihat hampir identik di luar momen hold yang disengaja, tambahkan gerak.

---

## 12. Snippet After Effects

### 12.1 ExtendScript — teks dengan font role
```javascript
function addText(comp, str, font, sizePx, rgb, pos) {
  var l = comp.layers.addText(str);
  var p = l.property("Source Text"), td = p.value;
  td.font = font;            // PostScript name, mis. "Inter-Bold", "InstrumentSerif-Italic"
  td.fontSize = sizePx;
  td.fillColor = rgb;        // [r,g,b] 0–1
  td.applyFill = true;
  td.justification = ParagraphJustification.LEFT_JUSTIFY;
  p.setValue(td);
  l.property("Position").setValue(pos);
  return l;
}
```
Satu kata penting = satu layer sendiri (lebih mudah diberi treatment dan animasi berbeda). Body text boleh satu layer dengan Text Animator.

### 12.2 ExtendScript — easing
```javascript
// Snappy out: key awal out 15%, key akhir in 90%
function easeSnappy(prop, k1, k2) {
  var dims = (prop.propertyValueType == PropertyValueType.TwoD_SPATIAL ||
              prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL) ? 1
           : (prop.value instanceof Array ? prop.value.length : 1);
  function arr(inf){ var a=[]; for(var i=0;i<dims;i++) a.push(new KeyframeEase(0, inf)); return a; }
  prop.setTemporalEaseAtKey(k1, arr(33), arr(15));
  prop.setTemporalEaseAtKey(k2, arr(90), arr(33));
}
```
Catatan: properti posisi spasial memakai array 1 elemen; Scale memakai array sesuai dimensi.

### 12.3 ExtendScript — rig kamera null
```javascript
var cam = comp.layers.addNull(comp.duration);
cam.name = "CAM";
cam.property("Position").setValue([comp.width/2, comp.height/2]);
for (var i = 2; i <= comp.numLayers; i++) {
  var L = comp.layer(i);
  if (L.name.indexOf("BG") !== 0 && L.name.indexOf("UI") !== 0) L.parent = cam;
}
comp.motionBlur = true; comp.shutterAngle = 180;
```
Zoom ke titik P: set `CAM` Anchor Point = P (dalam koordinat layer null) dan Position = tengah frame pada keyframe yang sama, lalu animasikan Scale.

### 12.4 ExtendScript — Text Animator per kata (T01)
```javascript
var anims = layer.property("ADBE Text Properties").property("ADBE Text Animators");
var a = anims.addProperty("ADBE Text Animator");
var props = a.property("ADBE Text Animator Properties");
props.addProperty("ADBE Text Position 3D").setValue([0, 30, 0]);
props.addProperty("ADBE Text Opacity").setValue(0);
var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
var adv = sel.property("ADBE Text Range Advanced");
adv.property("ADBE Text Range Type2").setValue(3);   // 3 = Words
adv.property("ADBE Text Range Shape").setValue(2);   // 2 = Ramp Up
var off = sel.property("ADBE Text Percent Offset");
off.setValueAtTime(t0, -100); off.setValueAtTime(t0 + 0.6, 100);
```
Jika match name gagal di versi AE tertentu, cek dulu dengan membuat animator manual lalu baca `property(i).matchName`.

### 12.5 Expressions
**Overshoot (inertia)** — tempel di Scale/Position/Rotation yang punya keyframe:
```javascript
amp = .06; freq = 3; decay = 6;
n = 0; if (numKeys > 0) { n = nearestKey(time).index; if (key(n).time > time) n--; }
t = (n == 0) ? 0 : time - key(n).time;
if (n > 0 && t < 1) { v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
  value + v * amp * Math.sin(freq * t * 2 * Math.PI) / Math.exp(decay * t); } else value;
```
**Drift kamera (C01)** — di Scale `CAM`:
```javascript
s = value[0] * (1 + 0.02 * (time - inPoint)); [s, s];
```
**Impact shake (C07)** — di Position `CAM`, `t0` = waktu benturan:
```javascript
t0 = 3.2; d = time - t0;
d < 0 ? value : wiggle(25, 18 * Math.exp(-8 * d));
```
**Typewriter UI (T11)** — di Source Text:
```javascript
cps = 30; full = value; n = Math.floor((time - inPoint) * cps);
caret = (Math.floor(time * 2) % 2) ? "|" : " ";
full.substr(0, Math.max(0, n)) + caret;
```
**Counter (T16)** — tambahkan Slider Control "Num", Source Text:
```javascript
"+" + Math.round(effect("Num")("Slider"));
```
**Bounce jatuh (T10)** — Position, setelah keyframe mendarat:
```javascript
e = .5; g = 4000; nMax = 5;
n = 0; if (numKeys > 0) { n = nearestKey(time).index; if (key(n).time > time) n--; }
if (n > 0) { t = time - key(n).time; v = -velocityAtTime(key(n).time - .001) * e;
  vl = length(v); vu = (vl > 0) ? normalize(v) : [0,0,0];
  tCur = 0; segDur = 2 * vl / g; tNext = segDur; nb = 1;
  while (tNext < t && nb <= nMax) { vl *= e; segDur *= e; tCur = tNext; tNext += segDur; nb++; }
  if (nb <= nMax) { delta = t - tCur; value + vu * delta * (vl - g * delta / 2); } else value;
} else value;
```

---

## 13. Contoh penerapan: dari storyboard datar ke storyboard hidup

Storyboard awal (masalah): semua teks satu font tebal di tengah, transisi blur-out di tempat, kamera diam, headline diketik huruf per huruf ("belaja…", "maki…").

Versi playbook (Preset A Clean Tech + aksen ungu #7B61FF & lime #D4F25A):

| # | Waktu | Teks | Treatment | Animasi | Kamera | Transisi |
|---|---|---|---|---|---|---|
| 1 | 0.0–1.4 | (logo ChatGPT/Claude/Gemini) | — | T08 slot swap di tengah, makin cepat (hold 12→8→5 f) | C02 push-in 100→110% | X03: logo terakhir pecah jadi titik-titik yang mengorbit |
| 2 | 1.4–2.8 | "AI berubah **tiap minggu.**" | Display Bold M + Accent Serif Italic L di highlight lime | T01 lalu T05 di "tiap minggu" | C01 drift | X04 zoom-through ke titik "." |
| 3 | 2.8–4.4 | "Tapi cara kita **belajar?**" | Body S kiri-atas + "belajar?" Accent XL bleed kanan | T01 + T04 | **Cut zoom-out** ke kelas lebar, C03 dolly-out | X08 lampu kelas mati dari papan tulis |
| 4 | 4.4–5.6 | "**Masih sama.**" | Display XL putih di latar hitam | T03 slam + C07 shake | — | X03: sorot cahaya papan tulis menjadi beam |
| 5 | 5.6–7.8 | "Jaraknya makin jauh." | Display M, satu gaya font, teks dibuat 3D di ruang yang sama dengan sorot cahaya | T01 | Kamera fokus ke tokoh kecil di ujung sorot cahaya, lalu C03 dolly-out sehingga jarak tokoh–cahaya makin lebar; teks ikut perspektif dan blur hanya dari gerak zoom | X07 whip pan kanan |
| 6 | 7.8–10.0 | tag "CARA KONVENSIONAL" + "**Mencatat.**" | Mono XS + Display L | T01 + karakter menulis (idle loop) | C02 push-in ke meja | **Cut zoom-in** ke jam (ikon detik berputar) |
| 7 | 10.0–12.0 | (jam berdetak) | — | Ikon idle + kertas menumpuk T17 | C01 drift | X06 match shape: lingkaran jam → mulut tong sampah |
| 8 | 12.0–14.5 | "**Lupakan.**" | Display XL | Buku/kertas jatuh ke dalam tong dan hilang di balik bibir tong (mask), lalu T14 huruf jatuh dengan gravitasi; tutup tong menutup | C07 shake saat tutup | Hard cut on beat |

Catatan: T13 (tracking spread) jangan dipakai untuk mewakili makna "jauh". Makna spasial diwujudkan dengan kamera dan ruang.

Pola ini yang harus diulang di setiap project: **kata kunci berbeda treatment, kamera punya alasan bergerak, transisi membawa objek.**
