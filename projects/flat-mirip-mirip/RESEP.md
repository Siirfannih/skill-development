# RESEP: Kenapa konten terasa flat dan mirip-mirip (Script final 3, Behindwork)

**Prompt Irfan (disalin apa adanya):**
> **1. Jangkar tema ()**
>
> Visual: White Canvas sebagai background, text muncul kata per kata
>
> Kenapa banyak video yang ada di sosial media sekarang terasa < flat dan mirip-mirip? > saat bagian ini ada beberapa gambar atau video konten sosial media yang memutari kata kata ditengah tengah
>
> Sehingga hasilnya dia akan berputar perlahan lalu cepat dan langsung transisi ke frame selanjutnya ( seperti pusaran air)
>
> <Claude> claude digambarkan sebagai karakter clawd yang muncul diframe sedang menjalankan timeline editor
>
> <sudah mengubah industri kreatif> Textnya dibuat besar (75% dari total frame) berwarna merah kemudian pas vo industri kreatif tambahkan efek negative effect
>
> , <dan membuat banyak video semakin mudah diedit dalam hitungan menit, > UI Halaman chat Claude dimana file video diupload kemudian prompting mengetik "Claude please help me edit this video like a proffesional video editor" kemudian efek flash lagi
>
> <tapi rasanya AI-slop. > B-roll video cepat kumpulan video video AI-slop yang flat dan mirip mirip ( Visualnya Scrolling beranda Instagram yang semakin discroll isinya video Ai slop semua, asset ini kamu buat sendiri)
>
> **2. Cermin spesifik**
> Coba perhatiin video yang dibuat AI di berandamu: visual berantakan , mirip satu sama lain, latar krem waena warni, siluet orang, dan AI Slop
>
> **3. Akui yang benar (pandanganmu)**
> Buat belajar hal ini bagus karena Salah satu cara belajar terbaik adalah meniru karya orang lain, dan AI bikin kita sampai ke hasil yang bagus jauh lebih cepat.
>
> **4–5. Batasi dan mekanisme**
> Masalahnya, begitu dipakai buat brand, hasilnya bisa sangat mirip dan familiar, dan yang mirip?....
>
> biasanya susah diingat....
>
> Founder itu jualan kepercayaan, dan kita  seringkali lebih mudah ingat orangnya, bukan videonya.
>
> **7. Bawa pulang (edukasi)**
>
> Jadi apa yang membuat video tetap spesial , unik dan mudah diingat?
>
> ceritamu,
> sudut pandangmu,
> hal yang cuma kamu alami.
> Seleramu
>
> Untuk bagian yang belum ada arahan visual kamu brainstorming sendiri
>
> Kita akan membuat video seperti ini : https://www.instagram.com/reel/DezFTyktEUp/?fqnt=cTg5cGltMGt3ZDdr ( di skill-development juga udah ada refferensi serupa jadi baca baca aja ) ini akan dipost ke Behindwork

**Jenis video:** motion ber-VO (esai dokumenter montase, tanpa talking head) · **Rasio, durasi target:** 16:9 1920×1080, 30 fps, ≤ 60 dtk
**Kiblat:** Lumitris "Tesla Roadster" (IG DezFTyktEUp) · **Kartu:** `claude/motion-graphic/pustaka/kartu/86-lumitris-tesla-montase.md` · **Asal kiblat:** referensi baru dari Irfan
**Alasan memilih (satu kalimat):** Irfan menunjuk reel ini langsung sebagai bentuk video yang dibuat; kartu 46 (produser sama) dipakai untuk angka skala kata kecil ↔ raksasa yang sudah terukur.

