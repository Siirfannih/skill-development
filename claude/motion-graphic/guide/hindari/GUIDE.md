# Hindari (cek akhir)

Ini daftar pindai, bukan larangan teknik. Satu tanda dengan alasan tertulis boleh; beberapa tanda bersamaan = video terasa murah/AI.

| Tanda | Kenapa jelek | Cek | Arah perbaikan |
|---|---|---|---|
| Warna kebanyakan | mata tidak tahu fokus | hitung keluarga hue di still | satu aksen + netral, atau maksimalis satu sistem (`../visual/`) |
| Teks tidak beraturan / bertumpuk | dua hal berebut dibaca | still per frasa | dua lapis maks, caption mundur saat penekanan (`../teks/`) |
| Caption > 2 baris / terpotong / dihapus | terbaca seperti artikel, atau ucapan tanpa teks | `caption_lines.py` | pecah klausa; setiap ucapan bercaption |
| Gerak kaku / linear / fade polos | terasa template | putar 0,5× | easing ekspresif, blur, mask (`../gerak/`) |
| Cutout tidak rapi | terasa tempelan | still 100 % di tepi | matte bersih, feather, cahaya disamakan |
| Kurang smooth / patah | perhatian putus | cut tidak di ketukan | cut di kata/beat/puncak gerak |
| Musik melawan suasana | merusak mood | `pace_read.py` vs musik | kategori dari tempo video (`../audio/`) |
| Suara sumber yang bersih jadi mendem | kualitas turun | `voice_fidelity.py` | sumber bersih cukup gain linear (§14.6) |
| Objek, teks, atau gerak tanpa bunyi | layar terasa mati | `gate/sfx_density.py` | 1 bunyi per frame/pesan/objek/gerakan (aturan 43) |
| Grafik vivid melayang di footage blur | tempelan | still | menyatu atau dunia sendiri |

Daftar lengkap riwayat penolakan Irfan: `../../references/slop-catalog.md`.
