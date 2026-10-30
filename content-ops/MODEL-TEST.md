---
status: proposal
scope: content-ops
how_to_use: "Rencana uji model. Menunggu pemakaian, bukan standar mutu."
---

# Protokol uji model (dijalankan setelah produksi stabil)

Arahan O-004. Disiapkan sekarang supaya data sejak hari pertama sudah bisa dibandingkan; uji formal **dimulai setelah 2 minggu berturut-turut kadensi tercapai** tanpa konten terlewat.

## Yang diuji
Tahap riset → naskah → storyboard. Tahap produksi video tidak diuji antarmodel dulu karena hasilnya lebih ditentukan executor dan tools daripada model.

Kandidat: Grok (Maximus), Claude, ChatGPT, DeepSeek, GLM, model lain yang tersedia.

## Cara (uji buta)
1. Pilih 5 brief nyata dari jalur yang sama (brief = ide terpilih + bukti + aturan jalur). Brief dibekukan sebagai file.
2. Setiap model menerima brief, `INDEX.md`, dan skill yang sama. Satu sesi baru per brief, tanpa riwayat chat.
3. Output dinamai ulang menjadi A/B/C/… oleh agent netral sebelum dinilai, supaya Irfan tidak tahu modelnya.
4. Irfan menilai cepat (1–5): hook, kejelasan, cocok suara jalur, bisa diproduksi tanpa menebak. Claude sebagai auditor menilai kepatuhan aturan (kata/pola terlarang, klaim tanpa sumber, cakupan storyboard).
5. Dicatat juga: waktu sampai draft pertama, jumlah ronde revisi, biaya token/kredit.

## Keputusan
- Pemenang per tahap = rata-rata skor tertinggi dari 5 brief, selisih ≥ 0,5 poin. Selisih lebih kecil dianggap seri; pilih yang lebih murah/cepat.
- Pemenang lalu diuji di dunia nyata: naskahnya diproduksi dan diposting bergantian dengan model lama selama 2 minggu; dibandingkan pakai skor `lanes/jadisatu.md`.
- Satu konten viral tidak memenangkan model.

Hasil disimpan di `model-tests/<tanggal>-<tahap>.md`.
