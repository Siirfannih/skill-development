# Cold open v11 — supercut berita (0:00–0:10,3)

Pola diambil dari referensi siirfannih_DfDC0I9PHin:

- Suara asli beberapa pembicara disambung rapat, mulai di detik 0,05.
- Jeda antar sumber 0,12–0,14 dtk.
- Footage berganti per frasa (atau per kata).
- Musik ostinato berjalan di bawahnya.

Sesudah «so fast»: SEMALAM mendarat (00b), whoosh, lalu hard cut ke 01a dan narator «Tanpa sadar…» di 10,25 dtk.

File video ada di `assets/news/seg/`, sudah dipotong per sumber. Kolom «in/out file» = detik di dalam file mp4 tersebut. Kolom «di timeline» = posisi di audio master.

| # | Sumber | Kalimat | in/out file (dtk) | di timeline (dtk) | Teks layar (storyboard) |
|---|---|---|---|---|---|
| 1 | CNBC ([link](https://youtu.be/P_6RhqaMUts?t=77)) | «AI is the biggest technical thing ever in my lifetime.» | `P_6RhqaMUts_76.5.mp4` 0.00–1.34 + 2.42–3.42 + 4.34–5.40 | 0.05–3.51 | — |
| 2 | Sky News ([link](https://youtu.be/CXFtV0WAN7k?t=20)) | «16-year-old launched a new AI company» | `CXFtV0WAN7k_19.5.mp4` 0.87–1.63 + 2.09–3.74 | 3.65–6.09 | FOUNDER |
| 3 | Bloomberg ([link](https://youtu.be/VuyOy5WN980?t=1)) | «raised over a billion dollars» | `VuyOy5WN980_0.mp4` 1.07–2.74 | 6.21–7.88 | CEO |
| 4 | Sky News ([link](https://youtu.be/DKA5AkrQfxo?t=57)) | «This time progress was so fast» | `DKA5AkrQfxo_56.5.mp4` 1.06–1.70 + 2.24–3.50 | 8.02–9.95 | SEMALAM. |

Kata layar mendarat di micro-tick (`cues11.json`, zona z0) yang terkunci ke grid ostinato:

| Teks layar | Tick (dtk) |
|---|---|
| 00a FOUNDER (Sky | 3.81 |
| 00a CEO (Bloomberg | 7.13 |
| 00b SEMALAM (Sky | 9.68 |

Panel storyboard: 00a = 0,00–8.02 (montase founder + berita) · 00b = 8.02–10.29 (awan gambar, SEMALAM) · 01a = 10.29.

Lisensi: potongan pendek berita (CNBC, Sky News, Bloomberg) dipakai sebagai kutipan komentar, sama seperti klip Jensen dan Altman. Cantumkan sumbernya di caption atau di layar.
