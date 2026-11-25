# F6 Audit Ulang C (independen)

Basis: still keyframe dibuka langsung (`KF/` = `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/`), vault (`V/` = `.../cookbook/_vault/`), `contoh-gagal/` + README-nya, `slop-catalog.md`, `LANTAI.md`, `typography.md`, `guide/teks/GUIDE.md`, `guide/sfx/*`, `F1-inventaris.csv`, `F1-decisions-visual.md`. Folder scratch lama dan `*-belajar.md` tidak dibuka.

Catatan umum:
- Hanya 88 dan 96 `dilihat_bergerak: ya` (tema editorial). Seluruh minimalist 0/4. Label epistemik di keempat file F3/F3b pada dasarnya rapi; kelalaian dicatat per butir.
- Kolom "keputusan creator" menyesatkan: tiap tema = banyak kreator/video berbeda. Pola adalah lintas-video, bukan keputusan satu creator.
- Banyak "Bukti" audio berupa kolom `SFX:` di kartu T-card vault. Itu REKOMENDASI adaptasi (nama file `pop up.mp3`, `basmenyebar.mp3`, `Lasertransision.mp3`, dst), bukan pengamatan video asli (vault 40: "bunyi asli tidak dilabel"; vault 88: "SFX per cue... belum dibedah"; vault 96: "tidak ada SFX terpisah"). Kelompok ini ditandai (T-card).
- Salah-ID slop-catalog berulang: S-A4 = "teks/objek tanpa SFX = sepi" (bukan spam), S-T9 = "subtitle dihapus", S-T10 = "kata tersebar tanpa urutan baca", S-V4 = teks kiri + kartu kanan bobot sama, S-V6 = shape placeholder storyboard, S-V2 = grafik vivid atas footage blur, S-V11 = frame kamera datar.
- Status: COCOK / TIDAK COCOK / TD (tidak ditemukan) / TDB (tidak dibuka, anggaran audit habis).

---
## 1. F3-editorial-metaphor-canvas.md

