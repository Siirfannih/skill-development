# Arsip bedah: 90-imzache.mp4 (kartu 90)

Arsip audit dan R&D. **Tidak dimuat di sesi editing.**

## Metadata (measured)
- 720x1280, r_frame_rate 30/1. Jendela 8,5–10,2 dtk (51 frame).
- Frame duplikat: hanya f41–44 berurutan (footage hampir diam), bukan pola animasi ber-fps rendah.
- Audio tidak dibedah.

## Kronologi (mask piksel > 235 di pita y 0,40–0,60; selisih rata-rata antar frame)
| Frame | Observasi | Gerak/cut | Label |
|---|---|---|---|
| f0→f1 | judul kuning bertumpuk hilang, unit 1 putih muncul; selisih 31,0 | cut | measured |
| f1–f10 | unit 1 diam: x0 0,224 x1 0,774 cy 0,503 | tanpa gerak | measured |
| f10→f11 | unit 2 menggantikan di frame yang sama; pusat x 0,498 | cut | measured |
| f15→f16 | unit 3; pusat x 0,5015, cy 0,505 | cut | measured |
| f30→f31 | pergantian shot (selisih 24,6) dan unit 4 di jangkar yang sama | cut | measured |
| f36→f37 | unit 5 menggantikan | cut | measured |

Data ukur otomatis lama (`ukur/data/90-T1.json`) menyebut segmen skala f23–31 dan masuk `scale` 11 frame; di fps asli itu ternyata pergantian shot di f31, bukan gerak teks. Data ukur lama hanya bahan, spec primitif memakai pengukuran fps asli.

## Uji atomik
Satu mekanik: `tipografi-ganti-unit-di-jangkar` (ganti potong di jangkar tetap). Kemunculan dengan kulit berbeda: shot sedang terang dan shot lebar gelap sesudah pergantian shot. Pergantian shot = lapisan transisi terpisah (cut biasa, tidak diangkat jadi primitif).

## Jangan dicuri
Palet (`ukur/palet.py` 8,2–10,2 dtk): #07090B #6A280A #27261E #403D33 #3D1708 #DE8545 #AC4314 #93684D #EFC13B #F6F8EF. Footage pembicara, cahaya oranye, ikon kecil di kiri kata, teks referensi.
