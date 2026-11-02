# REVIEW R4-F · tiga perbaikan terakhir (S06g · S00 · S03c)

Bukti gambar: `/home/claude/pks/v10/r4f_close_sheet.jpg` (penutup, panel 480 px), `r4f_00_sheet.jpg` (16 year old), `r4f_03c_sheet.jpg` (Jensen). `tsc --noEmit` bersih.

## 1. Penutup S06g (126,25–132,8) · pendekatan baru
Perubahan (`S06g_Peran.tsx`): drift/dorongan 1,00→1,12/punch ×1,09/patah-balik DIHAPUS. Di onset «Kamu» (frame 3869 = 128,97 s):
- kamera push-in 1,00→1,18, cubic-out, 1,3 dtk (selesai ±130,27);
- rim light kepala dan badan naik ke 1,0 dalam 7 f (EZ.out), tebal rim 8→14 / 7→13, ditambah aura radial lembut (tanpa tepi, puncak 0,26) di belakang piktogram;
- layar kecil yang bertahan (indeks 3) bergeser ke tepat di atas kepala (x pusat 960) sebelum «Kamu», lalu menyala terang (glow 0,18→0,68, blur 70) dalam 7 f; tidak padam di boom 130,025, hanya kilat kecil (id SFX tidak berubah);
- hold 130,27→131,35 (±1,1 dtk) lalu fade akhir yang ada.
Teks «Peran Kamu» tidak diubah: y 548 (layar), dasar huruf y = 588, atas kepala y = 636→642 → jarak 48–54 px (≥ 40), utuh di safe zone.

Pengukuran di render (still hasil probe, bukan dari kode):
- Skala piktogram, registrasi peta tepi frame 960×540 terhadap frame 3870 (129,00 s): 129,33 s ×1,100 · 129,67 s ×1,148 · 130,00 s ×1,164 · 130,33–131,0 s ×1,166 (dorongan total ≈ 1,18 dari 128,97; 3870 sudah ±1,4 % masuk). Lolos ≥ 15 %.
- Selisih frame rata-rata antar frame 30 fps (skala 0–255), per 0,5 dtk: 127,0–128,0 = 0,22–0,26 (sebelumnya seluruh penutup 0,02–0,4) · 128,5 = 0,51 (puncak 3,5) · 129,0 = 0,89 (puncak 3,4) · 129,5 = 0,43 · 130,0–131,0 = 0,19–0,23 (setara noise grain, hold) · 131,5 = 0,67 (fade) . Ledakan gerak ada tepat di 128,97–129,5 (nyala + dorong), hold 130,3–131,35 = 1,05 dtk < 1,5 dtk.
- Kontras/rim: aura menaikkan terang area piktogram dari ±16 menjadi ±120 (0–255).

Checker 125–133: 1 temuan CONTR `anchor:KAMU` 129,0 (2 frame, 4,5:1) = dua frame masuk blur→tajam anchor (lib AnchorWord, animasi sama untuk semua anchor; kotak teks saat blur). Diterima sebagai frame masuk; bila perlu 1 frame, ubah di lib (bukan milik saya).

## 2. S00 «16 year old» (4,43–6,17)
Akar masalah: span sumber 2,09–3,74 s adalah tilt dari dada ke dagu; wajah tidak pernah masuk frame, jadi crop/geser saja tidak bisa memunculkan mata. Perbaikan (`S00_ColdOpen.tsx`): span kedua `news_teen` dipindah ke sumber 4,6–6,25 s (wajah penuh, tertawa; klip dibisukan, audio dirakit terpisah, durasi sama), FRAMES[4] = skala 1,0, tx/ty 0 (bingkai sumber penuh supaya mata tidak terpotong; di skala 1,2 mata terpotong di 4,4–5,0). Teks baris tetap di baris 760 (y 70 %): jatuh di leher/kaus, tidak menutup mata/mulut. Mata terlihat sejak ±4,6 s; 4,43–4,6 s hanya mulut/dagu (±0,2 dtk, sumber naik dari bawah).
Checker 4–7: hanya CONTR teks narasumber di atas footage (diterima per instruksi: «16» 3,2:1 di atas leher, dll) — tidak ada SAFE/CLASH. Catatan: baris dengan baseline 815 melanggar SAFE (company y 908), dikembalikan ke 760.
Usulan (tidak dikerjakan): bila kontras «16» dianggap perlu, naikkan wajah dengan ty negatif kecil setelah 4,9 s.

## 3. S03c Jensen (56,4–61,2)
Perubahan (`S03c_MeniruDiri.tsx`): FRAME_S 1,18→1,32 dengan jangkar kiri-atas (0% 0%); logo cincin turun ke y ≥ 331; baris teks naik baseline 300→282 (kata di y ≈ 235–294, x 312–±1060). Pita ungu y 216–330 bersih, jarak teks ke logo ≥ 37 px, tidak di atas kursi putih. Cut-zoom «somebody» origin 55%→70% 18% (kepala tetap di layar, rambut tidak terpotong; logo tetap di bawah baris). Jensen full frame, kepala utuh.
Checker 55–62: LOLOS (0 temuan).
Catatan (P2, tidak dikerjakan, di luar tiga butir): pada frame cut-zoom pil atribusi «JENSEN HUANG · CEO NVIDIA …» (y 826) menimpa logo cincin yang membesar di kiri-bawah; teks atribusi tetap terbaca (pil gelap 50 %). Usulan: geser pil ke kanan-bawah atau sembunyikan setelah «somebody».

## Catatan operasional
- `/tmp` menyimpan >100 direktori `remotion-webpack-bundle-*` sisa probe yang di-kill/timeout; pembersihan diblokir izin, disarankan dihapus manual (disk 356 MB).
- Probe n=1 untuk 125–133 butuh ±10 menit di mesin ini.
