# Teks di layar: kapan, huruf, posisi, keterbacaan, gerak

Dibuka saat mengatur teks layar (langkah 4-6 alur `SKILL.md`). Butir lama LANTAI A2-A9a ada di sini dengan alasannya; bunyi aslinya di `archive/riwayat/LANTAI.md`. Sistem huruf diatur NEGATIF 1 dan tidak diulang. Angka ukuran dan kontras hanya ditulis di sini; dokumen lain merujuk ke sini.

## Kapan teks tampil: keputusan per beat (NEGATIF 6)
- Tiap beat di tabel storyboard punya mode dan alasan satu baris. **TEKS**: teks adalah isi beat (a: teks itu subjeknya, yaitu diketik, disunting, kata milik produk; b: penanda hook atau babak; c: angka atau kata yang tak bisa ditunjukkan visual; d: CTA). **VISUAL**: VO + visual membawa beat, tanpa teks. **MENYATU**: teks adalah bagian objek (label, UI, huruf yang disunting), bukan lapisan sendiri.
- Dengan referensi, porsi mengikuti REF-SPEC §2a "porsi teks" (% frame berteks, kapan, peran, ukuran). Tanpa referensi, default VISUAL; teks dipilih hanya lewat a-d. Alasan: teks yang menyalin ucapan terbaca sebagai subtitle dan berebut mata dengan visual.
- Video tanpa narator: teks adalah naskahnya, tampil tiap beat.
- Teks yang tampil adalah satu sistem: tanpa subtitle terpisah di pita bawah (pita hanya untuk label identitas non-ucapan yang muncul sekali), tanpa dua lapisan teks sekaligus. Kata yang sudah jadi penekanan tidak diulang di tempat lain pada saat yang sama. Alasan: dua lapisan berebut mata; pengulangan terbaca sebagai salah ketik.
- Teks hanya dari ucapan atau dari isi produk yang ditunjukkan; tidak menambah kalimat atau angka yang tidak diucapkan kecuali ia isi UI/prompt yang sedang ditunjukkan.
- Cek: beat VISUAL tidak punya blok teks (`teks_plan.py --beats`, `kt_check.py --beats`).

## Huruf
Font datang dari referensi/brief user atau profil merek; verifikasi PostScript name sebelum build. Font termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem; build gagal bila font tidak ditemukan. Peran di bawah adalah titik awal; ukuran dari REF-SPEC menang.

| Peran | Fungsi | Contoh (profil merek Jadisatu) | Ukuran @1080 |
|---|---|---|---|
| Display/Kunci | Kata kunci, slam | Inter Black 900 (atau Neue Haas Grotesk Display 95) | 200–320 px |
| Headline | Kata utama | Inter ExtraBold 800 / NHG 65 | 110–170 px |
| Sambung/Body | Pengantar, penjelas | Inter Medium 500 / NHG 45 | ≥ 56 px (56–80) |
| Data | Angka, kode | Silkscreen (dunia pixel) / JetBrains Mono (UI) | 60–140 px, digit tabular (`tabular-nums`) supaya lebar tidak bergoyang |
| Label | Kategori, callout | JetBrains Mono / Inter SemiBold | 36–48 px |

- Aksen (satu kata emosional) tetap di keluarga yang sama: bobot paling kontras, KAPITAL, 1,5–2× headline di barisnya sendiri, atau warna aksen. Huruf kedua hanya sebagai sistem (NEGATIF 1). Karya di dalam dunia video (iklan, poster, UI di layar) memakai huruf aslinya: itu isi.
- Teks non-Latin atau RTL: keluarga yang mendukung aksara itu; arah baca dan animasi per kata mengikuti arah tulis, tidak dipecah per huruf.
- Sentence case untuk narasi. KAPITAL hanya untuk kata vonis 1-2 kata (slam) dan label kategori mono (tracking +100…+200); tanpa paragraf kapital. Satu kebiasaan tanda baca per proyek.
- Warna: satu kata aksen per frase, hex dari palet proyek (`warna.md`).

## Posisi (A2)
- Posisi lahir dari komposisi tiap shot: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Pola yang sering cocok: di belakang tokoh (sampul majalah, dipotong siluet), tengah melebar dengan latar diredupkan (puncak), tengah bawah satu baris (emosi), tengah atas kecil (pengantar), menempel objek (diegetik), ruang negatif samping subjek (subjek tunggal, teks satu-satunya bacaan). Tiga tampilan berturut-turut di pita yang sama tanpa alasan komposisi terbaca sebagai template.
- Jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi daripada ke subjek. Alasan: teks yang jauh dari subjeknya terbaca sebagai bagian terpisah. Cek: `tabrakan_cek.py`, `cek_komposisi.py`.
- Teks tidak menutupi wajah atau subjek. Objek boleh menutup ≤ 10 % huruf, bukan huruf pertama, dan tidak selama jeda baca.
- Ruang kosong dibiarkan kosong, tidak diisi dekorasi; teks dan visual tidak berebut.

