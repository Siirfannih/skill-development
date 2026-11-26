# Asal-usul aturan · vibedesign

Bukan instruksi. Jangan dibuka saat mengerjakan tugas: aturan yang berlaku ada di file yang disebut, dan bunyinya sudah lengkap tanpa file ini. Dibuka saat mengubah skill, menilai cakupan aturan, atau memeriksa syarat naik kelas (SARINGAN §3 butir 7). Penghitung `nilai` mengikuti SARINGAN §5.

## Struktur skill
| Bagian | Asal-usul |
|---|---|
| Folder `claude/vibedesign/` + `projects/<proyek>/` | Permintaan Irfan 24 Nov 2026 membuat folder khusus desain di skill-development; letak di `claude/` agar dipasang `tools/doctor.sh`. Riset struktur: `/home/claude/vibedesign-research/STRUCTURE.md` (sesi 24 Nov), sumber: Anthropic Agent Skills best practices, W3C DTCG 2025.10, spek DESIGN.md, NN/g visual hierarchy, Butterick Practical Typography, WCAG 2.x, Playwright, AesEval. |
| Pipeline kode (engine) | Carousel meta-experiment 24 Nov: HTML/CSS/SVG + Playwright, setelah render Blender ditolak (terlalu glossy, bentuk bulat). |

## `LANTAI.md`
| Aturan | Asal-usul | nilai |
|---|---|---|
| TKS-01 | Ambang WCAG 2.x 1.4.3; setara Lantai A7 motion-graphic. Masuk langsung sebagai H karena biner dan netral gaya. | 2 |
| KRK-02 | Kebijakan: maskot/logo pihak lain tidak dibuat ulang (carousel meta-experiment, 24 Nov, permintaan berulang memakai maskot tiga merek AI). Kebijakan, bukan selera. | 2 |

## `guide/`
| Aturan | Asal-usul | nilai |
|---|---|---|
| HRK-01 | Irfan 24 Nov, slide 2: "BISA NIH → Tapi.... → bubble" (bubble muncul sebelum "Tapi...."). Juga slide 3: headline kalah ukuran dari "BISAAAA." | 2 |
| HRK-02 | Irfan 24 Nov, slide 4: "ide kuat tapi terlalu noise, tidak ada yang difokusin". | 2 |
| HRK-03 | Irfan 24 Nov: "prinsip desain dan bikin UI website itu ga sama". | 2 |
| TIP-01 | Irfan 24 Nov: serif + sans bold "jomplang" (slide 1 "Carousel", slide 3 "fenomena: fungsinya apa?"). Slide 5 serif italic dipertahankan karena perannya kata kunci. Riset: Butterick (maks 2 keluarga, tiap huruf punya peran). | 2 |
| TIP-02 | Irfan 24 Nov, slide 1: "Carousel tetap bold tapi dibungkus shape biru dan agak dimiringin". | 2 |
| KMP-01 | Irfan 24 Nov, slide 1: thumbnail Frames dipindah ke sisi kanvas sebagai pengisi whitespace; teks biru blur dinilai sudah tepat. | 2 |
| PSN-01 | Irfan 24 Nov, slide 4: "peres pesan sampai ke akarnya... AI ga bisa artinya AI bingung / hasilnya AI slop". | 2 |
| PSN-02 | Evaluasi mandiri 24 Nov: anotasi "human only" dan baris "hint: arah & selera tidak bisa di-generate" ditambahkan subagen dan membocorkan punchline slide 5; dihapus. AGENTS.md: elemen ditambah padahal tidak diminta. | 2 |
| KRK-01 | Irfan 24 Nov: "karakter hanya ditempel pasif"; slide 4 "maskot biru mouse tidur jadinya aneh"; koreksi lanjutan 24 Nov: karakter tidak dipakai terus-menerus, hanya bila punya fungsi. | 2 |
| TIP-03 | Irfan 24 Nov: teks melengkung "Tapi...." dijadikan lurus; lengkung hanya bila mengikuti bentuk/objek. | 2 |
| KMP-02 | Irfan 24 Nov: celah besar antara teks dan bubble yang dibaca berikutnya; jarak kelompok berurutan harus rapat dan konsisten. | 2 |
| KMP-04 | Irfan 24 Nov: D-026 (whitespace lebar memaksa mata turun terlalu jauh), D-031 (whitespace mati antara headline dan dock), D-033 (ruang atas kosong, margin atas seragam). | 2 |
| WRN-01 | Palet terkunci carousel meta-experiment; anti-slop UI "Too Many Colors". | 2 |
| HND-01 | Evaluasi anti-slop 24 Nov: grid latar, jendela terminal, status dot dipertahankan sebagai motif dunia "workspace" dengan alasan tertulis. | 2 |

## `cookbook/`
| Bagian | Asal-usul | nilai |
|---|---|---|
| `BEDAH.md` (metode 3 lapis) + format 3 lapis di `KARTU-TEMPLATE.md` | Ajaran pemilik di sesi 24 Nov 2026: bedah referensi (learn & deconstruct → adaptasi jadi sistem → arsitektur mekanik kode) agar sesi berikutnya membuat desain baru yang lebih bagus, bukan cloning; contoh angka dari referensi flyer folder fisik. | 2 |
| Kartu 01–05 | Referensi yang dikirim pemilik 24 Nov 2026 (poster portofolio A/B/C, post bulan biru, post palet G'inzá, cover "escape the bad design", cover tipografi UI). | – |
| Kartu 06 | Referensi "Social Media Flyer Designs" (folder fisik + kipas kartu), dibedah pemilik 24 Nov 2026; angka sampel warna dari sesi yang sama. | – |
- `guide/komposisi/GUIDE.md` KMP-03: analisis pemilik atas dua versi hook carousel (kata raksasa menyatu vs melayang di atas grid), 24 Nov.
- 2026-11-27 [A] evals/cases vd-006…vd-011: enam kasus dari koreksi carousel meta-experiment dan profil merek yang belum ada (2026-11-27-vibedesign-evals)
- 2026-11-27 [A] guide/komposisi KMP-04, DESIGN-CORE §1.3 dan §2, guide/hindari uji tukar (2026-11-27-vibedesign-ruang-kosong)
- 2026-11-27 [A] templates/merek, DESIGN-CORE urutan menang, SKILL Mulai di sini: profil merek satu rumah dengan motion-graphic (2026-11-27-vibedesign-profil-merek)
