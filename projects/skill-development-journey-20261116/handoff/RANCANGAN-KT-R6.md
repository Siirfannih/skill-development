# Rancangan KT putaran 6 (D-445, D-446) · Sutradara

Tujuan: narasi (72 blok `R1 r1` = kata putih di pita bawah) dan teks di adegan UI tidak lagi terasa caption tempelan, tapi hidup di ruang yang sama dengan wajah/UI. Bentuk + jenis animasi dari kartu 83; warna, huruf, dan bobot dari merek siirfan.

## Pengikat merek (tidak dari referensi)
- Warna: putih hangat `#FAF8EC` (teks utama), biru startup `#2E5BFF` (satu kata aksen per frase, hanya bila kontras ≥ 4,5:1, di footage biasanya sebagai isi pil/tag, bukan huruf biru di latar gelap), hitam `#080608`. Tidak ada merah, tidak ada glow lebar.
- Huruf: Poppins 700–800 untuk KT di wajah (yang sudah disetujui), SF Pro Display Medium/Bold untuk teks yang hidup di UI. Anton hanya slab yang sudah ada.
- Gaya: minimalis Apple, tag kaca (putih 14–18 % + blur latar 18 px + garis 1 px putih 30 %), bayangan lembut.

## Yang TIDAK disentuh
FINALLY (T002), busur workflow/AI model (T009, T011), DECISION (T019), VIRAL + parodi slop (T025, S01–S14, T034, T038), slab WORKFLOW-NYA/BALIK MODAL/LINTAS AGENT/100% (T051, T057, T077, T081), adegan D (tanpa teks, D-441).

## Peta bentuk per kelompok blok (bentuk dari kartu 83)
| Rentang | Blok | Sekarang | Bentuk baru | Alasan |
|---|---|---|---|---|
| 0,3–0,8 | T001 "Oke," | pita bawah | K4 kata tunggal di dada | pembuka singkat, wajah dominan |
| 1,35–4,3 (UI repo) | T003, T005 | pita bawah di atas UI | teks UI: duduk di header repo / baris commit terakhir, ikut kamera UI | "proyek ini" merujuk repo |
| 4,3–8,0 | T006–T008, T010, T012, T013 | pita bawah | K2 tangga di sisi kiri wajah (kata per baris turun mengikuti bahu), tag kaca untuk "baru aja ngebikin" | busur workflow/AI model sudah di atas kepala → tangga di sisi lain supaya seimbang |
| 10,5–14,5 | T017, T018, T020–T024 | pita bawah | K1 cincin pendek (≤ 3 kata) mengelilingi kepala menuju DECISION; "dalam ngebuat video gitu." K4 di dada | membangun ke kata hero |
| 14,7–23,6 (parodi) | T026–T037 | pita bawah di dalam bingkai neon | K2 tangga di sisi kanan, tag dibiarkan putih polos (parodi tetap jadi pusat) | parodi sengaja ramai, narasi jangan bersaing |
| 23,7–34,4 (UI app Claude) | T039–T049 | pita bawah kiri | teks UI: "template." menempel di kolom prompt tempat `/apple-style` diketik; "ngebalik." di bubble cerita; sisanya label kecil di tepi jendela, ikut push kamera; satu kata besar sebagian di belakang jendela (K3 versi UI) | teks duduk di elemen yang dirujuk |
| 38,3–41,7 | T052–T056 | pita bawah | K1 cincin di kepala, belakang cincin lewat di belakang kepala (matte) | kalimat panjang tenang |
| 42,9–53,6 (kartu 20×/5×) | T058–T073 | pita bawah | K2 tag: "ChatGPT Pro" & "Claude Pro" menempel di kartunya masing-masing; sisanya K4 di dada | kata merujuk kartu |
| 54,0–57,0 | T074–T076 | pita bawah | K1 cincin naik ke LINTAS AGENT | membangun ke slab |
| 72,3–76,4 (Blender) | T080, T082, T083 | pita bawah | teks di bidang monitor/meja 3D (perspektif ikut kamera) | dunia 3D |
| 76,5–83,8 (IG) | T084–T095 | dalam bidang video kanan | teks UI IG: pertanyaan di bidang video, "Comment di bawah." menempel kolom komentar, "skill gratis" sebagai tag di komentar | teks duduk di UI asli |

Aturan Lantai tetap: semua ucapan tampil (A1), 1–3 kata per tampil, maksimal 2 baris, tahan sampai kata selesai, keluar dengan potongan/mask, ≥ 3 gerak berbeda per 15 dtk, kontras ≥ 4,5:1.

## Urutan kerja
1. Codex membangun 3 komponen bersama dari token: `Cincin` (K1 + matte), `Tangga` (K2 tag kaca), `TeksDunia` (teks yang ikut kamera/elemen UI). Still komponen di atas footage asli.
2. Still per kelompok (10 still) di atas frame `qc/r6/visual_r6.mp4` → lembar sanding vs keyframe 83-k1/k2/k6 + frame UI 63 → Sutradara menilai → dikirim ke Irfan (gerbang arah).
3. Setelah Irfan setuju: bangun penuh, audit frame, SFX ikut, render.

## Transisi (D-448)
- Grid gelombang hanya satu kali: masuk adegan D (57,7 dtk).
- Dasar semua pergantian: zoom in / zoom out kamera, b-roll, atau cut; setiap keyframe ease in/out (`curves.ts`: heavy/land/leave), motion blur saat gerak cepat.
- Variasi 2–3 gaya dari kartu, dipilih per hubungan ruang adegan (motion-mechanics): (1) push-through zoom ke elemen UI lalu masuk adegan berikut (63/49 punch-in); (2) bentuk besar menyapu frame (07 Baikov); (3) pull-back keluar dari layar ke wajah. Peta per titik potong ditulis bersama still KT.
- Titik yang ditinjau: 1,5 (wajah→repo), 4,3 (repo→wajah), 23,6 (wajah→app), 34,4 (app→wajah), 57,7 (→D, grid), 72,1 (D→Blender, kini cut keras), 76,4 (Blender→IG).
