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
