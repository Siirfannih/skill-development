# BRIEF Devil's Advocate · video perkenalan v7

## 1. Brief Irfan (verbatim)
**Prompt Irfan (disalin apa adanya):**
> Kesalahanmu dari video ini itu adalah videonya sangat berantakan sekali, dan aku tuh udah minta kamu di awal untuk jangan nge-crop wajahku. Kan kita tuh gak jadi pakai Google Omni, jadi versi ganti background itu gak jadi, dan full aku pakai video talking headku. Jadi, gak ada b-roll, gak ada remove background. Kita cuman main di kinetic typography, camera movement, zoom in, zoom out, kinetic typography-nya, dan ya, kita main seperti yang kita lakukan di style-nya si Irfan.
>
> Aku mau kamu edit videoku kayak video ini [zache.mp4]. Jadi, yang dimainkan adalah zoom in, zoom out, pakai easy in, easy out, dan gunakan keyframe. Mainkan di transisi dan flash effect-nya juga supaya teksnya ada lapisannya seperti ini. Kalau memang di ReMotion nggak support, nggak bisa ngebuat teks kayak gini yang kelihatannya berlapis seperti ini, kamu bisa buat di tools lain yang bisa kamu jangkau.
>
> Secara overall, dari video terakhirmu, semuanya perlu direvisi karena kamu terlalu banyak remove background-ku, kemudian banyak objek yang berkabaran. Misalkan seperti yang di akun ini, kamu buatnya kayak ada frame footage di kanannya. Itu nggak boleh. Kalau kamu mau masukin frame footage, pastikan dia menyebar, jadi mengelilingi aku, supaya fokusnya nggak di situ. Posisi talking head kayak gini harus selalu fokus di wajahku, dan berarti teksnya akan mengelilingiku, ngebentuk. Dari belakang ke depan, depan ke belakang, kamera nge-zoom, zoom in, cut out-nya harus dimainin. Kemudian, ulangi itu pakai style motion, Apple Style Motion. Jadi, jangan dibikin polos kayak gini sekarang ini. Harus bikin kayak style motion.


## Catatan Irfan aktif (DECISIONS.md)
| ID | Tanggal | Catatan | Status |
|---|---|---|---|
| D-001 | 19 Nov | Talking head penuh. Tidak ada b-roll, tidak ada ganti latar (dunia Blue Void/studio v6 dibuang), wajah tidak boleh ter-crop. | Aktif |
| D-002 | 19 Nov | Edit seperti `zache.mp4`: zoom in/out ber-ease dengan keyframe, transisi + flash, teks berlapis. Bila Remotion tidak mampu, boleh tool lain. | Aktif |
| D-003 | 19 Nov | Cutout dipakai untuk teks mengelilingi wajah (belakang ↔ depan), bukan untuk mengganti latar. Fokus selalu di wajah. | Aktif |
| D-004 | 19 Nov | Tidak ada objek bergerombol di satu sisi (contoh: kolom frame UI di kanan kepala di v6 #20). Bila ada frame footage, menyebar mengelilingi. | Aktif |
| D-005 | 19 Nov | Gerak Apple-style, tidak polos. | Aktif |
| D-006 | 19 Nov | Selalu muat skill-development dan ikuti aturannya meski guideline proyek berbeda. | Aktif |
| D-007 | 19 Nov | Musik Aware → Relax (disetujui untuk v6) dan kredit di file terpisah (`KREDIT.md`), tidak di video. | Aktif |
| D-008 | 19 Nov | #23 (take 38, hanya suara): kartu teks gelap, bukan klip wajah bisu dan bukan rekam ulang. | Aktif |
| D-009 | 19 Nov | Suara v6 dipakai apa adanya walau gagal gerbang suara skill (39 celah tengah kalimat 0,15–0,35 dtk; lantai jeda −28,7 dBFS). Render final memakai renderer Remotion yang sama tanpa gerbang audio `render.sh`; gerbang lain tetap dijalankan dan dilaporkan. | Aktif |

## 2. Bahan video
- Frame tahan tiap detik: `/home/irfan/work/skill-development/projects/video-perkenalan-20261118/qc/frame_audit/c0*/tahan/*.jpg` (67 gambar, 540×960)
- Lembar 1 fps seluruh video: `/home/irfan/work/skill-development/projects/video-perkenalan-20261118/qc/frame_audit/SELURUH.jpg`
- Video kandidat (skala 0,5, dengan suara + SFX + musik): `/home/irfan/work/skill-development/projects/video-perkenalan-20261118/qc/v7/draft_mix.mp4`

## 3. Yang bagus: frame kunci kiblat (kartu 87 Zache)
- `/home/irfan/work/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/87-k*.jpg`

## 4. Yang jelek
- `/home/irfan/work/skill-development/claude/motion-graphic/pustaka/contoh-gagal/` (README + gambar)
