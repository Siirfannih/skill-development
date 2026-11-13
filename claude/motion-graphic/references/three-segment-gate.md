# Gerbang 3 Segmen (Irfan, 2 Nov 2026 06.48)

Claude tidak melihat video saat menulis kode. Karena itu kode harus ditulis seperti visualnya sendiri: tiap objek bernama sesuai isinya, punya timecode, perannya di layar, dan bunyinya. Kesalahan ditangkap di tahap paling murah. Setiap segmen harus lolos sebelum segmen berikutnya dimulai. Target: putaran perbaikan ≤ 30 menit, karena yang diperbaiki hanya temuan kecil, bukan seluruh video.

## Segmen 1 · Kode (sebelum render apa pun)
- **Nama objek = isi visual.** Contoh: `Altman ngomong`, `Image1`, `Image2`, `Image3`, `Kalender hari kerja`, `Blok Invoice Oktober`. Penanda SFX memakai id yang sama: `<scene>:<objek>:<peristiwa>` (mis. `02e:cal:block:Invoice_Oktober`).
- **Logika SFX turun dari nama.** Contoh:
  - `<Pembicara> ngomong` berarti ada narasumber, jadi ducking BGM.
  - `Image1..N` berarti pergantian gambar cepat, jadi satu SFX tiap pergantian.
  - `Blok … muncul` berarti satu bunyi UI.
  - Kamera patah ke wide berarti whoosh.
- **Koordinat, warna dan kontras ditetapkan di kode:**
  - Teks memakai komponen bersama (`AnchorWord`, `SpeakerLine`) yang menjepit ke safe zone (`lib/safe.ts`).
  - Warna teks dipilih terhadap latar. Tidak hanya hitam dan putih: warna aksen boleh selama kontrasnya ≥ 3:1.
- **Lolos jika:**
  - Kode rapi dan mudah dikenali.
  - Tiap objek bernama dan terikat ke SFX/BGM-nya.
  - Tidak ada teks di luar komponen bersama tanpa alasan.

## Segmen 2 · Pra-render (kanvas + timeline di Remotion)
- Jalankan `node seg2_probe.mjs <dir> <a> <b> 8 0.25`.
  - Hasilnya: still kecil tiap 8 frame, plus log `OBJ` berisi kotak layar tiap objek bernama. Kotak diambil dari DOM Remotion, sudah termasuk transform kamera.
  - Log `SFXEV` ikut tercatat.
- Jalankan `python3 tools/seg2_layout_check.py <dir>`. Pemeriksaannya:
  - **SAFE:** teks utuh di dalam x 15–85 %, y 20–80 % (1920×1080: x 288–1632, y 216–864). Mengikuti safe zone thumbnail YouTube.
  - **CLASH:** dua teks bertumpuk.
  - **CONTR:** kontras teks vs latar < 4,5:1.
    - Perbaikannya lewat warna teks, posisi di area tenang, atau text-shadow lembut.
    - **Dilarang menambah pita/scrim gradien hitam di belakang baris** (Irfan 07.30: kasar, tepinya terlihat, menurunkan estetika).
    - Teks narasumber di atas footage yang sudah terbaca dengan shadow lembut boleh diterima walau angka checker rendah. Keputusan mata Irfan menang atas metrik. Teks yang tak terbaca atau bertabrakan dengan warna di belakangnya mengurangi 1 poin estetika.
- Lihat contact sheet still ≤ 960 px untuk estetika: ruang kosong, hierarki, variasi.
- **Lolos jika** laporan LOLOS dan contact sheet bersih.
- **Gerbang kedip teks per frame (wajib, Irfan 3 Nov 05.31).** Contact sheet per detik tidak bisa melihat kedip 1–15 frame. Jalankan probe untuk SETIAP frame (`node seg2_probe.mjs <dir> 0 <durasi> 1 0.1`), lalu `tools/text_flicker_check.py` (proyek PKS). Lolos hanya jika temuan berikut nol:
  - **DIP:** teks yang sama tampil, hilang ≤ 15 f, lalu tampil lagi;
  - **CEPAT:** blok tampil < max(1,0 dtk; 0,4 + 0,2 × jumlah kata dtk);
  - **DULUAN HILANG:** blok hilang sebelum VO selesai mengucapkan kata terakhirnya + 0,25 dtk;
  - **KEDIP PENEKANAN:** kata penekanan berkedip.

  Pengecualian harus ditulis beserta alasannya.

  Aturan desain di baliknya:
  - teks VO dikelompokkan per klausa/kalimat, tidak dipotong per jumlah karakter;
  - teks diam sampai VO selesai;
  - teks VO tidak disembunyikan lewat CSS `:has()` atau mask yang disampel jarang. Pakai interval penekanan yang di-debounce.

  Gerbang yang sama dijalankan lagi pada render final.

