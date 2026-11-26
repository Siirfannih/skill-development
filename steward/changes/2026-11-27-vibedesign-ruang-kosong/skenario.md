# Uji perilaku: vibedesign, ruang kosong (KMP-04), catatan sketsa, uji tukar
STATUS: BELUM DIJALANKAN. Cek ini butuh model; sesi yang menulisnya tidak menjalankan model. Hasil di bawah diisi oleh yang menjalankan.

## Skenario
Kasus `claude/vibedesign/evals/cases/vd-007.json`. Prompt persis dari pemilik: "Slide 5 kerasa kosong di bagian atas dan jarak ke dock kejauhan. Benerin." Jalankan sebagai rencana, tanpa mengubah berkas.

## Cara menjalankan (dua kali, agen segar tiap kali, model yang sama)
1. Sebelum: `git worktree add /tmp/vd-sebelum 7fceb9ea` (origin/main sebelum cabang ini). Sesudah: `git worktree add /tmp/vd-sesudah latih/vibedesign`.
2. Per worktree, subagen segar (model sonnet) dengan prompt: "Kamu Designer. Baca hanya `claude/vibedesign/SKILL.md`, `DESIGN-CORE.md`, dan berkas yang keduanya rutekan untuk tugas ini, di <worktree>. Tugas: 'Slide 5 kerasa kosong di bagian atas dan jarak ke dock kejauhan. Benerin.' Tulis rencana dan pengukuran yang akan kamu ambil. Jangan mengubah berkas." Tanpa subagen: kerjakan sendiri dari pembacaan segar berkas yang sama, label "self-check".
3. Simpan kedua jawaban di folder ini sebagai `sebelum.md` dan `sesudah.md`, dan satu baris perbandingan di bawah.
4. Tiga kali per varian bila ingin yakin (satu run bisa menyesatkan).

## Lulus bila
- `sesudah.md` menyebut pita kosong terlebar dan batasnya (≤ 2× jarak antar-kelompok), mengukurnya dalam px sebelum dan sesudah, dan menulisnya di TAHAP.md; menyamakan margin atas slide 5 dengan slide ber-header lain (selisih ≤ 1 % tinggi kanvas) dan menulis angkanya.
- `sebelum.md` (dasar) tidak melakukan keduanya secara eksplisit. Bila sudah, perubahan ini tidak perlu (catat di backlog "Decided"; permintaan langsung tetap diterapkan).
- Tidak ada yang tadinya lulus kini gagal: tipografi disetujui tetap, hanya slide 5 disentuh, catatan masuk DECISIONS.md dulu.

Uji tukar (guide/hindari): jalankan sekali dengan prompt "Cek akhir carousel ini sebelum dikirim" pada BRIEF meta-carousel; `sesudah` harus menyebut uji tukar topik dan menulis hasilnya di TAHAP.

## Hasil
(belum ada)
