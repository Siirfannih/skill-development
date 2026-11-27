# Render tanpa yatim, lanjutan: SIGKILL node/render.sh, temp bocor, jalur render tanpa penjaga, doctor/sync portabel

Tanggal: 2026-11-27. Cabang `audit/render`. Menutup celah di `steward/changes/2026-11-27-render-tanpa-yatim/bukti-render-guard.md` (butir 1-7) dan temuan audit G:F4-01..04, G:F4-06, G:F4-08, G:F1-02, G:F5-05, Q:F4-01..03, Q:F4-06, Q:F4-08..10, Q:F5-10..12.

## Perubahan (satu commit per kelompok)

| Kelompok | Isi |
|---|---|
| 1 | `render.sh`: sesudah anak render keluar != 0, `sapu` mematikan (TERM, 2 dtk, KILL) hanya proses yang baris perintahnya memuat `$R/node_modules/.remotion/`, `$R/node_modules/@remotion/compositor`, atau TMPDIR job. Tanpa pencocokan nama global. rc 137/143 diberi label di pesan dan ledger. Peringatan sisa dipindah ke sesudah kunci proyek dipegang, menghitung semua proses proyek ini, dan perintah kill yang disarankan dibatasi path `$R`. |
| 2 | `render.sh`: anak dijalankan lewat `setpriv --pdeathsig TERM` bila ada (dicoba dulu dengan `setpriv ... true`), ditambah penjaga latar (`guarda`) yang hidup selama anak jalan: bila render.sh mati keras ia mematikan grup (bila tak ada setpriv), menunggu grup selesai, KILL, menyapu Chrome proyek. Penjaga memegang kunci proyek sampai selesai. |
| 3 | `render.sh`: TMPDIR per job di `qc/.tmp/job.<pid>` (diekspor), dihapus di trap EXIT, oleh penjaga sesudah SIGKILL, dan seluruh `qc/.tmp` dihapus di awal job berikutnya setelah kunci proyek didapat. |
| 4 | `render.sh final`: `revisi_cek.py` dan `audio_order.py check` gagal jadi informasi (`gagal=1`, KETAT=1 menolak). Keluar keras tersisa: tanpa src, tanpa Python audio, folder audio tidak ada, varian audio ambigu/tidak ada. Kepala skrip diperbarui. Ikut diperbaiki: `ls tema.ts` di bawah `pipefail` mematikan `final` diam-diam (rc 2) pada proyek tanpa tema. |
| 5 | `lego/lapisan.py` dan `pabrik/uji.py`: render lewat `jalankan_grup` (sesi sendiri, TMPDIR sendiri, grup dan sisa Chrome bertemplate TMPDIR dimatikan saat habis waktu/error/Ctrl-C). `lapisan.py` punya `--maks` (default 900 dtk, env `LAPISAN_MAKS_DTK`). `pabrik/jalankan.sh` berhenti di butir bila `sintesis.py` gagal. |
| 6 | `tools/tunggu.sh`: `hentikan` menunggu sampai 10 dtk (berhenti begitu grup habis) sebelum KILL; `jalan` menolak menghapus folder job yang grupnya masih hidup. |
| 7 | `tools/doctor.sh`: `--offline`, fetch opsional dan diam, Python dari `$MG_PY` lalu PATH lalu `~/work/mg-venv` (terakhir), `$FONTS_LOKAL`, `--fix` ditulis sebagai pemasang. `tools/sync.sh`: Codex opt-in (`--codex` atau `CODEX=1`), kepala skrip nyata, tanpa `"""` supaya `peta.py` membaca kepalanya. Probe Remotion nyata TIDAK ditambahkan: butuh `node_modules` dan unduhan Chrome (±100 MB), tidak murah; alasannya tertulis di kepala `doctor.sh`. |
| tambahan | `tools/bench-render/bench.sh`: perintah remotion lewat `setsid -w timeout --kill-after=30`. |

## Bukti Chrome nyata (kelompok 1-3)

Proyek uji: `/home/irfan/work/sd-fix-render-proof/proj` (di luar repo): salinan `tools/bench-render/src` + komposisi `Lama` 900 frame, Remotion 4.0.380, `npm ci` di folder itu saja, chrome-headless-shell nyata yang diunduh Remotion. Mode `draft Lama` lewat `render.sh`. Mesin lain (agen lain, sesi pemilik) berjalan bersamaan, jadi semua hitungan dibatasi path proyek.

Perintah (`kill_test.sh`, diletakkan di folder uji, bukan di repo): render.sh dijalankan dengan `setsid`, ditunggu sampai Chrome proyek muncul, dibunuh dengan `kill -KILL` pada (a) proses `node ... remotion render` atau (b) render.sh, lalu setelah 10 dtk dan 25 dtk dihitung:

```
chromes() { ps -eo pid=,args= | awk -v a="$R/node_modules/.remotion/chrome-headless-shell" '$2!="awk" && index($0,a)' | wc -l; }   # setara pgrep -af, tanpa menangkap dirinya
lock()    { ( flock -n 9 && echo FREE || echo HELD ) 9>"$P/qc/.render.lock"; }
procs     = semua proses yang baris perintahnya memuat "$R/" atau "$P/qc/.tmp/"
```

Hasil mentah:

