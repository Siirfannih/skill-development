# TASK r8 · Patahan dan cacat dari audit frame per frame (semua frame, per detik)

Editor (lanjutan r7). P = `projects/builder-trap-r2`, R = root repo. Jangan render final. Sumber temuan: `P/qc/frame_audit/c*/VERDICT.md` (9 pemeriksa, satu per 10 dtk; 6 GAGAL) + lembar `s*.jpg` di folder yang sama. Frame = frame nyata timeline v3.

## Latar
Irfan 15 Nov: "video ini banyak patahannya dan bagian yang hilang" · "pengecekannya tidak lagi menggunakan sampling … semua data sebelum proses rendering … frame per 1 detiknya". Penyebab utama: peta waktu v3 melompat 1:1 di bekas jeda suara. Sutradara sudah menulis peta **v3b** (`P/remotion/src/data/knots_v3.json`, dari `P/edit/make_knots_v3b.py`): lompatan hanya di balik potong keras (4), sisanya rampa halus (35, percepatan ≤ 2,1× kecuali 2 rampa di ujung video). Peta lama: `P/edit/v3/knots_v3_lompat.json`.

## Kerjakan
1. **Peta v3b**: pastikan semua adegan memakai `knots_v3.json` baru (timewarp sudah membacanya). Periksa B12 (r7 menaruh pantulan/pembukaan jendela sesudah lompatan lama di nyata f863 — kini rampa): gerak ikon/jendela tetap utuh dan tidak terlalu cepat; sesuaikan konstanta bila perlu.
2. **Jump cut wajah di titik potong suara** (video wajah dipotong di rentang yang sama dengan suara): di setiap titik potong yang jatuh DI DALAM sisipan wajah, ganti ukuran crop wajah tepat di frame potong (punch-in/out 8–12 %, atau ganti mode crop mata/mulut/sisi) supaya terbaca sebagai potongan editor, bukan kepala meloncat. Titik dari audit: f1709 (wajah beku 4 f f1705–1708 lalu meloncat; juga mulai isi klip di frame yang benar), f2406, f2460; dan titik peta di sisipan wajah f657, f1331, f1532, f1764, f2186. Hitung semua titik dari `P/edit/v3/map.json` (rentang dibuang → frame nyata), jangan hanya daftar ini.
3. **f2066**: satu frame wajah berbeda (kepala berputar, tangan hilang) lalu kembali di f2067, sebelum batas beat f2068 → cari sebabnya (Freeze/klip di ujung adegan) dan hilangkan.
4. **f1949→1950 (B22)**: close-up "Edit profile" diam lalu langsung blur puncak zoom-out → rampa 4–6 f sebelum puncak (mulai ±f1945), simetris dengan zoom-in f1911–1916.
5. **Frame tanpa teks/frame kosong**: f193–194 (krem kosong sebelum "mempublikasikan"; teks mulai di frame cut), f1280, f1356, f2447 (1 f tanpa teks di antara blok; blok lama bertahan sampai blok baru masuk).
6. **Keterbacaan**: "tapi" f142–153 dan "bisa" f187–192 (kecil/abu tipis) → ≥ 56 px kontras penuh atau gabung ke blok; B07 f481–534 "dan aku termakan kata-kata motivasi." → ±1,3× dan kata baru lebih terang.
7. **B06 keseimbangan** f250–299: foto + "Memasuki usia … aku merasa" di kiri ±35 %, kanan kosong; "20-an" kecil → posisi/ukuran supaya kiri-kanan seimbang (Lantai C17), "20-an" terbaca.
8. **B10 Threads** f535–570: post mindset.notes baru terbaca ±1 dtk setelah diucapkan → zoom mulai ±f540 (kalimat 17,82–18,65 dtk).
9. **Akhir video** f2490–2500: ekor visual 0,4–0,5 dtk (fade ke hitam/putih atau tahan tanpa mulut bergerak).

## Jangan berubah
Audio (Sutradara mengurus SFX/musik), isi kata, B12–B13 selain butir 1, adegan yang tidak disebut.

## Cek
`npx tsc --noEmit`, cekkata; lalu `render.sh P frames Main` + `frame_audit.py` (perintah di `R/claude/motion-graphic/pustaka/README.md` §Juri 6) — Sutradara yang menjalankan pemeriksa ulang. Laporan sebagai balasan: per butir, frame bukti, keluaran cek.
