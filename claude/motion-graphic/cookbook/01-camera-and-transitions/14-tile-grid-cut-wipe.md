---
id: "14"
pola: Tile-Grid Cut Wipe
kategori: camera
kategori_lain: [typography, layout]
trigger: pindah antar B-roll atau antar demo dengan sentakan kecil yang segar; tutorial "aku tunjukkan triknya" dari kreator ke kreator; kata isi diucapkan satu per satu di sekitar pembicara
sumber: kreator IG (tutorial transisi editing) · 4:3 (960×720) · 34,3 dtk
dilihat_bergerak: ya
diukur: ya
alias: []
---
# 14 · Tile-Grid Cut Wipe

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `pedro.andradeok_De8GO2-RItV.mp4` (kreator tutorial editing, VO Spanyol) · 4:3 (960×720), 29,97 fps, 34,3 dtk · Frame: `../../guide/referensi/sheets/14-pedro-andradeok-grid-cut.jpg` (1 frame per dtk, berlabel waktu) · Strip gerak Flash Grid 15 fps: `../../guide/referensi/sheets/14-flash-grid-urutan.jpg` · Bedah lengkap: `../../guide/referensi/pedro-andradeok.md` (kode P-T/P-X, komponen Remotion)
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/pedro.andradeok_De8GO2-RItV.mp4`
> Dilihat bergerak: **ya** (strip 15 fps `14-flash-grid-urutan.jpg` diverifikasi). **Catatan Flash Grid:** transisi ini adalah **kilatan grid cepat acak 5–6 frame** dengan puncak flash terang singkat dan glitch/snap SFX — **bukan** wipe diagonal lambat 14 frame. Komponen siap pakai: `../../scripts/remotion/FlashGrid.tsx`.

**Inti mekanik (1 kalimat):** Kata putih polos muncul satu per satu di ruang kosong di sekitar kepala pembicara tepat di onset ucapannya, dan antar-shot dipisah oleh potongan grid ±4×3 tile putih yang muncul acak dalam 5–7 frame.
**Narrative trigger:**
- Berpindah antar B-roll atau antar demo dengan sentakan kecil → T1
- Kata isi diucapkan satu per satu ("lo único que tenés que hacer") → T2
- Angka atau istilah hero dengan kata pengantar kecil ("mucha / precisión", "20 minutos") → T3
- Pembuka yang menyebut nama teknik lewat kartu judul → T4
- Menjelaskan panel UI yang sedang dibahas → T5
**Jangan dipakai untuk:** dokumenter serius, explainer data berat, adegan emosional lambat (sentakan tile mengganggu).
**Kata kunci gaya:** sinematik hangat, editorial, personal, tenang, putih tanpa aksen
**Diambil untuk:** nama file tidak menyebut bagian; terkuat: transisi grid-tile dan teks orbit di sekitar kepala. Tidak diambil: grade tungsten dan isi tutorial.

## Kondisi footage asli
- 4:3. A-roll: pembicara medium (wide-medium, eye-level, sedikit wide-angle), ruang kosong kiri-kanan kepala dan di depan dada; kamera tripod statis, ruang hangat redup. B-roll sinematik (taman, jalan, Times Square), rekaman layar Premiere (panel ≥ 60 % frame), jendela app rounded di atas wallpaper.
- Porsi: A-roll ±45 %, layar/UI ±35 %, B-roll/insert ±20 %.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Semua teks `#FFFFFF`, tanpa warna aksen, stroke, bayangan, atau box; hierarki dari ukuran dan posisi. Kartu abu `#E6E6E6` hanya di momen judul; tile transisi `#FFFFFF`. Grade A-roll tungsten hangat, highlight oranye, bayangan teal gelap, kontras rendah-sedang, vinyet lembut; B-roll natural desaturasi, hitam diangkat.
### Teks
Helvetica Now Display / Inter Display, sentence case, tracking −2 %. Narasi 3,5–4,5 % tinggi, kata kunci Bold 5,5–7 %, hero 11–16 %, pengantar 2–2,5 % tepat di atas hero rata kiri. Teks di ruang kosong sekitar kepala, tidak menutup wajah, sampai ±6 % dari tepi. Satu kata per kata VO, onset +0…+2 f; masuk cut-in atau `scale` 0,92→1 dalam 3 f; keluar cut, bertahan ±6–12 f. Penutup kata kutip besar.
### Ritme
Shot median 2,5 dtk, p90 4,4, ±23 cut/menit, teks berubah tiap 0,2–0,4 dtk, 42 event visual/menit. Hook 0–1,8 dtk (3 B-roll + kartu judul) → A-roll → insert 1–1,5 dtk → rekaman layar → demo → penutup A-roll.

