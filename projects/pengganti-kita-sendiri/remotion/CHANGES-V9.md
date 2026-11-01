# CHANGES-V9 — adegan Remotion PKS v9 (2 Nov 2026)

Dasar: `../AUDIT-V8-2NOV.md`, `../ANCHORS-V9.md` (kolom baru **f terukur**), `ANCHORWORD.md`, `hybrid-motion-standard.md`.
Status: `npx tsc --noEmit` bersih. **Belum dirender** (public/ media tidak ada di sandbox): semua koordinat teks/matte perlu QC visual saat render pertama.
Aturan dipegang: diff bedah, satu baris per teks, tanpa tanda baca, tidak kiri-atas, tidak di atas visual, tanpa biru-di-gelap. Piktogram spotlight, UI agent 0:40–0:50, parallelogram KREATIF/MEMBANGUN, penutup kursi teater tidak disentuh (hanya animasi masuk teks diganti).

## Pustaka
| File | Perubahan |
|---|---|
| `src/lib/AnchorWord.tsx` | + `useFrameAt(frameAbsolut)`, prop `shadow`, `italic`, `sfx.pan`; jarak whip/blur dinormalisasi ke ukuran huruf (`size/160`, adegan berunit panel) |
| `src/lib/anim.tsx` | `SfxKind` + 8 peran (`sub_impact, low_whoosh, scifi_whoosh, glass_ping, ui_tap, telemetry_blip, graph_riser, snap_click`); `sfxMark(..., pan?)` (log `pan=-1..1`); helper `panOf(x)` |
| `src/lib/SubjectMatteStub.ts` | **stub** `useSubjectMatte(clipKey): string \| null` (selalu null). Saat `../lib/SubjectMatte` dari Mac tiba: ganti satu baris import di S00, S03c, S04d |

**Kunci klip matte yang dipakai** (= nama blok `timeline.json`): `news_gates`, `news_teen`, `news_billion` (S00), `jensen` (S03c), `altman` (S04d). `news_fast` tidak dimatte. Return = path public (WebM/PNG-seq beralfa 1920×1080 **sinkron dengan klip**, dipakai lewat `<Clip>` dengan transform identik klip aslinya). Null → `AnchorStage` tanpa `fg` → teks di depan klip.