| ID | Klaim ringkas | Bukti dibuka -> status | Label epistemik | Putusan | Catatan / redaksi |
|---|---|---|---|---|---|
| K1 | 1 objek metafora, ruang negatif >=55% | KF/20-k6 COCOK (koper ~35% bawah, langit lega); 88-k6 COCOK; 88-k13 COCOK; 80-k1 sebagian (teks+garis, bukan objek); 73-k3 sebagian (panah kecil) | ok | LULUS | 96-k3 sbg pelanggaran sah didukung V/96 baris "kanvas paling penuh meredup" |
| K2 | Teks adaptif: sisi lawan / poros 47-55% / pita atas 12-22% | 37-k3 COCOK; 80-k3 COCOK; 20-k8 COCOK; 80-k8 COCOK (cy~18%); 88-k7 COCOK (cy~48%); 40-k4 COCOK; 88-k1 TIDAK COCOK utk pita 12-22% (cy~26%) | ok | LULUS DENGAN REVISI | Ganti "pita atas cy 12-22%" menjadi "cy 12-26%" atau keluarkan 88-k1 |
| K3 | Dua tingkat 1,8-3,8x tanpa kotak | 80-k7 COCOK (~2x); 88-k7 COCOK (~3,4x); 47-k7 COCOK (vs metadata mono ~10x); 37-k3 COCOK (~1,9x); 20-k2 sebagian (tahun vs kalender, bukan lockup); 64-k3 TIDAK COCOK (justru pakai kotak putih; ini pengecualian, bukan bukti) | ok | LULUS DENGAN REVISI | Pindahkan 64-k3 ke "kapan dilanggar". Lantai tema 1,8x bertabrakan dengan F4 I2 (>=2,3x). ">=56 px @1080" angka tidak bisa diverifikasi dari still |
| K4 | Kutub netral + maks 1 aksen/babak | 40-k1 COCOK (krem + titik oranye); 20-k3 COCOK (lingkaran merah); 88-k5 COCOK (biru); 64-k1 COCOK; 96-k6 sebagian (0,8 dtk: amber + merah sekaligus); 37-k2 = contoh pelanggaran, COCOK | ok | LULUS | hex tidak bisa diverifikasi |
| K5 | Penekanan di tempat: abu->hitam / swap token / 1 kata raksasa | 88-k6 COCOK; 96-k4 COCOK; 96-k3 COCOK (never ~53% H); 73-k8 COCOK; 40-k5 COCOK; 73-k6 TIDAK COCOK utk "raksasa" (kata 'motion' ~9% H) | ok | LULUS DENGAN REVISI | Buang 73-k6 dari (c). Catat: 73-k8 ("with" sans + "confidence." serif italic satu frasa) melanggar LANTAI A6 ("dua gaya huruf tidak dicampur dalam satu frasa"); lantai menang, tulis di RESEP.md |
| K6 | Relasi = geometri / UI frameless | 80-k1 COCOK; 80-k2 COCOK; 88-k3 COCOK; 96-k1 COCOK; 96-k2 COCOK | ok | LULUS | LANTAI D20 sesuai |
| K7 | Kedalaman blur 3 lapis / dotgrid, bukan drop shadow | 80-k5 COCOK utk blur satelit tapi jendela + kartu punya bayangan lembut (bukan bukti "tanpa bayangan"); 47-k6 COCOK; 37-k4 sebagian (latar sebagian blur); 20-k1 sebagian; 73-k3 COCOK (dotgrid) | tag `(belum dilihat bergerak)` ok | LULUS DENGAN REVISI | Laplacian 1974 vs 10 / 661 vs 26: angka tidak bisa diverifikasi. Hapus klaim 80-k5 "tanpa shadow" |
| K8 | Ganti adegan: polaritas / busur / benda, bukan crossfade | 88-k11 COCOK; 96-k6 COCOK (7 lompatan, V/96 ok); 64-k2 COCOK; 20-k2, 40-k2 TIDAK menunjukkan benda menutup frame (40-k2 = terowongan bingkai saja) | 20/40/64 sudah bertanda | LULUS | 88 vs 96 kreator berbeda, keduanya bergerak ya |
| AC1 | Kanvas mati + objek/teks kecil (S-T10,S-V13,S-V24) | contoh-gagal/02 COCOK; 05 COCOK ("Unil" terpotong); F1-dec L67 & vibedesign D-026 COCOK | - | LULUS DENGAN REVISI | S-T10 dan S-V24 salah ID; pakai S-V13 saja |
| AC2 | Latar gelap radial/teks biru | 04 COCOK; F1-dec D-030, D-015, D-017, R-005, D-18 COCOK | - | LULUS | - |
| AC3 | Serif pucat, tepi, campur gaya (S-T1,T3,T9,T11) | 01 COCOK; 17 COCOK; D-08, D-22, D-004, D-024 COCOK | - | LULUS DENGAN REVISI | S-T9 dan S-T11 salah; pakai S-T3, S-T1 |
| AC4 | Teks melayang di 3D (S-V10,S-V13) | 15 COCOK (README: kata ganda dgn caption monitor); D-028 COCOK; D-013 vibedesign TIDAK COCOK (itu "satu dunia visual"; pijakan grid = D-028/D-029) | - | LULUS DENGAN REVISI | Ganti D-013 -> D-029 |
| AC5 | Kartu simetris identik (S-V8,S-V4) | 03 COCOK; D-24, D-26 COCOK | - | LULUS DENGAN REVISI | S-V4 tidak cocok; pakai S-V8 + LANTAI C14 |
| AC6 | Screenshot kecil / dokumen blur (S-V2,S-V20,S-V6) | 20 COCOK; 21 COCOK; D-28, D-29, D-031 COCOK | - | LULUS DENGAN REVISI | Hanya S-V20 benar; S-V2, S-V6 salah |
| AC7 | Tempo + spam audio (S-V1,V11,A3,A4,A6,A11,A12) | F1-dec D-025, D-27, R-017, R-030, R-012, R-026 COCOK; tanpa gambar contoh-gagal | - | LULUS DENGAN REVISI | S-A3 (fade backsound) dan S-A4 (sepi) bukan "spam"; pakai S-A6, S-A11, S-A12 |

Rekap F3-editorial (15 butir): LULUS 5 / LULUS DENGAN REVISI 10 / TURUN 0 / GAGAL 0.

---
## 2. F3b-editorial-metaphor-canvas-audio-kt.md

