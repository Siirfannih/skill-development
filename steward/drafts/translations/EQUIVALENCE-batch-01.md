# Translation Equivalence · Batch 01

Second-model verification against `origin/main` (`0c4e4aa9`). One section per file.

## `claude/script-workshop/guide/produk/PEMBANDING.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Perbandingan aplikasi kasir/POS (dicek 7 Nov 2026) untuk narasi "beda" yang jujur tanpa menyebut kekurangan pesaing yang belum dicek. | POS apps comparison (checked 7 Nov 2026) for an honest "different" narrative without stating unverified competitor shortcomings. | yes |
| Comparison table (4 rows) | Status klaim Qasir gratis (Benar + sumber InfoKomputer), POS tidak bisa di HP (Salah untuk Qasir), fitur stok Qasir (Benar), dan prediksi stok otomatis Olsera/Moka/Pawoon (Belum terverifikasi). | Claim statuses for Qasir free (True + InfoKomputer source), POS not working on phones (False for Qasir), Qasir stock features (True), and Olsera/Moka/Pawoon automatic stock prediction (Unverified). | yes |
| `## Sudut beda yang jujur` | 3 sudut pembeda jujur (bukan aplikasi kasir/chat WA untuk yang tanpa toko, satu tempat data tersebar per cabang, stok dihitung forecast+saran belanja) dan larangan menyerang merek pesaing di konten lane Jadisatu. | 3 honest differentiation angles (not a POS app/WA chat for storefront-less sellers, one place for scattered data per branch, stock calculated with forecast+purchase suggestions) and ban on attacking competitor brands in Jadisatu lane content. | yes |

## `claude/script-workshop/guide/produk/FAKTA.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & source | Fakta produk Jadisatu yang boleh diklaim, bersumber dari kata pemilik + repo `jadisatu-partner`; cari dulu sebelum tanya, tanpa menebak, tambah fakta baru bertanggal. | Claimable Jadisatu product facts from my words + `jadisatu-partner`; search first before asking, no guessing, add dated new facts. | yes |
| `## Jadisatu` | Dua produk (Canvas global, Workspace UMKM Indonesia) + layanan jadisatucreative; situs payung jadisatu.cloud. | Two products (Canvas global, Workspace Indonesian MSMEs) + jadisatucreative services; umbrella site jadisatu.cloud. | yes |
| `## Workspace` | 13 butir fakta fitur, model gratis/berbayar, catat WA (`PARSER-M3.md`), Greatstock, laporan WA, MCP, multi-cabang, ringkasan penjualan, stok (tanpa musim/promo), akuntansi (`STATUS.md`), live sejak 5 Nov 2026. | 13 factual points on features, free/paid model, WA logging (`PARSER-M3.md`), Greatstock, WA reports, MCP, multi-branch, sales summary, inventory (no seasonality/promos), accounting (`STATUS.md`), live since 5 Nov 2026. | yes |
| `## Paket agensi / bundling` | Isi bundling, pembeda utama (`COPY-v2.md`), gratis untuk klien sosmed (`OFFER.md`), arahan 7 Nov soal landing + refund belum tertulis syaratnya. | Bundle contents, main differentiator (`COPY-v2.md`), free for social media clients (`OFFER.md`), 7 Nov note on landing + unwritten refund terms. | yes |
| `## Harga` | Harga ada di `OFFER.md` dan berubah-ubah; jangan tulis harga di konten tanpa konfirmasi di sesi. | Pricing lives in `OFFER.md` and changes; do not put prices in content without session confirmation. | yes |
| `## Bukti & klaim` | Bukti harus kasus nyata (bukan simulasi/demo); belum ada klien/penjualan (Nov 2026) sehingga dilarang menulis testimoni, jumlah pengguna, atau hasil pelanggan. | Proof must be real cases (never simulated/demo); no clients/sales yet (Nov 2026), so no testimonials, user counts, or customer results. | yes |

