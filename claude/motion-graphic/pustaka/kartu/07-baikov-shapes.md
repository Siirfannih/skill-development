# 07 · Baikov / Shapes (product film & onboarding)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: Baikov, product film "Shapes", file `02_Baikov_TEKS-SFX-CUT.mp4` · 16:9 (736×414, 30 fps), 67 dtk, 2010 frame · pembanding: `baikovphilipp_ssspin.io_1794219313.mp4` (Baikov untuk ssspin.io, 16:9 736×414, 47,3 dtk; **video lain**, bukan salinan: md5 dan durasi beda) · Frame: `../../guide/referensi/sheets/07-baikov-shapes.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/07-k*.jpg` · Bedah lengkap: `../../guide/referensi/baikov.md` (katalog BK01–BK10); data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (teks, warna, skala, cut, SFX diukur dari piksel/audio). Batas: sumber hanya 736×414 (1 px = 0,24 % tinggi), bitrate 258–290 kbps sehingga grain tidak bisa dinilai.

**DNA (satu kalimat):** Pertanyaan raksasa dibangun kata per kata dengan warna berbeda tiap kata lalu ditarik kecil, kemudian satu kata kunci kecil di pusat dikepung shape flat raksasa yang punya fungsi, dan UI yang lahir bertahap; tiap kata dan tiap shape dapat "pop" sendiri di atas musik house.
**Cocok untuk:** iklan produk, onboarding, product film (Irfan 7 Nov: iklan & onboarding Workspace) · **Tidak cocok untuk:** klip wawancara/talking head, cerita emosional bernarasi panjang (tidak ada VO dan footage wajah)
**Kata kunci gaya:** product film, shape flat, cerah, energik, UI sebagai subjek, rapi
**Diambil untuk:** teks, SFX, dan cut (nama file "02_Baikov_TEKS-SFX-CUT.mp4"). File ssspin.io: nama tidak menyebut bagian; lihat bagian terkuat (teks kinetik di latar gelap bercahaya).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar: putih hangat `#FBF7F4` (92 % piksel di pembuka); akhir putih murni `#FFFFFF`.
- Shape (k-means): biru `#3A5BFE`/`#445DF8`, biru muda `#649AFD`, biru pucat `#CCD7FE`; merah `#E84F47`/`#EB615D`, pink `#F08081`/`#F4C2C2`; hijau `#58C872` + hijau tua `#2C5D38`; kuning `#FCC64C`/`#FEEC4F`/`#FCFCCD`. Tinta teks `#2F2D2A` (hampir hitam hangat).
- Satu adegan = satu keluarga hue + satu-dua aksen (Rituals: 3 kuning; Onboarding: merah + pink; hex: 3 biru konsentris).
- Shape flat tanpa gradien. Adegan UI ganti perlakuan: latar gradien biru `#4F62D7` → `#CCD4F5` di sudut, bloom putih radial (chat: `#3A5BFE` → `#F8F7F3`).
- Blur gerak terlihat pada kata/foto yang bergerak cepat (k1 "makes"). Grain/tekstur: tidak terukur (kompresi).
- Varian ssspin.io (keluarga sama, palet lain): latar hijau tua `#05211B` → `#075748`, cincin teal bercahaya buram, aksen lime `#E2EE32`/`#BFD536`, adegan terang `#F5FBE3`.

### 2. Teks
- Font: grotesk sans, bobot medium, `a` dua tingkat (paling mirip: Inter Display Medium / Aeonik Medium; tidak teridentifikasi pasti). Serif italic hanya di eyebrow UI ("Sunday, April 6", 4,6 % H).
- Pembuka: SATU kata per ketukan pada skala raksasa, tinggi bbox 19–20 % H, lebar 32–48 % W per kata, pusat y 51–54 %. Tiap kata warna sendiri: "What" tinta, "makes" biru `#445DF8`, "your" merah `#E85C59`; foto/shape disisipkan di antara kata sebagai tanda baca.
- Kalimat selesai lalu seluruh grup ditarik ke ±3 % H (skala terukur ×0,15 dalam 4,9 dtk).
- Kata kunci jawaban: satu kata, 6,8–7,5 % H, tepat di pusat (x 50 %, y 47–50 %), tinta gelap, dikepung shape yang 5–13× lebih tinggi. Boleh dimiringkan mengikuti shape (Rituals, Feedback ±10°).
- Tidak ada kata sambung kecil berdampingan dengan kata kunci; hierarki lewat skala adegan: pembuka 20 % → kata kunci 7 % → teks UI 4–5 % → bubble chat 3,9 %.
- Daftar fitur (roda): kata 6–8 % H menempel lengkung roda, ikut berputar; satu item disorot.
- Masuk: naik dari bawah/ditiup masuk dengan blur gerak, sigap (8–12 f); keluar: ikut ditarik kamera atau dipotong shape, bukan fade.
- Varian ssspin.io: kata kunci dan kata sambung SAMA tinggi (5,6 % H "Everything starts with a"); penekanan lewat bold + lime, kata lain regular pucat. Blok rata kiri bertumpuk 5 baris (9,7–12,6 % H per baris), baris kunci bold lime "how it looks" 12,1 %. Huruf ditulis per huruf ("Ques·tion", "Beca▮").

