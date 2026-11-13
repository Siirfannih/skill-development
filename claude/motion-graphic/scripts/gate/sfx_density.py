#!/usr/bin/env python3
"""Gerbang aturan 43 (Irfan 13 Nov): SFX menandai momen cerita dan gerak yang terlihat, kepadatan dari kiblat,
tanpa bunyi per kata dan tanpa spam. Hening yang disengaja boleh.

FAIL bila:
  - kepadatan  : cue/dtk > --max-density (default 1,2) atau > 1,5 x --ref-density (SFX berlabel di kiblat, bukan onset musiknya)
  - per kata   : cue berperan kata/word/tick lebih dari 8, atau > 20 % cue (bunyi per kata = lapisan klik)
  - rentetan   : > 5 cue dalam jendela 2 dtk (rentetan sejenis dibuat satu cue panjang, mis. rattle)
  - dengar     : cue tanpa `dengar` (label earshot describe file itu) — file harus didengar sebelum dipakai
  - peran      : cue tanpa `peran` dan `alasan`
  - spam       : whoosh < 1 dtk; file sama diulang < 1 dtk (kecuali ketik)
DILAPORKAN saja (bukan syarat lulus): cakupan event visual dan celah tanpa SFX — beri --min-coverage/--max-gap
bila kiblat memang padat bunyi.

Pakai:
  python3 sfx_density.py render.mp4 cues.json [--ref-density 0.65] [--max-density 1.2] [--min-coverage 0] [--max-gap 0]
cues: JSON list [{"t": detik, ...}] atau {"cues": [...]} / {"placed": [...]}; atau tabel Markdown yang kolom
pertamanya detik (| 12.40 | ...). Exit 1 bila ada yang gagal.
Gagal yang membentuk gerbang ini: V5 8 Nov (terlalu jarang) lalu builder-trap-r2 v1 12 Nov (324 cue/95 dtk, 220 klik per kata,
lulus versi lama padahal berisik: Irfan 13 Nov).
"""
import argparse, json, re, subprocess, sys
import numpy as np

FPS, W, H = 30, 192, 108


def load_cues(path):
    """Kembalikan list dict {t, peran, alasan, file}. Tabel Markdown: kolom pertama detik; kolom lain dicari
    lewat judul (peran/role, alasan/reason/terikat, file)."""
    txt = open(path, encoding="utf-8").read()
    if path.endswith(".md"):
        out, head = [], None
        for line in txt.splitlines():
            cells = [c.strip().strip("`") for c in line.strip().strip("|").split("|")]
            if not line.strip().startswith("|") or len(cells) < 2:
                continue
            if re.match(r"^[0-9]+(?:[.,][0-9]+)?$", cells[0]):
                row = dict(zip(head or [], cells)) if head else {}
                pick = lambda *ks: next((v for k, v in row.items() for q in ks if q in k.lower()), "")
                out.append(dict(t=float(cells[0].replace(",", ".")), peran=pick("peran", "role"),
                                alasan=pick("alasan", "reason"), file=pick("file"), dengar=pick("dengar", "earshot")))
            elif not set(cells[0]) <= set("-: "):
                head = cells
        return sorted(out, key=lambda c: c["t"])
    d = json.loads(txt)
    if isinstance(d, dict):
        d = d.get("cues") or d.get("placed") or d.get("sfx") or []
    out = []
    for c in d:
        if not isinstance(c, dict):
            out.append(dict(t=float(c), peran="", alasan="", file="", dengar="")); continue
        t = c.get("t", c.get("time", c.get("start")))
        if t is None:
            continue
        out.append(dict(t=float(t), peran=str(c.get("peran") or c.get("role") or ""),
                        alasan=str(c.get("alasan") or c.get("reason") or ""),
                        file=str(c.get("file") or c.get("src") or c.get("path") or ""),
                        dengar=str(c.get("dengar") or c.get("earshot") or "")))
    return sorted(out, key=lambda c: c["t"])


WHOOSH = re.compile(r"whoosh|woosh|swoosh|swish|whip|transisi|transition", re.I)


def spam_check(cues):
    """Batas spam (Irfan 8 Nov): whoosh maks 1 per detik; file sama tidak diulang < 1 dtk kecuali kata kinetik."""
    issues = []
    wh = [c for c in cues if WHOOSH.search(c["peran"] + " " + c["file"])]
    for a, b in zip(wh, wh[1:]):
        if b["t"] - a["t"] < 1.0:
            issues.append(f"whoosh {a['t']:.2f} & {b['t']:.2f} dtk (< 1 dtk)")
    last = {}
    for c in cues:
        f = c["file"]
        if f and not re.search(r"kata|kinetik|word|typing|ketik", c["peran"], re.I):
            if f in last and c["t"] - last[f] < 1.0:
                issues.append(f"file sama {f.split('/')[-1]} di {last[f]:.2f} & {c['t']:.2f} dtk")
            last[f] = c["t"]
    return issues


