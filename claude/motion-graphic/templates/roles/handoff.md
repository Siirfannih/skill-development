# Kerangka folder `handoff/`

Salin bagian yang dibutuhkan ke `projects/<proyek>/handoff/`. Aturan pemakaian: `references/roles.md` §4–5.

## BRIEF.md (Sutradara)
```
# Brief <nama> · v<N> · <tanggal>
## Brief Irfan (apa adanya)
> …
## Terkunci
- Tujuan · penonton · durasi · rasio/fps · CTA
- Gaya: templates/gaya/<gaya> (token yang diubah: …)
- Sumber: footage <path>, script/transkrip <path>
## Hard Gate yang relevan
- aturan 2 teks dari ucapan · 43 SFX per event · 44 caption ≤ 2 baris · …
## Aset + lisensi
| file | sumber | lisensi |
## Tidak boleh
- …
```

## PLAN.json (Sutradara)
Format `templates/storyboard/beats.json` ditambah per beat:
```
{"id":"B03","t":[12.4,15.9],"vo":"…","peran":"menjelaskan","adegan":"MP-03","opsi":"A",
 "layar":["San Diego"],"aksi":"…","kamera":"…","keluar":"…",
 "sfx":[{"t":12.4,"peran":"klik teks","alasan":"kata muncul"}],
 "lulus_bila":["teks ≥ waktu baca aturan 46","tekstur ikut layer"]}
```

## TASK-rN.md (Sutradara)
```
# TASK r<N> · <tujuan satu kalimat>
Cakupan: B01–B05 (beat lain tidak disentuh)
Boleh dibaca: templates/gaya/<gaya>/STYLE.md · references/build.md · <engine>
Keluaran wajib: still tiap beat (sheet) · render tanpa audio <path> · keluaran gate: <daftar>
Perbaiki: F-r<N-1>-02 (B03: teks grafik hilang sebelum kalimat selesai → tahan sampai 0:06.0)
Jangan berubah: B01, B02 (terkunci)
Selesai bila: <kriteria terukur>
```

## REPORT-rN.md (Editor)
```
# REPORT r<N>
| Beat | Dikerjakan | Bukti (path still/render) | Angka/gate | Menyimpang dari TASK? alasan |
Gate: <keluaran script apa adanya>
Pertanyaan terbuka: QUESTIONS.md #…
```

## REVIEW-rN.md (Sutradara)
Ditulis setelah melihat still/render **sebelum** membaca REPORT.
```
| ID | Beat | Temuan | Bukti (tc/frame) | Kriteria terukur | Devil's advocate | Status |
| F-r<N>-01 | B03 | … | 0:13.2 | … | melanggar PLAN lulus_bila #1 | LOLOS → TASK r<N+1> |
| F-r<N>-02 | B04 | … | … | … | selera, tidak di BRIEF | BUANG |
```

## QUESTIONS.md (Editor) dan DECISIONS.md (Sutradara)
Satu baris per butir: `Q-03 · B04 · pertanyaan · opsi` → jawaban Sutradara/Irfan + sumber.