| ID | Klaim ringkas | Bukti dibuka -> status | Label | Putusan | Catatan |
|---|---|---|---|---|---|
| SD-1 | VO: bed tenang; non-VO: musik pegang struktur | V/88 -15,7 LUFS LRA 6,0 COCOK; FAMILI.md s4 (88: 84,5 bpm none, -13,2 dB, -0,9 dB) COCOK; V/96 -14,1, LRA 1,7, 117,5 bpm, 48% COCOK; V/37 pulse 0,03, musik hilang 42,6 COCOK; V/20,40,47,73 angka COCOK | `(belum didengar)` ok | LULUS | FAMILI memberi label musik 88 "epic trailer" (hipotesis earshot); jangan klaim "bed tenang" sbg fakta |
| SD-2 | Kata biasa senyap; SFX hanya benda/garis/UI | V/20 "teks tanpa klik/pop; SFX di transisi" COCOK; V/96 tanpa SFX terpisah COCOK (konsisten, bukan bukti); 88/40/73 nama file = T-card; V/37 glockenspiel/pop tiap kata/ikon muncul (20 event) sebagian; 80 (30 UI/pop) tidak jelas senyap | ok | LULUS DENGAN REVISI | Relabel nama file (`pop up.mp3`, `Scanning dan gerak kurva.mp3`, `Enter.mp3`) sbg rekomendasi adaptasi. Bukti teramati hanya 20 + 96 |
| SD-3 | Hard cut polaritas tanpa whoosh; whoosh hanya gerak cepat | V/96 "tidak ada SFX terpisah" (absen terdeteksi, bukan bukti "tanpa whoosh" -> turunkan klaim "7x tanpa whoosh sama sekali"); V/20 whoosh 15,4/swish 2,7 tempel sapuan COCOK; V/37 7 whoosh ganti adegan COCOK; V/80 4 whoosh pan cepat COCOK; slop S-A12, SFXIRFAN (Woosh, Wooshcamera..., scaningfast, Cutcontrast) COCOK; KF/96-k6, 88-k11 dibuka COCOK | ok | LULUS DENGAN REVISI | 88-k10/k11 scan "Scanning..." = T-card |
| SD-4 | Satu hantaman besar, kosongkan energi sebelum klimaks | V/37 musik stop 42,6 lalu drop 42,9 COCOK; KF/94-k13 vakum 0,45 + tier A -0,9 COCOK (V/94 ya, kartu lintas tema); V/47 jeda -27 dB sebagian; "maks 1-2x per video" TIDAK COCOK utk tema (37: 8 hit/3 +48 dB; 80: 19 hit/sub-drop); "40 1x basmenyebar", "73 1x Lasertransision" = T-card | ok | LULUS DENGAN REVISI | Hapus "maks 1-2x" sbg temuan tema (itu aturan M22/94). Pertahankan "kosongkan sebelum puncak" (37 + 94) |
| SD-5 | Puncak bunyi <=0,1-0,2 dtk dari visual; bunyi tutup gerak | V/96 selisih 1,1/1,02; 4,2/4,28; 10,4/10,34 COCOK; V/94 T4 COCOK; audio.md s14 (pin.mp3 0,41; basmenyebar 1,27) COCOK; SFX-01 ada di guide/sfx/GUIDE.md COCOK; "80 86%, 37 88% onset <=100 ms" tidak bermakna: 6,3 onset/dtk -> peluang kebetulan sekitar 70% (hitungan auditor); hanya 96 (19%) punya baseline | ok | LULUS DENGAN REVISI | Pakai 96 + 94 saja; "88 mulai +-3 f sebelum onset" = resep T-card |
| KT-1 | Poros 47-55% saat latar cepat; sisi lawan/pita atas saat objek besar | KF/88-k6,k7 COCOK; 96-k1/k4 COCOK (poros ~47%); 40-k4 COCOK; 80-k1/k3/k8 COCOK; 37-k3/k4 COCOK; 20-k8 COCOK; contoh-gagal/11 COCOK, 13 COCOK (TKS-14, bukan S-T8), 15 COCOK, 17 COCOK | ok | LULUS DENGAN REVISI | S-T9 (subtitle dihapus) salah utk "pita kedua"; S-T10 salah utk red zone (pakai S-V13, S-V23); S-T8 salah utk 13 (pakai TKS-14) |
| KT-2 | Nilai terang abu->penuh; swap token di baris tetap | 88-k6 COCOK; 96-k4 COCOK (11.2/11.5/12.6); 88-k9 COCOK ("Feeling" biru tenggelam); 73-k4 COCOK ("the" lebih rendah dari "by"); T07 ada | ok | LULUS DENGAN REVISI | "T01 translateY(6px->0)" TIDAK ada: T01 = naik 24-40 px dari mask. Sumber 6 px tidak ditemukan |
| KT-3 | Skala 1,8-4x; hero 19-52% H | 96-k3 COCOK (~53%); 37-k2 COCOK (~25-28%); 20-k2 COCOK (~38%); 80-k1 COCOK (~3,5x); 37-k4 COCOK (~2,6x); 40-k5 COCOK; 73 lintas-frame catatan benar (73-k3 satu baris) | ok | LULUS | Angka px tidak bisa diverifikasi |
| KT-4 | Satu keluarga sans; serif/script pengecualian | 88-k6,k7 COCOK; 73-k8 COCOK; 80-k3 COCOK; 20-k8 COCOK (script); 01, 12, 18 contoh COCOK | ok | LULUS DENGAN REVISI | Pola 88 (serif bold + sans sub + sans biru dalam satu kalimat, 88-k7) dan 73-k8 melanggar LANTAI A6; tulis eksplisit "lantai menang; boleh hanya bila tertulis di RESEP.md" |
| KT-5 | Teks terikat geometri/kamera (T22/T23/T17) | 88-k11 COCOK; 96-k2 COCOK; 37-k4 COCOK (teks bidang sisi gelap); 17-k5 sebagian (label kotak tanpa garis tipis); 12 sebagian | ok | LULUS DENGAN REVISI | T17 (teks di busur) tidak dipakai kartu mana pun; "1 hero motion/adegan (F4 butir 5)" dirujuk ke butir yang GAGAL (lihat F4 s2.1-5) |

