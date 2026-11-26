# Pabrik primitif

Memaksa referensi dibedah jadi primitif kecil yang terstruktur, lalu tiap komponen Remotion diuji otomatis sebelum masuk katalog (`registry.json`). Model memilih dari registry, tidak mengarang CSS/shader dari nol. Komponen memakai `toolkit/` (curves, Camera25D, LightWaveBg, Grain), tidak membuat versi sendiri.

Aturan bedah dan uji: wajib baca [`claude/video-reference-deconstructor/SKILL.md`](../../video-reference-deconstructor/SKILL.md) sebelum fase 1–3 (primitif atomik, angka measured/estimated, uji transfer dua isian slot, tanpa perbandingan tampilan dengan referensi). Brief ke subagen lewat [`claude/brief-gate`](../../brief-gate/SKILL.md).

## Alur (4 fase, satu skrip tiap fase)

| Fase | Perintah | Keluaran |
|---|---|---|
| 1 Ekstraksi | `ekstrak.py <kartu> --teknik T1 --kategori <k> --komponen Nama [--klip v.mp4 --dari s --sampai s]` | `spec/<kartu>-<teknik>.json` (skema ketat `spec.schema.json`; validasi jsonschema, 3 upaya) |
| 2 Sintesis | `sintesis.py spec/X.json [--nama N]` | `kandidat/<Nama>/{Nama.tsx, Demo.tsx, meta.json}`; lint + `tsc` otomatis |
| 3 Uji | `uji.py <Nama> --spec spec/X.json [--putaran 3]` | `LAPORAN.md`, `hasil.json`, `lembar-rN.jpg`, `stills-rN/` |
| 4 Registrasi | `daftar.py <Nama>` | entri di `registry.json` |

Satu perintah: `jalankan.sh kartu:teknik:Nama:kategori[:klip:dari:sampai] ...` (1 → 4 berurutan). Model = CLI `claude -p --model sonnet` (atur dengan `PABRIK_CLAUDE=<perintah>`, mis. akun `claude2`; tanpa CLI, pabrik berhenti dengan pesan yang menyimpan prompt ke file supaya satu model bisa mengerjakannya sendiri) dengan hak minimum, tanpa `--dangerously-skip-permissions`: Read saja (ekstraksi, kritikus); sintesis juga Write/Edit hanya di `kandidat/<Nama>/`; tanpa Bash. Render berat memakai kunci `/tmp/remotion-heavy-render.lock`. Dependensi lewat symlink `../node_modules` (tidak masuk git).

## Skema spec
`kategori` salah satu dari `atmosfer | gerak_kamera | permukaan_ui | tipografi`; `parameter` terukur per kategori (atmosfer: tipe, palet relatif/peran, arah cahaya, kecepatan, grain · gerak_kamera: kurva cubic-bezier/spring, durasi, transisi, lintasan · permukaan_ui: radius, border, blur, bayangan · tipografi: hierarki tinggi relatif, tracking, unit animasi, pola masuk/keluar). Selain itu `mekanik` (yang dipindahkan), `kulit` (yang TIDAK dibakukan), `bukti` (frame + detik), `terukur.dari_klip` (jujur: false = gerak hanya perkiraan dari keyframe statis).

## Lint props (`lint.py`, komponen bukan Demo)
L1 nol hex/rgb/hsl · L2 nol font-family literal · L3 nol nama warna CSS · L4 tanpa `Math.random`/`Date.now`/rAF/timer · L5 impor hanya remotion/react/zod/toolkit/scripts/remotion · L6 wajib `export const <Nama>PropsSchema` (zod). Alasan: gaya yang menempel di komponen menjadi template tersembunyi; keacakan bebas-biji membuat render paralel berbeda.

## Uji (fase 3) dan syarat lulus
**Lulus = nol dosa DAN semua metrik keras dalam ambang.** Tidak ada skor. Revisi maksimal 3 putaran; tiap revisi menerima daftar dosa + 5 hal adversarial + metrik gagal.

Render tiap putaran (kunci render global): A skala 1 dengan probe DOM; A dengan teks disembunyikan (`--props={"sembunyikanTeks":true}`, harness menyuntik CSS transparan; selisih render penuh vs tanpa-teks = mask teks); B skala 0,5.

**Kontrak token (kulit referensi tidak boleh bocor).** `tokens-netral.json` mewajibkan DemoA = netral dingin terang, DemoB = netral hangat gelap (enam peran: latar, permukaan, tinta, redup, aksen, aksen2; diturunkan dari `toolkit/latar/presets`). `meta.json` harus memuat persis keduanya, dan setiap hex di `Demo.tsx` harus anggota set itu (atau hitam/putih); huruf A = B. Tidak memenuhi = ditolak sebelum render.

**Referensi selaras waktu.** Spec berklip menyimpan `terukur.klip {path, dari, sampai}`. Frame demo ke-i dipasangkan dengan frame klip pada waktu relatif yang sama (`t = dari + (i - mulai)/(selesai - mulai) × (sampai - dari)`, normalisasi durasi); lembar menampilkan pasangan selaras berlabel waktu. Referensi hanya keyframe = STATIS: lembar memakai keyframe berbeda berurutan berlabel "statis", tanpa metrik struktur dan gerak temporal, status maksimum `teruji-sebagian`.

