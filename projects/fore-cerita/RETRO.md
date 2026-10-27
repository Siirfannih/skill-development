# RETRO — kandidat aturan dari proyek Fore (status: menunggu persetujuan Irfan, belum masuk skill)

| # | Kejadian | Aturan usulan | Skill tujuan |
|---|---|---|---|
| R1 | SFX dibuat lewat konektor ElevenLabs, padahal kuotanya habis di workspace lain; Irfan: "harus digenerate via api" | ElevenLabs selalu lewat API dengan kunci dari Keychain Mac (`tools/el_sfx_batch.sh` dijalankan di Mac, kunci tidak dicetak). Konektor tidak dipakai | motion-graphic/audio |
| R2 | 4 job gpt-bridge paralel → semua time out | Maksimal 2 job ChatGPT bersamaan; pecah aset per batch, lewati file yang sudah ada | motion-graphic/build |
| R3 | Gambar AI 3–8× lebih padat detail daripada referensi (energi tepi 26 vs 3–10) → "AI slop" | Ukur energi tepi (640 px, PIL FIND_EDGES) aset dan render vs referensi; target ≤ referensi; sederhanakan adaptif (mean-shift) hanya bila melebihi | motion-graphic/analysis-qa |
| R4 | Posterize global → bercak hitam di rambut/tangan, noda palsu | Jangan posterize render jadi; bidang bersudut harus dari gambar (prompt), grading hanya angkat hitam/grain/halation | motion-graphic/direction |
| R5 | Teks/UI di atas layer gambar tidak ikut kamera → meleset saat zoom | Semua overlay di adegan berkamera dibungkus komponen yang memakai transformasi kamera yang sama (`Follow`) | motion-graphic/build |
| R6 | Pan kamera memperlihatkan tepi latar | Jepit pan kamera ke kelebihan zoom: abs(x) ≤ 960·(s−1) | motion-graphic/camera-transition |
| R7 | Sprite ChatGPT punya aura terang opaque | Cek sprite di atas latar gelap sebelum dipakai; alpha = inti (>200) yang dilebarkan sedikit; minta ulang bila aura menyatu | motion-graphic/build |
| R8 | Tokoh berpindah tempat antar pose di satu framing ("teleport") | Ganti pose = ganti framing (cut), seperti coverage, kecuali ada gerak berjalan | motion-graphic/storyboard |
| R9 | 35 dari 50 SFX tenggelam di bawah lagu berlirik | Untuk video berbasis lagu: level SFX otomatis relatif lagu (utama −9 dB, halus −14 dB) + duck lagu ≤ 1,5 dB + cek speaker HP | motion-graphic/audio |
| R10 | Reviewer independen menemukan masalah yang lolos dari QA sendiri (konsistensi tokoh, kesinambungan planner) | Untuk karya portfolio: minimal 2 putaran reviewer independen sebelum kirim | working-with-irfan |
