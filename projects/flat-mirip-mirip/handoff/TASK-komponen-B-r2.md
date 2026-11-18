TUJUAN
Perbaiki isi AppClaudeTerang supaya tidak memuat data pribadi dari screenshot acuan dan sidebar terlihat seperti riwayat nyata; komponen lain dari ronde 1 sudah LULUS dan tidak disentuh.

KONTEKS
Ronde 1 (REPORT-komponen-B-r1.md) dinilai Sutradara: StudioRemotion dan Clawd LULUS. AppClaudeTerang: struktur dan proporsi sama dengan acuan, tetapi:
TEMUAN
- B2-1 sidebar: 6 judul diulang sampai 20 baris → terlihat palsu. Ganti dengan 18 judul unik netral bergaya judul sesi Claude (kalimat pendek, huruf kapital di awal, campur Indonesia/Inggris), mis.: "Edit video reel", "Riset referensi motion", "Storyboard konten minggu ini", "Caption carousel produk", "Audit warna brand", "Ide konten baru", "Script VO 60 detik", "Daftar b-roll", "Revisi thumbnail", "Analisis hook pesaing", "Rencana posting Desember", "Subtitle otomatis", "Color grading footage", "Musik latar yang cocok", "Ringkas podcast", "Template timeline", "Feedback klien", "Checklist render". Tetap tampilkan pemisah "This computer" seperti acuan, satu kali.
- B2-2 panel kanan + footer berisi data pribadi dari screenshot: "work · node-c-pc" (hostname), Outputs "sanding.jpg", "director-gate-before-build.md", "RESEP.md", Background tasks "Wait for cutting round 4" / "40 finished", nama akun kiri bawah "Irfan · Seda-ethio". Ganti: Environment → "Local · MacBook Pro"; Context tetap (persen boleh 12 %); Outputs → "video.mp4", "edit-plan.md", "timeline.json"; Background tasks → satu baris "Render preview" dengan durasi "2m" dan status jalan; akun kiri bawah → inisial "B" + "Behindwork" (tanpa sub-nama).
- B2-3 judul jendela atas: ganti "Karakter AI dengan animasi 3D" bila masih ada → judul sesi aktif "Edit video reel".
- B2-4 font: tetap Inter (font asli aplikasi tidak tersedia); tulis di REPORT sebagai batasan, jangan mengganti font lain.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/bersama/ui-asli/claude/AppClaudeTerang.tsx (dan file data kecil baru di folder itu bila perlu)
- projects/flat-mirip-mirip/media/acuan/komponen/B2-*.png
- projects/flat-mirip-mirip/handoff/REPORT-komponen-B-r2.md

FILE JANGAN
Semua file lain: StudioRemotion, Clawd, UjiB, RootB/indexB, tema.ts, bersama/* milik A, ui-asli/instagram/**, ui-asli/premiere/** (pekerja C sedang jalan), pinjam/**.

LARANGAN
Tidak mengubah tata letak, ukuran, warna, atau gerak yang sudah sama dengan acuan; hanya teks isi yang disebut di TEMUAN.

LULUS BILA
- `npx tsc --noEmit -p .` lulus (file pekerja C yang belum selesai boleh dilaporkan bila mengganggu).
- Still `media/acuan/komponen/B2-claude-f050.png` (entry src/indexB.ts) dan `B2-sanding-claude.png` (kiri acuan, kanan hasil) dibuat.
- `grep -nE "node-c-pc|sanding.jpg|director-gate|cutting round|Seda-ethio|Karakter AI" remotion/src/bersama/ui-asli/claude/*.tsx` kosong.

JANGAN
Commit, render video penuh.

LAPORAN
REPORT-komponen-B-r2.md (singkat: file diubah, hasil grep, path still).
