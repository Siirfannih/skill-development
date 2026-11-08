#!/bin/bash
# Pasang skill aktif dari repo ke Claude Code sebagai SYMLINK, supaya selalu ikut `git pull`
# (salinan lama membeku: Mac masih 27 Okt, PC server tidak punya sama sekali; gagal: V5 8 Nov).
#
#   ./tools/sync.sh                                   # Mac / akun default (~/.claude)
#   CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/sync.sh     # PC server, akun claude2
#
# Yang dilakukan:
#   1. claude/*                          -> <config>/skills/<nama>  (symlink)
#   2. external/remotion-skills/skills/* -> <config>/skills/<nama>  (skill Remotion resmi, symlink)
#   3. skill di archive/                 -> dicabut dari <config>/skills
#   4. hook SessionStart: git pull repo ini setiap sesi baru
# Folder lama yang bukan symlink dipindah ke <config>/skills-backup/<waktu>/ (tidak dihapus).
# Skill dari pustaka akun claude.ai (<config>/skills/synced/...) TIDAK bisa diatur dari sini:
# hapus/perbarui di claude.ai > Settings > Skills.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
CFG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"; DEST="$CFG/skills"
BK="$CFG/skills-backup/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEST"
git -C "$REPO" submodule update --init -q external/remotion-skills external/earshot || echo "PERINGATAN: submodule gagal di-init"

link() { local src="${1%/}" n; n="$(basename "$src")"
  if [ -e "$DEST/$n" ] && [ ! -L "$DEST/$n" ]; then mkdir -p "$BK"; mv "$DEST/$n" "$BK/"; fi
  ln -sfn "$src" "$DEST/$n"; echo "symlink  $n"; }

for d in "$REPO"/claude/*/; do link "$d"; done
for d in "$REPO"/external/remotion-skills/skills/*/; do [ -f "$d/SKILL.md" ] && link "$d"; done
for d in "$REPO"/archive/*/; do n=$(basename "$d")
  if [ -e "$DEST/$n" ] || [ -L "$DEST/$n" ]; then mkdir -p "$BK"; mv "$DEST/$n" "$BK/"; echo "dicabut  $n"; fi; done

python3 - "$CFG/settings.json" "$REPO" <<'EOF'
import json, os, sys
p, repo = sys.argv[1], sys.argv[2]
d = json.load(open(p)) if os.path.exists(p) else {}
cmd = f'git -C "{repo}" pull -q --no-rebase --no-edit >/dev/null 2>&1; true'
ss = d.setdefault("hooks", {}).setdefault("SessionStart", [])
if not any("pull -q --no-rebase" in h.get("command", "") and repo in h.get("command", "") for e in ss for h in e.get("hooks", [])):
    ss.append({"hooks": [{"type": "command", "command": cmd}]})
    json.dump(d, open(p, "w"), indent=2); print("hook SessionStart: git pull dipasang")
else:
    print("hook SessionStart: sudah ada")
EOF
ls "$DEST/synced"/*/ 2>/dev/null | grep -x -E "motion-director|motion-graphic-playbook|motion-graphic|irfan-motion-director|motion-reel" \
  | sed 's/^/PERINGATAN pustaka akun claude.ai masih memuat: /' || true
# 5. folder masuk remote (default ~/work di PC server): sesi remote mulai di sana, jadi CLAUDE.md-nya harus
#    merujuk repo ini untuk tugas video/konten/skill (Irfan 8 Nov). Lewati bila foldernya tidak ada.
ENTRY="${ENTRY_DIR:-$HOME/work}"
if [ -d "$ENTRY" ]; then
  python3 - "$ENTRY/CLAUDE.md" "$REPO" <<'EOF'
import os, sys
p, repo = sys.argv[1], sys.argv[2]
s = open(p).read() if os.path.exists(p) else "# Claude Code\n"
if "skill-development/AGENTS.md" in s:
    print("folder masuk remote: rujukan skill-development sudah ada"); sys.exit()
block = f"""
## Tugas video, konten, naskah, storyboard, atau skill -> repo skill-development
Folder ini adalah titik masuk remote, jadi aturan video tidak terbaca otomatis. Untuk tugas jenis ini:
1. Baca dulu `{repo}/AGENTS.md` dan ikuti bagian **Awal sesi** (git pull, `./tools/doctor.sh`, `PENDING.md`). Doctor GAGAL = lapor Irfan, jangan mulai.
2. Skill utama video: `motion-graphic` (`{repo}/claude/motion-graphic/`); alat di `scripts/` folder itu.
3. Pelajaran yang Irfan setujui ditulis ke file skill di repo itu dan di-push ke `main` (AGENTS.md, Akhir sesi).
Bagian lain file ini hanya berlaku untuk tugasnya sendiri.
"""
i = s.index("\n") + 1 if s.startswith("#") else 0
open(p, "w").write(s[:i] + block + s[i:])
print(f"folder masuk remote: rujukan skill-development ditambahkan ke {p}")
EOF
fi
echo "Selesai. Cadangan (bila ada): $BK"
