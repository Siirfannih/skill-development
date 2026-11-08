#!/usr/bin/env python3
"""Gerbang aturan 43: 1 frame / 1 pesan / 1 objek visual / 1 gerakan = 1 SFX (Irfan 8 Nov).

Mengukur dari render + cue sheet:
  - kepadatan  : jumlah cue SFX / durasi           (lulus >= 1,5 per detik)
  - cakupan    : event visual yang punya cue +-5 f  (lulus >= 85 %)
  - celah      : rentang tanpa cue yang berisi event visual (lulus <= 3 dtk)
  - peran      : setiap cue punya `peran` dan `alasan` (Irfan 8 Nov)
  - spam       : whoosh maks 1/dtk; file sama tidak diulang < 1 dtk kecuali kata kinetik
Event visual = onset beda-frame (metode visual_coverage.py). Wajah pembicara yang bergerak ikut terhitung,
jadi cakupan adalah batas bawah; yang boleh senyap hanya wajah tanpa overlay dan tanpa gerak kamera,
dan itu ditulis alasannya di laporan, bukan dilewati diam-diam.

Pakai:
  python3 sfx_density.py render.mp4 cues.json [--min-density 1.5] [--min-coverage 85] [--max-gap 3]
cues: JSON list [{"t": detik, ...}] atau {"cues": [...]} / {"placed": [...]}; atau tabel Markdown yang kolom
pertamanya detik (| 12.40 | ...). Exit 1 bila ada yang gagal.
Gagal pertama yang ditangkap: V5 8 Nov (clip-a 0,27/dtk 11 %, clip-b 0,17/dtk 9 %, clip-c 0,15/dtk 5 %).
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
                                alasan=pick("alasan", "reason"), file=pick("file")))
            elif not set(cells[0]) <= set("-: "):
                head = cells
        return sorted(out, key=lambda c: c["t"])
    d = json.loads(txt)
    if isinstance(d, dict):
        d = d.get("cues") or d.get("placed") or d.get("sfx") or []
    out = []
    for c in d:
        if not isinstance(c, dict):
            out.append(dict(t=float(c), peran="", alasan="", file="")); continue
        t = c.get("t", c.get("time", c.get("start")))
        if t is None:
            continue
        out.append(dict(t=float(t), peran=str(c.get("peran") or c.get("role") or ""),
                        alasan=str(c.get("alasan") or c.get("reason") or ""),
                        file=str(c.get("file") or c.get("src") or c.get("path") or "")))
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
    ap.add_argument("--min-density", type=float, default=1.5)
    ap.add_argument("--min-coverage", type=float, default=85.0)
    ap.add_argument("--max-gap", type=float, default=3.0)
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
        if hi - lo > a.max_gap and n:
            gaps.append((round(float(lo), 2), round(float(hi), 2), n))
    fails = []
    if density < a.min_density:
        fails.append(f"kepadatan {density:.2f}/dtk < {a.min_density}")
    if coverage < a.min_coverage:
        fails.append(f"cakupan {coverage:.0f} % < {a.min_coverage:.0f} %")
    if gaps:
        fails.append(f"{len(gaps)} celah > {a.max_gap} dtk tanpa SFX padahal ada gerak")
    if no_role:
        fails.append(f"{len(no_role)} cue tanpa peran/alasan (mis. {no_role[0]['t']:.2f} dtk)")
    if spam:
        fails.append(f"{len(spam)} spam SFX: " + "; ".join(spam[:4]))

    print(f"durasi {dur:.1f} dtk · cue {len(cues)} · kepadatan {density:.2f}/dtk · event visual {len(ev)} "
          f"· cakupan {coverage:.0f} % · celah senyap terpanjang "
          f"{max((h - l for l, h, _ in gaps), default=0):.1f} dtk")
    for lo, hi, n in gaps[:15]:
        print(f"  senyap {lo:6.2f}-{hi:6.2f} dtk ({hi - lo:.1f} dtk, {n} event visual)")
    print("PASS" if not fails else "FAIL: " + "; ".join(fails))
    if a.json:
        json.dump(dict(duration=dur, cues=len(cues), density=density, events=len(ev), coverage=coverage,
                       gaps=gaps, no_role=len(no_role), spam=spam, fails=fails), open(a.json, "w"), indent=1)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
