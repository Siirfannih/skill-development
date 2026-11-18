# Sistem desain video (satu per proyek)

Ditulis **Sutradara** sebelum pekerja adegan mulai, di `remotion/src/<…>/bersama/tema.ts` proyek. Pekerja adegan tidak menulis nilai gaya sendiri; mereka memakai nama token dari file ini dan komponen di `bersama/`. Tujuannya: semua adegan terasa satu keluarga, walau dikerjakan pekerja berbeda.

## Sumber nilai, urut menang

1. `BRAND.md` merek (warna peran, huruf, logo) dan `EDITING.md`.
2. `RESEP.md` proyek: pengikat warna & tekstur, teks, dan ritme dari kartu kiblat.
3. Still preview tahap 2 yang user setujui.
4. `references/palette.md` bila merek belum punya palet.

## Cara memilih warna: peran dulu, lalu keluarga, lalu kontras

Setiap warna di `tema.ts` masuk tepat satu kategori:

| Kategori | Isi | Aturan |
|---|---|---|
| `MEREK` | latar, teks, aksen (satu keluarga dominan), negatif bila ada | dari `BRAND.md`; satu keluarga aksen ≥ 70 % piksel berwarna (`palette.md` §2) |
| `NETRAL` | 5–7 tingkat dari hitam ke putih untuk latar, garis, teks redup | netral membawa frame, aksen hanya menandai (`palette.md` §3) |
| `TURUNAN` | tint, shade, glow, gradasi dari aksen | hue sama dengan aksen induknya; tidak menambah keluarga baru (`palette.md` §4) |
| `UI_ASLI` | warna UI produk pihak ketiga yang dibangun ulang (GitHub, ChatGPT, Claude, Instagram), dikelompokkan per aplikasi | nilai dari UI aslinya (Lantai D20); kecil, tidak dijadikan aksen video (`palette.md` §6) |
| `PENGECUALIAN` | warna yang sengaja keluar dari keluarga untuk satu adegan (mis. parodi "AI slop") | wajib menyebut adegan + alasan; tidak dipakai di adegan lain |

Teks berwarna di atas latar atau footage harus kontras ≥ 4,5 : 1 (Lantai A7); bila gagal, pakai versi terang/gelap dari keluarga yang sama atau putih. Hasil render dicek `scripts/palette_check.py`.

## Selain warna

- `HURUF`: keluarga dari `BRAND.md` + skala ukuran bernama untuk 1080p (mis. `hero`, `judul`, `narasi`, `label`), dari proporsi kartu kiblat. Satu peran teks = satu ukuran di seluruh video.
- `JARAK`, `RADIUS`, `BAYANGAN`: beberapa nilai bernama, bukan angka bebas per adegan.
- Kurva gerak: `scripts/remotion/curves.ts` disalin ke proyek, tidak dibuat ulang per adegan.

## Papan acuan

Setelah satu pekerja membangun komponen bersama (teks kinetik, kartu, jendela UI, bubble) dari token ini, Sutradara merender still tiap komponen di atas footage asli dalam satu lembar dan menyetujuinya. Lembar ini ikut di setiap TASK adegan sebagai contoh yang harus dicocokkan.