Rekap F3b-editorial (10): LULUS 2 / LULUS DENGAN REVISI 8 / TURUN 0 / GAGAL 0.

---
## 3. F3-minimalist-dataviz-kinetic.md (0/4 bergerak; semua klaim gerak = hipotesis, ok)

Sumber (F1): 56 kreator tak tercantum, 57 tak diketahui, 58 GatesFX, 67 Island (33 juga brand Island).

| ID | Klaim ringkas | Bukti dibuka -> status | Label | Putusan | Catatan |
|---|---|---|---|---|---|
| D1 | Satu wadah 64-75% lebar, ruang negatif luas | 56-k3 COCOK (~56-65% w); 57-k3 COCOK (75%); 57-k6 COCOK (64%); 58-k5 sebagian (panel 64% tapi + beam + logo GATESFX); 67-k2 TIDAK COCOK utk angka 64-75% (kartu ~95% lebar, angka ~40% lebar) | ok | LULUS DENGAN REVISI | Tulis "wadah fokus 56-75% (56,57,58); 67 = kartu hampir penuh dgn inset 2,6%" |
| D2 | Maks 1 aksen aktif | 57-k4 COCOK (lime); 58-k5 COCOK (hijau); 67-k7 COCOK (mint di kartu ke-1); 67-k8 COCOK; 56-k5 TIDAK COCOK (batang merah+kuning+hijau, 3 warna jenuh) | ok | LULUS DENGAN REVISI | Pindahkan 56-k5 ke "kapan dilanggar" penuh, bukan bukti |
| D3 | Angka:label >=3x, label menempel | 57-k4 COCOK (~3,3x; label pojok blok, bukan dekat angka); 58-k5 COCOK; 67-k2 COCOK (~4,4x); 67-k7 COCOK; 57-k6 ~2,4x TIDAK >=3x; 56-k3 COCOK (pengecualian) | ok | LULUS DENGAN REVISI | Ganti ">=3x" jadi ">=2,4x (57-k6) s.d. 7x" |
| D4 | Grid <=20%, tanpa shadow/border berat | 56-k1 COCOK; 57-k3 COCOK; 58-k1 COCOK; 67-k3 COCOK; 67-k4 COCOK (dashed samar) | ok | LULUS | kotak "Match" 57-k3 punya border putih 2 px (kontur subjek morph, sudah dicatat sbg pengecualian) |
| D5 | Angka/batang boleh potong batas bila diikuti tampilan utuh | 67-k1 COCOK ($398M terpotong); 67-k2 COCOK; 67-k4 COCOK ($6.4B terpotong tepi kartu); 67-k5 COCOK; 56-k5 TIDAK COCOK (batang dan bola di dalam bingkai grid; tidak ada pemotongan); 33-k4 COCOK (kartu konteks, brand Island juga) | `(belum dilihat bergerak)` ok | TURUN JADI CATATAN | Hanya 67 (+33 brand sama). "Diikuti pull-back" (V/67 x0,45) = urutan belum terlihat |
| D6 | Ledakan 0,1-0,6 dtk + jeda terbaca | V/56 "aksi 0,4-0,6 lalu diam, tahan 1,3 / 1,1 dtk" COCOK; V/57 "0,1-0,4 -> diam 0,15-0,5" COCOK; V/67 pull-back 0,5 + push-in COCOK; 58 hard-cut belum dicek jam persisnya | hipotesis ok | LULUS | CURVE.land/whip/heavy = resep repo, bukan "terukur di vault" (redaksi "referensi terukur" salah) |
| D7 | Satu pembeda penekanan (warna ATAU serif italic) | 56-k5 COCOK (hanya warna); 67-k6 COCOK (italic saja); 67-k8 TIDAK COCOK (italic + mint sekaligus); 57-k6 TIDAK COCOK ("0 kotak": ada pil lime di belakang "2023"); 57-k4 blok lime bertulisan | ok | LULUS DENGAN REVISI | "ATAU" -> "umumnya satu; pengecualian tunggal 67-k8" |
| AC1 | Kartu bertumpuk repetitif (S-V8, D-024/D-026, L43) | 03 COCOK; behindwork D-24/D-26 COCOK; jadisatu-60s L43 TDB | - | LULUS DENGAN REVISI | "D-024/D-026" tulis `D-24/D-26` (behindwork) |
| AC2 | Inset kecil berbayangan (S-V4,D-028) | 20 COCOK; 16 COCOK (README: punchline di kotak kecil IG); D-28 COCOK; L73/M20 TDB | - | LULUS DENGAN REVISI | S-V4 salah ID -> S-V13 |
| AC3 | Label terpisah jauh (S-V6,V13,T10) | 17 COCOK; D-031, D-029 COCOK | - | LULUS DENGAN REVISI | S-V6, S-T10 salah |
| AC4 | Biru gelap/kaca (S-T5,V2,V18,V21) | 04 COCOK; 14 COCOK (README: pil kaca hampir tak terlihat; teks putih di baju motif); D-030, R-005, D-015, D-18 COCOK | - | LULUS DENGAN REVISI | S-V2 salah |
| AC5 | Serif + sans bold (S-T3, D-004) | 01 COCOK; D-004 COCOK | - | LULUS | - |
| AC6 | Angka 0->999 instan (M20, S-V11) | M20 TDB; S-V11 = "kamera datar", bukan angka melompat | - | LULUS DENGAN REVISI | S-V11 salah; rujuk LANTAI B13a |

