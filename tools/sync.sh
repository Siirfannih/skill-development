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
echo "Selesai. Cadangan (bila ada): $BK"
