# TASK-R5-visual · putaran 5 · PERBAIKAN adegan yang belum bergaya premium (bukan bangun ulang)

TUJUAN
Adegan UI/layar penuh dan tokoh yang belum sejalan dengan arah premium Apple-style (kiblat Baikov 07 + Krea 49, UI gaya invideo 63, IG 65) diperbaiki, dan tiap adegan yang disentuh membawa SATU emosi lewat SATU gerak. Semua yang tidak disebut di bawah TIDAK berubah: KT di atas wajah (slab, cincin, label, narasi, huruf Poppins/Anton), parodi slop B2, kamera dasar footage, waktu kata.

Proyek `P = ~/work/skill-development/projects/skill-development-journey-20261116`. Pipeline lego sama dengan ronde 6 (bangun.py → lapisan → compose → gerbang). Ledger: `DECISIONS.md` D-414…D-425 (baca baris itu utuh). Bedah per beat: `evaluation.md` §Putaran 5 (tabel; kolom "Ubah" dipersempit oleh D-425: hanya baris yang disebut di TASK ini).

## Ringkasan kartu (Sutradara sudah membuka kartu + frame kunci; kamu buka GAMBARNYA)
Frame kunci: `~/work/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/<no>-k*.jpg`.

| Kartu | Dipakai untuk | Warna & latar | Huruf & skala | Posisi & susunan | Kedalaman & kamera | Frame kunci |
|---|---|---|---|---|---|---|
| 07 Baikov · kiblat | A, B, C | putih hangat #F6F5F0 ATAU bidang biru #2E5BFF; satu adegan = satu keluarga hue + 1–2 aksen (coral #F97066, kuning #FFD54A, biru muda #C9D6FF); shape flat tanpa gradien; gradien biru #2E5BFF→#C9D6FF + bloom putih HANYA di adegan UI | grotesk SF Pro Display (`~/fonts-lokal/sf-pro-display/` Medium/Bold; fallback Inter 500/700), tracking −1…−3 %; kata pembuka 18–20 % tinggi frame per kata, tiap kata boleh warna sendiri (tinta #2F2D2A / biru / coral); kata kunci 6–8 % di pusat; satu ukuran teks per adegan | kata di pusat, dikepung shape besar 5–13× lebih tinggi yang terpotong tepi; roda daftar (k4): item 6–8 % menempel lengkung, satu disorot | adegan shape 2 lapis datar; adegan UI 3 lapis (gradien/bloom, jendela miring 3D tipis, bayangan lembut); kamera dorong/tarik terus, bentuk raksasa menyapu frame sebagai transisi (12–16 f, `whip`) | 07-k1, k3, k4, k5, k7 |
| 49 Krea · pinjaman | B (prompt) | putih #FFFFFF, teks hitam, aksen highlight select #B3D2F6 | grotesk Medium satu bobot; ketik per huruf dengan kursor; hero lewat punch-in kamera ±1,8–4,5× | pusat (50,50) | punch-in 1 frame lalu pan mengikuti kursor, settle | 49-k1, k2 |
| 63 invideo · pinjaman | A, D | desktop: jendela UI asli di atas bidang/gradien; satu aksen oranye Claude #E4550F di tombol | teks UI asli; kalimat kunci punch ke prompt (10 % tinggi) | satu subjek UI besar 55–60 % lebar, panel masuk dari samping mendorong jendela | 3 lapis (latar → jendela bayangan lembut → panel/kursor); kamera tak pernah diam: push 3–7 %/0,5 dtk, pull saat babak baru, geser lateral saat panel masuk | 63-k4, k5, k6, k7 |
| 65 IG UI · pinjaman | F | latar UI abu terang #ECECEC ATAU putih hangat; kartu putih bayangan lembut; aksen gradien IG #D24E98→#E09669 hanya pada ikon/kata IG | kalimat 3,5–5 % | satu objek UI dominan 45–70 % lebar | 2–3 lapis, lapis belakang buram; kamera push/pull ≥ ×1,5 ke elemen UI | 65-k1, k4, k5 |