Rekap F3-minimalist (13): LULUS 3 / LULUS DENGAN REVISI 9 / TURUN 1 / GAGAL 0.

---
## 4. F3b-minimalist-dataviz-kinetic-audio-kt.md (0/4 ya; ok)

| ID | Klaim ringkas | Bukti -> status | Label | Putusan | Catatan |
|---|---|---|---|---|---|
| SD-1 | Counter/judul senyap per digit; bunyi di pendaratan nilai | V/56 events di batang naik COCOK (19 event, hit 0,67, pop 3,01, riser 3,73...); V/58 9 UI ding/pop COCOK; V/67 "menyatu dgn musik, tak ada SFX terpisah" (tidak membuktikan senyap); "senyap per digit/Notif.mp3/Confirm" = T-card; "+-95.000/dtk", "50 huruf/dtk" ada di V/58, V/56 COCOK | ok | LULUS DENGAN REVISI | Ganti "creator tidak memasang klik" -> "event terdeteksi (earshot, hipotesis) mengelompok di perubahan keadaan; senyap-per-digit = rekomendasi repo" |
| SD-2 | Build singkat lalu 1-2 hantaman terkeras | V/56 riser 3,73 -> sub drop 4,01 -> stab 4,29, -1,3 dBFS (+14 dB), centroid 2,5->1,4 kHz COCOK; V/67 riser 1,01, stab +30 dB 4,56 & 13,29, riser 17,98 COCOK; 33/81 kartu lintas | ok | LULUS | - |
| SD-3 | Musik turun 0,3-0,6 dtk menjelang cut; putus penuh di logo | V/58 0,5 dtk @2,60, 0,4 dtk @8,90 COCOK (cut 3,27/9,27 tidak ditemukan lewat grep; TDB); V/67 stop 18,75, sunyi 2,3 dtk (-61 LUFS) COCOK; 33/81 lintas | ok | LULUS DENGAN REVISI | Bagian (a) turun-sebentar: 58 + 33 (+81) cukup. Bagian (b) putus-penuh hanya 67 -> catatan 1 kartu |
| SD-4 | Mode musik (56,67) vs konten (58) | V/56 112 bpm -14,2 LUFS LRA 1,3 COCOK; V/67 108-109 bpm, -14,0, LRA 6,1-7,7 COCOK; V/58 89 bpm -16,9 LRA 3,7 COCOK; "65%/100% dalam 100 ms" ada di V/67 COCOK | ok | LULUS | 58 true peak +0,6 dBFS sudah dicatat |
| SD-5 | Whoosh hanya gerak besar | V/67 6 whoosh (3,60-3,74, 12,39) + panel +16,6% COCOK; V/58 3 whoosh (7,37) COCOK; 56 nol whoosh (trivial); 33 13 whoosh lintas | ok | LULUS DENGAN REVISI | "tidak dipasang di hard cut" tidak teramati (hanya 2 dari 6 whoosh 67 dirinci). ">=150 ms attack" tidak kubuktikan |
| KT-1 | Dua tingkat >=3,2-7x + poros digit | 57-k4 COCOK; 58-k5 COCOK; 67-k2 COCOK; 67-k7 COCOK; 57-k6 TIDAK COCOK (~2,4x; plus label sumbu 0/25/50/75 = tingkat ketiga) | ok | LULUS DENGAN REVISI | ">=2,4-7x"; "tanpa ukuran menengah" gugur di 57-k6 |
| KT-2 | Label menempel / 1 garis rambut | 56-k3 COCOK; 57-k1 COCOK; 57-k4 sebagian (label di pojok blok, angka di dasar blok); 58-k5 COCOK; 67-k2 COCOK; 67-k4 COCOK (garis 1 px); 58-k2 "DISCIPLINE" bukan label data | ok | LULUS | - |
| KT-3 | Satu pembeda: warna ATAU serif italic | sama dgn D7 | ok | LULUS DENGAN REVISI | 67-k8 memakai keduanya (sudah diakui); "0 kotak belakang teks" salah utk 57-k6 |
| KT-4 | Editorial bleed terkendali | 67-k1/k2 dan k4/k5 COCOK; 56-k5 TIDAK COCOK; 33-k4 COCOK | ok | TURUN JADI CATATAN | Hanya 67 + 33 (sama-sama brand Island); header file menjanjikan "tidak bertumpu pada pasangan 67+33" tapi KT-4 persis begitu |
| KT-5 | Counter terkurva + jeda; nol crossfade | V/56 tahan 1,3/1,1, V/57, V/67 COCOK; kurva/`Penghitung.tsx` ada (ls) COCOK; CURVE.* = resep | hipotesis ok | LULUS | - |

