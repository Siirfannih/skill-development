# JURI v2 · Builder trap r2 (14 Nov) · still `qc/stills/JB01–JB26.png`, lembar `qc/sanding.jpg` vs kiblat 55

Juri v1 (`JURI-v1.md`) meluluskan v1 padahal narasi 34–58 px, 11 sisipan wajah ber-crop sama, dan babak 3 biru (R-005) — ditemukan di evaluasi mandiri 13 Nov (`handoff/REVIEW-v1-self.md`). Juri ini menilai ulang dengan butir itu eksplisit.

## Perbaikan v1 → v2 (bukti still)
| Temuan | Status v2 | Bukti |
|---|---|---|
| F-v1-01 babak 3 biru (R-005, aturan 15) | LULUS: gelap netral `#0E0E10→#1B1B1F`, biru ≤ 3 % (sisa = link/ring UI GitHub asli) | JB15–JB22 |
| F-v1-02 teks kecil | LULUS: narasi ≥ 56 px, kunci ≥ 96 px (ukur render debug r3a/r3b) | JB04, JB07, JB16–18, JB21 |
| F-v1-03 wajah seragam | LULUS: crop M/T/P/F bergantian, tak ada dua sisipan berurutan sama; wajah medium hanya klimaks B23 + penutup B26 | JB04, JB07, JB11, JB16, JB21, JB23, JB26 |
| F-v1-04 UI tanpa fokus | LULUS: prompt ChatGPT 9,5 %, Create repository 9,5 %, Releases 17,5 %, "No threads yet" 6,2 % tinggi | JB12, JB19, JB20, JB22 |
| F-v1-05 teks melayang | LULUS: teks menempel foto/kartu/UI | JB06, JB08, JB14, JB20 |
| F-v1-06 kerapian | LULUS: sisa mosaik hilang, triad tanpa celah/kata basi, form tidak terpotong | JB06, JB17, JB18, JB19 |
| F-v1-07 benda hitam B21 | LULUS | JB21 |
| F-r3b-01 teks menumpuk kotak Releases saat punch | LULUS: jarak 86–92 px layar f1884–1905 | `qc/stills_r3b/r3c_B20_*.png` |

## Cek kemiripan kartu 55
| Butir | Hasil | Bukti |
|---|---|---|
| Babak berganti material + grade | LULUS (kertas + arsip → linen + cetakan → UI terang → dinding bukti → dinding gelap netral → terang) | JB01, JB06, JB14, JB15, JB24 |
| K3 triad: kepala tetap, kunci diganti, kunci beraksen | LULUS (terang: aksen `#1A3AD0`; gelap: kepala abu, kunci putih) | JB02–03, JB16–18 |
| Teks tumpuk samping subjek | LULUS | JB04, JB07, JB21, JB23 |
| Material kiblat (alas hijau, gabus oranye, grade merah twist) | DISESUAIKAN: palet brief Irfan R-009 "putih utama + aksen" menang; twist = gelap netral (R-005) | RESEP §Warna |
| Kartu judul satu kata | SEBAGIAN: "mempublikasikan" 15 huruf, ±16 % tinggi | JB05 |
| Teks di belakang kepala | TIDAK DIPAKAI (tanpa matte wajah) | — |

## Lantai A–D
A1–A9 LULUS (satu lapisan teks, posisi dari komposisi, ≤ 2 baris, ukuran ≥ lantai, kontras). B10–B13 LULUS (tiap shot bergerak, punch ke objek fokus, transisi bergerak). C14–C18 LULUS (fokus tunggal, tidak menumpuk — JB20 diperbaiki r3c, tepi: 'ids' JB22 terpotong karena punch kamera). D19–D22 LULUS (visual = ucapan, UI/logo asli, wajah tiap 3–5 dtk, tanpa placeholder).

## Tanda teks_cek (5) — semua teks UI asli, bukan narasi
JB10 kata ganda di hasil YouTube; JB17 "save" di dialog Threads; JB22 "ids" tab terpotong saat punch.

## Audio (dinilai terpisah, koreksi Irfan 13 Nov)
`sfx_density.py --ref-density 0.65` PASS (49 cue, 0,52/dtk, 0 bunyi per kata) · `pause_clean.py` PASS (jeda −64,3 dBFS, 46 dB di bawah ucapan) · `voice_fidelity.py` PASS (udara 0,85, ΔLRA 0).

PUTUSAN: LULUS
