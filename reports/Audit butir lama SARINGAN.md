# Audit butir lama motion-graphic terhadap SARINGAN

Cakupan: `claude/motion-graphic/guide/*/GUIDE.md` §Cara memutuskan (54 butir tanpa ID) dan `claude/motion-graphic/LANTAI.md` (46 butir bernomor). Butir yang sudah ber-ID (GRK-01, TKS-01..03, SFX-01, AUD-01, QC-01) tidak diaudit dan tidak diubah. Tabel daftar cek `guide/hindari/` dan bagian di luar §Cara memutuskan (§Cara, §Cek cepat, §Brand dulu) juga di luar cakupan.

Laporan ini usulan. Belum ada file `guide/` atau `LANTAI.md` yang diubah.

## Kode

**Kelas** (SARINGAN §2): **S** selera/proyek · **P** pertimbangan · **H** hukum. Ragu → kelas lebih rendah.

**Uji gagal** (SARINGAN §3): **U2** kata benda proyek (nama proyek, kalimat naskah, kode warna, nomor kartu sebagai aturan) · **U3** parameter gaya · **U4** tanpa angka/cara hitung · **U5** tanpa gerbang · **U6** duplikat butir lain · **padat** = lebih dari satu aturan dalam satu butir (AGENTS §Akhir sesi butir 6). U1 (kelas, bukan kejadian) dan U7 (≥ 2 proyek, H) tidak bisa dinilai dari teks butir; dicek di `SUMBER.md` saat migrasi.

**Tindakan:** **Tulis** ke format §4 dengan ID baru · **Gabung** ke ID lain (butir lama jadi kolom Anti-pola/Boleh di ID itu) · **Kartu** = turun ke "Catatan pakai" kartu kiblat · **Merek** = bawaan di `templates/merek/EDITING.md` (dikalahkan kiblat/brief) · **Ref** = pindah ke `references/` sebagai rujukan teknik · **Proyek** = tetap di `projects/<proyek>/DECISIONS.md` · **Alur** = aturan proses, pindah ke `SKILL.md`/`references/`, bukan butir mutu · **Hapus** = sudah tercakup butir lain.

ID baru melanjutkan nomor yang ada: AUD-02…, GRK-02…, SFX-02…, TKS-04…, VIS-01…, QC-02…

## 1. guide/audio (9 butir)

| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| au1 | Potong suara hanya di celah, bukan di gelombang | P | U2 (contoh "dinikma\|ti"), U6 (LANTAI 23 fonem) | Gabung | **AUD-02** Titik potong diukur dari gelombang + transkrip ulang; gerbang `cut_check.py` |
| au2 | Padat ≠ dipotong rapat | S | U3 (jeda 0,3 dtk gaya dokumenter), U6 (LANTAI 23 tidak dipercepat) | Kartu + Hapus | 0,3 dtk ke kartu kiblat dokumenter; bagian "jangan pendekkan vokal" sudah AUD-08 |
| au3 | Ujung bite di lembah energi belum tentu ujung kata | P | U2 (kutipan "10 persen", "ngatur gitu") | Gabung | AUD-02 (jendela transkrip ulang [ujung−1,6; ujung] dan +0,4 dtk) |
| au4 | Momen tanpa suara pembicara tetap berbunyi | P | U2 ("montase pitching 4,5 dtk"), padat | Tulis | **AUD-03** Tidak ada lubang senyap saat VO jeda: jendela 100 ms < −45 dBFS = GAGAL; beda mekanisme dari AUD-01 (musik relatif suara) |
| au5 | Suara asli tidak pernah diturunkan; redam noise lalu gain bersih | H (sudah) | U2 (v3 −22,8 LUFS, crest 18,8 → 14,6), U6 (LANTAI 23), "tidak pernah" | Hapus + Gabung | Inti = AUD-11 (LANTAI); "denoise sebelum gain untuk sumber terkompresi" → AUD-04 |
| au6 | Detik awal kurang terdengar: ukur loudness per frasa | P | U2 ("jensen", kutipan, −61 LUFS demucs), padat | Tulis + Proyek | **AUD-05** Frasa di bawah median diangkat gain statis naik saja; ambang selisih perlu angka (usulan 2 dB). Rak HF −2 dB @7,5 kHz → proyek |
| au7 | Klip dari rekaman mentah dengan take ulang | P | U2 (2,3 dtk satu kasus) | Gabung | **AUD-06** Rakitan klip ditranskrip ulang per klip; gerbang `rakitan_cek.py sumber` + `rakitan` |
| au8 | Dua klip dari ucapan bersambung: potong di lembah yang sama | P | U2 ("how") | Gabung | AUD-06 |
| au9 | Sumber noise floor ≤ −50 dB: jangan denoise, jangan encode lossy dua kali | P | format saja | Gabung | **AUD-04** Denoise hanya bila noise floor sumber > −50 dB; gerbang `voice_fidelity.py` |

