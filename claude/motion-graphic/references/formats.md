# Profil format

Dibaca di gerbang 1 (brief), sebelum cabang lain. Format menentukan aturan mana yang berlaku. Kesalahan klip DOAC 6 Nov lahir dari aturan video ber-VO narator (rantai Modul 1, musik per babak, caption pembicara) yang diterapkan ke klip podcast (Irfan 6 Nov).

Tulis di brief: `Format: A` atau `Format: B`. Ragu = tanyakan satu pertanyaan ke Irfan.

| | **A. Motion ber-VO narator** | **B. Klip podcast / wawancara** |
|---|---|---|
| Contoh | Jadisatu launch, The Gap, Pengganti Kita Sendiri | Potongan DOAC, wawancara, talk dengan overlay motion |
| Pemilik panggung | Visual motion + VO narator (TTS/rekaman Irfan) | Wajah dan suara pembicara asli |
| Suara utama | VO dirakit: jeda dipadatkan (aturan 33), EQ narator §14.6 | **Audio sumber apa adanya** (aturan 43). Hanya gain linear seluruh mix |
| Klip narasumber | Sisipan; Modul 1 hanya bila ukurannya buruk (aturan 38) | Bukan sisipan, ini isinya. Modul 1 dilarang |
| Musik | Per babak, ikut nada; tension/build/drop boleh (aturan 25, 27) | Satu bed tenang: lofi / ambient / fokus, register rendah, tanpa drop atau build yang menarik perhatian. Level ujung bawah tabel §14.10. Tanpa musik juga sah bila brief memilihnya |
| SFX | Setiap event visual bersuara (≥ 85 %, aturan 30, 35, 37) | Hanya pada sisipan motion (kartu, grafik masuk). Tidak ada SFX di atas kalimat pembicara tanpa grafik |
| Teks | Kinetik per frasa, mode per beat (`decision-guide.md` §1) | Caption satu baris (aturan 44) + kata penekanan sesekali + grafik sisipan |
| Pembuka | Gebrakan visual + suara di frame 0 (aturan 27) | Kalimat terkuat pembicara; gebrakan audio tidak dipakai |
| Gerbang khusus | `audio_qa.py --module5`, `audio_phone.py`, `visual_coverage.py` | `gate/voice_fidelity.py`, `gate/caption_lines.py` |

Aturan tanpa tanda format di `core-rules.md` berlaku untuk keduanya (fokus tunggal, palet, UI asli, kotak hanya untuk keterbacaan, revisi = diff, dsb.).

## Arah per video datang dari luar skill

Skill ini filter dan cara kerja. Arah (mood, palet, gaya grafik, referensi gerak) datang dari brief, referensi yang Irfan kirim di sesi, dan `projects/<proyek>/`. `canvas-skill-library` adalah **data referensi**: boleh dibuka untuk mencari contoh gerak bila brief memintanya, tidak pernah menjadi aturan, dan kalah dari skill ini bila bertentangan (Irfan 6 Nov: library belum stabil).
