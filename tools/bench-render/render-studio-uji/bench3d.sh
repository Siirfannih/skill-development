#!/bin/bash
# bench3d.sh <label>  → out/<label>/hasil.tsv. Kunci render global dipakai per job.
set -u; cd /dev/shm/render-studio-uji; export npm_config_cache=/dev/shm/npm-cache-uji
L="$1"; O="out/$L"; mkdir -p "$O"; R="$O/hasil.tsv"; : > "$R"
id > "$O/id.txt"; timeout 120 npx remotion gpu --gl=angle > "$O/gpu_angle.txt" 2>&1
for comp in Kepiting3D Berat; do for gl in default angle angle-egl vulkan swangle; do
  a=""; [ $gl = default ] || a="--gl=$gl"
  flock /tmp/remotion-heavy-render.lock timeout 300 npx remotion still bundle $comp "$O/s_${comp}_$gl.png" --frame=46 --timeout=180000 $a --log=error >"$O/s_${comp}_$gl.log" 2>&1 || { printf '%s\t%s\tgagal-still\t-\n' $comp $gl >>"$R"; continue; }
  t0=$(date +%s.%N)
  flock /tmp/remotion-heavy-render.lock timeout 1500 npx remotion render bundle $comp "$O/r_${comp}_$gl.mp4" --concurrency=4 --timeout=180000 $a --log=error >"$O/r_${comp}_$gl.log" 2>&1; rc=$?
  t=$(python3 -c "print(round($(date +%s.%N)-$t0,1))")
  p=$(ffmpeg -nostdin -i "$O/s_${comp}_default.png" -i "$O/s_${comp}_$gl.png" -lavfi psnr -f null - 2>&1 | grep -oE 'average:[0-9.inf]+' | cut -d: -f2)
  [ $rc = 0 ] || t="gagal($rc)"; printf "%s\t%s\t%s\t%s\tload=%s\n" $comp $gl "$t" "${p:-?}" "$(cut -d" " -f1 /proc/loadavg)" | tee -a "$R"
done; done
