TUJUAN
Ganti isi preview dan timeline pada demo UI editor (UjiB: Remotion Studio, UjiC: Premiere Pro) dengan video yang SUDAH JADI, sesuai koreksi Irfan D-17.

KONTEKS
Koreksi Irfan (inti): "Pake video yang udah jadi seperti videonya Jensen Huang ... jangan pakai asset atau video yang belum jadi, karena logikanya kayak Timeline Editor ... Gak mungkin dong, didalam Timeline ada Timeline ... biar editannya keliatan bener-bener lagi ngedit."
Sekarang: UjiB memakai `pinjam/b1::DuniaRepo` (adegan berisi timeline) sebagai preview Studio; UjiC memakai bentuk SVG uji di monitor Premiere.
Video jadi yang tersedia (proxy 1280×720, lewat staticFile karena `remotion/public/media` → `../../media`):
- `media/footage/jadi/jensen-v4-00-14.mp4` (14 dtk dari video Jensen Huang Behindwork v4; cut di 3,47 / 6,07 / 8,00 / 9,03 dtk)
- `media/footage/jadi/sdj-final1-00-12.mp4` (12 dtk talking head Irfan yang sudah selesai; cut di 4,20 dtk)
- footage mentah untuk Source Monitor Premiere: `media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4`
Komponen (sudah lulus, jangan diubah): `StudioRemotion` (props komposisi, aktif, track[], playhead, preview), `PremierePro` (props program, source, klip[], playhead), `Clawd`.
Yang diminta:
1. UjiB f60–119: StudioRemotion dengan `preview` = OffthreadVideo jensen-v4-00-14.mp4 yang berjalan sesuai playhead; daftar komposisi kiri realistis untuk proyek video (mis. "JensenHuang", "JensenHuang-Vertical", "Thumbnail", "Intro"), aktif "JensenHuang"; track = satu `<Sequence>` per potongan dari daftar cut (0–3,47, 3,47–6,07, 6,07–8,00, 8,00–9,03, 9,03–14) + satu track audio "voice.wav" + satu "music.mp3"; playhead bergerak; Clawd tetap memegang playhead.
2. UjiC f45–89: PremierePro dengan `program` = OffthreadVideo sdj-final1-00-12.mp4 (atau jensen; pilih yang paling terbaca di monitor kecil, sebut alasannya), `source` = F2-b mentah, `klip` = potongan sesuai cut video jadi itu dengan label nama file realistis (mis. "A001_talking.mov", "broll_kota.mp4", "music.mp3").
3. Bagian Claude UjiB f0–59 dan Instagram UjiC f0–44 tidak berubah.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/UjiB.tsx
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/UjiC.tsx
- projects/flat-mirip-mirip/media/acuan/komponen/E-*.png
- projects/flat-mirip-mirip/handoff/REPORT-editor-isi-r1.md

FILE JANGAN
Komponen StudioRemotion/PremierePro/Clawd/AppClaudeTerang/BerandaIG, tema.ts, Root*.tsx/index*.ts, PapanFootage.tsx (pekerja lain), pinjam/**.

LARANGAN
Tidak ada adegan berisi UI/timeline di dalam preview/monitor; tidak ada PNG; video jadi diputar sebagai video (OffthreadVideo), bukan still.

LULUS BILA
tsc lulus; still E-studio-f090.png (entry src/indexB.ts) dan E-premiere-f070.png (entry src/indexC.ts) memperlihatkan video jadi di preview/monitor; REPORT menyebut frame video jadi yang tampil.

JANGAN
Commit, render video penuh.

LAPORAN
REPORT-editor-isi-r1.md.