## Ukuran dan bentuk blok (A4, A6, A8)
- Dua kutub ukuran dan lompatan skala: `dunia-visual.md` §4 butir 2. Kalimat sambung ≥ 56 px @1080; lantai keterbacaan di bagian Keterbacaan.
- Maksimal 2 baris (patah di jeda makna) dan 1-3 kata per tampil; blok seimbang (baris terpendek ≥ 85 % baris terpanjang), tidak terpotong tepi, tanpa kata yatim. Tumpuk kata (satu kata per baris) boleh. Tanda tanya tampil saat pembicara bertanya. Alasan: di HP lebih dari tiga kata tidak terbaca sebelum hilang.
- Satu baris satu ukuran dan satu sistem penekanan; kata yang dibesarkan pindah ke barisnya sendiri. Kata terpenting masuk terakhir dan berbeda.
- Satu arah baca; tiap frasa tampil sampai selesai diucapkan.

## Keterbacaan (A7)
- Kontras ≥ 4,5 : 1, tanpa halo atau glow di belakang teks; bayangan teks hanya bila bagian dari sistem material (satu arah cahaya). Uji lebar 360 px; teks kunci tidak duduk di 8 % bawah frame (area UI platform).
- Teks biru di latar gelap atau navy gagal kontras (±3,6 : 1). Di latar gelap, penekanan lewat putih penuh vs redup, ketebalan, skala, atau kapital.
- **Lantai keterbacaan:** teks yang dimaksudkan untuk dibaca (label, caption mono, teks bukti UI) ≥ ~24 px @1080 saat tampil, atau kamera masuk sampai ukuran itu tercapai. Lebih kecil hanya tekstur dan tidak membawa makna. Alasan: di HP, 24 px @1080 batas terbaca dalam sekejap.
- Keterbacaan diselesaikan dengan komposisi dulu: pindah ke ruang kosong, geser kamera, atau redupkan latar. Kotak, stabilo, atau scrim hanya bila kontras tetap gagal, bukan hiasan (`decision-guide.md` §4); narasi kinetik tanpa kotak atau shape.
- Blur tidak pernah pada teks atau isi yang dibaca (`dunia-visual.md` §4 butir 7). Yang terbaca sebagai slop: glitch pengacak huruf, teks menabrak teks atau objek, font berganti di tengah kata atau adegan.

## Teks 3D
- Default teks datar: bidang solid yang tajam; kedalaman datang dari susunan (skala, overlap, parallax lapis) dan gerak kamera. Di AE: kamera bergerak melewati lapisan teks, tanpa animator 3D per karakter kecuali diminta.
- Teks bervolume (extrude/bevel/emboss) sah bila ada di REF-SPEC atau diminta user, dengan alasan tertulis: 1–2 kata hero per video, satu arah cahaya dengan objek lain, divalidasi berdampingan dengan frame referensi di TYPE-TEST. Teks yang "tidur di lantai lalu diangkat" bukan 3D yang dimaksud.

## Gaya teks G (TYPE-TEST)
| Kode | Gaya | Spesifikasi |
|---|---|---|
| G1 | Slam | Display L–XL, tracking −20, satu baris; masuk T03 + shake; keluar T15/T14 |
| G2 | Headline | Maksimal 2 baris; kata kuncinya G3 |
| G3 | Aksen sans | Satu kata per kalimat, masuk terakhir: Black/KAPITAL atau 1,5–2× di barisnya sendiri |
| G4 | Color flash (acuan Baikov "What makes your company unique?") | Isi huruf warna aksen + motion blur geraknya, tahan ±6 f, settle ke warna dasar 2–3 f; keluar kebalikannya. Tanpa stroke, glow, bayangan. SFX satu pop kecil per kata |
| G5 | Berperspektif | Layer 3D menempel bidang ruang (rotasi X 55–70°); blur hanya dari gerak/DoF kamera |
| G6 | Dalam adegan | Di antara latar dan objek depan (satu ruang) |
| G7 | Label/pil | SemiBold XS–S, pil rounded; tidak jadi fokus kedua sejajar headline |
| G8 | Kilat cahaya (acuan siirfannih_DfRh4w0SfAk "Golden rule") | Gradien, pita cahaya, glow sah bila ada di REF-SPEC dengan alasan (mis. kata emosi naik) dan satu keluarga hue. Tanpa REF-SPEC: satu kata hero diberi penekanan sekali (aksen solid + gerak `land`), ≤ 1 per 10 dtk; `scripts/remotion/LightSweep.tsx` tidak dipakai default. Bukan footage/tekstur di dalam huruf |

