# RESEP: video perkenalan v7 (talking head penuh + KT Zache + Apple-style motion)

v6 diarsipkan di `arsip_v6/` (ditolak Irfan 19 Nov: berantakan, terlalu banyak ganti latar, objek bergerombol di satu sisi).

**Prompt Irfan (disalin apa adanya):**
> Kesalahanmu dari video ini itu adalah videonya sangat berantakan sekali, dan aku tuh udah minta kamu di awal untuk jangan nge-crop wajahku. Kan kita tuh gak jadi pakai Google Omni, jadi versi ganti background itu gak jadi, dan full aku pakai video talking headku. Jadi, gak ada b-roll, gak ada remove background. Kita cuman main di kinetic typography, camera movement, zoom in, zoom out, kinetic typography-nya, dan ya, kita main seperti yang kita lakukan di style-nya si Irfan.
>
> Aku mau kamu edit videoku kayak video ini [zache.mp4]. Jadi, yang dimainkan adalah zoom in, zoom out, pakai easy in, easy out, dan gunakan keyframe. Mainkan di transisi dan flash effect-nya juga supaya teksnya ada lapisannya seperti ini. Kalau memang di ReMotion nggak support, nggak bisa ngebuat teks kayak gini yang kelihatannya berlapis seperti ini, kamu bisa buat di tools lain yang bisa kamu jangkau.
>
> Secara overall, dari video terakhirmu, semuanya perlu direvisi karena kamu terlalu banyak remove background-ku, kemudian banyak objek yang berkabaran. Misalkan seperti yang di akun ini, kamu buatnya kayak ada frame footage di kanannya. Itu nggak boleh. Kalau kamu mau masukin frame footage, pastikan dia menyebar, jadi mengelilingi aku, supaya fokusnya nggak di situ. Posisi talking head kayak gini harus selalu fokus di wajahku, dan berarti teksnya akan mengelilingiku, ngebentuk. Dari belakang ke depan, depan ke belakang, kamera nge-zoom, zoom in, cut out-nya harus dimainin. Kemudian, ulangi itu pakai style motion, Apple Style Motion. Jadi, jangan dibikin polos kayak gini sekarang ini. Harus bikin kayak style motion.

**Jenis video:** talking head + tipografi kinetik · **Rasio, durasi target:** 9:16 1080×1920, 30 fps, 2006 f (66,87 dtk), loop
**Kiblat:** Zache, kinetic typography 2,5D di ruang talking head · **Kartu:** `pustaka/kartu/87-zache-kt-25d.md` · **Asal kiblat:** referensi baru dari Irfan (`zache.mp4` = `sumber/ref_zache.mp4`, sha1 sama), bedah per frame di `sumber/ekstrak/analisis_referensi/kt-zache/KT-ZACHE.md`
**Alasan memilih (satu kalimat):** Irfan mengirim video ini sebagai acuan langsung ("edit videoku kayak video ini"): teks dua lapis di ruang yang sama dengan wajah, kamera dorong/tarik ber-ease, flash light-leak di potongan.

