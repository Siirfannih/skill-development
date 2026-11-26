---
id: "06"
pola: Wadah fisik frosted berisi kipas kartu di latar dingin
kategori: permukaan-tekstur
trigger: portofolio/kumpulan hasil kerja; "isi paket"; pembuka katalog; bukti volume karya
sumber: flyer media sosial 4:5 (folder fisik + kipas kartu portofolio, latar biru elektrik) · tautan privat (Drive) · dicek 24 Nov 2026
---
# 06 · Wadah fisik frosted + kipas kartu

> **Kebijakan 26 Nov 2026 (K2):** frosted/`backdrop-filter`, latar radial, dan gradien di kartu ini adalah kulit referensi dan **dilarang**. Terjemahan: bibir wadah = panel solid datar dengan garis tepi tipis; latar = polos dua nada atau linear 2 warna berdekatan (hanya bila diminta); badan folder = warna solid. Ambil mekaniknya saja: sumbu Z (kartu menyembul dari wadah), kontras suhu, pil miring, radius bertingkat.

**Inti mekanik:** objek wadah yang terasa fisik (folder) di sepertiga bawah memegang kipas kartu yang menyembul keluar dari baliknya; bibir wadah frosted memperlihatkan samar kartu di belakangnya; latar biru dingin bersaturasi tinggi membuat wadah hangat-netral menjadi fokus; headline grotesk rapat di atas dengan pil label miring menimpa ujung hurufnya.
**Urutan baca terukur:** 1 headline (100 %) → 2 pil label miring (±18 %, menimpa ujung huruf) → 3 kipas kartu + wadah (luas terbesar, kontras suhu) → 4 metadata & tombol di wadah (±12 %) → 5 footer identitas (±10 %).
**Narrative trigger:** "ini hasil kerjaku", kumpulan, paket isi → T1–T4.
**Jangan dipakai untuk:** pesan satu kalimat tanpa benda yang bisa "dimasukkan" ke wadah.

## Lapis 1 · Kenapa bagus
| Mekanik | Yang terlihat | Kenapa bekerja | Angka (terverifikasi alat) |
|---|---|---|---|
| M1 Kedalaman taktil | kartu menyembul dari balik bibir folder (bibir solid datar, bukan frosted: K2) | sumbu Z memberi rasa benda nyata lewat overlap | bibir #E1E1E1 solid + garis tepi tipis; tanpa blur |
| M2 Kontras suhu | latar biru elektrik vs folder abu hangat | warna hangat/netral di latar dingin menonjol tanpa perlu ukuran besar | latar #2071F4 (tepi) s/d #4E8EF8 (atas tengah); folder #CECBC4 |
| M3 Micro-tension tipografi | headline grotesk rapat, pil label diputar menimpa huruf | grid simetris dipecah satu elemen miring → mata berhenti di sana | tracking ±−0,03 em; line-height ±0,95; pil ±12°, #BADBFE |
| M4 Framing halus | kurva tipis opasitas rendah di latar | rel visual mengarahkan mata atas → tengah → bawah | opasitas ±0,15–0,25, garis 1–2 px |

Tebakan vs hasil ukur: latar ditebak gradien linear #1373FB → #2B86FF; hasil sampel #2071F4 (tepi) s/d #4E8EF8 (atas tengah) → di referensi latarnya radial. Radial dilarang (K2): bangun latar polos #2071F4 atau linear 2 warna berdekatan bila diminta.

## Lapis 2 · Token
- Kanvas & proporsi: 4:5, 1080 × 1350; wadah ±80 % lebar, tinggi ±40 % kanvas di sepertiga bawah; kipas kartu menyembul ±25 % di atas bibir.
- Radius bertingkat: wadah luar 40 px → bibir/tab 28 px → kartu 16 px.
- Slot konten: headline (≤ 4 kata/baris, 2 baris) · pil label (≤ 2 kata) · 3–5 kartu (gambar + judul ≤ 3 kata) · metadata (≤ 30 karakter) · tombol (≤ 2 kata) · footer (handle + situs).

## Lapis 3 · Pohon lapisan + teknik tersulit
1. Ambient: latar polos dua nada + kurva SVG pengarah mata.
2. Tipografi hero + pil melayang (z di atas huruf).
3. Backplate folder + kipas kartu (`transform: rotate(−8°…+8°) translateY(…)`, origin di bawah).
4. Kantong folder depan: bibir solid `#E1E1E1` + garis tepi tipis (tanpa `backdrop-filter`, K2) + pagination; badan warna hangat solid; metadata; tombol aksi.
5. Footer identitas + bar ikon SVG.

Teknik tersulit → solusi: tab dan sudut cekung folder tidak bisa dibuat dengan `border-radius`; pakai SVG path Bezier sebagai bentuk folder, atau `clip-path: path(...)` pada div, lalu bayangan lewat `filter: drop-shadow` (bukan `box-shadow`, yang mengikuti kotak).

## Teknik
- T1 Folder = SVG path (badan + tab cekung) berwarna hangat solid; kartu di lapisan antara backplate dan kantong depan.
- T2 Bibir solid datar bergaris tepi; kartu tampak di belakang lewat urutan lapis (overlap), bukan transparansi/blur.
- T3 Pil label diputar ±12°, z-index di atas headline, menimpa ujung huruf terakhir.
- T4 Latar polos dingin + kurva tipis.

**Remix wajib:** wadah = objek dunia kita (map file editor, jendela OS, amplop) dan isinya = slide/hasil kerja kita sendiri; palet diganti ke profil merek proyek dengan tetap menjaga kontras suhu (latar dingin vs fokus hangat). Yang dipertahankan: sumbu Z, pil miring, radius bertingkat. Yang diganti: objek, warna persis, teks, ikon.
