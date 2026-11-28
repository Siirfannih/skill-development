# Hasil uji tools v2

Dijalankan 25 Nov 2026 di PC `node-c-pc` (8 core, ffmpeg 6.1.1, `~/work/mg-venv`) dengan:
```
cd ~/work/soalnya-gini-studio/v2
SKILLDEV=~/work/soalnya-gini-studio/_uji/skilldev-snap bash uji/jalankan_uji.sh
```
`_uji/skilldev-snap` = salinan baca-saja `claude/motion-graphic/scripts` dari skill-development Mac commit `5e9d781` (PC masih `42a94a51` dan belum punya `delivery_probe.py`/`loudness_2pass.sh`; README §1.2). Semua data sintetis (`ffmpeg -f lavfi`) kecuali T4 (suara manusia `edubizz-2.mp4`), T5 (10 naskah plan), dan T10 (keluaran Gemini Voice Design yang sudah ada di `vo-uji/`, dibuat 25 Nov; uji ini tidak memanggil API). Tidak ada API berbayar. Log per uji: `hasil/*.log`; keluaran lengkap: `hasil-run.txt`.

**Ringkasan: 50 dari 50 uji keluar dengan kode yang diharapkan** (putaran akhir; putaran sebelumnya menemukan 4 hal yang mengubah tools atau rancangan, dicatat di bawah).

| Uji | Yang dibuktikan | Hasil |
|---|---|---|
| T1a–d slop-grep | naskah plan Hari 1 lolos; teks kotor ("simak sampai habis", "!!", "dijamin aman", `[TBD]`) gagal; kode kotor tertangkap 9 jenis (radial-gradient, glow `0 0 24px`, backdropFilter, `#7E84E4`, scale dari 0, `fade` transisi, `Math.random`, emoji ⚡, `wood_knock_01.wav`); kode bersih lolos | ✅ |
| T1e | `v1/kit/design-tokens.ts` sendiri gagal (warna periwinkle `#6E74DC`; peringatan JetBrains Mono) | ✅ |
| T2a | VO pelan −49,9 LUFS → −16,0 LUFS, gain linear +34 dB, voice_level PASS | ✅ |
| T2b | sumber keras −11,9 LUFS, `--sumber tts`: tidak diturunkan (gain 0), PASS | ✅ |
| T2b2 | sumber yang sama, `--sumber rekaman`: **HPF 70 Hz menaikkan true peak −2,0 → 0,0 dBTP** → voice_level FAIL klip. Temuan ini membuat `--sumber tts` tanpa HPF | ✅ (gagal yang diharapkan) |
| T2c/d | VO berpuncak (klik): gain dibatasi headroom (+2,8 dB), FAIL pelan; dengan `--terima-pelan "<alasan>"` PASS dan alasan + angka dicetak | ✅ |
| T2e | **rantai v1** `highpass=80,loudnorm=I=-14:TP=-1:LRA=7` pada sumber −11,9 LUFS → −14,0: voice_level FAIL "turun −2,1 dB" | ✅ |
| T2f | rantai v1 pada sumber pelan −49,9 LUFS → PASS. Jadi masalah v1 muncul saat sumber lebih keras dari −14 LUFS (diturunkan) atau saat loudnorm jatuh ke mode dinamis; pada sumber pelan sintetis ini tidak terdeteksi | ✅ (dicatat jujur) |
| T3a | MP4 dengan perintah encode `delivery-spec.md` → `delivery_probe.py` 6/6 PASS (mix dinaikkan dengan `loudness_2pass.sh --mix-akhir`: −44,0 → −15,0 LUFS, `normalization_type=linear`) | ✅ |
| T3b | MP4 cara v1 (x264 default + AAC tanpa tag) → FAIL warna (unset ×4), faststart (`mdat` sebelum `moov`), loudness −44 LUFS. v1 `run_qc.sh` akan mencetak angka ini lalu lanjut (`|| true`) | ✅ |
| T3c | `sg_qc.sh` episode sintetis on-brand: G1–G6 LULUS (G0 dilewati dengan `--tanpa-ledger`) | ✅ |
| T3d | `sg_qc.sh` tanpa `qc/jobs.jsonl` (render tidak lewat `render.sh`) → G0 GAGAL | ✅ |
| T3e | video pelangi `testsrc2` → G2, G4 (palette_check), G6 GAGAL; golden: 48,7 % piksel vivid di luar palet, tepi 4,6× golden | ✅ |
| T3f/g | 15 keyframe kosong → KOSONG; gaya B tanpa golden disetujui (entri `disetujui: null` diabaikan) → TANPA-GOLDEN | ✅ |
| T4a | `words_align.py` model medium pada suara manusia 37 kata: cakupan **91,9 %**, selisih hanya salah dengar ("foton"→"photon", "dihasilin"→"dihasilkan"), PASS ambang 85 % | ✅ |
| T4b | model small + ambang v1 95 % → 75,7 %, FAIL: ambang v1 tidak realistis untuk suara Indonesia berisi istilah | ✅ |
| T4c | naskah yang salah → FAIL | ✅ |
| T4d/e | `--shotlist`: KT "silikon", "listrik" tertangkap → PASS; KT "foton" (didengar "photon") → FAIL dengan nama beat | ✅ |
| T5a | 10 naskah plan saling dibandingkan: kemiripan 3-gram tertinggi **0,004**; semua lolos ambang 0,12 | ✅ |
| T5b | naskah Hari 1 dengan 5 kata diganti → kemiripan 0,81 dan pembuka 0,78 → FAIL | ✅ |
| T5c | cap "Kalau…" tiga kali berturut → FAIL ROTASI | ✅ |
| T6a | tabel shot list plan Hari 1 dikonversi apa adanya → FAIL. Yang nyata dari plan: beat 37–44 (7 dtk), 44–50 dan 50–56 (6 dtk) > 5 dtk; tidak ada perubahan visual tercatat selama 3–7 dtk (> 2,2); satu keluarga transisi (push) berturut-turut; teks layar 4–5 kata ("Yang rugi: pembeli di ujung", "Di dekatmu sebelahan juga?"; "dekatmu" tidak diucapkan, VO "di dekat rumahmu"). Kegagalan "KT tidak diucapkan" lain di log muncul karena konversi tidak punya VO per baris (plan tidak memecah VO per baris) | ✅ |
| T6b–e | `kit/contoh/sg001.shotlist.json` (naskah plan Hari 1 utuh, 15 beat, 8 tipe transisi, jarak perubahan maks 2,0 dtk) lolos cek, label, storyboard, dan jsonschema | ✅ |
| T6f | maskot tanpa `fungsi` → FAIL KRK-01 | ✅ |
| T7a–c | `tema_cek.py` skill-development LULUS atas `kit/tema.ts`; file adegan dengan `#7E84E4`/`Oswald`/`fontSize: 40` → GAGAL; `motion_lint.py` bersih | ✅ |
| T8a–g | antrean: keluar review tanpa Irfan ditolak; lompat tahap ditolak; render didahulukan; render menunggu saat kunci dipegang proses lain; stop-the-line saat review > batas; `siap_unggah → tayang` oleh mesin ditolak | ✅ |
| T9a–c | `tts_gemini.py` (Voice Design) tanpa `--izin-biaya`: hanya mencetak suara terpilih + body (kunci tidak dibaca), tidak membuat WAV; sg001 → sg-perempuan, sg002 → sg-laki | ✅ |
| T10 loudness mentah | 6 berkas Gemini: I −18,3…−20,6 LUFS, LRA 2,5–4,8, **TP −0,7…−4,9 dBTP** (`hasil/T10_loudness_mentah.log`) | data |
| T10a | `ab-sg-perempuan-lisan.wav` −20,6 → −16,8 LUFS (gain +3,8 dB dibatasi headroom), voice_level PASS | ✅ |
| T10b | `ab-sg-laki-lisan.wav`: −19,1 LUFS tetapi puncak −0,7 dBFS. Tidak bisa dinaikkan (tanpa headroom) dan tidak boleh diturunkan → voice_level FAIL "pelan + klip". Kebijakan induk tidak punya jalan untuk take TTS yang pelan tapi berpuncak panas (K-07, USULAN U-03) | ✅ (gagal yang diharapkan) |
| T10c/d | `words_align.py` medium pada keluaran Gemini (naskah lisan 55 kata): cakupan 94,5 % (perempuan) dan 90,9 % (laki); selisih: "saingan"→"sayangan" (salah ucap TTS atau salah dengar ASR: perlu didengar), "kilometer"→"km", "tetep/dapet"→baku | ✅ |