## Gerak teks per peran (T dan G, A9a)
Peran dibedakan lewat gerak; peran yang sama bergerak sama di seluruh video. Isi teks = ucapan hanya di beat TEKS; `scripts/lego/teks_plan.py --beats beats.json` menghitung waktu dan durasi (beat VISUAL dilewati). Per blok diputuskan **peran → gerak T → gaya G → posisi**, ditulis di `teks.json` dengan alasannya. Fade hanya untuk peran `sub` (eyebrow/sub-line kecil); opacity saja tidak dihitung animasi.

| Situasi kalimat | Peran | Pilih A bila… | Pilih B bila… | Pilih C bila… |
|---|---|---|---|---|
| Narasi berjalan | R1 | T19 word-pop: tempo cepat | T01 word rise: tenang/serius | T28 flip-up X: kiblat 2.5D/3D, kata pendek |
| Kata hero (emosi) | R6, ≤ 2× per video | T02 blur-to-focus + G8: emosi naik | T04 scale-down: kata sendiri di layar penuh | T03 slam: kejutan |
| Kata kunci di narasi | R2 | G4/T20 color flash | T03 slam kecil: klaim tegas | T13 tracking converge: dua hal menyatu |
| Klaim keras | R3 | T03 + shake | T25 chaotic: frustrasi | T14 letter scatter: runtuh/hilang |
| Angka, persen, uang | R2 | T16 counter | T27 naik dari bar | — |
| Daftar, langkah | R4 | T10 card stack / G7 pil | T09 sticker drop: ringan | T18 silinder: daftar panjang |
| A berganti B | R2 | T07 slot swap | T32 word swap 3D | T24 anchor word |
| Layar aplikasi / prompt | R5 | T11 typewriter | T12 big type typing | T21 decode: data teknis |
| Label pada objek | R4 | T23 diegetik + garis tipis | G6 dalam adegan | — |

Huruf per huruf hanya bila maknanya "sedang terbentuk": diketik (T11), terbalik (T28 per karakter), runtuh (T14).

