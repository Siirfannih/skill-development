---
id: "16"
pola: Silhouette-Backed Verdict Word
kategori: typography
kategori_lain: [layout, camera]
trigger: klaim tajam atau angka besar dalam opini bisnis ("hot take"); daftar berganti dengan satu kata vonis per item; klip podcast yang perlu rumah visual tanpa b-roll
sumber: kreator IG (potongan podcast pembicara bisnis) · 9:16 (720×1280) · 23,1 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 16 · Silhouette-Backed Verdict Word

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `markbrazil_DfXWojqtOb8.mp4` (potongan podcast pembicara bisnis, diedit kreator lain) · 9:16 (720×1280), 30 fps, 23,1 dtk · Frame: `../../guide/referensi/sheets/16-markbrazil-noir-stage.jpg` (1 frame per 0,67 dtk, berlabel waktu) · Frame kunci: belum diekstrak (hanya contact sheet) · Bedah lengkap: `../../guide/referensi/markbrazil.md` (kode M-T/M-X, komponen Remotion)
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/markbrazil_DfXWojqtOb8.mp4`
> Dilihat bergerak: **tidak** (hanya contact sheet; angka dari bedah lama). Ignite kata, counter rush, dan decode lower third belum dilihat frame demi frame; bedah sebelum dipakai.

**Inti mekanik (1 kalimat):** Panggung gelap dengan dua siluet di meja dan lantai bercahaya menjadi "rumah" tempat kata vonis serif italic menyala merah neon di belakang siluet, bergantian dengan close-up pembicara berkaption putih kecil dan lower third yang ter-decode.
**Narrative trigger:**
- Klaim atau angka besar yang harus terasa berat ("1000 piece of content a day") → T1
- Daftar berganti dengan satu kata vonis per item ("Streaming → Vlogging → Podcasting") → T2
- Close-up penjelasan yang butuh identitas pembicara → T3
- Hook flash di frame 0 sebelum angka → T1
**Jangan dipakai untuk:** tutorial, konten hangat atau ceria, explainer data, kalimat yang harus terbaca panjang.
**Kata kunci gaya:** noir, sinematik, neon merah, tajam, monokrom dingin
**Diambil untuk:** nama file tidak menyebut bagian; terkuat: kata vonis merah di belakang siluet pada panggung terkunci + pola CU ↔ panggung. Tidak diambil: isi percakapan dan identitas pembicara.

## Kondisi footage asli
- 9:16. Dua "kamera": **STAGE** wide terkunci (dua siluet di kursi tinggi, meja hitam, lantai memantulkan cahaya putih-dingin; lantai di y ±64 %, identik tiap kembali, selisih ≤ 1 %) dan **CLOSE-UP** medium pembicara low-key (kepala di atas, sweater hitam, caption di dada).
- Tanpa b-roll. Footage selalu penuh layar, tanpa kartu. STAGE ±45 % waktu, CU ±55 %. Kamera terkunci; energi dari teks, bukan kamera.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Merah `#EC0002` satu-satunya warna, hanya untuk kata yang ditekankan, halo/bloom `#6E1A1C` → transparan. Putih `#FFFFFF` untuk caption, kata sambung, ikon garis, dot matrix. Latar `#19191A` tengah panggung, `#020508` lantai/vinyet. Grade hampir monokrom dingin, kulit didesaturasi.
### Teks
Kata vonis: serif kontras tinggi bold italic (padanan Playfair Display Black Italic / Recoleta Bold Italic), 5–7 % tinggi frame, lowercase, tracking −2 %, glow merah, lebar sampai ±85 % frame. Kata sambung Inter Semibold 1,5–2 % putih menempel pada kata merah. Caption CU Inter Semibold 2,2–2,5 %, satu baris di ±62–66 % tinggi, tidak menutupi wajah. Lower third mono (IBM Plex Mono / JetBrains Mono) nama KAPITAL 2 %, batang merah vertikal di kiri, posisi ±55 % tinggi. Kata merah di garis kepala siluet, di belakang siluet (di sheet ±43 %; bedah lama menulis ±30–35 %: diperdebatkan, ukur ulang).
### Ritme
6 shot dalam 23 dtk, median 2,7, p90 7,4, ±16 cut/menit; teks berubah tiap 0,1–0,3 dtk. Pola: CU menjelaskan → cut ke STAGE di kata klaim/angka → kembali CU; angka dan list selalu di STAGE. Hook flash merah frame 0; satu drop senyap ±0,2 dtk di ±11,3 dtk.

## Pola

### T1 · Ignite Word Behind Silhouette · typography
- **Trigger:** klaim tajam atau angka besar; kata vonis yang harus terasa berat.
- **Yang terlihat (termasuk gerak):** di panggung, kata vonis serif italic merah ("going crazy", "f**ked up.", "a thousand", "to dominate.") muncul ±30 % opasitas merah gelap 2–3 f lalu menyala penuh dengan bloom 2–3 f; kata sambung putih kecil ("five", "that's", "you need") menempel di atas atau bawahnya. Siluet menutup huruf, bukan sebaliknya (2.5D). Tanda baca dan sensor asterisk tampil. Counter rush di awal: angka bergulir 182→545→909→1000 dalam ±12 f ease-out dengan matriks titik putih ±40×12 di area atas kosong. (sheet 0,67–13 dtk)
- **Kenapa bekerja:** hanya satu warna dan hanya untuk satu kata, jadi mata langsung ke vonis; panggung identik tiap kembali membuat kata terbaca sebagai bagian dari ruang.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): plate panggung → kata vonis (glow) → matte siluet (RVM, `persepsi.py`) → kata sambung putih.
  - Gerak: ignite = `opacity` 0,3→1 dan `filter: drop-shadow(0 0 24px #EC0002)` 2–3 f, bloom turun 8 f `CURVE.reveal`; counter `interpolate` 182→1000 selama 12 f `CURVE.land`.
  - Ruang: 2,5D ringan, kata `translateZ` di belakang matte siluet.
  - Blur & blend: bloom `mixBlendMode: "screen"`; flash hook overlay merah 90 % → 0 dalam 4 f.