## Pola

### T1 · Tile-Grid Cut Wipe · camera
- **Trigger:** berpindah antar B-roll atau antar demo dengan sentakan kecil.
- **Yang terlihat (termasuk gerak):** frame dibagi grid ±4×3, tile putih muncul acak 1–2 f per tile, total 5–7 f, lalu shot B penuh. Terlihat di hook antar B-roll (1–2 dtk) dan di demo (24–28 dtk, tile hitam/putih menutup sebagian jendela). Detail per tile belum dilihat. (sheet 1,0; 24–28 dtk)
- **Kenapa bekerja:** sangat pendek; bidang putih yang acak menutup perpindahan tanpa frame kosong yang terasa.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): shot B → shot A → grid tile putih di atas.
  - Gerak: 12 tile `<div>` putih, tiap tile `opacity` 0→1 pada frame acak berbiji (0…5), shot A diganti shot B di frame tengah (f3), tile hilang acak f4–f7; durasi total ≤ 7 f.
  - Ruang: datar. Blur & blend: tanpa blur; tepi tile tajam.
- **SFX:** famili `mekanik` · satu `Cutcontrastransision.mp3` per wipe (klik pendek 0,3 dtk); kiblat memakai tick per tile, yang tidak ada di SFXIrfan sebagai file sendiri.
- **Pakai bila:** pergantian B-roll di hook atau antar demo. · **Jangan pakai bila:** lebih dari 3 kali per 10 dtk; tidak boleh menutupi kata VO yang sedang ditampilkan.
- **Remix (anti-jiplak):**
  1. Video produk → pertahankan grid acak · ganti putih dengan warna brand, grid 5×4.
  2. Latar terang → tile gelap pekat.
  3. 9:16 → grid 3×5.
- *Pengamatan di video asli, bukan target:* grid ±4×3, 5–7 f total.

### T2 · Face-Orbit Word Build · typography
- **Trigger:** kata isi diucapkan satu per satu; kalimat penutup berisi tiga-empat kata kunci.
- **Yang terlihat (termasuk gerak):** pada "lo único que tenés que hacer" kata muncul satu-satu di kiri-atas, kiri, kanan-atas, kanan-bawah kepala dan tinggal sampai kalimat selesai lalu hilang bersamaan. Kata hero menempel dada atau bahu ("Mira", "único"). Kata putih di depan dada gelap. (23–31 dtk)
- **Kenapa bekerja:** ruang kosong sekitar kepala di footage hangat redup menampung teks tanpa kotak; posisi berbeda tiap kata menjaga mata bergerak.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → teks (matte tidak dipakai di sumber).
  - Gerak: tiap kata cut-in pada onset VO +1 f atau `scale` 0,92→1 3 f `CURVE.land` + `opacity` 2 f; semua keluar bersamaan cut 0 f.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** senyap (kata KT per kata).
- **Pakai bila:** ruang kosong di kiri-kanan kepala, tripod diam. · **Jangan pakai bila:** wajah memenuhi frame; kamera genggam bergerak (teks tidak ikut).
- **Remix (anti-jiplak):**
  1. Kreator close-up → orbit di sisi lawan wajah, 2 posisi saja.
  2. Latar terang → teks gelap, tanpa bayangan.
  3. 16:9 → empat posisi lebar mengelilingi kepala, lebih jauh dari tepi.
- *Pengamatan di video asli, bukan target:* kata narasi 3,5–4,5 % tinggi, ±6 % dari tepi.

### T3 · Stacked Intro-Hero Pair · typography
- **Trigger:** angka atau istilah hero dengan satuan atau pengantar kecil.
- **Yang terlihat:** pengantar kecil rata kiri ("mucha") muncul dulu, hero Bold ("20", "precisión") 4–8 f kemudian; satuan kecil menempel kanan-bawah angka 2–3 f setelah hero. Hero di depan dada. (sheet 8–9 dtk)
- **Kenapa bekerja:** dua ukuran dengan rasio tinggi (hero ≥ 5× pengantar) membuat kata isi terbaca sebagai kata besar tanpa warna.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → pengantar → hero → satuan.
  - Gerak: hero cut-in f+6, pengantar f+0, satuan f+9, semua cut-in tanpa fade; keluar cut.
  - Ruang: datar.
  - Blur & blend: tanpa.
