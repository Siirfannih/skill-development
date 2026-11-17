#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd -- "$(dirname -- "$0")/../.." && pwd)"
blender_dir=/mnt/storage-projects/skill-dev-journey/blender/blender-5.2.4-linux-x64
runtime_dir=/dev/shm/b10a-blender-5.2-runtime
# The storage filesystem is noexec; tmpfs keeps executable files off the root disk.
mkdir -p "$runtime_dir"
if [ ! -f "$runtime_dir/blender" ]; then cp -a "$blender_dir/." "$runtime_dir/"; fi
chmod u+x "$runtime_dir/blender"
mkdir -p "$runtime_dir/deps"
cp -a /mnt/storage-projects/skill-dev-journey/blender/deps/unpacked/. "$runtime_dir/deps/"
export LD_LIBRARY_PATH="$runtime_dir/deps/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export __EGL_VENDOR_LIBRARY_FILENAMES="$runtime_dir/deps/usr/share/glvnd/egl_vendor.d/50_mesa.json"
export LIBGL_ALWAYS_SOFTWARE=1
export EGL_PLATFORM=x11
export XDG_CACHE_HOME=/mnt/storage-projects/skill-dev-journey/b10a/cache
export TMPDIR=/mnt/storage-projects/skill-dev-journey/b10a/tmp
mkdir -p "$XDG_CACHE_HOME" "$TMPDIR"
cd "$project_dir"
python3 lego/blender/prepare.py
PYTHONUNBUFFERED=1 xvfb-run -a "$runtime_dir/blender" -b -t 8 --factory-startup --python-exit-code 1 --python lego/blender/scene.py -- "$@"
"$runtime_dir/blender" -b /mnt/storage-projects/skill-dev-journey/b10a/b10a.blend -t 2 --python-exit-code 1 --python lego/blender/check_scene.py
if [[ " $* " != *" --build-only "* ]]; then python3 lego/blender/finish.py; fi
