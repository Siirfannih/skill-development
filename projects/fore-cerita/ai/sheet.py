import sys
from PIL import Image, ImageDraw
# usage: sheet.py out.jpg cols w file:label ...
out, cols, w = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
items = [a.split(":", 1) if ":" in a else (a, "") for a in sys.argv[4:]]
h = w * 9 // 16
rows = (len(items) + cols - 1) // cols
W = Image.new("RGB", (cols * w, rows * h), "black")
for i, (f, lab) in enumerate(items):
    im = Image.open(f).convert("RGB").resize((w, h))
    W.paste(im, ((i % cols) * w, (i // cols) * h))
    ImageDraw.Draw(W).text(((i % cols) * w + 5, (i // cols) * h + 5), lab, fill="yellow")
W.save(out, quality=85)