- **SFX:** senyap.
- **Pakai bila:** satu angka atau satu istilah per beat. · **Jangan pakai bila:** lebih dari 2 pasangan beruntun.
- **Remix (anti-jiplak):**
  1. Harga → hero angka, satuan "ribu" kecil kanan-bawah.
  2. Terang → hero hitam dengan bayangan lembut.
  3. 9:16 → hero di bahu, pengantar di atasnya.
- *Pengamatan di video asli, bukan target:* hero 11–16 % tinggi, pengantar 2–2,5 %, rasio 5–7 : 1.

### T4 · Band Squeeze Title Cutout · layout
- **Trigger:** pembuka yang menyebut nama teknik lewat kartu judul.
- **Yang terlihat:** latar jadi abu `#E6E6E6`, shot menyusut jadi pita horizontal ±40 % tinggi dalam 3–4 f; judul besar ("Grid Cut") terbuka kiri→kanan per potongan ±10 f dengan subjek cutout melewati tepi pita di depan huruf. (sheet 2 dtk)
- **Kenapa bekerja:** subjek yang melewati pita memberi kedalaman tanpa objek tambahan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: abu → pita footage → judul → matte subjek (`persepsi.py`, RVM) di atas judul.
  - Gerak: pita `height` 100 % → 40 % 4 f `CURVE.whip`; judul wipe `clipPath: inset()` kiri→kanan 10 f `CURVE.reveal`.
  - Ruang: 2,5D ringan.
  - Blur & blend: tanpa.
- **SFX:** famili `impact` · `basmenyebar.mp3` bila kartu judul adalah puncak hook; selain itu senyap.
- **Pakai bila:** ada cutout subjek dan nama teknik. · **Jangan pakai bila:** tanpa matte bersih.
- **Remix (anti-jiplak):**
  1. Nama produk → judul besar di belakang botol cutout.
  2. Latar terang → pita gelap, judul putih.
  3. 9:16 → pita vertikal.
- *Pengamatan di video asli, bukan target:* pita ±40 % tinggi; squeeze 3–4 f.

### T5 · Panel Zoom With Single Caption · layout
- **Trigger:** menjelaskan panel UI pada rekaman layar.
- **Yang terlihat:** zoom ke UI 100→140–180 % dalam 8–12 f ease-out sampai panel yang dibahas mengisi ≥ 60 % frame; satu kata kecil (±3 %) rata kiri di bawah panel; demo di jendela rounded (radius ±1,5 % lebar) berbayang di atas wallpaper. (sheet 9–22 dtk)
- **Kenapa bekerja:** zoom menghilangkan pencarian visual; satu kata tidak bersaing dengan UI.
- **Mekanik Remotion (titik awal):**
  - Lapisan: wallpaper → jendela → caption.
  - Gerak: `scale` 1→1,6 + `translate` ke pusat panel 10 f `CURVE.reveal`; caption cut-in tiap kata VO.
  - Ruang: datar. Blur & blend: bayangan jendela blur 30 px opacity 0,3.
- **SFX:** famili `mekanik` · `Enter.mp3` pada aksi klik yang benar-benar terjadi.
- **Pakai bila:** rekaman layar dengan satu panel fokus. · **Jangan pakai bila:** panel tak terbaca di ukuran target.
- **Remix (anti-jiplak):**
  1. Dashboard SaaS → pertahankan zoom + caption satu kata · ganti wallpaper dengan gradien brand.
  2. Terang → caption gelap.
  3. 9:16 → zoom vertikal, caption di bawah.
- *Pengamatan di video asli, bukan target:* zoom 140–180 %, 8–12 f.

## Audio (bila dibedah)
Onset perkusif ±1,1/dtk; hanya ±1/3 cut punya transien dalam ±100 ms; SFX hemat (klik/tick per tile Grid Cut, title moment). Bed musik kontinu di bawah VO, −17,4 LUFS, LRA 2,1 LU, centroid ±2,0 kHz. Genre, instrumen, bpm: belum dibedah.

## Yang harus terasa sama saat disandingkan
- Semua teks putih polos tanpa warna aksen, box, stroke, atau bayangan?
- Kata hero ≥ 5× tinggi pengantarnya dan duduk di ruang kosong, tidak menutupi wajah?
- Potongan tile selesai ≤ 7 f dengan bidang putih, tanpa frame kosong?
- Panel UI yang dibahas mengisi mayoritas frame dengan satu kata kecil di bawahnya?
- Ada perubahan visual atau teks minimal tiap 0,5 dtk?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
