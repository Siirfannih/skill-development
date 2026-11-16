AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-papan-r2 · Codex (Sol 6.1 High) · pemberi: Sutradara claude2
G2 Sutradara atas handoff/henti1/sanding.jpg: B1b, B2, B3-A, B4, B6 LULUS (jangan diubah). Revisi dua panel + satu panel baru.
TEMUAN
 T1 B5 (wajib, keputusan Irfan RESEP.md §5): ganti dua jendela transkrip menjadi **UI chat gaya putih fun** seperti sumber/ref/chat-ui-putih-fun.png dan sumber/ref/chat-ui-langit.png: bubble besar membulat (teks ±44 px @1080), avatar karakter ASLI (Claude crab coral, ChatGPT/Codex bunga biru ">_" persis seperti sumber/ref/chatgpt-codex-ikon-asli.png), nama pengirim kecil di atas bubble, satu bubble balasan berwarna (Claude = coral muda, Codex = biru), indikator mengetik "•••" di bubble berikut, reaksi kecil (✓ hijau) di bubble terakhir. Pesan ASLI dari handoff/PAHAM-SKILL-DEV.md §D Adegan 1 (maks 4 bubble di layar): Codex "doctor.sh gagal: 8 skill berupa salinan, bukan symlink. Boleh menjalankan --fix?" → Claude 2 (Sutradara) "Sudah kujalankan doctor --fix. Jangan bertanya, langsung kerjakan TASK." → Codex "Revisi kamera selesai; lima still tersedia." → bubble sistem kecil "Dicatat: … supaya tidak terulang" + garis loop kembali ke bubble pertama + centang hijau. Latar: bidang terang 07 (putih hangat → biru muda lembut) dengan 1–2 bentuk raksasa biru di belakang, kedalaman lapis (bubble mengambang dengan bayangan lembut). Kata "koordinasi" (diucapkan) boleh tetap sebagai judul besar tapi tidak di kiri atas.
 T2 B3-C: kata "workflow" di kiri atas melanggar Wajib (teks tidak di kiri atas). Pindah ke tengah-atas atau kanan, ukuran tetap besar.
 T3 Panel baru B4-effort (RESEP §5): kartu "Effort" gelap elegan meniru sumber/ref/ref-woinlesss-spin-sheet.jpg (Faster ↔ Smarter, slider dengan ikon otak sebagai pegangan, jejak titik pixel ungu-merah muda bercahaya, label tingkat "Max") melayang di sisi kiri wajah Irfan (frame sumber detik 109,0), tidak menutupi wajah; ditambah 20x/5x kecil di bawahnya boleh. Sanding vs ref-woinlesss-spin-sheet.jpg.
FILE BOLEH   remotion/src/papan/**, remotion/public/papan/**, remotion/src/uji/papan-entry.tsx, handoff/henti1/**, handoff/REPORT-papan.md
FILE JANGAN  semua lainnya.
LULUS BILA   tsc lulus; papan-B5.jpg, papan-B3-C.jpg, papan-B4-effort.jpg (960) diperbarui; handoff/henti1/sanding-r2.jpg (3 baris: kita kiri, acuan kanan).
JANGAN       render video, commit/push.
LAPORAN      bagian "Ronde 2" ≤ 6 baris di REPORT-papan.md.