## 2. guide/gerak (2 butir)

| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| gr1 | Kamera pindah objek: teks tetap di posisi dunianya | P | U4, U5, U6 (LANTAI 12) | Gabung | **GRK-02** (dari LANTAI 12) Elemen diam di dunianya; "menjepit teks di tepi" jadi Anti-pola |
| gr2 | Kilat cahaya di kartu judul < 20 f: kurva `drift` | S | U3 (efek kilat, nama kurva) | Kartu | Catatan pakai kartu yang memuat gaya kilat (G8); hitungan frame sudah GRK-01 |

## 3. guide/teks (31 butir)

### Posisi dan keseimbangan di atas footage
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| tp1 | Nilai kontras di bawah huruf aktual dan komposisi seluruh frame | P | padat, U2 (contoh kasus), U6 (TKS-03 + LANTAI 17) | Hapus | Kontras = TKS-03; komposisi = VIS-01 |
| tp2 | Koreksi satu sisi membuat sisi lain berat: bedah seluruh frame | P | padat, U4, U6 (LANTAI 17, 28b) | Gabung | **VIS-01** (dari LANTAI 17) Keseimbangan dinilai seluruh frame tiap tahap gerak |
| tp3 | Whitespace dipilih dari fungsi objek dan kedekatan fokus | P | U4 | Tulis | **TKS-04** Ruang teks dari fungsi objek; angka dari LANTAI 2: jarak ke subjek ≤ 8 % tinggi frame, lebih dekat ke subjek daripada ke tepi |
| tp4 | Penempatan diteruskan ke sesi lain: satu sesi pemetaan dulu | P | format saja | Tulis | **TKS-06** Gerbang: `placement-map.json` ada dan tiap shot berisi objek, fokus, area bukti, ruang terpilih, alasan |
| tp5 | Peran footage menentukan peran teks | P | U4 | Tulis | **TKS-05** Gerbang: tiap shot dicatat peran footage (pengisi/informasi) + frame |
| tp6 | Komposisi bisa membalik keputusan itu | P | U4 | Gabung | Kolom Boleh TKS-05 |
| tp7 | Frame tanpa subjek: rata tengah, lebar baris sama | S | U3 (perataan), U6 (LANTAI 4, baris ≥ 85 %) | Kartu + Hapus | Perataan ke kartu kiblat |
| tp8 | Menghindari subjek jangan sampai menabrak tepi | P | U4, U6 (LANTAI 2, 16) | Gabung | TKS-04 (Invarian jarak tepi) |
| tp9 | Teks putih mencari bidang gelap, bukan dada penonton bersiluet | P | U2 (aula, layar LED) | Gabung + Proyek | Pola umum masuk Anti-pola TKS-04; kasus aula → proyek |
| tp10 | Video sebagai isi tampilan: teks ucapan masuk ke bidang video | P | U4 | Tulis | **TKS-07** Gerbang: frame tiap tampilan; teks ucapan di pita luar bidang = GAGAL |

