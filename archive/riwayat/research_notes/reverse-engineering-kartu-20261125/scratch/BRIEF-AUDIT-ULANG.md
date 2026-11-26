# Brief auditor ulang F6 (independen dari audit Gemini)

Kamu auditor bukti independen fase F6. Folder kerja: /Users/igedeirfankusumaputra/KhususagentAG/reverse-engineering-kartu/ . Repo bahan: /Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/ (kartu vault di cookbook/_vault/**, keyframe di guide/referensi/sheets/keyframes/, contoh gagal di cookbook/contoh-gagal/, slop-catalog di references/slop-catalog.md, F1-inventaris.csv di folder kerja untuk status `dilihat_bergerak`).

**JANGAN buka atau percaya folder scratch/ (audit lama Gemini) dan file *-belajar.md.** Verifikasi dari sumber primer.

## Untuk setiap prinsip / keputusan di file yang ditugaskan
1. Baca klaimnya (keputusan + angka + bukti yang dikutip).
2. Buka sumber primer: minimal 2 kartu pendukung berbeda per prinsip. Per kartu buka (a) keyframe yang dikutip dengan Read (lihat gambarnya), dan (b) bagian vault yang relevan (cari file kartu di _vault dengan nomor ID; untuk klaim audio, bagian `## Audio`; untuk klaim gerak, cek field `dilihat_bergerak` di frontmatter vault atau F1-inventaris.csv). Contoh gagal yang dikutip juga dibuka.
3. Tandai per bukti: **COCOK** (isi gambar/vault mendukung klaim), **TIDAK COCOK** (isi bertentangan atau tidak menunjukkan yang diklaim; sebut apa yang sebenarnya terlihat), **TIDAK DITEMUKAN** (file/bagian tidak ada).
4. Cek label epistemik: klaim gerak dari kartu `dilihat_bergerak: tidak/sebagian` harus bertanda "belum dilihat bergerak"; klaim bunyi yang hanya dari teks kartu bertanda "belum didengar". Catat yang lupa ditandai.
5. Putusan prinsip: **LULUS** (≥2 kartu independen COCOK), **TURUN JADI CATATAN** (hanya 1 kartu COCOK; atau 2 kartu dari video/kreator yang sama — cek kolom sumber di F1-inventaris.csv), **GAGAL** (0 kartu cocok), **LULUS DENGAN REVISI** (angka/redaksi perlu diperbaiki — tulis redaksi pengganti).

Aturan: setiap putusan menunjuk path yang benar-benar kamu buka. Jangan ubah file apa pun selain output. Jangan render atau ffmpeg. Jangan mengarang angka; bila angka di klaim tidak bisa dicek dari still/vault, tulis "angka tidak bisa diverifikasi".

## Output
Satu file Markdown (path di tugasmu), per file yang diaudit:
- Tabel: ID prinsip · klaim ringkas (≤ 20 kata) · bukti dibuka (path pendek) → status per bukti · label epistemik ok? · putusan · catatan/redaksi pengganti.
- Di akhir: rekap jumlah LULUS / LULUS DENGAN REVISI / TURUN / GAGAL per file, dan daftar butir TURUN/GAGAL beserta alasan satu kalimat.
Batas ±25.000 karakter. Balas ke pemanggil dengan rekap angka + daftar TURUN/GAGAL saja.