| Kode | Nama | Cara kerja & angka (@30 fps) | Build AE |
|---|---|---|---|
| T01 | Word rise | Per kata naik 24–40 px dari mask garis dasar, 10–14 f, stagger 2–3 f (±1 f), tanpa overshoot; huruf mulai ≥ 140 % tingginya di bawah mask | Animator Position Y + Opacity, per kata |
| T02 | Blur-to-focus | 12→0 px dalam 3 f, kata pertama frase reflektif; ≤ 1 per 15 dtk | + Blur |
| T03 | Slam | f1 2.0× + rotasi Y ±15° → f2 1.3× → f3 1.0×, motion blur, impact −1…−2 f; ≤ 1 per frase | Scale + Rotation Y |
| T04 | Scale-down settle | 300 %→100 % dalam 8–10 f, ease out kuat | Scale |
| T05 | Marquee select & fill | Kotak dashed (Trim Paths 8 f) → fill 4 f → klik | Shape + Trim Paths |
| T06 | Cursor activate | Kursor melengkung, melambat, klik 100→85→100 (4 f) + ripple 10 f | Path + ripple |
| T07 | Slot swap | Kata lama keluar ke atas, baru dari bawah, 3–4 f, hold 10–15 f, makin cepat; lama ≥ 95 % hilang sebelum baru mendarat | Layer per varian + mask |
| T08 | Inline icon | Ikon 0,9–1,3× cap-height di antara kata, pop 0→110→100 + rotasi −12→0 (10 f), boleh shuffle tiap 2 f selama 8–12 f | Scale/Rotation |
| T09 | Sticker drop | Jatuh, bounce kecil, miring ±3–8°, stagger 3–5 f | Bounce expression |
| T10 | Card stack | Kartu kata jatuh bertumpuk Y −60, rotasi ±5°, 8 f per kartu | Layer + drop shadow lembut |
| T11 | Typewriter UI | 1–2 karakter/f + caret; hanya UI/prompt, tidak headline naratif; satu bunyi ketik per kata atau tombol | Source Text expression |
| T12 | Big type typing | Cut ke close-up raksasa teks yang diketik, kamera ikut caret, 1–1,5 dtk | Duplikat layer, scale 600–1000 % |
| T13 | Tracking converge | 2 kata berjarak ±40 % lebar merapat, 15 f ease-out | Tracking |
| T14 | Letter scatter | Huruf lepas dan jatuh dengan rotasi dan gravitasi, 12–20 f (bukan glitch) | Per-char Position/Rotation |
| T15 | Smear exit | Scale X 100→160 + directional blur, 4–6 f | Directional Blur |
| T16 | Counter | Roll ease-out expo 12–27 f, boleh lewat target +15–20 % lalu settle; tick roll + lock | Slider + `Math.round` |
| T17 | Text on arc | Kalimat mengikuti busur | Path Options |
| T18 | Silinder | Daftar pada roda, step-rotate 15–25 f, item aktif ganti warna | 3D per-char + rotasi X |
| T19 | Word-pop ikut VO | +1…+4 f setelah onset kata VO; 3–4 f scale 0.85→1 + naik ½ cap-height | Marker dari timestamp VO |
| T20 | Color flash/settle | Gerak untuk G4: travel ±110 px + motion blur; waktu warna (tahan, settle) dari G4 | Fill Color animator |
| T21 | Decode data | Digit mono/pixel → glitch 1–2 f → kata, ±5 f (hanya kata teknis/angka) | Source Text |
| T22 | World-locked | Teks sebagai objek di ruang kamera; saat dolly-in skala teks ≤ 1,06× supaya tidak menabrak tokoh | Layer 3D + kamera |
| T23 | Diegetik | Label menempel objek dengan garis tipis, mono 36–48 px | Parent ke objek |
| T24 | Anchor word | Satu kata besar tetap, latar berganti tiap 14–22 f | — |
| T25 | Chaotic | Bergetar 2–4 px 8 Hz, 2–3 lapis, ≤ 1,5 dtk | Wiggle |
| T26 | Distorsi + transisi | Mosaik/pixelate menyatu dengan transisi blok, 5–6 f | Mosaic |
| T27 | Naik dari objek | Huruf naik dari bar dengan tinggi acak lalu terkunci, ±20 f | Per-char Position |
| T28 | Flip-up X | Rotasi X 90°→0 pivot baseline, stagger 2–3 f, 8–12 f, expo-out tanpa overshoot | Per-char 3D, Rotation X |
| T29 | Swing Y | Rotasi Y ±60–75°→0 dari tepi kiri, 10–14 f | Rotation Y, anchor kiri |
| T30 | Spin Z + scale | Rotasi Z ±20–45° + scale 0.6→1, 8–10 f, kata hero | Rotation Z |
| T31 | Depth push | Dari Z jauh ke bidang fokus, lapis berbeda kedalaman paralaks dengan kamera | Position Z + kamera |
| T32 | Word swap 3D | Kata lama flip menjauh di X, baru flip masuk (carousel) | Dua layer, Rotation X |

Memakainya:
- Variasi datang dari peran, bukan dari mengacak gerak: satu peran = satu gerak, dan karena ada kata kunci, hero, angka, atau daftar di antara narasi, tiap 15 dtk biasanya berisi ≥ 3 gerak berbeda dan ≥ 1 penekanan; adegan tenang boleh kurang dengan alasan tertulis. Teknik penekanan yang sama paling banyak 2× berturut. Cek: `scripts/lego/kt_check.py teks.json`.
- Masuk lebih lambat dari keluar (masuk 8–14 f, keluar 4–8 f). Kartu yang dipakai di `RESEP.md` boleh memberi angkanya sendiri (kartu 83: masuk 2–4 f); kapan teks masuk tetap dari timestamp kata di audio.
- Teks keluar bersama transisi shot (2–6 f) atau lewat mask 4–6 f, tidak fade, juga di talking head. Pengecualian: adegan tenang non-talking-head boleh fade 2D untuk kalimat serius ("Hasilnya harus terbukti.").
- Hold teks dihitung per bagian: kartu menentukan bentuk hitungan (per kata atau per frasa), nilainya dari kata di audio video ini. Gaya kata-per-kata (kartu 83): 0,25 dtk + 0,3 dtk/kata (`teks_plan.py`).
- Swap berurutan: yang lama keluar penuh sebelum yang baru mendarat. Tanpa overshoot pada teks besar.
- Efek pada huruf adalah gaya terdefinisi (mis. G8), bukan footage atau tekstur yang dimasukkan ke huruf.

Dilihat per lapis: teks adalah L2 (`scripts/lihat.py`); tabrakan dengan objek diperiksa `scripts/gate/tabrakan_cek.py`. Kurva dan pegas: `kamera-gerak.md`.
