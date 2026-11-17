#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd -- "$(dirname -- "$0")/../.." && pwd)"
runtime_dir=/dev/shm/b10a-blender-5.2-runtime
export LD_LIBRARY_PATH="$runtime_dir/deps/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export __EGL_VENDOR_LIBRARY_FILENAMES="$runtime_dir/deps/usr/share/glvnd/egl_vendor.d/50_mesa.json"
export LIBGL_ALWAYS_SOFTWARE=1
export EGL_PLATFORM=x11
export XDG_CACHE_HOME=/mnt/storage-projects/skill-dev-journey/b10a/cache
export TMPDIR=/mnt/storage-projects/skill-dev-journey/b10a/tmp
export OMP_NUM_THREADS=8
cd "$project_dir"
PYTHONUNBUFFERED=1 xvfb-run -a "$runtime_dir/blender" -b /mnt/storage-projects/skill-dev-journey/b10a/b10a.blend -t 8 --python-exit-code 1 --python lego/blender/render_full.py -- "$@"
if [[ " $* " != *" --test "* ]]; then
  python3 lego/blender/finish.py --sequence
  mkdir -p /mnt/storage-projects/skill-dev-journey/b10a/out
  ffmpeg -v error -y -framerate 30000/1001 -start_number 1 -i /mnt/storage-projects/skill-dev-journey/b10a/finished/%04d.png -c:v prores_ks -profile:v 3 -pix_fmt yuv422p10le -threads 4 -an /mnt/storage-projects/skill-dev-journey/b10a/out/b10a.mov
fi
