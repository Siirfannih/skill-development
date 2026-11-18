# REPORT R4 visual (Editor, 18 Nov)

Master gambar baru: `qc/master_gambar.mp4` (2512 frame, 83,817 dtk = suara). Strip: `qc/r4/strip_<a>-<b>.jpg` (12 rentang), lembar kontak `qc/r4/sheet_0..8.jpg` (4 fps, label kuning), model Gemini `qc/r4/gemini_model.png`. Log gerbang: `qc/r4/log/`.

## File yang diubah
lego: `teks.py`, `bangun.py`, `waktu.py` (POTONG), `cek_sinkron.py` (baru), `cek_tumpuk.py`, `BubbleGeom.py` (baru, konstanta bubble).
remotion/src: `video/bersama/KT.tsx`, `BubbleSapa.tsx` (baru), `Coretan.tsx` (baru), `BubbleModelGemini.tsx` (baru, lembar model), `KarakterLayer.tsx`, `KarakterPixel.tsx`, `Fonts.tsx`, `tema.ts` (FONT.tangan), `Root.tsx`, `b5.tsx`, `b6.tsx`, `papan/karakter2d/Karakter2D.tsx`; `public/fonts/kalam-latin-700-normal.woff2` (Kalam 700, OFL, @fontsource/kalam 5.3.0).
Di luar daftar BOLEH (satu perubahan kecil, perlu H8): `video/bersama/Lingkar.tsx` (skala Clawd di lingkaran kembali ke 1,0 saat lingkaran tumbuh + emote otomatis dimatikan) dan `tema.ts`.
Turunan: teks.json, objects.json, lego/*.json, lego/cache (118 file tak terpakai dihapus, 1,0 GB), qc/master_gambar.*, qc/r4/*.

## Butir
1. Bubble sapaan (D-401/H7): T014-16 tidak lagi jadi KT (flag `sapa`). Lapisan `Bubble` B_Codex pop 8,575 (f257), B_Clawd 9,443 (f283), B_Gemini 9,810 (f294), peran `bubble-sapa` di objects.json. Pixel (badan putih, tepi tinta 4 px bertangga, ekor 4 anak tangga, bayangan 0 10 20 .25), Poppins 700 48 px, dua baris "Hi, aku / Nama!" nama berwarna merek. Posisi = ujung ekor di koordinat footage + ikut_zoom (Clawd kiri-atas ekor bawah; Codex, Gemini kanan ekor kiri, Gemini di atas Codex). Pop 4 f (0,6 -> 1,06 -> 1,0), bubble sebelumnya mengecil 0,9 saat berikut pop, semua pop-out 4 f dan berakhir di frame cut decision (11,944). Emosi: surprised/excited -> happy, take 1,2, lompat + 2 bob kecil, emote "!" (Clawd, Codex) / bintang (Gemini, putar satu putaran), capit/lengan terangkat. cek_tumpuk: jarak bubble-bubble >= 24, di dalam margin 5 %.
2. Emosi global: hook Clawd take 1,2 dan emote "!" f~26-40 terlihat (strip 0.5-2); B11 (`b5.tsx`): tiap pergantian emosi memunculkan emote 1,15-1,25x (!, bubble ..., bintang, nada, centang), tidak bertumpuk (satu emote per waktu). Tata letak/waktu/kamera B11 tidak diubah (D_RELAY rev 23).
3. Sinkron KT: post-proses diganti `sinkron()` di bangun.py. r1/r2/r3/putus keluar = potongan (tanpa keluarAt/gulir); hero (slab, busur, finally, viral) keluar = mask 5 f (clip-path) di tempat; r1 masuk per kata 3 f (naik 0,15, skala 0,92->1, opacity penuh f2, blur 3 px f0-f1). Satu blok jalur narasi per waktu, akhir = min(potongan, blok berikut) atau max(akhir kata+0,15, mulai+0,25+0,3 n). Pengecualian `gelapAt` (T003) menyeberang wipe pertama.
4. T047 "Progres di baliknya", T050 "cuma mempelajari" (peta KOREKSI di teks.py; words.json tidak diubah).
5. Pak./Ini: T058 "Pak." dan T059 "Ini" di [960,805] saling menggantikan, "habis banget" menggantikan "Ini" (f onset 43,544), "gitu" lalu "buat biayanya." sub di bawah hero (930); BALIK MODAL mask di tempat selesai 43,376.
6. H8: titik tertinggi Clawd 4,2-4,6 dtk diukur per frame dari master = y 86 (>= 54). Foot di rambut dipindah y1 190 -> 235, besar 1,6 kembali ke 1,0 saat lingkaran tumbuh, lompat 3,0 -> 1,8u.
7. Coretan (Kalam 700, panah satu tarikan 9 f + kepala 3 f, boil 12 gbr/dtk, keluar potongan): (a) IG "Comment di bawah." tulisan tangan biru #1F4FD8 70 px (lebar 621 px, tepi kanan <= 1756) + panah melengkung ke kolom, ujung ~15 px dari ikon/kolom, dibangun di dalam `DuniaIG` (ikut kamera), 80,858-81,648. (b) B11 `C_lihat`: panah putih dari teks narasi memutar di luar deret kartu ke papan ChatGPT, 58,559-59,225; "Kayak yang" dipindah ke pita bawah (950). (c) "gratis" Kalam kuning #FFD54A 100 px + garis bawah 6 f di sebelah kanan "skill" (Poppins), 82,652-83,016. objects.json: peran `coretan` / `tulisan-tangan`.
8. `cek_sinkron.py` baru; semua gerbang PASS (lihat keluaran).
9. D-409 Gemini: grid 17x17 astroid (lengan menyempit 1-1-3-3-5-7-9-13-17), tepi tinta bertangga, mata kotak gelap di biru tengah, warna merek per sel (atas merah, kiri-atas oranye, kiri kuning, kiri-bawah hijau-kuning, bawah hijau, tengah + kanan biru, ujung kanan biru muda). u 12 tetap, FGE tetap (tinggi sprite 18,4u = 221 px, puncak y~395). Lembar: `qc/r4/gemini_model.png` (depan/q/samping x neutral/happy/surprised, latar footage + latar gelap B11).

## Daftar potongan adegan (waktu.POTONG, dtk)
masuk dunia repo 1,535 · kembali ke wajah dari repo 3,968 · cut decision 11,945 · masuk app Claude 23,590 · kembali ke wajah dari app 34,390 · masuk B11 57,658 · masuk meja 3D 72,205 · keluar ke postingan IG 76,410.

## Keluaran gerbang (20 baris terakhir)

### cek_sinkron
```
T089         r1             yang sama.                    68.068  68.835  67.991    68.531  masuk meja 3D 72.205
T090         r1             Sehingga ada                  68.835  70.002  68.764    69.904  masuk meja 3D 72.205
T091         r2             loop pembelajaran             70.003  70.903  69.944    70.803  masuk meja 3D 72.205
T092         r1             yang terjadi                  70.904  71.671  70.838    71.543  masuk meja 3D 72.205
T093         r1             di sini.                      71.672  72.205  71.588    72.053  masuk meja 3D 72.205
T094         r1             Ini                           72.339  72.872  72.261    72.526  masuk meja 3D 72.205
T095         slab           100% FULL AI                  72.606  74.306  72.541    74.241  masuk meja 3D 72.205
T096         r1             Dan menurut kalian            74.508  75.441  74.445    75.345  keluar ke postingan IG 76.410
T097         r1             videonya kayak gimana?        75.442  76.409  75.370    76.210  keluar ke postingan IG 76.410
T098         r1             Udah kerasa video             76.543  78.276  76.465    78.148  keluar ke postingan IG 76.410
T099         r1             editing                       78.278  78.645  78.213    78.563  keluar ke postingan IG 76.410
T100         r3             profesional                   78.645  79.279  78.593    79.213  keluar ke postingan IG 76.410
T101         r1             gak? Atau                     79.279  80.113  79.213    79.553  keluar ke postingan IG 76.410
IG_tulisan   tulisan-tangan Comment di bawah.             80.858  81.658  80.791    81.376  keluar ke postingan IG 76.410
IG_panah     coretan        panah                         81.153  81.658  81.086    81.116  keluar ke postingan IG 76.410
T103         r1             Nanti aku kasih               81.648  82.415  81.591    82.331  keluar ke postingan IG 76.410
T104         r2             skill                         82.416  83.016  82.341    82.501  keluar ke postingan IG 76.410
T105         coretan        tulisan                       82.649  83.016  82.586    82.906  keluar ke postingan IG 76.410
T106         r1             bagi yang beruntung.          83.016  83.850  82.956    83.666  keluar ke postingan IG 76.410
106 lapisan diperiksa · jalur narasi 88 blok · PASS
```

### cek_tumpuk
```
KT 89 · slop 15 · karakter 4 · bubble 3 · coretan 2 · irisan: 0
```

### kt_check
```
106 blok · gerak: T19×81, T03×11, T04×10, T25×4
PASS
```

### motion_lint
```
PASS
```

### tsc
```
tsc exit 0
```

### revisi_cek
```
  · T088: isi
  · T089: isi
  · T090: isi
  · T091: isi
  · T092: isi
  · T093: isi
  · T094: isi
  · T095: isi
  · T096: isi
  · T097: isi
  · T098: isi
  · T099: isi
  · T100: isi
  · T101: isi
  · T102: hilang
  · T103: isi
  · T104: isi, pos (78,693)→(232,693)
  · T105: isi, t 83.01626666666667→82.64923333333333, pos (129,736)→(554,712)
  · T106: baru
LULUS: semua perubahan tercakup ledger.
```

## Catatan / belum selesai
- Cache cache bundle: stamp bundle (`qc/.bundle_stamp`) sengaja tidak disentuh supaya ±120 lapisan tak berubah memakai cache; bundle di-build manual (`npx remotion bundle src/video/index.ts`). Lapisan yang kodenya berubah dipaksa render ulang lewat bump `v`/`rev`.
- `kt_check.py` harus dijalankan dengan `--w 1920 --h 1080` (default skrip portrait).
- `cek_tumpuk` memaksa pergeseran narasi 21,0-22,3 dtk dari x 960 ke 1010 (sebelumnya irisan dengan slop S04); satu-satunya perubahan posisi di luar permintaan.
- Hero keluar mask 5 f sekarang bertahan penuh sampai 5 f terakhir (sebelumnya mulai memudar ~0,3-0,45 dtk lebih awal); akhir tampil tetap sama (kecuali dipotong potongan: SELESAI berakhir 3,97, FINALLY 1,53).
- Sela kosong maksimal 1 frame bisa muncul antar blok narasi karena kuantisasi 30 -> 29,97 fps (tidak ada tumpang tindih).
- Tidak dikerjakan: penilaian kreatif (Sutradara), render final/audio.

## Ronde 2 (QC Sutradara: Q1-Q3)
- **Q1 bubble lebih besar:** skala 1,25x (huruf 60 px, tepi 5 px, ekor 4 anak tangga 15 px, bayangan ikut). Tepi ekor dipindah supaya tepi kanan <= 1824 pada zoom 1,12: Codex tip (1345,670), Gemini naik ke (1325,455) (jarak bubble >= 24 px), Clawd tip (615,622) (tepi kanan <= 680, tidak menyentuh wajah). `BubbleSapa.tsx` prop `k`; cek_tumpuk (bubble-bubble >= 24, margin 5 %, bubble-KT, bubble-karakter) PASS. Catatan: skala 1,45x tidak muat di margin kanan 1824 pada zoom 1,12 (bubble Codex 399 px), jadi dipakai 1,25x yang masih di rentang huruf 60-64 px.
- **Q2 IG:** tulisan tangan + panah tampil 80,858-82,008 (>= mulai + 0,25 + 0,3x3); ujung pena langsung tampak di frame onset (+2 f) karena mask mulai 10 %. Coretan di bawah panel dikecualikan dari jalur narasi (cek_sinkron: IG_tulisan bukan anggota jalur; aturan baru (viii) minimal tampil 1,15 dtk).
- **Q3 wipe:** `waktu.WIPE` (jendela wipe: repo 1,535-2,135 / 3,968-4,435, app 23,590-24,190 / 34,390-34,857, B11 57,658-57,925, IG 76,410-77,010) dan `TUNDA_MAKS` 0,25. Blok narasi yang onsetnya jatuh di wipe ditunda ke min(akhir wipe, onset+0,25) dan waktu kata (wt) digeser. Terdampak: T006 "Ya," 4,304 -> 4,438; T039 "Dan ini bukan" 23,757 -> 23,991; T048 "Gimana caranya biar" 34,535 -> 34,768; T078 "Kayak yang" 57,691 -> 57,925; T098 "Udah kerasa video" 76,543 -> 76,777. cek_sinkron: aturan (vii) (ditunda) dan (ii) diberi +0,25 bila onset di wipe. Dicek di strip 3.9-4.7, 23.3-24.3 (baru), 33-35.2: tidak ada teks pucat di atas jendela putih.
- Master dibuat ulang: 2512 frame, 83,817 dtk. Strip diperbarui: semua (8.3-12.3, 33-35.2, 3.9-4.7, 23.3-24.3 baru, 80.5-83.8 + lainnya) dan sheet_0..8. Semua gerbang dijalankan ulang (log di `qc/r4/log/`): cek_sinkron PASS, cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0, revisi_cek LULUS.

## Ronde 3 (audit frame: P1, P3, P4)
- **P1 mask keluar hero:** penyebab = mask lama memakai kurva `reveal` 5 f dan frame terakhir lapisan hanya mencapai ~80 % (move() belum 1), jadi tersisa irisan garis horizontal lalu lapisan habis. Sekarang `sapu()` di KT.tsx: linear, frame ke-i = (i+1)/6, frame terakhir lapisan tersapu penuh, `MASK_F = 6`, keluarAt + 6 f = durasi (dicek `cek_sinkron`). Arah satu sisi: kiri -> kanan (clip-path inset dari kiri, tepi vertikal lurus; sapuan dari atas meninggalkan serpihan garis, jadi diganti). Berlaku FINALLY, SELESAI, DECISION, VIRAL, AI SLOP, WORKFLOW-NYA, BALIK MODAL, LINTAS AGENT, 100% FULL AI, busur. Sapuan yang menabrak potongan selesai tepat di potongan (lapisan berakhir di situ). Hero v15 dirender ulang. Strip frame-per-frame: `qc/r4/keluar_<nama>.jpg` (12 frame terakhir + 2 sesudah, 480 px, label = nomor frame master). WORKFLOW-NYA f1141-1154: sapuan terlihat 5 frame berurutan (f1148-1152), tanpa irisan garis.
- **P3 B11 -> meja 3D:** penyebab = 4 frame wajah (f2162-2165) adalah frame `post` D_RELAY; slot b10a baru tampil di f2166 (compose menampilkan lapisan slot 2 frame master setelah `t`-nya, diukur: t = f2164 tampil di f2166). Sekarang `waktu.SLOT_T` = postT0 (72,0721) dan `SLOT_VIS` = SLOT_T + 2 f = 72,1388 (f2162). Selisih: slot majuk dari t 72,2055 ke 72,0721 (-0,1334 dtk; tampil f2166 -> f2162, 4 frame lebih awal). Efek samping: onset Blender (frame 104 slot) jatuh di f2266, 1 frame sebelum onset suara 75,6448 (f2267); sebelumnya f2270 (3 frame terlambat). POTONG "masuk meja 3D" = 72,139; "di sini." berakhir 72,138. Cek: strip f2150-2175: f2161 = dunia B11, f2162 = meja 3D, tanpa frame wajah. (timing.json b10a tidak lagi dipakai untuk t slot.)
- **P4:** "gak? Atau" (T101) berakhir 79,613 = onset "masih" + 2 f (komentar IG muncul). Aturan baru di `bangun.sinkron` (komentar IG k1/k2 dan lapisan Komentar dihitung sebagai "pembawa kalimat berikutnya") dan `cek_sinkron` aturan (ix). Strip f2385-2400 dilihat.
- Gerbang ulang (log `qc/r4/log/`): cek_sinkron PASS, cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0, revisi_cek LULUS. Master 2512 frame, 83,817 dtk. Strip tambahan: `qc/r4/strip_f2150-2175.jpg`, `strip_f2385-2400.jpg`.

## Ronde 4 (A1, A2, A3)
- **A1 tunda wipe:** `waktu.WIPE` sekarang hanya lingkaran wajah menyusut/tumbuh di atas latar terang (repo, app Claude), panjang efektif 70 % durasi gerak (diukur di master). Dicek per frame di master pada onset: T006 (f128-133: lingkaran sudah bersih di f129) dikembalikan ke 4,304; T078 (f1728-1733, push di footage gelap, bukan wipe) dikembalikan ke 57,691; T098 (f2291 meja 3D -> wajah = potongan biasa) dikembalikan ke 76,543 ("Udah" tampil f2295 = onset + 2 f). T039 (f711-716: lingkaran menyusut di atas app terang) tetap ditunda ke 23,991; T048 (f1032-1037: lingkaran tumbuh di atas app) tetap ditunda ke 34,701 (sebelumnya 34,768).
- **A2 celah f357:** penyebab = frame terakhir sebuah lapisan overlay tidak pernah tampil di master (eof overlay), jadi lapisan n frame hanya menempati n-1 frame master; ditambah pembulatan 30 -> 29,97. Diukur: T018 mulai f351, n=7 -> tampil f351-f356, f357 kosong. Perbaikan: `_frames()` = round(akhir*29,97) - round(mulai*29,97) + 1 (dibatasi akhir video), bubble pakai rumus sama + pop-out 4 frame terlihat (CURVE.leave) dan hero `sapu` dihitung (i+1)/5 sehingga frame terlihat terakhir tersapu penuh. Hasil: f357 = bubble (mengecil) + "sebuah" + tokoh masih tampil, f358 = cut decision (strip f350-362). Karakter K_* tidak berakhir di sekitar 11,9 (tokoh tetap sampai melompat pergi).
- **A3 B11:** `RelayDunia` (b5.tsx) dorongan keluar diganti: 0,5 dtk kurva drift berakhir di frame terakhir dunia (sebelumnya heavy 0,3 dtk yang menimbulkan percepatan mendadak, selisih antar-frame 5,2 -> 9,4 -> 12,0 di master). Sekarang maks selisih antar-frame 4,7 (strip f2150-2165: kontinu sampai f2161, f2162 meja 3D). Satu-satunya perubahan di kamera B11 (diminta A3); D_RELAY rev 24.
- **Cek baru di `cek_sinkron.py`:** (a) lapisan berurutan di jalur narasi tidak boleh punya celah/tumpang tindih >= 1 frame master tanpa potongan di antaranya, dan bubble + T018 harus berakhir persis di frame cut decision; (b) lompatan antar-frame dunia opaque D_RELAY di 24 frame terakhir (> 8, atau > 4 dan > 1,8x frame sebelumnya) = GAGAL. Juga `cek_tumpuk` memakai durasi tampil (n-1).
- Strip per frame: `qc/r4/strip_f350-362.jpg`, `strip_f2150-2165.jpg`, `strip_f2290-2310.jpg`, onset blok tunda `strip_f711-720.jpg` (T039) dan `strip_f1032-1042.jpg` (T048). Master 2512 frame, 83,817 dtk. Gerbang (log `qc/r4/log/`): lihat bawah.

## Ronde 4b (lapisan tidak boleh tampil di frame cut; verifikasi dari master)
- **Penyebab sebenarnya** (diukur, bukan perkiraan): ronde 4 mengira lapisan n frame tampil n-1 frame. Itu tidak tepat. Dua klip dasar 1-frame (zoom ramp; `dasar[17]` f625 dan `dasar[28]` f1292) membuat pts frame dasar berulang, sehingga pts dasar tertinggal 1 frame setelah f626 dan 2 frame setelah f1293 (`qc/r4/log/base_pts.json`, diukur lewat compose.py yang sama + showinfo, skrip `lego/base_pts.py`). Overlay ditempatkan menurut pts, jadi semua lapisan (teks, bubble, dunia, slot meja 3D) tampil 0 / 1 / 2 frame lebih lambat dari indeks master rencana, dan panjang tampil beda 1 frame secara tak seragam. Itu juga sebab "di sini." masih tampil di f2162 dan slot meja 3D tampil +2 frame.
- **Perbaikan:** (1) `bangun.idx_t()` menempatkan SEMUA lapisan non-teks (dunia, Lingkar, tokoh, slop, kartu, slot) di frame master rencana (t = pts_dasar[S] + 0,5 frame). (2) Teks/bubble/coretan: `t` dan jumlah frame n dihitung dari pts dasar supaya tampil tepat [S, E) frame master (`lego/tampil_rencana.json` = rencana). Lapisan yang berakhir di potongan/cut tampil sampai cut-1 dan tidak pernah di frame cut; lapisan berurutan tanpa celah dan tumpang tindih. (3) `waktu.SLOT_T/SLOT_VIS` = awal pasca-dunia B11 (72,0721 = f2160): kompensasi +2 frame ronde 3 dihapus karena sudah ditangani idx_t; "di sini." berakhir f2159, meja 3D mulai f2160. POTONG "masuk meja 3D" = f2160.
- **Cek baru (membaca MASTER):** `lego/cek_master.py` menjalankan compose.py yang SAMA (dasar + rantai overlay + rencana frame yang sama) dengan tiap lapisan teks/bubble/coretan diganti kotak putih 8x8 unik, lalu membaca frame master mana tiap kotak benar-benar tampil dan membandingkannya dengan rencana (`qc/r4/log/master_tampil.json`); gagal bila ada yang beda atau ada lapisan di frame cut. `cek_sinkron.py` aturan (c) membaca hasil itu (dan gagal bila lebih tua dari lego.json). Hasil: 104 lapisan teks/bubble/coretan tampil persis [S, E) di master. Satu pengecualian tertulis: T002 (FINALLY) berakhir f45, bukan f46 (n=21 tampil 20 frame, n=22 tampil 22 frame dan menyentuh frame cut f46; hero sudah tersapu penuh sehingga frame 45 kosong tidak terlihat) - di `lego/kalibrasi.json`.
- **Posisi narasi 21,0-22,3 dtk:** dengan waktu tampil yang kini tepat, irisan slop S14 kembali muncul; narasi di jendela itu dipindah ke [1010, 702] (sebelumnya [1010, 770]); cek_tumpuk irisan 0.
- **Lembar potongan:** `qc/r4/potong_semua.jpg` (8 potongan x frame cut-3..cut+2, kolom ke-4 = frame cut): FINALLY f46, juga/repo f119, bubble + sebuah + decision f358, putus-putus f707, Progres di baliknya f1031, LINTAS AGENT f1728, di sini. f2160, videonya kayak gimana? f2290; di tiap baris teks/bubble dari adegan sebelumnya sudah hilang di frame cut. Strip `strip_f2150-2165.jpg` diperbarui (f2159 = B11, f2160 = meja 3D tanpa "di sini.").
- Gerbang ulang (`qc/r4/log/`): cek_sinkron PASS (termasuk (a), (b), (c)), cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0, revisi_cek LULUS. Master 2512 frame, 83,817 dtk.
- **Catatan:** klip dasar 1-frame tidak saya ubah (kamera dasar, di luar lingkup); lapisan lain (dunia, tokoh) kini ditempatkan menurut indeks frame sehingga tampil 0-2 frame lebih awal dibanding master ronde 1-4a (sesuai rencana, sinkron dengan suara).

## Ronde 4c (footage wajah tidak lagi tertinggal terhadap suara; D-402)
- **Perbaikan (`bangun.dasar()`):** klip kamera 1-frame (`dasar[17]` f625, `dasar[28]` f1292) digabung ke klip kamera berikutnya (zoom awal = zoom klip 1-frame, zoom akhir = klip berikutnya; selisih zoom per frame < 0,0005, tampilan kamera tidak berubah selain frame ganda hilang). Klip dasar 42 -> 40, total 2512 frame.
- **Verifikasi `lego/base_pts.py`** (compose.py yang sama + showinfo): frame dasar 2512, **pts ganda 0**, **lag maks 0,002 frame** di seluruh video (sebelumnya -1 setelah f626, -2 setelah f1293). Frame sumber wajah ke-n = suara:

| titik | frame master | pts dasar (dtk) | lag (frame) | klip dasar | in klip (dtk) | waktu sumber wajah (dtk) | waktu suara (dtk) | selisih |
|---|---|---|---|---|---|---|---|---|
| 5 | 150 | 5,0050 | +0,00 | 3 | 4,2376 | 5,0050 | 5,0050 | 0,00 ms |
| 25 | 749 | 24,9916 | 0,00 | 18 | 23,6903 | 24,9916 | 24,9916 | 0,00 ms |
| 45 | 1349 | 45,0116 | 0,00 | 29 | 43,9439 | 45,0116 | 45,0116 | 0,00 ms |
| 65 | 1948 | 64,9983 | 0,00 | 37 | 59,1925 | 64,9983 | 64,9983 | 0,00 ms |
| 82 | 2458 | 82,0153 | 0,00 | 39 | 74,3076 | 82,0153 | 82,0153 | 0,00 ms |

- Karena pts dasar kini = indeks/29,97, `idx_t` / rencana frame sama dengan master; `cek_master.py --ulang`: 104 lapisan teks/bubble/coretan tampil persis rencana (PASS). Dua pengecualian tertulis di `lego/kalibrasi.json`: T002 berakhir f45 (lihat 4b) dan T106 berakhir f2510 (batas validasi compose.py: lapisan tidak boleh melewati total dasar + 0,05 dtk, jadi "bagi yang beruntung." hilang 2 frame sebelum akhir video; kata terakhir selesai 83,67 dtk).
- idx_t offset 0,1 frame (sebelumnya 0,5) supaya D_IG (7,45 dtk) lolos validasi compose.py (batas total + 0,05).
- Master dibuat ulang (2512 frame, 83,817 dtk), `qc/r4/potong_semua.jpg` dibuat ulang (teks/bubble hilang di frame cut pada kedelapan potongan).
- **Gerbang:** cek_sinkron PASS ((a),(b),(c)), cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0. **revisi_cek GAGAL** (dilaporkan, tidak diubah): "dasar (footage/kamera) berubah: potongan jumlahnya berubah (42 -> 40)" = penghapusan `dasar[17]` dan `dasar[28]`; D-402 tidak mencatat izin eksplisit untuk perubahan `dasar`; perlu catatan di DECISIONS.md + boleh_berubah (di luar file yang boleh saya ubah).

## Ronde 5 (B1, B3)
- **B1 "ChatGPT" tampil (B11 63,26-64,46):** di `teks.py` kata 169 ("ChatGPT", subjek yang diucapkan) dikecualikan dari aturan "nama agen sudah ada di label B11"; blok "Bahkan ChatGPT dengan" dipecah menjadi T084 "Bahkan ChatGPT" (kata 168-169, f1898-1934) lalu T085 "dengan" (kata 170, f1934-1948) lalu "yang berbeda" seperti sekarang; satu jalur narasi di pita bawah (tidak menumpuk kartu), onset per kata, potongan sama. Id blok sesudahnya bergeser +1 (107 blok). Strip `qc/r4/strip_f1895-1940.jpg` dilihat: "Bahkan" f1898, "ChatGPT" f1907, "dengan" f1934, tanpa celah/tumpukan.
- **B3 frame terakhir:** D_IG kini 223 frame (+1) sehingga menutup sampai f2511; kartu IG tampil f2490-2511. Hambatan validasi compose.py (durasi kontainer lapisan <= total + 0,05 dtk) ternyata karena trek audio senyap di mp4 hasil Remotion yang menambah 0,045 dtk; `bangun.stripa()` membuat salinan tanpa audio (`-c copy -an`, `lego/cache/*-an.mp4`) untuk semua lapisan opaque, jadi durasi tampil tidak dipendekkan. "bagi yang beruntung." (T107) juga tampil sampai f2511 (fase 0,2 frame, batas n memakai total + 0,045 dtk; pengecualian T106 di kalibrasi.json dihapus, kini T107 fase 0,2). Strip `qc/r4/strip_f2500-2511.jpg` dilihat: IG + teks utuh di f2500-2511.
- **Gerbang** (`qc/r4/log/`): cek_master --ulang 105 lapisan tampil persis rencana (PASS), cek_sinkron PASS ((a),(b),(c)), cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0, revisi_cek LULUS (137 berubah, semua tercakup, dasar tercakup). Master 2512 frame, 83,817 dtk.

## Ronde 6 (K1 + D-412 R6b + D-413 R6c)
**K1 tulisan tangan IG tidak lagi bersamaan dengan "Nanti" (D-411)**
- Tulisan ditulis per kata: "Comment" mulai 80,857 (onset + 2 f), "di" 81,152, "bawah." 81,162; tiap kata selesai tertulis sebelum kata berikut. Panah digambar 8 f mulai bersama "Comment", kepala menyusul 3 f. Tulisan + panah berakhir di world-frame 157 = f2446 (potongan), "Nanti" mulai f2447/2448. Dibaca dari master: pixel biru tulisan tangan = 0 mulai f2447, 'Nanti' tampil f2448 (frame 2446 hanya tulisan, 2448 hanya 'Nanti').
- `cek_sinkron.py`: aturan (viii) (minimal tampil 1,15 dtk) DIHAPUS; diganti (x): teks ucapan (narasi, hero, tulisan tangan) di zona mana pun tidak boleh tampil bersamaan (>= 1 frame master) dengan teks ucapan kalimat berikutnya (id kalimat dari tanda . ? ! di words), kecuali hero + sub yang diucapkan/tampil lebih dulu.

**R6b-1 narasi pengantar sebelum kata besar (D-412)**
- `sinkron()`: narasi yang diucapkan TEPAT sebelum hero (kata terakhir + 1 = kata pertama hero; semua hero slab/finally/busur/viral dan "habis banget") berakhir (potongan) di frame hero mulai: T033 f589-606 | AI SLOP f606; T050 f1093-1122 | WORKFLOW-NYA f1122; T056 f1252-1269 | BALIK MODAL f1269; T076 f1688-1708 | LINTAS AGENT f1708; "Ini" T095 f2168-2176 | 100% FULL AI f2176; juga "Oke," | FINALLY f25, "baru aja ngebikin" | workflow, "gimana biar" | AI model, "kan lagi" | VIRAL.
- Label pengantar di sudut ATAS-KIRI hero (gaya `label` di KT.tsx: Poppins 700, 52 px, HERO #FAF8EC + bayangan, masuk 3 f bersama hero, keluar dengan mask hero): "cuma mempelajari" (WORKFLOW-NYA), "Karena perlu" (BALIK MODAL), "sistem kerja" (LINTAS AGENT); posisi dari tinggi huruf Anton (cap 1760/2048): tepi bawah label 14 px di atas huruf hero, rata kiri blok hero. Dihilangkan: AI SLOP (sudut atas-kiri penuh dekor slop S04/S11, cek_tumpuk) dan 100% FULL AI (hero sudah di kiri atas). Narasi sesudah hero tidak berubah.
- Cek baru `cek_sinkron.py` (xi): per frame, narasi diucapkan sebelum hero tidak boleh di bawah hero, narasi sesudah hero tidak boleh di atas hero (pusat y lapisan); (a) dan (v) memberi pengecualian untuk narasi yang berakhir di hero.
- Strip `qc/r4/urutan_hero.jpg` (12 hero: masuk -5 ... +10 f, 2 baris per hero), dilihat: narasi pengantar hilang di frame hero, label atas-kiri terbaca.

**R6b-2 DECISION**
- DECISION naik ke dada: SLAB_Y 900 -> 768 (huruf y 658-878; dagu ±640 diukur dari frame 12,3 dtk), gerak masuk/keluar dan waktu tidak berubah. "dalam ngebuat video"/"gitu." di bawah DECISION (pusat y 944, tepi bawah huruf <= 990). (xi) PASS.

**R6c-a/b/c dunia IG (D-413)**
- (a) Tulisan tangan "Comment di bawah." (Kalam 60 px, biru #1F4FD8) di area putih panel komentar di atas kolom "Add a comment…" (dunia x 1182-1714, y 548-608), panah pendek (tebal 8) ke BAWAH dari ujung tulisan ke 14 px di atas garis kolom (x 1346, y 628 -> 798) melewati celah baris ikon; komentar 79,55 dan 80,3 (dunia y 266-480) tidak tertimpa. Semua di dalam `DuniaIG` (ikut kamera).
- (b) Kamera dunia IG: kunci `kamera` di props (sumber tunggal b6.tsx + cek_tumpuk), kurva `drift`/`heavy` dari curves.ts, kontinu: 0-0,7 dtk tahan; 0,7-1,9 dorong pelan ke video + pita hitam (s 1,45, pusat 680/621; panel tinggal sliver kanan); tahan/drift s 1,5; komentar pertama (79,55) tarik `heavy` ke panel komentar (1440, 400); komentar kedua (80,3 + 0,25) `heavy` ke kolom + tulisan tangan (s 1,8, 1445/700, tiba 81,26); kembali `heavy` 10 f ke video (s 1,45) selesai tepat saat tulisan berakhir; lalu drift 1,5. Pusat x kamera dipilih supaya tepi kiri pita hitam (sx0 = 960 + (180 - cx) s) <= 235 px dan teks pita terlebar ("Udah kerasa video" kiri 265, "bagi yang beruntung." kiri 199) tetap di atas hitam (cek_tumpuk KT-UI-IG: 0).
- (c) "profesional" (R3): ukuran 80 -> 97 (1,15x narasi 84), Poppins 800, warna CORAL #F97066 (aksen hero yang dipakai AI SLOP dan "putus-putus"); gaya masuk tidak diubah. Terlihat beda dari narasi putih setelah mendarat.
- Strip `qc/r4/ig_r6.jpg` (f2292-... tiap 3 f, 76,4-83,8 dtk) dan `strip_f2420-2450.jpg`, dilihat.

**Penilaian lima cek keseimbangan mata per detik (IG 76,4-83,8; dari ig_r6.jpg)**
| detik | massa kiri-kanan | satu fokus | urutan baca | satu permukaan | dekat subjek |
|---|---|---|---|---|---|
| 76,4-77,1 | seimbang (wajah penuh menyusut jadi kartu di tengah) | wajah | "Udah" di bawah wajah | satu | teks di bawah wajah |
| 77,1-78,2 | video kiri-tengah 72 %, sliver panel kanan: sedikit berat kiri, wajar | wajah | "Udah kerasa video" bawah | satu (video + pita) | teks di pita tepat di bawah wajah |
| 78,2-79,3 | sama | wajah | "editing", "profesional" (koral, 1,15x) lalu "gak? Atau" | satu | di pita |
| 79,3-80,3 | pindah ke panel kanan (tarik heavy), video tinggal sliver kiri | komentar baru (andi, lalu salsa) | atas ke bawah = urutan muncul | satu (panel) | tanpa teks pita; komentar di tengah frame |
| 80,3-81,3 | panel mengisi frame, tulisan di tengah | tulisan tangan | "Comment" - "di" - "bawah." ke panah ke kolom | satu (panel, tidak ada elemen di luar kartu) | tulisan 60 px dan kolom berdekatan |
| 81,3-81,65 | kembali ke video (heavy 10 f) | video | tulisan tangan berakhir f2446 | satu | - |
| 81,65-82,4 | video + pita, panel sliver kanan | "Nanti aku kasih" | satu teks | satu | di pita bawah wajah |
| 82,4-83,8 | sama; "gratis" kuning di kanan "skill" | skill gratis lalu "bagi yang beruntung." | kiri ke kanan | satu | di pita |
Catatan: pada 80,3-81,3 komentar pertama terpotong tepi atas frame (s 1,8) tetapi komentar kedua terbaca; bila dianggap masalah, naikkan pusat y kamera 700 -> 640 (hanya satu angka di bangun.py).

**Gerbang** (`qc/r4/log/`): cek_master --ulang 108 lapisan tampil persis rencana (PASS; pengecualian kalibrasi.json: T002 f45, T001 f24, T107 fase 0,2), cek_sinkron PASS (a)-(c),(x),(xi), cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0, revisi_cek LULUS (140 berubah, tercakup). Master 2512 frame, 83,817 dtk.

## Ronde 6b (kamera IG zoom 1,8)
- Dua kunci zoom 1,8 di blok `kam` (`lego/bangun.py`): pusat y 700 -> 642 (`[k2+0,95, 1,8, 1445, 642]` dan `[ret-0,32, 1,8, 1445, 642]`); zoom, x, waktu, kunci lain tetap. D_IG rev 12, dirender ulang, master dibuat ulang (2512 f).
- Cek mata resolusi penuh: `qc/r4/still_f2425.png` (kamera masih tiba: avatar + "salsa.kirana Keren editan profesional" utuh dengan jarak ke tepi atas, kolom "Add a comment…" utuh, jarak ke tepi bawah), `qc/r4/still_f2440.png` (diam: avatar y 85-175, kolom y 880-965, tulisan "Comment di bawah." + panah utuh). Transisi `qc/r4/strip_f2400-2415.jpg`: tidak ada teks terpotong saat kamera diam di komentar.
- Gerbang: cek_master --ulang 108 lapisan PASS, cek_sinkron PASS, cek_tumpuk irisan 0, kt_check PASS, motion_lint PASS, tsc exit 0, revisi_cek LULUS.
