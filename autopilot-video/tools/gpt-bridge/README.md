# gpt-bridge · satu pintu ke ChatGPT dari agent mana pun

Memakai Codex CLI yang sudah login dengan akun ChatGPT Pro Irfan, jadi tidak memakai API berbayar. Agent yang punya akses terminal ke Mac ini (Claude lewat device tools, Grok Bot lewat local exec, Hermes lewat SSH) cukup memanggil:

    ~/AI-OPS/gpt-bridge/gpt run -l affiliate "Buat 3 keyframe isometrik ..."
    ~/AI-OPS/gpt-bridge/gpt wait <JOB> 50     # ulangi sampai bukan 'running'
    ~/AI-OPS/gpt-bridge/gpt result <JOB>

- `-l <jalur>` menyambung sesi ChatGPT yang sama per jalur (siirfan, jadisatu, affiliate, dev). `gpt reset <jalur>` untuk mulai bersih.
- `-m gpt-6.1-sol` untuk ganti model; `-i file.png` untuk melampirkan gambar referensi; `-d <folder>` agar ChatGPT menulis langsung ke folder proyek.
- Semua job ada di `jobs/<id>/`: `prompt.md`, `log.txt`, `result.md`, `seconds`, plus file hasil.
- Aturan untuk ChatGPT ada di `BRIEF-CHATGPT.md` dan otomatis ditempel di depan setiap perintah.
- Mac harus menyala dan online. Video generation tidak tersedia di Codex CLI.
