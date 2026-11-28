---
name: sg-style-a-kolase
description: Pakai saat shotlist Soalnya Gini bergaya A-kolase; menerapkan mekanik kartu cookbook 95 (dari editing.mp4) dengan token Soalnya Gini dan tipografi yang lolos Lantai A6/A7.
---
# 04 · Gaya A: kolase cutout editorial (pengganti v1 "Einstein Editorial")

Referensi `editing.mp4` = file yang sama dengan kartu skill-development **95 Cutout-Collage Metaphor** (`cookbook/04-ui-cutout-dataviz-visuals/95-…md`, vault `_vault/03-spatial-and-ui-layouts/95-…md`). Baca kartu itu; skill ini hanya mencatat penyesuaian merek dan koreksi atas v1. Bukti per klaim: `BEDAH-REFERENSI.md` §1.

## 1. Yang dipinjam (mekanik, terbukti di video)
| Kode | Mekanik | Bukti | Cara di Remotion |
|---|---|---|---|
| A1 | Satu subjek cutout per komposisi, bayangan lembut, masuk `scale` 0,88→1 + rotasi −3°→0°, drift ±4 px saat tahan | 4,3 · 18,8 dtk; kartu 95 T1 | `CURVE.land`, `dur()`; drift `CURVE.drift` |
| A2 | Ganti komposisi dengan **potong di kanvas yang sama**, lalu benda baru datang | 21,0–21,3 dtk (`editing_trans_e4.jpg`) | `transisi_masuk.tipe: potong|drop-in`; kanvas tidak ikut berganti |
| A3 | Teks **diketik per huruf** saat diucapkan | 4,7–5,0 · 8,8–9,1 · 21,1–21,3 dtk | kode T dari `typography.md` §8 untuk ketik; waktu dari `words.json` |
| A4 | Orbit garis putus-putus melingkari subjek, digambar 12–18 frame | 4,3 · 24–25 · 41–46 dtk | SVG `strokeDashoffset`, `CURVE.reveal` |
| A5 | Aksen piksel: kursor piksel, kotak piksel larut di atas benda | 18–20 · 21,3–21,7 dtk; kartu 95 T2 | `$MG/remotion/Kursor.tsx`, `GridFlashReveal` |
| A6 | Kata kunci condensed tebal kapital + penekanan caps miring | 4,3 · 16–20 · 35–36 dtk | Plus Jakarta Sans 800 (tegak) dan 800 Italic untuk R6 |

## 2. Yang tidak dipinjam dan gantinya
| Referensi / v1 | Masalah | v2 |
|---|---|---|
| Kanvas radial gradien periwinkle (v1 L10, design-tokens L49–53) | plan §2.3 melarang gradasi ungu/biru; anti-slop §1; S-V21; tepi gelap di latar terang = S-V18 | Kabut `#E9EDF2` datar + jaring halus tinta opacity ±0,06 sebagai lapisan SVG (bukan gradien). Varian setia periwinkle hanya bila Irfan memilihnya (K-04) dan dicatat sebagai pengecualian di RESEP. |
| Kata sambung "Instrument Serif Italic" 36–44 px sebaris dengan kata kunci (v1 L23–25) | Referensinya ternyata sans miring, bukan serif; sebaris beda ukuran bentrok Lantai A6; 36–44 px < 56 px Lantai A7; vibedesign `guide/tipografi/GUIDE.md` L12 (serif tipis jomplang di antara sans tebal) | **Tumpuk baris**: kata sambung di barisnya sendiri di atas/bawah kata kunci (pola yang juga ada di referensi: "When the / SHORTCUT" 35,8 dtk, "Right now, / THOUSANDS" 40 dtk). Satu keluarga (Plus Jakarta Sans): sambung 500 Italic **56 px**, kunci 800 **96–120 px** (rasio ±2,1× seperti referensi). Warna teks: tinta; penekanan warna `tekan` #1F4FCC (Biru Gini murni 3,8:1 gagal kontras di Kabut). |
| Scale punch 0,92→1,04→1,0 dan whip-slide 6 frame (v1 L18, L28) | Tidak ada di referensi | A2 (potong di kanvas sama + benda datang). Whip boleh bila hubungan ruangnya "ganti topik" (Lantai B13). |
| Benda diwarnai lavender | Palet referensi | Cutout duotone tinta–putih; Biru Gini hanya untuk "yang sedang dijelaskan" (REFERENSI.md §E butir 4) |

## 3. Aset cutout
- Foto sumber: milik sendiri, domain publik, atau berlisensi jelas; catat di `merek/soalnya-gini/aset/gaya/LISENSI.md` (sumber, lisensi, tanggal). Tanpa logo merek asli (plan §3).
- Dilarang: render 3D AI untuk cutout tanpa persetujuan (kartu 95 Anti-Pattern; MOTION-CORE §1 "larangan 3D AI"); orang foto-realistis buatan AI (kebijakan sintetis YouTube, README §6).
- Tepi cutout dicek di still 100 % (kartu 95 Gate).

## 4. Gerbang gaya A
- `python3 $MG/gate/cek_komposisi.py` (lewat `render.sh`): TEPI, WAJAH, ASET.
- `lego/kt_check.py` untuk teks.json; `tema_cek.py`; `motion_lint.py`.
- Golden frame gaya A disetujui Irfan sebelum episode A pertama (`merek/soalnya-gini/contoh/bagus/README.md`), lalu `tools/golden_cek.py` tiap beat.