| Bagian | Jenis | Sumber | Catatan |
|---|---|---|---|
| Warna & tekstur | pengikat | kiblat 86 | disesuaikan brief: kanvas putih #FFFFFF polos (brief + memori "putih utama, tanpa radial"); tinta #111; merah #D6202B hanya penekanan; cyan #29DFD4 hanya hasil invert P03. Grain/debu kartu terang reel dan vignette **tidak** dipakai. Krem/pastel hanya di dalam isi kartu slop (yang dikritik), bukan palet video |
| Teks | pengikat | kiblat 86 | angka terukur k1–k6, disesuaikan brief: kata kecil grotesk (Helvetica Neue lokal) di garis tengah y 49–50 %, kapital ±5 % H (x-height ±3,8 % H) → ±56 px kapital @1080, jarak antarkata 6–8 % W di footage / ±4,4 % W di kanvas terang, muncul kata per kata saat diucapkan; penekanan biasa ala reel ±2,3× kata kecil (k3 "start"); kata raksasa hanya di tempat yang diminta brief (P03 merah ±75 % lebar, P12 "orangnya", P15 "Seleramu"); teks hitam di kanvas, putih di footage gelap |
| Ritme | pengikat | kiblat 86 | hard cut; babak 1 (P01–P05) padat seperti reel (shot ≤ 1,2 dtk), babak cermin–mekanisme lebih lega (beat 2–6 dtk dengan gerak di dalam frame), babak akhir P14 tiga hard cut, P15 tahan |
| B-roll / footage | teknik | proyek jensen-pain-suffering (Behindwork, D-14) + D-03 | footage nyata P11/P12/P14 = LATAR: digelapkan dan diredam (overlay hitam ±45–55 %, saturasi turun), push pelan; tipografi kata per kata putih di tengah yang dominan, kata kunci #E8505A; foto arsip P14 boleh dibingkai kartu foto (Jensen 0:12). Klip "video profesional" P07–P08 hanya di dalam monitor UI |
| Motion graphic | teknik | kartu 79 (Clawd, UI Claude), kartu 85 (grid/slab untuk "mirip"), kartu 77 (teks melintasi cut, grid + teks), kode pinjaman skill-development-journey (D-07) | UI asli dibangun ulang SVG sama persis (D-01, D-02): Claude terang, Instagram iOS, Premiere Pro, Remotion Studio; Clawd piksel; kartu slop SVG |
| Kamera & transisi | teknik | kiblat 86 + LANTAI B | kamera hampir diam seperti reel tetapi shot > 2 dtk diberi push pelan; transisi khas = pusaran P01 (sekali); invert P03 dan flash P04 sebagai fungsi (18b); fade hanya P10 (makna "lupa") |
| SFX | teknik | `guide/sfx/GUIDE.md` (diputuskan di fase audio) | satu objek satu bunyi; kata KT per kata tanpa bunyi |
| Musik | teknik | `music_fit.py` (fase audio) | `pace_read` reel: kategori energi, 100–140 bpm; per babak |

**Penyesuaian karena LANTAI:** (1) A4: reel menumpuk 4–5 kata per baris → di sini 1–3 kata per tampil (kelompok dari lampiran storyboard hal. 17). (2) A7: kata kecil reel kapital ±5 % H (±54 px @1080) → dinaikkan sedikit supaya kata sambung ≥ 56 px. (3) B10: reel banyak shot diam → tiap shot > 2 dtk diberi push/drift pelan. (4) D20: UI platform asli, bukan UI generik seperti di storyboard. (5) Vignette/grain kartu terang reel dibuang karena brief meminta kanvas putih.
**Kamera diam?** tidak (push pelan pada shot > 2 dtk; kanvas teks boleh drift halus).
**Syarat dari prompt yang harus terpenuhi:** kanvas putih + teks kata per kata; orbit konten → pusaran (P01); Clawd menjalankan timeline editor (P02); teks merah ±75 % lebar + invert di "industri kreatif" (P03); UI chat Claude: unggah video, ketik prompt persis, flash (P04); scroll beranda Instagram yang makin seragam, aset buatan sendiri (P05); adegan tanpa arahan dirancang sendiri; bentuk video seperti reel Tesla; untuk Behindwork.
