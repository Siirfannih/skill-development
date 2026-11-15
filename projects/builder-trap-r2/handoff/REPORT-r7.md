# REPORT r7 · B12–B13b ke kartu 63 + Revisi Irfan #1 (R1–R4) + #2 (M1–M3)
(disimpan Sutradara dari balasan Editor; ringkas, angka apa adanya)

- Layar macOS sebagai kode di atas `wall_mac.jpg`: menu bar, 4 ikon desktop, jam flip, kalender Nov 2026, dock kaca (Finder … ChatGPT … Trash). Baru: `ui/MacDesktop.tsx`, `ui/ChatGPTDark.tsx`; `Browser.tsx` prop `shadow`; `Act2.tsx` B12/B13b ditulis ulang; `Act2.text.ts` KT B12/B13-N2 dihapus + `KATA_TANPA_TEKS`; `cekkata.mjs` membaca pengecualian.
- B12: desktop → kursor klik ikon ChatGPT → pantul 2× → jendela gelap terbuka dari ikon ke tengah 0,4 dtk (nyata f866–878), menu bar "ChatGPT", riwayat, punch di "investasi", cap logo putih di "AI.". B13b: klik prompt → punch → ketik 12 huruf/dtk → klik kirim → mosaik.
- Kartu 63: jendela 58,0 × 58,9 % (05), 58,6 × 59,4 % (09); punch 1,41–1,45×, teks prompt 9,4–9,6 % tinggi lewat panel prompt lapis depan, desktop terlihat di 4 tepi; UI gelap #212121/#171717; kamera tanpa diam > 1 dtk (jalur keyframe).
- cekkata exit 0 (12 kata TANPA: indeks 80–88, 91–93); tsc exit 0; balance_check FAIL 3 (04 transisi, 10/11 prompt kiri), lainnya ok.
- Bukti: `qc/r7_sheet.jpg`, `qc/r7_sanding.jpg`, `qc/r7_balance_sheet.jpg`, `qc/stills_r7/` (11 still).
- Q1 hari "Sat" vs 15 Nov 2026 = Minggu · Q2 3 FAIL keseimbangan · Q3 punch lewat panel depan · Q4 label ikon referensi · Q5 menu bar keluar frame saat push 1,04 · Q6 gerak belum dilihat.

## REVIEW Sutradara (buta, still dulu)
Diterima. Q1 → "Sun". Q2 diterima (KESEIMBANGAN di JURI). Q3–Q5 diterima. Q6 → draft gerak 835–1047 (r7b).

## r7b
"Sun Nov 15" (MAC_DAY); draft gerak 835–1047 dilihat Sutradara: pembukaan jendela ±0,2 dtk dari dock, punch ber-motion-blur.

## r7c (koreksi Irfan: "harusnya camera yang zoom in bukan textbar yang membesar")
Panel prompt lapis depan dihapus; punch = kamera 1,03 → 3,8 (7 f / 6 f ease-out) ke kotak prompt di dalam jendela, push ke 3,95/4,0; teks prompt 22 px desain (statis); glyph 6,5 % tinggi. Cap logo di dalam jendela. Kursor B13b ikut UI, sembunyi saat mengetik.

## r7d (framing)
Tata letak keadaan kosong ChatGPT varian lama (judul di tengah area utama, kotak prompt di bawah jendela; `GPTD_PROMPT.y` 600, `GPTD_HEAD_Y` 270), supaya saat punch judul keluar frame utuh dan kotak di tengah tinggi frame; "+" x 10,8–11,8 %; glyph 6,5–6,7 %. balance: FAIL 1 (04 transisi), PERIKSA 3 (punch berat bawah). tsc 0, cekkata 0. Draft `qc/r7d_draft_835-1047.mp4`, lembar `qc/r7d_motion_sheet.jpg`.

## REVIEW Sutradara r7c/r7d (lembar gerak dilihat dulu)
r7c: punch via kamera diterima; judul terpotong di tengah kata → r7d. r7d: diterima; tata letak kotak-di-bawah = UI ChatGPT nyata (keadaan kosong versi lama), bukan elemen yang membesar.

## Audio (Sutradara) untuk r7
Cue B12–B13 ditata ulang ke event baru (frame nyata): klik dock 28,333 (Cutcontrastransision −12), jendela buka 28,88 (pop up −14), punch "investasi" 30,12 (Woosh −11), cap 31,263 tetap, punch B13b 33,25 (Woosh −9), ketik 33,45 (1,2 dtk), kirim 34,784, mosaik 34,83. Dibuang: Pergantianfoto 2,767 (file sama < 1 dtk) dan marker 35,603 (rentetan 6/2 dtk). 49 cue, 0,59/dtk. sfx_density PASS (ref 0,65), pause_clean PASS, cut_check PASS, mix −14,8 LUFS, puncak −1,4 dBFS.