Rekap F3b-minimalist (10): LULUS 4 / LULUS DENGAN REVISI 5 / TURUN 1 / GAGAL 0.

---
## 5. F4-inti.md

### 5a. Prinsip I1-I8 (klaim ">=3 tema" dicek terhadap keputusan F3 tiap tema)

| ID | Tema disebut -> didukung F3? | Kartu dibuka -> status | Putusan | Catatan |
|---|---|---|---|---|
| I1 ruang negatif 40-80% | apple (keputusan 2 "ruang >=60%") YA; editorial K1 YA; minimalist D1 YA; tactile (kanvas kertas 40-77% = tekstur, bukan ruang kosong) TIDAK; documentary TIDAK ADA; talking-head TIDAK ADA | 88-k6 COCOK; 80-k1 COCOK; 57-k3 COCOK; 63-k4 COCOK (kartu ~56% w); 97-k2 sebagian (kata kecil di tepi di kanvas putih); 83-k1 TIDAK COCOK (wajah memenuhi frame) | LULUS DENGAN REVISI | Tema -> 3 (apple, editorial, minimalist). Angka "jangkar 30-75%" + "kosong 40-80%" bisa >100% bila satuan beda (lebar vs area): tulis satuan |
| I2 skala dua kutub | doc K-04/K-06 YA; tactile 5 YA; apple 4 YA; minimalist YA; editorial K3 YA tapi 1,8x; talking-head 2/6 sebagian | 88-k7 COCOK (3,4x); 57-k4 COCOK (3,3x); 83-k8, 85-k9, 89-k2, 92-k1, 97-k4, 17-k1 TDB | LULUS DENGAN REVISI | Lantai "2,3x" bertabrakan dgn editorial 1,8-2x (37-k3 1,9x). Ubah ">=1,8x" atau keluarkan editorial |
| I3 kedalaman tanpa drop shadow | talking-head 2, apple 8, doc K-02, tactile 2-3, editorial K7: YA (5) | 80-k5 sebagian (blur ya, tetapi jendela+kartu BERBAYANG lembut); 19-k2 COCOK (spotlight blur); 83-k7 COCOK (matte nyata di frame 6; juga huruf gradien merah); 25-k4, 87-k9 TDB/non-relevan | LULUS DENGAN REVISI | Jangan jadikan 80-k5 bukti "tanpa shadow" |
| I4 audit kondisi bahan | talking-head 3 YA; doc K-05 YA; tactile 4 sebagian; apple TIDAK; editorial TIDAK | contoh-gagal 14, 18, 19 COCOK (README); 91, 92, 48, 85 TDB | LULUS DENGAN REVISI | Tema -> 3; hapus apple, editorial |
| I5 kunci jangkar saat latar cepat | doc K-07 YA; talking-head 1 YA; editorial (K2b/KT-1: 40, 73, 96) YA; apple TIDAK | 96-k1, 40-k4, 73-k1 COCOK; 90-k13, 86-k1, 77-k5, 91-k10 TDB | LULUS DENGAN REVISI | Hapus apple. `0,29-0,35 dtk/shot` 77 tidak diperiksa |
| I6 ritme napas | doc K-08 YA; minimalist D6 YA (hipotesis); tactile 6 sebagian (aditif, bukan hold); apple, talking-head TIDAK | 57-k4 (statis; gerak belum terlihat); 94-k13 = peta bunyi (vakum), bukan "jeda tekan 12f"; 97, 89, 92-k7, 04 TDB | TURUN JADI CATATAN | Hanya 2 tema bersih dan keduanya sebagian hipotesis |
| I7 ekonomi bunyi | apple 10 YA; tactile 8 YA; minimalist SD-1 YA; editorial SD-2 YA (editorial TIDAK disebut di F4); talking-head, doc: tidak diperiksa di F3 | 94-k13 COCOK (vakum -43..-55, 1 tier A); 93-k14, 97-k1, 98-k1, 89-k12, 90-k12 TDB | LULUS DENGAN REVISI | `(S-A4, S-A11, S-A12)` salah: S-A4 = "sepi tanpa SFX" (kebalikan), S-A12 = whoosh di cut. Pakai S-A11, S-A6. Level tick "-14...-20 dB" bertabrakan dgn LANTAI E24 "-12...-18 dB" (F4 s1 sendiri menulis -12...-18). "<=0,5 momen/dtk" tidak ditemukan |
| I8 integritas wadah UI/dokumen | apple YA; doc K-10 YA; editorial K6/AC6 YA; minimalist hanya anti-contoh | contoh-gagal 13, 20, 21 COCOK; 63-k5 COCOK (UI Claude asli, vektor); 80-k5 sebagian; 92-k7, 92-k12, 32-k6, 19-k1 TDB | LULUS DENGAN REVISI | Hapus minimalist; "S-T8" (13) salah -> TKS-14 |

