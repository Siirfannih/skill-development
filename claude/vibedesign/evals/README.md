# evals · vibedesign

Mengikuti `../../../EVALS-DESIGN.md`: koreksi → kasus → patch → uji lama vs baru → gerbang persetujuan.

| Path | Isi |
|---|---|
| `trigger.json` | permintaan yang harus / tidak boleh memicu skill ini |
| `cases/vd-*.json` | kasus perilaku dari koreksi nyata: prompt, file pendukung, 2–5 assertion yang bisa dicek |
| `fixtures/` | brief/slide contoh yang dirujuk kasus |
| `inbox/` | catatan mentah sesi kerja (`<tanggal>-<id>.md`) sebelum jadi kasus |
| `results/<tanggal>/` | skor per kasus, skill lama vs baru |

Cara menilai: grader terpisah hanya melihat transkrip + still/keluaran juri, lalu memberi lulus/gagal per assertion dengan bukti. Assertion visual dinilai dari still yang disandingkan; assertion geometri dari keluaran juri.
