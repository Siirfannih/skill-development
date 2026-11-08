#!/usr/bin/env python3
"""Storyboard visual: render panel HTML -> PNG, susun papan (pola kanvas Wonder), lalu periksa (Irfan 8 Nov).

Isi folder storyboard (contoh di templates/storyboard/):
  beats.json      proyek, format, babak (musik per babak), beats (VO, aksi, kamera, keluar, sfx[peran,alasan])
  tokens.css      peran warna + font sebagai CSS variable (satu sumber untuk semua panel)
  panels/<id>.html, atau <id>-1.html, <id>-2.html ... untuk gerak yang butuh beberapa frame

Pakai:
  python3 board.py <folder> --skeleton   buat panel kerangka untuk beat yang belum punya file
  python3 board.py <folder>              render + papan + periksa; exit 1 bila ada yang gagal
Hasil: png/<frame>.png, board.html, board.png, cues.json (bahan cue sheet SFX), check.json

Yang diperiksa (dari umpan balik Irfan di sesi storyboard Wonder 1–7 Nov dan aturan motion-graphic):
  - setiap beat punya frame; tidak ada kerangka tersisa (data-skeleton)
  - caption lengkap: vo, aksi, kamera, keluar; setiap sfx dan musik babak punya peran + alasan
  - waktu beat berurutan, tidak tumpang tindih, celah <= 0,5 dtk
  - teks layar (elemen data-layar): satu baris, tanpa tanda baca, tidak keluar frame
  - tidak ada elemen yang terpotong tepi frame kecuali ditandai data-bleed (sengaja keluar frame)
"""
import argparse, html, json, re, sys
from pathlib import Path

PUNCT = re.compile(r"[.,!?;:…]")
CAPTION_KEYS = ("vo", "aksi", "kamera", "keluar")

PROBE = """() => {
  const W = document.documentElement.clientWidth, H = document.documentElement.clientHeight, out = [];
  for (const el of document.querySelectorAll('[data-layar]')) {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    let lh = parseFloat(cs.lineHeight); if (isNaN(lh)) lh = parseFloat(cs.fontSize) * 1.2;
    out.push({kind: 'layar', text: el.innerText.trim(), lines: Math.round(r.height / lh),
              out: r.left < -1 || r.top < -1 || r.right > W + 1 || r.bottom > H + 1});
  }
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('[data-bleed]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.left < -2 || r.top < -2 || r.right > W + 2 || r.bottom > H + 2)
      out.push({kind: 'clip', label: el.dataset.label || el.tagName.toLowerCase()});
  }
  out.push({kind: 'skeleton', n: document.querySelectorAll('[data-skeleton]').length});
  return out;
}"""

SKELETON = """<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../tokens.css"></head>
<body class="frame"><div data-skeleton data-label="{label}" style="position:absolute;inset:8%;border:2px dashed #999;
display:flex;align-items:center;justify-content:center;font:600 32px sans-serif;color:#999">{label}</div></body></html>
"""


def frames_of(sb, beat):
    p = sb / "panels"
    one = p / f"{beat['id']}.html"
    many = sorted(p.glob(f"{beat['id']}-*.html"), key=lambda f: int(re.sub(r"\D", "", f.stem.split("-")[-1]) or 0))
    return ([one] if one.exists() else []) + many


def caption_html(b, babak):
    sfx = "".join(f"<li><b>{c.get('t', '')}</b> {html.escape(c.get('peran', ''))} — {html.escape(c.get('alasan', ''))}</li>"
                  for c in b.get("sfx", []))
    t = b.get("t", ["?", "?"])
    return (f"<div class='cap'><div class='hd'><span class='id'>{b['id']}</span><span class='bk'>"
            f"{html.escape(babak.get('id', ''))} {html.escape(babak.get('nama', ''))}</span>"
            f"<span class='tm'>{t[0]}–{t[1]} dtk</span></div>"
            f"<div class='vo'>“{html.escape(b.get('vo', ''))}”</div><div class='ak'>{html.escape(b.get('aksi', ''))}</div>"
            f"<div class='mt'><span><b>Kamera</b> {html.escape(b.get('kamera', ''))}</span>"
            f"<span><b>Keluar</b> {html.escape(b.get('keluar', ''))}</span></div><ul class='sfx'>{sfx}</ul></div>")


