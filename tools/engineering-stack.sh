#!/usr/bin/env bash
# Pasang tumpukan skill engineering terkurasi (idempoten).
#   ./tools/engineering-stack.sh                         # Mac, ~/.claude
#   CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/engineering-stack.sh   # PC server, akun claude2
#   SKIP_PLUGINS=1 ...   # hanya skill biasa (symlink), tanpa plugin
# Daftar dan alasannya: ENGINEERING-STACK.md. Ubah daftar di sana dan di sini bersamaan.
set -uo pipefail

CFG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
CLAUDE_BIN="${CLAUDE_BIN:-$(command -v claude || echo "$HOME/.local/bin/claude")}"
CODEX_DEST="${CODEX_CONFIG_DIR:-$HOME/.codex}/skills"
EXT="${ENG_EXT_DIR:-$HOME/.local/share/engineering-skills}"
fail=0

# --- 1. Plugin lewat marketplace -------------------------------------------
MARKETPLACES=(
  "obra/superpowers-marketplace"      # superpowers-marketplace
  "anthropics/claude-plugins-official"
  "trailofbits/skills"                # trailofbits
  "wshobson/agents"                   # claude-code-workflows
)
PLUGINS=(
  superpowers@superpowers-marketplace
  # Anthropic resmi
  feature-dev@claude-plugins-official
  code-review@claude-plugins-official
  code-simplifier@claude-plugins-official
  commit-commands@claude-plugins-official
  security-guidance@claude-plugins-official
  frontend-design@claude-plugins-official
  claude-md-management@claude-plugins-official
  skill-creator@claude-plugins-official
  typescript-lsp@claude-plugins-official
  pyright-lsp@claude-plugins-official
  mattpocock-skills@claude-plugins-official
  # Trail of Bits
  property-based-testing@trailofbits
  sharp-edges@trailofbits
  insecure-defaults@trailofbits
  differential-review@trailofbits
  supply-chain-risk-auditor@trailofbits
  code-improver@trailofbits
  second-opinion@trailofbits
  patching-bugs@trailofbits
  spec-to-code-compliance@trailofbits
  # wshobson/agents
  shell-scripting@claude-code-workflows
  javascript-typescript@claude-code-workflows
  plugin-eval@claude-code-workflows
  before-you-build@claude-code-workflows
)

if [ -z "${SKIP_PLUGINS:-}" ]; then
  export CLAUDE_CONFIG_DIR="$CFG"
  for m in "${MARKETPLACES[@]}"; do
    "$CLAUDE_BIN" plugin marketplace add "$m" >/dev/null 2>&1 || true
  done
  "$CLAUDE_BIN" plugin marketplace update >/dev/null 2>&1 || true
  for p in "${PLUGINS[@]}"; do
    if out=$("$CLAUDE_BIN" plugin install "$p" --scope user 2>&1); then
      echo "plugin   $p"
    else
      echo "GAGAL    $p :: $(echo "$out" | tail -1)"; fail=1
    fi
  done
fi

# --- 2. Skill biasa (SKILL.md) lewat clone dangkal + symlink ----------------
# format: repo|subdir|skill skill ...
SKILL_REPOS=(
  "vercel-labs/agent-skills|skills|react-best-practices composition-patterns react-native-skills react-view-transitions"
  "t3dotgg/tstack|skills|babysit-pr council file-pr full-send full-stop leaving-pr-comments modernize sol-loop takeover"
)
mkdir -p "$EXT" "$CFG/skills"
for entry in "${SKILL_REPOS[@]}"; do
  IFS='|' read -r repo sub names <<<"$entry"
  dir="$EXT/${repo//\//__}"
  if [ -d "$dir/.git" ]; then git -C "$dir" pull -q --ff-only || echo "PERINGATAN pull $repo"
  else git clone -q --depth 1 "https://github.com/$repo.git" "$dir" || { echo "GAGAL clone $repo"; fail=1; continue; }; fi
  for n in $names; do
    src="$dir/$sub/$n"
    [ -f "$src/SKILL.md" ] || { echo "GAGAL    $n (tidak ada SKILL.md)"; fail=1; continue; }
    for dest in "$CFG/skills" "$CODEX_DEST"; do
      [ -d "$(dirname "$dest")" ] || continue
      mkdir -p "$dest"
      if [ -e "$dest/$n" ] && [ ! -L "$dest/$n" ]; then echo "LEWATI   $dest/$n (sudah ada, bukan symlink)"; continue; fi
      ln -sfn "$src" "$dest/$n"
    done
    echo "skill    $n"
  done
done

[ $fail -eq 0 ] && echo "SELESAI: $CFG" || { echo "SELESAI DENGAN GAGAL: $CFG"; exit 1; }
