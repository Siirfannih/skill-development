# Addendum sumber (pembanding, dipakai di F6 dan F7)

Ada satu bahan tambahan dari riset brand baru Soalnya Gini yang perlu dipakai sebagai **pembanding**, bukan sumber utama. Fase F1–F5 tidak perlu diulang.

**Rujukan utama penilaian slop tetap milik kita sendiri:** `claude/motion-graphic/references/slop-catalog.md` (49 tanda yang pernah Irfan tolak: 12 audio S-A, 13 teks S-T, 24 visual S-V, sebagian dicek skrip `gate/`) dan `cookbook/contoh-gagal/`. Bahan di bawah hanya untuk menguji apakah ada tanda yang belum tercatat.

## Bahan

- `~/KhususagentAG/soalnya-gini-studio/riset/anti-slop-skill/SKILL.md` (skill `anti-slop-design`, 199 baris): hard bans, proses wajib, aturan 1-1-1, storyboard & motion video (§4), visual Shorts (§7), self-critique (§8), rubrik QC (§9).
- `~/KhususagentAG/soalnya-gini-studio/riset/anti-slop-skill/RISET.md` dan `src/` (23 sumber yang diparafrase skill itu).
- `~/KhususagentAG/soalnya-gini-studio/riset/referensi-animasi/REFERENSI.md`: breakdown komposisi terukur (ritme dari ffmpeg scene score) + `contact-sheet.jpg`.

## Cara pakai

1. **F6 cek silang:** bandingkan `F4-inti.md` dan prinsip tiap tema dengan hard bans dan §4 `anti-slop-design`. Catat tiga hal: (a) prinsip kita yang sejalan (perkuat buktinya), (b) larangan mereka yang belum kita punya tapi didukung kartu/keyframe/contoh gagal kita (boleh ditambah dengan bukti kita sendiri), (c) yang bertentangan (tulis keduanya, jangan pilih diam-diam).
2. **Jangan salin rubrik skor absolut** (§9, lulus ≥ 8,0) sebagai gerbang utama: dari forensik kita, skor yang ditulis model sendiri tidak mencegah slop. Gerbang tetap perbandingan dengan keyframe/golden frame per tema.
3. **F7:** bila ada larangan yang lolos poin 1(b), masukkan ke inti dengan sumber "anti-slop-design §x + bukti kartu kita". Tulis ringkasan perbandingan (maks 15 baris) di akhir `F6-cek-silang.md`.
