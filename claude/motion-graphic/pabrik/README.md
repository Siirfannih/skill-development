# Pabrik primitif gerak

Referensi dibedah menjadi PRIMITIF GERAK ATOMIK (tipografi kinetik, visual, kamera, transisi): satu mekanik terukur, dengan pemicu, alasan bekerja, slot, dan daftar kulit yang tidak boleh dicuri. Primitif disintesis menjadi komponen PEMBUNGKUS Remotion yang hanya menerapkan gerak pada konten pemanggil, lalu diuji TRANSFER dengan dua isian slot netral sebelum masuk `registry.json`. Pabrik tidak membangun ulang adegan, UI, latar, atau objek referensi, dan tidak pernah membandingkan tampilan kandidat dengan referensi, karena yang dipindahkan ke video lain adalah cara bergerak, bukan kulit.

Wajib baca [`claude/video-reference-deconstructor/SKILL.md`](../../video-reference-deconstructor/SKILL.md) sebelum fase 1–3; brief ke subagen lewat [`claude/brief-gate`](../../brief-gate/SKILL.md).

## Alur

| Fase | Perintah | Keluaran |
|---|---|---|
| 1a Ukur | `ukur/kata_masuk.py`, `ukur/palet.py`, `ekstrak.py` (gerak.py: kamera, segmen, fit kurva, fps asli, frame duplikat) | angka per frame asli; `ukur/data/<kartu>-<teknik>.json` (skema `ukur-gerak.schema.json`) |
| 1b Bedah | tulis `arsip/<referensi>.md` (kronologi, cut vs gerak, label, uji atomik) dan `spec/<id>.json` per primitif (skema `spec-gerak.schema.json` v4); kombinasi = `resep/<id>.json` berisi id saja | spec + arsip |
| 2 Sintesis | `sintesis.py spec/<id>.json [--model sonnet\|opus] [--baca-dingin]` | `kandidat/<Komponen>/{Komponen.tsx, Demo.tsx, meta.json, brief.txt}`; lint + lint_demo + tsc |
| 3 Uji transfer | `uji.py spec/<id>.json [--putaran 3]` | `hasil.json`, `LAPORAN.md`, `strip-rN-A.jpg`, `strip-rN-B.jpg`, `progres-rN.png` |
| 4 Registri | `daftar.py spec/<id>.json` | entri `registry.json` (versi 3) |

`jalankan.sh <spec>...` menjalankan fase 2–4. Model = `claude1 -p` dengan hak minimum (Read; sintesis juga Write/Edit hanya di `kandidat/<Komponen>/`; tanpa Bash, tanpa skip-permissions); kategori kamera memakai opus. Batas akun = `lib.BatasAkun`. Render memakai kunci `/tmp/remotion-heavy-render.lock`; render sementara dihapus sesudah diukur.

## Fase 1: ukur dan bedah
- Ukur di fps asli (ffprobe); lembar kontak hanya peta. Frame duplikat periodik = animasi ber-fps rendah (tiap 6 frame di 30 fps = 25 fps); nilai kembar di kurva bukan jeda.
- Lompatan besar dalam 1 frame = cut: dicatat di `potong`, tanpa kurva.
- Kurva = progres terukur per frame (`kurva.progres_ref`) + fit bezier + kurva `toolkit/gerak/curves` terdekat; kurva baru masuk toolkit dengan tes paritas.
- Setiap angka di `parameter` berlabel `measured`/`estimated` dengan bukti; `inti: true` + estimated (atau kurva estimated) memaksa `status_maks: teruji-sebagian` (skema).
- Uji atomik: bila satu bagian dibuang dan sisanya tetap berfungsi, pecah. id = `<lapisan>-<aksi>-<objek-generik>`. Pemicu memakai kosakata *Narrative trigger* `cookbook/CATALOG.md`.

## Fase 2: primitif pembungkus
`lint.py` L1–L7 pada komponen: tanpa warna/huruf literal, deterministik, impor terbatas, skema zod, tanpa properti kulit atau elemen gambar. `Demo.tsx` (D1–D3) menerima `isian` "A" | "B" dan hanya merakit `demo-netral/Netral.tsx`: dua isian dengan latar, tinta, huruf, teks, dan wadah berbeda, warnanya jauh dari palet referensi yang dibedah. Model menerima spec (angka + kalimat mekanik + jangan dicuri), bukan frame referensi.

## Fase 3: uji transfer (§6 skill)
Demo dirender dengan isian A dan B. Lulus = semua cek angka di KEDUA isian + kulit tidak bocor + tanpa dosa j + vision.

| Jenis uji | Diukur dari | Cek |
|---|---|---|
| `unit-masuk` | probe DOM tiap frame | muncul potong (opasitas ≥ 0,9) di onset ±2 frame; offset awal x/y dalam rentang_aman; durasi luncur ±2 frame; RMS progres terhadap data measured ≤ 0,10; tanpa pantul; blur awal > 0 dan 0 saat diam |
| `unit-ganti` | probe DOM tiap frame | onset ±2; potong masuk/keluar; unit berikut tepat di frame sesudahnya; diam selama tampil; pusat semua unit dalam toleransi jangkar |
| `kamera-jalan` | piksel render, `gerak.sinyal` (alat yang sama dengan referensi) | geser x, skala dalam rentang_aman; geser y < 0,01; tanpa potongan; RMS progres per frame sejak onset ≤ 0,10; durasi 1→99 % ±2; tanpa pantul |
| semua | render + probe | kulit bocor: klaster warna render (k-means Lab ≥ 0,5 %) dalam ΔE 12 dari `jangan_dicuri.warna`, teks `jangan_dicuri`; dosa j: teks tertutup elemen terlihat > 10 %, tabrakan, terpotong saat diam |
| vision | strip kandidat A dan B saja + kalimat mekanik + jangan dicuri | mekanik terbaca di A, di B, gerak A = B, tanpa kulit tercuri |

Referensi tidak dirender ulang dan tidak diperlihatkan ke kritikus; tidak ada SSIM, korelasi tepi, atau gambar referensi-kandidat berdampingan.

## Registri
`status`: `teruji` · `teruji-sebagian` (parameter inti atau kurva estimated) · `ditolak` (`alasan`). Entri memuat id, kategori, mekanik, pemicu, alasan bekerja, slot, jangan dicuri, props schema, parameter berlabel, arsip, strip A/B, metrik transfer, putaran. Sesi editing mencocokkan beat naskah dengan `pemicu` dan memuat primitif yang dibutuhkan saja; arsip tidak dimuat.

## Keterbatasan
- Probe DOM mengukur kotak teks; gerak yang dibuat di canvas/SVG tidak terlihat oleh cek unit (primitif memang dilarang menggambar).
- `kamera-jalan` butuh panggung bertekstur (banyak titik sudut); panggung polos tidak terukur.
- Kulit bocor warna memakai ΔE76 pada klaster ≥ 0,5 % piksel; warna aksen kecil di bawah itu tidak tertangkap (vision menjadi jaring kedua).
- Vision satu model; strip tetap perlu mata manusia sebelum dipakai produksi.
- Tes: `~/work/mg-venv/bin/python -m unittest scripts.tests.test_pabrik scripts.tests.test_pabrik_gerak` dari `claude/motion-graphic/`.
