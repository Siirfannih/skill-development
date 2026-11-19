# TASK-R7B2-claudekaca · adegan app Claude baru: UI claude.ai kaca di atas padang (D-479…D-483)
Baca `handoff/R7B2-BERSAMA.md`. Adegan BARU menggantikan lapisan `D_APP` + `D_APP_WAJAH` (±23,59–36,3 dtk) dan narasi T039–T049 di rentang itu (adegan ini TANPA teks narasi/subtitle, keputusan Irfan).
## Sumber kebenaran
- Papan gerak yang disetujui: `qc/r7/brief2/papan_gerak_UI_claude.jpg` (8 keadaan, tiap keadaan terikat ke kata di `edit/words.json`; teks persis di panel). Kode mockup PIL yang menggambar tata letak, isi, dan logika grid: `qc/r7/penilai/spine/ui_kaca_alur.py` — tiru tata letak & isinya, bangun ulang di Remotion.
- Latar: `remotion/public/img/latar-padang.png` (blur ringan sebagai latar berkedalaman). Ref gaya kaca: `sumber/ref-r6/ref-chat-kaca.png`.
- UI = claude.ai asli: logo Claude asli (`remotion/src/video/bersama/ui-asli/claude/LogoClaude.tsx`), huruf SF Pro, kolom input claude.ai (lampiran +, model "Opus 5.5 · High", tombol kirim oranye), menu slash berjudul Template, kartu lampiran MP4 (`footage-irfan.mp4`, progres unggah), tombol "+ Chat baru".
## Alur (dari papan)
1 23,70 beranda kosong (salam "Selamat sore, Irfan") · 2 25,63 unggah MP4 (kartu + progres) · 3 27,96 ketik "Gunakan /" → menu Template · 4 28,93 pilih /apple-style → "Gunakan /apple-style untuk edit videoku." → kirim → gelembung (MP4 + perintah) + balasan singkat Claude · 5 30,17 kursor klik "+ Chat baru" → GRID: sel kotak menghapus area chat kanan→kiri lalu muncul lagi kiri→kanan sekali sebagai beranda kosong (±0,2 dtk tiap arah) · 6 30,55 MP4 dilampirkan, ketik "Gunakan /cinematic-storytelling untuk edit videoku." · 7 31,83 kirim → gelembung kedua + balasan · 8 32,19 "ngebalik": chat baru lagi (grid sama), MP4 + "Tonton videoku, lalu kamu yang tentukan gayanya." → kirim; 33,9 Claude: "Oke. Aku tonton dulu, lalu aku pilih gaya yang cocok." (boleh dengan indikator berpikir) → adegan berakhir ±34,4 (transisi keluar dibuat Sutradara).
## Grid (D-482/D-483, WAJIB)
Sel HANYA pada bentuk objek UI (gelembung, kolom, kartu, salam) termasuk bayangannya; latar padang dan ruang kosong tidak pernah kena; warna sel dari piksel objek yang terhapus, semi-transparan, sel kecil, pita tipis di tepi yang bergerak; ada pemicu yang terlihat (klik "Chat baru").
## Gerak dalam adegan
Ketik per huruf mengikuti ucapan; gelembung naik saat dikirim (ease `heavy`/`land` dari `remotion/src/lib/curves.ts`); kursor bergerak dengan kurva, bukan garis lurus. Kamera global: TIDAK (Sutradara).
## Uji
Setiap teks UI berada di dalam wadahnya (ukur wadah dari isi; tulis cek otomatis seperti `ui_kaca_alur.py` CEK). Strip per frame tiap momen grid dan tiap kirim.
## FILE BOLEH
BARU `remotion/src/video/claudekaca/**`, `remotion/src/video/Root.tsx` (tambah Composition), `lego/r7_claudekaca.py`, `lego/r7_override_claudekaca.json` (ganti/buang D_APP, D_APP_WAJAH, T039–T049, dan cache lain di 23,5–36,4 yang milik adegan app), `lego/cache/r7b2_claudekaca_*`, `qc/r7/claudekaca/**`. JANGAN: override pekerja lain (bila ID milik mereka ada di rentangmu, tulis di laporan), audio, wajah.
## LAPORAN
`handoff/REPORT-R7B2-claudekaca.md`.
