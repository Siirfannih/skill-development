---
name: motion-director
description: Satu-satunya pegangan untuk membuat video motion Irfan (launch Jadisatu, Tuntunly, konten siirfan) — gerbang kerja, analisis referensi per frame, After Effects + engine kode, tipografi kinetik 2.5D, kamera, transisi, SFX/musik per gerak, QA terukur. Menggantikan motion-graphic-playbook, irfan-motion-director, MOTION-SYSTEM, TYPE-STYLES, STANDAR-KUALITAS. Pakai di setiap video/motion untuk Irfan.
---

# Motion Director v3 (Irfan) — satu skill, satu sumber kebenaran

Skill ini menyatukan semua pegangan video Irfan yang sebelumnya terpecah:
- motion-graphic-playbook (+ MOTION-SYSTEM.md, TYPE-STYLES.md, RETRO.md)
- irfan-motion-director
- motion-director v2
- STANDAR-KUALITAS Tuntunly
- pipeline After Effects Tuntunly v14
- workflow kritik-diri dari kit motion-reel (tanpa template, preset, dan perintah khusus kreatornya)
- pelajaran revisi Jadisatu v1–v4 (17–18 Okt 2026)

`working-with-irfan` tetap skill terpisah karena mengatur cara kerja umum (komunikasi, siklus kerja, cara membuat skill). Untuk urusan video, file ini yang menang.

**Lokasi sumber kebenaran:** `~/Proyek/video-editor/skills/` di Mac Irfan (bukan salinan cloud). Bukti bedah referensi Jadisatu ada di `refs/<nama>/DISSECTION.md` proyek Jadisatu. Pipeline AE contoh: `~/Proyek/tuntunly-motion/ae/v14/`.

Prinsip inti:
1. **Cerita dulu, baru gaya.** Setiap shot menjawab: tokoh sedang melakukan apa, apa subjeknya, dan objek apa yang sedang dibicarakan.
2. **Standar kualitas minimum tidak pernah diturunkan.** Video referensi adalah lantai, bukan langit-langit. Kalau satu teknik tidak cocok dengan cerita, ganti dengan teknik lain yang setara, jangan dengan yang lebih kasar.
3. **Setiap potongan jatuh di ketukan** (frasa VO, beat musik, atau puncak kecepatan gerak).
4. **Teks adalah objek di ruang**, bukan tempelan datar: berotasi, berlapis kedalaman, ikut kamera, hancur bersama transisi.
5. **Satu bunyi untuk setiap gerak yang bermakna.**
6. **Lihat sendiri, ukur sendiri.** Analisis referensi dan render kita per frame dengan alat sendiri, sebelum Irfan perlu menunjukkannya.
7. **Taste: no slop.** Satu fokus per frame, ruang kosong itu mewah, tidak ada efek tanpa alasan.

---

## 0. Muat konteks (langkah wajib sebelum menulis apa pun)

1. Minta akses folder lalu baca:
   - `~/Proyek/video-editor/skills/`: file ini, `working-with-irfan`, `RETRO.md`
   - skill VO proyek, misalnya `jadisatu-narrator-vo`

   Salinan cloud bisa tertinggal versi.
2. Pastikan semua aturan RETRO berstatus "diterapkan" sudah ada di file ini.
3. Baca `PROJECT_STATE.md` / `00_MULAI-DI-SINI.md` proyek aktif.
4. Kalau Irfan memberi aset atau paket (paket SFX, kit, folder proyek lama), katalogkan dulu sebelum membuat aset baru.

## 1. Gerbang kerja (urutan dikunci)

1. **Brief**: tujuan, penonton, durasi, CTA, format master. Default **16:9 1920×1080 ditonton di HP, 30 fps native**.
2. **Script final** disetujui dan disimpan sebagai file. Teks layar hanya boleh bersumber dari `voiceover.full_text` (frasa VO atau terjemahannya). Tidak ada kalimat atau angka tambahan.
3. **Bedah referensi** (§2): metrik visual, peta audio, dan DISSECTION per referensi. Ambil tata bahasanya, jangan isinya.
4. **Storyboard 100 %** = referensi komposisi, bukan aset. Untuk setiap beat isi spec §15, termasuk kolom SFX.
5. **TYPE-TEST + TRANSITION-SHEET** sebelum build:
   - TYPE-TEST: satu still per gaya teks (§7.5), berdampingan dengan frame referensi sepadan, ditambah video 4 detik untuk gaya bergerak.
   - TRANSITION-SHEET: per potongan, frame terakhir A + frame pertama B + kode transisi + benda pembawa.
6. **Audio berbayar** (VO/SFX generatif/musik) baru dibuat setelah script final disetujui. Musik dan SFX dibuat setelah storyboard disetujui.
7. **Validasi satu adegan bergerak**: preview MP4 + daftar elemen per jenis (model 3D / sprite / plate / teks / UI). Pendekatan baru tidak boleh diterapkan ke seluruh video sebelum satu adegan lolos.
8. **Build semua adegan** dengan komponen yang sama (§3).
9. **Loop kritik** (§16.5): minimal 3 putaran sampai semua skor ≥ 8 dan gerbang QA lolos. Baru setelah itu kirim, bersama daftar penyimpangan dari storyboard dan alasannya.
10. **Revisi** = perintah konkret, misalnya "Fix this transition", "Lower that whoosh −6 dB", "Hold one beat longer".
    - Ubah kode yang ada, jangan bangun ulang dari nol.
    - Setiap revisi menghasilkan entri RETRO (§20) dan baris log (§19).

Catatan: karya yang sudah tertulis di rencana/PRD yang disetujui Irfan dianggap disetujui. Kerjakan sampai selesai dan nilai fase secara internal. Bertanya hanya untuk ambiguitas substantif.

---

## 2. Bedah referensi per frame (wajib, dikerjakan sendiri)

Kesalahan termahal di Jadisatu adalah menunggu Irfan menunjuk masalah yang bisa diukur sendiri.

**Visual**
- Bahan yang diekstrak:
  - contact sheet 2 fps (gambaran umum)
  - 8–10 fps atau setiap frame di rentang 2–3 dtk untuk tiap transisi dan animasi teks
  - scene detection: `select='gt(scene,0.3)',showinfo`
- Yang diukur dan dicatat dengan timestamp:
  - cut per menit, panjang shot (median dan p90), porsi frame diam terkunci vs bergerak, kecepatan kamera, ramp-in dan settle (frame)
  - push-in per frame, panjang jejak motion blur (p90 smear), parallax dan depth of field
  - tinggi teks (median dan p90), lama blok teks bertahan, onset teks dari frame bersih per menit, teks di layar (% frame)
  - sumbu dan sudut rotasi teks, stagger, kurva easing (lacak posisi per frame)
- Alat: `measure.py` + `compare.py` (toolkit metrik proyek Jadisatu: rentang target dari referensi, PASS/WARN/FAIL dengan timestamp).
- Mata tetap hakim: lihat sheet-nya.

