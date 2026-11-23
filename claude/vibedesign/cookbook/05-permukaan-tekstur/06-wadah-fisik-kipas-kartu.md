---
id: "06"
pola: Wadah fisik frosted berisi kipas kartu di latar dingin
kategori: permukaan-tekstur
trigger: portofolio/kumpulan hasil kerja; "isi paket"; pembuka katalog; bukti volume karya
sumber: flyer media sosial 4:5 (folder fisik + kipas kartu portofolio, latar biru elektrik) · tautan privat (Drive) · dicek 24 Nov 2026
---
# 06 · Wadah fisik frosted + kipas kartu

**Inti mekanik:** objek wadah yang terasa fisik (folder) di sepertiga bawah memegang kipas kartu yang menyembul keluar dari baliknya; bibir wadah frosted memperlihatkan samar kartu di belakangnya; latar biru dingin bersaturasi tinggi membuat wadah hangat-netral menjadi fokus; headline grotesk rapat di atas dengan pil label miring menimpa ujung hurufnya.
**Urutan baca terukur:** 1 headline (100 %) → 2 pil label miring (±18 %, menimpa ujung huruf) → 3 kipas kartu + wadah (luas terbesar, kontras suhu) → 4 metadata & tombol di wadah (±12 %) → 5 footer identitas (±10 %).
**Narrative trigger:** "ini hasil kerjaku", kumpulan, paket isi → T1–T4.
**Jangan dipakai untuk:** pesan satu kalimat tanpa benda yang bisa "dimasukkan" ke wadah.

## Lapis 1 · Kenapa bagus
| Mekanik | Yang terlihat | Kenapa bekerja | Angka (terverifikasi alat) |
|---|---|---|---|
| M1 Kedalaman taktil | kartu menyembul dari balik bibir folder, bibir frosted | sumbu Z memberi rasa benda nyata; frosted memancing mata melihat "isi" | bibir #E1E1E1 semi-transparan; blur latar ±16 px |
| M2 Kontras suhu | latar biru elektrik vs folder abu hangat | warna hangat/netral di latar dingin menonjol tanpa perlu ukuran besar | latar #2071F4 (tepi) s/d #4E8EF8 (atas tengah); folder #CECBC4 |
| M3 Micro-tension tipografi | headline grotesk rapat, pil label diputar menimpa huruf | grid simetris dipecah satu elemen miring → mata berhenti di sana | tracking ±−0,03 em; line-height ±0,95; pil ±12°, #BADBFE |
| M4 Framing halus | kurva tipis opasitas rendah di latar | rel visual mengarahkan mata atas → tengah → bawah | opasitas ±0,15–0,25, garis 1–2 px |

Tebakan vs hasil ukur: latar ditebak gradien linear #1373FB → #2B86FF; hasil sampel #2071F4 (tepi) s/d #4E8EF8 (atas tengah, terang radial) → latarnya **radial**, bukan linear. Teknik diganti ke `radial-gradient(ellipse at 50% 0%, …)`.

## Lapis 2 · Token
- Kanvas & proporsi: 4:5, 1080 × 1350; wadah ±80 % lebar, tinggi ±40 % kanvas di sepertiga bawah; kipas kartu menyembul ±25 % di atas bibir.
- Radius bertingkat: wadah luar 40 px → bibir/tab 28 px → kartu 16 px.
- Slot konten: headline (≤ 4 kata/baris, 2 baris) · pil label (≤ 2 kata) · 3–5 kartu (gambar + judul ≤ 3 kata) · metadata (≤ 30 karakter) · tombol (≤ 2 kata) · footer (handle + situs).

## Lapis 3 · Pohon lapisan + teknik tersulit
1. Ambient: latar radial + kurva SVG pengarah mata.
2. Tipografi hero + pil melayang (z di atas huruf).
3. Backplate folder + kipas kartu (`transform: rotate(−8°…+8°) translateY(…)`, origin di bawah).
4. Kantong folder depan: bibir frosted `rgba(255,255,255,.55)` + `backdrop-filter: blur(16px)` + pagination; badan gradien hangat; metadata; tombol aksi.
5. Footer identitas + bar ikon SVG.

Teknik tersulit → solusi: tab dan sudut cekung folder tidak bisa dibuat dengan `border-radius`; pakai SVG path Bezier sebagai bentuk folder, atau `clip-path: path(...)` pada div, lalu bayangan lewat `filter: drop-shadow` (bukan `box-shadow`, yang mengikuti kotak).

## Teknik
- T1 Folder = SVG path (badan + tab cekung) dengan gradien hangat; kartu di lapisan antara backplate dan kantong depan.
- T2 Bibir frosted memakai `backdrop-filter`, sehingga kartu di baliknya terlihat samar.
- T3 Pil label diputar ±12°, z-index di atas headline, menimpa ujung huruf terakhir.
- T4 Latar radial dingin + kurva tipis.

**Remix wajib:** wadah = objek dunia kita (map file editor, jendela OS, amplop) dan isinya = slide/hasil kerja kita sendiri; palet diganti ke DESIGN.md proyek dengan tetap menjaga kontras suhu (latar dingin vs fokus hangat). Yang dipertahankan: sumbu Z, frosted, pil miring, radius bertingkat. Yang diganti: objek, warna persis, teks, ikon.
