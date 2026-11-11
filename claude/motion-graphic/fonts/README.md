# Fonts: file, pengganti, dan kapan dipakai

Jenis huruf ditentukan **kartu kiblat**. Folder ini memastikan font itu benar-benar ada saat render, dan memberi panduan memilih bila kartu hanya menyebut wataknya. Nama font di kartu adalah "paling mirip" dari pengamatan frame, bukan identifikasi pasti.

## Cara memakai di proyek Remotion
1. Salin folder font yang dipakai ke `public/fonts/` proyek (mis. `cp -r fonts/inter fonts/instrument-serif <proyek>/public/fonts/`), dan salin baris `@font-face`-nya dari `fonts.css`.
2. Muat sebelum render (`loadFont`/`FontFace` + `delayRender`), jangan mengandalkan font sistem: PC server hanya punya 3 keluarga font terpasang (cek 12 Nov).
3. Cek still pertama: bentuk huruf harus sama dengan frame kiblat. Huruf jatuh ke font cadangan = gagal Lantai A7.

## A. Ada di repo (lisensi OFL, boleh dibagikan)
| Font | Folder | Bobot |
|---|---|---|
| Anton | `anton/` | 400 |
| Archivo | `archivo/` | 100–900 |
| Archivo Black | `archivo-black/` | 400 |
| Bebas Neue | `bebas-neue/` | 400 |
| Bricolage Grotesque | `bricolage-grotesque/` | 200–800 |
| DM Sans | `dm-sans/` | 100–900 |
| Fraunces | `fraunces/` | 100–900 |
| Geist | `geist/` | 100–900 |
| IBM Plex Mono | `ibm-plex-mono/` | 100–700 |
| Instrument Serif | `instrument-serif/` | 400 + italic |
| Inter | `inter/` | 100–900 + italic |
| JetBrains Mono | `jetbrains-mono/` | 100–800 |
| Manrope | `manrope/` | 200–800 |
| Montserrat | `montserrat/` | 100–900 |
| Oswald | `oswald/` | 200–700 |
| Playfair Display | `playfair-display/` | 400–900 + italic |
| Poppins | `poppins/` | 100–900 + italic |
| Roboto | `roboto/` | 100–900 |
| Source Serif 4 | `source-serif-4/` | 200–900 |
| Space Grotesk | `space-grotesk/` | 300–700 |

File: woff2 subset latin dari paket `@fontsource/*`. `fonts.css` dibuat otomatis.

## B. Hanya di PC server: `~/fonts-lokal/` (lisensi tidak mengizinkan dibagikan di repo publik)
| Font | Sumber | Bila tidak ada, pakai |
|---|---|---|
| SF Pro Display | file dari Irfan (12 Nov) | Inter |
| Helvetica Neue | file dari Irfan (12 Nov) | Inter (tracking −1 sampai −2 %) |
| Satoshi, General Sans, Clash Display | Fontshare (gratis, unduh resmi) | Manrope / DM Sans; Clash → Bricolage Grotesque 700–800 |
| Gilroy | belum ada file berlisensi | Montserrat 700–800 atau Archivo Black |
| Druk (Condensed/Wide) | belum ada | Anton (condensed); Archivo Black (lebar) |
| Aeonik, Suisse Int'l | belum ada | Inter 400–500 atau Manrope |
| PP Editorial New | belum ada | Instrument Serif |

Kartu tetap menyebut font aslinya; resep menulis font yang benar-benar dipakai.

## C. Kapan dipakai: peran huruf yang muncul di kartu
Ini rangkuman dari 78 kartu (Irfan minta 12 Nov), bukan aturan baru: kiblat tetap menang. Angka dalam kurung = nomor kartu tempat peran itu terlihat.

| Peran | Watak | Font | Terlihat di | Dipakai saat |
|---|---|---|---|---|
| Narasi / kalimat | sans grotesk netral, Medium–Bold, tracking rapat | Inter, SF Pro, Helvetica Neue | 07, 15, 18, 22, 26, 54, 61 | hampir semua gaya; kalimat yang dibaca berurutan, UI tiruan, teks di atas footage |
| Narasi tenang "produk" | grotesk geometris Regular–Medium, **tidak pernah bold** | Inter 400–500, Manrope, (Aeonik, Suisse, Satoshi, General Sans) | 17, 30, 33, 67, 68, 72 | product film, launch, gaya Apple/SaaS; penekanan lewat warna atau serif italic, bukan ketebalan |
| Kata istimewa editorial | serif kontras tinggi, **italic**, satu–dua kata saja | Instrument Serif Italic, Playfair Display Italic | 04, 16, 18, 29, 33, 46, 67, 80 | nama, istilah, kata yang ingin terasa "ditulis"; selalu berpasangan dengan sans narasi dan tidak sama kuat dengannya (Lantai A6) |
| Seluruh teks serif | serif kondensasi satu keluarga, roman kapital + italic kecil | Instrument Serif | 19, 48 | brand story, cohort/komunitas, nada tenang dan mahal; tanpa sans sama sekali |
| Kata vonis / raksasa | condensed sangat tebal, KAPITAL | Anton, Bebas Neue, Oswald 600–700, (Druk Condensed) | 02, 03, 05, 27, 37, 47, 59, 61, 66 | satu kata yang dihantam ("WRONG", "WIN"), kata di belakang subjek, stiker kata kunci; bukan untuk kalimat |
| Kata lebar berat | grotesk black lebar | Archivo Black, Montserrat 800, (Druk Wide, Gilroy) | 03, 08, 27, 54 | dicampur dengan condensed dalam satu layar tipografi penuh; angka tahun/tanggal raksasa (82) |
| Narasi ramah bulat | geometris tebal bulat | Poppins 600–700, Montserrat, (Gilroy, Clash Display) | 20, 37, 59, 73, 82 | explainer ringan, motion 2D, angka dan label infografik |
| Grotesk berkarakter | ujung bulat, "t" berkait | Bricolage Grotesque | 43 | vlog/tantangan harian; caption SemiBold + kata raksasa Bold |
| Kode / label data | monospace kecil | JetBrains Mono, IBM Plex Mono | 16, 17, 35 | label chart, angka uang, potongan kode; tidak untuk kalimat |

Pola yang berulang di kartu:
- **Dua keluarga per video** adalah yang paling sering (sans narasi + satu suara penekanan). Tiga atau lebih hanya di gaya yang memang "kolase" (02, 26, 27, 47, 59) dan di sana tiap keluarga punya satu tugas tetap.
- **Penekanan dipilih satu cara per video**: ketebalan (Regular → Bold), atau jenis (sans → serif italic), atau ukuran (kata sambung → kata kunci 5–8×). Kartu yang tenang (30, 33, 67) tidak memakai bold sama sekali.
- **Condensed tebal selalu kapital dan selalu pendek** (1–2 kata). Serif italic selalu huruf kecil.
- **Contoh gagal**: serif italic tipis pucat dibesarkan sampai tepi frame (`../pustaka/contoh-gagal/01-serif-pucat-raksasa.jpg`). Yang salah kontras, skala, dan hubungannya dengan frame, bukan serif-nya.
