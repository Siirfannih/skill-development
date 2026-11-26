# Translation Equivalence · Batch 01

Second-model verification against `origin/main` (`0c4e4aa9`). One section per file.

Rows marked `(review)` record the result of the EQ review (`EQ-group1/2/3.md`) and the fix round; the original row above each one is kept unchanged. `equal (declined finding)` = a review finding the owner declined (examples of how the owner phrases feedback or a brief are translated, `migration.md` rule 7).

## `claude/script-workshop/guide/produk/PEMBANDING.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Perbandingan aplikasi kasir/POS (dicek 7 Nov 2026) untuk narasi "beda" yang jujur tanpa menyebut kekurangan pesaing yang belum dicek. | POS apps comparison (checked 7 Nov 2026) for an honest "different" narrative without stating unverified competitor shortcomings. | yes |
| Title & intro (review) | see row above | see row above | shifted: "beda" (angle name in Indonesian scripts) translated as "different"; fixed in 1912363e |
| Comparison table (4 rows) | Status klaim Qasir gratis (Benar + sumber InfoKomputer), POS tidak bisa di HP (Salah untuk Qasir), fitur stok Qasir (Benar), dan prediksi stok otomatis Olsera/Moka/Pawoon (Belum terverifikasi). | Claim statuses for Qasir free (True + InfoKomputer source), POS not working on phones (False for Qasir), Qasir stock features (True), and Olsera/Moka/Pawoon automatic stock prediction (Unverified). | yes |
| `## Sudut beda yang jujur` | 3 sudut pembeda jujur (bukan aplikasi kasir/chat WA untuk yang tanpa toko, satu tempat data tersebar per cabang, stok dihitung forecast+saran belanja) dan larangan menyerang merek pesaing di konten lane Jadisatu. | 3 honest differentiation angles (not a POS app/WA chat for storefront-less sellers, one place for scattered data per branch, stock calculated with forecast+purchase suggestions) and ban on attacking competitor brands in Jadisatu lane content. | yes |

## `claude/script-workshop/guide/produk/FAKTA.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & source | Fakta produk Jadisatu yang boleh diklaim, bersumber dari kata pemilik + repo `jadisatu-partner`; cari dulu sebelum tanya, tanpa menebak, tambah fakta baru bertanggal. | Claimable Jadisatu product facts from my words + `jadisatu-partner`; search first before asking, no guessing, add dated new facts. | yes |
| `## Jadisatu` | Dua produk (Canvas global, Workspace UMKM Indonesia) + layanan jadisatucreative; situs payung jadisatu.cloud. | Two products (Canvas global, Workspace Indonesian MSMEs) + jadisatucreative services; umbrella site jadisatu.cloud. | yes |
| `## Workspace` | 13 butir fakta fitur, model gratis/berbayar, catat WA (`PARSER-M3.md`), Greatstock, laporan WA, MCP, multi-cabang, ringkasan penjualan, stok (tanpa musim/promo), akuntansi (`STATUS.md`), live sejak 5 Nov 2026. | 13 factual points on features, free/paid model, WA logging (`PARSER-M3.md`), Greatstock, WA reports, MCP, multi-branch, sales summary, inventory (no seasonality/promos), accounting (`STATUS.md`), live since 5 Nov 2026. | yes |
| `## Workspace` (review) | see row above | see row above | shifted: bare "owner" for the business owner (collides with the repo owner); banned claim "tahu musim ramai" translated; fixed in c4c22576 |
| `## Paket agensi / bundling` | Isi bundling, pembeda utama (`COPY-v2.md`), gratis untuk klien sosmed (`OFFER.md`), arahan 7 Nov soal landing + refund belum tertulis syaratnya. | Bundle contents, main differentiator (`COPY-v2.md`), free for social media clients (`OFFER.md`), 7 Nov note on landing + unwritten refund terms. | yes |
| `## Paket agensi / bundling` (review) | see row above | see row above | shifted: live tagline "Konten yang dipilih dari data penjualanmu, bukan dari tebakan." translated (must stay Indonesian); "sampai video TikTok" read as a cap ("up to"); OFFER.md quote; "entry door"; refund-terms instruction loosened; fixed in c4c22576 |
| `## Harga` | Harga ada di `OFFER.md` dan berubah-ubah; jangan tulis harga di konten tanpa konfirmasi di sesi. | Pricing lives in `OFFER.md` and changes; do not put prices in content without session confirmation. | yes |
| `## Bukti & klaim` | Bukti harus kasus nyata (bukan simulasi/demo); belum ada klien/penjualan (Nov 2026) sehingga dilarang menulis testimoni, jumlah pengguna, atau hasil pelanggan. | Proof must be real cases (never simulated/demo); no clients/sales yet (Nov 2026), so no testimonials, user counts, or customer results. | yes |

