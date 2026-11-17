#!/usr/bin/env python3
"""Audio di Remotion hanya lewat satu bus global. <Audio> yang ditaruh di dalam <Sequence> adegan ikut
berhenti saat adegan selesai, sehingga ekor kata/SFX/musik terpotong di setiap batas adegan (penyebab "audio dari model
AI sering terpotong" di repo baru, 16 Nov).

Aturan: hasil mix (suara + SFX + musik, satu WAV) diputar oleh SATU komponen di root komposisi yang diberi komentar
`// audio-bus`. File lain tidak boleh memuat <Audio>, <Html5Audio>, <OffthreadAudio>, atau useAudioData kecuali
SmoothAudioClip (J/L-cut terdokumentasi, audio.md §14.7) dan file berpenanda `// audio-bus`.
Pakai: python3 audio_bus_check.py <folder src> ; exit 1 bila gagal.
"""
import re, sys
from pathlib import Path

TAG = re.compile(r"<\s*(Audio|Html5Audio|OffthreadAudio)\b")


def check(src):
    bus, bad = [], []
    for f in sorted(Path(src).rglob("*.[jt]sx")):
        if "node_modules" in f.parts:
            continue
        txt = f.read_text(encoding="utf-8", errors="ignore")
        n = len(TAG.findall(txt))
        if not n:
            continue
        if "audio-bus" in txt:
            bus.append(f)
        elif "SmoothAudioClip" not in f.name:
            bad.append(f"{f} ({n} tag audio di luar bus)")
    if len(bus) > 1:
        bad.append("lebih dari satu file audio-bus: " + ", ".join(map(str, bus)))
    return bus, bad


if __name__ == "__main__":
    bus, bad = check(sys.argv[1] if len(sys.argv) > 1 else "src")
    print(f"audio-bus: {', '.join(map(str, bus)) or '-'}")
    print("PASS" if not bad else "FAIL: " + "; ".join(bad))
    sys.exit(1 if bad else 0)
