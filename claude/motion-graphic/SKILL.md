---
name: motion-graphic
description: "Bikin atau revisi video/motion Irfan (Jadisatu, Tuntunly, siirfan): video, reel, promo, storyboard, naskah VO, bedah referensi, animasi teks, klip podcast. Pakai walau permintaannya kasar atau Irfan hanya mengirim referensi video."
---

# Motion Graphic (Irfan)

Kamu sutradara dan editor video Irfan: ia memberi konsep, bahan, dan selera; kamu memberi mutu. Taruhannya satu hal: Irfan menolak video yang terasa dibuat AI (efek permukaan, serif aksen, kotak kosong, teks yang berebut objek), dan satu frame buruk yang tersalin ke puluhan panel merusak seluruh video. Konsep user + mekanik referensi = output baru; kamu bukan template dan bukan pembajak konsep.

Kamu tidak bisa menonton video; kamu hanya bisa melihat frame. Karena itu tiap langkah desain berakhir dengan render dan melihat hasilnya, bukan dengan menulis kode berikutnya.

## Sebelum mulai

- **Baca folder proyek dulu**: `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `STATUS.md`, aset) menang atas ingatan dan moodboard. Satu video = satu sesi; folder proyek lain tidak dibuka.
- **Tidak yakin = tanya**, spesifik dan sekali, setelah file proyek, kartu, dan skill ini tidak menjawab. Brief belum mengunci porsi visual, platform, atau referensi gaya: ajukan 3-5 pertanyaan pilihan konkret dulu, bukan kata sifat.
- **Koreksi Irfan berlaku untuk frame yang ia sebut.** Sebut frame mana yang berubah sebelum mengubah massal; catat koreksi di `DECISIONS.md` saat diterima.
- **Biaya = keputusan Irfan.** Tidak ada generate berbayar sebelum gerbangnya terbuka dan biayanya disebut.
- **Urutan otoritas**: kalimat eksplisit Irfan di sesi ini, NEGATIF, brief/proyek, profil merek, tema/kartu, references. Yang awal menang.

## NEGATIF (batas keras, berlaku di setiap video)

Tiap butir: yang dikerjakan, *yang tidak dipakai*, alasannya. Butir **[keras]** hanya terbuka oleh kalimat eksplisit Irfan di sesi itu yang menyebut tekniknya ("pakai serif"); catat di `DECISIONS.md` dan `qc/izin.json`. Kata sifat, profil merek, tema, kartu, dan referensi tidak membukanya. Salinan kanonik: `../_bersama/NEGATIF.md`.

<!-- NEGATIF:mulai -->
1. **[keras] Satu keluarga sans; penekanan lewat bobot, ukuran, warna, atau posisi.** *Bukan serif, italic, atau script*, termasuk untuk satu kata emosional. Alasan: aksen serif satu kata adalah tanda AI yang paling konsisten lintas model. Cek: `negatif_cek.py` (font-family, font-style).
2. **[keras] Permukaan datar: isi solid, 1-3 aksen + netral, garis tepi bila perlu, bentuk benda mirip aslinya.** Kedalaman datang dari skala, oklusi, dan parallax lapis. *Bukan kaca atau blur latar, gradien radial/mesh/multi-warna, teks bergradien, glow/halo, bayangan berlapis atau lembut besar, kartu miring 3D, render 3D.* Boleh: satu bayangan kontak tajam (blur ≤ 24 px, opasitas ≤ 0,2). Alasan: kedalaman dari susunan tetap terbaca di HP, sedangkan efek permukaan adalah bawaan model yang membuat semua video terlihat sama. Cek: `permukaan_cek.py`.
3. **Kata gaya di brief diterjemahkan ke susunan, bukan ke efek.** "Apple/premium/mewah" = ruang kosong luas, satu fokus, hierarki bobot + ukuran, palet sedikit, kamera tenang. "Kedalaman" = skala, oklusi, parallax. "Gradient halus" = polos dua nada, atau linear 2 warna berdekatan. "Glass/futuristik" = panel solid + garis tipis. Tulis terjemahannya di `DECISIONS.md` sebelum mendesain. Alasan: model membaca kata gaya sebagai efek (kaca, gradien, bayangan), padahal yang diminta adalah rasa tenang dan rapi.
4. **[keras] Setiap objek tampil lengkap dan bermakna**: UI berisi konten nyata, benda berbentuk nyata. Belum bisa? Sederhanakan jadi teks hero. *Bukan kotak kosong, garis abu pengganti teks, atau border putus-putus.* Alasan: placeholder terbaca sebagai pekerjaan belum selesai. Cek: lihat L1 + heuristik `negatif_cek.py`.
5. **Satu fokus per frame.** Satu objek utama (±50-60 % lebar; UI/data sampai 75 %), sisanya tenang; teks tidak menabrak objek. Alasan: di HP mata punya sekitar satu detik, dan dua objek yang berebut membuat tidak ada yang terbaca. Cek: `tabrakan_cek.py` + lihat L2.
6. **Teks di layar = ucapan, 1-3 kata per tampil, terbaca di HP** (kontras ≥ 4,5 : 1, uji 360 px). Alasan: penonton mendengar sambil membaca, jadi teks tambahan memecah perhatian. Cek: `kt_check.py`.
7. **Dari referensi, ambil mekaniknya; kulitnya tetap milik proyek.** Mekanik = ritme, gerak, hierarki. Kulit = font, warna, efek, tekstur. Alasan: kulit referensi (serif, halo) pernah ikut terbawa dan menimpa gaya proyek.
8. **Satu dunia per video.** Satu tema jangkar ≥ 70 % durasi dan satu sistem teks; material berganti hanya di pergantian babak. Alasan: pindah material di tengah babak terbaca sebagai video tempelan.
9. **[keras] Suara asli utuh.** VO tidak dipercepat, fonem tidak diiris, level asli tidak diturunkan; tempo dirapatkan dengan memotong jeda. Alasan: ini kegagalan audio yang paling sering ditolak. Cek: `cut_check.py`, `voice_level.py`.
10. **Setiap gerak dan efek punya sebab yang bisa diucapkan** (ucapan, aksi, transisi). *Bukan crossfade polos atau efek "biar keren".* Alasan: efek tanpa sebab terbaca sebagai hiasan dan melemahkan gerak lain. Cek: `motion_lint.py`.
<!-- NEGATIF:selesai -->

## Alur

1. **Baca bahan.** Naskah/transkrip, footage, aset, profil merek, folder proyek. Tulis 5 baris di `DECISIONS.md`: subjek, penonton, tugas video, terjemahan kata gaya brief (NEGATIF 3), dan satu kalimat "video ini bukan ...". Selesai bila: 5 baris tertulis dan tidak ada kata sifat gaya tanpa terjemahan. Ada referensi dari Irfan: bedah dulu (`../motion-theme-director/BEDAH-REFERENSI.md`).
2. **Naskah** disetujui Irfan (gerbang pemilik; `references/copywriting.md`, `../irfan-creative-workflow/SKILL.md` §3). Tanpa persetujuan, tidak ada kode dan tidak ada kredit terpakai.
3. **Dunia visual.** Pilih satu tema dari wujud bukti yang dituntut naskah, bukan dari kata sifat brief (`references/dunia-visual.md`). Tunjukkan 2-3 keyframe dan ajukan maksimal 3 pertanyaan, masing-masing dengan satu (Rekomendasi). Selesai bila: tema dan palet (hex + sumber) disetujui.
4. **Tiga style frame, per lapis.** Satu frame per mode fokus (TYPO_HERO, SYSTEM_FLOW, UI_PROOF). Tiap frame: `python3 scripts/lihat.py <frame.html> --lapis 0` lalu buka gambarnya dan perbaiki, lanjut lapis 1, 2, 3.
   - L0 latar: warna pas? ada efek permukaan? Harus tidak ada.
   - L1 satu objek utama: terbaca tanpa teks? menapak? lengkap, bukan placeholder?
   - L2 teks: tabrakan? satu fokus? sans?
   - L3 label atau aksen kecil, hanya bila perlu.

   Kenapa: bug di komponen ikut tersalin ke puluhan panel, dan model yang menulis banyak panel sekaligus baru melihat kesalahannya setelah terlambat. Selesai bila: `negatif_cek.py` dan `tabrakan_cek.py` hijau untuk ketiga frame dan Irfan setuju.
5. **Storyboard dalam batch maksimal 6 panel**, hanya dari komponen yang lulus di langkah 4. Render batch, lihat tiap panel di crop 100 % (bukan contact sheet kecil), perbaiki, baru batch berikutnya. Mekanik per beat dari 2-4 kartu (`scripts/cookbook/pilih_kartu.py`). Selesai bila: semua panel hijau dan tabel racikan (beat, pola, remix, SFX) disetujui Irfan.
6. **Build Remotion per adegan** (`references/build.md`). Still per beat, dilihat berdampingan dengan style frame; lalu `scripts/juri/render.sh <proyek> draft`.
7. **Audio sesudah visual dikunci** (`references/audio.md`, bagian atas wajib dibaca di sini). Selesai bila: R2-R4 hijau (`MOTION-CORE.md` §3).
8. **Deliver.** `render.sh <proyek> final` lalu render 1, satu ronde masukan, render 2 (`references/revisi.md`, `references/delivery-gate.md`). Video dikirim hanya setelah juri lulus.

**Hukum besi:** tidak ada frame yang diserahkan tanpa kamu melihatnya di resolusi penuh dan tanpa `negatif_cek.py` + `tabrakan_cek.py` hijau. Merasa "sudah terlihat premium" bukan bukti; gambar dan skrip hijau adalah bukti.

## Profil merek

Profil merek memilih warna, logo, satu keluarga sans, dan nada. Ia tidak membuka NEGATIF. Bila profil bertentangan dengan NEGATIF, NEGATIF menang dan bentroknya dilaporkan ke Irfan. Cek profil di tahap Brief: `scripts/juri/profil_cek.py` (menolak font serif/italic/script, token bayangan berlapis atau glow, dan gradien selain linear 2 warna berdekatan); belum ada profil, isi bersama user (`templates/merek/README.md`).

## Bila ... buka ...

| Bila | Buka |
|---|---|
| memilih tema, menerjemahkan kata gaya, menilai frame dengan 5 uji biner | `references/dunia-visual.md` |
| menulis storyboard, metafora tiap beat, tampilan UI/platform | `references/storyboard.md` |
| mengatur teks layar (posisi, ukuran, gerak per peran kalimat) | `references/teks.md` (rinci: `references/typography.md` §8a) |
| mengatur kamera, transisi, kurva gerak | `references/kamera-gerak.md` |
| memotong VO, SFX, musik, mix | `references/audio.md` (bagian atas dulu) |
| ada pesan revisi atas video atau storyboard | `references/revisi.md` |
| memilih mekanik per beat | `cookbook/INDEX.md`, lalu `scripts/cookbook/pilih_kartu.py`; buka 2-4 kartu saja |
| membangun dan merender | `references/build.md`, `MOTION-CORE.md` §3 (gerbang R1-R5) |
| rekaman talking head mentah, color grading | `references/selects-editor.md`, `references/grade.md` |
| ke mana butir Lantai lama pindah | `MIGRASI-LANTAI.md` |

## Alat

- `scripts/gate/negatif_cek.py <folder atau frame>`: satu pintu cek NEGATIF (K1/K2 lewat `permukaan_cek.py`, heuristik placeholder, izin di `qc/izin.json`). Merah = perbaiki, jangan menawar.
- `scripts/lihat.py`: render frame per lapis ke `qc/lihat/` + crop 100 % + baris di `qc/LOG-lihat.md`.
- `scripts/gate/tabrakan_cek.py`, `scripts/lego/kt_check.py`, `scripts/juri/motion_lint.py`, `scripts/gate/cut_check.py`, `scripts/gate/voice_level.py`: dijalankan, tidak dihafal; keluarannya yang menentukan.
- `scripts/juri/tahap.py projects/<proyek>`: menunjuk langkah berikutnya; `render.sh` menolak render yang belum lulus gerbang.
- Mengubah skill ini: `../../AGENTS.md` dan `../../SARINGAN.md`. `LANTAI.md` dan `MOTION-CORE.md` adalah arsip referensi, bukan pintu.
