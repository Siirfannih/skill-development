#!/bin/zsh
# Still QC v21: ./stills.sh <nama> <label:frame> ...  → audit21/<nama>/<label>.png (skala 0,5) + lembar audit21/<nama>.jpg
cd "$(dirname "$0")/remotion"
NAME=$1; shift
STAMP=../seg/.bundle_stamp
NEWEST=$(find src -type f -newer $STAMP 2>/dev/null | head -1)
if [ ! -d ../seg/bundle ] || [ ! -f $STAMP ] || [ -n "$NEWEST" ]; then
  npx remotion bundle src/index.ts --out-dir=../seg/bundle --public-dir=public > ../seg/bundle.log 2>&1
  touch $STAMP
fi
OUT=../audit21/$NAME; mkdir -p $OUT
for P in "$@"; do
  L=${P%%:*}; F=${P##*:}
  echo "npx remotion still ../seg/bundle PenggantiKitaSendiri $OUT/${L}.png --frame=$F --scale=0.5 --timeout=120000 > /dev/null 2>&1"
done | xargs -P 4 -I{} zsh -c "{}"
../ears/.venv/bin/python3 - "$OUT" "$@" <<'EOF'
import sys
from PIL import Image, ImageDraw
out = sys.argv[1]; pts = sys.argv[2:]
ims = []
for p in pts:
    l, f = p.split(':')
    try: im = Image.open(f'{out}/{l}.png').convert('RGB').resize((480, 270))
    except Exception: im = Image.new('RGB', (480, 270), (80, 0, 0))
    d = ImageDraw.Draw(im); d.rectangle([0, 0, 110, 18], fill=(0, 0, 0)); d.text((3, 3), f'{l} f{f}', fill=(255, 255, 0)); ims.append(im)
cols = 4; rows = (len(ims) + cols - 1) // cols
S = Image.new('RGB', (cols * 480, rows * 270))
for i, im in enumerate(ims): S.paste(im, ((i % cols) * 480, (i // cols) * 270))
S.save(out + '.jpg', quality=85); print('SHEET', out + '.jpg')
EOF
echo STILLS_DONE