**Audio (alat sendiri; Gemini hanya data tambahan)**
- Pemisahan stem: **Demucs** (htdemucs) memisahkan VO / musik / sisa. Cadangan: `librosa.decompose.hpss`.
- **librosa** sebagai inti analisis:
  - `onset_strength`/`onset_detect` (dengan backtrack) untuk SFX
  - `beat_track`/`plp` untuk grid musik
  - fitur spektral (centroid, rolloff, flatness, contrast) untuk kelas bunyi: whoosh, riser, impact, sub-drop, click, pop, tick, glitch, chime, swell
  - `librosa.segment` untuk struktur musik
- Sejajarkan event SFX dengan event visual dari metrik (cut, onset teks, whip, push, count-up). Hasilnya "peta audio":
  - % cut ber-SFX dan offset frame-nya
  - % onset teks ber-SFX
  - kepadatan SFX per menit per babak, layering, level relatif VO/musik
  - kedalaman duck, kantong senyap sebelum hit
  - jumlah dan titik ganti musik
- `compare_audio.py`: peta yang sama untuk render kita, ditambah **daftar event visual yang tidak bersuara**. Kalibrasi detektor memakai `cues.json` kita sebagai ground truth.

**Aturan meniru:** referensi diambil tata bahasanya (ritme, hierarki, cara transisi menyambung, cara bunyi mendukung gerak), tidak pernah palet, logo, karakter, atau isinya. Peran referensi Jadisatu:
- **Holy Freak** = struktur cerita dan hierarki teks
- **Baikov/Shapes** = editing, gerak teks, transisi lewat objek/skala, penempatan SFX
- **Camera_movement + Klickpin/AURA** = transisi halus, sebab-akibat UI, pindah dunia

---

## 3. Alat & pipeline produksi

**Default: After Effects 2026 lewat ExtendScript** (terbukti di Tuntunly v13–v14). Alasannya: animator teks 3D per huruf, kamera AE, motion blur asli, easing influence, dan `.aep` yang bisa Irfan buka dan setel sendiri.
- **Struktur**:
  - `engine.jsx`: helper, mengikuti kontrak `ENGINE-CONTRACT.md` v14
  - `beats-*.jsx`: satu fungsi `beatNN()` per beat, semua angka frame lokal beat
  - `master.jsx`: merangkai, pre/post-roll 12 f, menangani transisi
  - satu tabel beat di awal; mengubah durasi satu beat tidak boleh memaksa angka di beat lain berubah
- **Helper inti**:
  - layer: `tx`, `rect`, `ell`, `poly`, `curve`, `img`, `prop`
  - animasi: `rise`, `pop`, `slam`, `exit`, `key(... 'snappy'|'smooth'|'accelerate')`
  - kamera: `cam`, `camCut`, `shake`
  - transisi: `transition(type)`
  - audit SFX: `sfxAction(frame, layer, desc)`, mencatat setiap aksi yang butuh bunyi
- **Build**: buka AE, tunggu `Scripting.plugin` termuat (cek `lsof`), lalu `osascript ... DoScriptFile`.
  - **Jangan menimpa proyek AE yang sedang terbuka**: simpan dulu, lalu build di proyek baru.
  - Build wajib gagal bila font tidak ditemukan (`app.fonts` / `fontOK`).
- **Render**: `aerender` per potongan (`render-chunks.sh`), karena aerender kadang mati di render panjang tanpa menulis moov.
- Device_bash bukan Mac. Perintah AE, Homebrew, dan aerender dijalankan lewat Desktop Commander.

**Engine kode (canvas + three.js, `window.seek(t)` deterministik)** dipakai untuk dunia 3D (ruang pixel Irfan, kamera 3D, low-poly) dan plate yang sulit dibuat di AE.
- Render: Playwright → JPEG → ffmpeg; di Mac pakai Chrome for Testing + metal.
- **Hibrida yang dianjurkan**: engine merender plate dunia tanpa teks naratif, AE membangun teks, UI, kamera 2D dan transisi di atasnya.
- Semua aturan desain di file ini berlaku untuk kedua jalur.
- Kontrak render deterministik:
  - tidak ada `Math.random` (pakai seed)
  - tidak ada state antar frame
  - font dimuat eksplisit sebelum render (`document.fonts.load`); kalau tidak, teks hilang di frame pertama worker
  - cek determinisme sekali per proyek: dua render frame yang sama harus identik
- Rincian engine yang terbukti jalan:
  - WebGL headless: `--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader`, `preserveDrawingBuffer:true`
  - timing digerakkan timestamp kata VO (`words.js`)
  - motion blur: 5–6 subframe dalam shutter 180°, dirata-rata di linear light
  - **teks di belakang tokoh**: gambar teks di kanvas 2D, lalu potong dengan siluet sprite (`globalCompositeOperation='destination-out'`)
  - **teks di dunia 3D**: posisi dihitung dari titik layar yang dipilih (unproject di kamera tengah-shot) supaya pasti terlihat dan tidak saling tumpuk; skala slam diputar di pusat kata
- Perakitan/edit akhir boleh di invideo (MCP) atau ekspor ke Premiere/DaVinci. Kredit AI invideo hanya untuk generate.

**Audio:** mixer Python. Peta audio dibuat dengan librosa + Demucs (§2). Opsional: ekspor sesi REAPER `.RPP` dari `cues.json` supaya Irfan bisa menggeser SFX sendiri.

**Transfer cloud ↔ Mac:**
- Pakai nama file baru setiap kirim; nama yang sama bisa terkirim versi lama.
- Verifikasi `shasum`. Untuk FLAC: `ffmpeg -f md5`.
- Ekstrak lewat shell host, karena VM tidak bisa menghapus/menimpa.
- Kirim patch kecil bila hanya beberapa file berubah.
- Simpan proyek di `~/Documents/<Proyek>` + `PROJECT_STATE.md`.

Aset gambar: generate lewat Codex/ChatGPT di Mac.
- Sprite pose: latar hijau `#00FF00`, lalu di-key.
- Plate: "dinding saja, tanpa objek utama, tanpa teks".

---

## 4. Format & keterbacaan HP
- Master 1920×1080, 30 fps native. Jangan upconvert 24→30.
- Margin aman 5 % tiap sisi. Teks kunci tidak di 8 % bawah (zona UI IG/YouTube).
- Ukuran minimum di master:
  - kata sambung ≥ 56 px (teks informasi ≥ 80 px bila bisa)
  - kata utama 110–170 px
  - kata kunci 200–320 px, boleh bleed
- Rasio kunci : sambung ≥ 3 : 1. Satu frase 2–6 kata, bertahan 1–3 dtk.
- Uji HP: kecilkan frame ke lebar 360 px. Semua teks wajib dan CTA tetap terbaca, dan CTA adalah hal paling terbaca di video.
- Kontras ≥ 4,5 : 1.

---

## 5. Tiga family visual (pilih per babak, jangan dicampur dalam satu shot)

