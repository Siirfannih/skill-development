# MOTION-CORE: pintu masuk sesi produksi video

Sesi produksi rutin memuat **file ini + satu Format Bible** dari `formats/`, lalu folder proyeknya (`projects/<proyek>/`). Itu cukup untuk mengerjakan video dari beat sheet sampai render final.

Tidak dibuka di sesi produksi: `PETA.md`, `RETRO.md`, `SUMBER.md`, dan kartu `cookbook/`. Semuanya kamus referensi untuk sesi eksplorasi gaya baru (rute lengkap: `SKILL.md`). Cabang `references/` dan `guide/` dibuka hanya bila Format Bible atau pesan gagal sebuah gerbang menyebut bagiannya.

Urutan menang: instruksi user di sesi → `projects/<proyek>/DECISIONS.md` → profil merek (`BRAND.md`, `EDITING.md`) → Format Bible → file ini. Lantai di bawah tidak dikalahkan Format Bible; pengecualian hanya atas instruksi user dan ditulis di `RESEP.md` proyek.

## 1. Lantai: 10 aturan yang tidak ditawar

Nomor dalam kurung menunjuk butir `LANTAI.md` (bunyi lengkap dan butir lain ada di sana; dibuka saat sebuah butir diperdebatkan).

| # | Invarian | Cara cek |
|---|---|---|
| 1 | **Satu lapisan teks.** Semua ucapan tampil sebagai tipografi kinetik editorial; tidak ada pita subtitle terpisah di bawah saat KT tampil (A1). | `cek_komposisi.py` tanda `PITA` nol; frame tahan tiap detik |
| 2 | **Teks tidak menutup wajah, tidak keluar zona aman, dan duduk dekat subjeknya** (jarak ≤ ±8 % tinggi frame, tidak lebih dekat ke tepi daripada ke subjek) (A2, C16). | `cek_komposisi.py` tanda `WAJAH`, `TEPI`, `JAUH` nol |
| 3 | **Terbaca di layar HP.** Kontras ≥ 4,5 : 1, kata sambung ≥ 56 px @1080, 1–3 kata per tampil, maksimal 2 baris, tidak di atas logo atau area ramai tanpa latar diredam (A4, A7, A9). | still di lebar 360 px; `scripts/lego/kt_check.py`; tanda `LOGO` dan `TEKSTUR` nol |
| 4 | **Teks hanya dari ucapan, dan satu kata tidak tampil dua kali** pada saat yang sama (A3, A5). | bandingkan KT dengan tabel kata VO |
| 5 | **Satu fokus per momen**; teks dan visual tidak sama kuat; yang sedang bicara tampil di frame (C14, D21). | still per beat dilihat di zoom 25 % dan 100 % |
| 6 | **Tidak ada pergantian malas.** Nol crossfade; gerak memakai kurva `scripts/remotion/curves.ts`, bukan preset; hold > 1 dtk tetap hidup (B13, B13a). | `scripts/juri/motion_lint.py` PASS |
| 7 | **Tidak ada layar kosong atau placeholder.** Frame 0 langsung berisi visual dan bunyi; setelah potong, isi adegan tampil ≤ 0,3 dtk (D22, D22c). | `cek_komposisi.py` tanda `JEDA` nol; frame tahan tiap detik |
| 8 | **Suara utuh.** Tidak dipercepat, fonem tidak digunting, jeda bersih, level suara asli tidak diturunkan atau di-limit (E23). | `gate/audio_order.py check`, `gate/cut_check.py`, `gate/voice_level.py` PASS |
| 9 | **Bunyi punya alasan dan nyaman.** Satu cue satu objek; ujung SFX dipotong di jeda sunyi atau fade 150–300 ms; nol SFX harsh; suara jelas di speaker HP; musik ada sejak frame 0 (E24, E25, E25a). | `gate/sfx_density.py`, `audio/sfx_potong.py`, `audio/audio_phone.py --gate` PASS |
| 10 | **Visual lulus dulu, audio sesudahnya, render penuh paling akhir.** Revisi hanya mengubah atribut yang diminta; adegan yang sudah disetujui tidak disentuh (F26, F27). | `scripts/juri/render.sh final` PASS; `scripts/juri/revisi_cek.py cek` |

Keputusan yang tidak dijawab brief, proyek, profil merek, maupun Format Bible: tanya user dengan pertanyaan spesifik, jangan menebak (F28).

## 2. Gerbang wajib sebelum render final