def visual_events(video):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", video, "-vf", f"fps={FPS},scale={W}:{H},format=gray",
                          "-f", "rawvideo", "-"], capture_output=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
    d = np.abs(np.diff(fr, axis=0)).mean((1, 2))
    on = np.maximum(0, d - np.concatenate([[0], d[:-1]]))
    thr = np.median(on) + 3 * np.median(np.abs(on - np.median(on))) + 0.6
    ev = [i + 1 for i in range(1, len(on) - 1) if on[i] > thr and on[i] >= on[i - 1] and on[i] >= on[i + 1]]
    merged = []
    for e in ev:
        if not merged or e - merged[-1] > 4:
            merged.append(e)
    return np.array(merged) / FPS, len(fr) / FPS


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video"); ap.add_argument("cues")
    ap.add_argument("--min-density", type=float, default=0.0)
    ap.add_argument("--max-density", type=float, default=1.2)
    ap.add_argument("--ref-density", type=float, default=0.0, help="SFX berlabel/dtk di kiblat (kartu §7)")
    ap.add_argument("--min-coverage", type=float, default=0.0)
    ap.add_argument("--max-gap", type=float, default=0.0, help="0 = celah hanya dilaporkan")
    ap.add_argument("--json")
    a = ap.parse_args()

    cue_rows = load_cues(a.cues)
    cues = np.array([c["t"] for c in cue_rows])
    no_role = [c for c in cue_rows if not c["peran"].strip() or not c["alasan"].strip()]
    spam = spam_check(cue_rows)
    ev, dur = visual_events(a.video)
    density = len(cues) / dur if dur else 0.0
    covered = [e for e in ev if len(cues) and np.min(np.abs(cues - e)) <= 5 / FPS]
    coverage = 100.0 * len(covered) / len(ev) if len(ev) else 100.0
    edges = np.concatenate([[0.0], cues, [dur]])
    gaps = []
    for lo, hi in zip(edges[:-1], edges[1:]):
        n = int(((ev > lo) & (ev < hi)).sum())
        if hi - lo > (a.max_gap or 3.0) and n:
            gaps.append((round(float(lo), 2), round(float(hi), 2), n))
    fails = []
    cap = min(a.max_density, 1.5 * a.ref_density) if a.ref_density else a.max_density
    if density > cap:
        fails.append(f"kepadatan {density:.2f}/dtk > {cap:.2f} (spam; kiblat {a.ref_density or '-'}/dtk)")
    per_kata = [c for c in cue_rows if re.search(r"kata|word|tick", c["peran"], re.I) and not re.search(r"triad|kunci", c["peran"], re.I)]
    if len(per_kata) > 8 or (cue_rows and len(per_kata) > 0.2 * len(cue_rows)):
        fails.append(f"{len(per_kata)} cue bunyi per kata (maks 8 dan <= 20 %)")
    burst = max((int(((cues >= t) & (cues < t + 2.0)).sum()) for t in cues), default=0)
    if burst > 5:
        fails.append(f"rentetan {burst} cue dalam 2 dtk (maks 5)")
    no_ear = [c for c in cue_rows if not c["dengar"].strip()]
    if no_ear:
        fails.append(f"{len(no_ear)} cue tanpa `dengar` (file belum didengar, mis. {no_ear[0]['t']:.2f} dtk)")
    if a.min_density and density < a.min_density:
        fails.append(f"kepadatan {density:.2f}/dtk < {a.min_density}")
    if coverage < a.min_coverage:
        fails.append(f"cakupan {coverage:.0f} % < {a.min_coverage:.0f} %")
    if gaps and a.max_gap:
        fails.append(f"{len(gaps)} celah > {a.max_gap} dtk tanpa SFX padahal ada gerak")
    if no_role:
        fails.append(f"{len(no_role)} cue tanpa peran/alasan (mis. {no_role[0]['t']:.2f} dtk)")
    if spam:
        fails.append(f"{len(spam)} spam SFX: " + "; ".join(spam[:4]))

    print(f"durasi {dur:.1f} dtk · cue {len(cues)} · kepadatan {density:.2f}/dtk · event visual {len(ev)} "
          f"· cakupan {coverage:.0f} % (info) · celah tanpa SFX terpanjang "
          f"{max((h - l for l, h, _ in gaps), default=0):.1f} dtk")
    for lo, hi, n in gaps[:15]:
        print(f"  tanpa SFX {lo:6.2f}-{hi:6.2f} dtk ({hi - lo:.1f} dtk, {n} event visual) — boleh bila disengaja")
    print("PASS" if not fails else "FAIL: " + "; ".join(fails))
    if a.json:
        json.dump(dict(duration=dur, cues=len(cues), density=density, events=len(ev), coverage=coverage,
                       gaps=gaps, no_role=len(no_role), spam=spam, fails=fails), open(a.json, "w"), indent=1)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
