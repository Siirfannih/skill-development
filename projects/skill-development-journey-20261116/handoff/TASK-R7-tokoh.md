# TASK-R7-tokoh · bubble gaya WhatsApp + tokoh tidak melayang (D-458, D-459)
Baca dulu `handoff/R7-BERSAMA.md`.

TUJUAN: bubble perkenalan tokoh berbentuk pop-up chat ala WhatsApp (bukan piksel/voxel), dan tokoh pixel Clawd/ChatGPT/Gemini tidak pernah melayang — termasuk saat pergi.

## KONTEKS
- Lapisan milik tugas ini (lihat `lego/lego_r6.json`): K_Clawd0 (0,0), K_Clawd (4,47), K_Codex (8,31, = ChatGPT), K_Gemini (9,55), B_Codex (8,59), B_Clawd (9,46), B_Gemini (9,83). Komponen: `remotion/src/video/bersama/BubbleSapa.tsx`, `KarakterLayer.tsx`, `KarakterPixel.tsx`, `BubbleModelGemini.tsx`; props di `lego/lapisan.json` (cari id itu).
- Isi bubble tetap (D-417): Claude bete "Aku yang ngedit loh.", ChatGPT "Hi! Aku nemenin Claude.", Gemini "…" (indikator mengetik tiga titik).
- **Bubble (D-458)**: bentuk chat WhatsApp: persegi panjang membulat (radius ±22 px) dengan ekor kecil di sudut bawah menunjuk ke tokoh, latar putih `#FFFFFF` (atau putih hangat), teks SF Pro/Poppins 600 hitam `#080608`, satu kata kunci boleh biru `#2E5BFF`, bayangan lembut; muncul pop (skala 0,6 → 1,0 dari ekor, `land` 6–8 f, overshoot kecil), Gemini menampilkan titik mengetik beranimasi. Tidak ada tepi piksel/tangga.
- **Tokoh tidak melayang (D-459, putusan Sutradara)**: setiap tokoh selalu berdiri/duduk di benda (bahu, kepala, atau slab). Saat DECISION (T019, slab di depan dada, 12,0 dtk) masuk, ketiga tokoh MENDARAT dan berdiri di atas tepi atas huruf-huruf DECISION (sedikit squash saat mendarat), lalu pergi bersama slab (ikut keluar dengan potongan slab, tidak terbang). Cek juga Clawd di 0–4,5 (K_Clawd0) dan saat masuk 4,47: tidak boleh melayang di udara; bila sekarang mengambang, tempelkan di bahu/kepala dengan bayangan kontak.
- Kamera r7 (`lego/lego_r7_kamera.json`) berubah: tokoh yang menempel ke bahu/kepala harus ikut posisi itu per frame (matte/pelacakan kepala), bukan posisi layar tetap.

## FILE BOLEH
`remotion/src/video/bersama/BubbleSapa.tsx`, `BubbleModelGemini.tsx`, `KarakterLayer.tsx`, BARU `remotion/src/video/bersama/tokoh/**`, `remotion/src/video/Root.tsx` (hanya tambah Composition), `lego/r7_tokoh.py`, `lego/r7_override_tokoh.json`, `lego/cache/r7_tokoh_*`, `qc/r7/tokoh/**`.
## FILE JANGAN
`KarakterPixel.tsx` (bentuk tokoh tetap; boleh dibaca), adegan lain, `lego/lego_r6.json`, `lego/r6_gabung.py`, `lego/r7_gabung.py`, `teks.json`, audio/, edit/, override pekerja lain.
## LULUS BILA
1. tsc lulus. 2. Rakitan rentang 0–15 + lembar 6 fps + still penuh (0,5 / 4,8 / 8,9 / 9,7 / 10,5 / 12,2 / 12,8 / 13,5) di `qc/r7/tokoh/`; di setiap frame tiap tokoh punya titik kontak dengan benda (tulis per still). 3. Bubble tidak menutupi wajah/mulut.
## LAPORAN
`handoff/REPORT-R7-tokoh.md` (waktu persis tiap pop bubble dan pendaratan untuk SFX).
