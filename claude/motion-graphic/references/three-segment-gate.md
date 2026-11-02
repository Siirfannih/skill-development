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
- **Ukuran font seragam dalam satu urutan.**
  - Pembedanya huruf kapital di awal, misalnya "This time progress was so Fast".
  - Bisa juga warna aksen yang kontras. Ukuran tidak dibesarkan.
- **Hindari pola "blok di kiri + teks di kanan" di atas latar hitam polos.** Pola ini menyisakan ruang kosong besar di atas dan bawah, jadi melanggar gaya Apple yang modern dan elegan. Isi frame dengan visualnya, dan kamera fokus ke objek.

## Kinetic typography: teknik dipilih menurut PERAN teks (prinsip dari audit referensi 2 Nov, bukan aturan mutlak)
Kesalahan v9: tiga gaya (fade in, pop up, text melebar) diulang sebagai hiasan. Referensi memilih teknik menurut fungsi teks.
- **Ucapan (VO/narasumber):**
  - Kata ditambah satu per satu dengan jeda sekitar 3 f.
  - Masuknya blur → tajam 2–3 f, atau naik dari balik mask 3–4 f.
  - Baris rata tengah di-tengahkan ulang setiap kali kata baru masuk.
  - Ukuran seragam.
- **Penekanan tanpa memperbesar huruf:**
  - warna aksen;
  - kata sebelumnya diredupkan;
  - ganti gaya (serif italic, ketebalan);
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

- **Gerbang DENGAR wajib sebelum SFX masuk mix (Irfan 2 Nov 12.02).** Angka level/spektrum tidak memberi tahu bunyinya seperti apa. Langkahnya:
  1. Jalankan `git submodule update --init external/earshot` lalu pasang earshot; di Mac bila disk cloud sempit, dengan Python 3.12.
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
  | kata kinetik muncul (`word:`) | klik mouse/tap |
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
