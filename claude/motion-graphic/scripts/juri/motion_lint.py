#!/usr/bin/env python3
"""Gerak dirancang per gerak, bukan preset (Lantai B13a; Irfan 16 Nov; diadaptasi dari motion-kit, MIT).

Memindai src Remotion dan menolak tiga tanda gerak "default AI":
  - preset : Easing.ease / Easing.inOut(Easing.ease|quad|cubic) / Easing.out(Easing.cubic…) / 'ease-in-out' / power3
             tanpa alasan. Kurva dipilih per gerak dari curves.ts (CURVE.land/heavy/whip/reveal/leave/wind/drift) atau
             Easing.bezier(...) sendiri.
  - stagger rata : jeda kemunculan i × konstanta (mis. `i * 3`, `index * 0.08 * fps`). Pakai react(i) dari curves.ts.
  - blur masuk : filter blur pada kemunculan teks/objek ("blur fade"). Blur hanya untuk gerak cepat (motion blur).
Baris yang sengaja dikecualikan diberi komentar `motion-ok: <alasan>` di baris yang sama.
Pakai: python3 motion_lint.py <folder src> ; exit 1 bila ada temuan.
"""
import re, sys
from pathlib import Path

RULES = [
    ("preset", re.compile(r"Easing\.(?:ease\b|inOut\(\s*Easing\.(?:ease|quad|cubic|sin)\b|out\(\s*Easing\.(?:ease|quad|cubic|sin)\b|in\(\s*Easing\.(?:ease|quad|cubic|sin)\b)|['\"]ease(?:-in|-out|-in-out)?['\"]|power[1-4]\.")),
    ("stagger rata", re.compile(r"\b(?:i|idx|index|k|j)\s*\*\s*(?:\d+(?:\.\d+)?|STAGGER|stagger\w*)\b")),
    ("blur masuk", re.compile(r"blur\(\s*\$?\{?[^)]*(?:1\s*-\s*|interpolate)")),
]

TIMING = re.compile(r"delay|start|from=|offset|fps|frame|\bt0\b|\bat\b|stagger|appear|muncul|masuk", re.I)


def lint(src):
    out = []
    for f in sorted(Path(src).rglob("*.[jt]s*")):
        if "node_modules" in f.parts or f.name.startswith("curves."):
            continue
        for n, line in enumerate(f.read_text(encoding="utf-8", errors="ignore").splitlines(), 1):
            if "motion-ok:" in line:
                continue
            for label, rx in RULES:
                if label == "stagger rata" and not TIMING.search(line):
                    continue  # i × konstanta untuk tata letak (posisi grid) bukan stagger waktu
                if rx.search(line):
                    out.append(f"{f}:{n} {label}: {line.strip()[:90]}")
    return out


if __name__ == "__main__":
    issues = lint(sys.argv[1] if len(sys.argv) > 1 else "src")
    for i in issues[:40]:
        print(" ", i)
    print("PASS" if not issues else f"FAIL: {len(issues)} gerak preset/stagger rata/blur masuk (pakai curves.ts, atau tulis `motion-ok: <alasan>`)")
    sys.exit(1 if issues else 0)
