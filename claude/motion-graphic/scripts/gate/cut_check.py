#!/usr/bin/env python3
"""Gerbang potongan suara (gerbang 6, Lantai E23; Irfan 15 Nov): sebelum suara dikunci, potongan harus bersih dari
kata sampah dan diam saat pembicara berpikir — termasuk diam yang ditelan transkrip ke dalam durasi kata.

Gagal yang membentuk gerbang ini: builder-trap-r2 v1–v2. Pemotong lama hanya membuang jeda < -45 dB >= 0,30 dtk;
lantai noise kamar -38 dB sehingga diam tidak terdeteksi, "tuh" x3 lolos ke teks layar, dan 24 kata menyimpan
diam 0,15–0,45 dtk di dalam rentangnya (Whisper menelan jeda ke durasi kata). Irfan: "harusnya dari cut editornya
sudah diperiksa supaya intonasi suara, keterbacaan jelas dan tidak ada jeda waktu aku mikir atau diem".

Mengukur suara (stem suara atau suara terkunci) + kata per kata (timeline yang sama):
  - sampah   : kata yang cocok --filler (default: eee/emm/eh/hmm/uh/ah/um/tuh) -> FAIL
  - diam_kata: diam >= --max-inner dtk (default 0,15) DI DALAM rentang satu kata -> FAIL
  - diam_kal : celah antarkata di tengah kalimat (kata sebelumnya tanpa . ? !) >= --max-inner -> FAIL
  - antar_kal: celah antarkalimat > --max-sentence dtk (default 0,50; target ±0,28, aturan 33) -> FAIL
  - gumam    : bunyi bersuara >= 0,15 dtk di luar kata (calon "eee" yang tidak tertranskrip) -> PERIKSA (dengar)
"Diam" = energi 10 ms < max(median ucapan - 18 dB, lantai noise (persentil 10) + 8 dB): relatif, dan tidak jatuh
di bawah dengung kamar (gagal 15 Nov: ambang -46 dB di kamar -38 dB melewatkan diam berisi dengung).

Pakai:
  python3 cut_check.py suara.wav words.json [--filler "eee,emm,tuh"] [--suggest potong.json]
--suggest menulis usulan rentang buang [[mulai, akhir, alasan], ...]: diam disisakan 0,06 dtk (tengah kalimat) atau
0,28 dtk (antarkalimat); kata sampah dibuang dari awal kata sampai awal kata berikutnya (sisa 0,04 dtk).
Usulan wajib didengar sebelum dipakai (`scripts/audio/recut.py` menerapkannya + peta waktu). Exit 1 bila gagal.
"""
import argparse, json, re, sys
import numpy as np
import soundfile as sf

DEF_FILL = "e,ee,eee,eeee,em,emm,emmm,eh,ehm,hmm,hm,uh,uhm,ah,um,umm,mm,tuh"


def load_words(p):
    d = json.load(open(p))
    d = d if isinstance(d, list) else (d.get("words") or [])
    out = []
    for q in d:
        s = q.get("s", q.get("start")); e = q.get("e", q.get("end")); w = q.get("w", q.get("word", ""))
        if s is not None and e is not None:
            out.append(dict(w=str(w).strip(), s=float(s), e=float(e)))
    return sorted(out, key=lambda q: q["s"])


