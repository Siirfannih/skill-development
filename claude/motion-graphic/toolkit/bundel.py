#!/usr/bin/env python3
"""Bundel modul ESM toolkit jadi satu skrip klasik (toolkit.js) untuk storyboard HTML yang dibuka lewat file://
(modul ES via file:// diblokir Chromium). Hasil: window.TK = { move, CURVE, cameraAt, bgCSS, renderLightWave, ... }.

  python3 bundel.py <keluaran.js>

Tanpa dependensi. Satu sumber: tiap modul tetap ditulis sebagai ESM; bundel hanya membuang `import`/`export`."""
import re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
URUT = ["gerak/curves.js", "latar/warna.js", "latar/presets/index.js", "latar/preset.js", "latar/generative-bg.js", "latar/grain.js", "latar/light-wave-bg.js", "kamera/camera25d.js"]


def modul(rel):
    src = (HERE / rel).read_text(encoding="utf-8")
    pre, nama = [], []

    def imp(m):
        dep = (Path(rel).parent / m.group(2)).as_posix()
        dep = re.sub(r"[^/]+/\.\./", "", dep)  # normalisasi ../
        pre.append(f"const {{{m.group(1).strip()}}} = __M[{dep!r}];")
        return ""

    src = re.sub(r'^import\s*\{([^}]*)\}\s*from\s*"([^"]+)";\s*$', imp, src, flags=re.M)

    def exp(m):
        nama.append(m.group(2))
        return f"{m.group(1)} {m.group(2)}"

    src = re.sub(r"^export\s+(const|function)\s+(\w+)", exp, src, flags=re.M)
    return f"__M[{rel!r}] = (() => {{\n" + "\n".join(pre) + "\n" + src + f"\nreturn {{ {', '.join(nama)} }};\n}})();\n"


def main(out):
    corpus = "// toolkit.js — DIHASILKAN oleh toolkit/bundel.py dari modul ESM; jangan disunting. window.TK berisi semua ekspor.\n(function () {\nconst __M = {};\n"
    corpus += "".join(modul(r) for r in URUT)
    corpus += "window.TK = Object.assign({}, ...Object.values(__M));\n})();\n"
    Path(out).write_text(corpus, encoding="utf-8")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
