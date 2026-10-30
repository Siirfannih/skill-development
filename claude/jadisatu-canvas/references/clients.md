---
status: principle
scope: jadisatu-canvas
how_to_use: "Muat hanya untuk klien yang sedang dipakai."
---

# Koneksi klien · diverifikasi dari sumber resmi 28 Oktober 2026

## Isi

1. Batas bersama
2. ChatGPT dan Claude web
3. Codex
4. Claude Code
5. Gemini CLI
6. Cursor
7. VS Code / Copilot
8. xAI / Grok API
9. Bridge stdio dan verifikasi

## 1. Batas bersama

Endpoint semua contoh: `https://canvas.jadisatu.cloud/mcp`. Pilih **Streamable HTTP**, bukan endpoint SSE yang dikarang. Pemilik menyetujui OAuth DCR + PKCE untuk satu board, atau memasok token satu-board melalui environment `JADISATU_CANVAS_TOKEN`. Proses klien harus menerima environment itu; terminal lain atau host lokal tidak otomatis mengirimkannya ke GUI, container atau host remote.

Contoh adalah potongan untuk **digabungkan** ke konfigurasi yang ada, bukan perintah menimpa berkas. Jangan menjalankannya sebagai pemasangan otomatis. Tidak ada token, akun atau koneksi baru dibuat oleh dokumentasi ini. Pemeriksaan sumber/skema bukan uji login nyata pada semua UI. Gemini web dan Grok web tidak disamakan dengan CLI/API mereka.

## 2. ChatGPT dan Claude web · OAuth