## `claude/cinedance-block-library/PROMPT-BLOCKING.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Struktur prompt video-generation (Gemini Omni, Veo, Seedance) dari PDF 18 Nov 2026; mencatat struktur bukan isi untuk prompt orang berbicara (terutama avatar pemilik & dialog non-Inggris). | Video-generation prompt structure (Gemini Omni, Veo, Seedance) from 18 Nov 2026 PDF; records structure not content for speaking-person prompts (especially my avatar & non-English dialogue). | yes |
| `## 1. Kenapa blocking bekerja` | 5 alasan efektivitas blocking: bagian bernomor satu urusan, LOCK di atas, timeline per detik, dialog ditulis dua kali dengan timestamp, prioritas berperingkat di akhir. | 5 reasons blocking works: numbered one-concern sections, top LOCKs, per-second timeline, dialogue written twice with timestamps, ranked priorities at the end. | yes |
| `## 1. Kenapa blocking bekerja` (review) | see row above | see row above | equal (declined finding): the quoted earlier feedback is illustration and stays translated (migration.md rule 7); Indonesian gloss added in eb36f387 was reverted in 589ff8ab |
| `## 2. Struktur (urutan dipertahankan)` | Tabel 9 baris (Header 0 + bagian 01–08) berisi isi dan catatan tiap blok prompt. | 9-row table (Header 0 + sections 01–08) detailing contents and notes for each prompt block. | yes |
| `## 2. Struktur (urutan dipertahankan)` (review) | see row above | see row above | shifted: "larangan" rendered as both "ban" and "prohibition"; "lip sync salah" as "bad lip sync"; fixed in eb36f387 |
| `## 3. Cara memakainya untuk Gemini Omni (pelajaran kita)` | 8 aturan praktik Omni: 1 generate = 1 shot untuk B-roll potongan, dialog kata demi kata + angka dieja ("seratus persen"), pakai avatar resmi, set-only untuk B-roll tanpa teks (uji 18 Nov), lock suara/bahasa id-ID, kecocokan timestamp ≥3 dtk, 8–15 larangan visual, urutan 5 prioritas. | 8 Omni usage rules: 1 gen = 1 shot for cut B-roll, word-for-word dialogue + spelled numbers ("seratus persen"), official avatar only, set-only for text-free B-roll (18 Nov test), id-ID voice/language lock, matching timestamps ≥3 s, 8–15 visual prohibitions, 5-item priority order. | yes |
| `## 4. Template (isi bagian bertanda < >)` | Template blok prompt lengkap dari header hingga 08 FINAL PRODUCTION PRIORITIES tanpa mengubah struktur blok atau kunci mesin. | Complete prompt block template from header through 08 FINAL PRODUCTION PRIORITIES preserving block structure and engine keys. | yes |
| `## 5. Contoh terisi` | Rujukan contoh terisi di `EDITING-GUIDELINE` Drive `Claude edit/Siap edit/2026-11-18 — Video Perkenalan Irfan/` (§6 prompt Omni). | Reference to filled example in Drive `EDITING-GUIDELINE` at `Claude edit/Siap edit/2026-11-18 — Video Perkenalan Irfan/` (§6 Omni prompts). | yes |

## `claude/jadisatu-canvas/references/clients.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & Contents | Koneksi klien MCP diverifikasi 28 Oktober 2026 beserta daftar isi 9 bagian. | MCP client connections verified 28 October 2026 with 9-item table of contents. | yes |
| `## 1. Batas bersama` | Endpoint Streamable HTTP `https://canvas.jadisatu.cloud/mcp`, OAuth DCR+PKCE atau `JADISATU_CANVAS_TOKEN`, potongan digabung (bukan menimpa), web != CLI/API. | Streamable HTTP endpoint `https://canvas.jadisatu.cloud/mcp`, OAuth DCR+PKCE or `JADISATU_CANVAS_TOKEN`, snippets merged (not overwritten), web != CLI/API. | yes |
| `## 1. Batas bersama` (review) | see row above | see row above | shifted: "tidak disamakan" (instruction) rendered as a statement; fixed in e0681bd0 |
| `## 2. ChatGPT dan Claude web · OAuth` | Langkah OAuth + DCR per web klien, larangan client secret rekaan, tidak ada Metadata Documents. | OAuth + DCR steps per web client, ban on made-up client secrets, no Metadata Documents advertised. | yes |
| `## 3. Codex · bearer environment atau OAuth` | Konfigurasi TOML bearer token atau perintah CLI OAuth `dcr` beserta sumbernya. | TOML bearer token config or CLI OAuth `dcr` commands with sources. | yes |
| `## 4. Claude Code · .mcp.json` | Konfigurasi `.mcp.json` HTTP + ekspansi `${VAR}`, opsi OAuth tanpa header statis. | `.mcp.json` HTTP config + `${VAR}` expansion, OAuth option without static header. | yes |
| `## 5. Gemini CLI · .gemini/settings.json` | Konfigurasi `httpUrl` Streamable HTTP, `/mcp auth`, catatan ekspansi `env` dan bridge §9. | `httpUrl` Streamable HTTP config, `/mcp auth`, `env` expansion note and bridge §9. | yes |
| `## 6. Cursor · .cursor/mcp.json` | Konfigurasi `.cursor/mcp.json` dengan `${env:NAME}` atau OAuth tanpa client secret buatan. | `.cursor/mcp.json` config with `${env:NAME}` or OAuth without invented client secret. | yes |
| `## 6. Cursor · .cursor/mcp.json` (review) | see row above | see row above | shifted: "jangan membuat client secret" (create none) rendered as "do not invent"; fixed in e0681bd0 |
| `## 7. VS Code / Copilot · pilih format yang sesuai` | Format VS Code (`servers`) vs format Copilot (`.mcp.json` `mcpServers`), larangan mencampur keduanya. | VS Code format (`servers`) vs Copilot format (`.mcp.json` `mcpServers`), ban on mixing them. | yes |
| `## 8. xAI / Grok API · remote MCP` | Contoh Python Responses API read-only, perbedaan SDK native, catatan dukungan Grok web. | Read-only Python Responses API example, native SDK differences, Grok web support note. | yes |
| `## 8. xAI / Grok API · remote MCP` (review) | see row above | see row above | shifted: "membatasi tool baca" rendered as "restricts read tools" (reads as read tools blocked); fixed in e0681bd0 |
| `## 9. Bridge stdio dan verifikasi` | Menjalankan `server/bridge.mjs` via `JADISATU_CANVAS_DIR` (Node ≥22.13), contoh Codex & Gemini, urutan verifikasi `tools/list` → `read_board` → `read_image`. | Running `server/bridge.mjs` via `JADISATU_CANVAS_DIR` (Node ≥22.13), Codex & Gemini examples, verification order `tools/list` → `read_board` → `read_image`. | yes |