## `claude/cinedance-block-library/PROMPT-BLOCKING.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Struktur prompt video-generation (Gemini Omni, Veo, Seedance) dari PDF 18 Nov 2026; mencatat struktur bukan isi untuk prompt orang berbicara (terutama avatar pemilik & dialog non-Inggris). | Video-generation prompt structure (Gemini Omni, Veo, Seedance) from 18 Nov 2026 PDF; records structure not content for speaking-person prompts (especially my avatar & non-English dialogue). | yes |
| `## 1. Kenapa blocking bekerja` | 5 alasan efektivitas blocking: bagian bernomor satu urusan, LOCK di atas, timeline per detik, dialog ditulis dua kali dengan timestamp, prioritas berperingkat di akhir. | 5 reasons blocking works: numbered one-concern sections, top LOCKs, per-second timeline, dialogue written twice with timestamps, ranked priorities at the end. | yes |
| `## 2. Struktur (urutan dipertahankan)` | Tabel 9 baris (Header 0 + bagian 01–08) berisi isi dan catatan tiap blok prompt. | 9-row table (Header 0 + sections 01–08) detailing contents and notes for each prompt block. | yes |
| `## 3. Cara memakainya untuk Gemini Omni (pelajaran kita)` | 8 aturan praktik Omni: 1 generate = 1 shot untuk B-roll potongan, dialog kata demi kata + angka dieja ("seratus persen"), pakai avatar resmi, set-only untuk B-roll tanpa teks (uji 18 Nov), lock suara/bahasa id-ID, kecocokan timestamp ≥3 dtk, 8–15 larangan visual, urutan 5 prioritas. | 8 Omni usage rules: 1 gen = 1 shot for cut B-roll, word-for-word dialogue + spelled numbers ("seratus persen"), official avatar only, set-only for text-free B-roll (18 Nov test), id-ID voice/language lock, matching timestamps ≥3 s, 8–15 visual prohibitions, 5-item priority order. | yes |
| `## 4. Template (isi bagian bertanda < >)` | Template blok prompt lengkap dari header hingga 08 FINAL PRODUCTION PRIORITIES tanpa mengubah struktur blok atau kunci mesin. | Complete prompt block template from header through 08 FINAL PRODUCTION PRIORITIES preserving block structure and engine keys. | yes |
| `## 5. Contoh terisi` | Rujukan contoh terisi di `EDITING-GUIDELINE` Drive `Claude edit/Siap edit/2026-11-18 — Video Perkenalan Irfan/` (§6 prompt Omni). | Reference to filled example in Drive `EDITING-GUIDELINE` at `Claude edit/Siap edit/2026-11-18 — Video Perkenalan Irfan/` (§6 Omni prompts). | yes |

## `claude/jadisatu-canvas/references/clients.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & Contents | Koneksi klien MCP diverifikasi 28 Oktober 2026 beserta daftar isi 9 bagian. | MCP client connections verified 28 October 2026 with 9-item table of contents. | yes |
| `## 1. Batas bersama` | Endpoint Streamable HTTP `https://canvas.jadisatu.cloud/mcp`, OAuth DCR+PKCE atau `JADISATU_CANVAS_TOKEN`, potongan digabung (bukan menimpa), web != CLI/API. | Streamable HTTP endpoint `https://canvas.jadisatu.cloud/mcp`, OAuth DCR+PKCE or `JADISATU_CANVAS_TOKEN`, snippets merged (not overwritten), web != CLI/API. | yes |
| `## 2. ChatGPT dan Claude web · OAuth` | Langkah OAuth + DCR per web klien, larangan client secret rekaan, tidak ada Metadata Documents. | OAuth + DCR steps per web client, ban on made-up client secrets, no Metadata Documents advertised. | yes |
| `## 3. Codex · bearer environment atau OAuth` | Konfigurasi TOML bearer token atau perintah CLI OAuth `dcr` beserta sumbernya. | TOML bearer token config or CLI OAuth `dcr` commands with sources. | yes |
| `## 4. Claude Code · .mcp.json` | Konfigurasi `.mcp.json` HTTP + ekspansi `${VAR}`, opsi OAuth tanpa header statis. | `.mcp.json` HTTP config + `${VAR}` expansion, OAuth option without static header. | yes |
| `## 5. Gemini CLI · .gemini/settings.json` | Konfigurasi `httpUrl` Streamable HTTP, `/mcp auth`, catatan ekspansi `env` dan bridge §9. | `httpUrl` Streamable HTTP config, `/mcp auth`, `env` expansion note and bridge §9. | yes |
| `## 6. Cursor · .cursor/mcp.json` | Konfigurasi `.cursor/mcp.json` dengan `${env:NAME}` atau OAuth tanpa client secret buatan. | `.cursor/mcp.json` config with `${env:NAME}` or OAuth without invented client secret. | yes |
| `## 7. VS Code / Copilot · pilih format yang sesuai` | Format VS Code (`servers`) vs format Copilot (`.mcp.json` `mcpServers`), larangan mencampur keduanya. | VS Code format (`servers`) vs Copilot format (`.mcp.json` `mcpServers`), ban on mixing them. | yes |
| `## 8. xAI / Grok API · remote MCP` | Contoh Python Responses API read-only, perbedaan SDK native, catatan dukungan Grok web. | Read-only Python Responses API example, native SDK differences, Grok web support note. | yes |
| `## 9. Bridge stdio dan verifikasi` | Menjalankan `server/bridge.mjs` via `JADISATU_CANVAS_DIR` (Node ≥22.13), contoh Codex & Gemini, urutan verifikasi `tools/list` → `read_board` → `read_image`. | Running `server/bridge.mjs` via `JADISATU_CANVAS_DIR` (Node ≥22.13), Codex & Gemini examples, verification order `tools/list` → `read_board` → `read_image`. | yes |