Dosa biner (satu "Ya" = TOLAK):
| Kode | Dosa | Dihitung oleh |
|---|---|---|
| a | gradien ragu-ragu | skrip: `banding.py` F1 |
| b | noda/gradien radial pojok tanpa arah cahaya | vision |
| c | benda 3D generik tanpa makna | vision |
| d | elemen utama < 20 % luas dan pusat ±12 % tengah pada ≥ 3 sampel berturut (stride 2 frame) | skrip |
| e | halo/glow di belakang teks | vision |
| f | blur pada konten yang harus dibaca | vision |
| g | placeholder | vision |
| h | teks < 24 px @1080 (sisi pendek) | skrip: probe DOM |
| i | warna di luar palet token (`cek-warna.mjs keluar` warna-nyasar: luas ≥ 0,5 %, ΔE2000 > 12; plus `metrik.palet_dosa`) | skrip |
| j | teks tertutup > 10 % titik sampel oleh elemen lain, teks tabrakan, teks keluar kotak wadahnya, teks ada di DOM tetapi tak terlihat di render (selisih penuh vs tanpa-teks) | skrip: probe `elementsFromPoint` + mask teks |
| o | lapisan non-teks di atas kotak teks (≥ 2 % titik) pada frame mana pun (probe tiap 3 frame + still kunci) | skrip |
| p | kulit referensi bocor: warna-nyasar yang dekat (ΔE < 12) ke palet referensi (`cek-warna.mjs masuk` pada frame referensi yang dipakai uji) | skrip |
| k | pola warna latar dari noise (asap/lava lamp) | vision (hanya komponen berlatar toolkit) |
| l | orb/sumber cahaya utuh di dalam frame | vision (komponen berlatar) |
| m | ruang negatif < 50 % (piksel ΔE < 3 dari warna dasar) | skrip (komponen berlatar) |
| n | grain > 2 % (residu frekuensi tinggi pada area datar) | skrip (komponen berlatar) |
| q | ada elemen menutupi/memotong teks, ditanyakan per baris | vision |
| r | frame tampak rusak/glitch, ditanyakan per baris | vision |
| j1–j3 | mengulang pola salah satu jangkar ditolak (`~/work/pabrik-run/jangkar/`) | vision (Ya/Tidak + bukti) |

Vision: SATU gambar gabungan (referensi kiri | kandidat kanan, sel sama besar). Ia juga diminta 5 hal spesifik yang membuat kanan tampak lebih murahan; daftar ini bukan syarat lulus, hanya masukan revisi.

Metrik keras (`AMBANG` di `uji.py`): struktur selaras waktu (klip): rata-rata skor (SSIM + korelasi tepi)/2 pasangan selaras ≥ 0,15 dan ≥ rata-rata pasangan tak selaras (frame demo vs referensi di waktu lain) · lintasan gerak (gerak_kamera berklip: progres centroid per segmen vs kurva spec, RMS ≤ 0,15, rasio durasi 0,5–2; kategori lain: ≥ 25 % pasangan frame berubah; korelasi energi gerak vs klip dilaporkan, bukan syarat) · dua set token (`edge_warna` ≥ 0,80, selisih piksel RGB ≥ 12).

## Registry
`status`: `teruji` (lulus, spec diukur dari klip) · `teruji-sebagian` (lulus, spec dari keyframe statis: kurva/lintasan perkiraan) · `ditolak` (tidak lulus setelah 3 putaran; `alasan` = dosa + metrik). Entri memuat nama, fungsi, kartu sumber, kategori, props schema (teks zod), demo stills, lembar side-by-side, metrik akhir, tanggal. Setelah merge ke main, komponen yang lolos dipindah ke `toolkit/` bersama registry.

## Keterbatasan
- Metrik gerak hanya sekuat spec: referensi tanpa klip memberi kurva perkiraan (status `teruji-sebagian`).
- Struktur vs keyframe tidak membuktikan kemiripan (lihat kalibrasi); dosa vision bergantung pada satu model dan bisa meleset (positif palsu/negatif palsu); lembar side-by-side selalu perlu mata manusia sebelum dipakai produksi.
- Probe DOM hanya menangkap teks sebagai node DOM (bukan teks di canvas/WebGL) dan hanya tiap 3 frame + still kunci; oklusi diuji lewat `elementsFromPoint` pada 24 titik per teks (lapisan tembus pandang dan transparan diabaikan); dosa f (blur) dan e (halo) tidak punya pengukur skrip.
- Palet REF-SPEC tidak dipakai (spec hanya menyimpan luma/saturasi relatif); palet yang diuji = set token netral wajib, dan warna referensi dipakai hanya untuk mendeteksi kebocoran (dosa p).
- Tes: `~/work/mg-venv/bin/python -m unittest discover -s claude/motion-graphic/scripts/tests` (skema, lint, metrik dengan fixture, probe, registry).
- Kebocoran kulit hanya terdeteksi untuk WARNA (dosa p); bentuk/objek yang meniru referensi dalam warna token netral tidak terdeteksi skrip.
- Dosa d (fokus < 20 % luas dan di tengah) menghukum mekanik yang memang memusatkan satu objek besar-tipis (mis. satu kata per ketukan); komponen semacam itu bisa ditolak karena aturan, bukan karena rusak. Ukuran fokus berasal dari `banding.py` (kasar).
- Metrik lintasan gerak memakai centroid massa tepi: kilatan transisi/grid mencemari lintasan, dan bila spec memuat banyak gerak, perbandingan per segmen hanya kasar.
- Vision satu-model bisa berganti keluhan tiap putaran (whack-a-mole); 3 putaran tidak menjamin lulus.