## `claude/motion-graphic/templates/cut-sheet.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Tabel tunggal timeline cut sheet & mapping visual per video yang diisi Sutradara setelah fase 1b; subagen hanya membaca baris kerjanya + butir Wajib. | Single timeline cut sheet & visual mapping table filled by Director after phase 1b; subagents read only their assigned rows + Mandatory items. | yes |
| Title & intro (review) | see row above | see row above | shifted: project label `Wajib` translated as "Mandatory" (no longer matches project guidelines); "subagent's" for several subagents; fixed in b902aea2 |
| How to fill (5 bullets) | Aturan baris per kalimat/potongan, waktu dari `CUT-MAP` & `transkrip-hasil.md`, penanda `<` / `>`, deskripsi visual & aset, kolom opsional, paragraf musik/SFX. | Rules for one row per sentence/cut, times from `CUT-MAP` & `transkrip-hasil.md`, `<` / `>` markers, visuals & assets, optional columns, music/SFX paragraph. | yes |
| Table, footer & status | Contoh baris tabel 6 kolom, template arah musik & SFX, dan status progres (`rencana` → `still lulus` → `audit lulus`). | 6-column table example, music & SFX direction template, and row progress status (`rencana` → `still lulus` → `audit lulus`). | yes |

## `claude/motion-graphic/templates/roles/konsul.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Catatan tambahan opsional (maks setengah halaman) di `handoff/KONSUL.md` untuk `tanya-claude.sh`; bukan tempat arah video karena dirakit dari LANTAI/RESEP/DECISIONS/STATUS. | Optional supplementary notes (half page max) at `handoff/KONSUL.md` for `tanya-claude.sh`; not for video direction, which is assembled from LANTAI/RESEP/DECISIONS/STATUS. | yes |
| Title & intro (review) | see row above | see row above | shifted: `Aktif` rows (matched by `tools/tanya-claude.sh:48`) written as "Active rows"; fixed in b218bbe4 |
| `## Yang sudah dicoba dan gagal` | Daftar percobaan yang gagal dan rondenya agar tidak diusulkan ulang. | List of failed attempts and rounds so they are not proposed again. | yes |
| `## Batasan teknis yang perlu diketahui penilai` | Catatan batasan teknis sumber (mis. 720p, plate AI 24 fps). | Notes on source technical constraints (e.g., 720p, 24 fps AI plate). | yes |

## `claude/motion-graphic/templates/roles/handoff.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Kerangka folder `handoff/` untuk disalin ke proyek sesuai `references/roles.md` §4–5. | `handoff/` folder scaffold to copy into projects per `references/roles.md` §4–5. | yes |
| Title & intro (review) | see row above | see row above | shifted: "kerangka" now "skeleton" per glossary decision; fixed in 86553df6 |
| `## BRIEF.md (Sutradara)` | Template brief Sutradara (brief pemilik apa adanya, terkunci, butir Lantai, aset+lisensi, larangan). | Director brief template (my verbatim brief, locked items, Floor items, assets+licenses, bans). | yes |
| `## BRIEF.md (Sutradara)` (review) | see row above | see row above | shifted: "Brief Irfan" heading rendered "My Brief" in a file the Director writes; fixed in 26d5d3c4 |
| `## PLAN.json (Sutradara)` | Contoh JSON beat per adegan dengan kunci schema `beats.json` + sfx dan `lulus_bila`. | Per-beat JSON example keeping `beats.json` schema keys + sfx and `lulus_bila`. | yes |
| `## TASK-rN.md (Sutradara)` | Template tugas pekerja (cakupan, bacaan izin, keluaran wajib, perbaikan, larangan ubah, selesai bila). | Builder task template (scope, allowed reads, required outputs, fixes, frozen beats, done criteria). | yes |
| `## TASK-rN.md (Sutradara)` (review) | see row above | see row above | shifted: scope instruction "beat lain tidak disentuh" rendered as a description; fixed in 26d5d3c4 |
| `## REPORT-rN.md (Editor)` | Template laporan pekerja (tabel beat+bukti+gate, keluaran gate, pertanyaan terbuka). | Builder report template (beat+evidence+gate table, gate output, open questions). | yes |
| `## REVIEW-rN.md (Sutradara)` | Template review Sutradara yang ditulis setelah melihat still/render sebelum membaca REPORT. | Director review template written after viewing stills/renders before reading REPORT. | yes |
| `## REVIEW-rN.md (Sutradara)` (review) | see row above | see row above | shifted: status `LOLOS` rendered "PASS" (reads as nothing to fix); fixed in 26d5d3c4, value form `LOLOS (keep)` / `BUANG (drop)` in 0ff4b420 |
| `## QUESTIONS.md & DECISIONS.md` | Format satu baris tanya-jawab antara pekerja dan Sutradara/pemilik. | One-line Q&A format between builder and Director/me. | yes |
| `## QUESTIONS.md & DECISIONS.md` (review) | see row above | see row above | shifted: "Director/me" in a file the builder fills; fixed in 26d5d3c4 |