- **SFX:** hit pendek di tiap cut ke panggung dan aksen kecil di ignite (kiblat); sub-bass `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` untuk angka puncak; hit pendek/stab tidak ada di SFXIrfan (lihat `../../guide/sfx/SFXIRFAN.md` catatan akhir); bleep sensor sinus tidak dipakai (palet terlarang).
- **Pakai bila:** ada plate panggung terkunci dan matte siluet bersih. · **Jangan pakai bila:** tanpa matte (kata menutup subjek); lebih dari satu kata merah per beat.
- **Remix (anti-jiplak):**
  1. Studio podcast terang → pertahankan kata di belakang subjek · ganti merah neon dengan aksen brand pekat dan bayangan lembut, panggung krem.
  2. Talking head satu kamera → kata vonis di ruang polos di belakang kepala, matte menutup sebagian huruf.
  3. Angka statistik → counter rush dengan serif lain, titik meter diganti bar progres.
- *Pengamatan di video asli, bukan target:* kata vonis 5–7 % tinggi, ignite ≤ 6 f per kata.

### T2 · Icon-And-Verdict List Swap · typography
- **Trigger:** daftar berganti dengan satu kata vonis per item.
- **Yang terlihat:** ikon garis putih (stroke ±3 px, sedikit glow) di atas kata merah yang berganti (Streaming → Vlogging → Podcasting → Live selling), "If you're not" tetap, ±0,7 dtk per item; kata lama redup 3 f, baru ignite. (sheet 13,3–17,3 dtk)
- **Kenapa bekerja:** bagian tetap membuat tiap pergantian jelas; ikon memberi pegangan visual.
- **Mekanik Remotion (titik awal):**
  - Lapisan: panggung → kata merah → siluet → ikon dan kalimat tetap.
  - Gerak: tiap item 21 f; kata lama `opacity` 1→0,2 3 f `CURVE.leave`, kata baru ignite 3 f; ikon crossfade 4 f.
  - Ruang: 2,5D seperti T1. Blur & blend: glow merah.
- **SFX:** satu aksen kecil per item (kiblat); gunakan `Kinetictypography(gunakansecaraacak).mp3` hanya sesekali, bukan tiap item.
- **Pakai bila:** 3–5 item berurutan. · **Jangan pakai bila:** item panjang.
- **Remix (anti-jiplak):**
  1. Jasa UMKM → daftar jenis layanan, ikon garis diganti ikon brand.
  2. Latar terang → kata gelap pekat dengan garis bawah aksen.
  3. 16:9 → daftar di sisi kosong.
- *Pengamatan di video asli, bukan target:* ±0,7 dtk per item.

### T3 · Decode Lower Third Close-Up · layout
- **Trigger:** close-up penjelasan yang butuh identitas pembicara; pergantian segmen.
- **Yang terlihat:** batang merah (4 px, jarak 16 px ke teks) tumbuh `scaleY` 3 f lalu teks mono karakter acak terkunci kiri→kanan ±8 f, sekali per segmen; judul sekunder berganti ("OPEN RESIDENCY / Full conversation on YouTube"). Caption putih kecil satu baris di bawahnya, build kata per kata dengan fade 3–4 f blur→tajam. (sheet 2–7 dtk, 12–22 dtk)
- **Kenapa bekerja:** identitas tampil tanpa menutup wajah; decode memberi gerak kecil di CU yang statis.
- **Mekanik Remotion (titik awal):**
  - Lapisan: CU → lower third → caption.
  - Gerak: batang `scaleY` 0→1 3 f `CURVE.land`; teks `Math.random`-seeded karakter tiap 1 f dan terkunci per karakter selama 8 f; caption per kata `blur(4px)→0` 4 f.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** senyap (decode tanpa bunyi di sumber yang diketahui; belum dibedah).
- **Pakai bila:** pembicara baru muncul atau segmen berganti. · **Jangan pakai bila:** wajah penuh frame tanpa ruang kiri.
- **Remix (anti-jiplak):**
  1. Interview UMKM → nama pemilik dan toko, batang aksen brand.
  2. Latar terang → teks mono gelap, batang aksen.
  3. 16:9 → lower third di kiri-bawah dengan lebar 28 %.
- *Pengamatan di video asli, bukan target:* nama KAPITAL 2 %, jabatan 1,3 %, di ±55 % tinggi kiri.

## Audio (bila dibedah)
Onset ±2,35/dtk; 5 dari 6 cut punya transien dalam ±100 ms; tiap cut ke panggung dan tiap ignite punya aksen kecil; bleep sensor di ±11,3 dtk. Bed musik/drone gelap kontinu di bawah VO, satu drop senyap ±0,2 dtk di ±11,3 dtk; −17,5 LUFS, LRA 1,7 LU, centroid ±1,6 kHz. Bpm dan instrumen: belum dibedah.

## Yang harus terasa sama saat disandingkan
- Hanya satu warna (merah dengan glow) dan hanya pada kata yang ditekankan?
- Siluet menutup huruf, kata terasa di belakang pembicara?
- Panggung identik tiap kembali (posisi lantai, selisih ≤ 1 %)?
- Close-up punya lower third mono dengan batang merah di kiri dan wajah bersih?
- Teks berubah cepat tetapi ignite tiap kata tuntas ≤ 6 f dan setiap cut ke panggung punya hit?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