### Kata hero dan kedalaman
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| th1 | Frasa hero pendek: uji satu baris sebelum memecah | S | U2 (`NGATUR KITA`), U3 (kapital, satu baris), padat | Kartu + Gabung | Bentuk ke kartu kiblat; "jangan otomatis shadow/outline" digabung ke butir kotak latar (LANTAI 9 → Merek) |
| th2 | Kata besar lewat kepala: foreground matte di atas teks | S | U3 (teknik kedalaman) | Kartu | Catatan pakai kartu teks-di-belakang-kepala (83) |
| th3 | Hero pembicara duduk rendah menumpuk di tengah | S | U2 (kartu 83 k3/k4, 23/53 k3) | Kartu + Gabung | Pilihan (a)/(b) ke kartu 83/23/53; zona bawah = TKS-23 |
| th4 | Kata kunci blend multiply: aksen lebih dalam | S | U2 (#E8A33D, #D9782A), U3 | Kartu + Ref | Warna ke kartu; "blend harus di grup yang sama dengan foto" ke `references/build.md` |

### Bentuk dan variasi teks
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| tb1 | Perlakuan kata dipindah: putus ulang tiap atribut | P | format saja | Tulis | **TKS-08** Gerbang sudah ada: satu baris alasan per atribut, atribut tanpa alasan = GAGAL |
| tb2 | Uji tipografi dialog: satu pikiran lengkap | P | padat, U6 (TKS-03, LANTAI 9 soal menggelapkan latar) | Tulis + Hapus | **TKS-09** Preview memuat semua kata di rentangnya (gerbang `kt_ocr.py` pada preview); sisa dihapus |
| tb3 | Variasi bentuk teks = alat mengarahkan perhatian | P | U6 (LANTAI 9a) | Hapus | Tercakup TKS-17 |

### Waktu tampil dan pergantian blok
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| tw1 | Waktu muncul kata dicocokkan per huruf | P | U2 (contoh "talkshow -nya") | Gabung | **TKS-10** Waktu kata: penyelarasan per karakter, telat ≤ 0,25 dtk, tampil ≥ 0,2 dtk |
| tw2 | Setiap kata yang diucapkan harus sempat terbaca | P | format saja | Gabung | TKS-10 (angka sudah ada) |
| tw3 | Blok narasi berganti di jalur sama: potong, bukan pudar | P | U6 sebagian (LANTAI 13) | Tulis | **TKS-11** Satu blok narasi per waktu; gerbang: frame master, 0 frame dua blok narasi beralfa > 0 |

### Teks di atas b-roll dan potongan shot
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| tr1 | B-roll di bawah teks testimoni: tanpa orang yang sedang bicara | P | U5 | Gabung | **TKS-12** B-roll di bawah suara orang lain tidak menampilkan wajah yang tampak bicara |
| tr2 | Teks tidak menyeberang potongan shot | P | U4 | Gabung | **TKS-13** Frasa berakhir ≤ frame potongan bila shot berikutnya wajah bukan penutur |
| tr3 | Frasa berakhir di potongan bila shot berikutnya bukan penuturnya | P | format saja | Gabung | TKS-13 (Invarian: 0 frame sisa) |
| tr4 | Wajah close-up tersenyum mulut terbuka terbaca bicara | P | format saja | Gabung | Anti-pola TKS-12 |
| tr5 | Aturan "tidak menyeberang potongan" hanya untuk wajah orang lain | P | format saja | Gabung | Kolom Boleh TKS-13 |
| tr6 | Kata kunci di latar gelap: jangan merah/aksen jenuh | S | U3 (warna aksen = kiblat), satu proyek | Proyek/Kartu | Kontras sudah TKS-03; larangan warna tetap di proyek sumber |

### Teks di dalam tampilan aplikasi dan adegan 3D
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| td1 | Narasi saat layar aplikasi: di luar isi UI | P | U5 | Tulis | **TKS-14** Gerbang: frame; kata narasi di dalam kolom UI = GAGAL (contoh gagal 13) |
| td2 | Punchline di tampilan kecil: keluar ke layar penuh | P | U2 (kartu 85 T1 sebagai rujukan boleh) | Gabung | Kolom Boleh TKS-07 |
| td3 | Teks di adegan 3D menempel bidang nyata | P | U6 sebagian (LANTAI 3) | Tulis | **TKS-15** Gerbang: frame; teks tanpa bidang di antara objek = GAGAL (contoh gagal 15) |
| td4 | Kata pengantar kecil menempel kata hero | P | U4 | Tulis | **TKS-16** + LANTAI 15 "tidak berjauhan"; angka jarak perlu ditetapkan (usulan ≤ 0,5 tinggi huruf hero) |
| td5 | Lapis teks menumpuk, matte tidak rapi: kedalaman lewat fokus | S | U6 (TKS-01 blur bertahap), U3 | Hapus + Kartu | Teknik ke Catatan pakai kartu 87 |

## 4. guide/visual (13 butir)

| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| vi1 | Frame flat: beri footage "material" (film + glow) | S | U3 (look film) | Kartu | Kartu kiblat ber-look film; "teks tidak ikut tertutup lapisan" ikut sebagai catatan |
| vi2 | Latar canvas gelap: bidang rata bersih | S | U3 | Kartu | |
| vi3 | Tokoh AI disebut nama: bubble sapaan | S | U3, U2 (±60 px) | Kartu | Kartu tokoh/maskot |
| vi4 | Maskot merek: siluet logo dan warna asli | P | U6 (LANTAI 20) | Gabung | **VIS-10** (dari LANTAI 20) UI dan logo asli |
| vi5 | Panah goresan/tulisan tangan mengikuti ucapan | S | padat, U2 (UI Instagram, kartu 65), U3 | Kartu | Syarat "sekeluarga dengan palet adegan" sudah VIS-13 |
| vi6 | Beberapa tokoh diperkenalkan: watak berbeda per tokoh | S | U4, U5 | Kartu | Kartu tokoh; ragu → S |
| vi7 | Tokoh bekerja menghadap pekerjaannya | P | U6 (LANTAI 22b) | Gabung | **VIS-02** (dari LANTAI 22b) Logika dunia nyata, sebagai Anti-pola |
| vi8 | Sudah ada penunjuk arah: jangan tambah panah kedua | P | U4 | Tulis | **VIS-03** Satu penunjuk per tujuan; gerbang: hitung penunjuk ke bbox yang sama ≤ 1 |
| vi9 | UI editor: isi preview dari video jadi | P | U6 (LANTAI 22b) | Gabung | Anti-pola VIS-02 |
| vi10 | Objek menunjuk/mengisi objek lain: ukur dari still komposit | P | format saja | Tulis | **VIS-04** Gerbang: bbox penunjuk ⊂ bbox target di still komposit |
| vi11 | Grade hangat-dingin: pisah berdasarkan terang | S | U3 (look teal-oranye) | Ref | `references/grade.md` (sudah dirujuk butirnya) |
| vi12 | Bayangan ke teal: angkat G-B, jangan tarik R ke nol | P | format saja | Tulis | **VIS-05** Bayangan tidak kehilangan detail; gerbang `grade_ukur.py` (R bayangan < 0,012 = GAGAL) |
| vi13 | Footage redup lewat platform kompres: tanpa grain | P | U5 | Tulis | **VIS-06** Gerbang: encode uji di bitrate tujuan, frame 100 % tanpa blok kompresi |

## 5. LANTAI.md (46 butir)

Catatan: 161 rujukan di skrip, guide, references, dan kartu memakai nomor Lantai (A7, E24, 22b, …). Butir yang tetap di LANTAI memakai ID baru **dengan nomor lama sebagai alias** (`[TKS-21] (A7) …`) supaya rujukan lama tetap mengena; rujukan dipindah bertahap. Butir yang keluar dari LANTAI meninggalkan satu baris penunjuk ("A10 → EDITING.md kamera") sampai rujukannya diganti. `tools/sync_lantai.py` dijalankan sesudahnya.

### A. Teks di layar
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| A1 | Semua ucapan tampil sebagai teks, satu lapisan kinetik editorial, tanpa pita subtitle | H + S | padat, U3 ("editorial", tanpa pita subtitle) | Pecah | **TKS-18** (H) tiap kata terucap punya tampilan teks, gerbang `kt_ocr.py`; gaya editorial/tanpa pita → Merek |
| A2 | Posisi lahir dari komposisi; 3 tampilan di pita sama gagal; jarak ≤ 8 % | P | U3 (ambang 8 % dan "3 tampilan" bergantung gaya), U5 | Turun | TKS-04 (guide/teks) |
| A3 | Kata tidak tampil dua kali | H | format saja | Tulis | **TKS-19** gerbang `teks_cek.py` GANDA |
| A4 | Maks 2 baris, 1–3 kata, blok ≥ 85 %, tidak terpotong, tanpa yatim, tanda tanya | H + S | padat, U3 (2 baris, 1–3 kata, 85 %) | Pecah | "Terpotong tepi" → TKS-23 (H); tanda tanya → TKS-20; jumlah baris/kata/keseimbangan → Merek (`kata_per_tampil`) |
| A5 | Teks hanya dari ucapan | H | U5 | Tulis | **TKS-20** Kata tampil ⊂ transkrip, tanda tanya ikut; gerbang belum ada (usulan: cek `teks.json` terhadap transkrip di `teks_plan.py`) |
| A6 | Satu baris satu ukuran; dua gaya huruf tidak sama kuat | S | U3 | Merek/Kartu | |
| A7 | Huruf menyatu: kontras, ukuran, tepi, 56 px, 8 % bawah, biru, font termuat | H | padat (7 aturan), U6 (TKS-03, LANTAI 16) | Pecah | **TKS-21** kontras p10 ≥ 4,5 : 1 · **TKS-22** huruf terkecil ≥ 56 px @1080 · **TKS-23** teks tidak terpotong, di dalam margin 5 %, teks kunci di atas 8 % bawah (`teks_cek.py` TEPI/BAWAH) · **TKS-24** font dari file, build gagal bila hilang (gerbang build perlu dicek, belum ditemukan). "Biru di gelap" dihapus (tertangkap TKS-21); "ukuran berhubungan dengan subjek" → VIS-01 |
| A8 | Terbaca berurutan dan cukup lama | P | U4, U6 (TKS-01, TKS-02, TKS-10) | Hapus | |
| A9 | Kotak di belakang teks hanya bila kontras gagal | S | U3 (caption berkotak sah di gaya lain) | Merek | Digabung dengan "tanpa shadow otomatis" (th1) |
| A9a | Gerak teks dari peran kalimat; kuota 15 dtk | P + S | padat, U3 (kuota ≥ 3 gerak/15 dtk, daftar G/T) | Turun + Merek | **TKS-17** (P) satu peran = satu gerak, gerbang `kt_check.py`; kuota variasi → Merek |

### B. Kamera dan gerak
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| B10 | Shot > 2 dtk punya gerak kamera | S | U3 (kamera diam sah; pengecualian kiblat sudah tertulis) | Merek | Kolom `kamera` di EDITING.md |
| B11 | Kamera ikuti satu objek per beat, patuh ucapan | P | padat, U4 | Turun | **GRK-03** keyframe dari tabel waktu kata; framing akhir tidak memotong objek |
| B12 | Elemen diam di dunianya, kamera yang bergerak | P | U4, U5 | Turun | **GRK-02** (+ gr1) |
| B13 | Nol crossfade, fade bukan gerak, easing tidak linear, mekanik transisi | S | padat, U3 | Merek + Ref | Larangan crossfade/linear → Merek `transisi`; mekanik → `references/motion-mechanics.md` (sudah ada) |
| B13a | Kurva per gerak, durasi dari jarak, react(i) | S | U3 (nama kurva, ms, 0,65×) | Ref | `references/motion-mechanics.md`; `motion_lint.py` tetap sebagai alat |
| B13b | Format berulang berbeda framing | P | U4 | Turun | **GRK-04** gerbang: lembar kontak tiap kemunculan, framing (posisi/skala) beda |

### C. Komposisi
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| C14 | Satu fokus per momen | P | U4 | Turun | **VIS-07** gerbang: sebut satu fokus per frame lembar kontak |
| C15 | Teks, objek, visual satu kesatuan; tidak bertabrakan | H + P | padat | Pecah | **TKS-25** (H) bbox teks tidak bertumpuk dengan teks/objek lain kecuali disengaja (gerbang belum ada); "tidak berjauhan" → TKS-16 |
| C16 | Tepi bersih, margin aman 5 % | H + P | padat | Pecah | Teks → TKS-23 (H); objek penting → **VIS-12** (P, dinilai mata) |
| C17 | Seimbang dan hierarki terbaca, global per frame | P | U4 (sengaja dinilai mata) | Turun | **VIS-01** (+ tp2) |
| C18 | Rapi: garis, jarak, stroke, radius konsisten | P | U4 | Turun | **VIS-11** gerbang `tema_cek.py` untuk token stroke/radius + mata |
| C18a | Palet dikunci di resep, satu aksen dominan | H + S | padat, U3 (satu aksen) | Pecah | **VIS-13** (H) tidak ada warna di luar palet resep, `palette_check.py`; "satu aksen" → Merek |
| C18b | Setiap efek punya fungsi | P | U4 | Turun | **VIS-08** gerbang: satu baris fungsi per efek di RESEP |

### D. Isi visual
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| D19 | Visual menggambarkan makna ucapan | P | U4, U5, U6 (19a) | Gabung | ke 19a (Alur) |
| D19a | Metafora dulu, baru gambar; `board.py` FAIL bila kosong | Alur | bukan butir mutu; gerbang sudah kode | Alur | `references/storyboard.md` |
| D19b | Situasi digambar dengan bentuk yang menjelaskannya | Alur | U4 | Alur | `references/storyboard.md` (tabel bentuk ← aksi) |
| D19c | Storyboard Irfan = struktur, bukan visual akhir | Alur | bukan butir mutu | Alur | `references/storyboard.md` |
| D20 | Tampilan platform dan logo asli | P | U4; gaya ilustratif bisa sengaja menyederhanakan UI | Turun | **VIS-10** (+ vi4); Boleh: kiblat ilustratif tertulis di RESEP |
| D21 | Yang bicara tampil di frame | S | U3 (video VO-only sah) | Merek | |
| D22 | Tidak ada placeholder | H | U5 | Tulis | **VIS-14** gerbang: audit frame, daftar placeholder = 0 |
| D22a | Tokoh dan dunia konsisten sampai akhir | P | U4 | Turun | **VIS-09** gerbang: lembar tokoh per kemunculan |
| D22b | Uji logika dunia nyata | P | U5 | Turun | **VIS-02** (+ vi7, vi9) gerbang: kolom "orang sungguhan melakukan ini?" per beat di storyboard |
| D22c | Tiga detik pertama: gebrakan di frame 0 | S | U3 (pembuka tenang sah) | Merek | |

### E. Audio
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| E23 | Suara tidak dipercepat, jeda bersih, fonem utuh, kata sampah dibuang, level tidak diturunkan | H + S | padat (5 aturan) | Pecah | **AUD-08** tempo asli (durasi kata ≥ 85 %, `cut_check.py`) · **AUD-09** fonem utuh (> 20 ms teriris = GAGAL, `audio_order.py lock`) · **AUD-10** jeda ≤ −50 dBFS (`pause_clean.py`) · **AUD-11** level suara tidak turun/di-limit (`voice_level.py`). Kata sampah dibuang → Merek |
| E24 | Lima pilar sound design, jarak, gain, palet terlarang | P + S | padat, U3 (gain, palet terlarang, jarak) | Turun + Ref | **SFX-02** (P) objek/gerak penting punya cue, `sfx_density.py --objects`; pilar, gain, palet → `guide/sfx/FAMILI.md` |
| E25 | Musik ikut tempo dan suasana, per babak, ducking automation | P + S | padat, U3 (per babak), U6 ("tidak bolong" = AUD-01/AUD-03) | Turun + Merek | **AUD-07** (P) kategori musik dari `pace_read.py` + `music_fit.py`; per babak → Merek `musik` |
| E25a | SFX terdengar dan nyaman, diuji speaker HP | H | format saja | Tulis | **AUD-12** gerbang `audio_phone.py` + `audio_qa.py --module5` |

### F. Cara kerja
| # | Butir | Kelas | Uji gagal | Tindakan | Tujuan |
|---|---|---|---|---|---|
| F26 | Alur profil → preview → produksi → render 1 → masukan → render 2; audit tanpa sampling; lego | Alur | bukan butir mutu, padat | Alur | `SKILL.md` §alur (gerbangnya sudah `render.sh`) |
| F27 | Revisi = diff, satu ronde; yang disetujui tidak disentuh | H + Alur | padat | Pecah | **QC-02** (H) revisi hanya mengubah atribut yang diminta, `revisi_cek.py cek`; ronde, `compose.py --rentang`, `qc/revisi.json` → Alur |
| F28 | Tidak yakin = tanya | Alur | U6 (AGENTS §Cara membaca butir 5) | Hapus | |
| F28a | Baca folder proyek sebelum build | Alur | U6 (AGENTS butir 2) | Hapus | |
| F28b | Contoh/koreksi berlaku untuk frame yang disebut | H | U6 sebagian (AGENTS butir 2) | Gabung | Anti-pola QC-02 |
| F28c | Tidak ada generate berbayar sebelum gerbangnya | Alur | tanpa pengecualian → seharusnya gerbang kode | Alur | `SKILL.md` §alur; usulan gerbang kode terpisah |
| F29 | Video dikirim setelah juri lulus | Alur | U6 (`render.sh final`) | Alur | `SKILL.md` §alur |

## 6. Ringkasan per kelompok tindakan

| Kelompok | Isi | Jumlah butir lama → ID |
|---|---|---|
| G1 Guide: tulis/gabung ke ID P baru | au1, au3, au4, au5 (bagian), au6, au7, au8, au9, gr1, tp2–tp6, tp8–tp10, tb1, tb2, tw1–tw3, tr1–tr5, td1–td4, vi4, vi7–vi10, vi12, vi13 | 41 → AUD-02..06, GRK-02, TKS-04..16, VIS-01..06, VIS-10 |
| G2 Guide: hapus duplikat + turun ke kartu/ref/proyek | au2, au5 (sisa), au6 (sisa), gr2, tp1, tp7, tp9 (kasus), th1–th4, tb3, tr6, td5, vi1–vi3, vi5, vi6, vi11 | 20 butir keluar dari guide |
| L1 LANTAI: H dipecah satu baris per ID + gerbang | A1, A3, A4, A5, A7, C15, C16, C18a, D22, E23, E25a, F27, F28b | 13 butir → TKS-18..25, VIS-13, VIS-14, AUD-08..12, QC-02 |
| L2 LANTAI: P turun ke guide | A2, A8, A9a, B11, B12, B13b, C14, C16 (objek), C17, C18, C18b, D20, D22a, D22b, E24 (inti), E25 (inti) | 16 butir → guide (TKS-17, GRK-02..04, VIS-01, 07..12, SFX-02, AUD-07) |
| L3 LANTAI: parameter gaya keluar ke EDITING.md/kartu/ref | A1 (gaya), A4 (jumlah), A6, A9, A9a (kuota), B10, B13, B13a, C18a (satu aksen), D21, D22c, E23 (kata sampah), E24 (pilar), E25 (per babak) | 14 butir/bagian |
| L4 LANTAI: aturan alur pindah ke SKILL.md/references, duplikat AGENTS dihapus | D19, D19a–c, F26, F27 (sisa), F28, F28a, F28c, F29 | 10 butir |

Urutan kerja yang aman bila disetujui: G1 dan G2 dulu (guide, tidak dimuat selalu), lalu L2 (ID P harus ada di guide sebelum LANTAI menunjuknya), lalu L1, L3, L4, dan terakhir `sync_lantai.py`. Hasil akhir LANTAI usulan: ±18 baris H satu-baris + baris penunjuk sementara.

## 7. Yang perlu dicek saat migrasi
- U1/U7 per ID baru: sumber ≥ 2 proyek dicek di `SUMBER.md`; ID dari satu proyek mulai dengan catatan "uji silang: belum".
- Angka usulan yang belum punya dasar sumber: AUD-05 (selisih 2 dB), TKS-16 (≤ 0,5 tinggi huruf hero). Ditandai *usulan* di Invarian sampai dikonfirmasi.
- Gerbang yang belum ada: TKS-20 (teks ⊂ transkrip), TKS-24 (font hilang → build gagal), TKS-25 (tabrakan bbox). Tetap ditulis dengan gerbang "tunjukkan frame + alasan" sampai skripnya dibuat.
- Docstring skrip yang menyebut nomor Lantai (`kt_ocr.py` "LANTAI A1", `teks_cek.py` "A1-A4, A7", `caption_lines.py`, `kt_check.py`, `revisi_cek.py`) diganti ke ID saat butirnya dimigrasi.