### 3. Ritme
- B: 15 cut terdeteksi = 13,4/menit, shot median 1,8 dtk, event visual 49/menit (`pace_read.py`), puncak beda-frame 81/menit.
- Cut tidak merata: ledakan 4 cut dalam 0,7 dtk (12,23–12,93, kilasan shape) lalu dua shot kontinu 16,6 dtk dan 16,1 dtk (16,9–49,6) yang hidup dari gerak kamera.
- Babak: cepat 0–17 (pertanyaan, kata kunci, kilasan shape) → lambat 17–50 (roda, UI, chat) → cepat 49–61 (shape, kartu angka) → tenang 61–67 (Done, logo).
- Musik berhenti sesaat (0,65 dtk, −34 LUFS) tepat setelah pertanyaan selesai (2,10): jeda sebagai titik.
- ssspin.io: 6 cut = 7,6/menit, median 5,7 dtk, event visual 32/menit.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage penuh layar. Foto orang bekerja kecil (10–27 % W) sebagai tanda baca di pembuka (k2), di dalam lingkaran/masker shape (16,5–18,5), dan kolase di penutup (62–64).
- UI produk (dashboard, chat asisten, formulir, kartu angka) berperan sebagai footage.
- ssspin.io: satu footage penuh (orang di depan monitor, buram, teks di atasnya) dan satu foto 60×60 % dibingkai di latar terang, dililit pita hijau.

### 5. Motion graphic
- Shape punya fungsi dan menggambarkan kata: Rituals = cincin berulang, Onboarding = tangga, Feedback = shape saling berhadapan, roda = pilihan fitur.
- Huruf mengendarai shape (Onboarding: suku kata di atas bar tangga, menyatu saat bar sejajar).
- UI lahir bertahap (kerangka → sidebar → widget → isi); fokus satu bagian UI; kartu angka menghitung (19 → 24 → 27 %, 110K → 117K).
- Maskot wajah bulat kecil di chat dan di "Done!".
- **Skala subjek:** satu shape besar per kata kunci. Hex putih 52×91 % frame; kartu Rituals 38×68 % di cincin yang memenuhi frame; Feedback tiga shape 37×100 %, 32×75 %, 55×33 % terpotong tepi; tangga 93×43 % di separuh bawah. UI: jendela ±95 % W; kartu angka 3 × (28–32 % W × 34–36 % H) sebaris.
- **Kedalaman:** adegan shape 2 lapis (latar putih + shape konsentris 3 tingkat warna), datar tanpa bayangan. Adegan UI 3 lapis: gradien/bloom latar, jendela UI miring sedikit (3D), bayangan lembut di kartu; bubble kecil di belakang diburamkan. ssspin.io lebih dalam: cincin bercahaya buram di belakang, UI miring perspektif, gema "GROWTH" pudar di belakang kata.

### 6. Kamera & transisi
- Kamera hampir selalu bergerak (ORB+affine, kasar): 0–4,9 tarik ×0,15; 5,1–12,2 dorong ×2,6 menembus shape; 12,9–16,9 diam (×0,96); 16,9–33,5 dorong ×2,2 + pan kiri; 33,5–49,6 dorong ×4,7 (fokus UI); 53,3–60,6 dorong ×1,4; 60,6–67 tarik ×0,25 ke logo.
- Transisi: wipe/kilasan shape yang membesar melewati frame (12,2–12,9); masker lingkaran berisi foto (16,5–18,5); cut keras di puncak riser (33,47); match lewat maskot (hex → wajah → "Done!", 60,6).
- Pemicu: kata (tiap kata baru = gerak baru) dan gerak shape, bukan beat musik.

### 7. SFX
- earshot B: 405 onset (6,0/dtk), 96 bertag: 55 UI (pop bubble/chat, ketuk tonal glockenspiel/celesta), 11 hit, 5 kick/drum, 2 riser, 1 foley.
- Kosakata: pop pendek tiap kata/shape muncul (0,09 "What", 3,93 Mission, 6,37 Onboarding, 10,66 dan 11,16 foto); uplifter 18,80 saat roda mulai (18,7); reverse cymbal 33,47 tepat di cut 33,47; kick 42,02 di wipe kuning; ding pada logo 63,6+.
- Aksen kuat (≥ +15 dB di atas bed): 33/menit; 46 % jatuh ≤ 70 ms dari puncak gerak visual (acak 33 %): sinkron ke kata/shape, tidak ke grid beat.
- Level: puncak SFX −2 sampai −6 dBFS, 10–25 dB di atas bed musik; SFX duduk DI ATAS musik, bukan tersembunyi.
- VO: tidak ada narasi kontinu terdeteksi; tag "speech" earshot (16–20 titik) kemungkinan vocal chop. Tidak diverifikasi dengan telinga.