## `claude/motion-graphic/templates/cut-sheet.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Tabel tunggal timeline cut sheet & mapping visual per video yang diisi Sutradara setelah fase 1b; subagen hanya membaca baris kerjanya + butir Wajib. | Single timeline cut sheet & visual mapping table filled by Director after phase 1b; subagents read only their assigned rows + Mandatory items. | yes |
| How to fill (5 bullets) | Aturan baris per kalimat/potongan, waktu dari `CUT-MAP` & `transkrip-hasil.md`, penanda `<` / `>`, deskripsi visual & aset, kolom opsional, paragraf musik/SFX. | Rules for one row per sentence/cut, times from `CUT-MAP` & `transkrip-hasil.md`, `<` / `>` markers, visuals & assets, optional columns, music/SFX paragraph. | yes |
| Table, footer & status | Contoh baris tabel 6 kolom, template arah musik & SFX, dan status progres (`rencana` → `still lulus` → `audit lulus`). | 6-column table example, music & SFX direction template, and row progress status (`rencana` → `still lulus` → `audit lulus`). | yes |

## `claude/motion-graphic/templates/roles/konsul.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Catatan tambahan opsional (maks setengah halaman) di `handoff/KONSUL.md` untuk `tanya-claude.sh`; bukan tempat arah video karena dirakit dari LANTAI/RESEP/DECISIONS/STATUS. | Optional supplementary notes (half page max) at `handoff/KONSUL.md` for `tanya-claude.sh`; not for video direction, which is assembled from LANTAI/RESEP/DECISIONS/STATUS. | yes |
| `## Yang sudah dicoba dan gagal` | Daftar percobaan yang gagal dan rondenya agar tidak diusulkan ulang. | List of failed attempts and rounds so they are not proposed again. | yes |
| `## Batasan teknis yang perlu diketahui penilai` | Catatan batasan teknis sumber (mis. 720p, plate AI 24 fps). | Notes on source technical constraints (e.g., 720p, 24 fps AI plate). | yes |

## `claude/motion-graphic/templates/roles/handoff.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Kerangka folder `handoff/` untuk disalin ke proyek sesuai `references/roles.md` §4–5. | `handoff/` folder scaffold to copy into projects per `references/roles.md` §4–5. | yes |
| `## BRIEF.md (Sutradara)` | Template brief Sutradara (brief pemilik apa adanya, terkunci, butir Lantai, aset+lisensi, larangan). | Director brief template (my verbatim brief, locked items, Floor items, assets+licenses, bans). | yes |
| `## PLAN.json (Sutradara)` | Contoh JSON beat per adegan dengan kunci schema `beats.json` + sfx dan `lulus_bila`. | Per-beat JSON example keeping `beats.json` schema keys + sfx and `lulus_bila`. | yes |
| `## TASK-rN.md (Sutradara)` | Template tugas pekerja (cakupan, bacaan izin, keluaran wajib, perbaikan, larangan ubah, selesai bila). | Builder task template (scope, allowed reads, required outputs, fixes, frozen beats, done criteria). | yes |
| `## REPORT-rN.md (Editor)` | Template laporan pekerja (tabel beat+bukti+gate, keluaran gate, pertanyaan terbuka). | Builder report template (beat+evidence+gate table, gate output, open questions). | yes |
| `## REVIEW-rN.md (Sutradara)` | Template review Sutradara yang ditulis setelah melihat still/render sebelum membaca REPORT. | Director review template written after viewing stills/renders before reading REPORT. | yes |
| `## QUESTIONS.md & DECISIONS.md` | Format satu baris tanya-jawab antara pekerja dan Sutradara/pemilik. | One-line Q&A format between builder and Director/me. | yes |