## `claude/motion-graphic/references/kamera-gerak.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Panduan kamera/gerak/transisi untuk langkah 5-6 `SKILL.md` (ringkasan B10-B13b dari `LANTAI.md`, NEGATIF 10, `motion_lint.py`). | Camera/motion/transition guide for `SKILL.md` steps 5-6 (condensed B10-B13b from `LANTAI.md`, NEGATIF 10, `motion_lint.py`). | yes |
| Title & intro (review) | see row above | see row above | shifted (low): "langkah 5-6 alur SKILL.md" lost "workflow"; fixed in 6ca78608 |
| `## Frame hidup (B10, B11, B12)` | Shot >2 dtk bergerak (kecuali kiblat diam di `RESEP.md`), 1 objek fokus per beat patuh ucapan, elemen diam dan kamera yang bergerak. | Shots >2 s move (unless north-star card is static in `RESEP.md`), 1 focus object per beat obeying speech, elements stay still while camera moves. | yes |
| `## Transisi (B13)` | Tanpa crossfade polos, pengecualian micro-blend ≤4 f & blur-to-sharp, pemilihan mekanik dari hubungan ruang, 1 khas + ≥4 tipe/30 dtk (`SceneChain`). | No plain crossfades, micro-blend ≤4 f & blur-to-sharp exceptions, mechanics from spatial relation, 1 signature + ≥4 types/30 s (`SceneChain`). | yes |
| `## Gerak dirancang per gerak (B13a)` | Pilihan kurva `curves.ts`, durasi dari jarak/bobot (`dur`) + reaksi `react(i)`, gerak keluar 0,65×, hold >1 dtk hidup, tanpa fade-up/blur-in bawaan. | `curves.ts` curve choices, distance/weight duration + `react(i)` stagger, 0.65× exits, alive holds >1 s, no default fade-up/blur-in. | yes |
| `## Gerak dirancang per gerak (B13a)` (review) | see row above | see row above | shifted (low): "makin cepat" (accelerates) rendered "faster"; fixed in 6ca78608 |
| `## Format berulang (B13b)` | Format berulang wajib beda framing tiap kemunculan agar tidak terbaca sebagai template. | Recurring formats vary framing on each appearance so they do not read like templates. | yes |

## `claude/motion-graphic/references/hybrid-motion-standard.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Standar minimum Hybrid Motion dari `GrokAgent/reference-videos/`; angka/aturan dapat berubah sesuai kondisi proyek dengan alasan tertulis. | Hybrid Motion minimum standard from `GrokAgent/reference-videos/`; numbers/rules may adapt to project conditions with a recorded reason. | yes |
| `## System role & objective` | Peran sebagai Motion Director & Sound Designer untuk evaluasi naskah dan desain cue memakai parameter di bawah. | Role as Motion Director & Sound Designer evaluating scripts and designing cues using the parameters below. | yes |
| `## Kinetic typography & visual` | Ekstraksi 1–3 anchor words (bahasa ikut audio), extreme bezier tanpa fade malas, masking/tracking kedalaman, posterize time 8–12 fps selektif. | Extract 1–3 anchor words (language follows audio), extreme bezier without lazy fades, depth masking/tracking, selective 8–12 fps posterize time. | yes |
| `## Kinetic typography & visual` (review) | see row above | see row above | shifted: "Bahasa anchor ikut audio" rendered "Anchor language" (reads as style/register); fixed in 599d43c3 |
| `## Kamera & ritme editing` | Kamera virtual agresif (snap zoom, whip pan, match-cut spasial) dan potong tersinkron ke ketukan BGM/puncak SFX. | Aggressive virtual camera (snap zoom, whip pan, spatial match-cut) and cuts synced to BGM beats/SFX peaks. | yes |
| `## Tekstur & styling` | Halftone/paper texture bila diminta referensi tanpa film grain di atas gradien (K2), dan depth-of-field selektif. | Halftone/paper texture when requested without film grain over gradients (K2), plus selective depth of field. | yes |
| `## Audio` | Bagian audio lama dicabut karena bertentangan dengan palet/mix yang lulus; audio mengikuti `audio.md` (§14.A, §14.5/§14.8, §14.10). | Older audio section withdrawn due to conflicts with passing palette/mix; audio follows `audio.md` (§14.A, §14.5/§14.8, §14.10). | yes |
| `## Audio` (review) | see row above | see row above | shifted (low): "older" added; fixed in 599d43c3 |
| `## Catatan penerapan` | Aturan lain pemilik tetap berlaku (tanpa ear-fatigue 2–6 kHz, SFX tidak mendahului objek, E24, pustaka SFX, tanpa flash putih penutup frame). | My other rules still apply (no 2–6 kHz ear-fatigue, SFX never precedes object, E24, library SFX, no frame-covering white flash). | yes |

## `claude/motion-graphic/references/warna.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Gerbang warna pindah dari `dunia-visual.md` §9 agar <15 KB, menggunakan CLI `scripts/warna/cek-warna.mjs`; kata warna brief bukan nilai, harus terukur. | Colour gate moved from `dunia-visual.md` §9 to stay under 15 KB, using `scripts/warna/cek-warna.mjs`; brief colour words are not values, must be measured. | yes |
| Title & intro (review) | see row above | see row above | equal (declined finding): "biru lembut" is an example of brief wording and stays translated ("soft blue") |
| Masuk (Entry) | Perintah `masuk` menghasilkan `palet.json` (4-5 HEX, luas %, peran, luminansi, WCAG, APCA Lc) + flag `--ke-spec` dan `--ke-tema`. | `masuk` command outputs `palet.json` (4-5 HEX, area %, role, luminance, WCAG, APCA Lc) + `--ke-spec` and `--ke-tema` flags. | yes |
| Keluar (Exit) + 3 checks | Perintah `keluar` menjalankan 3 cek (`warna-nyasar`, `kontras-apca`, `warna-nanggung`), render ganda teks (`data-lapis="teks"`, `sembunyikanTeks`), pengecualian `data-sengaja="pudar"`/blur/tertutup, serta integrasi `gerbang_produksi.sh`/`board.py`. | `keluar` command runs 3 checks (`warna-nyasar`, `kontras-apca`, `warna-nanggung`), dual text render (`data-lapis="teks"`, `sembunyikanTeks`), `data-sengaja="pudar"`/blur/occluded exemptions, and `gerbang_produksi.sh`/`board.py` integration. | yes |
| Keluar (Exit) + 3 checks (review) | see row above | see row above | shifted (low): "(warna teks/latar blok)" wording; fixed in 0abe9258 |