## Segmen 3 · Render MP4
- Render per segmen (Mac `seg.sh`), lalu periksa:
  - durasi;
  - sinkron SFX dan backsound;
  - per frame di sekitar cut;
  - transisi;
  - gerbang audio (keterdengaran SFX, VO di atas latar pada volume HP).
- Render final sekali, setelah reviewer segar memberi SHIP.

## Hierarki kerja dengan subagent (Irfan, 2 Nov 07.33)
Urutan wewenang: **Irfan → Claude utama (planner/QC) → worker.** Saran worker bukan keputusan.
- **Tingkat 0 · mekanis:** worker boleh langsung mengerjakan, dengan bukti still sebelum/sesudah. Contohnya:
  - geser koordinat ke safe zone;
  - cocokkan timing ke ucapan;
  - terapkan aturan yang sudah terkunci.
- **Tingkat 1 · desain:** worker hanya menulis **mini proposal** dan belum boleh menerapkan. Yang termasuk:
  - elemen visual baru;
  - warna, latar, scrim atau gradien;
  - menghapus atau menambah teks;
  - tata letak, transisi.
  
  Isi proposalnya:
  - masalah yang ditemukan;
  - perubahan yang diusulkan;
  - still pratinjau 480 px (render eksperimen, belum di-commit);
  - prinsip desain mana yang dipenuhi;
  - customer journey: apa yang dilihat penonton dan dalam urutan apa.

  Claude utama menguji proposal secara visual terhadap prinsip dan feedback Irfan, lalu menyetujui atau menolak. Baru setelah itu worker menerapkan.
- **Tingkat 2 · global:** hanya Claude utama yang mengubahnya, dan bila menyentuh selera, dilaporkan ke Irfan. Yang termasuk:
  - lib bersama;
  - font, palet, gaya kinetic;
  - aturan skill.
- **Biaya:** proposal ringan (beberapa ratus token + 1 thumbnail). Itu jauh lebih murah dari membatalkan perubahan yang salah setelah menyebar dan setelah dilihat Irfan.
  - Proposal dikirim sekaligus per worker, tidak satu per satu.
- **Kasus pelajaran (2 Nov):**
  - Brief worker menyebut "scrim boleh", lalu worker menambah pita gradien hitam tanpa uji visual.
  - Irfan menolaknya: kasar, menurunkan estetika.
  - Kesalahannya ada di brief, yang memberi wewenang desain tanpa gerbang.

## Aturan teks (terkunci)
- **Teks = penekanan, prioritas 2.** Visual kuat tidak butuh teks.
  - Contoh salah di PKS v9: "8 jam", "45 menit", "TIDAK BERHENTI", "PERSIS".
  - Cara yang benar: kalender padat yang bloknya muncul perlahan sudah cukup menjelaskan.
- **Satu baris = satu ukuran** (Irfan 6 Nov). Besar-kecil acak dalam satu baris membuat baris tidak seimbang. Kata yang dibesarkan pindah ke barisnya sendiri; pembeda di dalam baris lewat warna aksen, bobot, atau KAPITAL.
- **Hindari pola "blok di kiri + teks di kanan" di atas latar hitam polos.** Pola ini menyisakan ruang kosong besar di atas dan bawah, jadi melanggar gaya Apple yang modern dan elegan. Isi frame dengan visualnya, dan kamera fokus ke objek.

## Running text + penekanan (Irfan 2 Nov 14.18)
- **Mode teks per beat dipilih lewat `decision-guide.md` §1** (visual saja / penekanan / diegetik / caption / label). Caption hanya bila mode caption video nyala; bila nyala, ia berjalan per klausa mengikuti VO (Irfan 6 Nov).
  - **Koreksi v21 (Irfan 2 Nov 22.25):** satu baris datar di pita bawah = subtitle, bukan kinetic. Tiap frasa VO butuh KOMPOSISI sendiri
    (`lib/KineticVO.tsx` PKS): posisi di ruang kosong atau menempel objek yang dirujuk, 1–2 baris (line/stair/column/drop), kata kunci
    (redup sisanya, kotak sorot, baris besar), kata baru lahir di ujung baris lalu baris bergeser bersama, enter/exit dirotasi,
    frasa berikut di tempat sama menukar (tidak menumpuk) dan keluar tidak menyeberang cut. Kontras lewat tinta per latar + chip padat
    (layering), bukan gradien. Kerja: still per frasa (`stills.sh`) → tetapkan zona dari still → still ulang sampai tidak ada tabrakan.
  - Saat ada penekanan (AnchorWord/SpeakerLine), subtitle diganti oleh penekanan. Penekanan tampil lebih dulu, dan katanya tidak diulang di subtitle.
  - Subtitle tidak berbunyi. Klik hanya untuk kata penekanan/kinetic.
