# Analisis Bang Motion (v1.19.0, MIT) terhadap sistem kita

Disusun 25 Nov 2026. Semua repo dibaca saja. Satu-satunya hal yang dijalankan adalah uji determinisme di PC (`ssh pc-server`, folder sementara `/tmp/bmtest`; skripnya disalin ke `bukti/`).

**Cara baca kutipan.** `SKILL.md:58` = file di `bang-motion-src/` baris 58. Bila bukan Bang Motion, ditulis path lengkapnya. "Belum dicek" = tidak saya buka atau tidak saya uji.

**Catatan nama fase.** Enam fase yang disebut di brief (Brainstorming → Moodboard/style lock → Storyboard + animatic → Editing → Evaluasi → Done) tidak saya temukan persis di dokumen mana pun. Yang kanonik di `MOTION-CORE.md` §1 adalah tujuh tahap: Brief → Naskah → Storyboard/block out → Animate → Effects & grade → Mix → Deliver. Pemetaan di bagian 5 memakai yang tujuh itu.

## Temuan inti

1. Bang Motion kuat di **disiplin struktur adegan** (cara agar adegan tidak jadi slide) dan di **tiga gaya produksi yang belum kita punya**: akresi bukti, aksi kontinu, dan kartun panggung bersendi.
2. Kita lebih kuat di mutu teks, kamera/transisi (primitif Remotion + `vanWijk`/`dampTrack`), audio, gerbang R1–R5, dan verifikasi.
3. Engine: **tetap Remotion**. Port prinsip, bukan GSAP.
4. Ada **tiga bentrokan aturan** yang tidak boleh dipilih diam-diam (bagian 7).
5. Klaim "render identik setiap kali" (`SKILL.md:182`) **hanya benar bersyarat**. Hasil uji ada di bagian 3.

## 1–2. Mekanisme "seperti video, bukan slide" dan padanannya

Penilaian: **Lebih kuat / Setara / Lebih lemah / Belum ada** (dibanding kita).