**ChatGPT:** tambahkan custom MCP server/plugin dengan URL di atas, pilih OAuth dan DCR bila pilihan registrasi ditampilkan, lalu selesaikan login pemilik serta persetujuan board/izin. Pasang/aktifkan plugin pada percakapan. Ketersediaan mengikuti akun dan aturan workspace. Jangan mengisi client secret rekaan atau menganggap ChatGPT membaca konfigurasi Codex lokal. Sumber: [custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server), [kontrak autentikasi OpenAI](https://developers.openai.com/plugins/build/auth).

**Claude web:** buka pengaturan custom connector, masukkan URL tersebut, pilih sign-in dan **Register automatically** untuk DCR, lalu login ke Canvas dan pilih board/izin. Aktifkan konektor pada percakapan. Server ini tidak mengiklankan Client ID Metadata Documents, sehingga published identity bukan pengganti DCR. Koneksi Claude yang sudah mengarah ke board lain tidak otomatis memperoleh room baru. Sumber: [custom connectors resmi Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

## 3. Codex · bearer environment atau OAuth

Gabungkan ke konfigurasi MCP Codex yang dipilih pemilik:

```toml
[mcp_servers.jadisatu_canvas]
url = "https://canvas.jadisatu.cloud/mcp"
bearer_token_env_var = "JADISATU_CANVAS_TOKEN"
```

Alternatif OAuth memakai endpoint tanpa `bearer_token_env_var`. Setelah pemilik memilih penyiapan CLI, perintah yang didokumentasikan adalah:

```sh
codex mcp add jadisatu_canvas --url https://canvas.jadisatu.cloud/mcp
codex mcp login jadisatu_canvas --oauth-client-registration dcr
```

Perintah ini mengubah konfigurasi klien, jadi bukan bagian uji offline skill. Sumber: [MCP Codex](https://learn.chatgpt.com/docs/extend/mcp?surface=cli). Bantuan CLI lokal mengonfirmasi flag bearer (`codex mcp add --help`) dan pilihan registrasi `dcr` (`codex mcp login --help`).

## 4. Claude Code · `.mcp.json`

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "type": "http",
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Claude Code memperluas `${VAR}` pada header. Untuk OAuth, hilangkan header statis dan selesaikan autentikasi dari pengelolaan MCP. Jangan mematikan persetujuan tool secara global. Sumber: [MCP Claude Code dan ekspansi environment](https://code.claude.com/docs/en/mcp#environment-variable-expansion-in-mcpjson).

## 5. Gemini CLI · `.gemini/settings.json`

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "httpUrl": "https://canvas.jadisatu.cloud/mcp"
    }
  }
}
```

Gemini CLI memakai `httpUrl` untuk Streamable HTTP; `url` memilih transport SSE. Biarkan discovery OAuth mendeteksi server, kemudian jalankan `/mcp auth jadisatu_canvas` dalam sesi yang disiapkan pemilik. Dokumentasi menjamin ekspansi environment pada blok `env`; jangan mengasumsikan sintaks itu bekerja pada header setiap versi. Untuk bearer environment, gunakan bridge pada §9 dengan pemetaan `env` Gemini. Sumber: [MCP Gemini CLI](https://geminicli.com/docs/tools/mcp-server/).

## 6. Cursor · `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${env:JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Cursor menggunakan `${env:NAME}`. Untuk OAuth, hilangkan header dan gunakan alur autentikasi klien yang tersedia; jangan membuat client secret. Sumber: [MCP Cursor dan config interpolation](https://cursor.com/docs/mcp#config-interpolation).

## 7. VS Code / Copilot · pilih format yang sesuai

Format VS Code di `.vscode/mcp.json` memakai `servers`:

```json
{
  "servers": {
    "jadisatu_canvas": {
      "type": "http",
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${env:JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Format portable Copilot di `.mcp.json` memakai `mcpServers` dan `${NAME}`:

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "type": "http",
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Jangan mencampur format kedua berkas. Beri environment ke host/harness yang benar. Sumber: [referensi konfigurasi MCP VS Code](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

## 8. xAI / Grok API · remote MCP

Untuk aplikasi yang **sudah** diotorisasi memakai xAI Responses API, masukkan objek ini dalam daftar `tools` permintaan yang ada. Tidak ada panggilan model yang dijalankan oleh skill:

```python
import os

canvas_tool = {
    "type": "mcp",
    "server_url": "https://canvas.jadisatu.cloud/mcp",
    "server_label": "jadisatu_canvas",
    "headers": {"Authorization": f"Bearer {os.environ['JADISATU_CANVAS_TOKEN']}"},
    "allowed_tools": ["read_board", "read_image", "get_sketch", "list_activity"],
}
```

Contoh sengaja membatasi tool baca. Tugas tulis memerlukan token write dan allowlist yang sesuai; izin server tetap menentukan. Ini bentuk OpenAI-compatible Responses API xAI. SDK native xAI memakai nama lain, termasuk `extra_headers` dan `allowed_tool_names`; jangan menyalin parameter lintas SDK. Dukungan ini tidak membuktikan konektor tersedia pada Grok web. Sumber: [remote MCP resmi xAI](https://docs.x.ai/developers/tools/remote-mcp).

## 9. Bridge stdio dan verifikasi

Klien stdio dapat menjalankan **`server/bridge.mjs` dari checkout aplikasi Jadisatu Canvas**, dengan Node ≥22.13 dan dependensi aplikasi yang sudah tersedia. Berkas itu tidak berada di repo skill-development. Tentukan path checkout nyata melalui environment `JADISATU_CANVAS_DIR`; jangan menebak path atau memasang dependensi tanpa scope yang sesuai.

Contoh Codex, setelah environment tersebut dan `JADISATU_CANVAS_TOKEN` disediakan pemilik:

```toml
[mcp_servers.jadisatu_canvas_bridge]
command = "sh"
args = ["-c", 'export MCP_TOKEN="$JADISATU_CANVAS_TOKEN"; exec node "$JADISATU_CANVAS_DIR/server/bridge.mjs"']
env_vars = ["JADISATU_CANVAS_DIR", "JADISATU_CANVAS_TOKEN"]
env = { MCP_URL = "https://canvas.jadisatu.cloud/mcp" }
```

Bridge membaca `MCP_URL` dan `MCP_TOKEN`; contoh di atas memetakan token dari environment tanpa menjadikannya argumen proses. Sintaks pemetaan berbeda per klien; contoh Gemini berikut menggunakan ekspansi `env` yang didokumentasikan:

```json
{
  "mcpServers": {
    "jadisatu_canvas_bridge": {
      "command": "sh",
      "args": ["-c", "exec node \"$JADISATU_CANVAS_DIR/server/bridge.mjs\""],
      "env": {
        "JADISATU_CANVAS_DIR": "$JADISATU_CANVAS_DIR",
        "MCP_URL": "https://canvas.jadisatu.cloud/mcp",
        "MCP_TOKEN": "$JADISATU_CANVAS_TOKEN"
      }
    }
  }
}
```

`sh` adalah contoh POSIX; untuk klien Windows gunakan runtime/path yang benar pada mesin itu. Token tidak menjadi argumen proses. Jangan mengaktifkan koneksi HTTP dan bridge dengan nama/identitas ganda tanpa kebutuhan.

Setelah pemilik menyiapkan satu klien: pastikan `tools/list` tersedia, `read_board` mengembalikan board yang disetujui, lalu gunakan `read_image` untuk satu referensi aktif. Uji tulis hanya saat diminta dan dengan `contextVersion` terbaru. Catat koneksi mana yang benar-benar diuji; jangan menyebut semua penyedia berhasil karena contoh dapat diparse.
