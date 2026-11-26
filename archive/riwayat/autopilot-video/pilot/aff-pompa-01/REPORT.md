# Laporan uji autopilot · aff-pompa-01

Video: `out/final_mix.mp4` (40 dtk, 1080x1920, -14 LUFS). Versi sebelum revisi: `out/r0/`.
Mulai 21:26, video final ~22:08 WITA (±42 menit). Interaksi Irfan: 0. Kredit ElevenLabs: 737 (VO + musik 42 dtk + 1 SFX).

## Alur yang benar-benar jalan
| Tahap | Pelaku | Waktu |
|---|---|---|
| Ide | Maximus (riset niche #1, ide 1) | sudah ada |
| Naskah + storyboard + contract.json | Claude (orchestrator, mewakili gerbang 1) | ~10 mnt |
| 3 gambar isometrik | ChatGPT lewat gpt-bridge, paralel | ~2 mnt |
| VO + rapatkan jeda | ElevenLabs + script | ~6 mnt (2 error) |
| Build Remotion | ChatGPT (Codex) | 9 mnt |
| Render | Orchestrator, per potongan | ~2,5 mnt per render |
| QC r0 -> 5 temuan, r1 -> 4 temuan sisa, r2 | Claude (frame) | 2 ronde |
| Mix audio (VO, musik, 15 SFX stok Kenyset + 1 thud) | script | <1 mnt |

## Yang tidak jalan sesuai PRD (temuan penting)
1. Builder (Codex) tidak bisa render di sandbox (port diblokir) dan menolak render karena disk < 10 GiB. Render harus jadi tugas runner, bukan builder.
2. Disk Mac tinggal ~1,2 GiB: render penuh membuat Chrome crash. Diakali dengan render per 300 frame. Untuk produksi harian, render wajib di PC server.
3. npm di Mac memakai omit=dev, jadi tipe React dan binding rspack tidak terpasang. Sudah diperbaiki untuk proyek ini.
4. Kritikus video Gemini gagal: gemini CLI "ineligible/project id", agy print mode macet menunggu izin. Lapis kritikus kedua belum teruji.
5. Cek mekanis belum lengkap: tidak ada OCR (tesseract belum terpasang), jadi waktu teks dicek manual dari still.
6. Ronde 1 builder membuat 2 regresi (CTA menumpuk, teks kartu terlalu kecil). Loop QC menangkapnya di ronde 2.

## Keputusan default yang perlu Irfan setujui
- Suara VO "Bian" (shared library, Indonesia, edukatif) untuk akun affiliate.
- Gaya: latar terang, aksen oranye #E8590C, ilustrasi isometrik.
- Durasi 40 dtk (target jalur 20-40 dtk).