### 8. Musik
- Tech house / house dengan vocal chop (earshot), ±117 bpm (librosa, tidak andal: earshot pulse clarity 0,04, tanpa grid beat jelas), nada dominan D / C♯ / E.
- Mix −14,5 LUFS, true peak −0,8 dBFS (earshot −1,7 dBTP), LRA 4,2 LU.
- Babak: 0–9,5 tech house; 14,8–28,9 house + vocal chop; 28,9–63,6 tech house (terkeras 59,5–62,5, −12,1 LUFS); 63,6–67 musik turun (−17 LUFS) + ding di logo.
- ssspin.io: korporat inspiratif, pizzicato string, −12,8 LUFS, true peak +0,5 dBTP; musik berhenti 10× (0,5–1,2 dtk) sebagai titik di tiap frasa teks.

## Proporsi terukur (11 Nov, dari kedua video sumber 736×414; % tinggi/lebar frame)

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Pertanyaan per kata (k1) | 19–20 (bbox) | tidak ada; tiap kata sama besar, beda warna | satu baris, y 51–54 %, kata pertama x 23 % | teks itu subjeknya, 32–48 % W per kata | 1 lapis + blur gerak |
| Kata + foto tanda baca (k2) | 6,8 | tidak ada | pusat x 50 y 50 | 4–6 foto/shape kecil 10–27 % W mengitari kata | 2 lapis, foto buram gerak |
| Shape berfungsi + kata (k3) | 6,8–7,5 (miring 9–11 bbox) | tidak ada | pusat, di lubang negatif shape | 1–3 shape 33–100 % H, terpotong tepi | 2 lapis datar, cincin konsentris |
| Roda daftar (k4) | 6–8 per item | tidak ada | menempel lengkung, kolom x 35–60 % | daftar mengisi tinggi frame | 1 lapis biru rata |
| UI dashboard (k5) | 4,8 judul, 4,6 eyebrow serif | teks UI <2 | kiri-atas jendela (x 35 %, y 27 %) | jendela ±95 % W | gradien + UI miring + bayangan |
| Chat + maskot (k6) | 3,9 bubble | tidak ada | kiri-tengah, y 42 % | bubble 39 % W, maskot di kanannya | bloom radial, bubble belakang buram |
| Kartu angka (k7) | angka ±7–9 | label <2 | sebaris di y 50 % | 3 kartu 28–32 % W × 34–36 % H | gradien + kartu berbayangan |
| ssspin teks hijau (k8) | 12,1 bold lime | 9,7–12,6 regular (rasio ±1) | blok rata kiri x 10–19 %, 5 baris | tanpa subjek | cincin bercahaya buram di belakang |

- Rasio skala antar-adegan (B): pembuka : kata kunci : teks UI ≈ **20 : 7 : 4,5**; di dalam satu adegan hanya satu ukuran teks.
- Batas ukur: bbox mencakup ascender/descender; ±1 px = ±0,24 % H; huruf miring menggelembungkan bbox.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Pembuka: satu kata 18–22 % tinggi frame per ketukan, tiap kata warna sendiri (tinta / biru / merah) di latar putih hangat ±`#FBF7F4`.
- Kata kunci jawaban satu kata, 6–8 % tinggi, tepat di pusat; shape di sekitarnya ≥ 5× lebih tinggi dan terpotong tepi frame.
- Satu adegan shape = satu keluarga hue (biru, merah-pink, kuning, hijau) flat tanpa gradien; gradien/bloom hanya di adegan UI.
- Tidak ada kata sambung kecil di samping kata kunci; tiap adegan satu ukuran teks.
- Satu subjek besar per kata kunci (hex 52×91 %, tangga 93×43 %), bukan banyak ikon kecil; foto kecil hanya sebagai tanda baca.
- Adegan UI: jendela ±95 % lebar, sedikit miring, gradien biru di belakang, bayangan lembut di kartu.
- Satu keluarga grotesk medium; serif italic hanya di eyebrow UI kecil.
- Cut menggerombol (kilasan shape < 0,2 dtk) lalu shot kontinu panjang dengan kamera dorong/tarik; ±13 cut/menit.
- Tiap kata/shape baru membawa pop SFX yang terdengar 10–25 dB di atas musik; riser jatuh tepat di cut.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat di video; baru diuji lewat rekonstruksi still.
- 12 Nov, uji rekonstruksi (Irfan): sudah mendekati dan akurat; kesalahannya jarak antar kata terlalu jauh. Rapatkan spasi kata seperti frame asli.