Pelajaran yang berlaku (guide §Cara memutuskan):
- Bila beberapa tokoh diperkenalkan bersamaan → watak dan kalimat berbeda per tokoh dari perannya; gaya bubble seragam.
- Bila tokoh sedang bekerja → menghadap pekerjaannya, kamera ke objek kerja, tokoh terlihat sebagian; tatap kamera hanya untuk menyapa.
- Bila adegan sudah punya penunjuk arah (garis alir/panah UI) → tanpa panah goresan kedua.
- Bila video ditampilkan sebagai isi tampilan (postingan IG) → teks ucapan masuk ke dalam bidang video, di ruang kosong dekat subjek; bukan di pita hitam di bawahnya.
- Goresan/tulisan tangan hanya bila sekeluarga dengan adegan; di UI netral tidak.

Jangan seperti ini (`claude/motion-graphic/pustaka/contoh-gagal/`): 10 (tulisan tangan biru di IG netral), 11 (teks di pita hitam di bawah video IG), 01 (teks besar yang tidak berhubungan dengan frame), dan frame 25 dtk versi sekarang (latar krem-pink nanggung, jendela kecil, teks hitam "template." di pita kosong di bawah UI, popover "/apple-style" terpotong).

## Yang diperbaiki (urut prioritas)

A. **B1 2,1–4,3 dtk "proyek ini selesai juga"** (D-425: tulisan SELESAI di UI GitHub). Sekarang: halaman repo GitHub datar + jendela timeline menimpanya + slab Anton hijau tua "SELESAI" ditempel di atas UI. Jadi: SATU subjek UI (jendela timeline editor yang sama, gaya 63/07-k5: jendela miring tipis, bayangan lembut, di atas gradien biru 07 + satu shape besar di belakangnya); emosi **puas/lega** → blok timeline yang tersisa meluncur dan mengunci satu per satu (`react(i)`), playhead merah sampai ujung, lalu centang hijau pop dan kata "selesai." (SF Pro Display Bold, ±18–20 % tinggi, tinta atau putih sesuai latar, masuk per kata dari blur/naik, bukan Anton) mendarat di pusat SAAT kamera mundur pelan (sebab-akibat: selesai → kamera lega). Halaman repo GitHub tidak lagi ditumpuk; bila logo/nama repo perlu, cukup judul jendela. Narasi "akhirnya proyek ini" tidak duduk di pita kosong di bawah UI: masuk ke adegan sebagai kalimat 07 di pusat sebelum UI muncul, atau di dalam bidang dekat jendela (tanpa pita). Lingkaran wajah tetap (pembicara harus tampil), Clawd di atasnya emosi **proud** (`emotions()`: menjulang sq −0,1, mata tutup) saat "selesai".

B. **B3 23,7–33,2 dtk "Dan ini bukan sebuah template … Apple style … Cinematic Storytelling … Nah, aku ngebalik."** (D-425 frame 25). Fokus TEKS dulu, baru UI; pakai shape atau opsi:
   1. 23,7–25,5 "Dan ini bukan sebuah template." → latar bersih putih hangat 07; kalimat 07-k1 (kata per kata mengikuti onset, ±18 % tinggi, tiap kata warna sendiri: "bukan" coral), "template." di dalam kartu shape membulat; emosi **tegas menolak** → kartu "template." menggeleng (rot ±6°, 2 ayunan cepat) lalu jatuh/tersapu keluar.
   2. 25,6–31,9 "orang-orang sering bilang edit kayak Apple style … Cinematic Storytelling gitu" → **opsi** sebagai roda daftar 07-k4 di bidang biru #2E5BFF: item preset ("Apple style", "Cinematic storytelling", "Viral reels", "Vlog aesthetic", "Podcast clean"…; huruf putih 6–8 %, menempel lengkung, berputar pelan); item yang diucapkan disorot (putih penuh + chip/kursor) TEPAT di onset katanya, item lain redup; emosi **jenuh dengan klise** → roda berputar makin cepat satu ketukan tiap preset disebut. Atau, bila lebih kuat setelah dicoba di still: prompt app Claude gaya 49/63 dengan punch-in ke "/apple-style" — pilih satu, alasannya di REPORT.
   3. 32,2–33,2 "Nah, aku ngebalik." → roda/kartu **berbalik** (flip 180° kontinu, `heavy`) dan sisi baliknya = jendela app Claude (konten sekarang: "Read cutting round 3 result…") di atas gradien biru 07-k5, jendela besar 55–60 % lebar, kamera dorong pelan; ini menyambung ke "Progres di baliknya" (33,3). Emosi **twist/yakin**.
   - Narasi tidak di pita kosong di bawah UI; kalimat ucapan = teks fokus itu sendiri (A1 tetap: semua ucapan tampil, satu lapisan). Popover terpotong dihapus. Lingkaran wajah tetap, posisi konsisten dengan adegan lain.