| # | Mekanisme (bisa dicek) | Bukti | Padanan kita | Penilaian |
|---|---|---|---|---|
| M1 | **Uji PPT mekanis dari kode**: ≥3 `<section>` di-fade; tanpa benang merah; >2 tingkat teks/adegan; Ken Burns sebagai satu-satunya gerak; transisi seragam; kerangka template; zoom <1,08 ("miniatur") | `SKILL.md:58-112`; `anti-ppt.md:46-60` | `motion_lint.py` hanya mengecek easing/stagger/blur. LANTAI B10, B13, S-V11 memuat prinsipnya, tanpa pemeriksa struktur | **Belum ada** (pemeriksa) |
| M2 | **Satu rig kamera membungkus seluruh dunia** (latar+teks+objek); lensa/vignette di luar rig | `architecture.md:38-54`; `anti-ppt.md:88-90` | `ae-primitives/kamera/SpatialAnchorCamera` + `coverBox`; LANTAI B12 | Setara |
| M3 | **Ukuran shot**: wide/MCU/CU ke elemen yang bercerita, skala dihitung dari bbox elemen, klem tepi, dua tempo (pindah vs push saat hold), label di lapisan HUD | `techniques.md:190-251` | LANTAI B10-B11; `motion-mechanics.md` "Kamera mengikuti makna"; `timing.ts` `vanWijk`, `dampTrack` | Alat kita lebih kuat; **aturan "kapan" lebih lemah** |
| M4 | **Urutan kamera kolase**: close-up → meluncur → zoom out SELESAI → baru teks muncul → diam; push-through 0,9 dtk sebelum cut | `explainer.md:328-365` | Tidak ditemukan aturan "teks setelah kamera tiba" | **Belum ada** |
| M5 | **Akresi per frasa**: tiap frasa menambah 1 elemen, 3–5 elemen per adegan, bukti bukan hiasan, pengulangan untuk skala | `explainer.md:142-188` | Racikan metafora (`storyboard.md` §2a, `metafora.objek` 3–6, `urutan`); LANTAI C14, D19a | Setara untuk perancangan; **belum ada** aturan pelaksanaan per frasa |
| M6 | **Entitas yang disebut wajib tampil** (orang/perusahaan/produk punya gambar di adegannya, urutan sumber berlisensi) | `explainer.md:270-285` | LANTAI D19-D21 tidak mencakup | **Belum ada** |
| M7 | **Aksi kontinu**: satu hero hadir >60 % durasi, dunia mengalir, angka di dalam dunia, sudut pandang/instrumen berganti, perbandingan di dunia yang sama | `explainer.md:467-569` | LANTAI D19b memilih bentuk (peta rute, grafik, exploded) dari aksi: setara untuk instrumen. Hero >60 % dan "angka disapu subjek" tidak ada | Sebagian; **belum ada** untuk hero + aliran |
| M8 | **Panggung hidup**: satu panggung per adegan, ≥10 benda bergerak, kamera tidak pernah <1,08, cut/geser 96 px | `kartun-panggung.md:25-85` | Tidak ada. `direction.md:68` hanya idle maskot | **Belum ada** |
| M9 | **Rig sendi** (proxy `{tx,ty,x,y,r,sx,sy}`, transform ditulis manual) + idle terukur + kepala raster berekspresi | `kartun-panggung.md:86-145`, `:166-196` | Tidak ada rig. `direction.md:68` hanya menyebut idle | **Belum ada** |
| M10 | **Gerak latar tak pernah diam**: menu 12 bahasa gerak, menu permukaan ≥2 lapis, menu gaya render objek | `techniques.md:428-554`; `SKILL.md:248-262` | `direction.md:71`: satu baris ("gradasi lambat, grid tipis, grain 3–5 %") | **Jauh lebih lemah** |
| M11 | **Transisi dengan kedalaman**; satu jenis di semua cut = template; whip tidak boleh menyingkap tepi | `techniques.md:274-336`; `anti-ppt.md:40-42`; katalog 15 jenis "dibawa benda" `opener-konsep.md:575` (belum dibaca penuh) | `motion-mechanics.md` (7 mekanik berbasis hubungan ruang), `SceneChain` ≥4 tipe/30 dtk, `WhipPan`, `GridFlashReveal` | Kita lebih kuat (gerbang numerik) |
| M12 | **Masuk pelan, keluar cepat**; blur gerak arah pada semua teks | `anti-ppt.md:91-93`; `SKILL.md:449` | `curves.ts` `land`/`leave`; blur dari kecepatan (shutter 200°) | Kita lebih kuat |
| M13 | **Teks hidup**: sentence case, menu 7 penekanan, ukuran/arah bergantian, luminance kantong teks ≤25 %/≥80 % | `SKILL.md:291-325`; `techniques.md:129-147` | LANTAI A1-A9 (jauh lebih ketat) | Kita lebih kuat. Aturan luminance kantong melengkapi kontras 4,5:1 |
| M14 | **Determinisme**: tanpa `Date.now`/`Math.random`, `flow` = jarak bukan kecepatan, export frame demi frame | `SKILL.md:175-182`; `architecture.md:107-146` | Remotion murni per frame; `acak.ts` berbiji; `timing.ts` murni | Kita lebih kuat (dijamin engine) |
| M15 | **Verifikasi dengan melihat frame** (6-20 snapshot, jangan render penuh) | `SKILL.md:362-370`; `snap.mjs` | `render.sh still`, `frame_audit.py`, juri, R1-R5 | Kita lebih kuat |
| M16 | **Proses**: style brief 12 baris wajib, 3 kandidat konsep, sidik jari struktur, larangan salin kulit referensi | `SKILL.md:184-246`; `opener-konsep.md:12-52` | Lihat bagian 5 | Campuran |

Lima yang paling berharga dan belum ada: **M1, M8+M9, M10, M5+M6, M7**. M4 kecil tapi murah.

## 3. Engine: HTML+GSAP vs Remotion

| Bagian | Cara pindah | Isi |
|---|---|---|
| **Prinsip/aturan saja** | Tulis sebagai kartu atau butir | M1, M3 (kosakata shot), M4, M5, M6, M7 (prinsip), M8 hukum 1-3 dan 7, M10 menu, M13 luminance |
| **Port kode** (GSAP timeline → fungsi `frame`) | Tulis ulang murni terhadap `frame` | Sendi `J()` → `joint(frame)` mengembalikan string transform (yoyo `repeat:-1` → `sin`/segitiga); partikel `repeat:-1` → `(frame % periode)/periode`; kamera `look()/home()` sudah ada di `SpatialAnchorCamera`; `frameOn(el)` perlu ukuran dari data, bukan `offsetLeft` (belum teruji); tetes mengikuti path `getPointAtLength` → `@remotion/paths` (dari pengetahuan umum, belum saya cek versinya di repo); strip aliran → `x = -((seed + flow·v) % span)`; odometer, `drawDash` (clip-path) |
| **Tidak cocok** | Jangan port | WebGL/Three latar (nebula); satu-berkas `index.html`, CDN, `file://`, `serve.py`, `?debug=1`, autoplay-loop (urusan Remotion Studio); `vo-pauses.html` (kita punya `words.json`); jembatan AE Higgsfield (`ae_*`, Windows `aerender`; tidak cocok dengan pipeline Remotion kita); `clip()` video (Remotion punya native) |

