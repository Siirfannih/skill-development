AWAL SESI SUDAH DIKERJAKAN SUTRADARA (baca dulu)
Bagian "Awal sesi" AGENTS.md sudah dijalankan oleh Sutradara (claude1) untuk sesi ini: main terbaru, doctor untuk Codex dan akun kerja claude2 LULUS. Baris GAGAL yang mungkin kamu lihat di `tools/doctor.sh` hanya menyangkut salinan skill di akun claude1 (`~/.claude`) dan tidak memengaruhi tugas ini. Irfan sudah mengizinkan semua akses untuk video ini dan Sutradara melarang mengulang `--fix`. JANGAN jalankan `tools/doctor.sh` atau `--fix`, jangan bertanya; langsung kerjakan TASK di bawah sampai LAPORAN.

# TASK-K12-r1 · MaskotAI.tsx (tiga maskot voxel 3D di kamar Irfan)

TUJUAN
Satu komponen Remotion `MaskotAI.tsx` (prop `model: "chatgpt" | "claude" | "gemini"`) yang merender maskot voxel 3D lewat `@remotion/three`, terasa benar-benar ada di kamar footage (cahaya, bayangan lembut, tepi halus, grain), plus komposisi uji di atas still footage dan 4 keluaran uji (3 still + 1 lembar 2 dtk).

KONTEKS (kutipan cut sheet, baris B1b; kamu tidak perlu membaca file lain)
- Ucapan Irfan: "…AI model yang kita pake, entah itu CGPT, Claude, Gemini, itu bisa ngebuat sebuah decision…". Tiap maskot muncul TEPAT di kata namanya, satu per satu, lalu tetap hidup sampai akhir kalimat (±3 dtk).
- Waktu uji (detik di still sumber, bukan timeline final): CGPT 9,30 · Claude 10,05 · Gemini 10,55. Footage: 1920×1080, video final 29,97 fps (pakai fps 30 di komposisi uji, 30000/1001 tidak perlu di uji).
- Still footage (raster yang diizinkan, hanya sebagai latar uji): `sumber/still-b1b/cgpt.jpg`, `claude.jpg`, `gemini.jpg` (1920×1080). Salin ke `remotion/public/uji/`.
- Acuan bentuk (dilampirkan): `sumber/ref/maskot-acuan-pixel-crab.png` — badan kotak lebar (±13×7 voxel), "lengan" pendek kiri-kanan setinggi tengah badan, empat kaki pendek, dua mata kotak hitam di sepertiga atas. Acuan rasa: `sumber/ref/karakter-di-ruangan.webp` — karakter kecil kayu di meja yang menyatu dengan cahaya ruangan. Acuan hanya untuk dilihat, TIDAK di-import ke komponen.
- Cahaya kamar terukur dari still: dinding abu kebiruan `#627174` (bawah `#566264`), cahaya utama siang yang dingin dari **kanan kamera agak atas** (sisi kanan wajah `#B88778` lebih terang dari kiri `#A0766A`), fill ambient kebiruan lembut. Noise footage std ±3 per kanal. Hitam footage tidak pekat (baju hitam terangkat ±`#1A1C1D`).
- Ruang kosong: dinding kanan (x 1250–1850, y 150–750). Wajah ada di x 700–1100, y 180–700; tangan bergerak di bawah (y > 760). Jarak maskot ke tepi wajah ≥ 120 px; tidak di kiri atas; margin tepi frame ≥ 5 %.
- Posisi awal (boleh kamu geser sedikit bila komposisi lebih seimbang, catat di REPORT): ChatGPT ±(1330, 430), Claude ±(1560, 300), Gemini ±(1730, 560); tinggi badan maskot ±150–190 px; kedalaman sedikit berbeda (yang di belakang sedikit lebih kecil + blur kedalaman lebih kuat).

DESAIN MASKOT (satu keluarga bentuk, beda warna/aksen)
- Semua dibangun dari voxel kubus dengan tepi membulat halus (RoundedBox / bevel kecil), material doff: `MeshStandardMaterial` roughness 0,7–0,85, metalness 0 (vinyl/kayu cat, bukan plastik mengilap). Tanpa tekstur raster, tanpa logo gambar.
- **Claude:** coral/terakota seperti acuan (`#D97757`, bayangan sedikit lebih tua). Bentuk = acuan.
- **ChatGPT:** badan putih tulang `#ECECE8`, kaki + mata hitam lembut `#1A1C1D`; aksen di dada = simpul logo ChatGPT (enam lengkung saling mengunci) dibangun sebagai geometri (extrude/torus/voxel), warna hitam lembut.
- **Gemini:** badan gradien biru → ungu (`#4285F4` → `#9B72CB`, per voxel searah x lewat vertex color), aksen bintang empat sudut (sparkle Gemini, sisi melengkung ke dalam) sebagai geometri extrude putih kebiruan, melayang kecil di atas kepala atau di dada.

HIDUP (semua keyframe memakai kurva `src/lib/curves.ts`: masuk `land`, pantulan/ganti keadaan `whip`, hold `drift`; tidak ada `Easing.ease`, linear, atau inOut(cubic))
- Masuk: pop dari skala 0 → 1,1 → 1 dengan settle (±10–14 f), sedikit berputar masuk, bukan muncul tiba-tiba, bukan fade.
- Idle: bob naik-turun (amplitudo ±8–12 px, periode 2–3 dtk), napas skala ±1,5 %, kedip mata (mata pipih 2–3 f, tiap 2,5–4 dtk, deterministik dari seed), melirik/menoleh ke arah Irfan (kiri frame) atau ke kamera (rotasi y ±10–15°), kaki bergoyang kecil. **Tiga maskot tidak serempak**: fase, periode, dan jadwal kedip berbeda per model.
- Semua fungsi murni dari `useCurrentFrame()` (aman di-scrub dan dirender paralel). Prop minimal: `model`, `masukFrame`, `x`, `y`, `tinggiPx`, `kedalaman` (0–1), `lihatKe` ("irfan" | "kamera").

