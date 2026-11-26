# Devil's advocate — 4 perubahan Irfan (31 Okt 15:21) + kecocokan dengan storyboard

**Inti:** audio v9 bermood bagus tetapi terlalu ambient/lambat untuk visual fast motion design. Urgensi harus datang dari musik ritmis dan jeda yang rapat, bukan dari kecepatan bicara narator.

**Steelman (didukung fakta storyboard):**
- 00a: montase foto berganti tiap 6–8 frame.
- 05f: «montase tercepat di video».
- 02c, 03a, 05c–05g: daftar beruntun yang tampil cepat di layar.
- Ostinato 117,5 BPM: 1/8 = 0,255 dtk ≈ 7,7 frame @30 fps. Pas dengan ritme montase 6–8 frame, jadi visual punya grid untuk dipotong (`BEAT_GRID.json`).
- Bed ambient tanpa ketukan tidak memberi grid itu.

**Serangan:**
- *Penonton awam:* 1/16 yang terus berdetak bisa melelahkan bila tidak berhenti. → Ostinato **berhenti di 06e** (bidang cahaya kita padam), lalu tinggal Echoes untuk resolusi. Berhentinya musik menjadi bagian cerita.
- *Skeptis yang pintar:* jeda 0,05–0,15 dtk + musik cepat = kembali «terburu-buru», hal yang ditolak di v8. → Kecepatan bicara tetap 1,0 (tidak di-time-stretch). Hanya jeda di dalam satu ide yang dirapatkan. Antar ide tetap 0,30 dtk, dan 4 jeda panjang dipertahankan.
- *Tick di tiap ketukan:* ostinato sudah berdetak 1/16, jadi tick pengisi tiap 1/8 (83 cue di draf pertama) akan menumpuk dan melanggar aturan SFX hemat. → **Ditolak.** Tick hanya di poin beruntun (14 cue) + 3 agent keluar dari tombol kirim.
- *Fakta:*
  - Timestamp dalam masukan (0:14, 0:30, 1:08, 1:17) tidak cocok persis dengan r3. Dipetakan lewat isi kalimat, bukan detik.
  - Potongan «AI akan…» benar terjadi: potongan v9 memakai timestamp STT, bukan energi audio. Diperbaiki secara sistemik, bukan hanya di satu kata.

**Pre-mortem:**
1. *Musik ostinato tenggelam di bawah VO karena ducking −12 dB / bed −26 LUFS.* Hasil ukur draf pertama: musik 28 dB di bawah VO di Babak 1, jadi urgensi tidak terdengar. → Ducking di wilayah ostinato −8 dB, bed −23 LUFS.
2. *Ostinato bentrok nada/tempo dengan Echoes.* → Ostinato dibuat di E minor (kunci Echoes terukur). Echoes di-LPF 1,2 kHz dan diturunkan 9 dB di bawah ostinato.
3. *LRA turun di bawah 7 karena isi makin padat.*
   - Terukur 5,9–6,2 pada setelan awal.
   - Solusi: Babak 1 lebih dekat (+2 dB), penutup lebih intim (−4 dB), swell akhir +8 dB. Hasil: LRA 7,3.
   - Harganya: VO di atas musik di Babak 3 median 11 dB (p10 4 dB). Ini titik terlemah dan ditandai.

**Putusan:** dipakai dengan perbaikan di atas.
- Masukan 3b (jeda 0,6 dtk sesudah Altman) bertentangan dengan masukan 2 (0,8–1,0 dtk sesudah Altman). Yang lebih spesifik dipakai: **0,6 dtk**.

**Bukti setelah render:**
- Gemini API (blind): APPROVED, skor 9,5 / 10 / 8,5. Satu temuan dipakai: tick agent diturunkan 3 dB.
- earshot critique: launch-grade, 19/20 metrik dalam rentang.
- Gerbang: −14,1 LUFS, TP −2,0 dBTP, LRA 7,3.
