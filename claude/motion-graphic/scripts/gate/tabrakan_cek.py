#!/usr/bin/env python3
"""Gerbang tabrakan: teks menimpa teks, teks menimpa objek, teks keluar zona aman, diukur dari DOM frame HTML (bukan dari mata).

  python3 tabrakan_cek.py <frame.html | folder> [...] [--size 1920x1080] [--margin 0.05] [--ambang 0.02] [--json]

Dasar: KEBIJAKAN K3 (lapis L2 teks tidak boleh menimpa objek; "tabrakan? fokus tunggal?") dan LANTAI C15/F26a (tabrakan, zona aman). Dipakai bersama permukaan_cek.py
sebelum frame diserahkan. Butuh Python dengan Playwright (di PC server: ~/work/mg-venv/bin/python); tanpa Playwright keluar 2.

Cara kerja: tiap berkas dirender headless (Chromium) pada --size. Kotak teks = setiap simpul teks tak kosong lewat
Range.getClientRects, dikelompokkan per blok terdekat (elemen non-inline, atau elemen ber-`data-lapis="teks"` sebagai satu blok).
Kotak objek = elemen `data-lapis="objek"`, <img>, <svg>, <canvas>, <video>; teks di dalam <svg> dihitung bagian objek itu.
Objek penuh layar (>= 80 % kanvas) atau `data-lapis="latar"` dianggap latar, bukan penghalang. Ditandai:
  TEKS-TEKS    dua blok teks berbeda beririsan > ambang (2 %) dari blok yang lebih kecil (luas diukur per baris teks)
  TEKS-OBJEK   teks beririsan > ambang dengan objek yang BUKAN leluhurnya (label di dalam kartunya sendiri aman)
  TEPI         kotak teks keluar dari zona aman (5 % tiap sisi)
Elemen (atau leluhurnya) ber-`data-sengaja="tumpuk"` dikecualikan. Tiap berkas menulis `<nama>.tabrakan.png` (kotak merah = tabrakan,
oranye = di luar zona aman, garis biru putus = batas zona aman). Keluar: 0 bersih · 1 ada tabrakan · 2 Playwright/berkas bermasalah.
"""
import argparse, json, os, sys

try:
    from playwright.sync_api import sync_playwright
except Exception:  # pragma: no cover
    sync_playwright = None

JS = r"""
({W, H, margin, thr}) => {
  const SKIP = new Set(['SCRIPT','STYLE','TITLE','HEAD','NOSCRIPT','META','LINK']);
  const cs = el => getComputedStyle(el);
  const hidden = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = cs(e);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return true; } return false; };
  const invisibleText = el => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(cs(e).opacity);
    const f = cs(el).webkitTextFillColor || cs(el).color; const m = f.match(/rgba?\(([^)]*)\)/); const al = m && m[1].split(/[,\/ ]+/).filter(Boolean)[3];
    return o < 0.05 || f === 'transparent' || (al !== undefined && parseFloat(al) < 0.05); };
  const exempt = el => !!(el.closest && el.closest('[data-sengaja="tumpuk"]'));
  const label = el => (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''));
  const isBlock = el => { const d = cs(el).display; return d !== 'inline' && d !== 'contents' && !d.startsWith('ruby'); };
  const blocks = new Map();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    if (!n.nodeValue.trim()) continue;
    const p = n.parentElement; if (!p || SKIP.has(p.tagName) || p.closest('svg') || hidden(p) || invisibleText(p)) continue;
    let b = p.closest('[data-lapis="teks"]');
    if (!b) { b = p; while (b && !isBlock(b)) b = b.parentElement; }
    if (!b) continue;
    const r = document.createRange(); r.selectNodeContents(n);
    const rects = [...r.getClientRects()].filter(q => q.width > 0.5 && q.height > 0.5)
      .map(q => ({x: q.left, y: q.top, w: q.width, h: q.height}));
    if (!rects.length) continue;
    const e = blocks.get(b) || {el: b, rects: [], text: ''};
    e.rects.push(...rects); e.text += n.nodeValue.trim() + ' '; blocks.set(b, e);
  }
  const T = [...blocks.values()].filter(t => !exempt(t.el)).map(t => {
    const x0 = Math.min(...t.rects.map(q => q.x)), y0 = Math.min(...t.rects.map(q => q.y));
    const x1 = Math.max(...t.rects.map(q => q.x + q.w)), y1 = Math.max(...t.rects.map(q => q.y + q.h));
    return {el: t.el, rects: t.rects, box: {x: x0, y: y0, w: x1 - x0, h: y1 - y0}, area: t.rects.reduce((s, q) => s + q.w * q.h, 0),
            name: label(t.el), text: t.text.trim().slice(0, 40)};
  });
  const objs = new Set(document.querySelectorAll('[data-lapis="objek"], img, svg, canvas, video'));
  const O = [];
  for (const el of objs) {
    if (el.parentElement && el.parentElement.closest('svg') && el.tagName !== 'svg') continue;
    if (el.tagName === 'svg' && el.parentElement && el.parentElement.closest('svg')) continue;
    if (hidden(el) || exempt(el) || el.closest('[data-lapis="latar"]')) continue;
    const q = el.getBoundingClientRect(); if (q.width < 1 || q.height < 1) continue;
    if (q.width * q.height >= 0.8 * W * H) continue;
    O.push({el, box: {x: q.left, y: q.top, w: q.width, h: q.height}, name: label(el)});
  }
  const inter = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const sumInter = (rs, b) => rs.reduce((s, q) => s + inter(q, b), 0);
  const out = [];
  for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) {
    const a = T[i], b = T[j]; let s = 0;
    for (const q of a.rects) s += sumInter(b.rects, q);
    const m = Math.min(a.area, b.area);
    if (m > 0 && s / m > thr) out.push({jenis: 'TEKS-TEKS', a: a.name + ' "' + a.text + '"', b: b.name + ' "' + b.text + '"', rasio: s / m, boxes: [a.box, b.box]});
  }
  for (const t of T) for (const o of O) {
    if (o.el.contains(t.el) || t.el.contains(o.el)) continue;
    const s = sumInter(t.rects, o.box);
    if (t.area > 0 && s / t.area > thr) out.push({jenis: 'TEKS-OBJEK', a: t.name + ' "' + t.text + '"', b: o.name, rasio: s / t.area, boxes: [t.box, o.box]});
  }
  const sx = W * margin, sy = H * margin;
  for (const t of T) {
    const b = t.box;
    if (b.x < sx - 1 || b.y < sy - 1 || b.x + b.w > W - sx + 1 || b.y + b.h > H - sy + 1)
      out.push({jenis: 'TEPI', a: t.name + ' "' + t.text + '"', b: 'zona aman', rasio: 1, boxes: [b]});
  }
  return {temuan: out, teks: T.length, objek: O.length};
}
"""

