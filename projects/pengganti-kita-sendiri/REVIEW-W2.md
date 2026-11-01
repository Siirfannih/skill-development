# REVIEW-W2 (v10) — S02b–S02e, S03a, LightPlane

Still sebelum: `/home/claude/pks/v10/before/f<frame>.png`; sesudah: `/home/claude/pks/v10/a/f<frame>.png` (skala 0,5, tsc bersih).

| # | Perubahan | Still sesudah | Status |
|---|---|---|---|
| 13 + Irfan 6 | S02b: «JANJI SEDERHANA» dua kata satu baris (AnchorWord, tanpa kotak) di bawah ujung kurva, rata x 900–1800; sumbu mulai di frame pertama panel (tidak ada grid kosong); grid biru dipertahankan | a/f705, a/f735 | BERES (f705 masih grid + sumbu dulu ±0,3 dtk, bukan kosong) |
| 14 | S02c: daftar x 460–1140, dock x 1260–1780 sejajar; kamera Z 1,06–1,12, ikut kursor 50 % dengan margin 90 px; kartu seret skala ≥ 0,7 | a/f780, a/f825 | BERES |
| 15 | S02d: bidang putih tidak lagi tampil kosong; mendarat 4 f tepat bersama KREATIF (f927) | a/f900, a/f927 | BERES |
| 16 + Irfan 1 | LightPlane ditulis ulang tanpa tepi kotak (teknik di bawah); bidang putih solid, teks #1d1d1f. MEMBANGUN (S06a) memakai LightPlane yang sama | a/f927, a/f945 | BERES untuk KREATIF; S06a menyusul pekerja lain |
| 17 | S02e: tidak diubah (hanya 2 beat kamera: close-up lalu wide; daftar di x 297–980, DITEPATI di kanan) | a/f1000 | BERES (tidak perlu) |
| 18 + Irfan 7 | S02e: bar pil diganti kalender hari ala macOS (parts/CalendarDay.tsx): gutter 09.00–17.00, blok «Input data pesanan», «Invoice Oktober», «Rekap penjualan» memampat ke 09.00–09.45 di «lebih cepat»; jam bebas kosong; angka 8 jam → 45 menit di kanan; kartu blur/hantu dibuang (daftar disembunyikan penuh); sfxMark low_whoosh/sub_impact tidak berubah | a/f1050, a/f1066, a/f1085 | BERES |
| 19 | S02e: anchor TIDAK (f1169) + BERHENTI (f1176) menggantikan TAHAP INI; daftar Z 0,95 (teks ±34 px), 5–6 baris, daftar di kiri. sub_impact `02f:anchor:tahap` kini jatuh di f1176 (visual BERHENTI), bukan f1194 — tim audio perlu memindahkan SFX | a/f1215 | BERES (SFX perlu disesuaikan) |
| 20 | Dibiarkan (UI asli) | — | BERES |
| 21 (revisi QC) | S03a: PERSIS dipindah ke RUANG LAYAR (di luar `<Camera>`), x 960, y 520, 96 px, hidup f1381–f1394. Versi dunia sebelumnya terseret tilt kamera ke tepi bawah (y≈1060). Strip tiap 3 f: `/home/claude/pks/v10/a/persis_strip.jpg` (f1381–1396). Kata selalu utuh, margin bawah > 40 %, di atas composer lalu di tengah maskot yang terbang. Maskot hijau/pink sempat bersinggungan dengan huruf P/R (f1387–1390) tetapi kata di atas maskot dan tetap terbaca | a/persis_strip.jpg | BERES (singgungan maskot transien ±0,2 dtk, kata tidak tertutup) |
| 22 | S03a: kursor CEO melengkung −130 px saat menuju dokumen, lalu menulis dengan tip di kanan-atas caret → pil «CEO Agent» tidak menimpa «@CEO Agent». Ops dan Editor kini keluar ke sisi kartu (Ops kiri x 170, Editor kanan x 1650), turun di luar kartu balasan, lalu naik ke bar dari bawah; CS sudah di bawah kartu | a/f1425, a/f1440, ps/f1465, ps/f1470, ps/f1475 | BERES |

## Teknik cahaya lembut (salin ke MEMBANGUN S06a)
Akar kotak: berkas memakai `clip-path` polygon + blur 16 px (tepi lurus masih terlihat) dan glow memakai `box-shadow` pada kotak.
Teknik baru (`LightPlane` di `_b2_shared.tsx`, helper `soft(a)`):
1. Setiap cahaya = satu `div` yang ISINYA `radial-gradient(ellipse closest-side at 50% 50%, ...)` dengan 6 stop yang turun halus (a, .72a, .4a, .16a, .04a, 0) sehingga nilai 0 tepat di tepi kotak: tepi elemen tidak pernah terlihat.
2. Tanpa `clip-path`, `box-shadow`, atau `filter: blur` pada elemen cahaya.
3. Berkas = dua elips panjang (760×1520 a=.34 dan 440×1400 a=.22) di-`rotate(24deg)` (sumbu dari kanan-atas ke bidang). Glow di sekitar bidang = satu elips 1800×840 a=.5·glow·plane, berpusat di pusat bidang.
4. Bidang tempat kata = solid `#fff`, kata tinta `#1d1d1f` / `#111` (kontras tinggi, bukan abu di putih); bidang masuk bersamaan dengan kata (opacity 0→1 dalam 4 f), tidak pernah tampil kosong.
