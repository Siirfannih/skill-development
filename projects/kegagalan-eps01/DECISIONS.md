# Kegagalan eps. 01 · ledger keputusan

Talking head mentah 8:20 (DJI, HEVC 10-bit 59,94, TC 14:51:26;08) → paket editor 16:9. File kerja di mesin PC: `~/Newediting/` (timeline-editor, roughcut, audio, aset, storyboard, graded). Hasil yang ditonton Irfan: Google Drive "Claude edit/Kegagalan eps01".

| ID | Keputusan / koreksi Irfan | Diterapkan di |
|---|---|---|
| K-01 | Hook "Opsi A + B": punchline "dan aku gagal" + motion cek Rp100 jt dicap GAGAL | timeline klip 01 |
| K-02 | Format 16:9 horizontal seperti video asli | semua |
| K-03 | Vibe dari filmnostalgia, gaya motion vinay_visuals (B-roll minim → mix motion), ref ketiga theacademy.sf | storyboard, aset |
| K-04 | BGM: windburn – Kinji (file dari Irfan) | mix v2+ |
| K-05 | Efek/motion di tengah layar: latar kanvas polos biru atau putih, bukan talking head; Irfan paling banyak di jendela kecil | aset, storyboard v2 |
| K-06 | Objek motion harus pas dengan targetnya (centang di kotak checklist) | aset centang SVG, storyboard v2 |
| K-07 | Audio tidak boleh mendem: dialog PCM langsung dari sumber, tanpa denoise | mix v3+ |
| K-08 | Potongan: "how", "sehingga", "share", "dan", "finish" utuh; "benar-benar membuka diri" sekali; jeda sebelum "and I think it's okay" | timeline v4, mix v4, animatic v3 |
| K-09 | Semua mp4/wav hasil diunggah ke Drive "Claude edit" + link | semua kiriman |
| K-10 | Color grading dibatalkan: video memakai warna asli kamera. Look rekomendasi (grain 3 + hitam diangkat) terlihat pecah dan bernoise di preview Drive | tidak ada grading; `~/Newediting/grade_film.sh` disimpan sebagai arsip |
| K-12 | Render apa pun hanya untuk rentang yang dipakai timeline (klip + handle), bukan seluruh rekaman | grading/render klip |
| K-11 | Akses "siapa pun dengan link" pada folder Drive dibiarkan | Drive |
| K-13 | Sound design ditulis ulang (v4): SFX pilihan Irfan (nama file = pemakaian), tanpa kertas/kayu/riser/sub-drop; bunyi hanya di perubahan keadaan gambar; level per tingkat relatif ke suara; 229 → 76 cue | `v2/audio/cues_v4.py`, `mix_v4.py` |
| K-14 | Musik ada sejak frame 0: Every Living Breathing Moment (babak 1) + windburn (babak 2), level setara per detik; ekor outro setelah "finish" | `v2/audio/mix_v4.py` |
| K-15 | Pembuka: wajah ditahan ±2,3 dtk sebelum ke kalender ("golden moment") | `v2/remotion/src/scenes/Kalender.tsx` |
| K-16 | Adegan software di desktop Mac (wallpaper padang rumput Irfan), UI lebih ramai/hidup, bukan kanvas biru | `v2/remotion/src/comp/MacDesktop.tsx` |
| K-17 | Arsip kegagalan = binder di meja kayu, dirender Blender (realistis) | `v2/blender/build_arsip.py`, `comp/Arsip3D.tsx` |
| K-18 | "Ahh" (myinstants) setelah "gagal" sebelum "kurang ajar sekali" | `cues_v4.py` |
| K-19 | SFX tidak boleh hilang saat masih keras: potong di jeda sunyi setelah serangan atau fade 150–300 ms yang selesai di batas objek; gerbang potong di mix | `v2/audio/mix_v4.py`, `scripts/audio/sfx_potong.py` |
| K-20 | Pembuka v6 = ruang kerja Blender (dinding bilah kayu, monitor, riser, lampu, Clawd sibuk di meja); wajah di dalam monitor; satu zoom pelan berhenti di framing monitor ±73 % (bezel + kayu terlihat), tidak menyelam ke layar; K-15 diganti | `v2/blender/build_ruang.py`, `comp/RuangPembuka.tsx` |
| K-21 | Cut out: tiap adegan selesai di dunianya lalu potong keras ke adegan berikut; tidak ada jendela wajah di latar putih, tidak ada morf antar-dunia | `scenes/Kalender.tsx` |
