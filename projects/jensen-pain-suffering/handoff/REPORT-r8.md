# REPORT r8 · Builder · jensen-pain-suffering (tanpa render)

Typecheck: `cd remotion && npx tsc --noEmit` lulus (tanpa keluaran).

## File diubah
- `remotion/src/shots.tsx`, `remotion/src/engine/Teks.tsx`, `remotion/src/data/head.json` (tambah T48 = 704,7, sama dengan T49).
- `remotion/src/Main.tsx` (DI LUAR daftar FILE BOLEH, tetapi batas beat hanya ada di tabel SHOTS di sini; hanya 4 angka diubah).
- `handoff/TEKS.json` / `data/teks.json` tidak diubah (modus ada di Place, bukan di JSON).

## Per temuan
- F-r7-01: B3 sampai 271, B4 mulai 271. Path P4, klip arsip_meja, buram→fokus, dan Flash krem digeser ke 271.
- F-r7-02: B6 sampai 709 (push B6c 686→709), B7 keyboard mulai 709 (path P7a, klip ketik, start TeksSet). T33 "Boy," tetap di onset (a=716).
- F-r7-03: B7 Jensen 777→813 (push dan until), B8 tempa mulai 813 (path P8a, klip tempa, start).
- F-r7-04: Place baru `hold` (frame tampil selesai memudar; fade keluar 3 f sebelumnya, tampil tetap digambar sampai itu). T48 `hold: 1013` di B9a (tidak memudar sebelum cut) dan juga digambar di B9b (posisi kepala sama dengan T49, `head`) memudar 1010→1013 bersilang dengan T49 yang masuk 1010→1013. "it's" tetap tidak ditampilkan.
- F-r7-05: T49 modus `kata`.
- F-r7-06: T01 dan T14 modus `kata`.
- F-r7-07: T13 `big` 180→160 (cap ≈ 0,7×160 = 112 px = 10,4 % tinggi, ≥ 9 %), plus Place baru `dx: 56` (geser kanan 56 px layar). Celah ke tepi blur kepala 44 → ±100 px (≈ 5 %). Tepi kanan "suffering" ±1,75k px, sisa ≥ 8 % lebar (perkiraan dari ukuran, belum diukur di frame).

## Tambahan (diputuskan sendiri, mohon dicek)
Memotong beat lebih awal membuat ekor tampil lama terpotong dan 2–7 frame kosong di tengah kalimat. Tampil lama diteruskan ke beat baru dengan silang 3 f yang sama:
- T14 di B4 (tempat T15, `under(0)`) f271–276.
- T32 di B7 (tengah, 130 px) f709–717 (bersilang dengan T33).
- T38 di B8 (posisi T39) f813–819.
Bila Sutradara tak mau, hapus 3 entri itu di `shots.tsx` (frame kosong kembali: T14 2 f, T32 5 f, T38 2 f).

## Frame batas baru
B3|B4 271 · B6|B7 (keyboard) 709 · B7|B8 (tempa) 813 · B9a|B9b tetap 1010. Beat lain tidak berubah (total 1428).
