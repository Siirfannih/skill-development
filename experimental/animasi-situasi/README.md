# Eksperimen · animasi yang menggambarkan situasi (dari awesome-claude-video-skills)

Status: **eksperimen, belum terbukti.** Belum ada aturan di sini yang berlaku di `claude/motion-graphic`. Sumbernya daftar `zhuyansen/awesome-claude-video-skills`, bagian Shorts & social (66 repo) dan Motion graphics (40 repo), dicek 16 Nov 2026.

Tujuanku: Claude membuat visual yang menggambarkan situasi dalam kalimat (perilaku manusia, sebab-akibat, isi benda), bukan teks plus bentuk generik. Skill dari luar tidak dipasang utuh. Video tetap satu skill (`claude/motion-graphic`), dan tiap proyek mulai dari kanvas kosong. Yang diambil hanya cara memutuskannya.

## Empat yang layak diuji

| Repo | Lisensi | Yang diambil | Masuk ke fase |
|---|---|---|---|
| [hughminhphan/motion-kit](https://github.com/hughminhphan/motion-kit) `skills/motion-designer` | MIT | Kurva dipilih per gerak (bukan preset `power3.out`), durasi dihitung dari jarak dan bobot, satu gerak utama diikuti reaksi dengan jeda tidak rata (0, 4, 9, 15, 22, 30 f) dan bukan stagger rata, gerak keluar ±0,65× masuk, hold tetap hidup, satu transisi khas per video. Kurvanya cubic-bezier biasa, jadi bisa dipakai di Remotion `Easing.bezier`. | 3 Visual (kurva, kamera, KT) |
| [pyang5166/gbro-collage-broll](https://github.com/pyang5166/gbro-collage-broll) | MIT | Gerbang metafora sebelum gambar: satu kalimat VO diperas jadi makna inti, emosi, kata kerja aksi (membuka, menyambung, bocor, menekan), satu metafora, dan 3–6 objek kunci beserta urutan rakitnya. Jalur render-nya (Gemini image + video berbayar) tidak diambil. | 1 Pra-produksi (storyboard) |
| [artemnovitckii/claude-animation-skills](https://github.com/artemnovitckii/claude-animation-skills) | MIT | Resep gaya pendek per situasi: `breakdown` (exploded view: benda terurai per lapis + garis label; cocok dengan aturan "tampilkan isi benda"), `stick-figure` (piktogram orang untuk perilaku manusia), `graph`, `map-route`, `minimalistic-graphics` (line-art satu metafora). | 1 → kartu kiblat calon di `pustaka/` |
| [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) | lihat repo | "State the realism" (sebut anatomi, sudut pandang, dan referensi yang dibuka untuk orang, hewan, atau benda), dan "buktikan look di satu still dulu". Ini searah dengan Lantai, jadi hanya dipakai sebagai pembanding. | 1, 3 |

## Yang sengaja tidak diambil
- `artemiimillier/skill-multik` ("event untuk setiap kata"): bertentangan dengan Lantai E24, karena menghasilkan spam visual dan SFX.
- Kit gaya siap pakai (`creator-style-kit`, `animation-styles`, `video-effects-pack`): template, bukan cara memutuskan.

## Uji yang harus lolos sebelum masuk skill
1. Satu beat proyek nyata dikerjakan dua kali: alur sekarang vs gerbang metafora (gbro) ditambah kurva motion-kit. Stills dan draft disandingkan dengan kiblat (`juri/sandingkan.py`).
2. Kurva motion-kit dipasang sebagai `remotion/src/lib/curves.ts` (Easing.bezier), lalu ditulis ulang di Remotion, bukan GSAP. Yang dicek: gerak tidak lagi terasa "fade-up rata".
3. Aku menilai. Yang lolos naik ke `guide/gerak/` atau `pustaka/` sesuai `pustaka/README.md` §Tumbuh.