def runs(mask, min_len):
    out, st = [], None
    for i, v in enumerate(list(mask) + [False]):
        if v and st is None: st = i
        if not v and st is not None:
            if i - st >= min_len: out.append((st, i))
            st = None
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("audio"); ap.add_argument("words")
    ap.add_argument("--filler", default=DEF_FILL)
    ap.add_argument("--max-inner", type=float, default=0.15)
    ap.add_argument("--max-sentence", type=float, default=0.50)
    ap.add_argument("--suggest")
    a = ap.parse_args()
    x, sr = sf.read(a.audio, always_2d=True); x = x.mean(1)
    hop = int(sr * 0.01)
    db = 20 * np.log10(np.array([np.sqrt(np.mean(x[i:i + hop] ** 2)) + 1e-9 for i in range(0, len(x) - hop, hop)]))
    W = load_words(a.words)
    speech = float(np.median(np.concatenate([db[int(q["s"] * 100):int(q["e"] * 100)] for q in W])))
    floor = float(np.percentile(db, 10))
    thr = max(speech - 18, floor + 8)  # di kamar ber-noise, median−18 bisa jatuh di bawah lantai noise (builder-trap-r2: −46 vs kamar −38)
    quiet = db < thr
    fill = {f.strip().lower() for f in a.filler.split(",") if f.strip()}
    clean = lambda w: re.sub(r"[^\wÀ-ɏ-]", "", w.lower())
    found, sug = [], []
    mi = int(a.max_inner * 100)
    for k, q in enumerate(W):
        if clean(q["w"]) in fill:
            nxt = W[k + 1]["s"] if k + 1 < len(W) else q["e"]
            found.append(("sampah", round(q["s"], 2), q["w"]))
            sug.append([round(q["s"] - 0.01, 3), round(max(q["s"], nxt - 0.04), 3), f"sampah '{q['w']}'"])
            continue
        i0, i1 = int(q["s"] * 100), int(q["e"] * 100)
        for r0, r1 in runs(quiet[i0:i1], mi):
            if r0 == 0 or r1 == i1 - i0: continue  # tepi kata = celah antarkata, dinilai di bawah
            t0, t1 = (i0 + r0) / 100, (i0 + r1) / 100
            found.append(("diam_kata", round(t0, 2), f"{q['w']} {t1 - t0:.2f} dtk"))
            sug.append([round(t0 + 0.03, 3), round(t1 - 0.03, 3), f"diam di dalam '{q['w']}'"])
    for p, q in zip(W, W[1:]):
        g0, g1 = int(p["e"] * 100), int(q["s"] * 100)
        # celah nyata = bagian diam di antara kedua kata (+ ekor diam di ujung kata)
        a0 = g0
        while a0 > int(p["s"] * 100) and quiet[a0 - 1]: a0 -= 1
        b0 = g1
        while b0 < int(q["e"] * 100) and b0 < len(quiet) and quiet[b0]: b0 += 1
        gap = (b0 - a0) / 100
        end = bool(re.search(r"[.?!]$", p["w"]))
        lim, keep = (a.max_sentence, 0.28) if end else (a.max_inner, 0.06)
        if gap >= lim:
            found.append(("antar_kal" if end else "diam_kal", round(a0 / 100, 2), f"{p['w']} → {q['w']} {gap:.2f} dtk"))
            m = (a0 + b0) / 200
            sug.append([round(m - (gap - keep) / 2, 3), round(m + (gap - keep) / 2, 3), f"jeda {'antarkalimat' if end else 'tengah kalimat'} {p['w']}→{q['w']}"])
    cov = np.zeros(len(db), bool)
    for q in W: cov[int(q["s"] * 100):int(q["e"] * 100) + 1] = True
    hum = [(r0 / 100, (r1 - r0) / 100) for r0, r1 in runs((db > speech - 8) & ~cov, 15)]
    by = {}
    for kind, t, info in found: by.setdefault(kind, []).append((t, info))
    print(f"kata {len(W)} · ucapan median {speech:.1f} dBFS · lantai {floor:.1f} · ambang diam {thr:.1f} dBFS")
    for kind in ("sampah", "diam_kata", "diam_kal", "antar_kal"):
        items = by.get(kind, [])
        print(f"  {kind:9s} {len(items):3d}  " + "; ".join(f"{t}s {i}" for t, i in items[:8]) + (" …" if len(items) > 8 else ""))
    print(f"  gumam     {len(hum):3d}  " + "; ".join(f"{t:.2f}s {d:.2f}dtk" for t, d in hum[:8]) + "  (PERIKSA: dengar)")
    if a.suggest:
        sug = sorted(s for s in sug if s[1] > s[0])
        json.dump(sug, open(a.suggest, "w"), ensure_ascii=False, indent=0)
        print(f"usulan buang {len(sug)} rentang, total {sum(s[1] - s[0] for s in sug):.2f} dtk -> {a.suggest}")
    fails = [k for k in ("sampah", "diam_kata", "diam_kal", "antar_kal") if by.get(k)]
    print("PASS" if not fails else "FAIL: " + ", ".join(f"{k} {len(by[k])}" for k in fails))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
