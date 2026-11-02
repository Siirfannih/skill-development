# REVIEW R2-C (S03c, S04d, S02e, S06d)

Bukti still 480 px: /home/claude/pks/v10/r2c_before_*.png dan r2c_after_*.png (37.0, 38.75, 40.0, 58.0, 73.6, 116.9; tambahan after 52.0 dan 54.0).

| # | Perubahan | Status |
|---|---|---|
| 1 Altman S04d | Satu baris Single Person Billion Dollar Company, ukuran seragam otomatis ≈76 px (lebar = 1344 x 0,985, x 288-1632), Billion #FFD25A, dipusatkan. y = 262 (bukan 470): di y 470 teks menimpa kepala mic (y ≈ 320-540); disetujui planner selama glyph y >= 216 (box atas 222, lolos SAFE). | selesai; CONTR hanya Billion kuning 2,1:1 di atas footage (diterima) |
| 2 Jensen S03c | Dua baris mulai x 312 (300 memicu SAFE saat masuk), ukuran 62 tetap. Baseline 780 dan 700 jatuh di kursi putih (Job 1,3:1) tanpa ruang ungu gelap di kiri-bawah (kursi menutup). Dipilih baseline 268: pita ungu gelap di atas cincin logo (cincin mulai y ≈ 290), kontras LOLOS semua kata. Perbedaan dari brief: tetap di kiri-atas, bukan kiri-bawah. | selesai, checker 49-62 s tanpa SAFE/CLASH/CONTR bermakna |
| 2b S03c | PERLAHAN dan TEMPAT/KITA ukuran 130; TEMPAT/KITA y 808 (SAFE), PERLAHAN right-align 1632 y 300. Ruang kosong kanan figur hanya ±450 px sedangkan teks 551 px: ujung kiri teks menyentuh tepi lingkaran kepala putus-putus beberapa frame. | diterima dengan catatan |
| 3 S02e | Anchor DITEPATI dihapus (tanpa sfx sendiri). Latar hitam diganti SkyBackdrop dengan parallax kamera (clamp), titik grid dan vinyet hitam dihapus; kartu diberi bayangan biru, kursor panah #111 garis putih + pil AI hitam. Kamera p3 cy = kursor - 170; wide2 cy 1385-1405, Z 0,95: kartu yang dicentang selalu utuh; di 37,0 / 38,75 / 40,0 s hanya kartu paling atas yang boleh terpotong tipis (38,75). | selesai |
| 4 S06d | AnchorWord SENDIRI dihapus. | selesai |
| 5 SFX | whoosh "03c:cut:jensen" di 55,885 s dan "04d:cut:altman" di 71,025 s (tepat frame cut, terverifikasi dari log SFXEV). | selesai |

Checker: 33-41 LOLOS (tidak ada teks), 115-118 LOLOS, 49-62 hanya CONTR 1 frame saat masuk TEMPAT/KITA (blur masuk), 71-76 hanya Billion 2,1:1 (diterima). tsc bersih.

Usulan (tidak diterapkan): Perlahan di 130 px tidak punya ruang kosong penuh; alternatif tetap 100 px atau dua baris.