C. **B1b bubble perkenalan** (D-417). Teks bubble: Claude "Aku yang ngedit loh." · ChatGPT "Hi! Aku nemenin Claude." · Gemini "…". Gaya bubble, ukuran huruf ±60 px, waktu pop tetap. Emosi via `emotions()`/take: **Claude bete** (lengan bersilang/merapat ke badan, mata sipit setengah, desah sq 0,05 pelan, menoleh sedikit menjauh; take .3), **ChatGPT senang** (melompat take .6, mata ^ ^, menoleh ke Claude), **Gemini diam** (tanpa lompat, satu kedip, putar sangat pelan). Saat DECISION (10,6) ketiganya bereaksi menoleh ke kata itu dengan jeda tak rata (`react(i)`). Sprite pixel dihaluskan bila tepinya bergerigi (render 2×, anti-alias).

D. **B7 57,6–72,2 papan agen** (D-418, D-419). Papan gelap node + tokoh pixel kecil → **desktop premium gaya 63**: latar gradien biru 07-k5 (atau putih hangat bila kontras lebih baik), JENDELA APP ASLI dengan logo asli (ChatGPT/Codex, Claude, ChatGPT session B), konten pesan sekarang dipertahankan ("Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK.", "Revisi kamera selesai, lima still tersedia.", "Dicatat: jangan menyalin, pakai tautan supaya tidak terulang", papan skill-development dengan tab LANTAI/kartu kiblat/RESEP/orkestrasi/DESAIN). Pesan diketik di jendela pengirim, terkirim, meluncur (busur, `land`) ke jendela penerima; kamera mengikuti pesan (63: geser lateral, push 3–7 %). Tokoh pixel tetap sebagai avatar kecil di jendela masing-masing dengan emosi: Claude **bete** saat menerima "Jangan bertanya, langsung kerjakan TASK", lalu **lega/happy** saat tugas selesai; ChatGPT **senang** saat berkoordinasi; "loop pembelajaran" = jalur pesan menutup jadi lingkaran + centang. **Panah goresan putih ±58,6 DIHAPUS** (D-419). Narasi tidak di pita bawah tetap; tempel ke jendela/pesan yang sedang aktif (teks menempel subjek, Lantai A2). Transisi masuk/keluar adegan tetap di frame potong yang sama (waktu.py) agar audit sinkron tidak berubah.

E. **B8 72,3–76,4 meja 100%** (D-420). Blender `lego/blender/scene.py` (binari `/dev/shm/b10a-blender-5.2-runtime/blender`; keluaran slot `/mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov`). Claude bata **menghadap monitor**, terlihat dari belakang/samping (3/4 belakang), hanya ±setengah badan di tepi kiri/kanan frame sebagai lapis depan, tangan bergerak mengetik/menggeser; kamera **fokus ke monitor**: wajah Irfan di timeline, push-in pelan kontinu (±1,15–1,3× sepanjang adegan, `drift`), bokeh ringan pada Claude. Teks "100% FULL AI" tetap waktunya; posisinya menempel monitor (dunia), tidak menutup wajah di timeline. Emosi **fokus bekerja**.

F. **B9 76,5–83,8 IG** (D-414, contoh gagal 10–11). (1) Tulisan tangan + panah "Comment di bawah." DIHAPUS beserta coretan-nya. (2) Teks narasi ("Udah kerasa", "video editing", "profesional", "gak? Atau", "masih kerasa AI?", "Comment di bawah.", "Nanti aku kasih", "skill gratis", "bagi yang beruntung.") pindah ke DALAM bidang video postingan, di ruang kosong dekat subjek (dinding kanan/atas kepala), bukan pita hitam; "profesional" tetap dibedakan (koral, 800). (3) UI IG lebih kaya gaya 65: latar #ECECEC atau putih hangat dengan postingan lain buram di belakang (2–3 lapis), kartu putih bayangan lembut. (4) "Comment di bawah." dibawa UI sendiri: kamera masuk ke kolom komentar, kolom menyala (fokus ring biru IG), kursor berkedip, ikon kirim aktif; emosi **ajakan**. Komentar masuk sebagai reaksi: "masih kerasa AI slop" (pop pelan, sedikit getar), "Keren editan profesional" (pop + hati merah memantul). Kamera IG ronde 6b dipertahankan bila masih cocok dengan isi baru.

