#!/bin/bash
# ambil aset baru dari uploads -> raw -> proses -> public/assets
U=/mnt/user-data/uploads/Proyek/fore-cerita/assets; R=/home/claude/fore/raw; P=/home/claude/fore/video/public/assets
mkdir -p $R $P
for f in $U/*.png; do b=$(basename $f); [ "$b" = "_sheet_ref.png" ] && continue
  if [ ! -f $R/$b ] || [ $f -nt $R/$b ]; then cp $f $R/$b; NEW="$NEW $b"; fi; done
for b in $NEW; do n=${b%.png}
  case $n in
    N_*|story_*) w=N; s=1.0;;
    sil_*) w=P; s=0.5;;
    ch_*) w=P; s=0.6;;
    *) w=P; s=1.0;;
  esac
  python3 /home/claude/fore/tools/prep.py grade $R/$b $P/$b --world $w --shapes $s
done
echo "new:$NEW"
