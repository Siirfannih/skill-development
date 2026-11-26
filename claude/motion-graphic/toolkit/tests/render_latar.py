"""Pembantu uji latar: render satu frame LightWaveBg / GenerativeBG lewat Chromium headless (SwiftShader) dari bundel klasik toolkit.js.
Dipakai tests/ukur_latar.py (scripts/tests/test_latar_v2.py) dan kontak_latar.py. Butuh playwright + numpy + PIL (PC: ~/work/mg-venv/bin/python)."""
import base64, io, json, subprocess, sys, tempfile
from pathlib import Path

import numpy as np
from PIL import Image

TK = Path(__file__).resolve().parents[1]
ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--allow-file-access-from-files"]


class Perender:
    def __init__(self):
        from playwright.sync_api import sync_playwright
        self.tmp = tempfile.TemporaryDirectory(); d = Path(self.tmp.name)
        subprocess.run([sys.executable, str(TK / "bundel.py"), str(d / "toolkit.js")], check=True, capture_output=True)
        (d / "p.html").write_text('<!doctype html><meta charset="utf-8"><body style="margin:0"><script src="toolkit.js"></script></body>')
        self.pw = sync_playwright().start(); self.br = self.pw.chromium.launch(args=ARGS)
        self.pg = self.br.new_page(); self.pg.goto((d / "p.html").as_uri())

    def tutup(self):
        self.br.close(); self.pw.stop(); self.tmp.cleanup()

    def lightwave(self, opts, frame, w=540, h=960, fps=30):
        """-> array uint8 (h, w, 3)."""
        o = {**opts, "width": w, "height": h}
        url = self.pg.evaluate("""([o, frame, fps]) => { const c = document.createElement('canvas'); c.width = o.width; c.height = o.height;
            TK.lightWaveBg(c, frame, o, fps); return c.toDataURL('image/png'); }""", [o, frame, fps])
        return np.asarray(Image.open(io.BytesIO(base64.b64decode(url.split(",", 1)[1]))).convert("RGB"))

    def generatif(self, opts, frame, w=540, h=960, fps=30):
        """Mode zona/mesh (CSS): -> array uint8 (h, w, 3), dirender sebagai elemen div."""
        self.pg.evaluate("""([o, frame, fps, w, h]) => { let e = document.getElementById('g'); if (!e) { e = document.createElement('div'); e.id = 'g'; document.body.appendChild(e); }
            e.style.cssText = 'position:fixed;left:0;top:0;width:' + w + 'px;height:' + h + 'px'; TK.generativeBg(e, frame, o, fps); }""", [opts, frame, fps, w, h])
        self.pg.set_viewport_size({"width": w, "height": h})
        return np.asarray(Image.open(io.BytesIO(self.pg.screenshot(clip={"x": 0, "y": 0, "width": w, "height": h}))).convert("RGB"))