- **Ukur cakupan hanya bila mode caption nyala:** persentase kata VO yang tampil. Kasus v10: 17 %, dan Irfan menyebutnya fatal. Bila caption mati, yang diukur adalah setiap beat punya mode yang tercatat di tabel beat.
- **Variasi kinetic wajib.** Fade/pop yang selalu sama membuat penonton bosan. Pakai `enter` = `type` (huruf per huruf + caret), `mask`, `letters`, `blur`; `scale` hanya untuk angka/hero. Teknik yang sama maksimal 2× berturut-turut.
- **SFX family:** satu file SFX sering berisi beberapa varian. Potong per varian (`ears/family.py`), dengarkan tiap varian, dan pakai yang paling cocok, bukan seluruh file. Peran yang Irfan tandai "acak" (mis. Kinetictypography) dirotasi di antara variannya.
- **Setiap objek/visual punya bunyinya.** Contoh kasus v10: ketikan tanpa bunyi ketik. Ketikan memancarkan `type:start|end` → potongan Keyboardtyping sepanjang ketikan + Enter.

## Sesi otonom/terjadwal (Irfan 2 Nov 23.49)
- Proses panjang (render, probe seluruh film, earshot banyak file) wajib dijalankan di **latar belakang**, jangan sebagai perintah foreground yang menunggu.
  - Kasus v21: satu perintah menahan sesi 1 jam 15 menit. Pesan Irfan tidak terbaca dan tidak ada laporan.
- Kirim **progres singkat minimal setiap 15–20 menit** lewat SendUserMessage: apa yang selesai, apa yang berjalan, dan perkiraan selesai.
- Sesi yang dibuat untuk Irfan selalu membawa dua instruksi di atas dalam prompt-nya.

## Kinetic typography: teknik dipilih menurut PERAN teks (prinsip dari audit referensi 2 Nov, bukan aturan mutlak)
Kesalahan v9: tiga gaya (fade in, pop up, text melebar) diulang sebagai hiasan. Referensi memilih teknik menurut fungsi teks.
- **Ucapan (VO/narasumber):**
  - Kata ditambah satu per satu dengan jeda sekitar 3 f.
  - Masuknya blur → tajam 2–3 f, atau naik dari balik mask 3–4 f.
  - Baris rata tengah di-tengahkan ulang setiap kali kata baru masuk.
  - Satu baris satu ukuran.
- **Penekanan tanpa memperbesar huruf:**
  - warna aksen;
  - kata sebelumnya diredupkan;
  - ganti gaya (ketebalan, KAPITAL, atau serif yang tidak sejajar dengan bold);
  - kotak sorot.
- **Drama lewat kamera:** punch-in cepat atau rack-focus close-up → wide, bukan pop skala teks.
- **Teks yang hidup di objek:**
  - mengetik per huruf di UI asli;
  - label berupa tombol yang didorong kursor;
  - objek atau ikon disisipkan di antara kata ("Chief [ikon] Marketing").
  - Ini pola terkuat untuk menyambung teks dan visual.
- **Gaya yang tidak ditemukan di referensi:** tracking-out "melebar" dan pop membesar. Pop hanya dipakai untuk angka atau hero yang bergerak, lalu mendarat di tengah.
- **Kalimat pesan berada di pita tengah, y sekitar 36–64 %.** Pengecualian hanya untuk yang disengaja: hero full-bleed singkat, dan caption.

## Audio (koreksi)
- **Rentang −21 s/d −41 dB adalah aturan BACKSOUND (BGM), bukan SFX.**
- **Level SFX dan backsound ditetapkan dari kondisi VO ASLI proyek** (karakter suara, tone, tema, kepadatan ucapan), lalu diukur di mix kita sendiri:
  - keterdengaran per cue;
  - VO tetap di atas latar pada volume HP 20/50/100 %;
  - tidak ada 2–6 kHz yang menusuk.

- **Gerbang DENGAR wajib sebelum SFX atau musik masuk mix, di semua video dan semua mesin (Irfan 2 Nov 12.02; diperluas Irfan 8 Nov).** Tersambung ke gerbang 0, 3, 9, 10, 11 di `SKILL.md` §4. Earshot tidak terpasang atau gagal = berhenti dan lapor, bukan lanjut tanpa telinga (gagal: V5 8 Nov di PC server, submodule tidak pernah di-init). Angka level/spektrum tidak memberi tahu bunyinya seperti apa. Langkahnya:
  1. Jalankan `git submodule update --init external/earshot` lalu pasang earshot; di Mac bila disk cloud sempit, dengan Python 3.12. PC server (`node-c-pc`): earshot terpasang di `~/work/mg-venv` (`earshot doctor` harus lulus).
  2. `earshot describe` tiap file.
  3. `earshot match` dengan deskripsi peran plus `--alts` pembanding salah, misalnya "car engine starting", "motorcycle revving", "error buzz", "record scratch".
  4. Hanya kandidat "strong" yang tidak kalah dari pembandingnya yang boleh dipakai.
  5. Simpan laporannya di proyek.
  6. Setelah mix, `earshot timeline` seluruh film untuk mencari label yang salah.
