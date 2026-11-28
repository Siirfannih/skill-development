#!/usr/bin/env python3
"""golden_cek.py · bandingkan keyframe tiap beat dengan golden frame (style frame yang disetujui Irfan) per gaya.

  python3 tools/golden_cek.py --shotlist shotlist.json --beats qc/beats --golden merek/soalnya-gini/contoh/bagus \
      --tema kit/tema.ts --out qc/golden [--maks-luar-token 0.03]

golden.json di folder golden: [{"file": "A-hero.png", "gaya": "A-kolase", "visual_type": "kolase_hero",
                               "disetujui": "D-012", "catatan": "..."}]
Pemilihan golden per beat: beat.golden_ref (nama file) > (gaya, visual_type) sama > gaya sama (fallback, ditandai).

Angka di sini MENUNJUK apa yang perlu dilihat, bukan juri selera (cookbook/contoh-gagal 09–11: frame yang lulus cek
angka tetap ditolak saat dilihat). Putusan gaya tetap di mata penilai dengan lembar sanding `sanding.jpg`.
GAGAL keras (exit 1) hanya untuk hal yang benar-salah:
  KOSONG     frame hampir rata (std luma < 0,02): layar kosong/placeholder (Lantai D22)
  LUAR-TOKEN > --maks-luar-token piksel vivid (S>0,35, V>0,35) yang hue-nya > 25° dari semua warna vivid di tema.ts (C18a)
  TANPA-GOLDEN gaya beat tidak punya satu pun golden yang disetujui (golden frame wajib sebelum produksi)
PERLU-MATA (tidak menggagalkan, wajib dijawab penilai): selisih luma rata-rata > 0,15, kepadatan tepi > 1,8× atau
  < 0,45× golden (lebih ramai/kosong), golden fallback (visual_type tidak punya golden sendiri).
"""
import argparse, colorsys, json, re, sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

W = 360  # ukur di lebar 360 px: skala layar HP (Lantai A7 uji 360 px)


def img(p):
    im = Image.open(p).convert("RGB")
    return im.resize((W, round(im.height * W / im.width)))


def stats(im):
    a = np.asarray(im).astype(np.float32) / 255
    luma = a @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    gy, gx = np.gradient(luma)
    edge = float((np.hypot(gx, gy) > 0.08).mean())
    mx, mn = a.max(2), a.min(2)
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0); v = mx
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    h = (np.degrees(np.arctan2(np.sqrt(3) * (g - b), 2 * r - g - b)) + 360) % 360
    vivid = (s > 0.35) & (v > 0.35)
    return dict(luma=float(luma.mean()), std=float(luma.std()), edge=edge, hue=h[vivid], vivid=float(vivid.mean()), n=luma.size)


def token_hues(tema):
    hs = []
    for hx in re.findall(r"#([0-9A-Fa-f]{6})\b", Path(tema).read_text(encoding="utf-8")):
        r, g, b = (int(hx[i:i + 2], 16) / 255 for i in (0, 2, 4))
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        if s > 0.35 and 0.15 < l < 0.9:
            hs.append(h * 360)
    return np.array(hs)


def hue_dist(h, toks):
    if toks.size == 0:
        return np.full(h.shape, 180.0)
    d = np.abs(h[:, None] - toks[None, :]); d = np.minimum(d, 360 - d)
    return d.min(1)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--shotlist", required=True); ap.add_argument("--beats", required=True)
    ap.add_argument("--golden", required=True); ap.add_argument("--tema", required=True); ap.add_argument("--out", required=True)
    ap.add_argument("--maks-luar-token", type=float, default=0.03)
    a = ap.parse_args()
    sl = json.load(open(a.shotlist, encoding="utf-8")); gaya = sl.get("gaya")
    gidx = json.load(open(Path(a.golden) / "golden.json", encoding="utf-8"))
    gidx = [g for g in gidx if g.get("disetujui")]
    toks = token_hues(a.tema)
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    rows, rep, hard = [], [], 0
    for b in sorted(sl["beats"], key=lambda x: x["start_sec"]):
        bid = f"b{b['beat_id']:02d}"; fb = Path(a.beats) / f"{bid}.png"
        r = dict(beat=bid, visual_type=b.get("visual_type"), gagal=[], perlu_mata=[])
        cand = [g for g in gidx if g["file"] == b.get("golden_ref")] or \
               [g for g in gidx if g.get("gaya") == gaya and g.get("visual_type") == b.get("visual_type")]
        if not cand:
            cand = [g for g in gidx if g.get("gaya") == gaya]
            if cand: r["perlu_mata"].append("golden fallback: visual_type ini belum punya golden sendiri")
        if not fb.exists():
            r["gagal"].append(f"keyframe tidak ada: {fb}")
        if not cand:
            r["gagal"].append(f"TANPA-GOLDEN: gaya {gaya} belum punya golden frame yang disetujui")
        if fb.exists():
            ours = img(fb); so = stats(ours)
            if so["std"] < 0.02: r["gagal"].append(f"KOSONG: std luma {so['std']:.3f}")
            if so["hue"].size:
                luar = float((hue_dist(so["hue"], toks) > 25).sum()) / so["n"]
                r["luar_token"] = round(luar, 4)
                if luar > a.maks_luar_token: r["gagal"].append(f"LUAR-TOKEN: {luar:.1%} piksel vivid di luar palet tema.ts")
            if cand:
                g = cand[0]; gi = img(Path(a.golden) / g["file"]); sg = stats(gi)
                r["golden"] = g["file"]
                dl = so["luma"] - sg["luma"]; er = so["edge"] / max(sg["edge"], 1e-4)
                r.update(d_luma=round(dl, 3), rasio_tepi=round(er, 2))
                if abs(dl) > 0.15: r["perlu_mata"].append(f"terang rata-rata beda {dl:+.2f} dari golden")
                if er > 1.8: r["perlu_mata"].append(f"kepadatan tepi {er:.1f}x golden (lebih ramai)")
                if er < 0.45: r["perlu_mata"].append(f"kepadatan tepi {er:.2f}x golden (lebih kosong)")
                rows.append((bid, gi, ours, r))
        hard += bool(r["gagal"]); rep.append(r)
        print(f"{bid} {'GAGAL ' + '; '.join(r['gagal']) if r['gagal'] else 'ok'}"
              f"{' | PERLU-MATA ' + '; '.join(r['perlu_mata']) if r['perlu_mata'] else ''}")
    if rows:  # lembar sanding: golden kiri, keyframe kita kanan, satu baris per beat
        h = max(max(g.height, o.height) for _, g, o, _ in rows)
        sheet = Image.new("RGB", (2 * W + 30, len(rows) * (h + 24)), (18, 18, 18)); d = ImageDraw.Draw(sheet)
        for i, (bid, g, o, r) in enumerate(rows):
            y = i * (h + 24); d.text((6, y + 4), f"{bid} golden: {r.get('golden')}  |  kita", fill=(255, 220, 0))
            sheet.paste(g, (0, y + 20)); sheet.paste(o, (W + 30, y + 20))
        sheet.save(out / "sanding.jpg", quality=85)
    json.dump(rep, open(out / "golden.json", "w"), ensure_ascii=False, indent=1)
    print(f"{'FAIL' if hard else 'PASS'}: {hard} beat gagal keras; lembar sanding {out / 'sanding.jpg'} wajib dilihat penilai")
    sys.exit(1 if hard else 0)


if __name__ == "__main__":
    main()
