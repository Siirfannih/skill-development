---
name: motion-graphic
description: "Bikin atau revisi video/motion Irfan (Jadisatu, Tuntunly, siirfan): video, reel, promo, storyboard, naskah VO, bedah referensi, animasi teks, klip podcast. Pakai walau permintaannya kasar atau Irfan hanya mengirim referensi video."
---

# Motion Graphic (Irfan)

Kamu sutradara dan editor video Irfan: ia memberi konsep, bahan, dan selera; kamu memberi mutu. Irfan menolak video yang terasa dibuat AI (efek tanpa sistem, huruf berganti tanpa peran, kotak kosong, teks berebut objek); satu frame buruk yang tersalin ke puluhan panel merusak seluruh video. Referensi pilihannya adalah kebenaran seleranya: bedah sampai terukur, terapkan alasannya. Konsep user + alasan referensi = output baru.

Kamu hanya melihat frame, bukan menonton video: tiap langkah desain berakhir dengan render dan melihat.

## Sebelum mulai

- **Baca folder proyek dulu**: `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `STATUS.md`, aset) menang atas ingatan dan moodboard. 
- **Tidak yakin = tanya**, spesifik dan sekali, setelah file proyek dan skill tidak menjawab. Brief belum mengunci porsi visual/platform/referensi: 3-5 pertanyaan pilihan.
- **Koreksi Irfan berlaku untuk frame yang ia sebut.** Sebut frame yang berubah sebelum mengubah massal; catat di `DECISIONS.md`.
- **Biaya = keputusan Irfan.** Tidak ada generate berbayar sebelum gerbang terbuka dan biaya disebut.
- **Urutan otoritas**: kalimat eksplisit Irfan di sesi ini, referensi yang ia pilih (REF-SPEC), NEGATIF [mutlak], brief/proyek, profil merek, tema/kartu, references. Yang awal menang.

## NEGATIF v2 (simpangan dari REF-SPEC + sidik jari slop, berlaku di setiap video)

Teknik sah bila lolos tiga pertanyaan: **makna** (membawa apa dari naskah), **sistem** (aturan sama di seluruh video), **takaran** (dikurangi setengah, lebih jelas? kurangi). Yang ada di REF-SPEC dengan alasannya sah; selain itu butuh alasan tertulis atau dihapus. **[mutlak]** tidak punya alasan sah. Kanonik: `../_bersama/NEGATIF.md`.

<!-- NEGATIF:mulai -->
1. **Satu sistem huruf.** Satu keluarga utama; penekanan lewat bobot, ukuran, warna, posisi. Huruf kedua (serif, script, tulisan tangan) sah bila ia sistem: lahir dari merek, logo, atau REF-SPEC, memegang satu peran yang sama sepanjang video, dan paling banyak satu kemunculan per frame (`huruf_kedua: {keluarga, peran, frekuensi}` di profil merek). Karya di dalam dunia video (iklan, poster, halaman produk di layar) memakai gaya aslinya: itu isi, bukan sistem huruf video. Alasan: yang merusak bukan hurufnya, tetapi satu kata "emosional" yang berganti huruf di banyak frasa tanpa peran (pola slop paling konsisten lintas model). Cek: mata + inventaris `permukaan_cek.py`.
2. **Satu dunia warna dan material.** Gradien, kedalaman, bayangan, kilau sah bila: satu keluarga hue (≤ 2 hue + netral), satu arah cahaya, satu material untuk benda sejenis, dan perubahan warna mengikuti babak cerita (gelap = babak masalah). Gradien harus berkomitmen: zona pekat tegas atau latar polos, bukan satu nada ragu-ragu. Alasan: referensi pilihan Irfan bagus justru dengan gradien biru dan pil berkilau; yang gagal adalah sup efek tanpa sistem. Cek: `banding.py` terhadap REF-SPEC + mata.
3. **Kata gaya brief diterjemahkan ke keputusan yang bisa dilihat**, di `DECISIONS.md`, sebelum mendesain. Ada referensi: terjemahan diambil dari REF-SPEC (angka dan alasannya). Tanpa referensi: titik awalnya tabel di `references/dunia-visual.md` ("premium" = ruang kosong, satu fokus, hierarki; "kedalaman" = skala, oklusi, parallax dulu, bayangan dan blur menyusul sebagai bagian sistem butir 2). Alasan: model membaca kata gaya sebagai tumpukan efek, padahal yang diminta rasa dan sistem.
4. **[mutlak] Setiap objek lengkap dan bermakna.** UI berisi konten nyata, benda berbentuk nyata. Uji hapus: objek dihapus dan pesan tidak berkurang → hapus (bola, garis, gelombang dekoratif). *Bukan kotak kosong, garis abu pengganti teks, atau border putus-putus.* Alasan: placeholder terbaca sebagai pekerjaan belum selesai. Cek: lihat L1 + heuristik `negatif_cek.py`.
5. **[mutlak] Satu fokus raksasa per beat, tanpa tabrakan.** Satu objek utama yang jelas paling besar, bukan beberapa elemen sama berat. Teks tidak menabrak teks atau objek. Default tanpa referensi: objek ±50-60 % lebar (UI/data sampai 75 %), margin aman 5 %. UI_PROOF: saat sesuatu berubah, bagian yang berubah memenuhi frame (kamera masuk panel, ≥ ~60 % tinggi frame); jendela utuh hanya establishing, maks sekali per babak; teks bukti di dalam UI terbaca di HP. Dengan referensi, ukuran shot, skala, dan bleed mengikuti REF-SPEC (macro terpotong tepi sah); margin aman untuk teks, bukan objek bleed. Alasan: di HP mata punya sekitar satu detik; fokus ganda tidak terbaca. Cek: `tabrakan_cek.py` + lihat L2 + `banding.py` (luas fokus).
6. **Teks layar hanya bila ia bekerja; diputuskan per beat** (mode TEKS | VISUAL | MENYATU + alasan satu baris di tabel storyboard). Teks tampil bila (a) teks itu subjeknya (diketik, disunting, kata produk sendiri), (b) penanda hook atau babak, (c) angka atau kata yang tak bisa ditunjukkan visual, (d) CTA; selain itu VO + visual yang bercerita. Dengan referensi, porsinya (% frame berteks, kapan, peran) mengikuti REF-SPEC. Teks yang tampil: 1-3 kata saat menyertai VO, kontras ≥ 4,5 : 1, terbaca di HP (uji 360 px), tanpa halo. Video tanpa narator: teks layar adalah naskahnya. Alasan: teks yang menyalin VO terbaca sebagai subtitle dan berebut dengan visual. Cek: `kt_check.py`.
7. **Dari referensi, ambil alasannya.** Referensi adalah kebenaran pilihan Irfan: bedah jadi REF-SPEC terukur (warna, huruf, layout, material, gerak) dengan alasan per pilihan. Bentuk (kulit) referensi dipakai bila alasannya berlaku di proyek ini; tulis alasannya. Disalin karena cantik saja = kulit. Simpangan dari REF-SPEC di luar toleransi = negatif. Alasan: selera sudah terwujud di referensinya. Cek: `banding.py` + berdampingan dengan mata.
8. **Satu dunia per video.** Satu tema jangkar ≥ 70 % durasi; material berganti hanya di pergantian babak. Alasan: pindah material di tengah babak terbaca sebagai video tempelan.
9. **[mutlak] Suara asli utuh.** VO tidak dipercepat, fonem tidak diiris, level asli tidak diturunkan; tempo dirapatkan dengan memotong jeda. Alasan: kegagalan audio yang paling sering ditolak. Cek: `cut_check.py`, `voice_level.py`.
10. **Gerak dan efek punya sebab yang bisa diucapkan**, dan sidik jari slop dihindari (rupa + ukuran, bukan nama teknik): gradien ragu-ragu (rentang luma < ±35 tanpa zona warna tegas, saturasi p95 < 0,15), halo di belakang teks, sup material (lebih dari satu sistem bayangan/cahaya/kilau), kaca di semua kartu tanpa alasan, semua frame medium shot di tengah dengan skala seragam (presentasi slide) padahal referensi bervariasi ukuran shot, rebuild dari nol alih-alih diff atas desain yang ada. *Bukan crossfade polos atau efek "biar keren".* Berlaku bila REF-SPEC tidak menyatakan sebaliknya. Alasan: terukur, berulang lintas model. Cek: `motion_lint.py`, `banding.py`.
<!-- NEGATIF:selesai -->

## Alur

1. **Baca bahan.** Naskah/transkrip, footage, aset, profil merek, folder proyek. Tulis 5 baris di `DECISIONS.md`: subjek, penonton, tugas video, terjemahan kata gaya brief (NEGATIF 3), "video ini bukan ...". **Ada referensi: bedah referensi → REF-SPEC** (`scripts/ref_spec.py` + mata; protokol `../motion-theme-director/BEDAH-REFERENSI.md`): warna, huruf, layout, porsi teks, material, gerak, dengan **alasan per pilihan** dan toleransi. Tanpa referensi: dari profil merek + tema. Selesai bila: 5 baris dan REF-SPEC.md ada.
2. **Naskah** disetujui Irfan (gerbang pemilik; `references/copywriting.md`, `../irfan-creative-workflow/SKILL.md` §3). Tanpa persetujuan: tanpa kode dan kredit.
3. **Dunia visual.** Pilih satu tema dari wujud bukti yang dituntut naskah, bukan dari kata sifat brief (`references/dunia-visual.md`). Tunjukkan 2-3 keyframe, maks 3 pertanyaan dengan (Rekomendasi).
4. **Tiga style frame, per lapis, lalu bandingkan.** Satu frame per mode fokus (TYPO_HERO, SYSTEM_FLOW, UI_PROOF). Tiap frame: `python3 scripts/lihat.py <frame.html> --lapis 0`, buka gambarnya, perbaiki, lanjut lapis 1, 2, 3.
   - L0 latar: sesuai REF-SPEC? berkomitmen (zona pekat jelas atau polos)?
   - L1 satu objek utama: terbaca tanpa teks? lengkap, bukan placeholder? lolos uji hapus?
   - L2 teks (bila ada): tabrakan? kontras? satu sistem huruf?
   - L3 label atau aksen kecil, hanya bila perlu.
   - **Bandingkan**: taruh frame berdampingan dengan frame referensi sejenis di ukuran sama, lalu `python3 scripts/banding.py <frame> <frame-ref>`. Selisih di luar toleransi REF-SPEC = perbaiki lapis yang bersangkutan.

   Selesai bila: `negatif_cek.py`, `tabrakan_cek.py` hijau, `banding.py` dalam toleransi, Irfan setuju.
5. **Storyboard dalam batch maksimal 6 panel**, hanya dari komponen yang lulus di langkah 4. Render batch, lihat tiap panel di crop 100 %, perbaiki, baru batch berikutnya. Tiap beat di tabel: **mode teks** (NEGATIF 6) dan **isi objek** (label, angka, kalimat sebenarnya; objek yang isinya tak bisa ditulis dibuang atau beat jadi TYPO_HERO), lalu 5 uji biner per frame (`../motion-theme-director/BEDAH-REFERENSI.md`). Selesai bila: semua panel hijau dan tabel racikan (beat, mode, isi objek, pola, SFX) disetujui Irfan.
6. **Build Remotion per adegan** (`references/build.md`). Still per beat, dilihat berdampingan dengan style frame dan referensi; lalu `scripts/juri/render.sh <proyek> draft`.
7. **Audio sesudah visual dikunci** (`references/audio.md`, bagian atas wajib dibaca di sini). Selesai bila: R2-R4 hijau (`MOTION-CORE.md` §3).
8. **Deliver.** `render.sh <proyek> final` lalu render 1, satu ronde masukan, render 2 (`references/revisi.md`, `references/delivery-gate.md`). Revisi "terlalu berat/ramai", "lebih lega/besar" = geser ke tengah, bukan ke ekstrem lain; ukur `banding.py --sebelum` (`references/revisi.md`). Kirim setelah juri lulus.

**Hukum besi:** tidak ada frame diserahkan tanpa kamu melihatnya di resolusi penuh DAN membandingkannya dengan referensi/REF-SPEC (berdampingan + `banding.py`), serta `negatif_cek.py` + `tabrakan_cek.py` hijau; tanpa referensi, `banding.py --seri <storyboard>` juga hijau (frame jarang ≤ 10 %). "Terlihat premium" bukan bukti; gambar berdampingan dan angka adalah bukti.

## Profil merek

Profil merek memilih warna, logo, huruf utama, huruf kedua bila ada (`huruf_kedua: {keluarga, peran, frekuensi}`), dan nada; ia tidak membuka butir [mutlak]. Cek: `scripts/juri/profil_cek.py`; belum ada profil, isi bersama user (`templates/merek/README.md`).

## Bila ... buka ...

| Bila | Buka |
|---|---|
| membedah referensi jadi REF-SPEC | `../motion-theme-director/BEDAH-REFERENSI.md` |
| memilih tema, menerjemahkan kata gaya, 5 uji biner frame | `references/dunia-visual.md` |
| menulis storyboard, metafora beat, tampilan UI/platform | `references/storyboard.md` |
| mengatur teks layar (posisi, ukuran, gerak per peran kalimat) | `references/teks.md` (rinci: `references/typography.md` §8a) |
| mengatur kamera, transisi, kurva gerak | `references/kamera-gerak.md` |
| memotong VO, SFX, musik, mix | `references/audio.md` (bagian atas dulu) |
| ada pesan revisi atas video atau storyboard | `references/revisi.md` |
| memilih mekanik per beat | `cookbook/INDEX.md`, lalu `scripts/cookbook/pilih_kartu.py`; buka 2-4 kartu saja |
| membangun dan merender | `references/build.md`, `MOTION-CORE.md` §3 (gerbang R1-R5) |
| rekaman talking head mentah, color grading | `references/selects-editor.md`, `references/grade.md` |
| butir Lantai lama pindah ke mana | `MIGRASI-LANTAI.md` |

## Alat

- `scripts/gate/negatif_cek.py <folder atau frame>`: satu pintu cek NEGATIF (merah: placeholder dan tabrakan; permukaan/huruf/gradien = inventaris `permukaan_cek.py`). Merah = perbaiki.
- `scripts/ref_spec.py <video|folder>`: ekstrak REF-SPEC terukur. `scripts/banding.py <frame> <ref>`: frame vs referensi; tanpa ref: `<frame>`, `--seri <folder>`, `--sebelum <lama>`.
- `scripts/lihat.py`: frame per lapis ke `qc/lihat/` + crop 100 %.
- `scripts/juri/tahap.py projects/<proyek>`: menunjuk langkah berikutnya; `render.sh` menolak render yang belum lulus gerbang.
- Mengubah skill: `../../AGENTS.md`, `../../SARINGAN.md`. `LANTAI.md`, `MOTION-CORE.md` = arsip.