| Family | Dunia | Aset | Kamera | Untuk |
|---|---|---|---|---|
| **A. Kolase + karakter** | Ruang pixel/voxel hangat (Jadisatu: ruang kerja malam Irfan) | Plate latar tanpa objek utama + model 3D low-poly objek utama + sprite pixel karakter (beberapa pose, tampak belakang terpisah) | Kamera 3D sungguhan, parallax/DoF nyata | Masalah, tokoh, cerita personal |
| **B. Tipografi gelap** | Navy/hitam, gradasi lembut | Teks 2.5D berlapis kedalaman, kursor ketik | 2D CAM / kamera AE, zoom mikro, slam | Klaim, pertanyaan, titik balik |
| **C. Kanvas putih UI** | Putih/off-white | UI datar asli: avatar, kursor, kartu, konektor, tiap elemen bergerak independen | 2D CAM, reflow, reveal-out | Solusi, workflow, produk, CTA |

Aturan family A:
- Storyboard tidak pernah jadi background yang ditumpuk teks.
- Objek utama adalah elemen terpisah dengan volume dan perspektif konsisten.
- **Sprite tidak pernah diputar seperti kartu.** Sudut berubah berarti pakai aset sudut itu.
- **Subjek = yang dilihat/dikerjakan tokoh.** Laptop di depan tokoh berarti over-the-shoulder dari belakang, bukan zoom ke monitor latar.
- Render 3D di ½ resolusi lalu diperbesar *pixelated*. Teks dan UI tetap tajam 1080p.

Perpindahan family adalah momen cerita, memakai transisi bab (§10) + engsel senyap (§14.4).

---

## 6. Prinsip sutradara

1. **Tokoh dan dunia yang sudah diperkenalkan konsisten sampai akhir.**
   - Masalah dan solusi dialami tokoh yang sama di dunia yang sama.
   - Bagian solusi tidak berubah menjadi slide UI + teks.
   - Tokoh utama hadir di setiap babak; di adegan UI boleh sebagai reaksi kecil.
2. **Tunjukkan, jangan labeli.** Emosi diperlihatkan lewat aksi dan ekspresi tokoh, bukan awan kata.
3. **Satu frame, satu titik fokus.**
   - Maksimal 1 blok teks + 1 subjek.
   - **Dilarang layout "teks besar di kiri + kartu/UI di kanan"** yang memaksa mata membaca dua hal. Tampilkan di beat berbeda, atau biarkan kamera masuk ke UI.
   - Frame boleh berisi banyak objek, tapi hanya SATU yang difokuskan atau dianimasikan pada satu saat.
4. **Objek pembicaraan menentukan komposisi.** Tetapkan per beat:
   - objek yang dibicarakan
   - elemen pertama yang dilihat mata
   - gerak yang mengantar ke elemen berikutnya

   Teks memimpin hanya bila teks membawa pesan. Teks pindah posisi karena OBJEK yang dijelaskan berubah, bukan demi variasi (Holy Freak).
5. **Teks pendek, kata kerja, bertitik.** Kalimat panjang hanya untuk tagline penutup.
6. **Metafora literal dan spasial.**
   - Jarak = jarak ruang (kamera menjauh).
   - Lupa = benda masuk tong.
   - Jangan mewakili makna dengan efek huruf, misalnya tracking melebar untuk "jauh".
7. **Pengulangan komposisi untuk rutinitas**: frame sama, hanya aksi tokoh dan satu kata yang berubah.
8. **Gelap = masalah/tekanan, terang = netral/solusi.** Pergantian latar menandai pergantian emosi.
9. **Setiap efek punya alasan.** Jawab dulu "efek ini membantu penonton memahami apa?". Tidak ada jawaban berarti hapus.
10. **Kamera mengikuti subjek.** Blur hanya akibat gerak atau DoF, bukan efek tersendiri.
11. **Gerak mengikuti logika dunia nyata.**
    - Memilih = bergeser seperti layar pilih karakter.
    - Membuang = jatuh ke dalam tong, ter-mask bibir wadah.
    - **Elemen yang diperbesar keluar dari frame dengan wajar**: barisnya dibiarkan memanjang keluar tepi layar, tidak terpotong oleh kontainer/kolom (contoh: post Threads yang di-zoom).
12. **UI harus UI asli produk** (atau rekonstruksi per elemen dari screenshot asli). Proses yang dianimasikan adalah proses yang benar-benar terjadi.
13. **Highlight hanya di kata yang membawa makna**, maksimal 1 per frame, tidak otomatis di kata pertama.
14. **Variasi datang dari cerita, bukan template.** Layout sama maksimal 2 beat berturut-turut, kecuali disengaja untuk rutinitas.

---

## 7. Tipografi — diperlakukan seperti design system website

### 7.1 Peran font (maksimal 2 keluarga + 1 mono per proyek)
| Peran | Fungsi | Pilihan (Jadisatu) | Ukuran @1080 |
|---|---|---|---|
| Display/Kunci | Kata kunci, slam | Inter Black 900 (atau Neue Haas Grotesk Display 95 di Adobe Fonts) | 200–320 px |
| Headline | Kata utama | Inter ExtraBold 800 / NHG 65 | 110–170 px |
| Sambung/Body | Pengantar, penjelas | Inter Medium 500 / NHG 45 | 56–80 px |
| Aksen | Satu kata emosional | Instrument Serif Italic, 1,5–2× headline, baseline sejajar | — |
| Data | Angka, kode | Silkscreen (dunia pixel) / JetBrains Mono (UI) | 60–140 px |
| Label | Kategori, callout | JetBrains Mono / Inter SemiBold | 36–48 px |

Pairing display + aksen harus kontras keluarga (sans tebal vs serif italic). Verifikasi PostScript name sebelum build.

### 7.2 Skala & hierarki
- Level (relatif tinggi H): XS 1,5–2,5 %, S 3–5 %, M 7–10 %, L 14–20 %, XL 35–80 % (boleh bleed).
- Dalam satu layar maksimal 2 level yang lompat ≥ 2 tingkat (S+L, M+XL). M+M dilarang.
- Dalam setiap 5 detik minimal 2 level skala yang sangat berbeda.
- Kata terpenting masuk **terakhir dan berbeda**.

### 7.3 Kapital, warna, tata letak
- **Sentence case** untuk narasi.
  - KAPITAL hanya untuk kata vonis/klaim satu-dua kata (slam) dan label kategori mono (+100…+200 tracking).
  - Tidak ada paragraf kapital.
  - Satu proyek memakai satu kebiasaan tanda baca, misalnya titik di akhir frase pendek.
- Warna:
  - teks dasar putih hangat `#FAF8EC` di gelap, navy `#0F172A` di terang
  - **satu kata aksen per frase** (coral `#F97066` di gelap / biru `#2563EB` di terang)
  - warna data biru
- **Dilarang:**
  - blok warna solid / stabilo di belakang kata
  - scrim, bayangan gelap, atau blur di belakang teks
  - outline, glow, neon menetap
  - glitch pengacak huruf
  - teks bertumpuk/menabrak teks atau objek
  - pergantian font di tengah satu kata/adegan
- Keterbacaan diselesaikan dengan komposisi: pindah ke ruang kosong, geser kamera, atau redupkan latar.
- Ruang kosong adalah kemewahan, jangan diisi dekorasi.
- Whitespace merata. Teks dan visual tidak berebut.
- Body maksimal 2 baris, patah di jeda makna.
- Pola posisi teks sesuai objek pembicaraan:
  - di belakang tokoh (sampul majalah, dipotong siluet)
  - tengah melebar + latar diredupkan (puncak)
  - tengah bawah satu baris (emosi)
  - tengah atas kecil (pengantar)
  - menempel objek (diegetik)
  - ruang negatif samping subjek (hanya bila subjek tunggal dan teks satu-satunya bacaan)