Dijalankan dari `claude/motion-graphic/scripts/`, berurutan. Python audio: venv ber-numpy, soundfile, scipy (`PYTHON=<venv>/bin/python`).

| Urut | Perintah | Lulus bila |
|---|---|---|
| 1 | `python3 gate/cek_komposisi.py <episode.json> --public <proyek>/remotion/public` (format story-doc: tambah `--ketat`) | keluar 0; dijalankan **sebelum build** dan lagi di render final |
| 2 | `python3 gate/audio_order.py check --dir <proyek>/audio` | keluar 0: suara → visual → SFX → musik terkunci berurutan dengan buktinya |
| 3 | `python3 audio/sfx_potong.py --laporan <proyek>/audio/sfx_potong.json` | keluar 0: tidak ada bunyi yang hilang saat masih keras |
| 4 | `python3 audio/audio_phone.py --root <folder stem> --gate` | keluar 0: SFX harsh 0 dan median VO clarity ≥ 8 dB |
| 5 | `bash juri/render.sh <proyek> final <Comp> <keluaran.mp4>` (video berfootage: `lego lego/lego.json`) | keluar 0; ia menjalankan ulang gerbang 1–4 dan gerbang juri (resep, still, sanding, draft, audit frame, `qc/JURI.md`) |

Pendukung saat memilih bunyi: `python3 audio/sfx_comfort.py --min-comfort <ambang format> <file…>` (keluar 1 bila ada file di bawah ambang).

Yang harus ada di proyek supaya gerbang 1, 3, dan 4 berjalan di `render.sh` (bila filenya ada dan gagal, render ditolak):

- `projects/<proyek>/FORMAT`: satu baris berisi slug format (nama file di `formats/` tanpa `.md`).
- Data episode `remotion/src/data/*.json` dan `remotion/public/<aset>/aset.json` (kotak wajah, dan `ramai` untuk logo/papan nama) dari pre-processor aset.
- `audio/sfx_potong.json`: laporan `potong_akhir` tiap SFX yang dipotong, ditulis skrip mix.
- `stem_vo.wav`, `stem_music.wav`, `stem_sfx.wav`, `mix.wav`, `cues.json` versi yang sama di `audio/` atau `qc/`.

Gerbang yang gagal diperbaiki pada penyebabnya (data episode, cue, mix), lalu dijalankan ulang. Keluaran gerbang terakhir disalin ke `TAHAP.md` sebagai bukti.

## 3. Format Terkunci

1. Buka `formats/README.md`, pilih **satu** format untuk video ini, tulis slug-nya di `projects/<proyek>/FORMAT`.
2. Baca Format Bible itu utuh. Bentuk adegan, tata potong, peran teks, dan aturan bunyi diambil dari sana, tidak dari kartu `cookbook/`.
3. Naskah masuk produksi sebagai **Beat Sheet** format itu (kolom `Beat | Waktu | Kalimat VO | Jenis adegan | Aset/Subjek | Teks Kunci | Catatan SFX`). Beat sheet yang kolomnya kosong dikembalikan ke penulis naskah sebelum ada kode.
4. Satu video tidak mencampur dua format. Video yang tidak cocok dengan format mana pun adalah sesi eksplorasi gaya baru: keluar dari rute ini dan pakai `SKILL.md`.

## 4. Larangan keras

- **Dilarang melewati `render.sh final`** (atau `lego`) dengan alasan apa pun, termasuk tenggat. Tidak ada render penuh lewat `npx remotion render` langsung, dan tidak ada video yang dikirim tanpa keluaran `render.sh final` PASS. Bila tenggat tidak terkejar, yang dikirim adalah laporan gerbang mana yang belum lulus, bukan video.
- **Dilarang mengedit `scripts/gate/*` atau `scripts/juri/*` di sesi produksi video**, termasuk melonggarkan ambang, menambah pengecualian, atau menyalin skrip ke folder proyek lalu mengubahnya. Gerbang yang dianggap salah dilaporkan ke user dan diperbaiki di sesi perubahan skill tersendiri, dengan tesnya.
- Dilarang mematikan gerbang dengan menghapus atau mengganti nama file pemicunya (`FORMAT`, `aset.json`, `sfx_potong.json`, stem).
- Dilarang mencampur kartu `cookbook/` secara bebas di sesi produksi rutin; bentuk di luar Format Bible diajukan ke user dulu.
- Dilarang menambah elemen yang tidak ada di beat sheet atau brief (teks, logo, efek, bunyi).
