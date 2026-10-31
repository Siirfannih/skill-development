# Bedah referensi gaya · 2dmotion.mp4 ("Merantau")

Sumber: lampiran Irfan 31 Okt 2026, 1280×720, 24 fps, 47,1 dtk. Contact sheet 1 fps + 4 fps di rentang 1,5–5,5 / 9–13 / 18–26 dtk (scratchpad sesi, tidak disimpan di repo).

## Angka

- Cut (scene > 0,3): 4,5 · 5,5 · 9,5 · 11,7 · 20,2 · 23,7 · 45,1 dtk → 8 shot, rata-rata ±5,9 dtk per shot. Perpindahan lain berupa match/transisi kamera, bukan cut.
- Tidak ada satu pun tokoh manusia. Cerita dibawa oleh objek dan sudut pandang (POV).

## Urutan yang terlihat

| Waktu | Yang terlihat | Teknik |
|---|---|---|
| 0:00–0:02 | Jendela gelap, kota saat matahari terbit | push-in pelan, lens flare |
| 0:02–0:05 | Kalender 2025 → lembar dibalik cepat Nov … Agustus 2026 | page curl beruntun = time-lapse |
| 0:05–0:06 | Kalender meja "2026 Agustus" dalam perspektif, sorot cahaya | bidang datar dalam ruang 3D |
| 0:06–0:09 | Close-up tanggal, lingkar merah tangan di "20", kamera roll ±90° | roll kamera sebagai transisi |
| 0:10–0:13 | Close-up jam lalu pull-out, jarum berputar, light leak menyapu | match rotasi kalender → jam |
| 0:13–0:16 | Pintu kayu, sorot cahaya diagonal | truck pelan |
| 0:16–0:17 | Lembar kalender lepas melayang ke kamera | kartu 3D berkibar |
| 0:17–0:19 | Pegangan koper merah, low angle, matahari | flare |
| 0:19–0:24 | Pesawat kertas masuk, kamera mengikutinya di koridor gedung | **dolly maju di antara bidang gedung (2.5D)** |
| 0:24–0:28 | Siluet pesawat di langit, skyline, POV jendela pesawat dengan sayap | silhouette + DOF |
| 0:28–0:42 | Judul "Merantau" skrip, garis cahaya diagonal, blur | type reveal, light streak |
| 0:43–0:45 | Pintu lagi (abu-abu) | bookend |

## Aturan yang diturunkan

1. 2.5D = **ilustrasi datar yang ditaruh di ruang 3D + kamera perspektif**, tanpa model 3D dan tanpa pencahayaan. Ini yang membuat hasilnya tetap terasa "ilustrasi premium", bukan "3D mentah".
2. Shot panjang (±6 dtk) dengan kamera yang terus bergerak; perpindahan adegan lewat objek (rotasi kalender → jam, pesawat kertas → pesawat).
3. Cahaya sebagai bahan utama: sorot diagonal, flare, light leak, DOF. Grain hampir tidak ada.
4. Objek sehari-hari yang sama dengan storyboard kita: kalender + lingkar merah, jam, pintu, jendela kota, koridor gedung worm's-eye. Panel ACC 07 dan 20 sudah satu bahasa dengan referensi ini.

## Koreksi atas aturan render sebelumnya

Aturan 31 Okt 16:08 ("kamera hanya translate/scale/rotate 2D") terlalu ketat: shot koridor 0:19–0:24 dan kartu kalender 0:16 butuh perspektif sungguhan. Aturan baru: **bidang SVG datar boleh diberi posisi Z + kamera perspektif** (AE 3D layer, atau CSS `perspective`/`translateZ`/`rotateX` di Remotion). Yang tetap dilarang: mesh 3D, material berpencahayaan, three.js dengan lighting.

## Kecukupan alat (dicek di Mac ini, 31 Okt)

| Kebutuhan | After Effects 2026 (terpasang) | Remotion 4.0.539 (terpasang di repo) |
|---|---|---|
| Bidang datar + kamera perspektif | ✓ 3D layer + kamera, pipeline ExtendScript terbukti (Tuntunly) | ✓ secara teori via CSS 3D; **belum pernah diuji di repo** |
| Lembar kalender dibalik (page curl) | ✓ CC Page Turn (CycoreFX HD terpasang) | ✗ tidak ada bawaan; perlu flip kartu sederhana (rotateX + gradasi) |
| DOF / rack focus | ✓ DOF kamera | ✓ blur per layer |
| Flare, light leak, sorot cahaya | ✓ Lens Flare bawaan + gradasi (Optical Flares tidak terpasang, tidak wajib) | ✓ gradasi + blend mode |
| Motion blur | ✓ bawaan | ✓ `@remotion/motion-blur` (cek bug di dalam Sequence) |
| Ilustrasi vektor | Wonder SVG (terbukti hari ini); Illustrator **tidak terpasang**; impor SVG ke shape layer AE **belum dicek** | ✓ SVG langsung jadi komponen React |
| Animasi karakter lentur | Puppet bawaan saja; Duik / RubberHose **tidak terpasang** | path morph butuh `flubber` (**belum terpasang**, belum diuji) |
| Mesin | RAM 16 GB (34 % bebas), disk bebas 12 GiB: cukup untuk satu adegan uji; render penuh 2:20 dengan DOF + motion blur mendekati batas 10 GiB | sama |

Kesimpulan: untuk gaya objek + POV + kamera 2.5D seperti referensi, alat kita cukup. Celahnya ada di animasi karakter seluruh badan (belum ada rig) dan di 2.5D Remotion yang belum terbukti. Langkah aman: uji satu adegan 6 dtk dulu.