- Kasus 2 Nov: whoosh transisi terdengar "record scratch/tape stop" dan pop UI terdengar "error buzz". Keduanya lolos semua gerbang angka, tapi Irfan mendengarnya seperti starter mobil.

### Kata kode = bunyi (Irfan 2 Nov 12.36/12.41, pola The Gap v18 + video #2 "20 konten")
Kasus PKS v10b: semua SFX lolos gerbang angka dan label earshot, tetapi Irfan tetap menolaknya. Ada tiga penyebab:
1. Pergantian foto memakai swipe/whoosh.
2. Whoosh terlambat. File ditaruh mulai di frame penanda, padahal puncak whoosh baru datang 200–400 ms kemudian.
3. Bunyi dirotasi acak dan deep (`sub-cinematic`, 28×).

Aturannya:
- **Satu kata kode = satu bunyi yang sama sepanjang video.** Peta peran → file ditulis di `palette.json` proyek. Tidak ada rotasi acak.
- **Tabel peran wajib:**

  | Kata kode | Bunyi |
  |---|---|
  | `:photo:` / gambar berganti | klik kamera (shutter), satu per gambar |
  | kata kunci berganti (bukan tiap kata) | tick lembut SFXIrfan |
  | kamera atau objek bergerak (`:cam:`, `push`, `wipe`, `drag`…) | satu whoosh udara tipis |
  | kartu/ikon muncul | pop UI |
  | centang/berhasil | nada pendek (marimba/pluck) |
  | cahaya menyala | switch |
  | garis tergambar | glide |
  | objek mendarat | thud lembut |
  | hapus | trash |

- **Karakter bunyi: renyah, agak nyaring, bernada seperti motion Apple.** Ekornya alami pendek; bukan echo yang ditambahkan. Tidak deep, tidak kasar.
  - Ukur centroid, keharmonisan (autokorelasi), nada dasar, porsi > 6 kHz dan 2–6 kHz, serta ekor (puncak → −30 dB), lalu bandingkan dengan palet proyek yang lulus (`ears/palette.py`).
- **Whoosh hanya bila ada gerak nyata.** Cek kurva gerak video (`ears/motion_curve.py`: phase-correlation + beda global).
  - Tidak ada gerak → whoosh dibuang.
  - Ada gerak → **puncak** file jatuh di frame v_max (`align:"peak"` di mixer).
  - Transien klik/pop jatuh di onset objek (`align:"onset"`).
- **Mixer wajib menyelaraskan isi file, bukan awal file.** `mix_v10c.py` menghitung offset onset/puncak tiap file.
- **Bedah referensi dengan earshot sebelum memilih palet (Irfan 12.57):**
  1. Jalankan `earshot timeline <ref.mp4> --detail high` pada tiap referensi dan proyek yang lulus.
  2. Ringkas dengan `ears/tl_sum.py`: label per jenis, centroid, prominence di atas bed, potongan tanpa bunyi.
  3. `earshot profile` lalu `critique --profile` mix sendiri.
  4. Samakan tiga hal:
     - kosakata bunyi (label earshot mix ≈ label referensi);
     - prominence per jenis;
     - sinkron potongan (status `near` yang konsisten berarti offset sistematis).
  - Contoh: `projects/pengganti-kita-sendiri/audio-v19/EARSHOT-REFS-2NOV.md`.
- Penanda kata dipasang otomatis di `AnchorWord`/`SpeakerWords` (`word:<teks>:<frame>`). Klik kata dilebur bila event lain jatuh ≤ 2 f.

## Referensi = prinsip dan studi kasus, bukan aturan tetap (Irfan, 2 Nov 07.03)
- Angka dari video referensi (level SFX +X dB, BGM −Y dB, durasi transisi, ukuran font) dipakai sebagai **simulasi**: apa yang terjadi pada angka itu, dan apa dampaknya ke penonton.
- Angka referensi tidak disalin menjadi aturan mutlak untuk proyek lain, karena karakteristik suara, tone dan tema berbeda.
- Keputusan akhir selalu diuji pada materi proyek sendiri.

## Latar
- Hindari hitam polos monoton untuk adegan UI atau objek.
- Pakai gambar nyata, misalnya lanskap atau langit dengan objek diletakkan di dalamnya dan teks boleh di belakang objek. Bisa juga gradien premium: langit biru → cakrawala hangat, awan lembut, pendar.
- Latar diberi parallax lebih lambat dari kamera.
- Hitam tetap boleh bila sengaja dipakai untuk fokus.