## Per adegan (f = frame absolut 30 fps, dari kolom "f terukur")
| Scene | Perubahan |
|---|---|
| S00 Cold open (B1,B13) | Hapus transkrip KWord + `clean`. AI f2 → BIGGEST f27 (slot kiri, sub_impact); 16 f112 → LAUNCHED f133 (slot kanan-bawah, scifi_whoosh); BILLION f208 (sub_impact); FAST f284 (tengah-bawah, scifi_whoosh). `AnchorStage` + fg matte per klip. Fallback FAST: tidak di belakang foto awan. |
| S01 Perlombaan | Hapus «Tanpa», «kita sendiri», «anehnya». SADAR f319 (langit gelap tengah, putih). PENGGANTI f400 di dunia kamera antara kerucut cahaya dan wireframe (di belakang piktogram, sub_impact). LEBIH f559 / CEPAT f567 (kiri/kanan titik tengah, CEPAT sub_impact). |
| S02a Wikipedia (B2) | Kalimat 7 kata dihapus. AI f623 tracking judul ChatGPT, DOM sebelum kartu (terselip di belakang kartu). |
| S02b Janji (B3) | Judul "janji sederhana" + kotak outline dibuang. JANJI f713 menempel di ujung pena (`trackFn` = ujung kurva) sampai titik tujuan. Pena mulai di «janji» (d0), kamera push 1,0→1,12 ke ujung kurva. |
| S02c Tugas→Trash (B4) | Zoom 1,08–1,16× → 1,4–1,52× (+C01), clamp kamera diurutkan agar tetap mengikuti kursor/kartu pada zoom dekat; follow 60→85 %. |
| S02d Kreatif (B5 0:28) | KREATIF → `AnchorWord` f927 di parallelogram (scifi_whoosh). Beat mati 0:28: dasar cahaya dinaikkan (rim 0,5; berkas 0,3; bidang 0,4) supaya awal tidak gelap kosong. |
| S02e Ditepati (B6) | DITEPATI f1010 menempel di ujung garis (ruang layar tiap frame) + snap-punch 4 f (`snap_click`, pan dari x ujung), `graph_riser` di «jauh». Close-up 1,9× yang sudah ada dipertahankan; break ke wide tetap di «tidak». TAHAP f1194 + INI f1201 di kanan penanda vertikal (sub_impact di TAHAP). |
| S03a Agent (#13) | PERSIS f1381 menempel pada agent kedua (CS) saat terbang (`agentXY`), di belakang wajah/kursor, ink gelap; hidup sampai agent tiba (f≈1399). UI tidak diubah. |
| S03c Meniru diri (#14,#15,B7) | PERLAHAN f1508 (kiri salinan, setinggi kaki, di belakang badan), TEMPAT f1626 + KITA f1634 satu baris di belakang salinan (tanpa SFX: boom2 54,91 s sudah beat drop). Subtitle Indonesia 2 baris Jensen **dihapus**; JOB f1701, SOMEBODY f1781 (sub_impact) → AI f1804, `AnchorStage` + fg matte `jensen`. Posisi teks sementara (dada, y 560) — verifikasi dengan posisi kepala asli. |
| S04a Ga peduli | NGGAK f1861, PEDULI f1871 (sub_impact), DOM sebelum cahaya fajar → cahaya lewat di depan huruf. |
| S04b Rilis (B8) | Close 1,25× @x1300 → 1,1× @x800: kartu GPT-3 (x 80) tidak terpotong di kiri. |
| S04c Arah janji (B9,#18) | ARAHNYA f2037 (ujung garis solid, scifi_whoosh) + JANJINYA f2079 (ujung garis putus-putus) menggantikan label kecil ARAH/JANJI dan teks «masih sama». Wide 0,88× → 0,98× (grafik mengisi frame). |
| S04d Altman (B10) | Cincin kata dibuang (ellipse tetap). SINGLE f2162 / BILLION f2182 (sub_impact) / COMPANY f2209 satu baris setinggi kepala, `AnchorStage` + fg matte `altman`. |
| S05a Satu sukses | «cerita» dihapus. SATU f2322 → SUKSES f2344 satu slot di kiri kartu biru (tracking lewat kamera), lapis tengah: foto z=1,6 dirender sesudah teks. |
| S05b / `_b4_shared` (B11) | `cam05b`: zoom-out berhenti di 0,68× (dulu 0,42× = grid putih, elemen ≈1 % frame). |
| S05c Same tools (B12,#22) | 2.5D: lapis belakang foto blur 18 px gelap (parallax 50 %), lapis tengah foto sebagai kartu bulat + vignette charcoal, brightness 0,68/0,58/0,5 (dulu 0,85). SEMUA f2514 (sampai ikon mendarat) → SAMA f2591 (sub_impact). SEMUA di depan foto (fallback). |
| S05f Founders | SlotWord → AnchorWord, slot tengah sama: FOUNDER f2775 → CEO f2813 → SEMALAM f2868 (sub_impact). Shake v8 dipertahankan. |
| S05h Users | «semakin» dihapus; SUSAH f3076 di bawah lantai tengah. |
| S06a Sibuk | Parallelogram dipertahankan; MEMBANGUN f3169 → MERENCANAKAN f3217 (scifi_whoosh) via AnchorWord (swap kubus 3D diganti cut ke AnchorWord). |
| S06c Serahkan | AI f3383 di bidang cahaya, di belakang bola yang lewat (scifi_whoosh). |
| S06d Prompt | SENDIRI f3492 kiri composer, di belakang bola kepala over-the-shoulder. |
| S06e Tertinggal (B5 1:58) | TERTINGGAL f3591 di belakang tubuh «kita» (sub_impact); close 2× kosong → 1,5×→1,85× agar kelompok yang pergi sudah menyembul. |
| S06g Peran | Kalimat penuh di atas piktogram dibuang → PERAN f3841 | KAMU f3869 di belakang kepala piktogram tunggal. |

## SFX baru (log `SFXEV`, library nyata, bukan sintesis)
`sub_impact`: BIGGEST, BILLION(S00), PENGGANTI, CEPAT, TAHAP, SOMEBODY, PEDULI, BILLION(S04d), SAMA, SEMALAM, TERTINGGAL. `scifi_whoosh`: LAUNCHED, FAST, KREATIF, ARAHNYA, MERENCANAKAN, AI(06c). `snap_click` (pan dari x layar) + `graph_riser`: S02e. Kata lain sengaja tanpa SFX.
Catatan bentrok: S01 SADAR/S02a AI/S02b JANJI tanpa SFX sesuai tabel. Sub_impact lama di v18 yang sumbernya sintetis perlu disusun ulang (ANCHORS-V9 §3).

## Risiko / perlu QC visual
1. Koordinat teks di belakang kepala (S00, S03c Jensen, S04d) diperkirakan; cek di render, geser `x/y` bila menimpa wajah.
2. Grain AnchorWord pada satuan unit (S06a/S06d) dimatikan (`grain 0`) karena feTurbulence ikut skala.
3. S05c SEMUA belum bisa "di belakang foto" karena foto sekarang kartu utuh.
4. S03c TEMPAT/KITA tanpa sub_impact sendiri (ada boom2 di 54,91 s).
5. Tidak ada media: belum ada render atau cek frame.