- Teks tidak menutupi wajah atau subjek. Objek boleh menutup ≤ 10 % huruf, tidak menutup huruf pertama, dan tidak menutup apa pun selama jeda baca.
- **Tidak ada subtitle statis.** Teks kinetik itulah caption-nya. Kata muncul +1…+4 f setelah onset kata VO.

### 7.4 Kebijakan teks 3D
- Default: **tipografi 2.5D**. Kata, huruf, dan baris adalah bidang di ruang perspektif yang berotasi X/Y/Z, berlapis kedalaman, ikut kamera, dan tajam.
  - Di AE: animator teks 3D per karakter (`Enable Per-character 3D`) + kamera AE.
- Teks **bervolume (extruded)** hanya untuk maksimal 1–2 kata hero per video, dan hanya bila eksekusinya setara referensi:
  - bevel halus, material dan cahaya yang matang, bayangan kontak
  - divalidasi berdampingan dengan frame referensi di TYPE-TEST

  Ekstrusi gelap polos tanpa cahaya terlihat "kurang matang" dan menurunkan kualitas (revisi 18 Okt, "Jadisatu" dan "COBA").
- Teks yang "tidur di lantai lalu diangkat" bukan 3D yang dimaksud.

### 7.5 Gaya teks (TYPE-TEST)
| Kode | Gaya | Spesifikasi |
|---|---|---|
| G1 | Slam | Display, L–XL, tracking −20, satu baris; masuk T03 + C14 shake; keluar T15/T14 |
| G2 | Headline | Headline M, maksimal 2 baris; hampir selalu berpasangan dengan G3 di kata kuncinya |
| G3 | Aksen serif | Instrument Serif Italic, satu kata per kalimat, masuk terakhir |
| G4 | Color flash (acuan Baikov "What makes your company unique?") | Kata masuk dengan ISI huruf warna aksen + motion blur geraknya sendiri, tahan ±6 f, settle ke warna dasar 2–3 f; keluar kebalikannya. Tanpa stroke, glow, atau bayangan. SFX: satu pop kecil per kata |
| G5 | Berperspektif | Layer 3D menempel bidang ruang (rotasi X 55–70° sesuai bidang); blur hanya dari gerak/DoF kamera |
| G6 | Dalam adegan | Di antara latar dan objek depan (satu ruang) |
| G7 | Label/pil | Inter SemiBold XS–S, pil rounded; tidak pernah jadi fokus kedua sejajar headline |

---

## 8. Library teks kinetik (frame @30 fps; satu konsep satu kode)

Peran teks dibedakan lewat GERAK. Peran yang sama selalu bergerak dengan cara yang sama di seluruh video.
- **R1 narasi** = T01/T19
- **R2 kata kunci** = T03/T20
- **R3 klaim** = T03 + shake
- **R4 label** = T23/T10
- **R5 UI diketik** = T11
- **R6 kata pahlawan** = T04/C05, maksimal 2× per video

| Kode | Nama | Cara kerja & angka | Build AE |
|---|---|---|---|
| T01 | Word rise | Per kata naik 24–40 px dari balik mask garis dasar, 10–14 f, stagger 2–3 f (±1 f variasi), pegas tanpa overshoot. Huruf mulai ≥ 140 % tingginya di bawah mask supaya tidak mengintip | Text Animator Position Y + Opacity, Range Based On Words, Ramp Up, Offset −100→100 |
| T02 | Blur-to-focus | 12→0 px dalam 3 f, kata pertama frase reflektif; maksimal 1 per 15 dtk | + properti Blur |
| T03 | Slam | f1 2.0× + rotasi Y ±15° → f2 1.3× → f3 1.0×, motion blur, impact −1…−2 f; maksimal 1 per frase | Scale + Rotation Y, Motion Blur |
| T04 | Scale-down settle | Kata raksasa 300 %→100 % dalam 8–10 f, ease out kuat | Scale |
| T05 | Marquee select & fill | Kotak dashed (Trim Paths 8 f) → fill 4 f → klik | Shape + Trim Paths |
| T06 | Cursor activate | Kursor melengkung, melambat, klik 100→85→100 (4 f) + ripple 10 f | Path + ripple |
| T07 | Slot swap | Kata di posisi tetap berganti: lama keluar ke atas, baru dari bawah, 3–4 f, hold 10–15 f, makin cepat. Berurutan: yang lama ≥ 95 % hilang sebelum yang baru mendarat | Layer per varian + mask |
| T08 | Inline icon | Ikon 0,9–1,3× cap-height di antara kata, pop 0→110→100 + rotasi −12→0 (10 f), boleh shuffle tiap 2 f selama 8–12 f | Scale/Rotation |
| T09 | Sticker drop | Label jatuh, bounce kecil, miring ±3–8°, stagger 3–5 f | Bounce expression |
| T10 | Card stack | Kartu kata jatuh bertumpuk Y −60, rotasi ±5°, 8 f per kartu | Layer + drop shadow lembut |
| T11 | Typewriter UI | 1–2 karakter/f + caret; **hanya di UI/prompt**, tidak pernah headline naratif; satu bunyi ketik per kata atau per tombol | Source Text expression |
| T12 | Big type typing | Cut ke close-up raksasa teks yang sedang diketik, kamera ikut caret, 1–1,5 dtk | Duplikat layer, scale 600–1000 % |
| T13 | Tracking converge | 2 kata berjarak ±40 % lebar merapat, 15 f ease-out (bukan spread untuk makna "jauh") | Tracking |
| T14 | Letter scatter | Huruf lepas dan jatuh dengan rotasi dan gravitasi, 12–20 f (bukan acakan glitch) | Per-character Position/Rotation |
| T15 | Smear exit | Scale X 100→160 + directional blur, 4–6 f | Directional Blur |
| T16 | Counter | Roll ease-out expo 12–27 f, boleh lewat target +15–20 % lalu settle; bunyi tick roll + lock | Slider + `Math.round` |
| T17 | Text on arc | Kalimat mengikuti busur shape | Path Options |
| T18 | Teks di silinder | Daftar pada roda melengkung, step-rotate 15–25 f, item aktif ganti warna | 3D per-char + rotasi X |
| T19 | Word-pop ikut VO | Kata muncul +1…+4 f setelah onset kata VO; 3–4 f: scale 0.85→1 + naik ½ cap-height | Marker dari timestamp VO |
| T20 | Color flash/settle | = G4; travel ±110 px + motion blur, flash 2–4 f, settle ±8 f | Fill Color animator |
| T21 | Decode data | Digit mono/pixel biru → glitch 1–2 f → kata, ±5 f (hanya kata teknis/angka) | Source Text |
| T22 | World-locked | Teks sebagai objek di ruang kamera (push/pull/fly-through). Saat dolly-in, batasi skala teks ≤ 1,06× supaya tidak menabrak tokoh | Layer 3D + kamera |
| T23 | Diegetik | Label/callout menempel objek dengan garis tipis, mono 36–48 px | Parent ke objek |
| T24 | Anchor word | Satu kata besar tetap, latar berganti tiap 14–22 f | — |
| T25 | Chaotic | Frase bergetar 2–4 px 8 Hz, bertumpuk 2–3 lapis, maksimal 1,5 dtk (frustrasi) | Wiggle |
| T26 | Distorsi bersama transisi | Mosaik/pixelate menyatu dengan transisi blok, 5–6 f | Mosaic |
| T27 | Huruf naik dari objek | Huruf naik dari bar/objek dengan tinggi acak lalu terkunci, ±20 f | Per-char Position |
| T28 | **Flip-up X** | Per kata/huruf rotasi X 90°→0 dari garis dasar (pivot baseline), stagger 2–3 f, 8–12 f, expo-out tanpa overshoot | Per-char 3D, Rotation X, Range Based On Words/Characters |
| T29 | **Swing Y** | Rotasi Y ±60–75°→0 dari tepi kiri, 10–14 f | Rotation Y, anchor kiri |
| T30 | **Spin Z + scale** | Rotasi Z ±20–45° + scale 0.6→1, 8–10 f, untuk kata hero | Rotation Z |
| T31 | **Depth push** | Datang dari Z jauh ke bidang fokus, layer berbeda kedalaman bergerak paralaks dengan kamera | Position Z + kamera |
| T32 | **Word swap 3D** | Kata lama flip menjauh di X, kata baru flip masuk (carousel 3D) | Dua layer, Rotation X |