MENYATU DENGAN RUANGAN
- Lampu: directional dari kanan-atas-depan, putih dingin (±`#EEF3F5`); hemisphere/ambient langit `#8A979A` tanah `#4A4F50`; intensitas disetel sampai sisi terang maskot tidak lebih terang dari sisi terang wajah dan sisi gelapnya tidak lebih gelap dari baju hitam.
- Bayangan: bayangan lembut di dinding di belakang tiap maskot (jatuh ke kiri-bawah karena cahaya dari kanan), blur besar, opasitas rendah (±15–25 %, multiply), plus self-shadow/AO halus antar-voxel bila murah.
- Tepi tanpa gerigi: antialias + supersample (render ≥ 2× lalu turun), tepi tidak tajam berlebih dibanding footage.
- Grade: hitam terangkat menyamai footage, sedikit desaturasi; grain mengikuti footage (std ±3, seeded per frame, hanya di area maskot); blur kedalaman kecil sesuai `kedalaman`.
- Tidak menutupi wajah atau tangan.

FILE BOLEH (selain ini dilarang)
- `remotion/` di folder proyek ini (buat baru): `package.json`, `remotion.config.ts`, `tsconfig.json`, `src/index.ts`, `src/Root.tsx`, `src/lib/curves.ts` (salinan persis dari `~/work/skill-development/claude/motion-graphic/scripts/remotion/curves.ts`), `src/komponen/MaskotAI.tsx` (+ file pembantu di `src/komponen/maskot/`), `src/uji/UjiMaskot.tsx`, `public/uji/*.jpg`.
- `remotion/node_modules/` (lihat DEPENDENSI), `qc/maskot/` (keluaran uji), `handoff/REPORT-K12-r1.md`.

FILE JANGAN
- Proyek lain di `~/work/skill-development/projects/*` (terutama JANGAN menulis apa pun ke `projects/jadisatu-trojan-v4/remotion/node_modules`), `claude/`, `tools/`, file lain di folder proyek ini (GUIDELINE, CUT-SHEET, STATUS, DECISIONS, suara.wav, wajah.mp4, CUT-MAP*).

DEPENDENSI (disk hanya ±1,5 GB bebas, dipakai sesi lain)
- Cek `df -h /` sebelum install; bila bebas < 600 MB berhenti dan laporkan.
- Paket dasar dipinjam tanpa menyalin: buat `remotion/node_modules/` sebagai folder ASLI berisi symlink per entri ke `~/work/skill-development/projects/jadisatu-trojan-v4/remotion/node_modules/*` (termasuk `@remotion` per sub-paket bila perlu dan `.bin`). Versi remotion di sana 4.0.380, react 18.
- Paket 3D dipasang ke folder sementara (`npm install --prefix /tmp/k12-3d three @react-three/fiber@8 @remotion/three@4.0.380`, react 18 sebagai peer, jangan pasang ulang react) lalu dipindah (bukan disalin ganda) ke `remotion/node_modules/` beserta dependensinya yang belum ada. Pastikan hanya satu salinan react yang terbundel.
- Render WebGL headless: coba `--gl=angle`, lalu `swangle` bila gagal; catat yang dipakai.

LARANGAN (maks 8 baris)
1. Tidak ada PNG/JPG/WEBP di `src/komponen/` (cek: `grep -rE "\.(png|jpe?g|webp)" remotion/src/komponen` = kosong). Raster hanya still footage di komposisi uji.
2. Semua gerak dari kurva `curves.ts`; tidak ada stagger i × konstanta (pakai `react(i)`), tidak ada fade-in/blur-in sebagai cara masuk.
3. Tidak ada teks di komponen maskot.
4. Material doff; tidak ada specular putih mengilap atau rim neon.
5. Jangan merancang komponen lain, jangan render video penuh.

LULUS BILA
- `npx tsc --noEmit` di `remotion/` lulus.
- `qc/maskot/still-cgpt.jpg`, `still-claude.jpg`, `still-gemini.jpg` (960 px lebar, JPEG q≥85): frame komposisi uji ±8 f setelah masuk masing-masing (cgpt: hanya ChatGPT; claude: ChatGPT + Claude; gemini: ketiganya), latar = still footage terkait.
- `qc/maskot/idle-2dtk.jpg`: lembar kontak 8 frame merata dalam 2 dtk dengan ketiga maskot (lebar total ≤ 1920 px, tiap sel ≤ 480 px), memperlihatkan bob, kedip, dan lirik tidak serempak.
- Tepi maskot tidak bergerigi di crop 100 % (sertakan `qc/maskot/crop100.jpg` 480×480 dari satu maskot).
- Grep raster kosong; tidak ada file di luar FILE BOLEH yang berubah (`git status --short` di repo hanya menampilkan path FILE BOLEH).

JANGAN
Render final, ubah kontrak/cut sheet, sentuh file proyek lain, commit/push (Sutradara yang commit).

LAPORAN
Tulis `handoff/REPORT-K12-r1.md` (≤ 25 baris): file yang dibuat, cara node_modules disusun + ukuran yang ditambahkan ke disk, opsi `--gl` yang jalan, waktu render satu still, posisi akhir tiap maskot, nilai lampu, hal yang belum sempurna menurutmu. Jangan menilai bagus/tidaknya hasil sendiri; cukup fakta.