| Bagian | Jenis | Sumber | Catatan |
|---|---|---|---|
| Warna & tekstur | pengikat | kartu 87 Zache | Footage asli tanpa ganti latar, grade ringan (kontras 1,05). Narasi putih hangat #FAF8EC, kata kunci kuning lemon #FCFD0C + glow amber dua lapis, kapital belakang kepala emas #F6DA0C; kata negatif putih + bayangan merah #C40004 (warna merek). Grain halus 3,5 %. |
| Teks | pengikat | kartu 87 Zache | Huruf dari profil merek (Poppins 600 narasi ≥ 56 px, Inter 800 kata kunci, Anton kapital hero), perilaku dari Zache: narasi per kata di depan badan, kata kunci per huruf berayun ±30°→0 berporos huruf pertama, kapital di belakang kepala lewat matte, keluar mundur (recede) 5 f. |
| Ritme | pengikat | kartu 87 Zache | Kata muncul onset +0…+2 f (hero mendarat di onset); blok berganti per frasa makna (1–3 kata); dorong kamera di tiap kata kunci; flash light-leak 4–7 f di 10 sambungan take terpilih (±1 tiap 6 dtk). |
| B-roll / footage | teknik | kartu 87 Zache | **Tidak ada b-roll** (D-001). Footage = `gabungan_v6.mp4` utuh 0–1842. Wajah selalu fokus dan tidak pernah terpotong tepi (gerbang `kerja/v7/kepala.json`). |
| Motion graphic | teknik | kartu 87 Zache | Hanya tipografi; tidak ada kartu UI/jendela. Kedalaman 2,5D lewat lapis (belakang kepala ↔ depan badan), blur gerak, glow. Apple-style = kurva `curves.ts` (heavy/land/reveal/leave), tanpa linear, tanpa fade polos. |
| Kamera & transisi | teknik | kartu 87 Zache | Kamera virtual satu untuk footage + teks (Lantai B12): dorong +4/+12/+18/+22 % (R1/R2/R3/R6) dalam 10 f, tarik balik ber-ease sepanjang blok. Skala dibatasi `zmax(frame)` supaya kotak kepala tetap ≥ 3 % dari tepi. Transisi: flash light-leak (Zache) di sambungan; potongan lain jump cut asli + loncat skala. |
| SFX | teknik | arsip v6 (`alat/mix.py`) | Disusun ulang SETELAH visual lulus (Lantai F26): whoosh di dorong kamera besar, hit di R3/R6, kilau di flash. KT per kata senyap. Belum dikerjakan di preview. |
| Musik | teknik | arsip v6 (`alat/musik.py`) | Aware → Relax yang sudah disetujui Irfan 19 Nov dipakai ulang, disesuaikan ke potongan v7 setelah visual dikunci. |

**Penyesuaian karena LANTAI:** (1) Zache menumpuk 4–5 baris per shot → Lantai A4/A8: maks 2 baris, 1–3 kata, satu blok tampil per waktu; blok lama mundur 5 f sebelum blok baru masuk (gerak recede Zache, bukan tumpukan). (2) Zache per huruf untuk kata kuning saja → sama (R2); narasi per kata (Lantai §8a). (3) Overshoot kata besar: ayun R2 overshoot rotasi saja (±3°), skala tanpa overshoot (typography §11). (4) Merah tidak dipakai sebagai isi huruf di atas footage gelap (GUIDE teks: merah bergetar) → kata negatif putih + bayangan merah. (5) Matte RVM hanya sampai f1799 → blok belakang kepala sesudahnya dipindah ke depan.
**Kamera diam?** tidak; kamera virtual dorong/tarik di semua shot (kartu 87 T1: kamera diam → gerak virtual footage + teks bersama).
**Syarat dari prompt yang harus terpenuhi:** talking head penuh; tanpa b-roll; tanpa ganti latar; wajah tidak ter-crop; fokus selalu di wajah; teks mengelilingi (belakang ↔ depan lewat cutout); zoom in/out ber-ease dengan keyframe; transisi + flash; Apple-style motion, tidak polos; tidak ada objek bergerombol di satu sisi.

## Teknik kartu × kondisi footage (`qc/kondisi/KONDISI.md`)
- **87 T1 tumpukan menempel di ruang** · kamera asli diam → kamera virtual footage + teks bersama; tumpukan maks 2 baris.
- **87 T2 masuk per huruf + blur gerak** · dipakai untuk R2 saja; latar baju gelap bermotif → huruf kuning tebal 150 px + glow amber (kontras dari ukuran + glow, bukan kotak).
- **87 T3 lapis belakang kepala** · ruang di atas kepala = plafon abu gelap 200–490 px (medium) → kapital di sana, kaki huruf tertutup rambut; close-up f595–772 (kepala mengisi frame) → kapital melebar di belakang kepala, sisa huruf terbaca di kiri-kanan (kartu 83 T3 sesuaikan).
- **Kata di dada (83 T4)** · kaos hitam bermotif marmer + tulisan "Thrasher": narasi putih 74 px dengan bayangan gelap lunak; diuji di still, pindah ke samping kepala bila tenggelam.

## Cara build
```bash
python3 alat/v7_rencana.py                 # kerja/v7/teks.json (format skill) + remotion/src/v7/rencana.json (blok + kamera)
python3 ~/work/skill-development/claude/motion-graphic/scripts/lego/kt_check.py kerja/v7/teks.json   # Lantai A9a
~/work/mg-venv/bin/python alat/kepala_v7.py   # kotak wajah/kepala per frame (YuNet) → gerbang wajah tidak ter-crop
cd remotion && COMP=V7 node stills.mjs ../qc/v7/stills 0.5 <frame…>
```