Aturan pemakaian:
- 4–6 teknik berbeda per 15 dtk; teknik sama maksimal 2× berturut.
- Masuk lebih lambat dari keluar (masuk 8–14 f, keluar 4–8 f).
- Teks keluar bersama transisi shot (2–6 f) atau lewat mask 4–6 f, tidak fade.
- Opacity saja tidak dihitung animasi. Opacity hanya menemani gerak, kecuali eyebrow/sub-line kecil yang boleh fade.
- Pada adegan tenang, fade 2D elegan boleh untuk kalimat serius (contoh: "Hasilnya harus terbukti.").

---

## 9. Kamera

**Hemat dan tegas.**
- Gerak kamera global ±10 % durasi (Holy Freak 9 %).
- Adegan informasional (UI, workflow, checklist) diam atau drift ≤ 1,03×.
- Establishing shot boleh bergerak.
- Diam untuk dibaca 0,8–3 dtk; setelah reveal UI ≥ 4 dtk. Lalu bergerak besar: push ≥ 10 %, pan ≥ ½ frame, atau zoom ≥ 2×.
- Gerak kecil terus-menerus terasa lemah. Gerak dalam shot pelan (3–8 dtk ease-in-out), transisi antar shot cepat (2–9 f).
- Kamera tidak mengulang gerak yang sama di dua beat berurutan.

| Kode | Gerak | Angka | Kapan |
|---|---|---|---|
| C01 | Zoom mikro di kata kunci | 1.04–1.16× dalam 13–25 f, mulai tepat di kata kunci | hampir setiap shot |
| C02 | Push-in | 100→115 % dalam 1–2 dtk, ease in-out | membangun tensi |
| C03 | Push-through layar | 2.9–3× dalam 16–26 f, ease-in kuat + motion blur, menembus ke dunia berikut | masuk UI |
| C04 | Seam di puncak kecepatan | keluar ease-in 12–16 f → ganti adegan di frame puncak → mendarat expo-out 18–22 f tanpa overshoot | sambung adegan 2D |
| C05 | Zoom-through ke objek | ±2× (atau 100→1500 %) dalam 9–18 f ease-in expo; warna latar baru = warna objek | masuk ke "dalam" huruf/ikon/kartu |
| C06 | Reveal-out | 3–4× dalam ±60 f (akselerasi 9 f, deselerasi 50 f), lalu diam ≥ 4 dtk | detail → konteks |
| C07 | Whip pan | ±1,2× lebar frame dalam 3–10 f, motion blur, rotasi settle 5–8° | energi |
| C08 | Truck lateral daftar | linear, 1 item per kata VO | daftar ≥ 4 item |
| C09 | Snap punch-in "kamu" | 1.8× dalam 4 f, kembali 4 f | menyapa penonton |
| C10 | Drop-settle | masuk vertikal meluruh 40 f + roll ≤ 6° meluruh | adegan baru jatuh ke tempat |
| C11 | Glyph anchor | kamera mundur 10× dalam 88 f, satu huruf/ikon counter-scale | logo lahir dari huruf |
| C12 | Dolly rangkuman | dolly 3D linear ±8 dtk melewati artefak | rangkuman |
| C13 | Reverse / over-the-shoulder | ke belakang bahu tokoh saat aksi ada di objek yang ia hadapi | family A |
| C14 | Impact shake | ≤ 12 px, ≤ 6–8 f, meluruh, bukan wiggle abadi | slam / benda jatuh |
| C15 | Snap reflow zoom-out | mundur seketika ×0,45 lalu ×0,6, masing-masing 2 f | komposisi bertambah |
| C16 | Rotate-settle setelah cut | −15°→0 dalam ±6 f | objek masuk |
| C17 | Rack focus pop-forward | kartu 1.0→1.25 sementara latar blur 12–20 px, 8–10 f | fokus pindah |
| C18 | Follow | parent kamera ke null objek, lag 3–5 f | bola/kursor |
| C19 | Drift | 1.00→1.03–1.06 selama hold > 3 dtk | hold sinematik |
| C21 | Blur-in landing UI | layer UI masuk blur penuh → tajam 12 f di ujung zoom-through | mendarat di UI |
| C20 | Cut zoom | potong ke subjek sama 2–5× lebih dekat di garis pandang sama, momentum 4–8 f; 1 per 6–10 dtk, di downbeat | editorial |

Aturan arah:
- Di dunia 2D konten bergeser ke kiri (maju).
- Gerak **vertikal** khusus untuk pindah dunia/family.

Motion blur wajib pada gerak cepat (AE: shutter 180, phase −90; engine: subframe 180°). Jejak blur pendek dan bersih:
- smear p90 ≈ 1–1,6 px pada lebar 640
- blur ≤ 2–3 frame
- tanpa salinan gema/ghost

Rig AE: null `CAM` di tengah. Semua konten di-parent ke `CAM`, kecuali BG dan UI overlay. Zoom ke titik P: Anchor CAM = P, Position = tengah, animasikan Scale. Untuk kedalaman nyata pakai layer 3D + Camera 2-node (latar Z +800, objek 0, teks −200).

---

## 10. Transisi (nol crossfade, selalu termotivasi, selalu bersuara)

