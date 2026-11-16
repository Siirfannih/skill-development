# VERDICT: c01_000.0-010.0s

### Evaluasi Tanda Otomatis
- **f10 (0.33 dtk) · LOMPAT 12.3 (f9→10)**: **MASALAH**. Pose Jensen melompat seketika dari tangan di depan mulut pada f0–f9 menjadi tangan di bawah pada f10 tanpa frame gerak atau transisi perantara (jump cut pose di dalam klip talking head yang sama).
- **f10 (0.33 dtk) · SFX? potong/gerak besar tanpa cue ±0,30 dtk**: **BUKAN MASALAH AUDIO**. Bukan pergantian adegan atau elemen visual bercerita baru (sudah ada orchestra stab pada 0.00 dtk). Pemicu peringatan otomatis murni disebabkan oleh patahan gerak visual f9→f10.
- **f182 (6.07 dtk) · SFX? potong/gerak besar tanpa cue ±0,30 dtk**: **BUKAN MASALAH**. Cut dari b-roll foto wisuda kedua kembali ke Jensen saat ucapan *"I don't know"* sengaja tanpa SFX sesuai arahan Sutradara (D-018: cut wisuda→Jensen tanpa SFX).
- **f240 (8.00 dtk) · LOMPAT 164.0 (f239→240)**: **MASALAH**. Lonjakan perubahan nilai piksel ekstrem akibat frame putih kosong (solid white screen).
- **f240 (8.00 dtk) · KEDIP 163.8**: **MASALAH**. Kedip putih tunggal (1 frame) di tengah klip Jensen berbicara (*"I hope"*) sebelum kata *"suffering"*, merusak kontinuitas video.
- **f241 (8.03 dtk) · LOMPAT 163.8 (f240→241)**: **MASALAH**. Lompatan ekstrem kembali dari putih ke footage Jensen; dampak lanjutan dari keberadaan frame putih di f240.
- **f241 (8.03 dtk) · SFX? potong/gerak besar tanpa cue ±0,30 dtk**: **MASALAH**. Dipicu oleh pergantian mendadak dari frame putih f240 ke f241 tanpa SFX; otomatis teratasi setelah f240 diperbaiki.

---

### Daftar Temuan
0.33 | 10 | lompatan gerak | Tangan Jensen yang menutupi mulut pada f0–f9 mendadak melompat ke bawah pada f10 tanpa frame perantara (jump cut pose dalam adegan talking head) | Sesuaikan titik in-point video agar dimulai saat tangan sudah di bawah (f10) atau berikan transisi halus bila menyambung dua take berbeda
8.00 | 240 | kedip 1 frame | Muncul 1 frame putih polos total (blank white screen) di antara f239 (*"I hope"*) dan f241 (*"I hope"*) | Hapus frame putih f240 dan sambungkan f239 langsung ke f241/f242
8.03 | 241 | lompatan kontras | Peralihan mendadak dan kontras ekstrem dari layar putih f240 kembali ke footage f241 | Otomatis teratasi saat frame putih f240 dihapus

---

```json
{
  "temuan": [
    {
      "detik": 0.33,
      "frame": 10,
      "jenis": "lompatan gerak",
      "terlihat": "Tangan Jensen yang menutupi mulut pada f0–f9 mendadak melompat ke bawah pada f10 tanpa frame perantara (jump cut pose dalam adegan talking head)",
      "usul": "Sesuaikan titik in-point video agar dimulai saat tangan sudah di bawah (f10) atau berikan transisi halus bila menyambung dua take berbeda"
    },
    {
      "detik": 8.00,
      "frame": 240,
      "jenis": "kedip 1 frame",
      "terlihat": "Muncul 1 frame putih polos total (blank white screen) di antara f239 ('I hope') dan f241 ('I hope')",
      "usul": "Hapus frame putih f240 dan sambungkan f239 langsung ke f241/f242"
    },
    {
      "detik": 8.03,
      "frame": 241,
      "jenis": "lompatan kontras",
      "terlihat": "Peralihan mendadak dan kontras ekstrem dari layar putih f240 kembali ke footage f241",
      "usul": "Otomatis teratasi saat frame putih f240 dihapus"
    }
  ],
  "putusan": "GAGAL"
}
```

PUTUSAN: GAGAL
