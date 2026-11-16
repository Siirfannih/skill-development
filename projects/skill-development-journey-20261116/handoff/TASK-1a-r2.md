AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-1a-r2 · Pemotong Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca handoff/REPORT-1a-potong.md + TASK-1a-potong.md (ronde 1). Pilihan babak & durasi 1:33,6 DITERIMA. Ronde 2 = bersihkan sampai gerbang lulus.
PUTUSAN SUTRADARA atas konflik (tulis juga ke DECISIONS.md sebagai baris "16 Nov · putusan potong r2"):
 P1 "tuh" (8×) = sampah, dibuang semua. Di sambungan ucapan-ke-ucapan boleh crossfade equal-power 8–12 ms di zero-crossing (pengecualian microfade 2 ms, hanya untuk sambungan buang-"tuh"); cari batas di waveform/spektrum, bukan timestamp ASR. Bila satu "tuh" benar-benar tak bisa dibuang tanpa memotong fonem kata isi, pindahkan batas ke awal/akhir frase (ambil ulang dari take sumber yang setara) — jangan dibiarkan.
 P2 Jeda: jeda klausa di batas kalimat/klausa dipertahankan ≤ 0,45 dtk (GUIDELINE §3); jeda di dalam kalimat (diam_kal) dipangkas ke ≤ 0,15 dtk kecuali jelas batas klausa (koma) → ≤ 0,30; antar_kal > 0,60 dipangkas ke 0,35–0,45; diam yang ditelan di dalam durasi kata (diam_kata) dibuang sampai ≤ 0,12. Jalankan cut_check dengan `--max-sentence 0.45` dan biarkan `--max-inner` bawaan; diam_kal di batas koma yang ≤ 0,30 dicatat sebagai pengecualian bernama di DECISIONS (kata + detik).
 P3 "finally" di B1 wajib utuh: pre-roll ≥ 120 ms sebelum "Oke", periksa onset "fi-" di spektrum; ASR large-v3 tanpa prompt harus membaca "finally".
 P4 Validator sumber: CUT-MAP-v2.json harus mencakup SETIAP token sumber yang dihapus sebagai cut eksplisit (penghapusan editorial babak dinyatakan sebagai segmen cut berlabel "editorial"), supaya --source-words/--map tidak lagi melapor "omits a source token not covered by a cut". Durasi kata hasil ≥ 85 % durasi sumber.
 P5 Gumam 4× (3,84 · 10,26 · 17,94 · 85,42): periksa; buang bila napas/gumam, pertahankan bila bagian kata.
 P6 Level/pause_clean = fase 2 (Penata suara), BUKAN tugas ini. Jangan ubah gain.
FILE BOLEH   edit/**, CUT-MAP-v2.json, transkrip-hasil.md, CUT-SHEET.md (kolom waktu & naskah saja), DECISIONS.md (tambah baris), handoff/REPORT-1a-potong.md
FILE JANGAN  semua lainnya.
LULUS BILA   cut_check (dengan dan tanpa --map, `--max-sentence 0.45`) PUTUSAN LULUS atau hanya pengecualian bernama P2; audio_order.py lock suara LULUS; ASR tanpa prompt: semua kata kunci terbaca termasuk "finally", "CGPT/ChatGPT", "Claude", "Gemini"; durasi wajah = suara; durasi total 1:28–1:35.
JANGAN       ubah gain/loudness, commit/push, render visual.
LAPORAN      tambahkan "Ronde 2" ≤ 10 baris di REPORT-1a-potong.md dengan baris PUTUSAN tiap gerbang.
