# TASK-K01-repo · Builder Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca dulu handoff/SPEK-VISUAL.md (mengikat).

TUJUAN       `RepoGitHub` B1: halaman repo GitHub `Siirfannih/skill-development` tema terang yang dibangun di kode, data asli, bisa dianimasikan per bagian; plus status "selesai" (centang hijau di commit terakhir).
KONTEKS      Ucapan B1: "Oke, finally akhirnya proyek ini selesai juga." (±4 dtk). Wajib: wajah penuh → sebelum detik ke-3 wajah mengecil ke lingkaran kanan bawah (komponen lain), latar menjadi UI repo ini. Komponen ini = latar penuh 1920×1080 di belakang lingkaran (sisakan area kanan bawah ±420×420 px kosong dari info penting).
             Data asli: ambil dari clone lokal `~/work/skill-development` (git log -5 --format='%h %s %cr', daftar folder root `ls`, branch main, jumlah commit `git rev-list --count HEAD`); nama repo/owner dari `git remote -v`. Tulis hasil sebagai konstanta di `K01/data.ts` (beku saat build). Jangan memuat isi file privat; hanya nama folder dan pesan commit.
             Tampilan meniru GitHub asli terang: header repo (ikon repo, "Siirfannih / skill-development", badge visibilitas sesuai data), tab Code/Issues/Pull requests…, bar branch "main", baris commit terakhir (avatar = lingkaran polos inisial, bukan foto), tabel file/folder dengan ikon folder SVG, README sekilas. Font Inter/sistem GitHub-like; warna GitHub (garis `#D0D7DE`, teks `#1F2328`, link `#0969DA` hanya di permukaan terang).
             Animasi (props: mulai, kSelesai): baris tabel masuk bertahap 2 f per baris (`land`), kamera drift pelan ke baris commit terakhir; di kSelesai lingkaran status commit berubah menjadi centang hijau `#1A7F37` (pop + cincin tipis) dan baris commit sedikit menyala.
FILE BOLEH   remotion/src/komponen/K01-RepoGitHub.tsx, remotion/src/komponen/K01/**, remotion/src/uji/K01-entry.tsx, handoff/stills-K01/**, handoff/REPORT-K01-repo.md
FILE JANGAN  semua lainnya.
LARANGAN     tanpa raster/screenshot; data hanya dari git lokal; semua gerak keyframe + ease.
LULUS BILA   tsc lulus; grep raster kosong; UjiK01 4 dtk (mulai 0, kSelesai 75); still f005, f040, f080, f110.
JANGAN       render video, commit/push, ubah file lain.
LAPORAN      handoff/REPORT-K01-repo.md ≤ 15 baris (sertakan data git yang dipakai).