## `claude/motion-graphic/references/kamera-gerak.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Panduan kamera/gerak/transisi untuk langkah 5-6 `SKILL.md` (ringkasan B10-B13b dari `LANTAI.md`, NEGATIF 10, `motion_lint.py`). | Camera/motion/transition guide for `SKILL.md` steps 5-6 (condensed B10-B13b from `LANTAI.md`, NEGATIF 10, `motion_lint.py`). | yes |
| `## Frame hidup (B10, B11, B12)` | Shot >2 dtk bergerak (kecuali kiblat diam di `RESEP.md`), 1 objek fokus per beat patuh ucapan, elemen diam dan kamera yang bergerak. | Shots >2 s move (unless north-star card is static in `RESEP.md`), 1 focus object per beat obeying speech, elements stay still while camera moves. | yes |
| `## Transisi (B13)` | Tanpa crossfade polos, pengecualian micro-blend ≤4 f & blur-to-sharp, pemilihan mekanik dari hubungan ruang, 1 khas + ≥4 tipe/30 dtk (`SceneChain`). | No plain crossfades, micro-blend ≤4 f & blur-to-sharp exceptions, mechanics from spatial relation, 1 signature + ≥4 types/30 s (`SceneChain`). | yes |
| `## Gerak dirancang per gerak (B13a)` | Pilihan kurva `curves.ts`, durasi dari jarak/bobot (`dur`) + reaksi `react(i)`, gerak keluar 0,65×, hold >1 dtk hidup, tanpa fade-up/blur-in bawaan. | `curves.ts` curve choices, distance/weight duration + `react(i)` stagger, 0.65× exits, alive holds >1 s, no default fade-up/blur-in. | yes |
| `## Format berulang (B13b)` | Format berulang wajib beda framing tiap kemunculan agar tidak terbaca sebagai template. | Recurring formats vary framing on each appearance so they do not read like templates. | yes |

## `claude/motion-graphic/references/hybrid-motion-standard.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Standar minimum Hybrid Motion dari `GrokAgent/reference-videos/`; angka/aturan dapat berubah sesuai kondisi proyek dengan alasan tertulis. | Hybrid Motion minimum standard from `GrokAgent/reference-videos/`; numbers/rules may adapt to project conditions with a recorded reason. | yes |
| `## System role & objective` | Peran sebagai Motion Director & Sound Designer untuk evaluasi naskah dan desain cue memakai parameter di bawah. | Role as Motion Director & Sound Designer evaluating scripts and designing cues using the parameters below. | yes |
| `## Kinetic typography & visual` | Ekstraksi 1–3 anchor words (bahasa ikut audio), extreme bezier tanpa fade malas, masking/tracking kedalaman, posterize time 8–12 fps selektif. | Extract 1–3 anchor words (language follows audio), extreme bezier without lazy fades, depth masking/tracking, selective 8–12 fps posterize time. | yes |
| `## Kamera & ritme editing` | Kamera virtual agresif (snap zoom, whip pan, match-cut spasial) dan potong tersinkron ke ketukan BGM/puncak SFX. | Aggressive virtual camera (snap zoom, whip pan, spatial match-cut) and cuts synced to BGM beats/SFX peaks. | yes |
| `## Tekstur & styling` | Halftone/paper texture bila diminta referensi tanpa film grain di atas gradien (K2), dan depth-of-field selektif. | Halftone/paper texture when requested without film grain over gradients (K2), plus selective depth of field. | yes |
| `## Audio` | Bagian audio lama dicabut karena bertentangan dengan palet/mix yang lulus; audio mengikuti `audio.md` (§14.A, §14.5/§14.8, §14.10). | Older audio section withdrawn due to conflicts with passing palette/mix; audio follows `audio.md` (§14.A, §14.5/§14.8, §14.10). | yes |
| `## Catatan penerapan` | Aturan lain pemilik tetap berlaku (tanpa ear-fatigue 2–6 kHz, SFX tidak mendahului objek, E24, pustaka SFX, tanpa flash putih penutup frame). | My other rules still apply (no 2–6 kHz ear-fatigue, SFX never precedes object, E24, library SFX, no frame-covering white flash). | yes |

