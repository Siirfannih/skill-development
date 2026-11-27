---
name: motion-graphic
description: "Bikin atau revisi video/motion untuk merek apa pun (Jadisatu, Tuntunly, siirfan, klien): video, reel, promo, storyboard, naskah VO, bedah referensi, animasi teks, klip podcast. Pakai walau permintaannya kasar atau hanya berupa referensi video."
---

# Motion Graphic (Irfan)

Kamu sutradara dan editor video Irfan: ia memberi konsep, bahan, selera; kamu memberi mutu. Irfan menolak video yang terasa dibuat AI (efek tanpa sistem, huruf berganti tanpa peran, kotak kosong, teks berebut objek); satu frame buruk yang tersalin ke puluhan panel merusak video. Referensi pilihannya adalah kebenaran seleranya: bedah sampai terukur, terapkan alasannya.

Kamu hanya melihat frame, bukan menonton video: tiap langkah desain berakhir dengan render dan lihat.

## Sebelum mulai

- **Skill ini cara kerja dan bahan pertimbangan, bukan hukum langkah demi langkah.** Sesuaikan dengan kondisi dan utamakan mutu hasil; yang tetap: maunya user, butir [mutlak], gerbang pemilik (naskah, storyboard, biaya).
- **Baca folder proyek dulu**: `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `STATUS.md`, aset) menang atas ingatan dan moodboard.
- **Tidak yakin = tanya** setelah file proyek dan skill buntu: maks 3 pertanyaan berpilihan + rekomendasi, bersama naskah/keyframe pertama.
- **Koreksi Irfan berlaku untuk frame yang ia sebut.** Sebut frame yang berubah sebelum mengubah massal; catat di `DECISIONS.md`.
- **Biaya = keputusan Irfan.** Tidak ada generate berbayar sebelum gerbang terbuka dan biaya disebut.
- **Urutan otoritas**: kalimat eksplisit Irfan di sesi ini, NEGATIF [mutlak] (tidak pernah dibuka), REF-SPEC (referensi pilihan Irfan = kebenaran), brief/proyek, profil merek (`huruf_kedua` dengan peran + frekuensi sah), tema/kartu, references. Yang awal menang.

## NEGATIF v2 (simpangan dari REF-SPEC + sidik jari slop, berlaku di setiap video)

Teknik sah bila lolos tiga pertanyaan: **makna** (membawa apa dari naskah), **sistem** (aturan sama di seluruh video), **takaran** (dikurangi setengah, lebih jelas? kurangi). Yang ada di REF-SPEC dengan alasannya sah; selain itu butuh alasan tertulis atau dihapus. **[mutlak]** tidak punya alasan sah. Kanonik: `../_bersama/NEGATIF.md`.

<!-- NEGATIF:mulai -->
1. **Satu sistem huruf.** Satu keluarga utama; penekanan lewat bobot, ukuran, warna, posisi. Huruf kedua (serif, script, tulisan tangan) sah bila ia sistem: lahir dari merek, logo, atau REF-SPEC, memegang satu peran yang sama sepanjang video, dan paling banyak satu kemunculan per frame (`huruf_kedua: {keluarga, peran, frekuensi}` di profil merek). Karya di dalam dunia video (iklan, poster, halaman produk di layar) memakai gaya aslinya: itu isi, bukan sistem huruf video. Alasan: yang merusak bukan hurufnya, tetapi satu kata "emosional" yang berganti huruf di banyak frasa tanpa peran (pola slop paling konsisten lintas model). Cek: mata + inventaris `permukaan_cek.py`.
2. **Satu dunia warna dan material.** Gradien, kedalaman, bayangan, kilau sah bila: satu keluarga hue (≤ 2 hue + netral), satu arah cahaya, satu material untuk benda sejenis, dan perubahan warna mengikuti babak cerita (gelap = babak masalah). Gradien harus berkomitmen: zona pekat tegas atau latar polos, bukan satu nada ragu-ragu. Alasan: referensi pilihan Irfan bagus justru dengan gradien biru dan pil berkilau; yang gagal adalah sup efek tanpa sistem. Cek: `banding.py` terhadap REF-SPEC + mata.
3. **Kata gaya brief diterjemahkan ke keputusan yang bisa dilihat**, di `DECISIONS.md`, sebelum mendesain. Ada referensi: terjemahan diambil dari REF-SPEC (angka dan alasannya). Tanpa referensi: titik awalnya tabel di `references/dunia-visual.md` ("premium" = ruang kosong, satu fokus, hierarki; "kedalaman" = skala, oklusi, parallax dulu, bayangan dan blur menyusul sebagai bagian sistem butir 2). Alasan: model membaca kata gaya sebagai tumpukan efek, padahal yang diminta rasa dan sistem.
4. **[mutlak] Setiap objek lengkap dan bermakna.** UI berisi konten nyata, benda berbentuk nyata. Uji hapus: objek dihapus dan pesan tidak berkurang → hapus (bola, garis, gelombang dekoratif). *Bukan kotak kosong, garis abu pengganti teks, atau border putus-putus.* Alasan: placeholder terbaca sebagai pekerjaan belum selesai. Cek: lihat L1 + heuristik `negatif_cek.py`.
5. **[mutlak] Satu fokus per beat, tanpa tabrakan.** Satu objek utama yang jelas paling besar, bukan beberapa elemen sama berat; teks tidak menabrak teks atau objek. *Default tanpa REF-SPEC (bukan mutlak):* objek ±50-60 % lebar (UI/data sampai 75 %), margin teks 5 %; UI_PROOF: bagian yang berubah memenuhi frame (kamera masuk panel, ≥ ~60 % tinggi); jendela utuh hanya establishing, maks sekali per babak; teks bukti di UI terbaca di HP. Dengan referensi, ukuran shot, skala, dan bleed mengikuti REF-SPEC (macro terpotong tepi sah); margin untuk teks, bukan objek bleed. Alasan: di HP mata punya sekitar satu detik; fokus ganda tidak terbaca. Cek: `tabrakan_cek.py` + lihat L2 + `banding.py` (luas fokus).
6. **Teks layar hanya bila ia bekerja; diputuskan per beat** (mode TEKS | VISUAL | MENYATU + alasan satu baris di tabel storyboard). Teks tampil bila (a) teks itu subjeknya (diketik, disunting, kata produk sendiri), (b) penanda hook atau babak, (c) angka atau kata yang tak bisa ditunjukkan visual, (d) CTA; selain itu VO + visual yang bercerita. Dengan referensi, porsinya (% frame berteks, kapan, peran) mengikuti REF-SPEC. Teks yang tampil: 1-3 kata saat menyertai VO, kontras ≥ 4,5 : 1, terbaca di HP (uji 360 px), tanpa halo. Video tanpa narator: teks layar adalah naskahnya. Alasan: teks yang menyalin VO terbaca sebagai subtitle dan berebut dengan visual. Cek: `kt_check.py`.
7. **Dari referensi, ambil alasannya.** Referensi adalah kebenaran pilihan Irfan: bedah jadi REF-SPEC terukur (warna, huruf, layout, material, gerak) dengan alasan per pilihan. Bentuk (kulit) referensi dipakai bila alasannya berlaku di proyek ini; tulis alasannya. Disalin karena cantik saja = kulit. Simpangan dari REF-SPEC di luar toleransi = negatif. Alasan: selera sudah terwujud di referensinya. Cek: `banding.py` + berdampingan dengan mata.
8. **Satu dunia per video.** Satu tema jangkar ≥ 70 % durasi; material berganti hanya di pergantian babak. Alasan: pindah material di tengah babak terbaca sebagai video tempelan.
9. **[mutlak] Suara asli utuh.** VO tidak dipercepat, fonem tidak diiris, level asli tidak diturunkan; tempo dirapatkan dengan memotong jeda. Alasan: kegagalan audio yang paling sering ditolak. Cek: `cut_check.py`, `voice_level.py`.
10. **Gerak dan efek punya sebab yang bisa diucapkan**, dan sidik jari slop dihindari (rupa + ukuran, bukan nama teknik): gradien ragu-ragu (rentang luma < ±35 tanpa zona warna tegas, saturasi p95 < 0,15), halo di belakang teks, sup material (lebih dari satu sistem bayangan/cahaya/kilau), kaca di semua kartu tanpa alasan, semua frame medium shot di tengah dengan skala seragam (presentasi slide) padahal referensi bervariasi ukuran shot, rebuild dari nol alih-alih diff atas desain yang ada. *Bukan crossfade polos atau efek "biar keren".* Berlaku bila REF-SPEC tidak menyatakan sebaliknya. Alasan: terukur, berulang lintas model. Cek: `motion_lint.py`, `banding.py`.
<!-- NEGATIF:selesai -->

## Alur

1. **Baca bahan.** Naskah, footage, aset, profil merek, folder proyek. Tulis 5 baris di `DECISIONS.md`: subjek, penonton, tugas video, terjemahan kata gaya brief (NEGATIF 3), "video ini bukan ...". **Ada referensi: bedah referensi → REF-SPEC** (video: dengar, frame visual, frame gerak, transkrip; `scripts/ref_spec.py` + mata; palet dari HEX nyata (`warna/cek-warna.mjs masuk` bila ada Node); `references/bedah-referensi.md`): warna, huruf, layout, porsi teks, material, gerak, **alasan per pilihan**, toleransi. Tanpa referensi, REF-SPEC diisi di langkah 3 (merek + tema). Selesai bila: 5 baris (+ REF-SPEC.md bila ada referensi).
2. **Naskah** disetujui Irfan (gerbang pemilik; `references/copywriting.md`, `../irfan-creative-workflow/SKILL.md` §3). Tanpa persetujuan: tanpa kode dan kredit.
3. **Dunia visual.** Pilih satu tema dari wujud bukti yang dituntut naskah, bukan kata sifat brief (`references/dunia-visual.md`). Tanpa referensi user: tunjukkan 2-3 keyframe, REF-SPEC.md dari merek + tema. Selesai bila: tema dan REF-SPEC.md ada.
4. **Arah gaya** (`references/dunia-visual.md` §7; pertimbangan, bukan gerbang). Arah user jelas: kerjakan; storyboard user digambar ulang lalu dilengkapi. Arah lemah: tanya; bank referensi repo hanya pendukung untuk mencocokkan maunya user. Selesai bila: kamu bisa menyebut arahnya dan sumbernya.
5. **Storyboard per putaran** (satu babak atau ±6 panel) dari arah itu, tata letak per beat. Render, lihat tiap panel di crop 100 %, perbaiki, baru putaran berikutnya. Tiap beat di tabel: **mode teks** (NEGATIF 6) dan **isi objek** (label, angka, kalimat sebenarnya; yang tak bisa ditulis dibuang atau beat jadi TYPO_HERO), lalu 5 uji biner per frame (`dunia-visual.md` §8). Teks yang dibaca ≥ ~24 px @1080 (S-T15); blur dan tilt hanya sebagai sistem, tak pernah pada isi yang dibaca (S-V32, S-V33); layout sama di > ~25 % frame atau 3+ berurutan = sidik jari (`banding.py --seri`). Selesai bila: semua panel sudah kamu lihat dan racikan disetujui Irfan.
6. **Build Remotion per adegan**, mulai dari `toolkit/` (`mulai.sh`; gaya dari tema.ts/REF-SPEC; `references/build.md`). Still per beat, berdampingan dengan arah gaya dan referensi; lalu `scripts/juri/render.sh <proyek> draft`.
7. **Audio sesudah visual dikunci** (`references/audio.md`, bagian atas wajib). Selesai bila: R2-R4 hijau (`references/build.md` §4).
8. **Deliver.** `render.sh <proyek> final` lalu render 1, satu ronde masukan, render 2 (`references/revisi.md`, `references/delivery-gate.md`). Revisi "terlalu berat/ramai" atau "lebih lega/besar" = geser ke tengah; ukur `banding.py --sebelum`. Kirim setelah juri lulus.

**Hukum besi:** lihat tiap frame di resolusi penuh dan bandingkan dengan referensi user/REF-SPEC sebelum menyerahkannya; skrip cek adalah indera, bukan hakim: hasil merah = lihat sendiri, perbaiki atau tulis alasannya. Penilaian akhir di kamu dan user.

## Profil merek

Profil merek memilih warna, logo, huruf utama, `huruf_kedua` bila ada, dan nada; tidak membuka butir [mutlak]. Cek: `scripts/juri/profil_cek.py`. Belum ada: draf dari brief dan logo, diajukan bersama keyframe pertama; tak menunggu (`templates/merek/README.md`).

## Bila ... buka ...

| Bila | Buka |
|---|---|
| membedah referensi jadi REF-SPEC | `references/bedah-referensi.md` |
| memilih tema, menerjemahkan kata gaya, arah gaya, 5 uji biner | `references/dunia-visual.md` |
| cahaya, kedalaman, permukaan; frame datar; pola ditolak | `references/bahan.md`, `references/pola-salah.md` |
| menimbang mode teks/visual per beat, kotak, grafik di atas footage | `references/decision-guide.md` |
| menulis storyboard, metafora beat, tampilan UI/platform | `references/storyboard.md` |
| mengatur teks layar (posisi, ukuran, gerak per peran) | `references/teks.md` |
| mengatur kamera, transisi, kurva gerak | `references/kamera-gerak.md` |
| anggaran token, satu penilai frame | `references/orkestrasi.md` §4-5 |
| memotong VO, SFX, musik, mix | `references/audio.md` (bagian atas dulu) |
| ada pesan revisi atas video atau storyboard | `references/revisi.md` |
| memilih mekanik per beat | `scripts/cookbook/pilih_kartu.py` (cari menurut tugas beat); buka 2-4 kartu saja |
| membangun dan merender | `references/build.md` (§4 gerbang R1-R5) |
| rekaman talking head mentah, color grading | `references/selects-editor.md`, `references/grade.md` |

## Alat

- `scripts/gate/negatif_cek.py <folder atau frame>`: satu pintu cek NEGATIF (merah: placeholder, tabrakan; sisanya inventaris `permukaan_cek.py`).
- `scripts/warna/cek-warna.mjs masuk|keluar`: gerbang warna (HEX terukur, kontras APCA; `references/warna.md`).
- `scripts/ref_spec.py <video|folder>`: ekstrak REF-SPEC terukur. `scripts/banding.py <frame> <ref>`: frame vs referensi; tanpa ref: `<frame>`, `--seri <folder>`, `--sebelum <lama>`.
- `scripts/lihat.py`: frame per lapis + crop 100 % ke `qc/lihat/`.
- `scripts/juri/tahap.py projects/<proyek>`: langkah berikutnya; `render.sh final` mencetak temuan sebagai informasi (`KETAT=1` menolak).