| Kode | Transisi | Angka | Kapan |
|---|---|---|---|
| X01 | **Object carry / match shape** | benda A berubah bentuk/posisi menjadi benda B (lingkaran → layar, centang → tombol play) | kelas tertinggi, prioritaskan |
| X02 | Mask dari bentuk | bentuk di A menjadi jendela yang membuka B (AURA) | ganti dunia elegan |
| X03 | Banjir warna berlapis | elemen diklik menumpahkan warna; lapisan pendamping memimpin, utama menyusul 3–4 f | ganti bab |
| X04 | Zoom-through / selam | C05/C03 ke elemen yang menjadi latar adegan berikutnya | masuk UI/ke dalam |
| X05 | Zoom-through berlapis ke shape | 3–5 lapis bentuk brand, ≥ 3× per lapis, 3–9 f per lapis, total 20–25 f; satu riser + thud di landing | reveal brand |
| X06 | Whip | C07, cut di tengah blur | energi |
| X07 | Seam / cut on motion | C04; vertikal untuk pindah dunia (ease-in 7–12 f → cut → expo-out 13–14 f) | sambung |
| X08 | Shape wipe | shape brand menutup 100 % frame dari tepi, 5–9 f ease-out | ganti topik cepat |
| X09 | Wipe berlapis | 2 lapis bentuk (A lalu B, jeda 3 f), 9–10 f, bentuk lanjut jadi layout | masuk kanvas putih |
| X10 | Foreground wipe | objek buram dekat lensa melintas 9 f, cut disembunyikan; atau objek menutup lensa ≤ 4 f | family A |
| X11 | Mosaik blok piksel | blok ±60 px warna brand, bangun 3 f → pecah 2–3 f | pemisah bab dunia pixel |
| X12 | Flash exposure / negatif | naik 1 f turun 3–4 f; kilat putih/negatif penuh maksimal 1–2× per video, berkedip di frame keluar (tidak membalik wajah shot baru) | aksen |
| X13 | Frame-in-frame | frame menyusut jadi kartu di ruang gelap 8 f | momen meta |
| X14 | Bloom match | objek menyala memenuhi frame 8 f, objek sama di posisi layar sama | logo |
| X15 | Mask shrink ke logo | adegan menyusut ke bentuk brand 8 f | penutup |
| X16 | Card flip | Rotation Y 3D 8–12 f | ganti kartu UI |
| X17 | Hard cut on beat | hanya di batas babak, di downbeat + SFX hantaman | aksen |

Aturan:
- ≥ 4 tipe per 30 dtk, tidak ada tipe sama berturut-turut.
- Arah konsisten dengan cerita (maju = kanan/ke dalam).
- Pemicu di akhir frase VO (2–6 f setelah suku kata terakhir). Adegan baru mendarat di kata pertama frase berikut (−3…+3 f).
- Pre-roll adegan tidak boleh memotong wipe yang belum selesai.
- Blur-di-tempat sebagai transisi maksimal 1× per video.

---

## 11. Easing, pegas, timing

| Karakter | Influence out (key awal) | Influence in (key akhir) | Kapan |
|---|---|---|---|
| Snappy out (paling sering) | 10–15 % | 85–95 % | teks masuk, kamera mendarat, panel |
| Smooth in-out | 50–66 % | 50–66 % | drift, gradasi |
| Accelerate | 70–85 % | 5–10 % | exit, zoom-through, jatuh |
| Overshoot | snappy + inertia | | pop ikon/pill |

- Padanan web/engine: masuk `cubic-bezier(0.16,1,0.3,1)`, keluar `cubic-bezier(0.7,0,0.84,0)`.
- Pegas closed-form (respons, rasio redaman), fungsi murni waktu:
  - snappy 0.22/0.8 (pill, tombol)
  - default 0.4/0.86 (kartu, panel, kamera)
  - heavy 0.5/1.0, tanpa overshoot (teks besar, logo)
  - playful 0.5/0.45 (maskot saja)
- **Overshoot ≤ 1,05** pada UI. Tidak ada overshoot pada teks besar. Settle 6–10 f, tidak berhenti mendadak.
- Satu keluarga easing per video. Tidak ada linear kecuali drift/rotasi loop.
- Ritme:
  - satu event baru tiap 12–24 f; sesuatu yang baru tiap 2–4 dtk
  - hold teks = 0,25 dtk + 0,3 dtk/kata (0,8–2,5 dtk)
  - stagger 2–4 f dengan variasi ±1 f
- **Puncak visual memimpin ketukan** supaya terbaca tepat di beat. Bunyi tetap di grid; apex gerak, bukan awal adegan, yang menabrak beat.
- Swap berurutan: yang lama keluar penuh sebelum yang baru mendarat.

---

## 12. Ikon, karakter, kursor, kartu, UI
- Satu gaya ikon per video.
  - Ukuran: inline 90–110 % cap-height, mandiri 10–18 % H, hero 30–40 % H.
  - Masuk: 0→110→100 + rotasi −12→0 (10 f), grup stagger 3–5 f, bukan berbaris kaku.
- Kartu:
  - sudut 24–32 px, bayangan lembut besar (blur 40–60, opasitas 8–12 %), boleh miring ±3–6°
  - tiga lapis kedalaman: latar, tengah, depan
  - aktif = skala 115–130 % + cincin; lainnya 85–100 %
- Tokoh/maskot > 1 dtk punya idle halus (kedip, napas). Ikon biasa boleh diam.
- Kursor = aktor: kurva, melambat sebelum klik, klik 100→85→100 (4 f) + ripple.
- UI yang dibahas mengisi ≥ 60 % frame (zoom ke elemennya). Mengetik dengan bunyi ketik.
- Latar tidak polos statis: gradasi lambat, grid tipis, grain 3–5 %, atau putih yang disengaja. Tidak ada partikel generik.

---

## 13. Warna
- Jadisatu:
  - biru `#2563EB` (data/AI, aksen di terang)
  - coral `#F97066` (kata kunci di gelap)
  - navy `#0F172A` (latar gelap)
  - off-white `#FBFAF7`, putih hangat `#FAF8EC`
- **Dilarang:** gradasi merah-cokelat atau latar maroon untuk adegan gelap. Gelap selalu navy/hitam + biru.
- Satu aksen per momen. Warna adalah bab: pergantian lewat wipe berlapis, bukan cut warna polos.
- Proyek lain membawa sistemnya (dasar netral + 1 kata aksen + warna data), bukan warnanya.

---

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

---

## 15. Spec beat (wajib sebelum build)
```
PROJECT | FAMILY per babak | 1920×1080 · 30 fps | VO: <file> | Musik: <cue per babak>
FONT ROLES: Display=<…> Headline=<…> Body=<…> Aksen=<…> Data=<…>
| # | Waktu VO | Kata VO pemicu | Objek pembicaraan | Teks layar (≤6 kata, **kunci**) | Gaya (G) + teknik (T) | Ukuran | Subjek & aksi tokoh | Kamera (C) | Transisi keluar (X) + benda pembawa | SFX (waktu, kelas, terikat ke, offset, dB vs VO) |
```
Cek sebelum build:
- setiap gerak punya alasan dan bunyi (atau alasan kenapa senyap)
- setiap teks punya sumber VO
- satu fokus per frame
- tidak ada teks kiri + UI kanan

---

## 16. QA — gerbang kirim

### 16.1 Bahan dari render (bukan dari kode/ingatan)
- contact sheet 1–4 fps
- strip 12 frame berurutan di dua momen tercepat
- uji HP 360 px
- strip ±0,5 dtk di setiap batas shot
- `compare.py` (visual) dan `compare_audio.py` (audio)
- ukur loudness

