# DECISIONS · video perkenalan v7

Keputusan v6 ada di `arsip_v6/DECISIONS.md` (tidak berlaku lagi untuk visual).

## Catatan Irfan (aktif)
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

## Keputusan kerja (Claude)
| # | Keputusan | Alasan |
|---|---|---|
| K1 | Kiblat kartu 87 (Zache); huruf dari profil merek siirfannih. | File kiriman Irfan = `sumber/ref_zache.mp4` (sha1 sama) yang sudah dibedah jadi kartu 87 dan `KT-ZACHE.md`. |
| K2 | Remotion cukup untuk teks berlapis: footage → teks belakang → matte RVM → teks depan. | Susunan ini sama dengan spec KT-ZACHE §3.1; tidak perlu tool lain. |
| K3 | Batas zoom per frame dari kotak kepala YuNet (`kerja/v7/kepala.json`), margin 3 %. Close-up f595–772 tidak di-zoom. | D-001: wajah tidak ter-crop; di close-up kepala sudah memenuhi frame. |
| K4 | Kata kunci kuning lemon (Zache), bukan palet merek (merah/biru). | Irfan meminta "kayak video ini"; merek tidak punya warna penekanan yang terbaca di footage gelap (merah gagal kontras, biru dilarang di gelap). Bisa diganti bila Irfan menolak. |
| K5 | #23 dibangun sebagai kartu teks gelap (D-008): hitam hangat + sisa light-leak amber, KT di tengah optis, ditutup ULANGI (loop ke pembuka). | Take 0638 hanya suara. |
| K6 | Preview 19 Nov dianggap disetujui: Irfan menjawab soal #23 tanpa koreksi pada still/klip. Kuning Zache dipertahankan (K4). | Lantai F26: masukan hanya di preview. |
| K7 | Usul DA 8 dan 9 diterima: zoom narasi bergantian masuk/keluar, kamera menggeser wajah ke tengah saat zoom; usul lain ditolak dengan alasan di `qc/JURI.md`. | `qc/da/USUL.md` |

## Usul ke Irfan
| ID | Tanggal | Usul | Status |
|---|---|---|---|
| U-001 | 19 Nov | Gerak kamera narasi lebih terlihat (DA): dorong 1,08 / tarik 1,00 bergantian + wajah digeser ke tengah saat zoom. Sudah diterapkan di render 1. | Diterima Irfan 20 Nov ("Keep new camera") |
