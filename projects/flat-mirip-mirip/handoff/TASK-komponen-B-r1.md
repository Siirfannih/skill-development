TUJUAN
Port komponen UI asli + Clawd dari kode pinjaman menjadi komponen bersama video flat-mirip-mirip yang tampilannya sama persis dengan aplikasi aslinya, beserta still untuk dinilai Sutradara.

KONTEKS (folder kerja: projects/flat-mirip-mirip; Remotion 4.0.380 terpasang di remotion/)
- Kode pinjaman (disalin dari proyek lain, basis commit f054dec) ada di `remotion/src/pinjam/`: `b3.tsx` AppClaude (+ `bersama/chat/*`, `bersama/ui-asli/claude/*`, `bersama/Jendela.tsx`), `b1.tsx` DuniaRepo (panel timeline + Clawd), `bersama/KarakterPixel.tsx`, `KarakterLayer.tsx`, `LembarPixel.tsx`. Pakai ulang kodenya; jangan menulis ulang dari nol.
- Aturan Irfan: semua UI dibangun ulang dan harus sama persis dengan UI aslinya; tanpa PNG untuk UI (SVG/JSX); gambar acuan hanya untuk mencocokkan tampilan.
- Komponen yang diminta:
  1. `remotion/src/bersama/ui-asli/claude/AppClaudeTerang.tsx`: aplikasi Claude desktop TEMA TERANG persis seperti acuan `projects/skill-development-journey-20261116/sumber/ref/claude-code-slash-irfan.png` (2000×1228; baca saja, jangan ubah folder itu): bilah judul macOS, sidebar sesi, area chat, panel kanan Environment/Context/Outputs, composer bawah dengan "+", ikon enter dan mikrofon, status "Opus 5.5 High · Auto". Judul sesi di sidebar diganti netral (mis. "Edit video reel", "Riset referensi", "Storyboard konten", "Caption minggu ini", "Audit warna", "Ide konten baru") — JANGAN memakai judul dari screenshot (nama proyek pribadi). Props: `lampiran?: {nama: string; jenis: 'video'}` (chip file di composer: ikon play + "video.mp4" + "Video"), `ketik: {teks: string; mulai: number; cps: number}` (teks diketik huruf per huruf, kursor berkedip), `kirimPada?: number` (tombol kirim/enter tertekan 3 frame). Teks prompt contoh: "Claude please help me edit this video like a professional video editor".
  2. `remotion/src/bersama/ui-asli/remotion/StudioRemotion.tsx`: Remotion Studio persis seperti acuan `projects/flat-mirip-mirip/media/acuan/U4-remotion-studio-utuh.png` + `U4-remotion-studio-playhead.png` dan ukuran di `handoff/REPORT-studio-acuan-r1.md`, tetapi font SF Pro Display (`remotion/public/fonts/sfpro-display-*.otf`, sudah ada) karena tampilan Studio di Mac. Props: `komposisi: string[]` (daftar kiri), `aktif: string`, `track: {nama: string; mulai: number; durasi: number; warna?: 'seq'|'audio'}[]` (timeline bawah: baris `<Sequence>` biru + satu baris audio hijau berbentuk gelombang seperti screenshot Remotion Studio kiriman Irfan), `playhead: number` (frame), `preview: ReactNode` (isi preview tengah).
  3. `remotion/src/bersama/Clawd.tsx`: port Clawd piksel dari `pinjam/bersama/KarakterPixel.tsx`/`KarakterLayer.tsx`/`LembarPixel.tsx`: props `pose: 'depan'|'samping'|'belakang'`, `emosi: 'netral'|'senang'|'kaget'`, `skala`, `pegangPlayhead?: boolean` (lengan memegang garis playhead seperti b1). Warna Clawd boleh literal di file ini HANYA bila dipindah ke `bersama/ui-asli/claude/warna.ts` (warna maskot asli Anthropic), lalu diimpor.
  4. Komposisi uji `UjiB` (1920×1080, 120 frame) di file baru `remotion/src/bersama/ui-asli/UjiB.tsx` yang menampilkan bergantian: AppClaudeTerang dengan lampiran video.mp4 + mengetik prompt (f0–59), StudioRemotion dengan Clawd memegang playhead di timeline (f60–119). Daftarkan lewat file `remotion/src/RootB.tsx` yang mengekspor `<UjiBRoot/>` (JANGAN mengubah Root.tsx/index.ts: milik TASK A; Sutradara yang menggabungkan). Untuk render still, buat entry sementara `remotion/src/indexB.ts` (registerRoot(UjiBRoot)).

KARTU
| Kartu / acuan | Yang diambil | Gambar |
|---|---|---|
| Aplikasi Claude asli (acuan utama U1) | tata letak, warna, ukuran huruf, ikon | projects/skill-development-journey-20261116/sumber/ref/claude-code-slash-irfan.png |
| 79 siirfannih (UI chat Claude + maskot) | chip video.mp4 di composer; Clawd | claude/motion-graphic/guide/referensi/sheets/keyframes/79-k5-ui-chat.jpg, 79-k7-maskot-papan.jpg |
| Remotion Studio asli (U4) | panel, warna, ukuran, timeline | projects/flat-mirip-mirip/media/acuan/U4-remotion-studio-*.png |

LARANGAN
- Warna UI asli hanya di `bersama/ui-asli/<aplikasi>/`; di luar itu pakai token `bersama/tema.ts`.
- Tanpa PNG/JPG di komponen; ikon digambar SVG.
- Tidak ada teks UI karangan yang tidak ada di aplikasi asli; judul sesi netral sesuai daftar di atas.
- Kurva gerak dari src/lib/curves.ts.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/** (baru)
- projects/flat-mirip-mirip/remotion/src/bersama/Clawd.tsx
- projects/flat-mirip-mirip/remotion/src/RootB.tsx, projects/flat-mirip-mirip/remotion/src/indexB.ts
- projects/flat-mirip-mirip/media/acuan/komponen/B-*.png
- projects/flat-mirip-mirip/handoff/REPORT-komponen-B-r1.md

FILE JANGAN
tema.ts, src/Root.tsx, src/index.ts, src/bersama/* lain (milik TASK A), src/pinjam/** (baca saja), folder proyek lain (baca saja acuan yang disebut), file skill.

LULUS BILA
- `npx tsc --noEmit -p .` lulus.
- `python3 claude/motion-graphic/scripts/juri/tema_cek.py projects/flat-mirip-mirip/remotion/src/bersama` tidak menandai file tugas ini.
- Still `media/acuan/komponen/B-claude-f050.png` dan `B-studio-f090.png` (entry indexB.ts) + `B-sanding-claude.png`: still AppClaudeTerang berdampingan dengan acuan claude-code-slash-irfan.png pada skala sama (kiri acuan, kanan hasil), `B-sanding-studio.png` dengan U4-remotion-studio-playhead.png.
- Di REPORT: daftar perbedaan yang masih terlihat antara hasil dan acuan (jujur), per elemen.

JANGAN
Commit, render video penuh, mengubah kode pinjaman.

LAPORAN
REPORT-komponen-B-r1.md.