### 16.2 Checklist anti-monoton & kerapian
- [ ] ≥ 3 treatment teks berbeda per 15 dtk; 4–6 teknik T per 15 dtk; lompatan skala ≥ 2 level tiap 5 dtk (rasio ≥ 3 : 1).
- [ ] Satu fokus per frame; tidak ada teks kiri + UI kanan; teks tidak menutupi wajah/subjek.
- [ ] **Tidak ada teks yang tumpang tindih dengan teks lain atau objek**; tidak ada teks terpotong tepi atau keluar area aman (kecuali bleed XL yang disengaja).
- [ ] Elemen yang diperbesar keluar frame dengan wajar, tidak terpotong kontainer.
- [ ] Tidak ada blok warna di belakang kata, scrim, outline/glow, atau glitch pengacak huruf.
- [ ] Teks 2.5D benar-benar berotasi/berlapis di momen yang tepat; ekstrusi hanya bila lolos TYPE-TEST.
- [ ] Layout sama maksimal 2 beat berturut; tidak ada fade sebagai pengganti gerak.
- [ ] Kamera global ±10 %; adegan informasional diam; gerak besar di setiap pergantian makna; 1 cut zoom per 6–10 dtk.
- [ ] ≥ 4 tipe transisi per 30 dtk, tidak berturut sama; nol crossfade; transisi di akhir frase VO.
- [ ] Motion blur di semua gerak cepat; jejak blur pendek; tanpa ghost.
- [ ] Sprite tidak pernah diputar; subjek = yang dikerjakan tokoh.
- [ ] Teks layar semua dari VO; latensi kata +1…+4 f; 1 warna aksen per frase.
- [ ] Tidak ada frame kosong/blank di tengah serah-terima; end card tidak statis > 1,5 dtk.
- [ ] SFX di ≥ 85 % event diskret (termasuk onset teks, counter, transisi); offset sesuai §14.3; kantong senyap sebelum hit; tidak ada bunyi tajam 2–6 kHz (energi > 5 kHz bus SFX < 5 %); beberapa cue musik sesuai babak; VO selalu paling jelas.
- [ ] Mix −14 LUFS / ≤ −1 dBTP.

### 16.3 Tabel kritik sutradara (per beat)
Kolom yang diisi per beat:
- tokoh ada dan beraksi
- 1 fokus
- teks ≤ 6 kata
- metafora spasial
- efek punya alasan
- kamera ke subjek
- gerak masuk akal
- UI asli
- highlight bermakna
- layout tidak berulang > 2

Satu "tidak" harus diperbaiki atau diberi alasan tertulis.

### 16.4 Rubrik R1–R7 + Kompas premium
Rubrik (skor 1–5, lulus bila semua ≥ 4):
- R1 timing di ketukan
- R2 satu fokus
- R3 konsistensi karakter
- R4 keterbacaan HP
- R5 kebenaran produk
- R6 setara referensi
- R7 audio

Kompas premium:
1. 1 frame = 1 pesan
2. ruang kosong mewah
3. teks kinetik mengikuti suara
4. transisi termotivasi + SFX
5. gerak halus berbobot
6. kedalaman dan tekstur halus
7. UI besar didemokan seperti dipakai
8. elemen kecil yang hidup
9. konsistensi palet
10. akhir yang mulus

Gagal salah satu = R6 tidak lulus.

**Gerbang R6**: subagen baru tanpa konteks pembuatan, diberi hanya frame kita + frame referensi sepadan + kompas. Ia wajib menjawab:
- (a) tiga hal paling amatir
- (b) kalau diselipkan di showreel bersama referensi, apakah langsung ketahuan beda kelas
- (c) skor per aturan

Lulus bila rata-rata ≥ 4,5 dan tidak ada aturan < 4. Dua putaran gagal di butir sama berarti ganti pendekatan, bukan memoles.

### 16.5 Loop kritik (minimal 3 putaran, sampai semua ≥ 8/10)
Kritikus segar menilai 8 kriteria dengan bukti timestamp:
- hook 2 dtk
- keterbacaan HP
- kualitas gerak
- variasi/pacing
- akurasi brand
- sinkron bunyi
- komposisi
- polish

Ia mengecek mode gagal yang umum:
- frame 0 kosong
- bunyi mendahului visual
- end card statis
- CTA kecil
- pre-roll memotong wipe
- kedalaman datar
- teks ganda saat swap
- caret tertinggal
- huruf mengintip dari mask
- teks bocor dari adegan lain
- teks melintas UI ramai saat kamera bergerak
- hold > 1 bar tanpa hal baru

Perbaiki 3 masalah terburuk, verifikasi dengan still/klip, catat di `review_log.md`, ulangi. Jangan tunjukkan video ke Irfan sebelum verdict SHIP.

### 16.6 Metrik terhadap referensi
Jalankan `compare.py`. Setiap FAIL harus diperbaiki atau diberi alasan tertulis kenapa disengaja (misalnya brief Irfan meminta hold statis). Laporan ke Irfan memuat hasil gerbang dengan jujur, termasuk yang masih menyimpang.

---

## 17. Snippet After Effects

```javascript
// Teks dengan font role (PostScript name)
function addText(comp, str, font, sizePx, rgb, pos) {
  var l = comp.layers.addText(str), p = l.property("Source Text"), td = p.value;
  td.font = font; td.fontSize = sizePx; td.fillColor = rgb; td.applyFill = true;
  td.justification = ParagraphJustification.LEFT_JUSTIFY; p.setValue(td);
  l.property("Position").setValue(pos); return l;
}
// Easing snappy: key awal out 15 %, key akhir in 90 %
function easeSnappy(prop, k1, k2) {
  var dims = (prop.propertyValueType == PropertyValueType.TwoD_SPATIAL || prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL) ? 1 : (prop.value instanceof Array ? prop.value.length : 1);
  function arr(inf){ var a=[]; for (var i=0;i<dims;i++) a.push(new KeyframeEase(0, inf)); return a; }
  prop.setTemporalEaseAtKey(k1, arr(33), arr(15)); prop.setTemporalEaseAtKey(k2, arr(90), arr(33));
}
// Rig kamera null
var cam = comp.layers.addNull(comp.duration); cam.name = "CAM";
cam.property("Position").setValue([comp.width/2, comp.height/2]);
for (var i = 2; i <= comp.numLayers; i++) { var L = comp.layer(i); if (L.name.indexOf("BG") !== 0 && L.name.indexOf("UI") !== 0) L.parent = cam; }
comp.motionBlur = true; comp.shutterAngle = 180;
// Text Animator per kata (T01); untuk T28 flip-up: layer.threeDLayer = true, aktifkan per-character 3D,
// tambah "ADBE Text Rotation X" (90) + anchor di baseline, Range Based On Words/Characters
var anims = layer.property("ADBE Text Properties").property("ADBE Text Animators");
var a = anims.addProperty("ADBE Text Animator"), props = a.property("ADBE Text Animator Properties");
props.addProperty("ADBE Text Position 3D").setValue([0, 30, 0]);
props.addProperty("ADBE Text Opacity").setValue(0);
var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
var adv = sel.property("ADBE Text Range Advanced");
adv.property("ADBE Text Range Type2").setValue(3);   // 3 = Words
adv.property("ADBE Text Range Shape").setValue(2);   // 2 = Ramp Up
var off = sel.property("ADBE Text Percent Offset"); off.setValueAtTime(t0, -100); off.setValueAtTime(t0 + 0.6, 100);
```
Jika match name gagal di versi AE tertentu, buat animator manual lalu baca `property(i).matchName`. Satu kata penting = satu layer sendiri.