## `claude/motion-graphic/references/efek-3d.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Referensi mandiri efek & 3D (bukan gerbang wajib); angka berlabel usulan vs hasil uji repo/dokumen resmi (dicek 25 Nov 2026). | Standalone effects & 3D reference (not a mandatory gate); proposed numbers vs repo tests/official docs (checked 25 Nov 2026). | yes |
| Title & intro (review) | see row above | see row above | equal (declined finding): title "resep" stays "recipes" (same word as the source; "snippets" narrows it) |
| `## 1. CSS 2,5D, @remotion/three, atau Blender` | Default CSS 2,5D; 4 syarat 3D, tabel pemilihan renderer + biaya SwiftShader/Cycles, aturan `useCurrentFrame()` & tanya pemilik bila > 30 mnt. | Default CSS 2.5D; 4 conditions for 3D, renderer choice table + SwiftShader/Cycles cost, `useCurrentFrame()` rule & ask owner if > 30 min. | yes |
| `## 1. CSS 2,5D, @remotion/three, atau Blender` (review) | see row above | see row above | shifted: "tanya pemilik" rendered "ask the owner" in owner-voiced text; fixed in ce76dae7 |
| `## 2. Matriks determinisme` | Tabel mekanisme aman/tidak aman/dilarang (`useFrame`, GSAP, bloom/glow K2, DoF, TAA, fisika, Cycles, `<CameraMotionBlur>`). | Table of safe/unsafe/forbidden mechanisms (`useFrame`, GSAP, K2 bloom/glow, DoF, TAA, physics, Cycles, `<CameraMotionBlur>`). | yes |
| `## 2. Matriks determinisme` (review) | see row above | see row above | shifted: "aman bila berfungsi" rendered "safe when working" (reads as bug-free); fixed in ce76dae7 |
| `## 3. Filter SVG deterministik` | Filter `#tex` dan `#riak` berbasis `frame` tanpa paket luar, biaya bench 0,4-0,6 dtk/frame, catatan `grade.md`. | Frame-driven `#tex` and `#riak` filters without extra packages, 0.4-0.6 s/frame bench cost, `grade.md` note. | yes |
| `## 4. Catatan mesin` | Fallback SwiftShader bila akun belum masuk grup `render`/`video`, larangan `usermod`/`sudo`, hindari `swangle`, cek `blender --version`. | SwiftShader fallback when account lacks `render`/`video` groups, no `usermod`/`sudo`, avoid `swangle`, check `blender --version`. | yes |

## `claude/motion-graphic/references/revisi.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Revisi = diff satu ronde untuk langkah 8 `SKILL.md` (F27 pindah ke sini; rincian tetap di `revision-log.md` §0). | Revision = one-round diff for `SKILL.md` step 8 (F27 moved here; round details remain in `revision-log.md` §0). | yes |
| Title & intro (review) | see row above | see row above | shifted (low): "alur" (workflow) dropped; fixed in 3738fcc3 |
| `## Aturan` | 5 aturan: 1 ronde sekaligus, adegan disetujui tak disentuh (`revisi_cek.py cek`), storyboard juga diff, rakit per rentang (`compose.py --rentang`), `qc/revisi.json` untuk proyek pra-aturan baru. | 5 rules: 1 round at once, approved scenes untouched (`revisi_cek.py cek`), storyboard also a diff, assemble by range (`compose.py --rentang`), `qc/revisi.json` for pre-new-rule videos. | yes |
| `## Aturan` (review) | see row above | see row above | shifted: "basis" (approved base version in qc/revisi.json) rendered "baseline" (glossary term for the RED run); fixed in 3738fcc3. Feedback quote "Terlalu polos, improve lagi": equal (declined finding) |
| `## Arah revisi: ke tengah, bukan ke ekstrem lain` | 4 langkah ukur tengah lewat `banding.py --sebelum` pada 3-5 frame wakil (geser 30-60%, metrik lain tidak memburuk, `DECISIONS.md`, frame jarang ≤ 10%). | 4 steps to shift toward the middle via `banding.py --sebelum` on 3-5 rep frames (30-60% step, other metrics preserved, `DECISIONS.md`, sparse frames <= 10%). | yes |
| `## Arah revisi: ke tengah, bukan ke ekstrem lain` (review) | see row above | see row above | shifted: DECISIONS.md labels translated (no longer match the "tutup" column printed by banding.py); "flat" added; fixed in 3738fcc3. Feedback quotes "terlalu berat/ramai/lebih lega/lebih besar": equal (declined finding) |
| `## Setelah revisi, tetap berlaku` | NEGATIF dan hukum besi `SKILL.md` tetap berlaku: lihat frame berubah di resolusi penuh (`lihat.py`). | NEGATIF and `SKILL.md` iron law still apply: view changed frames at full resolution (`lihat.py`). | yes |