## Temuan saat uji yang mengubah tools
1. HPF menaikkan true peak sumber keras (T2b2) → `vo_master.sh --sumber tts` tanpa HPF.
2. Cakupan ASR 95 % (v1) gagal pada suara manusia bersih (75,7 % small, 91,9 % medium) → ambang 85 % + cek kata KT.
4. Take Gemini sg-laki berpuncak −0,7 dBFS pada −19,1 LUFS (T10b) → keputusan K-07 dan usulan U-03; `vo_master.sh` tidak diberi jalan pintas.
3. `faster-whisper` di mg-venv tidak bisa membuka file langsung (PyAV: `open() got an unexpected keyword argument 'metadata_errors'`) → audio di-decode ffmpeg lalu diberikan sebagai array.

## Batas uji
- Video sintetis T3 nyaris statis (ekspresi `t` di `drawbox` tidak menggerakkan kotak pada ffmpeg 6.1.1; lihat `bukti/sanding_ep_baik.jpg`), jadi metrik golden (luma, kepadatan tepi) baru teruji arah kasar, belum terkalibrasi pada frame Remotion nyata.
- `sg_qc.sh` G0 dan `render.sh` tidak diuji dengan render Remotion nyata (belum ada episode).
- `profil_cek.py` atas `merek/soalnya-gini`: GAGAL 2 butir (logo terang/gelap belum ada, K-03). Font OFL sudah ada.
- Uji RAM render memakai komposisi bench `Berat` (90 frame 1080p), bukan komposisi Soalnya Gini.
