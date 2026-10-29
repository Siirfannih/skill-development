#!/bin/bash
# shots.sh <name> f1 f2 ...  -> qa/<name>_sheet.jpg (folder baru tiap putaran)
n=$1; shift; d=qa/$n.$(date +%H%M%S); mkdir -p $d
timeout 900 node stills.mjs $d 0.5 "$@" > $d.log 2>&1 || tail -20 $d.log
python3 sheet.py $d qa/${n}_sheet.jpg
