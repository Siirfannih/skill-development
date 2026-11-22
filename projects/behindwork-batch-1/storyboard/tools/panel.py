"""Pembantu panel Story Cinematic (Behindwork Batch 1).

Setiap episode punya gen.py yang memanggil fungsi di sini untuk menulis panels/<id>.html.
Panel = satu frame 1920x1080 yang memperlihatkan momen kunci beat: plate (footage/foto) di .cam,
lalu teks di luar .cam supaya kamera yang bergerak, bukan teks.
Nilai warna, huruf, dan ukuran hanya dari ../tokens.css (D-02).
"""
from pathlib import Path
import html

HEAD = ('<!doctype html><html><head><meta charset="utf-8">'
        '<link rel="stylesheet" href="../../tokens.css"><style>{css}</style></head>'
        '<body class="frame {body}">{inner}</body></html>')


def plate(src, grade="g-nat", pos="center", scale=1.0, tx=0, ty=0, extra="", style=""):
    """Footage/foto layar penuh. scale/tx/ty = posisi kamera di frame ini (push/pan)."""
    cam = f"transform:translate({tx}px,{ty}px) scale({scale})"
    return (f'<div class="cam" data-bleed style="{cam}"><div class="plate {grade}" '
            f'style="background-image:url(../plates/{src});background-position:{pos};{style}"></div>{extra}</div>')


def inset(src, x, y, w, h, grade="g-nat", pos="center", rot=0):
    return (f'<div class="inset {grade}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;'
            f'background-image:url(../plates/{src});background-position:{pos};transform:rotate({rot}deg)"></div>')


def text(s, x, y, cls="r1", anchor="", layar=False, style="", rich=False):
    """Teks layar. anchor: '' = kiri-atas di (x,y), 'c' = pusat, 'cx' = tengah horizontal."""
    a = f" {anchor}" if anchor else ""
    lay = " data-layar" if layar else ""
    return f'<div class="t {cls}{a}"{lay} style="left:{x}px;top:{y}px;{style}">{s if rich else html.escape(s)}</div>'


def raw(s):
    return s


def src_label(s, ink=False):
    """Sumber tidak ditulis di frame (DECISIONS D-06); dicatat di SUMBER-ASET.md dan kartu sumber penutup."""
    return ""


def write(folder, name, *parts, body="", css=""):
    p = Path(folder) / "panels"
    p.mkdir(parents=True, exist_ok=True)
    (p / f"{name}.html").write_text(HEAD.format(css=css, body=body, inner="".join(parts)), encoding="utf-8")