## `claude/motion-graphic/references/warna.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Gerbang warna pindah dari `dunia-visual.md` §9 agar <15 KB, menggunakan CLI `scripts/warna/cek-warna.mjs`; kata warna brief bukan nilai, harus terukur. | Colour gate moved from `dunia-visual.md` §9 to stay under 15 KB, using `scripts/warna/cek-warna.mjs`; brief colour words are not values, must be measured. | yes |
| Masuk (Entry) | Perintah `masuk` menghasilkan `palet.json` (4-5 HEX, luas %, peran, luminansi, WCAG, APCA Lc) + flag `--ke-spec` dan `--ke-tema`. | `masuk` command outputs `palet.json` (4-5 HEX, area %, role, luminance, WCAG, APCA Lc) + `--ke-spec` and `--ke-tema` flags. | yes |
| Keluar (Exit) + 3 checks | Perintah `keluar` menjalankan 3 cek (`warna-nyasar`, `kontras-apca`, `warna-nanggung`), render ganda teks (`data-lapis="teks"`, `sembunyikanTeks`), pengecualian `data-sengaja="pudar"`/blur/tertutup, serta integrasi `gerbang_produksi.sh`/`board.py`. | `keluar` command runs 3 checks (`warna-nyasar`, `kontras-apca`, `warna-nanggung`), dual text render (`data-lapis="teks"`, `sembunyikanTeks`), `data-sengaja="pudar"`/blur/occluded exemptions, and `gerbang_produksi.sh`/`board.py` integration. | yes |

## `claude/motion-graphic/references/efek-3d.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Referensi mandiri efek & 3D (bukan gerbang wajib); angka berlabel usulan vs hasil uji repo/dokumen resmi (dicek 25 Nov 2026). | Standalone effects & 3D reference (not a mandatory gate); proposed numbers vs repo tests/official docs (checked 25 Nov 2026). | yes |
| `## 1. CSS 2,5D, @remotion/three, atau Blender` | Default CSS 2,5D; 4 syarat 3D, tabel pemilihan renderer + biaya SwiftShader/Cycles, aturan `useCurrentFrame()` & tanya pemilik bila > 30 mnt. | Default CSS 2.5D; 4 conditions for 3D, renderer choice table + SwiftShader/Cycles cost, `useCurrentFrame()` rule & ask owner if > 30 min. | yes |
| `## 2. Matriks determinisme` | Tabel mekanisme aman/tidak aman/dilarang (`useFrame`, GSAP, bloom/glow K2, DoF, TAA, fisika, Cycles, `<CameraMotionBlur>`). | Table of safe/unsafe/forbidden mechanisms (`useFrame`, GSAP, K2 bloom/glow, DoF, TAA, physics, Cycles, `<CameraMotionBlur>`). | yes |
| `## 3. Filter SVG deterministik` | Filter `#tex` dan `#riak` berbasis `frame` tanpa paket luar, biaya bench 0,4-0,6 dtk/frame, catatan `grade.md`. | Frame-driven `#tex` and `#riak` filters without extra packages, 0.4-0.6 s/frame bench cost, `grade.md` note. | yes |
| `## 4. Catatan mesin` | Fallback SwiftShader bila akun belum masuk grup `render`/`video`, larangan `usermod`/`sudo`, hindari `swangle`, cek `blender --version`. | SwiftShader fallback when account lacks `render`/`video` groups, no `usermod`/`sudo`, avoid `swangle`, check `blender --version`. | yes |
