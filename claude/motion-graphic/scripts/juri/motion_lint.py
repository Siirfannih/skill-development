#!/usr/bin/env python3
"""Gerak dirancang per gerak, bukan preset (Lantai B13a; diadaptasi dari motion-kit, MIT).

Memindai src Remotion dan mencatat tiga tanda gerak "default AI":
  - preset : Easing.ease / Easing.inOut(Easing.ease|quad|cubic) / Easing.out(Easing.cubic…) / 'ease-in-out' / power3
             tanpa alasan. Kurva dipilih per gerak dari curves.ts (CURVE.land/heavy/whip/reveal/leave/wind/drift) atau
             Easing.bezier(...) sendiri.
  - stagger rata : jeda kemunculan i × konstanta (mis. `i * 3`, `index * 0.08 * fps`). Pakai react(i) dari curves.ts.
  - blur masuk : filter blur pada kemunculan teks/objek ("blur fade"). Blur hanya untuk gerak cepat (motion blur).
  - gerak sendiri : proyek menulis easing sendiri (`Math.pow(1 - t`, `function land(`, `const heavy =` ...) di .ts/.tsx/.js/.html tanpa
                    mengimpor kurva toolkit (toolkit/gerak/curves.ts|js, atau `TK.` dari toolkit.js). Mulai dari toolkit/ (mulai.sh).
Baris yang sengaja dikecualikan diberi komentar `motion-ok: <alasan>` di baris yang sama.
Pakai: python3 motion_lint.py <folder src> [<folder storyboard> ...] [--ketat] ; temuan dicetak sebagai CATATAN, keluar 0;
--ketat (atau KETAT=1) keluar 1 bila ada temuan.
"""
import os, re, sys
from pathlib import Path

RULES = [
    ("preset", re.compile(r"Easing\.(?:ease\b|inOut\(\s*Easing\.(?:ease|quad|cubic|sin)\b|out\(\s*Easing\.(?:ease|quad|cubic|sin)\b|in\(\s*Easing\.(?:ease|quad|cubic|sin)\b)|['\"]ease(?:-in|-out|-in-out)?['\"]|power[1-4]\.")),
    ("stagger rata", re.compile(r"\b(?:i|idx|index|k|j)\s*\*\s*(?:\d+(?:\.\d+)?|STAGGER|stagger\w*)\b")),
    ("blur masuk", re.compile(r"blur\(\s*\$?\{?[^)]*(?:1\s*-\s*|interpolate)")),
]

# easing buatan sendiri: pola kurva keluar/masuk umum dan nama kurva toolkit yang didefinisikan ulang
EASING_SENDIRI = re.compile(
    r"Math\.pow\(\s*1\s*-\s*\w+|\(\s*1\s*-\s*\w+\s*\)\s*\*\*\s*[2-5]"
    r"|\bfunction\s+(?:land|heavy|whip|reveal|leave|wind)\s*\("
    r"|\b(?:const|let|var)\s+(?:land|heavy|whip|reveal|leave|wind)\s*=")
IMPOR_TOOLKIT = re.compile(
    r"(?:from\s+|import\s*\(?\s*|require\(\s*)['\"][^'\"]*(?:gerak/curves|/curves|toolkit)[^'\"]*['\"]"
    r"|<script[^>]+src=['\"][^'\"]*(?:toolkit\.js|curves\.js)['\"]|\bTK\.(?:move|CURVE|dur|react)\b")
LEWAT_PATH = ("node_modules", "toolkit", "ae-primitives")

TIMING = re.compile(r"delay|start|from=|offset|fps|frame|\bt0\b|\bat\b|stagger|appear|muncul|masuk", re.I)


def lint(src, only=None):
    out = []
    for f in sorted(list(Path(src).rglob("*.[jt]s*")) + list(Path(src).rglob("*.html"))):
        if only is not None and f.resolve() not in only:
            continue
        if "node_modules" in f.parts or f.name.startswith("curves."):
            continue
        teks = f.read_text(encoding="utf-8", errors="ignore")
        lines = teks.splitlines()
        if not any(p in f.parts for p in LEWAT_PATH) and f.suffix in (".ts", ".tsx", ".js", ".jsx", ".mjs", ".html") and not IMPOR_TOOLKIT.search(teks):
            for n, line in enumerate(lines, 1):
                if "motion-ok:" not in line and EASING_SENDIRI.search(line):
                    out.append(f"{f}:{n} gerak sendiri (tanpa impor toolkit curves): {line.strip()[:90]}")
        if f.suffix == ".html":
            continue  # aturan lain khusus kode Remotion
        for n, line in enumerate(lines, 1):
            if "motion-ok:" in line:
                continue
            for label, rx in RULES:
                if label == "stagger rata" and not TIMING.search(line):
                    continue  # i × konstanta untuk tata letak (posisi grid) bukan stagger waktu
                if rx.search(line):
                    out.append(f"{f}:{n} {label}: {line.strip()[:90]}")
    return out


if __name__ == "__main__":
    args = sys.argv[1:]
    ketat = "--ketat" in args or os.environ.get("KETAT") == "1"
    args = [x for x in args if x != "--ketat"]
    only = None
    if "--hanya" in args:  # revisi video lama: hanya file yang berubah sejak versi disetujui
        i = args.index("--hanya"); only = {Path(p).resolve() for p in args[i + 1:]}; args = args[:i]
    issues = []
    for d in (args or ["src"]):
        issues += lint(d, only)
    for i in issues[:40]:
        print(" ", i)
    print("tidak ada catatan" if not issues else f"CATATAN: {len(issues)} gerak preset/stagger rata/blur masuk/easing sendiri (toolkit/gerak/curves tersedia; `motion-ok: <alasan>` membungkam baris)")
    sys.exit(1 if issues and ketat else 0)
