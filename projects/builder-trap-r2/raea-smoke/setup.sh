#!/usr/bin/env bash
set -euo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
PROJECT=$(cd "$HERE/.." && pwd)

mkdir -p "$HERE/src" "$HERE/out"
cp -R "$PROJECT/remotion/src/." "$HERE/src/"
if [ ! -e "$HERE/media" ]; then
  ln -s "$PROJECT/remotion/public" "$HERE/media"
fi

"${RAEA_BIN:-$HOME/.local/bin/raea}" install --in "$HERE"

