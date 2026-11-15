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
# either the active Remotion install or RAEA's own runtime.
npm install --ignore-scripts

