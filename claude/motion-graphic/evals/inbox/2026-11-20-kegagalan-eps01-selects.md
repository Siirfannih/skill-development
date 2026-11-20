# Inbox · kegagalan-eps01 (paket editor dari talking head mentah)

1. **Take dobel.** Diminta: rakit "sekarang aku ingin benar-benar membuka diri untuk menerima kegagalan…". Salah: in/out dipilih dari timestamp Whisper; kata "ingin" 436,25–438,59 menelan take 1, klip menyambung awal take 1 + sisa take 2 → "benar-benar membuka diri" terdengar dua kali. Bukti: `~/Newediting/analisis/transkrip_kata.json`, animatic v2 ±0:38–0:44. Assertion: memakai satu take utuh; menjalankan `rakitan_cek.py sumber` sebelum memilih in/out.
2. **Kata pendek hilang di sambungan.** Salah: klip 10 out 414,70 / klip 11 in 414,80 membuang "how" (414,70–414,80). Assertion: dua klip bersambung dipotong di lembah yang sama tanpa celah; `rakitan_cek.py rakitan` dijalankan sebelum kirim dan FAIL pada v3.
3. **Audio mendem.** Salah: afftdn + AAC dua kali pada sumber ber-noise floor −55 dB. Assertion: dialog dipotong PCM dari sumber; `voice_fidelity.py` dijalankan.
4. **Grading menggelapkan ruangan redup.** Rantai `eq gamma 0.90 … vignette PI/4.5`: median luma 0,214 → 0,089, kanal merah bayangan 0,002. Assertion: varian diukur `grade_ukur.py` dan disandingkan sebelum render penuh.
