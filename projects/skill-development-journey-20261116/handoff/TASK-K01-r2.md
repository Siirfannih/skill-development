AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov: "semua akses diizinkan"). Bila doctor GAGAL HANYA karena baris "skill Codex … salinan, bukan symlink", jalankan ./tools/doctor.sh --fix sekali lalu langsung kerjakan TASK; jangan bertanya.

# TASK-K01-r2 · Builder Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca handoff/SPEK-VISUAL.md + REPORT-K01-repo.md (kerjamu ronde 1). G2: tampilan GitHub LULUS (sangat mirip, data asli). Revisi kamera saja.
TUJUAN       Momen "selesai" di B1 terasa: kamera membawa mata ke baris commit terakhir dan centang hijau.
TEMUAN       T1 f080–f110: drift +8,5 % terlalu kecil; centang ±16 px di layar, tidak terasa sebagai kejadian hook.
             Perbaikan: mulai→kSelesai−20 push pelan 1,00→1,10 (`drift`) berpusat di baris commit; kSelesai−20→kSelesai push `heavy` 1,10→1,85 berpusat di ikon status commit (titik zoom = posisi ikon, bukan tengah frame), tiba tepat di kSelesai; di kSelesai centang pop + cincin hijau mengembang 1→2,2 lalu pudar (10 f), baris commit menyala hijau muda #DAFBE1; setelahnya drift 1,85→1,92. Motion blur saat push heavy. Semua keyframe ease (curves.ts).
             T2: tetap sisakan kanan bawah ±420×420 px tanpa informasi penting **di setiap skala** (lingkaran wajah nanti di sana) — bila zoom membuat ikon jatuh di area itu, geser titik pusat.
FILE BOLEH   remotion/src/komponen/K01-RepoGitHub.tsx, remotion/src/komponen/K01/**, remotion/src/uji/K01-entry.tsx, handoff/stills-K01/**, handoff/REPORT-K01-repo.md
FILE JANGAN  semua lainnya.
LULUS BILA   tsc lulus; UjiK01 dengan mulai 0, kSelesai 75; still f040, f065, f075, f085, f110.
JANGAN       render video, commit/push.
LAPORAN      tambahkan bagian "Ronde 2" ≤ 6 baris di REPORT-K01-repo.md.