G. **B5 45,3–53,8 kartu angka** (bagian UI). Kartu "ChatGPT Pro 1→20×" dan "Claude Max 1→5×" → gaya 07-k7: kartu putih bayangan lembut, logo asli di kepala kartu, angka SF Pro Display Bold; emosi **tekanan biaya** → angka naik dengan count-up ±1 dtk ease-out dan warnanya memanas tinta → coral mengikuti nilai; di 20× kartu bergetar kecil 6 f (rot ±2°) lalu tenang. Posisi dan waktu tetap.

## FILE BOLEH
`lego/bangun.py`, `lego/teks.py`, `lego/waktu.py` (hanya bila adegan yang disebut butuh), `lego/blender/scene.py` + keluaran slot b10a, `remotion/src/video/**`, `remotion/src/komponen/**`, `remotion/public/**` (aset logo/font baru), turunan lego (`lego/*.json`, cache lapisan), `qc/master_gambar.mp4`, `qc/r5/**`, `objects.json`, `teks.json`, `handoff/REPORT-R5-visual.md`.
FILE JANGAN: `edit/*` (suara terkunci), `audio/*`, `DECISIONS.md`, `RESEP.md`, `evaluation.md`, `out/*`, skrip bersama `claude/motion-graphic/scripts/*`, proyek lain.

## LARANGAN (dari LANTAI/DECISIONS, untuk adegan ini)
- Nol crossfade/fade sebagai transisi; masuk dari arah atau berubah bentuk; kurva dari `curves.ts`, durasi dari jarak (B13, B13a; `motion_lint` PASS).
- Teks hanya dari ucapan; tiap kata ucapan tampil, satu lapisan, maks 2 baris, tidak terpotong tepi, kontras ≥ 4,5:1 (A1–A8).
- Satu fokus per momen; dua teks sama kuat bersamaan = gagal (C14); tepi frame bersih 5 % (C16).
- UI dan logo asli (D20); tanpa placeholder (D22).
- Teks blok berakhir paling lambat frame sebelum potongan adegan; satu blok narasi per waktu (kartu 83 catatan pakai).
- Jangan ubah KT wajah, slab, cincin, label, B2, B4, B6 selain yang disebut.

## LULUS BILA
1. Still resolusi penuh tiap adegan A–G di `qc/r5/` (minimal: A f75/f110/f125, B f730/f800/f900/f975, C f290/f320/f345, D 6 still 58–71 dtk, E f2175/f2230/f2280, F f2310/f2360/f2420/f2470, G f1400/f1500) + strip 1-frame tiap transisi masuk/keluar adegan yang diubah; kamu sendiri sudah melihatnya dan menulis satu baris per still di REPORT (yang terlihat + emosi yang terbaca).
2. Gerbang: `cek_master --ulang` PASS, `cek_sinkron` PASS, `cek_tumpuk` irisan 0, `kt_check` PASS, `motion_lint` PASS, `tsc` exit 0, `revisi_cek` LULUS (cakupan: `qc/cakupan-revisi.json` sudah diberi D-425), `base_pts.py lego/lego.json` PASS.
3. Master 2512 frame, 83,817 dtk.

## JANGAN
render final, mengubah audio/suara, commit/push git, mengubah adegan di luar A–G, menilai "lulus" tanpa melihat still.

## LAPORAN
`handoff/REPORT-R5-visual.md`: per butir A–G: yang diubah (file), alasan desain (kartu + frame kunci yang diikuti), emosi + gerak pembawa, path still; lalu gerbang (20 baris log terakhir); penyimpangan + alasan. Laporan balik ke Sutradara ≤ 25 baris.