BOARD_CSS = """body{margin:0;width:max-content;min-width:100%;background:#f2f2f0;font-family:Inter,system-ui,sans-serif;color:#151515}
.row{display:flex;gap:40px;padding:40px;align-items:flex-start}.rowhd{padding:24px 40px 0;font:700 22px Inter,sans-serif}
.rowhd small{font-weight:500;color:#666;margin-left:12px}
.panel{background:#fff;border:1px solid #ddd;border-radius:16px;overflow:hidden;width:VARWpx;flex:none}
.frames{display:flex;gap:6px;background:#ddd}.frames img{display:block;width:100%;min-width:0;flex:1}
.cap{padding:16px 18px;font-size:14px;line-height:1.4}.hd{display:flex;gap:10px;align-items:center}
.id{background:#151515;color:#fff;font-weight:700;border-radius:6px;padding:1px 8px}.bk{color:#666;font-weight:600;letter-spacing:.06em}
.tm{margin-left:auto;color:#666}.vo{font-size:18px;margin:8px 0 4px}.ak{color:#444}.mt{display:flex;gap:18px;margin-top:8px;font-size:13px}
.sfx{margin:8px 0 0;padding-left:18px;font-size:13px;color:#333}"""


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder")
    ap.add_argument("--skeleton", action="store_true")
    ap.add_argument("--panel-width", type=int, default=0, help="lebar panel di papan (default: 480 untuk 9:16, 640 untuk 16:9)")
    a = ap.parse_args()
    sb = Path(a.folder).resolve()
    spec = json.loads((sb / "beats.json").read_text(encoding="utf-8"))
    W, H = spec["format"]["w"], spec["format"]["h"]
    babak = {k["id"]: k for k in spec.get("babak", [])}
    beats = spec["beats"]
    fails, notes = [], []

    if a.skeleton:
        (sb / "panels").mkdir(exist_ok=True)
        for b in beats:
            if not frames_of(sb, b):
                (sb / "panels" / f"{b['id']}.html").write_text(SKELETON.format(label=f"Panel {b['id']}"), encoding="utf-8")
                print("kerangka", b["id"])
        return

    # --- isi beats.json
    prev_end = None
    for b in beats:
        miss = [k for k in CAPTION_KEYS if not str(b.get(k, "")).strip()]
        if miss:
            fails.append(f"{b['id']}: caption kosong {', '.join(miss)}")
        for c in b.get("sfx", []):
            if not c.get("peran", "").strip() or not c.get("alasan", "").strip():
                fails.append(f"{b['id']}: sfx {c.get('t', '?')} tanpa peran/alasan")
        if b.get("babak") not in babak:
            fails.append(f"{b['id']}: babak '{b.get('babak')}' tidak ada di daftar babak")
        t = b.get("t")
        if not t or len(t) != 2 or t[1] <= t[0]:
            fails.append(f"{b['id']}: waktu tidak valid {t}")
        else:
            if prev_end is not None and t[0] < prev_end - 0.01:
                fails.append(f"{b['id']}: tumpang tindih dengan beat sebelumnya ({t[0]} < {prev_end})")
            if prev_end is not None and t[0] - prev_end > 0.5:
                fails.append(f"{b['id']}: celah {t[0] - prev_end:.2f} dtk tanpa beat")
            prev_end = t[1]
    for k in babak.values():
        m = k.get("musik") or {}
        if not m.get("peran", "").strip() or not m.get("alasan", "").strip():
            fails.append(f"babak {k['id']}: musik tanpa peran/alasan")

    # --- render
    from playwright.sync_api import sync_playwright
    (sb / "png").mkdir(exist_ok=True)
    rendered = {}
    with sync_playwright() as p:
        br = p.chromium.launch()
        pg = br.new_page(viewport={"width": W, "height": H})
        for b in beats:
            fr = frames_of(sb, b)
            if not fr:
                fails.append(f"{b['id']}: belum ada panel (panels/{b['id']}.html)")
                continue
            rendered[b["id"]] = []
            for f in fr:
                pg.goto(f.as_uri())
                pg.wait_for_timeout(150)
                for r in pg.evaluate(PROBE):
                    if r["kind"] == "skeleton" and r["n"]:
                        fails.append(f"{f.stem}: kerangka masih ada ({r['n']})")
                    elif r["kind"] == "layar":
                        if r["lines"] > 1:
                            fails.append(f"{f.stem}: teks layar {r['lines']} baris: '{r['text'][:40]}'")
                        if PUNCT.search(r["text"]):
                            fails.append(f"{f.stem}: tanda baca di teks layar: '{r['text'][:40]}'")
                        if r["out"]:
                            fails.append(f"{f.stem}: teks layar keluar frame: '{r['text'][:40]}'")
                    elif r["kind"] == "clip":
                        notes.append(f"{f.stem}: {r['label']} terpotong tepi (beri data-bleed bila sengaja)")
                out = sb / "png" / f"{f.stem}.png"
                pg.screenshot(path=str(out))
                rendered[b["id"]].append(out.name)
        # --- papan: satu baris per babak, beat kiri ke kanan (new-design-arrange Wonder)
        pw = a.panel_width or (480 if H > W else 640)
        rows = []
        for bid, k in babak.items():
            cells = []
            for b in [x for x in beats if x.get("babak") == bid]:
                imgs = "".join(f"<img src='png/{n}'>" for n in rendered.get(b["id"], []))
                n = max(1, len(rendered.get(b["id"], [])))
                cells.append(f"<div class='panel' style='width:{pw * n + 6 * (n - 1)}px'><div class='frames'>{imgs}</div>"
                             f"{caption_html(b, k)}</div>")
            m = k.get("musik") or {}
            rows.append(f"<div class='rowhd'>{html.escape(bid)} {html.escape(k.get('nama', ''))}"
                        f"<small>musik: {html.escape(m.get('peran', ''))} — {html.escape(m.get('alasan', ''))}</small></div>"
                        f"<div class='row'>{''.join(cells)}</div>")
        doc = (f"<!doctype html><html><head><meta charset='utf-8'><title>{html.escape(spec.get('project', 'Storyboard'))}"
               f"</title><style>{BOARD_CSS.replace('VARW', str(pw))}</style></head><body>"
               f"<div class='rowhd' style='font-size:28px'>{html.escape(spec.get('project', ''))}"
               f"<small>{W}×{H} · {len(beats)} beat</small></div>{''.join(rows)}</body></html>")
        (sb / "board.html").write_text(doc, encoding="utf-8")
        pg2 = br.new_page(viewport={"width": 1600, "height": 900})
        pg2.goto((sb / "board.html").as_uri())
        pg2.wait_for_timeout(300)
        pg2.set_viewport_size({"width": max(1600, pg2.evaluate("document.documentElement.scrollWidth")), "height": 900})
        pg2.screenshot(path=str(sb / "board.png"), full_page=True)
        br.close()

    cues = [dict(c, beat=b["id"]) for b in beats for c in b.get("sfx", [])]
    (sb / "cues.json").write_text(json.dumps({"cues": cues}, ensure_ascii=False, indent=1), encoding="utf-8")
    (sb / "check.json").write_text(json.dumps({"fails": fails, "notes": notes}, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(beats)} beat · {sum(len(v) for v in rendered.values())} frame · {len(cues)} cue SFX → board.html, board.png, cues.json")
    for n in notes[:12]:
        print("  catatan:", n)
    print("PASS" if not fails else "FAIL:\n  " + "\n  ".join(fails[:30]))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