### 5b. Larangan tambahan s2.1 (bukti kartu/contoh-gagal vs larangan)

| # | Larangan | Bukti dibuka -> status | Putusan | Catatan |
|---|---|---|---|---|
| 1 | Tak masuk dari scale(0)/ease-in | 94-k13 = peta bunyi, TIDAK COCOK; contoh-gagal/12 (huruf acak) TIDAK COCOK; 26-k12 dan 83-k7 sebagian (still tak bisa tunjukkan skala awal); curves.ts ada (CURVE.land = bezier(0,1;0,75;0,15;1)) COCOK utk "ease-out"; "0,85-0,92x" = T19 (0,85) + anti-slop-design (0,9), bukan kartu | TURUN JADI CATATAN | Dasar = repo + sumber eksternal |
| 2 | Tak ada emoji/glip sbg ikon | 63-k5 sebagian (ikon vektor); 72-k3 TIDAK COCOK (tak ada ikon); 96-k1 TIDAK COCOK; 96-k4 BERTENTANGAN (token emoji, dipuji di F3/F3b editorial) | GAGAL | Jika dipertahankan: "emoji dilarang sbg ikon/bullet sistem; boleh sbg token makna (96-k4)" |
| 3 | Tak mask lingkaran palsu & teks gradien | 19-k2 COCOK (spotlight nyata); 83-k7 COCOK utk matte, BERTENTANGAN utk gradien (huruf ONLINE gradien merah + glow); 02-k7 BERTENTANGAN (foto di bingkai oval; ini kolase tekstil); 57-k4 tak relevan; typography.md G8 mendefinisikan huruf gradien sbg gaya sah; 58-k2 gradien abu->putih | LULUS DENGAN REVISI | Pecah: (a) matte nyata, bukan lingkaran = ok; (b) gradien: "kecuali G8 (kilat cahaya)" |
| 4 | Tak ada penanda slide generik | 63-k4, 57-k3, 67-k2, 98-k2 hanya menunjukkan ABSEN; contoh-gagal/03 COCOK utk "kotak bertumpuk"; 01/02/03, panah, bilah aksen kiri tak ada buktinya | TURUN JADI CATATAN | - |
| 5 | Maks 1 hero motion/adegan | 88 (V/88: batang scan + irisan 0,12 dtk + teks tumbuh sekaligus) BERTENTANGAN; 93-k14 (huruf goyang + kamera + teks) BERTENTANGAN; 87-k9 (teks + glow + swap) BERTENTANGAN; 94-k13 tak relevan | GAGAL | Kartu bergerak justru memadukan beberapa gerak. Sumber hanya anti-slop-design s4 |
| 6 | Tak copy slop generik | 63-k5, 96-k4, 92-k7, 90-k13, contoh-gagal/13: tak satu pun menunjukkan frasa terlarang | GAGAL | Perlu contoh-gagal baru atau lepas dari F4 |
| 7 | Kontinuitas arah gerak + konsistensi tokoh | 88-k11 COCOK (busur dari kiri, teks tumbuh kiri->kanan); 95-rt2rj COCOK (monokrom ungu konsisten, ada di `sheets/`, bukan keyframes); 98-k2 TIDAK COCOK (headphone 3D, kotak karton, kuning/merah venn, makhluk kartun: gaya campur); 63-k4 tak relevan | TURUN JADI CATATAN | Dua klaim berbeda digabung |

