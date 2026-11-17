AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-1a-r4 · Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca REPORT-1a-potong.md Ronde 3 + edit/r3-NEXT.md + edit/r3-retention-audit.md. Yang LULUS dikunci (isi, jeda, ASR, sinkron, durasi). Ronde ini HANYA gerbang sumber (Lantai E23).
TEMUAN       T1 22 kata isi < 85 % durasi sumber: perbaiki tiap batas — geser titik potong ke tepi kata di waveform/spektrum (guard 50 ms), boleh menambah ≤ 80 ms per sambungan; durasi total boleh naik sampai 1:26.
             T2 6 batas editorial mengiris kata: pindahkan batas editorial ke celah sunyi terdekat sebelum/ sesudah kata utuh (kata ikut dibuang utuh atau dipertahankan utuh, pilih yang tidak mengubah makna kalimat).
             T3 Setelah T1–T2: cut_check (dengan dan tanpa map) + audio_order lock suara harus LULUS; ASR 16/16 dan sinkron diulang.
             Bila setelah 2 percobaan sebuah kata tetap < 85 % karena pengukuran durasi ASR mentah tidak andal (bukan karena fonem hilang), buktikan dengan spektrogram + onset/offset energi, catat sebagai "pengukuran" per kata di DECISIONS.md — jangan ubah ambang alat.
FILE BOLEH   edit/**, CUT-MAP-v2.json, transkrip-hasil.md, CUT-SHEET.md (waktu & naskah), DECISIONS.md (tambah baris), handoff/REPORT-1a-potong.md
FILE JANGAN  semua lainnya; skrip alat; gain/loudness.
LULUS BILA   PUTUSAN LULUS: cut_check tanpa map, cut_check --source-words/--map, audio_order lock suara, ASR kata kunci, sinkron; durasi 1:20–1:26.
JANGAN       commit/push, render visual.
LAPORAN      "Ronde 4" ≤ 8 baris di REPORT-1a-potong.md.
