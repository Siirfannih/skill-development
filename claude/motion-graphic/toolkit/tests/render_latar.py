"""Pembantu uji latar: render satu frame LightWaveBg / GenerativeBG lewat Chromium headless (SwiftShader) dari bundel klasik toolkit.js.
Dipakai scripts/tests/test_latar_v3.py dan kontak_latar.py. Butuh playwright + numpy + PIL (PC: ~/work/mg-venv/bin/python)."""
import base64, io, json, subprocess, sys, tempfile
from pathlib import Path

import numpy as np
from PIL import Image

TK = Path(__file__).resolve().parents[1]
ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--allow-file-access-from-files"]


class Perender:
    def __init__(self, tk=None):
        """tk = folder toolkit lain (mis. salinan v2 dari git) bila bukan toolkit repo ini."""
        from playwright.sync_api import sync_playwright
        self.tmp = tempfile.TemporaryDirectory(); d = Path(self.tmp.name)
        subprocess.run([sys.executable, str(Path(tk or TK) / "bundel.py"), str(d / "toolkit.js")], check=True, capture_output=True)
        (d / "p.html").write_text('<!doctype html><meta charset="utf-8"><body style="margin:0"><script src="toolkit.js"></script></body>')
        self.pw = sync_playwright().start(); self.br = self.pw.chromium.launch(args=ARGS)
        self.pg = self.br.new_page(); self.pg.goto((d / "p.html").as_uri())

    def versi(self, tk):
        """Perender kedua dengan toolkit lain (mis. salinan v2) di browser yang sama (Playwright sync hanya boleh satu instans)."""
        o = object.__new__(Perender); o.tmp = tempfile.TemporaryDirectory(); d = Path(o.tmp.name)
        subprocess.run([sys.executable, str(Path(tk) / "bundel.py"), str(d / "toolkit.js")], check=True, capture_output=True)
        (d / "p.html").write_text('<!doctype html><meta charset="utf-8"><body style="margin:0"><script src="toolkit.js"></script></body>')
        o.pw, o.br, o.anak = self.pw, self.br, True
        o.pg = self.br.new_page(); o.pg.goto((d / "p.html").as_uri()); return o

    def tutup(self):
        if getattr(self, "anak", False): self.pg.close(); self.tmp.cleanup(); return
        self.br.close(); self.pw.stop(); self.tmp.cleanup()

    def lightwave(self, opts, frame, w=540, h=960, fps=30):
        """-> array uint8 (h, w, 3)."""
        o = {**opts, "width": w, "height": h}
        url = self.pg.evaluate("""([o, frame, fps]) => { const c = document.createElement('canvas'); c.width = o.width; c.height = o.height;
            TK.lightWaveBg(c, frame, o, fps); return c.toDataURL('image/png'); }""", [o, frame, fps])
        return np.asarray(Image.open(io.BytesIO(base64.b64decode(url.split(",", 1)[1]))).convert("RGB"))

    def glsl(self, frag, uniforms, frame, w=960, h=540, fps=30):
        """Render shader fragmen mentah (mis. patokan-irfan.glsl) apa adanya; u_time = frame/fps, u_resolution = (w, h).
        uniforms = {nama: float | [2-3 float]}. -> array uint8 (h, w, 3)."""
        url = self.pg.evaluate("""([frag, uni, frame, fps, w, h]) => { const c = document.createElement('canvas'); c.width = w; c.height = h;
            const gl = c.getContext('webgl', { preserveDrawingBuffer: true, antialias: false });
            const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(x)); return x; };
            const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }'));
            gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, frag)); gl.linkProgram(pr); gl.useProgram(pr);
            const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
            const l = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
            gl.viewport(0, 0, w, h);
            const set = (n, v) => { const u = gl.getUniformLocation(pr, n); if (typeof v === 'number') gl.uniform1f(u, v); else if (v.length === 2) gl.uniform2f(u, ...v); else gl.uniform3f(u, ...v); };
            set('u_time', frame / fps); set('u_resolution', [w, h]); for (const k in uni) set(k, uni[k]);
            gl.drawArrays(gl.TRIANGLES, 0, 3); return c.toDataURL('image/png'); }""", [frag, uniforms, frame, fps, w, h])
        return np.asarray(Image.open(io.BytesIO(base64.b64decode(url.split(",", 1)[1]))).convert("RGB"))

    def generatif(self, opts, frame, w=540, h=960, fps=30):
        """Mode zona/mesh (CSS): -> array uint8 (h, w, 3), dirender sebagai elemen div."""
        self.pg.evaluate("""([o, frame, fps, w, h]) => { let e = document.getElementById('g'); if (!e) { e = document.createElement('div'); e.id = 'g'; document.body.appendChild(e); }
            e.style.cssText = 'position:fixed;left:0;top:0;width:' + w + 'px;height:' + h + 'px'; TK.generativeBg(e, frame, o, fps); }""", [opts, frame, fps, w, h])
        self.pg.set_viewport_size({"width": w, "height": h})
        return np.asarray(Image.open(io.BytesIO(self.pg.screenshot(clip={"x": 0, "y": 0, "width": w, "height": h}))).convert("RGB"))
