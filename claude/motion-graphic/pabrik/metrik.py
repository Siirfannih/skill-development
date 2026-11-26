"""metrik.py: analisis probe DOM teks pada render demo (dosa j: teks tertutup/terpotong/tabrakan selama gerak).

Pabrik primitif gerak tidak memakai metrik kemiripan TAMPILAN (SSIM, struktur, palet); kecocokan gerak ada di gerak.py.
analisis_probe(items, w, h)   teks keluar frame dan tabrakan teks-teks/teks-objek pada satu frame.
analisis_oklusi(per_frame)    teks tertutup elemen lain (> 10 % titik sampel) atau keluar kotak wadahnya, per frame.
"""


def analisis_probe(items, w, h, teks_min_px=24.0, tumpang_min=0.05):
    """items: daftar elemen dari probe satu frame: {tag, teks, x, y, w, h, fs, op}. Hanya teks yang terlihat (op >= 0.9 dan titik tengahnya tidak tertutup elemen lain: `vis`).
    -> {kecil: [...], tabrakan: [...], terpotong: [...]}; ukuran font diskalakan ke 1080 sisi pendek."""
    skala = 1080.0 / min(w, h); T = [i for i in items if i.get("teks", "").strip() and i.get("op", 1) >= 0.9 and i.get("vis", True) and i["w"] > 1 and i["h"] > 1]
    kecil = [f"'{t['teks'][:24]}' {t['fs'] * skala:.1f}px@1080" for t in T if t["fs"] * skala < teks_min_px]
    terpotong = []
    for t in T:
        ix = max(0, min(t["x"] + t["w"], w) - max(t["x"], 0)) * max(0, min(t["y"] + t["h"], h) - max(t["y"], 0))
        if ix < 0.9 * t["w"] * t["h"]: terpotong.append(f"'{t['teks'][:24]}' keluar frame")
    tab = []
    for i in range(len(T)):
        for j in range(i + 1, len(T)):
            a, b = T[i], T[j]
            if len(a["teks"].strip()) <= 1 and len(b["teks"].strip()) <= 1: continue  # animasi per huruf: huruf tunggal boleh bersinggungan saat bergerak
            ox = max(0, min(a["x"] + a["w"], b["x"] + b["w"]) - max(a["x"], b["x"])); oy = max(0, min(a["y"] + a["h"], b["y"] + b["h"]) - max(a["y"], b["y"]))
            if ox * oy > tumpang_min * min(a["w"] * a["h"], b["w"] * b["h"]): tab.append(f"'{a['teks'][:18]}' x '{b['teks'][:18]}'")
    for t in T:  # teks vs objek grafis (svg/img/canvas) yang bukan leluhurnya
        for o in items:
            if o.get("tag") in ("svg", "img", "canvas") and o["w"] > 1 and o["w"] * o["h"] < 0.5 * w * h:  # bidang >= 50 % frame = latar/footage, bukan objek
                ox = max(0, min(t["x"] + t["w"], o["x"] + o["w"]) - max(t["x"], o["x"])); oy = max(0, min(t["y"] + t["h"], o["y"] + o["h"]) - max(t["y"], o["y"]))
                if ox * oy > 0.3 * t["w"] * t["h"] and not o.get("isi_teks"): tab.append(f"'{t['teks'][:18]}' x <{o['tag']}>")
    return {"kecil": kecil, "tabrakan": tab, "terpotong": terpotong}


# ---------- oklusi teks (dosa j dan o), dari probe DOM v2 ----------
def analisis_oklusi(per_frame, tumpang_j=0.10, tumpang_o=0.02):
    """per_frame: {frame: [item teks]}; item punya teks, op, tutup (bagian titik sampel teks yang tertutup elemen lain 0..1),
    tutup_objek (bagian yang tertutup elemen BUKAN teks), wadah_keluar (teks melewati kotak wadahnya).
    j: tertutup > tumpang_j atau keluar wadah; o: elemen non-teks di atas teks (tutup_objek >= tumpang_o) pada frame mana pun.
    -> {'j': [...], 'o': [...]} (pesan; kosong = bersih)."""
    j, o = [], []
    for f in sorted(per_frame):
        for t in per_frame[f]:
            if t.get("op", 1) < 0.9 or not t.get("teks", "").strip(): continue
            nm = t["teks"][:22]
            if t.get("tutup", 0) > tumpang_j: j.append(f"f{f}: '{nm}' tertutup {t['tutup'] * 100:.0f}%")
            if t.get("wadah_keluar"): j.append(f"f{f}: '{nm}' keluar kotak wadahnya")
            if t.get("tutup_objek", 0) >= tumpang_o: o.append(f"f{f}: lapisan non-teks di atas '{nm}' ({t['tutup_objek'] * 100:.0f}% titik)")
    return {"j": j, "o": o}
