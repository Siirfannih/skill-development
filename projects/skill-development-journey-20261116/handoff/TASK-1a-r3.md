AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-1a-r3 · Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca REPORT-1a-potong.md (Ronde 2) + edit/r2-NEXT.md. PUTUSAN SUTRADARA:
 D1 Durasi 1:24,217 DITERIMA (GUIDELINE §0: ±1:25, 1:20–1:32; rentang 1:28–1:35 di TASK-1a-r2 adalah salah tulis Sutradara). Seleksi isi dikunci; tidak menambah kalimat riset B4.
 D2 Tiga jeda bernama dipangkas sampai lulus TANPA pengecualian: CGPT→Claude 0,23 → 0,14; Dan→bahkan 0,20 → 0,14; "sama." → "Sehingga" 0,45 → 0,40. Sambungan sunyi = microfade 2 ms.
 D3 Perbaiki ALAT (bukan melewati gerbang): claude/motion-graphic/scripts/gate/cut_check.py — validator --source-words/--map harus menerima segmen cut berlabel `"editorial"` di CUT-MAP (token sumber di dalam rentang editorial tidak diwajibkan muncul; tetap diwajibkan TIDAK muncul sebagian/teriris). Tambah tes di tempat tes cut_check berada (cari `tests`/`test_cut_check*`; bila tidak ada, buat `claude/motion-graphic/scripts/gate/test_cut_check_editorial.py` minimal 3 kasus: editorial utuh lulus, kata teriris gagal, token non-editorial hilang gagal). Header docstring tambah satu baris sumber "(editorial: skill-dev-journey 16 Nov)". Bila audio_order.py memanggil cut_check dengan map, pastikan lulus lewat jalur yang sama.
 D4 36 span ASR mentah < 85 %: setelah D3, hitung ulang retensi pada kata isi saja (bukan kata yang sengaja dipotong separuh oleh editorial, bukan partikel); kata isi < 85 % diperbaiki batasnya (geser guard) atau dilaporkan per kata.
FILE BOLEH   projects/skill-development-journey-20261116/{edit/**,CUT-MAP-v2.json,transkrip-hasil.md,CUT-SHEET.md,DECISIONS.md,handoff/REPORT-1a-potong.md}, claude/motion-graphic/scripts/gate/cut_check.py, claude/motion-graphic/scripts/gate/test_cut_check_editorial.py (atau file tes cut_check yang ada)
FILE JANGAN  semua lainnya; gain/loudness.
LULUS BILA   cut_check tanpa map `--max-sentence 0.45` LULUS; cut_check dengan --source-words/--map LULUS; audio_order.py lock suara LULUS; tes alat lulus; ASR kata kunci tetap LULUS; sinkron wajah = suara; transkrip-hasil.md + CUT-SHEET waktu diperbarui.
JANGAN       commit/push, render visual.
LAPORAN      "Ronde 3" ≤ 8 baris di REPORT-1a-potong.md dengan baris PUTUSAN tiap gerbang.