**Uji determinisme `export-frames`** (PC, Chromium playwright-1255 lewat puppeteer, GSAP 3.12.5 dari CDN; skrip di `bukti/uji-determinisme-*.mjs`). Hash PNG tiap frame (satu tangkapan per t):

| Starter | Urutan seek sama, dua kali muat ulang | Akses acak (6→3→7,5→1) vs maju monoton |
|---|---|---|
| `starter-explainer-panggung` | 0/17 beda (identik) | **beda di t=6 dan t=1** |
| `starter-explainer-kartun` | 0/17 beda | **beda di t=6, 3, 1** |
| `starter-explainer` (aliran) | 0/17 beda | tidak beda |
| `starter-opener` | beda antar muat ulang (t=1,5 dan 3,2); dalam satu sesi urutan-independen | belum diuji lebih jauh |

- Untuk panggung t=6: akses acak vs monoton berbeda 2,59 % piksel (53.751 px, maks selisih kanal 529, kotak 994-1419 × 281-818). Itu perbedaan yang terlihat, bukan jitter encode.
- Arti praktis: `export-frames.mjs` memutar t naik dari 0, jadi hasilnya konsisten **untuk satu proses berurutan**. Render paralel/potongan, atau render ulang rentang yang direvisi (kita punya aturan LANTAI F27 untuk itu), akan menghasilkan frame berbeda dari render penuh.
- `starter-opener` memakai `Math.random()` saat setup (baris 223-224). Dua kali ekspor menghasilkan partikel berbeda; `SKILL.md:182` tidak berlaku untuk starter ini.
- **Penyebab belum diselidiki.** Hipotesis: GSAP menyimpan nilai awal tween `immediateRender:false` pada render pertama, sehingga hasil bergantung pada urutan kunjungan. Ini dugaan, belum dibuktikan.
- **Belum diuji:** determinisme encode ffmpeg; WebGL GPU vs swiftshader; presisi `seekClips` untuk video; ketergantungan CDN dan font Google saat ekspor (butuh internet); throughput ekspor.

**Rekomendasi: tetap Remotion.** Di Remotion determinisme dijamin konstruksi (frame murni, render paralel). Di Bang Motion ia dijaga disiplin plus daftar larangan (`architecture.md:107-115`), dan uji di atas menunjukkan disiplin itu bocor. Dua pipeline juga melipatgandakan gerbang yang harus dirawat.

## 4. Gaya explainer vs Style A/B dan 6 tema

| Gaya Bang | Terdekat di kita | Hubungan |
|---|---|---|
| 1 Kartun kolase (kertas krem, cutout, pill, tulisan tangan) | Style A (kolase + cutout), tema `tactile-paper-collage` | **Tumpang tindih kulit.** Yang memperkuat hanya koreografi kamera menyusuri kolase (M4) |
| 2 Jurnalisme visual (hitam, foto berlisensi, stabilo, tag sumber, anotasi putus) | Style B Vox, tema `documentary-archive` | **Tumpang tindih besar** (stabilo kuning, lingkaran spidol). Memperkuat: jalur sumber berlisensi (Commons/NASA), kredit di layar, M6 |
| 3 Katalog putih (cutout, grid, dokumen/stempel/blok tanggal) | Style B (stempel tanggal, polaroid), tema `tactile-paper-collage` | Tumpang tindih. Kartu "elemen bukti" (`explainer.md:431-437`) berguna |
| 4 Sketsa vintage (sepia, ukiran) | Tidak ada; paling dekat `documentary-archive` | Kecil untuk topik kita (cara kerja, uang). Prioritas rendah |
| 5 Aksi kontinu (vektor, satu hero) | Tidak ada tema padanan | **Memperkuat.** Cocok dengan temuan `riset/referensi-animasi/REFERENSI.md` ("ritme dari gerak bukan cut", kamera hampir tak pernah diam) |
| 6 Kartun panggung (flat, tokoh bersendi, ≥10 benda, nol caption) | Maskot Gini, referensi diorama R01-R09; `direction.md` family A | **Memperkuat** untuk "proses & dampak". Bentrok di nol-caption (bagian 7) |
| Opener/promo (19 konsep, UI hidup, grainy gradient) | Tema `apple-saas-ui` | Untuk promo Jadisatu, bukan Soalnya Gini. Belum dibaca penuh |

Style A (periwinkle halftone, cutout duotone, tipografi spatial-wrap) tidak punya padanan langsung di Bang. Kulitnya milik kita; yang bisa kita pinjam hanya mekanik kamera dan akresi.

## 5. Proses: Bang vs 7 tahap kita