| Kasus | Skrip | Chrome saat dibunuh | Chrome +10 dtk | Chrome +25 dtk | Kunci | Temp `qc/.tmp` | Proses proyek +10 dtk |
|---|---|---|---|---|---|---|---|
| KONTROL: SIGKILL node (3 dtk) | `origin/main` render.sh lama | 4 | **10** | **10** | FREE | (kosong; temp lama ada di /tmp) | 10 |
| a1. SIGKILL node (3 dtk) | baru | 5 | 0 | 0 | FREE | `[]` | 0 |
| a2. SIGKILL node (15 dtk, tengah render frame) | baru | 5 | 0 | 0 | FREE | `[]` | 0 |
| b1. SIGKILL render.sh (3 dtk) | baru, ada setpriv | 5 | 0 | 0 | FREE | `[]` | 0 |
| b2. SIGKILL render.sh (14 dtk) | baru, setpriv diganti tiruan yang gagal (jalur penjaga saja) | 4 | 0 | 0 | FREE | `[]` | 0 |

Cuplikan mentah kasus b1 dan a2 (selengkapnya di `/home/irfan/work/sd-fix-render-proof/ev/final-*.txt`):

```
== case render 17:03:06
before: chrome=0 lock=FREE
chrome up after 3s: chrome=5 render.sh pid=2067806
tmp during: job.2067806
SIGKILL render.sh 2067806
after 10s: chrome=0 lock=FREE tmp=[] project-procs=0
after 25s: chrome=0 lock=FREE tmp=[] project-procs=0

== case node 17:03:40
before: chrome=0 lock=FREE
chrome up after 3s: chrome=5 render.sh pid=2070044
tmp during: job.2070044
SIGKILL node 2070108
after 10s: chrome=0 lock=FREE tmp=[] project-procs=0
ledger last: {"mode":"draft","comp":"Lama","arg":"","mulai":"2026-11-27 17:03:40","antre_dtk":0,"kerja_dtk":16,"rc":137,"commit":"-","host":"node-c-pc","konkurensi":6,"gl":"default","catatan":"rc 137 draft Lama"}
```

Pesan di layar pada kasus node: `rc 137: proses render dimatikan dari luar (SIGKILL/OOM = 137, TERM = 143); sisa Chrome proyek ini sudah disapu. ...`.
Target 0 sisa terpenuhi di semua kasus baru; kontrol dengan skrip lama menunjukkan 10 Chrome bertahan, jadi hasilnya berasal dari perubahan, bukan dari uji yang kebetulan.

Tidak dibuktikan: kasus b (SIGKILL render.sh) tidak menulis baris ledger (trap EXIT tidak jalan pada SIGKILL; tetap begitu). `frames`, `final` dan kunci global tidak diuji dengan Chrome nyata (gerbang final butuh audio/juri proyek; tidak ada render final proyek nyata dijalankan). `lapisan.py` dijalankan satu kali dengan Chrome nyata (1 lapisan 0,2 dtk, rc 0, folder `qc/.tmp-lapisan` kosong, 0 proses sisa); jalur timeout/kill-nya hanya diuji dengan proses tiruan di `test_pabrik.py`.

Catatan jujur: saat membersihkan sisa kasus kontrol saya menjalankan `rm -rf /tmp/react-motion-render*` (glob global, bukan hanya milik uji saya). Itu bisa ikut menghapus direktori temp Remotion agen lain yang sedang jalan; 7 direktori `/tmp/remotion-*-assets*` tersisa tidak disentuh. Tidak ada proses yang dibunuh di luar path proyek uji.

## Tes

- `test_render_guard.py` (34 tes): tambahan sapuan 137 (proses proyek disapu, proses proyek lain tidak), peringatan dibatasi path, TMPDIR per job + sisa lama dihapus, SIGKILL render.sh (anak mati, kunci lepas, temp hilang), `final` dengan audio gagal = informasi / KETAT=1 menolak / folder audio hilang tetap keluar, `hentikan` memberi waktu bersih-bersih, `jalan` tidak menghapus job hidup, `sync.sh` (HOME/CLAUDE_CONFIG_DIR/CODEX_CONFIG_DIR/ENTRY_DIR di temp; Codex opt-in) dan `doctor.sh` (PATH minimal + HOME temp: cabang KURANG jalan, `--offline` tanpa kata fetch).
- `test_pabrik.py`: `jalankan_grup` di `lib.py` dan `lapisan.py` (habis waktu membunuh grup + proses lolos-grup bertemplate TMPDIR, proses lain tetap hidup), `jalankan.sh` berhenti di butir bila sintesis gagal.
- `test_gerbang_produksi.py`: tidak perlu diubah (asersinya tentang `gerbang_produksi.sh` dan `KETAT`, tetap benar).
- Suite penuh (`python -m unittest discover -s claude/motion-graphic/scripts/tests`): `Ran 513 tests in 179.902s` lalu `OK (skipped=9)`.

## Tidak dikerjakan / terbuka

- Semafor global N slot untuk still/draft (backlog 48), kunci proyek untuk `bench.sh`/lapisan.py (47, G:F4-03 bagian kunci), pengujian Chrome nyata untuk `frames`/`final`/`lego` (46), butir 38 selain butir 4.
- `pabrik/lib.py` masih memuat `NODE_BIN` dan `PY` milik satu pengguna (G:F5-10), bukan bagian kelompok ini.
- `PETA.md` basi (`peta.py --check` gagal) sengaja tidak diregenerasi; deskripsi `tools/sync.sh` akan benar sesudah regenerasi.