## `claude/motion-graphic/references/decision.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & Contents | Panduan memilih, memutuskan, dan kapan bertanya beserta daftar isi 7 bagian. | Guide for choosing, deciding, and when to ask, with 7-item table of contents. | yes |
| `## 1. Siapa memutuskan apa` | Pembagian kewenangan pemilik vs agen dalam tabel 5 baris + aturan kerja sampai tuntas tanpa menyerahkan versi setengah jadi. | Authority split between me and agent in 5-row table + finish end-to-end without sending half-finished versions. | yes |
| `## 1. Siapa memutuskan apa` (review) | see row above | see row above | shifted (low): "penyimpangan" rendered "deviations" (glossary reserves it for REF-SPEC); fixed in 0cd8b63a |
| `## 2. Urutan prioritas saat aturan bertabrakan` | 5 tingkat prioritas saat aturan bertabrakan (arahan pemilik → SKILL.md → cerita → mutu → variasi) tanpa menurunkan mutu. | 5-level rule collision priority (my direction → SKILL.md → story → quality → variety) without lowering execution quality. | yes |
| `## 3. Memilih family visual` | Pemilihan family A/B/C per babak (`direction.md` §5) dengan transisi bab dan engsel senyap (`audio.md` §14.4). | Choosing family A/B/C per act (`direction.md` §5) with act transition and silent hinge (`audio.md` §14.4). | yes |
| `## 3. Memilih family visual` (review) | see row above | see row above | shifted (low): "babak" rendered "story act"; fixed in 0cd8b63a (glossary: act) |
| `## 4. Memilih teknik per momen` | Pemetaan peran R1–R6 ke teknik T/C, aturan object carry X01 (`camera-transition.md` §10), alasan satu frasa di spec beat. | Role R1–R6 mapping to T/C techniques, X01 object carry rule (`camera-transition.md` §10), one-phrase reason in beat spec. | yes |
| `## 5. Membawa pengalaman, bukan template` | Apa yang boleh dibawa (gerbang, cara ukur, QA, alat) vs tidak boleh dibawa (palet, font, aset proyek lain kecuali diminta). | What carries over (gates, measurement, QA, tools) vs what does not (palettes, fonts, other projects' assets unless asked). | yes |
| `## 5. Membawa pengalaman, bukan template` (review) | see row above | see row above | shifted (low): "log kesalahan" rendered "failure logs"; fixed in 0cd8b63a |
| `## 6. Biaya dan kredit` | Larangan generate berbayar sebelum gerbang script/storyboard final, perkiraan biaya, 1–2 variasi per potong (`MOTION-CORE.md` §1). | Ban on paid generation before final script/storyboard gates, cost estimate, 1–2 variations per segment (`MOTION-CORE.md` §1). | yes |
| `## 6. Biaya dan kredit` (review) | see row above | see row above | shifted: "kunci suara" (VO stage of `audio_order.py lock suara`) rendered "audio lock", contradicting the SFX/music half; fixed in 0cd8b63a |
| `## 7. Kapan bertanya` | Maks 3 pertanyaan awal dalam 1 pesan setelah cek repo, larangan menebak (core rule 13), dan tabel tindakan 5 situasi. | Max 3 upfront questions in 1 message after checking repo, no guessing (core rule 13), and 5-situation action table. | yes |
| `## 7. Kapan bertanya` (review) | see row above | see row above | shifted (low): added "(Indonesian, keep as-is …)" annotation; fixed in 0cd8b63a |

## `claude/motion-graphic/references/copywriting.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & Contents | Panduan copywriting VO dan teks layar di tahap Naskah beserta daftar isi 6 bagian. | Copywriting guide for VO scripts and on-screen text at Script stage with 6-item TOC. | yes |
| `## 1. Nilai copy Irfan` | Nilai copy (optimis pada produk, realistis eksekusi, fokus manfaat, gaya Apple/Clicky, standar storyteller 10+ tahun). | Copy values (optimistic on product, realistic in execution, benefit-focused, Apple/Clicky style, 10+ yr storyteller standard). | yes |
| `## 1. Nilai copy Irfan` (review) | see row above | see row above | shifted (low): "kalimat" rendered "line"; fixed in 299e17c5 |
| `## 2. Merapikan draft Irfan` | Mempertajam kata tanpa menghilangkan ide draft pemilik, catatan perubahan, dan devil's advocate `working-with-irfan` §2a. | Sharpen wording without dropping ideas from my draft, include change note, pass `working-with-irfan` §2a devil's advocate. | yes |
| `## 2. Merapikan draft Irfan` (review) | see row above | see row above | shifted: "bukan menulis ulang" softened to "not rewrite from scratch"; annotations added inside examples; fixed in 299e17c5 |
| `## 3. Uji per kalimat` | 6 uji kalimat (gambar bukan label, ritme, baca keras, rasa dulu baru nama, larangan pola AI, jujur) dengan contoh Indonesia utuh. | 6 sentence tests (picture not label, rhythm, read aloud, feel before name, banned AI patterns, honest) preserving Indonesian samples. | yes |
| `## 3. Uji per kalimat` (review) | see row above | see row above | shifted: banned-pattern bullet added an English-cliché clause and English banned words (rule additions); "uji" rendered "check"; annotations added; fixed in 299e17c5 |
| `## 4. Uji per naskah` | Benang merah, sudut jernih saat pola jenuh, CTA lanjutan cerita, perkiraan durasi (2,5–3 kata/dtk ID; 139 kata/mnt EN). | Single thread, clear angle in saturated patterns, story-continuation CTA, word-count duration estimates (2.5–3 wps ID; 139 wpm EN). | yes |
| `## 4. Uji per naskah` (review) | see row above | see row above | shifted (low): "benang merah" rendered "thread"; fixed in 299e17c5 |
| `## 5. Teks layar` & `5b` | Teks layar hanya dari `voiceover.full_text`, 2–6 kata/1–3 dtk, sentence case/KAPITAL, 1 kata aksen, tanda baca konsisten, tanpa subtitle statis, filter `antislop-copywriting`. | On-screen text from `voiceover.full_text` only, 2–6 words/1–3 s, sentence case/ALL CAPS, 1 accent word, consistent punctuation, no static subtitles, `antislop-copywriting` filter. | yes |
| `## 5. Teks layar` & `5b` (review) | see row above | see row above | shifted (low): "exact" added; annotations added; "teks kinetik" rendered "kinetic typography"; fixed in 299e17c5 |
| `## 6. Menyerahkan script` | Tampilkan draft di chat sampai pemilik bilang final baru simpan file; cek akhir §3, ide utuh, klaim berdasar. | Show draft in chat until I say final then save file; final check on §3, preserved ideas, grounded claims. | yes |
| `## 6. Menyerahkan script` (review) | see row above | see row above | shifted (low): "kalimat" rendered "line"; fixed in 299e17c5 |

## `claude/motion-graphic/references/motion-mechanics.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title, intro & table | Mekanik gerak kamera/transisi/cutout bersama `camera-transition.md` (30 fps dari referensi disetujui) dan tabel 7 hubungan adegan A→B. | Motion mechanics with `camera-transition.md` (30 fps from approved references) and 7-row scene A→B relationship table. | yes |
| Title, intro & table (review) | see row above | see row above | shifted (low): table rows 2 and 7 wording; fixed in f6324c97 |
| 6 mechanics (`Push-through`..`Flash montage`) | Cara kerja, angka awal, dan cek untuk Push-through, Pull-back reveal, Whip, Depth fly-through, Orbit gather, dan Flash montage. | How it works, starting numbers, and checks for Push-through, Pull-back reveal, Whip, Depth fly-through, Orbit gather, and Flash montage. | yes |
| `Hold`, `Gradual text`, `Cutout`, `Camera follows meaning` | Hold dengan drift 1-3%, teks bertahap + tint aksen 4-6 f, cutout subjek ke palet / belakang subjek >=70%, kamera ikut makna. | Hold with 1-3% drift, gradual text + 4-6 f accent tint, subject cutout to palette / behind subject >=70%, camera follows meaning. | yes |
| `Hold`, `Gradual text`, `Cutout`, `Camera follows meaning` (review) | see row above | see row above | shifted: ">= 70 % hurufnya" (letters) rendered "by letter area"; "benar-benar diam" rendered "dead"; fixed in f6324c97 |
| `## Timing helper (scripts/remotion/timing.ts)` | API `timeline()`, `stagger()`, `dampTrack()`, `vanWijk()` beserta contoh kode TypeScript dan 5 batasannya. | API for `timeline()`, `stagger()`, `dampTrack()`, `vanWijk()` with TypeScript examples and 5 limitations. | yes |
| `## Timing helper (scripts/remotion/timing.ts)` (review) | see row above | see row above | shifted (low): call restriction wording; fixed in f6324c97 |

## `claude/motion-graphic/references/slop-catalog.md`

| Section | Indonesian meaning (one line) | English meaning (one line) | Equal? |
|---|---|---|---|
| Title & intro | Katalog tanda slop untuk dipindai di Storyboard dan Mix→Deliver (bukan melarang teknik; 1 tanda dengan alasan boleh, banyak tanda tanpa alasan = AI). | Slop sign catalog to scan at Storyboard and Mix→Deliver (not banning techniques; 1 sign with reason allowed, many without reason = AI). | yes |
| Title & intro (review) | see row above | see row above | shifted (low): label KEBIJAKAN v2 not searchable; new-sign sentence; fixed in 85ec24b2 |
| `## Audio` (12 rows) | 12 ID tanda audio `S-A1` s.d. `S-A12` beserta cara cek dan rujukan Lantai/audio.md persis. | All 12 audio signs `S-A1` through `S-A12` with exact check methods and Lantai/audio.md references. | yes |
| `## Audio` (12 rows) (review) | see row above | see row above | shifted (low): S-A1 "tipis udaranya" rendered "thin air" (idiom), S-A3 wording; fixed in 85ec24b2 and 91575b60 |
| `## Teks` (15 rows) | 15 ID tanda teks `S-T1` s.d. `S-T15` termasuk contoh kata `"GRAY"` dan `raw *clip*, the *difference*, *craft*`. | All 15 text signs `S-T1` through `S-T15` including `"GRAY"` and `raw *clip*, the *difference*, *craft*` examples. | yes |
| `## Teks` (15 rows) (review) | see row above | see row above | shifted: S-T3 size rendered as casing (flags the allowed fix as slop); S-T7, S-T12, S-T15 ("may carry no meaning" weakens the ban); fixed in 85ec24b2 |
| `## Visual dan gerak` (33 rows) | 33 ID tanda visual & gerak `S-V1` s.d. `S-V33` beserta cara cek, ambang, dan rujukan Lantai/NEGATIF persis. | All 33 visual & motion signs `S-V1` through `S-V33` with exact check methods, thresholds, and Lantai/NEGATIF references. | yes |
| `## Visual dan gerak` (33 rows) (review) | see row above | see row above | shifted: S-V16 "buatan sendiri" rendered "hand-drawn" (narrower); S-V29 "rep frames"; fixed in 85ec24b2 and 91575b60. S-V24 and S-V29 examples: equal (declined finding) |

## `claude/brief-gate/SKILL.md` (Second-model check of Claude draft)

| Section | Indonesian meaning (`origin/main`) | English meaning (Claude draft) | Equal? |
|---|---|---|---|
| Frontmatter `description` | Gerbang wajib sebelum dispatch ke subagen/worker/model lain: cek kalimat asli Irfan, baca dingin, metrik, pilot. | Mandatory gate before dispatching to subagent/worker/other model; adds "Use when you are about to dispatch work to another agent:" trigger clause and "Irfan" -> "my". | yes (minor trigger/voice alignment per writing.md §4 & §6) |
| `## 1. Kenapa skill ini ada` | Kegagalan paling mahal = brief salah dieksekusi setia (contoh kasus sintesis video menjadi adegan utuh); gerbang memaksa kembali ke kalimat asli pemilik. | Most expensive mistake = wrong brief executed faithfully (reference synthesis case); gate forces return to owner's original words. | yes |
| `## 2. Kapan wajib` | Sebelum setiap subagen/prompt/resend pasca-feedback; skala Ringan (3.1+3.3) vs Berat (semua termasuk pilot 3.5); cek internal, bukan meminta izin. | Before every subagent/prompt/post-feedback resend; Light (3.1+3.3) vs Heavy (all incl. 3.5 pilot); internal check, not asking permission. | yes |
| `## 3.1`–`3.6` (`Langkah gerbang`) | Ambil kalimat asli + Yang dipindahkan + Bukan; rantai 4 link & bahaya metrik; baca dingin; 8 pola gagal; pilot sebelum fan-out; catatan `GATE` di `STATUS.md`. | Quote original words + What transfers + Not; 4-link goal chain & metric danger; cold-read test; 8 failure patterns; pilot before fan-out; `GATE` note in `STATUS.md` ("kalimat Irfan" -> "owner's words", "yang Irfan mau" -> "what I want"). | yes (voice alignment: Irfan -> I/owner's) |
| `## 4. Kamus kata kerjaku` | Definisi 5 kata kerja kunci (Sintesis/reverse engineering, Preset, Tiru/ikuti referensi, Pelajari, Blank canvas). | Same 5 verb definitions with Indonesian tags preserved in parentheses (`*sintesis*`, `*tiru / ikuti referensi*`, `*pelajari*`). | yes |
| `## 5`–`9` (`Isi wajib`..`Cek cepat`) | 7 isi wajib brief, cara menilai hasil subagen, 5 tanda melewati gerbang, contoh sebelum/sesudah sintesis, 8 checklist cepat. | Same 7 required brief items, result evaluation rules, 5 bypass signs, before/after synthesis example, 8 quick checks ("Irfan" -> "My/I"). | yes |

## `claude/video-reference-deconstructor/SKILL.md` (Second-model check of Claude draft)

| Section | Indonesian meaning (`origin/main`) | English meaning (Claude draft) | Equal? |
|---|---|---|---|
| Frontmatter `description` | Membedah referensi jadi primitif gerak atomik terukur, bebas kulit, lolos uji transfer (`uji transfer`), untuk pabrik; pakai saat bedah/sintesis/reverse-engineer. | Deconstructs reference video into measured atomic motion primitives free of skin passing the `slot-swap test`, for factory; keeps `(bedah, sintesis)` triggers. | yes |
| `## 0`–`1` (`Kenapa skill ini ada`, `Tiga lapisan`) | Mencegah tiru 1:1 lewat 3 uji (atomik, transfer, ukur); 3 yang pindah (mekanik, pemicu, alasan bekerja) vs kulit yang dibuang jadi slot. | Prevents 1:1 cloning via 3 tests (atomic, slot-swap, measurement); 3 transferring parts vs discarded skin turned into slots. | yes |
| `## 2. Uji atomik` | Satu primitif satu mekanik; 4 lapisan + audio sebagai parameter; kombinasi disimpan sebagai **resep** tanpa kode/kulit sendiri. | One primitive one mechanic; 4 layers + audio as parameter; combination saved as **primitive combo** without own code/skin. | shifted (terminology): ID "resep" -> EN "primitive combo" per `glossary.md` to avoid collision with project `RESEP.md` ("recipe") |
| `## 3`–`5` (`Aturan ukur`, `Alur`, `Isi wajib`) | 7 aturan ukur jujur (`measured`/`estimated`, ≤ −80 dBFS `is_silent_stream: true`), 4 tahap alur (`spec.schema.json`), tabel 9 isi wajib & field pabrik. | Same 7 measurement rules (`measured`/`estimated`, ≤ −80 dBFS `is_silent_stream: true`), 4 workflow steps (`spec.schema.json`), 9-row required contents preserving all Indonesian factory keys (`komponen_usulan`, `kategori`, `mekanik`, `kulit`, `transisi`, `visual`, `ringkas`, `catatan`). | yes |
| `## 6`–`8` (`Uji transfer`, `Subagen`, `Sesi editing`) | Uji dengan 2 isian slot berbeda (selisih ≤ 2 frame, kulit tidak bocor, terbaca tanpa kulit), larangan SSIM/kiri-kanan, `brief-gate`, larangan rangkai ulang ≥ 3 primitif. | Slot-swap test with 2 fillings (≤ 2 frames, no skin leak, readable without skin), SSIM/side-by-side ban, `brief-gate`, re-sequencing ban ≥ 3 primitives. | yes |
| `## 9`–`10` (`Contoh`, `Gerbang sebelum menyimpan`) | Contoh terukur `indiavideomotion.mp4` (1276×718, 30 fps, 0.00–1.37 s, `kamera-cut-ke-wadah-lalu-mundur`) + 9 checklist sebelum simpan. | Same measured `indiavideomotion.mp4` example with identical numbers, slots, do-not-steal items, and 9 checklist items. | yes |