### 5c. Tabel s1 rujukan LANTAI (kesetiaan ringkasan)

| ID LANTAI | Setia? | Catatan |
|---|---|---|
| A1,A3,A5 | YA | - |
| A2,C15,C16 | YA | A2 +-8%, C16 margin 5% sesuai |
| A4,A8 | SEBAGIAN | Rumus `>= max(0,8; 0,30 + 0,06 x huruf)` TIDAK ada di A8 (A8 hanya "tiap frasa tampil sampai selesai diucapkan"). Rumus ada di slop-catalog S-T12, yang memetakan ke A8. Relabel: "S-T12 (-> A8)" |
| A6 | YA | Tapi 88 dan 73-k8 melanggar A6 (lihat F3/F3b editorial) |
| A7,A9 | YA | A9: kotak hanya bila kontras gagal, sesuai |
| B10-B13a | YA | - |
| C14,C17,C18a,C18b | SEBAGIAN | C18a = "satu keluarga aksen dominan", bukan "1 warna per babak" |
| D19-D22c | YA | D20 frameless sesuai |
| E23-E25a | SEBAGIAN | LANTAI E25: bed ada sejak frame 0 dan "tidak pernah kosong di bawah klip"; pengecualian "jeda hening bermotivasi seperti 97" TIDAK ada di LANTAI. E24 tick -12...-18 dB (I7 tulis -14...-20) |
| F26-F29 | YA | - |

Rujukan pada ID S-A4 dalam I7: terkonfirmasi salah (S-A4 = teks/gerak tanpa SFX = sepi).

Rekap F4: I1-I8: LULUS 0 / LULUS DENGAN REVISI 7 / TURUN 1 / GAGAL 0. S2.1 (7 butir): LULUS 0 / LULUS DENGAN REVISI 1 / TURUN 3 (1,4,7) / GAGAL 3 (2,5,6).
Batas: kartu F4 bertanda TDB (83-k8, 85, 89, 92, 97, 91, 90, 86, 77, 48, 25, 32, 19-k1, 04, 98-k1) tidak kubuka; keputusan memakai bukti yang dibuka + cek silang F3 tema.

---
## Daftar TURUN / GAGAL

TURUN JADI CATATAN
- F3-minimalist D5: hanya 67 (+33 brand sama) yang COCOK; 56-k5 tidak memotong batas.
- F3b-minimalist KT-4: sama (67 + 33); 56-k5 salah.
- F4 I6: hanya 2 tema bersih (doc, minimalist-hipotesis), kartu 94 bukan "jeda tekan".
- F4 s2.1-1 (scale(0)/ease-in): kartu tak menunjukkan; dasar eksternal + repo.
- F4 s2.1-4 (penanda slide): bukti hanya ketiadaan; satu contoh-gagal.
- F4 s2.1-7 (arah/konsistensi): 98-k2 bertentangan; dua klaim tergabung.

GAGAL
- F4 s2.1-2 (emoji): 0 kartu cocok; 96-k4 (kartu rujukan sendiri) memakai emoji sbg token.
- F4 s2.1-5 (1 hero motion): kartu bergerak (88, 93, 87) justru multi-gerak.
- F4 s2.1-6 (copy slop): tak ada kartu/gambar yang menunjukkan larangan.

---
## Rekap total
- F3-editorial: LULUS 5 / LDR 10 / TURUN 0 / GAGAL 0
- F3b-editorial: LULUS 2 / LDR 8 / TURUN 0 / GAGAL 0
- F3-minimalist: LULUS 3 / LDR 9 / TURUN 1 / GAGAL 0
- F3b-minimalist: LULUS 4 / LDR 5 / TURUN 1 / GAGAL 0
- F4 I1-I8: LULUS 0 / LDR 7 / TURUN 1 / GAGAL 0
- F4 s2.1: LULUS 0 / LDR 1 / TURUN 3 / GAGAL 3