OVERLAY = r"""
({items, W, H, margin}) => {
  const d = document.createElement('div'); d.style.cssText = 'position:absolute;left:0;top:0;width:'+W+'px;height:'+H+'px;pointer-events:none;z-index:2147483647';
  const box = (b, css, txt) => { const e = document.createElement('div');
    e.style.cssText = 'position:absolute;box-sizing:border-box;left:'+b.x+'px;top:'+b.y+'px;width:'+b.w+'px;height:'+b.h+'px;'+css;
    if (txt) { const l = document.createElement('span'); l.textContent = txt;
      l.style.cssText = 'position:absolute;left:0;top:-22px;background:#e11;color:#fff;font:700 16px/20px sans-serif;padding:0 6px'; e.appendChild(l); } d.appendChild(e); };
  box({x: W*margin, y: H*margin, w: W*(1-2*margin), h: H*(1-2*margin)}, 'border:2px dashed #2a6df4');
  items.forEach((it, i) => it.boxes.forEach((b, k) => box(b, 'border:4px solid ' + (it.jenis === 'TEPI' ? '#f80' : '#e11'), k === 0 ? '#' + (i + 1) + ' ' + it.jenis : '')));
  document.documentElement.appendChild(d);
}
"""


def kumpul(paths):
    for p in paths:
        if os.path.isfile(p): yield p; continue
        for root, dirs, files in os.walk(p):
            dirs[:] = sorted(d for d in dirs if d not in ("node_modules", ".git"))
            for f in sorted(files):
                if f.lower().endswith((".html", ".htm")): yield os.path.join(root, f)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Gerbang tabrakan teks/objek")
    ap.add_argument("paths", nargs="+"); ap.add_argument("--size", default="1920x1080")
    ap.add_argument("--margin", type=float, default=0.05); ap.add_argument("--ambang", type=float, default=0.02)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)
    if sync_playwright is None:
        print("Playwright tidak terpasang di python ini (PC: ~/work/mg-venv/bin/python)", file=sys.stderr); return 2
    try: W, H = (int(x) for x in a.size.lower().split("x"))
    except ValueError: print("--size harus WxH", file=sys.stderr); return 2
    files = [f for f in kumpul(a.paths)]
    if not files: print("tidak ada berkas html", file=sys.stderr); return 2
    total, report = 0, []
    with sync_playwright() as pw:
        br = pw.chromium.launch(args=["--no-sandbox"])
        for f in files:
            pg = br.new_page(viewport={"width": W, "height": H})
            try:
                pg.goto("file://" + os.path.abspath(f)); pg.wait_for_load_state("load")
                try: pg.evaluate("document.fonts.ready.then(() => 1)")
                except Exception: pass
                pg.wait_for_timeout(150)
                r = pg.evaluate(JS, {"W": W, "H": H, "margin": a.margin, "thr": a.ambang})
                png = os.path.splitext(f)[0] + ".tabrakan.png"
                if r["temuan"]: pg.evaluate(OVERLAY, {"items": r["temuan"], "W": W, "H": H, "margin": a.margin})
                pg.screenshot(path=png, clip={"x": 0, "y": 0, "width": W, "height": H})
            except Exception as e:
                print(f"{f}: gagal render: {e}", file=sys.stderr); br.close(); return 2
            finally:
                pg.close()
            total += len(r["temuan"]); report.append({"file": f, "png": png, **{k: r[k] for k in ("teks", "objek", "temuan")}})
        br.close()
    if a.json: print(json.dumps(report, ensure_ascii=False, indent=1))
    else:
        for rp in report:
            print(f"{rp['file']}  teks={rp['teks']} objek={rp['objek']} tabrakan={len(rp['temuan'])}  -> {rp['png']}")
            for i, t in enumerate(rp["temuan"], 1): print(f"  #{i} {t['jenis']:<10} {t['a']}  x  {t['b']}  ({t['rasio']*100:.0f}%)")
        print(f"\nringkasan: {len(report)} berkas, {total} tabrakan")
        print("GAGAL tabrakan: geser teks/objek (atau beri data-sengaja=\"tumpuk\" bila sengaja)." if total else "LULUS tabrakan")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