| Bang | Kita | Hasil |
|---|---|---|
| Langkah nol: 1 pertanyaan (gaya, rasio, durasi, suara) + pagar durasi (`explainer.md:25-61`) | "Tanya sebelum meracik" 3-5 pertanyaan (`MOTION-CORE.md` §1); `F5-router.md` §2 maks 3, berisi pilihan + keyframe | Kita lebih kuat. Ambil hanya pagar durasi ("10 menit" → pecah bab ≤90 dtk) |
| Style brief 12 baris wajib sebelum kode (`SKILL.md:191-223`) | Style lock + `F5-router.md` §5 (1-2 still, 6 parameter terukur) | Kita lebih kuat (still nyata). Ambil kolom yang belum ada di `RESEP.md`: bahasa gerak latar, tanda tangan gerak, momen istimewa, palet dengan sumber hex |
| 3 kandidat konsep + sidik jari struktur, wajib berbeda dari proyek lalu (`opener-konsep.md:12-52`) | Tabel racikan 2-4 kartu per beat; "satu video = satu sesi" | Beda tujuan (bagian 7, D3) |
| Larangan salin kulit referensi (`SKILL.md:229-238`) | `MOTION-CORE.md` Langkah 1 butir 3 | Setara |
| Rundown disetujui sebelum kode | Gerbang pemilik: naskah final + storyboard + racikan | Kita lebih kuat |
| Verifikasi snapshot | `render.sh still`, `frame_audit.py`, juri, R1-R5 | Kita lebih kuat |
| Bangun tanpa suara lalu retime ke VO (`explainer.md:63-79`, `:235-246`) | VO dulu, `words.json` | Urutan terbalik. **Jangan ambil**; milik kita lebih presisi |

Uji PPT mekanis (M1) paling pas dipasang **dua kali**: di Storyboard/block out terhadap data (murah) dan di Evaluasi terhadap render.

## 6. Tulis ulang: struktur yang diusulkan (rinci di `RENCANA-ADOPSI.md`)

- **Dipertahankan** (jadi kartu/aturan): M1, M4, M5, M6, M7, M8, M9, M10 (tanpa #2 dan #3), M13 luminance.
- **Dibuang:** satu-berkas HTML, CDN, WebGL latar, `serve.py`, `vo-pauses.html`, jembatan AE, starter HTML, galeri gambar.
- **Digabung:** M3 ke `motion-mechanics.md`; M13 ke `LANTAI.md` A7 lewat SARINGAN; M10 ke `direction.md` §13.
- **Port ke Remotion:** `Joint`, `Stage`, partikel/path, `frameOn`, `struktur_cek.py`.
- **Letak:** mekanik generik di `skill-development/claude/motion-graphic/` (kartu pack baru, primitif, lint). Kulit dan maskot di Soalnya Gini. Folder `v2/` tidak disentuh; masukan untuk agen v2 ada di bagian keputusan.
- **Lisensi MIT:** pertahankan teks lisensi dan hak cipta "Bang Tutorial" di setiap tempat yang membawa kode atau teks turunan (file atribusi + komentar kepala, pola yang sudah kita pakai di `timing.ts`).

## 7. Bentrokan aturan (butuh keputusan Irfan)

1. **Nol caption** (`kartun-panggung.md:147-153`) vs LANTAI A1 ("semua ucapan tampil sebagai KT"), dan Style A/B kita berbasis tipografi.
2. **Gradien berpindah dan blob mengambang** (menu latar #2, #3: `techniques.md:439-440`) vs katalog slop S-V21 (latar radial/blob = slop).
3. **"Berbeda dari proyek sebelumnya"** (`SKILL.md:239-246`) vs seri Soalnya Gini yang menurut `REFERENSI.md` §E.1-2 menang karena set tetap dan format tetap.

## 8. Batas analisis ini

- Belum dibaca penuh: `opener-konsep.md` (817 baris; hanya Hukum kerangka dan daftar judul), `techniques.md` kecuali §1b, 3, 3b, 4b, 4c, 7c, 9b, `ae-bridge-higgsfield.md` (hanya awal), `README.md`, semua starter selain grep determinisme dan sinkronisasi.
- Pencarian padanan memakai grep pada `claude/motion-graphic/` tanpa `_vault/`, `RETRO.md`, `SUMBER.md`. "Belum ada" berarti tidak ketemu lewat grep, bukan terbukti tidak ada.
- Kualitas visual hasil Bang Motion tidak saya nilai (galeri tidak dibuka). Yang saya nilai adalah aturannya.
- Brief menyebut `riset/referensi-animasi/REFERENSI.md` sebagai bahan; arah Soalnya Gini di sana (diorama proses, "set tetap = maskot kedua") berbeda dari Style A/B di `v1/`. Saya tidak memutuskan mana yang berlaku; itu urusan agen v2 dan Irfan.
