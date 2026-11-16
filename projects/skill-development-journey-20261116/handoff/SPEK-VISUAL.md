# SPEK-VISUAL bersama · semua pekerja komponen (Sutradara claude2, 16 Nov)

Kiblat: mode B/C = **07 Baikov/Shapes** (UI sebagai subjek, shape flat, kanvas terang, kamera hidup); tokoh = **37 pixel-character** (tokoh pixel 2D, label callout tipis, 1–4 kata tebal di sisi kosong lawan tokoh, satu bunyi per gerak); teks kinetik di wajah = **83 Barsol**.

## Format & isolasi file
- Proyek Remotion: `projects/skill-development-journey-20261116/remotion/` (sudah ada, remotion 4.0.380, @remotion/three, @remotion/motion-blur, simple-icons). Jangan ubah `package.json`, `src/Root.tsx`, `src/index.ts`, atau file komponen lain. Pasang paket baru = dilarang (tanya lewat REPORT).
- Satu komponen = `src/komponen/<Kxx>-<Nama>.tsx` (+ subfolder `src/komponen/<Kxx>/`). Uji = entry sendiri `src/uji/<Kxx>-entry.tsx` (registerRoot sendiri + `<Composition id="Uji<Kxx>">`), jadi tidak menyentuh Root.
- 1920×1080, fps 30000/1001 (29,97). Semua waktu lewat props dalam frame (`mulai`, `durasi`, jangkar kata) — jangkar asli diisi Sutradara setelah cut terkunci.
- Ekspor juga `objek<Kxx>(props): {nama: string, frame: number, peran: string}[]` (nama objek = isinya, peran dari: objek-mendarat, transisi-dunia, terverifikasi, lempar, putus, sinyal, kata-hero) untuk `objects.json` SFX.
- Still: `npx remotion still src/uji/<Kxx>-entry.tsx Uji<Kxx> ../handoff/stills-<Kxx>/f<NNN>.jpg --frame=<N> --scale=0.5` (lebar 960). Jangan render video penuh. Cek `df -h /` dulu (berhenti bila < 2 GB).

## Warna (arti tetap)
Kanvas `#F6F5F0` (putih hangat), panel `#FFFFFF`, garis `#E4E2DA`, tinta `#1F2328`, tinta-2 `#6B6F76`. Merah/coral negatif `#D93A3F` (di terang). Biru solusi `#2E5BFF` (hanya di permukaan terang). Hijau terverifikasi `#1A7F37`. Brand: Claude `#D97757`, ChatGPT hitam `#0D0D0D`/putih, Gemini gradien `#4285F4→#9B72CB`. Logo brand = path SVG dari paket `simple-icons` atau geometri sendiri; tanpa raster.

## Huruf (dari `claude/motion-graphic/fonts/`, muat lewat @font-face/loadFont lokal)
Poppins (teks kinetik, 600–800), Anton (kata hero), Inter (UI), JetBrains Mono (terminal/kode). Narasi ≥ 56 px tinggi huruf @1080; label UI boleh 20–28 px karena UI adalah subjek yang di-zoom kamera.

## Gerak (wajib, Irfan 16 Nov)
- Setiap gerak = keyframe dengan kurva dari `src/lib/curves.ts` (salinan `claude/motion-graphic/scripts/remotion/curves.ts`): masuk `land` 12–18 f, keluar `leave` 8–12 f, kamera `heavy`/`drift`, ganti keadaan `whip`. Tidak ada `linear`, tidak ada nilai lompat tanpa kurva.
- Gerak cepat diberi motion blur (@remotion/motion-blur atau blur arah ≤ 2–3 f, tanpa ghost).
- Kamera di dalam komponen: push pelan +2…+4 %/dtk saat tenang, hentak +11…+30 % di kata kunci (kartu 37 §6); tidak ada shot > 2 dtk yang datar.
- Pop masuk objek: skala 0,92→1,0 + y 24→0 px, settle tanpa overshoot > 3 %.

## Teks
Hanya dari ucapan Irfan atau data UI asli/log asli yang dikutip di TASK. Tidak ada kata karangan Inggris ("AI WORKFLOW", "LEARNING LOOP", dll.). Kontras ≥ 4,5:1.

## Konvensi props (Sutradara, 16 Nov malam)
Semua props waktu = **frame absolut** di linimasa tuan rumah; `mulai` = frame pertama komponen tampil. (K08 ronde 1–3 memakai relatif terhadap `mulai`: diseragamkan saat integrasi.)