Expression:
- **Overshoot/inertia**:
  ```javascript
  amp=.06;freq=3;decay=6; n=0; if(numKeys>0){n=nearestKey(time).index; if(key(n).time>time)n--;} t=(n==0)?0:time-key(n).time; if(n>0&&t<1){v=velocityAtTime(key(n).time-thisComp.frameDuration/10); value+v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);} else value;
  ```
- **Impact shake**: `t0=3.2; d=time-t0; d<0?value:wiggle(25,18*Math.exp(-8*d));`
- **Typewriter UI**:
  ```javascript
  cps=30; full=value; n=Math.floor((time-inPoint)*cps); caret=(Math.floor(time*2)%2)?"|":" "; full.substr(0,Math.max(0,n))+caret;
  ```
- **Counter**: `"Rp " + Math.round(effect("Num")("Slider")).toLocaleString("id-ID");` (atau format manual titik ribuan)

---

## 18. Jangan ditiru
- Tick digital 3,5–6 kHz, ding/sparkle, strobo invert warna-warni, smear pelangi, frame putih penuh berulang.
- Palet dan identitas referensi: merah/teal dan condensed-caps merah Holy Freak, maskot, pink-cyan Sol, merah AURA.
- Frame padat (sprite + 5 stiker + teks sekaligus), grid 4 fokus, label 2 % H, caption statis kuning.
- Template, preset, dan perintah khusus milik kreator lain. Yang diambil hanya workflow-nya.
- Klaim "dibuat dengan Claude Opus …" yang meniru layar referensi.

---

## 19. Log revisi Irfan (memori gaya) — tambah baris setiap revisi
| Tanggal | Revisi | Aturan |
|---|---|---|
| v11 Tuntunly | Blur hitam di belakang font; "makin jauh" pakai tracking; "nggak tahu mulai" pakai teks; praktik terlalu kosong; terlalu banyak fokus; UI bukan asli; highlight "File"; objek keluar tong; pilih karakter pakai fade | §7.3, §6.1–6.13 |
| 13–14 Okt | Neon stroke salah tafsir; transisi putus; tokoh hilang; PDF jadi kertas | Efek harus punya video acuan; peta transisi; karakter hadir sampai akhir |
| 17 Okt | Audio dibuat sebelum script/storyboard final | Gerbang §1 dikunci |
| 17 Okt | Animatic vertikal, gaya slide | Format default 16:9; validasi 1 adegan dulu |
| 17 Okt | Storyboard dipakai sebagai background + teks ditumpuk | Family A dari elemen terpisah §5 |
| 17 Okt | Rp47.000.000 & "belum cukup bagus" di luar VO | Teks layar hanya dari VO |
| 17 Okt | Kamera menyorot monitor latar, bukan laptop yang dikerjakan | Subjek = yang dikerjakan tokoh; C13 |
| 17 Okt | Skill terpecah → kehilangan konteks | Satu skill sebagai sumber kebenaran |
| 17 Okt | Teks world-locked membesar menabrak kepala | Anchor dari titik layar + batas skala ≤ 1,06 (T22) |
| 17 Okt | Rotasi zona teks dipakai demi variasi, perhatian terpecah | Teks pindah karena objek pembicaraan berubah (§6.4) |
| 18 Okt v2 | Koin dan kubus voxel murahan; latar merah-cokelat | Objek familiar (ikon app + badge); gelap = navy + biru (§13) |
| 18 Okt v3 | Audio sunyi, SFX "sekadar ada"; satu backsound | §14.2–14.3: peran bunyi per visual, beberapa cue musik |
| 18 Okt v3 | Teks dan transisi "masih sama" | Satu teknik per momen, tidak berulang dalam 15 dtk (§8) |
| 18 Okt v4 | "3D" disalahartikan sebagai bidang tidur lalu diangkat | §7.4 |
| 18 Okt v4 | Kamera bergerak di adegan informasional; SFX UI senapan mesin; pegas lebay | Info diam (§9); cluster (§14.3); overshoot ≤ 1,05 (§11) |
| 18 Okt v4b | Agent tidak menganalisis referensi sendiri, menunggu masukan berulang | §2 bedah per frame + §16.6 metrik sebelum kirim |
| 18 Okt v4b | Tipografi glitch/terpotong ("dilewati", "terjebak", "belum cukup"); teks dan UI kaku; blok merah di belakang kata; transisi mendadak | §7.3 larangan; §8 T28–T32; §11 easing; §10 transisi termotivasi |
| 18 Okt v4b | Kinetic typography 1 layer datar, tidak ada rotasi seperti Holy Freak; teks ekstrusi "Jadisatu"/"COBA" kurang matang | §7.4 default 2.5D; ekstrusi hanya lolos TYPE-TEST |
| 18 Okt v4b | Post Threads yang diperbesar terpotong kolom | §6.11 elemen diperbesar keluar frame dengan wajar |
| 18 Okt v4b | Whitespace terburu-buru: teks besar kiri + kartu kanan di satu frame | §6.3 dilarang |
| 18 Okt v4b | "Tapi sistem yang rapi" / "BELUM CUKUP." / chip saling tumpang | §16.2 cek tumpang tindih |
| 18 Okt v4b | Tidak ada SFX di kemunculan teks, count angka, transisi; Gemini dipercaya | §14.3 ≥ 85 % terukur; §2 alat sendiri (librosa + Demucs) |
| 18 Okt v4b | Skill tidak dimuat dari Mac; skill terpecah; AE tidak dipakai padahal ada pipeline Tuntunly | §0 muat dari Mac; satu skill ini; §3 AE default |

---

## 20. RETRO per gerbang (wajib)
Setiap kali Irfan memberi revisi di sebuah gerbang, sebelum mengerjakan revisinya, tulis entri di `~/Proyek/video-editor/skills/motion-graphic-playbook/RETRO.md` (atau `RETRO.md` di folder skill ini bila sudah dipindah):
```
### <tanggal> · <proyek> · <gerbang>
Revisi Irfan: <satu baris per poin>
Akar masalah: <aturan/acuan apa yang belum ada atau tidak jelas>
Usulan aturan: <kalimat aturan, siap ditempel ke bagian mana di skill ini>
Status: menunggu persetujuan
```
- Usulan tidak langsung dimasukkan; tunggu jawaban Irfan, lalu tempel dan ubah status. Kasus selera sesaat ditulis "tidak ada (kasus khusus)".
- Catat juga di BUILD-LOG proyek: jumlah gerbang, putaran revisi per gerbang, jam kerja per gerbang, dan % lolos putaran pertama. Angka ini dibandingkan antarproyek.
