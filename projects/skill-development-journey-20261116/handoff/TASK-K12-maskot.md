# TASK-K12-maskot · Builder (Codex) · pemberi: Sutradara claude2

TUJUAN       Komponen Remotion `MaskotAI.tsx` (three.js via @remotion/three): maskot voxel ChatGPT, Claude, Gemini yang terasa hidup dan benar-benar ada di kamar Irfan, plus komposisi uji di atas still footage.
KONTEKS      Proyek: projects/skill-development-journey-20261116/remotion/ (buat baru: salin package.json/tsconfig.json/remotion.config.ts dari projects/jensen-pain-suffering/remotion; remotion 4.0.380; node_modules sebagai folder sendiri, pasang @remotion/three@4.0.380, three, @react-three/fiber versi yang cocok dengan remotion 4.0.380 dan React di sana).
             Acuan bentuk: projects/skill-development-journey-20261116/sumber/ref/maskot-acuan-pixel-crab.png (karakter blok: badan kotak lebar, "lengan" kotak di kiri-kanan, 2 mata kotak hitam, 4 kaki kotak pendek). Acuan rasa: sumber/ref/karakter-di-ruangan.webp (karakter kecil seperti mainan fisik di meja, cahaya ruang).
             Tiga karakter satu keluarga bentuk (voxel, sudut sedikit dibulatkan/bevel), beda brand:
               claude  = coral/terakota #D97757 seperti acuan, mata #141413.
               chatgpt = badan putih tulang #F7F7F5 dengan sisi hitam #0D0D0D, mata hitam; aksen simpul/heksagon logo OpenAI sebagai geometri tipis di dada (bukan gambar).
               gemini  = gradien biru #4285F4 → ungu #9B72CB (vertex color/shader), mata gelap #1F1F3A; aksen bintang 4 sudut (sparkle Gemini) melayang kecil di atas kepala.
             Footage: kamar, dinding abu-terang, pintu biru tua di kiri, cahaya siang lembut dari kiri-depan agak dingin; Irfan di tengah-kanan, kemeja hitam. Frame uji: ambil 3 still dari sumber ~/.codex/attachments/d9062ade-e728-4775-b6cd-1b2e61bfd5b8/DJI_20261116162607_0603_D.MP4 di detik 9,5 / 11,0 / 12,5 (scale 1920×1080, JPG ke remotion/public/uji/ — satu-satunya raster yang boleh, karena itu footage).
             Props: model, masuk (frame mulai), posisi layar {x,y} + skala, sisi tatap (kiri/kanan/kamera), seed fase.
FILE BOLEH   projects/skill-development-journey-20261116/remotion/** , projects/skill-development-journey-20261116/handoff/REPORT-K12-maskot.md , projects/skill-development-journey-20261116/handoff/stills-k12/**
FILE JANGAN  file lain mana pun; proyek lain; skrip skill; jangan ubah node_modules proyek lain.
LARANGAN     - Tanpa PNG/JPG/SVG raster di komponen; semua geometri + material di kode. Satu-satunya raster: still footage uji di public/uji.
             - Semua gerak = keyframe dengan kurva ease-in-out dari claude/motion-graphic/scripts/remotion/curves.ts (salin ke src/); tidak ada linear/lompat. Idle pakai sinus halus (bob 2–3 % tinggi badan, periode 1,6–2,4 dtk, fase beda per karakter).
             - Hidup: masuk pop + settle (skala 0→1,08→1 kurva `land`, 14–18 f), kedip mata tiap 2,5–4 dtk (2–3 f), menoleh/melirik ±12–20° ke arah Irfan lalu ke kamera, kaki/lengan bergoyang kecil. Tiga karakter tidak serempak.
             - Menyatu: key light dari kiri-depan sedikit dingin + fill lembut + ambient dari warna dinding; material doff (roughness 0,6–0,8, tanpa specular tajam); contact shadow/bayangan lembut; antialias/supersample (tepi tanpa gerigi); grain halus + blur sangat tipis supaya sama dengan footage.
             - Tidak menutupi wajah Irfan; ukuran karakter ±9–14 % tinggi frame.
LULUS BILA   - `npx tsc --noEmit` lulus; `grep -rE "\.(png|jpe?g|webp)" remotion/src/` hanya merujuk public/uji.
             - Komposisi `UjiMaskot` (1920×1080, 29,97 fps, 6 dtk): latar still detik 11,0, Claude masuk f0, ChatGPT f30, Gemini f60 di sekitar Irfan (bahu kiri, sisi kanan kepala, bawah kanan).
             - Render ke handoff/stills-k12/: 3 still (f20, f90, f170) JPG lebar 960, dan satu lembar 6 frame f100–f150 untuk menunjukkan idle. Render still pakai `npx remotion still` (bukan video penuh). Cek `df -h /` dulu; berhenti bila < 600 MB.
JANGAN       render video penuh, memutus posisi final di timeline (Sutradara), memeriksa hasil sendiri sebagai "lulus" estetika, commit/push.
LAPORAN      handoff/REPORT-K12-maskot.md ≤ 15 baris: file dibuat, versi paket, cara cahaya/bayangan dibuat, hasil tsc + grep, path still.
