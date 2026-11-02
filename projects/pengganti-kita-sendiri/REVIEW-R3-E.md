# REVIEW R3-E · tindak lanjut Putaran 2 (5 poin disetujui)

Bagian terkunci (LOCKED.md) tidak diubah: `RaceB` (cat BERLOMBA-LOMBA) tidak disentuh. `npx tsc --noEmit` bersih.

## 1. Altman S04d (72,0–75,2 s) · SATU slot tengah
- Satu slot: x 960, y 624 (di dalam pita 36–64 % = 389–691). Awalnya y 540, tetapi «Single/Billion» menyentuh lengan mikrofon (y ≈ 400–500), maka digeser ke bawah. Kepala mic bebas.
- Tiap kata (Single · Person · Billion · Dollar · Company) masuk di onset yang sama dengan sebelumnya (f 2162/2169/2182/2189/2209). Kata lama hilang 1 f sebelum kata baru (`until = onset berikut − 1`). AnchorWord, 130 px, Geist Sans 600, masuk blur → tajam. «Billion» #FFD25A, lainnya putih, shadow bawaan. Penanda SFX tidak per kata (hanya `04d:anchor:billion` seperti sebelumnya).
- `layoutQuote`/`textWidth` (satu baris) dibuang.
- Checker 71–76: LOLOS kecuali CONTR «Billion» 72,7 s 1 frame (frame masuk blur, diterima).

## 2. Jensen S03c
- Dua baris «Not gonna lose a Job» / «Somebody who uses AI»: baseline 268 → 300 (atas safe zone tidak tersentuh). Di close-up kata tidak menimpa rambut/dahi (jarak ≥ 80 px dari rambut).
- Catatan: pada baseline 300, ujung bawah «lose» nyaris menyentuh busur atas logo cincin di latar footage (celah ± 4–6 px). Baseline 300 adalah batas minimum yang disetujui; untuk lebih longgar perlu menggeser pembingkaian footage (keputusan desain, tidak dikerjakan).
- «Perlahan» (50,25–52,6): keluar dari kanan-atas → y 500, rata kanan di x 1632, ukuran 130 → **104 px**. DEVIASI yang perlu disetujui: pada 130 px lebar kata ± 540 px, sementara ruang di kanan siluet (x 1150–1632) hanya ± 480 px → kata menempel lingkaran kepala saat kepala muncul (1560–1586) atau terpotong garis scan (y ≈ 615 diam 1538–1574) bila ditaruh lebih rendah. Pada 104 px kata terletak di atas garis scan, jarak ≥ 70 px dari kepala. Kata masih memotong garis putus-putus bahu di beberapa frame awal. Bila Irfan ingin tetap 130 px, pilihannya menggeser kamera close-up (siluet ke kiri), yang akan memunculkan pola «blok kiri + teks kanan» — tidak dikerjakan.
- Checker 49–62: hanya CONTR «Tempat» 54,2 s dan «Kita» 54,5 s, masing-masing 1 frame masuk (diterima).

## 3. S01
- «Sadar» 250 → 130 px (posisi sama, y 500).
- Transisi 12,67: penyebab frame hitam = `P1c.start` = 12,705 s jatuh di antara frame 381 dan 382. Frame 381 masih dirender sebagai RaceB berlapis charcoal penuh (hitam polos, tanpa garis/berkas). Cabang `RaceB`/`RoomCD` sekarang dibatasi pada frame bulat (`C_START = f(P1c.start)/FPS`), dan berkas cahaya mulai membuka 1 f lebih awal (`open` dari P1c.start − 1 f) sehingga frame 381 sudah memperlihatkan garis finis + berkas. Strip: kartu ChatGPT → abu (380, bagian transisi) → ruang gelap dengan garis + berkas (381).

## 4. Glitch serah-terima
| titik | penyebab | perbaikan |
|---|---|---|
| 8,000 s (f 240) | `Clip` memakai `durationInFrames = round(outS − inS)`; potongan Bloomberg 186 + 54 = 240 sedangkan 00b mulai di f(240,6) = 241 → f 240 tanpa footage, teks masih hidup | `S00_ColdOpen`: `outS = inS + (f(awal berikut) − f(awal))/FPS` (durasi bulat sampai awal potongan berikut) |
| 40,933 s (f 1228) | batas panel 02f→03a-1 = 1228,5 f; ujung 02f dihitung 1228,4999999 → `Math.round` = 1228, awal 03a-1 = 1228,5 → 1229 → f 1228 tanpa adegan | `lib/time.ts` `f()` = `Math.round(s·FPS + 1e-6)` (batas x,5 dibulatkan sama di akhir dan awal adegan; berlaku global) |
| 86,93 s (f 2608) | ganti foto montase 05c jatuh di frame terakhir adegan (grid 86,902) → foto lain 1 f sebelum UI ChatGPT | `S05c`: indeks foto memakai `min(t, f(P.end) − 2)`; foto sebelumnya bertahan sampai cut. Penanda `05c:photo:n` yang jatuh di frame terakhir ikut dihilangkan dari metronom (bila audio masih punya «snap» di 86,90, itu jatuh ±1 f dari cut 05d) |
| 117,07–117,13 s | `relay()` di 06d = 0 → 0,45 → 0 (kedip) | `S06d`: `on` = redup monotonik 6 f (EZ.inOut), lalu potong dalam gelap ke 06e; penanda SFX `06d:relay:off` tidak berubah |

Bukti strip 30 fps (f ±5 tiap titik): `/home/claude/pks/v10/r3e_8000.jpg`, `r3e_12667.jpg`, `r3e_40933.jpg`, `r3e_86933.jpg`, `r3e_117067.jpg`. Tidak ada frame hitam, orphan, atau gambar nyasar; kartu ChatGPT meredup mulus.

## 5. Penutup S06g (126,25–132,8)
- Kamera: drift 1 → 1,03 sebelum hold (P.start → PERAN mendarat, f 3841), lalu dorong 1,00 → 1,12 cubic-out selama hold sampai awal fade (P.end − 0,45). Akhir ≈ 1,15 (sama dengan C02 v10); punch «kamu»/boom tidak berubah.
- Rim light piktogram tengah naik pelan (smoothstep, + 0,4) selama hold. Tanpa elemen baru; fade akhir tetap.
- Checker 125–133: hanya CONTR «Kamu» 129,0 s 1 frame masuk (diterima).

## File yang diubah
`remotion/src/lib/time.ts`, `scenes/S00_ColdOpen.tsx`, `S01_Perlombaan.tsx`, `S03c_MeniruDiri.tsx`, `S04d_AltmanOrbit.tsx`, `S05c_SameTools.tsx`, `S06d_Prompt.tsx`, `S06g_Peran.tsx`.
Perlu render ulang penuh karena `f()` bersifat global (hanya mengubah batas panel yang jatuh tepat di x,5 f).
