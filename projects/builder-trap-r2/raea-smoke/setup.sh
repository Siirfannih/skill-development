#!/usr/bin/env bash
set -euo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
PROJECT=$(cd "$HERE/.." && pwd)

mkdir -p "$HERE/src" "$HERE/out"
cp -R "$PROJECT/remotion/src/." "$HERE/src/"
if [ ! -e "$HERE/media" ]; then
  ln -s "$PROJECT/remotion/public" "$HERE/media"
fi

# RAEA 0.1.0-canary.2 cannot install a local `file:` compatibility package.
# npm resolves the shim inside this isolated smoke directory without touching
# either the active Remotion install or RAEA's own runtime. The shared PC image
# intentionally ships Node without npm, so reuse the already-installed,
# project-pinned packages there instead of installing anything system-wide.
if command -v npm >/dev/null 2>&1; then
  npm install --ignore-scripts
else
  SOURCE_MODULES=$(readlink -f "$PROJECT/remotion/node_modules")
  mkdir -p "$HERE/node_modules"
  for PACKAGE in react react-dom lucide-react simple-icons; do
    [ -e "$SOURCE_MODULES/$PACKAGE" ] || {
      echo "missing pinned package: $SOURCE_MODULES/$PACKAGE" >&2
      exit 1
    }
    ln -sfn "$SOURCE_MODULES/$PACKAGE" "$HERE/node_modules/$PACKAGE"
  done
  ln -sfn "$HERE/remotion-compat" "$HERE/node_modules/remotion"
fi

