# Kamera, gerak, dan transisi

Dibuka saat merancang gerak kamera dan transisi (langkah 5-6 alur `SKILL.md`). Butir lama LANTAI B10-B13b dipadatkan di sini dengan alasannya; bunyi aslinya tetap di `LANTAI.md` (arsip). Prinsip yang berlaku untuk semua gerak ada di NEGATIF 10: setiap gerak punya sebab yang bisa diucapkan. Cek mekanis: `scripts/juri/motion_lint.py`.

## Frame hidup (B10, B11, B12)
- **Frame tidak datar.** Shot lebih dari 2 detik punya gerak kamera yang disengaja (push/zoom pelan untuk fokus, pan, mengikuti objek). Pengecualian hanya bila kartu kiblat memang berkamera diam, ditulis di `RESEP.md`. Alasan: frame yang diam lama terbaca sebagai slide.
- **Satu objek fokus per beat.** Kamera mengikuti satu objek dari muncul sampai selesai dan tidak kembali ke posisi awal di tengah jalan. Kamera patuh ucapan: datang di awal kata, tahan sampai kata berikutnya, keyframe dari tabel waktu kata, framing akhir tidak memotong objek.
- **Elemen diam di dunianya, kamera yang bergerak.** Saat kamera zoom ia melewati teks dan objek; teks tidak ikut bergeser sendiri. Alasan: dunia yang konsisten membuat gerak kamera terasa fisik.

## Transisi (B13)
- Nol crossfade polos; fade bukan gerak. Yang masuk datang dari suatu arah atau berubah bentuk; gerak cepat memakai motion blur; easing tidak linear. Overlay dan gradien masuk-keluar dengan gerak.
- Pengecualian bermotivasi: micro-blend ≤ 4 frame hanya di puncak match-cut/zoom-through (`scale ≥ 3×` atau objek ≥ 80 % frame), dan blur-to-sharp yang dipadu gerak `curves.ts`.
- Mekanik transisi dipilih dari hubungan ruang dua adegan: B di dalam A = push-through; A bagian dari B = pull-back; ganti topik = whip (`references/motion-mechanics.md`, `references/pacing-map.md`). Satu transisi khas per video; ≥ 4 tipe per 30 dtk tanpa tipe sama berturut-turut (`SceneChain`).

## Gerak dirancang per gerak (B13a)
- Kurva dipilih menurut apa geraknya dari `scripts/remotion/curves.ts`: `land` masuk dari luar frame, `heavy` objek besar dan kamera, `whip` ganti keadaan, `reveal` teks dari mask, `leave` keluar, `drift` hold. Bukan `Easing.ease` atau `inOut(cubic)`.
- Durasi dihitung dari jarak dan bobot (`dur(px, fps, bobot)`), bukan kebiasaan 0,4-0,6 dtk. Satu gerak utama diikuti reaksi berjeda tidak rata (`react(i)`: 0, 67, 150, 250, 367, 500 ms), bukan stagger i × konstanta.
- Gerak keluar ±0,65× masuk dan makin cepat. Hold > 1 dtk tetap hidup (drift atau napas kamera) kecuali diam disengaja. Tidak ada fade-up atau blur-in sebagai cara masuk bawaan; blur hanya untuk gerak cepat.

## Format berulang (B13b)
Format yang muncul berulang berbeda framing tiap kemunculan (grafik kedua dan seterusnya: kamera mengikuti titik, close-up, posisi lain, reveal-out). Alasan: pengulangan framing identik terbaca sebagai template.
