#!/bin/zsh
# Sinkron src remotion dari repo (origin/main) ke pks-studio/remotion/src tanpa menyentuh working tree clone lokal.
# File Mac-only (SubjectMatteStub.ts) dipertahankan (rsync tanpa --delete).
set -e
R=~/Proyek/skill-development
git -C $R fetch -q origin main
T=$(mktemp -d)
git -C $R archive origin/main projects/pengganti-kita-sendiri/remotion/src | tar -x -C $T
D=~/Documents/Skill-Development/AI-Video/pks-studio/remotion/src
rsync -a --checksum $T/projects/pengganti-kita-sendiri/remotion/src/ $D/
rm -rf $T
git -C $R log -1 --format='%h %s' origin/main
echo SYNC_OK
